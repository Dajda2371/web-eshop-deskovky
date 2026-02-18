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

async function signup(username, password) {
    let logins = await getJson("data/logins.json")
    logins.push({ username, password })
    await saveJson("data/logins.json", logins)
}

async function login(username, password) {
    let logins = await getJson("data/logins.json")
    for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === username && logins[i].password === password) {
            alert("Přihlášen")
            return true
        }
    }
    alert("Špatné jméno nebo heslo")
    return false
}

// Updated helpers to use localStorage for persistence instead of server POSTs
async function getJson(key) {
    // items.json is static, always fetch from server
    if (key === "data/items.json") return await (await fetch(key)).json()

    // For other data (cart, logins), check localStorage first
    const stored = localStorage.getItem(key)
    if (stored) return JSON.parse(stored)

    // Fallback to initial file on server if local doesn't exist
    try {
        const response = await fetch(key)
        if (response.ok) return await response.json()
    } catch (e) {
        console.warn("Fetch failed for " + key)
    }
    return []
}

async function saveJson(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
