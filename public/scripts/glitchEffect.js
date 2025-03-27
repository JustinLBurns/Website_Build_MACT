window.onload = function () {
    let img;
    let imgLoaded = false;  // Flag to track image load status

    function preload() {
        img = loadImage('https://images.squarespace-cdn.com/content/v1/57a64231b8a79b2fec260383/1719338118160-CFQEBSOHGDV7O0OYN8DK/image-asset.jpeg?format=2500w', 
            () => {  // Success callback
                imgLoaded = true;  // Image has successfully loaded
                console.log('Image loaded');
            }, 
            (err) => {  // Error callback
                console.error('Error loading image', err);
            }
        );
    }

    function setup() {
        createCanvas(windowWidth, windowHeight);
        preload();  // Ensure image is preloaded before setup
        console.log("Canvas created.");

        // We need to ensure the image is loaded before doing any drawing
        noLoop();  // Disable looping to control when we redraw manually
    }

    function drawScene() {
        clear();
        if (imgLoaded) {
            image(img, 0, 0);
            glitchEffect();
            applyGrain();
        } else {
            background(0);
            textSize(32);
            fill(255);
            textAlign(CENTER, CENTER);
            text('Loading Image...', width / 2, height / 2);  // Display loading text while image loads
        }
    }

    function glitchEffect() {
        let numGlitches = int(random(5, 15));

        for (let i = 0; i < numGlitches; i++) {
            let sliceHeight = int(random(5, 30));
            let y = int(random(height));
            let glitchOffset = int(random(-50, 50));

            let slice = img.get(0, y, width, sliceHeight);
            image(slice, glitchOffset, y);
        }
    }

    function applyGrain() {
        loadPixels();
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (x + y * width) * 4;
                let grain = random(-40, 50);
                pixels[index] += grain;
                pixels[index + 1] += grain;
                pixels[index + 2] += grain;
            }
        }
        updatePixels();
    }

    function mouseMoved() {
        drawScene();
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        drawScene();
    }
};