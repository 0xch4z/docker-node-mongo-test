FROM node:9.9.0

WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .

ENV MONGO_URI='mongodb://mongo/DB_SLUG'

EXPOSE 3000

CMD ["node", "main"]
