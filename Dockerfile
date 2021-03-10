FROM node:alpine as OmranModern-Admin

RUN apk update && apk add --no-cache make git

WORKDIR /app

COPY OmranModern-Admin/package*.json  /app/

RUN npm install @angular/cli -g \
    && npm ci

COPY OmranModern-Admin  /app

EXPOSE 4200