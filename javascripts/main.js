var gameOver = false
var pendingquit = false
var pause = false;

var lives = 3;

var tutorialm = false

var leftplay = false;

var topscore = 0

var score = 0

var world, pogo;

var firstrh = true

var angularVelocity = -0.25

var stiffness = 350, damping = 0.5, restLength = 0.25

var FRAME = 1, STICK = 2, GROUND = 4, OBSTACLE = 8;

var rarity = 10 //obstacle rarity (must be even)

var mobile = false

var nojoystick = false

var heightfield;

var sectionA = {
	d: null,
	h: null,
	o: null
}

var sectionB = {
	d: null,
	h: null,
	o: null
}

function fullscreen() {
//	var check = false; //from detectmobilebrowsers.com
//	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	
	document.getElementById("myCanvas").style.width = '100%';
	document.getElementById("myCanvas").style.height = '100%';
	document.getElementById("myCanvas").width = window.innerWidth
	document.getElementById("myCanvas").height = window.innerHeight
}

function resetHealth() {
	document.getElementById("health").style.animation='fadeinout 4s linear forwards';
	
	var elm = document.getElementById("health")
	elm.style.display='block'
	var newone = elm.cloneNode(true);
	elm.parentNode.replaceChild(newone, elm);
	
	document.getElementById("health").innerHTML=
	  '<i class="fa fa-heart" aria-hidden="true"></i> '
	+ '<i id="h2" class="fa fa-heart" aria-hidden="true"></i> '
	+ '<i id="h3" class="fa fa-heart" aria-hidden="true"></i>';
}

function loseHeart() {
	document.getElementById("health").style.animation='fadeinout 4s linear forwards';
	var elm = document.getElementById("health")
	elm.style.display='block'
	var newone = elm.cloneNode(true);
	elm.parentNode.replaceChild(newone, elm);
	if(lives==2) {
		document.getElementById("health").innerHTML=
			  '<i class="fa fa-heart" aria-hidden="true"></i> '
			+ '<i id="h2" class="fa fa-heart" aria-hidden="true"></i> '
			+ '<i id="h3" class="fa fa-heart-o" aria-hidden="true"></i>';
	}
	
	if(lives==1) {
		document.getElementById("health").innerHTML=
			  '<i class="fa fa-heart" aria-hidden="true"></i> '
			+ '<i id="h2" class="fa fa-heart-o" aria-hidden="true"></i> '
			+ '<i id="h3" class="fa fa-heart-o" aria-hidden="true"></i>';
	}
	
	if(lives<=0) {
		document.getElementById("health").innerHTML=
			  '<i class="fa fa-heart-o" aria-hidden="true"></i> '
			+ '<i id="h2" class="fa fa-heart-o" aria-hidden="true"></i> '
			+ '<i id="h3" class="fa fa-heart-o" aria-hidden="true"></i>';
	}
}

function init() {
	gameOver = false
	pendingquit = false
	//detects mobile
//	var check = false; //from detectmobilebrowsers.com
//	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	
	window.mobileAndTabletcheck = function() {
		  var check = false;
		  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		  return check;
	}
	
	var check=window.mobileAndTabletcheck();
	
	console.log("Mobile or tablet: "+check)
	
	if(check&&!fixedjoy) {
		togglefixedjoy() //fix the joystick location on mobile in case not by default
	}
	
	mobile=check
	if(mobile) {
		if(!nojoystick) {
			joysticktoggle()
		}
	} else { // Disable button
		joysticktoggle()
		joysticktoggle()
	}
	
	if(check) {
		elems = document.getElementsByClassName("dtop")
		for(var i = 0; i < elems.length; i++) {
			elems[i].style.display="none"
		}
	}
	
	// Init canvas
	canvas = document.getElementById("myCanvas");
	w = canvas.width;
	h = canvas.height;
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 0.05;
	
	noise.seed(Math.random()*10);
	// Init p2.js
	
	if(!tutorialm) {
		initgame()
	} else {
		inittut()
	}
	initControls()
}

var secnum = 0;
var secwidth = null;
var padding = 2;

function copysec(s) {
//	return {
//		d: s.d,
//		h: {body: s.h.body, shape: s.h.shape},
//		o: s.o
//	};
	
//	return Object.assign({},object)
//	return JSON.parse(JSON.stringify(s));
//	//console.log(s)
//	return jQuery.extend(true, {}, s)
	
	var obstacles = []
	var idx = 0
	for(var i = 1; i < s.d.length; i++) {
		if(i%rarity==0) {
//			y = s.od[idx]
			
	        var circleShape = new p2.Circle({ radius: 0.5, sensor: true });
	        var circleBody = new p2.Body({ mass:1, position:s.o[idx].position, fixedX: true, fixedY: true});
	        circleBody.addShape(circleShape);
	        circleShape.collisionGroup = OBSTACLE;
	        circleShape.collisionMask = FRAME|STICK;
	        obstacles.push(circleBody);
	        idx+=1
		}
	}
	
	var heightfield = new Object();
	heightfield.shape = new p2.Heightfield({
		heights : s.d,
		elementWidth : 2
	});
	heightfield.body = new p2.Body({
		position : s.h.body.position
	});
	heightfield.shape.collisionGroup = GROUND;
	heightfield.shape.collisionMask = FRAME|STICK;
	
	heightfield.body.addShape(heightfield.shape);
	
	var h1 = null
	if(s.h1!=null) {
		h1 = new Object();
		h1.body = new p2.Body({
			position : s.h1.body.position
		});
		h1.body.fromPolygon(JSON.parse(JSON.stringify(s.h1verts)))
//			//console.log("ALERT")
//		}
		for(var i = 0; i < h1.body.shapes.length; i++) {
			h1.body.shapes[i].collisionGroup = GROUND;
			h1.body.shapes[i].collisionMask = FRAME|STICK;
		}
	}
	
	return {
		d: s.d,
		h: heightfield,
		h1: h1,
		h1verts: s.h1verts,
		o: obstacles,
		od: s.od
	}
}

function changenum(s1, num, oldnum) {
	//console.log(s1.h1verts)
	var s = copysec(s1)
	if(s.h1verts.length<1&&s.h1!=null) {
		//console.log("NO VERTS!")
	}
	s.h.body.position[0] += (num-oldnum)*secwidth
	for(var i = 0; i < s.o.length; i++) {
		s.o[i].position[0] += (num-oldnum)*secwidth
	}
	
	if(s.h1!=null) {
		s.h1.body.position[0] += (num-oldnum)*secwidth
//		s.h1.body.shapes = []
//		s.h1.body.fromPolygon(s.h1verts)
//		for(var i = 0; i < s.h1.body.shapes.length; i++) {
//			s.h1.body.shapes[i].collisionGroup = GROUND;
//			s.h1.body.shapes[i].collisionMask = FRAME|STICK;
//		}
	}
	return s;
}

function caveMouthSigmoid(x) {
	return -2*(x/(1+Math.abs(x)))-1;
}

var caveDepth = 4;
var caveHeight = 5;

function generateSection() {
	var data = [];
//	data.push(0)
	
	var ceilverts = []
	var startedceil=false
	var endceil = false
	var ceilx = null
	var ceily = null
	for (var i = 0; i <= secwidth/2; i++) {
		var v = (i+secnum*secwidth/2) / 10
		
		var value = noise.simplex2(v, 0)*1.75;
		var lvl=distToTime(secnum*secwidth+i*2)
		if(lvl>2) {
			if(lvl%2<1) { // Cave
				value=value/1.75; //Make terrain smoother
				var ychange=null;
				if(lvl%1<=0.5) {
					var x = (lvl%1)*4-1
					ychange=caveMouthSigmoid(x)*caveDepth
				}
				
				if(lvl%1>0.5) {
					var x = ((lvl-0.5)%1)*4-1
					ychange=caveMouthSigmoid(-x)*caveDepth
				}
				
				value+=ychange;
				
				if(ychange<-caveDepth/2||startedceil) {
					var y = value+caveHeight
					if(!startedceil) {
//						//console.log(y)
						ceilx=i*2
						ceily=y
						startedceil=true
//						ceilverts = []
						
						ceilverts.push([5, 2+3])
						ceilverts.push([0, 5+3])
						
//						ceilverts.push([5, 1])
//						ceilverts.push([5, 3])
						
//						ceilverts.push([-1, 5])
//						ceilverts.push([-1, 4])
//						ceilverts.push([-1, 3])
						
//						ceilverts.push([0, 0])
//						ceilverts.push([1, 0])
//						ceilverts.push([2, 1])
//						ceilverts.push([3, 2])
//						ceilverts.push([4, 1])
//						ceilverts.push([5, 3])
//						ceilverts.push([6, 2])
//						ceilverts.push([6, 6])
					}
					ceilverts.push([i*2-ceilx, y-ceily])
//					ceilverts.push([y-ceily, i*2-ceilx])
//					ceilverts.push([i*2-ceilx, 0])
					
					if((i%rarity==rarity-2)&&i!=secwidth/2) {
						if(Math.random()>0.5) {
							value += Math.random()*2
						} else {
//							ceilverts.pop();
							ceilverts.push([i*2-ceilx, y-ceily-Math.random()*1.5-1])
						}
					}
				} 
//				else {
//					if(lvl%1>0.5) {
//						
//					}
//				}
			}
		}
		
//		var value1 = noise.perlin2(v, 0);
		// data.push(0.5*Math.cos(0.2*i) * Math.sin(0.5*i) + 0.6*Math.sin(0.1*i)
		// * Math.sin(0.05*i));
		data.push(value)
	}
	
	var heightfield = new Object();
	heightfield.shape = new p2.Heightfield({
		heights : data,
		elementWidth : 2
	});
	heightfield.body = new p2.Body({
		position : [ -1, -1 ]
	});
	heightfield.shape.collisionGroup = GROUND;
	heightfield.shape.collisionMask = FRAME|STICK;
	
	heightfield.body.addShape(heightfield.shape);
	
//	var h1 = null
	
	if(startedceil) {
		//console.log(ceilverts)
		ceilverts.push([ceilverts[ceilverts.length-1][0], ceilverts[ceilverts.length-1][1]+5+3])
//		ceilverts.push([4, 2+3])
//				ceilverts = [[-1, 1],
//                     [-1, 0],
//                     [1, 0],
//                     [1, 1],
//                     [0.5, 0.5]];
//		ceilverts.push(ceilverts[0])
//		var newv = ceilverts.map(function(arr) {
//		    return arr.slice();
//		});
//		//console.log(newv)
		var h1 = new Object();
//		h1.shape = new p2.Convex({ vertices: ceilverts });
		h1.body = new p2.Body({
			position : [ceilx-1, ceily-1]
		});
		//console.log(ceilverts)
		console.log(h1.body.fromPolygon(JSON.parse(JSON.stringify(ceilverts))))
		console.log(h1.body)
		for(var i = 0; i < h1.body.shapes.length; i++) {
			h1.body.shapes[i].collisionGroup = GROUND;
			h1.body.shapes[i].collisionMask = FRAME|STICK;
		}
		//console.log(ceilverts)
//		h1.body.addShape(h1.shape);
	}
	
	var od = []
	var y = null;
	var obstacles = [];
	for(var i = 1; i < data.length; i++) {
		if(i%rarity==0) {
			var lvl = Math.floor(distToTime(secnum*secwidth+i*2))
			if(Math.random()>0.5&&lvl!=0&&(lvl>2&&lvl%2<1)) {
				y = data[i]+Math.random()*2
			} else {
				y = data[i]+5-Math.random()*2
			}
			
			if(lvl==0) {
				y+=4
			}
			if(lvl>2&&lvl%2<1) {
				y-=10
			}
			
			od.push(y)
	        var circleShape = new p2.Circle({ radius: 0.5, sensor: true });
	        var circleBody = new p2.Body({ mass:1, position:[i*2,y], fixedX: true, fixedY: true});
	        circleBody.addShape(circleShape);
	        circleShape.collisionGroup = OBSTACLE;
	        circleShape.collisionMask = FRAME|STICK;
	        obstacles.push(circleBody);
		}
	}
	
	secnum+=1
	
	//console.log(ceilverts)
	//console.log(h1)
	
	if(h1!=null&&ceilverts.length<1) {
		ceilverts = [[-1, 1],
                   [-1, 0],
                   [1, 0],
                   [1, 1],
                   [0.5, 0.5]];
	}
	
	return {
		d: data,
		h: heightfield,
		h1: h1,
		h1verts: ceilverts,
		o: obstacles,
		od: od
	};
}

function addSection(s) {
	world.addBody(s.h.body)
	for(var i = 0; i < s.o.length; i++) {
		world.addBody(s.o[i])
	}
	
	if(s.h1!=null) {
//	alert("HI")
		world.addBody(s.h1.body)
	}
}

function removeSection(s) {
	world.removeBody(s.h.body)
	for(var i = 0; i < s.o.length; i++) {
		world.removeBody(s.o[i])
	}
	
	if(s.h1!=null) {
//		alert("BYE")
			world.removeBody(s.h1.body)
	}
}

function getsecwidth() {
	var canvaswidth = Math.ceil(w/50+padding) //Get the ceil of the canvas width (along with extra padding) in game units
	var x = Math.ceil(canvaswidth/rarity)*rarity // round so that distance between obstacles is consistent between sections
//console.log(x)
	return x;
}

//from http://stackoverflow.com/a/3261380
function isEmpty(str) {
    return (!str || 0 === str.length);
}

var lvlCnt = 5;

var lvl1length = 100;

function distToTime(dist) { // in half days
	return lvlCnt*(1-Math.pow(1-1/lvlCnt, dist/lvl1length));
}

function initgame() {
	orientationData = new FULLTILT.DeviceOrientation( { 'type': 'game' } );
	initRender();
	cookie = getCookie("topscore")
	if(isEmpty(cookie)) {
		document.cookie = "topscore=0; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
	} else {
		topscore=parseInt(cookie)
	}
	
	score=0
	secnum = 0
	lives = 3
	resetHealth()
	gameOver = false
	pendingquit = false
	world = new p2.World({
		gravity : [ 0, -7 ]
	});
	
	world.defaultContactMaterial.friction = 100;
	world.defaultContactMaterial.restitution = 0.1;
	
	var pogox = w/50/2;
	
	pogo = {
		stick : new Object(),
		frame : new Object(),
		spring : null
	};

	pogo.stick.shape = new p2.Box({
		width : 0.25,
		height : 1.6
	});
	
	pogo.stick.body = new p2.Body({
		mass : 0.25,
//		damping: 0.2,
		position : [ pogox, 2.75],
		angularVelocity : angularVelocity,
		velocity : [ 5, 0 ]
	});
	
	pogo.frame.shape = new p2.Box({
		width : 0.5,
		height : 1.5
	});
	
	pogo.frame.body = new p2.Body({
		mass : 3,
		position : [ pogox, 3 ],
		angularVelocity : angularVelocity,
		velocity : [ 5, 0 ]
	});
	
	pogo.frame.body.addShape(pogo.frame.shape);
	pogo.stick.body.addShape(pogo.stick.shape);
	
	world.addBody(pogo.frame.body);
	world.addBody(pogo.stick.body);

	var c1 = new p2.PrismaticConstraint(pogo.frame.body, pogo.stick.body, {
		localAnchorA : [ 0, 0.5 ],
		localAnchorB : [ 0, 0.5 ],
		localAxisA : [ 0, 1 ],
		disableRotationalLock : true,
	});
	var c2 = new p2.PrismaticConstraint(pogo.frame.body, pogo.stick.body, {
		localAnchorA : [ 0, 0 ],
		localAnchorB : [ 0, 1 ],
		localAxisA : [ 0, 1 ],
		disableRotationalLock : true,
	});
	 c1.setLimits(-1, -0.4);
	world.addConstraint(c2);
	world.addConstraint(c1);
	
	pogo.spring = new p2.LinearSpring(pogo.frame.body, pogo.stick.body, {
		restLength : restLength,
		stiffness : stiffness,
		damping : damping,
		localAnchorA : [ 0, 0 ],
		localAnchorB : [ 0, 0 ],
	});
	
	world.addSpring(pogo.spring);
	
	secwidth = getsecwidth()
	
	sectionA = generateSection();
//	sectionB = changenum(copysec(sectionA), 1);
	sectionB = changenum(generateSection(), 1, 0);
	
	addSection(sectionA)
	addSection(sectionB)
	
	// Setup Collisions
	
	pogo.frame.shape.collisionGroup = FRAME;
	pogo.stick.shape.collisionGroup = STICK;
	
	pogo.frame.shape.collisionMask = GROUND|OBSTACLE;
	pogo.stick.shape.collisionMask = GROUND|OBSTACLE;
	
	world.on("beginContact",function(event){
		if(event.bodyA == pogo.frame.body || event.bodyB == pogo.frame.body) {
//			return;
			var h = event.bodyA == sectionA.h.body || event.bodyB == sectionA.h.body
			h = h || event.bodyA == sectionB.h.body || event.bodyB == sectionB.h.body
			if(!h) {
			lives-=1
			loseHeart()
			} else {
				lives=0
				loseHeart()
			}
			if(lives<=0||h) {
				gameOver = true;
				leftplay = false;
			}
		}
	});
}
