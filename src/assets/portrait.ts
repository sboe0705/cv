/**
 * The shipped portrait, in both formats. Two consumers — the hero and the
 * printed document — so the URLs live here rather than being rebuilt in each.
 *
 * Pre-cropped to the 320×380 hero slot at 2× and stripped of EXIF. The
 * uncropped `portrait-source.jpg` is deliberately NOT exported: importing it
 * would bundle it, metadata and all (see CLAUDE.md).
 */
export const portraitWebp = new URL('./portrait.webp', import.meta.url).href
export const portraitJpg = new URL('./portrait.jpg', import.meta.url).href
