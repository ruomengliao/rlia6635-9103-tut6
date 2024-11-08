function setup() {
    createCanvas(750, 750)
}
// Setting array parameters can affect a particular large circle
let CircleArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function draw() {

    background(3, 78, 120);
    drawCircle(110 + CircleArr[0], 45, 5, 100, 100, [15, 18, 120], [8, 101, 44], [211, 239, 252])
    drawCircle(110 + CircleArr[1], 50, 5, 320, 50, [244, 16, 3], [212, 77, 163], [253, 185, 31])
    drawCircle(110 + CircleArr[2], 38, 5, 550, 25, [242, 11, 8], [192, 67, 163], [238, 236, 230])
    drawCircle(110 + CircleArr[3], 49, 5, 50, 350, [11, 67, 143], [240, 54, 32], [252, 182, 41])
    drawCircle(110 + CircleArr[4], 55, 5, 250, 250, [21, 147, 40], [248, 87, 76], [235, 254, 245])
    drawCircle(110 + CircleArr[5], 60, 5, 480, 250, [226, 147, 225], [83, 169, 211], [251, 166, 58])
    drawCircle(110 + CircleArr[6], 48, 5, 700, 180, [37, 63, 110], [247, 225, 249], [248, 164, 33])
    drawCircle(110 + CircleArr[7], 53, 5, -30, 580, [3, 143, 143], [201, 65, 171], [176, 252, 251])
    drawCircle(110 + CircleArr[8], 56, 5, 200, 520, [243, 33, 1], [223, 38, 6], [252, 185, 13])
    drawCircle(110 + CircleArr[9], 43, 5, 420, 470, [215, 46, 56], [248, 97, 142], [254, 240, 247])
    drawCircle(110 + CircleArr[10], 52, 5, 650, 400, [245, 128, 43], [157, 103, 148], [248, 253, 240])
    drawCircle(110 + CircleArr[11], 50, 5, 130, 740, [241, 24, 15], [174, 112, 197], [248, 251, 243])
    drawCircle(110 + CircleArr[12], 37, 5, 360, 700, [214, 27, 99], [236, 98, 202], [250, 181, 84])
    drawCircle(100 + CircleArr[13], 59, 5, 580, 620, [13, 90, 169], [249, 101, 168], [237, 202, 58])
    drawCircle(100 + CircleArr[14], 50, 5, 800, 620, [251, 76, 24], [218, 85, 185], [254, 167, 19])
    drawCircle(100 + CircleArr[15], 43, 5, 700, 800, [82, 185, 116], [230, 133, 222], [248, 252, 253])

    drawSmallCircleArr()


    // Update and draw each firework particle
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].display();

        // If the particle ends its life cycle, remove it
        if (fireworks[i].isFinished()) {
            fireworks.splice(i, 1);
        }
    }
}

setInterval(() => {
    // Store the center of each circle to determine the location of the blooming fireworks
    let zb = [
        [100, 100, [15, 18, 120]],
        [320, 50, [244, 16, 3]],
        [550, 25, [242, 11, 8]],
        [50, 350, [11, 67, 143]],
        [250, 250, [21, 147, 40]],
        [480, 250, [226, 147, 225]],
        [700, 180, [37, 63, 110]],
        [-30, 580, [3, 143, 143]],
        [200, 520, [243, 33, 1]],
        [420, 470, [215, 46, 56]],
        [650, 400, [245, 128, 43]],
        [130, 740, [241, 24, 15]],
        [360, 700, [214, 27, 99]],
        [580, 620, [13, 90, 169]],
        [800, 620, [251, 76, 24]],
        [700, 800, [82, 185, 116]],
    ]
    let indexs = int(random(0, zb.length))
    addCircleArr(indexs)
    let firework = new Firework(zb[indexs][0], zb[indexs][1], zb[indexs][2]);
    fireworks.push(firework);
}, 2000)

function addCircleArr(index) {
    let timer2;
    let timer1 = setInterval(() => {
        CircleArr[index] = CircleArr[index] + 1
        if (CircleArr[index] >= 80) {
            clearInterval(timer1)
            timer2 = setInterval(() => {
                CircleArr[index] = CircleArr[index] - 1
                if (CircleArr[index] <= 0) {
                    clearInterval(timer2)
                    CircleArr[index] = 0
                }
            }, 20)
        }
    }, 20)
}

let fireworks = []; // Used to store fireworks particles
function drawCircle(radius, numPoints, pointRadius, centerX, centerY, color1 = [], color2 = [], color3 = []) {
    noStroke();
    // // Parameters of the big circle
    // radius; // d of big circle
    // numPoints; // number of small point
    // pointRadius; // d of small point
    if (color3.length > 0) {
        fill(color3)
    }
    ellipse(centerX, centerY, radius * 2.1, radius * 2.1);

    for (let i = 0; i < numPoints; i++) {
        // Calculate the position of each dot
        // Gradually loop inward by decreasing the radius value
        for (let j = radius; j >= 0; j -= 10) {
            let angle = map(i, 0, numPoints, 0, TWO_PI); // The Angle of the current dot
            let x = centerX + j * cos(angle); // The X-coordinate of the dot
            let y = centerY + j * sin(angle); // The Y-coordinate of the dot

            let xOffset = sin(frameCount * 0.1) * 1; // Random displacement in horizontal direction
            let yOffset = cos(frameCount * 0.1) * 1; // Random displacement in vertical direction
            // Control the inner block size to avoid overlaying
            let w = map(j, 0, radius, 3, 0)
            if (j <= radius / 2) {
                fill(color2)
                rect(x - pointRadius+xOffset, y - pointRadius+yOffset, (pointRadius+xOffset) * 2 - w, (pointRadius+yOffset) * 2 - w)
            } else {
                fill(color1)
                ellipse(x, y, (pointRadius) * 2 - w, (pointRadius) * 2 - w);
            }
        }

    }


}

function drawSmallCircle(x, y, radius, color) {
    // change color by time
    // let r = map(sin(frameCount * 0.05 + i), -1, 1, 100, 255);
    // let g = map(cos(frameCount * 0.05 + i), -1, 1, 50, 150);
    // let b = map(sin(frameCount * 0.05 + i + 1), -1, 1, 30, 100);
    // fill(r, g, b, 255); // Change color and add transparency

    fill(color)
    let xOffset = sin(frameCount * 0.1) * 5; // Random displacement in horizontal direction
    let yOffset = cos(frameCount * 0.1) * 5; // Random displacement in vertical direction
    ellipse(x + xOffset, y + yOffset, radius, radius);

    fill(255, 255, 255)
    ellipse(x + yOffset, y + yOffset, radius / 2, radius / 2);
}

function drawSmallCircleArr() {
    drawSmallCircle(10, 15, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(10, 190, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(30, 210, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(10, 210, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(10, 230, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(30, 230, 18, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(60, 220, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(90, 230, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(115, 240, 40, [random(0, 255), random(0, 255), random(0, 255)])


    drawSmallCircle(300, 400, 40, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(250, 390, 40, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(200, 380, 45, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(320, 360, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(325, 380, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(350, 360, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(350, 335, 25, [201, 65, 171])
    drawSmallCircle(380, 340, 30, [201, 65, 171])
    drawSmallCircle(365, 320, 30, [201, 65, 171])


    drawSmallCircle(65, 485, 40, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(100, 610, 30, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(220, 650, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(240, 670, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(240, 650, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(255, 635, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(310, 585, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(320, 560, 30, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(360, 180, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(380, 165, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(400, 150, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(420, 130, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(450, 125, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(440, 100, 30, [random(0, 255), random(0, 255), random(0, 255)])


    drawSmallCircle(680, 20, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(680, 50, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(710, 50, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(710, 20, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(735, 32, 28, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(735, 55, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(735, 5, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(735, 300, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(750, 320, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(750, 480, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(735, 500, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(745, 520, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(700, 550, 40, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(670, 550, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(670, 530, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(700, 520, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(725, 520, 20, [random(0, 255), random(0, 255), random(0, 255)])


    drawSmallCircle(540, 510, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(560, 505, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(560, 485, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(545, 485, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(525, 400, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(515, 380, 35, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(445, 600, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(460, 620, 25, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(470, 590, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(480, 740, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(490, 720, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(490, 700, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(510, 710, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(510, 730, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(500, 750, 20, [random(0, 255), random(0, 255), random(0, 255)])

    drawSmallCircle(530, 730, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(560, 740, 30, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(590, 740, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(610, 730, 20, [random(0, 255), random(0, 255), random(0, 255)])


    drawSmallCircle(690, 660, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(680, 680, 20, [random(0, 255), random(0, 255), random(0, 255)])
    drawSmallCircle(700, 680, 20, [random(0, 255), random(0, 255), random(0, 255)])
}

// Subcategory: Represents a single Particle of a firework
class Particle {
    constructor(x, y, alpha, color = []) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-5, 5), random(-5, 5));
        this.acceleration = createVector(0, 0.1); // Acceleration of gravity
        this.lifespan = 255; // Particle life cycle
        this.alpha = alpha; // Particle transparency
        this.color = color
    }

    update() {
        this.velocity.add(this.acceleration); // Renewal rate
        this.position.add(this.velocity); // Update location
        this.lifespan -= 5; // Reduce life cycle
        this.alpha = map(this.lifespan, 0, 255, 0, this.alpha); // adjust transparency
    }

    display() {
        noStroke();
        fill(this.color, this.alpha);
        ellipse(this.position.x, this.position.y, 5, 5);
    }

    isFinished() {
        return this.lifespan < 0;
    }
}

// Particle class: represents fireworks particles
class Firework {
    constructor(x, y, color = []) {
        this.origin = createVector(x, y); // initial location
        this.position = this.origin.copy(); // current location
        this.velocity = createVector(random(-5, 5), random(-10, -5)); // initial speed
        this.acceleration = createVector(0, 0.2); // Acceleration of gravity, simulating the rise and fall of fireworks
        this.alpha = 255; // Transparency of particles
        this.lifeSpan = 255; // life cycle
        this.particles = []; // Subparticle array
        this.color = color
    }

    update() {
        // Update speed, position, gravity
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // Reduce particle transparency
        this.lifeSpan -= 4;
        this.alpha = map(this.lifeSpan, 0, 255, 0, 255);

        // Create child particles to simulate fireworks explosion
        if (this.lifeSpan < 200) {
            this.createParticles();
        }
    }

    createParticles() {
        // Create a random number of daughter particles
        for (let i = 0; i < 5; i++) {
            let particle = new Particle(this.position.x, this.position.y, this.alpha, this.color);
            this.particles.push(particle);
        }
    }

    display() {
        // draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].display();

            // If the particle ends its life cycle, remove it
            if (this.particles[i].isFinished()) {
                this.particles.splice(i, 1);
            }
        }

        // Draw the starting point of the fireworks
        noStroke();
        fill(this.color, this.alpha);
        ellipse(this.position.x, this.position.y, 10, 10);
    }

    isFinished() {
        return this.lifeSpan < 0;
    }
}

function windowResized() {
    resizeCanvas(750, 750);
    // draw();
}
