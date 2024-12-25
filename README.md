<div align="center">
  <h1>MOVIEBUZZ 🎥 </h1>
  <h2>
    <a href="https://movie-buzz-six.vercel.app/">VISIT THE WEBSITE</a>
  </h2>
</div>


<h2 align="center">API NOT WORKING PROPERLY</h2>

This project is a React-based application designed to display detailed information about movies. It includes features such as viewing movie details, recommendations, similar movies, watch providers, and more.

## Table of Contents 📑

- Overview
- Demo
- Features
- Tech Stack
- API Information

## Overview 📝

The MovieBuzz Project is a frontend development project that aims to provide users with detailed information about movies, including features such as viewing movie details, recommendations, similar movies, watch providers, and more.

## Demo 🚀

Check out the live demo of the Refokus Project Clone Website: [Live Demo](https://movie-buzz-six.vercel.app/)

# Reference Images 

<img width="1057" alt="image" src="https://github.com/user-attachments/assets/eeee8141-9ba8-443d-9aef-409ae585acba">


## Features

- View movie details including title, overview, release date, and user score.
- Access movie recommendations and similar movies.
- Check where the movie is available for streaming, renting, or buying.
- Watch movie trailers.
- Display translated titles.

## Tech Stack

- **React** for building the user interface
- **Redux** for state management
- **Axios** for making API calls
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Icons** for including icons
- **Framer Motion** for animations

## API Information

The application fetches movie data from an external API. The following endpoints are used:

- `/movie/:id` - Fetches details of a movie.
- `/movie/:id/external_ids` - Retrieves external IDs for a movie.
- `/movie/:id/recommendations` - Fetches movie recommendations.
- `/movie/:id/similar` - Retrieves similar movies.
- `/movie/:id/translations` - Gets translated titles.
- `/movie/:id/videos` - Fetches movie videos (e.g., trailers).
- `/movie/:id/watch/providers` - Provides information on where the movie can be watched, rented, or bought.
