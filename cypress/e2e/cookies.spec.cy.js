describe('Teste de Cookies',() => {
  beforeEach (() => {
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html');
  });

  it('Deve realizar o login e vereficar session token e storage', () => {
  cy.get('#email').type('teste@exemplo.com');
  cy.get('#senha').type('123456');
  cy.get('button[type="submit"]').click();
 
  cy.contains('Login realizado com sucesso!');

  //vereficar os cookies
  cy.getCookies('session_token').should('exist');
  //verificando o local storage
  cy.window().then((win) => {
    const user = win.localStorage.getItem('usuario_logado')
    expect(user).to.equal('teste@exemplo.com');
  })

});


  it('Deve setar cookies e localstorage manualmente e simular login',()=>{
    //defina os dados manualmente
    cy.setCookie('session_token', 'abc123')
    cy.window().then((win)=>{
      win.localStorage.setItem('usuario_logado', 'teste@exemplo.com')
    })
    //recarregue a página
    cy.reload();
    //Verifica se os dados ainda estão presentes
    cy.getCookie('session_token').should('have.property','value','abc123')
    cy.window().then((win)=>{
      expect(win.localStorage.getItem('usuario_logado'))
      .to.equal('teste@exemplo.com')
    })
  })
});