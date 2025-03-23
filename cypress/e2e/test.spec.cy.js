describe('Página de Comentários', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html'); // URL da página que você mencionou
  });

  it('Deve exibir o título "Deixe seu comentário"', () => {
    cy.get('h1').should('have.text', 'Deixe seu comentário');
  });

  it('Deve exibir o botão "Enviar Comentário"', () => {
    cy.get('button#submit-button').should('be.visible').and('have.text', 'Enviar Comentário');
  });

  it('Deve verificar que a área de exibição de comentários começa vazia', () => {
    cy.get('#comment-section').should('be.empty');
  });

  it('Deve validar os placeholders nos campos de nome e comentário', () => {
    cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome');
    cy.get('#comentario').should('have.attr', 'placeholder', 'Escreva seu comentário aqui...');
  });

  it('Deve exibir "Enviando..." após clicar no botão de envio', () => {
    cy.get('#nome').type('José');
    cy.get('#comentario').type('Esse é um comentário de teste.');
    cy.get('button#submit-button').click();
    cy.get('#loading').should('be.visible').and('have.text', 'Enviando...');
  });

  it('Deve adicionar um comentário à lista após o envio', () => {
    cy.get('#nome').type('José');
    cy.get('#comentario').type('Esse é um comentário de teste.');
    cy.get('button#submit-button').click();
    
    // Verifica que a mensagem "Enviando..." desapareceu após 2 segundos
    cy.wait(2000);
    cy.get('#loading').should('not.be.visible');
    
    // Verifica se o comentário foi adicionado à lista
    cy.get('#comment-section p').should('have.length', 1)
      .and('contain.text', 'José: Esse é um comentário de teste.');
  });
});
