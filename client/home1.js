import React from "react";
import './home1.css';
import LandsOwns from './LandsOwns';
import UserProfile from './userProfile';
import landsSearch from './LandsSearch';
import requested_for_another from './requested_for_another';
import requested_for_you from './requested_for_you';
import { Route, BrowserRouter,Routes } from "react-router-dom";
import kk from './kk.png';
import blo from './blo.png';
import gg from '../component/11.png';
class home1 extends React.Component{
  render(){
    return(
      <div className="main1">
        <div className="title1"> <h5>الصفحة الرئيسية</h5></div>
       <div className="Links1">
        <ol>
          <a href="/"><li>الصفحة الرئيسية</li></a>
          <a href="/userProfile"><li>البيانات الشخصية</li></a>
          <a href="/LandsOwns"><li>الاراضي المملوكة</li></a>
          <a href="/requested_for_you"><li>الأراضي المعروضه للبيع</li></a>
          <a href="/requested_for_another"><li>الطلبات المقدمة اليك</li></a>
          <a href="/LandsSearch"><li>البحث عن ارض</li></a>

        </ol>
       </div> 
       <div>
       
        </div>
        <div className="con">
        قم باجراء اي معاملة اذا كنت تريد ذلك سوى تحديث بياناتك الشخصية او عرض ماتمتلك من اراضي مسجلة باسمك او البحث عن ارض معينة او جعل ارضك معروضة للبيع او ارسال طلب لشراء ارض ما   سوف يتم تخزين ماقمت بعملة على شبكة البلوكتشين بشكل مشفر وامن ومن دون اي خوف او قلق 
        <img src={blo} className="fs"  width={100}height={100} alt="" />

          </div>   
      </div>
      
    )
  }
}
export default home1;