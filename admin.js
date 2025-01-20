// Function to update notice
function setNotice() {
    const noticeText = document.getElementById('notice').value;
    document.getElementById('notice-text').textContent = noticeText;

    // Save notice to local storage
    localStorage.setItem('noticeText', noticeText);
}

// Load data when page loads
window.onload = function() {
    const savedNotice = localStorage.getItem('noticeText');
    if (savedNotice) {
        document.getElementById('notice-text').textContent = savedNotice;
    }

    loadProducts();
    loadOrders();
};

// Function to add a product
function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;

    if (name && price && image) {
        const product = {
            name: name,
            price: price,
            image: image,
            description: description,
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        clearForm();
        loadProducts();
    } else {
        alert('Please fill in all required fields!');
    }
}

// Function to clear form inputs
function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-description').value = '';
}

// Function to load products from local storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><img src="${product.image}" alt="Product Image" width="50"></td>
            <td>${product.description || 'No description'}</td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        `;
        productList.appendChild(row);
    });
}

// Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Function to load orders from local storage
function loadOrders() {
const orders = JSON.parse(localStorage.getItem('orders')) || [];
const orderList = document.getElementById('order-list');
orderList.innerHTML = '';

orders.forEach((order, index) => {
order.cart.forEach(item => {
    const orderRow = document.createElement('tr');
    orderRow.innerHTML = `
        <td>${order.userName}</td>
        <td>${order.telegramUsername}</td>
        <td>${order.userNumber}</td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${order.walletAddress}</td>
        <td><button onclick="deleteOrder(${index})">Delete</button></td>
    `;
    orderList.appendChild(orderRow);
});
});
}


// Function to delete an order
function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
}
