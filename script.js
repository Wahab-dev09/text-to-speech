const synth = window.speechSynthesis;
const textInput = document.getElementById('textInput');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');
const selectedOption = document.getElementById('selectedOption');
const optionsList = document.getElementById('optionsList');
const speakButton = document.getElementById('speakButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const stopButton = document.getElementById('stopButton');
const textElement = document.getElementById('h-type'); 
let voices = [];
let selectedVoice = null;
const textSamples = [
  "Hello Happy you are trying my Text to Speech Project! Thank you let me know your feedback in the comments",
  "Hello Thank you for checking out my project! Stay connected for more interesting Projects! ",
  "Must try different speech rates and pitches! Also Don't forget to support me on LinkedIn! Stay connected for interesting Projects",
  "You're doing awesome in your journey. Keep working hard, reward is on it's way!",
  "Thank you for trying out this fun random text generator!"
];
const randomTextDisplay = document.getElementById('randomTextDisplay');
const generateTextBtn = document.getElementById('generateTextBtn');
const copyTextBtn = document.getElementById('copyTextBtn');

// Load the available voices
function loadVoices() {
    voices = synth.getVoices();
    optionsList.innerHTML = voices.map((voice, index) => 
        `<div class="option" data-index="${index}">${voice.name} (${voice.lang})</div>`
    ).join('');
}

// Update the rate and pitch value display
rate.oninput = () => rateValue.textContent = rate.value;
pitch.oninput = () => pitchValue.textContent = pitch.value;

// Select a voice
optionsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('option')) {
        const index = e.target.getAttribute('data-index');
        selectedVoice = voices[index];
        selectedOption.textContent = selectedVoice.name;
        optionsList.style.display = 'none';
    }
});

selectedOption.addEventListener('click', () => {
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
});

// Function to speak the text
function speak() {
    synth.cancel(); // Ensure no other speech is in progress
    if (synth.speaking) {
        console.error('Speech already in progress.');
        return;
    }
    if (textInput.value !== '') {
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        utterance.voice = selectedVoice || voices[0];
        utterance.rate = rate.value;
        utterance.pitch = pitch.value;

        utterance.onend = () => console.log('Speech ended.');
        utterance.onerror = (e) => console.error('Error during speech: ', e);

        synth.speak(utterance);
    } else {
        alert("Please enter text and select a voice.");
    }
}

// Button controls
speakButton.addEventListener('click', speak);
pauseButton.addEventListener('click', () => {
    if (synth.speaking && !synth.paused) synth.pause();
});
resumeButton.addEventListener('click', () => {
    if (synth.speaking && synth.paused) synth.resume();
});
stopButton.addEventListener('click', () => {
    if (synth.speaking) synth.cancel();
});
generateTextBtn.onclick = () => {
  const randomText = textSamples[Math.floor(Math.random() * textSamples.length)];
  randomTextDisplay.textContent = randomText;
};

// Function to copy text to clipboard
const originalButtonText = "Copy Text";
copyTextBtn.onclick = () => {
  const textToCopy = randomTextDisplay.textContent;
  copyTextBtn.style.backgroundColor = "#488357"
  copyTextBtn.textContent = "Copied";
  navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard!");
        // Revert button text after 0.7 seconds
        setTimeout(() => {
            copyTextBtn.textContent = originalButtonText;
              copyTextBtn.style.backgroundColor = "#496297"
        }, 1500);
    })
      .catch(err => console.error("Could not copy text: ", err));
};

const textToType = "Text to"; // Single string
        let charIndex = 0; 

        function typeWriter() { 
            if (charIndex < textToType.length) { 
                textElement.innerHTML += textToType.charAt(charIndex); 
                charIndex++; 
                setTimeout(typeWriter, 190); // Adjust speed of typing here
            } else {
                setTimeout(() => {
                    document.querySelector('.h-fade-in').classList.add('show');
                }, 0)
            }
        }

        // Start the typewriter effect once
        typeWriter();


// Load voices on page load
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
