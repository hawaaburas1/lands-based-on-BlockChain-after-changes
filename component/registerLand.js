import React from "react-dom";
import './register.css';
import img2 from './land.png';
import land from '../constant/lands.json';
import Web3 from 'web3';
import { Component } from "react";
const contractAddress="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi=land.abi;
class registeredland extends Component{
  constructor(props) {
    super(props);
    this.state = {
      LandNo: '',
      ownAddress: '',
    LandSize: '',
    area1:'',
    city:'',
    state1:'',
    survyNo:''

    };
  }

registerLand = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const registryContract = new web3.eth.Contract(abi, contractAddress);
    await registryContract.methods.registerLand(this.state.city,this.state.state1,this.state.LandNo,this.state.survyNo,this.state.ownAddress,this.state.area1,this.state.LandSize)
      .send({ from: address, gas: 3000000 });
    alert('تمت تسجيل الارض بنجاح');
    console.log('nice');
    this.setState({
      LandNo: '',
      ownAddress: '',
      LandSize: '',
      area1:'',
      city:'',
      state1:'',
      survyNo:''
    });
  } catch (error) {
    console.log(error);
  }
}
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

render(){return(
<div className="cover">
        {/* <h6>تسجيل الارض</h6> */}
          <img src={img2}  width={100}height={100} alt="" />
          <input type="text" placeholder="ادخل رقم الارض"  name="LandNo" value={this.state.LandNo} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل عنوان المالك" name="ownAddress" value={this.state.ownAddress} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل مساحة الارض" name="LandSize" value={this.state.LandSize} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل المنطقة" name="city" value={this.state.city} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل الحالة" name="state1" value={this.state.state1} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل الرقم التسلسلي" name="survyNo" value={this.state.survyNo} onChange={this.handleInputChange}/>
          <button className="login-btn" onClick={this.registerLand}>تسجيل</button>
        </div>
)}
}

export default registeredland;
