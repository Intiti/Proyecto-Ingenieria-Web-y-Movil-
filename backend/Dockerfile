FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar el cliente de Prisma
RUN DATABASE_URL="postgresql://postgres:postgres@db:5432/munisalud_db?schema=public" npx prisma generate

# Compilar TypeScript
RUN npm run build

EXPOSE 4000

# Entrypoint: aplica migraciones, seed y levanta el servidor
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]
