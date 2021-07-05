# BeatsByDrums

## Technologies
- Node JS - for processing
- Express JS - for routing
- PostgreSQL - for CRUD Database Operations
- Axios - for making AJAX HTTP requests
- Cloudinary - for storing and retrieving media (songs and waveform images) from the cloud
- Formidable - for parsing Form data with file uploads
- CSS - for styling
- Heroku - for website deployment

## User Stories
- Users can login on the login page.
- Users can upload songs with any one of 7 supported audio file-types.
- Users can view and play all their uploaded songs in the Console Section on the left.
- Users can edit all their songs, also in the Console Section.
- Users can view and play songs uploaded by all other users in their social Feed Section
- Users can filter their feed by Genre, by clicking one of eight genre buttons.
- When users play a song, it plays on the main player at the footer of the webpage.
- When a user is playing a song, and begins playing another song, the new song is played instead of the song previously chosen.
- The Social Feed is sorted by most recent uploads, or equivalently, by descending order of track_id
- Users can download tracks to their device with the download button on the main player.

## Layout
Going from top-to-bottom, left-to-right:
- The header displays the logo
- The main element is divided into the Console Section (left) and the Feed Section (right)
- The Console Section displays the User Name, the User's profile picture, and the list of scrollable tracks that the user has uploaded, with edit and play buttons on each track.
- The Feed Section displays tracks uploaded sorted by Most Recent first, and displays the waveform image for each track.
- There are 9 genre buttons at the top of the Feed Section that filter the feed for that particular genre, including an 'All' button that removes all filters.
- Finally, the main player is at the bottom of the page on the footer. All tracks are played on this player, displaying the track name on top of the player.
