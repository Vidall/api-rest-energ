#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available
# More options available at: https://github.com/vishnubob/wait-for-it

set -e

TIMEOUT=60
WAIT_TIME=60  # Tempo de espera de 1 minuto

while getopts ":t:" opt; do
  case $opt in
    t) TIMEOUT=$OPTARG ;;
    *) echo "Invalid option: -$OPTARG" >&2 ;;
  esac
done
shift $((OPTIND -1))

HOSTPORT="$1"
shift

cmd="$@"

if [[ -z "$HOSTPORT" ]]; then
  echo "Error: you need to provide a host and port to test." >&2
  exit 1
fi

IFS=: read -r HOST PORT <<< "$HOSTPORT"

# Loop para verificar se a porta está aberta
for i in $(seq 1 "$TIMEOUT"); do
  if nc -z "$HOST" "$PORT"; then
    echo "Port $PORT on $HOST is open."
    exec $cmd
    exit 0
  fi
  echo "Port $PORT on $HOST is not open yet. Waiting for $WAIT_TIME seconds..."
  sleep "$WAIT_TIME"
done

# Se chegou aqui, significa que o tempo expirou e a porta não estava disponível
echo "Timeout: $HOST:$PORT is not available after $TIMEOUT seconds." >&2
exit 1