export const loadShader = async (src) => fetch(src)
  .then(response => response.text())
  .catch(err => console.log('ErrorLoadingShader:', err));

export default loadShader;
