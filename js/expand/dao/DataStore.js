import { AsyncStorage } from 'react-native'

export default class DataStore {
  static checkTimestampValid(timeStamp) {
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timeStamp)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if (currentDate.getHours() - targetDate.getHours() > 4) return false
    return true
  }

  fetchData(url) {
    console.log('fetchData1:', url)
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          console.log('fetchData2:', url)
          if (wrapData && DataStore.checkTimestampValid(wrapData.timeStamp)) {
            console.log('fetchData3:', url)
            resolve(wrapData)
          } else {
            console.log('fetchData4:', url)
            this.fetchNetData(url)
              .then(data => {
                console.log('fetchData5:', data)
                resolve(this._wrapData(data))
                console.log('resolve:', url)
              })
              .catch(err => {
                console.log('here error:', err)
                reject(err)
              })
          }
        })
        .catch(error => {
          console.log('fetchData6:', url)
          this.fetchNetData(url)
            .then(data => {
              console.log('fetchData7:', url)
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
    return { data, timeStamp: new Date().getTime() }
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
    console.log('fetchData8:', url)
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          console.log('fetchData9:', url)
          if (response.ok) {
            console.log('fetchData10:', url)
            console.log('response.json()：', response)
            return response
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
