const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("productsData")) || [];

const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

calculate();

const getData = async () => {
    try {
    const res = await fetch("../database/db.json");
    productsData = await res.json();
    generateCart ();
    } catch (error) {
        console.log(error);
    };
};

getData();

let generateCart = () => {
    if (cart.length !==0){
        return shoppingCart.innerHTML = cart.map((c)=>{
            const {id, item} = c;
            let search = productsData.find((p)=>p.id === id) || [];
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt""><img/>
                <div class="details">
                    <div class="title-price-cart">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                    </div>
                    <div class="quantity">
                        <i onClick="removeItem(${id})" class="fa-solid fa-square-minus fa-2x"></i>
                        <h4>Cantidad: ${item}</h4>
                        <i onClick="addProduct(${id})" class="fa-solid fa-square-plus fa-2x"></i>
                    </div>
                    <h3>Total $ ${(item * search.price).toFixed(2)}</h3>
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
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

// Función para remover Items del Carrito
const removeItem = (id) => {
    let search = cart.find((p) => p.id === id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    console.log(cart);
    cart = cart.filter((p) => p.item !==0);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

const removeProduct = (id) => {
    cart = cart.filter((p) => p.id !== id);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};