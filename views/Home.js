function myFunction() {
  document
    .getElementsByClassName("dropdown-content")[0]
    .classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementsByClassName("dropdown-content")[0];
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

//   D:\straberryProject-main\Home.js

// var arr = JSON.parse(localStorage.getItem("projectData")) || [];
var arr1 = JSON.parse(localStorage.getItem("wishlist")) || [];
var Laodcount = document.getElementsByClassName("cartCount")[0];
console.log(Laodcount.innerText);
var token = JSON.parse(localStorage.getItem("token"));
var ID = localStorage.getItem("loginedId");
var userAllready;

function cartCountShow() {
  let url = `http://34.215.217.165:5000/cart`;
  async function FetchApi() {
    try {
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      console.log();

      Laodcount.innerText = data.length;
      if (data.length === undefined) {
        Laodcount.innerText = 0
      } else {
        Laodcount.innerText = data.length;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  FetchApi();
}
cartCountShow();

let getAllProducts = async () => {
  try {
    let res = await fetch(`https://34.215.217.165:5000/products`);
    let data = await res.json();
    var mask = data.filter((item) => {
      return item.category === "mask";
    });
    appendMask(mask);

    var eye = data.filter((item) => {
      return item.category === "eye";
    });
    appendEye(eye);

    var hair = data.filter((item) => {
      return item.category === "hair";
    });
    appendHair(hair);

    var lips = data.filter((item) => {
      return item.category === "lips";
    });
    appendLips(lips);

    var men = data.filter((item) => {
      return item.category === "men";
    });
    appendMen(men);

    var joy = data.filter((item) => {
      return item.category === "joy";
    });
    appendJoy(joy);

    var daily = data.filter((item) => {
      return item.category === "daily";
    });
    appendDaily(daily);
    var best = data.filter((item) => {
      return item.category === "best";
    });
    appendBest(best);
    var deal = data.filter((item) => {
      return item.category === "deal";
    });
    appendDeal(deal);
    var wen = data.filter((item) => {
      return item.category === "wen";
    });
    appendWend(wen);
  } catch (error) {
    console.log(error);
  }
};
getAllProducts();

function appendMask(mask) {
  mask.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);
    image.setAttribute("class", "img");

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    btn.addEventListener("click", addToCart);

    async function addToCart() {
      console.log("data", data);
      try {
        let cart_data = {
          prodId: data._id,
          userId: ID,
        };
        let cart_data_json = JSON.stringify(cart_data);

        let res = await fetch("http://34.215.217.165:5000/cart", {
          method: "POST",
          body: cart_data_json,
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        let dataa = await res.json();
        cartCountShow();
        console.log("logined data", dataa);

        // swal("Item already in cart", "", "info");
        swal("Added to the cart", "", "success");
      } catch (err) {
        swal("Item already in cart", "", "info");

        console.log("err", err);
      }
    }

    // }

    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".mask").append(div);
  });
}

function appendEye(eye) {
  eye.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    //  btn.addEventListener("click",function(){
    //     arr.push(data);

    //     localStorage.setItem("projectData" , JSON.stringify(arr));
    //                     cartCountShow(arr)

    //     console.log(arr);
    // })

    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".eye").append(div);
  });
}

function appendHair(hair) {
  hair.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    //  btn.addEventListener("click",function(){
    //     arr.push(data);

    //     localStorage.setItem("projectData" , JSON.stringify(arr));
    //                     cartCountShow(arr)

    //     console.log(arr);
    // })
    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".hair").append(div);
  });
}

function appendLips(lips) {
  lips.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    btn.addEventListener("click", function () {
      arr.push(data);

      localStorage.setItem("projectData", JSON.stringify(arr));
      cartCountShow(arr);

      console.log(arr);
    });
    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".lips").append(div);
  });
}

function appendMen(men) {
  men.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    btn.addEventListener("click", function () {
      arr.push(data);

      localStorage.setItem("projectData", JSON.stringify(arr));
      cartCountShow(arr);

      console.log(arr);
    });
    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".men").append(div);
  });
}

function appendJoy(joy) {
  joy.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    btn.addEventListener("click", function () {
      arr.push(data);

      localStorage.setItem("projectData", JSON.stringify(arr));
      cartCountShow(arr);

      console.log(arr);
    });
    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".joy").append(div);
  });
}

function appendDaily(daily) {
  daily.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");
    //  btn.addEventListener("click",function(){
    //     arr.push(data);

    //     localStorage.setItem("projectData" , JSON.stringify(arr));
    //                     cartCountShow(arr)

    //     console.log(arr);
    // })
    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".daily").append(div);
  });
}

function appendBest(best) {
  best.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");

    btn.addEventListener("click", function () {
      arr.push(data);

      localStorage.setItem("projectData", JSON.stringify(arr));
      cartCountShow(arr);

      console.log(arr);
    });

    div.append(icon, image, nam, des, price, btn);

    document.querySelector(".best").append(div);
  });
}

function appendDeal(deal) {
  deal.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");

    btn.addEventListener("click", function () {
      arr.push(data);

      localStorage.setItem("projectData", JSON.stringify(arr));
      cartCountShow(arr);

      console.log(arr);
    });

    div.append(icon, image, nam, des, price, btn);
    document.querySelector(".deals").append(div);
  });
}

function appendWend(wen) {
  wen.map(function (data) {
    var div = document.createElement("div");

    var image = document.createElement("img");
    image.setAttribute("src", data.image);

    var nam = document.createElement("p");
    nam.textContent = data.brand;
    nam.setAttribute("class", "nam");

    var des = document.createElement("p");
    des.textContent = data.name;
    des.setAttribute("class", "des");

    var price = document.createElement("p");
    price.textContent = `Rs. ${data.price}`;
    price.setAttribute("class", "price");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-heart");
    icon.setAttribute("id", "icon");
    icon.addEventListener("click", function () {
      if (icon.style.color == "rgb(62, 62, 165)") {
        icon.style.color = "grey";
      } else {
        icon.style.color = "rgb(62, 62, 165)";
      }
      arr1.push(data);

      localStorage.setItem("wishlist", JSON.stringify(arr1));
      console.log(arr1);
    });

    var btn = document.createElement("button");
    btn.textContent = "Add to bag";
    btn.setAttribute("id", "btn");

    //  btn.addEventListener("click",function(){
    //     arr.push(data);

    //     localStorage.setItem("projectData" , JSON.stringify(arr));
    //                     cartCountShow(arr)

    //     console.log(arr);
    // })

    div.append(icon, image, nam, des, price, btn);
    document.querySelector(".new").append(div);
  });
}
