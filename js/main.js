import productSuccessRender from "../features/product.js";
import catigoriesSuccessRender from "../features/catigories.js";
import handelRemoterequest, { getManyRequests } from "../shaers/api.js";
import {
  loadingElement,
  errorElement,
  mainElement,
  catigoriesContainer,
  itemsElement
} from '../shaers/ui/dom-element.js'
import CartManager from "../features/cart/cartManager.js";
import SideBar from "../features/sideBar.js";
const defaultCategory = 'smartphones';

const requestConfig = [
  {
    endpoint: 'products/categories',
    success: (data) => catigoriesSuccessRender(data)

  },
  {
    endpoint: `products/category/${defaultCategory}`,
    success: (data) => productSuccessRender(data)
  },

];
getManyRequests(
  {
    startLoading: () => {
      loadingElement.removeClass('d-none');
      loadingElement.addClass('d-flex');
    },
    error: (err) => {
      errorElement.removeClass('d-none');
      errorElement.addClass('d-flex');
      mainElement.removeClass('row');
      mainElement.addClass('d-none');
    },
    stopLoading: () => {
      loadingElement.removeClass('d-flex');
      loadingElement.addClass('d-none');
    }
  },
  requestConfig
).then(() => getDataByCatigories());

function getDataByCatigories() {
  catigoriesContainer.children().on("click", (event) => {
    const endpointTarget = event.target.id;
    handelRemoterequest(
      `products/category/${endpointTarget}`,
      (data) => productSuccessRender(data),
      (err) => {
        itemsElement.html(
          `     <div class="d-flex vh-100 justify-content-center align-items-center" id="error">
      <div class="alert alert-danger" role="alert">
        An error occurred.
      </div>
    </div>`
        );
      },
      () => {
        itemsElement.html(
          `   <div class=" d-flex vh-100 justify-content-center align-items-center gap-2">
      <i class="fa-solid fa-spinner fa-spin"></i> Loading
    </div>`
        );
      },
    );
  });
}

const cartManager=new CartManager();
const sidebar=new SideBar();