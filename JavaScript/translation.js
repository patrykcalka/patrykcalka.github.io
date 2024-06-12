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
    const filepath = `Translations/translation.${language}.xml`;
    console.log(filepath);
    loadXML(filepath, function (xml) {
        const translations = parseResx(xml);
        applyTranslations(translations);
    });
}

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')
}

// scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach.apply(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

