FROM node:20-alpine

WORKDIR /app/server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7001

CMD ["npm","start"]