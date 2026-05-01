// import { createContext, useReducer, useContext } from "react";

// const ThemeContext = createContext();

// const initialState = {
//   darkMode: false,
// };

// function themeReducer(state, action) {
//   switch (action.type) {
//     case "TOGGLE_THEME":
//       return {
//         ...state,
//         darkMode: !state.darkMode,
//       };
//     default:
//       return state;
//   }
// }

// export function ThemeProvider({ children }) {
//   const [state, dispatch] = useReducer(themeReducer, initialState);

//   return (
//     <ThemeContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }