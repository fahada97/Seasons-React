import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";

// const App = ()=>{

//     navigator.geolocation.getCurrentPosition(
//         position => console.log(position),
//         err => console.log(err)
        
//     );

//     return <div>Longitude: </div>
// }

class App extends React.Component{
    // constructor(props){
    //     super(props);

    //     this.state = { lat: null, errorMessage: '' }; 
    // }

    state = { lat: null, errorMessage: ''};

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        )
    }

    componentDidUpdate(){
        console.log("updated");
        
    }

    renderContent(){
        if(this.state.lat && !this.state.errorMessage){
            return <SeasonDisplay lat = {this.state.lat} />;
        }
        if(!this.state.lat && this.state.errorMessage){
            return <div>errorMessage: {this.state.errorMessage}</div>;
        }
        return <Loader 
             message = "Please allow your location"
        />;
    }

    render(){
        return (
            <div className = "example">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));