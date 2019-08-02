import ProjectModel from '../../model/ProjectModel'
import Utils from '../../common/Utils'

export function handleData (actionType, dispatch, storeName, data, pageSize, favoriteDao) {
  let fixItems = []
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items
    }
  }
  const showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize)
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      items: fixItems,
      projectModes: projectModels,
      storeName,
      pageIndex: 1
    })
  })
}

export async function _projectModels (showItems, favoriteDao, callBack) {
  let keys = []
  try {
    keys = await favoriteDao.getFavoriteKeys()
  } catch (e) {
    console.log(e)
  }
  const projectModels = []

  for (let i = 0, len = showItems.length; i < len; i++) {
    const item = showItems[i]
    projectModels.push(new ProjectModel(item, Utils.checkFavorite(item, keys)))
  }
  if (typeof callBack === 'function') {
    callBack(projectModels)
  }
}
