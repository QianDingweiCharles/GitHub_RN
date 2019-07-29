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
    case types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...[action.storeName],
          items: action.items,
          isLoading: false
        }
      }
    case types.POPULAR_REFRESH:
      return {
        ...state,
        isLoading: true
      }
    case types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        ...[action.storeName],
        isLoading: false
      }
    default:
      return state
  }
}
