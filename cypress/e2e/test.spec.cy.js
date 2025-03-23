describe('Página de Comentários', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html'); // Atualize com o caminho correto
  });

  it('Verifica elementos visíveis', () => {
      cy.contains('h1', 'Deixe seu comentário').should('be.visible');
      cy.get('#submit-button').should('be.visible');
      cy.get('#comment-section').should('be.empty');
  });

  it('Verifica textos dos elementos', () => {
      cy.get('#submit-button').should('have.text', 'Enviar Comentário');
  });

  it('Verifica atributos dos campos de entrada', () => {
      cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome');
      cy.get('#comentario').should('have.attr', 'placeholder', 'Escreva seu comentário aqui...');
  });

  it('Testa envio de comentário e estados assíncronos', () => {
      cy.get('#nome').type('Teste Usuário');
      cy.get('#comentario').type('Este é um comentário de teste.');
      cy.get('#submit-button').click();
      
      cy.get('#loading').should('be.visible');
      cy.wait(2000);
      cy.get('#loading').should('not.be.visible');
      cy.get('#comment-section p').should('contain.text', 'Teste Usuário: Este é um comentário de teste.');
  });
});
