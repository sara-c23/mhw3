document.addEventListener("DOMContentLoaded", function() {
  const nextBtn = document.querySelector('#next');
  const prevBtn = document.querySelector('#prev');

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function updateSlider() {
      slides.forEach(function(slide, index) {     /*for each*/
      slide.classList.remove('active');
      if (index === currentIndex) {
      slide.classList.add('active');
        }
      });
  }

  nextBtn.addEventListener('click', function() {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
      }
  });

  prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
  });

  updateSlider(); // Imposta la prima immaginek come visibile

  
  const noteLegaliLinks = document.querySelectorAll('.note-legali');

  noteLegaliLinks.forEach(function(link) {              /*foreach*/
  link.addEventListener('click', function(event) {
          
  const container = this.parentElement;
  const existingParagraph = container.querySelector('p');

    if (existingParagraph) {
    container.removeChild(existingParagraph);
    } else {
    const new_p = document.createElement('p');
    new_p.textContent = 'Informazioni aggiuntive: La promozione è valida solo per i residenti in Italia. Termini e condizioni applicabili.';
    container.appendChild(new_p);
          }
    });
  });
});







document.addEventListener("DOMContentLoaded", function() {
  //news
  function news(event) {
      event.preventDefault();  //importante per non far ricaricare la pagina (submit)
      const keyword_input = document.querySelector('#news-keyword');
      const keyword_value = encodeURIComponent(keyword_input.value);
      console.log('Eseguo ricerca notizie: ' + keyword_value);

      const apiKey = 'secret';
      const rest_url = 'https://newsapi.org/v2/everything?q=${keyword_value}&apiKey=${apiKey}';
      console.log('URL Notizie: ' + rest_url);

      fetch(rest_url)
          .then(response => response.json())
          .then(json => {
              console.log('JSON Notizie ricevuto:', json);
              const newsContainer = document.getElementById('news-container');
              newsContainer.innerHTML = '';

              if (json.articles && json.articles.length > 0) {
                  json.articles.slice(0, 5).forEach(article => {
                      const newsItem = document.createElement('div');
                      newsItem.classList.add('article');
                      newsItem.innerHTML =  `
                          <h2>${article.title}</h2>
                          <p>${article.description || 'Nessuna descrizione disponibile.'}</p>
                          <a href="${article.url}" target="_blank">Leggi di più</a>
                      `;
                      newsContainer.appendChild(newsItem);
                  });
              } else {
                  newsContainer.innerHTML = '<p>Nessuna notizia trovata.</p>';
              }
          });
  }

  //meteo
  function meteo(event) {
      event.preventDefault(); 
      const keyword_input = document.querySelector('#meteo-keyword');
      const keyword_value = encodeURIComponent(keyword_input.value);
      console.log('Eseguo ricerca meteo: ' + keyword_value);

      const apiKey = 'secret';
      const rest_url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${keyword_value}`;
      console.log('URL Meteo: ' + rest_url);
  
  
  
      fetch(rest_url)
          .then(response => response.json())
          .then(json => {
              console.log('JSON Meteo ricevuto:', json);
              const meteoContainer = document.getElementById('meteo-container');
              meteoContainer.innerHTML = '';

              if (json.current) {
                  const meteoItem = document.createElement('div');
                  meteoItem.classList.add('meteo');
                  meteoItem.innerHTML = `
                      <h2>Meteo a ${json.location.name}</h2>
                      <p>Temperatura: ${json.current.temperature}°C</p>
                      <p>Descrizione: ${json.current.weather_descriptions[0]}</p>
                      <p>Umidità: ${json.current.humidity}%</p>
                      <p>Vento: ${json.current.wind_speed} km/h</p>
                      <img src="${json.current.weather_icons[0]}" alt="Icona Meteo">
                  `;
                  meteoContainer.appendChild(meteoItem);
              } else {
                  meteoContainer.innerHTML = '<p>Nessun dato meteo trovato.</p>';
              }
          });
  }
  
  //listener delle news
  const newsForm = document.querySelector('#news-form');
  newsForm.addEventListener('submit', news);
//listener del meteo
  const meteoForm = document.querySelector('#meteo-form');
  meteoForm.addEventListener('submit', meteo);
});
