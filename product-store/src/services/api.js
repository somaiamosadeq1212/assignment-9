import axios from "axios";

// export const fetchProducts = async ({ pageParam = 0 }) => {
//   const limit = 6;

//   const res = await axios.get(
//     `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`
//   );

//   return {
//     data: res.data.products ?? [],
//     nextPage:
//       pageParam + limit < res.data.total ? pageParam + limit : undefined,
//   };
// };

export const fetchProducts = async ({ pageParam = 0, category }) => {
  const limit = 6;

  const url =
    category && category !== "all"
      ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${pageParam}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`;

  const res = await axios.get(url);

  return {
    data: res.data.products ?? [],
    nextPage:
      pageParam + limit < res.data.total
        ? pageParam + limit
        : undefined,
  };
};

export const fetchCategories = async () => {
  const res = await axios.get(
    "https://dummyjson.com/products/categories"
  );

  return (res.data || []).map((cat) => {
    // if string 
    if (typeof cat === "string") {
      return {
        slug: cat,
        name: cat,
      };
    }

    // if object 
    return {
      slug: cat.slug,
      name: cat.name,
    };
  });
};
