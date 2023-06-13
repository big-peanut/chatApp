const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/login', (req, res, next) => {
    res.send(`
    <form action="/login" method="POST" onsubmit="saveUsername()">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <button type="submit">Login</button>
    </form>

    <script>
      function saveUsername() {
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
      }
    </script>
  `);
})

app.post('/login', (req, res, next) => {
    res.redirect('/')
})

app.get('/', (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            data = "NO CHAT YET"
        }
        res.send(`${data}
    <form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
      <label for="message">Message:</label>
      <input type="text" id="message" name="message" required>
      <input type="hidden" name="username" id="username">
      <button type="submit">Send</button>
    </form>
  `)
    })
})

app.post('/', (req, res, next) => {
    const username = req.body.username
    const message = req.body.message
    fs.appendFileSync('username.txt', `${username}:${message}`)
    res.redirect('/')
})

app.listen(4000)
