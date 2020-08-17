import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LoadingOutlined } from '@ant-design/icons';
import { Button as MaterialButton } from '@material-ui/core';
import { message } from 'antd';
import service from '../../utils/Http';

const StyledButton = withStyles({
    root: {
        width: '121px',
        height: '35px',
        backgroundImage: 'linear-gradient(#E6D579, #D5B24D)',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        padding: '0',
    },
    label: {
        fontSize: '14px',
        color: '#FFFFFF',
    },
})(MaterialButton);

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeTime: 0, //验证码时间
            isGetCode: 0, //是否获取过验证码
            loading: false,
        };
    }

    //获取验证码
    getVerificationCode = (contactNumber) => {
        if (!contactNumber) {
            message.info('请输入手机号');
            return;
        }
        if (contactNumber.length !== 11) {
            message.info('手机号码格式不正确');
            return;
        }
        this.setState({
            loading: true,
        });
        this.sendSmsCode(contactNumber)
            .then((wait_time) => {
                this.setState({
                    isGetCode: true,
                    loading: false,
                });
                this.Countdown(wait_time);
            })
            .catch(() => {
                this.setState({
                    isGetCode: true,
                    loading: false,
                });
            });
    };

    //倒计时
    Countdown = (time) => {
        setTimeout(() => {
            if (time <= 0) {
                this.setState({
                    isGetCode: false,
                    codeTime: time,
                });
            }
            this.setState({
                codeTime: time - 1,
            });
            this.Countdown(time - 1);
        }, 1000);
    };

    //获取验证码
    sendSmsCode = (contactNumber) => {
        return new Promise((resolve, reject) => {
            service
                .postForm('/api/user/auth/send_sms_code', {
                    mobile: contactNumber,
                    category: 1, //业务类型 1注册 2修改密码 3安全校验 4提现 5 绑定手机号 6 更换手机号
                })
                .then((res) => {
                    if (res.status === 10000) {
                        this.setState({
                            codeTime: res.wait_time,
                        });
                        resolve(res.wait_time);
                    } else {
                        message.info(res.message);
                    }
                })
                .catch((err) => {
                    message.error('通讯失败，请重试');
                    console.log(err);
                    reject();
                });
        });
    };
    render() {
        return (
            <StyledButton
                disabled={this.state.isGetCode}
                onClick={() => {
                    this.getVerificationCode(
                        this.props.form.getFieldValue(this.props.indexId),
                    );
                }}
            >
                <div style={{}}>
                    {this.state.loading ? (
                        <LoadingOutlined />
                    ) : (
                        <div>
                            {this.state.isGetCode
                                ? this.state.codeTime + 's'
                                : '获取验证码'}
                        </div>
                    )}
                </div>
            </StyledButton>
        );
    }
}

export default Countdown;
