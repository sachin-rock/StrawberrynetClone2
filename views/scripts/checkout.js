//getdata function

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
        return data;
        // console.log(data);
    } catch (error) {
        
    }
}
//delete cart after payment api call

async function deleteCartData(){
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        let res = await fetch("http://34.215.217.165:5000/cart",{
            method:"DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
            }
        });
        
    } catch (error) {
        
    }
}
//totalCart is var declared for taking the final total and variable from cart page


//checkOutData is the variable used for taking the product detals and no.of products from cart page
let checkOutData = await getCartData();
console.log(checkOutData);

let totalCart = getCartTotal(checkOutData);
let cartValue = document.getElementById("cartValue");
function getCartTotal(data){
    let obj = {};
    let arr = [];
    let sum = 0;
    data.map(function (el){
        sum = sum+(el.prodId.price * el.quantity);
    });
    obj.cartTotal = sum;

    let temp = (sum*10)/100;
    temp = temp.toFixed(2);

    obj.newCustomer = temp;

    sum = sum-temp;

    temp = (sum*8)/100;
    temp = temp.toFixed(2);

    obj.february = temp;

    sum = sum-temp;

    if(sum<11582 && sum !==0){
        temp = 772.20;
        sum = sum+temp;
        
    }else{
        temp = 0;
    }
    obj.stdShip = temp;
    sum = sum+temp;

    temp = 240.60;
    obj.freight = temp;
    sum = sum+temp;
    sum = sum.toFixed(2)
    obj.total = sum;
    arr.push(obj);
    return arr;

}
// <!--------To show the cart total in Right hand side  -->
function showCartValue(data){

    cartValue.innerHTML = null;
    
    data.map(function(el){

/*
cartTotal: 2703
february: "194.62"
freight: 240.6
newCustomer: 270.3
stdShip: 772.2
total: "3250.88"
*/        
        let div = document.createElement("div");
        div.id = "cartTotal";

        let h1 = document.createElement("h3");
        h1.innerText = "Payment Detail";

        let hr3 = document.createElement("hr");
        //div for Item to show the cart sum before variables

        let div1 = document.createElement("div");
        div1.id = "cartCard";
        
        let h2 = document.createElement("h4");
        h2.innerText = `Item Total`;
        let h3 = document.createElement("h4");
        h3.innerText = `INR ${el.cartTotal}`;

        div1.append(h2,h3);

        //div 2 and div3 for giving offers wrt sales

        let div2 = document.createElement("div");
        div2.id = "redtext";
        
        let p1 = document.createElement("p");
        p1.innerText = `Extra 10% Off (New Customer)`
        let p2 = document.createElement("p");
        p2.innerText = `-INR ${el.newCustomer}`;

        div2.append(p1,p2);

        let div3 = document.createElement("div");
        div3.id = "redtext"
        
        let p3 = document.createElement("p");
        p3.innerText = `Extra 8% Off (March Sale)`
        let p4 = document.createElement("p");
        p4.innerText =`-INR ${el.february}`;

        div3.append(p3,p4);

        //div4 and div5 are freight charge and shipping charge
        let div4 = document.createElement("div");
        if(el.cartTotal<11582){

            
        
            let p5 = document.createElement("p");
            p5.innerText = `Standard Shipping (Signature)`
            let p6 = document.createElement("p");
            
            p6.innerText =`INR ${el.stdShip}`;
            

            div4.append(p5,p6);


        }

        let div5 = document.createElement("div");

        let p7 = document.createElement("p");
        p7.innerText = `Freight Surcharge `
        let p8 = document.createElement("p");
        p8.innerText =`INR ${el.freight}`;
                
        div5.append(p7,p8);


        let hr2 = document.createElement("hr");

        //div6 is to append toatal number of products and final amount

        let div6 = document.createElement("div");
        let h4 = document.createElement("h4");
        h4.innerText = `Order Total`;
        let h5 = document.createElement("h4");
        h5.id = "totalCartAmount";
        h5.innerText = `INR ${el.total}`;

        
        div6.append(h4,h5);



        div.append(h1,hr3,div1,div2,div3,div4,div5,hr2,div6);

        cartValue.append(div);        


    });

}
console.log("total cart",totalCart)
if(totalCart){
    showCartValue(totalCart);
}


//function enterDetail is used to show address input section in checkout page(html content)
function enterDetail(){
    return `
    <div id="ship">
    <h3>SHIPPING ADDRESS</h3>
    <div id="userDetails">
        <input type="text" class="inputCheckOut" name="" id="fName" placeholder="First Name(*)">
        <br>
        <input type="text" name="" class="inputCheckOut" id="lName" placeholder="Last Name(*)">
        <br>
        <input type="text" name="" class="inputCheckOut" id="company" placeholder="Company">
        <br>
        <select name="" class="inputCheckOut" id="country">
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Singapore">Singapore</option>
        </select>
        <br>
        <input type="text" class="inputACheckOut" id="address1" placeholder="Address(*)">
        <br>
        <input type="text" name="" class="inputACheckOut" id="address2" placeholder="">
        <br>
        <input type="text" name="" class="inputCheckOut" id="address3">
        <br>
        
        <input type="text" name="" class="inputCheckOut" id="city" placeholder="City/Town(*)">
        <br>
        <input type="text" name="" class="inputCheckOut" id="state" placeholder="State/Province">
        <br>
        <input type="number" name="" class="inputCheckOut" id="pin" placeholder="Zip/Pincode(*)">
        <br>
        
        <input type="number" name=""  id="mobile" placeholder="Mobile(*)">
        <br>
        <button id="save">SAVE & CONTINUE</button>

    </div>
</div>
`
}

//Attaching address input section
let userInput = document.getElementById("EnterDetail");
userInput.innerHTML = enterDetail();
let products = document.getElementById("product");



// console.log(checkOutData);
/* image: 'https://a.cdnsbn.com/images/products/250/14130874344.jpg', 
title: 'AVEDA', 
des: 'Color Conserve Daily Color Protect Leave-In Treatment', 
qty: 5, 
price: 13515 */


//function showData is used for showing the final product list and details from cart 
function showData(data){
    products.innerHTML = null;

    let sum=0;  //sumis declared to find the total sum
    let count =0; // count is declared to find the number of products in cart

    data.map(function(el){
        
        
        let div = document.createElement("div");
        div.id = "card";

        let hr =document.createElement("hr");
        
        let div1 = document.createElement("div");
        div1.id = "cardImage"
        let image = document.createElement("img");
        image.src = el.prodId.image;
        div1.append(image);

        let div2 = document.createElement("div");        
        let title = document.createElement("p");
        title.innerText = el.prodId.name;
        let desc = document.createElement("p");
        desc.innerText = el.prodId.brand;
        let single = document.createElement("p");
        single.innerText = `INR ${el.prodId.price}`;
        div2.append(title,desc,single);

        let div3 = document.createElement("div");
        let qty = document.createElement("p");
        qty.innerText = el.quantity;
        div3.append(qty);

        let div5 = document.createElement("div");
        let price = document.createElement("p");
        price.innerText = el.prodId.price * el.quantity
        div5.append(price);

        sum = sum+(el.prodId.price * el.quantity);
        count++;

        div.append(div1,div2,div3,div5);

        products.append(hr,div);



    });

    let hr = document.createElement("hr");
    let div = document.createElement("div");
    div.id = "cartT";

    let h1 = document.createElement("h2");
    h1.innerText = `Item Total (${count})`;
    
    let h2 = document.createElement("h2");
    h2.innerText = `INR ${sum}`;

    div.append(h1,h2)

    products.append(hr,div)
}

console.log(checkOutData);

//saveButton is used for taking the data from address input section and show in the place of address input section

let save = document.getElementById("save");

save.addEventListener("click",saveButton);

function saveButton(){

   //declaring first name and last name
   let fName = document.getElementById("fName").value;
   let lName = document.getElementById("lName").value;
   
   if(fName == "" || lName == ""){
       alert("Enter Name");
       return;
   }

   //Declaring address 1
   let a1 = document.getElementById("address1").value;

   if(a1 ==""){
       alert("Enter Address");
       return;
   }

   //declaring city
   let cit = document.getElementById("city").value;
   
   if(cit == ""){
       alert("City Name");
       return;
   }

   //declaring pincode
   let pincode_id = document.getElementById("pin").value;

   if(pincode_id == ""){
       alert("Enter PinCode");
       return;
   }

   //Declaring Mobile Number
   let mobile_id = document.getElementById("mobile").value;

   if(mobile_id == ""){
       alert("Enter Mobile Number");
       return;
   }

    let div = document.createElement("div");
    div.id = "shippingAdd";

    let div1 = document.createElement("div");
    div1.id = "shipAddress"

    let h1= document.createElement("h2");
    h1.innerText = "SHIPPING ADDRESS";

    let edit = document.createElement("img");
    edit.id = "editImage";
    edit.src = "images/edit.png";

    //function for re editing data

    edit.addEventListener("click",function(){
        
        userInput.innerHTML = null;
        userInput.innerHTML = enterDetail();

        let save = document.getElementById("save");

        save.addEventListener("click",saveButton);
    })

    div1.append(h1,edit);

    let div2 = document.createElement("div");
    
    //getting first name and last name

   
    
    let name = document.createElement("p");
    name.innerText = fName+" "+lName;

    div2.append(name);

    let div3 = document.createElement("div");
    let cmp = document.getElementById("company").value;

    let company = document.createElement("p");
    company.innerText = cmp;

    div3.append(company);

    //div 4 starts - address;

    let div4 = document.createElement("div");

    
    let a2 = document.getElementById("address2").value;
    let a3 = document.getElementById("address3").value;

    let p = document.createElement("p");

    if(a3 == undefined ||a2 == undefined){
        
        p.innerText = a1;
    }
    else if(a3==undefined){
        p.innerText = a1+","+a2;
    }else
    {
        p.innerText = a1+","+a2+","+a3;
    };

    div4.append(p);

    //div 5 starts - city

    let div5 = document.createElement("div");


    let city = document.createElement("p");
    city.innerText = cit;

    div5.append(city);

    //div6 starts; - state/pincode

    let div6 = document.createElement("div");

    let state_id = document.getElementById("state").value;
    

    let state = document.createElement("p");
    state.innerText = state_id + " " + pincode_id;

    div6.append(state);

    //div7 starts - country

    let div7 = document.createElement("div");

    let country_id = document.getElementById("country").value;
    let country = document.createElement("p");
    country.innerText = country_id;

    div7.append(country);

    //div8 starts - mobile

    let div8 = document.createElement("div");

    let mobile = document.createElement("h3");
    mobile.innerText = "Mobile";

    

    let mobile_nbr = document.createElement("p");
    mobile_nbr.innerText = mobile_id;

    div8.append(mobile,mobile_nbr);

    //every data added

    div.append(div1,div2,div3,div4,div5,div6,div7,div8);
    
    userInput.innerHTML = null;

    userInput.append(div);

}


let visa = document.getElementById("visaCheck");
let visaDiv = document.getElementById("visacard");
visa.addEventListener("click",function(){

    paymentDetails(visaDiv);


});



// let PaymentArr = document.querySelectorAll(".paymentCard");

// function payment Details is used to add input section into the card options given in webpage

function paymentDetails(parent){
    

    //At first we are clearing all card input section
    
    let visaDiv = document.getElementById("visacard");
    visaDiv.innerHTML = null;

    let masterDiv = document.getElementById("mastercard");
    masterDiv.innerHTML = null;

    let americanDiv = document.getElementById("americancard");
    americanDiv.innerHTML = null;

    let dinersDiv = document.getElementById("dinerscard");
    dinersDiv.innerHTML = null;

    let discoverDiv = document.getElementById("discovercard");
    discoverDiv.innerHTML = null;

    let jcbDiv = document.getElementById("jcbcard");
    jcbDiv.innerHTML = null;

    

    parent.innerHTML = null;

    //creating new div card

let div = document.createElement("div");
div.id = "cardPayment";

//creating card number input section

let div2 = document.createElement("div");
div2.id = "cardNumberDiv"
let cardNumber = document.createElement("input");
cardNumber.type = "number";
cardNumber.placeholder = "card number(without space)";
cardNumber.id = "cardNumber";

div2.append(cardNumber);

//creating expiry and cvv input part of card details

let div1 = document.createElement("div");
div1.id = "expiry_cvv";

let expiry = document.createElement("input");
expiry.type = "number";
expiry.placeholder = "MM/YY";
expiry.setAttribute("class","expiry");
expiry.id = "expiry"

let cvv = document.createElement("input");
cvv.type = "number";
cvv.placeholder = "CVV";
cvv.setAttribute("class","expiry");
cvv.id = "cvv";

div1.append(expiry,cvv);

div.append(div2,div1);

parent.append(cardNumber,div)
}

//following functions are used to call paymentDetail function for diffferent cards

//mastercard
let master = document.getElementById("masterCheck");
let masterDiv = document.getElementById("mastercard");
master.addEventListener("click",function(){

    paymentDetails(masterDiv);


});

//americanExpress

let american = document.getElementById("americanCheck");
let americanDiv = document.getElementById("americancard");
american.addEventListener("click",function(){

    paymentDetails(americanDiv);


});

//diners

let diners = document.getElementById("dinersCheck");
let dinersDiv = document.getElementById("dinerscard");
diners.addEventListener("click",function(){

    paymentDetails(dinersDiv);


});

//Discover

let discover = document.getElementById("discoverCheck");
let discoverDiv = document.getElementById("discovercard");
discover.addEventListener("click",function(){

    paymentDetails(discoverDiv);


});

//jcb

let jcb = document.getElementById("jcbCheck");
let jcbDiv = document.getElementById("jcbcard");
jcb.addEventListener("click",function(){

    paymentDetails(jcbDiv);
    

});


//Taking the value from card detail and checking every data is given or not

let payNow = document.getElementById("payNow");
payNow.addEventListener("click",function(){
let cardNumber = document.getElementById("cardNumber").value;
cardNumber.toString();


let expiry = document.getElementById("expiry").value;
expiry.toString();

let cvv = document.getElementById("cvv").value;
cvv.toString();

if((cardNumber.length == 12) && (expiry.length == 5) && (cvv.length == 3)){
    alert("Payment Succesfull");

    deleteCartData();  

    setTimeout(function(){
        window.location.href = "Home.html"
    },100)
}else{
    alert("Enterd wrong Card Details");
}

});


//Giving Promo code option as MASAI30 and it gives 30% off in final total price
let applyPromo = document.getElementById("applyPromo");

let count = 0;
applyPromo.addEventListener("click",function(){

    let promocode = document.getElementById("promocode").value;
    
    if(count == 1){
        alert("Promocode Already Applied");
        return;
    }

    if(promocode === "MASAI30"){
        let t1 = totalCart[0].total;
    let output = t1 - ((t1*30)/100);
    output = output.toFixed(2);

    count++;
    alert("Promo Code Applied")
    let total_op =document.getElementById("totalCartAmount");
    total_op.innerText = "";

    total_op.innerText = output;
    }else{
        alert("Wrong Promo Code")
    }
    
});

showData(checkOutData);

