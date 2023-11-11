import React from "react";
import './home.css';
import my from './Picture1.jpg';
import bb from './bb.png';
import { Route, BrowserRouter,Routes } from "react-router-dom";
class Home extends React.Component{
  render(){
    return(

      <div className="Container2">
        <div className="title"> <h5>الصفحة الرئيسية</h5></div>
        <div className="header2">
       
        <ul>
        <a href='/'><p>الصفحة الرئيسية</p></a>
        <a href='/addAdmin'><p>اضافة مدير</p></a>
        <a href='/registerLand'><p>تسجيل ارض</p></a>
        </ul>
        </div>
        <img src={my}  className="img" width={400}height={350} alt="" />
        
     <div className="wel"><h4>welcome in the Home Page to register Land</h4>
     <br/>
     <h4>يجب ملاحظة انه سيتم اضافة البيانات على شبكة</h4>
     <br/>
     <h4>واي خطأ فيها سيعرضك للمسألة القانونية</h4>
     <br/><br/>
     <img src={bb}  className="img7" width={100}height={100} alt="" />

     </div>
      </div>
      
    )
  }
}
export default Home;