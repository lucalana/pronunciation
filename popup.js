const langInput = document.getElementById('lang');
const voiceInput = document.getElementById('voice');
const speedInput = document.getElementById('speed');

chrome.tts.getVoices().then(async function(voices) {
    let storageConfigs = await chrome.storage.local.get(['voice', 'lang', 'speed']);
    speedInput.value = storageConfigs.speed;

    voices
    .map(voice => voice.lang)
    .filter((lang, index, self) => self.indexOf(lang) == index)
    .forEach(lang => {
        let opt = document.createElement('option');
        opt.value = lang;
        opt.innerText = lang;
        if (lang == storageConfigs.lang) {
            opt.selected = true;
        }
        langInput.appendChild(opt);
    });

    voices
    .filter(voice => voice.lang == langInput.value)
    .forEach(voice => {
        let opt = document.createElement('option');
        opt.value = voice.voiceName;
        opt.innerText = voice.voiceName;
        if (voice.voiceName == storageConfigs.voice) {
            opt.selected = true;
        }
        voiceInput.appendChild(opt);
    });
});

langInput.addEventListener('change', async function() {
    chrome.storage.local.set({'lang': langInput.value})
    voiceInput.innerHTML = ''

    let voices = await chrome.tts.getVoices();
    voices
    .filter(voice => voice.lang == langInput.value)
    .forEach((voice, index) => {
        let opt = document.createElement('option');
        opt.value = voice.voiceName;
        opt.innerText = voice.voiceName;
        if(index == 0) {
            opt.selected = true;
            chrome.storage.local.set({'voice': voice.voiceName})
        }
        voiceInput.appendChild(opt);
    });
});

voiceInput.addEventListener('change', async function() {
    chrome.storage.local.set({'voice': voiceInput.value})
});

speedInput.addEventListener('change', async function() {
    chrome.storage.local.set({'speed': speedInput.value})
});