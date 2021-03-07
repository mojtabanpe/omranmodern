# FROM node:14.15.1 AS compile-image
# RUN mkdir /opt/ng
# WORKDIR /opt/ng COPY .npmrc package.json ./
# RUN npm install
# COPY . ./
# RUN npm run build --prod
# FROM nginx:1.15
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=compile-image /opt/ng/dist/OmranModern-Admin /usr/share/nginx/html

FROM node:14.15.1 AS compile-image
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=compile-image /usr/src/app/dist/client /usr/share/nginx/html

