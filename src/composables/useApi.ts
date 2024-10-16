import { TOKEN_KEY } from '~/constants/authentication';
import { LOGIN_ROUTE, NOT_FOUND_ROUTE } from '~/constants/portal-routes';
import * as StatusCode from '~/constants/status-code';
import {
  CODE,
} from '~/constants/currency';

const config = useRuntimeConfig();
const nuxtApp = useNuxtApp();

export function useAPI<T>(
  url: string | (() => string),
  options: any
) {
  return useFetch(`${config.public.API_BASE_URL}/${url}`, {
    ...options,
    server: false,
    onRequest({ request, options }) {
      options.headers = options.headers || {};
      const token = getToken(TOKEN_KEY);
      Object.assign(options.headers, {
        'X-Tansocart-Client': config.public.API_TENAND_ID,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Lang': nuxtApp.$i18n.locale.value || nuxtApp.$i18n.fallbackLocale.value,
        'Currency': getCurrency() || CODE.yen
      });
    },
    onRequestError({ request: FetchRequest, options, error }) {
      toastError(
        nuxtApp.$i18n.t('portal.common.message.summaryError'),
        nuxtApp.$i18n.t('portal.common.message.serverError')
      );
    },

    onResponse({ request: FetchRequest, response, options }) {
      return response._data;
    },
    onResponseError({ request: FetchRequest, response, options }) {
      switch (response.status) {
        case StatusCode.INTERNAL_SERVER_ERROR:
        case StatusCode.SERVICE_UNAVAILABLE:
        case StatusCode.GATEWAY_TIMEOUT:
          toastError(
            nuxtApp.$i18n.t('portal.common.message.summaryError'),
            nuxtApp.$i18n.t('portal.common.message.serverError')
          );
          break;
        case StatusCode.UNAUTHENTICATED:
          removeToken(TOKEN_KEY);
          toastError(
            nuxtApp.$i18n.t('portal.common.message.summaryError'),
            nuxtApp.$i18n.t('portal.common.message.unauthenticated')
          );
          navigateTo(LOGIN_ROUTE, { external: true });
          break;
        case StatusCode.FORBIDDEN:
          toastError(
            nuxtApp.$i18n.t('portal.common.message.summaryError'),
            nuxtApp.$i18n.t(response._data.message)
          );
          break;
        case StatusCode.NOT_FOUND:
          toastError(
            nuxtApp.$i18n.t('portal.common.message.summaryError'),
            nuxtApp.$i18n.t(response._data.message)
          );
          throw showError({
            statusCode: StatusCode.NOT_FOUND
          });
        case StatusCode.BAD_REQUEST:
          toastError(
            nuxtApp.$i18n.t('portal.common.message.summaryError'),
            nuxtApp.$i18n.t(`portal.common.message.${response._data.message}`)
          );
          break;
        default:
          break;
      }
    }
  });
}

