FROM node:18-alpine AS development

WORKDIR /app

COPY  package*.json .
COPY yarn.lock .

RUN yarn install

COPY . .
EXPOSE 3003
COPY ./*.ts* ./

CMD [ "yarn", "start" ]