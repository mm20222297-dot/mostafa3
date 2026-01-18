var mysong = document.getElementById("mysong")
var icon = document.getElementById("icon")

icon.onclick = function(){
   if(mysong.paused){
    mysong.play();
    icon.src ="stp.jpg";
   }else{
       mysong.pause();
    icon.src ="mm.webp";
   }
}