'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./paths.cjs')

// Make sure that including paths.cjs after env.cjs will read .env variables.
delete require.cache[require.resolve('./paths')]

const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  paths.dotenv
].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile
      })
    )
  }
})

const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter)

const REACT_APP = /^REACT_APP_/i

function getClientEnvironment (publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_URL: publicUrl,
        FAST_REFRESH: process.env.FAST_REFRESH !== 'false'
      }
    )

  return { raw }
}

module.exports = getClientEnvironment
