const url = "http://127.0.0.1:8000/api/v1/"; // API URL
const token = ""; // API Token
const method = "GET"; // Request method, change for what's needed

fetch(url, {
    method,
    headers: {
        "Authorization": `Bearer ${token}` // This is the important part, the auth header
    }
}).then(res => res.json().then(console.log)).catch(console.error); // Do better handling here