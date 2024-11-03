import React, { useEffect, useState } from "react";
import { Line } from "@nivo/line";
import { useTheme, TextField, Button, Box, MenuItem } from "@mui/material";
import { tokens } from "../theme";
import { mockTemperature, mockHumidity } from "../services/mockData";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [lineData, setLineData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSensors, setSelectedSensors] = useState(["Temperature", "Humidity"]);

  const availableSensors = ["Temperature", "Humidity"];

  useEffect(() => {
    // Lọc dữ liệu theo ngày và sensor đã chọn
    const filteredTempData = mockTemperature.filter(item => {
      const date = new Date(item.x);
      return (startDate ? date >= new Date(startDate) : true) &&
             (endDate ? date <= new Date(endDate) : true);
    });

    const filteredHumidData = mockHumidity.filter(item => {
      const date = new Date(item.x);
      return (startDate ? date >= new Date(startDate) : true) &&
             (endDate ? date <= new Date(endDate) : true);
    });

    // Xây dựng dữ liệu biểu đồ dựa trên các sensor được chọn
    const newLineData = [];
    if (selectedSensors.includes("Temperature")) {
      newLineData.push({
        id: "Temperature",
        color: tokens("dark").greenAccent[500],
        data: filteredTempData,
      });
    }
    if (selectedSensors.includes("Humidity")) {
      newLineData.push({
        id: "Humidity",
        color: tokens("dark").blueAccent[300],
        data: filteredHumidData,
      });
    }

    setLineData(newLineData);
  }, [startDate, endDate, selectedSensors]);

  const handleFilter = () => {
    setLineData(lineData);
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Line
          data={lineData}
          theme={{
            axis: {
              domain: { line: { stroke: colors.grey[100] } },
              legend: { text: { fill: colors.grey[100] } },
              ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
            },
            legends: { text: { fill: colors.grey[100] } },
            tooltip: { container: { color: colors.primary[500] } },
          }}
          colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
          width={800}
          height={400}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: -45,
            legend: isDashboard ? undefined : "time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5,
            tickSize: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "value",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                { on: "hover", style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 } },
              ],
            },
          ]}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 2, marginLeft: 2 }}>
        <TextField
          type="date"
          label="Start Date"
          onChange={(e) => setStartDate(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End Date"
          onChange={(e) => setEndDate(e.target.value)}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Select Sensors"
          value={selectedSensors}
          onChange={(e) => setSelectedSensors(e.target.value)}
          SelectProps={{ multiple: true }}
          variant="outlined"
        >
          {availableSensors.map((sensor) => (
            <MenuItem key={sensor} value={sensor}>
              {sensor}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleFilter}>Filter</Button>
      </Box>
    </Box>
  );
};

export default LineChart;
