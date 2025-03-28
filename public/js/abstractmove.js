(function () {
    console.log("✨ abstractmove.js loaded");
  
    // Create and append canvas
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const buildings = [];
    const lines = [];
    const triangles = [];
  
    const numBuildings = 50;
    const numLines = 120;
    const numTriangles = 15;
  
    const perspective = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 100;
  
    function Building() {
      this.reset();
    }
  
    Building.prototype.reset = function () {
      this.z = Math.random() * 1000 - 500;
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.width = Math.random() * 100 + 50;
      this.height = Math.random() * 150 + 100;
      this.depth = Math.random() * 100 + 50;
  
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
  
      this.rotationSpeedX = (Math.random() - 0.5) * 0.01;
      this.rotationSpeedY = (Math.random() - 0.5) * 0.01;
      this.rotationSpeedZ = (Math.random() - 0.5) * 0.01;
  
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
  
      this.floatAway = Math.random() > 0.7;
      this.vz = this.floatAway ? Math.random() * 1 + 0.2 : (Math.random() - 0.5) * 0.5;
  
      this.lifespan = Math.random() * 500 + 500;
      this.maxLifespan = this.lifespan;
      this.color = "rgba(0, 0, 0, ";
    };
  
    Building.prototype.update = function () {
      this.rotationX += this.rotationSpeedX;
      this.rotationY += this.rotationSpeedY;
      this.rotationZ += this.rotationSpeedZ;
  
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
  
      if (this.z > 1000 || this.z < -1000 || this.lifespan <= 0) {
        this.reset();
      }
  
      this.lifespan -= 1;
    };
  
    Building.prototype.draw = function () {
      const vertices = [
        { x: -this.width / 2, y: -this.height / 2, z: -this.depth / 2 },
        { x: this.width / 2, y: -this.height / 2, z: -this.depth / 2 },
        { x: this.width / 2, y: this.height / 2, z: -this.depth / 2 },
        { x: -this.width / 2, y: this.height / 2, z: -this.depth / 2 },
        { x: -this.width / 2, y: -this.height / 2, z: this.depth / 2 },
        { x: this.width / 2, y: -this.height / 2, z: this.depth / 2 },
        { x: this.width / 2, y: this.height / 2, z: this.depth / 2 },
        { x: -this.width / 2, y: this.height / 2, z: this.depth / 2 },
      ];
  
      const rotated = this.rotate(vertices);
      for (let v of rotated) {
        const scale = perspective / (perspective + v.z + this.z);
        v.screenX = centerX + (v.x + this.x) * scale;
        v.screenY = centerY + (v.y + this.y) * scale;
      }
  
      const alpha = this.lifespan < this.maxLifespan / 2
        ? this.lifespan / (this.maxLifespan / 2)
        : 1;
  
      ctx.strokeStyle = this.color + alpha + ")";
      ctx.beginPath();
      const c = (i, j) => {
        ctx.moveTo(rotated[i].screenX, rotated[i].screenY);
        ctx.lineTo(rotated[j].screenX, rotated[j].screenY);
      };
  
      // Cube edges
      [ [0,1],[1,2],[2,3],[3,0], [4,5],[5,6],[6,7],[7,4], [0,4],[1,5],[2,6],[3,7] ]
        .forEach(([i,j]) => c(i,j));
  
      ctx.stroke();
    };
  
    Building.prototype.rotate = function (vertices) {
      const cosX = Math.cos(this.rotationX),
            sinX = Math.sin(this.rotationX),
            cosY = Math.cos(this.rotationY),
            sinY = Math.sin(this.rotationY),
            cosZ = Math.cos(this.rotationZ),
            sinZ = Math.sin(this.rotationZ);
  
      return vertices.map(v => {
        let y = v.y * cosX - v.z * sinX;
        let z = v.y * sinX + v.z * cosX;
        v.y = y; v.z = z;
  
        let x = v.x * cosY - v.z * sinY;
        z = v.x * sinY + v.z * cosY;
        v.x = x; v.z = z;
  
        x = v.x * cosZ - v.y * sinZ;
        y = v.x * sinZ + v.y * cosZ;
        v.x = x; v.y = y;
  
        return v;
      });
    };
  
    function Triangle() {
      this.reset();
    }
  
    Triangle.prototype.reset = function () {
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.z = Math.random() * 500 - 200;
      this.size = Math.random() * 400 + 150;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.vz = (Math.random() - 0.5) * 0.8;
      this.fillColor = "rgba(255, 255, 255, 0.1)";
      this.strokeColor = "rgba(255, 255, 255, 0.3)";
    };
  
    Triangle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      this.angle += this.rotationSpeed;
      if (this.z > 500 || this.z < -500) this.reset();
    };
  
    Triangle.prototype.draw = function () {
      const scale = perspective / (perspective + this.z);
  
      const coords = [0, 2 / 3, 4 / 3].map(i => {
        const angle = this.angle + Math.PI * i;
        return {
          x: centerX + (this.x + Math.cos(angle) * this.size) * scale,
          y: centerY + (this.y + Math.sin(angle) * this.size) * scale,
        };
      });
  
      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.strokeColor;
  
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      ctx.lineTo(coords[1].x, coords[1].y);
      ctx.lineTo(coords[2].x, coords[2].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };
  
    function VortexLine() {
      this.reset();
    }
  
    VortexLine.prototype.reset = function () {
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.z = Math.random() * -1000;
      this.vz = Math.random() * 8 + 2;
      this.length = Math.random() * 200 + 50;
    };
  
    VortexLine.prototype.update = function () {
      this.z += this.vz;
      if (this.z > 500) this.reset();
    };
  
    VortexLine.prototype.draw = function () {
      const scale1 = perspective / (perspective + this.z);
      const scale2 = perspective / (perspective + this.z + this.length);
  
      const screenX1 = centerX + this.x * scale1;
      const screenY1 = centerY + this.y * scale1;
      const screenX2 = centerX + this.x * scale2;
      const screenY2 = centerY + this.y * scale2;
  
      ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.moveTo(screenX1, screenY1);
      ctx.lineTo(screenX2, screenY2);
      ctx.stroke();
    };
  
    for (let i = 0; i < numBuildings; i++) buildings.push(new Building());
    for (let i = 0; i < numLines; i++) lines.push(new VortexLine());
    for (let i = 0; i < numTriangles; i++) triangles.push(new Triangle());
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(l => { l.update(); l.draw(); });
      triangles.forEach(t => { t.update(); t.draw(); });
      buildings.forEach(b => { b.update(); b.draw(); });
      requestAnimationFrame(animate);
    }
  
    animate();
  })();
  