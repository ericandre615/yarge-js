export const loadShader = async (src: string) => fetch(src)
  .then(response => response.text())
  .catch(err => console.log('ErrorLoadingShader:', err));

export default loadShader;
