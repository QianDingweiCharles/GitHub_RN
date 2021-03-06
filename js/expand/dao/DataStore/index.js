import { AsyncStorage } from 'react-native'
import axios from 'axios'
import GitHubTrending from 'GitHubTrending'

export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending'
}

export default class DataStore {
  static checkTimestampValid (timeStamp) {
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timeStamp)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if (currentDate.getHours() - targetDate.getHours() > 4) return false
    return true
  }

  fetchData (url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timeStamp)) {
            console.log('old Local data:------>', wrapData)
            resolve(wrapData)
          } else {
            this.fetchNetData(url, flag)
              .then(data => {
                console.log('new Network data:------>', this._wrapData(data))
                resolve(this._wrapData(data))
              })
              .catch(err => {
                reject(err)
              })
          }
        })
        .catch(() => {
          this.fetchNetData(url, flag)
            .then(data => {
              resolve(this._wrapData(data))
            })
            .catch(err => {
              reject(err)
            })
        })
    })
  }

  saveData (url, data, callBack) {
    if (!data || !url) return
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callBack)
  }

  _wrapData (data) {
    return { data, timeStamp: new Date().getTime() }
  }

  fetchLocalData (url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
            console.error(e)
          }
        } else {
          reject(error)
          console.error(error)
        }
      })
    })
  }

  fetchNetData (url, flag) {
    if (flag !== FLAG_STORAGE.flag_trending) {
      return axios
        .get(url)
        .then(response => {
          if (response.status === 200 && response.data) {
            return response.data
          }
          throw new Error('NetWork response was not ok')
        })
        .then(responseData => {
          this.saveData(url, responseData)
          return responseData
        })
    } else {
      new GitHubTrending().fetchTrending(url)
        .then((items) => {
          if (!items) {
            throw new Error('resopnse is null')
          }
          this.saveData(url, items)
          return items
        }).catch((error) => {
          console.log('GitHubTrending Error', error)
        })
    }
  }

  //   fetchNetData(url) {
  //     console.log('fetchData8:', url)
  //     return new Promise((resolve, reject) => {
  //       fetch(url)
  //         .then(response => {
  //           console.log('fetchData9:', url)
  //           if (response.ok) {
  //             console.log('fetchData10:', url)
  //             console.log('response.json()：', response)
  //             return response
  //           }
  //           throw new Error('NetWork response was not ok')
  //         })
  //         .then(responseData => {
  //           this.saveData(url, responseData)
  //           resolve(responseData)
  //         })
  //         .catch(err => {
  //           reject(err)
  //         })
  //     })
  //   }
}
