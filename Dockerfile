FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

COPY . .
# Copia o restante do código para o diretório de trabalho
COPY package.json .

# Copia o script wait-for-it.sh para o container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh


# Copia o restante do código para o diretório de trabalho

# Instala as dependências
RUN npm install

# Expõe a porta 3001 para que o servidor possa ser acessado
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["wait-for-it.sh", "mysql:3306", "--", "npm", "run", "production"]
