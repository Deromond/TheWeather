var week = document.getElementById("week").getElementsByTagName("*");
var content = document.getElementById("content").getElementsByTagName("*");
var search = document.getElementById("Search");
var text = document.getElementById("text");
var load = document.getElementById("load");
var key = "&appid=c7db44947dfcd0b579bb1947bf47b435";
var loc = document.getElementById("loc");
var weathertime = "https://api.openweathermap.org/data/2.5/forecast?q=";
var iconurl = "http://openweathermap.org/img/wn/"
var icon = "@2x.png";
var locat;
var day=[];
var cday=[];
var count=[];

async function aday1(){
    getweek(0,8)
}
async function aday2(){
    getweek(8,16)
}
async function aday3(){
    getweek(16,24)
}
async function aday4(){
    getweek(24,32)
}
async function aday5(){
    getweek(32,40)
}


async function getweek(start=0,end=8){
    try{
        let tm = 8;
        let ic=10;
        let sun = 11;
        let t1=12;
        let t2=13;
        let wind=14;
        for(let i = start ; i < end;i++){
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
   setTimeout(() => {getweek(); startday();fivedays();load.style.display='none';}, 3000);
}
catch(e){
   alert(e);
}
}
async function searching(){
    weather(text.value);
}
async function startday(){
    let days = [];
    let a = 0;
    try{
    for(let i = 0 ; i < 40;i++){
        days=locat.list[i].dt_txt.split('-');
        days=days[2].split(' ');
        day[i]=days[0];
    }
    cday[a]=day[0];
    for(let i = 0 ; i <day.length;i++){
        if(day[i]>cday[a])
        {
            count[a]=i;
            a++
            cday[a]=day[i];
        }
    }
}
catch(e){}
}

async function fivedays(){
    let h=1;
    let ico = 3;
    let temp=4;
    let type = 5;
    let hz=[];
for(let i = 0 ; i<5;i++){
    hz=locat.list[count[i]].dt_txt.split(' ');
    content[h].textContent=hz[0];h+=6;
    content[ico].src=iconurl+locat.list[count[i]].weather[0].icon+icon;ico+=6;
    content[temp].textContent=(locat.list[count[i]].main.temp_max/32).toFixed(2) +" °C";temp+=6;
    content[type].textContent=locat.list[count[i]].weather[0].main;type+=6;
}
}