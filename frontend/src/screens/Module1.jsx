import { Box, Button, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";
import io from "socket.io-client";
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
  const [logs, setLogs] = useState([]);

  const pushLog = (log) => {
    setLogs((prevLogs) => [log, ...prevLogs]);
  };

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

  useEffect(() => {
    const socket = io("http://localhost:8080");

    const updateLog = (type) => (value) => {
      setData((prevData) => ({ ...prevData, [type]: value }));
      pushLog({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        time: new Date().toLocaleTimeString(),
        value: `${value}${type === "temperature" ? " °C" : type === "humidity" ? "%" : " mg/kg"}`,
      });
    };

    socket.on("tempUpdate", ({ temp }) => updateLog("temperature")(temp));
    socket.on("humidUpdate", ({ humid }) => updateLog("humidity")(humid));
    socket.on("phUpdate", ({ ph }) => updateLog("ph")(ph));
    socket.on("nitrogenUpdate", ({ nitrogen }) => updateLog("nitrogen")(nitrogen));
    socket.on("phosphorusUpdate", ({ phosphorus }) => updateLog("phosphorus")(phosphorus));
    socket.on("potassiumUpdate", ({ potassium }) => updateLog("potassium")(potassium));

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

export default Module1;
