import React from 'react';
import './cartesianPlotStyle.css';
import img1 from './data/rectangle_java.jpg';
import img2 from './data/rectangle_python.jpg';
import img3 from './data/rectangle_scala.jpg';
import img4 from './data/vehicle_java.jpg';
import img5 from './data/vehicle_python.jpg';
import img6 from './data/vehicle_scala.jpg';
import img7 from './data/q1.jpg';
import img8 from './data/q2.jpg';

import Button from 'react-bootstrap/Button'
import {
    XAxis, YAxis, CartesianGrid, Line, ComposedChart
} from 'recharts';


class CartesianPlot extends React.Component {

    transformData(data) {
        let rectangleData = [], vehicleData = [];
        let temp1 = data[0], temp2 = data[1];
        let length = temp1['LX'].length;
        let tempObj1, tempObj2;
        for (let i = 0; i < length; i++) {
            tempObj1 = {
                "LX": temp1["LX"][i],
                "LY": temp1["LY"][i],
            }
            tempObj2 = {
                "LX": temp2["LX"][i],
                "LY": temp2["LY"][i],
            }
            rectangleData.push(tempObj1);
            vehicleData.push(tempObj2);
        }

        return [rectangleData, vehicleData];
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState((prev, current) => ({
                data: this.transformData(this.props.data.coordinates),
                lang: this.props.data.lang
            }), () => {
                this.setState((prev, current) => ({
                    imagePath: this.makePath()
                }), () => {
                    console.log("Data changed in cartesian plot", this.state.lang, this.state.imagePath);
                })
            });
        }
    }

    changeIndex(e, value) {
        e.preventDefault();
        this.setState((prev, current) => ({
            index: value,
        }), () => {
            this.setState((prev, current) => ({
                imagePath: this.makePath()
            }), () => {
                console.log("Button changed index to :", this.state.index);
            })

        });
    }

    makePath() {
        let pt;
        if (this.state.index === 1) {
            switch (this.state.lang) {
                default :
                    pt = img4;
                    break;
                case "Python":
                    pt = img5;
                    break;
                case "Scala":
                    pt = img6;
                    break;
            }
        } else if (this.state.index === 0) {
            switch (this.state.lang) {
                default :
                    pt = img1;
                    break;
                case "Python":
                    pt = img2;
                    break;
                case "Scala":
                    pt = img3;
                    break;
            }
        } else if (this.state.index === 2) {
            pt = img7;
        } else {
            pt = img8;
        }
        return pt;
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.transformData(this.props.data.coordinates),
            lang: this.props.data.lang,
            index: 0,
            imagePath: img1
        }
        // console.log(this.state.data);
    }


    render() {
        return (
            <>
                <div className={"plotDiv"} style={{backgroundImage: `url(${this.state.imagePath})`}}>
                    <ComposedChart
                        width={1060}
                        height={605}
                        margin={{
                            right: 20, bottom: 20, left: 10,
                        }}
                        data={this.state.data[this.state.index]}
                    >
                        <CartesianGrid/>
                        <XAxis type="number" dataKey="LX" name="stature" domain={[0, 1920]} tickCount={10}/>
                        <YAxis type="number" dataKey="LY" name="weight" domain={[0, 1080]} tickCount={10}/>
                        {/*<Scatter name="A school" data={data} dot={{ stroke: 'red', strokeWidth: 0 }}/>*/}
                        <Line type="monotone" dataKey="LY" dot={false}/>
                        {/*<Tooltip cursor={{strokeDasharray: '3 3'}}/>*/}
                    </ComposedChart>
                    <div className={"buttonDiv"}>
                        <Button variant="primary" onClick={e => this.changeIndex(e, 0)}>Rectangle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 1)}>Vehicle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 2)}>Q. Rectangle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 3)}>Q. Vehicle</Button> {}
                    </div>
                </div>
            </>

        );
    }
}

export default CartesianPlot;
