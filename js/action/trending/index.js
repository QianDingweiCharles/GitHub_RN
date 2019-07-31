import Types from '../types'
import DataStore from '../../expand/dao/DataStore'
import { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData } from '../util'


export function onRefreshTrending(storeName, url, pageSize) {
    return dispatch => {
        dispatch({ type: Types.TRENDING_REFRESH, storeName })
        let dataStore = new DataStore()
        dataStore
            .fetchData(url, FLAG_STORAGE.flag_trending)
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
            })
            .catch(err => {
                dispatch({ type: Types.Trending_REFRESH_FAIL, storeName, err })
            })
    }
}

export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    const dataLength = dataArray.length
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataLength) {
                if (typeof callBack === 'function') {
                    callBack('no moreData')
                }
                dispatch({
                    type: Types.Trending_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                let max = pageIndex * pageSize > dataLength ? dataLength : pageIndex * pageSize
                dispatch({
                    type: Types.Trending_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 200)
    }
}
