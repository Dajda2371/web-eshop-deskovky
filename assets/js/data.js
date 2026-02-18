async function getJson(filePath) {
    const response = await fetch(filePath)
    return await response.json()
}

async function saveJson(filePath, data) {
    await fetch(filePath, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}