const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
const postsRoutes = require('./routes/post')

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a mi aplicación')
})

// Usar rutas
app.use('', postsRoutes)

app.all('*', (req, res) => res.status(404).json({ status: false, message: 'pagina no encontrada' }))

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))
