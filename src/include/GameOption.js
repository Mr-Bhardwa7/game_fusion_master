import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios';
import './GameOption.css'
import image_cr_option1 from './../assets/images/game-cr-option-10.png';
import image_cr_option2 from './../assets/images/game-cr-option-50.png';
import image_cr_option3 from './../assets/images/game-cr-option-100.png';
import image_tt_option1 from './../assets/images/game-ttt-option-10.png';
import image_tt_option2 from './../assets/images/game-ttt-option-50.png';
import image_tt_option3 from './../assets/images/game-ttt-option-100.png';


class GameOption extends Component {
	constructor(props){
		super(props);
		this.state = {
			option1 : {"img":image_tt_option1, "value": "1/1"},
			option2 : {"img":image_tt_option2, "value": "1/2"},
			option3 : {"img":image_tt_option3, "value": "1/3"}

		}
	}

	componentDidMount() {
		let path = window.location.href;
  		var pathIndex = path.split('/');
  		var id= pathIndex[4];
  		if(id == 2)
  		{
  			this.setState({
  					option1 : {"img":image_cr_option1, "value": "2/1"},
					option2 : {"img":image_cr_option2, "value": "2/2"},
					option3 : {"img":image_cr_option3, "value": "2/3"}
  			});
  		}
	}

	checkUserCoin = (event) => {
		var id = event.target.id;
		var coinCheck;

		new Promise((resolve,reject) => {
            const instance = axios.create({
                timeout: 1000,
                headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
            });
            instance.post(baseUrl + '/api/user-coin',{userid : localStorage.getItem('user-id')})
              .then((response)=> {
                  console.log("coin coin",response.data.data[0].currentCoins);
                  if(response.data.error === false)
                  {
                  	if(id === 'opt1')
					{
						coinCheck = 9;
                  		if(response.data.data[0].currentCoins > coinCheck)
                  		{
                  			this.props.history.push(`/challenge/${this.state.option1.value}`)
                  		} else 
                  		{
                  			 swal("Opps! You don't have enough coin to play this match, Purchase coins to continue.",{
						      buttons: {
						      cancel: "Not Now",
						      catch: {
						        text: "Purchase Now",
						        value: "catch",
						        },
						      },
						    })
                  			 .then((value) => {
								      switch (value) {
								                  
								        case "catch":
								        this.props.history.push('/coin-offer');
								        break;

								        default:
								        break;
								    }
								});
                  		}
					} else if( id === 'opt2')
					{
						coinCheck = 49;
						if(response.data.data[0].currentCoins > coinCheck)
                  		{
                  			this.props.history.push(`/challenge/${this.state.option2.value}`)
                  		}
                  		 else 
                  		{
                  			 swal("Opps! You don't have enough coin to play this match, Purchase coins to continue.",{
						      buttons: {
						      cancel: "Not Now",
						      catch: {
						        text: "Purchase Now",
						        value: "catch",
						        },
						      },
						    })
                  			 .then((value) => {
								      switch (value) {
								                  
								        case "catch":
								        this.props.history.push('/coin-offer');
								        break;

								        default:
								        break;
								    }
								});                  		}
					} else if(id === 'opt3')
					{
						coinCheck = 99;
						if(response.data.data[0].currentCoins > coinCheck)
                  		{
                  			this.props.history.push(`/challenge/${this.state.option3.value}`)
                  		}
                  		 else 
                  		{
                  			 swal("Opps! You don't have enough coin to play this match, Purchase coins to continue.",{
						      buttons: {
						      cancel: "Not Now",
						      catch: {
						        text: "Purchase Now",
						        value: "catch",
						        },
						      },
						    })
                  			 .then((value) => {
								      switch (value) {
								                  
								        case "catch":
								        this.props.history.push('/coin-offer');
								        break;

								        default:
								        break;
								    }
								});
                  		}
					}
                      
                  }

                  resolve();
              });                
          });

	}

	render() {
		
		return(

		<section className="game-option-circle hidden-xs" id="game-option-circle">
            <div className="container text-center">
                	<div className="row">
						<div className="col-md-4 col-sm-12">
							<div className="full-width">
							  <div className="arc_reactor">
							    <div className="case_container center-block">
							   
							      <div className="e7">
							        <div className="semi_arc_3 e5_1">
							          <div className="semi_arc_3 e5_2">
							            <div className="semi_arc_3 e5_3">
							              <div className="semi_arc_3 e5_4" id="opt1" onClick={this.checkUserCoin}>
							              </div>
							            </div>
							          </div>
							        </div>
							        <div className="core2">
							        	<img src={this.state.option1.img} className="core2-img center-block" alt="img" />
							        </div>
							      </div>
							    
							    </div>
							  </div>
							</div>
						</div>

						<div className="col-md-4 col-sm-12">
							<div className="full-width">
							  <div className="arc_reactor">
							    <div className="case_container center-block">
							      <div className="e7">
							        <div className="semi_arc_3 e5_1">
							          <div className="semi_arc_3 e5_2">
							            <div className="semi_arc_3 e5_3">
							              <div className="semi_arc_3 e5_4" id="opt2" onClick={this.checkUserCoin}>
							              </div>
							            </div>
							          </div>
							        </div>
							        <div className="core2">
							        	<img src={this.state.option2.img} className="core2-img center-block" alt="img" />
							        </div>
							      </div>
							    </div>
							  </div>
							</div>
						</div>

						<div className="col-md-4 col-sm-12">
							<div className="full-width">
							  <div className="arc_reactor">
							    <div className="case_container center-block">
							      <div className="e7">
							        <div className="semi_arc_3 e5_1">
							          <div className="semi_arc_3 e5_2">
							            <div className="semi_arc_3 e5_3">
							              <div className="semi_arc_3 e5_4" id="opt3" onClick={this.checkUserCoin}>
							              </div>
							            </div>
							          </div>
							        </div>
							        <div className="core2">
							        	<img src={this.state.option3.img} className="core2-img center-block" alt="img" />
							        </div>
							      </div>
							    </div>
							  </div>
							</div>
						</div>
                </div>
            </div>               
        </section>

			);
	}
}

export default GameOption;