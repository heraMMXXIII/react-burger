import { DOMAIN } from "./api";
import { checkResponse } from "./requests";

const API = "/api/ingredients";
const STATUS_OK = 200;

export function dataLoad() {
  return fetch(`${DOMAIN}${API}`)
    .then(checkResponse)
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
