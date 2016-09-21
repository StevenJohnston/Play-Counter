var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
var songcount, cSong =0, total = 0,min = 0 ,sec = 0;
var oneAtATime = function()
{
  var listens = parseInt($('[data-index="'+cSong+'"]').find('[data-col="play-count"]').find("span").html());
  if(!isNaN(listens))
  {
    total += listens;
    var time = $('[data-index="'+cSong+'"]').find('[data-col="duration"]').find("span").html().split(':');
    min += parseInt(time[0])*listens;
    sec += parseInt(time[1])*listens;
  }
  cSong++;
  if(cSong < songcount)
  {
    $('#mainContainer').scrollTop(cSong*64-128);
    setTimeout(function(){
      oneAtATime();
    },0);
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
setTimeout(function(){
  songcount = $('tbody').data('count');
  cSong =0;
  total = 0;
  oneAtATime();
},5000);
