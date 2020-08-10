# AppAuthentication

## Sobre a API
API Rest construida em "EXPRESS", para consumo dos Aplicativos da PARMOUNT+ e NOGIN BY NICK Jr. onde a API faz a consulta em um banco de dados, retornando se aquele cliente esta com os parametros de liberação de acesso corretos. Sendo eles nao possui nenhum debito em aberto, e possui o serviço alocado ao contrato. 
Retornando um JSON ao request.

## Tecnologias Utilizadas

- NodeJS
    - Express
    - Body-parser
    - Mysql
    - cors
- Webpack
    - babel/core
    - webpack-cli
    - webpack-node-externals
- PM2

## Ambiente de Desenvolvimento

Para rodar a aplicação em sua máquina, você precisará de um ambiente NodeJs básico instalado.

**Clonando o repositório:**

```
$ git clone https://github.com/faelst/AppAuthentication.git
```

### Instalando:
**Modo de Desenvolvimento**
- Digite `npm install` na pasta do projeto, para instalar todas suas dependências;
- Digite `npm start` para startar o servidor, que utilizara a porta 4004 para acesso ao serviço.

**Modo Produção**
- Digite `npm install PM2 -g ` para instalar o modulo de deploy. 
- Digite `npm run deploy` onde sera gerado a pasta **dist**, onde esta o arquivo de produção da API.
- Digite `npm run build` para iniciar a API junto ao PM2, com a porta 8080.
