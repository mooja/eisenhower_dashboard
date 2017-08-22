import * as React from "react";
import * as ReactDOM from "react-dom";

import { Timer } from './Timer';


export class Quadrant extends React.Component<any, any> {
    constructor (props: any) {
        super(props);
    }

    render() {
        let totalTime: number = 0;
        let isActive: boolean = false;
        let timerStart: number = 0;

        this.props.sessions.forEach(ts => {
            if (ts.end !== null)
                totalTime += ts.end - ts.start;
            else {
                isActive = true;
                totalTime += Date.now() - ts.start;
                timerStart = ts.start;
            }
        });

        return (
            <div className={`card card-inverse ${this.props.colorClass}`}>
                <div className="card-header">{this.props.title}</div>
                <Timer startTime={timerStart} isActive={isActive}/>
                <div> Total Time: {totalTime}</div>
                <div className="card-footer"> <a href="#" className="btn btn-primary">Begin Session</a></div>
            </div>
        )
    }
}