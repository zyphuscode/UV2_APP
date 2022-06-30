let weathers = { 
    "apikey":'b0c192444eac6c6398395a105c3a96a1',
     fetchWeather: function() {
      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=-25.734968&lon=134.489563&units=metric&exclude=hourly&appid=b0c192444eac6c6398395a105c3a96a1"
      ).then((response)=> response.json())
      .then((data) => this.displayWeather(data));
     },
  displayWeather: function(data) {
     const timezone = data.timezone;
     const  uvi = data.current.uvi;
     const temp = data.current.temp;
     //const description = data.weather.description;
     //console.log(name,icon,description,uvi)
     console.log(timezone,uvi,temp);

     let result = document.querySelector("#result");

     if (uvi < 5) result.innerHTML = "<span style='color:green'> Low to moderate: No to some protection needed <br> <i class='bx bx-smile'></i></span>"
       else if ( uvi >= 7 && uvi <= 10) result.innerHTML = "<span style='color:green'>  High to very high : Extra protection is essential <br> <img src='fearful-face(1).png'></span>"
         else result.innerText =
              "Extreme : Stay inside";
  
     document.querySelector(".city").innerText = "UV index in " + timezone +   " is " +  uvi;
     document.querySelector(".temp").innerText = temp + "°C";
     document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    }
    
  }


  document.querySelector(".search button").addEventListener("click", function() {
    weathers.search();
  })
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
weathers.fetchWeather("Sydney");

// image uploader
var canvas = document.getElementById("c");
var ctx = canvas.getContext('2d');
var img = new Image();

//Image with EventListener
img.addEventListener('load', function() {
  ctx.filter = 'none';
  ctx.drawImage(img, 0, 0, 300, 200);
  window.URL.revokeObjectURL(this.src);
}, false);  

//Blurring filter
var uv = document.getElementById('uv');
uv.addEventListener('click', function() {
  ctx.filter = 'invert(100%)';

  //ctx.filter = url('#warm-x-rays');
 
  ctx.drawImage(img, 0, 0, 300, 200);
}, false);

//Handle files to capture image src
function handleFiles(files) {
  if (files.length) {
    img.src = window.URL.createObjectURL(files[0]);
  }
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

      /*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}
/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
