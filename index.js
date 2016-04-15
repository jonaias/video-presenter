var currentTimeout;
var currentPart = 0;

var video = document.getElementById('presentation-video');

var videoParts = [];
videoParts.push({start:0,duration:10,type:"PLAY"});
videoParts.push({start:10,duration:5,type:"HOLD"});
videoParts.push({start:10,duration:10,type:"PLAY"});
videoParts.push({start:20,duration:3,type:"HOLD"});
videoParts.push({start:20,duration:10,type:"PLAY"});

function executePart(){
  if(currentPart<0){
    currentPart=0;
  }
  else if(currentPart > videoParts.length-1){
    currentPart = videoParts.length-1;
    video.pause();
    return;
  }
  if (videoParts[currentPart].type == "PLAY"){
    video.currentTime = videoParts[currentPart].start;
    video.play();
    currentTimeout = setTimeout(function(){
      video.pause();
      currentPart++;
      if(currentPart<videoParts.length){
        executePart();
      }
    },  videoParts[currentPart].duration*1000);
  }
  else if (videoParts[currentPart].type == "HOLD"){
    video.currentTime = videoParts[currentPart].start;
    video.pause();
    currentTimeout = setTimeout(function(){
      video.pause();
      currentPart++;
      if(currentPart<videoParts.length){
        executePart();
      }
    },  videoParts[currentPart].duration*1000);
  }
}

setInterval(function() {
  var v = document.getElementById('title-x');
  v.innerHTML = 'Slide:'+ currentPart + ' Duration:'+
  (video.currentTime-videoParts[currentPart].start).toFixed(2) +'/'+
  videoParts[currentPart].duration.toFixed(2);
}, 200);

function keyUp (event) {
  var key = event.keyCode || event.which;
  if (key==37){
    if (currentTimeout){
      clearTimeout(currentTimeout);
    }
    currentPart--;
    executePart();
  }
  if (key==39){
    if (currentTimeout){
      clearTimeout(currentTimeout);
    }
    currentPart++;
    executePart();
  }
  if (key==32){
    video.pause();
    clearTimeout(currentTimeout);
  }
}
