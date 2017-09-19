import * as React from "react";
import * as ReactDOM from "react-dom";

import * as _ from "lodash";

import { Timer } from './Timer';
import { TimeSession } from './TimeSession';


export class Quadrant extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    render() {
        const quadrantSessions: TimeSession[] = this.props.sessions.filter(ts => ts.quadrant === this.props.quadrant);
        const isActive: boolean = quadrantSessions.some(ts => ts.isActive());

        let actionsDisplay;
        if (isActive) 
            actionsDisplay = <a onClick={this.props.endSessionFunc}>End Session</a>;
        else 
            actionsDisplay = <a onClick={this.props.startSessionFunc}>Start Session</a>;

        let timeDisplay;
        if (isActive) {
            const startTime = (quadrantSessions.find(ts => ts.isActive()) as TimeSession).start;
            timeDisplay = <Timer startTime={startTime} isActive={isActive}/>
        }
        else {
            timeDisplay = <p className="text-center"> 0:00 </p>;
        }

        const today = new Date();
        const todayStr = (new Date()).toDateString();
        const day = today.getDay(), 
            diff = today.getDate() - day + (day == 0 ? -6:1);
        const thisMonday = new Date(today.setDate(diff));

        const allSessions = quadrantSessions;
        const sessionsToday = allSessions
            .filter(ts => ts.start.toDateString() === todayStr);
        const sessionsThisWeek = allSessions
            .filter(ts => ts.start <= thisMonday);
        
        const totalTime: number = _.sum(allSessions.map(ts => ts.duration()));
        const todayTime: number = _.sum(sessionsToday.map(ts => ts.duration()));
        const thisWeekTime: number = _.sum(sessionsThisWeek.map(ts => ts.duration()));
 
        return (
            <div className={`card card-inverse ${this.props.colorClass}`}>
                <div className="card-header">{this.props.title}</div>
                {timeDisplay}
                <p> Total Time: {totalTime}, Today: {todayTime}, This Week: {thisWeekTime} </p>
                {actionsDisplay}
            </div>
        )
    }
}