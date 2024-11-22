FROM node:latest

RUN npm install -g @ionic/cli@latest

WORKDIR /app

EXPOSE 8100 35729

CMD ["sh"]
