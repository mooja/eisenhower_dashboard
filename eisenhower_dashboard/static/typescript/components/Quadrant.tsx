import * as React from "react";
import * as ReactDOM from "react-dom";

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
            timeDisplay = <p> 0:00 </p>;
        }

        const totalTime: number = quadrantSessions.map(ts => ts.duration()).reduce((dur1, dur2) => dur1+dur2, 0);
 
        return (
            <div className={`card card-inverse ${this.props.colorClass}`}>
                <div className="card-header">{this.props.title}</div>
                {timeDisplay}
                {actionsDisplay}
            </div>
        )
    }
}