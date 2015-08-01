"use strict";

var user = {},
	username,
	city,
	age,
	sex,
	socket = io(),
	sessionId = '';
function createUser(form){
        // console.log(form.username.value);
        // console.log(form.city.value);
        // console.log(form.age.value);
        // console.log(form.sex.value);

        username=form.username.value;
        city=form.city.value;
        age=form.age.value;
        sex=form.sex.value;

        user.username = username;
        user.city = city;
        user.age = age;
        user.sex = sex;

        // console.log(user);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("city", user.city);
        sessionStorage.setItem("age", user.age);
        sessionStorage.setItem("sex", user.sex);
   	
    	// document.getElementById("vardas").innerHTML = "belekas";
    	// console.log("tekstas is sesijos: "+sessionStorage.getItem("username"));

}




function logout(){
	sessionStorage.clear();
}
// Reikia parasyti koda, kuris updatintu useriu lista html'e. Info pareina is serverio su newConnection

