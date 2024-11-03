class SensorType {
    static humidity = "Humidity";
    static temperature = "Temperature";
    static pH = "pH";
    static conductivity = "Conductivity"; 
    static nitrogen = "Nitrogen";
    static phosphorus = "Phosphorus";
    static potassium = "Potassium";
    static light = "Light";
    static soilMoisture = "Soil Moisture";
}

Object.freeze(SensorType);
export default SensorType;