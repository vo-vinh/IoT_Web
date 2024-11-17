import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import { useState, useEffect, useRef, useCallback } from "react";
import SensorBox from "../components/SensorBox";
import { useLocation } from "react-router-dom";
import {axiosPrivate, wsUrl} from "../hooks/axios";
import sensorMapping from "../utils/sensorMapping";

const Module1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [labelData, setLabelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    socketRef.current = new WebSocket(wsUrl + location.pathname);
    socketRef.current.onopen = () => {
      console.log("connected");
    }
    socketRef.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data);
  
      setLabelData((prevLabelData) => {
        let newLabelData = prevLabelData.map((label) => {
          if (label.key === data["sensor_type"]) {
            return { ...label, value: data["value"] };
          }
          return label;
        });
        return newLabelData;
      });
    };
    socketRef.current.onclose = () => {
      console.log("disconnected");
    }

    socketRef.current.onerror = (e) => {
      console.log(e);
    }

  }, [location.pathname]);

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }

  useEffect(() => {
    const handleTabClose = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosPrivate.get(`/module${location.pathname}`).then((res) => {
      let labelDataList = [];
      for (let sensor of res.data.sensor_lst) {
        let obj = {
          key : sensor["type"],
          label : sensor["name"],
          value : sensor["value"]
        }
        labelDataList.push(obj);
      }
      setLabelData(labelDataList);
      setLoading(false);
      connectSocket();
    }).catch((error) => {
      console.log(error);
    });

    // get logs 
    axiosPrivate.get(`/log${location.pathname}`).then((res) => {
      let logList = [];
      for (let log of res.data) {
        var time = new Date(log["timestamp"]);
        logList.push(`${time.getFullYear()}/${time.getMonth() - 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()} ${log["sensor_name"]}: ${log["value"]}${sensorMapping[log["sensor_type"]].unit || ""}`);
      }
      setLogs(logList);
    }
    ).catch((error) => {
      console.log(error);
    });

  }, [location.pathname]);

  const handleDownloadLogs = () => {
    axiosPrivate.get(`/log/download${location.pathname}`, {responseType: 'blob'}).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'logs.csv');
      document.body.appendChild(link);
      link.click();
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  const handleClearLogs = () => {
    axiosPrivate.delete(`/log${location.pathname}`).then((res) => {
      setLogs([]);
    }
    ).catch((error) => {
      console.log(error);
    });

  }

  return (
    <Box m="20px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <SensorBox labelData = {labelData} loading = {loading} />
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
                  onClick={() => handleDownloadLogs()}
                >
                  Download Logs
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleClearLogs()}
                >
                  Clear Logs
                </Button>
              </Box>
            </Typography>
          </Box>
          <Box 
            display="flex" 
            flexDirection="column" 
            p="15px" 
            gap="10px"
          >
            {logs.map((log, index) => (
              <Typography fontSize={20} key={index} color={colors.grey[100]}>
                {log}
              </Typography>
            ))}
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Module1;
