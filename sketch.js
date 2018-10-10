var entities = {};
var entityCount = 0;

var Entity = function (name,x, y, speed) {
    this.name = name;
    this.color = '#428cf4';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 10;
    this.update = function () {
        this.x += this.speed[0];
        this.y += this.speed[1];
        if (this.x > width || this.x < 0) {
            this.speed[0] = -this.speed[0];
            this.x += (this.speed[0] * 2);
        }
        if (this.y > height || this.y < 0) {
            this.speed[1] = -this.speed[1];
            this.y += (this.speed[1] * 2);
        }

        if(this.checkMouseCollision()){
            this.color = '#d6024f'

        }
    }

    this.checkMouseCollision = function () {
        return ((this.x - mouseX) ** 2) + ((this.y - mouseY) ** 2) < 500
    }
    this.draw = function(){
        ellipse(this.x, this.y, this.size);
    }
}

var Emitter = function (x, y) {
    this.x = x;
    this.y = y;

    this.update = function(){
        entities['en'+entityCount] = new Entity('en'+entityCount,this.x,this.y,[random(-1,1),random(-1,1)]);
        entityCount++;
        ;
    }
}
var emit = [];
function setup() {
    createCanvas(windowWidth,windowHeight)
    ellipseMode(CENTER);
    noStroke();
    emit.push(new Emitter(width/2,0));
    emit.push(new Emitter(width/2,height/2));
    emit.push(new Emitter(width/2,height));

    emit.push(new Emitter(width,0));
    emit.push(new Emitter(width,height/2));
    emit.push(new Emitter(width,height));

    emit.push(new Emitter(0,height));
    emit.push(new Emitter(0,height/2));
    emit.push(new Emitter(0,0));
}

function draw() {
    background(0)
    for (let i = 0; i<emit.length;i++){
        emit[i].update();

    }
    for(let x in entities){
        entities[x].update();
    }
    for(let x in entities){    
        fill(entities[x].color+'44');
        entities[x].draw();
    }
    while(Object.keys(entities).length>5000){
        delete entities[Object.keys(entities)[0]]
    }
}
