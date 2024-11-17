import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import sensorMapping from "../utils/sensorMapping";

const SensorBox = ({labelData, loading}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {labelData.map(({key, label, value}) => {
        return (
          <Box
            key={key}
            gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection="column"
          >
            <h1 style={{ display: "flex", alignItems: "center" }}>
              { (
                <span style={{ marginRight: "0.5em" }}>
              {sensorMapping[key]?.icon}
            </span>
              )}
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
                {value}{" "} {sensorMapping[key]?.unit}
              </Typography>
            )}
          </Box>
          )
        })}
    </>
  )
};

export default SensorBox;