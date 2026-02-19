async function signup(username, password) {
    let logins = await getJson("data/logins.json")
    logins.push({ username, password })
    await saveJson("data/logins.json", logins)
    login(username, password)
}

async function login(username, password) {
    let logins = await getJson("data/logins.json")
    for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === username && logins[i].password === password) {
            window.location.href = "ucet.html"

            document.cookie = "username=" + username + "; path=/"
            document.cookie = "isLoggedIn=" + true + "; path=/"

            document.getElementById("user").innerHTML = username
            return true
        }
    }
    alert("Špatné jméno nebo heslo")
    return false
}

function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "index.html"
}

function getCookie(name) { // najde cookie podle jmena a vrati jeji value (browser magie)
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2]; // to co chchi je treti v poradi
    return null;
}

function checkLoginState() { // podle tyhle funkce tam zobrazi ussername
    let username = getCookie("username");
    let userSpan = document.getElementById("user");
    if (userSpan) {
        if (username) {
            userSpan.innerText = username;
        } else {
            userSpan.innerText = "Nepřihlášen";
        }
    }
}

document.addEventListener("DOMContentLoaded", checkLoginState); // az se ta stranka nacte tak se callne checkLoginState
