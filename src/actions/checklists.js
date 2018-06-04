import { dispatchUpdateResourcesByID } from "../redux-data";
import API from "../api";

const fetchChecklistRequestAction = () => {
  return {
    type: "FETCH_CHECKLISTS_REQUEST"
  };
};

const fetchChecklistsSuccessAction = checklists => {
  return {
    type: "FETCH_CHECKLISTS_SUCCESS",
    payload: checklists
  };
};

const fetchChecklistsErrorAction = errorMessage => {
  return {
    type: "FETCH_CHECKLISTS_ERROR",
    payload: { errorMessage },
    error: true
  };
};

export function fetchChecklists() {
  return async dispatch => {
    try {
      dispatch(fetchChecklistRequestAction());
      // Users fetch however they want
      const checklists = await API.fetchChecklists();

      dispatchUpdateResourcesByID(dispatch, { jsonApiPayload: checklists });
    } catch (error) {
      console.log(error);
      dispatch(fetchChecklistsErrorAction(error));
    }
  };
}
