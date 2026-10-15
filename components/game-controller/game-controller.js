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
    const { toggleGame } = await import("../../effects/game-of-life/main.js");
    toggleGame();
}

async function nxtGen() {
    const { nextGeneration } = await import("../../effects/game-of-life/main.js");
    nextGeneration();
}

var init = function() {
    let hasInit = false;
    return async function() {
        if (!hasInit) {
            await loadExperience();
            hasInit = true;
        }
    }
};
