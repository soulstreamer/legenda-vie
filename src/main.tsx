// @ts-nocheck
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// Particle field setup - runs before React
(function(){
  var canvas = document.getElementById('pc');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var RAIN_COLORS = [
    'rgba(0, 210, 220,', 'rgba(0, 180, 210,', 'rgba(30, 150, 230,',
    'rgba(0, 230, 200,', 'rgba(80, 190, 240,',
  ];

  var particles = [];
  var rainDrops = [];
  var lightningBolts = [];
  var rafId = 0;
  var lastLightning = 0;
  var nextInterval = 3000;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none';
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.2),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.4 + 0.2,
    });
  }

  for (var i = 0; i < 90; i++) {
    rainDrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 14 + 6,
      speed: Math.random() * 4.5 + 2.5,
      opacity: Math.random() * 0.3 + 0.2,
      width: Math.random() * 1.2 + 0.5,
      color: RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)],
      trail: Math.random() * 0.4 + 0.3,
      splashProgress: -1,
      splashX: 0,
      splashY: 0,
    });
  }

  function genPts(sx, sy, ex, ey, r, d) {
    if (d === 0) return [{x:sx,y:sy},{x:ex,y:ey}];
    var mx = (sx+ex)/2 + (Math.random()-0.5)*r;
    var my = (sy+ey)/2 + (Math.random()-0.5)*r*0.3;
    return genPts(sx,sy,mx,my,r*0.6,d-1).concat(genPts(mx,my,ex,ey,r*0.6,d-1).slice(1));
  }

  function spawnBolt() {
    var sx = Math.random() * canvas.width;
    var ex = sx + (Math.random()-0.5)*300;
    var ey = canvas.height*(0.3+Math.random()*0.5);
    var pts = genPts(sx,-20,ex,ey,180,6);
    var branches = [];
    for (var b=0;b<Math.floor(Math.random()*3)+1;b++) {
      var bi = Math.floor(pts.length*(0.2+Math.random()*0.5));
      if (bi>=pts.length) continue;
      var bp=pts[bi];
      branches.push({points:genPts(bp.x,bp.y,bp.x+(Math.random()-0.5)*200,bp.y+Math.random()*200,80,4),opacity:0.4+Math.random()*0.3});
    }
    lightningBolts.push({active:true,points:pts,opacity:0.9+Math.random()*0.1,life:8+Math.floor(Math.random()*10),maxLife:8+Math.floor(Math.random()*10),branches:branches,flashIntensity:0.12+Math.random()*0.1});
  }

  function drawBolt(pts,a,w) {
    if (pts.length<2) return;
    ctx.save();
    ctx.strokeStyle='rgba(180,220,255,'+(a*0.2)+')';ctx.lineWidth=w*5;ctx.shadowBlur=24;ctx.shadowColor='rgba(150,200,255,0.6)';ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(var i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();
    ctx.strokeStyle='rgba(160,200,255,'+(a*0.6)+')';ctx.lineWidth=w*2.5;ctx.shadowBlur=14;
    ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(var i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,'+a+')';ctx.lineWidth=w;ctx.shadowBlur=6;ctx.shadowColor='rgba(200,230,255,1)';
    ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(var i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();
    ctx.restore();
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(var i=0;i<particles.length;i++){
      var p=particles[i];p.y+=p.speedY;p.x+=p.speedX;
      if(p.y<-5){p.y=canvas.height+5;p.x=Math.random()*canvas.width;}
      if(p.x<-5)p.x=canvas.width+5;if(p.x>canvas.width+5)p.x=-5;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle='rgba(155,89,182,'+p.opacity+')';ctx.fill();
    }

    for(var i=0;i<rainDrops.length;i++){
      var d=rainDrops[i];
      if(d.splashProgress>=0){
        d.splashProgress+=0.12;
        if(d.splashProgress>1){d.splashProgress=-1;d.x=Math.random()*canvas.width;d.y=-d.length;d.opacity=Math.random()*0.3+0.2;}
        else{var r=d.splashProgress*7;var sa=d.opacity*(1-d.splashProgress)*2.5;ctx.save();ctx.strokeStyle=d.color+sa+')';ctx.lineWidth=0.6;ctx.beginPath();ctx.ellipse(d.splashX,d.splashY,r*2,r*0.5,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
        continue;
      }
      d.y+=d.speed;d.x+=d.speed*0.07;
      if(d.y>canvas.height){d.splashProgress=0;d.splashX=d.x;d.splashY=canvas.height-2;}
      if(d.x>canvas.width)d.x=0;
      var g=ctx.createLinearGradient(d.x,d.y-d.length,d.x+d.length*0.07,d.y);
      g.addColorStop(0,d.color+'0)');g.addColorStop(d.trail,d.color+(d.opacity*0.4)+')');g.addColorStop(1,d.color+d.opacity+')');
      ctx.save();ctx.strokeStyle=g;ctx.lineWidth=d.width;ctx.lineCap='round';
      if(d.opacity>0.1){ctx.shadowBlur=5;ctx.shadowColor=d.color+'0.5)';}
      ctx.beginPath();ctx.moveTo(d.x,d.y-d.length);ctx.lineTo(d.x+d.length*0.07,d.y);ctx.stroke();ctx.restore();
    }

    var now=Date.now();
    if(now-lastLightning>nextInterval&&lightningBolts.length<3){
      lastLightning=now;nextInterval=2500+Math.random()*4000;spawnBolt();
      if(Math.random()<0.35)setTimeout(spawnBolt,80+Math.random()*150);
    }

    for(var i=lightningBolts.length-1;i>=0;i--){
      var b=lightningBolts[i];if(!b.active){lightningBolts.splice(i,1);continue;}
      b.life--;if(b.life<=0){lightningBolts.splice(i,1);continue;}
      var lr=b.life/b.maxLife;var fl=Math.random()<0.4?Math.random()*0.6:1;var a=b.opacity*lr*fl;
      if(a>0.05){
        if(lr>0.65){ctx.save();ctx.fillStyle='rgba(180,210,255,'+(b.flashIntensity*lr*fl*0.4)+')';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.restore();}
        drawBolt(b.points,a,1.5);for(var j=0;j<b.branches.length;j++)drawBolt(b.branches[j].points,a*b.branches[j].opacity*0.7,0.8);
      }
    }
    rafId=requestAnimationFrame(animate);
  }

  rafId=requestAnimationFrame(animate);
})();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)