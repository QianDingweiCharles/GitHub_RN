import { AsyncStorage } from 'react-native'

export default class DataStore {
  static checkTimestampValid(timeStamp) {
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timestamp)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if (currentDate.getHours() - targetDate.getHours() > 4) return false
    return true
  }

  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timeStamp)) {
            resolve(wrapData)
          } else {
            this.fetchNetData(url)
              .then(data => {
                resolve(this._wrapData(data))
              })
              .catch(err => {
                reject(err)
              })
          }
        })
        .catch(error => {
          this.fetchNetData(url)
            .then(data => {
              resolve(this._wrapData(data))
            })
            .catch(err => {
              reject(err)
            })
        })
    })
  }

  saveData(url, data, callBack) {
    if (!data || !url) return
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callBack)
  }

  _wrapData(data) {
    return { data, timeStamp: new Date.getTime() }
  }

  fetchLocalData(url) {
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

  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('NetWork response was not ok')
        })
        .then(responseData => {
          this.saveData(url, responseData)
          resolve(responseData)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
