/**
 * In this function particular query set in URL is retrieved
 *
 * @param {string} location
 * @param {string} query
 * @returns {string}      parameter required(eg gas,country,for time)
 */
export const getParams = ({ location, query }) => {
  const searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get(query) || '',
  };
};

/**
 * In this function query desired to be set in URL by user is set.
 * Based on user's choice using set(boolean variable) query can be appened or set.
 *
 *
 * @param {string} query
 * @param {string} parameter
 * @param {string} location
 * @param {boolean} set
 * @return {string}      final URL
 */
export const setParams = ({ query, parameter, location, set }) => {
  const searchParams = new URLSearchParams(location.search);
  if (set) {
    searchParams.set(`${query}`, parameter || '');
  } else {
    searchParams.append(`${query}`, parameter || '');
  }

  return searchParams.toString();
};
