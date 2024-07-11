const search=document.querySelector("input[type='text']");
const searchBtn=document.querySelector(".search-btn");
const invalidInput=document.querySelector(".invalid-input");
const display=document.querySelector(".display-box")
const weatherImg=document.querySelector(".img-box img");

const getData = function (cityName) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"97a82bcdd7087008a1ff998a4075f670"}`;
    const data=fetch(URL);
    data.then(response=>{
        if(response.ok==true){
            return response.json();
        }else{
            throw true;
        }
    }).then(data=>{
        invalidInput.style.display="none";
        display.style.display="flex";
        document.querySelector(".city-name").innerText=data.name;
        document.querySelector(".temp").innerText=Math.round(data.main.temp-273.15);
        document.querySelector(".humidity").innerText=data.main.humidity;
        document.querySelector(".wind").innerText=data.wind.speed;
        if(data.weather[0].main=="Clouds"){
            weatherImg.src="clouds.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherImg.src="mist.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherImg.src="clear.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherImg.src="Rain.png";
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherImg.src="drizzle.png";
        }
        else if(data.weather[0].main=="Snow"){
            weatherImg.src="snow.png";
        }
    }).catch(error=>{
        if(error==true){
        invalidInput.innerText="Invalid City Name";
        invalidInput.style.display="block";
        display.style.display="none";
        }
        else{
        invalidInput.innerText="Please check the internet";
        invalidInput.style.display="block";
        display.style.display="none";
        }
    })

}

searchBtn.addEventListener("click",function(){
    if(search.value.length!=0){
        getData(search.value);
    }
});