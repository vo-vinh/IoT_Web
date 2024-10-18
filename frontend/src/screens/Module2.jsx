import { Box, Button, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import io from "socket.io-client";
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
  const [logs, setLogs] = useState([]);

  const pushLog = (log) => {
    setLogs((prevLogs) => [log, ...prevLogs]);
  };

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

  useEffect(() => {
    const socket = io("http://localhost:8080");

    const updateLog = (type) => (value) => {
      setData((prevData) => ({ ...prevData, [type]: value }));
      pushLog({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        time: new Date().toLocaleTimeString(),
        value: `${value}${type === "temp" ? " °C" : type === "humid" ? "%" : type === "light" ? " lux" : "%"}`,
      });
    };

    socket.on("tempUpdate", ({ temp }) => updateLog("temp")(temp));
    socket.on("humidUpdate", ({ humid }) => updateLog("humid")(humid));
    socket.on("lightUpdate", ({ light }) => updateLog("light")(light));
    socket.on("soilMoistureUpdate", ({ soilMoisture }) => updateLog("soilMoisture")(soilMoisture));

    return () => {
      socket.disconnect();
    };
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
              variant="h5" 
              fontWeight="600" 
              color={colors.grey[100]}
            >
              Line chart
            </Typography>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
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
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => setLogs([])}
            >
              Clear Logs
            </Button>
          </Box>

          {logs.map((log, i) => (
            <Box 
              key={i} 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              borderBottom={`4px solid ${colors.primary[500]}`} 
              p="15px"
            >
              <Box 
                sx={{ width: "30%" }}
              >
                <Typography 
                  color={colors.greenAccent[500]} 
                  variant="h5" 
                  fontWeight="600"
                >
                  {log.title}
                </Typography>
              </Box>
              <Box 
                color={colors.grey[100]} 
                sx={{ width: "30%" }}
              >
                {log.time}
              </Box>
              <Box 
                sx={{ width: "40%", display: "flex", justifyContent: "flex-end" }}
              >
                <Box 
                  backgroundColor={colors.greenAccent[500]} 
                  p="5px 10px" 
                  borderRadius="4px" 
                  width="fit-content"
                >
                  {log.value}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Module2;
