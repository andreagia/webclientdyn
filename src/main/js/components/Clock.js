import React, { Component } from 'react';

class Clock extends Component {

   state = {currentCount: 10};

    timer = () => {
        this.setState({
            currentCount: this.state.currentCount - 1
        });
        if(this.state.currentCount < 1) {
            clearInterval(this.intervalId);
        }
    };
    componentDidMount() {
        this.intervalId = setInterval(this.timer, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        return(
            <div>{this.state.currentCount}</div>
        );
    }
}

export default  Clock;