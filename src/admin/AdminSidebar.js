import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import coins from './../assets/images/coins.svg';

export default class Adminsidebar extends Component{
	constructor(props)
	{
		super(props);
		this.state ={
			active1 : '',
			active2 : '',
			active3 : '',
			active4 : '',
			active5 : ''
		}
	}

	componentWillMount(){
		let path = window.location.href;
        var pathIndex = path.split('/');
        if (pathIndex[4]	==='dashboard'){ this.setState({active1 : 'active'}) }
        if(pathIndex[4]	==='offer'){ this.setState({active2 : 'active'}) }
        if(pathIndex[4]	==='offer-details'){ this.setState({active3 : 'active'}) }
        if (pathIndex[4]	==='user-details') { this.setState({active4 : 'active'}) }
        if (pathIndex[4]	==='payment-details') { this.setState({active5 : 'active'}) }
	}

	render() {
		var active1 = this.state.active1;
		var active2 = this.state.active2;
		var active3 = this.state.active3;
		var active4 = this.state.active4;
		var active5 = this.state.active5;
		
		return (

			<div className="list-group">
				<Link to="/admin/dashboard">
				<label className={`list-group-item ${active1}`}>
				<i className="fa fa-tachometer"></i> Dashboard</label>
				</Link>

				<Link to="/admin/offer">
				<label className={`list-group-item ${active2}`}>
				<img src={coins} className="coins pull-right" alt="" /> Add Coins Offer</label>
				</Link>

				<Link to="/admin/offer-details">
				<label className={`list-group-item ${active3}`}> 
				<img src={coins} className="coins pull-right" alt="" /> Offer Details</label>
				</Link>

				<Link to="/admin/user-details">
				<label className={`list-group-item ${active4}`}>
				<i className="fa fa-users icons pull-right"></i> User Details</label>
				</Link>

				<Link to="/admin/payment-details">
				<label className={`list-group-item ${active5}`}>
				<i className="fa fa-cc-paypal icons pull-right" ></i> Payment Details</label>
				</Link>
			</div>

		);
	}
}