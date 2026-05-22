let componentState;

const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.[]{}()!@#$%^&*<>`~|\\";

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
    // console.log('main children length: ', mainElement.children.length);
    for (let i = mainElement.children.length - 1; i >= 0; i--) {
        mainElement.children[i].remove();
    }
}


function randomizeContent(elementclass) {
    const myelement = document.querySelector(elementclass);
    if (!myelement) {
        return;
    }
    const copyText = myelement.innerText;
    let letterToAppear = 0;
    let contentLength = copyText.length;
    const freq = 2;
    let count = freq;
    const myinterval = setInterval(() => {
        if (count <= 0) {
            letterToAppear++;
            count = freq;
        }
        const newContent = [];
        for (let i = contentLength - letterToAppear; i > 0; i--) {
            const posabc = Math.floor(Math.random() * abc.length);
            newContent.push(abc[posabc]);
        }
        myelement.innerText = copyText.slice(0, letterToAppear) + newContent.join('')
        count--;
        if (letterToAppear == copyText.length) {
            clearInterval(myinterval);
        }
    }, 50);
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
            break;
        case 'proyects':
            break;
        case 'extra':
            break;
    }

}


document.addEventListener("DOMContentLoaded", () => {
    main();
});

