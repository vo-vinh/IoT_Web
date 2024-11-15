import { Box, Button, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureThreeQuarters, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { mockData } from "../services/mockData";

const Module1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({
    temperature: "0",
    humidity: "0",
    conductivity: "0",
    ph: "0",
    nitrogen: "0",
    phosphorus: "0",
    potassium: "0",
  });

  const [loading, setLoading] = useState(true);
  const [setLogs] = useState([]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
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
          { key: "temperature", icon: faTemperatureThreeQuarters, label: "Temperature" },
          { key: "humidity", icon: faDroplet, label: "Humidity" },
          { key: "ph", label: "pH" },
          { key: "conductivity", label: "Conductivity" },
          { key: "nitrogen", label: "Nitrogen" },
          { key: "phosphorus", label: "Phosphorus" },
          { key: "potassium", label: "Potassium" },
        ].map(({ key, icon, label }, index) => (
          <Box
            key={key}
            gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection="column"
          >
            <h1 
              style={{ display: "flex", alignItems: "center" }}
            >
              {icon && 
                <span 
                  style={{ marginRight: "0.5em" }}><FontAwesomeIcon icon={icon} />
                </span>
              }
              {label}
            </h1>
            {loading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                color={colors.greenAccent[500]}
              >
                {data[key]} {key === "temperature" ? "°C" : key === "humidity" ? "%" : " mg/kg"}
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
            p="0 20px" 
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
              variant="h3" 
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

export default Module1;
