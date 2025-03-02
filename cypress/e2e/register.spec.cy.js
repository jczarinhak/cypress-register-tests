describe('Testar pagina Cadastro', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html');
  });

  it('Verifica se o formulário de cadastro está visível', () => {
    cy.get('#register-form').should('be.visible');
  });

  it('Verifica se há três campos de input na página', () => {
    cy.get('.input-field').should('have.length', 3);
  });

  it('Verifica se o botão de cadastro possui o texto correto', () => {
    cy.contains('button', 'Cadastrar').should('be.visible');
  });

  it('Verifica se o link de login está visível e funcional', () => {
    cy.get('.login-link')
      .should('be.visible')
      .and('contain', 'Já tem uma conta? Faça login')
      .click();
  });

  it('Preenche o formulário de cadastro e submete', () => {
    const nome = 'Jose Carlos';
    const email = 'jose@example.com';
    const senha = 'senha123';

    cy.get('input[type="text"]').type(nome).should('have.value', nome);
    cy.get('input[type="email"]').type(email).should('have.value', email);
    cy.get('input[type="password"]').type(senha).should('have.value', senha);

    cy.get('#register-button')
      .should('not.be.disabled')
      .click();
  });
});
