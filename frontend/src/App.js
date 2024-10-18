import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Module1 from "./screens/Module1";
import Module2 from "./screens/Module2";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/module1" element={<Module1 />} /> 
              <Route path="/module2" element={<Module2 />} /> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
