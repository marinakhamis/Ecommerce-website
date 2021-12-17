/////////////////////////////////////////// counter
var plus = document.getElementsByClassName("plus")[0];
var minus = document.getElementsByClassName("minus")[0];
var counter = 1;

plus.addEventListener("click", function () {
  counter++;
  document.getElementById("counterNum").innerHTML = counter;
  console.log(counter);
});

minus.addEventListener("click", function () {
  if (counter > 1) {
    counter--;
    document.getElementById("counterNum").innerHTML = counter;
  }
  console.log(counter);
});

////////////////////////////////  links and thier contents
var links = document.querySelectorAll(".myUl li");
var contents = document.querySelectorAll(".content > div");
links.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all list items
    links.forEach((ele) => ele.classList.remove("active"));
    // add active class to the clicked item
    this.classList.add("active");

    // show content for each item
    contents.forEach((content) => {
      if (this.classList[0] === "." + content.classList[0]) {
        //  console.log( this.classList[0] + "=" + '.'+ content.classList[0] );
        // add hide class to all list items
        contents.forEach((c) => c.classList.add("hide"));
        // remove hide class from the current content
        content.classList.remove("hide");
      }
    });
  });
});


/////////////////////////////////////  slider by API images

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://fakestoreapi.com/products");

xhr.onload = function () {
  var response = JSON.parse(xhr.responseText);
  var srcs = [];
  var prices = [];

  for (var i = 0; i < 8; i++) {
    var src = response[i].image;
    var price = response[i].price;
    srcs.push(src);
    prices.push(price)

    console.log(response[i].price);
  }

  var sliderContainer = document.getElementById("sliderId");

  function mySlider() {
    for (var i = 0; i < srcs.length; i++) {
      var div = document.createElement("div");
      var imgEle = document.createElement("img");
      var priceEle = document.createElement("p");
       var addToCart = document.createElement("button");
       addToCart.innerHTML = "+ Add To Cart";

      imgEle.src = srcs[i];
      priceEle.innerHTML = prices[i] + "$"

      sliderContainer.appendChild(div);
      div.appendChild(imgEle);
      div.appendChild(priceEle)
      div.appendChild(addToCart);
    }
  }

  mySlider();

  document.getElementById("next").addEventListener("click", function () {
    var imagesArr = document.querySelectorAll(".slider div");

    for (var i = 0; i < imagesArr.length; i++) {
      if (!imagesArr[i].classList.contains("hide")) {
        if (i == 4) {
          break;
        } else {
          imagesArr[i].classList.add("hide");
          break;
        }
      }
    }
  });

  document.getElementById("prev").addEventListener("click", function () {
    var imagesArr = document.querySelectorAll(".slider div");

    for (var i = imagesArr.length - 1; i >= 0; i--) {
      if (imagesArr[i].classList.contains("hide")) {
        imagesArr[i].classList.remove("hide");
        break;
      }
    }
  });
};

xhr.send();


////////////////////////////////////////////////////////////////
const productImge = document.getElementById("product-img");
const productPrice = document.getElementById("product-price");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");

const product = JSON.parse(localStorage.getItem('product'));

function DisplayProduct(productData) {
productImge.src = productData.image;
productPrice.innerText = productData.price;
productTitle.innerText = productData.title;
productDescription.innerText = productData.description;
}
DisplayProduct(product)
///////////////////////////////////
const productNum = document.getElementById("counterNum");
const addBtn = document.querySelector(".add-to-cart button");

addBtn.addEventListener("click",()=>{
  const cartCount = +productNum.innerText;
  const product = JSON.parse(localStorage.getItem("product"));
  const storage = localStorage.getItem("cart");
const arr = [];
  for(let i = 0; i < cartCount; i++){
    arr.push(product)
  }
  if(storage){
    arr.push(...JSON.parse(storage));
    localStorage.setItem("cart", JSON.stringify(arr))
  }else{
    localStorage.setItem("cart", JSON.stringify(arr));

  }

})