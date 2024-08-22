import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { getEventMessage } from '../../utils/message';

import type { AppDispatch, RootState, wsActionsTypes } from '../../utils/types';
export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';

    return next => (action: AnyAction) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.url;
        if (action.addToken) {
          url += `?token=${getCookie('accessToken')}`;
        }

        let attempt = 0;
        const maxAttempts = 10;
        const connectSocket = () => {
          try {
            socket = new WebSocket(url);
            isWsConnected = true;
            window.clearTimeout(timerWsReconnect);
            dispatch({ type: wsActions.onSuccess });
          } catch (error) {
            attempt++;
            if (attempt < maxAttempts) {
              setTimeout(connectSocket, 1000);
            } else {
              dispatch({ type: wsActions.onError, error: 'Не удалось установить соединение после нескольких попыток' });
            }
          }
        };

        connectSocket();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.onOpen });
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch({ type: wsActions.onError, error: getEventMessage(event) });
          }
          if (isWsConnected) {
            dispatch({ type: wsActions.onClosed });
            timerWsReconnect = window.setTimeout(() => {
              dispatch({ type: wsActions.onStart, url: url });
            }, 3000);
          }
          socket = null;
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!parsedData?.success) {
            if (parsedData?.message === 'Invalid or missing token') {
              refreshToken();
            }
            dispatch({ type: wsActions.onError, error: parsedData?.message });
          } else {
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: wsActions.onMessage, message: restParsedData });
          }
        };

        socket.onerror = event => {
          dispatch({ type: wsActions.onError, error: getEventMessage(event) });
        };

        if (action.type === wsActions.onDisconnect) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket?.close();
          dispatch({ type: wsActions.onClosed });
          socket = null; 
        }
      }

      next(action);
    };
  };
};