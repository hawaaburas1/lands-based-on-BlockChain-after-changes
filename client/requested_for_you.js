import React from "react";
import './requested_for_you.css';
import zz from './zz.png';
import Web3 from "web3";
import land from '../constant/lands.json';
const contractAddress ="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi = land.abi;


class requested_for_you extends React.Component {
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

  RequestForBuy = async (address, landStatus, landArea, landSerial) => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      await registryContract.methods
        .RequestForBuy(address, landStatus, landArea, landSerial)
        .send({ from: address, gas: 3000000 });
      alert('تم ارسال الطلب بنجاح');
    } catch (error) {
      console.log('Error retrieving land ownership details:', error);
    }
  };

  getLandsale = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const landDetails = await registryContract.methods.getLandsale().call();
      console.log(landDetails[0]);
      console.log(landDetails[1]);
      console.log(landDetails[2]);

      // Update the landOwners state with the data received
      this.setState({ landsale: landDetails });
    } catch (error) {
      console.log('Error retrieving land ownership details:', error);
    }
  };

  render() {
    const { landsale } = this.state;
    const landOwner1 = landsale[0];
    const landOwner2 = landsale[1];
    const landOwner3 = landsale[2];

    return (
      <div className="main4">
        <h3>الاراضي المعروضه لللبيع</h3>

        <img src={zz} className="zz" width={100} height={100} />

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
        <button className="btn_req" onClick={() => this.RequestForBuy('0xdbEE24d797A2B421bc1289667436A36a8f4bc36e', landOwner1, landOwner2, landOwner3)}>
          ارسال طلب لشراء
        </button>
      </div>
    );
  }
}

export default requested_for_you;