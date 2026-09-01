declare function fetchShaderUrl(url: string): Promise<string>;
declare function createSuperShader(gl: WebGL2RenderingContext, shaderType: GLenum, source: string): WebGLShader;
declare function createSuperPogram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;
declare function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean;
declare function createProgram(gl: WebGL2RenderingContext, vertexPath: string, fragmentPath: string): Promise<WebGLProgram>;
declare const _default: {
    fetchShaderUrl: typeof fetchShaderUrl;
    createSuperPogram: typeof createSuperPogram;
    createSuperShader: typeof createSuperShader;
    resizeCanvasToDisplaySize: typeof resizeCanvasToDisplaySize;
    createProgram: typeof createProgram;
};
export default _default;
//# sourceMappingURL=helper.d.ts.map