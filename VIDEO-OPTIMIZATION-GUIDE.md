# Video Optimization Guide

## Current Issue

The hero video `newfounderflowvideo.mp4` is **71MB**, which significantly impacts page load time and user experience, especially on slower connections.

**Assets folder currently contains:**
- `newfounderflowvideo.mp4` - 71MB (currently used)
- `3195441-uhd_3840_2160_25fps.mp4` - 19.8MB (unused)
- `founderflowvideo.mp4` - 6.3MB (unused)

---

## Recommended Solution

Compress the hero video to under **5MB** using FFmpeg while maintaining visual quality.

---

## Option 1: Use FFmpeg (Recommended)

### Install FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html)

**Linux:**
```bash
sudo apt install ffmpeg
```

### Compression Command

Navigate to the assets folder and run:

```bash
cd assets

# High quality compression (target ~5MB)
ffmpeg -i newfounderflowvideo.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1920:-2" \
  -movflags +faststart \
  -an \
  newfounderflowvideo-optimized.mp4
```

### Command Explanation:
- `-vcodec libx264`: Use H.264 codec (best compatibility)
- `-crf 28`: Quality level (18-32, lower = better quality, 28 is good balance)
- `-preset slow`: Slower encoding for better compression
- `-vf "scale=1920:-2"`: Scale to 1920px width (Full HD), maintain aspect ratio
- `-movflags +faststart`: Enable streaming (loads while playing)
- `-an`: Remove audio track (not needed for background video)

### Test Different Quality Levels:

If the file is still too large, increase CRF:
```bash
# More compression (~3MB)
ffmpeg -i newfounderflowvideo.mp4 -vcodec libx264 -crf 30 -preset slow -vf "scale=1920:-2" -movflags +faststart -an newfounderflowvideo-optimized.mp4

# Maximum compression (~2MB)
ffmpeg -i newfounderflowvideo.mp4 -vcodec libx264 -crf 32 -preset slow -vf "scale=1280:-2" -movflags +faststart -an newfounderflowvideo-optimized.mp4
```

### Update HTML:

After compression, update [index.html](index.html):

```html
<source src="assets/newfounderflowvideo-optimized.mp4" type="video/mp4" />
```

---

## Option 2: Use Online Tool

### Recommended Tools:
1. **HandBrake** (Free, desktop app)
   - Download: [handbrake.fr](https://handbrake.fr/)
   - Settings: Use "Web" preset, adjust quality slider to 22-28

2. **CloudConvert** (Online)
   - Website: [cloudconvert.com](https://cloudconvert.com/mp4-converter)
   - Upload video, select MP4, set quality to 70-80%

3. **Clipchamp** (Microsoft, Free)
   - Website: [clipchamp.com](https://clipchamp.com/)
   - Export settings: 1080p, High quality

---

## Option 3: Use Existing Video

The `founderflowvideo.mp4` (6.3MB) is already optimized. Consider using it instead:

**Update [index.html](index.html) line 89:**
```html
<source src="assets/founderflowvideo.mp4" type="video/mp4" />
```

---

## Testing After Optimization

### Check File Size:
```bash
ls -lh assets/*.mp4
```

### Test Video Quality:
1. Open the video in a browser
2. Check if quality is acceptable
3. Verify playback is smooth

### Measure Page Performance:
1. Open Chrome DevTools (F12)
2. Go to "Network" tab
3. Reload page with Shift+F5
4. Check total page size and load time

**Target Metrics:**
- Page size: < 10MB total
- Load time: < 3 seconds on 3G
- Video should start playing within 2 seconds

---

## Cleanup After Optimization

Once you have a working optimized video:

```bash
# Delete unused video files to save space
cd assets
rm "3195441-uhd_3840_2160_25fps.mp4"  # 19.8MB
rm newfounderflowvideo.mp4             # 71MB (keep backup first!)

# Optional: Delete alternative if not needed
rm founderflowvideo.mp4                # 6.3MB
```

**Important**: Always keep a backup of original video before deleting!

---

## Advanced: Serve WebM for Modern Browsers

For even better compression, create a WebM version:

```bash
ffmpeg -i newfounderflowvideo.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -vf "scale=1920:-2" \
  -an \
  newfounderflowvideo.webm
```

Update HTML to serve both formats:

```html
<video class="hero-video-media" autoplay muted loop playsinline aria-hidden="true">
  <source src="assets/newfounderflowvideo.webm" type="video/webm" />
  <source src="assets/newfounderflowvideo-optimized.mp4" type="video/mp4" />
</video>
```

Browsers will automatically choose the best supported format.

---

## Expected Results

### Before Optimization:
- Video size: 71MB
- Page load: 8-15 seconds on 4G
- Total page size: ~72MB

### After Optimization:
- Video size: 3-5MB ⬇️ 93% reduction
- Page load: 2-4 seconds on 4G ⬆️ 75% faster
- Total page size: ~6MB ⬇️ 92% reduction

---

## Alternative: Remove Video Entirely

If video optimization is too complex, consider removing it entirely since you already have a mobile fallback gradient.

**Update [styles.css](styles.css):**

```css
.hero-video {
  display: none; /* Hide video on all devices */
}

#hero {
  background:
    radial-gradient(circle at 20% 30%, rgba(0, 133, 255, 0.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(23, 52, 70, 0.1), transparent 50%),
    linear-gradient(to bottom, #173446 0%, #0a1f2e 100%);
}
```

This would reduce page size by 71MB instantly while maintaining the visual design.

---

## Questions?

If you need help with video compression, feel free to ask!
