FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o restante do código para o diretório de trabalho
COPY package.json .


# Copia o restante do código para o diretório de trabalho
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta 3001 para que o servidor possa ser acessado
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "production"]
