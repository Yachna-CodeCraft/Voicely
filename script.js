let synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
  voices = synth.getVoices();
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  });
}

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

function speakText() {
  const text = document.getElementById("textInput").value;
  const rate = parseFloat(document.getElementById("rate").value);
  const voiceIndex = parseInt(document.getElementById("voiceSelect").value);
  if (synth.speaking) synth.cancel();

  if (text !== "") {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices[voiceIndex];
    utter.rate = rate;
    synth.speak(utter);
  }
}

function pauseText() {
  if (synth.speaking && !synth.paused) synth.pause();
}

function resumeText() {
  if (synth.paused) synth.resume();
}

function stopText() {
  if (synth.speaking) synth.cancel();
}
