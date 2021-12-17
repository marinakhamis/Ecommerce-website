var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

var sliderContainer = document.getElementById("sale-off-wrapper");

// document.getElementById("next-product").addEventListener("click", function () {
//   var imagesArr = document.querySelectorAll(".sale-off-card");
//   console.log("hi")
//     imagesArr.forEach((s, i) => {
//       s.style.transform = `translateX: -${100 - i}%`
//     })
 
// );

var imagesArr = document.querySelectorAll(".sale-off-card");
let currSlide = 0;
const slides = [...imagesArr];
let allowedLength = slides.length;
slides.forEach((s,i) =>{
  s.style.transform = `translateX(${100 * i}%)`

})

document.getElementById("next-product").addEventListener("click", ()=>{
currSlide++
if(currSlide === allowedLength + 1){
  currSlide = 0;
}
slides.forEach((s,i) =>{
  s.style.transform = `translateX(${100 * (i - currSlide)}%)`

})
   })



document.getElementById("prev-product").addEventListener("click", function () {
  currSlide--;
  if(currSlide <= -1){
    currSlide = allowedLength;
  }
  slides.forEach((s,i) =>{
    s.style.transform = `translateX(${100 * (i - currSlide)}%)`
  
  })
});

