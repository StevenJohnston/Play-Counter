var songcount, cSong =0, total = 0,min = 0 ,sec = 0, rowHeight =0, lastLoadedSong, albums = [];
table = document.querySelector('tbody');
songcount = table.getAttribute('data-count');
lastLoadedSong = table.getAttribute('data-end-index');
rows = document.querySelectorAll('.song-row');
height = rows[1].offsetTop - rows[0].offsetTop;
cSong =0;
total = 0;
var oneAtATime = function()
{
  var row = document.querySelector('[data-index="'+cSong+'"]');
  var albumId = row.querySelector('[data-col="album"]').getAttribute("data-matched-id");
  var albumName = row.querySelector('[data-col="album"]').querySelector('span').querySelector('a').innerHTML;
  var listens = parseInt(row.querySelector('[data-col="play-count"]').querySelector("span").innerHTML);
  if(!isNaN(listens))
  {
    total += listens;
    var time = document.querySelector('[data-index="'+cSong+'"]').querySelector('[data-col="duration"]').querySelector("span").innerHTML.split(':');
    min += parseInt(time[0])*listens;
    sec += parseInt(time[1])*listens;

    if(!(albumId in albums))
    {
      albums[albumId] = {
        'name' : albumName,
        'playcount':0,
        'sec':0,
        'min':0
      };
    }
    albums[albumId]['playcount'] += listens;
    albums[albumId]['sec'] += sec;
    albums[albumId]['min'] += min;
  }


  cSong++;
  if(cSong < songcount && cSong == lastLoadedSong)
  {
    document.querySelector('#mainContainer').scrollTop = cSong*height;
    setTimeout(function(){
    lastLoadedSong = table.getAttribute('data-end-index');
      oneAtATime();
    },100);
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
    albumsArray = Object.keys(albums).map(function(key){
      var album = albums[key];
      album['min'] += Math.floor(album['sec']/60);
      album['sec'] = album['sec']%60;
      album['hour'] = 0;

      album['hour'] += Math.floor(album['min']/60);
      album['min'] = album['min']%60;
      album['days'] = 0;
      album['days'] += Math.floor(album['hour']/24);
      album['hour'] = album['hour']%24;
      return album;
    });
    albumsArray.sort(function(album1, album2){
      return album2['playcount'] - album1['playcount'];
    });
    console.log(albumsArray);
  }
}

oneAtATime();
