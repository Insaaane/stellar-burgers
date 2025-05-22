export function addIngredient(name: string) {
  cy.get('[data-cy="ingredient-card"]')
    .contains(name)
    .parents('[data-cy="ingredient-card"]')
    .find('button')
    .click();
}
