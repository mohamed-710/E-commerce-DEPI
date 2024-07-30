import { details } from "../shaers/ui/dom-element.js";

const productDetails = JSON.parse(localStorage.getItem('productDetails'));

if (productDetails) {
  details.html(
    `<div class="d-flex flex-column h-100 align-items-center" id="product-container">
       <div class="container my-5">
       <button class="back-button" onclick="history.back()">&#8592; Home</button>
         <section>
           <div class="card rounded mb-4">
             <div class="row">
               <div class="col-md-6">
                 <img class="img-fluid rounded rounded-left" src="${productDetails.images[0]}" alt="project image">
               </div>
               <div class="col-md-6 p-5 align-self-center">
                 <h5 class="font-weight-normal mb-3">${productDetails.title}</h5>
                 <p class="text-muted">${productDetails.description}</p>
                 <ul class="list-unstyled font-small mt-5 mb-0">
                   <li>
                     <p class="text-uppercase mb-2"><strong>Stock</strong></p>
                     <p class="text-muted mb-4">${productDetails.stock}</p>
                   </li>
                   <li>
                     <p class="text-uppercase mb-2"><strong>Category</strong></p>
                     <p class="text-muted mb-4">${productDetails.category}</p>
                   </li>
                   <li>
                     <p class="text-uppercase mb-2"><strong>Brand</strong></p>
                     <p class="text-muted mb-4">${productDetails.brand}</p>
                   </li>
                   <li>
                     <p class="text-uppercase mb-2"><strong>Price</strong></p>
                     <a>$ ${productDetails.price}</a>
                   </li>
                 </ul>
               </div>
             </div>
           </div>
         </section>
       </div>
     </div>`
  );
} else {
  details.html('<p>Product details not found.</p>');
}
