export const p5Events = [
	"draw",
	"windowResized",
	"preload",
	"mouseClicked",
	"doubleClicked",
	"mouseMoved",
	"mousePressed",
	"mouseWheel",
	"mouseDragged",
	"mouseReleased",
	"keyPressed",
	"keyReleased",
	"keyTyped",
	"touchStarted",
	"touchMoved",
	"touchEnded",
	"deviceMoved",
	"deviceTurned",
	"deviceShaken",
]

export const getRandomColor = (p, range = [0, 150]) => [
	p.random(10, 200),
	p.random(150, 255),
	p.random(150, 255)
]