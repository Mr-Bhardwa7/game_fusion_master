import swal from 'sweetalert';
import {baseUrl} from './envHelper';
import axios from 'axios';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

var notify = (playerName,challengeFrom, challengeTo, game, gameOption) => {
	try{

		var gameName,price;
		if(game === '1')
			gameName = 'Tic Tac Toe';
		
		if(game === '2')
			gameName = 'Chain Reaction';

		if(gameOption === '1')
			price = 'Rs 10';

		if(gameOption === '2')
			price = 'Rs 50';

		if(gameOption === '3')
			price = 'Rs 100';

		
			new Promise((resolve,reject) => {
				const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/player-status',{player : localStorage.getItem('user-id')})
						.then((response)=> {
							if(response.data.error === true)
							{
								if(localStorage.getItem('user-id') === challengeTo)
								{
									swal(`${playerName} challenge you in ${gameName} at ${price} board.`, {
								      buttons: {
								      cancel: "Run away!",
								      catch: {
								        text: "Accept",
								        value: "catch",
								        },
								      },
								    })
								    .then((value) => {
								      switch (value) {
								                  
								        case "catch":
									       socket.emit('challenge accept', {
									       	msg : `${localStorage.getItem('user-name')} accept your challenge in ${gameName}, Play now`, 
									       	player1 : challengeFrom, 
									       	player2: challengeTo, 
									       	game : game, 
									       	gameOption: gameOption
									       });
								        break;
								                   
								        default:
								        new Promise((resolve,reject) => {
											const instance = axios.create({
												  timeout: 1000,
													  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
												});
											instance.post(baseUrl + '/api/challenge-reject',{
												player1 : challengeFrom,
												player2 : challengeTo,
												game : game,
												gameOption : gameOption
											})
											.then((data)=> {
												console.log(data.data.message);
												socket.emit('challenge reject', {msg : data.data.message , player1 : challengeFrom });
												resolve();
											});	
										});
								      }
								   });
								}
								
							}
							else {
								if(localStorage.getItem('user-id') === challengeFrom)
								{
									swal(`${response.data.message}`);	
								}							
							}
							resolve();
						})
						.catch(function (error) {
						  console.log(error);
					 });	
				});

		
	} catch(err){
		throw err;
	}
}

var rejectedNotication = (player,message) => {
	try{

		if(localStorage.getItem('user-id') === player)
		{
			console.log(message)
			swal(`${message}`);
		}

	} catch(err){
		throw err;
	}
}

var acpectedNotication = (message, player1, player2, game, gameOption) => {
	try{
		
		var gameName;
		if(game === '1')
			gameName = 'Tic Tac Toe';
		
		if(game === '2')
			gameName = 'Chain Reaction';

		if(localStorage.getItem('user-id') === player1)
		{
			swal(`${message}`, {
		      buttons: {
		      cancel: "Cancel",
		      catch: {
		        text: "Play now",
		        value: "catch",
		        },
		      },
		    })
		    .then((value) => {
		      switch (value) {
		                  
		        case "catch":
		        new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
					instance.post(baseUrl + '/api/challenge-accept',{
						player1 : player1,
						player2 : player2,
						game : game,
						gameOption : gameOption
					})
					.then((response)=> {

						if(response.data.error === false)
						{

							socket.emit('preparing game board', {
								player1 : player1,
								player2 : player2,
								game : response.data.data.gameId,
								gameOption : response.data.data.gameOptionId,
								gameStatus : response.data.data.gameStatus
							});
						}

						resolve();
					});	
				});
		        break;
		                   
		        default:
		        new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
					instance.post(baseUrl + '/api/challenge-reject',{
						player1 : player1,
						player2 : player2,
						game : game,
						gameOption : gameOption
					})
					.then((data)=> {
						socket.emit('challenge reject', {msg : `${localStorage.getItem('user-name')} is busy, challenge him/her later!` , player1 : player2 });
						resolve();
					});	
				});
		      }
		   });
		}


	} catch(err){
		throw err;
	}
}


var rematchNotication = (message,player1,player1Name,player2,player2Name,game,gameOption,gameStatus) => {
	try{

		if(localStorage.getItem('user-id') === player2)
		{
			swal(`${message}`, {
		      buttons: {
		      cancel: "Cancel",
		      catch: {
		        text: "Play now",
		        value: "catch",
		        },
		      },
		    })
		    .then((value) => {
		      switch (value) {
		                  
			        case "catch":
				    new Promise((resolve,reject) => {
						const instance = axios.create({
							  timeout: 1000,
								  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
							});
						instance.post(baseUrl + '/api/rematch-accept',{
							player1 : player1,
							player2 : player2,
							game : game,
							gameOption : gameOption
						})
						.then((response)=> {

							if(response.data.error === false)
							{
								 socket.emit('preparing game board', {
									player1 : player1,
									player2 : player2,
									game : game,
									gameOption : gameOption,
									gameStatus : 0
								});
							}

							resolve();
						});	
					});

			        break;

			        default:
			        socket.emit('rematch rejected', {
			        	msg : `${player2Name} is in hurry, challenge him/her later.`, 
			        	player : player1
			        });

		    	}
			});
		}

	}catch(err){
		throw err;
	}
}

var rematchRejectedNotication = (player,message) => {
	try{

		if(localStorage.getItem('user-id') === player)
		{
			console.log(message)
			swal(`${message}`)
			.then(() => {
				localStorage.removeItem('challenge-player1');
				localStorage.removeItem('challenge-player2');
				localStorage.removeItem('challenge-game');
				localStorage.removeItem('challenge-gameOption');
				localStorage.removeItem('challenge-gameStatus');
			});
		}

	} catch(err){
		throw err;
	}
}

export  { notify,rejectedNotication, acpectedNotication, rematchNotication, rematchRejectedNotication};