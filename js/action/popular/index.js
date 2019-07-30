import Types from '../types'
import DataStore from '../../expand/dao/DataStore'
import types from '../types';

export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({ type: Types.POPULAR_REFRESH, storeName })
    let dataStore = new DataStore()
    dataStore
      .fetchData(url)
      .then(data => {
        handleData(dispatch, storeName, data, pageSize)
      })
      .catch(err => {
        dispatch({ type: Types.POPULAR_REFRESH_FAIL, storeName, err })
      })
  }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
  const dataLength = dataArray.length
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataLength) {
        if (typeof callBack === 'function') {
          callBack('no moreData')
        }
        dispatch({
          type: types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        let max = pageIndex * pageSize > dataLength ? dataLength : pageIndex * pageSize
        dispatch({
          type: types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 200)
  }
}

function handleData(dispatch, storeName, data, pageSize) {
  let fixItems = []
  if (data && data.data && data.data.items) {
    fixItems = data.data.items
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    pageIndex: 1
  })
}
