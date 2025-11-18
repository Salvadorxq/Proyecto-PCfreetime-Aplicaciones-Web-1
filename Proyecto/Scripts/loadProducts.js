async function loadProducts(category) {
    try {
        const res = await fetch("../Data/productsData.json");
        const data = await res.json();

        const products = data[category];
        const container = document.querySelector(".products-container");

        if (!products) {
            container.innerHTML = "<p style='color:white;'>No hay productos en esta categoría.</p>";
            return;
        }

        container.innerHTML = ""; 

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>

                <div class="quantity-box">
                    <button class="qty-btn" onclick="this.nextElementSibling.stepDown()">−</button>
                    <input type="number" value="1" min="1" class="qty-input">
                    <button class="qty-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                </div>

                <button class="add-cart-btn">Agregar al carrito</button>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}