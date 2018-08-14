FROM nginx:alpine

MAINTAINER liangping

EXPOSE 8080

ADD default.conf /etc/nginx/conf.d/default.conf
ADD ./public/master /data/web

CMD ["nginx", "-g", "daemon off;"]

