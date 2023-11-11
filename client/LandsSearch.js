import React from "react";
import './LandsSearch.css';
import loup from './loupe.png';
import Web3 from "web3";
import land from '../constant/lands.json';

const contractAddress ="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi = land.abi;
class LandsSearch extends React.Component{
     constructor(props) {
          super(props);
          this.state = {
           city: '',
           state1: '',
          survynum: '',
          };
        }
     getLandDetails = async () => {
          try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const registryContract = new web3.eth.Contract(abi, contractAddress);
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            const landDetails = await registryContract.methods.getLandDetails(this.state.state1,this.state.city,this.state.survynum).call();
           console.log(landDetails[0]);
           console.log(landDetails[1]);
           console.log(landDetails[2]);
          }    
           catch (error) {
            console.log('Error retrieving land ownership details:', error);
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
          <div className="main6">
<h3>البحث عن ارض</h3>
 <img src={loup}  width={100} height={100}/>
 <form className="form3">
  <input type="text" placeholder="ادخل المنطقة"  name="city" value={this.state.city} onChange={this.handleInputChange} />
          <input type="text" placeholder="ادخل الحالة"  name="state1" value={this.state.state1} onChange={this.handleInputChange} />
          <input type="text" placeholder="ادخل الرقم التسلسلي"   name="survynum" value={this.state.survynum} onChange={this.handleInputChange}/>
          <button className="btn_search"  onClick={this.getLandDetails}>بحث</button>

  </form>
          </div>)
     }
}export default LandsSearch;