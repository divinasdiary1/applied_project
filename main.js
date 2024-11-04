// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPpkncRU9e32CsXmZFWgFLGY4RfnYjj7o",
    authDomain: "musicrecommendationsyste-59a49.firebaseapp.com",
    projectId: "musicrecommendationsyste-59a49",
    storageBucket: "musicrecommendationsyste-59a49.firebasestorage.app",
    messagingSenderId: "361167705666",
    appId: "1:361167705666:web:6f04fd86a1d5f2bc7dffdb",
    measurementId: "G-WEDY7H8GQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('createAccountForm').classList.add('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('createAccountBtn').addEventListener('click', function() {
    document.getElementById('createAccountForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('guestBtn').addEventListener('click', function() {
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('search').classList.remove('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('submitLogin').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple client-side validation
    if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Login successful!');
                showMainInterface();
            })
            .catch(error => {
                alert(error.message); // Show error message
            });
    } else {
        alert('Please enter both email and password.');
    }
});

document.getElementById('submitCreateAccount').addEventListener('click', function() {
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;

    // Simple client-side validation
    if (email && password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Account created successfully!');
                showMainInterface();
            })
            .catch(error => {
                alert(error.message); // Show error message
            });
    } else {
        alert('Please enter both email and password.');
    }
});

function showMainInterface() {
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('search').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('createAccountForm').classList.add('hidden');
    document.getElementById('auth').classList.add('hidden');
}

document.getElementById('quiz').querySelector('button').addEventListener('click', function() {
    document.getElementById('quizForm').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
});

document.getElementById('submitQuiz').addEventListener('click', function() {
    const favoriteArtist = document.getElementById('favoriteArtist').value;
    const favoriteGenre = document.getElementById('favoriteGenre').value;
    const lastArtist = document.getElementById('lastArtist').value;

    if (favoriteArtist && favoriteGenre && lastArtist) {
        const recommendedSongs = recommendSongs(favoriteArtist, favoriteGenre, lastArtist);
        displayRecommendations(recommendedSongs);
        document.getElementById('quizForm').classList.add('hidden');
    } else {
        alert('Please answer all the questions.');
    }
});

function recommendSongs(artist, genre, lastArtist) {
    const songs = [
        { title: "Song 1", artist: "Artist A", genre: "Genre A" },
        { title: "Song 2", artist: "Artist B", genre: "Genre B" },
        { title: "Song 3", artist: "Artist C", genre: "Genre C" },
        { title: "Song 4", artist: "Artist D", genre: "Genre D" },
    ];

    return songs.filter(song => 
        song.artist.toLowerCase().includes(artist.toLowerCase()) || 
        song.genre.toLowerCase().includes(genre.toLowerCase()) ||
        song.artist.toLowerCase().includes(lastArtist.toLowerCase())
    );
}

document.getElementById('goToSearchButton').addEventListener('click', function() {
    document.getElementById('search').classList.remove('hidden');
});

function displayRecommendations(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';

    songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.title} by ${song.artist} [${song.genre}]`;
        songList.appendChild(li);
    });

    document.getElementById('recommendations').classList.remove('hidden');
}
