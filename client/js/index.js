const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginForm = document.querySelector('.log-in-form');
const loginContainer = document.querySelector('.log-in-container');
const appContainer = document.querySelector('.app-container');


// functions

function handleLogin(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(loginForm));
    console.log(data);
    axios.post(`/api/sessions`, {
        params: {username: data.username, password: data.password}
    }).then(res => {
        console.log(res)
        if (res.data.authenticated) {
            handleLoggedIn();
        }
    })
}

function handleLoggedIn(e) {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'grid';
}

// event listeners

loginForm.addEventListener('submit', handleLogin);

// axios requests on '/' static load


axios.get('/api/sessions').then(res => {
    console.log(res.data)
    if (res.data.authenticated) {
        handleLoggedIn();
    }
})

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
