import React,{Component} from 'react';
import PropTypes from 'prop-types';

class TestComponent extends Component{
  static propTypes = {
    name: PropTypes.string.isRequired,    //必填
    num : PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    num: 666
  }

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return(
      <div>
        {this.props.children}
        {this.props.num}
      </div>
    )
  }
}

export default TestComponent
