module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false'
  },
  server: {
    command: 'npm run serve',
    port: 8080,
  },
};