import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { state } = useContext(SettingsContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5">
          Cart is empty 🛒
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>

      {/* HEADER */}
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Typography sx={{ mb: 2, opacity: 0.8 }}>
        Items: {totalItems} | Total: ${totalPrice.toFixed(2)}
      </Typography>

      {/* CLEAR CART */}
      <Button
        variant="contained"

        sx={{
          mb: 3,
          backgroundColor: "#d32f2f",
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        }}
        onClick={() => dispatch(clearCart())}

      >
        Clear Cart
      </Button>

      {/* ITEMS */}
      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            mb: 2,
            borderRadius: "20px",
            backdropFilter: "blur(10px)",

            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(30,30,30,0.65)"
                : "rgba(255,255,255,0.65)",

            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",

            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
          }}
        >
          <CardContent>

            {/* TITLE */}
            <Typography variant="h6" sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
              fontWeight: 500,
            }}>
              {item.title}
            </Typography>

            {/* PRICE */}
            <Typography
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                fontWeight: 500,
              }}
            >
              Price: ${item.price}
            </Typography>

            {/* QUANTITY CONTROLS */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >

              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "10px",
                  minWidth: 35,
                  borderColor: "rgba(0,0,0,0.15)",
                }}
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </Button>

              <Typography sx={{ fontWeight: "bold" }}>
                {item.quantity}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 35,
                  color: state.darkMode ? "#fff" : "#1976d2",
                  borderColor: state.darkMode ? "#555" : "#1976d2",
                }}
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </Button>

            </Box>

            {/* REMOVE BUTTON */}
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2,
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>

          </CardContent>
        </Card>
      ))}

    </Container>
  );
}

export default Cart;