FROM node:16-alpine

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]