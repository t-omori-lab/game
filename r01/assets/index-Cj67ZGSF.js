(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const hf="modulepreload",uf=function(n,e){return new URL(n,e).href},Bc={},ff=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(t.map(d=>{if(d=uf(d,i),d in Bc)return;Bc[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(i)for(let g=a.length-1;g>=0;g--){const _=a[g];if(_.href===d&&(!u||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":hf,u||(p.as="script"),p.crossOrigin="",p.href=d,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((g,_)=>{p.addEventListener("load",g),p.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},pf=92,mf=60/pf/2,Dr=.08,kc=[110,130.81,146.83,174.61,146.83,123.47];function gf(n,e,t=Dr){return!Number.isFinite(n)||n<e?e+t:n}class xf{context=null;master=null;musicBus=null;effectsBus=null;noiseBuffer=null;nextBeatAt=0;beatIndex=0;danger=0;muted=!1;get isReady(){return this.context!==null&&this.context.state==="running"}async unlock(){if(this.context===null){const e=new AudioContext({latencyHint:"interactive",sampleRate:44100}),t=e.createGain(),i=e.createGain(),r=e.createGain();t.gain.value=this.muted?0:.72,i.gain.value=.22,r.gain.value=.58,i.connect(t),r.connect(t),t.connect(e.destination),this.context=e,this.master=t,this.musicBus=i,this.effectsBus=r,this.noiseBuffer=vf(e),this.nextBeatAt=e.currentTime+Dr}this.context.state!=="running"&&(await this.context.resume(),this.nextBeatAt=this.context.currentTime+Dr)}setMuted(e){const t=this.muted;if(this.muted=e,this.context!==null&&this.master!==null){const i=this.context.currentTime;t&&!e&&(this.nextBeatAt=i+Dr),this.master.gain.cancelScheduledValues(i),this.master.gain.setTargetAtTime(e?0:.72,i,.015)}}setDanger(e){this.danger=_f(e,0,1)}update(){const e=this.context,t=this.musicBus;if(e===null||t===null||e.state!=="running"||this.muted)return;const i=e.currentTime,r=i+Dr;this.nextBeatAt=gf(this.nextBeatAt,i);let s=0;for(;this.nextBeatAt<=r&&s<2;){const a=kc[this.beatIndex%kc.length]??110,o=this.beatIndex%4===0;this.playTone(a,this.nextBeatAt,o?.2:.105,o?.095:.05,"square",t),this.danger>.15&&this.beatIndex%2===1&&this.playTone(a*2.01,this.nextBeatAt+.015,.065,.025+this.danger*.035,"sawtooth",t),o&&this.playNoise(this.nextBeatAt,.045,.008+this.danger*.012,210,t),this.beatIndex+=1,this.nextBeatAt+=mf,s+=1}}play(e){const t=this.context,i=this.effectsBus;if(t===null||i===null||t.state!=="running"||this.muted)return;const r=t.currentTime;switch(e){case"blade":this.playSweep(720,280,r,.075,.16,"sawtooth",i),this.playNoise(r,.035,.055,2200,i);break;case"impact":this.playSweep(118,42,r,.16,.28,"square",i),this.playNoise(r,.11,.12,310,i);break;case"guard":this.playTone(392,r,.085,.13,"square",i),this.playTone(587.33,r+.018,.06,.07,"triangle",i);break;case"perfect-guard":this.playTone(523.25,r,.12,.15,"square",i),this.playTone(783.99,r+.035,.12,.11,"square",i);break;case"hurt":this.playSweep(160,72,r,.18,.17,"sawtooth",i),this.playNoise(r,.08,.08,480,i);break;case"warning":this.playTone(880,r,.055,.075,"square",i),this.playTone(660,r+.07,.07,.07,"square",i);break;case"enemy-impact":this.playSweep(95,48,r,.13,.2,"square",i),this.playNoise(r,.075,.07,390,i);break;case"dodge":this.playSweep(420,135,r,.11,.09,"triangle",i),this.playNoise(r,.065,.04,1100,i);break;case"relic":this.playSweep(190,880,r,.34,.14,"triangle",i),this.playTone(617,r+.08,.28,.075,"square",i),this.playNoise(r+.03,.2,.04,1400,i);break;case"item":this.playTone(440,r,.09,.1,"triangle",i),this.playTone(659.25,r+.065,.13,.09,"triangle",i);break;case"pickup":this.playTone(329.63,r,.055,.08,"square",i),this.playTone(493.88,r+.045,.075,.08,"square",i);break;case"ui":this.playTone(246.94,r,.045,.045,"square",i);break;case"result":this.playTone(220,r,.22,.08,"triangle",i),this.playTone(329.63,r+.11,.27,.08,"triangle",i),this.playTone(493.88,r+.23,.36,.07,"triangle",i);break;case"outcome-destroy":this.playSweep(164.81,55,r,.48,.18,"sawtooth",i),this.playNoise(r+.08,.24,.1,260,i);break;case"outcome-calm":this.playTone(261.63,r,.42,.1,"triangle",i),this.playTone(392,r+.12,.46,.09,"triangle",i);break;case"outcome-connect":this.playTone(220,r,.5,.07,"square",i),this.playSweep(330,665,r+.08,.56,.1,"triangle",i),this.playNoise(r+.12,.4,.035,1800,i);break}}dispose(){this.context!==null&&this.context.close(),this.context=null,this.master=null,this.musicBus=null,this.effectsBus=null,this.noiseBuffer=null}playTone(e,t,i,r,s,a){const o=this.context;if(o===null)return;const l=o.createOscillator(),c=o.createGain();l.type=s,l.frequency.setValueAtTime(e,t),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(r,t+.008),c.gain.exponentialRampToValueAtTime(1e-4,t+i),l.connect(c),c.connect(a),l.start(t),l.stop(t+i+.02)}playSweep(e,t,i,r,s,a,o){const l=this.context;if(l===null)return;const c=l.createOscillator(),d=l.createGain();c.type=a,c.frequency.setValueAtTime(e,i),c.frequency.exponentialRampToValueAtTime(Math.max(1,t),i+r),d.gain.setValueAtTime(1e-4,i),d.gain.exponentialRampToValueAtTime(s,i+.006),d.gain.exponentialRampToValueAtTime(1e-4,i+r),c.connect(d),d.connect(o),c.start(i),c.stop(i+r+.02)}playNoise(e,t,i,r,s){const a=this.context,o=this.noiseBuffer;if(a===null||o===null)return;const l=a.createBufferSource(),c=a.createBiquadFilter(),d=a.createGain();l.buffer=o,c.type="bandpass",c.frequency.value=r,c.Q.value=.7,d.gain.setValueAtTime(i,e),d.gain.exponentialRampToValueAtTime(1e-4,e+t),l.connect(c),c.connect(d),d.connect(s),l.start(e),l.stop(e+t)}}function vf(n){const e=Math.floor(n.sampleRate*.5),t=n.createBuffer(1,e,n.sampleRate),i=t.getChannelData(0);let r=1235467297;for(let s=0;s<i.length;s+=1)r^=r<<13,r^=r>>>17,r^=r<<5,i[s]=(r>>>0)/4294967295*2-1;return t}function _f(n,e,t){return Math.min(t,Math.max(e,n))}const Vc=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"]);class Mf{constructor(e){this.root=e,this.joystickPad=ss(e,'[data-control="move"]'),this.joystickKnob=ss(e,'[data-control="move-knob"]'),this.bindJoystick(),this.bindActionButton("attack",()=>{this.queued.attack=!0}),this.bindHoldButton("guard",()=>{this.guardHeld=!0,this.updateGuardMovementChord()},()=>{this.guardHeld=!1,this.updateGuardMovementChord()}),this.bindActionButton("relic",()=>{this.queued.activateRelic=!0}),this.bindActionButton("item",()=>{this.queued.useItem=!0}),this.bindActionButton("interact",()=>{this.queued.interact=!0}),this.bindActionButton("switch-weapon",()=>{this.queued.switchWeapon=!0}),this.bindActionButton("outcome-destroy",()=>{this.queued.outcomeChoice=0}),this.bindActionButton("outcome-calm",()=>{this.queued.outcomeChoice=1}),this.bindActionButton("outcome-connect",()=>{this.queued.outcomeChoice=2}),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.reset),this.listeners.push(()=>{window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.reset)})}root;pressedKeys=new Set;listeners=[];joystickPad;joystickKnob;joystickPointerId=null;joystickX=0;joystickY=0;guardHeld=!1;guardMovementChordActive=!1;enabled=!1;queued=Ca();setEnabled(e){this.enabled=e,this.root.classList.toggle("is-controls-disabled",!e),e||this.reset()}consumeFrame(){const e=this.queued;this.queued=Ca();const t=(this.isPressed("ArrowRight","KeyD")?1:0)-(this.isPressed("ArrowLeft","KeyA")?1:0),i=(this.isPressed("ArrowDown","KeyS")?1:0)-(this.isPressed("ArrowUp","KeyW")?1:0);let r=t===0?this.joystickX===0?e.moveX:this.joystickX:t,s=i===0?this.joystickY===0?e.moveY:this.joystickY:i;const a=Math.hypot(r,s);return a>1&&(r/=a,s/=a),this.enabled?{moveX:r,moveY:s,attack:e.attack,guard:this.isGuardActive(),dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,switchWeapon:e.switchWeapon,outcomeChoice:e.outcomeChoice}:{moveX:0,moveY:0,attack:!1,guard:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}destroy(){this.reset();for(const e of this.listeners.splice(0))e()}bindJoystick(){const e=r=>{!this.enabled||this.joystickPointerId!==null||(r.preventDefault(),this.joystickPointerId=r.pointerId,this.joystickPad.setPointerCapture(r.pointerId),this.updateJoystick(r))},t=r=>{r.pointerId===this.joystickPointerId&&(r.preventDefault(),this.updateJoystick(r))},i=r=>{r.pointerId===this.joystickPointerId&&(this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.updateGuardMovementChord(),this.updateJoystickKnob())};this.joystickPad.addEventListener("pointerdown",e),this.joystickPad.addEventListener("pointermove",t),this.joystickPad.addEventListener("pointerup",i),this.joystickPad.addEventListener("pointercancel",i),this.listeners.push(()=>{this.joystickPad.removeEventListener("pointerdown",e),this.joystickPad.removeEventListener("pointermove",t),this.joystickPad.removeEventListener("pointerup",i),this.joystickPad.removeEventListener("pointercancel",i)})}bindActionButton(e,t){const i=ss(this.root,`[data-control="${e}"]`),r=a=>{this.enabled&&(a.preventDefault(),t())},s=a=>{this.enabled&&(a.preventDefault(),!(a.detail>0)&&t())};i.addEventListener("pointerdown",r),i.addEventListener("click",s),this.listeners.push(()=>{i.removeEventListener("pointerdown",r),i.removeEventListener("click",s)})}bindHoldButton(e,t,i){const r=ss(this.root,`[data-control="${e}"]`),s=c=>{this.enabled&&(c.preventDefault(),r.setPointerCapture(c.pointerId),t())},a=c=>{c.preventDefault(),i()},o=c=>{!this.enabled||c.repeat||c.code!=="Space"&&c.code!=="Enter"||(c.preventDefault(),t())},l=c=>{c.code!=="Space"&&c.code!=="Enter"||(c.preventDefault(),i())};r.addEventListener("pointerdown",s),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a),r.addEventListener("keydown",o),r.addEventListener("keyup",l),this.listeners.push(()=>{r.removeEventListener("pointerdown",s),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",a),r.removeEventListener("keydown",o),r.removeEventListener("keyup",l)})}handleKeyDown=e=>{if(!(!this.enabled||yf(e))&&((Vc.has(e.code)||e.code==="Space")&&e.preventDefault(),this.pressedKeys.add(e.code),this.queueMovementTap(e.code),this.updateGuardMovementChord(),!e.repeat))switch(e.code){case"Space":case"KeyJ":this.queued.attack=!0;break;case"KeyK":this.queued.dodge=!0;break;case"KeyQ":case"KeyL":this.queued.activateRelic=!0;break;case"KeyR":this.queued.useItem=!0;break;case"KeyE":this.queued.interact=!0;break;case"Digit1":e.preventDefault(),this.queued.switchWeapon=!0;break;case"Digit7":this.queued.outcomeChoice=0;break;case"Digit8":this.queued.outcomeChoice=1;break;case"Digit9":this.queued.outcomeChoice=2;break}};handleKeyUp=e=>{this.pressedKeys.delete(e.code),this.updateGuardMovementChord()};reset=()=>{this.pressedKeys.clear(),this.guardHeld=!1,this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.guardMovementChordActive=!1,this.queued=Ca(),this.updateJoystickKnob()};updateJoystick(e){const t=this.joystickPad.getBoundingClientRect(),i=Math.min(t.width,t.height)*.5,r=e.clientX-(t.left+t.width*.5),s=e.clientY-(t.top+t.height*.5),a=Math.hypot(r,s),o=a>i?i/a:1;this.joystickX=r*o/i,this.joystickY=s*o/i,this.queued.moveX=this.joystickX,this.queued.moveY=this.joystickY,this.updateGuardMovementChord(),this.updateJoystickKnob()}updateGuardMovementChord(){const e=Math.hypot(this.joystickX,this.joystickY)>.22||[...Vc].some(i=>this.pressedKeys.has(i)),t=this.isGuardActive()&&e;t&&!this.guardMovementChordActive&&(this.queued.dodge=!0),this.guardMovementChordActive=t}isGuardActive(){return this.guardHeld||this.pressedKeys.has("ShiftLeft")||this.pressedKeys.has("ShiftRight")}queueMovementTap(e){switch(e){case"ArrowRight":case"KeyD":this.queued.moveX=1;break;case"ArrowLeft":case"KeyA":this.queued.moveX=-1;break;case"ArrowDown":case"KeyS":this.queued.moveY=1;break;case"ArrowUp":case"KeyW":this.queued.moveY=-1;break}}updateJoystickKnob(){this.joystickKnob.style.setProperty("--move-x",`${this.joystickX*42}px`),this.joystickKnob.style.setProperty("--move-y",`${this.joystickY*42}px`)}isPressed(e,t){return this.pressedKeys.has(e)||this.pressedKeys.has(t)}}function Ca(){return{moveX:0,moveY:0,attack:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null}}function ss(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B control is missing: ${e}`);return t}function yf(n){return n.code!=="Space"&&n.code!=="Enter"?!1:typeof Element<"u"&&n.target instanceof Element&&n.target.closest("button[data-control]")!==null}const kn=30,Sf=3600,bf=1800,Yt={x:500,y:950},an={town:{id:"town",name:"Dustwake Town",bounds:{x:80,y:500,width:620,height:800},center:{x:390,y:900},interactionPoint:Yt},fork:{id:"fork",name:"Three-Way Fork",bounds:{x:1180,y:550,width:680,height:700},center:{x:1520,y:900},interactionPoint:{x:1520,y:900}},ruin:{id:"ruin",name:"Listening Ruin",bounds:{x:2450,y:420,width:850,height:960},center:{x:2875,y:900},interactionPoint:{x:2930,y:900}}},Ef=[an.town,an.fork,an.ruin],Tf=[{id:"town-hall",kind:"building",bounds:{x:130,y:570,width:250,height:150},solid:!0,height:96},{id:"town-well",kind:"rock",bounds:{x:320,y:790,width:82,height:82},solid:!0,height:34},{id:"south-house",kind:"building",bounds:{x:150,y:1090,width:230,height:130},solid:!0,height:78},{id:"town-board-collider",kind:"rock",bounds:{x:Yt.x-46,y:Yt.y-10,width:92,height:20},solid:!0,height:0},{id:"town-hall-workyard-collider",kind:"rock",bounds:{x:380,y:707,width:100,height:64},solid:!0,height:0},{id:"town-repair-bench-collider",kind:"rock",bounds:{x:510,y:777,width:115,height:76},solid:!0,height:0},{id:"town-south-lamp-collider",kind:"rock",bounds:{x:460,y:1030,width:20,height:23},solid:!0,height:0},{id:"town-kitchen-garden-collider",kind:"rock",bounds:{x:405,y:1110,width:75,height:90},solid:!0,height:0},{id:"town-south-crates-collider",kind:"rock",bounds:{x:385,y:1186,width:61,height:53},solid:!0,height:0},{id:"fork-boulder",kind:"rock",bounds:{x:1405,y:665,width:130,height:120},solid:!0,height:64},{id:"shallow-basin",kind:"water",bounds:{x:1900,y:1125,width:300,height:170},solid:!0,height:4},{id:"ruin-west-wall-north",kind:"wall",bounds:{x:2500,y:500,width:48,height:320},solid:!0,height:84},{id:"ruin-west-wall-south",kind:"wall",bounds:{x:2500,y:980,width:48,height:320},solid:!0,height:84},{id:"ruin-north-wall",kind:"wall",bounds:{x:2500,y:500,width:700,height:48},solid:!0,height:84},{id:"ruin-south-wall",kind:"wall",bounds:{x:2500,y:1252,width:700,height:48},solid:!0,height:84},{id:"ruin-pillar-north",kind:"pillar",bounds:{x:2720,y:690,width:68,height:68},solid:!0,height:100},{id:"ruin-pillar-south",kind:"pillar",bounds:{x:2720,y:1042,width:68,height:68},solid:!0,height:100}],wf=[{id:"town-contract-board",kind:"contract-board",x:Yt.x,y:Yt.y,rotation:0,landmarkId:"town",interactive:!0},{id:"town-lamp-a",kind:"lamp",x:470,y:760,rotation:0,landmarkId:"town",interactive:!1},{id:"town-lamp-b",kind:"lamp",x:470,y:1040,rotation:0,landmarkId:"town",interactive:!1},{id:"fork-sign",kind:"signpost",x:1520,y:900,rotation:.15,landmarkId:"fork",interactive:!1},{id:"fork-dead-tree",kind:"dead-tree",x:1670,y:710,rotation:-.4,landmarkId:"fork",interactive:!1},{id:"ruin-relay",kind:"relay",x:2790,y:900,rotation:0,landmarkId:"ruin",interactive:!1},{id:"ruin-anomaly-marker",kind:"anomaly-marker",x:2930,y:900,rotation:0,landmarkId:"ruin",interactive:!0}],aa={blade:{id:"blade",name:"Survey Blade",range:104,damage:16,cooldownTicks:10,arcCosine:.25,hitLimit:2,knockback:12,cue:"blade-swing"},impact:{id:"impact",name:"Pile Driver",range:66,damage:38,cooldownTicks:25,arcCosine:-.2,hitLimit:3,knockback:38,cue:"impact-swing"}},mr={"scrap-hound":{kind:"scrap-hound",name:"Scrap Hound",radius:18,maxHp:38,speed:132,damage:12,attackRange:42,aggroRange:340,telegraphTicks:9,recoveryTicks:24},"relay-shell":{kind:"relay-shell",name:"Relay Shell",radius:27,maxHp:92,speed:62,damage:22,attackRange:54,aggroRange:300,telegraphTicks:20,recoveryTicks:39},murmur:{kind:"murmur",name:"Murmur",radius:21,maxHp:54,speed:88,damage:16,attackRange:68,aggroRange:420,telegraphTicks:15,recoveryTicks:30},"named-anomaly":{kind:"named-anomaly",name:"Orison, the Listening Fault",radius:42,maxHp:124,speed:54,damage:28,attackRange:88,aggroRange:520,telegraphTicks:24,recoveryTicks:42}},Di="anomaly-orison",Af=[{id:"enemy-hound",kind:"scrap-hound",x:940,y:835},{id:"enemy-shell",kind:"relay-shell",x:1820,y:1e3},{id:"enemy-murmur",kind:"murmur",x:2270,y:760},{id:Di,kind:"named-anomaly",x:an.ruin.interactionPoint.x,y:an.ruin.interactionPoint.y}],qh={"edge-coil":{id:"edge-coil",name:"Edge Coil",description:"Adds 6 damage to the fast, long-reaching blade.",effect:"blade-damage",amount:6},"gravity-weight":{id:"gravity-weight",name:"Gravity Weight",description:"Adds 12 damage to the slow, close impact weapon.",effect:"impact-damage",amount:12},"field-tonic":{id:"field-tonic",name:"Field Tonic",description:"Adds one 45 HP healing item.",effect:"healing-item",amount:1},"relay-capacitor":{id:"relay-capacitor",name:"Relay Capacitor",description:"Adds 10 relic damage and shortens its cooldown by one second.",effect:"relic-power",amount:10},"quiet-chime":{id:"quiet-chime",name:"Quiet Chime",description:"Allows the relic pulse to calm the named anomaly.",effect:"calm-key",amount:1},"signal-key":{id:"signal-key",name:"Signal Key",description:"Allows a direct connection with the named anomaly.",effect:"connect-key",amount:1}},Rf=[{id:"pickup-edge-coil",lootId:"edge-coil",x:665,y:760,radius:18},{id:"pickup-field-tonic",lootId:"field-tonic",x:1050,y:1020,radius:18},{id:"pickup-gravity-weight",lootId:"gravity-weight",x:1640,y:1105,radius:18},{id:"pickup-relay-capacitor",lootId:"relay-capacitor",x:2030,y:720,radius:18},{id:"pickup-quiet-chime",lootId:"quiet-chime",x:2360,y:1030,radius:18},{id:"pickup-signal-key",lootId:"signal-key",x:2350,y:900,radius:18}],Cf={destroy:{outcome:"destroy",title:"Fault Silenced",townReaction:"The town accepts the quiet, but the relay keepers mourn the lost signal."},calm:{outcome:"calm",title:"Fault at Rest",townReaction:"The ruin grows still. Travelers begin leaving offerings at the fork."},connect:{outcome:"connect",title:"A Line Left Open",townReaction:"Messages arrive from the ruin, and the town argues over who may answer."}},Yh=1831565813,Pf=4294967296;function Lf(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Df(n){const e=Lf(String(n));return e===0?Yh:e}function If(n){let e=n>>>0;return e===0&&(e=Yh),e^=e<<13,e^=e>>>17,e^=e<<5,e>>>=0,{state:e,value:e/Pf}}const Nf=18,Uf=162,Hc=100,Gc=92,Of=30,Wc=8,Ff=4,zf=.3,Kh=70,Bf=360,kf=90,Vf=8;function lr(n,e,t){return Math.min(t,Math.max(e,n))}function Xc(n){return n===void 0||!Number.isFinite(n)?0:lr(n,-1,1)}function qc(n){return n===void 0||!Number.isFinite(n)?1:lr(n,0,1)}function Kr(n,e){const t=Math.hypot(n,e);return t===0?{x:0,y:0}:{x:n/t,y:e/t}}function An(n,e,t,i){return Math.hypot(n-t,e-i)}function Yc(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function Hf(n,e,t,i){const r=lr(n,i.x,i.x+i.width),s=lr(e,i.y,i.y+i.height),a=n-r,o=e-s;return a*a+o*o<t*t}function Zh(n){return{...n,bounds:{...n.bounds},center:{...n.center},interactionPoint:{...n.interactionPoint}}}function Jh(n){return{...n,bounds:{...n.bounds}}}function Gf(n){return{...n,player:{...n.player,weaponDamageBonuses:{...n.player.weaponDamageBonuses},collectedLootIds:[...n.player.collectedLootIds]},enemies:n.enemies.map(e=>({...e,attack:{...e.attack}})),world:{...n.world,landmarks:n.world.landmarks.map(Zh),terrain:n.world.terrain.map(Jh),props:n.world.props.map(e=>({...e})),loot:n.world.loot.map(e=>({...e}))},quest:{...n.quest,visitedLandmarkIds:[...n.quest.visitedLandmarkIds],result:n.quest.result===null?null:{...n.quest.result}}}}function Zr(){return{phase:"idle",ticksRemaining:0,attackId:null,targetX:0,targetY:0,directionX:0,directionY:0}}function Wf(){return{id:"player",x:430,y:900,radius:Nf,facingX:1,facingY:0,hp:Hc,maxHp:Hc,speed:Uf,weaponId:"blade",weaponCooldownTicks:0,weaponDamageBonuses:{blade:0,impact:0},guarding:!1,guardStartedTick:null,dodgeCooldownTicks:0,invulnerableTicks:0,relicCooldownTicks:0,relicCooldownMaxTicks:5*kn,relicDamage:14,relicRange:180,healingItems:1,healingAmount:45,collectedLootIds:[]}}function Kc(n,e,t,i){const r=mr[n],s=n==="named-anomaly";return{id:e,kind:n,name:r.name,x:t,y:i,radius:r.radius,hp:r.maxHp,maxHp:r.maxHp,active:!s,defeated:!1,disposition:s?"dormant":"hostile",attack:Zr()}}function Zc(n){const e=Df(n);let t=e,i=0;const r=()=>{const a=If(t);return t=a.state,i+=1,a.value},s=Af.map(a=>{if(a.kind==="named-anomaly")return Kc(a.kind,a.id,a.x,a.y);const o=(r()-.5)*72,l=(r()-.5)*72;return Kc(a.kind,a.id,a.x+o,a.y+l)});return{saveVersion:1,contentVersion:"prototype-b-1",seed:e,rngState:t,rngDraws:i,tick:0,status:"playing",nextActionId:1,player:Wf(),enemies:s,world:{width:Sf,height:bf,landmarks:Ef.map(Zh),terrain:Tf.map(Jh),props:wf.map(a=>({...a})),loot:Rf.map(a=>({...a,picked:!1}))},quest:{phase:"briefing",objective:"Read the town contract board.",visitedLandmarkIds:["town"],intent:null,outcome:null,result:null}}}function Dl(n,e){const t=`${e}-${n.nextActionId}`;return n.nextActionId+=1,t}function Jc(n,e,t,i){return n.world.terrain.some(r=>r.solid&&Hf(e,t,i,r.bounds))}function oa(n,e,t,i,r,s){const a=Math.max(1,Math.ceil(Math.max(Math.abs(r),Math.abs(s))/Vf)),o=r/a,l=s/a;let c=e,d=t;for(let u=0;u<a;u+=1){const h=lr(c+o,i,n.world.width-i);Jc(n,h,d,i)||(c=h);const p=lr(d+l,i,n.world.height-i);Jc(n,c,p,i)||(d=p)}return{x:c,y:d}}function Xf(n){n.weaponCooldownTicks=Math.max(0,n.weaponCooldownTicks-1),n.dodgeCooldownTicks=Math.max(0,n.dodgeCooldownTicks-1),n.invulnerableTicks=Math.max(0,n.invulnerableTicks-1),n.relicCooldownTicks=Math.max(0,n.relicCooldownTicks-1)}function qf(n,e,t){const i=Kr(e,t);return(i.x!==0||i.y!==0)&&(n.facingX=i.x,n.facingY=i.y),i}function Yf(n,e,t){const i=Xc(e.moveX),r=Xc(e.moveY),s=qf(n.player,i,r);if(e.dodge===!0&&n.player.dodgeCooldownTicks===0){const o=s.x===0&&s.y===0?{x:n.player.facingX,y:n.player.facingY}:s,l=n.player.x,c=n.player.y,d=oa(n,l,c,n.player.radius,o.x*Gc,o.y*Gc);return n.player.x=d.x,n.player.y=d.y,n.player.dodgeCooldownTicks=Of,n.player.invulnerableTicks=Wc,n.player.guarding=!1,n.player.guardStartedTick=null,t.push({type:"dodge-started",tick:n.tick,fromX:l,fromY:c,toX:d.x,toY:d.y,invulnerableTicks:Wc,cue:"dodge"}),!0}const a=oa(n,n.player.x,n.player.y,n.player.radius,s.x*(n.player.speed/kn)*qc(e.moveSpeedScale),s.y*(n.player.speed/kn)*qc(e.moveSpeedScale));return n.player.x=a.x,n.player.y=a.y,!1}function Kf(n,e){const t=n.player.guarding,i=e.guard===!0&&e.dodge!==!0;n.player.guarding=i,i&&!t?n.player.guardStartedTick=n.tick:i||(n.player.guardStartedTick=null)}function la(n,e,t,i){n.quest.phase=e,n.quest.objective=t,i.push({type:"quest-advanced",tick:n.tick,phase:e,objective:t,cue:"quest"})}function jc(n,e,t){n.quest.visitedLandmarkIds.includes(e)||(n.quest.visitedLandmarkIds.push(e),t.push({type:"landmark-entered",tick:n.tick,landmarkId:e}))}function Jr(n){return n.enemies.find(e=>e.id===Di)}function Zf(n,e){const{x:t,y:i}=n.player;Yc(t,i,an.fork.bounds)&&(jc(n,"fork",e),n.quest.phase==="travel-to-fork"&&la(n,"travel-to-ruin","Follow the eastern route to the Listening Ruin.",e)),Yc(t,i,an.ruin.bounds)&&jc(n,"ruin",e);const r=Jr(n);n.quest.phase==="travel-to-ruin"&&r!==void 0&&An(t,i,r.x,r.y)<=Bf&&la(n,"confrontation","Choose how to answer Orison: destroy, calm, or connect.",e)}function Lo(n,e){return n.player.collectedLootIds.includes(e)}function Jf(n,e){const t=qh[e];switch(t.effect){case"blade-damage":n.player.weaponDamageBonuses.blade+=t.amount;break;case"impact-damage":n.player.weaponDamageBonuses.impact+=t.amount;break;case"healing-item":n.player.healingItems+=t.amount;break;case"relic-power":n.player.relicDamage+=t.amount,n.player.relicCooldownMaxTicks=Math.max(2*kn,n.player.relicCooldownMaxTicks-kn),n.player.relicCooldownTicks=Math.min(n.player.relicCooldownTicks,n.player.relicCooldownMaxTicks);break}}function jf(n,e){const i=n.world.loot.filter(r=>!r.picked&&An(n.player.x,n.player.y,r.x,r.y)<=n.player.radius+r.radius+Kh).sort((r,s)=>{const a=An(n.player.x,n.player.y,r.x,r.y),o=An(n.player.x,n.player.y,s.x,s.y);return a-o||r.id.localeCompare(s.id)})[0];return i===void 0?!1:(i.picked=!0,Lo(n,i.lootId)||(n.player.collectedLootIds.push(i.lootId),Jf(n,i.lootId)),e.push({type:"loot-picked",tick:n.tick,pickupId:i.id,lootId:i.lootId,cue:"loot"}),!0)}function Il(n,e,t){if(n.quest.outcome!==null)return;const i=Jr(n);i!==void 0&&(i.active=!1,i.attack=Zr(),i.disposition=e==="destroy"?"destroyed":e==="calm"?"calmed":"connected",i.defeated=e==="destroy",e==="destroy"&&(i.hp=0)),n.quest.intent=e,n.quest.outcome=e,t.push({type:"anomaly-resolved",tick:n.tick,anomalyId:Di,outcome:e,cue:e==="destroy"?"outcome-destroy":e==="calm"?"outcome-calm":"outcome-connect"}),la(n,"return-town","Return to the Dustwake contract board.",t)}function Qf(n,e,t){const i=e.chooseOutcome;if(i===void 0)return;if(n.quest.phase!=="confrontation"){t.push({type:"command-rejected",tick:n.tick,reason:"wrong-quest-phase"});return}if(n.quest.intent!==null||n.quest.outcome!==null){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-already-chosen"});return}if(i==="calm"&&!Lo(n,"quiet-chime")||i==="connect"&&!Lo(n,"signal-key")){t.push({type:"command-rejected",tick:n.tick,reason:"outcome-not-available"});return}n.quest.intent=i;const r=Jr(n);r!==void 0&&(r.active=!0,r.disposition="hostile"),t.push({type:"outcome-committed",tick:n.tick,outcome:i})}function Qc(n,e,t=Kh){return An(n.x,n.y,e.x,e.y)<=n.radius+t}function Nl(n,e){return An(n.x,n.y,e.x,e.y)<=n.radius+e.radius+kf}function $f(n,e,t){if(e.interact!==!0||jf(n,t))return;if(n.quest.phase==="briefing"&&Qc(n.player,an.town.interactionPoint)){la(n,"travel-to-fork","Reach the Three-Way Fork.",t);return}const i=Jr(n);if(n.quest.phase==="confrontation"&&n.quest.intent==="connect"&&i!==void 0&&Nl(n.player,i)){Il(n,"connect",t);return}if(n.quest.phase==="return-town"&&n.quest.outcome!==null&&Qc(n.player,an.town.interactionPoint)){const r={...Cf[n.quest.outcome]};n.quest.phase="result",n.quest.objective="Route complete.",n.quest.result=r,n.status="result",t.push({type:"result-reached",tick:n.tick,result:r,cue:"result"})}}function ep(n,e,t){e.chooseWeapon===void 0||e.chooseWeapon===n.player.weaponId||(n.player.weaponId=e.chooseWeapon,t.push({type:"weapon-selected",tick:n.tick,weaponId:e.chooseWeapon}))}function Ul(n,e){return e.active&&!e.defeated&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function tp(n,e,t){e.defeated||(e.defeated=!0,e.active=!1,e.disposition="destroyed",e.attack=Zr(),t.push({type:"enemy-defeated",tick:n.tick,enemyId:e.id,kind:e.kind}),e.id===Di&&Il(n,"destroy",t))}function jh(n,e,t,i,r){if(!Ul(n,e))return;const s=Math.min(e.hp,Math.max(0,t));e.hp=Math.max(0,e.hp-s),r.push({type:"enemy-damaged",tick:n.tick,enemyId:e.id,amount:s,remainingHp:e.hp,source:i}),e.hp===0&&tp(n,e,r)}function np(n){const e=aa[n.player.weaponId];return{...e,damage:e.damage+n.player.weaponDamageBonuses[n.player.weaponId]}}function $c(n,e){return An(n.x,n.y,e.x,e.y)}function ip(n,e,t){const i=e.x-n.x,r=e.y-n.y,s=Math.hypot(i,r);return s-e.radius>t.range?!1:s===0?!0:i/s*n.facingX+r/s*n.facingY>=t.arcCosine}function rp(n,e,t){if(t<=0||e.defeated)return;const i=Kr(e.x-n.player.x,e.y-n.player.y),r=oa(n,e.x,e.y,e.radius,i.x*t,i.y*t);e.x=r.x,e.y=r.y}function sp(n,e,t,i){if(e.attack!==!0||n.player.weaponCooldownTicks>0||n.player.guarding||i)return;const r=np(n),s=Dl(n,"player-attack");n.player.weaponCooldownTicks=r.cooldownTicks,t.push({type:"player-attacked",tick:n.tick,actionId:s,weaponId:r.id,x:n.player.x,y:n.player.y,directionX:n.player.facingX,directionY:n.player.facingY,range:r.range,damage:r.damage,cooldownTicks:r.cooldownTicks,cue:r.cue});const a=n.enemies.filter(o=>Ul(n,o)&&ip(n.player,o,r)).sort((o,l)=>$c(n.player,o)-$c(n.player,l)||o.id.localeCompare(l.id)).slice(0,r.hitLimit);for(const o of a)jh(n,o,r.damage,r.id,t),rp(n,o,r.knockback)}function ap(n,e,t){if(e.activateRelic!==!0||n.player.relicCooldownTicks>0)return;n.player.relicCooldownTicks=n.player.relicCooldownMaxTicks,t.push({type:"relic-activated",tick:n.tick,x:n.player.x,y:n.player.y,radius:n.player.relicRange,damage:n.player.relicDamage,cue:"relic"});const i=Jr(n);n.quest.phase==="confrontation"&&n.quest.intent==="calm"&&i!==void 0&&An(n.player.x,n.player.y,i.x,i.y)<=n.player.relicRange+i.radius&&Il(n,"calm",t);for(const r of n.enemies)Ul(n,r)&&An(n.player.x,n.player.y,r.x,r.y)<=n.player.relicRange+r.radius&&jh(n,r,n.player.relicDamage,"relic",t)}function op(n,e,t){if(e.useItem!==!0)return;if(n.player.healingItems<=0){t.push({type:"command-rejected",tick:n.tick,reason:"item-empty"});return}if(n.player.hp>=n.player.maxHp){t.push({type:"command-rejected",tick:n.tick,reason:"item-full-health"});return}const i=n.player.hp;n.player.hp=Math.min(n.player.maxHp,n.player.hp+n.player.healingAmount),n.player.healingItems-=1,t.push({type:"item-used",tick:n.tick,healed:n.player.hp-i,remainingItems:n.player.healingItems,cue:"heal"})}function lp(n,e,t){const i=mr[e.kind],r=Kr(n.player.x-e.x,n.player.y-e.y),s=Dl(n,"enemy-attack");e.attack={phase:"telegraph",ticksRemaining:i.telegraphTicks,attackId:s,targetX:n.player.x,targetY:n.player.y,directionX:r.x,directionY:r.y},t.push({type:"enemy-attack-telegraphed",tick:n.tick,enemyId:e.id,attackId:s,x:e.x,y:e.y,directionX:r.x,directionY:r.y,range:i.attackRange,resolveTick:n.tick+i.telegraphTicks,cue:"enemy-warning"})}function cp(n,e){const t=mr[e.kind],i=n.player.x-e.x,r=n.player.y-e.y,s=Math.hypot(i,r);return s>t.attackRange+e.radius+n.player.radius?!1:s===0?!0:i/s*e.attack.directionX+r/s*e.attack.directionY>=.15}function dp(n,e){const t=Kr(e.x-n.x,e.y-n.y);return t.x*n.facingX+t.y*n.facingY>=0}function hp(n,e,t){const i=mr[e.kind],r=e.attack.attackId??Dl(n,"enemy-attack"),s=cp(n,e);if(t.push({type:"enemy-attack-resolved",tick:n.tick,enemyId:e.id,attackId:r,hit:s,cue:"enemy-impact"}),s)if(n.player.invulnerableTicks>0)t.push({type:"player-dodged",tick:n.tick,enemyId:e.id});else{const a=n.player.guarding&&dp(n.player,e);let o=i.damage;if(a){const c=(n.player.guardStartedTick===null?Number.POSITIVE_INFINITY:n.tick-n.player.guardStartedTick)<=Ff;o=c?0:Math.max(1,Math.ceil(i.damage*zf)),t.push({type:"guard-resolved",tick:n.tick,enemyId:e.id,justGuard:c,preventedDamage:i.damage-o,receivedDamage:o,cue:c?"just-guard":"guard"})}o>0&&(n.player.hp=Math.max(0,n.player.hp-o),t.push({type:"player-damaged",tick:n.tick,enemyId:e.id,amount:o,remainingHp:n.player.hp}))}e.attack={...Zr(),phase:"recovery",ticksRemaining:i.recoveryTicks}}function up(n,e,t){if(!e.active||e.defeated||e.disposition!=="hostile"||n.status!=="playing")return;if(e.attack.phase==="telegraph"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&hp(n,e,t);return}if(e.attack.phase==="recovery"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&(e.attack=Zr());return}const i=mr[e.kind],r=An(e.x,e.y,n.player.x,n.player.y);if(r>i.aggroRange)return;const s=i.attackRange+e.radius+n.player.radius;if(r>s){const o=Kr(n.player.x-e.x,n.player.y-e.y),l=oa(n,e.x,e.y,e.radius,o.x*(i.speed/kn),o.y*(i.speed/kn));e.x=l.x,e.y=l.y}An(e.x,e.y,n.player.x,n.player.y)<=s&&lp(n,e,t)}function fp(n,e){for(const t of n.enemies)if(up(n,t,e),n.player.hp===0){n.status="lost",e.push({type:"player-defeated",tick:n.tick});break}}function pp(n,e={}){if(n.status!=="playing")return{state:n,events:[]};const t=Gf(n),i=[];t.tick+=1,Xf(t.player),Kf(t,e);const r=Yf(t,e,i);return Zf(t,i),ep(t,e,i),Qf(t,e,i),$f(t,e,i),sp(t,e,i,r),ap(t,e,i),op(t,e,i),fp(t,i),{state:t,events:i}}const Ol={blade:{buildId:"counter-cutter",acquireRange:132,dropRange:164,hitRange:108,minimumFacingAlignment:Math.max(0,aa.blade.arcCosine),windupTicks:5,recoveryTicks:9,windupMovementScale:1,hitMovementScale:.9,recoveryMovementScale:1},impact:{buildId:"breach-driver",acquireRange:96,dropRange:128,hitRange:82,minimumFacingAlignment:Math.max(0,aa.impact.arcCosine),windupTicks:18,recoveryTicks:16,windupMovementScale:.35,hitMovementScale:.2,recoveryMovementScale:.75}},Qh={phase:"idle",targetId:null,weaponId:null,phaseTicksRemaining:0,phaseTicksTotal:0};function $h(n,e){return Math.hypot(e.x-n.player.x,e.y-n.player.y)}function eu(n,e){const t=e.x-n.player.x,i=e.y-n.player.y,r=Math.hypot(t,i);if(r===0)return 1;const s=Math.hypot(n.player.facingX,n.player.facingY);return s===0?-1:t/r*(n.player.facingX/s)+i/r*(n.player.facingY/s)}function mp(n,e){return n.status==="playing"&&e.active&&!e.defeated&&e.hp>0&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||n.quest.intent==="destroy")}function yi(n,e,t,i){return mp(n,e)&&$h(n,e)<=i&&eu(n,e)>=t.minimumFacingAlignment}function Ir(n,e){if(e!==null)return n.enemies.find(t=>t.id===e)}function ed(n,e,t){const i=e.attack.phase==="telegraph"?1:0,r=e.id===t?1:0;return 1e3-$h(n,e)*2+eu(n,e)*120+i*160+r*80}function gp(n,e,t){return n.enemies.filter(i=>yi(n,i,e,e.acquireRange)).sort((i,r)=>ed(n,r,t)-ed(n,i,t)||i.id.localeCompare(r.id))[0]}function Js(n,e,t,i){return{phase:n,targetId:t,weaponId:e,phaseTicksRemaining:i,phaseTicksTotal:i}}function td(n){return{...Qh,weaponId:n}}function Fi(n,e){const t=n.player.weaponId,i=Ol[t];if(n.status!=="playing"||n.player.guarding||n.player.weaponCooldownTicks>0)return td(t);const r=gp(n,i,e);return r===void 0?td(t):Js("acquire",t,r.id,1)}function xp(n,e){if(e===null)return 1;switch(n.phase){case"windup":return e.windupMovementScale;case"hit":return e.hitMovementScale;case"recover":return e.recoveryMovementScale;case"idle":case"acquire":return 1}}function vp(n,e){const t=n.weaponId===null?null:Ol[n.weaponId],i=Ir(e,n.targetId);let r=0;return n.phase==="hit"?r=1:n.phaseTicksTotal>0&&(r=1-n.phaseTicksRemaining/n.phaseTicksTotal),{phase:n.phase,buildId:t?.buildId??null,weaponId:n.weaponId,targetId:n.targetId,phaseTicksRemaining:n.phaseTicksRemaining,phaseTicksTotal:n.phaseTicksTotal,phaseProgress:r,movementScale:xp(n,t),targetInHitRange:t!==null&&i!==void 0&&yi(e,i,t,t.hitRange)}}function vn(n,e,t=!1){return{state:n,presentation:vp(n,e),commandContribution:t?{attack:!0}:{}}}function Pa(){return{...Qh}}function _p(n,e){const t=e.player.weaponId,i=Ol[t];if(e.status!=="playing"||e.player.guarding||n.weaponId!==null&&n.weaponId!==t)return vn(Fi(e,null),e);switch(n.phase){case"idle":return vn(Fi(e,n.targetId),e);case"acquire":{const r=Ir(e,n.targetId);return r===void 0||!yi(e,r,i,i.dropRange)?vn(Fi(e,n.targetId),e):vn(Js("windup",t,r.id,i.windupTicks),e)}case"windup":{const r=Ir(e,n.targetId);if(r===void 0||!yi(e,r,i,i.dropRange))return vn(Fi(e,n.targetId),e);if(n.phaseTicksRemaining>1){const s={...n,phaseTicksRemaining:n.phaseTicksRemaining-1};return vn(s,e)}return e.player.weaponCooldownTicks>0||!yi(e,r,i,i.hitRange)?vn(Fi(e,n.targetId),e):vn(Js("hit",t,r.id,1),e,!0)}case"hit":{const r=Ir(e,n.targetId);return vn(Js("recover",t,r!==void 0&&yi(e,r,i,i.dropRange)?r.id:null,i.recoveryTicks),e)}case"recover":{if(n.phaseTicksRemaining>1){const r=Ir(e,n.targetId),s={...n,targetId:r!==void 0&&yi(e,r,i,i.dropRange)?r.id:null,phaseTicksRemaining:n.phaseTicksRemaining-1};return vn(s,e)}return vn(Fi(e,n.targetId),e)}}}const Fl="185",Mp=0,nd=1,yp=2,zr=1,Sp=2,Nr=3,ui=0,rn=1,sn=2,Ht=0,rr=1,ca=2,id=3,rd=4,tu=5,bn=100,bp=101,Ep=102,Tp=103,wp=104,Ur=200,Ap=201,Rp=202,Cp=203,Do=204,Io=205,No=206,Pp=207,Uo=208,Lp=209,Dp=210,Ip=211,Np=212,Up=213,Op=214,Oo=0,Fo=1,zo=2,cr=3,Bo=4,ko=5,Vo=6,Ho=7,zl=0,Fp=1,zp=2,Bn=0,Bl=1,kl=2,Vl=3,Hl=4,Gl=5,xa=6,Wl=7,nu=300,wi=301,dr=302,La=303,Da=304,va=306,Rn=1e3,Jn=1001,Go=1002,Rt=1003,Bp=1004,as=1005,Ct=1006,Ia=1007,jn=1008,en=1009,iu=1010,ru=1011,kr=1012,Xl=1013,Vn=1014,En=1015,Xt=1016,ql=1017,Yl=1018,hr=1020,su=35902,au=35899,ou=1021,lu=1022,hn=1023,$n=1026,di=1027,Kl=1028,Zl=1029,Ai=1030,Jl=1031,jl=1033,js=33776,Qs=33777,$s=33778,ea=33779,Wo=35840,Xo=35841,qo=35842,Yo=35843,Ko=36196,Zo=37492,Jo=37496,jo=37488,Qo=37489,da=37490,$o=37491,el=37808,tl=37809,nl=37810,il=37811,rl=37812,sl=37813,al=37814,ol=37815,ll=37816,cl=37817,dl=37818,hl=37819,ul=37820,fl=37821,pl=36492,ml=36494,gl=36495,xl=36283,vl=36284,ha=36285,_l=36286,kp=3200,Vr=0,Vp=1,Zn="",Gt="srgb",Hr="srgb-linear",ua="linear",ot="srgb",zi=7680,sd=519,Hp=512,Gp=513,Wp=514,Ql=515,Xp=516,qp=517,$l=518,Yp=519,ad=35044,od="300 es",zn=2e3,Gr=2001;function Kp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Wr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zp(){const n=Wr("canvas");return n.style.display="block",n}const ld={};function cd(...n){const e="THREE."+n.shift();console.log(e,...n)}function cu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function it(...n){n=cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function sr(...n){const e=n.join(" ");e in ld||(ld[e]=!0,Oe(...n))}function Jp(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const jp={[Oo]:Fo,[zo]:Vo,[Bo]:Ho,[cr]:ko,[Fo]:Oo,[Vo]:zo,[Ho]:Bo,[ko]:cr};class Ii{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dd=1234567;const ar=Math.PI/180,Xr=180/Math.PI;function gr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function ec(n,e){return(n%e+e)%e}function Qp(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function $p(n,e,t){return n!==e?(t-n)/(e-n):0}function Br(n,e,t){return(1-t)*n+t*e}function em(n,e,t,i){return Br(n,e,1-Math.exp(-t*i))}function tm(n,e=1){return e-Math.abs(ec(n,e*2)-e)}function nm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function im(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function rm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function sm(n,e){return n+Math.random()*(e-n)}function am(n){return n*(.5-Math.random())}function om(n){n!==void 0&&(dd=n);let e=dd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lm(n){return n*ar}function cm(n){return n*Xr}function dm(n){return(n&n-1)===0&&n!==0}function hm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function um(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function fm(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),d=a((e+i)/2),u=s((e-i)/2),h=a((e-i)/2),p=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*d,l*u,l*h,o*c);break;case"YZY":n.set(l*h,o*d,l*u,o*c);break;case"ZXZ":n.set(l*u,l*h,o*d,o*c);break;case"XZX":n.set(o*d,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*d,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*d,o*c);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const tn={DEG2RAD:ar,RAD2DEG:Xr,generateUUID:gr,clamp:Qe,euclideanModulo:ec,mapLinear:Qp,inverseLerp:$p,lerp:Br,damp:em,pingpong:tm,smoothstep:nm,smootherstep:im,randInt:rm,randFloat:sm,randFloatSpread:am,seededRandom:om,degToRad:lm,radToDeg:cm,isPowerOfTwo:dm,ceilPowerOfTwo:hm,floorPowerOfTwo:um,setQuaternionFromProperEuler:fm,normalize:Qt,denormalize:nr},Tc=class Tc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tc.prototype.isVector2=!0;let Pe=Tc;class Hn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],u=i[r+3],h=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(u!==_||l!==h||c!==p||d!==g){let m=l*h+c*p+d*g+u*_;m<0&&(h=-h,p=-p,g=-g,_=-_,m=-m);let f=1-o;if(m<.9995){const S=Math.acos(m),E=Math.sin(S);f=Math.sin(f*S)/E,o=Math.sin(o*S)/E,l=l*f+h*o,c=c*f+p*o,d=d*f+g*o,u=u*f+_*o}else{l=l*f+h*o,c=c*f+p*o,d=d*f+g*o,u=u*f+_*o;const S=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=S,c*=S,d*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],u=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+d*u+l*p-c*h,e[t+1]=l*g+d*h+c*u-o*p,e[t+2]=c*g+d*p+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),u=o(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*d*u+c*p*g,this._y=c*p*u-h*d*g,this._z=c*d*g+h*p*u,this._w=c*d*u-h*p*g;break;case"YXZ":this._x=h*d*u+c*p*g,this._y=c*p*u-h*d*g,this._z=c*d*g-h*p*u,this._w=c*d*u+h*p*g;break;case"ZXY":this._x=h*d*u-c*p*g,this._y=c*p*u+h*d*g,this._z=c*d*g+h*p*u,this._w=c*d*u-h*p*g;break;case"ZYX":this._x=h*d*u-c*p*g,this._y=c*p*u+h*d*g,this._z=c*d*g-h*p*u,this._w=c*d*u+h*p*g;break;case"YZX":this._x=h*d*u+c*p*g,this._y=c*p*u+h*d*g,this._z=c*d*g-h*p*u,this._w=c*d*u-h*p*g;break;case"XZY":this._x=h*d*u-c*p*g,this._y=c*p*u-h*d*g,this._z=c*d*g+h*p*u,this._w=c*d*u+h*p*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wc=class wc{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*t-s*r),u=2*(s*i-a*t);return this.x=t+l*c+a*u-o*d,this.y=i+l*d+o*c-s*u,this.z=r+l*u+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Na.copy(this).projectOnVector(e),this.sub(Na)}reflect(e){return this.sub(Na.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wc.prototype.isVector3=!0;let D=wc;const Na=new D,hd=new Hn,Ac=class Ac{constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],S=r[1],E=r[4],M=r[7],T=r[2],b=r[5],R=r[8];return s[0]=a*_+o*S+l*T,s[3]=a*m+o*E+l*b,s[6]=a*f+o*M+l*R,s[1]=c*_+d*S+u*T,s[4]=c*m+d*E+u*b,s[7]=c*f+d*M+u*R,s[2]=h*_+p*S+g*T,s[5]=h*m+p*E+g*b,s[8]=h*f+p*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*s,p=c*s-a*l,g=t*u+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-d*i)*_,e[2]=(o*i-r*a)*_,e[3]=h*_,e[4]=(d*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return sr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ua.makeScale(e,t)),this}rotate(e){return sr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ua.makeRotation(-e)),this}translate(e,t){return sr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ua.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ac.prototype.isMatrix3=!0;let Be=Ac;const Ua=new Be,ud=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fd=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pm(){const n={enabled:!0,workingColorSpace:Hr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ot&&(r.r=Qn(r.r),r.g=Qn(r.g),r.b=Qn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(r.r=or(r.r),r.g=or(r.g),r.b=or(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zn?ua:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return sr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return sr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Hr]:{primaries:e,whitePoint:i,transfer:ua,toXYZ:ud,fromXYZ:fd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:ud,fromXYZ:fd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),n}const je=pm();function Qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Bi;class mm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Bi===void 0&&(Bi=Wr("canvas")),Bi.width=e.width,Bi.height=e.height;const r=Bi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Bi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Wr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qn(t[i]/255)*255):t[i]=Qn(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gm=0;class tc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Oa(r[a].image)):s.push(Oa(r[a]))}else s=Oa(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Oa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?mm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let xm=0;const Fa=new D;class qt extends Ii{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=Jn,r=Jn,s=Ct,a=jn,o=hn,l=en,c=qt.DEFAULT_ANISOTROPY,d=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=gr(),this.name="",this.source=new tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fa).x}get height(){return this.source.getSize(Fa).y}get depth(){return this.source.getSize(Fa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rn:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case Go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rn:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case Go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=nu;qt.DEFAULT_ANISOTROPY=1;const Rc=class Rc{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(p+1)/2,T=(f+1)/2,b=(d+h)/4,R=(u+_)/4,v=(g+m)/4;return E>M&&E>T?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=b/i,s=R/i):M>T?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=b/r,s=v/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=R/s,r=v/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(h-d)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Rc.prototype.isVector4=!0;let Mt=Rc;class vm extends Ii{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new qt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new tc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ot extends vm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class du extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _m extends qt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ga=class ga{constructor(e,t,i,r,s,a,o,l,c,d,u,h,p,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,d,u,h,p,g,_,m)}set(e,t,i,r,s,a,o,l,c,d,u,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ga().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const h=a*d,p=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,p=l*u,g=c*d,_=c*u;t[0]=h+_*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=_+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,p=l*u,g=c*d,_=c*u;t[0]=h-_*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=_-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,p=a*u,g=o*d,_=o*u;t[0]=l*d,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*u,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=_-h*u,t[8]=g*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+_,t[5]=a*d,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mm,e,ym)}lookAt(e,t,i){const r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ii.crossVectors(i,ln),ii.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ii.crossVectors(i,ln)),ii.normalize(),os.crossVectors(ln,ii),r[0]=ii.x,r[4]=os.x,r[8]=ln.x,r[1]=ii.y,r[5]=os.y,r[9]=ln.y,r[2]=ii.z,r[6]=os.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],S=i[3],E=i[7],M=i[11],T=i[15],b=r[0],R=r[4],v=r[8],w=r[12],C=r[1],P=r[5],L=r[9],z=r[13],G=r[2],F=r[6],X=r[10],B=r[14],K=r[3],j=r[7],ne=r[11],ae=r[15];return s[0]=a*b+o*C+l*G+c*K,s[4]=a*R+o*P+l*F+c*j,s[8]=a*v+o*L+l*X+c*ne,s[12]=a*w+o*z+l*B+c*ae,s[1]=d*b+u*C+h*G+p*K,s[5]=d*R+u*P+h*F+p*j,s[9]=d*v+u*L+h*X+p*ne,s[13]=d*w+u*z+h*B+p*ae,s[2]=g*b+_*C+m*G+f*K,s[6]=g*R+_*P+m*F+f*j,s[10]=g*v+_*L+m*X+f*ne,s[14]=g*w+_*z+m*B+f*ae,s[3]=S*b+E*C+M*G+T*K,s[7]=S*R+E*P+M*F+T*j,s[11]=S*v+E*L+M*X+T*ne,s[15]=S*w+E*z+M*B+T*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15],S=l*p-c*h,E=o*p-c*u,M=o*h-l*u,T=a*p-c*d,b=a*h-l*d,R=a*u-o*d;return t*(_*S-m*E+f*M)-i*(g*S-m*T+f*b)+r*(g*E-_*T+f*R)-s*(g*M-_*b+m*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(s*d-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],S=t*o-i*a,E=t*l-r*a,M=t*c-s*a,T=i*l-r*o,b=i*c-s*o,R=r*c-s*l,v=d*_-u*g,w=d*m-h*g,C=d*f-p*g,P=u*m-h*_,L=u*f-p*_,z=h*f-p*m,G=S*z-E*L+M*P+T*C-b*w+R*v;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/G;return e[0]=(o*z-l*L+c*P)*F,e[1]=(r*L-i*z-s*P)*F,e[2]=(_*R-m*b+f*T)*F,e[3]=(h*b-u*R-p*T)*F,e[4]=(l*C-a*z-c*w)*F,e[5]=(t*z-r*C+s*w)*F,e[6]=(m*M-g*R-f*E)*F,e[7]=(d*R-h*M+p*E)*F,e[8]=(a*L-o*C+c*v)*F,e[9]=(i*C-t*L-s*v)*F,e[10]=(g*b-_*M+f*S)*F,e[11]=(u*M-d*b-p*S)*F,e[12]=(o*w-a*P-l*v)*F,e[13]=(t*P-i*w+r*v)*F,e[14]=(_*E-g*T-m*S)*F,e[15]=(d*T-u*E+h*S)*F,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,d=a+a,u=o+o,h=s*c,p=s*d,g=s*u,_=a*d,m=a*u,f=o*u,S=l*c,E=l*d,M=l*u,T=i.x,b=i.y,R=i.z;return r[0]=(1-(_+f))*T,r[1]=(p+M)*T,r[2]=(g-E)*T,r[3]=0,r[4]=(p-M)*b,r[5]=(1-(h+f))*b,r[6]=(m+S)*b,r[7]=0,r[8]=(g+E)*R,r[9]=(m-S)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=ki.set(r[0],r[1],r[2]).length();const o=ki.set(r[4],r[5],r[6]).length(),l=ki.set(r[8],r[9],r[10]).length();s<0&&(a=-a),_n.copy(this);const c=1/a,d=1/o,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=d,_n.elements[5]*=d,_n.elements[6]*=d,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=zn,l=!1){const c=this.elements,d=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),p=(i+r)/(i-r);let g,_;if(l)g=s/(a-s),_=a*s/(a-s);else if(o===zn)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Gr)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=zn,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-r),h=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,_;if(l)g=1/(a-s),_=a/(a-s);else if(o===zn)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===Gr)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};ga.prototype.isMatrix4=!0;let rt=ga;const ki=new D,_n=new rt,Mm=new D(0,0,0),ym=new D(1,1,1),ii=new D,os=new D,ln=new D,pd=new rt,md=new Hn;class Cn{constructor(e=0,t=0,i=0,r=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return pd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return md.setFromEuler(this),this.setFromQuaternion(md,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class hu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sm=0;const gd=new D,Vi=new Hn,Wn=new rt,ls=new D,Mr=new D,bm=new D,Em=new Hn,xd=new D(1,0,0),vd=new D(0,1,0),_d=new D(0,0,1),Md={type:"added"},Tm={type:"removed"},Hi={type:"childadded",child:null},za={type:"childremoved",child:null};class Pt extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new D,t=new Cn,i=new Hn,r=new D(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Be}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(xd,e)}rotateY(e){return this.rotateOnAxis(vd,e)}rotateZ(e){return this.rotateOnAxis(_d,e)}translateOnAxis(e,t){return gd.copy(e).applyQuaternion(this.quaternion),this.position.add(gd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xd,e)}translateY(e){return this.translateOnAxis(vd,e)}translateZ(e){return this.translateOnAxis(_d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ls.copy(e):ls.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Mr,ls,this.up):Wn.lookAt(ls,Mr,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Md),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tm),za.child=e,this.dispatchEvent(za),za.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Md),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,bm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Em,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Pt.DEFAULT_UP=new D(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Wt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wm={type:"move"};class Ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Wt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},cs={h:0,s:0,l:0};function ka(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=ec(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ka(a,s,e+1/3),this.g=ka(a,s,e),this.b=ka(a,s,e-1/3)}return je.colorSpaceToWorking(this,r),this}setStyle(e,t=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=uu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return je.workingToColorSpace(Jt.copy(this),e),Math.round(Qe(Jt.r*255,0,255))*65536+Math.round(Qe(Jt.g*255,0,255))*256+Math.round(Qe(Jt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Jt.copy(this),t);const i=Jt.r,r=Jt.g,s=Jt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Gt){je.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,i=Jt.g,r=Jt.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(cs);const i=Br(ri.h,cs.h,t),r=Br(ri.s,cs.s,t),s=Br(ri.l,cs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Ue;Ue.NAMES=uu;class nc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new nc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class fu extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Mn=new D,Xn=new D,Va=new D,qn=new D,Gi=new D,Wi=new D,yd=new D,Ha=new D,Ga=new D,Wa=new D,Xa=new Mt,qa=new Mt,Ya=new Mt;class gn{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Mn.subVectors(e,t),r.cross(Mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Mn.subVectors(r,t),Xn.subVectors(i,t),Va.subVectors(e,t);const a=Mn.dot(Mn),o=Mn.dot(Xn),l=Mn.dot(Va),c=Xn.dot(Xn),d=Xn.dot(Va),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,p=(c*l-o*d)*h,g=(a*d-o*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return Xa.setScalar(0),qa.setScalar(0),Ya.setScalar(0),Xa.fromBufferAttribute(e,t),qa.fromBufferAttribute(e,i),Ya.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xa,s.x),a.addScaledVector(qa,s.y),a.addScaledVector(Ya,s.z),a}static isFrontFacing(e,t,i,r){return Mn.subVectors(i,t),Xn.subVectors(e,t),Mn.cross(Xn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),Mn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Gi.subVectors(r,i),Wi.subVectors(s,i),Ha.subVectors(e,i);const l=Gi.dot(Ha),c=Wi.dot(Ha);if(l<=0&&c<=0)return t.copy(i);Ga.subVectors(e,r);const d=Gi.dot(Ga),u=Wi.dot(Ga);if(d>=0&&u<=d)return t.copy(r);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(Gi,a);Wa.subVectors(e,s);const p=Gi.dot(Wa),g=Wi.dot(Wa);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Wi,o);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return yd.subVectors(s,r),o=(u-d)/(u-d+(p-g)),t.copy(r).addScaledVector(yd,o);const f=1/(m+_+h);return a=_*f,o=h*f,t.copy(i).addScaledVector(Gi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ni{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yn):yn.fromBufferAttribute(s,a),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yr),hs.subVectors(this.max,yr),Xi.subVectors(e.a,yr),qi.subVectors(e.b,yr),Yi.subVectors(e.c,yr),si.subVectors(qi,Xi),ai.subVectors(Yi,qi),gi.subVectors(Xi,Yi);let t=[0,-si.z,si.y,0,-ai.z,ai.y,0,-gi.z,gi.y,si.z,0,-si.x,ai.z,0,-ai.x,gi.z,0,-gi.x,-si.y,si.x,0,-ai.y,ai.x,0,-gi.y,gi.x,0];return!Ka(t,Xi,qi,Yi,hs)||(t=[1,0,0,0,1,0,0,0,1],!Ka(t,Xi,qi,Yi,hs))?!1:(us.crossVectors(si,ai),t=[us.x,us.y,us.z],Ka(t,Xi,qi,Yi,hs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new D,new D,new D,new D,new D,new D,new D,new D],yn=new D,ds=new Ni,Xi=new D,qi=new D,Yi=new D,si=new D,ai=new D,gi=new D,yr=new D,hs=new D,us=new D,xi=new D;function Ka(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){xi.fromArray(n,s);const o=r.x*Math.abs(xi.x)+r.y*Math.abs(xi.y)+r.z*Math.abs(xi.z),l=e.dot(xi),c=t.dot(xi),d=i.dot(xi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Lt=new D,fs=new Pe;let Am=0;class Ut extends Ii{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Am++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ad,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array),r=Qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),i=Qt(i,this.array),r=Qt(r,this.array),s=Qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ad&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class pu extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class mu extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Rm=new Ni,Sr=new D,Za=new D;class xr{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Rm.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);const t=Sr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Sr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Za.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Za)),this.expandByPoint(Sr.copy(e.center).sub(Za))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Cm=0;const fn=new rt,Ja=new Pt,Ki=new D,cn=new Ni,br=new Ni,kt=new D;class Bt extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kp(e)?mu:pu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return Ja.lookAt(e),Ja.updateMatrix(),this.applyMatrix4(Ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new lt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];br.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(cn.min,br.min),cn.expandByPoint(kt),kt.addVectors(cn.max,br.max),cn.expandByPoint(kt)):(cn.expandByPoint(br.min),cn.expandByPoint(br.max))}cn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)kt.fromBufferAttribute(o,c),l&&(Ki.fromBufferAttribute(e,c),kt.add(Ki)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ut(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new D,l[v]=new D;const c=new D,d=new D,u=new D,h=new Pe,p=new Pe,g=new Pe,_=new D,m=new D;function f(v,w,C){c.fromBufferAttribute(i,v),d.fromBufferAttribute(i,w),u.fromBufferAttribute(i,C),h.fromBufferAttribute(s,v),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,C),d.sub(c),u.sub(c),p.sub(h),g.sub(h);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(P),o[v].add(_),o[w].add(_),o[C].add(_),l[v].add(m),l[w].add(m),l[C].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,w=S.length;v<w;++v){const C=S[v],P=C.start,L=C.count;for(let z=P,G=P+L;z<G;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const E=new D,M=new D,T=new D,b=new D;function R(v){T.fromBufferAttribute(r,v),b.copy(T);const w=o[v];E.copy(w),E.sub(T.multiplyScalar(T.dot(w))).normalize(),M.crossVectors(b,w);const P=M.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,P)}for(let v=0,w=S.length;v<w;++v){const C=S[v],P=C.start,L=C.count;for(let z=P,G=P+L;z<G;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,d=new D,u=new D;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*d;for(let f=0;f<d;f++)h[g++]=c[p++]}return new Ut(h,d,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const p=c[u];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],u=s[c];for(let h=0,p=u.length;h<p;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Pm=0;class fi extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=gr(),this.name="",this.type="Material",this.blending=rr,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Io,this.blendEquation=bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Do&&(i.blendSrc=this.blendSrc),this.blendDst!==Io&&(i.blendDst=this.blendDst),this.blendEquation!==bn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Pe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Kn=new D,ja=new D,ps=new D,oi=new D,Qa=new D,ms=new D,$a=new D;class gu{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ja.copy(e).add(t).multiplyScalar(.5),ps.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(ja);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ps),o=oi.dot(this.direction),l=-oi.dot(ps),c=oi.lengthSq(),d=Math.abs(1-a*a);let u,h,p,g;if(d>0)if(u=a*l-o,h=a*o-l,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,p=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+h*(h+2*l)+c);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),p=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ja).addScaledVector(ps,h),p}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const i=Kn.dot(this.direction),r=Kn.dot(Kn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,i,r,s){Qa.subVectors(t,e),ms.subVectors(i,e),$a.crossVectors(Qa,ms);let a=this.direction.dot($a),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;oi.subVectors(this.origin,e);const l=o*this.direction.dot(ms.crossVectors(oi,ms));if(l<0)return null;const c=o*this.direction.dot(Qa.cross(oi));if(c<0||l+c>a)return null;const d=-o*oi.dot($a);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nn extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Sd=new rt,vi=new gu,gs=new xr,bd=new D,xs=new D,vs=new D,_s=new D,eo=new D,Ms=new D,Ed=new D,ys=new D;class Ye extends Pt{constructor(e=new Bt,t=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ms.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],u=s[l];d!==0&&(eo.fromBufferAttribute(u,e),a?Ms.addScaledVector(eo,d):Ms.addScaledVector(eo.sub(t),d))}t.add(Ms)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gs.copy(i.boundingSphere),gs.applyMatrix4(s),vi.copy(e.ray).recast(e.near),!(gs.containsPoint(vi.origin)===!1&&(vi.intersectSphere(gs,bd)===null||vi.origin.distanceToSquared(bd)>(e.far-e.near)**2))&&(Sd.copy(s).invert(),vi.copy(e.ray).applyMatrix4(Sd),!(i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,T=E;M<T;M+=3){const b=o.getX(M),R=o.getX(M+1),v=o.getX(M+2);r=Ss(this,f,e,i,c,d,u,b,R,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);r=Ss(this,a,e,i,c,d,u,S,E,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=a[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,T=E;M<T;M+=3){const b=M,R=M+1,v=M+2;r=Ss(this,f,e,i,c,d,u,b,R,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=m,E=m+1,M=m+2;r=Ss(this,a,e,i,c,d,u,S,E,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Lm(n,e,t,i,r,s,a,o){let l;if(e.side===rn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ui,o),l===null)return null;ys.copy(o),ys.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ys);return c<t.near||c>t.far?null:{distance:c,point:ys.clone(),object:n}}function Ss(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,xs),n.getVertexPosition(l,vs),n.getVertexPosition(c,_s);const d=Lm(n,e,t,i,xs,vs,_s,Ed);if(d){const u=new D;gn.getBarycoord(Ed,xs,vs,_s,u),r&&(d.uv=gn.getInterpolatedAttribute(r,o,l,c,u,new Pe)),s&&(d.uv1=gn.getInterpolatedAttribute(s,o,l,c,u,new Pe)),a&&(d.normal=gn.getInterpolatedAttribute(a,o,l,c,u,new D),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new D,materialIndex:0};gn.getNormal(xs,vs,_s,h.normal),d.face=h,d.barycoord=u}return d}class jr extends qt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=Rt,d=Rt,u,h){super(null,a,o,l,c,d,r,s,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Td extends Ut{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new rt,wd=new rt,bs=[],Ad=new Ni,Dm=new rt,Er=new Ye,Tr=new xr;class Or extends Ye{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Td(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Dm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Ad.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Tr.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(i),e.ray.intersectsSphere(Tr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Zi),wd.multiplyMatrices(i,Zi),Er.matrixWorld=wd,Er.raycast(e,bs);for(let a=0,o=bs.length;a<o;a++){const l=bs[a];l.instanceId=s,l.object=this,t.push(l)}bs.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Td(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new jr(new Float32Array(r*this.count),r,this.count,Kl,En));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const to=new D,Im=new D,Nm=new Be;class Mi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=to.subVectors(i,t).cross(Im.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(to),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Nm.getNormalMatrix(e),r=this.coplanarPoint(to).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new xr,Um=new Pe(.5,.5),Es=new D;class ic{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],d=s[4],u=s[5],h=s[6],p=s[7],g=s[8],_=s[9],m=s[10],f=s[11],S=s[12],E=s[13],M=s[14],T=s[15];if(r[0].setComponents(c-a,p-d,f-g,T-S).normalize(),r[1].setComponents(c+a,p+d,f+g,T+S).normalize(),r[2].setComponents(c+o,p+u,f+_,T+E).normalize(),r[3].setComponents(c-o,p-u,f-_,T-E).normalize(),i)r[4].setComponents(l,h,m,M).normalize(),r[5].setComponents(c-l,p-h,f-m,T-M).normalize();else if(r[4].setComponents(c-l,p-h,f-m,T-M).normalize(),t===zn)r[5].setComponents(c+l,p+h,f+m,T+M).normalize();else if(t===Gr)r[5].setComponents(l,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=Um.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Es.x=r.normal.x>0?e.max.x:e.min.x,Es.y=r.normal.y>0?e.max.y:e.min.y,Es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ml extends fi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fa=new D,pa=new D,Rd=new rt,wr=new gu,Ts=new xr,no=new D,Cd=new D;class Om extends Pt{constructor(e=new Bt,t=new Ml){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)fa.fromBufferAttribute(t,r-1),pa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=fa.distanceTo(pa);e.setAttribute("lineDistance",new lt(i,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ts.copy(i.boundingSphere),Ts.applyMatrix4(r),Ts.radius+=s,e.ray.intersectsSphere(Ts)===!1)return;Rd.copy(r).invert(),wr.copy(e.ray).applyMatrix4(Rd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const f=d.getX(_),S=d.getX(_+1),E=ws(this,e,wr,l,f,S,_);E&&t.push(E)}if(this.isLineLoop){const _=d.getX(g-1),m=d.getX(p),f=ws(this,e,wr,l,_,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const f=ws(this,e,wr,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=ws(this,e,wr,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ws(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(fa.fromBufferAttribute(o,r),pa.fromBufferAttribute(o,s),t.distanceSqToSegment(fa,pa,no,Cd)>i)return;no.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(no);if(!(c<e.near||c>e.far))return{distance:c,point:Cd.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Pd=new D,Ld=new D;class io extends Om{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pd.fromBufferAttribute(t,r),Ld.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pd.distanceTo(Ld);e.setAttribute("lineDistance",new lt(i,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xu extends qt{constructor(e=[],t=wi,i,r,s,a,o,l,c,d){super(e,t,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ri extends qt{constructor(e,t,i=Vn,r,s,a,o=Rt,l=Rt,c,d=$n,u=1){if(d!==$n&&d!==di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fm extends Ri{constructor(e,t=Vn,i=wi,r,s,a=Rt,o=Rt,l,c=$n){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,i,r,s,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class vu extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xn extends Bt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(u,2));function g(_,m,f,S,E,M,T,b,R,v,w){const C=M/R,P=T/v,L=M/2,z=T/2,G=b/2,F=R+1,X=v+1;let B=0,K=0;const j=new D;for(let ne=0;ne<X;ne++){const ae=ne*P-z;for(let le=0;le<F;le++){const ke=le*C-L;j[_]=ke*S,j[m]=ae*E,j[f]=G,c.push(j.x,j.y,j.z),j[_]=0,j[m]=0,j[f]=b>0?1:-1,d.push(j.x,j.y,j.z),u.push(le/R),u.push(1-ne/v),B+=1}}for(let ne=0;ne<v;ne++)for(let ae=0;ae<R;ae++){const le=h+ae+F*ne,ke=h+ae+F*(ne+1),Ze=h+(ae+1)+F*(ne+1),ze=h+(ae+1)+F*ne;l.push(le,ke,ze),l.push(ke,Ze,ze),K+=6}o.addGroup(p,K,w),p+=K,h+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class rc extends Bt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new D,d=new Pe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const p=i+u/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[h]/e+1)/2,d.y=(a[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(o,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}const As=new D,Rs=new D,ro=new D,Cs=new gn;class Dd extends Bt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(ar*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],d=["a","b","c"],u=new Array(3),h={},p=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:f}=Cs;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Cs.getNormal(ro),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){const E=(S+1)%3,M=u[S],T=u[E],b=Cs[d[S]],R=Cs[d[E]],v=`${M}_${T}`,w=`${T}_${M}`;w in h&&h[w]?(ro.dot(h[w].normal)<=s&&(p.push(b.x,b.y,b.z),p.push(R.x,R.y,R.z)),h[w]=null):v in h||(h[v]={index0:c[S],index1:c[E],normal:ro.clone()})}}for(const g in h)if(h[g]){const{index0:_,index1:m}=h[g];As.fromBufferAttribute(o,_),Rs.fromBufferAttribute(o,m),p.push(As.x,As.y,As.z),p.push(Rs.x,Rs.y,Rs.z)}this.setAttribute("position",new lt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Qr extends Bt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,u=e/o,h=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<d;f++){const S=f*h-a;for(let E=0;E<c;E++){const M=E*u-s;g.push(M,-S,0),_.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const E=S+c*f,M=S+c*(f+1),T=S+1+c*(f+1),b=S+1+c*f;p.push(E,M,b),p.push(M,T,b)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.width,e.height,e.widthSegments,e.heightSegments)}}class bi extends Bt{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/r,p=new D,g=new Pe;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const f=s+m/i*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let f=0;f<i;f++){const S=f+m,E=S,M=S+i+1,T=S+i+2,b=S+1;o.push(E,M,b),o.push(M,T,b)}}this.setIndex(o),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}function ur(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Id(r))r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Id(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function $t(n){const e={};for(let t=0;t<n.length;t++){const i=ur(n[t]);for(const r in i)e[r]=i[r]}return e}function Id(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function zm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function _u(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const dn={clone:ur,merge:$t};var Bm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,km=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vt extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bm,this.fragmentShader=km,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ur(e.uniforms),this.uniformsGroups=zm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Ue().setHex(r.value);break;case"v2":this.uniforms[i].value=new Pe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new D().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Mt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(r.value);break;case"m4":this.uniforms[i].value=new rt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Mu extends vt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Dt extends fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vr,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yl extends Dt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vm extends fi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vr,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Hm extends fi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vr,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=zl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gm extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wm extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const so={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Nd(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Nd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Nd(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Xm{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const qm=new Xm;class sc{constructor(e){this.manager=e!==void 0?e:qm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}sc.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ji=new WeakMap;class Ym extends sc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=so.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Ji.get(a);u===void 0&&(u=[],Ji.set(a,u)),u.push({onLoad:t,onError:r})}return a}const o=Wr("img");function l(){d(),t&&t(this);const u=Ji.get(this)||[];for(let h=0;h<u.length;h++){const p=u[h];p.onLoad&&p.onLoad(this)}Ji.delete(this),s.manager.itemEnd(e)}function c(u){d(),r&&r(u),so.remove(`image:${e}`);const h=Ji.get(this)||[];for(let p=0;p<h.length;p++){const g=h[p];g.onError&&g.onError(u)}Ji.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),so.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Km extends sc{constructor(e){super(e)}load(e,t,i,r){const s=new qt,a=new Ym(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class ac extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Zm extends ac{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ao=new rt,Ud=new D,Od=new D;class yu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ic,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Ud.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ud),Od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Od),t.updateMatrixWorld(),ao.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ao,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Gr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ps=new D,Ls=new Hn,In=new D;class Su extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ps,Ls,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ps,Ls,In.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ps,Ls,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ps,Ls,In.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const li=new D,Fd=new Pe,zd=new Pe;class mn extends Su{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,Fd,zd),t.subVectors(zd,Fd)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ar*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Jm extends yu{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0}}class oc extends ac{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Jm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class $r extends Su{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class jm extends yu{constructor(){super(new $r(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bd extends ac{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new jm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ji=-90,Qi=1;class Qm extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new mn(ji,Qi,e,t);s.layers=this.layers,this.add(s);const a=new mn(ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new mn(ji,Qi,e,t);o.layers=this.layers,this.add(o);const l=new mn(ji,Qi,e,t);l.layers=this.layers,this.add(l);const c=new mn(ji,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Gr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class $m extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class e0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=t0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function t0(){this._document.hidden===!1&&this.reset()}const Cc=class Cc{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Cc.prototype.isMatrix2=!0;let kd=Cc;function Vd(n,e,t,i){const r=n0(i);switch(t){case ou:return n*e;case Kl:return n*e/r.components*r.byteLength;case Zl:return n*e/r.components*r.byteLength;case Ai:return n*e*2/r.components*r.byteLength;case Jl:return n*e*2/r.components*r.byteLength;case lu:return n*e*3/r.components*r.byteLength;case hn:return n*e*4/r.components*r.byteLength;case jl:return n*e*4/r.components*r.byteLength;case js:case Qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $s:case ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xo:case Yo:return Math.max(n,16)*Math.max(e,8)/4;case Wo:case qo:return Math.max(n,8)*Math.max(e,8)/2;case Ko:case Zo:case jo:case Qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jo:case da:case $o:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case nl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case rl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case sl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case al:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ll:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case dl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case hl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ul:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case fl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case pl:case ml:case gl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case xl:case vl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ha:case _l:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function n0(n){switch(n){case en:case iu:return{byteLength:1,components:1};case kr:case ru:case Xt:return{byteLength:2,components:1};case ql:case Yl:return{byteLength:2,components:4};case Vn:case Xl:case En:return{byteLength:4,components:1};case su:case au:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);function bu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function i0(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<u.length;p++){const g=u[h],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];n.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var r0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
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
#endif`,a0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,o0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,l0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d0=`#ifdef USE_AOMAP
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
#endif`,h0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,u0=`#ifdef USE_BATCHING
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
#endif`,f0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,p0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,x0=`#ifdef USE_IRIDESCENCE
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
#endif`,v0=`#ifdef USE_BUMPMAP
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
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,E0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,T0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,w0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,A0=`#define PI 3.141592653589793
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
} // validated`,R0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,C0=`vec3 transformedNormal = objectNormal;
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
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,L0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,N0="gl_FragColor = linearToOutputTexel( gl_FragColor );",U0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,O0=`#ifdef USE_ENVMAP
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
#endif`,F0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,z0=`#ifdef USE_ENVMAP
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
#endif`,B0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,V0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,H0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,W0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X0=`#ifdef USE_GRADIENTMAP
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
}`,q0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,K0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,J0=`#ifdef USE_ENVMAP
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
#endif`,j0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tg=`PhysicalMaterial material;
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
#endif`,ng=`uniform sampler2D dfgLUT;
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
}`,ig=`
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
#endif`,rg=`#if defined( RE_IndirectDiffuse )
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
#endif`,sg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ag=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ug=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pg=`#if defined( USE_POINTS_UV )
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
#endif`,mg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_g=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`#ifdef USE_MORPHTARGETS
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
#endif`,yg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ag=`#ifdef USE_NORMALMAP
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
#endif`,Rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Og=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gg=`float getShadowMask() {
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
}`,Wg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xg=`#ifdef USE_SKINNING
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
#endif`,qg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yg=`#ifdef USE_SKINNING
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
#endif`,Kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qg=`#ifdef USE_TRANSMISSION
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
#endif`,$g=`#ifdef USE_TRANSMISSION
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
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ix=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sx=`uniform sampler2D t2D;
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`#include <common>
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
}`,hx=`#if DEPTH_PACKING == 3200
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
}`,ux=`#define DISTANCE
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
}`,fx=`#define DISTANCE
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
}`,px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`uniform float scale;
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
}`,xx=`uniform vec3 diffuse;
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
}`,vx=`#include <common>
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
}`,_x=`uniform vec3 diffuse;
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
}`,Mx=`#define LAMBERT
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
}`,yx=`#define LAMBERT
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
}`,Sx=`#define MATCAP
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
}`,bx=`#define MATCAP
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
}`,Ex=`#define NORMAL
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
}`,Tx=`#define NORMAL
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
}`,wx=`#define PHONG
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
}`,Ax=`#define PHONG
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
}`,Rx=`#define STANDARD
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
}`,Cx=`#define STANDARD
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
}`,Px=`#define TOON
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
}`,Lx=`#define TOON
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
}`,Dx=`uniform float size;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,Nx=`#include <common>
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
}`,Ux=`uniform vec3 color;
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
}`,Ox=`uniform float rotation;
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
}`,Fx=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:r0,alphahash_pars_fragment:s0,alphamap_fragment:a0,alphamap_pars_fragment:o0,alphatest_fragment:l0,alphatest_pars_fragment:c0,aomap_fragment:d0,aomap_pars_fragment:h0,batching_pars_vertex:u0,batching_vertex:f0,begin_vertex:p0,beginnormal_vertex:m0,bsdfs:g0,iridescence_fragment:x0,bumpmap_pars_fragment:v0,clipping_planes_fragment:_0,clipping_planes_pars_fragment:M0,clipping_planes_pars_vertex:y0,clipping_planes_vertex:S0,color_fragment:b0,color_pars_fragment:E0,color_pars_vertex:T0,color_vertex:w0,common:A0,cube_uv_reflection_fragment:R0,defaultnormal_vertex:C0,displacementmap_pars_vertex:P0,displacementmap_vertex:L0,emissivemap_fragment:D0,emissivemap_pars_fragment:I0,colorspace_fragment:N0,colorspace_pars_fragment:U0,envmap_fragment:O0,envmap_common_pars_fragment:F0,envmap_pars_fragment:z0,envmap_pars_vertex:B0,envmap_physical_pars_fragment:J0,envmap_vertex:k0,fog_vertex:V0,fog_pars_vertex:H0,fog_fragment:G0,fog_pars_fragment:W0,gradientmap_pars_fragment:X0,lightmap_pars_fragment:q0,lights_lambert_fragment:Y0,lights_lambert_pars_fragment:K0,lights_pars_begin:Z0,lights_toon_fragment:j0,lights_toon_pars_fragment:Q0,lights_phong_fragment:$0,lights_phong_pars_fragment:eg,lights_physical_fragment:tg,lights_physical_pars_fragment:ng,lights_fragment_begin:ig,lights_fragment_maps:rg,lights_fragment_end:sg,lightprobes_pars_fragment:ag,logdepthbuf_fragment:og,logdepthbuf_pars_fragment:lg,logdepthbuf_pars_vertex:cg,logdepthbuf_vertex:dg,map_fragment:hg,map_pars_fragment:ug,map_particle_fragment:fg,map_particle_pars_fragment:pg,metalnessmap_fragment:mg,metalnessmap_pars_fragment:gg,morphinstance_vertex:xg,morphcolor_vertex:vg,morphnormal_vertex:_g,morphtarget_pars_vertex:Mg,morphtarget_vertex:yg,normal_fragment_begin:Sg,normal_fragment_maps:bg,normal_pars_fragment:Eg,normal_pars_vertex:Tg,normal_vertex:wg,normalmap_pars_fragment:Ag,clearcoat_normal_fragment_begin:Rg,clearcoat_normal_fragment_maps:Cg,clearcoat_pars_fragment:Pg,iridescence_pars_fragment:Lg,opaque_fragment:Dg,packing:Ig,premultiplied_alpha_fragment:Ng,project_vertex:Ug,dithering_fragment:Og,dithering_pars_fragment:Fg,roughnessmap_fragment:zg,roughnessmap_pars_fragment:Bg,shadowmap_pars_fragment:kg,shadowmap_pars_vertex:Vg,shadowmap_vertex:Hg,shadowmask_pars_fragment:Gg,skinbase_vertex:Wg,skinning_pars_vertex:Xg,skinning_vertex:qg,skinnormal_vertex:Yg,specularmap_fragment:Kg,specularmap_pars_fragment:Zg,tonemapping_fragment:Jg,tonemapping_pars_fragment:jg,transmission_fragment:Qg,transmission_pars_fragment:$g,uv_pars_fragment:ex,uv_pars_vertex:tx,uv_vertex:nx,worldpos_vertex:ix,background_vert:rx,background_frag:sx,backgroundCube_vert:ax,backgroundCube_frag:ox,cube_vert:lx,cube_frag:cx,depth_vert:dx,depth_frag:hx,distance_vert:ux,distance_frag:fx,equirect_vert:px,equirect_frag:mx,linedashed_vert:gx,linedashed_frag:xx,meshbasic_vert:vx,meshbasic_frag:_x,meshlambert_vert:Mx,meshlambert_frag:yx,meshmatcap_vert:Sx,meshmatcap_frag:bx,meshnormal_vert:Ex,meshnormal_frag:Tx,meshphong_vert:wx,meshphong_frag:Ax,meshphysical_vert:Rx,meshphysical_frag:Cx,meshtoon_vert:Px,meshtoon_frag:Lx,points_vert:Dx,points_frag:Ix,shadow_vert:Nx,shadow_frag:Ux,sprite_vert:Ox,sprite_frag:Fx},pe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Fn={basic:{uniforms:$t([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:$t([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:$t([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:$t([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:$t([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:$t([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:$t([pe.points,pe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:$t([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:$t([pe.common,pe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:$t([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:$t([pe.sprite,pe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:$t([pe.common,pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:$t([pe.lights,pe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Fn.physical={uniforms:$t([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Ds={r:0,b:0,g:0},zx=new rt,Eu=new Be;Eu.set(-1,0,0,0,1,0,0,0,1);function Bx(n,e,t,i,r,s){const a=new Ue(0);let o=r===!0?0:1,l,c,d=null,u=0,h=null;function p(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){const M=S.backgroundBlurriness>0;E=e.get(E,M)}return E}function g(S){let E=!1;const M=p(S);M===null?m(a,o):M&&M.isColor&&(m(M,1),E=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(S,E){const M=p(E);M&&(M.isCubeTexture||M.mapping===va)?(c===void 0&&(c=new Ye(new xn(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:ur(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(zx.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Eu),c.material.toneMapped=je.getTransfer(M.colorSpace)!==ot,(d!==M||u!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,u=M.version,h=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ye(new Qr(2,2),new vt({name:"BackgroundMaterial",uniforms:ur(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=je.getTransfer(M.colorSpace)!==ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,h=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(Ds,_u(n)),t.buffers.color.setClear(Ds.r,Ds.g,Ds.b,E,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:_,dispose:f}}function kx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(P,L,z,G,F){let X=!1;const B=u(P,G,z,L);s!==B&&(s=B,c(s.object)),X=p(P,G,z,F),X&&g(P,G,z,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(P,L,z,G),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function d(P){return n.deleteVertexArray(P)}function u(P,L,z,G){const F=G.wireframe===!0;let X=i[L.id];X===void 0&&(X={},i[L.id]=X);const B=P.isInstancedMesh===!0?P.id:0;let K=X[B];K===void 0&&(K={},X[B]=K);let j=K[z.id];j===void 0&&(j={},K[z.id]=j);let ne=j[F];return ne===void 0&&(ne=h(l()),j[F]=ne),ne}function h(P){const L=[],z=[],G=[];for(let F=0;F<t;F++)L[F]=0,z[F]=0,G[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:G,object:P,attributes:{},index:null}}function p(P,L,z,G){const F=s.attributes,X=L.attributes;let B=0;const K=z.getAttributes();for(const j in K)if(K[j].location>=0){const ae=F[j];let le=X[j];if(le===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),ae===void 0||ae.attribute!==le||le&&ae.data!==le.data)return!0;B++}return s.attributesNum!==B||s.index!==G}function g(P,L,z,G){const F={},X=L.attributes;let B=0;const K=z.getAttributes();for(const j in K)if(K[j].location>=0){let ae=X[j];ae===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(ae=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(ae=P.instanceColor));const le={};le.attribute=ae,ae&&ae.data&&(le.data=ae.data),F[j]=le,B++}s.attributes=F,s.attributesNum=B,s.index=G}function _(){const P=s.newAttributes;for(let L=0,z=P.length;L<z;L++)P[L]=0}function m(P){f(P,0)}function f(P,L){const z=s.newAttributes,G=s.enabledAttributes,F=s.attributeDivisors;z[P]=1,G[P]===0&&(n.enableVertexAttribArray(P),G[P]=1),F[P]!==L&&(n.vertexAttribDivisor(P,L),F[P]=L)}function S(){const P=s.newAttributes,L=s.enabledAttributes;for(let z=0,G=L.length;z<G;z++)L[z]!==P[z]&&(n.disableVertexAttribArray(z),L[z]=0)}function E(P,L,z,G,F,X,B){B===!0?n.vertexAttribIPointer(P,L,z,F,X):n.vertexAttribPointer(P,L,z,G,F,X)}function M(P,L,z,G){_();const F=G.attributes,X=z.getAttributes(),B=L.defaultAttributeValues;for(const K in X){const j=X[K];if(j.location>=0){let ne=F[K];if(ne===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),ne!==void 0){const ae=ne.normalized,le=ne.itemSize,ke=e.get(ne);if(ke===void 0)continue;const Ze=ke.buffer,ze=ke.type,Z=ke.bytesPerElement,ie=ze===n.INT||ze===n.UNSIGNED_INT||ne.gpuType===Xl;if(ne.isInterleavedBufferAttribute){const ee=ne.data,be=ee.stride,Ne=ne.offset;if(ee.isInstancedInterleavedBuffer){for(let ve=0;ve<j.locationSize;ve++)f(j.location+ve,ee.meshPerAttribute);P.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ve=0;ve<j.locationSize;ve++)m(j.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let ve=0;ve<j.locationSize;ve++)E(j.location+ve,le/j.locationSize,ze,ae,be*Z,(Ne+le/j.locationSize*ve)*Z,ie)}else{if(ne.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)f(j.location+ee,ne.meshPerAttribute);P.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ee=0;ee<j.locationSize;ee++)m(j.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let ee=0;ee<j.locationSize;ee++)E(j.location+ee,le/j.locationSize,ze,ae,le*Z,le/j.locationSize*ee*Z,ie)}}else if(B!==void 0){const ae=B[K];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(j.location,ae);break;case 3:n.vertexAttrib3fv(j.location,ae);break;case 4:n.vertexAttrib4fv(j.location,ae);break;default:n.vertexAttrib1fv(j.location,ae)}}}}S()}function T(){w();for(const P in i){const L=i[P];for(const z in L){const G=L[z];for(const F in G){const X=G[F];for(const B in X)d(X[B].object),delete X[B];delete G[F]}}delete i[P]}}function b(P){if(i[P.id]===void 0)return;const L=i[P.id];for(const z in L){const G=L[z];for(const F in G){const X=G[F];for(const B in X)d(X[B].object),delete X[B];delete G[F]}}delete i[P.id]}function R(P){for(const L in i){const z=i[L];for(const G in z){const F=z[G];if(F[P.id]===void 0)continue;const X=F[P.id];for(const B in X)d(X[B].object),delete X[B];delete F[P.id]}}}function v(P){for(const L in i){const z=i[L],G=P.isInstancedMesh===!0?P.id:0,F=z[G];if(F!==void 0){for(const X in F){const B=F[X];for(const K in B)d(B[K].object),delete B[K];delete F[X]}delete z[G],Object.keys(z).length===0&&delete i[L]}}}function w(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Vx(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let h=0;for(let p=0;p<d;p++)h+=c[p];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Hx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==hn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const v=R===Xt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==en&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==En&&!v)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Oe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:T,samples:b}}function Gx(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Mi,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||i!==0||r;return r=h,i=u.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?d(null):c();else{const S=s?0:i,E=S*4;let M=f.clippingState||null;l.value=M,M=d(g,h,E,p);for(let T=0;T!==E;++T)M[T]=t[T];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,M=p;E!==_;++E,M+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const hi=4,Hd=[.125,.215,.35,.446,.526,.582],Si=20,Wx=256,Ar=new $r,Gd=new Ue;let oo=null,lo=0,co=0,ho=!1;const Xx=new D;class Sl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=Xx}=s;oo=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(oo,lo,co),this._renderer.xr.enabled=ho,e.scissorTest=!1,$i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===dr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oo=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:Xt,format:hn,colorSpace:Hr,depthBuffer:!1},r=Wd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wd(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=qx(s)),this._blurMaterial=Kx(s,e,t),this._ggxMaterial=Yx(s,e,t)}return r}_compileMaterial(e){const t=new Ye(new Bt,e);this._renderer.compile(t,Ar)}_sceneToCubeUV(e,t,i,r,s){const l=new mn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,p=u.toneMapping;u.getClearColor(Gd),u.toneMapping=Bn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ye(new xn,new nn({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let f=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,f=!0):(m.color.copy(Gd),f=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[E],s.y,s.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[E]));const T=this._cubeSize;$i(r,M*T,E>2?T:0,T,T),u.setRenderTarget(r),f&&u.render(_,l),u.render(e,l)}u.toneMapping=p,u.autoClear=h,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===wi||e.mapping===dr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=qd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xd());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;$i(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),h=0+c*1.25,p=u*h,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-hi?i-g+hi:0),f=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,$i(s,m,f,3*_,2*_),r.setRenderTarget(s),r.render(o,Ar),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,$i(e,m,f,3*_,2*_),r.setRenderTarget(e),r.render(o,Ar)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const d=3,u=this._lodMeshes[r];u.material=c;const h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Si-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):Si;m>Si&&Oe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Si}`);const f=[];let S=0;for(let R=0;R<Si;++R){const v=R/_,w=Math.exp(-v*v/2);f.push(w),R===0?S+=w:R<m&&(S+=2*w)}for(let R=0;R<f.length;R++)f[R]=f[R]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-i;const M=this._sizeLods[r],T=3*M*(r>E-hi?r-E+hi:0),b=4*(this._cubeSize-M);$i(t,T,b,3*M,2*M),l.setRenderTarget(t),l.render(u,Ar)}}function qx(n){const e=[],t=[],i=[];let r=n;const s=n-hi+1+Hd.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-hi?l=Hd[a-n+hi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),E=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let b=0;b<p;b++){const R=b%3*2/3-1,v=b>2?0:-1,w=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];S.set(w,_*g*b),E.set(h,m*g*b);const C=[b,b,b,b,b,b];M.set(C,f*g*b)}const T=new Bt;T.setAttribute("position",new Ut(S,_)),T.setAttribute("uv",new Ut(E,m)),T.setAttribute("faceIndex",new Ut(M,f)),i.push(new Ye(T,null)),r>hi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Wd(n,e,t){const i=new Ot(n,e,t);return i.texture.mapping=va,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $i(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Yx(n,e,t){return new vt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Wx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Kx(n,e,t){const i=new Float32Array(Si),r=new D(0,1,0);return new vt({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function Xd(){return new vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

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
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function qd(){return new vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ht,depthTest:!1,depthWrite:!1})}function _a(){return`

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
	`}class Tu extends Ot{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new xu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new xn(5,5,5),s=new vt({name:"CubemapFromEquirect",uniforms:ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:Ht});s.uniforms.tEquirect.value=t;const a=new Ye(r,s),o=t.minFilter;return t.minFilter===jn&&(t.minFilter=Ct),new Qm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Zx(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===La||p===Da)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const _=new Tu(g.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",c),o(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===La||p===Da,_=p===wi||p===dr;if(g||_){let m=t.get(h);const f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new Sl(n)),m=g?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const S=h.image;return g&&S&&S.height>0||_&&S&&l(S)?(i===null&&(i=new Sl(n)),m=g?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,p){return p===La?h.mapping=wi:p===Da&&(h.mapping=dr),h}function l(h){let p=0;const g=6;for(let _=0;_<g;_++)h[_]!==void 0&&p++;return p===g}function c(h){const p=h.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(h){const p=h.target;p.removeEventListener("dispose",d);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:u}}function Jx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&sr("WebGLRenderer: "+i+" extension not supported."),r}}}function jx(n,e,t,i){const r={},s=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(u){const h=[],p=u.index,g=u.attributes.position;let _=0;if(g===void 0)return;if(p!==null){const S=p.array;_=p.version;for(let E=0,M=S.length;E<M;E+=3){const T=S[E+0],b=S[E+1],R=S[E+2];h.push(T,b,b,R,R,T)}}else{const S=g.array;_=g.version;for(let E=0,M=S.length/3-1;E<M;E+=3){const T=E+0,b=E+1,R=E+2;h.push(T,b,b,R,R,T)}}const m=new(g.count>=65535?mu:pu)(h,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function d(u){const h=s.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Qx(n,e,t){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,h){n.drawElements(i,h,s,u*a),t.update(h,i,1)}function c(u,h,p){p!==0&&(n.drawElementsInstanced(i,h,s,u*a,p),t.update(h,i,p))}function d(u,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,u,0,p);let _=0;for(let m=0;m<p;m++)_+=h[m];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function $x(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function e1(n,e,t){const i=new WeakMap,r=new Mt;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let M=o.attributes.position.count*E,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const b=new Float32Array(M*T*4*u),R=new du(b,M,T,u);R.type=En,R.needsUpdate=!0;const v=E*4;for(let C=0;C<u;C++){const P=m[C],L=f[C],z=S[C],G=M*T*4*C;for(let F=0;F<P.count;F++){const X=F*v;p===!0&&(r.fromBufferAttribute(P,F),b[G+X+0]=r.x,b[G+X+1]=r.y,b[G+X+2]=r.z,b[G+X+3]=0),g===!0&&(r.fromBufferAttribute(L,F),b[G+X+4]=r.x,b[G+X+5]=r.y,b[G+X+6]=r.z,b[G+X+7]=0),_===!0&&(r.fromBufferAttribute(z,F),b[G+X+8]=r.x,b[G+X+9]=r.y,b[G+X+10]=r.z,b[G+X+11]=z.itemSize===4?r.w:1)}}h={count:u,texture:R,size:new Pe(M,T)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function t1(n,e,t,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==d&&(e.update(h),s.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return h}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const n1={[Bl]:"LINEAR_TONE_MAPPING",[kl]:"REINHARD_TONE_MAPPING",[Vl]:"CINEON_TONE_MAPPING",[Hl]:"ACES_FILMIC_TONE_MAPPING",[xa]:"AGX_TONE_MAPPING",[Wl]:"NEUTRAL_TONE_MAPPING",[Gl]:"CUSTOM_TONE_MAPPING"};function i1(n,e,t,i,r,s){const a=new Ot(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Ri(e,t):void 0}),o=new Ot(e,t,{type:Xt,depthBuffer:!1,stencilBuffer:!1}),l=new Bt;l.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new lt([0,2,0,0,2,0],2));const c=new Mu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ye(l,c),u=new $r(-1,1,1,-1,0,1);let h=null,p=null,g=!1,_,m=null,f=[],S=!1;this.setSize=function(E,M){a.setSize(E,M),o.setSize(E,M);for(let T=0;T<f.length;T++){const b=f[T];b.setSize&&b.setSize(E,M)}},this.setEffects=function(E){f=E,S=f.length>0&&f[0].isRenderPass===!0;const M=a.width,T=a.height;for(let b=0;b<f.length;b++){const R=f[b];R.setSize&&R.setSize(M,T)}},this.begin=function(E,M){if(g||E.toneMapping===Bn&&f.length===0)return!1;if(m=M,M!==null){const T=M.width,b=M.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return S===!1&&E.setRenderTarget(a),_=E.toneMapping,E.toneMapping=Bn,!0},this.hasRenderPass=function(){return S},this.end=function(E,M){E.toneMapping=_,g=!0;let T=a,b=o;for(let R=0;R<f.length;R++){const v=f[R];if(v.enabled!==!1&&(v.render(E,b,T,M),v.needsSwap!==!1)){const w=T;T=b,b=w}}if(h!==E.outputColorSpace||p!==E.toneMapping){h=E.outputColorSpace,p=E.toneMapping,c.defines={},je.getTransfer(h)===ot&&(c.defines.SRGB_TRANSFER="");const R=n1[p];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,E.setRenderTarget(m),E.render(d,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const wu=new qt,bl=new Ri(1,1),Au=new du,Ru=new _m,Cu=new xu,Yd=[],Kd=[],Zd=new Float32Array(16),Jd=new Float32Array(9),jd=new Float32Array(4);function vr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Yd[r];if(s===void 0&&(s=new Float32Array(r),Yd[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ma(n,e){let t=Kd[e];t===void 0&&(t=new Int32Array(e),Kd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function r1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function s1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function a1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function o1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function l1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Ft(t,i))return;jd.set(i),n.uniformMatrix2fv(this.addr,!1,jd),zt(t,i)}}function c1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Ft(t,i))return;Jd.set(i),n.uniformMatrix3fv(this.addr,!1,Jd),zt(t,i)}}function d1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Ft(t,i))return;Zd.set(i),n.uniformMatrix4fv(this.addr,!1,Zd),zt(t,i)}}function h1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function u1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function f1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function p1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function m1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function g1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function x1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function v1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function _1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(bl.compareFunction=t.isReversedDepthBuffer()?$l:Ql,s=bl):s=wu,t.setTexture2D(e||s,r)}function M1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ru,r)}function y1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Cu,r)}function S1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Au,r)}function b1(n){switch(n){case 5126:return r1;case 35664:return s1;case 35665:return a1;case 35666:return o1;case 35674:return l1;case 35675:return c1;case 35676:return d1;case 5124:case 35670:return h1;case 35667:case 35671:return u1;case 35668:case 35672:return f1;case 35669:case 35673:return p1;case 5125:return m1;case 36294:return g1;case 36295:return x1;case 36296:return v1;case 35678:case 36198:case 36298:case 36306:case 35682:return _1;case 35679:case 36299:case 36307:return M1;case 35680:case 36300:case 36308:case 36293:return y1;case 36289:case 36303:case 36311:case 36292:return S1}}function E1(n,e){n.uniform1fv(this.addr,e)}function T1(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function w1(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function A1(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function R1(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function C1(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function P1(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function L1(n,e){n.uniform1iv(this.addr,e)}function D1(n,e){n.uniform2iv(this.addr,e)}function I1(n,e){n.uniform3iv(this.addr,e)}function N1(n,e){n.uniform4iv(this.addr,e)}function U1(n,e){n.uniform1uiv(this.addr,e)}function O1(n,e){n.uniform2uiv(this.addr,e)}function F1(n,e){n.uniform3uiv(this.addr,e)}function z1(n,e){n.uniform4uiv(this.addr,e)}function B1(n,e,t){const i=this.cache,r=e.length,s=Ma(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=bl:a=wu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function k1(n,e,t){const i=this.cache,r=e.length,s=Ma(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ru,s[a])}function V1(n,e,t){const i=this.cache,r=e.length,s=Ma(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Cu,s[a])}function H1(n,e,t){const i=this.cache,r=e.length,s=Ma(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Au,s[a])}function G1(n){switch(n){case 5126:return E1;case 35664:return T1;case 35665:return w1;case 35666:return A1;case 35674:return R1;case 35675:return C1;case 35676:return P1;case 5124:case 35670:return L1;case 35667:case 35671:return D1;case 35668:case 35672:return I1;case 35669:case 35673:return N1;case 5125:return U1;case 36294:return O1;case 36295:return F1;case 36296:return z1;case 35678:case 36198:case 36298:case 36306:case 35682:return B1;case 35679:case 36299:case 36307:return k1;case 35680:case 36300:case 36308:case 36293:return V1;case 36289:case 36303:case 36311:case 36292:return H1}}class W1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=b1(t.type)}}class X1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=G1(t.type)}}class q1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const uo=/(\w+)(\])?(\[|\.)?/g;function Qd(n,e){n.seq.push(e),n.map[e.id]=e}function Y1(n,e,t){const i=n.name,r=i.length;for(uo.lastIndex=0;;){const s=uo.exec(i),a=uo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Qd(t,c===void 0?new W1(o,n,e):new X1(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new q1(o),Qd(t,u)),t=u}}}class ta{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Y1(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function $d(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const K1=37297;let Z1=0;function J1(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const eh=new Be;function j1(n){je._getMatrix(eh,je.workingColorSpace,n);const e=`mat3( ${eh.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case ua:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function th(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+J1(n.getShaderSource(e),o)}else return s}function Q1(n,e){const t=j1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const $1={[Bl]:"Linear",[kl]:"Reinhard",[Vl]:"Cineon",[Hl]:"ACESFilmic",[xa]:"AgX",[Wl]:"Neutral",[Gl]:"Custom"};function ev(n,e){const t=$1[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Is=new D;function tv(){je.getLuminanceCoefficients(Is);const n=Is.x.toFixed(4),e=Is.y.toFixed(4),t=Is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fr).join(`
`)}function iv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Fr(n){return n!==""}function nh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ih(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sv=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(n){return n.replace(sv,ov)}const av=new Map;function ov(n,e){let t=qe[e];if(t===void 0){const i=av.get(e);if(i!==void 0)t=qe[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return El(t)}const lv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rh(n){return n.replace(lv,cv)}function cv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function sh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const dv={[zr]:"SHADOWMAP_TYPE_PCF",[Nr]:"SHADOWMAP_TYPE_VSM"};function hv(n){return dv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const uv={[wi]:"ENVMAP_TYPE_CUBE",[dr]:"ENVMAP_TYPE_CUBE",[va]:"ENVMAP_TYPE_CUBE_UV"};function fv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":uv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const pv={[dr]:"ENVMAP_MODE_REFRACTION"};function mv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":pv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const gv={[zl]:"ENVMAP_BLENDING_MULTIPLY",[Fp]:"ENVMAP_BLENDING_MIX",[zp]:"ENVMAP_BLENDING_ADD"};function xv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":gv[n.combine]||"ENVMAP_BLENDING_NONE"}function vv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function _v(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=hv(t),c=fv(t),d=mv(t),u=xv(t),h=vv(t),p=nv(t),g=iv(s),_=r.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Fr).join(`
`),f.length>0&&(f+=`
`)):(m=[sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),f=[sh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Bn?ev("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,Q1("linearToOutputTexel",t.outputColorSpace),tv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fr).join(`
`)),a=El(a),a=nh(a,t),a=ih(a,t),o=El(o),o=nh(o,t),o=ih(o,t),a=rh(a),o=rh(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===od?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=S+m+a,M=S+f+o,T=$d(r,r.VERTEX_SHADER,E),b=$d(r,r.FRAGMENT_SHADER,M);r.attachShader(_,T),r.attachShader(_,b),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(_)||"",z=r.getShaderInfoLog(T)||"",G=r.getShaderInfoLog(b)||"",F=L.trim(),X=z.trim(),B=G.trim();let K=!0,j=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,T,b);else{const ne=th(r,T,"vertex"),ae=th(r,b,"fragment");it("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+ne+`
`+ae)}else F!==""?Oe("WebGLProgram: Program Info Log:",F):(X===""||B==="")&&(j=!1);j&&(P.diagnostics={runnable:K,programLog:F,vertexShader:{log:X,prefix:m},fragmentShader:{log:B,prefix:f}})}r.deleteShader(T),r.deleteShader(b),v=new ta(r,_),w=rv(r,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(_,K1)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Z1++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let Mv=0;class yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Sv(e),t.set(e,i)),i}}class Sv{constructor(e){this.id=Mv++,this.code=e,this.usedTimes=0}}function bv(n){return n===Ai||n===da||n===ha}function Ev(n,e,t,i,r,s){const a=new hu,o=new yv,l=new Set,c=[],d=new Map,u=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,w,C,P,L,z){const G=P.fog,F=L.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||X,B),j=K&&K.mapping===va?K.image.height:null,ne=p[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Oe("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const ae=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,le=ae!==void 0?ae.length:0;let ke=0;F.morphAttributes.position!==void 0&&(ke=1),F.morphAttributes.normal!==void 0&&(ke=2),F.morphAttributes.color!==void 0&&(ke=3);let Ze,ze,Z,ie;if(ne){const Se=Fn[ne];Ze=Se.vertexShader,ze=Se.fragmentShader}else{Ze=v.vertexShader,ze=v.fragmentShader;const Se=o.getVertexShaderStage(v),St=o.getFragmentShaderStage(v);o.update(v,Se,St),Z=Se.id,ie=St.id}const ee=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ne=L.isInstancedMesh===!0,ve=L.isBatchedMesh===!0,dt=!!v.map,He=!!v.matcap,et=!!K,se=!!v.aoMap,we=!!v.lightMap,Re=!!v.bumpMap&&v.wireframe===!1,st=!!v.normalMap,We=!!v.displacementMap,Ve=!!v.emissiveMap,at=!!v.metalnessMap,tt=!!v.roughnessMap,I=v.anisotropy>0,Nt=v.clearcoat>0,Xe=v.dispersion>0,A=v.iridescence>0,x=v.sheen>0,O=v.transmission>0,k=I&&!!v.anisotropyMap,Y=Nt&&!!v.clearcoatMap,re=Nt&&!!v.clearcoatNormalMap,de=Nt&&!!v.clearcoatRoughnessMap,J=A&&!!v.iridescenceMap,Q=A&&!!v.iridescenceThicknessMap,he=x&&!!v.sheenColorMap,Ae=x&&!!v.sheenRoughnessMap,ce=!!v.specularMap,oe=!!v.specularColorMap,Ee=!!v.specularIntensityMap,De=O&&!!v.transmissionMap,Fe=O&&!!v.thicknessMap,N=!!v.gradientMap,ue=!!v.alphaMap,$=v.alphaTest>0,fe=!!v.alphaHash,xe=!!v.extensions;let te=Bn;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(te=n.toneMapping);const Ce={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:Ze,fragmentShader:ze,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:ie,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:ve,batchingColor:ve&&L._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&L.instanceColor!==null,instancingMorph:Ne&&L.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:dt,matcap:He,envMap:et,envMapMode:et&&K.mapping,envMapCubeUVHeight:j,aoMap:se,lightMap:we,bumpMap:Re,normalMap:st,displacementMap:We,emissiveMap:Ve,normalMapObjectSpace:st&&v.normalMapType===Vp,normalMapTangentSpace:st&&v.normalMapType===Vr,packedNormalMap:st&&v.normalMapType===Vr&&bv(v.normalMap.format),metalnessMap:at,roughnessMap:tt,anisotropy:I,anisotropyMap:k,clearcoat:Nt,clearcoatMap:Y,clearcoatNormalMap:re,clearcoatRoughnessMap:de,dispersion:Xe,iridescence:A,iridescenceMap:J,iridescenceThicknessMap:Q,sheen:x,sheenColorMap:he,sheenRoughnessMap:Ae,specularMap:ce,specularColorMap:oe,specularIntensityMap:Ee,transmission:O,transmissionMap:De,thicknessMap:Fe,gradientMap:N,opaque:v.transparent===!1&&v.blending===rr&&v.alphaToCoverage===!1,alphaMap:ue,alphaTest:$,alphaHash:fe,combine:v.combine,mapUv:dt&&g(v.map.channel),aoMapUv:se&&g(v.aoMap.channel),lightMapUv:we&&g(v.lightMap.channel),bumpMapUv:Re&&g(v.bumpMap.channel),normalMapUv:st&&g(v.normalMap.channel),displacementMapUv:We&&g(v.displacementMap.channel),emissiveMapUv:Ve&&g(v.emissiveMap.channel),metalnessMapUv:at&&g(v.metalnessMap.channel),roughnessMapUv:tt&&g(v.roughnessMap.channel),anisotropyMapUv:k&&g(v.anisotropyMap.channel),clearcoatMapUv:Y&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:he&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&g(v.sheenRoughnessMap.channel),specularMapUv:ce&&g(v.specularMap.channel),specularColorMapUv:oe&&g(v.specularColorMap.channel),specularIntensityMapUv:Ee&&g(v.specularIntensityMap.channel),transmissionMapUv:De&&g(v.transmissionMap.channel),thicknessMapUv:Fe&&g(v.thicknessMap.channel),alphaMapUv:ue&&g(v.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(st||I),vertexNormals:!!F.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!F.attributes.uv&&(dt||ue),fog:!!G,useFog:v.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||F.attributes.normal===void 0&&st===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:ke,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:te,decodeVideoTexture:dt&&v.map.isVideoTexture===!0&&je.getTransfer(v.map.colorSpace)===ot,decodeVideoTextureEmissive:Ve&&v.emissiveMap.isVideoTexture===!0&&je.getTransfer(v.emissiveMap.colorSpace)===ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===sn,flipSided:v.side===rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)w.push(C),w.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(f(w,v),S(w,v),w.push(n.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function f(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function S(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function E(v){const w=p[v.type];let C;if(w){const P=Fn[w];C=dn.clone(P.uniforms)}else C=v.uniforms;return C}function M(v,w){let C=d.get(w);return C!==void 0?++C.usedTimes:(C=new _v(n,w,v,r),c.push(C),d.set(w,C)),C}function T(v){if(--v.usedTimes===0){const w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function R(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:R}}function Tv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function wv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ah(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function oh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,_,m,f){let S=n[e];return S===void 0?(S={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:f},n[e]=S):(S.id=h.id,S.object=h,S.geometry=p,S.material=g,S.materialVariant=a(h),S.groupOrder=_,S.renderOrder=h.renderOrder,S.z=m,S.group=f),e++,S}function l(h,p,g,_,m,f){const S=o(h,p,g,_,m,f);g.transmission>0?i.push(S):g.transparent===!0?r.push(S):t.push(S)}function c(h,p,g,_,m,f){const S=o(h,p,g,_,m,f);g.transmission>0?i.unshift(S):g.transparent===!0?r.unshift(S):t.unshift(S)}function d(h,p,g){t.length>1&&t.sort(h||wv),i.length>1&&i.sort(p||ah),r.length>1&&r.sort(p||ah),g&&(t.reverse(),i.reverse(),r.reverse())}function u(){for(let h=e,p=n.length;h<p;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:u,sort:d}}function Av(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new oh,n.set(i,[a])):r>=s.length?(a=new oh,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Rv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function Cv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Pv=0;function Lv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Dv(n){const e=new Rv,t=Cv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const r=new D,s=new rt,a=new rt;function o(c){let d=0,u=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,S=0,E=0,M=0,T=0,b=0,R=0;c.sort(Lv);for(let w=0,C=c.length;w<C;w++){const P=c[w],L=P.color,z=P.intensity,G=P.distance;let F=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ai?F=P.shadow.map.texture:F=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=L.r*z,u+=L.g*z,h+=L.b*z;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],z);R++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const B=P.shadow,K=t.get(P);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,i.directionalShadow[p]=K,i.directionalShadowMap[p]=F,i.directionalShadowMatrix[p]=P.shadow.matrix,S++}i.directional[p]=X,p++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(L).multiplyScalar(z),X.distance=G,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[_]=X;const B=P.shadow;if(P.map&&(i.spotLightMap[T]=P.map,T++,B.updateMatrices(P),P.castShadow&&b++),i.spotLightMatrix[_]=B.matrix,P.castShadow){const K=t.get(P);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,i.spotShadow[_]=K,i.spotShadowMap[_]=F,M++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(L).multiplyScalar(z),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const B=P.shadow,K=t.get(P);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,K.shadowCameraNear=B.camera.near,K.shadowCameraFar=B.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=P.shadow.matrix,E++}i.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(z),X.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[f]=X,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==f||v.numDirectionalShadows!==S||v.numPointShadows!==E||v.numSpotShadows!==M||v.numSpotMaps!==T||v.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=M+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,v.directionalLength=p,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=f,v.numDirectionalShadows=S,v.numPointShadows=E,v.numSpotShadows=M,v.numSpotMaps=T,v.numLightProbes=R,i.version=Pv++)}function l(c,d){let u=0,h=0,p=0,g=0,_=0;const m=d.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const E=c[f];if(E.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),u++}else if(E.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function lh(n){const e=new Dv(n),t=[],i=[],r=[];function s(h){u.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function d(h){e.setupView(t,h)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Iv(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new lh(n),e.set(r,[o])):s>=a.length?(o=new lh(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Nv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Uv=`uniform sampler2D shadow_pass;
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
}`,Ov=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],Fv=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],ch=new rt,Rr=new D,fo=new D;function zv(n,e,t){let i=new ic;const r=new Pe,s=new Pe,a=new Mt,o=new Gm,l=new Wm,c={},d=t.maxTextureSize,u={[ui]:rn,[rn]:ui,[sn]:sn},h=new vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:Nv,fragmentShader:Uv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Bt;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ye(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zr;let f=this.type;this.render=function(b,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Sp&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=zr);const w=n.getRenderTarget(),C=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Ht),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const z=f!==this.type;z&&R.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(F=>F.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,F=b.length;G<F;G++){const X=b[G],B=X.shadow;if(B===void 0){Oe("WebGLShadowMap:",X,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const K=B.getFrameExtents();r.multiply(K),s.copy(B.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/K.x),r.x=s.x*K.x,B.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/K.y),r.y=s.y*K.y,B.mapSize.y=s.y));const j=n.state.buffers.depth.getReversed();if(B.camera._reversedDepth=j,B.map===null||z===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Nr){if(X.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Ot(r.x,r.y,{format:Ai,type:Xt,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),B.map.texture.name=X.name+".shadowMap",B.map.depthTexture=new Ri(r.x,r.y,En),B.map.depthTexture.name=X.name+".shadowMapDepth",B.map.depthTexture.format=$n,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Rt,B.map.depthTexture.magFilter=Rt}else X.isPointLight?(B.map=new Tu(r.x),B.map.depthTexture=new Fm(r.x,Vn)):(B.map=new Ot(r.x,r.y),B.map.depthTexture=new Ri(r.x,r.y,Vn)),B.map.depthTexture.name=X.name+".shadowMap",B.map.depthTexture.format=$n,this.type===zr?(B.map.depthTexture.compareFunction=j?$l:Ql,B.map.depthTexture.minFilter=Ct,B.map.depthTexture.magFilter=Ct):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Rt,B.map.depthTexture.magFilter=Rt);B.camera.updateProjectionMatrix()}const ne=B.map.isWebGLCubeRenderTarget?6:1;for(let ae=0;ae<ne;ae++){if(B.map.isWebGLCubeRenderTarget)n.setRenderTarget(B.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(B.map),n.clear());const le=B.getViewport(ae);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),L.viewport(a)}if(X.isPointLight){const le=B.camera,ke=B.matrix,Ze=X.distance||le.far;Ze!==le.far&&(le.far=Ze,le.updateProjectionMatrix()),Rr.setFromMatrixPosition(X.matrixWorld),le.position.copy(Rr),fo.copy(le.position),fo.add(Ov[ae]),le.up.copy(Fv[ae]),le.lookAt(fo),le.updateMatrixWorld(),ke.makeTranslation(-Rr.x,-Rr.y,-Rr.z),ch.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),B._frustum.setFromProjectionMatrix(ch,le.coordinateSystem,le.reversedDepth)}else B.updateMatrices(X);i=B.getFrustum(),M(R,v,B.camera,X,this.type)}B.isPointLightShadow!==!0&&this.type===Nr&&S(B,v),B.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(w,C,P)};function S(b,R){const v=e.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ot(r.x,r.y,{format:Ai,type:Xt})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,v,h,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,v,p,_,null)}function E(b,R,v,w){let C=null;const P=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=v.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const L=C.uuid,z=R.uuid;let G=c[L];G===void 0&&(G={},c[L]=G);let F=G[z];F===void 0&&(F=C.clone(),G[z]=F,R.addEventListener("dispose",T)),C=F}if(C.visible=R.visible,C.wireframe=R.wireframe,w===Nr?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:u[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=n.properties.get(C);L.light=v}return C}function M(b,R,v,w,C){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===Nr)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const z=e.update(b),G=b.material;if(Array.isArray(G)){const F=z.groups;for(let X=0,B=F.length;X<B;X++){const K=F[X],j=G[K.materialIndex];if(j&&j.visible){const ne=E(b,j,w,C);b.onBeforeShadow(n,b,R,v,z,ne,K),n.renderBufferDirect(v,null,z,ne,b,K),b.onAfterShadow(n,b,R,v,z,ne,K)}}}else if(G.visible){const F=E(b,G,w,C);b.onBeforeShadow(n,b,R,v,z,F,null),n.renderBufferDirect(v,null,z,F,b,null),b.onAfterShadow(n,b,R,v,z,F,null)}}const L=b.children;for(let z=0,G=L.length;z<G;z++)M(L[z],R,v,w,C)}function T(b){b.target.removeEventListener("dispose",T);for(const v in c){const w=c[v],C=b.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function Bv(n,e){function t(){let N=!1;const ue=new Mt;let $=null;const fe=new Mt(0,0,0,0);return{setMask:function(xe){$!==xe&&!N&&(n.colorMask(xe,xe,xe,xe),$=xe)},setLocked:function(xe){N=xe},setClear:function(xe,te,Ce,Se,St){St===!0&&(xe*=Se,te*=Se,Ce*=Se),ue.set(xe,te,Ce,Se),fe.equals(ue)===!1&&(n.clearColor(xe,te,Ce,Se),fe.copy(ue))},reset:function(){N=!1,$=null,fe.set(-1,0,0,0)}}}function i(){let N=!1,ue=!1,$=null,fe=null,xe=null;return{setReversed:function(te){if(ue!==te){const Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ue=te;const Se=xe;xe=null,this.setClear(Se)}},getReversed:function(){return ue},setTest:function(te){te?ee(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(te){$!==te&&!N&&(n.depthMask(te),$=te)},setFunc:function(te){if(ue&&(te=jp[te]),fe!==te){switch(te){case Oo:n.depthFunc(n.NEVER);break;case Fo:n.depthFunc(n.ALWAYS);break;case zo:n.depthFunc(n.LESS);break;case cr:n.depthFunc(n.LEQUAL);break;case Bo:n.depthFunc(n.EQUAL);break;case ko:n.depthFunc(n.GEQUAL);break;case Vo:n.depthFunc(n.GREATER);break;case Ho:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=te}},setLocked:function(te){N=te},setClear:function(te){xe!==te&&(xe=te,ue&&(te=1-te),n.clearDepth(te))},reset:function(){N=!1,$=null,fe=null,xe=null,ue=!1}}}function r(){let N=!1,ue=null,$=null,fe=null,xe=null,te=null,Ce=null,Se=null,St=null;return{setTest:function(ft){N||(ft?ee(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(ft){ue!==ft&&!N&&(n.stencilMask(ft),ue=ft)},setFunc:function(ft,Pn,Ln){($!==ft||fe!==Pn||xe!==Ln)&&(n.stencilFunc(ft,Pn,Ln),$=ft,fe=Pn,xe=Ln)},setOp:function(ft,Pn,Ln){(te!==ft||Ce!==Pn||Se!==Ln)&&(n.stencilOp(ft,Pn,Ln),te=ft,Ce=Pn,Se=Ln)},setLocked:function(ft){N=ft},setClear:function(ft){St!==ft&&(n.clearStencil(ft),St=ft)},reset:function(){N=!1,ue=null,$=null,fe=null,xe=null,te=null,Ce=null,Se=null,St=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},u={},h={},p=new WeakMap,g=[],_=null,m=!1,f=null,S=null,E=null,M=null,T=null,b=null,R=null,v=new Ue(0,0,0),w=0,C=!1,P=null,L=null,z=null,G=null,F=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(j)[1]),B=K>=1):j.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),B=K>=2);let ne=null,ae={};const le=n.getParameter(n.SCISSOR_BOX),ke=n.getParameter(n.VIEWPORT),Ze=new Mt().fromArray(le),ze=new Mt().fromArray(ke);function Z(N,ue,$,fe){const xe=new Uint8Array(4),te=n.createTexture();n.bindTexture(N,te),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ce=0;Ce<$;Ce++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(ue,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(ue+Ce,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return te}const ie={};ie[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(cr),Re(!1),st(nd),ee(n.CULL_FACE),se(Ht);function ee(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function be(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function Ne(N,ue){return h[N]!==ue?(n.bindFramebuffer(N,ue),h[N]=ue,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ue),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ue),!0):!1}function ve(N,ue){let $=g,fe=!1;if(N){$=p.get(ue),$===void 0&&($=[],p.set(ue,$));const xe=N.textures;if($.length!==xe.length||$[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Ce=xe.length;te<Ce;te++)$[te]=n.COLOR_ATTACHMENT0+te;$.length=xe.length,fe=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,fe=!0);fe&&n.drawBuffers($)}function dt(N){return _!==N?(n.useProgram(N),_=N,!0):!1}const He={[bn]:n.FUNC_ADD,[bp]:n.FUNC_SUBTRACT,[Ep]:n.FUNC_REVERSE_SUBTRACT};He[Tp]=n.MIN,He[wp]=n.MAX;const et={[Ur]:n.ZERO,[Ap]:n.ONE,[Rp]:n.SRC_COLOR,[Do]:n.SRC_ALPHA,[Dp]:n.SRC_ALPHA_SATURATE,[Uo]:n.DST_COLOR,[No]:n.DST_ALPHA,[Cp]:n.ONE_MINUS_SRC_COLOR,[Io]:n.ONE_MINUS_SRC_ALPHA,[Lp]:n.ONE_MINUS_DST_COLOR,[Pp]:n.ONE_MINUS_DST_ALPHA,[Ip]:n.CONSTANT_COLOR,[Np]:n.ONE_MINUS_CONSTANT_COLOR,[Up]:n.CONSTANT_ALPHA,[Op]:n.ONE_MINUS_CONSTANT_ALPHA};function se(N,ue,$,fe,xe,te,Ce,Se,St,ft){if(N===Ht){m===!0&&(be(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),N!==tu){if(N!==f||ft!==C){if((S!==bn||T!==bn)&&(n.blendEquation(n.FUNC_ADD),S=bn,T=bn),ft)switch(N){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ca:n.blendFunc(n.ONE,n.ONE);break;case id:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:it("WebGLState: Invalid blending: ",N);break}else switch(N){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ca:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case id:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rd:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",N);break}E=null,M=null,b=null,R=null,v.set(0,0,0),w=0,f=N,C=ft}return}xe=xe||ue,te=te||$,Ce=Ce||fe,(ue!==S||xe!==T)&&(n.blendEquationSeparate(He[ue],He[xe]),S=ue,T=xe),($!==E||fe!==M||te!==b||Ce!==R)&&(n.blendFuncSeparate(et[$],et[fe],et[te],et[Ce]),E=$,M=fe,b=te,R=Ce),(Se.equals(v)===!1||St!==w)&&(n.blendColor(Se.r,Se.g,Se.b,St),v.copy(Se),w=St),f=N,C=!1}function we(N,ue){N.side===sn?be(n.CULL_FACE):ee(n.CULL_FACE);let $=N.side===rn;ue&&($=!$),Re($),N.blending===rr&&N.transparent===!1?se(Ht):se(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const fe=N.stencilWrite;o.setTest(fe),fe&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ve(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function Re(N){P!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),P=N)}function st(N){N!==Mp?(ee(n.CULL_FACE),N!==L&&(N===nd?n.cullFace(n.BACK):N===yp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),L=N}function We(N){N!==z&&(B&&n.lineWidth(N),z=N)}function Ve(N,ue,$){N?(ee(n.POLYGON_OFFSET_FILL),(G!==ue||F!==$)&&(G=ue,F=$,a.getReversed()&&(ue=-ue),n.polygonOffset(ue,$))):be(n.POLYGON_OFFSET_FILL)}function at(N){N?ee(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function tt(N){N===void 0&&(N=n.TEXTURE0+X-1),ne!==N&&(n.activeTexture(N),ne=N)}function I(N,ue,$){$===void 0&&(ne===null?$=n.TEXTURE0+X-1:$=ne);let fe=ae[$];fe===void 0&&(fe={type:void 0,texture:void 0},ae[$]=fe),(fe.type!==N||fe.texture!==ue)&&(ne!==$&&(n.activeTexture($),ne=$),n.bindTexture(N,ue||ie[N]),fe.type=N,fe.texture=ue)}function Nt(){const N=ae[ne];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Xe(){try{n.compressedTexImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function x(){try{n.texSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function O(){try{n.texSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function k(){try{n.compressedTexSubImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function re(){try{n.texStorage2D(...arguments)}catch(N){it("WebGLState:",N)}}function de(){try{n.texStorage3D(...arguments)}catch(N){it("WebGLState:",N)}}function J(){try{n.texImage2D(...arguments)}catch(N){it("WebGLState:",N)}}function Q(){try{n.texImage3D(...arguments)}catch(N){it("WebGLState:",N)}}function he(N){return u[N]!==void 0?u[N]:n.getParameter(N)}function Ae(N,ue){u[N]!==ue&&(n.pixelStorei(N,ue),u[N]=ue)}function ce(N){Ze.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Ze.copy(N))}function oe(N){ze.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),ze.copy(N))}function Ee(N,ue){let $=c.get(ue);$===void 0&&($=new WeakMap,c.set(ue,$));let fe=$.get(N);fe===void 0&&(fe=n.getUniformBlockIndex(ue,N.name),$.set(N,fe))}function De(N,ue){const fe=c.get(ue).get(N);l.get(ue)!==fe&&(n.uniformBlockBinding(ue,fe,N.__bindingPointIndex),l.set(ue,fe))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},u={},ne=null,ae={},h={},p=new WeakMap,g=[],_=null,m=!1,f=null,S=null,E=null,M=null,T=null,b=null,R=null,v=new Ue(0,0,0),w=0,C=!1,P=null,L=null,z=null,G=null,F=null,Ze.set(0,0,n.canvas.width,n.canvas.height),ze.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:be,bindFramebuffer:Ne,drawBuffers:ve,useProgram:dt,setBlending:se,setMaterial:we,setFlipSided:Re,setCullFace:st,setLineWidth:We,setPolygonOffset:Ve,setScissorTest:at,activeTexture:tt,bindTexture:I,unbindTexture:Nt,compressedTexImage2D:Xe,compressedTexImage3D:A,texImage2D:J,texImage3D:Q,pixelStorei:Ae,getParameter:he,updateUBOMapping:Ee,uniformBlockBinding:De,texStorage2D:re,texStorage3D:de,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:k,compressedTexSubImage3D:Y,scissor:ce,viewport:oe,reset:Fe}}function kv(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,d=new WeakMap,u=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,x){return g?new OffscreenCanvas(A,x):Wr("canvas")}function m(A,x,O){let k=1;const Y=Xe(A);if((Y.width>O||Y.height>O)&&(k=O/Math.max(Y.width,Y.height)),k<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const re=Math.floor(k*Y.width),de=Math.floor(k*Y.height);h===void 0&&(h=_(re,de));const J=x?_(re,de):h;return J.width=re,J.height=de,J.getContext("2d").drawImage(A,0,0,re,de),Oe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+re+"x"+de+")."),J}else return"data"in A&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),A;return A}function f(A){return A.generateMipmaps}function S(A){n.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(A,x,O,k,Y,re=!1){if(A!==null){if(n[A]!==void 0)return n[A];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let de;k&&(de=e.get("EXT_texture_norm16"),de||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=x;if(x===n.RED&&(O===n.FLOAT&&(J=n.R32F),O===n.HALF_FLOAT&&(J=n.R16F),O===n.UNSIGNED_BYTE&&(J=n.R8),O===n.UNSIGNED_SHORT&&de&&(J=de.R16_EXT),O===n.SHORT&&de&&(J=de.R16_SNORM_EXT)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.R8UI),O===n.UNSIGNED_SHORT&&(J=n.R16UI),O===n.UNSIGNED_INT&&(J=n.R32UI),O===n.BYTE&&(J=n.R8I),O===n.SHORT&&(J=n.R16I),O===n.INT&&(J=n.R32I)),x===n.RG&&(O===n.FLOAT&&(J=n.RG32F),O===n.HALF_FLOAT&&(J=n.RG16F),O===n.UNSIGNED_BYTE&&(J=n.RG8),O===n.UNSIGNED_SHORT&&de&&(J=de.RG16_EXT),O===n.SHORT&&de&&(J=de.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RG8UI),O===n.UNSIGNED_SHORT&&(J=n.RG16UI),O===n.UNSIGNED_INT&&(J=n.RG32UI),O===n.BYTE&&(J=n.RG8I),O===n.SHORT&&(J=n.RG16I),O===n.INT&&(J=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RGB8UI),O===n.UNSIGNED_SHORT&&(J=n.RGB16UI),O===n.UNSIGNED_INT&&(J=n.RGB32UI),O===n.BYTE&&(J=n.RGB8I),O===n.SHORT&&(J=n.RGB16I),O===n.INT&&(J=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),O===n.UNSIGNED_INT&&(J=n.RGBA32UI),O===n.BYTE&&(J=n.RGBA8I),O===n.SHORT&&(J=n.RGBA16I),O===n.INT&&(J=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_SHORT&&de&&(J=de.RGB16_EXT),O===n.SHORT&&de&&(J=de.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),x===n.RGBA){const Q=re?ua:je.getTransfer(Y);O===n.FLOAT&&(J=n.RGBA32F),O===n.HALF_FLOAT&&(J=n.RGBA16F),O===n.UNSIGNED_BYTE&&(J=Q===ot?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&de&&(J=de.RGBA16_EXT),O===n.SHORT&&de&&(J=de.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function T(A,x){let O;return A?x===null||x===Vn||x===hr?O=n.DEPTH24_STENCIL8:x===En?O=n.DEPTH32F_STENCIL8:x===kr&&(O=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Vn||x===hr?O=n.DEPTH_COMPONENT24:x===En?O=n.DEPTH_COMPONENT32F:x===kr&&(O=n.DEPTH_COMPONENT16),O}function b(A,x){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==Rt&&A.minFilter!==Ct?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){const x=A.target;x.removeEventListener("dispose",R),w(x),x.isVideoTexture&&d.delete(x),x.isHTMLTexture&&u.delete(x)}function v(A){const x=A.target;x.removeEventListener("dispose",v),P(x)}function w(A){const x=i.get(A);if(x.__webglInit===void 0)return;const O=A.source,k=p.get(O);if(k){const Y=k[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(A),Object.keys(k).length===0&&p.delete(O)}i.remove(A)}function C(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const O=A.source,k=p.get(O);delete k[x.__cacheKey],a.memory.textures--}function P(A){const x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(x.__webglFramebuffer[k]))for(let Y=0;Y<x.__webglFramebuffer[k].length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[k][Y]);else n.deleteFramebuffer(x.__webglFramebuffer[k]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[k])}else{if(Array.isArray(x.__webglFramebuffer))for(let k=0;k<x.__webglFramebuffer.length;k++)n.deleteFramebuffer(x.__webglFramebuffer[k]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let k=0;k<x.__webglColorRenderbuffer.length;k++)x.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[k]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=A.textures;for(let k=0,Y=O.length;k<Y;k++){const re=i.get(O[k]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(O[k])}i.remove(A)}let L=0;function z(){L=0}function G(){return L}function F(A){L=A}function X(){const A=L;return A>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function B(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function K(A,x){const O=i.get(A);if(A.isVideoTexture&&I(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const k=A.image;if(k===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{be(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function j(A,x){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){be(O,A,x);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function ne(A,x){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){be(O,A,x);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function ae(A,x){const O=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Ne(O,A,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const le={[Rn]:n.REPEAT,[Jn]:n.CLAMP_TO_EDGE,[Go]:n.MIRRORED_REPEAT},ke={[Rt]:n.NEAREST,[Bp]:n.NEAREST_MIPMAP_NEAREST,[as]:n.NEAREST_MIPMAP_LINEAR,[Ct]:n.LINEAR,[Ia]:n.LINEAR_MIPMAP_NEAREST,[jn]:n.LINEAR_MIPMAP_LINEAR},Ze={[Hp]:n.NEVER,[Yp]:n.ALWAYS,[Gp]:n.LESS,[Ql]:n.LEQUAL,[Wp]:n.EQUAL,[$l]:n.GEQUAL,[Xp]:n.GREATER,[qp]:n.NOTEQUAL};function ze(A,x){if(x.type===En&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ct||x.magFilter===Ia||x.magFilter===as||x.magFilter===jn||x.minFilter===Ct||x.minFilter===Ia||x.minFilter===as||x.minFilter===jn)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,le[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,le[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,le[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ke[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ke[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Ze[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Rt||x.minFilter!==as&&x.minFilter!==jn||x.type===En&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Z(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const k=x.source;let Y=p.get(k);Y===void 0&&(Y={},p.set(k,Y));const re=B(x);if(re!==A.__cacheKey){Y[re]===void 0&&(Y[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[re].usedTimes++;const de=Y[A.__cacheKey];de!==void 0&&(Y[A.__cacheKey].usedTimes--,de.usedTimes===0&&C(x)),A.__cacheKey=re,A.__webglTexture=Y[re].texture}return O}function ie(A,x,O){return Math.floor(Math.floor(A/O)/x)}function ee(A,x,O,k){const re=A.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,k,x.data);else{re.sort((Ae,ce)=>Ae.start-ce.start);let de=0;for(let Ae=1;Ae<re.length;Ae++){const ce=re[de],oe=re[Ae],Ee=ce.start+ce.count,De=ie(oe.start,x.width,4),Fe=ie(ce.start,x.width,4);oe.start<=Ee+1&&De===Fe&&ie(oe.start+oe.count-1,x.width,4)===De?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++de,re[de]=oe)}re.length=de+1;const J=t.getParameter(n.UNPACK_ROW_LENGTH),Q=t.getParameter(n.UNPACK_SKIP_PIXELS),he=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let Ae=0,ce=re.length;Ae<ce;Ae++){const oe=re[Ae],Ee=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),Fe=Ee%x.width,N=Math.floor(Ee/x.width),ue=De,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Fe,N,ue,$,O,k,x.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,J),t.pixelStorei(n.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(n.UNPACK_SKIP_ROWS,he)}}function be(A,x,O){let k=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(k=n.TEXTURE_3D);const Y=Z(A,x),re=x.source;t.bindTexture(k,A.__webglTexture,n.TEXTURE0+O);const de=i.get(re);if(re.version!==de.__version||Y===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=je.getPrimaries(je.workingColorSpace),fe=x.colorSpace===Zn?null:je.getPrimaries(x.colorSpace),xe=x.colorSpace===Zn||$===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let Q=m(x.image,!1,r.maxTextureSize);Q=Nt(x,Q);const he=s.convert(x.format,x.colorSpace),Ae=s.convert(x.type);let ce=M(x.internalFormat,he,Ae,x.normalized,x.colorSpace,x.isVideoTexture);ze(k,x);let oe;const Ee=x.mipmaps,De=x.isVideoTexture!==!0,Fe=de.__version===void 0||Y===!0,N=re.dataReady,ue=b(x,Q);if(x.isDepthTexture)ce=T(x.format===di,x.type),Fe&&(De?t.texStorage2D(n.TEXTURE_2D,1,ce,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,he,Ae,null));else if(x.isDataTexture)if(Ee.length>0){De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ce,Ee[0].width,Ee[0].height);for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,he,Ae,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,he,Ae,oe.data);x.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ce,Q.width,Q.height),N&&ee(x,Q,he,Ae)):t.texImage2D(n.TEXTURE_2D,0,ce,Q.width,Q.height,0,he,Ae,Q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ce,Ee[0].width,Ee[0].height,Q.depth);for(let $=0,fe=Ee.length;$<fe;$++)if(oe=Ee[$],x.format!==hn)if(he!==null)if(De){if(N)if(x.layerUpdates.size>0){const xe=Vd(oe.width,oe.height,x.format,x.type);for(const te of x.layerUpdates){const Ce=oe.data.subarray(te*xe/oe.data.BYTES_PER_ELEMENT,(te+1)*xe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,te,oe.width,oe.height,1,he,Ce)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,he,oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,oe.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,Q.depth,he,Ae,oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,Q.depth,0,he,Ae,oe.data)}else{De&&Fe&&t.texStorage2D(n.TEXTURE_2D,ue,ce,Ee[0].width,Ee[0].height);for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],x.format!==hn?he!==null?De?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,he,oe.data):t.compressedTexImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,oe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe.width,oe.height,he,Ae,oe.data):t.texImage2D(n.TEXTURE_2D,$,ce,oe.width,oe.height,0,he,Ae,oe.data)}else if(x.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,ce,Q.width,Q.height,Q.depth),N)if(x.layerUpdates.size>0){const $=Vd(Q.width,Q.height,x.format,x.type);for(const fe of x.layerUpdates){const xe=Q.data.subarray(fe*$/Q.data.BYTES_PER_ELEMENT,(fe+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,fe,Q.width,Q.height,1,he,Ae,xe)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,he,Ae,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ce,Q.width,Q.height,Q.depth,0,he,Ae,Q.data);else if(x.isData3DTexture)De?(Fe&&t.texStorage3D(n.TEXTURE_3D,ue,ce,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,he,Ae,Q.data)):t.texImage3D(n.TEXTURE_3D,0,ce,Q.width,Q.height,Q.depth,0,he,Ae,Q.data);else if(x.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(n.TEXTURE_2D,ue,ce,Q.width,Q.height);else{let $=Q.width,fe=Q.height;for(let xe=0;xe<ue;xe++)t.texImage2D(n.TEXTURE_2D,xe,ce,$,fe,0,he,Ae,null),$>>=1,fe>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),Q.parentNode!==$){$.appendChild(Q),u.add(x),$.onpaint=fe=>{const xe=fe.changedElements;for(const te of u)xe.includes(te.image)&&(te.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Q);else{const xe=n.RGBA,te=n.RGBA,Ce=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,xe,te,Ce,Q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(De&&Fe){const $=Xe(Ee[0]);t.texStorage2D(n.TEXTURE_2D,ue,ce,$.width,$.height)}for(let $=0,fe=Ee.length;$<fe;$++)oe=Ee[$],De?N&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,he,Ae,oe):t.texImage2D(n.TEXTURE_2D,$,ce,he,Ae,oe);x.generateMipmaps=!1}else if(De){if(Fe){const $=Xe(Q);t.texStorage2D(n.TEXTURE_2D,ue,ce,$.width,$.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he,Ae,Q)}else t.texImage2D(n.TEXTURE_2D,0,ce,he,Ae,Q);f(x)&&S(k),de.__version=re.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Ne(A,x,O){if(x.image.length!==6)return;const k=Z(A,x),Y=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);const re=i.get(Y);if(Y.version!==re.__version||k===!0){t.activeTexture(n.TEXTURE0+O);const de=je.getPrimaries(je.workingColorSpace),J=x.colorSpace===Zn?null:je.getPrimaries(x.colorSpace),Q=x.colorSpace===Zn||de===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const he=x.isCompressedTexture||x.image[0].isCompressedTexture,Ae=x.image[0]&&x.image[0].isDataTexture,ce=[];for(let te=0;te<6;te++)!he&&!Ae?ce[te]=m(x.image[te],!0,r.maxCubemapSize):ce[te]=Ae?x.image[te].image:x.image[te],ce[te]=Nt(x,ce[te]);const oe=ce[0],Ee=s.convert(x.format,x.colorSpace),De=s.convert(x.type),Fe=M(x.internalFormat,Ee,De,x.normalized,x.colorSpace),N=x.isVideoTexture!==!0,ue=re.__version===void 0||k===!0,$=Y.dataReady;let fe=b(x,oe);ze(n.TEXTURE_CUBE_MAP,x);let xe;if(he){N&&ue&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,oe.width,oe.height);for(let te=0;te<6;te++){xe=ce[te].mipmaps;for(let Ce=0;Ce<xe.length;Ce++){const Se=xe[Ce];x.format!==hn?Ee!==null?N?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Se.width,Se.height,Ee,Se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Fe,Se.width,Se.height,0,Se.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Se.width,Se.height,Ee,De,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Fe,Se.width,Se.height,0,Ee,De,Se.data)}}}else{if(xe=x.mipmaps,N&&ue){xe.length>0&&fe++;const te=Xe(ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Fe,te.width,te.height)}for(let te=0;te<6;te++)if(Ae){N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ce[te].width,ce[te].height,Ee,De,ce[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,ce[te].width,ce[te].height,0,Ee,De,ce[te].data);for(let Ce=0;Ce<xe.length;Ce++){const St=xe[Ce].image[te].image;N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,St.width,St.height,Ee,De,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Fe,St.width,St.height,0,Ee,De,St.data)}}else{N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ee,De,ce[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,Ee,De,ce[te]);for(let Ce=0;Ce<xe.length;Ce++){const Se=xe[Ce];N?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Ee,De,Se.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Fe,Ee,De,Se.image[te])}}}f(x)&&S(n.TEXTURE_CUBE_MAP),re.__version=Y.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ve(A,x,O,k,Y,re){const de=s.convert(O.format,O.colorSpace),J=s.convert(O.type),Q=M(O.internalFormat,de,J,O.normalized,O.colorSpace),he=i.get(x),Ae=i.get(O);if(Ae.__renderTarget=x,!he.__hasExternalTextures){const ce=Math.max(1,x.width>>re),oe=Math.max(1,x.height>>re);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,re,Q,ce,oe,x.depth,0,de,J,null):t.texImage2D(Y,re,Q,ce,oe,0,de,J,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),tt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,Y,Ae.__webglTexture,0,at(x)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,Y,Ae.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function dt(A,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const k=x.depthTexture,Y=k&&k.isDepthTexture?k.type:null,re=T(x.stencilBuffer,Y),de=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;tt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at(x),re,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,at(x),re,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,re,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,A)}else{const k=x.textures;for(let Y=0;Y<k.length;Y++){const re=k[Y],de=s.convert(re.format,re.colorSpace),J=s.convert(re.type),Q=M(re.internalFormat,de,J,re.normalized,re.colorSpace);tt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at(x),Q,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,at(x),Q,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Q,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function He(A,x,O){const k=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=i.get(x.depthTexture);if(Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),k){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ze(n.TEXTURE_CUBE_MAP,x.depthTexture);const he=s.convert(x.depthTexture.format),Ae=s.convert(x.depthTexture.type);let ce;x.depthTexture.format===$n?ce=n.DEPTH_COMPONENT24:x.depthTexture.format===di&&(ce=n.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,x.width,x.height,0,he,Ae,null)}}else K(x.depthTexture,0);const re=Y.__webglTexture,de=at(x),J=k?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,Q=x.depthTexture.format===di?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===$n)tt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,J,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,J,re,0);else if(x.depthTexture.format===di)tt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,J,re,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,Q,J,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(A){const x=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const k=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),k){const Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,k.removeEventListener("dispose",Y)};k.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=k}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let k=0;k<6;k++)He(x.__webglFramebuffer[k],A,k);else{const k=A.texture.mipmaps;k&&k.length>0?He(x.__webglFramebuffer[0],A,0):He(x.__webglFramebuffer,A,0)}else if(O){x.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[k]),x.__webglDepthbuffer[k]===void 0)x.__webglDepthbuffer[k]=n.createRenderbuffer(),dt(x.__webglDepthbuffer[k],A,!1);else{const Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=x.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}else{const k=A.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),dt(x.__webglDepthbuffer,A,!1);else{const Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(A,x,O){const k=i.get(A);x!==void 0&&ve(k.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&et(A)}function we(A){const x=A.texture,O=i.get(A),k=i.get(x);A.addEventListener("dispose",v);const Y=A.textures,re=A.isWebGLCubeRenderTarget===!0,de=Y.length>1;if(de||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=x.version,a.memory.textures++),re){O.__webglFramebuffer=[];for(let J=0;J<6;J++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[J]=[];for(let Q=0;Q<x.mipmaps.length;Q++)O.__webglFramebuffer[J][Q]=n.createFramebuffer()}else O.__webglFramebuffer[J]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let J=0;J<x.mipmaps.length;J++)O.__webglFramebuffer[J]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(de)for(let J=0,Q=Y.length;J<Q;J++){const he=i.get(Y[J]);he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&tt(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let J=0;J<Y.length;J++){const Q=Y[J];O.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[J]);const he=s.convert(Q.format,Q.colorSpace),Ae=s.convert(Q.type),ce=M(Q.internalFormat,he,Ae,Q.normalized,Q.colorSpace,A.isXRRenderTarget===!0),oe=at(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,ce,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,O.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),dt(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),ze(n.TEXTURE_CUBE_MAP,x);for(let J=0;J<6;J++)if(x.mipmaps&&x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)ve(O.__webglFramebuffer[J][Q],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Q);else ve(O.__webglFramebuffer[J],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);f(x)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let J=0,Q=Y.length;J<Q;J++){const he=Y[J],Ae=i.get(he);let ce=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ce=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,Ae.__webglTexture),ze(ce,he),ve(O.__webglFramebuffer,A,he,n.COLOR_ATTACHMENT0+J,ce,0),f(he)&&S(ce)}t.unbindTexture()}else{let J=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(J,k.__webglTexture),ze(J,x),x.mipmaps&&x.mipmaps.length>0)for(let Q=0;Q<x.mipmaps.length;Q++)ve(O.__webglFramebuffer[Q],A,x,n.COLOR_ATTACHMENT0,J,Q);else ve(O.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,J,0);f(x)&&S(J),t.unbindTexture()}A.depthBuffer&&et(A)}function Re(A){const x=A.textures;for(let O=0,k=x.length;O<k;O++){const Y=x[O];if(f(Y)){const re=E(A),de=i.get(Y).__webglTexture;t.bindTexture(re,de),S(re),t.unbindTexture()}}}const st=[],We=[];function Ve(A){if(A.samples>0){if(tt(A)===!1){const x=A.textures,O=A.width,k=A.height;let Y=n.COLOR_BUFFER_BIT;const re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(A),J=x.length>1;if(J)for(let he=0;he<x.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const Q=A.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let he=0;he<x.length;he++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),J){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[he]);const Ae=i.get(x[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ae,0)}n.blitFramebuffer(0,0,O,k,0,0,O,k,Y,n.NEAREST),l===!0&&(st.length=0,We.length=0,st.push(n.COLOR_ATTACHMENT0+he),A.depthBuffer&&A.resolveDepthBuffer===!1&&(st.push(re),We.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,We)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),J)for(let he=0;he<x.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,de.__webglColorRenderbuffer[he]);const Ae=i.get(x[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,Ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function at(A){return Math.min(r.maxSamples,A.samples)}function tt(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function I(A){const x=a.render.frame;d.get(A)!==x&&(d.set(A,x),A.update())}function Nt(A,x){const O=A.colorSpace,k=A.format,Y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Hr&&O!==Zn&&(je.getTransfer(O)===ot?(k!==hn||Y!==en)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",O)),x}function Xe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=z,this.getTextureUnits=G,this.setTextureUnits=F,this.setTexture2D=K,this.setTexture2DArray=j,this.setTexture3D=ne,this.setTextureCube=ae,this.rebindTextures=se,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Vv(n,e){function t(i,r=Zn){let s;const a=je.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===ql)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===su)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===au)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===iu)return n.BYTE;if(i===ru)return n.SHORT;if(i===kr)return n.UNSIGNED_SHORT;if(i===Xl)return n.INT;if(i===Vn)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===Xt)return n.HALF_FLOAT;if(i===ou)return n.ALPHA;if(i===lu)return n.RGB;if(i===hn)return n.RGBA;if(i===$n)return n.DEPTH_COMPONENT;if(i===di)return n.DEPTH_STENCIL;if(i===Kl)return n.RED;if(i===Zl)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===Jl)return n.RG_INTEGER;if(i===jl)return n.RGBA_INTEGER;if(i===js||i===Qs||i===$s||i===ea)if(a===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===js)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===js)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$s)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ea)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wo||i===Xo||i===qo||i===Yo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ko||i===Zo||i===Jo||i===jo||i===Qo||i===da||i===$o)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ko||i===Zo)return a===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Jo)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===jo)return s.COMPRESSED_R11_EAC;if(i===Qo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===da)return s.COMPRESSED_RG11_EAC;if(i===$o)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===el||i===tl||i===nl||i===il||i===rl||i===sl||i===al||i===ol||i===ll||i===cl||i===dl||i===hl||i===ul||i===fl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===el)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===tl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===nl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===il)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===rl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===al)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ll)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===cl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===dl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===hl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ul)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fl)return a===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pl||i===ml||i===gl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===pl)return a===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ml)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xl||i===vl||i===ha||i===_l)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===xl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_l)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gv=`
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

}`;class Wv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new vu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vt({vertexShader:Hv,fragmentShader:Gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ye(new Qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xv extends Ii{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Wv,f={},S=t.getContextAttributes();let E=null,M=null;const T=[],b=[],R=new Pe;let v=null;const w=new mn;w.viewport=new Mt;const C=new mn;C.viewport=new Mt;const P=[w,C],L=new $m;let z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ie=T[Z];return ie===void 0&&(ie=new Ba,T[Z]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Z){let ie=T[Z];return ie===void 0&&(ie=new Ba,T[Z]=ie),ie.getGripSpace()},this.getHand=function(Z){let ie=T[Z];return ie===void 0&&(ie=new Ba,T[Z]=ie),ie.getHandSpace()};function F(Z){const ie=b.indexOf(Z.inputSource);if(ie===-1)return;const ee=T[ie];ee!==void 0&&(ee.update(Z.inputSource,Z.frame,c||a),ee.dispatchEvent({type:Z.type,data:Z.inputSource}))}function X(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",B);for(let Z=0;Z<T.length;Z++){const ie=b[Z];ie!==null&&(b[Z]=null,T[Z].disconnect(ie))}z=null,G=null,m.reset();for(const Z in f)delete f[Z];e.setRenderTarget(E),p=null,h=null,u=null,r=null,M=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",X),r.addEventListener("inputsourceschange",B),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,be=null,Ne=null;S.depth&&(Ne=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=S.stencil?di:$n,be=S.stencil?hr:Vn);const ve={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};u=this.getBinding(),h=u.createProjectionLayer(ve),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Ot(h.textureWidth,h.textureHeight,{format:hn,type:en,depthTexture:new Ri(h.textureWidth,h.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ee={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Ot(p.framebufferWidth,p.framebufferHeight,{format:hn,type:en,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(Z){for(let ie=0;ie<Z.removed.length;ie++){const ee=Z.removed[ie],be=b.indexOf(ee);be>=0&&(b[be]=null,T[be].disconnect(ee))}for(let ie=0;ie<Z.added.length;ie++){const ee=Z.added[ie];let be=b.indexOf(ee);if(be===-1){for(let ve=0;ve<T.length;ve++)if(ve>=b.length){b.push(ee),be=ve;break}else if(b[ve]===null){b[ve]=ee,be=ve;break}if(be===-1)break}const Ne=T[be];Ne&&Ne.connect(ee)}}const K=new D,j=new D;function ne(Z,ie,ee){K.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const be=K.distanceTo(j),Ne=ie.projectionMatrix.elements,ve=ee.projectionMatrix.elements,dt=Ne[14]/(Ne[10]-1),He=Ne[14]/(Ne[10]+1),et=(Ne[9]+1)/Ne[5],se=(Ne[9]-1)/Ne[5],we=(Ne[8]-1)/Ne[0],Re=(ve[8]+1)/ve[0],st=dt*we,We=dt*Re,Ve=be/(-we+Re),at=Ve*-we;if(ie.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(at),Z.translateZ(Ve),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ne[10]===-1)Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const tt=dt+Ve,I=He+Ve,Nt=st-at,Xe=We+(be-at),A=et*He/I*tt,x=se*He/I*tt;Z.projectionMatrix.makePerspective(Nt,Xe,A,x,tt,I),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ae(Z,ie){ie===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ie.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let ie=Z.near,ee=Z.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),L.near=C.near=w.near=ie,L.far=C.far=w.far=ee,(z!==L.near||G!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,G=L.far),L.layers.mask=Z.layers.mask|6,w.layers.mask=L.layers.mask&-5,C.layers.mask=L.layers.mask&-3;const be=Z.parent,Ne=L.cameras;ae(L,be);for(let ve=0;ve<Ne.length;ve++)ae(Ne[ve],be);Ne.length===2?ne(L,w,C):L.projectionMatrix.copy(w.projectionMatrix),le(Z,L,be)};function le(Z,ie,ee){ee===null?Z.matrix.copy(ie.matrixWorld):(Z.matrix.copy(ee.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ie.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Xr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(Z){return f[Z]};let ke=null;function Ze(Z,ie){if(d=ie.getViewerPose(c||a),g=ie,d!==null){const ee=d.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let be=!1;ee.length!==L.cameras.length&&(L.cameras.length=0,be=!0);for(let He=0;He<ee.length;He++){const et=ee[He];let se=null;if(p!==null)se=p.getViewport(et);else{const Re=u.getViewSubImage(h,et);se=Re.viewport,He===0&&(e.setRenderTargetTextures(M,Re.colorTexture,Re.depthStencilTexture),e.setRenderTarget(M))}let we=P[He];we===void 0&&(we=new mn,we.layers.enable(He),we.viewport=new Mt,P[He]=we),we.matrix.fromArray(et.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(et.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(se.x,se.y,se.width,se.height),He===0&&(L.matrix.copy(we.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),be===!0&&L.cameras.push(we)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const He=u.getDepthInformation(ee[0]);He&&He.isValid&&He.texture&&m.init(He,r.renderState)}if(Ne&&Ne.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let He=0;He<ee.length;He++){const et=ee[He].camera;if(et){let se=f[et];se||(se=new vu,f[et]=se);const we=u.getCameraImage(et);se.sourceTexture=we}}}}for(let ee=0;ee<T.length;ee++){const be=b[ee],Ne=T[ee];be!==null&&Ne!==void 0&&Ne.update(be,ie,c||a)}ke&&ke(Z,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const ze=new bu;ze.setAnimationLoop(Ze),this.setAnimationLoop=function(Z){ke=Z},this.dispose=function(){}}}const qv=new rt,Pu=new Be;Pu.set(-1,0,0,0,1,0,0,0,1);function Yv(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,_u(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,S,E,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===rn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===rn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),E=S.envMap,M=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pu),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===rn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Kv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const b=T.program;i.uniformBlockBinding(M,b)}function c(M,T){let b=r[M.id];b===void 0&&(m(M),b=d(M),r[M.id]=b,M.addEventListener("dispose",S));const R=T.program;i.updateUBOMapping(M,R);const v=e.render.frame;s[M.id]!==v&&(h(M),s[M.id]=v)}function d(M){const T=u();M.__bindingPointIndex=T;const b=n.createBuffer(),R=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,b),b}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const T=r[M.id],b=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let v=0,w=b.length;v<w;v++){const C=b[v];if(Array.isArray(C))for(let P=0,L=C.length;P<L;P++)p(C[P],v,P,R);else p(C,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,T,b,R){if(_(M,T,b,R)===!0){const v=M.__offset,w=M.value;if(Array.isArray(w)){let C=0;for(let P=0;P<w.length;P++){const L=w[P],z=f(L);g(L,M.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function g(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function _(M,T,b,R){const v=M.value,w=T+"_"+b;if(R[w]===void 0)return typeof v=="number"||typeof v=="boolean"?R[w]=v:ArrayBuffer.isView(v)?R[w]=v.slice():R[w]=v.clone(),!0;{const C=R[w];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return R[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function m(M){const T=M.uniforms;let b=0;const R=16;for(let w=0,C=T.length;w<C;w++){const P=Array.isArray(T[w])?T[w]:[T[w]];for(let L=0,z=P.length;L<z;L++){const G=P[L],F=Array.isArray(G.value)?G.value:[G.value];for(let X=0,B=F.length;X<B;X++){const K=F[X],j=f(K),ne=b%R,ae=ne%j.boundary,le=ne+ae;b+=ae,le!==0&&R-le<j.storage&&(b+=R-le),G.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=b,b+=j.storage}}}const v=b%R;return v>0&&(b+=R-v),M.__size=b,M.__cache={},this}function f(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",M),T}function S(M){const T=M.target;T.removeEventListener("dispose",S);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function E(){for(const M in r)n.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:E}}const Zv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Nn=null;function Jv(){return Nn===null&&(Nn=new jr(Zv,16,16,Ai,Xt),Nn.name="DFG_LUT",Nn.minFilter=Ct,Nn.magFilter=Ct,Nn.wrapS=Jn,Nn.wrapT=Jn,Nn.generateMipmaps=!1,Nn.needsUpdate=!0),Nn}class jv{constructor(e={}){const{canvas:t=Zp(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:p=en}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const _=p,m=new Set([jl,Jl,Zl]),f=new Set([en,Vn,kr,hr,ql,Yl]),S=new Uint32Array(4),E=new Int32Array(4),M=new D;let T=null,b=null;const R=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,L=null,z=null,G=null,F=null;this._outputColorSpace=Gt;let X=0,B=0,K=null,j=-1,ne=null;const ae=new Mt,le=new Mt;let ke=null;const Ze=new Ue(0);let ze=0,Z=t.width,ie=t.height,ee=1,be=null,Ne=null;const ve=new Mt(0,0,Z,ie),dt=new Mt(0,0,Z,ie);let He=!1;const et=new ic;let se=!1,we=!1;const Re=new rt,st=new D,We=new Mt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function tt(){return K===null?ee:1}let I=i;function Nt(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fl}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Pn,!1),I===null){const U="webgl2";if(I=Nt(U,y),I===null)throw Nt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw it("WebGLRenderer: "+y.message),y}let Xe,A,x,O,k,Y,re,de,J,Q,he,Ae,ce,oe,Ee,De,Fe,N,ue,$,fe,xe,te;function Ce(){Xe=new Jx(I),Xe.init(),fe=new Vv(I,Xe),A=new Hx(I,Xe,e,fe),x=new Bv(I,Xe),A.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),z=I.createFramebuffer(),G=I.createFramebuffer(),F=I.createFramebuffer(),O=new $x(I),k=new Tv,Y=new kv(I,Xe,x,k,A,fe,O),re=new Zx(C),de=new i0(I),xe=new kx(I,de),J=new jx(I,de,O,xe),Q=new t1(I,J,de,xe,O),N=new e1(I,A,Y),Ee=new Gx(k),he=new Ev(C,re,Xe,A,xe,Ee),Ae=new Yv(C,k),ce=new Av,oe=new Iv(Xe),Fe=new Bx(C,re,x,Q,g,l),De=new zv(C,Q,A),te=new Kv(I,O,A,x),ue=new Vx(I,Xe,O),$=new Qx(I,Xe,O),O.programs=he.programs,C.capabilities=A,C.extensions=Xe,C.properties=k,C.renderLists=ce,C.shadowMap=De,C.state=x,C.info=O}Ce(),_!==en&&(w=new i1(_,t.width,t.height,o,r,s));const Se=new Xv(C,I);this.xr=Se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const y=Xe.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Xe.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(y){y!==void 0&&(ee=y,this.setSize(Z,ie,!1))},this.getSize=function(y){return y.set(Z,ie)},this.setSize=function(y,U,W=!0){if(Se.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=y,ie=U,t.width=Math.floor(y*ee),t.height=Math.floor(U*ee),W===!0&&(t.style.width=y+"px",t.style.height=U+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(Z*ee,ie*ee).floor()},this.setDrawingBufferSize=function(y,U,W){Z=y,ie=U,ee=W,t.width=Math.floor(y*W),t.height=Math.floor(U*W),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(_===en){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ae)},this.getViewport=function(y){return y.copy(ve)},this.setViewport=function(y,U,W,V){y.isVector4?ve.set(y.x,y.y,y.z,y.w):ve.set(y,U,W,V),x.viewport(ae.copy(ve).multiplyScalar(ee).round())},this.getScissor=function(y){return y.copy(dt)},this.setScissor=function(y,U,W,V){y.isVector4?dt.set(y.x,y.y,y.z,y.w):dt.set(y,U,W,V),x.scissor(le.copy(dt).multiplyScalar(ee).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(y){x.setScissorTest(He=y)},this.setOpaqueSort=function(y){be=y},this.setTransparentSort=function(y){Ne=y},this.getClearColor=function(y){return y.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,W=!0){let V=0;if(y){let H=!1;if(K!==null){const ge=K.texture.format;H=m.has(ge)}if(H){const ge=K.texture.type,ye=f.has(ge),me=Fe.getClearColor(),Te=Fe.getClearAlpha(),Le=me.r,Ge=me.g,Ke=me.b;ye?(S[0]=Le,S[1]=Ge,S[2]=Ke,S[3]=Te,I.clearBufferuiv(I.COLOR,0,S)):(E[0]=Le,E[1]=Ge,E[2]=Ke,E[3]=Te,I.clearBufferiv(I.COLOR,0,E))}else V|=I.COLOR_BUFFER_BIT}U&&(V|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),L=y},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),Fe.dispose(),ce.dispose(),oe.dispose(),k.dispose(),re.dispose(),Q.dispose(),xe.dispose(),te.dispose(),he.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Lc),Se.removeEventListener("sessionend",Dc),mi.stop()};function St(y){y.preventDefault(),cd("WebGLRenderer: Context Lost."),P=!0}function ft(){cd("WebGLRenderer: Context Restored."),P=!1;const y=O.autoReset,U=De.enabled,W=De.autoUpdate,V=De.needsUpdate,H=De.type;Ce(),O.autoReset=y,De.enabled=U,De.autoUpdate=W,De.needsUpdate=V,De.type=H}function Pn(y){it("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ln(y){const U=y.target;U.removeEventListener("dispose",Ln),rf(U)}function rf(y){sf(y),k.remove(y)}function sf(y){const U=k.get(y).programs;U!==void 0&&(U.forEach(function(W){he.releaseProgram(W)}),y.isShaderMaterial&&he.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,W,V,H,ge){U===null&&(U=Ve);const ye=H.isMesh&&H.matrixWorld.determinantAffine()<0,me=lf(y,U,W,V,H);x.setMaterial(V,ye);let Te=W.index,Le=1;if(V.wireframe===!0){if(Te=J.getWireframeAttribute(W),Te===void 0)return;Le=2}const Ge=W.drawRange,Ke=W.attributes.position;let Ie=Ge.start*Le,ct=(Ge.start+Ge.count)*Le;ge!==null&&(Ie=Math.max(Ie,ge.start*Le),ct=Math.min(ct,(ge.start+ge.count)*Le)),Te!==null?(Ie=Math.max(Ie,0),ct=Math.min(ct,Te.count)):Ke!=null&&(Ie=Math.max(Ie,0),ct=Math.min(ct,Ke.count));const Tt=ct-Ie;if(Tt<0||Tt===1/0)return;xe.setup(H,V,me,W,Te);let bt,ht=ue;if(Te!==null&&(bt=de.get(Te),ht=$,ht.setIndex(bt)),H.isMesh)V.wireframe===!0?(x.setLineWidth(V.wireframeLinewidth*tt()),ht.setMode(I.LINES)):ht.setMode(I.TRIANGLES);else if(H.isLine){let Kt=V.linewidth;Kt===void 0&&(Kt=1),x.setLineWidth(Kt*tt()),H.isLineSegments?ht.setMode(I.LINES):H.isLineLoop?ht.setMode(I.LINE_LOOP):ht.setMode(I.LINE_STRIP)}else H.isPoints?ht.setMode(I.POINTS):H.isSprite&&ht.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))ht.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Kt=H._multiDrawStarts,Me=H._multiDrawCounts,on=H._multiDrawCount,nt=Te?de.get(Te).bytesPerElement:1,un=k.get(V).currentProgram.getUniforms();for(let Dn=0;Dn<on;Dn++)un.setValue(I,"_gl_DrawID",Dn),ht.render(Kt[Dn]/nt,Me[Dn])}else if(H.isInstancedMesh)ht.renderInstances(Ie,Tt,H.count);else if(W.isInstancedBufferGeometry){const Kt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Me=Math.min(W.instanceCount,Kt);ht.renderInstances(Ie,Tt,Me)}else ht.render(Ie,Tt)};function Pc(y,U,W){y.transparent===!0&&y.side===sn&&y.forceSinglePass===!1?(y.side=rn,y.needsUpdate=!0,rs(y,U,W),y.side=ui,y.needsUpdate=!0,rs(y,U,W),y.side=sn):rs(y,U,W)}this.compile=function(y,U,W=null){W===null&&(W=y),b=oe.get(W),b.init(U),v.push(b),W.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),y!==W&&y.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),b.setupLights();const V=new Set;return y.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ge=H.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){const me=ge[ye];Pc(me,W,H),V.add(me)}else Pc(ge,W,H),V.add(ge)}),b=v.pop(),V},this.compileAsync=function(y,U,W=null){const V=this.compile(y,U,W);return new Promise(H=>{function ge(){if(V.forEach(function(ye){k.get(ye).currentProgram.isReady()&&V.delete(ye)}),V.size===0){H(y);return}setTimeout(ge,10)}Xe.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Aa=null;function af(y){Aa&&Aa(y)}function Lc(){mi.stop()}function Dc(){mi.start()}const mi=new bu;mi.setAnimationLoop(af),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(y){Aa=y,Se.setAnimationLoop(y),y===null?mi.stop():mi.start()},Se.addEventListener("sessionstart",Lc),Se.addEventListener("sessionend",Dc),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(y,U);const W=Se.enabled===!0&&Se.isPresenting===!0,V=w!==null&&(K===null||W)&&w.begin(C,K);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(U),U=Se.getCamera()),y.isScene===!0&&y.onBeforeRender(C,y,U,K),b=oe.get(y,v.length),b.init(U),b.state.textureUnits=Y.getTextureUnits(),v.push(b),Re.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),et.setFromProjectionMatrix(Re,zn,U.reversedDepth),we=this.localClippingEnabled,se=Ee.init(this.clippingPlanes,we),T=ce.get(y,R.length),T.init(),R.push(T),Se.enabled===!0&&Se.isPresenting===!0){const ye=C.xr.getDepthSensingMesh();ye!==null&&Ra(ye,U,-1/0,C.sortObjects)}Ra(y,U,0,C.sortObjects),T.finish(),C.sortObjects===!0&&T.sort(be,Ne,U.reversedDepth),at=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,at&&Fe.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Ee.beginShadows();const H=b.state.shadowsArray;if(De.render(H,y,U),se===!0&&Ee.endShadows(),(V&&w.hasRenderPass())===!1){const ye=T.opaque,me=T.transmissive;if(b.setupLights(),U.isArrayCamera){const Te=U.cameras;if(me.length>0)for(let Le=0,Ge=Te.length;Le<Ge;Le++){const Ke=Te[Le];Nc(ye,me,y,Ke)}at&&Fe.render(y);for(let Le=0,Ge=Te.length;Le<Ge;Le++){const Ke=Te[Le];Ic(T,y,Ke,Ke.viewport)}}else me.length>0&&Nc(ye,me,y,U),at&&Fe.render(y),Ic(T,y,U)}K!==null&&B===0&&(Y.updateMultisampleRenderTarget(K),Y.updateRenderTargetMipmap(K)),V&&w.end(C),y.isScene===!0&&y.onAfterRender(C,y,U),xe.resetDefaultState(),j=-1,ne=null,v.pop(),v.length>0?(b=v[v.length-1],Y.setTextureUnits(b.state.textureUnits),se===!0&&Ee.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,L!==null&&L.renderEnd()};function Ra(y,U,W,V){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)W=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||et.intersectsSprite(y)){V&&We.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Re);const ye=Q.update(y),me=y.material;me.visible&&T.push(y,ye,me,W,We.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||et.intersectsObject(y))){const ye=Q.update(y),me=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),We.copy(y.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),We.copy(ye.boundingSphere.center)),We.applyMatrix4(y.matrixWorld).applyMatrix4(Re)),Array.isArray(me)){const Te=ye.groups;for(let Le=0,Ge=Te.length;Le<Ge;Le++){const Ke=Te[Le],Ie=me[Ke.materialIndex];Ie&&Ie.visible&&T.push(y,ye,Ie,W,We.z,Ke)}}else me.visible&&T.push(y,ye,me,W,We.z,null)}}const ge=y.children;for(let ye=0,me=ge.length;ye<me;ye++)Ra(ge[ye],U,W,V)}function Ic(y,U,W,V){const{opaque:H,transmissive:ge,transparent:ye}=y;b.setupLightsView(W),se===!0&&Ee.setGlobalState(C.clippingPlanes,W),V&&x.viewport(ae.copy(V)),H.length>0&&is(H,U,W),ge.length>0&&is(ge,U,W),ye.length>0&&is(ye,U,W),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Nc(y,U,W,V){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[V.id]===void 0){const Ie=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[V.id]=new Ot(1,1,{generateMipmaps:!0,type:Ie?Xt:en,minFilter:jn,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const ge=b.state.transmissionRenderTarget[V.id],ye=V.viewport||ae;ge.setSize(ye.z*C.transmissionResolutionScale,ye.w*C.transmissionResolutionScale);const me=C.getRenderTarget(),Te=C.getActiveCubeFace(),Le=C.getActiveMipmapLevel();C.setRenderTarget(ge),C.getClearColor(Ze),ze=C.getClearAlpha(),ze<1&&C.setClearColor(16777215,.5),C.clear(),at&&Fe.render(W);const Ge=C.toneMapping;C.toneMapping=Bn;const Ke=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),b.setupLightsView(V),se===!0&&Ee.setGlobalState(C.clippingPlanes,V),is(y,W,V),Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ct=0,Tt=U.length;ct<Tt;ct++){const bt=U[ct],{object:ht,geometry:Kt,material:Me,group:on}=bt;if(Me.side===sn&&ht.layers.test(V.layers)){const nt=Me.side;Me.side=rn,Me.needsUpdate=!0,Uc(ht,W,V,Kt,Me,on),Me.side=nt,Me.needsUpdate=!0,Ie=!0}}Ie===!0&&(Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge))}C.setRenderTarget(me,Te,Le),C.setClearColor(Ze,ze),Ke!==void 0&&(V.viewport=Ke),C.toneMapping=Ge}function is(y,U,W){const V=U.isScene===!0?U.overrideMaterial:null;for(let H=0,ge=y.length;H<ge;H++){const ye=y[H],{object:me,geometry:Te,group:Le}=ye;let Ge=ye.material;Ge.allowOverride===!0&&V!==null&&(Ge=V),me.layers.test(W.layers)&&Uc(me,U,W,Te,Ge,Le)}}function Uc(y,U,W,V,H,ge){y.onBeforeRender(C,U,W,V,H,ge),y.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),H.onBeforeRender(C,U,W,V,y,ge),H.transparent===!0&&H.side===sn&&H.forceSinglePass===!1?(H.side=rn,H.needsUpdate=!0,C.renderBufferDirect(W,U,V,H,y,ge),H.side=ui,H.needsUpdate=!0,C.renderBufferDirect(W,U,V,H,y,ge),H.side=sn):C.renderBufferDirect(W,U,V,H,y,ge),y.onAfterRender(C,U,W,V,H,ge)}function rs(y,U,W){U.isScene!==!0&&(U=Ve);const V=k.get(y),H=b.state.lights,ge=b.state.shadowsArray,ye=H.state.version,me=he.getParameters(y,H.state,ge,U,W,b.state.lightProbeGridArray),Te=he.getProgramCacheKey(me);let Le=V.programs;V.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;const Ge=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;V.envMap=re.get(y.envMap||V.environment,Ge),V.envMapRotation=V.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Le===void 0&&(y.addEventListener("dispose",Ln),Le=new Map,V.programs=Le);let Ke=Le.get(Te);if(Ke!==void 0){if(V.currentProgram===Ke&&V.lightsStateVersion===ye)return Fc(y,me),Ke}else me.uniforms=he.getUniforms(y),L!==null&&y.isNodeMaterial&&L.build(y,W,me),y.onBeforeCompile(me,C),Ke=he.acquireProgram(me,Te),Le.set(Te,Ke),V.uniforms=me.uniforms;const Ie=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=Ee.uniform),Fc(y,me),V.needsLights=df(y),V.lightsStateVersion=ye,V.needsLights&&(Ie.ambientLightColor.value=H.state.ambient,Ie.lightProbe.value=H.state.probe,Ie.directionalLights.value=H.state.directional,Ie.directionalLightShadows.value=H.state.directionalShadow,Ie.spotLights.value=H.state.spot,Ie.spotLightShadows.value=H.state.spotShadow,Ie.rectAreaLights.value=H.state.rectArea,Ie.ltc_1.value=H.state.rectAreaLTC1,Ie.ltc_2.value=H.state.rectAreaLTC2,Ie.pointLights.value=H.state.point,Ie.pointLightShadows.value=H.state.pointShadow,Ie.hemisphereLights.value=H.state.hemi,Ie.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ie.spotLightMatrix.value=H.state.spotLightMatrix,Ie.spotLightMap.value=H.state.spotLightMap,Ie.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=b.state.lightProbeGridArray.length>0,V.currentProgram=Ke,V.uniformsList=null,Ke}function Oc(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=ta.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Fc(y,U){const W=k.get(y);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function of(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(U.matrixWorld);for(let W=0,V=y.length;W<V;W++){const H=y[W];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function lf(y,U,W,V,H){U.isScene!==!0&&(U=Ve),Y.resetTextureUnits();const ge=U.fog,ye=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,me=K===null?C.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:je.workingColorSpace,Te=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Le=re.get(V.envMap||ye,Te),Ge=V.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ke=!!W.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!W.morphAttributes.position,ct=!!W.morphAttributes.normal,Tt=!!W.morphAttributes.color;let bt=Bn;V.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(bt=C.toneMapping);const ht=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Kt=ht!==void 0?ht.length:0,Me=k.get(V),on=b.state.lights;if(se===!0&&(we===!0||y!==ne)){const pt=y===ne&&V.id===j;Ee.setState(V,y,pt)}let nt=!1;V.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==on.state.version||Me.outputColorSpace!==me||H.isBatchedMesh&&Me.batching===!1||!H.isBatchedMesh&&Me.batching===!0||H.isBatchedMesh&&Me.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Me.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Me.instancing===!1||!H.isInstancedMesh&&Me.instancing===!0||H.isSkinnedMesh&&Me.skinning===!1||!H.isSkinnedMesh&&Me.skinning===!0||H.isInstancedMesh&&Me.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Me.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Me.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Me.instancingMorph===!1&&H.morphTexture!==null||Me.envMap!==Le||V.fog===!0&&Me.fog!==ge||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Ee.numPlanes||Me.numIntersection!==Ee.numIntersection)||Me.vertexAlphas!==Ge||Me.vertexTangents!==Ke||Me.morphTargets!==Ie||Me.morphNormals!==ct||Me.morphColors!==Tt||Me.toneMapping!==bt||Me.morphTargetsCount!==Kt||!!Me.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Me.__version=V.version);let un=Me.currentProgram;nt===!0&&(un=rs(V,U,H),L&&V.isNodeMaterial&&L.onUpdateProgram(V,un,Me));let Dn=!1,ei=!1,Ui=!1;const ut=un.getUniforms(),wt=Me.uniforms;if(x.useProgram(un.program)&&(Dn=!0,ei=!0,Ui=!0),V.id!==j&&(j=V.id,ei=!0),Me.needsLights){const pt=of(b.state.lightProbeGridArray,H);Me.lightProbeGrid!==pt&&(Me.lightProbeGrid=pt,ei=!0)}if(Dn||ne!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ut.setValue(I,"projectionMatrix",y.projectionMatrix),ut.setValue(I,"viewMatrix",y.matrixWorldInverse);const ni=ut.map.cameraPosition;ni!==void 0&&ni.setValue(I,st.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ut.setValue(I,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ut.setValue(I,"isOrthographic",y.isOrthographicCamera===!0),ne!==y&&(ne=y,ei=!0,Ui=!0)}if(Me.needsLights&&(on.state.directionalShadowMap.length>0&&ut.setValue(I,"directionalShadowMap",on.state.directionalShadowMap,Y),on.state.spotShadowMap.length>0&&ut.setValue(I,"spotShadowMap",on.state.spotShadowMap,Y),on.state.pointShadowMap.length>0&&ut.setValue(I,"pointShadowMap",on.state.pointShadowMap,Y)),H.isSkinnedMesh){ut.setOptional(I,H,"bindMatrix"),ut.setOptional(I,H,"bindMatrixInverse");const pt=H.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ut.setValue(I,"boneTexture",pt.boneTexture,Y))}H.isBatchedMesh&&(ut.setOptional(I,H,"batchingTexture"),ut.setValue(I,"batchingTexture",H._matricesTexture,Y),ut.setOptional(I,H,"batchingIdTexture"),ut.setValue(I,"batchingIdTexture",H._indirectTexture,Y),ut.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&ut.setValue(I,"batchingColorTexture",H._colorsTexture,Y));const ti=W.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&N.update(H,W,un),(ei||Me.receiveShadow!==H.receiveShadow)&&(Me.receiveShadow=H.receiveShadow,ut.setValue(I,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(wt.envMapIntensity.value=U.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=Jv()),ei){if(ut.setValue(I,"toneMappingExposure",C.toneMappingExposure),Me.needsLights&&cf(wt,Ui),ge&&V.fog===!0&&Ae.refreshFogUniforms(wt,ge),Ae.refreshMaterialUniforms(wt,V,ee,ie,b.state.transmissionRenderTarget[y.id]),Me.needsLights&&Me.lightProbeGrid){const pt=Me.lightProbeGrid;wt.probesSH.value=pt.texture,wt.probesMin.value.copy(pt.boundingBox.min),wt.probesMax.value.copy(pt.boundingBox.max),wt.probesResolution.value.copy(pt.resolution)}ta.upload(I,Oc(Me),wt,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ta.upload(I,Oc(Me),wt,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ut.setValue(I,"center",H.center),ut.setValue(I,"modelViewMatrix",H.modelViewMatrix),ut.setValue(I,"normalMatrix",H.normalMatrix),ut.setValue(I,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const pt=V.uniformsGroups;for(let ni=0,Oi=pt.length;ni<Oi;ni++){const zc=pt[ni];te.update(zc,un),te.bind(zc,un)}}return un}function cf(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function df(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(y,U,W){const V=k.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),k.get(y.texture).__webglTexture=U,k.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:W,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const W=k.get(y);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,W=0){K=y,X=U,B=W;let V=null,H=!1,ge=!1;if(y){const me=k.get(y);if(me.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),ae.copy(y.viewport),le.copy(y.scissor),ke=y.scissorTest,x.viewport(ae),x.scissor(le),x.setScissorTest(ke),j=-1;return}else if(me.__webglFramebuffer===void 0)Y.setupRenderTarget(y);else if(me.__hasExternalTextures)Y.rebindTextures(y,k.get(y.texture).__webglTexture,k.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ge=y.depthTexture;if(me.__boundDepthTexture!==Ge){if(Ge!==null&&k.has(Ge)&&(y.width!==Ge.image.width||y.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(y)}}const Te=y.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ge=!0);const Le=k.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Le[U])?V=Le[U][W]:V=Le[U],H=!0):y.samples>0&&Y.useMultisampledRTT(y)===!1?V=k.get(y).__webglMultisampledFramebuffer:Array.isArray(Le)?V=Le[W]:V=Le,ae.copy(y.viewport),le.copy(y.scissor),ke=y.scissorTest}else ae.copy(ve).multiplyScalar(ee).floor(),le.copy(dt).multiplyScalar(ee).floor(),ke=He;if(W!==0&&(V=z),x.bindFramebuffer(I.FRAMEBUFFER,V)&&x.drawBuffers(y,V),x.viewport(ae),x.scissor(le),x.setScissorTest(ke),H){const me=k.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,W)}else if(ge){const me=U;for(let Te=0;Te<y.textures.length;Te++){const Le=k.get(y.textures[Te]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Te,Le.__webglTexture,W,me)}}else if(y!==null&&W!==0){const me=k.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,W)}j=-1},this.readRenderTargetPixels=function(y,U,W,V,H,ge,ye,me=0){if(!(y&&y.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=k.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te){x.bindFramebuffer(I.FRAMEBUFFER,Te);try{const Le=y.textures[me],Ge=Le.format,Ke=Le.type;if(y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!A.textureFormatReadable(Ge)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Ke)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-V&&W>=0&&W<=y.height-H&&I.readPixels(U,W,V,H,fe.convert(Ge),fe.convert(Ke),ge)}finally{const Le=K!==null?k.get(K).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(y,U,W,V,H,ge,ye,me=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=k.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te)if(U>=0&&U<=y.width-V&&W>=0&&W<=y.height-H){x.bindFramebuffer(I.FRAMEBUFFER,Te);const Le=y.textures[me],Ge=Le.format,Ke=Le.type;if(y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!A.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.bufferData(I.PIXEL_PACK_BUFFER,ge.byteLength,I.STREAM_READ),I.readPixels(U,W,V,H,fe.convert(Ge),fe.convert(Ke),0);const ct=K!==null?k.get(K).__webglFramebuffer:null;x.bindFramebuffer(I.FRAMEBUFFER,ct);const Tt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Jp(I,Tt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ge),I.deleteBuffer(Ie),I.deleteSync(Tt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,W=0){const V=Math.pow(2,-W),H=Math.floor(y.image.width*V),ge=Math.floor(y.image.height*V),ye=U!==null?U.x:0,me=U!==null?U.y:0;Y.setTexture2D(y,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,ye,me,H,ge),x.unbindTexture()},this.copyTextureToTexture=function(y,U,W=null,V=null,H=0,ge=0){let ye,me,Te,Le,Ge,Ke,Ie,ct,Tt;const bt=y.isCompressedTexture?y.mipmaps[ge]:y.image;if(W!==null)ye=W.max.x-W.min.x,me=W.max.y-W.min.y,Te=W.isBox3?W.max.z-W.min.z:1,Le=W.min.x,Ge=W.min.y,Ke=W.isBox3?W.min.z:0;else{const wt=Math.pow(2,-H);ye=Math.floor(bt.width*wt),me=Math.floor(bt.height*wt),y.isDataArrayTexture?Te=bt.depth:y.isData3DTexture?Te=Math.floor(bt.depth*wt):Te=1,Le=0,Ge=0,Ke=0}V!==null?(Ie=V.x,ct=V.y,Tt=V.z):(Ie=0,ct=0,Tt=0);const ht=fe.convert(U.format),Kt=fe.convert(U.type);let Me;U.isData3DTexture?(Y.setTexture3D(U,0),Me=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),Me=I.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),Me=I.TEXTURE_2D),x.activeTexture(I.TEXTURE0),x.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),x.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),x.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const on=x.getParameter(I.UNPACK_ROW_LENGTH),nt=x.getParameter(I.UNPACK_IMAGE_HEIGHT),un=x.getParameter(I.UNPACK_SKIP_PIXELS),Dn=x.getParameter(I.UNPACK_SKIP_ROWS),ei=x.getParameter(I.UNPACK_SKIP_IMAGES);x.pixelStorei(I.UNPACK_ROW_LENGTH,bt.width),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,bt.height),x.pixelStorei(I.UNPACK_SKIP_PIXELS,Le),x.pixelStorei(I.UNPACK_SKIP_ROWS,Ge),x.pixelStorei(I.UNPACK_SKIP_IMAGES,Ke);const Ui=y.isDataArrayTexture||y.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const wt=k.get(y),ti=k.get(U),pt=k.get(wt.__renderTarget),ni=k.get(ti.__renderTarget);x.bindFramebuffer(I.READ_FRAMEBUFFER,pt.__webglFramebuffer),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let Oi=0;Oi<Te;Oi++)Ui&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,k.get(y).__webglTexture,H,Ke+Oi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,k.get(U).__webglTexture,ge,Tt+Oi)),I.blitFramebuffer(Le,Ge,ye,me,Ie,ct,ye,me,I.DEPTH_BUFFER_BIT,I.NEAREST);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||y.isRenderTargetTexture||k.has(y)){const wt=k.get(y),ti=k.get(U);x.bindFramebuffer(I.READ_FRAMEBUFFER,G),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,F);for(let pt=0;pt<Te;pt++)Ui?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,wt.__webglTexture,H,Ke+pt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,wt.__webglTexture,H),ut?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ti.__webglTexture,ge,Tt+pt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ti.__webglTexture,ge),H!==0?I.blitFramebuffer(Le,Ge,ye,me,Ie,ct,ye,me,I.COLOR_BUFFER_BIT,I.NEAREST):ut?I.copyTexSubImage3D(Me,ge,Ie,ct,Tt+pt,Le,Ge,ye,me):I.copyTexSubImage2D(Me,ge,Ie,ct,Le,Ge,ye,me);x.bindFramebuffer(I.READ_FRAMEBUFFER,null),x.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ut?y.isDataTexture||y.isData3DTexture?I.texSubImage3D(Me,ge,Ie,ct,Tt,ye,me,Te,ht,Kt,bt.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(Me,ge,Ie,ct,Tt,ye,me,Te,ht,bt.data):I.texSubImage3D(Me,ge,Ie,ct,Tt,ye,me,Te,ht,Kt,bt):y.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ge,Ie,ct,ye,me,ht,Kt,bt.data):y.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ge,Ie,ct,bt.width,bt.height,ht,bt.data):I.texSubImage2D(I.TEXTURE_2D,ge,Ie,ct,ye,me,ht,Kt,bt);x.pixelStorei(I.UNPACK_ROW_LENGTH,on),x.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nt),x.pixelStorei(I.UNPACK_SKIP_PIXELS,un),x.pixelStorei(I.UNPACK_SKIP_ROWS,Dn),x.pixelStorei(I.UNPACK_SKIP_IMAGES,ei),ge===0&&U.generateMipmaps&&I.generateMipmap(Me),x.unbindTexture()},this.initRenderTarget=function(y){k.get(y).__webglFramebuffer===void 0&&Y.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Y.setTextureCube(y,0):y.isData3DTexture?Y.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Y.setTexture2DArray(y,0):Y.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){X=0,B=0,K=null,x.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class Qv extends fu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new xn;e.deleteAttribute("uv");const t=new Dt({side:rn}),i=new Dt,r=new oc(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new Ye(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new Or(e,i,6),o=new Pt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Ye(e,er(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Ye(e,er(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const d=new Ye(e,er(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const u=new Ye(e,er(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const h=new Ye(e,er(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const p=new Ye(e,er(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function er(n){return new Hm({color:0,emissive:16777215,emissiveIntensity:n})}const po=16,mo=64,Lu=1024*32,dh=Lu,Du=Object.freeze({width:po,height:po,depth:po});function lc(n){return n.width*n.height*n.depth}function cc(n){if(typeof n!="object"||n===null||!("width"in n)||!("height"in n)||!("depth"in n))return!1;const e=n;return Number.isInteger(e.width)&&Number.isInteger(e.height)&&Number.isInteger(e.depth)&&(e.width??0)>0&&(e.height??0)>0&&(e.depth??0)>0&&(e.width??Number.POSITIVE_INFINITY)<=mo&&(e.height??Number.POSITIVE_INFINITY)<=mo&&(e.depth??Number.POSITIVE_INFINITY)<=mo&&lc(e)<=Lu}const $v=[{x:1,y:0,z:0},{x:-1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:1},{x:0,y:0,z:-1}],e_=new Set(["matte","metal","emissive"]);function Tl(n){return`${n.x},${n.y},${n.z}`}function t_(n){return Number.isInteger(n.x)&&Number.isInteger(n.y)&&Number.isInteger(n.z)}function Iu(n,e){return t_(n)&&n.x>=0&&n.x<e.width&&n.y>=0&&n.y<e.height&&n.z>=0&&n.z<e.depth}function Cr(n,e,t){return n??e??t}function n_(n,e){const t=new Set;return n.palette.forEach((i,r)=>{const s=`palette[${r}]`;i.id.trim().length===0?e.push({code:"palette",path:`${s}.id`,message:"Palette ids must not be empty."}):t.has(i.id)&&e.push({code:"palette",path:`${s}.id`,message:`Palette id "${i.id}" is duplicated.`}),t.add(i.id),(!Number.isInteger(i.color)||i.color<0||i.color>16777215)&&e.push({code:"palette",path:`${s}.color`,message:"Palette colors must be integers from 0x000000 to 0xFFFFFF."}),i.materialRole!==void 0&&!e_.has(i.materialRole)&&e.push({code:"palette",path:`${s}.materialRole`,message:'Palette material roles must be "matte", "metal", or "emissive".'})}),t}function i_(n,e,t,i){const r=new Map;return n.voxels.forEach((s,a)=>{const o=`voxels[${a}]`;if(e===null||!Iu(s,e)){i.push({code:"voxel-bounds",path:o,message:e===null?"Voxel coordinates require valid recipe dimensions.":`Voxel coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`});return}t.has(s.paletteId)||i.push({code:"palette",path:`${o}.paletteId`,message:`Voxel references unknown palette id "${s.paletteId}".`});const l=Tl(s);if(r.has(l)){i.push({code:"duplicate-voxel",path:o,message:`More than one voxel occupies (${l}).`});return}r.set(l,s)}),r}function r_(n,e,t,i){const r=new Set;n.anchors.forEach((s,a)=>{const o=`anchors[${a}]`;(s.id.trim().length===0||r.has(s.id))&&i.push({code:"duplicate-anchor",path:`${o}.id`,message:s.id.trim().length===0?"Anchor ids must not be empty.":`Anchor id "${s.id}" is duplicated.`}),r.add(s.id),(e===null||!Iu(s,e))&&i.push({code:"anchor-bounds",path:o,message:e===null?"Anchor coordinates require valid recipe dimensions.":`Anchor coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`})});for(const s of new Set(t))r.has(s)||i.push({code:"required-anchor",path:"anchors",message:`Required anchor "${s}" is missing.`})}function s_(n){const e=n.values().next().value;if(e===void 0)return!0;const t=new Set,i=[e];t.add(Tl(e));for(let r=0;r<i.length;r+=1){const s=i[r];if(s!==void 0)for(const a of $v){const o=Tl({x:s.x+a.x,y:s.y+a.y,z:s.z+a.z}),l=n.get(o);l!==void 0&&!t.has(o)&&(t.add(o),i.push(l))}}return t.size===n.size}function a_(n,e={}){const t=[];n.schemaVersion!==2&&t.push({code:"schema-version",path:"schemaVersion",message:`Voxel recipe schema version ${String(n.schemaVersion)} is unsupported; expected version 2.`});const i=cc(n.dimensions);i||t.push({code:"grid-dimensions",path:"dimensions",message:"Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells."});const r=i?n.dimensions:null,s=r===null?0:lc(r),a=Cr(e.minVoxelCount,n.validation?.minVoxelCount,1),o=Cr(e.maxVoxelCount,n.validation?.maxVoxelCount,s);(!Number.isInteger(a)||!Number.isInteger(o)||a<0||o>dh||o>s||a>o||n.voxels.length<a||n.voxels.length>o)&&t.push({code:"voxel-count",path:"voxels",message:`Voxel count ${n.voxels.length} must be between ${a} and ${o}; the grid contains ${s} cells and the absolute cap is ${dh}.`});const l=n_(n,t),c=i_(n,r,l,t);Cr(e.requireGroundContact,n.validation?.requireGroundContact,!0)&&![...c.values()].some(p=>p.y===0)&&t.push({code:"ground-contact",path:"voxels",message:"At least one voxel must touch the y=0 ground plane."}),Cr(e.requireConnectedBody,n.validation?.requireConnectedBody,!0)&&!s_(c)&&t.push({code:"connected-body",path:"voxels",message:"All voxels must form one six-directionally connected body."});const h=Cr(e.requiredAnchors,n.validation?.requiredAnchors,[]);return r_(n,r,h,t),{valid:t.length===0,issues:t,voxelCount:n.voxels.length,uniqueVoxelCount:c.size}}class o_ extends Error{result;constructor(e,t){const i=t.issues.map(r=>`${r.path}: ${r.message}`).join("; ");super(`Invalid voxel recipe "${e}": ${i}`),this.name="VoxelRecipeValidationError",this.result=t}}function dc(n,e={}){const t=a_(n,e);if(!t.valid)throw new o_(n.id,t)}const es=0;function qr(n,e,t,i){return cc(n)&&Number.isInteger(e)&&Number.isInteger(t)&&Number.isInteger(i)&&e>=0&&e<n.width&&t>=0&&t<n.height&&i>=0&&i<n.depth}function Nu(n,e,t,i){if(!qr(n,e,t,i))throw new RangeError(`Voxel coordinate (${e}, ${t}, ${i}) is outside the ${n.width}×${n.height}×${n.depth} grid.`);return e+n.width*(i+n.depth*t)}function l_(n){if(n.length>65535)throw new RangeError("A voxel palette cannot contain more than 65,535 entries.");const e=new Map;return n.forEach((t,i)=>{if(t.id.trim().length===0)throw new TypeError("Voxel palette ids must not be empty.");if(e.has(t.id))throw new TypeError(`Duplicate voxel palette id "${t.id}".`);if(!Number.isInteger(t.color)||t.color<0||t.color>16777215)throw new TypeError(`Voxel palette color for "${t.id}" must be an integer from 0x000000 to 0xFFFFFF.`);e.set(t.id,i+1)}),e}function hc(n,e={}){const t=e.dimensions??Du;if(!cc(t))throw new RangeError("Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells.");return{dimensions:{...t},cells:new Uint16Array(lc(t)),palette:n,paletteIndexById:l_(n),anchors:e.anchors??[],...e.recipeId===void 0?{}:{recipeId:e.recipeId}}}function uc(n,e,t,i){return n.cells[Nu(n.dimensions,e,t,i)]??es}function gt(n,e,t,i,r){const s=Nu(n.dimensions,e,t,i);if(r===null){n.cells[s]=es;return}const a=n.paletteIndexById.get(r);if(a===void 0)throw new TypeError(`Unknown voxel palette id "${r}".`);n.cells[s]=a}function c_(n,e,t){gt(n,e.x,e.y,e.z,t)}function q(n,e,t,i){if(!qr(n.dimensions,e.x,e.y,e.z)||!qr(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel box endpoints must both be inside the grid.");const r=Math.min(e.x,t.x),s=Math.max(e.x,t.x),a=Math.min(e.y,t.y),o=Math.max(e.y,t.y),l=Math.min(e.z,t.z),c=Math.max(e.z,t.z);for(let d=a;d<=o;d+=1)for(let u=l;u<=c;u+=1)for(let h=r;h<=s;h+=1)gt(n,h,d,u,i)}function Ci(n,e,t,i){if(!qr(n.dimensions,e.x,e.y,e.z)||!qr(n.dimensions,t.x,t.y,t.z))throw new RangeError("Voxel line endpoints must both be inside the grid.");const r=t.x-e.x,s=t.y-e.y,a=t.z-e.z,o=Math.max(Math.abs(r),Math.abs(s),Math.abs(a));if(o===0){c_(n,e,i);return}for(let l=0;l<=o;l+=1){const c=l/o;gt(n,Math.round(e.x+r*c),Math.round(e.y+s*c),Math.round(e.z+a*c),i)}}function Uu(n){const e=[];for(let t=0;t<n.dimensions.height;t+=1)for(let i=0;i<n.dimensions.depth;i+=1)for(let r=0;r<n.dimensions.width;r+=1){const s=uc(n,r,t,i);if(s===es)continue;const a=n.palette[s-1];if(a===void 0)throw new TypeError(`Grid cell (${r}, ${t}, ${i}) contains invalid palette index ${s}.`);e.push({x:r,y:t,z:i,paletteId:a.id})}return e}function d_(n,e={}){(e.validate??!0)&&dc(n);const t=hc(n.palette,{dimensions:n.dimensions,anchors:n.anchors,recipeId:n.id});for(const i of n.voxels)gt(t,i.x,i.y,i.z,i.paletteId);return t}const h_=[{name:"positive-x",neighbor:[1,0,0],normal:[1,0,0],vertices:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],shade:.82},{name:"negative-x",neighbor:[-1,0,0],normal:[-1,0,0],vertices:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],shade:.68},{name:"positive-y",neighbor:[0,1,0],normal:[0,1,0],vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{name:"negative-y",neighbor:[0,-1,0],normal:[0,-1,0],vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.55},{name:"positive-z",neighbor:[0,0,1],normal:[0,0,1],vertices:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],shade:.9},{name:"negative-z",neighbor:[0,0,-1],normal:[0,0,-1],vertices:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],shade:.74}],u_=["matte","metal","emissive"];function go(n){return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}function f_(n){return[go((n>>16&255)/255),go((n>>8&255)/255),go((n&255)/255)]}function p_(n,e,t,i){return e<0||e>=n.dimensions.width||t<0||t>=n.dimensions.height||i<0||i>=n.dimensions.depth?!1:uc(n,e,t,i)!==es}function m_(n){const e=n.voxelSize??1,t=n.origin??{x:0,y:0,z:0};if(!Number.isFinite(e)||e<=0)throw new RangeError("Voxel size must be a positive finite number.");if(!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(t.z))throw new RangeError("Voxel mesh origin coordinates must be finite.");for(const i of Object.values(n.faceShades??{}))if(i!==void 0&&(!Number.isFinite(i)||i<0))throw new RangeError("Voxel face shades must be finite non-negative numbers.");return{voxelSize:e,origin:t,shadeFaces:n.shadeFaces??!0}}function g_(n,e={}){const t=m_(e),i=[],r=[],s=[],a={matte:[],metal:[],emissive:[]};let o=0,l=0,c=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,u=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY,p=Number.NEGATIVE_INFINITY,g=Number.NEGATIVE_INFINITY;for(let S=0;S<n.dimensions.height;S+=1)for(let E=0;E<n.dimensions.depth;E+=1)for(let M=0;M<n.dimensions.width;M+=1){const T=uc(n,M,S,E);if(T===es)continue;o+=1;const b=n.palette[T-1];if(b===void 0)throw new TypeError(`Grid cell (${M}, ${S}, ${E}) contains invalid palette index ${T}.`);const[R,v,w]=f_(b.color);for(const C of h_){const[P,L,z]=C.neighbor;if(p_(n,M+P,S+L,E+z))continue;const G=i.length/3,F=t.shadeFaces?e.faceShades?.[C.name]??C.shade:1;for(const B of C.vertices){const K=t.origin.x+(M+B[0])*t.voxelSize,j=t.origin.y+(S+B[1])*t.voxelSize,ne=t.origin.z+(E+B[2])*t.voxelSize;i.push(K,j,ne),r.push(...C.normal),s.push(Math.min(1,R*F),Math.min(1,v*F),Math.min(1,w*F)),c=Math.min(c,K),d=Math.min(d,j),u=Math.min(u,ne),h=Math.max(h,K),p=Math.max(p,j),g=Math.max(g,ne)}const X=b.materialRole??"matte";a[X].push(G,G+1,G+2,G,G+2,G+3),l+=1}}const _=[],m=[];for(const S of u_){const E=a[S];E.length!==0&&(m.push({role:S,start:_.length,count:E.length}),_.push(...E))}const f=i.length/3;return{positions:new Float32Array(i),normals:new Float32Array(r),colors:new Float32Array(s),indices:new Uint32Array(_),voxelCount:o,faceCount:l,vertexCount:f,triangleCount:_.length/3,materialGroups:m,bounds:f===0?null:{min:[c,d,u],max:[h,p,g]}}}function Ou(n,e={}){return g_(d_(n),e)}function ya(n,e,t=1){if(!Number.isFinite(t)||t<=0)throw new RangeError("Voxel size must be a positive finite number.");const i=n.anchors.find(r=>r.id===e);if(i===void 0)throw new RangeError(`Voxel recipe "${n.id}" has no anchor named "${e}".`);return{x:(i.x+.5-n.dimensions.width/2)*t,y:(i.y+.5)*t,z:(i.z+.5-n.dimensions.depth/2)*t}}const Fu=10900280,zu=5628380,Bu=Object.freeze({width:24,height:32,depth:16}),Sa=2.25;Bu.height*Sa;const x_=2e3,ku=Object.freeze({width:20,height:20,depth:18}),Vu=2.1;ku.height*Vu;const v_=1200,__=[{id:"ink",color:2107434,label:"Deep silhouette",materialRole:"matte"},{id:"hair",color:3420214,label:"Weathered dark hair",materialRole:"matte"},{id:"skin",color:13211253,label:"Sun-warmed skin",materialRole:"matte"},{id:"cloth-dark",color:2704454,label:"Deep field cloth",materialRole:"matte"},{id:"cloth-sage",color:6322800,label:"Faded survey coat",materialRole:"matte"},{id:"pack-pale",color:13553085,label:"Bleached field pack",materialRole:"matte"},{id:"rust",color:Fu,label:"Rust repair hardware",materialRole:"metal"},{id:"steel",color:7965576,label:"Dull survey steel",materialRole:"metal"},{id:"cyan",color:zu,label:"Live survey signal",materialRole:"emissive"},{id:"amber",color:15774538,label:"Relic warning light",materialRole:"emissive"}],M_=[{id:"shell-light",color:14342087,label:"Light ceramic cage",materialRole:"matte"},{id:"shell-shadow",color:10398367,label:"Ceramic edge shade",materialRole:"matte"},{id:"inner",color:2107948,label:"Hollow lantern interior",materialRole:"matte"},{id:"steel",color:7438975,label:"Tripod steel",materialRole:"metal"},{id:"rust",color:Fu,label:"Rust repair hardware",materialRole:"metal"},{id:"cyan",color:zu,label:"Survey sensor",materialRole:"emissive"},{id:"amber",color:15774538,label:"Lantern status light",materialRole:"emissive"}];function Hu(n){const e=hc(n.palette,{dimensions:n.dimensions});n.author(e);const t={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:Uu(e),anchors:n.anchors,validation:{minVoxelCount:1,maxVoxelCount:n.maxVoxelCount,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return dc(t),t}function y_(n){q(n,{x:5,y:0,z:4},{x:9,y:2,z:7},"ink"),q(n,{x:14,y:0,z:5},{x:18,y:2,z:8},"ink"),q(n,{x:5,y:0,z:3},{x:9,y:0,z:8},"steel"),q(n,{x:14,y:0,z:4},{x:18,y:0,z:9},"steel"),q(n,{x:6,y:2,z:5},{x:9,y:3,z:7},"rust"),q(n,{x:14,y:2,z:6},{x:17,y:3,z:8},"rust"),q(n,{x:7,y:3,z:6},{x:9,y:11,z:7},"cloth-dark"),q(n,{x:14,y:3,z:6},{x:16,y:11,z:7},"cloth-dark"),q(n,{x:7,y:7,z:5},{x:9,y:8,z:6},"steel"),q(n,{x:14,y:8,z:5},{x:16,y:9,z:6},"steel"),q(n,{x:7,y:10,z:8},{x:10,y:14,z:10},"cloth-sage"),q(n,{x:13,y:11,z:8},{x:16,y:14,z:10},"cloth-sage"),q(n,{x:7,y:10,z:10},{x:9,y:12,z:11},"cloth-dark"),q(n,{x:14,y:11,z:10},{x:16,y:13,z:11},"cloth-dark"),q(n,{x:8,y:13,z:6},{x:16,y:16,z:9},"cloth-dark"),q(n,{x:9,y:16,z:6},{x:15,y:21,z:9},"cloth-sage"),q(n,{x:9,y:16,z:5},{x:10,y:21,z:5},"cloth-dark"),q(n,{x:14,y:16,z:5},{x:15,y:21,z:5},"cloth-dark"),q(n,{x:8,y:22,z:6},{x:16,y:23,z:9},"cloth-dark"),q(n,{x:8,y:22,z:5},{x:16,y:23,z:6},"pack-pale"),q(n,{x:5,y:20,z:6},{x:8,y:22,z:9},"cloth-dark"),q(n,{x:4,y:17,z:6},{x:6,y:20,z:8},"cloth-sage"),q(n,{x:3,y:14,z:4},{x:5,y:18,z:7},"cloth-dark"),q(n,{x:2,y:13,z:3},{x:4,y:15,z:6},"skin"),q(n,{x:16,y:20,z:6},{x:18,y:22,z:9},"cloth-dark"),q(n,{x:17,y:17,z:5},{x:19,y:20,z:8},"cloth-sage"),q(n,{x:18,y:14,z:4},{x:20,y:18,z:7},"steel"),q(n,{x:19,y:13,z:3},{x:21,y:15,z:6},"skin"),q(n,{x:20,y:13,z:3},{x:21,y:14,z:5},"ink"),q(n,{x:10,y:16,z:10},{x:15,y:22,z:11},"pack-pale"),q(n,{x:11,y:17,z:13},{x:14,y:21,z:13},"cloth-dark"),q(n,{x:10,y:16,z:12},{x:10,y:22,z:13},"steel"),q(n,{x:14,y:16,z:12},{x:15,y:22,z:13},"rust"),q(n,{x:5,y:21,z:9},{x:6,y:27,z:10},"steel"),q(n,{x:6,y:26,z:9},{x:8,y:27,z:10},"steel"),q(n,{x:6,y:21,z:9},{x:8,y:22,z:10},"rust"),gt(n,5,27,9,"cyan"),gt(n,5,27,10,"amber"),q(n,{x:10,y:22,z:7},{x:13,y:24,z:9},"skin"),q(n,{x:9,y:24,z:5},{x:14,y:29,z:9},"skin"),q(n,{x:8,y:29,z:5},{x:15,y:31,z:10},"hair"),q(n,{x:8,y:27,z:9},{x:10,y:30,z:11},"hair"),q(n,{x:14,y:27,z:9},{x:16,y:30,z:10},"hair"),q(n,{x:9,y:29,z:4},{x:11,y:30,z:5},"hair"),q(n,{x:14,y:28,z:4},{x:15,y:30,z:5},"hair"),gt(n,10,27,4,"cyan"),gt(n,13,27,4,"cyan"),q(n,{x:11,y:25,z:4},{x:12,y:25,z:5},"rust"),q(n,{x:7,y:23,z:7},{x:16,y:24,z:9},"rust"),q(n,{x:16,y:23,z:8},{x:18,y:25,z:9},"rust"),q(n,{x:18,y:21,z:9},{x:19,y:24,z:10},"pack-pale"),Ci(n,{x:8,y:22,z:4},{x:15,y:15,z:4},"rust"),Ci(n,{x:9,y:22,z:4},{x:16,y:15,z:4},"rust"),q(n,{x:10,y:18,z:4},{x:11,y:20,z:5},"cyan"),q(n,{x:12,y:18,z:4},{x:13,y:20,z:5},"amber")}function S_(n){q(n,{x:3,y:0,z:3},{x:6,y:0,z:6},"steel"),q(n,{x:13,y:0,z:3},{x:16,y:0,z:6},"steel"),q(n,{x:8,y:0,z:13},{x:11,y:0,z:16},"steel"),q(n,{x:4,y:1,z:4},{x:5,y:4,z:5},"rust"),q(n,{x:14,y:1,z:4},{x:15,y:4,z:5},"rust"),q(n,{x:9,y:1,z:14},{x:10,y:4,z:15},"rust"),q(n,{x:5,y:4,z:5},{x:8,y:5,z:7},"steel"),q(n,{x:11,y:4,z:5},{x:14,y:5,z:7},"steel"),q(n,{x:8,y:4,z:11},{x:11,y:5,z:14},"steel"),q(n,{x:7,y:5,z:7},{x:12,y:7,z:11},"inner"),q(n,{x:8,y:8,z:7},{x:11,y:13,z:11},"inner"),q(n,{x:5,y:8,z:6},{x:6,y:14,z:7},"shell-light"),q(n,{x:13,y:8,z:6},{x:14,y:14,z:7},"shell-light"),q(n,{x:5,y:8,z:12},{x:6,y:14,z:13},"shell-shadow"),q(n,{x:13,y:8,z:12},{x:14,y:14,z:13},"shell-shadow"),q(n,{x:7,y:7,z:6},{x:12,y:8,z:13},"shell-shadow"),q(n,{x:7,y:14,z:6},{x:12,y:15,z:13},"shell-light"),q(n,{x:6,y:9,z:13},{x:13,y:13,z:14},"shell-shadow");for(let e=8;e<=14;e+=1)for(let t=6;t<=13;t+=1){const i=Math.abs(t-9.5)+Math.abs(e-11);i>=2.5&&i<=4.5&&(gt(n,t,e,4,"shell-light"),gt(n,t,e,5,"shell-shadow"))}q(n,{x:9,y:10,z:6},{x:10,y:12,z:6},"cyan"),gt(n,9,11,5,null),gt(n,10,11,5,null),q(n,{x:9,y:15,z:9},{x:11,y:17,z:11},"steel"),q(n,{x:11,y:16,z:9},{x:14,y:17,z:10},"rust"),q(n,{x:13,y:17,z:9},{x:14,y:19,z:10},"steel"),q(n,{x:12,y:19,z:8},{x:15,y:19,z:11},"cyan"),q(n,{x:14,y:10,z:7},{x:16,y:12,z:9},"rust"),q(n,{x:16,y:8,z:7},{x:17,y:11,z:8},"steel"),q(n,{x:17,y:7,z:6},{x:18,y:8,z:9},"steel"),gt(n,18,7,6,"amber"),gt(n,18,7,9,"amber"),q(n,{x:8,y:9,z:14},{x:11,y:13,z:15},"rust"),q(n,{x:9,y:10,z:16},{x:10,y:12,z:16},"steel"),gt(n,9,9,16,"cyan"),gt(n,10,13,16,"amber")}const _r=Hu({id:"player-relic-surveyor",name:"Relic Surveyor",kind:"player",dimensions:Bu,palette:__,maxVoxelCount:x_,anchors:[{id:"ground",x:7,y:0,z:6},{id:"weapon",x:20,y:14,z:4},{id:"weapon-grip",x:20,y:14,z:4},{id:"free-hand",x:3,y:14,z:4},{id:"focus",x:11,y:19,z:4}],requiredAnchors:["ground","weapon","weapon-grip","free-hand","focus"],author:y_}),fc=Hu({id:"companion-survey-lantern",name:"Three-Foot Survey Lantern",kind:"companion",dimensions:ku,palette:M_,maxVoxelCount:v_,anchors:[{id:"ground",x:4,y:0,z:4},{id:"sensor",x:9,y:11,z:6},{id:"mast",x:13,y:19,z:9},{id:"manipulator",x:17,y:8,z:7},{id:"rear-coil",x:9,y:10,z:16}],requiredAnchors:["ground","sensor","mast","manipulator","rear-coil"],author:S_}),hh=[{id:"shadow",color:1515551,label:"Mineral shadow"},{id:"soil",color:4930866,label:"Dark soil"},{id:"bone",color:14207140,label:"Bone cloth"},{id:"rust",color:9981234,label:"Oxidized red"},{id:"cyan",color:5229524,label:"Signal cyan"},{id:"amber",color:14919242,label:"Warning amber"},{id:"cloth",color:3492425,label:"Field cloth"},{id:"steel",color:8359304,label:"Dull steel"},{id:"leaf-dark",color:2507566,label:"Dark foliage"},{id:"leaf",color:5206597,label:"Dry foliage"},{id:"wood",color:7359284,label:"Weathered wood"},{id:"violet",color:8546725,label:"Anomaly violet"}];function Gn(n){const e=n.dimensions??Du,t=hc(hh,{dimensions:e});n.author(t);const i={schemaVersion:2,id:n.id,name:n.name,kind:n.kind,dimensions:e,palette:hh,voxels:Uu(t),anchors:n.anchors,validation:{minVoxelCount:1,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:n.requiredAnchors}};return dc(i),i}const ba=Gn({id:"weapon-signal-blade",name:"Signal Blade",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"tip",x:7,y:15,z:7}],requiredAnchors:["grip","tip"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:3,z:8},"bone"),q(n,{x:6,y:0,z:7},{x:9,y:0,z:8},"rust"),q(n,{x:5,y:4,z:7},{x:10,y:4,z:8},"rust"),q(n,{x:7,y:5,z:7},{x:8,y:14,z:8},"steel"),q(n,{x:7,y:6,z:7},{x:7,y:13,z:7},"cyan"),gt(n,7,15,7,"steel"),gt(n,8,15,8,"steel")}}),Ea=Gn({id:"weapon-impact-maul",name:"Impact Maul",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"impact",x:3,y:9,z:7}],requiredAnchors:["grip","impact"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),q(n,{x:6,y:0,z:7},{x:9,y:1,z:8},"bone"),q(n,{x:7,y:4,z:7},{x:8,y:5,z:8},"steel"),q(n,{x:4,y:8,z:5},{x:11,y:12,z:10},"steel"),q(n,{x:3,y:8,z:5},{x:4,y:12,z:10},"rust"),q(n,{x:11,y:8,z:5},{x:12,y:12,z:10},"rust"),q(n,{x:6,y:12,z:6},{x:9,y:12,z:9},"cyan")}}),pc=Gn({id:"scrap-hound",name:"Scrap Hound",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:3,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:5,y:2,z:5},{x:10,y:5,z:10},"rust"),q(n,{x:6,y:3,z:5},{x:9,y:4,z:5},"shadow"),gt(n,6,4,5,"amber"),gt(n,9,4,5,"amber"),q(n,{x:3,y:0,z:5},{x:4,y:2,z:6},"shadow"),q(n,{x:11,y:0,z:5},{x:12,y:2,z:6},"shadow"),q(n,{x:5,y:0,z:3},{x:6,y:2,z:4},"shadow"),q(n,{x:9,y:0,z:11},{x:10,y:2,z:12},"shadow"),Ci(n,{x:6,y:5,z:2},{x:6,y:5,z:5},"steel"),Ci(n,{x:9,y:5,z:2},{x:9,y:5,z:5},"steel")}}),mc=Gn({id:"relay-shell",name:"Relay Shell",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:7,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:4,y:0,z:5},{x:6,y:3,z:10},"shadow"),q(n,{x:9,y:0,z:5},{x:11,y:3,z:10},"shadow"),q(n,{x:3,y:2,z:4},{x:12,y:9,z:11},"rust"),q(n,{x:3,y:5,z:4},{x:12,y:8,z:5},"steel"),q(n,{x:5,y:9,z:5},{x:10,y:12,z:10},"bone"),q(n,{x:6,y:10,z:5},{x:9,y:11,z:5},"shadow"),gt(n,6,11,5,"amber"),gt(n,9,11,5,"amber"),Ci(n,{x:5,y:12,z:7},{x:5,y:14,z:7},"steel"),Ci(n,{x:10,y:12,z:7},{x:10,y:14,z:7},"steel")}}),gc=Gn({id:"murmur",name:"Murmur",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7}],requiredAnchors:["ground","target"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:5,z:8},"shadow"),q(n,{x:5,y:5,z:5},{x:10,y:10,z:10},"violet"),q(n,{x:6,y:6,z:5},{x:9,y:9,z:5},"cyan"),q(n,{x:3,y:7,z:7},{x:5,y:8,z:8},"steel"),q(n,{x:10,y:7,z:7},{x:12,y:8,z:8},"steel"),q(n,{x:7,y:11,z:7},{x:8,y:14,z:8},"cyan"),gt(n,7,15,7,"amber")}}),xc=Gn({id:"anomaly-orison",name:"Orison, the Listening Fault",kind:"named-anomaly",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7},{id:"interact",x:7,y:6,z:4}],requiredAnchors:["ground","target","interact"],author:n=>{q(n,{x:3,y:0,z:5},{x:6,y:5,z:10},"shadow"),q(n,{x:9,y:0,z:5},{x:12,y:5,z:10},"shadow"),q(n,{x:3,y:4,z:4},{x:12,y:10,z:11},"violet"),q(n,{x:1,y:6,z:6},{x:3,y:9,z:9},"steel"),q(n,{x:12,y:6,z:6},{x:14,y:9,z:9},"steel"),q(n,{x:5,y:10,z:5},{x:10,y:14,z:10},"bone"),q(n,{x:5,y:11,z:5},{x:10,y:13,z:5},"shadow"),q(n,{x:6,y:11,z:4},{x:9,y:12,z:5},"cyan"),gt(n,6,12,4,"amber"),gt(n,9,12,4,"amber"),q(n,{x:6,y:15,z:6},{x:9,y:15,z:9},"steel"),q(n,{x:6,y:7,z:3},{x:9,y:9,z:4},"cyan")}}),Ta=Gn({id:"prop-dry-tree",name:"Dry Signal Tree",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{q(n,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),q(n,{x:4,y:0,z:7},{x:11,y:0,z:8},"wood"),q(n,{x:7,y:0,z:4},{x:8,y:0,z:11},"wood"),q(n,{x:4,y:7,z:7},{x:11,y:8,z:8},"wood"),q(n,{x:7,y:7,z:4},{x:8,y:8,z:11},"wood"),q(n,{x:3,y:9,z:4},{x:12,y:12,z:11},"leaf-dark"),q(n,{x:5,y:13,z:5},{x:10,y:15,z:10},"leaf"),q(n,{x:5,y:10,z:3},{x:10,y:11,z:12},"leaf"),gt(n,7,15,7,"cyan")}}),vc=Gn({id:"prop-rift-rock",name:"Rift Rock",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:n=>{q(n,{x:3,y:0,z:4},{x:12,y:2,z:11},"soil"),q(n,{x:4,y:3,z:5},{x:11,y:5,z:10},"shadow"),q(n,{x:6,y:6,z:6},{x:9,y:7,z:9},"steel"),Ci(n,{x:5,y:3,z:5},{x:8,y:6,z:5},"cyan")}}),_c=Gn({id:"prop-field-chest",name:"Field Chest",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:4,z:4}],requiredAnchors:["ground","interact"],author:n=>{q(n,{x:3,y:0,z:4},{x:12,y:5,z:11},"wood"),q(n,{x:3,y:0,z:4},{x:4,y:7,z:11},"steel"),q(n,{x:11,y:0,z:4},{x:12,y:7,z:11},"steel"),q(n,{x:3,y:6,z:4},{x:12,y:7,z:11},"rust"),q(n,{x:7,y:3,z:3},{x:8,y:5,z:4},"amber")}}),ts=Gn({id:"prop-unclassified-relic",name:"Unclassified Relic",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:7,z:5},{id:"core",x:7,y:8,z:7}],requiredAnchors:["ground","interact","core"],author:n=>{q(n,{x:5,y:0,z:5},{x:10,y:2,z:10},"soil"),q(n,{x:7,y:3,z:7},{x:8,y:6,z:8},"steel"),q(n,{x:5,y:6,z:5},{x:10,y:11,z:10},"violet"),q(n,{x:6,y:7,z:5},{x:9,y:10,z:5},"cyan"),q(n,{x:7,y:8,z:4},{x:8,y:9,z:5},"amber"),q(n,{x:7,y:12,z:7},{x:8,y:14,z:8},"cyan")}}),b_=[_r,fc,ba,Ea,pc,mc,gc,xc,Ta,vc,_c,ts],E_=Object.freeze({blade:ba,impact:Ea}),T_=Object.freeze({"scrap-hound":pc,"relay-shell":mc,murmur:gc,"named-anomaly":xc}),w_=Object.freeze({tree:Ta,rock:vc,chest:_c,relic:ts});Object.freeze({...Object.fromEntries(b_.map(n=>[n.id,n])),player:_r,companion:fc,...E_,...T_,...w_,"dead-tree":Ta,"unclassified-relic":ts});const uh=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],A_=[{id:"negative-z",corners:[0,3,2,1],normal:[0,0,-1]},{id:"positive-z",corners:[4,5,6,7],normal:[0,0,1]},{id:"negative-x",corners:[0,4,7,3],normal:[-1,0,0]},{id:"positive-x",corners:[1,2,6,5],normal:[1,0,0]},{id:"negative-y",corners:[0,1,5,4],normal:[0,-1,0]},{id:"positive-y",corners:[3,7,6,2],normal:[0,1,0]}],fh=[0,1,2,0,2,3];function Ns(n,e){if(!n.every(Number.isFinite))throw new RangeError(`${e} must contain finite values.`)}function ph(n,e,t){n.set(e).multiplyScalar(t),n.r=tn.clamp(n.r,0,1),n.g=tn.clamp(n.g,0,1),n.b=tn.clamp(n.b,0,1)}function R_(n){return n.y>.55?1.04:n.y<-.55?.56:tn.clamp(.75+n.x*.055+n.z*.09,.62,.9)}class _t{positions=[];normals=[];colors=[];transformedCorners=uh.map(()=>new D);matrix=new rt;normalMatrix=new Be;position=new D;scale=new D;quaternion=new Hn;euler=new Cn;faceNormal=new D;color=new Ue;componentCount=0;get triangles(){return this.positions.length/9}get components(){return this.componentCount}addBox(e){if(Ns(e.center,"Box center"),Ns(e.size,"Box size"),e.size.some(r=>r<=0))throw new RangeError("Box size values must be greater than zero.");const t=e.rotation??[0,0,0];Ns(t,"Box rotation");const i=e.shade??1;if(!Number.isFinite(i)||i<0)throw new RangeError("Box shade must be a finite non-negative value.");this.position.set(...e.center),this.scale.set(...e.size),this.euler.set(...t),this.quaternion.setFromEuler(this.euler),this.matrix.compose(this.position,this.quaternion,this.scale),this.normalMatrix.getNormalMatrix(this.matrix),uh.forEach((r,s)=>{this.transformedCorners[s]?.set(...r).applyMatrix4(this.matrix)});for(const r of A_){this.faceNormal.set(...r.normal).applyMatrix3(this.normalMatrix).normalize();const s=i*R_(this.faceNormal)*(e.faceShades?.[r.id]??1);ph(this.color,e.color,s);for(const a of fh){const o=this.transformedCorners[r.corners[a]];if(o===void 0)throw new Error("Invalid internal box face definition.");this.positions.push(o.x,o.y,o.z),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}}return this.componentCount+=1,this}addQuad(e){e.corners.forEach(o=>{Ns(o,"Quad corner")});const t=e.shade??1;if(!Number.isFinite(t)||t<0)throw new RangeError("Quad shade must be a finite non-negative value.");const i=new D(...e.corners[0]),r=new D(...e.corners[1]),s=new D(...e.corners[2]);if(this.faceNormal.subVectors(r,i).cross(new D().subVectors(s,i)),this.faceNormal.lengthSq()<=Number.EPSILON)throw new RangeError("Quad corners must describe a non-zero surface.");this.faceNormal.normalize();const a=Array.isArray(e.color)?e.color:[e.color,e.color,e.color,e.color];for(const o of fh){const l=e.corners[o],c=a[o];if(l===void 0||c===void 0)throw new Error("Invalid internal quad definition.");ph(this.color,c,t),this.positions.push(...l),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}return this.componentCount+=1,this}build(){const e=new Bt;return e.setAttribute("position",new lt(this.positions,3)),e.setAttribute("normal",new lt(this.normals,3)),e.setAttribute("color",new lt(this.colors,3)),e.computeBoundingBox(),e.computeBoundingSphere(),e.userData.componentCount=this.componentCount,e.userData.triangleCount=this.triangles,e}}const mh=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),gh=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),C_=new D(1,0,0),Us=new D,Os=new D,xh=new Hn,Fs=new Cn,Je={moss:[5209416,6130256,7706458,4157508],soil:[10057042,9004871,11174744,7888195],stone:[10986895,9607045,11973020,8358267],paleWall:[13157543,12171679,13749170,11449242],roof:[11034178,9653562,11955528,8342078],timber:[6834741,7820346,5193009,8872514],rust:[9130296,10641727,7097149,11630157],foliage:[4029256,5739343,7185747,3106626]};function yt(n,e,t=0){return(Math.imul(Math.trunc(n)+61,73856093)^Math.imul(Math.trunc(e)+113,19349663)^Math.imul(Math.trunc(t)+185,83492791))>>>0}function _e(n,e=0){return(n>>>e&1023)/1023}function Et(n,e){return n[e%n.length]??n[0]??16777215}function P_(n,e){const t=[],i=[];return n.forEach((r,s)=>{const a=n[Math.max(0,s-1)]??r,o=n[Math.min(n.length-1,s+1)]??r,l=o[0]-a[0],c=o[2]-a[2],d=Math.hypot(l,c)||1,u=(e[s]??e[0]??1)/2,h=-c/d*u,p=l/d*u;t.push([r[0]+h,r[1],r[2]+p]),i.push([r[0]-h,r[1],r[2]-p])}),{left:t,right:i}}function tr(n,e,t,i){if(e.length<2||e.length!==t.length)throw new RangeError("Ribbon points and widths must have equal length.");const r=P_(e,t);for(let s=0;s<e.length-1;s+=1){const a=r.left[s],o=r.left[s+1],l=r.right[s+1],c=r.right[s];if(a===void 0||o===void 0||l===void 0||c===void 0)continue;const d=i[s%i.length]??16777215,u=i[(s+1)%i.length]??d;n.addQuad({corners:[a,o,l,c],color:[d,u,u,d]})}}function xo(n,e){return n.map(([t,i])=>[t,e,i])}function L_(n){const e=xo([[24,930],[140,920],[275,908],[415,900],[555,902],[695,890],[824,876]],1.18),t=[132,124,114,108,116,124,136];tr(n,e.map(([s,,a])=>[s,1.05,a]),t.map(s=>s+22),[7297603,7954503,7034690]),tr(n,e,t,[10648661,9990478,11371867,9398603]);const i=xo([[270,910],[265,850],[267,790],[267,716]],1.24);tr(n,i,[82,78,68,60],[10188370,10977625,9399372]);const r=xo([[292,908],[290,970],[278,1025],[267,1091]],1.26);tr(n,r,[72,70,64,58],[9990736,10845782,9201737]),tr(n,e.map(([s,,a])=>[s,1.5,a-27]),t.map(()=>7),[7755327,6836029]),tr(n,e.map(([s,,a])=>[s,1.52,a+24]),t.map(()=>6),[7230014,8084290]);for(let s=0;s<74;s+=1){const a=yt(s,41,13),o=s/73,l=45+o*752,c=925-o*46+(_e(a,5)-.5)*126,d=s%2===0?-1:1;n.addBox({center:[l,2.05+_e(a,17)*.4,c+d*(57+_e(a,12)*16)],size:[8+_e(a,2)*12,1.5+_e(a,20)*1.2,6+_e(a,9)*9],rotation:[0,_e(a,14)*Math.PI,0],color:Et(Je.stone,a),shade:.92})}}function Gu(n,e,t=0){return n>130-t&&n<380+t&&e>570-t&&e<720+t||n>150-t&&n<380+t&&e>1090-t&&e<1220+t||n>320-t&&n<402+t&&e>790-t&&e<872+t}function D_(n){[{x:105,z:630,radius:58,count:13,palette:Je.moss},{x:407,z:694,radius:56,count:18,palette:Je.stone},{x:207,z:752,radius:52,count:13,palette:Je.soil},{x:361,z:831,radius:72,count:17,palette:Je.moss},{x:500,z:900,radius:92,count:15,palette:Je.stone},{x:471,z:760,radius:44,count:9,palette:Je.soil},{x:471,z:1040,radius:46,count:9,palette:Je.moss},{x:258,z:1058,radius:54,count:12,palette:Je.soil},{x:407,z:1202,radius:58,count:17,palette:Je.stone},{x:126,z:1164,radius:54,count:12,palette:Je.moss},{x:118,z:830,radius:68,count:12,palette:Je.soil},{x:178,z:1004,radius:72,count:12,palette:Je.moss},{x:652,z:801,radius:76,count:13,palette:Je.soil},{x:704,z:977,radius:78,count:13,palette:Je.moss}].forEach((i,r)=>{for(let s=0;s<i.count;s+=1){const a=yt(r,s,73),o=_e(a,3)*Math.PI*2+r*.37,l=Math.sqrt(_e(a,13))*i.radius,c=i.x+Math.cos(o)*l+(_e(a,19)-.5)*8,d=i.z+Math.sin(o)*l+(_e(a,7)-.5)*8;if(Gu(c,d,10))continue;const u=r%3===0?Je.soil:r%3===1?Je.moss:Je.stone,h=s%5===0?u:i.palette;n.addBox({center:[c,1.08+_e(a,21)*.24,d],size:[8+_e(a,5)*24,.75+_e(a,23)*.9,8+_e(a,15)*24],rotation:[0,o+_e(a,9)*.65,0],color:Et(h,a>>>4),shade:.9+_e(a,18)*.14})}}),[[414,846],[446,838],[478,843],[511,839],[540,849],[427,874],[463,872],[501,875],[535,878],[409,911],[444,908],[482,913],[525,909],[555,913],[424,947],[460,944],[500,948],[538,942]].forEach(([i,r],s)=>{const a=yt(s,i,r);n.addBox({center:[i,1.7,r],size:[18+_e(a,4)*9,1.8,13+_e(a,12)*8],rotation:[0,(_e(a,20)-.5)*.24,0],color:Et(Je.stone,a)})})}function xt(n,e,t,i,r,s=i){Us.set(t[0]-e[0],t[1]-e[1],t[2]-e[2]);const a=Us.length();a<=Number.EPSILON||(Us.multiplyScalar(1/a),xh.setFromUnitVectors(C_,Us),Fs.setFromQuaternion(xh,"XYZ"),Os.set((e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2),n.addBox({center:[Os.x,Os.y,Os.z],size:[a,i,s],rotation:[Fs.x,Fs.y,Fs.z],color:r}))}function na(n,e,t,i,r,s){const a=Math.ceil((t-e)/24),o=(t-e)/a;for(let l=0;l<a;l+=1){const c=yt(l,s,19);n.addBox({center:[e+(l+.5)*o,r+(_e(c,13)-.5)*.8,i],size:[o-1.2,7+_e(c,5)*2,11+_e(c,18)*2],rotation:[0,(_e(c,9)-.5)*.035,0],color:Et(Je.stone,c)})}}function I_(n,e,t,i,r,s,a,o,l){n.addBox({center:[255,5,645],size:[250,10,150],color:7830896}),n.addBox({center:[255,14,578],size:[226,8,12],color:9277827});for(const _ of[137,373])n.addBox({center:[_,14,645],size:[12,8,126],color:_===137?8752254:9737607});na(n,132,378,716,12,10),na(n,132,378,574,12,11),na(n,132,378,716,21,12);for(const _ of[139,371])for(let m=0;m<6;m+=1){const f=yt(_,m,101);n.addBox({center:[_,21+m*13,712],size:[16+_e(f,4)*2,12,18+_e(f,14)*2],rotation:[0,(_e(f,20)-.5)*.045,0],color:Et(Je.stone,f)})}e.addBox({center:[255,55,578],size:[226,76,10],color:12236960}),e.addBox({center:[137,55,645],size:[10,76,126],color:11645852}),[{z:596,y:55,d:30,h:76},{z:626,y:27,d:30,h:22},{z:626,y:78,d:30,h:24},{z:680,y:55,d:78,h:76}].forEach((_,m)=>{e.addBox({center:[373,_.y,_.z],size:[10,_.h,_.d],color:Et(Je.paleWall,yt(m,81))})}),[{x:149,y:54,width:20,height:78},{x:178,y:24,width:38,height:20},{x:178,y:78,width:38,height:24},{x:220,y:54,width:44,height:78},{x:268,y:81,width:42,height:18},{x:305,y:54,width:30,height:78},{x:337,y:24,width:32,height:20},{x:337,y:78,width:32,height:24},{x:362,y:54,width:18,height:78}].forEach((_,m)=>{e.addBox({center:[_.x,_.y,712],size:[_.width,_.height,9],color:Et(Je.paleWall,yt(m,91))})}),[[151,57,718,13,18,8885103],[213,35,718,15,20,10194285],[304,69,718,10,15,7702891],[359,32,718,9,16,9993825]].forEach(([_,m,f,S,E,M])=>{e.addBox({center:[_,m,f],size:[S,E,1.5],color:M,shade:.92})});const h=268;i.addBox({center:[h,40,707],size:[34,58,5],color:4601903});for(let _=0;_<4;_+=1)i.addBox({center:[h-12.5+_*8.3,40,710],size:[6.7,54,2],color:Et(Je.timber,yt(_,140))});i.addBox({center:[h-22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[h+22,41,714],size:[6,68,8],color:6178355}),i.addBox({center:[h,74,714],size:[50,7,9],color:6638133}),r.addBox({center:[h+10,39,713.5],size:[3,4,3],color:12157516}),[{x:178,y:51,z:708,rotationY:0},{x:337,y:51,z:708,rotationY:0}].forEach((_,m)=>{(m===0?l:o).addBox({center:[_.x,_.y,_.z],size:[28,24,2],color:m===0?8829094:14792302}),i.addBox({center:[_.x,_.y-15,_.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[_.x,_.y+15,_.z+4],size:[36,5,5],color:5849908}),i.addBox({center:[_.x-18,_.y,_.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[_.x+18,_.y,_.z+4],size:[5,34,5],color:5849908}),i.addBox({center:[_.x,_.y,_.z+5],size:[3,28,3],color:6309687}),i.addBox({center:[_.x,_.y,_.z+5],size:[31,3,3],color:6309687})}),l.addBox({center:[369,51,626],size:[2,23,24],color:7974045}),i.addBox({center:[368,51,626],size:[4,3,29],color:5718579}),i.addBox({center:[368,51,626],size:[4,29,3],color:5718579}),Wu(t,i,{centerX:255,ridgeZ:645,wallTop:94,width:270,halfDepth:86,rise:34,columns:17,rows:7,seed:211,brokenSide:1}),n.addBox({center:[185,108,602],size:[27,47,25],color:8486770}),n.addBox({center:[185,133,602],size:[33,7,31],color:7304297}),[{y:3,z:726,width:54,depth:15},{y:6,z:720,width:48,depth:12}].forEach(_=>{n.addBox({center:[h,_.y,_.z],size:[_.width,_.y*2,_.depth],color:9277828})}),Xu(s,255,645,154,27,311),ma(a,151,714,77,401),ma(a,350,714,62,402),qu(i,r,394,735,3,421),Yu(i,r,116,731,431)}function N_(n,e,t,i,r,s,a,o,l){n.addBox({center:[265,4,1155],size:[230,8,130],color:7699824}),n.addBox({center:[265,12,1095],size:[214,8,11],color:8883840});for(const u of[157,375])n.addBox({center:[u,12,1155],size:[11,8,112],color:u===157?8489594:9474949});na(n,152,378,1216,11,510),e.addBox({center:[265,44,1095],size:[214,66,9],color:12106143}),e.addBox({center:[157,44,1155],size:[9,66,112],color:11449755}),[{z:1112,y:44,d:28,h:66},{z:1145,y:23,d:38,h:21},{z:1145,y:65,d:38,h:22},{z:1194,y:44,d:52,h:66}].forEach((u,h)=>{e.addBox({center:[375,u.y,u.z],size:[9,u.h,u.d],color:Et(Je.paleWall,yt(h,521))})}),[{x:168,y:44,width:24,height:66},{x:205,y:72,width:50,height:10},{x:245,y:44,width:30,height:66},{x:293,y:23,width:66,height:20},{x:293,y:65,width:66,height:22},{x:350,y:44,width:46,height:66}].forEach((u,h)=>{e.addBox({center:[u.x,u.y,1215],size:[u.width,u.height,9],color:Et(Je.paleWall,yt(h,531))})}),e.addBox({center:[352,34,1221],size:[14,23,1.5],color:8688239}),i.addBox({center:[205,38,1211],size:[40,56,5],color:5324080});for(let u=0;u<5;u+=1)i.addBox({center:[190+u*7.5,38,1214],size:[5.8,52,2],color:Et(Je.timber,yt(u,540))});for(const u of[181,229])i.addBox({center:[u,39,1218],size:[6,64,8],color:6309684});i.addBox({center:[205,70,1218],size:[55,7,9],color:6309684}),l.addBox({center:[293,49,1211],size:[56,28,2],color:9288102});for(const u of[263,323])i.addBox({center:[u,49,1217],size:[5,36,5],color:5849652});for(const u of[32,66])i.addBox({center:[293,u,1217],size:[64,5,5],color:5849652});i.addBox({center:[293,49,1217],size:[4,30,4],color:5849652}),o.addBox({center:[371,49,1145],size:[2,26,31],color:14068840}),i.addBox({center:[369,49,1145],size:[4,34,4],color:5784116}),i.addBox({center:[369,49,1145],size:[4,4,39],color:5784116}),Wu(t,i,{centerX:265,ridgeZ:1155,wallTop:78,width:248,halfDepth:74,rise:29,columns:16,rows:6,seed:551,brokenSide:1}),Xu(s,265,1155,134,23,571),ma(a,338,1219,54,581),ma(a,164,1219,44,582),qu(i,r,403,1202,2,591),Yu(i,r,135,1210,601)}function Wu(n,e,t){const i=t.width/t.columns,r=t.halfDepth/t.rows,s=Math.atan2(t.rise,t.halfDepth),o=Math.hypot(t.rise,t.halfDepth)/t.rows+2.2;for(const c of[-1,1])for(let d=0;d<t.rows;d+=1)for(let u=0;u<t.columns;u+=1){const h=yt(u,d,t.seed+c*17);if(c===t.brokenSide&&u>=t.columns-5&&d>=1&&d<=t.rows-2&&((u+d)%3!==0||u===t.columns-1))continue;const _=t.centerX-t.width/2+(u+.5)*i+(_e(h,11)-.5)*1.2,m=(d+.5)*r,f=t.ridgeZ+c*m,S=t.wallTop+t.rise-m/t.halfDepth*t.rise;n.addBox({center:[_,S,f],size:[i+1.4,3+_e(h,18)*1.2,o],rotation:[c*s,(_e(h,7)-.5)*.025,(_e(h,20)-.5)*.018],color:Et(Je.roof,h)})}for(let c=0;c<t.columns;c+=1){const d=yt(c,t.seed,631);n.addBox({center:[t.centerX-t.width/2+(c+.5)*i,t.wallTop+t.rise+1.6,t.ridgeZ],size:[i+1.2,5.5,9],rotation:[0,0,(_e(d,12)-.5)*.025],color:Et(Je.roof,d)})}const l=t.centerX+t.width/2-i*4.5;for(let c=0;c<5;c+=1){const d=l+c*i,u=[d,t.wallTop+t.rise-1,t.ridgeZ],h=[d,t.wallTop-1,t.ridgeZ+t.brokenSide*t.halfDepth];xt(e,u,h,3.4,6177841,4.2)}}function Xu(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=yt(a,s,701),l=a/r*Math.PI*2+(_e(o,6)-.5)*.28,c=i+(_e(o,15)-.5)*25,d=5+_e(o,3)*15,u=5+_e(o,10)*13,h=.8+_e(o,17)*.8;n.addBox({center:[e+Math.cos(l)*c,.25+h/2,t+Math.sin(l)*c],size:[d,h,u],rotation:[(_e(o,1)-.5)*.05,l+_e(o,13),(_e(o,8)-.5)*.05],color:a%5===0?Et(Je.roof,o):Et(Je.stone,o)})}}function ma(n,e,t,i,r){const s=[];for(let a=0;a<7;a+=1){const o=yt(a,r,733);s.push([e+Math.sin(a*1.3+r)*7,3+a/6*i,t+_e(o,12)*1.4])}for(let a=0;a<s.length-1;a+=1){const o=s[a],l=s[a+1];if(o===void 0||l===void 0)continue;xt(n,o,l,2.2,3499325,1.5);const c=yt(a,r,739);n.addBox({center:[l[0]+(_e(c,4)-.5)*9,l[1],l[2]+1],size:[6+_e(c,12)*5,3+_e(c,18)*3,2.2],rotation:[0,(_e(c,9)-.5)*.4,(_e(c,21)-.5)*.45],color:Et(Je.foliage,c)})}}function qu(n,e,t,i,r,s){for(let a=0;a<r;a+=1){const o=yt(a,s,751),l=25+_e(o,5)*8,c=22+_e(o,13)*9,d=23+_e(o,19)*8,u=t+a*25,h=i+a%2*22,p=(_e(o,9)-.5)*.16;n.addBox({center:[u,c/2,h],size:[l,c,d],rotation:[0,p,0],color:Et(Je.timber,o)});for(const g of[4,c-4])e.addBox({center:[u,g,h],size:[l+2,2.2,d+2],rotation:[0,p,0],color:8084034})}}function Yu(n,e,t,i,r){for(let s=0;s<3;s+=1){const a=yt(s,r,769),o=[t+s*9,2,i+s*3],l=[o[0]+7+_e(a,7)*5,35+_e(a,14)*11,o[2]-3];xt(n,o,l,3.2,6441011,2.8),e.addBox({center:[l[0],l[1]+2,l[2]],size:[s===1?15:11,5,s===2?9:4],rotation:[0,_e(a,19)*.4,.18],color:Et(Je.rust,a)})}}function U_(n,e,t,i,r){for(let l=0;l<3;l+=1)for(let c=0;c<14;c+=1){const d=yt(c,l,811),u=(c+l%2*.5)/14*Math.PI*2,h=31+(_e(d,11)-.5)*1.7;n.addBox({center:[361+Math.cos(u)*h,5+l*9,831+Math.sin(u)*h],size:[16.5+_e(d,3)*2,8,11+_e(d,17)*1.5],rotation:[0,-u,0],color:Et(Je.stone,d)})}r.addBox({center:[361,16,831],size:[42,1.4,42],color:4165521,shade:.9});for(const l of[329,393])e.addBox({center:[l,49,831],size:[8,58,9],color:6309170}),n.addBox({center:[l,5,831],size:[15,10,17],color:8094324});e.addBox({center:[361,75,831],size:[82,8,9],color:6769203}),t.addBox({center:[361,54,831],size:[74,5,5],color:7035725}),t.addBox({center:[361,54,831],size:[10,16,10],color:10117950}),xt(t,[361,54,831],[361,23,831],1.8,4998719,1.8),e.addBox({center:[361,21,831],size:[18,12,16],color:7754810});for(let l=0;l<12;l+=1){const c=yt(l,831,17),d=l/12*Math.PI*2;i.addBox({center:[361+Math.cos(d)*39,2.5,831+Math.sin(d)*39],size:[8+_e(c,8)*7,3,5],rotation:[0,-d,(_e(c,17)-.5)*.25],color:Et(Je.moss,c)})}}function O_(n,e,t,i){const r=Yt.x,s=Yt.y;for(const o of[470,530])n.addBox({center:[o,34,s],size:[8,68,9],color:5783599}),i.addBox({center:[o,3,s],size:[17,6,18],color:8291704});n.addBox({center:[r,49,s],size:[76,48,8],color:6703668});for(let o=0;o<5;o+=1)n.addBox({center:[r,31+o*9,s+5],size:[70,7,3],color:Et(Je.timber,yt(o,901))});n.addBox({center:[r,76,s],size:[92,7,19],rotation:[0,0,-.035],color:7753785}),xt(n,[470,10,s],[492,75,s],4,5126444),xt(n,[530,10,s],[508,75,s],4,5126444),[{x:479,y:57,width:19,height:24,color:14208938},{x:503,y:54,width:20,height:29,color:13154696},{x:524,y:59,width:15,height:20,color:14603701},{x:489,y:36,width:22,height:14,color:12102269},{x:518,y:38,width:23,height:16,color:13813407}].forEach((o,l)=>{t.addBox({center:[o.x,o.y,s+7.1],size:[o.width,o.height,.9],rotation:[0,0,(l-2)*.025],color:o.color,shade:1.03}),e.addBox({center:[o.x,o.y+o.height/2-3,s+8],size:[2.4,2.4,1.8],color:l%2===0?11558722:5144948})})}function vh(n,e,t,i,r,s){e.addBox({center:[i,4,r],size:[20,8,20],rotation:[0,s,0],color:8554362}),n.addBox({center:[i,35,r],size:[7,62,7],rotation:[0,0,s],color:5590855}),n.addBox({center:[i+9,66,r],size:[25,5,6],rotation:[0,s,-.08],color:5984325}),n.addBox({center:[i+19,57,r],size:[3.5,17,4],color:6444362}),t.addBox({center:[i+19,53,r],size:[13,15,12],rotation:[0,s,0],color:15907944,shade:1.05});for(const a of[-7.5,7.5])n.addBox({center:[i+19+a,53,r],size:[2,18,15],rotation:[0,s,0],color:5851968});n.addBox({center:[i+19,62,r],size:[18,3,16],color:6771522}),n.addBox({center:[i+19,44,r],size:[18,3,16],color:6771522})}function F_(n,e,t,i){vh(n,e,t,470,760,-.025),vh(n,e,t,470,1040,.018),[[[489,65,760],[494,58,805],[498,56,850],[500,72,940]],[[500,72,960],[498,55,974],[494,57,997],[489,65,1040]]].forEach(s=>{for(let a=0;a<s.length-1;a+=1){const o=s[a],l=s[a+1];o!==void 0&&l!==void 0&&xt(n,o,l,1.45,4013113,1.45)}});for(const[s,a]of[[489,760],[489,1040]]){const o=new oc(16760690,46,155,2);o.position.set(s,57,a),o.castShadow=!1,o.name=`start-town-lamp-light-${a}`,i.add(o)}}function z_(n){for(let t=0;t<96;t+=1){const i=yt(t,1101,29),r=52+_e(i,2)*742,s=446+_e(i,12)*900;if(Gu(r,s,22)||r>390&&r<600&&Math.abs(s-900)<92)continue;const a=2+i%3;for(let o=0;o<a;o+=1){const l=yt(t,o,1111),c=7+_e(l,4)*13;n.addBox({center:[r+(_e(l,11)-.5)*10,1.8+c/2,s+(_e(l,18)-.5)*10],size:[2.2+_e(l,7)*2,c,2.2],rotation:[(_e(l,14)-.5)*.32,_e(l,21)*Math.PI,(_e(l,2)-.5)*.28],color:Et(Je.foliage,l)})}t%9===0&&n.addBox({center:[r,13,s],size:[5,5,5],rotation:[.2,_e(i,18)*Math.PI,.2],color:t%18===0?14988624:13922920,shade:1.04})}}function B_(n,e,t){const i=[7314321,8628896,12690255,11123879],r=255,s=645,a=94,o=270,l=86,c=34,d=17,u=7,h=o/d,p=l/u,g=Math.atan2(c,l),_=Math.hypot(c,l)/u+3.4,m=[[16,2],[16,4],[15,2],[14,3],[12,5]];m.forEach(([M,T],b)=>{const R=(T+.5)*p,v=r-o/2+(M+.5)*h,w=s+R,C=a+c-R/l*c+1.6;n.addBox({center:[v,C,w],size:[h+2.2,2.4,_],rotation:[g,0,(b-2)*.012],color:i[b%i.length]??7314321,shade:1.02});for(const P of[-h*.27,h*.27])t.addBox({center:[v+P,C+2.1,w],size:[2.2,1.8,2.2],rotation:[g,0,0],color:5464413})});const f=[{center:[315,52,717.2],size:[27,30,1.8],color:7577750},{center:[214,35,717.2],size:[21,18,1.8],color:12756307},{center:[378.5,54,686],size:[1.8,31,25],color:9547684}];f.forEach((M,T)=>{n.addBox({center:M.center,size:M.size,color:M.color,rotation:T===2?[0,0,.025]:[0,0,-.02]}),t.addBox({center:T===2?[379.8,M.center[1],M.center[2]-7]:[M.center[0],M.center[1]+8,718.4],size:T===2?[1.4,3,8]:[9,3,1.4],color:5661278})});const S=397,E=379;for(const M of[665,690])xt(e,[S,2,M],[E,81,M],4,7757892,3.5);for(let M=0;M<7;M+=1){const T=(M+1)/8,b=S+(E-S)*T,R=2+79*T;xt(e,[b,R,665],[b,R,690],2.8,8415562,3)}e.addBox({center:[386,47,704],size:[7,90,7],rotation:[0,0,-.018],color:6836280}),xt(e,[389,5,697],[367,94,704],5,7493436,5),t.addBox({center:[409,7,714],size:[14,11,13],color:7312011});for(const M of[402.5,415.5])t.addBox({center:[M,9,714],size:[2,12,15],color:5663848});return xt(t,[402,13,714],[405,20,714],1.7,5792863),xt(t,[405,20,714],[413,20,714],1.7,5792863),xt(t,[413,20,714],[416,13,714],1.7,5792863),m.length+f.length}function k_(n,e,t,i){const r=[412,432,452,472],s=[1132,1150,1168,1186];r.forEach((a,o)=>{n.addBox({center:[a,1.45,1155],size:[12,1.6,74],color:o%2===0?7623997:8479047,shade:.94});for(const l of[1117.5,1192.5])e.addBox({center:[a,2.4,l],size:[15,3,3],color:7955012});for(const l of[1125,1185])e.addBox({center:[a,16,l],size:[3,29,3],color:6903358});xt(e,[a,28,1125],[a,28,1185],1.6,8679503,1.6),s.forEach((l,c)=>{const d=(o+c)%3===0?7314260:5211469;i.addBox({center:[a,8,l],size:[2.4,13,2.4],rotation:[.06,o*.2,.08],color:4683593}),i.addBox({center:[a-3.4,10,l],size:[7,3.5,3],rotation:[0,o*.16,-.22],color:d}),i.addBox({center:[a+3.4,13,l+1],size:[7,3.5,3],rotation:[0,-o*.13,.22],color:d})})}),t.addBox({center:[470,7,1116],size:[13,10,11],color:6985874}),xt(t,[476,9,1116],[478,14,1116],3.2,7577497,3),xt(t,[463,12,1116],[464,20,1116],2,5860970),xt(t,[464,20,1116],[473,20,1116],2,5860970),xt(t,[473,20,1116],[476,12,1116],2,5860970);for(let a=0;a<3;a+=1)e.addBox({center:[468,5+a*6,1192],size:[19-a*2,6,14],rotation:[0,a%2===0?.08:-.07,0],color:a===1?11768399:12691293});return e.addBox({center:[468,14,1192],size:[3,24,3],color:7693124}),r.length}function V_(n,e,t){const i=[375,59,1095],r=[470,59,1040];for(const[u,h]of[[i[0],i[2]],[r[0],r[2]]])e.addBox({center:[u,31,h],size:[5,62,5],color:7493694}),e.addBox({center:[u,58,h],size:[14,4,4],color:8414794});xt(t,i,r,1.25,7892313,1.25);const s=[14866103,7448483,12755279,10852022],a=[16,14,17,15],o=[23,20,24,21],l=r[0]-i[0],c=r[2]-i[2],d=-Math.atan2(c,l);return s.forEach((u,h)=>{const p=.17+h*.22,g=i[0]+l*p,_=i[2]+c*p,m=o[h]??20;n.addBox({center:[g,57-m/2,_],size:[a[h]??15,m,2],rotation:[0,d,(h-1.5)*.025],color:u,shade:1.03});for(const f of[-4,4])t.addBox({center:[g+Math.cos(-d)*f,58.2,_+Math.sin(-d)*f],size:[2,3,2],rotation:[0,d,0],color:6643280})}),s.length}function H_(n,e,t,i,r){e.addBox({center:[550,27,790],size:[78,7,25],color:7951930});for(const h of[522,578])for(const p of[782,798])e.addBox({center:[h,13,p],size:[6,26,6],color:6703926});e.addBox({center:[550,10,790],size:[63,4,19],color:7164217}),t.addBox({center:[532,36,790],size:[12,11,11],color:6450280}),t.addBox({center:[532,43,790],size:[8,3,8],color:5200214}),xt(t,[538,38,790],[545,42,790],3,5923936,3),xt(t,[526,42,790],[526,49,790],2,5266007),xt(t,[526,49,790],[536,49,790],2,5266007),xt(t,[536,49,790],[538,42,790],2,5266007);for(let h=0;h<3;h+=1)e.addBox({center:[552+h*9,33,786+h*3],size:[17,2.2,2.2],rotation:[0,-.25+h*.18,.08],color:7426362}),t.addBox({center:[560+h*9,34,784+h*3],size:[6,4,4],rotation:[0,h*.17,0],color:6844780});r.addBox({center:[565,39,797],size:[4,12,4],color:7908006}),i.addBox({center:[578,39,793],size:[7,10,7],color:14729844}),t.addBox({center:[578,45,793],size:[9,2,9],color:5988185});const o=582,l=815;t.addBox({center:[o,19,l],size:[39,6,25],color:6454646});for(const h of[822,846])t.addBox({center:[o,25,h],size:[39,13,4],rotation:[0,0,h<l?-.1:.1],color:h<l?7442311:6190191});t.addBox({center:[564,25,l],size:[5,13,27],color:6849404}),n.addBox({center:[592,26,847.8],size:[16,10,1.8],color:12624721});for(const h of[823,845])xt(e,[568,19,h],[523,12,h-(h<l?5:-5)],4,7426361,4);for(const h of[824,844])xt(t,[573,16,h],[568,3,h],3,5857629,3);const c=610,d=12,u=10;for(let h=0;h<8;h+=1){const p=h/8*Math.PI*2;t.addBox({center:[c+Math.cos(p)*u,d+Math.sin(p)*u,l],size:[8.5,3.8,5],rotation:[0,0,p+Math.PI/2],color:h===1?7708822:5199700})}t.addBox({center:[c,d,l],size:[7,7,8],color:7693128})}function G_(n,e,t,i,r,s,a){const o=n.components+e.components+t.components+i.components+r.components+s.components+a.components,l=B_(n,e,t),c=k_(i,e,t,r),d=V_(n,e,t);H_(n,e,t,s,a);const h=n.components+e.components+t.components+i.components+r.components+s.components+a.components-o;return{addedComponents:h,addedTriangles:h*12,repairPanelCount:l,roofDamageFillRatio:5/18,gardenBedCount:c,laundryClothCount:d,dangerRedOrangeUsed:!1,gardenBounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}}function Sn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i=new Dt({name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1}),r=new Ye(t,i);return r.name=e.name,r.castShadow=e.castShadow??!1,r.receiveShadow=e.receiveShadow??!1,r}function W_(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof Ye))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:s.geometry.index.count/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function X_(){const n=new _t,e=new _t,t=new _t,i=new _t,r=new _t,s=new _t,a=new _t,o=new _t,l=new _t,c=new _t,d=new _t,u=new Wt;u.name="start-town-art-slice",L_(n),D_(e),I_(t,i,r,s,a,o,l,c,d),N_(t,i,r,s,a,o,l,c,d),U_(t,s,a,l,d),O_(s,a,i,o),F_(a,t,c,u),z_(l);const h=G_(i,s,a,e,l,c,d),p=new Wt;p.name="start-town-ground";const g=[Sn(n,{name:"start-town-road-ribbons",roughness:.98,receiveShadow:!0}),Sn(e,{name:"start-town-ground-microdetail",roughness:1,receiveShadow:!0}),Sn(t,{name:"start-town-masonry",roughness:.94,castShadow:!0,receiveShadow:!0}),Sn(i,{name:"start-town-wall-panels",roughness:.98,castShadow:!0,receiveShadow:!0}),Sn(r,{name:"start-town-broken-roofs",roughness:.88,castShadow:!0,receiveShadow:!0}),Sn(s,{name:"start-town-timber-props",roughness:.9,castShadow:!0,receiveShadow:!0}),Sn(a,{name:"start-town-metal-props",roughness:.64,metalness:.42,castShadow:!0,receiveShadow:!0}),Sn(o,{name:"start-town-rubble",roughness:1,castShadow:!0,receiveShadow:!0}),Sn(l,{name:"start-town-foliage",roughness:.96,receiveShadow:!0}),Sn(c,{name:"start-town-warm-glass",roughness:.34,metalness:.05,emissive:9062943,emissiveIntensity:.72}),Sn(d,{name:"start-town-cool-glass-and-water",roughness:.3,metalness:.08,emissive:1526859,emissiveIntensity:.58})];p.add(g[0],g[1]),u.add(p,...g.slice(2));const _=W_(u);u.userData.metrics=_,u.userData.lifePass=h,u.userData.replacedTerrainIds=[...mh],u.userData.replacedPropIds=[...gh],u.userData.contractBoardPosition={x:Yt.x,y:Yt.y};let m=!1;return{group:u,ground:p,replacedTerrainIds:mh,replacedPropIds:gh,dispose(){m||(m=!0,u.removeFromParent(),u.traverse(f=>{f instanceof Ye&&(f.geometry.dispose(),Array.isArray(f.material)?f.material.forEach(S=>S.dispose()):f.material.dispose())}),p.clear(),u.clear())}}}const wa="north-star-surface-v2",Ku="north-star-coherent-surface-generator",Zu="2.0.0",Ei=1314084402,Ju="procedural-dev-candidate",_h=new Map,Vt={asphalt:{resolution:1024,seedOffset:173144599,repeat:[1.08,1.03],normalStrength:3.4,cues:["graded-aggregate","hairline-crack-network","utility-cut-patch","damp-drainage-seam"]},concrete:{resolution:1024,seedOffset:202031847,repeat:[1,1],normalStrength:4.8,cues:["exposed-aggregate","rain-runoff-streaks","mineral-bloom","board-formed-repair-panel"]},roof:{resolution:512,seedOffset:7343906,repeat:[1,1],normalStrength:6.4,cues:["embedded-roof-gravel","membrane-lap-seams","ponding-water-ring","maintenance-patch"]}},vo=Object.freeze({albedo:"srgb-rgba8",normal:"linear-rgba8-tangent-space",roughness:"linear-rgba8-g-channel"});function It(n,e,t){return Math.min(t,Math.max(e,n))}function Tn(n){return Math.round(It(n,0,255))}function At(n){return n*n*(3-2*n)}function wn(n,e,t){return n+(e-n)*t}function q_(n,e,t,i=0){let r=Math.imul(n^t,374761393)^Math.imul(e^i,668265261);return r=Math.imul(r^r>>>15,2246822507),r=Math.imul(r^r>>>13,3266489909),(r^r>>>16)>>>0}function jt(n,e,t,i=0){return q_(n,e,t,i)/4294967295}function fr(n,e,t,i,r){const s=Math.floor(n/t),a=Math.floor(e/t),o=At((n-s*t)/t),l=At((e-a*t)/t),c=wn(jt(s,a,i,r),jt(s+1,a,i,r),o),d=wn(jt(s,a+1,i,r),jt(s+1,a+1,i,r),o);return wn(c,d,l)}function Yr(n,e){const t=(n%e+e)%e;return Math.min(t,e-t)}function Mc(n,e,t,i,r,s,a){const o=Math.min(n-t,i-n,e-r,s-e);return At(It(o/a,0,1))}function yc(n,e,t,i,r,s,a){if(!(n>=t&&n<=i&&e>=r&&e<=s))return 0;const l=Math.min(n-t,i-n,e-r,s-e);return 1-At(It(l/a,0,1))}function Sc(n,e,t,i,r){const s=e*4;n[s]=Tn(t),n[s+1]=Tn(i),n[s+2]=Tn(r),n[s+3]=255}function bc(n,e,t){const i=Tn(It(t,0,1)*255),r=e*4;n[r]=i,n[r+1]=i,n[r+2]=i,n[r+3]=255}function Y_(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-At(r/t),a=i*e+r,o=i*e+(e-1-r),l=n[a]??0,c=n[o]??0,d=(l+c)*.5;n[a]=wn(l,d,s),n[o]=wn(c,d,s)}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-At(r/t),a=r*e+i,o=(e-1-r)*e+i,l=n[a]??0,c=n[o]??0,d=(l+c)*.5;n[a]=wn(l,d,s),n[o]=wn(c,d,s)}}function _o(n,e){const t=Math.max(16,Math.floor(e/16));for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-At(r/t),a=(i*e+r)*4,o=(i*e+(e-1-r))*4;for(let l=0;l<3;l+=1){const c=n[a+l]??0,d=n[o+l]??0,u=(c+d)*.5;n[a+l]=Tn(wn(c,u,s)),n[o+l]=Tn(wn(d,u,s))}}for(let i=0;i<e;i+=1)for(let r=0;r<=t;r+=1){const s=1-At(r/t),a=(r*e+i)*4,o=((e-1-r)*e+i)*4;for(let l=0;l<3;l+=1){const c=n[a+l]??0,d=n[o+l]??0,u=(c+d)*.5;n[a+l]=Tn(wn(c,u,s)),n[o+l]=Tn(wn(d,u,s))}}}function Ec(n,e,t,i,r){Y_(t,i),_o(n,i),_o(e,i);const s=K_(t,i,r);return _o(s,i),{albedo:n,normal:s,roughness:e}}function K_(n,e,t){const i=new Uint8Array(e*e*4);for(let r=0;r<e;r+=1){const s=r===0?e-1:r-1,a=r===e-1?0:r+1;for(let o=0;o<e;o+=1){const l=o===0?e-1:o-1,c=o===e-1?0:o+1,d=r*e+o,u=n[r*e+l]??0,h=n[r*e+c]??0,p=n[s*e+o]??0,g=n[a*e+o]??0,_=(u-h)*t,m=(p-g)*t,f=1/Math.sqrt(_*_+m*m+1),S=d*4;i[S]=Tn((_*f*.5+.5)*255),i[S+1]=Tn((m*f*.5+.5)*255),i[S+2]=Tn(f*255),i[S+3]=255}}return i}function Z_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const l=o/n;for(let c=0;c<n;c+=1){const d=o*n+c,u=c/n,h=fr(c,o,76,e,11),p=fr(c,o,19,e,29),g=jt(c,o,e,47),_=5,m=Math.floor(c/_),f=Math.floor(o/_),S=c%_/_,E=o%_/_,M=.2+jt(m,f,e,59)*.6,T=.2+jt(m,f,e,61)*.6,b=Math.hypot(S-M,E-T),v=(jt(m,f,e,67)>.64?1:0)*It((.2-b)/.085,0,1),w=g>.991?1:0,C=g<.011?1:0,P=Yr(c+o*.21,211),L=1-At(It(P/2.2,0,1)),z=n*.59+Math.sin(o*.012)*23+Math.sin(o*.041)*4,G=1-At(It(Math.abs(c-z)/1.55,0,1)),F=z-(o-n*.42)*.43,B=(l>.42&&l<.67?1:0)*(1-At(It(Math.abs(c-F)/1.3,0,1))),K=Math.max(G,B),j=Mc(u,l,.13,.37,.61,.82,.012),ne=yc(u,l,.13,.37,.61,.82,.006),ae=n*.72+Math.sin(c*.018)*n*.011,le=Math.abs(o-ae),ke=1-At(It(le/18,0,1)),Ze=69+h*20+p*9+(g-.5)*8,ze=v*(g>.5?12:-7)+w*8-C*7,Z=j*(7+p*8)-ne*17,ie=ke*21,ee=K*32+L*13;Sc(r,d,Ze-5+ze+Z-ie-ee,Ze+1+ze+Z-ie*.84-ee,Ze+4+ze+Z-ie*.67-ee);const be=.78+v*.07+K*.1+L*.05-ke*.36-j*.06+(p-.5)*.04;bc(s,d,be),a[d]=(h-.5)*.18+(p-.5)*.11+(g-.5)*.035+v*.075+j*.035-ne*.1-L*.13-K*.24}}return Ec(r,s,a,n,t)}function J_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const l=o/n;for(let c=0;c<n;c+=1){const d=o*n+c,u=c/n,h=fr(c,o,83,e,71),p=fr(c,o,27,e,83),g=jt(c,o,e,97),_=8,m=Math.floor(c/_),f=Math.floor(o/_),S=c%_/_,E=o%_/_,M=.18+jt(m,f,e,101)*.64,T=.18+jt(m,f,e,103)*.64,b=Math.hypot(S-M,E-T),R=It((.21-b)/.085,0,1),v=Math.max(1-At(It(Yr(c+23,263)/1.7,0,1)),1-At(It(Yr(o+37,197)/1.5,0,1))),w=Math.floor(c/17),C=jt(w,0,e,107)>.57?1:0,P=(.18+jt(w,1,e,109)*.64)*17,L=Math.abs(c%17-P),z=C*(1-At(It(L/3.4,0,1)))*(.25+l*.75)*(.72+p*.28),G=(u-.72)/.23,F=(l-.63)/.18,X=Math.sqrt(G*G+F*F),B=(1-At(It((X-.35)/.65,0,1)))*(.55+h*.45),K=Mc(u,l,.12,.43,.24,.58,.014),j=yc(u,l,.12,.43,.24,.58,.007),ne=n*.66+Math.sin(o*.019)*12+Math.sin(o*.053)*2.5,le=(l>.18&&l<.84?1:0)*(1-At(It(Math.abs(c-ne)/1.25,0,1))),ke=145+h*18+(p-.5)*10,Ze=R*(g>.48?18:-12),ze=K*(8+p*5)-j*20;Sc(r,d,ke+4+Ze+B*24+ze-z*32-le*35,ke+8+Ze+B*27+ze-z*23-le*35,ke+5+Ze+B*19+ze-z*18-le*32);const Z=.76+R*.13+v*.08+B*.11+le*.1-K*.09-z*.12+(p-.5)*.05;bc(s,d,Z),a[d]=(h-.5)*.13+(p-.5)*.08+(g-.5)*.025+R*.16+B*.025+K*.04-j*.12-v*.1-le*.23}}return Ec(r,s,a,n,t)}function j_(n,e,t){const i=n*n,r=new Uint8Array(i*4),s=new Uint8Array(i*4),a=new Float32Array(i);for(let o=0;o<n;o+=1){const l=o/n;for(let c=0;c<n;c+=1){const d=o*n+c,u=c/n,h=fr(c,o,53,e,127),p=fr(c,o,13,e,131),g=jt(c,o,e,137),_=6,m=Math.floor(c/_),f=Math.floor(o/_),S=c%_/_,E=o%_/_,M=.16+jt(m,f,e,139)*.68,T=.16+jt(m,f,e,149)*.68,b=Math.hypot(S-M,E-T),R=It((.27-b)/.11,0,1),v=Math.max(1-At(It(Yr(c+19,127)/2.1,0,1)),1-At(It(Yr(o+41,173)/1.8,0,1))),w=(u-.68)/.25,C=(l-.39)/.17,P=Math.sqrt(w*w+C*C),L=1-At(It((P-.62)/.24,0,1)),z=1-At(It(Math.abs(P-.92)/.065,0,1)),G=Mc(u,l,.1,.34,.67,.84,.018),F=yc(u,l,.1,.34,.67,.84,.01),X=111+h*17+(p-.5)*9,B=R*(g>.48?25:-13),K=G*10-F*18;Sc(r,d,X+8+B+K-L*27-z*13-v*10,X+11+B+K-L*18-z*8-v*9,X+9+B+K-L*11-z*2-v*7);const j=.72+R*.18+v*.08+z*.08-L*.42-G*.08+(p-.5)*.05;bc(s,d,j),a[d]=(h-.5)*.13+(p-.5)*.07+(g-.5)*.025+R*.22+G*.04-F*.12-v*.09-L*.055+z*.035}}return Ec(r,s,a,n,t)}function Mo(n){let e=2166136261;for(let t=0;t<n.length;t+=1)e=Math.imul(e^(n[t]??0),16777619);return`fnv1a32:${(e>>>0).toString(16).padStart(8,"0")}`}function yo(n,e,t,i,r,s,a){const o=new jr(s,t,t,hn,en);return o.name=`north-star-${n}-${e}`,o.colorSpace=e==="albedo"?Gt:Zn,o.wrapS=Rn,o.wrapT=Rn,o.repeat.set(r[0],r[1]),o.anisotropy=8,o.magFilter=Ct,o.minFilter=jn,o.generateMipmaps=!0,o.unpackAlignment=1,o.needsUpdate=!0,o.userData={profile:wa,generator:Ku,version:Zu,seed:i,baseSeed:Ei,surface:n,channel:e,resolution:t,contentDigest:a,deterministic:!0,source:Ju},o}function Q_(n,e){const t=(Ei^e.seedOffset)>>>0;switch(n){case"asphalt":return Z_(e.resolution,t,e.normalStrength);case"concrete":return J_(e.resolution,t,e.normalStrength);case"roof":return j_(e.resolution,t,e.normalStrength)}}function So(n,e){const t=(Ei^e.seedOffset)>>>0;let i=_h.get(n);if(i===void 0){const a=Q_(n,e),o=Object.freeze({albedo:Mo(a.albedo),normal:Mo(a.normal),roughness:Mo(a.roughness)});i={buffers:a,digests:o},_h.set(n,i)}const{buffers:r,digests:s}=i;return Object.freeze({albedoMap:yo(n,"albedo",e.resolution,t,e.repeat,r.albedo,s.albedo),normalMap:yo(n,"normal",e.resolution,t,e.repeat,r.normal,s.normal),roughnessMap:yo(n,"roughness",e.resolution,t,e.repeat,r.roughness,s.roughness),resolution:e.resolution,digests:s})}function $_(){const n=So("asphalt",Vt.asphalt),e=So("concrete",Vt.concrete),t=So("roof",Vt.roof),i=Object.freeze({profile:wa,generator:Ku,version:Zu,seed:Ei,deterministic:!0,source:Ju,surfaces:Object.freeze({asphalt:Object.freeze({resolution:n.resolution,seed:(Ei^Vt.asphalt.seedOffset)>>>0,repeat:[Vt.asphalt.repeat[0],Vt.asphalt.repeat[1]],normalStrength:Vt.asphalt.normalStrength,channelEncoding:vo,digests:n.digests,cues:Vt.asphalt.cues}),concrete:Object.freeze({resolution:e.resolution,seed:(Ei^Vt.concrete.seedOffset)>>>0,repeat:[Vt.concrete.repeat[0],Vt.concrete.repeat[1]],normalStrength:Vt.concrete.normalStrength,channelEncoding:vo,digests:e.digests,cues:Vt.concrete.cues}),roof:Object.freeze({resolution:t.resolution,seed:(Ei^Vt.roof.seedOffset)>>>0,repeat:[Vt.roof.repeat[0],Vt.roof.repeat[1]],normalStrength:Vt.roof.normalStrength,channelEncoding:vo,digests:t.digests,cues:Vt.roof.cues})})}),r=[n.albedoMap,n.normalMap,n.roughnessMap,e.albedoMap,e.normalMap,e.roughnessMap,t.albedoMap,t.normalMap,t.roughnessMap];let s=!1;return{asphalt:n,concrete:e,roof:t,provenance:i,dispose(){s||(s=!0,r.forEach(a=>a.dispose()))}}}const Mh=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),yh=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),eM=["crosswalk-and-lane-markings","tactile-paving-and-expansion-joints","mixed-use-apartment-balconies","ground-floor-shop-canopy","elevated-rail-platform-fragment","utility-pipes-and-drainage","public-information-kiosk"],tM=[{id:"north-facade-runoff",cause:"broken gutters feed the shaded apartment wall",bounds:{minimumX:130,maximumX:380,minimumZ:700,maximumZ:756}},{id:"utility-basin-seep",cause:"a cracked rain cistern keeps the old utility apron wet",bounds:{minimumX:320,maximumX:402,minimumZ:790,maximumZ:872}},{id:"south-drain-garden",cause:"road runoff is diverted into repaired food-growing beds",bounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}],nM=["rain-capture-and-filter","patched-solar-panels","kitchen-garden","working-amber-lights","laundry-line","repaired-public-kiosk"];function Pi(n,e,t=0){return(Math.imul(Math.trunc(n)+81,73856093)^Math.imul(Math.trunc(e)+167,19349663)^Math.imul(Math.trunc(t)+265,83492791))>>>0}function $e(n,e=0){return(n>>>e&1023)/1023}function iM(n,e,t,i){const[r,s,a,o]=e;n.addQuad({corners:[[r,t,a],[r,t,o],[s,t,o],[s,t,a]],color:i})}function ir(n,e,t,i,r,s){const a=t[0]-e[0],o=t[1]-e[1],l=Math.hypot(a,o);n.addBox({center:[(e[0]+t[0])/2,i,(e[1]+t[1])/2],size:[l,.42,r],rotation:[0,-Math.atan2(o,a),0],color:s})}function rM(n){const e=new Qr(860,760,48,40);e.name="north-star-city-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.62,900),e.userData.componentCount=1;const t=new Dt({name:"north-star-city-asphalt-material",color:16777215,map:n.albedoMap,normalMap:n.normalMap,normalScale:new Pe(.42,.42),roughnessMap:n.roughnessMap,roughness:1,metalness:.04,flatShading:!1});t.userData.surfaceProfile=wa,t.userData.surfaceKind="asphalt";const i=new Ye(e,t);return i.name="north-star-city-asphalt",i.receiveShadow=!0,i}function zs(n){const[e,t,i]=n.size,r=new xn(e,t,i);r.name=`${n.name}-geometry`;const s=r.getAttribute("uv"),a=r.getAttribute("normal"),[o,l]=n.uvOffset??[0,0];for(let u=0;u<s.count;u+=1){const h=a.getX(u),p=a.getY(u),g=a.getZ(u);let _,m,f,S;Math.abs(h)>.5?(_=i,m=t,[f,S]=h>0?[.19,.31]:[.61,.07]):Math.abs(p)>.5?(_=e,m=i,[f,S]=p>0?[.29,.43]:[.73,.17]):(_=e,m=t,[f,S]=g>0?[0,0]:[.47,.59]);const E=Math.max(_,m);s.setXY(u,s.getX(u)*(_/E)+o+f,s.getY(u)*(m/E)+l+S)}s.needsUpdate=!0,r.translate(...n.center),r.userData.componentCount=1;const c=new Dt({name:`${n.name}-material`,color:16777215,map:n.surface.albedoMap,normalMap:n.surface.normalMap,normalScale:new Pe(n.normalScale,n.normalScale),roughnessMap:n.surface.roughnessMap,roughness:1,metalness:n.surfaceKind==="roof"?.05:0,flatShading:!1});c.userData.surfaceProfile=wa,c.userData.surfaceKind=n.surfaceKind;const d=new Ye(r,c);return d.name=n.name,d.castShadow=n.castShadow??!0,d.receiveShadow=n.receiveShadow??!0,d}function sM(n){return[zs({name:"north-star-city-north-apartment-shell",center:[255,78,645],size:[244,152,140],surface:n.concrete,surfaceKind:"concrete",normalScale:.34,uvOffset:[.07,.12]}),zs({name:"north-star-city-north-apartment-roof",center:[268,161,646],size:[210,18,136],surface:n.roof,surfaceKind:"roof",normalScale:.46,uvOffset:[.03,.06]}),zs({name:"north-star-city-south-clinic-shell",center:[265,57,1155],size:[224,110,126],surface:n.concrete,surfaceKind:"concrete",normalScale:.31,uvOffset:[.41,.23]}),zs({name:"north-star-city-south-clinic-roof",center:[265,116,1155],size:[232,10,132],surface:n.roof,surfaceKind:"roof",normalScale:.43,uvOffset:[.36,.47]})]}function aM(n,e,t){n.addBox({center:[430,2.5,778],size:[820,4,76],color:10266788}),n.addBox({center:[430,2.5,1030],size:[820,4,72],color:10989220}),n.addBox({center:[72,2.1,900],size:[66,3.2,330],color:9608344}),n.addBox({center:[430,3.2,816],size:[820,5.2,7],color:12895671}),n.addBox({center:[430,3.2,994],size:[820,5.2,7],color:13027257});for(let r=104;r<=760;r+=64)t.addBox({center:[r,4.56,778],size:[1.1,.24,67],color:r%128===40?8160897:8884620}),t.addBox({center:[r+27,4.56,1030],size:[1,.24,63],color:r%192===40?8489862:9279120});for(let r=112;r<=752;r+=22)r>390&&r<520||(e.addBox({center:[r,4.7,796],size:[13.5,.28,5.5],color:r%44===24?12691798:12166744}),e.addBox({center:[r+9,4.7,1012],size:[13.5,.28,5.5],color:r%66===46?12034394:12626785}));for(let r=95;r<=795;r+=78)e.addBox({center:[r,1.35,904],size:[42,.65,4.6],color:r%156===17?13154147:14078902});for(let r=560;r<=656;r+=16)for(let s=0;s<3;s+=1)e.addBox({center:[r,1.42,853+s*51],size:[8.5,.7,38],color:(r/16+s)%3===0?11844785:12699064});e.addBox({center:[542,1.4,904],size:[4.5,.65,140],color:12567477}),e.addBox({center:[674,1.4,904],size:[4.5,.65,140],color:12567477}),[[[115,876],[168,865],[205,881],[249,872]],[[301,955],[337,943],[358,922],[390,914]],[[421,853],[444,869],[467,866],[490,883]],[[706,947],[739,931],[779,936],[811,920]],[[180,1010],[205,1001],[232,1008]]].forEach((r,s)=>{for(let a=0;a<r.length-1;a+=1){const o=r[a],l=r[a+1];o!==void 0&&l!==void 0&&ir(t,o,l,1.3,s%2===0?2.4:1.7,4148555)}});for(let r=0;r<44;r+=1){const s=Pi(r,314,27),a=92+$e(s)*720,o=828+$e(s,10)*150;t.addBox({center:[a,1.42,o],size:[2.2+$e(s,20)*7,.55,1.3+$e(s,5)*3.5],rotation:[0,$e(s,15)*Math.PI,0],color:r%5===0?10328709:5924964})}}function oM(n,e,t,i,r,s){n.addBox({center:[141,118,647],size:[18,82,136],color:12630438});for(let a=0;a<4;a+=1){const o=45+a*31;for(let l=0;l<5;l+=1){const c=168+l*43;e.addBox({center:[c,o,716.15],size:[39,27,2.2],color:(a+l)%3===0?13157811:11185837}),t.addBox({center:[c,o+2,717.6],size:[24,14.5,1.5],color:(a+l)%4===0?9419715:6064531}),e.addBox({center:[c,o-7.2,718.2],size:[27.5,2.2,2.5],color:14143672})}}for(let a=0;a<3;a+=1){const o=60+a*31;n.addBox({center:[255,o,727],size:[222,4.2,22],color:10922658}),i.addBox({center:[255,o+11,736.7],size:[222,2.1,2.1],color:6913147});for(let l=0;l<=22;l+=1)i.addBox({center:[145+l*10,o+6.3,736.7],size:[1.45,11,1.45],color:l%5===0?9148822:6649461})}t.addBox({center:[215,20,717.8],size:[72,30,2],color:5209991}),e.addBox({center:[302,20,717.7],size:[84,30,2.2],color:8227206});for(let a=0;a<9;a+=1)i.addBox({center:[264+a*10,20,719],size:[1.2,29,1.3],color:10922658});r.addBox({center:[248,38,730],size:[194,5.5,28],rotation:[-.08,0,0],color:6268576}),r.addBox({center:[176,43,746],size:[42,20,3],color:14730859}),r.addBox({center:[176,43,748],size:[31,3,1.1],color:4353130});for(const a of[153,244,352])i.addBox({center:[a,85,739],size:[3.4,134,3.4],color:7240824});for(let a=0;a<5;a+=1)i.addBox({center:[164+a*44,75+a%2*31,741],size:[18,12,7],color:10200223}),i.addBox({center:[164+a*44,75+a%2*31,745],size:[11,6,1],color:6649715});Li(s,141,708,42,32,38,401),Li(s,354,718,30,24,31,409),wl(s,151,717.5,32,136,14,421),wl(s,350,717.7,54,126,18,427)}function lM(n,e,t,i,r){n.addBox({center:[265,61,1219.2],size:[215,100,2.5],color:12828073});for(let s=0;s<11;s+=1)n.addBox({center:[166+s*20,53+s%2*2,1220.8],size:[17,5.5,1.2],color:s%3===0?7315347:9088931});for(let s=0;s<4;s+=1){const a=178+s*58;e.addBox({center:[a,79,1220.7],size:[31,23,2],color:s===2?9682881:6589588}),t.addBox({center:[a,79,1222.1],size:[34,2,2.5],color:7241596})}e.addBox({center:[216,29,1220.9],size:[92,42,2],color:5406598}),t.addBox({center:[310,28,1221.2],size:[67,42,2.4],color:8687757});for(let s=0;s<7;s+=1)t.addBox({center:[281+s*10,28,1222.7],size:[1.2,40,1.1],color:11580072});i.addBox({center:[260,50,1225],size:[212,5,16],rotation:[-.1,0,0],color:13606754}),i.addBox({center:[343,63,1222.7],size:[36,28,3.2],color:6266016}),i.addBox({center:[343,63,1224.7],size:[24,3,1],color:13885384});for(let s=0;s<5;s+=1)t.addBox({center:[174+s*42,7,1223.1],size:[30,10,1.5],color:s%2===0?10118477:8222309});for(let s=0;s<7;s+=1){const a=Pi(s,571,33);t.addBox({center:[179+s*28,124,1122+s%2*33],size:[23,2.5,27],rotation:[.1,($e(a)-.5)*.08,0],color:s%3===0?4287862:5602691}),t.addBox({center:[179+s*28,122.2,1122+s%2*33],size:[2,6,31],color:6715249})}Li(r,163,1207,28,12,29,577),Li(r,362,1202,30,15,34,581)}function cM(n,e,t,i,r){n.addBox({center:[480,171,625],size:[470,17,58],color:9213586}),n.addBox({center:[468,159,625],size:[446,9,38],color:6912374});for(const s of[608,642]){e.addBox({center:[474,183,s],size:[454,3,3.4],color:7702406});for(let a=275;a<=689;a+=23)n.addBox({center:[a,180.2,s],size:[5,2.3,48],color:7832704})}t.addBox({center:[342,91,648],size:[25,158,36],color:9608088}),t.addBox({center:[418,91,737],size:[24,148,32],color:9147792,rotation:[.55,0,0]}),i.addBox({center:[490,201,623],size:[282,4,83],rotation:[0,0,-.03],color:8960181});for(let s=363;s<=620;s+=43)e.addBox({center:[s,190,625],size:[3.2,24,71],color:6387572});n.addBox({center:[706,170,625],size:[13,15,58],color:7305074,rotation:[0,0,.17]});for(let s=0;s<9;s+=1)e.addBox({center:[716+s*3.4,170+s%3*3,606+s%2*34],size:[18,1.3,1.3],rotation:[0,s%2*.1,(s-4)*.035],color:9139037});Li(r,341,681,24,28,38,607),wl(r,418,734,38,126,12,613)}function dM(n,e,t,i,r){n.addBox({center:[361,8,831],size:[80,14,80],color:8884622}),iM(i,[327,395,797,865],15.4,6927793);for(const s of[328,394])n.addBox({center:[s,18,831],size:[7,22,79],color:11580330});for(const s of[798,864])n.addBox({center:[361,18,s],size:[79,22,7],color:11580330});e.addBox({center:[420,42,739],size:[45,70,36],color:7248275}),e.addBox({center:[420,78,739],size:[49,4,40],color:10138536}),t.addBox({center:[420,49,720.5],size:[24,13,2],color:9224381}),e.addBox({center:[398,56,759],size:[4,45,4],color:7043444}),ir(e,[398,759],[376,792],35,4,7043444);for(let s=0;s<18;s+=1){const a=Pi(s,641,17),o=$e(a)*Math.PI*2,l=30+$e(a,10)*16;r.addBox({center:[361+Math.cos(o)*l,17+$e(a,20)*5,831+Math.sin(o)*l],size:[3+$e(a,5)*4,8+$e(a,15)*8,3+$e(a,7)*4],rotation:[.1,o,($e(a,12)-.5)*.35],color:s%4===0?8826456:5016923})}}function hM(n,e,t,i){const r=Yt.x,s=Yt.y;for(const a of[r-35,r+35])n.addBox({center:[a,34,s],size:[5,66,5],color:6715510});e.addBox({center:[r,57,s],size:[84,45,7],color:5336173}),t.addBox({center:[r,58,s+4],size:[73,34,2],color:7645608}),e.addBox({center:[r,57,s+5.3],size:[58,2.2,1],color:14276540}),e.addBox({center:[r-16,49,s+5.4],size:[25,2,1],color:13026734}),e.addBox({center:[r+18,65,s+5.4],size:[20,2,1],color:13026734}),i.addBox({center:[r,78,s+1],size:[45,4,5],color:16764790}),n.addBox({center:[r-24,42,s+5.6],size:[13,10,1.4],color:13936728})}function uM(n,e,t,i){for(const r of[760,1040])n.addBox({center:[470,34,r],size:[4,63,4],color:5860714}),n.addBox({center:[470,67,r],size:[20,5,9],rotation:[0,0,-.12],color:7770251}),i.addBox({center:[476,65,r+.5],size:[9,3.5,7],color:16765309});for(let r=0;r<4;r+=1){const s=1120+r*22;e.addBox({center:[442.5,5,s],size:[70,8,14],color:8481357});for(let a=0;a<7;a+=1){const o=Pi(r,a,701);t.addBox({center:[413+a*9.7,12+$e(o)*3,s],size:[5+$e(o,10)*3,12+$e(o,20)*6,5+$e(o,5)*3],rotation:[0,$e(o,15)*Math.PI,($e(o,8)-.5)*.3],color:a%3===0?9352535:5216087})}}ir(e,[403,1100],[481,1100],3.4,5,7507079),ir(e,[403,1100],[403,1195],3.4,5,7507079),ir(n,[170,1222],[350,1222],91,1.5,7175287);for(let r=0;r<6;r+=1)e.addBox({center:[188+r*28,82-r%2*3,1224],size:[18,17+r%3*4,1.2],rotation:[0,0,(r%2===0?-1:1)*.045],color:[14993007,7317410,14274738][r%3]??14274738});for(let r=0;r<14;r+=1){const s=Pi(r,719,41);t.addBox({center:[412+$e(s)*60,20+$e(s,10)*5,1116+$e(s,20)*76],size:[3.2,5.5,3.2],rotation:[0,$e(s,6)*Math.PI,0],color:[14857822,12152696,7911854][r%3]??14857822})}n.addBox({center:[568,31,814],size:[82,58,38],color:6454393}),e.addBox({center:[568,35,833.6],size:[68,39,2],color:9415072});for(let r=0;r<8;r+=1)n.addBox({center:[540+r*8,34,835.2],size:[2.1,30,2.2],color:r%3===0?10250318:5466470});i.addBox({center:[593,47,835.6],size:[8,4,1.5],color:16762988}),e.addBox({center:[527,10,791],size:[30,18,24],color:10122837}),ir(n,[526,801],[542,833],7,3.2,5203555);for(let r=0;r<4;r+=1)e.addBox({center:[397+r*14,9+r%2*9,1204],size:[13,17,16],color:r%2===0?11570523:7441798})}function Li(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const l=Pi(o,a,19),c=e+($e(l)*2-1)*i,d=t+($e(l,10)*2-1)*r,u=7+$e(l,20)*17;n.addBox({center:[c,u/2+2.2,d],size:[3.5+$e(l,5)*6,u,3.5+$e(l,15)*6],rotation:[.08,$e(l,8)*Math.PI,($e(l,17)-.5)*.42],color:[4162388,6068308,7907671,5011024][o%4]??5011024})}}function wl(n,e,t,i,r,s,a){for(let o=0;o<s;o+=1){const l=Pi(o,a,23),c=e+($e(l)-.5)*i,d=8+$e(l,10)*r;n.addBox({center:[c,d,t],size:[3+$e(l,20)*5,9+$e(l,6)*13,2.8],rotation:[0,0,($e(l,16)-.5)*.55],color:o%3===0?8628566:4685136})}}function pn(n,e){const t=n.build();t.name=`${e.name}-geometry`;const i={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1},r=e.physical?new yl({...i,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new Dt(i),s=new Ye(t,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function fM(n){let e=0,t=0,i=0,r=0;return n.traverse(s=>{if(!(s instanceof Ye))return;e+=1,i+=1;const a=s.geometry.getAttribute("position");t+=s.geometry.index===null?a.count/3:(s.geometry.index?.count??0)/3;const o=s.geometry.userData.componentCount;typeof o=="number"&&(r+=o)}),{drawCalls:e,triangles:t,geometries:i,components:r}}function pM(){const n=new _t,e=new _t,t=new _t,i=new _t,r=new _t,s=new _t,a=new _t,o=new _t,l=new _t,c=new _t,d=new _t,u=new _t,h=new Wt;h.name="north-star-city-art-slice",aM(n,e,u),oM(t,i,r,s,o,l),lM(i,r,s,o,l),cM(a,s,t,r,l),dM(t,s,r,d,l),hM(s,o,r,c),uM(s,o,l,c),Li(l,96,822,38,52,44,733),Li(l,775,1015,48,38,38,739);const p=$_(),g=rM(p.asphalt),_=sM(p),m=[pn(n,{name:"north-star-city-curbs-and-sidewalks",roughness:.9,receiveShadow:!0}),pn(e,{name:"north-star-city-road-markings",roughness:.78,receiveShadow:!0}),pn(t,{name:"north-star-city-structural-concrete",roughness:.82,castShadow:!0,receiveShadow:!0}),pn(i,{name:"north-star-city-layered-facades",roughness:.72,castShadow:!0,receiveShadow:!0}),pn(r,{name:"north-star-city-glass",roughness:.2,metalness:.08,transparent:!0,opacity:.82,physical:!0,clearcoat:.48,clearcoatRoughness:.16}),pn(s,{name:"north-star-city-metal-infrastructure",roughness:.47,metalness:.58,castShadow:!0,receiveShadow:!0}),pn(a,{name:"north-star-city-elevated-station",roughness:.68,metalness:.28,castShadow:!0,receiveShadow:!0}),pn(o,{name:"north-star-city-signs-and-life",roughness:.61,castShadow:!0,receiveShadow:!0}),pn(l,{name:"north-star-city-causal-foliage",roughness:.86,castShadow:!0,receiveShadow:!0}),pn(c,{name:"north-star-city-working-lights",roughness:.24,emissive:10114079,emissiveIntensity:1.35,physical:!0,clearcoat:.35,clearcoatRoughness:.18}),pn(d,{name:"north-star-city-shallow-water",roughness:.13,metalness:.04,transparent:!0,opacity:.78,physical:!0,clearcoat:.86,clearcoatRoughness:.08,receiveShadow:!0}),pn(u,{name:"north-star-city-cracks-and-aggregate",roughness:.96,receiveShadow:!0})],f=new Wt;f.name="north-star-city-ground",f.add(g,m[0],m[1],m[10],m[11]),h.add(f,..._,...m.slice(2,10));const S=new Wt;S.name="north-star-contract-kiosk-anchor",S.position.set(Yt.x,0,Yt.y),S.userData.interactionPoint={x:Yt.x,y:Yt.y},h.add(S);const E=fM(h);h.userData.environmentKind="overgrown-modern-city",h.userData.oldUseSignals=[...eM],h.userData.causalGrowthZones=tM.map(T=>({...T,bounds:{...T.bounds}})),h.userData.lifeSignals=[...nM],h.userData.surfaceProfile=p.provenance.profile,h.userData.surfaceProvenance=p.provenance,h.userData.metrics=E,h.userData.replacedTerrainIds=[...Mh],h.userData.replacedPropIds=[...yh],h.userData.contractBoardPosition={x:Yt.x,y:Yt.y},h.userData.spawnPosition={x:430,y:900},h.userData.playerCorridor={centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70},h.userData.nonBlockingOverheadBounds={minimumX:245,maximumX:715,minimumZ:596,maximumZ:654,minimumY:150};let M=!1;return{group:h,ground:f,replacedTerrainIds:Mh,replacedPropIds:yh,dispose(){M||(M=!0,h.removeFromParent(),h.traverse(T=>{T instanceof Ye&&(T.geometry.dispose(),Array.isArray(T.material)?T.material.forEach(b=>b.dispose()):T.material.dispose())}),p.dispose(),f.clear(),h.clear())}}}const mM=[.68,.32,.265,.69,.15,.06],gM=[.2289,.6917,.0793],xM=[.3127,.329],vM=new Be().set(.4865709,.2656677,.1982173,.2289746,.6917385,.0792869,0,.0451134,1.0439444),_M=new Be().set(2.4934969,-.9313836,-.4027108,-.829489,1.7626641,.0236247,.0358458,-.0761724,.9568845),ia="display-p3",MM={primaries:mM,whitePoint:xM,transfer:ot,toXYZ:vM,fromXYZ:_M,luminanceCoefficients:gM,outputColorSpaceConfig:{drawingBufferColorSpace:ia}};({...je.spaces[Gt]});const yM=1.18;function SM(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(color-gamut: p3)").matches}function bM(n,e=yM){n.toneMapping=xa,n.toneMappingExposure=e,n.outputColorSpace=Gt;let t="srgb";const i=n.getContext();if(SM()&&"drawingBufferColorSpace"in i){je.define({[ia]:MM});try{n.outputColorSpace=ia,i.drawingBufferColorSpace===ia?t="display-p3":n.outputColorSpace=Gt}catch{n.outputColorSpace=Gt}}return n.domElement.dataset.outputGamut=t,n.domElement.dataset.toneMapping="agx",n.domElement.dataset.toneMappingExposure=e.toFixed(2),{gamut:t,toneMapping:"agx",exposure:e}}const ra=Object.freeze({x:510,y:680,z:510}),Sh=46,bh=.38,EM=72;function TM(n,e,t=ra){const i=Math.hypot(t.x,t.z);if(i<=Number.EPSILON)return{moveX:n,moveY:e};const r=t.z/i,s=-t.x/i,a=t.x/i,o=t.z/i;return{moveX:n*r+e*a,moveY:n*s+e*o}}function Eh(n,e="north-star"){if(e==="baseline")return{mode:"centered",targetX:n.playerX,targetY:n.playerY};const t=Math.hypot(n.facingX,n.facingY),i=t>Number.EPSILON?n.facingX/t:0,r=t>Number.EPSILON?n.facingY/t:-1;if(!(n.phase!==void 0&&n.phase!=="idle"&&Number.isFinite(n.targetX)&&Number.isFinite(n.targetY)))return{mode:"explore",targetX:n.playerX+i*Sh,targetY:n.playerY+r*Sh};const a=wM(n.targetX-n.playerX,n.targetY-n.playerY,EM);return{mode:"combat",targetX:n.playerX+a.x*bh,targetY:n.playerY+a.y*bh}}function wM(n,e,t){const i=Math.hypot(n,e);if(i<=t||i<=Number.EPSILON)return{x:n,y:e};const r=t/i;return{x:n*r,y:e*r}}const Un=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],AM=["matte","metal","emissive"],RM={head:{x:12,y:23.5,z:7.5},torso:{x:12,y:14,z:8},"left-arm":{x:7.5,y:21.5,z:7},"right-arm":{x:16.5,y:21.5,z:7},"left-leg":{x:8.5,y:13,z:7},"right-leg":{x:15,y:13,z:7},equipment:{x:12,y:16,z:10}};function Th(n,e){return Number.isFinite(n)?tn.clamp(n??e,0,1):e}function bo(n){return n*n*(3-2*n)}function wh(n=[0,0,0],e=[0,0,0],t=[1,1,1]){return{position:n,rotation:e,scale:t}}function ju(n){const e=n.paletteId==="pack-pale"||n.paletteId==="cyan"||n.paletteId==="amber",t=n.z>=9&&n.y>=15&&n.x>=5&&n.x<=15,i=n.z<=5&&n.y>=15&&n.y<=22&&n.paletteId==="rust",r=n.z>=8&&n.y>=10&&n.y<=14&&(n.paletteId==="cloth-sage"||n.paletteId==="cloth-dark");return e||t||i||r?"equipment":n.y>=24?"head":n.y>=13&&n.x<=8?"left-arm":n.y>=13&&n.x>=16?"right-arm":n.y<=12&&n.x<=11?"left-leg":n.y<=12?"right-leg":"torso"}function CM(n=_r,e=ju){const t={head:[],torso:[],"left-arm":[],"right-arm":[],"left-leg":[],"right-leg":[],equipment:[]};for(const i of n.voxels)t[e(i,n)].push(i);return Object.fromEntries(Un.map(i=>[i,{schemaVersion:2,id:`${n.id}-${i}`,name:`${n.name} / ${i}`,kind:n.kind,dimensions:n.dimensions,palette:n.palette,voxels:t[i],anchors:[],validation:{minVoxelCount:0,maxVoxelCount:n.voxels.length,requireGroundContact:!1,requireConnectedBody:!1}}]))}function PM(n){switch(n){case"matte":return new yl({color:16777215,vertexColors:!0,roughness:.72,metalness:0,sheen:.24,sheenColor:13624796,sheenRoughness:.88});case"metal":return new yl({color:16777215,vertexColors:!0,roughness:.28,metalness:.82,clearcoat:.12,clearcoatRoughness:.42});case"emissive":return new nn({color:16777215,vertexColors:!0,toneMapped:!1})}}function LM(n,e,t){return new D((e.x-n.dimensions.width/2)*t,e.y*t,(e.z-n.dimensions.depth/2)*t)}function DM(n,e,t){const i=Ou(n,{voxelSize:e,shadeFaces:!1,origin:{x:-(n.dimensions.width*e)/2-t.x,y:-t.y,z:-(n.dimensions.depth*e)/2-t.z}}),r=new Bt;return r.setAttribute("position",new Ut(i.positions,3)),r.setAttribute("normal",new Ut(i.normals,3)),r.setAttribute("color",new Ut(i.colors,3)),r.setIndex(new Ut(i.indices,1)),i.materialGroups.forEach((s,a)=>{r.addGroup(s.start,s.count,a)}),r.computeBoundingSphere(),{geometry:r,roles:i.materialGroups.map(s=>s.role)}}function Ah(n,e,t,i){const r=DM(n,e,t),s=new Ye(r.geometry,r.roles.map(a=>i[a]));return s.name=n.id,s.castShadow=!0,s.receiveShadow=!0,s}function IM(n){const e=Number.isFinite(n.timeSeconds)?n.timeSeconds:0,t=Th(n.progress,0),i=Th(n.moveAmount,1),r=Math.sin(e*2.15),s=[0,r*.32,0],a=[0,0,0],o={head:[r*.012,Math.sin(e*.72)*.035,0],torso:[.018+r*.008,0,0],"left-arm":[-.025-r*.018,0,-.035],"right-arm":[.025+r*.018,0,.035],"left-leg":[0,0,0],"right-leg":[0,0,0],equipment:[-r*.008,0,0]},l={head:[1,1,1],torso:[1,1,1],"left-arm":[1,1,1],"right-arm":[1,1,1],"left-leg":[1,1,1],"right-leg":[1,1,1],equipment:[1,1,1]};switch(n.motion){case"idle":break;case"run":{const d=Math.sin(e*10.5)*i;s[1]+=Math.abs(Math.cos(e*10.5))*1.25*i,o.torso[0]+=.1*i,o.torso[1]=Math.cos(e*10.5)*.09*i,o.head[1]-=o.torso[1]*.55,o["left-leg"][0]=d*.68,o["right-leg"][0]=-d*.68,o["left-arm"][0]=-d*.5,o["right-arm"][0]=d*.5,o.equipment[0]-=.08*i+Math.abs(d)*.035;break}case"windup":{const d=bo(t);o.torso[1]=-.42*d,o.torso[2]=.08*d,o["right-arm"][0]=-1.18*d,o["right-arm"][2]=-.25*d,o["left-arm"][0]=.38*d,o.head[1]=.2*d,o["left-leg"][0]=-.12*d,o["right-leg"][0]=.16*d;break}case"hit":{const d=bo(t);o.torso[1]=tn.lerp(-.42,.34,d),o["right-arm"][0]=tn.lerp(-1.18,1.46,d),o["right-arm"][2]=tn.lerp(-.25,.2,d),o["left-arm"][0]=tn.lerp(.38,-.2,d),o.head[1]=-o.torso[1]*.42,s[2]-=Math.sin(t*Math.PI)*2.8;break}case"recovery":{const d=1-bo(t);o.torso[1]=.34*d,o["right-arm"][0]=1.46*d,o["right-arm"][2]=.2*d,o["left-arm"][0]=-.2*d,o.head[1]=-.14*d;break}case"hurt":{const d=Math.sin(t*Math.PI);s[2]+=d*7.5,a[2]=Math.sin(t*Math.PI*2)*.06,o.torso[0]=-.34*d,o.head[0]=.28*d,o["left-arm"][0]=-.62*d,o["right-arm"][0]=-.78*d;break}case"skill":{const d=Math.sin(t*Math.PI);s[1]-=d*2.6,o.torso[0]=-.18*d,o.head[0]=.14*d,o["left-arm"][0]=.72*d,o["right-arm"][0]=.72*d,o["left-arm"][2]=-.92*d,o["right-arm"][2]=.92*d,o["left-leg"][0]=-.15*d,o["right-leg"][0]=.15*d,l.equipment=[1+d*.07,1+d*.07,1+d*.07];break}}const c=Object.fromEntries(Un.map(d=>[d,wh([0,0,0],o[d],l[d])]));return{root:wh(s,a),parts:c}}function Al(n,e){const t=new D(e.x,e.y,e.z).multiply(n.scale).applyQuaternion(n.quaternion);n.position.copy(t).multiplyScalar(-1)}function NM(n={}){const e=n.recipe??_r,t=n.voxelSize??Sa,i=n.mode??"articulated";if(!Number.isFinite(t)||t<=0)throw new RangeError("Hero voxel size must be a positive finite number.");const r=new Set,s=Object.fromEntries(AM.map(E=>{const M=n.materials?.[E],T=M??PM(E);return M===void 0&&r.add(T),[E,T]})),a=new Wt;a.name=`${e.id}-visual`;const o=new Wt;o.name=`${e.id}-motion`,a.add(o);const l=Object.fromEntries(Un.map(E=>[E,LM(e,RM[E],t)])),c=Object.fromEntries(Un.map(E=>{const M=new Wt;return M.name=`${e.id}-${E}-pivot`,[E,M]})),d=Object.fromEntries(Un.map(E=>[E,new D])),u=l.torso;for(const E of Un){const M=E==="head"||E==="left-arm"||E==="right-arm"||E==="equipment"?c.torso:o;M.add(c[E]),d[E].copy(l[E]),M===c.torso&&d[E].sub(u),c[E].position.copy(d[E])}let p=Object.fromEntries(Un.map(E=>[E,null])),g=null;const _=[];if(i==="articulated"){const E=CM(e,n.classifyVoxel??ju);p=Object.fromEntries(Un.map(M=>{const T=Ah(E[M],t,l[M],s);return _.push(T.geometry),c[M].add(T),[M,T]}))}else{g=Ah(e,t,new D,s),_.push(g.geometry),o.add(g);for(const E of Un)c[E].visible=!1}const m=ya(e,"weapon",t),f=new Wt;f.name=`${e.id}-weapon-socket`,i==="articulated"?(c["right-arm"].add(f),f.position.set(m.x-l["right-arm"].x,m.y-l["right-arm"].y,m.z-l["right-arm"].z)):(o.add(f),f.position.set(m.x,m.y,m.z));const S={root:a,motionRoot:o,mode:i,partGroups:c,partMeshes:p,mergedMesh:g,weaponSocket:f,materials:s,updatePose(E){const M=IM(E);o.position.set(...M.root.position),o.rotation.set(...M.root.rotation),o.scale.set(...M.root.scale);for(const T of Un){const b=M.parts[T],R=c[T];R.position.set(d[T].x+b.position[0],d[T].y+b.position[1],d[T].z+b.position[2]),R.rotation.set(...b.rotation),R.scale.set(...b.scale)}i==="merged"&&f.rotation.set(...M.parts["right-arm"].rotation)},attachWeapon(E,M={x:0,y:0,z:0}){f.add(E),Al(E,M)},setTint(E){for(const[M,T]of Object.entries(s))(T instanceof Dt||T instanceof nn)&&(T.color.set(E),M==="emissive"&&T instanceof nn&&T.color.multiplyScalar(2.15))},dispose(){for(const E of _)E.dispose();for(const E of r)E.dispose();a.removeFromParent()}};return S.updatePose({motion:"idle",timeSeconds:0}),S}const Ti={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const UM=new $r(-1,1,1,-1,0,1);class OM extends Bt{constructor(){super(),this.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new lt([0,2,0,0,2,0],2))}}const FM=new OM;class ns{constructor(e){this._mesh=new Ye(FM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,UM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class zM extends pi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=dn.clone(e.uniforms),this.material=new vt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ns(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Rh extends pi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class BM extends pi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class kM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Pe);this._width=i.width,this._height=i.height,t=new Ot(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zM(Ti),this.copyPass.material.blending=Ht,this.timer=new e0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Rh!==void 0&&(a instanceof Rh?i=!0:a instanceof BM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Pe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Bs={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Pe},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new rt},cameraProjectionMatrixInverse:{value:new rt},cameraWorldMatrix:{value:new rt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new D(-1,-1,-1)},sceneBoxMax:{value:new D(1,1,1)}},vertexShader:`

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
		}`},ks={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Eo={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function VM(n=5){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=HM(e),i=t.length,r=new Uint8Array(i*4);for(let a=0;a<i;++a){const o=t[a],l=2*Math.PI*o/i,c=new D(Math.cos(l),Math.sin(l),0).normalize();r[a*4]=(c.x*.5+.5)*255,r[a*4+1]=(c.y*.5+.5)*255,r[a*4+2]=127,r[a*4+3]=255}const s=new jr(r,e,e);return s.wrapS=Rn,s.wrapT=Rn,s.needsUpdate=!0,s}function HM(n){const e=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),t=e*e,i=Array(t).fill(0);let r=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(r===-1&&s===e?(s=e-2,r=0):(s===e&&(s=0),r<0&&(r=e-1)),i[r*e+s]!==0){s-=2,r++;continue}else i[r*e+s]=a++;s++,r--}return i}const Vs={defines:{SAMPLES:16,SAMPLE_VECTORS:Qu(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Pe},cameraProjectionMatrixInverse:{value:new rt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Qu(n,e,t){const i=GM(n,e,t);let r="vec3[SAMPLES](";for(let s=0;s<n;s++){const a=i[s];r+=`vec3(${a.x}, ${a.y}, ${a.z})${s<n-1?",":")"}`}return r}function GM(n,e,t){const i=[];for(let r=0;r<n;r++){const s=2*Math.PI*e*r/n,a=Math.pow(r/(n-1),t);i.push(new D(Math.cos(s),Math.sin(s),a))}return i}class WM{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,r,s;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),d=(3-Math.sqrt(3))/6,u=(l+c)*d,h=l-u,p=c-u,g=e-h,_=t-p;let m,f;g>_?(m=1,f=0):(m=0,f=1);const S=g-m+d,E=_-f+d,M=g-1+2*d,T=_-1+2*d,b=l&255,R=c&255,v=this.perm[b+this.perm[R]]%12,w=this.perm[b+m+this.perm[R+f]]%12,C=this.perm[b+1+this.perm[R+1]]%12;let P=.5-g*g-_*_;P<0?i=0:(P*=P,i=P*P*this._dot(this.grad3[v],g,_));let L=.5-S*S-E*E;L<0?r=0:(L*=L,r=L*L*this._dot(this.grad3[w],S,E));let z=.5-M*M-T*T;return z<0?s=0:(z*=z,s=z*z*this._dot(this.grad3[C],M,T)),70*(i+r+s)}noise3d(e,t,i){let r,s,a,o;const c=(e+t+i)*.3333333333333333,d=Math.floor(e+c),u=Math.floor(t+c),h=Math.floor(i+c),p=1/6,g=(d+u+h)*p,_=d-g,m=u-g,f=h-g,S=e-_,E=t-m,M=i-f;let T,b,R,v,w,C;S>=E?E>=M?(T=1,b=0,R=0,v=1,w=1,C=0):S>=M?(T=1,b=0,R=0,v=1,w=0,C=1):(T=0,b=0,R=1,v=1,w=0,C=1):E<M?(T=0,b=0,R=1,v=0,w=1,C=1):S<M?(T=0,b=1,R=0,v=0,w=1,C=1):(T=0,b=1,R=0,v=1,w=1,C=0);const P=S-T+p,L=E-b+p,z=M-R+p,G=S-v+2*p,F=E-w+2*p,X=M-C+2*p,B=S-1+3*p,K=E-1+3*p,j=M-1+3*p,ne=d&255,ae=u&255,le=h&255,ke=this.perm[ne+this.perm[ae+this.perm[le]]]%12,Ze=this.perm[ne+T+this.perm[ae+b+this.perm[le+R]]]%12,ze=this.perm[ne+v+this.perm[ae+w+this.perm[le+C]]]%12,Z=this.perm[ne+1+this.perm[ae+1+this.perm[le+1]]]%12;let ie=.6-S*S-E*E-M*M;ie<0?r=0:(ie*=ie,r=ie*ie*this._dot3(this.grad3[ke],S,E,M));let ee=.6-P*P-L*L-z*z;ee<0?s=0:(ee*=ee,s=ee*ee*this._dot3(this.grad3[Ze],P,L,z));let be=.6-G*G-F*F-X*X;be<0?a=0:(be*=be,a=be*be*this._dot3(this.grad3[ze],G,F,X));let Ne=.6-B*B-K*K-j*j;return Ne<0?o=0:(Ne*=Ne,o=Ne*Ne*this._dot3(this.grad3[Z],B,K,j)),32*(r+s+a+o)}noise4d(e,t,i,r){const s=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let d,u,h,p,g;const _=(e+t+i+r)*l,m=Math.floor(e+_),f=Math.floor(t+_),S=Math.floor(i+_),E=Math.floor(r+_),M=(m+f+S+E)*c,T=m-M,b=f-M,R=S-M,v=E-M,w=e-T,C=t-b,P=i-R,L=r-v,z=w>C?32:0,G=w>P?16:0,F=C>P?8:0,X=w>L?4:0,B=C>L?2:0,K=P>L?1:0,j=z+G+F+X+B+K,ne=a[j][0]>=3?1:0,ae=a[j][1]>=3?1:0,le=a[j][2]>=3?1:0,ke=a[j][3]>=3?1:0,Ze=a[j][0]>=2?1:0,ze=a[j][1]>=2?1:0,Z=a[j][2]>=2?1:0,ie=a[j][3]>=2?1:0,ee=a[j][0]>=1?1:0,be=a[j][1]>=1?1:0,Ne=a[j][2]>=1?1:0,ve=a[j][3]>=1?1:0,dt=w-ne+c,He=C-ae+c,et=P-le+c,se=L-ke+c,we=w-Ze+2*c,Re=C-ze+2*c,st=P-Z+2*c,We=L-ie+2*c,Ve=w-ee+3*c,at=C-be+3*c,tt=P-Ne+3*c,I=L-ve+3*c,Nt=w-1+4*c,Xe=C-1+4*c,A=P-1+4*c,x=L-1+4*c,O=m&255,k=f&255,Y=S&255,re=E&255,de=o[O+o[k+o[Y+o[re]]]]%32,J=o[O+ne+o[k+ae+o[Y+le+o[re+ke]]]]%32,Q=o[O+Ze+o[k+ze+o[Y+Z+o[re+ie]]]]%32,he=o[O+ee+o[k+be+o[Y+Ne+o[re+ve]]]]%32,Ae=o[O+1+o[k+1+o[Y+1+o[re+1]]]]%32;let ce=.6-w*w-C*C-P*P-L*L;ce<0?d=0:(ce*=ce,d=ce*ce*this._dot4(s[de],w,C,P,L));let oe=.6-dt*dt-He*He-et*et-se*se;oe<0?u=0:(oe*=oe,u=oe*oe*this._dot4(s[J],dt,He,et,se));let Ee=.6-we*we-Re*Re-st*st-We*We;Ee<0?h=0:(Ee*=Ee,h=Ee*Ee*this._dot4(s[Q],we,Re,st,We));let De=.6-Ve*Ve-at*at-tt*tt-I*I;De<0?p=0:(De*=De,p=De*De*this._dot4(s[he],Ve,at,tt,I));let Fe=.6-Nt*Nt-Xe*Xe-A*A-x*x;return Fe<0?g=0:(Fe*=Fe,g=Fe*Fe*this._dot4(s[Ae],Nt,Xe,A,x)),27*(d+u+h+p+g)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,r){return e[0]*t+e[1]*i+e[2]*r}_dot4(e,t,i,r,s){return e[0]*t+e[1]*i+e[2]*r+e[3]*s}}class On extends pi{constructor(e,t,i=512,r=512,s,a,o){super(),this.width=i,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=VM(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Ot(this.width,this.height,{type:Xt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new vt({defines:Object.assign({},Bs.defines),uniforms:dn.clone(Bs.uniforms),vertexShader:Bs.vertexShader,fragmentShader:Bs.fragmentShader,blending:Ht,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Vm,this.normalMaterial.blending=Ht,this.pdMaterial=new vt({defines:Object.assign({},Vs.defines),uniforms:dn.clone(Vs.uniforms),vertexShader:Vs.vertexShader,fragmentShader:Vs.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new vt({defines:Object.assign({},ks.defines),uniforms:dn.clone(ks.uniforms),vertexShader:ks.vertexShader,fragmentShader:ks.fragmentShader,blending:Ht}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new vt({uniforms:dn.clone(Ti.uniforms),vertexShader:Ti.vertexShader,fragmentShader:Ti.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Uo,blendDst:Ur,blendEquation:bn,blendSrcAlpha:No,blendDstAlpha:Ur,blendEquationAlpha:bn}),this.blendMaterial=new vt({uniforms:dn.clone(Eo.uniforms),vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:tu,blendSrc:Uo,blendDst:Ur,blendEquation:bn,blendSrcAlpha:No,blendDstAlpha:Ur,blendEquationAlpha:bn}),this._fsQuad=new ns(null),this._originalClearColor=new Ue,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Ri,this.depthTexture.format=di,this.depthTexture.type=hr,this.normalRenderTarget=new Ot(this.width,this.height,{minFilter:Rt,magFilter:Rt,type:Xt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const i=this.normalTexture?1:0,r=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Qu(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case On.OUTPUT.Off:break;case On.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Ht,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case On.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Ht,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case On.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Ht,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case On.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case On.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Ht,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case On.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=Ht,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,r,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new WM,i=e*e*4,r=new Uint8Array(i);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const l=a,c=o;r[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,r[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,r[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,r[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const s=new jr(r,e,e,hn,en);return s.wrapS=Rn,s.wrapT=Rn,s.needsUpdate=!0,s}}On.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Hs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class XM extends pi{constructor(){super(),this.isOutputPass=!0,this.uniforms=dn.clone(Hs.uniforms),this.material=new Mu({name:Hs.name,uniforms:this.uniforms,vertexShader:Hs.vertexShader,fragmentShader:Hs.fragmentShader}),this._fsQuad=new ns(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},je.getTransfer(this._outputColorSpace)===ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===kl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Hl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===xa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Wl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Gl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class qM extends pi{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ue}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const Gs={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Pe(1/1024,1/512)}},vertexShader:`

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

		}`},Ws={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Pe(1/1024,1/512)}},vertexShader:`

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

		}`},To={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Pe(1/1024,1/512)}},vertexShader:`

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

		}`};class YM extends pi{constructor(){super(),this._edgesRT=new Ot(1,1,{depthBuffer:!1,type:Xt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Ot(1,1,{depthBuffer:!1,type:Xt}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new qt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Ct,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new qt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=Rt,this._searchTexture.minFilter=Rt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=dn.clone(Gs.uniforms),this._materialEdges=new vt({defines:Object.assign({},Gs.defines),uniforms:this._uniformsEdges,vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader}),this._uniformsWeights=dn.clone(Ws.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new vt({defines:Object.assign({},Ws.defines),uniforms:this._uniformsWeights,vertexShader:Ws.vertexShader,fragmentShader:Ws.fragmentShader}),this._uniformsBlend=dn.clone(To.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new vt({uniforms:this._uniformsBlend,vertexShader:To.vertexShader,fragmentShader:To.fragmentShader}),this._fsQuad=new ns(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const KM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ue(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class pr extends pi{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new Pe(e.x,e.y):new Pe(256,256),this.clearColor=new Ue(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ot(s,a,{type:Xt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new Ot(s,a,{type:Xt});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const h=new Ot(s,a,{type:Xt});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),a=Math.round(a/2)}const o=KM;this.highPassUniforms=dn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Pe(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=dn.clone(Ti.uniforms),this.blendMaterial=new vt({uniforms:this.copyUniforms,vertexShader:Ti.vertexShader,fragmentShader:Ti.fragmentShader,premultipliedAlpha:!0,blending:ca,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ue,this._oldClearAlpha=1,this._basic=new nn,this._fsQuad=new ns(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Pe(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=pr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=pr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new vt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Pe(.5,.5)},direction:{value:new Pe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}pr.BlurDirectionX=new Pe(1,0);pr.BlurDirectionY=new Pe(0,1);const ZM=2,JM=4;class jM{renderer;scene;camera;maxPixelRatio;configuredPixelRatio;onFallback;composer=null;passes=[];width=1;height=1;pixelRatio=1;samples=0;mode="direct";gtaoEnabled=!1;bloomEnabled=!1;smaaEnabled=!1;fallbackReason=null;disposed=!1;constructor(e,t,i,r={}){this.renderer=e,this.scene=t,this.camera=i,this.maxPixelRatio=$M(r.maxPixelRatio??ZM),this.configuredPixelRatio=Number.isFinite(r.pixelRatio)?r.pixelRatio:void 0,this.onFallback=r.onFallback;const s=e.getSize(new Pe);this.width=Xs(s.x),this.height=Xs(s.y),this.pixelRatio=this.resolvePixelRatio(r.pixelRatio),this.createComposer(r),this.resize(this.width,this.height,this.pixelRatio)}render(e){if(!this.disposed){if(this.composer!==null)try{this.composer.render(e);return}catch(t){this.fallbackToDirect(t)}this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}}resize(e,t,i){if(!this.disposed&&(this.width=Xs(e),this.height=Xs(t),this.pixelRatio=this.resolvePixelRatio(i),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.composer!==null))try{this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(this.width,this.height)}catch(r){this.fallbackToDirect(r)}}getStatus(){return{mode:this.mode,width:this.width,height:this.height,pixelRatio:this.pixelRatio,samples:this.samples,gtao:this.gtaoEnabled,bloom:this.bloomEnabled,smaa:this.smaaEnabled,fallbackReason:this.fallbackReason}}dispose(){this.disposed||(this.disposed=!0,this.disposeComposer())}createComposer(e){if(!QM(this.renderer)){this.fallbackReason="Half-float color targets are unavailable.";return}const t=Ch(e.samples??JM),i=Ch(this.renderer.capabilities.maxSamples);this.samples=i>=2?Math.min(t,i):0,this.samples===1&&(this.samples=0);let r=null,s=null;const a=[];try{s=new Ot(1,1,{depthBuffer:!0,stencilBuffer:!1,type:Xt,minFilter:Ct,magFilter:Ct,samples:this.samples}),s.texture.name="PC Ultra half-float scene",s.texture.colorSpace=Hr,r=new kM(this.renderer,s),r.setPixelRatio(this.pixelRatio),r.setSize(this.width,this.height);const o=new qM(this.scene,this.camera);if(r.addPass(o),a.push(o),e.gtao??!0){const c=new On(this.scene,this.camera,this.width*this.pixelRatio,this.height*this.pixelRatio);c.blendIntensity=.52,c.updateGtaoMaterial({radius:.2,thickness:1,distanceFallOff:1,samples:12,screenSpaceRadius:!0}),c.updatePdMaterial({rings:2,samples:8,radius:7}),r.addPass(c),a.push(c),this.gtaoEnabled=!0}if(e.bloom??!0){const c=new pr(new Pe(this.width*this.pixelRatio,this.height*this.pixelRatio),.22,.18,1.15);r.addPass(c),a.push(c),this.bloomEnabled=!0}if(e.smaa??!0){const c=new YM;r.addPass(c),a.push(c),this.smaaEnabled=!0}const l=new XM;r.addPass(l),a.push(l),this.composer=r,this.passes=a,this.mode=this.samples>0?"half-float-msaa":"half-float"}catch(o){r===null&&s?.dispose(),Lh(r,a),this.resetFeatureStatus(),this.fallbackReason=Ph(o),this.onFallback?.(o)}}resolvePixelRatio(e){const t=typeof window>"u"?1:window.devicePixelRatio||1,i=e??this.configuredPixelRatio??t;return tn.clamp(Number.isFinite(i)?i:1,1,this.maxPixelRatio)}fallbackToDirect(e){this.fallbackReason=Ph(e),this.disposeComposer(),this.resetFeatureStatus(),this.renderer.resetState(),this.renderer.setRenderTarget(null),this.onFallback?.(e)}disposeComposer(){Lh(this.composer,this.passes),this.composer=null,this.passes=[]}resetFeatureStatus(){this.mode="direct",this.samples=0,this.gtaoEnabled=!1,this.bloomEnabled=!1,this.smaaEnabled=!1}}function QM(n){return n.capabilities.isWebGL2&&n.extensions.has("EXT_color_buffer_float")}function $M(n){return Number.isFinite(n)?Math.max(1,n):1}function Xs(n){return Number.isFinite(n)?Math.max(1,Math.round(n)):1}function Ch(n){return Number.isFinite(n)?Math.max(0,Math.floor(n)):0}function Ph(n){return n instanceof Error?n.message:"Post-processing initialization or rendering failed."}function Lh(n,e){for(const t of e)try{t.dispose()}catch{}try{n?.dispose()}catch{}}const ey=""+new URL("reclaimed-meadow-v1-CgTL2cqk.webp",import.meta.url).href,qs=854,ci=480,ty=600,ny=360,iy=.98,ry=1075,Dh=new D(ra.x,ra.y,ra.z),$u=2.1,ef=2,Ih=4,sy=3.4,Ys=64,Nh=14148051,wo=ya(_r,"weapon",Sa),Rl=ya(ba,"grip",$u),Cl=ya(Ea,"grip",ef),Ks=new D;class ay{renderer;qualityProfile;cameraCompositionProfile;cameraViewHeight;ultraPipeline=null;scene=new fu;camera;environmentArt;cameraTarget=new D;playerGroup=new Wt;playerBody;playerHeroVisual;bladeMesh;impactMesh;playerShadow;companionGroup=new Wt;companionBody;companionShadow;enemyVisuals=new Map;lootVisuals=new Map;ringEffects=[];burstEffects=[];targetRing;windupRing;reusableMatrix=new rt;reusablePosition=new D;reusableQuaternion=new Hn;reusableScale=new D(1,1,1);keyLight=new Bd(16771261,2.45);keyLightTarget=new Pt;effectLight=new oc(6415825,0,390,2);contextLostHandler;contextRestoredHandler;environmentTarget=null;groundTexture=null;attackAnimation=0;attackWeapon="blade";effectLightEnergy=0;internalRenderWidth=qs;internalRenderHeight=ci;viewportCssWidth=0;viewportCssHeight=0;resizeObserver=null;windowResizeHandler=null;companionInitialized=!1;companionReaction=0;cameraTrauma=0;heroHurtAnimation=0;heroSkillAnimation=0;lastPlayerX=null;lastPlayerY=null;elapsed=0;disposed=!1;constructor(e,t,i={}){this.qualityProfile=i.qualityProfile??"baseline",this.cameraCompositionProfile=i.cameraCompositionProfile??"baseline",this.cameraViewHeight=this.qualityProfile==="pc-ultra"?ny:ty,this.renderer=new jv({antialias:!0,alpha:!1,depth:!0,powerPreference:"high-performance",precision:"highp",preserveDrawingBuffer:!1}),bM(this.renderer,this.qualityProfile==="pc-ultra"?iy:void 0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=zr,this.renderer.setPixelRatio(this.qualityProfile==="pc-ultra"?Math.min(2,Math.max(1,window.devicePixelRatio||1)):1),this.renderer.setSize(qs,ci,!1),this.renderer.domElement.dataset.testid="game-canvas",this.renderer.domElement.dataset.antialias=this.renderer.getContextAttributes().antialias===!0?"msaa":"none",this.renderer.domElement.dataset.qualityProfile=this.qualityProfile,this.renderer.domElement.dataset.cameraCompositionProfile=this.cameraCompositionProfile,this.renderer.domElement.dataset.environmentProfile=i.environmentProfile??"start-town",this.renderer.domElement.setAttribute("aria-label","辺境遺物録 ボクセルゲーム画面"),e.append(this.renderer.domElement),this.contextLostHandler=s=>{s.preventDefault(),i.onContextLost?.()},this.contextRestoredHandler=()=>{this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting(),i.onContextRestored?.()},this.renderer.domElement.addEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.addEventListener("webglcontextrestored",this.contextRestoredHandler),this.scene.background=new Ue(Nh),this.scene.fog=new nc(Nh,this.qualityProfile==="pc-ultra"?1140:900,this.qualityProfile==="pc-ultra"?2700:2450),this.createLighting(),this.qualityProfile==="pc-ultra"&&this.createEnvironmentLighting();const r=this.cameraViewHeight*(qs/ci);this.camera=new $r(-r/2,r/2,this.cameraViewHeight/2,-this.cameraViewHeight/2,1,3200),this.initializeViewportSync(e),this.qualityProfile==="pc-ultra"&&(this.ultraPipeline=new jM(this.renderer,this.scene,this.camera,{maxPixelRatio:2,samples:4,gtao:!0,bloom:!0,smaa:!0,onFallback:s=>{this.renderer.domElement.dataset.ultraFallback=s instanceof Error?s.message:"post-processing"}}),this.ultraPipeline.resize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.syncUltraPipelineDataset()),this.createGround(t),this.environmentArt=i.environmentProfile==="north-star-city"?pM():X_(),this.scene.add(this.environmentArt.group),this.createFieldGrowth(t,this.environmentArt.replacedTerrainIds),this.createTerrain(t,this.environmentArt.replacedTerrainIds),this.createProps(t,this.environmentArt.replacedPropIds),this.createLandmarkSignals(t),this.playerBody=Uh(_r,Sa),this.playerGroup.add(this.playerBody),this.playerBody.castShadow=!0,this.playerBody.receiveShadow=!0,this.playerHeroVisual=this.qualityProfile==="pc-ultra"?NM({mode:"articulated"}):null,this.playerHeroVisual!==null&&(this.playerBody.visible=!1,this.playerGroup.add(this.playerHeroVisual.root)),this.bladeMesh=Pr(ba,$u,1),this.impactMesh=Pr(Ea,ef,1),zh(this.bladeMesh,"blade"),zh(this.impactMesh,"impact"),this.bladeMesh.castShadow=!0,this.impactMesh.castShadow=!0,this.playerHeroVisual!==null?(this.playerHeroVisual.attachWeapon(this.bladeMesh,Rl),this.playerHeroVisual.attachWeapon(this.impactMesh,Cl)):this.playerGroup.add(this.bladeMesh,this.impactMesh),this.playerShadow=Lr(38,22,.32),this.playerGroup.add(this.playerShadow),this.scene.add(this.playerGroup),this.targetRing=Oh(6415825,.76),this.windupRing=Oh(16034128,.92),this.targetRing.visible=!1,this.windupRing.visible=!1,this.scene.add(this.targetRing,this.windupRing),this.companionBody=Uh(fc,Vu),this.companionBody.castShadow=!0,this.companionBody.receiveShadow=!0,this.companionShadow=Lr(24,15,.24),this.companionGroup.name="visual-only-companion",this.companionGroup.add(this.companionBody,this.companionShadow),this.companionGroup.visible=i.companionPreview===!0,this.scene.add(this.companionGroup),this.syncEnemies(t),this.syncLoot(t),this.snapCamera(t),this.update(t,[],0,0)}update(e,t,i,r,s){if(this.disposed)return;const a=Math.min(.05,Math.max(0,r/1e3));this.elapsed+=a,this.handleEvents(t),this.syncPlayer(e,a,s),this.syncCompanion(e,a),this.syncEnemies(e),this.syncCombatPresentation(e,s),this.syncLoot(e),this.updateEffects(a),this.updateCamera(e,a,s),this.updateAmbientMotion(e,i/1e3),this.ultraPipeline!==null?(this.ultraPipeline.render(a),this.syncUltraPipelineDataset()):this.renderer.render(this.scene,this.camera)}initializeViewportSync(e){if(this.updateViewportSize(e.clientWidth,e.clientHeight),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(t=>{const i=t.find(r=>r.target===e);i!==void 0&&this.updateViewportSize(i.contentRect.width,i.contentRect.height)}),this.resizeObserver.observe(e);return}typeof window<"u"&&(this.windowResizeHandler=()=>{this.updateViewportSize(e.clientWidth,e.clientHeight)},window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}updateViewportSize(e,t){if(this.disposed||e<=0||t<=0||Math.abs(e-this.viewportCssWidth)<.5&&Math.abs(t-this.viewportCssHeight)<.5)return;this.viewportCssWidth=e,this.viewportCssHeight=t;const i=tn.clamp(e/t,16/9,2.24);if(this.qualityProfile==="pc-ultra"){const a=Math.min(2,Math.max(1,window.devicePixelRatio||1));this.ultraPipeline!==null?this.ultraPipeline.resize(e,t,a):(this.renderer.setPixelRatio(a),this.renderer.setSize(Math.max(1,Math.round(e)),Math.max(1,Math.round(t)),!1)),this.internalRenderWidth=Math.max(1,Math.round(e*a)),this.internalRenderHeight=Math.max(1,Math.round(t*a));const o=this.cameraViewHeight*i;this.camera.left=-o/2,this.camera.right=o/2,this.camera.updateProjectionMatrix(),this.renderer.domElement.dataset.internalResolution=`${this.internalRenderWidth}x${this.internalRenderHeight}`,this.syncUltraPipelineDataset();return}const r=tn.clamp(Math.round(ci*i),qs,ry);if(r===this.internalRenderWidth)return;this.internalRenderWidth=r,this.internalRenderHeight=ci,this.renderer.setSize(r,ci,!1),this.renderer.domElement.dataset.internalResolution=`${r}x${ci}`;const s=this.cameraViewHeight*(r/ci);this.camera.left=-s/2,this.camera.right=s/2,this.camera.updateProjectionMatrix()}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,width:this.internalRenderWidth,height:this.internalRenderHeight}}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.domElement.removeEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.removeEventListener("webglcontextrestored",this.contextRestoredHandler),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.windowResizeHandler!==null&&typeof window<"u"&&(window.removeEventListener("resize",this.windowResizeHandler),this.windowResizeHandler=null),this.environmentArt.dispose(),this.ultraPipeline?.dispose(),this.ultraPipeline=null,this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,this.groundTexture?.dispose(),this.groundTexture=null;const e=new Set,t=new Set;this.scene.traverse(i=>{if(i instanceof Or&&i.dispose(),i instanceof Ye||i instanceof Or||i instanceof io){e.add(i.geometry);const r=i.material;Array.isArray(r)?r.forEach(s=>t.add(s)):t.add(r)}}),e.forEach(i=>i.dispose()),t.forEach(i=>i.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}syncUltraPipelineDataset(){if(this.ultraPipeline===null)return;const e=this.ultraPipeline.getStatus();this.renderer.domElement.dataset.ultraPipeline=e.mode,this.renderer.domElement.dataset.ultraGtao=String(e.gtao),this.renderer.domElement.dataset.ultraBloom=String(e.bloom),this.renderer.domElement.dataset.ultraSmaa=String(e.smaa),this.renderer.domElement.dataset.ultraSamples=String(e.samples),e.fallbackReason===null?delete this.renderer.domElement.dataset.ultraFallback:this.renderer.domElement.dataset.ultraFallback=e.fallbackReason}createLighting(){const e=new Zm(16183506,3496515,this.qualityProfile==="pc-ultra"?.42:1.55);e.name="daylight-sky-fill",this.keyLight.intensity=this.qualityProfile==="pc-ultra"?2.68:2.45,this.keyLight.name="daylight-key",this.keyLight.position.set(40,820,360),this.keyLightTarget.name="daylight-key-target",this.keyLightTarget.position.set(390,0,900),this.keyLight.target=this.keyLightTarget,this.keyLight.castShadow=!0;const t=this.qualityProfile==="pc-ultra"?2048:512;if(this.keyLight.shadow.mapSize.set(t,t),this.keyLight.shadow.bias=-.0012,this.keyLight.shadow.normalBias=1.4,this.keyLight.shadow.camera.left=-460,this.keyLight.shadow.camera.right=460,this.keyLight.shadow.camera.top=460,this.keyLight.shadow.camera.bottom=-460,this.keyLight.shadow.camera.near=160,this.keyLight.shadow.camera.far=1420,this.effectLight.name="signal-effect-light",this.effectLight.position.set(430,58,900),this.scene.add(e,this.keyLightTarget,this.keyLight,this.effectLight),this.qualityProfile==="pc-ultra"){const i=new Pt;i.name="daylight-rim-target",i.position.set(430,24,860);const r=new Bd(11134687,.62);r.name="daylight-cool-rim",r.position.set(-360,420,-280),r.target=i,this.scene.add(i,r)}}createEnvironmentLighting(){this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,delete this.renderer.domElement.dataset.environmentLightingFallback;const e=new Qv,t=new Sl(this.renderer);try{this.environmentTarget=t.fromScene(e,.04),this.scene.environment=this.environmentTarget.texture,this.scene.environmentIntensity=.26,this.renderer.domElement.dataset.environmentLighting="pmrem-ibl"}catch(i){this.renderer.domElement.dataset.environmentLighting="direct-light-fallback",this.renderer.domElement.dataset.environmentLightingFallback=i instanceof Error?i.message:"pmrem-generation"}finally{e.dispose(),t.dispose()}}createGround(e){const i=e.world.width+480,r=-240,s=e.world.height+240,a=i- -480,o=s-r,l=Math.ceil(a/Ys),c=Math.ceil(o/Ys),d=[],u=[],h=[],p=[],g=new Ue,_=new Ue(16777215);for(let b=0;b<=c;b+=1){const R=Math.min(s,r+b*Ys);for(let v=0;v<=l;v+=1){const w=Math.min(i,-480+v*Ys),C=Fh(v+401,b+809,17),P=-3.8+((C>>>9&255)/255-.5)*2.2;d.push(w,P,R),h.push((w- -480)/a,1-(R-r)/o),g.setHex(fy(w,R,b*(l+1)+v)),g.offsetHSL(((C>>>19&15)/15-.5)*.012,((C>>>4&15)/15-.5)*.035,((C>>>13&15)/15-.5)*.055),g.lerp(_,.72),u.push(g.r,g.g,g.b)}}for(let b=0;b<c;b+=1)for(let R=0;R<l;R+=1){const v=b*(l+1)+R,w=v+1,C=v+l+1,P=C+1;(b+R)%2===0?p.push(v,C,w,w,C,P):p.push(v,C,P,v,P,w)}const m=new Bt;m.setAttribute("position",new lt(d,3)),m.setAttribute("color",new lt(u,3)),m.setAttribute("uv",new lt(h,2)),m.setIndex(p),m.computeVertexNormals(),m.computeBoundingBox(),m.computeBoundingSphere();const f=new Dt({color:16777215,vertexColors:!0,roughness:.96,metalness:0,dithering:!0}),S=b=>{b.name="generated-reclaimed-meadow-v1",b.colorSpace=Gt,b.wrapS=Rn,b.wrapT=Rn,b.repeat.set(a/720,o/720),b.minFilter=jn,b.magFilter=Ct,b.anisotropy=this.qualityProfile==="pc-ultra"?this.renderer.capabilities.getMaxAnisotropy():Math.min(4,this.renderer.capabilities.getMaxAnisotropy())};this.renderer.domElement.dataset.groundTexture="loading";const E=new Km().load(ey,b=>{if(this.disposed){b.dispose();return}S(b),this.groundTexture=b,f.map=b,f.color.setHex(16777215),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="ready"},void 0,()=>{this.groundTexture?.dispose(),this.groundTexture=null,!this.disposed&&(f.map=null,f.color.setHex(10991757),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="fallback")});S(E),this.groundTexture=E,f.map=E;const M=new Ye(m,f);M.name="continuous-reclaimed-ground",M.receiveShadow=!0,this.scene.add(M);const T=new io(new Dd(new xn(e.world.width,8,e.world.height)),new Ml({color:6458738,transparent:!0,opacity:.12}));T.position.set(e.world.width/2,-7,e.world.height/2),this.scene.add(T)}createFieldGrowth(e,t=new Set){const r=Math.ceil(e.world.width/142),s=Math.ceil(e.world.height/142),a=[],o=(m,f,S,E,M=1,T=1,b=1)=>{a.push({x:m,y:f,z:S,rotation:(E>>>8)%16*(Math.PI/8),scaleX:M*(.78+(E>>>3)%7*.055),scaleY:b*(.82+(E>>>19)%6*.06),scaleZ:T*(.8+(E>>>13)%7*.05)})};for(let m=0;m<s;m+=1)for(let f=0;f<r;f+=1){const S=(Math.imul(f+11,73856093)^Math.imul(m+17,19349663))>>>0;if(S%100>15)continue;const E=(f+.5)*142+((S>>>3&255)/255-.5)*52,M=(m+.5)*142+((S>>>11&255)/255-.5)*52;E<24||M<24||E>e.world.width-24||M>e.world.height-24||Math.abs(M-900)<88||e.world.terrain.some(T=>E>T.bounds.x-10&&E<T.bounds.x+T.bounds.width+10&&M>T.bounds.y-10&&M<T.bounds.y+T.bounds.height+10)||o(E,.8,M,S,.84+(S>>>21)%4*.1,.82+(S>>>25)%4*.1,.82)}if(e.world.terrain.forEach((m,f)=>{if(t.has(m.id))return;const S=m.bounds,E=S.x,M=S.x+S.width,T=S.y,b=S.y+S.height,R=E+S.width/2,v=T+S.height/2,w=Fh(f+31,S.x,S.y);switch(m.kind){case"building":{const C=m.height+10.5;o(E+S.width*.2,C,T+S.height*.22,w,1.25,1,.78),o(M-S.width*.16,C,b-S.height*.2,w^1540483477,1.38,.92,.9),o(R+S.width*.08,C,b-S.height*.1,w^3550635116,2.05,.7,.52),o(E-3,.8,v-S.height*.2,w^668265261,1.15,1.32),o(M+2,.8,v+S.height*.22,w^374761393,1.1,1.26);break}case"wall":{const C=S.width>=S.height;for(let P=0;P<3;P+=1){const L=.16+P*.34,z=w^Math.imul(P+7,73244475);o(C?E+S.width*L:R,m.height+.8,C?v:T+S.height*L,z,C?1.42:.82,C?.82:1.42,.72)}o(C?R+S.width*.26:E-3,.8,C?b+2:v+S.height*.2,w^2654435769,C?1.25:.94,C?.94:1.25);break}case"pillar":o(R,m.height+.8,v,w,1.02,1.02,.72),o(M+1,.8,b-S.height*.12,w^2135587861,1.2,1.2);break;case"rock":o(R+S.width*.25,m.height+.8,v+S.height*.3,w,1.28,1.14,.9);break;case"water":{[[E+S.width*.12,T-2,!1],[E+S.width*.48,T-4,!1],[M-S.width*.12,T+1,!0],[M+2,T+S.height*.28,!1],[M-1,b-S.height*.18,!0],[E+S.width*.64,b+2,!1],[E+S.width*.26,b-1,!0],[E-3,T+S.height*.54,!1]].forEach(([P,L,z],G)=>{o(P,z?m.height+.5:.8,L,w^Math.imul(G+13,668265261),1.02,1.24,.92)});break}}}),a.length===0)return;const l=cy(),c=new Dt({color:16777215,vertexColors:!0,roughness:.88,metalness:0}),d=new Or(l,c,a.length),u=new rt,h=new D,p=new Hn,g=new D,_=new D(0,1,0);a.forEach((m,f)=>{h.set(m.x,m.y,m.z),p.setFromAxisAngle(_,m.rotation),g.set(m.scaleX,m.scaleY,m.scaleZ),u.compose(h,p,g),d.setMatrixAt(f,u)}),d.instanceMatrix.needsUpdate=!0,d.computeBoundingSphere(),d.name="reclaiming-growth",d.receiveShadow=!0,this.scene.add(d)}createTerrain(e,t=new Set){const i={building:new Dt({color:11119246,roughness:.92}),wall:new Dt({color:9737866,roughness:.96}),rock:new Dt({color:8360315,roughness:.98}),pillar:new Dt({color:9799578,roughness:.9}),water:new Dt({color:5083553,transparent:!0,opacity:.82,roughness:.28,metalness:.04})};for(const r of e.world.terrain){if(t.has(r.id))continue;const s=new xn(r.bounds.width,r.height,r.bounds.height),a=new Ye(s,i[r.kind]);if(a.position.set(r.bounds.x+r.bounds.width/2,r.height/2,r.bounds.y+r.bounds.height/2),a.name=r.id,a.receiveShadow=r.kind!=="water",a.castShadow=r.kind==="building"||r.kind==="wall"||r.kind==="pillar",this.scene.add(a),r.kind!=="water"){const o=new io(new Dd(s),new Ml({color:r.kind==="pillar"?7362427:6450525,transparent:!0,opacity:.34}));o.position.copy(a.position),this.scene.add(o)}if(r.kind==="building"){const o=new Ye(new xn(r.bounds.width+18,10,r.bounds.height+18),new Dt({color:12020809,roughness:.86}));o.position.set(a.position.x,r.height+5,a.position.z),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o)}}}createProps(e,t=new Set){for(const i of e.world.props){if(t.has(i.id))continue;const r=uy(i.kind),s=Pr(r,sy,1),a=new Wt;a.position.set(i.x,0,i.y),a.rotation.y=i.rotation,a.add(s,Lr(28,17,.24)),i.kind==="lamp"?a.scale.setScalar(.72):i.kind==="signpost"?a.scale.set(.62,.78,.62):i.kind==="relay"&&a.scale.setScalar(1.18),a.name=i.id,this.scene.add(a)}}createLandmarkSignals(e){const t=[6415825,16034128,8546725];e.world.landmarks.forEach((i,r)=>{const s=new nn({color:t[r]??6415825,transparent:!0,opacity:.12,side:sn,depthWrite:!1}),a=new Ye(new bi(54,59,40),s);a.rotation.x=-Math.PI/2,a.position.set(i.center.x,2,i.center.y),a.name=`landmark-${i.id}`,this.scene.add(a)})}syncPlayer(e,t,i){const r=e.player,s=this.lastPlayerX===null||this.lastPlayerY===null?0:Math.hypot(r.x-this.lastPlayerX,r.y-this.lastPlayerY);this.lastPlayerX=r.x,this.lastPlayerY=r.y,this.playerGroup.position.x=r.x,this.playerGroup.position.z=r.y,this.playerGroup.position.y=Math.sin(this.elapsed*5.2)*.6,this.playerGroup.rotation.y=Math.atan2(-r.facingX,-r.facingY),this.bladeMesh.visible=r.weaponId==="blade",this.impactMesh.visible=r.weaponId==="impact",this.attackAnimation=Math.max(0,this.attackAnimation-t*4.8);const a=1-this.attackAnimation,o=this.attackAnimation>0?Math.sin(a*Math.PI)*(this.attackWeapon==="impact"?1.42:1.05):0;this.bladeMesh.rotation.z=-.42-o,this.impactMesh.rotation.z=-.28-o;const l=r.invulnerableTicks>0&&e.tick%2===0?12124148:16777215;if(this.playerHeroVisual===null){Pl(this.bladeMesh,"blade"),Pl(this.impactMesh,"impact"),ly(this.playerBody,l);return}Al(this.bladeMesh,Rl),Al(this.impactMesh,Cl),this.heroHurtAnimation=Math.max(0,this.heroHurtAnimation-t*3.8),this.heroSkillAnimation=Math.max(0,this.heroSkillAnimation-t*1.45);const c=t>Number.EPSILON?tn.clamp(s/t/118,0,1):0,d=dy(i,this.heroHurtAnimation,this.heroSkillAnimation,this.attackAnimation,c);this.playerHeroVisual.updatePose({motion:d.motion,timeSeconds:this.elapsed,progress:d.progress,moveAmount:c}),this.playerHeroVisual.setTint(l)}syncCompanion(e,t){const i=e.player,r=Math.hypot(i.facingX,i.facingY),s=r>Number.EPSILON?i.facingX/r:0,a=r>Number.EPSILON?i.facingY/r:-1,o=i.x-s*32-a*38,l=i.y-a*32+s*38,c=(this.companionGroup.position.x-o)**2+(this.companionGroup.position.z-l)**2;if(!this.companionInitialized||c>140**2)this.companionGroup.position.x=o,this.companionGroup.position.z=l,this.companionInitialized=!0;else{const u=1-Math.exp(-6.4*t);this.companionGroup.position.x=tn.lerp(this.companionGroup.position.x,o,u),this.companionGroup.position.z=tn.lerp(this.companionGroup.position.z,l,u)}this.companionGroup.position.y=1.2+Math.sin(this.elapsed*4.4+.8)*.7,this.companionGroup.rotation.y=Math.atan2(-s,-a),this.companionReaction=Math.max(0,this.companionReaction-t*2.6);const d=1+Math.sin((1-this.companionReaction)*Math.PI*3)*this.companionReaction*.045;this.companionGroup.scale.setScalar(d)}syncEnemies(e){const t=new Set;for(const i of e.enemies){t.add(i.id);let r=this.enemyVisuals.get(i.id);if(r===void 0&&(r=this.createEnemyVisual(i),this.enemyVisuals.set(i.id,r),this.scene.add(r.group)),r.group.visible=!i.defeated||i.kind==="named-anomaly",r.group.position.set(i.x,r.baseY,i.y),r.group.rotation.y=Math.atan2(-(e.player.x-i.x),-(e.player.y-i.y)),r.group.scale.setScalar(i.disposition==="calmed"||i.disposition==="connected"?.92:i.defeated?.28:1),r.body.material.opacity=i.disposition==="connected"?.62:1,r.body.material.transparent=i.disposition==="connected",r.telegraph.visible=i.attack.phase==="telegraph",r.telegraph.visible){const s=mr[i.kind],a=1+Math.sin(i.attack.ticksRemaining/Math.max(1,s.telegraphTicks)*Math.PI*2)*.08;r.telegraph.scale.setScalar(a*((s.attackRange+i.radius)/58)),r.telegraph.material.opacity=.34+(1-i.attack.ticksRemaining/Math.max(1,s.telegraphTicks))*.5}}for(const[i,r]of this.enemyVisuals)t.has(i)||(r.group.visible=!1)}syncCombatPresentation(e,t){if(t===void 0||t.targetId===null){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const i=e.enemies.find(a=>a.id===t.targetId&&!a.defeated);if(i===void 0){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const r=Math.max(24,i.radius*1.45);this.targetRing.visible=!0,this.targetRing.position.set(i.x,2.8,i.y),this.targetRing.scale.setScalar(r/30),this.targetRing.material.color.setHex(e.player.weaponId==="blade"?6415825:16034128),this.targetRing.material.opacity=.56+Math.sin(this.elapsed*6)*.12;const s=t.phase==="windup";if(this.windupRing.visible=s,s){this.windupRing.position.set(i.x,3,i.y);const a=Math.max(.05,1-t.progress);this.windupRing.scale.setScalar(r/30*(1.6*a+.72)),this.windupRing.material.opacity=.3+t.progress*.66}}createEnemyVisual(e){const t=hy(e.kind),i=Pr(t,e.kind==="named-anomaly"?Ih*1.15:Ih,1),r=new Wt,s=new Ye(new bi(43,54,32),new nn({color:15548468,transparent:!0,opacity:.48,side:sn,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=3,s.visible=!1,r.add(i,Lr(e.kind==="named-anomaly"?54:34,e.kind==="named-anomaly"?31:20,.26),s),{group:r,body:i,telegraph:s,baseY:e.kind==="murmur"?16:0}}syncLoot(e){for(const t of e.world.loot){let i=this.lootVisuals.get(t.id);if(i===void 0){const r=Pr(ts,1.55,1);i=new Wt,i.add(r,Lr(17,10,.2)),i.position.set(t.x,4,t.y),i.scale.setScalar(.68),i.name=t.id,this.lootVisuals.set(t.id,i),this.scene.add(i)}i.visible=!t.picked}}handleEvents(e){for(const t of e)switch(t.type){case"player-attacked":this.attackAnimation=1,this.attackWeapon=t.weaponId,this.addAttackRing(t),this.pulseEffectLight(t.x,t.y,t.weaponId==="blade"?16770220:16034128,t.weaponId==="blade"?.58:.82);break;case"enemy-damaged":{this.cameraTrauma=Math.min(1,this.cameraTrauma+(t.source==="impact"?.82:t.source==="relic"?.66:.28));const i=this.enemyVisuals.get(t.enemyId);i!==void 0&&(this.addBurst(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:15195581,t.source==="impact"?13:8),this.pulseEffectLight(i.group.position.x,i.group.position.z,t.source==="relic"?6415825:t.source==="impact"?16034128:16770220,t.source==="relic"?1:.62));break}case"player-damaged":this.heroHurtAnimation=1,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,15291461,10),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,16735304,.9);break;case"guard-resolved":this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:15195581,22,34,.28,1.8),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.justGuard?6415825:16770220,t.justGuard?.92:.5);break;case"relic-activated":this.heroSkillAnimation=1,this.companionReaction=1,this.addRing(t.x,t.y,6415825,t.radius*.76,t.radius*.82,.62,1.36),this.addRing(t.x,t.y,13041651,t.radius*.38,t.radius*.42,.44,1.82),this.addBurst(t.x,t.y,10287336,16),this.pulseEffectLight(t.x,t.y,6415825,1);break;case"loot-picked":this.companionReaction=.82,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,6415825,9),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,6415825,.72);break;case"anomaly-resolved":this.companionReaction=1,this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?15291461:t.outcome==="calm"?16034128:6415825,36,250,1.1,2.4),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,t.outcome==="destroy"?16735304:t.outcome==="calm"?16034128:6415825,1);break}}pulseEffectLight(e,t,i,r){this.effectLight.position.set(e,54,t),this.effectLight.color.setHex(i),this.effectLightEnergy=Math.max(this.effectLightEnergy,r)}addAttackRing(e){const t=Math.atan2(e.directionY,e.directionX),i=e.weaponId==="blade"?15195581:16034128,r=e.weaponId==="blade"?e.range*.52:20,s=e.weaponId==="blade"?e.range:e.range*1.15,a=new bi(r,s,24,1,-.72,1.44),o=new nn({color:i,transparent:!0,opacity:.66,side:sn,depthWrite:!1}),l=new Ye(a,o);l.rotation.x=-Math.PI/2,l.rotation.z=t,l.position.set(e.x,8,e.y),this.scene.add(l),this.ringEffects.push({mesh:l,age:0,duration:e.weaponId==="blade"?.18:.3,grow:e.weaponId==="blade"?1.05:1.25})}addRing(e,t,i,r,s,a,o){const l=new Ye(new bi(r,s,40),new nn({color:i,transparent:!0,opacity:.56,side:sn,depthWrite:!1}));l.rotation.x=-Math.PI/2,l.position.set(e,7,t),this.scene.add(l),this.ringEffects.push({mesh:l,age:0,duration:a,grow:o})}addBurst(e,t,i,r){const s=new xn(8,8,8),a=new nn({color:i}),o=new Or(s,a,r),l=[],c=[];for(let d=0;d<r;d+=1){const u=d/r*Math.PI*2+d%3*.19,h=70+d%4*17;l.push(new D(e,28,t)),c.push(new D(Math.cos(u)*h,70+d%5*14,Math.sin(u)*h)),this.reusableMatrix.makeTranslation(e,28,t),o.setMatrixAt(d,this.reusableMatrix)}o.instanceMatrix.needsUpdate=!0,this.scene.add(o),this.burstEffects.push({mesh:o,positions:l,velocities:c,age:0,duration:.5})}updateEffects(e){this.effectLightEnergy=Math.max(0,this.effectLightEnergy-e*3.8),this.effectLight.intensity=this.effectLightEnergy*this.effectLightEnergy*155;for(let t=this.ringEffects.length-1;t>=0;t-=1){const i=this.ringEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration),s=1+r*(i.grow-1);i.mesh.scale.setScalar(s),i.mesh.material.opacity=(1-r)*.56,r>=1&&(this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.ringEffects.splice(t,1))}for(let t=this.burstEffects.length-1;t>=0;t-=1){const i=this.burstEffects[t];if(i===void 0)continue;i.age+=e;const r=Math.min(1,i.age/i.duration);for(let s=0;s<i.positions.length;s+=1){const a=i.positions[s],o=i.velocities[s];a===void 0||o===void 0||(o.y-=260*e,a.addScaledVector(o,e),this.reusablePosition.copy(a),this.reusableScale.setScalar(Math.max(.05,1-r)),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),i.mesh.setMatrixAt(s,this.reusableMatrix))}i.mesh.instanceMatrix.needsUpdate=!0,r>=1&&(this.scene.remove(i.mesh),i.mesh.dispose(),i.mesh.geometry.dispose(),py(i.mesh.material),this.burstEffects.splice(t,1))}}snapCamera(e){const t=Eh({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:"idle"},this.cameraCompositionProfile);this.cameraTarget.set(t.targetX,28,t.targetY),this.renderer.domElement.dataset.cameraComposition=t.mode,this.camera.position.copy(this.cameraTarget).add(Dh),this.camera.lookAt(this.cameraTarget),this.camera.updateProjectionMatrix()}updateCamera(e,t,i){const r=i?.targetId===null||i?.targetId===void 0?void 0:e.enemies.find(c=>c.id===i.targetId),s=Eh({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:i?.phase??"idle",targetX:r?.x,targetY:r?.y},this.cameraCompositionProfile);this.renderer.domElement.dataset.cameraComposition=s.mode;const a=1-Math.exp(-8*t);this.cameraTarget.lerp(this.reusablePosition.set(s.targetX,28,s.targetY),a);const o=this.reusablePosition.copy(this.cameraTarget).add(Dh);if(this.camera.position.lerp(o,a),this.cameraTrauma=Math.max(0,this.cameraTrauma-t*3.4),this.cameraTrauma>.001){const c=this.cameraTrauma*this.cameraTrauma*7.5;this.camera.position.x+=Math.sin(this.elapsed*137.3)*c,this.camera.position.y+=Math.sin(this.elapsed*173.1)*c*.28,this.camera.position.z+=Math.cos(this.elapsed*151.7)*c}if(this.camera.lookAt(this.cameraTarget),this.qualityProfile==="pc-ultra")return;const l=this.cameraViewHeight/this.internalRenderHeight;this.camera.position.x=Math.round(this.camera.position.x/l)*l,this.camera.position.y=Math.round(this.camera.position.y/l)*l,this.camera.position.z=Math.round(this.camera.position.z/l)*l}updateAmbientMotion(e,t){for(const[r,s]of this.enemyVisuals){const a=e.enemies.find(l=>l.id===r);if(a===void 0)continue;const o=a.kind==="murmur"?8:2;s.group.position.y=s.baseY+Math.sin(t*3.1+r.length*.7)*o}let i=0;for(const r of this.lootVisuals.values())r.rotation.y=t*.8+i*.4,r.position.y=5+Math.sin(t*2.4+i)*5,i+=1}}function tf(n,e,t){const i=n.dimensions.width*e,r=n.dimensions.depth*e,s=Ou(n,{voxelSize:e,shadeFaces:!1,origin:{x:-i/2,y:0,z:-r/2}}),a=new Bt;return a.setAttribute("position",new Ut(s.positions,3)),a.setAttribute("normal",new Ut(s.normals,3)),a.setAttribute("color",new Ut(s.colors,3)),a.setIndex(new Ut(s.indices,1)),t&&s.materialGroups.forEach((o,l)=>{a.addGroup(o.start,o.count,l)}),a.computeBoundingSphere(),{geometry:a,data:s}}function Pr(n,e,t){const{geometry:i}=tf(n,e,!1),r=new Dt({color:16777215,vertexColors:!0,transparent:t<1,opacity:t,roughness:.78,metalness:.04}),s=new Ye(i,r);return s.name=n.id,s}function Uh(n,e){const{geometry:t,data:i}=tf(n,e,!0),r=i.materialGroups.map(a=>oy(a.role)),s=new Ye(t,r);return s.name=n.id,s}function oy(n){switch(n){case"matte":return new Dt({color:16777215,vertexColors:!0,roughness:.84,metalness:0});case"metal":return new Dt({color:16777215,vertexColors:!0,roughness:.38,metalness:.68});case"emissive":return new nn({color:16777215,vertexColors:!0,toneMapped:!1})}}function ly(n,e){for(const t of n.material)(t instanceof Dt||t instanceof nn)&&t.color.setHex(e)}function Lr(n,e,t){const i=new rc(1,24),r=new nn({color:2373682,transparent:!0,opacity:t*.72,depthWrite:!1}),s=new Ye(i,r);return s.rotation.x=-Math.PI/2,s.scale.set(n,e,1),s.position.y=1,s}function Oh(n,e){const t=new bi(25,30,64),i=new nn({color:n,transparent:!0,opacity:e,depthWrite:!1,side:sn,blending:ca}),r=new Ye(t,i);return r.rotation.x=-Math.PI/2,r.renderOrder=12,r}function cy(){const n=[{size:[26,3.5,18],position:[0,1.75,0],color:3766847},{size:[15,5,21],position:[-7,4.25,4],color:5083459},{size:[12,11,12],position:[5,7.5,-3],color:3108928},{size:[10,8,10],position:[-5,8,5],color:6988622},{size:[4.5,4.5,4.5],position:[5,15.5,0],color:15780172},{size:[4,4,4],position:[-7,13,7],color:14970728}],e=[],t=[],i=[],r=new Ue;for(const a of n){const o=new xn(a.size[0],a.size[1],a.size[2]).toNonIndexed();o.translate(a.position[0],a.position[1],a.position[2]);const l=o.getAttribute("position"),c=o.getAttribute("normal");for(let d=0;d<l.count;d+=1){const u=c.getY(d),h=Math.abs(c.getX(d)),p=u>.5?1:u<-.5?.58:h>.5?.82:.72;r.setHex(a.color).multiplyScalar(p),e.push(l.getX(d),l.getY(d),l.getZ(d)),t.push(c.getX(d),c.getY(d),c.getZ(d)),i.push(r.r,r.g,r.b)}o.dispose()}const s=new Bt;return s.setAttribute("position",new lt(e,3)),s.setAttribute("normal",new lt(t,3)),s.setAttribute("color",new lt(i,3)),s.computeBoundingBox(),s.computeBoundingSphere(),s}function Fh(n,e,t){return(Math.imul(Math.trunc(n)+101,73856093)^Math.imul(Math.trunc(e)+211,19349663)^Math.imul(Math.trunc(t)+307,83492791))>>>0}function zh(n,e){n.rotation.x=e==="blade"?.12:.04,n.rotation.z=e==="blade"?-.42:-.28,n.scale.setScalar(e==="blade"?.9:.86),Pl(n,e)}function dy(n,e,t,i,r){if(e>0)return{motion:"hurt",progress:1-e};if(t>0)return{motion:"skill",progress:1-t};if(i>0)return{motion:"hit",progress:1-i};switch(n?.phase){case"windup":return{motion:"windup",progress:n.progress};case"hit":return{motion:"hit",progress:n.progress};case"recover":return{motion:"recovery",progress:n.progress};case"idle":case"acquire":case void 0:return r>.08?{motion:"run",progress:0}:{motion:"idle",progress:0}}}function Pl(n,e){const t=e==="blade"?Rl:Cl;Ks.set(t.x,t.y,t.z).multiply(n.scale).applyEuler(n.rotation),n.position.set(wo.x-Ks.x,wo.y-Ks.y,wo.z-Ks.z)}function hy(n){switch(n){case"scrap-hound":return pc;case"relay-shell":return mc;case"murmur":return gc;case"named-anomaly":return xc}}function uy(n){switch(n){case"dead-tree":case"signpost":return Ta;case"relay":case"lamp":case"anomaly-marker":return ts;case"contract-board":return _c;default:return vc}}function fy(n,e,t){if(n<760&&e>430&&e<1370)return t%3===0?7509097:6323800;if(n>2420&&n<3330&&e>380&&e<1420)return t%4===0?8750716:7764594;if(Math.abs(e-900)<145)return t%3===0?10123353:8874063;const i=(Math.floor(n/80)*17+Math.floor(e/80)*31>>>0)%4;return[4683588,5210184,5998929,6854234][i]??4683588}function py(n){const e=Array.isArray(n)?n:[n];for(const t of e)t.dispose()}function my(n){return n.replaceChildren(),n.className="game-shell prototype-b-shell",n.innerHTML=`
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
  `,{stage:mt(n,".relic-stage"),worldMount:mt(n,".relic-world"),statusLive:mt(n,'[data-ui="status-live"]'),titleOverlay:mt(n,'[data-ui="title"]'),startButton:Zs(n,'[data-ui="start"]'),muteButton:Zs(n,'[data-ui="mute"]'),zoneLabel:mt(n,'[data-ui="zone"]'),objectiveText:mt(n,'[data-ui="objective"]'),healthFill:mt(n,'[data-ui="health-fill"]'),healthText:mt(n,'[data-ui="health-text"]'),weaponName:mt(n,'[data-ui="weapon-name"]'),weaponDetail:mt(n,'[data-ui="weapon-detail"]'),relicName:mt(n,'[data-ui="relic-name"]'),itemCount:mt(n,'[data-ui="item-count"]'),targetPanel:mt(n,'[data-ui="target"]'),targetName:mt(n,'[data-ui="target-name"]'),targetFill:mt(n,'[data-ui="target-fill"]'),contextPrompt:mt(n,'[data-ui="context-prompt"]'),toast:mt(n,'[data-ui="toast"]'),dossier:mt(n,'[data-ui="dossier"]'),dossierTitle:mt(n,'[data-ui="dossier-title"]'),dossierBody:mt(n,'[data-ui="dossier-body"]'),outcomePanel:mt(n,'[data-ui="outcome"]'),outcomeBackButton:Zs(n,'[data-ui="outcome-back"]'),resultPanel:mt(n,'[data-ui="result"]'),resultTitle:mt(n,'[data-ui="result-title"]'),resultBody:mt(n,'[data-ui="result-body"]'),restartButton:Zs(n,'[data-ui="restart"]'),performance:mt(n,'[data-ui="performance"]'),orientationNotice:mt(n,'[data-ui="orientation"]')}}function mt(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout element is missing: ${e}`);return t}function Zs(n,e){const t=n.querySelector(e);if(t===null)throw new Error(`Prototype B layout button is missing: ${e}`);return t}const Ao=1e3/kn,Bh=5,gy=Math.ceil(kn*.7),kh="relic-frontier-b-02",Ro=new WeakMap;function xy(n){return new URLSearchParams(n).getAll("debug").includes("1")}const vy={"edge-coil":{title:"縁断コイル E-04",effect:"測量刃の威力を6増幅する。",principle:"刃の輪郭だけを0.03秒先に送る位相先行。仮説。",sideEffect:"鞘に入れた鉛筆まで、やたら尖る。",note:"『切れ味より、書類の角が怖い』— 前任調査員"},"gravity-weight":{title:"局所重錘 G-12",effect:"杭打機の威力を12増幅する。",principle:"衝突の瞬間だけ質量の参照先を衛星軌道へ移す。仮説。",sideEffect:"使用後、持ち主の靴だけ三分間重くなる。",note:"『置き忘れない。床がへこむ』— 整備票"},"field-tonic":{title:"野外縫合剤 T-3",effect:"体力を45回復する道具を1個追加する。",principle:"傷口へ本人の正常時データを上書きする医療糊。",sideEffect:"治った場所が一度だけ知らない番号へ発信する。",note:"『通話料は観測所持ちにしてほしい』— 使用者"},"relay-capacitor":{title:"中継蓄相器 C-17",effect:"斥力環の威力を10増し、再使用を1秒短縮する。",principle:"周辺機器の待ち時間を回収し、電荷として再利用する。",sideEffect:"近くの炊飯器が、完了前に完了音を鳴らす。",note:"『急かされている気がする』— 台所担当"},"quiet-chime":{title:"無音鈴 Q-0",effect:"反響体を斥力環で鎮静できる。",principle:"音を出すのではなく、周囲から同じ長さの沈黙を引く。",sideEffect:"鳴らすたび、どこかで一匹だけ犬が首を傾げる。",note:"『聞こえなかった。だから作動した』— 観測記録"},"signal-key":{title:"信号鍵 K-99",effect:"反響体との直接接続を解禁する。",principle:"鍵穴ではなく、通信相手の「返事したい気持ち」を開く。",sideEffect:"接続中、使用者の独り言が字幕として表示される。",note:"『考えてから黙ること』— 接続手順書"}},_y={destroy:"破壊",calm:"鎮静",connect:"接続"};function Vh(n,e={}){Ro.get(n)?.destroy();const t=my(n);yy(n,t,e);const i=new Mf(t.stage),r=new xf,s=[];let a=Zc(kh),o=Ne(t,a),l=0,c=performance.now(),d=0,u=!1,h=!1,p=!1,g=!1,_=0,m=0,f=0,S=0,E=0,M=!1,T,b=Pa(),R=0,v=!1,w=!1,C=0;const P=window.matchMedia("(orientation: portrait)");let L=P.matches;i.setEnabled(!1),Co(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1});const z=(se,we=performance.now(),Re=1800)=>{t.statusLive.textContent=se,C=we+Re},G=()=>u&&!L&&!p&&!document.hidden&&a.status==="playing",F=()=>sa(a)&&!M,X=se=>{L=P.matches,t.stage.inert=L,t.orientationNotice.setAttribute("aria-hidden",String(!L)),i.setEnabled(G()),d=0,c=performance.now(),se&&(z(L?"ゲームを一時停止しました。端末を横向きにしてください。":"横向き表示へ戻りました。調査を再開します。"),!L&&u&&t.stage.focus({preventScroll:!0}))};X(!1);const B=()=>{u||h||(u=!0,t.stage.dataset.experience==="north-star"&&(t.stage.dataset.presentationState="active"),t.titleOverlay.setAttribute("aria-hidden","true"),t.titleOverlay.inert=!0,i.setEnabled(G()),c=performance.now(),z("調査開始。町の依頼板に近づき、調査ボタンを押してください。",c),L||t.stage.focus({preventScroll:!0}),r.unlock().catch(()=>{ve(t,"音声を開始できませんでした。ゲームは続行できます。",performance.now())}))},K=()=>{g=!g,r.setMuted(g),t.muteButton.setAttribute("aria-pressed",String(g)),t.muteButton.innerHTML=g?'<span aria-hidden="true">×</span> MUTED':'<span aria-hidden="true">◖))</span> SOUND'},j=()=>{a=Zc(kh),b=Pa(),R=0,T=void 0,d=0,M=!1,v=!1,w=!1,o.dispose(),o=Ne(t,a),t.resultPanel.setAttribute("aria-hidden","true"),t.resultPanel.inert=!0,t.outcomePanel.setAttribute("aria-hidden","true"),t.outcomePanel.inert=!0,i.setEnabled(G()),ve(t,"新しい調査記録を開始。",performance.now()),Co(t,a,performance.now(),{decisionOpen:!1,announceStatus:!1}),t.stage.focus({preventScroll:!0})},ne=()=>B(),ae=()=>K(),le=()=>j(),ke=se=>{se.code==="Enter"&&B()},Ze=()=>{c=performance.now(),d=0,i.setEnabled(G())},ze=()=>X(!0),Z=()=>{sa(a)&&(M=!0,ve(t,"応答を保留。街道へ戻り、必要な遺物を探せる。",performance.now(),3600),z("応答を保留しました。反響体の近くで調査すると、選択へ戻れます。"))},ie=se=>{if(!F())return;if(se.code==="Escape"){se.preventDefault(),Z();return}if(se.code!=="Tab")return;const we=Wh(t);if(we.length===0)return;se.preventDefault();const Re=we.indexOf(document.activeElement),st=se.shiftKey?Re<=0?we.length-1:Re-1:Re<0||Re===we.length-1?0:Re+1;we[st]?.focus({preventScroll:!0})};t.startButton.addEventListener("click",ne),t.muteButton.addEventListener("click",ae),t.restartButton.addEventListener("click",le),t.outcomeBackButton.addEventListener("click",Z),window.addEventListener("keydown",ke),window.addEventListener("keydown",ie),document.addEventListener("visibilitychange",Ze),P.addEventListener("change",ze),s.push(()=>t.startButton.removeEventListener("click",ne),()=>t.muteButton.removeEventListener("click",ae),()=>t.restartButton.removeEventListener("click",le),()=>t.outcomeBackButton.removeEventListener("click",Z),()=>window.removeEventListener("keydown",ke),()=>window.removeEventListener("keydown",ie),()=>document.removeEventListener("visibilitychange",Ze),()=>P.removeEventListener("change",ze));const ee=se=>{if(h)return;const we=Math.min(100,Math.max(0,se-c));c=se;const Re=[];if(u&&!p&&!document.hidden&&!L&&a.status==="playing"){d+=we;let We=0;for(;d>=Ao&&We<Bh;){const Ve=i.consumeFrame(),at=F();if(M&&Ve.interact&&Uy(a))M=!1,z("反響体への応答選択を再開します。",se);else if(!at||Ve.outcomeChoice!==null){const tt=My(a,Ve,at);if(e.semiAutoCombat===!0&&!at)if(tt.activateRelic===!0&&a.player.relicCooldownTicks<=1?R=Math.max(R,gy):(tt.dodge===!0||tt.chooseWeapon!==void 0)&&(R=Math.max(R,1)),R>0)b=Pa(),R-=1,tt.moveSpeedScale=1,tt.attack=!1,T={targetId:null,phase:"idle",progress:0};else{const Xe=_p(b,a);b=Xe.state,tt.moveSpeedScale=Xe.presentation.movementScale,tt.attack=Xe.commandContribution.attack===!0,T={targetId:Xe.presentation.targetId,phase:Xe.presentation.phase,progress:Xe.presentation.phaseProgress}}const I=pp(a,tt);a=I.state,Re.push(...I.events)}d-=Ao,We+=1}We===Bh&&(d=Math.min(d,Ao))}et(t,r,a,Re,se),sa(a)||(M=!1);const st=F();if(Co(t,a,se,{decisionOpen:st,announceStatus:u&&!L&&!p&&se>=C}),Sy(t,a,T),He(st),r.setDanger(L||document.hidden?0:Ly(a)),document.hidden||r.update(),o.update(a,Re,se,L||document.hidden?0:we,T),S+=1,E+=we,se-f>=500){const We=E>0?Math.round(S*1e3/E):0,Ve=o.getStats();t.performance.textContent=`${We} FPS · ${Ve.width}×${Ve.height} · ${Ve.calls} CALL · ${Ve.triangles} TRI`,S=0,E=0,f=se}se>=_&&t.toast.classList.remove("is-visible"),se>=m&&t.dossier.setAttribute("aria-hidden","true"),l=requestAnimationFrame(ee)},be={destroy(){if(!h){h=!0,cancelAnimationFrame(l),i.destroy(),r.dispose(),o.dispose();for(const se of s.splice(0))se();Ro.delete(n)}},getState(){return a}};function Ne(se,we){return new ay(se.worldMount,we,{onContextLost:()=>{p=!0,i.setEnabled(!1);const Re=performance.now();ve(se,"描画装置との接続が切れました。復旧を待っています。",Re,2e4),z("WebGL描画コンテキストが失われました。",Re,2e4)},onContextRestored:()=>{p=!1,i.setEnabled(G());const Re=performance.now();ve(se,"描画装置との接続を復旧しました。",Re),z("描画装置との接続を復旧しました。",Re),c=Re,d=0},companionPreview:e.companionPreview,cameraCompositionProfile:e.experience==="north-star"?"north-star":"baseline",environmentProfile:e.experience==="north-star"?"north-star-city":"start-town",qualityProfile:e.renderQuality})}function ve(se,we,Re,st=2800){se.toast.textContent=we,se.toast.classList.add("is-visible"),_=Re+st}function dt(se,we){const Re=vy[se];t.dossierTitle.textContent=Re.title,t.dossierBody.textContent=[`効果　${Re.effect}`,`原理　${Re.principle}`,`副作用　${Re.sideEffect}`,`所感　${Re.note}`].join(`
`),t.dossier.setAttribute("aria-hidden","false"),m=we+7e3}function He(se){const we=t.outcomePanel.contains(document.activeElement);t.outcomePanel.inert=!se,se!==v&&(se&&!L?Wh(t)[0]?.focus({preventScroll:!0}):!L&&we&&t.stage.focus({preventScroll:!0}),v=se);const Re=t.resultPanel.getAttribute("aria-hidden")==="false";t.resultPanel.inert=!Re,Re!==w&&(Re&&!L&&t.restartButton.focus({preventScroll:!0}),w=Re)}return Ro.set(n,be),l=requestAnimationFrame(ee),be;function et(se,we,Re,st,We){for(const Ve of st)switch(Cy(we,Ve),Ve.type){case"weapon-selected":ve(se,Ve.weaponId==="blade"?"測量刃へ持ち替えた。速く、間合いが長い。":"杭打機へ持ち替えた。遅いが、重く吹き飛ばす。",We);break;case"loot-picked":{const at=qh[Ve.lootId];ve(se,`${at.name}を回収。`,We),dt(Ve.lootId,We);break}case"landmark-entered":ve(se,Ve.landmarkId==="fork"?"三叉路を記録。廃区の信号が強くなる。":Ve.landmarkId==="ruin"?"聴取廃区へ侵入。発信源は近い。":"ダストウェイク観測町へ帰還。",We);break;case"quest-advanced":ve(se,nf(Re),We,3300);break;case"outcome-committed":ve(se,Ve.outcome==="destroy"?"破壊手順を確定。通常攻撃で停止させる。":Ve.outcome==="calm"?"鎮静手順を確定。近くで斥力環を使う。":"接続手順を確定。近くで調査する。",We,4e3);break;case"anomaly-resolved":ve(se,`反響体への${_y[Ve.outcome]}を記録。町へ戻れ。`,We,4e3);break;case"enemy-defeated":Ve.enemyId!==Di&&ve(se,"異形を停止。周囲を調べられる。",We);break;case"item-used":ve(se,`縫合剤を使用。体力を${Ve.healed}回復。`,We);break;case"command-rejected":ve(se,Dy(Ve.reason),We);break;case"player-defeated":i.setEnabled(!1),se.resultTitle.textContent="調査記録、途絶",se.resultBody.textContent=`辺境はあなたを待たずに巡り続ける。
装備と防御の使い方を変え、もう一度この経路を試せる。`,se.resultPanel.setAttribute("aria-hidden","false"),se.resultPanel.inert=!1,z("調査員は倒れました。",We,1e4);break;case"result-reached":i.setEnabled(!1),z(`依頼完了。${Ve.result.title}`,We,1e4);break}}}function My(n,e,t){const i=by(e.outcomeChoice);if(t)return i===void 0?{}:{chooseOutcome:i};const r=TM(e.moveX,e.moveY);return{moveX:r.moveX,moveY:r.moveY,attack:e.attack,guard:e.guard,dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,chooseWeapon:e.switchWeapon?Ey(n.player.weaponId):void 0}}function yy(n,e,t){if(t.experience!=="north-star")return;n.classList.add("north-star-shell"),e.stage.classList.add("north-star-stage"),e.stage.dataset.experience="north-star",e.stage.dataset.presentationState="intro";const i=xy(window.location.search);e.stage.classList.toggle("is-north-star-debug",i),e.stage.dataset.debug=i?"1":"0",e.performance.hidden=!i,e.stage.setAttribute("aria-label","North Star Scene。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。");const r=document.createElement("div");r.className="north-star-badge",r.hidden=!i,r.innerHTML="<span>VISUAL NORTH STAR</span><strong>PC ULTRA / LIVE COMBAT</strong>",e.stage.append(r);const s=document.createElement("div");s.className="north-star-combat-readout",s.dataset.phase="idle",s.setAttribute("aria-hidden","true"),s.innerHTML=`
    <strong data-ui="north-star-combat-phase">LOCK</strong>
    <i><em data-ui="north-star-combat-progress"></em></i>
  `,e.stage.append(s);const a=e.titleOverlay.querySelector(".relic-title__copy .relic-kicker"),o=e.titleOverlay.querySelector("h1"),l=e.titleOverlay.querySelector("p"),c=e.startButton.querySelector("span"),d=e.startButton.querySelector("small");a!==null&&(a.textContent="PC ULTRA VISUAL + GAME FEEL BENCHMARK"),o!==null&&(o.innerHTML="緑蝕<br /><em>観測区</em>"),l!==null&&(l.innerHTML="自然に呑まれた現代都市を歩く。<br />間合いで通常攻撃を起こし、大技で戦況を変える。"),c!==null&&(c.textContent="North Star Sceneを開始"),d!==null&&(d.textContent="MOVE / AUTO BASIC / MANUAL SKILL");const u=e.stage.querySelector('[data-control="attack"]');u!==null&&(u.tabIndex=-1,u.setAttribute("aria-hidden","true"));const h=e.stage.querySelector('[data-control="relic"]'),p=h?.querySelector("span"),g=h?.querySelector("small");p!=null&&(p.textContent="大技"),g!=null&&(g.textContent="Q / MANUAL")}function Sy(n,e,t){const i=n.stage.querySelector(".north-star-combat-readout");if(i===null)return;const r=i.querySelector('[data-ui="north-star-combat-phase"]'),s=i.querySelector('[data-ui="north-star-combat-progress"]'),a=t?.phase??"idle",o={idle:"LOCK",acquire:"LOCK",windup:e.player.weaponId==="blade"?"WINDUP":"CHARGE",hit:"HIT",recover:"RECOVER"};r!==null&&(r.textContent=o[a]),s!==null&&(s.style.width=`${Math.round((t?.progress??0)*100)}%`),i.dataset.phase=a,n.stage.dataset.combatPhase=a,n.stage.dataset.combatTarget=t?.targetId??""}function by(n){switch(n){case 0:return"destroy";case 1:return"calm";case 2:return"connect";default:return}}function Ey(n){return n==="blade"?"impact":"blade"}function Co(n,e,t,i={}){const r=e.player,s=Math.max(0,r.hp/r.maxHp),a=aa[r.weaponId],o=r.weaponDamageBonuses[r.weaponId],l=r.relicCooldownTicks/kn,c=i.decisionOpen??sa(e);n.stage.dataset.questPhase=e.quest.phase,n.stage.dataset.playerX=String(Math.round(r.x)),n.stage.dataset.playerY=String(Math.round(r.y)),n.stage.dataset.weapon=r.weaponId,n.stage.dataset.status=e.status,n.zoneLabel.textContent=wy(r.x,r.y),n.objectiveText.textContent=nf(e),n.healthFill.style.width=`${Math.round(s*100)}%`,n.healthFill.style.background=s<=.3?"var(--relic-danger)":"linear-gradient(90deg, var(--relic-amber), var(--relic-signal))",n.healthText.textContent=`${r.hp} / ${r.maxHp}`,n.weaponName.textContent=r.weaponId==="blade"?"測量刃":"杭打機",n.weaponDetail.textContent=`${r.weaponId==="blade"?"速い・広い":"遅い・重い"} / 威力 ${a.damage+o}`,n.relicName.textContent=l<=0?"斥力環 R-17 / READY":`斥力環 R-17 / ${l.toFixed(1)}s`,n.itemCount.textContent=`× ${r.healingItems}`,Ty(n,e),n.outcomePanel.setAttribute("aria-hidden",String(!c));const d=Gh(n,"outcome-calm"),u=Gh(n,"outcome-connect");Hh(d,r.collectedLootIds.includes("quiet-chime"),"無音鈴 Q-0 が必要"),Hh(u,r.collectedLootIds.includes("signal-key"),"信号鍵 K-99 が必要");const h=Ry(e);if(n.contextPrompt.setAttribute("aria-hidden",String(h===null||c)),h!==null){const p=n.contextPrompt.querySelector("span"),g=n.contextPrompt.querySelector("strong");p!==null&&(p.textContent=h.key),g!==null&&(g.textContent=h.text)}if(e.status==="result"&&e.quest.result!==null){const p=e.quest.result;n.resultTitle.textContent=Iy(p.outcome),n.resultBody.textContent=Ny(p.outcome),n.resultPanel.setAttribute("aria-hidden","false"),n.resultPanel.inert=!1}if(i.announceStatus!==!1&&t>0&&e.status==="playing"){const p=`${n.zoneLabel.textContent}。目的：${n.objectiveText.textContent}。体力${r.hp}。武器${n.weaponName.textContent}。`;n.statusLive.textContent!==p&&(n.statusLive.textContent=p)}}function Ty(n,e){const t=e.enemies.filter(i=>i.active&&!i.defeated&&i.disposition==="hostile").map(i=>({enemy:i,distance:Math.hypot(e.player.x-i.x,e.player.y-i.y)})).filter(i=>i.distance<=440).sort((i,r)=>i.distance-r.distance||i.enemy.id.localeCompare(r.enemy.id))[0]?.enemy;n.targetPanel.setAttribute("aria-hidden",String(t===void 0)),t!==void 0&&(n.targetName.textContent=Ay(t.kind),n.targetFill.style.width=`${Math.round(t.hp/t.maxHp*100)}%`)}function nf(n){switch(n.quest.phase){case"briefing":return"町の依頼板を調べる";case"travel-to-fork":return"東の三叉路へ向かう";case"travel-to-ruin":return"聴取廃区の発信源へ向かう";case"confrontation":return n.quest.intent==="destroy"?"反響体を攻撃して停止させる":n.quest.intent==="calm"?"反響体の近くで斥力環を使う":n.quest.intent==="connect"?"反響体の近くで調査する":"反響体への応答を選ぶ";case"return-town":return"観測町の依頼板へ帰還する";case"result":return"依頼記録を閉じる"}}function wy(n,e){return Po(n,e,an.town.bounds)?"ダストウェイク観測町":Po(n,e,an.ruin.bounds)?"聴取廃区":Po(n,e,an.fork.bounds)?"三叉路":n<1180?"赤錆街道・西":n<2450?"赤錆街道・東":"廃区外縁"}function Ay(n){switch(n){case"scrap-hound":return"屑鉄猟犬";case"relay-shell":return"中継殻";case"murmur":return"囁き";case"named-anomaly":return"聴取断層《オリソン》"}}function Ry(n){const e=n.player;if(n.world.loot.some(r=>!r.picked&&Math.hypot(e.x-r.x,e.y-r.y)<=e.radius+r.radius+70))return{key:"E",text:"遺物を回収"};if(n.quest.phase==="briefing"&&Xh(e,an.town.interactionPoint)<=e.radius+70)return{key:"E",text:"依頼板を調べる"};const i=n.enemies.find(r=>r.id===Di);if(i!==void 0&&Nl(e,i)){if(n.quest.phase==="confrontation"&&n.quest.intent===null)return{key:"E",text:"反響体への応答を選ぶ"};if(n.quest.intent==="connect")return{key:"E",text:"信号鍵で接続"};if(n.quest.intent==="calm")return{key:"Q",text:"斥力環で鎮静"};if(n.quest.intent==="destroy")return{key:"J",text:"武器で破壊"}}return n.quest.phase==="return-town"&&Xh(e,an.town.interactionPoint)<=e.radius+70?{key:"E",text:"依頼を報告"}:null}function Cy(n,e){if(e.type==="player-damaged"){n.play("hurt");return}if(e.type==="weapon-selected"||e.type==="command-rejected"){n.play("ui");return}if("cue"in e){const t=Py(e.cue);t!==null&&n.play(t)}}function Py(n){switch(n){case"blade-swing":return"blade";case"impact-swing":return"impact";case"enemy-warning":return"warning";case"enemy-impact":return"enemy-impact";case"guard":return"guard";case"just-guard":return"perfect-guard";case"dodge":return"dodge";case"relic":return"relic";case"heal":return"item";case"loot":return"pickup";case"quest":return"ui";case"outcome-destroy":case"outcome-calm":case"outcome-connect":return n;case"result":return"result"}}function Ly(n){let e=Number.POSITIVE_INFINITY;for(const t of n.enemies)!t.active||t.defeated||t.disposition!=="hostile"||(e=Math.min(e,Math.hypot(n.player.x-t.x,n.player.y-t.y)));return Number.isFinite(e)?1-Math.min(1,Math.max(0,(e-100)/500)):0}function Dy(n){switch(n){case"item-full-health":return"体力は満タン。縫合剤は温存した。";case"item-empty":return"縫合剤がない。";case"outcome-already-chosen":return"応答手順はすでに確定している。";case"outcome-not-available":return"必要な遺物がない。街道を調べ直せる。";case"wrong-quest-phase":return"ここではその応答を選べない。"}}function Iy(n){switch(n){case"destroy":return"静かになった断層";case"calm":return"眠る断層";case"connect":return"開いたままの回線"}}function Ny(n){switch(n){case"destroy":return`町は静寂を歓迎した。しかし中継守たちは、失われた信号を弔い始めた。
次の旅では、別の返事も選べる。`;case"calm":return`廃区は穏やかになり、旅人は三叉路へ小さな供物を置き始めた。
あなたの鎮静記録が、この土地の新しい習慣になる。`;case"connect":return`廃区から短い通信が届き始め、誰が返事をしてよいか町で議論になった。
回線の向こう側は、まだ何者とも確定していない。`}}function Hh(n,e,t){n.disabled=!e,n.setAttribute("aria-label",e?n.textContent?.trim()??"選択":`${n.textContent?.trim()??"選択"}。${t}`),n.title=e?"":t}function Gh(n,e){const t=n.outcomePanel.querySelector(`[data-control="${e}"]`);if(t===null)throw new Error(`Outcome button is missing: ${e}`);return t}function Wh(n){return Array.from(n.outcomePanel.querySelectorAll("button:not(:disabled)"))}function sa(n){return n.quest.phase==="confrontation"&&n.quest.intent===null}function Uy(n){const e=n.enemies.find(t=>t.id===Di);return e!==void 0&&Nl(n.player,e)}function Po(n,e,t){return n>=t.x&&n<=t.x+t.width&&e>=t.y&&e<=t.y+t.height}function Xh(n,e){return Math.hypot(n.x-e.x,n.y-e.y)}const Ll=document.querySelector("#app");if(Ll===null)throw new Error("Application root was not found.");Oy(Ll).catch(n=>{Fy(Ll,n)});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js")});async function Oy(n){const e=new URLSearchParams(window.location.search);if(e.get("prototype")==="0.1"){const{startGame:t}=await ff(async()=>{const{startGame:i}=await import("./startGame-6yY4X5Xk.js");return{startGame:i}},[],import.meta.url);t(n);return}if(e.get("prototype")==="north-star"){Vh(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0});return}Vh(n,{experience:"north-star",renderQuality:"pc-ultra",companionPreview:!0,semiAutoCombat:!0})}function Fy(n,e){n.replaceChildren(),n.className="game-shell boot-failure-shell";const t=document.createElement("section");t.className="boot-failure",t.setAttribute("role","alert");const i=document.createElement("span");i.textContent="RELIC FRONTIER / STARTUP ERROR";const r=document.createElement("h1");r.textContent="描画装置を起動できませんでした";const s=document.createElement("p");s.textContent="この試作にはWebGL対応ブラウザが必要です。ページを再読み込みしても直らない場合は、比較用の旧試作を開けます。";const a=document.createElement("a");a.href="?prototype=0.1",a.textContent="旧試作 0.1 を開く",t.append(i,r,s,a),n.append(t),console.error("Prototype B failed to start.",e)}
