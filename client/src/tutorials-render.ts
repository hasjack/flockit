import { esc } from './shared'
import { tutorials, type Tutorial } from './tutorials'

function renderTutorial(tutorial: Tutorial): string {
  const steps = tutorial.steps.map((step) => `<li>${step}</li>`).join('')

  return `
    <section class="section tutorial" id="${esc(tutorial.id)}">
      <h2>${esc(tutorial.title)}</h2>
      <p class="section-intro">${tutorial.intro}</p>
      <figure class="tutorial__figure">
        <img
          class="tutorial__image"
          src="${esc(tutorial.image)}"
          alt="${esc(tutorial.imageAlt)}"
          loading="lazy"
        />
      </figure>
      <ol class="steps">
        ${steps}
      </ol>
    </section>
  `
}

export function renderTutorials(): string {
  return tutorials.map(renderTutorial).join('')
}