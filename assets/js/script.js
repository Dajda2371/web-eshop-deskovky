function getItems() {

}

function getCartItems() {

}

function addToCart(itemId) {

}

function deleteFromCart(itemId) {

}

function pay() {
    let cartItems = getCartItems()
    for (let i = 0; i < cartItems.length; i++) {
        deleteFromCart(cartItems[i])
    }
    input("Zadejte číslo karty: ")
    alert("Zaplaceno")
}

function calculateCartPrice() {
    let cartItems = getCartItems()
    let price = 0
    for (let i = 0; i < cartItems.length; i++) {
        price += cartItems[i].price
    }
    return price
}

function login(username, password) {
    let logins = getJson("data/logins.json")
    for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === username && logins[i].password === password) {
            alert("Přihlášen")
            return true
        }
        else {
            alert("Špatné jméno nebo heslo")
            return false
        }
    }
    return false
}

function getJson(filePath) {
    let file = fetch(filePath)
    return file.json()
}