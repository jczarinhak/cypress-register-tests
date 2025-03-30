describe('Teste de Avaliação do Veículo', () => {
    
  beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html'); 
  });

  it('Verifica se os elementos da página estão visíveis', () => {
      cy.contains('h1', 'Avaliação do Veículo').should('be.visible');
      cy.get('#nome').should('be.visible').and('have.attr', 'placeholder', 'Digite seu nome');
      cy.get('#comentario').should('be.visible').and('have.attr', 'placeholder', 'Descreva sua experiência com o veículo...');
      cy.get('#submit-button').should('be.visible').and('contain.text', 'Enviar Avaliação');
      cy.get('#avaliacoes').should('be.empty');
  });

  it('Testa o envio de uma avaliação válida', () => {
      cy.get('#nome').type('Zarinhak');
      cy.get('#comentario').type('Ótimo carro! Muito confortável.');
      cy.get('#submit-button').click();

      cy.get('#loading').should('be.visible').and('contain.text', 'Enviando avaliação...');
      cy.wait(3000);
      
      cy.get('#loading').should('not.be.visible');
      cy.get('#avaliacoes').should('contain.text', 'Zarinhak: Ótimo carro! Muito confortável.');
  });

  it('Exibe alerta ao tentar enviar avaliação sem nome', () => {
      cy.get('#comentario').type('Carro muito econômico!');
      cy.get('#submit-button').click();

      cy.on('window:alert', (text) => {
          expect(text).to.contains('Por favor, preencha todos os campos.');
      });

      cy.get('#avaliacoes').should('be.empty');
  });

  it('Exibe alerta ao tentar enviar avaliação sem comentário', () => {
      cy.get('#nome').type('Maria Teste');
      cy.get('#submit-button').click();

      cy.on('window:alert', (text) => {
          expect(text).to.contains('Por favor, preencha todos os campos.');
      });

      cy.get('#avaliacoes').should('be.empty');
  });

});
