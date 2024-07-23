const bas_url = 'https://dummyjson.com';

export default async function handelRemoterequest(endpoint, success, error, startLoading, stopLoading) {
  startLoading();
  try {
    const response = await fetch(`${bas_url}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
    const data = await response.json();
    success(data);
  } catch (err) {
    console.error('There has been a problem with your fetch operation:', err);
    error(err);
  } finally {
    stopLoading();
  }
}