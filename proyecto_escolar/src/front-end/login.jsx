import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('login'))
root.render(
    <PaginaLogin />
)


const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'tu_host_mysql',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'tu_base_de_datos',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

app.use(bodyParser.json());
app.use(express.static('./front-end')); // Carpeta que contiene archivos estáticos (como login.html)

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (result.length === 1) {
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

// HTML/JSX para la página de inicio de sesión

function PaginaLogin(){

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
          window.location.href="./index.html"
        })
        .catch(error => console.error('Error:', error));
      }

    return(
        <div>
            <h2>Iniciar Sesión</h2>

            <form id="loginForm">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required />

            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required />

            <button type="button" onClick={login}>Iniciar Sesión</button>
            </form>
        </div>
    )

}

