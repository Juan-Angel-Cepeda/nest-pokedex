#imates de node con caracteristicas minimas
FROM node:18-alpine3.15

#haciendo set up del directorio de trabajo
RUN mkdir -p /var/www/pokedex
WORKDIR /var/www/pokedex

#Copiar el directorio de su contenido
COPY . ./var/www/pokedex
COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
RUN yarn install
RUN yarn build

#Permisos para ejecutar la aplicación
RUN adduser --disabed_password pokeuser
RUN chown -R pokeuser:pokeuser /var/www/pokedex
USER pokedex

#limpiar el cache
RUN yarn cache clean --force

#expone el puerto para la aplicación
EXPOSE 3000

CMD ["yarn","start"]
