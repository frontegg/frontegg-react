cy.server();           // enable response stubbing
cy.route({
  method: 'GET',      // Route all GET requests
  url: 'http://localhost:8080/frontegg/identity/resources/auth/v1/user/token/refresh',
  response: [{ test: 'aaa' }],        // and force the response to be: []
});
