import './App.css';
import React from 'react';
import data50 from './data/data_emip_50.json';
import data150 from './data/data_emip_150.json';
import data250 from './data/data_emip_250.json';
import HeaderMenu from "./HeaderMenu";
import Cards from "./Cards";
import CartesianPlot from "./CartesianPlot";

let data = data250;

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
            dataSource: 'data250',
            lang: "Java",
            id: 0,
            index: 0,
            cardData: data[0],
            cartesianPlotData: {
                "coordinates": [data[0].rectangle_java, data[0].vehicle_java],
                "lang": "Java"
            }
        };
        this.LoadDataFromMenu = this.LoadDataFromMenu.bind(this);
        this.LoadDataFromPlotMenuAgain = this.LoadDataFromPlotMenuAgain.bind(this);
        this.selectDataFromPlotMenu = this.selectDataFromPlotMenu.bind(this);

    }

    LoadDataFromMenu(value) {
        console.log("Sent from Menu", value);
        this.setState((prev, current) => ({
            lang: value.lang,
            id: value.id,
            index: indexMap[value.id],
        }), () => {
            console.log("Parent state changed by Menu :", value, "index:", this.state.index);
            this.setState((prev, current) => ({
                cardData: data[this.state.index],
                cartesianPlotData: {
                    "coordinates": [data[this.state.index].rectangle_java, data[this.state.index].vehicle_java],
                    "lang": this.state.lang
                }
            }), () => {
                console.log("Card data changed by Menu :", value, "index:", this.state.cardData);
            });
        });
    }

    LoadDataFromPlotMenuAgain(e) {
        e.preventDefault();
        // console.log("Sent from Menu", value);
        this.setState((prev, current) => ({
            cardData: data[this.state.index],
            cartesianPlotData: {
                "coordinates": [data[this.state.index].rectangle_java, data[this.state.index].vehicle_java],
                "lang": this.state.lang
            }
        }), () => {
            // console.log("Card data changed by Menu :", value, "index:", this.state.cardData);
        });
    }

    switchData() {
        switch (this.state.dataSource) {
            default:
                data = data250;
                break;
            case "data150":
                data = data150;
                break;
            case "data50":
                data = data50;
                break;
        }
    }

    selectDataFromPlotMenu(value) {
        this.setState((prev, current) => ({
            dataSource: value,
        }), () => {
            console.log("DataSource changed:", value);
            this.switchData();
        });

    }

    render() {
        return (
            <div>
                <HeaderMenu data={languages} mutateMenu={this.LoadDataFromMenu}/>
                <Cards data={this.state.cardData}/>
                <CartesianPlot data={this.state.cartesianPlotData} mutateData={this.selectDataFromPlotMenu}
                               changedData={this.LoadDataFromPlotMenuAgain}/>
            </div>
        );
    }
}

export default App;
