import { esc } from './shared'

const galleryImages = [
  { src: '/flockit-promo1.jpg', alt: 'FlockIt screenshot 1' },
  { src: '/flockit-promo2.jpg', alt: 'FlockIt screenshot 2' },
  { src: '/flockit-promo3.jpg', alt: 'FlockIt screenshot 3' },
  { src: '/flockit-promo4.jpg', alt: 'FlockIt screenshot 4' },
  { src: '/flockit-promo5.jpg', alt: 'FlockIt screenshot 5' },
  { src: '/flockit-promo6.jpg', alt: 'FlockIt screenshot 6' },
  { src: '/fab-example9.jpg', alt: 'FlockIt Fab screenshot 9' },
  { src: '/fab-example11.jpg', alt: 'FlockIt Fab screenshot 11' },
]

export function renderGallery(): string {
  const [first] = galleryImages
  const thumbs = galleryImages
    .map(
      (image, index) => `
        <button
          type="button"
          class="gallery__thumb${index === 0 ? ' gallery__thumb--active' : ''}"
          data-src="${esc(image.src)}"
          data-alt="${esc(image.alt)}"
          aria-label="Show ${esc(image.alt)}"
          aria-pressed="${index === 0 ? 'true' : 'false'}"
        >
          <img src="${esc(image.src)}" alt="" loading="lazy" />
        </button>
      `
    )
    .join('')

  return `
    <div class="gallery">
      <div class="gallery__stage">
        <img
          class="gallery__main"
          src="${esc(first.src)}"
          alt="${esc(first.alt)}"
        />
      </div>
      <div class="gallery__thumbs" role="toolbar" aria-label="Screenshot picker">
        ${thumbs}
      </div>
    </div>
  `
}

export function initGallery(): void {
  const gallery = document.querySelector<HTMLElement>('.gallery')
  if (!gallery) return

  const main = gallery.querySelector<HTMLImageElement>('.gallery__main')
  const thumbs = gallery.querySelectorAll<HTMLButtonElement>('.gallery__thumb')
  if (!main) return

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src
      const alt = thumb.dataset.alt
      if (!src) return

      main.src = src
      if (alt) main.alt = alt

      thumbs.forEach((other) => {
        const active = other === thumb
        other.classList.toggle('gallery__thumb--active', active)
        other.setAttribute('aria-pressed', active ? 'true' : 'false')
      })
    })
  })
}