FROM node:22-slim 
#Node.js実行環境を用意するため
WORKDIR /workspace
#作業ディレクトリを指定。
RUN npm install -g nodemon
#作業ディレクトリを指定。
RUN npm install -g http-server
#HTMLやCSSのみを配信する場合に利用できる簡易Webサーバーをインストール

# RUN apt-get update && apt-get install -y git
# RUN npm install express

EXPOSE 3000
# 3000番ポートを利用する宣言。

CMD ["node", "server.js"]
#コンテナ起動時に自動でserver.jsを実行し、Webサーバーを立ち上げています。