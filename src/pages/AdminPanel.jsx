import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../constants/data';
import { useAuth } from '../components';
import {
  useSiteImages,
  IMAGE_SECTIONS,
  IMAGE_LABELS,
  DEFAULT_IMAGES,
} from '../context/SiteImagesContext';

// ✅ Cloudinary Config
const CLOUDINARY_CLOUD_NAME    = 'dvcol26qc';
const CLOUDINARY_UPLOAD_PRESET = 'a10l6bjc';

// ✅ Cloudinary upload function
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
};

const EMPTY_FORM = {
  name: '', price: '', category: 'Artefacts',
  img: '', desc: '',
};

// ─────────────────────────────────────────────
// IMAGE MANAGER
// ─────────────────────────────────────────────
const ImageManager = () => {
  const {
    images, updateImage, resetImage, resetAll,
    overrideCount, addImage, removeExtraImage, extraKeys,
  } = useSiteImages();

  const [activeSection,  setActiveSection]  = useState(IMAGE_SECTIONS[0].key);
  const [editingKey,     setEditingKey]      = useState(null);
  const [urlInput,       setUrlInput]        = useState('');
  const [previewUrl,     setPreviewUrl]      = useState('');
  const [uploadMode,     setUploadMode]      = useState('url');
  const [searchQuery,    setSearchQuery]     = useState('');
  const [savedKey,       setSavedKey]        = useState(null);
  const [isMobile,       setIsMobile]        = useState(window.innerWidth < 768);
  const [showAddForm,    setShowAddForm]      = useState(false);
  const [addSection,     setAddSection]       = useState(IMAGE_SECTIONS[0].key);
  const [addCustomKey,   setAddCustomKey]     = useState('');
  const [addLabel,       setAddLabel]         = useState('');
  const [addUrl,         setAddUrl]           = useState('');
  const [addPreview,     setAddPreview]       = useState('');
  const [addUploadMode,  setAddUploadMode]    = useState('url');
  const [addSuccess,     setAddSuccess]       = useState(false);
  const [uploading,      setUploading]        = useState(false);
  const [addUploading,   setAddUploading]     = useState(false);
  const addFileRef   = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const defaultSectionKeys = Object.keys(images).filter(k =>
    k.startsWith(activeSection + '.') &&
    DEFAULT_IMAGES.hasOwnProperty(k) &&
    (searchQuery === '' || (IMAGE_LABELS[k] || k).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const extraSectionKeys = extraKeys
    .filter(e =>
      e.key.startsWith(activeSection + '.') &&
      (searchQuery === '' || e.label.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .map(e => e.key);

  const sectionKeys  = [...defaultSectionKeys, ...extraSectionKeys];
  const isOverridden = (key) => images[key] !== DEFAULT_IMAGES[key];
  const isExtra      = (key) => !DEFAULT_IMAGES.hasOwnProperty(key);

  const openEditor = (key) => {
    setEditingKey(key);
    setUrlInput(images[key] || '');
    setPreviewUrl(images[key] || '');
    setUploadMode('url');
  };

  const handleUrlChange = (val) => {
    setUrlInput(val);
    if (val.startsWith('http') || val.startsWith('data:')) setPreviewUrl(val);
  };

  // ✅ Edit modal — Cloudinary upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setPreviewUrl('');
    setUrlInput('uploading...');
    try {
      const url = await uploadToCloudinary(file);
      setPreviewUrl(url);
      setUrlInput(url);
    } catch {
      alert('Upload failed! Internet check karo ya Cloudinary preset "Unsigned" hai ya nahi dekho.');
      setUrlInput('');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!urlInput || !editingKey || urlInput === 'uploading...') return;
    updateImage(editingKey, urlInput);
    setSavedKey(editingKey);
    setTimeout(() => setSavedKey(null), 2500);
    setEditingKey(null);
  };

  const handleAddImage = () => {
    if (!addUrl || addUrl === 'uploading...') return alert('Pehle image upload hone do!');
    const finalKey   = `${addSection}.${addCustomKey.trim() || 'custom' + Date.now()}`;
    const finalLabel = addLabel.trim() || finalKey;
    addImage(finalKey, addUrl, finalLabel);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setShowAddForm(false);
      setAddCustomKey(''); setAddLabel(''); setAddUrl(''); setAddPreview('');
      setActiveSection(addSection);
    }, 1500);
  };

  // ✅ Add modal — Cloudinary upload
  const handleAddFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAddUploading(true);
    setAddPreview('');
    setAddUrl('uploading...');
    try {
      const url = await uploadToCloudinary(file);
      setAddPreview(url);
      setAddUrl(url);
    } catch {
      alert('Upload failed!');
      setAddUrl('');
    } finally {
      setAddUploading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '600px', background: '#faf8f5',
      flexDirection: isMobile ? 'column' : 'row',
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: isMobile ? '100%' : '220px',
        flexShrink: 0, background: '#1a1a1a',
        overflowY: isMobile ? 'visible' : 'auto',
      }}>
        <div style={{ padding: '20px 18px 12px' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>
            Total Customised
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.6rem',
            color: '#c9a96e', margin: 0, lineHeight: 1 }}>
            {overrideCount}
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
              fontFamily: 'sans-serif', marginLeft: '6px' }}>images</span>
          </p>
        </div>

        <div style={{ display: isMobile ? 'flex' : 'block',
          flexWrap: 'wrap', gap: '2px', padding: isMobile ? '0 12px 12px' : '0' }}>
          {IMAGE_SECTIONS.map(sec => {
            const secOverrides = Object.keys(images).filter(
              k => k.startsWith(sec.key + '.') && images[k] !== DEFAULT_IMAGES[k]
            ).length;
            return (
              <button key={sec.key} onClick={() => setActiveSection(sec.key)} style={{
                display: isMobile ? 'inline-flex' : 'flex',
                alignItems: 'center', justifyContent: 'space-between',
                width: isMobile ? 'auto' : '100%',
                textAlign: 'left', padding: '12px 18px',
                background: activeSection === sec.key ? 'rgba(201,169,110,0.15)' : 'transparent',
                border: isMobile
                  ? activeSection === sec.key ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)'
                  : 'none',
                borderLeft: !isMobile
                  ? activeSection === sec.key ? '3px solid #c9a96e' : '3px solid transparent'
                  : undefined,
                color: activeSection === sec.key ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '0.7rem', fontFamily: 'sans-serif',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                <span>{sec.label}</span>
                {secOverrides > 0 && (
                  <span style={{
                    marginLeft: '8px', background: '#c9a96e',
                    color: '#fff', fontSize: '0.52rem',
                    padding: '1px 6px', borderRadius: '10px',
                  }}>
                    {secOverrides}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '14px 16px' }}>
          <button onClick={() => {
            if (window.confirm('Reset ALL site images to defaults?')) resetAll();
          }} style={{
            width: '100%', padding: '10px',
            background: 'rgba(231,76,60,0.12)',
            border: '1px solid rgba(231,76,60,0.3)',
            color: '#e74c3c', cursor: 'pointer',
            fontSize: '0.6rem', letterSpacing: '2px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(231,76,60,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(231,76,60,0.12)'}>
            ↺ Reset All to Default
          </button>
        </div>
      </div>

      {/* ── MAIN PANEL ── */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem',
            fontWeight: '300', color: '#1a1a1a', margin: 0 }}>
            {IMAGE_SECTIONS.find(s => s.key === activeSection)?.label}
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.7rem',
              color: '#bbb', marginLeft: '12px' }}>
              ({sectionKeys.length} images)
            </span>
          </h3>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              placeholder="🔍 Search images..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 14px', border: '1px solid #e8e3db',
                outline: 'none', fontSize: '0.8rem',
                fontFamily: 'sans-serif', width: '180px', background: '#fff',
              }}
            />
            <button onClick={() => { setShowAddForm(true); setAddSection(activeSection); }} style={{
              padding: '9px 20px', background: '#c9a96e', color: '#fff',
              border: 'none', cursor: 'pointer',
              fontSize: '0.65rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
              + Add Image
            </button>
          </div>
        </div>

        {/* Image Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '14px',
        }}>
          {sectionKeys.map(key => (
            <div key={key} style={{
              background: '#fff', overflow: 'hidden',
              boxShadow: isExtra(key)
                ? '0 0 0 2px #3498db'
                : isOverridden(key)
                  ? '0 0 0 2px #c9a96e'
                  : savedKey === key
                    ? '0 0 0 2px #2ecc71'
                    : '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.3s',
            }}>
              <div style={{ position: 'relative', height: '130px', overflow: 'hidden', background: '#f5f0ea' }}>
                <img
                  src={images[key]}
                  alt={IMAGE_LABELS[key] || key}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.src = 'https://via.placeholder.com/400x300/f5f0ea/bbb?text=No+Image'; }}
                />
                {isExtra(key) && (
                  <span style={{
                    position: 'absolute', top: '7px', right: '7px',
                    background: '#3498db', color: '#fff',
                    fontSize: '0.48rem', padding: '2px 7px',
                    letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                  }}>New</span>
                )}
                {!isExtra(key) && isOverridden(key) && (
                  <span style={{
                    position: 'absolute', top: '7px', right: '7px',
                    background: '#c9a96e', color: '#fff',
                    fontSize: '0.48rem', padding: '2px 7px',
                    letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                  }}>Custom</span>
                )}
                {savedKey === key && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(46,204,113,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '2rem' }}>✓</span>
                  </div>
                )}
              </div>

              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: '#1a1a1a', margin: '0 0 3px', fontWeight: '500',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {IMAGE_LABELS[key] || key}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.56rem',
                  color: '#ccc', margin: '0 0 10px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {key}
                </p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditor(key)} style={{
                    flex: 1, padding: '7px', background: '#1a1a1a', color: '#fff',
                    border: 'none', cursor: 'pointer',
                    fontSize: '0.58rem', letterSpacing: '1px',
                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                  }}
                    onMouseEnter={e => e.target.style.background = '#c9a96e'}
                    onMouseLeave={e => e.target.style.background = '#1a1a1a'}>
                    ✎ Edit
                  </button>
                  {isExtra(key) ? (
                    <button onClick={() => {
                      if (window.confirm('Is image ko remove karo?')) removeExtraImage(key);
                    }} style={{
                      padding: '7px 10px', background: 'transparent',
                      border: '1px solid #f0e0e0', color: '#e74c3c',
                      cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'sans-serif',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e74c3c'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e74c3c'; }}>
                      ✕
                    </button>
                  ) : isOverridden(key) ? (
                    <button onClick={() => resetImage(key)} title="Reset to default" style={{
                      padding: '7px 10px', background: 'transparent',
                      border: '1px solid #f0e0e0', color: '#e74c3c',
                      cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'sans-serif',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e74c3c'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e74c3c'; }}>
                      ↺
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {sectionKeys.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#bbb', fontFamily: 'sans-serif', fontSize: '0.85rem' }}>
                {searchQuery ? `No images match "${searchQuery}"` : 'No images in this section'}
              </p>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{
                  marginTop: '12px', padding: '8px 20px',
                  background: '#1a1a1a', color: '#fff', border: 'none',
                  cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '2px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ADD IMAGE MODAL
      ══════════════════════════════════════ */}
      {showAddForm && (
        <>
          <div onClick={() => setShowAddForm(false)} style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.65)', zIndex: 4000, backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff', zIndex: 4001,
            width: '100%', maxWidth: '560px',
            maxHeight: '90vh', overflowY: 'auto',
            padding: '36px', boxSizing: 'border-box',
            boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
            margin: '0 16px',
          }}>
            <button onClick={() => setShowAddForm(false)} style={{
              position: 'absolute', top: '16px', right: '20px',
              background: 'none', border: 'none',
              fontSize: '1.3rem', cursor: 'pointer', color: '#bbb',
            }}>✕</button>

            <p style={{ fontSize: '0.56rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '5px', fontFamily: 'sans-serif' }}>
              Add New Image
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.3rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 24px' }}>
              Kisi bhi section mein image add karo
            </h3>

            <label style={labelStyle}>Section choose karo</label>
            <select value={addSection} onChange={e => setAddSection(e.target.value)}
              style={{ ...inputStyle, marginBottom: '16px', cursor: 'pointer' }}>
              {IMAGE_SECTIONS.map(s => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>

            <label style={labelStyle}>Image key name (e.g. project7, banner3)</label>
            <input
              value={addCustomKey}
              onChange={e => setAddCustomKey(e.target.value.replace(/\s/g, '_'))}
              placeholder={`${addSection}.project7`}
              style={{ ...inputStyle, marginBottom: '4px' }}
            />
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem',
              color: '#bbb', margin: '0 0 16px' }}>
              Final key: <code style={{ background: '#f5f0ea', padding: '2px 6px' }}>
                {addSection}.{addCustomKey || 'custom_name'}
              </code>
            </p>

            <label style={labelStyle}>Display label (optional)</label>
            <input
              value={addLabel}
              onChange={e => setAddLabel(e.target.value)}
              placeholder="e.g. New Project Image 7"
              style={{ ...inputStyle, marginBottom: '20px' }}
            />

            <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
              {[
                { key: 'url',    label: '🔗 Paste URL'   },
                { key: 'upload', label: '📁 Upload File' },
              ].map(m => (
                <button key={m.key} onClick={() => setAddUploadMode(m.key)} style={{
                  flex: 1, padding: '10px',
                  background: addUploadMode === m.key ? '#1a1a1a' : '#f5f0ea',
                  color:      addUploadMode === m.key ? '#fff'    : '#888',
                  border: 'none', cursor: 'pointer',
                  fontSize: '0.65rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  {m.label}
                </button>
              ))}
            </div>

            {addUploadMode === 'url' && (
              <div style={{ marginBottom: '16px' }}>
                <input
                  value={addUrl.startsWith('data:') ? '' : addUrl}
                  onChange={e => { setAddUrl(e.target.value); setAddPreview(e.target.value); }}
                  placeholder="https://res.cloudinary.com/..."
                  style={inputStyle}
                />
              </div>
            )}

            {addUploadMode === 'upload' && (
              <div style={{ marginBottom: '16px' }}>
                <input ref={addFileRef} type="file" accept="image/*"
                  onChange={handleAddFileUpload} style={{ display: 'none' }} />
                <div onClick={() => !addUploading && addFileRef.current.click()} style={{
                  border: '2px dashed #e8e3db', padding: '28px 20px',
                  textAlign: 'center', cursor: addUploading ? 'wait' : 'pointer',
                  background: '#fdfcfb',
                }}>
                  {addUploading ? (
                    <>
                      <div style={{
                        width: '32px', height: '32px',
                        border: '2px solid #e8e3db', borderTop: '2px solid #c9a96e',
                        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 10px',
                      }} />
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: '#c9a96e', margin: 0 }}>
                        Cloudinary par upload ho raha hai...
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '1.8rem', margin: '0 0 8px' }}>📁</p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#888', margin: 0 }}>
                        Click to select image from your device
                      </p>
                    </>
                  )}
                </div>
                {addUrl && addUrl !== 'uploading...' && addUrl.startsWith('http') && (
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#2ecc71', marginTop: '8px' }}>
                    ✓ Cloudinary par upload ho gayi!
                  </p>
                )}
              </div>
            )}

            {addPreview && addPreview.startsWith('http') && (
              <div style={{ marginBottom: '20px' }}>
                <p style={labelStyle}>Preview</p>
                <img src={addPreview} alt="preview"
                  style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                  onError={e => e.target.style.display = 'none'}
                />
              </div>
            )}

            {addSuccess && (
              <div style={{
                background: '#f0faf0', border: '1px solid #c3e6cb',
                padding: '12px 16px', marginBottom: '16px',
                fontSize: '0.82rem', color: '#2d6a4f', fontFamily: 'sans-serif',
              }}>
                ✓ Image successfully add ho gayi!
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAddImage}
                disabled={!addUrl || addUrl === 'uploading...' || addUploading}
                style={{
                  flex: 1, padding: '13px',
                  background: (addUrl && addUrl !== 'uploading...' && !addUploading) ? '#c9a96e' : '#e0d8d0',
                  color: '#fff', border: 'none',
                  cursor: (addUrl && !addUploading) ? 'pointer' : 'not-allowed',
                  fontSize: '0.65rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                {addUploading ? 'Uploading...' : '✓ Add Image'}
              </button>
              <button onClick={() => setShowAddForm(false)} style={{
                padding: '13px 16px', background: 'transparent',
                border: '1px solid #e8e3db', color: '#888',
                cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '1.5px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
              }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════
          EDIT IMAGE MODAL
      ══════════════════════════════════════ */}
      {editingKey && (
        <>
          <div onClick={() => setEditingKey(null)} style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.65)', zIndex: 4000, backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff', zIndex: 4001,
            width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto',
            padding: '36px', boxSizing: 'border-box',
            boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
            margin: '0 16px',
          }}>
            <button onClick={() => setEditingKey(null)} style={{
              position: 'absolute', top: '16px', right: '20px',
              background: 'none', border: 'none',
              fontSize: '1.3rem', cursor: 'pointer', color: '#bbb',
            }}>✕</button>

            <p style={{ fontSize: '0.56rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '5px', fontFamily: 'sans-serif' }}>
              Editing Site Image
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.3rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 4px' }}>
              {IMAGE_LABELS[editingKey] || editingKey}
            </h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem',
              color: '#bbb', margin: '0 0 22px' }}>
              <code style={{ background: '#f5f0ea', padding: '2px 8px' }}>{editingKey}</code>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
              <div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.56rem',
                  letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb', margin: '0 0 6px' }}>
                  Current
                </p>
                <img src={DEFAULT_IMAGES[editingKey] || images[editingKey]} alt="Default"
                  style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }}
                  onError={e => e.target.style.display = 'none'}
                />
              </div>
              <div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.56rem',
                  letterSpacing: '2px', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 6px' }}>
                  New Preview
                </p>
                {previewUrl && previewUrl.startsWith('http') ? (
                  <img src={previewUrl} alt="New"
                    style={{ width: '100%', height: '110px', objectFit: 'cover', display: 'block' }}
                    onError={e => e.target.style.display = 'none'}
                  />
                ) : (
                  <div style={{ width: '100%', height: '110px', background: '#f5f0ea',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#ccc', fontSize: '0.7rem', fontFamily: 'sans-serif' }}>
                      {uploading ? 'Uploading...' : 'No preview'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2px', marginBottom: '18px' }}>
              {[
                { key: 'url',    label: '🔗 Paste URL'   },
                { key: 'upload', label: '📁 Upload File' },
              ].map(m => (
                <button key={m.key} onClick={() => setUploadMode(m.key)} style={{
                  flex: 1, padding: '10px',
                  background: uploadMode === m.key ? '#1a1a1a' : '#f5f0ea',
                  color:      uploadMode === m.key ? '#fff'    : '#888',
                  border: 'none', cursor: 'pointer',
                  fontSize: '0.65rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  {m.label}
                </button>
              ))}
            </div>

            {uploadMode === 'url' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Image URL</label>
                <input
                  value={urlInput.startsWith('data:') ? '' : urlInput}
                  onChange={e => handleUrlChange(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  style={inputStyle} autoFocus
                />
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem',
                  color: '#bbb', marginTop: '6px', lineHeight: '1.7' }}>
                  Tip: Cloudinary, Unsplash ya koi bhi direct image URL
                </p>
              </div>
            )}

            {uploadMode === 'upload' && (
              <div style={{ marginBottom: '20px' }}>
                <input ref={fileInputRef} type="file" accept="image/*"
                  onChange={handleFileUpload} style={{ display: 'none' }} />
                <div onClick={() => !uploading && fileInputRef.current.click()} style={{
                  border: '2px dashed #e8e3db', padding: '36px 20px',
                  textAlign: 'center', cursor: uploading ? 'wait' : 'pointer', background: '#fdfcfb',
                }}>
                  {uploading ? (
                    <>
                      <div style={{
                        width: '32px', height: '32px',
                        border: '2px solid #e8e3db', borderTop: '2px solid #c9a96e',
                        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 10px',
                      }} />
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#c9a96e', margin: 0 }}>
                        Cloudinary par upload ho raha hai...
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '2rem', margin: '0 0 10px' }}>📁</p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#888', margin: '0 0 6px' }}>
                        Click to select image from your computer
                      </p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', color: '#bbb', margin: 0 }}>
                        JPG, PNG, WEBP — Cloudinary par automatically upload hogi
                      </p>
                    </>
                  )}
                </div>
                {urlInput && urlInput.startsWith('http') && !uploading && (
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.7rem', color: '#2ecc71', marginTop: '8px' }}>
                    ✓ Cloudinary par upload ho gayi — Save karo!
                  </p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSave}
                disabled={!urlInput || urlInput === 'uploading...' || uploading}
                style={{
                  flex: 1, padding: '13px',
                  background: (urlInput && !uploading) ? '#c9a96e' : '#e0d8d0',
                  color: '#fff', border: 'none',
                  cursor: (urlInput && !uploading) ? 'pointer' : 'not-allowed',
                  fontSize: '0.65rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                {uploading ? 'Uploading...' : '✓ Save Image'}
              </button>
              {!isExtra(editingKey) && (
                <button onClick={() => { resetImage(editingKey); setEditingKey(null); }} style={{
                  padding: '13px 16px', background: 'transparent',
                  border: '1px solid #f0e0e0', color: '#e74c3c',
                  cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e74c3c'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e74c3c'; }}>
                  ↺ Reset
                </button>
              )}
              <button onClick={() => setEditingKey(null)} style={{
                padding: '13px 16px', background: 'transparent',
                border: '1px solid #e8e3db', color: '#888',
                cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '1.5px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
              }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN ADMIN PANEL
// ─────────────────────────────────────────────
const AdminPanel = () => {
  const { admin, logout }          = useAuth();
  const navigate                   = useNavigate();
  const [products,      setProducts]     = useState([]);
  const [form,          setForm]         = useState(EMPTY_FORM);
  const [editingId,     setEditingId]    = useState(null);
  const [previewImg,    setPreviewImg]   = useState('');
  const [successMsg,    setSuccessMsg]   = useState('');
  const [activeTab,     setActiveTab]    = useState('add');
  const [imgTab,        setImgTab]       = useState('upload');
  const [isMobile,      setIsMobile]     = useState(window.innerWidth < 768);
  const [prodUploading, setProdUploading] = useState(false);

  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const fileRef   = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream,   setStream]   = useState(null);

  useEffect(() => { if (!admin) navigate('/'); }, [admin]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gkd_products');
      if (stored) setProducts(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (imgTab !== 'camera') stopCamera();
  }, [imgTab]);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('gkd_products', JSON.stringify(updated));
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'img') setPreviewImg(value);
  };

  // ✅ Product image — Cloudinary upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please select an image file.'); return; }
    setProdUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setPreviewImg(url);
      setForm(prev => ({ ...prev, img: url }));
    } catch {
      alert('Upload failed! Internet check karo.');
    } finally {
      setProdUploading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      setStream(mediaStream);
      setCameraOn(true);
      setTimeout(() => {
        if (videoRef.current) { videoRef.current.srcObject = mediaStream; videoRef.current.play(); }
      }, 100);
    } catch { alert('Camera access denied or not available.'); }
  };

  const stopCamera = () => {
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
    setCameraOn(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current, canvas = canvasRef.current;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.85);
    setPreviewImg(base64);
    setForm(prev => ({ ...prev, img: base64 }));
    stopCamera();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.img) { alert('Please fill Name, Price and add an Image'); return; }
    const product = { ...form, price: Number(form.price), id: editingId || Date.now() };
    let updated;
    if (editingId) {
      updated = products.map(p => p.id === editingId ? product : p);
      setSuccessMsg('✓ Product updated successfully!');
    } else {
      updated = [...products, product];
      setSuccessMsg('✓ Product added to shop!');
    }
    saveProducts(updated);
    setForm(EMPTY_FORM); setPreviewImg(''); setEditingId(null);
    setTimeout(() => setSuccessMsg(''), 3000);
    setActiveTab('manage');
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, category: product.category, img: product.img, desc: product.desc || '' });
    setPreviewImg(product.img); setEditingId(product.id); setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return;
    saveProducts(products.filter(p => p.id !== id));
    setSuccessMsg('✓ Product deleted.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const TABS = [
    { key: 'add',    label: editingId ? '✎ Edit Product' : '+ Add Product' },
    { key: 'manage', label: `📦 Manage (${products.length})`                },
    { key: 'images', label: '🖼️ Image Manager'                              },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', paddingTop: '80px' }}>

      {/* TOP BAR */}
      <div style={{
        background: '#1a1a1a', padding: '16px 40px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <p style={{ color: '#c9a96e', fontSize: '0.6rem', letterSpacing: '4px',
            textTransform: 'uppercase', margin: 0, fontFamily: 'sans-serif' }}>
            Admin Dashboard
          </p>
          <h3 style={{ color: '#fff', fontFamily: "'Georgia', serif",
            fontWeight: '300', fontSize: '1.1rem', margin: '4px 0 0', letterSpacing: '2px' }}>
            TrueBuild Projects
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '0.55rem', fontFamily: 'sans-serif',
              letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 2px' }}>Products</p>
            <p style={{ color: '#fff', fontFamily: "'Georgia', serif", fontSize: '1.1rem', margin: 0 }}>
              {products.length}
            </p>
          </div>
          <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid #444', color: '#aaa',
            padding: '8px 16px', cursor: 'pointer', fontSize: '0.62rem',
            letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e74c3c'; e.currentTarget.style.color = '#e74c3c'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#aaa'; }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{
        padding: isMobile ? '28px 16px' : '36px 40px',
        maxWidth: activeTab === 'images' ? '100%' : '1100px',
        margin: '0 auto',
      }}>
        {successMsg && (
          <div style={{
            background: '#f0faf0', border: '1px solid #c3e6cb',
            padding: '12px 20px', marginBottom: '24px',
            fontSize: '0.82rem', color: '#2d6a4f', fontFamily: 'sans-serif',
          }}>
            {successMsg}
          </div>
        )}

        {/* TABS */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '12px 24px',
              background: activeTab === tab.key ? '#1a1a1a' : '#fff',
              color:      activeTab === tab.key ? '#fff'    : '#888',
              border: '1px solid',
              borderColor: activeTab === tab.key ? '#1a1a1a' : '#ddd',
              cursor: 'pointer', fontSize: '0.68rem',
              letterSpacing: '2px', textTransform: 'uppercase',
              fontFamily: 'sans-serif', transition: 'all 0.2s',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 1 — ADD / EDIT PRODUCT ─── */}
        {activeTab === 'add' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
            <div style={{ background: '#fff', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
                fontSize: '1.3rem', color: '#1a1a1a', margin: '0 0 28px', letterSpacing: '2px' }}>
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Product Name *</label>
                  <input value={form.name} onChange={e => handleChange('name', e.target.value)}
                    placeholder="e.g. Amber Glow Table Lamp" style={inputStyle} required />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)}
                    placeholder="e.g. 12500" style={inputStyle} min="1" required />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Category *</label>
                  <select value={form.category} onChange={e => handleChange('category', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}>
                    {SHOP_CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Image Section */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>Product Image *</label>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                    {[
                      { key: 'upload', icon: '📎', label: 'Upload' },
                      { key: 'camera', icon: '📷', label: 'Camera' },
                      { key: 'url',    icon: '🔗', label: 'URL'    },
                    ].map(t => (
                      <button key={t.key} type="button" onClick={() => setImgTab(t.key)} style={{
                        flex: 1, padding: '10px 6px',
                        background: imgTab === t.key ? '#1a1a1a' : '#f5f0ea',
                        color:      imgTab === t.key ? '#fff'    : '#888',
                        border: 'none', cursor: 'pointer',
                        fontSize: '0.65rem', letterSpacing: '1.5px',
                        textTransform: 'uppercase', fontFamily: 'sans-serif',
                      }}>
                        {t.icon} {t.label}
                      </button>
                    ))}
                  </div>

                  {imgTab === 'upload' && (
                    <div>
                      <input ref={fileRef} type="file" accept="image/*"
                        onChange={handleFileUpload} style={{ display: 'none' }} />
                      <div onClick={() => !prodUploading && fileRef.current.click()} style={{
                        border: '2px dashed #ddd', padding: '32px 20px',
                        textAlign: 'center', cursor: prodUploading ? 'wait' : 'pointer',
                        background: '#fdfcfb',
                      }}>
                        {prodUploading ? (
                          <>
                            <div style={{
                              width: '32px', height: '32px',
                              border: '2px solid #e8e3db', borderTop: '2px solid #c9a96e',
                              borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                              margin: '0 auto 10px',
                            }} />
                            <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#c9a96e', margin: 0 }}>
                              Cloudinary par upload ho raha hai...
                            </p>
                          </>
                        ) : (
                          <>
                            <p style={{ fontSize: '2rem', margin: '0 0 10px' }}>📁</p>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#888', margin: '0 0 6px' }}>
                              Click to browse from your <strong>Gallery / PC</strong>
                            </p>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '0.68rem', color: '#bbb', margin: 0 }}>
                              Cloudinary par automatically upload hogi
                            </p>
                          </>
                        )}
                      </div>
                      {previewImg && previewImg.startsWith('http') && (
                        <p style={{ marginTop: '8px', fontSize: '0.72rem', color: '#2d6a4f', fontFamily: 'sans-serif' }}>
                          ✓ Upload complete
                        </p>
                      )}
                    </div>
                  )}

                  {imgTab === 'camera' && (
                    <div style={{ textAlign: 'center' }}>
                      {!cameraOn ? (
                        <div style={{ border: '2px dashed #ddd', padding: '32px 20px', background: '#fdfcfb' }}>
                          <p style={{ fontSize: '2rem', margin: '0 0 10px' }}>📷</p>
                          <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#888', margin: '0 0 16px' }}>
                            Take a photo of the product
                          </p>
                          <button type="button" onClick={startCamera} style={{
                            padding: '11px 28px', background: '#1a1a1a', color: '#fff',
                            border: 'none', cursor: 'pointer', fontSize: '0.68rem',
                            letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                          }}>
                            Open Camera
                          </button>
                        </div>
                      ) : (
                        <div>
                          <video ref={videoRef} autoPlay playsInline style={{
                            width: '100%', maxHeight: '260px', objectFit: 'cover',
                            background: '#000', display: 'block',
                          }} />
                          <canvas ref={canvasRef} style={{ display: 'none' }} />
                          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                            <button type="button" onClick={capturePhoto} style={{
                              flex: 1, padding: '12px', background: '#c9a96e', color: '#fff',
                              border: 'none', cursor: 'pointer', fontSize: '0.68rem',
                              letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                            }}>
                              📸 Capture
                            </button>
                            <button type="button" onClick={stopCamera} style={{
                              padding: '12px 16px', background: 'none', border: '1px solid #ddd',
                              cursor: 'pointer', color: '#888', fontFamily: 'sans-serif', fontSize: '0.68rem',
                            }}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {imgTab === 'url' && (
                    <div>
                      <input
                        value={form.img.startsWith('data:') ? '' : form.img}
                        onChange={e => handleChange('img', e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        style={inputStyle}
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.desc} onChange={e => handleChange('desc', e.target.value)}
                    placeholder="Short product description..." rows={3}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '80px', lineHeight: '1.6' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" disabled={prodUploading} style={{
                    flex: 1, padding: '14px', background: '#1a1a1a', color: '#fff',
                    border: 'none', cursor: prodUploading ? 'wait' : 'pointer', fontSize: '0.68rem',
                    letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                  }}
                    onMouseEnter={e => { if (!prodUploading) e.target.style.background = '#c9a96e'; }}
                    onMouseLeave={e => e.target.style.background = '#1a1a1a'}>
                    {editingId ? 'Update Product' : 'Add to Shop'}
                  </button>
                  {editingId && (
                    <button type="button"
                      onClick={() => { setForm(EMPTY_FORM); setPreviewImg(''); setEditingId(null); }} style={{
                        padding: '14px 20px', background: 'none', border: '1px solid #ddd',
                        cursor: 'pointer', fontSize: '0.68rem', letterSpacing: '2px',
                        textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#888',
                      }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Live Preview */}
            <div>
              <h4 style={{ fontFamily: 'sans-serif', fontSize: '0.65rem',
                letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '16px' }}>
                Live Preview
              </h4>
              <div style={{ background: '#fff', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ height: '260px', background: '#f5f0ea',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {prodUploading ? (
                    <p style={{ color: '#c9a96e', fontFamily: 'sans-serif', fontSize: '0.8rem' }}>Uploading...</p>
                  ) : previewImg ? (
                    <img src={previewImg} alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <p style={{ color: '#ccc', fontSize: '0.78rem', fontFamily: 'sans-serif', letterSpacing: '2px' }}>
                      Image preview
                    </p>
                  )}
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  {form.category && (
                    <span style={{ fontSize: '0.58rem', letterSpacing: '2px',
                      textTransform: 'uppercase', color: '#c9a96e', fontFamily: 'sans-serif' }}>
                      {form.category}
                    </span>
                  )}
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
                    fontWeight: '300', color: form.name ? '#1a1a1a' : '#ccc', margin: '8px 0 6px' }}>
                    {form.name || 'Product Name'}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '0 0 12px',
                    fontFamily: 'sans-serif', lineHeight: '1.6' }}>
                    {form.desc || 'Product description will appear here'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.05rem', color: '#1a1a1a' }}>
                      {form.price ? `₹${Number(form.price).toLocaleString('en-IN')}` : '₹0'}
                    </span>
                    <span style={{ padding: '8px 14px', background: '#1a1a1a', color: '#fff',
                      fontSize: '0.58rem', letterSpacing: '1.5px',
                      textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                      + Add
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2 — MANAGE PRODUCTS ─── */}
        {activeTab === 'manage' && (
          <div>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</p>
                <p style={{ color: '#bbb', fontFamily: "'Georgia', serif", fontSize: '1.1rem' }}>
                  No products added yet.
                </p>
                <button onClick={() => setActiveTab('add')} style={{
                  marginTop: '20px', padding: '12px 28px', background: '#1a1a1a',
                  color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.65rem',
                  letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  + Add First Product
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}>
                {products.map(product => (
                  <div key={product.id} style={{
                    background: '#fff', overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                      <img src={product.img} alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: 'rgba(201,169,110,0.9)', padding: '3px 8px',
                        fontSize: '0.55rem', letterSpacing: '1.5px',
                        textTransform: 'uppercase', color: '#fff', fontFamily: 'sans-serif',
                      }}>
                        {product.category}
                      </span>
                    </div>
                    <div style={{ padding: '16px', flex: 1 }}>
                      <h4 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
                        fontSize: '0.95rem', color: '#1a1a1a', margin: '0 0 6px' }}>
                        {product.name}
                      </h4>
                      <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
                        color: '#c9a96e', margin: '0 0 14px' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(product)} style={{
                          flex: 1, padding: '9px', background: 'none',
                          border: '1px solid #1a1a1a', cursor: 'pointer',
                          fontSize: '0.62rem', letterSpacing: '2px',
                          textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#1a1a1a',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}>
                          ✎ Edit
                        </button>
                        <button onClick={() => handleDelete(product.id)} style={{
                          flex: 1, padding: '9px', background: 'none',
                          border: '1px solid #e74c3c', cursor: 'pointer',
                          fontSize: '0.62rem', letterSpacing: '2px',
                          textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#e74c3c',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#e74c3c'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#e74c3c'; }}>
                          ✕ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3 — IMAGE MANAGER ─── */}
        {activeTab === 'images' && <ImageManager />}

      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────
const labelStyle = {
  display: 'block', fontSize: '0.62rem',
  letterSpacing: '2px', textTransform: 'uppercase',
  color: '#999', fontFamily: 'sans-serif', marginBottom: '8px',
};

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1px solid #e8e3db', outline: 'none',
  fontSize: '0.88rem', fontFamily: 'sans-serif',
  color: '#333', background: '#fdfcfb',
  boxSizing: 'border-box', transition: 'border 0.2s',
};

export default AdminPanel;