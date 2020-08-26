import React,{Component} from 'react';
import {connect} from 'dva';
import { history } from 'umi';
import { Button } from '@material-ui/core';
import styles from './index.module.scss';
import { withStyles } from '@material-ui/core/styles';
import * as Api from '../../api/common';

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

  componentDidMount(){
    const p1 = new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('ssss1');
      },1000)
    })

    const p4 = new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('ssss4');
      },4000)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject('ssss2');
      },500)
    })

    const p3 = new Promise((resolve, reject) => {
      setTimeout(()=>{
        console.log(222)
        reject('ssss3');
      },2000)
    });

    // Promise.any([p1,p2,p4,p3])                   //只要有一个为resolve则为then,否则catch
    //   .then((e)=>{console.log(e)})
    //   .catch(function (results) {
    //     console.log(results);
    //   })

    // Promise.race([p1,p2,p3]).then(result => console.log(result))   //第一个改变的状态为resolve则为then，第一个改变的状态为reject则为catch
    //   .catch(e => console.log(e));

    // Promise.all([p1, p4])   //全resolve才then否则catch
    //   .then(result => console.log(result))
    //   .catch(e => console.log(e));

    // Promise.allSettled([p1,p2]).then((v)=>{  //不管是否resolve全走then
    //   console.log(v)
    // })

    Promise.try(()=>{fetch('2222')}).then((e)=>{
      console.log(3**18)
    }).catch((e)=>{
      console.log(e)
    })
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
