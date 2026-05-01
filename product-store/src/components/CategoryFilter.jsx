import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/api";

function CategoryFilter() {
  const { state, dispatch } = useContext(SettingsContext);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <Select
      fullWidth
      size="small"
      value={state.category}
      onChange={(e) =>
        dispatch({ type: "SET_CATEGORY", payload: e.target.value })
      }
      sx={{
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

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      <MenuItem value="all">All</MenuItem>

      {isLoading ? (
        <MenuItem disabled>Loading...</MenuItem>
      ) : (
        categories.map((cat) => (
          <MenuItem key={cat.slug} value={cat.slug}>
            {cat.name}
          </MenuItem>
        ))
      )}
    </Select>
  );
}

export default CategoryFilter;