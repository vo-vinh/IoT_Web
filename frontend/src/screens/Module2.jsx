import { Box, Button, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureThreeQuarters, faDroplet, faSun, faWater } from "@fortawesome/free-solid-svg-icons";
import { mockDataModule2 } from "../services/mockData";

const Module2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    temp: "0",
    humid: "0",
    light: "0",
    soilMoisture: "0", 
  });
 
  const [loading, setLoading] = useState(true);
  const [setLogs] = useState([]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockDataModule2);
      setLoading(false);
    }, 1000); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {[
          { key: "temp", icon: faTemperatureThreeQuarters, label: "Temperature" },
          { key: "humid", icon: faDroplet, label: "Humidity" },
          { key: "light", icon: faSun, label: "Light" },
          { key: "soilMoisture", icon: faWater, label: "Soil Moisture" },
        ].map(({ key, icon, label }) => (
          <Box
            key={key}
            gridColumn={{ xs: "span 12", sm: "span 6", md: "span 3" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection="column"
          >
            <h1 
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "0.5em" }}>
                <FontAwesomeIcon icon={icon} />
              </span>
              {label}
            </h1>
            {loading ? (
              <CircularProgress 
                color="secondary" 
                size={24} 
              />
            ) : (
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                color={colors.greenAccent[500]}
              >
                {data[key]} {key === "temp" ? "°C" : key === "humid" ? "%" : key === "light" ? " lux" : "%"}
              </Typography>
            )}
          </Box>
        ))}

        <Box 
          gridColumn="span 8" 
          gridRow="span 3" 
          backgroundColor={colors.primary[400]}
        >
          <Box 
            mt="25px" 
            p="0 30px" 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Typography 
              variant="h3" 
              fontWeight="600" 
              color={colors.grey[100]}
            >
              Line chart
            </Typography>
          </Box>
          <Box 
            height="400px" 
            m="-20px 0 0 0"
          >
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box 
          gridColumn="span 4" 
          gridRow="span 2" 
          backgroundColor={colors.primary[400]} 
          overflow="auto"
        >
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            borderBottom={`4px solid ${colors.primary[500]}`} 
            p="15px"
          >
            <Typography 
              color={colors.grey[100]} 
              variant="h5" 
              fontWeight="600"
            >
              Recent Logs
            </Typography>
            <Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setLogs([])}
                >
                  Download Logs
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => setLogs([])}
                >
                  Clear Logs
                </Button>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Module2;
