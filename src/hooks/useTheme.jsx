import { useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  return { theme, setTheme };
};

export default useTheme;
