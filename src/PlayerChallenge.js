import React, {Component} from 'react';
import './PlayerChallenge.css';
import {baseUrl} from './helpers/envHelper';
import axios from 'axios';


//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

class PlayerChallenge extends Component {
constructor(props)
{
	super(props);
	this.state = {
		onlineUser : [],
		game : 0,
		gameOption : 0
	}

}
	componentWillMount(){
			var self = this;
			let path = window.location.href;
		    var pathIndex = path.split('/');
		    if(pathIndex[4] && pathIndex[4] === 1 || 2)
		    {
		    	self.setState({
		    		game : pathIndex[4]
		    	}, () => {console.log("success", this.state.game)})
		    }
		    if(pathIndex[5] && pathIndex[5] === 1 || 2 || 3)
		    {
		    	self.setState({
		    		gameOption : pathIndex[5]
		    	}, () => {console.log("success", this.state.gameOption)})
		    }

			new Promise((resolve,reject) => {
				const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/challenge',{data : this.props.onlineUser})
						.then((response)=> {
							console.log("componentWillMount response",response.data.data);
							if(response.data.error === false)
							{
								console.log("show",response.data.data);
								self.setState({
									onlineUser : response.data.data
								}, () => {	
								localStorage.setItem('onlineUser',JSON.stringify(response.data.data));
								});

							}
							else {
								self.props.history.push('/login');
							}
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
							 });

						
						
				});
		}

		challenge = (e) => {
			console.log(e.target.id);
			new Promise((resolve,reject) => {
				const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/user-challenge',{
								player1: localStorage.getItem('user-id'),
								player2 : e.target.id, 
								game : this.state.game, 
								gameOption : this.state.gameOption
							})
						.then((response)=> {
							console.log(response.data.data);
							if(response.data.error === false)
							{
								// console.log("show",response.data.data);
								socket.emit('challenge request', { 
									player1_Name : localStorage.getItem('user-name'),
									player1: localStorage.getItem('user-id'),
									player2 : response.data.data.player2_id,
									game : response.data.data.gameId,
									gameOption : response.data.data.gameOptionId,
									challengeStatus : response.data.data.challengeStatus

								});								
							}
							else {
								this.props.history.push('/login');
							}
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
							 });	
				});
		}

	render() {

		var onlineUser = this.state.onlineUser;
		console.log("render", onlineUser)
		var profileExist;
		if(onlineUser !==  null)
		var showUser = onlineUser.map((title,index) => {

			if(title.userEmail !== localStorage.getItem('user-email'))
			{
				if(title.userProfilePath !== null)
				{
					var image = `${baseUrl}/${title.userProfilePath}`
					profileExist = <div className="col-lg-2 col-md-4 col-sm-6 col-6 online agileinfo-team-grid p-0">
						                    <img src={image} alt={title.userName} />;
						                    <div className="captn">
						                    	<h4>{title.userName}</h4>
						                        <div className="w3l-social">
						                            <button className="btn btn-success" id={title.id} onClick={this.challenge}>Challenge</button>
						                        </div>
						                        <h5>{title.userUniqueID}</h5>
						                    </div>
								        </div>;
				} else 
				{
					profileExist = <div className="col-lg-2 col-md-4 col-sm-6 col-6 w3l-thead d-flex online agileinfo-team-grid justify-content-center">
								            <h3 className="align-self-center text-white">{title.userName}</h3>
								            <div className="captn">
						                        <div className="w3l-social">
						                            <button className="btn btn-success" id={title.id} onClick={this.challenge}>Challenge</button>
						                        </div>
						                        <h5>{title.userUniqueID}</h5>
						                    </div>
								        </div>;

				}

				return 	profileExist;
			}
		});

		return(

				<section id="player_challenge" className="challenge">
					<div className="challenge_header"></div>
					<div className="container">
						<div className="mainbox">
									            
								    <div className="row">
								                
								       {showUser} 	
						            </div>
						</div>
					</div>
				</section>
			);
	}
}

export default PlayerChallenge;