// cypress/e2e/carrinho.cy.js

describe('Carrinho de Compras', () => {

  const url = 'http://127.0.0.1:5500/e2e/index.html';

  it('deve adicionar o produto ao carrinho e persistir os dados', () => {
    cy.visit(url);

    // Clica no botão "Adicionar ao Carrinho"
    cy.get('#btn-add').click();

    // Verifica se o cookie foi criado corretamente
    cy.getCookie('carrinho_token')
      .should('exist')
      .and('have.property', 'value', 'carrinho456');

    // Verifica se o localStorage contém o produto
    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });

    // Recarrega a página e verifica se os dados persistem
    cy.reload();

    // Verifica se a mensagem aparece corretamente
    cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
  });

  it('deve reconhecer o carrinho como ativo com dados predefinidos', () => {
    cy.visit(url, {
      onBeforeLoad(win) {
        // Define o cookie e localStorage antes de carregar a página
        win.document.cookie = "carrinho_token=carrinho456";
        win.localStorage.setItem('itens_carrinho', JSON.stringify(['Livro de Cypress']));
      }
    });

    // Verifica o cookie
    cy.getCookie('carrinho_token')
      .should('exist')
      .and('have.property', 'value', 'carrinho456');

    // Verifica o localStorage
    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });

    // Verifica a mensagem exibida
    cy.get('#mensagem').should('contain', 'Carrinho com 1 item');
  });

});
