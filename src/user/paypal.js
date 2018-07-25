import React from 'react';
import {baseUrl} from './../helpers/envHelper';
import axios from 'axios'
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Payment extends React.Component {

    render() {		
		const onSuccess = (payment) => {
    		console.log("The payment was succeeded!", payment);
    		new Promise((resolve,reject) => {
					const instance = axios.create({
						  timeout: 1000,
						  headers: {'X-Custom-Header': 'foobar','Authorization' : localStorage.getItem('token') || ''}
						});
						instance.post(baseUrl + '/paypal-details',{
						userId        : localStorage.getItem("user-id"),
						offerId       : this.props.offerId,
						offerCoin	  : this.props.offerCoin,
						paymentId     : payment.paymentID,
						paymentStatus : payment.paid

					})
					.then((response)=> {
						if(response.data.error === false)
						{
							this.props.updateState('',response.data.message)
						}
						if(response.data.error === true)
						{
							this.props.updateState(response.data.message,'')
						}
						resolve();
					});
					
			});
            		
		}		
		
		const onCancel = (data) => {
			console.log('The payment was cancelled!', data);
			
		}	
		
		const onError = (err) => {
			console.log("Error!", err);
		}			
			
		let env = 'sandbox'; 
		let currency = 'INR';  
		let total = this.props.amount; 
		
		const client = {
			sandbox:    'AQJUqF-l_LnaMPPuBB6OAsWSYmzk93VI8666gZmn-x6ddJgtl7dqYt6R1RLapZxoXXQnURqf1ItK0g-J',
			production: 'YOUR-PRODUCTION-APP-ID',
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		
		
		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}