import React, {Component} from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import swal from 'sweetalert';
import Popover from 'react-simple-popover';
import './GameChainReaction.css';
import ChainCircle from './ChainCircle';
import ChainCircleOne from './ChainCircleOne';
import ChainCircleTwo from './ChainCircleTwo';
import ChainCircleThree from './ChainCircleThree';
import ChainCircleFour from './ChainCircleFour';
import ChainCircleFive from './ChainCircleFive';
import ChainCircleSix from './ChainCircleSix';
import avtar from './../assets/images/avtar.png';
import coins from './../assets/images/coins.svg';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

let a1Show,a2Show,a3Show,a4Show,a5Show,a6Show,b1Show,b2Show,b3Show,b4Show,b5Show,b6Show;
let c1Show,c2Show,c3Show,c4Show,c5Show,c6Show,d1Show,d2Show,d3Show,d4Show,d5Show,d6Show;
let e1Show,e2Show,e3Show,e4Show,e5Show,e6Show;
var i;
class GameChainReaction extends Component {
	constructor(props) {
		super(props);
		const me = this
		this.state = {
			playerTurn  : true,
			flag 	    : true,
			reload 	    : true,
			continue    : false,
			cellTarget  : '',
			player1Name : '',
			player2Name : '',
			player1pic  : null,
			player2pic  : null,
			chat        : "",
			sender 		: null,
			open        : false,
			player1 : [
				{
					"id" : "a1",
					"hit" : 0
				},
				{
					"id" : "a2",
					"hit" : 0
				},
				{
					"id" : "a3",
					"hit" : 0
				},
				{
					"id" : "a4",
					"hit" : 0
				},
				{
					"id" : "a5",
					"hit" : 0
				},
				{
					"id" : "a6",
					"hit" : 0
				},
				{
					"id" : "b1",
					"hit" : 0
				},
				{
					"id" : "b2",
					"hit" : 0
				},
				{
					"id" : "b3",
					"hit" : 0
				},
				{
					"id" : "b4",
					"hit" : 0
				},
				{
					"id" : "b5",
					"hit" : 0
				},
				{
					"id" : "b6",
					"hit" : 0
				},
				{
					"id" : "c1",
					"hit" : 0
				},
				{
					"id" : "c2",
					"hit" : 0
				},
				{
					"id" : "c3",
					"hit" : 0
				},
				{
					"id" : "c4",
					"hit" : 0
				},
				{
					"id" : "c5",
					"hit" : 0
				},
				{
					"id" : "c6",
					"hit" : 0
				},
				{
					"id" : "d1",
					"hit" : 0
				},
				{
					"id" : "d2",
					"hit" : 0
				},
				{
					"id" : "d3",
					"hit" : 0
				},
				{
					"id" : "d4",
					"hit" : 0
				},
				{
					"id" : "d5",
					"hit" : 0
				},
				{
					"id" : "d6",
					"hit" : 0
				},
				{
					"id" : "e1",
					"hit" : 0
				},
				{
					"id" : "e2",
					"hit" : 0
				},
				{
					"id" : "e3",
					"hit" : 0
				},
				{
					"id" : "e4",
					"hit" : 0
				},
				{
					"id" : "e5",
					"hit" : 0
				},
				{
					"id" : "e6",
					"hit" : 0
				}
			],
			player2 : [
				{
					"id" : "a1",
					"hit" : 0
				},
				{
					"id" : "a2",
					"hit" : 0
				},
				{
					"id" : "a3",
					"hit" : 0
				},
				{
					"id" : "a4",
					"hit" : 0
				},
				{
					"id" : "a5",
					"hit" : 0
				},
				{
					"id" : "a6",
					"hit" : 0
				},
				{
					"id" : "b1",
					"hit" : 0
				},
				{
					"id" : "b2",
					"hit" : 0
				},
				{
					"id" : "b3",
					"hit" : 0
				},
				{
					"id" : "b4",
					"hit" : 0
				},
				{
					"id" : "b5",
					"hit" : 0
				},
				{
					"id" : "b6",
					"hit" : 0
				},
				{
					"id" : "c1",
					"hit" : 0
				},
				{
					"id" : "c2",
					"hit" : 0
				},
				{
					"id" : "c3",
					"hit" : 0
				},
				{
					"id" : "c4",
					"hit" : 0
				},
				{
					"id" : "c5",
					"hit" : 0
				},
				{
					"id" : "c6",
					"hit" : 0
				},
				{
					"id" : "d1",
					"hit" : 0
				},
				{
					"id" : "d2",
					"hit" : 0
				},
				{
					"id" : "d3",
					"hit" : 0
				},
				{
					"id" : "d4",
					"hit" : 0
				},
				{
					"id" : "d5",
					"hit" : 0
				},
				{
					"id" : "d6",
					"hit" : 0
				},
				{
					"id" : "e1",
					"hit" : 0
				},
				{
					"id" : "e2",
					"hit" : 0
				},
				{
					"id" : "e3",
					"hit" : 0
				},
				{
					"id" : "e4",
					"hit" : 0
				},
				{
					"id" : "e5",
					"hit" : 0
				},
				{
					"id" : "e6",
					"hit" : 0
				},
			],
			moves:[0,0]
		};

		socket.on("chainreaction state update", function(data) {
			    console.log('*****************SOCKET START*****************')
			    console.log("chainreaction state update", data);
				
			     	if(data.challengePlayer1 == localStorage.getItem('user-id') || data.challengePlayer2 == localStorage.getItem('user-id'))
			   		{
			   			if(data.lastPlayerMove != localStorage.getItem('user-id'))
			   			me.setClickedPosition(data.cellTarget);
		  			}
		  		
		  }); 

		socket.on("chainreaction game leave update", function(data) {
			    console.log("chainreaction game leave update", data);


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
						instance.post(baseUrl + '/api/chainreaction',{
							player1 : localStorage.getItem('challenge-player1'),
							player2 : localStorage.getItem('challenge-player2')
						})
						.then((response)=> {
							
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
									})
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
									})


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


	reactionUpdate = (player,target,cell1,cell2,cell3,cell4) => {
		console.log('reactionUpdate hit')

		if(cell1!=null && cell2!=null && cell3 == null && cell4==null)
		{
			this.checkExistingCell(player,target,cell1);
			this.checkExistingCell(player,target,cell2);
		}
		
		if(cell1!=null && cell2!=null && cell3 != null && cell4==null)
		{

			this.checkExistingCell(player,target,cell1);
			this.checkExistingCell(player,target,cell2);
			this.checkExistingCell(player,target,cell3);
		}
		
		if(cell1!=null && cell2!=null && cell3 != null && cell4 !=null)
		{
			this.checkExistingCell(player,target,cell1);
			this.checkExistingCell(player,target,cell2);
			this.checkExistingCell(player,target,cell3);
			this.checkExistingCell(player,target,cell4);
		}

	}

	updateStateObject = (playerOjb,value) => {

		let obj = playerOjb;
		obj.hit = value;
		console.log("obj", obj)
		console.log("update state object", this.state);
	}

	checkExistingCell = (player,target,boardCell) => {
		console.log('checkExistingCell hit')

		//Player1
			if(player === true)
			{
		console.log('checkExistingCell true hit')

				let existingItemHit2 = this.checkItemExist(this.state.player2,boardCell);
				let existingItemHit1 = this.checkItemExist(this.state.player1,boardCell);
				
				if( existingItemHit2 === 0)
				{
					for(var i=0; i<this.state.player1.length; i++)
					{
						if(this.state.player1[i].id === target)
						{
							this.updateStateObject(this.state.player1[i],0);
							this.alloctatingComponent(this.state.player1,target,true);
							
						}
						if(this.state.player1[i].id === boardCell)
						{
							let tempHits = this.state.player1[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player1[i],tempHits);
							
						}
					}

				}
				else if(existingItemHit1 === 0 && existingItemHit2 > 0) 
				{
					let tempHit;
					for(i=0; i<this.state.player2.length; i++)
					{
						if(this.state.player2[i].id === boardCell)
						{
							tempHit = this.state.player2[i].hit;
							console.log("Temp Hit",tempHit)
							tempHit = tempHit + 1;
							console.log("Incremented Hit",tempHit);

							this.updateStateObject(this.state.player2[i],0);															
						}
					}

					for(i=0; i<this.state.player1.length; i++)
						{
							if(this.state.player1[i].id === target)
							{
								this.updateStateObject(this.state.player1[i],0);
								this.alloctatingComponent(this.state.player1,target,true);
							}
							if(this.state.player1[i].id === boardCell)
							{
								this.updateStateObject(this.state.player1[i],tempHit);
							}
						}
				}
				else {

					for(i=0; i<this.state.player1.length; i++)
					{
						if(this.state.player1[i].id === boardCell)
						{
							console.log("Pass Hit",this.state.player1[i].hit)

							let tempHits = this.state.player1[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player1[i],tempHits);
							
						}
					}

				}

				this.alloctatingComponent(this.state.player1,boardCell,true);		
				

			}

			//Player2
			if(player === false)
			{
		console.log('checkExistingCell false hit')

							
				let existingItemHit2 = this.checkItemExist(this.state.player2,boardCell);
				let existingItemHit1 = this.checkItemExist(this.state.player1,boardCell);
				
				if( existingItemHit1 === 0)
				{
					for(i=0; i<this.state.player2.length; i++)
					{
						if(this.state.player2[i].id === target)
						{
							this.updateStateObject(this.state.player2[i],0);
							this.alloctatingComponent(this.state.player2,target,false);
							
						}
						if(this.state.player2[i].id === boardCell)
						{
							let tempHits = this.state.player2[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player2[i],tempHits);
							
						}
					}

				}
				else if(existingItemHit2 === 0 && existingItemHit1 > 0) 
				{
					let tempHit;
					for(i=0; i<this.state.player1.length; i++)
					{
						if(this.state.player1[i].id === boardCell)
						{
							tempHit = this.state.player1[i].hit;
							console.log("Temp Hit",tempHit)
							tempHit = tempHit + 1;
							console.log("Incremented Hit",tempHit);

							this.updateStateObject(this.state.player1[i],0);															
						}
					}

					for(i=0; i<this.state.player2.length; i++)
						{
							if(this.state.player2[i].id === target)
							{
								this.updateStateObject(this.state.player2[i],0);
								this.alloctatingComponent(this.state.player2,target,false);
							}
							if(this.state.player2[i].id === boardCell)
							{
								this.updateStateObject(this.state.player2[i],tempHit);
							}
						}
				}
				else {

					for(i=0; i<this.state.player2.length; i++)
					{
						if(this.state.player2[i].id === boardCell)
						{
							console.log("Pass Hit",this.state.player2[i].hit)

							let tempHits = this.state.player2[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player2[i],tempHits);
							
						}
					}

				}

				this.alloctatingComponent(this.state.player2,boardCell,false);

			}
	}

	alloctatingComponent = (playerArr,boardCell,player) => {
		console.log("playerTurn", player,this.state.playerTurn)
		let hit ="";
		for(i=0; i<playerArr.length; i++)
				{
					if(playerArr[i].id === boardCell)
					{
						hit=playerArr[i].hit;
					}

				}


		if(player === true)
		{
		console.log('alloctatingComponent true hit')

			switch(boardCell) {

				case "a1":
				if(hit === 0)
				{
					a1Show = <ChainCircle />;
				}
				else if(hit===1)
				{
					a1Show = <ChainCircleOne />;
				}
				else if(hit===2)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'a2');
					let secondHit1 = this.checkItemExist(this.state.player1,'b1');
					let firstHit2 = this.checkItemExist(this.state.player2,'a2');
					let secondHit2 = this.checkItemExist(this.state.player2,'b1');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(true,null,"a2","b1",null,null);
					} else {
						this.reactionUpdate(true,"a1","a2","b1",null,null);
					}				
					
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player1[0],1);
					this.alloctatingComponent(this.state.player1,"a1",true);
				}
				break;

				case "a2":
				if(hit === 0)
				{
					a2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a2Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					a2Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'a3');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'a3');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"a3","b2","a1",null);
					} else {
						this.reactionUpdate(true,"a2","a3","b2","a1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[1],1);
					this.alloctatingComponent(this.state.player1,"a2",true);
				}
				break;
				
				case "a3":
				if(hit === 0)
				{
					a3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a3Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					a3Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"a3","a2","b3","a4",null);
				}
				break;

				case "a4":
				if(hit === 0)
				{
					a4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a4Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					a4Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"a4","a3","b3","a5",null);
				}
				break;

				case "a5":
				if(hit === 0)
				{
					a5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a5Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					a5Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"a5","a4","b5","a6",null);
				}
				break;

				case "a6":
				if(hit === 0)
				{
					a6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a6Show = <ChainCircleOne />;
				}
				else if(hit===2)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'a5');
					let secondHit1 = this.checkItemExist(this.state.player1,'b6');
					let firstHit2 = this.checkItemExist(this.state.player2,'a5');
					let secondHit2 = this.checkItemExist(this.state.player2,'b6');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(true,null,"a5","b6",null,null);
					} else {
						this.reactionUpdate(true,"a6","a5","b6",null,null);
					}		
					
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player1[5],1);
					this.alloctatingComponent(this.state.player1,"a6",true);
				}
				break;

				case "b1":
				if(hit === 0)
				{
					b1Show = <ChainCircle />
				}
				else if(hit === 0)
				{
					b1Show = <ChainCircle />
				}
				if(hit===1)
				{
					b1Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b1Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c1');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'c1');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"c1","b2","a1",null);
					} else {
						this.reactionUpdate(true,"b1","c1","b2","a1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[6],1);
					this.alloctatingComponent(this.state.player1,"b1",true);
				}
				break;

				case "b2":
				if(hit === 0)
				{
					b2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b2Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b2Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					b2Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"b2","b1","a2","b3","c2");
				}
				break;

				case "b3":
				if(hit === 0)
				{
					b3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b3Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b3Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					b3Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"b3","b2","a3","b4","c3");
				}
				break;

				case "b4":
				if(hit === 0)
				{
					b4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b4Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b4Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					b4Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"b4","b3","a4","b5","c4");
				}
				break;

				case "b5":
				if(hit === 0)
				{
					b5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b5Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b5Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					b5Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"b5","b4","a5","b6","c5");
				}
				break;

				case "b6":
				if(hit === 0)
				{
					b6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b6Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					b6Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c6');
					let secondHit1 = this.checkItemExist(this.state.player1,'b5');
					let firstHit2 = this.checkItemExist(this.state.player2,'c6');
					let secondHit2 = this.checkItemExist(this.state.player2,'b5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"c6","b5","a6",null);
					} else {
						this.reactionUpdate(true,"b6","c6","b5","a6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[11],1);
					this.alloctatingComponent(this.state.player1,"b6",true);
				}
				break;

				case "c1":
				if(hit === 0)
				{
					c1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c1Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c1Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"c1","b1","c2","d1",null);
				}
				break;

				case "c2":
				if(hit === 0)
				{
					c2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c2Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c2Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					c2Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"c2","c1","b2","c3","d2");
				}
				break;

				case "c3":
				if(hit === 0)
				{
					c3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c3Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c3Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					c3Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"c3","c2","b3","c4","d3");
				}
				break;

				case "c4":
				if(hit === 0)
				{
					c4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c4Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c4Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					c4Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"c4","c3","b4","c5","d4");
				}
				break;

				case "c5":
				if(hit === 0)
				{
					c5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c5Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c5Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					c5Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"c5","c4","b5","c6","d5");
				}
				break;

				case "c6":
				if(hit === 0)
				{
					c6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c6Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					c6Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"c6","b6","c5","d6",null);
				}
				break;

				case "d1":
				if(hit === 0)
				{
					d1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d1Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d1Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c1');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'c1');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"c1","d2","e1",null);
					} else {
						this.reactionUpdate(true,"d1","c1","d2","e1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[18],1);
					this.alloctatingComponent(this.state.player1,"d1",true);
				}
				break;

				case "d2":
				if(hit === 0)
				{
					d2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d2Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d2Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					d2Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"d2","c2","d3","e2","d1");
				}
				break;

				case "d3":
				if(hit === 0)
				{
					d3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d3Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d3Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					d3Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"d3","c3","d4","e3","d2");
				}
				break;

				case "d4":
				if(hit === 0)
				{
					d4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d4Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d4Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					d4Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"d4","c4","d5","e4","d3");
				}
				break;

				case "d5":
				if(hit === 0)
				{
					d5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d5Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d5Show = <ChainCircleTwo />;
				}
				else if(hit === 3)
				{
					d5Show = <ChainCircleThree />;
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(true,"d5","c5","d6","e5","d4");
				}
				break;

				case "d6":
				if(hit === 0)
				{
					d6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d6Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					d6Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c6');
					let secondHit1 = this.checkItemExist(this.state.player1,'d5');
					let firstHit2 = this.checkItemExist(this.state.player2,'c6');
					let secondHit2 = this.checkItemExist(this.state.player2,'d5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"c6","d5","e6",null);
					} else {
						this.reactionUpdate(true,"d6","c6","d5","e6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[23],1);
					this.alloctatingComponent(this.state.player1,"d6",true);
				}
				break;

				case "e1":
				if(hit === 0)
				{
					e1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e1Show = <ChainCircleOne />;
				}
				else if(hit===2)
				{
					
					let firstHit1 = this.checkItemExist(this.state.player1,'e2');
					let secondHit1 = this.checkItemExist(this.state.player1,'d1');
					let firstHit2 = this.checkItemExist(this.state.player2,'e2');
					let secondHit2 = this.checkItemExist(this.state.player2,'d1');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(true,null,"e2","d1",null,null);
					} else {
						this.reactionUpdate(true,"e1","e2","d1",null,null);
					}					

				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player1[24],1);
					this.alloctatingComponent(this.state.player1,"e1",true);
				}
				break;

				case "e2":
				if(hit === 0)
				{
					e2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e2Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					e2Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'e3');
					let secondHit1 = this.checkItemExist(this.state.player1,'d2');
					let firstHit2 = this.checkItemExist(this.state.player2,'e3');
					let secondHit2 = this.checkItemExist(this.state.player2,'d2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"e3","d2","e1",null);
					} else {
						this.reactionUpdate(true,"e2","e3","d2","e1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[25],1);
					this.alloctatingComponent(this.state.player1,"e2",true);
				}
				break;
				
				case "e3":
				if(hit === 0)
				{
					e3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e3Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					e3Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"e3","e2","d3","e4",null);
				}
				break;

				case "e4":
				if(hit === 0)
				{
					e4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e4Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					e4Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(true,"e4","e3","d4","e5",null);
				}
				break;

				case "e5":
				if(hit === 0)
				{
					e5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e5Show = <ChainCircleOne />;
				}
				else if(hit === 2)
				{
					e5Show = <ChainCircleTwo />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'e4');
					let secondHit1 = this.checkItemExist(this.state.player1,'d5');
					let firstHit2 = this.checkItemExist(this.state.player2,'e4');
					let secondHit2 = this.checkItemExist(this.state.player2,'d5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(true,null,"e4","d5","e6",null);
					} else {
						this.reactionUpdate(true,"e5","e4","d5","e6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player1[28],1);
					this.alloctatingComponent(this.state.player1,"e5",true);
				}
				break;

				case "e6":
				if(hit === 0)
				{
					e6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e6Show = <ChainCircleOne />;
				}
				else if(hit===2)
				{
					let e5Hit1 = this.checkItemExist(this.state.player1,'e5');
					let d6Hit1 = this.checkItemExist(this.state.player1,'d6');
					let e5Hit2 = this.checkItemExist(this.state.player2,'e5');
					let d6Hit2 = this.checkItemExist(this.state.player2,'d6');
					if(e5Hit1 > 1 || d6Hit1 > 1 || e5Hit2 > 1 || d6Hit2 > 1)
					{
						this.reactionUpdate(true,null,"e5","d6",null,null);
					} else {
						this.reactionUpdate(true,"e6","e5","d6",null,null);
					}

				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player1[29],1);
					this.alloctatingComponent(this.state.player1,"e6",true);
				}
				break;

				default :
				break;
			}
		}

		if(player === false)
		{
		console.log('alloctatingComponent false hit')

			switch(boardCell) {

				
				case "a1":
				if(hit === 0)
				{
					a1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a1Show = <ChainCircleFour />;
				}
				else if(hit===2)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'a2');
					let secondHit1 = this.checkItemExist(this.state.player1,'b1');
					let firstHit2 = this.checkItemExist(this.state.player2,'a2');
					let secondHit2 = this.checkItemExist(this.state.player2,'b1');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(false,null,"a2","b1",null,null);
					} else {
						this.reactionUpdate(false,"a1","a2","b1",null,null);
					}	
					
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player2[0],1);
					this.alloctatingComponent(this.state.player2,"a1",false);
				}
				break;

				case "a2":
				if(hit === 0)
				{
					a2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a2Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					a2Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'a3');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'a3');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"a3","b2","a1",null);
					} else {
						this.reactionUpdate(false,"a2","a3","b2","a1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[1],1);
					this.alloctatingComponent(this.state.player2,"a2",false);
				}
				break;
				
				case "a3":
				if(hit === 0)
				{
					a3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a3Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					a3Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"a3","a2","b3","a4",null);
				}
				break;

				case "a4":
				if(hit === 0)
				{
					a4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a4Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					a4Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"a4","a5","b3","a5",null);
				}
				break;

				case "a5":
				if(hit === 0)
				{
					a5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a5Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					a5Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					// let firstHit1 = this.checkItemExist(this.state.player1,'a4');
					// let secondHit1 = this.checkItemExist(this.state.player1,'b5');
					// let firstHit2 = this.checkItemExist(this.state.player2,'a4');
					// let secondHit2 = this.checkItemExist(this.state.player2,'b5');
					// if(firstHit1 > 1 || secondHit1 > 2 || firstHit2 > 1 || secondHit2 > 2)
					// {
					// 	this.reactionUpdate(false,null,"a4","b5","a6",null);
					// } else {
					// 	this.reactionUpdate(false,"a5","a4","b5","a6",null);
					// }	
					this.reactionUpdate(false,"a5","a4","b5","a6",null);

				}
				// else if(hit >=3)
				// {
				// 	this.updateStateObject(this.state.player2[4],1);
				// 	this.alloctatingComponent(this.state.player2,"a5",false);
				// }
				break;

				case "a6":
				if(hit === 0)
				{
					a6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					a6Show = <ChainCircleFour />;
				}
				else if(hit===2)
				{
					
					let firstHit1 = this.checkItemExist(this.state.player1,'a5');
					let secondHit1 = this.checkItemExist(this.state.player1,'b6');
					let firstHit2 = this.checkItemExist(this.state.player2,'a5');
					let secondHit2 = this.checkItemExist(this.state.player2,'b6');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(false,null,"a5","b6",null,null);
					} else {
						this.reactionUpdate(false,"a6","a5","b6",null,null);
					}
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player2[5],1);
					this.alloctatingComponent(this.state.player2,"a6",false);
				}
				break;

				case "b1":
				if(hit === 0)
				{
					b1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b1Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b1Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c1');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'c1');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"c1","b2","a1",null);
					} else {
						this.reactionUpdate(false,"b1","c1","b2","a1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[6],1);
					this.alloctatingComponent(this.state.player2,"b1",false);
				}
				break;

				case "b2":
				if(hit === 0)
				{
					b2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b2Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b2Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					b2Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"b2","b1","a2","b3","c2");
				}
				break;

				case "b3":
				if(hit === 0)
				{
					b3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b3Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b3Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					b3Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"b3","b2","a3","b4","c3");
				}
				break;

				case "b4":
				if(hit === 0)
				{
					b4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b4Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b4Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					b4Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"b4","b3","a4","b5","c4");
				}
				break;

				case "b5":
				if(hit === 0)
				{
					b5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b5Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b5Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					b5Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"b5","b4","a5","b6","c5");
				}
				break;

				case "b6":
				if(hit === 0)
				{
					b6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					b6Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					b6Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c6');
					let secondHit1 = this.checkItemExist(this.state.player1,'b5');
					let firstHit2 = this.checkItemExist(this.state.player2,'c6');
					let secondHit2 = this.checkItemExist(this.state.player2,'b5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"c6","b5","a6",null);
					} else {
						this.reactionUpdate(false,"b6","c6","b5","a6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[11],1);
					this.alloctatingComponent(this.state.player2,"b6",false);
				}
				break;

				case "c1":
				if(hit === 0)
				{
					c1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c1Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c1Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"c1","b1","c2","d1",null);
				}
				break;

				case "c2":
				if(hit === 0)
				{
					c2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c2Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c2Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					c2Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"c2","c1","b2","c3","d2");
				}
				break;

				case "c3":
				if(hit === 0)
				{
					c3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c3Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c3Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					c3Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"c3","c2","b3","c4","d3");
				}
				break;

				case "c4":
				if(hit === 0)
				{
					c4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c4Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c4Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					c4Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"c4","c3","b4","c5","d4");
				}
				break;

				case "c5":
				if(hit === 0)
				{
					c5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c5Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c5Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					c5Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"c5","c4","b5","c6","d5");
				}
				break;

				case "c6":
				if(hit === 0)
				{
					c6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					c6Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					c6Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"c6","b6","c5","d6",null);
				}
				break;

				case "d1":
				if(hit === 0)
				{
					d1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d1Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d1Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c1');
					let secondHit1 = this.checkItemExist(this.state.player1,'b2');
					let firstHit2 = this.checkItemExist(this.state.player2,'c1');
					let secondHit2 = this.checkItemExist(this.state.player2,'b2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"c1","d2","e1",null);
					} else {
						this.reactionUpdate(false,"d1","c1","d2","e1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[18],1);
					this.alloctatingComponent(this.state.player2,"d1",false);
				}
				break;

				case "d2":
				if(hit === 0)
				{
					d2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d2Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d2Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					d2Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"d2","c2","d3","e2","d1");
				}
				break;

				case "d3":
				if(hit === 0)
				{
					d3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d3Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d3Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					d3Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"d3","c3","d4","e3","d2");
				}
				break;

				case "d4":
				if(hit === 0)
				{
					d4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d4Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d4Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					d4Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"d4","c4","d5","e4","d3");
				}
				break;

				case "d5":
				if(hit === 0)
				{
					d5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d5Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d5Show = <ChainCircleFive />;
				}
				else if(hit === 3)
				{
					d5Show = <ChainCircleSix />
				}
				else if( hit=== 4)
				{
					this.reactionUpdate(false,"d5","c5","d6","e5","d4");
				}
				break;

				case "d6":
				if(hit === 0)
				{
					d6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					d6Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					d6Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'c6');
					let secondHit1 = this.checkItemExist(this.state.player1,'d5');
					let firstHit2 = this.checkItemExist(this.state.player2,'c6');
					let secondHit2 = this.checkItemExist(this.state.player2,'d5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"c6","d5","e6",null);
					} else {
						this.reactionUpdate(false,"d6","c6","d5","e6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[23],1);
					this.alloctatingComponent(this.state.player2,"d6",false);
				}
				break;

				case "e1":
				if(hit === 0)
				{
					e1Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e1Show = <ChainCircleFour />;
				}
				else if(hit===2)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'e2');
					let secondHit1 = this.checkItemExist(this.state.player1,'d1');
					let firstHit2 = this.checkItemExist(this.state.player2,'e2');
					let secondHit2 = this.checkItemExist(this.state.player2,'d1');
					if(firstHit1 > 1 || secondHit1 > 1 || firstHit2 > 1 || secondHit2 > 1)
					{
						this.reactionUpdate(false,null,"e2","d1",null,null);
					} else {
						this.reactionUpdate(false,"e1","e2","d1",null,null);
					}						
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player2[24],1);
					this.alloctatingComponent(this.state.player2,"e1",false);
				}
				break;

				case "e2":
				if(hit === 0)
				{
					e2Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e2Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					e2Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'e3');
					let secondHit1 = this.checkItemExist(this.state.player1,'d2');
					let firstHit2 = this.checkItemExist(this.state.player2,'e3');
					let secondHit2 = this.checkItemExist(this.state.player2,'d2');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"e3","d2","e1",null);
					} else {
						this.reactionUpdate(false,"e2","e3","d2","e1",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[25],1);
					this.alloctatingComponent(this.state.player2,"e2",false);
				}
				break;
				
				case "e3":
				if(hit === 0)
				{
					e3Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e3Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					e3Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"e3","e2","d3","e4",null);
				}
				break;

				case "e4":
				if(hit === 0)
				{
					e4Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e4Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					e4Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					this.reactionUpdate(false,"e4","e3","d4","e5",null);
				}
				break;

				case "e5":
				if(hit === 0)
				{
					e5Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e5Show = <ChainCircleFour />;
				}
				else if(hit === 2)
				{
					e5Show = <ChainCircleFive />;
				}
				else if( hit=== 3)
				{
					let firstHit1 = this.checkItemExist(this.state.player1,'e4');
					let secondHit1 = this.checkItemExist(this.state.player1,'d5');
					let firstHit2 = this.checkItemExist(this.state.player2,'e4');
					let secondHit2 = this.checkItemExist(this.state.player2,'d5');
					if(firstHit1 > 1 || secondHit1 > 3 || firstHit2 > 1 || secondHit2 > 3)
					{
						this.reactionUpdate(false,null,"e4","d5","e6",null);
					} else {
						this.reactionUpdate(false,"e5","e4","d5","e6",null);
					}	

				}
				else if(hit >=3)
				{
					this.updateStateObject(this.state.player2[28],1);
					this.alloctatingComponent(this.state.player2,"e5",false);
				}
				break;

				case "e6":
				if(hit === 0)
				{
					e6Show = <ChainCircle />
				}
				else if(hit===1)
				{
					e6Show = <ChainCircleFour />;
				}
				else if(hit===2)
				{
					let e5Hit1 = this.checkItemExist(this.state.player1,'e5');
					let d6Hit1 = this.checkItemExist(this.state.player1,'d6');
					let e5Hit2 = this.checkItemExist(this.state.player2,'e5');
					let d6Hit2 = this.checkItemExist(this.state.player2,'d6');
					if(e5Hit1 > 1 || d6Hit1 > 1 || e5Hit2 > 1 || d6Hit2 > 1)
					{
						this.reactionUpdate(false,null,"e5","d6",null,null);
					} else {
						this.reactionUpdate(false,"e6","e5","d6",null,null);
					}
				}
				else if(hit === 3)
				{
					this.updateStateObject(this.state.player2[29],1);
					this.alloctatingComponent(this.state.player2,"e6",false);
				}
				break;

				default :
				break;
			}

		}
	}

	changePlayerTurn = () => {
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

					socket.emit('chainreaction state', {
						challengePlayer1 : localStorage.getItem('challenge-player1'),
						challengePlayer2 : localStorage.getItem('challenge-player2'),
						cellTarget : this.state.cellTarget,
						lastPlayerMove : localStorage.getItem('user-id')
					}, () => {

					this.setState({flag : false})
					});

				}

				this.setState({continue : false})
				console.log('*****************THE-END*****************')

		});
	}

	checkItemExist = (playerArr,targetId) => {
		if(this.state.continue === true)
		{
			console.log('checkItemExist hit')

			for(i=0; i< playerArr.length; i++)
				{
					if(playerArr[i].id === targetId)
					{
						return playerArr[i].hit;
					}
				}
		}
	}

	getClickedPosition = e => {
		console.log('*****************DEFAULT START*****************')
		let divID = e.target.id;

		//Player1
		if(this.state.playerTurn === true && localStorage.getItem('challenge-player1') === localStorage.getItem('user-id'))
		{
			this.setState({
				cellTarget : divID,
				flag : true,
				continue : true
			}, () => {

				let existingItemHit = this.checkItemExist(this.state.player2,divID);
				
				if( existingItemHit === 0)
				{
					for(i=0; i<this.state.player1.length; i++)
					{
						if(this.state.player1[i].id === divID)
						{
							let tempHits = this.state.player1[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player1[i],tempHits);
							this.changePlayerTurn();
							this.alloctatingComponent(this.state.player1,divID,this.state.playerTurn);
							var moveInc1 = this.state.moves[0] + 1;
							var moveInc2 = this.state.moves[1];
							this.setState({
							moves: [moveInc1,moveInc2]
							}, () => {
								console.log("moves",this.state.moves);
								this.checkWinner();
							});
						}
					}
							
				}
			});
		}

		//Player2

		if(this.state.playerTurn === false && localStorage.getItem('challenge-player2') === localStorage.getItem('user-id'))
		{
			this.setState({
				cellTarget : divID,
				flag : true,
				continue : true
			}, () => {

				let existingItemHit = this.checkItemExist(this.state.player1,divID);
				
				if( existingItemHit === 0)
				{
						
					for(i=0; i<this.state.player2.length; i++)
					{
						if(this.state.player2[i].id === divID)
						{
							let tempHits = this.state.player2[i].hit;
							tempHits = tempHits + 1;
							this.updateStateObject(this.state.player2[i],tempHits);
							this.alloctatingComponent(this.state.player2,divID,this.state.playerTurn);
							this.changePlayerTurn();
							var moveInc1 = this.state.moves[0];
							var moveInc2 = this.state.moves[1] + 1;
							this.setState({
							moves: [moveInc1,moveInc2]
							}, () => {
								console.log("moves",this.state.moves);
								this.checkWinner();
							});
						}
					}


				}
			});
		}
	}


	setClickedPosition = target => {
		console.log("setClickedPosition hit")
		let divID = target;
		this.setState({
			flag : false,
			continue : true
		});

		//Player1
		if(this.state.playerTurn === true)
		{

			let existingItemHit = this.checkItemExist(this.state.player2,divID);
			
			if( existingItemHit === 0)
			{
				for(i=0; i<this.state.player1.length; i++)
				{
					if(this.state.player1[i].id === divID)
					{
						let tempHits = this.state.player1[i].hit;
						tempHits = tempHits + 1;
						this.updateStateObject(this.state.player1[i],tempHits);
						this.alloctatingComponent(this.state.player1,divID,this.state.playerTurn);
						var moveInc1 = this.state.moves[0] + 1;
						var moveInc2 = this.state.moves[1];
						this.setState({
						moves: [moveInc1,moveInc2]
						}, () => {
							console.log("moves",this.state.moves);
							this.checkWinner();
							this.changePlayerTurn();
						});

					}
				}
						
			}

		}

		//Player2

		if(this.state.playerTurn === false)
		{
			let existingItemHit = this.checkItemExist(this.state.player1,divID);
			
			if( existingItemHit === 0)
			{
					
				for(i=0; i<this.state.player2.length; i++)
				{
					if(this.state.player2[i].id === divID)
					{
						let tempHits = this.state.player2[i].hit;
						tempHits = tempHits + 1;
						this.updateStateObject(this.state.player2[i],tempHits);
						this.alloctatingComponent(this.state.player2,divID,this.state.playerTurn);
						var moveInc1 = this.state.moves[0];
						var moveInc2 = this.state.moves[1] + 1;
						this.setState({
						moves: [moveInc1,moveInc2]
						}, () => {
							console.log("moves",this.state.moves);
							this.checkWinner();
							this.changePlayerTurn();
						});
					}
				}


			}

		}
	}

	checkWinner = () => {
		console.log('winner hit')
		//Winner
		if(this.state.moves[0] > 0 && this.state.moves[1] > 0)
		{
			let player1Count = 0, player2Count = 0;
			for(i=0; i< this.state.player1.length; i++)
			{
				if(this.state.player1[i].hit === 0)
				{
					player1Count++;
				}
			}

			for(i=0; i< this.state.player2.length; i++)
			{
				if(this.state.player2[i].hit === 0)
				{
					player2Count++;
				}
			}

			if(player1Count === 30)
			{
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

			}

			if(player2Count === 30)
			{
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
			}
		}
	}

	updateWinnerRecords = (winStatus, gameId, gameOptionId) => {
		if(localStorage.getItem('challenge-gameStatus') === '0' && localStorage.getItem('challenge-game') === '2')
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
			if(localStorage.getItem('challenge-gameStatus') === '0' && localStorage.getItem('challenge-game') === '2')
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
				
				socket.emit('chainreaction game leave', { 
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
	        swal("Oops!", "Session has been idle over its time limit...", "error").then((success) => {

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

						socket.emit('chainreaction game leave', { 
								winStatus : winStatus
							});	
						
					} else {
						// this.props.updateSession(true);
					    // this.props.history.push('/');
					 window.location.href = '/';
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
		var  pic1, pic2,image;
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
			image = `http://localhost:5000/${this.state.player1pic}`;
	  		pic1 = <img src={image} alt={player1name} className="userImg" />; 
	  	}else{
	  		pic1 = <img src = {avtar} alt="" className="userImg" />;
	  	}

	  	if (this.state.player2pic !== null) {
			image = `http://localhost:5000/${this.state.player2pic}`;
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
				<section id="gamechainreaction">
					 <div className="dropdown">
					  <button className="btn btn-toggle" type="button" onClick={this.leaveMatch}><i className="fa fa-times bar-toggle"></i> <span className="fa fa-sign-out  leave-toggle" >Leave</span></button>
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
							                    <div className="table-cell" id="a1" onClick={this.getClickedPosition}> {a1Show} </div>
							                    <div className="table-cell" id="a2" onClick={this.getClickedPosition}> {a2Show} </div>
							                    <div className="table-cell" id="a3" onClick={this.getClickedPosition}> {a3Show} </div>
							                    <div className="table-cell" id="a4" onClick={this.getClickedPosition}> {a4Show} </div>
							                    <div className="table-cell" id="a5" onClick={this.getClickedPosition}> {a5Show} </div>
							                    <div className="table-cell" id="a6" onClick={this.getClickedPosition}> {a6Show} </div>
							                </div>
							                 <div className="table-row">
							                    <div className="table-cell" id="b1" onClick={this.getClickedPosition}> {b1Show} </div>
							                    <div className="table-cell" id="b2" onClick={this.getClickedPosition}> {b2Show} </div>
							                    <div className="table-cell" id="b3" onClick={this.getClickedPosition}> {b3Show} </div>
							                    <div className="table-cell" id="b4" onClick={this.getClickedPosition}> {b4Show} </div>
							                    <div className="table-cell" id="b5" onClick={this.getClickedPosition}> {b5Show} </div>
							                    <div className="table-cell" id="b6" onClick={this.getClickedPosition}> {b6Show} </div>
							                </div>
							                 <div className="table-row">
							                    <div className="table-cell" id="c1" onClick={this.getClickedPosition}> {c1Show} </div>
							                    <div className="table-cell" id="c2" onClick={this.getClickedPosition}> {c2Show} </div>
							                    <div className="table-cell" id="c3" onClick={this.getClickedPosition}> {c3Show} </div>
							                    <div className="table-cell" id="c4" onClick={this.getClickedPosition}> {c4Show} </div>
							                    <div className="table-cell" id="c5" onClick={this.getClickedPosition}> {c5Show} </div>
							                    <div className="table-cell" id="c6" onClick={this.getClickedPosition}> {c6Show} </div>
							                </div>
							                <div className="table-row">
							                    <div className="table-cell" id="d1" onClick={this.getClickedPosition}> {d1Show} </div>
							                    <div className="table-cell" id="d2" onClick={this.getClickedPosition}> {d2Show} </div>
							                    <div className="table-cell" id="d3" onClick={this.getClickedPosition}> {d3Show} </div>
							                    <div className="table-cell" id="d4" onClick={this.getClickedPosition}> {d4Show} </div>
							                    <div className="table-cell" id="d5" onClick={this.getClickedPosition}> {d5Show} </div>
							                    <div className="table-cell" id="d6" onClick={this.getClickedPosition}> {d6Show} </div>
							                </div>
							                <div className="table-row">
							                    <div className="table-cell" id="e1" onClick={this.getClickedPosition}> {e1Show} </div>
							                    <div className="table-cell" id="e2" onClick={this.getClickedPosition}> {e2Show} </div>
							                    <div className="table-cell" id="e3" onClick={this.getClickedPosition}> {e3Show} </div>
							                    <div className="table-cell" id="e4" onClick={this.getClickedPosition}> {e4Show} </div>
							                    <div className="table-cell" id="e5" onClick={this.getClickedPosition}> {e5Show} </div>
							                    <div className="table-cell" id="e6" onClick={this.getClickedPosition}> {e6Show} </div>
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

export default GameChainReaction;