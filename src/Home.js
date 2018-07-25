import React, {Component} from 'react';
import './GameOption.css'
import game1 from './../assets/images/game1.png';
import game2 from './../assets/images/game2.png';
import { Link } from 'react-router-dom'
import {baseUrl} from './helpers/envHelper';
import axios from 'axios';


class Home extends Component {

	constructor(props){
		super(props);		
	}

	componentWillMount(){
		new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
							  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
					instance.post(baseUrl + '/')
					.then((data)=> {
						resolve();
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

	render() {

		return(

		<section className="game-option-circle home-game-option hidden-xs" id="game-home-circle">
		<h2 className="has-line-center headline text-center">Choose Your Game</h2>
            <div className="container text-center">
                	<div className="row">
						<div className="col-md-7 col-sm-12">
							<div className="full-width">
							  <div className="arc_reactor">
							    <div className="case_container center-block">
							    <Link to="/game-option/1">
							      <div className="e7">
							        <div className="semi_arc_3 e5_1">
							          <div className="semi_arc_3 e5_2">
							            <div className="semi_arc_3 e5_3">
							              <div className="semi_arc_3 e5_4">
							              </div>
							            </div>
							          </div>
							        </div>
							        <div className="core2">
							       
							        	<img src={game1} className="core2-img center-block" alt="img" />
							        
							        </div>
							      </div>
							      </Link>
							    </div>
							  </div>
							</div>
						</div>

						<div className="col-md-5 col-sm-12">
							<div className="full-width">
							  <div className="arc_reactor">
							    <div className="case_container center-block">
							    <Link to="/game-option/2">
							      <div className="e7">
							        <div className="semi_arc_3 e5_1">
							          <div className="semi_arc_3 e5_2">
							            <div className="semi_arc_3 e5_3">
							              <div className="semi_arc_3 e5_4">
							              </div>
							            </div>
							          </div>
							        </div>
							        <div className="core2">
							        	<img src={game2} className="core2-img center-block" alt="img" />
							        </div>
							      </div>
							      </Link>
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

export default Home;