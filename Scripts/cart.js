document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tbody = document.querySelector(".cart-table tbody");
    const totalSpan = document.getElementById("cart-total");

    tbody.innerHTML = "";

    let cartTotal = 0;

    cart.forEach((product, index) => {

        const subtotal = product.price * product.quantity;
        cartTotal += subtotal;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="product-name">
                <img src="${product.image}" class="cart-img">
                ${product.title}
            </td>
            <td class="product-price">$${product.price}</td>
            <td class="product-quantity">
                <input type="number" min="1" value="${product.quantity}" class="quantity-input" data-index="${index}">
            </td>
            <td class="product-total">$${subtotal}</td>
            <td class="product-actions">
                <button class="remove-button" data-index="${index}">Eliminar</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    totalSpan.textContent = "$" + cartTotal.toFixed(2);
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-button")) {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = e.target.dataset.index;

        cart.splice(index, 1); 
        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();
    }
});

document.addEventListener("change", function(e) {
    if (e.target.classList.contains("quantity-input")) {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = e.target.dataset.index;

        const newQty = Number(e.target.value);
        cart[index].quantity = newQty;

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart(); 
    }
});