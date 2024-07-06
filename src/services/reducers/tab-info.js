import { BUN } from '../../utils/ingredient-types';
import { SET_TAB } from '../actions/tab-info';

const initialState = {
    tab: BUN
}

export function tabInfoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}

export const tabReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TAB:
        return {
          ...state,
          tab: action.tab,
        };
      default:
        return state;
    }
  };