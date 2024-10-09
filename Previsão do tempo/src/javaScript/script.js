document.querySelector('#search').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return showalert ('Você precisa digitar uma cidade...');
    } 
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c'
    
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    

    const results = await fetch(apiurl);
    const json = await results.json();



    if (json.cod === 200){
        showinfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    }else{
        showalert("Não foi possivel localizar...")
    }
});

function showinfo(json){
    showalert('')
    document.querySelector('#weather').classList.add('show')

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country} `

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.' , ',')} <sup>C°</sup>`

    document.querySelector('#temp_description').innerHTML = `${json.description} `
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
}

function showalert(msg) {
    document.querySelector('#alert').innerHTML = msg
}