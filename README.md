# news-api
## Servidor Node para postgreSQL
## Especificação das rotas: https://docs.google.com/document/d/1VHiDCGTCgzx8081Z1Logq4OOavbWhDE6kRk8bL7EVOA/edit?usp=sharing

# Para rodar siga os seguintes passos:

1) Clone o projeto na sua máquina e crie um novo database no postgres
2) Instale as dependências com o comando "npm install"
2) Crie um arquivo .env e coloque a URL para o banco postgres no variável DB_URL (siga o template do .env.example)
3) Execute o comando "npm run populateDB" para a criação automática das tabelas e alguns dados de teste (Esse passo não é necessário caso o database já possua as tabelas)
4) Execute o comando "npm run dev" para deixar o servidor rodando
