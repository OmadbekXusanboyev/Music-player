const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const fa_solid = document.querySelector(".fa-solid");
const music_img = document.querySelector(".music_img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prive");
const playBtn = document.querySelector(".pause");
const container = document.querySelector(".container");
const audio = document.querySelector(".audio");
const title = document.querySelector(".title");
const line = document.querySelector(".line");
const muzic_time = document.querySelector(".muzic-time");
const modal = document.querySelector(".modal");
const modal_content = document.querySelector(".modal-content");
const menu = document.querySelector(".menu");
const arrow_left = document.querySelector(".arrow-left")
const startTime = document.querySelector(".startTime")
const endTime = document.querySelector(".endTime")

const volume = document.querySelector(".volume")



menu.addEventListener("click", () => {
  modal.classList.toggle("active");
})
arrow_left.addEventListener("click", () => {
  modal.classList.remove("active");
})




const musics = [
  "Yengib O't",
  "Billie Eilish - Lovely",
  "Heather - Conan Gray",
  "Mira - Otajonim",
  "Minor ft Uzmir - My Rain",
  "Orxan - Unutmak Istiyorum",
  "Rauf Faik - метро",
];



let NewMusiz = musics.forEach(() => {
  modal_content.innerHTML
});



let index = 0;

const resetRotation = () => {
  music_img.style.animation = 'none';
  music_img.offsetHeight; 
  music_img.style.animation = null;
};

const loadSong = (index) => {
  title.innerHTML = musics[index];
  music_img.setAttribute("src", `./img/${musics[index]}.jpg`);
  audio.setAttribute("src", `./musics/${musics[index]}.mp3`);
  modal_content.innerHTML = `
                               <h3 onclick="loadSongEl(0)" >${musics[0]}</h3>
                               <h3 onclick="loadSongEl(1)">${musics[1]}</h3>
                               <h3 onclick="loadSongEl(2)" >${musics[2]}</h3>
                               <h3 onclick="loadSongEl(3)" >${musics[3]}</h3>
                               <h3 onclick="loadSongEl(4)" >${musics[4]}</h3>
                               <h3 onclick="loadSongEl(5)" >${musics[5]}</h3>
                               <h3 onclick="loadSongEl(6)" >${musics[6]}</h3>`
  audio.currentTime = 0; 
  resetRotation(); 
  
  if (container.classList.contains("load")) {
    music_img.style.animationPlayState = 'running';
  } else {
    music_img.style.animationPlayState = 'paused';
  }
};


loadSongEl = (index) => {
  index = index;
  loadSong(index);
  playMusic();
}


loadSong(index);

const play = () => {
  playBtn.addEventListener("click", () => {
    container.classList.toggle("load");
    if (container.classList.contains("load")) {
      audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      music_img.style.animationPlayState = 'running';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      music_img.style.animationPlayState = 'paused';
    }
  });
};
play();

const playMusic = () => {
  container.classList.add("load");
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  resetRotation();
  music_img.style.animationPlayState = 'running';
};

nextBtn.addEventListener("click", () => {
  index++;
  if (index > musics.length - 1) {
    index = 0;
  }
  loadSong(index);
  playMusic();
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = musics.length - 1;
  }
  loadSong(index);
  playMusic();
});

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
}, 1000);

audio.addEventListener('ended', () => {
  nextBtn.click();
});

const progress = (e)=>{
  const duration = e.srcElement.duration
  const currentTime = e.target.currentTime

  const durMin  = Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)
  const durSec = Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)

  const curTime  = Math.floor(currentTime / 60) < 10 ? '0' + Math.floor(currentTime / 60) : Math.floor(currentTime / 60)
  const curSec = Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60)

  startTime.textContent = `${curTime}:${curSec}`

  if (durMin) {
    endTime.textContent = `${durMin}:${durSec}`
  }
  else{
    endTime.textContent = "00:00"
  }
  

  const lineWith = (currentTime*100)/duration
  line.style.width = `${lineWith}%`
  
}


audio.addEventListener('timeupdate', progress)

const setProgress = (e) => {
  const clientWith = muzic_time.clientWidth
  const pointWith = e.offsetX

  audio.currentTime = (pointWith * audio.duration) / clientWith

}

muzic_time.addEventListener("click", setProgress);

volume.addEventListener("input", (e) => {
  audio.volume = e.target.value
})
