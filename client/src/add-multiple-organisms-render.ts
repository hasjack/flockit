import { esc, renderTutorialFigure, renderWarning } from './shared'
import { addMultipleOrganismsIntro, addMultipleOrganismsParts } from './add-multiple-organisms'

function renderSteps(steps: string[]): string {
  const items = steps.map((step) => `<li>${step}</li>`).join('')
  return `<ol class="steps">${items}</ol>`
}

export function renderAddMultipleOrganisms(): string {
  const sections = addMultipleOrganismsParts
    .map(
      (part) => `
    <section class="section tutorial" id="${esc(part.id)}">
      <h2>${esc(part.title)}</h2>
      ${part.figure ? renderTutorialFigure(part.figure.image, part.figure.imageAlt) : ''}
      ${part.warning ? renderWarning(part.warning) : ''}
      ${renderSteps(part.steps)}
    </section>
  `
    )
    .join('')

  return `
    <p class="section-intro">${addMultipleOrganismsIntro}</p>
    ${sections}
  `
}