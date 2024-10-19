window.onload = function() {
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  let cartData;

  const handleQuantityChange = e => {
    cartData.items[0].quantity = e.target.value;
    cartData.items[0].final_price = e.target.value * cartData.items[0].price;
    cartData.items_subtotal_price = e.target.value * cartData.items[0].price;
    cartData.original_total_price = e.target.value * cartData.items[0].price;
    renderData();
  }

  const handleDelete = e => {
    cartData.items = [];
    cartData.items_subtotal_price = 0;
    cartData.original_total_price = 0;
    renderData();
  }

  const renderData = () => {
    let subtotal = 0;
    let total = 0;
    cartItemsContainer.innerHTML = '';
    cartData.items.forEach(item => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
          <td><img src="${item.image}" alt="Product Image" style="width: 50px;"></td>
          <td>${item.product_title}</td>
          <td>Rs. ${item.price}</td>
          <td><input class="quantity-input" type="number" value="${item.quantity}" min="1" /></td>
          <td>Rs. ${item.final_price}</td>
          <td><i class="fa-solid fa-trash delete-btn"></i></td>
      `;
      cartItemsContainer.appendChild(row);

  });
  
  // Update subtotal and total
  subtotalElement.textContent = (cartData.items_subtotal_price).toFixed(2);
  totalElement.textContent = (cartData.original_total_price).toFixed(2);

  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', handleQuantityChange)
  })

  const deleteBtn = document.querySelectorAll('.delete-btn');
  
  deleteBtn.forEach(btn => {
    btn.addEventListener('click', handleDelete)
  })
}

  // Fetch cart data
  fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
      .then(response => response.json())
      .then(data => {
          cartData = data;
          renderData();
      })
      .catch(error => console.error('Error fetching cart data:', error));
};








