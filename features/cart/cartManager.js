import { 
  cartBtn,
  cartCloseBtn,
  clearCartBtn,
  cartDom,
  cartContent,
  itemsElement,
  numOfItems,
} from "../../shaers/ui/dom-element.js";
import CartItem from "./cartItem.js";

export default class CartManager {
  static localStorageKey = "cartItems";

  constructor() {
    let localStorageSavedItems;
    try {
      localStorageSavedItems = JSON.parse(localStorage.getItem(CartManager.localStorageKey)) || [];
    } catch (error) {
      localStorageSavedItems = [];
      console.error('Error parsing JSON from localStorage:', error);
    }
    this.cartItems = localStorageSavedItems.map((item) => CartItem.formToCartItemInstance(item));
    this.#handleToggleCart();
    this.#addProductToCart();
    this.#handleRender();
    this.#updateCartItem();
    this.#clearCart(); // Added this call to initialize the clear button functionality
  }

  #handleToggleCart = () => {
    cartBtn.on("click", () => {
      cartDom.css("visibility", "visible").addClass("showCart");
    });
    cartCloseBtn.on("click", () => {
      cartDom.css("visibility", "hidden").removeClass("showCart");
    });
  };

  #handleRender = () => {
    if (this.cartItems.length === 0) {
      cartContent.html(`
        <div class="h-100 d-flex justify-content-center align-items-center">
          <p>There's no items yet!</p>
        </div>
      `);    
    } else {
     const allCartItem = this.cartItems.map((item) => item.renderElement()).join("");
      const totalAmount = this.#calculateTotal();
      cartContent.html(`
        ${allCartItem}
        <div class="cart-footer">
          <h3>Total: $ <span class="cart-total">${totalAmount}</span></h3>
          <button type="button" class="btn btn-danger clear-cart" data-action="clear">Clear Cart</button>
        </div>
      `);
    }
    this.#updateItemCount();
  };

  #addProductToCart = () => {
    itemsElement.on("click", (event) => {
      if ($(event.target).attr("data-product")) {
        const { id, title, image, price, stock, quantity } = JSON.parse($(event.target).attr('data-product'));
        const existingItem = this.cartItems.find((item) => item.id === id);
        if (existingItem) {
          existingItem.increase();
        } else {
          const cartItem = new CartItem(id, title, image, price, stock, quantity);
          this.cartItems.push(cartItem);
        }
        this.#updateLocalStorage();
        this.#handleRender();
      }
    });
  };

  #updateItemCount = () => {
    numOfItems.text(this.cartItems.length); 
  };

  #updateLocalStorage = () => {
    localStorage.setItem(
      CartManager.localStorageKey,
      JSON.stringify(this.cartItems)
    );
  };

  #updateCartItem = () => {
    cartContent.on("click", (event) => {
      const action = $(event.target).data("action");
      const id = $(event.target).data("id");

      if (action === "remove") {
        this.cartItems = this.cartItems.filter((item) => item.id !== id);
      } else if (action === "increase") {
        const item = this.cartItems.find((item) => item.id === id);
        if (item) {
          item.increase();
        }
      } else if (action === "decrease") {
        const item = this.cartItems.find((item) => item.id === id);
        if (item) {
          item.decrease();
          if (item.getQuantity() === 0) {
            this.cartItems = this.cartItems.filter((item) => item.id !== id);
          }
        }
      } else if (action === "clear") {
        this.cartItems = []; // Clear all items from the cart
      }

      this.#updateLocalStorage();
      this.#handleRender();
    });
  };

  #clearCart = () => {
    clearCartBtn.on("click", () => {
      this.cartItems = []; // Clear all items from the cart
      this.#updateLocalStorage();
      this.#handleRender();
    });
  };

  #calculateTotal = () => {
    return this.cartItems.reduce((total, item) => total + item.getTotal(), 0).toFixed(2);
  };
}
