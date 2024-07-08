# # Utiliza una imagen de Node.js para construir la aplicación Angular
# FROM node:20 AS build

# # Crea el directorio de trabajo
# WORKDIR /app

# # Copia los archivos del proyecto Angular al contenedor
# COPY package.json package-lock.json ./
# RUN npm install

# # Copia el resto de los archivos del proyecto Angular y compílalos
# COPY . .

# # Ejecuta la construcción de Tailwind y compila la aplicación Angular
# RUN npx tailwindcss init
# RUN npm run build --prod

# # Utiliza una imagen de Nginx para servir la aplicación Angular
# FROM nginx:alpine

# # Copia los archivos compilados desde la fase de construcción al contenedor de Nginx
# COPY --from=build /app/dist/infinite-horizon /usr/share/nginx/html

# # Exponer el puerto que Nginx usará para servir la aplicación
# EXPOSE 80

# # Comando para iniciar Nginx
# CMD ["nginx", "-g", "daemon off;"]



