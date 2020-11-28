import './App.css';
import React from 'react';

import data from './data/data_emip.json';
import HeaderMenu from "./HeaderMenu";
import Cards from "./Cards";
import CartesianPlot from "./CartesianPlot";

let indexMap = new Array(data.length + 10).fill(0);

// Language Options
let languages = {}

function initIndexMap() {
    for (let itr of data) {
        indexMap[itr.id] = data.indexOf(itr)
    }
}

function initMenuItems() {
    let langSet = new Set();
    for (let itr of data) {
        if (itr.experiment_language in languages)
            languages[itr.experiment_language].add(data.indexOf(itr));
        else
            languages[itr.experiment_language] = new Set()
        langSet.add(itr.experiment_language);
    }

    for (let str in languages) {
        languages[str] = Array.from(languages[str]);
    }
    // console.log(languages);
}


function init() {
    initIndexMap();
    initMenuItems();
    // console.log(data);
}

init();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: "Java",
            id: 0,
            index: 0,
            cardData: data[0],
            cartesianPlotData: [data[0].rectangle_java, data[0].vehicle_java]
        };
        this.LoadDataFromMenu = this.LoadDataFromMenu.bind(this);
    }

    LoadDataFromMenu(value) {
        this.setState((prev, current) => ({
            lang: value.lang,
            id: value.id,
            index: indexMap[value.id],
        }), () => {
            console.log("Parent state changed by Menu :", value, "index:", this.state.index);
            this.setState((prev, current) => ({
                cardData: data[this.state.index],
                cartesianPlotData: [data[this.state.index].rectangle_java, data[this.state.index].vehicle_java]
            }), () => {
                console.log("Card data changed by Menu :", value, "index:", this.state.cardData);
            });
        });
    }

    render() {
        return (
            <div>
                <HeaderMenu data={languages} mutateMenu={this.LoadDataFromMenu}/>
                <Cards data={this.state.cardData}/>
                <CartesianPlot data={this.state.cartesianPlotData}/>
            </div>
        );
    }
}

export default App;
