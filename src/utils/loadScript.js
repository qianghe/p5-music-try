const loadScript = (url, cb) => {
	const script = document.createElement('script')
	script.src = url
	script.async = true
	document.body.appendChild(script)
	
	return new Promise(resolve => {
		script.onload = () => {
			if (typeof cb === 'function') cb()
			resolve()
		}
		// document.removeChild(script)
	})
}

export const loadModule = async (url, moduleName) => {
	await loadScript(url)
	return window[moduleName]
}