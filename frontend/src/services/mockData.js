export const mockTemperature = [
  { x: "2024-10-01", y: 22 },
  { x: "2024-10-02", y: 23 },
  { x: "2024-10-03", y: 19 },
  { x: "2024-10-04", y: 25 },
  { x: "2024-10-05", y: 24 },
  { x: "2024-10-06", y: 26 },
  { x: "2024-10-07", y: 20 },
  { x: "2024-10-08", y: 22 },
  { x: "2024-10-09", y: 23 },
  { x: "2024-10-10", y: 21 },
  { x: "2024-10-11", y: 24 },
  { x: "2024-10-12", y: 26 },
  { x: "2024-10-13", y: 27 },
  { x: "2024-10-14", y: 25 },
  { x: "2024-10-15", y: 28 },
];

export const mockHumidity = [
  { x: "2024-10-01", y: 60 },
  { x: "2024-10-02", y: 62 },
  { x: "2024-10-03", y: 59 },
  { x: "2024-10-04", y: 63 },
  { x: "2024-10-05", y: 65 },
  { x: "2024-10-06", y: 67 },
  { x: "2024-10-07", y: 64 },
  { x: "2024-10-08", y: 66 },
  { x: "2024-10-09", y: 61 },
  { x: "2024-10-10", y: 63 },
  { x: "2024-10-11", y: 62 },
  { x: "2024-10-12", y: 66 },
  { x: "2024-10-13", y: 68 },
  { x: "2024-10-14", y: 70 },
  { x: "2024-10-15", y: 69 },
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
    name: "Module 1",
    code_name: "module1", 
    description: "Vị trí A",
    longitude: 1.00,
    latitude: 1.00,
    last_active: '2024-10-25 10:30:00',
    sensors: [
      { id: 1, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Temperature", value: '24°C', last_active: '2024-10-25 10:30:00'},
      { id: 2, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Light", value: '24°C', last_active: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 2, 
    name: "Module 2", 
    code_name: "module2", 
    description: "Vị trí B",
    longitude: 1.00,
    latitude: 1.00,
    last_active: '2024-10-25 10:30:00',
    sensors: [
      { id: 3, name: "Nhiệt độ cao", description: "Đo nhiệt độ cao", type: "Temperature", value: '24°C', last_active: '2024-10-25 10:30:00'},
      { id: 4, name: "Ánh sáng cao", description: "Đo nhiệt độ cao", type: "Humidity", value: '24°C', last_active: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 3, 
    name: "Module 3", 
    code_name: "module3", 
    description: "Vị trí C",
    longitude: 1.00,
    latitude: 1.00, 
    last_active: '2024-10-25 10:30:00',
    sensors: [
      { id: 5, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Light", value: '24°C', last_active: '2024-10-25 10:30:00'},
      { id: 6, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Light", value: '24°C', last_active: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
  { 
    key: 4, 
    name: "Module 4", 
    code_name: "module4", 
    description: "Vị trí D",
    longitude: 1.00,
    latitude: 1.00,
    last_active: '2024-10-25 10:30:00',
    sensors: [
      { id: 7, name: "Nhiệt độ", description: "Đo nhiệt độ", type: "Soil", value: '24°C', last_active: '2024-10-25 10:30:00'},
      { id: 8, name: "Ánh sáng", description: "Đo nhiệt độ", type: "Temperature", value: '24°C', last_active: '2024-10-25 10:30:00'}
    ], 
    isOpen: false 
  },
];
