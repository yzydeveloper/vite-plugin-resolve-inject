import type { Plugin } from 'vite'

const VITE_PLUGIN_NAME = 'vite-plugin-resolve-inject'

function PluginResolveInject(): Plugin {
    return {
        name: VITE_PLUGIN_NAME,
        enforce: 'post',
        resolveId(id) {
            // 重写路径尝试去node_modules中解析
            // PR: https://github.com/vitejs/vite/pull/8015
            return `/node_modules/${id}`
        }
    }
}

export default PluginResolveInject
