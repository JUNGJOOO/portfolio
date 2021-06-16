


// 공통 - 최상단 날짜

// 요일
var week = '일월화수목금토';
var today = new Date();
var Year = today.getFullYear()+"";

var Month = today.getMonth() + 1;
var Day = today.getDate();
var DayName = week[today.getDay()];


if(Month < 10) Month = "0" + Month;
if(Day < 10) Day = "0" + Day;



var Today = Year + '. ' + Month + '. ' + Day + ' ' + DayName;

document.getElementById("TODAY").value = Today;


// 시간
var hh = today.getHours();
var mm = today.getMinutes();
var Time = (hh>9 ? '' : '0') + hh +":"+ (mm>9 ? '' : '0') + mm;

document.getElementById("TIME").value = Time;


