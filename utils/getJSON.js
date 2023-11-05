// Function who fetch API and converts data to JSON
export const getJSON = async (url, errorMsg = 'Something went wrong...') => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${errorMsg} (status ${res.status})`);
  return await res.json();
};
