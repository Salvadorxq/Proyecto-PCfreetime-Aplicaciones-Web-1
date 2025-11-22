async function loadProducts(category) {
    try {
        const res = await fetch("/Data/productsData.json");
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

    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-cart-btn")) {

            const card = e.target.closest(".product-card");

            const title = card.querySelector("h3").textContent;
            const price = Number(card.querySelector(".price").textContent.replace("$",""));
            const image = card.querySelector("img").src;
            const quantity = Number(card.querySelector(".qty-input").value);

            const product = { title, price, image, quantity };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existing = cart.find(p => p.title === title);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Producto agregado al carrito!");
        }
    });
}

