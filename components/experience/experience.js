const radioUpdate = new Event('radioChanged');

async function onLoadItem(i = 0) {
    const content = await wrapperGetContent();
    const title = document.querySelector("#title-exp");
    const companyName = document.querySelector("#job-title");
    const roleDetail = document.querySelector("#role-detail");
    const dateJob = document.querySelector("#date-job");
    const jobSummary = document.querySelector("#job-summary");
    const jobHighlights = document.querySelector("#job-highlights");

    clearHighlights(jobHighlights);
    const item = JSON.parse(JSON.stringify(content.experience.body[i]));

    title.textContent = content.experience.title.repeat(1);
    companyName.textContent = item.company.repeat(1);
    roleDetail.textContent = item.role.repeat(1);
    dateJob.textContent = item.date.repeat(1);
    jobSummary.textContent = item.summary.repeat(1);
    item.highlights.forEach(high => {
        const newLi = document.createElement("li");
        newLi.textContent = high;
        jobHighlights.append(newLi);
    });

    document.dispatchEvent(radioUpdate);
}

async function setUpButtons() {
    const inputTemplate = document.querySelector("#sel0").cloneNode(true);
    const labelTemplate = document.querySelector("#lbl-sel0").cloneNode(true);
    const numTemplate = document.querySelector("#page-num-1").cloneNode(true);
    const parent = document.querySelector("#btn-container");
    for (let i = parent.children.length - 1; i >= 0; i--) {
        parent.children[i].remove();
    }

    const content = await wrapperGetContent();
    for (let i = 0; i < content.experience.body.length; i++) {
        const newInput = inputTemplate.cloneNode();
        newInput.setAttribute("id", `sel${i}`);
        newInput.setAttribute("value", `${i}`);
        newInput.addEventListener("click", () => { onLoadItem(i) })
        if (i == 0) {
            newInput.setAttribute("checked", "true");
        }
        const newLabel = labelTemplate.cloneNode();
        newLabel.setAttribute("id", `lbl-sel${i}`)
        newLabel.setAttribute("for", `sel${i}`);
        const numNew = numTemplate.cloneNode();
        numNew.setAttribute("id", `page-num-${i}`);
        numNew.textContent = i + 1;

        newLabel.appendChild(numNew);
        parent.appendChild(newInput);
        parent.appendChild(newLabel);
    }

    document.addEventListener("radioChanged", () => {
        randomizeParallelText(['.highlight', 'p', '#job-highlights>li', 'i']);
    });

}

var init = function() {
    let hasInit = false;
    return async function() {
        if (hasInit) {
            randomizeParallelText(['.highlight', 'p', '#job-highlights>li', 'i']);
            return;
        }
        await setUpButtons();
        await onLoadItem();
        hasInit = true;
    }
}();

function clearHighlights(highlights) {
    if (!highlights?.children) {
        return;
    }
    for (let i = highlights.children.length - 1; i >= 0; i--) {
        highlights.children[i].remove();
    }
}

async function wrapperGetContent() {
    // Creating wrapper since this function comes from another script: ./scripts/loaderstring.js
    return singletonLoadContent();
}
