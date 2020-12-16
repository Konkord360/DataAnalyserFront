import React, { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import CanvasJSReact from './canvasjs.react';
import Header from './Header';
import FileUpload from './FileUpload';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AntTabs = withStyles({
  root: {
    // borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 250,
    color: 'white',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      'Arial'
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
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
          <Typography>{children}</Typography>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#0f1b30",
    flexGrow: 1
  },
}));

const MainView = ({refetch, data}) => {
  const [selectedGraph, setSelectedGraph] = useState(1);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', () => handleScroll);
      };
    }, []);
  
    var options = {
      theme: "dark2",
      zoomEnabled: true,
      title: {
          text: "Basic Column Chart in React"
      },
      axisY: {
          lineThickness: 1
      },
      data: [{				
          type: "line",
              dataPoints: data[0]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[1]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[2]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[3]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[4]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[5]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[6]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[7]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[8]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[9]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[10]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[11]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[12]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[13]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[14]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[15]//[selectedGraph]
      },{				
        type: "line",
            dataPoints: data[16]//[selectedGraph]
      }]
  }
   
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const classes = useStyles();

    return(
      <div className="App">
        <div className = "MainView">
          <div className="Header">
          {/* <Paper className={classes.root}> */}
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
            {/* </Paper> */}
          </div> 
          <TabPanel value={value} index={0}>
            <div className = "chartOptionsMenu"> 
              <select name="viewed Sensor" id="sensorSelect" onChange={(e) => setSelectedGraph(e.target.value)}>
                <option value={0}>Sensor1</option>
                <option value={1}>Sensor2</option>
                <option value={2}>Sensor3</option>
                <option value={3}>Sensor4</option>
                <option value={4}>Sensor5</option>
                <option value={5}>Sensor6</option>
                <option value={6}>Sensor7</option>
                <option value={7}>Sensor8</option>
                <option value={8}>Sensor9</option>
                <option value={9}>Sensor10</option>
                <option value={10}>Sensor11</option>
                <option value={11}>Sensor12</option>
                <option value={12}>Sensor13</option>
                <option value={13}>Sensor14</option>
                <option value={14}>Sensor15</option>
                <option value={15}>Sensor16</option>
              </select>
            </div> 
            <CanvasJSChart options = {options}/>
          </TabPanel> 
          <TabPanel value={value} index={1}>
            <FileUpload refetch={refetch}/>
          </TabPanel>
      </div>
    </div>
  )
}

export default MainView;