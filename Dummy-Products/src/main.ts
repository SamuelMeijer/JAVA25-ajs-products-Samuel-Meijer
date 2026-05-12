import { searchProduct } from "./modules/api";
import type { Product } from "./modules/types/product";
import "./style.css";

// ELEMENTS
const productsContainer = document.getElementById('productsContainer') as HTMLDivElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInput = searchForm.querySelector(
    "input[type='search']",
  ) as HTMLInputElement;
  const searchTerm: string = searchInput.value.trim();

  try {
    const products: Product[] = await searchProduct(searchTerm);
    console.log("prodcuts i main: ", products);

    if (products.length === 0) {
      const pElement = document.createElement("p");
      pElement.textContent = `No results found, please provide another searchterm`;
      productsContainer?.append(pElement);
    } else {
      // TODO: RENDER PRODUCTS!
      
    }

  } catch (error) {
    console.error(error);
    const pElement = document.createElement("p");
    pElement.textContent = `${error}`;
    productsContainer?.append(pElement);
  }
});
