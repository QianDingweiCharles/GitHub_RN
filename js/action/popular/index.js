import types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'

import { handleData } from '../util'

export function onRefreshPopular (storeName, url, pageSize) {
  return dispatch => {
    dispatch({ type: types.POPULAR_REFRESH, storeName })
    const dataStore = new DataStore()
    dataStore
      .fetchData(url, FLAG_STORAGE.flag_popular)
      .then(data => {
        handleData(types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      })
      .catch(err => {
        dispatch({ type: types.POPULAR_REFRESH_FAIL, storeName, err })
      })
  }
}

export function onLoadMorePopular (storeName, pageIndex, pageSize, dataArray = [], callBack) {
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
        const max = pageIndex * pageSize > dataLength ? dataLength : pageIndex * pageSize
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
