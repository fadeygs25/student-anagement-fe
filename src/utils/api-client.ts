export function useApiClient() {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();

  const makeClient = () => {
    return $fetch.create({
      baseURL: config.public.API_BASE_URL,
      async onRequest() {
        nuxtApp.callHook('page:loading:start');
      },
      async onResponse() {
        nuxtApp.callHook('page:loading:end');
      },
    });
  };

  const client = makeClient();

  const get = (url: string, params: Object = {}) => {
    return client(url, {
      method: 'GET',
      query: params,
    });
  };

  const post = (url: string, data: Object = {}) => {
    return client(url, {
      method: 'POST',
      body: data,
    });
  };

  const put = (url: string, data: Object = {}) => {
    return client(url, {
      method: 'PUT',
      body: data,
    });
  };

  const patch = (url: string, data: Object = {}) => {
    return client(url, {
      method: 'PATCH',
      body: data,
    });
  };

  const del = (url: string, data: Object = {}) => {
    return client(url, {
      method: 'DELETE',
      body: data,
    });
  };

  return { get, post, put, patch, del };
}