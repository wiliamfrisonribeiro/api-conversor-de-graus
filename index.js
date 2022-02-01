const express = require("express")
const cors = require("cors");
const { request, response } = require("express");
const { json } = require("express/lib/response");



const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



const temperatura = (request, response) => {
    response.status(200).json("Seja bem vindo ao express");
}

const temperaturaEN = {
    c: (temperatura) => {
        return (temperatura * 9 / 5) + 32
    },
    f: (temperatura) => {
        return (temperatura - 32) * 5 / 9
    }

}
const converte = (request, response) => {

    try {
        const { temperatura, tipo } = request.body;

        response.status(200).json({ temperatura: temperaturaEN[tipo](temperatura) })
    } catch (error) {
        return response.status(401).json({
            status: 'error',
            message: 'Tipo errado'
        });

    }

}

const getEnviar = async (temp, tipo) => {
    await fetch('http://localhost:3002/ola',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "temperatura": temp, "tipo": tipo })
        })
        .then(response => response.json())
        .then(json => {
            
            return json.temperatura
        })
        .catch(err => console.log(err))
}

app.route("/temperatura").get(temperatura).post(converte)


app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002....")
})