import { esc, renderTutorialFigure } from './shared'
import { quickStartSections } from './quick-start'

export function renderQuickStartSections(): string {
  return quickStartSections
    .map((section) => {
      const intro = section.intro ? `<p class="section-intro">${section.intro}</p>` : ''
      const figure =
        section.image && section.imageAlt
          ? renderTutorialFigure(section.image, section.imageAlt)
          : ''
      const steps = section.steps.map((step) => `<li>${step}</li>`).join('')
      const video = section.video
        ? `
        <figure class="media__figure">
          <video
            class="media__video"
            src="${esc(section.video)}"
            controls
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            ${section.videoTitle ? `title="${esc(section.videoTitle)}"` : ''}
          ></video>
        </figure>
      `
        : ''

      return `
        <section class="section" id="${esc(section.id)}">
          <h2>${esc(section.title)}</h2>
          ${intro}
          ${figure}
          <ol class="steps">
            ${steps}
          </ol>
          ${video}
        </section>
      `
    })
    .join('')
}