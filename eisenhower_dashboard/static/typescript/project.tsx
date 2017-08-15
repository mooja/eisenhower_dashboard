import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreator } from "react-redux";

class QuadrantTimer extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    render() {
        return <div className="card-block text-center">{this.props.time}</div>
    }
}

class Quadrant extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    render() {
        return (
            <div className={`card card-inverse ${this.props.colorClass}`}>
                <div className="card-header">{this.props.title}</div>
                <QuadrantTimer time="0:00:00"/>
                <div className="card-footer"> <a href="#" className="btn btn-primary">Begin Session</a>
                </div>
            </div>
        )
    }
}

class EMatrix extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row matrix">
                    <div className="col">
                        <Quadrant title="Important and Urgent" colorClass="card-danger"/>
                    </div>
                    <div className="col">
                        <Quadrant title="Important and Non-Urgent" colorClass="card-success"/>
                    </div>
                </div>
                <div className="row matrix">
                    <div className="col">
                        <Quadrant title="Urgent" colorClass="card-warning"/>
                    </div>
                    <div className="col">
                        <Quadrant title="Non-Urgent" colorClass="card-info"/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <EMatrix/>,
    document.getElementById("root")
);