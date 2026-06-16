// Caption overrides for filenames that aren't human-readable.
// For new images: name the file descriptively (e.g. "cali-centro-isometric.jpg")
// and it will appear automatically with the filename as caption.
const CAPTIONS = {
  'Gemini_Generated_Image_7njc627njc627njc.png': 'Cam Isometric',
  'Gemini_Generated_Image_38vx5h38vx5h38vx.png': 'CAD Isometric',
  'G_nK-49WwAA4T2F.jpg': 'Condoricosas en EOA 2',
  'G_dImRzWYAExS_0.jpg': 'CAD Isometric 2',
  'G_dyF_SW8AA4CG1.jpg': 'Centro Cali Isometric',
}

const modules = import.meta.glob('../assets/art/*.{jpg,jpeg,png,gif,webp}', { eager: true })

export const artwork = Object.entries(modules).map(([path, mod], i) => {
  const filename = path.split('/').pop()
  const caption = CAPTIONS[filename] ?? filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  return { id: i + 1, src: mod.default, caption, alt: caption }
})
