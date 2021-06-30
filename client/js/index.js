const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginForm = document.querySelector('.log-in-form');
const loginContainer = document.querySelector('.log-in-container');
const appContainer = document.querySelector('.app-container');


// functions

let data = {
    username: 'start',
    password: 'start'
}

function handleLogin(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(loginForm));
    console.log(data);
    axios.get(`/api/sessions`,{
        params: {username: data.username, password: data.password}
    }).then(res => {
        if (res.data.login) {
            handleLoggedIn();
        }
    })
}

function handleLoggedIn(e) {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'grid';
}


loginForm.addEventListener('submit', handleLogin);


axios.get('/api/tracks').then(res => {
  
  let dbTracks = res.data
  
  dbTracks.forEach(track => {
    const trackDisplay = document.createElement('figure')

    const trackTitle = document.createElement('figcaption')
    trackTitle.textContent = `Track name: ${track.track_name} by user: ${track.user_id}`

    const audioPlayer = document.createElement('audio')
    audioPlayer.setAttribute('controls', 'true')
    audioPlayer.setAttribute('src', `${track.cloudinary_url}`)

    document.querySelector('.feed-section').appendChild(trackDisplay)
    document.querySelector('figure').appendChild(trackTitle)
    document.querySelector('figure').appendChild(audioPlayer)
  })
})
