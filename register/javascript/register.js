var loginBtn = document.getElementById('login'),
    createBtn = document.getElementById('create'),
    createForm = document.getElementById('createAcount'),
    loginForm = document.getElementById('logIn'),
    resetForm = document.getElementById('resetPassword'),
    forgetBtn = document.getElementById('forget'),
    backBtn = document.getElementById('back'),
    toggelPassword=document.getElementById('toggelPassword')

// function to toggel between forms
function toggelForms(visbleForm,HiddenForm){
    visbleForm.style.display='block';
    HiddenForm.style.display='none';
}
//function to toggel between classes
function toggleClass(visbleBg,hiddenBg){
    visbleBg.setAttribute('class','register__btn--active');
    hiddenBg.removeAttribute('class','register__btn--active')
}
loginBtn.addEventListener('click',()=>{
    toggelForms(loginForm,createForm)
    toggleClass(loginBtn,createBtn)
})
createBtn.addEventListener('click',()=>{
    toggelForms(createForm,loginForm)
    toggleClass(createBtn,loginBtn)
    resetForm.style.display='none'
    
})
forgetBtn.addEventListener('click',()=>{
    toggelForms(resetForm,loginForm)
})
backBtn.addEventListener('click',()=>{
    toggelForms(loginForm,resetForm)
})
//toggel password
toggelPassword.addEventListener('click',()=>{
    let password = document.getElementById('password')
    if(password.type==='password'){
        password.type='text'
        toggelPassword.innerText='hide'
    }else{
        password.type='password';
        toggelPassword.innerText='show'
        
    }
})
//validate name
function vildateName(name) {
    var regx = new RegExp(/^[A-Za-z|\s]{3,}$/)
    var valid=regx.test(name)
    if(!valid){
        throw TypeError('please write correct name')
    }else return true
}
//validate email
function vildateEmail(email) {
    var regx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    var valid=regx.test(email)
    if(!valid){
        throw TypeError('please write correct email ex:example@gmail.com')
    }else return true
}
//validate password
function vildatePassword(password) {
    var regx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    var valid=regx.test(password)
    if(!valid){
        throw TypeError('please write correct password at least 8 character')
    }else return true
}

function createFormValidate(fname,lname,email,password) {
    var flag = true
    try {
        vildateName(fname)
    } catch (error) {
        document.querySelector('#firstName+p').innerText = error.message
        flag= false
    }
    try {
        vildateName(lname)
    } catch (error) {
        document.querySelector('#lastName+p').innerText = error.message
        flag= false
    }
    try {
        vildateEmail(email)
    } catch (error) {
        document.querySelector('#userEmail+p').innerText = error.message
        flag=false
    }
    try {
        vildatePassword(password)
    } catch (error) {
        document.querySelector('#validPassword').innerText = error.message
        flag= false
    }
    return flag
}
function storeData(fname,lname,email,password) {
    var userData = {
        firstName:fname,
        lastName:lname,
        userEmail:email,
        userPass:password
    }  
    let arr =[];
    arr.push(userData)
    const storage =localStorage.getItem('user')
    if(storage){
        const newData =JSON.parse(storage);
        console.log(newData)
        newData.push(userData)
        localStorage.setItem('user', JSON.stringify(newData))
    }else{
        localStorage.setItem('user',JSON.stringify(arr))

    }
}

createForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let firstName = document.getElementById('firstName').value,
        lastName = document.getElementById('lastName').value,
        userEmail = document.getElementById('userEmail').value,
        userPassword = document.getElementById('password').value;

       var valid= createFormValidate(firstName,lastName,userEmail,userPassword)
       console.log(valid);
       if (valid){
           storeData(firstName,lastName,userEmail,userPassword)
           document.querySelector('#createacount+p').innerText ='your login is sucess ';
           document.querySelector('#validPassword').innerText ='';
           document.querySelector('#userEmail+p').innerText  = '';
       }

})


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = document.getElementById('usermail').value,
        password = document.getElementById('userPassword').value

      const storage = JSON.parse( localStorage.getItem('user'));
     const findEmail=  storage.find(user => user.userEmail === email && user.userPass === password);
    if(!findEmail){
        document.querySelector('#sign+p').innerText ='invalid data'
    }else{
        const url = location.href.replace('register','home');
        location.href =url;
    }
})



//validate subscribe email
var subscribeBtn = document.getElementById('subscribe')
subscribeBtn.addEventListener('click',()=>{
    let subEmail = document.getElementById('subEmail')
    try {
        vildateEmail(subEmail)
    } catch (error) {
        document.querySelector('#subEmail+p').innerText = error.message
    }
})





