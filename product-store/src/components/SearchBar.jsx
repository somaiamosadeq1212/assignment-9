import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function SearchBar() {
  const { state, dispatch } = useContext(SettingsContext);
  const handleChange = (e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  const handleClear = () => {
    dispatch({ type: "SET_SEARCH", payload: "" });
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search products..."
      value={state.search}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backdropFilter: "blur(12px)",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(30,30,30,0.6)"
              : "rgba(255,255,255,0.6)",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#fff" : "#000",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",

          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          "& fieldset": {
            border: "none",
          },
        },
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        endAdornment: state.search && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              ❌
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;