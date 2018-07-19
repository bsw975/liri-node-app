# liri-node-app

LIRI is a _Language_ Interpretation and Recognition Interface. It is a command-line application allowing the use of node packages for Twitter and Spotify, direct access to the OMDB for movie information, and using the fs package to read from a local file.

Using the commands 'my-tweets', 'spotify-this-song' [optional:song name], 'movie-this' [optional:movie name], or 'do-what-it-says', the user can perform various searches. The program parses the words, adding clever song/movie names if not included, and uses the node packages to search Twitter's & Spotify's API.