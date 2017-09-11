import * as React from "react";
import * as ReactDOM from "react-dom";


export class Timer extends React.Component<any, any> {
    timerID: number; // timer ID

    constructor (props: any) {
        super(props);
        this.state = {elapsedTime: Date.now() - this.props.startTime}
    }

    componentDidMount(): void {
        this.timerID = setInterval(() => {
            this.setState({elapsedTime: Date.now() - this.props.startTime})
        }, 1000)
    }

    componentWillUnmount(): void {
        if (this.timerID !== null) clearInterval(this.timerID);
    }

    render() {
        const seconds = Math.floor(this.state.elapsedTime / 1000) % 60
        const minutes = Math.floor(this.state.elapsedTime / (1000*60)) % 60
        const hours = Math.floor(this.state.elapsedTime / (1000*60*60)) % 24
        if (!this.props.isActive) 
            return <div className="card-block text-center">0:00:00</div>
        else {
            return <div className="card-block text-center">{hours}:{minutes}:{seconds}</div>
        }
    }
}