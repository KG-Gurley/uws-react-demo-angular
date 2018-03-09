import React, { Component } from 'react';
import '../css/app.css';

export default class Messenger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: window.innerHeight
        };

        this._onResize = this._onResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this._onResize);
    }

    componentWillMount() {
        window.removeEventListener('resize', this._onResize);
    }

    _onResize() {
        this.setState({
            height: window.innerHeight
        });
    }

    render() {
        const { height } = this.state;
        const style = {
            height: height
        };
        return (
            <div style={style} className="app-messenger">
                <div className="header">Header</div>
                <div className="main">
                    <div className="sidebar-left">Left sidebar</div>
                    <div className="content">Content</div>
                    <div className="sidebar-right">Right sidebar</div>
                </div>
            </div>
        );
    }
}
