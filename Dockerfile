FROM node:20-alpine

WORKDIR /app

COPY . .
# Copia o restante do código para o diretório de trabalho
COPY package.json .

# Copia o restante do código para o diretório de trabalho

# Instala as dependências
RUN npm install

# Executa as migrações
RUN npm run knex:migrate

# Expõe a porta 3001 para que o servidor possa ser acessado
EXPOSE 3001

# Comando para iniciar o servidor, aguardando o MySQL
CMD ["npm", "run", "production"]