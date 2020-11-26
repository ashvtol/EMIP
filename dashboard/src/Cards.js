import React from 'react';
import './style.css'
import Card from 'react-bootstrap/Card'

function initLabels(value) {
    let labels = Object.keys(value);
    labels = labels.filter(item => (item !== 'vehicle_java' && item !== 'rectangle_java'));
    // labels.remove('vehicle_java');
    // labels.remove('rectangle_java');
    return labels;
}

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            labels: initLabels(this.props.data)
        }
        console.log(this.state.labels);
    }

    render() {
        return (
            <div class={"cardsColumn"}>
                {this.state.labels.map((value, index) => {
                    return (
                        <Card bg="primary" text="white" className={"cards"}>
                            <Card.Body>
                                <Card.Title>value</Card.Title>
                                <Card.Text>
                                    {this.state.data[0][value]}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}

            </div>
        );
    }
}

export default Cards;
