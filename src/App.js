import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
import Loadable from 'react-loadable';
import './App.css';
import style from 'bootstrap/dist/css/bootstrap.css';
import faStyles from 'font-awesome/css/font-awesome.css';
import Header from './include/Header';
import Footer from './include/Footer';
import {baseUrl} from './helpers/envHelper';
import {notify, rejectedNotication, acpectedNotication, rematchNotication, rematchRejectedNotication} from './helpers/helper';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);


const Loading = () => <div>Loading...</div>


const Home = Loadable({
  loader: () => import('./include/Home'),
  loading: Loading,
});

const GameOption = Loadable({
  loader: () => import('./include/GameOption'),
  loading: Loading,
});

const PlayerChallenge = Loadable({
  loader: () => import('./PlayerChallenge'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./user/LoginForm'),
  loading: Loading,
});

const Signup = Loadable({
  loader: () => import('./user/Registration'),
  loading: Loading,
});

const ForgetPassword = Loadable({
  loader: () => import('./user/Forgetpwd'),
  loading: Loading,
});

const Result = Loadable({
  loader: () => import('./Result'),
  loading: Loading,
});

const GameTicTacToe = Loadable({
  loader: () => import('./ticTacToe/GameTicTacToe'),
  loading: Loading,
});

const GameChainReaction = Loadable({
  loader: () => import('./chainReaction/GameChainReaction'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./user/User'),
  loading: Loading,
});

const CoinsOffer = Loadable({
  loader: () => import('./user/CoinsOffer'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./admin/Dashboard'),
  loading: Loading,
});

const AdminAddCoin = Loadable({
  loader: () => import('./admin/AdminAddCoin'),
  loading: Loading,
});

const OfferList = Loadable({
  loader: () => import('./admin/OfferList'),
  loading: Loading,
});

const PaymentsDetails = Loadable({
  loader: () => import('./admin/PaymentsDetails'),
  loading: Loading,
});

const UserDetails = Loadable({
  loader: () => import('./admin/UserDetails'),
  loading: Loading,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    userName : '',
    userEmail : '',
    userPassword : '',
    socialMediaAuth : '',
    userProfilePath : '',
    activeHeader : false,
    userData : []
  }

  
  socket.on('connected',data => {
      this.setState({userData: data.users})
    console.log("state data",this.state.userData)
  });

  this.keepOnline();

  socket.on("challenge-notify", function(data) {
    console.log("challenge Notify", data);
    notify(data.player1_Name,data.player1,data.player2,data.game,data.gameOption);
  });

   socket.on("challenge reject message", function(data) {
     console.log("challenge reject message", data);
    rejectedNotication(data.player,data.msg);
  });

  socket.on("challenge accept message", function(data) {
     console.log("challenge accept message", data);
    acpectedNotication(data.msg,data.player1,data.player2,data.game,data.gameOption);
  });

  socket.on("start game",function(data) {
    console.log("game start",data);
    if(localStorage.getItem('user-id') === data.player1 || localStorage.getItem('user-id') === data.player2)
    {
      localStorage.setItem('challenge-player1',data.player1);
      localStorage.setItem('challenge-player2',data.player2);
      localStorage.setItem('challenge-game',data.game);
      localStorage.setItem('challenge-gameOption',data.gameOption);
      localStorage.setItem('challenge-gameStatus',data.gameStatus);
      localStorage.removeItem('winStatus');

      if(data.game === '1')
      {
         window.location = '/tictactoe';
      }

      if(data.game === '2')
         window.location = '/chainreaction';
    }

  });

  socket.on("rematch notification", function(data) {
     console.log("rematch notification", data);
    rematchNotication(data.msg,data.player1,data.player1Name,data.player2,data.player2Name,data.game,data.gameOption,data.gameStatus);
  });

   socket.on("rematch rejected message", function(data) {
     console.log("rematch rejected message", data);
    rematchRejectedNotication(data.player,data.msg);
  });
  
}


  updateSession = (status) => {
  this.setState({
    activeHeader : status
  });
}

  keepOnline = () => {
     new Promise((resolve,reject) => {
            const instance = axios.create({
                timeout: 1000,
                headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
            });
            instance.post(baseUrl + '/api/keep-alive',{unq_id : localStorage.getItem('user-unqId')})
              .then((response)=> {
                  if(response.data.error === false)
                  {
                    socket.emit('userConnected', { unq_id: localStorage.getItem('user-unqId') });  
                  }

                  resolve();
              });                
          });
  }

  render() {
    
  let path = window.location.href;
  var pathIndex = path.split('/');
  let header = <Header />;
  let footer = <Footer />;

  if(pathIndex[3] === 'tictactoe' ||   pathIndex[3] === 'chainreaction')
  {
    if(this.state.activeHeader === false)
    {
      header = '';
      footer = '';
    }
  }

  const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        {header}
          <Component {...matchProps} props={this.state} updateSession = {this.updateSession} onlineUser = {this.state.userData} />
        {footer}
      </div>
    )} />
  )
};

const PostLayout = ({component: Component, ...rest}) => {
  return (
    <DefaultLayout {...rest} component={matchProps => (
          <Component {...matchProps} />
    )} />
  );
};


    return (
          <div className="App">
            <Router>
            <Switch>
              <PostLayout exact path="/" component={Home} />
              <PostLayout path="/game-option/1" component={GameOption} />
              <PostLayout path="/game-option/2" component={GameOption} />
              <PostLayout path="/challenge" component={PlayerChallenge} />
		          <PostLayout path="/login" component={Login}/>
              <PostLayout path='/signup' component ={Signup}/>
		          <PostLayout path="/result" component={Result}/>
              <PostLayout path="/forget" component={ForgetPassword} />
              <PostLayout path="/tictactoe" component={GameTicTacToe} />
              <PostLayout path="/chainreaction" component={GameChainReaction} />
              <PostLayout path="/user" component={User}/>
              <PostLayout path="/coin-offer" component={CoinsOffer} />
              <PostLayout path="/admin/dashboard" component={Dashboard} />
              <PostLayout path="/admin/offer" component = {AdminAddCoin} />
              <PostLayout path="/admin/offer-details" component={OfferList} />
              <PostLayout path="/admin/payment-details" component={PaymentsDetails} />
              <PostLayout path="/admin/user-details" component={UserDetails} />
            </Switch>
          </Router>
          </div>
    );
  }
}

export default App;
