const baseConfig = {
  csrfTokenName: 'CRAFT_CSRF_TOKEN',
}

export const sendActionRequest = async (url, data) => {
  return null;
}


export function createActionApi({baseUrl = '/'}) {
  const csrfTokenName = baseConfig.csrfTokenName;
  let csrfTokenValue = null;

  const getCsrfToken = async () => {
    const response = await fetch(`${normalizePath(baseUrl)}/users/session-info`, {
      headers: {
        'Accept': 'application/json',
      }
    })

    const data = await response.json();
    console.log('getCsrfToken', {data});
    return data;
  }

  function normalizePath(path) {
    let normalized = path;
    if (path.startsWith('/')) {
      normalized = normalized.substring(1);
    }

    if (path.endsWith('/')) {
      normalized = normalized.substring(0, path.length - 1);
    }

    return normalized;
  }

  /**
   *
   * @param {string} url
   * @param {RequestInit} requestInit
   * @returns {Promise<any|null>}
   */
  const sendActionRequest = async (
    path,
    requestInit = {},
    options = {},
  ) => {
    const config = {
      csrfTokenName: 'CRAFT_CSRF_TOKEN',
      ...options
    }
    const {body, headers, ...rest} = requestInit;
    /**
     * @type {RequestInit}
     */
    const requestConfig = {
      headers: {
        ...headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      ...rest,
    }

    if (!csrfTokenValue) {
      const csrfData = await getCsrfToken();
      csrfTokenValue = csrfData.csrfTokenValue;
    }

    requestConfig.headers['X-CSRF-Token'] = csrfTokenValue;

    if (body) {
      requestConfig.method = 'POST';
    }

    console.log({requestConfig});

    const response = await fetch(`${normalizePath(baseUrl)}/${normalizePath(path)}`, requestConfig);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();

    console.log(json);

    return json;
  };

  return {sendActionRequest};
}
