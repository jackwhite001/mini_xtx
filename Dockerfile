FROM nginx:latest

WORKDIR /usr/share/nginx/app/

USER root
RUN mkdir /etc/nginx/temp
RUN mkdir /etc/nginx/logs

COPY ./dist/build/h5/conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/build/h5  /usr/share/nginx/app/

EXPOSE 9091

CMD ["nginx", "-g", "daemon off;"]
