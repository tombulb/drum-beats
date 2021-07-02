const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginForm = document.querySelector('.log-in-form');
const loginContainer = document.querySelector('.log-in-container');
const appContainer = document.querySelector('.app-container');
const uploadForm = document.querySelector('.upload-form');
const uploadInput = document.querySelector('.upload-input')
const uploadGenreInput = document.querySelector('.genre-upload-input');
const uploadTitleInput = document.querySelector('.title-upload-input');
const feedSection = document.querySelector('.feed-section');
const editForm = document.querySelector('.edit-form');
const editTitleInput = document.querySelector('.title-edit-input')
const editGenreInput = document.querySelector('.genre-edit-input')

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

function clearTracks() {
    feedSection.innerHTML = '';

}

function getTracks() {
    axios.get('/api/tracks').then(res => {
        console.log(res.data)
        let dbTracks = res.data
  
        dbTracks.forEach(track => {
            const trackDisplay = document.createElement('figure')

            const trackTitle = document.createElement('figcaption')
            trackTitle.textContent = `Track name: ${track.track_name} by user: ${track.user_id}`

            const audioPlayer = document.createElement('audio')
            audioPlayer.setAttribute('controls', 'true')
            audioPlayer.setAttribute('src', `${track.cloudinary_url}`)

            trackDisplay.appendChild(trackTitle);
            trackDisplay.appendChild(audioPlayer);
            document.querySelector('.feed-section').appendChild(trackDisplay)
        })
    })
}

getTracks();

function handleUpload(e) {
  e.preventDefault()
  var files = uploadInput.files;
  var file = files[0];
<<<<<<< HEAD

  var formData = new FormData();
  formData.append('track', file)
  formData.append('title', uploadTitleInput.value)
  formData.append('genre', uploadGenreInput.selectedOptions[0].textContent)
=======
  var formData = new FormData();
  
  // formData.append('file', file);
  formData.append('file', file)
  // debugger
>>>>>>> desk cleared

  axios({
    method: "post",
    url: "/api/tracks",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(response => {
      console.log(response.data.upload)  
      if (response.data.upload) {
        clearTracks();  
        getTracks();
      }
    })
<<<<<<< HEAD
    .catch(err => {
      console.log(err);
=======
    .catch(function (response) {
      //handle error
      console.log(response);
>>>>>>> desk cleared
    });
}

function handleUpdate(e) {
  e.preventDefault()

  let updatedTrackInfo = {
    trackName: editTitleInput.value,
    trackGenre: editGenreInput.selectedOptions[0].textContent
  }

  axios({
    method: "put",
    url: "/api/tracks",
    data: updatedTrackInfo
  })
  .then(response => {
    if (response.data.updated) {
      clearTracks();
      getTracks();
    }
  })
  .catch(err => {
    console.log(err);
  })
}



uploadForm.addEventListener('submit', handleUpload);
editForm.addEventListener('submit', handleUpdate);