const products = document.getElementById ("products");
let cart = JSON.parse(localStorage.getItem("productsData")) || [];

let productsData = [];

const getData = async () => {
    try {
    const res = await fetch("../database/db.json");
    productsData = await res.json();
    generateProducts ();
    } catch (error) {
        console.log(error);
    };
};



// Función para generar grilla de productos
let generateProducts = () => {
    return (products.innerHTML = productsData.map((p)=>{
        const {id, name, price, img} = p;
        return `
        <div id="product-id-${id}" class="item">
        <img src="${img}" alt="img not found">
        <div class="details">
            <h3>${name}</h3>
            <div class="price">
                <h2>$ ${price}</h2>
                <button onClick="addProduct(${id})" class="buttons">Agregar</button>
            </div>
        </div>
    </div>
    `;
    })
    .join(""));
};


// Función para calcular total de productos del carrito
const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

// Función agregar productos al carrito
const addProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    search === undefined
    ? cart.push({
        id: id,
        item: 1,
    })
    : search.item +=1;
        
    calculate();
    let productToast = productsData.find ((p) => p.id===id);
    Toastify({
        text: `Producto agregado al carrito\n${productToast.name}\n$ ${productToast.price}`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        className: 'notification',
        style: {
            background: "lightgreen",
            color: "black",
        },
    }).showToast();

    localStorage.setItem("productsData", JSON.stringify(cart));
};

/* Búsqueda de prodcutos */

const findProducts = () => {
    const input = document.querySelector("#findProducts");
    input.addEventListener("keyup", (e) => {
        let lowerCaseInput = e.target.value.toLowerCase();
        if(e.target.matches("#findProducts")) {
            document.querySelectorAll(".item").forEach(
                (el) => el.textContent.toLowerCase().includes(lowerCaseInput)
                ? el.classList.remove("filter-item")
                : el.classList.add("filter-item")
            );
        }
    });
    generateProducts();
};

/* Llamado de funciones */
getData();
calculate();
findProducts();