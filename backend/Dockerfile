FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN mkdir -p dist
RUN npx tsc

FROM node:18-alpine AS runner

WORKDIR /app

RUN apk add --no-cache netcat-openbsd bash

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./


RUN echo '#!/bin/bash' > /app/init.sh && \
    echo 'set -e' >> /app/init.sh && \
    echo '' >> /app/init.sh && \
    echo '# Create a simple migration if none exists' >> /app/init.sh && \
    echo 'if [ ! -d "/app/prisma/migrations" ] || [ -z "$(ls -A /app/prisma/migrations)" ]; then' >> /app/init.sh && \
    echo '  echo "No migrations found, creating initial migration..."' >> /app/init.sh && \
    echo '  npx prisma migrate dev --name init --create-only' >> /app/init.sh && \
    echo 'fi' >> /app/init.sh && \
    echo '' >> /app/init.sh && \
    chmod +x /app/init.sh

    RUN echo '#!/bin/bash' > /app/startup.sh && \
    echo 'set -e' >> /app/startup.sh && \
    echo 'echo "Waiting for PostgreSQL..."' >> /app/startup.sh && \
    echo 'for i in {1..30}; do nc -z db 5432 && break; echo "Waiting for PostgreSQL ($i/30)..."; sleep 1; done' >> /app/startup.sh && \
    echo 'if ! nc -z db 5432; then echo "Error: PostgreSQL not available" && exit 1; fi' >> /app/startup.sh && \
    echo '/app/init.sh' >> /app/startup.sh && \
    echo 'echo "PostgreSQL is available, running migrations..." && npx prisma migrate deploy' >> /app/startup.sh && \
    echo 'echo "Seeding the database..." && node prisma/seed.js' >> /app/startup.sh && \
    echo 'echo "Starting the application..." && node dist/index.js' >> /app/startup.sh && \
    chmod +x /app/startup.sh

EXPOSE 8080

CMD ["/app/startup.sh"]