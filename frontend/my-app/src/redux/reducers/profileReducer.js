// reducers/profileReducer.js

import { SET_PROFILES, SET_TOTAL_PAGES, SET_SEARCH, SET_FILTERS, SET_PAGE } from '../actions/profileActions';

const initialState = {
  profiles: [],
  totalPages: 1,
  search: '',
  filters: { city: '', state: '', country: '' },
  page: 1,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return { ...state, profiles: action.payload };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case SET_FILTERS:
      return { ...state, filters: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
