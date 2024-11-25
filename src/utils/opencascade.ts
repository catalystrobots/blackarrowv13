import initOpenCascade from 'opencascade.js';

let occtInstance: any = null;

export async function getOpenCascade() {
  if (!occtInstance) {
    try {
      occtInstance = await initOpenCascade({
        mainJS: new URL('opencascade.js/dist/index.js', import.meta.url).href,
        mainWasm: new URL('opencascade.js/dist/opencascade.wasm', import.meta.url).href,
      });
    } catch (error) {
      console.error('Failed to initialize OpenCascade:', error);
      throw new Error('Failed to initialize OpenCascade');
    }
  }
  return occtInstance;
}