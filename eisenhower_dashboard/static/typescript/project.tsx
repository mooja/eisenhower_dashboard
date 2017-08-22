import * as React from "react";
import * as ReactDOM from "react-dom";
import { Quadrant } from "./components/Quadrant";


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