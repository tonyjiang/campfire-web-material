#! /bin/bash
set -e

nohup node src/chat_server/socket_io_server.ts > socket_id.output &

exec "$@"
