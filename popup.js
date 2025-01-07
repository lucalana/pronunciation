const langSelect = document.getElementById('lang');
const speakButton = document.getElementById('speak');

async function avaiableLangs() {
    let voices = await chrome.tts.getVoices();
    return voices
        .map(voice => voice.lang)
        .filter((lang, index, self) => self.indexOf(lang) === index);
}

async function addLangs() {
    let langs = await avaiableLangs();
    let lastLang = await chrome.storage.local.get(['lang']);

    langs.forEach(lang => {
        const opt = document.createElement('option');
        opt.value = lang;
        opt.text = lang;
        if (lang === lastLang.lang) {
            opt.selected = true;
        }
        langSelect.appendChild(opt)
    });
}

addLangs();

speakButton.addEventListener('click', function() {
    let word = document.getElementById('input').value;
    let lang = langSelect.value;
    chrome.storage.local.set({'lang': lang});

    if(word.trim()) {
        chrome.tts.speak(word, {
            'rate': 0.9,
            'lang': lang
        });
    }
})