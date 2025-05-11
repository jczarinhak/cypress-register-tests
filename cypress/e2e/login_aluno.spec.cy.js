describe('Login do Aluno - Área de Membros', () => {
  const url = 'http://127.0.0.1:5500/cypress/e2e/index.html';
  const email = 'aluno@curso.com';
  const senha = 'curso2024';

  it('Deve realizar login, armazenar cookie e localStorage, e persistir após recarregar', () => {
    // Visita a página
    cy.visit(url);

    // Preenche o formulário de login
    cy.get('#email').type(email);
    cy.get('#senha').type(senha);
    cy.get('form').submit();

    // Verifica a mensagem de sucesso
    cy.contains('Acesso concedido!');

    // Verifica o cookie "curso_token"
    cy.getCookie('curso_token').should('exist');
    cy.getCookie('curso_token').should('have.property', 'value', 'curso123');

    // Verifica o localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('aluno_email')).to.equal(email);
    });

    // Recarrega a página
    cy.reload();

    // Garante que o cookie ainda está disponível
    cy.getCookie('curso_token').should('exist');
    cy.getCookie('curso_token').should('have.property', 'value', 'curso123');

    // Garante que o localStorage ainda tem o e-mail salvo
    cy.window().then((win) => {
      expect(win.localStorage.getItem('aluno_email')).to.equal(email);
    });
  });
});
