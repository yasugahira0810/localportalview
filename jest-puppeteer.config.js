module.exports = {
  launch: {
    dumpio: true,
    headless: true
  },
  server: {
    command: 'HEADLESS=false npm run serve',
    port: 8080,
  },
};