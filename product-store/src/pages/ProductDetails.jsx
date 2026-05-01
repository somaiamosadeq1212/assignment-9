import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const fetchProduct = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          p: 3,
          borderRadius: "20px",
          height: "100%",

          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,30,30,0.6)"
              : "rgba(255,255,255,0.6)",

          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",

          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.1)",

          color: (theme) =>
            theme.palette.mode === "dark" ? "#f5f5f5" : "#000",

          transition: "all 0.3s ease",
        }}
      >
        {/* IMAGE */}
        <CardMedia
          component="img"
          image={product.images?.[0]}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: 350 },
            height: 350,
            objectFit: "contain",
            borderRadius: "16px",
            p: 2,

            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.03)",
          }}
        />

        {/* CONTENT */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
            }}
          >
            {product.title}
          </Typography>

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 20,
              background: "linear-gradient(45deg, #42a5f5, #7e57c2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            ${product.price}
          </Typography>

          <Typography
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#d6d6d6" : "#555",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {product.description}
          </Typography>

          <Button
            variant="contained"
            onClick={() => dispatch(addToCart(product))}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontWeight: "bold",

              background: "linear-gradient(45deg, #42a5f5, #7e57c2)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",

              "&:hover": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default ProductDetails;

