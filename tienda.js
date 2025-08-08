// variables

const productos = [
    {nombre:"🥐" , precio:10, id: 101},
    {nombre:"🥪" , precio:20, id: 102},
    {nombre:"🥯" , precio:15, id: 103},
    {nombre:"🥞" , precio:17, id: 104},
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// variables DOM

const listaProd = document.getElementById("listaProd")
const listaCarrito = document.getElementById("listaCarrito")
const botonCompra = document.getElementById("btnCompra")
const formularioCompra = document.getElementById("formularioCompra")

// funciones

const calcularTotalCarrito = ()=>{
    // calcula el total del carrito
    let total = carrito.reduce((suma,elemento)=>{
        return suma + elemento.precio
    },0)
    return total
}

const mostrarTotal = ()=>{
    // muestra el total del carrito
    const divTotal = document.getElementById("total")
    divTotal.innerText = `Total: $${calcularTotalCarrito()}`
}

const guardarCarrito = ()=>{
    // guarda carrito
    const carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJSON)
}

const mostrarCarrito = ()=>{
    // muestra carrito
    listaCarrito.innerHTML = ""
    carrito.forEach(prod=>{
        const li = document.createElement("li")
        li.innerHTML = `${prod.nombre} - $${prod.precio}`
        listaCarrito.appendChild(li)
    })
}

const vaciarCarrito = ()=>{
    carrito = []
    guardarCarrito()
    mostrarCarrito()
    mostrarTotal()
}

const agregarCarrito = (prod)=>{
    carrito.push(prod)
    mostrarCarrito()
    mostrarTotal()
    guardarCarrito()
}

function mostrarProd(){
    listaProd.innerHTML = ""
    productos.forEach(prod=>{
        // Crear
        const li = document.createElement("li")
        const div = document.createElement("div")
        const btn = document.createElement("button")

        // Modificar
        li.id = prod.id
        div.innerText = `${prod.nombre} - $${prod.precio}`
        btn.innerText = "comprar"
        btn.addEventListener("click",()=>{
            agregarCarrito(prod)
        })

        // agregar al DOM
        li.appendChild(div)
        li.appendChild(btn)
        listaProd.appendChild(li)
    })
}

const comprar =(nombre)=>{
    const agradecimiento = document.getElementById("agradecimiento")
    agradecimiento.innerText = `gracias por su compra ${nombre}`
    vaciarCarrito()
}

formularioCompra.addEventListener("submit",(e)=>{
    e.preventDefault()
    const informacion = new FormData(e.target)
    const submit = Object.fromEntries(informacion)
    console.log(submit)
    comprar(submit.nombre+" "+submit.apellido)
})

function inicializar(){
    mostrarProd()
    mostrarCarrito()
    mostrarTotal()
}

// ejecucion de codigo

inicializar()

const traerProd = async ()=>{
    try {
        const datosJson = await fetch("lista.json")
        const datosProcesados = await datosJson.json()

        prod = datosProcesados
        mostrarProd()
    } catch (error) {
        console.warn("Este es el error:", error)
        listaProd.innerText = "Error 404, no se consiguieron los datos."
    }
}

traerProd()