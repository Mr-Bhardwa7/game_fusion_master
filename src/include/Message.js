import React, { Component } from 'react';

class Message extends Component {

 render() {

 	var message;
		if(this.props.message.errorMessage !== "" && this.props.message.successMessage === "")
		{
			message = <div className="alert alert-danger">
						<strong>Opps!</strong> {this.props.message.errorMessage}.
					</div>;
		}
		else if(this.props.message.errorMessage === "" && this.props.message.successMessage !== "") {

			message = <div className="alert alert-success">
						<strong>Opps!</strong> {this.props.message.successMessage}.
					</div>;
		}

    return (
	    <div>
	    {message}
	    </div>
    );
  }
}

export default Message;
