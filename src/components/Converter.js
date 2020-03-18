import React, { Component } from 'react';
import './Converter.css';
import { format } from 'money-formatter';

// import { Container } from './styles';

export default class Converter extends Component {

    constructor(props){
        super(props);

        this.state = {
            currencyA_value:"",
            currencyB_value: 0,
        }

        this.conversion = this.conversion.bind(this);
    }

    conversion(){
        let from_to = `${this.props.currencyA}_${this.props.currencyB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=y&apiKey=e43e4224c7e0c8c97258`;

        fetch(url)
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            let cotation = json[from_to].val
            let currencyB_value = parseFloat(this.state.currencyA_value) * cotation
            currencyB_value = format(this.props.currencyB, Math.round((parseFloat(currencyB_value) + Number.EPSILON) * 100) / 100)//Arred            
            this.setState({ currencyB_value })
        })
    }

    render() {
        return (
            <div className="converter">
                <h2>{this.props.currencyA} for {this.props.currencyB}</h2>
                <input type="text" onChange={(event)=>{this.setState({currencyA_value:event.target.value})}}></input>
                <button type="button" onClick={this.conversion}>Convert</button>

            <h2>{this.state.currencyB_value}</h2>
            </div>
        );
    }
}
