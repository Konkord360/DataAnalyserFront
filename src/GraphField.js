import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import SliderFilter from "./SliderFilter";
import Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";
import DarkUnica from "highcharts/themes/dark-unica";

Boost(Highcharts);
DarkUnica(Highcharts);
const GraphField = ({ data, isDataFetched }) => {
  const [graphFilterValues, setGraphFilterValues] = useState([1, 16]);

  
  const optionsHigh = {
    plotOptions: {
      series: {
        enableMouseTracking: false,
        marker: {
          enabled: false,
        },
        animation: {
          enabled: false,
        },
      },
    },
    chart: {
      zoomType: "x",
      panning: true,
      panKey: "shift",
    },
    boost: {
      useGPUTranslations: true,
    },
    title: {
      text: "Highcharts drawing many",
    },

    subtitle: {
      text: "Using the Boost module",
    },

    tooltip: {
      valueDecimals: 2,
    },

    series: [],
  };

  for (
    let count = graphFilterValues[0] - 1;
    count < graphFilterValues[1];
    count++
  ) {
    optionsHigh.series.push({
      data: data[count],
      dataGrouping: {
        enabled: true,
      },
      pointStart: 0,
      pintInterval: 10000,
      lineWidth: 0.5,
    });
  }
  return (
    <div>
      <div className="chartOptionsMenu">
        <SliderFilter
          updateGraphRange={(sliderValue) => {
            // if(sliderValue[0] !== graphFilterValues[0] ||
            //   sliderValue[1] !== graphFilterValues[1]){
            //   console.log(sliderValue);
            //   console.log(graphFilterValues);
              setGraphFilterValues(sliderValue);
            // }
          }
        }
        />
      </div>
      {isDataFetched ? (
        <HighchartsReact highcharts={Highcharts} options={optionsHigh} />
      ) : (
        <h1>Upload the files with data to see the chart</h1>
      )}
    </div>
  );
};

export default GraphField;
