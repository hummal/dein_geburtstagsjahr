import React from "react";
import Config from '../../../config/config.json';
import moment from 'moment';


class DateComponent extends React.Component {
    constructor() {
        super();

        const urlParams = new URLSearchParams(window.location.search ? window.location.search.slice(1) : "");

        this.personName = urlParams.get('name') || "Max";
        this.startDate = urlParams.get('date') ? new Date(urlParams.get('date')) : Date.now();
        this.startMoment = moment(this.startDate);
        this.duration = 0;
        //this.updateDuration(true);
        this.state = {
            days: 0,
            weeks: 0,
            weeksShown: false,
            months: 0,
            monthsShown: false,
            years: 0,
            yearsShown: false,
        };
    }

    componentDidMount() {
        this.updateDuration();
        setInterval(() => {
            this.updateDuration();
        }, 60000);
    }

    updateDuration() {
        const nowMoment = moment();
        this.duration = moment.duration(nowMoment.diff(this.startMoment));

        const dayCount = this.duration.days() + 1; // +1 because we want today is counted aswell
        const weekCount = Math.floor(dayCount / 7) % 4 + 1;
        const monthCount = Math.floor(dayCount / 30.417);
        const yearCount = Math.floor(monthCount / 12);

        this.setState((state, props) => {
            return {
                days: dayCount % 7,
                weeks: weekCount,
                weeksShown: weekCount > 0,
                months: monthCount,
                monthsShown: monthCount > 0,
                years: yearCount,
                yearsShown: yearCount > 0,
            }
        });

        return this;
    }

    render() {
        const showWeeks = this.state.weeksShown ? "show" : "hide";
        const showMonths = this.state.monthsShown ? "show" : "hide";

        return (
            <div className="dateComponent">
                <div className="counter">
                    <div className="datePart">
                        Es ist der <span className="label"><span className="amount days">{this.state.days}.</span>Tag</span>
                    </div>
                    <div className={"datePart " + showWeeks}>
                        der <span className="label"><span className="amount weeks">{this.state.weeks}.</span>Woche</span>
                    </div>
                    <div className={"datePart " + showMonths}>
                        des <span className="label "><span className="amount months">{this.state.months}.</span>Monats</span>
                    </div>
                </div>
                <div className="ending">deines Geburtstagsjahres</div>
            </div>
        );
    }
}
export default DateComponent;