FROM node:18-alpine

WORKDIR /app

# só se você precisar do cliente mysql no container
RUN apk add --no-cache mysql-client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Cria um script de inicialização
RUN echo '#!/bin/sh\n\
if [ ! -f /app/.migrations-done ]; then\n\
  npx sequelize-cli db:migrate\n\
  npx sequelize-cli db:seed:all\n\
  touch /app/.migrations-done\n\
fi\n\
npm run dev' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]