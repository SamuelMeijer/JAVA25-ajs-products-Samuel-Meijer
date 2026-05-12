import {
  getCategoriesNames,
  getCategoryProducts,
  searchProduct,
} from "./modules/api";
import { renderProucts } from "./modules/renderProucts";
import type { Product } from "./modules/types/Product";
import "./style.css";

// ELEMENTS
const productsContainer = document.getElementById(
  "productsContainer",
) as HTMLDivElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const categorySelector = document.getElementById(
  "categorySelector",
) as HTMLSelectElement;

// TODO: Add error-msg as seperate function?
// TODO: Add animation or some other library.

// Fetching product categories and adding to drop-down
async function fillCategories() {
  try {
    const categories = await getCategoriesNames();

    categories.forEach((category) => {
      const newOption = document.createElement("option");
      newOption.setAttribute("value", category.path);
      newOption.textContent = category.name;
      categorySelector.append(newOption);
    });
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML = "";
    const pElement = document.createElement("p");
    pElement.textContent = `${error}`;
    productsContainer?.append(pElement);
  }
}
fillCategories();

// EVENTLISTENERS
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInput = searchForm.querySelector(
    "input[type='search']",
  ) as HTMLInputElement;
  const searchTerm: string = searchInput.value.trim();

  try {
    const products: Product[] = await searchProduct(searchTerm);

    if (products.length === 0) {
      productsContainer.innerHTML = "";
      const pElement = document.createElement("p");
      pElement.textContent = `No results found, please provide another searchterm`;
      productsContainer?.append(pElement);
    } else {
      renderProucts(products);
    }
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML = "";
    const pElement = document.createElement("p");
    pElement.textContent = `${error}`;
    productsContainer?.append(pElement);
  }
});

categorySelector.addEventListener("change", async (event) => {
  const selectedCategory = (event.target as HTMLSelectElement).value;

  try {
    const products: Product[] = await getCategoryProducts(selectedCategory);

    if (products.length === 0) {
      productsContainer.innerHTML = "";
      const pElement = document.createElement("p");
      pElement.textContent = `No results found, please provide another searchterm`;
      productsContainer?.append(pElement);
    } else {
      renderProucts(products);
    }
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML = "";
    const pElement = document.createElement("p");
    pElement.textContent = `${error}`;
    productsContainer?.append(pElement);
  }
});
