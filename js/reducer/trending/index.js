import Types from '../../action/types'

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
    case Types.TRENDING_REFRESH_SUCCESS: // 下拉刷新成功
      console.log("Reducer here 1------------>")
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
    case Types.TRENDING_REFRESH: // 下拉刷新
      console.log("Reducer here 1------------>")

      return {
        ...state,
        isLoading: true,
        hideLoadingMore: false,
      }
    case Types.TRENDING_REFRESH_FAIL: //下拉刷新失败
      console.log("Reducer here 1------------>")

      return {
        ...state,
        ...state[action.storeName],
        isLoading: false
      }
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      console.log("Reducer here 1------------>")

      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.TRENDING_LOAD_MORE_FAIL: //下拉刷新失败
      console.log("Reducer here 1------------>")

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
