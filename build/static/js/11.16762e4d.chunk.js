webpackJsonp([11],{180:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),i=n.n(s),c=n(19),l=n.n(c),p=n(11),u=n(191),m=n(262),f=(n.n(m),n(264)),g=n.n(f),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),A=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handlePassword=function(e){e.preventDefault();var t=n;new Promise(function(n,r){l.a.create({timeout:1e3,headers:{"X-Custom-Header":"foobar",Authorization:localStorage.getItem("token")||""}}).post(p.a+"/api/forget-password",{userEmail:e.target.userEmail.value}).then(function(e){!1===e.data.error?t.props.history.push("/login"):t.setState({errorMessage:e.data.message,successMessage:""}),n()}).catch(function(e){console.log(e)})})},n.state={errorMessage:"",successMessage:""},n}return o(t,e),d(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"forget-pwd"},i.a.createElement("div",{className:"heading"},i.a.createElement("h2",null,"Forget Password")),i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"mainbox pannel-center"},i.a.createElement(u.a,{message:this.state}),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("form",{method:"post",onSubmit:this.handlePassword},i.a.createElement("div",{className:"forget-show"},i.a.createElement("div",{className:"wrapping"},i.a.createElement("img",{src:g.a,alt:""}),i.a.createElement("h3",null,"You can reset your password here.."),i.a.createElement("div",{className:"input-group-prepend"},i.a.createElement("div",{className:"input-group center"},i.a.createElement("div",{className:"input-group-text"},i.a.createElement("i",{className:"fa fa-envelope "})),i.a.createElement("input",{type:"text",className:"form-control",id:"user-email",name:"userEmail",placeholder:"Email address"}))),i.a.createElement("button",{type:"submit",className:"btn btn-primary btn-lg",id:"forget-btn"},"Reset Password")))))))))}}]),t}(s.Component);t.default=A},191:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),c(t,[{key:"render",value:function(){var e;return""!==this.props.message.errorMessage&&""===this.props.message.successMessage?e=i.a.createElement("div",{className:"alert alert-danger"},i.a.createElement("strong",null,"Opps!")," ",this.props.message.errorMessage,"."):""===this.props.message.errorMessage&&""!==this.props.message.successMessage&&(e=i.a.createElement("div",{className:"alert alert-success"},i.a.createElement("strong",null,"Opps!")," ",this.props.message.successMessage,".")),i.a.createElement("div",null,e)}}]),t}(s.Component);t.a=l},262:function(e,t,n){var r=n(263);"string"===typeof r&&(r=[[e.i,r,""]]);var a={hmr:!1};a.transform=void 0;n(174)(r,a);r.locals&&(e.exports=r.locals)},263:function(e,t,n){t=e.exports=n(173)(!0),t.push([e.i,".forget-pwd{position:relative;padding:70px 0}.forget-show{padding:10px;background:rgba(0,0,0,.7)}.wrapping{padding:25px}.pannel-center{text-align:center}img{width:150px;height:150px}h1,h3{color:#fff}.center{width:60%;margin:0 auto}#forget-btn{margin-top:20px}","",{version:3,sources:["/var/www/html/gamefusion_master/src/user/Forgetpwd.css"],names:[],mappings:"AAAA,YACC,kBAAmB,AACnB,cAAgB,CAChB,AAED,aACC,aAAc,AACd,yBAA6B,CAE7B,AACD,UACC,YAAc,CAEd,AACD,eACC,iBAAmB,CACnB,AACD,IACG,YAAa,AACb,YAAc,CAChB,AACD,MACC,UAAW,CACX,AAED,QACC,UAAU,AACV,aAAc,CACd,AAWD,YACC,eAAiB,CAEjB",file:"Forgetpwd.css",sourcesContent:[".forget-pwd{\n\tposition: relative;\n\tpadding: 70px 0;\n}\n\n.forget-show{\n\tpadding: 10px;\n\tbackground : rgba(0,0,0,0.7);\n\n}\n.wrapping{\n\tpadding: 25px;\n\t\n}\n.pannel-center{\n\ttext-align: center;\n}\nimg{\n   width: 150px;\n   height: 150px;\n}\nh1,h3{\n\tcolor:#fff;\n}\n\n.center{\n\twidth:60%;\n\tmargin:0 auto;\n}\n@media screen and (max-width: 767px) {\n  .input-group{\n\n  }\n}\n/*center-block {\n    display: table;\n    margin-left: auto;\n    margin-right: auto;\n}*/\n#forget-btn{\n\tmargin-top: 20px;\n\n}\n"],sourceRoot:""}])},264:function(e,t,n){e.exports=n.p+"static/media/padlock.0663bcb8.svg"}});
//# sourceMappingURL=11.16762e4d.chunk.js.map