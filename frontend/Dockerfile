FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Instala pacote específico apenas se a arquitetura for arm64
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ]; then \
        echo "Instalando pacote ARM64 específico..." && \
        npm install @rollup/rollup-linux-arm64-musl; \
    else \
        echo "Arquitetura $ARCH detectada — ignorando pacote ARM64 específico."; \
    fi

COPY . .

EXPOSE 5173

ENV NODE_ENV=development

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 