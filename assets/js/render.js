// function renderItems() {
//     let items = getItems()
//     for (let i = 0; i < items.length; i++) {
//         let item = items[i]
//         let itemElement = document.createElement("div")
//         itemElement.innerHTML = `
//             <h2>${item.name}</h2>
//             <p>${item.price}</p>
//             <button onclick="addToCart(${item.id})">Přidat do košíku</button>
//         `
//         document.getElementById("items").appendChild(itemElement)
//     }
// }