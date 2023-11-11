import React from "react";
import './LandsOwns.css';
import ss from './ss.jpg';
import Web3 from "web3";
import land from '../constant/lands.json';
import own from '../component/o.jpg';
import hh from '../component/hh.jpg';
const contractAddress ="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi = land.abi;

class LandsOwns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landOwners: [],
      landOwners2:[] // Array to hold the land ownership details
    };
  }

  getOwnerOwns = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const landDetails = await registryContract.methods.getownerOwns(address).call();
      console.log(landDetails[0]);
      console.log(landDetails[1]);
      console.log(landDetails[2]);
     
      // Update the landOwners state with the data received
      this.setState({ landOwners: landDetails });
    } catch (error) {
      console.log('Error retrieving land ownership details:', error);
    }
  }
 
  getlandDetails = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const landDetails2 = await registryContract.methods.getLandDetails(address).call();
      console.log(landDetails2[0]);
      console.log(landDetails2[1]);
      console.log(landDetails2[2]);
     
      // Update the landOwners state with the data received
      this.setState({ landOwners2: landDetails2 });
    } catch (error) {
      console.log('Error retrieving land ownership details:', error);
    }
  }

  makeAvailbel = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      await registryContract.methods.MakePropertyAvailble(address).send({ from: address, gas: 3000000 });
      ;
      alert('تم عرض الارض للبيع بنجاح');
    } catch (error) {
      console.log('Error retrieving land ownership details:', error);
    }
  }
  componentDidMount() {
    this.getOwnerOwns(); 
    this.getlandDetails();// Call the getOwnerOwns function when the component mounts
  }
  
  render() {
    const { landOwners } = this.state;
    const landOwner1 = landOwners[0];
    const landOwner2 = landOwners[1];
    const landOwner3 = landOwners[2];
   const {landOwners2}=this.state; 
   const l1=landOwners2[0];
   const l2=landOwners2[1];
   const l3=landOwners2[2];
    return (
      <div className="main3">
        <h3>ممتلكاتك من الأراضي</h3>
        <img src={own} className="ss" width={130} height={130} />
        <div className="cont">
        <h4>تفاصيل الملكية</h4>
        {/* <img src={hh} className="kk33"width={230} height={330}  /> */}

          {/* <button onClick={this.getlandDetails}>جرب</button> */}
          {/* Display land ownership details */}
          {/* {landOwners.length > 0 && ( */}
            <div className="cont1">
              <ul>
              <li> الفهرس : {String(l3)}</li>
              <li>رقم الارض :{String(l2)}</li>
              <li>:عنوان المالك<br/>{String(l1)}</li>
                <li>الحالة  :{landOwner1}</li>
                <li>المنطقة : {landOwner2}</li>
                <li> ارقم التسلسلي: {String(landOwner3)}</li>

                <li><button onClick={this.makeAvailbel}>جعل الارض معروضه للبيع</button></li>
              </ul>
            </div>
        </div>
      </div>
    );
  
  }
}

export default LandsOwns;