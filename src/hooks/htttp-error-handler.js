import { useEffect, useState } from 'react';

export default httpClient => {
  let reqInterceptor = null;
  let resInterceptor = null;

  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, httpClient]);

  reqInterceptor = httpClient.interceptors.request.use(reqConfig => {
    setError(null);
    return reqConfig;
  });
  resInterceptor = httpClient.interceptors.response.use(
    response => response,
    err => {
      setError(err);
      return Promise.reject(err);
    });

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler]
}
