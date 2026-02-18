async function getItems() {
    return await getJson("data/items.json")
}

async function getCartItems() {
    return await getJson("data/cart.json")
}

async function getItem(itemId) { // ziskam celej obsah itemu podle ID
    let items = await getItems()
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            return items[i]
        }
    }
    return 0
}

async function getItemPrice(itemId) {
    let item = await getItem(itemId)
    return item.price
}

async function addToCart(itemId) {
    let cartItems = await getCartItems()
    cartItems.push(itemId)
    await saveJson("data/cart.json", cartItems)
}

async function deleteFromCart(itemId) {
    let cartItems = await getCartItems()
    cartItems = cartItems.filter(item => item !== itemId)
    await saveJson("data/cart.json", cartItems)
}

async function pay() {
    let cartItems = await getCartItems()
    let cardNumber = prompt("Zadejte číslo karty: ")
    if (cardNumber) {
        await saveJson("data/cart.json", [])
        alert("Zaplaceno")
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