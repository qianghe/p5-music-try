import { loadModule } from '../../utils/loadScript'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.min.js';
const soundUrl = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/addons/p5.sound.js'

const p5ModuleSymbol = Symbol.for('p5Module')
const p5 = {
	subs: [],
	excute(fn) {
		if (typeof fn === 'function') {
			if (!p5[p5ModuleSymbol]) {
				p5.subs.push(fn)
				return
			}

			fn.call(p5[p5ModuleSymbol])
		}
	},
	[p5ModuleSymbol]: null
}

const p5Proxy = new Proxy(p5, {
	get(target, propKey) {
		if (target.hasOwnProperty(propKey)) {
			return Reflect.get(target, propKey)
		}
		console.log('get prop not work')
		return false
	},
	set(target, propKey, val) {
		target[propKey] = val
		if (propKey === p5ModuleSymbol) {
			setTimeout(() => {
				const p5Module = val
				target.subs.forEach((sub) => {
					sub(p5Module)
				})
				target.subs = []
			}, 100)
		}
		return true
	}
})
// eslint-disable-next-line no-unused-expressions
;(async function() {
	const p5Module = await loadModule(url, 'p5')
	const p5SoundModule = await loadModule(soundUrl, 'p5Sound')
	
	p5Proxy[p5ModuleSymbol] = Object.assign(p5Module, p5SoundModule)
})()

export default p5Proxy

