import { ApiRoutes } from '../../../mocs/handlers';

describe('Работа модальных окон', () => {
  describe('Открытие модального окна ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', ApiRoutes.getIngredients, {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('http://localhost:4000');
    });

    it('Открывается по клику на ингредиент', () => {
      cy.wait('@getIngredients');
      cy.get('[data-cy="ingredient-card"]')
        .contains('Краторная булка N-200i')
        .click();

      cy.get('[data-cy="modal"]')
        .should('exist')
        .and('contain', 'Краторная булка N-200i');
    });
  });

  describe('Закрытие модального окна ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', ApiRoutes.getIngredients, {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
      cy.get('[data-cy="ingredient-card"]')
        .contains('Краторная булка N-200i')
        .click();
    });

    it('Закрывается по крестику', () => {
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрывается по клику на оверлей', () => {
      cy.get('body').click('left');
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрывается по нажатию Esc', () => {
      cy.get('body').type('{esc}');
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});
