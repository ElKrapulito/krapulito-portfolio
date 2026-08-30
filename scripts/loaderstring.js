async function findText(url = "./assets/text/en.json") {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    const promise = new Promise((resolve, reject) => {
        xhr.onload = () => {
            const response = JSON.parse(xhr.response);
            resolve(response);
        }
        xhr.onerror = (err) => {
            reject(err);
        }
    });
    xhr.send();
    return promise;
}

const getContent = function() {
    let text;
    return async function*() {
        if (!text) {
            text = await findText();
            console.log("fetch");
        }
        return text;
    }
}();

async function singletonLoadContent() {
    return (await getContent().next()).value;
}
