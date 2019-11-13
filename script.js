var day = document.getElementById("day").getElementsByTagName("*");
var week = document.getElementById("week").getElementsByTagName("*");
var nowdate = document.getElementById("nowdate").getElementsByTagName("*");
var load = document.getElementById("load");
var loc = document.getElementById("loc");
var search = document.getElementById("Search");
var text = document.getElementById("text");
var key = "&appid=c7db44947dfcd0b579bb1947bf47b435";
//var town = "London";
var weathertime = "https://api.openweathermap.org/data/2.5/forecast?q=";
var iconurl = "http://openweathermap.org/img/wn/"
var icon = "@2x.png";
var locat;

//var nowdateinside = nowdate.getElementsByTagName("*");

//var refresh = setInterval(() =>{ getcontent();getweek();}, 2000);
//http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10
weather();
 async function weather(town="London"){
    load.style.display='block';
     try{
    var xhr = new XMLHttpRequest();
    xhr.open("get", weathertime+town+key, true);
    try{
    xhr.send();
    }
    catch(e){}
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) {
            return;
        }
        else if (xhr.status == 200) {
            loc.innerHTML=text.value;
            locat = jQuery.parseJSON(xhr.responseText);
        }
    };
    setTimeout(() => { getcontent();getweek();load.style.display='none'; }, 2000);
}
catch(e){
    alert(e);
}
}


async function getcontent(){
    try{
    nowdate[0].textContent = locat.list[0].dt_txt;
    day[2].src=iconurl+locat.list[0].weather[0].icon+icon;
    day[3].textContent=locat.list[0].weather[0].main;
    day[7].textContent=(locat.list[1].main.temp/32).toFixed(2) +" °C";
    day[9].textContent="Sunrise: "+(new Date(locat.city.sunrise*1000)).toUTCString().slice(-11, -4);
    day[10].textContent="Sunset: "+(new Date(locat.city.sunset*1000)).toUTCString().slice(-11, -4);
    day[11].textContent=(new Date((locat.city.sunset-locat.city.sunrise)*1000)).toUTCString().slice(-11, -4);
    }
    catch(e){}
}
async function getweek(){
    try{
        let tm = 8;
        let ic=10;
        let sun = 11;
        let t1=12;
        let t2=13;
        let wind=14;
        for(let i = 0 ; i < 8;i++){
            week[tm].textContent=(new Date(locat.list[i].dt*1000)).toUTCString().slice(-11, -4);tm+=8;
            week[ic].src=iconurl+locat.list[i].weather[0].icon+icon;ic+=8;
            week[sun].textContent=locat.list[i].weather[0].main;sun+=8;
            week[t1].textContent=(locat.list[i].main.temp_max/32).toFixed(2) +" °C";t1+=8;
            week[t2].textContent=(locat.list[i].main.temp_min/32).toFixed(2) +" °C";t2+=8;
            week[wind].textContent=locat.list[i].wind.speed;wind+=8;
        }
    }
    catch(e){}
}

async function searching(){
    weather(text.value);
}
