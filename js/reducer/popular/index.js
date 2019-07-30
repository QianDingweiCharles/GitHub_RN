import types from '../../action/types'

// store树:
// pupular: {
//     java: {
//         items: [],
//         isLoading: false
//     },
//     ios: {
//         items: [],
//         isLoading: false
//     }
// }
const defaultState = {}
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case types.POPULAR_REFRESH_SUCCESS: // 下拉刷新成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          projectModes: action.projectModes,
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case types.POPULAR_REFRESH: // 下拉刷新
      return {
        ...state,
        isLoading: true,
        hideLoadingMore: false,
      }
    case types.POPULAR_REFRESH_FAIL: //下拉刷新失败
      return {
        ...state,
        ...state[action.storeName],
        isLoading: false
      }
    case types.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case types.POPULAR_LOAD_MORE_FAIL: //下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      }
    default:
      return state
  }
}
