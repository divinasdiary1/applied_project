// Importing the functions from the SDKs we need - Divina 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Music Maestro's Firebase configuration - Divina 
const firebaseConfig = {
    apiKey: "AIzaSyDPpkncRU9e32CsXmZFWgFLGY4RfnYjj7o",
    authDomain: "musicrecommendationsyste-59a49.firebaseapp.com",
    projectId: "musicrecommendationsyste-59a49",
    storageBucket: "musicrecommendationsyste-59a49.firebasestorage.app",
    messagingSenderId: "361167705666",
    appId: "1:361167705666:web:6f04fd86a1d5f2bc7dffdb",
    measurementId: "G-WEDY7H8GQ5"
};

// Initialize Firebase - Divina
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

    // Simple client-side validation using Firebase - Divina 
    if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Login successful!');
                showMainInterface();
            })
            .catch(error => {
                alert(error.message); // Showing error message - Divina
            });
    } else {
        alert('Please enter both email and password.');
    }
});

document.getElementById('submitCreateAccount').addEventListener('click', function() {
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;

    // Simple client-side validation - Divina
    if (email && password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('Account created successfully!');
                showMainInterface();
            })
            .catch(error => {
                alert(error.message); // Showing error message - Divina 
            });
    } else {
        alert('Please enter both email and password.');
    }
});
// Creating event listeners for Take Quiz, Search function, LoginForm, Create account Form - Divina
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
// Not showing the search button - Divina
document.getElementById('goToSearchButton').addEventListener('click', function() {
    document.getElementById('search').classList.remove('hidden');
});
/* Display recommendation songs - Jaspinder 
function displayRecommendations(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';

    songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.title} by ${song.artist} [${song.genre}]`;
        songList.appendChild(li);
    });

    document.getElementById('recommendations').classList.remove('hidden');
}*/
 // Handle quiz submission and display recommendations
 quizForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    const favoriteArtist = document.getElementById('favoriteArtist').value;
    const favoriteGenre = document.getElementById('favoriteGenre').value;
    const lastArtist = document.getElementById('lastArtist').value;

    // Check for empty fields and show an error
    if (!favoriteArtist || !favoriteGenre || !lastArtist) {
        alert('Please answer all the questions.');
        return; // Stop execution if any field is empty
    }

    // Show loading spinner and hide previous content
    loadingDiv.classList.remove('hidden');
    recommendationsDiv.classList.add('hidden');
    noResultsDiv.classList.add('hidden');

    // Proceed if inputs are valid
    recommendSongs(favoriteArtist, favoriteGenre, lastArtist)
        .then(recommendedSongs => {
            displayRecommendations(recommendedSongs);
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
            alert('An error occurred while fetching recommendations.');
            loadingDiv.classList.add('hidden');
        });
});

// Recommendation logic (updated to fetch from Firestore)
async function recommendSongs(artist, genre, lastArtist) {
console.log('Running recommendSongs with inputs:', artist, genre, lastArtist);

// Fetch songs from Firestore
const songsRef = collection(db, 'songs');
const snapshot = await getDocs(songsRef);

if (snapshot.empty) {
    console.log("No songs found in Firestore.");
    return [];
}

// Process songs from Firestore
const songs = snapshot.docs.map(doc => doc.data());
console.log('Available Songs from Firestore:', songs);

// Filter songs based on user inputs
const filteredSongs = songs.filter(song => 
    song.artist.toLowerCase().includes(artist.toLowerCase()) || 
    song.genre.toLowerCase().includes(genre.toLowerCase())
);

console.log('Filtered Songs:', filteredSongs);
return filteredSongs;
}

// Function to display the recommended songs
function displayRecommendations(songs) {
const recommendationsDiv = document.getElementById('recommendations');
const noResultsDiv = document.getElementById('noResults');
const loadingDiv = document.getElementById('loading');  // Hide loading spinner

// Clear previous recommendations and hide the no results div
recommendationsDiv.innerHTML = ''; // Clear previous recommendations
noResultsDiv.classList.add('hidden'); // Hide no results message
loadingDiv.classList.add('hidden');  // Hide loading spinner

// Log the songs being displayed
console.log('Songs to display:', songs);

if (songs.length > 0) {
    // Remove duplicates based on song title
    const uniqueSongs = Array.from(new Set(songs.map(a => a.title))).map(title => {
        return songs.find(a => a.title === title);
    });

    // Display recommendations
    uniqueSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `<strong>${song.title}</strong> by ${song.artist} - Genre: ${song.genre}`;
        recommendationsDiv.appendChild(songElement);
    });

    recommendationsDiv.classList.remove('hidden'); // Show recommendations section
    console.log('Recommendations displayed.');
} else {
    // Show "no results" message
    noResultsDiv.classList.remove('hidden');
    console.log('No results found. Displaying noResults message.');
}
}
