import axios from 'axios';

export const SET_PROFILES_SUCCESS = 'SET_PROFILES_SUCCESS';
export const SET_PROFILES_FAILURE = 'SET_PROFILES_FAILURE';
export const SET_TOTAL_PAGES_SUCCESS = 'SET_TOTAL_PAGES_SUCCESS';
export const SET_TOTAL_PAGES_FAILURE = 'SET_TOTAL_PAGES_FAILURE';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_PAGE = 'SET_PAGE';

const API_BASE_URL = 'http://localhost:4000'


export const setProfiles = (profiles) => ({
  type: SET_PROFILES_SUCCESS,
  payload: profiles,
});


export const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES_SUCCESS,
  payload: totalPages,
});


export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});


export const fetchProfiles = (search, page, filters) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${API_BASE_URL}/profiles`, {
      params: { search, page, ...filters },
      headers,
    });

    dispatch(setProfiles(response.data.data));
    dispatch(setTotalPages(response.data.pages));
  } catch (error) {
    dispatch({
      type: SET_PROFILES_FAILURE,
      payload: error.response?.data || error.message,
    });
    dispatch({
      type: SET_TOTAL_PAGES_FAILURE,
      payload: error.response?.data || error.message,
    });
    console.error('Error fetching profiles:', error);
  }
};
