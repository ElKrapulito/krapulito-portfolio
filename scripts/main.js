function componentStateInit() {
    const mainElement = document.querySelector('main');
    setRootComponent("main", mainElement);
}

function main() {
    componentStateInit();
    displayComponent('summary')
}

async function displayComponent(component) {
    switch (component) {
        case 'summary':
            await setFocusInRoot('summary', () => {
                randomizeContent('.highlight');
                randomizeParallelText(['p']);
            });
            break;
        case 'experience':
            await setFocusInRoot('experience', () => {
                randomizeContent('.highlight');
                randomizeParallelText(['p', 'li', 'i']);
            });
            break;
        case 'projects':
            break;
        case 'extra':
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});

