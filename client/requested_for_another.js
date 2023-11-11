import React from "react";
import vv from './vv.jpg'
import './requested_for_another.css';
import Web3 from "web3";
import land from '../constant/lands.json';
const contractAddress ="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi = land.abi;
class requested_for_another extends React.Component{
     constructor(props) {
          super(props);
          this.state = {
            landsale: [],
            // Array to hold the land ownership details
          };
        }
      
        componentDidMount() {
          this.getLandsale();
        }
        
        getLandsale = async () => {
          try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const registryContract = new web3.eth.Contract(abi, contractAddress);
            const accounts = await web3.eth.getAccounts();
            const landDetails = await registryContract.methods.getLRequseted().call();
            console.log(landDetails[0]);
            console.log(landDetails[1]);
            console.log(landDetails[2]);
            console.log(landDetails[3]);

            // Update the landOwners state with the data received
            this.setState({ landsale: landDetails });
          } catch (error) {
            console.log('Error retrieving land ownership details:', error);
          }
        };



     render(){
          const { landsale } = this.state;
          const landOwner1 = landsale[0];
          const landOwner2 = landsale[1];
          const landOwner3 = landsale[2];
          return(
          <div className="main5">
<h3>الطلبات التي تم ارسالها لشراء ماتمتلك من الاراضي</h3>
<img src={vv} className="vv" width={130} height={130}/>
<div className="cont2">
          <h4>1</h4>
          <ul>
            <li>الحالة  :{landOwner1}</li>
            <li>المنطقة : {landOwner2}</li>
            <li> ارقم التسلسلي: {String(landOwner3)}</li>
            <button></button>
          </ul>
        </div>
        <br />
        <button className="btn_req" >
قبول الطلب        </button>

          </div>)
     }
}
export default requested_for_another;