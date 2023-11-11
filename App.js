import './App.css';
import { useState,useEffect } from 'react';
import Web3 from 'web3';
import Login from './component/login';
// import Nav from './component/Nav';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import UserProfile from './client/userProfile';
// import { Link } from 'react-router-dom';
import Welcome from './component/welcome';
import Regiser from './component/registerLand';
import Home from './component/home';
import AA from './component/addAdmin';
import RegisterLand from './component/registerLand';
import Login1 from './component/login1';
import Home1 from './component/home';
import login1 from './component/login1';
import searchLand from './client/LandsSearch';
import requested_For_you from './client/requested_for_you';
import requested_for_another from './client/requested_for_another';
import Navbar from './client/Navbar1';
import home1 from './client/home1';
import LandsOwns from './client/LandsOwns';
function App() 
{  
  
  const [connected, setConnected] = useState(false);
  const [account, setAccounts] = useState([]);
 
  useEffect(() => {
    if (window.ethereum) {
     window.ethereum.on("accountsChanged",handleAccountsChanged);
}
return()=>{
  if(window.ethereum){
    window.ethereum.removeListener("accountsChanged",handleAccountsChanged)
  }
}
});
async function handleAccountsChanged(accounts){
  if(accounts.length>=0 && accounts !==accounts[0]){
    setAccounts(accounts[0]);
  }else{setConnected(false);
  setAccounts(null);}
}

    async function connectMetamask() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const address=accounts[0];
         setAccounts(address);
         setConnected(true)
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Metamask not detected');
      }
    }
    

 
   
  return (
    <BrowserRouter>
    <div>
  {connected?(<Login account={account}/>):(<Welcome connectWallet={connectMetamask}/>)}  
// //   {/* </div>    */}
    <Routes>
          <Route exact path='/home' Component={Home1}/>
  <Route  path='/addAdmin' Component={login1}/>
   <Route  path='/registerLand' Component={Regiser}/> 
      <Route exact  path='/home' Component={Home1}/> 
     </Routes>   
       </div> 

 </BrowserRouter>  
//     <BrowserRouter>
//   <div>
//    <Routes>
//       <Route exact path='/' Component={home1}/>
//     <Route  path='/userProfile' Component={UserProfile}/>
//     <Route  path='/LandsOwns' Component={LandsOwns}/>
//     <Route  path='/requested_for_you' Component={requested_For_you}/>
//    <Route  path='/requested_for_another' Component={requested_for_another}/>
//    <Route  path='/LandsSearch' Component={searchLand}/>
//     </Routes>
//  </div>
//  </BrowserRouter>


  


  
  );


 

  
   

   
  
}

export default App;
