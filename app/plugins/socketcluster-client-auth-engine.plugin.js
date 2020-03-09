import * as appSettings from 'tns-core-modules/application-settings'

export default {
  saveToken(name, token, options, callback) {
    appSettings.setString(name, token)
    appSettings.flush()

    if (callback && typeof callback === 'function') {
      return callback(null, token)
    }
    else {
      return Promise.resolve(token)
    }
  },

  removeToken(name, callback) {
    const token = appSettings.getString(name)
    appSettings.remove(name)
    appSettings.flush()

    if (callback && typeof callback === 'function') {
      return callback(null, token)
    }
    else {
      return Promise.resolve(token)
    }
  },

  loadToken(name, callback) {
    const token = appSettings.getString(name) || null

    if (callback && typeof callback === 'function') {
      return callback(null, token)
    }
    else {
      return Promise.resolve(token)
    }
  },
}