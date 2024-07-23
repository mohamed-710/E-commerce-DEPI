import handelRemoterequest from "../shaers/api.js";

$(document).ready(() => {
  const categoriesElement = $('.categories');
  const loadingElement = $('.loading');
  const mainElement = $('.main-content');
  const errorElement = $('.error');
  const cardElement = $('.card-container');
  const searchInput = $('.user-input'); // Assuming this is your search input field
  const searchButton = $('.search'); // Assuming this is your search button
  const cartButton = $('#cartButton');
  const cartSidebar = $('.cart-sidebar');
  const cartContent = $('.cart-content');
  const cartItems = $('.cart-items');
  const numOfItems = $('#num_of_item');
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage
  const defaultCategory = 'smartphones';

  // Fetch and display categories
  handelRemoterequest(
    'products/categories',
    function (data) {
      categoriesElement.html(data.map((item) => `<li><a href="#" data-category="${item.slug}">${item.name}</a></li>`).join(''));

      categoriesElement.find('a').click(function (event) {
        event.preventDefault();
        const category = $(this).data('category');
        fetchProducts(category);
      });

      fetchProducts(defaultCategory);
    },
    function () {
      errorElement.removeClass('d-none');
      mainElement.removeClass('d-none');
    },
    function () {
      loadingElement.removeClass('d-none');
    },
    function () {
      loadingElement.addClass('d-none');
      if (!errorElement.hasClass('d-none')) {
        mainElement.addClass('d-none');
      } else {
        mainElement.removeClass('d-none');
      }
    }
  );

  function fetchProducts(category) {
    handelRemoterequest(
      `products/category/${category}`,
      function (data) {
        cardElement.html(data.products.map((item) => `
          <div class="card">
            <img src="${item.thumbnail}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="rating">
              <span>⭐ ${item.rating}</span>
            </div>
            <div class="price">$${item.price}</div>
            <button class="add-to-cart" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-thumbnail="${item.thumbnail}" data-stock="${item.stock}">Add to cart</button>
          </div>
        `).join(''));
      },
      function () {
        errorElement.removeClass('d-none');
        mainElement.removeClass('d-none');
      },
      function () {
        loadingElement.removeClass('d-none');
      },
      function () {
        loadingElement.addClass('d-none');
        if (!errorElement.hasClass('d-none')) {
          mainElement.addClass('d-none');
        } else {
          mainElement.removeClass('d-none');
        }
      }
    );
  }

  function searchProducts(query) {
    handelRemoterequest(
      `products/search?q=${query}`,
      function (data) {
        cardElement.html(data.products.map((item) => `
          <div class="card">
            <img src="${item.thumbnail}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="rating">
              <span>⭐ ${item.rating}</span>
            </div>
            <div class="price">$${item.price}</div>
            <button class="add-to-cart" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-thumbnail="${item.thumbnail}" data-stock="${item.stock}">Add to cart</button>
          </div>
        `).join(''));
      },
      function () {
        errorElement.removeClass('d-none');
        mainElement.removeClass('d-none');
      },
      function () {
        loadingElement.removeClass('d-none');
      },
      function () {
        loadingElement.addClass('d-none');
        if (!errorElement.hasClass('d-none')) {
          mainElement.addClass('d-none');
        } else {
          mainElement.removeClass('d-none');
        }
      }
    );
  }

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartContent.find('.empty-cart-message').removeClass('d-none');
      cartItems.html('');
    } else {
      cartContent.find('.empty-cart-message').addClass('d-none');
      cartItems.html(cart.map((item) => `
        <li>
          <img src="${item.thumbnail}" alt="${item.title}" style="height:50px; width:50px; object-fit:cover">
          <h4>${item.title}</h4>
          <div class="quantity-controls">
            <button class="decrease-quantity" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-quantity" data-id="${item.id}">+</button>
          </div>
          <div class="price">$${item.price * item.quantity}</div>
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </li>
      `).join(''));
    }
    numOfItems.text(cart.reduce((sum, item) => sum + item.quantity, 0));
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
  }

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity++;
      } else {
        alert('Not enough stock');
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
  }

  function updateQuantity(id, change) {
    const product = cart.find(item => item.id === id);
    if (product) {
      if (product.quantity + change > 0 && product.quantity + change <= product.stock) {
        product.quantity += change;
      } else if (product.quantity + change <= 0) {
        removeFromCart(id);
      } else {
        alert('Not enough stock');
      }
    }
    updateCartDisplay();
  }

  $(document).on('click', '.categories a', function (e) {
    e.preventDefault();
    const category = $(this).data('category');
    fetchProducts(category);
  });

  cartButton.click(function () {
    cartSidebar.toggleClass('d-none');
  });

  $(document).on('click', '.add-to-cart', function () {
    const product = {
      id: $(this).data('id'),
      title: $(this).data('title'),
      price: $(this).data('price'),
      thumbnail: $(this).data('thumbnail'),
      stock: $(this).data('stock')
    };
    addToCart(product);
  });

  $(document).on('click', '.increase-quantity', function () {
    const id = $(this).data('id');
    updateQuantity(id, 1);
  });

  $(document).on('click', '.decrease-quantity', function () {
    const id = $(this).data('id');
    updateQuantity(id, -1);
  });

  $(document).on('click', '.remove-from-cart', function () {
    const id = $(this).data('id');
    removeFromCart(id);
  });

  searchButton.click(function () {
    const query = searchInput.val().trim();
    if (query) {
      searchProducts(query);
    }
  });

  searchInput.on('keypress', function (e) {
    if (e.which === 13) {
      const query = $(this).val().trim();
      if (query) {
        searchProducts(query);
      }
    }
  });

  // Initialize cart display on page load
  updateCartDisplay();
});
