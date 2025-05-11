describe('Teste do EduTech', () => {

  it('Deve navegar da página inicial para a página de login', () => {
    cy.visit('http://127.0.0.1:5500/home.html')
    cy.contains('Entrar').click()
    cy.url().should('include', '/login.html')
  })

  it('Deve realizar o login com credenciais corretas', () => {
    cy.visit('http://127.0.0.1:5500/login.html')
    cy.get('#email').type('aluno@edutech.com')
    cy.get('#senha').type('curso123')
    cy.get('form').submit()
    cy.url().should('include', '/painel.html')
    cy.contains('Bem-vindo, aluno!')
  })

  it('Deve exibir alerta de erro ao tentar login com senha incorreta', () => {
    cy.visit('http://127.0.0.1:5500/login.html')
    cy.get('#email').type('aluno@edutech.com')
    cy.get('#senha').type('senhaerrada')
    cy.on('window:alert', (msg) => {
      expect(msg).to.contain('E-mail ou senha incorretos')
    })
    cy.get('form').submit()
  })

  it('Deve redirecionar para o login ao tentar acessar página protegida sem estar logado', () => {
    cy.clearLocalStorage()
    cy.visit('http://127.0.0.1:5500/meus-cursos.html')
    cy.url().should('include', 'http://127.0.0.1:5500/login.html')
  })

  it('Deve realizar o logout e impedir acesso ao painel após sair', () => {
    cy.visit('http://127.0.0.1:5500/login.html')
    cy.get('#email').type('aluno@edutech.com')
    cy.get('#senha').type('curso123')
    cy.get('form').submit()
    cy.url().should('include', 'http://127.0.0.1:5500/painel.html')
    cy.get('#logout').click()
    cy.url().should('include', 'http://127.0.0.1:5500/login.html')
    cy.visit('http://127.0.0.1:5500/painel.html')
    cy.url().should('include', 'http://127.0.0.1:5500/login.html')
  })

})
