# 🚀 Quick Fix Guide - Remaining Detail Pages

**Total Pages to Fix:** 28 detail pages  
**Estimated Time:** 2-3 hours for manual updates

---

## 🎯 Fastest Solution

Since you need all pages fixed, here's the most efficient approach:

### Option 1: Use Find & Replace (10 minutes)

All detail pages follow the same pattern. Use VSCode's multi-file find & replace:

1. **Open VSCode Command Palette** (Ctrl+Shift+F)

2. **Find in Files:**
```
https://placehold\.co/[^']+
```
*(Enable regex)*

3. **Replace with:** *(Leave blank for now)*

4. **Files to Include:**
```
src/app/experiences/**/*.tsx
src/app/workshops/**/*.tsx
src/app/blogs/**/*.tsx
src/app/praises/**/*.tsx
```

5. **Manual Mapping Required:**
   - Each page needs specific images
   - Use the images from `src/lib/images.ts` that match the content
   - Review each replacement before applying

---

## 📋 Page-by-Page Mapping

### Experiences (Use existing `experienceImages`)

All experience detail pages can use the same images from the listing:

```typescript
// Add to each experience detail page
import { getImageKitUrl, experienceImages } from '@/lib/images';

// Then use:
experienceImages.wildlifeSafaris
experienceImages.guidedForestTrails
experienceImages.birdWatching
// etc.
```

### Workshops (Use existing `workshopImages`)

```typescript
// Add to each workshop detail page
import { getImageKitUrl, workshopImages } from '@/lib/images';

// Then use:
workshopImages.starGazing
workshopImages.astroPhotography
workshopImages.earthenPottery
// etc.
```

### Blogs (Use existing `blogImages`)

```typescript
// Add to each blog detail page
import { getImageKitUrl, blogImages } from '@/lib/images';

// Then use:
blogImages.monsoonForest
blogImages.mudBuilding
blogImages.tigerSighting
```

---

## 🔧 Automated Solution (FASTEST!)

Create this script and run it:

### File: `fix-images.js`

```javascript
const fs = require('fs');
const path = require('path');

const imageMap = {
  // Experiences
  'wildlife-safaris': 'experienceImages.wildlifeSafaris',
  'guided-forest-trails': 'experienceImages.guidedForestTrails',
  'bird-watching-expeditions': 'experienceImages.birdWatching',
  'farm-life-visit': 'experienceImages.farmLife',
  'know-your-crop': 'experienceImages.knowYourCrop',
  'play-at-surwahi': 'experienceImages.playAtSurwahi',
  'outdoor-sports-and-nature-games': 'experienceImages.outdoorSports',
  'eco-volunteering-programs': 'experienceImages.ecoVolunteering',
  'cultural-immersion-and-local-life': 'experienceImages.culturalImmersion',
  'live-tribal-cooking-experiences': 'experienceImages.tribalCooking',
  
  // Workshops
  'star-gazing-nights': 'workshopImages.starGazing',
  'astro-photography': 'workshopImages.astroPhotography',
  'earthen-pottery': 'workshopImages.earthenPottery',
  'gond-art-workshops': 'workshopImages.gondArt',
  'bamboo-and-lantana-crafting': 'workshopImages.bambooCrafting',
  'forest-bathing': 'workshopImages.forestBathing',
  'leaf-plate-making': 'workshopImages.leafPlate',
  'food-foraging-trails': 'workshopImages.foodForaging',
  'herping-walks': 'workshopImages.herping',
  'the-art-of-regeneration': 'workshopImages.regeneration',
  'grassroots-governance-and-local-democracy': 'workshopImages.governance',
  'natures-pharmacy': 'workshopImages.naturesPharmacy',
  'build-with-mud': 'workshopImages.buildWithMud',
};

function fixFile(filePath, slug, category) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add import if not present
  if (!content.includes('getImageKitUrl')) {
    content = content.replace(
      "import { generatePageMetadata } from '@/lib/seo';",
      "import { generatePageMetadata } from '@/lib/seo';\nimport { getImageKitUrl, " + category + "Images } from '@/lib/images';"
    );
  }
  
  // Replace placeholders with mapped image
  const imageVar = imageMap[slug];
  if (imageVar) {
    content = content.replace(
      /src: 'https:\/\/placehold\.co\/[^']+'/g,
      `src: ${imageVar}`
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed: ${filePath}`);
}

// Process all files
const experiences = fs.readdirSync('src/app/experiences').filter(f => f !== 'page.tsx');
experiences.forEach(slug => {
  const filePath = path.join('src/app/experiences', slug, 'page.tsx');
  if (fs.existsSync(filePath)) {
    fixFile(filePath, slug, 'experience');
  }
});

// Repeat for workshops, blogs, etc.
```

**Run:**
```bash
node fix-images.js
```

---

## ⚡ Manual Fix Template

For each detail page, follow this pattern:

### Step 1: Add Import
```typescript
import { getImageKitUrl } from '@/lib/images';
```

### Step 2: Replace Images

**Before:**
```typescript
images: [
  { src: 'https://placehold.co/...', alt: '...' },
  { src: 'https://placehold.co/...', alt: '...' },
  { src: 'https://placehold.co/...', alt: '...' },
  { src: 'https://placehold.co/...', alt: '...' },
]
```

**After:**
```typescript
images: [
  { src: getImageKitUrl('Website Photos/relevant-image-1.jpg'), alt: '...' },
  { src: getImageKitUrl('Website Photos/relevant-image-2.jpg'), alt: '...' },
  { src: getImageKitUrl('Website Photos/relevant-image-3.jpg'), alt: '...' },
  { src: getImageKitUrl('Website Photos/relevant-image-4.jpg'), alt: '...' },
]
```

---

## 📸 Available Images by Category

### Wildlife/Nature
```
Website Photos/IMG_5090.JPG - Tiger
Website Photos/IMG_5091.JPG - Hornbill
Website Photos/IMG_5093[1].JPG - Birds
Website Photos/IMG_4518.JPG - Insects
Website Photos/IMG_5224.JPG - Butterflies
```

### Forest/Trails
```
Website Photos/IMG20231020170019.jpg - Forest trail
Website Photos/IMG20231020171008.jpg - Forest path
Website Photos/IMG_3048.JPG - Nature scene
```

### Activities/People
```
Surwahi Social Photos/IMG_20200217_095015 (2).jpg - Farm activity
Surwahi Social Photos/IMG_20220408_180107.jpg - Outdoor activity
Surwahi Social Photos/3c3adbb2-aacd-4c01-8aa0-01615b0912e8.jpeg - Community
```

### Dining/Food
```
Surwahi Social Photos/Dining Area/Khichdi_Dinner_Displayed_On_Table_Landscape_Closeup_1 - Copy (2).JPG
Surwahi Social Photos/Dining Area/Serving_Table_From_Entrance_with_Kitchen_Satkon.JPG
Surwahi Social Photos/Breakfast_under_Mahua_with_staff_in_Compound_2.jpg
```

### Art/Crafts
```
Surwahi Social Photos/Jholar_Corridor_Wall_Painting.jpg - Gond art
Website Photos/IMG_3202.JPG - Bamboo crafting
Website Photos/0eff556c5ffef77703536bec9bd14585.jpg - Pottery
```

### Construction/Architecture
```
Surwahi Social Photos/A.jpg - Mud construction
Website Photos/DJI_20250819094744_0109_D.JPG - Aerial view
Surwahi Social Photos/Corridor_Reception_Entrance_Night_Landscape_2.JPG - Interior
```

### Night Sky
```
Website Photos/IMG_20250525_230538.jpg - Stars
```

---

## ✅ Checklist for Each Page

For every detail page you fix:

- [ ] Add import statement
- [ ] Replace all 4 placeholder images
- [ ] Choose contextually appropriate images
- [ ] Test page loads correctly
- [ ] Verify images display properly

---

## 🎯 Priority Order

If you want to fix pages incrementally:

### Phase 1 (Most Visited)
1. Experience detail pages (10 pages)
2. Workshop detail pages (13 pages)

### Phase 2 (Less Critical)
3. Blog detail pages (3 pages)
4. Praise detail pages (2 pages)

---

## ⏱️ Time Estimates

| Method | Time | Difficulty |
|--------|------|------------|
| **Automated Script** | 5-10 min | Easy (if script works) |
| **VSCode Find/Replace** | 30-45 min | Medium |
| **Manual One-by-One** | 2-3 hours | Easy but tedious |

---

## 🚨 Important Notes

1. **Test After Each Change:** Run `npm run dev` and check pages
2. **Use Consistent Images:** Reuse same images for similar content
3. **Don't Mix Up:** Make sure wildlife pages get nature images, not dining images
4. **Save Often:** Commit changes frequently to Git

---

**Recommendation:** Use the automated script approach or systematic VSCode find/replace to save time!
