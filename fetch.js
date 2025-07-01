const container = document.getElementById("product-container");
const categoryFilter = document.getElementById("category-filter");

async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
    setupFilter(products);
  } catch (error) {
    container.textContent = `Erreur : ${error.message}`;
    container.style.color = "red";
  }
}

function displayProducts(products) {
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.className = "w-full h-48 object-contain p-4 bg-gray-50";

    const content = document.createElement("div");
    content.className = "p-4";

    const title = document.createElement("h2");
    title.className = "text-lg font-semibold mb-2 text-gray-800";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "text-blue-600 font-bold mb-2";
    price.textContent = `$${product.price}`;

    const desc = document.createElement("p");
    desc.className = "text-gray-600 text-sm";
    desc.textContent = product.description.substring(0, 80) + "...";

    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(desc);

    card.appendChild(img);
    card.appendChild(content);

    container.appendChild(card);
  });
}

function setupFilter(products) {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  categoryFilter.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
  categoryFilter.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected === "all") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === selected);
      displayProducts(filtered);
    }
  });
}

getData();
