Weather information using API

API being used: openweathermap.org

The url and the apikey have been used from the above website.

The project allows you to enter a city name and retrieve the city's name, temperature and description of the weather.
Code is not built to run on server, use localhost to run it.
API key needs to be created and linked in the script.js file.

IF THE API KEY IS IN A .env FILE: Vite needs to be installed in the parent folder, as process.env.MY_SECRET_API_KEY will not work for browser even if it works for node environment.
