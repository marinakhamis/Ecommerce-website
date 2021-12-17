const mainCart = document.getElementById("cart");
const mainElement = document.getElementById("main")
const price = document.getElementById("price")
const cart = () =>  localStorage.getItem("cart");
const productHtml = (el,i) => {
    mainCart.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
      <div class="img-container">
      <img src="${el.image}" alt="${el.category}" class="img"/>
      </div>
          <h3>${el.title}</h3>
         <div class="item__price">
         <span class="price">$${el.price}</span>
        <button onclick="onRemove(${i})">remove</button>
        
         </div>
          </div>`
    );
  };



const calculatePrice = (cart) =>{
   return cart.reduce((acc, val)=>{
    return acc + val.price
},0)
}
function checkCart(){
    const data = JSON.parse(cart())
    if(!data || data.length == 0){
        mainElement.innerHTML =`
        <div class="cart-check">
        <p>Cart is Empty</p>
        </div>`;
    }else{
       
       const data =  JSON.parse(cart())
          data.forEach((el,i) => productHtml(el,i));

          price.innerText = `Total Price is $${calculatePrice(data).toFixed(2)}`
    }
}

checkCart()

function onRemove(index){
    console.log(index)
  const data =   JSON.parse(cart());

    const arr = [...data];
    arr.splice(index,1)
 
    localStorage.setItem("cart", JSON.stringify(arr));
    if(arr.length){
        mainCart.innerHTML = '';
        arr.forEach((el,i) =>{
            productHtml(el, i)
        })
        price.innerText = `Total Price is $${calculatePrice(arr).toFixed(2)}`;
    }else{
        mainElement.innerHTML =`
        <div class="cart-check">
        <p>Cart is Empty</p>
        </div>`;
    }


}