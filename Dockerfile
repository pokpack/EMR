
FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
EXPOSE 6001

ENV PEERS=$PEERS
ENV SECRET_KEY=$SECRET_KEY

ENTRYPOINT npm start