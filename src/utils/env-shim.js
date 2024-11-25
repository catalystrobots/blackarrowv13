// Shim for OpenCascade.js env module
export default {
  locateFile: (path) => {
    if (path.endsWith('.wasm')) {
      return new URL(`opencascade.js/dist/${path}`, import.meta.url).href;
    }
    return path;
  }
};