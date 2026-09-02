const abc = "01";//"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.[]{}()!@#$%^&*<>`~|\\";
const freq = 2;
const parallelfreq = 15;

function randomizeContent(elementclass) {
    const myelements = document.querySelectorAll(elementclass);
    if (!myelements) {
        return;
    }

    let objelements = [];
    myelements.forEach((el, i) => {
        const item = { element: el, ogtxt: el.innerText, letterToAppear: 0, cnt: freq, in: i }
        objelements.push(item);
    });
    const myinterval = setInterval(() => {
        objelements = objelements.filter(el => el.ogtxt.length != el.letterToAppear);
        objelements.forEach(el => evaluateElement(el))
        if (objelements.length <= 0) {
            clearInterval(myinterval);
        }
    }, 75);
}

function evaluateElement(el) {
    if (el.cnt <= 0) {
        el.letterToAppear++;
        el.cnt = freq;
    }
    const newContent = [];
    for (let i = el.ogtxt.length - el.letterToAppear; i > 0; i--) {
        const posabc = Math.floor(Math.random() * abc.length);
        newContent.push(abc[posabc]);
    }
    el.element.innerText = el.ogtxt.slice(0, el.letterToAppear) + newContent.join('')
    el.cnt--;
}

const randomizeParallelText = function() {
    let myinterval;
    let nodesEl = [];
    return function(queries) {

        if (myinterval && nodesEl) {
            clearInterval(myinterval);
            myinterval = null;
            nodesEl.forEach(el => {
                el.element.innerText = el.ogTxt;
            });
        }

        const elements = [];
        queries.forEach(query => {
            elements.push(document.querySelectorAll(query));
        });

        if (!elements) {
            return;
        }

        nodesEl = [];
        elements.forEach(element => {
            element.forEach(eli => {
                if (eli.length <= 0) {
                    return;
                }
                const content = eli.innerText;
                const mapabc = new Map();
                const textSplit = content.split('');
                textSplit.forEach((letter, ind) => {
                    if (mapabc.has(letter)) {
                        const obj = mapabc.get(letter);
                        obj.arrind.push(ind);
                    } else {
                        const count = Math.floor(Math.random() * parallelfreq);
                        mapabc.set(letter, { arrind: [ind], cnt: count });
                    }
                });
                nodesEl.push({ textSplit, mapabc, element: eli , ogTxt: content.repeat(1)});
            });
        });

        let total = parallelfreq;
        myinterval = setInterval(() => {
            nodesEl.forEach(el => {
                el.mapabc.forEach((v, k) => {
                    const posabc = Math.floor(Math.random() * abc.length);
                    if (k == ' ') {
                        return;
                    }
                    if (v.cnt < 0) {
                        return;
                    } else if (v.cnt == 0) {
                        v.arrind.forEach(num => {
                            el.textSplit[num] = k;
                        })
                    } else {
                        v.arrind.forEach(num => {
                            el.textSplit[num] = abc[posabc];
                        });
                    }
                    v.cnt--;
                });
                el.element.innerText = el.textSplit.join('');
            });
            total--;
            if (total <= 0) {
                clearInterval(myinterval);
                myinterval = null;
                nodesEl = [];
            }
        }, 75);
    }
}();

