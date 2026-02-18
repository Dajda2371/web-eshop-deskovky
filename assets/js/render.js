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

    let cartElement = document.querySelector(".cart")
    if (!cartElement) return // osetreni ze kdyby tam ta classa nebyla tak to prestane a nevysere se to

    cartElement.innerHTML = ""
    for (let i = 0; i < cartItemIds.length; i++) {
        let itemId = cartItemIds[i]
        let item = await getItem(itemId)

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

    // Update total price using calculateCartPrice from script.js
    if (typeof calculateCartPrice === 'function') {
        let price = await calculateCartPrice()
        let totalPriceElement = document.getElementById("totalPrice") // Best practice if ID exists
        if (!totalPriceElement) {
            // Fallback for previous HTML structure if ID wasn't added yet (but in Step 293 user added id="totalPrice")
            let headers = document.querySelectorAll("h3")
            for (let h3 of headers) {
                if (h3.innerText.includes(",-") || h3.innerText.match(/\d+/)) {
                    totalPriceElement = h3
                    break
                }
            }
        }
        if (totalPriceElement) totalPriceElement.innerText = price + ",-"
    }
}

// tohle se bude volat kdyz se ty stranky nactou
document.addEventListener("DOMContentLoaded", renderItems)
document.addEventListener("DOMContentLoaded", renderCart)