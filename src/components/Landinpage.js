import React, { Component } from 'react'
import './LandingPage.css';
import Axios from 'axios';
import Chart from './Chart';
import { Sparklines, SparklinesLine } from 'react-sparklines';


export default class Landinpage extends Component {

    state = {
        city: '',
        data: '',
        currentData :[],
        predictData:[],
        error :false,
        temp: [],
        humidity: [],
        pressure: [],
    }


    componentDidMount() {
    //    this.handleSubmit()
    }

    handleEvent =(e) => {
        this.setState({city:e.target.value});
        // let code = (e.keyCode ? e.keyCode : e.which);
        // if(code === 13)
        // {
        //     console.log("Afdafd");
        //     this.handleSubmit(e)
        //     this.parseData()
        // }

    }

    handleSubmit = event => {
        event.preventDefault();

        const API_KEY='4b57ce179f3560a914e8e19f3feaba5b';
        const ROOT_URL= `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

        const city = this.state.city;
        // console.log(city);
        const url=`${ROOT_URL}&q=${this.state.city}`;
        // console.log("Adad");
        // console.log(url);
        Axios.get(url)
        .then(res => {
          const persons = res.data;
        //   console.log("data is",persons);
        this.setState({ data:persons});
        this.setState({error:false})

        // console.log("city is ",this.state.data.city.name)

        })
        .catch(err => {
            // console.log("error is ",err);
            this.setState({error:true})
        })
    }

    parseData = () => {
        if(this.state.data) {
            var data = this.state.data;
            var currentData = [];
            var predictData = [];
            var tempdata = [];
            var j=6;
            for(var i=0;i<data.list.length;i++){

                let newDate = data.list[i].dt_txt;
                let temp_data = newDate.split(' ');

                var save = {
                    temperature: data.list[i].main.temp,
                    humidity: data.list[i].main.humidity,
                    date: temp_data[0],
                    time: temp_data[1],
                }
                var save2 = {
                    temperature: data.list[i].main.temp,
                }
                if(i<=2)
                    currentData.push(save);
                if(j === i){
                    predictData.push(save);
                    j = j+7;
                }
                else {
                    tempdata.push(save2)
                }
                // else break;
            }
            this.setState({currentData:currentData});
            this.setState({predictData:predictData});
            // console.log("currentData is",currentData);
            // console.log("predicted data is ",predictData);

            var  temp = data.list.map(weather=>weather.main.temp);
            var  pressure = data.list.map(weather=>weather.main.pressure);
            var humidity= data.list.map(weather=>weather.main.humidity);
            this.setState({temp:temp});
            this.setState({pressure:pressure});
            this.setState({humidity:humidity});

            console.log("temperature is", this.state.temp);
            console.log("humidity is",humidity);
            console.log("pressure is",pressure);
        }
    }
  render() {
    return (
      <div >
            <fieldset className="form-group">
                    <div>Temperature for places</div>
                      <input
                        type="text"
                        style={{ width: "50%" }}
                        className="form-control form-control-lg"
                        placeholder="Search Places"
                        onChange={e => {
                          e.preventDefault();
                          {/* console.log(e.target.value); */}

                          let code = (e.keyCode ? e.keyCode : e.which);
                          if(code === 13){
                              this.setState({city:e.target.value});
                              this.handleSubmit(e);
                              this.parseData();
                          }
                          else
                          this.handleEvent(e);
                        }}
                      />
                      <button onClick = {e => {
                          this.handleSubmit(e)
                          this.parseData() }}>Search</button>
            </fieldset>
                {
                    this.state.error ? <div>No results found!</div>:''
                }
            
                {
                    this.state.data ? <div><h1 style ={{color:'grey',fontSize:'25px',fontWeight:'initial'}}>Today's temperature for city {this.state.city}</h1></div>: ''     
                }

            <div>
            <div className ="list">
            {           
                this.state.data ?  this.state.currentData.map(item=>
                <div className ="card">
                    <div className = "container">
                        {/* <h4><b>City: {this.state.city}</b></h4> */}
                        <h4><b>Temperature: {item.temperature}</b></h4>
                        <h4><b>Humidity : {item.humidity}</b></h4>
                        <h4><b style ={{fontWeight:'bold'}}> Date:{item.date}</b></h4>
                        <h4><b style ={{fontWeight:'bold'}}>Time:{item.time}</b></h4>
                    </div>
                </div>):''

            }
            </div>
            {
                this.state.data ? <div><h1  style ={{color:'grey',fontSize:'25px',fontWeight:'initial'}}> Predicted Temperature for city {this.state.city}</h1></div>: ''
            }
            <div className = "list">
                {           
                    this.state.data ?  this.state.predictData.map(item=>
                    <div className ="card">
                        <div className = "container">
                            {/* <h4><b>City: {this.state.city}</b></h4> */}
                            <h4><b>Temperature: {item.temperature}</b></h4>
                            <h4><b>Humidity : {item.humidity}</b></h4>
                            <h4><b style ={{fontWeight:'bold'}}> Date:{item.date}</b></h4>
                            <h4><b style ={{fontWeight:'bold'}}>Time:{item.time}</b></h4>
                        </div>
                    </div>):''
                }
            </div>

            {
                this.state.data ? 
                <div style ={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>  
                    <div style ={{width:'200px',height:'120px'}}>
                        <p>Temperature</p>
                        <Sparklines height={120} width={100}  data= {this.state.temp}>
                            <SparklinesLine  color= "blue"/>
                        </Sparklines>
                    </div>
                    <div style ={{width:'200px',height:'120px'}}>
                        <p>Pressure</p>
                        <Sparklines height={120} width={80}  data= {this.state.pressure}>
                            <SparklinesLine  color= "blue"/>
                        </Sparklines>
                    </div>
                    <div style ={{width:'200px',height:'120px'}}>
                        <p>Humidity</p>
                        <Sparklines height={120} width={80}  data= {this.state.humidity}>
                            <SparklinesLine  color= "blue"/>
                        </Sparklines>
                    </div>
                </div>
                :' '
            }

        </div>
    </div>
    )
  }
}
