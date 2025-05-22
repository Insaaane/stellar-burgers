import { ApiRoutes } from '../../../mocs/handlers';
import { addIngredient } from '../../support/addIngredient';

describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', ApiRoutes.getUser, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', ApiRoutes.postOrder, {
      fixture: 'postOrderResponse.json'
    }).as('postOrder');

    cy.visit('http://localhost:4000');

    window.localStorage.setItem('accessToken', 'fake-access-token');
    cy.setCookie('refreshToken', 'fake-refresh-token');

    cy.wait('@getIngredients');

    addIngredient('Краторная булка N-200i');
    addIngredient('Биокотлета из марсианской Магнолии');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('refreshToken');
  });

  it('Можно оформить заказ и увидеть модалку с номером', () => {
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@postOrder');

    cy.get('[data-cy="modal"]')
      .should('exist')
      .and('contain', 'идентификатор заказа');
    cy.get('[data-cy="modal"]').should('contain', '2');
  });

  it('Конструктор очищается после закрытия модалки', () => {
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@postOrder');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor-main"]').should(
      'contain',
      'Выберите начинку'
    );
    cy.get('[data-cy="constructor-bun"]').each(($el) => {
      cy.wrap($el).should('contain', 'Выберите булки');
    });
  });
});
