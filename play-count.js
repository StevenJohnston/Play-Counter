var songcount, cSong =0, total = 0,min = 0 ,sec = 0, rowHeight =0, lastLoadedSong;
table = document.querySelector('tbody');
songcount = table.getAttribute('data-count');
lastLoadedSong = table.getAttribute('data-end-index');
rows = document.querySelectorAll('.song-row');
height = rows[1].offsetTop - rows[0].offsetTop;
cSong =0;
total = 0;
var oneAtATime = function()
{
  var listens = parseInt(document.querySelector('[data-index="'+cSong+'"]').querySelector('[data-col="play-count"]').querySelector("span").innerHTML);
  if(!isNaN(listens))
  {
    total += listens;
    var time = document.querySelector('[data-index="'+cSong+'"]').querySelector('[data-col="duration"]').querySelector("span").innerHTML.split(':');
    min += parseInt(time[0])*listens;
    sec += parseInt(time[1])*listens;
  }
  cSong++;
  if(cSong < songcount && cSong == lastLoadedSong)
  {
    document.querySelector('#mainContainer').scrollTop = cSong*height;
    setTimeout(function(){
    lastLoadedSong = table.getAttribute('data-end-index');
      oneAtATime();
    },10);
  }
  else if(cSong != lastLoadedSong){
    oneAtATime();
  }
  else {
    console.log("total play count is:" + total);
    min += Math.floor(sec/60);
    sec = sec%60;
    var hour = 0;
    hour += Math.floor(min/60);
    min = min%60;
    var days = 0;
    days += Math.floor(hour/24);
    hour = hour%24;
    console.log("days:"+ days+ ' hour:'+ hour+ ' min:' + min+" sec:"+sec);
  }
}

oneAtATime();
