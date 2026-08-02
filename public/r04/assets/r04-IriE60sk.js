import{a as cp}from"./prototypeRoutes-CS0364z-.js";const dp="modulepreload",up=function(n){return"/game/"+n},Sd={},hp=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let c=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(t.map(l=>{if(l=up(l),l in Sd)return;Sd[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":dp,d||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((p,g)=>{u.addEventListener("load",p),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},fp=92,pp=60/fp/2,ts=.08,bd=[110,130.81,146.83,174.61,146.83,123.47];function mp(n,e,t=ts){return!Number.isFinite(n)||n<e?e+t:n}class gp{context=null;master=null;musicBus=null;effectsBus=null;noiseBuffer=null;nextBeatAt=0;beatIndex=0;danger=0;muted=!1;get isReady(){return this.context!==null&&this.context.state==="running"}async unlock(){if(this.context===null){const e=new AudioContext({latencyHint:"interactive",sampleRate:44100}),t=e.createGain(),i=e.createGain(),r=e.createGain();t.gain.value=this.muted?0:.72,i.gain.value=.22,r.gain.value=.58,i.connect(t),r.connect(t),t.connect(e.destination),this.context=e,this.master=t,this.musicBus=i,this.effectsBus=r,this.noiseBuffer=xp(e),this.nextBeatAt=e.currentTime+ts}this.context.state!=="running"&&(await this.context.resume(),this.nextBeatAt=this.context.currentTime+ts)}setMuted(e){const t=this.muted;if(this.muted=e,this.context!==null&&this.master!==null){const i=this.context.currentTime;t&&!e&&(this.nextBeatAt=i+ts),this.master.gain.cancelScheduledValues(i),this.master.gain.setTargetAtTime(e?0:.72,i,.015)}}setDanger(e){this.danger=vp(e,0,1)}update(){const e=this.context,t=this.musicBus;if(e===null||t===null||e.state!=="running"||this.muted)return;const i=e.currentTime,r=i+ts;this.nextBeatAt=mp(this.nextBeatAt,i);let s=0;for(;this.nextBeatAt<=r&&s<2;){const a=bd[this.beatIndex%bd.length]??110,o=this.beatIndex%4===0;this.playTone(a,this.nextBeatAt,o?.2:.105,o?.095:.05,"square",t),this.danger>.15&&this.beatIndex%2===1&&this.playTone(a*2.01,this.nextBeatAt+.015,.065,.025+this.danger*.035,"sawtooth",t),o&&this.playNoise(this.nextBeatAt,.045,.008+this.danger*.012,210,t),this.beatIndex+=1,this.nextBeatAt+=pp,s+=1}}play(e){const t=this.context,i=this.effectsBus;if(t===null||i===null||t.state!=="running"||this.muted)return;const r=t.currentTime;switch(e){case"blade":this.playSweep(720,280,r,.075,.16,"sawtooth",i),this.playNoise(r,.035,.055,2200,i);break;case"impact":this.playSweep(118,42,r,.16,.28,"square",i),this.playNoise(r,.11,.12,310,i);break;case"guard":this.playTone(392,r,.085,.13,"square",i),this.playTone(587.33,r+.018,.06,.07,"triangle",i);break;case"perfect-guard":this.playTone(523.25,r,.12,.15,"square",i),this.playTone(783.99,r+.035,.12,.11,"square",i);break;case"hurt":this.playSweep(160,72,r,.18,.17,"sawtooth",i),this.playNoise(r,.08,.08,480,i);break;case"warning":this.playTone(880,r,.055,.075,"square",i),this.playTone(660,r+.07,.07,.07,"square",i);break;case"enemy-impact":this.playSweep(95,48,r,.13,.2,"square",i),this.playNoise(r,.075,.07,390,i);break;case"dodge":this.playSweep(420,135,r,.11,.09,"triangle",i),this.playNoise(r,.065,.04,1100,i);break;case"relic":this.playSweep(190,880,r,.34,.14,"triangle",i),this.playTone(617,r+.08,.28,.075,"square",i),this.playNoise(r+.03,.2,.04,1400,i);break;case"item":this.playTone(440,r,.09,.1,"triangle",i),this.playTone(659.25,r+.065,.13,.09,"triangle",i);break;case"pickup":this.playTone(329.63,r,.055,.08,"square",i),this.playTone(493.88,r+.045,.075,.08,"square",i);break;case"ui":this.playTone(246.94,r,.045,.045,"square",i);break;case"result":this.playTone(220,r,.22,.08,"triangle",i),this.playTone(329.63,r+.11,.27,.08,"triangle",i),this.playTone(493.88,r+.23,.36,.07,"triangle",i);break;case"outcome-destroy":this.playSweep(164.81,55,r,.48,.18,"sawtooth",i),this.playNoise(r+.08,.24,.1,260,i);break;case"outcome-calm":this.playTone(261.63,r,.42,.1,"triangle",i),this.playTone(392,r+.12,.46,.09,"triangle",i);break;case"outcome-connect":this.playTone(220,r,.5,.07,"square",i),this.playSweep(330,665,r+.08,.56,.1,"triangle",i),this.playNoise(r+.12,.4,.035,1800,i);break}}dispose(){this.context!==null&&this.context.close(),this.context=null,this.master=null,this.musicBus=null,this.effectsBus=null,this.noiseBuffer=null}playTone(e,t,i,r,s,a){const o=this.context;if(o===null)return;const c=o.createOscillator(),l=o.createGain();c.type=s,c.frequency.setValueAtTime(e,t),l.gain.setValueAtTime(1e-4,t),l.gain.exponentialRampToValueAtTime(r,t+.008),l.gain.exponentialRampToValueAtTime(1e-4,t+i),c.connect(l),l.connect(a),c.start(t),c.stop(t+i+.02)}playSweep(e,t,i,r,s,a,o){const c=this.context;if(c===null)return;const l=c.createOscillator(),d=c.createGain();l.type=a,l.frequency.setValueAtTime(e,i),l.frequency.exponentialRampToValueAtTime(Math.max(1,t),i+r),d.gain.setValueAtTime(1e-4,i),d.gain.exponentialRampToValueAtTime(s,i+.006),d.gain.exponentialRampToValueAtTime(1e-4,i+r),l.connect(d),d.connect(o),l.start(i),l.stop(i+r+.02)}playNoise(e,t,i,r,s){const a=this.context,o=this.noiseBuffer;if(a===null||o===null)return;const c=a.createBufferSource(),l=a.createBiquadFilter(),d=a.createGain();c.buffer=o,l.type="bandpass",l.frequency.value=r,l.Q.value=.7,d.gain.setValueAtTime(i,e),d.gain.exponentialRampToValueAtTime(1e-4,e+t),c.connect(l),l.connect(d),d.connect(s),c.start(e),c.stop(e+t)}}function xp(n){const e=Math.floor(n.sampleRate*.5),t=n.createBuffer(1,e,n.sampleRate),i=t.getChannelData(0);let r=1235467297;for(let s=0;s<i.length;s+=1)r^=r<<13,r^=r>>>17,r^=r<<5,i[s]=(r>>>0)/4294967295*2-1;return t}function vp(n,e,t){return Math.min(t,Math.max(e,n))}const wd=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"]);class yp{constructor(e){this.root=e,this.joystickPad=Cs(e,'[data-control="move"]'),this.joystickKnob=Cs(e,'[data-control="move-knob"]'),this.bindJoystick(),this.bindActionButton("attack",()=>{this.queued.attack=!0}),this.bindHoldButton("guard",()=>{this.guardHeld=!0,this.updateGuardMovementChord()},()=>{this.guardHeld=!1,this.updateGuardMovementChord()}),this.bindActionButton("relic",()=>{this.queued.activateRelic=!0}),this.bindActionButton("item",()=>{this.queued.useItem=!0}),this.bindActionButton("interact",()=>{this.queued.interact=!0}),this.bindActionButton("switch-weapon",()=>{this.queued.switchWeapon=!0}),this.bindActionButton("outcome-destroy",()=>{this.queued.outcomeChoice=0}),this.bindActionButton("outcome-calm",()=>{this.queued.outcomeChoice=1}),this.bindActionButton("outcome-connect",()=>{this.queued.outcomeChoice=2}),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.reset),this.listeners.push(()=>{window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.reset)})}root;pressedKeys=new Set;listeners=[];joystickPad;joystickKnob;joystickPointerId=null;joystickX=0;joystickY=0;guardHeld=!1;guardMovementChordActive=!1;enabled=!1;queued=co();setEnabled(e){this.enabled=e,this.root.classList.toggle("is-controls-disabled",!e),e||this.reset()}consumeFrame(){const e=this.queued;this.queued=co();const t=(this.isPressed("ArrowRight","KeyD")?1:0)-(this.isPressed("ArrowLeft","KeyA")?1:0),i=(this.isPressed("ArrowDown","KeyS")?1:0)-(this.isPressed("ArrowUp","KeyW")?1:0);let r=t===0?this.joystickX===0?e.moveX:this.joystickX:t,s=i===0?this.joystickY===0?e.moveY:this.joystickY:i;const a=Math.hypot(r,s);return a>1&&(r/=a,s/=a),this.enabled?{moveX:r,moveY:s,attack:e.attack,guard:this.isGuardActive(),dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,switchWeapon:e.switchWeapon,outcomeChoice:e.outcomeChoice}:{moveX:0,moveY:0,attack:!1,guard:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}destroy(){this.reset();for(const e of this.listeners.splice(0))e()}bindJoystick(){const e=r=>{!this.enabled||this.joystickPointerId!==null||(r.preventDefault(),this.joystickPointerId=r.pointerId,this.joystickPad.setPointerCapture(r.pointerId),this.updateJoystick(r))},t=r=>{r.pointerId===this.joystickPointerId&&(r.preventDefault(),this.updateJoystick(r))},i=r=>{r.pointerId===this.joystickPointerId&&(this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.updateGuardMovementChord(),this.updateJoystickKnob())};this.joystickPad.addEventListener("pointerdown",e),this.joystickPad.addEventListener("pointermove",t),this.joystickPad.addEventListener("pointerup",i),this.joystickPad.addEventListener("pointercancel",i),this.listeners.push(()=>{this.joystickPad.removeEventListener("pointerdown",e),this.joystickPad.removeEventListener("pointermove",t),this.joystickPad.removeEventListener("pointerup",i),this.joystickPad.removeEventListener("pointercancel",i)})}bindActionButton(e,t){const i=Cs(this.root,`[data-control="${e}"]`),r=a=>{this.enabled&&(a.preventDefault(),t())},s=a=>{this.enabled&&(a.preventDefault(),!(a.detail>0)&&t())};i.addEventListener("pointerdown",r),i.addEventListener("click",s),this.listeners.push(()=>{i.removeEventListener("pointerdown",r),i.removeEventListener("click",s)})}bindHoldButton(e,t,i){const r=Cs(this.root,`[data-control="${e}"]`),s=l=>{this.enabled&&(l.preventDefault(),r.setPointerCapture(l.pointerId),t())},a=l=>{l.preventDefault(),i()},o=l=>{!this.enabled||l.repeat||l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),t())},c=l=>{l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),i())};r.addEventListener("pointerdown",s),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a),r.addEventListener("keydown",o),r.addEventListener("keyup",c),this.listeners.push(()=>{r.removeEventListener("pointerdown",s),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",a),r.removeEventListener("keydown",o),r.removeEventListener("keyup",c)})}handleKeyDown=e=>{if(!(!this.enabled||_p(e))&&((wd.has(e.code)||e.code==="Space")&&e.preventDefault(),this.pressedKeys.add(e.code),this.queueMovementTap(e.code),this.updateGuardMovementChord(),!e.repeat))switch(e.code){case"Space":case"KeyJ":this.queued.attack=!0;break;case"KeyK":this.queued.dodge=!0;break;case"KeyQ":case"KeyL":this.queued.activateRelic=!0;break;case"KeyR":this.queued.useItem=!0;break;case"KeyE":this.queued.interact=!0;break;case"Digit1":e.preventDefault(),this.queued.switchWeapon=!0;break;case"Digit7":this.queued.outcomeChoice=0;break;case"Digit8":this.queued.outcomeChoice=1;break;case"Digit9":this.queued.outcomeChoice=2;break}};handleKeyUp=e=>{this.pressedKeys.delete(e.code),this.updateGuardMovementChord()};reset=()=>{this.pressedKeys.clear(),this.guardHeld=!1,this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.guardMovementChordActive=!1,this.queued=co(),this.updateJoystickKnob()};updateJoystick(e){const t=this.joystickPad.getBoundingClientRect(),i=Math.min(t.width,t.height)*.5,r=e.clientX-(t.left+t.width*.5),s=e.clientY-(t.top+t.height*.5),a=Math.hypot(r,s),o=a>i?i/a:1;this.joystickX=r*o/i,this.joystickY=s*o/i,this.queued.moveX=this.joystickX,this.queued.moveY=this.joystickY,this.updateGuardMovementChord(),this.updateJoystickKnob()}updateGuardMovementChord(){const e=Math.hypot(this.joystickX,this.joystickY)>.22||[...wd].some(i=>this.pressedKeys.has(i)),t=this.isGuardActive()&&e;t&&!this.guardMovementChordActive&&(this.queued.dodge=!0),this.guardMovementChordActive=t}isGuardActive(){return this.guardHeld||this.pressedKeys.has("ShiftLeft")||this.pressedKeys.has("ShiftRight")}queueMovementTap(e){switch(e){case"ArrowRight":case"KeyD":this.queued.moveX=1;break;case"ArrowLeft":case"KeyA":this.queued.moveX=-1;break;case"ArrowDown":case"KeyS":this.queued.moveY=1;break;case"ArrowUp":case"KeyW":this.queued.moveY=-1;break}}updateJoystickKnob(){this.joystickKnob.style.setProperty("--move-x",`${this.joystickX*42}px`),this.joystickKnob.style.setProperty("--move-y",`${this.joystickY*42}px`)}isPressed(e,t){return this.pressedKeys.has(e)||this.pressedKeys.has(t)}}function co(){return{moveX:0,moveY:0,attack:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}function Cs(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B control is missing: ${e}`);return t}function _p(n){return n.code!=="Space"&&n.code!=="Enter"?!1:typeof Element<"u"&&n.target instanceof Element&&n.target.closest("button[data-control]")!==null}const $n=30,Mp=3600,Sp=1800,yt={x:500,y:950},dn={town:{id:"town",name:"Dustwake Town",bounds:{x:80,y:500,width:620,height:800},center:{x:390,y:900},interactionPoint:yt},fork:{id:"fork",name:"Three-Way Fork",bounds:{x:1180,y:550,width:680,height:700},center:{x:1520,y:900},interactionPoint:{x:1520,y:900}},ruin:{id:"ruin",name:"Listening Ruin",bounds:{x:2450,y:420,width:850,height:960},center:{x:2875,y:900},interactionPoint:{x:2930,y:900}}},bp=[dn.town,dn.fork,dn.ruin],Oh=[{id:"town-hall",kind:"building",bounds:{x:130,y:570,width:250,height:150},solid:!0,height:96},{id:"town-well",kind:"rock",bounds:{x:320,y:790,width:82,height:82},solid:!0,height:34},{id:"south-house",kind:"building",bounds:{x:150,y:1090,width:230,height:130},solid:!0,height:78},{id:"town-board-collider",kind:"rock",bounds:{x:yt.x-46,y:yt.y-10,width:92,height:20},solid:!0,height:0},{id:"town-hall-workyard-collider",kind:"rock",bounds:{x:380,y:707,width:100,height:64},solid:!0,height:0},{id:"town-repair-bench-collider",kind:"rock",bounds:{x:510,y:777,width:115,height:76},solid:!0,height:0},{id:"town-south-lamp-collider",kind:"rock",bounds:{x:460,y:1030,width:20,height:23},solid:!0,height:0},{id:"town-kitchen-garden-collider",kind:"rock",bounds:{x:405,y:1110,width:75,height:90},solid:!0,height:0},{id:"town-south-crates-collider",kind:"rock",bounds:{x:385,y:1186,width:61,height:53},solid:!0,height:0},{id:"fork-boulder",kind:"rock",bounds:{x:1405,y:665,width:130,height:120},solid:!0,height:64},{id:"shallow-basin",kind:"water",bounds:{x:1900,y:1125,width:300,height:170},solid:!0,height:4},{id:"ruin-west-wall-north",kind:"wall",bounds:{x:2500,y:500,width:48,height:320},solid:!0,height:84},{id:"ruin-west-wall-south",kind:"wall",bounds:{x:2500,y:980,width:48,height:320},solid:!0,height:84},{id:"ruin-north-wall",kind:"wall",bounds:{x:2500,y:500,width:700,height:48},solid:!0,height:84},{id:"ruin-south-wall",kind:"wall",bounds:{x:2500,y:1252,width:700,height:48},solid:!0,height:84},{id:"ruin-pillar-north",kind:"pillar",bounds:{x:2720,y:690,width:68,height:68},solid:!0,height:100},{id:"ruin-pillar-south",kind:"pillar",bounds:{x:2720,y:1042,width:68,height:68},solid:!0,height:100}],wp=[{id:"town-contract-board",kind:"contract-board",x:yt.x,y:yt.y,rotation:0,landmarkId:"town",interactive:!0},{id:"town-lamp-a",kind:"lamp",x:470,y:760,rotation:0,landmarkId:"town",interactive:!1},{id:"town-lamp-b",kind:"lamp",x:470,y:1040,rotation:0,landmarkId:"town",interactive:!1},{id:"fork-sign",kind:"signpost",x:1520,y:900,rotation:.15,landmarkId:"fork",interactive:!1},{id:"fork-dead-tree",kind:"dead-tree",x:1670,y:710,rotation:-.4,landmarkId:"fork",interactive:!1},{id:"ruin-relay",kind:"relay",x:2790,y:900,rotation:0,landmarkId:"ruin",interactive:!1},{id:"ruin-anomaly-marker",kind:"anomaly-marker",x:2930,y:900,rotation:0,landmarkId:"ruin",interactive:!0}],La={blade:{id:"blade",name:"Survey Blade",range:104,damage:16,cooldownTicks:10,arcCosine:.25,hitLimit:2,knockback:12,cue:"blade-swing"},impact:{id:"impact",name:"Pile Driver",range:66,damage:38,cooldownTicks:25,arcCosine:-.2,hitLimit:3,knockback:38,cue:"impact-swing"}},Ur={"scrap-hound":{kind:"scrap-hound",name:"Scrap Hound",radius:18,maxHp:38,speed:132,damage:12,attackRange:42,aggroRange:340,telegraphTicks:9,recoveryTicks:24},"relay-shell":{kind:"relay-shell",name:"Relay Shell",radius:27,maxHp:92,speed:62,damage:22,attackRange:54,aggroRange:300,telegraphTicks:20,recoveryTicks:39},murmur:{kind:"murmur",name:"Murmur",radius:21,maxHp:54,speed:88,damage:16,attackRange:68,aggroRange:420,telegraphTicks:15,recoveryTicks:30},"named-anomaly":{kind:"named-anomaly",name:"Orison, the Listening Fault",radius:42,maxHp:124,speed:54,damage:28,attackRange:88,aggroRange:520,telegraphTicks:24,recoveryTicks:42}},Ii="anomaly-orison",Fh=[{id:"enemy-hound",kind:"scrap-hound",x:940,y:835},{id:"enemy-shell",kind:"relay-shell",x:1820,y:1e3},{id:"enemy-murmur",kind:"murmur",x:2270,y:760},{id:Ii,kind:"named-anomaly",x:dn.ruin.interactionPoint.x,y:dn.ruin.interactionPoint.y}],Bh={"edge-coil":{id:"edge-coil",name:"Edge Coil",description:"Adds 6 damage to the fast, long-reaching blade.",effect:"blade-damage",amount:6},"gravity-weight":{id:"gravity-weight",name:"Gravity Weight",description:"Adds 12 damage to the slow, close impact weapon.",effect:"impact-damage",amount:12},"field-tonic":{id:"field-tonic",name:"Field Tonic",description:"Adds one 45 HP healing item.",effect:"healing-item",amount:1},"relay-capacitor":{id:"relay-capacitor",name:"Relay Capacitor",description:"Adds 10 relic damage and shortens its cooldown by one second.",effect:"relic-power",amount:10},"quiet-chime":{id:"quiet-chime",name:"Quiet Chime",description:"Allows the relic pulse to calm the named anomaly.",effect:"calm-key",amount:1},"signal-key":{id:"signal-key",name:"Signal Key",description:"Allows a direct connection with the named anomaly.",effect:"connect-key",amount:1}},Ep=[{id:"pickup-edge-coil",lootId:"edge-coil",x:665,y:760,radius:18},{id:"pickup-field-tonic",lootId:"field-tonic",x:1050,y:1020,radius:18},{id:"pickup-gravity-weight",lootId:"gravity-weight",x:1640,y:1105,radius:18},{id:"pickup-relay-capacitor",lootId:"relay-capacitor",x:2030,y:720,radius:18},{id:"pickup-quiet-chime",lootId:"quiet-chime",x:2360,y:1030,radius:18},{id:"pickup-signal-key",lootId:"signal-key",x:2350,y:900,radius:18}],Tp={destroy:{outcome:"destroy",title:"Fault Silenced",townReaction:"The town accepts the quiet, but the relay keepers mourn the lost signal."},calm:{outcome:"calm",title:"Fault at Rest",townReaction:"The ruin grows still. Travelers begin leaving offerings at the fork."},connect:{outcome:"connect",title:"A Line Left Open",townReaction:"Messages arrive from the ruin, and the town argues over who may answer."}},kh=1831565813,Ap=4294967296;function Rp(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Cp(n){const e=Rp(String(n));return e===0?kh:e}function Pp(n){let e=n>>>0;return e===0&&(e=kh),e^=e<<13,e^=e>>>17,e^=e<<5,e>>>=0,{state:e,value:e/Ap}}const Dp=18,Ip=162,Ed=100,Td=92,Lp=30,Ad=8,Np=4,Up=.3,Vh=70,zp=360,Op=90,Fp=8;function Rr(n,e,t){return Math.min(t,Math.max(e,n))}function Rd(n){return n===void 0||!Number.isFinite(n)?0:Rr(n,-1,1)}function Cd(n){return n===void 0||!Number.isFinite(n)?1:Rr(n,0,1)}function xs(n,e){const t=Math.hypot(n,e);return t===0?{x:0,y:0}:{x:n/t,y:e/t}}function kn(n,e,t,i){return Math.hypot(n-t,e-i)}function Pd(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function Bp(n,e,t,i){const r=Rr(n,i.x,i.x+i.width),s=Rr(e,i.y,i.y+i.height),a=n-r,o=e-s;return a*a+o*o<t*t}function Hh(n){return{...n,bounds:{...n.bounds},center:{...n.center},interactionPoint:{...n.interactionPoint}}}function Gh(n){return{...n,bounds:{...n.bounds}}}function kp(n){return{...n,player:{...n.player,weaponDamageBonuses:{...n.player.weaponDamageBonuses},collectedLootIds:[...n.player.collectedLootIds]},enemies:n.enemies.map(e=>({...e,attack:{...e.attack}})),world:{...n.world,landmarks:n.world.landmarks.map(Hh),terrain:n.world.terrain.map(Gh),props:n.world.props.map(e=>({...e})),loot:n.world.loot.map(e=>({...e}))},quest:{...n.quest,visitedLandmarkIds:[...n.quest.visitedLandmarkIds],result:n.quest.result===null?null:{...n.quest.result}}}}function vs(){return{phase:"idle",ticksRemaining:0,attackId:null,targetX:0,targetY:0,directionX:0,directionY:0}}function Vp(){return{id:"player",x:430,y:900,radius:Dp,facingX:1,facingY:0,hp:Ed,maxHp:Ed,speed:Ip,weaponId:"blade",weaponCooldownTicks:0,weaponDamageBonuses:{blade:0,impact:0},guarding:!1,guardStartedTick:null,dodgeCooldownTicks:0,invulnerableTicks:0,relicCooldownTicks:0,relicCooldownMaxTicks:5*$n,relicDamage:14,relicRange:180,healingItems:1,healingAmount:45,collectedLootIds:[]}}function Dd(n,e,t,i){const r=Ur[n],s=n==="named-anomaly";return{id:e,kind:n,name:r.name,x:t,y:i,radius:r.radius,hp:r.maxHp,maxHp:r.maxHp,active:!s,defeated:!1,disposition:s?"dormant":"hostile",attack:vs()}}function Id(n){const e=Cp(n);let t=e,i=0;const r=()=>{const a=Pp(t);return t=a.state,i+=1,a.value},s=Fh.map(a=>{if(a.kind==="named-anomaly")return Dd(a.kind,a.id,a.x,a.y);const o=(r()-.5)*72,c=(r()-.5)*72;return Dd(a.kind,a.id,a.x+o,a.y+c)});return{saveVersion:1,contentVersion:"prototype-b-1",seed:e,rngState:t,rngDraws:i,tick:0,status:"playing",nextActionId:1,player:Vp(),enemies:s,world:{width:Mp,height:Sp,landmarks:bp.map(Hh),terrain:Oh.map(Gh),props:wp.map(a=>({...a})),loot:Ep.map(a=>({...a,picked:!1}))},quest:{phase:"briefing",objective:"Read the town contract board.",visitedLandmarkIds:["town"],intent:null,outcome:null,result:null}}}function hc(n,e){const t=`${e}-${n.nextActionId}`;return n.nextActionId+=1,t}function Ld(n,e,t,i){return n.world.terrain.some(r=>r.solid&&Bp(e,t,i,r.bounds))}function Na(n,e,t,i,r,s){const a=Math.max(1,Math.ceil(Math.max(Math.abs(r),Math.abs(s))/Fp)),o=r/a,c=s/a;let l=e,d=t;for(let h=0;h<a;h+=1){const u=Rr(l+o,i,n.world.width-i);Ld(n,u,d,i)||(l=u);const p=Rr(d+c,i,n.world.height-i);Ld(n,l,p,i)||(d=p)}return{x:l,y:d}}function Hp(n){n.weaponCooldownTicks=Math.max(0,n.weaponCooldownTicks-1),n.dodgeCooldownTicks=Math.max(0,n.dodgeCooldownTicks-1),n.invulnerableTicks=Math.max(0,n.invulnerableTicks-1),n.relicCooldownTicks=Math.max(0,n.relicCooldownTicks-1)}function Gp(n,e,t){const i=xs(e,t);return(i.x!==0||i.y!==0)&&(n.facingX=i.x,n.facingY=i.y),i}function Wp(n,e,t){const i=Rd(e.moveX),r=Rd(e.moveY),s=Gp(n.player,i,r);if(e.dodge===!0&&n.player.dodgeCooldownTicks===0){const o=s.x===0&&s.y===0?{x:n.player.facingX,y:n.player.facingY}:s,c=n.player.x,l=n.player.y,d=Na(n,c,l,n.player.radius,o.x*Td,o.y*Td);return n.player.x=d.x,n.player.y=d.y,n.player.dodgeCooldownTicks=Lp,n.player.invulnerableTicks=Ad,n.player.guarding=!1,n.player.guardStartedTick=null,t.push({type:"dodge-started",tick:n.tick,fromX:c,fromY:l,toX:d.x,toY:d.y,invulnerableTicks:Ad,cue:"dodge"}),!0}const a=Na(n,n.player.x,n.player.y,n.player.radius,s.x*(n.player.speed/$n)*Cd(e.moveSpeedScale),s.y*(n.player.speed/$n)*Cd(e.moveSpeedScale));return n.player.x=a.x,n.player.y=a.y,!1}function Xp(n,e){const t=n.player.guarding,i=e.guard===!0&&e.dodge!==!0;n.player.guarding=i,i&&!t?n.player.guardStartedTick=n.tick:i||(n.player.guardStartedTick=null)}function Ua(n,e,t,i){n.quest.phase=e,n.quest.objective=t,i.push({type:"quest-advanced",tick:n.tick,phase:e,objective:t,cue:"quest"})}function Nd(n,e,t){n.quest.visitedLandmarkIds.includes(e)||(n.quest.visitedLandmarkIds.push(e),t.push({type:"landmark-entered",tick:n.tick,landmarkId:e}))}function ys(n){return n.enemies.find(e=>e.id===Ii)}function qp(n,e){const{x:t,y:i}=n.player;Pd(t,i,dn.fork.bounds)&&(Nd(n,"fork",e),n.quest.phase==="travel-to-fork"&&Ua(n,"travel-to-ruin","Follow the eastern route to the Listening Ruin.",e)),Pd(t,i,dn.ruin.bounds)&&Nd(n,"ruin",e);const r=ys(n);n.quest.phase==="travel-to-ruin"&&r!==void 0&&kn(t,i,r.x,r.y)<=zp&&Ua(n,"confrontation","Choose how to answer Orison: destroy, calm, or connect.",e)}function hl(n,e){return n.player.collectedLootIds.includes(e)}function Yp(n,e){const t=Bh[e];switch(t.effect){case"blade-damage":n.player.weaponDamageBonuses.blade+=t.amount;break;case"impact-damage":n.player.weaponDamageBonuses.impact+=t.amount;break;case"healing-item":n.player.healingItems+=t.amount;break;case"relic-power":n.player.relicDamage+=t.amount,n.player.relicCooldownMaxTicks=Math.max(2*$n,n.player.relicCooldownMaxTicks-$n),n.player.relicCooldownTicks=Math.min(n.player.relicCooldownTicks,n.player.relicCooldownMaxTicks);break}}function Zp(n,e){const i=n.world.loot.filter(r=>!r.picked&&kn(n.player.x,n.player.y,r.x,r.y)<=n.player.radius+r.radius+Vh).sort((r,s)=>{const a=kn(n.player.x,n.player.y,r.x,r.y),o=kn(n.player.x,n.player.y,s.x,s.y);return a-o||r.id.localeCompare(s.id)})[0];return i===void 0?!1:(i.picked=!0,hl(n,i.lootId)||(n.player.collectedLootIds.push(i.lootId),Yp(n,i.lootId)),e.push({type:"loot-picked",tick:n.tick,pickupId:i.id,lootId:i.lootId,cue:"loot"}),!0)}function fc(n,e,t){if(n.quest.outcome!==null)return;const i=ys(n);i!==void 0&&(i.active=!1,i.attack=vs(),i.disposition=e==="destroy"?"destroyed":e==="calm"?"calmed":"connected",i.defeated=e==="destroy",e==="destroy"&&(i.hp=0)),n.quest.intent=e,n.quest.outcome=e,t.push({type:"anomaly-resolved",tick:n.tick,anomalyId:Ii,outcome:e,cue:e==="destroy"?"outcome-destroy":e==="calm"?"outcome-calm":"outcome-connect"}),Ua(n,"return-town","Return to the Dustwake contract board.",t)}function Kp(n,e,t){const i=e.chooseOutcome;if(i===void 0)return;if(n.quest.phase!=="confrontation"){t.push({type:"command-rejected",tick:n.tick,reason:"wrong-quest-phase"});return}if(n.quest.intent!==null||n.quest.outcome!==null){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-already-chosen"});return}if(i==="calm"&&!hl(n,"quiet-chime")||i==="connect"&&!hl(n,"signal-key")){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-not-available"});return}n.quest.intent=i;const r=ys(n);r!==void 0&&(r.active=!0,r.disposition="hostile"),t.push({type:"outcome-committed",tick:n.tick,outcome:i})}function Ud(n,e,t=Vh){return kn(n.x,n.y,e.x,e.y)<=n.radius+t}function pc(n,e){return kn(n.x,n.y,e.x,e.y)<=n.radius+e.radius+Op}function jp(n,e,t){if(e.interact!==!0||Zp(n,t))return;if(n.quest.phase==="briefing"&&Ud(n.player,dn.town.interactionPoint)){Ua(n,"travel-to-fork","Reach the Three-Way Fork.",t);return}const i=ys(n);if(n.quest.phase==="confrontation"&&n.quest.intent==="connect"&&i!==void 0&&pc(n.player,i)){fc(n,"connect",t);return}if(n.quest.phase==="return-town"&&n.quest.outcome!==null&&Ud(n.player,dn.town.interactionPoint)){const r={...Tp[n.quest.outcome]};n.quest.phase="result",n.quest.objective="Route complete.",n.quest.result=r,n.status="result",t.push({type:"result-reached",tick:n.tick,result:r,cue:"result"})}}function Jp(n,e,t){e.chooseWeapon===void 0||e.chooseWeapon===n.player.weaponId||(n.player.weaponId=e.chooseWeapon,t.push({type:"weapon-selected",tick:n.tick,weaponId:e.chooseWeapon}))}function mc(n,e){return e.active&&!e.defeated&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function Qp(n,e,t){e.defeated||(e.defeated=!0,e.active=!1,e.disposition="destroyed",e.attack=vs(),t.push({type:"enemy-defeated",tick:n.tick,enemyId:e.id,kind:e.kind}),e.id===Ii&&fc(n,"destroy",t))}function Wh(n,e,t,i,r){if(!mc(n,e))return;const s=Math.min(e.hp,Math.max(0,t));e.hp=Math.max(0,e.hp-s),r.push({type:"enemy-damaged",tick:n.tick,enemyId:e.id,amount:s,remainingHp:e.hp,source:i}),e.hp===0&&Qp(n,e,r)}function $p(n){const e=La[n.player.weaponId];return{...e,damage:e.damage+n.player.weaponDamageBonuses[n.player.weaponId]}}function zd(n,e){return kn(n.x,n.y,e.x,e.y)}function em(n,e,t){const i=e.x-n.x,r=e.y-n.y,s=Math.hypot(i,r);return s-e.radius>t.range?!1:s===0?!0:i/s*n.facingX+r/s*n.facingY>=t.arcCosine}function tm(n,e,t){if(t<=0||e.defeated)return;const i=xs(e.x-n.player.x,e.y-n.player.y),r=Na(n,e.x,e.y,e.radius,i.x*t,i.y*t);e.x=r.x,e.y=r.y}function nm(n,e,t,i){if(e.attack!==!0||n.player.weaponCooldownTicks>0||n.player.guarding||i)return;const r=$p(n),s=hc(n,"player-attack");n.player.weaponCooldownTicks=r.cooldownTicks,t.push({type:"player-attacked",tick:n.tick,actionId:s,weaponId:r.id,x:n.player.x,y:n.player.y,directionX:n.player.facingX,directionY:n.player.facingY,range:r.range,damage:r.damage,cooldownTicks:r.cooldownTicks,cue:r.cue});const a=n.enemies.filter(o=>mc(n,o)&&em(n.player,o,r)).sort((o,c)=>zd(n.player,o)-zd(n.player,c)||o.id.localeCompare(c.id)).slice(0,r.hitLimit);for(const o of a)Wh(n,o,r.damage,r.id,t),tm(n,o,r.knockback)}function im(n,e,t){if(e.activateRelic!==!0||n.player.relicCooldownTicks>0)return;n.player.relicCooldownTicks=n.player.relicCooldownMaxTicks,t.push({type:"relic-activated",tick:n.tick,x:n.player.x,y:n.player.y,radius:n.player.relicRange,damage:n.player.relicDamage,cue:"relic"});const i=ys(n);n.quest.phase==="confrontation"&&n.quest.intent==="calm"&&i!==void 0&&kn(n.player.x,n.player.y,i.x,i.y)<=n.player.relicRange+i.radius&&fc(n,"calm",t);for(const r of n.enemies)mc(n,r)&&kn(n.player.x,n.player.y,r.x,r.y)<=n.player.relicRange+r.radius&&Wh(n,r,n.player.relicDamage,"relic",t)}function rm(n,e,t){if(e.useItem!==!0)return;if(n.player.healingItems<=0){t.push({type:"command-rejected",tick:n.tick,reason:"item-empty"});return}if(n.player.hp>=n.player.maxHp){t.push({type:"command-rejected",tick:n.tick,reason:"item-full-health"});return}const i=n.player.hp;n.player.hp=Math.min(n.player.maxHp,n.player.hp+n.player.healingAmount),n.player.healingItems-=1,t.push({type:"item-used",tick:n.tick,healed:n.player.hp-i,remainingItems:n.player.healingItems,cue:"heal"})}function sm(n,e,t){const i=Ur[e.kind],r=xs(n.player.x-e.x,n.player.y-e.y),s=hc(n,"enemy-attack");e.attack={phase:"telegraph",ticksRemaining:i.telegraphTicks,attackId:s,targetX:n.player.x,targetY:n.player.y,directionX:r.x,directionY:r.y},t.push({type:"enemy-attack-telegraphed",tick:n.tick,enemyId:e.id,attackId:s,x:e.x,y:e.y,directionX:r.x,directionY:r.y,range:i.attackRange,resolveTick:n.tick+i.telegraphTicks,cue:"enemy-warning"})}function am(n,e){const t=Ur[e.kind],i=n.player.x-e.x,r=n.player.y-e.y,s=Math.hypot(i,r);return s>t.attackRange+e.radius+n.player.radius?!1:s===0?!0:i/s*e.attack.directionX+r/s*e.attack.directionY>=.15}function om(n,e){const t=xs(e.x-n.x,e.y-n.y);return t.x*n.facingX+t.y*n.facingY>=0}function lm(n,e,t){const i=Ur[e.kind],r=e.attack.attackId??hc(n,"enemy-attack"),s=am(n,e);if(t.push({type:"enemy-attack-resolved",tick:n.tick,enemyId:e.id,attackId:r,hit:s,cue:"enemy-impact"}),s)if(n.player.invulnerableTicks>0)t.push({type:"player-dodged",tick:n.tick,enemyId:e.id});else{const a=n.player.guarding&&om(n.player,e);let o=i.damage;if(a){const l=(n.player.guardStartedTick===null?Number.POSITIVE_INFINITY:n.tick-n.player.guardStartedTick)<=Np;o=l?0:Math.max(1,Math.ceil(i.damage*Up)),t.push({type:"guard-resolved",tick:n.tick,enemyId:e.id,justGuard:l,preventedDamage:i.damage-o,receivedDamage:o,cue:l?"just-guard":"guard"})}o>0&&(n.player.hp=Math.max(0,n.player.hp-o),t.push({type:"player-damaged",tick:n.tick,enemyId:e.id,amount:o,remainingHp:n.player.hp}))}e.attack={...vs(),phase:"recovery",ticksRemaining:i.recoveryTicks}}function cm(n,e,t){if(!e.active||e.defeated||e.disposition!=="hostile"||n.status!=="playing")return;if(e.attack.phase==="telegraph"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&lm(n,e,t);return}if(e.attack.phase==="recovery"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&(e.attack=vs());return}const i=Ur[e.kind],r=kn(e.x,e.y,n.player.x,n.player.y);if(r>i.aggroRange)return;const s=i.attackRange+e.radius+n.player.radius;if(r>s){const o=xs(n.player.x-e.x,n.player.y-e.y),c=Na(n,e.x,e.y,e.radius,o.x*(i.speed/$n),o.y*(i.speed/$n));e.x=c.x,e.y=c.y}kn(e.x,e.y,n.player.x,n.player.y)<=s&&sm(n,e,t)}function dm(n,e){for(const t of n.enemies)if(cm(n,t,e),n.player.hp===0){n.status="lost",e.push({type:"player-defeated",tick:n.tick});break}}function um(n,e={}){if(n.status!=="playing")return{state:n,events:[]};const t=kp(n),i=[];t.tick+=1,Hp(t.player),Xp(t,e);const r=Wp(t,e,i);return qp(t,i),Jp(t,e,i),Kp(t,e,i),jp(t,e,i),nm(t,e,i,r),im(t,e,i),rm(t,e,i),dm(t,i),{state:t,events:i}}const gc={blade:{buildId:"counter-cutter",acquireRange:132,dropRange:164,hitRange:108,minimumFacingAlignment:Math.max(0,La.blade.arcCosine),windupTicks:5,recoveryTicks:9,windupMovementScale:1,hitMovementScale:.9,recoveryMovementScale:1},impact:{buildId:"breach-driver",acquireRange:96,dropRange:128,hitRange:82,minimumFacingAlignment:Math.max(0,La.impact.arcCosine),windupTicks:18,recoveryTicks:16,windupMovementScale:.35,hitMovementScale:.2,recoveryMovementScale:.75}},Xh={phase:"idle",targetId:null,weaponId:null,phaseTicksRemaining:0,phaseTicksTotal:0};function qh(n,e){return Math.hypot(e.x-n.player.x,e.y-n.player.y)}function Yh(n,e){const t=e.x-n.player.x,i=e.y-n.player.y,r=Math.hypot(t,i);if(r===0)return 1;const s=Math.hypot(n.player.facingX,n.player.facingY);return s===0?-1:t/r*(n.player.facingX/s)+i/r*(n.player.facingY/s)}function hm(n,e){return n.status==="playing"&&e.active&&!e.defeated&&e.hp>0&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function Vi(n,e,t,i){return hm(n,e)&&qh(n,e)<=i&&Yh(n,e)>=t.minimumFacingAlignment}function ns(n,e){if(e!==null)return n.enemies.find(t=>t.id===e)}function Od(n,e,t){const i=e.attack.phase==="telegraph"?1:0,r=e.id===t?1:0;return 1e3-qh(n,e)*2+Yh(n,e)*120+i*160+r*80}function fm(n,e,t){return n.enemies.filter(i=>Vi(n,i,e,e.acquireRange)).sort((i,r)=>Od(n,r,t)-Od(n,i,t)||i.id.localeCompare(r.id))[0]}function ba(n,e,t,i){return{phase:n,targetId:t,weaponId:e,phaseTicksRemaining:i,phaseTicksTotal:i}}function Fd(n){return{...Xh,weaponId:n}}function nr(n,e){const t=n.player.weaponId,i=gc[t];if(n.status!=="playing"||n.player.guarding||n.player.weaponCooldownTicks>0)return Fd(t);const r=fm(n,i,e);return r===void 0?Fd(t):ba("acquire",t,r.id,1)}function pm(n,e){if(e===null)return 1;switch(n.phase){case"windup":return e.windupMovementScale;case"hit":return e.hitMovementScale;case"recover":return e.recoveryMovementScale;case"idle":case"acquire":return 1}}function mm(n,e){const t=n.weaponId===null?null:gc[n.weaponId],i=ns(e,n.targetId);let r=0;return n.phase==="hit"?r=1:n.phaseTicksTotal>0&&(r=1-n.phaseTicksRemaining/n.phaseTicksTotal),{phase:n.phase,buildId:t?.buildId??null,weaponId:n.weaponId,targetId:n.targetId,phaseTicksRemaining:n.phaseTicksRemaining,phaseTicksTotal:n.phaseTicksTotal,phaseProgress:r,movementScale:pm(n,t),targetInHitRange:t!==null&&i!==void 0&&Vi(e,i,t,t.hitRange)}}function An(n,e,t=!1){return{state:n,presentation:mm(n,e),commandContribution:t?{attack:!0}:{}}}function uo(){return{...Xh}}function gm(n,e){const t=e.player.weaponId,i=gc[t];if(e.status!=="playing"||e.player.guarding||n.weaponId!==null&&n.weaponId!==t)return An(nr(e,null),e);switch(n.phase){case"idle":return An(nr(e,n.targetId),e);case"acquire":{const r=ns(e,n.targetId);return r===void 0||!Vi(e,r,i,i.dropRange)?An(nr(e,n.targetId),e):An(ba("windup",t,r.id,i.windupTicks),e)}case"windup":{const r=ns(e,n.targetId);if(r===void 0||!Vi(e,r,i,i.dropRange))return An(nr(e,n.targetId),e);if(n.phaseTicksRemaining>1){const s={...n,phaseTicksRemaining:n.phaseTicksRemaining-1};return An(s,e)}return e.player.weaponCooldownTicks>0||!Vi(e,r,i,i.hitRange)?An(nr(e,n.targetId),e):An(ba("hit",t,r.id,1),e,!0)}case"hit":{const r=ns(e,n.targetId);return An(ba("recover",t,r!==void 0&&Vi(e,r,i,i.dropRange)?r.id:null,i.recoveryTicks),e)}case"recover":{if(n.phaseTicksRemaining>1){const r=ns(e,n.targetId),s={...n,targetId:r!==void 0&&Vi(e,r,i,i.dropRange)?r.id:null,phaseTicksRemaining:n.phaseTicksRemaining-1};return An(s,e)}return An(nr(e,n.targetId),e)}}}const xc="185",xm=0,Bd=1,vm=2,os=1,ym=2,is=3,gi=0,ln=1,an=2,Kt=0,wr=1,za=2,kd=3,Vd=4,Zh=5,zn=100,_m=101,Mm=102,Sm=103,bm=104,rs=200,wm=201,Em=202,Tm=203,fl=204,pl=205,ml=206,Am=207,gl=208,Rm=209,Cm=210,Pm=211,Dm=212,Im=213,Lm=214,xl=0,vl=1,yl=2,Cr=3,_l=4,Ml=5,Sl=6,bl=7,vc=0,Nm=1,Um=2,Jn=0,yc=1,_c=2,Mc=3,Sc=4,bc=5,qa=6,wc=7,Kh=300,qi=301,Pr=302,ho=303,fo=304,Ya=306,Vn=1e3,ui=1001,wl=1002,Ft=1003,zm=1004,Ps=1005,Bt=1006,po=1007,hi=1008,on=1009,jh=1010,Jh=1011,cs=1012,Ec=1013,ei=1014,On=1015,Jt=1016,Tc=1017,Ac=1018,Dr=1020,Qh=35902,$h=35899,ef=1021,tf=1022,vn=1023,xi=1026,Pi=1027,Rc=1028,Cc=1029,Yi=1030,Pc=1031,Dc=1033,wa=33776,Ea=33777,Ta=33778,Aa=33779,El=35840,Tl=35841,Al=35842,Rl=35843,Cl=36196,Pl=37492,Dl=37496,Il=37488,Ll=37489,Oa=37490,Nl=37491,Ul=37808,zl=37809,Ol=37810,Fl=37811,Bl=37812,kl=37813,Vl=37814,Hl=37815,Gl=37816,Wl=37817,Xl=37818,ql=37819,Yl=37820,Zl=37821,Kl=36492,jl=36494,Jl=36495,Ql=36283,$l=36284,Fa=36285,ec=36286,Om=3200,ds=0,Fm=1,ci="",jt="srgb",us="srgb-linear",Ba="linear",ht="srgb",ir=7680,Hd=519,Bm=512,km=513,Vm=514,Ic=515,Hm=516,Gm=517,Lc=518,Wm=519,Gd=35044,Wd="300 es",jn=2e3,hs=2001;function Xm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function fs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qm(){const n=fs("canvas");return n.style.display="block",n}const Xd={};function qd(...n){const e="THREE."+n.shift();console.log(e,...n)}function nf(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Fe(...n){n=nf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ct(...n){n=nf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Er(...n){const e=n.join(" ");e in Xd||(Xd[e]=!0,Fe(...n))}function Ym(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Zm={[xl]:vl,[yl]:Sl,[_l]:bl,[Cr]:Ml,[vl]:xl,[Sl]:yl,[bl]:_l,[Ml]:Cr};class Qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Yd=1234567;const Tr=Math.PI/180,ps=180/Math.PI;function zr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function Nc(n,e){return(n%e+e)%e}function Km(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function jm(n,e,t){return n!==e?(t-n)/(e-n):0}function ls(n,e,t){return(1-t)*n+t*e}function Jm(n,e,t,i){return ls(n,e,1-Math.exp(-t*i))}function Qm(n,e=1){return e-Math.abs(Nc(n,e*2)-e)}function $m(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function e0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function t0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function n0(n,e){return n+Math.random()*(e-n)}function i0(n){return n*(.5-Math.random())}function r0(n){n!==void 0&&(Yd=n);let e=Yd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function s0(n){return n*Tr}function a0(n){return n*ps}function o0(n){return(n&n-1)===0&&n!==0}function l0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function c0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function d0(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),d=a((e+i)/2),h=s((e-i)/2),u=a((e-i)/2),p=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*d,c*h,c*u,o*l);break;case"YZY":n.set(c*u,o*d,c*h,o*l);break;case"ZXZ":n.set(c*h,c*u,o*d,o*l);break;case"XZX":n.set(o*d,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*d,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*d,o*l);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Mr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function rn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Rt={DEG2RAD:Tr,RAD2DEG:ps,generateUUID:zr,clamp:nt,euclideanModulo:Nc,mapLinear:Km,inverseLerp:jm,lerp:ls,damp:Jm,pingpong:Qm,smoothstep:$m,smootherstep:e0,randInt:t0,randFloat:n0,randFloatSpread:i0,seededRandom:r0,degToRad:s0,radToDeg:a0,isPowerOfTwo:o0,ceilPowerOfTwo:l0,floorPowerOfTwo:c0,setQuaternionFromProperEuler:d0,normalize:rn,denormalize:Mr},ld=class ld{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ld.prototype.isVector2=!0;let Se=ld;class Tn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],d=i[r+2],h=i[r+3],u=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(h!==v||c!==u||l!==p||d!==g){let m=c*u+l*p+d*g+h*v;m<0&&(u=-u,p=-p,g=-g,v=-v,m=-m);let f=1-o;if(m<.9995){const x=Math.acos(m),S=Math.sin(x);f=Math.sin(f*x)/S,o=Math.sin(o*x)/S,c=c*f+u*o,l=l*f+p*o,d=d*f+g*o,h=h*f+v*o}else{c=c*f+u*o,l=l*f+p*o,d=d*f+g*o,h=h*f+v*o;const x=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=x,l*=x,d*=x,h*=x}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],d=i[r+3],h=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+d*h+c*p-l*u,e[t+1]=c*g+d*u+l*h-o*p,e[t+2]=l*g+d*p+o*u-c*h,e[t+3]=d*g-o*h-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(r/2),h=o(s/2),u=c(i/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=u*d*h+l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h+u*p*g;break;case"YZX":this._x=u*d*h+l*p*g,this._y=l*p*h+u*d*g,this._z=l*d*g-u*p*h,this._w=l*d*h-u*p*g;break;case"XZY":this._x=u*d*h-l*p*g,this._y=l*p*h-u*d*g,this._z=l*d*g+u*p*h,this._w=l*d*h+u*p*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+r*l-s*c,this._y=r*d+a*c+s*o-i*l,this._z=s*d+a*l+i*c-r*o,this._w=a*d-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const cd=class cd{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),d=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*d,this.y=i+c*d+o*l-s*h,this.z=r+c*h+s*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mo.copy(this).projectOnVector(e),this.sub(mo)}reflect(e){return this.sub(mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};cd.prototype.isVector3=!0;let I=cd;const mo=new I,Zd=new Tn,dd=class dd{constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],v=r[0],m=r[3],f=r[6],x=r[1],S=r[4],y=r[7],E=r[2],b=r[5],A=r[8];return s[0]=a*v+o*x+c*E,s[3]=a*m+o*S+c*b,s[6]=a*f+o*y+c*A,s[1]=l*v+d*x+h*E,s[4]=l*m+d*S+h*b,s[7]=l*f+d*y+h*A,s[2]=u*v+p*x+g*E,s[5]=u*m+p*S+g*b,s[8]=u*f+p*y+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*s*d+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*s,p=l*s-a*c,g=t*h+i*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*l-d*i)*v,e[2]=(o*i-r*a)*v,e[3]=u*v,e[4]=(d*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Er("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(go.makeScale(e,t)),this}rotate(e){return Er("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(go.makeRotation(-e)),this}translate(e,t){return Er("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(go.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};dd.prototype.isMatrix3=!0;let Ve=dd;const go=new Ve,Kd=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jd=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function u0(){const n={enabled:!0,workingColorSpace:us,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ht&&(r.r=fi(r.r),r.g=fi(r.g),r.b=fi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(r.r=Ar(r.r),r.g=Ar(r.g),r.b=Ar(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ci?Ba:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Er("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Er("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[us]:{primaries:e,whitePoint:i,transfer:Ba,toXYZ:Kd,fromXYZ:jd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:Kd,fromXYZ:jd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),n}const tt=u0();function fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let rr;class h0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{rr===void 0&&(rr=fs("canvas")),rr.width=e.width,rr.height=e.height;const r=rr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=rr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=fi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fi(t[i]/255)*255):t[i]=fi(t[i]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let f0=0;class Uc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=zr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(xo(r[a].image)):s.push(xo(r[a]))}else s=xo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function xo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?h0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let p0=0;const vo=new I;class Qt extends Qi{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=ui,r=ui,s=Bt,a=hi,o=vn,c=on,l=Qt.DEFAULT_ANISOTROPY,d=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=zr(),this.name="",this.source=new Uc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vn:e.x=e.x-Math.floor(e.x);break;case ui:e.x=e.x<0?0:1;break;case wl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vn:e.y=e.y-Math.floor(e.y);break;case ui:e.y=e.y<0?0:1;break;case wl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Kh;Qt.DEFAULT_ANISOTROPY=1;const ud=class ud{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],p=c[5],g=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,y=(p+1)/2,E=(f+1)/2,b=(d+u)/4,A=(h+v)/4,_=(g+m)/4;return S>y&&S>E?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=b/i,s=A/i):y>E?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=b/r,s=_/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=A/s,r=_/s),this.set(i,r,s,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-v)/x,this.z=(u-d)/x,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ud.prototype.isVector4=!0;let Ct=ud;class m0 extends Qi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Qt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Uc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wt extends m0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rf extends Qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class g0 extends Qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xa=class Xa{constructor(e,t,i,r,s,a,o,c,l,d,h,u,p,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,d,h,u,p,g,v,m)}set(e,t,i,r,s,a,o,c,l,d,h,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xa().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/sr.setFromMatrixColumn(e,0).length(),s=1/sr.setFromMatrixColumn(e,1).length(),a=1/sr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,p=c*h,g=l*d,v=l*h;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,p=c*h,g=l*d,v=l*h;t[0]=u-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=g*l-p,t[8]=u*l+v,t[1]=c*h,t[5]=v*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=v-u*h,t[8]=g*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+v,t[5]=a*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(x0,e,v0)}lookAt(e,t,i){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),bi.crossVectors(i,hn),bi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),bi.crossVectors(i,hn)),bi.normalize(),Ds.crossVectors(hn,bi),r[0]=bi.x,r[4]=Ds.x,r[8]=hn.x,r[1]=bi.y,r[5]=Ds.y,r[9]=hn.y,r[2]=bi.z,r[6]=Ds.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],v=i[6],m=i[10],f=i[14],x=i[3],S=i[7],y=i[11],E=i[15],b=r[0],A=r[4],_=r[8],w=r[12],R=r[1],P=r[5],D=r[9],O=r[13],B=r[2],U=r[6],W=r[10],k=r[14],q=r[3],J=r[7],ne=r[11],ae=r[15];return s[0]=a*b+o*R+c*B+l*q,s[4]=a*A+o*P+c*U+l*J,s[8]=a*_+o*D+c*W+l*ne,s[12]=a*w+o*O+c*k+l*ae,s[1]=d*b+h*R+u*B+p*q,s[5]=d*A+h*P+u*U+p*J,s[9]=d*_+h*D+u*W+p*ne,s[13]=d*w+h*O+u*k+p*ae,s[2]=g*b+v*R+m*B+f*q,s[6]=g*A+v*P+m*U+f*J,s[10]=g*_+v*D+m*W+f*ne,s[14]=g*w+v*O+m*k+f*ae,s[3]=x*b+S*R+y*B+E*q,s[7]=x*A+S*P+y*U+E*J,s[11]=x*_+S*D+y*W+E*ne,s[15]=x*w+S*O+y*k+E*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15],x=c*p-l*u,S=o*p-l*h,y=o*u-c*h,E=a*p-l*d,b=a*u-c*d,A=a*h-o*d;return t*(v*x-m*S+f*y)-i*(g*x-m*E+f*b)+r*(g*S-v*E+f*A)-s*(g*y-v*b+m*A)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(s*d-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],x=t*o-i*a,S=t*c-r*a,y=t*l-s*a,E=i*c-r*o,b=i*l-s*o,A=r*l-s*c,_=d*v-h*g,w=d*m-u*g,R=d*f-p*g,P=h*m-u*v,D=h*f-p*v,O=u*f-p*m,B=x*O-S*D+y*P+E*R-b*w+A*_;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/B;return e[0]=(o*O-c*D+l*P)*U,e[1]=(r*D-i*O-s*P)*U,e[2]=(v*A-m*b+f*E)*U,e[3]=(u*b-h*A-p*E)*U,e[4]=(c*R-a*O-l*w)*U,e[5]=(t*O-r*R+s*w)*U,e[6]=(m*y-g*A-f*S)*U,e[7]=(d*A-u*y+p*S)*U,e[8]=(a*D-o*R+l*_)*U,e[9]=(i*R-t*D-s*_)*U,e[10]=(g*b-v*y+f*x)*U,e[11]=(h*y-d*b-p*x)*U,e[12]=(o*w-a*P-c*_)*U,e[13]=(t*P-i*w+r*_)*U,e[14]=(v*S-g*E-m*x)*U,e[15]=(d*E-h*S+u*x)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,d=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,d*o+i,d*c-r*a,0,l*c-r*o,d*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,d=a+a,h=o+o,u=s*l,p=s*d,g=s*h,v=a*d,m=a*h,f=o*h,x=c*l,S=c*d,y=c*h,E=i.x,b=i.y,A=i.z;return r[0]=(1-(v+f))*E,r[1]=(p+y)*E,r[2]=(g-S)*E,r[3]=0,r[4]=(p-y)*b,r[5]=(1-(u+f))*b,r[6]=(m+x)*b,r[7]=0,r[8]=(g+S)*A,r[9]=(m-x)*A,r[10]=(1-(u+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=sr.set(r[0],r[1],r[2]).length();const o=sr.set(r[4],r[5],r[6]).length(),c=sr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Rn.copy(this);const l=1/a,d=1/o,h=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=d,Rn.elements[5]*=d,Rn.elements[6]*=d,Rn.elements[8]*=h,Rn.elements[9]*=h,Rn.elements[10]*=h,t.setFromRotationMatrix(Rn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=jn,c=!1){const l=this.elements,d=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),p=(i+r)/(i-r);let g,v;if(c)g=s/(a-s),v=a*s/(a-s);else if(o===jn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===hs)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=jn,c=!1){const l=this.elements,d=2/(t-e),h=2/(i-r),u=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,v;if(c)g=1/(a-s),v=a/(a-s);else if(o===jn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===hs)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Xa.prototype.isMatrix4=!0;let st=Xa;const sr=new I,Rn=new st,x0=new I(0,0,0),v0=new I(1,1,1),bi=new I,Ds=new I,hn=new I,Jd=new st,Qd=new Tn;class yn{constructor(e=0,t=0,i=0,r=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],d=r[9],h=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Jd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qd.setFromEuler(this),this.setFromQuaternion(Qd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class sf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let y0=0;const $d=new I,ar=new Tn,ni=new st,Is=new I,Vr=new I,_0=new I,M0=new Tn,eu=new I(1,0,0),tu=new I(0,1,0),nu=new I(0,0,1),iu={type:"added"},S0={type:"removed"},or={type:"childadded",child:null},yo={type:"childremoved",child:null};class At extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new I,t=new yn,i=new Tn,r=new I(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Ve}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.multiply(ar),this}rotateOnWorldAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.premultiply(ar),this}rotateX(e){return this.rotateOnAxis(eu,e)}rotateY(e){return this.rotateOnAxis(tu,e)}rotateZ(e){return this.rotateOnAxis(nu,e)}translateOnAxis(e,t){return $d.copy(e).applyQuaternion(this.quaternion),this.position.add($d.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(eu,e)}translateY(e){return this.translateOnAxis(tu,e)}translateZ(e){return this.translateOnAxis(nu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Is.copy(e):Is.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Vr,Is,this.up):ni.lookAt(Is,Vr,this.up),this.quaternion.setFromRotationMatrix(ni),r&&(ni.extractRotation(r.matrixWorld),ar.setFromRotationMatrix(ni),this.quaternion.premultiply(ar.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ct("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(iu),or.child=e,this.dispatchEvent(or),or.child=null):ct("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(S0),yo.child=e,this.dispatchEvent(yo),yo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(iu),or.child=e,this.dispatchEvent(or),or.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,_0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,M0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}At.DEFAULT_UP=new I(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ke extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const b0={type:"move"};class _o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(b0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function Mo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class De{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=tt.workingColorSpace){if(e=Nc(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Mo(a,s,e+1/3),this.g=Mo(a,s,e),this.b=Mo(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const i=af[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return tt.workingToColorSpace(tn.copy(this),e),Math.round(nt(tn.r*255,0,255))*65536+Math.round(nt(tn.g*255,0,255))*256+Math.round(nt(tn.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(tn.copy(this),t);const i=tn.r,r=tn.g,s=tn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=jt){tt.workingToColorSpace(tn.copy(this),e);const t=tn.r,i=tn.g,r=tn.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(Ls);const i=ls(wi.h,Ls.h,t),r=ls(wi.s,Ls.s,t),s=ls(wi.l,Ls.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new De;De.NAMES=af;class zc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new De(e),this.near=t,this.far=i}clone(){return new zc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class of extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new I,ii=new I,So=new I,ri=new I,lr=new I,cr=new I,ru=new I,bo=new I,wo=new I,Eo=new I,To=new Ct,Ao=new Ct,Ro=new Ct;class En{constructor(e=new I,t=new I,i=new I){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Cn.subVectors(e,t),r.cross(Cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Cn.subVectors(r,t),ii.subVectors(i,t),So.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot(ii),c=Cn.dot(So),l=ii.dot(ii),d=ii.dot(So),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(l*c-o*d)*u,g=(a*d-o*c)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ri.x),c.addScaledVector(a,ri.y),c.addScaledVector(o,ri.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return To.setScalar(0),Ao.setScalar(0),Ro.setScalar(0),To.fromBufferAttribute(e,t),Ao.fromBufferAttribute(e,i),Ro.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(To,s.x),a.addScaledVector(Ao,s.y),a.addScaledVector(Ro,s.z),a}static isFrontFacing(e,t,i,r){return Cn.subVectors(i,t),ii.subVectors(e,t),Cn.cross(ii).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Cn.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return En.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;lr.subVectors(r,i),cr.subVectors(s,i),bo.subVectors(e,i);const c=lr.dot(bo),l=cr.dot(bo);if(c<=0&&l<=0)return t.copy(i);wo.subVectors(e,r);const d=lr.dot(wo),h=cr.dot(wo);if(d>=0&&h<=d)return t.copy(r);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector(lr,a);Eo.subVectors(e,s);const p=lr.dot(Eo),g=cr.dot(Eo);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(cr,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return ru.subVectors(s,r),o=(h-d)/(h-d+(p-g)),t.copy(r).addScaledVector(ru,o);const f=1/(m+v+u);return a=v*f,o=u*f,t.copy(i).addScaledVector(lr,a).addScaledVector(cr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class $i{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pn):Pn.fromBufferAttribute(s,a),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ns.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ns.copy(i.boundingBox)),Ns.applyMatrix4(e.matrixWorld),this.union(Ns)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),Us.subVectors(this.max,Hr),dr.subVectors(e.a,Hr),ur.subVectors(e.b,Hr),hr.subVectors(e.c,Hr),Ei.subVectors(ur,dr),Ti.subVectors(hr,ur),zi.subVectors(dr,hr);let t=[0,-Ei.z,Ei.y,0,-Ti.z,Ti.y,0,-zi.z,zi.y,Ei.z,0,-Ei.x,Ti.z,0,-Ti.x,zi.z,0,-zi.x,-Ei.y,Ei.x,0,-Ti.y,Ti.x,0,-zi.y,zi.x,0];return!Co(t,dr,ur,hr,Us)||(t=[1,0,0,0,1,0,0,0,1],!Co(t,dr,ur,hr,Us))?!1:(zs.crossVectors(Ei,Ti),t=[zs.x,zs.y,zs.z],Co(t,dr,ur,hr,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const si=[new I,new I,new I,new I,new I,new I,new I,new I],Pn=new I,Ns=new $i,dr=new I,ur=new I,hr=new I,Ei=new I,Ti=new I,zi=new I,Hr=new I,Us=new I,zs=new I,Oi=new I;function Co(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Oi.fromArray(n,s);const o=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),d=i.dot(Oi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const kt=new I,Os=new Se;let w0=0;class Ht extends Qi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:w0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gd,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Os.fromBufferAttribute(this,t),Os.applyMatrix3(e),this.setXY(t,Os.x,Os.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Mr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=rn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mr(t,this.array)),t}setX(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mr(t,this.array)),t}setY(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mr(t,this.array)),t}setW(e,t){return this.normalized&&(t=rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=rn(t,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class lf extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class cf extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Xe extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}}const E0=new $i,Gr=new I,Po=new I;class Or{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):E0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);const t=Gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Gr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(Po)),this.expandByPoint(Gr.copy(e.center).sub(Po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let T0=0;const Mn=new st,Do=new At,fr=new I,fn=new $i,Wr=new $i,Yt=new I;class Et extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=zr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xm(e)?cf:lf)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,i){return Mn.makeTranslation(e,t,i),this.applyMatrix4(Mn),this}scale(e,t,i){return Mn.makeScale(e,t,i),this.applyMatrix4(Mn),this}lookAt(e){return Do.lookAt(e),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xe(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ct('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Wr.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(fn.min,Wr.min),fn.expandByPoint(Yt),Yt.addVectors(fn.max,Wr.max),fn.expandByPoint(Yt)):(fn.expandByPoint(Wr.min),fn.expandByPoint(Wr.max))}fn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Yt.fromBufferAttribute(o,l),c&&(fr.fromBufferAttribute(e,l),Yt.add(fr)),r=Math.max(r,i.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ct('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ct("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ht(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new I,c[_]=new I;const l=new I,d=new I,h=new I,u=new Se,p=new Se,g=new Se,v=new I,m=new I;function f(_,w,R){l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,w),h.fromBufferAttribute(i,R),u.fromBufferAttribute(s,_),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,R),d.sub(l),h.sub(l),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(P),o[_].add(v),o[w].add(v),o[R].add(v),c[_].add(m),c[w].add(m),c[R].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let _=0,w=x.length;_<w;++_){const R=x[_],P=R.start,D=R.count;for(let O=P,B=P+D;O<B;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const S=new I,y=new I,E=new I,b=new I;function A(_){E.fromBufferAttribute(r,_),b.copy(E);const w=o[_];S.copy(w),S.sub(E.multiplyScalar(E.dot(w))).normalize(),y.crossVectors(b,w);const P=y.dot(c[_])<0?-1:1;a.setXYZW(_,S.x,S.y,S.z,P)}for(let _=0,w=x.length;_<w;++_){const R=x[_],P=R.start,D=R.count;for(let O=P,B=P+D;O<B;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,d=new I,h=new I;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),o.add(d),c.add(d),l.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*d;for(let f=0;f<d;f++)u[g++]=l[p++]}return new Ht(u,d,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const p=l[h];d.push(p.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const d=r[l];this.setAttribute(l,d.clone(t))}const s=e.morphAttributes;for(const l in s){const d=[],h=s[l];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let A0=0;class Li extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=zr(),this.name="",this.type="Material",this.blending=wr,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fl,this.blendDst=pl,this.blendEquation=zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ir,this.stencilZFail=ir,this.stencilZPass=ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==wr&&(i.blending=this.blending),this.side!==gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==fl&&(i.blendSrc=this.blendSrc),this.blendDst!==pl&&(i.blendDst=this.blendDst),this.blendEquation!==zn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ir&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ir&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ir&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new De().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Se().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Se().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ai=new I,Io=new I,Fs=new I,Ai=new I,Lo=new I,Bs=new I,No=new I;class df{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Io.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Io);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Fs),o=Ai.dot(this.direction),c=-Ai.dot(Fs),l=Ai.lengthSq(),d=Math.abs(1-a*a);let h,u,p,g;if(d>0)if(h=a*c-o,u=a*o-c,g=s*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,p=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u=-s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;else u<=-g?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+u*(u+2*c)+l):u<=g?(h=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+l):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+u*(u+2*c)+l);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Io).addScaledVector(Fs,u),p}intersectSphere(e,t){ai.subVectors(e.center,this.origin);const i=ai.dot(this.direction),r=ai.dot(ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),d>=0?(s=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,i,r,s){Lo.subVectors(t,e),Bs.subVectors(i,e),No.crossVectors(Lo,Bs);let a=this.direction.dot(No),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);const c=o*this.direction.dot(Bs.crossVectors(Ai,Bs));if(c<0)return null;const l=o*this.direction.dot(Lo.cross(Ai));if(l<0||c+l>a)return null;const d=-o*Ai.dot(No);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pt extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const su=new st,Fi=new df,ks=new Or,au=new I,Vs=new I,Hs=new I,Gs=new I,Uo=new I,Ws=new I,ou=new I,Xs=new I;class Ue extends At{constructor(e=new Et,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ws.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const d=o[c],h=s[c];d!==0&&(Uo.fromBufferAttribute(h,e),a?Ws.addScaledVector(Uo,d):Ws.addScaledVector(Uo.sub(t),d))}t.add(Ws)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(s),Fi.copy(e.ray).recast(e.near),!(ks.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(ks,au)===null||Fi.origin.distanceToSquared(au)>(e.far-e.near)**2))&&(su.copy(s).invert(),Fi.copy(e.ray).applyMatrix4(su),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,E=S;y<E;y+=3){const b=o.getX(y),A=o.getX(y+1),_=o.getX(y+2);r=qs(this,f,e,i,l,d,h,b,A,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const x=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);r=qs(this,a,e,i,l,d,h,x,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,E=S;y<E;y+=3){const b=y,A=y+1,_=y+2;r=qs(this,f,e,i,l,d,h,b,A,_),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const x=m,S=m+1,y=m+2;r=qs(this,a,e,i,l,d,h,x,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function R0(n,e,t,i,r,s,a,o){let c;if(e.side===ln?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===gi,o),c===null)return null;Xs.copy(o),Xs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Xs);return l<t.near||l>t.far?null:{distance:l,point:Xs.clone(),object:n}}function qs(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Vs),n.getVertexPosition(c,Hs),n.getVertexPosition(l,Gs);const d=R0(n,e,t,i,Vs,Hs,Gs,ou);if(d){const h=new I;En.getBarycoord(ou,Vs,Hs,Gs,h),r&&(d.uv=En.getInterpolatedAttribute(r,o,c,l,h,new Se)),s&&(d.uv1=En.getInterpolatedAttribute(s,o,c,l,h,new Se)),a&&(d.normal=En.getInterpolatedAttribute(a,o,c,l,h,new I),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new I,materialIndex:0};En.getNormal(Vs,Hs,Gs,u.normal),d.face=u,d.barycoord=h}return d}class _s extends Qt{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Ft,d=Ft,h,u){super(null,a,o,c,l,d,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lu extends Ht{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const pr=new st,cu=new st,Ys=[],du=new $i,C0=new st,Xr=new Ue,qr=new Or;class ss extends Ue{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new lu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,C0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,pr),du.copy(e.boundingBox).applyMatrix4(pr),this.boundingBox.union(du)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,pr),qr.copy(e.boundingSphere).applyMatrix4(pr),this.boundingSphere.union(qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(i),e.ray.intersectsSphere(qr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pr),cu.multiplyMatrices(i,pr),Xr.matrixWorld=cu,Xr.raycast(e,Ys);for(let a=0,o=Ys.length;a<o;a++){const c=Ys[a];c.instanceId=s,c.object=this,t.push(c)}Ys.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new lu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new _s(new Float32Array(r*this.count),r,this.count,Rc,On));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const zo=new I,P0=new I,D0=new Ve;class ki{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=zo.subVectors(i,t).cross(P0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(zo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||D0.getNormalMatrix(e),r=this.coplanarPoint(zo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new Or,I0=new Se(.5,.5),Zs=new I;class Oc{constructor(e=new ki,t=new ki,i=new ki,r=new ki,s=new ki,a=new ki){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=jn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],p=s[7],g=s[8],v=s[9],m=s[10],f=s[11],x=s[12],S=s[13],y=s[14],E=s[15];if(r[0].setComponents(l-a,p-d,f-g,E-x).normalize(),r[1].setComponents(l+a,p+d,f+g,E+x).normalize(),r[2].setComponents(l+o,p+h,f+v,E+S).normalize(),r[3].setComponents(l-o,p-h,f-v,E-S).normalize(),i)r[4].setComponents(c,u,m,y).normalize(),r[5].setComponents(l-c,p-u,f-m,E-y).normalize();else if(r[4].setComponents(l-c,p-u,f-m,E-y).normalize(),t===jn)r[5].setComponents(l+c,p+u,f+m,E+y).normalize();else if(t===hs)r[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);const t=I0.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Zs.x=r.normal.x>0?e.max.x:e.min.x,Zs.y=r.normal.y>0?e.max.y:e.min.y,Zs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class tc extends Li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ka=new I,Va=new I,uu=new st,Yr=new df,Ks=new Or,Oo=new I,hu=new I;class L0 extends At{constructor(e=new Et,t=new tc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ka.fromBufferAttribute(t,r-1),Va.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ka.distanceTo(Va);e.setAttribute("lineDistance",new Xe(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ks.copy(i.boundingSphere),Ks.applyMatrix4(r),Ks.radius+=s,e.ray.intersectsSphere(Ks)===!1)return;uu.copy(r).invert(),Yr.copy(e.ray).applyMatrix4(uu);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=d.getX(v),x=d.getX(v+1),S=js(this,e,Yr,c,f,x,v);S&&t.push(S)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(p),f=js(this,e,Yr,c,v,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=l){const f=js(this,e,Yr,c,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){const v=js(this,e,Yr,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function js(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(ka.fromBufferAttribute(o,r),Va.fromBufferAttribute(o,s),t.distanceSqToSegment(ka,Va,Oo,hu)>i)return;Oo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Oo);if(!(l<e.near||l>e.far))return{distance:l,point:hu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const fu=new I,pu=new I;class Fo extends L0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)fu.fromBufferAttribute(t,r),pu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+fu.distanceTo(pu);e.setAttribute("lineDistance",new Xe(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class uf extends Qt{constructor(e=[],t=qi,i,r,s,a,o,c,l,d){super(e,t,i,r,s,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zi extends Qt{constructor(e,t,i=ei,r,s,a,o=Ft,c=Ft,l,d=xi,h=1){if(d!==xi&&d!==Pi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,r,s,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class N0 extends Zi{constructor(e,t=ei,i=qi,r,s,a=Ft,o=Ft,c,l=xi){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class hf extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cn extends Et{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(d,3)),this.setAttribute("uv",new Xe(h,2));function g(v,m,f,x,S,y,E,b,A,_,w){const R=y/A,P=E/_,D=y/2,O=E/2,B=b/2,U=A+1,W=_+1;let k=0,q=0;const J=new I;for(let ne=0;ne<W;ne++){const ae=ne*P-O;for(let le=0;le<U;le++){const Ge=le*R-D;J[v]=Ge*x,J[m]=ae*S,J[f]=B,l.push(J.x,J.y,J.z),J[v]=0,J[m]=0,J[f]=b>0?1:-1,d.push(J.x,J.y,J.z),h.push(le/A),h.push(1-ne/_),k+=1}}for(let ne=0;ne<_;ne++)for(let ae=0;ae<A;ae++){const le=u+ae+U*ne,Ge=u+ae+U*(ne+1),$e=u+(ae+1)+U*(ne+1),ke=u+(ae+1)+U*ne;c.push(le,Ge,ke),c.push(Ge,$e,ke),q+=6}o.addGroup(p,q,w),p+=q,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Za extends Et{constructor(e=1,t=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:r,heightSegments:s},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],d=t/2,h=Math.PI/2*e,u=t,p=2*h+u,g=i*2+s,v=r+1,m=new I,f=new I;for(let x=0;x<=g;x++){let S=0,y=0,E=0,b=0;if(x<=i){const w=x/i,R=w*Math.PI/2;y=-d-e*Math.cos(R),E=e*Math.sin(R),b=-e*Math.cos(R),S=w*h}else if(x<=i+s){const w=(x-i)/s;y=-d+w*t,E=e,b=0,S=h+w*u}else{const w=(x-i-s)/i,R=w*Math.PI/2;y=d+e*Math.sin(R),E=e*Math.cos(R),b=e*Math.sin(R),S=h+u+w*h}const A=Math.max(0,Math.min(1,S/p));let _=0;x===0?_=.5/r:x===g&&(_=-.5/r);for(let w=0;w<=r;w++){const R=w/r,P=R*Math.PI*2,D=Math.sin(P),O=Math.cos(P);f.x=-E*O,f.y=y,f.z=E*D,o.push(f.x,f.y,f.z),m.set(-E*O,b,E*D),m.normalize(),c.push(m.x,m.y,m.z),l.push(R+_,A)}if(x>0){const w=(x-1)*v;for(let R=0;R<r;R++){const P=w+R,D=w+R+1,O=x*v+R,B=x*v+R+1;a.push(P,D,O),a.push(D,B,O)}}}this.setIndex(a),this.setAttribute("position",new Xe(o,3)),this.setAttribute("normal",new Xe(c,3)),this.setAttribute("uv",new Xe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Za(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Fc extends Et{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new I,d=new Se;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const p=i+h/t*r;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(a[u]/e+1)/2,d.y=(a[u+1]/e+1)/2,c.push(d.x,d.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Xe(a,3)),this.setAttribute("normal",new Xe(o,3)),this.setAttribute("uv",new Xe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ka extends Et{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const d=[],h=[],u=[],p=[];let g=0;const v=[],m=i/2;let f=0;x(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(d),this.setAttribute("position",new Xe(h,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(p,2));function x(){const y=new I,E=new I;let b=0;const A=(t-e)/i;for(let _=0;_<=s;_++){const w=[],R=_/s,P=R*(t-e)+e;for(let D=0;D<=r;D++){const O=D/r,B=O*c+o,U=Math.sin(B),W=Math.cos(B);E.x=P*U,E.y=-R*i+m,E.z=P*W,h.push(E.x,E.y,E.z),y.set(U,A,W).normalize(),u.push(y.x,y.y,y.z),p.push(O,1-R),w.push(g++)}v.push(w)}for(let _=0;_<r;_++)for(let w=0;w<s;w++){const R=v[w][_],P=v[w+1][_],D=v[w+1][_+1],O=v[w][_+1];(e>0||w!==0)&&(d.push(R,P,O),b+=3),(t>0||w!==s-1)&&(d.push(P,D,O),b+=3)}l.addGroup(f,b,0),f+=b}function S(y){const E=g,b=new Se,A=new I;let _=0;const w=y===!0?e:t,R=y===!0?1:-1;for(let D=1;D<=r;D++)h.push(0,m*R,0),u.push(0,R,0),p.push(.5,.5),g++;const P=g;for(let D=0;D<=r;D++){const B=D/r*c+o,U=Math.cos(B),W=Math.sin(B);A.x=w*W,A.y=m*R,A.z=w*U,h.push(A.x,A.y,A.z),u.push(0,R,0),b.x=U*.5+.5,b.y=W*.5*R+.5,p.push(b.x,b.y),g++}for(let D=0;D<r;D++){const O=E+D,B=P+D;y===!0?d.push(B,B+1,O):d.push(B+1,B,O),_+=3}l.addGroup(f,_,y===!0?1:2),f+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ka(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ja extends Et{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],a=[];o(r),l(i),d(),this.setAttribute("position",new Xe(s,3)),this.setAttribute("normal",new Xe(s.slice(),3)),this.setAttribute("uv",new Xe(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const S=new I,y=new I,E=new I;for(let b=0;b<t.length;b+=3)p(t[b+0],S),p(t[b+1],y),p(t[b+2],E),c(S,y,E,x)}function c(x,S,y,E){const b=E+1,A=[];for(let _=0;_<=b;_++){A[_]=[];const w=x.clone().lerp(y,_/b),R=S.clone().lerp(y,_/b),P=b-_;for(let D=0;D<=P;D++)D===0&&_===b?A[_][D]=w:A[_][D]=w.clone().lerp(R,D/P)}for(let _=0;_<b;_++)for(let w=0;w<2*(b-_)-1;w++){const R=Math.floor(w/2);w%2===0?(u(A[_][R+1]),u(A[_+1][R]),u(A[_][R])):(u(A[_][R+1]),u(A[_+1][R+1]),u(A[_+1][R]))}}function l(x){const S=new I;for(let y=0;y<s.length;y+=3)S.x=s[y+0],S.y=s[y+1],S.z=s[y+2],S.normalize().multiplyScalar(x),s[y+0]=S.x,s[y+1]=S.y,s[y+2]=S.z}function d(){const x=new I;for(let S=0;S<s.length;S+=3){x.x=s[S+0],x.y=s[S+1],x.z=s[S+2];const y=m(x)/2/Math.PI+.5,E=f(x)/Math.PI+.5;a.push(y,1-E)}g(),h()}function h(){for(let x=0;x<a.length;x+=6){const S=a[x+0],y=a[x+2],E=a[x+4],b=Math.max(S,y,E),A=Math.min(S,y,E);b>.9&&A<.1&&(S<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),E<.2&&(a[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function p(x,S){const y=x*3;S.x=e[y+0],S.y=e[y+1],S.z=e[y+2]}function g(){const x=new I,S=new I,y=new I,E=new I,b=new Se,A=new Se,_=new Se;for(let w=0,R=0;w<s.length;w+=9,R+=6){x.set(s[w+0],s[w+1],s[w+2]),S.set(s[w+3],s[w+4],s[w+5]),y.set(s[w+6],s[w+7],s[w+8]),b.set(a[R+0],a[R+1]),A.set(a[R+2],a[R+3]),_.set(a[R+4],a[R+5]),E.copy(x).add(S).add(y).divideScalar(3);const P=m(E);v(b,R+0,x,P),v(A,R+2,S,P),v(_,R+4,y,P)}}function v(x,S,y,E){E<0&&x.x===1&&(a[S]=x.x-1),y.x===0&&y.z===0&&(a[S]=E/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ja(e.vertices,e.indices,e.radius,e.detail)}}const Js=new I,Qs=new I,Bo=new I,$s=new En;class mu extends Et{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Tr*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:v,b:m,c:f}=$s;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),f.fromBufferAttribute(o,l[2]),$s.getNormal(Bo),h[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let x=0;x<3;x++){const S=(x+1)%3,y=h[x],E=h[S],b=$s[d[x]],A=$s[d[S]],_=`${y}_${E}`,w=`${E}_${y}`;w in u&&u[w]?(Bo.dot(u[w].normal)<=s&&(p.push(b.x,b.y,b.z),p.push(A.x,A.y,A.z)),u[w]=null):_ in u||(u[_]={index0:l[x],index1:l[S],normal:Bo.clone()})}}for(const g in u)if(u[g]){const{index0:v,index1:m}=u[g];Js.fromBufferAttribute(o,v),Qs.fromBufferAttribute(o,m),p.push(Js.x,Js.y,Js.z),p.push(Qs.x,Qs.y,Qs.z)}this.setAttribute("position",new Xe(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Bc extends ja{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bc(e.radius,e.detail)}}class Fr extends Et{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,d=c+1,h=e/o,u=t/c,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const x=f*u-a;for(let S=0;S<l;S++){const y=S*h-s;g.push(y,-x,0),v.push(0,0,1),m.push(S/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let x=0;x<o;x++){const S=x+l*f,y=x+l*(f+1),E=x+1+l*(f+1),b=x+1+l*f;p.push(S,y,b),p.push(y,E,b)}this.setIndex(p),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(v,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gi extends Et{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],d=[];let h=e;const u=(t-e)/r,p=new I,g=new Se;for(let v=0;v<=r;v++){for(let m=0;m<=i;m++){const f=s+m/i*a;p.x=h*Math.cos(f),p.y=h*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let v=0;v<r;v++){const m=v*(i+1);for(let f=0;f<i;f++){const x=f+m,S=x,y=x+i+1,E=x+i+2,b=x+1;o.push(S,y,b),o.push(y,E,b)}}this.setIndex(o),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ja extends Et{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new I,u=new I,p=[],g=[],v=[],m=[];for(let f=0;f<=i;f++){const x=[],S=f/i,y=a+S*o,E=e*Math.cos(y),b=Math.sqrt(e*e-E*E);let A=0;f===0&&a===0?A=.5/t:f===i&&c===Math.PI&&(A=-.5/t);for(let _=0;_<=t;_++){const w=_/t,R=r+w*s;h.x=-b*Math.cos(R),h.y=E,h.z=b*Math.sin(R),g.push(h.x,h.y,h.z),u.copy(h).normalize(),v.push(u.x,u.y,u.z),m.push(w+A,1-S),x.push(l++)}d.push(x)}for(let f=0;f<i;f++)for(let x=0;x<t;x++){const S=d[f][x+1],y=d[f][x],E=d[f+1][x],b=d[f+1][x+1];(f!==0||a>0)&&p.push(S,y,b),(f!==i-1||c<Math.PI)&&p.push(y,E,b)}this.setIndex(p),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(v,3)),this.setAttribute("uv",new Xe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class kc extends ja{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,r,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kc(e.radius,e.detail)}}class Qa extends Et{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const c=[],l=[],d=[],h=[],u=new I,p=new I,g=new I;for(let v=0;v<=i;v++){const m=a+v/i*o;for(let f=0;f<=r;f++){const x=f/r*s;p.x=(e+t*Math.cos(m))*Math.cos(x),p.y=(e+t*Math.cos(m))*Math.sin(x),p.z=t*Math.sin(m),l.push(p.x,p.y,p.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),g.subVectors(p,u).normalize(),d.push(g.x,g.y,g.z),h.push(f/r),h.push(v/i)}}for(let v=1;v<=i;v++)for(let m=1;m<=r;m++){const f=(r+1)*v+m-1,x=(r+1)*(v-1)+m-1,S=(r+1)*(v-1)+m,y=(r+1)*v+m;c.push(f,x,y),c.push(x,S,y)}this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(d,3)),this.setAttribute("uv",new Xe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ir(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(gu(r))r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(gu(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=Ir(n[t]);for(const r in i)e[r]=i[r]}return e}function gu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function U0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ff(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const xn={clone:Ir,merge:sn};var z0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,O0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=z0,this.fragmentShader=O0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ir(e.uniforms),this.uniformsGroups=U0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new De().setHex(r.value);break;case"v2":this.uniforms[i].value=new Se().fromArray(r.value);break;case"v3":this.uniforms[i].value=new I().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ct().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new st().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pf extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ft extends Li{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ds,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vi extends ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class F0 extends Li{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ds,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class B0 extends Li{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ds,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=vc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class k0 extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Om,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class V0 extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ko={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(xu(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!xu(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function xu(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class H0{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){const p=l[h],g=l[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const G0=new H0;class Vc{constructor(e){this.manager=e!==void 0?e:G0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Vc.DEFAULT_MATERIAL_NAME="__DEFAULT";const mr=new WeakMap;class W0 extends Vc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=ko.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=mr.get(a);h===void 0&&(h=[],mr.set(a,h)),h.push({onLoad:t,onError:r})}return a}const o=fs("img");function c(){d(),t&&t(this);const h=mr.get(this)||[];for(let u=0;u<h.length;u++){const p=h[u];p.onLoad&&p.onLoad(this)}mr.delete(this),s.manager.itemEnd(e)}function l(h){d(),r&&r(h),ko.remove(`image:${e}`);const u=mr.get(this)||[];for(let p=0;p<u.length;p++){const g=u[p];g.onError&&g.onError(h)}mr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ko.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class X0 extends Vc{constructor(e){super(e)}load(e,t,i,r){const s=new Qt,a=new W0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Hc extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class q0 extends Hc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Vo=new st,vu=new I,yu=new I;class mf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oc,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;vu.setFromMatrixPosition(e.matrixWorld),t.position.copy(vu),yu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yu),t.updateMatrixWorld(),Vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===hs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ea=new I,ta=new Tn,Xn=new I;class gf extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,Xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ea,ta,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,Xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new I,_u=new Se,Mu=new Se;class wn extends gf{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,_u,Mu),t.subVectors(Mu,_u)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Y0 extends mf{constructor(){super(new wn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ms extends Hc{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Y0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ss extends gf{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Z0 extends mf{constructor(){super(new Ss(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Su extends Hc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new Z0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const gr=-90,xr=1;class K0 extends At{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(gr,xr,e,t);r.layers=this.layers,this.add(r);const s=new wn(gr,xr,e,t);s.layers=this.layers,this.add(s);const a=new wn(gr,xr,e,t);a.layers=this.layers,this.add(a);const o=new wn(gr,xr,e,t);o.layers=this.layers,this.add(o);const c=new wn(gr,xr,e,t);c.layers=this.layers,this.add(c);const l=new wn(gr,xr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===jn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===hs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class j0 extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class J0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Q0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Q0(){this._document.hidden===!1&&this.reset()}const hd=class hd{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};hd.prototype.isMatrix2=!0;let bu=hd;function wu(n,e,t,i){const r=$0(i);switch(t){case ef:return n*e;case Rc:return n*e/r.components*r.byteLength;case Cc:return n*e/r.components*r.byteLength;case Yi:return n*e*2/r.components*r.byteLength;case Pc:return n*e*2/r.components*r.byteLength;case tf:return n*e*3/r.components*r.byteLength;case vn:return n*e*4/r.components*r.byteLength;case Dc:return n*e*4/r.components*r.byteLength;case wa:case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tl:case Rl:return Math.max(n,16)*Math.max(e,8)/4;case El:case Al:return Math.max(n,8)*Math.max(e,8)/2;case Cl:case Pl:case Il:case Ll:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Dl:case Oa:case Nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ul:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case kl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ql:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Yl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Zl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Kl:case jl:case Jl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ql:case $l:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Fa:case ec:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $0(n){switch(n){case on:case jh:return{byteLength:1,components:1};case cs:case Jh:case Jt:return{byteLength:2,components:1};case Tc:case Ac:return{byteLength:2,components:4};case ei:case Ec:case On:return{byteLength:4,components:1};case Qh:case $h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);function xf(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function eg(n){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){const d=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(l,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var tg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ng=`#ifdef USE_ALPHAHASH
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
#endif`,ig=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ag=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,og=`#ifdef USE_AOMAP
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
#endif`,lg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cg=`#ifdef USE_BATCHING
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
#endif`,dg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ug=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pg=`#ifdef USE_IRIDESCENCE
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
#endif`,mg=`#ifdef USE_BUMPMAP
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
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wg=`#define PI 3.141592653589793
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
} // validated`,Eg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tg=`vec3 transformedNormal = objectNormal;
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
#endif`,Ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ig=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Ng=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,zg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
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
#endif`,Fg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hg=`#ifdef USE_GRADIENTMAP
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
}`,Gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yg=`#ifdef USE_ENVMAP
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
#endif`,Zg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qg=`PhysicalMaterial material;
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
#endif`,$g=`uniform sampler2D dfgLUT;
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
}`,e1=`
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
#endif`,t1=`#if defined( RE_IndirectDiffuse )
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
#endif`,n1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,i1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,r1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,s1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,l1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,c1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,u1=`#if defined( USE_POINTS_UV )
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
#endif`,h1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,f1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,p1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,m1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,g1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x1=`#ifdef USE_MORPHTARGETS
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
#endif`,v1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,M1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,w1=`#ifdef USE_NORMALMAP
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
#endif`,E1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,R1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,P1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,D1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,N1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,z1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,O1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,B1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,k1=`float getShadowMask() {
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
}`,V1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,H1=`#ifdef USE_SKINNING
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
#endif`,G1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,W1=`#ifdef USE_SKINNING
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
#endif`,X1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,q1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Y1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,K1=`#ifdef USE_TRANSMISSION
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
#endif`,j1=`#ifdef USE_TRANSMISSION
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
#endif`,J1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nx=`uniform sampler2D t2D;
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`#include <common>
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
}`,lx=`#if DEPTH_PACKING == 3200
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
}`,cx=`#define DISTANCE
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
}`,dx=`#define DISTANCE
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`uniform float scale;
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#include <common>
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
}`,gx=`uniform vec3 diffuse;
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
}`,xx=`#define LAMBERT
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
}`,vx=`#define LAMBERT
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
}`,yx=`#define MATCAP
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
}`,_x=`#define MATCAP
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
}`,Mx=`#define NORMAL
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
}`,Sx=`#define NORMAL
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
}`,bx=`#define PHONG
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
}`,wx=`#define PHONG
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
}`,Ex=`#define STANDARD
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
}`,Tx=`#define STANDARD
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
}`,Ax=`#define TOON
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
}`,Rx=`#define TOON
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
}`,Cx=`uniform float size;
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
}`,Px=`uniform vec3 diffuse;
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
}`,Dx=`#include <common>
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
}`,Ix=`uniform vec3 color;
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
}`,Lx=`uniform float rotation;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:tg,alphahash_pars_fragment:ng,alphamap_fragment:ig,alphamap_pars_fragment:rg,alphatest_fragment:sg,alphatest_pars_fragment:ag,aomap_fragment:og,aomap_pars_fragment:lg,batching_pars_vertex:cg,batching_vertex:dg,begin_vertex:ug,beginnormal_vertex:hg,bsdfs:fg,iridescence_fragment:pg,bumpmap_pars_fragment:mg,clipping_planes_fragment:gg,clipping_planes_pars_fragment:xg,clipping_planes_pars_vertex:vg,clipping_planes_vertex:yg,color_fragment:_g,color_pars_fragment:Mg,color_pars_vertex:Sg,color_vertex:bg,common:wg,cube_uv_reflection_fragment:Eg,defaultnormal_vertex:Tg,displacementmap_pars_vertex:Ag,displacementmap_vertex:Rg,emissivemap_fragment:Cg,emissivemap_pars_fragment:Pg,colorspace_fragment:Dg,colorspace_pars_fragment:Ig,envmap_fragment:Lg,envmap_common_pars_fragment:Ng,envmap_pars_fragment:Ug,envmap_pars_vertex:zg,envmap_physical_pars_fragment:Yg,envmap_vertex:Og,fog_vertex:Fg,fog_pars_vertex:Bg,fog_fragment:kg,fog_pars_fragment:Vg,gradientmap_pars_fragment:Hg,lightmap_pars_fragment:Gg,lights_lambert_fragment:Wg,lights_lambert_pars_fragment:Xg,lights_pars_begin:qg,lights_toon_fragment:Zg,lights_toon_pars_fragment:Kg,lights_phong_fragment:jg,lights_phong_pars_fragment:Jg,lights_physical_fragment:Qg,lights_physical_pars_fragment:$g,lights_fragment_begin:e1,lights_fragment_maps:t1,lights_fragment_end:n1,lightprobes_pars_fragment:i1,logdepthbuf_fragment:r1,logdepthbuf_pars_fragment:s1,logdepthbuf_pars_vertex:a1,logdepthbuf_vertex:o1,map_fragment:l1,map_pars_fragment:c1,map_particle_fragment:d1,map_particle_pars_fragment:u1,metalnessmap_fragment:h1,metalnessmap_pars_fragment:f1,morphinstance_vertex:p1,morphcolor_vertex:m1,morphnormal_vertex:g1,morphtarget_pars_vertex:x1,morphtarget_vertex:v1,normal_fragment_begin:y1,normal_fragment_maps:_1,normal_pars_fragment:M1,normal_pars_vertex:S1,normal_vertex:b1,normalmap_pars_fragment:w1,clearcoat_normal_fragment_begin:E1,clearcoat_normal_fragment_maps:T1,clearcoat_pars_fragment:A1,iridescence_pars_fragment:R1,opaque_fragment:C1,packing:P1,premultiplied_alpha_fragment:D1,project_vertex:I1,dithering_fragment:L1,dithering_pars_fragment:N1,roughnessmap_fragment:U1,roughnessmap_pars_fragment:z1,shadowmap_pars_fragment:O1,shadowmap_pars_vertex:F1,shadowmap_vertex:B1,shadowmask_pars_fragment:k1,skinbase_vertex:V1,skinning_pars_vertex:H1,skinning_vertex:G1,skinnormal_vertex:W1,specularmap_fragment:X1,specularmap_pars_fragment:q1,tonemapping_fragment:Y1,tonemapping_pars_fragment:Z1,transmission_fragment:K1,transmission_pars_fragment:j1,uv_pars_fragment:J1,uv_pars_vertex:Q1,uv_vertex:$1,worldpos_vertex:ex,background_vert:tx,background_frag:nx,backgroundCube_vert:ix,backgroundCube_frag:rx,cube_vert:sx,cube_frag:ax,depth_vert:ox,depth_frag:lx,distance_vert:cx,distance_frag:dx,equirect_vert:ux,equirect_frag:hx,linedashed_vert:fx,linedashed_frag:px,meshbasic_vert:mx,meshbasic_frag:gx,meshlambert_vert:xx,meshlambert_frag:vx,meshmatcap_vert:yx,meshmatcap_frag:_x,meshnormal_vert:Mx,meshnormal_frag:Sx,meshphong_vert:bx,meshphong_frag:wx,meshphysical_vert:Ex,meshphysical_frag:Tx,meshtoon_vert:Ax,meshtoon_frag:Rx,points_vert:Cx,points_frag:Px,shadow_vert:Dx,shadow_frag:Ix,sprite_vert:Lx,sprite_frag:Nx},pe={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Kn={basic:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new De(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:sn([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:sn([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:sn([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new De(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:sn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:sn([pe.points,pe.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:sn([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:sn([pe.common,pe.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:sn([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:sn([pe.sprite,pe.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:sn([pe.common,pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:sn([pe.lights,pe.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Kn.physical={uniforms:sn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const na={r:0,b:0,g:0},Ux=new st,vf=new Ve;vf.set(-1,0,0,0,1,0,0,0,1);function zx(n,e,t,i,r,s){const a=new De(0);let o=r===!0?0:1,c,l,d=null,h=0,u=null;function p(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const y=x.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(x){let S=!1;const y=p(x);y===null?m(a,o):y&&y.isColor&&(m(y,1),S=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(x,S){const y=p(S);y&&(y.isCubeTexture||y.mapping===Ya)?(l===void 0&&(l=new Ue(new cn(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:Ir(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vf),l.material.toneMapped=tt.getTransfer(y.colorSpace)!==ht,(d!==y||h!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ue(new Fr(2,2),new Tt({name:"BackgroundMaterial",uniforms:Ir(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=tt.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,S){x.getRGB(na,ff(n)),t.buffers.color.setClear(na.r,na.g,na.b,S,s)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,S=1){a.set(x),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:g,addToRenderList:v,dispose:f}}function Ox(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(P,D,O,B,U){let W=!1;const k=h(P,B,O,D);s!==k&&(s=k,l(s.object)),W=p(P,B,O,U),W&&g(P,B,O,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(P,D,O,B),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function d(P){return n.deleteVertexArray(P)}function h(P,D,O,B){const U=B.wireframe===!0;let W=i[D.id];W===void 0&&(W={},i[D.id]=W);const k=P.isInstancedMesh===!0?P.id:0;let q=W[k];q===void 0&&(q={},W[k]=q);let J=q[O.id];J===void 0&&(J={},q[O.id]=J);let ne=J[U];return ne===void 0&&(ne=u(c()),J[U]=ne),ne}function u(P){const D=[],O=[],B=[];for(let U=0;U<t;U++)D[U]=0,O[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:B,object:P,attributes:{},index:null}}function p(P,D,O,B){const U=s.attributes,W=D.attributes;let k=0;const q=O.getAttributes();for(const J in q)if(q[J].location>=0){const ae=U[J];let le=W[J];if(le===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),ae===void 0||ae.attribute!==le||le&&ae.data!==le.data)return!0;k++}return s.attributesNum!==k||s.index!==B}function g(P,D,O,B){const U={},W=D.attributes;let k=0;const q=O.getAttributes();for(const J in q)if(q[J].location>=0){let ae=W[J];ae===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor));const le={};le.attribute=ae,ae&&ae.data&&(le.data=ae.data),U[J]=le,k++}s.attributes=U,s.attributesNum=k,s.index=B}function v(){const P=s.newAttributes;for(let D=0,O=P.length;D<O;D++)P[D]=0}function m(P){f(P,0)}function f(P,D){const O=s.newAttributes,B=s.enabledAttributes,U=s.attributeDivisors;O[P]=1,B[P]===0&&(n.enableVertexAttribArray(P),B[P]=1),U[P]!==D&&(n.vertexAttribDivisor(P,D),U[P]=D)}function x(){const P=s.newAttributes,D=s.enabledAttributes;for(let O=0,B=D.length;O<B;O++)D[O]!==P[O]&&(n.disableVertexAttribArray(O),D[O]=0)}function S(P,D,O,B,U,W,k){k===!0?n.vertexAttribIPointer(P,D,O,U,W):n.vertexAttribPointer(P,D,O,B,U,W)}function y(P,D,O,B){v();const U=B.attributes,W=O.getAttributes(),k=D.defaultAttributeValues;for(const q in W){const J=W[q];if(J.location>=0){let ne=U[q];if(ne===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),ne!==void 0){const ae=ne.normalized,le=ne.itemSize,Ge=e.get(ne);if(Ge===void 0)continue;const $e=Ge.buffer,ke=Ge.type,K=Ge.bytesPerElement,ie=ke===n.INT||ke===n.UNSIGNED_INT||ne.gpuType===Ec;if(ne.isInterleavedBufferAttribute){const ee=ne.data,we=ee.stride,ze=ne.offset;if(ee.isInstancedInterleavedBuffer){for(let ve=0;ve<J.locationSize;ve++)f(J.location+ve,ee.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ve=0;ve<J.locationSize;ve++)m(J.location+ve);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let ve=0;ve<J.locationSize;ve++)S(J.location+ve,le/J.locationSize,ke,ae,we*K,(ze+le/J.locationSize*ve)*K,ie)}else{if(ne.isInstancedBufferAttribute){for(let ee=0;ee<J.locationSize;ee++)f(J.location+ee,ne.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ee=0;ee<J.locationSize;ee++)m(J.location+ee);n.bindBuffer(n.ARRAY_BUFFER,$e);for(let ee=0;ee<J.locationSize;ee++)S(J.location+ee,le/J.locationSize,ke,ae,le*K,le/J.locationSize*ee*K,ie)}}else if(k!==void 0){const ae=k[q];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(J.location,ae);break;case 3:n.vertexAttrib3fv(J.location,ae);break;case 4:n.vertexAttrib4fv(J.location,ae);break;default:n.vertexAttrib1fv(J.location,ae)}}}}x()}function E(){w();for(const P in i){const D=i[P];for(const O in D){const B=D[O];for(const U in B){const W=B[U];for(const k in W)d(W[k].object),delete W[k];delete B[U]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;const D=i[P.id];for(const O in D){const B=D[O];for(const U in B){const W=B[U];for(const k in W)d(W[k].object),delete W[k];delete B[U]}}delete i[P.id]}function A(P){for(const D in i){const O=i[D];for(const B in O){const U=O[B];if(U[P.id]===void 0)continue;const W=U[P.id];for(const k in W)d(W[k].object),delete W[k];delete U[P.id]}}}function _(P){for(const D in i){const O=i[D],B=P.isInstancedMesh===!0?P.id:0,U=O[B];if(U!==void 0){for(const W in U){const k=U[W];for(const q in k)d(k[q].object),delete k[q];delete U[W]}delete O[B],Object.keys(O).length===0&&delete i[D]}}}function w(){R(),a=!0,s!==r&&(s=r,l(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Fx(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let u=0;for(let p=0;p<d;p++)u+=l[p];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Bx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==vn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===Jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==on&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==On&&!_)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Fe("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:y,maxSamples:E,samples:b}}function kx(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ki,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||r;return r=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?d(null):l();else{const x=s?0:i,S=x*4;let y=f.clippingState||null;c.value=y,y=d(g,u,S,p);for(let E=0;E!==S;++E)y[E]=t[E];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const f=p+v*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,y=p;S!==v;++S,y+=4)a.copy(h[S]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Di=4,Eu=[.125,.215,.35,.446,.526,.582],Hi=20,Vx=256,Zr=new Ss,Tu=new De;let Ho=null,Go=0,Wo=0,Xo=!1;const Hx=new I;class nc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Hx}=s;Ho=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ru(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ho,Go,Wo),this._renderer.xr.enabled=Xo,e.scissorTest=!1,vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qi||e.mapping===Pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ho=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Wo=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Jt,format:vn,colorSpace:us,depthBuffer:!1},r=Au(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Au(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Gx(s)),this._blurMaterial=Xx(s,e,t),this._ggxMaterial=Wx(s,e,t)}return r}_compileMaterial(e){const t=new Ue(new Et,e);this._renderer.compile(t,Zr)}_sceneToCubeUV(e,t,i,r,s){const c=new wn(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Tu),h.toneMapping=Jn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ue(new cn,new Pt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let f=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,f=!0):(m.color.copy(Tu),f=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+d[S],s.y,s.z)):y===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+d[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+d[S]));const E=this._cubeSize;vr(r,y*E,S>2?E:0,E,E),h.setRenderTarget(r),f&&h.render(v,c),h.render(e,c)}h.toneMapping=p,h.autoClear=u,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===qi||e.mapping===Pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ru());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;vr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Zr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,p=h*u,{_lodMax:g}=this,v=this._sizeLods[i],m=3*v*(i>g-Di?i-g+Di:0),f=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,vr(s,m,f,3*v,2*v),r.setRenderTarget(s),r.render(o,Zr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,vr(e,m,f,3*v,2*v),r.setRenderTarget(e),r.render(o,Zr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ct("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=l;const u=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),v=s/g,m=isFinite(s)?1+Math.floor(d*v):Hi;m>Hi&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const f=[];let x=0;for(let A=0;A<Hi;++A){const _=A/v,w=Math.exp(-_*_/2);f.push(w),A===0?x+=w:A<m&&(x+=2*w)}for(let A=0;A<f.length;A++)f[A]=f[A]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const y=this._sizeLods[r],E=3*y*(r>S-Di?r-S+Di:0),b=4*(this._cubeSize-y);vr(t,E,b,3*y,2*y),c.setRenderTarget(t),c.render(h,Zr)}}function Gx(n){const e=[],t=[],i=[];let r=n;const s=n-Di+1+Eu.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-Di?c=Eu[a-n+Di-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,f=1,x=new Float32Array(v*g*p),S=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,_=b>2?0:-1,w=[A,_,0,A+2/3,_,0,A+2/3,_+1,0,A,_,0,A+2/3,_+1,0,A,_+1,0];x.set(w,v*g*b),S.set(u,m*g*b);const R=[b,b,b,b,b,b];y.set(R,f*g*b)}const E=new Et;E.setAttribute("position",new Ht(x,v)),E.setAttribute("uv",new Ht(S,m)),E.setAttribute("faceIndex",new Ht(y,f)),i.push(new Ue(E,null)),r>Di&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Au(n,e,t){const i=new Wt(n,e,t);return i.texture.mapping=Ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Wx(n,e,t){return new Tt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$a(),fragmentShader:`

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
		`,blending:Kt,depthTest:!1,depthWrite:!1})}function Xx(n,e,t){const i=new Float32Array(Hi),r=new I(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$a(),fragmentShader:`

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
		`,blending:Kt,depthTest:!1,depthWrite:!1})}function Ru(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$a(),fragmentShader:`

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
		`,blending:Kt,depthTest:!1,depthWrite:!1})}function Cu(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kt,depthTest:!1,depthWrite:!1})}function $a(){return`

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
	`}class yf extends Wt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new uf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new cn(5,5,5),s=new Tt({name:"CubemapFromEquirect",uniforms:Ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Kt});s.uniforms.tEquirect.value=t;const a=new Ue(r,s),o=t.minFilter;return t.minFilter===hi&&(t.minFilter=Bt),new K0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function qx(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===ho||p===fo)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new yf(g.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===ho||p===fo,v=p===qi||p===Pr;if(g||v){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new nc(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const x=u.image;return g&&x&&x.height>0||v&&x&&c(x)?(i===null&&(i=new nc(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===ho?u.mapping=qi:p===fo&&(u.mapping=Pr),u}function c(u){let p=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Yx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Er("WebGLRenderer: "+i+" extension not supported."),r}}}function Zx(n,e,t,i){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function l(h){const u=[],p=h.index,g=h.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const x=p.array;v=p.version;for(let S=0,y=x.length;S<y;S+=3){const E=x[S+0],b=x[S+1],A=x[S+2];u.push(E,b,b,A,A,E)}}else{const x=g.array;v=g.version;for(let S=0,y=x.length/3-1;S<y;S+=3){const E=S+0,b=S+1,A=S+2;u.push(E,b,b,A,A,E)}}const m=new(g.count>=65535?cf:lf)(u,1);m.version=v;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function Kx(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,u){n.drawElements(i,u,s,h*a),t.update(u,i,1)}function l(h,u,p){p!==0&&(n.drawElementsInstanced(i,u,s,h*a,p),t.update(u,i,p))}function d(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let v=0;for(let m=0;m<p;m++)v+=u[m];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function jx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:ct("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Jx(n,e,t){const i=new WeakMap,r=new Ct;function s(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),g===!0&&(S=2),v===!0&&(S=3);let y=o.attributes.position.count*S,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*E*4*h),A=new rf(b,y,E,h);A.type=On,A.needsUpdate=!0;const _=S*4;for(let R=0;R<h;R++){const P=m[R],D=f[R],O=x[R],B=y*E*4*R;for(let U=0;U<P.count;U++){const W=U*_;p===!0&&(r.fromBufferAttribute(P,U),b[B+W+0]=r.x,b[B+W+1]=r.y,b[B+W+2]=r.z,b[B+W+3]=0),g===!0&&(r.fromBufferAttribute(D,U),b[B+W+4]=r.x,b[B+W+5]=r.y,b[B+W+6]=r.z,b[B+W+7]=0),v===!0&&(r.fromBufferAttribute(O,U),b[B+W+8]=r.x,b[B+W+9]=r.y,b[B+W+10]=r.z,b[B+W+11]=O.itemSize===4?r.w:1)}}u={count:h,texture:A,size:new Se(y,E)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function Qx(n,e,t,i,r){let s=new WeakMap;function a(l){const d=r.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const $x={[yc]:"LINEAR_TONE_MAPPING",[_c]:"REINHARD_TONE_MAPPING",[Mc]:"CINEON_TONE_MAPPING",[Sc]:"ACES_FILMIC_TONE_MAPPING",[qa]:"AGX_TONE_MAPPING",[wc]:"NEUTRAL_TONE_MAPPING",[bc]:"CUSTOM_TONE_MAPPING"};function ev(n,e,t,i,r,s){const a=new Wt(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Zi(e,t):void 0}),o=new Wt(e,t,{type:Jt,depthBuffer:!1,stencilBuffer:!1}),c=new Et;c.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Xe([0,2,0,0,2,0],2));const l=new pf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ue(c,l),h=new Ss(-1,1,1,-1,0,1);let u=null,p=null,g=!1,v,m=null,f=[],x=!1;this.setSize=function(S,y){a.setSize(S,y),o.setSize(S,y);for(let E=0;E<f.length;E++){const b=f[E];b.setSize&&b.setSize(S,y)}},this.setEffects=function(S){f=S,x=f.length>0&&f[0].isRenderPass===!0;const y=a.width,E=a.height;for(let b=0;b<f.length;b++){const A=f[b];A.setSize&&A.setSize(y,E)}},this.begin=function(S,y){if(g||S.toneMapping===Jn&&f.length===0)return!1;if(m=y,y!==null){const E=y.width,b=y.height;(a.width!==E||a.height!==b)&&this.setSize(E,b)}return x===!1&&S.setRenderTarget(a),v=S.toneMapping,S.toneMapping=Jn,!0},this.hasRenderPass=function(){return x},this.end=function(S,y){S.toneMapping=v,g=!0;let E=a,b=o;for(let A=0;A<f.length;A++){const _=f[A];if(_.enabled!==!1&&(_.render(S,b,E,y),_.needsSwap!==!1)){const w=E;E=b,b=w}}if(u!==S.outputColorSpace||p!==S.toneMapping){u=S.outputColorSpace,p=S.toneMapping,l.defines={},tt.getTransfer(u)===ht&&(l.defines.SRGB_TRANSFER="");const A=$x[p];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(m),S.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const _f=new Qt,ic=new Zi(1,1),Mf=new rf,Sf=new g0,bf=new uf,Pu=[],Du=[],Iu=new Float32Array(16),Lu=new Float32Array(9),Nu=new Float32Array(4);function Br(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Pu[r];if(s===void 0&&(s=new Float32Array(r),Pu[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function eo(n,e){let t=Du[e];t===void 0&&(t=new Int32Array(e),Du[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function tv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function sv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Nu.set(i),n.uniformMatrix2fv(this.addr,!1,Nu),qt(t,i)}}function av(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Lu.set(i),n.uniformMatrix3fv(this.addr,!1,Lu),qt(t,i)}}function ov(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Iu.set(i),n.uniformMatrix4fv(this.addr,!1,Iu),qt(t,i)}}function lv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function dv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function uv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function hv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function pv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function gv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ic.compareFunction=t.isReversedDepthBuffer()?Lc:Ic,s=ic):s=_f,t.setTexture2D(e||s,r)}function xv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Sf,r)}function vv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||bf,r)}function yv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Mf,r)}function _v(n){switch(n){case 5126:return tv;case 35664:return nv;case 35665:return iv;case 35666:return rv;case 35674:return sv;case 35675:return av;case 35676:return ov;case 5124:case 35670:return lv;case 35667:case 35671:return cv;case 35668:case 35672:return dv;case 35669:case 35673:return uv;case 5125:return hv;case 36294:return fv;case 36295:return pv;case 36296:return mv;case 35678:case 36198:case 36298:case 36306:case 35682:return gv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return yv}}function Mv(n,e){n.uniform1fv(this.addr,e)}function Sv(n,e){const t=Br(e,this.size,2);n.uniform2fv(this.addr,t)}function bv(n,e){const t=Br(e,this.size,3);n.uniform3fv(this.addr,t)}function wv(n,e){const t=Br(e,this.size,4);n.uniform4fv(this.addr,t)}function Ev(n,e){const t=Br(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Tv(n,e){const t=Br(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Av(n,e){const t=Br(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Rv(n,e){n.uniform1iv(this.addr,e)}function Cv(n,e){n.uniform2iv(this.addr,e)}function Pv(n,e){n.uniform3iv(this.addr,e)}function Dv(n,e){n.uniform4iv(this.addr,e)}function Iv(n,e){n.uniform1uiv(this.addr,e)}function Lv(n,e){n.uniform2uiv(this.addr,e)}function Nv(n,e){n.uniform3uiv(this.addr,e)}function Uv(n,e){n.uniform4uiv(this.addr,e)}function zv(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=ic:a=_f;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Ov(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Sf,s[a])}function Fv(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||bf,s[a])}function Bv(n,e,t){const i=this.cache,r=e.length,s=eo(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Mf,s[a])}function kv(n){switch(n){case 5126:return Mv;case 35664:return Sv;case 35665:return bv;case 35666:return wv;case 35674:return Ev;case 35675:return Tv;case 35676:return Av;case 5124:case 35670:return Rv;case 35667:case 35671:return Cv;case 35668:case 35672:return Pv;case 35669:case 35673:return Dv;case 5125:return Iv;case 36294:return Lv;case 36295:return Nv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return Bv}}class Vv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=_v(t.type)}}class Hv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kv(t.type)}}class Gv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const qo=/(\w+)(\])?(\[|\.)?/g;function Uu(n,e){n.seq.push(e),n.map[e.id]=e}function Wv(n,e,t){const i=n.name,r=i.length;for(qo.lastIndex=0;;){const s=qo.exec(i),a=qo.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Uu(t,l===void 0?new Vv(o,n,e):new Hv(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new Gv(o),Uu(t,h)),t=h}}}class Ra{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Wv(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function zu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Xv=37297;let qv=0;function Yv(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ou=new Ve;function Zv(n){tt._getMatrix(Ou,tt.workingColorSpace,n);const e=`mat3( ${Ou.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case Ba:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Fu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Yv(n.getShaderSource(e),o)}else return s}function Kv(n,e){const t=Zv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jv={[yc]:"Linear",[_c]:"Reinhard",[Mc]:"Cineon",[Sc]:"ACESFilmic",[qa]:"AgX",[wc]:"Neutral",[bc]:"Custom"};function Jv(n,e){const t=jv[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new I;function Qv(){tt.getLuminanceCoefficients(ia);const n=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $v(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(as).join(`
`)}function ey(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ty(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function as(n){return n!==""}function Bu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ku(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ny=/^[ \t]*#include +<([\w\d./]+)>/gm;function rc(n){return n.replace(ny,ry)}const iy=new Map;function ry(n,e){let t=Je[e];if(t===void 0){const i=iy.get(e);if(i!==void 0)t=Je[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return rc(t)}const sy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vu(n){return n.replace(sy,ay)}function ay(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Hu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const oy={[os]:"SHADOWMAP_TYPE_PCF",[is]:"SHADOWMAP_TYPE_VSM"};function ly(n){return oy[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const cy={[qi]:"ENVMAP_TYPE_CUBE",[Pr]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE_UV"};function dy(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":cy[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const uy={[Pr]:"ENVMAP_MODE_REFRACTION"};function hy(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":uy[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const fy={[vc]:"ENVMAP_BLENDING_MULTIPLY",[Nm]:"ENVMAP_BLENDING_MIX",[Um]:"ENVMAP_BLENDING_ADD"};function py(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":fy[n.combine]||"ENVMAP_BLENDING_NONE"}function my(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function gy(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ly(t),l=dy(t),d=hy(t),h=py(t),u=my(t),p=$v(t),g=ey(s),v=r.createProgram();let m,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(as).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(as).join(`
`),f.length>0&&(f+=`
`)):(m=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(as).join(`
`),f=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?Je.tonemapping_pars_fragment:"",t.toneMapping!==Jn?Jv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,Kv("linearToOutputTexel",t.outputColorSpace),Qv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(as).join(`
`)),a=rc(a),a=Bu(a,t),a=ku(a,t),o=rc(o),o=Bu(o,t),o=ku(o,t),a=Vu(a),o=Vu(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Wd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=x+m+a,y=x+f+o,E=zu(r,r.VERTEX_SHADER,S),b=zu(r,r.FRAGMENT_SHADER,y);r.attachShader(v,E),r.attachShader(v,b),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(P){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(v)||"",O=r.getShaderInfoLog(E)||"",B=r.getShaderInfoLog(b)||"",U=D.trim(),W=O.trim(),k=B.trim();let q=!0,J=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,E,b);else{const ne=Fu(r,E,"vertex"),ae=Fu(r,b,"fragment");ct("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+ne+`
`+ae)}else U!==""?Fe("WebGLProgram: Program Info Log:",U):(W===""||k==="")&&(J=!1);J&&(P.diagnostics={runnable:q,programLog:U,vertexShader:{log:W,prefix:m},fragmentShader:{log:k,prefix:f}})}r.deleteShader(E),r.deleteShader(b),_=new Ra(r,v),w=ty(r,v)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(v,Xv)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=b,this}let xy=0;class vy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new yy(e),t.set(e,i)),i}}class yy{constructor(e){this.id=xy++,this.code=e,this.usedTimes=0}}function _y(n){return n===Yi||n===Oa||n===Fa}function My(n,e,t,i,r,s){const a=new sf,o=new vy,c=new Set,l=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function v(_,w,R,P,D,O){const B=P.fog,U=D.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,q=e.get(_.envMap||W,k),J=q&&q.mapping===Ya?q.image.height:null,ne=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Fe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const ae=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,le=ae!==void 0?ae.length:0;let Ge=0;U.morphAttributes.position!==void 0&&(Ge=1),U.morphAttributes.normal!==void 0&&(Ge=2),U.morphAttributes.color!==void 0&&(Ge=3);let $e,ke,K,ie;if(ne){const be=Kn[ne];$e=be.vertexShader,ke=be.fragmentShader}else{$e=_.vertexShader,ke=_.fragmentShader;const be=o.getVertexShaderStage(_),It=o.getFragmentShaderStage(_);o.update(_,be,It),K=be.id,ie=It.id}const ee=n.getRenderTarget(),we=n.state.buffers.depth.getReversed(),ze=D.isInstancedMesh===!0,ve=D.isBatchedMesh===!0,gt=!!_.map,qe=!!_.matcap,at=!!q,se=!!_.aoMap,Ae=!!_.lightMap,Ce=!!_.bumpMap&&_.wireframe===!1,dt=!!_.normalMap,Ze=!!_.displacementMap,We=!!_.emissiveMap,ut=!!_.metalnessMap,ot=!!_.roughnessMap,L=_.anisotropy>0,Gt=_.clearcoat>0,je=_.dispersion>0,C=_.iridescence>0,M=_.sheen>0,F=_.transmission>0,V=L&&!!_.anisotropyMap,Z=Gt&&!!_.clearcoatMap,re=Gt&&!!_.clearcoatNormalMap,de=Gt&&!!_.clearcoatRoughnessMap,j=C&&!!_.iridescenceMap,Q=C&&!!_.iridescenceThicknessMap,ue=M&&!!_.sheenColorMap,Re=M&&!!_.sheenRoughnessMap,ce=!!_.specularMap,oe=!!_.specularColorMap,Ee=!!_.specularIntensityMap,Le=F&&!!_.transmissionMap,Be=F&&!!_.thicknessMap,N=!!_.gradientMap,he=!!_.alphaMap,$=_.alphaTest>0,fe=!!_.alphaHash,xe=!!_.extensions;let te=Jn;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(te=n.toneMapping);const Pe={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:$e,fragmentShader:ke,defines:_.defines,customVertexShaderID:K,customFragmentShaderID:ie,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:ve,batchingColor:ve&&D._colorsTexture!==null,instancing:ze,instancingColor:ze&&D.instanceColor!==null,instancingMorph:ze&&D.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:gt,matcap:qe,envMap:at,envMapMode:at&&q.mapping,envMapCubeUVHeight:J,aoMap:se,lightMap:Ae,bumpMap:Ce,normalMap:dt,displacementMap:Ze,emissiveMap:We,normalMapObjectSpace:dt&&_.normalMapType===Fm,normalMapTangentSpace:dt&&_.normalMapType===ds,packedNormalMap:dt&&_.normalMapType===ds&&_y(_.normalMap.format),metalnessMap:ut,roughnessMap:ot,anisotropy:L,anisotropyMap:V,clearcoat:Gt,clearcoatMap:Z,clearcoatNormalMap:re,clearcoatRoughnessMap:de,dispersion:je,iridescence:C,iridescenceMap:j,iridescenceThicknessMap:Q,sheen:M,sheenColorMap:ue,sheenRoughnessMap:Re,specularMap:ce,specularColorMap:oe,specularIntensityMap:Ee,transmission:F,transmissionMap:Le,thicknessMap:Be,gradientMap:N,opaque:_.transparent===!1&&_.blending===wr&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:$,alphaHash:fe,combine:_.combine,mapUv:gt&&g(_.map.channel),aoMapUv:se&&g(_.aoMap.channel),lightMapUv:Ae&&g(_.lightMap.channel),bumpMapUv:Ce&&g(_.bumpMap.channel),normalMapUv:dt&&g(_.normalMap.channel),displacementMapUv:Ze&&g(_.displacementMap.channel),emissiveMapUv:We&&g(_.emissiveMap.channel),metalnessMapUv:ut&&g(_.metalnessMap.channel),roughnessMapUv:ot&&g(_.roughnessMap.channel),anisotropyMapUv:V&&g(_.anisotropyMap.channel),clearcoatMapUv:Z&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Re&&g(_.sheenRoughnessMap.channel),specularMapUv:ce&&g(_.specularMap.channel),specularColorMapUv:oe&&g(_.specularColorMap.channel),specularIntensityMapUv:Ee&&g(_.specularIntensityMap.channel),transmissionMapUv:Le&&g(_.transmissionMap.channel),thicknessMapUv:Be&&g(_.thicknessMap.channel),alphaMapUv:he&&g(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(dt||L),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(gt||he),fog:!!B,useFog:_.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&dt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:we,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ge,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:te,decodeVideoTexture:gt&&_.map.isVideoTexture===!0&&tt.getTransfer(_.map.colorSpace)===ht,decodeVideoTextureEmissive:We&&_.emissiveMap.isVideoTexture===!0&&tt.getTransfer(_.emissiveMap.colorSpace)===ht,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===an,flipSided:_.side===ln,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:xe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&_.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function m(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const R in _.defines)w.push(R),w.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(f(w,_),x(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function f(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function x(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const w=p[_.type];let R;if(w){const P=Kn[w];R=xn.clone(P.uniforms)}else R=_.uniforms;return R}function y(_,w){let R=d.get(w);return R!==void 0?++R.usedTimes:(R=new gy(n,w,_,r),l.push(R),d.set(w,R)),R}function E(_){if(--_.usedTimes===0){const w=l.indexOf(_);l[w]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:E,releaseShaderCache:b,programs:l,dispose:A}}function Sy(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function by(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Gu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,v,m,f){let x=n[e];return x===void 0?(x={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:f},n[e]=x):(x.id=u.id,x.object=u,x.geometry=p,x.material=g,x.materialVariant=a(u),x.groupOrder=v,x.renderOrder=u.renderOrder,x.z=m,x.group=f),e++,x}function c(u,p,g,v,m,f){const x=o(u,p,g,v,m,f);g.transmission>0?i.push(x):g.transparent===!0?r.push(x):t.push(x)}function l(u,p,g,v,m,f){const x=o(u,p,g,v,m,f);g.transmission>0?i.unshift(x):g.transparent===!0?r.unshift(x):t.unshift(x)}function d(u,p,g){t.length>1&&t.sort(u||by),i.length>1&&i.sort(p||Gu),r.length>1&&r.sort(p||Gu),g&&(t.reverse(),i.reverse(),r.reverse())}function h(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:d}}function wy(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Wu,n.set(i,[a])):r>=s.length?(a=new Wu,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Ey(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new De};break;case"SpotLight":t={position:new I,direction:new I,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=t,t}}}function Ty(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Ay=0;function Ry(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Cy(n){const e=new Ey,t=Ty(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const r=new I,s=new st,a=new st;function o(l){let d=0,h=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,x=0,S=0,y=0,E=0,b=0,A=0;l.sort(Ry);for(let w=0,R=l.length;w<R;w++){const P=l[w],D=P.color,O=P.intensity,B=P.distance;let U=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Yi?U=P.shadow.map.texture:U=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=D.r*O,h+=D.g*O,u+=D.b*O;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],O);A++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const k=P.shadow,q=t.get(P);q.shadowIntensity=k.intensity,q.shadowBias=k.bias,q.shadowNormalBias=k.normalBias,q.shadowRadius=k.radius,q.shadowMapSize=k.mapSize,i.directionalShadow[p]=q,i.directionalShadowMap[p]=U,i.directionalShadowMatrix[p]=P.shadow.matrix,x++}i.directional[p]=W,p++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(D).multiplyScalar(O),W.distance=B,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[v]=W;const k=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,k.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[v]=k.matrix,P.castShadow){const q=t.get(P);q.shadowIntensity=k.intensity,q.shadowBias=k.bias,q.shadowNormalBias=k.normalBias,q.shadowRadius=k.radius,q.shadowMapSize=k.mapSize,i.spotShadow[v]=q,i.spotShadowMap[v]=U,y++}v++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(D).multiplyScalar(O),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const k=P.shadow,q=t.get(P);q.shadowIntensity=k.intensity,q.shadowBias=k.bias,q.shadowNormalBias=k.normalBias,q.shadowRadius=k.radius,q.shadowMapSize=k.mapSize,q.shadowCameraNear=k.camera.near,q.shadowCameraFar=k.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=U,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(O),W.groundColor.copy(P.groundColor).multiplyScalar(O),i.hemi[f]=W,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==f||_.numDirectionalShadows!==x||_.numPointShadows!==S||_.numSpotShadows!==y||_.numSpotMaps!==E||_.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=y+E-b,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,_.directionalLength=p,_.pointLength=g,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=f,_.numDirectionalShadows=x,_.numPointShadows=S,_.numSpotShadows=y,_.numSpotMaps=E,_.numLightProbes=A,i.version=Ay++)}function c(l,d){let h=0,u=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,x=l.length;f<x;f++){const S=l[f];if(S.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(S.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:i}}function Xu(n){const e=new Cy(n),t=[],i=[],r=[];function s(u){h.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Py(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Xu(n),e.set(r,[o])):s>=a.length?(o=new Xu(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Dy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Iy=`uniform sampler2D shadow_pass;
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
}`,Ly=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Ny=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],qu=new st,Kr=new I,Yo=new I;function Uy(n,e,t){let i=new Oc;const r=new Se,s=new Se,a=new Ct,o=new k0,c=new V0,l={},d=t.maxTextureSize,h={[gi]:ln,[ln]:gi,[an]:an},u=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:Dy,fragmentShader:Iy}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Et;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ue(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=os;let f=this.type;this.render=function(b,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===ym&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=os);const w=n.getRenderTarget(),R=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending(Kt),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const O=f!==this.type;O&&A.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=b.length;B<U;B++){const W=b[B],k=W.shadow;if(k===void 0){Fe("WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const q=k.getFrameExtents();r.multiply(q),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/q.x),r.x=s.x*q.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/q.y),r.y=s.y*q.y,k.mapSize.y=s.y));const J=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=J,k.map===null||O===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===is){if(W.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Wt(r.x,r.y,{format:Yi,type:Jt,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),k.map.texture.name=W.name+".shadowMap",k.map.depthTexture=new Zi(r.x,r.y,On),k.map.depthTexture.name=W.name+".shadowMapDepth",k.map.depthTexture.format=xi,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ft,k.map.depthTexture.magFilter=Ft}else W.isPointLight?(k.map=new yf(r.x),k.map.depthTexture=new N0(r.x,ei)):(k.map=new Wt(r.x,r.y),k.map.depthTexture=new Zi(r.x,r.y,ei)),k.map.depthTexture.name=W.name+".shadowMap",k.map.depthTexture.format=xi,this.type===os?(k.map.depthTexture.compareFunction=J?Lc:Ic,k.map.depthTexture.minFilter=Bt,k.map.depthTexture.magFilter=Bt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ft,k.map.depthTexture.magFilter=Ft);k.camera.updateProjectionMatrix()}const ne=k.map.isWebGLCubeRenderTarget?6:1;for(let ae=0;ae<ne;ae++){if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(k.map),n.clear());const le=k.getViewport(ae);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),D.viewport(a)}if(W.isPointLight){const le=k.camera,Ge=k.matrix,$e=W.distance||le.far;$e!==le.far&&(le.far=$e,le.updateProjectionMatrix()),Kr.setFromMatrixPosition(W.matrixWorld),le.position.copy(Kr),Yo.copy(le.position),Yo.add(Ly[ae]),le.up.copy(Ny[ae]),le.lookAt(Yo),le.updateMatrixWorld(),Ge.makeTranslation(-Kr.x,-Kr.y,-Kr.z),qu.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),k._frustum.setFromProjectionMatrix(qu,le.coordinateSystem,le.reversedDepth)}else k.updateMatrices(W);i=k.getFrustum(),y(A,_,k.camera,W,this.type)}k.isPointLightShadow!==!0&&this.type===is&&x(k,_),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,R,P)};function x(b,A){const _=e.update(v);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Wt(r.x,r.y,{format:Yi,type:Jt})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,_,u,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,_,p,v,null)}function S(b,A,_,w){let R=null;const P=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)R=P;else if(R=_.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=R.uuid,O=A.uuid;let B=l[D];B===void 0&&(B={},l[D]=B);let U=B[O];U===void 0&&(U=R.clone(),B[O]=U,A.addEventListener("dispose",E)),R=U}if(R.visible=A.visible,R.wireframe=A.wireframe,w===is?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:h[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const D=n.properties.get(R);D.light=_}return R}function y(b,A,_,w,R){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===is)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const O=e.update(b),B=b.material;if(Array.isArray(B)){const U=O.groups;for(let W=0,k=U.length;W<k;W++){const q=U[W],J=B[q.materialIndex];if(J&&J.visible){const ne=S(b,J,w,R);b.onBeforeShadow(n,b,A,_,O,ne,q),n.renderBufferDirect(_,null,O,ne,b,q),b.onAfterShadow(n,b,A,_,O,ne,q)}}}else if(B.visible){const U=S(b,B,w,R);b.onBeforeShadow(n,b,A,_,O,U,null),n.renderBufferDirect(_,null,O,U,b,null),b.onAfterShadow(n,b,A,_,O,U,null)}}const D=b.children;for(let O=0,B=D.length;O<B;O++)y(D[O],A,_,w,R)}function E(b){b.target.removeEventListener("dispose",E);for(const _ in l){const w=l[_],R=b.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function zy(n,e){function t(){let N=!1;const he=new Ct;let $=null;const fe=new Ct(0,0,0,0);return{setMask:function(xe){$!==xe&&!N&&(n.colorMask(xe,xe,xe,xe),$=xe)},setLocked:function(xe){N=xe},setClear:function(xe,te,Pe,be,It){It===!0&&(xe*=be,te*=be,Pe*=be),he.set(xe,te,Pe,be),fe.equals(he)===!1&&(n.clearColor(xe,te,Pe,be),fe.copy(he))},reset:function(){N=!1,$=null,fe.set(-1,0,0,0)}}}function i(){let N=!1,he=!1,$=null,fe=null,xe=null;return{setReversed:function(te){if(he!==te){const Pe=e.get("EXT_clip_control");te?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),he=te;const be=xe;xe=null,this.setClear(be)}},getReversed:function(){return he},setTest:function(te){te?ee(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(te){$!==te&&!N&&(n.depthMask(te),$=te)},setFunc:function(te){if(he&&(te=Zm[te]),fe!==te){switch(te){case xl:n.depthFunc(n.NEVER);break;case vl:n.depthFunc(n.ALWAYS);break;case yl:n.depthFunc(n.LESS);break;case Cr:n.depthFunc(n.LEQUAL);break;case _l:n.depthFunc(n.EQUAL);break;case Ml:n.depthFunc(n.GEQUAL);break;case Sl:n.depthFunc(n.GREATER);break;case bl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=te}},setLocked:function(te){N=te},setClear:function(te){xe!==te&&(xe=te,he&&(te=1-te),n.clearDepth(te))},reset:function(){N=!1,$=null,fe=null,xe=null,he=!1}}}function r(){let N=!1,he=null,$=null,fe=null,xe=null,te=null,Pe=null,be=null,It=null;return{setTest:function(_t){N||(_t?ee(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(_t){he!==_t&&!N&&(n.stencilMask(_t),he=_t)},setFunc:function(_t,Hn,Gn){($!==_t||fe!==Hn||xe!==Gn)&&(n.stencilFunc(_t,Hn,Gn),$=_t,fe=Hn,xe=Gn)},setOp:function(_t,Hn,Gn){(te!==_t||Pe!==Hn||be!==Gn)&&(n.stencilOp(_t,Hn,Gn),te=_t,Pe=Hn,be=Gn)},setLocked:function(_t){N=_t},setClear:function(_t){It!==_t&&(n.clearStencil(_t),It=_t)},reset:function(){N=!1,he=null,$=null,fe=null,xe=null,te=null,Pe=null,be=null,It=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let d={},h={},u={},p=new WeakMap,g=[],v=null,m=!1,f=null,x=null,S=null,y=null,E=null,b=null,A=null,_=new De(0,0,0),w=0,R=!1,P=null,D=null,O=null,B=null,U=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,q=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(J)[1]),k=q>=1):J.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),k=q>=2);let ne=null,ae={};const le=n.getParameter(n.SCISSOR_BOX),Ge=n.getParameter(n.VIEWPORT),$e=new Ct().fromArray(le),ke=new Ct().fromArray(Ge);function K(N,he,$,fe){const xe=new Uint8Array(4),te=n.createTexture();n.bindTexture(N,te),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<$;Pe++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(he,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(he+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return te}const ie={};ie[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(Cr),Ce(!1),dt(Bd),ee(n.CULL_FACE),se(Kt);function ee(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function we(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function ze(N,he){return u[N]!==he?(n.bindFramebuffer(N,he),u[N]=he,N===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=he),N===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=he),!0):!1}function ve(N,he){let $=g,fe=!1;if(N){$=p.get(he),$===void 0&&($=[],p.set(he,$));const xe=N.textures;if($.length!==xe.length||$[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Pe=xe.length;te<Pe;te++)$[te]=n.COLOR_ATTACHMENT0+te;$.length=xe.length,fe=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,fe=!0);fe&&n.drawBuffers($)}function gt(N){return v!==N?(n.useProgram(N),v=N,!0):!1}const qe={[zn]:n.FUNC_ADD,[_m]:n.FUNC_SUBTRACT,[Mm]:n.FUNC_REVERSE_SUBTRACT};qe[Sm]=n.MIN,qe[bm]=n.MAX;const at={[rs]:n.ZERO,[wm]:n.ONE,[Em]:n.SRC_COLOR,[fl]:n.SRC_ALPHA,[Cm]:n.SRC_ALPHA_SATURATE,[gl]:n.DST_COLOR,[ml]:n.DST_ALPHA,[Tm]:n.ONE_MINUS_SRC_COLOR,[pl]:n.ONE_MINUS_SRC_ALPHA,[Rm]:n.ONE_MINUS_DST_COLOR,[Am]:n.ONE_MINUS_DST_ALPHA,[Pm]:n.CONSTANT_COLOR,[Dm]:n.ONE_MINUS_CONSTANT_COLOR,[Im]:n.CONSTANT_ALPHA,[Lm]:n.ONE_MINUS_CONSTANT_ALPHA};function se(N,he,$,fe,xe,te,Pe,be,It,_t){if(N===Kt){m===!0&&(we(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),N!==Zh){if(N!==f||_t!==R){if((x!==zn||E!==zn)&&(n.blendEquation(n.FUNC_ADD),x=zn,E=zn),_t)switch(N){case wr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case za:n.blendFunc(n.ONE,n.ONE);break;case kd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ct("WebGLState: Invalid blending: ",N);break}else switch(N){case wr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case za:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case kd:ct("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vd:ct("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ct("WebGLState: Invalid blending: ",N);break}S=null,y=null,b=null,A=null,_.set(0,0,0),w=0,f=N,R=_t}return}xe=xe||he,te=te||$,Pe=Pe||fe,(he!==x||xe!==E)&&(n.blendEquationSeparate(qe[he],qe[xe]),x=he,E=xe),($!==S||fe!==y||te!==b||Pe!==A)&&(n.blendFuncSeparate(at[$],at[fe],at[te],at[Pe]),S=$,y=fe,b=te,A=Pe),(be.equals(_)===!1||It!==w)&&(n.blendColor(be.r,be.g,be.b,It),_.copy(be),w=It),f=N,R=!1}function Ae(N,he){N.side===an?we(n.CULL_FACE):ee(n.CULL_FACE);let $=N.side===ln;he&&($=!$),Ce($),N.blending===wr&&N.transparent===!1?se(Kt):se(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const fe=N.stencilWrite;o.setTest(fe),fe&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),We(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(N){P!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),P=N)}function dt(N){N!==xm?(ee(n.CULL_FACE),N!==D&&(N===Bd?n.cullFace(n.BACK):N===vm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),D=N}function Ze(N){N!==O&&(k&&n.lineWidth(N),O=N)}function We(N,he,$){N?(ee(n.POLYGON_OFFSET_FILL),(B!==he||U!==$)&&(B=he,U=$,a.getReversed()&&(he=-he),n.polygonOffset(he,$))):we(n.POLYGON_OFFSET_FILL)}function ut(N){N?ee(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function ot(N){N===void 0&&(N=n.TEXTURE0+W-1),ne!==N&&(n.activeTexture(N),ne=N)}function L(N,he,$){$===void 0&&(ne===null?$=n.TEXTURE0+W-1:$=ne);let fe=ae[$];fe===void 0&&(fe={type:void 0,texture:void 0},ae[$]=fe),(fe.type!==N||fe.texture!==he)&&(ne!==$&&(n.activeTexture($),ne=$),n.bindTexture(N,he||ie[N]),fe.type=N,fe.texture=he)}function Gt(){const N=ae[ne];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function je(){try{n.compressedTexImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function M(){try{n.texSubImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function F(){try{n.texSubImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function de(){try{n.texStorage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function j(){try{n.texImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function Q(){try{n.texImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function ue(N){return h[N]!==void 0?h[N]:n.getParameter(N)}function Re(N,he){h[N]!==he&&(n.pixelStorei(N,he),h[N]=he)}function ce(N){$e.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),$e.copy(N))}function oe(N){ke.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),ke.copy(N))}function Ee(N,he){let $=l.get(he);$===void 0&&($=new WeakMap,l.set(he,$));let fe=$.get(N);fe===void 0&&(fe=n.getUniformBlockIndex(he,N.name),$.set(N,fe))}function Le(N,he){const fe=l.get(he).get(N);c.get(he)!==fe&&(n.uniformBlockBinding(he,fe,N.__bindingPointIndex),c.set(he,fe))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},ne=null,ae={},u={},p=new WeakMap,g=[],v=null,m=!1,f=null,x=null,S=null,y=null,E=null,b=null,A=null,_=new De(0,0,0),w=0,R=!1,P=null,D=null,O=null,B=null,U=null,$e.set(0,0,n.canvas.width,n.canvas.height),ke.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:we,bindFramebuffer:ze,drawBuffers:ve,useProgram:gt,setBlending:se,setMaterial:Ae,setFlipSided:Ce,setCullFace:dt,setLineWidth:Ze,setPolygonOffset:We,setScissorTest:ut,activeTexture:ot,bindTexture:L,unbindTexture:Gt,compressedTexImage2D:je,compressedTexImage3D:C,texImage2D:j,texImage3D:Q,pixelStorei:Re,getParameter:ue,updateUBOMapping:Ee,uniformBlockBinding:Le,texStorage2D:re,texStorage3D:de,texSubImage2D:M,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ce,viewport:oe,reset:Be}}function Oy(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Se,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,M){return g?new OffscreenCanvas(C,M):fs("canvas")}function m(C,M,F){let V=1;const Z=je(C);if((Z.width>F||Z.height>F)&&(V=F/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const re=Math.floor(V*Z.width),de=Math.floor(V*Z.height);u===void 0&&(u=v(re,de));const j=M?v(re,de):u;return j.width=re,j.height=de,j.getContext("2d").drawImage(C,0,0,re,de),Fe("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+re+"x"+de+")."),j}else return"data"in C&&Fe("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function f(C){return C.generateMipmaps}function x(C){n.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,M,F,V,Z,re=!1){if(C!==null){if(n[C]!==void 0)return n[C];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let de;V&&(de=e.get("EXT_texture_norm16"),de||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=M;if(M===n.RED&&(F===n.FLOAT&&(j=n.R32F),F===n.HALF_FLOAT&&(j=n.R16F),F===n.UNSIGNED_BYTE&&(j=n.R8),F===n.UNSIGNED_SHORT&&de&&(j=de.R16_EXT),F===n.SHORT&&de&&(j=de.R16_SNORM_EXT)),M===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(j=n.R8UI),F===n.UNSIGNED_SHORT&&(j=n.R16UI),F===n.UNSIGNED_INT&&(j=n.R32UI),F===n.BYTE&&(j=n.R8I),F===n.SHORT&&(j=n.R16I),F===n.INT&&(j=n.R32I)),M===n.RG&&(F===n.FLOAT&&(j=n.RG32F),F===n.HALF_FLOAT&&(j=n.RG16F),F===n.UNSIGNED_BYTE&&(j=n.RG8),F===n.UNSIGNED_SHORT&&de&&(j=de.RG16_EXT),F===n.SHORT&&de&&(j=de.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(j=n.RG8UI),F===n.UNSIGNED_SHORT&&(j=n.RG16UI),F===n.UNSIGNED_INT&&(j=n.RG32UI),F===n.BYTE&&(j=n.RG8I),F===n.SHORT&&(j=n.RG16I),F===n.INT&&(j=n.RG32I)),M===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(j=n.RGB8UI),F===n.UNSIGNED_SHORT&&(j=n.RGB16UI),F===n.UNSIGNED_INT&&(j=n.RGB32UI),F===n.BYTE&&(j=n.RGB8I),F===n.SHORT&&(j=n.RGB16I),F===n.INT&&(j=n.RGB32I)),M===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),F===n.UNSIGNED_INT&&(j=n.RGBA32UI),F===n.BYTE&&(j=n.RGBA8I),F===n.SHORT&&(j=n.RGBA16I),F===n.INT&&(j=n.RGBA32I)),M===n.RGB&&(F===n.UNSIGNED_SHORT&&de&&(j=de.RGB16_EXT),F===n.SHORT&&de&&(j=de.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),M===n.RGBA){const Q=re?Ba:tt.getTransfer(Z);F===n.FLOAT&&(j=n.RGBA32F),F===n.HALF_FLOAT&&(j=n.RGBA16F),F===n.UNSIGNED_BYTE&&(j=Q===ht?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&de&&(j=de.RGBA16_EXT),F===n.SHORT&&de&&(j=de.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function E(C,M){let F;return C?M===null||M===ei||M===Dr?F=n.DEPTH24_STENCIL8:M===On?F=n.DEPTH32F_STENCIL8:M===cs&&(F=n.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ei||M===Dr?F=n.DEPTH_COMPONENT24:M===On?F=n.DEPTH_COMPONENT32F:M===cs&&(F=n.DEPTH_COMPONENT16),F}function b(C,M){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ft&&C.minFilter!==Bt?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function A(C){const M=C.target;M.removeEventListener("dispose",A),w(M),M.isVideoTexture&&d.delete(M),M.isHTMLTexture&&h.delete(M)}function _(C){const M=C.target;M.removeEventListener("dispose",_),P(M)}function w(C){const M=i.get(C);if(M.__webglInit===void 0)return;const F=C.source,V=p.get(F);if(V){const Z=V[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(C),Object.keys(V).length===0&&p.delete(F)}i.remove(C)}function R(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const F=C.source,V=p.get(F);delete V[M.__cacheKey],a.memory.textures--}function P(C){const M=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(M.__webglFramebuffer[V]))for(let Z=0;Z<M.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(M.__webglFramebuffer[V]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[V])}else{if(Array.isArray(M.__webglFramebuffer))for(let V=0;V<M.__webglFramebuffer.length;V++)n.deleteFramebuffer(M.__webglFramebuffer[V]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let V=0;V<M.__webglColorRenderbuffer.length;V++)M.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[V]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const F=C.textures;for(let V=0,Z=F.length;V<Z;V++){const re=i.get(F[V]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(F[V])}i.remove(C)}let D=0;function O(){D=0}function B(){return D}function U(C){D=C}function W(){const C=D;return C>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),D+=1,C}function k(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function q(C,M){const F=i.get(C);if(C.isVideoTexture&&L(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&F.__version!==C.version){const V=C.image;if(V===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{we(F,C,M);return}}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+M)}function J(C,M){const F=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){we(F,C,M);return}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+M)}function ne(C,M){const F=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){we(F,C,M);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+M)}function ae(C,M){const F=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&F.__version!==C.version){ze(F,C,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+M)}const le={[Vn]:n.REPEAT,[ui]:n.CLAMP_TO_EDGE,[wl]:n.MIRRORED_REPEAT},Ge={[Ft]:n.NEAREST,[zm]:n.NEAREST_MIPMAP_NEAREST,[Ps]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[po]:n.LINEAR_MIPMAP_NEAREST,[hi]:n.LINEAR_MIPMAP_LINEAR},$e={[Bm]:n.NEVER,[Wm]:n.ALWAYS,[km]:n.LESS,[Ic]:n.LEQUAL,[Vm]:n.EQUAL,[Lc]:n.GEQUAL,[Hm]:n.GREATER,[Gm]:n.NOTEQUAL};function ke(C,M){if(M.type===On&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Bt||M.magFilter===po||M.magFilter===Ps||M.magFilter===hi||M.minFilter===Bt||M.minFilter===po||M.minFilter===Ps||M.minFilter===hi)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,le[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,le[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,le[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Ge[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Ge[M.minFilter]),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,$e[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ft||M.minFilter!==Ps&&M.minFilter!==hi||M.type===On&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function K(C,M){let F=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",A));const V=M.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const re=k(M);if(re!==C.__cacheKey){Z[re]===void 0&&(Z[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[re].usedTimes++;const de=Z[C.__cacheKey];de!==void 0&&(Z[C.__cacheKey].usedTimes--,de.usedTimes===0&&R(M)),C.__cacheKey=re,C.__webglTexture=Z[re].texture}return F}function ie(C,M,F){return Math.floor(Math.floor(C/F)/M)}function ee(C,M,F,V){const re=C.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,F,V,M.data);else{re.sort((Re,ce)=>Re.start-ce.start);let de=0;for(let Re=1;Re<re.length;Re++){const ce=re[de],oe=re[Re],Ee=ce.start+ce.count,Le=ie(oe.start,M.width,4),Be=ie(ce.start,M.width,4);oe.start<=Ee+1&&Le===Be&&ie(oe.start+oe.count-1,M.width,4)===Le?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++de,re[de]=oe)}re.length=de+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let Re=0,ce=re.length;Re<ce;Re++){const oe=re[Re],Ee=Math.floor(oe.start/4),Le=Math.ceil(oe.count/4),Be=Ee%M.width,N=Math.floor(Ee/M.width),he=Le,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Be,N,he,$,F,V,M.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function we(C,M,F){let V=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=n.TEXTURE_3D);const Z=K(C,M),re=M.source;t.bindTexture(V,C.__webglTexture,n.TEXTURE0+F);const de=i.get(re);if(re.version!==de.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const $=tt.getPrimaries(tt.workingColorSpace),fe=M.colorSpace===ci?null:tt.getPrimaries(M.colorSpace),xe=M.colorSpace===ci||$===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let Q=m(M.image,!1,r.maxTextureSize);Q=Gt(M,Q);const ue=s.convert(M.format,M.colorSpace),Re=s.convert(M.type);let ce=y(M.internalFormat,ue,Re,M.normalized,M.colorSpace,M.isVideoTexture);ke(V,M);let oe;const Ee=M.mipmaps,Le=M.isVideoTexture!==!0,Be=de.__version===void 0||Z===!0,N=re.dataReady,he=b(M,Q);if(M.isDepthTexture)ce=E(M.format===Pi,M.type),Be&&(Le?t.texStorage2D(n.TEXTURE_2D,1,ce,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,ue,Re,null));else if(M.isDataTexture)if(Ee.length>0){Le&&Be&&t.texStorage2D(n.TEXTURE_2D,he,ce,Ee[0].width,Ee[0].height);for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],Le?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,Re,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,ue,Re,oe.data);M.generateMipmaps=!1}else Le?(Be&&t.texStorage2D(n.TEXTURE_2D,he,ce,Q.width,Q.height),N&&ee(M,Q,ue,Re)):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,ue,Re,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Le&&Be&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ce,Ee[0].width,Ee[0].height,Q.depth);for(let $=0,fe=Ee.length;$<fe;$++)if(oe=Ee[$],M.format!==vn)if(ue!==null)if(Le){if(N)if(M.layerUpdates.size>0){const xe=wu(oe.width,oe.height,M.format,M.type);for(const te of M.layerUpdates){const Pe=oe.data.subarray(te*xe/oe.data.BYTES_PER_ELEMENT,(te+1)*xe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,te,oe.width,oe.height,1,ue,Pe)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ue,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,oe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,ue,Re,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,ue,Re,oe.data)}else{Le&&Be&&t.texStorage2D(n.TEXTURE_2D,he,ce,Ee[0].width,Ee[0].height);for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],M.format!==vn?ue!==null?Le?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,oe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,ue,Re,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,ue,Re,oe.data)}else if(M.isDataArrayTexture)if(Le){if(Be&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ce,Q.width,Q.height,Q.depth),N)if(M.layerUpdates.size>0){const $=wu(Q.width,Q.height,M.format,M.type);for(const fe of M.layerUpdates){const xe=Q.data.subarray(fe*$/Q.data.BYTES_PER_ELEMENT,(fe+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,Q.width,Q.height,1,ue,Re,xe)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ue,Re,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,Q.width,Q.height,Q.depth,0,ue,Re,Q.data);else if(M.isData3DTexture)Le?(Be&&t.texStorage3D(n.TEXTURE_3D,he,ce,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ue,Re,Q.data)):t.texImage3D(n.TEXTURE_3D,0,ce,Q.width,Q.height,Q.depth,0,ue,Re,Q.data);else if(M.isFramebufferTexture){if(Be)if(Le)t.texStorage2D(n.TEXTURE_2D,he,ce,Q.width,Q.height);else{let $=Q.width,fe=Q.height;for(let xe=0;xe<he;xe++)t.texImage2D(n.TEXTURE_2D,xe,ce,$,fe,0,ue,Re,null),$>>=1,fe>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),h.add(M),$.onpaint=fe=>{const xe=fe.changedElements;for(const te of h)xe.includes(te.image)&&(te.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{const xe=n.RGBA,te=n.RGBA,Pe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,te,Pe,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Le&&Be){const $=je(Ee[0]);t.texStorage2D(n.TEXTURE_2D,he,ce,$.width,$.height)}for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],Le?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ue,Re,oe):t.texImage2D(n.TEXTURE_2D,$,ce,ue,Re,oe);M.generateMipmaps=!1}else if(Le){if(Be){const $=je(Q);t.texStorage2D(n.TEXTURE_2D,he,ce,$.width,$.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Re,Q)}else t.texImage2D(n.TEXTURE_2D,0,ce,ue,Re,Q);f(M)&&x(V),de.__version=re.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ze(C,M,F){if(M.image.length!==6)return;const V=K(C,M),Z=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+F);const re=i.get(Z);if(Z.version!==re.__version||V===!0){t.activeTexture(n.TEXTURE0+F);const de=tt.getPrimaries(tt.workingColorSpace),j=M.colorSpace===ci?null:tt.getPrimaries(M.colorSpace),Q=M.colorSpace===ci||de===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ue=M.isCompressedTexture||M.image[0].isCompressedTexture,Re=M.image[0]&&M.image[0].isDataTexture,ce=[];for(let te=0;te<6;te++)!ue&&!Re?ce[te]=m(M.image[te],!0,r.maxCubemapSize):ce[te]=Re?M.image[te].image:M.image[te],ce[te]=Gt(M,ce[te]);const oe=ce[0],Ee=s.convert(M.format,M.colorSpace),Le=s.convert(M.type),Be=y(M.internalFormat,Ee,Le,M.normalized,M.colorSpace),N=M.isVideoTexture!==!0,he=re.__version===void 0||V===!0,$=Z.dataReady;let fe=b(M,oe);ke(n.TEXTURE_CUBE_MAP,M);let xe;if(ue){N&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Be,oe.width,oe.height);for(let te=0;te<6;te++){xe=ce[te].mipmaps;for(let Pe=0;Pe<xe.length;Pe++){const be=xe[Pe];M.format!==vn?Ee!==null?N?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,be.width,be.height,Ee,be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Be,be.width,be.height,0,be.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,be.width,be.height,Ee,Le,be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Be,be.width,be.height,0,Ee,Le,be.data)}}}else{if(xe=M.mipmaps,N&&he){xe.length>0&&fe++;const te=je(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Be,te.width,te.height)}for(let te=0;te<6;te++)if(Re){N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ce[te].width,ce[te].height,Ee,Le,ce[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,ce[te].width,ce[te].height,0,Ee,Le,ce[te].data);for(let Pe=0;Pe<xe.length;Pe++){const It=xe[Pe].image[te].image;N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,It.width,It.height,Ee,Le,It.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Be,It.width,It.height,0,Ee,Le,It.data)}}else{N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ee,Le,ce[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,Ee,Le,ce[te]);for(let Pe=0;Pe<xe.length;Pe++){const be=xe[Pe];N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,Ee,Le,be.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Be,Ee,Le,be.image[te])}}}f(M)&&x(n.TEXTURE_CUBE_MAP),re.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ve(C,M,F,V,Z,re){const de=s.convert(F.format,F.colorSpace),j=s.convert(F.type),Q=y(F.internalFormat,de,j,F.normalized,F.colorSpace),ue=i.get(M),Re=i.get(F);if(Re.__renderTarget=M,!ue.__hasExternalTextures){const ce=Math.max(1,M.width>>re),oe=Math.max(1,M.height>>re);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,re,Q,ce,oe,M.depth,0,de,j,null):t.texImage2D(Z,re,Q,ce,oe,0,de,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ot(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Re.__webglTexture,0,ut(M)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Re.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(C,M,F){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer){const V=M.depthTexture,Z=V&&V.isDepthTexture?V.type:null,re=E(M.stencilBuffer,Z),de=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ot(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(M),re,M.width,M.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(M),re,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,re,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,C)}else{const V=M.textures;for(let Z=0;Z<V.length;Z++){const re=V[Z],de=s.convert(re.format,re.colorSpace),j=s.convert(re.type),Q=y(re.internalFormat,de,j,re.normalized,re.colorSpace);ot(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(M),Q,M.width,M.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(M),Q,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Q,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function qe(C,M,F){const V=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ke(n.TEXTURE_CUBE_MAP,M.depthTexture);const ue=s.convert(M.depthTexture.format),Re=s.convert(M.depthTexture.type);let ce;M.depthTexture.format===xi?ce=n.DEPTH_COMPONENT24:M.depthTexture.format===Pi&&(ce=n.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,M.width,M.height,0,ue,Re,null)}}else q(M.depthTexture,0);const re=Z.__webglTexture,de=ut(M),j=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,Q=M.depthTexture.format===Pi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===xi)ot(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,j,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,j,re,0);else if(M.depthTexture.format===Pi)ot(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,j,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,j,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function at(C){const M=i.get(C),F=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const V=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),V){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=V}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)qe(M.__webglFramebuffer[V],C,V);else{const V=C.texture.mipmaps;V&&V.length>0?qe(M.__webglFramebuffer[0],C,0):qe(M.__webglFramebuffer,C,0)}else if(F){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]===void 0)M.__webglDepthbuffer[V]=n.createRenderbuffer(),gt(M.__webglDepthbuffer[V],C,!1);else{const Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,re)}}else{const V=C.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),gt(M.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(C,M,F){const V=i.get(C);M!==void 0&&ve(V.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&at(C)}function Ae(C){const M=C.texture,F=i.get(C),V=i.get(M);C.addEventListener("dispose",_);const Z=C.textures,re=C.isWebGLCubeRenderTarget===!0,de=Z.length>1;if(de||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=M.version,a.memory.textures++),re){F.__webglFramebuffer=[];for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[j]=[];for(let Q=0;Q<M.mipmaps.length;Q++)F.__webglFramebuffer[j][Q]=n.createFramebuffer()}else F.__webglFramebuffer[j]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let j=0;j<M.mipmaps.length;j++)F.__webglFramebuffer[j]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(de)for(let j=0,Q=Z.length;j<Q;j++){const ue=i.get(Z[j]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&ot(C)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){const Q=Z[j];F.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[j]);const ue=s.convert(Q.format,Q.colorSpace),Re=s.convert(Q.type),ce=y(Q.internalFormat,ue,Re,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),oe=ut(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,ce,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,F.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),gt(F.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),ke(n.TEXTURE_CUBE_MAP,M);for(let j=0;j<6;j++)if(M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)ve(F.__webglFramebuffer[j][Q],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Q);else ve(F.__webglFramebuffer[j],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);f(M)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let j=0,Q=Z.length;j<Q;j++){const ue=Z[j],Re=i.get(ue);let ce=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,Re.__webglTexture),ke(ce,ue),ve(F.__webglFramebuffer,C,ue,n.COLOR_ATTACHMENT0+j,ce,0),f(ue)&&x(ce)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,V.__webglTexture),ke(j,M),M.mipmaps&&M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)ve(F.__webglFramebuffer[Q],C,M,n.COLOR_ATTACHMENT0,j,Q);else ve(F.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,j,0);f(M)&&x(j),t.unbindTexture()}C.depthBuffer&&at(C)}function Ce(C){const M=C.textures;for(let F=0,V=M.length;F<V;F++){const Z=M[F];if(f(Z)){const re=S(C),de=i.get(Z).__webglTexture;t.bindTexture(re,de),x(re),t.unbindTexture()}}}const dt=[],Ze=[];function We(C){if(C.samples>0){if(ot(C)===!1){const M=C.textures,F=C.width,V=C.height;let Z=n.COLOR_BUFFER_BIT;const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(C),j=M.length>1;if(j)for(let ue=0;ue<M.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const Q=C.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let ue=0;ue<M.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[ue]);const Re=i.get(M[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Re,0)}n.blitFramebuffer(0,0,F,V,0,0,F,V,Z,n.NEAREST),c===!0&&(dt.length=0,Ze.length=0,dt.push(n.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.resolveDepthBuffer===!1&&(dt.push(re),Ze.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let ue=0;ue<M.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,de.__webglColorRenderbuffer[ue]);const Re=i.get(M[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,Re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function ut(C){return Math.min(r.maxSamples,C.samples)}function ot(C){const M=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function L(C){const M=a.render.frame;d.get(C)!==M&&(d.set(C,M),C.update())}function Gt(C,M){const F=C.colorSpace,V=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||F!==us&&F!==ci&&(tt.getTransfer(F)===ht?(V!==vn||Z!==on)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ct("WebGLTextures: Unsupported texture color space:",F)),M}function je(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=O,this.getTextureUnits=B,this.setTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=J,this.setTexture3D=ne,this.setTextureCube=ae,this.rebindTextures=se,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ot,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Fy(n,e){function t(i,r=ci){let s;const a=tt.getTransfer(r);if(i===on)return n.UNSIGNED_BYTE;if(i===Tc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ac)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$h)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jh)return n.BYTE;if(i===Jh)return n.SHORT;if(i===cs)return n.UNSIGNED_SHORT;if(i===Ec)return n.INT;if(i===ei)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===Jt)return n.HALF_FLOAT;if(i===ef)return n.ALPHA;if(i===tf)return n.RGB;if(i===vn)return n.RGBA;if(i===xi)return n.DEPTH_COMPONENT;if(i===Pi)return n.DEPTH_STENCIL;if(i===Rc)return n.RED;if(i===Cc)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===Pc)return n.RG_INTEGER;if(i===Dc)return n.RGBA_INTEGER;if(i===wa||i===Ea||i===Ta||i===Aa)if(a===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===wa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===wa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ea)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ta)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Aa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===El||i===Tl||i===Al||i===Rl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===El)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Al)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cl||i===Pl||i===Dl||i===Il||i===Ll||i===Oa||i===Nl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Cl||i===Pl)return a===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Dl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Il)return s.COMPRESSED_R11_EAC;if(i===Ll)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Oa)return s.COMPRESSED_RG11_EAC;if(i===Nl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ul||i===zl||i===Ol||i===Fl||i===Bl||i===kl||i===Vl||i===Hl||i===Gl||i===Wl||i===Xl||i===ql||i===Yl||i===Zl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ul)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===zl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ol)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===kl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ql)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Zl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Kl||i===jl||i===Jl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Kl)return a===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ql||i===$l||i===Fa||i===ec)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ql)return s.COMPRESSED_RED_RGTC1_EXT;if(i===$l)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ec)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Dr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const By=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ky=`
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

}`;class Vy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new hf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Tt({vertexShader:By,fragmentShader:ky,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ue(new Fr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hy extends Qi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",m=new Vy,f={},x=t.getContextAttributes();let S=null,y=null;const E=[],b=[],A=new Se;let _=null;const w=new wn;w.viewport=new Ct;const R=new wn;R.viewport=new Ct;const P=[w,R],D=new j0;let O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ie=E[K];return ie===void 0&&(ie=new _o,E[K]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(K){let ie=E[K];return ie===void 0&&(ie=new _o,E[K]=ie),ie.getGripSpace()},this.getHand=function(K){let ie=E[K];return ie===void 0&&(ie=new _o,E[K]=ie),ie.getHandSpace()};function U(K){const ie=b.indexOf(K.inputSource);if(ie===-1)return;const ee=E[ie];ee!==void 0&&(ee.update(K.inputSource,K.frame,l||a),ee.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",k);for(let K=0;K<E.length;K++){const ie=b[K];ie!==null&&(b[K]=null,E[K].disconnect(ie))}O=null,B=null,m.reset();for(const K in f)delete f[K];e.setRenderTarget(S),p=null,u=null,h=null,r=null,y=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",W),r.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,we=null,ze=null;x.depth&&(ze=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=x.stencil?Pi:xi,we=x.stencil?Dr:ei);const ve={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(ve),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Wt(u.textureWidth,u.textureHeight,{format:vn,type:on,depthTexture:new Zi(u.textureWidth,u.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Wt(p.framebufferWidth,p.framebufferHeight,{format:vn,type:on,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(K){for(let ie=0;ie<K.removed.length;ie++){const ee=K.removed[ie],we=b.indexOf(ee);we>=0&&(b[we]=null,E[we].disconnect(ee))}for(let ie=0;ie<K.added.length;ie++){const ee=K.added[ie];let we=b.indexOf(ee);if(we===-1){for(let ve=0;ve<E.length;ve++)if(ve>=b.length){b.push(ee),we=ve;break}else if(b[ve]===null){b[ve]=ee,we=ve;break}if(we===-1)break}const ze=E[we];ze&&ze.connect(ee)}}const q=new I,J=new I;function ne(K,ie,ee){q.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(ee.matrixWorld);const we=q.distanceTo(J),ze=ie.projectionMatrix.elements,ve=ee.projectionMatrix.elements,gt=ze[14]/(ze[10]-1),qe=ze[14]/(ze[10]+1),at=(ze[9]+1)/ze[5],se=(ze[9]-1)/ze[5],Ae=(ze[8]-1)/ze[0],Ce=(ve[8]+1)/ve[0],dt=gt*Ae,Ze=gt*Ce,We=we/(-Ae+Ce),ut=We*-Ae;if(ie.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ut),K.translateZ(We),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),ze[10]===-1)K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const ot=gt+We,L=qe+We,Gt=dt-ut,je=Ze+(we-ut),C=at*qe/L*ot,M=se*qe/L*ot;K.projectionMatrix.makePerspective(Gt,je,C,M,ot,L),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ae(K,ie){ie===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ie.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ie=K.near,ee=K.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),D.near=R.near=w.near=ie,D.far=R.far=w.far=ee,(O!==D.near||B!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,B=D.far),D.layers.mask=K.layers.mask|6,w.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;const we=K.parent,ze=D.cameras;ae(D,we);for(let ve=0;ve<ze.length;ve++)ae(ze[ve],we);ze.length===2?ne(D,w,R):D.projectionMatrix.copy(w.projectionMatrix),le(K,D,we)};function le(K,ie,ee){ee===null?K.matrix.copy(ie.matrixWorld):(K.matrix.copy(ee.matrixWorld),K.matrix.invert(),K.matrix.multiply(ie.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ps*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(K){return f[K]};let Ge=null;function $e(K,ie){if(d=ie.getViewerPose(l||a),g=ie,d!==null){const ee=d.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let we=!1;ee.length!==D.cameras.length&&(D.cameras.length=0,we=!0);for(let qe=0;qe<ee.length;qe++){const at=ee[qe];let se=null;if(p!==null)se=p.getViewport(at);else{const Ce=h.getViewSubImage(u,at);se=Ce.viewport,qe===0&&(e.setRenderTargetTextures(y,Ce.colorTexture,Ce.depthStencilTexture),e.setRenderTarget(y))}let Ae=P[qe];Ae===void 0&&(Ae=new wn,Ae.layers.enable(qe),Ae.viewport=new Ct,P[qe]=Ae),Ae.matrix.fromArray(at.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(at.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(se.x,se.y,se.width,se.height),qe===0&&(D.matrix.copy(Ae.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),we===!0&&D.cameras.push(Ae)}const ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const qe=h.getDepthInformation(ee[0]);qe&&qe.isValid&&qe.texture&&m.init(qe,r.renderState)}if(ze&&ze.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let qe=0;qe<ee.length;qe++){const at=ee[qe].camera;if(at){let se=f[at];se||(se=new hf,f[at]=se);const Ae=h.getCameraImage(at);se.sourceTexture=Ae}}}}for(let ee=0;ee<E.length;ee++){const we=b[ee],ze=E[ee];we!==null&&ze!==void 0&&ze.update(we,ie,l||a)}Ge&&Ge(K,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const ke=new xf;ke.setAnimationLoop($e),this.setAnimationLoop=function(K){Ge=K},this.dispose=function(){}}}const Gy=new st,wf=new Ve;wf.set(-1,0,0,0,1,0,0,0,1);function Wy(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,ff(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,x,S,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,x,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f),S=x.envMap,y=x.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Gy.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(wf),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,x,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Xy(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,E){const b=E.program;i.uniformBlockBinding(y,b)}function l(y,E){let b=r[y.id];b===void 0&&(m(y),b=d(y),r[y.id]=b,y.addEventListener("dispose",x));const A=E.program;i.updateUBOMapping(y,A);const _=e.render.frame;s[y.id]!==_&&(u(y),s[y.id]=_)}function d(y){const E=h();y.__bindingPointIndex=E;const b=n.createBuffer(),A=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ct("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const E=r[y.id],b=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,w=b.length;_<w;_++){const R=b[_];if(Array.isArray(R))for(let P=0,D=R.length;P<D;P++)p(R[P],_,P,A);else p(R,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,E,b,A){if(v(y,E,b,A)===!0){const _=y.__offset,w=y.value;if(Array.isArray(w)){let R=0;for(let P=0;P<w.length;P++){const D=w[P],O=f(D);g(D,y.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function g(y,E,b){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,b)}function v(y,E,b,A){const _=y.value,w=E+"_"+b;if(A[w]===void 0)return typeof _=="number"||typeof _=="boolean"?A[w]=_:ArrayBuffer.isView(_)?A[w]=_.slice():A[w]=_.clone(),!0;{const R=A[w];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return A[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function m(y){const E=y.uniforms;let b=0;const A=16;for(let w=0,R=E.length;w<R;w++){const P=Array.isArray(E[w])?E[w]:[E[w]];for(let D=0,O=P.length;D<O;D++){const B=P[D],U=Array.isArray(B.value)?B.value:[B.value];for(let W=0,k=U.length;W<k;W++){const q=U[W],J=f(q),ne=b%A,ae=ne%J.boundary,le=ne+ae;b+=ae,le!==0&&A-le<J.storage&&(b+=A-le),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=J.storage}}}const _=b%A;return _>0&&(b+=A-_),y.__size=b,y.__cache={},this}function f(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",y),E}function x(y){const E=y.target;E.removeEventListener("dispose",x);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function S(){for(const y in r)n.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:S}}const qy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let qn=null;function Yy(){return qn===null&&(qn=new _s(qy,16,16,Yi,Jt),qn.name="DFG_LUT",qn.minFilter=Bt,qn.magFilter=Bt,qn.wrapS=ui,qn.wrapT=ui,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}class Zy{constructor(e={}){const{canvas:t=qm(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=on}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=p,m=new Set([Dc,Pc,Cc]),f=new Set([on,ei,cs,Dr,Tc,Ac]),x=new Uint32Array(4),S=new Int32Array(4),y=new I;let E=null,b=null;const A=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let P=!1,D=null,O=null,B=null,U=null;this._outputColorSpace=jt;let W=0,k=0,q=null,J=-1,ne=null;const ae=new Ct,le=new Ct;let Ge=null;const $e=new De(0);let ke=0,K=t.width,ie=t.height,ee=1,we=null,ze=null;const ve=new Ct(0,0,K,ie),gt=new Ct(0,0,K,ie);let qe=!1;const at=new Oc;let se=!1,Ae=!1;const Ce=new st,dt=new I,Ze=new Ct,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function ot(){return q===null?ee:1}let L=i;function Gt(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",It,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),L===null){const z="webgl2";if(L=Gt(z,T),L===null)throw Gt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw ct("WebGLRenderer: "+T.message),T}let je,C,M,F,V,Z,re,de,j,Q,ue,Re,ce,oe,Ee,Le,Be,N,he,$,fe,xe,te;function Pe(){je=new Yx(L),je.init(),fe=new Fy(L,je),C=new Bx(L,je,e,fe),M=new zy(L,je),C.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),O=L.createFramebuffer(),B=L.createFramebuffer(),U=L.createFramebuffer(),F=new jx(L),V=new Sy,Z=new Oy(L,je,M,V,C,fe,F),re=new qx(R),de=new eg(L),xe=new Ox(L,de),j=new Zx(L,de,F,xe),Q=new Qx(L,j,de,xe,F),N=new Jx(L,C,Z),Ee=new kx(V),ue=new My(R,re,je,C,xe,Ee),Re=new Wy(R,V),ce=new wy,oe=new Py(je),Be=new zx(R,re,M,Q,g,c),Le=new Uy(R,Q,C),te=new Xy(L,F,C,M),he=new Fx(L,je,F),$=new Kx(L,je,F),F.programs=ue.programs,R.capabilities=C,R.extensions=je,R.properties=V,R.renderLists=ce,R.shadowMap=Le,R.state=M,R.info=F}Pe(),v!==on&&(w=new ev(v,t.width,t.height,o,r,s));const be=new Hy(R,L);this.xr=be,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=je.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=je.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(T){T!==void 0&&(ee=T,this.setSize(K,ie,!1))},this.getSize=function(T){return T.set(K,ie)},this.setSize=function(T,z,X=!0){if(be.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,ie=z,t.width=Math.floor(T*ee),t.height=Math.floor(z*ee),X===!0&&(t.style.width=T+"px",t.style.height=z+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(K*ee,ie*ee).floor()},this.setDrawingBufferSize=function(T,z,X){K=T,ie=z,ee=X,t.width=Math.floor(T*X),t.height=Math.floor(z*X),this.setViewport(0,0,T,z)},this.setEffects=function(T){if(v===on){ct("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let z=0;z<T.length;z++)if(T[z].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ae)},this.getViewport=function(T){return T.copy(ve)},this.setViewport=function(T,z,X,H){T.isVector4?ve.set(T.x,T.y,T.z,T.w):ve.set(T,z,X,H),M.viewport(ae.copy(ve).multiplyScalar(ee).round())},this.getScissor=function(T){return T.copy(gt)},this.setScissor=function(T,z,X,H){T.isVector4?gt.set(T.x,T.y,T.z,T.w):gt.set(T,z,X,H),M.scissor(le.copy(gt).multiplyScalar(ee).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(T){M.setScissorTest(qe=T)},this.setOpaqueSort=function(T){we=T},this.setTransparentSort=function(T){ze=T},this.getClearColor=function(T){return T.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,X=!0){let H=0;if(T){let G=!1;if(q!==null){const ge=q.texture.format;G=m.has(ge)}if(G){const ge=q.texture.type,Me=f.has(ge),me=Be.getClearColor(),Te=Be.getClearAlpha(),Ie=me.r,Ye=me.g,Qe=me.b;Me?(x[0]=Ie,x[1]=Ye,x[2]=Qe,x[3]=Te,L.clearBufferuiv(L.COLOR,0,x)):(S[0]=Ie,S[1]=Ye,S[2]=Qe,S[3]=Te,L.clearBufferiv(L.COLOR,0,S))}else H|=L.COLOR_BUFFER_BIT}z&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),D=T},this.dispose=function(){t.removeEventListener("webglcontextlost",It,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Be.dispose(),ce.dispose(),oe.dispose(),V.dispose(),re.dispose(),Q.dispose(),xe.dispose(),te.dispose(),ue.dispose(),be.dispose(),be.removeEventListener("sessionstart",pd),be.removeEventListener("sessionend",md),Ui.stop()};function It(T){T.preventDefault(),qd("WebGLRenderer: Context Lost."),P=!0}function _t(){qd("WebGLRenderer: Context Restored."),P=!1;const T=F.autoReset,z=Le.enabled,X=Le.autoUpdate,H=Le.needsUpdate,G=Le.type;Pe(),F.autoReset=T,Le.enabled=z,Le.autoUpdate=X,Le.needsUpdate=H,Le.type=G}function Hn(T){ct("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gn(T){const z=T.target;z.removeEventListener("dispose",Gn),np(z)}function np(T){ip(T),V.remove(T)}function ip(T){const z=V.get(T).programs;z!==void 0&&(z.forEach(function(X){ue.releaseProgram(X)}),T.isShaderMaterial&&ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,X,H,G,ge){z===null&&(z=We);const Me=G.isMesh&&G.matrixWorld.determinantAffine()<0,me=ap(T,z,X,H,G);M.setMaterial(H,Me);let Te=X.index,Ie=1;if(H.wireframe===!0){if(Te=j.getWireframeAttribute(X),Te===void 0)return;Ie=2}const Ye=X.drawRange,Qe=X.attributes.position;let Ne=Ye.start*Ie,mt=(Ye.start+Ye.count)*Ie;ge!==null&&(Ne=Math.max(Ne,ge.start*Ie),mt=Math.min(mt,(ge.start+ge.count)*Ie)),Te!==null?(Ne=Math.max(Ne,0),mt=Math.min(mt,Te.count)):Qe!=null&&(Ne=Math.max(Ne,0),mt=Math.min(mt,Qe.count));const Ut=mt-Ne;if(Ut<0||Ut===1/0)return;xe.setup(G,H,me,X,Te);let Lt,xt=he;if(Te!==null&&(Lt=de.get(Te),xt=$,xt.setIndex(Lt)),G.isMesh)H.wireframe===!0?(M.setLineWidth(H.wireframeLinewidth*ot()),xt.setMode(L.LINES)):xt.setMode(L.TRIANGLES);else if(G.isLine){let $t=H.linewidth;$t===void 0&&($t=1),M.setLineWidth($t*ot()),G.isLineSegments?xt.setMode(L.LINES):G.isLineLoop?xt.setMode(L.LINE_LOOP):xt.setMode(L.LINE_STRIP)}else G.isPoints?xt.setMode(L.POINTS):G.isSprite&&xt.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(je.get("WEBGL_multi_draw"))xt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const $t=G._multiDrawStarts,_e=G._multiDrawCounts,un=G._multiDrawCount,lt=Te?de.get(Te).bytesPerElement:1,_n=V.get(H).currentProgram.getUniforms();for(let Wn=0;Wn<un;Wn++)_n.setValue(L,"_gl_DrawID",Wn),xt.render($t[Wn]/lt,_e[Wn])}else if(G.isInstancedMesh)xt.renderInstances(Ne,Ut,G.count);else if(X.isInstancedBufferGeometry){const $t=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,_e=Math.min(X.instanceCount,$t);xt.renderInstances(Ne,Ut,_e)}else xt.render(Ne,Ut)};function fd(T,z,X){T.transparent===!0&&T.side===an&&T.forceSinglePass===!1?(T.side=ln,T.needsUpdate=!0,Rs(T,z,X),T.side=gi,T.needsUpdate=!0,Rs(T,z,X),T.side=an):Rs(T,z,X)}this.compile=function(T,z,X=null){X===null&&(X=T),b=oe.get(X),b.init(z),_.push(b),X.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),T!==X&&T.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights();const H=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let Me=0;Me<ge.length;Me++){const me=ge[Me];fd(me,X,G),H.add(me)}else fd(ge,X,G),H.add(ge)}),b=_.pop(),H},this.compileAsync=function(T,z,X=null){const H=this.compile(T,z,X);return new Promise(G=>{function ge(){if(H.forEach(function(Me){V.get(Me).currentProgram.isReady()&&H.delete(Me)}),H.size===0){G(T);return}setTimeout(ge,10)}je.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let oo=null;function rp(T){oo&&oo(T)}function pd(){Ui.stop()}function md(){Ui.start()}const Ui=new xf;Ui.setAnimationLoop(rp),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(T){oo=T,be.setAnimationLoop(T),T===null?Ui.stop():Ui.start()},be.addEventListener("sessionstart",pd),be.addEventListener("sessionend",md),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){ct("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(T,z);const X=be.enabled===!0&&be.isPresenting===!0,H=w!==null&&(q===null||X)&&w.begin(R,q);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(z),z=be.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,z,q),b=oe.get(T,_.length),b.init(z),b.state.textureUnits=Z.getTextureUnits(),_.push(b),Ce.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),at.setFromProjectionMatrix(Ce,jn,z.reversedDepth),Ae=this.localClippingEnabled,se=Ee.init(this.clippingPlanes,Ae),E=ce.get(T,A.length),E.init(),A.push(E),be.enabled===!0&&be.isPresenting===!0){const Me=R.xr.getDepthSensingMesh();Me!==null&&lo(Me,z,-1/0,R.sortObjects)}lo(T,z,0,R.sortObjects),E.finish(),R.sortObjects===!0&&E.sort(we,ze,z.reversedDepth),ut=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,ut&&Be.addToRenderList(E,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Ee.beginShadows();const G=b.state.shadowsArray;if(Le.render(G,T,z),se===!0&&Ee.endShadows(),(H&&w.hasRenderPass())===!1){const Me=E.opaque,me=E.transmissive;if(b.setupLights(),z.isArrayCamera){const Te=z.cameras;if(me.length>0)for(let Ie=0,Ye=Te.length;Ie<Ye;Ie++){const Qe=Te[Ie];xd(Me,me,T,Qe)}ut&&Be.render(T);for(let Ie=0,Ye=Te.length;Ie<Ye;Ie++){const Qe=Te[Ie];gd(E,T,Qe,Qe.viewport)}}else me.length>0&&xd(Me,me,T,z),ut&&Be.render(T),gd(E,T,z)}q!==null&&k===0&&(Z.updateMultisampleRenderTarget(q),Z.updateRenderTargetMipmap(q)),H&&w.end(R),T.isScene===!0&&T.onAfterRender(R,T,z),xe.resetDefaultState(),J=-1,ne=null,_.pop(),_.length>0?(b=_[_.length-1],Z.setTextureUnits(b.state.textureUnits),se===!0&&Ee.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,D!==null&&D.renderEnd()};function lo(T,z,X,H){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||at.intersectsSprite(T)){H&&Ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ce);const Me=Q.update(T),me=T.material;me.visible&&E.push(T,Me,me,X,Ze.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||at.intersectsObject(T))){const Me=Q.update(T),me=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ze.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ze.copy(Me.boundingSphere.center)),Ze.applyMatrix4(T.matrixWorld).applyMatrix4(Ce)),Array.isArray(me)){const Te=Me.groups;for(let Ie=0,Ye=Te.length;Ie<Ye;Ie++){const Qe=Te[Ie],Ne=me[Qe.materialIndex];Ne&&Ne.visible&&E.push(T,Me,Ne,X,Ze.z,Qe)}}else me.visible&&E.push(T,Me,me,X,Ze.z,null)}}const ge=T.children;for(let Me=0,me=ge.length;Me<me;Me++)lo(ge[Me],z,X,H)}function gd(T,z,X,H){const{opaque:G,transmissive:ge,transparent:Me}=T;b.setupLightsView(X),se===!0&&Ee.setGlobalState(R.clippingPlanes,X),H&&M.viewport(ae.copy(H)),G.length>0&&As(G,z,X),ge.length>0&&As(ge,z,X),Me.length>0&&As(Me,z,X),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function xd(T,z,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Ne=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Wt(1,1,{generateMipmaps:!0,type:Ne?Jt:on,minFilter:hi,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const ge=b.state.transmissionRenderTarget[H.id],Me=H.viewport||ae;ge.setSize(Me.z*R.transmissionResolutionScale,Me.w*R.transmissionResolutionScale);const me=R.getRenderTarget(),Te=R.getActiveCubeFace(),Ie=R.getActiveMipmapLevel();R.setRenderTarget(ge),R.getClearColor($e),ke=R.getClearAlpha(),ke<1&&R.setClearColor(16777215,.5),R.clear(),ut&&Be.render(X);const Ye=R.toneMapping;R.toneMapping=Jn;const Qe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),se===!0&&Ee.setGlobalState(R.clippingPlanes,H),As(T,X,H),Z.updateMultisampleRenderTarget(ge),Z.updateRenderTargetMipmap(ge),je.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let mt=0,Ut=z.length;mt<Ut;mt++){const Lt=z[mt],{object:xt,geometry:$t,material:_e,group:un}=Lt;if(_e.side===an&&xt.layers.test(H.layers)){const lt=_e.side;_e.side=ln,_e.needsUpdate=!0,vd(xt,X,H,$t,_e,un),_e.side=lt,_e.needsUpdate=!0,Ne=!0}}Ne===!0&&(Z.updateMultisampleRenderTarget(ge),Z.updateRenderTargetMipmap(ge))}R.setRenderTarget(me,Te,Ie),R.setClearColor($e,ke),Qe!==void 0&&(H.viewport=Qe),R.toneMapping=Ye}function As(T,z,X){const H=z.isScene===!0?z.overrideMaterial:null;for(let G=0,ge=T.length;G<ge;G++){const Me=T[G],{object:me,geometry:Te,group:Ie}=Me;let Ye=Me.material;Ye.allowOverride===!0&&H!==null&&(Ye=H),me.layers.test(X.layers)&&vd(me,z,X,Te,Ye,Ie)}}function vd(T,z,X,H,G,ge){T.onBeforeRender(R,z,X,H,G,ge),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(R,z,X,H,T,ge),G.transparent===!0&&G.side===an&&G.forceSinglePass===!1?(G.side=ln,G.needsUpdate=!0,R.renderBufferDirect(X,z,H,G,T,ge),G.side=gi,G.needsUpdate=!0,R.renderBufferDirect(X,z,H,G,T,ge),G.side=an):R.renderBufferDirect(X,z,H,G,T,ge),T.onAfterRender(R,z,X,H,G,ge)}function Rs(T,z,X){z.isScene!==!0&&(z=We);const H=V.get(T),G=b.state.lights,ge=b.state.shadowsArray,Me=G.state.version,me=ue.getParameters(T,G.state,ge,z,X,b.state.lightProbeGridArray),Te=ue.getProgramCacheKey(me);let Ie=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?z.environment:null,H.fog=z.fog;const Ye=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=re.get(T.envMap||H.environment,Ye),H.envMapRotation=H.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Ie===void 0&&(T.addEventListener("dispose",Gn),Ie=new Map,H.programs=Ie);let Qe=Ie.get(Te);if(Qe!==void 0){if(H.currentProgram===Qe&&H.lightsStateVersion===Me)return _d(T,me),Qe}else me.uniforms=ue.getUniforms(T),D!==null&&T.isNodeMaterial&&D.build(T,X,me),T.onBeforeCompile(me,R),Qe=ue.acquireProgram(me,Te),Ie.set(Te,Qe),H.uniforms=me.uniforms;const Ne=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ne.clippingPlanes=Ee.uniform),_d(T,me),H.needsLights=lp(T),H.lightsStateVersion=Me,H.needsLights&&(Ne.ambientLightColor.value=G.state.ambient,Ne.lightProbe.value=G.state.probe,Ne.directionalLights.value=G.state.directional,Ne.directionalLightShadows.value=G.state.directionalShadow,Ne.spotLights.value=G.state.spot,Ne.spotLightShadows.value=G.state.spotShadow,Ne.rectAreaLights.value=G.state.rectArea,Ne.ltc_1.value=G.state.rectAreaLTC1,Ne.ltc_2.value=G.state.rectAreaLTC2,Ne.pointLights.value=G.state.point,Ne.pointLightShadows.value=G.state.pointShadow,Ne.hemisphereLights.value=G.state.hemi,Ne.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ne.spotLightMatrix.value=G.state.spotLightMatrix,Ne.spotLightMap.value=G.state.spotLightMap,Ne.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Qe,H.uniformsList=null,Qe}function yd(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=Ra.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function _d(T,z){const X=V.get(T);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.batchingColor=z.batchingColor,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.instancingMorph=z.instancingMorph,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function sp(T,z){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(z.matrixWorld);for(let X=0,H=T.length;X<H;X++){const G=T[X];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function ap(T,z,X,H,G){z.isScene!==!0&&(z=We),Z.resetTextureUnits();const ge=z.fog,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?z.environment:null,me=q===null?R.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:tt.workingColorSpace,Te=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ie=re.get(H.envMap||Me,Te),Ye=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Qe=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ne=!!X.morphAttributes.position,mt=!!X.morphAttributes.normal,Ut=!!X.morphAttributes.color;let Lt=Jn;H.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Lt=R.toneMapping);const xt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,$t=xt!==void 0?xt.length:0,_e=V.get(H),un=b.state.lights;if(se===!0&&(Ae===!0||T!==ne)){const Mt=T===ne&&H.id===J;Ee.setState(H,T,Mt)}let lt=!1;H.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==un.state.version||_e.outputColorSpace!==me||G.isBatchedMesh&&_e.batching===!1||!G.isBatchedMesh&&_e.batching===!0||G.isBatchedMesh&&_e.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&_e.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&_e.instancing===!1||!G.isInstancedMesh&&_e.instancing===!0||G.isSkinnedMesh&&_e.skinning===!1||!G.isSkinnedMesh&&_e.skinning===!0||G.isInstancedMesh&&_e.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_e.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_e.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_e.instancingMorph===!1&&G.morphTexture!==null||_e.envMap!==Ie||H.fog===!0&&_e.fog!==ge||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ee.numPlanes||_e.numIntersection!==Ee.numIntersection)||_e.vertexAlphas!==Ye||_e.vertexTangents!==Qe||_e.morphTargets!==Ne||_e.morphNormals!==mt||_e.morphColors!==Ut||_e.toneMapping!==Lt||_e.morphTargetsCount!==$t||!!_e.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,_e.__version=H.version);let _n=_e.currentProgram;lt===!0&&(_n=Rs(H,z,G),D&&H.isNodeMaterial&&D.onUpdateProgram(H,_n,_e));let Wn=!1,_i=!1,er=!1;const vt=_n.getUniforms(),zt=_e.uniforms;if(M.useProgram(_n.program)&&(Wn=!0,_i=!0,er=!0),H.id!==J&&(J=H.id,_i=!0),_e.needsLights){const Mt=sp(b.state.lightProbeGridArray,G);_e.lightProbeGrid!==Mt&&(_e.lightProbeGrid=Mt,_i=!0)}if(Wn||ne!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),vt.setValue(L,"projectionMatrix",T.projectionMatrix),vt.setValue(L,"viewMatrix",T.matrixWorldInverse);const Si=vt.map.cameraPosition;Si!==void 0&&Si.setValue(L,dt.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&vt.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&vt.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),ne!==T&&(ne=T,_i=!0,er=!0)}if(_e.needsLights&&(un.state.directionalShadowMap.length>0&&vt.setValue(L,"directionalShadowMap",un.state.directionalShadowMap,Z),un.state.spotShadowMap.length>0&&vt.setValue(L,"spotShadowMap",un.state.spotShadowMap,Z),un.state.pointShadowMap.length>0&&vt.setValue(L,"pointShadowMap",un.state.pointShadowMap,Z)),G.isSkinnedMesh){vt.setOptional(L,G,"bindMatrix"),vt.setOptional(L,G,"bindMatrixInverse");const Mt=G.skeleton;Mt&&(Mt.boneTexture===null&&Mt.computeBoneTexture(),vt.setValue(L,"boneTexture",Mt.boneTexture,Z))}G.isBatchedMesh&&(vt.setOptional(L,G,"batchingTexture"),vt.setValue(L,"batchingTexture",G._matricesTexture,Z),vt.setOptional(L,G,"batchingIdTexture"),vt.setValue(L,"batchingIdTexture",G._indirectTexture,Z),vt.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&vt.setValue(L,"batchingColorTexture",G._colorsTexture,Z));const Mi=X.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&N.update(G,X,_n),(_i||_e.receiveShadow!==G.receiveShadow)&&(_e.receiveShadow=G.receiveShadow,vt.setValue(L,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&z.environment!==null&&(zt.envMapIntensity.value=z.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=Yy()),_i){if(vt.setValue(L,"toneMappingExposure",R.toneMappingExposure),_e.needsLights&&op(zt,er),ge&&H.fog===!0&&Re.refreshFogUniforms(zt,ge),Re.refreshMaterialUniforms(zt,H,ee,ie,b.state.transmissionRenderTarget[T.id]),_e.needsLights&&_e.lightProbeGrid){const Mt=_e.lightProbeGrid;zt.probesSH.value=Mt.texture,zt.probesMin.value.copy(Mt.boundingBox.min),zt.probesMax.value.copy(Mt.boundingBox.max),zt.probesResolution.value.copy(Mt.resolution)}Ra.upload(L,yd(_e),zt,Z)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ra.upload(L,yd(_e),zt,Z),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&vt.setValue(L,"center",G.center),vt.setValue(L,"modelViewMatrix",G.modelViewMatrix),vt.setValue(L,"normalMatrix",G.normalMatrix),vt.setValue(L,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const Mt=H.uniformsGroups;for(let Si=0,tr=Mt.length;Si<tr;Si++){const Md=Mt[Si];te.update(Md,_n),te.bind(Md,_n)}}return _n}function op(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function lp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(T,z,X){const H=V.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=z,V.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){const X=V.get(T);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,X=0){q=T,W=z,k=X;let H=null,G=!1,ge=!1;if(T){const me=V.get(T);if(me.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(L.FRAMEBUFFER,me.__webglFramebuffer),ae.copy(T.viewport),le.copy(T.scissor),Ge=T.scissorTest,M.viewport(ae),M.scissor(le),M.setScissorTest(Ge),J=-1;return}else if(me.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(me.__hasExternalTextures)Z.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ye=T.depthTexture;if(me.__boundDepthTexture!==Ye){if(Ye!==null&&V.has(Ye)&&(T.width!==Ye.image.width||T.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ge=!0);const Ie=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ie[z])?H=Ie[z][X]:H=Ie[z],G=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?H=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Ie)?H=Ie[X]:H=Ie,ae.copy(T.viewport),le.copy(T.scissor),Ge=T.scissorTest}else ae.copy(ve).multiplyScalar(ee).floor(),le.copy(gt).multiplyScalar(ee).floor(),Ge=qe;if(X!==0&&(H=O),M.bindFramebuffer(L.FRAMEBUFFER,H)&&M.drawBuffers(T,H),M.viewport(ae),M.scissor(le),M.setScissorTest(Ge),G){const me=V.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,me.__webglTexture,X)}else if(ge){const me=z;for(let Te=0;Te<T.textures.length;Te++){const Ie=V.get(T.textures[Te]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Te,Ie.__webglTexture,X,me)}}else if(T!==null&&X!==0){const me=V.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,me.__webglTexture,X)}J=-1},this.readRenderTargetPixels=function(T,z,X,H,G,ge,Me,me=0){if(!(T&&T.isWebGLRenderTarget)){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){M.bindFramebuffer(L.FRAMEBUFFER,Te);try{const Ie=T.textures[me],Ye=Ie.format,Qe=Ie.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(Ye)){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Qe)){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-H&&X>=0&&X<=T.height-G&&L.readPixels(z,X,H,G,fe.convert(Ye),fe.convert(Qe),ge)}finally{const Ie=q!==null?V.get(q).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(T,z,X,H,G,ge,Me,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te)if(z>=0&&z<=T.width-H&&X>=0&&X<=T.height-G){M.bindFramebuffer(L.FRAMEBUFFER,Te);const Ie=T.textures[me],Ye=Ie.format,Qe=Ie.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+me),!C.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ne),L.bufferData(L.PIXEL_PACK_BUFFER,ge.byteLength,L.STREAM_READ),L.readPixels(z,X,H,G,fe.convert(Ye),fe.convert(Qe),0);const mt=q!==null?V.get(q).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,mt);const Ut=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ym(L,Ut,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ne),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ge),L.deleteBuffer(Ne),L.deleteSync(Ut),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,X=0){const H=Math.pow(2,-X),G=Math.floor(T.image.width*H),ge=Math.floor(T.image.height*H),Me=z!==null?z.x:0,me=z!==null?z.y:0;Z.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Me,me,G,ge),M.unbindTexture()},this.copyTextureToTexture=function(T,z,X=null,H=null,G=0,ge=0){let Me,me,Te,Ie,Ye,Qe,Ne,mt,Ut;const Lt=T.isCompressedTexture?T.mipmaps[ge]:T.image;if(X!==null)Me=X.max.x-X.min.x,me=X.max.y-X.min.y,Te=X.isBox3?X.max.z-X.min.z:1,Ie=X.min.x,Ye=X.min.y,Qe=X.isBox3?X.min.z:0;else{const zt=Math.pow(2,-G);Me=Math.floor(Lt.width*zt),me=Math.floor(Lt.height*zt),T.isDataArrayTexture?Te=Lt.depth:T.isData3DTexture?Te=Math.floor(Lt.depth*zt):Te=1,Ie=0,Ye=0,Qe=0}H!==null?(Ne=H.x,mt=H.y,Ut=H.z):(Ne=0,mt=0,Ut=0);const xt=fe.convert(z.format),$t=fe.convert(z.type);let _e;z.isData3DTexture?(Z.setTexture3D(z,0),_e=L.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Z.setTexture2DArray(z,0),_e=L.TEXTURE_2D_ARRAY):(Z.setTexture2D(z,0),_e=L.TEXTURE_2D),M.activeTexture(L.TEXTURE0),M.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),M.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),M.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);const un=M.getParameter(L.UNPACK_ROW_LENGTH),lt=M.getParameter(L.UNPACK_IMAGE_HEIGHT),_n=M.getParameter(L.UNPACK_SKIP_PIXELS),Wn=M.getParameter(L.UNPACK_SKIP_ROWS),_i=M.getParameter(L.UNPACK_SKIP_IMAGES);M.pixelStorei(L.UNPACK_ROW_LENGTH,Lt.width),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Lt.height),M.pixelStorei(L.UNPACK_SKIP_PIXELS,Ie),M.pixelStorei(L.UNPACK_SKIP_ROWS,Ye),M.pixelStorei(L.UNPACK_SKIP_IMAGES,Qe);const er=T.isDataArrayTexture||T.isData3DTexture,vt=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){const zt=V.get(T),Mi=V.get(z),Mt=V.get(zt.__renderTarget),Si=V.get(Mi.__renderTarget);M.bindFramebuffer(L.READ_FRAMEBUFFER,Mt.__webglFramebuffer),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let tr=0;tr<Te;tr++)er&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(T).__webglTexture,G,Qe+tr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(z).__webglTexture,ge,Ut+tr)),L.blitFramebuffer(Ie,Ye,Me,me,Ne,mt,Me,me,L.DEPTH_BUFFER_BIT,L.NEAREST);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||V.has(T)){const zt=V.get(T),Mi=V.get(z);M.bindFramebuffer(L.READ_FRAMEBUFFER,B),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,U);for(let Mt=0;Mt<Te;Mt++)er?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zt.__webglTexture,G,Qe+Mt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zt.__webglTexture,G),vt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Mi.__webglTexture,ge,Ut+Mt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Mi.__webglTexture,ge),G!==0?L.blitFramebuffer(Ie,Ye,Me,me,Ne,mt,Me,me,L.COLOR_BUFFER_BIT,L.NEAREST):vt?L.copyTexSubImage3D(_e,ge,Ne,mt,Ut+Mt,Ie,Ye,Me,me):L.copyTexSubImage2D(_e,ge,Ne,mt,Ie,Ye,Me,me);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else vt?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(_e,ge,Ne,mt,Ut,Me,me,Te,xt,$t,Lt.data):z.isCompressedArrayTexture?L.compressedTexSubImage3D(_e,ge,Ne,mt,Ut,Me,me,Te,xt,Lt.data):L.texSubImage3D(_e,ge,Ne,mt,Ut,Me,me,Te,xt,$t,Lt):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ge,Ne,mt,Me,me,xt,$t,Lt.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ge,Ne,mt,Lt.width,Lt.height,xt,Lt.data):L.texSubImage2D(L.TEXTURE_2D,ge,Ne,mt,Me,me,xt,$t,Lt);M.pixelStorei(L.UNPACK_ROW_LENGTH,un),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,lt),M.pixelStorei(L.UNPACK_SKIP_PIXELS,_n),M.pixelStorei(L.UNPACK_SKIP_ROWS,Wn),M.pixelStorei(L.UNPACK_SKIP_IMAGES,_i),ge===0&&z.generateMipmaps&&L.generateMipmap(_e),M.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){W=0,k=0,q=null,M.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}class Ky extends of{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new cn;e.deleteAttribute("uv");const t=new ft({side:ln}),i=new ft,r=new Ms(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new Ue(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new ss(e,i,6),o=new At;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new Ue(e,yr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new Ue(e,yr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const d=new Ue(e,yr(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const h=new Ue(e,yr(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);const u=new Ue(e,yr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const p=new Ue(e,yr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function yr(n){return new B0({color:0,emissive:16777215,emissiveIntensity:n})}const Zo=16,Ko=64,Ef=1024*32,Yu=Ef,Tf=Object.freeze({width:Zo,height:Zo,depth:Zo});function Gc(n){return n.width*n.height*n.depth}function Wc(n){if(typeof n!="object"||n===null||!("width"in n)||!("height"in n)||!("depth"in n))return!1;const e=n;return Number.isInteger(e.width)&&Number.isInteger(e.height)&&Number.isInteger(e.depth)&&(e.width??0)>0&&(e.height??0)>0&&(e.depth??0)>0&&(e.width??Number.POSITIVE_INFINITY)<=Ko&&(e.height??Number.POSITIVE_INFINITY)<=Ko&&(e.depth??Number.POSITIVE_INFINITY)<=Ko&&Gc(e)<=Ef}const jy=[{x:1,y:0,z:0},{x:-1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:1},{x:0,y:0,z:-1}],Jy=new Set(["matte","metal","emissive"]);function sc(n){return`${n.x},${n.y},${n.z}`}function Qy(n){return Number.isInteger(n.x)&&Number.isInteger(n.y)&&Number.isInteger(n.z)}function Af(n,e){return Qy(n)&&n.x>=0&&n.x<e.width&&n.y>=0&&n.y<e.height&&n.z>=0&&n.z<e.depth}function jr(n,e,t){return n??e??t}function $y(n,e){const t=new Set;return n.palette.forEach((i,r)=>{const s=`palette[${r}]`;i.id.trim().length===0?e.push({code:"palette",path:`${s}.id`,message:"Palette ids must not be empty."}):t.has(i.id)&&e.push({code:"palette",path:`${s}.id`,message:`Palette id "${i.id}" is duplicated.`}),t.add(i.id),(!Number.isInteger(i.color)||i.color<0||i.color>16777215)&&e.push({code:"palette",path:`${s}.color`,message:"Palette colors must be integers from 0x000000 to 0xFFFFFF."}),i.materialRole!==void 0&&!Jy.has(i.materialRole)&&e.push({code:"palette",path:`${s}.materialRole`,message:'Palette material roles must be "matte", "metal", or "emissive".'})}),t}function e2(n,e,t,i){const r=new Map;return n.voxels.forEach((s,a)=>{const o=`voxels[${a}]`;if(e===null||!Af(s,e)){i.push({code:"voxel-bounds",path:o,message:e===null?"Voxel coordinates require valid recipe dimensions.":`Voxel coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`});return}t.has(s.paletteId)||i.push({code:"palette",path:`${o}.paletteId`,message:`Voxel references unknown palette id "${s.paletteId}".`});const c=sc(s);if(r.has(c)){i.push({code:"duplicate-voxel",path:o,message:`More than one voxel occupies (${c}).`});return}r.set(c,s)}),r}function t2(n,e,t,i){const r=new Set;n.anchors.forEach((s,a)=>{const o=`anchors[${a}]`;(s.id.trim().length===0||r.has(s.id))&&i.push({code:"duplicate-anchor",path:`${o}.id`,message:s.id.trim().length===0?"Anchor ids must not be empty.":`Anchor id "${s.id}" is duplicated.`}),r.add(s.id),(e===null||!Af(s,e))&&i.push({code:"anchor-bounds",path:o,message:e===null?"Anchor coordinates require valid recipe dimensions.":`Anchor coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`})});for(const s of new Set(t))r.has(s)||i.push({code:"required-anchor",path:"anchors",message:`Required anchor "${s}" is missing.`})}function n2(n){const e=n.values().next().value;if(e===void 0)return!0;const t=new Set,i=[e];t.add(sc(e));for(let r=0;r<i.length;r+=1){const s=i[r];if(s!==void 0)for(const a of jy){const o=sc({x:s.x+a.x,y:s.y+a.y,z:s.z+a.z}),c=n.get(o);c!==void 0&&!t.has(o)&&(t.add(o),i.push(c))}}return t.size===n.size}function i2(n,e={}){const t=[];n.schemaVersion!==2&&t.push({code:"schema-version",path:"schemaVersion",message:`Voxel recipe schema version ${String(n.schemaVersion)} is unsupported; expected version 2.`});const i=Wc(n.dimensions);i||t.push({code:"grid-dimensions",path:"dimensions",message:"Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells."});const r=i?n.dimensions:null,s=r===null?0:Gc(r),a=jr(e.minVoxelCount,n.validation?.minVoxelCount,1),o=jr(e.maxVoxelCount,n.validation?.maxVoxelCount,s);(!Number.isInteger(a)||!Number.isInteger(o)||a<0||o>Yu||o>s||a>o||n.voxels.length<a||n.voxels.length>o)&&t.push({code:"voxel-count",path:"voxels",message:`Voxel count ${n.voxels.length} must be between ${a} and ${o}; the grid contains ${s} cells and the absolute cap is ${Yu}.`});const c=$y(n,t),l=e2(n,r,c,t);jr(e.requireGroundContact,n.validation?.requireGroundContact,!0)&&![...l.values()].some(p=>p.y===0)&&t.push({code:"ground-contact",path:"voxels",message:"At least one voxel must touch the y=0 ground plane."}),jr(e.requireConnectedBody,n.validation?.requireConnectedBody,!0)&&!n2(l)&&t.push({code:"connected-body",path:"voxels",message:"All voxels must form one six-directionally connected body."});const u=jr(e.requiredAnchors,n.validation?.requiredAnchors,[]);return t2(n,r,u,t),{valid:t.length===0,issues:t,voxelCount:n.voxels.length,uniqueVoxelCount:l.size}}class r2 extends Error{result;constructor(e,t){const i=t.issues.map(r=>`${r.path}: ${r.message}`).join("; ");super(`Invalid voxel recipe "${e}": ${i}`),this.name="VoxelRecipeValidationError",this.result=t}}function Xc(n,e={}){const t=i2(n,e);if(!t.valid)throw new r2(n.id,t)}const bs=0;function ms(n,e,t,i){return Wc(n)&&Number.isInteger(e)&&Number.isInteger(t)&&Number.isInteger(i)&&e>=0&&e<n.width&&t>=0&&t<n.height&&i>=0&&i<n.depth}function Rf(n,e,t,i){if(!ms(n,e,t,i))throw new RangeError(`Voxel coordinate (${e}, ${t}, ${i}) is outside the ${n.width}×${n.height}×${n.depth} grid.`);return e+n.width*(i+n.depth*t)}function s2(n){if(n.length>65535)throw new RangeError("A voxel palette cannot contain more than 65,535 entries.");const e=new Map;return n.forEach((t,i)=>{if(t.id.trim().length===0)throw new TypeError("Voxel palette ids must not be empty.");if(e.has(t.id))throw new TypeError(`Duplicate voxel palette id "${t.id}".`);if(!Number.isInteger(t.color)||t.color<0||t.color>16777215)throw new TypeError(`Voxel palette color for "${t.id}" must be an integer from 0x000000 to 0xFFFFFF.`);e.set(t.id,i+1)}),e}function qc(n,e={}){const t=e.dimensions??Tf;if(!Wc(t))throw new RangeError("Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells.");return{dimensions:{...t},cells:new Uint16Array(Gc(t)),palette:n,paletteIndexById:s2(n),anchors:e.anchors??[],...e.recipeId===void 0?{}:{recipeId:e.recipeId}}}function Yc(n,e,t,i){return n.cells[Rf(n.dimensions,e,t,i)]??bs}function bt(n,e,t,i,r){const s=Rf(n.dimensions,e,t,i);if(r===null){n.cells[s]=bs;return}const a=n.paletteIndexById.get(r);if(a===void 0)throw new TypeError(`Unknown voxel palette id "${r}".`);n.cells[s]=a}function a2(n,e,t){bt(n,e.x,e.y,e.z,t)}function Y(n,e,t,i){if(!ms(n.dimensions,e.x,e.y,e.z)||!ms(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel box endpoints must both be inside the grid.");const r=Math.min(e.x,t.x),s=Math.max(e.x,t.x),a=Math.min(e.y,t.y),o=Math.max(e.y,t.y),c=Math.min(e.z,t.z),l=Math.max(e.z,t.z);for(let d=a;d<=o;d+=1)for(let h=c;h<=l;h+=1)for(let u=r;u<=s;u+=1)bt(n,u,d,h,i)}function Ki(n,e,t,i){if(!ms(n.dimensions,e.x,e.y,e.z)||!ms(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel line endpoints must both be inside the grid.");const r=t.x-e.x,s=t.y-e.y,a=t.z-e.z,o=Math.max(Math.abs(r),Math.abs(s),Math.abs(a));if(o===0){a2(n,e,i);return}for(let c=0;c<=o;c+=1){const l=c/o;bt(n,Math.round(e.x+r*l),Math.round(e.y+s*l),Math.round(e.z+a*l),i)}}function Cf(n){const e=[];for(let t=0;t<n.dimensions.height;t+=1)for(let i=0;i<n.dimensions.depth;i+=1)for(let r=0;r<n.dimensions.width;r+=1){const s=Yc(n,r,t,i);if(s===bs)continue;const a=n.palette[s-1];if(a===void 0)throw new TypeError(`Grid cell (${r}, ${t}, ${i}) contains invalid palette index ${s}.`);e.push({x:r,y:t,z:i,paletteId:a.id})}return e}function o2(n,e={}){(e.validate??!0)&&Xc(n);const t=qc(n.palette,{dimensions:n.dimensions,anchors:n.anchors,recipeId:n.id});for(const i of n.voxels)bt(t,i.x,i.y,i.z,i.paletteId);return t}const l2=[{name:"positive-x",neighbor:[1,0,0],normal:[1,0,0],vertices:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],shade:.82},{name:"negative-x",neighbor:[-1,0,0],normal:[-1,0,0],vertices:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],shade:.68},{name:"positive-y",neighbor:[0,1,0],normal:[0,1,0],vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{name:"negative-y",neighbor:[0,-1,0],normal:[0,-1,0],vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.55},{name:"positive-z",neighbor:[0,0,1],normal:[0,0,1],vertices:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],shade:.9},{name:"negative-z",neighbor:[0,0,-1],normal:[0,0,-1],vertices:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],shade:.74}],c2=["matte","metal","emissive"];function jo(n){return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}function d2(n){return[jo((n>>16&255)/255),jo((n>>8&255)/255),jo((n&255)/255)]}function u2(n,e,t,i){return e<0||e>=n.dimensions.width||t<0||t>=n.dimensions.height||i<0||i>=n.dimensions.depth?!1:Yc(n,e,t,i)!==bs}function h2(n){const e=n.voxelSize??1,t=n.origin??{x:0,y:0,z:0};if(!Number.isFinite(e)||e<=0)throw new RangeError("Voxel size must be a positive finite number.");if(!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(t.z))throw new RangeError("Voxel mesh origin coordinates must be finite.");for(const i of Object.values(n.faceShades??{}))if(i!==void 0&&(!Number.isFinite(i)||i<0))throw new RangeError("Voxel face shades must be finite non-negative numbers.");return{voxelSize:e,origin:t,shadeFaces:n.shadeFaces??!0}}function f2(n,e={}){const t=h2(e),i=[],r=[],s=[],a={matte:[],metal:[],emissive:[]};let o=0,c=0,l=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,h=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,p=Number.NEGATIVE_INFINITY,g=Number.NEGATIVE_INFINITY;for(let x=0;x<n.dimensions.height;x+=1)for(let S=0;S<n.dimensions.depth;S+=1)for(let y=0;y<n.dimensions.width;y+=1){const E=Yc(n,y,x,S);if(E===bs)continue;o+=1;const b=n.palette[E-1];if(b===void 0)throw new TypeError(`Grid cell (${y}, ${x}, ${S}) contains invalid palette index ${E}.`);const[A,_,w]=d2(b.color);for(const R of l2){const[P,D,O]=R.neighbor;if(u2(n,y+P,x+D,S+O))continue;const B=i.length/3,U=t.shadeFaces?e.faceShades?.[R.name]??R.shade:1;for(const k of R.vertices){const q=t.origin.x+(y+k[0])*t.voxelSize,J=t.origin.y+(x+k[1])*t.voxelSize,ne=t.origin.z+(S+k[2])*t.voxelSize;i.push(q,J,ne),r.push(...R.normal),s.push(Math.min(1,A*U),Math.min(1,_*U),Math.min(1,w*U)),l=Math.min(l,q),d=Math.min(d,J),h=Math.min(h,ne),u=Math.max(u,q),p=Math.max(p,J),g=Math.max(g,ne)}const W=b.materialRole??"matte";a[W].push(B,B+1,B+2,B,B+2,B+3),c+=1}}const v=[],m=[];for(const x of c2){const S=a[x];S.length!==0&&(m.push({role:x,start:v.length,count:S.length}),v.push(...S))}const f=i.length/3;return{positions:new Float32Array(i),normals:new Float32Array(r),colors:new Float32Array(s),indices:new Uint32Array(v),voxelCount:o,faceCount:c,vertexCount:f,triangleCount:v.length/3,materialGroups:m,bounds:f===0?null:{min:[l,d,h],max:[u,p,g]}}}function Pf(n,e={}){return f2(o2(n),e)}function to(n,e,t=1){if(!Number.isFinite(t)||t<=0)throw new RangeError("Voxel size must be a positive finite number.");const i=n.anchors.find(r=>r.id===e);if(i===void 0)throw new RangeError(`Voxel recipe "${n.id}" has no anchor named "${e}".`);return{x:(i.x+.5-n.dimensions.width/2)*t,y:(i.y+.5)*t,z:(i.z+.5-n.dimensions.depth/2)*t}}const Df=10900280,If=5628380,Lf=Object.freeze({width:24,height:32,depth:16}),no=2.25;Lf.height*no;const p2=2e3,Nf=Object.freeze({width:20,height:20,depth:18}),Uf=2.1;Nf.height*Uf;const m2=1200,g2=[{id:"ink",color:2107434,label:"Deep silhouette",materialRole:"matte"},{id:"hair",color:3420214,label:"Weathered dark hair",materialRole:"matte"},{id:"skin",color:13211253,label:"Sun-warmed skin",materialRole:"matte"},{id:"cloth-dark",color:2704454,label:"Deep field cloth",materialRole:"matte"},{id:"cloth-sage",color:6322800,label:"Faded survey coat",materialRole:"matte"},{id:"pack-pale",color:13553085,label:"Bleached field pack",materialRole:"matte"},{id:"rust",color:Df,label:"Rust repair hardware",materialRole:"metal"},{id:"steel",color:7965576,label:"Dull survey steel",materialRole:"metal"},{id:"cyan",color:If,label:"Live survey signal",materialRole:"emissive"},{id:"amber",color:15774538,label:"Relic warning light",materialRole:"emissive"}],x2=[{id:"shell-light",color:14342087,label:"Light ceramic cage",materialRole:"matte"},{id:"shell-shadow",color:10398367,label:"Ceramic edge shade",materialRole:"matte"},{id:"inner",color:2107948,label:"Hollow lantern interior",materialRole:"matte"},{id:"steel",color:7438975,label:"Tripod steel",materialRole:"metal"},{id:"rust",color:Df,label:"Rust repair hardware",materialRole:"metal"},{id:"cyan",color:If,label:"Survey sensor",materialRole:"emissive"},{id:"amber",color:15774538,label:"Lantern status light",materialRole:"emissive"}];function zf(n){const e=qc(n.palette,{dimensions:n.dimensions});n.author(e);const t={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:Cf(e),anchors:n.anchors,validation:{minVoxelCount:1,maxVoxelCount:n.maxVoxelCount,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return Xc(t),t}function v2(n){Y(n,{x:5,y:0,z:4},{x:9,y:2,z:7},"ink"),Y(n,{x:14,y:0,z:5},{x:18,y:2,z:8},"ink"),Y(n,{x:5,y:0,z:3},{x:9,y:0,z:8},"steel"),Y(n,{x:14,y:0,z:4},{x:18,y:0,z:9},"steel"),Y(n,{x:6,y:2,z:5},{x:9,y:3,z:7},"rust"),Y(n,{x:14,y:2,z:6},{x:17,y:3,z:8},"rust"),Y(n,{x:7,y:3,z:6},{x:9,y:11,z:7},"cloth-dark"),Y(n,{x:14,y:3,z:6},{x:16,y:11,z:7},"cloth-dark"),Y(n,{x:7,y:7,z:5},{x:9,y:8,z:6},"steel"),Y(n,{x:14,y:8,z:5},{x:16,y:9,z:6},"steel"),Y(n,{x:7,y:10,z:8},{x:10,y:14,z:10},"cloth-sage"),Y(n,{x:13,y:11,z:8},{x:16,y:14,z:10},"cloth-sage"),Y(n,{x:7,y:10,z:10},{x:9,y:12,z:11},"cloth-dark"),Y(n,{x:14,y:11,z:10},{x:16,y:13,z:11},"cloth-dark"),Y(n,{x:8,y:13,z:6},{x:16,y:16,z:9},"cloth-dark"),Y(n,{x:9,y:16,z:6},{x:15,y:21,z:9},"cloth-sage"),Y(n,{x:9,y:16,z:5},{x:10,y:21,z:5},"cloth-dark"),Y(n,{x:14,y:16,z:5},{x:15,y:21,z:5},"cloth-dark"),Y(n,{x:8,y:22,z:6},{x:16,y:23,z:9},"cloth-dark"),Y(n,{x:8,y:22,z:5},{x:16,y:23,z:6},"pack-pale"),Y(n,{x:5,y:20,z:6},{x:8,y:22,z:9},"cloth-dark"),Y(n,{x:4,y:17,z:6},{x:6,y:20,z:8},"cloth-sage"),Y(n,{x:3,y:14,z:4},{x:5,y:18,z:7},"cloth-dark"),Y(n,{x:2,y:13,z:3},{x:4,y:15,z:6},"skin"),Y(n,{x:16,y:20,z:6},{x:18,y:22,z:9},"cloth-dark"),Y(n,{x:17,y:17,z:5},{x:19,y:20,z:8},"cloth-sage"),Y(n,{x:18,y:14,z:4},{x:20,y:18,z:7},"steel"),Y(n,{x:19,y:13,z:3},{x:21,y:15,z:6},"skin"),Y(n,{x:20,y:13,z:3},{x:21,y:14,z:5},"ink"),Y(n,{x:10,y:16,z:10},{x:15,y:22,z:11},"pack-pale"),Y(n,{x:11,y:17,z:13},{x:14,y:21,z:13},"cloth-dark"),Y(n,{x:10,y:16,z:12},{x:10,y:22,z:13},"steel"),Y(n,{x:14,y:16,z:12},{x:15,y:22,z:13},"rust"),Y(n,{x:5,y:21,z:9},{x:6,y:27,z:10},"steel"),Y(n,{x:6,y:26,z:9},{x:8,y:27,z:10},"steel"),Y(n,{x:6,y:21,z:9},{x:8,y:22,z:10},"rust"),bt(n,5,27,9,"cyan"),bt(n,5,27,10,"amber"),Y(n,{x:10,y:22,z:7},{x:13,y:24,z:9},"skin"),Y(n,{x:9,y:24,z:5},{x:14,y:29,z:9},"skin"),Y(n,{x:8,y:29,z:5},{x:15,y:31,z:10},"hair"),Y(n,{x:8,y:27,z:9},{x:10,y:30,z:11},"hair"),Y(n,{x:14,y:27,z:9},{x:16,y:30,z:10},"hair"),Y(n,{x:9,y:29,z:4},{x:11,y:30,z:5},"hair"),Y(n,{x:14,y:28,z:4},{x:15,y:30,z:5},"hair"),bt(n,10,27,4,"cyan"),bt(n,13,27,4,"cyan"),Y(n,{x:11,y:25,z:4},{x:12,y:25,z:5},"rust"),Y(n,{x:7,y:23,z:7},{x:16,y:24,z:9},"rust"),Y(n,{x:16,y:23,z:8},{x:18,y:25,z:9},"rust"),Y(n,{x:18,y:21,z:9},{x:19,y:24,z:10},"pack-pale"),Ki(n,{x:8,y:22,z:4},{x:15,y:15,z:4},"rust"),Ki(n,{x:9,y:22,z:4},{x:16,y:15,z:4},"rust"),Y(n,{x:10,y:18,z:4},{x:11,y:20,z:5},"cyan"),Y(n,{x:12,y:18,z:4},{x:13,y:20,z:5},"amber")}function y2(n){Y(n,{x:3,y:0,z:3},{x:6,y:0,z:6},"steel"),Y(n,{x:13,y:0,z:3},{x:16,y:0,z:6},"steel"),Y(n,{x:8,y:0,z:13},{x:11,y:0,z:16},"steel"),Y(n,{x:4,y:1,z:4},{x:5,y:4,z:5},"rust"),Y(n,{x:14,y:1,z:4},{x:15,y:4,z:5},"rust"),Y(n,{x:9,y:1,z:14},{x:10,y:4,z:15},"rust"),Y(n,{x:5,y:4,z:5},{x:8,y:5,z:7},"steel"),Y(n,{x:11,y:4,z:5},{x:14,y:5,z:7},"steel"),Y(n,{x:8,y:4,z:11},{x:11,y:5,z:14},"steel"),Y(n,{x:7,y:5,z:7},{x:12,y:7,z:11},"inner"),Y(n,{x:8,y:8,z:7},{x:11,y:13,z:11},"inner"),Y(n,{x:5,y:8,z:6},{x:6,y:14,z:7},"shell-light"),Y(n,{x:13,y:8,z:6},{x:14,y:14,z:7},"shell-light"),Y(n,{x:5,y:8,z:12},{x:6,y:14,z:13},"shell-shadow"),Y(n,{x:13,y:8,z:12},{x:14,y:14,z:13},"shell-shadow"),Y(n,{x:7,y:7,z:6},{x:12,y:8,z:13},"shell-shadow"),Y(n,{x:7,y:14,z:6},{x:12,y:15,z:13},"shell-light"),Y(n,{x:6,y:9,z:13},{x:13,y:13,z:14},"shell-shadow");for(let e=8;e<=14;e+=1)for(let t=6;t<=13;t+=1){const i=Math.abs(t-9.5)+Math.abs(e-11);i>=2.5&&i<=4.5&&(bt(n,t,e,4,"shell-light"),bt(n,t,e,5,"shell-shadow"))}Y(n,{x:9,y:10,z:6},{x:10,y:12,z:6},"cyan"),bt(n,9,11,5,null),bt(n,10,11,5,null),Y(n,{x:9,y:15,z:9},{x:11,y:17,z:11},"steel"),Y(n,{x:11,y:16,z:9},{x:14,y:17,z:10},"rust"),Y(n,{x:13,y:17,z:9},{x:14,y:19,z:10},"steel"),Y(n,{x:12,y:19,z:8},{x:15,y:19,z:11},"cyan"),Y(n,{x:14,y:10,z:7},{x:16,y:12,z:9},"rust"),Y(n,{x:16,y:8,z:7},{x:17,y:11,z:8},"steel"),Y(n,{x:17,y:7,z:6},{x:18,y:8,z:9},"steel"),bt(n,18,7,6,"amber"),bt(n,18,7,9,"amber"),Y(n,{x:8,y:9,z:14},{x:11,y:13,z:15},"rust"),Y(n,{x:9,y:10,z:16},{x:10,y:12,z:16},"steel"),bt(n,9,9,16,"cyan"),bt(n,10,13,16,"amber")}const kr=zf({id:"player-relic-surveyor",name:"Relic Surveyor",kind:"player",dimensions:Lf,palette:g2,maxVoxelCount:p2,anchors:[{id:"ground",x:7,y:0,z:6},{id:"weapon",x:20,y:14,z:4},{id:"weapon-grip",x:20,y:14,z:4},{id:"free-hand",x:3,y:14,z:4},{id:"focus",x:11,y:19,z:4}],requiredAnchors:["ground","weapon","weapon-grip","free-hand","focus"],author:v2}),Zc=zf({id:"companion-survey-lantern",name:"Three-Foot Survey Lantern",kind:"companion",dimensions:Nf,palette:x2,maxVoxelCount:m2,anchors:[{id:"ground",x:4,y:0,z:4},{id:"sensor",x:9,y:11,z:6},{id:"mast",x:13,y:19,z:9},{id:"manipulator",x:17,y:8,z:7},{id:"rear-coil",x:9,y:10,z:16}],requiredAnchors:["ground","sensor","mast","manipulator","rear-coil"],author:y2}),Zu=[{id:"shadow",color:1515551,label:"Mineral shadow"},{id:"soil",color:4930866,label:"Dark soil"},{id:"bone",color:14207140,label:"Bone cloth"},{id:"rust",color:9981234,label:"Oxidized red"},{id:"cyan",color:5229524,label:"Signal cyan"},{id:"amber",color:14919242,label:"Warning amber"},{id:"cloth",color:3492425,label:"Field cloth"},{id:"steel",color:8359304,label:"Dull steel"},{id:"leaf-dark",color:2507566,label:"Dark foliage"},{id:"leaf",color:5206597,label:"Dry foliage"},{id:"wood",color:7359284,label:"Weathered wood"},{id:"violet",color:8546725,label:"Anomaly violet"}];function ti(n){const e=n.dimensions??Tf,t=qc(Zu,{dimensions:e});n.author(t);const i={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:e,palette:Zu,voxels:Cf(t),anchors:n.anchors,validation:{minVoxelCount:1,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return Xc(i),i}const io=ti({id:"weapon-signal-blade",name:"Signal Blade",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"tip",x:7,y:15,z:7}],requiredAnchors:["grip","tip"],author:n=>{Y(n,{x:7,y:0,z:7},{x:8,y:3,z:8},"bone"),Y(n,{x:6,y:0,z:7},{x:9,y:0,z:8},"rust"),Y(n,{x:5,y:4,z:7},{x:10,y:4,z:8},"rust"),Y(n,{x:7,y:5,z:7},{x:8,y:14,z:8},"steel"),Y(n,{x:7,y:6,z:7},{x:7,y:13,z:7},"cyan"),bt(n,7,15,7,"steel"),bt(n,8,15,8,"steel")}}),ro=ti({id:"weapon-impact-maul",name:"Impact Maul",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"impact",x:3,y:9,z:7}],requiredAnchors:["grip","impact"],author:n=>{Y(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),Y(n,{x:6,y:0,z:7},{x:9,y:1,z:8},"bone"),Y(n,{x:7,y:4,z:7},{x:8,y:5,z:8},"steel"),Y(n,{x:4,y:8,z:5},{x:11,y:12,z:10},"steel"),Y(n,{x:3,y:8,z:5},{x:4,y:12,z:10},"rust"),Y(n,{x:11,y:8,z:5},{x:12,y:12,z:10},"rust"),Y(n,{x:6,y:12,z:6},{x:9,y:12,z:9},"cyan")}}),Kc=ti({id:"scrap-hound",name:"Scrap Hound",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:3,z:7}],requiredAnchors:["ground","target"],author:n=>{Y(n,{x:5,y:2,z:5},{x:10,y:5,z:10},"rust"),Y(n,{x:6,y:3,z:5},{x:9,y:4,z:5},"shadow"),bt(n,6,4,5,"amber"),bt(n,9,4,5,"amber"),Y(n,{x:3,y:0,z:5},{x:4,y:2,z:6},"shadow"),Y(n,{x:11,y:0,z:5},{x:12,y:2,z:6},"shadow"),Y(n,{x:5,y:0,z:3},{x:6,y:2,z:4},"shadow"),Y(n,{x:9,y:0,z:11},{x:10,y:2,z:12},"shadow"),Ki(n,{x:6,y:5,z:2},{x:6,y:5,z:5},"steel"),Ki(n,{x:9,y:5,z:2},{x:9,y:5,z:5},"steel")}}),jc=ti({id:"relay-shell",name:"Relay Shell",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:7,z:7}],requiredAnchors:["ground","target"],author:n=>{Y(n,{x:4,y:0,z:5},{x:6,y:3,z:10},"shadow"),Y(n,{x:9,y:0,z:5},{x:11,y:3,z:10},"shadow"),Y(n,{x:3,y:2,z:4},{x:12,y:9,z:11},"rust"),Y(n,{x:3,y:5,z:4},{x:12,y:8,z:5},"steel"),Y(n,{x:5,y:9,z:5},{x:10,y:12,z:10},"bone"),Y(n,{x:6,y:10,z:5},{x:9,y:11,z:5},"shadow"),bt(n,6,11,5,"amber"),bt(n,9,11,5,"amber"),Ki(n,{x:5,y:12,z:7},{x:5,y:14,z:7},"steel"),Ki(n,{x:10,y:12,z:7},{x:10,y:14,z:7},"steel")}}),Jc=ti({id:"murmur",name:"Murmur",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7}],requiredAnchors:["ground","target"],author:n=>{Y(n,{x:7,y:0,z:7},{x:8,y:5,z:8},"shadow"),Y(n,{x:5,y:5,z:5},{x:10,y:10,z:10},"violet"),Y(n,{x:6,y:6,z:5},{x:9,y:9,z:5},"cyan"),Y(n,{x:3,y:7,z:7},{x:5,y:8,z:8},"steel"),Y(n,{x:10,y:7,z:7},{x:12,y:8,z:8},"steel"),Y(n,{x:7,y:11,z:7},{x:8,y:14,z:8},"cyan"),bt(n,7,15,7,"amber")}}),Qc=ti({id:"anomaly-orison",name:"Orison, the Listening Fault",kind:"named-anomaly",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7},{id:"interact",x:7,y:6,z:4}],requiredAnchors:["ground","target","interact"],author:n=>{Y(n,{x:3,y:0,z:5},{x:6,y:5,z:10},"shadow"),Y(n,{x:9,y:0,z:5},{x:12,y:5,z:10},"shadow"),Y(n,{x:3,y:4,z:4},{x:12,y:10,z:11},"violet"),Y(n,{x:1,y:6,z:6},{x:3,y:9,z:9},"steel"),Y(n,{x:12,y:6,z:6},{x:14,y:9,z:9},"steel"),Y(n,{x:5,y:10,z:5},{x:10,y:14,z:10},"bone"),Y(n,{x:5,y:11,z:5},{x:10,y:13,z:5},"shadow"),Y(n,{x:6,y:11,z:4},{x:9,y:12,z:5},"cyan"),bt(n,6,12,4,"amber"),bt(n,9,12,4,"amber"),Y(n,{x:6,y:15,z:6},{x:9,y:15,z:9},"steel"),Y(n,{x:6,y:7,z:3},{x:9,y:9,z:4},"cyan")}}),so=ti({id:"prop-dry-tree",name:"Dry Signal Tree",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{Y(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),Y(n,{x:4,y:0,z:7},{x:11,y:0,z:8},"wood"),Y(n,{x:7,y:0,z:4},{x:8,y:0,z:11},"wood"),Y(n,{x:4,y:7,z:7},{x:11,y:8,z:8},"wood"),Y(n,{x:7,y:7,z:4},{x:8,y:8,z:11},"wood"),Y(n,{x:3,y:9,z:4},{x:12,y:12,z:11},"leaf-dark"),Y(n,{x:5,y:13,z:5},{x:10,y:15,z:10},"leaf"),Y(n,{x:5,y:10,z:3},{x:10,y:11,z:12},"leaf"),bt(n,7,15,7,"cyan")}}),$c=ti({id:"prop-rift-rock",name:"Rift Rock",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{Y(n,{x:3,y:0,z:4},{x:12,y:2,z:11},"soil"),Y(n,{x:4,y:3,z:5},{x:11,y:5,z:10},"shadow"),Y(n,{x:6,y:6,z:6},{x:9,y:7,z:9},"steel"),Ki(n,{x:5,y:3,z:5},{x:8,y:6,z:5},"cyan")}}),ed=ti({id:"prop-field-chest",name:"Field Chest",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:4,z:4}],requiredAnchors:["ground","interact"],author:n=>{Y(n,{x:3,y:0,z:4},{x:12,y:5,z:11},"wood"),Y(n,{x:3,y:0,z:4},{x:4,y:7,z:11},"steel"),Y(n,{x:11,y:0,z:4},{x:12,y:7,z:11},"steel"),Y(n,{x:3,y:6,z:4},{x:12,y:7,z:11},"rust"),Y(n,{x:7,y:3,z:3},{x:8,y:5,z:4},"amber")}}),ws=ti({id:"prop-unclassified-relic",name:"Unclassified Relic",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:7,z:5},{id:"core",x:7,y:8,z:7}],requiredAnchors:["ground","interact","core"],author:n=>{Y(n,{x:5,y:0,z:5},{x:10,y:2,z:10},"soil"),Y(n,{x:7,y:3,z:7},{x:8,y:6,z:8},"steel"),Y(n,{x:5,y:6,z:5},{x:10,y:11,z:10},"violet"),Y(n,{x:6,y:7,z:5},{x:9,y:10,z:5},"cyan"),Y(n,{x:7,y:8,z:4},{x:8,y:9,z:5},"amber"),Y(n,{x:7,y:12,z:7},{x:8,y:14,z:8},"cyan")}}),_2=[kr,Zc,io,ro,Kc,jc,Jc,Qc,so,$c,ed,ws],M2=Object.freeze({blade:io,impact:ro}),S2=Object.freeze({"scrap-hound":Kc,"relay-shell":jc,murmur:Jc,"named-anomaly":Qc}),b2=Object.freeze({tree:so,rock:$c,chest:ed,relic:ws});Object.freeze({...Object.fromEntries(_2.map(n=>[n.id,n])),player:kr,companion:Zc,...M2,...S2,...b2,"dead-tree":so,"unclassified-relic":ws});const Ku=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],w2=[{id:"negative-z",corners:[0,3,2,1],normal:[0,0,-1]},{id:"positive-z",corners:[4,5,6,7],normal:[0,0,1]},{id:"negative-x",corners:[0,4,7,3],normal:[-1,0,0]},{id:"positive-x",corners:[1,2,6,5],normal:[1,0,0]},{id:"negative-y",corners:[0,1,5,4],normal:[0,-1,0]},{id:"positive-y",corners:[3,7,6,2],normal:[0,1,0]}],ju=[0,1,2,0,2,3];function ra(n,e){if(!n.every(Number.isFinite))throw new RangeError(`${e} must contain finite values.`)}function Ju(n,e,t){n.set(e).multiplyScalar(t),n.r=Rt.clamp(n.r,0,1),n.g=Rt.clamp(n.g,0,1),n.b=Rt.clamp(n.b,0,1)}function E2(n){return n.y>.55?1.04:n.y<-.55?.56:Rt.clamp(.75+n.x*.055+n.z*.09,.62,.9)}class He{positions=[];normals=[];colors=[];transformedCorners=Ku.map(()=>new I);matrix=new st;normalMatrix=new Ve;position=new I;scale=new I;quaternion=new Tn;euler=new yn;faceNormal=new I;color=new De;componentCount=0;get triangles(){return this.positions.length/9}get components(){return this.componentCount}addBox(e){if(ra(e.center,"Box center"),ra(e.size,"Box size"),e.size.some(r=>r<=0))throw new RangeError("Box size values must be greater than zero.");const t=e.rotation??[0,0,0];ra(t,"Box rotation");const i=e.shade??1;if(!Number.isFinite(i)||i<0)throw new RangeError("Box shade must be a finite non-negative value.");this.position.set(...e.center),this.scale.set(...e.size),this.euler.set(...t),this.quaternion.setFromEuler(this.euler),this.matrix.compose(this.position,this.quaternion,this.scale),this.normalMatrix.getNormalMatrix(this.matrix),Ku.forEach((r,s)=>{this.transformedCorners[s]?.set(...r).applyMatrix4(this.matrix)});for(const r of w2){this.faceNormal.set(...r.normal).applyMatrix3(this.normalMatrix).normalize();const s=i*E2(this.faceNormal)*(e.faceShades?.[r.id]??1);Ju(this.color,e.color,s);for(const a of ju){const o=this.transformedCorners[r.corners[a]];if(o===void 0)throw new Error("Invalid internal box face definition.");this.positions.push(o.x,o.y,o.z),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}}return this.componentCount+=1,this}addQuad(e){e.corners.forEach(o=>{ra(o,"Quad corner")});const t=e.shade??1;if(!Number.isFinite(t)||t<0)throw new RangeError("Quad shade must be a finite non-negative value.");const i=new I(...e.corners[0]),r=new I(...e.corners[1]),s=new I(...e.corners[2]);if(this.faceNormal.subVectors(r,i).cross(new I().subVectors(s,i)),this.faceNormal.lengthSq()<=Number.EPSILON)throw new RangeError("Quad corners must describe a non-zero surface.");this.faceNormal.normalize();const a=Array.isArray(e.color)?e.color:[e.color,e.color,e.color,e.color];for(const o of ju){const c=e.corners[o],l=a[o];if(c===void 0||l===void 0)throw new Error("Invalid internal quad definition.");Ju(this.color,l,t),this.positions.push(...c),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}return this.componentCount+=1,this}build(){const e=new Et;return e.setAttribute("position",new Xe(this.positions,3)),e.setAttribute("normal",new Xe(this.normals,3)),e.setAttribute("color",new Xe(this.colors,3)),e.computeBoundingBox(),e.computeBoundingSphere(),e.userData.componentCount=this.componentCount,e.userData.triangleCount=this.triangles,e}}const Qu=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),$u=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),T2=new I(1,0,0),sa=new I,aa=new I,eh=new Tn,oa=new yn,et={moss:[5209416,6130256,7706458,4157508],soil:[10057042,9004871,11174744,7888195],stone:[10986895,9607045,11973020,8358267],paleWall:[13157543,12171679,13749170,11449242],roof:[11034178,9653562,11955528,8342078],timber:[6834741,7820346,5193009,8872514],rust:[9130296,10641727,7097149,11630157],foliage:[4029256,5739343,7185747,3106626]};function Dt(n,e,t=0){return(Math.imul(Math.trunc(n)+61,73856093)^Math.imul(Math.trunc(e)+113,19349663)^Math.imul(Math.trunc(t)+185,83492791))>>>0}function ye(n,e=0){return(n>>>e&1023)/1023}function Nt(n,e){return n[e%n.length]??n[0]??16777215}function A2(n,e){const t=[],i=[];return n.forEach((r,s)=>{const a=n[Math.max(0,s-1)]??r,o=n[Math.min(n.length-1,s+1)]??r,c=o[0]-a[0],l=o[2]-a[2],d=Math.hypot(c,l)||1,h=(e[s]??e[0]??1)/2,u=-l/d*h,p=c/d*h;t.push([r[0]+u,r[1],r[2]+p]),i.push([r[0]-u,r[1],r[2]-p])}),{left:t,right:i}}function _r(n,e,t,i){if(e.length<2||e.length!==t.length)throw new RangeError("Ribbon points and widths must have equal length.");const r=A2(e,t);for(let s=0;s<e.length-1;s+=1){const a=r.left[s],o=r.left[s+1],c=r.right[s+1],l=r.right[s];if(a===void 0||o===void 0||c===void 0||l===void 0)continue;const d=i[s%i.length]??16777215,h=i[(s+1)%i.length]??d;n.addQuad({corners:[a,o,c,l],color:[d,h,h,d]})}}function Jo(n,e){return n.map(([t,i])=>[t,e,i])}function R2(n){const e=Jo([[24,930],[140,920],[275,908],[415,900],[555,902],[695,890],[824,876]],1.18),t=[132,124,114,108,116,124,136];_r(n,e.map(([s,,a])=>[s,1.05,a]),t.map(s=>s+22),[7297603,7954503,7034690]),_r(n,e,t,[10648661,9990478,11371867,9398603]);const i=Jo([[270,910],[265,850],[267,790],[267,716]],1.24);_r(n,i,[82,78,68,60],[10188370,10977625,9399372]);const r=Jo([[292,908],[290,970],[278,1025],[267,1091]],1.26);_r(n,r,[72,70,64,58],[9990736,10845782,9201737]),_r(n,e.map(([s,,a])=>[s,1.5,a-27]),t.map(()=>7),[7755327,6836029]),_r(n,e.map(([s,,a])=>[s,1.52,a+24]),t.map(()=>6),[7230014,8084290]);for(let s=0;s<74;s+=1){const a=Dt(s,41,13),o=s/73,c=45+o*752,l=925-o*46+(ye(a,5)-.5)*126,d=s%2===0?-1:1;n.addBox({center:[c,2.05+ye(a,17)*.4,l+d*(57+ye(a,12)*16)],size:[8+ye(a,2)*12,1.5+ye(a,20)*1.2,6+ye(a,9)*9],rotation:[0,ye(a,14)*Math.PI,0],color:Nt(et.stone,a),shade:.92})}}function Of(n,e,t=0){return n>130-t&&n<380+t&&e>570-t&&e<720+t||n>150-t&&n<380+t&&e>1090-t&&e<1220+t||n>320-t&&n<402+t&&e>790-t&&e<872+t}function C2(n){[{x:105,z:630,radius:58,count:13,palette:et.moss},{x:407,z:694,radius:56,count:18,palette:et.stone},{x:207,z:752,radius:52,count:13,palette:et.soil},{x:361,z:831,radius:72,count:17,palette:et.moss},{x:500,z:900,radius:92,count:15,palette:et.stone},{x:471,z:760,radius:44,count:9,palette:et.soil},{x:471,z:1040,radius:46,count:9,palette:et.moss},{x:258,z:1058,radius:54,count:12,palette:et.soil},{x:407,z:1202,radius:58,count:17,palette:et.stone},{x:126,z:1164,radius:54,count:12,palette:et.moss},{x:118,z:830,radius:68,count:12,palette:et.soil},{x:178,z:1004,radius:72,count:12,palette:et.moss},{x:652,z:801,radius:76,count:13,palette:et.soil},{x:704,z:977,radius:78,count:13,palette:et.moss}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=Dt(r,s,73),o=ye(a,3)*Math.PI*2+r*.37,c=Math.sqrt(ye(a,13))*i.radius,l=i.x+Math.cos(o)*c+(ye(a,19)-.5)*8,d=i.z+Math.sin(o)*c+(ye(a,7)-.5)*8;if(Of(l,d,10))continue;const h=r%3===0?et.soil:r%3===1?et.moss:et.stone,u=s%5===0?h:i.palette;n.addBox({center:[l,1.08+ye(a,21)*.24,d],size:[8+ye(a,5)*24,.75+ye(a,23)*.9,8+ye(a,15)*24],rotation:[0,o+ye(a,9)*.65,0],color:Nt(u,a>>>4),shade:.9+ye(a,18)*.14})}}),[[414,846],[446,838],[478,843],[511,839],[540,849],[427,874],[463,872],[501,875],[535,878],[409,911],[444,908],[482,913],[525,909],[555,913],[424,947],[460,944],[500,948],[538,942]].forEach(([i,r],s)=>{const a=Dt(s,i,r);n.addBox({center:[i,1.7,r],size:[18+ye(a,4)*9,1.8,13+ye(a,12)*8],rotation:[0,(ye(a,20)-.5)*.24,0],color:Nt(et.stone,a)})})}function wt(n,e,t,i,r,s=i){sa.set(t[0]-e[0],t[1]-e[1],t[2]-e[2]);const a=sa.length();a<=Number.EPSILON||(sa.multiplyScalar(1/a),eh.setFromUnitVectors(T2,sa),oa.setFromQuaternion(eh,"XYZ"),aa.set((e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2),n.addBox({center:[aa.x,aa.y,aa.z],size:[a,i,s],rotation:[oa.x,oa.y,oa.z],color:r}))}function Ca(n,e,t,i,r,s){const a=Math.ceil((t-e)/24),o=(t-e)/a;for(let c=0;c<a;c+=1){const l=Dt(c,s,19);n.addBox({center:[e+(c+.5)*o,r+(ye(l,13)-.5)*.8,i],size:[o-1.2,7+ye(l,5)*2,11+ye(l,18)*2],rotation:[0,(ye(l,9)-.5)*.035,0],color:Nt(et.stone,l)})}}function P2(n,e,t,i,r,s,a,o,c){n.addBox({center:[255,5,645],size:[250,10,150],color:7830896}),n.addBox({center:[255,14,578],size:[226,8,12],color:9277827});for(const v of[137,373])n.addBox({center:[v,14,645],size:[12,8,126],color:v===137?8752254:9737607});Ca(n,132,378,716,12,10),Ca(n,132,378,574,12,11),Ca(n,132,378,716,21,12);for(const v of[139,371])for(let m=0;m<6;m+=1){const f=Dt(v,m,101);n.addBox({center:[v,21+m*13,712],size:[16+ye(f,4)*2,12,18+ye(f,14)*2],rotation:[0,(ye(f,20)-.5)*.045,0],color:Nt(et.stone,f)})}e.addBox({center:[255,55,578],size:[226,76,10],color:12236960}),e.addBox({center:[137,55,645],size:[10,76,126],color:11645852}),[{z:596,y:55,d:30,h:76},{z:626,y:27,d:30,h:22},{z:626,y:78,d:30,h:24},{z:680,y:55,d:78,h:76}].forEach((v,m)=>{e.addBox({center:[373,v.y,v.z],size:[10,v.h,v.d],color:Nt(et.paleWall,Dt(m,81))})}),[{x:149,y:54,width:20,height:78},{x:178,y:24,width:38,height:20},{x:178,y:78,width:38,height:24},{x:220,y:54,width:44,height:78},{x:268,y:81,width:42,height:18},{x:305,y:54,width:30,height:78},{x:337,y:24,width:32,height:20},{x:337,y:78,width:32,height:24},{x:362,y:54,width:18,height:78}].forEach((v,m)=>{e.addBox({center:[v.x,v.y,712],size:[v.width,v.height,9],color:Nt(et.paleWall,Dt(m,91))})}),[[151,57,718,13,18,8885103],[213,35,718,15,20,10194285],[304,69,718,10,15,7702891],[359,32,718,9,16,9993825]].forEach(([v,m,f,x,S,y])=>{e.addBox({center:[v,m,f],size:[x,S,1.5],color:y,shade:.92})});const u=268;i.addBox({center:[u,40,707],size:[34,58,5],color:4601903});for(let v=0;v<4;v+=1)i.addBox({center:[u-12.5+v*8.3,40,710],size:[6.7,54,2],color:Nt(et.timber,Dt(v,140))});i.addBox({center:[u-22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[u+22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[u,74,714],size:[50,7,9],color:6638133}),r.addBox({center:[u+10,39,713.5],size:[3,4,3],color:12157516}),[{x:178,y:51,z:708,rotationY:0},{x:337,y:51,z:708,rotationY:0}].forEach((v,m)=>{(m===0?c:o).addBox({center:[v.x,v.y,v.z],size:[28,24,2],color:m===0?8829094:14792302}),i.addBox({center:[v.x,v.y-15,v.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[v.x,v.y+15,v.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[v.x-18,v.y,v.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[v.x+18,v.y,v.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[v.x,v.y,v.z+5],size:[3,28,3],color:6309687}),i.addBox({center:[v.x,v.y,v.z+5],size:[31,3,3],color:6309687})}),c.addBox({center:[369,51,626],size:[2,23,24],color:7974045}),i.addBox({center:[368,51,626],size:[4,3,29],color:5718579}),i.addBox({center:[368,51,626],size:[4,29,3],color:5718579}),Ff(t,i,{centerX:255,ridgeZ:645,wallTop:94,width:270,halfDepth:86,rise:34,columns:17,rows:7,seed:211,brokenSide:1}),n.addBox({center:[185,108,602],size:[27,47,25],color:8486770}),n.addBox({center:[185,133,602],size:[33,7,31],color:7304297}),[{y:3,z:726,width:54,depth:15},{y:6,z:720,width:48,depth:12}].forEach(v=>{n.addBox({center:[u,v.y,v.z],size:[v.width,v.y*2,v.depth],color:9277828})}),Bf(s,255,645,154,27,311),Ha(a,151,714,77,401),Ha(a,350,714,62,402),kf(i,r,394,735,3,421),Vf(i,r,116,731,431)}function D2(n,e,t,i,r,s,a,o,c){n.addBox({center:[265,4,1155],size:[230,8,130],color:7699824}),n.addBox({center:[265,12,1095],size:[214,8,11],color:8883840});for(const h of[157,375])n.addBox({center:[h,12,1155],size:[11,8,112],color:h===157?8489594:9474949});Ca(n,152,378,1216,11,510),e.addBox({center:[265,44,1095],size:[214,66,9],color:12106143}),e.addBox({center:[157,44,1155],size:[9,66,112],color:11449755}),[{z:1112,y:44,d:28,h:66},{z:1145,y:23,d:38,h:21},{z:1145,y:65,d:38,h:22},{z:1194,y:44,d:52,h:66}].forEach((h,u)=>{e.addBox({center:[375,h.y,h.z],size:[9,h.h,h.d],color:Nt(et.paleWall,Dt(u,521))})}),[{x:168,y:44,width:24,height:66},{x:205,y:72,width:50,height:10},{x:245,y:44,width:30,height:66},{x:293,y:23,width:66,height:20},{x:293,y:65,width:66,height:22},{x:350,y:44,width:46,height:66}].forEach((h,u)=>{e.addBox({center:[h.x,h.y,1215],size:[h.width,h.height,9],color:Nt(et.paleWall,Dt(u,531))})}),e.addBox({center:[352,34,1221],size:[14,23,1.5],color:8688239}),i.addBox({center:[205,38,1211],size:[40,56,5],color:5324080});for(let h=0;h<5;h+=1)i.addBox({center:[190+h*7.5,38,1214],size:[5.8,52,2],color:Nt(et.timber,Dt(h,540))});for(const h of[181,229])i.addBox({center:[h,39,1218],size:[6,64,8],color:6309684});i.addBox({center:[205,70,1218],size:[55,7,9],color:6309684}),c.addBox({center:[293,49,1211],size:[56,28,2],color:9288102});for(const h of[263,323])i.addBox({center:[h,49,1217],size:[5,36,5],color:5849652});for(const h of[32,66])i.addBox({center:[293,h,1217],size:[64,5,5],color:5849652});i.addBox({center:[293,49,1217],size:[4,30,4],color:5849652}),o.addBox({center:[371,49,1145],size:[2,26,31],color:14068840}),i.addBox({center:[369,49,1145],size:[4,34,4],color:5784116}),i.addBox({center:[369,49,1145],size:[4,4,39],color:5784116}),Ff(t,i,{centerX:265,ridgeZ:1155,wallTop:78,width:248,halfDepth:74,rise:29,columns:16,rows:6,seed:551,brokenSide:1}),Bf(s,265,1155,134,23,571),Ha(a,338,1219,54,581),Ha(a,164,1219,44,582),kf(i,r,403,1202,2,591),Vf(i,r,135,1210,601)}function Ff(n,e,t){const i=t.width/t.columns,r=t.halfDepth/t.rows,s=Math.atan2(t.rise,t.halfDepth),o=Math.hypot(t.rise,t.halfDepth)/t.rows+2.2;for(const l of[-1,1])for(let d=0;d<t.rows;d+=1)for(let h=0;h<t.columns;h+=1){const u=Dt(h,d,t.seed+l*17);if(l===t.brokenSide&&h>=t.columns-5&&d>=1&&d<=t.rows-2&&((h+d)%3!==0||h===t.columns-1))continue;const v=t.centerX-t.width/2+(h+.5)*i+(ye(u,11)-.5)*1.2,m=(d+.5)*r,f=t.ridgeZ+l*m,x=t.wallTop+t.rise-m/t.halfDepth*t.rise;n.addBox({center:[v,x,f],size:[i+1.4,3+ye(u,18)*1.2,o],rotation:[l*s,(ye(u,7)-.5)*.025,(ye(u,20)-.5)*.018],color:Nt(et.roof,u)})}for(let l=0;l<t.columns;l+=1){const d=Dt(l,t.seed,631);n.addBox({center:[t.centerX-t.width/2+(l+.5)*i,t.wallTop+t.rise+1.6,t.ridgeZ],size:[i+1.2,5.5,9],rotation:[0,0,(ye(d,12)-.5)*.025],color:Nt(et.roof,d)})}const c=t.centerX+t.width/2-i*4.5;for(let l=0;l<5;l+=1){const d=c+l*i,h=[d,t.wallTop+t.rise-1,t.ridgeZ],u=[d,t.wallTop-1,t.ridgeZ+t.brokenSide*t.halfDepth];wt(e,h,u,3.4,6177841,4.2)}}function Bf(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=Dt(a,s,701),c=a/r*Math.PI*2+(ye(o,6)-.5)*.28,l=i+(ye(o,15)-.5)*25,d=5+ye(o,3)*15,h=5+ye(o,10)*13,u=.8+ye(o,17)*.8;n.addBox({center:[e+Math.cos(c)*l,.25+u/2,t+Math.sin(c)*l],size:[d,u,h],rotation:[(ye(o,1)-.5)*.05,c+ye(o,13),(ye(o,8)-.5)*.05],color:a%5===0?Nt(et.roof,o):Nt(et.stone,o)})}}function Ha(n,e,t,i,r){const s=[];for(let a=0;a<7;a+=1){const o=Dt(a,r,733);s.push([e+Math.sin(a*1.3+r)*7,3+a/6*i,t+ye(o,12)*1.4])}for(let a=0;a<s.length-1;a+=1){const o=s[a],c=s[a+1];if(o===void 0||c===void 0)continue;wt(n,o,c,2.2,3499325,1.5);const l=Dt(a,r,739);n.addBox({center:[c[0]+(ye(l,4)-.5)*9,c[1],c[2]+1],size:[6+ye(l,12)*5,3+ye(l,18)*3,2.2],rotation:[0,(ye(l,9)-.5)*.4,(ye(l,21)-.5)*.45],color:Nt(et.foliage,l)})}}function kf(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=Dt(a,s,751),c=25+ye(o,5)*8,l=22+ye(o,13)*9,d=23+ye(o,19)*8,h=t+a*25,u=i+a%2*22,p=(ye(o,9)-.5)*.16;n.addBox({center:[h,l/2,u],size:[c,l,d],rotation:[0,p,0],color:Nt(et.timber,o)});for(const g of[4,l-4])e.addBox({center:[h,g,u],size:[c+2,2.2,d+2],rotation:[0,p,0],color:8084034})}}function Vf(n,e,t,i,r){for(let s=0;s<3;s+=1){const a=Dt(s,r,769),o=[t+s*9,2,i+s*3],c=[o[0]+7+ye(a,7)*5,35+ye(a,14)*11,o[2]-3];wt(n,o,c,3.2,6441011,2.8),e.addBox({center:[c[0],c[1]+2,c[2]],size:[s===1?15:11,5,s===2?9:4],rotation:[0,ye(a,19)*.4,.18],color:Nt(et.rust,a)})}}function I2(n,e,t,i,r){for(let c=0;c<3;c+=1)for(let l=0;l<14;l+=1){const d=Dt(l,c,811),h=(l+c%2*.5)/14*Math.PI*2,u=31+(ye(d,11)-.5)*1.7;n.addBox({center:[361+Math.cos(h)*u,5+c*9,831+Math.sin(h)*u],size:[16.5+ye(d,3)*2,8,11+ye(d,17)*1.5],rotation:[0,-h,0],color:Nt(et.stone,d)})}r.addBox({center:[361,16,831],size:[42,1.4,42],color:4165521,shade:.9});for(const c of[329,393])e.addBox({center:[c,49,831],size:[8,58,9],color:6309170}),n.addBox({center:[c,5,831],size:[15,10,17],color:8094324});e.addBox({center:[361,75,831],size:[82,8,9],color:6769203}),t.addBox({center:[361,54,831],size:[74,5,5],color:7035725}),t.addBox({center:[361,54,831],size:[10,16,10],color:10117950}),wt(t,[361,54,831],[361,23,831],1.8,4998719,1.8),e.addBox({center:[361,21,831],size:[18,12,16],color:7754810});for(let c=0;c<12;c+=1){const l=Dt(c,831,17),d=c/12*Math.PI*2;i.addBox({center:[361+Math.cos(d)*39,2.5,831+Math.sin(d)*39],size:[8+ye(l,8)*7,3,5],rotation:[0,-d,(ye(l,17)-.5)*.25],color:Nt(et.moss,l)})}}function L2(n,e,t,i){const r=yt.x,s=yt.y;for(const o of[470,530])n.addBox({center:[o,34,s],size:[8,68,9],color:5783599}),i.addBox({center:[o,3,s],size:[17,6,18],color:8291704});n.addBox({center:[r,49,s],size:[76,48,8],color:6703668});for(let o=0;o<5;o+=1)n.addBox({center:[r,31+o*9,s+5],size:[70,7,3],color:Nt(et.timber,Dt(o,901))});n.addBox({center:[r,76,s],size:[92,7,19],rotation:[0,0,-.035],color:7753785}),wt(n,[470,10,s],[492,75,s],4,5126444),wt(n,[530,10,s],[508,75,s],4,5126444),[{x:479,y:57,width:19,height:24,color:14208938},{x:503,y:54,width:20,height:29,color:13154696},{x:524,y:59,width:15,height:20,color:14603701},{x:489,y:36,width:22,height:14,color:12102269},{x:518,y:38,width:23,height:16,color:13813407}].forEach((o,c)=>{t.addBox({center:[o.x,o.y,s+7.1],size:[o.width,o.height,.9],rotation:[0,0,(c-2)*.025],color:o.color,shade:1.03}),e.addBox({center:[o.x,o.y+o.height/2-3,s+8],size:[2.4,2.4,1.8],color:c%2===0?11558722:5144948})})}function th(n,e,t,i,r,s){e.addBox({center:[i,4,r],size:[20,8,20],rotation:[0,s,0],color:8554362}),n.addBox({center:[i,35,r],size:[7,62,7],rotation:[0,0,s],color:5590855}),n.addBox({center:[i+9,66,r],size:[25,5,6],rotation:[0,s,-.08],color:5984325}),n.addBox({center:[i+19,57,r],size:[3.5,17,4],color:6444362}),t.addBox({center:[i+19,53,r],size:[13,15,12],rotation:[0,s,0],color:15907944,shade:1.05});for(const a of[-7.5,7.5])n.addBox({center:[i+19+a,53,r],size:[2,18,15],rotation:[0,s,0],color:5851968});n.addBox({center:[i+19,62,r],size:[18,3,16],color:6771522}),n.addBox({center:[i+19,44,r],size:[18,3,16],color:6771522})}function N2(n,e,t,i){th(n,e,t,470,760,-.025),th(n,e,t,470,1040,.018),[[[489,65,760],[494,58,805],[498,56,850],[500,72,940]],[[500,72,960],[498,55,974],[494,57,997],[489,65,1040]]].forEach(s=>{for(let a=0;a<s.length-1;a+=1){const o=s[a],c=s[a+1];o!==void 0&&c!==void 0&&wt(n,o,c,1.45,4013113,1.45)}});for(const[s,a]of[[489,760],[489,1040]]){const o=new Ms(16760690,46,155,2);o.position.set(s,57,a),o.castShadow=!1,o.name=`start-town-lamp-light-${a}`,i.add(o)}}function U2(n){for(let t=0;t<96;t+=1){const i=Dt(t,1101,29),r=52+ye(i,2)*742,s=446+ye(i,12)*900;if(Of(r,s,22)||r>390&&r<600&&Math.abs(s-900)<92)continue;const a=2+i%3;for(let o=0;o<a;o+=1){const c=Dt(t,o,1111),l=7+ye(c,4)*13;n.addBox({center:[r+(ye(c,11)-.5)*10,1.8+l/2,s+(ye(c,18)-.5)*10],size:[2.2+ye(c,7)*2,l,2.2],rotation:[(ye(c,14)-.5)*.32,ye(c,21)*Math.PI,(ye(c,2)-.5)*.28],color:Nt(et.foliage,c)})}t%9===0&&n.addBox({center:[r,13,s],size:[5,5,5],rotation:[.2,ye(i,18)*Math.PI,.2],color:t%18===0?14988624:13922920,shade:1.04})}}function z2(n,e,t){const i=[7314321,8628896,12690255,11123879],r=255,s=645,a=94,o=270,c=86,l=34,d=17,h=7,u=o/d,p=c/h,g=Math.atan2(l,c),v=Math.hypot(l,c)/h+3.4,m=[[16,2],[16,4],[15,2],[14,3],[12,5]];m.forEach(([y,E],b)=>{const A=(E+.5)*p,_=r-o/2+(y+.5)*u,w=s+A,R=a+l-A/c*l+1.6;n.addBox({center:[_,R,w],size:[u+2.2,2.4,v],rotation:[g,0,(b-2)*.012],color:i[b%i.length]??7314321,shade:1.02});for(const P of[-u*.27,u*.27])t.addBox({center:[_+P,R+2.1,w],size:[2.2,1.8,2.2],rotation:[g,0,0],color:5464413})});const f=[{center:[315,52,717.2],size:[27,30,1.8],color:7577750},{center:[214,35,717.2],size:[21,18,1.8],color:12756307},{center:[378.5,54,686],size:[1.8,31,25],color:9547684}];f.forEach((y,E)=>{n.addBox({center:y.center,size:y.size,color:y.color,rotation:E===2?[0,0,.025]:[0,0,-.02]}),t.addBox({center:E===2?[379.8,y.center[1],y.center[2]-7]:[y.center[0],y.center[1]+8,718.4],size:E===2?[1.4,3,8]:[9,3,1.4],color:5661278})});const x=397,S=379;for(const y of[665,690])wt(e,[x,2,y],[S,81,y],4,7757892,3.5);for(let y=0;y<7;y+=1){const E=(y+1)/8,b=x+(S-x)*E,A=2+79*E;wt(e,[b,A,665],[b,A,690],2.8,8415562,3)}e.addBox({center:[386,47,704],size:[7,90,7],rotation:[0,0,-.018],color:6836280}),wt(e,[389,5,697],[367,94,704],5,7493436,5),t.addBox({center:[409,7,714],size:[14,11,13],color:7312011});for(const y of[402.5,415.5])t.addBox({center:[y,9,714],size:[2,12,15],color:5663848});return wt(t,[402,13,714],[405,20,714],1.7,5792863),wt(t,[405,20,714],[413,20,714],1.7,5792863),wt(t,[413,20,714],[416,13,714],1.7,5792863),m.length+f.length}function O2(n,e,t,i){const r=[412,432,452,472],s=[1132,1150,1168,1186];r.forEach((a,o)=>{n.addBox({center:[a,1.45,1155],size:[12,1.6,74],color:o%2===0?7623997:8479047,shade:.94});for(const c of[1117.5,1192.5])e.addBox({center:[a,2.4,c],size:[15,3,3],color:7955012});for(const c of[1125,1185])e.addBox({center:[a,16,c],size:[3,29,3],color:6903358});wt(e,[a,28,1125],[a,28,1185],1.6,8679503,1.6),s.forEach((c,l)=>{const d=(o+l)%3===0?7314260:5211469;i.addBox({center:[a,8,c],size:[2.4,13,2.4],rotation:[.06,o*.2,.08],color:4683593}),i.addBox({center:[a-3.4,10,c],size:[7,3.5,3],rotation:[0,o*.16,-.22],color:d}),i.addBox({center:[a+3.4,13,c+1],size:[7,3.5,3],rotation:[0,-o*.13,.22],color:d})})}),t.addBox({center:[470,7,1116],size:[13,10,11],color:6985874}),wt(t,[476,9,1116],[478,14,1116],3.2,7577497,3),wt(t,[463,12,1116],[464,20,1116],2,5860970),wt(t,[464,20,1116],[473,20,1116],2,5860970),wt(t,[473,20,1116],[476,12,1116],2,5860970);for(let a=0;a<3;a+=1)e.addBox({center:[468,5+a*6,1192],size:[19-a*2,6,14],rotation:[0,a%2===0?.08:-.07,0],color:a===1?11768399:12691293});return e.addBox({center:[468,14,1192],size:[3,24,3],color:7693124}),r.length}function F2(n,e,t){const i=[375,59,1095],r=[470,59,1040];for(const[h,u]of[[i[0],i[2]],[r[0],r[2]]])e.addBox({center:[h,31,u],size:[5,62,5],color:7493694}),e.addBox({center:[h,58,u],size:[14,4,4],color:8414794});wt(t,i,r,1.25,7892313,1.25);const s=[14866103,7448483,12755279,10852022],a=[16,14,17,15],o=[23,20,24,21],c=r[0]-i[0],l=r[2]-i[2],d=-Math.atan2(l,c);return s.forEach((h,u)=>{const p=.17+u*.22,g=i[0]+c*p,v=i[2]+l*p,m=o[u]??20;n.addBox({center:[g,57-m/2,v],size:[a[u]??15,m,2],rotation:[0,d,(u-1.5)*.025],color:h,shade:1.03});for(const f of[-4,4])t.addBox({center:[g+Math.cos(-d)*f,58.2,v+Math.sin(-d)*f],size:[2,3,2],rotation:[0,d,0],color:6643280})}),s.length}function B2(n,e,t,i,r){e.addBox({center:[550,27,790],size:[78,7,25],color:7951930});for(const u of[522,578])for(const p of[782,798])e.addBox({center:[u,13,p],size:[6,26,6],color:6703926});e.addBox({center:[550,10,790],size:[63,4,19],color:7164217}),t.addBox({center:[532,36,790],size:[12,11,11],color:6450280}),t.addBox({center:[532,43,790],size:[8,3,8],color:5200214}),wt(t,[538,38,790],[545,42,790],3,5923936,3),wt(t,[526,42,790],[526,49,790],2,5266007),wt(t,[526,49,790],[536,49,790],2,5266007),wt(t,[536,49,790],[538,42,790],2,5266007);for(let u=0;u<3;u+=1)e.addBox({center:[552+u*9,33,786+u*3],size:[17,2.2,2.2],rotation:[0,-.25+u*.18,.08],color:7426362}),t.addBox({center:[560+u*9,34,784+u*3],size:[6,4,4],rotation:[0,u*.17,0],color:6844780});r.addBox({center:[565,39,797],size:[4,12,4],color:7908006}),i.addBox({center:[578,39,793],size:[7,10,7],color:14729844}),t.addBox({center:[578,45,793],size:[9,2,9],color:5988185});const o=582,c=815;t.addBox({center:[o,19,c],size:[39,6,25],color:6454646});for(const u of[822,846])t.addBox({center:[o,25,u],size:[39,13,4],rotation:[0,0,u<c?-.1:.1],color:u<c?7442311:6190191});t.addBox({center:[564,25,c],size:[5,13,27],color:6849404}),n.addBox({center:[592,26,847.8],size:[16,10,1.8],color:12624721});for(const u of[823,845])wt(e,[568,19,u],[523,12,u-(u<c?5:-5)],4,7426361,4);for(const u of[824,844])wt(t,[573,16,u],[568,3,u],3,5857629,3);const l=610,d=12,h=10;for(let u=0;u<8;u+=1){const p=u/8*Math.PI*2;t.addBox({center:[l+Math.cos(p)*h,d+Math.sin(p)*h,c],size:[8.5,3.8,5],rotation:[0,0,p+Math.PI/2],color:u===1?7708822:5199700})}t.addBox({center:[l,d,c],size:[7,7,8],color:7693128})}function k2(n,e,t,i,r,s,a){const o=n.components+e.components+t.components+i.components+r.components+s.components+a.components,c=z2(n,e,t),l=O2(i,e,t,r),d=F2(n,e,t);B2(n,e,t,s,a);const u=n.components+e.components+t.components+i.components+r.components+s.components+a.components-o;return{addedComponents:u,addedTriangles:u*12,repairPanelCount:c,roofDamageFillRatio:5/18,gardenBedCount:l,laundryClothCount:d,dangerRedOrangeUsed:!1,gardenBounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}}function Dn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i=new ft({name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1}),r=new Ue(t,i);return r.name=e.name,r.castShadow=e.castShadow??!1,r.receiveShadow=e.receiveShadow??!1,r}function V2(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof Ue))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:s.geometry.index.count/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function H2(){const n=new He,e=new He,t=new He,i=new He,r=new He,s=new He,a=new He,o=new He,c=new He,l=new He,d=new He,h=new Ke;h.name="start-town-art-slice",R2(n),C2(e),P2(t,i,r,s,a,o,c,l,d),D2(t,i,r,s,a,o,c,l,d),I2(t,s,a,c,d),L2(s,a,i,o),N2(a,t,l,h),U2(c);const u=k2(i,s,a,e,c,l,d),p=new Ke;p.name="start-town-ground";const g=[Dn(n,{name:"start-town-road-ribbons",roughness:.98,receiveShadow:!0}),Dn(e,{name:"start-town-ground-microdetail",roughness:1,receiveShadow:!0}),Dn(t,{name:"start-town-masonry",roughness:.94,castShadow:!0,receiveShadow:!0}),Dn(i,{name:"start-town-wall-panels",roughness:.98,castShadow:!0,receiveShadow:!0}),Dn(r,{name:"start-town-broken-roofs",roughness:.88,castShadow:!0,receiveShadow:!0}),Dn(s,{name:"start-town-timber-props",roughness:.9,castShadow:!0,receiveShadow:!0}),Dn(a,{name:"start-town-metal-props",roughness:.64,metalness:.42,castShadow:!0,receiveShadow:!0}),Dn(o,{name:"start-town-rubble",roughness:1,castShadow:!0,receiveShadow:!0}),Dn(c,{name:"start-town-foliage",roughness:.96,receiveShadow:!0}),Dn(l,{name:"start-town-warm-glass",roughness:.34,metalness:.05,emissive:9062943,emissiveIntensity:.72}),Dn(d,{name:"start-town-cool-glass-and-water",roughness:.3,metalness:.08,emissive:1526859,emissiveIntensity:.58})];p.add(g[0],g[1]),h.add(p,...g.slice(2));const v=V2(h);h.userData.metrics=v,h.userData.lifePass=u,h.userData.replacedTerrainIds=[...Qu],h.userData.replacedPropIds=[...$u],h.userData.contractBoardPosition={x:yt.x,y:yt.y};let m=!1;return{group:h,ground:p,replacedTerrainIds:Qu,replacedPropIds:$u,dispose(){m||(m=!0,h.removeFromParent(),h.traverse(f=>{f instanceof Ue&&(f.geometry.dispose(),Array.isArray(f.material)?f.material.forEach(x=>x.dispose()):f.material.dispose())}),p.clear(),h.clear())}}}const Es="north-star-surface-v2",Hf="north-star-coherent-surface-generator",Gf="2.0.0",Wi=1314084402,Wf="procedural-dev-candidate",nh=new Map,Zt={asphalt:{resolution:1024,seedOffset:173144599,repeat:[1.08,1.03],normalStrength:3.4,cues:["graded-aggregate","hairline-crack-network","utility-cut-patch","damp-drainage-seam"]},concrete:{resolution:1024,seedOffset:202031847,repeat:[1,1],normalStrength:4.8,cues:["exposed-aggregate","rain-runoff-streaks","mineral-bloom","board-formed-repair-panel"]},roof:{resolution:512,seedOffset:7343906,repeat:[1,1],normalStrength:6.4,cues:["embedded-roof-gravel","membrane-lap-seams","ponding-water-ring","maintenance-patch"]}},Qo=Object.freeze({albedo:"srgb-rgba8",normal:"linear-rgba8-tangent-space",roughness:"linear-rgba8-g-channel"});function Vt(n,e,t){return Math.min(t,Math.max(e,n))}function Fn(n){return Math.round(Vt(n,0,255))}function Ot(n){return n*n*(3-2*n)}function Bn(n,e,t){return n+(e-n)*t}function G2(n,e,t,i=0){let r=Math.imul(n^t,374761393)^Math.imul(e^i,668265261);return r=Math.imul(r^r>>>15,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^r>>>16)>>>0}function nn(n,e,t,i=0){return G2(n,e,t,i)/4294967295}function Lr(n,e,t,i,r){const s=Math.floor(n/t),a=Math.floor(e/t),o=Ot((n-s*t)/t),c=Ot((e-a*t)/t),l=Bn(nn(s,a,i,r),nn(s+1,a,i,r),o),d=Bn(nn(s,a+1,i,r),nn(s+1,a+1,i,r),o);return Bn(l,d,c)}function gs(n,e){const t=(n%e+e)%e;return Math.min(t,e-t)}function td(n,e,t,i,r,s,a){const o=Math.min(n-t,i-n,e-r,s-e);return Ot(Vt(o/a,0,1))}function nd(n,e,t,i,r,s,a){if(!(n>=t&&n<=i&&e>=r&&e<=s))return 0;const c=Math.min(n-t,i-n,e-r,s-e);return 1-Ot(Vt(c/a,0,1))}function id(n,e,t,i,r){const s=e*4;n[s]=Fn(t),n[s+1]=Fn(i),n[s+2]=Fn(r),n[s+3]=255}function rd(n,e,t){const i=Fn(Vt(t,0,1)*255),r=e*4;n[r]=i,n[r+1]=i,n[r+2]=i,n[r+3]=255}function W2(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Ot(r/t),a=i*e+r,o=i*e+(e-1-r),c=n[a]??0,l=n[o]??0,d=(c+l)*.5;n[a]=Bn(c,d,s),n[o]=Bn(l,d,s)}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Ot(r/t),a=r*e+i,o=(e-1-r)*e+i,c=n[a]??0,l=n[o]??0,d=(c+l)*.5;n[a]=Bn(c,d,s),n[o]=Bn(l,d,s)}}function $o(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Ot(r/t),a=(i*e+r)*4,o=(i*e+(e-1-r))*4;for(let c=0;c<3;c+=1){const l=n[a+c]??0,d=n[o+c]??0,h=(l+d)*.5;n[a+c]=Fn(Bn(l,h,s)),n[o+c]=Fn(Bn(d,h,s))}}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-Ot(r/t),a=(r*e+i)*4,o=((e-1-r)*e+i)*4;for(let c=0;c<3;c+=1){const l=n[a+c]??0,d=n[o+c]??0,h=(l+d)*.5;n[a+c]=Fn(Bn(l,h,s)),n[o+c]=Fn(Bn(d,h,s))}}}function sd(n,e,t,i,r){W2(t,i),$o(n,i),$o(e,i);const s=X2(t,i,r);return $o(s,i),{albedo:n,normal:s,roughness:e}}function X2(n,e,t){const i=new Uint8Array(e*e*4);for(let r=0;r<e;r+=1){const s=r===0?e-1:r-1,a=r===e-1?0:r+1;for(let o=0;o<e;o+=1){const c=o===0?e-1:o-1,l=o===e-1?0:o+1,d=r*e+o,h=n[r*e+c]??0,u=n[r*e+l]??0,p=n[s*e+o]??0,g=n[a*e+o]??0,v=(h-u)*t,m=(p-g)*t,f=1/Math.sqrt(v*v+m*m+1),x=d*4;i[x]=Fn((v*f*.5+.5)*255),i[x+1]=Fn((m*f*.5+.5)*255),i[x+2]=Fn(f*255),i[x+3]=255}}return i}function q2(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=Lr(l,o,76,e,11),p=Lr(l,o,19,e,29),g=nn(l,o,e,47),v=5,m=Math.floor(l/v),f=Math.floor(o/v),x=l%v/v,S=o%v/v,y=.2+nn(m,f,e,59)*.6,E=.2+nn(m,f,e,61)*.6,b=Math.hypot(x-y,S-E),_=(nn(m,f,e,67)>.64?1:0)*Vt((.2-b)/.085,0,1),w=g>.991?1:0,R=g<.011?1:0,P=gs(l+o*.21,211),D=1-Ot(Vt(P/2.2,0,1)),O=n*.59+Math.sin(o*.012)*23+Math.sin(o*.041)*4,B=1-Ot(Vt(Math.abs(l-O)/1.55,0,1)),U=O-(o-n*.42)*.43,k=(c>.42&&c<.67?1:0)*(1-Ot(Vt(Math.abs(l-U)/1.3,0,1))),q=Math.max(B,k),J=td(h,c,.13,.37,.61,.82,.012),ne=nd(h,c,.13,.37,.61,.82,.006),ae=n*.72+Math.sin(l*.018)*n*.011,le=Math.abs(o-ae),Ge=1-Ot(Vt(le/18,0,1)),$e=69+u*20+p*9+(g-.5)*8,ke=_*(g>.5?12:-7)+w*8-R*7,K=J*(7+p*8)-ne*17,ie=Ge*21,ee=q*32+D*13;id(r,d,$e-5+ke+K-ie-ee,$e+1+ke+K-ie*.84-ee,$e+4+ke+K-ie*.67-ee);const we=.78+_*.07+q*.1+D*.05-Ge*.36-J*.06+(p-.5)*.04;rd(s,d,we),a[d]=(u-.5)*.18+(p-.5)*.11+(g-.5)*.035+_*.075+J*.035-ne*.1-D*.13-q*.24}}return sd(r,s,a,n,t)}function Y2(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=Lr(l,o,83,e,71),p=Lr(l,o,27,e,83),g=nn(l,o,e,97),v=8,m=Math.floor(l/v),f=Math.floor(o/v),x=l%v/v,S=o%v/v,y=.18+nn(m,f,e,101)*.64,E=.18+nn(m,f,e,103)*.64,b=Math.hypot(x-y,S-E),A=Vt((.21-b)/.085,0,1),_=Math.max(1-Ot(Vt(gs(l+23,263)/1.7,0,1)),1-Ot(Vt(gs(o+37,197)/1.5,0,1))),w=Math.floor(l/17),R=nn(w,0,e,107)>.57?1:0,P=(.18+nn(w,1,e,109)*.64)*17,D=Math.abs(l%17-P),O=R*(1-Ot(Vt(D/3.4,0,1)))*(.25+c*.75)*(.72+p*.28),B=(h-.72)/.23,U=(c-.63)/.18,W=Math.sqrt(B*B+U*U),k=(1-Ot(Vt((W-.35)/.65,0,1)))*(.55+u*.45),q=td(h,c,.12,.43,.24,.58,.014),J=nd(h,c,.12,.43,.24,.58,.007),ne=n*.66+Math.sin(o*.019)*12+Math.sin(o*.053)*2.5,le=(c>.18&&c<.84?1:0)*(1-Ot(Vt(Math.abs(l-ne)/1.25,0,1))),Ge=145+u*18+(p-.5)*10,$e=A*(g>.48?18:-12),ke=q*(8+p*5)-J*20;id(r,d,Ge+4+$e+k*24+ke-O*32-le*35,Ge+8+$e+k*27+ke-O*23-le*35,Ge+5+$e+k*19+ke-O*18-le*32);const K=.76+A*.13+_*.08+k*.11+le*.1-q*.09-O*.12+(p-.5)*.05;rd(s,d,K),a[d]=(u-.5)*.13+(p-.5)*.08+(g-.5)*.025+A*.16+k*.025+q*.04-J*.12-_*.1-le*.23}}return sd(r,s,a,n,t)}function Z2(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const c=o/n;for(let l=0;l<n;l+=1){const d=o*n+l,h=l/n,u=Lr(l,o,53,e,127),p=Lr(l,o,13,e,131),g=nn(l,o,e,137),v=6,m=Math.floor(l/v),f=Math.floor(o/v),x=l%v/v,S=o%v/v,y=.16+nn(m,f,e,139)*.68,E=.16+nn(m,f,e,149)*.68,b=Math.hypot(x-y,S-E),A=Vt((.27-b)/.11,0,1),_=Math.max(1-Ot(Vt(gs(l+19,127)/2.1,0,1)),1-Ot(Vt(gs(o+41,173)/1.8,0,1))),w=(h-.68)/.25,R=(c-.39)/.17,P=Math.sqrt(w*w+R*R),D=1-Ot(Vt((P-.62)/.24,0,1)),O=1-Ot(Vt(Math.abs(P-.92)/.065,0,1)),B=td(h,c,.1,.34,.67,.84,.018),U=nd(h,c,.1,.34,.67,.84,.01),W=111+u*17+(p-.5)*9,k=A*(g>.48?25:-13),q=B*10-U*18;id(r,d,W+8+k+q-D*27-O*13-_*10,W+11+k+q-D*18-O*8-_*9,W+9+k+q-D*11-O*2-_*7);const J=.72+A*.18+_*.08+O*.08-D*.42-B*.08+(p-.5)*.05;rd(s,d,J),a[d]=(u-.5)*.13+(p-.5)*.07+(g-.5)*.025+A*.22+B*.04-U*.12-_*.09-D*.055+O*.035}}return sd(r,s,a,n,t)}function el(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e=Math.imul(e^(n[t]??0),16777619);return`fnv1a32:${(e>>>0).toString(16).padStart(8,"0")}`}function tl(n,e,t,i,r,s,a){const o=new _s(s,t,t,vn,on);return o.name=`north-star-${n}-${e}`,o.colorSpace=e==="albedo"?jt:ci,o.wrapS=Vn,o.wrapT=Vn,o.repeat.set(r[0],r[1]),o.anisotropy=8,o.magFilter=Bt,o.minFilter=hi,o.generateMipmaps=!0,o.unpackAlignment=1,o.needsUpdate=!0,o.userData={profile:Es,generator:Hf,version:Gf,seed:i,baseSeed:Wi,surface:n,channel:e,resolution:t,contentDigest:a,deterministic:!0,source:Wf},o}function K2(n,e){const t=(Wi^e.seedOffset)>>>0;switch(n){case"asphalt":return q2(e.resolution,t,e.normalStrength);case"concrete":return Y2(e.resolution,t,e.normalStrength);case"roof":return Z2(e.resolution,t,e.normalStrength)}}function nl(n,e){const t=(Wi^e.seedOffset)>>>0;let i=nh.get(n);if(i===void 0){const a=K2(n,e),o=Object.freeze({albedo:el(a.albedo),normal:el(a.normal),roughness:el(a.roughness)});i={buffers:a,digests:o},nh.set(n,i)}const{buffers:r,digests:s}=i;return Object.freeze({albedoMap:tl(n,"albedo",e.resolution,t,e.repeat,r.albedo,s.albedo),normalMap:tl(n,"normal",e.resolution,t,e.repeat,r.normal,s.normal),roughnessMap:tl(n,"roughness",e.resolution,t,e.repeat,r.roughness,s.roughness),resolution:e.resolution,digests:s})}function Xf(){const n=nl("asphalt",Zt.asphalt),e=nl("concrete",Zt.concrete),t=nl("roof",Zt.roof),i=Object.freeze({profile:Es,generator:Hf,version:Gf,seed:Wi,deterministic:!0,source:Wf,surfaces:Object.freeze({asphalt:Object.freeze({resolution:n.resolution,seed:(Wi^Zt.asphalt.seedOffset)>>>0,repeat:[Zt.asphalt.repeat[0],Zt.asphalt.repeat[1]],normalStrength:Zt.asphalt.normalStrength,channelEncoding:Qo,digests:n.digests,cues:Zt.asphalt.cues}),concrete:Object.freeze({resolution:e.resolution,seed:(Wi^Zt.concrete.seedOffset)>>>0,repeat:[Zt.concrete.repeat[0],Zt.concrete.repeat[1]],normalStrength:Zt.concrete.normalStrength,channelEncoding:Qo,digests:e.digests,cues:Zt.concrete.cues}),roof:Object.freeze({resolution:t.resolution,seed:(Wi^Zt.roof.seedOffset)>>>0,repeat:[Zt.roof.repeat[0],Zt.roof.repeat[1]],normalStrength:Zt.roof.normalStrength,channelEncoding:Qo,digests:t.digests,cues:Zt.roof.cues})})}),r=[n.albedoMap,n.normalMap,n.roughnessMap,e.albedoMap,e.normalMap,e.roughnessMap,t.albedoMap,t.normalMap,t.roughnessMap];let s=!1;return{asphalt:n,concrete:e,roof:t,provenance:i,dispose(){s||(s=!0,r.forEach(a=>a.dispose()))}}}const ih=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),rh=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),j2=["crosswalk-and-lane-markings","tactile-paving-and-expansion-joints","mixed-use-apartment-balconies","ground-floor-shop-canopy","elevated-rail-platform-fragment","utility-pipes-and-drainage","public-information-kiosk"],J2=[{id:"north-facade-runoff",cause:"broken gutters feed the shaded apartment wall",bounds:{minimumX:130,maximumX:380,minimumZ:700,maximumZ:756}},{id:"utility-basin-seep",cause:"a cracked rain cistern keeps the old utility apron wet",bounds:{minimumX:320,maximumX:402,minimumZ:790,maximumZ:872}},{id:"south-drain-garden",cause:"road runoff is diverted into repaired food-growing beds",bounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}],Q2=["rain-capture-and-filter","patched-solar-panels","kitchen-garden","working-amber-lights","laundry-line","repaired-public-kiosk"];function ji(n,e,t=0){return(Math.imul(Math.trunc(n)+81,73856093)^Math.imul(Math.trunc(e)+167,19349663)^Math.imul(Math.trunc(t)+265,83492791))>>>0}function rt(n,e=0){return(n>>>e&1023)/1023}function $2(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function br(n,e,t,i,r,s){const a=t[0]-e[0],o=t[1]-e[1],c=Math.hypot(a,o);n.addBox({center:[(e[0]+t[0])/2,i,(e[1]+t[1])/2],size:[c,.42,r],rotation:[0,-Math.atan2(o,a),0],color:s})}function e_(n){const e=new Fr(860,760,48,40);e.name="north-star-city-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.62,900),e.userData.componentCount=1;const t=new ft({name:"north-star-city-asphalt-material",color:16777215,map:n.albedoMap,normalMap:n.normalMap,normalScale:new Se(.42,.42),roughnessMap:n.roughnessMap,roughness:1,metalness:.04,flatShading:!1});t.userData.surfaceProfile=Es,t.userData.surfaceKind="asphalt";const i=new Ue(e,t);return i.name="north-star-city-asphalt",i.receiveShadow=!0,i}function la(n){const[e,t,i]=n.size,r=new cn(e,t,i);r.name=`${n.name}-geometry`;const s=r.getAttribute("uv"),a=r.getAttribute("normal"),[o,c]=n.uvOffset??[0,0];for(let h=0;h<s.count;h+=1){const u=a.getX(h),p=a.getY(h),g=a.getZ(h);let v,m,f,x;Math.abs(u)>.5?(v=i,m=t,[f,x]=u>0?[.19,.31]:[.61,.07]):Math.abs(p)>.5?(v=e,m=i,[f,x]=p>0?[.29,.43]:[.73,.17]):(v=e,m=t,[f,x]=g>0?[0,0]:[.47,.59]);const S=Math.max(v,m);s.setXY(h,s.getX(h)*(v/S)+o+f,s.getY(h)*(m/S)+c+x)}s.needsUpdate=!0,r.translate(...n.center),r.userData.componentCount=1;const l=new ft({name:`${n.name}-material`,color:16777215,map:n.surface.albedoMap,normalMap:n.surface.normalMap,normalScale:new Se(n.normalScale,n.normalScale),roughnessMap:n.surface.roughnessMap,roughness:1,metalness:n.surfaceKind==="roof"?.05:0,flatShading:!1});l.userData.surfaceProfile=Es,l.userData.surfaceKind=n.surfaceKind;const d=new Ue(r,l);return d.name=n.name,d.castShadow=n.castShadow??!0,d.receiveShadow=n.receiveShadow??!0,d}function t_(n){return[la({name:"north-star-city-north-apartment-shell",center:[255,78,645],size:[244,152,140],surface:n.concrete,surfaceKind:"concrete",normalScale:.34,uvOffset:[.07,.12]}),la({name:"north-star-city-north-apartment-roof",center:[268,161,646],size:[210,18,136],surface:n.roof,surfaceKind:"roof",normalScale:.46,uvOffset:[.03,.06]}),la({name:"north-star-city-south-clinic-shell",center:[265,57,1155],size:[224,110,126],surface:n.concrete,surfaceKind:"concrete",normalScale:.31,uvOffset:[.41,.23]}),la({name:"north-star-city-south-clinic-roof",center:[265,116,1155],size:[232,10,132],surface:n.roof,surfaceKind:"roof",normalScale:.43,uvOffset:[.36,.47]})]}function n_(n,e,t){n.addBox({center:[430,2.5,778],size:[820,4,76],color:10266788}),n.addBox({center:[430,2.5,1030],size:[820,4,72],color:10989220}),n.addBox({center:[72,2.1,900],size:[66,3.2,330],color:9608344}),n.addBox({center:[430,3.2,816],size:[820,5.2,7],color:12895671}),n.addBox({center:[430,3.2,994],size:[820,5.2,7],color:13027257});for(let r=104;r<=760;r+=64)t.addBox({center:[r,4.56,778],size:[1.1,.24,67],color:r%128===40?8160897:8884620}),t.addBox({center:[r+27,4.56,1030],size:[1,.24,63],color:r%192===40?8489862:9279120});for(let r=112;r<=752;r+=22)r>390&&r<520||(e.addBox({center:[r,4.7,796],size:[13.5,.28,5.5],color:r%44===24?12691798:12166744}),e.addBox({center:[r+9,4.7,1012],size:[13.5,.28,5.5],color:r%66===46?12034394:12626785}));for(let r=95;r<=795;r+=78)e.addBox({center:[r,1.35,904],size:[42,.65,4.6],color:r%156===17?13154147:14078902});for(let r=560;r<=656;r+=16)for(let s=0;s<3;s+=1)e.addBox({center:[r,1.42,853+s*51],size:[8.5,.7,38],color:(r/16+s)%3===0?11844785:12699064});e.addBox({center:[542,1.4,904],size:[4.5,.65,140],color:12567477}),e.addBox({center:[674,1.4,904],size:[4.5,.65,140],color:12567477}),[[[115,876],[168,865],[205,881],[249,872]],[[301,955],[337,943],[358,922],[390,914]],[[421,853],[444,869],[467,866],[490,883]],[[706,947],[739,931],[779,936],[811,920]],[[180,1010],[205,1001],[232,1008]]].forEach((r,s)=>{for(let a=0;a<r.length-1;a+=1){const o=r[a],c=r[a+1];o!==void 0&&c!==void 0&&br(t,o,c,1.3,s%2===0?2.4:1.7,4148555)}});for(let r=0;r<44;r+=1){const s=ji(r,314,27),a=92+rt(s)*720,o=828+rt(s,10)*150;t.addBox({center:[a,1.42,o],size:[2.2+rt(s,20)*7,.55,1.3+rt(s,5)*3.5],rotation:[0,rt(s,15)*Math.PI,0],color:r%5===0?10328709:5924964})}}function i_(n,e,t,i,r,s){n.addBox({center:[141,118,647],size:[18,82,136],color:12630438});for(let a=0;a<4;a+=1){const o=45+a*31;for(let c=0;c<5;c+=1){const l=168+c*43;e.addBox({center:[l,o,716.15],size:[39,27,2.2],color:(a+c)%3===0?13157811:11185837}),t.addBox({center:[l,o+2,717.6],size:[24,14.5,1.5],color:(a+c)%4===0?9419715:6064531}),e.addBox({center:[l,o-7.2,718.2],size:[27.5,2.2,2.5],color:14143672})}}for(let a=0;a<3;a+=1){const o=60+a*31;n.addBox({center:[255,o,727],size:[222,4.2,22],color:10922658}),i.addBox({center:[255,o+11,736.7],size:[222,2.1,2.1],color:6913147});for(let c=0;c<=22;c+=1)i.addBox({center:[145+c*10,o+6.3,736.7],size:[1.45,11,1.45],color:c%5===0?9148822:6649461})}t.addBox({center:[215,20,717.8],size:[72,30,2],color:5209991}),e.addBox({center:[302,20,717.7],size:[84,30,2.2],color:8227206});for(let a=0;a<9;a+=1)i.addBox({center:[264+a*10,20,719],size:[1.2,29,1.3],color:10922658});r.addBox({center:[248,38,730],size:[194,5.5,28],rotation:[-.08,0,0],color:6268576}),r.addBox({center:[176,43,746],size:[42,20,3],color:14730859}),r.addBox({center:[176,43,748],size:[31,3,1.1],color:4353130});for(const a of[153,244,352])i.addBox({center:[a,85,739],size:[3.4,134,3.4],color:7240824});for(let a=0;a<5;a+=1)i.addBox({center:[164+a*44,75+a%2*31,741],size:[18,12,7],color:10200223}),i.addBox({center:[164+a*44,75+a%2*31,745],size:[11,6,1],color:6649715});Ji(s,141,708,42,32,38,401),Ji(s,354,718,30,24,31,409),ac(s,151,717.5,32,136,14,421),ac(s,350,717.7,54,126,18,427)}function r_(n,e,t,i,r){n.addBox({center:[265,61,1219.2],size:[215,100,2.5],color:12828073});for(let s=0;s<11;s+=1)n.addBox({center:[166+s*20,53+s%2*2,1220.8],size:[17,5.5,1.2],color:s%3===0?7315347:9088931});for(let s=0;s<4;s+=1){const a=178+s*58;e.addBox({center:[a,79,1220.7],size:[31,23,2],color:s===2?9682881:6589588}),t.addBox({center:[a,79,1222.1],size:[34,2,2.5],color:7241596})}e.addBox({center:[216,29,1220.9],size:[92,42,2],color:5406598}),t.addBox({center:[310,28,1221.2],size:[67,42,2.4],color:8687757});for(let s=0;s<7;s+=1)t.addBox({center:[281+s*10,28,1222.7],size:[1.2,40,1.1],color:11580072});i.addBox({center:[260,50,1225],size:[212,5,16],rotation:[-.1,0,0],color:13606754}),i.addBox({center:[343,63,1222.7],size:[36,28,3.2],color:6266016}),i.addBox({center:[343,63,1224.7],size:[24,3,1],color:13885384});for(let s=0;s<5;s+=1)t.addBox({center:[174+s*42,7,1223.1],size:[30,10,1.5],color:s%2===0?10118477:8222309});for(let s=0;s<7;s+=1){const a=ji(s,571,33);t.addBox({center:[179+s*28,124,1122+s%2*33],size:[23,2.5,27],rotation:[.1,(rt(a)-.5)*.08,0],color:s%3===0?4287862:5602691}),t.addBox({center:[179+s*28,122.2,1122+s%2*33],size:[2,6,31],color:6715249})}Ji(r,163,1207,28,12,29,577),Ji(r,362,1202,30,15,34,581)}function s_(n,e,t,i,r){n.addBox({center:[480,171,625],size:[470,17,58],color:9213586}),n.addBox({center:[468,159,625],size:[446,9,38],color:6912374});for(const s of[608,642]){e.addBox({center:[474,183,s],size:[454,3,3.4],color:7702406});for(let a=275;a<=689;a+=23)n.addBox({center:[a,180.2,s],size:[5,2.3,48],color:7832704})}t.addBox({center:[342,91,648],size:[25,158,36],color:9608088}),t.addBox({center:[418,91,737],size:[24,148,32],color:9147792,rotation:[.55,0,0]}),i.addBox({center:[490,201,623],size:[282,4,83],rotation:[0,0,-.03],color:8960181});for(let s=363;s<=620;s+=43)e.addBox({center:[s,190,625],size:[3.2,24,71],color:6387572});n.addBox({center:[706,170,625],size:[13,15,58],color:7305074,rotation:[0,0,.17]});for(let s=0;s<9;s+=1)e.addBox({center:[716+s*3.4,170+s%3*3,606+s%2*34],size:[18,1.3,1.3],rotation:[0,s%2*.1,(s-4)*.035],color:9139037});Ji(r,341,681,24,28,38,607),ac(r,418,734,38,126,12,613)}function a_(n,e,t,i,r){n.addBox({center:[361,8,831],size:[80,14,80],color:8884622}),$2(i,[327,395,797,865],15.4,6927793);for(const s of[328,394])n.addBox({center:[s,18,831],size:[7,22,79],color:11580330});for(const s of[798,864])n.addBox({center:[361,18,s],size:[79,22,7],color:11580330});e.addBox({center:[420,42,739],size:[45,70,36],color:7248275}),e.addBox({center:[420,78,739],size:[49,4,40],color:10138536}),t.addBox({center:[420,49,720.5],size:[24,13,2],color:9224381}),e.addBox({center:[398,56,759],size:[4,45,4],color:7043444}),br(e,[398,759],[376,792],35,4,7043444);for(let s=0;s<18;s+=1){const a=ji(s,641,17),o=rt(a)*Math.PI*2,c=30+rt(a,10)*16;r.addBox({center:[361+Math.cos(o)*c,17+rt(a,20)*5,831+Math.sin(o)*c],size:[3+rt(a,5)*4,8+rt(a,15)*8,3+rt(a,7)*4],rotation:[.1,o,(rt(a,12)-.5)*.35],color:s%4===0?8826456:5016923})}}function o_(n,e,t,i){const r=yt.x,s=yt.y;for(const a of[r-35,r+35])n.addBox({center:[a,34,s],size:[5,66,5],color:6715510});e.addBox({center:[r,57,s],size:[84,45,7],color:5336173}),t.addBox({center:[r,58,s+4],size:[73,34,2],color:7645608}),e.addBox({center:[r,57,s+5.3],size:[58,2.2,1],color:14276540}),e.addBox({center:[r-16,49,s+5.4],size:[25,2,1],color:13026734}),e.addBox({center:[r+18,65,s+5.4],size:[20,2,1],color:13026734}),i.addBox({center:[r,78,s+1],size:[45,4,5],color:16764790}),n.addBox({center:[r-24,42,s+5.6],size:[13,10,1.4],color:13936728})}function l_(n,e,t,i){for(const r of[760,1040])n.addBox({center:[470,34,r],size:[4,63,4],color:5860714}),n.addBox({center:[470,67,r],size:[20,5,9],rotation:[0,0,-.12],color:7770251}),i.addBox({center:[476,65,r+.5],size:[9,3.5,7],color:16765309});for(let r=0;r<4;r+=1){const s=1120+r*22;e.addBox({center:[442.5,5,s],size:[70,8,14],color:8481357});for(let a=0;a<7;a+=1){const o=ji(r,a,701);t.addBox({center:[413+a*9.7,12+rt(o)*3,s],size:[5+rt(o,10)*3,12+rt(o,20)*6,5+rt(o,5)*3],rotation:[0,rt(o,15)*Math.PI,(rt(o,8)-.5)*.3],color:a%3===0?9352535:5216087})}}br(e,[403,1100],[481,1100],3.4,5,7507079),br(e,[403,1100],[403,1195],3.4,5,7507079),br(n,[170,1222],[350,1222],91,1.5,7175287);for(let r=0;r<6;r+=1)e.addBox({center:[188+r*28,82-r%2*3,1224],size:[18,17+r%3*4,1.2],rotation:[0,0,(r%2===0?-1:1)*.045],color:[14993007,7317410,14274738][r%3]??14274738});for(let r=0;r<14;r+=1){const s=ji(r,719,41);t.addBox({center:[412+rt(s)*60,20+rt(s,10)*5,1116+rt(s,20)*76],size:[3.2,5.5,3.2],rotation:[0,rt(s,6)*Math.PI,0],color:[14857822,12152696,7911854][r%3]??14857822})}n.addBox({center:[568,31,814],size:[82,58,38],color:6454393}),e.addBox({center:[568,35,833.6],size:[68,39,2],color:9415072});for(let r=0;r<8;r+=1)n.addBox({center:[540+r*8,34,835.2],size:[2.1,30,2.2],color:r%3===0?10250318:5466470});i.addBox({center:[593,47,835.6],size:[8,4,1.5],color:16762988}),e.addBox({center:[527,10,791],size:[30,18,24],color:10122837}),br(n,[526,801],[542,833],7,3.2,5203555);for(let r=0;r<4;r+=1)e.addBox({center:[397+r*14,9+r%2*9,1204],size:[13,17,16],color:r%2===0?11570523:7441798})}function Ji(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const c=ji(o,a,19),l=e+(rt(c)*2-1)*i,d=t+(rt(c,10)*2-1)*r,h=7+rt(c,20)*17;n.addBox({center:[l,h/2+2.2,d],size:[3.5+rt(c,5)*6,h,3.5+rt(c,15)*6],rotation:[.08,rt(c,8)*Math.PI,(rt(c,17)-.5)*.42],color:[4162388,6068308,7907671,5011024][o%4]??5011024})}}function ac(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const c=ji(o,a,23),l=e+(rt(c)-.5)*i,d=8+rt(c,10)*r;n.addBox({center:[l,d,t],size:[3+rt(c,20)*5,9+rt(c,6)*13,2.8],rotation:[0,0,(rt(c,16)-.5)*.55],color:o%3===0?8628566:4685136})}}function Sn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1},r=e.physical?new vi({...i,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new ft(i),s=new Ue(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function c_(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof Ue))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:(s.geometry.index?.count??0)/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function d_(){const n=new He,e=new He,t=new He,i=new He,r=new He,s=new He,a=new He,o=new He,c=new He,l=new He,d=new He,h=new He,u=new Ke;u.name="north-star-city-art-slice",n_(n,e,h),i_(t,i,r,s,o,c),r_(i,r,s,o,c),s_(a,s,t,r,c),a_(t,s,r,d,c),o_(s,o,r,l),l_(s,o,c,l),Ji(c,96,822,38,52,44,733),Ji(c,775,1015,48,38,38,739);const p=Xf(),g=e_(p.asphalt),v=t_(p),m=[Sn(n,{name:"north-star-city-curbs-and-sidewalks",roughness:.9,receiveShadow:!0}),Sn(e,{name:"north-star-city-road-markings",roughness:.78,receiveShadow:!0}),Sn(t,{name:"north-star-city-structural-concrete",roughness:.82,castShadow:!0,receiveShadow:!0}),Sn(i,{name:"north-star-city-layered-facades",roughness:.72,castShadow:!0,receiveShadow:!0}),Sn(r,{name:"north-star-city-glass",roughness:.2,metalness:.08,transparent:!0,opacity:.82,physical:!0,clearcoat:.48,clearcoatRoughness:.16}),Sn(s,{name:"north-star-city-metal-infrastructure",roughness:.47,metalness:.58,castShadow:!0,receiveShadow:!0}),Sn(a,{name:"north-star-city-elevated-station",roughness:.68,metalness:.28,castShadow:!0,receiveShadow:!0}),Sn(o,{name:"north-star-city-signs-and-life",roughness:.61,castShadow:!0,receiveShadow:!0}),Sn(c,{name:"north-star-city-causal-foliage",roughness:.86,castShadow:!0,receiveShadow:!0}),Sn(l,{name:"north-star-city-working-lights",roughness:.24,emissive:10114079,emissiveIntensity:1.35,physical:!0,clearcoat:.35,clearcoatRoughness:.18}),Sn(d,{name:"north-star-city-shallow-water",roughness:.13,metalness:.04,transparent:!0,opacity:.78,physical:!0,clearcoat:.86,clearcoatRoughness:.08,receiveShadow:!0}),Sn(h,{name:"north-star-city-cracks-and-aggregate",roughness:.96,receiveShadow:!0})],f=new Ke;f.name="north-star-city-ground",f.add(g,m[0],m[1],m[10],m[11]),u.add(f,...v,...m.slice(2,10));const x=new Ke;x.name="north-star-contract-kiosk-anchor",x.position.set(yt.x,0,yt.y),x.userData.interactionPoint={x:yt.x,y:yt.y},u.add(x);const S=c_(u);u.userData.environmentKind="overgrown-modern-city",u.userData.oldUseSignals=[...j2],u.userData.causalGrowthZones=J2.map(E=>({...E,bounds:{...E.bounds}})),u.userData.lifeSignals=[...Q2],u.userData.surfaceProfile=p.provenance.profile,u.userData.surfaceProvenance=p.provenance,u.userData.metrics=S,u.userData.replacedTerrainIds=[...ih],u.userData.replacedPropIds=[...rh],u.userData.contractBoardPosition={x:yt.x,y:yt.y},u.userData.spawnPosition={x:430,y:900},u.userData.playerCorridor={centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70},u.userData.nonBlockingOverheadBounds={minimumX:245,maximumX:715,minimumZ:596,maximumZ:654,minimumY:150};let y=!1;return{group:u,ground:f,replacedTerrainIds:ih,replacedPropIds:rh,dispose(){y||(y=!0,u.removeFromParent(),u.traverse(E=>{E instanceof Ue&&(E.geometry.dispose(),Array.isArray(E.material)?E.material.forEach(b=>b.dispose()):E.material.dispose())}),p.dispose(),f.clear(),u.clear())}}}const u_="1.0.0",h_="concept-c-beauty-cell-r02",f_=1128416002,Nn=Object.freeze({schemaVersion:u_,stableId:h_,seed:f_,deterministic:!0,environmentKind:"optimistic-reclaimed-modern-city",worldBounds:Object.freeze({minimumX:-70,maximumX:930,minimumZ:470,maximumZ:1320}),spawn:Object.freeze({x:430,z:900}),clearPlayerCorridor:Object.freeze({centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70}),composition:Object.freeze({cameraIntent:"fixed-diagonal-hd2d",foreground:Object.freeze(["leaf-framed-lower-edge","rain-dark-stair-threshold","bright-maintained-planters"]),middleGround:Object.freeze(["playable-wet-intersection","human-scale-transit-shelter","field-workbench-and-contract-kiosk"]),background:Object.freeze(["water-reclaim-basin","broken-concrete-city-frame","physically-present-anomaly"]),focalHierarchy:Object.freeze(["player-and-companion","sunlit-crosswalk","working-amber-technology","distant-cyan-anomaly"])}),materialGrammar:Object.freeze({wetAsphalt:Object.freeze(["fine-aggregate-normal","irregular-puddle-clearcoat","worn-paint-not-clean-stripes"]),reclaimedConcrete:Object.freeze(["mineral-bloom","repair-seams","runoff-fed-moss"]),vegetation:Object.freeze(["highest-density-at-water-and-drains","low-density-in-maintained-route","warm-flower-accents-near-human-work"]),technology:Object.freeze(["dark-ceramic-and-brushed-metal","cyan-data-light","amber-life-light"])}),modules:Object.freeze([Object.freeze({stableId:"cbc-route-reclaimed-intersection",role:"route",anchor:Object.freeze({x:430,y:.7,z:900}),bounds:Object.freeze({minimumX:40,maximumX:860,minimumZ:570,maximumZ:1250}),authoredCues:Object.freeze(["offset-crosswalk","tactile-paving","drainage-cuts","wet-wheel-tracks"]),causalRule:"Active foot traffic keeps the east route open while failed drains retain shallow rainwater.",gameplayPromise:"A readable combat lane with occluding detail kept outside the player corridor."}),Object.freeze({stableId:"cbc-threshold-rain-stairs",role:"threshold",anchor:Object.freeze({x:250,y:1,z:1035}),bounds:Object.freeze({minimumX:145,maximumX:340,minimumZ:960,maximumZ:1160}),authoredCues:Object.freeze(["broad-lower-left-stairs","broken-retaining-wall","mossed-handrail"]),causalRule:"A retaining wall diverts runoff down the stairs, darkening the treads and feeding edge moss.",gameplayPromise:"A strong foreground threshold and future vertical-route affordance."}),Object.freeze({stableId:"cbc-shelter-transit-04",role:"shelter",anchor:Object.freeze({x:294,y:1,z:718}),bounds:Object.freeze({minimumX:205,maximumX:380,minimumZ:650,maximumZ:780}),authoredCues:Object.freeze(["laminated-glass-panels","patched-solar-roof","working-route-display"]),causalRule:"The roof still catches rain and solar power, so survivors maintain the light and water filter beneath it.",gameplayPromise:"A safe readable waypoint that later supports rest, rumor, and companion meetings."}),Object.freeze({stableId:"cbc-water-spillway",role:"water",anchor:Object.freeze({x:132,y:.4,z:700}),bounds:Object.freeze({minimumX:-45,maximumX:245,minimumZ:555,maximumZ:815}),authoredCues:Object.freeze(["shallow-clear-basin","concrete-spillway","reed-density-gradient"]),causalRule:"A cracked utility main continuously replenishes the lowest basin and determines the reed line.",gameplayPromise:"A cool reflective counterweight and a future resource/risk pocket."}),Object.freeze({stableId:"cbc-work-relic-bench",role:"work",anchor:Object.freeze({x:620,y:1,z:836}),bounds:Object.freeze({minimumX:555,maximumX:705,minimumZ:765,maximumZ:920}),authoredCues:Object.freeze(["field-tool-silhouettes","cable-spool","amber-analysis-lamp"]),causalRule:"The bench sits on a dry raised apron close to the route and draws power from salvaged transit cells.",gameplayPromise:"An obvious future interaction point for analysis, assembly, and limited-use skills."}),Object.freeze({stableId:"cbc-habitat-drain-gardens",role:"habitat",anchor:Object.freeze({x:635,y:1,z:1020}),bounds:Object.freeze({minimumX:520,maximumX:785,minimumZ:965,maximumZ:1205}),authoredCues:Object.freeze(["repaired-planter-frames","edible-leaf-grid","small-warm-flowers"]),causalRule:"Planters intercept road runoff but remain trimmed along the maintained east route.",gameplayPromise:"Visible human optimism and a later food/crafting loop without a quest marker."}),Object.freeze({stableId:"cbc-landmark-real-anomaly",role:"landmark",anchor:Object.freeze({x:575,y:50,z:565}),bounds:Object.freeze({minimumX:510,maximumX:645,minimumZ:505,maximumZ:625}),authoredCues:Object.freeze(["broken-conductor-ring","suspended-relic-shards","cyan-field-core"]),causalRule:"A fractured superconducting service ring traps an intermittent field between its surviving segments.",gameplayPromise:"A real world-space destination rather than a flat backdrop or decorative billboard."})]),generationProvenance:Object.freeze({source:"runtime-procedural-geometry",externalAssets:!1,referenceImageUsedAtRuntime:!1,generator:"beauty-cell-composition-grammar",generatorVersion:"1.0.0",laws:Object.freeze(["water-follows-low-points-and-broken-infrastructure","plant-density-follows-water-light-and-human-maintenance","repair-signals-cluster-near-safe-travel-and-dry-work-surfaces","detail-density-may-frame-but-never-obscure-the-player-corridor","technology-emission-is-limited-to-functional-data-or-life-signals"])})}),sh=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),ah=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),pi={concrete:[11449506,9477004,12697255,8096128],concreteDark:[6714734,5793888,7635064],roadPaint:[14210493,13093043,14801336],foliage:[2056254,3110726,5016912,7118680,9218914],foliageShadow:[1522994,2118458,3235646],rust:[9393463,11102527,7227192],flower:[16755300,16022376,14992746]};function Qn(n,e,t=0){return(Math.imul(Math.trunc(n)+99,73856093)^Math.imul(Math.trunc(e)+169,19349663)^Math.imul(Math.trunc(t)+257,83492791))>>>0}function pt(n,e=0){return(n>>>e&1023)/1023}function mi(n,e){return n[e%n.length]??n[0]??16777215}function Sr(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function oh(n,e,t,i,r,s){const a=t[0]-e[0],o=t[1]-e[1],c=Math.hypot(a,o);n.addBox({center:[(e[0]+t[0])/2,i,(e[1]+t[1])/2],size:[c,Math.max(.35,r*.12),r],rotation:[0,-Math.atan2(o,a),0],color:s})}function p_(n,e,t,i,r){Sr(n,[25,875,555,690],1.08,6649455),Sr(n,[25,875,1100,1270],1.08,6846828),Sr(n,[32,155,690,1100],1.05,6255721),Sr(n,[735,875,690,1100],1.05,6320489),n.addBox({center:[450,4,695],size:[850,8,12],color:8885386}),n.addBox({center:[450,4,1096],size:[850,8,12],color:8293761}),n.addBox({center:[159,4,895],size:[12,8,400],color:9740433}),n.addBox({center:[731,4,895],size:[12,8,400],color:9017739}),Sr(e,[160,730,690,1100],.96,398867);for(let a=0;a<9;a+=1){const o=Qn(a,823,7),c=304+a*24,l=74+pt(o,8)*25;t.addBox({center:[c,1.52,914+a%2*2.5],size:[13+pt(o,16)*4,.65,l],rotation:[0,(pt(o,22)-.5)*.035,0],color:mi(pi.roadPaint,o),shade:a===3||a===7?.42:.57})}for(let a=0;a<12;a+=1){const o=Qn(a,313,19);t.addBox({center:[190+a*12.5,1.55,972],size:[8.5,.75,13],color:a%4===0?11830590:13673543,shade:.9+pt(o,10)*.12})}const s=[[225,835,76,31,-.08],[538,775,118,24,.1],[610,1015,84,34,-.16],[370,1063,110,20,.05],[685,905,62,20,.18]];for(const[a,o,c,l,d]of s)i.addBox({center:[a,1.7,o],size:[c,.18,l],rotation:[0,d,0],color:o>950?5212802:6133392});for(let a=0;a<118;a+=1){const o=Qn(a,557,41),c=a<62,l=45+pt(o,2)*805,d=c?605+pt(o,12)*145:1045+pt(o,12)*185;r.addBox({center:[l,2.1+pt(o,21)*1.8,d],size:[3+pt(o,5)*12,1.1+pt(o,17)*2.4,3+pt(o,25)*9],rotation:[(pt(o,7)-.5)*.25,pt(o,14)*Math.PI,(pt(o,23)-.5)*.2],color:mi(pi.concreteDark,o)})}}function m_(n,e,t){for(let i=0;i<11;i+=1)n.addBox({center:[245,4.5+i*2.8,1102-i*13],size:[172-i*1.8,9+i*5.6,14],color:mi(pi.concrete,Qn(i,701))}),i%2===0&&t.addBox({center:[180+i%3*26,10+i*5.5,1095-i*13],size:[26,1.4,6],rotation:[0,(i-4)*.08,0],color:mi(pi.foliageShadow,Qn(i,719))});n.addBox({center:[151,31,1025],size:[17,62,220],color:6913139}),n.addBox({center:[340,27,1050],size:[26,54,185],color:9476750});for(const i of[170,319])e.addBox({center:[i,45,1035],size:[3.2,74,3.2],color:4281937}),e.addBox({center:[i,78,1028],size:[3.2,3.2,165],rotation:[-.18,0,0],color:5794660})}function g_(n,e,t,i){n.addBox({center:[294,4,718],size:[182,8,106],color:10398105}),n.addBox({center:[294,7,776],size:[184,14,12],color:8227971});for(const r of[220,276,348])e.addBox({center:[r,51,704],size:[5,92,5],color:3887952});e.addBox({center:[294,92,676],size:[142,4,5],color:4217173}),e.addBox({center:[294,92,732],size:[142,4,5],color:4217173}),e.addBox({center:[225,92,704],size:[5,4,58],color:5400160}),e.addBox({center:[363,92,704],size:[5,4,58],color:5400160}),t.addBox({center:[248,53,707],size:[50,75,2.6],color:8893869}),t.addBox({center:[322,53,707],size:[70,75,2.6],color:7973539}),t.addBox({center:[210,53,733],size:[2.6,75,48],color:7578268}),e.addBox({center:[284,21,737],size:[104,8,24],color:7037522}),e.addBox({center:[371,63,700],size:[10,70,8],color:3427657}),i.addBox({center:[371,76,694],size:[7,21,1.2],color:6088396}),i.addBox({center:[371,55,694],size:[7,9,1.2],color:16757854})}function x_(n,e,t,i){n.addBox({center:[568,5,815],size:[118,10,82],color:8885386}),e.addBox({center:[585,34,823],size:[102,8,42],color:6050116});for(const a of[542,628])e.addBox({center:[a,18,823],size:[6,30,6],color:3820104});e.addBox({center:[612,53,810],size:[38,31,9],color:3032387}),t.addBox({center:[612,55,804.8],size:[30,19,1.5],color:6004633}),i.addBox({center:[612,55,803.8],size:[24,2,.7],color:6088396}),i.addBox({center:[585,43,812],size:[5,5,5],color:16757854}),oh(e,[548,845],[585,868],3.2,2.2,2505274),oh(e,[585,868],[636,850],3.2,2.2,3427145);for(let a=0;a<8;a+=1){const o=Qn(a,991);e.addBox({center:[542+a*11,42+a%2*3,818],size:[3+pt(o,4)*5,12+pt(o,16)*9,3],rotation:[0,0,(pt(o,23)-.5)*.4],color:mi(pi.rust,o)})}const r=yt.x,s=yt.y;n.addBox({center:[r,4,s],size:[92,8,28],color:8951436});for(const a of[r-38,r+38])e.addBox({center:[a,36,s],size:[6,62,7],color:3361092});e.addBox({center:[r,63,s],size:[90,8,9],color:4413781}),t.addBox({center:[r,43,s-4.7],size:[72,31,2],color:3497563}),i.addBox({center:[r-15,48,s-5.9],size:[34,2.2,.7],color:6088396}),i.addBox({center:[r+26,36,s-5.9],size:[12,12,.7],color:16757854})}function v_(n,e,t,i){for(let r=0;r<5;r+=1){const s=520+r%3*86,a=1042+Math.floor(r/3)*76;n.addBox({center:[s,10,a],size:[68,20,48],color:r%2===0?9279883:7833725}),e.addBox({center:[s,20,a],size:[72,3,52],color:6054999}),n.addBox({center:[s,21.7,a],size:[59,2.2,39],color:3492411});for(let o=0;o<15;o+=1){const c=Qn(r,o,1129);ad(t,i,s-24+o%5*12+(pt(c,4)-.5)*5,a-13+Math.floor(o/5)*13,.72+pt(c,15)*.5,c,23,o%5===0)}}}function y_(n,e,t,i,r,s){n.addBox({center:[361,5,831],size:[84,10,84],color:7900292});for(const[o,c,l,d]of[[361,791,84,6],[361,871,84,6],[321,831,6,84],[401,831,6,84]])n.addBox({center:[o,18,c],size:[l,26,d],color:6913141});t.addBox({center:[361,12.4,831],size:[70,1.2,70],color:5214602}),e.addBox({center:[361,31,831],size:[66,4,4],color:4282452}),e.addBox({center:[394,33,831],size:[4,36,58],color:3361608}),s.addBox({center:[394,48,803],size:[3,10,2],color:6088396}),n.addBox({center:[430,3,739],size:[102,6,66],color:8359301});for(const o of[386,474])e.addBox({center:[o,24,739],size:[5,42,58],color:3427401});e.addBox({center:[430,44,739],size:[92,5,60],color:5464925});for(let o=0;o<7;o+=1)e.addBox({center:[399+o*10,22+o%2*5,722],size:[5,23+o%3*5,5],rotation:[0,0,(o-3)*.035],color:mi(pi.rust,Qn(o,1423))});n.addBox({center:[470,4,1041],size:[20,8,24],color:7701885}),e.addBox({center:[470,42,1041],size:[5,76,5],color:3230023}),e.addBox({center:[480,76,1041],size:[23,4,4],color:4414294}),s.addBox({center:[491,73,1041],size:[4,12,7],color:16757854}),n.addBox({center:[442.5,9,1155],size:[77,18,92],color:7438712}),n.addBox({center:[442.5,19,1155],size:[66,3,80],color:3163706});for(let o=0;o<18;o+=1){const c=Qn(o,1551,Nn.seed);ad(i,r,416+o%6*10.5,1125+Math.floor(o/6)*29,.58+pt(c,13)*.32,c,20,o%7===0)}[[398,18,1201,24,34,26],[427,14,1201,28,27,26],[411,12,1226,32,23,22]].forEach(([o,c,l,d,h,u],p)=>{e.addBox({center:[o,c,l],size:[d,h,u],rotation:[0,(p-1)*.08,0],color:p===1?5662045:7755585}),e.addBox({center:[o,c+h*.18,l-u*.51],size:[d*.72,3,2],color:10840893})})}const __=[["town-hall",130,570,250,150],["town-well",320,790,82,82],["south-house",150,1090,230,130],["town-board-collider",454,940,92,20],["town-hall-workyard-collider",380,707,100,64],["town-repair-bench-collider",510,777,115,76],["town-south-lamp-collider",460,1030,20,23],["town-kitchen-garden-collider",405,1110,75,90],["town-south-crates-collider",385,1186,61,53]];function M_(){const n=new Ke;return n.name="beauty-cell-collider-visual-anchors",__.forEach(([e,t,i,r,s])=>{const a=new At;a.name=`beauty-cell-collider-visual-${e}`,a.position.set(t+r/2,0,i+s/2),a.userData.bounds={x:t,y:i,width:r,height:s},n.add(a)}),n}function ad(n,e,t,i,r,s,a=1.5,o=!1){const c=(12+pt(s,3)*23)*r;n.addBox({center:[t,a+c*.5,i],size:[1.2*r,c,1.2*r],rotation:[(pt(s,9)-.5)*.14,0,(pt(s,19)-.5)*.18],color:mi(pi.foliageShadow,s)});for(let l=0;l<6;l+=1){const d=pt(s^Math.imul(l+1,73244475),4)*Math.PI*2,h=a+c*(.28+l*.17),u=(4.2+pt(s,l*5)*5.2)*r;n.addBox({center:[t+Math.cos(d)*u*.48,h,i+Math.sin(d)*u*.48],size:[u*1.62,2.4+r*1.6,u*.62],rotation:[0,-d,(pt(s,l*7+2)-.5)*.35],color:mi(pi.foliage,s+l)})}o&&e.addBox({center:[t,a+c+1.3,i],size:[4.5*r,2.6*r,4.5*r],rotation:[0,pt(s,11)*Math.PI,0],color:mi(pi.flower,s)})}function S_(n,e){[{count:120,minX:-20,maxX:235,minZ:555,maxZ:835,wet:!0},{count:92,minX:40,maxX:355,minZ:965,maxZ:1250,wet:!0},{count:116,minX:550,maxX:880,minZ:1025,maxZ:1285,wet:!1},{count:95,minX:50,maxX:880,minZ:520,maxZ:665,wet:!1}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=Qn(s,r,Nn.seed),o=i.minX+pt(a,2)*(i.maxX-i.minX),c=i.minZ+pt(a,13)*(i.maxZ-i.minZ);o>365&&o<825&&Math.abs(c-900)<82||ad(n,e,o,c,(i.wet?.9:.68)+pt(a,22)*.9,a,1.5,s%(i.wet?17:23)===0)}})}function b_(n,e,t){Sr(t,[-45,235,558,808],1.9,5081476),n.addBox({center:[96,-1,557],size:[286,17,14],color:7439741}),n.addBox({center:[96,-1,810],size:[286,17,14],color:6650482}),n.addBox({center:[-43,0,683],size:[14,18,240],color:7242362}),n.addBox({center:[238,0,683],size:[14,18,240],color:8360070});for(let i=0;i<9;i+=1)e.addBox({center:[-4+i*27,4,790+i%2*3],size:[18,3,24],color:i%3===0?9263420:5399389})}function w_(n,e,t,i){n.addBox({center:[150,64,540],size:[185,128,82],color:8885131}),n.addBox({center:[84,122,548],size:[55,116,74],color:7110006}),e.addBox({center:[161,69,582],size:[148,90,5],color:10263171}),n.addBox({center:[730,71,622],size:[170,142,92],color:7635837}),e.addBox({center:[720,72,670],size:[142,105,5],color:10066824}),n.addBox({center:[790,133,620],size:[46,118,86],color:6123627});for(const r of[{baseX:104,z:585,columns:4,rows:3},{baseX:665,z:674,columns:4,rows:4}])for(let s=0;s<r.rows;s+=1)for(let a=0;a<r.columns;a+=1){if((s*7+a*3)%9===4)continue;const c=r.baseX+a*32,l=42+s*28;i.addBox({center:[c,l,r.z-2],size:[26,3,3],color:4281937}),t.addBox({center:[c,l-10,r.z-2.5],size:[23,18,2],color:5602936})}for(let r=0;r<8;r+=1)i.addBox({center:[60+r*24,137+r%3*2,540],size:[19,3,56],rotation:[0,(r-4)*.035,0],color:r%3===0?8869951:5465182})}function E_(){const n=new Ke;n.name="beauty-cell-world-space-anomaly",n.position.set(575,50,565),n.rotation.y=Math.PI/4,n.userData.moduleId="cbc-landmark-real-anomaly";const e=new ft({name:"beauty-cell-anomaly-ring-material",color:2379600,metalness:.74,roughness:.24,emissive:683881,emissiveIntensity:2.2});for(let r=0;r<4;r+=1){const s=new Ue(new Qa(27,2.3,8,28,Math.PI*.37),e);s.name=`beauty-cell-anomaly-ring-${r}`,s.rotation.z=r*(Math.PI/2)+.12,s.castShadow=!0,n.add(s)}const t=new Ue(new Bc(8.5,1),new Pt({name:"beauty-cell-anomaly-core-material",color:new De(6088396).multiplyScalar(2.4),toneMapped:!1}));t.name="beauty-cell-anomaly-core",n.add(t);for(let r=0;r<7;r+=1){const s=new Ue(new kc(2.2+r%3,0),e),a=r/7*Math.PI*2;s.position.set(Math.cos(a)*18,Math.sin(a*2)*8,Math.sin(a)*18),s.rotation.set(a*.7,a,-a*.4),n.add(s)}const i=new Ms(6088396,12,135,2);return i.name="beauty-cell-anomaly-light",n.add(i),n}function T_(n){const e=new Fr(960,800,56,46);e.name="beauty-cell-wet-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.72,900),e.userData.componentCount=1;const t=new vi({name:"beauty-cell-wet-asphalt-material",color:1583654,map:n.albedoMap,normalMap:n.normalMap,normalScale:new Se(.5,.5),roughnessMap:n.roughnessMap,roughness:.86,metalness:.03,clearcoat:.38,clearcoatRoughness:.2});t.userData.surfaceProfile=Es,t.userData.wetnessModel="clearcoat-puddles-and-drainage";const i=new Ue(e,t);return i.name="beauty-cell-wet-asphalt",i.receiveShadow=!0,i}function ca(n,e,t,i,r){const s=new cn(...t,1,1,1);s.name=`${n}-geometry`,s.userData.componentCount=1;const a=new ft({name:`${n}-material`,color:r==="concrete"?11581352:7899771,map:i.albedoMap,normalMap:i.normalMap,normalScale:new Se(r==="concrete"?.34:.52,r==="concrete"?.34:.52),roughnessMap:i.roughnessMap,roughness:.92,metalness:.01}),o=new Ue(s,a);return o.name=n,o.position.set(...e),o.castShadow=!0,o.receiveShadow=!0,o}function pn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:e.depthWrite??!0,side:e.doubleSided?an:gi},r=e.unlit?new Pt({name:i.name,color:i.color,vertexColors:!0,transparent:i.transparent,opacity:i.opacity,side:i.side,depthWrite:i.depthWrite}):e.physical?new vi({...i,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new ft(i),s=new Ue(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function A_(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof Ue))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:(s.geometry.index?.count??0)/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function qf(){const n=new He,e=new He,t=new He,i=new He,r=new He,s=new He,a=new He,o=new He,c=new He,l=new He,d=new He,h=new He,u=new He;p_(n,e,t,i,r),m_(s,o,h),g_(s,o,c,l),x_(s,o,c,l),y_(s,o,d,h,u,l),v_(s,o,h,u),b_(s,o,d),w_(s,a,c,o),S_(h,u);const p=Xf(),g=T_(p.asphalt),v=[ca("beauty-cell-stair-retaining-shell",[134,36,1028],[28,72,220],p.concrete,"concrete"),ca("beauty-cell-transit-roof",[294,96,704],[142,7,58],p.roof,"roof"),ca("beauty-cell-far-left-shell",[150,64,541],[186,128,84],p.concrete,"concrete"),ca("beauty-cell-far-right-shell",[730,72,623],[172,144,94],p.concrete,"concrete")],m=[pn(n,{name:"beauty-cell-sidewalks-curbs",roughness:.9,receiveShadow:!0}),pn(e,{name:"beauty-cell-wet-road-film",roughness:.31,unlit:!0,transparent:!0,opacity:.68,depthWrite:!1,receiveShadow:!0}),pn(t,{name:"beauty-cell-worn-road-markings",roughness:.75,receiveShadow:!0}),pn(i,{name:"beauty-cell-road-puddles",roughness:.12,physical:!0,clearcoat:.92,clearcoatRoughness:.06,transparent:!0,opacity:.72,emissive:1587766,emissiveIntensity:.34,receiveShadow:!0}),pn(r,{name:"beauty-cell-road-aggregate",roughness:.96,receiveShadow:!0}),pn(s,{name:"beauty-cell-structural-concrete",roughness:.88,castShadow:!0,receiveShadow:!0}),pn(a,{name:"beauty-cell-layered-facades",roughness:.79,castShadow:!0,receiveShadow:!0}),pn(o,{name:"beauty-cell-metal-infrastructure",roughness:.39,metalness:.64,castShadow:!0,receiveShadow:!0}),pn(c,{name:"beauty-cell-laminated-glass",roughness:.13,metalness:.05,physical:!0,clearcoat:.75,clearcoatRoughness:.1,transparent:!0,opacity:.66}),pn(l,{name:"beauty-cell-working-signals",roughness:.2,emissive:4357992,emissiveIntensity:2.7,physical:!0,clearcoat:.48,clearcoatRoughness:.1}),pn(d,{name:"beauty-cell-spillway-water",roughness:.08,physical:!0,clearcoat:.96,clearcoatRoughness:.04,transparent:!0,opacity:.76,doubleSided:!0}),pn(h,{name:"beauty-cell-causal-foliage",roughness:.84,castShadow:!0,receiveShadow:!0}),pn(u,{name:"beauty-cell-human-flower-accents",roughness:.68,castShadow:!0})],f=new Ke;f.name="beauty-cell-ground",f.add(g,...m.slice(0,5),m[10]);const x=new Ke;x.name="beauty-cell-art-slice",x.add(f,...v,...m.slice(5,10),...m.slice(11),M_(),E_());const S=new Ms(16757854,5.5,145,2);S.name="beauty-cell-workbench-life-light",S.position.set(585,56,810),x.add(S);const y=new Ke;y.name="beauty-cell-contract-anchor",y.position.set(yt.x,0,yt.y),y.userData.interactionPoint={x:yt.x,y:yt.y},x.add(y);const E=A_(x);x.userData.schemaVersion=Nn.schemaVersion,x.userData.stableId=Nn.stableId,x.userData.seed=Nn.seed,x.userData.environmentKind=Nn.environmentKind,x.userData.visualGrammar=Nn.composition,x.userData.materialGrammar=Nn.materialGrammar,x.userData.generationProvenance=Nn.generationProvenance,x.userData.modules=Nn.modules.map(A=>({stableId:A.stableId,role:A.role,causalRule:A.causalRule,gameplayPromise:A.gameplayPromise})),x.userData.surfaceProvenance=p.provenance,x.userData.metrics=E,x.userData.spawnPosition={x:430,y:900},x.userData.playerCorridor=Nn.clearPlayerCorridor,x.userData.replacedTerrainIds=[...sh],x.userData.replacedPropIds=[...ah];let b=!1;return{group:x,ground:f,replacedTerrainIds:sh,replacedPropIds:ah,dispose(){b||(b=!0,x.removeFromParent(),x.traverse(A=>{A instanceof Ue&&(A.geometry.dispose(),Array.isArray(A.material)?A.material.forEach(_=>_.dispose()):A.material.dispose())}),p.dispose(),f.clear(),x.clear())}}}const Oe=Object.freeze({schemaVersion:"1.0.0",stableId:"concept-c-r04-live-v1",seed:1378890819,environmentProfile:"r04-live",cameraCompositionProfile:"r04",camera:Object.freeze({viewHeight:540,targetHeight:28,targetOffsetX:-76,targetOffsetZ:-82,followSpeed:6.4,exploreLookAhead:62,combatTargetWeight:.34,maximumCombatOffset:92}),display:Object.freeze({exposure:1.02,fogColor:11454907,fogNear:1420,fogFar:3200,groundWhiteMix:.08}),post:Object.freeze({tiltShiftFocus:.61,tiltShiftStrength:2.45}),actors:Object.freeze({heroScale:2.02,companionPreviewScale:1.36}),lighting:Object.freeze({skyColor:16773839,groundColor:2446919,skyIntensity:.34,keyColor:16767136,keyIntensity:3.28,keyOffsetX:-510,keyOffsetY:860,keyOffsetZ:210,shadowHalfExtent:560,shadowNormalBias:.68,rimColor:9234396,rimIntensity:.76,environmentIntensity:.19}),composition:Object.freeze({heroScreenAnchor:Object.freeze({x:.45,y:.62}),openRoute:Object.freeze({minimumX:390,maximumX:820,centerZ:900,halfWidth:82}),rule:"open-wet-route-with-edge-layered-ruins"}),generation:Object.freeze({mode:"deterministic-r04-scene-compiler",externalAssets:!1,referenceImageUsedAtRuntime:!1,causalColliderParity:!0})}),oi={concrete:[12239532,10004889,13223080,8361097],glass:[7186847,9683376,5406588],foliage:[2647626,4029516,6001232,7971926],flower:[15316837,15106156,15784331],repair:[12417105,13867873,8023640]},lh=[{colliderId:"town-hall",x:255,z:645,width:250,height:96,frontZ:720,columns:6,rows:3,seed:41},{colliderId:"south-house",x:265,z:1155,width:230,height:78,frontZ:1220,columns:5,rows:3,seed:87}],R_=Object.freeze({collisionRole:"non-solid-distant-ghost-scrim",worldBoundary:"west",maximumReachableX:0}),C_={"beauty-cell-wet-asphalt":"walkable-surface","beauty-cell-sidewalks-curbs":"walkable-low-surface","beauty-cell-worn-road-markings":"surface-decal","beauty-cell-road-puddles":"surface-fluid","beauty-cell-road-aggregate":"non-solid-debris","beauty-cell-structural-concrete":"non-solid-atmospheric","beauty-cell-layered-facades":"non-solid-atmospheric","beauty-cell-metal-infrastructure":"non-solid-atmospheric","beauty-cell-laminated-glass":"non-solid-transparent","beauty-cell-working-signals":"non-solid-effect","beauty-cell-spillway-water":"surface-fluid","beauty-cell-causal-foliage":"non-solid-ecology","beauty-cell-human-flower-accents":"non-solid-ecology","beauty-cell-transit-roof":"overhead-nonblocking"},P_=["beauty-cell-stair-retaining-shell","beauty-cell-far-left-shell","beauty-cell-far-right-shell","beauty-cell-world-space-anomaly"];function li(n,e,t=0){return(Math.imul(Math.trunc(n)+82,73856093)^Math.imul(Math.trunc(e)+772,19349663)^Math.imul(Math.trunc(t)+Oe.seed,83492791))>>>0}function it(n,e=0){return(n>>>e&1023)/1023}function Un(n,e){return n[e%n.length]??n[0]??16777215}function ch(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function In(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:!(e.transparent??!1),emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1},r=e.clearcoat===void 0?new ft(i):new vi({...i,clearcoat:e.clearcoat,clearcoatRoughness:e.clearcoatRoughness??.1}),s=new Ue(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function D_(n){const e=Oh.find(o=>o.id===n.colliderId);if(e===void 0||!e.solid)throw new Error(`R04 facade ${n.colliderId} has no authoritative collider.`);const t=Math.abs(n.frontZ-n.z),i={colliderId:n.colliderId,minimumX:n.x-n.width/2,maximumX:n.x+n.width/2,minimumZ:n.z-t,maximumZ:n.z+t},r=e.bounds.x+e.bounds.width,s=e.bounds.y+e.bounds.height,a=.001;if(i.minimumX<e.bounds.x-a||i.maximumX>r+a||i.minimumZ<e.bounds.y-a||i.maximumZ>s+a)throw new Error(`R04 facade ${n.colliderId} exceeds its authoritative collider.`);return i}function I_(n){n.removeFromParent(),n.geometry.dispose(),Array.isArray(n.material)?n.material.forEach(e=>e.dispose()):n.material.dispose()}function L_(n){n.removeFromParent(),n.traverse(e=>{e instanceof Ue&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())})}function N_(n){(Array.isArray(n.material)?n.material:[n.material]).forEach(t=>{t.transparent=!0,t.opacity=t instanceof ft&&t.metalness>.3?.48:.34,t.depthWrite=!1,t.needsUpdate=!0}),n.castShadow=!1,n.receiveShadow=!1}function U_(n){const e=[],t=[];return n.traverse(i=>{if(!(i instanceof Ue)||!i.name.startsWith("beauty-cell-"))return;const r=C_[i.name];if(r===void 0)throw new Error(`R04 inherited mesh ${i.name} has no causal classification.`);i.userData.r04CausalRole=r,e.push(i.name),r==="non-solid-atmospheric"&&(N_(i),i.userData.outsideSimulationAuthority=!0,t.push(i.name)),r==="overhead-nonblocking"&&(i.userData.minimumClearance=60)}),{classifiedMeshNames:e,ghostedMeshNames:t}}function z_(n){const e=[];for(const t of P_){const i=n.getObjectByName(t);if(i===void 0)throw new Error(`R04 expected inherited object ${t} is missing.`);L_(i),e.push(t)}return e}function O_(n,e,t){const i=Oe.composition.openRoute,r=i.centerZ-i.halfWidth,s=i.centerZ+i.halfWidth;ch(n,[i.minimumX,i.maximumX,r-8,r-3.6],1.31,7506816),ch(n,[i.minimumX,i.maximumX,s+3.6,s+8],1.31,6980216);for(const o of[r,s]){n.addBox({center:[(i.minimumX+i.maximumX)/2,2.1,o],size:[i.maximumX-i.minimumX,4.2,7],color:o===r?10859686:9544596});for(let c=0;c<19;c+=1){const l=i.minimumX+12+c*23;t.addBox({center:[l,1.52,o+(o===r?5.8:-5.8)],size:[13.5,.85,5.5],color:c%4===0?5599595:4218201})}}const a=[[414,866,52,18,-.08],[505,921,83,23,.07],[612,858,62,16,.12],[730,934,91,20,-.05],[796,875,38,14,.16]];for(const[o,c,l,d,h]of a)e.addBox({center:[o,1.64,c],size:[l,.2,d],rotation:[0,h,0],color:c>i.centerZ?8829102:7514015});for(let o=0;o<5;o+=1)for(let c=0;c<12;c+=1){const l=li(c,o,1028),d=405+c*35.2+(it(l,5)-.5)*3.2,h=842+o*29.4+(it(l,16)-.5)*2.6;t.addBox({center:[d,1.48+it(l,24)*.08,h],size:[29+it(l,3)*3,.18,22+it(l,12)*3],rotation:[0,(it(l,20)-.5)*.025,0],color:Un([3490623,4412495,5465181,7106397],l),shade:.62+it(l,8)*.18}),(o*12+c)%7===0&&t.addBox({center:[d+3,1.61,h-2],size:[17+it(l,14)*11,.16,1.1],rotation:[0,-.42+it(l,2)*.84,0],color:2505270})}for(let o=0;o<8;o+=1)t.addBox({center:[668+o*14,1.57,898],size:[8.5,.36,44-o%3*4],rotation:[0,(o-4)*.006,0],color:o%3===0?12691559:13748125,shade:.72})}function F_(n,e,t,i,r){const{x:s,z:a,width:o,height:c,frontZ:l,columns:d,rows:h,seed:u}=r;n.addBox({center:[s,c/2,a],size:[o,c,Math.abs(l-a)*2],color:Un(oi.concrete,u)}),n.addBox({center:[s,c+3,a],size:[o+10,6,Math.abs(l-a)*2+10],color:7374458});const p=Math.abs(l-a)*2,g=c+6.3;for(const[m,f,x,S]of[[s,a-p/2+4,o-12,4],[s,a+p/2-4,o-12,4],[s-o/2+4,a,4,p-12],[s+o/2-4,a,4,p-12]])t.addBox({center:[m,g+4.2,f],size:[x,8.4,S],color:5927016});for(let m=0;m<3;m+=1)for(let f=0;f<6;f+=1){const x=li(f,m,u+375),S=s-o*.36+f*(o*.145),y=a-p*.27+m*(p*.27);n.addBox({center:[S,g+.28,y],size:[o*.115,.42,p*.2],rotation:[0,(it(x,11)-.5)*.035,0],color:Un([7899772,8885895,10195575,6650739],x),shade:.78+it(x,19)*.16})}for(let m=0;m<4;m+=1){const f=li(m,u,1370),x=s-o*.23+m*o*.16,S=a-p*.12+m%2*p*.18;t.addBox({center:[x,g+5.6,S],size:[o*.115,2.4,4.2],color:4874075}),e.addBox({center:[x,g+8.3,S+3.5],size:[o*.1,1.1,p*.16],rotation:[-.14,0,0],color:m%2===0?4353906:5997952,shade:.86+it(f,13)*.12})}for(let m=0;m<12;m+=1){const f=li(m,u,1843),x=s-o*.38+it(f,4)*o*.76,S=a-p*.34+it(f,15)*p*.68,y=8+it(f,23)*12;i.addBox({center:[x,g+y/2,S],size:[1.1,y,1.1],rotation:[0,0,(it(f,8)-.5)*.24],color:2580290});for(let E=0;E<4;E+=1){const b=it(f^Math.imul(E+3,73244475),5)*Math.PI*2;i.addBox({center:[x+Math.cos(b)*3.4,g+3+E*(y/4),S+Math.sin(b)*3.4],size:[7.2,1.7,2.8],rotation:[0,-b,.16],color:Un(oi.foliage,f+E)})}}const v=o-32;for(let m=0;m<d;m+=1){const f=s-v/2+v/Math.max(1,d-1)*m;n.addBox({center:[f,c/2,l-1.1],size:[2.4,c-8,2.2],color:m%2===0?8689290:11055775,shade:.88})}for(let m=0;m<h;m+=1){const f=28+m*((c-38)/Math.max(1,h-1));for(let x=0;x<d;x+=1){const S=li(x,m,u);if(it(S,8)<.09)continue;const y=s-v/2+v/Math.max(1,d-1)*x;e.addBox({center:[y,f,l+1.2],size:[Math.min(28,v/d-5),17,2.2],color:Un(oi.glass,S),shade:.9+it(S,17)*.16}),t.addBox({center:[y,f+10,l+2.2],size:[Math.min(32,v/d),2.2,3.2],color:4217687})}t.addBox({center:[s,f-13,l+3.2],size:[o-18,3.5,4],color:m%2===0?6124652:8416854})}for(let m=0;m<Math.max(2,d-1);m+=1){const f=li(m,u,91),x=s-o*.34+m*o*.22;t.addBox({center:[x,23+m%2*2,l+10],size:[31,3.2,18],rotation:[.09,0,0],color:Un(oi.repair,f)}),n.addBox({center:[x+8,43+m*6,l+2.2],size:[17+it(f,4)*15,11,2],rotation:[0,0,(it(f,13)-.5)*.08],color:Un(oi.repair,f+1)})}for(let m=0;m<9;m+=1){const f=li(m,u,177),x=s-o/2+8+it(f,3)*(o-16),S=18+it(f,15)*(c*.7);i.addBox({center:[x,c-S/2,l+4],size:[1.6,S,1.6],rotation:[0,0,(it(f,22)-.5)*.18],color:2645827});for(let y=0;y<4;y+=1)i.addBox({center:[x+(y%2===0?-1:1)*(3+it(f,y+5)*4),c-8-y*(S/4),l+4.5],size:[9,2.4,5],rotation:[0,(y%2===0?-1:1)*.45,.12],color:Un(oi.foliage,f+y)})}}function B_(n,e){for(let t=0;t<9;t+=1){const i=li(t,903),r=535+t*92,s=42+it(i,4)*24,a=92+it(i,12)*72;n.addBox({center:[-8,a/2+18+t%3*8,r],size:[7,a,s],color:Un(oi.concrete,i),shade:.76+it(i,18)*.14});for(let o=0;o<4;o+=1)e.addBox({center:[-4.1,45+o*(a/5),r],size:[.8,2.4,s-8],color:o%2===0?7968395:10649442});e.addBox({center:[-4.1,a+20+t%3*8,r],size:[.8,4,s+6],color:7439482})}}function k_(n,e){[{count:82,minX:48,maxX:355,minZ:515,maxZ:760},{count:72,minX:75,maxX:385,minZ:1050,maxZ:1285},{count:64,minX:620,maxX:930,minZ:505,maxZ:730},{count:58,minX:650,maxX:955,minZ:1070,maxZ:1300}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=li(s,r,Oe.seed),o=i.minX+it(a,2)*(i.maxX-i.minX),c=i.minZ+it(a,13)*(i.maxZ-i.minZ),l=9+it(a,20)*24;n.addBox({center:[o,l/2+1.4,c],size:[1.2,l,1.2],rotation:[0,0,(it(a,7)-.5)*.22],color:2580290});for(let d=0;d<7;d+=1){const h=it(a^Math.imul(d+1,73244475),4)*Math.PI*2,u=4+it(a,d*4+3)*5.5;n.addBox({center:[o+Math.cos(h)*u*.4,5+d*(l/5),c+Math.sin(h)*u*.4],size:[u*1.22,1.9,u*.44],rotation:[0,-h,(it(a,d+19)-.5)*.3],color:Un(oi.foliage,a+d)})}s%19===0&&e.addBox({center:[o,l+2,c],size:[5.5,2.5,5.5],color:Un(oi.flower,a)})}})}function V_(){const n=new Ke;n.name="r04-composition-anchors";const e=new At;e.name="r04-open-route-anchor",e.position.set((Oe.composition.openRoute.minimumX+Oe.composition.openRoute.maximumX)/2,0,Oe.composition.openRoute.centerZ),e.userData.bounds={...Oe.composition.openRoute},n.add(e);const t=new At;return t.name="r04-contract-anchor",t.position.set(yt.x,0,yt.y),t.userData.interactionPoint={...yt},n.add(t),n}function H_(){const n=qf(),e=n.group.getObjectByName("beauty-cell-wet-road-film");e instanceof Ue&&I_(e);const t=z_(n.group),i=U_(n.group),r=Fh.find(x=>x.id===Ii);if(r===void 0)throw new Error("R04 simulation anomaly placement is missing.");const s=new He,a=new He,o=new He,c=new He,l=new He,d=new He,h=new He,u=new He,p=new He,g=new He,v=new He;O_(s,a,o);const m=lh.map(x=>{const S=D_(x);return F_(c,l,d,h,x),S});B_(g,v),k_(u,p);const f=[In(s,{name:"r04-low-collider-readable-drains-curbs",roughness:.84,receiveShadow:!0}),In(a,{name:"r04-localized-physical-puddles",roughness:.12,transparent:!0,opacity:.7,clearcoat:.96,clearcoatRoughness:.045,receiveShadow:!0}),In(o,{name:"r04-route-drains-and-worn-markings",roughness:.62,metalness:.18,receiveShadow:!0}),In(c,{name:"r04-layered-fixed-camera-facades",roughness:.88,castShadow:!0,receiveShadow:!0}),In(l,{name:"r04-window-bands",roughness:.2,metalness:.08,clearcoat:.72,clearcoatRoughness:.12}),In(d,{name:"r04-rails-awnings-roof-edges",roughness:.42,metalness:.58,castShadow:!0,receiveShadow:!0}),In(h,{name:"r04-facade-vines-repair-decals",roughness:.81,castShadow:!0}),In(u,{name:"r04-high-density-edge-vegetation",roughness:.82,castShadow:!0,receiveShadow:!0}),In(p,{name:"r04-foreground-flower-framing",roughness:.66,castShadow:!0}),In(g,{name:"r04-nonsolid-distant-ghost-scrims",roughness:.94,transparent:!0,opacity:.34,emissive:4745055,emissiveIntensity:.12}),In(v,{name:"r04-nonsolid-distant-scrim-frames",roughness:.78,metalness:.18,transparent:!0,opacity:.42,emissive:6124652,emissiveIntensity:.1})];f[3].userData.collisionRole="authoritative-collider-backed-facade",f[3].userData.authoritativeColliderIds=lh.map(({colliderId:x})=>x),f[3].userData.groundFootprints=m;for(const x of[f[9],f[10]])Object.assign(x.userData,R_,{outsideReachableWorld:!0});return n.ground.add(f[0],f[1],f[2]),n.group.add(...f.slice(3),V_()),n.group.name="r04-art-slice",n.ground.name="r04-ground",n.group.userData.schemaVersion=Oe.schemaVersion,n.group.userData.stableId=Oe.stableId,n.group.userData.seed=Oe.seed,n.group.userData.environmentProfile=Oe.environmentProfile,n.group.userData.compositionRule=Oe.composition.rule,n.group.userData.generationProvenance={...Oe.generation,source:"r02-causal-scene-plus-r04-procedural-presentation",solidFacadePolicy:"authoritative-collider-backed-only",decorativeFacadePolicy:"non-solid-scrims-outside-reachable-world",inheritedGeometryPolicy:"classified-or-rejected-at-construction",anomalyPolicy:"simulation-enemy-state-only"},n.group.userData.openRoute={...Oe.composition.openRoute},n.group.userData.removedLegacyWetFilm=!0,n.group.userData.removedUnboundInheritedObjects=t,n.group.userData.inheritedCausalAudit=i,n.group.userData.authoritativeAnomaly={id:r.id,initialX:r.x,initialZ:r.y,source:"simulation-enemy-state"},n.group.userData.contractBoardPosition={...yt},n.group.userData.replacedTerrainIds=[...n.replacedTerrainIds],n.group.userData.replacedPropIds=[...n.replacedPropIds],n}const G_=[.68,.32,.265,.69,.15,.06],W_=[.2289,.6917,.0793],X_=[.3127,.329],q_=new Ve().set(.4865709,.2656677,.1982173,.2289746,.6917385,.0792869,0,.0451134,1.0439444),Y_=new Ve().set(2.4934969,-.9313836,-.4027108,-.829489,1.7626641,.0236247,.0358458,-.0761724,.9568845),Pa="display-p3",Z_={primaries:G_,whitePoint:X_,transfer:ht,toXYZ:q_,fromXYZ:Y_,luminanceCoefficients:W_,outputColorSpaceConfig:{drawingBufferColorSpace:Pa}};({...tt.spaces[jt]});const K_=1.18;function j_(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(color-gamut: p3)").matches}function J_(n,e=K_){n.toneMapping=qa,n.toneMappingExposure=e,n.outputColorSpace=jt;let t="srgb";const i=n.getContext();if(j_()&&"drawingBufferColorSpace"in i){tt.define({[Pa]:Z_});try{n.outputColorSpace=Pa,i.drawingBufferColorSpace===Pa?t="display-p3":n.outputColorSpace=jt}catch{n.outputColorSpace=jt}}return n.domElement.dataset.outputGamut=t,n.domElement.dataset.toneMapping="agx",n.domElement.dataset.toneMappingExposure=e.toFixed(2),{gamut:t,toneMapping:"agx",exposure:e}}const Da=Object.freeze({x:510,y:680,z:510}),Q_=46,$_=.38,eM=72;function tM(n,e,t=Da){const i=Math.hypot(t.x,t.z);if(i<=Number.EPSILON)return{moveX:n,moveY:e};const r=t.z/i,s=-t.x/i,a=t.x/i,o=t.z/i;return{moveX:n*r+e*a,moveY:n*s+e*o}}function nM(n,e,t="-z"){return t==="+z"?Math.atan2(n,e):Math.atan2(-n,-e)}function dh(n,e="north-star"){if(e==="baseline")return{mode:"centered",targetX:n.playerX,targetY:n.playerY};const t=Math.hypot(n.facingX,n.facingY),i=t>Number.EPSILON?n.facingX/t:0,r=t>Number.EPSILON?n.facingY/t:-1,s=n.phase!==void 0&&n.phase!=="idle"&&Number.isFinite(n.targetX)&&Number.isFinite(n.targetY),a=e==="r04"?Oe.camera.exploreLookAhead:Q_,o=e==="r04"?Oe.camera.combatTargetWeight:$_,c=e==="r04"?Oe.camera.maximumCombatOffset:eM;if(!s)return{mode:"explore",targetX:n.playerX+i*a,targetY:n.playerY+r*a};const l=iM(n.targetX-n.playerX,n.targetY-n.playerY,c);return{mode:"combat",targetX:n.playerX+l.x*o,targetY:n.playerY+l.y*o}}function iM(n,e,t){const i=Math.hypot(n,e);if(i<=t||i<=Number.EPSILON)return{x:n,y:e};const r=t/i;return{x:n*r,y:e*r}}const gn=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],rM=["matte","metal","emissive"],sM={head:{x:12,y:23.5,z:7.5},torso:{x:12,y:14,z:8},"left-arm":{x:7.5,y:21.5,z:7},"right-arm":{x:16.5,y:21.5,z:7},"left-leg":{x:8.5,y:13,z:7},"right-leg":{x:15,y:13,z:7},equipment:{x:12,y:16,z:10}};function uh(n,e){return Number.isFinite(n)?Rt.clamp(n??e,0,1):e}function il(n){return n*n*(3-2*n)}function hh(n=[0,0,0],e=[0,0,0],t=[1,1,1]){return{position:n,rotation:e,scale:t}}function Yf(n){const e=n.paletteId==="pack-pale"||n.paletteId==="cyan"||n.paletteId==="amber",t=n.z>=9&&n.y>=15&&n.x>=5&&n.x<=15,i=n.z<=5&&n.y>=15&&n.y<=22&&n.paletteId==="rust",r=n.z>=8&&n.y>=10&&n.y<=14&&(n.paletteId==="cloth-sage"||n.paletteId==="cloth-dark");return e||t||i||r?"equipment":n.y>=24?"head":n.y>=13&&n.x<=8?"left-arm":n.y>=13&&n.x>=16?"right-arm":n.y<=12&&n.x<=11?"left-leg":n.y<=12?"right-leg":"torso"}function aM(n=kr,e=Yf){const t={head:[],torso:[],"left-arm":[],"right-arm":[],"left-leg":[],"right-leg":[],equipment:[]};for(const i of n.voxels)t[e(i,n)].push(i);return Object.fromEntries(gn.map(i=>[i,{schemaVersion:2,id:`${n.id}-${i}`,name:`${n.name} / ${i}`,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:t[i],anchors:[],validation:{minVoxelCount:0,maxVoxelCount:n.voxels.length,requireGroundContact:!1,requireConnectedBody:!1}}]))}function oM(n){switch(n){case"matte":return new vi({color:16777215,vertexColors:!0,roughness:.72,metalness:0,sheen:.24,sheenColor:13624796,sheenRoughness:.88});case"metal":return new vi({color:16777215,vertexColors:!0,roughness:.28,metalness:.82,clearcoat:.12,clearcoatRoughness:.42});case"emissive":return new Pt({color:16777215,vertexColors:!0,toneMapped:!1})}}function lM(n,e,t){return new I((e.x-n.dimensions.width/2)*t,e.y*t,(e.z-n.dimensions.depth/2)*t)}function cM(n,e,t){const i=Pf(n,{voxelSize:e,shadeFaces:!1,origin:{x:-(n.dimensions.width*e)/2-t.x,y:-t.y,z:-(n.dimensions.depth*e)/2-t.z}}),r=new Et;return r.setAttribute("position",new Ht(i.positions,3)),r.setAttribute("normal",new Ht(i.normals,3)),r.setAttribute("color",new Ht(i.colors,3)),r.setIndex(new Ht(i.indices,1)),i.materialGroups.forEach((s,a)=>{r.addGroup(s.start,s.count,a)}),r.computeBoundingSphere(),{geometry:r,roles:i.materialGroups.map(s=>s.role)}}function fh(n,e,t,i){const r=cM(n,e,t),s=new Ue(r.geometry,r.roles.map(a=>i[a]));return s.name=n.id,s.castShadow=!0,s.receiveShadow=!0,s}function Zf(n){const e=Number.isFinite(n.timeSeconds)?n.timeSeconds:0,t=uh(n.progress,0),i=uh(n.moveAmount,1),r=Math.sin(e*2.15),s=[0,r*.32,0],a=[0,0,0],o={head:[r*.012,Math.sin(e*.72)*.035,0],torso:[.018+r*.008,0,0],"left-arm":[-.025-r*.018,0,-.035],"right-arm":[.025+r*.018,0,.035],"left-leg":[0,0,0],"right-leg":[0,0,0],equipment:[-r*.008,0,0]},c={head:[1,1,1],torso:[1,1,1],"left-arm":[1,1,1],"right-arm":[1,1,1],"left-leg":[1,1,1],"right-leg":[1,1,1],equipment:[1,1,1]};switch(n.motion){case"idle":break;case"run":{const d=Math.sin(e*10.5)*i;s[1]+=Math.abs(Math.cos(e*10.5))*1.25*i,o.torso[0]+=.1*i,o.torso[1]=Math.cos(e*10.5)*.09*i,o.head[1]-=o.torso[1]*.55,o["left-leg"][0]=d*.68,o["right-leg"][0]=-d*.68,o["left-arm"][0]=-d*.5,o["right-arm"][0]=d*.5,o.equipment[0]-=.08*i+Math.abs(d)*.035;break}case"windup":{const d=il(t);o.torso[1]=-.42*d,o.torso[2]=.08*d,o["right-arm"][0]=-1.18*d,o["right-arm"][2]=-.25*d,o["left-arm"][0]=.38*d,o.head[1]=.2*d,o["left-leg"][0]=-.12*d,o["right-leg"][0]=.16*d;break}case"hit":{const d=il(t);o.torso[1]=Rt.lerp(-.42,.34,d),o["right-arm"][0]=Rt.lerp(-1.18,1.46,d),o["right-arm"][2]=Rt.lerp(-.25,.2,d),o["left-arm"][0]=Rt.lerp(.38,-.2,d),o.head[1]=-o.torso[1]*.42,s[2]-=Math.sin(t*Math.PI)*2.8;break}case"recovery":{const d=1-il(t);o.torso[1]=.34*d,o["right-arm"][0]=1.46*d,o["right-arm"][2]=.2*d,o["left-arm"][0]=-.2*d,o.head[1]=-.14*d;break}case"hurt":{const d=Math.sin(t*Math.PI);s[2]+=d*7.5,a[2]=Math.sin(t*Math.PI*2)*.06,o.torso[0]=-.34*d,o.head[0]=.28*d,o["left-arm"][0]=-.62*d,o["right-arm"][0]=-.78*d;break}case"skill":{const d=Math.sin(t*Math.PI);s[1]-=d*2.6,o.torso[0]=-.18*d,o.head[0]=.14*d,o["left-arm"][0]=.72*d,o["right-arm"][0]=.72*d,o["left-arm"][2]=-.92*d,o["right-arm"][2]=.92*d,o["left-leg"][0]=-.15*d,o["right-leg"][0]=.15*d,c.equipment=[1+d*.07,1+d*.07,1+d*.07];break}}const l=Object.fromEntries(gn.map(d=>[d,hh([0,0,0],o[d],c[d])]));return{root:hh(s,a),parts:l}}function Ga(n,e){const t=new I(e.x,e.y,e.z).multiply(n.scale).applyQuaternion(n.quaternion);n.position.copy(t).multiplyScalar(-1)}function dM(n={}){const e=n.recipe??kr,t=n.voxelSize??no,i=n.mode??"articulated";if(!Number.isFinite(t)||t<=0)throw new RangeError("Hero voxel size must be a positive finite number.");const r=new Set,s=Object.fromEntries(rM.map(S=>{const y=n.materials?.[S],E=y??oM(S);return y===void 0&&r.add(E),[S,E]})),a=new Ke;a.name=`${e.id}-visual`;const o=new Ke;o.name=`${e.id}-motion`,a.add(o);const c=Object.fromEntries(gn.map(S=>[S,lM(e,sM[S],t)])),l=Object.fromEntries(gn.map(S=>{const y=new Ke;return y.name=`${e.id}-${S}-pivot`,[S,y]})),d=Object.fromEntries(gn.map(S=>[S,new I])),h=c.torso;for(const S of gn){const y=S==="head"||S==="left-arm"||S==="right-arm"||S==="equipment"?l.torso:o;y.add(l[S]),d[S].copy(c[S]),y===l.torso&&d[S].sub(h),l[S].position.copy(d[S])}let p=Object.fromEntries(gn.map(S=>[S,null])),g=null;const v=[];if(i==="articulated"){const S=aM(e,n.classifyVoxel??Yf);p=Object.fromEntries(gn.map(y=>{const E=fh(S[y],t,c[y],s);return v.push(E.geometry),l[y].add(E),[y,E]}))}else{g=fh(e,t,new I,s),v.push(g.geometry),o.add(g);for(const S of gn)l[S].visible=!1}const m=to(e,"weapon",t),f=new Ke;f.name=`${e.id}-weapon-socket`,i==="articulated"?(l["right-arm"].add(f),f.position.set(m.x-c["right-arm"].x,m.y-c["right-arm"].y,m.z-c["right-arm"].z)):(o.add(f),f.position.set(m.x,m.y,m.z));const x={root:a,motionRoot:o,mode:i,partGroups:l,partMeshes:p,mergedMesh:g,weaponSocket:f,materials:s,updatePose(S){const y=Zf(S);o.position.set(...y.root.position),o.rotation.set(...y.root.rotation),o.scale.set(...y.root.scale);for(const E of gn){const b=y.parts[E],A=l[E];A.position.set(d[E].x+b.position[0],d[E].y+b.position[1],d[E].z+b.position[2]),A.rotation.set(...b.rotation),A.scale.set(...b.scale)}i==="merged"&&f.rotation.set(...y.parts["right-arm"].rotation)},attachWeapon(S,y={x:0,y:0,z:0}){f.add(S),Ga(S,y)},setTint(S){for(const[y,E]of Object.entries(s))(E instanceof ft||E instanceof Pt)&&(E.color.set(S),y==="emissive"&&E instanceof Pt&&E.color.multiplyScalar(2.15))},dispose(){for(const S of v)S.dispose();for(const S of r)S.dispose();a.removeFromParent()}};return x.updatePose({motion:"idle",timeSeconds:0}),x}const Jr=new I;function bn(n,e,t,i,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),c=Math.PI/4;Jr.copy(e),Jr[i]=0,Jr.normalize();const l=.5*a/(a+o),d=1-Jr.angleTo(n)/c;return Math.sign(Jr[t])===1?d*l:o/(a+o)+l+l*(1-d)}class ao extends cn{constructor(e=1,t=1,i=1,r=2,s=.1){const a=r*2+1;if(s=Math.min(e/2,t/2,i/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:r,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new I,l=new I,d=new I(e,t,i).divideScalar(2).subScalar(s),h=this.attributes.position.array,u=this.attributes.normal.array,p=this.attributes.uv.array,g=h.length/6,v=new I,m=.5/a;for(let f=0,x=0;f<h.length;f+=3,x+=2)switch(c.fromArray(h,f),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),h[f+0]=d.x*Math.sign(c.x)+l.x*s,h[f+1]=d.y*Math.sign(c.y)+l.y*s,h[f+2]=d.z*Math.sign(c.z)+l.z*s,u[f+0]=l.x,u[f+1]=l.y,u[f+2]=l.z,Math.floor(f/g)){case 0:v.set(1,0,0),p[x+0]=bn(v,l,"z","y",s,i),p[x+1]=1-bn(v,l,"y","z",s,t);break;case 1:v.set(-1,0,0),p[x+0]=1-bn(v,l,"z","y",s,i),p[x+1]=1-bn(v,l,"y","z",s,t);break;case 2:v.set(0,1,0),p[x+0]=1-bn(v,l,"x","z",s,e),p[x+1]=bn(v,l,"z","x",s,i);break;case 3:v.set(0,-1,0),p[x+0]=1-bn(v,l,"x","z",s,e),p[x+1]=1-bn(v,l,"z","x",s,i);break;case 4:v.set(0,0,1),p[x+0]=1-bn(v,l,"x","y",s,e),p[x+1]=1-bn(v,l,"y","x",s,t);break;case 5:v.set(0,0,-1),p[x+0]=bn(v,l,"x","y",s,e),p[x+1]=1-bn(v,l,"y","x",s,t);break}}static fromJSON(e){return new ao(e.width,e.height,e.depth,e.segments,e.radius)}}function Wa(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new Et;let l=0;for(let d=0;d<n.length;++d){const h=n[d];let u=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(h.morphAttributes[p])}if(e){let p;if(t)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,d),l+=p}}if(t){let d=0;const h=[];for(let u=0;u<n.length;++u){const p=n[u].index;for(let g=0;g<p.count;++g)h.push(p.getX(g)+d);d+=n[u].attributes.position.count}c.setIndex(h)}for(const d in s){const h=ph(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,h)}for(const d in a){const h=a[d][0].length;if(h!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let u=0;u<h;++u){const p=[];for(let v=0;v<a[d].length;++v)p.push(a[d][v][u]);const g=ph(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(g)}}}return c}function ph(n){let e,t,i,r=-1,s=0;for(let l=0;l<n.length;++l){const d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=d.gpuType),r!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.count*t}const a=new e(s),o=new Ht(a,t,i);let c=0;for(let l=0;l<n.length;++l){const d=n[l];if(d.isInterleavedBufferAttribute){const h=c/t;for(let u=0,p=d.count;u<p;u++)for(let g=0;g<t;g++){const v=d.getComponent(u,g);o.setComponent(u+h,g,v)}}else a.set(d.array,c);c+=d.count*t}return r!==void 0&&(o.gpuType=r),o}const mh=Object.freeze({schemaVersion:1,id:"actor.beauty-cell.field-surveyor-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-surveyor-7429",rigFamily:"humanoid-v1",representation:"grid-quantized-modular-3d",unitStep:.25,role:"reclamation field surveyor",silhouette:["asymmetric storm mantle","compact analysis pack","offset sensor mast","armored field boots"],materialGrammar:["waxed teal cloth","warm ceramic shell","brushed utility metal","cyan and amber diagnostic light"],provenance:{source:"procedural runtime geometry",externalAssets:!1,conceptImageUsedAtRuntime:!1}}),gh=Object.freeze({schemaVersion:1,id:"companion.beauty-cell.survey-hound-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-hound-3118",role:"recoverable terrain-analysis unit",bodyPlan:"four-legged survey robot",provenance:{source:"procedural runtime geometry",externalAssets:!1}});class di{buckets=new Map;add(e,t,i){const r=t.index===null?t:t.toNonIndexed();r!==t&&(t.dispose(),t=r),t.deleteAttribute("uv");const s=i.position.map(Ln),a=i.rotation??[0,0,0],o=(i.scale??[1,1,1]).map(Ln),c=new st().compose(new I(...s),new Tn().setFromEuler(new yn(...a)),new I(...o));t.applyMatrix4(c);const l=this.buckets.get(e)??[];return l.push(t),this.buckets.set(e,l),this}rounded(e,t,i,r,s=.8){const[a,o,c]=t.map(Ln);return this.add(e,new ao(a,o,c,2,Math.min(s,a*.24,o*.24,c*.24)),{position:i,rotation:r})}capsule(e,t,i,r,s,a){const o=Ln(t),c=Ln(i);return this.add(e,new Za(o,Math.max(.25,c-o*2),4,10),{position:r,rotation:s,scale:a})}sphere(e,t,i,r){return this.add(e,new Ja(Ln(t),14,9),{position:i,scale:r})}cylinder(e,t,i,r,s,a,o=10){return this.add(e,new Ka(Ln(t),Ln(i),Ln(r),o,1),{position:s,rotation:a})}torus(e,t,i,r,s,a){return this.add(e,new Qa(Ln(t),Ln(i),6,16),{position:r,rotation:s,scale:a})}build(e,t){const i=[...this.buckets.keys()];if(i.length===0)throw new Error(`Cannot build empty actor part: ${e}`);const r=[];for(const o of i){const c=this.buckets.get(o);if(c===void 0)continue;const l=Wa(c,!1);for(const d of c)d.dispose();if(l===null)throw new Error(`Failed to merge actor material group: ${e}`);r.push(l)}const s=Wa(r,!0);for(const o of r)o.dispose();if(s===null)throw new Error(`Failed to merge actor part: ${e}`);s.computeBoundingBox(),s.computeBoundingSphere();const a=new Ue(s,i.map(o=>t[o]));return a.name=e,a.castShadow=!0,a.receiveShadow=!0,a}}function Ln(n){return Math.round(n*4)/4}function Yn(n,e={}){return new vi({color:n,...e})}function rl(n,e){return new Pt({color:new De(n).multiplyScalar(e),toneMapped:!1})}function od(){const n={skin:Yn(13207144,{roughness:.52,sheen:.12,sheenColor:16767172,sheenRoughness:.75}),hair:Yn(1516842,{roughness:.48,sheen:.52,sheenColor:5934222,sheenRoughness:.66}),under:Yn(1515814,{roughness:.64}),cloth:Yn(3108972,{roughness:.72,sheen:.46,sheenColor:9163204,sheenRoughness:.82}),clothDark:Yn(1588032,{roughness:.8,sheen:.28,sheenColor:7053208,sheenRoughness:.9}),shell:Yn(14209725,{roughness:.38,clearcoat:.24,clearcoatRoughness:.7}),metal:Yn(6716288,{roughness:.27,metalness:.86,clearcoat:.12,clearcoatRoughness:.36}),copper:Yn(11293753,{roughness:.32,metalness:.68}),rubber:Yn(857625,{roughness:.9}),glass:Yn(1654088,{roughness:.12,metalness:.18,clearcoat:1,clearcoatRoughness:.08}),cyan:rl(6485217,2.7),amber:rl(16758093,2.35),coral:rl(16741460,2.1)},e=new Map;for(const t of Object.values(n))(t instanceof Pt||t instanceof ft)&&e.set(t,t.color.clone());return{byId:n,contract:{matte:n.cloth,metal:n.metal,emissive:n.cyan},originals:e,owned:new Set(Object.values(n))}}function uM(n){const e=new di().capsule("skin",5.1,10.5,[0,5,1.4],void 0,[.92,1,.88]).sphere("hair",5.8,[0,7.2,-1.35],[1,1.02,.82]).rounded("hair",[9.5,3.5,3],[0,10.25,1.15],[.08,0,0],1.2).capsule("hair",1.45,9,[-5,3.4,-.5],[.08,0,-.18]).capsule("hair",1.7,12.5,[4.7,2.1,-1],[-.08,0,.12]).rounded("glass",[8.5,1.4,.8],[0,6.3,6.15],[0,0,-.04],.38).rounded("cyan",[2.2,.45,.3],[2.35,6.3,6.65],void 0,.12).rounded("copper",[1.25,3.2,1.5],[-5.2,5.25,.8],[0,0,.18],.4).rounded("shell",[7,1.4,4.2],[0,-.75,0],void 0,.45).build("beauty-hero-head",n),t=new di().rounded("under",[12,17,7.5],[0,5,0],void 0,2.4).rounded("cloth",[7,14.5,2.2],[-3.7,5.5,4.1],[0,0,-.08],1.05).rounded("clothDark",[6.3,14,2.1],[3.5,5.2,4.15],[0,0,.06],1).rounded("shell",[15.5,4.2,7.8],[0,12.2,-.1],void 0,1.5).rounded("under",[13.2,4.6,7.8],[0,-4.5,0],void 0,1.2).rounded("copper",[1.1,12.2,.85],[-1.2,5.2,5.45],[-.04,0,.11],.3).rounded("metal",[7.4,2.1,1],[2.2,9.2,5.25],[.02,0,-.06],.42).rounded("cyan",[3.1,.65,.35],[3.5,9.2,5.85],void 0,.16).rounded("amber",[1.1,1.1,.35],[.3,-2.8,5.15],void 0,.22).build("beauty-hero-torso",n);function i(a){const o=a<0?"left":"right",c=new di().sphere(a<0?"cloth":"clothDark",3.7,[0,-1.2,0],[1,.82,1]).capsule(a<0?"cloth":"clothDark",2.7,11,[0,-6.5,0],[.02,0,a*.035]).capsule("under",2.3,9.5,[0,-15.1,.3],[-.04,0,a*.025]).rounded("metal",[5.2,5.8,5.1],[0,-12.7,.8],void 0,1.2).capsule("rubber",2.35,5.2,[0,-20.3,.5]).rounded("shell",[4.3,2.8,4.7],[0,-19,.7],void 0,.9);return a<0?c.rounded("glass",[5.6,1.2,1.4],[-.2,-12.3,3.4],[.08,0,0],.38).rounded("cyan",[3.6,.42,.28],[-.2,-12.3,4.18],[.08,0,0],.12):c.rounded("amber",[1.4,2.8,.32],[2,-12.5,3.5],void 0,.18),c.build(`beauty-hero-${o}-arm`,n)}function r(a){const o=a<0?"left":"right";return new di().capsule("under",3.8,14.5,[0,-7.2,0],[.03,0,a*.025],[1,1,.92]).rounded(a<0?"cloth":"clothDark",[7.7,10.5,7],[0,-5.4,0],void 0,1.9).rounded("shell",[7.2,5.3,6.6],[0,-13,1.1],[.05,0,0],1.45).capsule("under",3.1,12,[0,-20.2,0],[-.035,0,0]).rounded("rubber",[8.2,7.2,11.2],[0,-27,1.65],[.03,0,0],1.8).rounded("metal",[7.5,2,8.8],[0,-24.2,1],void 0,.65).rounded(a<0?"cyan":"amber",[1.2,3.2,.35],[a*2.8,-23.8,5.55],void 0,.16).build(`beauty-hero-${o}-leg`,n)}const s=new di().rounded("cloth",[10.5,18,2.2],[-6,-1,-3.9],[.13,-.08,-.08],1).rounded("clothDark",[7.6,16,2],[4.5,-2.2,-4],[.18,.08,.08],.9).rounded("shell",[11.8,15,5.8],[0,5.5,-6.1],[-.05,0,0],2).rounded("metal",[8.6,8.2,1.8],[0,6,-9.4],void 0,.8).cylinder("metal",.85,1,15.5,[6,14,-6],[0,0,-.08],8).sphere("glass",2.1,[6.9,21.5,-5.7],[.8,1,.8]).rounded("cyan",[1.2,2.2,.5],[7,21.6,-3.95],void 0,.22).cylinder("copper",1.25,1.25,8.2,[-7,1.4,-6.6],[0,0,.04],10).rounded("metal",[5.4,7.2,4.6],[7.2,-3.5,0],[0,0,-.06],1.1).rounded("coral",[.5,2.8,.28],[9.95,-3.4,1.4],void 0,.12).build("beauty-hero-equipment",n);return{head:e,torso:t,"left-arm":i(-1),"right-arm":i(1),"left-leg":r(-1),"right-leg":r(1),equipment:s}}function Kf(n,e){const t=new De(e);for(const[i,r]of n.originals)(i instanceof Pt||i instanceof ft)&&i.color.copy(r).multiply(t)}function jf(){const n=od(),e=new Ke;e.name=mh.id,e.userData.assetDNA=mh;const t=new Ke;t.name="beauty-hero-motion",e.add(t);const i=Object.fromEntries(gn.map(c=>{const l=new Ke;return l.name=`beauty-hero-${c}-pivot`,[c,l]})),r={head:new I(0,21,0),torso:new I(0,34,0),"left-arm":new I(-10,14,0),"right-arm":new I(10,14,0),"left-leg":new I(-4.8,30,0),"right-leg":new I(4.8,30,0),equipment:new I(0,0,0)};t.add(i.torso,i["left-leg"],i["right-leg"]),i.torso.position.copy(r.torso),i["left-leg"].position.copy(r["left-leg"]),i["right-leg"].position.copy(r["right-leg"]);for(const c of["head","left-arm","right-arm","equipment"])i.torso.add(i[c]),i[c].position.copy(r[c]);const s=uM(n.byId);for(const c of gn)i[c].add(s[c]);const a=new Ke;a.name="beauty-hero-right-hand-socket",a.position.set(0,-21.5,1.2),i["right-arm"].add(a);const o={root:e,motionRoot:t,mode:"articulated",partGroups:i,partMeshes:s,mergedMesh:null,weaponSocket:a,materials:n.contract,updatePose(c){const l=Zf(c);t.position.set(...l.root.position),t.rotation.set(...l.root.rotation),t.scale.set(...l.root.scale);for(const h of gn){const u=l.parts[h];i[h].position.set(r[h].x+u.position[0],r[h].y+u.position[1],r[h].z+u.position[2]),i[h].rotation.set(...u.rotation),i[h].scale.set(...u.scale)}const d=Rt.clamp(c.moveAmount??0,0,1);i.equipment.rotation.x+=Math.sin(c.timeSeconds*5.8)*(.018+d*.025),i.head.rotation.y+=Math.sin(c.timeSeconds*.7)*.018},attachWeapon(c,l={x:0,y:0,z:0}){a.add(c),Ga(c,l)},setTint(c){Kf(n,c)},dispose(){for(const c of Object.values(s))c.geometry.dispose();for(const c of n.owned)c.dispose();e.removeFromParent()}};return o.updatePose({motion:"idle",timeSeconds:0}),o}function hM(){const n=od(),e=new Ke;e.name=gh.id,e.userData.assetDNA=gh;const t=new Ke;t.name="beauty-companion-motion",e.add(t);const i=[],r=new di().rounded("shell",[22,11,13],[0,15,0],void 0,2.8).rounded("metal",[17,4,10],[0,10,0],void 0,1.2).rounded("cloth",[11,6,9],[-3,20.5,-.5],void 0,1.4).rounded("copper",[2,7,9.5],[5.2,17.5,0],void 0,.55).rounded("cyan",[6,.65,.35],[-3,21.6,4.6],void 0,.18).build("beauty-companion-body",n.byId);i.push(r),t.add(r);const s=new Ke;s.name="beauty-companion-sensor-head",s.position.set(0,17,8.5);const a=new di().rounded("shell",[13,9,10],[0,0,0],[-.1,0,0],2.3).rounded("glass",[9,2,.9],[0,1,5.1],void 0,.5).rounded("cyan",[6.6,.55,.32],[0,1,5.65],void 0,.16).cylinder("metal",.6,.75,8,[4.3,7.2,-1],[0,0,-.13],8).sphere("amber",1.1,[4.8,11,-.9]).build("beauty-companion-head",n.byId);i.push(a),s.add(a),t.add(s);const o=[new Ke,new Ke,new Ke,new Ke],c=[[-7.2,12,4.5],[7.2,12,4.5],[-7.2,12,-4.5],[7.2,12,-4.5]];for(let l=0;l<o.length;l+=1){const d=o[l],h=c[l];if(d===void 0||h===void 0)continue;d.name=`beauty-companion-leg-${l+1}`,d.position.set(h[0],h[1],h[2]);const u=new di().capsule("metal",1.6,9.5,[0,-4,0],[0,0,l%2===0?-.13:.13]).rounded("shell",[4.5,4.2,5],[0,-7.5,.4],void 0,1).capsule("rubber",1.45,8,[0,-11.8,1.6],[.35,0,0]).rounded("rubber",[5.2,2.8,7],[0,-15.2,3],[.08,0,0],.9).rounded(l<2?"cyan":"amber",[.55,2.2,.3],[2.35,-7.4,1.5],void 0,.12).build(`beauty-companion-leg-mesh-${l+1}`,n.byId);i.push(u),d.add(u),t.add(d)}return{root:e,motionRoot:t,sensorHead:s,legGroups:o,updatePose({timeSeconds:l,moveAmount:d=0,reaction:h=0}){const u=Rt.clamp(d,0,1),p=Rt.clamp(h,0,1);t.position.y=Math.sin(l*3.2)*.45,t.rotation.z=Math.sin(l*2.1)*.012,s.rotation.y=Math.sin(l*1.15)*.22,s.rotation.x=-.06+Math.sin(l*1.9)*.035;for(let g=0;g<o.length;g+=1){const v=g===0||g===3?0:Math.PI,m=o[g];m!==void 0&&(m.rotation.x=Math.sin(l*8.2+v)*.4*u)}e.scale.setScalar(1+Math.sin(p*Math.PI)*.035)},setTint(l){Kf(n,l)},dispose(){for(const l of i)l.geometry.dispose();for(const l of n.owned)l.dispose();e.removeFromParent()}}}function xh(n){const e=od(),t=new Ke;t.name=n==="blade"?"resonance-seam-cutter":"coil-anchor-driver",t.userData.kind=n,t.userData.gripAnchor={x:0,y:0,z:0},t.userData.longAxis="-Y";const i=new di().rounded("rubber",[4.2,8,4.4],[0,-3,0],void 0,1).rounded("metal",[5.8,6.8,5.6],[0,-9.2,0],void 0,1.25).rounded("copper",[1.1,5,5.9],[2.8,-9.2,0],void 0,.3);n==="blade"?i.rounded("metal",[5.5,24,2.8],[0,-24,0],void 0,.75).rounded("shell",[3.8,18,3.5],[0,-22,0],void 0,.8).rounded("cyan",[.7,22,.38],[2.2,-24,1.65],void 0,.15).rounded("amber",[3,1.1,.35],[0,-14,2],void 0,.16):i.rounded("metal",[8,20,8],[0,-21,0],void 0,1.6).rounded("shell",[6.5,12,8.8],[0,-18,0],void 0,1.4).cylinder("copper",4.4,4.4,2,[0,-16.5,0],void 0,12).cylinder("copper",4.4,4.4,2,[0,-23,0],void 0,12).rounded("coral",[1,8,.4],[4.2,-21,2.5],void 0,.18).rounded("metal",[3.8,12,3.8],[0,-36,0],void 0,.7);const r=i.build(`${t.name}-mesh`,e.byId);return t.add(r),t.userData.dispose=()=>{r.geometry.dispose();for(const s of e.owned)s.dispose();t.removeFromParent()},t}const da=Object.freeze({schemaVersion:1,id:"actor.r04.mio-field-engineer-01",generatorVersion:"procedural-stylized-hero-r04-v1",seed:"mio-r04-augmented-surveyor-0417",rigFamily:"humanoid-v1",representation:"realtime-articulated-procedural-3d",frontAxis:"+Z",role:"reclamation field engineer",characterRead:["cute young woman with an alert, optimistic expression","slightly oversized head and slim field-ready silhouette","layered dark hair with a rust textile tie","pale expedition coat over a technical under-suit","compact analysis pack and asymmetrical SF tools"],faceGrammar:["large white-and-amber eyes","independent brows","readable mouth and cheek color","procedural blink and action expressions"],provenance:{source:"procedural runtime geometry",externalAssets:!1,r03SpriteUsedAtRuntime:!1}});class yi{buckets=new Map;add(e,t,i){const r=t.index===null?t:t.toNonIndexed();r!==t&&(t.dispose(),t=r),t.deleteAttribute("uv"),t.applyMatrix4(new st().compose(new I(...i.position),new Tn().setFromEuler(new yn(...i.rotation??[0,0,0])),new I(...i.scale??[1,1,1])));const s=this.buckets.get(e)??[];return s.push(t),this.buckets.set(e,s),this}rounded(e,t,i,r,s=.6){const[a,o,c]=t;return this.add(e,new ao(a,o,c,3,Math.min(s,a*.24,o*.24,c*.24)),{position:i,rotation:r})}capsule(e,t,i,r,s,a){return this.add(e,new Za(t,Math.max(.2,i-t*2),6,14),{position:r,rotation:s,scale:a})}sphere(e,t,i,r){return this.add(e,new Ja(t,20,14),{position:i,scale:r})}cylinder(e,t,i,r,s){return this.add(e,new Ka(t,t,i,14,1),{position:r,rotation:s})}build(e,t){const i=[...this.buckets.keys()];if(i.length===0)throw new Error(`Cannot build empty R04 detail mesh: ${e}`);const r=[];for(const o of i){const c=this.buckets.get(o);if(c===void 0)continue;const l=Wa(c,!1);for(const d of c)d.dispose();if(l===null)throw new Error(`Failed to merge R04 material group: ${e}`);r.push(l)}const s=Wa(r,!0);for(const o of r)o.dispose();if(s===null)throw new Error(`Failed to merge R04 detail mesh: ${e}`);s.computeBoundingBox(),s.computeBoundingSphere();const a=new Ue(s,i.map(o=>t[o]));return a.name=e,a.castShadow=!0,a.receiveShadow=!0,a}}function mn(n,e={}){return new vi({color:n,...e})}function Qr(n,e){return new Pt({color:new De(n).multiplyScalar(e),toneMapped:!1})}function fM(){const n={skinShade:mn(14124914,{roughness:.5}),eyeWhite:Qr(16775400,1.45),iris:Qr(8011823,1.08),pupil:mn(1382169,{roughness:.24}),catchlight:Qr(16777215,3.1),brow:mn(9070427,{roughness:.62}),lip:mn(9191236,{roughness:.48}),blush:mn(14316908,{roughness:.64}),hair:mn(14209475,{roughness:.38,sheen:.72,sheenColor:16770751,sheenRoughness:.58}),hairLight:mn(15850940,{roughness:.42,sheen:.55,sheenColor:16773844,sheenRoughness:.62}),coatPale:mn(14080199,{roughness:.67,sheen:.38,sheenColor:15921368,sheenRoughness:.76}),coatShadow:mn(10200218,{roughness:.76,sheen:.22,sheenColor:13950415}),rustTextile:mn(10899257,{roughness:.78,sheen:.32,sheenColor:15043428,sheenRoughness:.82}),underSuit:mn(2107435,{roughness:.72}),metal:mn(6847100,{roughness:.24,metalness:.88,clearcoat:.2,clearcoatRoughness:.24}),glass:mn(2642010,{roughness:.08,metalness:.16,clearcoat:1,clearcoatRoughness:.04}),cyan:Qr(6681829,2.8),amber:Qr(16759131,2.45)},e=new Map;for(const t of Object.values(n))(t instanceof Pt||t instanceof ft)&&e.set(t,t.color.clone());return{byId:n,originals:e,owned:new Set(Object.values(n))}}function vh(n,e){const t=new Ke;t.name=n<0?"r04-face-eye-left":"r04-face-eye-right",t.position.set(n*2.25,6.15,6.82);const i=new yi().sphere("eyeWhite",1.5,[0,0,0],[1.32,.82,.28]).sphere("iris",.52,[-n*.02,-.08,.46],[.78,1,.22]).sphere("pupil",.24,[-n*.02,-.09,.64],[.7,1,.18]).sphere("catchlight",.15,[-n*.13,.16,.76],[.75,1,.16]).build(`${t.name}-mesh`,e);return t.add(i),{group:t,mesh:i}}function yh(n,e){const t=new Ke;t.name=n<0?"r04-face-brow-left":"r04-face-brow-right",t.position.set(n*2.2,8.38,7.05);const i=new yi().capsule("brow",.1,1.72,[0,0,0],[0,0,Math.PI/2]).build(`${t.name}-mesh`,e);return t.rotation.z=-n*.11,t.add(i),{group:t,mesh:i}}function pM(n){const e=new Ke;e.name="r04-face-mouth",e.position.set(0,3.45,6.78);const t=new yi().capsule("lip",.13,1.65,[0,.1,0],[0,0,Math.PI/2]).capsule("blush",.1,.9,[.18,-.12,.08],[0,0,Math.PI/2]).build("r04-face-mouth-mesh",n);return e.add(t),{group:e,mesh:t}}function mM(n){return new yi().sphere("skinShade",.38,[0,4.85,6.72],[.72,1,.32]).sphere("blush",.72,[-3.42,4.55,6.45],[1.2,.45,.2]).sphere("blush",.72,[3.42,4.55,6.45],[1.2,.45,.2]).rounded("rustTextile",[1.25,2.9,1.25],[-5.45,5.35,.7],[0,0,.18],.42).build("r04-face-accents",n)}function gM(n){return new yi().capsule("hair",.78,4.2,[-3.7,10.1,5.25],[.18,.08,-.5],[1,1,.72]).capsule("hair",.82,4.55,[-1.75,10.35,6.2],[.12,.05,-.22],[1,1,.68]).capsule("hairLight",.72,4.15,[.2,10.55,6.35],[.1,0,.08],[1,1,.65]).capsule("hair",.82,4.5,[2,10.3,6],[.13,-.04,.3],[1,1,.68]).capsule("hair",.72,4,[3.75,9.95,5.1],[.18,-.08,.5],[1,1,.7]).capsule("hairLight",.38,3.2,[-.9,11,6.82],[.1,0,-.08],[1,1,.55]).build("r04-layered-fringe",n)}function xM(n){const e=new Ke;e.name="r04-layered-ponytail",e.position.set(4.65,9.3,-3.2);const t=new yi().sphere("rustTextile",1.28,[0,0,0],[.86,1,.86]).capsule("hair",1.65,8.8,[2.1,-1.6,-.4],[-.08,.12,-.55],[1,1,.86]).capsule("hairLight",1.25,7.4,[4.1,-4.5,-.9],[-.12,.15,-.68],[1,1,.82]).capsule("hair",1.1,6.2,[5.35,-7.1,-1.4],[-.16,.1,-.82],[1,1,.78]).build("r04-layered-ponytail-mesh",n);return e.add(t),{group:e,mesh:t}}function vM(n){return new yi().rounded("coatPale",[4.9,13.8,1.55],[-3.45,4.7,5.5],[.03,.06,-.08],.72).rounded("coatPale",[4.4,12.7,1.5],[3.35,4.2,5.52],[.03,-.06,.07],.7).rounded("coatShadow",[9.4,2.3,1.45],[0,11.65,5.15],[.08,0,0],.55).rounded("rustTextile",[1.25,13.8,.8],[-.65,4.5,6.38],[-.03,0,.09],.27).rounded("underSuit",[4.6,7.8,.8],[.45,.8,6.14],void 0,.35).rounded("metal",[5.1,1.5,.65],[2.4,8.65,6.3],[0,0,-.08],.3).rounded("glass",[3.4,1.2,.42],[2.65,8.65,6.72],void 0,.22).rounded("cyan",[2.3,.35,.2],[2.7,8.66,6.98],void 0,.08).rounded("amber",[.65,.65,.22],[.25,-2.2,6.1],void 0,.12).build("r04-pale-coat-torso-overlay",n)}function _h(n,e){const t=new Ke;t.name=n<0?"r04-coat-tail-left":"r04-coat-tail-right",t.position.set(n*3.8,-1.8,1.1);const i=new yi().rounded("coatPale",[6.2,16.5,1.8],[0,-7.5,0],[.11,n*.04,n*.08],.72).rounded("coatShadow",[1.25,13.4,.5],[-n*2.15,-7,1.02],[.1,0,n*.08],.2).rounded("rustTextile",[.8,5.6,.4],[n*2.45,-9.2,1.12],[.1,0,n*.08],.14).build(`${t.name}-mesh`,e);return t.add(i),{group:t,mesh:i}}function yM(n){return new yi().rounded("coatShadow",[10.4,13.2,5.8],[0,4.8,-9.15],[-.04,0,0],1.6).rounded("coatPale",[8.8,9.8,2],[0,5,-12.8],void 0,.75).rounded("metal",[7.2,4.4,1.1],[0,7.8,-14.35],void 0,.46).rounded("cyan",[4.2,.5,.24],[-.4,8.15,-14.96],void 0,.1).cylinder("metal",.72,13.5,[5.6,14.2,-10.4],[0,0,-.08]).sphere("glass",1.65,[6.2,21,-10.1],[.82,1,.82]).sphere("amber",.52,[6.25,21.2,-8.62]).rounded("metal",[4.8,7.5,3.2],[-7.2,-4.2,1.1],[0,0,-.08],.8).rounded("glass",[3.4,4.6,.6],[-7.3,-3.8,2.95],void 0,.3).rounded("cyan",[2.2,.35,.2],[-7.3,-3.8,3.32],void 0,.08).cylinder("rustTextile",1.1,7.2,[7.2,-4.6,-2],[0,0,.05]).rounded("amber",[.4,2.7,.24],[8.28,-4.5,-.8],void 0,.1).build("r04-analysis-pack-and-tools",n)}function _M(n,e){const t=new De(e);for(const[i,r]of n.originals)(i instanceof Pt||i instanceof ft)&&i.color.copy(r).multiply(t)}function MM(n){return Rt.clamp(Number.isFinite(n.progress)?n.progress??0:0,0,1)}function SM(){const n=jf(),e=fM(),t=[],i=n.partGroups.head,r=n.partGroups.torso,s=n.partGroups.equipment;n.root.name=da.id,n.root.userData.assetDNA=da,n.root.userData.frontAxis=da.frontAxis,n.root.userData.runtimeRepresentation=da.representation,n.partMeshes.head?.scale.set(1.22,1.16,1.1),n.partMeshes.torso?.scale.set(.79,1.03,.88),n.partMeshes["left-arm"]?.scale.set(.74,1.01,.78),n.partMeshes["right-arm"]?.scale.set(.74,1.01,.78),n.partMeshes["left-leg"]?.scale.set(.81,1.03,.86),n.partMeshes["right-leg"]?.scale.set(.81,1.03,.86),n.partMeshes.equipment?.scale.set(.93,1,.94);const a=Array.isArray(n.partMeshes.head?.material)?n.partMeshes.head.material:[],o=a[0],c=a[1],l=a[2];l instanceof vi&&(l.name="r04-inherited-visor-neutralized",l.color.setHex(10213074),l.transparent=!0,l.opacity=.1,l.depthWrite=!1);const d=vh(-1,e.byId),h=vh(1,e.byId),u=yh(-1,e.byId),p=yh(1,e.byId),g=pM(e.byId),v=mM(e.byId),m=gM(e.byId),f=xM(e.byId);i.add(d.group,h.group,u.group,p.group,g.group,v,m,f.group),t.push(d.mesh,h.mesh,u.mesh,p.mesh,g.mesh,v,m,f.mesh);const x=vM(e.byId);r.add(x),t.push(x);const S=_h(-1,e.byId),y=_h(1,e.byId),E=yM(e.byId);s.add(S.group,y.group,E),t.push(S.mesh,y.mesh,E);const b={eyes:[d.group,h.group],brows:[u.group,p.group],mouth:g.group,ponytail:f.group,coatTails:[S.group,y.group]},_={...n,facialRig:b,updatePose:w=>{n.updatePose(w),n.partGroups.head.position.y+=1.25,n.partGroups["left-arm"].position.x+=1.15,n.partGroups["right-arm"].position.x-=1.15,n.partGroups["left-leg"].position.x+=.55,n.partGroups["right-leg"].position.x-=.55;const R=MM(w),P=Rt.clamp(w.moveAmount??0,0,1),D=((w.timeSeconds+.35)%4.1+4.1)%4.1,O=D<.17?Math.sin(D/.17*Math.PI):0,B=w.motion==="hurt"?Math.sin(R*Math.PI):0,U=w.motion==="skill"?Math.sin(R*Math.PI):0,W=w.motion==="windup"||w.motion==="hit"?1:0,k=Math.max(.12,1-O*.9-B*.38);d.group.scale.set(1+U*.08,k+U*.08,1),h.group.scale.copy(d.group.scale),u.group.rotation.z=-.11-W*.18+B*.28-U*.08,p.group.rotation.z=.11+W*.18-B*.28+U*.08,u.group.position.y=8.38+B*.32,p.group.position.y=8.38+B*.32,g.group.scale.set(1-W*.18+U*.12,1+B*1.05+U*.72,1),g.group.rotation.z=B*-.08;const q=Math.sin(w.timeSeconds*10.5)*P;f.group.rotation.x=-.12+Math.abs(q)*.12+U*.16,f.group.rotation.z=-.08-q*.16+B*.22,S.group.rotation.x=.05+Math.abs(q)*.14+U*.2,y.group.rotation.x=.04+Math.abs(q)*.12+U*.18,S.group.rotation.z=-q*.055,y.group.rotation.z=q*.055},attachWeapon(w,R){n.attachWeapon(w,R)},setTint(w){n.setTint(w),o instanceof ft&&o.color.setHex(15708559).multiply(new De(w)),c instanceof ft&&c.color.setHex(12169122).multiply(new De(w)),_M(e,w)},dispose(){for(const w of t)w.geometry.dispose();for(const w of e.owned)w.dispose();n.dispose()}};return _.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),_}const Xi={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ni{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const bM=new Ss(-1,1,1,-1,0,1);class wM extends Et{constructor(){super(),this.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Xe([0,2,0,0,2,0],2))}}const EM=new wM;class Ts{constructor(e){this._mesh=new Ue(EM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,bM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class oc extends Ni{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=xn.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ts(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Mh extends Ni{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class TM extends Ni{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class AM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Se);this._width=i.width,this._height=i.height,t=new Wt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oc(Xi),this.copyPass.material.blending=Kt,this.timer=new J0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Mh!==void 0&&(a instanceof Mh?i=!0:a instanceof TM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const ua={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new st},cameraProjectionMatrixInverse:{value:new st},cameraWorldMatrix:{value:new st},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new I(-1,-1,-1)},sceneBoxMax:{value:new I(1,1,1)}},vertexShader:`

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
		}`},ha={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},sl={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function RM(n=5){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=CM(e),i=t.length,r=new Uint8Array(i*4);for(let a=0;a<i;++a){const o=t[a],c=2*Math.PI*o/i,l=new I(Math.cos(c),Math.sin(c),0).normalize();r[a*4]=(l.x*.5+.5)*255,r[a*4+1]=(l.y*.5+.5)*255,r[a*4+2]=127,r[a*4+3]=255}const s=new _s(r,e,e);return s.wrapS=Vn,s.wrapT=Vn,s.needsUpdate=!0,s}function CM(n){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=e*e,i=Array(t).fill(0);let r=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(r===-1&&s===e?(s=e-2,r=0):(s===e&&(s=0),r<0&&(r=e-1)),i[r*e+s]!==0){s-=2,r++;continue}else i[r*e+s]=a++;s++,r--}return i}const fa={defines:{SAMPLES:16,SAMPLE_VECTORS:Jf(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Se},cameraProjectionMatrixInverse:{value:new st},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Jf(n,e,t){const i=PM(n,e,t);let r="vec3[SAMPLES](";for(let s=0;s<n;s++){const a=i[s];r+=`vec3(${a.x}, ${a.y}, ${a.z})${s<n-1?",":")"}`}return r}function PM(n,e,t){const i=[];for(let r=0;r<n;r++){const s=2*Math.PI*e*r/n,a=Math.pow(r/(n-1),t);i.push(new I(Math.cos(s),Math.sin(s),a))}return i}class DM{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,r,s;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),d=(3-Math.sqrt(3))/6,h=(c+l)*d,u=c-h,p=l-h,g=e-u,v=t-p;let m,f;g>v?(m=1,f=0):(m=0,f=1);const x=g-m+d,S=v-f+d,y=g-1+2*d,E=v-1+2*d,b=c&255,A=l&255,_=this.perm[b+this.perm[A]]%12,w=this.perm[b+m+this.perm[A+f]]%12,R=this.perm[b+1+this.perm[A+1]]%12;let P=.5-g*g-v*v;P<0?i=0:(P*=P,i=P*P*this._dot(this.grad3[_],g,v));let D=.5-x*x-S*S;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],x,S));let O=.5-y*y-E*E;return O<0?s=0:(O*=O,s=O*O*this._dot(this.grad3[R],y,E)),70*(i+r+s)}noise3d(e,t,i){let r,s,a,o;const l=(e+t+i)*.3333333333333333,d=Math.floor(e+l),h=Math.floor(t+l),u=Math.floor(i+l),p=1/6,g=(d+h+u)*p,v=d-g,m=h-g,f=u-g,x=e-v,S=t-m,y=i-f;let E,b,A,_,w,R;x>=S?S>=y?(E=1,b=0,A=0,_=1,w=1,R=0):x>=y?(E=1,b=0,A=0,_=1,w=0,R=1):(E=0,b=0,A=1,_=1,w=0,R=1):S<y?(E=0,b=0,A=1,_=0,w=1,R=1):x<y?(E=0,b=1,A=0,_=0,w=1,R=1):(E=0,b=1,A=0,_=1,w=1,R=0);const P=x-E+p,D=S-b+p,O=y-A+p,B=x-_+2*p,U=S-w+2*p,W=y-R+2*p,k=x-1+3*p,q=S-1+3*p,J=y-1+3*p,ne=d&255,ae=h&255,le=u&255,Ge=this.perm[ne+this.perm[ae+this.perm[le]]]%12,$e=this.perm[ne+E+this.perm[ae+b+this.perm[le+A]]]%12,ke=this.perm[ne+_+this.perm[ae+w+this.perm[le+R]]]%12,K=this.perm[ne+1+this.perm[ae+1+this.perm[le+1]]]%12;let ie=.6-x*x-S*S-y*y;ie<0?r=0:(ie*=ie,r=ie*ie*this._dot3(this.grad3[Ge],x,S,y));let ee=.6-P*P-D*D-O*O;ee<0?s=0:(ee*=ee,s=ee*ee*this._dot3(this.grad3[$e],P,D,O));let we=.6-B*B-U*U-W*W;we<0?a=0:(we*=we,a=we*we*this._dot3(this.grad3[ke],B,U,W));let ze=.6-k*k-q*q-J*J;return ze<0?o=0:(ze*=ze,o=ze*ze*this._dot3(this.grad3[K],k,q,J)),32*(r+s+a+o)}noise4d(e,t,i,r){const s=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let d,h,u,p,g;const v=(e+t+i+r)*c,m=Math.floor(e+v),f=Math.floor(t+v),x=Math.floor(i+v),S=Math.floor(r+v),y=(m+f+x+S)*l,E=m-y,b=f-y,A=x-y,_=S-y,w=e-E,R=t-b,P=i-A,D=r-_,O=w>R?32:0,B=w>P?16:0,U=R>P?8:0,W=w>D?4:0,k=R>D?2:0,q=P>D?1:0,J=O+B+U+W+k+q,ne=a[J][0]>=3?1:0,ae=a[J][1]>=3?1:0,le=a[J][2]>=3?1:0,Ge=a[J][3]>=3?1:0,$e=a[J][0]>=2?1:0,ke=a[J][1]>=2?1:0,K=a[J][2]>=2?1:0,ie=a[J][3]>=2?1:0,ee=a[J][0]>=1?1:0,we=a[J][1]>=1?1:0,ze=a[J][2]>=1?1:0,ve=a[J][3]>=1?1:0,gt=w-ne+l,qe=R-ae+l,at=P-le+l,se=D-Ge+l,Ae=w-$e+2*l,Ce=R-ke+2*l,dt=P-K+2*l,Ze=D-ie+2*l,We=w-ee+3*l,ut=R-we+3*l,ot=P-ze+3*l,L=D-ve+3*l,Gt=w-1+4*l,je=R-1+4*l,C=P-1+4*l,M=D-1+4*l,F=m&255,V=f&255,Z=x&255,re=S&255,de=o[F+o[V+o[Z+o[re]]]]%32,j=o[F+ne+o[V+ae+o[Z+le+o[re+Ge]]]]%32,Q=o[F+$e+o[V+ke+o[Z+K+o[re+ie]]]]%32,ue=o[F+ee+o[V+we+o[Z+ze+o[re+ve]]]]%32,Re=o[F+1+o[V+1+o[Z+1+o[re+1]]]]%32;let ce=.6-w*w-R*R-P*P-D*D;ce<0?d=0:(ce*=ce,d=ce*ce*this._dot4(s[de],w,R,P,D));let oe=.6-gt*gt-qe*qe-at*at-se*se;oe<0?h=0:(oe*=oe,h=oe*oe*this._dot4(s[j],gt,qe,at,se));let Ee=.6-Ae*Ae-Ce*Ce-dt*dt-Ze*Ze;Ee<0?u=0:(Ee*=Ee,u=Ee*Ee*this._dot4(s[Q],Ae,Ce,dt,Ze));let Le=.6-We*We-ut*ut-ot*ot-L*L;Le<0?p=0:(Le*=Le,p=Le*Le*this._dot4(s[ue],We,ut,ot,L));let Be=.6-Gt*Gt-je*je-C*C-M*M;return Be<0?g=0:(Be*=Be,g=Be*Be*this._dot4(s[Re],Gt,je,C,M)),27*(d+h+u+p+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,r){return e[0]*t+e[1]*i+e[2]*r}_dot4(e,t,i,r,s){return e[0]*t+e[1]*i+e[2]*r+e[3]*s}}class Zn extends Ni{constructor(e,t,i=512,r=512,s,a,o){super(),this.width=i,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=RM(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Wt(this.width,this.height,{type:Jt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Tt({defines:Object.assign({},ua.defines),uniforms:xn.clone(ua.uniforms),vertexShader:ua.vertexShader,fragmentShader:ua.fragmentShader,blending:Kt,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new F0,this.normalMaterial.blending=Kt,this.pdMaterial=new Tt({defines:Object.assign({},fa.defines),uniforms:xn.clone(fa.uniforms),vertexShader:fa.vertexShader,fragmentShader:fa.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Tt({defines:Object.assign({},ha.defines),uniforms:xn.clone(ha.uniforms),vertexShader:ha.vertexShader,fragmentShader:ha.fragmentShader,blending:Kt}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Tt({uniforms:xn.clone(Xi.uniforms),vertexShader:Xi.vertexShader,fragmentShader:Xi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:gl,blendDst:rs,blendEquation:zn,blendSrcAlpha:ml,blendDstAlpha:rs,blendEquationAlpha:zn}),this.blendMaterial=new Tt({uniforms:xn.clone(sl.uniforms),vertexShader:sl.vertexShader,fragmentShader:sl.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Zh,blendSrc:gl,blendDst:rs,blendEquation:zn,blendSrcAlpha:ml,blendDstAlpha:rs,blendEquationAlpha:zn}),this._fsQuad=new Ts(null),this._originalClearColor=new De,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Zi,this.depthTexture.format=Pi,this.depthTexture.type=Dr,this.normalRenderTarget=new Wt(this.width,this.height,{minFilter:Ft,magFilter:Ft,type:Jt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const i=this.normalTexture?1:0,r=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Jf(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Zn.OUTPUT.Off:break;case Zn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Kt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Zn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Kt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Zn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Kt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Zn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Zn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Kt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Zn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Kt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new DM,i=e*e*4,r=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const c=a,l=o;r[(a*e+o)*4]=(t.noise(c,l)*.5+.5)*255,r[(a*e+o)*4+1]=(t.noise(c+e,l)*.5+.5)*255,r[(a*e+o)*4+2]=(t.noise(c,l+e)*.5+.5)*255,r[(a*e+o)*4+3]=(t.noise(c+e,l+e)*.5+.5)*255}const s=new _s(r,e,e,vn,on);return s.wrapS=Vn,s.wrapT=Vn,s.needsUpdate=!0,s}}Zn.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const pa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class IM extends Ni{constructor(){super(),this.isOutputPass=!0,this.uniforms=xn.clone(pa.uniforms),this.material=new pf({name:pa.name,uniforms:this.uniforms,vertexShader:pa.vertexShader,fragmentShader:pa.fragmentShader}),this._fsQuad=new Ts(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===ht&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===yc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===_c?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Mc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Sc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===qa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===wc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===bc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class LM extends Ni{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new De}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const ma={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

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

		}`},ga={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

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

		}`},al={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

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

		}`};class NM extends Ni{constructor(){super(),this._edgesRT=new Wt(1,1,{depthBuffer:!1,type:Jt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Wt(1,1,{depthBuffer:!1,type:Jt}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Qt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Bt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Qt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=Ft,this._searchTexture.minFilter=Ft,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=xn.clone(ma.uniforms),this._materialEdges=new Tt({defines:Object.assign({},ma.defines),uniforms:this._uniformsEdges,vertexShader:ma.vertexShader,fragmentShader:ma.fragmentShader}),this._uniformsWeights=xn.clone(ga.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new Tt({defines:Object.assign({},ga.defines),uniforms:this._uniformsWeights,vertexShader:ga.vertexShader,fragmentShader:ga.fragmentShader}),this._uniformsBlend=xn.clone(al.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new Tt({uniforms:this._uniformsBlend,vertexShader:al.vertexShader,fragmentShader:al.fragmentShader}),this._fsQuad=new Ts(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const UM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new De(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Nr extends Ni{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Se(e.x,e.y):new Se(256,256),this.clearColor=new De(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Wt(s,a,{type:Jt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new Wt(s,a,{type:Jt});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const u=new Wt(s,a,{type:Jt});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),a=Math.round(a/2)}const o=UM;this.highPassUniforms=xn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Se(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xn.clone(Xi.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:Xi.vertexShader,fragmentShader:Xi.fragmentShader,premultipliedAlpha:!0,blending:za,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new De,this._oldClearAlpha=1,this._basic=new Pt,this._fsQuad=new Ts(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Se(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Nr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Nr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new Tt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Se(.5,.5)},direction:{value:new Se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Nr.BlurDirectionX=new Se(1,0);Nr.BlurDirectionY=new Se(0,1);const zM={name:"HorizontalTiltShiftShader",uniforms:{tDiffuse:{value:null},h:{value:1/512},r:{value:.35}},vertexShader:`

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

		}`},OM={name:"VerticalTiltShiftShader",uniforms:{tDiffuse:{value:null},v:{value:1/512},r:{value:.35}},vertexShader:`

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

		}`},FM=2,BM=4;class kM{renderer;scene;camera;maxPixelRatio;configuredPixelRatio;onFallback;composer=null;passes=[];width=1;height=1;pixelRatio=1;samples=0;mode="direct";gtaoEnabled=!1;bloomEnabled=!1;smaaEnabled=!1;tiltShiftEnabled=!1;horizontalTiltShift=null;verticalTiltShift=null;tiltShiftFocus=.48;tiltShiftStrength=3.4;fallbackReason=null;disposed=!1;constructor(e,t,i,r={}){this.renderer=e,this.scene=t,this.camera=i,this.maxPixelRatio=HM(r.maxPixelRatio??FM),this.configuredPixelRatio=Number.isFinite(r.pixelRatio)?r.pixelRatio:void 0,this.onFallback=r.onFallback;const s=e.getSize(new Se);this.width=xa(s.x),this.height=xa(s.y),this.pixelRatio=this.resolvePixelRatio(r.pixelRatio),this.createComposer(r),this.resize(this.width,this.height,this.pixelRatio)}render(e){if(!this.disposed){if(this.composer!==null)try{this.composer.render(e);return}catch(t){this.fallbackToDirect(t)}this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}}resize(e,t,i){if(!this.disposed&&(this.width=xa(e),this.height=xa(t),this.pixelRatio=this.resolvePixelRatio(i),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.composer!==null))try{this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(this.width,this.height),this.syncTiltShiftUniforms()}catch(r){this.fallbackToDirect(r)}}getStatus(){return{mode:this.mode,width:this.width,height:this.height,pixelRatio:this.pixelRatio,samples:this.samples,gtao:this.gtaoEnabled,bloom:this.bloomEnabled,smaa:this.smaaEnabled,tiltShift:this.tiltShiftEnabled,fallbackReason:this.fallbackReason}}dispose(){this.disposed||(this.disposed=!0,this.disposeComposer())}createComposer(e){if(!VM(this.renderer)){this.fallbackReason="Half-float color targets are unavailable.";return}const t=Sh(e.samples??BM),i=Sh(this.renderer.capabilities.maxSamples);this.samples=i>=2?Math.min(t,i):0,this.samples===1&&(this.samples=0);let r=null,s=null;const a=[];try{s=new Wt(1,1,{depthBuffer:!0,stencilBuffer:!1,type:Jt,minFilter:Bt,magFilter:Bt,samples:this.samples}),s.texture.name="PC Ultra half-float scene",s.texture.colorSpace=us,r=new AM(this.renderer,s),r.setPixelRatio(this.pixelRatio),r.setSize(this.width,this.height);const o=new LM(this.scene,this.camera);if(r.addPass(o),a.push(o),e.gtao??!0){const l=new Zn(this.scene,this.camera,this.width*this.pixelRatio,this.height*this.pixelRatio);l.blendIntensity=.52,l.updateGtaoMaterial({radius:.2,thickness:1,distanceFallOff:1,samples:12,screenSpaceRadius:!0}),l.updatePdMaterial({rings:2,samples:8,radius:7}),r.addPass(l),a.push(l),this.gtaoEnabled=!0}if((e.tiltShift??!1)&&(this.tiltShiftFocus=Rt.clamp(Number.isFinite(e.tiltShiftFocus)?e.tiltShiftFocus:.48,.18,.82),this.tiltShiftStrength=Rt.clamp(Number.isFinite(e.tiltShiftStrength)?e.tiltShiftStrength:3.4,.5,8),this.horizontalTiltShift=new oc(zM),this.verticalTiltShift=new oc(OM),this.horizontalTiltShift.material.name="beauty-cell-horizontal-depth-separation",this.verticalTiltShift.material.name="beauty-cell-vertical-depth-separation",r.addPass(this.horizontalTiltShift),r.addPass(this.verticalTiltShift),a.push(this.horizontalTiltShift,this.verticalTiltShift),this.tiltShiftEnabled=!0,this.syncTiltShiftUniforms()),e.bloom??!0){const l=new Nr(new Se(this.width*this.pixelRatio,this.height*this.pixelRatio),.22,.18,1.15);r.addPass(l),a.push(l),this.bloomEnabled=!0}if(e.smaa??!0){const l=new NM;r.addPass(l),a.push(l),this.smaaEnabled=!0}const c=new IM;r.addPass(c),a.push(c),this.composer=r,this.passes=a,this.mode=this.samples>0?"half-float-msaa":"half-float"}catch(o){r===null&&s?.dispose(),wh(r,a),this.resetFeatureStatus(),this.fallbackReason=bh(o),this.onFallback?.(o)}}resolvePixelRatio(e){const t=typeof window>"u"?1:window.devicePixelRatio||1,i=e??this.configuredPixelRatio??t;return Rt.clamp(Number.isFinite(i)?i:1,1,this.maxPixelRatio)}fallbackToDirect(e){this.fallbackReason=bh(e),this.disposeComposer(),this.resetFeatureStatus(),this.renderer.resetState(),this.renderer.setRenderTarget(null),this.onFallback?.(e)}disposeComposer(){wh(this.composer,this.passes),this.composer=null,this.passes=[],this.horizontalTiltShift=null,this.verticalTiltShift=null}resetFeatureStatus(){this.mode="direct",this.samples=0,this.gtaoEnabled=!1,this.bloomEnabled=!1,this.smaaEnabled=!1,this.tiltShiftEnabled=!1}syncTiltShiftUniforms(){if(this.horizontalTiltShift===null||this.verticalTiltShift===null)return;const e=Math.max(1,this.width*this.pixelRatio),t=Math.max(1,this.height*this.pixelRatio);this.horizontalTiltShift.uniforms.h.value=this.tiltShiftStrength/e,this.horizontalTiltShift.uniforms.r.value=this.tiltShiftFocus,this.verticalTiltShift.uniforms.v.value=this.tiltShiftStrength/t,this.verticalTiltShift.uniforms.r.value=this.tiltShiftFocus}}function VM(n){return n.capabilities.isWebGL2&&n.extensions.has("EXT_color_buffer_float")}function HM(n){return Number.isFinite(n)?Math.max(1,n):1}function xa(n){return Number.isFinite(n)?Math.max(1,Math.round(n)):1}function Sh(n){return Number.isFinite(n)?Math.max(0,Math.floor(n)):0}function bh(n){return n instanceof Error?n.message:"Post-processing initialization or rendering failed."}function wh(n,e){for(const t of e)try{t.dispose()}catch{}try{n?.dispose()}catch{}}const GM="./assets/reclaimed-meadow-v1-CgTL2cqk.webp",va=854,Ci=480,WM=600,XM=360,qM=390,YM=.98,ZM=.92,KM=1075,Eh=new I(Da.x,Da.y,Da.z),Qf=2.1,$f=2,Th=4,jM=3.4,ya=64,JM=14148051,ol=to(kr,"weapon",no),lc=to(io,"grip",Qf),cc=to(ro,"grip",$f),_a=new I;class QM{renderer;qualityProfile;environmentProfile;cameraCompositionProfile;cameraViewHeight;ultraPipeline=null;scene=new of;camera;environmentArt;cameraTarget=new I;playerGroup=new Ke;playerBody;playerHeroVisual;bladeMesh;impactMesh;playerShadow;companionGroup=new Ke;companionBody;companionBeautyVisual;companionShadow;enemyVisuals=new Map;lootVisuals=new Map;ringEffects=[];burstEffects=[];targetRing;windupRing;reusableMatrix=new st;reusablePosition=new I;reusableQuaternion=new Tn;reusableScale=new I(1,1,1);keyLight=new Su(16771261,2.45);keyLightTarget=new At;effectLight=new Ms(6415825,0,390,2);contextLostHandler;contextRestoredHandler;environmentTarget=null;groundTexture=null;attackAnimation=0;attackWeapon="blade";effectLightEnergy=0;internalRenderWidth=va;internalRenderHeight=Ci;viewportCssWidth=0;viewportCssHeight=0;resizeObserver=null;windowResizeHandler=null;companionInitialized=!1;companionReaction=0;cameraTrauma=0;heroHurtAnimation=0;heroSkillAnimation=0;lastPlayerX=null;lastPlayerY=null;elapsed=0;disposed=!1;constructor(e,t,i={}){this.qualityProfile=i.qualityProfile??"baseline",this.environmentProfile=i.environmentProfile??"start-town",this.cameraCompositionProfile=i.cameraCompositionProfile??(this.environmentProfile==="r04-live"?"r04":"baseline"),this.cameraViewHeight=this.environmentProfile==="r04-live"?Oe.camera.viewHeight:this.environmentProfile==="beauty-cell"?qM:this.qualityProfile==="pc-ultra"?XM:WM,this.renderer=new Zy({antialias:!0,alpha:!1,depth:!0,powerPreference:"high-performance",precision:"highp",preserveDrawingBuffer:!1}),J_(this.renderer,this.environmentProfile==="r04-live"?Oe.display.exposure:this.environmentProfile==="beauty-cell"?ZM:this.qualityProfile==="pc-ultra"?YM:void 0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=os,this.renderer.setPixelRatio(this.qualityProfile==="pc-ultra"?Math.min(2,Math.max(1,window.devicePixelRatio||1)):1),this.renderer.setSize(va,Ci,!1),this.renderer.domElement.dataset.testid="game-canvas",this.renderer.domElement.dataset.antialias=this.renderer.getContextAttributes().antialias===!0?"msaa":"none",this.renderer.domElement.dataset.qualityProfile=this.qualityProfile,this.renderer.domElement.dataset.cameraCompositionProfile=this.cameraCompositionProfile,this.renderer.domElement.dataset.environmentProfile=this.environmentProfile,this.renderer.domElement.setAttribute("aria-label","辺境遺物録 ボクセルゲーム画面"),e.append(this.renderer.domElement),this.contextLostHandler=a=>{a.preventDefault(),i.onContextLost?.()},this.contextRestoredHandler=()=>{this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting(),i.onContextRestored?.()},this.renderer.domElement.addEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.addEventListener("webglcontextrestored",this.contextRestoredHandler);const r=this.environmentProfile==="r04-live"?Oe.display.fogColor:this.environmentProfile==="beauty-cell"?11125949:JM;this.scene.background=new De(r),this.scene.fog=new zc(r,this.environmentProfile==="r04-live"?Oe.display.fogNear:this.environmentProfile==="beauty-cell"?1020:this.qualityProfile==="pc-ultra"?1140:900,this.environmentProfile==="r04-live"?Oe.display.fogFar:this.environmentProfile==="beauty-cell"?2340:this.qualityProfile==="pc-ultra"?2700:2450),this.createLighting(),this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting();const s=this.cameraViewHeight*(va/Ci);if(this.camera=new Ss(-s/2,s/2,this.cameraViewHeight/2,-this.cameraViewHeight/2,1,3200),this.initializeViewportSync(e),this.qualityProfile==="pc-ultra"&&(this.ultraPipeline=new kM(this.renderer,this.scene,this.camera,{maxPixelRatio:2,samples:4,gtao:!0,bloom:!0,smaa:!0,tiltShift:this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live",tiltShiftFocus:this.environmentProfile==="r04-live"?Oe.post.tiltShiftFocus:.49,tiltShiftStrength:this.environmentProfile==="r04-live"?Oe.post.tiltShiftStrength:3.7,onFallback:a=>{this.renderer.domElement.dataset.ultraFallback=a instanceof Error?a.message:"post-processing"}}),this.ultraPipeline.resize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.syncUltraPipelineDataset()),this.createGround(t),this.environmentArt=this.environmentProfile==="r04-live"?H_():this.environmentProfile==="beauty-cell"?qf():this.environmentProfile==="north-star-city"?d_():H2(),this.scene.add(this.environmentArt.group),this.environmentProfile==="beauty-cell"){this.renderer.domElement.dataset.visualGrammar="concept-c-fixed-diagonal",this.renderer.domElement.dataset.generationMode="deterministic-spec-compiler";const a=this.environmentArt.group.userData.stableId;typeof a=="string"&&(this.renderer.domElement.dataset.beautyCellId=a)}if(this.environmentProfile==="r04-live"&&(this.renderer.domElement.dataset.visualGrammar=Oe.composition.rule,this.renderer.domElement.dataset.generationMode=Oe.generation.mode,this.renderer.domElement.dataset.r04ArtId=typeof this.environmentArt.group.userData.stableId=="string"?this.environmentArt.group.userData.stableId:Oe.stableId),this.environmentProfile!=="beauty-cell"&&this.environmentProfile!=="r04-live"&&this.createFieldGrowth(t,this.environmentArt.replacedTerrainIds),this.createTerrain(t,this.environmentArt.replacedTerrainIds),this.createProps(t,this.environmentArt.replacedPropIds),this.createLandmarkSignals(t),this.playerBody=Ah(kr,no),this.playerGroup.add(this.playerBody),this.playerBody.castShadow=!0,this.playerBody.receiveShadow=!0,this.playerHeroVisual=this.environmentProfile==="r04-live"?SM():this.environmentProfile==="beauty-cell"?jf():this.qualityProfile==="pc-ultra"?dM({mode:"articulated"}):null,this.playerHeroVisual!==null&&(this.playerBody.visible=!1,this.environmentProfile==="beauty-cell"?this.playerHeroVisual.root.scale.setScalar(1.28):this.environmentProfile==="r04-live"&&this.playerHeroVisual.root.scale.setScalar(Oe.actors.heroScale),this.playerGroup.add(this.playerHeroVisual.root)),this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live")this.bladeMesh=xh("blade"),this.impactMesh=xh("impact");else{const a=$r(io,Qf,1),o=$r(ro,$f,1);Ph(a,"blade"),Ph(o,"impact"),this.bladeMesh=a,this.impactMesh=o}this.bladeMesh.castShadow=!0,this.impactMesh.castShadow=!0,this.playerHeroVisual!==null?(this.playerHeroVisual.attachWeapon(this.bladeMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:lc),this.playerHeroVisual.attachWeapon(this.impactMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:cc)):this.playerGroup.add(this.bladeMesh,this.impactMesh),this.playerShadow=es(38,22,.32),this.playerGroup.add(this.playerShadow),this.scene.add(this.playerGroup),this.targetRing=Rh(6415825,.76),this.windupRing=Rh(16034128,.92),this.targetRing.visible=!1,this.windupRing.visible=!1,this.scene.add(this.targetRing,this.windupRing),this.companionBody=Ah(Zc,Uf),this.companionBody.castShadow=!0,this.companionBody.receiveShadow=!0,this.companionBeautyVisual=i.companionPreview===!0&&(this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live")?hM():null,this.companionBeautyVisual!==null&&(this.companionBody.visible=!1,this.companionGroup.add(this.companionBeautyVisual.root)),this.companionShadow=es(24,15,.24),this.companionGroup.name="visual-only-companion",this.companionGroup.add(this.companionBody,this.companionShadow),this.companionGroup.visible=i.companionPreview===!0,this.scene.add(this.companionGroup),this.syncEnemies(t),this.syncLoot(t),this.snapCamera(t),this.update(t,[],0,0)}update(e,t,i,r,s){if(this.disposed)return;const a=Math.min(.05,Math.max(0,r/1e3));this.elapsed+=a,this.handleEvents(t),this.syncPlayer(e,a,s),this.companionGroup.visible&&this.syncCompanion(e,a),this.syncEnemies(e),this.syncCombatPresentation(e,s),this.syncLoot(e),this.updateEffects(a),this.updateCamera(e,a,s),this.updateAmbientMotion(e,i/1e3),this.ultraPipeline!==null?(this.ultraPipeline.render(a),this.syncUltraPipelineDataset()):this.renderer.render(this.scene,this.camera)}initializeViewportSync(e){if(this.updateViewportSize(e.clientWidth,e.clientHeight),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(t=>{const i=t.find(r=>r.target===e);i!==void 0&&this.updateViewportSize(i.contentRect.width,i.contentRect.height)}),this.resizeObserver.observe(e);return}typeof window<"u"&&(this.windowResizeHandler=()=>{this.updateViewportSize(e.clientWidth,e.clientHeight)},window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}updateViewportSize(e,t){if(this.disposed||e<=0||t<=0||Math.abs(e-this.viewportCssWidth)<.5&&Math.abs(t-this.viewportCssHeight)<.5)return;this.viewportCssWidth=e,this.viewportCssHeight=t;const i=Rt.clamp(e/t,16/9,2.24);if(this.qualityProfile==="pc-ultra"){const a=Math.min(2,Math.max(1,window.devicePixelRatio||1));this.ultraPipeline!==null?this.ultraPipeline.resize(e,t,a):(this.renderer.setPixelRatio(a),this.renderer.setSize(Math.max(1,Math.round(e)),Math.max(1,Math.round(t)),!1)),this.internalRenderWidth=Math.max(1,Math.round(e*a)),this.internalRenderHeight=Math.max(1,Math.round(t*a));const o=this.cameraViewHeight*i;this.camera.left=-o/2,this.camera.right=o/2,this.camera.updateProjectionMatrix(),this.renderer.domElement.dataset.internalResolution=`${this.internalRenderWidth}x${this.internalRenderHeight}`,this.syncUltraPipelineDataset();return}const r=Rt.clamp(Math.round(Ci*i),va,KM);if(r===this.internalRenderWidth)return;this.internalRenderWidth=r,this.internalRenderHeight=Ci,this.renderer.setSize(r,Ci,!1),this.renderer.domElement.dataset.internalResolution=`${r}x${Ci}`;const s=this.cameraViewHeight*(r/Ci);this.camera.left=-s/2,this.camera.right=s/2,this.camera.updateProjectionMatrix()}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,width:this.internalRenderWidth,height:this.internalRenderHeight}}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.domElement.removeEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.removeEventListener("webglcontextrestored",this.contextRestoredHandler),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.windowResizeHandler!==null&&typeof window<"u"&&(window.removeEventListener("resize",this.windowResizeHandler),this.windowResizeHandler=null),this.environmentArt.dispose(),this.ultraPipeline?.dispose(),this.ultraPipeline=null,this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,this.groundTexture?.dispose(),this.groundTexture=null;const e=new Set,t=new Set;this.scene.traverse(i=>{if(i instanceof ss&&i.dispose(),i instanceof Ue||i instanceof ss||i instanceof Fo){e.add(i.geometry);const r=i.material;Array.isArray(r)?r.forEach(s=>t.add(s)):t.add(r)}}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}syncUltraPipelineDataset(){if(this.ultraPipeline===null)return;const e=this.ultraPipeline.getStatus();this.renderer.domElement.dataset.ultraPipeline=e.mode,this.renderer.domElement.dataset.ultraGtao=String(e.gtao),this.renderer.domElement.dataset.ultraBloom=String(e.bloom),this.renderer.domElement.dataset.ultraSmaa=String(e.smaa),this.renderer.domElement.dataset.ultraTiltShift=String(e.tiltShift),this.renderer.domElement.dataset.ultraSamples=String(e.samples),e.fallbackReason===null?delete this.renderer.domElement.dataset.ultraFallback:this.renderer.domElement.dataset.ultraFallback=e.fallbackReason}createLighting(){const e=this.environmentProfile==="r04-live",t=new q0(e?Oe.lighting.skyColor:this.environmentProfile==="beauty-cell"?16773834:16183506,e?Oe.lighting.groundColor:this.environmentProfile==="beauty-cell"?1523252:3496515,e?Oe.lighting.skyIntensity:this.environmentProfile==="beauty-cell"?.34:this.qualityProfile==="pc-ultra"?.42:1.55);t.name="daylight-sky-fill",this.keyLight.color.setHex(e?Oe.lighting.keyColor:this.environmentProfile==="beauty-cell"?16769200:16771261),this.keyLight.intensity=e?Oe.lighting.keyIntensity:this.environmentProfile==="beauty-cell"?2.52:this.qualityProfile==="pc-ultra"?2.68:2.45,this.keyLight.name="daylight-key",this.keyLightTarget.name="daylight-key-target",this.keyLightTarget.position.set(e?430:390,0,900),this.keyLight.position.set(e?this.keyLightTarget.position.x+Oe.lighting.keyOffsetX:this.environmentProfile==="beauty-cell"?-180:40,e?Oe.lighting.keyOffsetY:this.environmentProfile==="beauty-cell"?890:820,e?this.keyLightTarget.position.z+Oe.lighting.keyOffsetZ:this.environmentProfile==="beauty-cell"?140:360),this.keyLight.target=this.keyLightTarget,this.keyLight.castShadow=!0;const i=this.qualityProfile==="pc-ultra"?2048:512;this.keyLight.shadow.mapSize.set(i,i),this.keyLight.shadow.bias=-.0012,this.keyLight.shadow.normalBias=e?Oe.lighting.shadowNormalBias:this.environmentProfile==="beauty-cell"?.82:1.4;const r=e?Oe.lighting.shadowHalfExtent:460;if(this.keyLight.shadow.camera.left=-r,this.keyLight.shadow.camera.right=r,this.keyLight.shadow.camera.top=r,this.keyLight.shadow.camera.bottom=-r,this.keyLight.shadow.camera.near=160,this.keyLight.shadow.camera.far=1420,this.effectLight.name="signal-effect-light",this.effectLight.position.set(430,58,900),this.scene.add(t,this.keyLightTarget,this.keyLight,this.effectLight),this.qualityProfile==="pc-ultra"){const s=new At;s.name="daylight-rim-target",s.position.set(430,24,860);const a=new Su(e?Oe.lighting.rimColor:this.environmentProfile==="beauty-cell"?9165265:11134687,e?Oe.lighting.rimIntensity:this.environmentProfile==="beauty-cell"?.48:.62);a.name="daylight-cool-rim",a.position.set(-360,420,-280),a.target=s,this.scene.add(s,a)}}createEnvironmentLighting(){this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,delete this.renderer.domElement.dataset.environmentLightingFallback;const e=new Ky,t=new nc(this.renderer);try{this.environmentTarget=t.fromScene(e,.04),this.scene.environment=this.environmentTarget.texture,this.scene.environmentIntensity=this.environmentProfile==="r04-live"?Oe.lighting.environmentIntensity:this.environmentProfile==="beauty-cell"?.19:.26,this.renderer.domElement.dataset.environmentLighting="pmrem-ibl"}catch(i){this.renderer.domElement.dataset.environmentLighting="direct-light-fallback",this.renderer.domElement.dataset.environmentLightingFallback=i instanceof Error?i.message:"pmrem-generation"}finally{e.dispose(),t.dispose()}}createGround(e){const i=e.world.width+480,r=-240,s=e.world.height+240,a=i- -480,o=s-r,c=Math.ceil(a/ya),l=Math.ceil(o/ya),d=[],h=[],u=[],p=[],g=new De,v=new De(16777215);for(let b=0;b<=l;b+=1){const A=Math.min(s,r+b*ya);for(let _=0;_<=c;_+=1){const w=Math.min(i,-480+_*ya),R=Ch(_+401,b+809,17),P=-3.8+((R>>>9&255)/255-.5)*2.2;d.push(w,P,A),u.push((w- -480)/a,1-(A-r)/o),g.setHex(sS(w,A,b*(c+1)+_)),g.offsetHSL(((R>>>19&15)/15-.5)*.012,((R>>>4&15)/15-.5)*.035,((R>>>13&15)/15-.5)*.055),g.lerp(v,this.environmentProfile==="r04-live"?Oe.display.groundWhiteMix:this.environmentProfile==="beauty-cell"?.24:.72),h.push(g.r,g.g,g.b)}}for(let b=0;b<l;b+=1)for(let A=0;A<c;A+=1){const _=b*(c+1)+A,w=_+1,R=_+c+1,P=R+1;(b+A)%2===0?p.push(_,R,w,w,R,P):p.push(_,R,P,_,P,w)}const m=new Et;m.setAttribute("position",new Xe(d,3)),m.setAttribute("color",new Xe(h,3)),m.setAttribute("uv",new Xe(u,2)),m.setIndex(p),m.computeVertexNormals(),m.computeBoundingBox(),m.computeBoundingSphere();const f=new ft({color:16777215,vertexColors:!0,roughness:.96,metalness:0,dithering:!0}),x=b=>{b.name="generated-reclaimed-meadow-v1",b.colorSpace=jt,b.wrapS=Vn,b.wrapT=Vn,b.repeat.set(a/720,o/720),b.minFilter=hi,b.magFilter=Bt,b.anisotropy=this.qualityProfile==="pc-ultra"?this.renderer.capabilities.getMaxAnisotropy():Math.min(4,this.renderer.capabilities.getMaxAnisotropy())};this.renderer.domElement.dataset.groundTexture="loading";const S=new X0().load(GM,b=>{if(this.disposed){b.dispose();return}x(b),this.groundTexture=b,f.map=b,f.color.setHex(16777215),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="ready"},void 0,()=>{this.groundTexture?.dispose(),this.groundTexture=null,!this.disposed&&(f.map=null,f.color.setHex(10991757),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="fallback")});x(S),this.groundTexture=S,f.map=S;const y=new Ue(m,f);y.name="continuous-reclaimed-ground",y.receiveShadow=!0,this.scene.add(y);const E=new Fo(new mu(new cn(e.world.width,8,e.world.height)),new tc({color:6458738,transparent:!0,opacity:.12}));E.position.set(e.world.width/2,-7,e.world.height/2),this.scene.add(E)}createFieldGrowth(e,t=new Set){const r=Math.ceil(e.world.width/142),s=Math.ceil(e.world.height/142),a=[],o=(m,f,x,S,y=1,E=1,b=1)=>{a.push({x:m,y:f,z:x,rotation:(S>>>8)%16*(Math.PI/8),scaleX:y*(.78+(S>>>3)%7*.055),scaleY:b*(.82+(S>>>19)%6*.06),scaleZ:E*(.8+(S>>>13)%7*.05)})};for(let m=0;m<s;m+=1)for(let f=0;f<r;f+=1){const x=(Math.imul(f+11,73856093)^Math.imul(m+17,19349663))>>>0;if(x%100>15)continue;const S=(f+.5)*142+((x>>>3&255)/255-.5)*52,y=(m+.5)*142+((x>>>11&255)/255-.5)*52;S<24||y<24||S>e.world.width-24||y>e.world.height-24||Math.abs(y-900)<88||e.world.terrain.some(E=>S>E.bounds.x-10&&S<E.bounds.x+E.bounds.width+10&&y>E.bounds.y-10&&y<E.bounds.y+E.bounds.height+10)||o(S,.8,y,x,.84+(x>>>21)%4*.1,.82+(x>>>25)%4*.1,.82)}if(e.world.terrain.forEach((m,f)=>{if(t.has(m.id))return;const x=m.bounds,S=x.x,y=x.x+x.width,E=x.y,b=x.y+x.height,A=S+x.width/2,_=E+x.height/2,w=Ch(f+31,x.x,x.y);switch(m.kind){case"building":{const R=m.height+10.5;o(S+x.width*.2,R,E+x.height*.22,w,1.25,1,.78),o(y-x.width*.16,R,b-x.height*.2,w^1540483477,1.38,.92,.9),o(A+x.width*.08,R,b-x.height*.1,w^3550635116,2.05,.7,.52),o(S-3,.8,_-x.height*.2,w^668265261,1.15,1.32),o(y+2,.8,_+x.height*.22,w^374761393,1.1,1.26);break}case"wall":{const R=x.width>=x.height;for(let P=0;P<3;P+=1){const D=.16+P*.34,O=w^Math.imul(P+7,73244475);o(R?S+x.width*D:A,m.height+.8,R?_:E+x.height*D,O,R?1.42:.82,R?.82:1.42,.72)}o(R?A+x.width*.26:S-3,.8,R?b+2:_+x.height*.2,w^2654435769,R?1.25:.94,R?.94:1.25);break}case"pillar":o(A,m.height+.8,_,w,1.02,1.02,.72),o(y+1,.8,b-x.height*.12,w^2135587861,1.2,1.2);break;case"rock":o(A+x.width*.25,m.height+.8,_+x.height*.3,w,1.28,1.14,.9);break;case"water":{[[S+x.width*.12,E-2,!1],[S+x.width*.48,E-4,!1],[y-x.width*.12,E+1,!0],[y+2,E+x.height*.28,!1],[y-1,b-x.height*.18,!0],[S+x.width*.64,b+2,!1],[S+x.width*.26,b-1,!0],[S-3,E+x.height*.54,!1]].forEach(([P,D,O],B)=>{o(P,O?m.height+.5:.8,D,w^Math.imul(B+13,668265261),1.02,1.24,.92)});break}}}),a.length===0)return;const c=tS(),l=new ft({color:16777215,vertexColors:!0,roughness:.88,metalness:0}),d=new ss(c,l,a.length),h=new st,u=new I,p=new Tn,g=new I,v=new I(0,1,0);a.forEach((m,f)=>{u.set(m.x,m.y,m.z),p.setFromAxisAngle(v,m.rotation),g.set(m.scaleX,m.scaleY,m.scaleZ),h.compose(u,p,g),d.setMatrixAt(f,h)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.name="reclaiming-growth",d.receiveShadow=!0,this.scene.add(d)}createTerrain(e,t=new Set){const i={building:new ft({color:11119246,roughness:.92}),wall:new ft({color:9737866,roughness:.96}),rock:new ft({color:8360315,roughness:.98}),pillar:new ft({color:9799578,roughness:.9}),water:new ft({color:5083553,transparent:!0,opacity:.82,roughness:.28,metalness:.04})};for(const r of e.world.terrain){if(t.has(r.id))continue;const s=new cn(r.bounds.width,r.height,r.bounds.height),a=new Ue(s,i[r.kind]);if(a.position.set(r.bounds.x+r.bounds.width/2,r.height/2,r.bounds.y+r.bounds.height/2),a.name=r.id,a.receiveShadow=r.kind!=="water",a.castShadow=r.kind==="building"||r.kind==="wall"||r.kind==="pillar",this.scene.add(a),r.kind!=="water"){const o=new Fo(new mu(s),new tc({color:r.kind==="pillar"?7362427:6450525,transparent:!0,opacity:.34}));o.position.copy(a.position),this.scene.add(o)}if(r.kind==="building"){const o=new Ue(new cn(r.bounds.width+18,10,r.bounds.height+18),new ft({color:12020809,roughness:.86}));o.position.set(a.position.x,r.height+5,a.position.z),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o)}}}createProps(e,t=new Set){for(const i of e.world.props){if(t.has(i.id))continue;const r=rS(i.kind),s=$r(r,jM,1),a=new Ke;a.position.set(i.x,0,i.y),a.rotation.y=i.rotation,a.add(s,es(28,17,.24)),i.kind==="lamp"?a.scale.setScalar(.72):i.kind==="signpost"?a.scale.set(.62,.78,.62):i.kind==="relay"&&a.scale.setScalar(1.18),a.name=i.id,this.scene.add(a)}}createLandmarkSignals(e){const t=[6415825,16034128,8546725];e.world.landmarks.forEach((i,r)=>{const s=new Pt({color:t[r]??6415825,transparent:!0,opacity:.12,side:an,depthWrite:!1}),a=new Ue(new Gi(54,59,40),s);a.rotation.x=-Math.PI/2,a.position.set(i.center.x,2,i.center.y),a.name=`landmark-${i.id}`,this.scene.add(a)})}syncPlayer(e,t,i){const r=e.player,s=this.lastPlayerX===null||this.lastPlayerY===null?0:Math.hypot(r.x-this.lastPlayerX,r.y-this.lastPlayerY);this.lastPlayerX=r.x,this.lastPlayerY=r.y,this.playerGroup.position.x=r.x,this.playerGroup.position.z=r.y,this.playerGroup.position.y=Math.sin(this.elapsed*5.2)*.6,this.playerGroup.rotation.y=nM(r.facingX,r.facingY,this.environmentProfile==="r04-live"?"+z":"-z"),this.bladeMesh.visible=r.weaponId==="blade",this.impactMesh.visible=r.weaponId==="impact",this.attackAnimation=Math.max(0,this.attackAnimation-t*4.8);const a=1-this.attackAnimation,o=this.attackAnimation>0?Math.sin(a*Math.PI)*(this.attackWeapon==="impact"?1.42:1.05):0;this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?(this.bladeMesh.rotation.set(0,0,0),this.impactMesh.rotation.set(0,0,0)):(this.bladeMesh.rotation.z=-.42-o,this.impactMesh.rotation.z=-.28-o);const c=r.invulnerableTicks>0&&e.tick%2===0?12124148:16777215;if(this.playerHeroVisual===null){this.bladeMesh instanceof Ue&&this.impactMesh instanceof Ue&&(dc(this.bladeMesh,"blade"),dc(this.impactMesh,"impact")),eS(this.playerBody,c);return}Ga(this.bladeMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:lc),Ga(this.impactMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:cc),this.heroHurtAnimation=Math.max(0,this.heroHurtAnimation-t*3.8),this.heroSkillAnimation=Math.max(0,this.heroSkillAnimation-t*1.45);const l=t>Number.EPSILON?Rt.clamp(s/t/118,0,1):0,d=nS(i,this.heroHurtAnimation,this.heroSkillAnimation,this.attackAnimation,l);this.playerHeroVisual.updatePose({motion:d.motion,timeSeconds:this.elapsed,progress:d.progress,moveAmount:l}),this.playerHeroVisual.setTint(c)}syncCompanion(e,t){const i=e.player,r=Math.hypot(i.facingX,i.facingY),s=r>Number.EPSILON?i.facingX/r:0,a=r>Number.EPSILON?i.facingY/r:-1,o=i.x-s*32-a*38,c=i.y-a*32+s*38,l=(this.companionGroup.position.x-o)**2+(this.companionGroup.position.z-c)**2;if(!this.companionInitialized||l>140**2)this.companionGroup.position.x=o,this.companionGroup.position.z=c,this.companionInitialized=!0;else{const h=1-Math.exp(-6.4*t);this.companionGroup.position.x=Rt.lerp(this.companionGroup.position.x,o,h),this.companionGroup.position.z=Rt.lerp(this.companionGroup.position.z,c,h)}this.companionGroup.position.y=1.2+Math.sin(this.elapsed*4.4+.8)*.7,this.companionGroup.rotation.y=Math.atan2(-s,-a),this.companionReaction=Math.max(0,this.companionReaction-t*2.6);const d=1+Math.sin((1-this.companionReaction)*Math.PI*3)*this.companionReaction*.045;this.companionGroup.scale.setScalar(d*(this.environmentProfile==="r04-live"?Oe.actors.companionPreviewScale:this.environmentProfile==="beauty-cell"?1.08:1)),this.companionBeautyVisual?.updatePose({timeSeconds:this.elapsed,moveAmount:Rt.clamp(Math.sqrt(l)/72,0,1),reaction:this.companionReaction})}syncEnemies(e){const t=new Set;for(const i of e.enemies){t.add(i.id);let r=this.enemyVisuals.get(i.id);if(r===void 0&&(r=this.createEnemyVisual(i),this.enemyVisuals.set(i.id,r),this.scene.add(r.group)),r.group.visible=!i.defeated||i.kind==="named-anomaly",r.group.position.set(i.x,r.baseY,i.y),r.group.rotation.y=Math.atan2(-(e.player.x-i.x),-(e.player.y-i.y)),r.group.scale.setScalar(i.disposition==="calmed"||i.disposition==="connected"?.92:i.defeated?.28:1),r.body.material.opacity=i.disposition==="connected"?.62:1,r.body.material.transparent=i.disposition==="connected",r.telegraph.visible=i.attack.phase==="telegraph",r.telegraph.visible){const s=Ur[i.kind],a=1+Math.sin(i.attack.ticksRemaining/Math.max(1,s.telegraphTicks)*Math.PI*2)*.08;r.telegraph.scale.setScalar(a*((s.attackRange+i.radius)/58)),r.telegraph.material.opacity=.34+(1-i.attack.ticksRemaining/Math.max(1,s.telegraphTicks))*.5}}for(const[i,r]of this.enemyVisuals)t.has(i)||(r.group.visible=!1)}syncCombatPresentation(e,t){if(t===void 0||t.targetId===null){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const i=e.enemies.find(a=>a.id===t.targetId&&!a.defeated);if(i===void 0){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const r=Math.max(24,i.radius*1.45);this.targetRing.visible=!0,this.targetRing.position.set(i.x,2.8,i.y),this.targetRing.scale.setScalar(r/30),this.targetRing.material.color.setHex(e.player.weaponId==="blade"?6415825:16034128),this.targetRing.material.opacity=.56+Math.sin(this.elapsed*6)*.12;const s=t.phase==="windup";if(this.windupRing.visible=s,s){this.windupRing.position.set(i.x,3,i.y);const a=Math.max(.05,1-t.progress);this.windupRing.scale.setScalar(r/30*(1.6*a+.72)),this.windupRing.material.opacity=.3+t.progress*.66}}createEnemyVisual(e){const t=iS(e.kind),i=$r(t,e.kind==="named-anomaly"?Th*1.15:Th,1),r=new Ke,s=new Ue(new Gi(43,54,32),new Pt({color:15548468,transparent:!0,opacity:.48,side:an,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=3,s.visible=!1,r.add(i,es(e.kind==="named-anomaly"?54:34,e.kind==="named-anomaly"?31:20,.26),s),{group:r,body:i,telegraph:s,baseY:e.kind==="murmur"?16:0}}syncLoot(e){for(const t of e.world.loot){let i=this.lootVisuals.get(t.id);if(i===void 0){const r=$r(ws,1.55,1);i=new Ke,i.add(r,es(17,10,.2)),i.position.set(t.x,4,t.y),i.scale.setScalar(.68),i.name=t.id,this.lootVisuals.set(t.id,i),this.scene.add(i)}i.visible=!t.picked}}handleEvents(e){for(const t of e)switch(t.type){case"player-attacked":this.attackAnimation=1,this.attackWeapon=t.weaponId,this.addAttackRing(t),this.pulseEffectLight(t.x,t.y,t.weaponId==="blade"?16770220:16034128,t.weaponId==="blade"?.58:.82);break;case"enemy-damaged":{this.cameraTrauma=Math.min(1,this.cameraTrauma+(t.source==="impact"?.82:t.source==="relic"?.66:.28));const i=this.enemyVisuals.get(t.enemyId);i!==void 0&&(this.addBurst(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:15195581,t.source==="impact"?13:8),this.pulseEffectLight(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:16770220,t.source==="relic"?1:.62));break}case"player-damaged":this.heroHurtAnimation=1,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,15291461,10),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,16735304,.9);break;case"guard-resolved":this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:15195581,22,34,.28,1.8),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:16770220,t.justGuard?.92:.5);break;case"relic-activated":this.heroSkillAnimation=1,this.companionReaction=1,this.addRing(t.x,t.y,6415825,t.radius*.76,t.radius*.82,.62,1.36),this.addRing(t.x,t.y,13041651,t.radius*.38,t.radius*.42,.44,1.82),this.addBurst(t.x,t.y,10287336,16),this.pulseEffectLight(t.x,t.y,6415825,1);break;case"loot-picked":this.companionReaction=.82,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,6415825,9),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,6415825,.72);break;case"anomaly-resolved":this.companionReaction=1,this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?15291461:t.outcome==="calm"?16034128:6415825,36,250,1.1,2.4),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?16735304:t.outcome==="calm"?16034128:6415825,1);break}}pulseEffectLight(e,t,i,r){this.effectLight.position.set(e,54,t),this.effectLight.color.setHex(i),this.effectLightEnergy=Math.max(this.effectLightEnergy,r)}addAttackRing(e){const t=Math.atan2(e.directionY,e.directionX),i=e.weaponId==="blade"?15195581:16034128,r=e.weaponId==="blade"?e.range*.52:20,s=e.weaponId==="blade"?e.range:e.range*1.15,a=new Gi(r,s,24,1,-.72,1.44),o=new Pt({color:i,transparent:!0,opacity:.66,side:an,depthWrite:!1}),c=new Ue(a,o);c.rotation.x=-Math.PI/2,c.rotation.z=t,c.position.set(e.x,8,e.y),this.scene.add(c),this.ringEffects.push({mesh:c,age:0,duration:e.weaponId==="blade"?.18:.3,grow:e.weaponId==="blade"?1.05:1.25})}addRing(e,t,i,r,s,a,o){const c=new Ue(new Gi(r,s,40),new Pt({color:i,transparent:!0,opacity:.56,side:an,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set(e,7,t),this.scene.add(c),this.ringEffects.push({mesh:c,age:0,duration:a,grow:o})}addBurst(e,t,i,r){const s=new cn(8,8,8),a=new Pt({color:i}),o=new ss(s,a,r),c=[],l=[];for(let d=0;d<r;d+=1){const h=d/r*Math.PI*2+d%3*.19,u=70+d%4*17;c.push(new I(e,28,t)),l.push(new I(Math.cos(h)*u,70+d%5*14,Math.sin(h)*u)),this.reusableMatrix.makeTranslation(e,28,t),o.setMatrixAt(d,this.reusableMatrix)}o.instanceMatrix.needsUpdate=!0,this.scene.add(o),this.burstEffects.push({mesh:o,positions:c,velocities:l,age:0,duration:.5})}updateEffects(e){this.effectLightEnergy=Math.max(0,this.effectLightEnergy-e*3.8),this.effectLight.intensity=this.effectLightEnergy*this.effectLightEnergy*155;for(let t=this.ringEffects.length-1;t>=0;t-=1){const i=this.ringEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration),s=1+r*(i.grow-1);i.mesh.scale.setScalar(s),i.mesh.material.opacity=(1-r)*.56,r>=1&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.ringEffects.splice(t,1))}for(let t=this.burstEffects.length-1;t>=0;t-=1){const i=this.burstEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration);for(let s=0;s<i.positions.length;s+=1){const a=i.positions[s],o=i.velocities[s];a===void 0||o===void 0||(o.y-=260*e,a.addScaledVector(o,e),this.reusablePosition.copy(a),this.reusableScale.setScalar(Math.max(.05,1-r)),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),i.mesh.setMatrixAt(s,this.reusableMatrix))}i.mesh.instanceMatrix.needsUpdate=!0,r>=1&&(this.scene.remove(i.mesh),i.mesh.dispose(),i.mesh.geometry.dispose(),aS(i.mesh.material),this.burstEffects.splice(t,1))}}cameraTargetOffsetX(){return this.environmentProfile==="r04-live"?Oe.camera.targetOffsetX:this.environmentProfile==="beauty-cell"?-42:0}cameraTargetOffsetZ(){return this.environmentProfile==="r04-live"?Oe.camera.targetOffsetZ:this.environmentProfile==="beauty-cell"?-54:0}syncR04KeyLight(){this.environmentProfile==="r04-live"&&(this.keyLightTarget.position.set(this.cameraTarget.x,0,this.cameraTarget.z),this.keyLight.position.set(this.cameraTarget.x+Oe.lighting.keyOffsetX,Oe.lighting.keyOffsetY,this.cameraTarget.z+Oe.lighting.keyOffsetZ))}snapCamera(e){const t=dh({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:"idle"},this.cameraCompositionProfile);this.cameraTarget.set(t.targetX+this.cameraTargetOffsetX(),this.environmentProfile==="r04-live"?Oe.camera.targetHeight:28,t.targetY+this.cameraTargetOffsetZ()),this.renderer.domElement.dataset.cameraComposition=t.mode,this.camera.position.copy(this.cameraTarget).add(Eh),this.camera.lookAt(this.cameraTarget),this.syncR04KeyLight(),this.camera.updateProjectionMatrix()}updateCamera(e,t,i){const r=i?.targetId===null||i?.targetId===void 0?void 0:e.enemies.find(d=>d.id===i.targetId),s=dh({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:i?.phase??"idle",targetX:r?.x,targetY:r?.y},this.cameraCompositionProfile);this.renderer.domElement.dataset.cameraComposition=s.mode;const a=this.environmentProfile==="r04-live"?Oe.camera.followSpeed:8,o=1-Math.exp(-a*t);this.cameraTarget.lerp(this.reusablePosition.set(s.targetX+this.cameraTargetOffsetX(),this.environmentProfile==="r04-live"?Oe.camera.targetHeight:28,s.targetY+this.cameraTargetOffsetZ()),o);const c=this.reusablePosition.copy(this.cameraTarget).add(Eh);if(this.camera.position.lerp(c,o),this.cameraTrauma=Math.max(0,this.cameraTrauma-t*3.4),this.cameraTrauma>.001){const d=this.cameraTrauma*this.cameraTrauma*7.5;this.camera.position.x+=Math.sin(this.elapsed*137.3)*d,this.camera.position.y+=Math.sin(this.elapsed*173.1)*d*.28,this.camera.position.z+=Math.cos(this.elapsed*151.7)*d}if(this.camera.lookAt(this.cameraTarget),this.syncR04KeyLight(),this.qualityProfile==="pc-ultra")return;const l=this.cameraViewHeight/this.internalRenderHeight;this.camera.position.x=Math.round(this.camera.position.x/l)*l,this.camera.position.y=Math.round(this.camera.position.y/l)*l,this.camera.position.z=Math.round(this.camera.position.z/l)*l}updateAmbientMotion(e,t){for(const[r,s]of this.enemyVisuals){const a=e.enemies.find(c=>c.id===r);if(a===void 0)continue;const o=a.kind==="murmur"?8:2;s.group.position.y=s.baseY+Math.sin(t*3.1+r.length*.7)*o}let i=0;for(const r of this.lootVisuals.values())r.rotation.y=t*.8+i*.4,r.position.y=5+Math.sin(t*2.4+i)*5,i+=1}}function ep(n,e,t){const i=n.dimensions.width*e,r=n.dimensions.depth*e,s=Pf(n,{voxelSize:e,shadeFaces:!1,origin:{x:-i/2,y:0,z:-r/2}}),a=new Et;return a.setAttribute("position",new Ht(s.positions,3)),a.setAttribute("normal",new Ht(s.normals,3)),a.setAttribute("color",new Ht(s.colors,3)),a.setIndex(new Ht(s.indices,1)),t&&s.materialGroups.forEach((o,c)=>{a.addGroup(o.start,o.count,c)}),a.computeBoundingSphere(),{geometry:a,data:s}}function $r(n,e,t){const{geometry:i}=ep(n,e,!1),r=new ft({color:16777215,vertexColors:!0,transparent:t<1,opacity:t,roughness:.78,metalness:.04}),s=new Ue(i,r);return s.name=n.id,s}function Ah(n,e){const{geometry:t,data:i}=ep(n,e,!0),r=i.materialGroups.map(a=>$M(a.role)),s=new Ue(t,r);return s.name=n.id,s}function $M(n){switch(n){case"matte":return new ft({color:16777215,vertexColors:!0,roughness:.84,metalness:0});case"metal":return new ft({color:16777215,vertexColors:!0,roughness:.38,metalness:.68});case"emissive":return new Pt({color:16777215,vertexColors:!0,toneMapped:!1})}}function eS(n,e){for(const t of n.material)(t instanceof ft||t instanceof Pt)&&t.color.setHex(e)}function es(n,e,t){const i=new Fc(1,24),r=new Pt({color:2373682,transparent:!0,opacity:t*.72,depthWrite:!1}),s=new Ue(i,r);return s.rotation.x=-Math.PI/2,s.scale.set(n,e,1),s.position.y=1,s}function Rh(n,e){const t=new Gi(25,30,64),i=new Pt({color:n,transparent:!0,opacity:e,depthWrite:!1,side:an,blending:za}),r=new Ue(t,i);return r.rotation.x=-Math.PI/2,r.renderOrder=12,r}function tS(){const n=[{size:[26,3.5,18],position:[0,1.75,0],color:3766847},{size:[15,5,21],position:[-7,4.25,4],color:5083459},{size:[12,11,12],position:[5,7.5,-3],color:3108928},{size:[10,8,10],position:[-5,8,5],color:6988622},{size:[4.5,4.5,4.5],position:[5,15.5,0],color:15780172},{size:[4,4,4],position:[-7,13,7],color:14970728}],e=[],t=[],i=[],r=new De;for(const a of n){const o=new cn(a.size[0],a.size[1],a.size[2]).toNonIndexed();o.translate(a.position[0],a.position[1],a.position[2]);const c=o.getAttribute("position"),l=o.getAttribute("normal");for(let d=0;d<c.count;d+=1){const h=l.getY(d),u=Math.abs(l.getX(d)),p=h>.5?1:h<-.5?.58:u>.5?.82:.72;r.setHex(a.color).multiplyScalar(p),e.push(c.getX(d),c.getY(d),c.getZ(d)),t.push(l.getX(d),l.getY(d),l.getZ(d)),i.push(r.r,r.g,r.b)}o.dispose()}const s=new Et;return s.setAttribute("position",new Xe(e,3)),s.setAttribute("normal",new Xe(t,3)),s.setAttribute("color",new Xe(i,3)),s.computeBoundingBox(),s.computeBoundingSphere(),s}function Ch(n,e,t){return(Math.imul(Math.trunc(n)+101,73856093)^Math.imul(Math.trunc(e)+211,19349663)^Math.imul(Math.trunc(t)+307,83492791))>>>0}function Ph(n,e){n.rotation.x=e==="blade"?.12:.04,n.rotation.z=e==="blade"?-.42:-.28,n.scale.setScalar(e==="blade"?.9:.86),dc(n,e)}function nS(n,e,t,i,r){if(e>0)return{motion:"hurt",progress:1-e};if(t>0)return{motion:"skill",progress:1-t};if(i>0)return{motion:"hit",progress:1-i};switch(n?.phase){case"windup":return{motion:"windup",progress:n.progress};case"hit":return{motion:"hit",progress:n.progress};case"recover":return{motion:"recovery",progress:n.progress};case"idle":case"acquire":case void 0:return r>.08?{motion:"run",progress:0}:{motion:"idle",progress:0}}}function dc(n,e){const t=e==="blade"?lc:cc;_a.set(t.x,t.y,t.z).multiply(n.scale).applyEuler(n.rotation),n.position.set(ol.x-_a.x,ol.y-_a.y,ol.z-_a.z)}function iS(n){switch(n){case"scrap-hound":return Kc;case"relay-shell":return jc;case"murmur":return Jc;case"named-anomaly":return Qc}}function rS(n){switch(n){case"dead-tree":case"signpost":return so;case"relay":case"lamp":case"anomaly-marker":return ws;case"contract-board":return ed;default:return $c}}function sS(n,e,t){if(n<760&&e>430&&e<1370)return t%3===0?7509097:6323800;if(n>2420&&n<3330&&e>380&&e<1420)return t%4===0?8750716:7764594;if(Math.abs(e-900)<145)return t%3===0?10123353:8874063;const i=(Math.floor(n/80)*17+Math.floor(e/80)*31>>>0)%4;return[4683588,5210184,5998929,6854234][i]??4683588}function aS(n){const e=Array.isArray(n)?n:[n];for(const t of e)t.dispose()}function oS(n){return n.replaceChildren(),n.className="game-shell prototype-b-shell",n.innerHTML=`
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
  `,{stage:St(n,".relic-stage"),worldMount:St(n,".relic-world"),statusLive:St(n,'[data-ui="status-live"]'),titleOverlay:St(n,'[data-ui="title"]'),startButton:Ma(n,'[data-ui="start"]'),muteButton:Ma(n,'[data-ui="mute"]'),zoneLabel:St(n,'[data-ui="zone"]'),objectiveText:St(n,'[data-ui="objective"]'),healthFill:St(n,'[data-ui="health-fill"]'),healthText:St(n,'[data-ui="health-text"]'),weaponName:St(n,'[data-ui="weapon-name"]'),weaponDetail:St(n,'[data-ui="weapon-detail"]'),relicName:St(n,'[data-ui="relic-name"]'),itemCount:St(n,'[data-ui="item-count"]'),targetPanel:St(n,'[data-ui="target"]'),targetName:St(n,'[data-ui="target-name"]'),targetFill:St(n,'[data-ui="target-fill"]'),contextPrompt:St(n,'[data-ui="context-prompt"]'),toast:St(n,'[data-ui="toast"]'),dossier:St(n,'[data-ui="dossier"]'),dossierTitle:St(n,'[data-ui="dossier-title"]'),dossierBody:St(n,'[data-ui="dossier-body"]'),outcomePanel:St(n,'[data-ui="outcome"]'),outcomeBackButton:Ma(n,'[data-ui="outcome-back"]'),resultPanel:St(n,'[data-ui="result"]'),resultTitle:St(n,'[data-ui="result-title"]'),resultBody:St(n,'[data-ui="result-body"]'),restartButton:Ma(n,'[data-ui="restart"]'),performance:St(n,'[data-ui="performance"]'),orientationNotice:St(n,'[data-ui="orientation"]')}}function St(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout element is missing: ${e}`);return t}function Ma(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout button is missing: ${e}`);return t}const ll=1e3/$n,Dh=5,lS=Math.ceil($n*.7),Ih="relic-frontier-b-02",cl=new WeakMap;function cS(n){return new URLSearchParams(n).getAll("debug").includes("1")}const dS={"edge-coil":{title:"縁断コイル E-04",effect:"測量刃の威力を6増幅する。",principle:"刃の輪郭だけを0.03秒先に送る位相先行。仮説。",sideEffect:"鞘に入れた鉛筆まで、やたら尖る。",note:"『切れ味より、書類の角が怖い』— 前任調査員"},"gravity-weight":{title:"局所重錘 G-12",effect:"杭打機の威力を12増幅する。",principle:"衝突の瞬間だけ質量の参照先を衛星軌道へ移す。仮説。",sideEffect:"使用後、持ち主の靴だけ三分間重くなる。",note:"『置き忘れない。床がへこむ』— 整備票"},"field-tonic":{title:"野外縫合剤 T-3",effect:"体力を45回復する道具を1個追加する。",principle:"傷口へ本人の正常時データを上書きする医療糊。",sideEffect:"治った場所が一度だけ知らない番号へ発信する。",note:"『通話料は観測所持ちにしてほしい』— 使用者"},"relay-capacitor":{title:"中継蓄相器 C-17",effect:"斥力環の威力を10増し、再使用を1秒短縮する。",principle:"周辺機器の待ち時間を回収し、電荷として再利用する。",sideEffect:"近くの炊飯器が、完了前に完了音を鳴らす。",note:"『急かされている気がする』— 台所担当"},"quiet-chime":{title:"無音鈴 Q-0",effect:"反響体を斥力環で鎮静できる。",principle:"音を出すのではなく、周囲から同じ長さの沈黙を引く。",sideEffect:"鳴らすたび、どこかで一匹だけ犬が首を傾げる。",note:"『聞こえなかった。だから作動した』— 観測記録"},"signal-key":{title:"信号鍵 K-99",effect:"反響体との直接接続を解禁する。",principle:"鍵穴ではなく、通信相手の「返事したい気持ち」を開く。",sideEffect:"接続中、使用者の独り言が字幕として表示される。",note:"『考えてから黙ること』— 接続手順書"}},uS={destroy:"破壊",calm:"鎮静",connect:"接続"};function Sa(n,e={}){cl.get(n)?.destroy();const t=oS(n);fS(n,t,e);const i=new yp(t.stage),r=new gp,s=[];let a=Id(Ih),o=ze(t,a),c=0,l=performance.now(),d=0,h=!1,u=!1,p=!1,g=!1,v=0,m=0,f=0,x=0,S=0,y=!1,E,b=uo(),A=0,_=!1,w=!1,R=0;const P=window.matchMedia("(orientation: portrait)");let D=P.matches;i.setEnabled(!1),dl(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1});const O=(se,Ae=performance.now(),Ce=1800)=>{t.statusLive.textContent=se,R=Ae+Ce},B=()=>h&&!D&&!p&&!document.hidden&&a.status==="playing",U=()=>Ia(a)&&!y,W=se=>{D=P.matches,t.stage.inert=D,t.orientationNotice.setAttribute("aria-hidden",String(!D)),i.setEnabled(B()),d=0,l=performance.now(),se&&(O(D?"ゲームを一時停止しました。端末を横向きにしてください。":"横向き表示へ戻りました。調査を再開します。"),!D&&h&&t.stage.focus({preventScroll:!0}))};W(!1);const k=()=>{h||u||(h=!0,(e.experience==="north-star"||e.experience==="beauty-cell"||e.experience==="r04")&&(t.stage.dataset.presentationState="active"),t.titleOverlay.setAttribute("aria-hidden","true"),t.titleOverlay.inert=!0,i.setEnabled(B()),l=performance.now(),O("調査開始。町の依頼板に近づき、調査ボタンを押してください。",l),D||t.stage.focus({preventScroll:!0}),r.unlock().catch(()=>{ve(t,"音声を開始できませんでした。ゲームは続行できます。",performance.now())}))},q=()=>{g=!g,r.setMuted(g),t.muteButton.setAttribute("aria-pressed",String(g)),t.muteButton.innerHTML=g?'<span aria-hidden="true">×</span> MUTED':'<span aria-hidden="true">◖))</span> SOUND'},J=()=>{a=Id(Ih),b=uo(),A=0,E=void 0,d=0,y=!1,_=!1,w=!1,o.dispose(),o=ze(t,a),t.resultPanel.setAttribute("aria-hidden","true"),t.resultPanel.inert=!0,t.outcomePanel.setAttribute("aria-hidden","true"),t.outcomePanel.inert=!0,i.setEnabled(B()),ve(t,"新しい調査記録を開始。",performance.now()),dl(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1}),t.stage.focus({preventScroll:!0})},ne=()=>k(),ae=()=>q(),le=()=>J(),Ge=se=>{se.code==="Enter"&&k()},$e=()=>{l=performance.now(),d=0,i.setEnabled(B())},ke=()=>W(!0),K=()=>{Ia(a)&&(y=!0,ve(t,"応答を保留。街道へ戻り、必要な遺物を探せる。",performance.now(),3600),O("応答を保留しました。反響体の近くで調査すると、選択へ戻れます。"))},ie=se=>{if(!U())return;if(se.code==="Escape"){se.preventDefault(),K();return}if(se.code!=="Tab")return;const Ae=Uh(t);if(Ae.length===0)return;se.preventDefault();const Ce=Ae.indexOf(document.activeElement),dt=se.shiftKey?Ce<=0?Ae.length-1:Ce-1:Ce<0||Ce===Ae.length-1?0:Ce+1;Ae[dt]?.focus({preventScroll:!0})};t.startButton.addEventListener("click",ne),t.muteButton.addEventListener("click",ae),t.restartButton.addEventListener("click",le),t.outcomeBackButton.addEventListener("click",K),window.addEventListener("keydown",Ge),window.addEventListener("keydown",ie),document.addEventListener("visibilitychange",$e),P.addEventListener("change",ke),s.push(()=>t.startButton.removeEventListener("click",ne),()=>t.muteButton.removeEventListener("click",ae),()=>t.restartButton.removeEventListener("click",le),()=>t.outcomeBackButton.removeEventListener("click",K),()=>window.removeEventListener("keydown",Ge),()=>window.removeEventListener("keydown",ie),()=>document.removeEventListener("visibilitychange",$e),()=>P.removeEventListener("change",ke));const ee=se=>{if(u)return;const Ae=Math.min(100,Math.max(0,se-l));l=se;const Ce=[];if(h&&!p&&!document.hidden&&!D&&a.status==="playing"){d+=Ae;let Ze=0;for(;d>=ll&&Ze<Dh;){const We=i.consumeFrame(),ut=U();if(y&&We.interact&&AS(a))y=!1,O("反響体への応答選択を再開します。",se);else if(!ut||We.outcomeChoice!==null){const ot=hS(a,We,ut);if(e.semiAutoCombat===!0&&!ut)if(ot.activateRelic===!0&&a.player.relicCooldownTicks<=1?A=Math.max(A,lS):(ot.dodge===!0||ot.chooseWeapon!==void 0)&&(A=Math.max(A,1)),A>0)b=uo(),A-=1,ot.moveSpeedScale=1,ot.attack=!1,E={targetId:null,phase:"idle",progress:0};else{const je=gm(b,a);b=je.state,ot.moveSpeedScale=je.presentation.movementScale,ot.attack=je.commandContribution.attack===!0,E={targetId:je.presentation.targetId,phase:je.presentation.phase,progress:je.presentation.phaseProgress}}const L=um(a,ot);a=L.state,Ce.push(...L.events)}d-=ll,Ze+=1}Ze===Dh&&(d=Math.min(d,ll))}at(t,r,a,Ce,se),Ia(a)||(y=!1);const dt=U();if(dl(t,a,se,{decisionOpen:dt,announceStatus:h&&!D&&!p&&se>=R}),pS(t,a,E),qe(dt),r.setDanger(D||document.hidden?0:bS(a)),document.hidden||r.update(),o.update(a,Ce,se,D||document.hidden?0:Ae,E),x+=1,S+=Ae,se-f>=500){const Ze=S>0?Math.round(x*1e3/S):0,We=o.getStats();t.performance.textContent=`${Ze} FPS · ${We.width}×${We.height} · ${We.calls} CALL · ${We.triangles} TRI`,x=0,S=0,f=se}se>=v&&t.toast.classList.remove("is-visible"),se>=m&&t.dossier.setAttribute("aria-hidden","true"),c=requestAnimationFrame(ee)},we={destroy(){if(!u){u=!0,cancelAnimationFrame(c),i.destroy(),r.dispose(),o.dispose();for(const se of s.splice(0))se();cl.delete(n)}},getState(){return a}};function ze(se,Ae){return new QM(se.worldMount,Ae,{onContextLost:()=>{p=!0,i.setEnabled(!1);const Ce=performance.now();ve(se,"描画装置との接続が切れました。復旧を待っています。",Ce,2e4),O("WebGL描画コンテキストが失われました。",Ce,2e4)},onContextRestored:()=>{p=!1,i.setEnabled(B());const Ce=performance.now();ve(se,"描画装置との接続を復旧しました。",Ce),O("描画装置との接続を復旧しました。",Ce),l=Ce,d=0},companionPreview:e.companionPreview,cameraCompositionProfile:e.experience==="r04"?"r04":e.experience==="baseline"||e.experience===void 0?"baseline":"north-star",environmentProfile:e.experience==="r04"?"r04-live":e.experience==="beauty-cell"?"beauty-cell":e.experience==="north-star"?"north-star-city":"start-town",qualityProfile:e.renderQuality})}function ve(se,Ae,Ce,dt=2800){se.toast.textContent=Ae,se.toast.classList.add("is-visible"),v=Ce+dt}function gt(se,Ae){const Ce=dS[se];t.dossierTitle.textContent=Ce.title,t.dossierBody.textContent=[`効果　${Ce.effect}`,`原理　${Ce.principle}`,`副作用　${Ce.sideEffect}`,`所感　${Ce.note}`].join(`
`),t.dossier.setAttribute("aria-hidden","false"),m=Ae+7e3}function qe(se){const Ae=t.outcomePanel.contains(document.activeElement);t.outcomePanel.inert=!se,se!==_&&(se&&!D?Uh(t)[0]?.focus({preventScroll:!0}):!D&&Ae&&t.stage.focus({preventScroll:!0}),_=se);const Ce=t.resultPanel.getAttribute("aria-hidden")==="false";t.resultPanel.inert=!Ce,Ce!==w&&(Ce&&!D&&t.restartButton.focus({preventScroll:!0}),w=Ce)}return cl.set(n,we),c=requestAnimationFrame(ee),we;function at(se,Ae,Ce,dt,Ze){for(const We of dt)switch(MS(Ae,We),We.type){case"weapon-selected":ve(se,We.weaponId==="blade"?"測量刃へ持ち替えた。速く、間合いが長い。":"杭打機へ持ち替えた。遅いが、重く吹き飛ばす。",Ze);break;case"loot-picked":{const ut=Bh[We.lootId];ve(se,`${ut.name}を回収。`,Ze),gt(We.lootId,Ze);break}case"landmark-entered":ve(se,We.landmarkId==="fork"?"三叉路を記録。廃区の信号が強くなる。":We.landmarkId==="ruin"?"聴取廃区へ侵入。発信源は近い。":"ダストウェイク観測町へ帰還。",Ze);break;case"quest-advanced":ve(se,tp(Ce),Ze,3300);break;case"outcome-committed":ve(se,We.outcome==="destroy"?"破壊手順を確定。通常攻撃で停止させる。":We.outcome==="calm"?"鎮静手順を確定。近くで斥力環を使う。":"接続手順を確定。近くで調査する。",Ze,4e3);break;case"anomaly-resolved":ve(se,`反響体への${uS[We.outcome]}を記録。町へ戻れ。`,Ze,4e3);break;case"enemy-defeated":We.enemyId!==Ii&&ve(se,"異形を停止。周囲を調べられる。",Ze);break;case"item-used":ve(se,`縫合剤を使用。体力を${We.healed}回復。`,Ze);break;case"command-rejected":ve(se,wS(We.reason),Ze);break;case"player-defeated":i.setEnabled(!1),se.resultTitle.textContent="調査記録、途絶",se.resultBody.textContent=`辺境はあなたを待たずに巡り続ける。
装備と防御の使い方を変え、もう一度この経路を試せる。`,se.resultPanel.setAttribute("aria-hidden","false"),se.resultPanel.inert=!1,O("調査員は倒れました。",Ze,1e4);break;case"result-reached":i.setEnabled(!1),O(`依頼完了。${We.result.title}`,Ze,1e4);break}}}function hS(n,e,t){const i=mS(e.outcomeChoice);if(t)return i===void 0?{}:{chooseOutcome:i};const r=tM(e.moveX,e.moveY);return{moveX:r.moveX,moveY:r.moveY,attack:e.attack,guard:e.guard,dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,chooseWeapon:e.switchWeapon?gS(n.player.weaponId):void 0}}function fS(n,e,t){if(t.experience!=="north-star"&&t.experience!=="beauty-cell"&&t.experience!=="r04")return;n.classList.add("north-star-shell"),e.stage.classList.add("north-star-stage");const i=t.experience==="beauty-cell",r=t.experience==="r04";(i||r)&&(n.classList.add("beauty-cell-shell"),e.stage.classList.add("beauty-cell-stage")),r&&(n.classList.add("r04-shell"),e.stage.classList.add("r04-stage")),e.stage.dataset.experience=t.experience,e.stage.dataset.prototypeVersion=r?"R04":i?"R02":"R01",e.stage.dataset.presentationState="intro";const s=cS(window.location.search);e.stage.classList.toggle("is-north-star-debug",s),e.stage.dataset.debug=s?"1":"0",e.performance.hidden=!s,e.stage.setAttribute("aria-label",r?"R02系統 R04。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。":i?"AI-native Beauty Cell。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。":"North Star Scene。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。");const a=document.createElement("div");a.className="north-star-badge",a.hidden=!s,a.innerHTML=r?"<span>CAUSAL BEAUTY CELL</span><strong>R04 / R02 SYSTEMS / PC ULTRA</strong>":i?"<span>AI-NATIVE BEAUTY CELL</span><strong>R02 / PC ULTRA / LIVE SYSTEMS</strong>":"<span>VISUAL NORTH STAR</span><strong>PC ULTRA / LIVE COMBAT</strong>",e.stage.append(a);const o=document.createElement("div");o.className="north-star-combat-readout",o.dataset.phase="idle",o.setAttribute("aria-hidden","true"),o.innerHTML=`
    <strong data-ui="north-star-combat-phase">LOCK</strong>
    <i><em data-ui="north-star-combat-progress"></em></i>
  `,e.stage.append(o);const c=e.titleOverlay.querySelector(".relic-title__copy .relic-kicker"),l=e.titleOverlay.querySelector("h1"),d=e.titleOverlay.querySelector("p"),h=e.startButton.querySelector("span"),u=e.startButton.querySelector("small"),p=e.stage.querySelector(".relic-hud__identity strong");c!==null&&(c.textContent=r?"R02 CAUSAL WORLD / CONCEPT C VISUAL REBUILD":i?"AI-NATIVE CONCEPT C / REALTIME BEAUTY CELL":"PC ULTRA VISUAL + GAME FEEL BENCHMARK"),l!==null&&(l.innerHTML=r?"緑蝕<br /><em>雨庭区</em>":i?"緑蝕<br /><em>交差区</em>":"緑蝕<br /><em>観測区</em>"),d!==null&&(d.innerHTML=r?"雨上がりの都市は、滅びたあとも鮮やかだ。<br />歩き、拾い、戦い、世界の記憶を自分の経路にする。":i?"光と水と緑が都市を更新している。<br />調査員は歩き、拾い、間合いを選び、大技だけを自分で撃つ。":"自然に呑まれた現代都市を歩く。<br />間合いで通常攻撃を起こし、大技で戦況を変える。"),h!==null&&(h.textContent=r?"雨庭区へ降りる":i?"Beauty Cellを歩く":"North Star Sceneを開始"),u!==null&&(u.textContent="MOVE / AUTO BASIC / MANUAL SKILL"),(i||r)&&p!==null&&(p.textContent=r?"緑蝕・第07雨庭区":"緑蝕・第04交差区");const g=e.stage.querySelector('[data-control="attack"]');g!==null&&(g.tabIndex=-1,g.setAttribute("aria-hidden","true"));const v=e.stage.querySelector('[data-control="relic"]'),m=v?.querySelector("span"),f=v?.querySelector("small");m!=null&&(m.textContent="大技"),f!=null&&(f.textContent="Q / MANUAL")}function pS(n,e,t){const i=n.stage.querySelector(".north-star-combat-readout");if(i===null)return;const r=i.querySelector('[data-ui="north-star-combat-phase"]'),s=i.querySelector('[data-ui="north-star-combat-progress"]'),a=t?.phase??"idle",o={idle:"LOCK",acquire:"LOCK",windup:e.player.weaponId==="blade"?"WINDUP":"CHARGE",hit:"HIT",recover:"RECOVER"};r!==null&&(r.textContent=o[a]),s!==null&&(s.style.width=`${Math.round((t?.progress??0)*100)}%`),i.dataset.phase=a,n.stage.dataset.combatPhase=a,n.stage.dataset.combatTarget=t?.targetId??""}function mS(n){switch(n){case 0:return"destroy";case 1:return"calm";case 2:return"connect";default:return}}function gS(n){return n==="blade"?"impact":"blade"}function dl(n,e,t,i={}){const r=e.player,s=Math.max(0,r.hp/r.maxHp),a=La[r.weaponId],o=r.weaponDamageBonuses[r.weaponId],c=r.relicCooldownTicks/$n,l=i.decisionOpen??Ia(e);n.stage.dataset.questPhase=e.quest.phase,n.stage.dataset.playerX=String(Math.round(r.x)),n.stage.dataset.playerY=String(Math.round(r.y)),n.stage.dataset.weapon=r.weaponId,n.stage.dataset.status=e.status,n.zoneLabel.textContent=n.stage.dataset.experience==="r04"?"緑蝕・第07雨庭区":n.stage.dataset.experience==="beauty-cell"?"緑蝕・第04交差区":vS(r.x,r.y),n.objectiveText.textContent=tp(e),n.healthFill.style.width=`${Math.round(s*100)}%`,n.healthFill.style.background=s<=.3?"var(--relic-danger)":"linear-gradient(90deg, var(--relic-amber), var(--relic-signal))",n.healthText.textContent=`${r.hp} / ${r.maxHp}`,n.weaponName.textContent=r.weaponId==="blade"?"測量刃":"杭打機",n.weaponDetail.textContent=`${r.weaponId==="blade"?"速い・広い":"遅い・重い"} / 威力 ${a.damage+o}`,n.relicName.textContent=c<=0?"斥力環 R-17 / READY":`斥力環 R-17 / ${c.toFixed(1)}s`,n.itemCount.textContent=`× ${r.healingItems}`,xS(n,e),n.outcomePanel.setAttribute("aria-hidden",String(!l));const d=Nh(n,"outcome-calm"),h=Nh(n,"outcome-connect");Lh(d,r.collectedLootIds.includes("quiet-chime"),"無音鈴 Q-0 が必要"),Lh(h,r.collectedLootIds.includes("signal-key"),"信号鍵 K-99 が必要");const u=_S(e);if(n.contextPrompt.setAttribute("aria-hidden",String(u===null||l)),u!==null){const p=n.contextPrompt.querySelector("span"),g=n.contextPrompt.querySelector("strong");p!==null&&(p.textContent=u.key),g!==null&&(g.textContent=u.text)}if(e.status==="result"&&e.quest.result!==null){const p=e.quest.result;n.resultTitle.textContent=ES(p.outcome),n.resultBody.textContent=TS(p.outcome),n.resultPanel.setAttribute("aria-hidden","false"),n.resultPanel.inert=!1}if(i.announceStatus!==!1&&t>0&&e.status==="playing"){const p=`${n.zoneLabel.textContent}。目的：${n.objectiveText.textContent}。体力${r.hp}。武器${n.weaponName.textContent}。`;n.statusLive.textContent!==p&&(n.statusLive.textContent=p)}}function xS(n,e){const t=e.enemies.filter(i=>i.active&&!i.defeated&&i.disposition==="hostile").map(i=>({enemy:i,distance:Math.hypot(e.player.x-i.x,e.player.y-i.y)})).filter(i=>i.distance<=440).sort((i,r)=>i.distance-r.distance||i.enemy.id.localeCompare(r.enemy.id))[0]?.enemy;n.targetPanel.setAttribute("aria-hidden",String(t===void 0)),t!==void 0&&(n.targetName.textContent=yS(t.kind),n.targetFill.style.width=`${Math.round(t.hp/t.maxHp*100)}%`)}function tp(n){switch(n.quest.phase){case"briefing":return"町の依頼板を調べる";case"travel-to-fork":return"東の三叉路へ向かう";case"travel-to-ruin":return"聴取廃区の発信源へ向かう";case"confrontation":return n.quest.intent==="destroy"?"反響体を攻撃して停止させる":n.quest.intent==="calm"?"反響体の近くで斥力環を使う":n.quest.intent==="connect"?"反響体の近くで調査する":"反響体への応答を選ぶ";case"return-town":return"観測町の依頼板へ帰還する";case"result":return"依頼記録を閉じる"}}function vS(n,e){return ul(n,e,dn.town.bounds)?"ダストウェイク観測町":ul(n,e,dn.ruin.bounds)?"聴取廃区":ul(n,e,dn.fork.bounds)?"三叉路":n<1180?"赤錆街道・西":n<2450?"赤錆街道・東":"廃区外縁"}function yS(n){switch(n){case"scrap-hound":return"屑鉄猟犬";case"relay-shell":return"中継殻";case"murmur":return"囁き";case"named-anomaly":return"聴取断層《オリソン》"}}function _S(n){const e=n.player;if(n.world.loot.some(r=>!r.picked&&Math.hypot(e.x-r.x,e.y-r.y)<=e.radius+r.radius+70))return{key:"E",text:"遺物を回収"};if(n.quest.phase==="briefing"&&zh(e,dn.town.interactionPoint)<=e.radius+70)return{key:"E",text:"依頼板を調べる"};const i=n.enemies.find(r=>r.id===Ii);if(i!==void 0&&pc(e,i)){if(n.quest.phase==="confrontation"&&n.quest.intent===null)return{key:"E",text:"反響体への応答を選ぶ"};if(n.quest.intent==="connect")return{key:"E",text:"信号鍵で接続"};if(n.quest.intent==="calm")return{key:"Q",text:"斥力環で鎮静"};if(n.quest.intent==="destroy")return{key:"J",text:"武器で破壊"}}return n.quest.phase==="return-town"&&zh(e,dn.town.interactionPoint)<=e.radius+70?{key:"E",text:"依頼を報告"}:null}function MS(n,e){if(e.type==="player-damaged"){n.play("hurt");return}if(e.type==="weapon-selected"||e.type==="command-rejected"){n.play("ui");return}if("cue"in e){const t=SS(e.cue);t!==null&&n.play(t)}}function SS(n){switch(n){case"blade-swing":return"blade";case"impact-swing":return"impact";case"enemy-warning":return"warning";case"enemy-impact":return"enemy-impact";case"guard":return"guard";case"just-guard":return"perfect-guard";case"dodge":return"dodge";case"relic":return"relic";case"heal":return"item";case"loot":return"pickup";case"quest":return"ui";case"outcome-destroy":case"outcome-calm":case"outcome-connect":return n;case"result":return"result"}}function bS(n){let e=Number.POSITIVE_INFINITY;for(const t of n.enemies)!t.active||t.defeated||t.disposition!=="hostile"||(e=Math.min(e,Math.hypot(n.player.x-t.x,n.player.y-t.y)));return Number.isFinite(e)?1-Math.min(1,Math.max(0,(e-100)/500)):0}function wS(n){switch(n){case"item-full-health":return"体力は満タン。縫合剤は温存した。";case"item-empty":return"縫合剤がない。";case"outcome-already-chosen":return"応答手順はすでに確定している。";case"outcome-not-available":return"必要な遺物がない。街道を調べ直せる。";case"wrong-quest-phase":return"ここではその応答を選べない。"}}function ES(n){switch(n){case"destroy":return"静かになった断層";case"calm":return"眠る断層";case"connect":return"開いたままの回線"}}function TS(n){switch(n){case"destroy":return`町は静寂を歓迎した。しかし中継守たちは、失われた信号を弔い始めた。
次の旅では、別の返事も選べる。`;case"calm":return`廃区は穏やかになり、旅人は三叉路へ小さな供物を置き始めた。
あなたの鎮静記録が、この土地の新しい習慣になる。`;case"connect":return`廃区から短い通信が届き始め、誰が返事をしてよいか町で議論になった。
回線の向こう側は、まだ何者とも確定していない。`}}function Lh(n,e,t){n.disabled=!e,n.setAttribute("aria-label",e?n.textContent?.trim()??"選択":`${n.textContent?.trim()??"選択"}。${t}`),n.title=e?"":t}function Nh(n,e){const t=n.outcomePanel.querySelector(`[data-control="${e}"]`);if(t===null)throw new Error(`Outcome button is missing: ${e}`);return t}function Uh(n){return Array.from(n.outcomePanel.querySelectorAll("button:not(:disabled)"))}function Ia(n){return n.quest.phase==="confrontation"&&n.quest.intent===null}function AS(n){const e=n.enemies.find(t=>t.id===Ii);return e!==void 0&&pc(n.player,e)}function ul(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function zh(n,e){return Math.hypot(n.x-e.x,n.y-e.y)}const uc=document.querySelector("#app");if(uc===null)throw new Error("Application root was not found.");RS(uc).catch(n=>{CS(uc,n)});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});async function RS(n){if(new URLSearchParams(window.location.search).get("prototype")==="0.1"){const{startGame:i}=await hp(async()=>{const{startGame:r}=await import("./startGame-6yY4X5Xk.js");return{startGame:r}},[]);i(n);return}const t=cp(window.location.pathname,window.location.search);if(t==="r04"){Sa(n,{experience:"r04",renderQuality:"pc-ultra",companionPreview:!1,semiAutoCombat:!0});return}if(t==="r02"){Sa(n,{experience:"beauty-cell",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0});return}if(t==="r01"){Sa(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0});return}Sa(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0})}function CS(n,e){n.replaceChildren(),n.className="game-shell boot-failure-shell";const t=document.createElement("section");t.className="boot-failure",t.setAttribute("role","alert");const i=document.createElement("span");i.textContent="RELIC FRONTIER / STARTUP ERROR";const r=document.createElement("h1");r.textContent="描画装置を起動できませんでした";const s=document.createElement("p");s.textContent="この試作にはWebGL対応ブラウザが必要です。ページを再読み込みしても直らない場合は、比較用の旧試作を開けます。";const a=document.createElement("a");a.href="?prototype=0.1",a.textContent="旧試作 0.1 を開く",t.append(i,r,s,a),n.append(t),console.error("Prototype B failed to start.",e)}
