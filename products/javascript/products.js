const spinner = document.querySelector(".spinner-container");

const products = document.getElementById("container");
// const productsContainer = document.getElementById("products");
const selected = document.getElementById("select");
// setting localStorage
const setStorage = (data) =>
  localStorage.setItem("products", JSON.stringify(data));
// getting localStorage
const getStorage = () => JSON.parse(localStorage.getItem("products"));
// stop spinner
const stopSpinner = () => (spinner.style.display = "none");
// remove storage to get latest updates
function removeStorage(){
  if(getStorage()){
    localStorage.removeItem("products");
  }
}
removeStorage()
//get data
const getData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    stopSpinner();
    setStorage(data);
    return data;
  } catch (e) {
    stopSpinner();
    spinner.innerHTML = e.message;
    console.log(e.message);
  }
};

const productHtml = (el,i) => {
  products.insertAdjacentHTML(
    "beforeend",
    `<div class="item">
    <div class="img-container">
    <img src="${el.image}" alt="${el.category}" class="img"/>
    </div>
        <h3>${el.title}</h3>
       <div class="item__price">
       <span class="price">$${el.price}</span>
       <p class="rating">rating ${el.rating.rate} stars</p>
       <button class="price__btn" onclick="detilPage(${el.id})">+ View Product</button>
       </div>
        </div>`
  );
};

const displayData = async (sort) => {
  const data = getStorage();

  if (sort === "high") {
    const highPrice = data.sort((a, b) => b.price - a.price);
    highPrice.forEach((el, i) => productHtml(el, i));
    stopSpinner();
    return;
  }
  if (sort === "low") {
    const lowPrice = data.sort((a, b) => a.price - b.price);
    lowPrice.forEach((el, i) => productHtml(el, i));
    stopSpinner();
    return;
  }
  if (sort === "rating") {
    const x = data.sort((a, b) => b.rating.rate - a.rating.rate);
    x.forEach((el, i) => productHtml(el, i));
    stopSpinner();
    return;
  }

  if (data === null) {
    let items = await getData();
    items.forEach((el, i) => {
      productHtml(el, i);
    });
    stopSpinner();
  } else {
    data.forEach((el, i) => {
      productHtml(el, i);
    });
    stopSpinner();
  }
};

displayData();

selected.addEventListener("change", (e) => {
  products.innerHTML = "";
  // stopSpinner();
  displayData(e.target.value);
});

// getting back data
const restoreData = async () => {
  products.innerHTML = "";
  spinner.style.display = "block";
  await getData();
  displayData();
};
// toggeling remaining checkboxes
const toggleCheckBoxes = (current, toggle = true) => {
  cat.forEach((el) => {
    if (el != current.currentTarget) {
      if (toggle) {
        el.disabled = true;
      } else {
        el.disabled = false;
      }
    }
  });
};

//override localstorage arr
const reWriteStorageArr = (category) =>
  getStorage().filter((el) => el.category === category);
// filltering category
const filterByCategory = (e, filterBy) => {
  if (e.target.checked) {
    toggleCheckBoxes(e);
    const Arr = reWriteStorageArr(filterBy);
    setStorage(Arr);
    products.innerHTML = "";
    displayData();
  } else {
    toggleCheckBoxes(e, false);
    restoreData();
  }
};
// selecting dom checkboxes
const jewelery = document.getElementById("jewelery");
const men = document.getElementById("men");
const electronics = document.getElementById("electronics");
const women = document.getElementById("women");
const cat = document.getElementsByName("cat");
// jewelery filter
jewelery.addEventListener("change", (e) => {
  filterByCategory(e, `jewelery`);
});
// men categories
men.addEventListener("change", (e) => {
  filterByCategory(e, `men's clothing`);
});

// electronics category
electronics.addEventListener("change", (e) => {
  filterByCategory(e, `electronics`);
});
// women category
women.addEventListener("change", (e) => {
  filterByCategory(e, `women's clothing`);
});

function detilPage(id) {
  const product = getStorage();
  const selectedProduct = product.find(el => el.id === id);
  localStorage.setItem("product", JSON.stringify(selectedProduct));
  const url = location.href.replace("products.html", "productDetails.html");
  location.href = url;
}




