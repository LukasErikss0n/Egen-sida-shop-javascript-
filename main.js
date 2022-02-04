let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        id: 1,
        name: 'Tag heuar watch ',
        tag: 'tadeusz-lakota-Tb38UzCvKCY-unsplash',
        price: 2000,
        inCart: 0
    },
    {
        id: 2,
        name: 'Fossil watch',
        tag: 'fossilwatch',
        price: 1000,
        inCart: 0
    },
    {
        id:3,
        name: 'Rolex submarin date ',
        tag: 'rolex',
        price: 7000,
        inCart: 0
    },
    {
        id: 4,
        name: 'Seko watch',
        tag: 'seko',
        price: 145,
        inCart: 0
    },
    {
        id: 5,
        name: 'Black fossil watch ',
        tag: 'shreesha-bhat-lz6z9GZu8hk-unsplash',
        price: 180,
        inCart: 0
    },
    {
        id: 6,
        name: 'Hamilton watch ',
        tag: 'hamilton',
        price: 200,
        inCart: 0
    },
    {
        id: 7,
        name: 'Mamba watch',
        tag: 'mamba',
        price: 145,
        inCart: 0
    },
    {
        id: 8,
        name: 'Omega watch',
        tag: 'omega',
        price: 4500,
        inCart: 0
    },
    {
        id: 9,
        name: 'Rolex daytona watch',
        tag: 'daytona',
        price: 12300,
        inCart: 0
    },
    {
        id: 10,
        name: 'Current watch',
        tag: 'current',
        price: 240,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNummbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNummbers(){
    let productNummbers = localStorage.getItem('cartNummbers')

    if(productNummbers){
    document.querySelector('.cart span').textContent = productNummbers;
    }
}

function cartNummbers(products){
    let productNummbers = localStorage.getItem('cartNummbers')
    
    productNummbers = parseInt(productNummbers);

    if(productNummbers){
        localStorage.setItem('cartNummbers', productNummbers +1);
        document.querySelector('.cart span').textContent = productNummbers +1;
    } else{
        localStorage.setItem('cartNummbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

   setItems(products)

}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems !== null){
        if(cartItems[products.tag] == undefined){
            cartItems ={
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify
    (cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + 
        products.price);
    } else{
        localStorage.setItem('totalCost', products.price);
    }  
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    ('.products');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class ="row" data-product-id=${item.id}>
                <div class="product">
                    <i class=" cross fas fa-times"></i>
                    <img src="./img/${item.tag}.jpg">
                    <span class="name-shoppbag">${item.name}</span>
                </div>
                <div class ="price">$${item.price},00</div>
                <div class ="quantity">
                    <i class="fas fa-arrow-circle-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fas fa-arrow-circle-right"></i>
                </div>
                <div class ="total">
                    $${item.inCart * item.price},00
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class ="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class ="basketTotal">
                    $${cartCost},00
                </h4>
        `;
    }
}

function removCard(){
    const cross = document.querySelectorAll('.cross')
    console.log(cross);
    for (let i=0; i < cross.length; i++){
        cross[i].addEventListener('click', (e) =>{
            var delet = e.target.closest('.row')
            delet.remove();
    
        })
    }
}


onLoadCartNummbers()
displayCart()
removCard()


