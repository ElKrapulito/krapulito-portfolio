async function loadExperience() {
    const content = await wrapperGetContentProjects();

    const projectsContainer = document.querySelector("#projects");
    const title = projectsContainer.querySelector("h1");
    const pContainer = projectsContainer.querySelector("div");
    const pjItem = projectsContainer.querySelector("#project-item");
    const bodyContent = content.projects.body;
    title.textContent = content.projects.title;
    pjItem.remove();

    for (let i = 0; i < bodyContent.length; i++) {
        const newPjItem = pjItem.cloneNode();
        const pjTitle = document.createElement("h3");

        const pjLink = document.createElement("a");
        pjLink.setAttribute("class", "highlight");
        pjLink.setAttribute("href", bodyContent[i].link);
        pjLink.textContent = bodyContent[i].title;

        pjTitle.appendChild(pjLink);

        newPjItem.setAttribute("id", `pj-item-${i}`);
        const pjSummary = document.createElement("p");
        pjSummary.textContent = bodyContent[i].summary;

        newPjItem.appendChild(pjLink);
        newPjItem.appendChild(pjSummary);

        pContainer.appendChild(newPjItem);
    }
}

async function wrapperGetContentProjects() {
    // Creating wrapper since this function comes from another script: ./scripts/loaderstring.js
    return singletonLoadContent();

}

var init = function() {
    let hasInit = false;
    return async function() {
        if (!hasInit) {
            await loadExperience();
            hasInit = true;
        }
        randomizeParallelText(['.highlight', 'p']);
    }
};
