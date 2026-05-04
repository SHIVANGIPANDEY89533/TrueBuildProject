# TrueBuild Projects - Admin Content Management Guide

## ✅ What Was Fixed

Your website previously had **hardcoded content** that required a coder to change. Now, **ALL content is managed from the Admin Panel**:

### Problems Solved:
1. ❌ **Service titles & descriptions** were hardcoded in Services.jsx
2. ❌ **Service card images** used direct Unsplash URLs  
3. ❌ **Page text** (About, Home hero section) was hardcoded
4. ❌ **Contact information & social links** were static
5. ❌ **Architectural/project images** couldn't be changed

### ✅ Now All Editable From Admin Panel:

---

## 🎯 NEW ADMIN FEATURES

Your Admin Panel now has **3 main sections**:

### 1. **📦 Add/Manage Products**
- Add shop products (already working)
- Edit product details
- Manage inventory

### 2. **🖼️ Image Manager**
- Upload/change all site images
- Includes:
  - Hero banners for all pages
  - Service card images
  - Project/gallery images
  - Contact page images
  - Architectural project images

### 3. **📝 Text & Content Manager** (NEW!)
- Edit all website text from one place
- Includes:
  - **Home Page**: Title, Started year, story text
  - **About Page**: Hero titles, subtitles
  - **Services**: All 4 service card titles, descriptions, tags, bullet points
  - **Contact Information**: Email, phone, address
  - **Social Links**: Instagram, Facebook, LinkedIn

---

## 🚀 HOW TO USE

### Login to Admin Panel
1. Go to `/admin` (or the admin link on your site)
2. Sign in with your auth credentials

### Manage Text Content

#### Step 1: Click on **"📝 Text & Content"** Tab
![Tab Location]

#### Step 2: Search for Content You Want to Edit
- Use the search box (left sidebar) to find content
- Or scroll through the list

#### Step 3: Click "Edit" Button
- A text editor will open
- Modify the content

#### Step 4: Click "✓ Save"
- Changes are instantly saved to Firebase
- Website updates automatically (within seconds)

#### Step 5: Reset to Default (Optional)
- Click "↺ Reset to Default" to undo your changes
- Or use "Reset All" in the sidebar to reset everything

---

## 📝 Content Fields Available

### Home Page
- `home.title` - Website main title (currently "TrueBuild Projects")
- `home.started.year` - Year company started (currently "2018")
- `home.story.title` - Headline (currently "Our Vision")
- `home.story.text` - Full story paragraph

### About Page
- `about.title.1` - First headline (currently "Two engineers.")
- `about.title.2` - Second headline (currently "One vision.")
- `about.subtitle` - Subtitle text

### Services
For each of 4 services, edit:
- `services.service[1-4].title` - Service name
- `services.service[1-4].subtitle` - Tagline
- `services.service[1-4].desc` - Description
- `services.service[1-4].tag` - Category tag
- `services.service[1-4].point[1-5]` - Bullet points

**Example for Service 1 (Construction):**
- `services.service1.title` → "Construction Services"
- `services.service1.subtitle` → "Complete Build"
- `services.service1.desc` → Full description text
- `services.service1.point1` → "Excavation"
- `services.service1.point2` → "Structure — Foundation to Roof"
- etc.

### Contact & Social
- `contact.email` - Email address
- `contact.phone` - Phone number
- `contact.address` - Physical address
- `social.instagram` - Instagram URL
- `social.facebook` - Facebook URL
- `social.linkedin` - LinkedIn URL

---

## 🖼️ How to Manage Images

### Access Image Manager
1. Click **"🖼️ Image Manager"** Tab in Admin Panel
2. Select page section from sidebar (Home, About, Services, etc.)
3. You'll see all images for that section

### Upload/Change an Image

#### Option 1: Upload from Computer
1. Click on an image card
2. Click "Choose File" button
3. Select image from your computer
4. Wait for "✓ Cloudinary par upload ho gayi"
5. Click "✓ Save Image"

#### Option 2: Use Image URL
1. Click on an image card
2. Toggle "Upload Mode" to "URL"
3. Paste image URL (Cloudinary, Unsplash, or any direct link)
4. Click "✓ Save Image"

#### Image Categories:
- **🏠 Home Page** - Hero slides, featured projects
- **👤 About Page** - Hero image, portraits, gallery
- **🛠️ Services Hub** - Service card images
- **🏛️ Architectural** - Project images
- **🏡 Residential** - Residential projects
- **🏢 Commercial** - Commercial projects
- **🏨 Hospitality** - Hospitality projects
- **🪑 Bespoke** - Furniture/crafts
- **🛍️ Shop** - Shop banners
- **✉ Contact** - Contact page images

---

## 🔄 How Changes Work

### Live Updates
1. **Firebase Storage** - All content is saved to Firebase in real-time
2. **Automatic Sync** - Website automatically fetches latest content
3. **No Deployment Needed** - Changes appear instantly (no rebuilding)
4. **Visitor Impact** - Site visitors see changes within seconds

### Fallback System
- If Firebase is unavailable, site shows default content
- You can always reset to defaults from admin panel

---

## ⚠️ Important Notes

### Content Formatting
- For **multi-line text**, use `\n` for new lines or paste formatted text
- For **special characters**, use standard text (emojis work too!)
- **HTML/CSS** not supported (use plain text only)

### Image Best Practices
- **Recommended size**: 1200px × 800px (or larger)
- **Format**: JPG, PNG, or WebP
- **File size**: Under 5MB (Cloudinary will optimize)
- **For banners**: Use 16:9 aspect ratio
- **For cards**: Use 4:3 or square aspect ratio

### Backup
- Firebase auto-saves all changes
- Reset to defaults anytime if needed
- Keep screenshots of important content

---

## 🆘 Troubleshooting

### Changes Not Appearing?
1. **Hard refresh** website (Ctrl+F5 or Cmd+Shift+R)
2. **Wait 5 seconds** - Sometimes takes a moment to sync
3. **Check admin panel** - Verify save was successful

### Image Upload Failed?
1. **Check file size** - Should be under 5MB
2. **Check format** - JPG, PNG, WebP only
3. **Check internet** - Make sure connection is stable
4. **Try URL instead** - Paste Cloudinary or direct image URL

### Can't Login?
1. **Clear browser cookies** for the site
2. **Try incognito/private window**
3. **Check email/password** - Make sure credentials are correct

---

## 📞 Support Files

### Configuration Files Created:
- `src/context/ContentContext.jsx` - Manages all text content
- `src/context/SiteImagesContext.jsx` - Enhanced with new image keys
- `src/App.jsx` - Updated to include ContentProvider
- `src/pages/AdminPanel.jsx` - New Content Manager tab added
- `src/pages/Services.jsx` - Now uses ContentContext
- `src/pages/Home.jsx` - Now uses ContentContext
- `src/pages/About.jsx` - Now uses ContentContext
- `src/pages/Architectural.jsx` - Enhanced with context images

### Firebase Structure:
```
site_content/
  - home.title
  - home.started.year
  - services.service1.title
  - services.service1.subtitle
  - ... (all other content keys)

site_images/
  - overrides/ (modified images)
  - extraKeys/ (admin-added images)
```

---

## ✨ Next Steps

### Client (You) Can Now:
✅ Change all text content without coder help
✅ Update all images without coder help
✅ Manage service descriptions & prices independently
✅ Update contact information anytime
✅ Add new services or modify existing ones

### What Still Requires a Coder:
- Adding completely new pages
- Changing site layout/design
- Adding new features
- Adding new product categories to shop

---

## 📋 Checklist for First-Time Use

- [ ] Login to admin panel
- [ ] Change one text item (e.g., home title) to test
- [ ] Change one image to test
- [ ] Verify changes appear on website
- [ ] Reset one item to test reset functionality
- [ ] Update real content (about, services, contact)
- [ ] Take screenshots of all modified items as backup

---

**🎉 Congratulations!** Your website is now fully self-manageable. No more waiting for coders to make simple changes!

For any issues, check troubleshooting section above or contact your developer.
