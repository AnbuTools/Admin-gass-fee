// Function to update notice
function setNotice() {
    const noticeText = document.getElementById("notice").value;
    document.getElementById("notice-text").textContent = noticeText;
  
    // Save notice to Firebase Realtime Database
    database.ref("notice").set({ text: noticeText });
  }
  
  // Load data when page loads
  window.onload = function () {
    // Load notice from Firebase
    database.ref("notice").on("value", (snapshot) => {
      const noticeData = snapshot.val();
      if (noticeData) {
        document.getElementById("notice-text").textContent = noticeData.text;
      }
    });
  
    loadProducts();
    loadOrders();
  };
  
  // Function to add a product
  function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;
    const description = document.getElementById("product-description").value;
  
    if (name && price && image) {
      const product = {
        name: name,
        price: price,
        image: image,
        description: description,
      };
  
      // Save product to Firebase Realtime Database
      const newProductRef = database.ref("products").push();
      newProductRef.set(product);
  
      clearForm();
      loadProducts();
    } else {
      alert("Please fill in all required fields!");
    }
  }
  
  // Function to clear form inputs
  function clearForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
    document.getElementById("product-description").value = "";
  }
  
  // Function to load products from Firebase
  function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    database.ref("products").on("value", (snapshot) => {
      const products = snapshot.val();
      productList.innerHTML = "";
  
      if (products) {
        Object.keys(products).forEach((key) => {
          const product = products[key];
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><img src="${product.image}" alt="Product Image" width="50"></td>
            <td>${product.description || "No description"}</td>
            <td><button onclick="deleteProduct('${key}')">Delete</button></td>
          `;
          productList.appendChild(row);
        });
      }
    });
  }
  
  // Function to delete a product
  function deleteProduct(productId) {
    database.ref("products/" + productId).remove();
  }
  
  // Function to load orders from Firebase
  function loadOrders() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";
  
    database.ref("orders").on("value", (snapshot) => {
      const orders = snapshot.val();
      orderList.innerHTML = "";
  
      if (orders) {
        Object.keys(orders).forEach((key) => {
          const order = orders[key];
          order.cart.forEach((item) => {
            const orderRow = document.createElement("tr");
            orderRow.innerHTML = `
              <td>${order.userName}</td>
              <td>${order.telegramUsername}</td>
              <td>${order.userNumber}</td>
              <td>${item.name}</td>
              <td>$${item.price}</td>
              <td>${order.walletAddress}</td>
              <td><button onclick="deleteOrder('${key}')">Delete</button></td>
            `;
            orderList.appendChild(orderRow);
          });
        });
      }
    });
  }
  
  // Function to delete an order
  function deleteOrder(orderId) {
    database.ref("orders/" + orderId).remove();
  }
  
