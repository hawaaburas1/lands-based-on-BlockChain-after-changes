pragma solidity >=0.4.25 <0.9.0;
contract lands{
     struct Admin {
          address adminAdress;
          string adminName;
          string area;     
}
//تعريف بيانات الارض
struct landDetails{
     address owner;
     address admin;
     uint256 propertyPID;
     uint256 surveynumb;
     uint256 index;
     bool registered;
     bool makeAvialbel;
    // string directorate;
     string area;
     //string register_date;
     uint256 size_meter;
     // string  boundryNorth;
     // string  boundrySouth;
     // string  boundryEast;
     // string  boundryWestern;
     uint256   noOfRequested;
     //reqNo=>RequestDetails
      mapping (uint=>RequestDetails)requests;
}
//لتعريف البيانات الشخصية للمالك
struct UserProfile{
     address useraddress;
     string fullname;
     // string gender;
     string contact;
     string email;
    uint256 totalIndices;
    uint256 requesIndices;
    
}
//لتعريف مايمتلك المالك من اراضي
struct ownerOwns{
     uint surveynumber;
     string state;
     string city;
}
//الاراضي التي تم ارسال طلب لشراءها
struct RequestedLands {
     uint surveynumber;
     string state;
     string city;     
}
struct LandsForsale{
     uint surveynumber;
     string state;
     string city;     
}
//معلومات الطلب المرسل
struct RequestDetails {
     address whoRequested;
     uint reqIndex;
}
//string=>mapping (string=>mapping
mapping(address => uint256[]) private ownerLandIds;//


mapping (address => Admin) public admins;
mapping (address =>ownerOwns) public ownerMapsProperty;
mapping (address=>landDetails) public landDetailsMap;
mapping(uint => LandsForsale) public landForSale;
mapping(address=>RequestedLands) public requests1;


mapping (address=>UserProfile) public userProfile;
// //variable declartion
 //address public superAdmin;
 uint256 public totalAdmin=1;
uint256 public totalIndices=1;
uint256 public indexs=0;
address addressreq;
// constructor (){
//      superAdmin=msg.sender;     
// }
modifier onlyAdmin() {
     require(admins[msg.sender].adminAdress==msg.sender,"only Admin can register land");
     _;
}
 


// //اضافة مدير
function addAdmin(address _adminAddress,string memory _adminName,string memory _city)external {
     Admin storage newAdmin=admins[_adminAddress];
     totalAdmin++;
     newAdmin.adminAdress=_adminAddress;
     newAdmin.area=_city;
     newAdmin.adminName=_adminName;     
}//للتحقق من المدير
// function IsAdmin()external view returns(bool) {
//      if(admins[msg.sender]==msg.sender){
//           return true;}
//      else return false;     
// }
//لتسجيل الارض للمالك
function registerLand(
     //string memory _admin_name,
     string memory _city,
     string memory _state,
     uint256 _propertyPID,
     uint _surveynumber,
     address _owner,
    // string memory _directorate,
     string memory _area, 
     uint256 _size_meter
     // string memory _boundry_North,
     // string memory  _boundry_South
    //string memory _register_Date
     //string memory _boundry_Western
    ) external {
     // require(keccak256(abi.encodePacked(admins[msg.sender].admin_name))==keccak256(abi.encodePacked(_admin_name))&&
     // keccak256(abi.encodePacked(admins[msg.sender].city))==keccak256(abi.encodePacked(_city)),"kkkkkkkk")
     // require(landDetailsMap[_state][_city][_surveynumber].registered==false,"sssssss");
     landDetails storage newLandRegistry=landDetailsMap[_owner];
     ownerOwns storage newOwnerOwnes=ownerMapsProperty[_owner];
     newLandRegistry.owner=_owner;
     newLandRegistry.admin=msg.sender;
     newLandRegistry.propertyPID=_propertyPID;
     newLandRegistry.surveynumb=_surveynumber;
     newLandRegistry.index=userProfile[_owner].totalIndices;
     newLandRegistry.registered=true;
     newLandRegistry.makeAvialbel=false;
   //  newLandRegistry.register_date=_register_Date;
     // newLandRegistry.boundryNorth=_boundry_North;
     //newLandRegistry.boundry_Western=_boundry_Western;
     // newLandRegistry.boundrySouth=_boundry_South;
     newLandRegistry.size_meter=_size_meter;
     newLandRegistry.area=_area;
     //newLandRegistry.directorate=_directorate;
     newOwnerOwnes.surveynumber=_surveynumber;
     newOwnerOwnes.state=_state;
     newOwnerOwnes.city=_city;
     userProfile[_owner].totalIndices++;}

     //لتحديث البيانات الخاصة بالمالك
function setUserProfile(address address1,string memory _fullName,string memory _email,string memory _contact)public {
          UserProfile storage newUserProfile=userProfile[address1];
          newUserProfile.fullname=_fullName;
          // newUserProfile.gender=_gender;
          newUserProfile.email=_email;
          newUserProfile.contact=_contact;

     }
       



  
//      //لجعل الارض متاحه للبيع
     function MakePropertyAvailble(address address1)external {
          string memory state=ownerMapsProperty[address1].state;
          string memory city=ownerMapsProperty[address1].city;
          uint surveynumber=ownerMapsProperty[address1].surveynumber;
          require(landDetailsMap[address1].makeAvialbel==false,"this land is already avialble");
          landDetailsMap[address1].makeAvialbel=true;
          LandsForsale storage land1=landForSale[0];
          land1.city=city;
          land1.state=state;
          land1.surveynumber=surveynumber;
          indexs++;

         
        }
function getLandsale()external view returns(string memory,string memory,uint) {
uint surveyNo=landForSale[0].surveynumber;
string memory state=landForSale[0].state;
string memory city=landForSale[0].city;
return(state,city,surveyNo);     
}
function getLRequseted()external view returns(address,string memory,string memory,uint) {
uint surveyNo= landForSale[0].surveynumber;
string memory state=landForSale[0].state;
string memory city=landForSale[0].city;
return(addressreq,state,city,surveyNo);     
}
      
        

// //      //لارسال طلب لشراء الارض
     function RequestForBuy(address address1,string memory _state,string memory _city,uint _surveynumber)external {
          landDetails storage thisLandDetail=landDetailsMap[address1];
          require(thisLandDetail.makeAvialbel==true,"this land is not for sale");
          uint req_serialNum=thisLandDetail.noOfRequested;
          thisLandDetail.requests[req_serialNum].whoRequested=address1;
          thisLandDetail.requests[req_serialNum].reqIndex=userProfile[address1].requesIndices;
          thisLandDetail.noOfRequested++;
          //adding requseted land to user2 profile
          RequestedLands storage newRequestedLands=requests1[address1];
          newRequestedLands.surveynumber=_surveynumber;
          newRequestedLands.state=_state;
          newRequestedLands.city=_city;
          addressreq=address1;
          userProfile[address1].requesIndices++;
          LandsForsale storage land=landForSale[0];
          land.city=_city;
          land.state=_state;
          land.surveynumber=_surveynumber;}
      
          
// //      //لقبول الطلب واجراء عملية البيع
//      function AcceptRequest(address address1,uint _reqNo)external payable {
//           uint _surveyNo=ownerMapsProperty[address1].surveynumber;
//           string memory _state=ownerMapsProperty[address1].state;
//           string memory _city=ownerMapsProperty[address1].city;
//           //updating landDetails
//           address newOwner=landDetailsMap[_state][_city][_surveyNo].requests[_reqNo].whoRequested;
//           //uint newOwner_reqIndex=landDetailsMap[_state][_city][_surveyNo].requests[_reqNo].reqIndex;
//         uint noOfReq=landDetailsMap[_state][_city][_surveyNo].noOfRequested;
//    //deleting reqested land from all requested And removing all incoming requests
//    for(uint i=0;i<noOfReq;i++){
//      address requesterAddr=landDetailsMap[_state][_city][_surveyNo].requests[i].whoRequested;
//      uint requester_reqIndex=landDetailsMap[_state][_city][_surveyNo].requests[i].reqIndex;
//      delete registeredland[requesterAddr][requester_reqIndex];
//      delete landDetailsMap[_state][_city][_surveyNo].requests[i];
//    }
//    landDetailsMap[_state][_city][_surveyNo].owner=newOwner;
//    landDetailsMap[_state][_city][_surveyNo].makeAvialbel=false;
//    landDetailsMap[_state][_city][_surveyNo].noOfRequested=0;
//    //deleting property from user ownermapProperty
//    delete ownerMapsProperty[address1];
//    payable(msg.sender).transfer(2 ether);
//    //اضافة الارض للمالك الجديد(نقل ملكية)
     
// uint newOwnerTotProp=userProfile[newOwner].totalIndices;
// ownerOwns storage newOwnerOwnes=ownerMapsProperty[newOwner];
// newOwnerOwnes.surveynumber=_surveyNo;
// newOwnerOwnes.state=_state;
// newOwnerOwnes.city=_city;
// landDetailsMap[_state][_city][_surveyNo].index=newOwnerTotProp;
// userProfile[newOwner].totalIndices++;
//      }
function acceptRequest(address address1, uint _reqNo) external payable onlyAdmin {
    address newOwner = landDetailsMap[address1].requests[_reqNo].whoRequested;
    string memory state = ownerMapsProperty[address1].state;
    string memory city = ownerMapsProperty[address1].city;
    uint surveyNo = ownerMapsProperty[address1].surveynumber;

    // Updating landDetails
    landDetailsMap[address1].owner = newOwner;
    landDetailsMap[address1].makeAvialbel = false;
    landDetailsMap[address1].noOfRequested = 0;

    // Deleting requested land from all requested and removing all incoming requests
//     for(uint i = 0; i < landDetailsMap[address1].noOfRequested; i++) {
//         address requesterAddr = landDetailsMap[address1].requests[i].whoRequested;
//         uint requesterReqIndex = landDetailsMap[address1].requests[i].reqIndex;
//         delete requests1[requesterAddr];
//         delete landDetailsMap[address1].requests[i];
//     }

    // Transferring ownership by adding the land to the new owner
    ownerOwns storage newOwnerOwnes = ownerMapsProperty[newOwner];
    newOwnerOwnes.surveynumber = surveyNo;
    newOwnerOwnes.state = state;
    newOwnerOwnes.city = city;
    landDetailsMap[address1].index = userProfile[newOwner].totalIndices;
    userProfile[newOwner].totalIndices++;

    // Transferring the payment to the current admin
    payable(msg.sender).transfer(msg.value);
}

     //للحصول على معلومات الارض
     function getLandDetails(address address1)external view returns(address,uint256,uint) {
          address owner=landDetailsMap[address1].owner;
          uint256 propertyid=landDetailsMap[address1].propertyPID;
          uint index=landDetailsMap[address1].index;
          return(owner,propertyid,index);
          
     }
        
     //
//      function getRequestcnt_proId(string memory _state,string memory _city,uint _surveyNo)external view returns(uint,uint256) {
//           uint _noOfRequestes=landDetailsMap[_state][_city][_surveyNo].noOfRequested;
//           uint256 _propertyId=landDetailsMap[_state][_city][_surveyNo].propertyPID;
//           return(_noOfRequestes,_propertyId);
          
//      }

//      //لارجاع عنوان الشخص الذي قام بارسال طلب لشراء الارض
// function getRequesterDetail(string memory _state,string memory _city,uint _surveyNo,uint _reqIndex)external view returns(address) {
//      address requester=landDetailsMap[_state][_city][_surveyNo].requests[_reqIndex].whoRequested;
//      return(requester);
     
// }
//للتحقق من اذا كانت الارض متاحه للبيع
// function IsAvailable(string memory _state,string memory _city,uint _surveyNo)external view returns(bool) {
// bool available=landDetailsMap[_state][_city][_surveyNo].makeAvialbel;
// return(available);     
// }
//عرض مايمتلك المالك من اراضي مسجلة باسمه
function getownerOwns(address address1)external view returns(string memory,string memory,uint) {
uint surveyNo=ownerMapsProperty[address1].surveynumber;
string memory state=ownerMapsProperty[address1].state;
string memory city=ownerMapsProperty[address1].city;
return(state,city,surveyNo);     
}
// /////// ارسال طلب لشراءها عرض معلومات عن الاراضي التي تم 
// function getRequestedLands(address address1)external view returns(string memory,string memory,uint) {
// uint surveyNo=landForSale[address1].surveynumber;
// string memory state=landForSale[address1].state;
// string memory city=landForSale[address1].city;
// return(state,city,surveyNo);     
// }
//للحصول على معلومات المالك الشخصية
function getUserProfile(address address1)external view returns(string memory,string memory,string memory) {
string memory contact=userProfile[address1].contact;
string memory fullname=userProfile[address1].fullname;
string memory email=userProfile[address1].email;
// string memory gender=userProfile[msg.sender].gender;
return(fullname,email,contact);

}

     
}




