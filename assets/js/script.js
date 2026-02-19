async function getItems() {
    return await getJson("data/items.json")
}

async function getCartItems() {
    return await getJson("data/cart.json")
}

async function getItemById(itemId) { // ziskam celej obsah itemu podle ID
    let items = await getItems()
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            return items[i]
        }
    }
    return 0
}

async function getItemPrice(itemId) {
    let item = await getItemById(itemId)
    return item.price
}

async function addToCart(itemId) {
    let cartItems = await getCartItems()
    cartItems.push(itemId)
    await saveJson("data/cart.json", cartItems)
    renderCart()
}

async function deleteFromCart(itemId) {
    let cartItems = await getCartItems()
    cartItems = cartItems.filter(item => item !== itemId)
    await saveJson("data/cart.json", cartItems)
    renderCart() // to tu musi bejt aby jsem to jak kkt nemuse manualne refreshovat
}

async function pay() {
    let cartItems = await getCartItems()
    let cardNumber = Number(prompt("Zadejte číslo karty: "))
    if (cardNumber && !isNaN(cardNumber)) {
        await saveJson("data/cart.json", [])
        alert("Zaplaceno")
        renderCart()
    } else {
        alert("Neplatné číslo karty")
    }
}

// Projde vsechny veci v kosiku a najde k nim cenu a secte vsechny ty ceny dohromady
async function calculateCartPrice() {
    let cartItems = await getCartItems()
    let totalPrice = 0
    for (let i = 0; i < cartItems.length; i++) {
        let itemId = cartItems[i]
        let itemPrice = await getItemPrice(itemId)
        totalPrice += itemPrice
    }
    return totalPrice
}