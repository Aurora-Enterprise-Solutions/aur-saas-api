import nodePlop from 'node-plop'

const { pathname: root } = new URL('plopfile.js', import.meta.url)

const plopClient = await nodePlop(root)

export default plopClient
