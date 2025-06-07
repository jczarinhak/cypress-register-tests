// cypress/e2e/carrinho.cy.js

describe('Carrinho de Compras', () => {

  const url = 'http://127.0.0.1:5500/e2e/index.html';

  it('deve adicionar o produto ao carrinho e persistir os dados', () => {
    cy.visit(url);

    cy.get('#btn-add').click();

    cy.getCookie('carrinho_token')
      .should('exist')
      .and('have.property', 'value', 'carrinho456');

    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });

    cy.reload();

    cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
  });

  it('deve reconhecer o carrinho como ativo com dados predefinidos', () => {
    cy.visit(url, {
      onBeforeLoad(win) {
        win.document.cookie = "carrinho_token=carrinho456";
        win.localStorage.setItem('itens_carrinho', JSON.stringify(['Livro de Cypress']));
      }
    });

    cy.getCookie('carrinho_token')
      .should('exist')
      .and('have.property', 'value', 'carrinho456');

    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });

    cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
  });

});
