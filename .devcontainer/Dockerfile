FROM node:22-slim
WORKDIR /workspace

RUN npm install -g nodemon
RUN npm install -g http-server

RUN apt-get update && apt-get install -y git

EXPOSE 3000
CMD ["http-server", ".", "-p", "3000"]