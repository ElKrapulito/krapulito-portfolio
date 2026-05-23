const experience = [{
    company: "Digital Harbor",
    role: "Fullstack Developer",
    date: "02/23 - 02/26",
    summary: "Worked on a development cycle management project like Jira or Trello where I develop the multiple features.",
    highlights: [
        "Made a feature to clone tasks that would increase productivity by creating tasks that share similar attributes and then allowing the user to modify the data of the new task.",
        "Designed and implemented a caching strategy using IndexedDB to store responses from high-traffic endpoints, reducing backend load. Introduced a custom cache eviction mechanism to optimize performance and ensure efficient resource utilization.",
        "Updated a website to comply with California Accessibility Act (AA) standards by applying WCAG 2.0/2.1 guidelines, performing accessibility audits, and enhancing compatibility with assistive technologies."
    ],
},
{
    company: "Squaads",
    role: "Fullstack Developer",
    date: "03/22 - 02/23",
    summary: "Worked in two different projects one was a real time translator app for conferences and the other was an animal breeding management app.",
    highlights: [
        "Implemented roles and permissions system using CASL for a platform that controls different types of animals and breeds.",
        "Developed a DropBox like functionality so users with administrative roles could upload files related to reports of the animals files were stored in AWS S3 Bucket.",
        "Handled Microsoft Azure’s translation API for real time translation in an application."
    ]
}
];

function onLoadItem(i = 0) {
    const companyName = document.querySelector("#job-title");
    const roleDetail = document.querySelector("#role-detail");
    const dateJob = document.querySelector("#date-job");
    const jobSummary = document.querySelector("#job-summary");
    const jobHighlights = document.querySelector("#job-highlights");

    clearHighlights(jobHighlights);
    const item = experience[i];

    companyName.textContent = item.company;
    roleDetail.textContent = item.role;
    dateJob.textContent = item.date;
    jobSummary.textContent = item.summary;
    item.highlights.forEach(high => {
        const newLi = document.createElement("li");
        newLi.textContent = high;
        jobHighlights.append(newLi);
    });
    randomizeContent(".highlight")
    //jobHighlights.remove();
}

function clearHighlights(highlights) {
    for (let i = highlights.children.length - 1; i >= 0; i--) {
        highlights.children[i].remove();
    }
}
