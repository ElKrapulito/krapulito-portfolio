function componentStateInit() {
    const mainElement = document.querySelector('main');
    setRootComponent("main", mainElement);
}

async function main() {
    componentStateInit();
    await displayComponent('summary')
}

async function displayComponent(component) {
    switch (component) {
        case 'summary':
            await setFocusInRoot('summary');
            break;
        case 'experience':
            await setFocusInRoot('experience');
            break;
        case 'projects':
            await setFocusInRoot('projects');
            break;
        case 'extra':
            break;
    }
}

function togglePage() {
    const container = document.body.querySelector('#main-container');
    const currentAttribute = container.getAttribute("style");
    if (!currentAttribute || currentAttribute == "display: block;") {
        container.setAttribute("style", "display: none;");
    } else {
        container.setAttribute("style", "display: block;");
    }
}

async function wrpToggleGame() {
    const { toggleGame } = await import("../effects/game-of-life/main.js");
    toggleGame();
}

async function nxtGen() {
    const { nextGeneration } = await import("../effects/game-of-life/main.js");
    nextGeneration();
}


document.addEventListener("DOMContentLoaded", async () => {
    await main();
});

