function searchFunction() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    let content = document.getElementById("content");
    let elements = content.querySelectorAll("*");

    // Önceki arama vurgularını kaldır
    for (let element of elements) {
        if (element.nodeType === Node.ELEMENT_NODE) {
            let textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
            for (let textNode of textNodes) {
                textNode.nodeValue = textNode.nodeValue.replace(/<span class="highlight">|<\/span>/g, '');
            }
        }
    }

    // Arama yap ve ilk eşleşen kelimeye kaydır
    let found = false;
    for (let element of elements) {
        if (element.nodeType === Node.ELEMENT_NODE) {
            let textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
            for (let textNode of textNodes) {
                let originalText = textNode.nodeValue; // Orijinal metni sakla
                let lowerCaseText = originalText.toLowerCase(); // Arama için küçük harfe dönüştür

                if (lowerCaseText.includes(searchValue)) {
                    // Aranan kelimeyi sadece vurgula
                    let highlightedText = originalText.replace(new RegExp(searchValue, 'gi'), (match) => {
                        return `<span class="highlight">${match}</span>`;
                    });

                    let tempSpan = document.createElement("span");
                    tempSpan.innerHTML = highlightedText;
                    textNode.parentNode.replaceChild(tempSpan, textNode);

                    // İlk bulunan sonucu kaydır
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

    // Eğer hiçbir sonuç bulunmadıysa bir uyarı göster
    if (!found) {
        alert("Aranan kelime bulunamadı.");
    }
}