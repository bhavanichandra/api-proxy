FROM node:22-alpine3.20

ARG API_TARGET_URL
ARG API_PORT=8083

ENV API_TARGET_URL=${API_TARGET_URL}
ENV API_PORT=${API_PORT}


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY ./src/ .

EXPOSE ${API_PORT}

CMD [ "node", "app.js" "--api-target", "${API_TARGET_URL}", "--api-port", "${API_PORT}"]