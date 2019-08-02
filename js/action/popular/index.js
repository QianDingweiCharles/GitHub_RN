import types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData, _projectModels } from '../util'

export function onRefreshPopular (storeName, url, pageSize, favoriteDao) {
  return dispatch => {
    dispatch({ type: types.POPULAR_REFRESH, storeName })
    const dataStore = new DataStore()
    dataStore
      .fetchData(url, FLAG_STORAGE.flag_popular)
      .then(data => {
        handleData(types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao)
      })
      .catch(err => {
        dispatch({ type: types.POPULAR_REFRESH_FAIL, storeName, err })
      })
  }
}

export function onLoadMorePopular (storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
  const dataLength = dataArray.length
  console.log("action popular:", dataArray.length)
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
          pageIndex: --pageIndex
        })
      } else {
        const max = pageIndex * pageSize > dataLength ? dataLength : pageIndex * pageSize
        _projectModels(dataArray.slice(0, max), favoriteDao, data => {
          dispatch({
            type: types.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModes: dataArray.slice(0, max)
          })
        })
      }
    }, 200)
  }
}
