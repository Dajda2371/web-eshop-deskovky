async function renderItems() {
    let items = await getItems()
    let shopElement = document.querySelector(".shop")
    if (!shopElement) return // osetreni ze kdyby tam ta classa nebyla tak to prestane a nevysere se to

    shopElement.innerHTML = ""
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemElement = document.createElement("div")
        itemElement.classList.add("item")
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="items">
            <h3>${item.name}</h3>
            <p>${item.price},-</p>
            <button onclick="addToCart(${item.id})">DO KOŠÍKU</button>
        `
        shopElement.appendChild(itemElement) // prida to do toho divu KAZDEJ ITEM
    }
}

async function renderCart() {
    let cartItemIds = await getCartItems()
    let allItems = await getItems()

    let cartElement = document.querySelector(".cart")
    if (!cartElement) return // osetreni ze kdyby tam ta classa nebyla tak to prestane a nevysere se to

    cartElement.innerHTML = ""
    for (let i = 0; i < cartItemIds.length; i++) {
        let itemId = cartItemIds[i]
        let item = allItems.find(it => it.id === itemId)

        if (!item) continue

        let itemElement = document.createElement("div")
        itemElement.classList.add("item")
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="items">
            <h3>${item.name}</h3>
            <p>${item.price},-</p>
            <button onclick="deleteFromCart(${item.id})">ODSTRANIT Z KOŠÍKU</button>
        `
        cartElement.appendChild(itemElement) // prida to do toho divu KAZDEJ ITEM
    }
}

// tohle se bude volat kdyz se ty stranky nactou
document.addEventListener("DOMContentLoaded", renderItems)
document.addEventListener("DOMContentLoaded", renderCart)