import Storage from "./Storage.js";
const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
export default class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.Categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = title.value;
    const description = description.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.Categories = Storage.getAllCategories();
  }
}
