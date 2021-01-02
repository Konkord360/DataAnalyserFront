import React, {
  render,
  Fragment,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import "./App.css";
import FileUpload from "./FileUpload";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SliderFilter from "./SliderFilter";
import Boost from "highcharts/modules/boost";
import DarkUnica from "highcharts/themes/dark-unica";

Boost(Highcharts);
DarkUnica(Highcharts);

const AntTabs = withStyles({
  root: {
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 250,
    color: "white",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: ["Arial"].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#0f1b30",
    flexGrow: 1,
  },
}));

const MainView = ({ refetch, data }) => {
  const [selectedGraph, setSelectedGraph] = useState(1);
  const [isSticky, setSticky] = useState(false);
  const [graphFilterValues, setGraphFilterValues] = useState([0, 15]);
  const [redrawGraph, setRedrawGraph] = useState(true);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    let count = graphFilterValues[0];
    count <= graphFilterValues[1];
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

  const classes = useStyles();

  return (
    <div className="App">
      <div className="MainView">
        <div className="Header">
          <AppBar position="fixed" className={classes.root}>
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <AntTab label="Graphs" {...a11yProps(0)} />
              <AntTab label="Upload files with data" {...a11yProps(1)} />
            </AntTabs>
          </AppBar>
        </div>
        <TabPanel value={value} index={0}>
          <div className="chartOptionsMenu">
            <SliderFilter
              updateGraphRange={(sliderValue) =>
                setGraphFilterValues(sliderValue)
              }
            />
          </div>
          <HighchartsReact highcharts={Highcharts} options={optionsHigh} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FileUpload refetch={refetch} />
        </TabPanel>
      </div>
    </div>
  );
};

export default MainView;
