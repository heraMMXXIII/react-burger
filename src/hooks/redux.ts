import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux"; // Импортируем хуки useDispatch и useSelector из react-redux
import { AppDispatch, RootState } from "../utils/types"; // Импортируем типы для Dispatch и состояния приложения

// Создаем типизированную версию хука useDispatch, который будет использовать AppDispatch
export const useDispatch = () => useDispatchRedux<AppDispatch>();

// Создаем типизированную версию хука useSelector, который будет использовать RootState
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
