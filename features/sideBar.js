import { closeSide, sidebar } from "../shaers/ui/dom-element.js";

export default class SideBar {
    constructor() {
        this.#handleToggleSidebar();
    }

    #handleToggleSidebar = () => {
        // Close sidebar
        closeSide.on("click", () => {
            sidebar.removeClass("show").addClass("hide");
        });

        // Open sidebar
        $("#toggleSidebar").on("click", () => {
            sidebar.toggleClass("show");
        });
    }
}
