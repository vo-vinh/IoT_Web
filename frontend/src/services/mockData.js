export const mockTemperature = [
  { x: "0h", y: 22 },
  { x: "1h", y: 21 },
  { x: "2h", y: 20 },
  { x: "3h", y: 19 },
  { x: "4h", y: 18 },
  { x: "5h", y: 21 },
];

export const mockHumidity = [
  { x: "0h", y: 60 },
  { x: "1h", y: 62 },
  { x: "2h", y: 64 },
  { x: "3h", y: 63 },
  { x: "4h", y: 61 },
  { x: "5h", y: 65 },
];

export const mockData = {
  temperature: "25",
  humidity: "60",
  conductivity: "10",
  ph: "7",
  nitrogen: "40",
  phosphorus: "15",
  potassium: "20",
};

export const mockDataModule2 = {
  temp: "22",
  humid: "55",
  light: "300",
  soilMoisture: "70",
};

export const mockModules = [
  { 
    key: 1, 
    label: "Module 1", 
    description: "Vị trí A", 
    sensors: [
      { id: 1, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'},
      { id: 2, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 2, 
    label: "Module 2", 
    description: "Vị trí B", 
    sensors: [
      { id: 3, name: "Nhiệt độ cao", description: "Đo nhiệt độ cao", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'},
      { id: 4, name: "Ánh sáng cao", description: "Đo nhiệt độ cao", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 3, 
    label: "Module 3", 
    description: "Vị trí C", 
    sensors: [
      { id: 5, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'},
      { id: 6, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 4, 
    label: "Module 4", 
    description: "Vị trí D", 
    sensors: [
      { id: 7, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'},
      { id: 8, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Temp Sensor", value: '24°C', updateTime: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
];
