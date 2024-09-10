<h1 align="center">MovieBuzz WebApp</h1>
<h2 align="center">API NOT WORKING PROPERLY</h2>


This project is a React-based application designed to display detailed information about movies. It includes features such as viewing movie details, recommendations, similar movies, watch providers, and more.

## Features

- View movie details including title, overview, release date, and user score.
- Access movie recommendations and similar movies.
- Check where the movie is available for streaming, renting, or buying.
- Watch movie trailers.
- Display translated titles.

## Technologies Used

- React
- Redux (for state management)
- Axios (for API calls)
- Tailwind CSS (for styling)

## Installation

1. **Clone the Repository**

   ```git clone https://github.com/Neel-07/MovieBuzz.git```
   ```cd moviebuzz```

2. **Install Dependencies**   

   Make sure you have Node.js installed. Then, install the project dependencies:
   ```npm install```

3. **Configure Axios**
    Ensure that your axios configuration in src/utils/axios.js does not include an API key if not required. Adjust the base URL and other settings as needed.

4. **Set Up Environment Variables**
     Create a .env file in the root directory if you need to include environment variables. 
     For example:REACT_APP_API_BASE_URL=https://api.example.com


## API Information

The application fetches movie data from an external API. The following endpoints are used:

- `/movie/:id` - Fetches details of a movie.
- `/movie/:id/external_ids` - Retrieves external IDs for a movie.
- `/movie/:id/recommendations` - Fetches movie recommendations.
- `/movie/:id/similar` - Retrieves similar movies.
- `/movie/:id/translations` - Gets translated titles.
- `/movie/:id/videos` - Fetches movie videos (e.g., trailers).
- `/movie/:id/watch/providers` - Provides information on where the movie can be watched, rented, or bought.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Acknowledgements
React - The JavaScript library used for building user interfaces.
Redux - A predictable state container for JavaScript apps.
Axios - Promise-based HTTP client for the browser and Node.js.
Tailwind CSS - A utility-first CSS framework.
