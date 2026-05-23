const componentState = {
    summary: { element: null, script: null, load: false },
    experience: { element: null, script: null, load: false },
    main: { element: null, script: null, load: false }
};

const abc = "01";//"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.[]{}()!@#$%^&*<>`~|\\";
const freq = 2;
const parallelfreq = 15;

function componentStateInit() {
    const summaryComponent = document.querySelector('#summary');
    const experienceComponent = document.querySelector('#experience');
    const mainElement = document.querySelector('main');
    componentState.summary.element = summaryComponent;
    componentState.experience.element = experienceComponent;
    componentState.main.element = mainElement;
}

function main() {
    componentStateInit();
    clearMain();
    displayComponent('summary')
}

function clearMain() {
    const mainElement = componentState.main.element;
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

function randomizeParallelText(el) {
    const elements = document.querySelectorAll(el);
    if (!elements) {
        return;
    }

    nodesEl = [];

    elements.forEach(element => {
        const content = element.innerText;
        const mapabc = new Map();
        const textSplit = content.split('');
        textSplit.forEach((letter, ind) => {
            if (mapabc.has(letter)) {
                const obj = mapabc.get(letter);
                obj.arrind.push(ind);
            } else {
                const count = Math.floor(Math.random() * parallelfreq);
                mapabc.set(letter, { arrind: [ind], cnt: count });
            }
        });
        nodesEl.push({ textSplit, mapabc, element });
    });


    let total = parallelfreq;
    const myinterval = setInterval(() => {
        nodesEl.forEach(el => {
            el.mapabc.forEach((v, k) => {
                const posabc = Math.floor(Math.random() * abc.length);
                if (k == ' ') {
                    return;
                }
                if (v.cnt < 0) {
                    return;
                } else if (v.cnt == 0) {
                    v.arrind.forEach(num => {
                        el.textSplit[num] = k;
                    })
                } else {
                    v.arrind.forEach(num => {
                        el.textSplit[num] = abc[posabc];
                    });
                }
                v.cnt--;
            });
            el.element.innerText = el.textSplit.join('');
        });
        total--;
        if (total <= 0) {
            clearInterval(myinterval);
        }
    }, 75);

}

function displayComponent(component) {
    const mainElement = componentState.main.element;
    clearMain();
    switch (component) {
        case 'summary':
            mainElement.appendChild(componentState.summary.element);
            break;
        case 'experience':
            mainElement.appendChild(componentState.experience.element);
            if (!componentState.experience.load) {
                onLoadExperience();
                componentState.experience.load = true;
            }
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

    xhr.open("GET", "./components/experience.html");
    xhr.onload = () => {
        componentState.experience.element.innerHTML = xhr.responseText;
    }
    xhr.send();

    xhscript.open("GET", "./components/experience.js");
    xhscript.onreadystatechange = () => {
        if (xhscript.readyState == xhscript.DONE) {
            const htmlscript = document.createElement("script");
            htmlscript.text = xhscript.responseText;
            document.body.appendChild(htmlscript);
            onLoadItem();
            componentState.experience.script = htmlscript;
        }
    }
    xhscript.send();
}


document.addEventListener("DOMContentLoaded", () => {
    main();
});

