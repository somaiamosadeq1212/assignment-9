import { createContext, useReducer } from "react";

export const SettingsContext = createContext();

const initialState = {
  darkMode: false,
  view: "grid",
  category: "all",
  search: "",
  sort: "default",
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };

    case "SET_VIEW":
      return { ...state, view: action.payload };

    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_SORT":
      return { ...state, sort: action.payload };

    default:
      return state;
  }
}

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}