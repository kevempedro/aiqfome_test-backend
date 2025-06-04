### 💜 aiqfome API

## 📘 Contexto

O aiqfome está expandindo seus canais de integração e precisa de uma API robusta para gerenciar os "produtos favoritos" dos usuários na plataforma.
Essa funcionalidade será usada por apps e interfaces web para armazenar e consultar produtos marcados como favoritos pelos clientes. A API terá alto volume de uso e integrará com outros sistemas internos e externos.


## 🎯 Missão

Desenvolver uma API RESTful que gerencie os dados dos clientes, com as funcionalidades e regras abaixo:

### Clientes:

- Permitir: criar, visualizar, editar e remover clientes.

- Dados obrigatórios: nome e e-mail.

- Impedir que um mesmo e-mail se repita no cadastro.

### Favoritos

- O cliente deve ter uma lista de produtos favoritos.

- Os produtos devem ser validados por API externa.

- Um produto não pode estar duplicado na lista de um cliente.

- Produtos favoritos devem exibir: ID, título, imagem, preço e review (se houver).


## ⚙️ Escolhas técnicas para o teste

### API (Fastify):

Framework Web para Node.js focado em alta performance, baixo overhead e com suportes nativos a recursos, tornando-o uma boa opção para manter a produtividade sem perda de performance e robustez.

### Documentação das APIs (Swagger):

O Fastity possui integração nativa com Swagger, o que faz dele uma excelente opção para documentar nossas rotas da API.

### Execução das APIs (Insomnia):

Utilizei a ferramenta Insomnia para testar as rotas das APIs por ser uma solução leve e prática. O arquivo contendo as rotas está na raiz do projeto para facilitar os testes.


### Banco de dados (PostgreSQL):

Entre os bancos de dados sugeridos, optei pelo PostgreSQL por ser um banco de dados relacional, escalável e que oferece boa integridade dos dados.


## 🛠 Variáveis de ambiente

Todas as variáveis de ambiente necessárias para rodar o projeto encontram-se no arquivo “.env.example”. Copie as variáveis do arquivo informado, crie um arquivo chamado “.env” na raiz do projeto e cole-as nele.


## 🚀 Iniciando a aplicação

### Instalação

- npm install

observação: Como o Fastify está rodando na versão 5, de acordo com a documentação, a versão do Node deve ser 20 ou superior.

### Rodando em desenvolvimento

- npm run dev

### Build para produção

- npm run build

- npm run start

  
## 📚 Utilizando o Swagger

- Acesse: http://localhost:3333/documentation
  
Após rodar a aplicação, a documentação ficará disponível pela URL informada acima. Crie seu cliente, gere seu token JWT de acesso e, nas rotas que precisarem de autenticação, utilize o token precedido pela palavra “Bearer”, como no exemplo:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiJ


## 📝 Considerações

- Como utilizei a api externa para os produtos, criei a tabela client_favorite_product onde salvei o ID do cliente e as informações do produto. Mas, caso fosse uma aplicação em produção, criaria uma CronJob ou AWS Lambda function para bater na API externa periodicamente, no início do dia, atualizando os dados dos produtos do lado da aplicação. Com isso eu teria uma tabela de product e minha tabela de client_favorite_product teria só a referência dos meus clientes e produtos.

- Utilizei o JWT token para autenticar minhas rotas. No entanto, se fosse uma aplicação para ser utilizada em produção, adicionaria uma camada extra de segurança, pois o JWT token é passível de ser descriptografado por ser um base64. Para isso, teria criptografado meu token e, quando meu middleware de autenticação fosse verificar meu token, utilizaria a chave de criptografia que utilizei para criptografar o mesmo, para ter acesso ao JWT token válido. Garantindo mais segurança para os dados que são carregados no token.

- Para executar as minhas queries, optei por utilizar queries puras, sem a utilização de ORMs. Pois, com isso conseguimos ter um controle maior sobre as queries escritas, garantindo a performance das mesmas. Mas usaria um ORM como Prisma ou Knes, que são os mais conhecidos em desenvolvimento Node.js, caso minha API fosse para uma aplicação menor ou um MVP. Também poderia utilizar um ORM junto com as queries puras, apenas para fazer o gerenciamento das minhas migrations.

Devido à deadline do projeto, foquei no desenvolvimento das funcionalidades e recursos a serem avaliadas no teste. No entanto, caso houvesse mais tempo ou o projeto fosse uma aplicação real, também implementaria as seguintes funcionalidades e melhorias:

- Refresh token.

- Rota para redefinição de senha do cliente.

- Rotas para gerenciamento dos produtos dentro da aplicação.

- Testes unitários e testes de carga.

- Suporte a i18n para lidar com múltiplas regiões.


## 📎Referências

- https://fastify.dev/docs/latest/

- https://www.postgresql.org/download/

- https://fakestoreapi.com/docs
