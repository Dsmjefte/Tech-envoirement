const tempGrafiek = document.getElementById("js--grafiek--buitenTemp");
const Button01 = document.getElementById("js--light--button--01");
const Button02 = document.getElementById("js--light--button--02");
const Button03 = document.getElementById("js--light--button--03");
const ButtonText01 = document.getElementById("js--button--text--01");
const ButtonText02 = document.getElementById("js--button--text--02");
const ButtonText03 = document.getElementById("js--button--text--03");
const TempText = document.getElementById("js--temp--text");
const toggle = document.getElementById("js--switch")
const lightCard = document.getElementById("js--licht--card")
const airco = document.getElementById("js--airco")
const binnentemp = document.getElementById("binnenTemp")
const aircoStatus = document.getElementById("js--airco--status")



let nodeMCUData = null;





// Grafiek van Mohammed code begin\\
function GrafiekBuitenTemp() {
  const labels = [
    "Ma",
    "Di",
    "Wo",
    "Do",
    "Vr",
    "Za",
    "Zo"
  ]
  const data = {
    labels: labels,
    datasets: [{
      label: "Buitentemperatuur In C°",
      data: [22, 24, 8, 19, 15, 27, 9],
      borderWidth: 1,
    },
    {
      label: "Binnentemperatuur In C°",
      data: [16, 18, 21, 16, 19, 13, 20],
      borderWidth: 1,
    }
    ]

  };
  const config = {
    type: 'bar',
    data: data,
    options:
    {
      plugins: {
        title: {
          display: true,
          text: "Buiten en Binnentemperatuur In C°"
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 16
          }
        }
      },


      scales: {
        x: {
          ticks: {
            font: {
              size: 14, // set the font size for x-axis labels
            }
          }
        },
        y: {
          min: 0,
          max: 40,
        }
      }
    },
  };

  const myChart01 = new Chart(document.getElementById("js--chart--01"), config)
}
GrafiekBuitenTemp();
// Grafiek van Mohammed code einde\\
// light buttons van Mohammed code begin\\
let isPressed01 = false;
let isPressed02 = false;
let isPressed03 = false;

Button01.onclick = function () {
  if (isPressed01 == false) {
    ButtonText01.innerHTML = "on";
    Button01.classList.add("on")
    Button01.classList.remove("off")
    isPressed01 = true
  }
  else {
    ButtonText01.innerHTML = "off";
    Button01.classList.add("off")
    Button01.classList.remove("on")
    isPressed01 = false
  }
  // SendLights();
}
Button02.onclick = function () {
  if (isPressed02 == false) {
    ButtonText02.innerHTML = "on";
    Button02.classList.add("on")
    Button02.classList.remove("off")
    isPressed02 = true
  }
  else {
    ButtonText02.innerHTML = "off";
    Button02.classList.add("off")
    Button02.classList.remove("on")
    isPressed02 = false
  }
  // SendLights();
}
Button03.onclick = function () {
  if (isPressed03 == false) {
    ButtonText03.innerHTML = "on";
    Button03.classList.add("on")
    Button03.classList.remove("off")
    isPressed03 = true
  }
  else {
    ButtonText03.innerHTML = "off";
    Button03.classList.add("off")
    Button03.classList.remove("on")
    isPressed03 = false

  }
  // SendLights();
}
// SendLights();
setInterval(function () {
  let LampBestuurder = fetch("https://39613.hosts2.ma-cloud.nl/duurzaamhuis/post.php")
    .then(function (arduinoData) {
      return arduinoData.json()
    })
    .then(function (actueleArduinoData) {
      nodeMCUData = actueleArduinoData;
      console.log(actueleArduinoData)
      binnentemp.innerHTML = actueleArduinoData.dht11.temp + "°"
      console.log("Current temp: " + actueleArduinoData.dht11.temp)
      if (actueleArduinoData.dht11.temp < 19) {
        aircoStatus.innerHTML = "on"
      }
      else {
        aircoStatus.innerHTML = "off"

      }
    })
}, 5000)

setInterval(function () {

  if (nodeMCUData == null) {
    console.log("Error")
    return
  }
  nodeMCUData.lights = [isPressed01, isPressed02, isPressed03];
  fetch("https://39613.hosts2.ma-cloud.nl/duurzaamhuis/post.php", {
    method: "POST",
    body: JSON.stringify(nodeMCUData)//{ "lights": [ isPressed01, isPressed02, isPressed03] }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (LampActueleData) {
      // console.log(LampActueleData)
    })
    ;

}, 1000);
// light buttons van Mohammed code einde\\
// actuele buitentemp van Mohammed code begin\\
let BuitenTemp = fetch("https://api.openweathermap.org/data/2.5/weather?lat=52.377956&lon=-4.897070&appid=3035de8e14e4b14c0207acd75a27bdff")
  .then(function (BuitenTempData) {
    return BuitenTempData.json();
  }).then(function (BuitenTempActueleData) {

    let TempInKelvin = BuitenTempActueleData.main.temp;
    let TempInCelsius = TempInKelvin - 273.15;
    TempText.innerHTML = Math.floor(TempInCelsius) + "°";
  });

// actuele buitentemp van Mohammed code einde\\
// binnen temp en auto airco van Mohammed code \\
let toggeld = toggle.checked
console.log(toggeld)
toggle.onclick = function () {
  if (toggle.checked == true) {
    lightCard.classList.add("NotVissible");
    airco.classList.remove("NotVissible");
    return
  }
  else {
    lightCard.classList.remove("NotVissible");
    airco.classList.add("NotVissible");
  }
}
airco.classList.add("NotVissible");


// binnen temp en auto airco van Mohammed code einde\\