onload = function() {
  let seconds = 0;
  let total_sec;
  let timeEl = document.getElementById('time');
  let timeInpEl = document.getElementById('time_i');
  let timeInpSEl = document.getElementById('time_i_s');
  let delaysEl = document.getElementById('delays');
  let progEl = document.getElementById('prog');
  let flasher;
  let timer;
  let inPause = false;
  let beep;

  function update() {
    let dSeconds = seconds%60;
    let dMinutes = seconds/60|0;
    if (dSeconds<10) dSeconds = '0'+dSeconds;
    if (dMinutes<10) dMinutes = '0'+dMinutes;
    timeEl.innerHTML = `${dMinutes}:${dSeconds}`;
    if (!isTimer) {
      let perc = seconds/total_sec*100|0;
      progEl.style = `background-image: linear-gradient(to left, white ${perc}%,green);`
    }
  }
  document.getElementById('close').onclick = function() {
      window.close();
  };
  let timerCallback = function() {
    if (isTimer)
      seconds++;
    else if (--seconds<-0) {
      if (!flasher) {
        flasher = setInterval(flashCallback, 300);
        //beep.currentTime = 0;
        beep = new Audio('sound.mp3');
        beep.addEventListener('ended', function() {
          console.log("Ended!");
          this.currentTime = 0;
          this.play();
        }, false);
        beep.loop = true;
        beep.play();
      }
      seconds = 0;
      //stopButton.click();
    }
    update();
  }

  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  const stopButton = document.getElementById('stop');
  const modeButton = document.getElementById('mode');

  function flashCallback() {
    document.body.classList.toggle('flash');
  }
  function setVis(play, pause, stop, mode) {
    playButton.className = play?'':'hidden';
    pauseButton.className = pause?'':'hidden';
    stopButton.className = stop?'':'hidden';
    modeButton.className = mode?'':'hidden';
  }

  playButton.onclick = function() {
    if (timer) clearInterval(timer);
    if (!isTimer && !inPause) {
      seconds = (timeInpEl.value|0)*60;
      total_sec = seconds;
      updateMode(true);
      prog.className = '';
    }
    update();
    inPause = false;
    timer = setInterval(timerCallback, 1000);
    setVis(false, true, true, false);
  };
  pauseButton.onclick = function() {
    inPause = true;
    if (timer) clearInterval(timer); 
    setVis(true, false, true, false);       
  }
  stopButton.onclick = function() {
    inPause = false;
    if (timer) clearInterval(timer); 
    seconds = 0;
    update();
    setVis(true, false, false, true);       
    if (!isTimer) updateMode(false);
    if (flasher) {
      clearInterval(flasher);
      document.body.classList.remove('flash');
      flasher = null;
      if (beep) {
        beep.pause();
        beep = null;
      }
    }
  }
  let isTimer = true;
  modeButton.onclick = function() {
    isTimer = !isTimer;
    updateMode(isTimer);
  }
  function updateMode(isTimer) {
    timeInpSEl.className=isTimer?'hidden':'';
    delaysEl.className=isTimer?'hidden':'';
    timeEl.className=isTimer?'':'hidden';
    prog.className = 'hidden';
  }
  document.querySelectorAll('#delays button').forEach(function(b) {
    b.onclick = function() {
      timeInpEl.value = b.innerHTML;
    }
  });
}
