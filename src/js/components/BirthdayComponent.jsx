import React, { Component } from "react";
import DateComponent from './DateComponent';

class BirthdayComponent extends Component {
    constructor() {
        super();

        const urlParams = new URLSearchParams(window.location.search ? window.location.search.slice(1) : "");

        this.state = {
            title: "Herzlichen Glückwunsch " + urlParams.get('name') || "Max"
        };
    }

    componentDidMount() {
        document.querySelector('#app-spinner').remove();
    }

    render() {
        return (
            <section className="birthdayComp">
                <h1 className="title">{this.state.title}</h1>
                <div className="dateContainer">
                    <DateComponent />
                </div>
            </section>
        );
    }
}
export default BirthdayComponent;