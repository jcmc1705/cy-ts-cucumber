import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário acessa a página inicial", () => {
  cy.visit("https://example.cypress.io");
});

Then("a página carrega com sucesso", () => {
  cy.contains("Kitchen Sink");
});
