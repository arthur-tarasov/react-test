import React from "react";

export default class Home extends React.Component {

    render() {

        return (
            <div>
                <h1 className="myHeader">Main page</h1>
                <p className="myParagraph">Some text with custom styles</p>
            </div>
        )
    }





    /*constructor(props) {
        super();
        this.state =  {
            age: props.initialAge,
            status: 0,
            homeLink: props.initialLinkName
        };
    }
    onMakeOlder() {
        this.setState({
            age: this.state.age + 3
        });
    }
    //Child-Parent Communication
    onChangeLink() {
        this.props.changeLink(this.state.homeLink);
    }
    onHandleChange(event) {
        this.setState({
            homeLink: event.target.value
        });
    }
    render() {
        return(
            <div>
                <p>In a new Component!</p>
                <p>Your name is {this.props.name}, your age is {this.state.age}</p>
                <p>Status: {this.state.status}</p>
                <hr />
                <button onClick={() => this.onMakeOlder()} className="btn btn-primary">Make me older!</button>
                <hr />
                <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
                <hr />
                <input type="text" value={this.state.homeLink}
                       onChange={(event) => this.onHandleChange(event)}/>
                <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>
                <hr />
            </div>
        );
    }*/
}

/*
Home.propTypes = {
    name: PropTypes.string,
    initialAge: PropTypes.number,
    greet: PropTypes.func,
    initialLinkName: PropTypes.string,
};*/