const express = require("express")
const app = express()
// const cors = require("cors")
// app.use(cors({
//   origin: "*",
//   optionsSuccessStatus: 200
// }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})


// Escutar evento "connection":
io.on("connection", (socket) => {
  console.log(socket)
  // console.log(socket.id)

  // Escuta evento "disconnect":
  // socket.on("disconnect", data => {
  //   console.log("X desconnectou: " + socket.id)
  //   console.log(`Usuario desconectado: ${data.}`)
  // })

  socket.on("msg", data => {
    console.log(data)
    
    //socket.emit("showmsg", data)            // apenas para socket especifico
    //socket.broadcast.emit("showmsg", data)  // Envia para todos,menos para si proprio
    io.emit("showmsg", data)                  // Envia para todos
  })
  
})

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})

http.listen(8080, () => {
  console.log("APP RODANDO")
})


