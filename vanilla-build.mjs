// node vanilla-build.mjs
// this runs `vite` in non legacy mode
import {build} from "vite"

async function main () {
  await build({})
}

main()
