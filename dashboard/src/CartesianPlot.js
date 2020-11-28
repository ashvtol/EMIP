import React from 'react';
import './cartesianPlotStyle.css';
import img1 from './data/rectangle_java.jpg';
import img2 from './data/rectangle_python.jpg';
import img3 from './data/rectangle_scala.jpg';
import img4 from './data/vehicle_java.jpg';
import img5 from './data/vehicle_python.jpg';
import img6 from './data/vehicle_scala.jpg';
import Button from 'react-bootstrap/Button'
import {
    ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid
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

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState((prev, current) => ({
                data: this.props.data.coordinates,
                lang: this.props.data.lang
            }), () => {
                this.setState((prev, current) => ({
                    imagePath: this.makePath()
                }), () => {
                    console.log("Data changed in cartesian plot", this.state.lang, this.state.imagePath);
                })
            });
            // path = this.makePath();
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
        } else {
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
        }
        return pt;
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.coordinates,
            lang: this.props.data.lang,
            index: 0,
            imagePath: img1
        }
    }


    render() {
        return (
            <>
                <div className={"plotDiv"} style={{backgroundImage: `url(${this.state.imagePath})`}}>
                    <ScatterChart
                        width={1060}
                        height={605}
                        margin={{
                            right: 20, bottom: 20, left: 10,
                        }}
                    >
                        <CartesianGrid/>
                        <XAxis hide="true" type="number" dataKey="x" name="stature"/>
                        <YAxis hide="true" type="number" dataKey="y" name="weight"/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Scatter name="A school" data={data} fill="#8884d8"/>
                    </ScatterChart>
                    <div className={"buttonDiv"}>
                        <Button variant="primary" onClick={e => this.changeIndex(e, 0)}>Rectangle</Button> {}
                        <Button variant="primary" onClick={e => this.changeIndex(e, 1)}>Vehicle</Button> {}
                    </div>
                </div>
            </>

        );
    }
}

export default CartesianPlot;
