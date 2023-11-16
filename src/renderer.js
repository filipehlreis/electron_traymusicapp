const $ = require('jquery');
const mm = require('music-metadata');
let songData = { path: [], title: [] };
let audioPlayer = $('audio').get(0);
let playing = false;
let currentIndex = 0;
let timer = null;

const addButton = document.getElementById('add_button');
const clearButton = document.getElementById('clear_button');
const playButton = document.getElementById('play_button');
const forwardButton = document.getElementById('forward_button');
const backwardButton = document.getElementById('backward_button');

addButton.addEventListener('click', () => {
  console.log('choose music');
  // $('input').trigger('click');
  $('#input_file').trigger('click');
});

function convertDurationFormat(number) {
  return `${padZero(parseInt((number / 60) % 60))}:${padZero(
    parseInt(number % 60),
  )}`;
}

function padZero(value) {
  return value < 10 ? '0' + value : value;
}

function musicSelected() {
  let files = $('input').get(0).files;

  console.log(files);

  for (let i = 0; i < files.length; i++) {
    let { path } = files[i];
    mm.parseFile(path, { native: true }).then((metadata) => {
      songData.path[i] = path;
      songData.title[i] = metadata.common.title;

      console.log(metadata.common.title);
      console.log(metadata.format.duration);
      console.log(metadata.common.artist);

      let songRow = `
      <tr ondblclick="playSong(${i})">
        <td>${metadata.common.title}</td>
        <td>${metadata.common.artist}</td>
        <td>${convertDurationFormat(metadata.format.duration)}</td>
      </tr>
      `;

      $('#table-body').append(songRow);
    });
  }
}

function playSong(index) {
  console.log(index);
  console.log(songData.title[index]);
  audioPlayer.src = songData.path[index];
  audioPlayer.load();
  audioPlayer.play();
  playing = true;
  $('h4').text(`${songData.title[index]}`);
  updatePlayButton();
  currentIndex = index;

  timer = setInterval(updateTime, 1000);
}

function play() {
  if (playing) {
    audioPlayer.pause();
    clearInterval(timer);
    playing = false;
  } else {
    audioPlayer.play();
    playing = true;
    timer = setInterval(updateTime, 1000);
  }

  updatePlayButton();
}

function updatePlayButton() {
  let playIcon = $('#play_button span');

  if (playing) {
    playIcon.removeClass('icon-play');
    playIcon.addClass('icon-pause');
  } else {
    playIcon.removeClass('icon-pause');
    playIcon.addClass('icon-play');
  }
}

function playNext() {
  if (songData.path.length) {
    if (currentIndex < songData.path.length - 1) {
      playSong(currentIndex + 1);
    } else {
      playSong(0);
    }
  }
}

function updateTime() {
  $('#time-left').text(convertDurationFormat(audioPlayer.currentTime));
  $('#total-time').text(convertDurationFormat(audioPlayer.duration));
  if (audioPlayer.currentTime >= audioPlayer.duration) {
    playNext();
  }
}

function playPrevious() {
  if (songData.path.length) {
    console.log(currentIndex);
    if (currentIndex > 0) {
      playSong(currentIndex - 1);
    } else {
      playSong(currentIndex);
    }
  }
}

function clearPlaylist() {
  clearInterval(timer);
  $('#time-left').text('00:00');
  $('#total-time').text('00:00');
  $('#table-body').html('');
  audioPlayer.pause();
  audioPlayer.src = '';
  currentIndex = 0;
  playing = false;
  songData = { path: [], title: [] };
  $('h4').text('');
  updatePlayButton();
}

function changeVolume(input) {
  input.value;
  audioPlayer.volume = input.value;
}

clearButton.addEventListener('click', () => {
  console.log('clearButton');
});

playButton.addEventListener('click', () => {
  console.log('playButton');
});

forwardButton.addEventListener('click', () => {
  console.log('forwardButton');
});

backwardButton.addEventListener('click', () => {
  console.log('backwardButton');
});
