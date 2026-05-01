// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetchProducts } from "../services/api";
// import ProductCard from "../components/ProductCard";
// import { Grid, Container, Box, Skeleton } from "@mui/material";
// import { useContext, useRef, useEffect } from "react";
// import { SettingsContext } from "../context/SettingsContext";
// import SearchBar from "../components/SearchBar";
// import CategoryFilter from "../components/CategoryFilter";
// import SortProducts from "../components/SortProducts";

// function Home() {
//   const { state } = useContext(SettingsContext);

//   const {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["products", state.category],
//     queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam }),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allPages) => {
//       if (!lastPage) return undefined;
//       return lastPage?.nextPage ?? undefined;
//     },
//   });

//   const allProducts =
//     data?.pages?.flatMap((page) =>
//       Array.isArray(page?.data) ? page.data : []
//     ) || [];

//   //  filter 
//   const filteredProducts = allProducts.filter((product) => {
//     const matchCategory =
//       state.category === "all" ||
//       product.category === state.category;

//     const searchText = state.search.trim().toLowerCase();

//     const matchSearch =
//       product.title?.toLowerCase().includes(searchText);

//     return matchCategory && matchSearch;
//   });

//   // sort
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (state.sort) {
//       case "price-low":
//         return a.price - b.price;

//       case "price-high":
//         return b.price - a.price;

//       case "title":
//         return a.title.localeCompare(b.title);

//       default:
//         return 0;
//     }
//   });

//   const observerRef = useRef(null);
//   useEffect(() => {
//     if (!observerRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries?.[0]?.isIntersecting && hasNextPage === true) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [hasNextPage, fetchNextPage]);

//   if (isLoading) {
//     return (
//       <Container sx={{ mt: 3 }}>
//         <Grid container spacing={3}>
//           {Array.from(new Array(8)).map((_, index) => (
//             <Grid
//               item
//               xs={12}
//               sm={state.view === "list" ? 12 : 6}
//               md={state.view === "list" ? 12 : 4}
//               lg={state.view === "list" ? 12 : 3}
//               key={index}
//             >
//               <Box>
//                 <Skeleton variant="rectangular" height={200} />
//                 <Skeleton height={30} sx={{ mt: 1 }} />
//                 <Skeleton width="60%" />
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     );
//   }

//   if (isError) return <p>Error fetching products</p>;

//   return (
//     <Container style={{ padding: "20px" }}>
//       {/* Search + Filter */}
//       <Box
//         sx={{
//           mb: 3,
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <Box sx={{ flex: 1, minWidth: 200 }}>
//           <SearchBar />
//         </Box>

//         <Box sx={{ minWidth: 180 }}>
//           <CategoryFilter />
//         </Box>

//         <Box sx={{ minWidth: 180 }}>
//           <SortProducts />
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         {sortedProducts.map((product) => (
//           <Grid
//             item
//             xs={12}
//             md={state.view === "list" ? 12 : 4}
//             lg={state.view === "list" ? 12 : 3}
//             key={product.id}
//           >
//             <ProductCard product={product} />
//           </Grid>
//         ))}
//       </Grid>

//       {isFetchingNextPage && (
//         <p style={{ textAlign: "center", marginTop: "20px" }}>
//           Loading more products...
//         </p>
//       )}
//       <div ref={observerRef} style={{ height: 20 }} />
//     </Container>
//   );
// }

// export default Home;


import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Box, Skeleton } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortProducts from "../components/SortProducts";

function Home() {
  const { state } = useContext(SettingsContext);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", state.category],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts({ pageParam, category: state.category }), // ✅ category پاس شد
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage?.nextPage ?? undefined;
    },
  });

  const allProducts =
    data?.pages?.flatMap((page) =>
      Array.isArray(page?.data) ? page.data : []
    ) || [];

  // filter
  const filteredProducts = allProducts.filter((product) => {
    const matchCategory =
      state.category === "all" ||
      product.category?.toLowerCase() === state.category?.toLowerCase(); // ✅ fix

    const searchText = state.search.trim().toLowerCase();

    const matchSearch =
      product.title?.toLowerCase().includes(searchText);

    return matchCategory && matchSearch;
    
  });

  // sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (state.sort) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "title":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

  const observerRef = useRef(null);

  // ✅ reset scroll وقتی category عوض میشه
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.category]);

  // ✅ observer fix + dependency
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [hasNextPage, fetchNextPage, state.category]); // ✅ این مهمه

  if (isLoading) {
    return (
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={state.view === "list" ? 12 : 6}
              md={state.view === "list" ? 12 : 4}
              lg={state.view === "list" ? 12 : 3}
              key={index}
            >
              <Box>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton height={30} sx={{ mt: 1 }} />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (isError) return <p>Error fetching products</p>;

  return (
    <Container style={{ padding: "20px" }}>
      {/* Search + Filter */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <SearchBar />
        </Box>

        <Box sx={{ minWidth: 180 }}>
          <CategoryFilter />
          
        </Box>

        <Box sx={{ minWidth: 180 }}>
          <SortProducts />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {sortedProducts.map((product) => (
          <Grid
            item
            xs={12}
            md={state.view === "list" ? 12 : 4}
            lg={state.view === "list" ? 12 : 3}
            key={product.id}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {isFetchingNextPage && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Loading more products...
        </p>
      )}
      <div ref={observerRef} style={{ height: 20 }} />
    </Container>
  );
}

export default Home;