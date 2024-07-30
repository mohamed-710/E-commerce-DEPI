import { itemsElement } from "../shaers/ui/dom-element.js";

const productSuccessRender = function(data) {
  itemsElement.html(data.products.map((item, index) => {
    return `<div class="col-12 col-sm-6 col-md-4">
              <div class="mb-2 card shadow rounded-3 p-3 gap-3">
                <div class="container-img clickable-img"> 
                  <img src="${item.images[0]}" alt="image" class="product-img" data-product='${JSON.stringify(item)}'>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="d-flex gap-3 align-items-center">
                  <span>⭐</span>
                  <div class="px-2 bg-danger bg-opacity-25 rounded-2">${item.rating}</div>
                </div>
                <div class="d-flex justify-content-between">
                  <h3>$${item.price}</h3>
                  <button class="btn btn-danger mb-3 addToCartBtn" data-product='${JSON.stringify({
                    id: item.id,
                    title: item.title,
                    image: item.images[0],
                    price: item.price,
                    stock: item.stock,
                  })}'>Add To Cart</button>
                </div>
              </div>
            </div>`;
  }).join(''));

  document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', (event) => {
      const product = JSON.parse(event.currentTarget.getAttribute('data-product'));
      localStorage.setItem('productDetails', JSON.stringify(product));
      window.location.href = 'product-details.html';
    });
  });
}

export default productSuccessRender;
