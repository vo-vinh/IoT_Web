import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Module1 from "./screens/Module1";
import { axiosPrivate } from "./hooks/axios";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({});

  useEffect(() => {
    axiosPrivate.get("/module")
      .then(res => {
        var result = res.data.map((mod) => ({...mod, isOpen: false, }));
        setModules(result);
        if (res.data?.length > 0) {
          setSelectedModule(result[0]);
        }
      })
      .catch(err => {
        alert("something went wrong");
      });
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} module_lst={modules} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/:id" element={<Module1 />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
