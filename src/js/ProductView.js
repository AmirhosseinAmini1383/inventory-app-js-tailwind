import Storage from "./Storage.js";

const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.Products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    this.Products = Storage.getAllProducts();
    this.createProductsList(this.Products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "";
  }
  setApp() {
    this.Products = Storage.getAllProducts();
  }
  createProductsList(products) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => parseInt(c.id) === parseInt(item.category)
      );
      result += `
            <div
              class="flex items-center justify-between mb-2"
            >
            <span class="text-slate-400">${item.title}</span>
            <div class="flex items-center gap-x-3">
              <span class="text-slate-400">${new Date(
                item.createdAt
              ).toLocaleDateString("en", options)}</span>
              <span
                class="block px-3 py-0.5 text-slate-400 border border-slate-400 rounded-2xl text-sm"
                >${selectedCategory.title}</span
              >
              <span
                class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300"
                >${item.quantity}</span
              >
              <button
                class="border px-2 py-0.5 rounded-2xl border-red-400 text-red-400"
                data-id=${item.id}
              >
                delete
              </button>
            </div>
            </div>
    `;
    });
    const productsDom = document.querySelector("#products-list");
    productsDom.innerHTML = result;
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.Products.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value;
    this.Products = Storage.getAllProducts(value);
    this.createProductsList(this.Products);
  }
}
export default new ProductView();
