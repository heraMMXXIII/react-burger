import { v4 as uuid } from "uuid";
import { ADD_INGREDIENT } from "./actions/burger-constructor";


export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...item,
      uniqueId: uuid() 
    }
  };
};
