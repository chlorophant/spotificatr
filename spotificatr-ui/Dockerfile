FROM node:12.14.1 as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=builder /app/dist /var/www
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
