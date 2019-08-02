import { AsyncStorage } from 'react-native'
const FAVORITE_KEY_PREFIX = 'favorite_'
export default class FavoriteDao {
  constructor (flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag
  }

  saveFavoriteItem(key, value, callBack){
    AsyncStorage.setItem(key, value, (error, result) => {
        if(!error){
            this.updateFavoriteKey(key, true)
        }
    })
  }

  updateFavoriteKey = (key, isAdd) => {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if(!error){
            let favoriteKeys = []
            if(result){
                favoriteKeys = JSON.parse(result)
            }
            let index = favoriteKeys.indexOf(key)
            if(isAdd){
                if(index === -1){
                    favoriteKeys.push(key)
                }
            }else{
                if(index !==-1){
                    favoriteKeys.splice(index, 1)
                }
            }
            AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
        }
    })
  }

  getFavoriteKeys = () =>{
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(this.favoriteKey, (error, result)=>{
            if(!error){
                try{
                    resolve(JSON.parse(result))
                }catch(e){
                    reject(error)
                }
            }else{
                reject(error)
            }
        })
      })
  }

  removeFavoriteItem = (key) => {
      AsyncStorage.removeItem(key, (error, result) => {
          if(!error){
              this.updateFavoriteKey(key, false)
          }
      })
  }

  getAllItems = () => {
      return this.Promise((resolve, reject) => {
          this.getFavoriteKeys().then((keys)=>{
              let items = []
              if(keys){
                  AsyncStorage.multiGet(keys, (err, stores)=> {
                      try{
                          stores.map((result, i, store) => {
                              let key = store[i][0]
                              let value = store[i][0]
                              if(value){
                                  items.push(JSON.parse(value))
                              }
                          })
                          resolve(items)
                      }catch(e){
                          reject(e)
                      }
                  })
              }else{
                  resolve(items)
              }
          }).catch(e => {
              reject(e)
          })
      })
  }
}
