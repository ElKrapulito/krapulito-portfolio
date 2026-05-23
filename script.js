let componentState;

const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.[]{}()!@#$%^&*<>`~|\\";
const freq = 2;

function componentStateInit() {
    const summaryComponent = document.querySelector('#summary');
    const experienceComponent = document.querySelector('#experience');
    const mainElement = document.querySelector('main');
    componentState = {
        summary: summaryComponent,
        experience: experienceComponent,
        main: mainElement
    }
}

function main() {
    componentStateInit();
    clearMain();
    displayComponent('summary')
}

function clearMain() {
    const mainElement = componentState.main;
    for (let i = mainElement.children.length - 1; i >= 0; i--) {
        mainElement.children[i].remove();
    }
}


function randomizeContent(elementclass) {
    const myelements = document.querySelectorAll(elementclass);
    if (!myelements) {
        return;
    }

    let objelements = [];
    myelements.forEach((el, i) => {
        const item = { element: el, ogtxt: el.innerText, letterToAppear: 0, cnt: freq, in: i }
        objelements.push(item);
    });
    const myinterval = setInterval(() => {
        objelements = objelements.filter(el => el.ogtxt.length != el.letterToAppear);
        objelements.forEach(el => evaluateElement(el))
        if (objelements.length <= 0) {
            clearInterval(myinterval);
        }
    }, 75);
}

function evaluateElement(el) {
    if (el.cnt <= 0) {
        el.letterToAppear++;
        el.cnt = freq;
    }
    const newContent = [];
    for (let i = el.ogtxt.length - el.letterToAppear; i > 0; i--) {
        const posabc = Math.floor(Math.random() * abc.length);
        newContent.push(abc[posabc]);
    }
    el.element.innerText = el.ogtxt.slice(0, el.letterToAppear) + newContent.join('')
    el.cnt--;
}

function displayComponent(component) {
    const mainElement = componentState.main;
    clearMain();
    switch (component) {
        case 'summary':
            mainElement.appendChild(componentState.summary);
            break;
        case 'experience':
            mainElement.appendChild(componentState.experience);
            onLoadExperience();
            break;
        case 'proyects':
            break;
        case 'extra':
            break;
    }
}

function onLoadExperience() {
    const xhr = new XMLHttpRequest();
    const xhscript = new XMLHttpRequest();

    xhr.open("GET", "./components/experience-item.html");
    xhr.onload = () => {
        componentState.experience.innerHTML = xhr.responseText;
        //const jobDetail = document.querySelector("#job-description");
        //jobDetail.innerHTML = xhr.responseText;
    }
    xhr.send();

    // ** Works **
    xhscript.open("GET", "./components/experience.js");
    xhscript.onreadystatechange = () => {
        if (xhscript.readyState == xhscript.DONE) {
            const htmlscript = document.createElement("script");
            htmlscript.text = xhscript.responseText;
            document.body.appendChild(htmlscript);
            onLoadItem();
        }
    }
    xhscript.send();
    //
    //
    // ** Kind of Works **
    //const scriptExp = document.createElement("script");
    //scriptExp.src = "./components/experience.js";
    //document.body.appendChild(scriptExp);
    //onLoadItem();
}


document.addEventListener("DOMContentLoaded", () => {
    main();
});

