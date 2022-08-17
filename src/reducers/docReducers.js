import {
  DOC_LIST_FAIL,
  DOC_LIST_REQUEST,
  DOC_LIST_SUCCESS,
} from '../constants/docConstants'

export const listDocsReducer = (state = { docs: [] }, action) => {
  switch (action.type) {
    case DOC_LIST_REQUEST:
      return { loading: true, ...state }
    case DOC_LIST_SUCCESS:
      return { loading: false, docs: action.payload }
    case DOC_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
