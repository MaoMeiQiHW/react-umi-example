import React from 'react';
import classNames from 'classNames';
import styles from './index.module.scss';
import time from '../../assets/time.png';
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00',
        };
    }
    componentDidMount() {
        if (this.props.endTime) {
            let endTime = this.props.endTime.replace(/-/g, '/');
            this.countFun(endTime);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.endTime !== prevProps.endTime) {
            let endTime = this.props.endTime.replace(/-/g, '/');
            clearInterval(this.timer);
            this.countFun(endTime);
        }
    }

    //组件卸载时，取消倒计时
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countFun = (time) => {
        let end_time = new Date(time).getTime(),
            sys_second = end_time - new Date().getTime();
        this.timer = setInterval(() => {
            //防止倒计时出现负数
            if (sys_second > 1000) {
                sys_second -= 1000;
                let day = Math.floor(sys_second / 1000 / 3600 / 24);
                let hour = Math.floor((sys_second / 1000 / 3600) % 24);
                let minute = Math.floor((sys_second / 1000 / 60) % 60);
                let second = Math.floor((sys_second / 1000) % 60);
                this.setState(
                    {
                        day: day < 10 ? '0' + day : day,
                        hour: hour < 10 ? '0' + hour : hour,
                        minute: minute < 10 ? '0' + minute : minute,
                        second: second < 10 ? '0' + second : second,
                    },
                    () => {},
                );
            } else {
                clearInterval(this.timer);
                //倒计时结束时，触发父组件的方法
                if (this.props.timeOver) {
                    this.props.timeOver();
                }
            }
        }, 1000);
    };
    render() {
        return (
            <div className={classNames(styles.countdown, styles.flexRow)}>
                <img src={time} className={styles.timeIcon} />
                <div className={styles.activityTime}>活动倒计时：</div>
                <div className={styles.timeText}>{this.state.day}</div>
                <div className={styles.countdownText}>天</div>
                <div className={styles.timeText}>{this.state.hour}</div>
                <div className={styles.countdownText}>时</div>
                <div className={styles.timeText}>{this.state.minute}</div>
                <div className={styles.countdownText}>分</div>
                <div className={styles.timeText}>{this.state.second}</div>
                <div className={styles.countdownText}>秒</div>
            </div>
        );
    }
}
