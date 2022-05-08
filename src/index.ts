import type { Plugin } from 'vite'
import { join } from 'path'

const RESOLVE_PLUGIN_NAME = 'vite:resolve'
const VITE_PLUGIN_NAME = 'vite-plugin-resolve-inject'

function PluginResolveInject(): Plugin {
    let resolvePlugin: Plugin | undefined
    let root: string

    return {
        name: VITE_PLUGIN_NAME,
        enforce: 'post',
        configResolved(config) {
            resolvePlugin = config.plugins.find(p => p.name === RESOLVE_PLUGIN_NAME)
            root = config.root
        },
        async resolveId(id, ...args) {
            // 重写路径尝试去node_modules中解析
            // PR: https://github.com/vitejs/vite/pull/8015
            const tryPath = join(root, `/node_modules/${id}`)
            if (resolvePlugin && resolvePlugin.resolveId) {
                const res = await resolvePlugin.resolveId.call(this, tryPath, ...args)
                return res
            }
            return id
        }
    }
}

export default PluginResolveInject
