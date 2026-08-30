const radioUpdate = new Event('radioChanged');

async function onLoadItem(i = 0) {
    const content = await singletonLoadContent();
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

function clearHighlights(highlights) {
    for (let i = highlights.children.length - 1; i >= 0; i--) {
        highlights.children[i].remove();
    }
}
