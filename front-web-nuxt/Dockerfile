FROM node:14.15-alpine

WORKDIR /app
COPY . /app

EXPOSE 8081

RUN npm install

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=8081

RUN npm run build

CMD ["npm", "start"]