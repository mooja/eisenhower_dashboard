import * as React from "react";
import * as ReactDOM from "react-dom";
import * as moment from 'moment';
import { ActionCreator } from "react-redux";


class QuadrantTimer extends React.Component<any, any> {
    elapsedTime: number = 0;
    constructor (props: any) {
        super(props);
        this.elapsedTime = Date.now() - this.props.startTime;
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({elapsedTime: Date.now() - this.props.startTime})
        })
    }

    render() {
        if (!this.props.active) 
            return <div className="card-block text-center">Not Active</div>
        else {
            const elapsedTime = Date.now() - this.props.startTime;
            return <div className="card-block text-center">{elapsedTime}</div>
        }
    }
}

class Quadrant extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
        this.state = {
            totalTime: 0,
            isActive: false,
            timerStartTime: 0
        }

        this.props.sessions.forEach(ts => {
            if (ts.end !== null)
                this.state.totalTime += ts.end - ts.start;
            else {
                this.state.isActive = true;
                this.state.totalTime += Date.now() - ts.start;
                this.state.timerStartTime = ts.start;
            }
        });
    }

    render() {
        return (
            <div className={`card card-inverse ${this.props.colorClass}`}>
                <div className="card-header">{this.props.title}</div>
                <QuadrantTimer startTime={this.state.timerStartTime} active={this.state.isActive}/>
                <div> Total Time: {moment.duration(this.state.totalTime).humanize()}</div>
                <div className="card-footer"> <a href="#" className="btn btn-primary">Begin Session</a></div>
            </div>
        )
    }
}

class EMatrix extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
        this.state = {user: this.props.user, timeSessions: []};
    }

    processServerJson(json) {
        return json.map(ts => {
            if (ts.end === null)
                return { ...ts, 'start': Date.parse(ts.start)}
            return { ...ts, 'start': Date.parse(ts.start), 'end': Date.parse(ts.end)}
        });
    }

    componentDidMount() {
        fetch('/m/timesessions')
            .then(response => response.json())
            .then(json => {this.setState({timeSessions: this.processServerJson(json)})});
    }

    sessionsByQuadrant(quadrant: string) {
        return this.state.timeSessions.filter(ts => ts.quadrant === quadrant);
    }

    render() {
        return (
            <div className="container">
                <div className="row matrix">
                    <div className="col">
                        <Quadrant title="Important and Urgent" colorClass="card-danger" sessions={this.sessionsByQuadrant('q1')}/>
                    </div>
                    <div className="col">
                        <Quadrant title="Important and Non-Urgent" colorClass="card-success" sessions={this.sessionsByQuadrant('q2')}/>
                    </div>
                </div>
                <div className="row matrix">
                    <div className="col">
                        <Quadrant title="Urgent" colorClass="card-warning" sessions={this.sessionsByQuadrant('q3')}/>
                    </div>
                    <div className="col">
                        <Quadrant title="Non-Urgent" colorClass="card-info" sessions={this.sessionsByQuadrant('q4')}/>
                    </div>
                </div>
            </div>
        )
    }
}

const user_data_element = document.querySelector("#user-data") as HTMLElement;
const user = {
    id: user_data_element.dataset.userId,
    username: user_data_element.dataset.userUsername
}

ReactDOM.render(
    <EMatrix user={user}/>,
    document.getElementById("root")
);