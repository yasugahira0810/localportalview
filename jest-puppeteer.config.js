module.exports = {
  launch: {
    dumpio: true,
    headless: false
  },
  server: {
    command: 'BROWSER=none npm run serve',
    port: 8080,
  },
};