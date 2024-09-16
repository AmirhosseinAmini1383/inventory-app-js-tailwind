import Storage from "./Storage.js";
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.Categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.Categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
  }
  setApp() {
    this.Categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">select a category</option>;`;
    this.Categories.forEach((item) => {
      result += `
        <option class="bg-slate-500 text-slate-300" value=${item.id}>
            ${item.title}        
        </option>;
        `;
    });
    const categoriesOptions = document.querySelector("#product-category");
    categoriesOptions.innerHTML = result;
  }
}
export default new CategoryView();
