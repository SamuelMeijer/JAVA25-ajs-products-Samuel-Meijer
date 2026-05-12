import { type Product } from "./types/Product";
import { __Product_type_marker } from "./types/Product";

export async function searchProduct(searchTerm: string): Promise<Product[]> {
  const url: string = `https://dummyjson.com/products/search?q=${searchTerm}`;

  const resp = await fetch(url);

  if (resp.ok) {
    const data = await resp.json();

    const products: Product[] = data.products.map(
      ({ title, images, price, rating, availabilityStatus }: Product) => ({
        title,
        images,
        price,
        rating,
        availabilityStatus,
      }),
    );

    return products;
  } else {
    if (resp.status === 404) throw new Error("Error: No product found");
    else
      throw new Error(
        "Something went wrong when fetching products from the server, please try again later",
      );
  }
}

export async function getCategoriesNames(): Promise<
  { path: string; name: string }[]
> {
  const url: string = "https://dummyjson.com/products/categories";

  const resp = await fetch(url);

  if (resp.ok) {
    const data: { slug: string; name: string; url: string }[] =
      await resp.json();

    const categories: { path: string; name: string }[] = data.map(
      ({ slug, name }) => ({ path: slug, name }),
    );

    return categories;
  } else {
    throw new Error(
      "Something went wrong when fetching categories from the server, please try again later",
    );
  }
}

export async function getCategoryProducts(
  selectedCategory: string,
): Promise<Product[]> {
  const url: string = `https://dummyjson.com/products/category/${selectedCategory}`;

  const resp = await fetch(url);

  if (resp.ok) {
    const data = await resp.json();

    const products: Product[] = data.products.map(
      ({ title, images, price, rating, availabilityStatus }: Product) => ({
        title,
        images,
        price,
        rating,
        availabilityStatus,
      }),
    );

    return products;
  } else {
    if (resp.status === 404) throw new Error("Error: No product found");
    else
      throw new Error(
        "Something went wrong when fetching products from the server, please try again later",
      );
  }
}
