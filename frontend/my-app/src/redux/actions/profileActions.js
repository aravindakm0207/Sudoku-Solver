export const SET_PROFILES = 'SET_PROFILES';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_PAGE = 'SET_PAGE';

import axios from 'axios';


const API_URL = 'http://localhost:4000/profiles';
s
export const setProfiles = (profiles) => ({
  type: SET_PROFILES,
  payload: profiles,
});


export const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
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
    const response = await axios.get(API_URL, {
      params: { search, page, ...filters },
    });

    dispatch(setProfiles(response.data.data));
    dispatch(setTotalPages(response.data.pages));
  } catch (error) {
    console.error('Error fetching profiles:', error);
  }
};