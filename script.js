// Product Data (Simulating Amazon)
const products = [
    { id: 1, name: "Laptop", price: 800, stock: 5 },
    { id: 2, name: "Phone", price: 500, stock: 3 },
    { id: 3, name: "Headphones", price: 150, stock: 10 },
    { id: 4, name: "Google Explorer Devices", price: 1500, stock: 90 },
    { id: 5, name: "JavaScript Books", price: 1800, stock: 300 },
    { id: 6, name: "HTML", price: 500, stock: 30 },
    { id: 7, name: "Phone", price: 500, stock: 33 },
    { id: 8, name: "Phone", price: 500, stock: 303 },
    { id: 9, name: "Phone", price: 500, stock: 45 },
    { id: 10, name: "Phone", price: 500, stock: 76 },
    { id: 10, name: "Phone", price: 500, stock: 45 },
    { id: 11, name: "Phone", price: 500, stock: 78 },
    { id: 12, name: "Phone", price: 500, stock: 56 },
    { id: 13, name: "Phone", price: 500, stock: 45 },
    { id: 14, name: "Phone", price: 500, stock: 23 },
    { id: 14, name: "Phone", price: 500, stock: 32 },
    { id: 15, name: "Phone", price: 500, stock: 54 },
    { id: 16, name: "Phone", price: 500, stock: 65 },
    { id: 17, name: "Phone", price: 500, stock: 37 },
    { id: 18, name: "Phone", price: 40, stock: 58 },
    { id: 19, name: "Phone", price: 50, stock: 69 },
    { id: 20, name: "Phone", price: 50, stock: 90 },
    { id: 21, name: "Phone", price: 50, stock: 7 },
    { id: 22, name: "Phone", price: 700, stock: 67 },
    { id: 23, name: "Phone", price: 50, stock: 36 },
    { id: 24, name: "Phone", price: 50, stock: 35 },
    { id: 25, name: "Phone", price: 600, stock: 33 },
    { id: 26, name: "Phone", price: 300, stock: 37 },
    { id: 27, name: "Phone", price: 50, stock: 30 },
    { id: 28, name: "Phone", price: 600, stock: 35 },
    { id: 29, name: "Phone", price: 500, stock: 32 },
    { id: 30, name: "Phone", price: 50, stock: 34 },
    { id: 31, name: "Phone", price: 500, stock: 34 },
    { id: 32, name: "Phone", price: 50, stock: 36 },
    { id: 23, name: "Phone", price: 500, stock: 35 },
    { id: 33, name: "Phone", price: 500, stock: 35 },
    { id: 34, name: "Phone", price: 50, stock: 38 },
    { id: 35, name: "Phone", price: 50, stock: 39 },
    { id: 36, name: "Phone", price: 50, stock: 37 },
    { id: 37, name: "Phone", price: 50, stock: 38 },
    { id: 38, name: "Phone", price: 50, stock: 37 },
    { id: 39, name: "Phone", price: 50, stock: 37 },
    { id: 40, name: "Phone", price: 500, stock: 38 },
    { id: 41, name: "Phone", price: 50, stock: 39 },
    { id: 42, name: "Phone", price: 500, stock: 39 },
    { id: 43, name: "Phone", price: 50, stock: 34 },
    { id: 44, name: "Phone", price: 50, stock: 34 },
    { id: 45, name: "Phone", price: 500, stock: 34 },
    { id: 46, name: "Phone", price: 50, stock: 35 },
    { id: 47, name: "Phone", price: 50, stock: 36 }

];

// Cart Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Display Products
function displayProducts(productArray = products) {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";

    productArray.forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add Product to Cart
function addToCart(productId) {
    let product = products.find(p => p.id === productId);

    if (product.stock > 0) {
        product.stock--;
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        displayProducts();
    } else {
        alert("Out of stock!");
    }
}

// Update Cart UI
function updateCart() {
    let cartList = document.getElementById("cartList");
    let totalPrice = document.getElementById("totalPrice");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        let cartItem = document.createElement("li");
        cartItem.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    totalPrice.innerText = total;
}

// Remove Item from Cart
function removeFromCart(index) {
    let removedItem = cart.splice(index, 1)[0];

    let product = products.find(p => p.id === removedItem.id);
    product.stock++;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    displayProducts();
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
    } else {
        alert(`Order placed! Total: $${document.getElementById("totalPrice").innerText}`);
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

// Enhanced Search Function (Local & Google)
function handleSearch(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let searchType = document.getElementById("searchType").value;
    let query = document.getElementById("searchBox").value.toLowerCase();

    if (searchType === "local") {
        if (query === "") {
            displayProducts(); // Show all products if search is empty
        } else {
            let filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
            displayProducts(filteredProducts);
        }
    } else {
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
}

// Listen for real-time input changes to update search results dynamically
document.getElementById("searchBox").addEventListener("input", function() {
    let query = this.value.toLowerCase();
    if (query === "") {
        displayProducts(); // Show all products when input is cleared
    } else {
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    }
});

// Load Products & Cart Initially
displayProducts();
updateCart();
