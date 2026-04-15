# LuckyHDR Project Website — TODO

## Content (Pre-Publication)

- [ ] **Overview video**: Replace placeholder thumbnail with actual video
  - Option A: Embed `siggraph2026/media/presentation_video.mp4` as `<video>` tag
  - Option B: Upload to YouTube/Vimeo and embed iframe
  - File: `index.html` (search for `id="videoPlaceholder"`)

- [ ] **2-frame merge image**: Replace synthetic placeholder with real LuckyHDR output
  - Current `assets/images/comparisons/house_merge_2frames.webp` is a fake blend
  - Run LuckyHDR inference with only 2 input frames (short + mid) on the house scene
  - Convert output to WebP and replace the file

- [ ] **Paper / Code / Dataset links**: Hero buttons currently point to `#`
  - Update with arXiv link, GitHub repo URL, dataset download URL
  - File: `index.html` (search for `class="hero-links"`)

- [ ] **Extreme dynamic range merging results**: Add results from the paper showing extreme DR scenes
  - Demonstrates LuckyHDR on very large exposure gaps (5+ EV steps)
  - Add as a new gallery row or dedicated section

- [ ] **Landscape hero/banner image**: Add a wide, ultra-high-res HDR result (landscape orientation)
  - Ideal: an extreme dynamic range scene that showcases the method's capability
  - Could be used as a full-width banner section or replace the hero background
  - Recommended resolution: 3840+ px wide, landscape aspect ratio

- [ ] **More gallery images**: Expand the Real-World Gallery with additional diverse scenes
  - Source: `LuckyHDRSupp/web_vis/images/` has 40 scenes with method comparisons
  - Pick scenes where LuckyHDR's advantage is most visible (ghosting, noise, HDR detail)
  - Convert to WebP, generate thumbs, and add to `assets/images/gallery/`
  - Aim for 12-16 gallery images total (currently 8)

- [ ] **More comparison scenes**: Add additional scenes to the Comparisons section
  - Each scene needs: `{scene}_luckyhdr.webp`, `{scene}_hdrflow.webp`, `{scene}_safnet.webp`, `{scene}_ahdrnet.webp`, `{scene}_hdrtransformer.webp`, plus `{scene}_input_short/mid/long.webp`
  - Source: `LuckyHDRSupp/web_vis/images/` has 40 scenes
  - Add scene buttons in `index.html` (search for `class="scene-btn"`) and update JS `gridMethods`

- [ ] **Pick ~8 best supplementary scenes** from `LuckyHDRSupp/web_vis/images/` to add to gallery
  - Look for: night scenes, extreme contrast, indoor/outdoor mix, motion blur handling
  - Convert LuckyHDR outputs to WebP, generate thumbs

## Structure

```
website/
├── index.html              Main page
├── style.css               Styles (dark theme, responsive, animations)
├── script.js               Interactions (slider, merge demo, counters, lightbox)
├── favicon.png             Browser tab icon
├── apple-touch-icon.png    iOS icon
├── og-image.jpg            Social sharing preview image
└── assets/images/
    ├── comparisons/        Comparison images (4 scenes x 8 methods, WebP)
    │   └── house_merge_*.webp   Progressive merge results
    ├── gallery/            Full-res gallery images (WebP)
    │   └── thumbs/         Gallery thumbnails (600px, WebP)
    ├── method/             Method diagram, attention maps, shift maps
    ├── results/            Hero background images
    ├── princetonu_logo.webp
    ├── adobe_logo.webp
    └── waabi_logo.webp
```

## Features Implemented

- [x] Sticky frosted-glass navbar with scroll progress bar
- [x] Hero with parallax background, HDR glow effect
- [x] Author names linked to personal websites
- [x] Institution logos (Princeton, Adobe, Waabi)
- [x] Video section (placeholder, ready for real video)
- [x] Abstract section (moved above the fold)
- [x] Progressive merge demo (click frames to build HDR incrementally)
- [x] Method overview with pan-on-hover
- [x] Animated stat counters (66K params, 50x smaller, 62ms, 40.5dB)
- [x] "What the Network Sees" visualization grid (3x2: output + shifts + weights)
- [x] Before/after comparison slider (mouse + touch + keyboard)
- [x] Zoom crop inset (follows mouse, split left/right with labels)
- [x] Scene selector (4 scenes) + method selector (7 baselines + 3 inputs)
- [x] Quantitative results tables with tab switching (2EV, 3EV, affine)
- [x] Real-world gallery (4x2 grid, thumbnails, lightbox with fade animation)
- [x] BibTeX with copy-to-clipboard
- [x] Mobile hamburger menu (768px breakpoint)
- [x] Staggered fade-in scroll animations
- [x] SEO meta tags, Open Graph, Twitter Card
- [x] All images optimized as WebP (193MB PNG -> 12MB WebP)
- [x] Lazy loading on all below-fold images
- [x] Reduced motion media query for accessibility
- [x] Comparison image fade transitions on scene/method switch
