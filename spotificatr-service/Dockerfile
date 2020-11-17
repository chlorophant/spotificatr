FROM node:12.14.1-alpine
WORKDIR /usr/src/app
RUN apk update && apk add bash && apk add --update python make g++ && rm -rf /var/cache/apk/*
COPY . .
RUN npm install
EXPOSE 8443
CMD [ "npm", "start" ]
