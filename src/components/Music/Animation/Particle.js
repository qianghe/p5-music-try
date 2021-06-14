import { getRandomColor } from './util'

export default class Particle {
	constructor(p5Module, p5Instanced, r) {
		this.instance = p5Instanced
		this.module = p5Module
		
		this.pos = this.module.Vector.random2D().mult(r)
		this.vel = this.instance.createVector(0, 0)
		this.acc = this.pos.copy().mult(this.instance.random(0.0001, 0.00001))

		this.w = this.instance.random(3, 6)
		this.color = getRandomColor(this.instance)
	}

	update(enhance) {
		this.vel.add(this.acc)
		this.pos.add(this.vel)

		if (enhance) {
			this.pos.add(this.vel)
			this.pos.add(this.vel)
			this.pos.add(this.vel)
		}
	}
	
	show() {
		this.instance.noStroke()
		this.instance.fill(this.color)
		this.instance.ellipse(this.pos.x, this.pos.y, this.w)
	}
	// 检测是否超出视窗边界
	overEdge() {
		const { x, y } = this.pos
		const { width, height } = this.instance
		if (
			(x <= -width/2 || x >= width/2) ||
			(y <= -height/2 || y >= height/2)
		) return true
		return false
	}
}

export const createPartical = (...args) => new Particle(...args)

