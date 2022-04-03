var heart=JSON.parse(localStorage.getItem("wishlist"))


console.log(heart);



var arr=JSON.parse(localStorage.getItem("projectData"))||[];

    if(heart.length==0){
        var mainCO=document.getElementsByClassName("main")[0]
        mainCO.style.display="none";
        var img1=document.createElement("img");
        img1.setAttribute("src","https://a.cdnsbn.com/images/common/strawbaby_heart.png");
        img1.setAttribute("class","img")
        var span=document.createElement("span");
        span.textContent=("Here we keep a list of all the products you like. Tap the heart on a product to add it to your wishlist.")
        span.setAttribute("class", "span")
        document.querySelector("#kkk").append(img1,span);

    
    }
heart.map(function(data){
    var div=document.createElement("div");
   

    var image=document.createElement("img");
    image.setAttribute("src",data.image);
    image.setAttribute("class", "img")

    var nam=document.createElement("p");
    nam.textContent=data.brand;
    nam.setAttribute("class","nam");

    var des=document.createElement("p");
    des.textContent=data.name;
    des.setAttribute("class","des");

    var price=document.createElement("p");
    price.textContent=data.price;
    price.setAttribute("class","price");

    var icon=document.createElement("i");
    icon.setAttribute("class","fa-solid fa-heart");
    icon.style.color="blue"
    icon.setAttribute("id","icon");
    icon.addEventListener("click", function(){
           if(icon.style.color =="rgb(62, 62, 165)"){
               icon.style.color ="grey"
           }
           else{
               icon.style.color="rgb(62, 62, 165)"
           }
           for(var i=0; i<heart.length; i++){
               var current=heart[i];
               if(current.name==data.name){
                   heart.splice(i ,1);
                    localStorage.setItem("wishlist" , JSON.stringify(heart));
                    location.reload();
                  
                   break;
               }
            // console.log(current.name);
           }
             
           });

      
        
   

    var btn=document.createElement("button");
    btn.textContent="Add to bag";
    btn.setAttribute("id","btn");
    btn.addEventListener("click",function(){
        arr.push(data);

        localStorage.setItem("projectData" , JSON.stringify(arr));
        console.log(arr);
    })

    div.append(icon,image,nam,des,price,btn);
    
   

    document.querySelector("#right").append(div);
})

