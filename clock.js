/*Create and set clock*/
let Timer = setInterval(() => {
  let currentTime = 0;
  const clock = document.getElementById("clock");
  currentTime = new Date().toUTCString();
  clock.innerText = currentTime;
  }, 1000);