const express = require('express');
const app = express();
const express = require("express");

app.use(express.static("public"));

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor del módulo E-Commerce funcionando 🚀');
});

// Ruta de prueba API
app.get('/api/test', (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

// Puerto dinámico (IMPORTANTE para nube)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});