import { DOMAIN } from "./api-constants";

const API = "/api/ingredients";
const STATUS_OK = 200;

export function dataLoad() {
  return fetch(`${DOMAIN}${API}`)
  .then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
})
    .then((res) => {
      if (!res.success) {
        throw Error("В json-ответе success !== true");
      }

      if (res.data && res.data.length > 0) {
        return Promise.resolve(res.data);
      } else {
        throw Error("возвращен пустой или некорректный набор данных");
      }
    });
}
