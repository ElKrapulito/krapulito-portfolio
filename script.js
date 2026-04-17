let componentState;

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
    console.log('main children length: ', mainElement.children.length);
    for (let i = mainElement.children.length - 1; i >= 0; i--) {
        mainElement.children[i].remove();
    }
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

