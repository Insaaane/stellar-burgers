import { ApiRoutes } from '../../../mocs/handlers';
import { addIngredient } from '../../support/addIngredient';

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('Можно добавить булку', () => {
    addIngredient('Краторная булка N-200i');

    cy.get('[data-cy="constructor-bun"]').each(($el) => {
      cy.wrap($el).should('contain', 'Краторная булка N-200i');
    });
  });

  it('Можно добавить начинку', () => {
    addIngredient('Биокотлета из марсианской Магнолии');

    cy.get('[data-cy="constructor-main"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Можно добавить несколько начинок и удалить одну', () => {
    addIngredient('Биокотлета из марсианской Магнолии');
    addIngredient('Филе Люминесцентного тетраодонтимформа');

    cy.get('[data-cy="constructor-main"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy="constructor-main"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );

    // удаляем ингредиент
    cy.get('[data-cy="constructor-main-inner"] .constructor-element__action')
      .first()
      .click();

    cy.get('[data-cy="constructor-main"]').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy="constructor-main"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
  });
});
