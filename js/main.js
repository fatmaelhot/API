const row = document.querySelector(".row");
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];




function getData(country) {
  
  const myHttp = new XMLHttpRequest();

 
  myHttp.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=69542678953342a486381800230108&q=${country}&days=3`
  );
  myHttp.send();

  myHttp.addEventListener("readystatechange", () => {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      const response = JSON.parse(myHttp.response);
      console.log(response)
      currentDay(response.current, response.location);
      futureDay(response.forecast);
    }
  });
}

function currentDay(current, location) {
  row.innerHTML = `<div class="col-xl-4 col-md-6">
          <div class="card bg-black bg-opacity-75 text-white shadow border-0 p-1">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 d-flex justify-content-between text-info fs-3"><span>${
                dayNames[new Date().getDay(location.localtime)]
              }</span><span>${new Date().getDate(location.localtime)} ${
    monthNames[new Date().getMonth(location.localtime)]
  }</span></h6>
              <h5 class="card-title fs-4 my-3">${location.name}, ${
    location.region
  }, ${location.country}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-text fs-1 fw-bold">${
                  current.temp_c
                }<sup>o</sup>C</p>
                
              </div>
              <p class="state mb-4">${current.condition.text}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span><img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="" class="me-1"> Humidity : ${
                  current.humidity
                }%</span>
                <span><img src="https://routeweather.netlify.app/images/icon-wind.png" alt="" class="me-1"> Wind : ${
                  current["wind_kph"]
                }km/h</span>
              </div>
            </div>
          </div>
        </div>`;
}

function futureDay(future) {
  for (let i = 1; i <= 2; i++) {
    row.innerHTML += `<div class="col-xl-4 col-md-6 text-center">
            <div class="card h-100 bg-black bg-opacity-75 text-white shadow border-0 p-2">
                <div class="card-body">
                    <h6 class="card-subtitle text-info fs-2">${
                      dayNames[new Date(future.forecastday[i].date).getDay()]
                    }</h6>
                    <div class="d-flex justify-content-center mt-3 align-items-center">
                        <div>
                            <p class="card-text fs-4 fw-bold">${
                              future.forecastday[i].day.maxtemp_c
                            }<sup>o</sup>C</p>
                            <p>${
                              future.forecastday[i].day.mintemp_c
                            }<sup>o</sup></p>
                        </div>
                        
                    </div>
                    <p class="state mt-4">${
                      future.forecastday[i].day.condition.text
                    }</p>
                </div>
            </div>
        </div>`;
  }
}




document.querySelector("input").addEventListener("keyup", (e) => {
  row.innerHTML = "";
  if (e.target.value == "") {
    getData("Cairo");
  } else {
    getData(e.target.value);
  }
});





getData("Cairo");