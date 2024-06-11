function loadXML (filepath, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", filepath, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseXML);
            callback(xhr.responseXML);
        }
    };
    xhr.send();
}

function parseResx (xml) {
    if(xml == null) {
        return {};
    }
    const translations = {};
    console.log(xml);
    const dataElements = xml.getElementsByTagName("data");
    for (let i = 0; i < dataElements.length; i++) {
        const name = dataElements[i].getAttribute("name");
        translations[name] = dataElements[i].getElementsByTagName("value")[0].textContent;
    }
    console.log(translations);
    return translations;
}

function applyTranslations (translations) {
    document.querySelectorAll("[data-translate-key]").forEach(element => {
       const key = element.getAttribute("data-translate-key");
       if (translations[key]) {
           element.textContent = translations[key];
       }
    });
}

// document.querySelector('#language-selector').addEventListener('change', function (event) {
//     const selectedLanguage = event.target.value;
//     loadAndApplyTranslations(selectedLanguage);
// });

document.addEventListener('DOMContentLoaded', function () {
    const initialLanguage = 'pl';
    loadAndApplyTranslations(initialLanguage);
});

function loadAndApplyTranslations(language) {
    const filepath = `../Translations/translation.${language}.resx`;
    console.log(filepath);
    loadXML(filepath, function (xml) {
        const translations = parseResx(xml);
        applyTranslations(translations);
    });
}