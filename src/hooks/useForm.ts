import {
  useState,
  useCallback,
  FormEventHandler,
  FormEvent,
  ChangeEvent,
} from "react";

// Функция useForm принимает начальное состояние и коллбэк для отправки данных
export function useForm<T extends { wasSubmit?: boolean }>(
  initialState: T,
  submitCb: (e: T) => void
) {
  // Создаем состояние формы
  const [state, setState] = useState(initialState);

  // Обработчик события отправки формы
  const onSubmit = useCallback<FormEventHandler>(
    (e: FormEvent) => {
      e.preventDefault(); // Отменяем стандартное поведение формы
      if (submitCb) {
        const statePure = { ...state }; // Копируем текущее состояние
        delete statePure.wasSubmit; // Удаляем свойство wasSubmit перед отправкой
        submitCb(statePure); // Вызываем коллбэк отправки с очищенным состоянием
        setState({ ...state, wasSubmit: true }); // Устанавливаем флаг wasSubmit в true после отправки
      }
    },
    [state, submitCb] // Хук будет зависеть от состояния и коллбэка
  );

  // Обработчик изменения полей формы
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name; // Получаем имя изменяемого поля
      const value = e.target.value; // Получаем новое значение этого поля
      setState({ ...state, [name]: value }); // Обновляем состояние формы с новым значением
    },
    [state] // Хук зависит от текущего состояния
  );

  // Возвращаем текущее состояние, функцию его обновления, а также обработчики изменения и отправки формы
  return { state, setState, onSubmit, onChange };
}
