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

const audioElements = document.querySelectorAll(".pl-sarki");

audioElements.forEach((audio, index) => {
    audio.addEventListener("play", () => {
        audioElements.forEach(a => {
            if (a !== audio) {
                a.pause(); 
                a.currentTime = 0; 
            }
        });
        audioElements.forEach(a => a.classList.remove("playing"));
        audio.classList.add("playing");
    });

    audio.addEventListener("ended", () => {
        const nextAudio = audioElements[index + 1];
        if (nextAudio) {
            nextAudio.play();
            nextAudio.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            audioElements[0].play();
            audioElements[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
});