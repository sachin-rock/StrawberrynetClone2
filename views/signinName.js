// https://a.cdnsbn.com/images/common/Strawbaby_default.png


// var nameShow = document.getElementById("profileNameShow")
// var profileIconShow = document.getElementById("profileIconShow")
// var LoginedUser=localStorage.getItem("LoginedUser")
// console.log("LOFFFF",LoginedUser)
// if(LoginedUser){
//     profileIconShow.style.display="none"
//     nameShow.style.display="block"
//     var image = document.createElement("img")
//     image.src="https://a.cdnsbn.com/images/common/Strawbaby_default.png"
//     var profileName=document.createElement("h5")
//     profileName.style.marginTop="10px"
//     profileName.style.fontSize="16px"
//     profileName.style.fontWeight="bold"
//     profileName.textContent=LoginedUser
//     nameShow.style.display="flex"
//     nameShow.style.alignItems="center"
//     nameShow.style.gap="5px"
//     nameShow.append(image,profileName)

// }
var nameShow = document.getElementById("profileNameShow");
var profileIconShow = document.getElementById("profileIconShow");

let ShowName = async (token) => {
  console.log("dddddddddddddddddddd");
  try {
    let res = await fetch(`http://34.215.217.165:5000/user`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });

    let data = await res.json();
    console.log(data, "dataddddaa");
    LoginedUser = data[0].name;

    if (LoginedUser) {
      profileIconShow.style.display = "none";
      nameShow.style.display = "block";
      var image = document.createElement("img");
      image.src = "https://a.cdnsbn.com/images/common/Strawbaby_default.png";
      var profileName = document.createElement("h5");
      profileName.style.marginTop = "10px";
      profileName.style.fontSize = "16px";
      profileName.style.fontWeight = "bold";
      profileName.textContent = LoginedUser;
      nameShow.style.display = "flex";
      nameShow.style.alignItems = "center";
      nameShow.style.gap = "5px";
      nameShow.append(image, profileName);
    }
  } catch (error) {
    console.log(error);
  }
};
var token = JSON.parse(localStorage.getItem("token"));
ShowName(token);
