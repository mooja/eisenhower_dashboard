import * as React from "react";
import * as ReactDOM from "react-dom";

import * as _ from "lodash";

import { Timer } from './Timer';
import { TimeSession } from './TimeSession';


export class Quadrant extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    humanizeDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.round(minutes / 60);

        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    }

    render() {
        const quadrantSessions: TimeSession[] = this.props.sessions.filter(ts => ts.quadrant === this.props.quadrant);
        const isActive: boolean = quadrantSessions.some(ts => ts.isActive());

        let actionsDisplay;
        if (!isActive) 
            actionsDisplay = <a onClick={this.props.startSessionFunc}>Start Session</a>;
        else 
            actionsDisplay = <a onClick={this.props.endSessionFunc}>End Session</a>;

        let timerDisplay;
        if (isActive) {
            const startTime = (quadrantSessions.find(ts => ts.isActive()) as TimeSession).start;
            timerDisplay = <Timer startTime={startTime} isActive={isActive}/>
        }
        else {
            timerDisplay = <p className="text-center"> 0:00 </p>;
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
                {timerDisplay}
                <ul>
                    <li>Today: {this.humanizeDuration(todayTime)}</li>
                    <li>This Week: {this.humanizeDuration(thisWeekTime)}</li>
                    <li>Total: {this.humanizeDuration(totalTime)}</li>
                </ul>
                {actionsDisplay}
            </div>
        )
    }
}