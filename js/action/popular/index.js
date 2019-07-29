import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

export function onLoadPopularData(storeName, url) {
  return dispatch => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName })
    let dataStore = new DataStore()
    dataStore
      .fetchData(url)
      .then(data => {
        handleData(dispatch, storeName, data)
      })
      .catch(err => {
        console.log('Error in pupular.js:', err)
        dispatch({ type: Types.LOAD_POPULAR_FAIL, storeName, err })
      })
  }
}

function handleData(dispatch, storeName, data) {
  dispatch({
    type: Types.LOAD_POPULAR_SUCCESS,
    item: data && data.data && data.data.items,
    storeName
  })
}
