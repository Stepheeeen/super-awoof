FROM node:18-alpine AS build

WORKDIR /usr/src/super-awoof-fe

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps --include=dev && \ 
  npm cache clean --force && \
  rm -rf /tmp/*

COPY . .

COPY /usr/src/super-awoof-fe .

COPY /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY /usr/local/bin /usr/local/bin

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

EXPOSE 8081

CMD [ "npm", "run", "web" ]