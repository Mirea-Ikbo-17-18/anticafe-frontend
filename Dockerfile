FROM node:14 AS build

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build-prod

FROM nginx:latest

COPY --from=build /src/dist/anticafe-frontend /usr/share/nginx/html

EXPOSE 80