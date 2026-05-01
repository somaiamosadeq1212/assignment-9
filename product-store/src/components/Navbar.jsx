import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Button,
  Switch,
  Box
} from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const { state, dispatch } = useContext(SettingsContext);

  return (
    <AppBar
      position="static"
      sx={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(20,20,20,0.75)"
            : "rgba(255,255,255,0.75)",
        borderBottom: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        color: (theme) =>
          theme.palette.mode === "dark" ? "#f5f5f5" : "#1a1a1a",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* LEFT */}
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: "18px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Product Store
          </Link>
        </Typography>

        {/* CENTER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            checked={state.darkMode}
            onChange={() =>
              dispatch({ type: "TOGGLE_DARK" })
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#7e57c2",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#7e57c2",
              },
            }}
          />

          <Button
            onClick={() =>
              dispatch({ type: "SET_VIEW", payload: "grid" })
            }
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 0.8,
              background:
                state.view === "grid"
                  ? "linear-gradient(45deg, #42a5f5, #7e57c2)"
                  : "transparent",
              color: state.view === "grid" ? "#fff" : "inherit",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                state.view === "grid"
                  ? "0 6px 20px rgba(66,165,245,0.3)"
                  : "none",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Grid
          </Button>

          <Button
            onClick={() =>
              dispatch({ type: "SET_VIEW", payload: "list" })
            }
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 0.8,
              background:
                state.view === "list"
                  ? "linear-gradient(45deg, #42a5f5, #7e57c2)"
                  : "transparent",
              color: state.view === "list" ? "#fff" : "inherit",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                state.view === "list"
                  ? "0 6px 20px rgba(126,87,194,0.3)"
                  : "none",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            List
          </Button>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/cart" style={{ color: "inherit" }}>
            <Badge
              badgeContent={cartCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  background:
                    "linear-gradient(45deg, #ef5350, #d32f2f)",
                  color: "#fff",
                },
              }}
            >
              <Icons.ShoppingCart />
            </Badge>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;