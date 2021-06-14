/* eslint-disable */
import { getRandomColor, p5Events } from './util'
import { createPartical } from './Particle'

export default function (p5Module) {
	let song
	let img
	let fft
	let amp
	const particles = []
	const ENHANCE_FREQUENCE = 180
	const [innerR, outterR] = [100, 280]

	const events = {
		preload: (p) => {
			song = p.loadSound('./hq-music.mp3')
			img = p.loadImage('./bg.png')
		},
		setup: (p) => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.angleMode(p.DEGREES)
			p.imageMode(p.CENTER)
			p.rectMode(p.CENTER)
			fft = new p5Module.FFT(0.3)

			img.filter(p.BLUR, 2)
		},
		draw: (p) => {
			p.background(0)
			p.translate(p.width / 2, p.height / 2)

			// 频率节奏强度可视化
			fft.analyze()
			amp = fft.getEnergy(20, 200)
			
			// 效果只针对图片
			p.push()
			if (amp > ENHANCE_FREQUENCE) {
				p.rotate(p.random(-0.5, 0.5))
			}
			// 绘制图
			p.image(img, 0, 0, p.windowWidth, p.windowHeight)
			p.pop()


			// 明暗
			const alpha = p.map(amp, 0, 255, 100, 200)
			p.fill(0, alpha)
			p.noStroke()
			p.rect(0, 0, p.windowWidth, p.windowHeight)


			p.stroke(255)
			p.strokeWeight(3)
			p.noFill()

			// 圈圈
			const wave = fft.waveform()
			// 对称
			for (let t = -1; t <= 1; t += 2) {
				p.beginShape()

				for (let i = 0; i <= 180; i += 1) {
					const index = p.floor(p.map(i, 0, 181, 0, wave.length))
					const r = p.map(wave[index], -1, 1, innerR, outterR)
					
					const x = r * p.sin(i) * t
					const y = r * p.cos(i)
					
					p.stroke(getRandomColor(p))
					p.vertex(x, y)
				}
				p.endShape()
			}

			if(!song.isPlaying()) {
				p.noLoop()
			}

			// 运动的粒子
			const particle = createPartical(p5Module, p, (innerR + outterR) / 2)
			particles.push(particle)

			for(let i = 0; i < particles.length; i++) {
				if (!particles[i].overEdge()) {
					particles[i].update(amp > ENHANCE_FREQUENCE)
					particles[i].show()
				} else {
					particles.splice(i, 1)
				}
			}
		},
		mouseClicked: (p) => {
			if (song.isPlaying()) {
				song.pause()
				p.noLoop()
			} else {
				song.play()
				p.loop()
			}
		}
	}

	p5Module && new p5Module(p => {
		p.setup = () => {
			events.setup(p)
		}

		// 事件复制到实例上
		p5Events.forEach((event) => {
			if (events[event]) {
				p[event] = (...rest) => {
					events[event](p, ...rest)
				};
			}
		});
	})
}