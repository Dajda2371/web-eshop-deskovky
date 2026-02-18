async function signup(username, password) {
    let logins = await getJson("data/logins.json")
    logins.push({ username, password })
    await saveJson("data/logins.json", logins)
    window.location.href = "ucet.html"
}

async function login(username, password) {
    let logins = await getJson("data/logins.json")
    for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === username && logins[i].password === password) {
            window.location.href = "ucet.html"

            document.cookie = "username=" + username
            document.cookie = "password=" + password
            document.cookie = "isLoggedIn=" + true

            document.getElementById("user").innerHTML = username
            return true
        }
    }
    alert("Špatné jméno nebo heslo")
    return false
}