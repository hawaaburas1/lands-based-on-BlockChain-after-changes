import React from "react";
import "./login1.css";
import im from './man.png';
import Web3 from "web3";
import land from '../constant/lands.json';
const contractAddress="0xd92241Ed9A47A467D6E26bc8BdFdA71a5ba36753";
const abi=land.abi;

class addAdmin extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
            adminAdress:'',
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
     <div className="cover">
          <h1>اضافة مدير</h1>
          <img src={im}   width={100}height={100} alt="" />
          <input type="text" placeholder="ادخل عنوان المدير"  name="adminAdress" value={this.state.adminAdress} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل اسم المدير" name="adminName" value={this.state.adminName} onChange={this.handleInputChange}/>
          <input type="text" placeholder="ادخل المنطقة" name="area" value={this.state.area} onChange={this.handleInputChange}/>
          <button className="login-btn" onClick={this.addAdmin1}>اضافة</button>
          <div className="alt-login">
           <div className="facebook"></div>
           <div className="google"></div>
          </div>

     </div>
)}
}
export default addAdmin;
