import React from 'react';
import './cartesianPlotStyle.css'
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const data = [
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200},
];

class CartesianPlot extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                data: props.data
            };
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            index: 0,
        }
    }

    render() {
        return (
            <>
                <div className={"plotDiv"}>
                    <ScatterChart
                        width={1300}
                        height={740}
                        margin={{
                            right: 20, bottom: 20, left: -60,
                        }}
                    >
                        {/*<CartesianGrid hide="true"/>*/}
                        <XAxis hide="true" type="number" dataKey="x" name="stature" />
                        <YAxis hide="true" type="number" dataKey="y" name="weight" />
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Scatter name="A school" data={data} fill="#8884d8"/>
                    </ScatterChart>
                </div>
            </>

        );
    }
}

export default CartesianPlot;
