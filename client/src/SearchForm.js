//Search form (will be passing data to the main component)
import React, { Component } from 'react';
import SingleInput from './SingleInput.js';
import axios from 'axios';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { city: "" };
        this.cityApi = this.cityApi.bind(this);
    }

    cityApi(params) {
        console.log("here");
        var scity=this.state.city;
        var url = 'http://api.apixu.com/v1/current.json?key=6c5bd37454274dc381a152907180502&q='+scity;
        axios.get(url) //<==Calling axios with a get request and pass the url
            .then(response => {
                //  var cityData = {
                //     name: response.data.location.name,
                //     icon: response.data.current.condition.icon,
                //     feelslike_c: response.data.current.feelslike_c,
                //     text: response.data.current.condition.text,
                //     comments: []
                // }
                var name=response.data.location.name;
                this.props.saveData(name);
                this.setState({city: ''});
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        return (
            <div>
                <form>
                <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter city"
                        required
                        value={this.state.city}
                        onChange={(event) => this.setState({city: event.target.value})}/>
                    {/* <SingleInput id="city" type="text" placeholder="enter city" classname="form-control"   value={this.state.city} onChange={(event) => this.setState({city: event.target.value})}/> */}
                    <br/>
                    <button className="btn btn-info" type="button" onClick={this.cityApi}>search for wheather</button>
                </form>
            </div>
        )
    }

}

export default SearchForm;