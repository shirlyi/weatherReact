//weather box list wrapper (Holds the weather componet)
import React, { Component } from 'react';
import WeatherBox from './WeatherBox.js';

class WeatherListBox extends Component {

    // renderExpenses(item,index) {
    //     return <li key={index}>{item.amt}$ , cat: {item.cat} descr: {item.descr}</li>;//could write {JSON.stringify(expense)}
    // }

    render() {
        return (
            <div className="row">
                {this.props.citysData.map((item, index) => {
                   return(  <WeatherBox key={item._id} index={item._id} item={item} deleteCity={this.props.deleteCity} savecomment={this.props.savecomment} deleteComment={this.props.deleteComment} />)
                })}   
            </div>
        );
    }
}

export default WeatherListBox;