FROM node:14.15.1 AS compile-image
WORKDIR /opt/ng COPY .npmrc package.json ./
RUN npm install
COPY . ./ 
RUN ng build --prod
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf 
COPY --from=compile-image /opt/ng/dist/app-name /usr/share/nginx/html


