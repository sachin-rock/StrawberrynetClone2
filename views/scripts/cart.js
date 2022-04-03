//just to get the token temperorily
async function logIn(url,body){
    try {
        let res = await fetch(url,body);
        let data = await res.json();
        localStorage.setItem("token",JSON.stringify(data.token));
    } catch (error) {
        console.log(error);
    }
    }
    
    let _loginData = {
        "email" : "shravan2@gmail.com",
        "password" : "123"
    }
    
    _loginData = JSON.stringify(_loginData);
    
    let body = {method : "POST",
    body : _loginData,
    headers : {
        "Content-Type" : "application/json"
    }}
    
    let loginURL = "http://34.215.217.165:5000/login"
    // logIn(loginURL,body);

//getting cart data api call function
var Laodcount = document.getElementsByClassName("cartCount")[0];


async function getCartData(){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let res = await fetch("http://34.215.217.165:5000/cart",{
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        Laodcount.innerText = data.length;
      if (data.length === undefined) {
        Laodcount.innerText = 0
      } else {
        Laodcount.innerText = data.length;
      }
        return data;
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

let cartData = await getCartData();
console.log("cartData",cartData)

async function updatedCartData(id,x){
    try {
        
        let token = JSON.parse(localStorage.getItem("token"));

        let url = "http://34.215.217.165:5000/cart/"+id;
        // console.log(url);
        let res = await fetch(url,{
            method : "PATCH",
            body:x,
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        // console.log(data);
    } catch (error) {
    console.log(error)    
    }
}

//deleteOneCartData
async function deleteOneData(id){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        
        let url="http://34.215.217.165:5000/cart/"+id;
        // console.log("id",url)
        let res = await fetch(url,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        let data = await res.json();
        // console.log(data);
    } catch (error) {
        console.log(error);        
    }
}

//products are where data need to shown

let products = document.getElementById("products");


//function showdata is use to render product list
function showData(data){
    products.innerHTML =null;
    products.innerText = "";
   
    let goods = document.createElement("p");
    goods.innerText = "Goods shipped from Strawberrynet";
    products.append(goods);

    data.map(function(el,index){

       
        let div = document.createElement("div");
        div.id = "card";

        let hr = document.createElement("hr");

        let div1 = document.createElement("div");
        div1.id = "cartImage";
        let image = document.createElement("img");
        image.src = el.prodId.image;  
        
        div1.append(image);

        let div2 = document.createElement("div");
    
    let title = document.createElement("p");
    title.innerText = el.prodId.brand;
    let desc = document.createElement("p");
    desc.innerText = el.prodId.name;

   
    div2.append(title,desc);

    let div3 = document.createElement("div");
    div3.id = "qty";

    let qty = Number(el.quantity);
    
    let div4 = document.createElement("div");
    
    let prodPrice = document.createElement("p");
   
    prodPrice.setAttribute("class","price");

    let x = qty*Number(el.prodId.price);
       
    showPrice(prodPrice,x);
    
    //div5 is used to add remove function
    let div5 = document.createElement("div");
    let dlt = document.createElement("img");
    dlt.id = "delete";
    dlt.src = "images/remove.png";

    dlt.addEventListener("click",function (){
        
        console.log(el._id);

        deleteOneData(el._id)
        

        const reload = async() => {
            cartData = await getCartData();
            showData(cartData);
        }  
        reload();
    });
    div5.append(dlt);
    div4.append(prodPrice);
    //div4 completion

    let p10 = document.createElement("p");
    p10.innerText = ` ${qty} `;

    //b1 and b2 are used to change qty number

    let b1 = document.createElement("button");
    b1.innerText = "+";
    
    b1.addEventListener("click",function(){
        if(qty<20){
            qty++;
            
            let val = qty * Number(el.prodId.price);
            showPrice(prodPrice,val);
            

            p10.innerText = `${qty}`;
           let x = {"quantity" : qty};
           x = JSON.stringify(x);
            updatedCartData(el._id,x);


            const reload = async() => {
                cartData = await getCartData();
                showData(cartData);
            }  
            reload();
            
            
        }else{
            qty = 20;
        }
    });

    let b2 = document.createElement("button");
    b2.innerText = "-";
    b2.addEventListener("click",function(){
        if(qty>1){
            qty--;
            
            let val = qty * Number(el.prodId.price);
            showPrice(prodPrice,val);
            

            p10.innerText = `${qty}`;
           let x = {"quantity" : qty};
           x = JSON.stringify(x);
            updatedCartData(el._id,x);


            const reload = async() => {
                cartData = await getCartData();
                showData(cartData);
            }  
            reload();
            
            
        }else{
            qty = 1;
        }
    });
    

    div3.append(b2,p10,b1);
  
    div.append(div1,div2,div3,div4,div5);

    products.append(hr,div);
    
  
    })
    let hr5=document.createElement("hr");
    products.append(hr5)
    showSum(cartData);

    
    
};


showData(cartData);

//showPrice funtion used to update price value
function showPrice(parent,amount){
    parent.innerText="";
    parent.innerText = amount;
}

//showSum is used to take the data from product data and make total and variable price and do required 

function showSum(data){
    let sum =0; //variable declared to sum
    
    data.map(function(el){
        sum = sum + (el.quantity * el.prodId.price);
    })
    // console.log(sum);
    let cartTotal = document.getElementById("cartTotal");
    cartTotal.innerHTML = null;
    

    //initialisation
    let div = document.createElement("div");
    div.id="cartValue";


    let div1 = document.createElement("div");
    let hr = document.createElement("hr");
    let h1 = document.createElement("h4");
    h1.innerText = `Item Total : ${data.length} item(s)`;
    let h2 = document.createElement("h4");
    h2.innerText = `INR ${sum}`;

    div1.append(h1,h2);

    //div2 initialisation

    let div2 = document.createElement("div");
    div2.id = "redtext";
    
    let p1 = document.createElement("p");
    p1.innerText = `Extra 10% Off (New Customer)`
    let p2 = document.createElement("p");
    let temp = (sum*10)/100;
    temp.toFixed(2);
    
    p2.innerText =`-INR ${temp}`;
    sum = sum-temp;
    sum.toFixed(2);

    div2.append(p1,p2);

    //div3 starts

    let div3 = document.createElement("div");
    div3.id = "redtext"
    
    let p3 = document.createElement("p");
    p3.innerText = `Extra 8% Off (March Sale)`
    let p4 = document.createElement("p");
    temp = (sum*8)/100;
    temp = temp.toFixed(2);
    p4.innerText =`-INR ${temp}`;
    
    sum = sum-temp;

    div3.append(p3,p4);

    let div4 = document.createElement("div");
    
    let p5 = document.createElement("p");
    if(sum<11582 && sum!=0){


        p5.innerText = `Standard Shipping (Signature)`
        let p6 = document.createElement("p");
        temp = 772.20;
        sum = sum+temp;
        p6.innerText =`INR ${temp}`;
        
        div4.append(p5,p6);


    }else{
        // totalObj["stdShip"] = 0;
        p5.innerText = 0;
    }

    //div5 starts
    let div5 = document.createElement("div");

        let p7 = document.createElement("p");
        p7.innerText = `Freight Surcharge `
        let p8 = document.createElement("p");
        temp = 240.60;
        sum = sum+temp;
        p8.innerText =`INR ${temp}`;
        
        div5.append(p7,p8);

    //div6 starts

    let hr2 = document.createElement("hr");

    let div6 = document.createElement("div");
    let h3 = document.createElement("h2");
    h3.innerText = `Order Total: ${data.length} item(s)`;
    let h4 = document.createElement("h2");
    sum = sum.toFixed(2);
    h4.innerText = `INR ${sum}`;

    div6.append(h3,h4);

    div.append(div1,div2,div3,div4,div5,hr2,div6);

    cartTotal.append(div);

    showSpend(sum);
}

//showSpend function is used to add dynamicsm spend div as, in bar how much need to remove shipping charge

function showSpend(sum){
    let parrent = document.getElementById("total");
    parrent.innerText ="";
    let de = document.querySelector("#del");


let spendbar = document.getElementById("spendbar");

if(sum<11582){
    let per = (sum/11582)*100;
    spendbar.style.width = `${per}%`;
    // parent.innerText = `Spend INR${1-sum} more for a reduced standard shipping fee at INR386.10.`;
    let sPend =11582-sum;
    sPend = sPend.toFixed(2);
    parrent.innerText = `Spend INR${sPend} more for a free shipping.`;
    de.innerText = "Free standard shipping for order above INR11,582.80."
}else{
    spendbar.style.width = `100%`;

    
    de.innerText = "Happy Shopping";
    
    
    parrent.innerText = `You're now eligible for FREE Standard shipping​`;

}


}

let checkOutPage = document.getElementById("checkOutPage");
checkOutPage.addEventListener("click",function(){
    window.location.href = "checkout.html";
});

let signout = document.getElementById("signout");
signout.addEventListener("click",function(){
    
    localStorage.setItem("token",JSON.stringify(""));
    window.location.href = "login.html"
});
