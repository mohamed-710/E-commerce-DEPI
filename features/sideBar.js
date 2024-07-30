import { closeSide, openSide, sidebar } from "../shaers/ui/dom-element.js";

export default class SideBar {
  constructor() {
    this.#handleToggleSidebar();
  }

  #handleToggleSidebar = () => {
    openSide.on("click", () => {
      sidebar.addClass('show'); // Add class to show the sidebar
    });
    // Close sidebar
    closeSide.on("click", () => {
      sidebar.removeClass('show'); // Remove class to hide the sidebar
    });
  }
}