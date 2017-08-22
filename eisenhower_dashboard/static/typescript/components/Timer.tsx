import * as React from "react";
import * as ReactDOM from "react-dom";

export class Timer extends React.Component<any, any> {
    timerID: number; // timer ID

    constructor (props: any) {
        super(props);
        this.state = {elapsedTime: Date.now() - this.props.startTime}
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({elapsedTime: Date.now() - this.props.startTime})
        }, 1000)
    }

    render() {
        const seconds = Math.floor(this.state.elapsedTime / 1000) % 60
        const minutes = Math.floor(this.state.elapsedTime / (1000*60)) % 60
        if (!this.props.isActive) 
            return <div className="card-block text-center">Not Active</div>
        else {
            return <div className="card-block text-center">{minutes}:{seconds}</div>
        }
    }
}