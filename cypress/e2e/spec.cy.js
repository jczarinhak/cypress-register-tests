//describe('Acessando o portal do aluno', () => {
  //it('Deve fazer login no portal do aluno', () => {
    //cy.visit('https://guairaca.jacad.com.br/academico/aluno-v2/login');

    // Aguarda o carregamento da página
    //cy.wait(2000);

    // Preenche os campos de login
    //cy.get('#login').should('be.visible').type('Jose');
    //cy.get('#senha').should('be.visible').type('12345678', { log: false }); // Oculta a senha nos logs

    // Clica no botão de login
    //cy.get('#btn-login').click();

    // Verifica se o login foi bem-sucedido
   // cy.url().should('include', '/dashboard'); // Ajuste conforme necessário
 // });
//});

//describe('Teste completo de esperas e assercoes', () => {
  //it('Devo acessar a pagina, aguardar os elementos', () => {
    // Visita o site exemplo
    //cy.visit('https://example.cypress.io/todo');

  // Espera implicita : verifica se a lista de tarefas esta visivel
  // cy.get('.todo-list').should('be.visible');
  // adciona uma nova tarefa e verefica se foi adicionada corretamente
  //cy.get('.new-todo').type('Estudar Cypress{enter}');
  //cy.get('.todo-list li').should('contain.text', 'Estudar Cypress');
  // Marca a tarefa como concluida e verifica se foi marcada corretamente
  //cy.get('.todo-list li').last().find('.toggle').click();
  //cy.get('.todo-list li').last().should('have.class', 'completed');
// Verifica se há 3 itens na lista (corrigindo o erro de "lenght" para "length")
//cy.get('.todo-list li').should('have.length', 3);

// Verifica se um item específico está na lista
//cy.contains('.todo-list li', 'Estudar Cypress').should('be.visible');
//});
//})