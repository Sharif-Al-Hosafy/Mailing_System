import {
  DOC_LIST_FAIL,
  DOC_LIST_REQUEST,
  DOC_LIST_SUCCESS,
} from '../constants/docConstants'
import axios from 'axios'

export const listDocs = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOC_LIST_REQUEST })

    const { data } = await axios.get(`/api/v1/files/daily/show/${id}`)

    dispatch({
      type: DOC_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOC_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
