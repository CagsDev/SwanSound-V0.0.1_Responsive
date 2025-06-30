function searchFunction() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    let content = document.getElementById("content");
    let elements = content.querySelectorAll("*");

    for (let element of elements) {
        if (element.nodeType === Node.ELEMENT_NODE) {
            let textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
            for (let textNode of textNodes) {
                textNode.nodeValue = textNode.nodeValue.replace(/<span class="highlight">|<\/span>/g, '');
            }
        }
    }

    let found = false;
    for (let element of elements) {
        if (element.nodeType === Node.ELEMENT_NODE) {
            let textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
            for (let textNode of textNodes) {
                let originalText = textNode.nodeValue;
                let lowerCaseText = originalText.toLowerCase();

                if (lowerCaseText.includes(searchValue)) {
                    let highlightedText = originalText.replace(new RegExp(searchValue, 'gi'), (match) => {
                        return `<span class="highlight">${match}</span>`;
                    });

                    let tempSpan = document.createElement("span");
                    tempSpan.innerHTML = highlightedText;
                    textNode.parentNode.replaceChild(tempSpan, textNode);

                    if (!found) {
                        tempSpan.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                        found = true;
                    }
                }
            }
        }
    }

    if (!found) {
        alert("Aranan kelime bulunamadı.");
    }
}

let currentAudioIndex = -1;
const audioElements = document.querySelectorAll(".pl-sarki");
const songNames = document.querySelectorAll(".sarki-adi");

function updateTitle(index) {
    if (songNames[index]) {
        document.title = songNames[index].innerText.trim();
    }
}

function playAudioAtIndex(index) {
    if (index >= 0 && index < audioElements.length) {
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
            audio.classList.remove("playing");
        });

        audioElements[index].play();
        audioElements[index].classList.add("playing");
        audioElements[index].scrollIntoView({ behavior: "smooth", block: "center" });
        currentAudioIndex = index;
        updateTitle(index);
    }
}

function playNext() {
    const nextIndex = (currentAudioIndex + 1) % audioElements.length;
    playAudioAtIndex(nextIndex);
}

function playPrevious() {
    const prevIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
    playAudioAtIndex(prevIndex);
}

audioElements.forEach((audio, index) => {
    audio.addEventListener("play", () => {
        audioElements.forEach((a, i) => {
            if (a !== audio) {
                a.pause();
                a.currentTime = 0;
                a.classList.remove("playing");
            } else {
                currentAudioIndex = i;
                updateTitle(i);
                a.classList.add("playing");
            }
        });
    });

    audio.addEventListener("ended", () => {
        playNext();
    });
});

function labenlaCags() {
  alert("SwanSound, sınırlı kişilerin erişim iznine sahip olduğu, Çağlar C. tarafından GitHub profilini zenginleştirmek amacıyla tasarlanmış bir sitedir. Herhangi bir gelir elde edilmemektedir!");
}
