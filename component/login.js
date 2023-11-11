import { Component,React,useState} from "react";
import './login.css';
import {useNavigate} from 'react-router-dom';

import userimg from './Picture1.jpg';
import Home from "./home";
class Login extends Component {

  render() { 

    return ( 
      <div className="container6">
        <div className="child6">
          <h2>تم الاتصال بنجاح</h2>
        </div>
        <div className="write2">
          <p>{this.props.account}:العنوان الخاص بك هو</p>
        </div>
        <h3>Now you are connected to BlockChain Network</h3>
        <img src={userimg} className="img" width={250} height={250} alt="" />
        

        <button className="login-button1" >
        <a href="/home"><li>تخطي</li></a>
        </button>
      </div>
    );
  }
}

export default (Login); 