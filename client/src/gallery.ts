import { esc } from './shared'

type GalleryImage = {
  kind?: 'image'
  src: string
  alt: string
}

type GalleryVideo = {
  kind: 'video'
  src: string
  alt: string
  /** YouTube watch URL or embed URL */
  videoUrl: string
}

type GalleryItem = GalleryImage | GalleryVideo

const YOUTUBE_PROMO = 'https://www.youtube.com/watch?v=D6Vl-0VL0JI'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/D6Vl-0VL0JI'

const galleryItems: GalleryItem[] = [
  {
    kind: 'video',
    src: '/flockit-promo11.png',
    alt: 'FlockIt launch promo video',
    videoUrl: YOUTUBE_PROMO,
  },
  { src: '/flockit-promo1.jpg', alt: 'FlockIt screenshot 1' },
  { src: '/flockit-promo2.jpg', alt: 'FlockIt screenshot 2' },
  { src: '/flockit-promo3.jpg', alt: 'FlockIt screenshot 3' },
  { src: '/flockit-promo4.jpg', alt: 'FlockIt screenshot 4' },
  { src: '/flockit-promo5.jpg', alt: 'FlockIt screenshot 5' },
  { src: '/flockit-promo6.jpg', alt: 'FlockIt screenshot 6' },
  { src: '/fab-example9.jpg', alt: 'FlockIt Fab screenshot 9' },
  { src: '/fab-example11.jpg', alt: 'FlockIt Fab screenshot 11' },
]

const videoIconSvg = `
  <span class="gallery__video-icon" aria-hidden="true" title="Video">
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2.5" y="6.5" width="13" height="11" rx="2"/>
      <path d="M15.5 10.5 21 7.5v9l-5.5-3z"/>
    </svg>
  </span>
`

function isVideo(item: GalleryItem): item is GalleryVideo {
  return item.kind === 'video'
}

function stageMarkup(item: GalleryItem): string {
  if (isVideo(item)) {
    return `
      <div class="gallery__stage gallery__stage--video">
        <iframe
          class="gallery__main gallery__main--video"
          src="${esc(YOUTUBE_EMBED)}"
          title="${esc(item.alt)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    `
  }

  return `
    <div class="gallery__stage">
      <img
        class="gallery__main"
        src="${esc(item.src)}"
        alt="${esc(item.alt)}"
      />
    </div>
  `
}

export function renderGallery(): string {
  const [first] = galleryItems
  const thumbs = galleryItems
    .map((item, index) => {
      const video = isVideo(item)
      return `
        <button
          type="button"
          class="gallery__thumb${index === 0 ? ' gallery__thumb--active' : ''}${video ? ' gallery__thumb--video' : ''}"
          data-src="${esc(item.src)}"
          data-alt="${esc(item.alt)}"
          data-kind="${video ? 'video' : 'image'}"
          ${video ? `data-video-url="${esc(item.videoUrl)}"` : ''}
          aria-label="Show ${esc(item.alt)}"
          aria-pressed="${index === 0 ? 'true' : 'false'}"
        >
          <img src="${esc(item.src)}" alt="" loading="lazy" />
          ${video ? videoIconSvg : ''}
        </button>
      `
    })
    .join('')

  return `
    <div class="gallery">
      ${stageMarkup(first)}
      <div class="gallery__thumbs" role="toolbar" aria-label="Screenshot picker">
        ${thumbs}
      </div>
    </div>
  `
}

export function initGallery(): void {
  const gallery = document.querySelector<HTMLElement>('.gallery')
  if (!gallery) return

  const thumbs = gallery.querySelectorAll<HTMLButtonElement>('.gallery__thumb')

  const setActive = (thumb: HTMLButtonElement) => {
    thumbs.forEach((other) => {
      const active = other === thumb
      other.classList.toggle('gallery__thumb--active', active)
      other.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
  }

  const showImage = (src: string, alt: string) => {
    const existingStage = gallery.querySelector('.gallery__stage')
    if (!existingStage) return

    const stage = document.createElement('div')
    stage.className = 'gallery__stage'
    stage.innerHTML = `
      <img
        class="gallery__main"
        src="${esc(src)}"
        alt="${esc(alt)}"
      />
    `
    existingStage.replaceWith(stage)
  }

  const showVideo = (alt: string) => {
    const existingStage = gallery.querySelector('.gallery__stage')
    if (!existingStage) return

    const stage = document.createElement('div')
    stage.className = 'gallery__stage gallery__stage--video'
    stage.innerHTML = `
      <iframe
        class="gallery__main gallery__main--video"
        src="${esc(YOUTUBE_EMBED)}"
        title="${esc(alt)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `
    existingStage.replaceWith(stage)
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src
      const alt = thumb.dataset.alt ?? ''
      const kind = thumb.dataset.kind ?? 'image'
      if (!src) return

      if (kind === 'video') {
        showVideo(alt)
      } else {
        showImage(src, alt)
      }

      setActive(thumb)
    })
  })
}
