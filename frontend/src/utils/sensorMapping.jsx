import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faDroplet,
  faEarthAsia,
  faSun,
  faTemperatureThreeQuarters
} from "@fortawesome/free-solid-svg-icons";
import { Nitrogen, PHIcon, Phosphorus, Potassium } from "./svg";


const sensorMapping = {
  temperature: {
    icon: <FontAwesomeIcon icon={faTemperatureThreeQuarters} />,
    unit: "°C",
  },
  humidity : {
    icon: <FontAwesomeIcon icon={faDroplet} />,
    unit: "%",
  },
  soilMoisture: {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    unit: "%",
  },
  pH : {
    icon: <PHIcon />,
    unit: null,
  },
  conductivity: {
    icon: <FontAwesomeIcon icon={faBolt} />,
    unit: "S/cm",
  },
  nitrogen: {
    icon: <Nitrogen />,
    unit: "mg/kg",
  },
  phosphorus: {
    icon: <Phosphorus />,
    unit: "mg/kg",
  },
  potassium: {
    icon: <Potassium />,
    unit: "mg/kg",
  },
  light : {
    icon: <FontAwesomeIcon icon={faSun} />,
    unit: "lux",
  }
}

export default sensorMapping;