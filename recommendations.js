// Asynchronous function to fetch weather data based on user input
async function fetchWeatherData() {
    const country = document.getElementById('country-input').value; // Get the input value from the country input field
    const apiKey = '32804b24a847407391c53709241010'; // API key for weather data
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=1`; // Construct API URL with parameters

    try {
        const response = await fetch(apiUrl); // Fetch data from the weather API
        if (!response.ok) { // Check if the response is not okay (e.g., 404 or 500)
            throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error with the response status
        }
        const data = await response.json(); // Parse the response data as JSON

        // Check if data was fetched correctly
        if (data && data.current && data.location) {
            displayRecommendations(data); // Call function to display recommendations
        } else {
            console.error("Incomplete data received from API", data); // Log error for debugging
            document.getElementById('recommendations').innerHTML = `<p>Error: Could not retrieve complete weather data for "${country}". Please try again.</p>`; // Show error message to user
        }
    } catch (error) {
        console.error("Error fetching weather data:", error); // Log error for debugging
        document.getElementById('recommendations').innerHTML = `<p>Error fetching data. Please try again later.</p>`; // Show error message to user
    }
}

// Function to display activity recommendations based on weather data
function displayRecommendations(data) {
    const recommendationsDiv = document.getElementById('recommendations'); // Get the recommendations div element
    recommendationsDiv.innerHTML = ''; // Clear previous recommendations

    const currentCondition = data.current.condition.text.toLowerCase(); // Get current weather condition in lowercase
    const country = data.location.country.toLowerCase(); // Get the country name in lowercase
    let outdoorActivities = []; // Initialize outdoor activities array
    let indoorActivities = []; // Initialize indoor activities array

    // Weather-specific and country-based activity suggestions
    if (currentCondition.includes('rain') || currentCondition.includes('snow')) { // Check for rain or snow
        if (country.includes('japan')) { // Suggestions for Japan
            indoorActivities = [
                'Visit an onsen (hot spring)',
                'Try a tea ceremony',
                'Explore local museums',
                'Shop at a Japanese mall'
            ];
        } else if (country.includes('france')) { // Suggestions for France
            indoorActivities = [
                'Visit the Louvre Museum',
                'Enjoy coffee in a Parisian café',
                'Explore French art galleries',
                'Tour a historic French château'
            ];
        } else if (country.includes('usa')) { // Suggestions for the USA
            indoorActivities = [
                'Visit an indoor amusement park',
                'Watch a movie at a theater',
                'Explore a local museum',
                'Check out an art exhibit'
            ];
        } else { // Default indoor activities for other countries
            indoorActivities = [
                'Read a book at a cozy café',
                'Visit a local museum',
                'Try a new indoor hobby like pottery',
                'Check out a nearby gallery'
            ];
        }
    } else if (currentCondition.includes('sunny') || currentCondition.includes('clear')) { // Check for sunny or clear weather
        if (country.includes('australia')) { // Suggestions for Australia
            outdoorActivities = [
                'Go surfing at Bondi Beach',
                'Take a coastal walk',
                'Explore the Great Barrier Reef',
                'Have a beachside picnic'
            ];
        } else if (country.includes('canada')) { // Suggestions for Canada
            outdoorActivities = [
                'Hike in Banff National Park',
                'Visit Niagara Falls',
                'Explore scenic trails',
                'Enjoy a lake canoe ride'
            ];
        } else if (country.includes('italy')) { // Suggestions for Italy
            outdoorActivities = [
                'Visit the Colosseum',
                'Enjoy a gondola ride in Venice',
                'Walk around historic Florence',
                'Tour Italian vineyards'
            ];
        } else { // Default outdoor activities for other countries
            outdoorActivities = [
                'Take a nature walk or hike',
                'Visit a nearby beach or park',
                'Have a picnic in the sun',
                'Try an outdoor sport like cycling'
            ];
        }
    } else { // Suggestions for other weather conditions
        if (country.includes('brazil')) { // Suggestions for Brazil
            outdoorActivities = [
                'Explore Copacabana Beach',
                'Visit Christ the Redeemer',
                'Stroll through Tijuca Forest National Park'
            ];
            indoorActivities = [
                'Enjoy live samba music at a local bar',
                'Visit a Brazilian art museum',
                'Try a Brazilian cooking class'
            ];
        } else if (country.includes('india')) { // Suggestions for India
            outdoorActivities = [
                'Visit the Taj Mahal',
                'Explore bustling markets',
                'Take a rickshaw tour through old city streets'
            ];
            indoorActivities = [
                'Try a traditional cooking class',
                'Visit a heritage museum',
                'Attend a local art exhibit'
            ];
        } else { // Default activities for other countries
            outdoorActivities = [
                'Take a city tour',
                'Explore nearby neighborhoods',
                'Visit a botanical garden'
            ];
            indoorActivities = [
                'Check out local art galleries',
                'Explore a historic museum',
                'Relax at a café'
            ];
        }
    }

    // Render the lists on the page
    recommendationsDiv.innerHTML = `
        <h3>Outdoor Activities:</h3>
        <ul>${outdoorActivities.map(activity => `<li>${activity}</li>`).join('')}</ul> <!-- List outdoor activities -->
        <h3>Indoor Activities:</h3>
        <ul>${indoorActivities.map(activity => `<li>${activity}</li>`).join('')}</ul> <!-- List indoor activities -->
    `;
}
