import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SearchForm from './SearchForm'
import WeatherListBox from './WeatherListBox'
import { request } from 'http';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { citysData: [] };
    this.saveData = this.saveData.bind(this);
    this.savecomment = this.savecomment.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.getfromdb = this.getfromdb.bind(this);
    this.postCityDb=this.postCityDb.bind(this);
    this.deleteComment=this.deleteComment.bind(this);
  }
  componentDidMount() {
    this.getfromdb();
  }

  //get the data in componentdidmout->do fetch and then in the box call the api 
  getfromdb() {
    axios.get('/citiesdb') //<==Calling axios with a get request and pass the url
      .then(response => {
        console.log(response);
        this.setState({ citysData: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }
  postCityDb(cityName) {
    var cityobj = {
      name: cityName,
      comments : [ ]
    }

    axios.post('/savecity',cityobj)
    //   method: 'post',
    //   url: '/savecity',
    //   data: cityobj
    //  })
      .then((response) => {
        console.log(response);
        this.getfromdb();

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  
  }
  saveData(cityName) { //this after search of city set the DB 
    console.log(cityName);
    for (let i = 0; i < this.state.citysData.length; i++) {
      if (cityName == this.state.citysData[i].name) {
        console.log("city exist");
        return cityName;
      }
    }
    this.postCityDb(cityName);
    // this.setState((state, props) => {
    //   return { citysData: state.citysData.concat(cityData) };
    // });

  }
  savecomment(index, comment) {
    console.log(comment);
      var path = '/savecity/'+index+'/comment';
      axios.post(path, comment)
        .then((response) => {
          console.log(response);
          this.getfromdb();
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        })
    //without db
    // this.setState((state, props) => {
    //   return {
    //     citysData: state.citysData.map((item, index1) => {
    //       if (index1 === index) {
    //         var newitem = { ...item }; //to creat new object need to do spread 
    //         newitem.comments = newitem.comments.concat(comment);
    //         return (newitem);
    //       }
    //       else return (item);
    //     })
    //   }
    // })
  }

  deleteCity(index) {
    console.log(index);
      ///deletecity/:cityId
      axios.delete('/deletecity/'+index) //<==Calling axios with a get request and pass the url
      .then(response => {
        this.getfromdb();
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    //delte from DB not fron satate
    // this.setState((state, props) => {
    //   return { citysData: state.citysData.filter((city, i) => i !== index) }//dont use splice use only fillter
    // })
  }

  deleteComment(commentIndex,cityIndex){
    console.log(commentIndex,cityIndex);
    axios.delete('/city/'+cityIndex+'/deletecomment/'+commentIndex) //<==Calling axios with a get request and pass the url
    .then(response => {
      this.getfromdb();// how do i force it to refresh
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h2>Weather app</h2>
          <SearchForm saveData={this.saveData} />
        </div>
        <div>
          <WeatherListBox citysData={this.state.citysData} savecomment={this.savecomment} deleteCity={this.deleteCity} deleteComment={this.deleteComment} />
        </div>
      </div>
    )
  }
}

export default App;
