import React from "react";
import './addAdmin.css';
import im from './man.png';
import Web3 from "web3";
import { ethers } from "ethers";
import land from '../constant/lands.json';
// import { contractAbi,contractAddress } from "../constant/constant";
const contractAddress="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi=land.abi;

class addAdmin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      adminAdress: '',
      adminName: '',
    area: ''
    };
  }


  addAdmin1 = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      await  registryContract.methods.addAdmin(this.state.adminAdress,this.state.adminName,this.state.area)
        .send({ from: address, gas: 3000000 });
      alert('تمت الاضافة بنجاح');
      console.log('nice');
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

  render(){
    return(
      <div className="mainclass">
        
        <h1>اضافة مدير</h1>
        <div className="image">
        <img src={im}  width={100}height={100} alt="" />
        </div>
        <div className="form1">
        <label>
          عنوان المدير:
          <input type="text" name="adminAdress" value={this.state.adminAdress} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          اسم المدير:
          <input type="text" name="adminName" value={this.state.adminName} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
         المنطقة:
          <input type="text" name="area" value={this.state.area} onChange={this.handleInputChange} />
        </label>
        <br />
        <button onClick={this.addAdmin1}>اضافة</button>

        </div>
        </div>
    )
  }
}
export default addAdmin;












