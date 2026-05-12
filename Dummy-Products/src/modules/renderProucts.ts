import { type Product } from "./types/product";
import { __Product_type_marker } from "./types/product";

export function renderProucts(searchResultsArr: Product[]) {
  const productsContainer = document.getElementById(
    "productsContainer",
  ) as HTMLDivElement;

  // Emptying previously shown products
  productsContainer.innerHTML = "";

  searchResultsArr.forEach((product) => {
    const newProductCard = document.createElement("div");
    newProductCard.classList.add("productCard");

    newProductCard.innerHTML = `
            <h3>${product.title}</h3>
            <image src="${product.images[0]}" alt="Product Image" />
            <p>Price: ${product.price} Kr</p>
            <p>Rating: ${product.rating}</p>
            <p>${product.availabilityStatus}</p>
        `;
    productsContainer.append(newProductCard);
  });
}
