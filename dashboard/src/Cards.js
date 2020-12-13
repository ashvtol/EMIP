import React from 'react';
import './cardStyle.css';
import Table from 'react-bootstrap/Table';


let labelsAll = [];

function initLabels(value) {
    let labels = Object.keys(value);
    let filterList = ["vehicle_java", "rectangle_java", "time_experiment_language", "answer_rectangle", "answer_vehicle", "makeup", "stimulus_rectangle", "stimulus_vehicle", "time_experiment_language_original", "frequency_experiment_language", "other_languages_original", "frequency_other_language"]
    labels = labels.filter(item => (!filterList.includes(item)));
    labelsAll = labels;
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
            data: this.props.data.coordinates,
            benchmark: this.props.data.benchmark,
            labels: initLabels(this.props.data.coordinates)
        }
    }

    changeCardBg(value) {
        if (value === 'correct_vehicle' || value === 'correct_rectangle') {
            if (this.state.data.coordinates[value] === 1) {
                return "linear-gradient(to right, #76b852, #76b852)";
            } else {
                return "linear-gradient(to right, #ed213a, #ed213a)";
            }
        }
        return null;
    }

    changeCardBg1(value) {
        if (value === 'correct_vehicle' || value === 'correct_rectangle') {
            if (this.state.data.benchmark[value] === 1) {
                return "linear-gradient(to right, #76b852, #76b852)";
            } else {
                return "linear-gradient(to right, #ed213a, #ed213a)";
            }
        }
        return null;
    }

    render() {
        return (
            <>
                <div className={"tableCSS"}>
                    <Table hover striped={true}>
                        <thead>
                        <tr>
                            <th>Metadata</th>
                            <th>Current</th>
                            <th>BenchMark</th>
                        </tr>
                        </thead>
                        <tbody>
                        {labelsAll.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value}</td>
                                    <td style={{background: this.changeCardBg(value)}} key={value}>
                                        {this.state.data.coordinates[value]}</td>
                                    <td style={{background: this.changeCardBg1(value)}} key={value}>
                                        {this.state.data.benchmark[value]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Cards;