export default class CartItem {
  constructor(id, title, image, price, stock, quantity = 1, description) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.quantity = quantity;
    this.description = description;
  }

  increase = function() {
    if (this.quantity < this.stock) {
      this.quantity += 1;
    }
  };
  decrease = function() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  };

  getQuantity = function() {
    return this.quantity;
  };

  getTotal = function() {
    return this.quantity * this.price;
  };

  renderElement = function() {
    return `
        <div class="cart-item">
          <img src="${this.image}" alt="product">
          <div>
            <h4>${this.title}</h4>
            <h5>${this.getTotal()}</h5>
            <span class="remove-item" data-action="remove" data-id="${this.id}">remove</span>
          </div>
          <div>
            <i class="fas fa-chevron-up increase-quantity " data-action="increase" data-id="${this.id}"></i>
            <p class="item-amount" data-id="quantity">${this.getQuantity()}</p>
            <i class="fas fa-chevron-down decrease-quantity" data-action="decrease" data-id="${this.id}"></i>
          </div>
        </div>
    
    `;
  };

  static formToCartItemInstance = function({
    id,
    title,
    image,
    price,
    stock,
    quantity
  }) {
    return new CartItem(id, title, image, price, stock, quantity);
  };
}
