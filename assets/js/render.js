async function renderItems() {
    let items = await getItems()
    let shopElement = document.querySelector(".shop")
    shopElement.innerHTML = ""
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemElement = document.createElement("div")
        itemElement.classList.add("item")
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="items">
            <p>${item.price},-</p>
            <button onclick="addToCart(${item.id})">DO KOŠÍKU</button>
        `
        shopElement.appendChild(itemElement)
    }
}