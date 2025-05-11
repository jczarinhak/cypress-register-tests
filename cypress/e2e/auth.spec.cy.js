describe('Fluxo de Autenticação', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/login.html');
  });

  it('Deve fazer login com sucesso', () => {
    cy.get("#email").type('usuario@teste.com');
    cy.get('#senha').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard.html'); 
    cy.contains('Bem-vindo, usuario@teste.com');
  });

  it('Deve bloquear login com senha incorreta', () => {
    cy.get('#email').type('usuario@teste.com');
    cy.get('#senha').type('errado');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Credenciais inválidas');
    });
  });
});
