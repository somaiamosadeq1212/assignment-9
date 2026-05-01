import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { state } = useContext(SettingsContext);
  const isList = state.view === "list";

  return (
    <Card
      component={Link}
      to={`/product/${product.id}`}
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: isList ? "row" : "column",
        alignItems: isList ? "center" : "stretch",
        borderRadius: "20px",
        height: "100%",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: state.darkMode
          ? "rgba(30, 30, 30, 0.6)"
          : "rgba(255, 255, 255, 0.6)",
        border: state.darkMode
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)",
        boxShadow: state.darkMode
          ? "0 8px 32px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.1)",
        color: state.darkMode ? "#f5f5f5" : "#000",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: state.darkMode
            ? "0 12px 40px rgba(0,0,0,0.7)"
            : "0 12px 40px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        image={product.images?.[0]}
        alt={product.title}
        sx={{
          width: isList ? 140 : "100%",
          height: isList ? 140 : 200,
          objectFit: "contain",
          p: 2,
          flexShrink: 0,
          borderRadius: "16px",
          background: state.darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.03)",
        }}
      />

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: isList ? "space-between" : "flex-start",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            color: state.darkMode ? "#ffffff" : "#1a1a1a",
            mb: 1,
            fontWeight: 600,
          }}
        >
          {product.title.length > 60
            ? product.title.slice(0, 60) + "..."
            : product.title}
        </Typography>

        {/* PRICE */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #42a5f5, #7e57c2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: isList ? 0 : 2,
          }}
        >
          ${product.price}
        </Typography>

        {/* BUTTON */}
        <Box sx={{ mt: isList ? 0 : 1 }}>
          <Button
            fullWidth={!isList}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));

              toast.success("Added to cart 🛒");
            }}
            sx={{
              borderRadius: "12px",
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
      </CardContent>
    </Card>
  );
}

export default ProductCard;