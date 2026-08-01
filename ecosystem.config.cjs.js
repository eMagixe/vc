module.exports = {
  apps: [
    {
      name: 'Express Taxi',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
