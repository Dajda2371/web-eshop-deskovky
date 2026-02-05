function getItems() {

}

function getCartItems() {

}

function addToCart(itemId) {

}

function deleteFromCart(itemId) {

}

function pay() {
    cartItems = []
    cartItems = getCartItems()
    for (let i = 0; i < cartItems.length; i++) {
        deleteFromCart(cartItems[i])
    }
}