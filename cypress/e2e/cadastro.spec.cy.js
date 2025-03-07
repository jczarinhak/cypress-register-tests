describe('Cadastro de Usuário', () => {
  it('Deve acessar a página e preencher o formulário corretamente', () => {
    // Acessar a página do formulário (caminho correto do servidor local)
    cy.visit('http://127.0.0.1:5500/cypress/e2e/index.html');  // O endereço local do arquivo

    // Preencher os campos
    cy.get('#nome').type('João Silva');
    cy.get('#email').type('joao.silva@email.com');
    cy.get('#telefone').type('1199999999');
    cy.get('#senha').type('Teste@123');
    cy.get('#confirma_senha').type('Teste@123');

    // Verificar se os valores foram inseridos corretamente
    cy.get('#nome').should('have.value', 'João Silva');
    cy.get('#email').should('have.value', 'joao.silva@email.com');
    cy.get('#telefone').should('have.value', '1199999999');
    cy.get('#senha').should('have.value', 'Teste@123');
    cy.get('#confirma_senha').should('have.value', 'Teste@123');

    // Submeter o formulário
    cy.get('form#cadastro').submit();

    // Validar se o envio foi realizado com sucesso
    // Se você tiver alguma mensagem ou redirecionamento após o envio do formulário, verifique aqui.
    cy.contains('Cadastrar ').should('be.visible');  // Alterar conforme o comportamento esperado
  });
});
