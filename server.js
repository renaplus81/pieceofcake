


console.log('①サーバー起動');

//最初のserver.js
//ブラウザからのアクセスを受け付けるためのNode.jsの機能
const http = require('http'); 
//fsはfile system→パソコンのファイルを読み書きするための機能
const fs = require('fs');

//サーバーのmoneyを画面に表示させたかったが、通信をするには
//fetchをやるかここに直接HTMLを書くかの二択を提示されて
//どっちもよくわからなかったのでここで定義する
let stock = 3; //在庫
let money = 500; //投入金額
const price = 200; //商品の価格

//reqはブラウザが何を要求してきたか
//function(req, res){}はコールバック関数
//httpにアクセスされたら実行
const server = http.createServer(function(req, res){
    
    // console.log('②アクセスされた');
    // console.log(req.url); //chromeが勝手に「このファイルありますか」と聞いているだけ

    //buyが押された（？）
    if(req.url === '/buy'){

        if(stock <= 0){ //在庫がなくなった場合
            console.log("売り切れです");

        }else if(money >= price){ //価格より投入金額の方が大きい
            stock--;
            money = money - price;
            console.log(stock, money);
        }else{  //価格より投入金額の方が小さい
            console.log("投入金額が足りません")
        }
    }


    //100円を投入
    if(req.url === '/deposit100'){
        money += 100;
        console.log('投入金額:', money);
    }

    //500円をとうぬ
    if(req.url === '/deposit500'){
        money += 500;
        console.log('投入金額', money);
    }

    if(req.url === '/refund'){
        console.log('お釣り返却:', money, '円');
        money = 0; //moneyを0に変更しないと、お釣りの金額のデータが残ったままになる
    }

    //urlに/buyを付け足したらマイナスされていく
    ///buyをつけなくなっても在庫は/buyをつけて減らした時のデータが反映される

    //index.htmlの中身を読み込む
    //画面にstockとmoneyを表示、fetchなしでやりたのでコメントアウト
    // const html = fs.readFileSync('index.html', 'utf-8');

    //うーん
    const html =`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my vending machine</title>
</head>
<body>
    <h1>私の自動販売機</h1>

    <p>在庫: ${stock}</p>
    <P>投入金額: ${money}円</p>

    <!-- 100円ボタンを押したら→/deposit100にアクセスする -->
    <a href="/deposit100">
        <button>100円入れる</button>
    </a>

    <!-- 500円ボタンを押したら→/deposit500にアクセスする -->
    <a href="/deposit500">
        <button>500円入れる</button>
    </a>

<br><br>

    <!-- 購入ボタンを押したら→/buyにアクセスする -->
    <a href="/buy">
        <button>購入</button>
    </a>

    <a href="/refund">
    <button>お釣り返却</button>
    </a>
    
</body>
</html>`;
//${}とは変数の中身を文字列に埋め込むための書き方
//+を使うと文章が長くなるので




    res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(html);
});


server.listen(3000);

console.log('サーバー起動');


// //step1→API作成
// //steo2→フロント
// //step3→在庫、お金のリアル管理

// const express = require("express");
// const app = express();

// app.use(express.json()); //whats this?

// let balance = 0;

// let items = [
//     {id:1, name: "コーンポタージュ", price:180, stock:3 },
//     {id:2, name: "紅茶", price:120, stock:5 },
//     {id:3, name: "お水", price:100, stock:9 },
    
// ];

// //商品取得
// app.get("/api/items", (req, res) => { //whats this
//     res.json({items, balance});
// });

// //お金を入れる
// app.post("/api/deposit", (req, res) => {
//     const { amount } = req. body;
//     balance += amount;

//     res.json({message: `${amount}円投入`, balance});
// }); //whats this

// //購入
// app.post("/api/buy", (req, res) => {
//     const { id } = req.body;

//     const items = items.find(i => i.id === id);
//     //何このびっくりマーク
//     if(!item)return res.status(404).json({message: "商品なし"});
//     //何この逆アロー
//     if(item.stock <= 0) return res.status(400).json({message: "売り切れ"});
//     if(balance < item.price)return res.statsu(400).json({message:"お金不足"});
    
//     item.stock--;
//     balance -= item.price;

//     //バックスラッシュ
//     res.json({
//         message: `${item.name}を購入`,
//         balance,
//         item
//     });
// });

// app.listen(3000, () => {
//     console.log("http://localhost:3000");
// });