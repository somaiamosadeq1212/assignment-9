import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { FormControl, Select, MenuItem } from "@mui/material";

function SortProducts() {
  const { state, dispatch } = useContext(SettingsContext);

  return (
    <FormControl fullWidth size="small">
      {/* <InputLabel
        sx={{
        //   color: (theme) =>
        //     theme.palette.mode === "dark" ? "#093dea" : "#555",
        //   fontWeight: 500,
        }}
      >
        Sort By
      </InputLabel> */}

      <Select
        value={state.sort}
        label="Sort By"
        onChange={(e) =>
          dispatch({ type: "SET_SORT", payload: e.target.value })
        }
        sx={{
          borderRadius: "14px",
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,30,30,0.65)"
              : "rgba(255,255,255,0.65)",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#f5f5f5" : "#1a1a1a",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "& .MuiSvgIcon-root": {
            color: (theme) =>
              theme.palette.mode === "dark" ? "#d6d6d6" : "#555",
          },

          "&:hover": {
            transform: "translateY(-1px)",
          },

          transition: "all 0.3s ease",
        }}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-low">Price: Low to High</MenuItem>
        <MenuItem value="price-high">Price: High to Low</MenuItem>
        <MenuItem value="title">Title (A-Z)</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortProducts;
