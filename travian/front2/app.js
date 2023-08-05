fetch("http://127.0.0.1:8000/api/v1/abcd", { mode: 'cors' })
    .then(response => response.json())
    .then(data => { console.log(data); })