describe('Proteção de rota', () => {
  it("Deve redirecionar para a página de login ao acessar o dashboard sem estar autenticado", () => {
    cy.visit("http://127.0.0.1:5500/dashboard.html");
    cy.url().should('include', '/login.html');
    
  });
});
