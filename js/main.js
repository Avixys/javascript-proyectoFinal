const products = document.getElementById ("products");

let cart = JSON.parse(localStorage.getItem("productsData")) || [];

// Función para generar grilla de productos
let generatePorudcts = () => {
    return (products.innerHTML = productsData.map((p)=>{
        const {id, name, price, img} = p;
        return `<div class="item">
        <img src="${img}" alt="img not found">
        <div class="details">
            <h3>${name}</h3>
            <div class="price">
                <h2>${price}</h2>
                <button onClick="addProduct(${id})" class="buttons">Agregar</button>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};

generatePorudcts ();

// Función agregar productos al carrito
const addProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    if(search === undefined){
        cart.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    console.log(cart);
    calculate();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

// Función para remover Productos del Carrito: Falta procesar la página carrito para aplicarla
const removeProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    console.log(cart); 
    calculate();
    localStorage.setItem("productsData", JSON.stringify(cart));
};


// Función para calcular total de productos del carrito
const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

calculate();