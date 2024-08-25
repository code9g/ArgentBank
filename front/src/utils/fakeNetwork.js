/**
 * Api pour simuler un délai de connexion/réponse, à n'utiliser
 * que pour des tests.
 *
 * @param {number} delay Délai d'attente de "base"
 * @param {boolean} [random=true] Indique si il faut "randomiser" le délai qui servira de "base"
 * @returns
 */
const fakeNetwork = async (delay, random = 0) =>
  new Promise((res) => setTimeout(res, delay + Math.random() * random));

export default fakeNetwork;
