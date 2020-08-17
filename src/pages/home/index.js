import React,{Component} from 'react';
import {connect} from 'dva';
import { history } from 'umi';
import { Button } from '@material-ui/core';
import styles from './index.module.scss';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    background:'#ff0000'
  },
  label: {
    width: 'auto',
    color: '#FFFFFF',
    fontSize: '18px',
  },
})(Button);

class App extends Component{
  constructor(props) {
    super(props);
    this.state={

    };
    this.handClick = this.handClick.bind(this)
    this.handClick1 = this.handClick1.bind(this)
  }

  handClick=()=>{
    this.props.dispatch({
      type: 'example/fetch',
      payload: { num: this.props.num+1 },
    });
  }

  handClick1=()=>{
    history.push({
      pathname: '/User',
      query: {
        id:this.props.num,
      },
    });
  }

  render() {
    const {num} = this.props;
    return(
      <div className={styles.App}>
        <div>
          <StyledButton onClick={this.handClick}>加一</StyledButton>
        </div>
        <div>
          {num}
        </div>
        <div onClick={this.handClick1}>带参数跳转</div>
      </div>
    )
  }
}

export default connect(({ example }) => ({
  num: example.num
}))(App)
