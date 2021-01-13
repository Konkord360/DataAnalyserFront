import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import FileUpload from "./FileUpload";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GraphField from "./GraphField";

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

// let data = [[]];
let data = [{
  fileName: "",
  seriesValues: []
}];

const MainView = () => {
  
  // const [redraw, setRedraw] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isSticky, setSticky] = useState(false);
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

  const classes = useStyles();

  const redrawF = (apiResponse) => {
    console.log(apiResponse);
    console.log(apiResponse.length);
    for(let i = 0 ; i < apiResponse.length; i++){
      console.log(apiResponse[i].SeriesValues.length);
      // for(let j = 0; j < apiResponse[i].length; i++){
        // data.push({
        //   fileName: i,
        //   seriesValues: apiResponse[i].SeriesValues[j]
        // });
        // console.log(data[0]);
        data[i] = {
          fileName: i,
          seriesValues: apiResponse[i].SeriesValues
        }
       
      // }
      console.log(data);
    }   
    setIsDataFetched(true);
  }

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
          <GraphField data={data} isDataFetched={isDataFetched} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FileUpload
            redraw={redrawF}
          />
        </TabPanel>
      </div>
    </div>
  );
};

export default MainView;
