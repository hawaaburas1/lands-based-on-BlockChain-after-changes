import React, { useEffect, useState } from "react";
import im from "./ppp.jpg";
import Web3 from "web3";
import { ethers, recoverAddress } from "ethers";
import vv from "./vv.jpg";
import land from "../constant/lands.json";
import ff from "./fff.png";
import './userProfile.css';

const contractAddress ="0x36dc8708E07346c4053CE6D1A058550729D70Ba4";
const abi = land.abi;

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const setUserProfile = async () => {
    try {
      if (!fullName || !email || !contact) {
        alert('يرجى ملء جميع الحقول');
        return;
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      await registryContract.methods.setUserProfile(address, fullName, email, contact)
        .send({ from: address, gas: 3000000 });
      alert('تمت التعديل بنجاح');
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfile = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const registryContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const profileData = await registryContract.methods.getUserProfile(address).call();
      setFullName(profileData[0]);
      setEmail(profileData[1]);
      setContact(profileData[2]);
    } catch (error) {
      console.log('No');
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'fullName') {
      setFullName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'contact') {
      setContact(value);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const validateFullName = (value) => {
    // Allow only text characters (a-z, A-Z) and spaces
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value);
  };

  const validateEmail = (value) => {
    // Basic email validation
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(value);
  };

  const validateContact = (value) => {
    // Allow only numeric characters
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };

  return (
    <div className="cover1">
      <h3>البيانات الشخصية</h3>
      <br />
      <img src={ff} className="gg1" width={100} height={100} alt="" />
      <input
        type="text"
        placeholder="ادخل الاسم"
        name="fullName"
        value={fullName}
        onChange={handleInputChange}
        onInput={(e) => {
          if (!validateFullName(e.target.value)) {
            e.target.setCustomValidity("يرجى إدخال أحرف فقط");
          } else {
            e.target.setCustomValidity("");
          }
        }}
        required
      />
      <input
        type="email"
        placeholder="ادخل البريد الالكتروني"
        name="email"
        value={email}
        onChange={handleInputChange}
        onInput={(e) => {
          if (!validateEmail(e.target.value)) {
            e.target.setCustomValidity("يرجى إدخال بريد إلكتروني صالح");
          } else {
            e.target.setCustomValidity("");
          }
        }}
        required
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder="ادخل الرقم"
        name="contact"
        value={contact}
        onChange={handleInputChange}
        onInput={(e) => {
          if (!validateContact(e.target.value)) {
            e.target.setCustomValidity("يرجى إدخال أرقام فقط");
          } else {
            e.target.setCustomValidity("");
          }
        }}
        required
      />
      <button className="edit" onClick={setUserProfile}>
        تعديل
      </button>
      <br />
      {/* <button onClick={getUserProfile}>استرجاع البيانات</button> */}
    </div>
  );
};

export default UserProfile;