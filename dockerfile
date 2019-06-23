FROM node:10.15.3-alpine

LABEL maintainer="alexk"

COPY . /src

WORKDIR /src

RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp

EXPOSE 8080

ENTRYPOINT ["npm","start" ]