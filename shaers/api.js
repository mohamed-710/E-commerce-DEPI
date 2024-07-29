const base_url = 'https://dummyjson.com/';

export default async function handleRemoteRequest(
  endpoint,
  success,
  error,
  startLoading,
  stopLoading
) {
  startLoading();
  try {
    const response = await fetch(`${base_url}${endpoint}`);
    if (response.ok) {
      const data = await response.json();
      success(data);
    }
    else {
      throw new Error('response was not ok: ');
    }
  }
  catch (err) {
    error(err);
  } finally {
    if(stopLoading&&typeof stopLoading==="function")
    stopLoading();
  }
}

async function getData(endpoint) {
  try {
    const res = await fetch(`${base_url}${endpoint}`);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error("something Error");
    }
  } catch (err) {
    return err;
  }
}

export async function getManyRequests(uiHandelrs, requestConfig) {
  const { startLoading, error, stopLoading } = uiHandelrs
  startLoading();
  try {
    const mappedRequest = requestConfig.map((item, index) =>
      getData(item.endpoint)
    );

    const results = await Promise.all(mappedRequest);


    results.forEach((item, index) => {
      if (item instanceof Error) {
        throw new Error("something Error");
      }
      requestConfig[index].success(item);
    });

    return results;
  }
  catch (err) {
    error(err);
  }
  finally {
    stopLoading();
  }
}