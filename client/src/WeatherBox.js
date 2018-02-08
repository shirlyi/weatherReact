//weather component (represents full weather box)
import React, { Component } from 'react';
import CommentsListBox from './CommentsListBox'
import CommentForm from './CommentForm'
import axios from 'axios';

class WeatherBox extends Component {

    constructor(props) {
        super(props);
        this.state = { cityWeather: {} };
        this.cityApi = this.cityApi.bind(this);
    }


    cityApi(params) {
        var scity = this.props.item.name;
        var url = 'http://api.apixu.com/v1/current.json?key=6c5bd37454274dc381a152907180502&q=' + scity;
        axios.get(url) //<==Calling axios with a get request and pass the url
            .then(response => {
                var cityData = {
                    name: response.data.location.name,
                    icon: response.data.current.condition.icon,
                    feelslike_c: response.data.current.feelslike_c,
                    text: response.data.current.condition.text,
                    comments: []
                }
  
                this.setState({cityWeather : cityData})
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }
    componentDidMount = () => { this.cityApi() }



    render() {
        return (
            <div className="box col-4">
                <div>
                    <br />
                    {/* <i className="far fa-trash-alt" type="button" onClick={()=>{this.props.deleteCity(this.props.index)}}></i> */}
                    <button className="btn" type="button" onClick={() => { this.props.deleteCity(this.props.index) }}>delete me</button>
                    <span className="glyphicon glyphicon-trash pull-right"></span>
                    <div className="media-left">
                        <img src={this.state.cityWeather.icon} alt={this.state.cityWeather.name} className="media-object" style={{ width: 60 }} /></div>
                    <div className="media-body">
                        <h4 className="media-heading">{this.state.cityWeather.name}</h4>
                        <p>{this.state.cityWeather.text}- {this.state.cityWeather.feelslike_c} &nbsp;| C</p>
                    </div>

                </div>
                <CommentForm savecomment={this.props.savecomment} index={this.props.index} />
                <CommentsListBox comments={this.props.item.comments} cityIndex={this.props.index} deleteComment={this.props.deleteComment} />
            </div>

        );
    }
}

export default WeatherBox;

