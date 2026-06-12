FROM node:22-slim
WORKDIR /workspace

RUN npm install -g nodemon
RUN npm install -g http-server
# RUN apt-get update && apt-get install -y git
# RUN npm install express

EXPOSE 3000

CODE ["node", "server.js"]