import superjson from 'superjson';
import {
  IServerError,
  IServerError__Schema,
  ServerError,
} from '../../model/server-error';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

export type HttpHeaders = Record<string, string>;

export type Config<T = any, R = any, B = any, TB = any> = {
  method: HttpMethod;
  body?: B;
  headers?: HttpHeaders;
  query?: Record<string, string | undefined>;
  bodyParser?: (data: B) => TB;
  responseParser?: (data: T) => R;
};

// Function for fetching data
export const sendRequest =
  <T, R = any, B = any, TB = any>(
    url: string,
    {
      method,
      body,
      headers = {},
      query = {},
      bodyParser = (r) => r as unknown as TB,
      responseParser = (r) => r as unknown as R,
    }: Config<T, R, B, TB> = { method: 'GET' }
  ) =>
  async (newBody?: B): Promise<R> => {
    // Start configuring request
    // Set HTTP Method
    const _method: HttpMethod = (() => {
      if (method) {
        return method;
      }
      if (body) {
        return 'POST';
      }
      return 'GET';
    })();

    // Convert body to JSON
    const _body = (() => {
      if (_method === 'GET' || (!body && !newBody)) {
        return undefined;
      }
      const b = body || newBody;
      return JSON.stringify(bodyParser(b!));
    })();

    // Setup Headers
    const _headers: HttpHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Setup query params
    const fullUrl = (() => {
      const qp = Object.entries(query);

      if (qp.length > 0) {
        const params = qp
          .flatMap(([param, value]) =>
            value !== undefined ? `${param}=${encodeURIComponent(value)}` : []
          )
          .join('&');
        return `${url}?${params}`;
      }
      return url;
    })();

    let response: any;
    let responseData: any;
    try {
      // Make HTTP Request
      response = await fetch(fullUrl, {
        headers: _headers,
        method: _method,
        body: _body,
      });

      // Convert to json
      responseData = await response.json();
    } catch (error: any) {
      console.log(error?.message ?? 'Something went wrong');
      throw new ServerError(
        500,
        'Възникна грешка. Опитайте отново',
        error?.message ?? 'Something went wrong'
      );
    }

    const actualData =
      'json' in responseData
        ? superjson.parse(responseData.json)
        : responseData;

    if (!response.ok) {
      let err: IServerError;
      try {
        err = IServerError__Schema.parse(actualData);
      } catch (error: any) {
        console.log(
          error?.message ??
            'Fetch response was not ok. Error parsing response data as ServerError'
        );
        throw new ServerError(
          500,
          'Грешка при комуникация със сървъра. Опитайте отново',
          error?.message ??
            'Fetch response was not ok. Error parsing response data as ServerError'
        );
      }
      console.log(err.fullMessage);

      throw err;
    }

    return responseParser(actualData);
  };
