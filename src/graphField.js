import React, {useState} from 'react';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphField = () =>{   
    
    const [state, setState] = useState("awaiting");
    var data=[];
    var data1 = [];
   
    
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
                dataPoints: data1
        }]
    }
        
    var options1 = {
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
            dataPoints: data
        }]
    }

    return(
        <div>
            <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
            />
             <CanvasJSChart options = {options1}
            /* onRef = {ref => this.chart = ref} */
            />
        </div>
    )
}

export default GraphField; 