import { esc, renderTutorialFigure } from './shared'
import { addAnOrganismMeshParts } from './add-an-organism-mesh'

function renderSteps(steps: string[]): string {
  const items = steps.map((step) => `<li>${step}</li>`).join('')
  return `<ol class="steps">${items}</ol>`
}

export function renderAddAnOrganismMesh(): string {
  return addAnOrganismMeshParts
    .map((part) => {
      const intro = part.intro ? `<p class="section-intro">${part.intro}</p>` : ''

      return `
    <section class="section tutorial" id="${esc(part.id)}">
      <h2>${esc(part.title)}</h2>
      ${intro}
      ${renderTutorialFigure(part.figure.image, part.figure.imageAlt)}
      ${renderSteps(part.steps)}
    </section>
  `
    })
    .join('')
}