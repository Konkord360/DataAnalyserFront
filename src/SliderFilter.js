import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const SliderFilter = ({ updateGraphRange }) => {
  const [sliderValue, setSliderValue] = useState([1, 16]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  const clickedButton = () => {
    updateGraphRange(sliderValue);
  };

  return (
    <div className="sliderFilter">
      <Typography id="discrete-slider-custom" gutterBottom>
        Select range of sensors to be displayed
      </Typography>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={1}
        max={16}
      />
      <Button variant="outlined" color="primary" onClick={clickedButton}>
        Filter sensors
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          /*TODO: ustawienie do pełnego przedziału czujników*/
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default SliderFilter;
