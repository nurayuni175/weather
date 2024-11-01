// Function to update homepage weather data for New York by default
window.onload = async function () {
  try {
      // Fetch weather data for New York from the Weather API
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=New York`);
      
      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
          throw new Error("Failed to fetch weather data");
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Extract key information from the data
      const location = data.location; // Get location details
      const forecast = data.forecast.forecastday[0]; // Get the forecast for the first day
      const current = data.current; // Get current weather details

      // Update the DOM elements with the fetched weather data
      document.getElementById('city-name').textContent = location.name; // Display the city name
      document.getElementById('temperature').textContent = `${current.temp_c}°C`; // Display the current temperature

      // Format the local time and display it
      const localTime = new Date(location.localtime); // Create a Date object from the local time string
      const timeFormatted = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the time
      document.getElementById('time').textContent = timeFormatted; // Display the formatted time

      // Format the date and display it
      const dateFormatted = localTime.toLocaleDateString(undefined, {
          weekday: 'long', // Full name of the weekday
          day: 'numeric', // Numeric day of the month
          month: 'long', // Full name of the month
          year: 'numeric' // Numeric year
      });
      document.getElementById('date').textContent = dateFormatted; // Display the formatted date
  } catch (error) {
      // Log any errors that occur during the fetch or processing
      console.error("Error fetching weather data:", error);
  }
};

// Function to redirect to weather.html with country and current date parameters
function goToWeatherPage() {
  const country = document.getElementById('country-input').value.trim(); // Get the user input for country
  const date = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  // Check if a country was provided by the user
  if (country) {
      // Redirect to weather.html with query parameters for country and date
      window.location.href = `weather.html?country=${encodeURIComponent(country)}&date=${encodeURIComponent(date)}`;
  } else {
      // Alert the user if no country is entered
      alert("Please enter a country.");
  }
}

// Allow pressing 'Enter' key to trigger the search
document.getElementById('country-input').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
      goToWeatherPage(); // Call the function to redirect when 'Enter' is pressed
  }
});
