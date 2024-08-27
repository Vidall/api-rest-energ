#!/bin/sh

# Espera o MySQL estar disponível
echo "Aguardando o MySQL estar pronto..."

# Verifica se o MySQL está disponível antes de continuar
until nc -z -v -w30 mysql 3306
do
  echo "Aguardando MySQL..."
  # Aguarda 1 segundo antes de tentar novamente
  sleep 1
done

echo "MySQL está disponível, executando migrações..."

# Executa as migrações usando ts-node
npx ts-node ./path/to/your/migration/script.ts

# Inicia o servidor
exec "$@"
