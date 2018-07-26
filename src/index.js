import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './App';
import {baseUrl} from './helpers/envHelper';
import registerServiceWorker from './registerServiceWorker';

//socket code
import { socketConnect } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect(baseUrl);

// window.addEventListener("beforeunload", (ev) => 
// {  
//     socket.emit('userdisconnect', { unq_id: localStorage.getItem('user-unqId') });
// });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
