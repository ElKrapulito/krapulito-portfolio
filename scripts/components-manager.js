const componentState = {
    summary: { element: null, script: null, load: false },
    experience: { element: null, script: null, load: false },
    main: { element: null, script: null, load: false }
};

async function loadComponent(componentElement, urlHtml, urlScript, callback) {
    if (componentState[componentElement] && componentState[componentElement].load) {
        console.log("Element already loaded");
        return Promise.resolve(true);
    }

    const xhr = new XMLHttpRequest();
    const xhscript = new XMLHttpRequest();

    xhr.open("GET", urlHtml);
    const prom_html = new Promise((resolve, reject) => {
        xhr.onload = () => {
            const newElement = document.createElement("div");
            if (!xhr.responseText) {
                reject(false);
            }
            newElement.innerHTML = xhr.responseText;
            componentState[componentElement].element = newElement;
            resolve(true);
        }
    });

    xhr.send();

    xhscript.open("GET", urlScript);
    const prom_script = new Promise((resolve, reject) => {
        xhscript.onreadystatechange = async () => {
            if (xhscript.readyState == xhscript.DONE) {
                const htmlscript = document.createElement("script");
                htmlscript.text = xhscript.responseText;
                document.head.appendChild(htmlscript);
                componentState[componentElement].script = htmlscript;
                componentState[componentElement].load = true;
                resolve(true);
            }
        }
    });
    xhscript.send();

    if (callback) {
        callback();
    }

    return Promise.all([prom_html, prom_script]);
}

function addComponentToState(componentName, component) {
    componentState[componentName].element = component;
}

function getComponentState() {
    return componentState;
}

function unloadComponent(componentName) {
    const stateComponent = componentState[componentName];
    stateComponent.element.remove();
    stateComponent.script.remove();
}
