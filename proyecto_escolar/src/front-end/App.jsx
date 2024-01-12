import React from 'react'
import ReactDOM from 'react-dom/client'

export function App(){
    function redireccion(){
        window.location.href="./login.html"
    }
    return (
        <div>
            <h1>mi pagina para proyecto</h1>
            <button onClick={redireccion}>clic</button>
        </div>
    );
}