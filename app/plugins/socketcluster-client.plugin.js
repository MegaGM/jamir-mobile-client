import 'nativescript-websockets'
import socketCluster from '../libs/socketcluster.min'
import authEngine from './socketcluster-client-auth-engine.plugin'

export default {
  install(Vue, options) {
    return new Promise((resolve, reject) => {
      let scSocket = null
      const scOptions = {
        authEngine,
        query: {
          authKey: 'CLIENTWEBAUTHKEY',
        },
        autoReconnectOptions: {
          initialDelay: 1000,
          maxDelay: 5000,
          multiplier: 1,
          randomness: 200,
        },
        // FIXME: change for production
        ackTimeout: 5 * 60 * 1000,
        secure: false,
        // port: 8000,
        // hostname: '192.168.0.100',
        host: '192.168.0.100:8000',
      }
      if (options)
        Object.assign(scOptions, options)

      try {
        scSocket = socketCluster.create(scOptions)
        Vue.prototype.$socket = scSocket
        Vue.$socket = scSocket
      } catch (err) {
        console.error('[ERROR] [sc-vue] connection failure', err)
      }

      scSocket.on('connect', () => {
        console.info('[sc-vue] socket connected')
        resolve(scSocket)
      })

      scSocket.on('disconnect', () => {
        console.info('[sc-vue] socket disconnected')
      })

      scSocket.on('error', (err) => {
        if (err.code === 1006) {
          console.info('[sc-vue] socket is not connected')
        }
        else {
          console.error(err)
        }
      })
    })
  }
}