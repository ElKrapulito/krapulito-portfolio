const rootState = {
    rootName: "main",
    children: ["experience", "summary"],
    currentFocus: "summary"
}

const componentState = {
    summary: { element: null, script: null, load: false },
    experience: { element: null, script: null, load: false },
    main: { element: null, script: null, load: false }
};


async function loadComponent(componentElement, urlHtml, urlScript) {
    if (componentState[componentElement] && componentState[componentElement].load) {
        return Promise.resolve(true);
    }

    const xhr = new XMLHttpRequest();
    const xhscript = new XMLHttpRequest();

    xhr.open("GET", urlHtml);
    const prom_html = new Promise((resolve, reject) => {
        xhr.onload = () => {
            const newElement = document.createElement("div");
            newElement.innerHTML = xhr.responseText;
            componentState[componentElement].element = newElement;
            resolve(true);
        }
        xhr.onerror = (e) => {
            reject(e);
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
        xhscript.onerror = (e) => {
            reject(e);
        }
    });
    xhscript.send();

    return Promise.all([prom_html, prom_script]);
}

function addComponentToState(componentName, component) {
    componentState[componentName].element = component;
    componentState[componentName].load = true;
}

function getComponentState() {
    return componentState;
}

function unloadComponent() {
    const stateComponent = componentState[rootState.currentFocus];
    if (stateComponent?.element) {
        stateComponent.element.remove();
    }

    if (stateComponent?.script) {
        stateComponent.script.remove();
    }
}

function setRootComponent(name, componentElement) {
    rootState.rootName = name;
    addComponentToState(name, componentElement);
}

async function setFocusInRoot(elementNameToFocus) {
    unloadComponent(rootState.currentFocus);
    await loadComponent(
        elementNameToFocus,
        `../components/${elementNameToFocus}/${elementNameToFocus}.html`,
        `../components/${elementNameToFocus}/${elementNameToFocus}.js`
    );
    const rootEl = componentState[rootState.rootName].element;

    if (componentState[elementNameToFocus]?.element) {
        rootEl.appendChild(componentState[elementNameToFocus].element);
    }

    if (componentState[elementNameToFocus]?.script) {
        document.head.appendChild(componentState[elementNameToFocus].script);
    }

    rootState.currentFocus = elementNameToFocus;

    if (typeof init == 'function') {
        await init();
    }
}
