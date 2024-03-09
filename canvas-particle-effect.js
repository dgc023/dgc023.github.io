// Canvas Particle Effect

window.onload = () => {
  const overlay = createOverlay();
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  const effect = new Effect(ctx, mouse);

  initOverlay();
  initListeners();
  tick();

  function createOverlay() {
    try {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:transparent;z-index:9999;';
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
      return overlay;
    } catch (error) {
      console.error('Error occurred while creating overlay:', error);
    }
  }

  function createCanvas() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      overlay.appendChild(canvas);
      return canvas;
    } catch (error) {
      console.error('Error occurred while creating canvas:', error);
    }
  }

  function initOverlay() {
    try {
      window.addEventListener('resize', resizeCanvas);
    } catch (error) {
      console.error('Error occurred while initializing overlay:', error);
    }
  }

  function initListeners() {
    try {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onMouseMove);
      window.addEventListener('click', effect.addNewParticles.bind(effect));
    } catch (error) {
      console.error('Error occurred while initializing listeners:', error);
    }
  }

  function resizeCanvas() {
    try {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } catch (error) {
      console.error('Error occurred while resizing canvas:', error);
    }
  }

  function onMouseMove(e) {
    try {
      e.preventDefault();
      mouse.x = e.touches ? e.touches[0].clientX : e.clientX;
      mouse.y = e.touches ? e.touches[0].clientY : e.clientY;
      effect.addNewParticles();
    } catch (error) {
      console.error('Error occurred while handling mouse move event:', error);
    }
  }

  function tick() {
    try {
      clearCanvas();
      effect.update();
      window.requestAnimationFrame(tick);
    } catch (error) {
      console.error('Error occurred in tick function:', error);
    }
  }

  function clearCanvas() {
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.error('Error occurred while clearing canvas:', error);
    }
  }
}

function randNum(min, max) {
  try {
    return Math.random() * (max - min) + min;
  } catch (error) {
    console.error('Error occurred while generating random number:', error);
  }
}

class Particle {
  constructor(ctx, x, y, hue) {
    try {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.speedX = randNum(-2, 2);
      this.speedY = randNum(-2, 2);
      this.radius = randNum(1, 8);
      this.hue = hue || 0;
    } catch (error) {
      console.error('Error occurred while creating particle:', error);
    }
  }

  update() {
    try {
      this.radius = Math.max(this.radius - 0.1, 0);
      this.x += this.speedX;
      this.y += this.speedY;
      this.draw();
    } catch (error) {
      console.error('Error occurred while updating particle:', error);
    }
  }

  draw() {
    try {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 1)`;
      this.ctx.fill();
    } catch (error) {
      console.error('Error occurred while drawing particle:', error);
    }
  }
}

class Effect {
  constructor(ctx, mouse) {
    try {
      this.ctx = ctx;
      this.mouse = mouse;
      this.particles = [];
      this.hue = 0;
    } catch (error) {
      console.error('Error occurred while creating effect:', error);
    }
  }

  update() {
    try {
      this.hue = (this.hue + 5) % 360;
      this.particles = this.particles.filter(p => p.radius > 0);
      this.particles.forEach((p) => p.update());
    } catch (error) {
      console.error('Error occurred while updating effect:', error);
    }
  }

  addNewParticles() {
    try {
      for (let i = 0; i < 8; i++) {
        this.particles.push(new Particle(this.ctx, this.mouse.x, this.mouse.y, this.hue));
      }
    } catch (error) {
      console.error('Error occurred while adding new particles:', error);
    }
  }
}
