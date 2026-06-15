console.log('①サーバー起動');

//最初のserver.js
//ブラウザからのアクセスを受け付けるためのNode.jsの機能
const http = require('http'); 
//fsはfile system→パソコンのファイルを読み書きするための機能
const fs = require('fs');

//アクセス毎に初期化されないようにconst serverよりも外に置く
//最初はstockをpriceを別々の変数で管理していたが、商品が増えたときに
//管理しづらくなるためオブジェクトに変更した

// let stock = 5; //在庫
let money = 0; //投入金額
// const price = 200; //商品の価格
let message = '';


//最初は試しで一個だけpriceを定義してたけど増やした
const item = {
    name: "コーンポタージュ",
    price: 180,
    stock: 3
};
const item2 = {
    name: "ジャスミンティー",
    price: 100,
    stock: 5,
};

const item3 = {
    name: "ミルクティー",
    price: 150,
    stock: 4,
};

const items = [
    item,
    item2,
    item3
];

console.log(items[0].name);
console.log(items[1].name);
console.log(items[2].name);



//reqはブラウザが何を要求してきたか
//function(req, res){}はコールバック関数
//httpにアクセスされたら実行されるコールバック関数
const server = http.createServer(function(req, res){

    let selectedItem = null;

    //reqというのは、ブラウザがサーバーに送ってきたお願い(リクエスト)の情報　
    //ブラウザから送られてきたリクエスト情報全部（req）
    
    // console.log('②アクセスされた');
    console.log(req.url); //chromeが勝手に「このファイルありますか」と聞いているだけ

    //商品追加後
    if (req.url === '/buy1') {
        const item = items[0];

        //在庫が0ではないかつ、価格より投入金額の方が大きい場合、
        if (item.stock > 0 && money >= item.price) {
            item.stock--;
            money -= item.price;
            console.log(item.name, item.stock);
        }
    }

    if (req.url === '/buy2') {
        const item = items[1];

        if (item.stock > 0 && money >= item.price) {
            item.stock--;
            money -= item.price;
            console.log(item.name, item.stock);
        }
    }

    if (req.url === '/buy3') {
        const item = items[2];

        if (item.stock > 0 && money >= item.price) {
            item.stock--;
            money -= item.price;
            console.log(item.name, item.stock);
        }
    }



//req.urlはリクエスト情報の中からURLだけを見るということ
// if(req.url === '/buy1'){
//     if(item.stock <= 0){ //在庫がなくなった場合
//         console.log("売り切れです");
//     }else if(money >= item.price){ //価格より投入金額の方が大きい
//         item.stock--;
//         // money = money - item.price;
// //         money -= item.price
//         console.log(`在庫:${item.stock}, 投入金額:${money}`);
//     }else{  //価格より投入金額の方が小さい
//         console.log("投入金額が足りません")
//     }
// }


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
        message =`${money}円のお返しです`;
        console.log(message);
        money = 0; //moneyを0に変更しないと、お釣りの金額のデータが残ったままになる
    }

    //
    if(req.url === '/'){
        item.stock = 3;
        item2.stock = 5;
        item3.stock = 4;
        money = 0;
    }

    //urlに/buyを付け足したらマイナスされていく
    ///buyをつけなくなっても在庫は/buyをつけて減らした時のデータが反映される

    //index.htmlの中身を読み込む
    //画面にstockとmoneyを表示、fetchなしでやりたのでコメントアウト
    // const html = fs.readFileSync('index.html', 'utf-8');


    //replaceで内容を書き換えているためconstではなくletを使用。
    let html = fs.readFileSync('index.html', 'utf-8');

    //HTMLの中身を新しい値に入れ替える
    // html = html.replace('${stock}', stock);


    html = html.replace('${item.name}', item.name);
    html = html.replace('${item.price}', item.price);
    html = html.replace('${item.stock}', item.stock);

    html = html.replace('${item2.name}', item2.name);
    html = html.replace('${item2.price}', item2.price);
    html = html.replace('${item2.stock}', item2.stock);

    html = html.replace('${item3.name}', item3.name);
    html = html.replace('${item3.price}', item3.price);
    html = html.replace('${item3.stock}', item3.stock);


    if(selectedItem){
    html = html.replace('${item.name}', selectedItem.name);
    html = html.replace('${item.price}', selectedItem.price);
    html = html.replace('${item.stock}', selectedItem.stock);
    }

    html = html.replace('${money}', money);
    html = html.replace('${message}', message);

//     `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>my vending machine</title>
// </head>
// <body>
//     <h1>私の自動販売機</h1>

//     <p>在庫: ${stock}</p>
//     <p>投入金額: ${money}円</p>

//     <p>メッセージ：${message}</p>

//     <!-- 100円ボタンを押したら→/deposit100にアクセスする -->
//     <a href="/deposit100">
//         <button>100円入れる</button>
//     </a>

//     <!-- 500円ボタンを押したら→/deposit500にアクセスする -->
//     <a href="/deposit500">
//         <button>500円入れる</button>
//     </a>

// <br><br>

//     <!-- 購入ボタンを押したら→/buyにアクセスする -->
//     <a href="/buy">
//         <button>購入</button>
//     </a>

//     <a href="/refund">
//     <button>お釣り返却</button>
//     </a>
    
// </body>
// </html>`;
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