async function getItems() {
    return await getJson("data/items.json")
}

async function getCartItems() {
    return await getJson("data/cart.json")
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
    let items = await getItems()
    let price = 0
    for (let i = 0; i < cartItems.length; i++) {
        let textId = cartItems[i]

        let item = null
        for (let j = 0; j < items.length; j++) {
            if (items[j].id === textId) {
                item = items[j]
                break
            }
        }
        if (item) { // osetreni kdyby to naslo bordel tak to tu cenu nepricte, protoze jinak by se to vysralo
            price += item.price
        }
    }
    return price
}