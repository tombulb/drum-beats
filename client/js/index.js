const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginForm = document.querySelector('.log-in-form');
const loginContainer = document.querySelector('.log-in-container');
const appContainer = document.querySelector('.app-container');
const uploadForm = document.querySelector('.upload-form');
const uploadInput = document.querySelector('.upload-input')


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
handleLoggedIn()
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


function handleUpload(e) {
  e.preventDefault()
  debugger
  var files = uploadInput.files;
  var file = files[0];
  var reqCon = "request sent"
  var formData = new FormData();
  
  // formData.append('file', file);
  formData.append('con', reqCon)
  // debugger

  axios({
    method: "post",
    url: "/api/tracks",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log('response');
    })
    .catch(function () {
      //handle error
      console.log('it didnt work');
    });
    // debugger
}

uploadForm.addEventListener('submit', handleUpload);
