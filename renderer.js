const apiKey = 'ab805fe7997147f7940170648242810'; // Your API key for accessing weather data

// Function to fetch weather data based on user input
async function fetchWeather() {
  // Extract parameters from the URL (country and date)
  const params = new URLSearchParams(window.location.search);
  const country = params.get('country'); // Get the country from URL
  const date = params.get('date'); // Get the date from URL
  
  // Construct the API request URL
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&dt=${date}`;

  try {
    const response = await fetch(url); // Fetch weather data from the API
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Handle errors if response is not OK
    }
    const data = await response.json(); // Parse the JSON response
    
    // Display weather information
    displayWeather(data); 
    // Suggest activities based on the fetched weather data
    suggestActivities(data);
  } catch (error) {
    // Log error and display a message to the user
    console.error("Error fetching weather data:", error);
    document.getElementById('weather-info').innerHTML = `<p>Failed to load weather data. Please try again.</p>`;
  }
}

// Function to display key weather data to the user
function displayWeather(data) {
  const weatherInfo = `
    <div>
      <h3>Weather Information for ${data.location.name}</h3>
      <p><strong>Location:</strong> ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
      <img src="https:${data.forecast.forecastday[0].day.condition.icon}" alt="Weather Icon"> <!-- Weather icon -->
      <p><strong>Local Time:</strong> ${data.location.localtime}</p>
      <p><strong>Current Temperature:</strong> ${data.current.temp_c} °C</p>
      <p><strong>Forecast Temperature:</strong> ${data.forecast.forecastday[0].day.avgtemp_c} °C</p>
      <p><strong>Weather Condition:</strong> ${data.forecast.forecastday[0].day.condition.text}</p>
      <p><strong>Wind Speed:</strong> ${data.forecast.forecastday[0].day.maxwind_kph} kph</p>
      <p><strong>Humidity:</strong> ${data.forecast.forecastday[0].day.avghumidity}%</p>
      <p><strong>Chance of Rain:</strong> ${data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
      <p><strong>Chance of Snow:</strong> ${data.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
    </div>
  `;
  // Update the weather information section with the constructed HTML
  document.getElementById('weather-info').innerHTML = weatherInfo;
}

// Function to suggest activities based on the current weather conditions
function suggestActivities(data) {
  const condition = data.forecast.forecastday[0].day.condition.text.toLowerCase(); // Get weather condition in lower case
  const temp = data.current.temp_c; // Current temperature
  const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain; // Chance of rain
  const chanceOfSnow = data.forecast.forecastday[0].day.daily_chance_of_snow; // Chance of snow

  let suggestions = `<h4>Suggested Activities:</h4>`; // Title for suggested activities
  let reasons = ""; // To hold reasons for indoor activities
  let isIndoorActivity = false; // Flag to check if activities are indoor

  // Helper function to format activity with an image
  function formatActivity(activity, imgUrl) {
    return `
      <li>
        <img src="${imgUrl}" alt="${activity}" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 10px;">
        ${activity}
      </li>`;
  }

  // Outdoor activities suggestions based on temperature and chance of rain
  if (temp > 20 && chanceOfRain < 20) {
    suggestions += `<ul>
      ${formatActivity("Hiking", "https://i.natgeofe.com/n/7afda449-1780-4938-8342-2abe32326c86/Montblanchike.jpg")}
      ${formatActivity("Cycling", "https://www.yha.org.uk/sites/default/files/styles/hero_mobile/public/uploads/Breaks/Cycling/group-of-cyclists_0.jpg?itok=kc77E6yn")}
      ${formatActivity("Picnic", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhfZT2RFAHjuct--SzaMVdgy0Hc44MIT8ZXg&s")}
      ${formatActivity("Beach Day", "https://media.istockphoto.com/id/1364693848/photo/multiracial-parents-walking-behind-children-running-on-sand-at-beach-during-sunny-day.jpg?s=612x612&w=0&k=20&c=b6HS0R4_1chxH0zeU_6mwBxEUUNg9LpgGuebFA_QFR4=")}
      ${formatActivity("Outdoor Photography", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUQWc1lHB0RLmRVANmmny5NMmvExScX1VQg&s")}
    </ul>`;
  } else if (temp > 10 && temp <= 20 && chanceOfRain < 20) {
    suggestions += `<ul>
      ${formatActivity("City Walking Tour", "https://www.trier-info.de/cams/clients/ttm/media/content_mainPicture_1048.jpg?1704990677")}
      ${formatActivity("Visit a Park", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAODnTpGRLtOFau8JaFwAGLpozxqoPe6vi_g&s")}
      ${formatActivity("Fishing", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINzSqHk3OZf5IlN0OIgNo8l4hAAzq_C1Wnh-B2pjJ7jNloeusS1vyWe7DTwBWfKeOCM0&usqp=CAU")}
      ${formatActivity("Bird Watching", "https://media.istockphoto.com/id/955975002/photo/young-girl-bird-watching.jpg?s=612x612&w=0&k=20&c=HQMeqpAc5guqANbKELsbN2GY-dy38SK3kBzFKMNl8LY=")}
    </ul>`;
  } else if (temp > 5 && temp <= 10 && chanceOfRain < 20) {
    suggestions += `<ul>
      ${formatActivity("Running", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1455inuM5VcWGfo2NRyMoFHEmAHwKW-I8qw&s")}
      ${formatActivity("Outdoor Workout", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosmEsK6u8kWXmBx1bm_SI8dQ6-fb_s4aewg&s")}
      ${formatActivity("Photography", "https://news.openspaceauthority.org/hs-fs/hubfs/Paul%20Dileanis%20-%20Ranger%20Dave%20-%20Rancho%20Canada%20del%20Oro%20Open%20Space%20Preserve-1.jpg?width=1944&name=Paul%20Dileanis%20-%20Ranger%20Dave%20-%20Rancho%20Canada%20del%20Oro%20Open%20Space%20Preserve-1.jpg")}
    </ul>`;
  } else if (temp <= 5 && chanceOfSnow > 30) {
    suggestions += `<ul>
      ${formatActivity("Skiing", "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg")}
      ${formatActivity("Snowboarding", "https://asomammoth.com/wp-content/uploads/2022/12/Freestyle-Snowboarding.jpg")}
      ${formatActivity("Building a Snowman", "https://wyattdowling.ca/get/files/image/galleries/Snowman_Blog_Image_1200x630.jpg")}
    </ul>`;
  } else {
    // Indoor activities if outdoor conditions are not favorable
    isIndoorActivity = true;
    suggestions += `<ul>
      ${formatActivity("Indoor Yoga", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPf5QsP8ebiRt44OIluNwYO-vE0opaZnFX8w&s")}
      ${formatActivity("Cooking or Baking", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptBpGlpyNrLY0We9dGsEUwr3kbNcO6x3vow&s")}
      ${formatActivity("Art and Craft", "https://eurogiant.ie/cdn/shop/articles/making-art-fun-for-kids-creative-art-craft-ideas-you-can-do-at-home-546203_1024x1024.jpg?v=1707404240")}
      ${formatActivity("Reading", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9A1i0My2iVHy6zIlCXQVKXMrMApGSylYDg&s")}
    </ul>`;

    // Reasons for suggesting indoor activities
    reasons += `<ul>`;
    reasons += `<li>Stay dry and keep fit with a yoga session indoors; it helps relieve stress and improves flexibility.</li>`;
    reasons += `<li>Rainy weather is perfect for experimenting with new recipes; you can enjoy the warmth and aroma of homemade meals.</li>`;
    reasons += `<li>Try painting, drawing, or making crafts for a productive day indoors; it's a great way to express creativity.</li>`;
    reasons += `<li>Curl up with a book and enjoy a cozy reading day; it’s a wonderful escape into different worlds.</li>`;
    reasons += `</ul>`;
  }

  // Special activity conditions for clear skies or specific temperature conditions
  if (!isIndoorActivity && condition.includes("clear")) {
    suggestions += `<ul>
      ${formatActivity("Star Gazing", "https://example.com/star-gazing.jpg")} <!-- Placeholder image URL -->
    </ul>`;
  } else if (!isIndoorActivity && temp <= 5 && condition.includes("cloudy")) {
    suggestions += `<ul>
      ${formatActivity("Hot Drinks and Board Games", "https://example.com/board-games.jpg")} <!-- Placeholder image URL -->
    </ul>`;
  }

  // Display the activity suggestions, including reasons if the activities are indoor
  document.getElementById('activity-suggestions').innerHTML = isIndoorActivity
    ? `${suggestions}<h4>Reasons:</h4>${reasons}` // Show reasons for indoor activities
    : suggestions; // Otherwise, just show activities
}
