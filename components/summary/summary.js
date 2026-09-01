async function onLoadSummary() {
    const content = await wrapperGetContentSummary();

    const summaryContainer = document.querySelector("#summary");
    const title = summaryContainer.querySelector("h1");
    const pContainer = summaryContainer.querySelector("div");
    const bodyContent = content.summary.body;
    title.textContent = content.summary.title;

    for (let i = 0; i < bodyContent.length; i++) {
        const newElement = document.createElement("p");
        newElement.textContent = bodyContent[i];
        pContainer.appendChild(newElement);
    }
}


async function wrapperGetContentSummary() {
    // Creating wrapper since this function comes from another script: ./scripts/loaderstring.js
    return singletonLoadContent();
}

function init() {
    const hasInit = false;
    return async function() {
        await onLoadSummary();
        hasInit = true;
    }
}
