import React, { Component } from 'react';
import swal from 'sweetalert';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import Popover from 'react-simple-popover';
import './GameTicTacToe.css';
import Circle from './TicCircle';
import Cross from './TicCross';
import avtar from './../assets/images/avtar.png';
import coins from './../assets/images/coins.svg';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

let a1Show,a2Show,a3Show;
let b1Show,b2Show,b3Show;
let c1Show,c2Show,c3Show;
var condition1 = ["a1","a2","a3"];
var condition2 = ["b1","b2","b3"];
var condition3 = ["c1","c2","c3"];
var condition4 = ["a1","b1","c1"];
var condition5 = ["a2","b2","c2"];
var condition6 = ["a3","b3","c3"];
var condition7 = ["a1","b2","c3"];
var condition8 = ["c1","b2","a3"];

class GameTicTacToe extends Component {
		constructor(props) {
		super(props);
		const me = this
		this.state = {
			playerTurn  : true,
			flag 		: true,
			reload      : true,
			player1     : [],
			player2     : [],
			arr         : [],
			cellTarget  : '',
			player1Name : '',
			player2Name : '',
			player1pic  : null,
			player2pic  : null,
			player1Win  : false,
			player2Win  : false,
			chat 		: '',
			sender		: null,
			open 		: false
		};

		socket.on("tictactoe state update", function(data) {
			    console.log('*****************SOCKET START*****************')
			    console.log("tictactoe state update", data);
				
			     	if(data.challengePlayer1 == localStorage.getItem('user-id') || data.challengePlayer2 == localStorage.getItem('user-id'))
			   		{
			   			if(data.lastPlayerMove != localStorage.getItem('user-id'))
			   			me.setCellId(data.cellTarget);
		  			}
		  		
		  }); 

		socket.on("tictactoe game leave update", function(data) {
			    console.log("tictactoe game leave update", data);


			var	player1Name = localStorage.getItem('challenge-player1name');
			var	player2Name = localStorage.getItem('challenge-player2name');
			  
			  	if(data.winStatus === 0)
				{
					if(localStorage.getItem('challenge-player2') === localStorage.getItem('user-id'))
		            {
			            swal("Congratulation!", `You win because ${player1Name} quit the game`, "success")
			            .then((success)=> {
			    	      	me.updateWinnerRecords(data.winStatus,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			        	});
			        } 
			        else if(localStorage.getItem('challenge-player1') === localStorage.getItem('user-id'))
			        {
			        	swal("Sorry!", `You quit the game`, "error")
			            .then((success)=> {
			    	      	me.updateWinnerRecords(data.winStatus,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			        	});
			        }
				}

				if(data.winStatus === 1)
				{
					if(localStorage.getItem('challenge-player1') === localStorage.getItem('user-id'))
		            {
			            swal("Congratulation!", `You win because ${player2Name} quit the game`, "success")
			            .then((success)=> {
			    	      	me.updateWinnerRecords(data.winStatus,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			        	});
			        } 
			        else if(localStorage.getItem('challenge-player2') === localStorage.getItem('user-id'))
			        {
			        	swal("Sorry!", `You quit the game`, "error")
			            .then((success)=> {
			    	      	me.updateWinnerRecords(data.winStatus,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			        	});
			        }
				}
			    
		  });

		socket.on("chat-reply", function(data) {
			console.log("chat-reply",data.receiver);
			if (data.game === localStorage.getItem("challenge-game") && data.gameOption === localStorage.getItem("challenge-gameOption")) {
				me.setState({
					chat     : data.msg,
					sender 	 : data.sender
					},() => {
							me.handleClick();
					});
			}
		});
		 
	}

	componentWillMount(){
			var self = this;
			new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/tictactoe',{
							player1 : localStorage.getItem('challenge-player1'),
							player2 : localStorage.getItem('challenge-player2')
						})
						.then((response)=> {
							console.log(response.data.data);
							if(response.data.error === false)
							{
								if(response.data.data[0].id == localStorage.getItem('challenge-player1'))
								{
									localStorage.setItem('challenge-player1pic',response.data.data[0].userProfilePath);
									localStorage.setItem('challenge-player1name',response.data.data[0].userName);
									localStorage.setItem('challenge-player2pic',response.data.data[1].userProfilePath);
									localStorage.setItem('challenge-player2name',response.data.data[1].userName);

									self.setState({
										player1Name : response.data.data[0].userName,
										player2Name : response.data.data[1].userName,
										player1pic  : response.data.data[0].userProfilePath,
										player2pic  : response.data.data[1].userProfilePath
									}, () => {console.log("state", self.state)})
								}

								if(response.data.data[0].id == localStorage.getItem('challenge-player2'))
								{
									localStorage.setItem('challenge-player2pic',response.data.data[0].userProfilePath);
									localStorage.setItem('challenge-player2name',response.data.data[0].userName);
									localStorage.setItem('challenge-player1pic',response.data.data[1].userProfilePath);
									localStorage.setItem('challenge-player1name',response.data.data[1].userName);
								
									self.setState({
										player1Name : response.data.data[1].userName,
										player2Name : response.data.data[0].userName,
										player1pic  : response.data.data[1].userProfilePath,
										player2pic  : response.data.data[0].userProfilePath
									}, () => console.log("state", self.state))


								}
							}
							else {
								self.props.updateSession(true);
								self.props.history.push('/login');
							}
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
							 });	
				});
			
				this.idleTimer();

		}


	updateCheckItem = (targetId,playerTurn) => {
		
		if (this.state.playerTurn === true) {
			this.state.arr.push(targetId);
			this.state.player1.push(targetId);
		}
		if (this.state.playerTurn === false) {
			this.state.arr.push(targetId);
			this.state.player2.push(targetId);
		}
		this.changePlayerTurn(playerTurn);
	}

	allocatingComponent = (targetId,playerTurn) => {
			console.log("playerTurn", playerTurn,this.state.playerTurn)
		if (playerTurn === true) {


			switch(targetId)
   			{
            	case 'a1':
					a1Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;
            

        		case 'a2':
        			a2Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

        		case 'a3':
            		a3Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

        		case 'b1':
					b1Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);          
					break;
       
       			case 'b2':
       				b2Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'b3':
       				b3Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c1':
       				c1Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c2':
       				c2Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c3':
       				c3Show = <Circle/>;
					this.updateCheckItem(targetId,playerTurn);
					break;
            }

		 
	    }

	    if (playerTurn === false) {

	    	switch(targetId)
   			{
            	case 'a1':
					a1Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
            		break;

        		case 'a2':
        			a2Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

        		case 'a3':
            		a3Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

        		case 'b1':
					b1Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);          
					break;
       
       			case 'b2':
       				b2Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'b3':
       				b3Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c1':
       				c1Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c2':
       				c2Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;

       			case 'c3':
       				c3Show = <Cross/>;
					this.updateCheckItem(targetId,playerTurn);
					break;
            }
	    }
	    	
	    	

	}

	checkItemExist = (targetId) => {

		if(this.state.arr.length === 0)
		{
			this.allocatingComponent(targetId,this.state.playerTurn);
		}
		else {
			
			var checkItem = this.state.arr.includes(targetId);
			if (checkItem === false) {
				this.allocatingComponent(targetId,this.state.playerTurn);
			}
		}
		
	}


	getCellId = (e) => {
		console.log('*****************DEFAULT START*****************')
		let divID = e.target.id;
		
		// Player1
		if (this.state.playerTurn === true && localStorage.getItem('challenge-player1') === localStorage.getItem('user-id')) {
				this.setState({
					cellTarget : divID,
					flag : true
				}, () => {
				    this.checkItemExist(divID);
				    if(this.state.player1.length >= 1)
			        {
			        	this.player1_winner();
			        }
			        if(this.state.player2.length >= 1)
			        {
			        	 this.player2_winner();
			        }

			        if(this.state.arr.length > 8 && this.state.player1Win === false && this.state.player2Win === false)
			        {
			        	swal("Oops!", "Match Draw", "info")
			        	.then((success) => {
		         			this.updateWinnerRecords(null,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			        	});
			        }
				});
				
			}
			// Player2
			if (this.state.playerTurn === false && localStorage.getItem('challenge-player2') === localStorage.getItem('user-id')) {
				this.setState({
					cellTarget : divID,
					flag : true
				}, () => {
				    this.checkItemExist(divID);
				    if(this.state.player1.length >= 1)
			        {
			            this.player1_winner();
			        }
			        if(this.state.player2.length >= 1)
			        {
			            this.player2_winner();
			        }

			        if(this.state.arr.length > 8 && this.state.player1Win === false && this.state.player2Win === false)
			        {
			        	swal("Oops!", "Match Draw", "info")
			        	.then((success) => {
		         			this.updateWinnerRecords(null,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));

			        	});
			        }
				})
			}

	}


	setCellId = (target) => {
		console.log('setCellId hit')
		let divID = target;
		this.setState({flag : false})

		// Player1
		if (this.state.playerTurn === true) {
			 this.checkItemExist(divID);
			 if(this.state.player1.length >= 1)
	        {
	            this.player1_winner();
	        }
	        if(this.state.player2.length >= 1)
	        {
	            this.player2_winner();
	        }

	        if(this.state.arr.length > 8 && this.state.player1Win === false && this.state.player2Win === false)
	        {
	        	swal("Oops!", "Match Draw", "info")
	        	.then((success) => {
		         this.updateWinnerRecords(null,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
	        	});
	        }
		}

		// Player2
		if (this.state.playerTurn === false) {
			 this.checkItemExist(divID);
			 if(this.state.player1.length >= 1)
	        {
	            this.player1_winner();
	        }
	        if(this.state.player2.length >= 1)
	        {
	            this.player2_winner();
	        }

	        if(this.state.arr.length > 8 && this.state.player1Win === false && this.state.player2Win === false)
	        {
	        	swal("Oops!", "Match Draw", "info")
	        	.then((success) => {
		         this.updateWinnerRecords(null,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));

	        	});
	        }
		}

	}
	
	
	changePlayerTurn = () => {
		var i;
		console.log("change player hit")
		this.setState({
			playerTurn : !this.state.playerTurn
		}, () => {
		console.log("change player hit on success",this.state)

			var tableCell = document.getElementsByClassName('table-cell');
			if(this.state.playerTurn === true)
				{
					for(i = 0; i<tableCell.length; i++)
					{
						tableCell[i].classList.add("table-cell-palyer1");
						tableCell[i].classList.remove("table-cell-palyer2"); 			
					}
				} 
			if(this.state.playerTurn === false)
				{
					
					for(i = 0; i<tableCell.length; i++)
					{
						tableCell[i].classList.add("table-cell-palyer2"); 
						tableCell[i].classList.remove("table-cell-palyer1"); 			
					} 
				}

				if(this.state.flag === true)
				{
					console.log("socket emit hit");

					socket.emit('tictactoe state', {
						challengePlayer1 : localStorage.getItem('challenge-player1'),
						challengePlayer2 : localStorage.getItem('challenge-player2'),
						cellTarget : this.state.cellTarget,
						lastPlayerMove : localStorage.getItem('user-id')
					}, () => {

					this.setState({flag : false})
					});

				}

				console.log('*****************THE-END*****************')

		});
	}

	checkWinner = (first, condition) => {
	    first.sort();
	    condition.sort();
	    var i, j;
	    for (i=0,j=0; i<first.length && j<condition.length;) {
	        if (first[i] < condition[j]) {
	            ++i;
	        } else if (first[i] === condition[j]) {
	            ++i; ++j;
	        } else {
	            return false;
	        }
	    }
	    return j === condition.length;
	}


	player1_winner = () =>	{
	    var player1_cond1 = this.checkWinner(this.state.player1, condition1);
	    var player1_cond2 = this.checkWinner(this.state.player1, condition2);
	    var player1_cond3 = this.checkWinner(this.state.player1, condition3);
	    var player1_cond4 = this.checkWinner(this.state.player1, condition4);
	    var player1_cond5 = this.checkWinner(this.state.player1, condition5);
	    var player1_cond6 = this.checkWinner(this.state.player1, condition6);
	    var player1_cond7 = this.checkWinner(this.state.player1, condition7);
	    var player1_cond8 = this.checkWinner(this.state.player1, condition8);

	    if(player1_cond1 || player1_cond2 || player1_cond3 || player1_cond4 || player1_cond5 || player1_cond6 || player1_cond7 || player1_cond8)
	        {
				console.log("winner 1 hit if",this.state.player1)
				this.setState({
					player1Win : true,
					player2Win : false
				}, () => {

		            if(localStorage.getItem('challenge-player1') === localStorage.getItem('user-id'))
		            {
			            swal("Congratulation!", `You win`, "success")
			            .then((success)=> {
			            	this.updateWinnerRecords(1,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			            });
			        } 
			        else if(localStorage.getItem('challenge-player2') === localStorage.getItem('user-id'))
			        {
			        	swal("Sorry!", `You loss`, "error")
			            .then((success)=> {
			            	this.updateWinnerRecords(1,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			            });
			        }
		        });	             
	        }

	}

	player2_winner = () => {
	    var player2_cond1 = this.checkWinner(this.state.player2, condition1);
	    var player2_cond2 = this.checkWinner(this.state.player2, condition2);
	    var player2_cond3 = this.checkWinner(this.state.player2, condition3);
	    var player2_cond4 = this.checkWinner(this.state.player2, condition4);
	    var player2_cond5 = this.checkWinner(this.state.player2, condition5);
	    var player2_cond6 = this.checkWinner(this.state.player2, condition6);
	    var player2_cond7 = this.checkWinner(this.state.player2, condition7);
	    var player2_cond8 = this.checkWinner(this.state.player2, condition8);

	    if(player2_cond1 || player2_cond2 || player2_cond3 || player2_cond4 || player2_cond5 || player2_cond6 || player2_cond7 || player2_cond8)
	        {
				console.log("winner 2 hit if",this.state.player2);
				this.setState({
					player1Win : false,
					player2Win : true
				}, () => {

					 if(localStorage.getItem('challenge-player2') === localStorage.getItem('user-id'))
		            {
			        	 swal("Congratulation!", `You Win`, "success")
			            .then((success)=> {
			            	this.updateWinnerRecords(0,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			            });
			        }
			        else if(localStorage.getItem('challenge-player1') === localStorage.getItem('user-id'))
		            {
		            	swal("Sorry!", `You Loss`, "error")
			            .then((success)=> {
			            	this.updateWinnerRecords(0,localStorage.getItem('challenge-game'),localStorage.getItem('challenge-gameOption'));
			            });
		            }

				});
	        }   
	}

		updateWinnerRecords = (winStatus, gameId, gameOptionId) => {
		if(localStorage.getItem('challenge-gameStatus') === '0' && localStorage.getItem('challenge-game') === '1')
		{
			new Promise((resolve,reject) => {
							const instance = axios.create({
							  timeout: 1000,
								  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
							});
							instance.post(baseUrl + '/api/game-result',{
								player1 : localStorage.getItem('challenge-player1'),
								player2 : localStorage.getItem('challenge-player2'),
								winStatus : winStatus,
								game : gameId,
								gameOption : gameOptionId
							})
							.then((response)=> {
								
								if(response.data.error === false)
								{	
									localStorage.setItem('challenge-gameStatus',1);
									localStorage.setItem('winStatus',winStatus);
									this.props.updateSession(true);
		            				this.props.history.push('/result');
								}

								resolve();
							})
							.catch(function (error) {
							  console.log(error);
							 });			
					});
		}
	}

	leaveMatch = () => {
		this.setState({
			reload : false
			},() => {
			if(localStorage.getItem('challenge-gameStatus') === '0' && localStorage.getItem('challenge-game') === '1')
			{
				var player = localStorage.getItem('challenge-player1');

				var winStatus;

				if(player == localStorage.getItem('user-id'))
				{
					winStatus = 0;
				} else 
				{
					winStatus = 1;
				}


				socket.emit('tictactoe game leave', { 
						winStatus : winStatus
					});	
				
			} else {
				this.props.updateSession(true);
			    this.props.history.push('/');
			}
		});
	}

	// on idle player leave function
	idleTimer = () => {
	    var t;	 
	    window.onmousemove = resetTimer; // catches mouse movements
	    window.onmousedown = resetTimer; // catches mouse movements
	    window.onclick = resetTimer;     // catches mouse clicks

	    function logout() {
	        swal("Oops!", "Session has been idle over its time limit...", "error")
	        .then((success) => {

			if(localStorage.getItem('challenge-gameStatus') === '0' && localStorage.getItem('challenge-game') === '1')
			{
				var player = localStorage.getItem('challenge-player1');

				var winStatus;

				if(player == localStorage.getItem('user-id'))
				{
					winStatus = 0;
				} else 
				{
					winStatus = 1;
				}


				socket.emit('tictactoe game leave', { 
						winStatus : winStatus
					});	
				
			} else {
				window.location = '/';
			}
		});
	      
	}


	   function resetTimer() {
	   		clearTimeout(t);
	        t = setTimeout(logout, 120000);  // time is in mil
	    }
	}
	
	componentWillUnmount()
    {
    	if (this.state.reload == true) {
	    	window.addEventListener("beforeunload", (ev) => 
			{  
			    ev.preventDefault();
			    return ev.returnValue = 'Are you sure you want to leave?';
			});
	    }
    }

    chat = (e) => {
		socket.emit('chat-invoked',{ 
			msg        : e.target.innerHTML,
			sender     : localStorage.getItem("user-id"),
			game       : localStorage.getItem("challenge-game"),
			gameOption : localStorage.getItem("challenge-gameOption")
		 });
	}

	 handleClick = (e) => {
	    this.setState({open: !this.state.open},()=>{
	    	setTimeout(()=> {this.setState({open : false})},2000);
	    });

	 }


	render() {
		window.history.forward(1);

		var amount = 0;
		var pic1, pic2;
		var player1chat,player2chat;
		var player1name = this.state.player1Name;
		var player2name = this.state.player2Name;

		if(localStorage.getItem('challenge-gameOption'))
		{
			if(localStorage.getItem('challenge-gameOption') === '1')
				amount = 20;

			if(localStorage.getItem('challenge-gameOption') === '2')
				amount = 100;

			if(localStorage.getItem('challenge-gameOption') === '3')
				amount = 200;

		}

		if (this.state.player1pic !== null) {
			var image = `http://localhost:5000/${this.state.player1pic}`;
	  		pic1 = <img src={image} alt={player1name} className="userImg" />; 
	  	}else{
	  		pic1 = <img src = {avtar} alt="" className="userImg" />;
	  	}

	  	if (this.state.player2pic !== null) {
			var image = `http://localhost:5000/${this.state.player2pic}`;
	  		pic2 = <img src={image} alt={player2name} className="userImg" />; 
	  	}else{
	  		pic2 = <img src = {avtar} alt="" className="userImg" />;
	  	}

		if(this.state.sender === localStorage.getItem('challenge-player1'))
	  	{
	  		console.log("msg",this.state);
	  		player1chat = <div className = "player1chat">
								        <a
								          className="button"
								          ref="target"
								          onClick={this.handleClick.bind(this)}></a>
								        <Popover
								          placement='right'
								          container={this}
								          target={this.refs.target}
								          show={this.state.open} >
								          
											<div>{this.state.chat}</div>
										
								        </Popover>
				      				</div>;
	  	}

	  	if(this.state.sender === localStorage.getItem('challenge-player2'))
	  	{
	  		console.log("msg2",this.state);
	  		player2chat = <div className = "player2chat">
								       		 <a
								          className="button"
								          ref="target"
								          onClick={this.handleClick.bind(this)}></a>
								        <Popover
								          placement='left'
								          container={this}
								          target={this.refs.target}
								          show={this.state.open} >
								          
											<div>{this.state.chat}</div>
										
								        </Popover>
			      						</div>;
	  	}
	

		return(
				<section id="gameTicTacToe">
					<div className="dropdown">
					  <button className="btn btn-toggle" type="button" onClick={this.leaveMatch}><i className="fa fa-times bar-toggle"></i> <span className="fa fa-sign-out  leave-toggle">Leave</span></button>
					</div>
					<div className="message">	
					<div className="dropdown">
						<button className="btn btn-toggle"><i className="fa fa-comments-o" id = "icon"></i> </button>
						<div className="dropdown-content">
							<a onClick = {this.chat}>Best of Luck</a>
							<a onClick = {this.chat}>Nice Move</a>
							<a onClick = {this.chat}>Good Luck</a>
							<a onClick = {this.chat}>Your good!</a>
							<a onClick = {this.chat}>Oops</a>
							<a onClick = {this.chat}>Unlucky</a>
							<a onClick = {this.chat}>Nice try</a>
							<a onClick = {this.chat}>Hello!</a>
							<a onClick = {this.chat}>Well played</a>
							<a onClick = {this.chat}>Thanks</a>
							<a onClick = {this.chat}>Hehe</a>
							<a onClick = {this.chat}>Good game</a>
							<a onClick = {this.chat}>One more game?</a>
							<a onClick = {this.chat}>Close!</a>
						</div>
					</div>
				</div> 
					<div className="container">
						<div className="mainbox gamebox">
							<div className = "row">
								<div className = "col-md-6">
									<div className="user1">
							           {pic1}
							           {player1chat}
						            </div>
						            <span className="player1-color"></span>
						            <span className="palyer1-name">{player1name}</span>
								</div>
								<div className = "col-md-6">
								
									<div className="user2">
							    	    {pic2}
							    	    {player2chat}
						            </div>
						            <span className="player2-color"></span>
						            <span className="palyer2-name">{player2name}</span>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div className="board">
										 <div className="table">
							                <div className="table-row">
							                    <div className="table-cell" id="a1" onClick= {this.getCellId}>{a1Show}</div>
							                    <div className="table-cell" id="a2" onClick= {this.getCellId}>{a2Show}</div>
							                    <div className="table-cell" id="a3" onClick= {this.getCellId}>{a3Show}</div>
							                </div>
							                 <div className="table-row">
							                    <div className="table-cell" id="b1" onClick= {this.getCellId}>{b1Show}</div>
							                    <div className="table-cell" id="b2" onClick= {this.getCellId}>{b2Show}</div>
							                    <div className="table-cell" id="b3" onClick= {this.getCellId}>{b3Show}</div>
							                </div>
							                 <div className="table-row">
							                    <div className="table-cell" id="c1" onClick= {this.getCellId}>{c1Show}</div>
							                    <div className="table-cell" id="c2" onClick= {this.getCellId}>{c2Show}</div>
							                    <div className="table-cell" id="c3" onClick= {this.getCellId}>{c3Show}</div>
							                </div>
							            </div>
									</div>
								</div>
							</div>
							<div className="rectangleBox">
								<img src={coins}  className="coins1" alt=""/>
								<span>{amount}</span>
							</div>
						</div>
					</div>
				</section>
			);
	}
}

export default GameTicTacToe;