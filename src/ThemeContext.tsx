import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode; // Defineix el tipus de children com ReactNode
}

// Crea el context
const ThemeContext = createContext({
    darkMode: false,         // Valor predeterminat de darkMode
    toggleTheme: () => {}    // Funció predeterminada de toggleTheme (sense efecte)
});

// Crea un custom hook per utilitzar el context
export const useTheme = () => useContext(ThemeContext);

// Proveïdor del tema
export const ThemeProvider = ({ children } : ThemeProviderProps) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <div className={`page ${darkMode ? "dark-theme" : ""}`} >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};