import React from 'react';
import './cardStyle.css'
import Card from 'react-bootstrap/Card'

let label1Col = [];
let label2Col = [];
let label3Col = [];


function initLabels(value) {
    let labels = Object.keys(value);
    labels = labels.filter(item => (item !== 'vehicle_java' && item !== 'rectangle_java'));
    label1Col = labels.slice(0, 10);
    label2Col = labels.slice(10, 19);
    label3Col = labels.slice(19, -1);
    return labels;
}

class Cards extends React.Component {
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
            labels: initLabels(this.props.data)
        }
    }

    changeCardBg(value) {
        if (value === 'correct_vehicle' || value === 'correct_rectangle') {
            if (this.state.data[value] === 1) {
                return "linear-gradient(to right, #76b852, #8dc26f)";
            } else {
                return "linear-gradient(to right, #ed213a, #93291e)";
            }
        }
        return null;
    }

    render() {
        return (
            <>
                <div className={"cardsColumn1"}>
                    {label1Col.map((value, index) => {
                        return (
                            <Card bg="primary" text="white" className={"cards"}
                                  style={{background: this.changeCardBg(value)}} key={value}>
                                <Card.Body>
                                    <Card.Title>{value}</Card.Title>
                                    <Card.Text>
                                        {this.state.data[value]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                <div className={"cardsColumn2"}>
                    {label2Col.map((value, index) => {
                        return (
                            <Card bg="primary" text="white" className={"cards"}
                                  style={{background: this.changeCardBg(value)}} key={value}>
                                <Card.Body>
                                    <Card.Title>{value}</Card.Title>
                                    <Card.Text>
                                        {this.state.data[value]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
                <div className={"cardsColumn3"}>
                    {label3Col.map((value, index) => {
                        return (
                            <Card bg="primary" text="white" className={"cards"}
                                  style={{background: this.changeCardBg(value)}} key={value}>
                                <Card.Body>
                                    <Card.Title>{value}</Card.Title>
                                    <Card.Text>
                                        {this.state.data[value]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </>
        );
    }
}

export default Cards;