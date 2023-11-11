import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component{
     render(){
          return(
               <nav className="Navbar">
                    <h3 className="logo">logo</h3>
                    <ul className="Navlinks">
<Link to='/'><li>الصفحة الرئيسية</li></Link>
<Link to='/userProfile'><li>البيانات الشخصية</li></Link>
<Link to='/requested_for_another'><li>الطلبات المقدمة </li></Link>
<Link to='/requested_for_you'><li>طلبات لشراء ماتمتلك</li></Link>
<Link to='/LandsSearch'><li>البحث عن ارض</li></Link>

                    </ul>
               </nav>
          )
     }
}
export default Navbar;