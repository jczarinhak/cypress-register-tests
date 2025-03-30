describe('Página de Comentários', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html'); 
  });

  it("verifica se o formulário de comentários está visível", () => {
    cy.contains('h1', 'Deixe seu comentário');
    cy.get('#submit-button').should('be.visible');
    cy.get('#comment-section').should('be.empty');
  });

  it("verifica textos dos botões", () => {
    cy.get('#submit-button').should("have.text", "Enviar Comentário");
  });

  it("verifica atributos dos campos", () => {
    cy.get("#nome").should("have.attr", "placeholder", "Digite seu nome");
    cy.get("#comentario").should("have.attr", "placeholder", "Escreva seu comentário aqui...");
  });

  it("Manipula estados assíncronos e adiciona comentário", () => {
    cy.get("#nome").type("Zarinhak");
    cy.get("#comentario").type("Craque de vôlei!");
    cy.get("#submit-button").click();
    

    cy.get("#loading").should("be.visible");

    cy.get("#loading", { timeout: 6000 }).should("not.be.visible");

    cy.get("#comment-section").contains("Zarinhak: Craque de vôlei!");
  });
});
