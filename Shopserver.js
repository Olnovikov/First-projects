const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
   
    let body = null; try{body = fs.readFileSync(`./src/${req.url}`)}catch{body=fs.readFileSync('./src/shop.html')} res.end(body)
})


const port = process.env.PORT || 3000
server.listen(port)

console.log(`Server started on port ${port}!`)
