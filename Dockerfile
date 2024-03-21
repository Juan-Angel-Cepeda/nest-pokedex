
#crea una imagen con las dependencias
#reinstala las dependencias y las deja en cache dependiendo de 
#si las dependencias de nodes ya estan instaladas
FROM node:18-alpine3.15 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn istall --frozen-lockfile

#Copia de las dependecias al contenedor de la aplicación
#
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

#Imagen de producción
FROM node:18-alpine3.15 AS runner

#set working directory
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod

COPY --from=builder /app/dist ./dist

# #Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la aplicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser
# EXPOSE 3000

CMD ["node", "dist/main"]
