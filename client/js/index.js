const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginForm = document.querySelector('.log-in-form');
const loginContainer = document.querySelector('.log-in-container');
const appContainer = document.querySelector('.app-container');
const uploadForm = document.querySelector('.upload-form');
const uploadInput = document.querySelector('.upload-input');
const uploadGenreInput = document.querySelector('.genre-upload-input');
const uploadTitleInput = document.querySelector('.title-upload-input');
const feedSection = document.querySelector('.feed-section');
const editForm = document.querySelector('.edit-form');
const editTitleInput = document.querySelector('.title-edit-input');
const editGenreInput = document.querySelector('.genre-edit-input');
const consoleSection = document.querySelector('.console-section');
const updateBtn = document.querySelector('.update-btn');
const userTracksSection = document.querySelector('.user-tracks-section');
const deleteBtn = document.querySelector('.delete-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const openUploadBtn = document.querySelector('.open-upload-btn');
const closeUploadBtn = document.querySelector('.close-upload-btn');
const closeEditBtn = document.querySelector('.close-edit-btn')
const loadingDisplay = document.querySelector('.loading-display')

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

// handleLoggedIn()



// axios requests on '/' static load

axios.get('/api/sessions').then(res => {
    console.log(res.data)
    if (res.data.authenticated) {
        handleLoggedIn();
    }
})

function getTracks() {
    axios.get('/api/tracks').then(res => {
        console.log(res.data)
        let dbTracks = res.data

        let includeUserTracks = true;

        getSQLTracks(dbTracks, includeUserTracks)
    })
}


function refreshTracks() {
    feedSection.innerHTML = '';
    userTracksSection.innerHTML = '';
    getTracks()
}

function getGenreTracks(e) {
  let genre = e.target.classList[1];
  let includeUserTracks = false;
  if (genre == 'all') {
    getTracks();
  } else {
    axios
        .get(`/api/tracks/genre/${genre}`)
        .then(res => {
            console.log(res.data)
            let dbTracks = res.data
            getSQLTracks(dbTracks, includeUserTracks);
      })
  }
}


function getSQLTracks(dbTracks, includeUserTracks) {
  dbTracks.forEach((track) => {
    const trackFig = document.createElement('figure')
    const trackTitle = document.createElement('figcaption')
    trackTitle.textContent = `Track name: ${track.track_name} by ${track.user_name}`
    const trackDiv = document.createElement('div')
    trackDiv.setAttribute('class', 'track-div')
    trackFig.setAttribute('class', 'track-figure')

    const audioPlayer = document.createElement('audio')
    audioPlayer.classList.add('audio-player')
    audioPlayer.setAttribute('controls', 'true')
    audioPlayer.setAttribute('controlsList', 'nodownload')
    audioPlayer.setAttribute('src', `${track.cloudinary_url}`)
    
    trackFig.appendChild(trackTitle);
    trackFig.appendChild(trackDiv);
    trackDiv.appendChild(audioPlayer);
    feedSection.appendChild(trackFig);

    if (track.author_id === 1 && includeUserTracks) {

      const trackConsoleFig = document.createElement('figure')
      const trackTitle = document.createElement('figcaption')
      trackTitle.textContent = `Track name: ${track.track_name}`
      const trackDiv = document.createElement('div')
      trackDiv.setAttribute('class', 'track-div user-track-div')

      const audioPlayer = document.createElement('audio')
      audioPlayer.classList.add('audio-player')
      audioPlayer.setAttribute('controls', 'true')
      audioPlayer.setAttribute('controlsList', 'nodownload')
      audioPlayer.setAttribute('src', `${track.cloudinary_url}`)
      
      trackConsoleFig.appendChild(trackDiv);
      trackDiv.appendChild(trackTitle);
      trackDiv.appendChild(audioPlayer);

      const optionDiv = document.createElement('div')
      const optionBtn = document.createElement('img')
      optionBtn.setAttribute('src', 'images/gear-button.png')
      optionDiv.setAttribute('class', `option-div ${track.id}`)
      optionBtn.setAttribute('class', `option-btn ${track.id}`)
      optionDiv.appendChild(optionBtn)
      trackConsoleFig.appendChild(optionDiv)

      optionBtn.addEventListener('click', handleOptions)

      trackConsoleFig.classList.add('user-track-figure')
      userTracksSection.appendChild(trackConsoleFig)
      consoleSection.appendChild(userTracksSection)
    }
  })
}

function refreshGenreTracks(e) {
    feedSection.innerHTML = '';
    getGenreTracks(e);
}

function clearForm(formElement) {
  formElement.reset();
}

getTracks();

function handleUpload(e) {
  e.preventDefault()
  closeUploadForm()
  loadingDisplay.style.display = "flex"
  var files = uploadInput.files;
  var file = files[0];

  var formData = new FormData();
  formData.append('track', file)
  formData.append('title', uploadTitleInput.value)
  formData.append('genre', uploadGenreInput.selectedOptions[0].textContent)


  // PRELOADER GIF
  feedSection.innerHTML = '';
  // const loadingText = document.createElement('h2');
  // loadingText.textContent = 'Loading...';
  // const preloader = document.createElement('img');
  // preloader.src = '/images/wheel.gif'
  // preloader.classList.add('preloader');
  // feedSection.append(preloader);
  // feedSection.append(loadingText);

  axios({
    method: "post",
    url: "/api/tracks",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(response => {
      loadingDisplay.style.display = "none"
      clearForm(uploadForm);  
      if (response.data.upload) {
        refreshTracks();  
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function handleEdit(e) {
  e.preventDefault()
  closeEditForm()
  let updatedTrackInfo = {
    trackName: editTitleInput.value,
    trackGenre: editGenreInput.selectedOptions[0].textContent
  }
  console.log(updatedTrackInfo);

  axios({
    method: "put",
    url: `/api/tracks/${updateBtn.id}`,
    data: updatedTrackInfo
  })
  .then(response => {
    if (response.data.updated) {
      refreshTracks();
    }
  })
  .catch(err => {
    console.log(err);
  })
}

function handleDelete(e) {
  e.preventDefault()
  closeEditForm()

  axios.delete(`/api/tracks/${deleteBtn.id}`)
  .then(response => {
    if (response.data.deleted) {
      console.log("deleted");
      refreshTracks();
      editTitleInput.value = ''
      editGenreInput.selectedOptions[0].textContent = ''
    }
  })
  .catch(err => {
    console.log(err);
  })
}

function handleOptions(e) {
  e.preventDefault()
  openEditForm()
  trackID = e.target.classList[1]
  updateBtn.setAttribute('id', e.target.classList[1])
  deleteBtn.setAttribute('id', e.target.classList[1])

  axios({
    method: "get",
    url: `/api/tracks/${e.target.classList[1]}`,
  })
  .then(response => {
    console.log(response);
    editTitleInput.value = response.data[0].track_name
    editGenreInput.selectedOptions[0].textContent = response.data[0].genres
  })

}

function openUploadForm() {
  closeEditForm()
  document.querySelector('.upload-menu').style.marginLeft = '0';
  document.querySelector('.app-container').style.marginLeft = '250px';
}

function closeUploadForm() {
  document.querySelector('.upload-menu').style.marginLeft = '-250px';
  document.querySelector('.app-container').style.marginLeft = '0';
}

function openEditForm() {
  closeUploadForm()
  document.querySelector('.edit-menu').style.marginLeft = '0';
  document.querySelector('.app-container').style.marginLeft = '250px';
}

function closeEditForm() {
  document.querySelector('.edit-menu').style.marginLeft = '-250px';
  document.querySelector('.app-container').style.marginLeft = '0';
  document.querySelector('.loading-display').style.marginLeft = '0';
}



// event listeners

loginForm.addEventListener('submit', handleLogin);
uploadForm.addEventListener('submit', handleUpload);
deleteBtn.addEventListener('click', handleDelete);

editForm.addEventListener('submit', handleEdit);

filterBtns.forEach(filterBtn => {
  filterBtn.addEventListener('click', refreshGenreTracks)
})

openUploadBtn.addEventListener('click', openUploadForm)
closeUploadBtn.addEventListener('click', closeUploadForm)

// option button event listener to open menu is in getSQLtracks function, where we create the user tracks.
closeEditBtn.addEventListener('click', closeEditForm)
