async function fetchShaderUrl(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    const promise = new Promise((resolve, reject) => {
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = (e) => {
            reject(e.target);
        };
    });
    xhr.send();
    return promise;
}
function createSuperShader(gl, shaderType, source) {
    const shader = gl.createShader(shaderType);
    if (!shader) {
        throw new Error("Failed to create shader");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        const message = gl.getShaderInfoLog(shader) || "Error compiling shader";
        gl.deleteShader(shader);
        throw new Error(message);
    }
    return shader;
}
function createSuperPogram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        const message = gl.getProgramInfoLog(program) || "Error creating program";
        gl.deleteProgram(program);
        throw new Error(message);
    }
    return program;
}
function resizeCanvasToDisplaySize(canvas) {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needsResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    if (needsResize) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needsResize;
}
async function createProgram(gl, vertexPath, fragmentPath) {
    const vertexshader = createSuperShader(gl, gl.VERTEX_SHADER, await fetchShaderUrl(vertexPath));
    const fragmentshader = createSuperShader(gl, gl.FRAGMENT_SHADER, await fetchShaderUrl(fragmentPath));
    if (!vertexshader || !fragmentshader) {
        throw new Error("Failed to create shader");
    }
    return createSuperPogram(gl, vertexshader, fragmentshader);
}
export default {
    fetchShaderUrl,
    createSuperPogram,
    createSuperShader,
    resizeCanvasToDisplaySize,
    createProgram
};
//# sourceMappingURL=helper.js.map
