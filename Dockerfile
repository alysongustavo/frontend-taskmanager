# Etapa 1: Compilação
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila a aplicação Angular
RUN npm run build --prod

# Etapa 2: Servindo a aplicação
FROM nginx:alpine

ARG VERSION_NUMBER_ARG=no-version
ENV TZ=America/Sao_Paulo
ENV VERSION_NUMBER=$VERSION_NUMBER_ARG

# Copia a configuração personalizada do Nginx
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# These commands will set permissions for various NGINX locations to allow the nginx user to function correctly.
RUN touch /var/run/nginx.pid && \
  mkdir -p /var/cache/nginx && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/nginx.conf && \
  chown -R nginx:nginx /var/cache/nginx


# This copies the compiled Angular 'dist' directory into the nginx html directory.
COPY --from=build /app/dist/frontend-taskmanager/browser/ /usr/share/nginx/html/

# Exponha a porta na qual o Nginx estará ouvindo
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
