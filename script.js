const container = document.getElementById('particle-container');
const shapes = ['circle', 'square', 'triangle'];
const shapeCount = 25;
const mouse = { x: -2000, y: -2000 };
const particleArray = [];

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.el = document.createElement('div');
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 20 + 10;
        this.el.className = `shape ${type}`;
        if(type !== 'triangle') {
            this.el.style.width = `${size}px`;
            this.el.style.height = `${size}px`;
        }
        container.appendChild(this.el);
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.repelRadius = 150;
    }

    update() {
        this.y += this.speedY;
        if (this.y > window.innerHeight + 50) {
            this.y = -50;
            this.x = Math.random() * window.innerWidth;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.repelRadius) {
            const force = (this.repelRadius - distance) / this.repelRadius;
            this.x -= (dx / distance) * force * 10;
            this.y -= (dy / distance) * force * 10;
        }
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

function init() {
    particleArray.length = 0;
    container.innerHTML = '';
    for (let i = 0; i < shapeCount; i++) particleArray.push(new Particle());
}

function animate() {
    particleArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener('resize', init);