describe('MyPreferencesApp - Testes Funcionais', () => {
  beforeEach(() => {
    // Substitua por caminho relativo se tiver configurado baseUrl no cypress.config.js
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html');
  });

  it('1️⃣ Login com Espera Explícita', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');
    cy.get('#loginBtn').click();

    cy.url().should('include', '/dashboard.html');
    cy.contains('Bem-vindo, admin!').should('be.visible');
  });

  it('2️⃣ Verificação de Cookie', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('http://127.0.0.1:5500/cypress/e2e/dashboard.html');

    cy.getCookie('session_id').should('exist');
    cy.getCookie('session_id').should('have.property', 'value').and('not.be.empty');
    cy.getCookie('session_id').should('have.property', 'path', '/');
  });

  it('3️⃣ Verificação de LocalStorage', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('http://127.0.0.1:5500/cypress/e2e/dashboard.html');

    cy.get('#toggleTheme').click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.eq('dark');
    });

    cy.reload();

    cy.get('body').should('have.class', 'dark');
  });

  it('4️⃣ Navegação Interna com Espera Implícita', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('http://127.0.0.1:5500/cypress/e2e/dashboard.html');

    cy.get('#perfilBtn').click();
    cy.contains('Nome: admin').should('be.visible');

    cy.get('#configBtn').click();
    cy.contains('Preferências do usuário').should('be.visible');
  });

  it('5️⃣ Logout', () => {
    cy.setCookie('session_id', 'abc123');
    cy.visit('http://127.0.0.1:5500/cypress/e2e/dashboard.html');

    cy.get('#logoutBtn').click();

    cy.url().should('include', '/index.html');

    cy.getCookie('session_id').should('not.exist');
  });
});
