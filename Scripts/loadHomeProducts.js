document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("Data/productsData.json");
        const data = await response.json();

        loadHomeProducts(data);

    } catch (error) {
        console.error("Error cargando productos en Home:", error);
    }
});

function loadHomeProducts(data) {
    const container = document.getElementById("home-products-container");
    container.innerHTML = ""; 

    for (const categoryName in data) {
        const products = data[categoryName].slice(0, 3); 

        const categoryBlock = document.createElement("div");
        categoryBlock.classList.add("category-block");

        const title = document.createElement("h3");
        title.textContent = getCategoryLabel(categoryName);
        categoryBlock.appendChild(title);

        const productsContainer = document.createElement("div");
        productsContainer.classList.add("products-container");

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h4>${product.title}</h4>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>
            `;

            productsContainer.appendChild(card);
        });

        categoryBlock.appendChild(productsContainer);
        container.appendChild(categoryBlock);
    }
}

function getCategoryLabel(categoryName) {
    const labels = {
        category1: "Productos",
        category2: "Componentes",
        category3: "Periféricos"
    };
    return labels[categoryName] || "Categoría";
}