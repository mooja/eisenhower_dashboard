import * as React from "react";
import * as ReactDOM from "react-dom";

import { TimeSession } from "./TimeSession";
import { Quadrant } from "./Quadrant";


// using jQuery
function getCookie(name) {
    let cookieValue: null|string = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export class EMatrix extends React.Component <any, any> {
    constructor (props: any) {
        super(props);
        this.state = {user: this.props.user, timeSessions: []};
    }

    componentDidMount() {
        fetch('/m/timesessions')
            .then(response => response.json())
            .then(json => {
                const timeSessions = json.map(ts => new TimeSession(ts));
                this.setState({timeSessions});
            });
    }

    handleStartSession(quadrant) {
        const latest_id: number = Math.max.apply(null, this.state.timeSessions.map(ts => ts.id));
        const id = latest_id + 1;
        const start = new Date();
        const end = null;
        const newTS = new TimeSession({id, start, end, quadrant});
        this.setState({timeSessions: [...this.state.timeSessions, newTS]});

        // update database
        const payload = {start: new Date(), end, quadrant};
        const csrftoken = getCookie('csrftoken');
        fetch(`/m/timesessions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => newTS.id = data.id);
        // TODO: handle failure
    }

    handleEndSession(quadrant) {
        const ts: TimeSession = this.state.timeSessions.find(ts => quadrant === ts.quadrant && ts.isActive());
        ts.end = new Date();
        this.setState({timeSessions: [...this.state.timeSessions]});

        const payload = {id: ts.id, quadrant: ts.quadrant, start: ts.start, end: ts.end};
        const url = `/m/timesessions/${String(ts.id)}/`;
        const csrftoken = getCookie('csrftoken');
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {});
        // TODO: handle failure
    }

    render() {
        // const quadrants = [
        //     {quadrant: 'q1', title: 'Important and Urgent', sessions: this.state.timeSessions, }, 
        //     {quadrant: 'q2'}, 
        //     {quadrant: 'q3'}, 
        //     {quadrant: 'q4'}
        // ];
        const Q1 = <Quadrant title="Important and Urgent" sessions={this.state.timeSessions} quadrant="q1" colorClass="card-danger" startSessionFunc={this.handleStartSession.bind(this, "q1")} endSessionFunc={this.handleEndSession.bind(this, "q1")}/>
        const Q2 = <Quadrant title="Important and Non-Urgent" sessions={this.state.timeSessions} quadrant="q2" colorClass="card-success" startSessionFunc={this.handleStartSession.bind(this, "q2")}  endSessionFunc={this.handleEndSession.bind(this, "q2")}/>
        const Q3 = <Quadrant title="Urgent" sessions={this.state.timeSessions} quadrant="q3" colorClass="card-warning" startSessionFunc={this.handleStartSession.bind(this, "q3")}  endSessionFunc={this.handleEndSession.bind(this, "q3")}/>
        const Q4 = <Quadrant title="Non-Urgent" sessions={this.state.timeSessions} quadrant="q4" colorClass="card-info" startSessionFunc={this.handleStartSession.bind(this, "q4")}  endSessionFunc={this.handleEndSession.bind(this, "q4")}/>
        return (
            <div className="container">
                <div className="row matrix">
                    <div className="col"> {Q1} </div>
                    <div className="col"> {Q2} </div>
                </div>
                <div className="row matrix">
                    <div className="col"> {Q3} </div>
                    <div className="col"> {Q4} </div>
                </div>
            </div>
        )
    }
}