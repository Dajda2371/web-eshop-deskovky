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
}

function calculateCartPrice() {
    let cartItems = getCartItems()
    let price = 0
    for (let i = 0; i < cartItems.length; i++) {
        price += cartItems[i].price
    }
    return price
}