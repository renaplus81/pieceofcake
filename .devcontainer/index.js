// const products = ['water','japanese tea','coffee'];
// const price = [120, 150, 130];

//商品のリスト
const productsndprice = 
[
    {product:'water', price:120},
    {product:'japanese tea', price:150},
    {product:'coffee', price:130}
];

//投入金額、購入商品選択
let money = 500; //投入金額
let selectNmbr = 0; //購入品選択

//選んだ商品の情報取得
let selectPrdct =  productndprice[selectNmbr];
let itemName = selectPrdct.product;
let itemPrice = selectPrdct.price;

//コンソールに現在状況表示
console.log('投入金額:' + money + "円");
console.log('選択商品:' + itemName + " (" + itemPrice + "円)");

//お金が足りているか判定する
if(money >= itemPrice){

    let change = money - itemPrice; //お釣りの計算

    //お金足りている
    console.log('購入成功！');
    console.log('お釣り:' + change + "円");
}else{ //お金足りていない
    console.log('購入失敗！');
    console.log("お釣り：" + money + "円");
}