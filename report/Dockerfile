FROM node:20-alpine

WORKDIR  /app/report

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm","start"]