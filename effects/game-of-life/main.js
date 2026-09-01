import utils from './helper.js';
let position;
let resolution;
let previousTime = 0;
const separation = 4;
async function main() {
    const canvas = document.querySelector('#life');
    if (!canvas) {
        throw new Error("Canvas not found");
    }
    canvas.width = 400;
    canvas.height = 300;
    utils.resizeCanvasToDisplaySize(canvas);
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        throw new Error("Web gl no supported");
    }
    const rowCount = Math.floor(gl.canvas.height / separation);
    const columnCount = Math.floor(gl.canvas.width / separation);
    const game = [];
    initGame(game, rowCount, columnCount);
    console.log(game);
    console.log(rowCount);
    console.log(columnCount);
    const program = await utils.createProgram(gl,"./effects/game-of-life/shaders/vertexShader.glsl", "./effects/game-of-life/shaders/fragmentShader.glsl");
    position = gl.getAttribLocation(program, "a_position");
    resolution = gl.getUniformLocation(program, "u_resolution");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bindVertexArray(gl.createVertexArray());
    gl.enableVertexAttribArray(position);
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(position, size, type, normalize, stride, offset);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2fv(resolution, [gl.canvas.width, gl.canvas.height]);
    //drawGrid(gl);
    drawSquares(gl, game, rowCount, columnCount);
    play(gl, program, game, rowCount, columnCount);
}
function drawGrid(gl) {
    const width = gl.canvas.width;
    const height = gl.canvas.height;
    let arr = [];
    for (let i = 0; i <= width / separation; i++) {
        arr.push(i * separation);
        arr.push(0);
        arr.push(i * separation);
        arr.push(height);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...arr]), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINES, 0, (width / separation) * 2);
    arr = [];
    for (let i = 0; i <= height / separation; i++) {
        arr.push(0);
        arr.push(i * separation);
        arr.push(width);
        arr.push(i * separation);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...arr]), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINES, 0, (height / separation) * 2);
}
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
function initGame(game, rowCount, columnCount) {
    for (let i = 0; i < rowCount; i++) {
        game[i] = [];
        for (let j = 0; j < columnCount; j++) {
            const value = randomInt(100);
            if (game[i] !== undefined) {
                game[i][j] = value > 70;
            }
        }
    }
}
function drawSquares(gl, game, rowCount, columnCount) {
    let lives = 0;
    let liveSquresVertex = [];
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (!game[i]) {
                continue;
            }
            if (!game[i][j]) {
                continue;
            }
            lives++;
            const rect = {
                x1: j * separation,
                x2: j * separation + separation,
                y1: i * separation,
                y2: i * separation + separation
            };
            liveSquresVertex.push(rect.x1);
            liveSquresVertex.push(rect.y1);
            liveSquresVertex.push(rect.x2);
            liveSquresVertex.push(rect.y1);
            liveSquresVertex.push(rect.x1);
            liveSquresVertex.push(rect.y2);
            liveSquresVertex.push(rect.x1);
            liveSquresVertex.push(rect.y2);
            liveSquresVertex.push(rect.x2);
            liveSquresVertex.push(rect.y1);
            liveSquresVertex.push(rect.x2);
            liveSquresVertex.push(rect.y2);
            //liveSquresVertex = [
            //    ...liveSquresVertex,
            //    rect.x1, rect.y1,
            //    rect.x2, rect.y1,
            //    rect.x1, rect.y2,
            //    rect.x1, rect.y2,
            //    rect.x2, rect.y1,
            //    rect.x2, rect.y2
            //];
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(liveSquresVertex), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, lives * 6);
}
let elapsed = 0;
const frequency = 50;
function play(gl, program, game, rowCount, columnCount) {
    if (elapsed > frequency) {
        game = newGeneration(game, rowCount, columnCount);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //drawGrid(gl);
        drawSquares(gl, game, rowCount, columnCount);
    }
    requestAnimationFrame((currentTime) => {
        elapsed = currentTime - previousTime;
        if (elapsed > frequency) {
            previousTime = currentTime;
        }
        play(gl, program, game, rowCount, columnCount);
    });
}
function newGeneration(game, rowCount, columnCount) {
    let newGeneration = [];
    for (let i = 0; i < rowCount; i++) {
        newGeneration[i] = [];
        for (let j = 0; j < columnCount; j++) {
            const left = (columnCount + (j - 1)) % columnCount;
            const middleC = (columnCount + j) % columnCount;
            const right = (columnCount + (j + 1)) % columnCount;
            const top = (rowCount + (i + 1)) % rowCount;
            const middleR = (rowCount + (i)) % rowCount;
            const bottom = (rowCount + (i - 1)) % rowCount;
            const allneighbors = [
                !!game[top][left],
                !!game[top][middleC],
                !!game[top][right],
                !!game[middleR][left],
                !!game[middleR][right],
                !!game[bottom][left],
                !!game[bottom][middleC],
                !!game[bottom][right],
            ];
            const livingNeighbors = allneighbors.filter(neighbor => !!neighbor);
            if (livingNeighbors.length >= 2 && livingNeighbors.length <= 3 && !!game[i][j]) {
                newGeneration[i][j] = true;
            }
            if (livingNeighbors.length == 3 && !game[i][j]) {
                newGeneration[i][j] = true;
            }
            if (livingNeighbors.length > 3) {
                newGeneration[i][j] = false;
            }
            if (livingNeighbors.length < 2) {
                newGeneration[i][j] = false;
            }
        }
    }
    return newGeneration;
}
document.addEventListener('DOMContentLoaded', async () => {
    await main();
});
//# sourceMappingURL=main.js.map
