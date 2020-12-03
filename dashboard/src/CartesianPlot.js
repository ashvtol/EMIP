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
    XAxis, YAxis, CartesianGrid, Line, ComposedChart, Tooltip
} from 'recharts';


class CartesianPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.transformData(this.props.data.coordinates),
            lang: this.props.data.lang,
            index: 0,
            imagePath: img1,
            lineType: "monotone",
        }
        // console.log(this.state.data);
    }

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

    changeLineType(e, value) {
        e.preventDefault();
        this.setState((prev, current) => ({
            lineType: value,
        }), () => {
            console.log("Line Type changed to:", this.state.lineType);
        });
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
                        <defs>
                            <linearGradient id="colorUv" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="red" stopOpacity={0.3}/>
                                <stop offset="5%" stopColor="purple" stopOpacity={0.7}/>
                                <stop offset="98%" stopColor="red" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid/>
                        <XAxis type="number" dataKey="LX" name="stature" domain={[0, 1920]} tickCount={10} unit={'px'}/>
                        <YAxis type="number" dataKey="LY" name="weight" domain={[0, 1080]} tickCount={10} unit={'px'}/>
                        <Line
                            type={this.state.lineType}
                            dataKey="LY"
                            dot={false}
                            fillOpacity={1}
                            stroke="url(#colorUv)"
                            strokeWidth={1.5}
                        />
                        {/*<Tooltip/>*/}
                    </ComposedChart>
                    <div className={"buttonHeading"}>
                        Select Image
                        <div className={"buttonHeadingLineFunctions"}>
                            Select Line Function
                        </div>
                    </div>
                    <div className={"buttonDiv"}>
                        <hr/>
                        <Button variant="primary" onClick={e => this.changeIndex(e, 0)}>Rectangle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 1)}>Vehicle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 2)}>Q. Rectangle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 3)}>Q. Vehicle</Button> {}
                        <div className={"lineTypeButtons"}>
                            <Button variant="primary"
                                    onClick={e => this.changeLineType(e, "monotone")}>Monotone</Button> {}
                            <Button variant="primary" onClick={e => this.changeLineType(e, "linear")}>Linear</Button> {}
                            <Button variant="primary"
                                    onClick={e => this.changeLineType(e, "linearClosed")}>LinearClosed</Button> {}
                            <Button variant="primary" onClick={e => this.changeLineType(e, "step")}>Step</Button> {}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CartesianPlot;
