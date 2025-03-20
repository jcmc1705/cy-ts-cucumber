Cypress com Typescript e Cucumber

---

## 🛠 **Passo 1: Criar o projeto**  

```sh
npm init -y
```

---

## 🛠 **Passo 2: Instalar dependências**  

```sh
npm install cypress typescript ts-node --save-dev
```

```sh
npm install @badeball/cypress-cucumber-preprocessor --save-dev
```

```sh
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

---

## 🛠 **Passo 3: Configurar o TypeScript**  

Crie um arquivo `tsconfig.json` na raiz do projeto com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["cypress", "@badeball/cypress-cucumber-preprocessor"]
  },
  "include": ["cypress/**/*.ts"]
}
```

---

## 🛠 **Passo 4: Configurar o Cypress com Cucumber**  

```sh
npx cypress open
```

Isso cria a pasta `cypress/` com os arquivos de configuração.

Agora, edite o `cypress.config.ts` e adicione o suporte ao Cucumber:

```ts
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: false,
    env: {
      stepDefinitions: "cypress/e2e/**/*.steps.ts",
    },
  },
});
```

---

## 🛠 **Passo 5: Criar a estrutura para os testes BDD**  

Dentro de `cypress/e2e/`, crie o primeiro arquivo de teste `cypress/e2e/teste.feature`:

```gherkin
Feature: Teste simples

  Scenario: Verificar se o Cypress e Cucumber estão funcionando
    Given que o usuário acessa a página inicial
    Then a página carrega com sucesso

```

Depois, crie a implementação do teste no arquivo `cypress/e2e/teste.steps.ts`:

```ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário acessa a página inicial", () => {
  cy.visit("https://example.cypress.io");
});

Then("a página carrega com sucesso", () => {
  cy.contains("Kitchen Sink");
});

```

---

## ✅ **Tudo pronto para começar os testes!**  

```sh
npx cypress open
```
