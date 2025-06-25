

let securityKey = "d5ab37a4ff4c4c519c5140538252306";
let countryInput = document.getElementById('countryInput');

let searchBtn = document.getElementById('basic-addon2');



let weatherSummary = document.getElementById('weatherSummary');

document.addEventListener('DOMContentLoaded', function() {
    GetWeatherData('cairo')
    .then(function(response) {
       
        return response.json();
        
    }).then(function(response) {
       
        weatherSummary.innerHTML += "";
        weatherSummary.innerHTML += GetFirstDayData(response);
        weatherSummary.innerHTML += GetSecondDayData(response);
        weatherSummary.innerHTML += GetThirdDayData(response);
    }).catch(function() {
        console.log('errororo');
         
    });

})

function GetDayIndex(day) {
    for(let i = 0;i < days.length;i++) {
        if(days[i].toLowerCase().trim() === day.toLowerCase().trim()) {
            return i;
        }
    }
    return -1;
}

function GetWeatherData(country) {

     return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${securityKey}&q=${country}&days=3`);

}


countryInput.addEventListener('input', function() {
    
    GetWeatherData(countryInput.value)
    .then(function(response) {
        
        return response.json();
        
    }).then(function(response) {
        
        weatherSummary.innerHTML = "";
        weatherSummary.innerHTML += GetFirstDayData(response);
        weatherSummary.innerHTML += GetSecondDayData(response);
        weatherSummary.innerHTML += GetThirdDayData(response);
    }).catch(function() {
       console.log('errororo');
         
    });

});



function GetFirstDayData(data) {
    const current = data?.current;
    const location = data?.location;
    const condition = current?.condition;
    
    return `
    <div class="col-md-4 mb-3">
        <div class="card bg-custom text-white h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <span class="badge bg-light text-dark fs-6">${new Date().toLocaleDateString('en-US', {weekday: 'long'})}</span>
                </div>
                <div>
                    <span class="badge bg-light text-dark">${new Date().toLocaleDateString('en-US', {day: 'numeric', month: 'long'})}</span>
                </div>
            </div>
            <div class="card-body text-center">
                <h3 class="card-title">${location.name}</h3>
                <div class="display-4 fw-bold my-3">${current.temp_c}°C</div>
                <img src="${condition.icon}" alt="${condition.text}" class="img-fluid" style="width: 64px">
                <h4 class="my-2">${condition.text}</h4>
                
                <div class="d-flex justify-content-around mt-4">
                    <div class="text-center">
                        <i class="fas fa-tint fs-5"></i>
                        <div class="fw-bold">${current.humidity}%</div>
                       
                    </div>
                    <div class="text-center">
                        <i class="fas fa-wind fs-5"></i>
                        <div class="fw-bold">${current.wind_kph} km/h</div>
                       
                    </div>
                    <div class="text-center">
                        <i class="fas fa-location-arrow fs-5"></i>
                        <div class="fw-bold">${current.wind_dir}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function GetSecondDayData(data) {
    const forecast = data?.forecast?.forecastday?.[1]?.day;
    const forecastDate = new Date(data.forecast.forecastday[1].date);
    
    return `
    <div class="col-md-4 mb-3">
        <div class="card  bg-custom text-white h-100">
            <div class="card-header text-center">
                <h5 class="mb-0">${forecastDate.toLocaleDateString('en-US', {weekday: 'long'})}</h5>
            </div>
            <div class="card-body text-center">
                <img src="${forecast.condition.icon}" alt="${forecast.condition.text}" class="img-fluid my-2" style="width: 64px">
                <div class="">
                    <div>
                        <p class="fw-bold fs-4">${forecast.maxtemp_c}°C</p>
                        
                    </div>
                    <br>
                    <div>
                        <p class="fw-bold fs-4">${forecast.mintemp_c}°C</p>
                       
                    </div>
                </div>
                <h5 class="mt-3">${forecast.condition.text}</h5>
                <div class="mt-4">
                    <div><i class="fas fa-wind me-2"></i> ${forecast.maxwind_kph} km/h</div>
                    <div><i class="fas fa-tint me-2"></i> ${forecast.avghumidity}% Humidity</div>
                </div>
            </div>
        </div>
    </div>`;
}

function GetThirdDayData(data) {
    const forecast = data?.forecast?.forecastday?.[2]?.day;
    const forecastDate = new Date(data.forecast.forecastday[2].date);
    
    return `
    <div class="col-md-4 mb-3">
        <div class="card  bg-custom text-white h-100">
            <div class="card-header text-center">
                <h5 class="mb-0">${forecastDate.toLocaleDateString('en-US', {weekday: 'long'})}</h5>
            </div>
            <div class="card-body text-center">
                <img src="${forecast.condition.icon}" alt="${forecast.condition.text}" class="img-fluid my-2" style="width: 64px">
                <div class="">
                    <div>
                        <div class="fw-bold display-6">${forecast.maxtemp_c}°C</div>
                      
                    </div>
                    <br>
                    <div>
                        <div class="fw-bold display-6">${forecast.mintemp_c}°C</div>
                        
                    </div>
                </div>
                <h5 class="mt-3">${forecast.condition.text}</h5>
                <div class="mt-4">
                    <div><i class="fas fa-umbrella me-2"></i> ${forecast.daily_chance_of_rain}% Rain</div>
                    <div><i class="fas fa-sun me-2"></i> UV Index: ${forecast.uv}</div>
                </div>
            </div>
        </div>
    </div>`;
}

