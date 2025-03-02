describe('Acessando o portal do aluno', () => {
  it('Deve fazer login no portal do aluno', () => {
    cy.visit('https://guairaca.jacad.com.br/academico/aluno-v2/login');

    // Aguarda o carregamento da página
    cy.wait(2000);

    // Preenche os campos de login
    cy.get('#login').should('be.visible').type('Jose');
    cy.get('#senha').should('be.visible').type('12345678', { log: false }); // Oculta a senha nos logs

    // Clica no botão de login
    cy.get('#btn-login').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/dashboard'); // Ajuste conforme necessário
  });
});

