function componentStateInit() {
    const mainElement = document.querySelector('main');
    setRootComponent("main", mainElement);
}

async function main() {
    componentStateInit();
    await displayComponent('summary');
    await addSimpleComponent();
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

document.addEventListener("DOMContentLoaded", async () => {
    await main();
});

