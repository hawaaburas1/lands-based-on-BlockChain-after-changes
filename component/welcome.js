import React from "react-dom";
import './welcome.css';
import Web3 from "web3";

import { Component } from "react";
import userimg from './11.png' ;
import img2 from './welcome.jpg';
class Welcome extends Component{
    render(){
     return(
          <div className="container">
                <div className="child">
          <h2>الهيئة العامة للاراضي والمساحات</h2>
          
                  </div>
               <div className="write">
               <p>  لبيع وشراء الاراضي التطبيق اللامركزي لحفظ السجلات الخاصة بالممتلكات بشكل امن ضمن شبكة البلوك تشين BlockChain مرحبا بكم في تطبيق </p>
             </div>
             <h4>your transictions are faster</h4>

             <img src={userimg} className="img" width={200}height={200} alt="" />
             <button className="login-button" onClick= {this.props.connectWallet} >الاتصال بالمحفظة الالكترونية</button>
             <img src={img2} className="ii"width={300}height={300} alt="" />
         <div className="con1">
          <h3>Lands Based On BlockChain</h3>
         </div>
          </div>
          
     )
    }
     
     
}
export default Welcome;
