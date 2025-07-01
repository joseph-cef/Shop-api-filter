const container = document.getElementById("product-container");
const categoryFilter = document.getElementById("category-filter");

async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
    setupFilter(products);
  } catch (error) {
    container.innerHTML = `<p class="text-red-600">Erreur : ${error.message}</p>`;
  }
}

function displayProducts(products) {
  container.innerHTML = products.map(product => `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300">
      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain p-4 bg-gray-50">
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-2 text-gray-800">${product.title}</h2>
        <p class="text-blue-600 font-bold mb-2">$${product.price}</p>
        <p class="text-gray-600 text-sm">${product.description.substring(0, 80)}...</p>
      </div>
    </div>
  `).join('');
}

function setupFilter(products) {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  categoryFilter.innerHTML = categories.map(category => `
    <option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>
  `).join('');

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
