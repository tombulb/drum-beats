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
const audioPlayer = document.querySelector('.audio-player')
const playerTrackTitle = document.querySelector('.player-track-title')

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

axios.get('/api/sessions').then(res => {
    console.log(res.data)
    if (res.data.authenticated) {
        handleLoggedIn();
    }
})



function refreshTracks(e) {
  feedSection.innerHTML = '';
  userTracksSection.innerHTML = '';
  getTracks()
}

function refreshGenreTracks(e) {
  feedSection.innerHTML = '';
  getGenreTracks(e);
}

function getGenreTracks(e) {
  let genre = e.target.classList[1];
  let includeUserTracks = false;
  if (genre == 'all') {
    getTracks();
  } else {
    axios
    .get(`/api/tracks/${genre}`)
    .then(res => {
      let dbTracks = res.data
      getSQLTracks(dbTracks, includeUserTracks);
    })
  }
}

function getTracks() {
    axios.get('/api/tracks').then(res => {
        let dbTracks = res.data
        let includeUserTracks = true
        getSQLTracks(dbTracks, includeUserTracks)
    })
}

function getSQLTracks(dbTracks, includeUserTracks) {
  dbTracks.forEach((track) => {

    const trackFig = document.createElement('figure')
    trackFig.setAttribute('class', 'track-figure')

    const trackTitle = document.createElement('figcaption')
    trackTitle.textContent = `${track.track_name} by ${track.user_name}`
    
    const trackDiv = document.createElement('div')
    trackDiv.setAttribute('class', 'track-div')

    const playBtnDiv = document.createElement('div')
    const playBtn = document.createElement('button')
    playBtn.setAttribute('value', track.cloudinary_url)
    playBtn.setAttribute('class', 'play-btn')
    playBtnDiv.setAttribute('class', 'play-btn-div')
    playBtnDiv.appendChild(playBtn)
    
    const waveFormImg = track.waveform_image
    
    trackDiv.appendChild(playBtnDiv)
    trackDiv.innerHTML += waveFormImg
    trackFig.appendChild(trackTitle);
    trackFig.appendChild(trackDiv)
    feedSection.appendChild(trackFig);
    trackFig.addEventListener('click', playFeedTrack)

    if (track.author_id === 1 && includeUserTracks) {

      const trackConsoleFig = document.createElement('figure')
      trackConsoleFig.classList.add('user-track-figure')
      const trackTitle = document.createElement('figcaption')
      trackTitle.textContent = `${track.track_name}`
      const trackDiv = document.createElement('div')
      trackDiv.setAttribute('class', 'track-div user-track-div')
      
      const userPlayBtnDiv = document.createElement('div') 
      const userPlayBtn = document.createElement('button')
      userPlayBtn.setAttribute('class', 'user-play-btn')
      userPlayBtn.setAttribute('value', track.cloudinary_url)
      userPlayBtnDiv.setAttribute('class', 'user-play-btn-div')
      userPlayBtnDiv.appendChild(playBtn)
      trackConsoleFig.addEventListener('click', playUserTrack)
      
      
      const optionDiv = document.createElement('div')
      const optionBtn = document.createElement('img')
      optionBtn.setAttribute('src', 'images/gear-button-white.png')
      optionDiv.setAttribute('class', `option-div ${track.id}`)
      optionBtn.setAttribute('class', `option-btn ${track.id}`)
      optionDiv.appendChild(optionBtn)
      
      optionBtn.addEventListener('click', handleOptions)
      
      trackDiv.appendChild(trackTitle)
      trackConsoleFig.appendChild(userPlayBtnDiv);
      trackConsoleFig.appendChild(trackDiv);
      trackConsoleFig.appendChild(optionDiv)

      userTracksSection.appendChild(trackConsoleFig)
      consoleSection.appendChild(userTracksSection)
    }
  })
}

getTracks();

function clearForm(formElement) {
  formElement.reset();
}

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

  feedSection.innerHTML = '';

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

function playFeedTrack(e) {
  if(e.target.value) {
    changePlayColor()
    playerTrackTitle.innerText = e.path[3].innerText;

    e.target.style.borderColor = "transparent transparent transparent rgb(233, 68, 27)";
    audioPlayer.setAttribute('src', e.target.value);
  }
}

function playUserTrack(e) {
  if(e.target.value) {
    changePlayColor()
    playerTrackTitle.innerText = e.path[2].innerText;
    e.target.style.borderColor = "transparent transparent transparent rgb(233, 68, 27)";
    audioPlayer.setAttribute('src', e.target.value);
  }
}

function changePlayColor() {
  document.querySelectorAll('.play-btn').forEach(track => {
    track.style.borderColor = "transparent transparent transparent white"; 
  })
}

function mouseLeaveTag(e) {
  e.target.style.backgroundColor = "white"
  e.target.style.backgroundColor = "grey"
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

audioPlayer.addEventListener('ended', changePlayColor)