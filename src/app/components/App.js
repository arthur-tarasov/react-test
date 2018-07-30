import React from 'react';
import { Header } from "./Header";
import { Main } from "./Main";


export class App extends React.Component {
    constructor() {
        super()
        this.getMyLocation = this.getMyLocation.bind(this)
    }

    componentWillMount() {
        this.getMyLocation();

    }
    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                localStorage.setItem("coords",JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}));
            }, (error) => {
                console.log("ERROR geolocation!");
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className=".col-xs-10 col-xs-offset-1">
                        <h1>React Test</h1>
                        <Header />
                        <Main />
                    </div>
                </div>
            </div>
        );
    }
}
/*const App = () => (
    <div className="container">
        <div className="row">
            <div className=".col-xs-10 col-xs-offset-1">
        <h1>React Router Demo</h1>
        <Header />
        <Main />
    </div>
        </div>
    </div>
);


export default App;*/