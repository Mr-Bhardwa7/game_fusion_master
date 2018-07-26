import React, { Component } from 'react';
import {baseUrl} from './helpers/envHelper';
import axios from 'axios';
import './Result.css';
import player from './assets/images/player.jpg';
import coins from './assets/images/coins.svg';
import avtar from './assets/images/avtar.png';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

class Result extends Component {
  constructor(props)
{
  super(props);
}

  componentWillMount(){
      var self = this;
      new Promise((resolve,reject) => {
            const instance = axios.create({
              timeout: 1000,
                headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
            });
            instance.post(baseUrl + '/api/result')
            .then((response)=> {

              if(response.data.error === false)
              {
                console.log(response.data.data)
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


    backToHome = () => {
      localStorage.removeItem('challenge-player1');
      localStorage.removeItem('challenge-player2');
      localStorage.removeItem('challenge-game');
      localStorage.removeItem('challenge-gameOption');
      localStorage.removeItem('challenge-gameStatus');
      localStorage.removeItem('winStatus');
      this.props.history.push('/');
    }

    rematch = () => {

      var player1,player2,player1Name,player2Name;
      if(localStorage.getItem('user-id') === localStorage.getItem('challenge-player1'))
      {
        player1 = localStorage.getItem('challenge-player1');
        player1Name = localStorage.getItem('challenge-player1name');
        player2 = localStorage.getItem('challenge-player2');
        player2Name = localStorage.getItem('challenge-player2name');
      } else {
        player1 = localStorage.getItem('challenge-player2');
        player1Name = localStorage.getItem('challenge-player2name');
        player2 = localStorage.getItem('challenge-player1');
        player2Name = localStorage.getItem('challenge-player1name');
      }

      socket.emit('rematch', {
        player1 : player1,
        player1Name : player1Name,
        player2 : player2,
        player2Name : player2Name,
        game : localStorage.getItem('challenge-game'),
        gameOption : localStorage.getItem('challenge-gameOption'),
        gameStatus : 1,
      });
    }

  render() {

    var amount,pic1, pic2, player1win,player2win;
    var player1Name = localStorage.getItem('challenge-player1name');
    var player2Name = localStorage.getItem('challenge-player2name');
    var winStatus = localStorage.getItem('winStatus');

    if(localStorage.getItem('challenge-gameOption'))
    {
      if(localStorage.getItem('challenge-gameOption') === '1')
        amount = 20;

      if(localStorage.getItem('challenge-gameOption') === '2')
        amount = 100;

      if(localStorage.getItem('challenge-gameOption') === '3')
        amount = 200;
    }

    if (localStorage.getItem('challenge-player1pic') != 'null') {
      var picture = localStorage.getItem('challenge-player1pic');
      var image = `${baseUrl}/${picture}`;
      var name = localStorage.getItem('challenge-player1name');
        pic1 = <img src={image} alt={name} className="userImg img" />; 
      }else{
        pic1 = <img src = {avtar} alt="" className="userImg img" />;
      }

      if (localStorage.getItem('challenge-player2pic') != 'null') {
      var picture = localStorage.getItem('challenge-player2pic');
      var image = `${baseUrl}/${picture}`;
      var name = localStorage.getItem('challenge-player2name');
        pic2 = <img src={image} alt={name} className="userImg img" />; 
      }else{
        pic2 = <img src = {avtar} alt="" className="userImg img" />;
      }

      if(winStatus === '0')
        player2win = <span>WINNER</span>;
      
      if(winStatus === '1')
        player1win = <span>WINNER</span>;

      if(localStorage.getItem('challenge-gameStatus'))
          var rematchBtn = <button type="button" className="btn btn-md btn-danger rematch" onClick={this.rematch}>REMATCH</button>;
      

    return (
        <section className = "resultMain">
          <div className="result_header"></div>
          <div className = "container">
            <div className="mainbox">
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="resultbox">
                     {pic1}
                     {player1win}                     
                      <div className = "text">{player1Name}</div>
                    </div>
                    </div>
                  <div className="col-md-4 col-sm-12">
                   <div className="middle_pannel">
                      <div className="resultbox">
                        <div className = "text">
                          <img src={coins} className="coins_result" alt=""/> {amount}
                        </div>
                      </div>
                       <div className="result_vs">
                        <div className = "text">V/S</div>
                      </div>
                   </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="resultbox">
                      {pic2}
                      {player2win}
                      <div className = "text">{player2Name}</div>
                    </div>
                  </div>
                </div>
                <div className="rematch-button">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <button type="button" className="btn btn-md btn-primary home" onClick={this.backToHome}>BACK TO HOME</button>
                      {rematchBtn}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
       
    );
  }
}

export default Result;
