import React, { Component } from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './User.css';
import Progress from 'react-progressbar';
import avtar from './../assets/images/avtar.png';
import coins from './../assets/images/coins.svg';
import rating from './../assets/images/rating';
import winning from './../assets/images/winning.png';

class User extends Component {
	constructor(props)
{
	super(props);
	this.state = {
		data        : [],
		profile_pic : null,
		userName    : '',
		userUnqId   : '',
		userRating  : '',
		achieved_xp : '',
		target_xp   : '',
		progress_bar: '',
		totalCoins  : '',
		totalWin	: 0,
		totalGame	: 0,
		open		: false,
		selectedFile: null

	}
}


	componentWillMount(){
			var self = this;
			new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/user-detail',{userToken : localStorage.getItem('token') || '', userId : localStorage.getItem('user-id')})
						.then((response)=> {
							if(response.data.error == false)
							{
								self.setState({
									data        : response.data.data.result[0],
									profile_pic : response.data.data.result[0].userProfilePath || null,
									userName    : response.data.data.result[0].userName,
									userId    : response.data.data.result[0].id,
									userUnqId   : response.data.data.result[0].userUniqueID,
									userRating  : response.data.data.result[0]['rating.ratingLevel'],
									achieved_xp : response.data.data.result[0]['rating.achivedXP'],
									target_xp   : response.data.data.result[0]['rating.targetXP'],
									progress_bar: response.data.data.result[0]['rating.achivedXP']/10,
									totalCoins  : response.data.data.result[0]['coin.currentCoins'],
									totalWin 	: response.data.data.totalWin,
									totalGame 	: response.data.data.totalGame
								}, () => console.log(this.state));
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


componentDidMount(){
      new Promise((resolve,reject) => {
            const instance = axios.create({
                timeout: 1000,
                headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
            });
            instance.post(baseUrl + '/api/user-coin',{userid : localStorage.getItem('user-id')})
              .then((response)=> {
                  console.log(response.data.data[0].currentCoins);
                  if(response.data.error === false)
                  {
                      localStorage.setItem('user-coin',response.data.data[0].currentCoins);
                  }

                  resolve();
              });                
          });
    }

    

onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

profilePicHandle = (event) => {
	event.preventDefault();
	var self = this;
	const fd = new FormData();
	fd.append('image',this.state.selectedFile,this.state.selectedFile.name);
	fd.append('userId',this.state.userId);
  	new Promise((resolve,reject) => {
						const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/api/user-profile-upload', fd)
						.then((response)=> {
							this.setState({
								profile_pic : response.data.data[0].path
							}, () => {
								this.onCloseModal();
							});
							resolve();
						})
							.catch(function (error) {
							  console.log(error);
						});

						
						
				});

}

fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})

  console.log(event.target.files[0])
}

  render() {
  	const { open } = this.state;
  	var picture,winningPercentage;
  	if (this.state.profile_pic !== null) {
  		var image = `http://localhost:5000/${this.state.profile_pic}`
  		picture = <img src={image} alt={this.state.userName} className="img-thumbnail" />; 
  	}
  	if(this.state.profile_pic === null){
  		picture = <img src ={avtar} alt="" className="img-thumbnail" />;
  	}

  	var per = this.state.totalWin/this.state.totalGame;
  	if(this.state.totalGame === 0)
  	{
  		winningPercentage = 0;
  	} else {
  	winningPercentage = Math.round(per * 100);
  	}

    return (

		<div className="user_profile">
			<div className="user_profile_header"> 
				<h2>User Profile</h2>
			</div>
				<div className="container">
					<div className="mainbox">
						<div className="row">
							<div className="col-md-4">
								<div className="profile">
									<div className="profile_Status">
										<div className="profile-pic">
											{picture}
											<div className="edit" onClick={this.onOpenModal}><i className="fa fa-camera fa-lg"></i></div>
											</div>
									</div>
									<h2>{this.state.userName}</h2>
									<span> User Id : {this.state.userUnqId}</span>
									<span> Rating : {this.state.userRating} </span>
									<span class="progress-h">
							            <Progress completed={this.state.progress_bar} />
							        	<label className="xp">{this.state.achieved_xp}xp / {this.state.target_xp}xp</label>
							        </span>
								</div>
							</div>
							<div className="col-md-8">
								<h1> Player Status</h1>
								<div className="profile_box">
									<div className="row">
								
									<div className="col-md-6">
										<div className="profile_Status">
											<span><i className="fa fa-trophy fa-icon"></i></span>
											<p> Total Game : {this.state.totalGame}</p>
										</div>
									</div>
									<div className="col-md-6">
										<div className="profile_Status">
											<span><i className="fa fa-trophy fa-icon"></i></span>
											<p> Winning Game : {this.state.totalWin}</p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="profile_Status">
											<span><i className="fa fa-percent fa-icon"></i></span>
											<p> Winning Percentage: {winningPercentage}%</p>
										</div>
									</div>
									<div className="col-md-6">
										<div className="profile_Status">
											<span><img src={coins} alt="" /></span>
											<p> Total Coins : {this.state.totalCoins} </p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
	          open={open}
	          onClose={this.onCloseModal}
	          center
	          classNames={{
	            transitionEnter: 'transition-enter',
	            transitionEnterActive: 'transition-enter-active',
	            transitionExit: 'transition-exit-active',
	            transitionExitActive: 'transition-exit-active',
	          }}
	          animationDuration={1000}
	        >
	          <p>
	           Select a profile picture
	          </p>
	       	<form onSubmit={this.profilePicHandle} action="profileUpload" method="post" encType="multipart/form-data">
	          <input type="file" name="profileImg" onChange={this.fileChangedHandler}/>
	          <input type="submit" value="Upload" />
	         </form>
			</Modal>
		</div>	
    );
  }
}

export default User;
