var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

innerWidth = 720
innerHeight = 1280

window.addEventListener("resize", function(event) {
	canvas.width  = innerWidth;
	canvas.height = innerHeight;
})

function randint(a, b){
	var c = b - a;
	return Math.floor(Math.random() * c) + a;
}

function Circles(x, y, radius, color){
	this.x = x
	this.y = y
	this.radius = radius
	this.color = color
	this.growing = true

	this.grow = function(){
		if (this.growing){
			if (this.x + this.radius + grow_speed + circle_width / 2 > innerWidth || 
				this.x - this.radius - grow_speed - circle_width / 2 < 0 || 
				this.y + this.radius + grow_speed + circle_width / 2 > innerHeight || 
				this.y - this.radius - grow_speed - circle_width / 2 < 0){
				this.growing = false
			}
		}

		if (this.growing){
			for (var i = 0; i < CirclesArray.length; i++){
				circle = CirclesArray[i]
				if (this != circle){
					distance = Math.sqrt((this.x - circle.x)**2 + (this.y - circle.y)**2)
					if (this.radius + circle.radius + grow_speed + circle_width / 2 > distance){
						this.growing = false
						break
					}
				}
			}
		}
		
		if (this.growing){
			this.radius += grow_speed
		}
	}

	this.display = function(){
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.strokeStyle = this.color
		c.lineWidth = circle_width
		c.stroke()
		c.closePath()
	}

	this.update = function(){
		this.grow()
		this.display()
	}
}

function create(){
	check_collision = true
	radius = 0
	color = ColorArray[randint(0, ColorArray.length)]
	while (check_collision){
		check_collision = false
		x = randint(0, innerWidth)
		y = randint(0, innerHeight)
		for (var i = 0; i < CirclesArray.length; i++){
			circle = CirclesArray[i]
			distance = Math.sqrt((x - circle.x)**2 + (y - circle.y)**2)
			if (distance <= circle.radius){
				check_collision = true
			}
		}
	}
	circle = new Circles(x, y, radius, color)
	CirclesArray.push(circle)
}

var ColorArray = ["rgb(50,100,200)", "rgb(50,200,100)", "rgb(100,200,50)",
				  "rgb(100,50,200)", "rgb(200,100,50)", "rgb(200,50,100)"]
var CirclesArray = [];
var timer = 0;
var grow_speed = 2
var circle_width = 2

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);



	if (CirclesArray.length >= 0 && timer % 50 == 0){
		create()
	}
	if (CirclesArray.length >= 100 && timer % 10 == 0){
		create()
	}
	if (CirclesArray.length >= 500 && timer % 1 == 0){
		create()
	}
	if (CirclesArray.length >= 1000 && timer % 1 == 0){
		create()
	}
	if (CirclesArray.length >= 2000){
		create()
		create()
	}
	if (CirclesArray.length >= 4000){
		create()
		create()
	}
	if (CirclesArray.length >= 8000){
		create()
		create()
	}

	if (timer % 1000 == 0){
		circle_surface = 0
		screen_surface = innerWidth * innerHeight
		for (var i = 0; i < CirclesArray.length; i++){
			circle = CirclesArray[i]
			circle_surface += Math.PI * (circle.radius + circle_width / 2)**2
		}
		console.log(Math.round(circle_surface), CirclesArray.length, Math.round((circle_surface / screen_surface) * 100))
	}

	timer += 1

	for (var i = 0; i < CirclesArray.length; i++){
		circle = CirclesArray[i];
		circle.update();
	}
}

animate();