// // function buy(item){
// //     alert(item + "を購入しました");
// // }

// //API投入後
// async function load(){
//     const res = await fetch("/apii/items");
//     const data = await res.json();

//     document.getElementById("balance".innerText) =
//     `所持金: ${data.balance}円`;
s
//     const div = document.getElementById("items");
//     div.innerHTML = ""; 

//     data.items.forEach(item => {
//         const btn = document.createElement("button");

//         btn.innerText = `${item.name} ${item.price}円 (在庫:${item.stock})`;

//         btn.onclick = async () => {
//             const res = await fetch("/api/buy", {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({id :item.id})
//             });

//             const result = await res.json();
//             alert(result.message);
//             load();
//         };

//         div.appendChild(btn);
//         div.appendChild(document.createElement("br"));
//     });
// }

// async function deposit(amount){
//     const res = await fetch("/api/deposit",{
//         method: "POST",
//         headers: {"Contenn-Type": "application/json"},
//         body: JSON.stringify({amount}) //stringifyって何
//     });

//     const data = await res.json();
//     alert(data.message);
//     load();
// }

// load();