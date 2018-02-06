import React from 'react';

class ErrorModal extends React.Component {
  render(){
    return (

      <div className="modal">
        <div className="content">
          <p>{this.props.errorMsg}</p>
        </div>
        <p className="close" onClick={this.props.errorReset}>close</p>
      </div>
    )
  }
}

export default ErrorModal;
