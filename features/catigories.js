import { mainElement,catigoriesContainer } from "../shaers/ui/dom-element.js";

const catigoriesSuccessRender=function(data)
{
  mainElement.removeClass('d-none');
  mainElement.addClass('row');
  catigoriesContainer.html(
    data.map((item,index) =>
         `<li class="py-2 fs-5 px-1" id ="${item.slug}">${item.name}</li>`)
    .join('')
  );
}

export default catigoriesSuccessRender;