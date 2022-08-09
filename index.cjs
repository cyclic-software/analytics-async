const axios = require('axios')
const { v4: uuid } = require('uuid');
const md5 = require('md5')

const LIBRARY_VERSION = process.env.npm_package_version || 'unknown'
const LIBRARY_NAME = process.env.npm_package_name || 'analytics-async'

export async function track(msg) {
  return call('track', msg)
}

export async function identify(msg) {
  return call('identify', msg)
}

async function call(type, message) {

  message = Object.assign({}, message)
  message.context = Object.assign({
    library: {
      name: LIBRARY_NAME,
      version: LIBRARY_VERSION
    }
  }, message.context)

  message._metadata = Object.assign({
    nodeVersion: process.versions.node
  }, message._metadata)

  if (!message.timestamp) {
    message.timestamp = new Date()
  }

  if (!message.messageId) {
    // We md5 the messaage to add more randomness. This is primarily meant
    // for use in the browser where the uuid package falls back to Math.random()
    // which is not a great source of randomness.
    // Borrowed from analytics.js (https://github.com/segment-integrations/analytics.js-integration-segmentio/blob/a20d2a2d222aeb3ab2a8c7e72280f1df2618440e/lib/index.js#L255-L256).
    message.messageId = `node-${md5(JSON.stringify(message))}-${uuid()}`
  }

  const headers = {
    'content-type': 'application/json',
    'user-agent': `${LIBRARY_NAME}/${LIBRARY_VERSION}`
  }

  const req = {
    auth: {
      username: process.env.SEGMENT_WRITE_KEY || 'Unset process.env.SEGMENT_WRITE_KEY'
    },
    headers
  }

  let p = axios.post(`https://api.segment.io/v1/${type}`, message, req)
  console.log(`${type} => ${message.userId}`)
  return p
}
