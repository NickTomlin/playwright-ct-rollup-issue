// this runs `vite` in CJS compatibility mode
// node vanilla-build.js
const vite = require('vite')

async function main () {
  await vite.build({})
}

main()
