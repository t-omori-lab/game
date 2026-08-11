import{a as qf}from"./prototypeRoutes-Bi_x7fhI.js";const Yf="modulepreload",Zf=function(n){return"/game/"+n},ud={},Kf=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(t.map(l=>{if(l=Zf(l),l in ud)return;ud[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Yf,d||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((f,g)=>{u.addEventListener("load",f),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},jf=92,Jf=60/jf/2,qr=.08,hd=[110,130.81,146.83,174.61,146.83,123.47];function Qf(n,e,t=qr){return!Number.isFinite(n)||n<e?e+t:n}class $f{context=null;master=null;musicBus=null;effectsBus=null;noiseBuffer=null;nextBeatAt=0;beatIndex=0;danger=0;muted=!1;get isReady(){return this.context!==null&&this.context.state==="running"}async unlock(){if(this.context===null){const e=new AudioContext({latencyHint:"interactive",sampleRate:44100}),t=e.createGain(),i=e.createGain(),r=e.createGain();t.gain.value=this.muted?0:.72,i.gain.value=.22,r.gain.value=.58,i.connect(t),r.connect(t),t.connect(e.destination),this.context=e,this.master=t,this.musicBus=i,this.effectsBus=r,this.noiseBuffer=ep(e),this.nextBeatAt=e.currentTime+qr}this.context.state!=="running"&&(await this.context.resume(),this.nextBeatAt=this.context.currentTime+qr)}setMuted(e){const t=this.muted;if(this.muted=e,this.context!==null&&this.master!==null){const i=this.context.currentTime;t&&!e&&(this.nextBeatAt=i+qr),this.master.gain.cancelScheduledValues(i),this.master.gain.setTargetAtTime(e?0:.72,i,.015)}}setDanger(e){this.danger=tp(e,0,1)}update(){const e=this.context,t=this.musicBus;if(e===null||t===null||e.state!=="running"||this.muted)return;const i=e.currentTime,r=i+qr;this.nextBeatAt=Qf(this.nextBeatAt,i);let s=0;for(;this.nextBeatAt<=r&&s<2;){const a=hd[this.beatIndex%hd.length]??110,o=this.beatIndex%4===0;this.playTone(a,this.nextBeatAt,o?.2:.105,o?.095:.05,"square",t),this.danger>.15&&this.beatIndex%2===1&&this.playTone(a*2.01,this.nextBeatAt+.015,.065,.025+this.danger*.035,"sawtooth",t),o&&this.playNoise(this.nextBeatAt,.045,.008+this.danger*.012,210,t),this.beatIndex+=1,this.nextBeatAt+=Jf,s+=1}}play(e){const t=this.context,i=this.effectsBus;if(t===null||i===null||t.state!=="running"||this.muted)return;const r=t.currentTime;switch(e){case"blade":this.playSweep(720,280,r,.075,.16,"sawtooth",i),this.playNoise(r,.035,.055,2200,i);break;case"impact":this.playSweep(118,42,r,.16,.28,"square",i),this.playNoise(r,.11,.12,310,i);break;case"guard":this.playTone(392,r,.085,.13,"square",i),this.playTone(587.33,r+.018,.06,.07,"triangle",i);break;case"perfect-guard":this.playTone(523.25,r,.12,.15,"square",i),this.playTone(783.99,r+.035,.12,.11,"square",i);break;case"hurt":this.playSweep(160,72,r,.18,.17,"sawtooth",i),this.playNoise(r,.08,.08,480,i);break;case"warning":this.playTone(880,r,.055,.075,"square",i),this.playTone(660,r+.07,.07,.07,"square",i);break;case"enemy-impact":this.playSweep(95,48,r,.13,.2,"square",i),this.playNoise(r,.075,.07,390,i);break;case"dodge":this.playSweep(420,135,r,.11,.09,"triangle",i),this.playNoise(r,.065,.04,1100,i);break;case"relic":this.playSweep(190,880,r,.34,.14,"triangle",i),this.playTone(617,r+.08,.28,.075,"square",i),this.playNoise(r+.03,.2,.04,1400,i);break;case"item":this.playTone(440,r,.09,.1,"triangle",i),this.playTone(659.25,r+.065,.13,.09,"triangle",i);break;case"pickup":this.playTone(329.63,r,.055,.08,"square",i),this.playTone(493.88,r+.045,.075,.08,"square",i);break;case"ui":this.playTone(246.94,r,.045,.045,"square",i);break;case"result":this.playTone(220,r,.22,.08,"triangle",i),this.playTone(329.63,r+.11,.27,.08,"triangle",i),this.playTone(493.88,r+.23,.36,.07,"triangle",i);break;case"outcome-destroy":this.playSweep(164.81,55,r,.48,.18,"sawtooth",i),this.playNoise(r+.08,.24,.1,260,i);break;case"outcome-calm":this.playTone(261.63,r,.42,.1,"triangle",i),this.playTone(392,r+.12,.46,.09,"triangle",i);break;case"outcome-connect":this.playTone(220,r,.5,.07,"square",i),this.playSweep(330,665,r+.08,.56,.1,"triangle",i),this.playNoise(r+.12,.4,.035,1800,i);break}}dispose(){this.context!==null&&this.context.close(),this.context=null,this.master=null,this.musicBus=null,this.effectsBus=null,this.noiseBuffer=null}playTone(e,t,i,r,s,a){const o=this.context;if(o===null)return;const c=o.createOscillator(),l=o.createGain();c.type=s,c.frequency.setValueAtTime(e,t),l.gain.setValueAtTime(1e-4,t),l.gain.exponentialRampToValueAtTime(r,t+.008),l.gain.exponentialRampToValueAtTime(1e-4,t+i),c.connect(l),l.connect(a),c.start(t),c.stop(t+i+.02)}playSweep(e,t,i,r,s,a,o){const c=this.context;if(c===null)return;const l=c.createOscillator(),d=c.createGain();l.type=a,l.frequency.setValueAtTime(e,i),l.frequency.exponentialRampToValueAtTime(Math.max(1,t),i+r),d.gain.setValueAtTime(1e-4,i),d.gain.exponentialRampToValueAtTime(s,i+.006),d.gain.exponentialRampToValueAtTime(1e-4,i+r),l.connect(d),d.connect(o),l.start(i),l.stop(i+r+.02)}playNoise(e,t,i,r,s){const a=this.context,o=this.noiseBuffer;if(a===null||o===null)return;const c=a.createBufferSource(),l=a.createBiquadFilter(),d=a.createGain();c.buffer=o,l.type="bandpass",l.frequency.value=r,l.Q.value=.7,d.gain.setValueAtTime(i,e),d.gain.exponentialRampToValueAtTime(1e-4,e+t),c.connect(l),l.connect(d),d.connect(s),c.start(e),c.stop(e+t)}}function ep(n){const e=Math.floor(n.sampleRate*.5),t=n.createBuffer(1,e,n.sampleRate),i=t.getChannelData(0);let r=1235467297;for(let s=0;s<i.length;s+=1)r^=r<<13,r^=r>>>17,r^=r<<5,i[s]=(r>>>0)/4294967295*2-1;return t}function tp(n,e,t){return Math.min(t,Math.max(e,n))}const fd=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"]);class np{constructor(e){this.root=e,this.joystickPad=_s(e,'[data-control="move"]'),this.joystickKnob=_s(e,'[data-control="move-knob"]'),this.bindJoystick(),this.bindActionButton("attack",()=>{this.queued.attack=!0}),this.bindHoldButton("guard",()=>{this.guardHeld=!0,this.updateGuardMovementChord()},()=>{this.guardHeld=!1,this.updateGuardMovementChord()}),this.bindActionButton("relic",()=>{this.queued.activateRelic=!0}),this.bindActionButton("item",()=>{this.queued.useItem=!0}),this.bindActionButton("interact",()=>{this.queued.interact=!0}),this.bindActionButton("switch-weapon",()=>{this.queued.switchWeapon=!0}),this.bindActionButton("outcome-destroy",()=>{this.queued.outcomeChoice=0}),this.bindActionButton("outcome-calm",()=>{this.queued.outcomeChoice=1}),this.bindActionButton("outcome-connect",()=>{this.queued.outcomeChoice=2}),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.reset),this.listeners.push(()=>{window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.reset)})}root;pressedKeys=new Set;listeners=[];joystickPad;joystickKnob;joystickPointerId=null;joystickX=0;joystickY=0;guardHeld=!1;guardMovementChordActive=!1;enabled=!1;queued=Ya();setEnabled(e){this.enabled=e,this.root.classList.toggle("is-controls-disabled",!e),e||this.reset()}consumeFrame(){const e=this.queued;this.queued=Ya();const t=(this.isPressed("ArrowRight","KeyD")?1:0)-(this.isPressed("ArrowLeft","KeyA")?1:0),i=(this.isPressed("ArrowDown","KeyS")?1:0)-(this.isPressed("ArrowUp","KeyW")?1:0);let r=t===0?this.joystickX===0?e.moveX:this.joystickX:t,s=i===0?this.joystickY===0?e.moveY:this.joystickY:i;const a=Math.hypot(r,s);return a>1&&(r/=a,s/=a),this.enabled?{moveX:r,moveY:s,attack:e.attack,guard:this.isGuardActive(),dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,switchWeapon:e.switchWeapon,outcomeChoice:e.outcomeChoice}:{moveX:0,moveY:0,attack:!1,guard:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}destroy(){this.reset();for(const e of this.listeners.splice(0))e()}bindJoystick(){const e=r=>{!this.enabled||this.joystickPointerId!==null||(r.preventDefault(),this.joystickPointerId=r.pointerId,this.joystickPad.setPointerCapture(r.pointerId),this.updateJoystick(r))},t=r=>{r.pointerId===this.joystickPointerId&&(r.preventDefault(),this.updateJoystick(r))},i=r=>{r.pointerId===this.joystickPointerId&&(this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.updateGuardMovementChord(),this.updateJoystickKnob())};this.joystickPad.addEventListener("pointerdown",e),this.joystickPad.addEventListener("pointermove",t),this.joystickPad.addEventListener("pointerup",i),this.joystickPad.addEventListener("pointercancel",i),this.listeners.push(()=>{this.joystickPad.removeEventListener("pointerdown",e),this.joystickPad.removeEventListener("pointermove",t),this.joystickPad.removeEventListener("pointerup",i),this.joystickPad.removeEventListener("pointercancel",i)})}bindActionButton(e,t){const i=_s(this.root,`[data-control="${e}"]`),r=a=>{this.enabled&&(a.preventDefault(),t())},s=a=>{this.enabled&&(a.preventDefault(),!(a.detail>0)&&t())};i.addEventListener("pointerdown",r),i.addEventListener("click",s),this.listeners.push(()=>{i.removeEventListener("pointerdown",r),i.removeEventListener("click",s)})}bindHoldButton(e,t,i){const r=_s(this.root,`[data-control="${e}"]`),s=l=>{this.enabled&&(l.preventDefault(),r.setPointerCapture(l.pointerId),t())},a=l=>{l.preventDefault(),i()},o=l=>{!this.enabled||l.repeat||l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),t())},c=l=>{l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),i())};r.addEventListener("pointerdown",s),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a),r.addEventListener("keydown",o),r.addEventListener("keyup",c),this.listeners.push(()=>{r.removeEventListener("pointerdown",s),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",a),r.removeEventListener("keydown",o),r.removeEventListener("keyup",c)})}handleKeyDown=e=>{if(!(!this.enabled||ip(e))&&((fd.has(e.code)||e.code==="Space")&&e.preventDefault(),this.pressedKeys.add(e.code),this.queueMovementTap(e.code),this.updateGuardMovementChord(),!e.repeat))switch(e.code){case"Space":case"KeyJ":this.queued.attack=!0;break;case"KeyK":this.queued.dodge=!0;break;case"KeyQ":case"KeyL":this.queued.activateRelic=!0;break;case"KeyR":this.queued.useItem=!0;break;case"KeyE":this.queued.interact=!0;break;case"Digit1":e.preventDefault(),this.queued.switchWeapon=!0;break;case"Digit7":this.queued.outcomeChoice=0;break;case"Digit8":this.queued.outcomeChoice=1;break;case"Digit9":this.queued.outcomeChoice=2;break}};handleKeyUp=e=>{this.pressedKeys.delete(e.code),this.updateGuardMovementChord()};reset=()=>{this.pressedKeys.clear(),this.guardHeld=!1,this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.guardMovementChordActive=!1,this.queued=Ya(),this.updateJoystickKnob()};updateJoystick(e){const t=this.joystickPad.getBoundingClientRect(),i=Math.min(t.width,t.height)*.5,r=e.clientX-(t.left+t.width*.5),s=e.clientY-(t.top+t.height*.5),a=Math.hypot(r,s),o=a>i?i/a:1;this.joystickX=r*o/i,this.joystickY=s*o/i,this.queued.moveX=this.joystickX,this.queued.moveY=this.joystickY,this.updateGuardMovementChord(),this.updateJoystickKnob()}updateGuardMovementChord(){const e=Math.hypot(this.joystickX,this.joystickY)>.22||[...fd].some(i=>this.pressedKeys.has(i)),t=this.isGuardActive()&&e;t&&!this.guardMovementChordActive&&(this.queued.dodge=!0),this.guardMovementChordActive=t}isGuardActive(){return this.guardHeld||this.pressedKeys.has("ShiftLeft")||this.pressedKeys.has("ShiftRight")}queueMovementTap(e){switch(e){case"ArrowRight":case"KeyD":this.queued.moveX=1;break;case"ArrowLeft":case"KeyA":this.queued.moveX=-1;break;case"ArrowDown":case"KeyS":this.queued.moveY=1;break;case"ArrowUp":case"KeyW":this.queued.moveY=-1;break}}updateJoystickKnob(){this.joystickKnob.style.setProperty("--move-x",`${this.joystickX*42}px`),this.joystickKnob.style.setProperty("--move-y",`${this.joystickY*42}px`)}isPressed(e,t){return this.pressedKeys.has(e)||this.pressedKeys.has(t)}}function Ya(){return{moveX:0,moveY:0,attack:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}function _s(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B control is missing: ${e}`);return t}function ip(n){return n.code!=="Space"&&n.code!=="Enter"?!1:typeof Element<"u"&&n.target instanceof Element&&n.target.closest("button[data-control]")!==null}const Zn=30,rp=3600,sp=1800,Et={x:500,y:950},ln={town:{id:"town",name:"Dustwake Town",bounds:{x:80,y:500,width:620,height:800},center:{x:390,y:900},interactionPoint:Et},fork:{id:"fork",name:"Three-Way Fork",bounds:{x:1180,y:550,width:680,height:700},center:{x:1520,y:900},interactionPoint:{x:1520,y:900}},ruin:{id:"ruin",name:"Listening Ruin",bounds:{x:2450,y:420,width:850,height:960},center:{x:2875,y:900},interactionPoint:{x:2930,y:900}}},ap=[ln.town,ln.fork,ln.ruin],op=[{id:"town-hall",kind:"building",bounds:{x:130,y:570,width:250,height:150},solid:!0,height:96},{id:"town-well",kind:"rock",bounds:{x:320,y:790,width:82,height:82},solid:!0,height:34},{id:"south-house",kind:"building",bounds:{x:150,y:1090,width:230,height:130},solid:!0,height:78},{id:"town-board-collider",kind:"rock",bounds:{x:Et.x-46,y:Et.y-10,width:92,height:20},solid:!0,height:0},{id:"town-hall-workyard-collider",kind:"rock",bounds:{x:380,y:707,width:100,height:64},solid:!0,height:0},{id:"town-repair-bench-collider",kind:"rock",bounds:{x:510,y:777,width:115,height:76},solid:!0,height:0},{id:"town-south-lamp-collider",kind:"rock",bounds:{x:460,y:1030,width:20,height:23},solid:!0,height:0},{id:"town-kitchen-garden-collider",kind:"rock",bounds:{x:405,y:1110,width:75,height:90},solid:!0,height:0},{id:"town-south-crates-collider",kind:"rock",bounds:{x:385,y:1186,width:61,height:53},solid:!0,height:0},{id:"fork-boulder",kind:"rock",bounds:{x:1405,y:665,width:130,height:120},solid:!0,height:64},{id:"shallow-basin",kind:"water",bounds:{x:1900,y:1125,width:300,height:170},solid:!0,height:4},{id:"ruin-west-wall-north",kind:"wall",bounds:{x:2500,y:500,width:48,height:320},solid:!0,height:84},{id:"ruin-west-wall-south",kind:"wall",bounds:{x:2500,y:980,width:48,height:320},solid:!0,height:84},{id:"ruin-north-wall",kind:"wall",bounds:{x:2500,y:500,width:700,height:48},solid:!0,height:84},{id:"ruin-south-wall",kind:"wall",bounds:{x:2500,y:1252,width:700,height:48},solid:!0,height:84},{id:"ruin-pillar-north",kind:"pillar",bounds:{x:2720,y:690,width:68,height:68},solid:!0,height:100},{id:"ruin-pillar-south",kind:"pillar",bounds:{x:2720,y:1042,width:68,height:68},solid:!0,height:100}],lp=[{id:"town-contract-board",kind:"contract-board",x:Et.x,y:Et.y,rotation:0,landmarkId:"town",interactive:!0},{id:"town-lamp-a",kind:"lamp",x:470,y:760,rotation:0,landmarkId:"town",interactive:!1},{id:"town-lamp-b",kind:"lamp",x:470,y:1040,rotation:0,landmarkId:"town",interactive:!1},{id:"fork-sign",kind:"signpost",x:1520,y:900,rotation:.15,landmarkId:"fork",interactive:!1},{id:"fork-dead-tree",kind:"dead-tree",x:1670,y:710,rotation:-.4,landmarkId:"fork",interactive:!1},{id:"ruin-relay",kind:"relay",x:2790,y:900,rotation:0,landmarkId:"ruin",interactive:!1},{id:"ruin-anomaly-marker",kind:"anomaly-marker",x:2930,y:900,rotation:0,landmarkId:"ruin",interactive:!0}],Sa={blade:{id:"blade",name:"Survey Blade",range:104,damage:16,cooldownTicks:10,arcCosine:.25,hitLimit:2,knockback:12,cue:"blade-swing"},impact:{id:"impact",name:"Pile Driver",range:66,damage:38,cooldownTicks:25,arcCosine:-.2,hitLimit:3,knockback:38,cue:"impact-swing"}},Ar={"scrap-hound":{kind:"scrap-hound",name:"Scrap Hound",radius:18,maxHp:38,speed:132,damage:12,attackRange:42,aggroRange:340,telegraphTicks:9,recoveryTicks:24},"relay-shell":{kind:"relay-shell",name:"Relay Shell",radius:27,maxHp:92,speed:62,damage:22,attackRange:54,aggroRange:300,telegraphTicks:20,recoveryTicks:39},murmur:{kind:"murmur",name:"Murmur",radius:21,maxHp:54,speed:88,damage:16,attackRange:68,aggroRange:420,telegraphTicks:15,recoveryTicks:30},"named-anomaly":{kind:"named-anomaly",name:"Orison, the Listening Fault",radius:42,maxHp:124,speed:54,damage:28,attackRange:88,aggroRange:520,telegraphTicks:24,recoveryTicks:42}},Hi="anomaly-orison",cp=[{id:"enemy-hound",kind:"scrap-hound",x:940,y:835},{id:"enemy-shell",kind:"relay-shell",x:1820,y:1e3},{id:"enemy-murmur",kind:"murmur",x:2270,y:760},{id:Hi,kind:"named-anomaly",x:ln.ruin.interactionPoint.x,y:ln.ruin.interactionPoint.y}],Eh={"edge-coil":{id:"edge-coil",name:"Edge Coil",description:"Adds 6 damage to the fast, long-reaching blade.",effect:"blade-damage",amount:6},"gravity-weight":{id:"gravity-weight",name:"Gravity Weight",description:"Adds 12 damage to the slow, close impact weapon.",effect:"impact-damage",amount:12},"field-tonic":{id:"field-tonic",name:"Field Tonic",description:"Adds one 45 HP healing item.",effect:"healing-item",amount:1},"relay-capacitor":{id:"relay-capacitor",name:"Relay Capacitor",description:"Adds 10 relic damage and shortens its cooldown by one second.",effect:"relic-power",amount:10},"quiet-chime":{id:"quiet-chime",name:"Quiet Chime",description:"Allows the relic pulse to calm the named anomaly.",effect:"calm-key",amount:1},"signal-key":{id:"signal-key",name:"Signal Key",description:"Allows a direct connection with the named anomaly.",effect:"connect-key",amount:1}},dp=[{id:"pickup-edge-coil",lootId:"edge-coil",x:665,y:760,radius:18},{id:"pickup-field-tonic",lootId:"field-tonic",x:1050,y:1020,radius:18},{id:"pickup-gravity-weight",lootId:"gravity-weight",x:1640,y:1105,radius:18},{id:"pickup-relay-capacitor",lootId:"relay-capacitor",x:2030,y:720,radius:18},{id:"pickup-quiet-chime",lootId:"quiet-chime",x:2360,y:1030,radius:18},{id:"pickup-signal-key",lootId:"signal-key",x:2350,y:900,radius:18}],up={destroy:{outcome:"destroy",title:"Fault Silenced",townReaction:"The town accepts the quiet, but the relay keepers mourn the lost signal."},calm:{outcome:"calm",title:"Fault at Rest",townReaction:"The ruin grows still. Travelers begin leaving offerings at the fork."},connect:{outcome:"connect",title:"A Line Left Open",townReaction:"Messages arrive from the ruin, and the town argues over who may answer."}},wh=1831565813,hp=4294967296;function fp(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function pp(n){const e=fp(String(n));return e===0?wh:e}function mp(n){let e=n>>>0;return e===0&&(e=wh),e^=e<<13,e^=e>>>17,e^=e<<5,e>>>=0,{state:e,value:e/hp}}const gp=18,xp=162,pd=100,md=92,vp=30,gd=8,yp=4,_p=.3,Th=70,Mp=360,Sp=90,bp=8;function yr(n,e,t){return Math.min(t,Math.max(e,n))}function xd(n){return n===void 0||!Number.isFinite(n)?0:yr(n,-1,1)}function vd(n){return n===void 0||!Number.isFinite(n)?1:yr(n,0,1)}function ls(n,e){const t=Math.hypot(n,e);return t===0?{x:0,y:0}:{x:n/t,y:e/t}}function Nn(n,e,t,i){return Math.hypot(n-t,e-i)}function yd(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function Ep(n,e,t,i){const r=yr(n,i.x,i.x+i.width),s=yr(e,i.y,i.y+i.height),a=n-r,o=e-s;return a*a+o*o<t*t}function Ah(n){return{...n,bounds:{...n.bounds},center:{...n.center},interactionPoint:{...n.interactionPoint}}}function Rh(n){return{...n,bounds:{...n.bounds}}}function wp(n){return{...n,player:{...n.player,weaponDamageBonuses:{...n.player.weaponDamageBonuses},collectedLootIds:[...n.player.collectedLootIds]},enemies:n.enemies.map(e=>({...e,attack:{...e.attack}})),world:{...n.world,landmarks:n.world.landmarks.map(Ah),terrain:n.world.terrain.map(Rh),props:n.world.props.map(e=>({...e})),loot:n.world.loot.map(e=>({...e}))},quest:{...n.quest,visitedLandmarkIds:[...n.quest.visitedLandmarkIds],result:n.quest.result===null?null:{...n.quest.result}}}}function cs(){return{phase:"idle",ticksRemaining:0,attackId:null,targetX:0,targetY:0,directionX:0,directionY:0}}function Tp(){return{id:"player",x:430,y:900,radius:gp,facingX:1,facingY:0,hp:pd,maxHp:pd,speed:xp,weaponId:"blade",weaponCooldownTicks:0,weaponDamageBonuses:{blade:0,impact:0},guarding:!1,guardStartedTick:null,dodgeCooldownTicks:0,invulnerableTicks:0,relicCooldownTicks:0,relicCooldownMaxTicks:5*Zn,relicDamage:14,relicRange:180,healingItems:1,healingAmount:45,collectedLootIds:[]}}function _d(n,e,t,i){const r=Ar[n],s=n==="named-anomaly";return{id:e,kind:n,name:r.name,x:t,y:i,radius:r.radius,hp:r.maxHp,maxHp:r.maxHp,active:!s,defeated:!1,disposition:s?"dormant":"hostile",attack:cs()}}function Md(n){const e=pp(n);let t=e,i=0;const r=()=>{const a=mp(t);return t=a.state,i+=1,a.value},s=cp.map(a=>{if(a.kind==="named-anomaly")return _d(a.kind,a.id,a.x,a.y);const o=(r()-.5)*72,c=(r()-.5)*72;return _d(a.kind,a.id,a.x+o,a.y+c)});return{saveVersion:1,contentVersion:"prototype-b-1",seed:e,rngState:t,rngDraws:i,tick:0,status:"playing",nextActionId:1,player:Tp(),enemies:s,world:{width:rp,height:sp,landmarks:ap.map(Ah),terrain:op.map(Rh),props:lp.map(a=>({...a})),loot:dp.map(a=>({...a,picked:!1}))},quest:{phase:"briefing",objective:"Read the town contract board.",visitedLandmarkIds:["town"],intent:null,outcome:null,result:null}}}function Jl(n,e){const t=`${e}-${n.nextActionId}`;return n.nextActionId+=1,t}function Sd(n,e,t,i){return n.world.terrain.some(r=>r.solid&&Ep(e,t,i,r.bounds))}function ba(n,e,t,i,r,s){const a=Math.max(1,Math.ceil(Math.max(Math.abs(r),Math.abs(s))/bp)),o=r/a,c=s/a;let l=e,d=t;for(let h=0;h<a;h+=1){const u=yr(l+o,i,n.world.width-i);Sd(n,u,d,i)||(l=u);const f=yr(d+c,i,n.world.height-i);Sd(n,l,f,i)||(d=f)}return{x:l,y:d}}function Ap(n){n.weaponCooldownTicks=Math.max(0,n.weaponCooldownTicks-1),n.dodgeCooldownTicks=Math.max(0,n.dodgeCooldownTicks-1),n.invulnerableTicks=Math.max(0,n.invulnerableTicks-1),n.relicCooldownTicks=Math.max(0,n.relicCooldownTicks-1)}function Rp(n,e,t){const i=ls(e,t);return(i.x!==0||i.y!==0)&&(n.facingX=i.x,n.facingY=i.y),i}function Cp(n,e,t){const i=xd(e.moveX),r=xd(e.moveY),s=Rp(n.player,i,r);if(e.dodge===!0&&n.player.dodgeCooldownTicks===0){const o=s.x===0&&s.y===0?{x:n.player.facingX,y:n.player.facingY}:s,c=n.player.x,l=n.player.y,d=ba(n,c,l,n.player.radius,o.x*md,o.y*md);return n.player.x=d.x,n.player.y=d.y,n.player.dodgeCooldownTicks=vp,n.player.invulnerableTicks=gd,n.player.guarding=!1,n.player.guardStartedTick=null,t.push({type:"dodge-started",tick:n.tick,fromX:c,fromY:l,toX:d.x,toY:d.y,invulnerableTicks:gd,cue:"dodge"}),!0}const a=ba(n,n.player.x,n.player.y,n.player.radius,s.x*(n.player.speed/Zn)*vd(e.moveSpeedScale),s.y*(n.player.speed/Zn)*vd(e.moveSpeedScale));return n.player.x=a.x,n.player.y=a.y,!1}function Pp(n,e){const t=n.player.guarding,i=e.guard===!0&&e.dodge!==!0;n.player.guarding=i,i&&!t?n.player.guardStartedTick=n.tick:i||(n.player.guardStartedTick=null)}function Ea(n,e,t,i){n.quest.phase=e,n.quest.objective=t,i.push({type:"quest-advanced",tick:n.tick,phase:e,objective:t,cue:"quest"})}function bd(n,e,t){n.quest.visitedLandmarkIds.includes(e)||(n.quest.visitedLandmarkIds.push(e),t.push({type:"landmark-entered",tick:n.tick,landmarkId:e}))}function ds(n){return n.enemies.find(e=>e.id===Hi)}function Lp(n,e){const{x:t,y:i}=n.player;yd(t,i,ln.fork.bounds)&&(bd(n,"fork",e),n.quest.phase==="travel-to-fork"&&Ea(n,"travel-to-ruin","Follow the eastern route to the Listening Ruin.",e)),yd(t,i,ln.ruin.bounds)&&bd(n,"ruin",e);const r=ds(n);n.quest.phase==="travel-to-ruin"&&r!==void 0&&Nn(t,i,r.x,r.y)<=Mp&&Ea(n,"confrontation","Choose how to answer Orison: destroy, calm, or connect.",e)}function Jo(n,e){return n.player.collectedLootIds.includes(e)}function Dp(n,e){const t=Eh[e];switch(t.effect){case"blade-damage":n.player.weaponDamageBonuses.blade+=t.amount;break;case"impact-damage":n.player.weaponDamageBonuses.impact+=t.amount;break;case"healing-item":n.player.healingItems+=t.amount;break;case"relic-power":n.player.relicDamage+=t.amount,n.player.relicCooldownMaxTicks=Math.max(2*Zn,n.player.relicCooldownMaxTicks-Zn),n.player.relicCooldownTicks=Math.min(n.player.relicCooldownTicks,n.player.relicCooldownMaxTicks);break}}function Ip(n,e){const i=n.world.loot.filter(r=>!r.picked&&Nn(n.player.x,n.player.y,r.x,r.y)<=n.player.radius+r.radius+Th).sort((r,s)=>{const a=Nn(n.player.x,n.player.y,r.x,r.y),o=Nn(n.player.x,n.player.y,s.x,s.y);return a-o||r.id.localeCompare(s.id)})[0];return i===void 0?!1:(i.picked=!0,Jo(n,i.lootId)||(n.player.collectedLootIds.push(i.lootId),Dp(n,i.lootId)),e.push({type:"loot-picked",tick:n.tick,pickupId:i.id,lootId:i.lootId,cue:"loot"}),!0)}function Ql(n,e,t){if(n.quest.outcome!==null)return;const i=ds(n);i!==void 0&&(i.active=!1,i.attack=cs(),i.disposition=e==="destroy"?"destroyed":e==="calm"?"calmed":"connected",i.defeated=e==="destroy",e==="destroy"&&(i.hp=0)),n.quest.intent=e,n.quest.outcome=e,t.push({type:"anomaly-resolved",tick:n.tick,anomalyId:Hi,outcome:e,cue:e==="destroy"?"outcome-destroy":e==="calm"?"outcome-calm":"outcome-connect"}),Ea(n,"return-town","Return to the Dustwake contract board.",t)}function Np(n,e,t){const i=e.chooseOutcome;if(i===void 0)return;if(n.quest.phase!=="confrontation"){t.push({type:"command-rejected",tick:n.tick,reason:"wrong-quest-phase"});return}if(n.quest.intent!==null||n.quest.outcome!==null){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-already-chosen"});return}if(i==="calm"&&!Jo(n,"quiet-chime")||i==="connect"&&!Jo(n,"signal-key")){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-not-available"});return}n.quest.intent=i;const r=ds(n);r!==void 0&&(r.active=!0,r.disposition="hostile"),t.push({type:"outcome-committed",tick:n.tick,outcome:i})}function Ed(n,e,t=Th){return Nn(n.x,n.y,e.x,e.y)<=n.radius+t}function $l(n,e){return Nn(n.x,n.y,e.x,e.y)<=n.radius+e.radius+Sp}function Up(n,e,t){if(e.interact!==!0||Ip(n,t))return;if(n.quest.phase==="briefing"&&Ed(n.player,ln.town.interactionPoint)){Ea(n,"travel-to-fork","Reach the Three-Way Fork.",t);return}const i=ds(n);if(n.quest.phase==="confrontation"&&n.quest.intent==="connect"&&i!==void 0&&$l(n.player,i)){Ql(n,"connect",t);return}if(n.quest.phase==="return-town"&&n.quest.outcome!==null&&Ed(n.player,ln.town.interactionPoint)){const r={...up[n.quest.outcome]};n.quest.phase="result",n.quest.objective="Route complete.",n.quest.result=r,n.status="result",t.push({type:"result-reached",tick:n.tick,result:r,cue:"result"})}}function zp(n,e,t){e.chooseWeapon===void 0||e.chooseWeapon===n.player.weaponId||(n.player.weaponId=e.chooseWeapon,t.push({type:"weapon-selected",tick:n.tick,weaponId:e.chooseWeapon}))}function ec(n,e){return e.active&&!e.defeated&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function Op(n,e,t){e.defeated||(e.defeated=!0,e.active=!1,e.disposition="destroyed",e.attack=cs(),t.push({type:"enemy-defeated",tick:n.tick,enemyId:e.id,kind:e.kind}),e.id===Hi&&Ql(n,"destroy",t))}function Ch(n,e,t,i,r){if(!ec(n,e))return;const s=Math.min(e.hp,Math.max(0,t));e.hp=Math.max(0,e.hp-s),r.push({type:"enemy-damaged",tick:n.tick,enemyId:e.id,amount:s,remainingHp:e.hp,source:i}),e.hp===0&&Op(n,e,r)}function Fp(n){const e=Sa[n.player.weaponId];return{...e,damage:e.damage+n.player.weaponDamageBonuses[n.player.weaponId]}}function wd(n,e){return Nn(n.x,n.y,e.x,e.y)}function Bp(n,e,t){const i=e.x-n.x,r=e.y-n.y,s=Math.hypot(i,r);return s-e.radius>t.range?!1:s===0?!0:i/s*n.facingX+r/s*n.facingY>=t.arcCosine}function kp(n,e,t){if(t<=0||e.defeated)return;const i=ls(e.x-n.player.x,e.y-n.player.y),r=ba(n,e.x,e.y,e.radius,i.x*t,i.y*t);e.x=r.x,e.y=r.y}function Vp(n,e,t,i){if(e.attack!==!0||n.player.weaponCooldownTicks>0||n.player.guarding||i)return;const r=Fp(n),s=Jl(n,"player-attack");n.player.weaponCooldownTicks=r.cooldownTicks,t.push({type:"player-attacked",tick:n.tick,actionId:s,weaponId:r.id,x:n.player.x,y:n.player.y,directionX:n.player.facingX,directionY:n.player.facingY,range:r.range,damage:r.damage,cooldownTicks:r.cooldownTicks,cue:r.cue});const a=n.enemies.filter(o=>ec(n,o)&&Bp(n.player,o,r)).sort((o,c)=>wd(n.player,o)-wd(n.player,c)||o.id.localeCompare(c.id)).slice(0,r.hitLimit);for(const o of a)Ch(n,o,r.damage,r.id,t),kp(n,o,r.knockback)}function Hp(n,e,t){if(e.activateRelic!==!0||n.player.relicCooldownTicks>0)return;n.player.relicCooldownTicks=n.player.relicCooldownMaxTicks,t.push({type:"relic-activated",tick:n.tick,x:n.player.x,y:n.player.y,radius:n.player.relicRange,damage:n.player.relicDamage,cue:"relic"});const i=ds(n);n.quest.phase==="confrontation"&&n.quest.intent==="calm"&&i!==void 0&&Nn(n.player.x,n.player.y,i.x,i.y)<=n.player.relicRange+i.radius&&Ql(n,"calm",t);for(const r of n.enemies)ec(n,r)&&Nn(n.player.x,n.player.y,r.x,r.y)<=n.player.relicRange+r.radius&&Ch(n,r,n.player.relicDamage,"relic",t)}function Gp(n,e,t){if(e.useItem!==!0)return;if(n.player.healingItems<=0){t.push({type:"command-rejected",tick:n.tick,reason:"item-empty"});return}if(n.player.hp>=n.player.maxHp){t.push({type:"command-rejected",tick:n.tick,reason:"item-full-health"});return}const i=n.player.hp;n.player.hp=Math.min(n.player.maxHp,n.player.hp+n.player.healingAmount),n.player.healingItems-=1,t.push({type:"item-used",tick:n.tick,healed:n.player.hp-i,remainingItems:n.player.healingItems,cue:"heal"})}function Wp(n,e,t){const i=Ar[e.kind],r=ls(n.player.x-e.x,n.player.y-e.y),s=Jl(n,"enemy-attack");e.attack={phase:"telegraph",ticksRemaining:i.telegraphTicks,attackId:s,targetX:n.player.x,targetY:n.player.y,directionX:r.x,directionY:r.y},t.push({type:"enemy-attack-telegraphed",tick:n.tick,enemyId:e.id,attackId:s,x:e.x,y:e.y,directionX:r.x,directionY:r.y,range:i.attackRange,resolveTick:n.tick+i.telegraphTicks,cue:"enemy-warning"})}function Xp(n,e){const t=Ar[e.kind],i=n.player.x-e.x,r=n.player.y-e.y,s=Math.hypot(i,r);return s>t.attackRange+e.radius+n.player.radius?!1:s===0?!0:i/s*e.attack.directionX+r/s*e.attack.directionY>=.15}function qp(n,e){const t=ls(e.x-n.x,e.y-n.y);return t.x*n.facingX+t.y*n.facingY>=0}function Yp(n,e,t){const i=Ar[e.kind],r=e.attack.attackId??Jl(n,"enemy-attack"),s=Xp(n,e);if(t.push({type:"enemy-attack-resolved",tick:n.tick,enemyId:e.id,attackId:r,hit:s,cue:"enemy-impact"}),s)if(n.player.invulnerableTicks>0)t.push({type:"player-dodged",tick:n.tick,enemyId:e.id});else{const a=n.player.guarding&&qp(n.player,e);let o=i.damage;if(a){const l=(n.player.guardStartedTick===null?Number.POSITIVE_INFINITY:n.tick-n.player.guardStartedTick)<=yp;o=l?0:Math.max(1,Math.ceil(i.damage*_p)),t.push({type:"guard-resolved",tick:n.tick,enemyId:e.id,justGuard:l,preventedDamage:i.damage-o,receivedDamage:o,cue:l?"just-guard":"guard"})}o>0&&(n.player.hp=Math.max(0,n.player.hp-o),t.push({type:"player-damaged",tick:n.tick,enemyId:e.id,amount:o,remainingHp:n.player.hp}))}e.attack={...cs(),phase:"recovery",ticksRemaining:i.recoveryTicks}}function Zp(n,e,t){if(!e.active||e.defeated||e.disposition!=="hostile"||n.status!=="playing")return;if(e.attack.phase==="telegraph"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&Yp(n,e,t);return}if(e.attack.phase==="recovery"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&(e.attack=cs());return}const i=Ar[e.kind],r=Nn(e.x,e.y,n.player.x,n.player.y);if(r>i.aggroRange)return;const s=i.attackRange+e.radius+n.player.radius;if(r>s){const o=ls(n.player.x-e.x,n.player.y-e.y),c=ba(n,e.x,e.y,e.radius,o.x*(i.speed/Zn),o.y*(i.speed/Zn));e.x=c.x,e.y=c.y}Nn(e.x,e.y,n.player.x,n.player.y)<=s&&Wp(n,e,t)}function Kp(n,e){for(const t of n.enemies)if(Zp(n,t,e),n.player.hp===0){n.status="lost",e.push({type:"player-defeated",tick:n.tick});break}}function jp(n,e={}){if(n.status!=="playing")return{state:n,events:[]};const t=wp(n),i=[];t.tick+=1,Ap(t.player),Pp(t,e);const r=Cp(t,e,i);return Lp(t,i),zp(t,e,i),Np(t,e,i),Up(t,e,i),Vp(t,e,i,r),Hp(t,e,i),Gp(t,e,i),Kp(t,i),{state:t,events:i}}const tc={blade:{buildId:"counter-cutter",acquireRange:132,dropRange:164,hitRange:108,minimumFacingAlignment:Math.max(0,Sa.blade.arcCosine),windupTicks:5,recoveryTicks:9,windupMovementScale:1,hitMovementScale:.9,recoveryMovementScale:1},impact:{buildId:"breach-driver",acquireRange:96,dropRange:128,hitRange:82,minimumFacingAlignment:Math.max(0,Sa.impact.arcCosine),windupTicks:18,recoveryTicks:16,windupMovementScale:.35,hitMovementScale:.2,recoveryMovementScale:.75}},Ph={phase:"idle",targetId:null,weaponId:null,phaseTicksRemaining:0,phaseTicksTotal:0};function Lh(n,e){return Math.hypot(e.x-n.player.x,e.y-n.player.y)}function Dh(n,e){const t=e.x-n.player.x,i=e.y-n.player.y,r=Math.hypot(t,i);if(r===0)return 1;const s=Math.hypot(n.player.facingX,n.player.facingY);return s===0?-1:t/r*(n.player.facingX/s)+i/r*(n.player.facingY/s)}function Jp(n,e){return n.status==="playing"&&e.active&&!e.defeated&&e.hp>0&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function Li(n,e,t,i){return Jp(n,e)&&Lh(n,e)<=i&&Dh(n,e)>=t.minimumFacingAlignment}function Yr(n,e){if(e!==null)return n.enemies.find(t=>t.id===e)}function Td(n,e,t){const i=e.attack.phase==="telegraph"?1:0,r=e.id===t?1:0;return 1e3-Lh(n,e)*2+Dh(n,e)*120+i*160+r*80}function Qp(n,e,t){return n.enemies.filter(i=>Li(n,i,e,e.acquireRange)).sort((i,r)=>Td(n,r,t)-Td(n,i,t)||i.id.localeCompare(r.id))[0]}function ha(n,e,t,i){return{phase:n,targetId:t,weaponId:e,phaseTicksRemaining:i,phaseTicksTotal:i}}function Ad(n){return{...Ph,weaponId:n}}function Yi(n,e){const t=n.player.weaponId,i=tc[t];if(n.status!=="playing"||n.player.guarding||n.player.weaponCooldownTicks>0)return Ad(t);const r=Qp(n,i,e);return r===void 0?Ad(t):ha("acquire",t,r.id,1)}function $p(n,e){if(e===null)return 1;switch(n.phase){case"windup":return e.windupMovementScale;case"hit":return e.hitMovementScale;case"recover":return e.recoveryMovementScale;case"idle":case"acquire":return 1}}function em(n,e){const t=n.weaponId===null?null:tc[n.weaponId],i=Yr(e,n.targetId);let r=0;return n.phase==="hit"?r=1:n.phaseTicksTotal>0&&(r=1-n.phaseTicksRemaining/n.phaseTicksTotal),{phase:n.phase,buildId:t?.buildId??null,weaponId:n.weaponId,targetId:n.targetId,phaseTicksRemaining:n.phaseTicksRemaining,phaseTicksTotal:n.phaseTicksTotal,phaseProgress:r,movementScale:$p(n,t),targetInHitRange:t!==null&&i!==void 0&&Li(e,i,t,t.hitRange)}}function bn(n,e,t=!1){return{state:n,presentation:em(n,e),commandContribution:t?{attack:!0}:{}}}function Za(){return{...Ph}}function tm(n,e){const t=e.player.weaponId,i=tc[t];if(e.status!=="playing"||e.player.guarding||n.weaponId!==null&&n.weaponId!==t)return bn(Yi(e,null),e);switch(n.phase){case"idle":return bn(Yi(e,n.targetId),e);case"acquire":{const r=Yr(e,n.targetId);return r===void 0||!Li(e,r,i,i.dropRange)?bn(Yi(e,n.targetId),e):bn(ha("windup",t,r.id,i.windupTicks),e)}case"windup":{const r=Yr(e,n.targetId);if(r===void 0||!Li(e,r,i,i.dropRange))return bn(Yi(e,n.targetId),e);if(n.phaseTicksRemaining>1){const s={...n,phaseTicksRemaining:n.phaseTicksRemaining-1};return bn(s,e)}return e.player.weaponCooldownTicks>0||!Li(e,r,i,i.hitRange)?bn(Yi(e,n.targetId),e):bn(ha("hit",t,r.id,1),e,!0)}case"hit":{const r=Yr(e,n.targetId);return bn(ha("recover",t,r!==void 0&&Li(e,r,i,i.dropRange)?r.id:null,i.recoveryTicks),e)}case"recover":{if(n.phaseTicksRemaining>1){const r=Yr(e,n.targetId),s={...n,targetId:r!==void 0&&Li(e,r,i,i.dropRange)?r.id:null,phaseTicksRemaining:n.phaseTicksRemaining-1};return bn(s,e)}return bn(Yi(e,n.targetId),e)}}}const nc="185",nm=0,Rd=1,im=2,Qr=1,rm=2,Zr=3,ci=0,an=1,rn=2,Yt=0,mr=1,wa=2,Cd=3,Pd=4,Ih=5,Pn=100,sm=101,am=102,om=103,lm=104,Kr=200,cm=201,dm=202,um=203,Qo=204,$o=205,el=206,hm=207,tl=208,fm=209,pm=210,mm=211,gm=212,xm=213,vm=214,nl=0,il=1,rl=2,_r=3,sl=4,al=5,ol=6,ll=7,ic=0,ym=1,_m=2,qn=0,rc=1,sc=2,ac=3,oc=4,lc=5,Na=6,cc=7,Nh=300,zi=301,Mr=302,Ka=303,ja=304,Ua=306,Un=1e3,ri=1001,cl=1002,Ut=1003,Mm=1004,Ms=1005,zt=1006,Ja=1007,si=1008,sn=1009,Uh=1010,zh=1011,es=1012,dc=1013,Kn=1014,Ln=1015,Kt=1016,uc=1017,hc=1018,Sr=1020,Oh=35902,Fh=35899,Bh=1021,kh=1022,mn=1023,di=1026,Mi=1027,fc=1028,pc=1029,Oi=1030,mc=1031,gc=1033,fa=33776,pa=33777,ma=33778,ga=33779,dl=35840,ul=35841,hl=35842,fl=35843,pl=36196,ml=37492,gl=37496,xl=37488,vl=37489,Ta=37490,yl=37491,_l=37808,Ml=37809,Sl=37810,bl=37811,El=37812,wl=37813,Tl=37814,Al=37815,Rl=37816,Cl=37817,Pl=37818,Ll=37819,Dl=37820,Il=37821,Nl=36492,Ul=36494,zl=36495,Ol=36283,Fl=36284,Aa=36285,Bl=36286,Sm=3200,ts=0,bm=1,ni="",Zt="srgb",ns="srgb-linear",Ra="linear",dt="srgb",Zi=7680,Ld=519,Em=512,wm=513,Tm=514,xc=515,Am=516,Rm=517,vc=518,Cm=519,Dd=35044,Id="300 es",Xn=2e3,is=2001;function Pm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function rs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lm(){const n=rs("canvas");return n.style.display="block",n}const Nd={};function Ud(...n){const e="THREE."+n.shift();console.log(e,...n)}function Vh(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=Vh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ot(...n){n=Vh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function gr(...n){const e=n.join(" ");e in Nd||(Nd[e]=!0,Oe(...n))}function Dm(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Im={[nl]:il,[rl]:ol,[sl]:ll,[_r]:al,[il]:nl,[ol]:rl,[ll]:sl,[al]:_r};class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zd=1234567;const xr=Math.PI/180,ss=180/Math.PI;function Rr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function yc(n,e){return(n%e+e)%e}function Nm(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Um(n,e,t){return n!==e?(t-n)/(e-n):0}function $r(n,e,t){return(1-t)*n+t*e}function zm(n,e,t,i){return $r(n,e,1-Math.exp(-t*i))}function Om(n,e=1){return e-Math.abs(yc(n,e*2)-e)}function Fm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Bm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function km(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Vm(n,e){return n+Math.random()*(e-n)}function Hm(n){return n*(.5-Math.random())}function Gm(n){n!==void 0&&(zd=n);let e=zd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Wm(n){return n*xr}function Xm(n){return n*ss}function qm(n){return(n&n-1)===0&&n!==0}function Ym(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zm(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Km(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),d=a((e+i)/2),h=s((e-i)/2),u=a((e-i)/2),f=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*d,c*h,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*h,o*l);break;case"ZXZ":n.set(c*h,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*g,c*f,o*l);break;case"YXY":n.set(c*f,o*d,c*g,o*l);break;case"ZYZ":n.set(c*g,c*f,o*d,o*l);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function hr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const It={DEG2RAD:xr,RAD2DEG:ss,generateUUID:Rr,clamp:$e,euclideanModulo:yc,mapLinear:Nm,inverseLerp:Um,lerp:$r,damp:zm,pingpong:Om,smoothstep:Fm,smootherstep:Bm,randInt:km,randFloat:Vm,randFloatSpread:Hm,seededRandom:Gm,degToRad:Wm,radToDeg:Xm,isPowerOfTwo:qm,ceilPowerOfTwo:Ym,floorPowerOfTwo:Zm,setQuaternionFromProperEuler:Km,normalize:tn,denormalize:hr},Jc=class Jc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jc.prototype.isVector2=!0;let Se=Jc;class zn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3],u=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(h!==x||c!==u||l!==f||d!==g){let m=c*u+l*f+d*g+h*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const _=Math.acos(m),S=Math.sin(_);p=Math.sin(p*_)/S,o=Math.sin(o*_)/S,c=c*p+u*o,l=l*p+f*o,d=d*p+g*o,h=h*p+x*o}else{c=c*p+u*o,l=l*p+f*o,d=d*p+g*o,h=h*p+x*o;const _=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=_,l*=_,d*=_,h*=_}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],d=i[r+3],h=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+d*h+c*f-l*u,e[t+1]=c*g+d*u+l*h-o*f,e[t+2]=l*g+d*f+o*u-c*h,e[t+3]=d*g-o*h-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(r/2),h=o(s/2),u=c(i/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"YXZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"ZXY":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"ZYX":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"YZX":this._x=u*d*h+l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h-u*f*g;break;case"XZY":this._x=u*d*h-l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h+u*f*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(d-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+d)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+r*l-s*c,this._y=r*d+a*c+s*o-i*l,this._z=s*d+a*l+i*c-r*o,this._w=a*d-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Qc=class Qc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Od.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Od.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),d=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*d,this.y=i+c*d+o*l-s*h,this.z=r+c*h+s*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Qa.copy(this).projectOnVector(e),this.sub(Qa)}reflect(e){return this.sub(Qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qc.prototype.isVector3=!0;let D=Qc;const Qa=new D,Od=new zn,$c=class $c{constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],f=i[5],g=i[8],x=r[0],m=r[3],p=r[6],_=r[1],S=r[4],y=r[7],w=r[2],b=r[5],A=r[8];return s[0]=a*x+o*_+c*w,s[3]=a*m+o*S+c*b,s[6]=a*p+o*y+c*A,s[1]=l*x+d*_+h*w,s[4]=l*m+d*S+h*b,s[7]=l*p+d*y+h*A,s[2]=u*x+f*_+g*w,s[5]=u*m+f*S+g*b,s[8]=u*p+f*y+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*s*d+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*s,f=l*s-a*c,g=t*h+i*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(r*l-d*i)*x,e[2]=(o*i-r*a)*x,e[3]=u*x,e[4]=(d*t-r*c)*x,e[5]=(r*s-o*t)*x,e[6]=f*x,e[7]=(i*c-l*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($a.makeScale(e,t)),this}rotate(e){return gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($a.makeRotation(-e)),this}translate(e,t){return gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};$c.prototype.isMatrix3=!0;let ke=$c;const $a=new ke,Fd=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bd=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jm(){const n={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===dt&&(r.r=ai(r.r),r.g=ai(r.g),r.b=ai(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===dt&&(r.r=vr(r.r),r.g=vr(r.g),r.b=vr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ni?Ra:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return gr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return gr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ns]:{primaries:e,whitePoint:i,transfer:Ra,toXYZ:Fd,fromXYZ:Bd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:Fd,fromXYZ:Bd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),n}const Qe=jm();function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ki;class Jm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ki===void 0&&(Ki=rs("canvas")),Ki.width=e.width,Ki.height=e.height;const r=Ki.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ki}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ai(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qm=0;class _c{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Rr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(eo(r[a].image)):s.push(eo(r[a]))}else s=eo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function eo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Jm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let $m=0;const to=new D;class jt extends Gi{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=ri,r=ri,s=zt,a=si,o=mn,c=sn,l=jt.DEFAULT_ANISOTROPY,d=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=Rr(),this.name="",this.source=new _c(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(to).x}get height(){return this.source.getSize(to).y}get depth(){return this.source.getSize(to).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Un:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case cl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Un:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case cl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Nh;jt.DEFAULT_ANISOTROPY=1;const ed=class ed{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,y=(f+1)/2,w=(p+1)/2,b=(d+u)/4,A=(h+x)/4,v=(g+m)/4;return S>y&&S>w?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=b/i,s=A/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=b/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=v/s),this.set(i,r,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(u-d)*(u-d));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-x)/_,this.z=(u-d)/_,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ed.prototype.isVector4=!0;let wt=ed;class e0 extends Gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new jt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new _c(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ht extends e0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Hh extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class t0 extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ia=class Ia{constructor(e,t,i,r,s,a,o,c,l,d,h,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,d,h,u,f,g,x,m)}set(e,t,i,r,s,a,o,c,l,d,h,u,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ia().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ji.setFromMatrixColumn(e,0).length(),s=1/ji.setFromMatrixColumn(e,1).length(),a=1/ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*d,f=a*h,g=o*d,x=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,f=c*h,g=l*d,x=l*h;t[0]=u+x*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,f=c*h,g=l*d,x=l*h;t[0]=u-x*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,f=a*h,g=o*d,x=o*h;t[0]=c*d,t[4]=g*l-f,t[8]=u*l+x,t[1]=c*h,t[5]=x*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,x=o*l;t[0]=c*d,t[4]=x-u*h,t[8]=g*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=f*h+g,t[10]=u-x*h}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,x=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+x,t[5]=a*d,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*d,t[10]=x*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(n0,e,i0)}lookAt(e,t,i){const r=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),pi.crossVectors(i,dn),pi.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),pi.crossVectors(i,dn)),pi.normalize(),Ss.crossVectors(dn,pi),r[0]=pi.x,r[4]=Ss.x,r[8]=dn.x,r[1]=pi.y,r[5]=Ss.y,r[9]=dn.y,r[2]=pi.z,r[6]=Ss.z,r[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],_=i[3],S=i[7],y=i[11],w=i[15],b=r[0],A=r[4],v=r[8],E=r[12],R=r[1],P=r[5],L=r[9],F=r[13],B=r[2],z=r[6],W=r[10],k=r[14],Z=r[3],J=r[7],ne=r[11],ae=r[15];return s[0]=a*b+o*R+c*B+l*Z,s[4]=a*A+o*P+c*z+l*J,s[8]=a*v+o*L+c*W+l*ne,s[12]=a*E+o*F+c*k+l*ae,s[1]=d*b+h*R+u*B+f*Z,s[5]=d*A+h*P+u*z+f*J,s[9]=d*v+h*L+u*W+f*ne,s[13]=d*E+h*F+u*k+f*ae,s[2]=g*b+x*R+m*B+p*Z,s[6]=g*A+x*P+m*z+p*J,s[10]=g*v+x*L+m*W+p*ne,s[14]=g*E+x*F+m*k+p*ae,s[3]=_*b+S*R+y*B+w*Z,s[7]=_*A+S*P+y*z+w*J,s[11]=_*v+S*L+y*W+w*ne,s[15]=_*E+S*F+y*k+w*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],_=c*f-l*u,S=o*f-l*h,y=o*u-c*h,w=a*f-l*d,b=a*u-c*d,A=a*h-o*d;return t*(x*_-m*S+p*y)-i*(g*_-m*w+p*b)+r*(g*S-x*w+p*A)-s*(g*y-x*b+m*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(s*d-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],_=t*o-i*a,S=t*c-r*a,y=t*l-s*a,w=i*c-r*o,b=i*l-s*o,A=r*l-s*c,v=d*x-h*g,E=d*m-u*g,R=d*p-f*g,P=h*m-u*x,L=h*p-f*x,F=u*p-f*m,B=_*F-S*L+y*P+w*R-b*E+A*v;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/B;return e[0]=(o*F-c*L+l*P)*z,e[1]=(r*L-i*F-s*P)*z,e[2]=(x*A-m*b+p*w)*z,e[3]=(u*b-h*A-f*w)*z,e[4]=(c*R-a*F-l*E)*z,e[5]=(t*F-r*R+s*E)*z,e[6]=(m*y-g*A-p*S)*z,e[7]=(d*A-u*y+f*S)*z,e[8]=(a*L-o*R+l*v)*z,e[9]=(i*R-t*L-s*v)*z,e[10]=(g*b-x*y+p*_)*z,e[11]=(h*y-d*b-f*_)*z,e[12]=(o*E-a*P-c*v)*z,e[13]=(t*P-i*E+r*v)*z,e[14]=(x*S-g*w-m*_)*z,e[15]=(d*w-h*S+u*_)*z,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,d=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+i,d*c-r*a,0,l*c-r*o,d*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,d=a+a,h=o+o,u=s*l,f=s*d,g=s*h,x=a*d,m=a*h,p=o*h,_=c*l,S=c*d,y=c*h,w=i.x,b=i.y,A=i.z;return r[0]=(1-(x+p))*w,r[1]=(f+y)*w,r[2]=(g-S)*w,r[3]=0,r[4]=(f-y)*b,r[5]=(1-(u+p))*b,r[6]=(m+_)*b,r[7]=0,r[8]=(g+S)*A,r[9]=(m-_)*A,r[10]=(1-(u+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ji.set(r[0],r[1],r[2]).length();const o=ji.set(r[4],r[5],r[6]).length(),c=ji.set(r[8],r[9],r[10]).length();s<0&&(a=-a),En.copy(this);const l=1/a,d=1/o,h=1/c;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=d,En.elements[5]*=d,En.elements[6]*=d,En.elements[8]*=h,En.elements[9]*=h,En.elements[10]*=h,t.setFromRotationMatrix(En),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Xn,c=!1){const l=this.elements,d=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r);let g,x;if(c)g=s/(a-s),x=a*s/(a-s);else if(o===Xn)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===is)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Xn,c=!1){const l=this.elements,d=2/(t-e),h=2/(i-r),u=-(t+e)/(t-e),f=-(i+r)/(i-r);let g,x;if(c)g=1/(a-s),x=a/(a-s);else if(o===Xn)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===is)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Ia.prototype.isMatrix4=!0;let it=Ia;const ji=new D,En=new it,n0=new D(0,0,0),i0=new D(1,1,1),pi=new D,Ss=new D,dn=new D,kd=new it,Vd=new zn;class Sn{constructor(e=0,t=0,i=0,r=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return kd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class Gh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let r0=0;const Hd=new D,Ji=new zn,Jn=new it,bs=new D,Ir=new D,s0=new D,a0=new zn,Gd=new D(1,0,0),Wd=new D(0,1,0),Xd=new D(0,0,1),qd={type:"added"},o0={type:"removed"},Qi={type:"childadded",child:null},no={type:"childremoved",child:null};class Pt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=Rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new D,t=new Sn,i=new zn,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new it},normalMatrix:{value:new ke}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(Gd,e)}rotateY(e){return this.rotateOnAxis(Wd,e)}rotateZ(e){return this.rotateOnAxis(Xd,e)}translateOnAxis(e,t){return Hd.copy(e).applyQuaternion(this.quaternion),this.position.add(Hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gd,e)}translateY(e){return this.translateOnAxis(Wd,e)}translateZ(e){return this.translateOnAxis(Xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?bs.copy(e):bs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Ir,bs,this.up):Jn.lookAt(bs,Ir,this.up),this.quaternion.setFromRotationMatrix(Jn),r&&(Jn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Jn),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qd),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(o0),no.child=e,this.dispatchEvent(no),no.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qd),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,s0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,a0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new D(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class nt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const l0={type:"move"};class io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(l0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new nt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},Es={h:0,s:0,l:0};function ro(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=yc(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ro(a,s,e+1/3),this.g=ro(a,s,e),this.b=ro(a,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Zt){function i(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const i=Wh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return Qe.workingToColorSpace($t.copy(this),e),Math.round($e($t.r*255,0,255))*65536+Math.round($e($t.g*255,0,255))*256+Math.round($e($t.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace($t.copy(this),t);const i=$t.r,r=$t.g,s=$t.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Zt){Qe.workingToColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,r=$t.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(Es);const i=$r(mi.h,Es.h,t),r=$r(mi.s,Es.s,t),s=$r(mi.l,Es.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new Ue;Ue.NAMES=Wh;class Mc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new Mc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xh extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wn=new D,Qn=new D,so=new D,$n=new D,$i=new D,er=new D,Yd=new D,ao=new D,oo=new D,lo=new D,co=new wt,uo=new wt,ho=new wt;class Mn{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),wn.subVectors(e,t),r.cross(wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){wn.subVectors(r,t),Qn.subVectors(i,t),so.subVectors(e,t);const a=wn.dot(wn),o=wn.dot(Qn),c=wn.dot(so),l=Qn.dot(Qn),d=Qn.dot(so),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,f=(l*c-o*d)*u,g=(a*d-o*c)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,$n.x),c.addScaledVector(a,$n.y),c.addScaledVector(o,$n.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return co.setScalar(0),uo.setScalar(0),ho.setScalar(0),co.fromBufferAttribute(e,t),uo.fromBufferAttribute(e,i),ho.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(co,s.x),a.addScaledVector(uo,s.y),a.addScaledVector(ho,s.z),a}static isFrontFacing(e,t,i,r){return wn.subVectors(i,t),Qn.subVectors(e,t),wn.cross(Qn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),wn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Mn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;$i.subVectors(r,i),er.subVectors(s,i),ao.subVectors(e,i);const c=$i.dot(ao),l=er.dot(ao);if(c<=0&&l<=0)return t.copy(i);oo.subVectors(e,r);const d=$i.dot(oo),h=er.dot(oo);if(d>=0&&h<=d)return t.copy(r);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector($i,a);lo.subVectors(e,s);const f=$i.dot(lo),g=er.dot(lo);if(g>=0&&f<=g)return t.copy(s);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(er,o);const m=d*g-f*h;if(m<=0&&h-d>=0&&f-g>=0)return Yd.subVectors(s,r),o=(h-d)/(h-d+(f-g)),t.copy(r).addScaledVector(Yd,o);const p=1/(m+x+u);return a=x*p,o=u*p,t.copy(i).addScaledVector($i,a).addScaledVector(er,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Wi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(s,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ws.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ws.copy(i.boundingBox)),ws.applyMatrix4(e.matrixWorld),this.union(ws)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Nr),Ts.subVectors(this.max,Nr),tr.subVectors(e.a,Nr),nr.subVectors(e.b,Nr),ir.subVectors(e.c,Nr),gi.subVectors(nr,tr),xi.subVectors(ir,nr),Ti.subVectors(tr,ir);let t=[0,-gi.z,gi.y,0,-xi.z,xi.y,0,-Ti.z,Ti.y,gi.z,0,-gi.x,xi.z,0,-xi.x,Ti.z,0,-Ti.x,-gi.y,gi.x,0,-xi.y,xi.x,0,-Ti.y,Ti.x,0];return!fo(t,tr,nr,ir,Ts)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,tr,nr,ir,Ts))?!1:(As.crossVectors(gi,xi),t=[As.x,As.y,As.z],fo(t,tr,nr,ir,Ts))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ei=[new D,new D,new D,new D,new D,new D,new D,new D],Tn=new D,ws=new Wi,tr=new D,nr=new D,ir=new D,gi=new D,xi=new D,Ti=new D,Nr=new D,Ts=new D,As=new D,Ai=new D;function fo(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ai.fromArray(n,s);const o=r.x*Math.abs(Ai.x)+r.y*Math.abs(Ai.y)+r.z*Math.abs(Ai.z),c=e.dot(Ai),l=t.dot(Ai),d=i.dot(Ai);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Ot=new D,Rs=new Se;let c0=0;class kt extends Gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:c0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Dd,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class qh extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yh extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ge extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}const d0=new Wi,Ur=new D,po=new D;class Cr{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):d0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ur,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(po)),this.expandByPoint(Ur.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let u0=0;const xn=new it,mo=new Pt,rr=new D,un=new Wi,zr=new Wi,Xt=new D;class St extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Rr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pm(e)?Yh:qh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return mo.lookAt(e),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ge(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];zr.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(un.min,zr.min),un.expandByPoint(Xt),Xt.addVectors(un.max,zr.max),un.expandByPoint(Xt)):(un.expandByPoint(zr.min),un.expandByPoint(zr.max))}un.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Xt.fromBufferAttribute(o,l),c&&(rr.fromBufferAttribute(e,l),Xt.add(rr)),r=Math.max(r,i.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new kt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new D,c[v]=new D;const l=new D,d=new D,h=new D,u=new Se,f=new Se,g=new Se,x=new D,m=new D;function p(v,E,R){l.fromBufferAttribute(i,v),d.fromBufferAttribute(i,E),h.fromBufferAttribute(i,R),u.fromBufferAttribute(s,v),f.fromBufferAttribute(s,E),g.fromBufferAttribute(s,R),d.sub(l),h.sub(l),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(d).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(P),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(P),o[v].add(x),o[E].add(x),o[R].add(x),c[v].add(m),c[E].add(m),c[R].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let v=0,E=_.length;v<E;++v){const R=_[v],P=R.start,L=R.count;for(let F=P,B=P+L;F<B;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new D,y=new D,w=new D,b=new D;function A(v){w.fromBufferAttribute(r,v),b.copy(w);const E=o[v];S.copy(E),S.sub(w.multiplyScalar(w.dot(E))).normalize(),y.crossVectors(b,E);const P=y.dot(c[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,P)}for(let v=0,E=_.length;v<E;++v){const R=_[v],P=R.start,L=R.count;for(let F=P,B=P+L;F<B;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const r=new D,s=new D,a=new D,o=new D,c=new D,l=new D,d=new D,h=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*d;for(let p=0;p<d;p++)u[g++]=l[f++]}return new kt(u,d,h)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],f=e(u,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const f=l[h];d.push(f.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let h0=0;class bi extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=Rr(),this.name="",this.type="Material",this.blending=mr,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qo,this.blendDst=$o,this.blendEquation=Pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ld,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==mr&&(i.blending=this.blending),this.side!==ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qo&&(i.blendSrc=this.blendSrc),this.blendDst!==$o&&(i.blendDst=this.blendDst),this.blendEquation!==Pn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ld&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Se().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Se().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ti=new D,go=new D,Cs=new D,vi=new D,xo=new D,Ps=new D,vo=new D;class Zh{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){go.copy(e).add(t).multiplyScalar(.5),Cs.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(go);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Cs),o=vi.dot(this.direction),c=-vi.dot(Cs),l=vi.lengthSq(),d=Math.abs(1-a*a);let h,u,f,g;if(d>0)if(h=a*c-o,u=a*o-c,g=s*d,h>=0)if(u>=-g)if(u<=g){const x=1/d;h*=x,u*=x,f=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=s,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;else u<=-g?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l):u<=g?(h=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),f=-h*h+u*(u+2*c)+l);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(go).addScaledVector(Cs,u),f}intersectSphere(e,t){ti.subVectors(e.center,this.origin);const i=ti.dot(this.direction),r=ti.dot(ti)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,i,r,s){xo.subVectors(t,e),Ps.subVectors(i,e),vo.crossVectors(xo,Ps);let a=this.direction.dot(vo),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vi.subVectors(this.origin,e);const c=o*this.direction.dot(Ps.crossVectors(vi,Ps));if(c<0)return null;const l=o*this.direction.dot(xo.cross(vi));if(l<0||c+l>a)return null;const d=-o*vi.dot(vo);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zd=new it,Ri=new Zh,Ls=new Cr,Kd=new D,Ds=new D,Is=new D,Ns=new D,yo=new D,Us=new D,jd=new D,zs=new D;class ze extends Pt{constructor(e=new St,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&(yo.fromBufferAttribute(h,e),a?Us.addScaledVector(yo,d):Us.addScaledVector(yo.sub(t),d))}t.add(Us)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ls.copy(i.boundingSphere),Ls.applyMatrix4(s),Ri.copy(e.ray).recast(e.near),!(Ls.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Ls,Kd)===null||Ri.origin.distanceToSquared(Kd)>(e.far-e.near)**2))&&(Zd.copy(s).invert(),Ri.copy(e.ray).applyMatrix4(Zd),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=S;y<w;y+=3){const b=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);r=Os(this,p,e,i,l,d,h,b,A,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);r=Os(this,a,e,i,l,d,h,_,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=S;y<w;y+=3){const b=y,A=y+1,v=y+2;r=Os(this,p,e,i,l,d,h,b,A,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=m,S=m+1,y=m+2;r=Os(this,a,e,i,l,d,h,_,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function f0(n,e,t,i,r,s,a,o){let c;if(e.side===an?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===ci,o),c===null)return null;zs.copy(o),zs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(zs);return l<t.near||l>t.far?null:{distance:l,point:zs.clone(),object:n}}function Os(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Ds),n.getVertexPosition(c,Is),n.getVertexPosition(l,Ns);const d=f0(n,e,t,i,Ds,Is,Ns,jd);if(d){const h=new D;Mn.getBarycoord(jd,Ds,Is,Ns,h),r&&(d.uv=Mn.getInterpolatedAttribute(r,o,c,l,h,new Se)),s&&(d.uv1=Mn.getInterpolatedAttribute(s,o,c,l,h,new Se)),a&&(d.normal=Mn.getInterpolatedAttribute(a,o,c,l,h,new D),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new D,materialIndex:0};Mn.getNormal(Ds,Is,Ns,u.normal),d.face=u,d.barycoord=h}return d}class us extends jt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Ut,d=Ut,h,u){super(null,a,o,c,l,d,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jd extends kt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const sr=new it,Qd=new it,Fs=[],$d=new Wi,p0=new it,Or=new ze,Fr=new Cr;class jr extends ze{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jd(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,p0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),$d.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union($d)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),Fr.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(i),e.ray.intersectsSphere(Fr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,sr),Qd.multiplyMatrices(i,sr),Or.matrixWorld=Qd,Or.raycast(e,Fs);for(let a=0,o=Fs.length;a<o;a++){const c=Fs[a];c.instanceId=s,c.object=this,t.push(c)}Fs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new us(new Float32Array(r*this.count),r,this.count,fc,Ln));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _o=new D,m0=new D,g0=new ke;class Pi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=_o.subVectors(i,t).cross(m0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(_o),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||g0.getNormalMatrix(e),r=this.coplanarPoint(_o).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Cr,x0=new Se(.5,.5),Bs=new D;class Sc{constructor(e=new Pi,t=new Pi,i=new Pi,r=new Pi,s=new Pi,a=new Pi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Xn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],_=s[12],S=s[13],y=s[14],w=s[15];if(r[0].setComponents(l-a,f-d,p-g,w-_).normalize(),r[1].setComponents(l+a,f+d,p+g,w+_).normalize(),r[2].setComponents(l+o,f+h,p+x,w+S).normalize(),r[3].setComponents(l-o,f-h,p-x,w-S).normalize(),i)r[4].setComponents(c,u,m,y).normalize(),r[5].setComponents(l-c,f-u,p-m,w-y).normalize();else if(r[4].setComponents(l-c,f-u,p-m,w-y).normalize(),t===Xn)r[5].setComponents(l+c,f+u,p+m,w+y).normalize();else if(t===is)r[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){Ci.center.set(0,0,0);const t=x0.distanceTo(e.center);return Ci.radius=.7071067811865476+t,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Bs.x=r.normal.x>0?e.max.x:e.min.x,Bs.y=r.normal.y>0?e.max.y:e.min.y,Bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class kl extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new D,Pa=new D,eu=new it,Br=new Zh,ks=new Cr,Mo=new D,tu=new D;class v0 extends Pt{constructor(e=new St,t=new kl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ca.fromBufferAttribute(t,r-1),Pa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ca.distanceTo(Pa);e.setAttribute("lineDistance",new Ge(i,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(r),ks.radius+=s,e.ray.intersectsSphere(ks)===!1)return;eu.copy(r).invert(),Br.copy(e.ray).applyMatrix4(eu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=d.getX(x),_=d.getX(x+1),S=Vs(this,e,Br,c,p,_,x);S&&t.push(S)}if(this.isLineLoop){const x=d.getX(g-1),m=d.getX(f),p=Vs(this,e,Br,c,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=Vs(this,e,Br,c,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Vs(this,e,Br,c,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vs(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Ca.fromBufferAttribute(o,r),Pa.fromBufferAttribute(o,s),t.distanceSqToSegment(Ca,Pa,Mo,tu)>i)return;Mo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Mo);if(!(l<e.near||l>e.far))return{distance:l,point:tu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const nu=new D,iu=new D;class So extends v0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)nu.fromBufferAttribute(t,r),iu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+nu.distanceTo(iu);e.setAttribute("lineDistance",new Ge(i,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kh extends jt{constructor(e=[],t=zi,i,r,s,a,o,c,l,d){super(e,t,i,r,s,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fi extends jt{constructor(e,t,i=Kn,r,s,a,o=Ut,c=Ut,l,d=di,h=1){if(d!==di&&d!==Mi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,r,s,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _c(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class y0 extends Fi{constructor(e,t=Kn,i=zi,r,s,a=Ut,o=Ut,c,l=di){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class jh extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class on extends St{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(h,2));function g(x,m,p,_,S,y,w,b,A,v,E){const R=y/A,P=w/v,L=y/2,F=w/2,B=b/2,z=A+1,W=v+1;let k=0,Z=0;const J=new D;for(let ne=0;ne<W;ne++){const ae=ne*P-F;for(let le=0;le<z;le++){const Ve=le*R-L;J[x]=Ve*_,J[m]=ae*S,J[p]=B,l.push(J.x,J.y,J.z),J[x]=0,J[m]=0,J[p]=b>0?1:-1,d.push(J.x,J.y,J.z),h.push(le/A),h.push(1-ne/v),k+=1}}for(let ne=0;ne<v;ne++)for(let ae=0;ae<A;ae++){const le=u+ae+z*ne,Ve=u+ae+z*(ne+1),je=u+(ae+1)+z*(ne+1),Be=u+(ae+1)+z*ne;c.push(le,Ve,Be),c.push(Ve,je,Be),Z+=6}o.addGroup(f,Z,E),f+=Z,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bc extends St{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],d=t/2,h=Math.PI/2*e,u=t,f=2*h+u,g=i*2+s,x=r+1,m=new D,p=new D;for(let _=0;_<=g;_++){let S=0,y=0,w=0,b=0;if(_<=i){const E=_/i,R=E*Math.PI/2;y=-d-e*Math.cos(R),w=e*Math.sin(R),b=-e*Math.cos(R),S=E*h}else if(_<=i+s){const E=(_-i)/s;y=-d+E*t,w=e,b=0,S=h+E*u}else{const E=(_-i-s)/i,R=E*Math.PI/2;y=d+e*Math.sin(R),w=e*Math.cos(R),b=e*Math.sin(R),S=h+u+E*h}const A=Math.max(0,Math.min(1,S/f));let v=0;_===0?v=.5/r:_===g&&(v=-.5/r);for(let E=0;E<=r;E++){const R=E/r,P=R*Math.PI*2,L=Math.sin(P),F=Math.cos(P);p.x=-w*F,p.y=y,p.z=w*L,o.push(p.x,p.y,p.z),m.set(-w*F,b,w*L),m.normalize(),c.push(m.x,m.y,m.z),l.push(R+v,A)}if(_>0){const E=(_-1)*x;for(let R=0;R<r;R++){const P=E+R,L=E+R+1,F=_*x+R,B=_*x+R+1;a.push(P,L,F),a.push(L,B,F)}}}this.setIndex(a),this.setAttribute("position",new Ge(o,3)),this.setAttribute("normal",new Ge(c,3)),this.setAttribute("uv",new Ge(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ec extends St{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new D,d=new Se;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const f=i+h/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(a[u]/e+1)/2,d.y=(a[u+1]/e+1)/2,c.push(d.x,d.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Ge(a,3)),this.setAttribute("normal",new Ge(o,3)),this.setAttribute("uv",new Ge(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ec(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class wc extends St{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],u=[],f=[];let g=0;const x=[],m=i/2;let p=0;_(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(d),this.setAttribute("position",new Ge(h,3)),this.setAttribute("normal",new Ge(u,3)),this.setAttribute("uv",new Ge(f,2));function _(){const y=new D,w=new D;let b=0;const A=(t-e)/i;for(let v=0;v<=s;v++){const E=[],R=v/s,P=R*(t-e)+e;for(let L=0;L<=r;L++){const F=L/r,B=F*c+o,z=Math.sin(B),W=Math.cos(B);w.x=P*z,w.y=-R*i+m,w.z=P*W,h.push(w.x,w.y,w.z),y.set(z,A,W).normalize(),u.push(y.x,y.y,y.z),f.push(F,1-R),E.push(g++)}x.push(E)}for(let v=0;v<r;v++)for(let E=0;E<s;E++){const R=x[E][v],P=x[E+1][v],L=x[E+1][v+1],F=x[E][v+1];(e>0||E!==0)&&(d.push(R,P,F),b+=3),(t>0||E!==s-1)&&(d.push(P,L,F),b+=3)}l.addGroup(p,b,0),p+=b}function S(y){const w=g,b=new Se,A=new D;let v=0;const E=y===!0?e:t,R=y===!0?1:-1;for(let L=1;L<=r;L++)h.push(0,m*R,0),u.push(0,R,0),f.push(.5,.5),g++;const P=g;for(let L=0;L<=r;L++){const B=L/r*c+o,z=Math.cos(B),W=Math.sin(B);A.x=E*W,A.y=m*R,A.z=E*z,h.push(A.x,A.y,A.z),u.push(0,R,0),b.x=z*.5+.5,b.y=W*.5*R+.5,f.push(b.x,b.y),g++}for(let L=0;L<r;L++){const F=w+L,B=P+L;y===!0?d.push(B,B+1,F):d.push(B+1,B,F),v+=3}l.addGroup(p,v,y===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class za extends St{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),l(i),d(),this.setAttribute("position",new Ge(s,3)),this.setAttribute("normal",new Ge(s.slice(),3)),this.setAttribute("uv",new Ge(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const S=new D,y=new D,w=new D;for(let b=0;b<t.length;b+=3)f(t[b+0],S),f(t[b+1],y),f(t[b+2],w),c(S,y,w,_)}function c(_,S,y,w){const b=w+1,A=[];for(let v=0;v<=b;v++){A[v]=[];const E=_.clone().lerp(y,v/b),R=S.clone().lerp(y,v/b),P=b-v;for(let L=0;L<=P;L++)L===0&&v===b?A[v][L]=E:A[v][L]=E.clone().lerp(R,L/P)}for(let v=0;v<b;v++)for(let E=0;E<2*(b-v)-1;E++){const R=Math.floor(E/2);E%2===0?(u(A[v][R+1]),u(A[v+1][R]),u(A[v][R])):(u(A[v][R+1]),u(A[v+1][R+1]),u(A[v+1][R]))}}function l(_){const S=new D;for(let y=0;y<s.length;y+=3)S.x=s[y+0],S.y=s[y+1],S.z=s[y+2],S.normalize().multiplyScalar(_),s[y+0]=S.x,s[y+1]=S.y,s[y+2]=S.z}function d(){const _=new D;for(let S=0;S<s.length;S+=3){_.x=s[S+0],_.y=s[S+1],_.z=s[S+2];const y=m(_)/2/Math.PI+.5,w=p(_)/Math.PI+.5;a.push(y,1-w)}g(),h()}function h(){for(let _=0;_<a.length;_+=6){const S=a[_+0],y=a[_+2],w=a[_+4],b=Math.max(S,y,w),A=Math.min(S,y,w);b>.9&&A<.1&&(S<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function u(_){s.push(_.x,_.y,_.z)}function f(_,S){const y=_*3;S.x=e[y+0],S.y=e[y+1],S.z=e[y+2]}function g(){const _=new D,S=new D,y=new D,w=new D,b=new Se,A=new Se,v=new Se;for(let E=0,R=0;E<s.length;E+=9,R+=6){_.set(s[E+0],s[E+1],s[E+2]),S.set(s[E+3],s[E+4],s[E+5]),y.set(s[E+6],s[E+7],s[E+8]),b.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),v.set(a[R+4],a[R+5]),w.copy(_).add(S).add(y).divideScalar(3);const P=m(w);x(b,R+0,_,P),x(A,R+2,S,P),x(v,R+4,y,P)}}function x(_,S,y,w){w<0&&_.x===1&&(a[S]=_.x-1),y.x===0&&y.z===0&&(a[S]=w/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.vertices,e.indices,e.radius,e.detail)}}const Hs=new D,Gs=new D,bo=new D,Ws=new Mn;class ru extends St{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(xr*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],h=new Array(3),u={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:x,b:m,c:p}=Ws;if(x.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),Ws.getNormal(bo),h[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let _=0;_<3;_++){const S=(_+1)%3,y=h[_],w=h[S],b=Ws[d[_]],A=Ws[d[S]],v=`${y}_${w}`,E=`${w}_${y}`;E in u&&u[E]?(bo.dot(u[E].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(A.x,A.y,A.z)),u[E]=null):v in u||(u[v]={index0:l[_],index1:l[S],normal:bo.clone()})}}for(const g in u)if(u[g]){const{index0:x,index1:m}=u[g];Hs.fromBufferAttribute(o,x),Gs.fromBufferAttribute(o,m),f.push(Hs.x,Hs.y,Hs.z),f.push(Gs.x,Gs.y,Gs.z)}this.setAttribute("position",new Ge(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Tc extends za{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Tc(e.radius,e.detail)}}class Pr extends St{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,d=c+1,h=e/o,u=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<d;p++){const _=p*u-a;for(let S=0;S<l;S++){const y=S*h-s;g.push(y,-_,0),x.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<o;_++){const S=_+l*p,y=_+l*(p+1),w=_+1+l*(p+1),b=_+1+l*p;f.push(S,y,b),f.push(y,w,b)}this.setIndex(f),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(x,3)),this.setAttribute("uv",new Ge(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ii extends St{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],d=[];let h=e;const u=(t-e)/r,f=new D,g=new Se;for(let x=0;x<=r;x++){for(let m=0;m<=i;m++){const p=s+m/i*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let x=0;x<r;x++){const m=x*(i+1);for(let p=0;p<i;p++){const _=p+m,S=_,y=_+i+1,w=_+i+2,b=_+1;o.push(S,y,b),o.push(y,w,b)}}this.setIndex(o),this.setAttribute("position",new Ge(c,3)),this.setAttribute("normal",new Ge(l,3)),this.setAttribute("uv",new Ge(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ac extends St{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new D,u=new D,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const _=[],S=p/i,y=a+S*o,w=e*Math.cos(y),b=Math.sqrt(e*e-w*w);let A=0;p===0&&a===0?A=.5/t:p===i&&c===Math.PI&&(A=-.5/t);for(let v=0;v<=t;v++){const E=v/t,R=r+E*s;h.x=-b*Math.cos(R),h.y=w,h.z=b*Math.sin(R),g.push(h.x,h.y,h.z),u.copy(h).normalize(),x.push(u.x,u.y,u.z),m.push(E+A,1-S),_.push(l++)}d.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){const S=d[p][_+1],y=d[p][_],w=d[p+1][_],b=d[p+1][_+1];(p!==0||a>0)&&f.push(S,y,b),(p!==i-1||c<Math.PI)&&f.push(y,w,b)}this.setIndex(f),this.setAttribute("position",new Ge(g,3)),this.setAttribute("normal",new Ge(x,3)),this.setAttribute("uv",new Ge(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Rc extends za{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,r,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Rc(e.radius,e.detail)}}class Oa extends St{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const c=[],l=[],d=[],h=[],u=new D,f=new D,g=new D;for(let x=0;x<=i;x++){const m=a+x/i*o;for(let p=0;p<=r;p++){const _=p/r*s;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),g.subVectors(f,u).normalize(),d.push(g.x,g.y,g.z),h.push(p/r),h.push(x/i)}}for(let x=1;x<=i;x++)for(let m=1;m<=r;m++){const p=(r+1)*x+m-1,_=(r+1)*(x-1)+m-1,S=(r+1)*(x-1)+m,y=(r+1)*x+m;c.push(p,_,y),c.push(_,S,y)}this.setIndex(c),this.setAttribute("position",new Ge(l,3)),this.setAttribute("normal",new Ge(d,3)),this.setAttribute("uv",new Ge(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function br(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(su(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(su(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=br(n[t]);for(const r in i)e[r]=i[r]}return e}function su(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function _0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Jh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const pn={clone:br,merge:nn};var M0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bt extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M0,this.fragmentShader=S0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=_0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ue().setHex(r.value);break;case"v2":this.uniforms[i].value=new Se().fromArray(r.value);break;case"v3":this.uniforms[i].value=new D().fromArray(r.value);break;case"v4":this.uniforms[i].value=new wt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(r.value);break;case"m4":this.uniforms[i].value=new it().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Qh extends bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _t extends bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ts,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Er extends _t{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class b0 extends bi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ts,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class E0 extends bi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ts,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=ic,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class w0 extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class T0 extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Eo={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(au(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!au(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function au(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class A0{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const R0=new A0;class Cc{constructor(e){this.manager=e!==void 0?e:R0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Cc.DEFAULT_MATERIAL_NAME="__DEFAULT";const ar=new WeakMap;class C0 extends Cc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Eo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=ar.get(a);h===void 0&&(h=[],ar.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=rs("img");function c(){d(),t&&t(this);const h=ar.get(this)||[];for(let u=0;u<h.length;u++){const f=h[u];f.onLoad&&f.onLoad(this)}ar.delete(this),s.manager.itemEnd(e)}function l(h){d(),r&&r(h),Eo.remove(`image:${e}`);const u=ar.get(this)||[];for(let f=0;f<u.length;f++){const g=u[f];g.onError&&g.onError(h)}ar.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Eo.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class P0 extends Cc{constructor(e){super(e)}load(e,t,i,r){const s=new jt,a=new C0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Pc extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class L0 extends Pc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const wo=new it,ou=new D,lu=new D;class $h{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sc,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ou.setFromMatrixPosition(e.matrixWorld),t.position.copy(ou),lu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lu),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===is||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Xs=new D,qs=new zn,kn=new D;class ef extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xs,qs,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Xs,qs,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const yi=new D,cu=new Se,du=new Se;class _n extends ef{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,cu,du),t.subVectors(du,cu)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class D0 extends $h{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}}class hs extends Pc{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new D0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class fs extends ef{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class I0 extends $h{constructor(){super(new fs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class uu extends Pc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new I0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const or=-90,lr=1;class N0 extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new _n(or,lr,e,t);r.layers=this.layers,this.add(r);const s=new _n(or,lr,e,t);s.layers=this.layers,this.add(s);const a=new _n(or,lr,e,t);a.layers=this.layers,this.add(a);const o=new _n(or,lr,e,t);o.layers=this.layers,this.add(o);const c=new _n(or,lr,e,t);c.layers=this.layers,this.add(c);const l=new _n(or,lr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Xn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===is)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class U0 extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class z0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=O0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function O0(){this._document.hidden===!1&&this.reset()}const td=class td{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};td.prototype.isMatrix2=!0;let hu=td;function fu(n,e,t,i){const r=F0(i);switch(t){case Bh:return n*e;case fc:return n*e/r.components*r.byteLength;case pc:return n*e/r.components*r.byteLength;case Oi:return n*e*2/r.components*r.byteLength;case mc:return n*e*2/r.components*r.byteLength;case kh:return n*e*3/r.components*r.byteLength;case mn:return n*e*4/r.components*r.byteLength;case gc:return n*e*4/r.components*r.byteLength;case fa:case pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ma:case ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ul:case fl:return Math.max(n,16)*Math.max(e,8)/4;case dl:case hl:return Math.max(n,8)*Math.max(e,8)/2;case pl:case ml:case xl:case vl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case gl:case Ta:case yl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _l:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case bl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case El:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case wl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Al:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Rl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Dl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Il:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Nl:case Ul:case zl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ol:case Fl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Aa:case Bl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function F0(n){switch(n){case sn:case Uh:return{byteLength:1,components:1};case es:case zh:case Kt:return{byteLength:2,components:1};case uc:case hc:return{byteLength:2,components:4};case Kn:case dc:case Ln:return{byteLength:4,components:1};case Oh:case Fh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nc}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nc);function tf(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function B0(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<h.length;f++){const g=h[u],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,h[u]=x)}h.length=u+1;for(let f=0,g=h.length;f<g;f++){const x=h[f];n.bufferSubData(l,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var k0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,V0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,H0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,G0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,X0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,q0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Y0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Z0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,K0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,j0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Q0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,og=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,cg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ug=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",xg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ag=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Dg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ig=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ng=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ug=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Fg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$g=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ex=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,dx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ux=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,gx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ax=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ix=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ux=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$x=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,e1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,t1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,s1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,o1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,l1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,u1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,m1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,g1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:k0,alphahash_pars_fragment:V0,alphamap_fragment:H0,alphamap_pars_fragment:G0,alphatest_fragment:W0,alphatest_pars_fragment:X0,aomap_fragment:q0,aomap_pars_fragment:Y0,batching_pars_vertex:Z0,batching_vertex:K0,begin_vertex:j0,beginnormal_vertex:J0,bsdfs:Q0,iridescence_fragment:$0,bumpmap_pars_fragment:eg,clipping_planes_fragment:tg,clipping_planes_pars_fragment:ng,clipping_planes_pars_vertex:ig,clipping_planes_vertex:rg,color_fragment:sg,color_pars_fragment:ag,color_pars_vertex:og,color_vertex:lg,common:cg,cube_uv_reflection_fragment:dg,defaultnormal_vertex:ug,displacementmap_pars_vertex:hg,displacementmap_vertex:fg,emissivemap_fragment:pg,emissivemap_pars_fragment:mg,colorspace_fragment:gg,colorspace_pars_fragment:xg,envmap_fragment:vg,envmap_common_pars_fragment:yg,envmap_pars_fragment:_g,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Dg,envmap_vertex:Sg,fog_vertex:bg,fog_pars_vertex:Eg,fog_fragment:wg,fog_pars_fragment:Tg,gradientmap_pars_fragment:Ag,lightmap_pars_fragment:Rg,lights_lambert_fragment:Cg,lights_lambert_pars_fragment:Pg,lights_pars_begin:Lg,lights_toon_fragment:Ig,lights_toon_pars_fragment:Ng,lights_phong_fragment:Ug,lights_phong_pars_fragment:zg,lights_physical_fragment:Og,lights_physical_pars_fragment:Fg,lights_fragment_begin:Bg,lights_fragment_maps:kg,lights_fragment_end:Vg,lightprobes_pars_fragment:Hg,logdepthbuf_fragment:Gg,logdepthbuf_pars_fragment:Wg,logdepthbuf_pars_vertex:Xg,logdepthbuf_vertex:qg,map_fragment:Yg,map_pars_fragment:Zg,map_particle_fragment:Kg,map_particle_pars_fragment:jg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:Qg,morphinstance_vertex:$g,morphcolor_vertex:ex,morphnormal_vertex:tx,morphtarget_pars_vertex:nx,morphtarget_vertex:ix,normal_fragment_begin:rx,normal_fragment_maps:sx,normal_pars_fragment:ax,normal_pars_vertex:ox,normal_vertex:lx,normalmap_pars_fragment:cx,clearcoat_normal_fragment_begin:dx,clearcoat_normal_fragment_maps:ux,clearcoat_pars_fragment:hx,iridescence_pars_fragment:fx,opaque_fragment:px,packing:mx,premultiplied_alpha_fragment:gx,project_vertex:xx,dithering_fragment:vx,dithering_pars_fragment:yx,roughnessmap_fragment:_x,roughnessmap_pars_fragment:Mx,shadowmap_pars_fragment:Sx,shadowmap_pars_vertex:bx,shadowmap_vertex:Ex,shadowmask_pars_fragment:wx,skinbase_vertex:Tx,skinning_pars_vertex:Ax,skinning_vertex:Rx,skinnormal_vertex:Cx,specularmap_fragment:Px,specularmap_pars_fragment:Lx,tonemapping_fragment:Dx,tonemapping_pars_fragment:Ix,transmission_fragment:Nx,transmission_pars_fragment:Ux,uv_pars_fragment:zx,uv_pars_vertex:Ox,uv_vertex:Fx,worldpos_vertex:Bx,background_vert:kx,background_frag:Vx,backgroundCube_vert:Hx,backgroundCube_frag:Gx,cube_vert:Wx,cube_frag:Xx,depth_vert:qx,depth_frag:Yx,distance_vert:Zx,distance_frag:Kx,equirect_vert:jx,equirect_frag:Jx,linedashed_vert:Qx,linedashed_frag:$x,meshbasic_vert:e1,meshbasic_frag:t1,meshlambert_vert:n1,meshlambert_frag:i1,meshmatcap_vert:r1,meshmatcap_frag:s1,meshnormal_vert:a1,meshnormal_frag:o1,meshphong_vert:l1,meshphong_frag:c1,meshphysical_vert:d1,meshphysical_frag:u1,meshtoon_vert:h1,meshtoon_frag:f1,points_vert:p1,points_frag:m1,shadow_vert:g1,shadow_frag:x1,sprite_vert:v1,sprite_frag:y1},pe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Wn={basic:{uniforms:nn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:nn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:nn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:nn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:nn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:nn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:nn([pe.points,pe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:nn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:nn([pe.common,pe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:nn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:nn([pe.sprite,pe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:nn([pe.common,pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:nn([pe.lights,pe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Wn.physical={uniforms:nn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Ys={r:0,b:0,g:0},_1=new it,nf=new ke;nf.set(-1,0,0,0,1,0,0,0,1);function M1(n,e,t,i,r,s){const a=new Ue(0);let o=r===!0?0:1,c,l,d=null,h=0,u=null;function f(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){const y=_.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(_){let S=!1;const y=f(_);y===null?m(a,o):y&&y.isColor&&(m(y,1),S=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(_,S){const y=f(S);y&&(y.isCubeTexture||y.mapping===Ua)?(l===void 0&&(l=new ze(new on(1,1,1),new bt({name:"BackgroundCubeMaterial",uniforms:br(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(_1.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(nf),l.material.toneMapped=Qe.getTransfer(y.colorSpace)!==dt,(d!==y||h!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ze(new Pr(2,2),new bt({name:"BackgroundMaterial",uniforms:br(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(y.colorSpace)!==dt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,S){_.getRGB(Ys,Jh(n)),t.buffers.color.setClear(Ys.r,Ys.g,Ys.b,S,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:g,addToRenderList:x,dispose:p}}function S1(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(P,L,F,B,z){let W=!1;const k=h(P,B,F,L);s!==k&&(s=k,l(s.object)),W=f(P,B,F,z),W&&g(P,B,F,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(P,L,F,B),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function d(P){return n.deleteVertexArray(P)}function h(P,L,F,B){const z=B.wireframe===!0;let W=i[L.id];W===void 0&&(W={},i[L.id]=W);const k=P.isInstancedMesh===!0?P.id:0;let Z=W[k];Z===void 0&&(Z={},W[k]=Z);let J=Z[F.id];J===void 0&&(J={},Z[F.id]=J);let ne=J[z];return ne===void 0&&(ne=u(c()),J[z]=ne),ne}function u(P){const L=[],F=[],B=[];for(let z=0;z<t;z++)L[z]=0,F[z]=0,B[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:B,object:P,attributes:{},index:null}}function f(P,L,F,B){const z=s.attributes,W=L.attributes;let k=0;const Z=F.getAttributes();for(const J in Z)if(Z[J].location>=0){const ae=z[J];let le=W[J];if(le===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),ae===void 0||ae.attribute!==le||le&&ae.data!==le.data)return!0;k++}return s.attributesNum!==k||s.index!==B}function g(P,L,F,B){const z={},W=L.attributes;let k=0;const Z=F.getAttributes();for(const J in Z)if(Z[J].location>=0){let ae=W[J];ae===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor));const le={};le.attribute=ae,ae&&ae.data&&(le.data=ae.data),z[J]=le,k++}s.attributes=z,s.attributesNum=k,s.index=B}function x(){const P=s.newAttributes;for(let L=0,F=P.length;L<F;L++)P[L]=0}function m(P){p(P,0)}function p(P,L){const F=s.newAttributes,B=s.enabledAttributes,z=s.attributeDivisors;F[P]=1,B[P]===0&&(n.enableVertexAttribArray(P),B[P]=1),z[P]!==L&&(n.vertexAttribDivisor(P,L),z[P]=L)}function _(){const P=s.newAttributes,L=s.enabledAttributes;for(let F=0,B=L.length;F<B;F++)L[F]!==P[F]&&(n.disableVertexAttribArray(F),L[F]=0)}function S(P,L,F,B,z,W,k){k===!0?n.vertexAttribIPointer(P,L,F,z,W):n.vertexAttribPointer(P,L,F,B,z,W)}function y(P,L,F,B){x();const z=B.attributes,W=F.getAttributes(),k=L.defaultAttributeValues;for(const Z in W){const J=W[Z];if(J.location>=0){let ne=z[Z];if(ne===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),ne!==void 0){const ae=ne.normalized,le=ne.itemSize,Ve=e.get(ne);if(Ve===void 0)continue;const je=Ve.buffer,Be=Ve.type,K=Ve.bytesPerElement,ie=Be===n.INT||Be===n.UNSIGNED_INT||ne.gpuType===dc;if(ne.isInterleavedBufferAttribute){const ee=ne.data,Ee=ee.stride,Ne=ne.offset;if(ee.isInstancedInterleavedBuffer){for(let ve=0;ve<J.locationSize;ve++)p(J.location+ve,ee.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ve=0;ve<J.locationSize;ve++)m(J.location+ve);n.bindBuffer(n.ARRAY_BUFFER,je);for(let ve=0;ve<J.locationSize;ve++)S(J.location+ve,le/J.locationSize,Be,ae,Ee*K,(Ne+le/J.locationSize*ve)*K,ie)}else{if(ne.isInstancedBufferAttribute){for(let ee=0;ee<J.locationSize;ee++)p(J.location+ee,ne.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ee=0;ee<J.locationSize;ee++)m(J.location+ee);n.bindBuffer(n.ARRAY_BUFFER,je);for(let ee=0;ee<J.locationSize;ee++)S(J.location+ee,le/J.locationSize,Be,ae,le*K,le/J.locationSize*ee*K,ie)}}else if(k!==void 0){const ae=k[Z];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(J.location,ae);break;case 3:n.vertexAttrib3fv(J.location,ae);break;case 4:n.vertexAttrib4fv(J.location,ae);break;default:n.vertexAttrib1fv(J.location,ae)}}}}_()}function w(){E();for(const P in i){const L=i[P];for(const F in L){const B=L[F];for(const z in B){const W=B[z];for(const k in W)d(W[k].object),delete W[k];delete B[z]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;const L=i[P.id];for(const F in L){const B=L[F];for(const z in B){const W=B[z];for(const k in W)d(W[k].object),delete W[k];delete B[z]}}delete i[P.id]}function A(P){for(const L in i){const F=i[L];for(const B in F){const z=F[B];if(z[P.id]===void 0)continue;const W=z[P.id];for(const k in W)d(W[k].object),delete W[k];delete z[P.id]}}}function v(P){for(const L in i){const F=i[L],B=P.isInstancedMesh===!0?P.id:0,z=F[B];if(z!==void 0){for(const W in z){const k=z[W];for(const Z in k)d(k[Z].object),delete k[Z];delete z[W]}delete F[B],Object.keys(F).length===0&&delete i[L]}}}function E(){R(),a=!0,s!==r&&(s=r,l(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function b1(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let f=0;f<d;f++)u+=l[f];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function E1(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==mn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Kt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==sn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ln&&!v)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Oe("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:y,maxSamples:w,samples:b}}function w1(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Pi,o=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||i!==0||r;return r=u,i=h.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?d(null):l();else{const _=s?0:i,S=_*4;let y=p.clippingState||null;c.value=y,y=d(g,u,S,f);for(let w=0;w!==S;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,f,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=f;S!==x;++S,y+=4)a.copy(h[S]).applyMatrix4(_,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Si=4,pu=[.125,.215,.35,.446,.526,.582],Di=20,T1=256,kr=new fs,mu=new Ue;let To=null,Ao=0,Ro=0,Co=!1;const A1=new D;class Vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=A1}=s;To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(To,Ao,Ro),this._renderer.xr.enabled=Co,e.scissorTest=!1,cr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Kt,format:mn,colorSpace:ns,depthBuffer:!1},r=gu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gu(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=R1(s)),this._blurMaterial=P1(s,e,t),this._ggxMaterial=C1(s,e,t)}return r}_compileMaterial(e){const t=new ze(new St,e);this._renderer.compile(t,kr)}_sceneToCubeUV(e,t,i,r,s){const c=new _n(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(mu),h.toneMapping=qn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new on,new Bt({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,p=!0):(m.color.copy(mu),p=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[S],s.y,s.z)):y===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[S]));const w=this._cubeSize;cr(r,y*w,S>2?w:0,w,w),h.setRenderTarget(r),p&&h.render(x,c),h.render(e,c)}h.toneMapping=f,h.autoClear=u,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===zi||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;cr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,kr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,f=h*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-Si?i-g+Si:0),p=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,cr(s,m,p,3*x,2*x),r.setRenderTarget(s),r.render(o,kr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,cr(e,m,p,3*x,2*x),r.setRenderTarget(e),r.render(o,kr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ot("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=l;const u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Di-1),x=s/g,m=isFinite(s)?1+Math.floor(d*x):Di;m>Di&&Oe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let _=0;for(let A=0;A<Di;++A){const v=A/x,E=Math.exp(-v*v/2);p.push(E),A===0?_+=E:A<m&&(_+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const y=this._sizeLods[r],w=3*y*(r>S-Si?r-S+Si:0),b=4*(this._cubeSize-y);cr(t,w,b,3*y,2*y),c.setRenderTarget(t),c.render(h,kr)}}function R1(n){const e=[],t=[],i=[];let r=n;const s=n-Si+1+pu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-Si?c=pu[a-n+Si-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,g=6,x=3,m=2,p=1,_=new Float32Array(x*g*f),S=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,v=b>2?0:-1,E=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];_.set(E,x*g*b),S.set(u,m*g*b);const R=[b,b,b,b,b,b];y.set(R,p*g*b)}const w=new St;w.setAttribute("position",new kt(_,x)),w.setAttribute("uv",new kt(S,m)),w.setAttribute("faceIndex",new kt(y,p)),i.push(new ze(w,null)),r>Si&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function gu(n,e,t){const i=new Ht(n,e,t);return i.texture.mapping=Ua,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function C1(n,e,t){return new bt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:T1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function P1(n,e,t){const i=new Float32Array(Di),r=new D(0,1,0);return new bt({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function xu(){return new bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function vu(){return new bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yt,depthTest:!1,depthWrite:!1})}function Fa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class rf extends Ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Kh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new on(5,5,5),s=new bt({name:"CubemapFromEquirect",uniforms:br(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:Yt});s.uniforms.tEquirect.value=t;const a=new ze(r,s),o=t.minFilter;return t.minFilter===si&&(t.minFilter=zt),new N0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function L1(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ka||f===ja)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new rf(g.height);return x.fromEquirectangularTexture(n,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Ka||f===ja,x=f===zi||f===Mr;if(g||x){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Vl(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const _=u.image;return g&&_&&_.height>0||x&&_&&c(_)?(i===null&&(i=new Vl(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,f){return f===Ka?u.mapping=zi:f===ja&&(u.mapping=Mr),u}function c(u){let f=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(u){const f=u.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function D1(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&gr("WebGLRenderer: "+i+" extension not supported."),r}}}function I1(n,e,t,i){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const f in u)e.update(u[f],n.ARRAY_BUFFER)}function l(h){const u=[],f=h.index,g=h.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const _=f.array;x=f.version;for(let S=0,y=_.length;S<y;S+=3){const w=_[S+0],b=_[S+1],A=_[S+2];u.push(w,b,b,A,A,w)}}else{const _=g.array;x=g.version;for(let S=0,y=_.length/3-1;S<y;S+=3){const w=S+0,b=S+1,A=S+2;u.push(w,b,b,A,A,w)}}const m=new(g.count>=65535?Yh:qh)(u,1);m.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function d(h){const u=s.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function N1(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,u){n.drawElements(i,u,s,h*a),t.update(u,i,1)}function l(h,u,f){f!==0&&(n.drawElementsInstanced(i,u,s,h*a,f),t.update(u,i,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function U1(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:ot("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function z1(n,e,t){const i=new WeakMap,r=new wt;function s(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let E=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let y=o.attributes.position.count*S,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*w*4*h),A=new Hh(b,y,w,h);A.type=Ln,A.needsUpdate=!0;const v=S*4;for(let R=0;R<h;R++){const P=m[R],L=p[R],F=_[R],B=y*w*4*R;for(let z=0;z<P.count;z++){const W=z*v;f===!0&&(r.fromBufferAttribute(P,z),b[B+W+0]=r.x,b[B+W+1]=r.y,b[B+W+2]=r.z,b[B+W+3]=0),g===!0&&(r.fromBufferAttribute(L,z),b[B+W+4]=r.x,b[B+W+5]=r.y,b[B+W+6]=r.z,b[B+W+7]=0),x===!0&&(r.fromBufferAttribute(F,z),b[B+W+8]=r.x,b[B+W+9]=r.y,b[B+W+10]=r.z,b[B+W+11]=F.itemSize===4?r.w:1)}}u={count:h,texture:A,size:new Se(y,w)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function O1(n,e,t,i,r){let s=new WeakMap;function a(l){const d=r.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==d&&(f.update(),s.set(f,d))}return u}function o(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const F1={[rc]:"LINEAR_TONE_MAPPING",[sc]:"REINHARD_TONE_MAPPING",[ac]:"CINEON_TONE_MAPPING",[oc]:"ACES_FILMIC_TONE_MAPPING",[Na]:"AGX_TONE_MAPPING",[cc]:"NEUTRAL_TONE_MAPPING",[lc]:"CUSTOM_TONE_MAPPING"};function B1(n,e,t,i,r,s){const a=new Ht(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Fi(e,t):void 0}),o=new Ht(e,t,{type:Kt,depthBuffer:!1,stencilBuffer:!1}),c=new St;c.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ge([0,2,0,0,2,0],2));const l=new Qh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ze(c,l),h=new fs(-1,1,1,-1,0,1);let u=null,f=null,g=!1,x,m=null,p=[],_=!1;this.setSize=function(S,y){a.setSize(S,y),o.setSize(S,y);for(let w=0;w<p.length;w++){const b=p[w];b.setSize&&b.setSize(S,y)}},this.setEffects=function(S){p=S,_=p.length>0&&p[0].isRenderPass===!0;const y=a.width,w=a.height;for(let b=0;b<p.length;b++){const A=p[b];A.setSize&&A.setSize(y,w)}},this.begin=function(S,y){if(g||S.toneMapping===qn&&p.length===0)return!1;if(m=y,y!==null){const w=y.width,b=y.height;(a.width!==w||a.height!==b)&&this.setSize(w,b)}return _===!1&&S.setRenderTarget(a),x=S.toneMapping,S.toneMapping=qn,!0},this.hasRenderPass=function(){return _},this.end=function(S,y){S.toneMapping=x,g=!0;let w=a,b=o;for(let A=0;A<p.length;A++){const v=p[A];if(v.enabled!==!1&&(v.render(S,b,w,y),v.needsSwap!==!1)){const E=w;w=b,b=E}}if(u!==S.outputColorSpace||f!==S.toneMapping){u=S.outputColorSpace,f=S.toneMapping,l.defines={},Qe.getTransfer(u)===dt&&(l.defines.SRGB_TRANSFER="");const A=F1[f];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(m),S.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const sf=new jt,Hl=new Fi(1,1),af=new Hh,of=new t0,lf=new Kh,yu=[],_u=[],Mu=new Float32Array(16),Su=new Float32Array(9),bu=new Float32Array(4);function Lr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yu[r];if(s===void 0&&(s=new Float32Array(r),yu[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ba(n,e){let t=_u[e];t===void 0&&(t=new Int32Array(e),_u[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function k1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function V1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2fv(this.addr,e),Wt(t,e)}}function H1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;n.uniform3fv(this.addr,e),Wt(t,e)}}function G1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4fv(this.addr,e),Wt(t,e)}}function W1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,i))return;bu.set(i),n.uniformMatrix2fv(this.addr,!1,bu),Wt(t,i)}}function X1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,i))return;Su.set(i),n.uniformMatrix3fv(this.addr,!1,Su),Wt(t,i)}}function q1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,i))return;Mu.set(i),n.uniformMatrix4fv(this.addr,!1,Mu),Wt(t,i)}}function Y1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Z1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2iv(this.addr,e),Wt(t,e)}}function K1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3iv(this.addr,e),Wt(t,e)}}function j1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4iv(this.addr,e),Wt(t,e)}}function J1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Q1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2uiv(this.addr,e),Wt(t,e)}}function $1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3uiv(this.addr,e),Wt(t,e)}}function ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4uiv(this.addr,e),Wt(t,e)}}function tv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Hl.compareFunction=t.isReversedDepthBuffer()?vc:xc,s=Hl):s=sf,t.setTexture2D(e||s,r)}function nv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||of,r)}function iv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||lf,r)}function rv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||af,r)}function sv(n){switch(n){case 5126:return k1;case 35664:return V1;case 35665:return H1;case 35666:return G1;case 35674:return W1;case 35675:return X1;case 35676:return q1;case 5124:case 35670:return Y1;case 35667:case 35671:return Z1;case 35668:case 35672:return K1;case 35669:case 35673:return j1;case 5125:return J1;case 36294:return Q1;case 36295:return $1;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return tv;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return rv}}function av(n,e){n.uniform1fv(this.addr,e)}function ov(n,e){const t=Lr(e,this.size,2);n.uniform2fv(this.addr,t)}function lv(n,e){const t=Lr(e,this.size,3);n.uniform3fv(this.addr,t)}function cv(n,e){const t=Lr(e,this.size,4);n.uniform4fv(this.addr,t)}function dv(n,e){const t=Lr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function uv(n,e){const t=Lr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function hv(n,e){const t=Lr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function fv(n,e){n.uniform1iv(this.addr,e)}function pv(n,e){n.uniform2iv(this.addr,e)}function mv(n,e){n.uniform3iv(this.addr,e)}function gv(n,e){n.uniform4iv(this.addr,e)}function xv(n,e){n.uniform1uiv(this.addr,e)}function vv(n,e){n.uniform2uiv(this.addr,e)}function yv(n,e){n.uniform3uiv(this.addr,e)}function _v(n,e){n.uniform4uiv(this.addr,e)}function Mv(n,e,t){const i=this.cache,r=e.length,s=Ba(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Hl:a=sf;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Sv(n,e,t){const i=this.cache,r=e.length,s=Ba(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||of,s[a])}function bv(n,e,t){const i=this.cache,r=e.length,s=Ba(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||lf,s[a])}function Ev(n,e,t){const i=this.cache,r=e.length,s=Ba(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),Wt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||af,s[a])}function wv(n){switch(n){case 5126:return av;case 35664:return ov;case 35665:return lv;case 35666:return cv;case 35674:return dv;case 35675:return uv;case 35676:return hv;case 5124:case 35670:return fv;case 35667:case 35671:return pv;case 35668:case 35672:return mv;case 35669:case 35673:return gv;case 5125:return xv;case 36294:return vv;case 36295:return yv;case 36296:return _v;case 35678:case 36198:case 36298:case 36306:case 35682:return Mv;case 35679:case 36299:case 36307:return Sv;case 35680:case 36300:case 36308:case 36293:return bv;case 36289:case 36303:case 36311:case 36292:return Ev}}class Tv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=sv(t.type)}}class Av{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wv(t.type)}}class Rv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function Eu(n,e){n.seq.push(e),n.map[e.id]=e}function Cv(n,e,t){const i=n.name,r=i.length;for(Po.lastIndex=0;;){const s=Po.exec(i),a=Po.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Eu(t,l===void 0?new Tv(o,n,e):new Av(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Rv(o),Eu(t,h)),t=h}}}class xa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Cv(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function wu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Pv=37297;let Lv=0;function Dv(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Tu=new ke;function Iv(n){Qe._getMatrix(Tu,Qe.workingColorSpace,n);const e=`mat3( ${Tu.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Ra:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Au(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Dv(n.getShaderSource(e),o)}else return s}function Nv(n,e){const t=Iv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Uv={[rc]:"Linear",[sc]:"Reinhard",[ac]:"Cineon",[oc]:"ACESFilmic",[Na]:"AgX",[cc]:"Neutral",[lc]:"Custom"};function zv(n,e){const t=Uv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Zs=new D;function Ov(){Qe.getLuminanceCoefficients(Zs);const n=Zs.x.toFixed(4),e=Zs.y.toFixed(4),t=Zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function Bv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function kv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Jr(n){return n!==""}function Ru(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(n){return n.replace(Vv,Gv)}const Hv=new Map;function Gv(n,e){let t=Ze[e];if(t===void 0){const i=Hv.get(e);if(i!==void 0)t=Ze[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gl(t)}const Wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pu(n){return n.replace(Wv,Xv)}function Xv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Lu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const qv={[Qr]:"SHADOWMAP_TYPE_PCF",[Zr]:"SHADOWMAP_TYPE_VSM"};function Yv(n){return qv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Zv={[zi]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE",[Ua]:"ENVMAP_TYPE_CUBE_UV"};function Kv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Zv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const jv={[Mr]:"ENVMAP_MODE_REFRACTION"};function Jv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":jv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Qv={[ic]:"ENVMAP_BLENDING_MULTIPLY",[ym]:"ENVMAP_BLENDING_MIX",[_m]:"ENVMAP_BLENDING_ADD"};function $v(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Qv[n.combine]||"ENVMAP_BLENDING_NONE"}function ey(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ty(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Yv(t),l=Kv(t),d=Jv(t),h=$v(t),u=ey(t),f=Fv(t),g=Bv(s),x=r.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Jr).join(`
`),p.length>0&&(p+=`
`)):(m=[Lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),p=[Lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==qn?zv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Nv("linearToOutputTexel",t.outputColorSpace),Ov(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jr).join(`
`)),a=Gl(a),a=Ru(a,t),a=Cu(a,t),o=Gl(o),o=Ru(o,t),o=Cu(o,t),a=Pu(a),o=Pu(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Id?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=_+m+a,y=_+p+o,w=wu(r,r.VERTEX_SHADER,S),b=wu(r,r.FRAGMENT_SHADER,y);r.attachShader(x,w),r.attachShader(x,b),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(P){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(x)||"",F=r.getShaderInfoLog(w)||"",B=r.getShaderInfoLog(b)||"",z=L.trim(),W=F.trim(),k=B.trim();let Z=!0,J=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,w,b);else{const ne=Au(r,w,"vertex"),ae=Au(r,b,"fragment");ot("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+ne+`
`+ae)}else z!==""?Oe("WebGLProgram: Program Info Log:",z):(W===""||k==="")&&(J=!1);J&&(P.diagnostics={runnable:Z,programLog:z,vertexShader:{log:W,prefix:m},fragmentShader:{log:k,prefix:p}})}r.deleteShader(w),r.deleteShader(b),v=new xa(r,x),E=kv(r,x)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(x,Pv)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=b,this}let ny=0;class iy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ry(e),t.set(e,i)),i}}class ry{constructor(e){this.id=ny++,this.code=e,this.usedTimes=0}}function sy(n){return n===Oi||n===Ta||n===Aa}function ay(n,e,t,i,r,s){const a=new Gh,o=new iy,c=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,E,R,P,L,F){const B=P.fog,z=L.geometry,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Z=e.get(v.envMap||W,k),J=Z&&Z.mapping===Ua?Z.image.height:null,ne=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ae=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,le=ae!==void 0?ae.length:0;let Ve=0;z.morphAttributes.position!==void 0&&(Ve=1),z.morphAttributes.normal!==void 0&&(Ve=2),z.morphAttributes.color!==void 0&&(Ve=3);let je,Be,K,ie;if(ne){const be=Wn[ne];je=be.vertexShader,Be=be.fragmentShader}else{je=v.vertexShader,Be=v.fragmentShader;const be=o.getVertexShaderStage(v),At=o.getFragmentShaderStage(v);o.update(v,be,At),K=be.id,ie=At.id}const ee=n.getRenderTarget(),Ee=n.state.buffers.depth.getReversed(),Ne=L.isInstancedMesh===!0,ve=L.isBatchedMesh===!0,ft=!!v.map,We=!!v.matcap,rt=!!Z,se=!!v.aoMap,Ae=!!v.lightMap,Ce=!!v.bumpMap&&v.wireframe===!1,lt=!!v.normalMap,qe=!!v.displacementMap,He=!!v.emissiveMap,ct=!!v.metalnessMap,st=!!v.roughnessMap,I=v.anisotropy>0,Vt=v.clearcoat>0,Ye=v.dispersion>0,C=v.iridescence>0,M=v.sheen>0,O=v.transmission>0,V=I&&!!v.anisotropyMap,Y=Vt&&!!v.clearcoatMap,re=Vt&&!!v.clearcoatNormalMap,de=Vt&&!!v.clearcoatRoughnessMap,j=C&&!!v.iridescenceMap,Q=C&&!!v.iridescenceThicknessMap,ue=M&&!!v.sheenColorMap,Re=M&&!!v.sheenRoughnessMap,ce=!!v.specularMap,oe=!!v.specularColorMap,we=!!v.specularIntensityMap,De=O&&!!v.transmissionMap,Fe=O&&!!v.thicknessMap,N=!!v.gradientMap,he=!!v.alphaMap,$=v.alphaTest>0,fe=!!v.alphaHash,xe=!!v.extensions;let te=qn;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(te=n.toneMapping);const Pe={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:je,fragmentShader:Be,defines:v.defines,customVertexShaderID:K,customFragmentShaderID:ie,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:ve,batchingColor:ve&&L._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&L.instanceColor!==null,instancingMorph:Ne&&L.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ft,matcap:We,envMap:rt,envMapMode:rt&&Z.mapping,envMapCubeUVHeight:J,aoMap:se,lightMap:Ae,bumpMap:Ce,normalMap:lt,displacementMap:qe,emissiveMap:He,normalMapObjectSpace:lt&&v.normalMapType===bm,normalMapTangentSpace:lt&&v.normalMapType===ts,packedNormalMap:lt&&v.normalMapType===ts&&sy(v.normalMap.format),metalnessMap:ct,roughnessMap:st,anisotropy:I,anisotropyMap:V,clearcoat:Vt,clearcoatMap:Y,clearcoatNormalMap:re,clearcoatRoughnessMap:de,dispersion:Ye,iridescence:C,iridescenceMap:j,iridescenceThicknessMap:Q,sheen:M,sheenColorMap:ue,sheenRoughnessMap:Re,specularMap:ce,specularColorMap:oe,specularIntensityMap:we,transmission:O,transmissionMap:De,thicknessMap:Fe,gradientMap:N,opaque:v.transparent===!1&&v.blending===mr&&v.alphaToCoverage===!1,alphaMap:he,alphaTest:$,alphaHash:fe,combine:v.combine,mapUv:ft&&g(v.map.channel),aoMapUv:se&&g(v.aoMap.channel),lightMapUv:Ae&&g(v.lightMap.channel),bumpMapUv:Ce&&g(v.bumpMap.channel),normalMapUv:lt&&g(v.normalMap.channel),displacementMapUv:qe&&g(v.displacementMap.channel),emissiveMapUv:He&&g(v.emissiveMap.channel),metalnessMapUv:ct&&g(v.metalnessMap.channel),roughnessMapUv:st&&g(v.roughnessMap.channel),anisotropyMapUv:V&&g(v.anisotropyMap.channel),clearcoatMapUv:Y&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(v.sheenRoughnessMap.channel),specularMapUv:ce&&g(v.specularMap.channel),specularColorMapUv:oe&&g(v.specularColorMap.channel),specularIntensityMapUv:we&&g(v.specularIntensityMap.channel),transmissionMapUv:De&&g(v.transmissionMap.channel),thicknessMapUv:Fe&&g(v.thicknessMap.channel),alphaMapUv:he&&g(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(lt||I),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!z.attributes.uv&&(ft||he),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&lt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ee,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ve,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:te,decodeVideoTexture:ft&&v.map.isVideoTexture===!0&&Qe.getTransfer(v.map.colorSpace)===dt,decodeVideoTextureEmissive:He&&v.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(v.emissiveMap.colorSpace)===dt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===an,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function m(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)E.push(R),E.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(p(E,v),_(E,v),E.push(n.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function p(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function _(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){const E=f[v.type];let R;if(E){const P=Wn[E];R=pn.clone(P.uniforms)}else R=v.uniforms;return R}function y(v,E){let R=d.get(E);return R!==void 0?++R.usedTimes:(R=new ty(n,E,v,r),l.push(R),d.set(E,R)),R}function w(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),d.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function A(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:w,releaseShaderCache:b,programs:l,dispose:A}}function oy(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ly(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Du(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Iu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let _=n[e];return _===void 0?(_={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},n[e]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=g,_.materialVariant=a(u),_.groupOrder=x,_.renderOrder=u.renderOrder,_.z=m,_.group=p),e++,_}function c(u,f,g,x,m,p){const _=o(u,f,g,x,m,p);g.transmission>0?i.push(_):g.transparent===!0?r.push(_):t.push(_)}function l(u,f,g,x,m,p){const _=o(u,f,g,x,m,p);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function d(u,f,g){t.length>1&&t.sort(u||ly),i.length>1&&i.sort(f||Du),r.length>1&&r.sort(f||Du),g&&(t.reverse(),i.reverse(),r.reverse())}function h(){for(let u=e,f=n.length;u<f;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:d}}function cy(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Iu,n.set(i,[a])):r>=s.length?(a=new Iu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function dy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function uy(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let hy=0;function fy(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function py(n){const e=new dy,t=uy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const r=new D,s=new it,a=new it;function o(l){let d=0,h=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,_=0,S=0,y=0,w=0,b=0,A=0;l.sort(fy);for(let E=0,R=l.length;E<R;E++){const P=l[E],L=P.color,F=P.intensity,B=P.distance;let z=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Oi?z=P.shadow.map.texture:z=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=L.r*F,h+=L.g*F,u+=L.b*F;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],F);A++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const k=P.shadow,Z=t.get(P);Z.shadowIntensity=k.intensity,Z.shadowBias=k.bias,Z.shadowNormalBias=k.normalBias,Z.shadowRadius=k.radius,Z.shadowMapSize=k.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=z,i.directionalShadowMatrix[f]=P.shadow.matrix,_++}i.directional[f]=W,f++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(L).multiplyScalar(F),W.distance=B,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[x]=W;const k=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,k.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[x]=k.matrix,P.castShadow){const Z=t.get(P);Z.shadowIntensity=k.intensity,Z.shadowBias=k.bias,Z.shadowNormalBias=k.normalBias,Z.shadowRadius=k.radius,Z.shadowMapSize=k.mapSize,i.spotShadow[x]=Z,i.spotShadowMap[x]=z,y++}x++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(L).multiplyScalar(F),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const k=P.shadow,Z=t.get(P);Z.shadowIntensity=k.intensity,Z.shadowBias=k.bias,Z.shadowNormalBias=k.normalBias,Z.shadowRadius=k.radius,Z.shadowMapSize=k.mapSize,Z.shadowCameraNear=k.camera.near,Z.shadowCameraFar=k.camera.far,i.pointShadow[g]=Z,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(F),W.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==_||v.numPointShadows!==S||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=y+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,v.directionalLength=f,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=_,v.numPointShadows=S,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=A,i.version=hy++)}function c(l,d){let h=0,u=0,f=0,g=0,x=0;const m=d.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){const S=l[p];if(S.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(S.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function Nu(n){const e=new py(n),t=[],i=[],r=[];function s(u){h.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function my(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Nu(n),e.set(r,[o])):s>=a.length?(o=new Nu(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const gy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vy=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],yy=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Uu=new it,Vr=new D,Lo=new D;function _y(n,e,t){let i=new Sc;const r=new Se,s=new Se,a=new wt,o=new w0,c=new T0,l={},d=t.maxTextureSize,h={[ci]:an,[an]:ci,[rn]:rn},u=new bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:gy,fragmentShader:xy}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ze(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qr;let p=this.type;this.render=function(b,A,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===rm&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qr);const E=n.getRenderTarget(),R=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Yt),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const F=p!==this.type;F&&A.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(z=>z.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,z=b.length;B<z;B++){const W=b[B],k=W.shadow;if(k===void 0){Oe("WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const Z=k.getFrameExtents();r.multiply(Z),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/Z.x),r.x=s.x*Z.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/Z.y),r.y=s.y*Z.y,k.mapSize.y=s.y));const J=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=J,k.map===null||F===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Zr){if(W.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Ht(r.x,r.y,{format:Oi,type:Kt,minFilter:zt,magFilter:zt,generateMipmaps:!1}),k.map.texture.name=W.name+".shadowMap",k.map.depthTexture=new Fi(r.x,r.y,Ln),k.map.depthTexture.name=W.name+".shadowMapDepth",k.map.depthTexture.format=di,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ut,k.map.depthTexture.magFilter=Ut}else W.isPointLight?(k.map=new rf(r.x),k.map.depthTexture=new y0(r.x,Kn)):(k.map=new Ht(r.x,r.y),k.map.depthTexture=new Fi(r.x,r.y,Kn)),k.map.depthTexture.name=W.name+".shadowMap",k.map.depthTexture.format=di,this.type===Qr?(k.map.depthTexture.compareFunction=J?vc:xc,k.map.depthTexture.minFilter=zt,k.map.depthTexture.magFilter=zt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ut,k.map.depthTexture.magFilter=Ut);k.camera.updateProjectionMatrix()}const ne=k.map.isWebGLCubeRenderTarget?6:1;for(let ae=0;ae<ne;ae++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(k.map),n.clear());const le=k.getViewport(ae);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),L.viewport(a)}if(W.isPointLight){const le=k.camera,Ve=k.matrix,je=W.distance||le.far;je!==le.far&&(le.far=je,le.updateProjectionMatrix()),Vr.setFromMatrixPosition(W.matrixWorld),le.position.copy(Vr),Lo.copy(le.position),Lo.add(vy[ae]),le.up.copy(yy[ae]),le.lookAt(Lo),le.updateMatrixWorld(),Ve.makeTranslation(-Vr.x,-Vr.y,-Vr.z),Uu.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Uu,le.coordinateSystem,le.reversedDepth)}else k.updateMatrices(W);i=k.getFrustum(),y(A,v,k.camera,W,this.type)}k.isPointLightShadow!==!0&&this.type===Zr&&_(k,v),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,R,P)};function _(b,A){const v=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ht(r.x,r.y,{format:Oi,type:Kt})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,v,u,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,v,f,x,null)}function S(b,A,v,E){let R=null;const P=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)R=P;else if(R=v.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=R.uuid,F=A.uuid;let B=l[L];B===void 0&&(B={},l[L]=B);let z=B[F];z===void 0&&(z=R.clone(),B[F]=z,A.addEventListener("dispose",w)),R=z}if(R.visible=A.visible,R.wireframe=A.wireframe,E===Zr?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:h[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const L=n.properties.get(R);L.light=v}return R}function y(b,A,v,E,R){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Zr)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const F=e.update(b),B=b.material;if(Array.isArray(B)){const z=F.groups;for(let W=0,k=z.length;W<k;W++){const Z=z[W],J=B[Z.materialIndex];if(J&&J.visible){const ne=S(b,J,E,R);b.onBeforeShadow(n,b,A,v,F,ne,Z),n.renderBufferDirect(v,null,F,ne,b,Z),b.onAfterShadow(n,b,A,v,F,ne,Z)}}}else if(B.visible){const z=S(b,B,E,R);b.onBeforeShadow(n,b,A,v,F,z,null),n.renderBufferDirect(v,null,F,z,b,null),b.onAfterShadow(n,b,A,v,F,z,null)}}const L=b.children;for(let F=0,B=L.length;F<B;F++)y(L[F],A,v,E,R)}function w(b){b.target.removeEventListener("dispose",w);for(const v in l){const E=l[v],R=b.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function My(n,e){function t(){let N=!1;const he=new wt;let $=null;const fe=new wt(0,0,0,0);return{setMask:function(xe){$!==xe&&!N&&(n.colorMask(xe,xe,xe,xe),$=xe)},setLocked:function(xe){N=xe},setClear:function(xe,te,Pe,be,At){At===!0&&(xe*=be,te*=be,Pe*=be),he.set(xe,te,Pe,be),fe.equals(he)===!1&&(n.clearColor(xe,te,Pe,be),fe.copy(he))},reset:function(){N=!1,$=null,fe.set(-1,0,0,0)}}}function i(){let N=!1,he=!1,$=null,fe=null,xe=null;return{setReversed:function(te){if(he!==te){const Pe=e.get("EXT_clip_control");te?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),he=te;const be=xe;xe=null,this.setClear(be)}},getReversed:function(){return he},setTest:function(te){te?ee(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(te){$!==te&&!N&&(n.depthMask(te),$=te)},setFunc:function(te){if(he&&(te=Im[te]),fe!==te){switch(te){case nl:n.depthFunc(n.NEVER);break;case il:n.depthFunc(n.ALWAYS);break;case rl:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case sl:n.depthFunc(n.EQUAL);break;case al:n.depthFunc(n.GEQUAL);break;case ol:n.depthFunc(n.GREATER);break;case ll:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=te}},setLocked:function(te){N=te},setClear:function(te){xe!==te&&(xe=te,he&&(te=1-te),n.clearDepth(te))},reset:function(){N=!1,$=null,fe=null,xe=null,he=!1}}}function r(){let N=!1,he=null,$=null,fe=null,xe=null,te=null,Pe=null,be=null,At=null;return{setTest:function(gt){N||(gt?ee(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(gt){he!==gt&&!N&&(n.stencilMask(gt),he=gt)},setFunc:function(gt,On,Fn){($!==gt||fe!==On||xe!==Fn)&&(n.stencilFunc(gt,On,Fn),$=gt,fe=On,xe=Fn)},setOp:function(gt,On,Fn){(te!==gt||Pe!==On||be!==Fn)&&(n.stencilOp(gt,On,Fn),te=gt,Pe=On,be=Fn)},setLocked:function(gt){N=gt},setClear:function(gt){At!==gt&&(n.clearStencil(gt),At=gt)},reset:function(){N=!1,he=null,$=null,fe=null,xe=null,te=null,Pe=null,be=null,At=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let d={},h={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,S=null,y=null,w=null,b=null,A=null,v=new Ue(0,0,0),E=0,R=!1,P=null,L=null,F=null,B=null,z=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Z=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(J)[1]),k=Z>=1):J.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),k=Z>=2);let ne=null,ae={};const le=n.getParameter(n.SCISSOR_BOX),Ve=n.getParameter(n.VIEWPORT),je=new wt().fromArray(le),Be=new wt().fromArray(Ve);function K(N,he,$,fe){const xe=new Uint8Array(4),te=n.createTexture();n.bindTexture(N,te),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<$;Pe++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(he,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(he+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return te}const ie={};ie[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(_r),Ce(!1),lt(Rd),ee(n.CULL_FACE),se(Yt);function ee(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function Ee(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function Ne(N,he){return u[N]!==he?(n.bindFramebuffer(N,he),u[N]=he,N===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=he),N===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=he),!0):!1}function ve(N,he){let $=g,fe=!1;if(N){$=f.get(he),$===void 0&&($=[],f.set(he,$));const xe=N.textures;if($.length!==xe.length||$[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Pe=xe.length;te<Pe;te++)$[te]=n.COLOR_ATTACHMENT0+te;$.length=xe.length,fe=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,fe=!0);fe&&n.drawBuffers($)}function ft(N){return x!==N?(n.useProgram(N),x=N,!0):!1}const We={[Pn]:n.FUNC_ADD,[sm]:n.FUNC_SUBTRACT,[am]:n.FUNC_REVERSE_SUBTRACT};We[om]=n.MIN,We[lm]=n.MAX;const rt={[Kr]:n.ZERO,[cm]:n.ONE,[dm]:n.SRC_COLOR,[Qo]:n.SRC_ALPHA,[pm]:n.SRC_ALPHA_SATURATE,[tl]:n.DST_COLOR,[el]:n.DST_ALPHA,[um]:n.ONE_MINUS_SRC_COLOR,[$o]:n.ONE_MINUS_SRC_ALPHA,[fm]:n.ONE_MINUS_DST_COLOR,[hm]:n.ONE_MINUS_DST_ALPHA,[mm]:n.CONSTANT_COLOR,[gm]:n.ONE_MINUS_CONSTANT_COLOR,[xm]:n.CONSTANT_ALPHA,[vm]:n.ONE_MINUS_CONSTANT_ALPHA};function se(N,he,$,fe,xe,te,Pe,be,At,gt){if(N===Yt){m===!0&&(Ee(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),N!==Ih){if(N!==p||gt!==R){if((_!==Pn||w!==Pn)&&(n.blendEquation(n.FUNC_ADD),_=Pn,w=Pn),gt)switch(N){case mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wa:n.blendFunc(n.ONE,n.ONE);break;case Cd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ot("WebGLState: Invalid blending: ",N);break}else switch(N){case mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Cd:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pd:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",N);break}S=null,y=null,b=null,A=null,v.set(0,0,0),E=0,p=N,R=gt}return}xe=xe||he,te=te||$,Pe=Pe||fe,(he!==_||xe!==w)&&(n.blendEquationSeparate(We[he],We[xe]),_=he,w=xe),($!==S||fe!==y||te!==b||Pe!==A)&&(n.blendFuncSeparate(rt[$],rt[fe],rt[te],rt[Pe]),S=$,y=fe,b=te,A=Pe),(be.equals(v)===!1||At!==E)&&(n.blendColor(be.r,be.g,be.b,At),v.copy(be),E=At),p=N,R=!1}function Ae(N,he){N.side===rn?Ee(n.CULL_FACE):ee(n.CULL_FACE);let $=N.side===an;he&&($=!$),Ce($),N.blending===mr&&N.transparent===!1?se(Yt):se(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const fe=N.stencilWrite;o.setTest(fe),fe&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),He(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(N){P!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),P=N)}function lt(N){N!==nm?(ee(n.CULL_FACE),N!==L&&(N===Rd?n.cullFace(n.BACK):N===im?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),L=N}function qe(N){N!==F&&(k&&n.lineWidth(N),F=N)}function He(N,he,$){N?(ee(n.POLYGON_OFFSET_FILL),(B!==he||z!==$)&&(B=he,z=$,a.getReversed()&&(he=-he),n.polygonOffset(he,$))):Ee(n.POLYGON_OFFSET_FILL)}function ct(N){N?ee(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function st(N){N===void 0&&(N=n.TEXTURE0+W-1),ne!==N&&(n.activeTexture(N),ne=N)}function I(N,he,$){$===void 0&&(ne===null?$=n.TEXTURE0+W-1:$=ne);let fe=ae[$];fe===void 0&&(fe={type:void 0,texture:void 0},ae[$]=fe),(fe.type!==N||fe.texture!==he)&&(ne!==$&&(n.activeTexture($),ne=$),n.bindTexture(N,he||ie[N]),fe.type=N,fe.texture=he)}function Vt(){const N=ae[ne];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Ye(){try{n.compressedTexImage2D(...arguments)}catch(N){ot("WebGLState:",N)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(N){ot("WebGLState:",N)}}function M(){try{n.texSubImage2D(...arguments)}catch(N){ot("WebGLState:",N)}}function O(){try{n.texSubImage3D(...arguments)}catch(N){ot("WebGLState:",N)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(N){ot("WebGLState:",N)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(N){ot("WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){ot("WebGLState:",N)}}function de(){try{n.texStorage3D(...arguments)}catch(N){ot("WebGLState:",N)}}function j(){try{n.texImage2D(...arguments)}catch(N){ot("WebGLState:",N)}}function Q(){try{n.texImage3D(...arguments)}catch(N){ot("WebGLState:",N)}}function ue(N){return h[N]!==void 0?h[N]:n.getParameter(N)}function Re(N,he){h[N]!==he&&(n.pixelStorei(N,he),h[N]=he)}function ce(N){je.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),je.copy(N))}function oe(N){Be.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Be.copy(N))}function we(N,he){let $=l.get(he);$===void 0&&($=new WeakMap,l.set(he,$));let fe=$.get(N);fe===void 0&&(fe=n.getUniformBlockIndex(he,N.name),$.set(N,fe))}function De(N,he){const fe=l.get(he).get(N);c.get(he)!==fe&&(n.uniformBlockBinding(he,fe,N.__bindingPointIndex),c.set(he,fe))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},ne=null,ae={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,S=null,y=null,w=null,b=null,A=null,v=new Ue(0,0,0),E=0,R=!1,P=null,L=null,F=null,B=null,z=null,je.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:Ee,bindFramebuffer:Ne,drawBuffers:ve,useProgram:ft,setBlending:se,setMaterial:Ae,setFlipSided:Ce,setCullFace:lt,setLineWidth:qe,setPolygonOffset:He,setScissorTest:ct,activeTexture:st,bindTexture:I,unbindTexture:Vt,compressedTexImage2D:Ye,compressedTexImage3D:C,texImage2D:j,texImage3D:Q,pixelStorei:Re,getParameter:ue,updateUBOMapping:we,uniformBlockBinding:De,texStorage2D:re,texStorage3D:de,texSubImage2D:M,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ce,viewport:oe,reset:Fe}}function Sy(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Se,d=new WeakMap,h=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,M){return g?new OffscreenCanvas(C,M):rs("canvas")}function m(C,M,O){let V=1;const Y=Ye(C);if((Y.width>O||Y.height>O)&&(V=O/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const re=Math.floor(V*Y.width),de=Math.floor(V*Y.height);u===void 0&&(u=x(re,de));const j=M?x(re,de):u;return j.width=re,j.height=de,j.getContext("2d").drawImage(C,0,0,re,de),Oe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+re+"x"+de+")."),j}else return"data"in C&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function p(C){return C.generateMipmaps}function _(C){n.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,M,O,V,Y,re=!1){if(C!==null){if(n[C]!==void 0)return n[C];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let de;V&&(de=e.get("EXT_texture_norm16"),de||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=M;if(M===n.RED&&(O===n.FLOAT&&(j=n.R32F),O===n.HALF_FLOAT&&(j=n.R16F),O===n.UNSIGNED_BYTE&&(j=n.R8),O===n.UNSIGNED_SHORT&&de&&(j=de.R16_EXT),O===n.SHORT&&de&&(j=de.R16_SNORM_EXT)),M===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.R8UI),O===n.UNSIGNED_SHORT&&(j=n.R16UI),O===n.UNSIGNED_INT&&(j=n.R32UI),O===n.BYTE&&(j=n.R8I),O===n.SHORT&&(j=n.R16I),O===n.INT&&(j=n.R32I)),M===n.RG&&(O===n.FLOAT&&(j=n.RG32F),O===n.HALF_FLOAT&&(j=n.RG16F),O===n.UNSIGNED_BYTE&&(j=n.RG8),O===n.UNSIGNED_SHORT&&de&&(j=de.RG16_EXT),O===n.SHORT&&de&&(j=de.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RG8UI),O===n.UNSIGNED_SHORT&&(j=n.RG16UI),O===n.UNSIGNED_INT&&(j=n.RG32UI),O===n.BYTE&&(j=n.RG8I),O===n.SHORT&&(j=n.RG16I),O===n.INT&&(j=n.RG32I)),M===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RGB8UI),O===n.UNSIGNED_SHORT&&(j=n.RGB16UI),O===n.UNSIGNED_INT&&(j=n.RGB32UI),O===n.BYTE&&(j=n.RGB8I),O===n.SHORT&&(j=n.RGB16I),O===n.INT&&(j=n.RGB32I)),M===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),O===n.UNSIGNED_INT&&(j=n.RGBA32UI),O===n.BYTE&&(j=n.RGBA8I),O===n.SHORT&&(j=n.RGBA16I),O===n.INT&&(j=n.RGBA32I)),M===n.RGB&&(O===n.UNSIGNED_SHORT&&de&&(j=de.RGB16_EXT),O===n.SHORT&&de&&(j=de.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),M===n.RGBA){const Q=re?Ra:Qe.getTransfer(Y);O===n.FLOAT&&(j=n.RGBA32F),O===n.HALF_FLOAT&&(j=n.RGBA16F),O===n.UNSIGNED_BYTE&&(j=Q===dt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&de&&(j=de.RGBA16_EXT),O===n.SHORT&&de&&(j=de.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(C,M){let O;return C?M===null||M===Kn||M===Sr?O=n.DEPTH24_STENCIL8:M===Ln?O=n.DEPTH32F_STENCIL8:M===es&&(O=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Kn||M===Sr?O=n.DEPTH_COMPONENT24:M===Ln?O=n.DEPTH_COMPONENT32F:M===es&&(O=n.DEPTH_COMPONENT16),O}function b(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ut&&C.minFilter!==zt?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),E(M),M.isVideoTexture&&d.delete(M),M.isHTMLTexture&&h.delete(M)}function v(C){const M=C.target;M.removeEventListener("dispose",v),P(M)}function E(C){const M=i.get(C);if(M.__webglInit===void 0)return;const O=C.source,V=f.get(O);if(V){const Y=V[M.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&R(C),Object.keys(V).length===0&&f.delete(O)}i.remove(C)}function R(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const O=C.source,V=f.get(O);delete V[M.__cacheKey],a.memory.textures--}function P(C){const M=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(M.__webglFramebuffer[V]))for(let Y=0;Y<M.__webglFramebuffer[V].length;Y++)n.deleteFramebuffer(M.__webglFramebuffer[V][Y]);else n.deleteFramebuffer(M.__webglFramebuffer[V]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[V])}else{if(Array.isArray(M.__webglFramebuffer))for(let V=0;V<M.__webglFramebuffer.length;V++)n.deleteFramebuffer(M.__webglFramebuffer[V]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let V=0;V<M.__webglColorRenderbuffer.length;V++)M.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[V]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=C.textures;for(let V=0,Y=O.length;V<Y;V++){const re=i.get(O[V]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(O[V])}i.remove(C)}let L=0;function F(){L=0}function B(){return L}function z(C){L=C}function W(){const C=L;return C>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),L+=1,C}function k(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function Z(C,M){const O=i.get(C);if(C.isVideoTexture&&I(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&O.__version!==C.version){const V=C.image;if(V===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(O,C,M);return}}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+M)}function J(C,M){const O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){Ee(O,C,M);return}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+M)}function ne(C,M){const O=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){Ee(O,C,M);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+M)}function ae(C,M){const O=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&O.__version!==C.version){Ne(O,C,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+M)}const le={[Un]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[cl]:n.MIRRORED_REPEAT},Ve={[Ut]:n.NEAREST,[Mm]:n.NEAREST_MIPMAP_NEAREST,[Ms]:n.NEAREST_MIPMAP_LINEAR,[zt]:n.LINEAR,[Ja]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},je={[Em]:n.NEVER,[Cm]:n.ALWAYS,[wm]:n.LESS,[xc]:n.LEQUAL,[Tm]:n.EQUAL,[vc]:n.GEQUAL,[Am]:n.GREATER,[Rm]:n.NOTEQUAL};function Be(C,M){if(M.type===Ln&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===zt||M.magFilter===Ja||M.magFilter===Ms||M.magFilter===si||M.minFilter===zt||M.minFilter===Ja||M.minFilter===Ms||M.minFilter===si)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,le[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,le[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,le[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Ve[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Ve[M.minFilter]),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,je[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ut||M.minFilter!==Ms&&M.minFilter!==si||M.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function K(C,M){let O=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const V=M.source;let Y=f.get(V);Y===void 0&&(Y={},f.set(V,Y));const re=k(M);if(re!==C.__cacheKey){Y[re]===void 0&&(Y[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[re].usedTimes++;const de=Y[C.__cacheKey];de!==void 0&&(Y[C.__cacheKey].usedTimes--,de.usedTimes===0&&R(M)),C.__cacheKey=re,C.__webglTexture=Y[re].texture}return O}function ie(C,M,O){return Math.floor(Math.floor(C/O)/M)}function ee(C,M,O,V){const re=C.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,O,V,M.data);else{re.sort((Re,ce)=>Re.start-ce.start);let de=0;for(let Re=1;Re<re.length;Re++){const ce=re[de],oe=re[Re],we=ce.start+ce.count,De=ie(oe.start,M.width,4),Fe=ie(ce.start,M.width,4);oe.start<=we+1&&De===Fe&&ie(oe.start+oe.count-1,M.width,4)===De?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++de,re[de]=oe)}re.length=de+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let Re=0,ce=re.length;Re<ce;Re++){const oe=re[Re],we=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),Fe=we%M.width,N=Math.floor(we/M.width),he=De,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Fe,N,he,$,O,V,M.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function Ee(C,M,O){let V=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=n.TEXTURE_3D);const Y=K(C,M),re=M.source;t.bindTexture(V,C.__webglTexture,n.TEXTURE0+O);const de=i.get(re);if(re.version!==de.__version||Y===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const $=Qe.getPrimaries(Qe.workingColorSpace),fe=M.colorSpace===ni?null:Qe.getPrimaries(M.colorSpace),xe=M.colorSpace===ni||$===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let Q=m(M.image,!1,r.maxTextureSize);Q=Vt(M,Q);const ue=s.convert(M.format,M.colorSpace),Re=s.convert(M.type);let ce=y(M.internalFormat,ue,Re,M.normalized,M.colorSpace,M.isVideoTexture);Be(V,M);let oe;const we=M.mipmaps,De=M.isVideoTexture!==!0,Fe=de.__version===void 0||Y===!0,N=re.dataReady,he=b(M,Q);if(M.isDepthTexture)ce=w(M.format===Mi,M.type),Fe&&(De?t.texStorage2D(n.TEXTURE_2D,1,ce,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,ue,Re,null));else if(M.isDataTexture)if(we.length>0){De&&Fe&&t.texStorage2D(n.TEXTURE_2D,he,ce,we[0].width,we[0].height);for(let $=0,fe=we.length;$<fe;$++)oe=we[$],De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,Re,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,ue,Re,oe.data);M.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(n.TEXTURE_2D,he,ce,Q.width,Q.height),N&&ee(M,Q,ue,Re)):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,ue,Re,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ce,we[0].width,we[0].height,Q.depth);for(let $=0,fe=we.length;$<fe;$++)if(oe=we[$],M.format!==mn)if(ue!==null)if(De){if(N)if(M.layerUpdates.size>0){const xe=fu(oe.width,oe.height,M.format,M.type);for(const te of M.layerUpdates){const Pe=oe.data.subarray(te*xe/oe.data.BYTES_PER_ELEMENT,(te+1)*xe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,te,oe.width,oe.height,1,ue,Pe)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ue,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,oe.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ue,Re,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,ue,Re,oe.data)}else{De&&Fe&&t.texStorage2D(n.TEXTURE_2D,he,ce,we[0].width,we[0].height);for(let $=0,fe=we.length;$<fe;$++)oe=we[$],M.format!==mn?ue!==null?De?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,oe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,Re,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,ue,Re,oe.data)}else if(M.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ce,Q.width,Q.height,Q.depth),N)if(M.layerUpdates.size>0){const $=fu(Q.width,Q.height,M.format,M.type);for(const fe of M.layerUpdates){const xe=Q.data.subarray(fe*$/Q.data.BYTES_PER_ELEMENT,(fe+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,Q.width,Q.height,1,ue,Re,xe)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ue,Re,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,Q.width,Q.height,Q.depth,0,ue,Re,Q.data);else if(M.isData3DTexture)De?(Fe&&t.texStorage3D(n.TEXTURE_3D,he,ce,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ue,Re,Q.data)):t.texImage3D(n.TEXTURE_3D,0,ce,Q.width,Q.height,Q.depth,0,ue,Re,Q.data);else if(M.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(n.TEXTURE_2D,he,ce,Q.width,Q.height);else{let $=Q.width,fe=Q.height;for(let xe=0;xe<he;xe++)t.texImage2D(n.TEXTURE_2D,xe,ce,$,fe,0,ue,Re,null),$>>=1,fe>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),h.add(M),$.onpaint=fe=>{const xe=fe.changedElements;for(const te of h)xe.includes(te.image)&&(te.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{const xe=n.RGBA,te=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,te,Pe,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(we.length>0){if(De&&Fe){const $=Ye(we[0]);t.texStorage2D(n.TEXTURE_2D,he,ce,$.width,$.height)}for(let $=0,fe=we.length;$<fe;$++)oe=we[$],De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ue,Re,oe):t.texImage2D(n.TEXTURE_2D,$,ce,ue,Re,oe);M.generateMipmaps=!1}else if(De){if(Fe){const $=Ye(Q);t.texStorage2D(n.TEXTURE_2D,he,ce,$.width,$.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Re,Q)}else t.texImage2D(n.TEXTURE_2D,0,ce,ue,Re,Q);p(M)&&_(V),de.__version=re.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ne(C,M,O){if(M.image.length!==6)return;const V=K(C,M),Y=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+O);const re=i.get(Y);if(Y.version!==re.__version||V===!0){t.activeTexture(n.TEXTURE0+O);const de=Qe.getPrimaries(Qe.workingColorSpace),j=M.colorSpace===ni?null:Qe.getPrimaries(M.colorSpace),Q=M.colorSpace===ni||de===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ue=M.isCompressedTexture||M.image[0].isCompressedTexture,Re=M.image[0]&&M.image[0].isDataTexture,ce=[];for(let te=0;te<6;te++)!ue&&!Re?ce[te]=m(M.image[te],!0,r.maxCubemapSize):ce[te]=Re?M.image[te].image:M.image[te],ce[te]=Vt(M,ce[te]);const oe=ce[0],we=s.convert(M.format,M.colorSpace),De=s.convert(M.type),Fe=y(M.internalFormat,we,De,M.normalized,M.colorSpace),N=M.isVideoTexture!==!0,he=re.__version===void 0||V===!0,$=Y.dataReady;let fe=b(M,oe);Be(n.TEXTURE_CUBE_MAP,M);let xe;if(ue){N&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,oe.width,oe.height);for(let te=0;te<6;te++){xe=ce[te].mipmaps;for(let Pe=0;Pe<xe.length;Pe++){const be=xe[Pe];M.format!==mn?we!==null?N?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Fe,be.width,be.height,0,be.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,be.width,be.height,we,De,be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Fe,be.width,be.height,0,we,De,be.data)}}}else{if(xe=M.mipmaps,N&&he){xe.length>0&&fe++;const te=Ye(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,te.width,te.height)}for(let te=0;te<6;te++)if(Re){N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ce[te].width,ce[te].height,we,De,ce[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,ce[te].width,ce[te].height,0,we,De,ce[te].data);for(let Pe=0;Pe<xe.length;Pe++){const At=xe[Pe].image[te].image;N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,At.width,At.height,we,De,At.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Fe,At.width,At.height,0,we,De,At.data)}}else{N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,we,De,ce[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,we,De,ce[te]);for(let Pe=0;Pe<xe.length;Pe++){const be=xe[Pe];N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,we,De,be.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Fe,we,De,be.image[te])}}}p(M)&&_(n.TEXTURE_CUBE_MAP),re.__version=Y.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ve(C,M,O,V,Y,re){const de=s.convert(O.format,O.colorSpace),j=s.convert(O.type),Q=y(O.internalFormat,de,j,O.normalized,O.colorSpace),ue=i.get(M),Re=i.get(O);if(Re.__renderTarget=M,!ue.__hasExternalTextures){const ce=Math.max(1,M.width>>re),oe=Math.max(1,M.height>>re);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,re,Q,ce,oe,M.depth,0,de,j,null):t.texImage2D(Y,re,Q,ce,oe,0,de,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),st(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Y,Re.__webglTexture,0,ct(M)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Y,Re.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(C,M,O){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer){const V=M.depthTexture,Y=V&&V.isDepthTexture?V.type:null,re=w(M.stencilBuffer,Y),de=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;st(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(M),re,M.width,M.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(M),re,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,re,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,C)}else{const V=M.textures;for(let Y=0;Y<V.length;Y++){const re=V[Y],de=s.convert(re.format,re.colorSpace),j=s.convert(re.type),Q=y(re.internalFormat,de,j,re.normalized,re.colorSpace);st(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(M),Q,M.width,M.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(M),Q,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function We(C,M,O){const V=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=i.get(M.depthTexture);if(Y.__renderTarget=M,(!Y.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(n.TEXTURE_CUBE_MAP,M.depthTexture);const ue=s.convert(M.depthTexture.format),Re=s.convert(M.depthTexture.type);let ce;M.depthTexture.format===di?ce=n.DEPTH_COMPONENT24:M.depthTexture.format===Mi&&(ce=n.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,M.width,M.height,0,ue,Re,null)}}else Z(M.depthTexture,0);const re=Y.__webglTexture,de=ct(M),j=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,Q=M.depthTexture.format===Mi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===di)st(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,j,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,j,re,0);else if(M.depthTexture.format===Mi)st(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,j,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,j,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function rt(C){const M=i.get(C),O=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const V=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),V){const Y=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),M.__depthDisposeCallback=Y}M.__boundDepthTexture=V}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)We(M.__webglFramebuffer[V],C,V);else{const V=C.texture.mipmaps;V&&V.length>0?We(M.__webglFramebuffer[0],C,0):We(M.__webglFramebuffer,C,0)}else if(O){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]===void 0)M.__webglDepthbuffer[V]=n.createRenderbuffer(),ft(M.__webglDepthbuffer[V],C,!1);else{const Y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}else{const V=C.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ft(M.__webglDepthbuffer,C,!1);else{const Y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(C,M,O){const V=i.get(C);M!==void 0&&ve(V.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&rt(C)}function Ae(C){const M=C.texture,O=i.get(C),V=i.get(M);C.addEventListener("dispose",v);const Y=C.textures,re=C.isWebGLCubeRenderTarget===!0,de=Y.length>1;if(de||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=M.version,a.memory.textures++),re){O.__webglFramebuffer=[];for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[j]=[];for(let Q=0;Q<M.mipmaps.length;Q++)O.__webglFramebuffer[j][Q]=n.createFramebuffer()}else O.__webglFramebuffer[j]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let j=0;j<M.mipmaps.length;j++)O.__webglFramebuffer[j]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(de)for(let j=0,Q=Y.length;j<Q;j++){const ue=i.get(Y[j]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&st(C)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let j=0;j<Y.length;j++){const Q=Y[j];O.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[j]);const ue=s.convert(Q.format,Q.colorSpace),Re=s.convert(Q.type),ce=y(Q.internalFormat,ue,Re,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),oe=ct(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,ce,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,O.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(O.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Be(n.TEXTURE_CUBE_MAP,M);for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)ve(O.__webglFramebuffer[j][Q],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Q);else ve(O.__webglFramebuffer[j],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(M)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let j=0,Q=Y.length;j<Q;j++){const ue=Y[j],Re=i.get(ue);let ce=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,Re.__webglTexture),Be(ce,ue),ve(O.__webglFramebuffer,C,ue,n.COLOR_ATTACHMENT0+j,ce,0),p(ue)&&_(ce)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,V.__webglTexture),Be(j,M),M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)ve(O.__webglFramebuffer[Q],C,M,n.COLOR_ATTACHMENT0,j,Q);else ve(O.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,j,0);p(M)&&_(j),t.unbindTexture()}C.depthBuffer&&rt(C)}function Ce(C){const M=C.textures;for(let O=0,V=M.length;O<V;O++){const Y=M[O];if(p(Y)){const re=S(C),de=i.get(Y).__webglTexture;t.bindTexture(re,de),_(re),t.unbindTexture()}}}const lt=[],qe=[];function He(C){if(C.samples>0){if(st(C)===!1){const M=C.textures,O=C.width,V=C.height;let Y=n.COLOR_BUFFER_BIT;const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(C),j=M.length>1;if(j)for(let ue=0;ue<M.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const Q=C.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let ue=0;ue<M.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[ue]);const Re=i.get(M[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Re,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,Y,n.NEAREST),c===!0&&(lt.length=0,qe.length=0,lt.push(n.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.resolveDepthBuffer===!1&&(lt.push(re),qe.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,qe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let ue=0;ue<M.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,de.__webglColorRenderbuffer[ue]);const Re=i.get(M[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,Re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function ct(C){return Math.min(r.maxSamples,C.samples)}function st(C){const M=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function I(C){const M=a.render.frame;d.get(C)!==M&&(d.set(C,M),C.update())}function Vt(C,M){const O=C.colorSpace,V=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||O!==ns&&O!==ni&&(Qe.getTransfer(O)===dt?(V!==mn||Y!==sn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",O)),M}function Ye(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=F,this.getTextureUnits=B,this.setTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=J,this.setTexture3D=ne,this.setTextureCube=ae,this.rebindTextures=se,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=st,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function by(n,e){function t(i,r=ni){let s;const a=Qe.getTransfer(r);if(i===sn)return n.UNSIGNED_BYTE;if(i===uc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Oh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Fh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uh)return n.BYTE;if(i===zh)return n.SHORT;if(i===es)return n.UNSIGNED_SHORT;if(i===dc)return n.INT;if(i===Kn)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===Kt)return n.HALF_FLOAT;if(i===Bh)return n.ALPHA;if(i===kh)return n.RGB;if(i===mn)return n.RGBA;if(i===di)return n.DEPTH_COMPONENT;if(i===Mi)return n.DEPTH_STENCIL;if(i===fc)return n.RED;if(i===pc)return n.RED_INTEGER;if(i===Oi)return n.RG;if(i===mc)return n.RG_INTEGER;if(i===gc)return n.RGBA_INTEGER;if(i===fa||i===pa||i===ma||i===ga)if(a===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===fa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===pa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ma)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===fa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===pa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ma)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ga)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===dl||i===ul||i===hl||i===fl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===dl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ul)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===fl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pl||i===ml||i===gl||i===xl||i===vl||i===Ta||i===yl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===pl||i===ml)return a===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===gl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xl)return s.COMPRESSED_R11_EAC;if(i===vl)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ta)return s.COMPRESSED_RG11_EAC;if(i===yl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===_l||i===Ml||i===Sl||i===bl||i===El||i===wl||i===Tl||i===Al||i===Rl||i===Cl||i===Pl||i===Ll||i===Dl||i===Il)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===_l)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ml)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Sl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===El)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Tl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Al)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ll)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Dl)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Il)return a===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Nl||i===Ul||i===zl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Nl)return a===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ul)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ol||i===Fl||i===Aa||i===Bl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ol)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Fl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Sr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Ey=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ty{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new jh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new bt({vertexShader:Ey,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new Pr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ay extends Gi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new Ty,p={},_=t.getContextAttributes();let S=null,y=null;const w=[],b=[],A=new Se;let v=null;const E=new _n;E.viewport=new wt;const R=new _n;R.viewport=new wt;const P=[E,R],L=new U0;let F=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ie=w[K];return ie===void 0&&(ie=new io,w[K]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(K){let ie=w[K];return ie===void 0&&(ie=new io,w[K]=ie),ie.getGripSpace()},this.getHand=function(K){let ie=w[K];return ie===void 0&&(ie=new io,w[K]=ie),ie.getHandSpace()};function z(K){const ie=b.indexOf(K.inputSource);if(ie===-1)return;const ee=w[ie];ee!==void 0&&(ee.update(K.inputSource,K.frame,l||a),ee.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",k);for(let K=0;K<w.length;K++){const ie=b[K];ie!==null&&(b[K]=null,w[K].disconnect(ie))}F=null,B=null,m.reset();for(const K in p)delete p[K];e.setRenderTarget(S),f=null,u=null,h=null,r=null,y=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",k),_.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ee=null,Ne=null;_.depth&&(Ne=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=_.stencil?Mi:di,Ee=_.stencil?Sr:Kn);const ve={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(ve),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ht(u.textureWidth,u.textureHeight,{format:mn,type:sn,depthTexture:new Fi(u.textureWidth,u.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ht(f.framebufferWidth,f.framebufferHeight,{format:mn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(K){for(let ie=0;ie<K.removed.length;ie++){const ee=K.removed[ie],Ee=b.indexOf(ee);Ee>=0&&(b[Ee]=null,w[Ee].disconnect(ee))}for(let ie=0;ie<K.added.length;ie++){const ee=K.added[ie];let Ee=b.indexOf(ee);if(Ee===-1){for(let ve=0;ve<w.length;ve++)if(ve>=b.length){b.push(ee),Ee=ve;break}else if(b[ve]===null){b[ve]=ee,Ee=ve;break}if(Ee===-1)break}const Ne=w[Ee];Ne&&Ne.connect(ee)}}const Z=new D,J=new D;function ne(K,ie,ee){Z.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(ee.matrixWorld);const Ee=Z.distanceTo(J),Ne=ie.projectionMatrix.elements,ve=ee.projectionMatrix.elements,ft=Ne[14]/(Ne[10]-1),We=Ne[14]/(Ne[10]+1),rt=(Ne[9]+1)/Ne[5],se=(Ne[9]-1)/Ne[5],Ae=(Ne[8]-1)/Ne[0],Ce=(ve[8]+1)/ve[0],lt=ft*Ae,qe=ft*Ce,He=Ee/(-Ae+Ce),ct=He*-Ae;if(ie.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ct),K.translateZ(He),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const st=ft+He,I=We+He,Vt=lt-ct,Ye=qe+(Ee-ct),C=rt*We/I*st,M=se*We/I*st;K.projectionMatrix.makePerspective(Vt,Ye,C,M,st,I),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ae(K,ie){ie===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ie.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ie=K.near,ee=K.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),L.near=R.near=E.near=ie,L.far=R.far=E.far=ee,(F!==L.near||B!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),F=L.near,B=L.far),L.layers.mask=K.layers.mask|6,E.layers.mask=L.layers.mask&-5,R.layers.mask=L.layers.mask&-3;const Ee=K.parent,Ne=L.cameras;ae(L,Ee);for(let ve=0;ve<Ne.length;ve++)ae(Ne[ve],Ee);Ne.length===2?ne(L,E,R):L.projectionMatrix.copy(E.projectionMatrix),le(K,L,Ee)};function le(K,ie,ee){ee===null?K.matrix.copy(ie.matrixWorld):(K.matrix.copy(ee.matrixWorld),K.matrix.invert(),K.matrix.multiply(ie.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ss*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(K){return p[K]};let Ve=null;function je(K,ie){if(d=ie.getViewerPose(l||a),g=ie,d!==null){const ee=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ee=!1;ee.length!==L.cameras.length&&(L.cameras.length=0,Ee=!0);for(let We=0;We<ee.length;We++){const rt=ee[We];let se=null;if(f!==null)se=f.getViewport(rt);else{const Ce=h.getViewSubImage(u,rt);se=Ce.viewport,We===0&&(e.setRenderTargetTextures(y,Ce.colorTexture,Ce.depthStencilTexture),e.setRenderTarget(y))}let Ae=P[We];Ae===void 0&&(Ae=new _n,Ae.layers.enable(We),Ae.viewport=new wt,P[We]=Ae),Ae.matrix.fromArray(rt.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(rt.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(se.x,se.y,se.width,se.height),We===0&&(L.matrix.copy(Ae.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ee===!0&&L.cameras.push(Ae)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const We=h.getDepthInformation(ee[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Ne&&Ne.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let We=0;We<ee.length;We++){const rt=ee[We].camera;if(rt){let se=p[rt];se||(se=new jh,p[rt]=se);const Ae=h.getCameraImage(rt);se.sourceTexture=Ae}}}}for(let ee=0;ee<w.length;ee++){const Ee=b[ee],Ne=w[ee];Ee!==null&&Ne!==void 0&&Ne.update(Ee,ie,l||a)}Ve&&Ve(K,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Be=new tf;Be.setAnimationLoop(je),this.setAnimationLoop=function(K){Ve=K},this.dispose=function(){}}}const Ry=new it,cf=new ke;cf.set(-1,0,0,0,1,0,0,0,1);function Cy(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Jh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,_,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,_,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),S=_.envMap,y=_.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Ry.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(cf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Py(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,w){const b=w.program;i.uniformBlockBinding(y,b)}function l(y,w){let b=r[y.id];b===void 0&&(m(y),b=d(y),r[y.id]=b,y.addEventListener("dispose",_));const A=w.program;i.updateUBOMapping(y,A);const v=e.render.frame;s[y.id]!==v&&(u(y),s[y.id]=v)}function d(y){const w=h();y.__bindingPointIndex=w;const b=n.createBuffer(),A=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const w=r[y.id],b=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,E=b.length;v<E;v++){const R=b[v];if(Array.isArray(R))for(let P=0,L=R.length;P<L;P++)f(R[P],v,P,A);else f(R,v,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,w,b,A){if(x(y,w,b,A)===!0){const v=y.__offset,E=y.value;if(Array.isArray(E)){let R=0;for(let P=0;P<E.length;P++){const L=E[P],F=p(L);g(L,y.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function g(y,w,b){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,b)}function x(y,w,b,A){const v=y.value,E=w+"_"+b;if(A[E]===void 0)return typeof v=="number"||typeof v=="boolean"?A[E]=v:ArrayBuffer.isView(v)?A[E]=v.slice():A[E]=v.clone(),!0;{const R=A[E];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return A[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function m(y){const w=y.uniforms;let b=0;const A=16;for(let E=0,R=w.length;E<R;E++){const P=Array.isArray(w[E])?w[E]:[w[E]];for(let L=0,F=P.length;L<F;L++){const B=P[L],z=Array.isArray(B.value)?B.value:[B.value];for(let W=0,k=z.length;W<k;W++){const Z=z[W],J=p(Z),ne=b%A,ae=ne%J.boundary,le=ne+ae;b+=ae,le!==0&&A-le<J.storage&&(b+=A-le),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=J.storage}}}const v=b%A;return v>0&&(b+=A-v),y.__size=b,y.__cache={},this}function p(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",y),w}function _(y){const w=y.target;w.removeEventListener("dispose",_);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:S}}const Ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Vn=null;function Dy(){return Vn===null&&(Vn=new us(Ly,16,16,Oi,Kt),Vn.name="DFG_LUT",Vn.minFilter=zt,Vn.magFilter=zt,Vn.wrapS=ri,Vn.wrapT=ri,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class Iy{constructor(e={}){const{canvas:t=Lm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=sn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=f,m=new Set([gc,mc,pc]),p=new Set([sn,Kn,es,Sr,uc,hc]),_=new Uint32Array(4),S=new Int32Array(4),y=new D;let w=null,b=null;const A=[],v=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let P=!1,L=null,F=null,B=null,z=null;this._outputColorSpace=Zt;let W=0,k=0,Z=null,J=-1,ne=null;const ae=new wt,le=new wt;let Ve=null;const je=new Ue(0);let Be=0,K=t.width,ie=t.height,ee=1,Ee=null,Ne=null;const ve=new wt(0,0,K,ie),ft=new wt(0,0,K,ie);let We=!1;const rt=new Sc;let se=!1,Ae=!1;const Ce=new it,lt=new D,qe=new wt,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function st(){return Z===null?ee:1}let I=i;function Vt(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nc}`),t.addEventListener("webglcontextlost",At,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",On,!1),I===null){const U="webgl2";if(I=Vt(U,T),I===null)throw Vt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw ot("WebGLRenderer: "+T.message),T}let Ye,C,M,O,V,Y,re,de,j,Q,ue,Re,ce,oe,we,De,Fe,N,he,$,fe,xe,te;function Pe(){Ye=new D1(I),Ye.init(),fe=new by(I,Ye),C=new E1(I,Ye,e,fe),M=new My(I,Ye),C.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),F=I.createFramebuffer(),B=I.createFramebuffer(),z=I.createFramebuffer(),O=new U1(I),V=new oy,Y=new Sy(I,Ye,M,V,C,fe,O),re=new L1(R),de=new B0(I),xe=new S1(I,de),j=new I1(I,de,O,xe),Q=new O1(I,j,de,xe,O),N=new z1(I,C,Y),we=new w1(V),ue=new ay(R,re,Ye,C,xe,we),Re=new Cy(R,V),ce=new cy,oe=new my(Ye),Fe=new M1(R,re,M,Q,g,c),De=new _y(R,Q,C),te=new Py(I,O,C,M),he=new b1(I,Ye,O),$=new N1(I,Ye,O),O.programs=ue.programs,R.capabilities=C,R.extensions=Ye,R.properties=V,R.renderLists=ce,R.shadowMap=De,R.state=M,R.info=O}Pe(),x!==sn&&(E=new B1(x,t.width,t.height,o,r,s));const be=new Ay(R,I);this.xr=be,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Ye.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ye.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(T){T!==void 0&&(ee=T,this.setSize(K,ie,!1))},this.getSize=function(T){return T.set(K,ie)},this.setSize=function(T,U,X=!0){if(be.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,ie=U,t.width=Math.floor(T*ee),t.height=Math.floor(U*ee),X===!0&&(t.style.width=T+"px",t.style.height=U+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(K*ee,ie*ee).floor()},this.setDrawingBufferSize=function(T,U,X){K=T,ie=U,ee=X,t.width=Math.floor(T*X),t.height=Math.floor(U*X),this.setViewport(0,0,T,U)},this.setEffects=function(T){if(x===sn){ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let U=0;U<T.length;U++)if(T[U].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ae)},this.getViewport=function(T){return T.copy(ve)},this.setViewport=function(T,U,X,H){T.isVector4?ve.set(T.x,T.y,T.z,T.w):ve.set(T,U,X,H),M.viewport(ae.copy(ve).multiplyScalar(ee).round())},this.getScissor=function(T){return T.copy(ft)},this.setScissor=function(T,U,X,H){T.isVector4?ft.set(T.x,T.y,T.z,T.w):ft.set(T,U,X,H),M.scissor(le.copy(ft).multiplyScalar(ee).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(T){M.setScissorTest(We=T)},this.setOpaqueSort=function(T){Ee=T},this.setTransparentSort=function(T){Ne=T},this.getClearColor=function(T){return T.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,X=!0){let H=0;if(T){let G=!1;if(Z!==null){const ge=Z.texture.format;G=m.has(ge)}if(G){const ge=Z.texture.type,Me=p.has(ge),me=Fe.getClearColor(),Te=Fe.getClearAlpha(),Le=me.r,Xe=me.g,Ke=me.b;Me?(_[0]=Le,_[1]=Xe,_[2]=Ke,_[3]=Te,I.clearBufferuiv(I.COLOR,0,_)):(S[0]=Le,S[1]=Xe,S[2]=Ke,S[3]=Te,I.clearBufferiv(I.COLOR,0,S))}else H|=I.COLOR_BUFFER_BIT}U&&(H|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),L=T},this.dispose=function(){t.removeEventListener("webglcontextlost",At,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",On,!1),Fe.dispose(),ce.dispose(),oe.dispose(),V.dispose(),re.dispose(),Q.dispose(),xe.dispose(),te.dispose(),ue.dispose(),be.dispose(),be.removeEventListener("sessionstart",id),be.removeEventListener("sessionend",rd),wi.stop()};function At(T){T.preventDefault(),Ud("WebGLRenderer: Context Lost."),P=!0}function gt(){Ud("WebGLRenderer: Context Restored."),P=!1;const T=O.autoReset,U=De.enabled,X=De.autoUpdate,H=De.needsUpdate,G=De.type;Pe(),O.autoReset=T,De.enabled=U,De.autoUpdate=X,De.needsUpdate=H,De.type=G}function On(T){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Fn(T){const U=T.target;U.removeEventListener("dispose",Fn),Bf(U)}function Bf(T){kf(T),V.remove(T)}function kf(T){const U=V.get(T).programs;U!==void 0&&(U.forEach(function(X){ue.releaseProgram(X)}),T.isShaderMaterial&&ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,X,H,G,ge){U===null&&(U=He);const Me=G.isMesh&&G.matrixWorld.determinantAffine()<0,me=Gf(T,U,X,H,G);M.setMaterial(H,Me);let Te=X.index,Le=1;if(H.wireframe===!0){if(Te=j.getWireframeAttribute(X),Te===void 0)return;Le=2}const Xe=X.drawRange,Ke=X.attributes.position;let Ie=Xe.start*Le,ht=(Xe.start+Xe.count)*Le;ge!==null&&(Ie=Math.max(Ie,ge.start*Le),ht=Math.min(ht,(ge.start+ge.count)*Le)),Te!==null?(Ie=Math.max(Ie,0),ht=Math.min(ht,Te.count)):Ke!=null&&(Ie=Math.max(Ie,0),ht=Math.min(ht,Ke.count));const Lt=ht-Ie;if(Lt<0||Lt===1/0)return;xe.setup(G,H,me,X,Te);let Rt,pt=he;if(Te!==null&&(Rt=de.get(Te),pt=$,pt.setIndex(Rt)),G.isMesh)H.wireframe===!0?(M.setLineWidth(H.wireframeLinewidth*st()),pt.setMode(I.LINES)):pt.setMode(I.TRIANGLES);else if(G.isLine){let Jt=H.linewidth;Jt===void 0&&(Jt=1),M.setLineWidth(Jt*st()),G.isLineSegments?pt.setMode(I.LINES):G.isLineLoop?pt.setMode(I.LINE_LOOP):pt.setMode(I.LINE_STRIP)}else G.isPoints?pt.setMode(I.POINTS):G.isSprite&&pt.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))pt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Jt=G._multiDrawStarts,_e=G._multiDrawCounts,cn=G._multiDrawCount,at=Te?de.get(Te).bytesPerElement:1,gn=V.get(H).currentProgram.getUniforms();for(let Bn=0;Bn<cn;Bn++)gn.setValue(I,"_gl_DrawID",Bn),pt.render(Jt[Bn]/at,_e[Bn])}else if(G.isInstancedMesh)pt.renderInstances(Ie,Lt,G.count);else if(X.isInstancedBufferGeometry){const Jt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,_e=Math.min(X.instanceCount,Jt);pt.renderInstances(Ie,Lt,_e)}else pt.render(Ie,Lt)};function nd(T,U,X){T.transparent===!0&&T.side===rn&&T.forceSinglePass===!1?(T.side=an,T.needsUpdate=!0,ys(T,U,X),T.side=ci,T.needsUpdate=!0,ys(T,U,X),T.side=rn):ys(T,U,X)}this.compile=function(T,U,X=null){X===null&&(X=T),b=oe.get(X),b.init(U),v.push(b),X.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),T!==X&&T.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights();const H=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let Me=0;Me<ge.length;Me++){const me=ge[Me];nd(me,X,G),H.add(me)}else nd(ge,X,G),H.add(ge)}),b=v.pop(),H},this.compileAsync=function(T,U,X=null){const H=this.compile(T,U,X);return new Promise(G=>{function ge(){if(H.forEach(function(Me){V.get(Me).currentProgram.isReady()&&H.delete(Me)}),H.size===0){G(T);return}setTimeout(ge,10)}Ye.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Xa=null;function Vf(T){Xa&&Xa(T)}function id(){wi.stop()}function rd(){wi.start()}const wi=new tf;wi.setAnimationLoop(Vf),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(T){Xa=T,be.setAnimationLoop(T),T===null?wi.stop():wi.start()},be.addEventListener("sessionstart",id),be.addEventListener("sessionend",rd),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(T,U);const X=be.enabled===!0&&be.isPresenting===!0,H=E!==null&&(Z===null||X)&&E.begin(R,Z);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(U),U=be.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,U,Z),b=oe.get(T,v.length),b.init(U),b.state.textureUnits=Y.getTextureUnits(),v.push(b),Ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),rt.setFromProjectionMatrix(Ce,Xn,U.reversedDepth),Ae=this.localClippingEnabled,se=we.init(this.clippingPlanes,Ae),w=ce.get(T,A.length),w.init(),A.push(w),be.enabled===!0&&be.isPresenting===!0){const Me=R.xr.getDepthSensingMesh();Me!==null&&qa(Me,U,-1/0,R.sortObjects)}qa(T,U,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(Ee,Ne,U.reversedDepth),ct=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,ct&&Fe.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&we.beginShadows();const G=b.state.shadowsArray;if(De.render(G,T,U),se===!0&&we.endShadows(),(H&&E.hasRenderPass())===!1){const Me=w.opaque,me=w.transmissive;if(b.setupLights(),U.isArrayCamera){const Te=U.cameras;if(me.length>0)for(let Le=0,Xe=Te.length;Le<Xe;Le++){const Ke=Te[Le];ad(Me,me,T,Ke)}ct&&Fe.render(T);for(let Le=0,Xe=Te.length;Le<Xe;Le++){const Ke=Te[Le];sd(w,T,Ke,Ke.viewport)}}else me.length>0&&ad(Me,me,T,U),ct&&Fe.render(T),sd(w,T,U)}Z!==null&&k===0&&(Y.updateMultisampleRenderTarget(Z),Y.updateRenderTargetMipmap(Z)),H&&E.end(R),T.isScene===!0&&T.onAfterRender(R,T,U),xe.resetDefaultState(),J=-1,ne=null,v.pop(),v.length>0?(b=v[v.length-1],Y.setTextureUnits(b.state.textureUnits),se===!0&&we.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,L!==null&&L.renderEnd()};function qa(T,U,X,H){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||rt.intersectsSprite(T)){H&&qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ce);const Me=Q.update(T),me=T.material;me.visible&&w.push(T,Me,me,X,qe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||rt.intersectsObject(T))){const Me=Q.update(T),me=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),qe.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),qe.copy(Me.boundingSphere.center)),qe.applyMatrix4(T.matrixWorld).applyMatrix4(Ce)),Array.isArray(me)){const Te=Me.groups;for(let Le=0,Xe=Te.length;Le<Xe;Le++){const Ke=Te[Le],Ie=me[Ke.materialIndex];Ie&&Ie.visible&&w.push(T,Me,Ie,X,qe.z,Ke)}}else me.visible&&w.push(T,Me,me,X,qe.z,null)}}const ge=T.children;for(let Me=0,me=ge.length;Me<me;Me++)qa(ge[Me],U,X,H)}function sd(T,U,X,H){const{opaque:G,transmissive:ge,transparent:Me}=T;b.setupLightsView(X),se===!0&&we.setGlobalState(R.clippingPlanes,X),H&&M.viewport(ae.copy(H)),G.length>0&&vs(G,U,X),ge.length>0&&vs(ge,U,X),Me.length>0&&vs(Me,U,X),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function ad(T,U,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Ie=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Ht(1,1,{generateMipmaps:!0,type:Ie?Kt:sn,minFilter:si,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const ge=b.state.transmissionRenderTarget[H.id],Me=H.viewport||ae;ge.setSize(Me.z*R.transmissionResolutionScale,Me.w*R.transmissionResolutionScale);const me=R.getRenderTarget(),Te=R.getActiveCubeFace(),Le=R.getActiveMipmapLevel();R.setRenderTarget(ge),R.getClearColor(je),Be=R.getClearAlpha(),Be<1&&R.setClearColor(16777215,.5),R.clear(),ct&&Fe.render(X);const Xe=R.toneMapping;R.toneMapping=qn;const Ke=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),se===!0&&we.setGlobalState(R.clippingPlanes,H),vs(T,X,H),Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ht=0,Lt=U.length;ht<Lt;ht++){const Rt=U[ht],{object:pt,geometry:Jt,material:_e,group:cn}=Rt;if(_e.side===rn&&pt.layers.test(H.layers)){const at=_e.side;_e.side=an,_e.needsUpdate=!0,od(pt,X,H,Jt,_e,cn),_e.side=at,_e.needsUpdate=!0,Ie=!0}}Ie===!0&&(Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge))}R.setRenderTarget(me,Te,Le),R.setClearColor(je,Be),Ke!==void 0&&(H.viewport=Ke),R.toneMapping=Xe}function vs(T,U,X){const H=U.isScene===!0?U.overrideMaterial:null;for(let G=0,ge=T.length;G<ge;G++){const Me=T[G],{object:me,geometry:Te,group:Le}=Me;let Xe=Me.material;Xe.allowOverride===!0&&H!==null&&(Xe=H),me.layers.test(X.layers)&&od(me,U,X,Te,Xe,Le)}}function od(T,U,X,H,G,ge){T.onBeforeRender(R,U,X,H,G,ge),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(R,U,X,H,T,ge),G.transparent===!0&&G.side===rn&&G.forceSinglePass===!1?(G.side=an,G.needsUpdate=!0,R.renderBufferDirect(X,U,H,G,T,ge),G.side=ci,G.needsUpdate=!0,R.renderBufferDirect(X,U,H,G,T,ge),G.side=rn):R.renderBufferDirect(X,U,H,G,T,ge),T.onAfterRender(R,U,X,H,G,ge)}function ys(T,U,X){U.isScene!==!0&&(U=He);const H=V.get(T),G=b.state.lights,ge=b.state.shadowsArray,Me=G.state.version,me=ue.getParameters(T,G.state,ge,U,X,b.state.lightProbeGridArray),Te=ue.getProgramCacheKey(me);let Le=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const Xe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=re.get(T.envMap||H.environment,Xe),H.envMapRotation=H.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Le===void 0&&(T.addEventListener("dispose",Fn),Le=new Map,H.programs=Le);let Ke=Le.get(Te);if(Ke!==void 0){if(H.currentProgram===Ke&&H.lightsStateVersion===Me)return cd(T,me),Ke}else me.uniforms=ue.getUniforms(T),L!==null&&T.isNodeMaterial&&L.build(T,X,me),T.onBeforeCompile(me,R),Ke=ue.acquireProgram(me,Te),Le.set(Te,Ke),H.uniforms=me.uniforms;const Ie=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=we.uniform),cd(T,me),H.needsLights=Xf(T),H.lightsStateVersion=Me,H.needsLights&&(Ie.ambientLightColor.value=G.state.ambient,Ie.lightProbe.value=G.state.probe,Ie.directionalLights.value=G.state.directional,Ie.directionalLightShadows.value=G.state.directionalShadow,Ie.spotLights.value=G.state.spot,Ie.spotLightShadows.value=G.state.spotShadow,Ie.rectAreaLights.value=G.state.rectArea,Ie.ltc_1.value=G.state.rectAreaLTC1,Ie.ltc_2.value=G.state.rectAreaLTC2,Ie.pointLights.value=G.state.point,Ie.pointLightShadows.value=G.state.pointShadow,Ie.hemisphereLights.value=G.state.hemi,Ie.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ie.spotLightMatrix.value=G.state.spotLightMatrix,Ie.spotLightMap.value=G.state.spotLightMap,Ie.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Ke,H.uniformsList=null,Ke}function ld(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=xa.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function cd(T,U){const X=V.get(T);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function Hf(T,U){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let X=0,H=T.length;X<H;X++){const G=T[X];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function Gf(T,U,X,H,G){U.isScene!==!0&&(U=He),Y.resetTextureUnits();const ge=U.fog,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,me=Z===null?R.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Qe.workingColorSpace,Te=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Le=re.get(H.envMap||Me,Te),Xe=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ke=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!X.morphAttributes.position,ht=!!X.morphAttributes.normal,Lt=!!X.morphAttributes.color;let Rt=qn;H.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Rt=R.toneMapping);const pt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Jt=pt!==void 0?pt.length:0,_e=V.get(H),cn=b.state.lights;if(se===!0&&(Ae===!0||T!==ne)){const xt=T===ne&&H.id===J;we.setState(H,T,xt)}let at=!1;H.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==cn.state.version||_e.outputColorSpace!==me||G.isBatchedMesh&&_e.batching===!1||!G.isBatchedMesh&&_e.batching===!0||G.isBatchedMesh&&_e.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&_e.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&_e.instancing===!1||!G.isInstancedMesh&&_e.instancing===!0||G.isSkinnedMesh&&_e.skinning===!1||!G.isSkinnedMesh&&_e.skinning===!0||G.isInstancedMesh&&_e.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_e.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_e.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_e.instancingMorph===!1&&G.morphTexture!==null||_e.envMap!==Le||H.fog===!0&&_e.fog!==ge||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==we.numPlanes||_e.numIntersection!==we.numIntersection)||_e.vertexAlphas!==Xe||_e.vertexTangents!==Ke||_e.morphTargets!==Ie||_e.morphNormals!==ht||_e.morphColors!==Lt||_e.toneMapping!==Rt||_e.morphTargetsCount!==Jt||!!_e.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,_e.__version=H.version);let gn=_e.currentProgram;at===!0&&(gn=ys(H,U,G),L&&H.isNodeMaterial&&L.onUpdateProgram(H,gn,_e));let Bn=!1,ui=!1,Xi=!1;const mt=gn.getUniforms(),Dt=_e.uniforms;if(M.useProgram(gn.program)&&(Bn=!0,ui=!0,Xi=!0),H.id!==J&&(J=H.id,ui=!0),_e.needsLights){const xt=Hf(b.state.lightProbeGridArray,G);_e.lightProbeGrid!==xt&&(_e.lightProbeGrid=xt,ui=!0)}if(Bn||ne!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),mt.setValue(I,"projectionMatrix",T.projectionMatrix),mt.setValue(I,"viewMatrix",T.matrixWorldInverse);const fi=mt.map.cameraPosition;fi!==void 0&&fi.setValue(I,lt.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&mt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&mt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),ne!==T&&(ne=T,ui=!0,Xi=!0)}if(_e.needsLights&&(cn.state.directionalShadowMap.length>0&&mt.setValue(I,"directionalShadowMap",cn.state.directionalShadowMap,Y),cn.state.spotShadowMap.length>0&&mt.setValue(I,"spotShadowMap",cn.state.spotShadowMap,Y),cn.state.pointShadowMap.length>0&&mt.setValue(I,"pointShadowMap",cn.state.pointShadowMap,Y)),G.isSkinnedMesh){mt.setOptional(I,G,"bindMatrix"),mt.setOptional(I,G,"bindMatrixInverse");const xt=G.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),mt.setValue(I,"boneTexture",xt.boneTexture,Y))}G.isBatchedMesh&&(mt.setOptional(I,G,"batchingTexture"),mt.setValue(I,"batchingTexture",G._matricesTexture,Y),mt.setOptional(I,G,"batchingIdTexture"),mt.setValue(I,"batchingIdTexture",G._indirectTexture,Y),mt.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&mt.setValue(I,"batchingColorTexture",G._colorsTexture,Y));const hi=X.morphAttributes;if((hi.position!==void 0||hi.normal!==void 0||hi.color!==void 0)&&N.update(G,X,gn),(ui||_e.receiveShadow!==G.receiveShadow)&&(_e.receiveShadow=G.receiveShadow,mt.setValue(I,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(Dt.envMapIntensity.value=U.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=Dy()),ui){if(mt.setValue(I,"toneMappingExposure",R.toneMappingExposure),_e.needsLights&&Wf(Dt,Xi),ge&&H.fog===!0&&Re.refreshFogUniforms(Dt,ge),Re.refreshMaterialUniforms(Dt,H,ee,ie,b.state.transmissionRenderTarget[T.id]),_e.needsLights&&_e.lightProbeGrid){const xt=_e.lightProbeGrid;Dt.probesSH.value=xt.texture,Dt.probesMin.value.copy(xt.boundingBox.min),Dt.probesMax.value.copy(xt.boundingBox.max),Dt.probesResolution.value.copy(xt.resolution)}xa.upload(I,ld(_e),Dt,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(xa.upload(I,ld(_e),Dt,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&mt.setValue(I,"center",G.center),mt.setValue(I,"modelViewMatrix",G.modelViewMatrix),mt.setValue(I,"normalMatrix",G.normalMatrix),mt.setValue(I,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const xt=H.uniformsGroups;for(let fi=0,qi=xt.length;fi<qi;fi++){const dd=xt[fi];te.update(dd,gn),te.bind(dd,gn)}}return gn}function Wf(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function Xf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(T,U,X){const H=V.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=U,V.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){const X=V.get(T);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,X=0){Z=T,W=U,k=X;let H=null,G=!1,ge=!1;if(T){const me=V.get(T);if(me.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),ae.copy(T.viewport),le.copy(T.scissor),Ve=T.scissorTest,M.viewport(ae),M.scissor(le),M.setScissorTest(Ve),J=-1;return}else if(me.__webglFramebuffer===void 0)Y.setupRenderTarget(T);else if(me.__hasExternalTextures)Y.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Xe=T.depthTexture;if(me.__boundDepthTexture!==Xe){if(Xe!==null&&V.has(Xe)&&(T.width!==Xe.image.width||T.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ge=!0);const Le=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Le[U])?H=Le[U][X]:H=Le[U],G=!0):T.samples>0&&Y.useMultisampledRTT(T)===!1?H=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Le)?H=Le[X]:H=Le,ae.copy(T.viewport),le.copy(T.scissor),Ve=T.scissorTest}else ae.copy(ve).multiplyScalar(ee).floor(),le.copy(ft).multiplyScalar(ee).floor(),Ve=We;if(X!==0&&(H=F),M.bindFramebuffer(I.FRAMEBUFFER,H)&&M.drawBuffers(T,H),M.viewport(ae),M.scissor(le),M.setScissorTest(Ve),G){const me=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,X)}else if(ge){const me=U;for(let Te=0;Te<T.textures.length;Te++){const Le=V.get(T.textures[Te]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Te,Le.__webglTexture,X,me)}}else if(T!==null&&X!==0){const me=V.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,X)}J=-1},this.readRenderTargetPixels=function(T,U,X,H,G,ge,Me,me=0){if(!(T&&T.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){M.bindFramebuffer(I.FRAMEBUFFER,Te);try{const Le=T.textures[me],Xe=Le.format,Ke=Le.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(Xe)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Ke)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-H&&X>=0&&X<=T.height-G&&I.readPixels(U,X,H,G,fe.convert(Xe),fe.convert(Ke),ge)}finally{const Le=Z!==null?V.get(Z).__webglFramebuffer:null;M.bindFramebuffer(I.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(T,U,X,H,G,ge,Me,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te)if(U>=0&&U<=T.width-H&&X>=0&&X<=T.height-G){M.bindFramebuffer(I.FRAMEBUFFER,Te);const Le=T.textures[me],Xe=Le.format,Ke=Le.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.bufferData(I.PIXEL_PACK_BUFFER,ge.byteLength,I.STREAM_READ),I.readPixels(U,X,H,G,fe.convert(Xe),fe.convert(Ke),0);const ht=Z!==null?V.get(Z).__webglFramebuffer:null;M.bindFramebuffer(I.FRAMEBUFFER,ht);const Lt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Dm(I,Lt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ge),I.deleteBuffer(Ie),I.deleteSync(Lt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,X=0){const H=Math.pow(2,-X),G=Math.floor(T.image.width*H),ge=Math.floor(T.image.height*H),Me=U!==null?U.x:0,me=U!==null?U.y:0;Y.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,X,0,0,Me,me,G,ge),M.unbindTexture()},this.copyTextureToTexture=function(T,U,X=null,H=null,G=0,ge=0){let Me,me,Te,Le,Xe,Ke,Ie,ht,Lt;const Rt=T.isCompressedTexture?T.mipmaps[ge]:T.image;if(X!==null)Me=X.max.x-X.min.x,me=X.max.y-X.min.y,Te=X.isBox3?X.max.z-X.min.z:1,Le=X.min.x,Xe=X.min.y,Ke=X.isBox3?X.min.z:0;else{const Dt=Math.pow(2,-G);Me=Math.floor(Rt.width*Dt),me=Math.floor(Rt.height*Dt),T.isDataArrayTexture?Te=Rt.depth:T.isData3DTexture?Te=Math.floor(Rt.depth*Dt):Te=1,Le=0,Xe=0,Ke=0}H!==null?(Ie=H.x,ht=H.y,Lt=H.z):(Ie=0,ht=0,Lt=0);const pt=fe.convert(U.format),Jt=fe.convert(U.type);let _e;U.isData3DTexture?(Y.setTexture3D(U,0),_e=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),_e=I.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),_e=I.TEXTURE_2D),M.activeTexture(I.TEXTURE0),M.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),M.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),M.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const cn=M.getParameter(I.UNPACK_ROW_LENGTH),at=M.getParameter(I.UNPACK_IMAGE_HEIGHT),gn=M.getParameter(I.UNPACK_SKIP_PIXELS),Bn=M.getParameter(I.UNPACK_SKIP_ROWS),ui=M.getParameter(I.UNPACK_SKIP_IMAGES);M.pixelStorei(I.UNPACK_ROW_LENGTH,Rt.width),M.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Rt.height),M.pixelStorei(I.UNPACK_SKIP_PIXELS,Le),M.pixelStorei(I.UNPACK_SKIP_ROWS,Xe),M.pixelStorei(I.UNPACK_SKIP_IMAGES,Ke);const Xi=T.isDataArrayTexture||T.isData3DTexture,mt=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){const Dt=V.get(T),hi=V.get(U),xt=V.get(Dt.__renderTarget),fi=V.get(hi.__renderTarget);M.bindFramebuffer(I.READ_FRAMEBUFFER,xt.__webglFramebuffer),M.bindFramebuffer(I.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let qi=0;qi<Te;qi++)Xi&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(T).__webglTexture,G,Ke+qi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(U).__webglTexture,ge,Lt+qi)),I.blitFramebuffer(Le,Xe,Me,me,Ie,ht,Me,me,I.DEPTH_BUFFER_BIT,I.NEAREST);M.bindFramebuffer(I.READ_FRAMEBUFFER,null),M.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||V.has(T)){const Dt=V.get(T),hi=V.get(U);M.bindFramebuffer(I.READ_FRAMEBUFFER,B),M.bindFramebuffer(I.DRAW_FRAMEBUFFER,z);for(let xt=0;xt<Te;xt++)Xi?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Dt.__webglTexture,G,Ke+xt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Dt.__webglTexture,G),mt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,hi.__webglTexture,ge,Lt+xt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,hi.__webglTexture,ge),G!==0?I.blitFramebuffer(Le,Xe,Me,me,Ie,ht,Me,me,I.COLOR_BUFFER_BIT,I.NEAREST):mt?I.copyTexSubImage3D(_e,ge,Ie,ht,Lt+xt,Le,Xe,Me,me):I.copyTexSubImage2D(_e,ge,Ie,ht,Le,Xe,Me,me);M.bindFramebuffer(I.READ_FRAMEBUFFER,null),M.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else mt?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(_e,ge,Ie,ht,Lt,Me,me,Te,pt,Jt,Rt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(_e,ge,Ie,ht,Lt,Me,me,Te,pt,Rt.data):I.texSubImage3D(_e,ge,Ie,ht,Lt,Me,me,Te,pt,Jt,Rt):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ge,Ie,ht,Me,me,pt,Jt,Rt.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ge,Ie,ht,Rt.width,Rt.height,pt,Rt.data):I.texSubImage2D(I.TEXTURE_2D,ge,Ie,ht,Me,me,pt,Jt,Rt);M.pixelStorei(I.UNPACK_ROW_LENGTH,cn),M.pixelStorei(I.UNPACK_IMAGE_HEIGHT,at),M.pixelStorei(I.UNPACK_SKIP_PIXELS,gn),M.pixelStorei(I.UNPACK_SKIP_ROWS,Bn),M.pixelStorei(I.UNPACK_SKIP_IMAGES,ui),ge===0&&U.generateMipmaps&&I.generateMipmap(_e),M.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&Y.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Y.setTextureCube(T,0):T.isData3DTexture?Y.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Y.setTexture2DArray(T,0):Y.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){W=0,k=0,Z=null,M.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}class Ny extends Xh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new on;e.deleteAttribute("uv");const t=new _t({side:an}),i=new _t,r=new hs(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new ze(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new jr(e,i,6),o=new Pt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new ze(e,dr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new ze(e,dr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const d=new ze(e,dr(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const h=new ze(e,dr(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const u=new ze(e,dr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new ze(e,dr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function dr(n){return new E0({color:0,emissive:16777215,emissiveIntensity:n})}const Do=16,Io=64,df=1024*32,zu=df,uf=Object.freeze({width:Do,height:Do,depth:Do});function Lc(n){return n.width*n.height*n.depth}function Dc(n){if(typeof n!="object"||n===null||!("width"in n)||!("height"in n)||!("depth"in n))return!1;const e=n;return Number.isInteger(e.width)&&Number.isInteger(e.height)&&Number.isInteger(e.depth)&&(e.width??0)>0&&(e.height??0)>0&&(e.depth??0)>0&&(e.width??Number.POSITIVE_INFINITY)<=Io&&(e.height??Number.POSITIVE_INFINITY)<=Io&&(e.depth??Number.POSITIVE_INFINITY)<=Io&&Lc(e)<=df}const Uy=[{x:1,y:0,z:0},{x:-1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:1},{x:0,y:0,z:-1}],zy=new Set(["matte","metal","emissive"]);function Wl(n){return`${n.x},${n.y},${n.z}`}function Oy(n){return Number.isInteger(n.x)&&Number.isInteger(n.y)&&Number.isInteger(n.z)}function hf(n,e){return Oy(n)&&n.x>=0&&n.x<e.width&&n.y>=0&&n.y<e.height&&n.z>=0&&n.z<e.depth}function Hr(n,e,t){return n??e??t}function Fy(n,e){const t=new Set;return n.palette.forEach((i,r)=>{const s=`palette[${r}]`;i.id.trim().length===0?e.push({code:"palette",path:`${s}.id`,message:"Palette ids must not be empty."}):t.has(i.id)&&e.push({code:"palette",path:`${s}.id`,message:`Palette id "${i.id}" is duplicated.`}),t.add(i.id),(!Number.isInteger(i.color)||i.color<0||i.color>16777215)&&e.push({code:"palette",path:`${s}.color`,message:"Palette colors must be integers from 0x000000 to 0xFFFFFF."}),i.materialRole!==void 0&&!zy.has(i.materialRole)&&e.push({code:"palette",path:`${s}.materialRole`,message:'Palette material roles must be "matte", "metal", or "emissive".'})}),t}function By(n,e,t,i){const r=new Map;return n.voxels.forEach((s,a)=>{const o=`voxels[${a}]`;if(e===null||!hf(s,e)){i.push({code:"voxel-bounds",path:o,message:e===null?"Voxel coordinates require valid recipe dimensions.":`Voxel coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`});return}t.has(s.paletteId)||i.push({code:"palette",path:`${o}.paletteId`,message:`Voxel references unknown palette id "${s.paletteId}".`});const c=Wl(s);if(r.has(c)){i.push({code:"duplicate-voxel",path:o,message:`More than one voxel occupies (${c}).`});return}r.set(c,s)}),r}function ky(n,e,t,i){const r=new Set;n.anchors.forEach((s,a)=>{const o=`anchors[${a}]`;(s.id.trim().length===0||r.has(s.id))&&i.push({code:"duplicate-anchor",path:`${o}.id`,message:s.id.trim().length===0?"Anchor ids must not be empty.":`Anchor id "${s.id}" is duplicated.`}),r.add(s.id),(e===null||!hf(s,e))&&i.push({code:"anchor-bounds",path:o,message:e===null?"Anchor coordinates require valid recipe dimensions.":`Anchor coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`})});for(const s of new Set(t))r.has(s)||i.push({code:"required-anchor",path:"anchors",message:`Required anchor "${s}" is missing.`})}function Vy(n){const e=n.values().next().value;if(e===void 0)return!0;const t=new Set,i=[e];t.add(Wl(e));for(let r=0;r<i.length;r+=1){const s=i[r];if(s!==void 0)for(const a of Uy){const o=Wl({x:s.x+a.x,y:s.y+a.y,z:s.z+a.z}),c=n.get(o);c!==void 0&&!t.has(o)&&(t.add(o),i.push(c))}}return t.size===n.size}function Hy(n,e={}){const t=[];n.schemaVersion!==2&&t.push({code:"schema-version",path:"schemaVersion",message:`Voxel recipe schema version ${String(n.schemaVersion)} is unsupported; expected version 2.`});const i=Dc(n.dimensions);i||t.push({code:"grid-dimensions",path:"dimensions",message:"Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells."});const r=i?n.dimensions:null,s=r===null?0:Lc(r),a=Hr(e.minVoxelCount,n.validation?.minVoxelCount,1),o=Hr(e.maxVoxelCount,n.validation?.maxVoxelCount,s);(!Number.isInteger(a)||!Number.isInteger(o)||a<0||o>zu||o>s||a>o||n.voxels.length<a||n.voxels.length>o)&&t.push({code:"voxel-count",path:"voxels",message:`Voxel count ${n.voxels.length} must be between ${a} and ${o}; the grid contains ${s} cells and the absolute cap is ${zu}.`});const c=Fy(n,t),l=By(n,r,c,t);Hr(e.requireGroundContact,n.validation?.requireGroundContact,!0)&&![...l.values()].some(f=>f.y===0)&&t.push({code:"ground-contact",path:"voxels",message:"At least one voxel must touch the y=0 ground plane."}),Hr(e.requireConnectedBody,n.validation?.requireConnectedBody,!0)&&!Vy(l)&&t.push({code:"connected-body",path:"voxels",message:"All voxels must form one six-directionally connected body."});const u=Hr(e.requiredAnchors,n.validation?.requiredAnchors,[]);return ky(n,r,u,t),{valid:t.length===0,issues:t,voxelCount:n.voxels.length,uniqueVoxelCount:l.size}}class Gy extends Error{result;constructor(e,t){const i=t.issues.map(r=>`${r.path}: ${r.message}`).join("; ");super(`Invalid voxel recipe "${e}": ${i}`),this.name="VoxelRecipeValidationError",this.result=t}}function Ic(n,e={}){const t=Hy(n,e);if(!t.valid)throw new Gy(n.id,t)}const ps=0;function as(n,e,t,i){return Dc(n)&&Number.isInteger(e)&&Number.isInteger(t)&&Number.isInteger(i)&&e>=0&&e<n.width&&t>=0&&t<n.height&&i>=0&&i<n.depth}function ff(n,e,t,i){if(!as(n,e,t,i))throw new RangeError(`Voxel coordinate (${e}, ${t}, ${i}) is outside the ${n.width}×${n.height}×${n.depth} grid.`);return e+n.width*(i+n.depth*t)}function Wy(n){if(n.length>65535)throw new RangeError("A voxel palette cannot contain more than 65,535 entries.");const e=new Map;return n.forEach((t,i)=>{if(t.id.trim().length===0)throw new TypeError("Voxel palette ids must not be empty.");if(e.has(t.id))throw new TypeError(`Duplicate voxel palette id "${t.id}".`);if(!Number.isInteger(t.color)||t.color<0||t.color>16777215)throw new TypeError(`Voxel palette color for "${t.id}" must be an integer from 0x000000 to 0xFFFFFF.`);e.set(t.id,i+1)}),e}function Nc(n,e={}){const t=e.dimensions??uf;if(!Dc(t))throw new RangeError("Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells.");return{dimensions:{...t},cells:new Uint16Array(Lc(t)),palette:n,paletteIndexById:Wy(n),anchors:e.anchors??[],...e.recipeId===void 0?{}:{recipeId:e.recipeId}}}function Uc(n,e,t,i){return n.cells[ff(n.dimensions,e,t,i)]??ps}function yt(n,e,t,i,r){const s=ff(n.dimensions,e,t,i);if(r===null){n.cells[s]=ps;return}const a=n.paletteIndexById.get(r);if(a===void 0)throw new TypeError(`Unknown voxel palette id "${r}".`);n.cells[s]=a}function Xy(n,e,t){yt(n,e.x,e.y,e.z,t)}function q(n,e,t,i){if(!as(n.dimensions,e.x,e.y,e.z)||!as(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel box endpoints must both be inside the grid.");const r=Math.min(e.x,t.x),s=Math.max(e.x,t.x),a=Math.min(e.y,t.y),o=Math.max(e.y,t.y),c=Math.min(e.z,t.z),l=Math.max(e.z,t.z);for(let d=a;d<=o;d+=1)for(let h=c;h<=l;h+=1)for(let u=r;u<=s;u+=1)yt(n,u,d,h,i)}function Bi(n,e,t,i){if(!as(n.dimensions,e.x,e.y,e.z)||!as(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel line endpoints must both be inside the grid.");const r=t.x-e.x,s=t.y-e.y,a=t.z-e.z,o=Math.max(Math.abs(r),Math.abs(s),Math.abs(a));if(o===0){Xy(n,e,i);return}for(let c=0;c<=o;c+=1){const l=c/o;yt(n,Math.round(e.x+r*l),Math.round(e.y+s*l),Math.round(e.z+a*l),i)}}function pf(n){const e=[];for(let t=0;t<n.dimensions.height;t+=1)for(let i=0;i<n.dimensions.depth;i+=1)for(let r=0;r<n.dimensions.width;r+=1){const s=Uc(n,r,t,i);if(s===ps)continue;const a=n.palette[s-1];if(a===void 0)throw new TypeError(`Grid cell (${r}, ${t}, ${i}) contains invalid palette index ${s}.`);e.push({x:r,y:t,z:i,paletteId:a.id})}return e}function qy(n,e={}){(e.validate??!0)&&Ic(n);const t=Nc(n.palette,{dimensions:n.dimensions,anchors:n.anchors,recipeId:n.id});for(const i of n.voxels)yt(t,i.x,i.y,i.z,i.paletteId);return t}const Yy=[{name:"positive-x",neighbor:[1,0,0],normal:[1,0,0],vertices:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],shade:.82},{name:"negative-x",neighbor:[-1,0,0],normal:[-1,0,0],vertices:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],shade:.68},{name:"positive-y",neighbor:[0,1,0],normal:[0,1,0],vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{name:"negative-y",neighbor:[0,-1,0],normal:[0,-1,0],vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.55},{name:"positive-z",neighbor:[0,0,1],normal:[0,0,1],vertices:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],shade:.9},{name:"negative-z",neighbor:[0,0,-1],normal:[0,0,-1],vertices:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],shade:.74}],Zy=["matte","metal","emissive"];function No(n){return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}function Ky(n){return[No((n>>16&255)/255),No((n>>8&255)/255),No((n&255)/255)]}function jy(n,e,t,i){return e<0||e>=n.dimensions.width||t<0||t>=n.dimensions.height||i<0||i>=n.dimensions.depth?!1:Uc(n,e,t,i)!==ps}function Jy(n){const e=n.voxelSize??1,t=n.origin??{x:0,y:0,z:0};if(!Number.isFinite(e)||e<=0)throw new RangeError("Voxel size must be a positive finite number.");if(!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(t.z))throw new RangeError("Voxel mesh origin coordinates must be finite.");for(const i of Object.values(n.faceShades??{}))if(i!==void 0&&(!Number.isFinite(i)||i<0))throw new RangeError("Voxel face shades must be finite non-negative numbers.");return{voxelSize:e,origin:t,shadeFaces:n.shadeFaces??!0}}function Qy(n,e={}){const t=Jy(e),i=[],r=[],s=[],a={matte:[],metal:[],emissive:[]};let o=0,c=0,l=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,h=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,f=Number.NEGATIVE_INFINITY,g=Number.NEGATIVE_INFINITY;for(let _=0;_<n.dimensions.height;_+=1)for(let S=0;S<n.dimensions.depth;S+=1)for(let y=0;y<n.dimensions.width;y+=1){const w=Uc(n,y,_,S);if(w===ps)continue;o+=1;const b=n.palette[w-1];if(b===void 0)throw new TypeError(`Grid cell (${y}, ${_}, ${S}) contains invalid palette index ${w}.`);const[A,v,E]=Ky(b.color);for(const R of Yy){const[P,L,F]=R.neighbor;if(jy(n,y+P,_+L,S+F))continue;const B=i.length/3,z=t.shadeFaces?e.faceShades?.[R.name]??R.shade:1;for(const k of R.vertices){const Z=t.origin.x+(y+k[0])*t.voxelSize,J=t.origin.y+(_+k[1])*t.voxelSize,ne=t.origin.z+(S+k[2])*t.voxelSize;i.push(Z,J,ne),r.push(...R.normal),s.push(Math.min(1,A*z),Math.min(1,v*z),Math.min(1,E*z)),l=Math.min(l,Z),d=Math.min(d,J),h=Math.min(h,ne),u=Math.max(u,Z),f=Math.max(f,J),g=Math.max(g,ne)}const W=b.materialRole??"matte";a[W].push(B,B+1,B+2,B,B+2,B+3),c+=1}}const x=[],m=[];for(const _ of Zy){const S=a[_];S.length!==0&&(m.push({role:_,start:x.length,count:S.length}),x.push(...S))}const p=i.length/3;return{positions:new Float32Array(i),normals:new Float32Array(r),colors:new Float32Array(s),indices:new Uint32Array(x),voxelCount:o,faceCount:c,vertexCount:p,triangleCount:x.length/3,materialGroups:m,bounds:p===0?null:{min:[l,d,h],max:[u,f,g]}}}function mf(n,e={}){return Qy(qy(n),e)}function ka(n,e,t=1){if(!Number.isFinite(t)||t<=0)throw new RangeError("Voxel size must be a positive finite number.");const i=n.anchors.find(r=>r.id===e);if(i===void 0)throw new RangeError(`Voxel recipe "${n.id}" has no anchor named "${e}".`);return{x:(i.x+.5-n.dimensions.width/2)*t,y:(i.y+.5)*t,z:(i.z+.5-n.dimensions.depth/2)*t}}const gf=10900280,xf=5628380,vf=Object.freeze({width:24,height:32,depth:16}),Va=2.25;vf.height*Va;const $y=2e3,yf=Object.freeze({width:20,height:20,depth:18}),_f=2.1;yf.height*_f;const e_=1200,t_=[{id:"ink",color:2107434,label:"Deep silhouette",materialRole:"matte"},{id:"hair",color:3420214,label:"Weathered dark hair",materialRole:"matte"},{id:"skin",color:13211253,label:"Sun-warmed skin",materialRole:"matte"},{id:"cloth-dark",color:2704454,label:"Deep field cloth",materialRole:"matte"},{id:"cloth-sage",color:6322800,label:"Faded survey coat",materialRole:"matte"},{id:"pack-pale",color:13553085,label:"Bleached field pack",materialRole:"matte"},{id:"rust",color:gf,label:"Rust repair hardware",materialRole:"metal"},{id:"steel",color:7965576,label:"Dull survey steel",materialRole:"metal"},{id:"cyan",color:xf,label:"Live survey signal",materialRole:"emissive"},{id:"amber",color:15774538,label:"Relic warning light",materialRole:"emissive"}],n_=[{id:"shell-light",color:14342087,label:"Light ceramic cage",materialRole:"matte"},{id:"shell-shadow",color:10398367,label:"Ceramic edge shade",materialRole:"matte"},{id:"inner",color:2107948,label:"Hollow lantern interior",materialRole:"matte"},{id:"steel",color:7438975,label:"Tripod steel",materialRole:"metal"},{id:"rust",color:gf,label:"Rust repair hardware",materialRole:"metal"},{id:"cyan",color:xf,label:"Survey sensor",materialRole:"emissive"},{id:"amber",color:15774538,label:"Lantern status light",materialRole:"emissive"}];function Mf(n){const e=Nc(n.palette,{dimensions:n.dimensions});n.author(e);const t={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:pf(e),anchors:n.anchors,validation:{minVoxelCount:1,maxVoxelCount:n.maxVoxelCount,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return Ic(t),t}function i_(n){q(n,{x:5,y:0,z:4},{x:9,y:2,z:7},"ink"),q(n,{x:14,y:0,z:5},{x:18,y:2,z:8},"ink"),q(n,{x:5,y:0,z:3},{x:9,y:0,z:8},"steel"),q(n,{x:14,y:0,z:4},{x:18,y:0,z:9},"steel"),q(n,{x:6,y:2,z:5},{x:9,y:3,z:7},"rust"),q(n,{x:14,y:2,z:6},{x:17,y:3,z:8},"rust"),q(n,{x:7,y:3,z:6},{x:9,y:11,z:7},"cloth-dark"),q(n,{x:14,y:3,z:6},{x:16,y:11,z:7},"cloth-dark"),q(n,{x:7,y:7,z:5},{x:9,y:8,z:6},"steel"),q(n,{x:14,y:8,z:5},{x:16,y:9,z:6},"steel"),q(n,{x:7,y:10,z:8},{x:10,y:14,z:10},"cloth-sage"),q(n,{x:13,y:11,z:8},{x:16,y:14,z:10},"cloth-sage"),q(n,{x:7,y:10,z:10},{x:9,y:12,z:11},"cloth-dark"),q(n,{x:14,y:11,z:10},{x:16,y:13,z:11},"cloth-dark"),q(n,{x:8,y:13,z:6},{x:16,y:16,z:9},"cloth-dark"),q(n,{x:9,y:16,z:6},{x:15,y:21,z:9},"cloth-sage"),q(n,{x:9,y:16,z:5},{x:10,y:21,z:5},"cloth-dark"),q(n,{x:14,y:16,z:5},{x:15,y:21,z:5},"cloth-dark"),q(n,{x:8,y:22,z:6},{x:16,y:23,z:9},"cloth-dark"),q(n,{x:8,y:22,z:5},{x:16,y:23,z:6},"pack-pale"),q(n,{x:5,y:20,z:6},{x:8,y:22,z:9},"cloth-dark"),q(n,{x:4,y:17,z:6},{x:6,y:20,z:8},"cloth-sage"),q(n,{x:3,y:14,z:4},{x:5,y:18,z:7},"cloth-dark"),q(n,{x:2,y:13,z:3},{x:4,y:15,z:6},"skin"),q(n,{x:16,y:20,z:6},{x:18,y:22,z:9},"cloth-dark"),q(n,{x:17,y:17,z:5},{x:19,y:20,z:8},"cloth-sage"),q(n,{x:18,y:14,z:4},{x:20,y:18,z:7},"steel"),q(n,{x:19,y:13,z:3},{x:21,y:15,z:6},"skin"),q(n,{x:20,y:13,z:3},{x:21,y:14,z:5},"ink"),q(n,{x:10,y:16,z:10},{x:15,y:22,z:11},"pack-pale"),q(n,{x:11,y:17,z:13},{x:14,y:21,z:13},"cloth-dark"),q(n,{x:10,y:16,z:12},{x:10,y:22,z:13},"steel"),q(n,{x:14,y:16,z:12},{x:15,y:22,z:13},"rust"),q(n,{x:5,y:21,z:9},{x:6,y:27,z:10},"steel"),q(n,{x:6,y:26,z:9},{x:8,y:27,z:10},"steel"),q(n,{x:6,y:21,z:9},{x:8,y:22,z:10},"rust"),yt(n,5,27,9,"cyan"),yt(n,5,27,10,"amber"),q(n,{x:10,y:22,z:7},{x:13,y:24,z:9},"skin"),q(n,{x:9,y:24,z:5},{x:14,y:29,z:9},"skin"),q(n,{x:8,y:29,z:5},{x:15,y:31,z:10},"hair"),q(n,{x:8,y:27,z:9},{x:10,y:30,z:11},"hair"),q(n,{x:14,y:27,z:9},{x:16,y:30,z:10},"hair"),q(n,{x:9,y:29,z:4},{x:11,y:30,z:5},"hair"),q(n,{x:14,y:28,z:4},{x:15,y:30,z:5},"hair"),yt(n,10,27,4,"cyan"),yt(n,13,27,4,"cyan"),q(n,{x:11,y:25,z:4},{x:12,y:25,z:5},"rust"),q(n,{x:7,y:23,z:7},{x:16,y:24,z:9},"rust"),q(n,{x:16,y:23,z:8},{x:18,y:25,z:9},"rust"),q(n,{x:18,y:21,z:9},{x:19,y:24,z:10},"pack-pale"),Bi(n,{x:8,y:22,z:4},{x:15,y:15,z:4},"rust"),Bi(n,{x:9,y:22,z:4},{x:16,y:15,z:4},"rust"),q(n,{x:10,y:18,z:4},{x:11,y:20,z:5},"cyan"),q(n,{x:12,y:18,z:4},{x:13,y:20,z:5},"amber")}function r_(n){q(n,{x:3,y:0,z:3},{x:6,y:0,z:6},"steel"),q(n,{x:13,y:0,z:3},{x:16,y:0,z:6},"steel"),q(n,{x:8,y:0,z:13},{x:11,y:0,z:16},"steel"),q(n,{x:4,y:1,z:4},{x:5,y:4,z:5},"rust"),q(n,{x:14,y:1,z:4},{x:15,y:4,z:5},"rust"),q(n,{x:9,y:1,z:14},{x:10,y:4,z:15},"rust"),q(n,{x:5,y:4,z:5},{x:8,y:5,z:7},"steel"),q(n,{x:11,y:4,z:5},{x:14,y:5,z:7},"steel"),q(n,{x:8,y:4,z:11},{x:11,y:5,z:14},"steel"),q(n,{x:7,y:5,z:7},{x:12,y:7,z:11},"inner"),q(n,{x:8,y:8,z:7},{x:11,y:13,z:11},"inner"),q(n,{x:5,y:8,z:6},{x:6,y:14,z:7},"shell-light"),q(n,{x:13,y:8,z:6},{x:14,y:14,z:7},"shell-light"),q(n,{x:5,y:8,z:12},{x:6,y:14,z:13},"shell-shadow"),q(n,{x:13,y:8,z:12},{x:14,y:14,z:13},"shell-shadow"),q(n,{x:7,y:7,z:6},{x:12,y:8,z:13},"shell-shadow"),q(n,{x:7,y:14,z:6},{x:12,y:15,z:13},"shell-light"),q(n,{x:6,y:9,z:13},{x:13,y:13,z:14},"shell-shadow");for(let e=8;e<=14;e+=1)for(let t=6;t<=13;t+=1){const i=Math.abs(t-9.5)+Math.abs(e-11);i>=2.5&&i<=4.5&&(yt(n,t,e,4,"shell-light"),yt(n,t,e,5,"shell-shadow"))}q(n,{x:9,y:10,z:6},{x:10,y:12,z:6},"cyan"),yt(n,9,11,5,null),yt(n,10,11,5,null),q(n,{x:9,y:15,z:9},{x:11,y:17,z:11},"steel"),q(n,{x:11,y:16,z:9},{x:14,y:17,z:10},"rust"),q(n,{x:13,y:17,z:9},{x:14,y:19,z:10},"steel"),q(n,{x:12,y:19,z:8},{x:15,y:19,z:11},"cyan"),q(n,{x:14,y:10,z:7},{x:16,y:12,z:9},"rust"),q(n,{x:16,y:8,z:7},{x:17,y:11,z:8},"steel"),q(n,{x:17,y:7,z:6},{x:18,y:8,z:9},"steel"),yt(n,18,7,6,"amber"),yt(n,18,7,9,"amber"),q(n,{x:8,y:9,z:14},{x:11,y:13,z:15},"rust"),q(n,{x:9,y:10,z:16},{x:10,y:12,z:16},"steel"),yt(n,9,9,16,"cyan"),yt(n,10,13,16,"amber")}const Dr=Mf({id:"player-relic-surveyor",name:"Relic Surveyor",kind:"player",dimensions:vf,palette:t_,maxVoxelCount:$y,anchors:[{id:"ground",x:7,y:0,z:6},{id:"weapon",x:20,y:14,z:4},{id:"weapon-grip",x:20,y:14,z:4},{id:"free-hand",x:3,y:14,z:4},{id:"focus",x:11,y:19,z:4}],requiredAnchors:["ground","weapon","weapon-grip","free-hand","focus"],author:i_}),zc=Mf({id:"companion-survey-lantern",name:"Three-Foot Survey Lantern",kind:"companion",dimensions:yf,palette:n_,maxVoxelCount:e_,anchors:[{id:"ground",x:4,y:0,z:4},{id:"sensor",x:9,y:11,z:6},{id:"mast",x:13,y:19,z:9},{id:"manipulator",x:17,y:8,z:7},{id:"rear-coil",x:9,y:10,z:16}],requiredAnchors:["ground","sensor","mast","manipulator","rear-coil"],author:r_}),Ou=[{id:"shadow",color:1515551,label:"Mineral shadow"},{id:"soil",color:4930866,label:"Dark soil"},{id:"bone",color:14207140,label:"Bone cloth"},{id:"rust",color:9981234,label:"Oxidized red"},{id:"cyan",color:5229524,label:"Signal cyan"},{id:"amber",color:14919242,label:"Warning amber"},{id:"cloth",color:3492425,label:"Field cloth"},{id:"steel",color:8359304,label:"Dull steel"},{id:"leaf-dark",color:2507566,label:"Dark foliage"},{id:"leaf",color:5206597,label:"Dry foliage"},{id:"wood",color:7359284,label:"Weathered wood"},{id:"violet",color:8546725,label:"Anomaly violet"}];function jn(n){const e=n.dimensions??uf,t=Nc(Ou,{dimensions:e});n.author(t);const i={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:e,palette:Ou,voxels:pf(t),anchors:n.anchors,validation:{minVoxelCount:1,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return Ic(i),i}const Ha=jn({id:"weapon-signal-blade",name:"Signal Blade",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"tip",x:7,y:15,z:7}],requiredAnchors:["grip","tip"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:3,z:8},"bone"),q(n,{x:6,y:0,z:7},{x:9,y:0,z:8},"rust"),q(n,{x:5,y:4,z:7},{x:10,y:4,z:8},"rust"),q(n,{x:7,y:5,z:7},{x:8,y:14,z:8},"steel"),q(n,{x:7,y:6,z:7},{x:7,y:13,z:7},"cyan"),yt(n,7,15,7,"steel"),yt(n,8,15,8,"steel")}}),Ga=jn({id:"weapon-impact-maul",name:"Impact Maul",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"impact",x:3,y:9,z:7}],requiredAnchors:["grip","impact"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),q(n,{x:6,y:0,z:7},{x:9,y:1,z:8},"bone"),q(n,{x:7,y:4,z:7},{x:8,y:5,z:8},"steel"),q(n,{x:4,y:8,z:5},{x:11,y:12,z:10},"steel"),q(n,{x:3,y:8,z:5},{x:4,y:12,z:10},"rust"),q(n,{x:11,y:8,z:5},{x:12,y:12,z:10},"rust"),q(n,{x:6,y:12,z:6},{x:9,y:12,z:9},"cyan")}}),Oc=jn({id:"scrap-hound",name:"Scrap Hound",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:3,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:5,y:2,z:5},{x:10,y:5,z:10},"rust"),q(n,{x:6,y:3,z:5},{x:9,y:4,z:5},"shadow"),yt(n,6,4,5,"amber"),yt(n,9,4,5,"amber"),q(n,{x:3,y:0,z:5},{x:4,y:2,z:6},"shadow"),q(n,{x:11,y:0,z:5},{x:12,y:2,z:6},"shadow"),q(n,{x:5,y:0,z:3},{x:6,y:2,z:4},"shadow"),q(n,{x:9,y:0,z:11},{x:10,y:2,z:12},"shadow"),Bi(n,{x:6,y:5,z:2},{x:6,y:5,z:5},"steel"),Bi(n,{x:9,y:5,z:2},{x:9,y:5,z:5},"steel")}}),Fc=jn({id:"relay-shell",name:"Relay Shell",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:7,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:4,y:0,z:5},{x:6,y:3,z:10},"shadow"),q(n,{x:9,y:0,z:5},{x:11,y:3,z:10},"shadow"),q(n,{x:3,y:2,z:4},{x:12,y:9,z:11},"rust"),q(n,{x:3,y:5,z:4},{x:12,y:8,z:5},"steel"),q(n,{x:5,y:9,z:5},{x:10,y:12,z:10},"bone"),q(n,{x:6,y:10,z:5},{x:9,y:11,z:5},"shadow"),yt(n,6,11,5,"amber"),yt(n,9,11,5,"amber"),Bi(n,{x:5,y:12,z:7},{x:5,y:14,z:7},"steel"),Bi(n,{x:10,y:12,z:7},{x:10,y:14,z:7},"steel")}}),Bc=jn({id:"murmur",name:"Murmur",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:5,z:8},"shadow"),q(n,{x:5,y:5,z:5},{x:10,y:10,z:10},"violet"),q(n,{x:6,y:6,z:5},{x:9,y:9,z:5},"cyan"),q(n,{x:3,y:7,z:7},{x:5,y:8,z:8},"steel"),q(n,{x:10,y:7,z:7},{x:12,y:8,z:8},"steel"),q(n,{x:7,y:11,z:7},{x:8,y:14,z:8},"cyan"),yt(n,7,15,7,"amber")}}),kc=jn({id:"anomaly-orison",name:"Orison, the Listening Fault",kind:"named-anomaly",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7},{id:"interact",x:7,y:6,z:4}],requiredAnchors:["ground","target","interact"],author:n=>{q(n,{x:3,y:0,z:5},{x:6,y:5,z:10},"shadow"),q(n,{x:9,y:0,z:5},{x:12,y:5,z:10},"shadow"),q(n,{x:3,y:4,z:4},{x:12,y:10,z:11},"violet"),q(n,{x:1,y:6,z:6},{x:3,y:9,z:9},"steel"),q(n,{x:12,y:6,z:6},{x:14,y:9,z:9},"steel"),q(n,{x:5,y:10,z:5},{x:10,y:14,z:10},"bone"),q(n,{x:5,y:11,z:5},{x:10,y:13,z:5},"shadow"),q(n,{x:6,y:11,z:4},{x:9,y:12,z:5},"cyan"),yt(n,6,12,4,"amber"),yt(n,9,12,4,"amber"),q(n,{x:6,y:15,z:6},{x:9,y:15,z:9},"steel"),q(n,{x:6,y:7,z:3},{x:9,y:9,z:4},"cyan")}}),Wa=jn({id:"prop-dry-tree",name:"Dry Signal Tree",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),q(n,{x:4,y:0,z:7},{x:11,y:0,z:8},"wood"),q(n,{x:7,y:0,z:4},{x:8,y:0,z:11},"wood"),q(n,{x:4,y:7,z:7},{x:11,y:8,z:8},"wood"),q(n,{x:7,y:7,z:4},{x:8,y:8,z:11},"wood"),q(n,{x:3,y:9,z:4},{x:12,y:12,z:11},"leaf-dark"),q(n,{x:5,y:13,z:5},{x:10,y:15,z:10},"leaf"),q(n,{x:5,y:10,z:3},{x:10,y:11,z:12},"leaf"),yt(n,7,15,7,"cyan")}}),Vc=jn({id:"prop-rift-rock",name:"Rift Rock",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{q(n,{x:3,y:0,z:4},{x:12,y:2,z:11},"soil"),q(n,{x:4,y:3,z:5},{x:11,y:5,z:10},"shadow"),q(n,{x:6,y:6,z:6},{x:9,y:7,z:9},"steel"),Bi(n,{x:5,y:3,z:5},{x:8,y:6,z:5},"cyan")}}),Hc=jn({id:"prop-field-chest",name:"Field Chest",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:4,z:4}],requiredAnchors:["ground","interact"],author:n=>{q(n,{x:3,y:0,z:4},{x:12,y:5,z:11},"wood"),q(n,{x:3,y:0,z:4},{x:4,y:7,z:11},"steel"),q(n,{x:11,y:0,z:4},{x:12,y:7,z:11},"steel"),q(n,{x:3,y:6,z:4},{x:12,y:7,z:11},"rust"),q(n,{x:7,y:3,z:3},{x:8,y:5,z:4},"amber")}}),ms=jn({id:"prop-unclassified-relic",name:"Unclassified Relic",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:7,z:5},{id:"core",x:7,y:8,z:7}],requiredAnchors:["ground","interact","core"],author:n=>{q(n,{x:5,y:0,z:5},{x:10,y:2,z:10},"soil"),q(n,{x:7,y:3,z:7},{x:8,y:6,z:8},"steel"),q(n,{x:5,y:6,z:5},{x:10,y:11,z:10},"violet"),q(n,{x:6,y:7,z:5},{x:9,y:10,z:5},"cyan"),q(n,{x:7,y:8,z:4},{x:8,y:9,z:5},"amber"),q(n,{x:7,y:12,z:7},{x:8,y:14,z:8},"cyan")}}),s_=[Dr,zc,Ha,Ga,Oc,Fc,Bc,kc,Wa,Vc,Hc,ms],a_=Object.freeze({blade:Ha,impact:Ga}),o_=Object.freeze({"scrap-hound":Oc,"relay-shell":Fc,murmur:Bc,"named-anomaly":kc}),l_=Object.freeze({tree:Wa,rock:Vc,chest:Hc,relic:ms});Object.freeze({...Object.fromEntries(s_.map(n=>[n.id,n])),player:Dr,companion:zc,...a_,...o_,...l_,"dead-tree":Wa,"unclassified-relic":ms});const Fu=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],c_=[{id:"negative-z",corners:[0,3,2,1],normal:[0,0,-1]},{id:"positive-z",corners:[4,5,6,7],normal:[0,0,1]},{id:"negative-x",corners:[0,4,7,3],normal:[-1,0,0]},{id:"positive-x",corners:[1,2,6,5],normal:[1,0,0]},{id:"negative-y",corners:[0,1,5,4],normal:[0,-1,0]},{id:"positive-y",corners:[3,7,6,2],normal:[0,1,0]}],Bu=[0,1,2,0,2,3];function Ks(n,e){if(!n.every(Number.isFinite))throw new RangeError(`${e} must contain finite values.`)}function ku(n,e,t){n.set(e).multiplyScalar(t),n.r=It.clamp(n.r,0,1),n.g=It.clamp(n.g,0,1),n.b=It.clamp(n.b,0,1)}function d_(n){return n.y>.55?1.04:n.y<-.55?.56:It.clamp(.75+n.x*.055+n.z*.09,.62,.9)}class et{positions=[];normals=[];colors=[];transformedCorners=Fu.map(()=>new D);matrix=new it;normalMatrix=new ke;position=new D;scale=new D;quaternion=new zn;euler=new Sn;faceNormal=new D;color=new Ue;componentCount=0;get triangles(){return this.positions.length/9}get components(){return this.componentCount}addBox(e){if(Ks(e.center,"Box center"),Ks(e.size,"Box size"),e.size.some(r=>r<=0))throw new RangeError("Box size values must be greater than zero.");const t=e.rotation??[0,0,0];Ks(t,"Box rotation");const i=e.shade??1;if(!Number.isFinite(i)||i<0)throw new RangeError("Box shade must be a finite non-negative value.");this.position.set(...e.center),this.scale.set(...e.size),this.euler.set(...t),this.quaternion.setFromEuler(this.euler),this.matrix.compose(this.position,this.quaternion,this.scale),this.normalMatrix.getNormalMatrix(this.matrix),Fu.forEach((r,s)=>{this.transformedCorners[s]?.set(...r).applyMatrix4(this.matrix)});for(const r of c_){this.faceNormal.set(...r.normal).applyMatrix3(this.normalMatrix).normalize();const s=i*d_(this.faceNormal)*(e.faceShades?.[r.id]??1);ku(this.color,e.color,s);for(const a of Bu){const o=this.transformedCorners[r.corners[a]];if(o===void 0)throw new Error("Invalid internal box face definition.");this.positions.push(o.x,o.y,o.z),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}}return this.componentCount+=1,this}addQuad(e){e.corners.forEach(o=>{Ks(o,"Quad corner")});const t=e.shade??1;if(!Number.isFinite(t)||t<0)throw new RangeError("Quad shade must be a finite non-negative value.");const i=new D(...e.corners[0]),r=new D(...e.corners[1]),s=new D(...e.corners[2]);if(this.faceNormal.subVectors(r,i).cross(new D().subVectors(s,i)),this.faceNormal.lengthSq()<=Number.EPSILON)throw new RangeError("Quad corners must describe a non-zero surface.");this.faceNormal.normalize();const a=Array.isArray(e.color)?e.color:[e.color,e.color,e.color,e.color];for(const o of Bu){const c=e.corners[o],l=a[o];if(c===void 0||l===void 0)throw new Error("Invalid internal quad definition.");ku(this.color,l,t),this.positions.push(...c),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}return this.componentCount+=1,this}build(){const e=new St;return e.setAttribute("position",new Ge(this.positions,3)),e.setAttribute("normal",new Ge(this.normals,3)),e.setAttribute("color",new Ge(this.colors,3)),e.computeBoundingBox(),e.computeBoundingSphere(),e.userData.componentCount=this.componentCount,e.userData.triangleCount=this.triangles,e}}const Vu=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),Hu=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),u_=new D(1,0,0),js=new D,Js=new D,Gu=new zn,Qs=new Sn,Je={moss:[5209416,6130256,7706458,4157508],soil:[10057042,9004871,11174744,7888195],stone:[10986895,9607045,11973020,8358267],paleWall:[13157543,12171679,13749170,11449242],roof:[11034178,9653562,11955528,8342078],timber:[6834741,7820346,5193009,8872514],rust:[9130296,10641727,7097149,11630157],foliage:[4029256,5739343,7185747,3106626]};function Tt(n,e,t=0){return(Math.imul(Math.trunc(n)+61,73856093)^Math.imul(Math.trunc(e)+113,19349663)^Math.imul(Math.trunc(t)+185,83492791))>>>0}function ye(n,e=0){return(n>>>e&1023)/1023}function Ct(n,e){return n[e%n.length]??n[0]??16777215}function h_(n,e){const t=[],i=[];return n.forEach((r,s)=>{const a=n[Math.max(0,s-1)]??r,o=n[Math.min(n.length-1,s+1)]??r,c=o[0]-a[0],l=o[2]-a[2],d=Math.hypot(c,l)||1,h=(e[s]??e[0]??1)/2,u=-l/d*h,f=c/d*h;t.push([r[0]+u,r[1],r[2]+f]),i.push([r[0]-u,r[1],r[2]-f])}),{left:t,right:i}}function ur(n,e,t,i){if(e.length<2||e.length!==t.length)throw new RangeError("Ribbon points and widths must have equal length.");const r=h_(e,t);for(let s=0;s<e.length-1;s+=1){const a=r.left[s],o=r.left[s+1],c=r.right[s+1],l=r.right[s];if(a===void 0||o===void 0||c===void 0||l===void 0)continue;const d=i[s%i.length]??16777215,h=i[(s+1)%i.length]??d;n.addQuad({corners:[a,o,c,l],color:[d,h,h,d]})}}function Uo(n,e){return n.map(([t,i])=>[t,e,i])}function f_(n){const e=Uo([[24,930],[140,920],[275,908],[415,900],[555,902],[695,890],[824,876]],1.18),t=[132,124,114,108,116,124,136];ur(n,e.map(([s,,a])=>[s,1.05,a]),t.map(s=>s+22),[7297603,7954503,7034690]),ur(n,e,t,[10648661,9990478,11371867,9398603]);const i=Uo([[270,910],[265,850],[267,790],[267,716]],1.24);ur(n,i,[82,78,68,60],[10188370,10977625,9399372]);const r=Uo([[292,908],[290,970],[278,1025],[267,1091]],1.26);ur(n,r,[72,70,64,58],[9990736,10845782,9201737]),ur(n,e.map(([s,,a])=>[s,1.5,a-27]),t.map(()=>7),[7755327,6836029]),ur(n,e.map(([s,,a])=>[s,1.52,a+24]),t.map(()=>6),[7230014,8084290]);for(let s=0;s<74;s+=1){const a=Tt(s,41,13),o=s/73,c=45+o*752,l=925-o*46+(ye(a,5)-.5)*126,d=s%2===0?-1:1;n.addBox({center:[c,2.05+ye(a,17)*.4,l+d*(57+ye(a,12)*16)],size:[8+ye(a,2)*12,1.5+ye(a,20)*1.2,6+ye(a,9)*9],rotation:[0,ye(a,14)*Math.PI,0],color:Ct(Je.stone,a),shade:.92})}}function Sf(n,e,t=0){return n>130-t&&n<380+t&&e>570-t&&e<720+t||n>150-t&&n<380+t&&e>1090-t&&e<1220+t||n>320-t&&n<402+t&&e>790-t&&e<872+t}function p_(n){[{x:105,z:630,radius:58,count:13,palette:Je.moss},{x:407,z:694,radius:56,count:18,palette:Je.stone},{x:207,z:752,radius:52,count:13,palette:Je.soil},{x:361,z:831,radius:72,count:17,palette:Je.moss},{x:500,z:900,radius:92,count:15,palette:Je.stone},{x:471,z:760,radius:44,count:9,palette:Je.soil},{x:471,z:1040,radius:46,count:9,palette:Je.moss},{x:258,z:1058,radius:54,count:12,palette:Je.soil},{x:407,z:1202,radius:58,count:17,palette:Je.stone},{x:126,z:1164,radius:54,count:12,palette:Je.moss},{x:118,z:830,radius:68,count:12,palette:Je.soil},{x:178,z:1004,radius:72,count:12,palette:Je.moss},{x:652,z:801,radius:76,count:13,palette:Je.soil},{x:704,z:977,radius:78,count:13,palette:Je.moss}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=Tt(r,s,73),o=ye(a,3)*Math.PI*2+r*.37,c=Math.sqrt(ye(a,13))*i.radius,l=i.x+Math.cos(o)*c+(ye(a,19)-.5)*8,d=i.z+Math.sin(o)*c+(ye(a,7)-.5)*8;if(Sf(l,d,10))continue;const h=r%3===0?Je.soil:r%3===1?Je.moss:Je.stone,u=s%5===0?h:i.palette;n.addBox({center:[l,1.08+ye(a,21)*.24,d],size:[8+ye(a,5)*24,.75+ye(a,23)*.9,8+ye(a,15)*24],rotation:[0,o+ye(a,9)*.65,0],color:Ct(u,a>>>4),shade:.9+ye(a,18)*.14})}}),[[414,846],[446,838],[478,843],[511,839],[540,849],[427,874],[463,872],[501,875],[535,878],[409,911],[444,908],[482,913],[525,909],[555,913],[424,947],[460,944],[500,948],[538,942]].forEach(([i,r],s)=>{const a=Tt(s,i,r);n.addBox({center:[i,1.7,r],size:[18+ye(a,4)*9,1.8,13+ye(a,12)*8],rotation:[0,(ye(a,20)-.5)*.24,0],color:Ct(Je.stone,a)})})}function Mt(n,e,t,i,r,s=i){js.set(t[0]-e[0],t[1]-e[1],t[2]-e[2]);const a=js.length();a<=Number.EPSILON||(js.multiplyScalar(1/a),Gu.setFromUnitVectors(u_,js),Qs.setFromQuaternion(Gu,"XYZ"),Js.set((e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2),n.addBox({center:[Js.x,Js.y,Js.z],size:[a,i,s],rotation:[Qs.x,Qs.y,Qs.z],color:r}))}function va(n,e,t,i,r,s){const a=Math.ceil((t-e)/24),o=(t-e)/a;for(let c=0;c<a;c+=1){const l=Tt(c,s,19);n.addBox({center:[e+(c+.5)*o,r+(ye(l,13)-.5)*.8,i],size:[o-1.2,7+ye(l,5)*2,11+ye(l,18)*2],rotation:[0,(ye(l,9)-.5)*.035,0],color:Ct(Je.stone,l)})}}function m_(n,e,t,i,r,s,a,o,c){n.addBox({center:[255,5,645],size:[250,10,150],color:7830896}),n.addBox({center:[255,14,578],size:[226,8,12],color:9277827});for(const x of[137,373])n.addBox({center:[x,14,645],size:[12,8,126],color:x===137?8752254:9737607});va(n,132,378,716,12,10),va(n,132,378,574,12,11),va(n,132,378,716,21,12);for(const x of[139,371])for(let m=0;m<6;m+=1){const p=Tt(x,m,101);n.addBox({center:[x,21+m*13,712],size:[16+ye(p,4)*2,12,18+ye(p,14)*2],rotation:[0,(ye(p,20)-.5)*.045,0],color:Ct(Je.stone,p)})}e.addBox({center:[255,55,578],size:[226,76,10],color:12236960}),e.addBox({center:[137,55,645],size:[10,76,126],color:11645852}),[{z:596,y:55,d:30,h:76},{z:626,y:27,d:30,h:22},{z:626,y:78,d:30,h:24},{z:680,y:55,d:78,h:76}].forEach((x,m)=>{e.addBox({center:[373,x.y,x.z],size:[10,x.h,x.d],color:Ct(Je.paleWall,Tt(m,81))})}),[{x:149,y:54,width:20,height:78},{x:178,y:24,width:38,height:20},{x:178,y:78,width:38,height:24},{x:220,y:54,width:44,height:78},{x:268,y:81,width:42,height:18},{x:305,y:54,width:30,height:78},{x:337,y:24,width:32,height:20},{x:337,y:78,width:32,height:24},{x:362,y:54,width:18,height:78}].forEach((x,m)=>{e.addBox({center:[x.x,x.y,712],size:[x.width,x.height,9],color:Ct(Je.paleWall,Tt(m,91))})}),[[151,57,718,13,18,8885103],[213,35,718,15,20,10194285],[304,69,718,10,15,7702891],[359,32,718,9,16,9993825]].forEach(([x,m,p,_,S,y])=>{e.addBox({center:[x,m,p],size:[_,S,1.5],color:y,shade:.92})});const u=268;i.addBox({center:[u,40,707],size:[34,58,5],color:4601903});for(let x=0;x<4;x+=1)i.addBox({center:[u-12.5+x*8.3,40,710],size:[6.7,54,2],color:Ct(Je.timber,Tt(x,140))});i.addBox({center:[u-22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[u+22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[u,74,714],size:[50,7,9],color:6638133}),r.addBox({center:[u+10,39,713.5],size:[3,4,3],color:12157516}),[{x:178,y:51,z:708,rotationY:0},{x:337,y:51,z:708,rotationY:0}].forEach((x,m)=>{(m===0?c:o).addBox({center:[x.x,x.y,x.z],size:[28,24,2],color:m===0?8829094:14792302}),i.addBox({center:[x.x,x.y-15,x.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[x.x,x.y+15,x.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[x.x-18,x.y,x.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[x.x+18,x.y,x.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[x.x,x.y,x.z+5],size:[3,28,3],color:6309687}),i.addBox({center:[x.x,x.y,x.z+5],size:[31,3,3],color:6309687})}),c.addBox({center:[369,51,626],size:[2,23,24],color:7974045}),i.addBox({center:[368,51,626],size:[4,3,29],color:5718579}),i.addBox({center:[368,51,626],size:[4,29,3],color:5718579}),bf(t,i,{centerX:255,ridgeZ:645,wallTop:94,width:270,halfDepth:86,rise:34,columns:17,rows:7,seed:211,brokenSide:1}),n.addBox({center:[185,108,602],size:[27,47,25],color:8486770}),n.addBox({center:[185,133,602],size:[33,7,31],color:7304297}),[{y:3,z:726,width:54,depth:15},{y:6,z:720,width:48,depth:12}].forEach(x=>{n.addBox({center:[u,x.y,x.z],size:[x.width,x.y*2,x.depth],color:9277828})}),Ef(s,255,645,154,27,311),La(a,151,714,77,401),La(a,350,714,62,402),wf(i,r,394,735,3,421),Tf(i,r,116,731,431)}function g_(n,e,t,i,r,s,a,o,c){n.addBox({center:[265,4,1155],size:[230,8,130],color:7699824}),n.addBox({center:[265,12,1095],size:[214,8,11],color:8883840});for(const h of[157,375])n.addBox({center:[h,12,1155],size:[11,8,112],color:h===157?8489594:9474949});va(n,152,378,1216,11,510),e.addBox({center:[265,44,1095],size:[214,66,9],color:12106143}),e.addBox({center:[157,44,1155],size:[9,66,112],color:11449755}),[{z:1112,y:44,d:28,h:66},{z:1145,y:23,d:38,h:21},{z:1145,y:65,d:38,h:22},{z:1194,y:44,d:52,h:66}].forEach((h,u)=>{e.addBox({center:[375,h.y,h.z],size:[9,h.h,h.d],color:Ct(Je.paleWall,Tt(u,521))})}),[{x:168,y:44,width:24,height:66},{x:205,y:72,width:50,height:10},{x:245,y:44,width:30,height:66},{x:293,y:23,width:66,height:20},{x:293,y:65,width:66,height:22},{x:350,y:44,width:46,height:66}].forEach((h,u)=>{e.addBox({center:[h.x,h.y,1215],size:[h.width,h.height,9],color:Ct(Je.paleWall,Tt(u,531))})}),e.addBox({center:[352,34,1221],size:[14,23,1.5],color:8688239}),i.addBox({center:[205,38,1211],size:[40,56,5],color:5324080});for(let h=0;h<5;h+=1)i.addBox({center:[190+h*7.5,38,1214],size:[5.8,52,2],color:Ct(Je.timber,Tt(h,540))});for(const h of[181,229])i.addBox({center:[h,39,1218],size:[6,64,8],color:6309684});i.addBox({center:[205,70,1218],size:[55,7,9],color:6309684}),c.addBox({center:[293,49,1211],size:[56,28,2],color:9288102});for(const h of[263,323])i.addBox({center:[h,49,1217],size:[5,36,5],color:5849652});for(const h of[32,66])i.addBox({center:[293,h,1217],size:[64,5,5],color:5849652});i.addBox({center:[293,49,1217],size:[4,30,4],color:5849652}),o.addBox({center:[371,49,1145],size:[2,26,31],color:14068840}),i.addBox({center:[369,49,1145],size:[4,34,4],color:5784116}),i.addBox({center:[369,49,1145],size:[4,4,39],color:5784116}),bf(t,i,{centerX:265,ridgeZ:1155,wallTop:78,width:248,halfDepth:74,rise:29,columns:16,rows:6,seed:551,brokenSide:1}),Ef(s,265,1155,134,23,571),La(a,338,1219,54,581),La(a,164,1219,44,582),wf(i,r,403,1202,2,591),Tf(i,r,135,1210,601)}function bf(n,e,t){const i=t.width/t.columns,r=t.halfDepth/t.rows,s=Math.atan2(t.rise,t.halfDepth),o=Math.hypot(t.rise,t.halfDepth)/t.rows+2.2;for(const l of[-1,1])for(let d=0;d<t.rows;d+=1)for(let h=0;h<t.columns;h+=1){const u=Tt(h,d,t.seed+l*17);if(l===t.brokenSide&&h>=t.columns-5&&d>=1&&d<=t.rows-2&&((h+d)%3!==0||h===t.columns-1))continue;const x=t.centerX-t.width/2+(h+.5)*i+(ye(u,11)-.5)*1.2,m=(d+.5)*r,p=t.ridgeZ+l*m,_=t.wallTop+t.rise-m/t.halfDepth*t.rise;n.addBox({center:[x,_,p],size:[i+1.4,3+ye(u,18)*1.2,o],rotation:[l*s,(ye(u,7)-.5)*.025,(ye(u,20)-.5)*.018],color:Ct(Je.roof,u)})}for(let l=0;l<t.columns;l+=1){const d=Tt(l,t.seed,631);n.addBox({center:[t.centerX-t.width/2+(l+.5)*i,t.wallTop+t.rise+1.6,t.ridgeZ],size:[i+1.2,5.5,9],rotation:[0,0,(ye(d,12)-.5)*.025],color:Ct(Je.roof,d)})}const c=t.centerX+t.width/2-i*4.5;for(let l=0;l<5;l+=1){const d=c+l*i,h=[d,t.wallTop+t.rise-1,t.ridgeZ],u=[d,t.wallTop-1,t.ridgeZ+t.brokenSide*t.halfDepth];Mt(e,h,u,3.4,6177841,4.2)}}function Ef(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=Tt(a,s,701),c=a/r*Math.PI*2+(ye(o,6)-.5)*.28,l=i+(ye(o,15)-.5)*25,d=5+ye(o,3)*15,h=5+ye(o,10)*13,u=.8+ye(o,17)*.8;n.addBox({center:[e+Math.cos(c)*l,.25+u/2,t+Math.sin(c)*l],size:[d,u,h],rotation:[(ye(o,1)-.5)*.05,c+ye(o,13),(ye(o,8)-.5)*.05],color:a%5===0?Ct(Je.roof,o):Ct(Je.stone,o)})}}function La(n,e,t,i,r){const s=[];for(let a=0;a<7;a+=1){const o=Tt(a,r,733);s.push([e+Math.sin(a*1.3+r)*7,3+a/6*i,t+ye(o,12)*1.4])}for(let a=0;a<s.length-1;a+=1){const o=s[a],c=s[a+1];if(o===void 0||c===void 0)continue;Mt(n,o,c,2.2,3499325,1.5);const l=Tt(a,r,739);n.addBox({center:[c[0]+(ye(l,4)-.5)*9,c[1],c[2]+1],size:[6+ye(l,12)*5,3+ye(l,18)*3,2.2],rotation:[0,(ye(l,9)-.5)*.4,(ye(l,21)-.5)*.45],color:Ct(Je.foliage,l)})}}function wf(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=Tt(a,s,751),c=25+ye(o,5)*8,l=22+ye(o,13)*9,d=23+ye(o,19)*8,h=t+a*25,u=i+a%2*22,f=(ye(o,9)-.5)*.16;n.addBox({center:[h,l/2,u],size:[c,l,d],rotation:[0,f,0],color:Ct(Je.timber,o)});for(const g of[4,l-4])e.addBox({center:[h,g,u],size:[c+2,2.2,d+2],rotation:[0,f,0],color:8084034})}}function Tf(n,e,t,i,r){for(let s=0;s<3;s+=1){const a=Tt(s,r,769),o=[t+s*9,2,i+s*3],c=[o[0]+7+ye(a,7)*5,35+ye(a,14)*11,o[2]-3];Mt(n,o,c,3.2,6441011,2.8),e.addBox({center:[c[0],c[1]+2,c[2]],size:[s===1?15:11,5,s===2?9:4],rotation:[0,ye(a,19)*.4,.18],color:Ct(Je.rust,a)})}}function x_(n,e,t,i,r){for(let c=0;c<3;c+=1)for(let l=0;l<14;l+=1){const d=Tt(l,c,811),h=(l+c%2*.5)/14*Math.PI*2,u=31+(ye(d,11)-.5)*1.7;n.addBox({center:[361+Math.cos(h)*u,5+c*9,831+Math.sin(h)*u],size:[16.5+ye(d,3)*2,8,11+ye(d,17)*1.5],rotation:[0,-h,0],color:Ct(Je.stone,d)})}r.addBox({center:[361,16,831],size:[42,1.4,42],color:4165521,shade:.9});for(const c of[329,393])e.addBox({center:[c,49,831],size:[8,58,9],color:6309170}),n.addBox({center:[c,5,831],size:[15,10,17],color:8094324});e.addBox({center:[361,75,831],size:[82,8,9],color:6769203}),t.addBox({center:[361,54,831],size:[74,5,5],color:7035725}),t.addBox({center:[361,54,831],size:[10,16,10],color:10117950}),Mt(t,[361,54,831],[361,23,831],1.8,4998719,1.8),e.addBox({center:[361,21,831],size:[18,12,16],color:7754810});for(let c=0;c<12;c+=1){const l=Tt(c,831,17),d=c/12*Math.PI*2;i.addBox({center:[361+Math.cos(d)*39,2.5,831+Math.sin(d)*39],size:[8+ye(l,8)*7,3,5],rotation:[0,-d,(ye(l,17)-.5)*.25],color:Ct(Je.moss,l)})}}function v_(n,e,t,i){const r=Et.x,s=Et.y;for(const o of[470,530])n.addBox({center:[o,34,s],size:[8,68,9],color:5783599}),i.addBox({center:[o,3,s],size:[17,6,18],color:8291704});n.addBox({center:[r,49,s],size:[76,48,8],color:6703668});for(let o=0;o<5;o+=1)n.addBox({center:[r,31+o*9,s+5],size:[70,7,3],color:Ct(Je.timber,Tt(o,901))});n.addBox({center:[r,76,s],size:[92,7,19],rotation:[0,0,-.035],color:7753785}),Mt(n,[470,10,s],[492,75,s],4,5126444),Mt(n,[530,10,s],[508,75,s],4,5126444),[{x:479,y:57,width:19,height:24,color:14208938},{x:503,y:54,width:20,height:29,color:13154696},{x:524,y:59,width:15,height:20,color:14603701},{x:489,y:36,width:22,height:14,color:12102269},{x:518,y:38,width:23,height:16,color:13813407}].forEach((o,c)=>{t.addBox({center:[o.x,o.y,s+7.1],size:[o.width,o.height,.9],rotation:[0,0,(c-2)*.025],color:o.color,shade:1.03}),e.addBox({center:[o.x,o.y+o.height/2-3,s+8],size:[2.4,2.4,1.8],color:c%2===0?11558722:5144948})})}function Wu(n,e,t,i,r,s){e.addBox({center:[i,4,r],size:[20,8,20],rotation:[0,s,0],color:8554362}),n.addBox({center:[i,35,r],size:[7,62,7],rotation:[0,0,s],color:5590855}),n.addBox({center:[i+9,66,r],size:[25,5,6],rotation:[0,s,-.08],color:5984325}),n.addBox({center:[i+19,57,r],size:[3.5,17,4],color:6444362}),t.addBox({center:[i+19,53,r],size:[13,15,12],rotation:[0,s,0],color:15907944,shade:1.05});for(const a of[-7.5,7.5])n.addBox({center:[i+19+a,53,r],size:[2,18,15],rotation:[0,s,0],color:5851968});n.addBox({center:[i+19,62,r],size:[18,3,16],color:6771522}),n.addBox({center:[i+19,44,r],size:[18,3,16],color:6771522})}function y_(n,e,t,i){Wu(n,e,t,470,760,-.025),Wu(n,e,t,470,1040,.018),[[[489,65,760],[494,58,805],[498,56,850],[500,72,940]],[[500,72,960],[498,55,974],[494,57,997],[489,65,1040]]].forEach(s=>{for(let a=0;a<s.length-1;a+=1){const o=s[a],c=s[a+1];o!==void 0&&c!==void 0&&Mt(n,o,c,1.45,4013113,1.45)}});for(const[s,a]of[[489,760],[489,1040]]){const o=new hs(16760690,46,155,2);o.position.set(s,57,a),o.castShadow=!1,o.name=`start-town-lamp-light-${a}`,i.add(o)}}function __(n){for(let t=0;t<96;t+=1){const i=Tt(t,1101,29),r=52+ye(i,2)*742,s=446+ye(i,12)*900;if(Sf(r,s,22)||r>390&&r<600&&Math.abs(s-900)<92)continue;const a=2+i%3;for(let o=0;o<a;o+=1){const c=Tt(t,o,1111),l=7+ye(c,4)*13;n.addBox({center:[r+(ye(c,11)-.5)*10,1.8+l/2,s+(ye(c,18)-.5)*10],size:[2.2+ye(c,7)*2,l,2.2],rotation:[(ye(c,14)-.5)*.32,ye(c,21)*Math.PI,(ye(c,2)-.5)*.28],color:Ct(Je.foliage,c)})}t%9===0&&n.addBox({center:[r,13,s],size:[5,5,5],rotation:[.2,ye(i,18)*Math.PI,.2],color:t%18===0?14988624:13922920,shade:1.04})}}function M_(n,e,t){const i=[7314321,8628896,12690255,11123879],r=255,s=645,a=94,o=270,c=86,l=34,d=17,h=7,u=o/d,f=c/h,g=Math.atan2(l,c),x=Math.hypot(l,c)/h+3.4,m=[[16,2],[16,4],[15,2],[14,3],[12,5]];m.forEach(([y,w],b)=>{const A=(w+.5)*f,v=r-o/2+(y+.5)*u,E=s+A,R=a+l-A/c*l+1.6;n.addBox({center:[v,R,E],size:[u+2.2,2.4,x],rotation:[g,0,(b-2)*.012],color:i[b%i.length]??7314321,shade:1.02});for(const P of[-u*.27,u*.27])t.addBox({center:[v+P,R+2.1,E],size:[2.2,1.8,2.2],rotation:[g,0,0],color:5464413})});const p=[{center:[315,52,717.2],size:[27,30,1.8],color:7577750},{center:[214,35,717.2],size:[21,18,1.8],color:12756307},{center:[378.5,54,686],size:[1.8,31,25],color:9547684}];p.forEach((y,w)=>{n.addBox({center:y.center,size:y.size,color:y.color,rotation:w===2?[0,0,.025]:[0,0,-.02]}),t.addBox({center:w===2?[379.8,y.center[1],y.center[2]-7]:[y.center[0],y.center[1]+8,718.4],size:w===2?[1.4,3,8]:[9,3,1.4],color:5661278})});const _=397,S=379;for(const y of[665,690])Mt(e,[_,2,y],[S,81,y],4,7757892,3.5);for(let y=0;y<7;y+=1){const w=(y+1)/8,b=_+(S-_)*w,A=2+79*w;Mt(e,[b,A,665],[b,A,690],2.8,8415562,3)}e.addBox({center:[386,47,704],size:[7,90,7],rotation:[0,0,-.018],color:6836280}),Mt(e,[389,5,697],[367,94,704],5,7493436,5),t.addBox({center:[409,7,714],size:[14,11,13],color:7312011});for(const y of[402.5,415.5])t.addBox({center:[y,9,714],size:[2,12,15],color:5663848});return Mt(t,[402,13,714],[405,20,714],1.7,5792863),Mt(t,[405,20,714],[413,20,714],1.7,5792863),Mt(t,[413,20,714],[416,13,714],1.7,5792863),m.length+p.length}function S_(n,e,t,i){const r=[412,432,452,472],s=[1132,1150,1168,1186];r.forEach((a,o)=>{n.addBox({center:[a,1.45,1155],size:[12,1.6,74],color:o%2===0?7623997:8479047,shade:.94});for(const c of[1117.5,1192.5])e.addBox({center:[a,2.4,c],size:[15,3,3],color:7955012});for(const c of[1125,1185])e.addBox({center:[a,16,c],size:[3,29,3],color:6903358});Mt(e,[a,28,1125],[a,28,1185],1.6,8679503,1.6),s.forEach((c,l)=>{const d=(o+l)%3===0?7314260:5211469;i.addBox({center:[a,8,c],size:[2.4,13,2.4],rotation:[.06,o*.2,.08],color:4683593}),i.addBox({center:[a-3.4,10,c],size:[7,3.5,3],rotation:[0,o*.16,-.22],color:d}),i.addBox({center:[a+3.4,13,c+1],size:[7,3.5,3],rotation:[0,-o*.13,.22],color:d})})}),t.addBox({center:[470,7,1116],size:[13,10,11],color:6985874}),Mt(t,[476,9,1116],[478,14,1116],3.2,7577497,3),Mt(t,[463,12,1116],[464,20,1116],2,5860970),Mt(t,[464,20,1116],[473,20,1116],2,5860970),Mt(t,[473,20,1116],[476,12,1116],2,5860970);for(let a=0;a<3;a+=1)e.addBox({center:[468,5+a*6,1192],size:[19-a*2,6,14],rotation:[0,a%2===0?.08:-.07,0],color:a===1?11768399:12691293});return e.addBox({center:[468,14,1192],size:[3,24,3],color:7693124}),r.length}function b_(n,e,t){const i=[375,59,1095],r=[470,59,1040];for(const[h,u]of[[i[0],i[2]],[r[0],r[2]]])e.addBox({center:[h,31,u],size:[5,62,5],color:7493694}),e.addBox({center:[h,58,u],size:[14,4,4],color:8414794});Mt(t,i,r,1.25,7892313,1.25);const s=[14866103,7448483,12755279,10852022],a=[16,14,17,15],o=[23,20,24,21],c=r[0]-i[0],l=r[2]-i[2],d=-Math.atan2(l,c);return s.forEach((h,u)=>{const f=.17+u*.22,g=i[0]+c*f,x=i[2]+l*f,m=o[u]??20;n.addBox({center:[g,57-m/2,x],size:[a[u]??15,m,2],rotation:[0,d,(u-1.5)*.025],color:h,shade:1.03});for(const p of[-4,4])t.addBox({center:[g+Math.cos(-d)*p,58.2,x+Math.sin(-d)*p],size:[2,3,2],rotation:[0,d,0],color:6643280})}),s.length}function E_(n,e,t,i,r){e.addBox({center:[550,27,790],size:[78,7,25],color:7951930});for(const u of[522,578])for(const f of[782,798])e.addBox({center:[u,13,f],size:[6,26,6],color:6703926});e.addBox({center:[550,10,790],size:[63,4,19],color:7164217}),t.addBox({center:[532,36,790],size:[12,11,11],color:6450280}),t.addBox({center:[532,43,790],size:[8,3,8],color:5200214}),Mt(t,[538,38,790],[545,42,790],3,5923936,3),Mt(t,[526,42,790],[526,49,790],2,5266007),Mt(t,[526,49,790],[536,49,790],2,5266007),Mt(t,[536,49,790],[538,42,790],2,5266007);for(let u=0;u<3;u+=1)e.addBox({center:[552+u*9,33,786+u*3],size:[17,2.2,2.2],rotation:[0,-.25+u*.18,.08],color:7426362}),t.addBox({center:[560+u*9,34,784+u*3],size:[6,4,4],rotation:[0,u*.17,0],color:6844780});r.addBox({center:[565,39,797],size:[4,12,4],color:7908006}),i.addBox({center:[578,39,793],size:[7,10,7],color:14729844}),t.addBox({center:[578,45,793],size:[9,2,9],color:5988185});const o=582,c=815;t.addBox({center:[o,19,c],size:[39,6,25],color:6454646});for(const u of[822,846])t.addBox({center:[o,25,u],size:[39,13,4],rotation:[0,0,u<c?-.1:.1],color:u<c?7442311:6190191});t.addBox({center:[564,25,c],size:[5,13,27],color:6849404}),n.addBox({center:[592,26,847.8],size:[16,10,1.8],color:12624721});for(const u of[823,845])Mt(e,[568,19,u],[523,12,u-(u<c?5:-5)],4,7426361,4);for(const u of[824,844])Mt(t,[573,16,u],[568,3,u],3,5857629,3);const l=610,d=12,h=10;for(let u=0;u<8;u+=1){const f=u/8*Math.PI*2;t.addBox({center:[l+Math.cos(f)*h,d+Math.sin(f)*h,c],size:[8.5,3.8,5],rotation:[0,0,f+Math.PI/2],color:u===1?7708822:5199700})}t.addBox({center:[l,d,c],size:[7,7,8],color:7693128})}function w_(n,e,t,i,r,s,a){const o=n.components+e.components+t.components+i.components+r.components+s.components+a.components,c=M_(n,e,t),l=S_(i,e,t,r),d=b_(n,e,t);E_(n,e,t,s,a);const u=n.components+e.components+t.components+i.components+r.components+s.components+a.components-o;return{addedComponents:u,addedTriangles:u*12,repairPanelCount:c,roofDamageFillRatio:5/18,gardenBedCount:l,laundryClothCount:d,dangerRedOrangeUsed:!1,gardenBounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}}function An(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i=new _t({name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1}),r=new ze(t,i);return r.name=e.name,r.castShadow=e.castShadow??!1,r.receiveShadow=e.receiveShadow??!1,r}function T_(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof ze))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:s.geometry.index.count/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function A_(){const n=new et,e=new et,t=new et,i=new et,r=new et,s=new et,a=new et,o=new et,c=new et,l=new et,d=new et,h=new nt;h.name="start-town-art-slice",f_(n),p_(e),m_(t,i,r,s,a,o,c,l,d),g_(t,i,r,s,a,o,c,l,d),x_(t,s,a,c,d),v_(s,a,i,o),y_(a,t,l,h),__(c);const u=w_(i,s,a,e,c,l,d),f=new nt;f.name="start-town-ground";const g=[An(n,{name:"start-town-road-ribbons",roughness:.98,receiveShadow:!0}),An(e,{name:"start-town-ground-microdetail",roughness:1,receiveShadow:!0}),An(t,{name:"start-town-masonry",roughness:.94,castShadow:!0,receiveShadow:!0}),An(i,{name:"start-town-wall-panels",roughness:.98,castShadow:!0,receiveShadow:!0}),An(r,{name:"start-town-broken-roofs",roughness:.88,castShadow:!0,receiveShadow:!0}),An(s,{name:"start-town-timber-props",roughness:.9,castShadow:!0,receiveShadow:!0}),An(a,{name:"start-town-metal-props",roughness:.64,metalness:.42,castShadow:!0,receiveShadow:!0}),An(o,{name:"start-town-rubble",roughness:1,castShadow:!0,receiveShadow:!0}),An(c,{name:"start-town-foliage",roughness:.96,receiveShadow:!0}),An(l,{name:"start-town-warm-glass",roughness:.34,metalness:.05,emissive:9062943,emissiveIntensity:.72}),An(d,{name:"start-town-cool-glass-and-water",roughness:.3,metalness:.08,emissive:1526859,emissiveIntensity:.58})];f.add(g[0],g[1]),h.add(f,...g.slice(2));const x=T_(h);h.userData.metrics=x,h.userData.lifePass=u,h.userData.replacedTerrainIds=[...Vu],h.userData.replacedPropIds=[...Hu],h.userData.contractBoardPosition={x:Et.x,y:Et.y};let m=!1;return{group:h,ground:f,replacedTerrainIds:Vu,replacedPropIds:Hu,dispose(){m||(m=!0,h.removeFromParent(),h.traverse(p=>{p instanceof ze&&(p.geometry.dispose(),Array.isArray(p.material)?p.material.forEach(_=>_.dispose()):p.material.dispose())}),f.clear(),h.clear())}}}const gs="north-star-surface-v2",Af="north-star-coherent-surface-generator",Rf="2.0.0",Ni=1314084402,Cf="procedural-dev-candidate",Xu=new Map,qt={asphalt:{resolution:1024,seedOffset:173144599,repeat:[1.08,1.03],normalStrength:3.4,cues:["graded-aggregate","hairline-crack-network","utility-cut-patch","damp-drainage-seam"]},concrete:{resolution:1024,seedOffset:202031847,repeat:[1,1],normalStrength:4.8,cues:["exposed-aggregate","rain-runoff-streaks","mineral-bloom","board-formed-repair-panel"]},roof:{resolution:512,seedOffset:7343906,repeat:[1,1],normalStrength:6.4,cues:["embedded-roof-gravel","membrane-lap-seams","ponding-water-ring","maintenance-patch"]}},zo=Object.freeze({albedo:"srgb-rgba8",normal:"linear-rgba8-tangent-space",roughness:"linear-rgba8-g-channel"});function Ft(n,e,t){return Math.min(t,Math.max(e,n))}function Dn(n){return Math.round(Ft(n,0,255))}function Nt(n){return n*n*(3-2*n)}function In(n,e,t){return n+(e-n)*t}function R_(n,e,t,i=0){let r=Math.imul(n^t,374761393)^Math.imul(e^i,668265261);return r=Math.imul(r^r>>>15,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^r>>>16)>>>0}function en(n,e,t,i=0){return R_(n,e,t,i)/4294967295}function wr(n,e,t,i,r){const s=Math.floor(n/t),a=Math.floor(e/t),o=Nt((n-s*t)/t),c=Nt((e-a*t)/t),l=In(en(s,a,i,r),en(s+1,a,i,r),o),d=In(en(s,a+1,i,r),en(s+1,a+1,i,r),o);return In(l,d,c)}function os(n,e){const t=(n%e+e)%e;return Math.min(t,e-t)}function Gc(n,e,t,i,r,s,a){const o=Math.min(n-t,i-n,e-r,s-e);return Nt(Ft(o/a,0,1))}function Wc(n,e,t,i,r,s,a){if(!(n>=t&&n<=i&&e>=r&&e<=s))return 0;const c=Math.min(n-t,i-n,e-r,s-e);return 1-Nt(Ft(c/a,0,1))}function Xc(n,e,t,i,r){const s=e*4;n[s]=Dn(t),n[s+1]=Dn(i),n[s+2]=Dn(r),n[s+3]=255}function qc(n,e,t){const i=Dn(Ft(t,0,1)*255),r=e*4;n[r]=i,n[r+1]=i,n[r+2]=i,n[r+3]=255}function C_(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Nt(r/t),a=i*e+r,o=i*e+(e-1-r),c=n[a]??0,l=n[o]??0,d=(c+l)*.5;n[a]=In(c,d,s),n[o]=In(l,d,s)}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Nt(r/t),a=r*e+i,o=(e-1-r)*e+i,c=n[a]??0,l=n[o]??0,d=(c+l)*.5;n[a]=In(c,d,s),n[o]=In(l,d,s)}}function Oo(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Nt(r/t),a=(i*e+r)*4,o=(i*e+(e-1-r))*4;for(let c=0;c<3;c+=1){const l=n[a+c]??0,d=n[o+c]??0,h=(l+d)*.5;n[a+c]=Dn(In(l,h,s)),n[o+c]=Dn(In(d,h,s))}}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Nt(r/t),a=(r*e+i)*4,o=((e-1-r)*e+i)*4;for(let c=0;c<3;c+=1){const l=n[a+c]??0,d=n[o+c]??0,h=(l+d)*.5;n[a+c]=Dn(In(l,h,s)),n[o+c]=Dn(In(d,h,s))}}}function Yc(n,e,t,i,r){C_(t,i),Oo(n,i),Oo(e,i);const s=P_(t,i,r);return Oo(s,i),{albedo:n,normal:s,roughness:e}}function P_(n,e,t){const i=new Uint8Array(e*e*4);for(let r=0;r<e;r+=1){const s=r===0?e-1:r-1,a=r===e-1?0:r+1;for(let o=0;o<e;o+=1){const c=o===0?e-1:o-1,l=o===e-1?0:o+1,d=r*e+o,h=n[r*e+c]??0,u=n[r*e+l]??0,f=n[s*e+o]??0,g=n[a*e+o]??0,x=(h-u)*t,m=(f-g)*t,p=1/Math.sqrt(x*x+m*m+1),_=d*4;i[_]=Dn((x*p*.5+.5)*255),i[_+1]=Dn((m*p*.5+.5)*255),i[_+2]=Dn(p*255),i[_+3]=255}}return i}function L_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=wr(l,o,76,e,11),f=wr(l,o,19,e,29),g=en(l,o,e,47),x=5,m=Math.floor(l/x),p=Math.floor(o/x),_=l%x/x,S=o%x/x,y=.2+en(m,p,e,59)*.6,w=.2+en(m,p,e,61)*.6,b=Math.hypot(_-y,S-w),v=(en(m,p,e,67)>.64?1:0)*Ft((.2-b)/.085,0,1),E=g>.991?1:0,R=g<.011?1:0,P=os(l+o*.21,211),L=1-Nt(Ft(P/2.2,0,1)),F=n*.59+Math.sin(o*.012)*23+Math.sin(o*.041)*4,B=1-Nt(Ft(Math.abs(l-F)/1.55,0,1)),z=F-(o-n*.42)*.43,k=(c>.42&&c<.67?1:0)*(1-Nt(Ft(Math.abs(l-z)/1.3,0,1))),Z=Math.max(B,k),J=Gc(h,c,.13,.37,.61,.82,.012),ne=Wc(h,c,.13,.37,.61,.82,.006),ae=n*.72+Math.sin(l*.018)*n*.011,le=Math.abs(o-ae),Ve=1-Nt(Ft(le/18,0,1)),je=69+u*20+f*9+(g-.5)*8,Be=v*(g>.5?12:-7)+E*8-R*7,K=J*(7+f*8)-ne*17,ie=Ve*21,ee=Z*32+L*13;Xc(r,d,je-5+Be+K-ie-ee,je+1+Be+K-ie*.84-ee,je+4+Be+K-ie*.67-ee);const Ee=.78+v*.07+Z*.1+L*.05-Ve*.36-J*.06+(f-.5)*.04;qc(s,d,Ee),a[d]=(u-.5)*.18+(f-.5)*.11+(g-.5)*.035+v*.075+J*.035-ne*.1-L*.13-Z*.24}}return Yc(r,s,a,n,t)}function D_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=wr(l,o,83,e,71),f=wr(l,o,27,e,83),g=en(l,o,e,97),x=8,m=Math.floor(l/x),p=Math.floor(o/x),_=l%x/x,S=o%x/x,y=.18+en(m,p,e,101)*.64,w=.18+en(m,p,e,103)*.64,b=Math.hypot(_-y,S-w),A=Ft((.21-b)/.085,0,1),v=Math.max(1-Nt(Ft(os(l+23,263)/1.7,0,1)),1-Nt(Ft(os(o+37,197)/1.5,0,1))),E=Math.floor(l/17),R=en(E,0,e,107)>.57?1:0,P=(.18+en(E,1,e,109)*.64)*17,L=Math.abs(l%17-P),F=R*(1-Nt(Ft(L/3.4,0,1)))*(.25+c*.75)*(.72+f*.28),B=(h-.72)/.23,z=(c-.63)/.18,W=Math.sqrt(B*B+z*z),k=(1-Nt(Ft((W-.35)/.65,0,1)))*(.55+u*.45),Z=Gc(h,c,.12,.43,.24,.58,.014),J=Wc(h,c,.12,.43,.24,.58,.007),ne=n*.66+Math.sin(o*.019)*12+Math.sin(o*.053)*2.5,le=(c>.18&&c<.84?1:0)*(1-Nt(Ft(Math.abs(l-ne)/1.25,0,1))),Ve=145+u*18+(f-.5)*10,je=A*(g>.48?18:-12),Be=Z*(8+f*5)-J*20;Xc(r,d,Ve+4+je+k*24+Be-F*32-le*35,Ve+8+je+k*27+Be-F*23-le*35,Ve+5+je+k*19+Be-F*18-le*32);const K=.76+A*.13+v*.08+k*.11+le*.1-Z*.09-F*.12+(f-.5)*.05;qc(s,d,K),a[d]=(u-.5)*.13+(f-.5)*.08+(g-.5)*.025+A*.16+k*.025+Z*.04-J*.12-v*.1-le*.23}}return Yc(r,s,a,n,t)}function I_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=wr(l,o,53,e,127),f=wr(l,o,13,e,131),g=en(l,o,e,137),x=6,m=Math.floor(l/x),p=Math.floor(o/x),_=l%x/x,S=o%x/x,y=.16+en(m,p,e,139)*.68,w=.16+en(m,p,e,149)*.68,b=Math.hypot(_-y,S-w),A=Ft((.27-b)/.11,0,1),v=Math.max(1-Nt(Ft(os(l+19,127)/2.1,0,1)),1-Nt(Ft(os(o+41,173)/1.8,0,1))),E=(h-.68)/.25,R=(c-.39)/.17,P=Math.sqrt(E*E+R*R),L=1-Nt(Ft((P-.62)/.24,0,1)),F=1-Nt(Ft(Math.abs(P-.92)/.065,0,1)),B=Gc(h,c,.1,.34,.67,.84,.018),z=Wc(h,c,.1,.34,.67,.84,.01),W=111+u*17+(f-.5)*9,k=A*(g>.48?25:-13),Z=B*10-z*18;Xc(r,d,W+8+k+Z-L*27-F*13-v*10,W+11+k+Z-L*18-F*8-v*9,W+9+k+Z-L*11-F*2-v*7);const J=.72+A*.18+v*.08+F*.08-L*.42-B*.08+(f-.5)*.05;qc(s,d,J),a[d]=(u-.5)*.13+(f-.5)*.07+(g-.5)*.025+A*.22+B*.04-z*.12-v*.09-L*.055+F*.035}}return Yc(r,s,a,n,t)}function Fo(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e=Math.imul(e^(n[t]??0),16777619);return`fnv1a32:${(e>>>0).toString(16).padStart(8,"0")}`}function Bo(n,e,t,i,r,s,a){const o=new us(s,t,t,mn,sn);return o.name=`north-star-${n}-${e}`,o.colorSpace=e==="albedo"?Zt:ni,o.wrapS=Un,o.wrapT=Un,o.repeat.set(r[0],r[1]),o.anisotropy=8,o.magFilter=zt,o.minFilter=si,o.generateMipmaps=!0,o.unpackAlignment=1,o.needsUpdate=!0,o.userData={profile:gs,generator:Af,version:Rf,seed:i,baseSeed:Ni,surface:n,channel:e,resolution:t,contentDigest:a,deterministic:!0,source:Cf},o}function N_(n,e){const t=(Ni^e.seedOffset)>>>0;switch(n){case"asphalt":return L_(e.resolution,t,e.normalStrength);case"concrete":return D_(e.resolution,t,e.normalStrength);case"roof":return I_(e.resolution,t,e.normalStrength)}}function ko(n,e){const t=(Ni^e.seedOffset)>>>0;let i=Xu.get(n);if(i===void 0){const a=N_(n,e),o=Object.freeze({albedo:Fo(a.albedo),normal:Fo(a.normal),roughness:Fo(a.roughness)});i={buffers:a,digests:o},Xu.set(n,i)}const{buffers:r,digests:s}=i;return Object.freeze({albedoMap:Bo(n,"albedo",e.resolution,t,e.repeat,r.albedo,s.albedo),normalMap:Bo(n,"normal",e.resolution,t,e.repeat,r.normal,s.normal),roughnessMap:Bo(n,"roughness",e.resolution,t,e.repeat,r.roughness,s.roughness),resolution:e.resolution,digests:s})}function Pf(){const n=ko("asphalt",qt.asphalt),e=ko("concrete",qt.concrete),t=ko("roof",qt.roof),i=Object.freeze({profile:gs,generator:Af,version:Rf,seed:Ni,deterministic:!0,source:Cf,surfaces:Object.freeze({asphalt:Object.freeze({resolution:n.resolution,seed:(Ni^qt.asphalt.seedOffset)>>>0,repeat:[qt.asphalt.repeat[0],qt.asphalt.repeat[1]],normalStrength:qt.asphalt.normalStrength,channelEncoding:zo,digests:n.digests,cues:qt.asphalt.cues}),concrete:Object.freeze({resolution:e.resolution,seed:(Ni^qt.concrete.seedOffset)>>>0,repeat:[qt.concrete.repeat[0],qt.concrete.repeat[1]],normalStrength:qt.concrete.normalStrength,channelEncoding:zo,digests:e.digests,cues:qt.concrete.cues}),roof:Object.freeze({resolution:t.resolution,seed:(Ni^qt.roof.seedOffset)>>>0,repeat:[qt.roof.repeat[0],qt.roof.repeat[1]],normalStrength:qt.roof.normalStrength,channelEncoding:zo,digests:t.digests,cues:qt.roof.cues})})}),r=[n.albedoMap,n.normalMap,n.roughnessMap,e.albedoMap,e.normalMap,e.roughnessMap,t.albedoMap,t.normalMap,t.roughnessMap];let s=!1;return{asphalt:n,concrete:e,roof:t,provenance:i,dispose(){s||(s=!0,r.forEach(a=>a.dispose()))}}}const qu=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),Yu=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),U_=["crosswalk-and-lane-markings","tactile-paving-and-expansion-joints","mixed-use-apartment-balconies","ground-floor-shop-canopy","elevated-rail-platform-fragment","utility-pipes-and-drainage","public-information-kiosk"],z_=[{id:"north-facade-runoff",cause:"broken gutters feed the shaded apartment wall",bounds:{minimumX:130,maximumX:380,minimumZ:700,maximumZ:756}},{id:"utility-basin-seep",cause:"a cracked rain cistern keeps the old utility apron wet",bounds:{minimumX:320,maximumX:402,minimumZ:790,maximumZ:872}},{id:"south-drain-garden",cause:"road runoff is diverted into repaired food-growing beds",bounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}],O_=["rain-capture-and-filter","patched-solar-panels","kitchen-garden","working-amber-lights","laundry-line","repaired-public-kiosk"];function ki(n,e,t=0){return(Math.imul(Math.trunc(n)+81,73856093)^Math.imul(Math.trunc(e)+167,19349663)^Math.imul(Math.trunc(t)+265,83492791))>>>0}function tt(n,e=0){return(n>>>e&1023)/1023}function F_(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function pr(n,e,t,i,r,s){const a=t[0]-e[0],o=t[1]-e[1],c=Math.hypot(a,o);n.addBox({center:[(e[0]+t[0])/2,i,(e[1]+t[1])/2],size:[c,.42,r],rotation:[0,-Math.atan2(o,a),0],color:s})}function B_(n){const e=new Pr(860,760,48,40);e.name="north-star-city-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.62,900),e.userData.componentCount=1;const t=new _t({name:"north-star-city-asphalt-material",color:16777215,map:n.albedoMap,normalMap:n.normalMap,normalScale:new Se(.42,.42),roughnessMap:n.roughnessMap,roughness:1,metalness:.04,flatShading:!1});t.userData.surfaceProfile=gs,t.userData.surfaceKind="asphalt";const i=new ze(e,t);return i.name="north-star-city-asphalt",i.receiveShadow=!0,i}function $s(n){const[e,t,i]=n.size,r=new on(e,t,i);r.name=`${n.name}-geometry`;const s=r.getAttribute("uv"),a=r.getAttribute("normal"),[o,c]=n.uvOffset??[0,0];for(let h=0;h<s.count;h+=1){const u=a.getX(h),f=a.getY(h),g=a.getZ(h);let x,m,p,_;Math.abs(u)>.5?(x=i,m=t,[p,_]=u>0?[.19,.31]:[.61,.07]):Math.abs(f)>.5?(x=e,m=i,[p,_]=f>0?[.29,.43]:[.73,.17]):(x=e,m=t,[p,_]=g>0?[0,0]:[.47,.59]);const S=Math.max(x,m);s.setXY(h,s.getX(h)*(x/S)+o+p,s.getY(h)*(m/S)+c+_)}s.needsUpdate=!0,r.translate(...n.center),r.userData.componentCount=1;const l=new _t({name:`${n.name}-material`,color:16777215,map:n.surface.albedoMap,normalMap:n.surface.normalMap,normalScale:new Se(n.normalScale,n.normalScale),roughnessMap:n.surface.roughnessMap,roughness:1,metalness:n.surfaceKind==="roof"?.05:0,flatShading:!1});l.userData.surfaceProfile=gs,l.userData.surfaceKind=n.surfaceKind;const d=new ze(r,l);return d.name=n.name,d.castShadow=n.castShadow??!0,d.receiveShadow=n.receiveShadow??!0,d}function k_(n){return[$s({name:"north-star-city-north-apartment-shell",center:[255,78,645],size:[244,152,140],surface:n.concrete,surfaceKind:"concrete",normalScale:.34,uvOffset:[.07,.12]}),$s({name:"north-star-city-north-apartment-roof",center:[268,161,646],size:[210,18,136],surface:n.roof,surfaceKind:"roof",normalScale:.46,uvOffset:[.03,.06]}),$s({name:"north-star-city-south-clinic-shell",center:[265,57,1155],size:[224,110,126],surface:n.concrete,surfaceKind:"concrete",normalScale:.31,uvOffset:[.41,.23]}),$s({name:"north-star-city-south-clinic-roof",center:[265,116,1155],size:[232,10,132],surface:n.roof,surfaceKind:"roof",normalScale:.43,uvOffset:[.36,.47]})]}function V_(n,e,t){n.addBox({center:[430,2.5,778],size:[820,4,76],color:10266788}),n.addBox({center:[430,2.5,1030],size:[820,4,72],color:10989220}),n.addBox({center:[72,2.1,900],size:[66,3.2,330],color:9608344}),n.addBox({center:[430,3.2,816],size:[820,5.2,7],color:12895671}),n.addBox({center:[430,3.2,994],size:[820,5.2,7],color:13027257});for(let r=104;r<=760;r+=64)t.addBox({center:[r,4.56,778],size:[1.1,.24,67],color:r%128===40?8160897:8884620}),t.addBox({center:[r+27,4.56,1030],size:[1,.24,63],color:r%192===40?8489862:9279120});for(let r=112;r<=752;r+=22)r>390&&r<520||(e.addBox({center:[r,4.7,796],size:[13.5,.28,5.5],color:r%44===24?12691798:12166744}),e.addBox({center:[r+9,4.7,1012],size:[13.5,.28,5.5],color:r%66===46?12034394:12626785}));for(let r=95;r<=795;r+=78)e.addBox({center:[r,1.35,904],size:[42,.65,4.6],color:r%156===17?13154147:14078902});for(let r=560;r<=656;r+=16)for(let s=0;s<3;s+=1)e.addBox({center:[r,1.42,853+s*51],size:[8.5,.7,38],color:(r/16+s)%3===0?11844785:12699064});e.addBox({center:[542,1.4,904],size:[4.5,.65,140],color:12567477}),e.addBox({center:[674,1.4,904],size:[4.5,.65,140],color:12567477}),[[[115,876],[168,865],[205,881],[249,872]],[[301,955],[337,943],[358,922],[390,914]],[[421,853],[444,869],[467,866],[490,883]],[[706,947],[739,931],[779,936],[811,920]],[[180,1010],[205,1001],[232,1008]]].forEach((r,s)=>{for(let a=0;a<r.length-1;a+=1){const o=r[a],c=r[a+1];o!==void 0&&c!==void 0&&pr(t,o,c,1.3,s%2===0?2.4:1.7,4148555)}});for(let r=0;r<44;r+=1){const s=ki(r,314,27),a=92+tt(s)*720,o=828+tt(s,10)*150;t.addBox({center:[a,1.42,o],size:[2.2+tt(s,20)*7,.55,1.3+tt(s,5)*3.5],rotation:[0,tt(s,15)*Math.PI,0],color:r%5===0?10328709:5924964})}}function H_(n,e,t,i,r,s){n.addBox({center:[141,118,647],size:[18,82,136],color:12630438});for(let a=0;a<4;a+=1){const o=45+a*31;for(let c=0;c<5;c+=1){const l=168+c*43;e.addBox({center:[l,o,716.15],size:[39,27,2.2],color:(a+c)%3===0?13157811:11185837}),t.addBox({center:[l,o+2,717.6],size:[24,14.5,1.5],color:(a+c)%4===0?9419715:6064531}),e.addBox({center:[l,o-7.2,718.2],size:[27.5,2.2,2.5],color:14143672})}}for(let a=0;a<3;a+=1){const o=60+a*31;n.addBox({center:[255,o,727],size:[222,4.2,22],color:10922658}),i.addBox({center:[255,o+11,736.7],size:[222,2.1,2.1],color:6913147});for(let c=0;c<=22;c+=1)i.addBox({center:[145+c*10,o+6.3,736.7],size:[1.45,11,1.45],color:c%5===0?9148822:6649461})}t.addBox({center:[215,20,717.8],size:[72,30,2],color:5209991}),e.addBox({center:[302,20,717.7],size:[84,30,2.2],color:8227206});for(let a=0;a<9;a+=1)i.addBox({center:[264+a*10,20,719],size:[1.2,29,1.3],color:10922658});r.addBox({center:[248,38,730],size:[194,5.5,28],rotation:[-.08,0,0],color:6268576}),r.addBox({center:[176,43,746],size:[42,20,3],color:14730859}),r.addBox({center:[176,43,748],size:[31,3,1.1],color:4353130});for(const a of[153,244,352])i.addBox({center:[a,85,739],size:[3.4,134,3.4],color:7240824});for(let a=0;a<5;a+=1)i.addBox({center:[164+a*44,75+a%2*31,741],size:[18,12,7],color:10200223}),i.addBox({center:[164+a*44,75+a%2*31,745],size:[11,6,1],color:6649715});Vi(s,141,708,42,32,38,401),Vi(s,354,718,30,24,31,409),Xl(s,151,717.5,32,136,14,421),Xl(s,350,717.7,54,126,18,427)}function G_(n,e,t,i,r){n.addBox({center:[265,61,1219.2],size:[215,100,2.5],color:12828073});for(let s=0;s<11;s+=1)n.addBox({center:[166+s*20,53+s%2*2,1220.8],size:[17,5.5,1.2],color:s%3===0?7315347:9088931});for(let s=0;s<4;s+=1){const a=178+s*58;e.addBox({center:[a,79,1220.7],size:[31,23,2],color:s===2?9682881:6589588}),t.addBox({center:[a,79,1222.1],size:[34,2,2.5],color:7241596})}e.addBox({center:[216,29,1220.9],size:[92,42,2],color:5406598}),t.addBox({center:[310,28,1221.2],size:[67,42,2.4],color:8687757});for(let s=0;s<7;s+=1)t.addBox({center:[281+s*10,28,1222.7],size:[1.2,40,1.1],color:11580072});i.addBox({center:[260,50,1225],size:[212,5,16],rotation:[-.1,0,0],color:13606754}),i.addBox({center:[343,63,1222.7],size:[36,28,3.2],color:6266016}),i.addBox({center:[343,63,1224.7],size:[24,3,1],color:13885384});for(let s=0;s<5;s+=1)t.addBox({center:[174+s*42,7,1223.1],size:[30,10,1.5],color:s%2===0?10118477:8222309});for(let s=0;s<7;s+=1){const a=ki(s,571,33);t.addBox({center:[179+s*28,124,1122+s%2*33],size:[23,2.5,27],rotation:[.1,(tt(a)-.5)*.08,0],color:s%3===0?4287862:5602691}),t.addBox({center:[179+s*28,122.2,1122+s%2*33],size:[2,6,31],color:6715249})}Vi(r,163,1207,28,12,29,577),Vi(r,362,1202,30,15,34,581)}function W_(n,e,t,i,r){n.addBox({center:[480,171,625],size:[470,17,58],color:9213586}),n.addBox({center:[468,159,625],size:[446,9,38],color:6912374});for(const s of[608,642]){e.addBox({center:[474,183,s],size:[454,3,3.4],color:7702406});for(let a=275;a<=689;a+=23)n.addBox({center:[a,180.2,s],size:[5,2.3,48],color:7832704})}t.addBox({center:[342,91,648],size:[25,158,36],color:9608088}),t.addBox({center:[418,91,737],size:[24,148,32],color:9147792,rotation:[.55,0,0]}),i.addBox({center:[490,201,623],size:[282,4,83],rotation:[0,0,-.03],color:8960181});for(let s=363;s<=620;s+=43)e.addBox({center:[s,190,625],size:[3.2,24,71],color:6387572});n.addBox({center:[706,170,625],size:[13,15,58],color:7305074,rotation:[0,0,.17]});for(let s=0;s<9;s+=1)e.addBox({center:[716+s*3.4,170+s%3*3,606+s%2*34],size:[18,1.3,1.3],rotation:[0,s%2*.1,(s-4)*.035],color:9139037});Vi(r,341,681,24,28,38,607),Xl(r,418,734,38,126,12,613)}function X_(n,e,t,i,r){n.addBox({center:[361,8,831],size:[80,14,80],color:8884622}),F_(i,[327,395,797,865],15.4,6927793);for(const s of[328,394])n.addBox({center:[s,18,831],size:[7,22,79],color:11580330});for(const s of[798,864])n.addBox({center:[361,18,s],size:[79,22,7],color:11580330});e.addBox({center:[420,42,739],size:[45,70,36],color:7248275}),e.addBox({center:[420,78,739],size:[49,4,40],color:10138536}),t.addBox({center:[420,49,720.5],size:[24,13,2],color:9224381}),e.addBox({center:[398,56,759],size:[4,45,4],color:7043444}),pr(e,[398,759],[376,792],35,4,7043444);for(let s=0;s<18;s+=1){const a=ki(s,641,17),o=tt(a)*Math.PI*2,c=30+tt(a,10)*16;r.addBox({center:[361+Math.cos(o)*c,17+tt(a,20)*5,831+Math.sin(o)*c],size:[3+tt(a,5)*4,8+tt(a,15)*8,3+tt(a,7)*4],rotation:[.1,o,(tt(a,12)-.5)*.35],color:s%4===0?8826456:5016923})}}function q_(n,e,t,i){const r=Et.x,s=Et.y;for(const a of[r-35,r+35])n.addBox({center:[a,34,s],size:[5,66,5],color:6715510});e.addBox({center:[r,57,s],size:[84,45,7],color:5336173}),t.addBox({center:[r,58,s+4],size:[73,34,2],color:7645608}),e.addBox({center:[r,57,s+5.3],size:[58,2.2,1],color:14276540}),e.addBox({center:[r-16,49,s+5.4],size:[25,2,1],color:13026734}),e.addBox({center:[r+18,65,s+5.4],size:[20,2,1],color:13026734}),i.addBox({center:[r,78,s+1],size:[45,4,5],color:16764790}),n.addBox({center:[r-24,42,s+5.6],size:[13,10,1.4],color:13936728})}function Y_(n,e,t,i){for(const r of[760,1040])n.addBox({center:[470,34,r],size:[4,63,4],color:5860714}),n.addBox({center:[470,67,r],size:[20,5,9],rotation:[0,0,-.12],color:7770251}),i.addBox({center:[476,65,r+.5],size:[9,3.5,7],color:16765309});for(let r=0;r<4;r+=1){const s=1120+r*22;e.addBox({center:[442.5,5,s],size:[70,8,14],color:8481357});for(let a=0;a<7;a+=1){const o=ki(r,a,701);t.addBox({center:[413+a*9.7,12+tt(o)*3,s],size:[5+tt(o,10)*3,12+tt(o,20)*6,5+tt(o,5)*3],rotation:[0,tt(o,15)*Math.PI,(tt(o,8)-.5)*.3],color:a%3===0?9352535:5216087})}}pr(e,[403,1100],[481,1100],3.4,5,7507079),pr(e,[403,1100],[403,1195],3.4,5,7507079),pr(n,[170,1222],[350,1222],91,1.5,7175287);for(let r=0;r<6;r+=1)e.addBox({center:[188+r*28,82-r%2*3,1224],size:[18,17+r%3*4,1.2],rotation:[0,0,(r%2===0?-1:1)*.045],color:[14993007,7317410,14274738][r%3]??14274738});for(let r=0;r<14;r+=1){const s=ki(r,719,41);t.addBox({center:[412+tt(s)*60,20+tt(s,10)*5,1116+tt(s,20)*76],size:[3.2,5.5,3.2],rotation:[0,tt(s,6)*Math.PI,0],color:[14857822,12152696,7911854][r%3]??14857822})}n.addBox({center:[568,31,814],size:[82,58,38],color:6454393}),e.addBox({center:[568,35,833.6],size:[68,39,2],color:9415072});for(let r=0;r<8;r+=1)n.addBox({center:[540+r*8,34,835.2],size:[2.1,30,2.2],color:r%3===0?10250318:5466470});i.addBox({center:[593,47,835.6],size:[8,4,1.5],color:16762988}),e.addBox({center:[527,10,791],size:[30,18,24],color:10122837}),pr(n,[526,801],[542,833],7,3.2,5203555);for(let r=0;r<4;r+=1)e.addBox({center:[397+r*14,9+r%2*9,1204],size:[13,17,16],color:r%2===0?11570523:7441798})}function Vi(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const c=ki(o,a,19),l=e+(tt(c)*2-1)*i,d=t+(tt(c,10)*2-1)*r,h=7+tt(c,20)*17;n.addBox({center:[l,h/2+2.2,d],size:[3.5+tt(c,5)*6,h,3.5+tt(c,15)*6],rotation:[.08,tt(c,8)*Math.PI,(tt(c,17)-.5)*.42],color:[4162388,6068308,7907671,5011024][o%4]??5011024})}}function Xl(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const c=ki(o,a,23),l=e+(tt(c)-.5)*i,d=8+tt(c,10)*r;n.addBox({center:[l,d,t],size:[3+tt(c,20)*5,9+tt(c,6)*13,2.8],rotation:[0,0,(tt(c,16)-.5)*.55],color:o%3===0?8628566:4685136})}}function vn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1},r=e.physical?new Er({...i,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new _t(i),s=new ze(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function Z_(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof ze))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:(s.geometry.index?.count??0)/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function K_(){const n=new et,e=new et,t=new et,i=new et,r=new et,s=new et,a=new et,o=new et,c=new et,l=new et,d=new et,h=new et,u=new nt;u.name="north-star-city-art-slice",V_(n,e,h),H_(t,i,r,s,o,c),G_(i,r,s,o,c),W_(a,s,t,r,c),X_(t,s,r,d,c),q_(s,o,r,l),Y_(s,o,c,l),Vi(c,96,822,38,52,44,733),Vi(c,775,1015,48,38,38,739);const f=Pf(),g=B_(f.asphalt),x=k_(f),m=[vn(n,{name:"north-star-city-curbs-and-sidewalks",roughness:.9,receiveShadow:!0}),vn(e,{name:"north-star-city-road-markings",roughness:.78,receiveShadow:!0}),vn(t,{name:"north-star-city-structural-concrete",roughness:.82,castShadow:!0,receiveShadow:!0}),vn(i,{name:"north-star-city-layered-facades",roughness:.72,castShadow:!0,receiveShadow:!0}),vn(r,{name:"north-star-city-glass",roughness:.2,metalness:.08,transparent:!0,opacity:.82,physical:!0,clearcoat:.48,clearcoatRoughness:.16}),vn(s,{name:"north-star-city-metal-infrastructure",roughness:.47,metalness:.58,castShadow:!0,receiveShadow:!0}),vn(a,{name:"north-star-city-elevated-station",roughness:.68,metalness:.28,castShadow:!0,receiveShadow:!0}),vn(o,{name:"north-star-city-signs-and-life",roughness:.61,castShadow:!0,receiveShadow:!0}),vn(c,{name:"north-star-city-causal-foliage",roughness:.86,castShadow:!0,receiveShadow:!0}),vn(l,{name:"north-star-city-working-lights",roughness:.24,emissive:10114079,emissiveIntensity:1.35,physical:!0,clearcoat:.35,clearcoatRoughness:.18}),vn(d,{name:"north-star-city-shallow-water",roughness:.13,metalness:.04,transparent:!0,opacity:.78,physical:!0,clearcoat:.86,clearcoatRoughness:.08,receiveShadow:!0}),vn(h,{name:"north-star-city-cracks-and-aggregate",roughness:.96,receiveShadow:!0})],p=new nt;p.name="north-star-city-ground",p.add(g,m[0],m[1],m[10],m[11]),u.add(p,...x,...m.slice(2,10));const _=new nt;_.name="north-star-contract-kiosk-anchor",_.position.set(Et.x,0,Et.y),_.userData.interactionPoint={x:Et.x,y:Et.y},u.add(_);const S=Z_(u);u.userData.environmentKind="overgrown-modern-city",u.userData.oldUseSignals=[...U_],u.userData.causalGrowthZones=z_.map(w=>({...w,bounds:{...w.bounds}})),u.userData.lifeSignals=[...O_],u.userData.surfaceProfile=f.provenance.profile,u.userData.surfaceProvenance=f.provenance,u.userData.metrics=S,u.userData.replacedTerrainIds=[...qu],u.userData.replacedPropIds=[...Yu],u.userData.contractBoardPosition={x:Et.x,y:Et.y},u.userData.spawnPosition={x:430,y:900},u.userData.playerCorridor={centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70},u.userData.nonBlockingOverheadBounds={minimumX:245,maximumX:715,minimumZ:596,maximumZ:654,minimumY:150};let y=!1;return{group:u,ground:p,replacedTerrainIds:qu,replacedPropIds:Yu,dispose(){y||(y=!0,u.removeFromParent(),u.traverse(w=>{w instanceof ze&&(w.geometry.dispose(),Array.isArray(w.material)?w.material.forEach(b=>b.dispose()):w.material.dispose())}),f.dispose(),p.clear(),u.clear())}}}const j_="1.0.0",J_="concept-c-beauty-cell-r02",Q_=1128416002,Cn=Object.freeze({schemaVersion:j_,stableId:J_,seed:Q_,deterministic:!0,environmentKind:"optimistic-reclaimed-modern-city",worldBounds:Object.freeze({minimumX:-70,maximumX:930,minimumZ:470,maximumZ:1320}),spawn:Object.freeze({x:430,z:900}),clearPlayerCorridor:Object.freeze({centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70}),composition:Object.freeze({cameraIntent:"fixed-diagonal-hd2d",foreground:Object.freeze(["leaf-framed-lower-edge","rain-dark-stair-threshold","bright-maintained-planters"]),middleGround:Object.freeze(["playable-wet-intersection","human-scale-transit-shelter","field-workbench-and-contract-kiosk"]),background:Object.freeze(["water-reclaim-basin","broken-concrete-city-frame","physically-present-anomaly"]),focalHierarchy:Object.freeze(["player-and-companion","sunlit-crosswalk","working-amber-technology","distant-cyan-anomaly"])}),materialGrammar:Object.freeze({wetAsphalt:Object.freeze(["fine-aggregate-normal","irregular-puddle-clearcoat","worn-paint-not-clean-stripes"]),reclaimedConcrete:Object.freeze(["mineral-bloom","repair-seams","runoff-fed-moss"]),vegetation:Object.freeze(["highest-density-at-water-and-drains","low-density-in-maintained-route","warm-flower-accents-near-human-work"]),technology:Object.freeze(["dark-ceramic-and-brushed-metal","cyan-data-light","amber-life-light"])}),modules:Object.freeze([Object.freeze({stableId:"cbc-route-reclaimed-intersection",role:"route",anchor:Object.freeze({x:430,y:.7,z:900}),bounds:Object.freeze({minimumX:40,maximumX:860,minimumZ:570,maximumZ:1250}),authoredCues:Object.freeze(["offset-crosswalk","tactile-paving","drainage-cuts","wet-wheel-tracks"]),causalRule:"Active foot traffic keeps the east route open while failed drains retain shallow rainwater.",gameplayPromise:"A readable combat lane with occluding detail kept outside the player corridor."}),Object.freeze({stableId:"cbc-threshold-rain-stairs",role:"threshold",anchor:Object.freeze({x:250,y:1,z:1035}),bounds:Object.freeze({minimumX:145,maximumX:340,minimumZ:960,maximumZ:1160}),authoredCues:Object.freeze(["broad-lower-left-stairs","broken-retaining-wall","mossed-handrail"]),causalRule:"A retaining wall diverts runoff down the stairs, darkening the treads and feeding edge moss.",gameplayPromise:"A strong foreground threshold and future vertical-route affordance."}),Object.freeze({stableId:"cbc-shelter-transit-04",role:"shelter",anchor:Object.freeze({x:294,y:1,z:718}),bounds:Object.freeze({minimumX:205,maximumX:380,minimumZ:650,maximumZ:780}),authoredCues:Object.freeze(["laminated-glass-panels","patched-solar-roof","working-route-display"]),causalRule:"The roof still catches rain and solar power, so survivors maintain the light and water filter beneath it.",gameplayPromise:"A safe readable waypoint that later supports rest, rumor, and companion meetings."}),Object.freeze({stableId:"cbc-water-spillway",role:"water",anchor:Object.freeze({x:132,y:.4,z:700}),bounds:Object.freeze({minimumX:-45,maximumX:245,minimumZ:555,maximumZ:815}),authoredCues:Object.freeze(["shallow-clear-basin","concrete-spillway","reed-density-gradient"]),causalRule:"A cracked utility main continuously replenishes the lowest basin and determines the reed line.",gameplayPromise:"A cool reflective counterweight and a future resource/risk pocket."}),Object.freeze({stableId:"cbc-work-relic-bench",role:"work",anchor:Object.freeze({x:620,y:1,z:836}),bounds:Object.freeze({minimumX:555,maximumX:705,minimumZ:765,maximumZ:920}),authoredCues:Object.freeze(["field-tool-silhouettes","cable-spool","amber-analysis-lamp"]),causalRule:"The bench sits on a dry raised apron close to the route and draws power from salvaged transit cells.",gameplayPromise:"An obvious future interaction point for analysis, assembly, and limited-use skills."}),Object.freeze({stableId:"cbc-habitat-drain-gardens",role:"habitat",anchor:Object.freeze({x:635,y:1,z:1020}),bounds:Object.freeze({minimumX:520,maximumX:785,minimumZ:965,maximumZ:1205}),authoredCues:Object.freeze(["repaired-planter-frames","edible-leaf-grid","small-warm-flowers"]),causalRule:"Planters intercept road runoff but remain trimmed along the maintained east route.",gameplayPromise:"Visible human optimism and a later food/crafting loop without a quest marker."}),Object.freeze({stableId:"cbc-landmark-real-anomaly",role:"landmark",anchor:Object.freeze({x:575,y:50,z:565}),bounds:Object.freeze({minimumX:510,maximumX:645,minimumZ:505,maximumZ:625}),authoredCues:Object.freeze(["broken-conductor-ring","suspended-relic-shards","cyan-field-core"]),causalRule:"A fractured superconducting service ring traps an intermittent field between its surviving segments.",gameplayPromise:"A real world-space destination rather than a flat backdrop or decorative billboard."})]),generationProvenance:Object.freeze({source:"runtime-procedural-geometry",externalAssets:!1,referenceImageUsedAtRuntime:!1,generator:"beauty-cell-composition-grammar",generatorVersion:"1.0.0",laws:Object.freeze(["water-follows-low-points-and-broken-infrastructure","plant-density-follows-water-light-and-human-maintenance","repair-signals-cluster-near-safe-travel-and-dry-work-surfaces","detail-density-may-frame-but-never-obscure-the-player-corridor","technology-emission-is-limited-to-functional-data-or-life-signals"])})}),Zu=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),Ku=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),oi={concrete:[11449506,9477004,12697255,8096128],concreteDark:[6714734,5793888,7635064],roadPaint:[14210493,13093043,14801336],foliage:[2056254,3110726,5016912,7118680,9218914],foliageShadow:[1522994,2118458,3235646],rust:[9393463,11102527,7227192],flower:[16755300,16022376,14992746]};function Yn(n,e,t=0){return(Math.imul(Math.trunc(n)+99,73856093)^Math.imul(Math.trunc(e)+169,19349663)^Math.imul(Math.trunc(t)+257,83492791))>>>0}function ut(n,e=0){return(n>>>e&1023)/1023}function li(n,e){return n[e%n.length]??n[0]??16777215}function fr(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function ju(n,e,t,i,r,s){const a=t[0]-e[0],o=t[1]-e[1],c=Math.hypot(a,o);n.addBox({center:[(e[0]+t[0])/2,i,(e[1]+t[1])/2],size:[c,Math.max(.35,r*.12),r],rotation:[0,-Math.atan2(o,a),0],color:s})}function $_(n,e,t,i,r){fr(n,[25,875,555,690],1.08,6649455),fr(n,[25,875,1100,1270],1.08,6846828),fr(n,[32,155,690,1100],1.05,6255721),fr(n,[735,875,690,1100],1.05,6320489),n.addBox({center:[450,4,695],size:[850,8,12],color:8885386}),n.addBox({center:[450,4,1096],size:[850,8,12],color:8293761}),n.addBox({center:[159,4,895],size:[12,8,400],color:9740433}),n.addBox({center:[731,4,895],size:[12,8,400],color:9017739}),fr(e,[160,730,690,1100],.96,398867);for(let a=0;a<9;a+=1){const o=Yn(a,823,7),c=304+a*24,l=74+ut(o,8)*25;t.addBox({center:[c,1.52,914+a%2*2.5],size:[13+ut(o,16)*4,.65,l],rotation:[0,(ut(o,22)-.5)*.035,0],color:li(oi.roadPaint,o),shade:a===3||a===7?.42:.57})}for(let a=0;a<12;a+=1){const o=Yn(a,313,19);t.addBox({center:[190+a*12.5,1.55,972],size:[8.5,.75,13],color:a%4===0?11830590:13673543,shade:.9+ut(o,10)*.12})}const s=[[225,835,76,31,-.08],[538,775,118,24,.1],[610,1015,84,34,-.16],[370,1063,110,20,.05],[685,905,62,20,.18]];for(const[a,o,c,l,d]of s)i.addBox({center:[a,1.7,o],size:[c,.18,l],rotation:[0,d,0],color:o>950?5212802:6133392});for(let a=0;a<118;a+=1){const o=Yn(a,557,41),c=a<62,l=45+ut(o,2)*805,d=c?605+ut(o,12)*145:1045+ut(o,12)*185;r.addBox({center:[l,2.1+ut(o,21)*1.8,d],size:[3+ut(o,5)*12,1.1+ut(o,17)*2.4,3+ut(o,25)*9],rotation:[(ut(o,7)-.5)*.25,ut(o,14)*Math.PI,(ut(o,23)-.5)*.2],color:li(oi.concreteDark,o)})}}function eM(n,e,t){for(let i=0;i<11;i+=1)n.addBox({center:[245,4.5+i*2.8,1102-i*13],size:[172-i*1.8,9+i*5.6,14],color:li(oi.concrete,Yn(i,701))}),i%2===0&&t.addBox({center:[180+i%3*26,10+i*5.5,1095-i*13],size:[26,1.4,6],rotation:[0,(i-4)*.08,0],color:li(oi.foliageShadow,Yn(i,719))});n.addBox({center:[151,31,1025],size:[17,62,220],color:6913139}),n.addBox({center:[340,27,1050],size:[26,54,185],color:9476750});for(const i of[170,319])e.addBox({center:[i,45,1035],size:[3.2,74,3.2],color:4281937}),e.addBox({center:[i,78,1028],size:[3.2,3.2,165],rotation:[-.18,0,0],color:5794660})}function tM(n,e,t,i){n.addBox({center:[294,4,718],size:[182,8,106],color:10398105}),n.addBox({center:[294,7,776],size:[184,14,12],color:8227971});for(const r of[220,276,348])e.addBox({center:[r,51,704],size:[5,92,5],color:3887952});e.addBox({center:[294,92,676],size:[142,4,5],color:4217173}),e.addBox({center:[294,92,732],size:[142,4,5],color:4217173}),e.addBox({center:[225,92,704],size:[5,4,58],color:5400160}),e.addBox({center:[363,92,704],size:[5,4,58],color:5400160}),t.addBox({center:[248,53,707],size:[50,75,2.6],color:8893869}),t.addBox({center:[322,53,707],size:[70,75,2.6],color:7973539}),t.addBox({center:[210,53,733],size:[2.6,75,48],color:7578268}),e.addBox({center:[284,21,737],size:[104,8,24],color:7037522}),e.addBox({center:[371,63,700],size:[10,70,8],color:3427657}),i.addBox({center:[371,76,694],size:[7,21,1.2],color:6088396}),i.addBox({center:[371,55,694],size:[7,9,1.2],color:16757854})}function nM(n,e,t,i){n.addBox({center:[568,5,815],size:[118,10,82],color:8885386}),e.addBox({center:[585,34,823],size:[102,8,42],color:6050116});for(const a of[542,628])e.addBox({center:[a,18,823],size:[6,30,6],color:3820104});e.addBox({center:[612,53,810],size:[38,31,9],color:3032387}),t.addBox({center:[612,55,804.8],size:[30,19,1.5],color:6004633}),i.addBox({center:[612,55,803.8],size:[24,2,.7],color:6088396}),i.addBox({center:[585,43,812],size:[5,5,5],color:16757854}),ju(e,[548,845],[585,868],3.2,2.2,2505274),ju(e,[585,868],[636,850],3.2,2.2,3427145);for(let a=0;a<8;a+=1){const o=Yn(a,991);e.addBox({center:[542+a*11,42+a%2*3,818],size:[3+ut(o,4)*5,12+ut(o,16)*9,3],rotation:[0,0,(ut(o,23)-.5)*.4],color:li(oi.rust,o)})}const r=Et.x,s=Et.y;n.addBox({center:[r,4,s],size:[92,8,28],color:8951436});for(const a of[r-38,r+38])e.addBox({center:[a,36,s],size:[6,62,7],color:3361092});e.addBox({center:[r,63,s],size:[90,8,9],color:4413781}),t.addBox({center:[r,43,s-4.7],size:[72,31,2],color:3497563}),i.addBox({center:[r-15,48,s-5.9],size:[34,2.2,.7],color:6088396}),i.addBox({center:[r+26,36,s-5.9],size:[12,12,.7],color:16757854})}function iM(n,e,t,i){for(let r=0;r<5;r+=1){const s=520+r%3*86,a=1042+Math.floor(r/3)*76;n.addBox({center:[s,10,a],size:[68,20,48],color:r%2===0?9279883:7833725}),e.addBox({center:[s,20,a],size:[72,3,52],color:6054999}),n.addBox({center:[s,21.7,a],size:[59,2.2,39],color:3492411});for(let o=0;o<15;o+=1){const c=Yn(r,o,1129);Zc(t,i,s-24+o%5*12+(ut(c,4)-.5)*5,a-13+Math.floor(o/5)*13,.72+ut(c,15)*.5,c,23,o%5===0)}}}function rM(n,e,t,i,r,s){n.addBox({center:[361,5,831],size:[84,10,84],color:7900292});for(const[o,c,l,d]of[[361,791,84,6],[361,871,84,6],[321,831,6,84],[401,831,6,84]])n.addBox({center:[o,18,c],size:[l,26,d],color:6913141});t.addBox({center:[361,12.4,831],size:[70,1.2,70],color:5214602}),e.addBox({center:[361,31,831],size:[66,4,4],color:4282452}),e.addBox({center:[394,33,831],size:[4,36,58],color:3361608}),s.addBox({center:[394,48,803],size:[3,10,2],color:6088396}),n.addBox({center:[430,3,739],size:[102,6,66],color:8359301});for(const o of[386,474])e.addBox({center:[o,24,739],size:[5,42,58],color:3427401});e.addBox({center:[430,44,739],size:[92,5,60],color:5464925});for(let o=0;o<7;o+=1)e.addBox({center:[399+o*10,22+o%2*5,722],size:[5,23+o%3*5,5],rotation:[0,0,(o-3)*.035],color:li(oi.rust,Yn(o,1423))});n.addBox({center:[470,4,1041],size:[20,8,24],color:7701885}),e.addBox({center:[470,42,1041],size:[5,76,5],color:3230023}),e.addBox({center:[480,76,1041],size:[23,4,4],color:4414294}),s.addBox({center:[491,73,1041],size:[4,12,7],color:16757854}),n.addBox({center:[442.5,9,1155],size:[77,18,92],color:7438712}),n.addBox({center:[442.5,19,1155],size:[66,3,80],color:3163706});for(let o=0;o<18;o+=1){const c=Yn(o,1551,Cn.seed);Zc(i,r,416+o%6*10.5,1125+Math.floor(o/6)*29,.58+ut(c,13)*.32,c,20,o%7===0)}[[398,18,1201,24,34,26],[427,14,1201,28,27,26],[411,12,1226,32,23,22]].forEach(([o,c,l,d,h,u],f)=>{e.addBox({center:[o,c,l],size:[d,h,u],rotation:[0,(f-1)*.08,0],color:f===1?5662045:7755585}),e.addBox({center:[o,c+h*.18,l-u*.51],size:[d*.72,3,2],color:10840893})})}const sM=[["town-hall",130,570,250,150],["town-well",320,790,82,82],["south-house",150,1090,230,130],["town-board-collider",454,940,92,20],["town-hall-workyard-collider",380,707,100,64],["town-repair-bench-collider",510,777,115,76],["town-south-lamp-collider",460,1030,20,23],["town-kitchen-garden-collider",405,1110,75,90],["town-south-crates-collider",385,1186,61,53]];function aM(){const n=new nt;return n.name="beauty-cell-collider-visual-anchors",sM.forEach(([e,t,i,r,s])=>{const a=new Pt;a.name=`beauty-cell-collider-visual-${e}`,a.position.set(t+r/2,0,i+s/2),a.userData.bounds={x:t,y:i,width:r,height:s},n.add(a)}),n}function Zc(n,e,t,i,r,s,a=1.5,o=!1){const c=(12+ut(s,3)*23)*r;n.addBox({center:[t,a+c*.5,i],size:[1.2*r,c,1.2*r],rotation:[(ut(s,9)-.5)*.14,0,(ut(s,19)-.5)*.18],color:li(oi.foliageShadow,s)});for(let l=0;l<6;l+=1){const d=ut(s^Math.imul(l+1,73244475),4)*Math.PI*2,h=a+c*(.28+l*.17),u=(4.2+ut(s,l*5)*5.2)*r;n.addBox({center:[t+Math.cos(d)*u*.48,h,i+Math.sin(d)*u*.48],size:[u*1.62,2.4+r*1.6,u*.62],rotation:[0,-d,(ut(s,l*7+2)-.5)*.35],color:li(oi.foliage,s+l)})}o&&e.addBox({center:[t,a+c+1.3,i],size:[4.5*r,2.6*r,4.5*r],rotation:[0,ut(s,11)*Math.PI,0],color:li(oi.flower,s)})}function oM(n,e){[{count:120,minX:-20,maxX:235,minZ:555,maxZ:835,wet:!0},{count:92,minX:40,maxX:355,minZ:965,maxZ:1250,wet:!0},{count:116,minX:550,maxX:880,minZ:1025,maxZ:1285,wet:!1},{count:95,minX:50,maxX:880,minZ:520,maxZ:665,wet:!1}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=Yn(s,r,Cn.seed),o=i.minX+ut(a,2)*(i.maxX-i.minX),c=i.minZ+ut(a,13)*(i.maxZ-i.minZ);o>365&&o<825&&Math.abs(c-900)<82||Zc(n,e,o,c,(i.wet?.9:.68)+ut(a,22)*.9,a,1.5,s%(i.wet?17:23)===0)}})}function lM(n,e,t){fr(t,[-45,235,558,808],1.9,5081476),n.addBox({center:[96,-1,557],size:[286,17,14],color:7439741}),n.addBox({center:[96,-1,810],size:[286,17,14],color:6650482}),n.addBox({center:[-43,0,683],size:[14,18,240],color:7242362}),n.addBox({center:[238,0,683],size:[14,18,240],color:8360070});for(let i=0;i<9;i+=1)e.addBox({center:[-4+i*27,4,790+i%2*3],size:[18,3,24],color:i%3===0?9263420:5399389})}function cM(n,e,t,i){n.addBox({center:[150,64,540],size:[185,128,82],color:8885131}),n.addBox({center:[84,122,548],size:[55,116,74],color:7110006}),e.addBox({center:[161,69,582],size:[148,90,5],color:10263171}),n.addBox({center:[730,71,622],size:[170,142,92],color:7635837}),e.addBox({center:[720,72,670],size:[142,105,5],color:10066824}),n.addBox({center:[790,133,620],size:[46,118,86],color:6123627});for(const r of[{baseX:104,z:585,columns:4,rows:3},{baseX:665,z:674,columns:4,rows:4}])for(let s=0;s<r.rows;s+=1)for(let a=0;a<r.columns;a+=1){if((s*7+a*3)%9===4)continue;const c=r.baseX+a*32,l=42+s*28;i.addBox({center:[c,l,r.z-2],size:[26,3,3],color:4281937}),t.addBox({center:[c,l-10,r.z-2.5],size:[23,18,2],color:5602936})}for(let r=0;r<8;r+=1)i.addBox({center:[60+r*24,137+r%3*2,540],size:[19,3,56],rotation:[0,(r-4)*.035,0],color:r%3===0?8869951:5465182})}function dM(){const n=new nt;n.name="beauty-cell-world-space-anomaly",n.position.set(575,50,565),n.rotation.y=Math.PI/4,n.userData.moduleId="cbc-landmark-real-anomaly";const e=new _t({name:"beauty-cell-anomaly-ring-material",color:2379600,metalness:.74,roughness:.24,emissive:683881,emissiveIntensity:2.2});for(let r=0;r<4;r+=1){const s=new ze(new Oa(27,2.3,8,28,Math.PI*.37),e);s.name=`beauty-cell-anomaly-ring-${r}`,s.rotation.z=r*(Math.PI/2)+.12,s.castShadow=!0,n.add(s)}const t=new ze(new Tc(8.5,1),new Bt({name:"beauty-cell-anomaly-core-material",color:new Ue(6088396).multiplyScalar(2.4),toneMapped:!1}));t.name="beauty-cell-anomaly-core",n.add(t);for(let r=0;r<7;r+=1){const s=new ze(new Rc(2.2+r%3,0),e),a=r/7*Math.PI*2;s.position.set(Math.cos(a)*18,Math.sin(a*2)*8,Math.sin(a)*18),s.rotation.set(a*.7,a,-a*.4),n.add(s)}const i=new hs(6088396,12,135,2);return i.name="beauty-cell-anomaly-light",n.add(i),n}function uM(n){const e=new Pr(960,800,56,46);e.name="beauty-cell-wet-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.72,900),e.userData.componentCount=1;const t=new Er({name:"beauty-cell-wet-asphalt-material",color:1583654,map:n.albedoMap,normalMap:n.normalMap,normalScale:new Se(.5,.5),roughnessMap:n.roughnessMap,roughness:.86,metalness:.03,clearcoat:.38,clearcoatRoughness:.2});t.userData.surfaceProfile=gs,t.userData.wetnessModel="clearcoat-puddles-and-drainage";const i=new ze(e,t);return i.name="beauty-cell-wet-asphalt",i.receiveShadow=!0,i}function ea(n,e,t,i,r){const s=new on(...t,1,1,1);s.name=`${n}-geometry`,s.userData.componentCount=1;const a=new _t({name:`${n}-material`,color:r==="concrete"?11581352:7899771,map:i.albedoMap,normalMap:i.normalMap,normalScale:new Se(r==="concrete"?.34:.52,r==="concrete"?.34:.52),roughnessMap:i.roughnessMap,roughness:.92,metalness:.01}),o=new ze(s,a);return o.name=n,o.position.set(...e),o.castShadow=!0,o.receiveShadow=!0,o}function hn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:e.depthWrite??!0,side:e.doubleSided?rn:ci},r=e.unlit?new Bt({name:i.name,color:i.color,vertexColors:!0,transparent:i.transparent,opacity:i.opacity,side:i.side,depthWrite:i.depthWrite}):e.physical?new Er({...i,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new _t(i),s=new ze(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function hM(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof ze))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:(s.geometry.index?.count??0)/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function fM(){const n=new et,e=new et,t=new et,i=new et,r=new et,s=new et,a=new et,o=new et,c=new et,l=new et,d=new et,h=new et,u=new et;$_(n,e,t,i,r),eM(s,o,h),tM(s,o,c,l),nM(s,o,c,l),rM(s,o,d,h,u,l),iM(s,o,h,u),lM(s,o,d),cM(s,a,c,o),oM(h,u);const f=Pf(),g=uM(f.asphalt),x=[ea("beauty-cell-stair-retaining-shell",[134,36,1028],[28,72,220],f.concrete,"concrete"),ea("beauty-cell-transit-roof",[294,96,704],[142,7,58],f.roof,"roof"),ea("beauty-cell-far-left-shell",[150,64,541],[186,128,84],f.concrete,"concrete"),ea("beauty-cell-far-right-shell",[730,72,623],[172,144,94],f.concrete,"concrete")],m=[hn(n,{name:"beauty-cell-sidewalks-curbs",roughness:.9,receiveShadow:!0}),hn(e,{name:"beauty-cell-wet-road-film",roughness:.31,unlit:!0,transparent:!0,opacity:.68,depthWrite:!1,receiveShadow:!0}),hn(t,{name:"beauty-cell-worn-road-markings",roughness:.75,receiveShadow:!0}),hn(i,{name:"beauty-cell-road-puddles",roughness:.12,physical:!0,clearcoat:.92,clearcoatRoughness:.06,transparent:!0,opacity:.72,emissive:1587766,emissiveIntensity:.34,receiveShadow:!0}),hn(r,{name:"beauty-cell-road-aggregate",roughness:.96,receiveShadow:!0}),hn(s,{name:"beauty-cell-structural-concrete",roughness:.88,castShadow:!0,receiveShadow:!0}),hn(a,{name:"beauty-cell-layered-facades",roughness:.79,castShadow:!0,receiveShadow:!0}),hn(o,{name:"beauty-cell-metal-infrastructure",roughness:.39,metalness:.64,castShadow:!0,receiveShadow:!0}),hn(c,{name:"beauty-cell-laminated-glass",roughness:.13,metalness:.05,physical:!0,clearcoat:.75,clearcoatRoughness:.1,transparent:!0,opacity:.66}),hn(l,{name:"beauty-cell-working-signals",roughness:.2,emissive:4357992,emissiveIntensity:2.7,physical:!0,clearcoat:.48,clearcoatRoughness:.1}),hn(d,{name:"beauty-cell-spillway-water",roughness:.08,physical:!0,clearcoat:.96,clearcoatRoughness:.04,transparent:!0,opacity:.76,doubleSided:!0}),hn(h,{name:"beauty-cell-causal-foliage",roughness:.84,castShadow:!0,receiveShadow:!0}),hn(u,{name:"beauty-cell-human-flower-accents",roughness:.68,castShadow:!0})],p=new nt;p.name="beauty-cell-ground",p.add(g,...m.slice(0,5),m[10]);const _=new nt;_.name="beauty-cell-art-slice",_.add(p,...x,...m.slice(5,10),...m.slice(11),aM(),dM());const S=new hs(16757854,5.5,145,2);S.name="beauty-cell-workbench-life-light",S.position.set(585,56,810),_.add(S);const y=new nt;y.name="beauty-cell-contract-anchor",y.position.set(Et.x,0,Et.y),y.userData.interactionPoint={x:Et.x,y:Et.y},_.add(y);const w=hM(_);_.userData.schemaVersion=Cn.schemaVersion,_.userData.stableId=Cn.stableId,_.userData.seed=Cn.seed,_.userData.environmentKind=Cn.environmentKind,_.userData.visualGrammar=Cn.composition,_.userData.materialGrammar=Cn.materialGrammar,_.userData.generationProvenance=Cn.generationProvenance,_.userData.modules=Cn.modules.map(A=>({stableId:A.stableId,role:A.role,causalRule:A.causalRule,gameplayPromise:A.gameplayPromise})),_.userData.surfaceProvenance=f.provenance,_.userData.metrics=w,_.userData.spawnPosition={x:430,y:900},_.userData.playerCorridor=Cn.clearPlayerCorridor,_.userData.replacedTerrainIds=[...Zu],_.userData.replacedPropIds=[...Ku];let b=!1;return{group:_,ground:p,replacedTerrainIds:Zu,replacedPropIds:Ku,dispose(){b||(b=!0,_.removeFromParent(),_.traverse(A=>{A instanceof ze&&(A.geometry.dispose(),Array.isArray(A.material)?A.material.forEach(v=>v.dispose()):A.material.dispose())}),f.dispose(),p.clear(),_.clear())}}}const pM=[.68,.32,.265,.69,.15,.06],mM=[.2289,.6917,.0793],gM=[.3127,.329],xM=new ke().set(.4865709,.2656677,.1982173,.2289746,.6917385,.0792869,0,.0451134,1.0439444),vM=new ke().set(2.4934969,-.9313836,-.4027108,-.829489,1.7626641,.0236247,.0358458,-.0761724,.9568845),ya="display-p3",yM={primaries:pM,whitePoint:gM,transfer:dt,toXYZ:xM,fromXYZ:vM,luminanceCoefficients:mM,outputColorSpaceConfig:{drawingBufferColorSpace:ya}};({...Qe.spaces[Zt]});const _M=1.18;function MM(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(color-gamut: p3)").matches}function SM(n,e=_M){n.toneMapping=Na,n.toneMappingExposure=e,n.outputColorSpace=Zt;let t="srgb";const i=n.getContext();if(MM()&&"drawingBufferColorSpace"in i){Qe.define({[ya]:yM});try{n.outputColorSpace=ya,i.drawingBufferColorSpace===ya?t="display-p3":n.outputColorSpace=Zt}catch{n.outputColorSpace=Zt}}return n.domElement.dataset.outputGamut=t,n.domElement.dataset.toneMapping="agx",n.domElement.dataset.toneMappingExposure=e.toFixed(2),{gamut:t,toneMapping:"agx",exposure:e}}const _a=Object.freeze({x:510,y:680,z:510}),Ju=46,Qu=.38,bM=72;function EM(n,e,t=_a){const i=Math.hypot(t.x,t.z);if(i<=Number.EPSILON)return{moveX:n,moveY:e};const r=t.z/i,s=-t.x/i,a=t.x/i,o=t.z/i;return{moveX:n*r+e*a,moveY:n*s+e*o}}function $u(n,e="north-star"){if(e==="baseline")return{mode:"centered",targetX:n.playerX,targetY:n.playerY};const t=Math.hypot(n.facingX,n.facingY),i=t>Number.EPSILON?n.facingX/t:0,r=t>Number.EPSILON?n.facingY/t:-1;if(!(n.phase!==void 0&&n.phase!=="idle"&&Number.isFinite(n.targetX)&&Number.isFinite(n.targetY)))return{mode:"explore",targetX:n.playerX+i*Ju,targetY:n.playerY+r*Ju};const a=wM(n.targetX-n.playerX,n.targetY-n.playerY,bM);return{mode:"combat",targetX:n.playerX+a.x*Qu,targetY:n.playerY+a.y*Qu}}function wM(n,e,t){const i=Math.hypot(n,e);if(i<=t||i<=Number.EPSILON)return{x:n,y:e};const r=t/i;return{x:n*r,y:e*r}}const fn=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],TM=["matte","metal","emissive"],AM={head:{x:12,y:23.5,z:7.5},torso:{x:12,y:14,z:8},"left-arm":{x:7.5,y:21.5,z:7},"right-arm":{x:16.5,y:21.5,z:7},"left-leg":{x:8.5,y:13,z:7},"right-leg":{x:15,y:13,z:7},equipment:{x:12,y:16,z:10}};function eh(n,e){return Number.isFinite(n)?It.clamp(n??e,0,1):e}function Vo(n){return n*n*(3-2*n)}function th(n=[0,0,0],e=[0,0,0],t=[1,1,1]){return{position:n,rotation:e,scale:t}}function Lf(n){const e=n.paletteId==="pack-pale"||n.paletteId==="cyan"||n.paletteId==="amber",t=n.z>=9&&n.y>=15&&n.x>=5&&n.x<=15,i=n.z<=5&&n.y>=15&&n.y<=22&&n.paletteId==="rust",r=n.z>=8&&n.y>=10&&n.y<=14&&(n.paletteId==="cloth-sage"||n.paletteId==="cloth-dark");return e||t||i||r?"equipment":n.y>=24?"head":n.y>=13&&n.x<=8?"left-arm":n.y>=13&&n.x>=16?"right-arm":n.y<=12&&n.x<=11?"left-leg":n.y<=12?"right-leg":"torso"}function RM(n=Dr,e=Lf){const t={head:[],torso:[],"left-arm":[],"right-arm":[],"left-leg":[],"right-leg":[],equipment:[]};for(const i of n.voxels)t[e(i,n)].push(i);return Object.fromEntries(fn.map(i=>[i,{schemaVersion:2,id:`${n.id}-${i}`,name:`${n.name} / ${i}`,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:t[i],anchors:[],validation:{minVoxelCount:0,maxVoxelCount:n.voxels.length,requireGroundContact:!1,requireConnectedBody:!1}}]))}function CM(n){switch(n){case"matte":return new Er({color:16777215,vertexColors:!0,roughness:.72,metalness:0,sheen:.24,sheenColor:13624796,sheenRoughness:.88});case"metal":return new Er({color:16777215,vertexColors:!0,roughness:.28,metalness:.82,clearcoat:.12,clearcoatRoughness:.42});case"emissive":return new Bt({color:16777215,vertexColors:!0,toneMapped:!1})}}function PM(n,e,t){return new D((e.x-n.dimensions.width/2)*t,e.y*t,(e.z-n.dimensions.depth/2)*t)}function LM(n,e,t){const i=mf(n,{voxelSize:e,shadeFaces:!1,origin:{x:-(n.dimensions.width*e)/2-t.x,y:-t.y,z:-(n.dimensions.depth*e)/2-t.z}}),r=new St;return r.setAttribute("position",new kt(i.positions,3)),r.setAttribute("normal",new kt(i.normals,3)),r.setAttribute("color",new kt(i.colors,3)),r.setIndex(new kt(i.indices,1)),i.materialGroups.forEach((s,a)=>{r.addGroup(s.start,s.count,a)}),r.computeBoundingSphere(),{geometry:r,roles:i.materialGroups.map(s=>s.role)}}function nh(n,e,t,i){const r=LM(n,e,t),s=new ze(r.geometry,r.roles.map(a=>i[a]));return s.name=n.id,s.castShadow=!0,s.receiveShadow=!0,s}function Df(n){const e=Number.isFinite(n.timeSeconds)?n.timeSeconds:0,t=eh(n.progress,0),i=eh(n.moveAmount,1),r=Math.sin(e*2.15),s=[0,r*.32,0],a=[0,0,0],o={head:[r*.012,Math.sin(e*.72)*.035,0],torso:[.018+r*.008,0,0],"left-arm":[-.025-r*.018,0,-.035],"right-arm":[.025+r*.018,0,.035],"left-leg":[0,0,0],"right-leg":[0,0,0],equipment:[-r*.008,0,0]},c={head:[1,1,1],torso:[1,1,1],"left-arm":[1,1,1],"right-arm":[1,1,1],"left-leg":[1,1,1],"right-leg":[1,1,1],equipment:[1,1,1]};switch(n.motion){case"idle":break;case"run":{const d=Math.sin(e*10.5)*i;s[1]+=Math.abs(Math.cos(e*10.5))*1.25*i,o.torso[0]+=.1*i,o.torso[1]=Math.cos(e*10.5)*.09*i,o.head[1]-=o.torso[1]*.55,o["left-leg"][0]=d*.68,o["right-leg"][0]=-d*.68,o["left-arm"][0]=-d*.5,o["right-arm"][0]=d*.5,o.equipment[0]-=.08*i+Math.abs(d)*.035;break}case"windup":{const d=Vo(t);o.torso[1]=-.42*d,o.torso[2]=.08*d,o["right-arm"][0]=-1.18*d,o["right-arm"][2]=-.25*d,o["left-arm"][0]=.38*d,o.head[1]=.2*d,o["left-leg"][0]=-.12*d,o["right-leg"][0]=.16*d;break}case"hit":{const d=Vo(t);o.torso[1]=It.lerp(-.42,.34,d),o["right-arm"][0]=It.lerp(-1.18,1.46,d),o["right-arm"][2]=It.lerp(-.25,.2,d),o["left-arm"][0]=It.lerp(.38,-.2,d),o.head[1]=-o.torso[1]*.42,s[2]-=Math.sin(t*Math.PI)*2.8;break}case"recovery":{const d=1-Vo(t);o.torso[1]=.34*d,o["right-arm"][0]=1.46*d,o["right-arm"][2]=.2*d,o["left-arm"][0]=-.2*d,o.head[1]=-.14*d;break}case"hurt":{const d=Math.sin(t*Math.PI);s[2]+=d*7.5,a[2]=Math.sin(t*Math.PI*2)*.06,o.torso[0]=-.34*d,o.head[0]=.28*d,o["left-arm"][0]=-.62*d,o["right-arm"][0]=-.78*d;break}case"skill":{const d=Math.sin(t*Math.PI);s[1]-=d*2.6,o.torso[0]=-.18*d,o.head[0]=.14*d,o["left-arm"][0]=.72*d,o["right-arm"][0]=.72*d,o["left-arm"][2]=-.92*d,o["right-arm"][2]=.92*d,o["left-leg"][0]=-.15*d,o["right-leg"][0]=.15*d,c.equipment=[1+d*.07,1+d*.07,1+d*.07];break}}const l=Object.fromEntries(fn.map(d=>[d,th([0,0,0],o[d],c[d])]));return{root:th(s,a),parts:l}}function Da(n,e){const t=new D(e.x,e.y,e.z).multiply(n.scale).applyQuaternion(n.quaternion);n.position.copy(t).multiplyScalar(-1)}function DM(n={}){const e=n.recipe??Dr,t=n.voxelSize??Va,i=n.mode??"articulated";if(!Number.isFinite(t)||t<=0)throw new RangeError("Hero voxel size must be a positive finite number.");const r=new Set,s=Object.fromEntries(TM.map(S=>{const y=n.materials?.[S],w=y??CM(S);return y===void 0&&r.add(w),[S,w]})),a=new nt;a.name=`${e.id}-visual`;const o=new nt;o.name=`${e.id}-motion`,a.add(o);const c=Object.fromEntries(fn.map(S=>[S,PM(e,AM[S],t)])),l=Object.fromEntries(fn.map(S=>{const y=new nt;return y.name=`${e.id}-${S}-pivot`,[S,y]})),d=Object.fromEntries(fn.map(S=>[S,new D])),h=c.torso;for(const S of fn){const y=S==="head"||S==="left-arm"||S==="right-arm"||S==="equipment"?l.torso:o;y.add(l[S]),d[S].copy(c[S]),y===l.torso&&d[S].sub(h),l[S].position.copy(d[S])}let f=Object.fromEntries(fn.map(S=>[S,null])),g=null;const x=[];if(i==="articulated"){const S=RM(e,n.classifyVoxel??Lf);f=Object.fromEntries(fn.map(y=>{const w=nh(S[y],t,c[y],s);return x.push(w.geometry),l[y].add(w),[y,w]}))}else{g=nh(e,t,new D,s),x.push(g.geometry),o.add(g);for(const S of fn)l[S].visible=!1}const m=ka(e,"weapon",t),p=new nt;p.name=`${e.id}-weapon-socket`,i==="articulated"?(l["right-arm"].add(p),p.position.set(m.x-c["right-arm"].x,m.y-c["right-arm"].y,m.z-c["right-arm"].z)):(o.add(p),p.position.set(m.x,m.y,m.z));const _={root:a,motionRoot:o,mode:i,partGroups:l,partMeshes:f,mergedMesh:g,weaponSocket:p,materials:s,updatePose(S){const y=Df(S);o.position.set(...y.root.position),o.rotation.set(...y.root.rotation),o.scale.set(...y.root.scale);for(const w of fn){const b=y.parts[w],A=l[w];A.position.set(d[w].x+b.position[0],d[w].y+b.position[1],d[w].z+b.position[2]),A.rotation.set(...b.rotation),A.scale.set(...b.scale)}i==="merged"&&p.rotation.set(...y.parts["right-arm"].rotation)},attachWeapon(S,y={x:0,y:0,z:0}){p.add(S),Da(S,y)},setTint(S){for(const[y,w]of Object.entries(s))(w instanceof _t||w instanceof Bt)&&(w.color.set(S),y==="emissive"&&w instanceof Bt&&w.color.multiplyScalar(2.15))},dispose(){for(const S of x)S.dispose();for(const S of r)S.dispose();a.removeFromParent()}};return _.updatePose({motion:"idle",timeSeconds:0}),_}const Gr=new D;function yn(n,e,t,i,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),c=Math.PI/4;Gr.copy(e),Gr[i]=0,Gr.normalize();const l=.5*a/(a+o),d=1-Gr.angleTo(n)/c;return Math.sign(Gr[t])===1?d*l:o/(a+o)+l+l*(1-d)}class Kc extends on{constructor(e=1,t=1,i=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(e/2,t/2,i/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:r,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new D,l=new D,d=new D(e,t,i).divideScalar(2).subScalar(s),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=h.length/6,x=new D,m=.5/a;for(let p=0,_=0;p<h.length;p+=3,_+=2)switch(c.fromArray(h,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),h[p+0]=d.x*Math.sign(c.x)+l.x*s,h[p+1]=d.y*Math.sign(c.y)+l.y*s,h[p+2]=d.z*Math.sign(c.z)+l.z*s,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/g)){case 0:x.set(1,0,0),f[_+0]=yn(x,l,"z","y",s,i),f[_+1]=1-yn(x,l,"y","z",s,t);break;case 1:x.set(-1,0,0),f[_+0]=1-yn(x,l,"z","y",s,i),f[_+1]=1-yn(x,l,"y","z",s,t);break;case 2:x.set(0,1,0),f[_+0]=1-yn(x,l,"x","z",s,e),f[_+1]=yn(x,l,"z","x",s,i);break;case 3:x.set(0,-1,0),f[_+0]=1-yn(x,l,"x","z",s,e),f[_+1]=1-yn(x,l,"z","x",s,i);break;case 4:x.set(0,0,1),f[_+0]=1-yn(x,l,"x","y",s,e),f[_+1]=1-yn(x,l,"y","x",s,t);break;case 5:x.set(0,0,-1),f[_+0]=yn(x,l,"x","y",s,e),f[_+1]=1-yn(x,l,"y","x",s,t);break}}static fromJSON(e){return new Kc(e.width,e.height,e.depth,e.segments,e.radius)}}function ih(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new St;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(h.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,d),l+=f}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const f=n[u].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in s){const h=rh(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in a){const h=a[d][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const f=[];for(let x=0;x<a[d].length;++x)f.push(a[d][x][u]);const g=rh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(g)}}}return c}function rh(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=d.gpuType),r!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.count*t}const a=new e(s),o=new kt(a,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,f=d.count;u<f;u++)for(let g=0;g<t;g++){const x=d.getComponent(u,g);o.setComponent(u+h,g,x)}}else a.set(d.array,c);c+=d.count*t}return r!==void 0&&(o.gpuType=r),o}const sh=Object.freeze({schemaVersion:1,id:"actor.beauty-cell.field-surveyor-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-surveyor-7429",rigFamily:"humanoid-v1",representation:"grid-quantized-modular-3d",unitStep:.25,role:"reclamation field surveyor",silhouette:["asymmetric storm mantle","compact analysis pack","offset sensor mast","armored field boots"],materialGrammar:["waxed teal cloth","warm ceramic shell","brushed utility metal","cyan and amber diagnostic light"],provenance:{source:"procedural runtime geometry",externalAssets:!1,conceptImageUsedAtRuntime:!1}}),ah=Object.freeze({schemaVersion:1,id:"companion.beauty-cell.survey-hound-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-hound-3118",role:"recoverable terrain-analysis unit",bodyPlan:"four-legged survey robot",provenance:{source:"procedural runtime geometry",externalAssets:!1}});class ii{buckets=new Map;add(e,t,i){const r=t.index===null?t:t.toNonIndexed();r!==t&&(t.dispose(),t=r),t.deleteAttribute("uv");const s=i.position.map(Rn),a=i.rotation??[0,0,0],o=(i.scale??[1,1,1]).map(Rn),c=new it().compose(new D(...s),new zn().setFromEuler(new Sn(...a)),new D(...o));t.applyMatrix4(c);const l=this.buckets.get(e)??[];return l.push(t),this.buckets.set(e,l),this}rounded(e,t,i,r,s=.8){const[a,o,c]=t.map(Rn);return this.add(e,new Kc(a,o,c,2,Math.min(s,a*.24,o*.24,c*.24)),{position:i,rotation:r})}capsule(e,t,i,r,s,a){const o=Rn(t),c=Rn(i);return this.add(e,new bc(o,Math.max(.25,c-o*2),4,10),{position:r,rotation:s,scale:a})}sphere(e,t,i,r){return this.add(e,new Ac(Rn(t),14,9),{position:i,scale:r})}cylinder(e,t,i,r,s,a,o=10){return this.add(e,new wc(Rn(t),Rn(i),Rn(r),o,1),{position:s,rotation:a})}torus(e,t,i,r,s,a){return this.add(e,new Oa(Rn(t),Rn(i),6,16),{position:r,rotation:s,scale:a})}build(e,t){const i=[...this.buckets.keys()];if(i.length===0)throw new Error(`Cannot build empty actor part: ${e}`);const r=[];for(const o of i){const c=this.buckets.get(o);if(c===void 0)continue;const l=ih(c,!1);for(const d of c)d.dispose();if(l===null)throw new Error(`Failed to merge actor material group: ${e}`);r.push(l)}const s=ih(r,!0);for(const o of r)o.dispose();if(s===null)throw new Error(`Failed to merge actor part: ${e}`);s.computeBoundingBox(),s.computeBoundingSphere();const a=new ze(s,i.map(o=>t[o]));return a.name=e,a.castShadow=!0,a.receiveShadow=!0,a}}function Rn(n){return Math.round(n*4)/4}function Hn(n,e={}){return new Er({color:n,...e})}function Ho(n,e){return new Bt({color:new Ue(n).multiplyScalar(e),toneMapped:!1})}function jc(){const n={skin:Hn(13207144,{roughness:.52,sheen:.12,sheenColor:16767172,sheenRoughness:.75}),hair:Hn(1516842,{roughness:.48,sheen:.52,sheenColor:5934222,sheenRoughness:.66}),under:Hn(1515814,{roughness:.64}),cloth:Hn(3108972,{roughness:.72,sheen:.46,sheenColor:9163204,sheenRoughness:.82}),clothDark:Hn(1588032,{roughness:.8,sheen:.28,sheenColor:7053208,sheenRoughness:.9}),shell:Hn(14209725,{roughness:.38,clearcoat:.24,clearcoatRoughness:.7}),metal:Hn(6716288,{roughness:.27,metalness:.86,clearcoat:.12,clearcoatRoughness:.36}),copper:Hn(11293753,{roughness:.32,metalness:.68}),rubber:Hn(857625,{roughness:.9}),glass:Hn(1654088,{roughness:.12,metalness:.18,clearcoat:1,clearcoatRoughness:.08}),cyan:Ho(6485217,2.7),amber:Ho(16758093,2.35),coral:Ho(16741460,2.1)},e=new Map;for(const t of Object.values(n))(t instanceof Bt||t instanceof _t)&&e.set(t,t.color.clone());return{byId:n,contract:{matte:n.cloth,metal:n.metal,emissive:n.cyan},originals:e,owned:new Set(Object.values(n))}}function IM(n){const e=new ii().capsule("skin",5.1,10.5,[0,5,1.4],void 0,[.92,1,.88]).sphere("hair",5.8,[0,7.2,-1.35],[1,1.02,.82]).rounded("hair",[9.5,3.5,3],[0,10.25,1.15],[.08,0,0],1.2).capsule("hair",1.45,9,[-5,3.4,-.5],[.08,0,-.18]).capsule("hair",1.7,12.5,[4.7,2.1,-1],[-.08,0,.12]).rounded("glass",[8.5,1.4,.8],[0,6.3,6.15],[0,0,-.04],.38).rounded("cyan",[2.2,.45,.3],[2.35,6.3,6.65],void 0,.12).rounded("copper",[1.25,3.2,1.5],[-5.2,5.25,.8],[0,0,.18],.4).rounded("shell",[7,1.4,4.2],[0,-.75,0],void 0,.45).build("beauty-hero-head",n),t=new ii().rounded("under",[12,17,7.5],[0,5,0],void 0,2.4).rounded("cloth",[7,14.5,2.2],[-3.7,5.5,4.1],[0,0,-.08],1.05).rounded("clothDark",[6.3,14,2.1],[3.5,5.2,4.15],[0,0,.06],1).rounded("shell",[15.5,4.2,7.8],[0,12.2,-.1],void 0,1.5).rounded("under",[13.2,4.6,7.8],[0,-4.5,0],void 0,1.2).rounded("copper",[1.1,12.2,.85],[-1.2,5.2,5.45],[-.04,0,.11],.3).rounded("metal",[7.4,2.1,1],[2.2,9.2,5.25],[.02,0,-.06],.42).rounded("cyan",[3.1,.65,.35],[3.5,9.2,5.85],void 0,.16).rounded("amber",[1.1,1.1,.35],[.3,-2.8,5.15],void 0,.22).build("beauty-hero-torso",n);function i(a){const o=a<0?"left":"right",c=new ii().sphere(a<0?"cloth":"clothDark",3.7,[0,-1.2,0],[1,.82,1]).capsule(a<0?"cloth":"clothDark",2.7,11,[0,-6.5,0],[.02,0,a*.035]).capsule("under",2.3,9.5,[0,-15.1,.3],[-.04,0,a*.025]).rounded("metal",[5.2,5.8,5.1],[0,-12.7,.8],void 0,1.2).capsule("rubber",2.35,5.2,[0,-20.3,.5]).rounded("shell",[4.3,2.8,4.7],[0,-19,.7],void 0,.9);return a<0?c.rounded("glass",[5.6,1.2,1.4],[-.2,-12.3,3.4],[.08,0,0],.38).rounded("cyan",[3.6,.42,.28],[-.2,-12.3,4.18],[.08,0,0],.12):c.rounded("amber",[1.4,2.8,.32],[2,-12.5,3.5],void 0,.18),c.build(`beauty-hero-${o}-arm`,n)}function r(a){const o=a<0?"left":"right";return new ii().capsule("under",3.8,14.5,[0,-7.2,0],[.03,0,a*.025],[1,1,.92]).rounded(a<0?"cloth":"clothDark",[7.7,10.5,7],[0,-5.4,0],void 0,1.9).rounded("shell",[7.2,5.3,6.6],[0,-13,1.1],[.05,0,0],1.45).capsule("under",3.1,12,[0,-20.2,0],[-.035,0,0]).rounded("rubber",[8.2,7.2,11.2],[0,-27,1.65],[.03,0,0],1.8).rounded("metal",[7.5,2,8.8],[0,-24.2,1],void 0,.65).rounded(a<0?"cyan":"amber",[1.2,3.2,.35],[a*2.8,-23.8,5.55],void 0,.16).build(`beauty-hero-${o}-leg`,n)}const s=new ii().rounded("cloth",[10.5,18,2.2],[-6,-1,-3.9],[.13,-.08,-.08],1).rounded("clothDark",[7.6,16,2],[4.5,-2.2,-4],[.18,.08,.08],.9).rounded("shell",[11.8,15,5.8],[0,5.5,-6.1],[-.05,0,0],2).rounded("metal",[8.6,8.2,1.8],[0,6,-9.4],void 0,.8).cylinder("metal",.85,1,15.5,[6,14,-6],[0,0,-.08],8).sphere("glass",2.1,[6.9,21.5,-5.7],[.8,1,.8]).rounded("cyan",[1.2,2.2,.5],[7,21.6,-3.95],void 0,.22).cylinder("copper",1.25,1.25,8.2,[-7,1.4,-6.6],[0,0,.04],10).rounded("metal",[5.4,7.2,4.6],[7.2,-3.5,0],[0,0,-.06],1.1).rounded("coral",[.5,2.8,.28],[9.95,-3.4,1.4],void 0,.12).build("beauty-hero-equipment",n);return{head:e,torso:t,"left-arm":i(-1),"right-arm":i(1),"left-leg":r(-1),"right-leg":r(1),equipment:s}}function If(n,e){const t=new Ue(e);for(const[i,r]of n.originals)(i instanceof Bt||i instanceof _t)&&i.color.copy(r).multiply(t)}function NM(){const n=jc(),e=new nt;e.name=sh.id,e.userData.assetDNA=sh;const t=new nt;t.name="beauty-hero-motion",e.add(t);const i=Object.fromEntries(fn.map(c=>{const l=new nt;return l.name=`beauty-hero-${c}-pivot`,[c,l]})),r={head:new D(0,21,0),torso:new D(0,34,0),"left-arm":new D(-10,14,0),"right-arm":new D(10,14,0),"left-leg":new D(-4.8,30,0),"right-leg":new D(4.8,30,0),equipment:new D(0,0,0)};t.add(i.torso,i["left-leg"],i["right-leg"]),i.torso.position.copy(r.torso),i["left-leg"].position.copy(r["left-leg"]),i["right-leg"].position.copy(r["right-leg"]);for(const c of["head","left-arm","right-arm","equipment"])i.torso.add(i[c]),i[c].position.copy(r[c]);const s=IM(n.byId);for(const c of fn)i[c].add(s[c]);const a=new nt;a.name="beauty-hero-right-hand-socket",a.position.set(0,-21.5,1.2),i["right-arm"].add(a);const o={root:e,motionRoot:t,mode:"articulated",partGroups:i,partMeshes:s,mergedMesh:null,weaponSocket:a,materials:n.contract,updatePose(c){const l=Df(c);t.position.set(...l.root.position),t.rotation.set(...l.root.rotation),t.scale.set(...l.root.scale);for(const h of fn){const u=l.parts[h];i[h].position.set(r[h].x+u.position[0],r[h].y+u.position[1],r[h].z+u.position[2]),i[h].rotation.set(...u.rotation),i[h].scale.set(...u.scale)}const d=It.clamp(c.moveAmount??0,0,1);i.equipment.rotation.x+=Math.sin(c.timeSeconds*5.8)*(.018+d*.025),i.head.rotation.y+=Math.sin(c.timeSeconds*.7)*.018},attachWeapon(c,l={x:0,y:0,z:0}){a.add(c),Da(c,l)},setTint(c){If(n,c)},dispose(){for(const c of Object.values(s))c.geometry.dispose();for(const c of n.owned)c.dispose();e.removeFromParent()}};return o.updatePose({motion:"idle",timeSeconds:0}),o}function UM(){const n=jc(),e=new nt;e.name=ah.id,e.userData.assetDNA=ah;const t=new nt;t.name="beauty-companion-motion",e.add(t);const i=[],r=new ii().rounded("shell",[22,11,13],[0,15,0],void 0,2.8).rounded("metal",[17,4,10],[0,10,0],void 0,1.2).rounded("cloth",[11,6,9],[-3,20.5,-.5],void 0,1.4).rounded("copper",[2,7,9.5],[5.2,17.5,0],void 0,.55).rounded("cyan",[6,.65,.35],[-3,21.6,4.6],void 0,.18).build("beauty-companion-body",n.byId);i.push(r),t.add(r);const s=new nt;s.name="beauty-companion-sensor-head",s.position.set(0,17,8.5);const a=new ii().rounded("shell",[13,9,10],[0,0,0],[-.1,0,0],2.3).rounded("glass",[9,2,.9],[0,1,5.1],void 0,.5).rounded("cyan",[6.6,.55,.32],[0,1,5.65],void 0,.16).cylinder("metal",.6,.75,8,[4.3,7.2,-1],[0,0,-.13],8).sphere("amber",1.1,[4.8,11,-.9]).build("beauty-companion-head",n.byId);i.push(a),s.add(a),t.add(s);const o=[new nt,new nt,new nt,new nt],c=[[-7.2,12,4.5],[7.2,12,4.5],[-7.2,12,-4.5],[7.2,12,-4.5]];for(let l=0;l<o.length;l+=1){const d=o[l],h=c[l];if(d===void 0||h===void 0)continue;d.name=`beauty-companion-leg-${l+1}`,d.position.set(h[0],h[1],h[2]);const u=new ii().capsule("metal",1.6,9.5,[0,-4,0],[0,0,l%2===0?-.13:.13]).rounded("shell",[4.5,4.2,5],[0,-7.5,.4],void 0,1).capsule("rubber",1.45,8,[0,-11.8,1.6],[.35,0,0]).rounded("rubber",[5.2,2.8,7],[0,-15.2,3],[.08,0,0],.9).rounded(l<2?"cyan":"amber",[.55,2.2,.3],[2.35,-7.4,1.5],void 0,.12).build(`beauty-companion-leg-mesh-${l+1}`,n.byId);i.push(u),d.add(u),t.add(d)}return{root:e,motionRoot:t,sensorHead:s,legGroups:o,updatePose({timeSeconds:l,moveAmount:d=0,reaction:h=0}){const u=It.clamp(d,0,1),f=It.clamp(h,0,1);t.position.y=Math.sin(l*3.2)*.45,t.rotation.z=Math.sin(l*2.1)*.012,s.rotation.y=Math.sin(l*1.15)*.22,s.rotation.x=-.06+Math.sin(l*1.9)*.035;for(let g=0;g<o.length;g+=1){const x=g===0||g===3?0:Math.PI,m=o[g];m!==void 0&&(m.rotation.x=Math.sin(l*8.2+x)*.4*u)}e.scale.setScalar(1+Math.sin(f*Math.PI)*.035)},setTint(l){If(n,l)},dispose(){for(const l of i)l.geometry.dispose();for(const l of n.owned)l.dispose();e.removeFromParent()}}}function oh(n){const e=jc(),t=new nt;t.name=n==="blade"?"resonance-seam-cutter":"coil-anchor-driver",t.userData.kind=n,t.userData.gripAnchor={x:0,y:0,z:0},t.userData.longAxis="-Y";const i=new ii().rounded("rubber",[4.2,8,4.4],[0,-3,0],void 0,1).rounded("metal",[5.8,6.8,5.6],[0,-9.2,0],void 0,1.25).rounded("copper",[1.1,5,5.9],[2.8,-9.2,0],void 0,.3);n==="blade"?i.rounded("metal",[5.5,24,2.8],[0,-24,0],void 0,.75).rounded("shell",[3.8,18,3.5],[0,-22,0],void 0,.8).rounded("cyan",[.7,22,.38],[2.2,-24,1.65],void 0,.15).rounded("amber",[3,1.1,.35],[0,-14,2],void 0,.16):i.rounded("metal",[8,20,8],[0,-21,0],void 0,1.6).rounded("shell",[6.5,12,8.8],[0,-18,0],void 0,1.4).cylinder("copper",4.4,4.4,2,[0,-16.5,0],void 0,12).cylinder("copper",4.4,4.4,2,[0,-23,0],void 0,12).rounded("coral",[1,8,.4],[4.2,-21,2.5],void 0,.18).rounded("metal",[3.8,12,3.8],[0,-36,0],void 0,.7);const r=i.build(`${t.name}-mesh`,e.byId);return t.add(r),t.userData.dispose=()=>{r.geometry.dispose();for(const s of e.owned)s.dispose();t.removeFromParent()},t}const Ui={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ei{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const zM=new fs(-1,1,1,-1,0,1);class OM extends St{constructor(){super(),this.setAttribute("position",new Ge([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ge([0,2,0,0,2,0],2))}}const FM=new OM;class xs{constructor(e){this._mesh=new ze(FM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,zM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ql extends Ei{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=pn.clone(e.uniforms),this.material=new bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new xs(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class lh extends Ei{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class BM extends Ei{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class kM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Se);this._width=i.width,this._height=i.height,t=new Ht(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ql(Ui),this.copyPass.material.blending=Yt,this.timer=new z0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}lh!==void 0&&(a instanceof lh?i=!0:a instanceof BM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const ta={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new it},cameraProjectionMatrixInverse:{value:new it},cameraWorldMatrix:{value:new it},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new D(-1,-1,-1)},sceneBoxMax:{value:new D(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},na={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Go={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function VM(n=5){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=HM(e),i=t.length,r=new Uint8Array(i*4);for(let a=0;a<i;++a){const o=t[a],c=2*Math.PI*o/i,l=new D(Math.cos(c),Math.sin(c),0).normalize();r[a*4]=(l.x*.5+.5)*255,r[a*4+1]=(l.y*.5+.5)*255,r[a*4+2]=127,r[a*4+3]=255}const s=new us(r,e,e);return s.wrapS=Un,s.wrapT=Un,s.needsUpdate=!0,s}function HM(n){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=e*e,i=Array(t).fill(0);let r=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(r===-1&&s===e?(s=e-2,r=0):(s===e&&(s=0),r<0&&(r=e-1)),i[r*e+s]!==0){s-=2,r++;continue}else i[r*e+s]=a++;s++,r--}return i}const ia={defines:{SAMPLES:16,SAMPLE_VECTORS:Nf(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraProjectionMatrixInverse:{value:new it},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Nf(n,e,t){const i=GM(n,e,t);let r="vec3[SAMPLES](";for(let s=0;s<n;s++){const a=i[s];r+=`vec3(${a.x}, ${a.y}, ${a.z})${s<n-1?",":")"}`}return r}function GM(n,e,t){const i=[];for(let r=0;r<n;r++){const s=2*Math.PI*e*r/n,a=Math.pow(r/(n-1),t);i.push(new D(Math.cos(s),Math.sin(s),a))}return i}class WM{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,r,s;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),d=(3-Math.sqrt(3))/6,h=(c+l)*d,u=c-h,f=l-h,g=e-u,x=t-f;let m,p;g>x?(m=1,p=0):(m=0,p=1);const _=g-m+d,S=x-p+d,y=g-1+2*d,w=x-1+2*d,b=c&255,A=l&255,v=this.perm[b+this.perm[A]]%12,E=this.perm[b+m+this.perm[A+p]]%12,R=this.perm[b+1+this.perm[A+1]]%12;let P=.5-g*g-x*x;P<0?i=0:(P*=P,i=P*P*this._dot(this.grad3[v],g,x));let L=.5-_*_-S*S;L<0?r=0:(L*=L,r=L*L*this._dot(this.grad3[E],_,S));let F=.5-y*y-w*w;return F<0?s=0:(F*=F,s=F*F*this._dot(this.grad3[R],y,w)),70*(i+r+s)}noise3d(e,t,i){let r,s,a,o;const l=(e+t+i)*.3333333333333333,d=Math.floor(e+l),h=Math.floor(t+l),u=Math.floor(i+l),f=1/6,g=(d+h+u)*f,x=d-g,m=h-g,p=u-g,_=e-x,S=t-m,y=i-p;let w,b,A,v,E,R;_>=S?S>=y?(w=1,b=0,A=0,v=1,E=1,R=0):_>=y?(w=1,b=0,A=0,v=1,E=0,R=1):(w=0,b=0,A=1,v=1,E=0,R=1):S<y?(w=0,b=0,A=1,v=0,E=1,R=1):_<y?(w=0,b=1,A=0,v=0,E=1,R=1):(w=0,b=1,A=0,v=1,E=1,R=0);const P=_-w+f,L=S-b+f,F=y-A+f,B=_-v+2*f,z=S-E+2*f,W=y-R+2*f,k=_-1+3*f,Z=S-1+3*f,J=y-1+3*f,ne=d&255,ae=h&255,le=u&255,Ve=this.perm[ne+this.perm[ae+this.perm[le]]]%12,je=this.perm[ne+w+this.perm[ae+b+this.perm[le+A]]]%12,Be=this.perm[ne+v+this.perm[ae+E+this.perm[le+R]]]%12,K=this.perm[ne+1+this.perm[ae+1+this.perm[le+1]]]%12;let ie=.6-_*_-S*S-y*y;ie<0?r=0:(ie*=ie,r=ie*ie*this._dot3(this.grad3[Ve],_,S,y));let ee=.6-P*P-L*L-F*F;ee<0?s=0:(ee*=ee,s=ee*ee*this._dot3(this.grad3[je],P,L,F));let Ee=.6-B*B-z*z-W*W;Ee<0?a=0:(Ee*=Ee,a=Ee*Ee*this._dot3(this.grad3[Be],B,z,W));let Ne=.6-k*k-Z*Z-J*J;return Ne<0?o=0:(Ne*=Ne,o=Ne*Ne*this._dot3(this.grad3[K],k,Z,J)),32*(r+s+a+o)}noise4d(e,t,i,r){const s=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let d,h,u,f,g;const x=(e+t+i+r)*c,m=Math.floor(e+x),p=Math.floor(t+x),_=Math.floor(i+x),S=Math.floor(r+x),y=(m+p+_+S)*l,w=m-y,b=p-y,A=_-y,v=S-y,E=e-w,R=t-b,P=i-A,L=r-v,F=E>R?32:0,B=E>P?16:0,z=R>P?8:0,W=E>L?4:0,k=R>L?2:0,Z=P>L?1:0,J=F+B+z+W+k+Z,ne=a[J][0]>=3?1:0,ae=a[J][1]>=3?1:0,le=a[J][2]>=3?1:0,Ve=a[J][3]>=3?1:0,je=a[J][0]>=2?1:0,Be=a[J][1]>=2?1:0,K=a[J][2]>=2?1:0,ie=a[J][3]>=2?1:0,ee=a[J][0]>=1?1:0,Ee=a[J][1]>=1?1:0,Ne=a[J][2]>=1?1:0,ve=a[J][3]>=1?1:0,ft=E-ne+l,We=R-ae+l,rt=P-le+l,se=L-Ve+l,Ae=E-je+2*l,Ce=R-Be+2*l,lt=P-K+2*l,qe=L-ie+2*l,He=E-ee+3*l,ct=R-Ee+3*l,st=P-Ne+3*l,I=L-ve+3*l,Vt=E-1+4*l,Ye=R-1+4*l,C=P-1+4*l,M=L-1+4*l,O=m&255,V=p&255,Y=_&255,re=S&255,de=o[O+o[V+o[Y+o[re]]]]%32,j=o[O+ne+o[V+ae+o[Y+le+o[re+Ve]]]]%32,Q=o[O+je+o[V+Be+o[Y+K+o[re+ie]]]]%32,ue=o[O+ee+o[V+Ee+o[Y+Ne+o[re+ve]]]]%32,Re=o[O+1+o[V+1+o[Y+1+o[re+1]]]]%32;let ce=.6-E*E-R*R-P*P-L*L;ce<0?d=0:(ce*=ce,d=ce*ce*this._dot4(s[de],E,R,P,L));let oe=.6-ft*ft-We*We-rt*rt-se*se;oe<0?h=0:(oe*=oe,h=oe*oe*this._dot4(s[j],ft,We,rt,se));let we=.6-Ae*Ae-Ce*Ce-lt*lt-qe*qe;we<0?u=0:(we*=we,u=we*we*this._dot4(s[Q],Ae,Ce,lt,qe));let De=.6-He*He-ct*ct-st*st-I*I;De<0?f=0:(De*=De,f=De*De*this._dot4(s[ue],He,ct,st,I));let Fe=.6-Vt*Vt-Ye*Ye-C*C-M*M;return Fe<0?g=0:(Fe*=Fe,g=Fe*Fe*this._dot4(s[Re],Vt,Ye,C,M)),27*(d+h+u+f+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,r){return e[0]*t+e[1]*i+e[2]*r}_dot4(e,t,i,r,s){return e[0]*t+e[1]*i+e[2]*r+e[3]*s}}class Gn extends Ei{constructor(e,t,i=512,r=512,s,a,o){super(),this.width=i,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=VM(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Ht(this.width,this.height,{type:Kt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new bt({defines:Object.assign({},ta.defines),uniforms:pn.clone(ta.uniforms),vertexShader:ta.vertexShader,fragmentShader:ta.fragmentShader,blending:Yt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new b0,this.normalMaterial.blending=Yt,this.pdMaterial=new bt({defines:Object.assign({},ia.defines),uniforms:pn.clone(ia.uniforms),vertexShader:ia.vertexShader,fragmentShader:ia.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new bt({defines:Object.assign({},na.defines),uniforms:pn.clone(na.uniforms),vertexShader:na.vertexShader,fragmentShader:na.fragmentShader,blending:Yt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new bt({uniforms:pn.clone(Ui.uniforms),vertexShader:Ui.vertexShader,fragmentShader:Ui.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:tl,blendDst:Kr,blendEquation:Pn,blendSrcAlpha:el,blendDstAlpha:Kr,blendEquationAlpha:Pn}),this.blendMaterial=new bt({uniforms:pn.clone(Go.uniforms),vertexShader:Go.vertexShader,fragmentShader:Go.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ih,blendSrc:tl,blendDst:Kr,blendEquation:Pn,blendSrcAlpha:el,blendDstAlpha:Kr,blendEquationAlpha:Pn}),this._fsQuad=new xs(null),this._originalClearColor=new Ue,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Fi,this.depthTexture.format=Mi,this.depthTexture.type=Sr,this.normalRenderTarget=new Ht(this.width,this.height,{minFilter:Ut,magFilter:Ut,type:Kt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const i=this.normalTexture?1:0,r=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Nf(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Gn.OUTPUT.Off:break;case Gn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Yt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Yt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Yt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Yt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Gn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Yt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new WM,i=e*e*4,r=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const c=a,l=o;r[(a*e+o)*4]=(t.noise(c,l)*.5+.5)*255,r[(a*e+o)*4+1]=(t.noise(c+e,l)*.5+.5)*255,r[(a*e+o)*4+2]=(t.noise(c,l+e)*.5+.5)*255,r[(a*e+o)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}const s=new us(r,e,e,mn,sn);return s.wrapS=Un,s.wrapT=Un,s.needsUpdate=!0,s}}Gn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const ra={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class XM extends Ei{constructor(){super(),this.isOutputPass=!0,this.uniforms=pn.clone(ra.uniforms),this.material=new Qh({name:ra.name,uniforms:this.uniforms,vertexShader:ra.vertexShader,fragmentShader:ra.fragmentShader}),this._fsQuad=new xs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===rc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===sc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ac?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===oc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Na?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===cc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===lc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class qM extends Ei{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ue}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const sa={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},aa={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Wo={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class YM extends Ei{constructor(){super(),this._edgesRT=new Ht(1,1,{depthBuffer:!1,type:Kt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Ht(1,1,{depthBuffer:!1,type:Kt}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new jt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=zt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new jt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=Ut,this._searchTexture.minFilter=Ut,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=pn.clone(sa.uniforms),this._materialEdges=new bt({defines:Object.assign({},sa.defines),uniforms:this._uniformsEdges,vertexShader:sa.vertexShader,fragmentShader:sa.fragmentShader}),this._uniformsWeights=pn.clone(aa.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new bt({defines:Object.assign({},aa.defines),uniforms:this._uniformsWeights,vertexShader:aa.vertexShader,fragmentShader:aa.fragmentShader}),this._uniformsBlend=pn.clone(Wo.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new bt({uniforms:this._uniformsBlend,vertexShader:Wo.vertexShader,fragmentShader:Wo.fragmentShader}),this._fsQuad=new xs(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const ZM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ue(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Tr extends Ei{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Se(e.x,e.y):new Se(256,256),this.clearColor=new Ue(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ht(s,a,{type:Kt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new Ht(s,a,{type:Kt});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const u=new Ht(s,a,{type:Kt});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}const o=ZM;this.highPassUniforms=pn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new bt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Se(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=pn.clone(Ui.uniforms),this.blendMaterial=new bt({uniforms:this.copyUniforms,vertexShader:Ui.vertexShader,fragmentShader:Ui.fragmentShader,premultipliedAlpha:!0,blending:wa,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ue,this._oldClearAlpha=1,this._basic=new Bt,this._fsQuad=new xs(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Se(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Tr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Tr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new bt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Se(.5,.5)},direction:{value:new Se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new bt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Tr.BlurDirectionX=new Se(1,0);Tr.BlurDirectionY=new Se(0,1);const KM={name:"HorizontalTiltShiftShader",uniforms:{tDiffuse:{value:null},h:{value:1/512},r:{value:.35}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float h;
		uniform float r;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			float hh = h * abs( r - vUv.y );

			sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;

			gl_FragColor = sum;

		}`},jM={name:"VerticalTiltShiftShader",uniforms:{tDiffuse:{value:null},v:{value:1/512},r:{value:.35}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float v;
		uniform float r;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			float vv = v * abs( r - vUv.y );

			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;

			gl_FragColor = sum;

		}`},JM=2,QM=4;class $M{renderer;scene;camera;maxPixelRatio;configuredPixelRatio;onFallback;composer=null;passes=[];width=1;height=1;pixelRatio=1;samples=0;mode="direct";gtaoEnabled=!1;bloomEnabled=!1;smaaEnabled=!1;tiltShiftEnabled=!1;horizontalTiltShift=null;verticalTiltShift=null;tiltShiftFocus=.48;tiltShiftStrength=3.4;fallbackReason=null;disposed=!1;constructor(e,t,i,r={}){this.renderer=e,this.scene=t,this.camera=i,this.maxPixelRatio=t2(r.maxPixelRatio??JM),this.configuredPixelRatio=Number.isFinite(r.pixelRatio)?r.pixelRatio:void 0,this.onFallback=r.onFallback;const s=e.getSize(new Se);this.width=oa(s.x),this.height=oa(s.y),this.pixelRatio=this.resolvePixelRatio(r.pixelRatio),this.createComposer(r),this.resize(this.width,this.height,this.pixelRatio)}render(e){if(!this.disposed){if(this.composer!==null)try{this.composer.render(e);return}catch(t){this.fallbackToDirect(t)}this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}}resize(e,t,i){if(!this.disposed&&(this.width=oa(e),this.height=oa(t),this.pixelRatio=this.resolvePixelRatio(i),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.composer!==null))try{this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(this.width,this.height),this.syncTiltShiftUniforms()}catch(r){this.fallbackToDirect(r)}}getStatus(){return{mode:this.mode,width:this.width,height:this.height,pixelRatio:this.pixelRatio,samples:this.samples,gtao:this.gtaoEnabled,bloom:this.bloomEnabled,smaa:this.smaaEnabled,tiltShift:this.tiltShiftEnabled,fallbackReason:this.fallbackReason}}dispose(){this.disposed||(this.disposed=!0,this.disposeComposer())}createComposer(e){if(!e2(this.renderer)){this.fallbackReason="Half-float color targets are unavailable.";return}const t=ch(e.samples??QM),i=ch(this.renderer.capabilities.maxSamples);this.samples=i>=2?Math.min(t,i):0,this.samples===1&&(this.samples=0);let r=null,s=null;const a=[];try{s=new Ht(1,1,{depthBuffer:!0,stencilBuffer:!1,type:Kt,minFilter:zt,magFilter:zt,samples:this.samples}),s.texture.name="PC Ultra half-float scene",s.texture.colorSpace=ns,r=new kM(this.renderer,s),r.setPixelRatio(this.pixelRatio),r.setSize(this.width,this.height);const o=new qM(this.scene,this.camera);if(r.addPass(o),a.push(o),e.gtao??!0){const l=new Gn(this.scene,this.camera,this.width*this.pixelRatio,this.height*this.pixelRatio);l.blendIntensity=.52,l.updateGtaoMaterial({radius:.2,thickness:1,distanceFallOff:1,samples:12,screenSpaceRadius:!0}),l.updatePdMaterial({rings:2,samples:8,radius:7}),r.addPass(l),a.push(l),this.gtaoEnabled=!0}if((e.tiltShift??!1)&&(this.tiltShiftFocus=It.clamp(Number.isFinite(e.tiltShiftFocus)?e.tiltShiftFocus:.48,.18,.82),this.tiltShiftStrength=It.clamp(Number.isFinite(e.tiltShiftStrength)?e.tiltShiftStrength:3.4,.5,8),this.horizontalTiltShift=new ql(KM),this.verticalTiltShift=new ql(jM),this.horizontalTiltShift.material.name="beauty-cell-horizontal-depth-separation",this.verticalTiltShift.material.name="beauty-cell-vertical-depth-separation",r.addPass(this.horizontalTiltShift),r.addPass(this.verticalTiltShift),a.push(this.horizontalTiltShift,this.verticalTiltShift),this.tiltShiftEnabled=!0,this.syncTiltShiftUniforms()),e.bloom??!0){const l=new Tr(new Se(this.width*this.pixelRatio,this.height*this.pixelRatio),.22,.18,1.15);r.addPass(l),a.push(l),this.bloomEnabled=!0}if(e.smaa??!0){const l=new YM;r.addPass(l),a.push(l),this.smaaEnabled=!0}const c=new XM;r.addPass(c),a.push(c),this.composer=r,this.passes=a,this.mode=this.samples>0?"half-float-msaa":"half-float"}catch(o){r===null&&s?.dispose(),uh(r,a),this.resetFeatureStatus(),this.fallbackReason=dh(o),this.onFallback?.(o)}}resolvePixelRatio(e){const t=typeof window>"u"?1:window.devicePixelRatio||1,i=e??this.configuredPixelRatio??t;return It.clamp(Number.isFinite(i)?i:1,1,this.maxPixelRatio)}fallbackToDirect(e){this.fallbackReason=dh(e),this.disposeComposer(),this.resetFeatureStatus(),this.renderer.resetState(),this.renderer.setRenderTarget(null),this.onFallback?.(e)}disposeComposer(){uh(this.composer,this.passes),this.composer=null,this.passes=[],this.horizontalTiltShift=null,this.verticalTiltShift=null}resetFeatureStatus(){this.mode="direct",this.samples=0,this.gtaoEnabled=!1,this.bloomEnabled=!1,this.smaaEnabled=!1,this.tiltShiftEnabled=!1}syncTiltShiftUniforms(){if(this.horizontalTiltShift===null||this.verticalTiltShift===null)return;const e=Math.max(1,this.width*this.pixelRatio),t=Math.max(1,this.height*this.pixelRatio);this.horizontalTiltShift.uniforms.h.value=this.tiltShiftStrength/e,this.horizontalTiltShift.uniforms.r.value=this.tiltShiftFocus,this.verticalTiltShift.uniforms.v.value=this.tiltShiftStrength/t,this.verticalTiltShift.uniforms.r.value=this.tiltShiftFocus}}function e2(n){return n.capabilities.isWebGL2&&n.extensions.has("EXT_color_buffer_float")}function t2(n){return Number.isFinite(n)?Math.max(1,n):1}function oa(n){return Number.isFinite(n)?Math.max(1,Math.round(n)):1}function ch(n){return Number.isFinite(n)?Math.max(0,Math.floor(n)):0}function dh(n){return n instanceof Error?n.message:"Post-processing initialization or rendering failed."}function uh(n,e){for(const t of e)try{t.dispose()}catch{}try{n?.dispose()}catch{}}const n2="./assets/reclaimed-meadow-v1-CgTL2cqk.webp",la=854,_i=480,i2=600,r2=360,s2=390,a2=.98,o2=.92,l2=1075,hh=new D(_a.x,_a.y,_a.z),Uf=2.1,zf=2,fh=4,c2=3.4,ca=64,d2=14148051,Xo=ka(Dr,"weapon",Va),Yl=ka(Ha,"grip",Uf),Zl=ka(Ga,"grip",zf),da=new D;class u2{renderer;qualityProfile;environmentProfile;cameraCompositionProfile;cameraViewHeight;ultraPipeline=null;scene=new Xh;camera;environmentArt;cameraTarget=new D;playerGroup=new nt;playerBody;playerHeroVisual;bladeMesh;impactMesh;playerShadow;companionGroup=new nt;companionBody;companionBeautyVisual;companionShadow;enemyVisuals=new Map;lootVisuals=new Map;ringEffects=[];burstEffects=[];targetRing;windupRing;reusableMatrix=new it;reusablePosition=new D;reusableQuaternion=new zn;reusableScale=new D(1,1,1);keyLight=new uu(16771261,2.45);keyLightTarget=new Pt;effectLight=new hs(6415825,0,390,2);contextLostHandler;contextRestoredHandler;environmentTarget=null;groundTexture=null;attackAnimation=0;attackWeapon="blade";effectLightEnergy=0;internalRenderWidth=la;internalRenderHeight=_i;viewportCssWidth=0;viewportCssHeight=0;resizeObserver=null;windowResizeHandler=null;companionInitialized=!1;companionReaction=0;cameraTrauma=0;heroHurtAnimation=0;heroSkillAnimation=0;lastPlayerX=null;lastPlayerY=null;elapsed=0;disposed=!1;constructor(e,t,i={}){this.qualityProfile=i.qualityProfile??"baseline",this.environmentProfile=i.environmentProfile??"start-town",this.cameraCompositionProfile=i.cameraCompositionProfile??"baseline",this.cameraViewHeight=this.environmentProfile==="beauty-cell"?s2:this.qualityProfile==="pc-ultra"?r2:i2,this.renderer=new Iy({antialias:!0,alpha:!1,depth:!0,powerPreference:"high-performance",precision:"highp",preserveDrawingBuffer:!1}),SM(this.renderer,this.environmentProfile==="beauty-cell"?o2:this.qualityProfile==="pc-ultra"?a2:void 0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qr,this.renderer.setPixelRatio(this.qualityProfile==="pc-ultra"?Math.min(2,Math.max(1,window.devicePixelRatio||1)):1),this.renderer.setSize(la,_i,!1),this.renderer.domElement.dataset.testid="game-canvas",this.renderer.domElement.dataset.antialias=this.renderer.getContextAttributes().antialias===!0?"msaa":"none",this.renderer.domElement.dataset.qualityProfile=this.qualityProfile,this.renderer.domElement.dataset.cameraCompositionProfile=this.cameraCompositionProfile,this.renderer.domElement.dataset.environmentProfile=this.environmentProfile,this.renderer.domElement.setAttribute("aria-label","辺境遺物録 ボクセルゲーム画面"),e.append(this.renderer.domElement),this.contextLostHandler=a=>{a.preventDefault(),i.onContextLost?.()},this.contextRestoredHandler=()=>{this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting(),i.onContextRestored?.()},this.renderer.domElement.addEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.addEventListener("webglcontextrestored",this.contextRestoredHandler);const r=this.environmentProfile==="beauty-cell"?11125949:d2;this.scene.background=new Ue(r),this.scene.fog=new Mc(r,this.environmentProfile==="beauty-cell"?1020:this.qualityProfile==="pc-ultra"?1140:900,this.environmentProfile==="beauty-cell"?2340:this.qualityProfile==="pc-ultra"?2700:2450),this.createLighting(),this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting();const s=this.cameraViewHeight*(la/_i);if(this.camera=new fs(-s/2,s/2,this.cameraViewHeight/2,-this.cameraViewHeight/2,1,3200),this.initializeViewportSync(e),this.qualityProfile==="pc-ultra"&&(this.ultraPipeline=new $M(this.renderer,this.scene,this.camera,{maxPixelRatio:2,samples:4,gtao:!0,bloom:!0,smaa:!0,tiltShift:this.environmentProfile==="beauty-cell",tiltShiftFocus:.49,tiltShiftStrength:3.7,onFallback:a=>{this.renderer.domElement.dataset.ultraFallback=a instanceof Error?a.message:"post-processing"}}),this.ultraPipeline.resize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.syncUltraPipelineDataset()),this.createGround(t),this.environmentArt=this.environmentProfile==="beauty-cell"?fM():this.environmentProfile==="north-star-city"?K_():A_(),this.scene.add(this.environmentArt.group),this.environmentProfile==="beauty-cell"){this.renderer.domElement.dataset.visualGrammar="concept-c-fixed-diagonal",this.renderer.domElement.dataset.generationMode="deterministic-spec-compiler";const a=this.environmentArt.group.userData.stableId;typeof a=="string"&&(this.renderer.domElement.dataset.beautyCellId=a)}if(this.environmentProfile!=="beauty-cell"&&this.createFieldGrowth(t,this.environmentArt.replacedTerrainIds),this.createTerrain(t,this.environmentArt.replacedTerrainIds),this.createProps(t,this.environmentArt.replacedPropIds),this.createLandmarkSignals(t),this.playerBody=ph(Dr,Va),this.playerGroup.add(this.playerBody),this.playerBody.castShadow=!0,this.playerBody.receiveShadow=!0,this.playerHeroVisual=this.environmentProfile==="beauty-cell"?NM():this.qualityProfile==="pc-ultra"?DM({mode:"articulated"}):null,this.playerHeroVisual!==null&&(this.playerBody.visible=!1,this.environmentProfile==="beauty-cell"&&this.playerHeroVisual.root.scale.setScalar(1.28),this.playerGroup.add(this.playerHeroVisual.root)),this.environmentProfile==="beauty-cell")this.bladeMesh=oh("blade"),this.impactMesh=oh("impact");else{const a=Wr(Ha,Uf,1),o=Wr(Ga,zf,1);xh(a,"blade"),xh(o,"impact"),this.bladeMesh=a,this.impactMesh=o}this.bladeMesh.castShadow=!0,this.impactMesh.castShadow=!0,this.playerHeroVisual!==null?(this.playerHeroVisual.attachWeapon(this.bladeMesh,this.environmentProfile==="beauty-cell"?{x:0,y:0,z:0}:Yl),this.playerHeroVisual.attachWeapon(this.impactMesh,this.environmentProfile==="beauty-cell"?{x:0,y:0,z:0}:Zl)):this.playerGroup.add(this.bladeMesh,this.impactMesh),this.playerShadow=Xr(38,22,.32),this.playerGroup.add(this.playerShadow),this.scene.add(this.playerGroup),this.targetRing=mh(6415825,.76),this.windupRing=mh(16034128,.92),this.targetRing.visible=!1,this.windupRing.visible=!1,this.scene.add(this.targetRing,this.windupRing),this.companionBody=ph(zc,_f),this.companionBody.castShadow=!0,this.companionBody.receiveShadow=!0,this.companionBeautyVisual=this.environmentProfile==="beauty-cell"?UM():null,this.companionBeautyVisual!==null&&(this.companionBody.visible=!1,this.companionGroup.add(this.companionBeautyVisual.root)),this.companionShadow=Xr(24,15,.24),this.companionGroup.name="visual-only-companion",this.companionGroup.add(this.companionBody,this.companionShadow),this.companionGroup.visible=i.companionPreview===!0,this.scene.add(this.companionGroup),this.syncEnemies(t),this.syncLoot(t),this.snapCamera(t),this.update(t,[],0,0)}update(e,t,i,r,s){if(this.disposed)return;const a=Math.min(.05,Math.max(0,r/1e3));this.elapsed+=a,this.handleEvents(t),this.syncPlayer(e,a,s),this.syncCompanion(e,a),this.syncEnemies(e),this.syncCombatPresentation(e,s),this.syncLoot(e),this.updateEffects(a),this.updateCamera(e,a,s),this.updateAmbientMotion(e,i/1e3),this.ultraPipeline!==null?(this.ultraPipeline.render(a),this.syncUltraPipelineDataset()):this.renderer.render(this.scene,this.camera)}initializeViewportSync(e){if(this.updateViewportSize(e.clientWidth,e.clientHeight),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(t=>{const i=t.find(r=>r.target===e);i!==void 0&&this.updateViewportSize(i.contentRect.width,i.contentRect.height)}),this.resizeObserver.observe(e);return}typeof window<"u"&&(this.windowResizeHandler=()=>{this.updateViewportSize(e.clientWidth,e.clientHeight)},window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}updateViewportSize(e,t){if(this.disposed||e<=0||t<=0||Math.abs(e-this.viewportCssWidth)<.5&&Math.abs(t-this.viewportCssHeight)<.5)return;this.viewportCssWidth=e,this.viewportCssHeight=t;const i=It.clamp(e/t,16/9,2.24);if(this.qualityProfile==="pc-ultra"){const a=Math.min(2,Math.max(1,window.devicePixelRatio||1));this.ultraPipeline!==null?this.ultraPipeline.resize(e,t,a):(this.renderer.setPixelRatio(a),this.renderer.setSize(Math.max(1,Math.round(e)),Math.max(1,Math.round(t)),!1)),this.internalRenderWidth=Math.max(1,Math.round(e*a)),this.internalRenderHeight=Math.max(1,Math.round(t*a));const o=this.cameraViewHeight*i;this.camera.left=-o/2,this.camera.right=o/2,this.camera.updateProjectionMatrix(),this.renderer.domElement.dataset.internalResolution=`${this.internalRenderWidth}x${this.internalRenderHeight}`,this.syncUltraPipelineDataset();return}const r=It.clamp(Math.round(_i*i),la,l2);if(r===this.internalRenderWidth)return;this.internalRenderWidth=r,this.internalRenderHeight=_i,this.renderer.setSize(r,_i,!1),this.renderer.domElement.dataset.internalResolution=`${r}x${_i}`;const s=this.cameraViewHeight*(r/_i);this.camera.left=-s/2,this.camera.right=s/2,this.camera.updateProjectionMatrix()}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,width:this.internalRenderWidth,height:this.internalRenderHeight}}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.domElement.removeEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.removeEventListener("webglcontextrestored",this.contextRestoredHandler),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.windowResizeHandler!==null&&typeof window<"u"&&(window.removeEventListener("resize",this.windowResizeHandler),this.windowResizeHandler=null),this.environmentArt.dispose(),this.ultraPipeline?.dispose(),this.ultraPipeline=null,this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,this.groundTexture?.dispose(),this.groundTexture=null;const e=new Set,t=new Set;this.scene.traverse(i=>{if(i instanceof jr&&i.dispose(),i instanceof ze||i instanceof jr||i instanceof So){e.add(i.geometry);const r=i.material;Array.isArray(r)?r.forEach(s=>t.add(s)):t.add(r)}}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}syncUltraPipelineDataset(){if(this.ultraPipeline===null)return;const e=this.ultraPipeline.getStatus();this.renderer.domElement.dataset.ultraPipeline=e.mode,this.renderer.domElement.dataset.ultraGtao=String(e.gtao),this.renderer.domElement.dataset.ultraBloom=String(e.bloom),this.renderer.domElement.dataset.ultraSmaa=String(e.smaa),this.renderer.domElement.dataset.ultraTiltShift=String(e.tiltShift),this.renderer.domElement.dataset.ultraSamples=String(e.samples),e.fallbackReason===null?delete this.renderer.domElement.dataset.ultraFallback:this.renderer.domElement.dataset.ultraFallback=e.fallbackReason}createLighting(){const e=new L0(this.environmentProfile==="beauty-cell"?16773834:16183506,this.environmentProfile==="beauty-cell"?1523252:3496515,this.environmentProfile==="beauty-cell"?.34:this.qualityProfile==="pc-ultra"?.42:1.55);e.name="daylight-sky-fill",this.keyLight.color.setHex(this.environmentProfile==="beauty-cell"?16769200:16771261),this.keyLight.intensity=this.environmentProfile==="beauty-cell"?2.52:this.qualityProfile==="pc-ultra"?2.68:2.45,this.keyLight.name="daylight-key",this.keyLight.position.set(this.environmentProfile==="beauty-cell"?-180:40,this.environmentProfile==="beauty-cell"?890:820,this.environmentProfile==="beauty-cell"?140:360),this.keyLightTarget.name="daylight-key-target",this.keyLightTarget.position.set(390,0,900),this.keyLight.target=this.keyLightTarget,this.keyLight.castShadow=!0;const t=this.qualityProfile==="pc-ultra"?2048:512;if(this.keyLight.shadow.mapSize.set(t,t),this.keyLight.shadow.bias=-.0012,this.keyLight.shadow.normalBias=this.environmentProfile==="beauty-cell"?.82:1.4,this.keyLight.shadow.camera.left=-460,this.keyLight.shadow.camera.right=460,this.keyLight.shadow.camera.top=460,this.keyLight.shadow.camera.bottom=-460,this.keyLight.shadow.camera.near=160,this.keyLight.shadow.camera.far=1420,this.effectLight.name="signal-effect-light",this.effectLight.position.set(430,58,900),this.scene.add(e,this.keyLightTarget,this.keyLight,this.effectLight),this.qualityProfile==="pc-ultra"){const i=new Pt;i.name="daylight-rim-target",i.position.set(430,24,860);const r=new uu(this.environmentProfile==="beauty-cell"?9165265:11134687,this.environmentProfile==="beauty-cell"?.48:.62);r.name="daylight-cool-rim",r.position.set(-360,420,-280),r.target=i,this.scene.add(i,r)}}createEnvironmentLighting(){this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,delete this.renderer.domElement.dataset.environmentLightingFallback;const e=new Ny,t=new Vl(this.renderer);try{this.environmentTarget=t.fromScene(e,.04),this.scene.environment=this.environmentTarget.texture,this.scene.environmentIntensity=this.environmentProfile==="beauty-cell"?.19:.26,this.renderer.domElement.dataset.environmentLighting="pmrem-ibl"}catch(i){this.renderer.domElement.dataset.environmentLighting="direct-light-fallback",this.renderer.domElement.dataset.environmentLightingFallback=i instanceof Error?i.message:"pmrem-generation"}finally{e.dispose(),t.dispose()}}createGround(e){const i=e.world.width+480,r=-240,s=e.world.height+240,a=i- -480,o=s-r,c=Math.ceil(a/ca),l=Math.ceil(o/ca),d=[],h=[],u=[],f=[],g=new Ue,x=new Ue(16777215);for(let b=0;b<=l;b+=1){const A=Math.min(s,r+b*ca);for(let v=0;v<=c;v+=1){const E=Math.min(i,-480+v*ca),R=gh(v+401,b+809,17),P=-3.8+((R>>>9&255)/255-.5)*2.2;d.push(E,P,A),u.push((E- -480)/a,1-(A-r)/o),g.setHex(v2(E,A,b*(c+1)+v)),g.offsetHSL(((R>>>19&15)/15-.5)*.012,((R>>>4&15)/15-.5)*.035,((R>>>13&15)/15-.5)*.055),g.lerp(x,this.environmentProfile==="beauty-cell"?.24:.72),h.push(g.r,g.g,g.b)}}for(let b=0;b<l;b+=1)for(let A=0;A<c;A+=1){const v=b*(c+1)+A,E=v+1,R=v+c+1,P=R+1;(b+A)%2===0?f.push(v,R,E,E,R,P):f.push(v,R,P,v,P,E)}const m=new St;m.setAttribute("position",new Ge(d,3)),m.setAttribute("color",new Ge(h,3)),m.setAttribute("uv",new Ge(u,2)),m.setIndex(f),m.computeVertexNormals(),m.computeBoundingBox(),m.computeBoundingSphere();const p=new _t({color:16777215,vertexColors:!0,roughness:.96,metalness:0,dithering:!0}),_=b=>{b.name="generated-reclaimed-meadow-v1",b.colorSpace=Zt,b.wrapS=Un,b.wrapT=Un,b.repeat.set(a/720,o/720),b.minFilter=si,b.magFilter=zt,b.anisotropy=this.qualityProfile==="pc-ultra"?this.renderer.capabilities.getMaxAnisotropy():Math.min(4,this.renderer.capabilities.getMaxAnisotropy())};this.renderer.domElement.dataset.groundTexture="loading";const S=new P0().load(n2,b=>{if(this.disposed){b.dispose();return}_(b),this.groundTexture=b,p.map=b,p.color.setHex(16777215),p.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="ready"},void 0,()=>{this.groundTexture?.dispose(),this.groundTexture=null,!this.disposed&&(p.map=null,p.color.setHex(10991757),p.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="fallback")});_(S),this.groundTexture=S,p.map=S;const y=new ze(m,p);y.name="continuous-reclaimed-ground",y.receiveShadow=!0,this.scene.add(y);const w=new So(new ru(new on(e.world.width,8,e.world.height)),new kl({color:6458738,transparent:!0,opacity:.12}));w.position.set(e.world.width/2,-7,e.world.height/2),this.scene.add(w)}createFieldGrowth(e,t=new Set){const r=Math.ceil(e.world.width/142),s=Math.ceil(e.world.height/142),a=[],o=(m,p,_,S,y=1,w=1,b=1)=>{a.push({x:m,y:p,z:_,rotation:(S>>>8)%16*(Math.PI/8),scaleX:y*(.78+(S>>>3)%7*.055),scaleY:b*(.82+(S>>>19)%6*.06),scaleZ:w*(.8+(S>>>13)%7*.05)})};for(let m=0;m<s;m+=1)for(let p=0;p<r;p+=1){const _=(Math.imul(p+11,73856093)^Math.imul(m+17,19349663))>>>0;if(_%100>15)continue;const S=(p+.5)*142+((_>>>3&255)/255-.5)*52,y=(m+.5)*142+((_>>>11&255)/255-.5)*52;S<24||y<24||S>e.world.width-24||y>e.world.height-24||Math.abs(y-900)<88||e.world.terrain.some(w=>S>w.bounds.x-10&&S<w.bounds.x+w.bounds.width+10&&y>w.bounds.y-10&&y<w.bounds.y+w.bounds.height+10)||o(S,.8,y,_,.84+(_>>>21)%4*.1,.82+(_>>>25)%4*.1,.82)}if(e.world.terrain.forEach((m,p)=>{if(t.has(m.id))return;const _=m.bounds,S=_.x,y=_.x+_.width,w=_.y,b=_.y+_.height,A=S+_.width/2,v=w+_.height/2,E=gh(p+31,_.x,_.y);switch(m.kind){case"building":{const R=m.height+10.5;o(S+_.width*.2,R,w+_.height*.22,E,1.25,1,.78),o(y-_.width*.16,R,b-_.height*.2,E^1540483477,1.38,.92,.9),o(A+_.width*.08,R,b-_.height*.1,E^3550635116,2.05,.7,.52),o(S-3,.8,v-_.height*.2,E^668265261,1.15,1.32),o(y+2,.8,v+_.height*.22,E^374761393,1.1,1.26);break}case"wall":{const R=_.width>=_.height;for(let P=0;P<3;P+=1){const L=.16+P*.34,F=E^Math.imul(P+7,73244475);o(R?S+_.width*L:A,m.height+.8,R?v:w+_.height*L,F,R?1.42:.82,R?.82:1.42,.72)}o(R?A+_.width*.26:S-3,.8,R?b+2:v+_.height*.2,E^2654435769,R?1.25:.94,R?.94:1.25);break}case"pillar":o(A,m.height+.8,v,E,1.02,1.02,.72),o(y+1,.8,b-_.height*.12,E^2135587861,1.2,1.2);break;case"rock":o(A+_.width*.25,m.height+.8,v+_.height*.3,E,1.28,1.14,.9);break;case"water":{[[S+_.width*.12,w-2,!1],[S+_.width*.48,w-4,!1],[y-_.width*.12,w+1,!0],[y+2,w+_.height*.28,!1],[y-1,b-_.height*.18,!0],[S+_.width*.64,b+2,!1],[S+_.width*.26,b-1,!0],[S-3,w+_.height*.54,!1]].forEach(([P,L,F],B)=>{o(P,F?m.height+.5:.8,L,E^Math.imul(B+13,668265261),1.02,1.24,.92)});break}}}),a.length===0)return;const c=p2(),l=new _t({color:16777215,vertexColors:!0,roughness:.88,metalness:0}),d=new jr(c,l,a.length),h=new it,u=new D,f=new zn,g=new D,x=new D(0,1,0);a.forEach((m,p)=>{u.set(m.x,m.y,m.z),f.setFromAxisAngle(x,m.rotation),g.set(m.scaleX,m.scaleY,m.scaleZ),h.compose(u,f,g),d.setMatrixAt(p,h)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.name="reclaiming-growth",d.receiveShadow=!0,this.scene.add(d)}createTerrain(e,t=new Set){const i={building:new _t({color:11119246,roughness:.92}),wall:new _t({color:9737866,roughness:.96}),rock:new _t({color:8360315,roughness:.98}),pillar:new _t({color:9799578,roughness:.9}),water:new _t({color:5083553,transparent:!0,opacity:.82,roughness:.28,metalness:.04})};for(const r of e.world.terrain){if(t.has(r.id))continue;const s=new on(r.bounds.width,r.height,r.bounds.height),a=new ze(s,i[r.kind]);if(a.position.set(r.bounds.x+r.bounds.width/2,r.height/2,r.bounds.y+r.bounds.height/2),a.name=r.id,a.receiveShadow=r.kind!=="water",a.castShadow=r.kind==="building"||r.kind==="wall"||r.kind==="pillar",this.scene.add(a),r.kind!=="water"){const o=new So(new ru(s),new kl({color:r.kind==="pillar"?7362427:6450525,transparent:!0,opacity:.34}));o.position.copy(a.position),this.scene.add(o)}if(r.kind==="building"){const o=new ze(new on(r.bounds.width+18,10,r.bounds.height+18),new _t({color:12020809,roughness:.86}));o.position.set(a.position.x,r.height+5,a.position.z),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o)}}}createProps(e,t=new Set){for(const i of e.world.props){if(t.has(i.id))continue;const r=x2(i.kind),s=Wr(r,c2,1),a=new nt;a.position.set(i.x,0,i.y),a.rotation.y=i.rotation,a.add(s,Xr(28,17,.24)),i.kind==="lamp"?a.scale.setScalar(.72):i.kind==="signpost"?a.scale.set(.62,.78,.62):i.kind==="relay"&&a.scale.setScalar(1.18),a.name=i.id,this.scene.add(a)}}createLandmarkSignals(e){const t=[6415825,16034128,8546725];e.world.landmarks.forEach((i,r)=>{const s=new Bt({color:t[r]??6415825,transparent:!0,opacity:.12,side:rn,depthWrite:!1}),a=new ze(new Ii(54,59,40),s);a.rotation.x=-Math.PI/2,a.position.set(i.center.x,2,i.center.y),a.name=`landmark-${i.id}`,this.scene.add(a)})}syncPlayer(e,t,i){const r=e.player,s=this.lastPlayerX===null||this.lastPlayerY===null?0:Math.hypot(r.x-this.lastPlayerX,r.y-this.lastPlayerY);this.lastPlayerX=r.x,this.lastPlayerY=r.y,this.playerGroup.position.x=r.x,this.playerGroup.position.z=r.y,this.playerGroup.position.y=Math.sin(this.elapsed*5.2)*.6,this.playerGroup.rotation.y=Math.atan2(-r.facingX,-r.facingY),this.bladeMesh.visible=r.weaponId==="blade",this.impactMesh.visible=r.weaponId==="impact",this.attackAnimation=Math.max(0,this.attackAnimation-t*4.8);const a=1-this.attackAnimation,o=this.attackAnimation>0?Math.sin(a*Math.PI)*(this.attackWeapon==="impact"?1.42:1.05):0;this.environmentProfile==="beauty-cell"?(this.bladeMesh.rotation.set(0,0,0),this.impactMesh.rotation.set(0,0,0)):(this.bladeMesh.rotation.z=-.42-o,this.impactMesh.rotation.z=-.28-o);const c=r.invulnerableTicks>0&&e.tick%2===0?12124148:16777215;if(this.playerHeroVisual===null){this.bladeMesh instanceof ze&&this.impactMesh instanceof ze&&(Kl(this.bladeMesh,"blade"),Kl(this.impactMesh,"impact")),f2(this.playerBody,c);return}Da(this.bladeMesh,this.environmentProfile==="beauty-cell"?{x:0,y:0,z:0}:Yl),Da(this.impactMesh,this.environmentProfile==="beauty-cell"?{x:0,y:0,z:0}:Zl),this.heroHurtAnimation=Math.max(0,this.heroHurtAnimation-t*3.8),this.heroSkillAnimation=Math.max(0,this.heroSkillAnimation-t*1.45);const l=t>Number.EPSILON?It.clamp(s/t/118,0,1):0,d=m2(i,this.heroHurtAnimation,this.heroSkillAnimation,this.attackAnimation,l);this.playerHeroVisual.updatePose({motion:d.motion,timeSeconds:this.elapsed,progress:d.progress,moveAmount:l}),this.playerHeroVisual.setTint(c)}syncCompanion(e,t){const i=e.player,r=Math.hypot(i.facingX,i.facingY),s=r>Number.EPSILON?i.facingX/r:0,a=r>Number.EPSILON?i.facingY/r:-1,o=i.x-s*32-a*38,c=i.y-a*32+s*38,l=(this.companionGroup.position.x-o)**2+(this.companionGroup.position.z-c)**2;if(!this.companionInitialized||l>140**2)this.companionGroup.position.x=o,this.companionGroup.position.z=c,this.companionInitialized=!0;else{const h=1-Math.exp(-6.4*t);this.companionGroup.position.x=It.lerp(this.companionGroup.position.x,o,h),this.companionGroup.position.z=It.lerp(this.companionGroup.position.z,c,h)}this.companionGroup.position.y=1.2+Math.sin(this.elapsed*4.4+.8)*.7,this.companionGroup.rotation.y=Math.atan2(-s,-a),this.companionReaction=Math.max(0,this.companionReaction-t*2.6);const d=1+Math.sin((1-this.companionReaction)*Math.PI*3)*this.companionReaction*.045;this.companionGroup.scale.setScalar(d*(this.environmentProfile==="beauty-cell"?1.08:1)),this.companionBeautyVisual?.updatePose({timeSeconds:this.elapsed,moveAmount:It.clamp(Math.sqrt(l)/72,0,1),reaction:this.companionReaction})}syncEnemies(e){const t=new Set;for(const i of e.enemies){t.add(i.id);let r=this.enemyVisuals.get(i.id);if(r===void 0&&(r=this.createEnemyVisual(i),this.enemyVisuals.set(i.id,r),this.scene.add(r.group)),r.group.visible=!i.defeated||i.kind==="named-anomaly",r.group.position.set(i.x,r.baseY,i.y),r.group.rotation.y=Math.atan2(-(e.player.x-i.x),-(e.player.y-i.y)),r.group.scale.setScalar(i.disposition==="calmed"||i.disposition==="connected"?.92:i.defeated?.28:1),r.body.material.opacity=i.disposition==="connected"?.62:1,r.body.material.transparent=i.disposition==="connected",r.telegraph.visible=i.attack.phase==="telegraph",r.telegraph.visible){const s=Ar[i.kind],a=1+Math.sin(i.attack.ticksRemaining/Math.max(1,s.telegraphTicks)*Math.PI*2)*.08;r.telegraph.scale.setScalar(a*((s.attackRange+i.radius)/58)),r.telegraph.material.opacity=.34+(1-i.attack.ticksRemaining/Math.max(1,s.telegraphTicks))*.5}}for(const[i,r]of this.enemyVisuals)t.has(i)||(r.group.visible=!1)}syncCombatPresentation(e,t){if(t===void 0||t.targetId===null){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const i=e.enemies.find(a=>a.id===t.targetId&&!a.defeated);if(i===void 0){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const r=Math.max(24,i.radius*1.45);this.targetRing.visible=!0,this.targetRing.position.set(i.x,2.8,i.y),this.targetRing.scale.setScalar(r/30),this.targetRing.material.color.setHex(e.player.weaponId==="blade"?6415825:16034128),this.targetRing.material.opacity=.56+Math.sin(this.elapsed*6)*.12;const s=t.phase==="windup";if(this.windupRing.visible=s,s){this.windupRing.position.set(i.x,3,i.y);const a=Math.max(.05,1-t.progress);this.windupRing.scale.setScalar(r/30*(1.6*a+.72)),this.windupRing.material.opacity=.3+t.progress*.66}}createEnemyVisual(e){const t=g2(e.kind),i=Wr(t,e.kind==="named-anomaly"?fh*1.15:fh,1),r=new nt,s=new ze(new Ii(43,54,32),new Bt({color:15548468,transparent:!0,opacity:.48,side:rn,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=3,s.visible=!1,r.add(i,Xr(e.kind==="named-anomaly"?54:34,e.kind==="named-anomaly"?31:20,.26),s),{group:r,body:i,telegraph:s,baseY:e.kind==="murmur"?16:0}}syncLoot(e){for(const t of e.world.loot){let i=this.lootVisuals.get(t.id);if(i===void 0){const r=Wr(ms,1.55,1);i=new nt,i.add(r,Xr(17,10,.2)),i.position.set(t.x,4,t.y),i.scale.setScalar(.68),i.name=t.id,this.lootVisuals.set(t.id,i),this.scene.add(i)}i.visible=!t.picked}}handleEvents(e){for(const t of e)switch(t.type){case"player-attacked":this.attackAnimation=1,this.attackWeapon=t.weaponId,this.addAttackRing(t),this.pulseEffectLight(t.x,t.y,t.weaponId==="blade"?16770220:16034128,t.weaponId==="blade"?.58:.82);break;case"enemy-damaged":{this.cameraTrauma=Math.min(1,this.cameraTrauma+(t.source==="impact"?.82:t.source==="relic"?.66:.28));const i=this.enemyVisuals.get(t.enemyId);i!==void 0&&(this.addBurst(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:15195581,t.source==="impact"?13:8),this.pulseEffectLight(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:16770220,t.source==="relic"?1:.62));break}case"player-damaged":this.heroHurtAnimation=1,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,15291461,10),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,16735304,.9);break;case"guard-resolved":this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:15195581,22,34,.28,1.8),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:16770220,t.justGuard?.92:.5);break;case"relic-activated":this.heroSkillAnimation=1,this.companionReaction=1,this.addRing(t.x,t.y,6415825,t.radius*.76,t.radius*.82,.62,1.36),this.addRing(t.x,t.y,13041651,t.radius*.38,t.radius*.42,.44,1.82),this.addBurst(t.x,t.y,10287336,16),this.pulseEffectLight(t.x,t.y,6415825,1);break;case"loot-picked":this.companionReaction=.82,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,6415825,9),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,6415825,.72);break;case"anomaly-resolved":this.companionReaction=1,this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?15291461:t.outcome==="calm"?16034128:6415825,36,250,1.1,2.4),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?16735304:t.outcome==="calm"?16034128:6415825,1);break}}pulseEffectLight(e,t,i,r){this.effectLight.position.set(e,54,t),this.effectLight.color.setHex(i),this.effectLightEnergy=Math.max(this.effectLightEnergy,r)}addAttackRing(e){const t=Math.atan2(e.directionY,e.directionX),i=e.weaponId==="blade"?15195581:16034128,r=e.weaponId==="blade"?e.range*.52:20,s=e.weaponId==="blade"?e.range:e.range*1.15,a=new Ii(r,s,24,1,-.72,1.44),o=new Bt({color:i,transparent:!0,opacity:.66,side:rn,depthWrite:!1}),c=new ze(a,o);c.rotation.x=-Math.PI/2,c.rotation.z=t,c.position.set(e.x,8,e.y),this.scene.add(c),this.ringEffects.push({mesh:c,age:0,duration:e.weaponId==="blade"?.18:.3,grow:e.weaponId==="blade"?1.05:1.25})}addRing(e,t,i,r,s,a,o){const c=new ze(new Ii(r,s,40),new Bt({color:i,transparent:!0,opacity:.56,side:rn,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set(e,7,t),this.scene.add(c),this.ringEffects.push({mesh:c,age:0,duration:a,grow:o})}addBurst(e,t,i,r){const s=new on(8,8,8),a=new Bt({color:i}),o=new jr(s,a,r),c=[],l=[];for(let d=0;d<r;d+=1){const h=d/r*Math.PI*2+d%3*.19,u=70+d%4*17;c.push(new D(e,28,t)),l.push(new D(Math.cos(h)*u,70+d%5*14,Math.sin(h)*u)),this.reusableMatrix.makeTranslation(e,28,t),o.setMatrixAt(d,this.reusableMatrix)}o.instanceMatrix.needsUpdate=!0,this.scene.add(o),this.burstEffects.push({mesh:o,positions:c,velocities:l,age:0,duration:.5})}updateEffects(e){this.effectLightEnergy=Math.max(0,this.effectLightEnergy-e*3.8),this.effectLight.intensity=this.effectLightEnergy*this.effectLightEnergy*155;for(let t=this.ringEffects.length-1;t>=0;t-=1){const i=this.ringEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration),s=1+r*(i.grow-1);i.mesh.scale.setScalar(s),i.mesh.material.opacity=(1-r)*.56,r>=1&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.ringEffects.splice(t,1))}for(let t=this.burstEffects.length-1;t>=0;t-=1){const i=this.burstEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration);for(let s=0;s<i.positions.length;s+=1){const a=i.positions[s],o=i.velocities[s];a===void 0||o===void 0||(o.y-=260*e,a.addScaledVector(o,e),this.reusablePosition.copy(a),this.reusableScale.setScalar(Math.max(.05,1-r)),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),i.mesh.setMatrixAt(s,this.reusableMatrix))}i.mesh.instanceMatrix.needsUpdate=!0,r>=1&&(this.scene.remove(i.mesh),i.mesh.dispose(),i.mesh.geometry.dispose(),y2(i.mesh.material),this.burstEffects.splice(t,1))}}snapCamera(e){const t=$u({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:"idle"},this.cameraCompositionProfile);this.cameraTarget.set(t.targetX+(this.environmentProfile==="beauty-cell"?-42:0),28,t.targetY+(this.environmentProfile==="beauty-cell"?-54:0)),this.renderer.domElement.dataset.cameraComposition=t.mode,this.camera.position.copy(this.cameraTarget).add(hh),this.camera.lookAt(this.cameraTarget),this.camera.updateProjectionMatrix()}updateCamera(e,t,i){const r=i?.targetId===null||i?.targetId===void 0?void 0:e.enemies.find(l=>l.id===i.targetId),s=$u({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:i?.phase??"idle",targetX:r?.x,targetY:r?.y},this.cameraCompositionProfile);this.renderer.domElement.dataset.cameraComposition=s.mode;const a=1-Math.exp(-8*t);this.cameraTarget.lerp(this.reusablePosition.set(s.targetX+(this.environmentProfile==="beauty-cell"?-42:0),28,s.targetY+(this.environmentProfile==="beauty-cell"?-54:0)),a);const o=this.reusablePosition.copy(this.cameraTarget).add(hh);if(this.camera.position.lerp(o,a),this.cameraTrauma=Math.max(0,this.cameraTrauma-t*3.4),this.cameraTrauma>.001){const l=this.cameraTrauma*this.cameraTrauma*7.5;this.camera.position.x+=Math.sin(this.elapsed*137.3)*l,this.camera.position.y+=Math.sin(this.elapsed*173.1)*l*.28,this.camera.position.z+=Math.cos(this.elapsed*151.7)*l}if(this.camera.lookAt(this.cameraTarget),this.qualityProfile==="pc-ultra")return;const c=this.cameraViewHeight/this.internalRenderHeight;this.camera.position.x=Math.round(this.camera.position.x/c)*c,this.camera.position.y=Math.round(this.camera.position.y/c)*c,this.camera.position.z=Math.round(this.camera.position.z/c)*c}updateAmbientMotion(e,t){for(const[r,s]of this.enemyVisuals){const a=e.enemies.find(c=>c.id===r);if(a===void 0)continue;const o=a.kind==="murmur"?8:2;s.group.position.y=s.baseY+Math.sin(t*3.1+r.length*.7)*o}let i=0;for(const r of this.lootVisuals.values())r.rotation.y=t*.8+i*.4,r.position.y=5+Math.sin(t*2.4+i)*5,i+=1}}function Of(n,e,t){const i=n.dimensions.width*e,r=n.dimensions.depth*e,s=mf(n,{voxelSize:e,shadeFaces:!1,origin:{x:-i/2,y:0,z:-r/2}}),a=new St;return a.setAttribute("position",new kt(s.positions,3)),a.setAttribute("normal",new kt(s.normals,3)),a.setAttribute("color",new kt(s.colors,3)),a.setIndex(new kt(s.indices,1)),t&&s.materialGroups.forEach((o,c)=>{a.addGroup(o.start,o.count,c)}),a.computeBoundingSphere(),{geometry:a,data:s}}function Wr(n,e,t){const{geometry:i}=Of(n,e,!1),r=new _t({color:16777215,vertexColors:!0,transparent:t<1,opacity:t,roughness:.78,metalness:.04}),s=new ze(i,r);return s.name=n.id,s}function ph(n,e){const{geometry:t,data:i}=Of(n,e,!0),r=i.materialGroups.map(a=>h2(a.role)),s=new ze(t,r);return s.name=n.id,s}function h2(n){switch(n){case"matte":return new _t({color:16777215,vertexColors:!0,roughness:.84,metalness:0});case"metal":return new _t({color:16777215,vertexColors:!0,roughness:.38,metalness:.68});case"emissive":return new Bt({color:16777215,vertexColors:!0,toneMapped:!1})}}function f2(n,e){for(const t of n.material)(t instanceof _t||t instanceof Bt)&&t.color.setHex(e)}function Xr(n,e,t){const i=new Ec(1,24),r=new Bt({color:2373682,transparent:!0,opacity:t*.72,depthWrite:!1}),s=new ze(i,r);return s.rotation.x=-Math.PI/2,s.scale.set(n,e,1),s.position.y=1,s}function mh(n,e){const t=new Ii(25,30,64),i=new Bt({color:n,transparent:!0,opacity:e,depthWrite:!1,side:rn,blending:wa}),r=new ze(t,i);return r.rotation.x=-Math.PI/2,r.renderOrder=12,r}function p2(){const n=[{size:[26,3.5,18],position:[0,1.75,0],color:3766847},{size:[15,5,21],position:[-7,4.25,4],color:5083459},{size:[12,11,12],position:[5,7.5,-3],color:3108928},{size:[10,8,10],position:[-5,8,5],color:6988622},{size:[4.5,4.5,4.5],position:[5,15.5,0],color:15780172},{size:[4,4,4],position:[-7,13,7],color:14970728}],e=[],t=[],i=[],r=new Ue;for(const a of n){const o=new on(a.size[0],a.size[1],a.size[2]).toNonIndexed();o.translate(a.position[0],a.position[1],a.position[2]);const c=o.getAttribute("position"),l=o.getAttribute("normal");for(let d=0;d<c.count;d+=1){const h=l.getY(d),u=Math.abs(l.getX(d)),f=h>.5?1:h<-.5?.58:u>.5?.82:.72;r.setHex(a.color).multiplyScalar(f),e.push(c.getX(d),c.getY(d),c.getZ(d)),t.push(l.getX(d),l.getY(d),l.getZ(d)),i.push(r.r,r.g,r.b)}o.dispose()}const s=new St;return s.setAttribute("position",new Ge(e,3)),s.setAttribute("normal",new Ge(t,3)),s.setAttribute("color",new Ge(i,3)),s.computeBoundingBox(),s.computeBoundingSphere(),s}function gh(n,e,t){return(Math.imul(Math.trunc(n)+101,73856093)^Math.imul(Math.trunc(e)+211,19349663)^Math.imul(Math.trunc(t)+307,83492791))>>>0}function xh(n,e){n.rotation.x=e==="blade"?.12:.04,n.rotation.z=e==="blade"?-.42:-.28,n.scale.setScalar(e==="blade"?.9:.86),Kl(n,e)}function m2(n,e,t,i,r){if(e>0)return{motion:"hurt",progress:1-e};if(t>0)return{motion:"skill",progress:1-t};if(i>0)return{motion:"hit",progress:1-i};switch(n?.phase){case"windup":return{motion:"windup",progress:n.progress};case"hit":return{motion:"hit",progress:n.progress};case"recover":return{motion:"recovery",progress:n.progress};case"idle":case"acquire":case void 0:return r>.08?{motion:"run",progress:0}:{motion:"idle",progress:0}}}function Kl(n,e){const t=e==="blade"?Yl:Zl;da.set(t.x,t.y,t.z).multiply(n.scale).applyEuler(n.rotation),n.position.set(Xo.x-da.x,Xo.y-da.y,Xo.z-da.z)}function g2(n){switch(n){case"scrap-hound":return Oc;case"relay-shell":return Fc;case"murmur":return Bc;case"named-anomaly":return kc}}function x2(n){switch(n){case"dead-tree":case"signpost":return Wa;case"relay":case"lamp":case"anomaly-marker":return ms;case"contract-board":return Hc;default:return Vc}}function v2(n,e,t){if(n<760&&e>430&&e<1370)return t%3===0?7509097:6323800;if(n>2420&&n<3330&&e>380&&e<1420)return t%4===0?8750716:7764594;if(Math.abs(e-900)<145)return t%3===0?10123353:8874063;const i=(Math.floor(n/80)*17+Math.floor(e/80)*31>>>0)%4;return[4683588,5210184,5998929,6854234][i]??4683588}function y2(n){const e=Array.isArray(n)?n:[n];for(const t of e)t.dispose()}function _2(n){return n.replaceChildren(),n.className="game-shell prototype-b-shell",n.innerHTML=`
    <section
      class="relic-stage"
      data-testid="game-stage"
      role="application"
      tabindex="-1"
      aria-label="辺境遺物録。左手で移動し、右手で攻撃、防御、遺物、道具を操作します。"
    >
      <div class="relic-world" data-testid="game-world" aria-hidden="true"></div>
      <div class="relic-screen-fx" aria-hidden="true"></div>

      <header class="relic-hud">
        <div class="relic-hud__identity">
          <span class="relic-kicker">RELIC FRONTIER / B-02</span>
          <strong data-ui="zone">辺境観測所</strong>
          <span class="relic-signal"><i></i> LINK LOCAL</span>
        </div>
        <div class="relic-hud__mission">
          <span>FIELD CONTRACT</span>
          <strong data-ui="objective">町の依頼板を調べる</strong>
        </div>
        <div class="relic-hud__vitals">
          <div class="relic-health">
            <span>BODY</span>
            <div class="relic-health__track"><i data-ui="health-fill"></i></div>
            <b data-ui="health-text">100 / 100</b>
          </div>
          <button class="relic-audio" data-ui="mute" type="button" aria-pressed="false">
            <span aria-hidden="true">◖))</span> SOUND
          </button>
        </div>
      </header>

      <div class="relic-target" data-ui="target" aria-hidden="true">
        <span>NEAREST HOSTILE / <b data-ui="target-name">未分類異形</b></span>
        <i><em data-ui="target-fill"></em></i>
      </div>

      <aside class="relic-loadout" aria-label="装備">
        <button class="relic-loadout__weapon" data-control="switch-weapon" type="button">
          <span>PRIMARY / TAP TO SWAP</span>
          <strong data-ui="weapon-name">測量刃</strong>
          <small data-ui="weapon-detail">速い・前方短距離</small>
        </button>
        <div class="relic-loadout__item">
          <span>UNCLASSIFIED RELIC</span>
          <strong data-ui="relic-name">斥力環 R-17</strong>
          <small>仮説：周囲の慣性だけを遅延させる</small>
        </div>
        <div class="relic-loadout__stock">
          <span>縫合剤</span>
          <b data-ui="item-count">× 1</b>
        </div>
      </aside>

      <div class="relic-context" data-ui="context-prompt" aria-hidden="true">
        <span>E</span><strong>調べる</strong>
      </div>

      <div class="relic-controls" aria-label="操作">
        <div class="relic-joystick" data-control="move" aria-label="移動">
          <span class="relic-joystick__axis" aria-hidden="true"></span>
          <i data-control="move-knob" aria-hidden="true"></i>
          <small>MOVE</small>
        </div>
        <div class="relic-actions">
          <button class="relic-action relic-action--item" data-control="item" type="button">
            <span>道具</span><small>R</small>
          </button>
          <button class="relic-action relic-action--relic" data-control="relic" type="button">
            <span>遺物</span><small>Q</small>
          </button>
          <button class="relic-action relic-action--guard" data-control="guard" type="button">
            <span>防御/回避</span><small>HOLD / MOVE</small>
          </button>
          <button class="relic-action relic-action--attack" data-control="attack" type="button">
            <span>攻撃</span><small>SPACE</small>
          </button>
          <button class="relic-action relic-action--interact" data-control="interact" type="button">
            <span>調査</span><small>E</small>
          </button>
        </div>
      </div>

      <div class="relic-toast" data-ui="toast" role="status" aria-live="polite"></div>

      <article class="relic-dossier" data-ui="dossier" aria-hidden="true">
        <span class="relic-kicker">FIELD CATALOG / UNVERIFIED</span>
        <strong data-ui="dossier-title">未分類遺物</strong>
        <p data-ui="dossier-body"></p>
      </article>

      <section
        class="relic-outcome"
        data-ui="outcome"
        role="dialog"
        aria-modal="true"
        aria-labelledby="relic-outcome-title"
        aria-hidden="true"
        inert
      >
        <div>
          <span class="relic-kicker">CONTACT PROTOCOL</span>
          <h2 id="relic-outcome-title">反響体へ、どう応答する？</h2>
          <p>観測所は結論を指定していない。あなたの履歴だけが残る。</p>
        </div>
        <button data-control="outcome-destroy" type="button">
          <span>07</span><strong>破壊する</strong><small>危険源を断つ</small>
        </button>
        <button data-control="outcome-calm" type="button">
          <span>08</span><strong>鎮静する</strong><small>信号を弱める</small>
        </button>
        <button data-control="outcome-connect" type="button">
          <span>09</span><strong>接続する</strong><small>記録を受け取る</small>
        </button>
        <button class="relic-outcome__back" data-ui="outcome-back" type="button">
          <strong>いったん探索へ戻る</strong><small>必要な遺物を街道で探せる</small>
        </button>
      </section>

      <section class="relic-result" data-ui="result" aria-hidden="true" inert>
        <span class="relic-kicker">CONTRACT CLOSED / HISTORY WRITTEN</span>
        <h2 data-ui="result-title">帰還記録</h2>
        <p data-ui="result-body"></p>
        <button data-ui="restart" type="button">別の履歴を試す</button>
      </section>

      <section class="relic-title" data-ui="title">
        <div class="relic-title__index">
          <span>観測番号</span><b>B-02</b><small>LOCAL / OFFLINE</small>
        </div>
        <div class="relic-title__copy">
          <span class="relic-kicker">A SMALL FREE-WORLD ACTION RPG</span>
          <h1>辺境<br /><em>遺物録</em></h1>
          <p>
            誰も英雄を待っていない辺境。<br />
            依頼を選び、装備を拾い、廃屋から届く声に応答する。
          </p>
          <button data-ui="start" data-testid="start-game" type="button">
            <span>調査を開始</span><small>ENTER / TOUCH</small>
          </button>
        </div>
        <dl class="relic-title__catalog">
          <div><dt>効果</dt><dd>周囲の運動を一瞬だけ押し戻す</dd></div>
          <div><dt>原理</dt><dd>局所慣性の位相差。現時点では仮説</dd></div>
          <div><dt>副作用</dt><dd>使用者の金属製品が北を向く</dd></div>
          <div><dt>所感</dt><dd>「方位磁針には使えそうだ」</dd></div>
        </dl>
      </section>

      <div class="relic-performance" data-ui="performance" aria-hidden="true">-- FPS</div>
    </section>

    <p class="sr-only" data-testid="game-status" data-ui="status-live" aria-live="polite">
      辺境遺物録。開始待ち。
    </p>

    <div class="orientation-notice relic-orientation" data-ui="orientation" aria-hidden="true">
      <span class="orientation-notice__mark">↻</span>
      <span class="orientation-notice__eyebrow">RELIC FRONTIER / B-02</span>
      <strong>端末を横向きに</strong>
      <small>辺境の地図と両手の操作盤をひらく</small>
    </div>
  `,{stage:vt(n,".relic-stage"),worldMount:vt(n,".relic-world"),statusLive:vt(n,'[data-ui="status-live"]'),titleOverlay:vt(n,'[data-ui="title"]'),startButton:ua(n,'[data-ui="start"]'),muteButton:ua(n,'[data-ui="mute"]'),zoneLabel:vt(n,'[data-ui="zone"]'),objectiveText:vt(n,'[data-ui="objective"]'),healthFill:vt(n,'[data-ui="health-fill"]'),healthText:vt(n,'[data-ui="health-text"]'),weaponName:vt(n,'[data-ui="weapon-name"]'),weaponDetail:vt(n,'[data-ui="weapon-detail"]'),relicName:vt(n,'[data-ui="relic-name"]'),itemCount:vt(n,'[data-ui="item-count"]'),targetPanel:vt(n,'[data-ui="target"]'),targetName:vt(n,'[data-ui="target-name"]'),targetFill:vt(n,'[data-ui="target-fill"]'),contextPrompt:vt(n,'[data-ui="context-prompt"]'),toast:vt(n,'[data-ui="toast"]'),dossier:vt(n,'[data-ui="dossier"]'),dossierTitle:vt(n,'[data-ui="dossier-title"]'),dossierBody:vt(n,'[data-ui="dossier-body"]'),outcomePanel:vt(n,'[data-ui="outcome"]'),outcomeBackButton:ua(n,'[data-ui="outcome-back"]'),resultPanel:vt(n,'[data-ui="result"]'),resultTitle:vt(n,'[data-ui="result-title"]'),resultBody:vt(n,'[data-ui="result-body"]'),restartButton:ua(n,'[data-ui="restart"]'),performance:vt(n,'[data-ui="performance"]'),orientationNotice:vt(n,'[data-ui="orientation"]')}}function vt(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout element is missing: ${e}`);return t}function ua(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout button is missing: ${e}`);return t}const qo=1e3/Zn,vh=5,M2=Math.ceil(Zn*.7),yh="relic-frontier-b-02",Yo=new WeakMap;function S2(n){return new URLSearchParams(n).getAll("debug").includes("1")}const b2={"edge-coil":{title:"縁断コイル E-04",effect:"測量刃の威力を6増幅する。",principle:"刃の輪郭だけを0.03秒先に送る位相先行。仮説。",sideEffect:"鞘に入れた鉛筆まで、やたら尖る。",note:"『切れ味より、書類の角が怖い』— 前任調査員"},"gravity-weight":{title:"局所重錘 G-12",effect:"杭打機の威力を12増幅する。",principle:"衝突の瞬間だけ質量の参照先を衛星軌道へ移す。仮説。",sideEffect:"使用後、持ち主の靴だけ三分間重くなる。",note:"『置き忘れない。床がへこむ』— 整備票"},"field-tonic":{title:"野外縫合剤 T-3",effect:"体力を45回復する道具を1個追加する。",principle:"傷口へ本人の正常時データを上書きする医療糊。",sideEffect:"治った場所が一度だけ知らない番号へ発信する。",note:"『通話料は観測所持ちにしてほしい』— 使用者"},"relay-capacitor":{title:"中継蓄相器 C-17",effect:"斥力環の威力を10増し、再使用を1秒短縮する。",principle:"周辺機器の待ち時間を回収し、電荷として再利用する。",sideEffect:"近くの炊飯器が、完了前に完了音を鳴らす。",note:"『急かされている気がする』— 台所担当"},"quiet-chime":{title:"無音鈴 Q-0",effect:"反響体を斥力環で鎮静できる。",principle:"音を出すのではなく、周囲から同じ長さの沈黙を引く。",sideEffect:"鳴らすたび、どこかで一匹だけ犬が首を傾げる。",note:"『聞こえなかった。だから作動した』— 観測記録"},"signal-key":{title:"信号鍵 K-99",effect:"反響体との直接接続を解禁する。",principle:"鍵穴ではなく、通信相手の「返事したい気持ち」を開く。",sideEffect:"接続中、使用者の独り言が字幕として表示される。",note:"『考えてから黙ること』— 接続手順書"}},E2={destroy:"破壊",calm:"鎮静",connect:"接続"};function Zo(n,e={}){Yo.get(n)?.destroy();const t=_2(n);T2(n,t,e);const i=new np(t.stage),r=new $f,s=[];let a=Md(yh),o=Ne(t,a),c=0,l=performance.now(),d=0,h=!1,u=!1,f=!1,g=!1,x=0,m=0,p=0,_=0,S=0,y=!1,w,b=Za(),A=0,v=!1,E=!1,R=0;const P=window.matchMedia("(orientation: portrait)");let L=P.matches;i.setEnabled(!1),Ko(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1});const F=(se,Ae=performance.now(),Ce=1800)=>{t.statusLive.textContent=se,R=Ae+Ce},B=()=>h&&!L&&!f&&!document.hidden&&a.status==="playing",z=()=>Ma(a)&&!y,W=se=>{L=P.matches,t.stage.inert=L,t.orientationNotice.setAttribute("aria-hidden",String(!L)),i.setEnabled(B()),d=0,l=performance.now(),se&&(F(L?"ゲームを一時停止しました。端末を横向きにしてください。":"横向き表示へ戻りました。調査を再開します。"),!L&&h&&t.stage.focus({preventScroll:!0}))};W(!1);const k=()=>{h||u||(h=!0,(e.experience==="north-star"||e.experience==="beauty-cell")&&(t.stage.dataset.presentationState="active"),t.titleOverlay.setAttribute("aria-hidden","true"),t.titleOverlay.inert=!0,i.setEnabled(B()),l=performance.now(),F("調査開始。町の依頼板に近づき、調査ボタンを押してください。",l),L||t.stage.focus({preventScroll:!0}),r.unlock().catch(()=>{ve(t,"音声を開始できませんでした。ゲームは続行できます。",performance.now())}))},Z=()=>{g=!g,r.setMuted(g),t.muteButton.setAttribute("aria-pressed",String(g)),t.muteButton.innerHTML=g?'<span aria-hidden="true">×</span> MUTED':'<span aria-hidden="true">◖))</span> SOUND'},J=()=>{a=Md(yh),b=Za(),A=0,w=void 0,d=0,y=!1,v=!1,E=!1,o.dispose(),o=Ne(t,a),t.resultPanel.setAttribute("aria-hidden","true"),t.resultPanel.inert=!0,t.outcomePanel.setAttribute("aria-hidden","true"),t.outcomePanel.inert=!0,i.setEnabled(B()),ve(t,"新しい調査記録を開始。",performance.now()),Ko(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1}),t.stage.focus({preventScroll:!0})},ne=()=>k(),ae=()=>Z(),le=()=>J(),Ve=se=>{se.code==="Enter"&&k()},je=()=>{l=performance.now(),d=0,i.setEnabled(B())},Be=()=>W(!0),K=()=>{Ma(a)&&(y=!0,ve(t,"応答を保留。街道へ戻り、必要な遺物を探せる。",performance.now(),3600),F("応答を保留しました。反響体の近くで調査すると、選択へ戻れます。"))},ie=se=>{if(!z())return;if(se.code==="Escape"){se.preventDefault(),K();return}if(se.code!=="Tab")return;const Ae=Sh(t);if(Ae.length===0)return;se.preventDefault();const Ce=Ae.indexOf(document.activeElement),lt=se.shiftKey?Ce<=0?Ae.length-1:Ce-1:Ce<0||Ce===Ae.length-1?0:Ce+1;Ae[lt]?.focus({preventScroll:!0})};t.startButton.addEventListener("click",ne),t.muteButton.addEventListener("click",ae),t.restartButton.addEventListener("click",le),t.outcomeBackButton.addEventListener("click",K),window.addEventListener("keydown",Ve),window.addEventListener("keydown",ie),document.addEventListener("visibilitychange",je),P.addEventListener("change",Be),s.push(()=>t.startButton.removeEventListener("click",ne),()=>t.muteButton.removeEventListener("click",ae),()=>t.restartButton.removeEventListener("click",le),()=>t.outcomeBackButton.removeEventListener("click",K),()=>window.removeEventListener("keydown",Ve),()=>window.removeEventListener("keydown",ie),()=>document.removeEventListener("visibilitychange",je),()=>P.removeEventListener("change",Be));const ee=se=>{if(u)return;const Ae=Math.min(100,Math.max(0,se-l));l=se;const Ce=[];if(h&&!f&&!document.hidden&&!L&&a.status==="playing"){d+=Ae;let qe=0;for(;d>=qo&&qe<vh;){const He=i.consumeFrame(),ct=z();if(y&&He.interact&&k2(a))y=!1,F("反響体への応答選択を再開します。",se);else if(!ct||He.outcomeChoice!==null){const st=w2(a,He,ct);if(e.semiAutoCombat===!0&&!ct)if(st.activateRelic===!0&&a.player.relicCooldownTicks<=1?A=Math.max(A,M2):(st.dodge===!0||st.chooseWeapon!==void 0)&&(A=Math.max(A,1)),A>0)b=Za(),A-=1,st.moveSpeedScale=1,st.attack=!1,w={targetId:null,phase:"idle",progress:0};else{const Ye=tm(b,a);b=Ye.state,st.moveSpeedScale=Ye.presentation.movementScale,st.attack=Ye.commandContribution.attack===!0,w={targetId:Ye.presentation.targetId,phase:Ye.presentation.phase,progress:Ye.presentation.phaseProgress}}const I=jp(a,st);a=I.state,Ce.push(...I.events)}d-=qo,qe+=1}qe===vh&&(d=Math.min(d,qo))}rt(t,r,a,Ce,se),Ma(a)||(y=!1);const lt=z();if(Ko(t,a,se,{decisionOpen:lt,announceStatus:h&&!L&&!f&&se>=R}),A2(t,a,w),We(lt),r.setDanger(L||document.hidden?0:z2(a)),document.hidden||r.update(),o.update(a,Ce,se,L||document.hidden?0:Ae,w),_+=1,S+=Ae,se-p>=500){const qe=S>0?Math.round(_*1e3/S):0,He=o.getStats();t.performance.textContent=`${qe} FPS · ${He.width}×${He.height} · ${He.calls} CALL · ${He.triangles} TRI`,_=0,S=0,p=se}se>=x&&t.toast.classList.remove("is-visible"),se>=m&&t.dossier.setAttribute("aria-hidden","true"),c=requestAnimationFrame(ee)},Ee={destroy(){if(!u){u=!0,cancelAnimationFrame(c),i.destroy(),r.dispose(),o.dispose();for(const se of s.splice(0))se();Yo.delete(n)}},getState(){return a}};function Ne(se,Ae){return new u2(se.worldMount,Ae,{onContextLost:()=>{f=!0,i.setEnabled(!1);const Ce=performance.now();ve(se,"描画装置との接続が切れました。復旧を待っています。",Ce,2e4),F("WebGL描画コンテキストが失われました。",Ce,2e4)},onContextRestored:()=>{f=!1,i.setEnabled(B());const Ce=performance.now();ve(se,"描画装置との接続を復旧しました。",Ce),F("描画装置との接続を復旧しました。",Ce),l=Ce,d=0},companionPreview:e.companionPreview,cameraCompositionProfile:e.experience==="baseline"||e.experience===void 0?"baseline":"north-star",environmentProfile:e.experience==="beauty-cell"?"beauty-cell":e.experience==="north-star"?"north-star-city":"start-town",qualityProfile:e.renderQuality})}function ve(se,Ae,Ce,lt=2800){se.toast.textContent=Ae,se.toast.classList.add("is-visible"),x=Ce+lt}function ft(se,Ae){const Ce=b2[se];t.dossierTitle.textContent=Ce.title,t.dossierBody.textContent=[`効果　${Ce.effect}`,`原理　${Ce.principle}`,`副作用　${Ce.sideEffect}`,`所感　${Ce.note}`].join(`
`),t.dossier.setAttribute("aria-hidden","false"),m=Ae+7e3}function We(se){const Ae=t.outcomePanel.contains(document.activeElement);t.outcomePanel.inert=!se,se!==v&&(se&&!L?Sh(t)[0]?.focus({preventScroll:!0}):!L&&Ae&&t.stage.focus({preventScroll:!0}),v=se);const Ce=t.resultPanel.getAttribute("aria-hidden")==="false";t.resultPanel.inert=!Ce,Ce!==E&&(Ce&&!L&&t.restartButton.focus({preventScroll:!0}),E=Ce)}return Yo.set(n,Ee),c=requestAnimationFrame(ee),Ee;function rt(se,Ae,Ce,lt,qe){for(const He of lt)switch(N2(Ae,He),He.type){case"weapon-selected":ve(se,He.weaponId==="blade"?"測量刃へ持ち替えた。速く、間合いが長い。":"杭打機へ持ち替えた。遅いが、重く吹き飛ばす。",qe);break;case"loot-picked":{const ct=Eh[He.lootId];ve(se,`${ct.name}を回収。`,qe),ft(He.lootId,qe);break}case"landmark-entered":ve(se,He.landmarkId==="fork"?"三叉路を記録。廃区の信号が強くなる。":He.landmarkId==="ruin"?"聴取廃区へ侵入。発信源は近い。":"ダストウェイク観測町へ帰還。",qe);break;case"quest-advanced":ve(se,Ff(Ce),qe,3300);break;case"outcome-committed":ve(se,He.outcome==="destroy"?"破壊手順を確定。通常攻撃で停止させる。":He.outcome==="calm"?"鎮静手順を確定。近くで斥力環を使う。":"接続手順を確定。近くで調査する。",qe,4e3);break;case"anomaly-resolved":ve(se,`反響体への${E2[He.outcome]}を記録。町へ戻れ。`,qe,4e3);break;case"enemy-defeated":He.enemyId!==Hi&&ve(se,"異形を停止。周囲を調べられる。",qe);break;case"item-used":ve(se,`縫合剤を使用。体力を${He.healed}回復。`,qe);break;case"command-rejected":ve(se,O2(He.reason),qe);break;case"player-defeated":i.setEnabled(!1),se.resultTitle.textContent="調査記録、途絶",se.resultBody.textContent=`辺境はあなたを待たずに巡り続ける。
装備と防御の使い方を変え、もう一度この経路を試せる。`,se.resultPanel.setAttribute("aria-hidden","false"),se.resultPanel.inert=!1,F("調査員は倒れました。",qe,1e4);break;case"result-reached":i.setEnabled(!1),F(`依頼完了。${He.result.title}`,qe,1e4);break}}}function w2(n,e,t){const i=R2(e.outcomeChoice);if(t)return i===void 0?{}:{chooseOutcome:i};const r=EM(e.moveX,e.moveY);return{moveX:r.moveX,moveY:r.moveY,attack:e.attack,guard:e.guard,dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,chooseWeapon:e.switchWeapon?C2(n.player.weaponId):void 0}}function T2(n,e,t){if(t.experience!=="north-star"&&t.experience!=="beauty-cell")return;n.classList.add("north-star-shell"),e.stage.classList.add("north-star-stage");const i=t.experience==="beauty-cell";i&&(n.classList.add("beauty-cell-shell"),e.stage.classList.add("beauty-cell-stage")),e.stage.dataset.experience=t.experience,e.stage.dataset.prototypeVersion=i?"R02":"R01",e.stage.dataset.presentationState="intro";const r=S2(window.location.search);e.stage.classList.toggle("is-north-star-debug",r),e.stage.dataset.debug=r?"1":"0",e.performance.hidden=!r,e.stage.setAttribute("aria-label",i?"AI-native Beauty Cell。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。":"North Star Scene。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。");const s=document.createElement("div");s.className="north-star-badge",s.hidden=!r,s.innerHTML=i?"<span>AI-NATIVE BEAUTY CELL</span><strong>R02 / PC ULTRA / LIVE SYSTEMS</strong>":"<span>VISUAL NORTH STAR</span><strong>PC ULTRA / LIVE COMBAT</strong>",e.stage.append(s);const a=document.createElement("div");a.className="north-star-combat-readout",a.dataset.phase="idle",a.setAttribute("aria-hidden","true"),a.innerHTML=`
    <strong data-ui="north-star-combat-phase">LOCK</strong>
    <i><em data-ui="north-star-combat-progress"></em></i>
  `,e.stage.append(a);const o=e.titleOverlay.querySelector(".relic-title__copy .relic-kicker"),c=e.titleOverlay.querySelector("h1"),l=e.titleOverlay.querySelector("p"),d=e.startButton.querySelector("span"),h=e.startButton.querySelector("small"),u=e.stage.querySelector(".relic-hud__identity strong");o!==null&&(o.textContent=i?"AI-NATIVE CONCEPT C / REALTIME BEAUTY CELL":"PC ULTRA VISUAL + GAME FEEL BENCHMARK"),c!==null&&(c.innerHTML=i?"緑蝕<br /><em>交差区</em>":"緑蝕<br /><em>観測区</em>"),l!==null&&(l.innerHTML=i?"光と水と緑が都市を更新している。<br />調査員は歩き、拾い、間合いを選び、大技だけを自分で撃つ。":"自然に呑まれた現代都市を歩く。<br />間合いで通常攻撃を起こし、大技で戦況を変える。"),d!==null&&(d.textContent=i?"Beauty Cellを歩く":"North Star Sceneを開始"),h!==null&&(h.textContent="MOVE / AUTO BASIC / MANUAL SKILL"),i&&u!==null&&(u.textContent="緑蝕・第04交差区");const f=e.stage.querySelector('[data-control="attack"]');f!==null&&(f.tabIndex=-1,f.setAttribute("aria-hidden","true"));const g=e.stage.querySelector('[data-control="relic"]'),x=g?.querySelector("span"),m=g?.querySelector("small");x!=null&&(x.textContent="大技"),m!=null&&(m.textContent="Q / MANUAL")}function A2(n,e,t){const i=n.stage.querySelector(".north-star-combat-readout");if(i===null)return;const r=i.querySelector('[data-ui="north-star-combat-phase"]'),s=i.querySelector('[data-ui="north-star-combat-progress"]'),a=t?.phase??"idle",o={idle:"LOCK",acquire:"LOCK",windup:e.player.weaponId==="blade"?"WINDUP":"CHARGE",hit:"HIT",recover:"RECOVER"};r!==null&&(r.textContent=o[a]),s!==null&&(s.style.width=`${Math.round((t?.progress??0)*100)}%`),i.dataset.phase=a,n.stage.dataset.combatPhase=a,n.stage.dataset.combatTarget=t?.targetId??""}function R2(n){switch(n){case 0:return"destroy";case 1:return"calm";case 2:return"connect";default:return}}function C2(n){return n==="blade"?"impact":"blade"}function Ko(n,e,t,i={}){const r=e.player,s=Math.max(0,r.hp/r.maxHp),a=Sa[r.weaponId],o=r.weaponDamageBonuses[r.weaponId],c=r.relicCooldownTicks/Zn,l=i.decisionOpen??Ma(e);n.stage.dataset.questPhase=e.quest.phase,n.stage.dataset.playerX=String(Math.round(r.x)),n.stage.dataset.playerY=String(Math.round(r.y)),n.stage.dataset.weapon=r.weaponId,n.stage.dataset.status=e.status,n.zoneLabel.textContent=n.stage.dataset.experience==="beauty-cell"?"緑蝕・第04交差区":L2(r.x,r.y),n.objectiveText.textContent=Ff(e),n.healthFill.style.width=`${Math.round(s*100)}%`,n.healthFill.style.background=s<=.3?"var(--relic-danger)":"linear-gradient(90deg, var(--relic-amber), var(--relic-signal))",n.healthText.textContent=`${r.hp} / ${r.maxHp}`,n.weaponName.textContent=r.weaponId==="blade"?"測量刃":"杭打機",n.weaponDetail.textContent=`${r.weaponId==="blade"?"速い・広い":"遅い・重い"} / 威力 ${a.damage+o}`,n.relicName.textContent=c<=0?"斥力環 R-17 / READY":`斥力環 R-17 / ${c.toFixed(1)}s`,n.itemCount.textContent=`× ${r.healingItems}`,P2(n,e),n.outcomePanel.setAttribute("aria-hidden",String(!l));const d=Mh(n,"outcome-calm"),h=Mh(n,"outcome-connect");_h(d,r.collectedLootIds.includes("quiet-chime"),"無音鈴 Q-0 が必要"),_h(h,r.collectedLootIds.includes("signal-key"),"信号鍵 K-99 が必要");const u=I2(e);if(n.contextPrompt.setAttribute("aria-hidden",String(u===null||l)),u!==null){const f=n.contextPrompt.querySelector("span"),g=n.contextPrompt.querySelector("strong");f!==null&&(f.textContent=u.key),g!==null&&(g.textContent=u.text)}if(e.status==="result"&&e.quest.result!==null){const f=e.quest.result;n.resultTitle.textContent=F2(f.outcome),n.resultBody.textContent=B2(f.outcome),n.resultPanel.setAttribute("aria-hidden","false"),n.resultPanel.inert=!1}if(i.announceStatus!==!1&&t>0&&e.status==="playing"){const f=`${n.zoneLabel.textContent}。目的：${n.objectiveText.textContent}。体力${r.hp}。武器${n.weaponName.textContent}。`;n.statusLive.textContent!==f&&(n.statusLive.textContent=f)}}function P2(n,e){const t=e.enemies.filter(i=>i.active&&!i.defeated&&i.disposition==="hostile").map(i=>({enemy:i,distance:Math.hypot(e.player.x-i.x,e.player.y-i.y)})).filter(i=>i.distance<=440).sort((i,r)=>i.distance-r.distance||i.enemy.id.localeCompare(r.enemy.id))[0]?.enemy;n.targetPanel.setAttribute("aria-hidden",String(t===void 0)),t!==void 0&&(n.targetName.textContent=D2(t.kind),n.targetFill.style.width=`${Math.round(t.hp/t.maxHp*100)}%`)}function Ff(n){switch(n.quest.phase){case"briefing":return"町の依頼板を調べる";case"travel-to-fork":return"東の三叉路へ向かう";case"travel-to-ruin":return"聴取廃区の発信源へ向かう";case"confrontation":return n.quest.intent==="destroy"?"反響体を攻撃して停止させる":n.quest.intent==="calm"?"反響体の近くで斥力環を使う":n.quest.intent==="connect"?"反響体の近くで調査する":"反響体への応答を選ぶ";case"return-town":return"観測町の依頼板へ帰還する";case"result":return"依頼記録を閉じる"}}function L2(n,e){return jo(n,e,ln.town.bounds)?"ダストウェイク観測町":jo(n,e,ln.ruin.bounds)?"聴取廃区":jo(n,e,ln.fork.bounds)?"三叉路":n<1180?"赤錆街道・西":n<2450?"赤錆街道・東":"廃区外縁"}function D2(n){switch(n){case"scrap-hound":return"屑鉄猟犬";case"relay-shell":return"中継殻";case"murmur":return"囁き";case"named-anomaly":return"聴取断層《オリソン》"}}function I2(n){const e=n.player;if(n.world.loot.some(r=>!r.picked&&Math.hypot(e.x-r.x,e.y-r.y)<=e.radius+r.radius+70))return{key:"E",text:"遺物を回収"};if(n.quest.phase==="briefing"&&bh(e,ln.town.interactionPoint)<=e.radius+70)return{key:"E",text:"依頼板を調べる"};const i=n.enemies.find(r=>r.id===Hi);if(i!==void 0&&$l(e,i)){if(n.quest.phase==="confrontation"&&n.quest.intent===null)return{key:"E",text:"反響体への応答を選ぶ"};if(n.quest.intent==="connect")return{key:"E",text:"信号鍵で接続"};if(n.quest.intent==="calm")return{key:"Q",text:"斥力環で鎮静"};if(n.quest.intent==="destroy")return{key:"J",text:"武器で破壊"}}return n.quest.phase==="return-town"&&bh(e,ln.town.interactionPoint)<=e.radius+70?{key:"E",text:"依頼を報告"}:null}function N2(n,e){if(e.type==="player-damaged"){n.play("hurt");return}if(e.type==="weapon-selected"||e.type==="command-rejected"){n.play("ui");return}if("cue"in e){const t=U2(e.cue);t!==null&&n.play(t)}}function U2(n){switch(n){case"blade-swing":return"blade";case"impact-swing":return"impact";case"enemy-warning":return"warning";case"enemy-impact":return"enemy-impact";case"guard":return"guard";case"just-guard":return"perfect-guard";case"dodge":return"dodge";case"relic":return"relic";case"heal":return"item";case"loot":return"pickup";case"quest":return"ui";case"outcome-destroy":case"outcome-calm":case"outcome-connect":return n;case"result":return"result"}}function z2(n){let e=Number.POSITIVE_INFINITY;for(const t of n.enemies)!t.active||t.defeated||t.disposition!=="hostile"||(e=Math.min(e,Math.hypot(n.player.x-t.x,n.player.y-t.y)));return Number.isFinite(e)?1-Math.min(1,Math.max(0,(e-100)/500)):0}function O2(n){switch(n){case"item-full-health":return"体力は満タン。縫合剤は温存した。";case"item-empty":return"縫合剤がない。";case"outcome-already-chosen":return"応答手順はすでに確定している。";case"outcome-not-available":return"必要な遺物がない。街道を調べ直せる。";case"wrong-quest-phase":return"ここではその応答を選べない。"}}function F2(n){switch(n){case"destroy":return"静かになった断層";case"calm":return"眠る断層";case"connect":return"開いたままの回線"}}function B2(n){switch(n){case"destroy":return`町は静寂を歓迎した。しかし中継守たちは、失われた信号を弔い始めた。
次の旅では、別の返事も選べる。`;case"calm":return`廃区は穏やかになり、旅人は三叉路へ小さな供物を置き始めた。
あなたの鎮静記録が、この土地の新しい習慣になる。`;case"connect":return`廃区から短い通信が届き始め、誰が返事をしてよいか町で議論になった。
回線の向こう側は、まだ何者とも確定していない。`}}function _h(n,e,t){n.disabled=!e,n.setAttribute("aria-label",e?n.textContent?.trim()??"選択":`${n.textContent?.trim()??"選択"}。${t}`),n.title=e?"":t}function Mh(n,e){const t=n.outcomePanel.querySelector(`[data-control="${e}"]`);if(t===null)throw new Error(`Outcome button is missing: ${e}`);return t}function Sh(n){return Array.from(n.outcomePanel.querySelectorAll("button:not(:disabled)"))}function Ma(n){return n.quest.phase==="confrontation"&&n.quest.intent===null}function k2(n){const e=n.enemies.find(t=>t.id===Hi);return e!==void 0&&$l(n.player,e)}function jo(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function bh(n,e){return Math.hypot(n.x-e.x,n.y-e.y)}const jl=document.querySelector("#app");if(jl===null)throw new Error("Application root was not found.");V2(jl).catch(n=>{H2(jl,n)});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});async function V2(n){if(new URLSearchParams(window.location.search).get("prototype")==="0.1"){const{startGame:i}=await Kf(async()=>{const{startGame:r}=await import("./startGame-6yY4X5Xk.js");return{startGame:r}},[]);i(n);return}const t=qf(window.location.pathname,window.location.search);if(t==="r02"){Zo(n,{experience:"beauty-cell",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0});return}if(t==="r01"){Zo(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0});return}Zo(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0})}function H2(n,e){n.replaceChildren(),n.className="game-shell boot-failure-shell";const t=document.createElement("section");t.className="boot-failure",t.setAttribute("role","alert");const i=document.createElement("span");i.textContent="RELIC FRONTIER / STARTUP ERROR";const r=document.createElement("h1");r.textContent="描画装置を起動できませんでした";const s=document.createElement("p");s.textContent="この試作にはWebGL対応ブラウザが必要です。ページを再読み込みしても直らない場合は、比較用の旧試作を開けます。";const a=document.createElement("a");a.href="?prototype=0.1",a.textContent="旧試作 0.1 を開く",t.append(i,r,s,a),n.append(t),console.error("Prototype B failed to start.",e)}
