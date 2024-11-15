document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.49 },
        { id: 2, name: "Product 2", price: 9.49 },
        { id: 3, name: "Product 3", price: 99.49 },
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Render product list
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id='${product.id}'>Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add product to cart
    productList.addEventListener("click", (e) => {
        if(e.target.tagName === 'BUTTON'){
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        renderCart();
    }

    // Remove product from cart
    cartItems.addEventListener("click", (e) => {
        if(e.target.classList.contains('remove-btn')){
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    // Render the cart
    function renderCart(){
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if(cart.length > 0){
            emptyCartMessage.classList.add('hidden');
            cartTotal.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-btn" data-index='${index}'>Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    // Checkout button functionality
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
});
