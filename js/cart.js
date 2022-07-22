const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("productsData")) || [];

/* Generar el número total de items en iconoCarrito*/
const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

/* Obtener datos de databse .json */
let productsData = [];

const getData = async () => {
    try {
    const res = await fetch("../database/db.json");
    productsData = await res.json();
    generateCart ();
    } catch (error) {
        console.log(error);
    };
};

/* Calcula Precio total del carrito */
const totalPrice = () => {
    if(cart.length !==0){
        let totalPrice = cart.map((x) => {
            const {id, item} = x;
            let search = productsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0).toFixed(2);
        label.innerHTML = `
        <h2>Total del carrito: $ ${totalPrice}</h2>
        <button class="checkOut">Comprar</button>
        <button onClick="clearCart()" class="removeAll">Vaciar</button>
        `;
    } else return
};

/* Genera página carrito */
let generateCart = () => {
    totalPrice();
    if (cart.length !==0){
        return shoppingCart.innerHTML = cart.map((c)=>{
            const {id, item} = c;
            let search = productsData.find((p)=>p.id === id) || [];
            const {img, name, price} = search;
            return `
            <div class="cart-item">
                <img width="100" src="${img}" alt""><img/>
                <div class="details">
                    <div class="title-price-cart">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                    </div>
                    <div class="quantity">
                        <i onClick="removeItem(${id})" class="fa-solid fa-square-minus fa-2x"></i>
                        <h4>Cantidad: ${item}</h4>
                        <i onClick="addProduct(${id})" class="fa-solid fa-square-plus fa-2x"></i>
                    </div>
                    <h3>Total $ ${(item * price).toFixed(2)}</h3>
                </div>
                <div><i onClick="removeProduct(${id})" class="fa-solid fa-square-xmark fa-2x"></i></div>
            </div>`
        })
        .join ("");
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h3>Tu carro está vacío</h3>
        <a href="../index.html">
            <button class="buttons">Volver</button>
        </a>
        `;
    }
};

/* Agregar productos al carrito */
const addProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    search === undefined 
    ? cart.push({
        id: id,
        item: 1,
    })
    : search.item += 1;
    
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

/* Remover 1 Item del Carrito */
const removeItem = (id) => {
    let search = cart.find((p) => p.id === id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    };
    cart = cart.filter((p) => p.item !==0);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

/* Remover total de items de un producto del carrito*/
const removeProduct = (id) => {
    cart = cart.filter((p) => p.id !== id);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

/*Vaciar carrito */
const clearCart = () => {
    cart = [];
    calculate();
    generateCart();
    localStorage.setItem ("productsData", JSON.stringify(cart));
};

/* Llamado de funciones */
calculate();
getData();