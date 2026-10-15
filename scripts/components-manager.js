const rootState = {
    rootName: "main",
    children: ["experience", "summary"],
    currentFocus: "summary"
}

const componentState = {
    summary: { element: null, script: null, load: false, initFunc: {} },
    experience: { element: null, script: null, load: false, initFunc: {} },
    main: { element: null, script: null, load: false, initFunc: {} },
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
                if (xhscript.responseText.substring("init") && typeof init == 'function') {
                    componentState[componentElement].initFunc = init();
                }
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

async function loadIndependentComponent(comp) {
    const rgx = /\w+((\-|_|\s+)\w+)+/;
    const splrgx = /\-|_|\s+/;
    
    if (!rgx.test(comp)) {
        return;
    }

    const arrTxt = comp.split(splrgx);
    arrTxt.forEach((it, i, arr) => {
        if (i == 0) {
            return;
        }
        it = it.charAt(0).toUpperCase() + it.slice(1);
        arr[i] = it;
    });
    
    const compName = arrTxt.join('');

    if (!componentState[compName]) {
        componentState[compName] = {};
    }

    await loadComponent(
        compName,
        `../components/${comp}/${comp}.html`,
        `../components/${comp}/${comp}.js`
    );

    console.log(componentState);
}

async function addSimpleComponent(_comp) {
    await loadIndependentComponent('game-controller');
    // const rootEl = componentState[rootState.rootName].element;
    document.body.appendChild(componentState["gameController"].element);
    document.head.appendChild(componentState["gameController"].script);
}

async function setFocusInRoot(elementNameToFocus) {
    unloadComponent();

    if (!componentState[elementNameToFocus]) {
        componentState[elementNameToFocus] = {};
    }

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

    if (typeof componentState[elementNameToFocus].initFunc == 'function') {
        await componentState[elementNameToFocus].initFunc();
    }
}

