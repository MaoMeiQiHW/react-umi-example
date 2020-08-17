import React,{Component} from 'react';

class User extends Component{
  constructor(props) {
    super(props);
    this.state={
      id:props.history.location.query.id
    };
  }

  render() {
    return(
      <div>
        上个页面传递的参数：{this.state.id}
      </div>
    )
  }
}

export default User
