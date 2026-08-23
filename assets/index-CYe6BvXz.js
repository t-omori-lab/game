const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/worldArt-DY1cs1iQ.js","assets/F01Character-Belqb_9S.js","assets/preload-helper-CeUGa9z8.js","assets/WebGpuHeroComparator-C1wmSHDJ.js"])))=>i.map(i=>d[i]);
import{_ as ql}from"./preload-helper-CeUGa9z8.js";import{V as S,d as fe,aL as Tn,Q as ot,E as Ie,g as Y,B as $e,ct as Ee,l as C,G as R,M as I,X as va,c as L,j as Da,R as Ya,U as ya,m as je,b6 as Ld,aU as We,L as at,k as xa,f as sa,t as Ve,ca as he,c_ as ge,D as Se,z as Rn,aA as F,cT as ia,dn as _a,e as zn,T as Yl,aK as Fd,s as $s,a6 as Od,a as He,dp as xt,aJ as Ai,dq as Ud,dr as An,ds as jl,dt as li,du as Wl,C as ba,I as Be,dv as Ln,dw as br,H as Dr,bo as ha,dx as Wt,cd as Nd,aC as cs,aD as ds,be as Bo,bf as Po,dy as vi,aB as Hd,dz as ei,ax as Vl,al as _d,as as Gd,aY as Br,a9 as Vr,v as ti,af as Xd,co as Kt,dj as qd,dk as Yd,dA as yi,dl as jd,dm as Wd,dB as Vd,dC as Yr,dD as Kl,_ as Kd,Y as ln,cn as Jd,dE as Fn,dF as Zd,d1 as $d,aW as eu,aV as tu,aX as au,aS as ru,aT as cn,b as Gs,a8 as xi,cf as dn,dG as su,dH as iu,dI as Xs,dJ as nu,dK as ou,P as Hr,ay as Au,aN as Jl,dL as lu,dM as cu,dN as du,dO as uu,dP as Zl,d0 as hu,dQ as Eo,dR as Co,dS as Mo,dT as fu,i as pu,cV as mu,dU as un,dV as So,dW as Io,dX as $l,o as gu,df as wu,J as vu,n as yu,dY as xu,A as zt,dZ as Yt,a0 as bu,dg as Du,dh as Bu,d_ as Pu,c$ as Eu,d$ as Qo,ch as ko,h as ec,br as To,e0 as Ro,e1 as vr,e2 as ja,aI as Cu,e3 as Mu,e4 as Su,dc as Iu,dd as Qu,e5 as ku,e6 as tc}from"./F01Character-Belqb_9S.js";const ac="firstStageMvp",rc="r01",sc="mvpHistory",On=(t,e="")=>new URLSearchParams(t).get(ac)===rc||/\/r1[123](?:\/|$)/i.test(e),ic=t=>new URLSearchParams(t).get(sc)==="b"?"b":"a",Tu=(t,e)=>{const a=new URL(t);return a.searchParams.set(ac,rc),a.searchParams.set(sc,e),a.toString()},Ru={blade:De("light-attack",.055,3,.16),impact:De("heavy-attack",.12,3,.24),guard:De("active-guard",.075,3,.12),"perfect-guard":De("just-guard",.1,4,.14),"passive-guard":De("passive-guard",.12,2,.095),hurt:De("player-hurt",.08,2,.17),warning:De("enemy-tell",.07,2,.075),"enemy-impact":De("enemy-hit",.07,2,.2),"enemy-defeated":De("enemy-defeat",.12,4,.23),dodge:De("movement",.06,2,.09),relic:De("skill",.18,4,.16),item:De("inventory",.09,2,.1),pickup:De("inventory",.04,2,.08),ui:De("interface",.035,1,.045),result:De("result",.3,3,.08),"outcome-destroy":De("causal-outcome",.3,2,.18),"outcome-calm":De("causal-outcome",.3,2,.1),"outcome-connect":De("causal-outcome",.3,3,.1),link:De("timing-link",.06,4,.14),support:De("support",.14,3,.1),"contact-diagonal":De("light-attack",.055,3,.17),"contact-crosscut":De("timing-link",.065,4,.19),"contact-rupture":De("heavy-attack",.11,4,.24)},Bt={diagonal:"/game/audio/commercial-action/ws1-r01/impactMetal_light_002.ogg",crosscut:"/game/audio/commercial-action/ws1-r01/impactMetal_medium_003.ogg",rupture:"/game/audio/commercial-action/ws1-r01/impactMetal_heavy_001.ogg",ruptureBody:"/game/audio/commercial-action/ws1-r01/impactMining_002.ogg",guard:"/game/audio/commercial-action/ws1-r01/impactPlate_medium_002.ogg",defeat:"/game/audio/commercial-action/ws1-r01/impactPlate_heavy_002.ogg"},zu=92,Lu=60/zu/2,_r=.08,zo=[110,130.81,146.83,174.61,146.83,123.47];function Fu(t,e,a=_r){return!Number.isFinite(t)||t<e?e+a:t}function Ou(t,e,a){return t===void 0||!Number.isFinite(t)||e-t+1e-9>=a}class Uu{firstStageMusicActive=typeof window<"u"&&On(window.location.search,window.location.pathname);context=null;master=null;musicBus=null;effectsBus=null;noiseBuffer=null;cueLastPlayedAt=new Map;sampleVoices=new Set;nextBeatAt=0;beatIndex=0;danger=0;muted=!1;get isReady(){return this.context!==null&&this.context.state==="running"}async unlock(){if(this.context===null){const e=new AudioContext({latencyHint:"interactive",sampleRate:44100}),a=e.createGain(),r=e.createGain(),s=e.createGain(),i=e.createDynamicsCompressor();a.gain.value=this.muted?0:.72,r.gain.value=this.firstStageMusicActive?0:.22,s.gain.value=.56,i.threshold.value=-18,i.knee.value=18,i.ratio.value=7,i.attack.value=.003,i.release.value=.16,r.connect(a),s.connect(i),i.connect(a),a.connect(e.destination),this.context=e,this.master=a,this.musicBus=r,this.effectsBus=s,this.noiseBuffer=Nu(e),this.nextBeatAt=e.currentTime+_r}this.context.state!=="running"&&(await this.context.resume(),this.nextBeatAt=this.context.currentTime+_r)}setMuted(e){const a=this.muted;if(this.muted=e,this.context!==null&&this.master!==null){const r=this.context.currentTime;a&&!e&&(this.nextBeatAt=r+_r),this.master.gain.cancelScheduledValues(r),this.master.gain.setTargetAtTime(e?0:.72,r,.015)}for(const r of this.sampleVoices)r.muted=e}setDanger(e){this.danger=bi(e,0,1)}update(){const e=this.context,a=this.musicBus;if(e===null||a===null||e.state!=="running"||this.muted||this.firstStageMusicActive)return;const r=e.currentTime,s=r+_r;this.nextBeatAt=Fu(this.nextBeatAt,r);let i=0;for(;this.nextBeatAt<=s&&i<2;){const n=zo[this.beatIndex%zo.length]??110,o=this.beatIndex%4===0;this.playTone(n,this.nextBeatAt,o?.2:.105,o?.095:.05,"square",a),this.danger>.15&&this.beatIndex%2===1&&this.playTone(n*2.01,this.nextBeatAt+.015,.065,.025+this.danger*.035,"sawtooth",a),o&&this.playNoise(this.nextBeatAt,.045,.008+this.danger*.012,210,a),this.beatIndex+=1,this.nextBeatAt+=Lu,i+=1}}play(e){const a=this.context,r=this.effectsBus;if(a===null||r===null||a.state!=="running"||this.muted)return;const s=a.currentTime,i=Ru[e],n=this.cueLastPlayedAt.get(e);if(Ou(n,s,i.minimumIntervalSeconds))switch(this.cueLastPlayedAt.set(e,s),e){case"blade":this.playSweep(980,310,s,.09,.16,"sawtooth",r),this.playTone(1480,s+.012,.045,.055,"triangle",r),this.playNoise(s,.045,.045,2600,r);break;case"impact":this.playSample(Bt.rupture,.42,.96),this.playSweep(144,42,s,.2,.24,"square",r),this.playTone(62,s+.025,.13,.16,"sine",r),this.playNoise(s,.12,.105,290,r);break;case"guard":this.playSample(Bt.guard,.32,1),this.playSweep(520,340,s,.09,.12,"square",r),this.playTone(740,s+.015,.09,.08,"triangle",r),this.playNoise(s,.045,.045,1900,r);break;case"perfect-guard":this.playSample(Bt.guard,.38,1.08),this.playNoise(s,.045,.07,3300,r),this.playTone(659.25,s,.14,.14,"triangle",r),this.playTone(987.77,s+.028,.18,.12,"square",r),this.playTone(1318.51,s+.062,.18,.08,"sine",r);break;case"passive-guard":this.playSweep(260,180,s,.1,.095,"triangle",r),this.playNoise(s,.06,.04,950,r);break;case"hurt":this.playSweep(160,72,s,.18,.17,"sawtooth",r),this.playNoise(s,.08,.08,480,r);break;case"warning":this.playTone(880,s,.055,.075,"square",r),this.playTone(660,s+.07,.07,.07,"square",r);break;case"enemy-impact":this.playSample(Bt.diagonal,.26,.92),this.playSweep(95,48,s,.13,.2,"square",r),this.playNoise(s,.075,.07,390,r);break;case"enemy-defeated":this.playSample(Bt.defeat,.5,.86),this.playSample(Bt.ruptureBody,.38,.8),this.playNoise(s+.012,.16,.06,330,r);break;case"dodge":this.playSweep(420,135,s,.11,.09,"triangle",r),this.playNoise(s,.065,.04,1100,r);break;case"relic":this.playSweep(150,1040,s,.36,.16,"triangle",r),this.playTone(308.5,s+.035,.26,.08,"square",r),this.playTone(617,s+.08,.28,.07,"sine",r),this.playNoise(s+.03,.2,.04,1400,r);break;case"item":this.playTone(440,s,.09,.1,"triangle",r),this.playTone(659.25,s+.065,.13,.09,"triangle",r);break;case"pickup":this.playTone(329.63,s,.055,.08,"square",r),this.playTone(493.88,s+.045,.075,.08,"square",r);break;case"ui":this.playTone(246.94,s,.045,.045,"square",r);break;case"result":this.playTone(220,s,.22,.08,"triangle",r),this.playTone(329.63,s+.11,.27,.08,"triangle",r),this.playTone(493.88,s+.23,.36,.07,"triangle",r);break;case"outcome-destroy":this.playSweep(164.81,55,s,.48,.18,"sawtooth",r),this.playNoise(s+.08,.24,.1,260,r);break;case"outcome-calm":this.playTone(261.63,s,.42,.1,"triangle",r),this.playTone(392,s+.12,.46,.09,"triangle",r);break;case"outcome-connect":this.playTone(220,s,.5,.07,"square",r),this.playSweep(330,665,s+.08,.56,.1,"triangle",r),this.playNoise(s+.12,.4,.035,1800,r);break;case"link":this.playSweep(430,1260,s,.12,.14,"triangle",r),this.playTone(1760,s+.035,.08,.07,"sine",r),this.playNoise(s+.012,.06,.045,2900,r);break;case"support":this.playTone(392,s,.09,.08,"square",r),this.playTone(587.33,s+.055,.13,.07,"triangle",r),this.playNoise(s+.03,.07,.035,1600,r);break;case"contact-diagonal":this.playSample(Bt.crosscut,.46,1.04),this.playSample(Bt.diagonal,.2,1.1),this.playNoise(s+.004,.04,.018,2200,r);break;case"contact-crosscut":this.playSample(Bt.rupture,.5,1.04),this.playSample(Bt.guard,.24,.94),this.playNoise(s+.012,.065,.024,1420,r);break;case"contact-rupture":this.playSample(Bt.rupture,.5,.88),this.playSample(Bt.ruptureBody,.48,.78),this.playNoise(s+.006,.13,.045,320,r);break}}playWs1(e){switch(e){case"ws1.link-confirmed":this.play("link");break;case"ws1.link-missed":case"ws1.target-acquired":this.play("ui");break;case"ws1.support-warning":case"ws1.support-expose":this.play("support");break;case"ws1.hit-light":this.play("blade");break;case"ws1.hit-heavy":this.play("impact");break;case"ws1.contact-diagonal":this.play("contact-diagonal");break;case"ws1.contact-crosscut":this.play("contact-crosscut");break;case"ws1.contact-rupture":this.play("contact-rupture");break;case"ws1.guard":this.play("guard");break;case"ws1.dodge":this.play("dodge");break;case"ws1.finisher":this.play("relic");break}}dispose(){this.context!==null&&this.context.close(),this.context=null,this.master=null,this.musicBus=null,this.effectsBus=null,this.noiseBuffer=null,this.cueLastPlayedAt.clear();for(const e of this.sampleVoices)e.pause(),e.removeAttribute("src");this.sampleVoices.clear()}playSample(e,a,r){if(typeof Audio>"u")return;const s=new Audio(e);s.preload="auto",s.volume=bi(a,0,.5),s.playbackRate=bi(r,.75,1.25),s.muted=this.muted;const i=()=>{this.sampleVoices.delete(s),s.removeAttribute("src")};s.addEventListener("ended",i,{once:!0}),s.addEventListener("error",i,{once:!0}),this.sampleVoices.add(s),s.play().catch(i)}playTone(e,a,r,s,i,n){const o=this.context;if(o===null)return;const A=o.createOscillator(),l=o.createGain();A.type=i,A.frequency.setValueAtTime(e,a),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+.008),l.gain.exponentialRampToValueAtTime(1e-4,a+r),A.connect(l),l.connect(n),A.start(a),A.stop(a+r+.02)}playSweep(e,a,r,s,i,n,o){const A=this.context;if(A===null)return;const l=A.createOscillator(),c=A.createGain();l.type=n,l.frequency.setValueAtTime(e,r),l.frequency.exponentialRampToValueAtTime(Math.max(1,a),r+s),c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(i,r+.006),c.gain.exponentialRampToValueAtTime(1e-4,r+s),l.connect(c),c.connect(o),l.start(r),l.stop(r+s+.02)}playNoise(e,a,r,s,i){const n=this.context,o=this.noiseBuffer;if(n===null||o===null)return;const A=n.createBufferSource(),l=n.createBiquadFilter(),c=n.createGain();A.buffer=o,l.type="bandpass",l.frequency.value=s,l.Q.value=.7,c.gain.setValueAtTime(r,e),c.gain.exponentialRampToValueAtTime(1e-4,e+a),A.connect(l),l.connect(c),c.connect(i),A.start(e),A.stop(e+a)}}function Nu(t){const e=Math.floor(t.sampleRate*.5),a=t.createBuffer(1,e,t.sampleRate),r=a.getChannelData(0);let s=1235467297;for(let i=0;i<r.length;i+=1)s^=s<<13,s^=s>>>17,s^=s<<5,r[i]=(s>>>0)/4294967295*2-1;return a}function De(t,e,a,r){return{role:t,minimumIntervalSeconds:e,scheduledVoices:a,peakVoiceGain:r}}function bi(t,e,a){return Math.min(a,Math.max(e,t))}const Hu=.2,_u=1,Gu=12,Xu=90,Lo=48,Fo=72,Oo=30,qu=230,Yu={manualInputs:0,links:0,misses:0,supportCommands:0,supportWarnings:0};function Uo(){return{chainStep:0,autoChainStep:0,lastAutoStrikeTick:-1e3,autoChainTargetId:null,lastLinkedTick:-1e3,bufferedAttackUntilTick:-1,exposedTargetId:null,exposeExpiresTick:-1,warnedThreatId:null,movementPriorityEnabled:!1,movementPriorityQueued:!1,continuousMoveTicks:0,movementPriorityBlend:0,guardEnabled:!1,telemetry:Yu}}function Rr(t,e){return{...t,[e]:t[e]+1}}function us(t){return t.phase==="windup"&&t.targetId!==null&&t.targetInHitRange&&t.progress>=Hu&&t.progress<=_u}function ju(t,e){let a=t;if(e.toggleGuard===!0){const r=!t.guardEnabled;a={...a,guardEnabled:r,movementPriorityEnabled:r?!1:a.movementPriorityEnabled,movementPriorityQueued:r?!1:a.movementPriorityQueued,continuousMoveTicks:r?0:a.continuousMoveTicks}}return a}function Wu(t,e,a){const s=a.moving===!0&&!e.guardEnabled?Math.min(Oo*4,t.continuousMoveTicks+1):0,i=a.nearestHostileDistance,n=typeof i=="number"&&Number.isFinite(i)&&i<=qu,o=a.presentation.phase==="windup"||a.presentation.phase==="hit"||a.presentation.targetInHitRange;return{...e,continuousMoveTicks:s,movementPriorityEnabled:s>=Oo&&!n&&!o&&!e.guardEnabled,movementPriorityQueued:!1}}function Vu(t,e){const a=Number.isFinite(t)?Math.min(1,Math.max(0,t)):0;return e?Math.min(1,a+.14):Math.max(0,a-.2)}function Ku(t,e){const a=[],r=e.tick<=t.exposeExpiresTick?t.exposedTargetId:null;let s=ju({...t,exposedTargetId:r,exposeExpiresTick:r===null?-1:t.exposeExpiresTick},e);s=Wu(t,s,e),s={...s,movementPriorityBlend:Vu(t.movementPriorityBlend,s.movementPriorityEnabled)};let i=!1,n=null,o=null;const A=t.bufferedAttackUntilTick>=e.tick;if(e.priorityThreatId!==null&&e.priorityThreatId!==t.warnedThreatId?(s={...s,warnedThreatId:e.priorityThreatId,telemetry:Rr(s.telemetry,"supportWarnings")},a.push("ws1.support-warning")):e.priorityThreatId===null&&t.warnedThreatId!==null&&(s={...s,warnedThreatId:null}),e.contextualCommand&&e.presentation.targetId!==null&&(i=!0,s={...s,exposedTargetId:e.presentation.targetId,exposeExpiresTick:e.tick+Xu,telemetry:Rr(s.telemetry,"supportCommands")},a.push("ws1.support-expose")),us(e.presentation)&&!s.movementPriorityEnabled&&!s.guardEnabled&&a.push("ws1.link-window"),e.manualAttack&&!s.movementPriorityEnabled&&!s.guardEnabled&&(s={...s,telemetry:Rr(s.telemetry,"manualInputs")},!us(e.presentation)&&e.presentation.targetId!==null&&(e.presentation.phase==="acquire"||e.presentation.phase==="windup")?s={...s,bufferedAttackUntilTick:e.tick+Gu}:us(e.presentation)||(s={...s,telemetry:Rr(s.telemetry,"misses")},a.push("ws1.link-missed"))),!s.movementPriorityEnabled&&!s.guardEnabled&&us(e.presentation)&&(e.manualAttack||A)){const c=e.tick-t.lastLinkedTick<=Lo?Math.min(3,Math.max(1,t.chainStep+1)):1,d=s.exposedTargetId===e.presentation.targetId;n={eventId:"ws1.timing-link",cueId:"ws1.link-confirmed",chainStep:c,damageMultiplier:1.12+c*.08+(d?.12:0),cooldownMultiplier:Math.max(.52,.78-c*.06),knockbackMultiplier:1+c*.22,exposedTargetId:d?s.exposedTargetId:null},s={...s,chainStep:c,lastLinkedTick:e.tick,bufferedAttackUntilTick:-1,telemetry:Rr(s.telemetry,"links")},a.push("ws1.link-confirmed")}else!e.manualAttack&&e.tick-t.lastLinkedTick>Lo&&(s={...s,chainStep:0});if(e.autoAttack&&n===null&&!s.movementPriorityEnabled&&!s.movementPriorityQueued&&!s.guardEnabled){const c=e.presentation.targetId!==null&&e.presentation.targetId===t.autoChainTargetId&&e.tick-t.lastAutoStrikeTick<=Fo?Math.min(3,Math.max(1,t.autoChainStep+1)):1;o={chainStep:c,damageMultiplier:c===3?1.18:c===2?1.08:1,cooldownMultiplier:c===3?.78:c===2?.86:.92,knockbackMultiplier:c===3?1.55:c===2?1.25:1,targetId:e.presentation.targetId},s={...s,autoChainStep:c,lastAutoStrikeTick:e.tick,autoChainTargetId:e.presentation.targetId}}else!e.autoAttack&&e.tick-t.lastAutoStrikeTick>Fo&&(s={...s,autoChainStep:0,autoChainTargetId:null});return{state:s,timingLink:n,autoChain:o,consumeContextualCommand:i,cues:a}}const Ju="ws1-r01";function Zu(t,e=""){const a=new URLSearchParams(t),r=a.get("actionProfile")===Ju||/\/r13(?:\/|$)/i.test(e);return{enabled:r,visualLane:r&&a.get("ws1VisualLane")==="webgpu"?"webgpu":"baseline"}}const $u=Object.freeze({1:{version:"ws1-contact-v1",chainStep:1,motionId:"diagonal-cut",contactProgress:.48,hitstopMs:50,cameraImpulse:.18,vfxScale:.96,audioCue:"ws1.contact-diagonal",enemyResponse:"flinch"},2:{version:"ws1-contact-v1",chainStep:2,motionId:"reverse-crosscut",contactProgress:.52,hitstopMs:72,cameraImpulse:.3,vfxScale:1.22,audioCue:"ws1.contact-crosscut",enemyResponse:"lateral-stagger"},3:{version:"ws1-contact-v1",chainStep:3,motionId:"forward-rupture",contactProgress:.58,hitstopMs:110,cameraImpulse:.48,vfxScale:1.68,audioCue:"ws1.contact-rupture",enemyResponse:"bounded-knockback"}});function eh(t){return $u[t]}const At=30,nc=3600,oc=1800,Ae={x:500,y:950},ye={town:{id:"town",name:"Dustwake Town",bounds:{x:80,y:500,width:620,height:800},center:{x:390,y:900},interactionPoint:Ae},fork:{id:"fork",name:"Three-Way Fork",bounds:{x:1180,y:550,width:680,height:700},center:{x:1520,y:900},interactionPoint:{x:1520,y:900}},ruin:{id:"ruin",name:"Listening Ruin",bounds:{x:2450,y:420,width:850,height:960},center:{x:2875,y:900},interactionPoint:{x:2930,y:900}}},th=[ye.town,ye.fork,ye.ruin],Ac=[{id:"town-hall",kind:"building",bounds:{x:130,y:570,width:250,height:150},solid:!0,height:96},{id:"town-well",kind:"rock",bounds:{x:320,y:790,width:82,height:82},solid:!0,height:34},{id:"south-house",kind:"building",bounds:{x:150,y:1090,width:230,height:130},solid:!0,height:78},{id:"town-board-collider",kind:"rock",bounds:{x:Ae.x-46,y:Ae.y-10,width:92,height:20},solid:!0,height:0},{id:"town-hall-workyard-collider",kind:"rock",bounds:{x:380,y:707,width:100,height:64},solid:!0,height:0},{id:"town-repair-bench-collider",kind:"rock",bounds:{x:510,y:777,width:115,height:76},solid:!0,height:0},{id:"town-south-lamp-collider",kind:"rock",bounds:{x:460,y:1030,width:20,height:23},solid:!0,height:0},{id:"town-kitchen-garden-collider",kind:"rock",bounds:{x:405,y:1110,width:75,height:90},solid:!0,height:0},{id:"town-south-crates-collider",kind:"rock",bounds:{x:385,y:1186,width:61,height:53},solid:!0,height:0},{id:"fork-boulder",kind:"rock",bounds:{x:1405,y:665,width:130,height:120},solid:!0,height:64},{id:"shallow-basin",kind:"water",bounds:{x:1900,y:1125,width:300,height:170},solid:!0,height:4},{id:"ruin-west-wall-north",kind:"wall",bounds:{x:2500,y:500,width:48,height:320},solid:!0,height:84},{id:"ruin-west-wall-south",kind:"wall",bounds:{x:2500,y:980,width:48,height:320},solid:!0,height:84},{id:"ruin-north-wall",kind:"wall",bounds:{x:2500,y:500,width:700,height:48},solid:!0,height:84},{id:"ruin-south-wall",kind:"wall",bounds:{x:2500,y:1252,width:700,height:48},solid:!0,height:84},{id:"ruin-pillar-north",kind:"pillar",bounds:{x:2720,y:690,width:68,height:68},solid:!0,height:100},{id:"ruin-pillar-south",kind:"pillar",bounds:{x:2720,y:1042,width:68,height:68},solid:!0,height:100}],ah=[{id:"town-contract-board",kind:"contract-board",x:Ae.x,y:Ae.y,rotation:0,landmarkId:"town",interactive:!0},{id:"town-lamp-a",kind:"lamp",x:470,y:760,rotation:0,landmarkId:"town",interactive:!1},{id:"town-lamp-b",kind:"lamp",x:470,y:1040,rotation:0,landmarkId:"town",interactive:!1},{id:"fork-sign",kind:"signpost",x:1520,y:900,rotation:.15,landmarkId:"fork",interactive:!1},{id:"fork-dead-tree",kind:"dead-tree",x:1670,y:710,rotation:-.4,landmarkId:"fork",interactive:!1},{id:"ruin-relay",kind:"relay",x:2790,y:900,rotation:0,landmarkId:"ruin",interactive:!1},{id:"ruin-anomaly-marker",kind:"anomaly-marker",x:2930,y:900,rotation:0,landmarkId:"ruin",interactive:!0}],ai={blade:{id:"blade",name:"Survey Blade",range:104,damage:16,cooldownTicks:10,arcCosine:.25,hitLimit:2,knockback:12,cue:"blade-swing"},impact:{id:"impact",name:"Pile Driver",range:66,damage:38,cooldownTicks:25,arcCosine:-.2,hitLimit:3,knockback:38,cue:"impact-swing"}},Un={"scrap-hound":{kind:"scrap-hound",name:"Scrap Hound",radius:18,maxHp:38,speed:150,damage:12,attackRange:42,aggroRange:360,telegraphTicks:9,recoveryTicks:24},"relay-shell":{kind:"relay-shell",name:"Relay Shell",radius:27,maxHp:92,speed:46,damage:22,attackRange:64,aggroRange:270,telegraphTicks:24,recoveryTicks:39},murmur:{kind:"murmur",name:"Murmur",radius:21,maxHp:54,speed:92,damage:16,attackRange:136,aggroRange:440,telegraphTicks:15,recoveryTicks:30},"culvert-lurker":{kind:"culvert-lurker",name:"Culvert Lurker",radius:24,maxHp:64,speed:108,damage:18,attackRange:168,aggroRange:340,telegraphTicks:22,recoveryTicks:34},"named-anomaly":{kind:"named-anomaly",name:"Orison, the Listening Fault",radius:42,maxHp:124,speed:38,damage:28,attackRange:210,aggroRange:620,telegraphTicks:28,recoveryTicks:42}},rh={normal:{hp:1,damage:1,telegraph:1},elite:{hp:1.45,damage:1.18,telegraph:1.3},boss:{hp:1,damage:1,telegraph:1}};function lc(t,e){return e??(t==="named-anomaly"?"boss":"normal")}function Ba(t,e){const a=Un[t],r=rh[lc(t,e)];return{...a,maxHp:Math.round(a.maxHp*r.hp),damage:Math.round(a.damage*r.damage),telegraphTicks:Math.max(1,Math.round(a.telegraphTicks*r.telegraph))}}const ht="anomaly-orison",Nn=[{id:"enemy-hound",kind:"scrap-hound",x:940,y:835},{id:"enemy-shell",kind:"relay-shell",x:1820,y:1e3},{id:"enemy-murmur",kind:"murmur",x:2270,y:760},{id:ht,kind:"named-anomaly",x:ye.ruin.interactionPoint.x,y:ye.ruin.interactionPoint.y}],cc={"edge-coil":{id:"edge-coil",name:"Edge Coil",description:"Adds 6 damage to the fast, long-reaching blade.",effect:"blade-damage",amount:6},"gravity-weight":{id:"gravity-weight",name:"Gravity Weight",description:"Adds 12 damage to the slow, close impact weapon.",effect:"impact-damage",amount:12},"field-tonic":{id:"field-tonic",name:"Field Tonic",description:"Adds one 45 HP healing item.",effect:"healing-item",amount:1},"relay-capacitor":{id:"relay-capacitor",name:"Relay Capacitor",description:"Adds 10 relic damage and shortens its cooldown by one second.",effect:"relic-power",amount:10},"quiet-chime":{id:"quiet-chime",name:"Quiet Chime",description:"Allows the relic pulse to calm the named anomaly.",effect:"calm-key",amount:1},"signal-key":{id:"signal-key",name:"Signal Key",description:"Allows a direct connection with the named anomaly.",effect:"connect-key",amount:1}},sh=[{id:"pickup-edge-coil",lootId:"edge-coil",x:665,y:760,radius:18},{id:"pickup-field-tonic",lootId:"field-tonic",x:1050,y:1020,radius:18},{id:"pickup-gravity-weight",lootId:"gravity-weight",x:1640,y:1105,radius:18},{id:"pickup-relay-capacitor",lootId:"relay-capacitor",x:2030,y:720,radius:18},{id:"pickup-quiet-chime",lootId:"quiet-chime",x:2360,y:1030,radius:18},{id:"pickup-signal-key",lootId:"signal-key",x:2350,y:900,radius:18}],ih={destroy:{outcome:"destroy",title:"Fault Silenced",townReaction:"The town accepts the quiet, but the relay keepers mourn the lost signal."},calm:{outcome:"calm",title:"Fault at Rest",townReaction:"The ruin grows still. Travelers begin leaving offerings at the fork."},connect:{outcome:"connect",title:"A Line Left Open",townReaction:"Messages arrive from the ruin, and the town argues over who may answer."}},Oa={"counter-cutter":{id:"counter-cutter",name:"位相測量刃《カウンター・カッター》",weaponId:"blade",effectDomain:"phase-shear",mechanism:"刃先の接触位相だけを先行させ、素材の格子欠陥へ短い剪断面を通す。",flavorText:"よく切れるのではない。切れた結果だけが、少し早く到着する。",targetPolicy:"前方の近い単体を優先し、狭い角度から高速に再捕捉する。",movementPolicy:"windup中も移動を維持し、間合いを横切りながら刻む。",budget:{impact:16,reach:26,tempo:28,mobility:22,control:8},resource:{id:"phase-charge",name:"位相電荷",maximum:4,skillCost:4,gainRule:"blade damage eventごとに1。"},upgrade:{maximumLevel:3,salvageCost:2}},"breach-driver":{id:"breach-driver",name:"慣性杭《ブリーチ・ドライバー》",weaponId:"impact",effectDomain:"inertial-compression",mechanism:"衝突直前に周辺質量の慣性参照を杭頭へ集め、短距離へ圧縮して解放する。",flavorText:"重いのは杭ではない。殴る瞬間だけ、周囲が杭の味方をする。",targetPolicy:"近距離の広い角度と複数targetを取り、telegraph中の脅威を優先する。",movementPolicy:"windup中は踏ん張り、命中後も短いrecoveryを引き受ける。",budget:{impact:40,reach:10,tempo:10,mobility:8,control:32},resource:{id:"compression",name:"圧縮圧",maximum:3,skillCost:3,gainRule:"impact damageまたはjust guardごとに1。"},upgrade:{maximumLevel:3,salvageCost:2}}},dc={"edge-coil":{lootId:"edge-coil",name:"縁断コイル E-04",candidateBuildId:"counter-cutter",salvageValue:2,compatibilityTags:["phase","edge","rapid"],explanation:"位相剪断系。Counter Cutterのframeへ直接装備できる。"},"gravity-weight":{lootId:"gravity-weight",name:"局所重錘 G-12",candidateBuildId:"breach-driver",salvageValue:2,compatibilityTags:["inertia","impact","anchor"],explanation:"慣性圧縮系。Breach Driverの杭頭へ直接装備できる。"},"relay-capacitor":{lootId:"relay-capacitor",name:"中継蓄相器 C-17",candidateBuildId:null,salvageValue:3,compatibilityTags:["phase","inertia","storage"],explanation:"両buildの変換損失を埋める共通増幅器。強化触媒として使える。"}},uc=Object.freeze(Object.keys(dc));function nh(t){return uc.includes(t)}function oh(){return uc}function No(){return{schemaVersion:1,equippedBuildId:"counter-cutter",buildLevels:{"counter-cutter":1,"breach-driver":1},unlockedBuildIds:["counter-cutter"],salvage:0,pendingOffer:null,processedLootIds:[],resource:0,namedEnemyWard:"intact"}}function Na(t){const e=t.equippedBuildId,a=Oa[e],r=t.buildLevels[e],s=r-1;return e==="counter-cutter"?{buildId:e,level:r,weaponId:a.weaponId,weaponDamageBonus:4+s*4,weaponRangeMultiplier:1.18+s*.04,weaponCooldownMultiplier:Math.max(.68,.82-s*.04),relicDamage:28+s*7,relicRange:220+s*12,relicCooldownTicks:5*At,resourceId:a.resource.id,resourceMaximum:a.resource.maximum,resourceSkillCost:a.resource.skillCost}:{buildId:e,level:r,weaponId:a.weaponId,weaponDamageBonus:18+s*10,weaponRangeMultiplier:.88+s*.02,weaponCooldownMultiplier:Math.max(.98,1.12-s*.04),relicDamage:62+s*14,relicRange:150+s*10,relicCooldownTicks:6*At,resourceId:a.resource.id,resourceMaximum:a.resource.maximum,resourceSkillCost:a.resource.skillCost}}function Ah(t,e){if(!nh(e)||t.processedLootIds.includes(e))return{state:t,events:[]};const a=dc[e];return{state:{...t,pendingOffer:a,processedLootIds:[...t.processedLootIds,e]},events:[{type:"offer-opened",offer:a}]}}function lh(t,e){const a=t.pendingOffer;if(a===null)return zr(t,e,"処理待ちのlootがない。");if(e==="equip"){if(a.candidateBuildId===null)return zr(t,e,"この部品はbuild frameではない。");const n=a.candidateBuildId;return{state:{...t,equippedBuildId:n,unlockedBuildIds:t.unlockedBuildIds.includes(n)?t.unlockedBuildIds:[...t.unlockedBuildIds,n],pendingOffer:null,resource:0},events:[{type:"build-equipped",buildId:n}]}}if(e==="disassemble")return{state:{...t,salvage:t.salvage+a.salvageValue,pendingOffer:null},events:[{type:"loot-disassembled",lootId:a.lootId,salvageGained:a.salvageValue}]};const r=Oa[t.equippedBuildId],s=t.buildLevels[t.equippedBuildId];if(a.lootId!=="relay-capacitor")return zr(t,e,"強化触媒ではない。");if(s>=r.upgrade.maximumLevel)return zr(t,e,"このbuildは上限に達している。");if(t.salvage<r.upgrade.salvageCost)return zr(t,e,"分解材が不足している。");const i=s+1;return{state:{...t,buildLevels:{...t.buildLevels,[t.equippedBuildId]:i},salvage:t.salvage-r.upgrade.salvageCost,pendingOffer:null,resource:0},events:[{type:"build-upgraded",buildId:t.equippedBuildId,level:i,salvageSpent:r.upgrade.salvageCost}]}}function ch(t,e,a=1){const r=Na(e),s=Math.max(At,Math.round(r.relicCooldownTicks*a));return{...t,player:{...t.player,weaponId:r.weaponId,weaponDamageBonuses:{blade:r.weaponId==="blade"?r.weaponDamageBonus:0,impact:r.weaponId==="impact"?r.weaponDamageBonus:0},weaponRangeMultipliers:{blade:r.weaponId==="blade"?r.weaponRangeMultiplier:1,impact:r.weaponId==="impact"?r.weaponRangeMultiplier:1},weaponCooldownMultipliers:{blade:r.weaponId==="blade"?r.weaponCooldownMultiplier:1,impact:r.weaponId==="impact"?r.weaponCooldownMultiplier:1},relicDamage:r.relicDamage,relicRange:r.relicRange,relicCooldownMaxTicks:s,relicCooldownTicks:Math.min(t.player.relicCooldownTicks,s)}}}function dh(t,e){const a=Na(t);return e.activateRelic===!0&&t.resource<a.resourceSkillCost?{command:{...e,activateRelic:!1,chooseWeapon:void 0},events:[{type:"action-rejected",action:"manual-skill",reason:`${Oa[t.equippedBuildId].resource.name}が不足している。`}]}:{command:{...e,chooseWeapon:void 0},events:[]}}function hc(t,e,a){const r=Na(t),s=Math.max(0,Math.min(r.resourceMaximum-t.resource,Math.floor(Number.isFinite(e)?e:0)));if(s===0)return{state:t,events:[]};const i=t.resource+s;return{state:{...t,resource:i},events:[{type:"resource-changed",resource:i,maximum:r.resourceMaximum,gained:s,reason:a}]}}function uh(t,e,a,r){let s=r;const i=[],n=[];let o=e,A=!1,l=!1;for(const c of a){if(c.type==="loot-picked"){const d=Ah(s,c.lootId);s=d.state,i.push(...d.events)}c.type==="relic-activated"&&(A=!0),c.type==="enemy-damaged"&&c.enemyId===ht&&c.source==="relic"&&(l=!0)}if(A){const c=s.namedEnemyWard==="intact";s={...s,resource:0,namedEnemyWard:l?"broken":s.namedEnemyWard},c&&l&&i.push({type:"named-enemy-ward-broken"})}else{const c=Na(s);let d=0,u="attack";for(const h of a)h.type==="enemy-damaged"&&h.source===c.weaponId&&(d+=1),h.type==="guard-resolved"&&h.preventedDamage>0&&(d+=1,u=h.justGuard?"just-guard":"guard"),h.type==="action-link-resolved"&&(d+=1,u="timing-link");if(d>0){const h=hc(s,d,u);s=h.state,i.push(...h.events)}}if(r.namedEnemyWard==="intact"&&!A&&a.filter(d=>d.type==="enemy-damaged"&&d.enemyId===ht&&d.source!=="relic").reduce((d,u)=>d+u.amount,0)>0){const d=t.enemies.find(u=>u.id===ht);o={...o,enemies:o.enemies.map(u=>u.id===ht&&d!==void 0?{...u,hp:d.hp}:u)}}for(const c of a)r.namedEnemyWard==="intact"&&!A&&c.type==="enemy-damaged"&&c.enemyId===ht&&c.source!=="relic"||n.push(c);return{world:o,events:n,buildcraft:{state:s,events:i}}}function zr(t,e,a){return{state:t,events:[{type:"action-rejected",action:e,reason:a}]}}const hn=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"]),hh=new Set([...hn,"Space","KeyJ","KeyK","KeyQ","KeyL","KeyR","KeyE","ShiftLeft","ShiftRight","Digit1","Digit7","Digit8","Digit9"]);class fh{constructor(e){this.root=e,this.joystickPad=hs(e,'[data-control="move"]'),this.joystickKnob=hs(e,'[data-control="move-knob"]'),this.bindJoystick(),this.bindActionButton("attack",()=>{this.queued.attack=!0}),this.isWs1ActionProfile()?this.bindActionButton("guard",()=>{this.queued.toggleGuard=!0}):this.bindHoldButton("guard",()=>{this.guardHeld=!0,this.updateGuardMovementChord()},()=>{this.guardHeld=!1,this.updateGuardMovementChord()}),this.bindActionButton("relic",()=>{this.queued.activateRelic=!0}),this.bindActionButton("item",()=>{this.queued.useItem=!0}),this.bindActionButton("interact",()=>{this.queued.interact=!0}),this.bindActionButton("switch-weapon",()=>{this.queued.switchWeapon=!0}),this.bindActionButton("outcome-destroy",()=>{this.queued.outcomeChoice=0}),this.bindActionButton("outcome-calm",()=>{this.queued.outcomeChoice=1}),this.bindActionButton("outcome-connect",()=>{this.queued.outcomeChoice=2}),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.reset),this.listeners.push(()=>{window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.reset)})}root;pressedKeys=new Set;listeners=[];joystickPad;joystickKnob;joystickPointerId=null;joystickX=0;joystickY=0;guardHeld=!1;guardMovementChordActive=!1;enabled=!1;queued=Di();inputSequence=0;lastInputAt=0;setEnabled(e){this.enabled=e,this.root.classList.toggle("is-controls-disabled",!e),e||this.reset()}consumeFrame(){const e=this.queued;this.queued=Di();const a=(this.isPressed("ArrowRight","KeyD")?1:0)-(this.isPressed("ArrowLeft","KeyA")?1:0),r=(this.isPressed("ArrowDown","KeyS")?1:0)-(this.isPressed("ArrowUp","KeyW")?1:0);let s=a===0?this.joystickX===0?e.moveX:this.joystickX:a,i=r===0?this.joystickY===0?e.moveY:this.joystickY:r;const n=Math.hypot(s,i);return n>1&&(s/=n,i/=n),this.enabled?{moveX:s,moveY:i,attack:e.attack,guard:this.isGuardActive(),dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,switchWeapon:e.switchWeapon,outcomeChoice:e.outcomeChoice,toggleMovementPriority:e.toggleMovementPriority,toggleGuard:e.toggleGuard}:{moveX:0,moveY:0,attack:!1,guard:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null,toggleMovementPriority:!1,toggleGuard:!1}}getLastInputSample(){return{sequence:this.inputSequence,eventAt:this.lastInputAt}}destroy(){this.reset();for(const e of this.listeners.splice(0))e()}bindJoystick(){const e=s=>{!this.enabled||this.joystickPointerId!==null||(s.preventDefault(),this.markInput(),this.joystickPointerId=s.pointerId,this.joystickPad.setPointerCapture(s.pointerId),this.updateJoystick(s))},a=s=>{s.pointerId===this.joystickPointerId&&(s.preventDefault(),this.updateJoystick(s))},r=s=>{s.pointerId===this.joystickPointerId&&(this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.updateGuardMovementChord(),this.updateJoystickKnob())};this.joystickPad.addEventListener("pointerdown",e),this.joystickPad.addEventListener("pointermove",a),this.joystickPad.addEventListener("pointerup",r),this.joystickPad.addEventListener("pointercancel",r),this.listeners.push(()=>{this.joystickPad.removeEventListener("pointerdown",e),this.joystickPad.removeEventListener("pointermove",a),this.joystickPad.removeEventListener("pointerup",r),this.joystickPad.removeEventListener("pointercancel",r)})}bindActionButton(e,a){const r=hs(this.root,`[data-control="${e}"]`),s=n=>{this.enabled&&(n.preventDefault(),this.markInput(),a())},i=n=>{this.enabled&&(n.preventDefault(),!(n.detail>0)&&(this.markInput(),a()))};r.addEventListener("pointerdown",s),r.addEventListener("click",i),this.listeners.push(()=>{r.removeEventListener("pointerdown",s),r.removeEventListener("click",i)})}bindHoldButton(e,a,r){const s=hs(this.root,`[data-control="${e}"]`),i=l=>{this.enabled&&(l.preventDefault(),this.markInput(),s.setPointerCapture(l.pointerId),a())},n=l=>{l.preventDefault(),r()},o=l=>{!this.enabled||l.repeat||l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),this.markInput(),a())},A=l=>{l.code!=="Space"&&l.code!=="Enter"||(l.preventDefault(),r())};s.addEventListener("pointerdown",i),s.addEventListener("pointerup",n),s.addEventListener("pointercancel",n),s.addEventListener("keydown",o),s.addEventListener("keyup",A),this.listeners.push(()=>{s.removeEventListener("pointerdown",i),s.removeEventListener("pointerup",n),s.removeEventListener("pointercancel",n),s.removeEventListener("keydown",o),s.removeEventListener("keyup",A)})}handleKeyDown=e=>{if(!(!this.enabled||ph(e))&&((hn.has(e.code)||e.code==="Space"||this.isWs1ActionProfile()&&e.code.startsWith("Shift"))&&e.preventDefault(),this.pressedKeys.add(e.code),this.queueMovementTap(e.code),this.isWs1ActionProfile()||this.updateGuardMovementChord(),!e.repeat))switch(hh.has(e.code)&&this.markInput(),e.code){case"Space":case"KeyJ":this.queued.attack=!0;break;case"KeyK":this.isWs1ActionProfile()||(this.queued.dodge=!0);break;case"ShiftLeft":case"ShiftRight":this.isWs1ActionProfile()&&(this.queued.toggleGuard=!0);break;case"KeyQ":case"KeyL":this.queued.activateRelic=!0;break;case"KeyR":this.queued.useItem=!0;break;case"KeyE":this.queued.interact=!0;break;case"Digit1":e.preventDefault(),this.queued.switchWeapon=!0;break;case"Digit7":this.queued.outcomeChoice=0;break;case"Digit8":this.queued.outcomeChoice=1;break;case"Digit9":this.queued.outcomeChoice=2;break}};handleKeyUp=e=>{this.pressedKeys.delete(e.code),this.isWs1ActionProfile()||this.updateGuardMovementChord()};reset=()=>{this.pressedKeys.clear(),this.guardHeld=!1,this.joystickPointerId=null,this.joystickX=0,this.joystickY=0,this.guardMovementChordActive=!1,this.queued=Di(),this.updateJoystickKnob()};updateJoystick(e){const a=this.joystickPad.getBoundingClientRect(),r=Math.min(a.width,a.height)*.5,s=e.clientX-(a.left+a.width*.5),i=e.clientY-(a.top+a.height*.5),n=Math.hypot(s,i),o=n>r?r/n:1;this.joystickX=s*o/r,this.joystickY=i*o/r,this.queued.moveX=this.joystickX,this.queued.moveY=this.joystickY,this.updateGuardMovementChord(),this.updateJoystickKnob()}updateGuardMovementChord(){if(this.isWs1ActionProfile())return;const e=Math.hypot(this.joystickX,this.joystickY)>.22||[...hn].some(r=>this.pressedKeys.has(r)),a=this.isGuardActive()&&e;a&&!this.guardMovementChordActive&&(this.queued.dodge=!0),this.guardMovementChordActive=a}isGuardActive(){return this.isWs1ActionProfile()?!1:this.guardHeld||this.pressedKeys.has("ShiftLeft")||this.pressedKeys.has("ShiftRight")}queueMovementTap(e){switch(e){case"ArrowRight":case"KeyD":this.queued.moveX=1;break;case"ArrowLeft":case"KeyA":this.queued.moveX=-1;break;case"ArrowDown":case"KeyS":this.queued.moveY=1;break;case"ArrowUp":case"KeyW":this.queued.moveY=-1;break}}updateJoystickKnob(){this.joystickKnob.style.setProperty("--move-x",`${this.joystickX*42}px`),this.joystickKnob.style.setProperty("--move-y",`${this.joystickY*42}px`)}markInput(){this.inputSequence+=1,this.lastInputAt=performance.now();const e=this.root.dataset;e!==void 0&&(e.lastInputSequence=String(this.inputSequence),e.lastInputAt=this.lastInputAt.toFixed(3))}isWs1ActionProfile(){return this.root.dataset.ws1ActionProfile==="ws1-r01"}isPressed(e,a){return this.pressedKeys.has(e)||this.pressedKeys.has(a)}}function Di(){return{moveX:0,moveY:0,attack:!1,dodge:!1,activateRelic:!1,useItem:!1,interact:!1,switchWeapon:!1,outcomeChoice:null,toggleMovementPriority:!1,toggleGuard:!1}}function hs(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`Prototype B control is missing: ${e}`);return a}function ph(t){return t.code!=="Space"&&t.code!=="Enter"?!1:typeof Element<"u"&&t.target instanceof Element&&t.target.closest("button[data-control]")!==null}const fc=1831565813,mh=4294967296;function gh(t){let e=2166136261;for(let a=0;a<t.length;a+=1)e^=t.charCodeAt(a),e=Math.imul(e,16777619);return e>>>0}function wh(t){const e=typeof t=="number"&&Number.isFinite(t)?Math.trunc(t)>>>0:gh(String(t));return e===0?fc:e}function vh(t){let e=t>>>0;return e===0&&(e=fc),e^=e<<13,e^=e>>>17,e^=e<<5,e>>>=0,{state:e,value:e/mh}}const yh=18,xh=162,Ho=100,_o=92,bh=30,Go=8,Dh=4,Bh=.3,Ph=.65,Xo=48,qo=.65,Eh=52,fn=132,Ch=154,Yo=174,Mh=236,pc=70,Sh=360,Ih=90,Qh=8;function Ga(t,e,a){return Math.min(a,Math.max(e,t))}function jo(t){return t===void 0||!Number.isFinite(t)?0:Ga(t,-1,1)}function Wo(t){return t===void 0||!Number.isFinite(t)?1:Ga(t,0,1.6)}function Nt(t,e){const a=Math.hypot(t,e);return a===0?{x:0,y:0}:{x:t/a,y:e/a}}function mc(t,e){let a=0;for(let r=0;r<t.length;r+=1)a=(a*31+t.charCodeAt(r))%e;return a}function kh(t,e,a){const r=a/2,s=(t+e)%a;return s<r?-1+s/r*2:3-s/r*2}function It(t,e,a,r){return Math.hypot(t-a,e-r)}function Vo(t,e,a){return t>=a.x&&t<=a.x+a.width&&e>=a.y&&e<=a.y+a.height}function Th(t,e,a,r){const s=Ga(t,r.x,r.x+r.width),i=Ga(e,r.y,r.y+r.height),n=t-s,o=e-i;return n*n+o*o<a*a}function gc(t){return{...t,bounds:{...t.bounds},center:{...t.center},interactionPoint:{...t.interactionPoint}}}function wc(t){return{...t,bounds:{...t.bounds}}}function Rh(t){return{...t,player:{...t.player,weaponDamageBonuses:{...t.player.weaponDamageBonuses},weaponRangeMultipliers:{...t.player.weaponRangeMultipliers},weaponCooldownMultipliers:{...t.player.weaponCooldownMultipliers},collectedLootIds:[...t.player.collectedLootIds]},enemies:t.enemies.map(e=>({...e,attack:{...e.attack}})),world:{...t.world,landmarks:t.world.landmarks.map(gc),terrain:t.world.terrain.map(wc),props:t.world.props.map(e=>({...e})),loot:t.world.loot.map(e=>({...e}))},quest:{...t.quest,visitedLandmarkIds:[...t.quest.visitedLandmarkIds],result:t.quest.result===null?null:{...t.quest.result}}}}function es(){return{phase:"idle",ticksRemaining:0,attackId:null,targetX:0,targetY:0,directionX:0,directionY:0}}function zh(){return{id:"player",x:430,y:900,radius:yh,facingX:1,facingY:0,hp:Ho,maxHp:Ho,speed:xh,weaponId:"blade",weaponCooldownTicks:0,weaponDamageBonuses:{blade:0,impact:0},weaponRangeMultipliers:{blade:1,impact:1},weaponCooldownMultipliers:{blade:1,impact:1},guarding:!1,guardStartedTick:null,dodgeCooldownTicks:0,invulnerableTicks:0,relicCooldownTicks:0,relicCooldownMaxTicks:5*At,relicDamage:14,relicRange:180,healingItems:1,healingAmount:45,collectedLootIds:[]}}function Ko(t,e,a,r){const s=t==="named-anomaly"?"boss":"normal",i=Ba(t,s),n=t==="named-anomaly";return{id:e,kind:t,rank:s,name:i.name,x:a,y:r,radius:i.radius,hp:i.maxHp,maxHp:i.maxHp,active:!n,defeated:!1,disposition:n?"dormant":"hostile",attack:es()}}function Jo(t){const e=wh(t);let a=e,r=0;const s=()=>{const n=vh(a);return a=n.state,r+=1,n.value},i=Nn.map(n=>{if(n.kind==="named-anomaly")return Ko(n.kind,n.id,n.x,n.y);const o=(s()-.5)*72,A=(s()-.5)*72;return Ko(n.kind,n.id,n.x+o,n.y+A)});return{saveVersion:1,contentVersion:"prototype-b-1",seed:e,rngState:a,rngDraws:r,tick:0,status:"playing",nextActionId:1,player:zh(),enemies:i,world:{width:nc,height:oc,landmarks:th.map(gc),terrain:Ac.map(wc),props:ah.map(n=>({...n})),loot:sh.map(n=>({...n,picked:!1}))},quest:{phase:"briefing",objective:"Read the town contract board.",visitedLandmarkIds:["town"],intent:null,outcome:null,result:null}}}function Hn(t,e){const a=`${e}-${t.nextActionId}`;return t.nextActionId+=1,a}function Zo(t,e,a,r){return t.world.terrain.some(s=>s.solid&&Th(e,a,r,s.bounds))}function ri(t,e,a,r,s,i){const n=Math.max(1,Math.ceil(Math.max(Math.abs(s),Math.abs(i))/Qh)),o=s/n,A=i/n;let l=e,c=a;for(let d=0;d<n;d+=1){const u=Ga(l+o,r,t.world.width-r);Zo(t,u,c,r)||(l=u);const h=Ga(c+A,r,t.world.height-r);Zo(t,l,h,r)||(c=h)}return{x:l,y:c}}function ts(t,e,a){const r=Ba(e.kind,e.rank),s=ri(t,e.x,e.y,e.radius,a.x*(r.speed/At),a.y*(r.speed/At));e.x=s.x,e.y=s.y}function Lh(t,e,a,r){if(a<=r)return;const s=Nt(t.player.x-e.x,t.player.y-e.y),i=kh(t.tick,mc(e.id,Xo),Xo);ts(t,e,Nt(s.x-s.y*i*qo,s.y+s.x*i*qo))}function Fh(t,e){const a=Nn.find(s=>s.id===e.id);a===void 0||It(e.x,e.y,a.x,a.y)<=Eh||ts(t,e,Nt(a.x-e.x,a.y-e.y))}function Oh(t,e,a){const r=mc(e.id,2)===0?1:-1,s=a===0?{x:r,y:0}:Nt(t.player.x-e.x,t.player.y-e.y),i={x:-s.y*r,y:s.x*r};let n,o;a<fn?(n=-1,o=.6):a>Yo?(n=1,o=.35):(n=Ga((a-Ch)/(Yo-fn),-.45,.45),o=1),ts(t,e,Nt(s.x*n+i.x*o,s.y*n+i.y*o))}function Uh(t,e,a,r){a>Mh||a<=r||ts(t,e,Nt(t.player.x-e.x,t.player.y-e.y))}function Nh(t,e,a,r){switch(e.kind){case"scrap-hound":Lh(t,e,a,r);break;case"relay-shell":Fh(t,e);break;case"murmur":Oh(t,e,a);break;case"culvert-lurker":Uh(t,e,a,r);break;case"named-anomaly":a>r&&ts(t,e,Nt(t.player.x-e.x,t.player.y-e.y));break}}function Hh(t,e,a){return t.kind==="murmur"?e>=fn&&e<=a:e<=a}function _h(t){t.weaponCooldownTicks=Math.max(0,t.weaponCooldownTicks-1),t.dodgeCooldownTicks=Math.max(0,t.dodgeCooldownTicks-1),t.invulnerableTicks=Math.max(0,t.invulnerableTicks-1),t.relicCooldownTicks=Math.max(0,t.relicCooldownTicks-1)}function Gh(t,e,a){const r=Nt(e,a);return(r.x!==0||r.y!==0)&&(t.facingX=r.x,t.facingY=r.y),r}function Xh(t,e,a){const r=jo(e.moveX),s=jo(e.moveY),i=Gh(t.player,r,s);if(e.dodge===!0&&t.player.dodgeCooldownTicks===0){const o=i.x===0&&i.y===0?{x:t.player.facingX,y:t.player.facingY}:i,A=t.player.x,l=t.player.y,c=ri(t,A,l,t.player.radius,o.x*_o,o.y*_o);return t.player.x=c.x,t.player.y=c.y,t.player.dodgeCooldownTicks=bh,t.player.invulnerableTicks=Go,t.player.guarding=!1,t.player.guardStartedTick=null,a.push({type:"dodge-started",tick:t.tick,fromX:A,fromY:l,toX:c.x,toY:c.y,invulnerableTicks:Go,cue:"dodge"}),!0}const n=ri(t,t.player.x,t.player.y,t.player.radius,i.x*(t.player.speed/At)*Wo(e.moveSpeedScale),i.y*(t.player.speed/At)*Wo(e.moveSpeedScale));return t.player.x=n.x,t.player.y=n.y,!1}function qh(t,e){const a=t.player.guarding,r=e.guard===!0&&e.dodge!==!0;t.player.guarding=r,r&&!a?t.player.guardStartedTick=t.tick:r||(t.player.guardStartedTick=null)}function si(t,e,a,r){t.quest.phase=e,t.quest.objective=a,r.push({type:"quest-advanced",tick:t.tick,phase:e,objective:a,cue:"quest"})}function $o(t,e,a){t.quest.visitedLandmarkIds.includes(e)||(t.quest.visitedLandmarkIds.push(e),a.push({type:"landmark-entered",tick:t.tick,landmarkId:e}))}function as(t){return t.enemies.find(e=>e.id===ht)}function Yh(t,e){const{x:a,y:r}=t.player;Vo(a,r,ye.fork.bounds)&&($o(t,"fork",e),t.quest.phase==="travel-to-fork"&&si(t,"travel-to-ruin","Follow the eastern route to the Listening Ruin.",e)),Vo(a,r,ye.ruin.bounds)&&$o(t,"ruin",e);const s=as(t);t.quest.phase==="travel-to-ruin"&&s!==void 0&&It(a,r,s.x,s.y)<=Sh&&si(t,"confrontation","Choose how to answer Orison: destroy, calm, or connect.",e)}function pn(t,e){return t.player.collectedLootIds.includes(e)}function jh(t,e){const a=cc[e];switch(a.effect){case"blade-damage":t.player.weaponDamageBonuses.blade+=a.amount;break;case"impact-damage":t.player.weaponDamageBonuses.impact+=a.amount;break;case"healing-item":t.player.healingItems+=a.amount;break;case"relic-power":t.player.relicDamage+=a.amount,t.player.relicCooldownMaxTicks=Math.max(2*At,t.player.relicCooldownMaxTicks-At),t.player.relicCooldownTicks=Math.min(t.player.relicCooldownTicks,t.player.relicCooldownMaxTicks);break}}function Wh(t,e,a){const s=t.world.loot.filter(i=>!i.picked&&It(t.player.x,t.player.y,i.x,i.y)<=t.player.radius+i.radius+pc).sort((i,n)=>{const o=It(t.player.x,t.player.y,i.x,i.y),A=It(t.player.x,t.player.y,n.x,n.y);return o-A||i.id.localeCompare(n.id)})[0];return s===void 0?!1:(s.picked=!0,pn(t,s.lootId)||(t.player.collectedLootIds.push(s.lootId),a.deferLootEffects?.includes(s.lootId)||jh(t,s.lootId)),e.push({type:"loot-picked",tick:t.tick,pickupId:s.id,lootId:s.lootId,cue:"loot"}),!0)}function _n(t,e,a){if(t.quest.outcome!==null)return;const r=as(t);r!==void 0&&(r.active=!1,r.attack=es(),r.disposition=e==="destroy"?"destroyed":e==="calm"?"calmed":"connected",r.defeated=e==="destroy",e==="destroy"&&(r.hp=0)),t.quest.intent=e,t.quest.outcome=e,a.push({type:"anomaly-resolved",tick:t.tick,anomalyId:ht,outcome:e,cue:e==="destroy"?"outcome-destroy":e==="calm"?"outcome-calm":"outcome-connect"}),si(t,"return-town","Return to the Dustwake contract board.",a)}function Vh(t,e,a){const r=e.chooseOutcome;if(r===void 0)return;if(t.quest.phase!=="confrontation"){a.push({type:"command-rejected",tick:t.tick,reason:"wrong-quest-phase"});return}if(t.quest.intent!==null||t.quest.outcome!==null){a.push({type:"command-rejected",tick:t.tick,reason:"outcome-already-chosen"});return}if(r==="calm"&&!pn(t,"quiet-chime")||r==="connect"&&!pn(t,"signal-key")){a.push({type:"command-rejected",tick:t.tick,reason:"outcome-not-available"});return}t.quest.intent=r;const s=as(t);s!==void 0&&(s.active=!0,s.disposition="hostile"),a.push({type:"outcome-committed",tick:t.tick,outcome:r})}function eA(t,e,a=pc){return It(t.x,t.y,e.x,e.y)<=t.radius+a}function ci(t,e){return It(t.x,t.y,e.x,e.y)<=t.radius+e.radius+Ih}function Kh(t,e,a,r){if(e.interact!==!0||Wh(t,a,r))return;if(t.quest.phase==="briefing"&&eA(t.player,ye.town.interactionPoint)){si(t,"travel-to-fork","Reach the Three-Way Fork.",a);return}const s=as(t);if(t.quest.phase==="confrontation"&&t.quest.intent==="connect"&&s!==void 0&&ci(t.player,s)){_n(t,"connect",a);return}if(t.quest.phase==="return-town"&&t.quest.outcome!==null&&eA(t.player,ye.town.interactionPoint)){const i={...ih[t.quest.outcome]};t.quest.phase="result",t.quest.objective="Route complete.",t.quest.result=i,t.status="result",a.push({type:"result-reached",tick:t.tick,result:i,cue:"result"})}}function Jh(t,e,a){e.chooseWeapon===void 0||e.chooseWeapon===t.player.weaponId||(t.player.weaponId=e.chooseWeapon,a.push({type:"weapon-selected",tick:t.tick,weaponId:e.chooseWeapon}))}function Gn(t,e){return e.active&&!e.defeated&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||t.quest.intent==="destroy")}function Zh(t,e,a){e.defeated||(e.defeated=!0,e.active=!1,e.disposition="destroyed",e.attack=es(),a.push({type:"enemy-defeated",tick:t.tick,enemyId:e.id,kind:e.kind}),e.id===ht&&_n(t,"destroy",a))}function vc(t,e,a,r,s,i){if(!Gn(t,e))return;const n=Math.min(e.hp,Math.max(0,a));e.hp=Math.max(0,e.hp-n),s.push({type:"enemy-damaged",tick:t.tick,enemyId:e.id,amount:n,remainingHp:e.hp,source:r,contact:i}),e.hp===0&&Zh(t,e,s)}function $h(t){const e=ai[t.player.weaponId];return{...e,range:Math.max(1,Math.round(e.range*t.player.weaponRangeMultipliers[t.player.weaponId])),damage:e.damage+t.player.weaponDamageBonuses[t.player.weaponId],cooldownTicks:Math.max(1,Math.round(e.cooldownTicks*t.player.weaponCooldownMultipliers[t.player.weaponId]))}}function tA(t,e){return It(t.x,t.y,e.x,e.y)}function ef(t,e,a){const r=e.x-t.x,s=e.y-t.y,i=Math.hypot(r,s);return i-e.radius>a.range?!1:i===0?!0:r/i*t.facingX+s/i*t.facingY>=a.arcCosine}function tf(t,e,a){if(a<=0||e.defeated)return;const r=Nt(e.x-t.player.x,e.y-t.player.y),s=ri(t,e.x,e.y,e.radius,r.x*a,r.y*a);e.x=s.x,e.y=s.y}function af(t,e,a,r){if(e.attack!==!0||t.player.weaponCooldownTicks>0||t.player.guarding||r)return;const s=$h(t),i=Hn(t,"player-attack"),n=e.timingLink,o=e.autoChain,A=n??o,l=A===void 0?void 0:eh(A.chainStep),c=A===void 0?1:Number.isFinite(A.damageMultiplier)?Math.min(1.6,Math.max(1,A.damageMultiplier)):1,d=A===void 0?1:Number.isFinite(A.cooldownMultiplier)?Math.min(1,Math.max(.5,A.cooldownMultiplier)):1,u=A===void 0?1:Number.isFinite(A.knockbackMultiplier)?Math.min(1.8,Math.max(1,A.knockbackMultiplier)):1,h=Math.max(1,Math.round(s.damage*c)),g=Math.max(1,Math.round(s.cooldownTicks*d));t.player.weaponCooldownTicks=g,n!==void 0?a.push({type:"action-link-resolved",tick:t.tick,actionId:i,eventId:n.eventId,cueId:n.cueId,chainStep:n.chainStep,damageMultiplier:c,cooldownMultiplier:d,exposedTargetId:n.exposedTargetId}):o!==void 0&&a.push({type:"auto-chain-resolved",tick:t.tick,actionId:i,chainStep:o.chainStep,targetId:o.targetId}),a.push({type:"player-attacked",tick:t.tick,actionId:i,weaponId:s.id,x:t.player.x,y:t.player.y,directionX:t.player.facingX,directionY:t.player.facingY,range:s.range,damage:h,cooldownTicks:g,cue:s.cue,contact:l});const p=t.enemies.filter(m=>Gn(t,m)&&ef(t.player,m,s)).sort((m,f)=>tA(t.player,m)-tA(t.player,f)||m.id.localeCompare(f.id)).slice(0,s.hitLimit);for(const m of p)vc(t,m,h,s.id,a,l),tf(t,m,s.knockback*u)}function rf(t,e,a){if(e.activateRelic!==!0||t.player.relicCooldownTicks>0)return;t.player.relicCooldownTicks=t.player.relicCooldownMaxTicks,a.push({type:"relic-activated",tick:t.tick,x:t.player.x,y:t.player.y,radius:t.player.relicRange,damage:t.player.relicDamage,cue:"relic"});const r=as(t);t.quest.phase==="confrontation"&&t.quest.intent==="calm"&&r!==void 0&&It(t.player.x,t.player.y,r.x,r.y)<=t.player.relicRange+r.radius&&_n(t,"calm",a);for(const s of t.enemies)Gn(t,s)&&It(t.player.x,t.player.y,s.x,s.y)<=t.player.relicRange+s.radius&&vc(t,s,t.player.relicDamage,"relic",a)}function sf(t,e,a){if(e.useItem!==!0)return;if(t.player.healingItems<=0){a.push({type:"command-rejected",tick:t.tick,reason:"item-empty"});return}if(t.player.hp>=t.player.maxHp){a.push({type:"command-rejected",tick:t.tick,reason:"item-full-health"});return}const r=t.player.hp;t.player.hp=Math.min(t.player.maxHp,t.player.hp+t.player.healingAmount),t.player.healingItems-=1,a.push({type:"item-used",tick:t.tick,healed:t.player.hp-r,remainingItems:t.player.healingItems,cue:"heal"})}function nf(t,e,a){const r=Ba(e.kind,e.rank),s=e.kind==="named-anomaly"&&t.nextActionId%3===0,i=s?Math.round(r.telegraphTicks*1.5):r.telegraphTicks,n=s?Math.round(r.attackRange*1.45):r.attackRange,o=Nt(t.player.x-e.x,t.player.y-e.y),A=Hn(t,s?"enemy-boss-surge":"enemy-attack");e.attack={phase:"telegraph",ticksRemaining:i,attackId:A,targetX:t.player.x,targetY:t.player.y,directionX:o.x,directionY:o.y},a.push({type:"enemy-attack-telegraphed",tick:t.tick,enemyId:e.id,attackId:A,x:e.x,y:e.y,directionX:o.x,directionY:o.y,range:n,resolveTick:t.tick+i,cue:"enemy-warning"})}function of(t,e){const a=Ba(e.kind,e.rank),r=e.attack.attackId?.startsWith("enemy-boss-surge-")===!0,s=r?a.attackRange*1.45:a.attackRange,i=t.player.x-e.x,n=t.player.y-e.y,o=Math.hypot(i,n);if(o>s+e.radius+t.player.radius)return!1;if(o===0)return!0;const A=i/o*e.attack.directionX+n/o*e.attack.directionY;return r||A>=.15}function Af(t,e){const a=Nt(e.x-t.x,e.y-t.y);return a.x*t.facingX+a.y*t.facingY>=0}function lf(t,e,a,r){const s=Ba(e.kind,e.rank),i=e.attack.attackId??Hn(t,"enemy-attack"),n=of(t,e),o=i.startsWith("enemy-boss-surge-"),A=o?Math.round(s.damage*1.35):s.damage;if(a.push({type:"enemy-attack-resolved",tick:t.tick,enemyId:e.id,attackId:i,hit:n,cue:"enemy-impact"}),n)if(t.player.invulnerableTicks>0)a.push({type:"player-dodged",tick:t.tick,enemyId:e.id});else{const l=t.player.guarding&&Af(t.player,e);let c=A;if(l){const u=(t.player.guardStartedTick===null?Number.POSITIVE_INFINITY:t.tick-t.player.guardStartedTick)<=Dh;c=u?0:Math.max(1,Math.ceil(A*Bh)),a.push({type:"guard-resolved",tick:t.tick,enemyId:e.id,justGuard:u,preventedDamage:A-c,receivedDamage:c,cue:u?"just-guard":"guard"})}else r.passiveGuard===!0&&(c=Math.max(1,Math.ceil(A*Ph)),a.push({type:"passive-guard-resolved",tick:t.tick,enemyId:e.id,preventedDamage:A-c,receivedDamage:c,cue:"passive-guard"}));c>0&&(t.player.hp=Math.max(0,t.player.hp-c),a.push({type:"player-damaged",tick:t.tick,enemyId:e.id,amount:c,remainingHp:t.player.hp}))}e.attack={...es(),phase:"recovery",ticksRemaining:o?Math.round(s.recoveryTicks*1.3):s.recoveryTicks}}function cf(t,e,a,r){if(!e.active||e.defeated||e.disposition!=="hostile"||t.status!=="playing")return;if(e.attack.phase==="telegraph"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&lf(t,e,a,r);return}if(e.attack.phase==="recovery"){e.attack.ticksRemaining=Math.max(0,e.attack.ticksRemaining-1),e.attack.ticksRemaining===0&&(e.attack=es());return}const s=Ba(e.kind,e.rank),i=It(e.x,e.y,t.player.x,t.player.y);if(i>s.aggroRange)return;const n=s.attackRange+e.radius+t.player.radius;Nh(t,e,i,n);const o=It(e.x,e.y,t.player.x,t.player.y);Hh(e,o,n)&&nf(t,e,a)}function df(t,e,a){for(const r of t.enemies)if(cf(t,r,e,a),t.player.hp===0){t.status="lost",e.push({type:"player-defeated",tick:t.tick});break}}function uf(t,e={},a={}){if(t.status!=="playing")return{state:t,events:[]};const r=Rh(t),s=[];r.tick+=1,_h(r.player),qh(r,e);const i=Xh(r,e,s);return Yh(r,s),Jh(r,e,s),Vh(r,e,s),Kh(r,e,s,a),af(r,e,s,i),rf(r,e,s),sf(r,e,s),df(r,s,e),{state:r,events:s}}const hf={blade:{buildId:"counter-cutter",acquireRange:150,dropRange:180,hitRange:108,openingLungeRange:138,openingLungeMovementScale:1.72,minimumFacingAlignment:Math.max(0,ai.blade.arcCosine),windupTicks:6,recoveryTicks:9,windupMovementScale:1,hitMovementScale:.9,recoveryMovementScale:1},impact:{buildId:"breach-driver",acquireRange:96,dropRange:128,hitRange:82,openingLungeRange:88,openingLungeMovementScale:.46,minimumFacingAlignment:Math.max(0,ai.impact.arcCosine),windupTicks:18,recoveryTicks:16,windupMovementScale:.35,hitMovementScale:.2,recoveryMovementScale:.75}},yc={phase:"idle",targetId:null,weaponId:null,phaseTicksRemaining:0,phaseTicksTotal:0};function Xn(t,e){return Math.hypot(e.x-t.player.x,e.y-t.player.y)}function xc(t,e){const a=e.x-t.player.x,r=e.y-t.player.y,s=Math.hypot(a,r);if(s===0)return 1;const i=Math.hypot(t.player.facingX,t.player.facingY);return i===0?-1:a/s*(t.player.facingX/i)+r/s*(t.player.facingY/i)}function ff(t,e){return t.status==="playing"&&e.active&&!e.defeated&&e.hp>0&&e.disposition==="hostile"&&(e.kind!=="named-anomaly"||t.quest.intent==="destroy")}function Fa(t,e,a,r,s=!1){return ff(t,e)&&Xn(t,e)<=r&&(s||xc(t,e)>=a.minimumFacingAlignment)}function Gr(t,e){if(e!==null)return t.enemies.find(a=>a.id===e)}function aA(t,e,a,r){const s=e.attack.phase==="telegraph"?1:0,i=s===1&&lc(e.kind,e.rank)!=="normal"?1:0,n=e.id===a?1:0;return 1e3-Xn(t,e)*5+(r?0:xc(t,e)*48)+s*36+i*12+n*54}function pf(t,e){if(e===void 0)return{x:0,y:0,distance:0};const a=e.x-t.player.x,r=e.y-t.player.y,s=Math.hypot(a,r);return s<=Number.EPSILON?{x:0,y:0,distance:0}:{x:a/s,y:r/s,distance:s}}function mf(t,e,a,r){return t.enemies.filter(s=>Fa(t,s,e,e.acquireRange,r)).sort((s,i)=>aA(t,i,a,r)-aA(t,s,a,r)||s.id.localeCompare(i.id))[0]}function Xr(t,e,a,r){return{phase:t,targetId:a,weaponId:e,phaseTicksRemaining:r,phaseTicksTotal:r}}function rA(t){return{...yc,weaponId:t}}function ir(t,e,a){const r=t.player.weaponId,s=qn(t,r);if(t.status!=="playing"||t.player.guarding||t.player.weaponCooldownTicks>0)return rA(r);const i=mf(t,s,e,a.omnidirectionalTargeting===!0);return i===void 0?rA(r):Xr("acquire",r,i.id,1)}function gf(t,e){if(e===null)return 1;switch(t.phase){case"windup":return e.windupMovementScale;case"hit":return e.hitMovementScale;case"recover":return e.recoveryMovementScale;case"idle":case"acquire":return 1}}function wf(t,e){const a=t.weaponId===null?null:qn(e,t.weaponId),r=Gr(e,t.targetId),s=pf(e,r),i=a!==null&&r!==void 0?Math.max(0,Math.min(1,(s.distance-a.hitRange*.84)/Math.max(1,a.acquireRange-a.hitRange*.84))):0,n=t.phase==="windup"&&a!==null&&r!==void 0?Math.max(0,Math.min(1,(s.distance-a.hitRange*.82)/Math.max(1,a.openingLungeRange-a.hitRange*.82))):0;let o=0;return t.phase==="hit"?o=1:t.phaseTicksTotal>0&&(o=1-t.phaseTicksRemaining/t.phaseTicksTotal),{phase:t.phase,buildId:a?.buildId??null,weaponId:t.weaponId,targetId:t.targetId,phaseTicksRemaining:t.phaseTicksRemaining,phaseTicksTotal:t.phaseTicksTotal,phaseProgress:o,movementScale:gf(t,a),targetInHitRange:a!==null&&r!==void 0&&Fa(e,r,a,a.hitRange),targetDirectionX:s.x,targetDirectionY:s.y,pursuitStrength:i,entryLungeStrength:n,entryLungeMovementScale:a?.openingLungeMovementScale??0}}function mt(t,e,a=!1){const r=wf(t,e),s=t.phase==="windup"?r.entryLungeStrength:r.pursuitStrength,i=!a&&(t.phase==="acquire"||t.phase==="windup")&&s>0?{moveX:r.targetDirectionX*s,moveY:r.targetDirectionY*s}:{};return{state:t,presentation:r,commandContribution:a?{attack:!0}:i}}function fs(){return{...yc}}function vf(t,e,a={}){const r=e.player.weaponId,s=qn(e,r);if(e.status!=="playing"||e.player.guarding||t.weaponId!==null&&t.weaponId!==r)return mt(ir(e,null,a),e);switch(t.phase){case"idle":return mt(ir(e,t.targetId,a),e);case"acquire":{const i=Gr(e,t.targetId);return i===void 0||!Fa(e,i,s,s.dropRange,a.omnidirectionalTargeting===!0)?mt(ir(e,t.targetId,a),e):Xn(e,i)>s.openingLungeRange?mt(t,e):mt(Xr("windup",r,i.id,s.windupTicks),e)}case"windup":{const i=Gr(e,t.targetId);if(i===void 0||!Fa(e,i,s,s.dropRange,a.omnidirectionalTargeting===!0))return mt(ir(e,t.targetId,a),e);if(t.phaseTicksRemaining>1){const n={...t,phaseTicksRemaining:t.phaseTicksRemaining-1};return mt(n,e)}return e.player.weaponCooldownTicks>0||!Fa(e,i,s,s.hitRange,a.omnidirectionalTargeting===!0)?mt(Xr("recover",r,i.id,Math.max(3,Math.round(s.recoveryTicks*.45))),e):mt(Xr("hit",r,i.id,1),e,!0)}case"hit":{const i=Gr(e,t.targetId);return mt(Xr("recover",r,i!==void 0&&Fa(e,i,s,s.dropRange,a.omnidirectionalTargeting===!0)?i.id:null,s.recoveryTicks),e)}case"recover":{const i=Gr(e,t.targetId);if(i===void 0||!Fa(e,i,s,s.dropRange,a.omnidirectionalTargeting===!0))return mt(ir(e,null,a),e);if(t.phaseTicksRemaining>1){const n={...t,targetId:i.id,phaseTicksRemaining:t.phaseTicksRemaining-1};return mt(n,e)}return mt(ir(e,t.targetId,a),e)}}}function qn(t,e){const a=hf[e],r=t.player.weaponRangeMultipliers[e],s=t.player.weaponCooldownMultipliers[e];return{...a,acquireRange:a.acquireRange*r,dropRange:a.dropRange*r,hitRange:a.hitRange*r,openingLungeRange:a.openingLungeRange*r,windupTicks:Math.max(1,Math.round(a.windupTicks*s)),recoveryTicks:Math.max(1,Math.round(a.recoveryTicks*s))}}const Bi=16,Pi=64,bc=1024*32,sA=bc,Dc=Object.freeze({width:Bi,height:Bi,depth:Bi});function Yn(t){return t.width*t.height*t.depth}function jn(t){if(typeof t!="object"||t===null||!("width"in t)||!("height"in t)||!("depth"in t))return!1;const e=t;return Number.isInteger(e.width)&&Number.isInteger(e.height)&&Number.isInteger(e.depth)&&(e.width??0)>0&&(e.height??0)>0&&(e.depth??0)>0&&(e.width??Number.POSITIVE_INFINITY)<=Pi&&(e.height??Number.POSITIVE_INFINITY)<=Pi&&(e.depth??Number.POSITIVE_INFINITY)<=Pi&&Yn(e)<=bc}const yf=[{x:1,y:0,z:0},{x:-1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:-1,z:0},{x:0,y:0,z:1},{x:0,y:0,z:-1}],xf=new Set(["matte","metal","emissive"]);function mn(t){return`${t.x},${t.y},${t.z}`}function bf(t){return Number.isInteger(t.x)&&Number.isInteger(t.y)&&Number.isInteger(t.z)}function Bc(t,e){return bf(t)&&t.x>=0&&t.x<e.width&&t.y>=0&&t.y<e.height&&t.z>=0&&t.z<e.depth}function Lr(t,e,a){return t??e??a}function Df(t,e){const a=new Set;return t.palette.forEach((r,s)=>{const i=`palette[${s}]`;r.id.trim().length===0?e.push({code:"palette",path:`${i}.id`,message:"Palette ids must not be empty."}):a.has(r.id)&&e.push({code:"palette",path:`${i}.id`,message:`Palette id "${r.id}" is duplicated.`}),a.add(r.id),(!Number.isInteger(r.color)||r.color<0||r.color>16777215)&&e.push({code:"palette",path:`${i}.color`,message:"Palette colors must be integers from 0x000000 to 0xFFFFFF."}),r.materialRole!==void 0&&!xf.has(r.materialRole)&&e.push({code:"palette",path:`${i}.materialRole`,message:'Palette material roles must be "matte", "metal", or "emissive".'})}),a}function Bf(t,e,a,r){const s=new Map;return t.voxels.forEach((i,n)=>{const o=`voxels[${n}]`;if(e===null||!Bc(i,e)){r.push({code:"voxel-bounds",path:o,message:e===null?"Voxel coordinates require valid recipe dimensions.":`Voxel coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`});return}a.has(i.paletteId)||r.push({code:"palette",path:`${o}.paletteId`,message:`Voxel references unknown palette id "${i.paletteId}".`});const A=mn(i);if(s.has(A)){r.push({code:"duplicate-voxel",path:o,message:`More than one voxel occupies (${A}).`});return}s.set(A,i)}),s}function Pf(t,e,a,r){const s=new Set;t.anchors.forEach((i,n)=>{const o=`anchors[${n}]`;(i.id.trim().length===0||s.has(i.id))&&r.push({code:"duplicate-anchor",path:`${o}.id`,message:i.id.trim().length===0?"Anchor ids must not be empty.":`Anchor id "${i.id}" is duplicated.`}),s.add(i.id),(e===null||!Bc(i,e))&&r.push({code:"anchor-bounds",path:o,message:e===null?"Anchor coordinates require valid recipe dimensions.":`Anchor coordinates must be integers inside the ${e.width}×${e.height}×${e.depth} grid.`})});for(const i of new Set(a))s.has(i)||r.push({code:"required-anchor",path:"anchors",message:`Required anchor "${i}" is missing.`})}function Ef(t){const e=t.values().next().value;if(e===void 0)return!0;const a=new Set,r=[e];a.add(mn(e));for(let s=0;s<r.length;s+=1){const i=r[s];if(i!==void 0)for(const n of yf){const o=mn({x:i.x+n.x,y:i.y+n.y,z:i.z+n.z}),A=t.get(o);A!==void 0&&!a.has(o)&&(a.add(o),r.push(A))}}return a.size===t.size}function Cf(t,e={}){const a=[];t.schemaVersion!==2&&a.push({code:"schema-version",path:"schemaVersion",message:`Voxel recipe schema version ${String(t.schemaVersion)} is unsupported; expected version 2.`});const r=jn(t.dimensions);r||a.push({code:"grid-dimensions",path:"dimensions",message:"Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells."});const s=r?t.dimensions:null,i=s===null?0:Yn(s),n=Lr(e.minVoxelCount,t.validation?.minVoxelCount,1),o=Lr(e.maxVoxelCount,t.validation?.maxVoxelCount,i);(!Number.isInteger(n)||!Number.isInteger(o)||n<0||o>sA||o>i||n>o||t.voxels.length<n||t.voxels.length>o)&&a.push({code:"voxel-count",path:"voxels",message:`Voxel count ${t.voxels.length} must be between ${n} and ${o}; the grid contains ${i} cells and the absolute cap is ${sA}.`});const A=Df(t,a),l=Bf(t,s,A,a);Lr(e.requireGroundContact,t.validation?.requireGroundContact,!0)&&![...l.values()].some(h=>h.y===0)&&a.push({code:"ground-contact",path:"voxels",message:"At least one voxel must touch the y=0 ground plane."}),Lr(e.requireConnectedBody,t.validation?.requireConnectedBody,!0)&&!Ef(l)&&a.push({code:"connected-body",path:"voxels",message:"All voxels must form one six-directionally connected body."});const u=Lr(e.requiredAnchors,t.validation?.requiredAnchors,[]);return Pf(t,s,u,a),{valid:a.length===0,issues:a,voxelCount:t.voxels.length,uniqueVoxelCount:l.size}}class Mf extends Error{result;constructor(e,a){const r=a.issues.map(s=>`${s.path}: ${s.message}`).join("; ");super(`Invalid voxel recipe "${e}": ${r}`),this.name="VoxelRecipeValidationError",this.result=a}}function Wn(t,e={}){const a=Cf(t,e);if(!a.valid)throw new Mf(t.id,a)}const rs=0;function Kr(t,e,a,r){return jn(t)&&Number.isInteger(e)&&Number.isInteger(a)&&Number.isInteger(r)&&e>=0&&e<t.width&&a>=0&&a<t.height&&r>=0&&r<t.depth}function Pc(t,e,a,r){if(!Kr(t,e,a,r))throw new RangeError(`Voxel coordinate (${e}, ${a}, ${r}) is outside the ${t.width}×${t.height}×${t.depth} grid.`);return e+t.width*(r+t.depth*a)}function Sf(t){if(t.length>65535)throw new RangeError("A voxel palette cannot contain more than 65,535 entries.");const e=new Map;return t.forEach((a,r)=>{if(a.id.trim().length===0)throw new TypeError("Voxel palette ids must not be empty.");if(e.has(a.id))throw new TypeError(`Duplicate voxel palette id "${a.id}".`);if(!Number.isInteger(a.color)||a.color<0||a.color>16777215)throw new TypeError(`Voxel palette color for "${a.id}" must be an integer from 0x000000 to 0xFFFFFF.`);e.set(a.id,r+1)}),e}function Vn(t,e={}){const a=e.dimensions??Dc;if(!jn(a))throw new RangeError("Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells.");return{dimensions:{...a},cells:new Uint16Array(Yn(a)),palette:t,paletteIndexById:Sf(t),anchors:e.anchors??[],...e.recipeId===void 0?{}:{recipeId:e.recipeId}}}function Kn(t,e,a,r){return t.cells[Pc(t.dimensions,e,a,r)]??rs}function re(t,e,a,r,s){const i=Pc(t.dimensions,e,a,r);if(s===null){t.cells[i]=rs;return}const n=t.paletteIndexById.get(s);if(n===void 0)throw new TypeError(`Unknown voxel palette id "${s}".`);t.cells[i]=n}function If(t,e,a){re(t,e.x,e.y,e.z,a)}function D(t,e,a,r){if(!Kr(t.dimensions,e.x,e.y,e.z)||!Kr(t.dimensions,a.x,a.y,a.z))throw new RangeError("Voxel box endpoints must both be inside the grid.");const s=Math.min(e.x,a.x),i=Math.max(e.x,a.x),n=Math.min(e.y,a.y),o=Math.max(e.y,a.y),A=Math.min(e.z,a.z),l=Math.max(e.z,a.z);for(let c=n;c<=o;c+=1)for(let d=A;d<=l;d+=1)for(let u=s;u<=i;u+=1)re(t,u,c,d,r)}function rt(t,e,a,r){if(!Kr(t.dimensions,e.x,e.y,e.z)||!Kr(t.dimensions,a.x,a.y,a.z))throw new RangeError("Voxel line endpoints must both be inside the grid.");const s=a.x-e.x,i=a.y-e.y,n=a.z-e.z,o=Math.max(Math.abs(s),Math.abs(i),Math.abs(n));if(o===0){If(t,e,r);return}for(let A=0;A<=o;A+=1){const l=A/o;re(t,Math.round(e.x+s*l),Math.round(e.y+i*l),Math.round(e.z+n*l),r)}}function Ec(t){const e=[];for(let a=0;a<t.dimensions.height;a+=1)for(let r=0;r<t.dimensions.depth;r+=1)for(let s=0;s<t.dimensions.width;s+=1){const i=Kn(t,s,a,r);if(i===rs)continue;const n=t.palette[i-1];if(n===void 0)throw new TypeError(`Grid cell (${s}, ${a}, ${r}) contains invalid palette index ${i}.`);e.push({x:s,y:a,z:r,paletteId:n.id})}return e}function Qf(t,e={}){(e.validate??!0)&&Wn(t);const a=Vn(t.palette,{dimensions:t.dimensions,anchors:t.anchors,recipeId:t.id});for(const r of t.voxels)re(a,r.x,r.y,r.z,r.paletteId);return a}const kf=[{name:"positive-x",neighbor:[1,0,0],normal:[1,0,0],vertices:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],shade:.82},{name:"negative-x",neighbor:[-1,0,0],normal:[-1,0,0],vertices:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],shade:.68},{name:"positive-y",neighbor:[0,1,0],normal:[0,1,0],vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],shade:1},{name:"negative-y",neighbor:[0,-1,0],normal:[0,-1,0],vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.55},{name:"positive-z",neighbor:[0,0,1],normal:[0,0,1],vertices:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],shade:.9},{name:"negative-z",neighbor:[0,0,-1],normal:[0,0,-1],vertices:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],shade:.74}],Tf=["matte","metal","emissive"];function Ei(t){return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function Rf(t){return[Ei((t>>16&255)/255),Ei((t>>8&255)/255),Ei((t&255)/255)]}function zf(t,e,a,r){return e<0||e>=t.dimensions.width||a<0||a>=t.dimensions.height||r<0||r>=t.dimensions.depth?!1:Kn(t,e,a,r)!==rs}function Lf(t){const e=t.voxelSize??1,a=t.origin??{x:0,y:0,z:0};if(!Number.isFinite(e)||e<=0)throw new RangeError("Voxel size must be a positive finite number.");if(!Number.isFinite(a.x)||!Number.isFinite(a.y)||!Number.isFinite(a.z))throw new RangeError("Voxel mesh origin coordinates must be finite.");for(const r of Object.values(t.faceShades??{}))if(r!==void 0&&(!Number.isFinite(r)||r<0))throw new RangeError("Voxel face shades must be finite non-negative numbers.");return{voxelSize:e,origin:a,shadeFaces:t.shadeFaces??!0}}function Ff(t,e={}){const a=Lf(e),r=[],s=[],i=[],n={matte:[],metal:[],emissive:[]};let o=0,A=0,l=Number.POSITIVE_INFINITY,c=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,h=Number.NEGATIVE_INFINITY,g=Number.NEGATIVE_INFINITY;for(let w=0;w<t.dimensions.height;w+=1)for(let v=0;v<t.dimensions.depth;v+=1)for(let y=0;y<t.dimensions.width;y+=1){const P=Kn(t,y,w,v);if(P===rs)continue;o+=1;const b=t.palette[P-1];if(b===void 0)throw new TypeError(`Grid cell (${y}, ${w}, ${v}) contains invalid palette index ${P}.`);const[x,B,E]=Rf(b.color);for(const M of kf){const[T,k,H]=M.neighbor;if(zf(t,y+T,w+k,v+H))continue;const O=r.length/3,X=a.shadeFaces?e.faceShades?.[M.name]??M.shade:1;for(const ee of M.vertices){const J=a.origin.x+(y+ee[0])*a.voxelSize,_=a.origin.y+(w+ee[1])*a.voxelSize,ie=a.origin.z+(v+ee[2])*a.voxelSize;r.push(J,_,ie),s.push(...M.normal),i.push(Math.min(1,x*X),Math.min(1,B*X),Math.min(1,E*X)),l=Math.min(l,J),c=Math.min(c,_),d=Math.min(d,ie),u=Math.max(u,J),h=Math.max(h,_),g=Math.max(g,ie)}const j=b.materialRole??"matte";n[j].push(O,O+1,O+2,O,O+2,O+3),A+=1}}const p=[],m=[];for(const w of Tf){const v=n[w];v.length!==0&&(m.push({role:w,start:p.length,count:v.length}),p.push(...v))}const f=r.length/3;return{positions:new Float32Array(r),normals:new Float32Array(s),colors:new Float32Array(i),indices:new Uint32Array(p),voxelCount:o,faceCount:A,vertexCount:f,triangleCount:p.length/3,materialGroups:m,bounds:f===0?null:{min:[l,c,d],max:[u,h,g]}}}function Cc(t,e={}){return Ff(Qf(t),e)}function ss(t,e,a=1){if(!Number.isFinite(a)||a<=0)throw new RangeError("Voxel size must be a positive finite number.");const r=t.anchors.find(s=>s.id===e);if(r===void 0)throw new RangeError(`Voxel recipe "${t.id}" has no anchor named "${e}".`);return{x:(r.x+.5-t.dimensions.width/2)*a,y:(r.y+.5)*a,z:(r.z+.5-t.dimensions.depth/2)*a}}const Mc=10900280,Sc=5628380,Ic=Object.freeze({width:24,height:32,depth:16}),di=2.25;Ic.height*di;const Of=2e3,Qc=Object.freeze({width:20,height:20,depth:18}),kc=2.1;Qc.height*kc;const Uf=1200,Nf=[{id:"ink",color:2107434,label:"Deep silhouette",materialRole:"matte"},{id:"hair",color:3420214,label:"Weathered dark hair",materialRole:"matte"},{id:"skin",color:13211253,label:"Sun-warmed skin",materialRole:"matte"},{id:"cloth-dark",color:2704454,label:"Deep field cloth",materialRole:"matte"},{id:"cloth-sage",color:6322800,label:"Faded survey coat",materialRole:"matte"},{id:"pack-pale",color:13553085,label:"Bleached field pack",materialRole:"matte"},{id:"rust",color:Mc,label:"Rust repair hardware",materialRole:"metal"},{id:"steel",color:7965576,label:"Dull survey steel",materialRole:"metal"},{id:"cyan",color:Sc,label:"Live survey signal",materialRole:"emissive"},{id:"amber",color:15774538,label:"Relic warning light",materialRole:"emissive"}],Hf=[{id:"shell-light",color:14342087,label:"Light ceramic cage",materialRole:"matte"},{id:"shell-shadow",color:10398367,label:"Ceramic edge shade",materialRole:"matte"},{id:"inner",color:2107948,label:"Hollow lantern interior",materialRole:"matte"},{id:"steel",color:7438975,label:"Tripod steel",materialRole:"metal"},{id:"rust",color:Mc,label:"Rust repair hardware",materialRole:"metal"},{id:"cyan",color:Sc,label:"Survey sensor",materialRole:"emissive"},{id:"amber",color:15774538,label:"Lantern status light",materialRole:"emissive"}];function Tc(t){const e=Vn(t.palette,{dimensions:t.dimensions});t.author(e);const a={schemaVersion:2,id:t.id,name:t.name,kind:t.kind,dimensions:t.dimensions,palette:t.palette,voxels:Ec(e),anchors:t.anchors,validation:{minVoxelCount:1,maxVoxelCount:t.maxVoxelCount,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:t.requiredAnchors}};return Wn(a),a}function _f(t){D(t,{x:5,y:0,z:4},{x:9,y:2,z:7},"ink"),D(t,{x:14,y:0,z:5},{x:18,y:2,z:8},"ink"),D(t,{x:5,y:0,z:3},{x:9,y:0,z:8},"steel"),D(t,{x:14,y:0,z:4},{x:18,y:0,z:9},"steel"),D(t,{x:6,y:2,z:5},{x:9,y:3,z:7},"rust"),D(t,{x:14,y:2,z:6},{x:17,y:3,z:8},"rust"),D(t,{x:7,y:3,z:6},{x:9,y:11,z:7},"cloth-dark"),D(t,{x:14,y:3,z:6},{x:16,y:11,z:7},"cloth-dark"),D(t,{x:7,y:7,z:5},{x:9,y:8,z:6},"steel"),D(t,{x:14,y:8,z:5},{x:16,y:9,z:6},"steel"),D(t,{x:7,y:10,z:8},{x:10,y:14,z:10},"cloth-sage"),D(t,{x:13,y:11,z:8},{x:16,y:14,z:10},"cloth-sage"),D(t,{x:7,y:10,z:10},{x:9,y:12,z:11},"cloth-dark"),D(t,{x:14,y:11,z:10},{x:16,y:13,z:11},"cloth-dark"),D(t,{x:8,y:13,z:6},{x:16,y:16,z:9},"cloth-dark"),D(t,{x:9,y:16,z:6},{x:15,y:21,z:9},"cloth-sage"),D(t,{x:9,y:16,z:5},{x:10,y:21,z:5},"cloth-dark"),D(t,{x:14,y:16,z:5},{x:15,y:21,z:5},"cloth-dark"),D(t,{x:8,y:22,z:6},{x:16,y:23,z:9},"cloth-dark"),D(t,{x:8,y:22,z:5},{x:16,y:23,z:6},"pack-pale"),D(t,{x:5,y:20,z:6},{x:8,y:22,z:9},"cloth-dark"),D(t,{x:4,y:17,z:6},{x:6,y:20,z:8},"cloth-sage"),D(t,{x:3,y:14,z:4},{x:5,y:18,z:7},"cloth-dark"),D(t,{x:2,y:13,z:3},{x:4,y:15,z:6},"skin"),D(t,{x:16,y:20,z:6},{x:18,y:22,z:9},"cloth-dark"),D(t,{x:17,y:17,z:5},{x:19,y:20,z:8},"cloth-sage"),D(t,{x:18,y:14,z:4},{x:20,y:18,z:7},"steel"),D(t,{x:19,y:13,z:3},{x:21,y:15,z:6},"skin"),D(t,{x:20,y:13,z:3},{x:21,y:14,z:5},"ink"),D(t,{x:10,y:16,z:10},{x:15,y:22,z:11},"pack-pale"),D(t,{x:11,y:17,z:13},{x:14,y:21,z:13},"cloth-dark"),D(t,{x:10,y:16,z:12},{x:10,y:22,z:13},"steel"),D(t,{x:14,y:16,z:12},{x:15,y:22,z:13},"rust"),D(t,{x:5,y:21,z:9},{x:6,y:27,z:10},"steel"),D(t,{x:6,y:26,z:9},{x:8,y:27,z:10},"steel"),D(t,{x:6,y:21,z:9},{x:8,y:22,z:10},"rust"),re(t,5,27,9,"cyan"),re(t,5,27,10,"amber"),D(t,{x:10,y:22,z:7},{x:13,y:24,z:9},"skin"),D(t,{x:9,y:24,z:5},{x:14,y:29,z:9},"skin"),D(t,{x:8,y:29,z:5},{x:15,y:31,z:10},"hair"),D(t,{x:8,y:27,z:9},{x:10,y:30,z:11},"hair"),D(t,{x:14,y:27,z:9},{x:16,y:30,z:10},"hair"),D(t,{x:9,y:29,z:4},{x:11,y:30,z:5},"hair"),D(t,{x:14,y:28,z:4},{x:15,y:30,z:5},"hair"),re(t,10,27,4,"cyan"),re(t,13,27,4,"cyan"),D(t,{x:11,y:25,z:4},{x:12,y:25,z:5},"rust"),D(t,{x:7,y:23,z:7},{x:16,y:24,z:9},"rust"),D(t,{x:16,y:23,z:8},{x:18,y:25,z:9},"rust"),D(t,{x:18,y:21,z:9},{x:19,y:24,z:10},"pack-pale"),rt(t,{x:8,y:22,z:4},{x:15,y:15,z:4},"rust"),rt(t,{x:9,y:22,z:4},{x:16,y:15,z:4},"rust"),D(t,{x:10,y:18,z:4},{x:11,y:20,z:5},"cyan"),D(t,{x:12,y:18,z:4},{x:13,y:20,z:5},"amber")}function Gf(t){D(t,{x:3,y:0,z:3},{x:6,y:0,z:6},"steel"),D(t,{x:13,y:0,z:3},{x:16,y:0,z:6},"steel"),D(t,{x:8,y:0,z:13},{x:11,y:0,z:16},"steel"),D(t,{x:4,y:1,z:4},{x:5,y:4,z:5},"rust"),D(t,{x:14,y:1,z:4},{x:15,y:4,z:5},"rust"),D(t,{x:9,y:1,z:14},{x:10,y:4,z:15},"rust"),D(t,{x:5,y:4,z:5},{x:8,y:5,z:7},"steel"),D(t,{x:11,y:4,z:5},{x:14,y:5,z:7},"steel"),D(t,{x:8,y:4,z:11},{x:11,y:5,z:14},"steel"),D(t,{x:7,y:5,z:7},{x:12,y:7,z:11},"inner"),D(t,{x:8,y:8,z:7},{x:11,y:13,z:11},"inner"),D(t,{x:5,y:8,z:6},{x:6,y:14,z:7},"shell-light"),D(t,{x:13,y:8,z:6},{x:14,y:14,z:7},"shell-light"),D(t,{x:5,y:8,z:12},{x:6,y:14,z:13},"shell-shadow"),D(t,{x:13,y:8,z:12},{x:14,y:14,z:13},"shell-shadow"),D(t,{x:7,y:7,z:6},{x:12,y:8,z:13},"shell-shadow"),D(t,{x:7,y:14,z:6},{x:12,y:15,z:13},"shell-light"),D(t,{x:6,y:9,z:13},{x:13,y:13,z:14},"shell-shadow");for(let e=8;e<=14;e+=1)for(let a=6;a<=13;a+=1){const r=Math.abs(a-9.5)+Math.abs(e-11);r>=2.5&&r<=4.5&&(re(t,a,e,4,"shell-light"),re(t,a,e,5,"shell-shadow"))}D(t,{x:9,y:10,z:6},{x:10,y:12,z:6},"cyan"),re(t,9,11,5,null),re(t,10,11,5,null),D(t,{x:9,y:15,z:9},{x:11,y:17,z:11},"steel"),D(t,{x:11,y:16,z:9},{x:14,y:17,z:10},"rust"),D(t,{x:13,y:17,z:9},{x:14,y:19,z:10},"steel"),D(t,{x:12,y:19,z:8},{x:15,y:19,z:11},"cyan"),D(t,{x:14,y:10,z:7},{x:16,y:12,z:9},"rust"),D(t,{x:16,y:8,z:7},{x:17,y:11,z:8},"steel"),D(t,{x:17,y:7,z:6},{x:18,y:8,z:9},"steel"),re(t,18,7,6,"amber"),re(t,18,7,9,"amber"),D(t,{x:8,y:9,z:14},{x:11,y:13,z:15},"rust"),D(t,{x:9,y:10,z:16},{x:10,y:12,z:16},"steel"),re(t,9,9,16,"cyan"),re(t,10,13,16,"amber")}const Ir=Tc({id:"player-relic-surveyor",name:"Relic Surveyor",kind:"player",dimensions:Ic,palette:Nf,maxVoxelCount:Of,anchors:[{id:"ground",x:7,y:0,z:6},{id:"weapon",x:20,y:14,z:4},{id:"weapon-grip",x:20,y:14,z:4},{id:"free-hand",x:3,y:14,z:4},{id:"focus",x:11,y:19,z:4}],requiredAnchors:["ground","weapon","weapon-grip","free-hand","focus"],author:_f}),Jn=Tc({id:"companion-survey-lantern",name:"Three-Foot Survey Lantern",kind:"companion",dimensions:Qc,palette:Hf,maxVoxelCount:Uf,anchors:[{id:"ground",x:4,y:0,z:4},{id:"sensor",x:9,y:11,z:6},{id:"mast",x:13,y:19,z:9},{id:"manipulator",x:17,y:8,z:7},{id:"rear-coil",x:9,y:10,z:16}],requiredAnchors:["ground","sensor","mast","manipulator","rear-coil"],author:Gf}),iA=[{id:"shadow",color:1515551,label:"Mineral shadow"},{id:"soil",color:4930866,label:"Dark soil"},{id:"bone",color:14207140,label:"Bone cloth"},{id:"rust",color:9981234,label:"Oxidized red"},{id:"cyan",color:5229524,label:"Signal cyan"},{id:"amber",color:14919242,label:"Warning amber"},{id:"cloth",color:3492425,label:"Field cloth"},{id:"steel",color:8359304,label:"Dull steel"},{id:"leaf-dark",color:2507566,label:"Dark foliage"},{id:"leaf",color:5206597,label:"Dry foliage"},{id:"wood",color:7359284,label:"Weathered wood"},{id:"violet",color:8546725,label:"Anomaly violet"}];function Ht(t){const e=t.dimensions??Dc,a=Vn(iA,{dimensions:e});t.author(a);const r={schemaVersion:2,id:t.id,name:t.name,kind:t.kind,dimensions:e,palette:iA,voxels:Ec(a),anchors:t.anchors,validation:{minVoxelCount:1,requireGroundContact:!0,requireConnectedBody:!0,requiredAnchors:t.requiredAnchors}};return Wn(r),r}const is=Ht({id:"weapon-signal-blade",name:"Signal Blade",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"tip",x:7,y:15,z:7}],requiredAnchors:["grip","tip"],author:t=>{D(t,{x:7,y:0,z:7},{x:8,y:3,z:8},"bone"),D(t,{x:6,y:0,z:7},{x:9,y:0,z:8},"rust"),D(t,{x:5,y:4,z:7},{x:10,y:4,z:8},"rust"),D(t,{x:7,y:5,z:7},{x:8,y:14,z:8},"steel"),D(t,{x:7,y:6,z:7},{x:7,y:13,z:7},"cyan"),re(t,7,15,7,"steel"),re(t,8,15,8,"steel")}}),ui=Ht({id:"weapon-impact-maul",name:"Impact Maul",kind:"weapon",anchors:[{id:"grip",x:7,y:1,z:7},{id:"impact",x:3,y:9,z:7}],requiredAnchors:["grip","impact"],author:t=>{D(t,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),D(t,{x:6,y:0,z:7},{x:9,y:1,z:8},"bone"),D(t,{x:7,y:4,z:7},{x:8,y:5,z:8},"steel"),D(t,{x:4,y:8,z:5},{x:11,y:12,z:10},"steel"),D(t,{x:3,y:8,z:5},{x:4,y:12,z:10},"rust"),D(t,{x:11,y:8,z:5},{x:12,y:12,z:10},"rust"),D(t,{x:6,y:12,z:6},{x:9,y:12,z:9},"cyan")}}),Zn=Ht({id:"scrap-hound",name:"Scrap Hound",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:3,z:7}],requiredAnchors:["ground","target"],author:t=>{D(t,{x:4,y:0,z:3},{x:5,y:3,z:4},"shadow"),D(t,{x:10,y:0,z:3},{x:11,y:3,z:4},"shadow"),D(t,{x:4,y:0,z:10},{x:5,y:3,z:11},"shadow"),D(t,{x:10,y:0,z:10},{x:11,y:3,z:11},"shadow"),D(t,{x:7,y:0,z:7},{x:8,y:3,z:7},"steel"),D(t,{x:5,y:3,z:3},{x:10,y:6,z:12},"rust"),D(t,{x:4,y:4,z:4},{x:11,y:6,z:8},"rust"),D(t,{x:5,y:3,z:0},{x:10,y:6,z:3},"steel"),D(t,{x:6,y:2,z:0},{x:9,y:4,z:1},"shadow"),D(t,{x:5,y:7,z:1},{x:6,y:8,z:2},"rust"),D(t,{x:9,y:7,z:1},{x:10,y:8,z:2},"rust"),re(t,6,5,0,"amber"),re(t,9,5,0,"amber"),rt(t,{x:7,y:7,z:4},{x:7,y:7,z:12},"cyan"),rt(t,{x:8,y:7,z:4},{x:8,y:7,z:12},"cyan"),D(t,{x:3,y:5,z:5},{x:4,y:5,z:8},"steel"),D(t,{x:11,y:5,z:5},{x:12,y:5,z:8},"steel"),D(t,{x:7,y:5,z:13},{x:8,y:6,z:15},"steel"),rt(t,{x:8,y:6,z:15},{x:8,y:8,z:15},"amber")}}),$n=Ht({id:"relay-shell",name:"Relay Shell",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:7,z:7}],requiredAnchors:["ground","target"],author:t=>{D(t,{x:1,y:0,z:4},{x:4,y:3,z:11},"shadow"),D(t,{x:11,y:0,z:4},{x:14,y:3,z:11},"shadow"),D(t,{x:4,y:1,z:5},{x:11,y:4,z:10},"steel"),D(t,{x:3,y:4,z:4},{x:12,y:8,z:11},"rust"),D(t,{x:2,y:3,z:3},{x:13,y:9,z:4},"steel"),D(t,{x:3,y:4,z:3},{x:12,y:5,z:3},"bone"),D(t,{x:5,y:8,z:5},{x:10,y:11,z:10},"bone"),D(t,{x:6,y:9,z:4},{x:9,y:10,z:5},"shadow"),re(t,6,10,3,"amber"),re(t,9,10,3,"amber"),D(t,{x:7,y:12,z:7},{x:8,y:15,z:8},"cyan"),D(t,{x:4,y:13,z:6},{x:11,y:14,z:9},"steel"),D(t,{x:5,y:14,z:7},{x:10,y:14,z:8},"cyan"),rt(t,{x:2,y:2,z:5},{x:2,y:2,z:10},"amber"),rt(t,{x:13,y:2,z:5},{x:13,y:2,z:10},"amber")}}),eo=Ht({id:"murmur",name:"Murmur",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7}],requiredAnchors:["ground","target"],author:t=>{D(t,{x:6,y:0,z:6},{x:9,y:0,z:9},"shadow"),D(t,{x:7,y:1,z:7},{x:8,y:7,z:8},"steel"),D(t,{x:5,y:6,z:5},{x:10,y:11,z:10},"violet"),D(t,{x:6,y:7,z:4},{x:9,y:10,z:5},"cyan"),D(t,{x:2,y:8,z:7},{x:5,y:9,z:8},"steel"),D(t,{x:10,y:8,z:7},{x:13,y:9,z:8},"steel"),D(t,{x:7,y:8,z:10},{x:8,y:9,z:13},"bone"),D(t,{x:7,y:11,z:7},{x:8,y:15,z:8},"cyan"),rt(t,{x:5,y:13,z:7},{x:7,y:13,z:7},"steel"),rt(t,{x:8,y:13,z:7},{x:10,y:13,z:7},"steel"),rt(t,{x:5,y:13,z:7},{x:5,y:15,z:7},"steel"),rt(t,{x:10,y:13,z:7},{x:10,y:15,z:7},"steel"),re(t,5,15,7,"amber"),re(t,10,15,7,"amber"),re(t,7,9,4,"amber"),re(t,8,9,4,"amber")}}),to=Ht({id:"culvert-lurker",name:"Culvert Lurker",kind:"enemy",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:5,z:3}],requiredAnchors:["ground","target"],author:t=>{D(t,{x:2,y:0,z:4},{x:13,y:1,z:11},"shadow"),D(t,{x:3,y:1,z:4},{x:12,y:3,z:10},"soil"),D(t,{x:4,y:3,z:5},{x:11,y:5,z:9},"steel"),D(t,{x:5,y:4,z:2},{x:10,y:6,z:5},"rust"),D(t,{x:6,y:4,z:1},{x:9,y:5,z:3},"shadow"),re(t,6,5,2,"amber"),re(t,9,5,2,"amber"),D(t,{x:1,y:2,z:7},{x:4,y:3,z:8},"steel"),D(t,{x:11,y:2,z:7},{x:14,y:3,z:8},"steel"),rt(t,{x:2,y:4,z:7},{x:2,y:6,z:7},"cyan"),rt(t,{x:13,y:4,z:8},{x:13,y:6,z:8},"cyan"),D(t,{x:6,y:5,z:8},{x:9,y:7,z:11},"rust")}}),ao=Ht({id:"anomaly-orison",name:"Orison, the Listening Fault",kind:"named-anomaly",anchors:[{id:"ground",x:7,y:0,z:7},{id:"target",x:7,y:8,z:7},{id:"interact",x:7,y:6,z:4}],requiredAnchors:["ground","target","interact"],author:t=>{D(t,{x:3,y:0,z:6},{x:12,y:1,z:9},"shadow"),D(t,{x:2,y:1,z:5},{x:5,y:10,z:10},"violet"),D(t,{x:10,y:1,z:5},{x:13,y:10,z:10},"violet"),D(t,{x:2,y:9,z:5},{x:13,y:12,z:10},"bone"),D(t,{x:0,y:5,z:6},{x:2,y:10,z:9},"steel"),D(t,{x:13,y:5,z:6},{x:15,y:10,z:9},"steel"),D(t,{x:1,y:7,z:10},{x:4,y:9,z:12},"shadow"),D(t,{x:11,y:7,z:10},{x:14,y:9,z:12},"shadow"),D(t,{x:6,y:5,z:3},{x:9,y:8,z:5},"cyan"),D(t,{x:7,y:8,z:5},{x:8,y:9,z:7},"cyan"),re(t,6,6,3,"amber"),re(t,9,6,3,"amber"),D(t,{x:3,y:12,z:6},{x:6,y:15,z:9},"steel"),D(t,{x:9,y:12,z:6},{x:12,y:15,z:9},"steel"),rt(t,{x:0,y:10,z:7},{x:0,y:13,z:7},"cyan"),rt(t,{x:15,y:10,z:8},{x:15,y:13,z:8},"cyan")}}),hi=Ht({id:"prop-dry-tree",name:"Dry Signal Tree",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:t=>{D(t,{x:7,y:0,z:7},{x:8,y:9,z:8},"wood"),D(t,{x:4,y:0,z:7},{x:11,y:0,z:8},"wood"),D(t,{x:7,y:0,z:4},{x:8,y:0,z:11},"wood"),D(t,{x:4,y:7,z:7},{x:11,y:8,z:8},"wood"),D(t,{x:7,y:7,z:4},{x:8,y:8,z:11},"wood"),D(t,{x:3,y:9,z:4},{x:12,y:12,z:11},"leaf-dark"),D(t,{x:5,y:13,z:5},{x:10,y:15,z:10},"leaf"),D(t,{x:5,y:10,z:3},{x:10,y:11,z:12},"leaf"),re(t,7,15,7,"cyan")}}),ro=Ht({id:"prop-rift-rock",name:"Rift Rock",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7}],requiredAnchors:["ground"],author:t=>{D(t,{x:3,y:0,z:4},{x:12,y:2,z:11},"soil"),D(t,{x:4,y:3,z:5},{x:11,y:5,z:10},"shadow"),D(t,{x:6,y:6,z:6},{x:9,y:7,z:9},"steel"),rt(t,{x:5,y:3,z:5},{x:8,y:6,z:5},"cyan")}}),so=Ht({id:"prop-field-chest",name:"Field Chest",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:4,z:4}],requiredAnchors:["ground","interact"],author:t=>{D(t,{x:3,y:0,z:4},{x:12,y:5,z:11},"wood"),D(t,{x:3,y:0,z:4},{x:4,y:7,z:11},"steel"),D(t,{x:11,y:0,z:4},{x:12,y:7,z:11},"steel"),D(t,{x:3,y:6,z:4},{x:12,y:7,z:11},"rust"),D(t,{x:7,y:3,z:3},{x:8,y:5,z:4},"amber")}}),ns=Ht({id:"prop-unclassified-relic",name:"Unclassified Relic",kind:"prop",anchors:[{id:"ground",x:7,y:0,z:7},{id:"interact",x:7,y:7,z:5},{id:"core",x:7,y:8,z:7}],requiredAnchors:["ground","interact","core"],author:t=>{D(t,{x:5,y:0,z:5},{x:10,y:2,z:10},"soil"),D(t,{x:7,y:3,z:7},{x:8,y:6,z:8},"steel"),D(t,{x:5,y:6,z:5},{x:10,y:11,z:10},"violet"),D(t,{x:6,y:7,z:5},{x:9,y:10,z:5},"cyan"),D(t,{x:7,y:8,z:4},{x:8,y:9,z:5},"amber"),D(t,{x:7,y:12,z:7},{x:8,y:14,z:8},"cyan")}}),Xf=[Ir,Jn,is,ui,Zn,$n,eo,to,ao,hi,ro,so,ns],qf=Object.freeze({blade:is,impact:ui}),Yf=Object.freeze({"scrap-hound":Zn,"relay-shell":$n,murmur:eo,"culvert-lurker":to,"named-anomaly":ao}),jf=Object.freeze({tree:hi,rock:ro,chest:so,relic:ns});Object.freeze({...Object.fromEntries(Xf.map(t=>[t.id,t])),player:Ir,companion:Jn,...qf,...Yf,...jf,"dead-tree":hi,"unclassified-relic":ns});const nA=[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]],Wf=[{id:"negative-z",corners:[0,3,2,1],normal:[0,0,-1]},{id:"positive-z",corners:[4,5,6,7],normal:[0,0,1]},{id:"negative-x",corners:[0,4,7,3],normal:[-1,0,0]},{id:"positive-x",corners:[1,2,6,5],normal:[1,0,0]},{id:"negative-y",corners:[0,1,5,4],normal:[0,-1,0]},{id:"positive-y",corners:[3,7,6,2],normal:[0,1,0]}],oA=[0,1,2,0,2,3];function ps(t,e){if(!t.every(Number.isFinite))throw new RangeError(`${e} must contain finite values.`)}function AA(t,e,a){t.set(e).multiplyScalar(a),t.r=C.clamp(t.r,0,1),t.g=C.clamp(t.g,0,1),t.b=C.clamp(t.b,0,1)}function Vf(t){return t.y>.55?1.04:t.y<-.55?.56:C.clamp(.75+t.x*.055+t.z*.09,.62,.9)}class U{positions=[];normals=[];colors=[];transformedCorners=nA.map(()=>new S);matrix=new fe;normalMatrix=new Tn;position=new S;scale=new S;quaternion=new ot;euler=new Ie;faceNormal=new S;color=new Y;componentCount=0;get triangles(){return this.positions.length/9}get components(){return this.componentCount}addBox(e){if(ps(e.center,"Box center"),ps(e.size,"Box size"),e.size.some(s=>s<=0))throw new RangeError("Box size values must be greater than zero.");const a=e.rotation??[0,0,0];ps(a,"Box rotation");const r=e.shade??1;if(!Number.isFinite(r)||r<0)throw new RangeError("Box shade must be a finite non-negative value.");this.position.set(...e.center),this.scale.set(...e.size),this.euler.set(...a),this.quaternion.setFromEuler(this.euler),this.matrix.compose(this.position,this.quaternion,this.scale),this.normalMatrix.getNormalMatrix(this.matrix),nA.forEach((s,i)=>{this.transformedCorners[i]?.set(...s).applyMatrix4(this.matrix)});for(const s of Wf){this.faceNormal.set(...s.normal).applyMatrix3(this.normalMatrix).normalize();const i=r*Vf(this.faceNormal)*(e.faceShades?.[s.id]??1);AA(this.color,e.color,i);for(const n of oA){const o=this.transformedCorners[s.corners[n]];if(o===void 0)throw new Error("Invalid internal box face definition.");this.positions.push(o.x,o.y,o.z),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}}return this.componentCount+=1,this}addQuad(e){e.corners.forEach(o=>{ps(o,"Quad corner")});const a=e.shade??1;if(!Number.isFinite(a)||a<0)throw new RangeError("Quad shade must be a finite non-negative value.");const r=new S(...e.corners[0]),s=new S(...e.corners[1]),i=new S(...e.corners[2]);if(this.faceNormal.subVectors(s,r).cross(new S().subVectors(i,r)),this.faceNormal.lengthSq()<=Number.EPSILON)throw new RangeError("Quad corners must describe a non-zero surface.");this.faceNormal.normalize();const n=Array.isArray(e.color)?e.color:[e.color,e.color,e.color,e.color];for(const o of oA){const A=e.corners[o],l=n[o];if(A===void 0||l===void 0)throw new Error("Invalid internal quad definition.");AA(this.color,l,a),this.positions.push(...A),this.normals.push(this.faceNormal.x,this.faceNormal.y,this.faceNormal.z),this.colors.push(this.color.r,this.color.g,this.color.b)}return this.componentCount+=1,this}build(){const e=new $e;return e.setAttribute("position",new Ee(this.positions,3)),e.setAttribute("normal",new Ee(this.normals,3)),e.setAttribute("color",new Ee(this.colors,3)),e.computeBoundingBox(),e.computeBoundingSphere(),e.userData.componentCount=this.componentCount,e.userData.triangleCount=this.triangles,e}}const lA=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),cA=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),Kf=new S(1,0,0),ms=new S,gs=new S,dA=new ot,ws=new Ie,W={moss:[5209416,6130256,7706458,4157508],soil:[10057042,9004871,11174744,7888195],stone:[10986895,9607045,11973020,8358267],paleWall:[13157543,12171679,13749170,11449242],roof:[11034178,9653562,11955528,8342078],timber:[6834741,7820346,5193009,8872514],rust:[9130296,10641727,7097149,11630157],foliage:[4029256,5739343,7185747,3106626]};function Pe(t,e,a=0){return(Math.imul(Math.trunc(t)+61,73856093)^Math.imul(Math.trunc(e)+113,19349663)^Math.imul(Math.trunc(a)+185,83492791))>>>0}function z(t,e=0){return(t>>>e&1023)/1023}function Ce(t,e){return t[e%t.length]??t[0]??16777215}function Jf(t,e){const a=[],r=[];return t.forEach((s,i)=>{const n=t[Math.max(0,i-1)]??s,o=t[Math.min(t.length-1,i+1)]??s,A=o[0]-n[0],l=o[2]-n[2],c=Math.hypot(A,l)||1,d=(e[i]??e[0]??1)/2,u=-l/c*d,h=A/c*d;a.push([s[0]+u,s[1],s[2]+h]),r.push([s[0]-u,s[1],s[2]-h])}),{left:a,right:r}}function nr(t,e,a,r){if(e.length<2||e.length!==a.length)throw new RangeError("Ribbon points and widths must have equal length.");const s=Jf(e,a);for(let i=0;i<e.length-1;i+=1){const n=s.left[i],o=s.left[i+1],A=s.right[i+1],l=s.right[i];if(n===void 0||o===void 0||A===void 0||l===void 0)continue;const c=r[i%r.length]??16777215,d=r[(i+1)%r.length]??c;t.addQuad({corners:[n,o,A,l],color:[c,d,d,c]})}}function Ci(t,e){return t.map(([a,r])=>[a,e,r])}function Zf(t){const e=Ci([[24,930],[140,920],[275,908],[415,900],[555,902],[695,890],[824,876]],1.18),a=[132,124,114,108,116,124,136];nr(t,e.map(([i,,n])=>[i,1.05,n]),a.map(i=>i+22),[7297603,7954503,7034690]),nr(t,e,a,[10648661,9990478,11371867,9398603]);const r=Ci([[270,910],[265,850],[267,790],[267,716]],1.24);nr(t,r,[82,78,68,60],[10188370,10977625,9399372]);const s=Ci([[292,908],[290,970],[278,1025],[267,1091]],1.26);nr(t,s,[72,70,64,58],[9990736,10845782,9201737]),nr(t,e.map(([i,,n])=>[i,1.5,n-27]),a.map(()=>7),[7755327,6836029]),nr(t,e.map(([i,,n])=>[i,1.52,n+24]),a.map(()=>6),[7230014,8084290]);for(let i=0;i<74;i+=1){const n=Pe(i,41,13),o=i/73,A=45+o*752,l=925-o*46+(z(n,5)-.5)*126,c=i%2===0?-1:1;t.addBox({center:[A,2.05+z(n,17)*.4,l+c*(57+z(n,12)*16)],size:[8+z(n,2)*12,1.5+z(n,20)*1.2,6+z(n,9)*9],rotation:[0,z(n,14)*Math.PI,0],color:Ce(W.stone,n),shade:.92})}}function Rc(t,e,a=0){return t>130-a&&t<380+a&&e>570-a&&e<720+a||t>150-a&&t<380+a&&e>1090-a&&e<1220+a||t>320-a&&t<402+a&&e>790-a&&e<872+a}function $f(t){[{x:105,z:630,radius:58,count:13,palette:W.moss},{x:407,z:694,radius:56,count:18,palette:W.stone},{x:207,z:752,radius:52,count:13,palette:W.soil},{x:361,z:831,radius:72,count:17,palette:W.moss},{x:500,z:900,radius:92,count:15,palette:W.stone},{x:471,z:760,radius:44,count:9,palette:W.soil},{x:471,z:1040,radius:46,count:9,palette:W.moss},{x:258,z:1058,radius:54,count:12,palette:W.soil},{x:407,z:1202,radius:58,count:17,palette:W.stone},{x:126,z:1164,radius:54,count:12,palette:W.moss},{x:118,z:830,radius:68,count:12,palette:W.soil},{x:178,z:1004,radius:72,count:12,palette:W.moss},{x:652,z:801,radius:76,count:13,palette:W.soil},{x:704,z:977,radius:78,count:13,palette:W.moss}].forEach((r,s)=>{for(let i=0;i<r.count;i+=1){const n=Pe(s,i,73),o=z(n,3)*Math.PI*2+s*.37,A=Math.sqrt(z(n,13))*r.radius,l=r.x+Math.cos(o)*A+(z(n,19)-.5)*8,c=r.z+Math.sin(o)*A+(z(n,7)-.5)*8;if(Rc(l,c,10))continue;const d=s%3===0?W.soil:s%3===1?W.moss:W.stone,u=i%5===0?d:r.palette;t.addBox({center:[l,1.08+z(n,21)*.24,c],size:[8+z(n,5)*24,.75+z(n,23)*.9,8+z(n,15)*24],rotation:[0,o+z(n,9)*.65,0],color:Ce(u,n>>>4),shade:.9+z(n,18)*.14})}}),[[414,846],[446,838],[478,843],[511,839],[540,849],[427,874],[463,872],[501,875],[535,878],[409,911],[444,908],[482,913],[525,909],[555,913],[424,947],[460,944],[500,948],[538,942]].forEach(([r,s],i)=>{const n=Pe(i,r,s);t.addBox({center:[r,1.7,s],size:[18+z(n,4)*9,1.8,13+z(n,12)*8],rotation:[0,(z(n,20)-.5)*.24,0],color:Ce(W.stone,n)})})}function we(t,e,a,r,s,i=r){ms.set(a[0]-e[0],a[1]-e[1],a[2]-e[2]);const n=ms.length();n<=Number.EPSILON||(ms.multiplyScalar(1/n),dA.setFromUnitVectors(Kf,ms),ws.setFromQuaternion(dA,"XYZ"),gs.set((e[0]+a[0])/2,(e[1]+a[1])/2,(e[2]+a[2])/2),t.addBox({center:[gs.x,gs.y,gs.z],size:[n,r,i],rotation:[ws.x,ws.y,ws.z],color:s}))}function qs(t,e,a,r,s,i){const n=Math.ceil((a-e)/24),o=(a-e)/n;for(let A=0;A<n;A+=1){const l=Pe(A,i,19);t.addBox({center:[e+(A+.5)*o,s+(z(l,13)-.5)*.8,r],size:[o-1.2,7+z(l,5)*2,11+z(l,18)*2],rotation:[0,(z(l,9)-.5)*.035,0],color:Ce(W.stone,l)})}}function e0(t,e,a,r,s,i,n,o,A){t.addBox({center:[255,5,645],size:[250,10,150],color:7830896}),t.addBox({center:[255,14,578],size:[226,8,12],color:9277827});for(const p of[137,373])t.addBox({center:[p,14,645],size:[12,8,126],color:p===137?8752254:9737607});qs(t,132,378,716,12,10),qs(t,132,378,574,12,11),qs(t,132,378,716,21,12);for(const p of[139,371])for(let m=0;m<6;m+=1){const f=Pe(p,m,101);t.addBox({center:[p,21+m*13,712],size:[16+z(f,4)*2,12,18+z(f,14)*2],rotation:[0,(z(f,20)-.5)*.045,0],color:Ce(W.stone,f)})}e.addBox({center:[255,55,578],size:[226,76,10],color:12236960}),e.addBox({center:[137,55,645],size:[10,76,126],color:11645852}),[{z:596,y:55,d:30,h:76},{z:626,y:27,d:30,h:22},{z:626,y:78,d:30,h:24},{z:680,y:55,d:78,h:76}].forEach((p,m)=>{e.addBox({center:[373,p.y,p.z],size:[10,p.h,p.d],color:Ce(W.paleWall,Pe(m,81))})}),[{x:149,y:54,width:20,height:78},{x:178,y:24,width:38,height:20},{x:178,y:78,width:38,height:24},{x:220,y:54,width:44,height:78},{x:268,y:81,width:42,height:18},{x:305,y:54,width:30,height:78},{x:337,y:24,width:32,height:20},{x:337,y:78,width:32,height:24},{x:362,y:54,width:18,height:78}].forEach((p,m)=>{e.addBox({center:[p.x,p.y,712],size:[p.width,p.height,9],color:Ce(W.paleWall,Pe(m,91))})}),[[151,57,718,13,18,8885103],[213,35,718,15,20,10194285],[304,69,718,10,15,7702891],[359,32,718,9,16,9993825]].forEach(([p,m,f,w,v,y])=>{e.addBox({center:[p,m,f],size:[w,v,1.5],color:y,shade:.92})});const u=268;r.addBox({center:[u,40,707],size:[34,58,5],color:4601903});for(let p=0;p<4;p+=1)r.addBox({center:[u-12.5+p*8.3,40,710],size:[6.7,54,2],color:Ce(W.timber,Pe(p,140))});r.addBox({center:[u-22,41,714],size:[6,68,8],color:6178355}),r.addBox({center:[u+22,41,714],size:[6,68,8],color:6178355}),r.addBox({center:[u,74,714],size:[50,7,9],color:6638133}),s.addBox({center:[u+10,39,713.5],size:[3,4,3],color:12157516}),[{x:178,y:51,z:708,rotationY:0},{x:337,y:51,z:708,rotationY:0}].forEach((p,m)=>{(m===0?A:o).addBox({center:[p.x,p.y,p.z],size:[28,24,2],color:m===0?8829094:14792302}),r.addBox({center:[p.x,p.y-15,p.z+4],size:[36,5,5],color:5849908}),r.addBox({center:[p.x,p.y+15,p.z+4],size:[36,5,5],color:5849908}),r.addBox({center:[p.x-18,p.y,p.z+4],size:[5,34,5],color:5849908}),r.addBox({center:[p.x+18,p.y,p.z+4],size:[5,34,5],color:5849908}),r.addBox({center:[p.x,p.y,p.z+5],size:[3,28,3],color:6309687}),r.addBox({center:[p.x,p.y,p.z+5],size:[31,3,3],color:6309687})}),A.addBox({center:[369,51,626],size:[2,23,24],color:7974045}),r.addBox({center:[368,51,626],size:[4,3,29],color:5718579}),r.addBox({center:[368,51,626],size:[4,29,3],color:5718579}),zc(a,r,{centerX:255,ridgeZ:645,wallTop:94,width:270,halfDepth:86,rise:34,columns:17,rows:7,seed:211,brokenSide:1}),t.addBox({center:[185,108,602],size:[27,47,25],color:8486770}),t.addBox({center:[185,133,602],size:[33,7,31],color:7304297}),[{y:3,z:726,width:54,depth:15},{y:6,z:720,width:48,depth:12}].forEach(p=>{t.addBox({center:[u,p.y,p.z],size:[p.width,p.y*2,p.depth],color:9277828})}),Lc(i,255,645,154,27,311),ii(n,151,714,77,401),ii(n,350,714,62,402),Fc(r,s,394,735,3,421),Oc(r,s,116,731,431)}function t0(t,e,a,r,s,i,n,o,A){t.addBox({center:[265,4,1155],size:[230,8,130],color:7699824}),t.addBox({center:[265,12,1095],size:[214,8,11],color:8883840});for(const d of[157,375])t.addBox({center:[d,12,1155],size:[11,8,112],color:d===157?8489594:9474949});qs(t,152,378,1216,11,510),e.addBox({center:[265,44,1095],size:[214,66,9],color:12106143}),e.addBox({center:[157,44,1155],size:[9,66,112],color:11449755}),[{z:1112,y:44,d:28,h:66},{z:1145,y:23,d:38,h:21},{z:1145,y:65,d:38,h:22},{z:1194,y:44,d:52,h:66}].forEach((d,u)=>{e.addBox({center:[375,d.y,d.z],size:[9,d.h,d.d],color:Ce(W.paleWall,Pe(u,521))})}),[{x:168,y:44,width:24,height:66},{x:205,y:72,width:50,height:10},{x:245,y:44,width:30,height:66},{x:293,y:23,width:66,height:20},{x:293,y:65,width:66,height:22},{x:350,y:44,width:46,height:66}].forEach((d,u)=>{e.addBox({center:[d.x,d.y,1215],size:[d.width,d.height,9],color:Ce(W.paleWall,Pe(u,531))})}),e.addBox({center:[352,34,1221],size:[14,23,1.5],color:8688239}),r.addBox({center:[205,38,1211],size:[40,56,5],color:5324080});for(let d=0;d<5;d+=1)r.addBox({center:[190+d*7.5,38,1214],size:[5.8,52,2],color:Ce(W.timber,Pe(d,540))});for(const d of[181,229])r.addBox({center:[d,39,1218],size:[6,64,8],color:6309684});r.addBox({center:[205,70,1218],size:[55,7,9],color:6309684}),A.addBox({center:[293,49,1211],size:[56,28,2],color:9288102});for(const d of[263,323])r.addBox({center:[d,49,1217],size:[5,36,5],color:5849652});for(const d of[32,66])r.addBox({center:[293,d,1217],size:[64,5,5],color:5849652});r.addBox({center:[293,49,1217],size:[4,30,4],color:5849652}),o.addBox({center:[371,49,1145],size:[2,26,31],color:14068840}),r.addBox({center:[369,49,1145],size:[4,34,4],color:5784116}),r.addBox({center:[369,49,1145],size:[4,4,39],color:5784116}),zc(a,r,{centerX:265,ridgeZ:1155,wallTop:78,width:248,halfDepth:74,rise:29,columns:16,rows:6,seed:551,brokenSide:1}),Lc(i,265,1155,134,23,571),ii(n,338,1219,54,581),ii(n,164,1219,44,582),Fc(r,s,403,1202,2,591),Oc(r,s,135,1210,601)}function zc(t,e,a){const r=a.width/a.columns,s=a.halfDepth/a.rows,i=Math.atan2(a.rise,a.halfDepth),o=Math.hypot(a.rise,a.halfDepth)/a.rows+2.2;for(const l of[-1,1])for(let c=0;c<a.rows;c+=1)for(let d=0;d<a.columns;d+=1){const u=Pe(d,c,a.seed+l*17);if(l===a.brokenSide&&d>=a.columns-5&&c>=1&&c<=a.rows-2&&((d+c)%3!==0||d===a.columns-1))continue;const p=a.centerX-a.width/2+(d+.5)*r+(z(u,11)-.5)*1.2,m=(c+.5)*s,f=a.ridgeZ+l*m,w=a.wallTop+a.rise-m/a.halfDepth*a.rise;t.addBox({center:[p,w,f],size:[r+1.4,3+z(u,18)*1.2,o],rotation:[l*i,(z(u,7)-.5)*.025,(z(u,20)-.5)*.018],color:Ce(W.roof,u)})}for(let l=0;l<a.columns;l+=1){const c=Pe(l,a.seed,631);t.addBox({center:[a.centerX-a.width/2+(l+.5)*r,a.wallTop+a.rise+1.6,a.ridgeZ],size:[r+1.2,5.5,9],rotation:[0,0,(z(c,12)-.5)*.025],color:Ce(W.roof,c)})}const A=a.centerX+a.width/2-r*4.5;for(let l=0;l<5;l+=1){const c=A+l*r,d=[c,a.wallTop+a.rise-1,a.ridgeZ],u=[c,a.wallTop-1,a.ridgeZ+a.brokenSide*a.halfDepth];we(e,d,u,3.4,6177841,4.2)}}function Lc(t,e,a,r,s,i){for(let n=0;n<s;n+=1){const o=Pe(n,i,701),A=n/s*Math.PI*2+(z(o,6)-.5)*.28,l=r+(z(o,15)-.5)*25,c=5+z(o,3)*15,d=5+z(o,10)*13,u=.8+z(o,17)*.8;t.addBox({center:[e+Math.cos(A)*l,.25+u/2,a+Math.sin(A)*l],size:[c,u,d],rotation:[(z(o,1)-.5)*.05,A+z(o,13),(z(o,8)-.5)*.05],color:n%5===0?Ce(W.roof,o):Ce(W.stone,o)})}}function ii(t,e,a,r,s){const i=[];for(let n=0;n<7;n+=1){const o=Pe(n,s,733);i.push([e+Math.sin(n*1.3+s)*7,3+n/6*r,a+z(o,12)*1.4])}for(let n=0;n<i.length-1;n+=1){const o=i[n],A=i[n+1];if(o===void 0||A===void 0)continue;we(t,o,A,2.2,3499325,1.5);const l=Pe(n,s,739);t.addBox({center:[A[0]+(z(l,4)-.5)*9,A[1],A[2]+1],size:[6+z(l,12)*5,3+z(l,18)*3,2.2],rotation:[0,(z(l,9)-.5)*.4,(z(l,21)-.5)*.45],color:Ce(W.foliage,l)})}}function Fc(t,e,a,r,s,i){for(let n=0;n<s;n+=1){const o=Pe(n,i,751),A=25+z(o,5)*8,l=22+z(o,13)*9,c=23+z(o,19)*8,d=a+n*25,u=r+n%2*22,h=(z(o,9)-.5)*.16;t.addBox({center:[d,l/2,u],size:[A,l,c],rotation:[0,h,0],color:Ce(W.timber,o)});for(const g of[4,l-4])e.addBox({center:[d,g,u],size:[A+2,2.2,c+2],rotation:[0,h,0],color:8084034})}}function Oc(t,e,a,r,s){for(let i=0;i<3;i+=1){const n=Pe(i,s,769),o=[a+i*9,2,r+i*3],A=[o[0]+7+z(n,7)*5,35+z(n,14)*11,o[2]-3];we(t,o,A,3.2,6441011,2.8),e.addBox({center:[A[0],A[1]+2,A[2]],size:[i===1?15:11,5,i===2?9:4],rotation:[0,z(n,19)*.4,.18],color:Ce(W.rust,n)})}}function a0(t,e,a,r,s){for(let A=0;A<3;A+=1)for(let l=0;l<14;l+=1){const c=Pe(l,A,811),d=(l+A%2*.5)/14*Math.PI*2,u=31+(z(c,11)-.5)*1.7;t.addBox({center:[361+Math.cos(d)*u,5+A*9,831+Math.sin(d)*u],size:[16.5+z(c,3)*2,8,11+z(c,17)*1.5],rotation:[0,-d,0],color:Ce(W.stone,c)})}s.addBox({center:[361,16,831],size:[42,1.4,42],color:4165521,shade:.9});for(const A of[329,393])e.addBox({center:[A,49,831],size:[8,58,9],color:6309170}),t.addBox({center:[A,5,831],size:[15,10,17],color:8094324});e.addBox({center:[361,75,831],size:[82,8,9],color:6769203}),a.addBox({center:[361,54,831],size:[74,5,5],color:7035725}),a.addBox({center:[361,54,831],size:[10,16,10],color:10117950}),we(a,[361,54,831],[361,23,831],1.8,4998719,1.8),e.addBox({center:[361,21,831],size:[18,12,16],color:7754810});for(let A=0;A<12;A+=1){const l=Pe(A,831,17),c=A/12*Math.PI*2;r.addBox({center:[361+Math.cos(c)*39,2.5,831+Math.sin(c)*39],size:[8+z(l,8)*7,3,5],rotation:[0,-c,(z(l,17)-.5)*.25],color:Ce(W.moss,l)})}}function r0(t,e,a,r){const s=Ae.x,i=Ae.y;for(const o of[470,530])t.addBox({center:[o,34,i],size:[8,68,9],color:5783599}),r.addBox({center:[o,3,i],size:[17,6,18],color:8291704});t.addBox({center:[s,49,i],size:[76,48,8],color:6703668});for(let o=0;o<5;o+=1)t.addBox({center:[s,31+o*9,i+5],size:[70,7,3],color:Ce(W.timber,Pe(o,901))});t.addBox({center:[s,76,i],size:[92,7,19],rotation:[0,0,-.035],color:7753785}),we(t,[470,10,i],[492,75,i],4,5126444),we(t,[530,10,i],[508,75,i],4,5126444),[{x:479,y:57,width:19,height:24,color:14208938},{x:503,y:54,width:20,height:29,color:13154696},{x:524,y:59,width:15,height:20,color:14603701},{x:489,y:36,width:22,height:14,color:12102269},{x:518,y:38,width:23,height:16,color:13813407}].forEach((o,A)=>{a.addBox({center:[o.x,o.y,i+7.1],size:[o.width,o.height,.9],rotation:[0,0,(A-2)*.025],color:o.color,shade:1.03}),e.addBox({center:[o.x,o.y+o.height/2-3,i+8],size:[2.4,2.4,1.8],color:A%2===0?11558722:5144948})})}function uA(t,e,a,r,s,i){e.addBox({center:[r,4,s],size:[20,8,20],rotation:[0,i,0],color:8554362}),t.addBox({center:[r,35,s],size:[7,62,7],rotation:[0,0,i],color:5590855}),t.addBox({center:[r+9,66,s],size:[25,5,6],rotation:[0,i,-.08],color:5984325}),t.addBox({center:[r+19,57,s],size:[3.5,17,4],color:6444362}),a.addBox({center:[r+19,53,s],size:[13,15,12],rotation:[0,i,0],color:15907944,shade:1.05});for(const n of[-7.5,7.5])t.addBox({center:[r+19+n,53,s],size:[2,18,15],rotation:[0,i,0],color:5851968});t.addBox({center:[r+19,62,s],size:[18,3,16],color:6771522}),t.addBox({center:[r+19,44,s],size:[18,3,16],color:6771522})}function s0(t,e,a,r){uA(t,e,a,470,760,-.025),uA(t,e,a,470,1040,.018),[[[489,65,760],[494,58,805],[498,56,850],[500,72,940]],[[500,72,960],[498,55,974],[494,57,997],[489,65,1040]]].forEach(i=>{for(let n=0;n<i.length-1;n+=1){const o=i[n],A=i[n+1];o!==void 0&&A!==void 0&&we(t,o,A,1.45,4013113,1.45)}});for(const[i,n]of[[489,760],[489,1040]]){const o=new va(16760690,46,155,2);o.position.set(i,57,n),o.castShadow=!1,o.name=`start-town-lamp-light-${n}`,r.add(o)}}function i0(t){for(let a=0;a<96;a+=1){const r=Pe(a,1101,29),s=52+z(r,2)*742,i=446+z(r,12)*900;if(Rc(s,i,22)||s>390&&s<600&&Math.abs(i-900)<92)continue;const n=2+r%3;for(let o=0;o<n;o+=1){const A=Pe(a,o,1111),l=7+z(A,4)*13;t.addBox({center:[s+(z(A,11)-.5)*10,1.8+l/2,i+(z(A,18)-.5)*10],size:[2.2+z(A,7)*2,l,2.2],rotation:[(z(A,14)-.5)*.32,z(A,21)*Math.PI,(z(A,2)-.5)*.28],color:Ce(W.foliage,A)})}a%9===0&&t.addBox({center:[s,13,i],size:[5,5,5],rotation:[.2,z(r,18)*Math.PI,.2],color:a%18===0?14988624:13922920,shade:1.04})}}function n0(t,e,a){const r=[7314321,8628896,12690255,11123879],s=255,i=645,n=94,o=270,A=86,l=34,c=17,d=7,u=o/c,h=A/d,g=Math.atan2(l,A),p=Math.hypot(l,A)/d+3.4,m=[[16,2],[16,4],[15,2],[14,3],[12,5]];m.forEach(([y,P],b)=>{const x=(P+.5)*h,B=s-o/2+(y+.5)*u,E=i+x,M=n+l-x/A*l+1.6;t.addBox({center:[B,M,E],size:[u+2.2,2.4,p],rotation:[g,0,(b-2)*.012],color:r[b%r.length]??7314321,shade:1.02});for(const T of[-u*.27,u*.27])a.addBox({center:[B+T,M+2.1,E],size:[2.2,1.8,2.2],rotation:[g,0,0],color:5464413})});const f=[{center:[315,52,717.2],size:[27,30,1.8],color:7577750},{center:[214,35,717.2],size:[21,18,1.8],color:12756307},{center:[378.5,54,686],size:[1.8,31,25],color:9547684}];f.forEach((y,P)=>{t.addBox({center:y.center,size:y.size,color:y.color,rotation:P===2?[0,0,.025]:[0,0,-.02]}),a.addBox({center:P===2?[379.8,y.center[1],y.center[2]-7]:[y.center[0],y.center[1]+8,718.4],size:P===2?[1.4,3,8]:[9,3,1.4],color:5661278})});const w=397,v=379;for(const y of[665,690])we(e,[w,2,y],[v,81,y],4,7757892,3.5);for(let y=0;y<7;y+=1){const P=(y+1)/8,b=w+(v-w)*P,x=2+79*P;we(e,[b,x,665],[b,x,690],2.8,8415562,3)}e.addBox({center:[386,47,704],size:[7,90,7],rotation:[0,0,-.018],color:6836280}),we(e,[389,5,697],[367,94,704],5,7493436,5),a.addBox({center:[409,7,714],size:[14,11,13],color:7312011});for(const y of[402.5,415.5])a.addBox({center:[y,9,714],size:[2,12,15],color:5663848});return we(a,[402,13,714],[405,20,714],1.7,5792863),we(a,[405,20,714],[413,20,714],1.7,5792863),we(a,[413,20,714],[416,13,714],1.7,5792863),m.length+f.length}function o0(t,e,a,r){const s=[412,432,452,472],i=[1132,1150,1168,1186];s.forEach((n,o)=>{t.addBox({center:[n,1.45,1155],size:[12,1.6,74],color:o%2===0?7623997:8479047,shade:.94});for(const A of[1117.5,1192.5])e.addBox({center:[n,2.4,A],size:[15,3,3],color:7955012});for(const A of[1125,1185])e.addBox({center:[n,16,A],size:[3,29,3],color:6903358});we(e,[n,28,1125],[n,28,1185],1.6,8679503,1.6),i.forEach((A,l)=>{const c=(o+l)%3===0?7314260:5211469;r.addBox({center:[n,8,A],size:[2.4,13,2.4],rotation:[.06,o*.2,.08],color:4683593}),r.addBox({center:[n-3.4,10,A],size:[7,3.5,3],rotation:[0,o*.16,-.22],color:c}),r.addBox({center:[n+3.4,13,A+1],size:[7,3.5,3],rotation:[0,-o*.13,.22],color:c})})}),a.addBox({center:[470,7,1116],size:[13,10,11],color:6985874}),we(a,[476,9,1116],[478,14,1116],3.2,7577497,3),we(a,[463,12,1116],[464,20,1116],2,5860970),we(a,[464,20,1116],[473,20,1116],2,5860970),we(a,[473,20,1116],[476,12,1116],2,5860970);for(let n=0;n<3;n+=1)e.addBox({center:[468,5+n*6,1192],size:[19-n*2,6,14],rotation:[0,n%2===0?.08:-.07,0],color:n===1?11768399:12691293});return e.addBox({center:[468,14,1192],size:[3,24,3],color:7693124}),s.length}function A0(t,e,a){const r=[375,59,1095],s=[470,59,1040];for(const[d,u]of[[r[0],r[2]],[s[0],s[2]]])e.addBox({center:[d,31,u],size:[5,62,5],color:7493694}),e.addBox({center:[d,58,u],size:[14,4,4],color:8414794});we(a,r,s,1.25,7892313,1.25);const i=[14866103,7448483,12755279,10852022],n=[16,14,17,15],o=[23,20,24,21],A=s[0]-r[0],l=s[2]-r[2],c=-Math.atan2(l,A);return i.forEach((d,u)=>{const h=.17+u*.22,g=r[0]+A*h,p=r[2]+l*h,m=o[u]??20;t.addBox({center:[g,57-m/2,p],size:[n[u]??15,m,2],rotation:[0,c,(u-1.5)*.025],color:d,shade:1.03});for(const f of[-4,4])a.addBox({center:[g+Math.cos(-c)*f,58.2,p+Math.sin(-c)*f],size:[2,3,2],rotation:[0,c,0],color:6643280})}),i.length}function l0(t,e,a,r,s){e.addBox({center:[550,27,790],size:[78,7,25],color:7951930});for(const u of[522,578])for(const h of[782,798])e.addBox({center:[u,13,h],size:[6,26,6],color:6703926});e.addBox({center:[550,10,790],size:[63,4,19],color:7164217}),a.addBox({center:[532,36,790],size:[12,11,11],color:6450280}),a.addBox({center:[532,43,790],size:[8,3,8],color:5200214}),we(a,[538,38,790],[545,42,790],3,5923936,3),we(a,[526,42,790],[526,49,790],2,5266007),we(a,[526,49,790],[536,49,790],2,5266007),we(a,[536,49,790],[538,42,790],2,5266007);for(let u=0;u<3;u+=1)e.addBox({center:[552+u*9,33,786+u*3],size:[17,2.2,2.2],rotation:[0,-.25+u*.18,.08],color:7426362}),a.addBox({center:[560+u*9,34,784+u*3],size:[6,4,4],rotation:[0,u*.17,0],color:6844780});s.addBox({center:[565,39,797],size:[4,12,4],color:7908006}),r.addBox({center:[578,39,793],size:[7,10,7],color:14729844}),a.addBox({center:[578,45,793],size:[9,2,9],color:5988185});const o=582,A=815;a.addBox({center:[o,19,A],size:[39,6,25],color:6454646});for(const u of[822,846])a.addBox({center:[o,25,u],size:[39,13,4],rotation:[0,0,u<A?-.1:.1],color:u<A?7442311:6190191});a.addBox({center:[564,25,A],size:[5,13,27],color:6849404}),t.addBox({center:[592,26,847.8],size:[16,10,1.8],color:12624721});for(const u of[823,845])we(e,[568,19,u],[523,12,u-(u<A?5:-5)],4,7426361,4);for(const u of[824,844])we(a,[573,16,u],[568,3,u],3,5857629,3);const l=610,c=12,d=10;for(let u=0;u<8;u+=1){const h=u/8*Math.PI*2;a.addBox({center:[l+Math.cos(h)*d,c+Math.sin(h)*d,A],size:[8.5,3.8,5],rotation:[0,0,h+Math.PI/2],color:u===1?7708822:5199700})}a.addBox({center:[l,c,A],size:[7,7,8],color:7693128})}function c0(t,e,a,r,s,i,n){const o=t.components+e.components+a.components+r.components+s.components+i.components+n.components,A=n0(t,e,a),l=o0(r,e,a,s),c=A0(t,e,a);l0(t,e,a,i,n);const u=t.components+e.components+a.components+r.components+s.components+i.components+n.components-o;return{addedComponents:u,addedTriangles:u*12,repairPanelCount:A,roofDamageFillRatio:5/18,gardenBedCount:l,laundryClothCount:c,dangerRedOrangeUsed:!1,gardenBounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}}function Qt(t,e){const a=t.build();a.name=`${e.name}-geometry`;const r=new L({name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!0,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1}),s=new I(a,r);return s.name=e.name,s.castShadow=e.castShadow??!1,s.receiveShadow=e.receiveShadow??!1,s}function d0(t){let e=0,a=0,r=0,s=0;return t.traverse(i=>{if(!(i instanceof I))return;e+=1,r+=1;const n=i.geometry.getAttribute("position");a+=i.geometry.index===null?n.count/3:i.geometry.index.count/3;const o=i.geometry.userData.componentCount;typeof o=="number"&&(s+=o)}),{drawCalls:e,triangles:a,geometries:r,components:s}}function u0(){const t=new U,e=new U,a=new U,r=new U,s=new U,i=new U,n=new U,o=new U,A=new U,l=new U,c=new U,d=new R;d.name="start-town-art-slice",Zf(t),$f(e),e0(a,r,s,i,n,o,A,l,c),t0(a,r,s,i,n,o,A,l,c),a0(a,i,n,A,c),r0(i,n,r,o),s0(n,a,l,d),i0(A);const u=c0(r,i,n,e,A,l,c),h=new R;h.name="start-town-ground";const g=[Qt(t,{name:"start-town-road-ribbons",roughness:.98,receiveShadow:!0}),Qt(e,{name:"start-town-ground-microdetail",roughness:1,receiveShadow:!0}),Qt(a,{name:"start-town-masonry",roughness:.94,castShadow:!0,receiveShadow:!0}),Qt(r,{name:"start-town-wall-panels",roughness:.98,castShadow:!0,receiveShadow:!0}),Qt(s,{name:"start-town-broken-roofs",roughness:.88,castShadow:!0,receiveShadow:!0}),Qt(i,{name:"start-town-timber-props",roughness:.9,castShadow:!0,receiveShadow:!0}),Qt(n,{name:"start-town-metal-props",roughness:.64,metalness:.42,castShadow:!0,receiveShadow:!0}),Qt(o,{name:"start-town-rubble",roughness:1,castShadow:!0,receiveShadow:!0}),Qt(A,{name:"start-town-foliage",roughness:.96,receiveShadow:!0}),Qt(l,{name:"start-town-warm-glass",roughness:.34,metalness:.05,emissive:9062943,emissiveIntensity:.72}),Qt(c,{name:"start-town-cool-glass-and-water",roughness:.3,metalness:.08,emissive:1526859,emissiveIntensity:.58})];h.add(g[0],g[1]),d.add(h,...g.slice(2));const p=d0(d);d.userData.metrics=p,d.userData.lifePass=u,d.userData.replacedTerrainIds=[...lA],d.userData.replacedPropIds=[...cA],d.userData.contractBoardPosition={x:Ae.x,y:Ae.y};let m=!1;return{group:d,ground:h,replacedTerrainIds:lA,replacedPropIds:cA,dispose(){m||(m=!0,d.removeFromParent(),d.traverse(f=>{f instanceof I&&(f.geometry.dispose(),Array.isArray(f.material)?f.material.forEach(w=>w.dispose()):f.material.dispose())}),h.clear(),d.clear())}}}const os="north-star-surface-v2",Uc="north-star-coherent-surface-generator",Nc="2.0.0",Ua=1314084402,Hc="procedural-dev-candidate",hA=new Map,Ne={asphalt:{resolution:1024,seedOffset:173144599,repeat:[1.08,1.03],normalStrength:3.4,cues:["graded-aggregate","hairline-crack-network","utility-cut-patch","damp-drainage-seam"]},concrete:{resolution:1024,seedOffset:202031847,repeat:[1,1],normalStrength:4.8,cues:["exposed-aggregate","rain-runoff-streaks","mineral-bloom","board-formed-repair-panel"]},roof:{resolution:512,seedOffset:7343906,repeat:[1,1],normalStrength:6.4,cues:["embedded-roof-gravel","membrane-lap-seams","ponding-water-ring","maintenance-patch"]}},Mi=Object.freeze({albedo:"srgb-rgba8",normal:"linear-rgba8-tangent-space",roughness:"linear-rgba8-g-channel"});function Le(t,e,a){return Math.min(a,Math.max(e,t))}function Ot(t){return Math.round(Le(t,0,255))}function ke(t){return t*t*(3-2*t)}function Ut(t,e,a){return t+(e-t)*a}function h0(t,e,a,r=0){let s=Math.imul(t^a,374761393)^Math.imul(e^r,668265261);return s=Math.imul(s^s>>>15,2246822507),s=Math.imul(s^s>>>13,3266489909),(s^s>>>16)>>>0}function tt(t,e,a,r=0){return h0(t,e,a,r)/4294967295}function Pr(t,e,a,r,s){const i=Math.floor(t/a),n=Math.floor(e/a),o=ke((t-i*a)/a),A=ke((e-n*a)/a),l=Ut(tt(i,n,r,s),tt(i+1,n,r,s),o),c=Ut(tt(i,n+1,r,s),tt(i+1,n+1,r,s),o);return Ut(l,c,A)}function Jr(t,e){const a=(t%e+e)%e;return Math.min(a,e-a)}function io(t,e,a,r,s,i,n){const o=Math.min(t-a,r-t,e-s,i-e);return ke(Le(o/n,0,1))}function no(t,e,a,r,s,i,n){if(!(t>=a&&t<=r&&e>=s&&e<=i))return 0;const A=Math.min(t-a,r-t,e-s,i-e);return 1-ke(Le(A/n,0,1))}function oo(t,e,a,r,s){const i=e*4;t[i]=Ot(a),t[i+1]=Ot(r),t[i+2]=Ot(s),t[i+3]=255}function Ao(t,e,a){const r=Ot(Le(a,0,1)*255),s=e*4;t[s]=r,t[s+1]=r,t[s+2]=r,t[s+3]=255}function f0(t,e){const a=Math.max(16,Math.floor(e/16));for(let r=0;r<e;r+=1)for(let s=0;s<=a;s+=1){const i=1-ke(s/a),n=r*e+s,o=r*e+(e-1-s),A=t[n]??0,l=t[o]??0,c=(A+l)*.5;t[n]=Ut(A,c,i),t[o]=Ut(l,c,i)}for(let r=0;r<e;r+=1)for(let s=0;s<=a;s+=1){const i=1-ke(s/a),n=s*e+r,o=(e-1-s)*e+r,A=t[n]??0,l=t[o]??0,c=(A+l)*.5;t[n]=Ut(A,c,i),t[o]=Ut(l,c,i)}}function Si(t,e){const a=Math.max(16,Math.floor(e/16));for(let r=0;r<e;r+=1)for(let s=0;s<=a;s+=1){const i=1-ke(s/a),n=(r*e+s)*4,o=(r*e+(e-1-s))*4;for(let A=0;A<3;A+=1){const l=t[n+A]??0,c=t[o+A]??0,d=(l+c)*.5;t[n+A]=Ot(Ut(l,d,i)),t[o+A]=Ot(Ut(c,d,i))}}for(let r=0;r<e;r+=1)for(let s=0;s<=a;s+=1){const i=1-ke(s/a),n=(s*e+r)*4,o=((e-1-s)*e+r)*4;for(let A=0;A<3;A+=1){const l=t[n+A]??0,c=t[o+A]??0,d=(l+c)*.5;t[n+A]=Ot(Ut(l,d,i)),t[o+A]=Ot(Ut(c,d,i))}}}function lo(t,e,a,r,s){f0(a,r),Si(t,r),Si(e,r);const i=p0(a,r,s);return Si(i,r),{albedo:t,normal:i,roughness:e}}function p0(t,e,a){const r=new Uint8Array(e*e*4);for(let s=0;s<e;s+=1){const i=s===0?e-1:s-1,n=s===e-1?0:s+1;for(let o=0;o<e;o+=1){const A=o===0?e-1:o-1,l=o===e-1?0:o+1,c=s*e+o,d=t[s*e+A]??0,u=t[s*e+l]??0,h=t[i*e+o]??0,g=t[n*e+o]??0,p=(d-u)*a,m=(h-g)*a,f=1/Math.sqrt(p*p+m*m+1),w=c*4;r[w]=Ot((p*f*.5+.5)*255),r[w+1]=Ot((m*f*.5+.5)*255),r[w+2]=Ot(f*255),r[w+3]=255}}return r}function m0(t,e,a){const r=t*t,s=new Uint8Array(r*4),i=new Uint8Array(r*4),n=new Float32Array(r);for(let o=0;o<t;o+=1){const A=o/t;for(let l=0;l<t;l+=1){const c=o*t+l,d=l/t,u=Pr(l,o,76,e,11),h=Pr(l,o,19,e,29),g=tt(l,o,e,47),p=5,m=Math.floor(l/p),f=Math.floor(o/p),w=l%p/p,v=o%p/p,y=.2+tt(m,f,e,59)*.6,P=.2+tt(m,f,e,61)*.6,b=Math.hypot(w-y,v-P),B=(tt(m,f,e,67)>.64?1:0)*Le((.2-b)/.085,0,1),E=g>.991?1:0,M=g<.011?1:0,T=Jr(l+o*.21,211),k=1-ke(Le(T/2.2,0,1)),H=t*.59+Math.sin(o*.012)*23+Math.sin(o*.041)*4,O=1-ke(Le(Math.abs(l-H)/1.55,0,1)),X=H-(o-t*.42)*.43,ee=(A>.42&&A<.67?1:0)*(1-ke(Le(Math.abs(l-X)/1.3,0,1))),J=Math.max(O,ee),_=io(d,A,.13,.37,.61,.82,.012),ie=no(d,A,.13,.37,.61,.82,.006),pe=t*.72+Math.sin(l*.018)*t*.011,Re=Math.abs(o-pe),Ue=1-ke(Le(Re/18,0,1)),_e=69+u*20+h*9+(g-.5)*8,Fe=B*(g>.5?12:-7)+E*8-M*7,ce=_*(7+h*8)-ie*17,me=Ue*21,xe=J*32+k*13;oo(s,c,_e-5+Fe+ce-me-xe,_e+1+Fe+ce-me*.84-xe,_e+4+Fe+ce-me*.67-xe);const Ke=.78+B*.07+J*.1+k*.05-Ue*.36-_*.06+(h-.5)*.04;Ao(i,c,Ke),n[c]=(u-.5)*.18+(h-.5)*.11+(g-.5)*.035+B*.075+_*.035-ie*.1-k*.13-J*.24}}return lo(s,i,n,t,a)}function g0(t,e,a){const r=t*t,s=new Uint8Array(r*4),i=new Uint8Array(r*4),n=new Float32Array(r);for(let o=0;o<t;o+=1){const A=o/t;for(let l=0;l<t;l+=1){const c=o*t+l,d=l/t,u=Pr(l,o,83,e,71),h=Pr(l,o,27,e,83),g=tt(l,o,e,97),p=8,m=Math.floor(l/p),f=Math.floor(o/p),w=l%p/p,v=o%p/p,y=.18+tt(m,f,e,101)*.64,P=.18+tt(m,f,e,103)*.64,b=Math.hypot(w-y,v-P),x=Le((.21-b)/.085,0,1),B=Math.max(1-ke(Le(Jr(l+23,263)/1.7,0,1)),1-ke(Le(Jr(o+37,197)/1.5,0,1))),E=Math.floor(l/17),M=tt(E,0,e,107)>.57?1:0,T=(.18+tt(E,1,e,109)*.64)*17,k=Math.abs(l%17-T),H=M*(1-ke(Le(k/3.4,0,1)))*(.25+A*.75)*(.72+h*.28),O=(d-.72)/.23,X=(A-.63)/.18,j=Math.sqrt(O*O+X*X),ee=(1-ke(Le((j-.35)/.65,0,1)))*(.55+u*.45),J=io(d,A,.12,.43,.24,.58,.014),_=no(d,A,.12,.43,.24,.58,.007),ie=t*.66+Math.sin(o*.019)*12+Math.sin(o*.053)*2.5,Re=(A>.18&&A<.84?1:0)*(1-ke(Le(Math.abs(l-ie)/1.25,0,1))),Ue=145+u*18+(h-.5)*10,_e=x*(g>.48?18:-12),Fe=J*(8+h*5)-_*20;oo(s,c,Ue+4+_e+ee*24+Fe-H*32-Re*35,Ue+8+_e+ee*27+Fe-H*23-Re*35,Ue+5+_e+ee*19+Fe-H*18-Re*32);const ce=.76+x*.13+B*.08+ee*.11+Re*.1-J*.09-H*.12+(h-.5)*.05;Ao(i,c,ce),n[c]=(u-.5)*.13+(h-.5)*.08+(g-.5)*.025+x*.16+ee*.025+J*.04-_*.12-B*.1-Re*.23}}return lo(s,i,n,t,a)}function w0(t,e,a){const r=t*t,s=new Uint8Array(r*4),i=new Uint8Array(r*4),n=new Float32Array(r);for(let o=0;o<t;o+=1){const A=o/t;for(let l=0;l<t;l+=1){const c=o*t+l,d=l/t,u=Pr(l,o,53,e,127),h=Pr(l,o,13,e,131),g=tt(l,o,e,137),p=6,m=Math.floor(l/p),f=Math.floor(o/p),w=l%p/p,v=o%p/p,y=.16+tt(m,f,e,139)*.68,P=.16+tt(m,f,e,149)*.68,b=Math.hypot(w-y,v-P),x=Le((.27-b)/.11,0,1),B=Math.max(1-ke(Le(Jr(l+19,127)/2.1,0,1)),1-ke(Le(Jr(o+41,173)/1.8,0,1))),E=(d-.68)/.25,M=(A-.39)/.17,T=Math.sqrt(E*E+M*M),k=1-ke(Le((T-.62)/.24,0,1)),H=1-ke(Le(Math.abs(T-.92)/.065,0,1)),O=io(d,A,.1,.34,.67,.84,.018),X=no(d,A,.1,.34,.67,.84,.01),j=111+u*17+(h-.5)*9,ee=x*(g>.48?25:-13),J=O*10-X*18;oo(s,c,j+8+ee+J-k*27-H*13-B*10,j+11+ee+J-k*18-H*8-B*9,j+9+ee+J-k*11-H*2-B*7);const _=.72+x*.18+B*.08+H*.08-k*.42-O*.08+(h-.5)*.05;Ao(i,c,_),n[c]=(u-.5)*.13+(h-.5)*.07+(g-.5)*.025+x*.22+O*.04-X*.12-B*.09-k*.055+H*.035}}return lo(s,i,n,t,a)}function Ii(t){let e=2166136261;for(let a=0;a<t.length;a+=1)e=Math.imul(e^(t[a]??0),16777619);return`fnv1a32:${(e>>>0).toString(16).padStart(8,"0")}`}function Qi(t,e,a,r,s,i,n){const o=new Da(i,a,a,Ya,ya);return o.name=`north-star-${t}-${e}`,o.colorSpace=e==="albedo"?je:Ld,o.wrapS=We,o.wrapT=We,o.repeat.set(s[0],s[1]),o.anisotropy=8,o.magFilter=at,o.minFilter=xa,o.generateMipmaps=!0,o.unpackAlignment=1,o.needsUpdate=!0,o.userData={profile:os,generator:Uc,version:Nc,seed:r,baseSeed:Ua,surface:t,channel:e,resolution:a,contentDigest:n,deterministic:!0,source:Hc},o}function v0(t,e){const a=(Ua^e.seedOffset)>>>0;switch(t){case"asphalt":return m0(e.resolution,a,e.normalStrength);case"concrete":return g0(e.resolution,a,e.normalStrength);case"roof":return w0(e.resolution,a,e.normalStrength)}}function ki(t,e){const a=(Ua^e.seedOffset)>>>0;let r=hA.get(t);if(r===void 0){const n=v0(t,e),o=Object.freeze({albedo:Ii(n.albedo),normal:Ii(n.normal),roughness:Ii(n.roughness)});r={buffers:n,digests:o},hA.set(t,r)}const{buffers:s,digests:i}=r;return Object.freeze({albedoMap:Qi(t,"albedo",e.resolution,a,e.repeat,s.albedo,i.albedo),normalMap:Qi(t,"normal",e.resolution,a,e.repeat,s.normal,i.normal),roughnessMap:Qi(t,"roughness",e.resolution,a,e.repeat,s.roughness,i.roughness),resolution:e.resolution,digests:i})}function co(){const t=ki("asphalt",Ne.asphalt),e=ki("concrete",Ne.concrete),a=ki("roof",Ne.roof),r=Object.freeze({profile:os,generator:Uc,version:Nc,seed:Ua,deterministic:!0,source:Hc,surfaces:Object.freeze({asphalt:Object.freeze({resolution:t.resolution,seed:(Ua^Ne.asphalt.seedOffset)>>>0,repeat:[Ne.asphalt.repeat[0],Ne.asphalt.repeat[1]],normalStrength:Ne.asphalt.normalStrength,channelEncoding:Mi,digests:t.digests,cues:Ne.asphalt.cues}),concrete:Object.freeze({resolution:e.resolution,seed:(Ua^Ne.concrete.seedOffset)>>>0,repeat:[Ne.concrete.repeat[0],Ne.concrete.repeat[1]],normalStrength:Ne.concrete.normalStrength,channelEncoding:Mi,digests:e.digests,cues:Ne.concrete.cues}),roof:Object.freeze({resolution:a.resolution,seed:(Ua^Ne.roof.seedOffset)>>>0,repeat:[Ne.roof.repeat[0],Ne.roof.repeat[1]],normalStrength:Ne.roof.normalStrength,channelEncoding:Mi,digests:a.digests,cues:Ne.roof.cues})})}),s=[t.albedoMap,t.normalMap,t.roughnessMap,e.albedoMap,e.normalMap,e.roughnessMap,a.albedoMap,a.normalMap,a.roughnessMap];let i=!1;return{asphalt:t,concrete:e,roof:a,provenance:r,dispose(){i||(i=!0,s.forEach(n=>n.dispose()))}}}const fA=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),pA=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),y0=["crosswalk-and-lane-markings","tactile-paving-and-expansion-joints","mixed-use-apartment-balconies","ground-floor-shop-canopy","elevated-rail-platform-fragment","utility-pipes-and-drainage","public-information-kiosk"],x0=[{id:"north-facade-runoff",cause:"broken gutters feed the shaded apartment wall",bounds:{minimumX:130,maximumX:380,minimumZ:700,maximumZ:756}},{id:"utility-basin-seep",cause:"a cracked rain cistern keeps the old utility apron wet",bounds:{minimumX:320,maximumX:402,minimumZ:790,maximumZ:872}},{id:"south-drain-garden",cause:"road runoff is diverted into repaired food-growing beds",bounds:{minimumX:405,maximumX:480,minimumZ:1110,maximumZ:1200}}],b0=["rain-capture-and-filter","patched-solar-panels","kitchen-garden","working-amber-lights","laundry-line","repaired-public-kiosk"];function Xa(t,e,a=0){return(Math.imul(Math.trunc(t)+81,73856093)^Math.imul(Math.trunc(e)+167,19349663)^Math.imul(Math.trunc(a)+265,83492791))>>>0}function ae(t,e=0){return(t>>>e&1023)/1023}function D0(t,e,a,r){const[s,i,n,o]=e;t.addQuad({corners:[[s,a,n],[s,a,o],[i,a,o],[i,a,n]],color:r})}function mr(t,e,a,r,s,i){const n=a[0]-e[0],o=a[1]-e[1],A=Math.hypot(n,o);t.addBox({center:[(e[0]+a[0])/2,r,(e[1]+a[1])/2],size:[A,.42,s],rotation:[0,-Math.atan2(o,n),0],color:i})}function B0(t){const e=new sa(860,760,48,40);e.name="north-star-city-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.62,900),e.userData.componentCount=1;const a=new L({name:"north-star-city-asphalt-material",color:16777215,map:t.albedoMap,normalMap:t.normalMap,normalScale:new Ve(.42,.42),roughnessMap:t.roughnessMap,roughness:1,metalness:.04,flatShading:!1});a.userData.surfaceProfile=os,a.userData.surfaceKind="asphalt";const r=new I(e,a);return r.name="north-star-city-asphalt",r.receiveShadow=!0,r}function vs(t){const[e,a,r]=t.size,s=new ge(e,a,r);s.name=`${t.name}-geometry`;const i=s.getAttribute("uv"),n=s.getAttribute("normal"),[o,A]=t.uvOffset??[0,0];for(let d=0;d<i.count;d+=1){const u=n.getX(d),h=n.getY(d),g=n.getZ(d);let p,m,f,w;Math.abs(u)>.5?(p=r,m=a,[f,w]=u>0?[.19,.31]:[.61,.07]):Math.abs(h)>.5?(p=e,m=r,[f,w]=h>0?[.29,.43]:[.73,.17]):(p=e,m=a,[f,w]=g>0?[0,0]:[.47,.59]);const v=Math.max(p,m);i.setXY(d,i.getX(d)*(p/v)+o+f,i.getY(d)*(m/v)+A+w)}i.needsUpdate=!0,s.translate(...t.center),s.userData.componentCount=1;const l=new L({name:`${t.name}-material`,color:16777215,map:t.surface.albedoMap,normalMap:t.surface.normalMap,normalScale:new Ve(t.normalScale,t.normalScale),roughnessMap:t.surface.roughnessMap,roughness:1,metalness:t.surfaceKind==="roof"?.05:0,flatShading:!1});l.userData.surfaceProfile=os,l.userData.surfaceKind=t.surfaceKind;const c=new I(s,l);return c.name=t.name,c.castShadow=t.castShadow??!0,c.receiveShadow=t.receiveShadow??!0,c}function P0(t){return[vs({name:"north-star-city-north-apartment-shell",center:[255,78,645],size:[244,152,140],surface:t.concrete,surfaceKind:"concrete",normalScale:.34,uvOffset:[.07,.12]}),vs({name:"north-star-city-north-apartment-roof",center:[268,161,646],size:[210,18,136],surface:t.roof,surfaceKind:"roof",normalScale:.46,uvOffset:[.03,.06]}),vs({name:"north-star-city-south-clinic-shell",center:[265,57,1155],size:[224,110,126],surface:t.concrete,surfaceKind:"concrete",normalScale:.31,uvOffset:[.41,.23]}),vs({name:"north-star-city-south-clinic-roof",center:[265,116,1155],size:[232,10,132],surface:t.roof,surfaceKind:"roof",normalScale:.43,uvOffset:[.36,.47]})]}function E0(t,e,a){t.addBox({center:[430,2.5,778],size:[820,4,76],color:10266788}),t.addBox({center:[430,2.5,1030],size:[820,4,72],color:10989220}),t.addBox({center:[72,2.1,900],size:[66,3.2,330],color:9608344}),t.addBox({center:[430,3.2,816],size:[820,5.2,7],color:12895671}),t.addBox({center:[430,3.2,994],size:[820,5.2,7],color:13027257});for(let s=104;s<=760;s+=64)a.addBox({center:[s,4.56,778],size:[1.1,.24,67],color:s%128===40?8160897:8884620}),a.addBox({center:[s+27,4.56,1030],size:[1,.24,63],color:s%192===40?8489862:9279120});for(let s=112;s<=752;s+=22)s>390&&s<520||(e.addBox({center:[s,4.7,796],size:[13.5,.28,5.5],color:s%44===24?12691798:12166744}),e.addBox({center:[s+9,4.7,1012],size:[13.5,.28,5.5],color:s%66===46?12034394:12626785}));for(let s=95;s<=795;s+=78)e.addBox({center:[s,1.35,904],size:[42,.65,4.6],color:s%156===17?13154147:14078902});for(let s=560;s<=656;s+=16)for(let i=0;i<3;i+=1)e.addBox({center:[s,1.42,853+i*51],size:[8.5,.7,38],color:(s/16+i)%3===0?11844785:12699064});e.addBox({center:[542,1.4,904],size:[4.5,.65,140],color:12567477}),e.addBox({center:[674,1.4,904],size:[4.5,.65,140],color:12567477}),[[[115,876],[168,865],[205,881],[249,872]],[[301,955],[337,943],[358,922],[390,914]],[[421,853],[444,869],[467,866],[490,883]],[[706,947],[739,931],[779,936],[811,920]],[[180,1010],[205,1001],[232,1008]]].forEach((s,i)=>{for(let n=0;n<s.length-1;n+=1){const o=s[n],A=s[n+1];o!==void 0&&A!==void 0&&mr(a,o,A,1.3,i%2===0?2.4:1.7,4148555)}});for(let s=0;s<44;s+=1){const i=Xa(s,314,27),n=92+ae(i)*720,o=828+ae(i,10)*150;a.addBox({center:[n,1.42,o],size:[2.2+ae(i,20)*7,.55,1.3+ae(i,5)*3.5],rotation:[0,ae(i,15)*Math.PI,0],color:s%5===0?10328709:5924964})}}function C0(t,e,a,r,s,i){t.addBox({center:[141,118,647],size:[18,82,136],color:12630438});for(let n=0;n<4;n+=1){const o=45+n*31;for(let A=0;A<5;A+=1){const l=168+A*43;e.addBox({center:[l,o,716.15],size:[39,27,2.2],color:(n+A)%3===0?13157811:11185837}),a.addBox({center:[l,o+2,717.6],size:[24,14.5,1.5],color:(n+A)%4===0?9419715:6064531}),e.addBox({center:[l,o-7.2,718.2],size:[27.5,2.2,2.5],color:14143672})}}for(let n=0;n<3;n+=1){const o=60+n*31;t.addBox({center:[255,o,727],size:[222,4.2,22],color:10922658}),r.addBox({center:[255,o+11,736.7],size:[222,2.1,2.1],color:6913147});for(let A=0;A<=22;A+=1)r.addBox({center:[145+A*10,o+6.3,736.7],size:[1.45,11,1.45],color:A%5===0?9148822:6649461})}a.addBox({center:[215,20,717.8],size:[72,30,2],color:5209991}),e.addBox({center:[302,20,717.7],size:[84,30,2.2],color:8227206});for(let n=0;n<9;n+=1)r.addBox({center:[264+n*10,20,719],size:[1.2,29,1.3],color:10922658});s.addBox({center:[248,38,730],size:[194,5.5,28],rotation:[-.08,0,0],color:6268576}),s.addBox({center:[176,43,746],size:[42,20,3],color:14730859}),s.addBox({center:[176,43,748],size:[31,3,1.1],color:4353130});for(const n of[153,244,352])r.addBox({center:[n,85,739],size:[3.4,134,3.4],color:7240824});for(let n=0;n<5;n+=1)r.addBox({center:[164+n*44,75+n%2*31,741],size:[18,12,7],color:10200223}),r.addBox({center:[164+n*44,75+n%2*31,745],size:[11,6,1],color:6649715});qa(i,141,708,42,32,38,401),qa(i,354,718,30,24,31,409),gn(i,151,717.5,32,136,14,421),gn(i,350,717.7,54,126,18,427)}function M0(t,e,a,r,s){t.addBox({center:[265,61,1219.2],size:[215,100,2.5],color:12828073});for(let i=0;i<11;i+=1)t.addBox({center:[166+i*20,53+i%2*2,1220.8],size:[17,5.5,1.2],color:i%3===0?7315347:9088931});for(let i=0;i<4;i+=1){const n=178+i*58;e.addBox({center:[n,79,1220.7],size:[31,23,2],color:i===2?9682881:6589588}),a.addBox({center:[n,79,1222.1],size:[34,2,2.5],color:7241596})}e.addBox({center:[216,29,1220.9],size:[92,42,2],color:5406598}),a.addBox({center:[310,28,1221.2],size:[67,42,2.4],color:8687757});for(let i=0;i<7;i+=1)a.addBox({center:[281+i*10,28,1222.7],size:[1.2,40,1.1],color:11580072});r.addBox({center:[260,50,1225],size:[212,5,16],rotation:[-.1,0,0],color:13606754}),r.addBox({center:[343,63,1222.7],size:[36,28,3.2],color:6266016}),r.addBox({center:[343,63,1224.7],size:[24,3,1],color:13885384});for(let i=0;i<5;i+=1)a.addBox({center:[174+i*42,7,1223.1],size:[30,10,1.5],color:i%2===0?10118477:8222309});for(let i=0;i<7;i+=1){const n=Xa(i,571,33);a.addBox({center:[179+i*28,124,1122+i%2*33],size:[23,2.5,27],rotation:[.1,(ae(n)-.5)*.08,0],color:i%3===0?4287862:5602691}),a.addBox({center:[179+i*28,122.2,1122+i%2*33],size:[2,6,31],color:6715249})}qa(s,163,1207,28,12,29,577),qa(s,362,1202,30,15,34,581)}function S0(t,e,a,r,s){t.addBox({center:[480,171,625],size:[470,17,58],color:9213586}),t.addBox({center:[468,159,625],size:[446,9,38],color:6912374});for(const i of[608,642]){e.addBox({center:[474,183,i],size:[454,3,3.4],color:7702406});for(let n=275;n<=689;n+=23)t.addBox({center:[n,180.2,i],size:[5,2.3,48],color:7832704})}a.addBox({center:[342,91,648],size:[25,158,36],color:9608088}),a.addBox({center:[418,91,737],size:[24,148,32],color:9147792,rotation:[.55,0,0]}),r.addBox({center:[490,201,623],size:[282,4,83],rotation:[0,0,-.03],color:8960181});for(let i=363;i<=620;i+=43)e.addBox({center:[i,190,625],size:[3.2,24,71],color:6387572});t.addBox({center:[706,170,625],size:[13,15,58],color:7305074,rotation:[0,0,.17]});for(let i=0;i<9;i+=1)e.addBox({center:[716+i*3.4,170+i%3*3,606+i%2*34],size:[18,1.3,1.3],rotation:[0,i%2*.1,(i-4)*.035],color:9139037});qa(s,341,681,24,28,38,607),gn(s,418,734,38,126,12,613)}function I0(t,e,a,r,s){t.addBox({center:[361,8,831],size:[80,14,80],color:8884622}),D0(r,[327,395,797,865],15.4,6927793);for(const i of[328,394])t.addBox({center:[i,18,831],size:[7,22,79],color:11580330});for(const i of[798,864])t.addBox({center:[361,18,i],size:[79,22,7],color:11580330});e.addBox({center:[420,42,739],size:[45,70,36],color:7248275}),e.addBox({center:[420,78,739],size:[49,4,40],color:10138536}),a.addBox({center:[420,49,720.5],size:[24,13,2],color:9224381}),e.addBox({center:[398,56,759],size:[4,45,4],color:7043444}),mr(e,[398,759],[376,792],35,4,7043444);for(let i=0;i<18;i+=1){const n=Xa(i,641,17),o=ae(n)*Math.PI*2,A=30+ae(n,10)*16;s.addBox({center:[361+Math.cos(o)*A,17+ae(n,20)*5,831+Math.sin(o)*A],size:[3+ae(n,5)*4,8+ae(n,15)*8,3+ae(n,7)*4],rotation:[.1,o,(ae(n,12)-.5)*.35],color:i%4===0?8826456:5016923})}}function Q0(t,e,a,r){const s=Ae.x,i=Ae.y;for(const n of[s-35,s+35])t.addBox({center:[n,34,i],size:[5,66,5],color:6715510});e.addBox({center:[s,57,i],size:[84,45,7],color:5336173}),a.addBox({center:[s,58,i+4],size:[73,34,2],color:7645608}),e.addBox({center:[s,57,i+5.3],size:[58,2.2,1],color:14276540}),e.addBox({center:[s-16,49,i+5.4],size:[25,2,1],color:13026734}),e.addBox({center:[s+18,65,i+5.4],size:[20,2,1],color:13026734}),r.addBox({center:[s,78,i+1],size:[45,4,5],color:16764790}),t.addBox({center:[s-24,42,i+5.6],size:[13,10,1.4],color:13936728})}function k0(t,e,a,r){for(const s of[760,1040])t.addBox({center:[470,34,s],size:[4,63,4],color:5860714}),t.addBox({center:[470,67,s],size:[20,5,9],rotation:[0,0,-.12],color:7770251}),r.addBox({center:[476,65,s+.5],size:[9,3.5,7],color:16765309});for(let s=0;s<4;s+=1){const i=1120+s*22;e.addBox({center:[442.5,5,i],size:[70,8,14],color:8481357});for(let n=0;n<7;n+=1){const o=Xa(s,n,701);a.addBox({center:[413+n*9.7,12+ae(o)*3,i],size:[5+ae(o,10)*3,12+ae(o,20)*6,5+ae(o,5)*3],rotation:[0,ae(o,15)*Math.PI,(ae(o,8)-.5)*.3],color:n%3===0?9352535:5216087})}}mr(e,[403,1100],[481,1100],3.4,5,7507079),mr(e,[403,1100],[403,1195],3.4,5,7507079),mr(t,[170,1222],[350,1222],91,1.5,7175287);for(let s=0;s<6;s+=1)e.addBox({center:[188+s*28,82-s%2*3,1224],size:[18,17+s%3*4,1.2],rotation:[0,0,(s%2===0?-1:1)*.045],color:[14993007,7317410,14274738][s%3]??14274738});for(let s=0;s<14;s+=1){const i=Xa(s,719,41);a.addBox({center:[412+ae(i)*60,20+ae(i,10)*5,1116+ae(i,20)*76],size:[3.2,5.5,3.2],rotation:[0,ae(i,6)*Math.PI,0],color:[14857822,12152696,7911854][s%3]??14857822})}t.addBox({center:[568,31,814],size:[82,58,38],color:6454393}),e.addBox({center:[568,35,833.6],size:[68,39,2],color:9415072});for(let s=0;s<8;s+=1)t.addBox({center:[540+s*8,34,835.2],size:[2.1,30,2.2],color:s%3===0?10250318:5466470});r.addBox({center:[593,47,835.6],size:[8,4,1.5],color:16762988}),e.addBox({center:[527,10,791],size:[30,18,24],color:10122837}),mr(t,[526,801],[542,833],7,3.2,5203555);for(let s=0;s<4;s+=1)e.addBox({center:[397+s*14,9+s%2*9,1204],size:[13,17,16],color:s%2===0?11570523:7441798})}function qa(t,e,a,r,s,i,n){for(let o=0;o<i;o+=1){const A=Xa(o,n,19),l=e+(ae(A)*2-1)*r,c=a+(ae(A,10)*2-1)*s,d=7+ae(A,20)*17;t.addBox({center:[l,d/2+2.2,c],size:[3.5+ae(A,5)*6,d,3.5+ae(A,15)*6],rotation:[.08,ae(A,8)*Math.PI,(ae(A,17)-.5)*.42],color:[4162388,6068308,7907671,5011024][o%4]??5011024})}}function gn(t,e,a,r,s,i,n){for(let o=0;o<i;o+=1){const A=Xa(o,n,23),l=e+(ae(A)-.5)*r,c=8+ae(A,10)*s;t.addBox({center:[l,c,a],size:[3+ae(A,20)*5,9+ae(A,6)*13,2.8],rotation:[0,0,(ae(A,16)-.5)*.55],color:o%3===0?8628566:4685136})}}function Pt(t,e){const a=t.build();a.name=`${e.name}-geometry`;const r={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1},s=e.physical?new he({...r,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new L(r),i=new I(a,s);return i.name=e.name,i.castShadow=e.castShadow??!1,i.receiveShadow=e.receiveShadow??!1,i}function T0(t){let e=0,a=0,r=0,s=0;return t.traverse(i=>{if(!(i instanceof I))return;e+=1,r+=1;const n=i.geometry.getAttribute("position");a+=i.geometry.index===null?n.count/3:(i.geometry.index?.count??0)/3;const o=i.geometry.userData.componentCount;typeof o=="number"&&(s+=o)}),{drawCalls:e,triangles:a,geometries:r,components:s}}function R0(){const t=new U,e=new U,a=new U,r=new U,s=new U,i=new U,n=new U,o=new U,A=new U,l=new U,c=new U,d=new U,u=new R;u.name="north-star-city-art-slice",E0(t,e,d),C0(a,r,s,i,o,A),M0(r,s,i,o,A),S0(n,i,a,s,A),I0(a,i,s,c,A),Q0(i,o,s,l),k0(i,o,A,l),qa(A,96,822,38,52,44,733),qa(A,775,1015,48,38,38,739);const h=co(),g=B0(h.asphalt),p=P0(h),m=[Pt(t,{name:"north-star-city-curbs-and-sidewalks",roughness:.9,receiveShadow:!0}),Pt(e,{name:"north-star-city-road-markings",roughness:.78,receiveShadow:!0}),Pt(a,{name:"north-star-city-structural-concrete",roughness:.82,castShadow:!0,receiveShadow:!0}),Pt(r,{name:"north-star-city-layered-facades",roughness:.72,castShadow:!0,receiveShadow:!0}),Pt(s,{name:"north-star-city-glass",roughness:.2,metalness:.08,transparent:!0,opacity:.82,physical:!0,clearcoat:.48,clearcoatRoughness:.16}),Pt(i,{name:"north-star-city-metal-infrastructure",roughness:.47,metalness:.58,castShadow:!0,receiveShadow:!0}),Pt(n,{name:"north-star-city-elevated-station",roughness:.68,metalness:.28,castShadow:!0,receiveShadow:!0}),Pt(o,{name:"north-star-city-signs-and-life",roughness:.61,castShadow:!0,receiveShadow:!0}),Pt(A,{name:"north-star-city-causal-foliage",roughness:.86,castShadow:!0,receiveShadow:!0}),Pt(l,{name:"north-star-city-working-lights",roughness:.24,emissive:10114079,emissiveIntensity:1.35,physical:!0,clearcoat:.35,clearcoatRoughness:.18}),Pt(c,{name:"north-star-city-shallow-water",roughness:.13,metalness:.04,transparent:!0,opacity:.78,physical:!0,clearcoat:.86,clearcoatRoughness:.08,receiveShadow:!0}),Pt(d,{name:"north-star-city-cracks-and-aggregate",roughness:.96,receiveShadow:!0})],f=new R;f.name="north-star-city-ground",f.add(g,m[0],m[1],m[10],m[11]),u.add(f,...p,...m.slice(2,10));const w=new R;w.name="north-star-contract-kiosk-anchor",w.position.set(Ae.x,0,Ae.y),w.userData.interactionPoint={x:Ae.x,y:Ae.y},u.add(w);const v=T0(u);u.userData.environmentKind="overgrown-modern-city",u.userData.oldUseSignals=[...y0],u.userData.causalGrowthZones=x0.map(P=>({...P,bounds:{...P.bounds}})),u.userData.lifeSignals=[...b0],u.userData.surfaceProfile=h.provenance.profile,u.userData.surfaceProvenance=h.provenance,u.userData.metrics=v,u.userData.replacedTerrainIds=[...fA],u.userData.replacedPropIds=[...pA],u.userData.contractBoardPosition={x:Ae.x,y:Ae.y},u.userData.spawnPosition={x:430,y:900},u.userData.playerCorridor={centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70},u.userData.nonBlockingOverheadBounds={minimumX:245,maximumX:715,minimumZ:596,maximumZ:654,minimumY:150};let y=!1;return{group:u,ground:f,replacedTerrainIds:fA,replacedPropIds:pA,dispose(){y||(y=!0,u.removeFromParent(),u.traverse(P=>{P instanceof I&&(P.geometry.dispose(),Array.isArray(P.material)?P.material.forEach(b=>b.dispose()):P.material.dispose())}),h.dispose(),f.clear(),u.clear())}}}const z0="1.0.0",L0="concept-c-beauty-cell-r02",F0=1128416002,Lt=Object.freeze({schemaVersion:z0,stableId:L0,seed:F0,deterministic:!0,environmentKind:"optimistic-reclaimed-modern-city",worldBounds:Object.freeze({minimumX:-70,maximumX:930,minimumZ:470,maximumZ:1320}),spawn:Object.freeze({x:430,z:900}),clearPlayerCorridor:Object.freeze({centerZ:900,minimumX:390,maximumX:820,clearHalfWidth:70}),composition:Object.freeze({cameraIntent:"fixed-diagonal-hd2d",foreground:Object.freeze(["leaf-framed-lower-edge","rain-dark-stair-threshold","bright-maintained-planters"]),middleGround:Object.freeze(["playable-wet-intersection","human-scale-transit-shelter","field-workbench-and-contract-kiosk"]),background:Object.freeze(["water-reclaim-basin","broken-concrete-city-frame","physically-present-anomaly"]),focalHierarchy:Object.freeze(["player-and-companion","sunlit-crosswalk","working-amber-technology","distant-cyan-anomaly"])}),materialGrammar:Object.freeze({wetAsphalt:Object.freeze(["fine-aggregate-normal","irregular-puddle-clearcoat","worn-paint-not-clean-stripes"]),reclaimedConcrete:Object.freeze(["mineral-bloom","repair-seams","runoff-fed-moss"]),vegetation:Object.freeze(["highest-density-at-water-and-drains","low-density-in-maintained-route","warm-flower-accents-near-human-work"]),technology:Object.freeze(["dark-ceramic-and-brushed-metal","cyan-data-light","amber-life-light"])}),modules:Object.freeze([Object.freeze({stableId:"cbc-route-reclaimed-intersection",role:"route",anchor:Object.freeze({x:430,y:.7,z:900}),bounds:Object.freeze({minimumX:40,maximumX:860,minimumZ:570,maximumZ:1250}),authoredCues:Object.freeze(["offset-crosswalk","tactile-paving","drainage-cuts","wet-wheel-tracks"]),causalRule:"Active foot traffic keeps the east route open while failed drains retain shallow rainwater.",gameplayPromise:"A readable combat lane with occluding detail kept outside the player corridor."}),Object.freeze({stableId:"cbc-threshold-rain-stairs",role:"threshold",anchor:Object.freeze({x:250,y:1,z:1035}),bounds:Object.freeze({minimumX:145,maximumX:340,minimumZ:960,maximumZ:1160}),authoredCues:Object.freeze(["broad-lower-left-stairs","broken-retaining-wall","mossed-handrail"]),causalRule:"A retaining wall diverts runoff down the stairs, darkening the treads and feeding edge moss.",gameplayPromise:"A strong foreground threshold and future vertical-route affordance."}),Object.freeze({stableId:"cbc-shelter-transit-04",role:"shelter",anchor:Object.freeze({x:294,y:1,z:718}),bounds:Object.freeze({minimumX:205,maximumX:380,minimumZ:650,maximumZ:780}),authoredCues:Object.freeze(["laminated-glass-panels","patched-solar-roof","working-route-display"]),causalRule:"The roof still catches rain and solar power, so survivors maintain the light and water filter beneath it.",gameplayPromise:"A safe readable waypoint that later supports rest, rumor, and companion meetings."}),Object.freeze({stableId:"cbc-water-spillway",role:"water",anchor:Object.freeze({x:132,y:.4,z:700}),bounds:Object.freeze({minimumX:-45,maximumX:245,minimumZ:555,maximumZ:815}),authoredCues:Object.freeze(["shallow-clear-basin","concrete-spillway","reed-density-gradient"]),causalRule:"A cracked utility main continuously replenishes the lowest basin and determines the reed line.",gameplayPromise:"A cool reflective counterweight and a future resource/risk pocket."}),Object.freeze({stableId:"cbc-work-relic-bench",role:"work",anchor:Object.freeze({x:620,y:1,z:836}),bounds:Object.freeze({minimumX:555,maximumX:705,minimumZ:765,maximumZ:920}),authoredCues:Object.freeze(["field-tool-silhouettes","cable-spool","amber-analysis-lamp"]),causalRule:"The bench sits on a dry raised apron close to the route and draws power from salvaged transit cells.",gameplayPromise:"An obvious future interaction point for analysis, assembly, and limited-use skills."}),Object.freeze({stableId:"cbc-habitat-drain-gardens",role:"habitat",anchor:Object.freeze({x:635,y:1,z:1020}),bounds:Object.freeze({minimumX:520,maximumX:785,minimumZ:965,maximumZ:1205}),authoredCues:Object.freeze(["repaired-planter-frames","edible-leaf-grid","small-warm-flowers"]),causalRule:"Planters intercept road runoff but remain trimmed along the maintained east route.",gameplayPromise:"Visible human optimism and a later food/crafting loop without a quest marker."}),Object.freeze({stableId:"cbc-landmark-real-anomaly",role:"landmark",anchor:Object.freeze({x:575,y:50,z:565}),bounds:Object.freeze({minimumX:510,maximumX:645,minimumZ:505,maximumZ:625}),authoredCues:Object.freeze(["broken-conductor-ring","suspended-relic-shards","cyan-field-core"]),causalRule:"A fractured superconducting service ring traps an intermittent field between its surviving segments.",gameplayPromise:"A real world-space destination rather than a flat backdrop or decorative billboard."})]),generationProvenance:Object.freeze({source:"runtime-procedural-geometry",externalAssets:!1,referenceImageUsedAtRuntime:!1,generator:"beauty-cell-composition-grammar",generatorVersion:"1.0.0",laws:Object.freeze(["water-follows-low-points-and-broken-infrastructure","plant-density-follows-water-light-and-human-maintenance","repair-signals-cluster-near-safe-travel-and-dry-work-surfaces","detail-density-may-frame-but-never-obscure-the-player-corridor","technology-emission-is-limited-to-functional-data-or-life-signals"])})}),mA=new Set(["town-hall","town-well","south-house","town-board-collider","town-hall-workyard-collider","town-repair-bench-collider","town-south-lamp-collider","town-kitchen-garden-collider","town-south-crates-collider"]),gA=new Set(["town-contract-board","town-lamp-a","town-lamp-b"]),oa={concrete:[11449506,9477004,12697255,8096128],concreteDark:[6714734,5793888,7635064],roadPaint:[14210493,13093043,14801336],foliage:[2056254,3110726,5016912,7118680,9218914],foliageShadow:[1522994,2118458,3235646],rust:[9393463,11102527,7227192],flower:[16755300,16022376,14992746]};function Vt(t,e,a=0){return(Math.imul(Math.trunc(t)+99,73856093)^Math.imul(Math.trunc(e)+169,19349663)^Math.imul(Math.trunc(a)+257,83492791))>>>0}function se(t,e=0){return(t>>>e&1023)/1023}function Aa(t,e){return t[e%t.length]??t[0]??16777215}function fr(t,e,a,r){const[s,i,n,o]=e;t.addQuad({corners:[[s,a,n],[s,a,o],[i,a,o],[i,a,n]],color:r})}function wA(t,e,a,r,s,i){const n=a[0]-e[0],o=a[1]-e[1],A=Math.hypot(n,o);t.addBox({center:[(e[0]+a[0])/2,r,(e[1]+a[1])/2],size:[A,Math.max(.35,s*.12),s],rotation:[0,-Math.atan2(o,n),0],color:i})}function O0(t,e,a,r,s){fr(t,[25,875,555,690],1.08,6649455),fr(t,[25,875,1100,1270],1.08,6846828),fr(t,[32,155,690,1100],1.05,6255721),fr(t,[735,875,690,1100],1.05,6320489),t.addBox({center:[450,4,695],size:[850,8,12],color:8885386}),t.addBox({center:[450,4,1096],size:[850,8,12],color:8293761}),t.addBox({center:[159,4,895],size:[12,8,400],color:9740433}),t.addBox({center:[731,4,895],size:[12,8,400],color:9017739}),fr(e,[160,730,690,1100],.96,398867);for(let n=0;n<9;n+=1){const o=Vt(n,823,7),A=304+n*24,l=74+se(o,8)*25;a.addBox({center:[A,1.52,914+n%2*2.5],size:[13+se(o,16)*4,.65,l],rotation:[0,(se(o,22)-.5)*.035,0],color:Aa(oa.roadPaint,o),shade:n===3||n===7?.42:.57})}for(let n=0;n<12;n+=1){const o=Vt(n,313,19);a.addBox({center:[190+n*12.5,1.55,972],size:[8.5,.75,13],color:n%4===0?11830590:13673543,shade:.9+se(o,10)*.12})}const i=[[225,835,76,31,-.08],[538,775,118,24,.1],[610,1015,84,34,-.16],[370,1063,110,20,.05],[685,905,62,20,.18]];for(const[n,o,A,l,c]of i)r.addBox({center:[n,1.7,o],size:[A,.18,l],rotation:[0,c,0],color:o>950?5212802:6133392});for(let n=0;n<118;n+=1){const o=Vt(n,557,41),A=n<62,l=45+se(o,2)*805,c=A?605+se(o,12)*145:1045+se(o,12)*185;s.addBox({center:[l,2.1+se(o,21)*1.8,c],size:[3+se(o,5)*12,1.1+se(o,17)*2.4,3+se(o,25)*9],rotation:[(se(o,7)-.5)*.25,se(o,14)*Math.PI,(se(o,23)-.5)*.2],color:Aa(oa.concreteDark,o)})}}function U0(t,e,a){for(let r=0;r<11;r+=1)t.addBox({center:[245,4.5+r*2.8,1102-r*13],size:[172-r*1.8,9+r*5.6,14],color:Aa(oa.concrete,Vt(r,701))}),r%2===0&&a.addBox({center:[180+r%3*26,10+r*5.5,1095-r*13],size:[26,1.4,6],rotation:[0,(r-4)*.08,0],color:Aa(oa.foliageShadow,Vt(r,719))});t.addBox({center:[151,31,1025],size:[17,62,220],color:6913139}),t.addBox({center:[340,27,1050],size:[26,54,185],color:9476750});for(const r of[170,319])e.addBox({center:[r,45,1035],size:[3.2,74,3.2],color:4281937}),e.addBox({center:[r,78,1028],size:[3.2,3.2,165],rotation:[-.18,0,0],color:5794660})}function N0(t,e,a,r){t.addBox({center:[294,4,718],size:[182,8,106],color:10398105}),t.addBox({center:[294,7,776],size:[184,14,12],color:8227971});for(const s of[220,276,348])e.addBox({center:[s,51,704],size:[5,92,5],color:3887952});e.addBox({center:[294,92,676],size:[142,4,5],color:4217173}),e.addBox({center:[294,92,732],size:[142,4,5],color:4217173}),e.addBox({center:[225,92,704],size:[5,4,58],color:5400160}),e.addBox({center:[363,92,704],size:[5,4,58],color:5400160}),a.addBox({center:[248,53,707],size:[50,75,2.6],color:8893869}),a.addBox({center:[322,53,707],size:[70,75,2.6],color:7973539}),a.addBox({center:[210,53,733],size:[2.6,75,48],color:7578268}),e.addBox({center:[284,21,737],size:[104,8,24],color:7037522}),e.addBox({center:[371,63,700],size:[10,70,8],color:3427657}),r.addBox({center:[371,76,694],size:[7,21,1.2],color:6088396}),r.addBox({center:[371,55,694],size:[7,9,1.2],color:16757854})}function H0(t,e,a,r){t.addBox({center:[568,5,815],size:[118,10,82],color:8885386}),e.addBox({center:[585,34,823],size:[102,8,42],color:6050116});for(const n of[542,628])e.addBox({center:[n,18,823],size:[6,30,6],color:3820104});e.addBox({center:[612,53,810],size:[38,31,9],color:3032387}),a.addBox({center:[612,55,804.8],size:[30,19,1.5],color:6004633}),r.addBox({center:[612,55,803.8],size:[24,2,.7],color:6088396}),r.addBox({center:[585,43,812],size:[5,5,5],color:16757854}),wA(e,[548,845],[585,868],3.2,2.2,2505274),wA(e,[585,868],[636,850],3.2,2.2,3427145);for(let n=0;n<8;n+=1){const o=Vt(n,991);e.addBox({center:[542+n*11,42+n%2*3,818],size:[3+se(o,4)*5,12+se(o,16)*9,3],rotation:[0,0,(se(o,23)-.5)*.4],color:Aa(oa.rust,o)})}const s=Ae.x,i=Ae.y;t.addBox({center:[s,4,i],size:[92,8,28],color:8951436});for(const n of[s-38,s+38])e.addBox({center:[n,36,i],size:[6,62,7],color:3361092});e.addBox({center:[s,63,i],size:[90,8,9],color:4413781}),a.addBox({center:[s,43,i-4.7],size:[72,31,2],color:3497563}),r.addBox({center:[s-15,48,i-5.9],size:[34,2.2,.7],color:6088396}),r.addBox({center:[s+26,36,i-5.9],size:[12,12,.7],color:16757854})}function _0(t,e,a,r){for(let s=0;s<5;s+=1){const i=520+s%3*86,n=1042+Math.floor(s/3)*76;t.addBox({center:[i,10,n],size:[68,20,48],color:s%2===0?9279883:7833725}),e.addBox({center:[i,20,n],size:[72,3,52],color:6054999}),t.addBox({center:[i,21.7,n],size:[59,2.2,39],color:3492411});for(let o=0;o<15;o+=1){const A=Vt(s,o,1129);uo(a,r,i-24+o%5*12+(se(A,4)-.5)*5,n-13+Math.floor(o/5)*13,.72+se(A,15)*.5,A,23,o%5===0)}}}function G0(t,e,a,r,s,i){t.addBox({center:[361,5,831],size:[84,10,84],color:7900292});for(const[o,A,l,c]of[[361,791,84,6],[361,871,84,6],[321,831,6,84],[401,831,6,84]])t.addBox({center:[o,18,A],size:[l,26,c],color:6913141});a.addBox({center:[361,12.4,831],size:[70,1.2,70],color:5214602}),e.addBox({center:[361,31,831],size:[66,4,4],color:4282452}),e.addBox({center:[394,33,831],size:[4,36,58],color:3361608}),i.addBox({center:[394,48,803],size:[3,10,2],color:6088396}),t.addBox({center:[430,3,739],size:[102,6,66],color:8359301});for(const o of[386,474])e.addBox({center:[o,24,739],size:[5,42,58],color:3427401});e.addBox({center:[430,44,739],size:[92,5,60],color:5464925});for(let o=0;o<7;o+=1)e.addBox({center:[399+o*10,22+o%2*5,722],size:[5,23+o%3*5,5],rotation:[0,0,(o-3)*.035],color:Aa(oa.rust,Vt(o,1423))});t.addBox({center:[470,4,1041],size:[20,8,24],color:7701885}),e.addBox({center:[470,42,1041],size:[5,76,5],color:3230023}),e.addBox({center:[480,76,1041],size:[23,4,4],color:4414294}),i.addBox({center:[491,73,1041],size:[4,12,7],color:16757854}),t.addBox({center:[442.5,9,1155],size:[77,18,92],color:7438712}),t.addBox({center:[442.5,19,1155],size:[66,3,80],color:3163706});for(let o=0;o<18;o+=1){const A=Vt(o,1551,Lt.seed);uo(r,s,416+o%6*10.5,1125+Math.floor(o/6)*29,.58+se(A,13)*.32,A,20,o%7===0)}[[398,18,1201,24,34,26],[427,14,1201,28,27,26],[411,12,1226,32,23,22]].forEach(([o,A,l,c,d,u],h)=>{e.addBox({center:[o,A,l],size:[c,d,u],rotation:[0,(h-1)*.08,0],color:h===1?5662045:7755585}),e.addBox({center:[o,A+d*.18,l-u*.51],size:[c*.72,3,2],color:10840893})})}const X0=[["town-hall",130,570,250,150],["town-well",320,790,82,82],["south-house",150,1090,230,130],["town-board-collider",454,940,92,20],["town-hall-workyard-collider",380,707,100,64],["town-repair-bench-collider",510,777,115,76],["town-south-lamp-collider",460,1030,20,23],["town-kitchen-garden-collider",405,1110,75,90],["town-south-crates-collider",385,1186,61,53]];function q0(){const t=new R;return t.name="beauty-cell-collider-visual-anchors",X0.forEach(([e,a,r,s,i])=>{const n=new ia;n.name=`beauty-cell-collider-visual-${e}`,n.position.set(a+s/2,0,r+i/2),n.userData.bounds={x:a,y:r,width:s,height:i},t.add(n)}),t}function uo(t,e,a,r,s,i,n=1.5,o=!1){const A=(12+se(i,3)*23)*s;t.addBox({center:[a,n+A*.5,r],size:[1.2*s,A,1.2*s],rotation:[(se(i,9)-.5)*.14,0,(se(i,19)-.5)*.18],color:Aa(oa.foliageShadow,i)});for(let l=0;l<6;l+=1){const c=se(i^Math.imul(l+1,73244475),4)*Math.PI*2,d=n+A*(.28+l*.17),u=(4.2+se(i,l*5)*5.2)*s;t.addBox({center:[a+Math.cos(c)*u*.48,d,r+Math.sin(c)*u*.48],size:[u*1.62,2.4+s*1.6,u*.62],rotation:[0,-c,(se(i,l*7+2)-.5)*.35],color:Aa(oa.foliage,i+l)})}o&&e.addBox({center:[a,n+A+1.3,r],size:[4.5*s,2.6*s,4.5*s],rotation:[0,se(i,11)*Math.PI,0],color:Aa(oa.flower,i)})}function Y0(t,e){[{count:120,minX:-20,maxX:235,minZ:555,maxZ:835,wet:!0},{count:92,minX:40,maxX:355,minZ:965,maxZ:1250,wet:!0},{count:116,minX:550,maxX:880,minZ:1025,maxZ:1285,wet:!1},{count:95,minX:50,maxX:880,minZ:520,maxZ:665,wet:!1}].forEach((r,s)=>{for(let i=0;i<r.count;i+=1){const n=Vt(i,s,Lt.seed),o=r.minX+se(n,2)*(r.maxX-r.minX),A=r.minZ+se(n,13)*(r.maxZ-r.minZ);o>365&&o<825&&Math.abs(A-900)<82||uo(t,e,o,A,(r.wet?.9:.68)+se(n,22)*.9,n,1.5,i%(r.wet?17:23)===0)}})}function j0(t,e,a){fr(a,[-45,235,558,808],1.9,5081476),t.addBox({center:[96,-1,557],size:[286,17,14],color:7439741}),t.addBox({center:[96,-1,810],size:[286,17,14],color:6650482}),t.addBox({center:[-43,0,683],size:[14,18,240],color:7242362}),t.addBox({center:[238,0,683],size:[14,18,240],color:8360070});for(let r=0;r<9;r+=1)e.addBox({center:[-4+r*27,4,790+r%2*3],size:[18,3,24],color:r%3===0?9263420:5399389})}function W0(t,e,a,r){t.addBox({center:[150,64,540],size:[185,128,82],color:8885131}),t.addBox({center:[84,122,548],size:[55,116,74],color:7110006}),e.addBox({center:[161,69,582],size:[148,90,5],color:10263171}),t.addBox({center:[730,71,622],size:[170,142,92],color:7635837}),e.addBox({center:[720,72,670],size:[142,105,5],color:10066824}),t.addBox({center:[790,133,620],size:[46,118,86],color:6123627});for(const s of[{baseX:104,z:585,columns:4,rows:3},{baseX:665,z:674,columns:4,rows:4}])for(let i=0;i<s.rows;i+=1)for(let n=0;n<s.columns;n+=1){if((i*7+n*3)%9===4)continue;const A=s.baseX+n*32,l=42+i*28;r.addBox({center:[A,l,s.z-2],size:[26,3,3],color:4281937}),a.addBox({center:[A,l-10,s.z-2.5],size:[23,18,2],color:5602936})}for(let s=0;s<8;s+=1)r.addBox({center:[60+s*24,137+s%3*2,540],size:[19,3,56],rotation:[0,(s-4)*.035,0],color:s%3===0?8869951:5465182})}function V0(){const t=new R;t.name="beauty-cell-world-space-anomaly",t.position.set(575,50,565),t.rotation.y=Math.PI/4,t.userData.moduleId="cbc-landmark-real-anomaly";const e=new L({name:"beauty-cell-anomaly-ring-material",color:2379600,metalness:.74,roughness:.24,emissive:683881,emissiveIntensity:2.2});for(let s=0;s<4;s+=1){const i=new I(new _a(27,2.3,8,28,Math.PI*.37),e);i.name=`beauty-cell-anomaly-ring-${s}`,i.rotation.z=s*(Math.PI/2)+.12,i.castShadow=!0,t.add(i)}const a=new I(new zn(8.5,1),new F({name:"beauty-cell-anomaly-core-material",color:new Y(6088396).multiplyScalar(2.4),toneMapped:!1}));a.name="beauty-cell-anomaly-core",t.add(a);for(let s=0;s<7;s+=1){const i=new I(new Yl(2.2+s%3,0),e),n=s/7*Math.PI*2;i.position.set(Math.cos(n)*18,Math.sin(n*2)*8,Math.sin(n)*18),i.rotation.set(n*.7,n,-n*.4),t.add(i)}const r=new va(6088396,12,135,2);return r.name="beauty-cell-anomaly-light",t.add(r),t}function K0(t){const e=new sa(960,800,56,46);e.name="beauty-cell-wet-asphalt-geometry",e.rotateX(-Math.PI/2),e.translate(430,.72,900),e.userData.componentCount=1;const a=new he({name:"beauty-cell-wet-asphalt-material",color:1583654,map:t.albedoMap,normalMap:t.normalMap,normalScale:new Ve(.5,.5),roughnessMap:t.roughnessMap,roughness:.86,metalness:.03,clearcoat:.38,clearcoatRoughness:.2});a.userData.surfaceProfile=os,a.userData.wetnessModel="clearcoat-puddles-and-drainage";const r=new I(e,a);return r.name="beauty-cell-wet-asphalt",r.receiveShadow=!0,r}function ys(t,e,a,r,s){const i=new ge(...a,1,1,1);i.name=`${t}-geometry`,i.userData.componentCount=1;const n=new L({name:`${t}-material`,color:s==="concrete"?11581352:7899771,map:r.albedoMap,normalMap:r.normalMap,normalScale:new Ve(s==="concrete"?.34:.52,s==="concrete"?.34:.52),roughnessMap:r.roughnessMap,roughness:.92,metalness:.01}),o=new I(i,n);return o.name=t,o.position.set(...e),o.castShadow=!0,o.receiveShadow=!0,o}function gt(t,e){const a=t.build();a.name=`${e.name}-geometry`;const r={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,flatShading:!1,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:e.depthWrite??!0,side:e.doubleSided?Se:Rn},s=e.unlit?new F({name:r.name,color:r.color,vertexColors:!0,transparent:r.transparent,opacity:r.opacity,side:r.side,depthWrite:r.depthWrite}):e.physical?new he({...r,clearcoat:e.clearcoat??0,clearcoatRoughness:e.clearcoatRoughness??0}):new L(r),i=new I(a,s);return i.name=e.name,i.castShadow=e.castShadow??!1,i.receiveShadow=e.receiveShadow??!1,i}function J0(t){let e=0,a=0,r=0,s=0;return t.traverse(i=>{if(!(i instanceof I))return;e+=1,r+=1;const n=i.geometry.getAttribute("position");a+=i.geometry.index===null?n.count/3:(i.geometry.index?.count??0)/3;const o=i.geometry.userData.componentCount;typeof o=="number"&&(s+=o)}),{drawCalls:e,triangles:a,geometries:r,components:s}}function _c(){const t=new U,e=new U,a=new U,r=new U,s=new U,i=new U,n=new U,o=new U,A=new U,l=new U,c=new U,d=new U,u=new U;O0(t,e,a,r,s),U0(i,o,d),N0(i,o,A,l),H0(i,o,A,l),G0(i,o,c,d,u,l),_0(i,o,d,u),j0(i,o,c),W0(i,n,A,o),Y0(d,u);const h=co(),g=K0(h.asphalt),p=[ys("beauty-cell-stair-retaining-shell",[134,36,1028],[28,72,220],h.concrete,"concrete"),ys("beauty-cell-transit-roof",[294,96,704],[142,7,58],h.roof,"roof"),ys("beauty-cell-far-left-shell",[150,64,541],[186,128,84],h.concrete,"concrete"),ys("beauty-cell-far-right-shell",[730,72,623],[172,144,94],h.concrete,"concrete")],m=[gt(t,{name:"beauty-cell-sidewalks-curbs",roughness:.9,receiveShadow:!0}),gt(e,{name:"beauty-cell-wet-road-film",roughness:.31,unlit:!0,transparent:!0,opacity:.68,depthWrite:!1,receiveShadow:!0}),gt(a,{name:"beauty-cell-worn-road-markings",roughness:.75,receiveShadow:!0}),gt(r,{name:"beauty-cell-road-puddles",roughness:.12,physical:!0,clearcoat:.92,clearcoatRoughness:.06,transparent:!0,opacity:.72,emissive:1587766,emissiveIntensity:.34,receiveShadow:!0}),gt(s,{name:"beauty-cell-road-aggregate",roughness:.96,receiveShadow:!0}),gt(i,{name:"beauty-cell-structural-concrete",roughness:.88,castShadow:!0,receiveShadow:!0}),gt(n,{name:"beauty-cell-layered-facades",roughness:.79,castShadow:!0,receiveShadow:!0}),gt(o,{name:"beauty-cell-metal-infrastructure",roughness:.39,metalness:.64,castShadow:!0,receiveShadow:!0}),gt(A,{name:"beauty-cell-laminated-glass",roughness:.13,metalness:.05,physical:!0,clearcoat:.75,clearcoatRoughness:.1,transparent:!0,opacity:.66}),gt(l,{name:"beauty-cell-working-signals",roughness:.2,emissive:4357992,emissiveIntensity:2.7,physical:!0,clearcoat:.48,clearcoatRoughness:.1}),gt(c,{name:"beauty-cell-spillway-water",roughness:.08,physical:!0,clearcoat:.96,clearcoatRoughness:.04,transparent:!0,opacity:.76,doubleSided:!0}),gt(d,{name:"beauty-cell-causal-foliage",roughness:.84,castShadow:!0,receiveShadow:!0}),gt(u,{name:"beauty-cell-human-flower-accents",roughness:.68,castShadow:!0})],f=new R;f.name="beauty-cell-ground",f.add(g,...m.slice(0,5),m[10]);const w=new R;w.name="beauty-cell-art-slice",w.add(f,...p,...m.slice(5,10),...m.slice(11),q0(),V0());const v=new va(16757854,5.5,145,2);v.name="beauty-cell-workbench-life-light",v.position.set(585,56,810),w.add(v);const y=new R;y.name="beauty-cell-contract-anchor",y.position.set(Ae.x,0,Ae.y),y.userData.interactionPoint={x:Ae.x,y:Ae.y},w.add(y);const P=J0(w);w.userData.schemaVersion=Lt.schemaVersion,w.userData.stableId=Lt.stableId,w.userData.seed=Lt.seed,w.userData.environmentKind=Lt.environmentKind,w.userData.visualGrammar=Lt.composition,w.userData.materialGrammar=Lt.materialGrammar,w.userData.generationProvenance=Lt.generationProvenance,w.userData.modules=Lt.modules.map(x=>({stableId:x.stableId,role:x.role,causalRule:x.causalRule,gameplayPromise:x.gameplayPromise})),w.userData.surfaceProvenance=h.provenance,w.userData.metrics=P,w.userData.spawnPosition={x:430,y:900},w.userData.playerCorridor=Lt.clearPlayerCorridor,w.userData.replacedTerrainIds=[...mA],w.userData.replacedPropIds=[...gA];let b=!1;return{group:w,ground:f,replacedTerrainIds:mA,replacedPropIds:gA,dispose(){b||(b=!0,w.removeFromParent(),w.traverse(x=>{x instanceof I&&(x.geometry.dispose(),Array.isArray(x.material)?x.material.forEach(B=>B.dispose()):x.material.dispose())}),h.dispose(),f.clear(),w.clear())}}}const G=Object.freeze({schemaVersion:"1.0.0",stableId:"concept-c-r04-live-v1",seed:1378890819,environmentProfile:"r04-live",cameraCompositionProfile:"r04",camera:Object.freeze({viewHeight:540,targetHeight:28,targetOffsetX:-76,targetOffsetZ:-82,followSpeed:6.4,exploreLookAhead:62,combatTargetWeight:.34,maximumCombatOffset:92}),display:Object.freeze({exposure:1.02,fogColor:11454907,fogNear:1420,fogFar:3200,groundWhiteMix:.08}),post:Object.freeze({tiltShiftFocus:.61,tiltShiftStrength:2.45}),actors:Object.freeze({heroScale:2.02,companionPreviewScale:1.36}),lighting:Object.freeze({skyColor:16773839,groundColor:2446919,skyIntensity:.34,keyColor:16767136,keyIntensity:3.28,keyOffsetX:-510,keyOffsetY:860,keyOffsetZ:210,shadowHalfExtent:560,shadowNormalBias:.68,rimColor:9234396,rimIntensity:.76,environmentIntensity:.19}),composition:Object.freeze({heroScreenAnchor:Object.freeze({x:.45,y:.62}),openRoute:Object.freeze({minimumX:390,maximumX:820,centerZ:900,halfWidth:82}),rule:"open-wet-route-with-edge-layered-ruins"}),generation:Object.freeze({mode:"deterministic-r04-scene-compiler",externalAssets:!1,referenceImageUsedAtRuntime:!1,causalColliderParity:!0})}),$t={concrete:[12239532,10004889,13223080,8361097],glass:[7186847,9683376,5406588],foliage:[2647626,4029516,6001232,7971926],flower:[15316837,15106156,15784331],repair:[12417105,13867873,8023640]},vA=[{colliderId:"town-hall",x:255,z:645,width:250,height:96,frontZ:720,columns:6,rows:3,seed:41},{colliderId:"south-house",x:265,z:1155,width:230,height:78,frontZ:1220,columns:5,rows:3,seed:87}],Z0=Object.freeze({collisionRole:"non-solid-distant-ghost-scrim",worldBoundary:"west",maximumReachableX:0}),$0={"beauty-cell-wet-asphalt":"walkable-surface","beauty-cell-sidewalks-curbs":"walkable-low-surface","beauty-cell-worn-road-markings":"surface-decal","beauty-cell-road-puddles":"surface-fluid","beauty-cell-road-aggregate":"non-solid-debris","beauty-cell-structural-concrete":"non-solid-atmospheric","beauty-cell-layered-facades":"non-solid-atmospheric","beauty-cell-metal-infrastructure":"non-solid-atmospheric","beauty-cell-laminated-glass":"non-solid-transparent","beauty-cell-working-signals":"non-solid-effect","beauty-cell-spillway-water":"surface-fluid","beauty-cell-causal-foliage":"non-solid-ecology","beauty-cell-human-flower-accents":"non-solid-ecology","beauty-cell-transit-roof":"overhead-nonblocking"},ep=["beauty-cell-stair-retaining-shell","beauty-cell-far-left-shell","beauty-cell-far-right-shell","beauty-cell-world-space-anomaly"];function ea(t,e,a=0){return(Math.imul(Math.trunc(t)+82,73856093)^Math.imul(Math.trunc(e)+772,19349663)^Math.imul(Math.trunc(a)+G.seed,83492791))>>>0}function te(t,e=0){return(t>>>e&1023)/1023}function Ft(t,e){return t[e%t.length]??t[0]??16777215}function yA(t,e,a,r){const[s,i,n,o]=e;t.addQuad({corners:[[s,a,n],[s,a,o],[i,a,o],[i,a,n]],color:r})}function kt(t,e){const a=t.build();a.name=`${e.name}-geometry`;const r={name:`${e.name}-material`,color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:!(e.transparent??!1),emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1},s=e.clearcoat===void 0?new L(r):new he({...r,clearcoat:e.clearcoat,clearcoatRoughness:e.clearcoatRoughness??.1}),i=new I(a,s);return i.name=e.name,i.castShadow=e.castShadow??!1,i.receiveShadow=e.receiveShadow??!1,i}function tp(t){const e=Ac.find(o=>o.id===t.colliderId);if(e===void 0||!e.solid)throw new Error(`R04 facade ${t.colliderId} has no authoritative collider.`);const a=Math.abs(t.frontZ-t.z),r={colliderId:t.colliderId,minimumX:t.x-t.width/2,maximumX:t.x+t.width/2,minimumZ:t.z-a,maximumZ:t.z+a},s=e.bounds.x+e.bounds.width,i=e.bounds.y+e.bounds.height,n=.001;if(r.minimumX<e.bounds.x-n||r.maximumX>s+n||r.minimumZ<e.bounds.y-n||r.maximumZ>i+n)throw new Error(`R04 facade ${t.colliderId} exceeds its authoritative collider.`);return r}function ap(t){t.removeFromParent(),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()}function rp(t){t.removeFromParent(),t.traverse(e=>{e instanceof I&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(a=>a.dispose()):e.material.dispose())})}function sp(t){(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>{a.transparent=!0,a.opacity=a instanceof L&&a.metalness>.3?.48:.34,a.depthWrite=!1,a.needsUpdate=!0}),t.castShadow=!1,t.receiveShadow=!1}function ip(t){const e=[],a=[];return t.traverse(r=>{if(!(r instanceof I)||!r.name.startsWith("beauty-cell-"))return;const s=$0[r.name];if(s===void 0)throw new Error(`R04 inherited mesh ${r.name} has no causal classification.`);r.userData.r04CausalRole=s,e.push(r.name),s==="non-solid-atmospheric"&&(sp(r),r.userData.outsideSimulationAuthority=!0,a.push(r.name)),s==="overhead-nonblocking"&&(r.userData.minimumClearance=60)}),{classifiedMeshNames:e,ghostedMeshNames:a}}function np(t){const e=[];for(const a of ep){const r=t.getObjectByName(a);if(r===void 0)throw new Error(`R04 expected inherited object ${a} is missing.`);rp(r),e.push(a)}return e}function op(t,e,a){const r=G.composition.openRoute,s=r.centerZ-r.halfWidth,i=r.centerZ+r.halfWidth;yA(t,[r.minimumX,r.maximumX,s-8,s-3.6],1.31,7506816),yA(t,[r.minimumX,r.maximumX,i+3.6,i+8],1.31,6980216);for(const o of[s,i]){t.addBox({center:[(r.minimumX+r.maximumX)/2,2.1,o],size:[r.maximumX-r.minimumX,4.2,7],color:o===s?10859686:9544596});for(let A=0;A<19;A+=1){const l=r.minimumX+12+A*23;a.addBox({center:[l,1.52,o+(o===s?5.8:-5.8)],size:[13.5,.85,5.5],color:A%4===0?5599595:4218201})}}const n=[[414,866,52,18,-.08],[505,921,83,23,.07],[612,858,62,16,.12],[730,934,91,20,-.05],[796,875,38,14,.16]];for(const[o,A,l,c,d]of n)e.addBox({center:[o,1.64,A],size:[l,.2,c],rotation:[0,d,0],color:A>r.centerZ?8829102:7514015});for(let o=0;o<5;o+=1)for(let A=0;A<12;A+=1){const l=ea(A,o,1028),c=405+A*35.2+(te(l,5)-.5)*3.2,d=842+o*29.4+(te(l,16)-.5)*2.6;a.addBox({center:[c,1.48+te(l,24)*.08,d],size:[29+te(l,3)*3,.18,22+te(l,12)*3],rotation:[0,(te(l,20)-.5)*.025,0],color:Ft([3490623,4412495,5465181,7106397],l),shade:.62+te(l,8)*.18}),(o*12+A)%7===0&&a.addBox({center:[c+3,1.61,d-2],size:[17+te(l,14)*11,.16,1.1],rotation:[0,-.42+te(l,2)*.84,0],color:2505270})}for(let o=0;o<8;o+=1)a.addBox({center:[668+o*14,1.57,898],size:[8.5,.36,44-o%3*4],rotation:[0,(o-4)*.006,0],color:o%3===0?12691559:13748125,shade:.72})}function Ap(t,e,a,r,s){const{x:i,z:n,width:o,height:A,frontZ:l,columns:c,rows:d,seed:u}=s;t.addBox({center:[i,A/2,n],size:[o,A,Math.abs(l-n)*2],color:Ft($t.concrete,u)}),t.addBox({center:[i,A+3,n],size:[o+10,6,Math.abs(l-n)*2+10],color:7374458});const h=Math.abs(l-n)*2,g=A+6.3;for(const[m,f,w,v]of[[i,n-h/2+4,o-12,4],[i,n+h/2-4,o-12,4],[i-o/2+4,n,4,h-12],[i+o/2-4,n,4,h-12]])a.addBox({center:[m,g+4.2,f],size:[w,8.4,v],color:5927016});for(let m=0;m<3;m+=1)for(let f=0;f<6;f+=1){const w=ea(f,m,u+375),v=i-o*.36+f*(o*.145),y=n-h*.27+m*(h*.27);t.addBox({center:[v,g+.28,y],size:[o*.115,.42,h*.2],rotation:[0,(te(w,11)-.5)*.035,0],color:Ft([7899772,8885895,10195575,6650739],w),shade:.78+te(w,19)*.16})}for(let m=0;m<4;m+=1){const f=ea(m,u,1370),w=i-o*.23+m*o*.16,v=n-h*.12+m%2*h*.18;a.addBox({center:[w,g+5.6,v],size:[o*.115,2.4,4.2],color:4874075}),e.addBox({center:[w,g+8.3,v+3.5],size:[o*.1,1.1,h*.16],rotation:[-.14,0,0],color:m%2===0?4353906:5997952,shade:.86+te(f,13)*.12})}for(let m=0;m<12;m+=1){const f=ea(m,u,1843),w=i-o*.38+te(f,4)*o*.76,v=n-h*.34+te(f,15)*h*.68,y=8+te(f,23)*12;r.addBox({center:[w,g+y/2,v],size:[1.1,y,1.1],rotation:[0,0,(te(f,8)-.5)*.24],color:2580290});for(let P=0;P<4;P+=1){const b=te(f^Math.imul(P+3,73244475),5)*Math.PI*2;r.addBox({center:[w+Math.cos(b)*3.4,g+3+P*(y/4),v+Math.sin(b)*3.4],size:[7.2,1.7,2.8],rotation:[0,-b,.16],color:Ft($t.foliage,f+P)})}}const p=o-32;for(let m=0;m<c;m+=1){const f=i-p/2+p/Math.max(1,c-1)*m;t.addBox({center:[f,A/2,l-1.1],size:[2.4,A-8,2.2],color:m%2===0?8689290:11055775,shade:.88})}for(let m=0;m<d;m+=1){const f=28+m*((A-38)/Math.max(1,d-1));for(let w=0;w<c;w+=1){const v=ea(w,m,u);if(te(v,8)<.09)continue;const y=i-p/2+p/Math.max(1,c-1)*w;e.addBox({center:[y,f,l+1.2],size:[Math.min(28,p/c-5),17,2.2],color:Ft($t.glass,v),shade:.9+te(v,17)*.16}),a.addBox({center:[y,f+10,l+2.2],size:[Math.min(32,p/c),2.2,3.2],color:4217687})}a.addBox({center:[i,f-13,l+3.2],size:[o-18,3.5,4],color:m%2===0?6124652:8416854})}for(let m=0;m<Math.max(2,c-1);m+=1){const f=ea(m,u,91),w=i-o*.34+m*o*.22;a.addBox({center:[w,23+m%2*2,l+10],size:[31,3.2,18],rotation:[.09,0,0],color:Ft($t.repair,f)}),t.addBox({center:[w+8,43+m*6,l+2.2],size:[17+te(f,4)*15,11,2],rotation:[0,0,(te(f,13)-.5)*.08],color:Ft($t.repair,f+1)})}for(let m=0;m<9;m+=1){const f=ea(m,u,177),w=i-o/2+8+te(f,3)*(o-16),v=18+te(f,15)*(A*.7);r.addBox({center:[w,A-v/2,l+4],size:[1.6,v,1.6],rotation:[0,0,(te(f,22)-.5)*.18],color:2645827});for(let y=0;y<4;y+=1)r.addBox({center:[w+(y%2===0?-1:1)*(3+te(f,y+5)*4),A-8-y*(v/4),l+4.5],size:[9,2.4,5],rotation:[0,(y%2===0?-1:1)*.45,.12],color:Ft($t.foliage,f+y)})}}function lp(t,e){for(let a=0;a<9;a+=1){const r=ea(a,903),s=535+a*92,i=42+te(r,4)*24,n=92+te(r,12)*72;t.addBox({center:[-8,n/2+18+a%3*8,s],size:[7,n,i],color:Ft($t.concrete,r),shade:.76+te(r,18)*.14});for(let o=0;o<4;o+=1)e.addBox({center:[-4.1,45+o*(n/5),s],size:[.8,2.4,i-8],color:o%2===0?7968395:10649442});e.addBox({center:[-4.1,n+20+a%3*8,s],size:[.8,4,i+6],color:7439482})}}function cp(t,e){[{count:82,minX:48,maxX:355,minZ:515,maxZ:760},{count:72,minX:75,maxX:385,minZ:1050,maxZ:1285},{count:64,minX:620,maxX:930,minZ:505,maxZ:730},{count:58,minX:650,maxX:955,minZ:1070,maxZ:1300}].forEach((r,s)=>{for(let i=0;i<r.count;i+=1){const n=ea(i,s,G.seed),o=r.minX+te(n,2)*(r.maxX-r.minX),A=r.minZ+te(n,13)*(r.maxZ-r.minZ),l=9+te(n,20)*24;t.addBox({center:[o,l/2+1.4,A],size:[1.2,l,1.2],rotation:[0,0,(te(n,7)-.5)*.22],color:2580290});for(let c=0;c<7;c+=1){const d=te(n^Math.imul(c+1,73244475),4)*Math.PI*2,u=4+te(n,c*4+3)*5.5;t.addBox({center:[o+Math.cos(d)*u*.4,5+c*(l/5),A+Math.sin(d)*u*.4],size:[u*1.22,1.9,u*.44],rotation:[0,-d,(te(n,c+19)-.5)*.3],color:Ft($t.foliage,n+c)})}i%19===0&&e.addBox({center:[o,l+2,A],size:[5.5,2.5,5.5],color:Ft($t.flower,n)})}})}function dp(){const t=new R;t.name="r04-composition-anchors";const e=new ia;e.name="r04-open-route-anchor",e.position.set((G.composition.openRoute.minimumX+G.composition.openRoute.maximumX)/2,0,G.composition.openRoute.centerZ),e.userData.bounds={...G.composition.openRoute},t.add(e);const a=new ia;return a.name="r04-contract-anchor",a.position.set(Ae.x,0,Ae.y),a.userData.interactionPoint={...Ae},t.add(a),t}function Gc(){const t=_c(),e=t.group.getObjectByName("beauty-cell-wet-road-film");e instanceof I&&ap(e);const a=np(t.group),r=ip(t.group),s=Nn.find(w=>w.id===ht);if(s===void 0)throw new Error("R04 simulation anomaly placement is missing.");const i=new U,n=new U,o=new U,A=new U,l=new U,c=new U,d=new U,u=new U,h=new U,g=new U,p=new U;op(i,n,o);const m=vA.map(w=>{const v=tp(w);return Ap(A,l,c,d,w),v});lp(g,p),cp(u,h);const f=[kt(i,{name:"r04-low-collider-readable-drains-curbs",roughness:.84,receiveShadow:!0}),kt(n,{name:"r04-localized-physical-puddles",roughness:.12,transparent:!0,opacity:.7,clearcoat:.96,clearcoatRoughness:.045,receiveShadow:!0}),kt(o,{name:"r04-route-drains-and-worn-markings",roughness:.62,metalness:.18,receiveShadow:!0}),kt(A,{name:"r04-layered-fixed-camera-facades",roughness:.88,castShadow:!0,receiveShadow:!0}),kt(l,{name:"r04-window-bands",roughness:.2,metalness:.08,clearcoat:.72,clearcoatRoughness:.12}),kt(c,{name:"r04-rails-awnings-roof-edges",roughness:.42,metalness:.58,castShadow:!0,receiveShadow:!0}),kt(d,{name:"r04-facade-vines-repair-decals",roughness:.81,castShadow:!0}),kt(u,{name:"r04-high-density-edge-vegetation",roughness:.82,castShadow:!0,receiveShadow:!0}),kt(h,{name:"r04-foreground-flower-framing",roughness:.66,castShadow:!0}),kt(g,{name:"r04-nonsolid-distant-ghost-scrims",roughness:.94,transparent:!0,opacity:.34,emissive:4745055,emissiveIntensity:.12}),kt(p,{name:"r04-nonsolid-distant-scrim-frames",roughness:.78,metalness:.18,transparent:!0,opacity:.42,emissive:6124652,emissiveIntensity:.1})];f[3].userData.collisionRole="authoritative-collider-backed-facade",f[3].userData.authoritativeColliderIds=vA.map(({colliderId:w})=>w),f[3].userData.groundFootprints=m;for(const w of[f[9],f[10]])Object.assign(w.userData,Z0,{outsideReachableWorld:!0});return t.ground.add(f[0],f[1],f[2]),t.group.add(...f.slice(3),dp()),t.group.name="r04-art-slice",t.ground.name="r04-ground",t.group.userData.schemaVersion=G.schemaVersion,t.group.userData.stableId=G.stableId,t.group.userData.seed=G.seed,t.group.userData.environmentProfile=G.environmentProfile,t.group.userData.compositionRule=G.composition.rule,t.group.userData.generationProvenance={...G.generation,source:"r02-causal-scene-plus-r04-procedural-presentation",solidFacadePolicy:"authoritative-collider-backed-only",decorativeFacadePolicy:"non-solid-scrims-outside-reachable-world",inheritedGeometryPolicy:"classified-or-rejected-at-construction",anomalyPolicy:"simulation-enemy-state-only"},t.group.userData.openRoute={...G.composition.openRoute},t.group.userData.removedLegacyWetFilm=!0,t.group.userData.removedUnboundInheritedObjects=a,t.group.userData.inheritedCausalAudit=r,t.group.userData.authoritativeAnomaly={id:s.id,initialX:s.x,initialZ:s.y,source:"simulation-enemy-state"},t.group.userData.contractBoardPosition={...Ae},t.group.userData.replacedTerrainIds=[...t.replacedTerrainIds],t.group.userData.replacedPropIds=[...t.replacedPropIds],t}const ve=Object.freeze({schemaVersion:1,stableId:"fram-r05-presentation-v1",environmentProfile:"r04-live",cameraCompositionProfile:"r05",presentationProfile:"r05-fram",camera:{viewHeight:640,offsetY:560,targetHeight:28,targetOffsetX:-76,targetOffsetZ:-82,exploreLookAhead:42,combatTargetWeight:.34,maximumCombatOffset:88,followSpeed:6.1},post:{maxPixelRatio:1.5,tiltShiftMode:"banded",tiltShiftFocus:.57,tiltShiftClearBand:.3,tiltShiftFarBlurPixels:6.5,tiltShiftNearBlurPixels:8.5},display:{exposure:.98,fogColor:9546407,fogNear:1620,fogFar:3480,groundWhiteMix:.025},lighting:{skyColor:16771529,groundColor:1588026,skyIntensity:.23,keyColor:16762751,keyIntensity:3.72,keyOffsetX:-470,keyOffsetY:790,keyOffsetZ:250,shadowHalfExtent:560,shadowNormalBias:.58,rimColor:7980755,rimIntensity:.48,environmentIntensity:.13},actors:{heroScale:2.24},identity:{title:"F.R.A.M.",fullName:"Frontier Relics Archive Module",japaneseName:"辺境遺物記録モジュール",instance:"F.R.A.M. F-01"}}),xs=Object.freeze({schemaVersion:1,stableId:"fram-r07-semantic-voxel-girl-v1",environmentProfile:"r04-live",cameraCompositionProfile:"r05",presentationProfile:"r07-fram",post:{maxPixelRatio:1.5,depthAwareDof:!0,focusRange:.036,blurPixels:1.45,edgeThreshold:.0045},actors:{heroScale:2.38},identity:{title:"F.R.A.M.",instance:"F.R.A.M. F-01A",characterPreset:"semantic-micro-voxel-girl-a"}}),bs=Object.freeze({schemaVersion:1,stableId:"fram-r08-unified-semantic-voxel-girl-v1",environmentProfile:"r04-live",cameraCompositionProfile:"r05",presentationProfile:"r08-fram",post:{maxPixelRatio:1.5,depthAwareDof:!0,focusRange:.036,blurPixels:1.45,edgeThreshold:.0045},actors:{heroScale:2.58},identity:{title:"F.R.A.M.",instance:"F.R.A.M. F-01B",characterPreset:"unified-semantic-micro-voxel-girl-b"}}),up="fram.character.f01.gameplay-distance-v2",hp="fram.character.f01.gameplay-bridge-v1",fp=9454,pp=9421,mp=24,gp={maximumGridY:1,maximumComponentCells:64},wp={surfaceFill:1.01,edgeRadiusRatio:.012,castShadow:!1,receiveShadow:!1},vp={footAnchorY:-.02929,surfaceOffset:.04,worldBobAmplitude:0},yp={strategy:"soft-contact-plus-directional-proxy",contactRadiusX:31,contactRadiusZ:17,contactOpacity:.27,surfaceOffset:.08,directionalProxy:!0,weaponCastShadow:!0},xp={clothRoughness:.86,clothSheen:.08,clothSheenRoughness:.92,polymerRoughness:.56,polymerMetalness:.12,polymerClearcoat:.03,skinRoughness:.74,glassRoughness:.5,glassMetalness:.1,glassClearcoat:.2,environmentIntensity:.62,emissiveIntensity:1.7,diffuseLift:.06,macroNormalBlend:.58,macroNormalCenterY:.15},bp={gtaoIntensity:.34},Xc={id:up,actorId:hp,sourceSurfaceCells:fp,visibleSurfaceCells:pp,worldScale:mp,topologyFilter:gp,render:wp,grounding:vp,shadow:yp,material:xp,post:bp},Dp=Object.freeze({...ve,schemaVersion:2,stableId:"fram-r09-presentation-v2",presentationProfile:"r09-fram",lighting:{...ve.lighting,skyIntensity:.38,keyIntensity:2.85,rimIntensity:.34,environmentIntensity:.17},post:{...ve.post,gtaoIntensity:Xc.post.gtaoIntensity}}),Bp=[.68,.32,.265,.69,.15,.06],Pp=[.2289,.6917,.0793],Ep=[.3127,.329],Cp=new Tn().set(.4865709,.2656677,.1982173,.2289746,.6917385,.0792869,0,.0451134,1.0439444),Mp=new Tn().set(2.4934969,-.9313836,-.4027108,-.829489,1.7626641,.0236247,.0358458,-.0761724,.9568845),Ys="display-p3",Sp={primaries:Bp,whitePoint:Ep,transfer:Fd,toXYZ:Cp,fromXYZ:Mp,luminanceCoefficients:Pp,outputColorSpaceConfig:{drawingBufferColorSpace:Ys}};({...$s.spaces[je]});const Ip=1.18;function Qp(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(color-gamut: p3)").matches}function kp(t,e=Ip){t.toneMapping=Od,t.toneMappingExposure=e,t.outputColorSpace=je;let a="srgb";const r=t.getContext();if(Qp()&&"drawingBufferColorSpace"in r){$s.define({[Ys]:Sp});try{t.outputColorSpace=Ys,r.drawingBufferColorSpace===Ys?a="display-p3":t.outputColorSpace=je}catch{t.outputColorSpace=je}}return t.domElement.dataset.outputGamut=a,t.domElement.dataset.toneMapping="agx",t.domElement.dataset.toneMappingExposure=e.toFixed(2),{gamut:a,toneMapping:"agx",exposure:e}}const yr=Object.freeze({x:510,y:680,z:510}),Tp=46,Rp=.38,zp=72;function Lp(t,e,a=yr){const r=Math.hypot(a.x,a.z);if(r<=Number.EPSILON)return{moveX:t,moveY:e};const s=a.z/r,i=-a.x/r,n=a.x/r,o=a.z/r;return{moveX:t*s+e*n,moveY:t*i+e*o}}function Fp(t,e,a="-z"){return a==="+z"?Math.atan2(t,e):Math.atan2(-t,-e)}function xA(t,e="north-star"){if(e==="baseline")return{mode:"centered",targetX:t.playerX,targetY:t.playerY};const a=Math.hypot(t.facingX,t.facingY),r=a>Number.EPSILON?t.facingX/a:0,s=a>Number.EPSILON?t.facingY/a:-1,i=t.phase!==void 0&&t.phase!=="idle"&&Number.isFinite(t.targetX)&&Number.isFinite(t.targetY),n=e==="r05"?ve.camera.exploreLookAhead:e==="r04"?G.camera.exploreLookAhead:Tp,o=e==="r05"?ve.camera.combatTargetWeight:e==="r04"?G.camera.combatTargetWeight:Rp,A=e==="r05"?ve.camera.maximumCombatOffset:e==="r04"?G.camera.maximumCombatOffset:zp;if(!i)return{mode:"explore",targetX:t.playerX+r*n,targetY:t.playerY+s*n};const l=Op(t.targetX-t.playerX,t.targetY-t.playerY,A);return{mode:"combat",targetX:t.playerX+l.x*o,targetY:t.playerY+l.y*o}}function Op(t,e,a){const r=Math.hypot(t,e);if(r<=a||r<=Number.EPSILON)return{x:t,y:e};const s=a/r;return{x:t*s,y:e*s}}const dt=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],Up=["matte","metal","emissive"],Np={head:{x:12,y:23.5,z:7.5},torso:{x:12,y:14,z:8},"left-arm":{x:7.5,y:21.5,z:7},"right-arm":{x:16.5,y:21.5,z:7},"left-leg":{x:8.5,y:13,z:7},"right-leg":{x:15,y:13,z:7},equipment:{x:12,y:16,z:10}};function bA(t,e){return Number.isFinite(t)?C.clamp(t??e,0,1):e}function fa(t){return t*t*(3-2*t)}function DA(t=[0,0,0],e=[0,0,0],a=[1,1,1]){return{position:t,rotation:e,scale:a}}function qc(t){const e=t.paletteId==="pack-pale"||t.paletteId==="cyan"||t.paletteId==="amber",a=t.z>=9&&t.y>=15&&t.x>=5&&t.x<=15,r=t.z<=5&&t.y>=15&&t.y<=22&&t.paletteId==="rust",s=t.z>=8&&t.y>=10&&t.y<=14&&(t.paletteId==="cloth-sage"||t.paletteId==="cloth-dark");return e||a||r||s?"equipment":t.y>=24?"head":t.y>=13&&t.x<=8?"left-arm":t.y>=13&&t.x>=16?"right-arm":t.y<=12&&t.x<=11?"left-leg":t.y<=12?"right-leg":"torso"}function Hp(t=Ir,e=qc){const a={head:[],torso:[],"left-arm":[],"right-arm":[],"left-leg":[],"right-leg":[],equipment:[]};for(const r of t.voxels)a[e(r,t)].push(r);return Object.fromEntries(dt.map(r=>[r,{schemaVersion:2,id:`${t.id}-${r}`,name:`${t.name} / ${r}`,kind:t.kind,dimensions:t.dimensions,palette:t.palette,voxels:a[r],anchors:[],validation:{minVoxelCount:0,maxVoxelCount:t.voxels.length,requireGroundContact:!1,requireConnectedBody:!1}}]))}function _p(t){switch(t){case"matte":return new he({color:16777215,vertexColors:!0,roughness:.72,metalness:0,sheen:.24,sheenColor:13624796,sheenRoughness:.88});case"metal":return new he({color:16777215,vertexColors:!0,roughness:.28,metalness:.82,clearcoat:.12,clearcoatRoughness:.42});case"emissive":return new F({color:16777215,vertexColors:!0,toneMapped:!1})}}function Gp(t,e,a){return new S((e.x-t.dimensions.width/2)*a,e.y*a,(e.z-t.dimensions.depth/2)*a)}function Xp(t,e,a){const r=Cc(t,{voxelSize:e,shadeFaces:!1,origin:{x:-(t.dimensions.width*e)/2-a.x,y:-a.y,z:-(t.dimensions.depth*e)/2-a.z}}),s=new $e;return s.setAttribute("position",new He(r.positions,3)),s.setAttribute("normal",new He(r.normals,3)),s.setAttribute("color",new He(r.colors,3)),s.setIndex(new He(r.indices,1)),r.materialGroups.forEach((i,n)=>{s.addGroup(i.start,i.count,n)}),s.computeBoundingSphere(),{geometry:s,roles:r.materialGroups.map(i=>i.role)}}function BA(t,e,a,r){const s=Xp(t,e,a),i=new I(s.geometry,s.roles.map(n=>r[n]));return i.name=t.id,i.castShadow=!0,i.receiveShadow=!0,i}function ho(t){const e=Number.isFinite(t.timeSeconds)?t.timeSeconds:0,a=bA(t.progress,0),r=bA(t.moveAmount,1),s=Math.sin(e*2.15),i=[0,s*.32,0],n=[0,0,0],o={head:[s*.012,Math.sin(e*.72)*.035,0],torso:[.018+s*.008,0,0],"left-arm":[-.025-s*.018,0,-.035],"right-arm":[.025+s*.018,0,.035],"left-leg":[0,0,0],"right-leg":[0,0,0],equipment:[-s*.008,0,0]},A={head:[1,1,1],torso:[1,1,1],"left-arm":[1,1,1],"right-arm":[1,1,1],"left-leg":[1,1,1],"right-leg":[1,1,1],equipment:[1,1,1]};switch(t.motion){case"idle":break;case"run":{const c=Math.sin(e*10.5)*r;i[1]+=Math.abs(Math.cos(e*10.5))*1.25*r,o.torso[0]+=.1*r,o.torso[1]=Math.cos(e*10.5)*.09*r,o.head[1]-=o.torso[1]*.55,o["left-leg"][0]=c*.68,o["right-leg"][0]=-c*.68,o["left-arm"][0]=-c*.5,o["right-arm"][0]=c*.5,o.equipment[0]-=.08*r+Math.abs(c)*.035;break}case"dash":{const c=fa(a),d=Math.sin(e*11.2)*r*c,u=Math.abs(Math.cos(e*11.2))*r*c;i[1]+=u*.42,i[2]-=c*.12,o.torso[0]=.14*c,o.torso[1]=Math.cos(e*11.2)*.035*c,o.head[0]=-.025*c,o.head[1]=-o.torso[1]*.5,o["left-arm"][0]=-.12*c-d*.34,o["right-arm"][0]=-.16*c+d*.34,o["left-leg"][0]=d*.58,o["right-leg"][0]=-d*.58,o["left-leg"][2]=-.018*u,o["right-leg"][2]=.018*u,o.equipment[0]=-.07*c-Math.abs(d)*.025;break}case"windup":{const c=fa(a);o.torso[1]=-.42*c,o.torso[2]=.08*c,o["right-arm"][0]=-1.18*c,o["right-arm"][2]=-.25*c,o["left-arm"][0]=.38*c,o.head[1]=.2*c,o["left-leg"][0]=-.12*c,o["right-leg"][0]=.16*c;break}case"hit":{const c=fa(a);o.torso[1]=C.lerp(-.42,.34,c),o["right-arm"][0]=C.lerp(-1.18,1.46,c),o["right-arm"][2]=C.lerp(-.25,.2,c),o["left-arm"][0]=C.lerp(.38,-.2,c),o.head[1]=-o.torso[1]*.42,i[2]-=Math.sin(a*Math.PI)*2.8;break}case"combo-diagonal":{const c=fa(a),d=Math.sin(a*Math.PI);o.torso[0]=.16*d,o.torso[1]=C.lerp(-.72,.5,c),o.torso[2]=C.lerp(.24,-.16,c),o["right-arm"][0]=C.lerp(-1.62,1.66,c),o["right-arm"][2]=C.lerp(-.68,.38,c),o["left-arm"][0]=.58-c*.82,o.head[2]=-.12*d,i[2]-=d*1.7,i[0]-=d*1.2;break}case"combo-crosscut":{const c=fa(a),d=Math.sin(a*Math.PI);o.torso[1]=C.lerp(.82,-.7,c),o.torso[2]=-.22*d,o["right-arm"][0]=C.lerp(1.48,-1.7,c),o["right-arm"][2]=C.lerp(.56,-.58,c),o["left-arm"][0]=-.38+c*.86,o["left-leg"][0]=-.36*d,o["right-leg"][0]=.34*d,o.head[1]=.18*d,i[0]+=d*1.8,i[2]-=d*.8;break}case"combo-rupture":{const c=fa(a),d=Math.sin(a*Math.PI);o.torso[0]=.48*d,o.torso[1]=C.lerp(-.46,.3,c),o["right-arm"][0]=C.lerp(-1.86,1.9,c),o["right-arm"][2]=C.lerp(-.28,.2,c),o["left-arm"][0]=C.lerp(.82,-.58,c),o["left-leg"][0]=-.48*d,o["right-leg"][0]=.56*d,o.head[0]=-.2*d,i[2]-=d*3.2,i[1]-=d*.45;break}case"link":{const c=fa(a),d=Math.sin(a*Math.PI);o.torso[0]=.12*d,o.torso[1]=C.lerp(-.6,.52,c),o["right-arm"][0]=C.lerp(-1.35,1.62,c),o["right-arm"][2]=C.lerp(-.38,.26,c),o["left-arm"][0]=.52-c*.84,o["left-leg"][0]=-.22*d,o["right-leg"][0]=.28*d,i[2]-=d*4.4;break}case"recovery":{const c=1-fa(a);o.torso[1]=.34*c,o["right-arm"][0]=1.46*c,o["right-arm"][2]=.2*c,o["left-arm"][0]=-.2*c,o.head[1]=-.14*c;break}case"guard":{const c=Math.sin(a*Math.PI);i[1]-=c*.9,o.torso[0]=-.16*c,o.torso[1]=-.18*c,o["left-arm"][0]=-.9*c,o["left-arm"][1]=.42*c,o["right-arm"][0]=-.62*c,o["right-arm"][1]=-.24*c,o["left-leg"][0]=.12*c,o["right-leg"][0]=-.18*c;break}case"hurt":{const c=Math.sin(a*Math.PI);i[2]+=c*7.5,n[2]=Math.sin(a*Math.PI*2)*.06,o.torso[0]=-.34*c,o.head[0]=.28*c,o["left-arm"][0]=-.62*c,o["right-arm"][0]=-.78*c;break}case"skill":{const c=Math.sin(a*Math.PI);i[1]-=c*2.6,o.torso[0]=-.18*c,o.head[0]=.14*c,o["left-arm"][0]=.72*c,o["right-arm"][0]=.72*c,o["left-arm"][2]=-.92*c,o["right-arm"][2]=.92*c,o["left-leg"][0]=-.15*c,o["right-leg"][0]=.15*c,A.equipment=[1+c*.07,1+c*.07,1+c*.07];break}}const l=Object.fromEntries(dt.map(c=>[c,DA([0,0,0],o[c],A[c])]));return{root:DA(i,n),parts:l}}function Er(t,e){const a=new S(e.x,e.y,e.z).multiply(t.scale).applyQuaternion(t.quaternion);t.position.copy(a).multiplyScalar(-1)}function qp(t={}){const e=t.recipe??Ir,a=t.voxelSize??di,r=t.mode??"articulated";if(!Number.isFinite(a)||a<=0)throw new RangeError("Hero voxel size must be a positive finite number.");const s=new Set,i=Object.fromEntries(Up.map(v=>{const y=t.materials?.[v],P=y??_p(v);return y===void 0&&s.add(P),[v,P]})),n=new R;n.name=`${e.id}-visual`;const o=new R;o.name=`${e.id}-motion`,n.add(o);const A=Object.fromEntries(dt.map(v=>[v,Gp(e,Np[v],a)])),l=Object.fromEntries(dt.map(v=>{const y=new R;return y.name=`${e.id}-${v}-pivot`,[v,y]})),c=Object.fromEntries(dt.map(v=>[v,new S])),d=A.torso;for(const v of dt){const y=v==="head"||v==="left-arm"||v==="right-arm"||v==="equipment"?l.torso:o;y.add(l[v]),c[v].copy(A[v]),y===l.torso&&c[v].sub(d),l[v].position.copy(c[v])}let h=Object.fromEntries(dt.map(v=>[v,null])),g=null;const p=[];if(r==="articulated"){const v=Hp(e,t.classifyVoxel??qc);h=Object.fromEntries(dt.map(y=>{const P=BA(v[y],a,A[y],i);return p.push(P.geometry),l[y].add(P),[y,P]}))}else{g=BA(e,a,new S,i),p.push(g.geometry),o.add(g);for(const v of dt)l[v].visible=!1}const m=ss(e,"weapon",a),f=new R;f.name=`${e.id}-weapon-socket`,r==="articulated"?(l["right-arm"].add(f),f.position.set(m.x-A["right-arm"].x,m.y-A["right-arm"].y,m.z-A["right-arm"].z)):(o.add(f),f.position.set(m.x,m.y,m.z));const w={root:n,motionRoot:o,mode:r,partGroups:l,partMeshes:h,mergedMesh:g,weaponSocket:f,materials:i,updatePose(v){const y=ho(v);o.position.set(...y.root.position),o.rotation.set(...y.root.rotation),o.scale.set(...y.root.scale);for(const P of dt){const b=y.parts[P],x=l[P];x.position.set(c[P].x+b.position[0],c[P].y+b.position[1],c[P].z+b.position[2]),x.rotation.set(...b.rotation),x.scale.set(...b.scale)}r==="merged"&&f.rotation.set(...y.parts["right-arm"].rotation)},attachWeapon(v,y={x:0,y:0,z:0}){f.add(v),Er(v,y)},setTint(v){for(const[y,P]of Object.entries(i))(P instanceof L||P instanceof F)&&(P.color.set(v),y==="emissive"&&P instanceof F&&P.color.multiplyScalar(2.15))},dispose(){for(const v of p)v.dispose();for(const v of s)v.dispose();n.removeFromParent()}};return w.updatePose({motion:"idle",timeSeconds:0}),w}function Yp(t,e){if(t?.status==="loaded"&&t.runtime!==void 0)try{return{visual:t.runtime.createVisual(),source:"runtime",status:"loaded",assetId:t.runtime.id,worldScale:t.runtime.worldScale,presentation:t.runtime.presentation}}catch{return PA(e(),"factory-failed")}return PA(e(),t?.status??"not-requested")}function PA(t,e){return{visual:t,source:t===null?"none":"built-in",status:e,assetId:t?.root.name}}const EA=Object.freeze({minimumX:260,maximumX:792,minimumZ:840,maximumZ:1010,height:2.01}),CA=Object.freeze({minimumX:278,maximumX:810,minimumZ:822,maximumZ:992,height:2.025});function MA(t,e,a){return e>=t.minimumX&&e<=t.maximumX&&a>=t.minimumZ&&a<=t.maximumZ}function jp(t,e){return MA(CA,t,e)?CA.height:MA(EA,t,e)?EA.height:0}function Wp(t,e,a,r){const s=Number.isFinite(a)?a:1,i=Number.isFinite(r)?r:0;return t+e.surfaceOffset-e.footAnchorY*s+i*e.worldBobAmplitude}function Vp(t){const e=new sa(2,2),a=new xt({name:"F-01 soft contact shadow",transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{shadowColor:{value:new Y(1517347)},opacity:{value:C.clamp(t.contactOpacity,0,.5)}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 shadowColor;
      uniform float opacity;
      varying vec2 vUv;
      void main() {
        vec2 centered = (vUv - 0.5) * 2.0;
        float radius = dot(centered, centered);
        float core = 1.0 - smoothstep(0.08, 1.0, radius);
        float falloff = core * core;
        gl_FragColor = vec4(shadowColor, opacity * falloff);
      }
    `}),r=new I(e,a);return r.name="F-01 grounded soft contact shadow",r.rotation.x=-Math.PI/2,r.scale.set(t.contactRadiusX,t.contactRadiusZ,1),r.renderOrder=3,r.frustumCulled=!1,r}function Kp(t){const e=new R;e.name="F-01 directional shadow proxy";const a=new F({name:"F-01 shadow-only proxy material",color:0,colorWrite:!1,depthWrite:!1}),r=new Ai(1,8,6),s=Number.isFinite(t)?t:1,i=[{position:[0,4.28,0],size:[1.02,1.02,.92]},{position:[0,2.35,0],size:[.84,1.28,.62]},{position:[-.38,.74,0],size:[.28,.82,.34]},{position:[.38,.74,0],size:[.28,.82,.34]}];for(const[n,o]of i.entries()){const A=new I(r,a);A.name=`F-01 shadow proxy volume ${n+1}`,A.position.set(o.position[0],o.position[1],o.position[2]).multiplyScalar(s),A.scale.set(o.size[0],o.size[1],o.size[2]).multiplyScalar(s),A.castShadow=!0,A.receiveShadow=!1,A.frustumCulled=!1,e.add(A)}return e.userData.proxyVolumes=i.length,e}function Cr(t,e=!1){const a=t[0].index!==null,r=new Set(Object.keys(t[0].attributes)),s=new Set(Object.keys(t[0].morphAttributes)),i={},n={},o=t[0].morphTargetsRelative,A=new $e;let l=0;for(let c=0;c<t.length;++c){const d=t[c];let u=0;if(a!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!r.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;i[h]===void 0&&(i[h]=[]),i[h].push(d.attributes[h]),u++}if(u!==r.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;n[h]===void 0&&(n[h]=[]),n[h].push(d.morphAttributes[h])}if(e){let h;if(a)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;A.addGroup(l,h,c),l+=h}}if(a){let c=0;const d=[];for(let u=0;u<t.length;++u){const h=t[u].index;for(let g=0;g<h.count;++g)d.push(h.getX(g)+c);c+=t[u].attributes.position.count}A.setIndex(d)}for(const c in i){const d=SA(i[c]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;A.setAttribute(c,d)}for(const c in n){const d=n[c][0].length;if(d!==0){A.morphAttributes=A.morphAttributes||{},A.morphAttributes[c]=[];for(let u=0;u<d;++u){const h=[];for(let p=0;p<n[c].length;++p)h.push(n[c][p][u]);const g=SA(h);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;A.morphAttributes[c].push(g)}}}return A}function SA(t){let e,a,r,s=-1,i=0;for(let l=0;l<t.length;++l){const c=t[l];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(a===void 0&&(a=c.itemSize),a!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(r===void 0&&(r=c.normalized),r!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=c.count*a}const n=new e(i),o=new He(n,a,r);let A=0;for(let l=0;l<t.length;++l){const c=t[l];if(c.isInterleavedBufferAttribute){const d=A/a;for(let u=0,h=c.count;u<h;u++)for(let g=0;g<a;g++){const p=c.getComponent(u,g);o.setComponent(u+d,g,p)}}else n.set(c.array,A);A+=c.count*a}return s!==void 0&&(o.gpuType=s),o}function IA(t,e){if(e===Ud)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(e===An||e===jl){let a=t.getIndex();if(a===null){const n=[],o=t.getAttribute("position");if(o!==void 0){for(let A=0;A<o.count;A++)n.push(A);t.setIndex(n),a=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}const r=a.count-2,s=[];if(e===An)for(let n=1;n<=r;n++)s.push(a.getX(0)),s.push(a.getX(n)),s.push(a.getX(n+1));else for(let n=0;n<r;n++)n%2===0?(s.push(a.getX(n)),s.push(a.getX(n+1)),s.push(a.getX(n+2))):(s.push(a.getX(n+2)),s.push(a.getX(n+1)),s.push(a.getX(n)));s.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const i=t.clone();return i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),t}const QA=Object.freeze({schemaVersion:1,id:"actor.beauty-cell.field-surveyor-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-surveyor-7429",rigFamily:"humanoid-v1",representation:"grid-quantized-modular-3d",unitStep:.25,role:"reclamation field surveyor",silhouette:["asymmetric storm mantle","compact analysis pack","offset sensor mast","armored field boots"],materialGrammar:["waxed teal cloth","warm ceramic shell","brushed utility metal","cyan and amber diagnostic light"],provenance:{source:"procedural runtime geometry",externalAssets:!1,conceptImageUsedAtRuntime:!1}}),kA=Object.freeze({schemaVersion:1,id:"companion.beauty-cell.survey-hound-01",generatorVersion:"grid-quantized-stylized-actor-v1",seed:"r02-hound-3118",role:"recoverable terrain-analysis unit",bodyPlan:"four-legged survey robot",provenance:{source:"procedural runtime geometry",externalAssets:!1}});class aa{buckets=new Map;add(e,a,r){const s=a.index===null?a:a.toNonIndexed();s!==a&&(a.dispose(),a=s),a.deleteAttribute("uv");const i=r.position.map(Tt),n=r.rotation??[0,0,0],o=(r.scale??[1,1,1]).map(Tt),A=new fe().compose(new S(...i),new ot().setFromEuler(new Ie(...n)),new S(...o));a.applyMatrix4(A);const l=this.buckets.get(e)??[];return l.push(a),this.buckets.set(e,l),this}rounded(e,a,r,s,i=.8){const[n,o,A]=a.map(Tt);return this.add(e,new li(n,o,A,2,Math.min(i,n*.24,o*.24,A*.24)),{position:r,rotation:s})}capsule(e,a,r,s,i,n){const o=Tt(a),A=Tt(r);return this.add(e,new Wl(o,Math.max(.25,A-o*2),4,10),{position:s,rotation:i,scale:n})}sphere(e,a,r,s){return this.add(e,new Ai(Tt(a),14,9),{position:r,scale:s})}cylinder(e,a,r,s,i,n,o=10){return this.add(e,new ba(Tt(a),Tt(r),Tt(s),o,1),{position:i,rotation:n})}torus(e,a,r,s,i,n){return this.add(e,new _a(Tt(a),Tt(r),6,16),{position:s,rotation:i,scale:n})}build(e,a){const r=[...this.buckets.keys()];if(r.length===0)throw new Error(`Cannot build empty actor part: ${e}`);const s=[];for(const o of r){const A=this.buckets.get(o);if(A===void 0)continue;const l=Cr(A,!1);for(const c of A)c.dispose();if(l===null)throw new Error(`Failed to merge actor material group: ${e}`);s.push(l)}const i=Cr(s,!0);for(const o of s)o.dispose();if(i===null)throw new Error(`Failed to merge actor part: ${e}`);i.computeBoundingBox(),i.computeBoundingSphere();const n=new I(i,r.map(o=>a[o]));return n.name=e,n.castShadow=!0,n.receiveShadow=!0,n}}function Tt(t){return Math.round(t*4)/4}function _t(t,e={}){return new he({color:t,...e})}function Ti(t,e){return new F({color:new Y(t).multiplyScalar(e),toneMapped:!1})}function fo(){const t={skin:_t(13207144,{roughness:.52,sheen:.12,sheenColor:16767172,sheenRoughness:.75}),hair:_t(1516842,{roughness:.48,sheen:.52,sheenColor:5934222,sheenRoughness:.66}),under:_t(1515814,{roughness:.64}),cloth:_t(3108972,{roughness:.72,sheen:.46,sheenColor:9163204,sheenRoughness:.82}),clothDark:_t(1588032,{roughness:.8,sheen:.28,sheenColor:7053208,sheenRoughness:.9}),shell:_t(14209725,{roughness:.38,clearcoat:.24,clearcoatRoughness:.7}),metal:_t(6716288,{roughness:.27,metalness:.86,clearcoat:.12,clearcoatRoughness:.36}),copper:_t(11293753,{roughness:.32,metalness:.68}),rubber:_t(857625,{roughness:.9}),glass:_t(1654088,{roughness:.12,metalness:.18,clearcoat:1,clearcoatRoughness:.08}),cyan:Ti(6485217,2.7),amber:Ti(16758093,2.35),coral:Ti(16741460,2.1)},e=new Map;for(const a of Object.values(t))(a instanceof F||a instanceof L)&&e.set(a,a.color.clone());return{byId:t,contract:{matte:t.cloth,metal:t.metal,emissive:t.cyan},originals:e,owned:new Set(Object.values(t))}}function Jp(t){const e=new aa().capsule("skin",5.1,10.5,[0,5,1.4],void 0,[.92,1,.88]).sphere("hair",5.8,[0,7.2,-1.35],[1,1.02,.82]).rounded("hair",[9.5,3.5,3],[0,10.25,1.15],[.08,0,0],1.2).capsule("hair",1.45,9,[-5,3.4,-.5],[.08,0,-.18]).capsule("hair",1.7,12.5,[4.7,2.1,-1],[-.08,0,.12]).rounded("glass",[8.5,1.4,.8],[0,6.3,6.15],[0,0,-.04],.38).rounded("cyan",[2.2,.45,.3],[2.35,6.3,6.65],void 0,.12).rounded("copper",[1.25,3.2,1.5],[-5.2,5.25,.8],[0,0,.18],.4).rounded("shell",[7,1.4,4.2],[0,-.75,0],void 0,.45).build("beauty-hero-head",t),a=new aa().rounded("under",[12,17,7.5],[0,5,0],void 0,2.4).rounded("cloth",[7,14.5,2.2],[-3.7,5.5,4.1],[0,0,-.08],1.05).rounded("clothDark",[6.3,14,2.1],[3.5,5.2,4.15],[0,0,.06],1).rounded("shell",[15.5,4.2,7.8],[0,12.2,-.1],void 0,1.5).rounded("under",[13.2,4.6,7.8],[0,-4.5,0],void 0,1.2).rounded("copper",[1.1,12.2,.85],[-1.2,5.2,5.45],[-.04,0,.11],.3).rounded("metal",[7.4,2.1,1],[2.2,9.2,5.25],[.02,0,-.06],.42).rounded("cyan",[3.1,.65,.35],[3.5,9.2,5.85],void 0,.16).rounded("amber",[1.1,1.1,.35],[.3,-2.8,5.15],void 0,.22).build("beauty-hero-torso",t);function r(n){const o=n<0?"left":"right",A=new aa().sphere(n<0?"cloth":"clothDark",3.7,[0,-1.2,0],[1,.82,1]).capsule(n<0?"cloth":"clothDark",2.7,11,[0,-6.5,0],[.02,0,n*.035]).capsule("under",2.3,9.5,[0,-15.1,.3],[-.04,0,n*.025]).rounded("metal",[5.2,5.8,5.1],[0,-12.7,.8],void 0,1.2).capsule("rubber",2.35,5.2,[0,-20.3,.5]).rounded("shell",[4.3,2.8,4.7],[0,-19,.7],void 0,.9);return n<0?A.rounded("glass",[5.6,1.2,1.4],[-.2,-12.3,3.4],[.08,0,0],.38).rounded("cyan",[3.6,.42,.28],[-.2,-12.3,4.18],[.08,0,0],.12):A.rounded("amber",[1.4,2.8,.32],[2,-12.5,3.5],void 0,.18),A.build(`beauty-hero-${o}-arm`,t)}function s(n){const o=n<0?"left":"right";return new aa().capsule("under",3.8,14.5,[0,-7.2,0],[.03,0,n*.025],[1,1,.92]).rounded(n<0?"cloth":"clothDark",[7.7,10.5,7],[0,-5.4,0],void 0,1.9).rounded("shell",[7.2,5.3,6.6],[0,-13,1.1],[.05,0,0],1.45).capsule("under",3.1,12,[0,-20.2,0],[-.035,0,0]).rounded("rubber",[8.2,7.2,11.2],[0,-27,1.65],[.03,0,0],1.8).rounded("metal",[7.5,2,8.8],[0,-24.2,1],void 0,.65).rounded(n<0?"cyan":"amber",[1.2,3.2,.35],[n*2.8,-23.8,5.55],void 0,.16).build(`beauty-hero-${o}-leg`,t)}const i=new aa().rounded("cloth",[10.5,18,2.2],[-6,-1,-3.9],[.13,-.08,-.08],1).rounded("clothDark",[7.6,16,2],[4.5,-2.2,-4],[.18,.08,.08],.9).rounded("shell",[11.8,15,5.8],[0,5.5,-6.1],[-.05,0,0],2).rounded("metal",[8.6,8.2,1.8],[0,6,-9.4],void 0,.8).cylinder("metal",.85,1,15.5,[6,14,-6],[0,0,-.08],8).sphere("glass",2.1,[6.9,21.5,-5.7],[.8,1,.8]).rounded("cyan",[1.2,2.2,.5],[7,21.6,-3.95],void 0,.22).cylinder("copper",1.25,1.25,8.2,[-7,1.4,-6.6],[0,0,.04],10).rounded("metal",[5.4,7.2,4.6],[7.2,-3.5,0],[0,0,-.06],1.1).rounded("coral",[.5,2.8,.28],[9.95,-3.4,1.4],void 0,.12).build("beauty-hero-equipment",t);return{head:e,torso:a,"left-arm":r(-1),"right-arm":r(1),"left-leg":s(-1),"right-leg":s(1),equipment:i}}function Yc(t,e){const a=new Y(e);for(const[r,s]of t.originals)(r instanceof F||r instanceof L)&&r.color.copy(s).multiply(a)}function jc(){const t=fo(),e=new R;e.name=QA.id,e.userData.assetDNA=QA;const a=new R;a.name="beauty-hero-motion",e.add(a);const r=Object.fromEntries(dt.map(A=>{const l=new R;return l.name=`beauty-hero-${A}-pivot`,[A,l]})),s={head:new S(0,21,0),torso:new S(0,34,0),"left-arm":new S(-10,14,0),"right-arm":new S(10,14,0),"left-leg":new S(-4.8,30,0),"right-leg":new S(4.8,30,0),equipment:new S(0,0,0)};a.add(r.torso,r["left-leg"],r["right-leg"]),r.torso.position.copy(s.torso),r["left-leg"].position.copy(s["left-leg"]),r["right-leg"].position.copy(s["right-leg"]);for(const A of["head","left-arm","right-arm","equipment"])r.torso.add(r[A]),r[A].position.copy(s[A]);const i=Jp(t.byId);for(const A of dt)r[A].add(i[A]);const n=new R;n.name="beauty-hero-right-hand-socket",n.position.set(0,-21.5,1.2),r["right-arm"].add(n);const o={root:e,motionRoot:a,mode:"articulated",partGroups:r,partMeshes:i,mergedMesh:null,weaponSocket:n,materials:t.contract,updatePose(A){const l=ho(A);a.position.set(...l.root.position),a.rotation.set(...l.root.rotation),a.scale.set(...l.root.scale);for(const d of dt){const u=l.parts[d];r[d].position.set(s[d].x+u.position[0],s[d].y+u.position[1],s[d].z+u.position[2]),r[d].rotation.set(...u.rotation),r[d].scale.set(...u.scale)}const c=C.clamp(A.moveAmount??0,0,1);r.equipment.rotation.x+=Math.sin(A.timeSeconds*5.8)*(.018+c*.025),r.head.rotation.y+=Math.sin(A.timeSeconds*.7)*.018},attachWeapon(A,l={x:0,y:0,z:0}){n.add(A),Er(A,l)},setTint(A){Yc(t,A)},dispose(){for(const A of Object.values(i))A.geometry.dispose();for(const A of t.owned)A.dispose();e.removeFromParent()}};return o.updatePose({motion:"idle",timeSeconds:0}),o}function Zp(){const t=fo(),e=new R;e.name=kA.id,e.userData.assetDNA=kA;const a=new R;a.name="beauty-companion-motion",e.add(a);const r=[],s=new aa().rounded("shell",[22,11,13],[0,15,0],void 0,2.8).rounded("metal",[17,4,10],[0,10,0],void 0,1.2).rounded("cloth",[11,6,9],[-3,20.5,-.5],void 0,1.4).rounded("copper",[2,7,9.5],[5.2,17.5,0],void 0,.55).rounded("cyan",[6,.65,.35],[-3,21.6,4.6],void 0,.18).build("beauty-companion-body",t.byId);r.push(s),a.add(s);const i=new R;i.name="beauty-companion-sensor-head",i.position.set(0,17,8.5);const n=new aa().rounded("shell",[13,9,10],[0,0,0],[-.1,0,0],2.3).rounded("glass",[9,2,.9],[0,1,5.1],void 0,.5).rounded("cyan",[6.6,.55,.32],[0,1,5.65],void 0,.16).cylinder("metal",.6,.75,8,[4.3,7.2,-1],[0,0,-.13],8).sphere("amber",1.1,[4.8,11,-.9]).build("beauty-companion-head",t.byId);r.push(n),i.add(n),a.add(i);const o=[new R,new R,new R,new R],A=[[-7.2,12,4.5],[7.2,12,4.5],[-7.2,12,-4.5],[7.2,12,-4.5]];for(let l=0;l<o.length;l+=1){const c=o[l],d=A[l];if(c===void 0||d===void 0)continue;c.name=`beauty-companion-leg-${l+1}`,c.position.set(d[0],d[1],d[2]);const u=new aa().capsule("metal",1.6,9.5,[0,-4,0],[0,0,l%2===0?-.13:.13]).rounded("shell",[4.5,4.2,5],[0,-7.5,.4],void 0,1).capsule("rubber",1.45,8,[0,-11.8,1.6],[.35,0,0]).rounded("rubber",[5.2,2.8,7],[0,-15.2,3],[.08,0,0],.9).rounded(l<2?"cyan":"amber",[.55,2.2,.3],[2.35,-7.4,1.5],void 0,.12).build(`beauty-companion-leg-mesh-${l+1}`,t.byId);r.push(u),c.add(u),a.add(c)}return{root:e,motionRoot:a,sensorHead:i,legGroups:o,updatePose({timeSeconds:l,moveAmount:c=0,reaction:d=0}){const u=C.clamp(c,0,1),h=C.clamp(d,0,1);a.position.y=Math.sin(l*3.2)*.45,a.rotation.z=Math.sin(l*2.1)*.012,i.rotation.y=Math.sin(l*1.15)*.22,i.rotation.x=-.06+Math.sin(l*1.9)*.035;for(let g=0;g<o.length;g+=1){const p=g===0||g===3?0:Math.PI,m=o[g];m!==void 0&&(m.rotation.x=Math.sin(l*8.2+p)*.4*u)}e.scale.setScalar(1+Math.sin(h*Math.PI)*.035)},setTint(l){Yc(t,l)},dispose(){for(const l of r)l.geometry.dispose();for(const l of t.owned)l.dispose();e.removeFromParent()}}}function TA(t){const e=fo(),a=new R;a.name=t==="blade"?"resonance-seam-cutter":"coil-anchor-driver",a.userData.kind=t,a.userData.gripAnchor={x:0,y:0,z:0},a.userData.longAxis="-Y";const r=new aa().rounded("rubber",[4.2,8,4.4],[0,-3,0],void 0,1).rounded("metal",[5.8,6.8,5.6],[0,-9.2,0],void 0,1.25).rounded("copper",[1.1,5,5.9],[2.8,-9.2,0],void 0,.3);t==="blade"?r.rounded("metal",[5.5,24,2.8],[0,-24,0],void 0,.75).rounded("shell",[3.8,18,3.5],[0,-22,0],void 0,.8).rounded("cyan",[.7,22,.38],[2.2,-24,1.65],void 0,.15).rounded("amber",[3,1.1,.35],[0,-14,2],void 0,.16):r.rounded("metal",[8,20,8],[0,-21,0],void 0,1.6).rounded("shell",[6.5,12,8.8],[0,-18,0],void 0,1.4).cylinder("copper",4.4,4.4,2,[0,-16.5,0],void 0,12).cylinder("copper",4.4,4.4,2,[0,-23,0],void 0,12).rounded("coral",[1,8,.4],[4.2,-21,2.5],void 0,.18).rounded("metal",[3.8,12,3.8],[0,-36,0],void 0,.7);const s=r.build(`${a.name}-mesh`,e.byId);return a.add(s),a.userData.dispose=()=>{s.geometry.dispose();for(const i of e.owned)i.dispose();a.removeFromParent()},a}const Ds=Object.freeze({schemaVersion:1,id:"actor.r04.mio-field-engineer-01",generatorVersion:"procedural-stylized-hero-r04-v1",seed:"mio-r04-augmented-surveyor-0417",rigFamily:"humanoid-v1",representation:"realtime-articulated-procedural-3d",frontAxis:"+Z",role:"reclamation field engineer",characterRead:["cute young woman with an alert, optimistic expression","slightly oversized head and slim field-ready silhouette","layered dark hair with a rust textile tie","pale expedition coat over a technical under-suit","compact analysis pack and asymmetrical SF tools"],faceGrammar:["large white-and-amber eyes","independent brows","readable mouth and cheek color","procedural blink and action expressions"],provenance:{source:"procedural runtime geometry",externalAssets:!1,r03SpriteUsedAtRuntime:!1}});class ca{buckets=new Map;add(e,a,r){const s=a.index===null?a:a.toNonIndexed();s!==a&&(a.dispose(),a=s),a.deleteAttribute("uv"),a.applyMatrix4(new fe().compose(new S(...r.position),new ot().setFromEuler(new Ie(...r.rotation??[0,0,0])),new S(...r.scale??[1,1,1])));const i=this.buckets.get(e)??[];return i.push(a),this.buckets.set(e,i),this}rounded(e,a,r,s,i=.6){const[n,o,A]=a;return this.add(e,new li(n,o,A,3,Math.min(i,n*.24,o*.24,A*.24)),{position:r,rotation:s})}capsule(e,a,r,s,i,n){return this.add(e,new Wl(a,Math.max(.2,r-a*2),6,14),{position:s,rotation:i,scale:n})}sphere(e,a,r,s){return this.add(e,new Ai(a,20,14),{position:r,scale:s})}cylinder(e,a,r,s,i){return this.add(e,new ba(a,a,r,14,1),{position:s,rotation:i})}build(e,a){const r=[...this.buckets.keys()];if(r.length===0)throw new Error(`Cannot build empty R04 detail mesh: ${e}`);const s=[];for(const o of r){const A=this.buckets.get(o);if(A===void 0)continue;const l=Cr(A,!1);for(const c of A)c.dispose();if(l===null)throw new Error(`Failed to merge R04 material group: ${e}`);s.push(l)}const i=Cr(s,!0);for(const o of s)o.dispose();if(i===null)throw new Error(`Failed to merge R04 detail mesh: ${e}`);i.computeBoundingBox(),i.computeBoundingSphere();const n=new I(i,r.map(o=>a[o]));return n.name=e,n.castShadow=!0,n.receiveShadow=!0,n}}function wt(t,e={}){return new he({color:t,...e})}function Fr(t,e){return new F({color:new Y(t).multiplyScalar(e),toneMapped:!1})}function $p(){const t={skinShade:wt(14124914,{roughness:.5}),eyeWhite:Fr(16775400,1.45),iris:Fr(8011823,1.08),pupil:wt(1382169,{roughness:.24}),catchlight:Fr(16777215,3.1),brow:wt(9070427,{roughness:.62}),lip:wt(9191236,{roughness:.48}),blush:wt(14316908,{roughness:.64}),hair:wt(14209475,{roughness:.38,sheen:.72,sheenColor:16770751,sheenRoughness:.58}),hairLight:wt(15850940,{roughness:.42,sheen:.55,sheenColor:16773844,sheenRoughness:.62}),coatPale:wt(14080199,{roughness:.67,sheen:.38,sheenColor:15921368,sheenRoughness:.76}),coatShadow:wt(10200218,{roughness:.76,sheen:.22,sheenColor:13950415}),rustTextile:wt(10899257,{roughness:.78,sheen:.32,sheenColor:15043428,sheenRoughness:.82}),underSuit:wt(2107435,{roughness:.72}),metal:wt(6847100,{roughness:.24,metalness:.88,clearcoat:.2,clearcoatRoughness:.24}),glass:wt(2642010,{roughness:.08,metalness:.16,clearcoat:1,clearcoatRoughness:.04}),cyan:Fr(6681829,2.8),amber:Fr(16759131,2.45)},e=new Map;for(const a of Object.values(t))(a instanceof F||a instanceof L)&&e.set(a,a.color.clone());return{byId:t,originals:e,owned:new Set(Object.values(t))}}function RA(t,e){const a=new R;a.name=t<0?"r04-face-eye-left":"r04-face-eye-right",a.position.set(t*2.25,6.15,6.82);const r=new ca().sphere("eyeWhite",1.5,[0,0,0],[1.32,.82,.28]).sphere("iris",.52,[-t*.02,-.08,.46],[.78,1,.22]).sphere("pupil",.24,[-t*.02,-.09,.64],[.7,1,.18]).sphere("catchlight",.15,[-t*.13,.16,.76],[.75,1,.16]).build(`${a.name}-mesh`,e);return a.add(r),{group:a,mesh:r}}function zA(t,e){const a=new R;a.name=t<0?"r04-face-brow-left":"r04-face-brow-right",a.position.set(t*2.2,8.38,7.05);const r=new ca().capsule("brow",.1,1.72,[0,0,0],[0,0,Math.PI/2]).build(`${a.name}-mesh`,e);return a.rotation.z=-t*.11,a.add(r),{group:a,mesh:r}}function em(t){const e=new R;e.name="r04-face-mouth",e.position.set(0,3.45,6.78);const a=new ca().capsule("lip",.13,1.65,[0,.1,0],[0,0,Math.PI/2]).capsule("blush",.1,.9,[.18,-.12,.08],[0,0,Math.PI/2]).build("r04-face-mouth-mesh",t);return e.add(a),{group:e,mesh:a}}function tm(t){return new ca().sphere("skinShade",.38,[0,4.85,6.72],[.72,1,.32]).sphere("blush",.72,[-3.42,4.55,6.45],[1.2,.45,.2]).sphere("blush",.72,[3.42,4.55,6.45],[1.2,.45,.2]).rounded("rustTextile",[1.25,2.9,1.25],[-5.45,5.35,.7],[0,0,.18],.42).build("r04-face-accents",t)}function am(t){return new ca().capsule("hair",.78,4.2,[-3.7,10.1,5.25],[.18,.08,-.5],[1,1,.72]).capsule("hair",.82,4.55,[-1.75,10.35,6.2],[.12,.05,-.22],[1,1,.68]).capsule("hairLight",.72,4.15,[.2,10.55,6.35],[.1,0,.08],[1,1,.65]).capsule("hair",.82,4.5,[2,10.3,6],[.13,-.04,.3],[1,1,.68]).capsule("hair",.72,4,[3.75,9.95,5.1],[.18,-.08,.5],[1,1,.7]).capsule("hairLight",.38,3.2,[-.9,11,6.82],[.1,0,-.08],[1,1,.55]).build("r04-layered-fringe",t)}function rm(t){const e=new R;e.name="r04-layered-ponytail",e.position.set(4.65,9.3,-3.2);const a=new ca().sphere("rustTextile",1.28,[0,0,0],[.86,1,.86]).capsule("hair",1.65,8.8,[2.1,-1.6,-.4],[-.08,.12,-.55],[1,1,.86]).capsule("hairLight",1.25,7.4,[4.1,-4.5,-.9],[-.12,.15,-.68],[1,1,.82]).capsule("hair",1.1,6.2,[5.35,-7.1,-1.4],[-.16,.1,-.82],[1,1,.78]).build("r04-layered-ponytail-mesh",t);return e.add(a),{group:e,mesh:a}}function sm(t){return new ca().rounded("coatPale",[4.9,13.8,1.55],[-3.45,4.7,5.5],[.03,.06,-.08],.72).rounded("coatPale",[4.4,12.7,1.5],[3.35,4.2,5.52],[.03,-.06,.07],.7).rounded("coatShadow",[9.4,2.3,1.45],[0,11.65,5.15],[.08,0,0],.55).rounded("rustTextile",[1.25,13.8,.8],[-.65,4.5,6.38],[-.03,0,.09],.27).rounded("underSuit",[4.6,7.8,.8],[.45,.8,6.14],void 0,.35).rounded("metal",[5.1,1.5,.65],[2.4,8.65,6.3],[0,0,-.08],.3).rounded("glass",[3.4,1.2,.42],[2.65,8.65,6.72],void 0,.22).rounded("cyan",[2.3,.35,.2],[2.7,8.66,6.98],void 0,.08).rounded("amber",[.65,.65,.22],[.25,-2.2,6.1],void 0,.12).build("r04-pale-coat-torso-overlay",t)}function LA(t,e){const a=new R;a.name=t<0?"r04-coat-tail-left":"r04-coat-tail-right",a.position.set(t*3.8,-1.8,1.1);const r=new ca().rounded("coatPale",[6.2,16.5,1.8],[0,-7.5,0],[.11,t*.04,t*.08],.72).rounded("coatShadow",[1.25,13.4,.5],[-t*2.15,-7,1.02],[.1,0,t*.08],.2).rounded("rustTextile",[.8,5.6,.4],[t*2.45,-9.2,1.12],[.1,0,t*.08],.14).build(`${a.name}-mesh`,e);return a.add(r),{group:a,mesh:r}}function im(t){return new ca().rounded("coatShadow",[10.4,13.2,5.8],[0,4.8,-9.15],[-.04,0,0],1.6).rounded("coatPale",[8.8,9.8,2],[0,5,-12.8],void 0,.75).rounded("metal",[7.2,4.4,1.1],[0,7.8,-14.35],void 0,.46).rounded("cyan",[4.2,.5,.24],[-.4,8.15,-14.96],void 0,.1).cylinder("metal",.72,13.5,[5.6,14.2,-10.4],[0,0,-.08]).sphere("glass",1.65,[6.2,21,-10.1],[.82,1,.82]).sphere("amber",.52,[6.25,21.2,-8.62]).rounded("metal",[4.8,7.5,3.2],[-7.2,-4.2,1.1],[0,0,-.08],.8).rounded("glass",[3.4,4.6,.6],[-7.3,-3.8,2.95],void 0,.3).rounded("cyan",[2.2,.35,.2],[-7.3,-3.8,3.32],void 0,.08).cylinder("rustTextile",1.1,7.2,[7.2,-4.6,-2],[0,0,.05]).rounded("amber",[.4,2.7,.24],[8.28,-4.5,-.8],void 0,.1).build("r04-analysis-pack-and-tools",t)}function nm(t,e){const a=new Y(e);for(const[r,s]of t.originals)(r instanceof F||r instanceof L)&&r.color.copy(s).multiply(a)}function om(t){return C.clamp(Number.isFinite(t.progress)?t.progress??0:0,0,1)}function Am(){const t=jc(),e=$p(),a=[],r=t.partGroups.head,s=t.partGroups.torso,i=t.partGroups.equipment;t.root.name=Ds.id,t.root.userData.assetDNA=Ds,t.root.userData.frontAxis=Ds.frontAxis,t.root.userData.runtimeRepresentation=Ds.representation,t.partMeshes.head?.scale.set(1.22,1.16,1.1),t.partMeshes.torso?.scale.set(.79,1.03,.88),t.partMeshes["left-arm"]?.scale.set(.74,1.01,.78),t.partMeshes["right-arm"]?.scale.set(.74,1.01,.78),t.partMeshes["left-leg"]?.scale.set(.81,1.03,.86),t.partMeshes["right-leg"]?.scale.set(.81,1.03,.86),t.partMeshes.equipment?.scale.set(.93,1,.94);const n=Array.isArray(t.partMeshes.head?.material)?t.partMeshes.head.material:[],o=n[0],A=n[1],l=n[2];l instanceof he&&(l.name="r04-inherited-visor-neutralized",l.color.setHex(10213074),l.transparent=!0,l.opacity=.1,l.depthWrite=!1);const c=RA(-1,e.byId),d=RA(1,e.byId),u=zA(-1,e.byId),h=zA(1,e.byId),g=em(e.byId),p=tm(e.byId),m=am(e.byId),f=rm(e.byId);r.add(c.group,d.group,u.group,h.group,g.group,p,m,f.group),a.push(c.mesh,d.mesh,u.mesh,h.mesh,g.mesh,p,m,f.mesh);const w=sm(e.byId);s.add(w),a.push(w);const v=LA(-1,e.byId),y=LA(1,e.byId),P=im(e.byId);i.add(v.group,y.group,P),a.push(v.mesh,y.mesh,P);const b={eyes:[c.group,d.group],brows:[u.group,h.group],mouth:g.group,ponytail:f.group,coatTails:[v.group,y.group]},B={...t,facialRig:b,updatePose:E=>{t.updatePose(E),t.partGroups.head.position.y+=1.25,t.partGroups["left-arm"].position.x+=1.15,t.partGroups["right-arm"].position.x-=1.15,t.partGroups["left-leg"].position.x+=.55,t.partGroups["right-leg"].position.x-=.55;const M=om(E),T=C.clamp(E.moveAmount??0,0,1),k=((E.timeSeconds+.35)%4.1+4.1)%4.1,H=k<.17?Math.sin(k/.17*Math.PI):0,O=E.motion==="hurt"?Math.sin(M*Math.PI):0,X=E.motion==="skill"?Math.sin(M*Math.PI):0,j=E.motion==="windup"||E.motion==="hit"?1:0,ee=Math.max(.12,1-H*.9-O*.38);c.group.scale.set(1+X*.08,ee+X*.08,1),d.group.scale.copy(c.group.scale),u.group.rotation.z=-.11-j*.18+O*.28-X*.08,h.group.rotation.z=.11+j*.18-O*.28+X*.08,u.group.position.y=8.38+O*.32,h.group.position.y=8.38+O*.32,g.group.scale.set(1-j*.18+X*.12,1+O*1.05+X*.72,1),g.group.rotation.z=O*-.08;const J=Math.sin(E.timeSeconds*10.5)*T;f.group.rotation.x=-.12+Math.abs(J)*.12+X*.16,f.group.rotation.z=-.08-J*.16+O*.22,v.group.rotation.x=.05+Math.abs(J)*.14+X*.2,y.group.rotation.x=.04+Math.abs(J)*.12+X*.18,v.group.rotation.z=-J*.055,y.group.rotation.z=J*.055},attachWeapon(E,M){t.attachWeapon(E,M)},setTint(E){t.setTint(E),o instanceof L&&o.color.setHex(15708559).multiply(new Y(E)),A instanceof L&&A.color.setHex(12169122).multiply(new Y(E)),nm(e,E)},dispose(){for(const E of a)E.geometry.dispose();for(const E of e.owned)E.dispose();t.dispose()}};return B.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),B}const lm=.0195,ni=["torso","head","leftUpperArm","leftForearm","leftHand","rightUpperArm","rightForearm","rightHand","leftThigh","leftCalf","leftFoot","rightThigh","rightCalf","rightFoot","equipment"],cm=["skin","hair","hairLight","coat","coatShadow","under","boot","metal","pack","coral","cyan","eye","mouth"],dm={torso:[0,0,0],head:[-11496141224306122e-29,1.313899940074132,-.04060003264374804],leftUpperArm:[.15160002015375185,1.2470999077056653,-.05430001432664182],leftForearm:[.39189997595903403,1.2470999649076275,-.05880002506187798],leftHand:[.6411000087835064,1.2470999118968438,-.05160002670651115],rightUpperArm:[-.15160002015375185,1.2470999077056653,-.05430001432664182],rightForearm:[-.39189997595903403,1.2470999649076275,-.05880002506187798],rightHand:[-.6411000087835064,1.2470999118968438,-.05160002670651115],leftThigh:[.11140000075101851,.7741619836379674,-.051800005247306095],leftCalf:[.11140000075101851,.4384538331528686,-.032299995184177525],leftFoot:[.11140000075101852,.05797396457474334,-.07650000276200015],rightThigh:[-.11140000075101851,.7741619836379674,-.051800005247306095],rightCalf:[-.11140000075101851,.4384538331528686,-.032299995184177525],rightFoot:[-.11140000075101852,.05797396457474334,-.07650000276200015],equipment:[0,0,0]},po=7734,um="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LQD6/wAE//8tAPv/AAT//y0ABAAABP//LQAFAAAEAAAtAPr/AAQAAC0A+/8ABAAALQAEAAAEAQAtAPr/AAQBAC0A+/8ABAEALQAEAAAEAQAtAAUAAAQCAC0A+v8ABAIALQD7/wAEAgAtAAQAAAQDAC0A+v8ABAMALQD7/wAEAwAtAAQAAAQEAC0A+v8ABAQALQD7/wAEBAAtAAMAAAQEAC0ABAAABAUALQD6/wAEBQAtAPv/AAQFAC0AAwAABAYALQD7/wAEBgAtAPz/AAQGAC0AAgAABAYALQADAAAEBwAtAPz/AAQHAC0A/f8ABAcALQD+/wAEBwAtAAEAAAQHAC0AAgAABAgALQD+/wAECAAtAP//AAQIAC0AAAAABAgALQABAAAE+P8uAAAAAAT5/y4A/f8ABPn/LgD+/wAE+f8uAP//AAT5/y4AAAAABPn/LgABAAAE+f8uAAIAAAT6/y4A/P8ABPr/LgD9/wAE+v8uAAIAAAT6/y4AAwAABPv/LgD7/wAE+/8uAPz/AAT7/y4AAwAABPz/LgD7/wAE/P8uAAMAAAT8/y4ABAAABP3/LgD7/wAE/f8uAPz/AAT9/y4ABAAABP7/LgD7/wAE/v8uAAQAAAT+/y4ABQAABP//LgD7/wAE//8uAPz/AAT//y4ABAAABP//LgAFAAAEAAAuAPv/AAQAAC4A/P8ABAAALgAEAAAEAQAuAPv/AAQBAC4A/P8ABAEALgAEAAAEAQAuAAUAAAQCAC4A+/8ABAIALgAEAAAEAgAuAAUAAAQDAC4A+/8ABAMALgD8/wAEAwAuAAQAAAQEAC4A+/8ABAQALgADAAAEBAAuAAQAAAQFAC4A+/8ABAUALgD8/wAEBQAuAAMAAAQGAC4A/P8ABAYALgD9/wAEBgAuAAIAAAQGAC4AAwAABAcALgD9/wAEBwAuAP7/AAQHAC4A//8ABAcALgAAAAAEBwAuAAEAAAQHAC4AAgAABAgALgAAAAAE+f8vAP7/AAT5/y8A//8ABPn/LwAAAAAE+f8vAAEAAAT6/y8A/P8ABPr/LwD9/wAE+v8vAP7/AAT6/y8AAQAABPr/LwACAAAE+/8vAPz/AAT7/y8A/f8ABPv/LwADAAAE/P8vAPz/AAT8/y8AAwAABPz/LwAEAAAE/f8vAPz/AAT9/y8ABAAABP7/LwD8/wAE/v8vAAQAAAT+/y8ABQAABP//LwD8/wAE//8vAAQAAAT//y8ABQAABAAALwD8/wAEAAAvAAQAAAQBAC8A/P8ABAEALwAEAAAEAQAvAAUAAAQCAC8A/P8ABAIALwAEAAAEAgAvAAUAAAQDAC8A/P8ABAMALwAEAAAEBAAvAPz/AAQEAC8AAwAABAQALwAEAAAEBQAvAPz/AAQFAC8A/f8ABAUALwADAAAEBgAvAPz/AAQGAC8A/f8ABAYALwD+/wAEBgAvAAEAAAQGAC8AAgAABAcALwD+/wAEBwAvAP//AAQHAC8AAAAABAcALwABAAAE+v8wAP7/AAT6/zAA//8ABPr/MAAAAAAE+v8wAAEAAAT6/zAAAgAABPv/MAD9/wAE+/8wAAIAAAT7/zAAAwAABPz/MAD8/wAE/P8wAAMAAAT8/zAABAAABP3/MAD8/wAE/f8wAP3/AAT9/zAABAAABP7/MAD8/wAE/v8wAAQAAAT//zAA/P8ABP//MAAEAAAEAAAwAPz/AAQAADAA/f8ABAAAMAAEAAAEAQAwAPz/AAQBADAABAAABAIAMAD8/wAEAgAwAAQAAAQDADAA/P8ABAMAMAD9/wAEAwAwAAQAAAQEADAA/P8ABAQAMAADAAAEBAAwAAQAAAQFADAA/f8ABAUAMAACAAAEBQAwAAMAAAQGADAA/v8ABAYAMAD//wAEBgAwAAAAAAQGADAAAQAABAYAMAACAAAE+v8xAP7/AAT6/zEA//8ABPr/MQAAAAAE+v8xAAEAAAT6/zEAAgAABPv/MQD9/wAE+/8xAP7/AAT7/zEAAgAABPv/MQADAAAE/P8xAP3/AAT8/zEAAwAABPz/MQAEAAAE/f8xAP3/AAT9/zEABAAABP7/MQD8/wAE/v8xAP3/AAT+/zEABQAABP//MQD8/wAE//8xAAUAAAQAADEA/f8ABAAAMQAEAAAEAAAxAAUAAAQBADEA/P8ABAEAMQAFAAAEAgAxAPz/AAQCADEA/f8ABAIAMQAFAAAEAwAxAP3/AAQDADEABAAABAQAMQD9/wAEBAAxAAMAAAQEADEABAAABAUAMQD9/wAEBQAxAP7/AAQFADEAAgAABAUAMQADAAAEBgAxAP7/AAQGADEA//8ABAYAMQAAAAAEBgAxAAEAAAQGADEAAgAABPr/MgD//wAE+v8yAAAAAAT6/zIAAQAABPr/MgACAAAE+/8yAP3/AAT7/zIA/v8ABPv/MgD//wAE+/8yAAIAAAT7/zIAAwAABPz/MgD9/wAE/P8yAAMAAAT8/zIABAAABP3/MgD9/wAE/f8yAAQAAAT9/zIABQAABP7/MgD9/wAE/v8yAAUAAAT//zIA/f8ABP//MgAFAAAEAAAyAP3/AAQAADIABQAABAEAMgD9/wAEAQAyAAUAAAQCADIA/f8ABAIAMgAFAAAEAwAyAP3/AAQDADIABAAABAMAMgAFAAAEBAAyAP3/AAQEADIAAwAABAQAMgAEAAAEBQAyAP3/AAQFADIA/v8ABAUAMgD//wAEBQAyAAIAAAQFADIAAwAABAYAMgD//wAEBgAyAAAAAAQGADIAAQAABAYAMgACAAAE+v8zAAAAAAT6/zMAAQAABPr/MwACAAAE+/8zAP7/AAT7/zMA//8ABPv/MwACAAAE+/8zAAMAAAT8/zMA/f8ABPz/MwADAAAE/P8zAAQAAAT9/zMA/f8ABP3/MwAEAAAE/f8zAAUAAAT+/zMA/f8ABP7/MwAFAAAE//8zAP3/AAT//zMABQAABAAAMwD9/wAEAAAzAAUAAAQBADMA/f8ABAEAMwAFAAAEAgAzAP3/AAQCADMABQAABAMAMwD9/wAEAwAzAAQAAAQDADMABQAABAQAMwD9/wAEBAAzAAMAAAQEADMABAAABAUAMwD+/wAEBQAzAP//AAQFADMAAgAABAUAMwADAAAEBgAzAAAAAAQGADMAAQAABAYAMwACAAAE+v80AP//AAT6/zQAAAAABPr/NAABAAAE+v80AAIAAAT7/zQA/f8ABPv/NAD+/wAE+/80AP//AAT7/zQAAwAABPv/NAAEAAAE/P80AP3/AAT8/zQABAAABP3/NAD8/wAE/f80AP3/AAT9/zQABQAABP7/NAD8/wAE/v80AP3/AAT+/zQABQAABP//NAD9/wAE//80AAUAAAQAADQA/f8ABAAANAAFAAAEAQA0AP3/AAQBADQABQAABAIANAD8/wAEAgA0AP3/AAQCADQABQAABAMANAD8/wAEAwA0AP3/AAQDADQABQAABAQANAD9/wAEBAA0AAQAAAQFADQA/f8ABAUANAD+/wAEBQA0AP//AAQFADQAAwAABAUANAAEAAAEBgA0AP//AAQGADQAAAAABAYANAABAAAEBgA0AAIAAAT6/zUA//8ABPr/NQAAAAAE+v81AAEAAAT6/zUAAgAABPr/NQADAAAE+/81AP3/AAT7/zUA/v8ABPv/NQD//wAE+/81AAMAAAT7/zUABAAABPv/NQAFAAAE/P81APz/AAT8/zUABAAABPz/NQAFAAAE/f81APz/AAT9/zUABQAABP7/NQD8/wAE/v81AAUAAAT+/zUABgAABP//NQD8/wAE//81AP3/AAT//zUABQAABP//NQAGAAAEAAA1AP3/AAQAADUABQAABAEANQD8/wAEAQA1AP3/AAQBADUABQAABAEANQAGAAAEAgA1APz/AAQCADUABQAABAIANQAGAAAEAwA1APz/AAQDADUABQAABAQANQD8/wAEBAA1AAQAAAQEADUABQAABAUANQD9/wAEBQA1AP7/AAQFADUA//8ABAUANQADAAAEBQA1AAQAAAQFADUABQAABAYANQD//wAEBgA1AAAAAAQGADUAAQAABAYANQACAAAEBgA1AAMAAAT6/zYA/f8ABPr/NgD+/wAE+v82AP//AAT6/zYAAAAABPr/NgABAAAE+v82AAIAAAT6/zYAAwAABPv/NgD8/wAE+/82AP3/AAT7/zYAAwAABPv/NgAEAAAE+/82AAUAAAT8/zYA/P8ABPz/NgAFAAAE/f82APz/AAT9/zYABQAABP3/NgAGAAAE/v82APz/AAT+/zYABQAABP7/NgAGAAAE//82APz/AAT//zYABgAABAAANgD9/wAEAAA2AAUAAAQBADYA/P8ABAEANgAGAAAEAgA2APz/AAQCADYABQAABAIANgAGAAAEAwA2APz/AAQDADYABQAABAMANgAGAAAEBAA2APz/AAQEADYABQAABAUANgD8/wAEBQA2AP3/AAQFADYAAwAABAUANgAEAAAEBQA2AAUAAAQGADYA/f8ABAYANgD+/wAEBgA2AP//AAQGADYAAAAABAYANgABAAAEBgA2AAIAAAQGADYAAwAABPn/NwD+/wAE+v83AP3/AAT6/zcA/v8ABPr/NwD//wAE+v83AAAAAAT6/zcAAQAABPr/NwACAAAE+v83AAMAAAT6/zcABAAABPv/NwD8/wAE+/83AAQAAAT7/zcABQAABPz/NwD7/wAE/P83APz/AAT8/zcABQAABPz/NwAGAAAE/f83APz/AAT9/zcABgAABP7/NwD8/wAE/v83AAYAAAT//zcA/P8ABP//NwAGAAAEAAA3APz/AAQAADcABQAABAEANwD8/wAEAQA3AAYAAAQCADcA/P8ABAIANwAGAAAEAwA3APz/AAQDADcABgAABAQANwD7/wAEBAA3APz/AAQEADcABQAABAQANwAGAAAEBQA3APz/AAQFADcABAAABAUANwAFAAAEBgA3AP3/AAQGADcA/v8ABAYANwD//wAEBgA3AAAAAAQGADcAAQAABAYANwACAAAEBgA3AAMAAAQGADcABAAABAcANwD+/wAE+f84AP7/AAT5/zgA//8ABPn/OAAAAAAE+v84APz/AAT6/zgA/f8ABPr/OAD+/wAE+v84AAEAAAT6/zgAAgAABPr/OAADAAAE+v84AAQAAAT7/zgA+/8ABPv/OAD8/wAE+/84AAQAAAT7/zgABQAABPz/OAD7/wAE/P84AAUAAAT8/zgABgAABP3/OAD7/wAE/f84AAYAAAT+/zgA+/8ABP7/OAD8/wAE/v84AAYAAAT//zgA/P8ABP//OAAGAAAEAAA4APz/AAQAADgABgAABAEAOAD8/wAEAQA4AAYAAAQCADgA+/8ABAIAOAD8/wAEAgA4AAYAAAQDADgA+/8ABAMAOAAGAAAEBAA4APv/AAQEADgABQAABAQAOAAGAAAEBQA4APv/AAQFADgA/P8ABAUAOAAEAAAEBQA4AAUAAAQGADgA/P8ABAYAOAD9/wAEBgA4AP7/AAQGADgAAQAABAYAOAACAAAEBgA4AAMAAAQGADgABAAABAcAOAD+/wAEBwA4AP//AAQHADgAAAAABPn/OQD9/wAE+f85AP7/AAT5/zkA//8ABPn/OQAAAAAE+f85AAEAAAT5/zkABAAABPr/OQD8/wAE+v85AAEAAAT6/zkAAgAABPr/OQADAAAE+v85AAQAAAT6/zkABQAABPr/OQAGAAAE+/85APv/AAT7/zkABQAABPv/OQAGAAAE/P85APv/AAT8/zkABgAABPz/OQAHAAAE/f85APv/AAT9/zkABgAABP3/OQAHAAAE/v85APv/AAT+/zkABgAABP//OQD7/wAE//85AAYAAAQAADkA+/8ABAAAOQD8/wAEAAA5AAYAAAQBADkA+/8ABAEAOQAGAAAEAgA5APv/AAQCADkABgAABAMAOQD7/wAEAwA5AAYAAAQDADkABwAABAQAOQD7/wAEBAA5AAYAAAQEADkABwAABAUAOQD7/wAEBQA5AAUAAAQFADkABgAABAYAOQD8/wAEBgA5AAEAAAQGADkAAgAABAYAOQADAAAEBgA5AAQAAAQGADkABQAABAYAOQAGAAAEBwA5AP3/AAQHADkA/v8ABAcAOQD//wAEBwA5AAAAAAQHADkAAQAABAcAOQAEAAAE+f86APz/AAT5/zoA/f8ABPn/OgD+/wAE+f86AP//AAT5/zoAAAAABPn/OgACAAAE+f86AAMAAAT5/zoABAAABPn/OgAFAAAE+v86APv/AAT6/zoA/P8ABPr/OgABAAAE+v86AAIAAAT6/zoAAwAABPr/OgAGAAAE+/86APv/AAT7/zoABwAABPz/OgD6/wAE/P86APv/AAT8/zoABwAABP3/OgD6/wAE/f86APv/AAT9/zoABgAABP3/OgAHAAAE/v86APr/AAT+/zoA+/8ABP7/OgAGAAAE/v86AAcAAAT//zoA+/8ABP//OgAGAAAEAAA6APv/AAQAADoABgAABAEAOgD7/wAEAQA6AAYAAAQCADoA+v8ABAIAOgD7/wAEAgA6AAYAAAQCADoABwAABAMAOgD6/wAEAwA6APv/AAQDADoABgAABAMAOgAHAAAEBAA6APr/AAQEADoA+/8ABAQAOgAHAAAEBQA6APv/AAQFADoABwAABAYAOgD7/wAEBgA6APz/AAQGADoAAQAABAYAOgACAAAEBgA6AAMAAAQGADoABgAABAcAOgD8/wAEBwA6AP3/AAQHADoA/v8ABAcAOgD//wAEBwA6AAAAAAQHADoAAgAABAcAOgADAAAEBwA6AAQAAAQHADoABQAABPj/OwD9/wAE+f87APv/AAT5/zsA/P8ABPn/OwD9/wAE+f87AP7/AAT5/zsA//8ABPn/OwAAAAAE+f87AAIAAAT5/zsAAwAABPn/OwAEAAAE+f87AAUAAAT5/zsABgAABPr/OwD7/wAE+v87AAAAAAT6/zsAAQAABPr/OwACAAAE+v87AAYAAAT7/zsA+v8ABPv/OwAHAAAE/P87APr/AAT8/zsABwAABP3/OwD6/wAE/f87AAcAAAT+/zsA+v8ABP7/OwAGAAAE/v87AAcAAAT//zsA+v8ABP//OwAFAAAE//87AAYAAAQAADsA+v8ABAAAOwD7/wAEAAA7AAUAAAQAADsABgAABAEAOwD6/wAEAQA7AAUAAAQBADsABgAABAIAOwD6/wAEAgA7AAYAAAQCADsABwAABAMAOwD6/wAEAwA7AAcAAAQEADsA+v8ABAQAOwAHAAAEBQA7APr/AAQFADsABwAABAYAOwD7/wAEBgA7AAAAAAQGADsAAQAABAYAOwACAAAEBgA7AAYAAAQHADsA+/8ABAcAOwD8/wAEBwA7AP3/AAQHADsA/v8ABAcAOwD//wAEBwA7AAAAAAQHADsAAgAABAcAOwADAAAEBwA7AAQAAAQHADsABQAABAcAOwAGAAAECAA7AP3/AAT4/zwA/P8ABPj/PAD9/wAE+f88APv/AAT5/zwA/P8ABPn/PAD9/wAE+f88AP7/AAT5/zwA//8ABPn/PAAAAAAE+f88AAEAAAT5/zwAAgAABPn/PAADAAAE+f88AAQAAAT5/zwABQAABPr/PAD6/wAE+v88APv/AAT6/zwAAAAABPr/PAABAAAE+v88AAIAAAT6/zwABQAABPr/PAAGAAAE+/88APr/AAT7/zwABgAABPv/PAAHAAAE/P88APr/AAT8/zwABwAABP3/PAD6/wAE/f88AAYAAAT9/zwABwAABP7/PAD6/wAE/v88AAYAAAT//zwA+v8ABP//PAAFAAAE//88AAYAAAQAADwA+v8ABAAAPAAFAAAEAQA8APr/AAQBADwABQAABAEAPAAGAAAEAgA8APr/AAQCADwABgAABAMAPAD6/wAEAwA8AAYAAAQDADwABwAABAQAPAD6/wAEBAA8AAcAAAQFADwA+v8ABAUAPAAGAAAEBQA8AAcAAAQGADwA+v8ABAYAPAD7/wAEBgA8AAAAAAQGADwAAQAABAYAPAACAAAEBgA8AAUAAAQGADwABgAABAcAPAD7/wAEBwA8APz/AAQHADwA/f8ABAcAPAD+/wAEBwA8AP//AAQHADwAAAAABAcAPAABAAAEBwA8AAIAAAQHADwAAwAABAcAPAAEAAAEBwA8AAUAAAQIADwA/P8ABAgAPAD9/wAE+P89APz/AAT5/z0A+/8ABPn/PQD8/wAE+f89AP7/AAT5/z0A//8ABPn/PQAAAAAE+f89AAEAAAT5/z0AAgAABPn/PQADAAAE+f89AAQAAAT6/z0A+v8ABPr/PQD7/wAE+v89AAMAAAT6/z0ABAAABPr/PQAFAAAE+v89AAYAAAT7/z0A+v8ABPv/PQAFAAAE+/89AAYAAAT8/z0A+v8ABPz/PQAGAAAE/f89APr/AAT9/z0ABgAABP7/PQD5/wAE/v89APr/AAT+/z0ABQAABP7/PQAGAAAE//89APr/AAT//z0ABQAABAAAPQD6/wAEAAA9AAUAAAQBAD0A+v8ABAEAPQAFAAAEAgA9APn/AAQCAD0A+v8ABAIAPQAFAAAEAgA9AAYAAAQDAD0A+v8ABAMAPQAGAAAEBAA9APr/AAQEAD0ABgAABAUAPQD6/wAEBQA9AAUAAAQFAD0ABgAABAYAPQD6/wAEBgA9APv/AAQGAD0AAwAABAYAPQAEAAAEBgA9AAUAAAQGAD0ABgAABAcAPQD7/wAEBwA9APz/AAQHAD0A/v8ABAcAPQD//wAEBwA9AAAAAAQHAD0AAQAABAcAPQACAAAEBwA9AAMAAAQHAD0ABAAABAgAPQD8/wAE+P8+AP//AAT4/z4AAAAABPn/PgD7/wAE+f8+AP//AAT5/z4AAAAABPn/PgABAAAE+f8+AAIAAAT6/z4A+v8ABPr/PgD7/wAE+v8+AAIAAAT6/z4AAwAABPr/PgAEAAAE+/8+APr/AAT7/z4AAwAABPv/PgAEAAAE+/8+AAUAAAT7/z4ABgAABPz/PgD6/wAE/P8+AAQAAAT8/z4ABQAABPz/PgAGAAAE/f8+APr/AAT9/z4ABAAABP3/PgAFAAAE/f8+AAYAAAT+/z4A+f8ABP7/PgAEAAAE/v8+AAUAAAT//z4A+f8ABP//PgD6/wAE//8+AAQAAAT//z4ABQAABAAAPgD6/wAEAAA+AAQAAAQBAD4A+f8ABAEAPgD6/wAEAQA+AAQAAAQBAD4ABQAABAIAPgD5/wAEAgA+AAQAAAQCAD4ABQAABAMAPgD6/wAEAwA+AAQAAAQDAD4ABQAABAMAPgAGAAAEBAA+APr/AAQEAD4ABAAABAQAPgAFAAAEBAA+AAYAAAQFAD4A+v8ABAUAPgADAAAEBQA+AAQAAAQFAD4ABQAABAUAPgAGAAAEBgA+APr/AAQGAD4A+/8ABAYAPgACAAAEBgA+AAMAAAQGAD4ABAAABAcAPgD7/wAEBwA+AP//AAQHAD4AAAAABAcAPgABAAAEBwA+AAIAAAQIAD4A//8ABAgAPgAAAAAE+P8/AAAAAAT5/z8A+/8ABPn/PwAAAAAE+f8/AAEAAAT6/z8A+v8ABPr/PwD7/wAE+v8/AAIAAAT6/z8AAwAABPv/PwD6/wAE+/8/AAIAAAT7/z8AAwAABPz/PwD6/wAE/P8/AAMAAAT8/z8ABAAABP3/PwD5/wAE/f8/APr/AAT9/z8AAwAABP3/PwAEAAAE/v8/APn/AAT+/z8AAwAABP7/PwAEAAAE//8/APn/AAT//z8AAwAABP//PwAEAAAEAAA/APr/AAQAAD8AAwAABAAAPwAEAAAEAQA/APn/AAQBAD8AAwAABAEAPwAEAAAEAgA/APn/AAQCAD8AAwAABAIAPwAEAAAEAwA/APn/AAQDAD8A+v8ABAMAPwADAAAEAwA/AAQAAAQEAD8A+v8ABAQAPwADAAAEBAA/AAQAAAQFAD8A+v8ABAUAPwACAAAEBQA/AAMAAAQGAD8A+v8ABAYAPwD7/wAEBgA/AAIAAAQGAD8AAwAABAcAPwD7/wAEBwA/AAAAAAQHAD8AAQAABAgAPwAAAAAE+P9AAAAAAAT5/0AA+/8ABPn/QAAAAAAE+f9AAAEAAAT6/0AA+v8ABPr/QAD7/wAE+v9AAAEAAAT6/0AAAgAABPv/QAD6/wAE+/9AAPv/AAT7/0AAAQAABPv/QAACAAAE/P9AAPr/AAT8/0AAAgAABPz/QAADAAAE/f9AAPr/AAT9/0AAAgAABP3/QAADAAAE/v9AAPn/AAT+/0AA+v8ABP7/QAACAAAE/v9AAAMAAAT//0AA+f8ABP//QAD6/wAE//9AAAIAAAT//0AAAwAABAAAQAD6/wAEAABAAAIAAAQAAEAAAwAABAEAQAD5/wAEAQBAAPr/AAQBAEAAAgAABAEAQAADAAAEAgBAAPn/AAQCAEAA+v8ABAIAQAACAAAEAgBAAAMAAAQDAEAA+v8ABAMAQAACAAAEAwBAAAMAAAQEAEAA+v8ABAQAQAACAAAEBABAAAMAAAQFAEAA+v8ABAUAQAD7/wAEBQBAAAEAAAQFAEAAAgAABAYAQAD6/wAEBgBAAPv/AAQGAEAAAQAABAYAQAACAAAEBwBAAPv/AAQHAEAAAAAABAcAQAABAAAECABAAAAAAAT4/0EA//8ABPj/QQAAAAAE+f9BAPv/AAT5/0EA//8ABPn/QQAAAAAE+f9BAAEAAAT6/0EA+/8ABPr/QQD//wAE+v9BAAAAAAT6/0EAAQAABPv/QQD7/wAE+/9BAAAAAAT7/0EAAQAABPz/QQD6/wAE/P9BAPv/AAT8/0EAAQAABP3/QQD6/wAE/f9BAAEAAAT9/0EAAgAABP7/QQD6/wAE/v9BAAEAAAT+/0EAAgAABP//QQD6/wAE//9BAAEAAAT//0EAAgAABAAAQQD6/wAEAABBAAEAAAQAAEEAAgAABAEAQQD6/wAEAQBBAAEAAAQBAEEAAgAABAIAQQD6/wAEAgBBAAEAAAQCAEEAAgAABAMAQQD6/wAEAwBBAAEAAAQDAEEAAgAABAQAQQD6/wAEBABBAPv/AAQEAEEAAQAABAUAQQD7/wAEBQBBAAAAAAQFAEEAAQAABAYAQQD7/wAEBgBBAP//AAQGAEEAAAAABAYAQQABAAAEBwBBAPv/AAQHAEEA//8ABAcAQQAAAAAEBwBBAAEAAAQIAEEA//8ABAgAQQAAAAAE+P9CAP//AAT5/0IA+/8ABPn/QgD8/wAE+f9CAP3/AAT5/0IA/v8ABPn/QgD//wAE+v9CAPv/AAT6/0IA/P8ABPr/QgD9/wAE+v9CAP7/AAT6/0IA//8ABPv/QgD7/wAE+/9CAPz/AAT7/0IA/v8ABPv/QgD//wAE+/9CAAAAAAT8/0IA+/8ABPz/QgD//wAE/P9CAAAAAAT8/0IAAQAABP3/QgD6/wAE/f9CAPv/AAT9/0IAAAAABP3/QgABAAAE/v9CAPr/AAT+/0IAAAAABP7/QgABAAAE//9CAPr/AAT//0IAAAAABP//QgABAAAEAABCAPr/AAQAAEIAAAAABAAAQgABAAAEAQBCAPr/AAQBAEIAAAAABAEAQgABAAAEAgBCAPr/AAQCAEIAAAAABAIAQgABAAAEAwBCAPr/AAQDAEIA+/8ABAMAQgAAAAAEAwBCAAEAAAQEAEIA+/8ABAQAQgD//wAEBABCAAAAAAQEAEIAAQAABAUAQgD7/wAEBQBCAPz/AAQFAEIA/v8ABAUAQgD//wAEBQBCAAAAAAQGAEIA+/8ABAYAQgD8/wAEBgBCAP3/AAQGAEIA/v8ABAYAQgD//wAEBwBCAPv/AAQHAEIA/P8ABAcAQgD9/wAEBwBCAP7/AAQHAEIA//8ABAgAQgD//wAE+P9DAP7/AAT5/0MA/f8ABPn/QwD+/wAE+v9DAP3/AAT6/0MA/v8ABPv/QwD8/wAE+/9DAP3/AAT7/0MA/v8ABPz/QwD7/wAE/P9DAPz/AAT8/0MA/f8ABPz/QwD+/wAE/P9DAP//AAT9/0MA+/8ABP3/QwD8/wAE/f9DAP7/AAT9/0MA//8ABP3/QwAAAAAE/v9DAPr/AAT+/0MA+/8ABP7/QwD//wAE/v9DAAAAAAT//0MA+v8ABP//QwD7/wAE//9DAAAAAAQAAEMA+/8ABAAAQwAAAAAEAQBDAPr/AAQBAEMA+/8ABAEAQwAAAAAEAgBDAPr/AAQCAEMA+/8ABAIAQwD//wAEAgBDAAAAAAQDAEMA+/8ABAMAQwD8/wAEAwBDAP7/AAQDAEMA//8ABAMAQwAAAAAEBABDAPv/AAQEAEMA/P8ABAQAQwD9/wAEBABDAP7/AAQEAEMA//8ABAUAQwD8/wAEBQBDAP3/AAQFAEMA/v8ABAYAQwD9/wAEBgBDAP7/AAQHAEMA/f8ABAcAQwD+/wAECABDAP7/AAT8/0QA/P8ABPz/RAD9/wAE/f9EAPv/AAT9/0QA/P8ABP3/RAD+/wAE/v9EAPv/AAT//0QA+/8ABAEARAD7/wAEAgBEAPv/AAQDAEQA+/8ABAMARAD8/wAEAwBEAP7/AAQEAEQA/P8ABAQARAD9/wEA/v8AAAIAAQD//wAAAgABAAAAAAACAAEAAQAAAAIAAQACAAAAAgABAPz/AQD//wEA/f8BAP3/AQD9/wEA/v8BAP3/AQD//wEA/f8BAAAAAQD+/wEA/f8BAP7/AQAAAAEA/v8BAAEAAQD+/wEAAgABAP//AQD9/wEA//8BAAIAAQAAAAEA/f8BAAAAAQACAAEAAQABAP3/AQABAAEAAgABAAIAAQD9/wEAAgABAAAAAQACAAEAAQABAAIAAQACAAEAAwABAP3/AQADAAEA/v8BAAMAAQD//wEAAwABAAAAAQAEAAEA//8BAP3/AgD+/wEA/f8CAP//AQD9/wIAAAABAP7/AgD9/wEA/v8CAP7/AQD+/wIAAAABAP7/AgABAAEA/v8CAAIAAQD//wIA/f8BAP//AgACAAEAAAACAP3/AQAAAAIAAgABAAEAAgD9/wEAAQACAAIAAQACAAIA/f8BAAIAAgD+/wEAAgACAAAAAQACAAIAAQABAAIAAgACAAEAAwACAP7/AQADAAIA//8BAAMAAgAAAAEA/f8DAP//AQD+/wMA/v8BAP7/AwD//wEA/v8DAAAAAQD+/wMAAQABAP7/AwACAAEA//8DAP3/AQD//wMAAgABAP//AwADAAEA//8DAAQAAQD//wMABQABAP//AwAGAAEAAAADAP3/AQAAAAMA/v8BAAAAAwADAAEAAAADAAQAAQAAAAMABQABAAAAAwAGAAEAAQADAP3/AQABAAMAAgABAAEAAwADAAEAAQADAAQAAQABAAMABQABAAEAAwAGAAEAAgADAP7/AQACAAMA//8BAAIAAwAAAAEAAgADAAEAAQACAAMAAgABAAMAAwD//wEA/v8EAP7/AQD+/wQA//8BAP7/BAAAAAEA/v8EAAEAAQD+/wQAAgABAP7/BAADAAEA/v8EAAQAAQD+/wQABQABAP//BAD9/wEA//8EAP7/AQD//wQAAwABAP//BAAEAAEA//8EAAUAAQD//wQABgABAAAABAD+/wEAAAAEAAYAAQABAAQA/f8BAAEABAD+/wEAAQAEAAMAAQABAAQABAABAAEABAAFAAEAAQAEAAYAAQACAAQA/v8BAAIABAD//wEAAgAEAAAAAQACAAQAAQABAAIABAACAAEAAgAEAAMAAQACAAQABAABAAIABAAFAAEA/f8FAAAAAQD9/wUAAQABAP3/BQACAAEA/f8FAAQAAQD+/wUA/v8BAP7/BQD//wEA/v8FAAAAAQD+/wUAAgABAP7/BQADAAEA/v8FAAQAAQD+/wUABQABAP7/BQAGAAEA//8FAP7/AQD//wUABQABAP//BQAGAAEAAAAFAP7/AQAAAAUABgABAAAABQAHAAEAAQAFAP7/AQABAAUABQABAAEABQAGAAEAAgAFAP7/AQACAAUA//8BAAIABQAAAAEAAgAFAAIAAQACAAUAAwABAAIABQAEAAEAAgAFAAUAAQACAAUABgABAAMABQAAAAEAAwAFAAEAAQADAAUAAgABAAMABQAEAAEA/f8GAAAAAQD9/wYAAQABAP3/BgACAAEA/f8GAAUAAQD+/wYA//8BAP7/BgAFAAEA/v8GAAYAAQD//wYABgABAP//BgAHAAEAAAAGAAYAAQAAAAYABwABAAEABgAGAAEAAQAGAAcAAQACAAYA//8BAAIABgAFAAEAAgAGAAYAAQADAAYAAAABAAMABgABAAEAAwAGAAIAAQADAAYABQABAPz/BwABAAEA/f8HAAEAAQD9/wcAAgABAP3/BwAFAAEA/v8HAAYAAQD//wcABgABAP//BwAHAAEAAAAHAAcAAQAAAAcACAABAAEABwAGAAEAAQAHAAcAAQACAAcABgABAAMABwABAAEAAwAHAAIAAQADAAcABQABAAQABwABAAEA/P8IAAEAAQD9/wgAAgABAP7/CAD+/wEA/v8IAAYAAQD//wgABgABAP//CAAHAAEAAAAIAAcAAQAAAAgACAABAAAACAALAAEAAQAIAAYAAQABAAgABwABAAIACAD+/wEAAgAIAAYAAQADAAgAAgABAAMACAAFAAEABAAIAAEAAQD7/wkAAAABAP3/CQD//wEA/f8JAAAAAQD9/wkABgABAP7/CQAFAAEA/v8JAAYAAQD//wkA/f8BAP//CQAFAAEA//8JAAYAAQAAAAkABgABAAAACQAHAAEAAQAJAP3/AQABAAkABQABAAEACQAGAAEAAgAJAAUAAQACAAkABgABAAMACQD//wEAAwAJAAAAAQADAAkABQABAAMACQAGAAEABQAJAAAAAQD9/woA//8BAP//CgD9/wEA//8KAAYAAQD//woABwABAAEACgD9/wEAAQAKAAYAAQABAAoABwABAAIACgAGAAEAAwAKAP//AQADAAoABQABAAMACgAGAAEA/f8LAAMAAQD//wsA/f8BAAEACwD9/wEAAQALAAYAAQADAAsAAwABAP3/DAACAAEA/f8MAAMAAQD+/wwA/v8BAP//DAD9/wEAAAAMAP3/AQABAAwA/f8BAAIADAD+/wEAAwAMAAIAAQADAAwAAwABAP3/DQABAAEA/f8NAAIAAQD+/w0A//8BAP7/DQAEAAEA//8NAP7/AQABAA0A/v8BAAIADQD//wEAAgANAAQAAQADAA0AAQABAAMADQACAAEA/v8OAP//AQD+/w4AAQABAP//DgD//wEA//8OAAMAAQD//w4ABAABAAAADgD//wEAAQAOAP//AQABAA4AAwABAAEADgAEAAEAAgAOAP//AQACAA4AAQABAfj//v8AAAEB+f/+////AQEHAP7///8BAQgA/v8AAAEB+P///wAAAQH5//////8BAQcA/////wEBCAD//wAAAQH4/wAAAQABAfn/AAAAAAEBBwAAAAAAAQEIAAAAAQABAfj/AQABAAEB+f8BAAAAAQEHAAEAAAABAQgAAQABAAEB+P8DAAEAAQH5/wMAAAABAfz/AwADAAEB/P8DAAQAAQEEAAMAAwABAQQAAwAEAAEBBwADAAAAAQEIAAMAAQABAfj/BAABAAEB+f8EAAAAAQH8/wQAAgABAfz/BAADAAEB/P8EAAQAAQH8/wQABQABAQQABAACAAEBBAAEAAMAAQEEAAQABAABAQQABAAFAAEBBwAEAAAAAQEIAAQAAQABAfn/BQACAAEB+v8FAAEAAQH8/wUAAgABAfz/BQADAAEB/P8FAAQAAQH9/wUAAwABAQMABQADAAEBBAAFAAIAAQEEAAUAAwABAQQABQAEAAEBBgAFAAEAAQEHAAUAAgABAfz/BgACAAEB/P8GAAMAAQH8/wYABAABAf3/BgADAAEB/f8GAAQAAQH+/wYA/v8BAf7/BgAAAAEB//8GAP7/AQH//wYA//8BAQAABgD+/wEBAQAGAP7/AQEBAAYA//8BAQIABgD+/wEBAgAGAAAAAQEDAAYAAwABAQMABgAEAAEBBAAGAAIAAQEEAAYAAwABAQQABgAEAAEB+f8HAAIAAQH6/wcAAQABAfz/BwACAAEB/P8HAAMAAQH8/wcABAABAf3/BwD9/wEB/f8HAP7/AQH9/wcA//8BAf3/BwAAAAEB/f8HAAMAAQH9/wcABAABAf7/BwD9/wEB/v8HAP7/AQH+/wcA//8BAf7/BwAAAAEB//8HAP3/AQH//wcA/v8BAQAABwD9/wEBAAAHAP7/AQEBAAcA/f8BAQEABwD+/wEBAgAHAP3/AQECAAcA/v8BAQIABwD//wEBAgAHAAAAAQEDAAcA/f8BAQMABwD+/wEBAwAHAP//AQEDAAcAAAABAQMABwADAAEBAwAHAAQAAQEEAAcAAgABAQQABwADAAEBBAAHAAQAAQEGAAcAAQABAQcABwACAAEB+v8IAAEAAQH8/wgA//8BAfz/CAAAAAEB/P8IAAIAAQH8/wgAAwABAfz/CAAEAAEB/P8IAAUAAQH9/wgA/f8BAf3/CAD+/wEB/f8IAP//AQH9/wgAAAABAf3/CAABAAEB/f8IAAMAAQH9/wgABAABAf3/CAAFAAEB/v8IAPz/AQH+/wgA/f8BAf//CAD8/wEB//8IAP3/AQEAAAgA/P8BAQAACAD9/wEBAQAIAPz/AQEBAAgA/f8BAQIACAD8/wEBAgAIAP3/AQEDAAgA/f8BAQMACAD+/wEBAwAIAP//AQEDAAgAAAABAQMACAABAAEBAwAIAAMAAQEDAAgABAABAQQACAD//wEBBAAIAAAAAQEEAAgAAgABAQQACAADAAEBBAAIAAQAAQEEAAgABQABAQYACAABAAEB+v8JAP7/AQH6/wkAAgABAfv/CQD9/wEB+/8JAP7/AQH8/wkA/f8BAfz/CQD+/wEB/P8JAP//AQH8/wkAAAABAfz/CQABAAEB/P8JAAIAAQH8/wkAAwABAfz/CQAEAAEB/P8JAAUAAQH9/wkA/f8BAf3/CQD+/wEB/f8JAAQAAQH9/wkABQABAf7/CQD8/wEB/v8JAP3/AQH//wkA/P8BAQAACQD8/wEBAQAJAPz/AQECAAkA/P8BAQIACQD9/wEBAwAJAP3/AQEDAAkA/v8BAQMACQAEAAEBBAAJAP3/AQEEAAkA/v8BAQQACQD//wEBBAAJAAAAAQEEAAkAAQABAQQACQACAAEBBAAJAAMAAQEEAAkABAABAQQACQAFAAEBBQAJAP3/AQEFAAkA/v8BAQYACQD+/wEBBgAJAAIAAQH5/woA/P8BAfn/CgD9/wEB+f8KAP7/AQH6/woA/P8BAfr/CgD9/wEB+v8KAP7/AQH6/woA//8BAfr/CgAAAAEB+v8KAAIAAQH7/woA/P8BAfv/CgD9/wEB+/8KAP7/AQH7/woA//8BAfv/CgAAAAEB/P8KAP3/AQH8/woA/v8BAfz/CgD//wEB/P8KAAAAAQH8/woAAQABAfz/CgACAAEB/P8KAAMAAQH8/woABAABAfz/CgAFAAEB/f8KAP3/AQH9/woA/v8BAf3/CgAEAAEB/f8KAAUAAQH9/woABgABAf7/CgD8/wEB/v8KAP3/AQH+/woABgABAf//CgD8/wEBAAAKAPz/AQEAAAoABwABAQEACgD8/wEBAgAKAPz/AQECAAoA/f8BAQIACgAHAAEBAwAKAP3/AQEDAAoA/v8BAQMACgAEAAEBBAAKAP3/AQEEAAoA/v8BAQQACgD//wEBBAAKAAAAAQEEAAoAAQABAQQACgACAAEBBAAKAAMAAQEEAAoABAABAQQACgAFAAEBBQAKAPz/AQEFAAoA/f8BAQUACgD+/wEBBQAKAP//AQEFAAoAAAABAQYACgD8/wEBBgAKAP3/AQEGAAoA/v8BAQYACgD//wEBBgAKAAAAAQEGAAoAAgABAQcACgD8/wEBBwAKAP3/AQEHAAoA/v8BAfn/CwD8/wEB+f8LAP3/AQH5/wsA/v8BAfn/CwD//wEB+f8LAAAAAQH6/wsA+/8BAfr/CwD8/wEB+v8LAP//AQH6/wsAAAABAfv/CwD7/wEB+/8LAPz/AQH7/wsAAAABAfv/CwABAAEB/P8LAPz/AQH8/wsA/f8BAfz/CwD+/wEB/P8LAP//AQH8/wsAAAABAfz/CwABAAEB/P8LAAIAAQH8/wsAAwABAfz/CwAEAAEB/P8LAAUAAQH9/wsA/f8BAf3/CwD+/wEB/f8LAP//AQH9/wsABAABAf3/CwAFAAEB/f8LAAYAAQH+/wsA/P8BAf7/CwD9/wEB/v8LAAUAAQH+/wsABgABAf7/CwAHAAEB//8LAPz/AQH//wsABgABAf//CwAHAAEBAAALAPz/AQEAAAsABwABAQEACwD8/wEBAQALAAcAAQECAAsA/P8BAQIACwD9/wEBAgALAAYAAQECAAsABwABAQMACwD9/wEBAwALAP7/AQEDAAsA//8BAQMACwAEAAEBAwALAAUAAQEDAAsABgABAQQACwD8/wEBBAALAP3/AQEEAAsA/v8BAQQACwD//wEBBAALAAAAAQEEAAsAAQABAQQACwACAAEBBAALAAMAAQEEAAsABAABAQQACwAFAAEBBQALAPv/AQEFAAsA/P8BAQUACwAAAAEBBQALAAEAAQEGAAsA+/8BAQYACwD8/wEBBgALAP//AQEGAAsAAAABAQcACwD8/wEBBwALAP3/AQEHAAsA/v8BAQcACwD//wEBBwALAAAAAQH4/wwA/v8BAfj/DAD//wEB+f8MAPv/AQH5/wwA/P8BAfn/DAD9/wEB+f8MAP7/AQH5/wwA//8BAfr/DAD7/wEB+v8MAPz/AQH6/wwA//8BAfr/DAAAAAEB+/8MAPv/AQH7/wwA/P8BAfv/DAAAAAEB+/8MAAEAAQH8/wwA/P8BAfz/DAD+/wEB/P8MAP//AQH8/wwAAAABAfz/DAABAAEB/P8MAAIAAQH8/wwAAwABAfz/DAAEAAEB/P8MAAUAAQH8/wwACQABAf3/DAD8/wEB/f8MAP3/AQH9/wwA/v8BAf3/DAD//wEB/f8MAAQAAQH9/wwABQABAf3/DAAGAAEB/v8MAPz/AQH+/wwA/f8BAf7/DAAFAAEB/v8MAAYAAQH+/wwABwABAf7/DAAJAAEB//8MAPz/AQH//wwABQABAf//DAAGAAEB//8MAAcAAQEAAAwA/P8BAQAADAAGAAEBAAAMAAcAAQEBAAwA/P8BAQEADAAGAAEBAQAMAAcAAQECAAwA/P8BAQIADAD9/wEBAgAMAAUAAQECAAwABgABAQIADAAHAAEBAgAMAAkAAQEDAAwA/P8BAQMADAD9/wEBAwAMAP7/AQEDAAwA//8BAQMADAAEAAEBAwAMAAUAAQEDAAwABgABAQQADAD8/wEBBAAMAP7/AQEEAAwA//8BAQQADAAAAAEBBAAMAAEAAQEEAAwAAgABAQQADAADAAEBBAAMAAQAAQEEAAwABQABAQQADAAJAAEBBQAMAPv/AQEFAAwA/P8BAQUADAAAAAEBBQAMAAEAAQEGAAwA+/8BAQYADAD8/wEBBgAMAP//AQEGAAwAAAABAQcADAD7/wEBBwAMAPz/AQEHAAwA/f8BAQcADAD+/wEBBwAMAP//AQEIAAwA/v8BAQgADAD//wEB+P8NAAAAAQH4/w0AAQABAfj/DQACAAEB+f8NAPz/AQH5/w0A/f8BAfn/DQD+/wEB+f8NAP//AQH5/w0AAAABAfn/DQABAAEB+f8NAAIAAQH6/w0A+/8BAfr/DQD8/wEB+v8NAP//AQH6/w0AAAABAfr/DQABAAEB+/8NAPv/AQH7/w0A/P8BAfv/DQD//wEB+/8NAAAAAQH8/w0A/P8BAfz/DQD9/wEB/P8NAP//AQH8/w0AAAABAfz/DQABAAEB/P8NAAIAAQH8/w0AAwABAf3/DQD9/wEB/f8NAP7/AQH9/w0A//8BAf3/DQAAAAEB/f8NAAMAAQH9/w0ABAABAf3/DQAFAAEB/f8NAAYAAQH+/w0A/f8BAf7/DQD+/wEB/v8NAAUAAQH+/w0ABgABAf//DQD8/wEB//8NAP3/AQH//w0ABQABAf//DQAGAAEB//8NAAcAAQH//w0ACQABAQAADQD8/wEBAAANAP3/AQEAAA0ABAABAQAADQAFAAEBAAANAAYAAQEAAA0ABwABAQEADQD8/wEBAQANAP3/AQEBAA0ABQABAQEADQAGAAEBAQANAAcAAQEBAA0ACQABAQIADQD9/wEBAgANAP7/AQECAA0ABQABAQIADQAGAAEBAwANAP3/AQEDAA0A/v8BAQMADQD//wEBAwANAAAAAQEDAA0AAwABAQMADQAEAAEBAwANAAUAAQEDAA0ABgABAQQADQD8/wEBBAANAP3/AQEEAA0A//8BAQQADQAAAAEBBAANAAEAAQEEAA0AAgABAQQADQADAAEBBQANAPv/AQEFAA0A/P8BAQUADQD//wEBBQANAAAAAQEGAA0A+/8BAQYADQD8/wEBBgANAP//AQEGAA0AAAABAQcADQD8/wEBBwANAP3/AQEHAA0A/v8BAQcADQD//wEBBwANAAAAAQEHAA0AAQABAQcADQACAAEBCAANAAAAAQEIAA0AAQABAQgADQACAAEBCQANAAAAAQEJAA0AAQABAff/DgAAAAEB9/8OAAEAAQH3/w4AAgABAfj/DgD//wEB+P8OAAAAAQH4/w4AAQABAfj/DgACAAEB+P8OAAMAAQH5/w4A/f8BAfn/DgD+/wEB+f8OAP//AQH5/w4AAAABAfn/DgABAAEB+f8OAAIAAQH5/w4AAwABAfr/DgD8/wEB+v8OAP3/AQH6/w4A/v8BAfr/DgD//wEB+v8OAAAAAQH6/w4AAQABAfr/DgACAAEB+v8OAAMAAQH7/w4A/P8BAfv/DgD9/wEB+/8OAP7/AQH7/w4A//8BAfv/DgAAAAEB+/8OAAEAAQH7/w4AAgABAfz/DgD8/wEB/P8OAP3/AQH8/w4A/v8BAfz/DgD//wEB/P8OAAAAAQH8/w4AAQABAfz/DgACAAEB/f8OAP7/AQH9/w4A//8BAf3/DgAAAAEB/f8OAAEAAQH9/w4AAgABAf3/DgADAAEB/f8OAAQAAQH+/w4A/f8BAf7/DgD+/wEB/v8OAAAAAQH+/w4AAgABAf7/DgADAAEB/v8OAAQAAQH+/w4ABQABAf7/DgAGAAEB//8OAP3/AQH//w4A/v8BAf//DgAFAAEB//8OAAYAAQEAAA4A/f8BAQAADgD+/wEBAAAOAAQAAQEAAA4ABQABAQAADgAGAAEBAQAOAP3/AQEBAA4A/v8BAQEADgAFAAEBAQAOAAYAAQECAA4A/f8BAQIADgD+/wEBAgAOAAAAAQECAA4AAgABAQIADgADAAEBAgAOAAQAAQECAA4ABQABAQIADgAGAAEBAwAOAP7/AQEDAA4A//8BAQMADgAAAAEBAwAOAAEAAQEDAA4AAgABAQMADgADAAEBAwAOAAQAAQEEAA4A/P8BAQQADgD9/wEBBAAOAP7/AQEEAA4A//8BAQQADgAAAAEBBAAOAAEAAQEEAA4AAgABAQUADgD8/wEBBQAOAP3/AQEFAA4A/v8BAQUADgD//wEBBgAOAPz/AQEGAA4A/f8BAQYADgD+/wEBBgAOAP//AQEGAA4AAAABAQYADgABAAEBBgAOAAIAAQEHAA4A/f8BAQcADgD+/wEBBwAOAP//AQEHAA4AAAABAQcADgABAAEBBwAOAAIAAQEHAA4AAwABAQgADgD//wEBCAAOAAAAAQEIAA4AAQABAQgADgACAAEBCAAOAAMAAQEJAA4A//8BAQkADgAAAAEBCQAOAAEAAQEJAA4AAgABAQkADgADAAEBCgAOAAAAAQEKAA4AAQABAQoADgACAAEB9v8PAAAAAQH2/w8AAQABAfb/DwACAAEB9/8PAP//AQH3/w8AAAABAff/DwABAAEB9/8PAAIAAQH3/w8AAwABAfj/DwD+/wEB+P8PAP//AQH4/w8AAwABAfn/DwD+/wEB+f8PAP//AQH5/w8AAwABAfr/DwD+/wEB+v8PAP//AQH6/w8AAwABAfv/DwD//wEB+/8PAAAAAQH7/w8AAQABAfv/DwACAAEB+/8PAAMAAQH9/w8A//8BAf3/DwABAAEB/f8PAAIAAQH9/w8AAwABAf7/DwD+/wEB/v8PAP//AQH+/w8AAAABAf7/DwABAAEB/v8PAAIAAQH+/w8AAwABAf7/DwAEAAEB//8PAP7/AQH//w8A//8BAf//DwAAAAEB//8PAAEAAQH//w8AAgABAf//DwADAAEB//8PAAQAAQEAAA8A//8BAQAADwAAAAEBAAAPAAEAAQEAAA8AAgABAQAADwADAAEBAAAPAAQAAQEBAA8A/v8BAQEADwD//wEBAQAPAAAAAQEBAA8AAQABAQEADwACAAEBAQAPAAMAAQEBAA8ABAABAQIADwD+/wEBAgAPAP//AQECAA8AAAABAQIADwABAAEBAgAPAAIAAQECAA8AAwABAQIADwAEAAEBAwAPAP//AQEDAA8AAQABAQMADwACAAEBAwAPAAMAAQEFAA8AAAABAQUADwABAAEBBQAPAAIA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AgMLAP7///8CAwsA/v8AAAIDCwD+/wEAAgMLAP7/AgACAwwA/v///wIDDAD+/wAAAgMMAP7/AQACA//////+/wIDAAD///7/AgMAAP//AgACAwAA//8DAAIDAQD///7/AgMBAP//AgACAwEA//8DAAIDAgD///7/AgMCAP//AgACAwIA//8DAAIDAwD///7/AgMDAP//AgACAwMA//8DAAIDBAD///7/AgMEAP//AgACAwQA//8DAAIDBQD///7/AgMFAP//AgACAwUA//8DAAIDBgD///7/AgMGAP//AgACAwYA//8DAAIDBwD///7/AgMHAP//AgACAwcA//8DAAIDCAD///7/AgMIAP//AgACAwgA//8DAAIDCQD///7/AgMJAP////8CAwkA//8CAAIDCQD//wMAAgMKAP///v8CAwoA/////wIDCgD//wIAAgMKAP//AwACAwsA///+/wIDCwD/////AgMLAP//AgACAwsA//8DAAIDDAD///7/AgP//wAA/v8CAwAAAAD+/wIDAAAAAAMAAgMBAAAA/v8CAwEAAAADAAIDAgAAAP7/AgMCAAAAAwACAwMAAAD+/wIDAwAAAAMAAgMEAAAA/v8CAwQAAAADAAIDBQAAAP7/AgMFAAAAAwACAwYAAAD+/wIDBgAAAAIAAgMGAAAAAwACAwcAAAD+/wIDBwAAAAIAAgMIAAAA/v8CAwgAAAACAAIDCQAAAP7/AgMJAAAAAgACAwkAAAADAAIDCgAAAP7/AgMKAAAAAgACAwoAAAADAAIDCwAAAP7/AgMLAAAAAwACAwwAAAD+/wID//8BAP7/AgMAAAEA/v8CAwAAAQACAAIDAQABAP7/AgMBAAEA//8CAwEAAQACAAIDAgABAP7/AgMCAAEA//8CAwIAAQACAAIDAwABAP7/AgMDAAEA//8CAwMAAQAAAAIDAwABAAIAAgMEAAEA/v8CAwQAAQD//wIDBAABAAAAAgMEAAEAAQACAwQAAQACAAIDBQABAP7/AgMFAAEA//8CAwUAAQAAAAIDBQABAAEAAgMFAAEAAgACAwYAAQD+/wIDBgABAP//AgMGAAEAAAACAwYAAQABAAIDBgABAAIAAgMHAAEA//8CAwcAAQAAAAIDBwABAAEAAgMHAAEAAgACAwgAAQD//wIDCAABAAAAAgMIAAEAAQACAwgAAQACAAIDCQABAP//AgMJAAEAAAACAwkAAQABAAIDCQABAAIAAgMKAAEA//8CAwoAAQABAAIDCgABAAIAAgMLAAEA/v8CAwsAAQD//wIDCwABAAIAAgMMAAEA//8CA///AgD//wIDAAACAP//AgMAAAIAAAACAwAAAgACAAIDAQACAP//AgMBAAIAAAACAwEAAgABAAIDAQACAAIAAgMCAAIA//8CAwIAAgAAAAIDAgACAAEAAgMCAAIAAgACAwMAAgAAAAIDAwACAAEAAgMEAAIAAQACAwUAAgABAAIDBgACAAEAAgMHAAIAAAACAwcAAgABAAIDCAACAAAAAgMIAAIAAQACAwkAAgAAAAIDCgACAAAAAgMKAAIAAQACAwsAAgD//wIDCwACAAAAAgMLAAIAAQACAwsAAgACAAIDDAACAP//AgMMAAIAAAACAwwAAgABAAIDAAADAAAAAgMAAAMAAQACAwEAAwABAAMDAQD9/wAAAwMBAP3/AQADAwIA/f8AAAMDAgD9/wEAAwMDAP3/AAADAwMA/f8BAAMDBAD9/wAAAwMAAP7///8DAwAA/v8BAAMDAAD+/wIAAwMBAP7///8DAwEA/v8AAAMDAQD+/wEAAwMBAP7/AgADAwIA/v/+/wMDAgD+////AwMCAP7/AAADAwIA/v8BAAMDAgD+/wIAAwMDAP7//v8DAwMA/v///wMDAwD+/wAAAwMDAP7/AQADAwMA/v8CAAMDBAD+//7/AwMEAP7///8DAwQA/v8AAAMDBAD+/wEAAwMEAP7/AgADAwUA/v///wMDBQD+/wAAAwMFAP7/AQADAwUA/v8CAAMDBgD+////AwMGAP7/AAADAwYA/v8BAAMDBwD+////AwMHAP7/AAADAwcA/v8BAAMDCAD+////AwMIAP7/AAADAwAA///+/wMDAAD//wIAAwMBAP///v8DAwEA/////wMDAQD//wIAAwMCAP///v8DAwIA//8CAAMDAwD///7/AwMDAP//AgADAwQA///+/wMDBAD//wIAAwMFAP///v8DAwUA//8CAAMDBgD///7/AwMGAP////8DAwYA//8BAAMDBgD//wIAAwMHAP///v8DAwcA/////wMDBwD//wEAAwMHAP//AgADAwgA/////wMDCAD//wAAAwMIAP//AQADAwgA//8CAAMDCQD/////AwMJAP//AAADAwkA//8BAAMDCQD//wIAAwMKAP////8DAwoA//8AAAMDCgD//wEAAwMLAP////8DAwsA//8AAAMDCwD//wEAAwMLAP//AgADAwwA/////wMDDAD//wAAAwMMAP//AQADAwwA//8CAAMDDQD/////AwMNAP//AAADAw0A//8BAAMD//8AAP7/AwMAAAAA/v8DAwAAAAACAAMDAAAAAAMAAwMBAAAA/v8DAwEAAAACAAMDAgAAAP7/AwMCAAAAAgADAwMAAAD+/wMDAwAAAAIAAwMEAAAA/v8DAwQAAAACAAMDBQAAAP7/AwMFAAAAAgADAwYAAAD+/wMDBgAAAAIAAwMHAAAA/v8DAwcAAAD//wMDBwAAAAIAAwMIAAAA/v8DAwgAAAD//wMDCAAAAAIAAwMJAAAA//8DAwkAAAACAAMDCgAAAP//AwMKAAAAAgADAwsAAAD//wMDCwAAAAEAAwMLAAAAAgADAwwAAAD//wMDDQAAAP//AwP//wEAAgADAwAAAQD+/wMDAAABAP//AwMAAAEAAgADAwEAAQD+/wMDAQABAP//AwMBAAEAAgADAwIAAQD+/wMDAgABAP//AwMCAAEAAgADAwMAAQD+/wMDAwABAP//AwMDAAEAAgADAwQAAQD+/wMDBAABAP//AwMEAAEAAgADAwUAAQD+/wMDBQABAP//AwMFAAEAAgADAwYAAQD//wMDBgABAAEAAwMGAAEAAgADAwcAAQD//wMDBwABAAAAAwMHAAEAAQADAwcAAQACAAMDCAABAP//AwMIAAEAAAADAwgAAQABAAMDCAABAAIAAwMJAAEA//8DAwkAAQAAAAMDCQABAAEAAwMJAAEAAgADAwoAAQD//wMDCgABAAAAAwMKAAEAAQADAwsAAQD//wMDCwABAAAAAwMLAAEAAQADAwwAAQD//wMDDAABAAAAAwMMAAEAAQADAwwAAQACAAMDDQABAP//AwMNAAEAAAADAw0AAQABAAMDAAACAAAAAwMAAAIAAQADAwAAAgACAAMDAQACAP//AwMBAAIAAAADAwEAAgABAAMDAQACAAIAAwMCAAIA//8DAwIAAgAAAAMDAgACAAEAAwMCAAIAAgADAwMAAgD//wMDAwACAAAAAwMDAAIAAQADAwMAAgACAAMDBAACAP//AwMEAAIAAAADAwQAAgABAAMDBAACAAIAAwMFAAIA//8DAwUAAgAAAAMDBQACAAEAAwMFAAIAAgADAwYAAgD//wMDBgACAAAAAwMGAAIAAQADAwcAAgAAAAQAAgD9/wMABAACAP3/BAAEAAMA/f8DAAQAAwD9/wQABAAEAP3/AwAEAAQA/f8EAAQAAAD+/wEABAAAAP7/AgAEAAEA/v8BAAQAAQD+/wIABAABAP7/AwAEAAEA/v8EAAQAAgD+/wIABAACAP7/AwAEAAIA/v8EAAQAAwD+/wMABAADAP7/BAAEAAQA/v8DAAQABAD+/wQABAD/////AQAEAP////8CAAQAAAD/////BAAAAP//AAAEAAAA//8BAAQAAAD//wIABAAAAP//AwAEAAEA/////wQAAQD//wAABAABAP//AQAEAAEA//8DAAQAAQD//wQABAACAP////8EAAIA//8AAAQAAgD//wEABAACAP//AgAEAAIA//8DAAQAAwD/////BAADAP//AAAEAAMA//8BAAQAAwD//wIABAADAP//AwAEAAQA///+/wQABAD/////BAAEAP//AAAEAAQA//8BAAQABAD//wIABAAFAP///v8EAAUA/////wQABQD//wAABAAFAP//AQAEAAUA//8CAAQABgD///7/BAAGAP////8EAAYA//8AAAQABgD//wEABAAGAP//AgAEAAYA//8DAAQABwD///7/BAAHAP////8EAAcA//8AAAQABwD//wEABAAHAP//AgAEAAcA//8DAAQACAD///7/BAAIAP////8EAAgA//8AAAQACAD//wEABAAIAP//AgAEAAkA/////wQACQD//wAABAAJAP//AQAEAAkA//8CAAQA//8AAAIABAAAAAAA/v8EAAAAAAACAAQAAQAAAP7/BAABAAAAAgAEAAEAAAADAAQAAgAAAP7/BAACAAAAAgAEAAIAAAADAAQAAwAAAP7/BAADAAAA//8EAAMAAAACAAQAAwAAAAMABAAEAAAA/v8EAAQAAAD//wQABAAAAAAABAAEAAAAAQAEAAQAAAACAAQABAAAAAMABAAFAAAA/v8EAAUAAAD//wQABQAAAAAABAAFAAAAAQAEAAUAAAACAAQABQAAAAMABAAGAAAA/v8EAAYAAAD//wQABgAAAAAABAAGAAAAAQAEAAYAAAACAAQABgAAAAMABAAHAAAA/v8EAAcAAAD//wQABwAAAAAABAAHAAAAAQAEAAcAAAACAAQABwAAAAMABAAIAAAA/v8EAAgAAAD//wQACAAAAAAABAAIAAAAAQAEAAgAAAACAAQACAAAAAMABAAJAAAA//8EAAkAAAAAAAQACQAAAAEABAAJAAAAAgAEAAoAAAAAAAQACgAAAAEABAAAAAEA//8EAAAAAQAAAAQAAAABAAEABAAAAAEAAgAEAAEAAQD//wQAAQABAAAABAABAAEAAQAEAAEAAQACAAQAAgABAP//BAACAAEAAAAEAAIAAQABAAQAAgABAAIABAADAAEA/v8EAAMAAQD//wQAAwABAAAABAADAAEAAQAEAAMAAQACAAQABAABAP//BAAEAAEAAAAEAAQAAQABAAUDAAD8/wAABQP5//3/AAAFA/r//f///wUD+v/9/wAABQP6//3/AQAFA/v//f///wUD+//9/wAABQP7//3/AQAFA/z//f///wUD/P/9/wAABQP8//3/AQAFA/3//f///wUD/f/9/wAABQP9//3/AQAFA/7//f///wUD/v/9/wAABQP+//3/AQAFA////f/+/wUD///9////BQP///3/AAAFA////f8BAAUDAAD9////BQMAAP3/AAAFAwAA/f8BAAUDAAD9/wIABQP0//7///8FA/T//v8AAAUD9P/+/wEABQP1//7///8FA/X//v8AAAUD9f/+/wEABQP1//7/AgAFA/b//v///wUD9v/+/wAABQP2//7/AQAFA/b//v8CAAUD9//+////BQP3//7/AAAFA/f//v8BAAUD9//+/wIABQP4//7///8FA/j//v8AAAUD+P/+/wEABQP4//7/AgAFA/n//v/+/wUD+f/+////BQP5//7/AQAFA/n//v8CAAUD+v/+//7/BQP6//7///8FA/r//v8BAAUD+v/+/wIABQP7//7//v8FA/v//v8BAAUD+//+/wIABQP8//7//v8FA/z//v8BAAUD/P/+/wIABQP9//7//v8FA/3//v8BAAUD/f/+/wIABQP+//7//v8FA/7//v8BAAUD/v/+/wIABQP///7//v8FA////v8BAAUD///+/wIABQMAAP7//v8FAwAA/v8CAAUDAQD+//7/BQP0/////v8FA/X////+/wUD9f//////BQP1////AgAFA/X///8DAAUD9v////7/BQP2//////8FA/b///8CAAUD9v///wMABQP3/////v8FA/f//////wUD9////wIABQP3////AwAFA/j////+/wUD+P///wIABQP4////AwAFA/n////+/wUD+f///wIABQP5////AwAFA/r////+/wUD+v///wIABQP6////AwAFA/v////+/wUD+////wIABQP7////AwAFA/z////+/wUD/P///wIABQP8////AwAFA/3////+/wUD/f///wIABQP9////AwAFA/7////+/wUD/v///wIABQP+////AwAFA//////+/wUD/////wIABQP/////AwAFAwAA///+/wUDAAD//wIABQMAAP//AwAFAwEA///+/wUD9P8AAP7/BQP1/wAA/v8FA/X/AAADAAUD9v8AAP7/BQP2/wAAAgAFA/b/AAADAAUD9/8AAP7/BQP3/wAAAgAFA/f/AAADAAUD+P8AAP7/BQP4/wAAAgAFA/n/AAD+/wUD+f8AAAIABQP6/wAA/v8FA/r/AAACAAUD+v8AAAMABQP7/wAA/v8FA/v/AAADAAUD/P8AAP7/BQP8/wAAAwAFA/3/AAD+/wUD/f8AAAMABQP+/wAA/v8FA/7/AAADAAUD//8AAP7/BQP//wAAAwAFAwAAAAD+/wUDAAAAAAMABQMBAAAA/v8FA/T/AQD//wUD9f8BAP7/BQP1/wEA//8FA/X/AQACAAUD9v8BAP//BQP2/wEAAQAFA/b/AQACAAUD9/8BAP//BQP3/wEAAAAFA/f/AQABAAUD9/8BAAIABQP4/wEA//8FA/j/AQAAAAUD+P8BAAEABQP4/wEAAgAFA/n/AQD//wUD+f8BAAAABQP5/wEAAQAFA/n/AQACAAUD+v8BAP7/BQP6/wEA//8FA/r/AQAAAAUD+v8BAAEABQP6/wEAAgAFA/v/AQD+/wUD+/8BAP//BQP7/wEAAAAFA/v/AQABAAUD+/8BAAIABQP8/wEA/v8FA/z/AQD//wUD/P8BAAAABQP8/wEAAQAFA/z/AQACAAUD/f8BAP7/BQP9/wEA//8FA/3/AQAAAAUD/f8BAAIABQP+/wEA/v8FA/7/AQD//wUD/v8BAAIABQP//wEA/v8FA///AQD//wUD//8BAAIABQMAAAEA/v8FAwAAAQACAAUDAQABAP7/BQP0/wIA//8FA/T/AgAAAAUD9P8CAAEABQP1/wIA//8FA/X/AgAAAAUD9f8CAAEABQP1/wIAAgAFA/b/AgAAAAUD9v8CAAEABQP3/wIAAAAFA/j/AgAAAAUD+P8CAAEABQP5/wIAAAAFA/n/AgABAAUD+v8CAAEABQP7/wIAAQAFA/z/AgABAAUD/f8CAAAABQP9/wIAAQAFA/7/AgD//wUD/v8CAAAABQP+/wIAAQAFA/7/AgACAAUD//8CAP//BQP//wIAAAAFA///AgABAAUD//8CAAIABQMAAAIA//8FAwAAAgAAAAUDAAACAAIABQMBAAIA//8FA///AwABAAUDAAADAAAABQMAAAMAAQAGA/z//f8AAAYD/f/9/wAABgP9//3/AQAGA/7//f8AAAYD/v/9/wEABgP///3/AAAGA////f8BAAYD+P/+////BgP4//7/AAAGA/n//v///wYD+f/+/wAABgP5//7/AQAGA/r//v///wYD+v/+/wAABgP6//7/AQAGA/v//v///wYD+//+/wAABgP7//7/AQAGA/v//v8CAAYD/P/+//7/BgP8//7///8GA/z//v8AAAYD/P/+/wEABgP8//7/AgAGA/3//v/+/wYD/f/+////BgP9//7/AAAGA/3//v8BAAYD/f/+/wIABgP+//7//v8GA/7//v///wYD/v/+/wAABgP+//7/AQAGA/7//v8CAAYD///+////BgP///7/AAAGA////v8BAAYD///+/wIABgMAAP7///8GAwAA/v8BAAYDAAD+/wIABgPz//////8GA/P///8AAAYD8////wEABgP0//////8GA/T///8AAAYD9P///wEABgP0////AgAGA/X//////wYD9f///wAABgP1////AQAGA/X///8CAAYD9v//////BgP2////AAAGA/b///8BAAYD9///////BgP3////AAAGA/f///8BAAYD9////wIABgP4//////8GA/j///8AAAYD+P///wEABgP4////AgAGA/n////+/wYD+f//////BgP5////AQAGA/n///8CAAYD+v////7/BgP6//////8GA/r///8BAAYD+v///wIABgP7/////v8GA/v///8CAAYD/P////7/BgP8////AgAGA/3////+/wYD/f///wIABgP+/////v8GA/7///8CAAYD//////7/BgP///////8GA/////8CAAYDAAD///7/BgMAAP//AgAGA/P/AAD//wYD9P8AAP//BgP1/wAA//8GA/X/AAABAAYD9f8AAAIABgP2/wAA//8GA/b/AAACAAYD9/8AAP//BgP3/wAAAgAGA/j/AAD+/wYD+P8AAP//BgP4/wAAAgAGA/n/AAD+/wYD+f8AAP//BgP5/wAAAgAGA/r/AAD+/wYD+v8AAAIABgP7/wAA/v8GA/v/AAACAAYD/P8AAP7/BgP8/wAAAgAGA/3/AAD+/wYD/f8AAAIABgP+/wAA/v8GA/7/AAACAAYD//8AAP7/BgP//wAAAgAGAwAAAAD+/wYDAAAAAAIABgMAAAAAAwAGAwEAAAD+/wYD8/8BAP//BgPz/wEAAAAGA/P/AQABAAYD9P8BAP//BgP0/wEAAAAGA/T/AQABAAYD9P8BAAIABgP1/wEA//8GA/X/AQAAAAYD9f8BAAEABgP2/wEA//8GA/b/AQAAAAYD9v8BAAEABgP3/wEA//8GA/f/AQAAAAYD9/8BAAEABgP3/wEAAgAGA/j/AQD//wYD+P8BAAAABgP4/wEAAQAGA/j/AQACAAYD+f8BAP//BgP5/wEAAAAGA/n/AQABAAYD+f8BAAIABgP6/wEA//8GA/r/AQABAAYD+v8BAAIABgP7/wEA/v8GA/v/AQD//wYD+/8BAAIABgP8/wEA/v8GA/z/AQD//wYD/P8BAAIABgP9/wEA/v8GA/3/AQD//wYD/f8BAAIABgP+/wEA/v8GA/7/AQD//wYD/v8BAAIABgP//wEA/v8GA///AQD//wYD//8BAAIABgMAAAEA/v8GAwAAAQD//wYDAAABAAIABgMBAAEAAgAGA/n/AgAAAAYD+v8CAP//BgP6/wIAAAAGA/r/AgABAAYD+/8CAP//BgP7/wIAAAAGA/v/AgABAAYD+/8CAAIABgP8/wIA//8GA/z/AgAAAAYD/P8CAAEABgP8/wIAAgAGA/3/AgD//wYD/f8CAAAABgP9/wIAAQAGA/3/AgACAAYD/v8CAP//BgP+/wIAAAAGA/7/AgABAAYD/v8CAAIABgP//wIA//8GA///AgAAAAYD//8CAAEABgP//wIAAgAGAwAAAgAAAAYDAAACAAEABgMAAAIAAgAHAPz//f8DAAcA/P/9/wQABwD9//3/AwAHAP3//f8EAAcA/v/9/wMABwD+//3/BAAHAPz//v8DAAcA/P/+/wQABwD9//7/AwAHAP3//v8EAAcA/v/+/wIABwD+//7/AwAHAP7//v8EAAcA///+/wEABwD///7/AgAHAP///v8DAAcA///+/wQABwAAAP7/AQAHAAAA/v8CAAcA9///////BwD3////AAAHAPf///8BAAcA9////wIABwD4/////v8HAPj//////wcA+P///wAABwD4////AQAHAPj///8CAAcA+f////7/BwD5//////8HAPn///8AAAcA+f///wEABwD5////AgAHAPn///8DAAcA+v////7/BwD6//////8HAPr///8AAAcA+v///wEABwD6////AgAHAPr///8DAAcA+/////7/BwD7//////8HAPv///8AAAcA+////wEABwD7////AgAHAPz////+/wcA/P//////BwD8////AAAHAPz///8BAAcA/P///wIABwD9//////8HAP3///8AAAcA/f///wEABwD9////AgAHAP3///8DAAcA/v//////BwD+////AAAHAP7///8BAAcA/v///wIABwD+////AwAHAP///////wcA/////wAABwD/////AQAHAP////8DAAcA/////wQABwAAAP////8HAAAA//8AAAcAAAD//wEABwAAAP//AgAHAAAA//8DAAcAAQD//wEABwABAP//AgAHAPb/AAAAAAcA9v8AAAEABwD3/wAA//8HAPf/AAAAAAcA9/8AAAEABwD3/wAAAgAHAPj/AAD+/wcA+P8AAP//BwD4/wAAAAAHAPj/AAABAAcA+P8AAAIABwD4/wAAAwAHAPn/AAD+/wcA+f8AAP//BwD5/wAAAAAHAPn/AAABAAcA+f8AAAIABwD5/wAAAwAHAPr/AAD+/wcA+v8AAP//BwD6/wAAAAAHAPr/AAABAAcA+v8AAAIABwD6/wAAAwAHAPv/AAD+/wcA+/8AAP//BwD7/wAAAAAHAPv/AAABAAcA+/8AAAIABwD7/wAAAwAHAPz/AAD+/wcA/P8AAP//BwD8/wAAAAAHAPz/AAABAAcA/P8AAAIABwD8/wAAAwAHAP3/AAD+/wcA/f8AAP//BwD9/wAAAgAHAP3/AAADAAcA/v8AAP7/BwD+/wAAAgAHAP7/AAADAAcA//8AAP7/BwD//wAAAgAHAP//AAADAAcAAAAAAP7/BwAAAAAAAgAHAAEAAAACAAcA/P8BAP//BwD8/wEAAAAHAPz/AQABAAcA/f8BAP7/BwD9/wEA//8HAP3/AQAAAAcA/f8BAAEABwD9/wEAAgAHAP7/AQD//wcA/v8BAAAABwD+/wEAAQAHAP7/AQACAAcA//8BAP//BwD//wEAAAAHAP//AQABAAcA//8BAAIABwAAAAEA//8HAAAAAQAAAAcAAAABAAEABwAAAAEAAgAIBf3/7v///wgF/f/u/wAACAX9/+7/AQAIBf3/7v8CAAgF/v/u////CAX+/+7/AgAIBf7/7v8DAAgF///u/wMACAUAAO7/AwAIBQEA7v8CAAgFAQDu/wMACAUCAO7/AAAIBQIA7v8BAAgFAgDu/wIACAX8/+//AQAIBf3/7////wgF/f/v/wAACAX9/+//AQAIBf3/7/8CAAgF/f/v/wMACAX+/+///v8IBf7/7////wgF/v/v/wMACAX+/+//BAAIBf//7//+/wgF///v/wMACAX//+//BAAIBQAA7//+/wgFAADv/wMACAUBAO///v8IBQEA7/8CAAgFAQDv/wMACAUCAO///v8IBQIA7////wgFAgDv/wAACAUCAO//AQAIBQIA7/8CAAgFAgDv/wMACAX8//D/AQAIBfz/8P8CAAgF/f/w////CAX9//D/AAAIBf3/8P8CAAgF/f/w/wMACAX9//D/BAAIBf7/8P/+/wgF/v/w////CAX+//D/BAAIBf//8P/+/wgF///w/wQACAUAAPD//v8IBQAA8P8DAAgFAADw/wQACAUBAPD//v8IBQEA8P8DAAgFAQDw/wQACAUCAPD//v8IBQIA8P///wgFAgDw/wEACAUCAPD/AgAIBQIA8P8DAAgFAwDw/wAACAUDAPD/AQAIBfz/8f8AAAgF/P/x/wEACAX8//H/AgAIBf3/8f/+/wgF/f/x////CAX9//H/AAAIBf3/8f8CAAgF/f/x/wMACAX9//H/BAAIBf7/8f/+/wgF/v/x/wQACAX///H//v8IBf//8f8EAAgF///x/wUACAUAAPH//v8IBQAA8f8EAAgFAQDx//7/CAUBAPH/AwAIBQEA8f8EAAgFAgDx//7/CAUCAPH///8IBQIA8f8CAAgFAgDx/wMACAUCAPH/BAAIBQMA8f///wgFAwDx/wAACAUDAPH/AQAIBQMA8f8CAAgF/P/y/wAACAX8//L/AQAIBfz/8v8CAAgF/P/y/wMACAX9//L//v8IBf3/8v///wgF/f/y/wMACAX9//L/BAAIBf7/8v/+/wgF/v/y/wQACAX+//L/BQAIBf//8v/+/wgF///y/wUACAUAAPL//v8IBQAA8v8FAAgFAQDy//7/CAUBAPL/BAAIBQEA8v8FAAgFAgDy//7/CAUCAPL///8IBQIA8v8DAAgFAgDy/wQACAUDAPL///8IBQMA8v8AAAgFAwDy/wEACAUDAPL/AgAIBQMA8v8DAAgF/P/z////CAX8//P/AAAIBfz/8/8BAAgF/P/z/wIACAX8//P/AwAIBf3/8//+/wgF/f/z////CAX9//P/BAAIBf3/8/8FAAgF/v/z//7/CAX+//P/BQAIBf//8//+/wgF///z/wUACAUAAPP//v8IBQAA8/8FAAgFAQDz//7/CAUBAPP/BQAIBQIA8//+/wgFAgDz/wQACAUCAPP/BQAIBQMA8////wgFAwDz/wAACAUDAPP/AQAIBQMA8/8CAAgFAwDz/wMACAUDAPP/BAAIBfz/9P///wgF/P/0/wAACAX8//T/AQAIBfz/9P8CAAgF/P/0/wMACAX8//T/BAAIBf3/9P/+/wgF/f/0////CAX9//T/BAAIBf3/9P8FAAgF/v/0//7/CAX+//T/BQAIBf//9P/9/wgF///0//7/CAX///T/BQAIBf//9P8GAAgFAAD0//3/CAUAAPT//v8IBQAA9P8FAAgFAAD0/wYACAUBAPT//v8IBQEA9P8FAAgFAQD0/wYACAUCAPT//v8IBQIA9P8FAAgFAgD0/wYACAUDAPT///8IBQMA9P8AAAgFAwD0/wEACAUDAPT/AgAIBQMA9P8DAAgFAwD0/wQACAUEAPT/AgAIBQQA9P8DAAgF+//1/wIACAX8//X///8IBfz/9f8AAAgF/P/1/wEACAX8//X/AgAIBfz/9f8DAAgF/P/1/wQACAX9//X//v8IBf3/9f///wgF/f/1/wQACAX9//X/BQAIBf7/9f/9/wgF/v/1//7/CAX+//X/BQAIBf7/9f8GAAgF///1//3/CAX///X/BgAIBQAA9f/9/wgFAAD1//7/CAUAAPX/BgAIBQEA9f/+/wgFAQD1/wYACAUCAPX//v8IBQIA9f8FAAgFAgD1/wYACAUDAPX///8IBQMA9f8AAAgFAwD1/wQACAUDAPX/BQAIBQQA9f8BAAgFBAD1/wIACAUEAPX/AwAIBQQA9f8EAAgF+//2/wAACAX7//b/AQAIBfv/9v8CAAgF+//2/wMACAX8//b///8IBfz/9v8AAAgF/P/2/wMACAX8//b/BAAIBfz/9v8FAAgF/f/2//7/CAX9//b/BQAIBf3/9v8GAAgF/v/2//3/CAX+//b//v8IBf7/9v8GAAgF///2//3/CAX///b/BgAIBQAA9v/9/wgFAAD2//7/CAUAAPb/BgAIBQEA9v/+/wgFAQD2/wYACAUCAPb//v8IBQIA9v8GAAgFAwD2////CAUDAPb/AAAIBQMA9v8EAAgFAwD2/wUACAUDAPb/BgAIBQQA9v8AAAgFBAD2/wEACAUEAPb/AgAIBQQA9v8DAAgFBAD2/wQACAUEAPb/BQAIBfv/9/8AAAgF+//3/wEACAX7//f/AgAIBfv/9/8DAAgF+//3/wQACAX8//f//v8IBfz/9////wgF/P/3/wQACAX8//f/BQAIBf3/9//+/wgF/f/3/wUACAX9//f/BgAIBf7/9//9/wgF/v/3//7/CAX+//f/BgAIBf7/9/8HAAgF///3//3/CAX///f/BgAIBf//9/8HAAgFAAD3//3/CAUAAPf//v8IBQAA9/8HAAgFAQD3//7/CAUBAPf/BgAIBQEA9/8HAAgFAgD3//7/CAUCAPf/BgAIBQMA9////wgFAwD3/wAACAUDAPf/BQAIBQMA9/8GAAgFBAD3/wAACAUEAPf/AQAIBQQA9/8CAAgFBAD3/wMACAUEAPf/BAAIBQQA9/8FAAgF+//4////CAX7//j/AAAIBfv/+P8BAAgF+//4/wIACAX7//j/AwAIBfv/+P8EAAgF/P/4//7/CAX8//j///8IBfz/+P8EAAgF/P/4/wUACAX8//j/BgAIBf3/+P/+/wgF/f/4/wYACAX+//j//f8IBf7/+P/+/wgF/v/4/wYACAX+//j/BwAIBf//+P/9/wgF///4/wcACAUAAPj//f8IBQAA+P/+/wgFAAD4/wcACAUBAPj//v8IBQEA+P8HAAgFAgD4//7/CAUCAPj/BgAIBQIA+P8HAAgFAwD4////CAUDAPj/BgAIBQQA+P8AAAgFBAD4/wEACAUEAPj/AgAIBQQA+P8DAAgFBAD4/wQACAUEAPj/BQAIBfv/+f///wgF+//5/wAACAX7//n/AQAIBfv/+f8CAAgF+//5/wMACAX7//n/BAAIBfv/+f8FAAgF/P/5//7/CAX8//n///8IBfz/+f8FAAgF/P/5/wYACAX9//n//v8IBf3/+f8GAAgF/f/5/wcACAX+//n//f8IBf7/+f/+/wgF/v/5/wcACAX///n//f8IBf//+f8HAAgFAAD5//3/CAUAAPn/BwAIBQEA+f/+/wgFAQD5/wcACAUCAPn//v8IBQIA+f8GAAgFAgD5/wcACAUDAPn///8IBQMA+f8AAAgFAwD5/wYACAUEAPn/AAAIBQQA+f8BAAgFBAD5/wIACAUEAPn/AwAIBQQA+f8EAAgFBAD5/wUACAUEAPn/BgAIBfv/+v///wgF+//6/wAACAX7//r/AQAIBfv/+v8CAAgF+//6/wMACAX7//r/BAAIBfv/+v8FAAgF/P/6//7/CAX8//r///8IBfz/+v8FAAgF/P/6/wYACAX9//r//v8IBf3/+v8GAAgF/f/6/wcACAX+//r//f8IBf7/+v/+/wgF/v/6/wcACAX///r//f8IBf//+v8HAAgFAAD6//3/CAUAAPr/BwAIBQEA+v/+/wgFAQD6/wcACAUCAPr//v8IBQIA+v8HAAgFAwD6////CAUDAPr/AAAIBQMA+v8GAAgFBAD6/wAACAUEAPr/AQAIBQQA+v8CAAgFBAD6/wMACAUEAPr/BAAIBQQA+v8FAAgFBAD6/wYACAX7//v///8IBfv/+/8AAAgF+//7/wEACAX7//v/AgAIBfv/+/8DAAgF+//7/wQACAX7//v/BQAIBfz/+//+/wgF/P/7////CAX8//v/BQAIBfz/+/8GAAgF/f/7//7/CAX9//v/BgAIBf3/+/8HAAgF/v/7//3/CAX+//v/BwAIBf//+//9/wgF///7/wcACAUAAPv//f8IBQAA+/8HAAgFAQD7//3/CAUBAPv//v8IBQEA+/8HAAgFAgD7//7/CAUCAPv///8IBQIA+/8HAAgFAwD7////CAUDAPv/AAAIBQMA+/8GAAgFBAD7/wEACAUEAPv/AgAIBQQA+/8DAAgFBAD7/wQACAUEAPv/BQAIBQQA+/8GAAgFBQD7/wQACAX6//z/AgAIBfv//P///wgF+//8/wAACAX7//z/AQAIBfv//P8CAAgF+//8/wMACAX7//z/BAAIBfv//P8FAAgF/P/8//3/CAX8//z//v8IBfz//P///wgF/P/8/wUACAX8//z/BgAIBf3//P/9/wgF/f/8//7/CAX9//z/BgAIBf3//P8HAAgF/v/8//3/CAX+//z/BwAIBf///P/9/wgF///8/wcACAUAAPz//f8IBQAA/P8HAAgFAQD8//3/CAUBAPz//v8IBQEA/P8HAAgFAgD8//7/CAUCAPz///8IBQIA/P8HAAgFAwD8////CAUDAPz/AAAIBQMA/P8GAAgFBAD8/wAACAUEAPz/AQAIBQQA/P8CAAgFBAD8/wMACAUEAPz/BAAIBQQA/P8FAAgFBAD8/wYACAUFAPz/BAAIBfr//f8CAAgF+v/9/wMACAX6//3/BAAIBfv//f/+/wgF+//9////CAX7//3/AwAIBfv//f8EAAgF+//9/wUACAX8//3//f8IBfz//f/+/wgF/P/9/wUACAX8//3/BgAIBf3//f/8/wgF/f/9/wYACAX+//3//P8IBf7//f8HAAgF///9//z/CAX///3//f8IBf///f8HAAgFAAD9//z/CAUAAP3//f8IBQAA/f8HAAgFAQD9//3/CAUBAP3//v8IBQEA/f8HAAgFAgD9//7/CAUCAP3///8IBQIA/f8HAAgFAwD9////CAUDAP3/AAAIBQMA/f8GAAgFBAD9/wEACAUEAP3/AgAIBQQA/f8DAAgFBAD9/wQACAUEAP3/BQAIBQQA/f8GAAgF+v/+/wUACAX7//7/BQAIBfz//v8FAAgF/P/+/wYACAX9//7/BgAIBf3//v8HAAgF/v/+//v/CAX+//7/BwAIBf///v/7/wgF///+//z/CAX///7/BwAIBQAA/v/8/wgFAAD+/wcACAUBAP7//P8IBQEA/v/9/wgFAQD+/wcACAUCAP7//v8IBQIA/v8GAAgFAgD+/wcACAUDAP7///8IBQMA/v8AAAgFAwD+/wEACAUDAP7/BgAIBQQA/v8BAAgFBAD+/wIACAUEAP7/AwAIBQQA/v8EAAgFBAD+/wUACAX7////BgAIBfz///8GAAgF/f///wYACAX+////BgAIBf7///8HAAgF/////wcACAUAAP//+/8IBQAA///8/wgFAAD//wcACAUBAP///P8IBQEA///9/wgFAQD//wcACAUCAP///f8IBQIA///+/wgFAgD/////CAUCAP//BgAIBQMA/////wgFAwD//wAACAUDAP//AQAIBQMA//8FAAgFAwD//wYACAUEAP//AgAIBQQA//8DAAgFBAD//wQACAUEAP//BQAIBfz/AAAGAAgF/f8AAAYACAX+/wAABgAIBf7/AAAHAAgF//8AAAYACAX//wAABwAIBQAAAAAHAAgFAQAAAP3/CAUBAAAABwAIBQIAAAD9/wgFAgAAAP7/CAUCAAAA//8IBQIAAAAGAAgFAwAAAP//CAUDAAAAAAAIBQMAAAABAAgFAwAAAAIACAUDAAAABAAIBQMAAAAFAAgFBAAAAAIACAUEAAAAAwAIBQQAAAAEAAgF/f8BAAYACAX+/wEABgAIBf//AQAGAAgF//8BAAcACAUAAAEABgAIBQAAAQAHAAgFAQABAAYACAUBAAEABwAIBQIAAQD//wgFAgABAAYACAUDAAEAAAAIBQMAAQABAAgFAwABAAIACAUDAAEAAwAIBQMAAQAEAAgFAwABAAUACAUAAAIABgAIBQEAAgAGAAgFAgACAAUACAUCAAIABgAIBQMAAgABAAgFAwACAAIACAUDAAIAAwAIBQMAAgAEAAgFAwACAAUACQX//+z//P8JBf//7P/9/wkFAADs//z/CQUBAOz//P8JBQEA7P/9/wkFAgDs//3/CQX+/+3//f8JBf7/7f/+/wkF///t//z/CQX//+3//f8JBQAA7f/8/wkFAQDt//z/CQUBAO3//f8JBQIA7f/9/wkFAgDt//7/CQUCAO3///8JBf7/7v/9/wkF/v/u//7/CQX+/+7///8JBf//7v/8/wkF///u//3/CQX//+7///8JBf//7v8AAAkFAADu//z/CQUAAO7/AAAJBQEA7v/8/wkFAQDu//3/CQUBAO7///8JBQEA7v8AAAkFAgDu//3/CQUCAO7//v8JBQIA7v///wkF/v/v//3/CQX+/+///v8JBf//7//8/wkF///v//3/CQX//+///v8JBf//7////wkFAADv//z/CQUAAO////8JBQAA7/8AAAkFAQDv//z/CQUBAO///f8JBQEA7////wkFAgDv//3/CQUCAO///v8JBf7/8P/9/wkF/v/w//7/CQX///D//P8JBf//8P/9/wkF///w////CQUAAPD//P8JBQAA8P///wkFAQDw//z/CQUBAPD//f8JBQEA8P///wkFAgDw//3/CQUCAPD//v8JBf7/8f/8/wkF/v/x//3/CQX+//H//v8JBf7/8f///wkF///x//v/CQX///H//P8JBf//8f///wkFAADx//z/CQUAAPH///8JBQEA8f/8/wkFAQDx//3/CQUBAPH///8JBQIA8f/9/wkFAgDx//7/CQX+//L//P8JBf7/8v/9/wkF/v/y//7/CQX+//L///8JBf//8v/7/wkF///y//z/CQX///L///8JBQAA8v/7/wkFAADy//z/CQUAAPL///8JBQAA8v8AAAkFAQDy//v/CQUBAPL//P8JBQEA8v/9/wkFAQDy////CQUCAPL//P8JBQIA8v/9/wkFAgDy//7/CQUCAPL///8JBf7/8//8/wkF/v/z//3/CQX+//P//v8JBf7/8////wkF///z//v/CQX///P//P8JBf//8////wkFAADz//v/CQUAAPP///8JBQAA8/8AAAkFAQDz//v/CQUBAPP//P8JBQEA8////wkFAQDz/wAACQUCAPP//P8JBQIA8//9/wkFAgDz//7/CQUCAPP///8JBf7/9P/8/wkF/v/0//3/CQX+//T//v8JBf7/9P///wkF///0//v/CQX///T///8JBf//9P8AAAkFAAD0//v/CQUAAPT/AAAJBQEA9P/7/wkFAQD0//z/CQUBAPT///8JBQEA9P8AAAkFAgD0//z/CQUCAPT//f8JBQIA9P/+/wkFAgD0////CQX+//X/+/8JBf7/9f/8/wkF/v/1//3/CQX+//X//v8JBf7/9f///wkF///1//v/CQX///X///8JBf//9f8AAAkFAAD1//v/CQUAAPX/AAAJBQEA9f/7/wkFAQD1/wAACQUCAPX/+/8JBQIA9f/8/wkFAgD1//7/CQUCAPX///8JBQMA9f/9/wkFAwD1//7/CQX9//b//P8JBf3/9v/9/wkF/f/2//7/CQX+//b/+/8JBf7/9v/8/wkF/v/2//7/CQX+//b///8JBf//9v/6/wkF///2//v/CQX///b///8JBf//9v8AAAkFAAD2//r/CQUAAPb/+/8JBQAA9v8AAAkFAQD2//v/CQUBAPb/AAAJBQIA9v/7/wkFAgD2//z/CQUCAPb///8JBQIA9v8AAAkFAwD2//z/CQUDAPb//f8JBQMA9v/+/wkFAwD2////CQX9//f//P8JBf3/9//9/wkF/f/3//7/CQX+//f/+v8JBf7/9//7/wkF/v/3////CQX///f/+v8JBf//9//7/wkF///3/wAACQUAAPf/+v8JBQAA9/8AAAkFAQD3//r/CQUBAPf/AAAJBQIA9//7/wkFAgD3////CQUCAPf/AAAJBQMA9//8/wkFAwD3//3/CQUDAPf//v8JBQMA9////wkF/f/4//v/CQX9//j//P8JBf3/+P/9/wkF/f/4//7/CQX9//j///8JBf7/+P/6/wkF/v/4//v/CQX+//j///8JBf7/+P8AAAkF///4//r/CQX///j/AAAJBQAA+P/6/wkFAAD4/wAACQUBAPj/+v8JBQEA+P8AAAkFAQD4/wEACQUCAPj/+v8JBQIA+P/7/wkFAgD4/wAACQUDAPj/+/8JBQMA+P/8/wkFAwD4//3/CQUDAPj//v8JBQMA+P///wkFAwD4/wAACQX9//n/+/8JBf3/+f/8/wkF/f/5//3/CQX9//n//v8JBf3/+f///wkF/v/5//r/CQX+//n/+/8JBf7/+f///wkF/v/5/wAACQX///n/+v8JBf//+f8AAAkFAAD5//r/CQUAAPn/AAAJBQAA+f8BAAkFAQD5//r/CQUBAPn/AQAJBQIA+f/6/wkFAgD5//v/CQUCAPn/AAAJBQIA+f8BAAkFAwD5//v/CQUDAPn//P8JBQMA+f/9/wkFAwD5//7/CQUDAPn///8JBQMA+f8AAAkF/f/6//v/CQX9//r//P8JBf3/+v/9/wkF/f/6//7/CQX9//r///8JBf7/+v/6/wkF/v/6//v/CQX+//r///8JBf7/+v8AAAkF///6//r/CQX///r/AAAJBf//+v8BAAkFAAD6//r/CQUAAPr/AQAJBQEA+v/6/wkFAQD6/wEACQUCAPr/+v8JBQIA+v/7/wkFAgD6/wAACQUDAPr/+/8JBQMA+v/8/wkFAwD6//3/CQUDAPr//v8JBQMA+v///wkFAwD6/wAACQX9//v/+/8JBf3/+//8/wkF/f/7//3/CQX9//v//v8JBf3/+////wkF/v/7//r/CQX+//v/+/8JBf7/+////wkF/v/7/wAACQX///v/+v8JBf//+/8AAAkF///7/wEACQUAAPv/+v8JBQAA+/8BAAkFAQD7//r/CQUBAPv/AQAJBQIA+//7/wkFAgD7/wAACQUDAPv/+/8JBQMA+//8/wkFAwD7//3/CQUDAPv//v8JBQMA+////wkFAwD7/wAACQX9//z//P8JBf3//P/9/wkF/f/8//7/CQX9//z///8JBf3//P8AAAkF/v/8//v/CQX+//z//P8JBf7//P8AAAkF///8//r/CQX///z/+/8JBf///P8AAAkF///8/wEACQUAAPz/+v8JBQAA/P8BAAkFAQD8//v/CQUBAPz/AQAJBQIA/P/7/wkFAgD8//z/CQUCAPz///8JBQIA/P8AAAkFAwD8//z/CQUDAPz//f8JBQMA/P/+/wkFAwD8////CQX9//3//P8JBf3//f/9/wkF/f/9//7/CQX9//3///8JBf3//f8AAAkF/v/9//v/CQX+//3//P8JBf7//f8AAAkF/v/9/wEACQX///3/+/8JBf///f8BAAkFAAD9//v/CQUAAP3/AQAJBQEA/f/7/wkFAQD9/wEACQUCAP3/+/8JBQIA/f/8/wkFAgD9//3/CQUCAP3///8JBQIA/f8AAAkFAwD9//3/CQUDAP3//v8JBQMA/f///wkF/f/+//3/CQX9//7//v8JBf3//v///wkF/f/+/wAACQX+//7//P8JBf7//v/9/wkF/v/+/wAACQX+//7/AQAJBf///v/7/wkF///+//z/CQX///7/AQAJBf///v8CAAkFAAD+//v/CQUAAP7//P8JBQAA/v8BAAkFAAD+/wIACQUBAP7/+/8JBQEA/v/8/wkFAQD+/wEACQUCAP7//P8JBQIA/v/9/wkFAgD+//7/CQUCAP7///8JBQIA/v8AAAkFAwD+//7/CQUDAP7///8JBf3////+/wkF/f//////CQX9////AAAJBf3///8BAAkF/v////3/CQX+////AQAJBf7///8CAAkF//////z/CQX/////AQAJBf////8CAAkFAAD///z/CQUAAP//AQAJBQAA//8CAAkFAQD///z/CQUBAP//AQAJBQEA//8CAAkFAgD///3/CQUCAP///v8JBQIA/////wkFAgD//wAACQUCAP//AQAJBf3/AAD+/wkF/f8AAP//CQX9/wAAAAAJBf7/AAD9/wkF//8AAPz/CQX//wAAAgAJBQAAAAD8/wkFAAAAAAIACQUBAAAA/P8JBQEAAAD9/wkFAQAAAAEACQUBAAAAAgAJBQIAAAD9/wkFAgAAAP7/CQUCAAAA//8JBf//AQD9/wkFAAABAPz/CQUBAAEA/f8JBQIAAQD9/wkFAgABAP7/Cgb+//3/BQAKBv7//f8GAAoG/v/9/wcACgb+//3/CAAKBv7//f8JAAoG/v/9/woACgb+//3/CwAKBv///f/+/woG///9////Cgb///3/AAAKBv///f8BAAoG///9/wIACgb///3/AwAKBv///f8EAAoG///9/wUACgb///3/BgAKBv///f8HAAoG///9/wgACgb///3/CQAKBv///f8KAAoGAAD9//3/CgYAAP3//v8KBgAA/f///woGAAD9/wAACgYAAP3/AQAKBgAA/f8CAAoGAAD9/wMACgYAAP3/BAAKBgAA/f8FAAoGAAD9/wYACgYAAP3/BwAKBgAA/f8IAAoGAAD9/wkACgYAAP3/CgAKBgEA/f/9/woGAQD9//7/CgYBAP3///8KBgEA/f8AAAoGAQD9/wEACgYBAP3/AgAKBgEA/f8DAAoGAQD9/wQACgYBAP3/BQAKBgEA/f8GAAoGAQD9/wcACgYBAP3/CAAKBgEA/f8JAAoGAQD9/woACgYCAP3//v8KBgIA/f///woGAgD9/wAACgYCAP3/AQAKBgIA/f8CAAoGAgD9/wMACgYCAP3/BAAKBgIA/f8FAAoGAgD9/wYACgYCAP3/BwAKBgIA/f8IAAoGAgD9/wkACgYDAP3/AQAKBgMA/f8CAAoGAwD9/wMACgYDAP3/BAAKBgMA/f8FAAoGAwD9/wYACgYDAP3/BwAKBgMA/f8IAAoG/f/+/wcACgb+//7///8KBv7//v8AAAoG/v/+/wEACgb+//7/AgAKBv7//v8DAAoG/v/+/wQACgb+//7/BQAKBv7//v8GAAoG/v/+/wcACgb+//7/CAAKBv7//v8JAAoG/v/+/woACgb+//7/CwAKBv///v/+/woG///+////Cgb///7/AQAKBv///v8CAAoG///+/wMACgb///7/BAAKBv///v8HAAoG///+/wgACgb///7/CQAKBv///v8KAAoGAAD+//3/CgYAAP7/BgAKBgAA/v8HAAoGAAD+/wgACgYAAP7/CQAKBgAA/v8KAAoGAQD+//3/CgYBAP7//v8KBgEA/v8FAAoGAQD+/wYACgYBAP7/BwAKBgEA/v8IAAoGAQD+/wkACgYCAP7//v8KBgIA/v///woGAgD+/wAACgYCAP7/AQAKBgIA/v8CAAoGAgD+/wUACgYCAP7/BgAKBgIA/v8HAAoGAgD+/wgACgYCAP7/CQAKBgMA/v8BAAoGAwD+/wIACgYDAP7/AwAKBgMA/v8EAAoGAwD+/wUACgYDAP7/BgAKBgMA/v8HAAoG/v//////Cgb+////AAAKBv7///8BAAoG/v///wIACgb+////AwAKBv7///8EAAoG/v///wUACgb+////BgAKBv7///8HAAoG//////7/Cgb///////8KBv////8DAAoG/////wQACgb/////BQAKBv////8GAAoGAAD///3/CgYAAP///v8KBgAA//8EAAoGAAD//wUACgYAAP//BgAKBgEA///+/woGAQD/////CgYBAP//AwAKBgEA//8EAAoGAQD//wUACgYBAP//BgAKBgIA/////woGAgD//wAACgYCAP//AQAKBgIA//8CAAoGAgD//wMACgYCAP//BAAKBgIA//8FAAoGAwD//wQACgb+/wAA//8KBv7/AAAAAAoG/v8AAAEACgb+/wAAAgAKBv//AAABAAoG//8AAAIACgb//wAAAwAKBv//AAAEAAoGAAAAAAIACgYAAAAAAwAKBgAAAAAEAAoGAQAAAAIACgYBAAAAAwAKBgIAAAAAAAoGAgAAAAEACgYCAAAAAgAKBgIAAAADAAoG//8BAAEACgb//wEAAgAKBgAAAQACAAoGAQABAAEACgYBAAEAAgAKBgIAAQABAAsF/v/u/wAACwX+/+7/AQALBf7/7v8CAAsF///u/wIACwX//+7/AwALBQAA7v8DAAsFAQDu/wMACwUCAO7///8LBQIA7v8CAAsFAgDu/wMACwUDAO7///8LBQMA7v8AAAsFAwDu/wEACwUDAO7/AgALBf7/7//+/wsF/v/v////CwX+/+//AAALBf7/7/8BAAsF/v/v/wIACwX+/+//AwALBf//7//+/wsF///v/wIACwX//+//AwALBQAA7//+/wsFAADv/wMACwUBAO///v8LBQEA7/8DAAsFAQDv/wQACwUCAO///v8LBQIA7////wsFAgDv/wMACwUCAO//BAALBQMA7////wsFAwDv/wAACwUDAO//AQALBQMA7/8CAAsFAwDv/wMACwUEAO//AQALBf3/8P8AAAsF/f/w/wEACwX+//D//v8LBf7/8P///wsF/v/w/wEACwX+//D/AgALBf7/8P8DAAsF///w//7/CwX///D/AwALBf//8P8EAAsFAADw//7/CwUAAPD/AwALBQAA8P8EAAsFAQDw//7/CwUBAPD/BAALBQIA8P/+/wsFAgDw////CwUCAPD/BAALBQMA8P///wsFAwDw/wAACwUDAPD/AgALBQMA8P8DAAsFAwDw/wQACwUEAPD/AQALBQQA8P8CAAsF/f/x////CwX9//H/AAALBf3/8f8BAAsF/f/x/wIACwX+//H//v8LBf7/8f///wsF/v/x/wIACwX+//H/AwALBf7/8f8EAAsF///x//7/CwX///H/AwALBf//8f8EAAsFAADx//7/CwUAAPH/BAALBQEA8f/+/wsFAQDx/wQACwUBAPH/BQALBQIA8f/+/wsFAgDx/wQACwUDAPH//v8LBQMA8f///wsFAwDx/wAACwUDAPH/AgALBQMA8f8DAAsFAwDx/wQACwUEAPH/AAALBQQA8f8BAAsFBADx/wIACwX9//L///8LBf3/8v8AAAsF/f/y/wEACwX9//L/AgALBf3/8v8DAAsF/v/y//7/CwX+//L///8LBf7/8v8DAAsF/v/y/wQACwX///L//v8LBf//8v8EAAsF///y/wUACwUAAPL//v8LBQAA8v8FAAsFAQDy//7/CwUBAPL/BQALBQIA8v/+/wsFAgDy/wQACwUCAPL/BQALBQMA8v/+/wsFAwDy////CwUDAPL/AwALBQMA8v8EAAsFBADy/wAACwUEAPL/AQALBQQA8v8CAAsFBADy/wMACwX9//P///8LBf3/8/8AAAsF/f/z/wEACwX9//P/AgALBf3/8/8DAAsF/f/z/wQACwX+//P//v8LBf7/8/8EAAsF/v/z/wUACwX///P//v8LBf//8/8FAAsFAADz//7/CwUAAPP/BQALBQEA8//+/wsFAQDz/wUACwUCAPP//v8LBQIA8/8FAAsFAwDz//7/CwUDAPP///8LBQMA8/8EAAsFAwDz/wUACwUEAPP///8LBQQA8/8AAAsFBADz/wEACwUEAPP/AgALBQQA8/8DAAsF/P/0/wIACwX8//T/AwALBf3/9P///wsF/f/0/wAACwX9//T/AQALBf3/9P8CAAsF/f/0/wMACwX9//T/BAALBf7/9P/+/wsF/v/0/wUACwX+//T/BgALBf//9P/+/wsF///0/wUACwX///T/BgALBQAA9P/9/wsFAAD0//7/CwUAAPT/BQALBQAA9P8GAAsFAQD0//3/CwUBAPT//v8LBQEA9P8FAAsFAQD0/wYACwUCAPT//v8LBQIA9P8FAAsFAwD0//7/CwUDAPT///8LBQMA9P8EAAsFAwD0/wUACwUEAPT///8LBQQA9P8AAAsFBAD0/wEACwUEAPT/AgALBQQA9P8DAAsFBAD0/wQACwX8//X/AQALBfz/9f8CAAsF/P/1/wMACwX8//X/BAALBf3/9f///wsF/f/1/wAACwX9//X/BAALBf3/9f8FAAsF/v/1//7/CwX+//X/BQALBf7/9f8GAAsF///1//7/CwX///X/BgALBQAA9f/9/wsFAAD1//7/CwUAAPX/BgALBQEA9f/9/wsFAQD1/wYACwUCAPX//f8LBQIA9f/+/wsFAgD1/wUACwUCAPX/BgALBQMA9f/+/wsFAwD1////CwUDAPX/BAALBQMA9f8FAAsFBAD1////CwUEAPX/AAALBQQA9f8BAAsFBAD1/wIACwUEAPX/AwALBQQA9f8EAAsFBQD1/wIACwX8//b/AAALBfz/9v8BAAsF/P/2/wIACwX8//b/AwALBfz/9v8EAAsF/P/2/wUACwX9//b///8LBf3/9v8AAAsF/f/2/wQACwX9//b/BQALBf3/9v8GAAsF/v/2//7/CwX+//b/BgALBf//9v/+/wsF///2/wYACwUAAPb//f8LBQAA9v/+/wsFAAD2/wYACwUBAPb//f8LBQEA9v8GAAsFAgD2//3/CwUCAPb//v8LBQIA9v8GAAsFAwD2//7/CwUDAPb/BQALBQMA9v8GAAsFBAD2////CwUEAPb/AAALBQQA9v8DAAsFBAD2/wQACwUEAPb/BQALBQUA9v8AAAsFBQD2/wEACwUFAPb/AgALBQUA9v8DAAsF/P/3/wAACwX8//f/AQALBfz/9/8CAAsF/P/3/wMACwX8//f/BAALBfz/9/8FAAsF/f/3////CwX9//f/AAALBf3/9/8FAAsF/f/3/wYACwX+//f//v8LBf7/9/8GAAsF///3//7/CwX///f/BgALBf//9/8HAAsFAAD3//3/CwUAAPf//v8LBQAA9/8HAAsFAQD3//3/CwUBAPf/BgALBQEA9/8HAAsFAgD3//3/CwUCAPf//v8LBQIA9/8GAAsFAgD3/wcACwUDAPf//v8LBQMA9/8FAAsFAwD3/wYACwUEAPf//v8LBQQA9////wsFBAD3/wQACwUEAPf/BQALBQUA9/8AAAsFBQD3/wEACwUFAPf/AgALBQUA9/8DAAsFBQD3/wQACwX8//j/AAALBfz/+P8BAAsF/P/4/wIACwX8//j/AwALBfz/+P8EAAsF/P/4/wUACwX9//j///8LBf3/+P8GAAsF/v/4//7/CwX+//j/BgALBf7/+P8HAAsF///4//7/CwX///j/BwALBQAA+P/9/wsFAAD4//7/CwUAAPj/BwALBQEA+P/9/wsFAQD4/wcACwUCAPj//f8LBQIA+P/+/wsFAgD4/wYACwUCAPj/BwALBQMA+P/+/wsFAwD4/wYACwUEAPj//v8LBQQA+P///wsFBAD4/wQACwUEAPj/BQALBQQA+P8GAAsFBQD4////CwUFAPj/AAALBQUA+P8BAAsFBQD4/wIACwUFAPj/AwALBQUA+P8EAAsF/P/5/wAACwX8//n/AQALBfz/+f8CAAsF/P/5/wMACwX8//n/BAALBfz/+f8FAAsF/P/5/wYACwX9//n///8LBf3/+f8AAAsF/f/5/wYACwX+//n//v8LBf7/+f8GAAsF/v/5/wcACwX///n//v8LBf//+f8HAAsFAAD5//3/CwUAAPn/BwALBQEA+f/9/wsFAQD5/wcACwUCAPn//f8LBQIA+f/+/wsFAgD5/wcACwUDAPn//v8LBQMA+f8GAAsFAwD5/wcACwUEAPn//v8LBQQA+f///wsFBAD5/wUACwUEAPn/BgALBQUA+f///wsFBQD5/wAACwUFAPn/AQALBQUA+f8CAAsFBQD5/wMACwUFAPn/BAALBQUA+f8FAAsF/P/6/wAACwX8//r/AQALBfz/+v8CAAsF/P/6/wMACwX8//r/BAALBfz/+v8FAAsF/P/6/wYACwX9//r///8LBf3/+v8AAAsF/f/6/wYACwX+//r//v8LBf7/+v8HAAsF///6//7/CwX///r/BwALBQAA+v/9/wsFAAD6/wcACwUBAPr//f8LBQEA+v8HAAsFAgD6//3/CwUCAPr//v8LBQIA+v8HAAsFAwD6//7/CwUDAPr/BgALBQMA+v8HAAsFBAD6//7/CwUEAPr///8LBQQA+v8FAAsFBAD6/wYACwUFAPr///8LBQUA+v8AAAsFBQD6/wEACwUFAPr/AgALBQUA+v8DAAsFBQD6/wQACwUFAPr/BQALBfv/+/8EAAsF/P/7/wEACwX8//v/AgALBfz/+/8DAAsF/P/7/wQACwX8//v/BQALBfz/+/8GAAsF/f/7////CwX9//v/AAALBf3/+/8GAAsF/v/7//7/CwX+//v///8LBf7/+/8HAAsF///7//3/CwX///v//v8LBf//+/8HAAsFAAD7//3/CwUAAPv/BwALBQEA+//9/wsFAQD7/wcACwUCAPv//f8LBQIA+/8HAAsFAwD7//7/CwUDAPv/BgALBQMA+/8HAAsFBAD7//7/CwUEAPv///8LBQQA+/8FAAsFBAD7/wYACwUFAPv///8LBQUA+/8AAAsFBQD7/wEACwUFAPv/AgALBQUA+/8DAAsFBQD7/wQACwUFAPv/BQALBfv//P8EAAsF/P/8/wAACwX8//z/AQALBfz//P8CAAsF/P/8/wMACwX8//z/BAALBfz//P8FAAsF/P/8/wYACwX9//z///8LBf3//P8AAAsF/f/8/wYACwX+//z//v8LBf7//P///wsF/v/8/wcACwX///z//f8LBf///P/+/wsF///8/wcACwUAAPz//f8LBQAA/P8HAAsFAQD8//3/CwUBAPz/BwALBQIA/P/9/wsFAgD8/wcACwUDAPz//f8LBQMA/P/+/wsFAwD8/wYACwUDAPz/BwALBQQA/P/9/wsFBAD8//7/CwUEAPz///8LBQQA/P8FAAsFBAD8/wYACwUFAPz///8LBQUA/P8AAAsFBQD8/wEACwUFAPz/AgALBQUA/P8DAAsFBQD8/wQACwUFAPz/BQALBQYA/P8CAAsF/P/9/wEACwX8//3/AgALBfz//f8DAAsF/P/9/wQACwX8//3/BQALBfz//f8GAAsF/f/9////CwX9//3/AAALBf3//f8GAAsF/v/9//7/CwX+//3///8LBf7//f8HAAsF///9//3/CwX///3//v8LBf///f8HAAsFAAD9//z/CwUAAP3//f8LBQAA/f8HAAsFAQD9//z/CwUBAP3//f8LBQEA/f8HAAsFAgD9//z/CwUCAP3/BwALBQMA/f/8/wsFAwD9/wYACwUEAP3//f8LBQQA/f/+/wsFBAD9/wUACwUEAP3/BgALBQUA/f/+/wsFBQD9////CwUFAP3/AwALBQUA/f8EAAsFBQD9/wUACwUGAP3/AgALBQYA/f8DAAsFBgD9/wQACwX8//7/AQALBfz//v8CAAsF/P/+/wMACwX8//7/BAALBfz//v8FAAsF/f/+////CwX9//7/AAALBf3//v8BAAsF/f/+/wYACwX+//7//v8LBf7//v8GAAsF/v/+/wcACwX///7//P8LBf///v/9/wsF///+/wcACwUAAP7//P8LBQAA/v8HAAsFAQD+//v/CwUBAP7//P8LBQEA/v8HAAsFAgD+//v/CwUCAP7/BwALBQMA/v8GAAsFAwD+/wcACwUEAP7/BQALBQQA/v8GAAsFBQD+/wUACwUGAP7/BQALBfz///8CAAsF/P///wMACwX8////BAALBfz///8FAAsF/f//////CwX9////AAALBf3///8BAAsF/f///wUACwX9////BgALBf7////9/wsF/v////7/CwX+//////8LBf7///8GAAsF//////z/CwX//////f8LBf////8HAAsFAAD///v/CwUAAP///P8LBQAA//8HAAsFAQD//wcACwUCAP//BgALBQIA//8HAAsFAwD//wYACwUEAP//BgALBQUA//8GAAsF/P8AAAIACwX8/wAAAwALBfz/AAAEAAsF/f8AAP//CwX9/wAAAAALBf3/AAABAAsF/f8AAAIACwX9/wAABAALBf3/AAAFAAsF/v8AAP3/CwX+/wAA/v8LBf7/AAD//wsF/v8AAAYACwX//wAA/f8LBf//AAAHAAsFAAAAAAcACwUBAAAABgALBQEAAAAHAAsFAgAAAAYACwUCAAAABwALBQMAAAAGAAsFBAAAAAYACwX9/wEAAAALBf3/AQABAAsF/f8BAAIACwX9/wEAAwALBf3/AQAEAAsF/f8BAAUACwX+/wEA//8LBf7/AQAGAAsF//8BAAYACwX//wEABwALBQAAAQAGAAsFAAABAAcACwUBAAEABgALBQEAAQAHAAsFAgABAAYACwUDAAEABgALBf3/AgABAAsF/f8CAAIACwX9/wIAAwALBf3/AgAEAAsF/f8CAAUACwX+/wIABQALBf7/AgAGAAsF//8CAAYACwUAAAIABgAMBf7/7P/9/wwF///s//z/DAX//+z//f8MBQAA7P/8/wwFAQDs//z/DAUBAOz//f8MBf7/7f/9/wwF/v/t//7/DAX+/+3///8MBf//7f/8/wwF///t//3/DAUAAO3//P8MBQEA7f/8/wwFAQDt//3/DAUCAO3//f8MBQIA7f/+/wwF/v/u//3/DAX+/+7//v8MBf7/7v///wwF///u//z/DAX//+7//f8MBf//7v///wwF///u/wAADAUAAO7//P8MBQAA7v8AAAwFAQDu//z/DAUBAO7//f8MBQEA7v///wwFAQDu/wAADAUCAO7//f8MBQIA7v/+/wwFAgDu////DAX+/+///f8MBf7/7//+/wwF///v//z/DAX//+///f8MBf//7////wwFAADv//z/DAUAAO////8MBQAA7/8AAAwFAQDv//z/DAUBAO///f8MBQEA7//+/wwFAQDv////DAUCAO///f8MBQIA7//+/wwF/v/w//3/DAX+//D//v8MBf//8P/8/wwF///w//3/DAX///D///8MBQAA8P/8/wwFAADw////DAUBAPD//P8MBQEA8P/9/wwFAQDw////DAUCAPD//f8MBQIA8P/+/wwF/v/x//3/DAX+//H//v8MBf//8f/8/wwF///x//3/DAX///H///8MBQAA8f/8/wwFAADx////DAUBAPH/+/8MBQEA8f/8/wwFAQDx////DAUCAPH//P8MBQIA8f/9/wwFAgDx//7/DAUCAPH///8MBf7/8v/8/wwF/v/y//3/DAX+//L//v8MBf7/8v///wwF///y//v/DAX///L//P8MBf//8v/9/wwF///y////DAUAAPL/+/8MBQAA8v/8/wwFAADy////DAUAAPL/AAAMBQEA8v/7/wwFAQDy//z/DAUBAPL///8MBQIA8v/8/wwFAgDy//3/DAUCAPL//v8MBQIA8v///wwF/v/z//z/DAX+//P//f8MBf7/8//+/wwF/v/z////DAX///P/+/8MBf//8//8/wwF///z////DAX///P/AAAMBQAA8//7/wwFAADz////DAUAAPP/AAAMBQEA8//7/wwFAQDz//z/DAUBAPP///8MBQIA8//8/wwFAgDz//3/DAUCAPP//v8MBQIA8////wwF/v/0//z/DAX+//T//f8MBf7/9P/+/wwF/v/0////DAX///T/+/8MBf//9P/8/wwF///0////DAX///T/AAAMBQAA9P/7/wwFAAD0/wAADAUBAPT/+/8MBQEA9P///wwFAQD0/wAADAUCAPT//P8MBQIA9P/9/wwFAgD0//7/DAUCAPT///8MBf3/9f/9/wwF/f/1//7/DAX+//X/+/8MBf7/9f/8/wwF/v/1//7/DAX+//X///8MBf//9f/7/wwF///1/wAADAUAAPX/+/8MBQAA9f8AAAwFAQD1//v/DAUBAPX///8MBQEA9f8AAAwFAgD1//v/DAUCAPX//P8MBQIA9f/9/wwFAgD1//7/DAUCAPX///8MBf3/9v/8/wwF/f/2//3/DAX9//b//v8MBf3/9v///wwF/v/2//v/DAX+//b//P8MBf7/9v///wwF/v/2/wAADAX///b/+/8MBf//9v8AAAwFAAD2//r/DAUAAPb/+/8MBQAA9v8AAAwFAQD2//r/DAUBAPb/+/8MBQEA9v///wwFAQD2/wAADAUCAPb/+/8MBQIA9v/8/wwFAgD2//7/DAUCAPb///8MBQMA9v/8/wwFAwD2//3/DAUDAPb//v8MBf3/9//8/wwF/f/3//3/DAX9//f//v8MBf3/9////wwF/v/3//v/DAX+//f///8MBf7/9/8AAAwF///3//r/DAX///f/AAAMBQAA9//6/wwFAAD3/wAADAUBAPf/+v8MBQEA9//7/wwFAQD3/wAADAUCAPf/+v8MBQIA9//7/wwFAgD3////DAUDAPf//P8MBQMA9//9/wwFAwD3//7/DAX9//j/+/8MBf3/+P/8/wwF/f/4//3/DAX9//j//v8MBf3/+P///wwF/f/4/wAADAX+//j/+v8MBf7/+P/7/wwF/v/4/wAADAX///j/+v8MBf//+P8AAAwF///4/wEADAUAAPj/+v8MBQAA+P8AAAwFAQD4//r/DAUBAPj/AAAMBQIA+P/6/wwFAgD4//v/DAUCAPj///8MBQIA+P8AAAwFAwD4//v/DAUDAPj//P8MBQMA+P/9/wwFAwD4//7/DAUDAPj///8MBf3/+f/7/wwF/f/5//z/DAX9//n//f8MBf3/+f/+/wwF/f/5////DAX9//n/AAAMBf7/+f/6/wwF/v/5//v/DAX+//n/AAAMBf7/+f8BAAwF///5//r/DAX///n/AQAMBQAA+f/6/wwFAAD5/wAADAUAAPn/AQAMBQEA+f/6/wwFAQD5/wAADAUCAPn/+v8MBQIA+f/7/wwFAgD5////DAUCAPn/AAAMBQMA+f/7/wwFAwD5//z/DAUDAPn//f8MBQMA+f/+/wwFAwD5////DAX9//r/+/8MBf3/+v/8/wwF/f/6//3/DAX9//r//v8MBf3/+v///wwF/f/6/wAADAX+//r/+v8MBf7/+v/7/wwF/v/6/wAADAX///r/+v8MBf//+v8BAAwFAAD6//r/DAUAAPr/AQAMBQEA+v/6/wwFAQD6/wAADAUBAPr/AQAMBQIA+v/6/wwFAgD6//v/DAUCAPr///8MBQIA+v8AAAwFAwD6//v/DAUDAPr//P8MBQMA+v/9/wwFAwD6//7/DAUDAPr///8MBf3/+//7/wwF/f/7//z/DAX9//v//f8MBf3/+//+/wwF/f/7////DAX9//v/AAAMBf7/+//7/wwF/v/7/wAADAX///v/+v8MBf//+/8BAAwFAAD7//r/DAUAAPv/AQAMBQEA+//6/wwFAQD7/wAADAUBAPv/AQAMBQIA+//6/wwFAgD7//v/DAUCAPv///8MBQIA+/8AAAwFAwD7//v/DAUDAPv//P8MBQMA+//9/wwFAwD7//7/DAUDAPv///8MBf3//P/8/wwF/f/8//3/DAX9//z//v8MBf3//P///wwF/v/8//v/DAX+//z//P8MBf7//P///wwF/v/8/wAADAX///z/+/8MBf///P8BAAwFAAD8//r/DAUAAPz/AQAMBQEA/P/6/wwFAQD8//v/DAUBAPz/AAAMBQEA/P8BAAwFAgD8//v/DAUCAPz//P8MBQIA/P8AAAwFAwD8//z/DAUDAPz//f8MBQMA/P/+/wwFAwD8////DAUDAPz/AAAMBf3//f/9/wwF/f/9//7/DAX9//3///8MBf7//f/7/wwF/v/9//z/DAX+//3//f8MBf7//f///wwF/v/9/wAADAX///3/+/8MBf///f8BAAwFAAD9//v/DAUAAP3/AQAMBQEA/f/7/wwFAQD9/wEADAUCAP3/+/8MBQIA/f/8/wwFAgD9/wAADAUCAP3/AQAMBQMA/f/8/wwFAwD9//3/DAUDAP3//v8MBQMA/f///wwFAwD9/wAADAX9//7//v8MBf3//v///wwF/v/+//z/DAX+//7//f8MBf7//v/+/wwF/v/+////DAX+//7/AAAMBf///v/7/wwF///+//z/DAX///7/AQAMBQAA/v/7/wwFAAD+//z/DAUAAP7/AQAMBQAA/v8CAAwFAQD+//v/DAUBAP7//P8MBQEA/v8BAAwFAQD+/wIADAUCAP7//P8MBQIA/v/9/wwFAgD+/wAADAUCAP7/AQAMBQMA/v/9/wwFAwD+//7/DAUDAP7///8MBQMA/v8AAAwF/v////3/DAX+/////v8MBf7//////wwF/v///wAADAX+////AQAMBf/////8/wwF/////wEADAX/////AgAMBQAA///8/wwFAAD//wEADAUAAP//AgAMBQEA///8/wwFAQD//wEADAUBAP//AgAMBQIA///9/wwFAgD//wEADAUCAP//AgAMBQMA///+/wwFAwD/////DAUDAP//AAAMBQMA//8BAAwF/v8AAP3/DAX+/wAA/v8MBf7/AAD//wwF//8AAPz/DAX//wAA/f8MBf//AAABAAwF//8AAAIADAUAAAAA/P8MBQAAAAACAAwFAQAAAPz/DAUBAAAAAgAMBQIAAAD9/wwFAwAAAP7/DAUDAAAA//8MBQMAAAAAAAwF/v8BAP3/DAX+/wEA/v8MBf//AQD9/wwFAAABAPz/DAUBAAEA/f8NBv3//f8BAA0G/f/9/wIADQb9//3/AwANBv3//f8EAA0G/f/9/wUADQb9//3/BgANBv3//f8HAA0G/f/9/wgADQb+//3//v8NBv7//f///w0G/v/9/wAADQb+//3/AQANBv7//f8CAA0G/v/9/wMADQb+//3/BAANBv7//f8FAA0G/v/9/wYADQb+//3/BwANBv7//f8IAA0G/v/9/wkADQb///3//f8NBv///f/+/w0G///9////DQb///3/AAANBv///f8BAA0G///9/wIADQb///3/AwANBv///f8EAA0G///9/wUADQb///3/BgANBv///f8HAA0G///9/wgADQb///3/CQANBv///f8KAA0GAAD9//3/DQYAAP3//v8NBgAA/f///w0GAAD9/wAADQYAAP3/AQANBgAA/f8CAA0GAAD9/wMADQYAAP3/BAANBgAA/f8FAA0GAAD9/wYADQYAAP3/BwANBgAA/f8IAA0GAAD9/wkADQYAAP3/CgANBgEA/f/+/w0GAQD9////DQYBAP3/AAANBgEA/f8BAA0GAQD9/wIADQYBAP3/AwANBgEA/f8EAA0GAQD9/wUADQYBAP3/BgANBgEA/f8HAA0GAQD9/wgADQYBAP3/CQANBgEA/f8KAA0GAgD9/wUADQYCAP3/BgANBgIA/f8HAA0GAgD9/wgADQYCAP3/CQANBgIA/f8KAA0GAgD9/wsADQb9//7/AQANBv3//v8CAA0G/f/+/wMADQb9//7/BAANBv3//v8FAA0G/f/+/wYADQb9//7/BwANBv7//v/+/w0G/v/+////DQb+//7/AAANBv7//v8BAA0G/v/+/wIADQb+//7/BQANBv7//v8GAA0G/v/+/wcADQb+//7/CAANBv7//v8JAA0G///+//3/DQb///7//v8NBv///v8FAA0G///+/wYADQb///7/BwANBv///v8IAA0G///+/wkADQYAAP7//f8NBgAA/v8GAA0GAAD+/wcADQYAAP7/CAANBgAA/v8JAA0GAAD+/woADQYBAP7//v8NBgEA/v///w0GAQD+/wEADQYBAP7/AgANBgEA/v8DAA0GAQD+/wQADQYBAP7/BwANBgEA/v8IAA0GAQD+/wkADQYBAP7/CgANBgIA/v///w0GAgD+/wAADQYCAP7/AQANBgIA/v8CAA0GAgD+/wMADQYCAP7/BAANBgIA/v8FAA0GAgD+/wYADQYCAP7/BwANBgIA/v8IAA0GAgD+/wkADQYCAP7/CgANBgIA/v8LAA0GAwD+/wcADQb9////BAANBv7//////w0G/v///wAADQb+////AQANBv7///8CAA0G/v///wMADQb+////BAANBv7///8FAA0G//////7/DQb///////8NBv////8DAA0G/////wQADQb/////BQANBv////8GAA0GAAD///3/DQYAAP///v8NBgAA//8EAA0GAAD//wUADQYAAP//BgANBgEA///+/w0GAQD/////DQYBAP//AwANBgEA//8EAA0GAQD//wUADQYBAP//BgANBgIA/////w0GAgD//wAADQYCAP//AQANBgIA//8CAA0GAgD//wMADQYCAP//BAANBgIA//8FAA0GAgD//wYADQYCAP//BwANBv7/AAAAAA0G/v8AAAEADQb+/wAAAgANBv7/AAADAA0G//8AAAIADQb//wAAAwANBgAAAAACAA0GAAAAAAMADQYAAAAABAANBgEAAAABAA0GAQAAAAIADQYBAAAAAwANBgEAAAAEAA0GAgAAAP//DQYCAAAAAAANBgIAAAABAA0GAgAAAAIADQb+/wEAAQANBv//AQABAA0G//8BAAIADQYAAAEAAgANBgEAAQABAA0GAQABAAIADgMCABoA+P8OAwMAGgD4/w4DAwAaAAcADgMEABoA+P8OAwQAGgAHAA4DBQAaAPj/DgMFABoABwAOAwYAGgD4/w4DBgAaAAcADgMHABoA+P8OAwcAGgAHAA4DCAAaAPj/DgMIABoABwAOAwkAGgD4/w4DCQAaAAcADgMKABoA+P8OAwsAGgD4/w4DCwAaAPn/DgMMABoA+P8OAwwAGgD5/w4DAgAbAPj/DgMDABsA+P8OAwQAGwD4/w4DBAAbAAcADgMFABsA+P8OAwUAGwAHAA4DBgAbAPj/DgMGABsABwAOAwcAGwD4/w4DBwAbAAcADgMIABsA+P8OAwgAGwAHAA4DCQAbAPj/DgMKABsA+P8OAwsAGwD4/w4DCwAbAPn/DgMCABwA+P8OAwMAHAD4/w4DBAAcAPj/DgMEABwABwAOAwUAHAD4/w4DBQAcAAcADgMGABwA+P8OAwYAHAAHAA4DBwAcAPj/DgMHABwABwAOAwgAHAD4/w4DCAAcAAcADgMJABwA+P8OAwoAHAD4/w4DCwAcAPj/DgMLABwA+f8OAwIAHQD4/w4DAwAdAPj/DgMEAB0A+P8OAwQAHQAHAA4DBQAdAPj/DgMFAB0ABwAOAwYAHQD4/w4DBgAdAAcADgMHAB0A+P8OAwcAHQAHAA4DCAAdAPj/DgMIAB0ABwAOAwkAHQD4/w4DCgAdAPj/DgMLAB0A+P8OAwsAHQD5/w4DAgAeAPj/DgMDAB4A+P8OAwQAHgD4/w4DBAAeAAcADgMFAB4A+P8OAwUAHgAHAA4DBgAeAPj/DgMGAB4ABwAOAwcAHgD4/w4DBwAeAAcADgMIAB4A+P8OAwgAHgAHAA4DCQAeAPj/DgMKAB4A+P8OAwoAHgD5/w4DAgAfAPj/DgMDAB8A+P8OAwQAHwD4/w4DBAAfAAcADgMFAB8A+P8OAwUAHwAHAA4DBgAfAPj/DgMGAB8ABwAOAwcAHwD4/w4DBwAfAAcADgMIAB8A+P8OAwgAHwAHAA4DCQAfAPj/DgMKAB8A+P8OAwoAHwD5/w4DAgAgAPj/DgMDACAA+P8OAwQAIAD4/w4DBAAgAAcADgMFACAA+P8OAwUAIAAHAA4DBgAgAPj/DgMGACAABwAOAwcAIAD4/w4DBwAgAAcADgMIACAA+P8OAwgAIAAHAA4DCQAgAPj/DgMKACAA+P8OAwoAIAD5/w4DAgAhAPj/DgMDACEA+P8OAwQAIQD4/w4DBAAhAAcADgMFACEA+P8OAwUAIQAHAA4DBgAhAPj/DgMGACEABwAOAwcAIQD4/w4DBwAhAAcADgMIACEA+P8OAwgAIQAHAA4DCQAhAPj/DgMKACEA+P8OAwoAIQD5/w4DAgAiAPj/DgMDACIA+P8OAwQAIgD4/w4DBAAiAAcADgMFACIA+P8OAwUAIgAHAA4DBgAiAPj/DgMGACIABwAOAwcAIgD4/w4DBwAiAAcADgMIACIA+P8OAwkAIgD4/w4DCgAiAPj/DgMKACIA+f8OAwIAIwD4/w4DAwAjAPj/DgMEACMA+P8OAwQAIwAHAA4DBQAjAPj/DgMFACMABwAOAwYAIwD4/w4DBgAjAAcADgMHACMA+P8OAwcAIwAHAA4DCAAjAPj/DgMJACMA+P8OAwkAIwD5/w4DAgAkAPj/DgMDACQA+P8OAwQAJAD4/w4DBAAkAAcADgMFACQA+P8OAwUAJAAHAA4DBgAkAPj/DgMGACQABwAOAwcAJAD4/w4DBwAkAAcADgMIACQA+P8OAwkAJAD4/w4DCQAkAPn/DgMCACUA+P8OAwMAJQD4/w4DBAAlAPj/DgMEACUABwAOAwUAJQD4/w4DBQAlAAcADgMGACUA+P8OAwYAJQAHAA4DBwAlAPj/DgMHACUABwAOAwgAJQD4/w4DCQAlAPj/DgMJACUA+f8OAwIAJgD5/w4DAwAmAPn/DgMEACYA+f8OAwQAJgAHAA4DBQAmAPn/DgMFACYABwAOAwYAJgD5/w4DBgAmAAcADgMHACYA+f8OAwcAJgAHAA4DCAAmAPn/DgMJACYA+f8OAwkAJgD6/w4DAgAnAPn/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DgMIADMA+P8OAwkAMwD4/w4DCQAzAPn/DgMJADMAAAAOAwkAMwAHAA4D+f80APj/DgP6/zQA+P8OA/v/NAD4/w4D/P80APj/DgP9/zQA+P8OA/7/NAD4/w4D//80APj/DgMAADQA+P8OAwEANAD4/w4DAgA0APj/DgMDADQA+P8OAwQANAD4/w4DBAA0AAgADgMFADQA+P8OAwYANAD4/w4DBwA0APj/DgMIADQA+P8OAwkANAD4/w4DCQA0APn/DgMJADQAAAAOAwkANAAHAA4D+f81APj/DgP8/zUA+P8OA/3/NQD4/w4D/v81APj/DgP//zUA+P8OAwAANQD4/w4DAQA1APj/DgMCADUA+P8OAwMANQD4/w4DBAA1APj/DgMEADUACAAOAwUANQD4/w4DBgA1APj/DgMHADUA+P8OAwgANQD4/w4DCQA1APj/DgP4/zYA+P8OA/n/NgD4/w4D/P82APj/DgP9/zYA+P8OA/7/NgD4/w4D//82APj/DgMAADYA+P8OAwEANgD4/w4DAgA2APj/DgMDADYA+P8OAwQANgD4/w4DBAA2AAgADgMFADYA+P8OAwYANgD4/w4DBwA2APj/DgMIADYA+P8OAwkANgD4/w4DCQA2APn/DgMJADYAAAAOAwkANgAHAA4D+P83APj/DgP5/zcA+P8OA/r/NwD4/w4D+/83APj/DgP8/zcA+P8OA/3/NwD4/w4D/v83APj/DgP//zcA+P8OAwAANwD4/w4DAQA3APj/DgMCADcA+P8OAwMANwD4/w4DBAA3APj/DgMEADcACAAOAwUANwD4/w4DBgA3APj/DgMHADcA+P8OAwgANwD4/w4DCQA3APj/DgMJADcA+f8OAwkANwAAAA4DCQA3AAcADgP4/zgA+P8OA/n/OAD4/w4D/P84APj/DgP9/zgA+P8OA/7/OAD4/w4D//84APj/DgMAADgA+P8OAwEAOAD4/w4DAgA4APj/DgMDADgA+P8OAwQAOAD4/w4DBAA4AAgADgMFADgA+P8OAwYAOAD4/w4DBwA4APj/DgMIADgA+P8OAwkAOAD4/w4DCQA4APn/DgMJADgAAAAOAwkAOAAHAA4D+P85APj/DgP5/zkA+P8OA/r/OQD4/w4D/P85APj/DgP9/zkA+P8OA/7/OQD4/w4D//85APj/DgMAADkA+P8OAwEA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NwD4/w4E/P83AAgADgT2/zgA+P8OBPb/OAD5/w4E9v84AAAADgT2/zgABwAOBPf/OAD4/w4E/P84AAgADgT2/zkA+P8OBPb/OQD5/w4E9v85AAAADgT2/zkABwAOBPf/OQD4/w4E/P85AAgADgT2/zoA+P8OBPb/OgD5/w4E9v86AAAADgT2/zoABwAOBPf/OgD4/w4E/P86AAgADgT2/zsA+P8OBPb/OwD5/w4E9v87AAAADgT2/zsABwAOBPf/OwD4/w4E/P87AAgADgT2/zwA+P8OBPb/PAD5/w4E9v88AAAADgT2/zwABwAOBPf/PAD4/w4E/P88AAgADgT2/z0A+P8OBPb/PQD5/w4E9v89AAAADgT2/z0ABwAOBPf/PQD4/w4E/P89AAgADgf8/y4A8v8OB/z/LgDz/w4H/f8uAPL/Dgf9/y4A8/8OB/7/LgDy/w4H/v8uAPP/Dgf//y4A8v8OB///LgDz/w4HAAAuAPL/DgcAAC4A8/8OBwEALgDy/w4HAQAuAPP/DgcCAC4A8v8OBwIALgDz/w4HAwAuAPL/DgcDAC4A8/8OBwQALgDy/w4HBAAuAPP/Dgf8/y8A8v8OB/z/LwDz/w4H/f8vAPL/Dgf9/y8A8/8OB/7/LwDy/w4H/v8vAPP/Dgf//y8A8v8OB///LwDz/w4HAAAvAPL/DgcAAC8A8/8OBwEALwDy/w4HAQAvAPP/DgcCAC8A8v8OBwIALwDz/w4HAwAvAPL/DgcDAC8A8/8OBwQALwDy/w4HBAAvAPP/Dgf8/zAA8v8OB/z/MADz/w4H/f8wAPL/Dgf9/zAA8/8OB/7/MADy/w4H/v8wAPP/Dgf//zAA8v8OB///MADz/w4HAAAwAPL/DgcAADAA8/8OBwEAMADy/w4HAQAwAPP/DgcCADAA8v8OBwIAMADz/w4HAwAwAPL/DgcDADAA8/8OBwQAMADy/w4HBAAwAPP/Dgf8/zEA8v8OB/z/MQDz/w4H/f8xAPL/Dgf9/zEA8/8OB/7/MQDy/w4H/v8xAPP/Dgf//zEA8v8OB///MQDz/w4HAAAxAPP/DgcBADEA8v8OBwEAMQDz/w4HAgAxAPL/DgcCADEA8/8OBwMAMQDy/w4HAwAxAPP/DgcEADEA8v8OBwQAMQDz/w4H/P8yAPL/Dgf8/zIA8/8OB/3/MgDy/w4H/f8yAPP/Dgf+/zIA8v8OB/7/MgDz/w4H//8yAPL/Dgf//zIA8/8OBwAAMgDy/w4HAAAyAPP/DgcBADIA8v8OBwEAMgDz/w4HAgAyAPL/DgcCADIA8/8OBwMAMgDy/w4HAwAyAPP/DgcEADIA8v8OBwQAMgDz/w4H/P8zAPL/Dgf8/zMA8/8OB/3/MwDy/w4H/f8zAPP/Dgf+/zMA8v8OB/7/MwDz/w4H//8zAPL/Dgf//zMA8/8OBwAAMwDy/w4HAAAzAPP/DgcBADMA8v8OBwEAMwDz/w4HAgAzAPL/DgcCADMA8/8OBwMAMwDy/w4HAwAzAPP/DgcEADMA8v8OBwQAMwDz/w4H/P80APL/Dgf8/zQA8/8OB/3/NADy/w4H/f80APP/Dgf+/zQA8/8OB///NADy/w4H//80APP/DgcAADQA8v8OBwAANADz/w4HAQA0APL/DgcBADQA8/8OBwIANADz/w4HAwA0APL/DgcDADQA8/8OBwQANADy/w4HBAA0APP/Dgf8/zUA8v8OB/z/NQDz/w4H/f81APL/Dgf9/zUA8/8OB/7/NQDy/w4H/v81APP/Dgf//zUA8v8OB///NQDz/w4HAAA1APL/DgcAADUA8/8OBwEANQDy/w4HAQA1APP/DgcCADUA8v8OBwIANQDz/w4HAwA1APL/DgcDADUA8/8OBwQANQDy/w4HBAA1APP/Dgf8/zYA8v8OB/z/NgDz/w4H/f82APL/Dgf9/zYA8/8OB/7/NgDy/w4H/v82APP/Dgf//zYA8v8OB///NgDz/w4HAAA2APL/DgcAADYA8/8OBwEANgDy/w4HAQA2APP/DgcCADYA8v8OBwIANgDz/w4HAwA2APL/DgcDADYA8/8OBwQANgDy/w4HBAA2APP/Dgj6/ywA8/8OCPr/LAD0/w4I+v8sAPX/Dgj6/ywA9v8OCPv/LADz/w4I+/8sAPT/Dgj7/ywA9f8OCPv/LAD2/w4I/P8sAPP/Dgj8/ywA9P8OCPz/LAD1/w4I/P8sAPb/Dgj9/ywA8/8OCP3/LAD0/w4I/f8sAPX/Dgj9/ywA9v8OCP7/LADz/w4I/v8sAPT/Dgj+/ywA9f8OCP7/LAD2/w4I//8sAPP/Dgj//ywA9P8OCP//LAD1/w4I//8sAPb/DggAACwA8/8OCAAALAD0/w4IAAAsAPX/DggAACwA9v8OCAEALADz/w4IAQAsAPT/DggBACwA9f8OCAEALAD2/w4IAgAsAPP/DggCACwA9P8OCAIALAD1/w4IAgAsAPb/DggDACwA8/8OCAMALAD0/w4IAwAsAPX/DggDACwA9v8OCAQALADz/w4IBAAsAPT/DggEACwA9f8OCAQALAD2/w4IBQAsAPP/DggFACwA9P8OCAUALAD1/w4IBQAsAPb/DggGACwA8/8OCAYALAD0/w4IBgAsAPX/DggGACwA9v8OCPr/LQDz/w4I+v8tAPT/Dgj6/y0A9f8OCPr/LQD2/w4I+/8tAPP/Dgj7/y0A9v8OCPz/LQDz/w4I/P8tAPb/Dgj9/y0A8/8OCP3/LQD2/w4I/v8tAPP/Dgj+/y0A9v8OCP//LQDz/w4I//8tAPb/DggAAC0A8/8OCAAALQD2/w4IAQAtAPP/DggBAC0A9v8OCAIALQDz/w4IAgAtAPb/DggDAC0A8/8OCAMALQD2/w4IBAAtAPP/DggEAC0A9v8OCAUALQDz/w4IBQAtAPb/DggGAC0A8/8OCAYALQD0/w4IBgAtAPX/DggGAC0A9v8OCPr/LgDz/w4I+v8uAPT/Dgj6/y4A9f8OCPr/LgD2/w4I+/8uAPP/Dgj7/y4A9v8OCPz/LgD2/w4I/f8uAPb/Dgj+/y4A9v8OCP//LgD2/w4IAAAuAPb/DggBAC4A9v8OCAIALgD2/w4IAwAuAPb/DggEAC4A9v8OCAUALgDz/w4IBQAuAPb/DggGAC4A8/8OCAYALgD0/w4IBgAuAPX/DggGAC4A9v8OCPr/LwDz/w4I+v8vAPT/Dgj6/y8A9f8OCPr/LwD2/w4I+/8vAPP/Dgj7/y8A9v8OCPz/LwD2/w4I/f8vAPb/Dgj+/y8A9v8OCP//LwD2/w4IAAAvAPb/DggBAC8A9v8OCAIALwD2/w4IAwAvAPb/DggEAC8A9v8OCAUALwDz/w4IBQAvAPb/DggGAC8A8/8OCAYALwD0/w4IBgAvAPX/DggGAC8A9v8OCPr/MADz/w4I+v8wAPT/Dgj6/zAA9f8OCPr/MAD2/w4I+/8wAPP/Dgj7/zAA9v8OCPz/MAD2/w4I/f8wAPb/Dgj+/zAA9v8OCP//MAD2/w4IAAAwAPb/DggBADAA9v8OCAIAMAD2/w4IAwAwAPb/DggEADAA9v8OCAUAMADz/w4IBQAwAPb/DggGADAA8/8OCAYAMAD0/w4IBgAwAPX/DggGADAA9v8OCPr/MQDz/w4I+v8xAPT/Dgj6/zEA9f8OCPr/MQD2/w4I+/8xAPP/Dgj7/zEA9v8OCPz/MQD2/w4I/f8xAPb/Dgj+/zEA9v8OCP//MQD2/w4IAAAxAPb/DggBADEA9v8OCAIAMQD2/w4IAwAxAPb/DggEADEA9v8OCAUAMQDz/w4IBQAxAPb/DggGADEA8/8OCAYAMQD0/w4IBgAxAPX/DggGADEA9v8OCPr/MgDz/w4I+v8yAPT/Dgj6/zIA9f8OCPr/MgD2/w4I+/8yAPP/Dgj7/zIA9v8OCPz/MgD2/w4I/f8yAPb/Dgj+/zIA9v8OCP//MgD2/w4IAAAyAPb/DggBADIA9v8OCAIAMgD2/w4IAwAyAPb/DggEADIA9v8OCAUAMgDz/w4IBQAyAPb/DggGADIA8/8OCAYAMgD0/w4IBgAyAPX/DggGADIA9v8OCPr/MwDz/w4I+v8zAPT/Dgj6/zMA9f8OCPr/MwD2/w4I+/8zAPP/Dgj7/zMA9v8OCPz/MwD2/w4I/f8zAPb/Dgj+/zMA9v8OCP//MwD2/w4IAAAzAPb/DggBADMA9v8OCAIAMwD2/w4IAwAzAPb/DggEADMA9v8OCAUAMwDz/w4IBQAzAPb/DggGADMA8/8OCAYAMwD0/w4IBgAzAPX/DggGADMA9v8OCPr/NADz/w4I+v80APT/Dgj6/zQA9f8OCPr/NAD2/w4I+/80APP/Dgj7/zQA9v8OCPz/NAD2/w4I/f80APb/Dgj+/zQA9v8OCP//NAD2/w4IAAA0APb/DggBADQA9v8OCAIANAD2/w4IAwA0APb/DggEADQA9v8OCAUANADz/w4IBQA0APb/DggGADQA8/8OCAYANAD0/w4IBgA0APX/DggGADQA9v8OCPr/NQDz/w4I+v81APT/Dgj6/zUA9f8OCPr/NQD2/w4I+/81APP/Dgj7/zUA9v8OCPz/NQD2/w4I/f81APb/Dgj+/zUA9v8OCP//NQD2/w4IAAA1APb/DggBADUA9v8OCAIANQD2/w4IAwA1APb/DggEADUA9v8OCAUANQDz/w4IBQA1APb/DggGADUA8/8OCAYANQD0/w4IBgA1APX/DggGADUA9v8OCPr/NgDz/w4I+v82APT/Dgj6/zYA9f8OCPr/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",qr=Object.freeze({schemaVersion:3,id:"actor.fram.module-f01.compact-archive-runner",generatorVersion:"cc0-rig-guided-articulated-voxel-surface-v3",seed:"fram-f01-rain-garden-0501",rigFamily:"humanoid-fram-compact-voxel-v3",representation:"high-density-articulated-voxel-surface",frontAxis:"+z",bodyRatioHeads:3.65,voxelCellCount:po,role:"embodied frontier relic archive module",silhouette:["fine-cell white hair and readable three-quarter head shape","long split expedition coat with coral field textile","compact articulated limbs, dark boots and luminous relic blade","compact archive pack with restrained cyan record signal"],materialGrammar:["warm skin and bright facial pixels","white and pearl hair with cool shadow cells","pale sage technical coat with graphite under-suit","coral field textile, weathered metal and cyan archive light"],provenance:{visibleRuntimeSource:"generated voxel cells only",anatomicalScaffold:"Quaternius Universal Base Characters Standard",scaffoldLicense:"CC0-1.0",sourceMeshRenderedAtRuntime:!1,conceptImageUsedAtRuntime:!1}}),ra=42.5,Qe=lm*ra,Wc=.95,Vc=.82,hm=Wc*(1-Vc);function wn(t){return t<=Wc?t*Vc:t-hm}const gr=Object.freeze({skin:15772303,hair:15130837,hairLight:16774366,coat:12173486,coatShadow:6714735,under:2569274,boot:1780014,metal:6584699,pack:2706256,coral:13194564,cyan:6551012,eye:16314847,mouth:8798023});function Et(t,e={}){return new he({color:t,vertexColors:!1,roughness:.68,...e})}function fm(t,e){return new F({color:new Y(t).multiplyScalar(e),vertexColors:!1,toneMapped:!1})}function pm(){const t={skin:Et(16777215,{roughness:.52,sheen:.18,sheenColor:16766397}),hair:Et(16777215,{roughness:.38,sheen:.76,sheenColor:16773327,sheenRoughness:.56}),hairLight:Et(16777215,{roughness:.34,sheen:.82,sheenColor:16777215}),coat:Et(16777215,{roughness:.72,sheen:.34,sheenColor:15986904}),coatShadow:Et(16777215,{roughness:.8}),under:Et(16777215,{roughness:.74}),boot:Et(16777215,{roughness:.48,clearcoat:.12,clearcoatRoughness:.5}),metal:Et(16777215,{roughness:.24,metalness:.86,clearcoat:.2,clearcoatRoughness:.3}),pack:Et(16777215,{roughness:.5,metalness:.22}),coral:Et(16777215,{roughness:.76,sheen:.35,sheenColor:15835264}),cyan:fm(16777215,1.42),eye:Et(16777215,{roughness:.42}),mouth:Et(16777215,{roughness:.5})},e=new Map;for(const a of Object.values(t))(a instanceof L||a instanceof F)&&e.set(a,a.color.clone());return{byRole:t,contract:{matte:t.coat,metal:t.metal,emissive:t.cyan},originals:e,owned:new Set(Object.values(t))}}function mm(){const t=atob(um),e=Uint8Array.from(t,s=>s.charCodeAt(0)),a=new DataView(e.buffer),r=[];for(let s=0;s<e.length;s+=8){const i=ni[a.getUint8(s)],n=cm[a.getUint8(s+1)];if(i===void 0||n===void 0)throw new Error("Invalid F.R.A.M. generated voxel record.");r.push({part:i,role:n,x:a.getInt16(s+2,!0),y:a.getInt16(s+4,!0),z:a.getInt16(s+6,!0)})}if(r.length!==po)throw new Error("F.R.A.M. voxel asset count does not match its contract.");return r}function Kc(t){const e=dm[t];return new S(...e).multiplyScalar(ra)}function gm(t){const e=Object.fromEntries(ni.map(r=>{const s=new R;return s.name=`fram-f01-${r}-voxel-pivot`,[r,s]})),a=Object.fromEntries(ni.map(r=>[r,Kc(r)]));return t.add(e.torso,e.leftThigh,e.rightThigh),e.torso.add(e.head,e.leftUpperArm,e.rightUpperArm,e.equipment),e.leftUpperArm.add(e.leftForearm),e.leftForearm.add(e.leftHand),e.rightUpperArm.add(e.rightForearm),e.rightForearm.add(e.rightHand),e.leftThigh.add(e.leftCalf),e.leftCalf.add(e.leftFoot),e.rightThigh.add(e.rightCalf),e.rightCalf.add(e.rightFoot),e.torso.position.copy(a.torso),e.head.position.copy(a.head).sub(a.torso),e.equipment.position.copy(a.equipment).sub(a.torso),e.leftUpperArm.position.copy(a.leftUpperArm).sub(a.torso),e.leftForearm.position.copy(a.leftForearm).sub(a.leftUpperArm),e.leftHand.position.copy(a.leftHand).sub(a.leftForearm),e.rightUpperArm.position.copy(a.rightUpperArm).sub(a.torso),e.rightForearm.position.copy(a.rightForearm).sub(a.rightUpperArm),e.rightHand.position.copy(a.rightHand).sub(a.rightForearm),e.leftThigh.position.copy(a.leftThigh),e.leftCalf.position.copy(a.leftCalf).sub(a.leftThigh),e.leftFoot.position.copy(a.leftFoot).sub(a.leftCalf),e.rightThigh.position.copy(a.rightThigh),e.rightCalf.position.copy(a.rightCalf).sub(a.rightThigh),e.rightFoot.position.copy(a.rightFoot).sub(a.rightCalf),{all:e,broad:{head:e.head,torso:e.torso,"left-arm":e.leftUpperArm,"right-arm":e.rightUpperArm,"left-leg":e.leftThigh,"right-leg":e.rightThigh,equipment:e.equipment},basePositions:a}}function wm(t,e){const a=(Math.imul(e.x+113,73856093)^Math.imul(e.y+251,19349663)^Math.imul(e.z+389,83492791))>>>0,r=new Y(gr[t]),s=((a>>>7&255)/255-.5)*(t==="skin"||t==="eye"?.055:.095);return r.offsetHSL(0,0,s),r}function vm(t,e,a){const r=new Map;for(const A of t){if(A.part==="head"&&(A.role==="eye"||A.role==="mouth"||A.role==="cyan"))continue;const l=`${A.part}:${A.role}`,c=r.get(l)??[];c.push(A),r.set(l,c)}const s=Object.fromEntries(ni.map(A=>[A,[]])),i=new Set,n=new fe,o=new ge(Qe*.97,Qe*.97,Qe*.97);i.add(o);for(const[A,l]of r){const[c,d]=A.split(":"),u=new Be(o,a[d],l.length);u.name=d==="coat"&&c==="equipment"?"fram-f01-a-line-field-coat":`fram-f01-${c}-${d}-voxel-surface`,u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!1,l.forEach((h,g)=>{n.makeTranslation(h.x*Qe,h.y*Qe,h.z*Qe),u.setMatrixAt(g,n),u.setColorAt(g,wm(d,h))}),u.instanceMatrix.needsUpdate=!0,u.instanceColor!==null&&(u.instanceColor.needsUpdate=!0),e.all[c].add(u),s[c].push(u)}return{byPart:s,ownedGeometries:i}}function Bs(t,e,a){const r=new li(Qe*.98,Qe*.98,Qe*.58,2,Qe*.08),s=new Y(a),i=new Float32Array(r.getAttribute("position").count*3);for(let A=0;A<i.length;A+=3)i[A]=s.r,i[A+1]=s.g,i[A+2]=s.b;r.setAttribute("color",new He(i,3));const n=e.clone();(n instanceof L||n instanceof F)&&n.color.set(a);const o=new I(r,n);return o.name=t,o.userData.baseColor=a,o.castShadow=!0,o}function ym(t,e){const a=Kc("head"),r=[-1,1].map(i=>{const n=new R;n.name=i<0?"fram-f01-left-expressive-eye":"fram-f01-right-expressive-eye",n.position.set(i*.04*ra-a.x,wn(1.655)*ra-a.y,.164*ra-a.z);const o=Bs(`${n.name}-white-pixel`,e.eye,gr.eye),A=Bs(`${n.name}-dark-pixel-pupil`,e.under,gr.under);A.scale.set(.58,.72,.48),A.position.z=Qe*.38;const l=Bs(`${n.name}-archive-highlight`,e.cyan,gr.cyan);return l.scale.set(.18,.2,.2),l.position.set(-i*Qe*.17,Qe*.16,Qe*.69),n.add(o,A,l),t.add(n),n}),s=Bs("fram-f01-cute-face-details",e.mouth,gr.mouth);return s.scale.set(.56,.28,.58),s.position.set(-a.x,wn(1.595)*ra-a.y,.164*ra-a.z),t.add(s),{eyes:r,meshes:[...r.flatMap(i=>i.children),s]}}function xm(t,e){const a=new R;a.name="fram-f01-archive-halo-motion",a.position.set(0,wn(1.18)*ra,-.34*ra),a.rotation.x=Math.PI/2;const r=new li(Qe*.72,Qe*.72,Qe*.72,2,Qe*.08),s=12,i=new Be(r,e,s);i.name="fram-f01-archive-halo-and-core";const n=new fe,o=new Y(gr.cyan);for(let A=0;A<s;A+=1){const l=A/s*Math.PI*2;n.makeTranslation(Math.cos(l)*3.85,Math.sin(l)*3.85,0),i.setMatrixAt(A,n),i.setColorAt(A,o)}return i.instanceMatrix.needsUpdate=!0,i.instanceColor!==null&&(i.instanceColor.needsUpdate=!0),a.add(i),t.add(a),{group:a,mesh:i,geometry:r}}function Ra(t,e,a){const r=e.flatMap(n=>t[n]),i=(a===void 0?void 0:r.find(n=>n.name.includes(`-${a}-`)))??r[0];if(i===void 0)throw new Error(`F.R.A.M. voxel part is empty: ${e.join(", ")}`);return i}function Jc(){const t=pm(),e=new R;e.name=qr.id,e.userData.assetDNA=qr,e.userData.frontAxis=qr.frontAxis,e.userData.runtimeRepresentation=qr.representation,e.userData.visibleVoxelCells=po;const a=new R;a.name="fram-f01-high-density-voxel-motion";const r=new R;r.name="fram-f01-compact-proportion",r.scale.set(1.16,.69,1.16),e.add(r),r.add(a);const s=gm(a),i=mm(),n=vm(i,s,t.byRole),o=ym(s.all.head,t.byRole),A=xm(s.all.equipment,t.byRole.cyan),l={head:Ra(n.byPart,["head"],"hair"),torso:Ra(n.byPart,["torso"],"coatShadow"),"left-arm":Ra(n.byPart,["leftUpperArm","leftForearm","leftHand"],"coat"),"right-arm":Ra(n.byPart,["rightUpperArm","rightForearm","rightHand"],"coat"),"left-leg":Ra(n.byPart,["leftThigh","leftCalf","leftFoot"],"under"),"right-leg":Ra(n.byPart,["rightThigh","rightCalf","rightFoot"],"under"),equipment:Ra(n.byPart,["equipment"],"coat")},c=l,d=new R;d.name="fram-f01-right-hand-voxel-socket",d.position.set(Qe*4.2,-Qe*.2,Qe*.8),s.all.rightHand.add(d);const u={leftUpperArm:new Ie(.08,.03,-1.38),rightUpperArm:new Ie(-.08,-.03,1.38),leftForearm:new Ie(.08,-.16,-.13),rightForearm:new Ie(-.08,.16,.13),leftHand:new Ie(0,.12,0),rightHand:new Ie(0,-.12,0)},h=p=>{const m=new Y(p);for(const[f,w]of t.originals)(f instanceof L||f instanceof F)&&f.color.copy(w).multiply(m)},g={root:e,motionRoot:a,mode:"articulated",partGroups:s.broad,partMeshes:c,mergedMesh:null,weaponSocket:d,materials:t.contract,eyeGroups:o.eyes,archiveHalo:A.group,updatePose(p){const m=ho(p);a.position.set(...m.root.position),a.rotation.set(...m.root.rotation),a.scale.set(...m.root.scale),s.all.torso.rotation.set(...m.parts.torso.rotation),s.all.head.rotation.set(...m.parts.head.rotation),s.all.head.scale.set(1.68,1.62,1.68),s.all.leftUpperArm.rotation.set(u.leftUpperArm.x+m.parts["left-arm"].rotation[0],u.leftUpperArm.y+m.parts["left-arm"].rotation[1],u.leftUpperArm.z+m.parts["left-arm"].rotation[2]),s.all.rightUpperArm.rotation.set(u.rightUpperArm.x+m.parts["right-arm"].rotation[0],u.rightUpperArm.y+m.parts["right-arm"].rotation[1],u.rightUpperArm.z+m.parts["right-arm"].rotation[2]),s.all.leftForearm.rotation.copy(u.leftForearm),s.all.rightForearm.rotation.copy(u.rightForearm),s.all.leftHand.rotation.copy(u.leftHand),s.all.rightHand.rotation.copy(u.rightHand),s.all.leftThigh.rotation.set(m.parts["left-leg"].rotation[0],m.parts["left-leg"].rotation[1],m.parts["left-leg"].rotation[2]+.065),s.all.rightThigh.rotation.set(m.parts["right-leg"].rotation[0],m.parts["right-leg"].rotation[1],m.parts["right-leg"].rotation[2]-.065),s.all.equipment.rotation.set(...m.parts.equipment.rotation);const f=p.progress??0;if(p.motion==="windup"||p.motion==="hit"||p.motion==="skill"){const b=Math.sin(C.clamp(f,0,1)*Math.PI);s.all.rightUpperArm.rotation.x-=b*.72,s.all.rightUpperArm.rotation.z+=b*.38,s.all.rightForearm.rotation.x-=b*.52}const w=((p.timeSeconds+.2)%4.3+4.3)%4.3,v=w<.18?Math.sin(w/.18*Math.PI):0,y=p.motion==="skill"?Math.sin(C.clamp(f,0,1)*Math.PI):0,P=Math.max(.14,1-v*.9);o.eyes[0].scale.set(1+y*.08,P+y*.08,1),o.eyes[1].scale.copy(o.eyes[0].scale),A.group.rotation.z=p.timeSeconds*.32,A.group.scale.setScalar(1+y*.16),l.equipment.scale.setScalar(1+y*.025)},attachWeapon(p,m={x:0,y:0,z:0}){d.add(p),Er(p,m)},setTint(p){h(p)},dispose(){for(const p of n.ownedGeometries)p.dispose();A.geometry.dispose();for(const p of o.meshes)p.geometry.dispose(),Array.isArray(p.material)?p.material.forEach(m=>m.dispose()):p.material.dispose();for(const p of t.owned)p.dispose();e.removeFromParent()}};return g.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),g}const Zc=.0195*42.5,FA=Zc*.56,Rt=Object.freeze({skin:15839381,hair:15788767,hairShade:10332575,eye:1456960,eyeLight:9371631,cheek:15112849,jacket:12765880,jacketShade:7438713,graphite:2503224,coral:14244941,cyan:6682085}),js=Object.freeze({...qr,schemaVersion:4,id:"actor.fram.module-f01a.semantic-micro-voxel-girl",generatorVersion:"semantic-volume-overlay-v1",rigFamily:"humanoid-fram-compact-voxel-v4",bodyRatioHeads:3.6,characterPreset:"semantic-micro-voxel-girl-a",semanticVolumes:["broad asymmetric bob and separated side locks","front-readable face, eye, cheek and mouth clusters","short technical jacket and split utility hip panels","compact gloves, boots, archive signal and analysis pack"],artDirectionReference:"work/r07_character_depth/fram-r07-character-direction.png"});function Gt(t,e){return new he({color:t,roughness:e,metalness:0,sheen:.34,sheenColor:t,sheenRoughness:.72})}function bm(){const t={skin:Gt(Rt.skin,.58),hair:Gt(Rt.hair,.4),hairShade:Gt(Rt.hairShade,.56),eye:Gt(Rt.eye,.38),eyeLight:Gt(14221300,.34),cheek:Gt(Rt.cheek,.62),jacket:Gt(Rt.jacket,.74),jacketShade:Gt(Rt.jacketShade,.78),graphite:Gt(Rt.graphite,.7),coral:Gt(Rt.coral,.76),cyan:new F({color:Rt.cyan,toneMapped:!1})};return{byRole:t,owned:new Set(Object.values(t))}}function ze(t,e,a,r,s){t.push({x:e,y:a,z:r,role:s})}function Dm(){const t=[];for(let e=-11;e<=12;e+=1)for(let a=-10;a<=10;a+=1)for(let r=-9;r<=9;r+=1){const s=a/10.3,i=(e-.6)/11.8,n=r/9.35,o=s*s+i*i+n*n;if(o>1||o<.76||r>=4&&a>=-7&&a<=7&&e>=-6&&e<=6)continue;const l=a>=6||r<-4||e<-6;ze(t,a,e+8,r,l?"hairShade":"hair")}for(let e=-6;e<=6;e+=1)for(let a=-7;a<=7;a+=1)Math.abs(a)===7&&(e<=-4||e>=5)||Math.abs(a)===6&&e===-6||ze(t,a,e+8,9.35,"skin");for(const e of[-1,1]){for(let a=-1;a<=2;a+=1)for(let r=2;r<=5;r+=1)ze(t,e*r,a+8,9.95,"eye");ze(t,e*2,10,10.25,"eyeLight"),ze(t,e*5,6,9.95,"cheek");for(let a=2;a<=5;a+=1)ze(t,e*a,11,9.96,"graphite")}ze(t,0,4,10.04,"graphite"),ze(t,1,4,10.04,"graphite");for(let e=-8;e<=8;e+=1){const a=e<=-5?9:e<=-1?12:e<=4?13:11;for(let r=a;r<=18;r+=1)ze(t,e,r,9.75,e>=6?"hairShade":"hair")}for(const e of[-1,1])for(let a=-5;a<=4;a+=1)for(let r=0;r<=1;r+=1)ze(t,e*(9+r),a+8,7.6,e>0?"hairShade":"hair");for(let e=20;e<=24;e+=1)ze(t,-2,e,0,"hair"),e>=22&&ze(t,-1,e,0,"hair");return t}function Bm(){const t=[];for(let e=-7;e<=7;e+=1)for(const a of[-4.6,4.8])ze(t,e,47,a,Math.abs(e)>=6?"jacketShade":"jacket"),Math.abs(e)<=5&&ze(t,e,36,a,"jacketShade");for(let e=37;e<=46;e+=1)for(const a of[-7,7])ze(t,a,e,0,a>0?"jacketShade":"jacket");for(const e of[-1,1])for(let a=25;a<=35;a+=1)for(let r=2;r<=5;r+=1)a<=27&&r===5||ze(t,e*r,a,4.5,e<0?"jacket":"jacketShade");for(let e=28;e<=36;e+=1)ze(t,-6.2,e,-1,"coral"),e<=33&&ze(t,-7.1,e,-1,"coral");return ze(t,0,43,5.35,"cyan"),ze(t,0,42,5.35,"cyan"),t}function OA(t,e,a,r=Zc){const s=new R;s.name=t;const i=new ge(r*.94,r*.94,r*.94),n=new Set([i]),o=new fe;for(const A of Object.keys(Rt)){const l=e.filter(d=>d.role===A);if(l.length===0)continue;const c=new Be(i,a.byRole[A],l.length);c.name=`${t}-${A}`,c.castShadow=!0,c.receiveShadow=!0,c.frustumCulled=!1,l.forEach((d,u)=>{o.makeTranslation(d.x*r,d.y*r,d.z*r),c.setMatrixAt(u,o);const g=.92+((Math.imul(Math.round(d.x*10)+127,73856093)^Math.imul(Math.round(d.y*10)+263,19349663)^Math.imul(Math.round(d.z*10)+401,83492791))>>>0>>>8&255)/255*.08;c.setColorAt(u,new Y(g,g,g))}),c.instanceMatrix.needsUpdate=!0,c.instanceColor!==null&&(c.instanceColor.needsUpdate=!0),s.add(c)}return{group:s,geometries:n}}function Ps(t,e){const a=t.getObjectByName(e);if(!(a instanceof R))throw new Error(`R07 semantic voxel group was not found: ${e}`);return a}function $c(){const t=Jc(),e=bm(),a=Dm(),r=Bm(),s=OA("fram-f01a-semantic-head",a,e,FA),i=OA("fram-f01a-short-tech-jacket",r,e),n=Ps(t.root,"fram-f01-head-voxel-pivot"),o=Ps(t.root,"fram-f01-torso-voxel-pivot"),A=Ps(t.root,"fram-f01-leftThigh-voxel-pivot"),l=Ps(t.root,"fram-f01-rightThigh-voxel-pivot");for(const f of[...n.children])(f.name.includes("voxel-surface")||f.name.includes("expressive-eye")||f.name==="fram-f01-cute-face-details")&&(f.visible=!1);const c=t.root.getObjectByName("fram-f01-a-line-field-coat");c!==void 0&&(c.visible=!1),n.add(s.group),o.add(i.group),s.group.position.set(0,-FA*1.5,0);const d=A.position.clone(),u=l.position.clone(),h=t.updatePose.bind(t),g=t.dispose.bind(t),p=a.length+r.length;t.root.name=js.id,t.root.userData.assetDNA=js,t.root.userData.visibleVoxelCells=Number(t.root.userData.visibleVoxelCells??0)+p,t.root.userData.runtimeRepresentation="semantic-high-density-articulated-voxel-girl",t.root.userData.characterPreset=js.characterPreset;const m={...t,sourceVisual:t,semanticCellCount:p,updatePose(f){h(f),n.scale.set(1.43,1.38,1.42),n.rotation.z+=.025,A.scale.set(.94,.78,.96),l.scale.set(.94,.78,.96),A.position.copy(d).add(new S(1.25,-4.8,0)),l.position.copy(u).add(new S(-1.25,-4.8,0));const w=Math.sin(f.timeSeconds*2.1)*.018;s.group.rotation.y=w,i.group.rotation.z=-w*.35},dispose(){for(const f of s.geometries)f.dispose();for(const f of i.geometries)f.dispose();for(const f of e.owned)f.dispose();g()}};return m.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),m}const ed=.0195*42.5,UA=ed*.55,ct=ed*.7,Ye=Object.freeze({skin:15840411,skinShade:14191993,hairLight:16774888,hair:14606291,hairShade:8885133,eye:1126197,eyeLight:12255220,cheek:15306637,jacketLight:16775400,jacket:14212041,jacketShade:9608595,graphite:2108466,graphiteLight:4478042,metal:7374218,coral:14047816,cyan:5829859}),Ri=Object.freeze({...js,schemaVersion:5,id:"actor.fram.module-f01b.unified-semantic-voxel-girl",generatorVersion:"semantic-full-body-volume-v1",rigFamily:"humanoid-fram-compact-voxel-v5",bodyRatioHeads:3.55,characterPreset:"unified-semantic-micro-voxel-girl-b",semanticVolumes:["large asymmetric layered bob framing a small readable face","short pale technical jacket over a narrow graphite under-suit","compact articulated limbs with oversized field boots","archive analysis pack, cyan record signals and coral field textile"],artDirectionReference:"work/r07_character_depth/fram-r07-character-direction.png"});function st(t,e,a=0){return new he({color:t,roughness:e,metalness:a,sheen:a===0?.32:.08,sheenColor:t,sheenRoughness:.68})}function Pm(){const t={skin:st(Ye.skin,.58),skinShade:st(Ye.skinShade,.62),hairLight:st(Ye.hairLight,.34),hair:st(Ye.hair,.42),hairShade:st(Ye.hairShade,.58),eye:st(Ye.eye,.4),eyeLight:st(Ye.eyeLight,.34),cheek:st(Ye.cheek,.66),jacketLight:st(Ye.jacketLight,.7),jacket:st(Ye.jacket,.74),jacketShade:st(Ye.jacketShade,.78),graphite:st(Ye.graphite,.71),graphiteLight:st(Ye.graphiteLight,.65),metal:st(Ye.metal,.42,.42),coral:st(Ye.coral,.72),cyan:new F({color:Ye.cyan,toneMapped:!1})},e=new Map;for(const a of Object.values(t))(a instanceof L||a instanceof F)&&e.set(a,a.color.clone());return{byRole:t,originals:e,owned:new Set(Object.values(t))}}function $(t,e,a,r,s){t.push({x:e,y:a,z:r,role:s})}function ft(t,e,a,r){const[s,i,n,o,A,l]=e;for(let c=n;c<=o;c+=1)for(let d=s;d<=i;d+=1)for(let u=A;u<=l;u+=1)!(d===s||d===i||c===n||c===o||u===A||u===l)||r?.(d,c,u)===!0||$(t,d,c,u,a)}function Em(){const t=[];for(let e=-11;e<=13;e+=1)for(let a=-12;a<=12;a+=1)for(let r=-10;r<=10;r+=1){const s=a/(e<-6?9.8:12.2),i=(e-.5)/13.1,n=r/10.3,o=s*s+i*i+n*n;if(o>1||o<.77||r>=5&&Math.abs(a)<=8&&e>=-7&&e<=6)continue;const l=e>=8||a<=-7||r>=3&&a<=2?"hairLight":a>=7||r<=-5||e<=-7?"hairShade":"hair";$(t,a,e+7,r,l)}for(let e=-9;e<=7;e+=1){const a=e<=-8?4:e<=-5||e>=7?7:8;for(let r=-a;r<=a;r+=1)$(t,r,e+7,10.05,Math.abs(r)===a?"skinShade":"skin")}for(const e of[-1,1]){for(let a=-1;a<=2;a+=1)for(let r=2;r<=5;r+=1)$(t,e*r,a+7,10.65,"eye");$(t,e*2,9,10.95,"eyeLight"),$(t,e*6,5,10.55,"cheek");for(let a=2;a<=5;a+=1)$(t,e*a,10,10.55,"graphite")}$(t,-1,3,10.72,"graphite"),$(t,0,3,10.72,"graphite");for(let e=-9;e<=9;e+=1){const a=e<=-5?12:e<=0?15:e<=4?14:11;for(let r=a;r<=19;r+=1)$(t,e,r,10.35,e>=6?"hairShade":"hairLight")}for(const e of[-1,1]){const a=e<0?12:9;for(let r=-4;r<=a;r+=1)$(t,e*10,r,8.4,e<0?"hairLight":"hairShade"),$(t,e*11,r,7.8,e<0?"hairLight":"hairShade"),r<=7&&$(t,e*12,r,6.9,"hairShade");$(t,e*11,-5,7.8,"coral")}for(let e=20;e<=24;e+=1)$(t,-3,e,-1,"hairLight"),e>=22&&$(t,-2,e,-1,"hairLight");for(let e=8;e<=10;e+=1)for(let a=9;a<=11;a+=1)$(t,e,a,10.8,"cyan");return t}function Cm(){const t=[];ft(t,[-6,6,45,87,-4,4],"graphite",(e,a,r)=>r===4&&a>=63&&Math.abs(e)<=1),ft(t,[-9,9,50,90,-6,6],"jacket",(e,a,r)=>r===6&&Math.abs(e)<=3||a<=58&&Math.abs(e)<=4);for(let e=58;e<=87;e+=1){for(const a of[-9,9])$(t,a,e,6.5,a<0?"jacketLight":"jacketShade");for(let a=-8;a<=-4;a+=1)$(t,a,e,6.55,"jacketLight");for(let a=4;a<=8;a+=1)$(t,a,e,6.55,"jacket")}ft(t,[-10,10,84,95,-5,5],"jacketLight",(e,a,r)=>r===5&&Math.abs(e)<=3&&a<=91);for(let e=-7;e<=7;e+=1)$(t,e,90,0,Math.abs(e)>=6?"jacketShade":"jacketLight");ft(t,[-8,8,42,50,-5,5],"graphiteLight");for(let e=20;e<=48;e+=1)for(let a=3;a<=7;a+=1){const r=a===7?"jacketShade":"jacket";$(t,-a,e,5.5,r),$(t,a,e,5.5,r)}for(let e=18;e<=46;e+=1)$(t,-8,e,-3.5,"coral"),e<=25&&$(t,-9,e,-3.5,"coral");return $(t,0,72,6.7,"cyan"),$(t,0,73,6.7,"cyan"),t}function NA(t){const e=[],a=t>0?0:-17,r=t>0?17:0;ft(e,[a,r,-4,4,-4,4],t>0?"jacketLight":"jacket",n=>t>0?n>=12:n<=-12);const s=t>0?12:-17,i=t>0?17:-12;ft(e,[s,i,-3,3,-3,3],"graphiteLight");for(let n=t>0?2:-2;t>0?n<=8:n>=-8;n+=t)$(e,n,4.5,0,t>0?"jacketLight":"jacketShade");return e}function HA(t){const e=[],a=t>0?0:-16,r=t>0?16:0;ft(e,[a,r,-3,3,-3,3],"graphite");const s=t>0?7:-7;for(let i=-2;i<=2;i+=1)$(e,s,i,3.5,"cyan");return e}function _A(t){const e=[],a=t>0?0:-6,r=t>0?6:0;return ft(e,[a,r,-3,3,-3,3],"graphite"),e}function GA(){const t=[];ft(t,[-4,4,-22,1,-4,4],"graphite");for(let e=-6;e<=0;e+=1)$(t,-4.5,e,0,"jacketShade"),$(t,4.5,e,0,"jacket");return t}function XA(){const t=[];return ft(t,[-3,3,-24,1,-3,3],"graphiteLight"),ft(t,[-4,4,-18,-8,-4,4],"graphite"),t}function qA(){const t=[];ft(t,[-5,5,-5,2,-4,7],"graphite");for(let e=-4;e<=4;e+=1)for(let a=-3;a<=6;a+=1)$(t,e,-6,a,"jacketLight");return $(t,5,-3,7.5,"cyan"),t}function Mm(){const t=[];ft(t,[-8,8,47,81,-14,-8],"graphiteLight"),ft(t,[-6,6,52,76,-15,-14],"metal");for(let e=-4;e<=4;e+=1)for(let a=59;a<=69;a+=1)$(t,e,a,-15.6,"cyan");for(let e=49;e<=78;e+=1)$(t,-9,e,-11,e%4===0?"coral":"metal"),$(t,9,e,-11,e%5===0?"coral":"metal");return t}function it(t,e,a,r){const s=new R;s.name=t;const i=new ge(r*.94,r*.94,r*.94),n=new fe,o=new Y;for(const A of Object.keys(Ye)){const l=e.filter(d=>d.role===A);if(l.length===0)continue;const c=new Be(i,a.byRole[A],l.length);c.name=`${t}-${A}`,c.castShadow=!0,c.receiveShadow=!0,c.frustumCulled=!1,l.forEach((d,u)=>{n.makeTranslation(d.x*r,d.y*r,d.z*r),c.setMatrixAt(u,n);const g=.92+((Math.imul(Math.round(d.x*10)+127,73856093)^Math.imul(Math.round(d.y*10)+263,19349663)^Math.imul(Math.round(d.z*10)+401,83492791))>>>0>>>8&255)/255*.08;o.setRGB(g,g,g),c.setColorAt(u,o)}),c.instanceMatrix.needsUpdate=!0,c.instanceColor!==null&&(c.instanceColor.needsUpdate=!0),s.add(c)}return{group:s,geometry:i,cellCount:e.length}}function nt(t,e){const a=t.getObjectByName(e);if(!(a instanceof R))throw new Error(`R08 semantic voxel group was not found: ${e}`);return a}function Sm(t){t.traverse(e=>{(e.name.includes("voxel-surface")||e.name.includes("expressive-eye")||e.name==="fram-f01-cute-face-details"||e.name==="fram-f01-a-line-field-coat"||e.name==="fram-f01a-semantic-head"||e.name==="fram-f01a-short-tech-jacket")&&(e.visible=!1)})}function Im(){const t=$c(),e=Pm();Sm(t.root);const a={head:nt(t.root,"fram-f01-head-voxel-pivot"),torso:nt(t.root,"fram-f01-torso-voxel-pivot"),leftUpperArm:nt(t.root,"fram-f01-leftUpperArm-voxel-pivot"),leftForearm:nt(t.root,"fram-f01-leftForearm-voxel-pivot"),leftHand:nt(t.root,"fram-f01-leftHand-voxel-pivot"),rightUpperArm:nt(t.root,"fram-f01-rightUpperArm-voxel-pivot"),rightForearm:nt(t.root,"fram-f01-rightForearm-voxel-pivot"),rightHand:nt(t.root,"fram-f01-rightHand-voxel-pivot"),leftThigh:nt(t.root,"fram-f01-leftThigh-voxel-pivot"),leftCalf:nt(t.root,"fram-f01-leftCalf-voxel-pivot"),leftFoot:nt(t.root,"fram-f01-leftFoot-voxel-pivot"),rightThigh:nt(t.root,"fram-f01-rightThigh-voxel-pivot"),rightCalf:nt(t.root,"fram-f01-rightCalf-voxel-pivot"),rightFoot:nt(t.root,"fram-f01-rightFoot-voxel-pivot"),equipment:nt(t.root,"fram-f01-equipment-voxel-pivot")},r={head:it("fram-f01b-head",Em(),e,UA),torso:it("fram-f01b-torso",Cm(),e,ct),leftUpperArm:it("fram-f01b-left-upper-arm",NA(1),e,ct),leftForearm:it("fram-f01b-left-forearm",HA(1),e,ct),leftHand:it("fram-f01b-left-hand",_A(1),e,ct),rightUpperArm:it("fram-f01b-right-upper-arm",NA(-1),e,ct),rightForearm:it("fram-f01b-right-forearm",HA(-1),e,ct),rightHand:it("fram-f01b-right-hand",_A(-1),e,ct),leftThigh:it("fram-f01b-left-thigh",GA(),e,ct),leftCalf:it("fram-f01b-left-calf",XA(),e,ct),leftFoot:it("fram-f01b-left-foot",qA(),e,ct),rightThigh:it("fram-f01b-right-thigh",GA(),e,ct),rightCalf:it("fram-f01b-right-calf",XA(),e,ct),rightFoot:it("fram-f01b-right-foot",qA(),e,ct),equipment:it("fram-f01b-archive-pack",Mm(),e,ct)};for(const l of Object.keys(r))a[l].add(r[l].group);r.head.group.position.set(0,-UA*1.4,0);const s=t.updatePose.bind(t),i=t.setTint.bind(t),n=t.dispose.bind(t),o=Object.values(r).reduce((l,c)=>l+c.cellCount,0);t.root.name=Ri.id,t.root.userData.assetDNA=Ri,t.root.userData.visibleVoxelCells=o,t.root.userData.runtimeRepresentation="unified-semantic-high-density-articulated-voxel-girl",t.root.userData.characterPreset=Ri.characterPreset;const A={...t,sourceVisual:t,semanticCellCount:o,updatePose(l){s(l),a.head.scale.set(1.02,1.43,1.02),a.head.rotation.z+=.018;const c=Math.sin(l.timeSeconds*2.05)*.014;r.head.group.rotation.y=c,r.torso.group.rotation.z=-c*.18,r.equipment.group.rotation.z=c*.12},setTint(l){i(l);const c=new Y(l);for(const[d,u]of e.originals)(d instanceof L||d instanceof F)&&d.color.copy(u).multiply(c)},dispose(){for(const l of Object.values(r))l.geometry.dispose();for(const l of e.owned)l.dispose();n()}};return A.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),A}const YA=[1856824,3043393,5082441,7776595,10141539],Qm=[15975017,15301730,9551856,14461161,16050352];function ga(t,e,a=0){return(Math.imul(Math.trunc(t)+83,73856093)^Math.imul(Math.trunc(e)+133,19349663)^Math.imul(Math.trunc(a)+1285,83492791))>>>0}function q(t,e=0){return(t>>>e&1023)/1023}function jr(t,e){return t[e%t.length]??t[0]??16777215}function oi(t,e,a,r){const[s,i,n,o]=e;t.addQuad({corners:[[s,a,n],[s,a,o],[i,a,o],[i,a,n]],color:r})}function Zt(t,e){const a=t.build();a.name=`${e.name}-geometry`;const r={color:16777215,vertexColors:!0,roughness:e.roughness,metalness:e.metalness??0,transparent:e.transparent??!1,opacity:e.opacity??1,depthWrite:!(e.transparent??!1),emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??1},s=e.clearcoat===void 0?new L(r):new he({...r,clearcoat:e.clearcoat,clearcoatRoughness:e.clearcoatRoughness??.08}),i=new I(a,s);return i.name=e.name,i.castShadow=e.castShadow??!1,i.receiveShadow=e.receiveShadow??!1,i}function fi(t,e,a,r,s,i,n=1){const o=(7+q(i,5)*18)*n;t.addBox({center:[a,r+o*.5,s],size:[.9*n,o,.9*n],rotation:[0,0,(q(i,14)-.5)*.28],color:jr(YA,i)});const A=4+i%4;for(let l=0;l<A;l+=1){const c=q(i^Math.imul(l+7,73244475),3)*Math.PI*2,d=(2.8+q(i,21)*4.4)*n;t.addBox({center:[a+Math.cos(c)*d*.46,r+o*(.28+l/(A+2)),s+Math.sin(c)*d*.46],size:[d*1.34,1.4*n,d*.56],rotation:[0,-c,(q(i+l,9)-.5)*.24],color:jr(YA,i+l*11)})}i%5===0&&e.addBox({center:[a,r+o+.8*n,s],size:[3.6*n,1.8*n,3.6*n],rotation:[0,q(i,18)*Math.PI,0],color:jr(Qm,i)})}function km(t,e,a,r){const s=[{x:255,y:104,z:645,width:228,depth:118,seed:41},{x:265,y:86,z:1155,width:208,depth:104,seed:87},{x:294,y:100,z:704,width:136,depth:54,seed:119},{x:430,y:48,z:739,width:88,depth:56,seed:157}];for(const i of s){t.addBox({center:[i.x,i.y+1.2,i.z],size:[i.width*.76,2.4,i.depth*.72],color:4873801});for(let n=0;n<34;n+=1){const o=ga(n,i.seed,371),A=i.x-i.width*.34+q(o,3)*i.width*.68,l=i.z-i.depth*.31+q(o,14)*i.depth*.62;fi(a,r,A,i.y+2.3,l,o,.66+q(o,23)*.6)}for(let n=0;n<4;n+=1){const o=ga(n,i.seed,2185),A=i.x-i.width*.26+n*i.width*.17;e.addBox({center:[A,i.y+7,i.z+i.depth*.2],size:[i.width*.12,2,3],color:o%2===0?4285797:5795174}),e.addBox({center:[A,i.y+10,i.z+i.depth*.16],size:[i.width*.105,1.3,i.depth*.18],rotation:[-.13,0,0],color:4288370})}}}function Tm(t,e,a,r,s,i){oi(t,[260,840,792,1010],2.01,2503987),oi(t,[278,822,810,992],2.025,2898744);for(let o=0;o<7;o+=1){const A=ga(o,1285,87),l=315+o*25;t.addBox({center:[l,2.09,906+(q(A,7)-.5)*3.2],size:[14+q(A,17)*3,.11,58+q(A,4)*18],rotation:[0,(q(A,14)-.5)*.026,0],color:o%3===1?7303266:8881006,shade:.62+q(A,23)*.13})}for(let o=0;o<42;o+=1){const A=ga(o,2346,1285),l=410+q(A,4)*390,c=830+q(A,16)*136,d=5+q(A,21)*23;t.addBox({center:[l,2.105,c],size:[d,.08,.7+q(A,8)*1.3],rotation:[0,q(A,11)*Math.PI,0],color:A%7===0?7038808:1385248,shade:.62+q(A,2)*.18})}for(let o=0;o<320;o+=1){const A=ga(o,1571,1285),l=172+q(A,2)*548,c=704+q(A,13)*382;if((l<218||l>682||c<748||c>1038)&&A%3===0){fi(r,s,l,2,c,A,.28+q(A,21)*.36);continue}i&&e.addBox({center:[l,2.11+q(A,24)*.1,c],size:[1.3+q(A,7)*7.2,.2,.8+q(A,18)*3.2],rotation:[0,q(A,10)*Math.PI,0],color:A%11===0?6190159:jr([1517348,2832694,4016194,5986636],A),shade:.72+q(A,4)*.2})}const n=[[342,829,92,24,-.12],[471,878,116,31,.08],[597,950,128,27,-.04],[686,820,76,22,.15],[409,1034,104,26,-.1]];for(const[o,A,l,c,d]of n)a.addBox({center:[o,2.22,A],size:[l,.1,c],rotation:[0,d,0],color:A<900?7907229:6263948})}function Rm(t,e,a,r,s){oi(a,[-150,238,522,650],-.3,3235686),oi(a,[-132,216,538,632],-.16,5211527),t.addBox({center:[44,8,656],size:[410,20,16],color:8162692}),t.addBox({center:[44,5,516],size:[410,13,12],color:6650484});for(let i=0;i<11;i+=1){const n=-124+i*33.7;e.addBox({center:[n,25,653],size:[2.2,34,2.2],color:3165515}),i<10&&e.addBox({center:[n+16.85,40,653],size:[33.7,2.4,2.4],color:4020564})}for(let i=0;i<64;i+=1){const n=ga(i,412,103),o=n%2===0?1:-1,A=-144+q(n,3)*376,l=o>0?650+q(n,14)*32:516-q(n,14)*27;fi(r,s,A,0,l,n,.48+q(n,21)*.72)}}function zm(t,e,a,r,s){for(const i of[398,430,462])e.addBox({center:[i,38,708],size:[3,72,3],color:3559502});e.addBox({center:[430,73,708],size:[70,4,48],color:4743517}),t.addBox({center:[430,12,718],size:[82,8,28],color:8292734}),e.addBox({center:[430,24,720],size:[61,5,20],color:6839888}),a.addBox({center:[466,51,705],size:[5,26,2],color:6484445}),a.addBox({center:[466,34,704],size:[5,6,2],color:16760168});for(let i=0;i<24;i+=1){const n=ga(i,2071),o=389+q(n,3)*84,A=681+q(n,15)*49;fi(r,s,o,75,A,n,.42+q(n,22)*.42)}t.addBox({center:[585,31,818],size:[110,7,44],color:8353375});for(const i of[540,630])e.addBox({center:[i,16,818],size:[5,28,5],color:3426887});for(let i=0;i<19;i+=1){const n=ga(i,2452);t.addBox({center:[540+q(n,4)*88,37+q(n,18)*5,801+q(n,11)*29],size:[4+q(n,6)*13,1.2+q(n,20)*5,3+q(n,13)*10],rotation:[0,q(n,2)*Math.PI,0],color:jr([11967345,8162173,10903362,4810854],n)})}a.addBox({center:[604,45,798],size:[10,2,4],color:16760168})}function Lm(t){t.traverse(e=>{if(!(e instanceof I))return;const a=Array.isArray(e.material)?e.material:[e.material];for(const r of a)r instanceof L&&(/foliage|flower|vine|habitat/i.test(e.name)?(r.color.offsetHSL(0,.07,.01),r.envMapIntensity=.68):/puddle|water|glass|wet/i.test(e.name)?r.envMapIntensity=1.28:r.envMapIntensity=Math.max(r.envMapIntensity,.54),r.needsUpdate=!0)})}function Fm(t={}){const e=t.includeLooseRoadAggregate??!0,a=t.microVegetationCastShadow??!0,r=Gc(),s=new U,i=new U,n=new U,o=new U,A=new U,l=new U,c=new U,d=new U,u=new U;km(s,i,c,d),Tm(n,o,A,c,d,e),Rm(s,i,l,c,d),zm(s,i,u,c,d);const h=Zt(s,{name:"r05-c-concrete-and-lived-in-props",roughness:.78,castShadow:!0,receiveShadow:!0}),g=Zt(i,{name:"r05-c-transit-and-rooftop-metal",roughness:.34,metalness:.65,castShadow:!0,receiveShadow:!0}),p=e?Zt(o,{name:"r05-c-wet-road-micro-frequency",roughness:.9,receiveShadow:!0}):null,m=Zt(n,{name:"r05-c-worn-asphalt-and-crosswalk",roughness:.62,clearcoat:.24,clearcoatRoughness:.32,receiveShadow:!0}),f=Zt(A,{name:"r05-c-irregular-reflective-patches",roughness:.08,clearcoat:.98,clearcoatRoughness:.035,transparent:!0,opacity:.66,receiveShadow:!0}),w=Zt(l,{name:"r05-c-northern-canal-water",roughness:.07,clearcoat:1,clearcoatRoughness:.02,transparent:!0,opacity:.82});w.userData.causalRole="visual-only-outside-playable-canal";const v=Zt(c,{name:"r05-c-multiscale-reclaimed-vegetation",roughness:.78,castShadow:a,receiveShadow:!0}),y=Zt(d,{name:"r05-c-human-scale-flower-color",roughness:.62,castShadow:a}),P=Zt(u,{name:"r05-c-practical-route-lights",roughness:.18,emissive:8415033,emissiveIntensity:3.2});r.ground.add(m,...p===null?[]:[p],f,w),r.group.add(h,g,v,y,P);const b=new va(16760177,7.2,180,2);b.name="r05-c-warm-lived-in-work-light",b.position.set(600,64,804);const x=new va(7009507,3.6,125,2);return x.name="r05-c-cool-shelter-terminal-light",x.position.set(466,58,704),r.group.add(b,x),Lm(r.group),r.group.name="r05-concept-c-causal-art-slice",r.group.userData.schemaVersion="2.0.0",r.group.userData.stableId="fram-r05-concept-c-causal-cell-v2",r.group.userData.visualTarget="Concept C miniature-depth high-density voxel screen",r.group.userData.visibleSystem="deterministic-causal-scene-plus-r05-density-pass",r.group.userData.looseRoadAggregate=e?"retained:320":"removed-noncausal:320",r.group.userData.microVegetationShadow=a?"cast-and-receive":"receive-only",r}const Es={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ve},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new fe},cameraProjectionMatrixInverse:{value:new fe},cameraWorldMatrix:{value:new fe},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new S(-1,-1,-1)},sceneBoxMax:{value:new S(1,1,1)}},vertexShader:`

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
		}`},Cs={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},zi={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Om(t=5){const e=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),a=Um(e),r=a.length,s=new Uint8Array(r*4);for(let n=0;n<r;++n){const o=a[n],A=2*Math.PI*o/r,l=new S(Math.cos(A),Math.sin(A),0).normalize();s[n*4]=(l.x*.5+.5)*255,s[n*4+1]=(l.y*.5+.5)*255,s[n*4+2]=127,s[n*4+3]=255}const i=new Da(s,e,e);return i.wrapS=We,i.wrapT=We,i.needsUpdate=!0,i}function Um(t){const e=Math.floor(t)%2===0?Math.floor(t)+1:Math.floor(t),a=e*e,r=Array(a).fill(0);let s=Math.floor(e/2),i=e-1;for(let n=1;n<=a;){if(s===-1&&i===e?(i=e-2,s=0):(i===e&&(i=0),s<0&&(s=e-1)),r[s*e+i]!==0){i-=2,s++;continue}else r[s*e+i]=n++;i++,s--}return r}const Ms={defines:{SAMPLES:16,SAMPLE_VECTORS:td(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Ve},cameraProjectionMatrixInverse:{value:new fe},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function td(t,e,a){const r=Nm(t,e,a);let s="vec3[SAMPLES](";for(let i=0;i<t;i++){const n=r[i];s+=`vec3(${n.x}, ${n.y}, ${n.z})${i<t-1?",":")"}`}return s}function Nm(t,e,a){const r=[];for(let s=0;s<t;s++){const i=2*Math.PI*e*s/t,n=Math.pow(s/(t-1),a);r.push(new S(Math.cos(i),Math.sin(i),n))}return r}class Hm{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let a=0;a<256;a++)this.p[a]=Math.floor(e.random()*256);this.perm=[];for(let a=0;a<512;a++)this.perm[a]=this.p[a&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,a){let r,s,i;const n=.5*(Math.sqrt(3)-1),o=(e+a)*n,A=Math.floor(e+o),l=Math.floor(a+o),c=(3-Math.sqrt(3))/6,d=(A+l)*c,u=A-d,h=l-d,g=e-u,p=a-h;let m,f;g>p?(m=1,f=0):(m=0,f=1);const w=g-m+c,v=p-f+c,y=g-1+2*c,P=p-1+2*c,b=A&255,x=l&255,B=this.perm[b+this.perm[x]]%12,E=this.perm[b+m+this.perm[x+f]]%12,M=this.perm[b+1+this.perm[x+1]]%12;let T=.5-g*g-p*p;T<0?r=0:(T*=T,r=T*T*this._dot(this.grad3[B],g,p));let k=.5-w*w-v*v;k<0?s=0:(k*=k,s=k*k*this._dot(this.grad3[E],w,v));let H=.5-y*y-P*P;return H<0?i=0:(H*=H,i=H*H*this._dot(this.grad3[M],y,P)),70*(r+s+i)}noise3d(e,a,r){let s,i,n,o;const l=(e+a+r)*.3333333333333333,c=Math.floor(e+l),d=Math.floor(a+l),u=Math.floor(r+l),h=1/6,g=(c+d+u)*h,p=c-g,m=d-g,f=u-g,w=e-p,v=a-m,y=r-f;let P,b,x,B,E,M;w>=v?v>=y?(P=1,b=0,x=0,B=1,E=1,M=0):w>=y?(P=1,b=0,x=0,B=1,E=0,M=1):(P=0,b=0,x=1,B=1,E=0,M=1):v<y?(P=0,b=0,x=1,B=0,E=1,M=1):w<y?(P=0,b=1,x=0,B=0,E=1,M=1):(P=0,b=1,x=0,B=1,E=1,M=0);const T=w-P+h,k=v-b+h,H=y-x+h,O=w-B+2*h,X=v-E+2*h,j=y-M+2*h,ee=w-1+3*h,J=v-1+3*h,_=y-1+3*h,ie=c&255,pe=d&255,Re=u&255,Ue=this.perm[ie+this.perm[pe+this.perm[Re]]]%12,_e=this.perm[ie+P+this.perm[pe+b+this.perm[Re+x]]]%12,Fe=this.perm[ie+B+this.perm[pe+E+this.perm[Re+M]]]%12,ce=this.perm[ie+1+this.perm[pe+1+this.perm[Re+1]]]%12;let me=.6-w*w-v*v-y*y;me<0?s=0:(me*=me,s=me*me*this._dot3(this.grad3[Ue],w,v,y));let xe=.6-T*T-k*k-H*H;xe<0?i=0:(xe*=xe,i=xe*xe*this._dot3(this.grad3[_e],T,k,H));let Ke=.6-O*O-X*X-j*j;Ke<0?n=0:(Ke*=Ke,n=Ke*Ke*this._dot3(this.grad3[Fe],O,X,j));let pt=.6-ee*ee-J*J-_*_;return pt<0?o=0:(pt*=pt,o=pt*pt*this._dot3(this.grad3[ce],ee,J,_)),32*(s+i+n+o)}noise4d(e,a,r,s){const i=this.grad4,n=this.simplex,o=this.perm,A=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let c,d,u,h,g;const p=(e+a+r+s)*A,m=Math.floor(e+p),f=Math.floor(a+p),w=Math.floor(r+p),v=Math.floor(s+p),y=(m+f+w+v)*l,P=m-y,b=f-y,x=w-y,B=v-y,E=e-P,M=a-b,T=r-x,k=s-B,H=E>M?32:0,O=E>T?16:0,X=M>T?8:0,j=E>k?4:0,ee=M>k?2:0,J=T>k?1:0,_=H+O+X+j+ee+J,ie=n[_][0]>=3?1:0,pe=n[_][1]>=3?1:0,Re=n[_][2]>=3?1:0,Ue=n[_][3]>=3?1:0,_e=n[_][0]>=2?1:0,Fe=n[_][1]>=2?1:0,ce=n[_][2]>=2?1:0,me=n[_][3]>=2?1:0,xe=n[_][0]>=1?1:0,Ke=n[_][1]>=1?1:0,pt=n[_][2]>=1?1:0,Jt=n[_][3]>=1?1:0,da=E-ie+l,kr=M-pe+l,Wa=T-Re+l,Va=k-Ue+l,Ka=E-_e+2*l,Ja=M-Fe+2*l,Za=T-ce+2*l,$a=k-me+2*l,Pa=E-xe+3*l,er=M-Ke+3*l,Ea=T-pt+3*l,tr=k-Jt+3*l,ar=E-1+4*l,be=M-1+4*l,Tr=T-1+4*l,Ca=k-1+4*l,Ma=m&255,Sa=f&255,Q=w&255,K=v&255,N=o[Ma+o[Sa+o[Q+o[K]]]]%32,Dt=o[Ma+ie+o[Sa+pe+o[Q+Re+o[K+Ue]]]]%32,Ge=o[Ma+_e+o[Sa+Fe+o[Q+ce+o[K+me]]]]%32,Oe=o[Ma+xe+o[Sa+Ke+o[Q+pt+o[K+Jt]]]]%32,rr=o[Ma+1+o[Sa+1+o[Q+1+o[K+1]]]]%32;let Ia=.6-E*E-M*M-T*T-k*k;Ia<0?c=0:(Ia*=Ia,c=Ia*Ia*this._dot4(i[N],E,M,T,k));let Qa=.6-da*da-kr*kr-Wa*Wa-Va*Va;Qa<0?d=0:(Qa*=Qa,d=Qa*Qa*this._dot4(i[Dt],da,kr,Wa,Va));let Xe=.6-Ka*Ka-Ja*Ja-Za*Za-$a*$a;Xe<0?u=0:(Xe*=Xe,u=Xe*Xe*this._dot4(i[Ge],Ka,Ja,Za,$a));let Je=.6-Pa*Pa-er*er-Ea*Ea-tr*tr;Je<0?h=0:(Je*=Je,h=Je*Je*this._dot4(i[Oe],Pa,er,Ea,tr));let Ze=.6-ar*ar-be*be-Tr*Tr-Ca*Ca;return Ze<0?g=0:(Ze*=Ze,g=Ze*Ze*this._dot4(i[rr],ar,be,Tr,Ca)),27*(c+d+u+h+g)}_dot(e,a,r){return e[0]*a+e[1]*r}_dot3(e,a,r,s){return e[0]*a+e[1]*r+e[2]*s}_dot4(e,a,r,s,i){return e[0]*a+e[1]*r+e[2]*s+e[3]*i}}class jt extends Ln{constructor(e,a,r=512,s=512,i,n,o){super(),this.width=r,this.height=s,this.clear=!0,this.camera=a,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Om(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new br(this.width,this.height,{type:Dr}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new xt({defines:Object.assign({},Es.defines),uniforms:Wt.clone(Es.uniforms),vertexShader:Es.vertexShader,fragmentShader:Es.fragmentShader,blending:ha,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Nd,this.normalMaterial.blending=ha,this.pdMaterial=new xt({defines:Object.assign({},Ms.defines),uniforms:Wt.clone(Ms.uniforms),vertexShader:Ms.vertexShader,fragmentShader:Ms.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new xt({defines:Object.assign({},Cs.defines),uniforms:Wt.clone(Cs.uniforms),vertexShader:Cs.vertexShader,fragmentShader:Cs.fragmentShader,blending:ha}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new xt({uniforms:Wt.clone(vi.uniforms),vertexShader:vi.vertexShader,fragmentShader:vi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Po,blendDst:ds,blendEquation:cs,blendSrcAlpha:Bo,blendDstAlpha:ds,blendEquationAlpha:cs}),this.blendMaterial=new xt({uniforms:Wt.clone(zi.uniforms),vertexShader:zi.vertexShader,fragmentShader:zi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Hd,blendSrc:Po,blendDst:ds,blendEquation:cs,blendSrcAlpha:Bo,blendDstAlpha:ds,blendEquationAlpha:cs}),this._fsQuad=new ei(null),this._originalClearColor=new Y,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),n!==void 0&&this.updateGtaoMaterial(n),o!==void 0&&this.updatePdMaterial(o)}setSize(e,a){this.width=e,this.height=a,this.gtaoRenderTarget.setSize(e,a),this.normalRenderTarget.setSize(e,a),this.pdRenderTarget.setSize(e,a),this.gtaoMaterial.uniforms.resolution.value.set(e,a),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,a),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,a){e!==void 0?(this.depthTexture=e,this.normalTexture=a,this._renderGBuffer=!1):(this.depthTexture=new Vl,this.depthTexture.format=_d,this.depthTexture.type=Gd,this.normalRenderTarget=new br(this.width,this.height,{minFilter:Br,magFilter:Br,type:Dr,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const r=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=r,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=r,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let a=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,a=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,a=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,a=!0),a&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=td(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,a,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case jt.OUTPUT.Off:break;case jt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=ha,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:a);break;case jt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=ha,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:a);break;case jt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=ha,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:a);break;case jt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:a);break;case jt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ha,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:a);break;case jt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=ha,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:a),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:a);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,a,r,s,i){e.getClearColor(this._originalClearColor);const n=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(r),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=a,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(n)}_renderOverride(e,a,r,s,i){e.getClearColor(this._originalClearColor);const n=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(r),e.autoClear=!1,s=a.clearColor||s,i=a.clearAlpha||i,s!=null&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=a,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(n)}_overrideVisibility(){const e=this.scene,a=this._visibilityCache;e.traverse(function(r){(r.isPoints||r.isLine||r.isLine2)&&r.visible&&(r.visible=!1,a.push(r))})}_restoreVisibility(){const e=this._visibilityCache;for(let a=0;a<e.length;a++)e[a].visible=!0;e.length=0}_generateNoise(e=64){const a=new Hm,r=e*e*4,s=new Uint8Array(r);for(let n=0;n<e;n++)for(let o=0;o<e;o++){const A=n,l=o;s[(n*e+o)*4]=(a.noise(A,l)*.5+.5)*255,s[(n*e+o)*4+1]=(a.noise(A+e,l)*.5+.5)*255,s[(n*e+o)*4+2]=(a.noise(A,l+e)*.5+.5)*255,s[(n*e+o)*4+3]=(a.noise(A+e,l+e)*.5+.5)*255}const i=new Da(s,e,e,Ya,ya);return i.wrapS=We,i.wrapT=We,i.needsUpdate=!0,i}}jt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Ss={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Ve(1/1024,1/512)}},vertexShader:`

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

		}`},Is={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Ve(1/1024,1/512)}},vertexShader:`

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

		}`},Li={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Ve(1/1024,1/512)}},vertexShader:`

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

		}`};class _m extends Ln{constructor(){super(),this._edgesRT=new br(1,1,{depthBuffer:!1,type:Dr}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new br(1,1,{depthBuffer:!1,type:Dr}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,a=new Image;a.src=this._getAreaTexture(),a.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Vr,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=a,this._areaTexture.minFilter=at,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const r=new Image;r.src=this._getSearchTexture(),r.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Vr,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=r,this._searchTexture.magFilter=Br,this._searchTexture.minFilter=Br,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Wt.clone(Ss.uniforms),this._materialEdges=new xt({defines:Object.assign({},Ss.defines),uniforms:this._uniformsEdges,vertexShader:Ss.vertexShader,fragmentShader:Ss.fragmentShader}),this._uniformsWeights=Wt.clone(Is.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new xt({defines:Object.assign({},Is.defines),uniforms:this._uniformsWeights,vertexShader:Is.vertexShader,fragmentShader:Is.fragmentShader}),this._uniformsBlend=Wt.clone(Li.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new xt({uniforms:this._uniformsBlend,vertexShader:Li.vertexShader,fragmentShader:Li.fragmentShader}),this._fsQuad=new ei(null)}render(e,a,r){this._uniformsEdges.tDiffuse.value=r.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=r.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,a){this._edgesRT.setSize(e,a),this._weightsRT.setSize(e,a),this._materialEdges.uniforms.resolution.value.set(1/e,1/a),this._materialWeights.uniforms.resolution.value.set(1/e,1/a),this._materialBlend.uniforms.resolution.value.set(1/e,1/a)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const Gm={name:"HorizontalTiltShiftShader",uniforms:{tDiffuse:{value:null},h:{value:1/512},r:{value:.35}},vertexShader:`

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

		}`},Xm={name:"VerticalTiltShiftShader",uniforms:{tDiffuse:{value:null},v:{value:1/512},r:{value:.35}},vertexShader:`

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

		}`},qm=2,Ym=4;function jm(t,e,a,r,s,i){t.updateMatrixWorld(!0);const n=t.matrixWorld.elements,o=Math.hypot(n[8],n[10]),A=o>Number.EPSILON?n[8]/o:0,l=o>Number.EPSILON?n[10]/o:1;a.set(A,0,l,-(A*e.x+l*e.z)),s.multiplyMatrices(t.matrixWorld,t.projectionMatrixInverse),i.copy(s).transpose(),r.copy(a).applyMatrix4(i)}const jA={name:"BandedTiltShiftShader",uniforms:{tDiffuse:{value:null},direction:{value:new Ve(1,0)},focus:{value:.58},clearBand:{value:.14},farBlur:{value:13},nearBlur:{value:19},resolution:{value:new Ve(1,1)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform vec2 resolution;
    uniform float focus;
    uniform float clearBand;
    uniform float farBlur;
    uniform float nearBlur;
    varying vec2 vUv;

    void main() {
      float signedDistance = vUv.y - focus;
      float edgeDistance = max(0.0, abs(signedDistance) - clearBand);
      float availableDistance = max(0.001, signedDistance < 0.0
        ? focus - clearBand
        : 1.0 - focus - clearBand);
      float ramp = smoothstep(0.0, 1.0, edgeDistance / availableDistance);
      float maxBlur = signedDistance < 0.0 ? farBlur : nearBlur;
      vec2 stepSize = direction * (maxBlur * ramp) / resolution;

      vec4 color = texture2D(tDiffuse, vUv) * 0.227027;
      color += texture2D(tDiffuse, vUv + stepSize * 1.384615) * 0.316216;
      color += texture2D(tDiffuse, vUv - stepSize * 1.384615) * 0.316216;
      color += texture2D(tDiffuse, vUv + stepSize * 3.230769) * 0.070270;
      color += texture2D(tDiffuse, vUv - stepSize * 3.230769) * 0.070270;
      gl_FragColor = color;
    }
  `},Fi={uniforms:{tDiffuse:{value:null},tDepth:{value:null},resolution:{value:new Ve(1,1)},focusDepth:{value:.5},focusRange:{value:.024},focusPlaneMode:{value:0},focusPlaneClip:{value:new ti(0,0,1,-.5)},focusRangeWorldUnits:{value:150},focusUvY:{value:.54},bandHalfHeight:{value:.105},rampExponent:{value:1},farBlurPixels:{value:2.35},nearBlurPixels:{value:2.35},edgeThreshold:{value:.0065}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform vec2 resolution;
    uniform float focusDepth;
    uniform float focusRange;
    uniform float focusPlaneMode;
    uniform vec4 focusPlaneClip;
    uniform float focusRangeWorldUnits;
    uniform float focusUvY;
    uniform float bandHalfHeight;
    uniform float rampExponent;
    uniform float farBlurPixels;
    uniform float nearBlurPixels;
    uniform float edgeThreshold;
    varying vec2 vUv;

    float normalizedFocusDistance(vec2 sampleUv, float sampleDepth) {
      float cameraDepthDistance = abs(sampleDepth - focusDepth) /
        max(focusRange, 0.0001);
      vec4 clipPosition = vec4(
        sampleUv * 2.0 - 1.0,
        sampleDepth * 2.0 - 1.0,
        1.0
      );
      float tiltedPlaneDistance = abs(dot(focusPlaneClip, clipPosition)) /
        max(focusRangeWorldUnits, 0.001);
      return mix(cameraDepthDistance, tiltedPlaneDistance, focusPlaneMode);
    }

    float circleOfConfusion(vec2 sampleUv, float sampleDepth) {
      if (focusPlaneMode > 1.5) {
        float signedBand = sampleUv.y - focusUvY;
        float outside = max(abs(signedBand) - bandHalfHeight, 0.0);
        float available = max(
          0.001,
          signedBand < 0.0
            ? focusUvY - bandHalfHeight
            : 1.0 - focusUvY - bandHalfHeight
        );
        float normalized = clamp(outside / available, 0.0, 1.0);
        float smoothRamp = normalized * normalized *
          (3.0 - 2.0 * normalized);
        return pow(smoothRamp, max(0.01, rampExponent));
      }
      return smoothstep(
        0.28,
        1.0,
        normalizedFocusDistance(sampleUv, sampleDepth)
      );
    }

    void main() {
      float centerDepth = texture2D(tDepth, vUv).r;
      float signedFocus = focusPlaneMode > 1.5
        ? vUv.y - focusUvY
        : centerDepth - focusDepth;
      float coc = circleOfConfusion(vUv, centerDepth);
      float blurPixels = signedFocus < 0.0 ? nearBlurPixels : farBlurPixels;
      vec2 radius = (blurPixels * coc) / resolution;

      if (coc < 0.015) {
        gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb, centerDepth);
        return;
      }

      vec3 sum = texture2D(tDiffuse, vUv).rgb * 2.4;
      float weightSum = 2.4;
      vec2 taps[12];
      taps[0] = vec2(0.5, 0.0);
      taps[1] = vec2(0.25, 0.433);
      taps[2] = vec2(-0.25, 0.433);
      taps[3] = vec2(-0.5, 0.0);
      taps[4] = vec2(-0.25, -0.433);
      taps[5] = vec2(0.25, -0.433);
      taps[6] = vec2(1.0, 0.0);
      taps[7] = vec2(0.5, 0.866);
      taps[8] = vec2(-0.5, 0.866);
      taps[9] = vec2(-1.0, 0.0);
      taps[10] = vec2(-0.5, -0.866);
      taps[11] = vec2(0.5, -0.866);

      for (int index = 0; index < 12; index += 1) {
        vec2 sampleUv = clamp(vUv + taps[index] * radius, vec2(0.001), vec2(0.999));
        float sampleDepth = texture2D(tDepth, sampleUv).r;
        float depthDelta = abs(sampleDepth - centerDepth);
        float sameSurface = 1.0 - smoothstep(
          edgeThreshold * 0.38,
          edgeThreshold,
          depthDelta
        );
        float ringWeight = index < 6 ? 0.72 : 0.52;
        float weight = ringWeight * sameSurface;
        if (focusPlaneMode < 1.5) {
          float sampleCoc = circleOfConfusion(sampleUv, sampleDepth);
          weight *= mix(0.45, 1.0, sampleCoc);
        }
        sum += texture2D(tDiffuse, sampleUv).rgb * weight;
        weightSum += weight;
      }

      gl_FragColor = vec4(sum / max(weightSum, 0.001), centerDepth);
    }
  `},Oi={uniforms:{tDiffuse:{value:null},tBokeh:{value:null},tDepth:{value:null},focusDepth:{value:.5},focusRange:{value:.024},focusPlaneMode:{value:0},focusPlaneClip:{value:new ti(0,0,1,-.5)},focusRangeWorldUnits:{value:150},focusUvY:{value:.54},bandHalfHeight:{value:.105},rampExponent:{value:1},edgeThreshold:{value:.0065}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D tBokeh;
    uniform sampler2D tDepth;
    uniform float focusDepth;
    uniform float focusRange;
    uniform float focusPlaneMode;
    uniform vec4 focusPlaneClip;
    uniform float focusRangeWorldUnits;
    uniform float focusUvY;
    uniform float bandHalfHeight;
    uniform float rampExponent;
    uniform float edgeThreshold;
    varying vec2 vUv;

    float normalizedFocusDistance(vec2 sampleUv, float sampleDepth) {
      float cameraDepthDistance = abs(sampleDepth - focusDepth) /
        max(focusRange, 0.0001);
      vec4 clipPosition = vec4(
        sampleUv * 2.0 - 1.0,
        sampleDepth * 2.0 - 1.0,
        1.0
      );
      float tiltedPlaneDistance = abs(dot(focusPlaneClip, clipPosition)) /
        max(focusRangeWorldUnits, 0.001);
      return mix(cameraDepthDistance, tiltedPlaneDistance, focusPlaneMode);
    }

    float circleOfConfusion(vec2 sampleUv, float sampleDepth) {
      if (focusPlaneMode > 1.5) {
        float signedBand = sampleUv.y - focusUvY;
        float outside = max(abs(signedBand) - bandHalfHeight, 0.0);
        float available = max(
          0.001,
          signedBand < 0.0
            ? focusUvY - bandHalfHeight
            : 1.0 - focusUvY - bandHalfHeight
        );
        float normalized = clamp(outside / available, 0.0, 1.0);
        float smoothRamp = normalized * normalized *
          (3.0 - 2.0 * normalized);
        return pow(smoothRamp, max(0.01, rampExponent));
      }
      return smoothstep(
        0.28,
        1.0,
        normalizedFocusDistance(sampleUv, sampleDepth)
      );
    }

    void main() {
      vec4 source = texture2D(tDiffuse, vUv);
      float depth = texture2D(tDepth, vUv).r;
      float coc = circleOfConfusion(vUv, depth);
      vec4 bokeh = texture2D(tBokeh, vUv);
      float edgeConfidence = 1.0 - smoothstep(
        edgeThreshold * 0.38,
        edgeThreshold * 1.4,
        abs(depth - bokeh.a)
      );
      gl_FragColor = vec4(
        mix(source.rgb, bokeh.rgb, coc * edgeConfidence),
        source.a
      );
    }
  `};class Wm extends Ln{scale;target;blurMaterial;compositeMaterial;blurQuad;compositeQuad;constructor(e,a){super(),this.scale=C.clamp(e,.25,1),this.needsSwap=!0,this.target=new br(1,1,{depthBuffer:!1,stencilBuffer:!1,type:a,minFilter:at,magFilter:at}),this.target.texture.name="R10 half-resolution bilateral bokeh",this.blurMaterial=new xt({name:"R10 shared-depth bilateral bokeh blur",uniforms:Wt.clone(Fi.uniforms),vertexShader:Fi.vertexShader,fragmentShader:Fi.fragmentShader,depthTest:!1,depthWrite:!1}),this.compositeMaterial=new xt({name:"R10 full-resolution depth bokeh composite",uniforms:Wt.clone(Oi.uniforms),vertexShader:Oi.vertexShader,fragmentShader:Oi.fragmentShader,depthTest:!1,depthWrite:!1}),this.blurQuad=new ei(this.blurMaterial),this.compositeQuad=new ei(this.compositeMaterial)}setSize(e,a){this.target.setSize(Math.max(1,Math.round(e*this.scale)),Math.max(1,Math.round(a*this.scale))),this.blurMaterial.uniforms.resolution.value.set(e,a)}setParameters(e){this.setFocus(e),this.blurMaterial.uniforms.farBlurPixels.value=e.farBlurPixels,this.blurMaterial.uniforms.nearBlurPixels.value=e.nearBlurPixels,this.blurMaterial.uniforms.edgeThreshold.value=e.edgeThreshold,this.compositeMaterial.uniforms.edgeThreshold.value=e.edgeThreshold}setFocus(e){const a=e.focusPlaneMode==="player-screen-band"?2:e.focusPlaneMode==="tilted-world-slice"?1:0;for(const r of[this.blurMaterial,this.compositeMaterial])r.uniforms.focusDepth.value=e.focusDepth,r.uniforms.focusRange.value=e.focusRange,r.uniforms.focusPlaneMode.value=a,r.uniforms.focusPlaneClip.value.copy(e.focusPlaneClip),r.uniforms.focusRangeWorldUnits.value=e.focusRangeWorldUnits,r.uniforms.focusUvY.value=e.focusUvY,r.uniforms.bandHalfHeight.value=e.bandHalfHeight,r.uniforms.rampExponent.value=e.rampExponent}render(e,a,r){const s=r.depthTexture;if(s===null){e.setRenderTarget(this.renderToScreen?null:a),this.compositeMaterial.uniforms.tDiffuse.value=r.texture,this.compositeMaterial.uniforms.tBokeh.value=r.texture,this.compositeMaterial.uniforms.tDepth.value=r.texture,this.compositeQuad.render(e);return}this.blurMaterial.uniforms.tDiffuse.value=r.texture,this.blurMaterial.uniforms.tDepth.value=s,e.setRenderTarget(this.target),e.clear(),this.blurQuad.render(e),this.compositeMaterial.uniforms.tDiffuse.value=r.texture,this.compositeMaterial.uniforms.tBokeh.value=this.target.texture,this.compositeMaterial.uniforms.tDepth.value=s,e.setRenderTarget(this.renderToScreen?null:a),this.clear&&e.clear(),this.compositeQuad.render(e)}dispose(){this.target.dispose(),this.blurMaterial.dispose(),this.compositeMaterial.dispose(),this.blurQuad.dispose(),this.compositeQuad.dispose()}}const Vm={name:"FramCinematicFinishShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Ve(1,1)},exposure:{value:1},contrast:{value:1},saturation:{value:1},tint:{value:0},chromaTintFloor:{value:.2},voxelClarity:{value:0},voxelEdge:{value:0},shadowCool:{value:0},highlightWarm:{value:0},vignette:{value:0},miniatureEnabled:{value:0},miniatureFocus:{value:.57},miniatureClearBand:{value:.28},miniatureFarBlurPixels:{value:0},miniatureNearBlurPixels:{value:0},miniatureStrength:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float exposure;
    uniform float contrast;
    uniform float saturation;
    uniform float tint;
    uniform float chromaTintFloor;
    uniform float voxelClarity;
    uniform float voxelEdge;
    uniform float shadowCool;
    uniform float highlightWarm;
    uniform float vignette;
    uniform float miniatureEnabled;
    uniform float miniatureFocus;
    uniform float miniatureClearBand;
    uniform float miniatureFarBlurPixels;
    uniform float miniatureNearBlurPixels;
    uniform float miniatureStrength;
    varying vec2 vUv;

    void main() {
      vec2 texel = 1.0 / max(resolution, vec2(1.0));
      vec4 source = texture2D(tDiffuse, vUv);
      float signedFocusDistance = vUv.y - miniatureFocus;
      float bandDistance = max(
        0.0,
        abs(signedFocusDistance) - miniatureClearBand
      );
      float availableDistance = max(
        0.001,
        signedFocusDistance < 0.0
          ? miniatureFocus - miniatureClearBand
          : 1.0 - miniatureFocus - miniatureClearBand
      );
      float miniatureRamp = smoothstep(
        0.0,
        1.0,
        bandDistance / availableDistance
      );
      float miniaturePixels = signedFocusDistance < 0.0
        ? miniatureFarBlurPixels
        : miniatureNearBlurPixels;
      vec2 sampleTexel = texel * max(1.0, miniaturePixels * miniatureRamp);
      vec3 neighbours = (
        texture2D(tDiffuse, vUv + vec2(sampleTexel.x, 0.0)).rgb +
        texture2D(tDiffuse, vUv - vec2(sampleTexel.x, 0.0)).rgb +
        texture2D(tDiffuse, vUv + vec2(0.0, sampleTexel.y)).rgb +
        texture2D(tDiffuse, vUv - vec2(0.0, sampleTexel.y)).rgb
      ) * 0.25;
      float miniatureWeight = miniatureEnabled * miniatureStrength * miniatureRamp;
      vec3 focusedSource = mix(source.rgb, neighbours, miniatureWeight);
      vec3 color = max(
        focusedSource + (focusedSource - neighbours) * voxelClarity,
        0.0
      );

      color *= exposure;
      float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
      float neighbourLuminance = dot(neighbours, vec3(0.2126, 0.7152, 0.0722));
      float edge = smoothstep(0.018, 0.24, abs(luminance - neighbourLuminance));
      color *= 1.0 - edge * voxelEdge;
      color = mix(vec3(luminance), color, saturation);
      color = max((color - vec3(0.18)) * contrast + vec3(0.18), 0.0);
      // Correct the yellow-green cast most strongly near the grey axis, while
      // preserving intentionally green foliage. This is an analytic white-
      // balance step, so even the SDR Safe tier avoids a LUT texture fetch.
      float chroma = max(color.r, max(color.g, color.b)) -
        min(color.r, min(color.g, color.b));
      float neutralWeight = 1.0 - smoothstep(0.08, 0.34, chroma);
      float tintWeight = tint * mix(chromaTintFloor, 1.0, neutralWeight);
      color *= vec3(
        1.0 + tintWeight * 0.16,
        1.0 - tintWeight * 0.22,
        1.0 + tintWeight * 0.18
      );

      float displayLuminance = luminance / (1.0 + luminance);
      float shadowWeight = 1.0 - smoothstep(0.12, 0.48, displayLuminance);
      float highlightWeight = smoothstep(0.34, 0.82, displayLuminance);
      color *= mix(vec3(1.0), vec3(0.96, 1.01, 1.1), shadowWeight * shadowCool);
      color *= mix(vec3(1.0), vec3(1.1, 1.025, 0.94), highlightWeight * highlightWarm);


      float edgeDistance = length((vUv - 0.5) * vec2(1.0, 0.78)) * 1.4142;
      float edgeMask = smoothstep(0.28, 0.82, edgeDistance);
      color *= 1.0 - vignette * edgeMask;
      gl_FragColor = vec4(color, source.a);
    }
  `};class Km{renderer;scene;camera;maxPixelRatio;configuredPixelRatio;onFallback;composer=null;passes=[];width=1;height=1;pixelRatio=1;samples=0;hdrEnabled=!0;mode="direct";gtaoEnabled=!1;gtaoIntensity=.52;gtaoResolutionScale=1;gtaoSamples=12;gtaoDenoiseRings=2;gtaoDenoiseSamples=8;gtaoPass=null;gtaoUsesSharedDepth=!1;bloomEnabled=!1;bloomStrength=.22;bloomRadius=.18;bloomThreshold=1.15;smaaEnabled=!1;finishEnabled=!1;finishPass=null;finishExposure=1;finishContrast=1;finishSaturation=1;finishTint=0;finishChromaTintFloor=.2;finishVoxelClarity=0;finishVoxelEdge=0;finishShadowCool=0;finishHighlightWarm=0;finishVignette=0;finishMiniatureEnabled=!1;finishMiniatureFocus=.57;finishMiniatureClearBand=.28;finishMiniatureFarBlurPixels=0;finishMiniatureNearBlurPixels=0;finishMiniatureStrength=0;tiltShiftEnabled=!1;horizontalTiltShift=null;verticalTiltShift=null;tiltShiftFocus=.48;tiltShiftStrength=3.4;tiltShiftMode="classic";tiltShiftClearBand=.14;tiltShiftFarBlurPixels=13;tiltShiftNearBlurPixels=19;depthAwareDofEnabled=!1;depthAwareDofPass=null;depthFocus=.5;depthFocusPlane="camera-depth";depthFocusRange=.024;depthFocusRangeWorldUnits=150;depthFocusUvY=.54;depthFocusBandHalfHeight=.105;depthFocusRampExponent=1;depthBlurPixels=2.35;depthFarBlurPixels=2.35;depthNearBlurPixels=2.35;depthFarBlurPixelsBase=2.35;depthNearBlurPixelsBase=2.35;depthBlurStrength=1;depthBokehSamples=12;depthResolutionScale=0;depthEdgeThreshold=.0065;projectedFocus=new S;worldFocusPlane=new ti(0,0,1,0);clipFocusPlane=new ti(0,0,1,-.5);inverseViewProjection=new fe;focusPlaneTransform=new fe;fallbackReason=null;disposed=!1;constructor(e,a,r,s={}){this.renderer=e,this.scene=a,this.camera=r,this.maxPixelRatio=Zm(s.maxPixelRatio??qm),this.configuredPixelRatio=Number.isFinite(s.pixelRatio)?s.pixelRatio:void 0,this.onFallback=s.onFallback;const i=e.getSize(new Ve);this.width=Qs(i.x),this.height=Qs(i.y),this.pixelRatio=this.resolvePixelRatio(s.pixelRatio),this.createComposer(s),this.resize(this.width,this.height,this.pixelRatio)}render(e){if(!this.disposed){if(this.composer!==null)try{this.syncGtaoDepthTexture(),this.composer.render(e);return}catch(a){this.fallbackToDirect(a)}this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}}resize(e,a,r){if(!this.disposed&&(this.width=Qs(e),this.height=Qs(a),this.pixelRatio=this.resolvePixelRatio(r),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.composer!==null))try{this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(this.width,this.height),this.syncGtaoSize(),this.syncTiltShiftUniforms(),this.syncDepthAwareDofUniforms(),this.syncFinishUniforms()}catch(s){this.fallbackToDirect(s)}}getStatus(){return{mode:this.mode,width:this.width,height:this.height,pixelRatio:this.pixelRatio,samples:this.samples,hdr:this.hdrEnabled,gtao:this.gtaoEnabled,gtaoIntensity:this.gtaoIntensity,gtaoResolutionScale:this.gtaoResolutionScale,gtaoSamples:this.gtaoSamples,gtaoDenoiseRings:this.gtaoDenoiseRings,gtaoDenoiseSamples:this.gtaoDenoiseSamples,bloom:this.bloomEnabled,bloomStrength:this.bloomStrength,bloomRadius:this.bloomRadius,bloomThreshold:this.bloomThreshold,smaa:this.smaaEnabled,finish:this.finishEnabled,finishExposure:this.finishExposure,finishContrast:this.finishContrast,finishSaturation:this.finishSaturation,finishTint:this.finishTint,finishChromaTintFloor:this.finishChromaTintFloor,finishVoxelClarity:this.finishVoxelClarity,finishVoxelEdge:this.finishVoxelEdge,finishShadowCool:this.finishShadowCool,finishHighlightWarm:this.finishHighlightWarm,finishVignette:this.finishVignette,finishMiniatureEnabled:this.finishMiniatureEnabled,finishMiniatureFocus:this.finishMiniatureFocus,finishMiniatureClearBand:this.finishMiniatureClearBand,finishMiniatureFarBlurPixels:this.finishMiniatureFarBlurPixels,finishMiniatureNearBlurPixels:this.finishMiniatureNearBlurPixels,finishMiniatureStrength:this.finishMiniatureStrength,tiltShift:this.tiltShiftEnabled,tiltShiftMode:this.tiltShiftMode,tiltShiftFocus:this.tiltShiftFocus,tiltShiftClearBand:this.tiltShiftClearBand,tiltShiftFarBlurPixels:this.tiltShiftFarBlurPixels,tiltShiftNearBlurPixels:this.tiltShiftNearBlurPixels,depthAwareDof:this.depthAwareDofEnabled,depthFocus:this.depthFocus,depthFocusPlane:this.depthFocusPlane,depthFocusRange:this.depthFocusRange,depthFocusRangeWorldUnits:this.depthFocusRangeWorldUnits,depthFocusUvY:this.depthFocusUvY,depthFocusBandHalfHeight:this.depthFocusBandHalfHeight,depthFocusRampExponent:this.depthFocusRampExponent,depthBlurPixels:this.depthBlurPixels,depthFarBlurPixels:this.depthFarBlurPixels,depthNearBlurPixels:this.depthNearBlurPixels,depthBlurStrength:this.depthBlurStrength,depthBokehSamples:this.depthBokehSamples,depthResolutionScale:this.depthResolutionScale,depthEdgeThreshold:this.depthEdgeThreshold,fallbackReason:this.fallbackReason}}setDepthFocusPoint(e){this.depthAwareDofEnabled&&(this.camera.updateMatrixWorld(!0),this.projectedFocus.copy(e).project(this.camera),this.depthFocus=C.clamp(this.projectedFocus.z*.5+.5,0,1),this.depthFocusUvY=C.clamp(this.projectedFocus.y*.5+.5,0,1),this.depthFocusPlane==="tilted-world-slice"&&jm(this.camera,e,this.worldFocusPlane,this.clipFocusPlane,this.inverseViewProjection,this.focusPlaneTransform),this.depthAwareDofPass?.setFocus({focusDepth:this.depthFocus,focusRange:this.depthFocusRange,focusPlaneMode:this.depthFocusPlane,focusPlaneClip:this.clipFocusPlane,focusRangeWorldUnits:this.depthFocusRangeWorldUnits,focusUvY:this.depthFocusUvY,bandHalfHeight:this.depthFocusBandHalfHeight,rampExponent:this.depthFocusRampExponent}))}setDepthBlurStrength(e){return this.depthBlurStrength=C.clamp(Number.isFinite(e)?e:1,0,1.5),this.depthFarBlurPixels=this.depthFarBlurPixelsBase*this.depthBlurStrength,this.depthNearBlurPixels=this.depthNearBlurPixelsBase*this.depthBlurStrength,this.depthBlurPixels=Math.max(this.depthFarBlurPixels,this.depthNearBlurPixels),this.syncDepthAwareDofUniforms(),this.depthBlurStrength}dispose(){this.disposed||(this.disposed=!0,this.disposeComposer())}createComposer(e){if(this.hdrEnabled=e.hdr??!0,this.hdrEnabled&&!Jm(this.renderer)){this.fallbackReason="Half-float color targets are unavailable.";return}const a=or(e.samples??Ym),r=or(this.renderer.capabilities.maxSamples);this.samples=r>=2?Math.min(a,r):0,this.samples===1&&(this.samples=0);let s=null,i=null;const n=[];try{i=new br(1,1,{depthBuffer:!0,stencilBuffer:!1,type:this.hdrEnabled?Dr:ya,minFilter:at,magFilter:at,samples:this.samples}),((e.gtao??!0)||(e.depthAwareDof??!1))&&(i.depthTexture=new Vl(1,1,Xd),i.depthTexture.name="PC Ultra shared scene depth"),i.texture.name="PC Ultra half-float scene",i.texture.colorSpace=Kt,s=new qd(this.renderer,i),s.setPixelRatio(this.pixelRatio),s.setSize(this.width,this.height);const o=new Yd(this.scene,this.camera);if(s.addPass(o),n.push(o),e.gtao??!0){this.gtaoResolutionScale=C.clamp(e.gtaoResolutionScale??1,.25,1),this.gtaoSamples=Math.max(2,or(e.gtaoSamples??12)),this.gtaoDenoiseRings=Math.max(1,or(e.gtaoDenoiseRings??2)),this.gtaoDenoiseSamples=Math.max(2,or(e.gtaoDenoiseSamples??8));const l=Math.max(1,Math.round(this.width*this.pixelRatio*this.gtaoResolutionScale)),c=Math.max(1,Math.round(this.height*this.pixelRatio*this.gtaoResolutionScale)),d=new jt(this.scene,this.camera,l,c),u=s.readBuffer.depthTexture;u!==null&&(d.setGBuffer(u),this.gtaoUsesSharedDepth=!0),this.gtaoIntensity=C.clamp(e.gtaoIntensity??.52,0,1),d.blendIntensity=this.gtaoIntensity,d.updateGtaoMaterial({radius:.2,thickness:1,distanceFallOff:1,samples:this.gtaoSamples,screenSpaceRadius:!0}),d.updatePdMaterial({rings:this.gtaoDenoiseRings,samples:this.gtaoDenoiseSamples,radius:7}),s.addPass(d),n.push(d),this.gtaoPass=d,this.gtaoEnabled=!0}else this.gtaoIntensity=0,this.gtaoResolutionScale=0,this.gtaoSamples=0,this.gtaoDenoiseRings=0,this.gtaoDenoiseSamples=0;if((e.tiltShift??!1)&&(this.tiltShiftMode=e.tiltShiftMode??"classic",this.tiltShiftFocus=C.clamp(Number.isFinite(e.tiltShiftFocus)?e.tiltShiftFocus:.48,.18,.82),this.tiltShiftStrength=C.clamp(Number.isFinite(e.tiltShiftStrength)?e.tiltShiftStrength:3.4,.5,8),this.tiltShiftClearBand=C.clamp(e.tiltShiftClearBand??.14,.04,.32),this.tiltShiftFarBlurPixels=C.clamp(e.tiltShiftFarBlurPixels??13,2,30),this.tiltShiftNearBlurPixels=C.clamp(e.tiltShiftNearBlurPixels??19,2,36),this.horizontalTiltShift=new yi(this.tiltShiftMode==="banded"?jA:Gm),this.verticalTiltShift=new yi(this.tiltShiftMode==="banded"?jA:Xm),this.horizontalTiltShift.material.name="beauty-cell-horizontal-depth-separation",this.verticalTiltShift.material.name="beauty-cell-vertical-depth-separation",s.addPass(this.horizontalTiltShift),s.addPass(this.verticalTiltShift),n.push(this.horizontalTiltShift,this.verticalTiltShift),this.tiltShiftEnabled=!0,this.syncTiltShiftUniforms()),(e.depthAwareDof??!1)&&(this.depthFocusPlane=e.depthFocusPlane??"camera-depth",this.depthFocusRange=C.clamp(e.depthFocusRange??.024,.006,.12),this.depthFocusRangeWorldUnits=this.depthFocusPlane==="player-screen-band"?0:C.clamp(e.depthFocusRangeWorldUnits??150,16,640),this.depthFocusBandHalfHeight=C.clamp(e.depthFocusBandHalfHeight??.105,.04,.28),this.depthFocusRampExponent=C.clamp(e.depthFocusRampExponent??1,.35,2.5),this.depthBlurPixels=C.clamp(e.depthBlurPixels??2.35,.5,12),this.depthFarBlurPixelsBase=C.clamp(e.depthFarBlurPixels??this.depthBlurPixels,.5,12),this.depthNearBlurPixelsBase=C.clamp(e.depthNearBlurPixels??this.depthBlurPixels,.5,12),this.depthFarBlurPixels=this.depthFarBlurPixelsBase,this.depthNearBlurPixels=this.depthNearBlurPixelsBase,this.depthBlurPixels=Math.max(this.depthFarBlurPixels,this.depthNearBlurPixels),this.depthBokehSamples=Math.max(1,or(e.depthBokehSamples??12)),this.depthResolutionScale=C.clamp(e.depthResolutionScale??.5,.25,1),this.depthEdgeThreshold=C.clamp(e.depthEdgeThreshold??.0065,.001,.04),this.depthAwareDofPass=new Wm(this.depthResolutionScale,this.hdrEnabled?Dr:ya),s.addPass(this.depthAwareDofPass),n.push(this.depthAwareDofPass),this.depthAwareDofEnabled=!0,this.syncDepthAwareDofUniforms()),(e.finish??!1)&&(this.finishExposure=C.clamp(e.finishExposure??1,.5,1.5),this.finishContrast=C.clamp(e.finishContrast??1,.5,1.5),this.finishSaturation=C.clamp(e.finishSaturation??1,0,2),this.finishTint=C.clamp(e.finishTint??0,-1,1),this.finishChromaTintFloor=C.clamp(e.finishChromaTintFloor??.2,0,1),this.finishVoxelClarity=C.clamp(e.finishVoxelClarity??0,0,1),this.finishVoxelEdge=C.clamp(e.finishVoxelEdge??0,0,.5),this.finishShadowCool=C.clamp(e.finishShadowCool??0,0,1),this.finishHighlightWarm=C.clamp(e.finishHighlightWarm??0,0,1),this.finishVignette=C.clamp(e.finishVignette??0,0,.35),this.finishMiniatureEnabled=e.finishMiniatureEnabled??!1,this.finishMiniatureFocus=C.clamp(e.finishMiniatureFocus??.57,.15,.85),this.finishMiniatureClearBand=C.clamp(e.finishMiniatureClearBand??.28,.04,.42),this.finishMiniatureFarBlurPixels=C.clamp(e.finishMiniatureFarBlurPixels??0,0,12),this.finishMiniatureNearBlurPixels=C.clamp(e.finishMiniatureNearBlurPixels??0,0,12),this.finishMiniatureStrength=C.clamp(e.finishMiniatureStrength??0,0,1),this.finishPass=new yi(Vm),this.finishPass.material.name="F.R.A.M. cinematic neutral voxel finish",s.addPass(this.finishPass),n.push(this.finishPass),this.finishEnabled=!0,this.syncFinishUniforms()),e.bloom??!0){this.bloomStrength=C.clamp(e.bloomStrength??.22,0,1.5),this.bloomRadius=C.clamp(e.bloomRadius??.18,0,1),this.bloomThreshold=C.clamp(e.bloomThreshold??1.15,0,4);const l=new jd(new Ve(this.width*this.pixelRatio,this.height*this.pixelRatio),this.bloomStrength,this.bloomRadius,this.bloomThreshold);s.addPass(l),n.push(l),this.bloomEnabled=!0}if(e.smaa??!0){const l=new _m;s.addPass(l),n.push(l),this.smaaEnabled=!0}const A=new Wd;s.addPass(A),n.push(A),this.composer=s,this.passes=n,this.mode=this.hdrEnabled?this.samples>0?"half-float-msaa":"half-float":"unsigned-byte"}catch(o){s===null&&i?.dispose(),VA(s,n),this.resetFeatureStatus(),this.fallbackReason=WA(o),this.onFallback?.(o)}}resolvePixelRatio(e){const a=typeof window>"u"?1:window.devicePixelRatio||1,r=e??this.configuredPixelRatio??a;return C.clamp(Number.isFinite(r)?r:1,1,this.maxPixelRatio)}fallbackToDirect(e){this.fallbackReason=WA(e),this.disposeComposer(),this.resetFeatureStatus(),this.renderer.resetState(),this.renderer.setRenderTarget(null),this.onFallback?.(e)}disposeComposer(){VA(this.composer,this.passes),this.composer=null,this.passes=[],this.horizontalTiltShift=null,this.verticalTiltShift=null,this.gtaoPass=null,this.gtaoUsesSharedDepth=!1,this.depthAwareDofPass=null,this.finishPass=null}resetFeatureStatus(){this.mode="direct",this.samples=0,this.gtaoEnabled=!1,this.gtaoPass=null,this.gtaoUsesSharedDepth=!1,this.bloomEnabled=!1,this.smaaEnabled=!1,this.finishEnabled=!1,this.tiltShiftEnabled=!1,this.depthAwareDofEnabled=!1}syncTiltShiftUniforms(){if(this.horizontalTiltShift===null||this.verticalTiltShift===null)return;const e=Math.max(1,this.width*this.pixelRatio),a=Math.max(1,this.height*this.pixelRatio);if(this.tiltShiftMode==="banded"){for(const[r,s,i]of[[this.horizontalTiltShift,1,0],[this.verticalTiltShift,0,1]])r.uniforms.direction.value.set(s,i),r.uniforms.resolution.value.set(e,a),r.uniforms.focus.value=this.tiltShiftFocus,r.uniforms.clearBand.value=this.tiltShiftClearBand,r.uniforms.farBlur.value=this.tiltShiftFarBlurPixels,r.uniforms.nearBlur.value=this.tiltShiftNearBlurPixels;return}this.horizontalTiltShift.uniforms.h.value=this.tiltShiftStrength/e,this.horizontalTiltShift.uniforms.r.value=this.tiltShiftFocus,this.verticalTiltShift.uniforms.v.value=this.tiltShiftStrength/a,this.verticalTiltShift.uniforms.r.value=this.tiltShiftFocus}syncFinishUniforms(){this.finishPass!==null&&(this.finishPass.uniforms.resolution.value.set(Math.max(1,this.width*this.pixelRatio),Math.max(1,this.height*this.pixelRatio)),this.finishPass.uniforms.exposure.value=this.finishExposure,this.finishPass.uniforms.contrast.value=this.finishContrast,this.finishPass.uniforms.saturation.value=this.finishSaturation,this.finishPass.uniforms.tint.value=this.finishTint,this.finishPass.uniforms.chromaTintFloor.value=this.finishChromaTintFloor,this.finishPass.uniforms.voxelClarity.value=this.finishVoxelClarity,this.finishPass.uniforms.voxelEdge.value=this.finishVoxelEdge,this.finishPass.uniforms.shadowCool.value=this.finishShadowCool,this.finishPass.uniforms.highlightWarm.value=this.finishHighlightWarm,this.finishPass.uniforms.vignette.value=this.finishVignette,this.finishPass.uniforms.miniatureEnabled.value=this.finishMiniatureEnabled?1:0,this.finishPass.uniforms.miniatureFocus.value=this.finishMiniatureFocus,this.finishPass.uniforms.miniatureClearBand.value=this.finishMiniatureClearBand,this.finishPass.uniforms.miniatureFarBlurPixels.value=this.finishMiniatureFarBlurPixels,this.finishPass.uniforms.miniatureNearBlurPixels.value=this.finishMiniatureNearBlurPixels,this.finishPass.uniforms.miniatureStrength.value=this.finishMiniatureStrength)}syncGtaoSize(){this.gtaoPass!==null&&this.gtaoPass.setSize(Math.max(1,Math.round(this.width*this.pixelRatio*this.gtaoResolutionScale)),Math.max(1,Math.round(this.height*this.pixelRatio*this.gtaoResolutionScale)))}syncGtaoDepthTexture(){if(!this.gtaoUsesSharedDepth||this.gtaoPass===null||this.composer===null)return;const e=this.composer.readBuffer.depthTexture;e!==null&&this.gtaoPass.setGBuffer(e)}syncDepthAwareDofUniforms(){if(this.depthAwareDofPass===null)return;const e=Math.max(1,Math.round(this.width*this.pixelRatio)),a=Math.max(1,Math.round(this.height*this.pixelRatio));this.depthAwareDofPass.setSize(e,a),this.depthAwareDofPass.setParameters({focusDepth:this.depthFocus,focusRange:this.depthFocusRange,focusPlaneMode:this.depthFocusPlane,focusPlaneClip:this.clipFocusPlane,focusRangeWorldUnits:this.depthFocusRangeWorldUnits,focusUvY:this.depthFocusUvY,bandHalfHeight:this.depthFocusBandHalfHeight,rampExponent:this.depthFocusRampExponent,farBlurPixels:this.depthFarBlurPixels,nearBlurPixels:this.depthNearBlurPixels,edgeThreshold:this.depthEdgeThreshold})}}function Jm(t){return t.capabilities.isWebGL2&&t.extensions.has("EXT_color_buffer_float")}function Zm(t){return Number.isFinite(t)?Math.max(1,t):1}function Qs(t){return Number.isFinite(t)?Math.max(1,Math.round(t)):1}function or(t){return Number.isFinite(t)?Math.max(0,Math.floor(t)):0}function WA(t){return t instanceof Error?t.message:"Post-processing initialization or rendering failed."}function VA(t,e){for(const a of e)try{a.dispose()}catch{}try{t?.dispose()}catch{}}const $m=["pc-ultra","pc-high","mobile-high","mobile-safe"],eg={"pc-ultra":{schemaVersion:1,id:"pc-ultra",label:"PC Ultra",shortDescription:"HDR発光・soft shadow・voxel finish・full FXのvisual master。",presentation:{masterCamera:!0,masterDirectLighting:!0,cameraViewHeight:680},resolution:{strategy:"viewport-dpr",renderScale:1,maximumDevicePixelRatio:2,framPresentationMaximumDevicePixelRatio:1.5},antialiasing:{contextMsaa:!0,postSmaa:!0,renderTargetSamples:0},post:{enabled:!0,hdr:!0,gtao:!1,gtaoIntensity:0,gtaoResolutionScale:.25,gtaoSamples:2,gtaoDenoiseRings:1,gtaoDenoiseSamples:2,bloom:!0,bloomStrength:.76,bloomRadius:.34,bloomThreshold:1.05,allowPresentationDepthOfField:!0,finish:{enabled:!0,look:"fram-cinematic-neutral",exposure:1.02,contrast:1.1,saturation:1.08,tint:.42,chromaTintFloor:.2,voxelClarity:.28,voxelEdge:.26,shadowCool:.58,highlightWarm:.62,vignette:.1,miniatureDepth:{enabled:!0,mode:"depth-aware-bokeh",focusTarget:"player",focusPlane:"player-screen-band",focus:.57,clearBand:.105,bandHalfHeight:.105,rampExponent:.95,focusRange:.034,focusRangeWorldUnits:0,farBlurPixels:5.5,nearBlurPixels:7,bokehSamples:12,bokehResolutionScale:.5,edgeThreshold:.006,strength:1}}},shadows:{enabled:!0,mapSize:2048,filter:"vsm",radius:4,blurSamples:8,directionalRim:!0,environmentIbl:!0},effects:{budget:"full",maximumAnisotropy:"device-maximum",particleFraction:1,ringSegments:40,dynamicEffectLight:!0,practicalLightCount:2,environmentSource:"room-neutral",environmentResponse:2.2,emissiveResponse:2.4,attackEchoes:3,attackSparkCount:14,cameraPixelSnap:!1,surfaceDetail:{mode:"full",library:"north-star-surface-v2",maximumResolution:1024,albedo:!0,normal:!0,roughness:!0,normalStrength:.82,reflectionCoverage:"expanded-world",materialCoverage:"all-static-world",reflectionIntensity:{ground:.85,structure:.95,metal:1.45,prop:1.05,wet:1.7}},atmosphere:{fogNearMultiplier:.56,fogFarMultiplier:.7,sunIntensityMultiplier:1.22,skyFillMultiplier:.74,rimIntensityMultiplier:1.3,lightShaftCount:3,dustParticleCount:120,shaftOpacity:.055,waterMistCount:24,vegetationWindStrength:.42},ambientLife:{birdCapacity:6,insectCapacity:14,leafCapacity:40,bankPlantCount:72,waterEdgePropCount:32},terrain:{geometryRelief:4.8,normalDetail:.72},water:{mode:"local-reflection-ripples",reflectionResolution:128,normalResolution:128,flowNormalLayers:2,surfaceOpacity:.72,foamSegmentCount:48,rippleCapacity:8,clearcoat:1,roughness:.12},dynamicLight:{range:185,peakIntensity:74,height:18,attackReceiverFraction:.76,playerAttackLight:"none"}},motion:{cameraFollowSpeedMultiplier:2,playerPresentation:"bounded-extrapolation",maximumPredictionWorldUnits:6.5},performance:{frameRateIntentHz:60,uiRefresh:"simulation-step"}},"pc-high":{schemaVersion:1,id:"pc-high",label:"PC High",shortDescription:"HDR発光とcinematic voxel finishを保つ60fps quality。",presentation:{masterCamera:!0,masterDirectLighting:!0,cameraViewHeight:680},resolution:{strategy:"viewport-dpr",renderScale:.82,maximumDevicePixelRatio:1.25},antialiasing:{contextMsaa:!0,postSmaa:!0,renderTargetSamples:0},post:{enabled:!0,hdr:!0,gtao:!1,gtaoIntensity:0,gtaoResolutionScale:.25,gtaoSamples:2,gtaoDenoiseRings:1,gtaoDenoiseSamples:2,bloom:!0,bloomStrength:.38,bloomRadius:.22,bloomThreshold:.9,allowPresentationDepthOfField:!0,finish:{enabled:!0,look:"fram-cinematic-neutral",exposure:1.03,contrast:1.07,saturation:1.06,tint:.34,chromaTintFloor:.2,voxelClarity:.2,voxelEdge:.18,shadowCool:.4,highlightWarm:.42,vignette:.07,miniatureDepth:{enabled:!0,mode:"depth-aware-bokeh",focusTarget:"player",focusPlane:"player-screen-band",focus:.57,clearBand:.12,bandHalfHeight:.12,rampExponent:1,focusRange:.04,focusRangeWorldUnits:0,farBlurPixels:4,nearBlurPixels:5.5,bokehSamples:12,bokehResolutionScale:.5,edgeThreshold:.007,strength:.72}}},shadows:{enabled:!0,mapSize:1024,filter:"pcf",radius:2,blurSamples:4,directionalRim:!0,environmentIbl:!0},effects:{budget:"reduced",maximumAnisotropy:8,particleFraction:.75,ringSegments:32,dynamicEffectLight:!0,practicalLightCount:2,environmentSource:"room-neutral",environmentResponse:1.55,emissiveResponse:1.6,attackEchoes:2,attackSparkCount:8,cameraPixelSnap:!1,surfaceDetail:{mode:"reduced",library:"north-star-surface-v2",maximumResolution:512,albedo:!1,normal:!0,roughness:!0,normalStrength:.5,reflectionCoverage:"key-surfaces",materialCoverage:"all-static-world",reflectionIntensity:{ground:.55,structure:.68,metal:1.05,prop:.78,wet:1.3}},atmosphere:{fogNearMultiplier:.66,fogFarMultiplier:.8,sunIntensityMultiplier:1.1,skyFillMultiplier:.88,rimIntensityMultiplier:1.15,lightShaftCount:2,dustParticleCount:60,shaftOpacity:.035,waterMistCount:12,vegetationWindStrength:.3},ambientLife:{birdCapacity:3,insectCapacity:8,leafCapacity:20,bankPlantCount:48,waterEdgePropCount:22},terrain:{geometryRelief:3.4,normalDetail:.48},water:{mode:"local-reflection-ripples",reflectionResolution:64,normalResolution:64,flowNormalLayers:2,surfaceOpacity:.74,foamSegmentCount:28,rippleCapacity:4,clearcoat:.82,roughness:.16},dynamicLight:{range:165,peakIntensity:58,height:18,attackReceiverFraction:.74,playerAttackLight:"none"}},motion:{cameraFollowSpeedMultiplier:2,playerPresentation:"bounded-extrapolation",maximumPredictionWorldUnits:6.5},performance:{frameRateIntentHz:60,uiRefresh:"simulation-step"}},"mobile-high":{schemaVersion:1,id:"mobile-high",label:"Mobile High",shortDescription:"neutral colourと軽いvoxel finish。120fps response志向。",presentation:{masterCamera:!0,masterDirectLighting:!0,cameraViewHeight:680},resolution:{strategy:"viewport-dpr",renderScale:.7,maximumDevicePixelRatio:1},antialiasing:{contextMsaa:!0,postSmaa:!0,renderTargetSamples:0},post:{enabled:!0,hdr:!0,gtao:!1,gtaoIntensity:0,gtaoResolutionScale:.25,gtaoSamples:2,gtaoDenoiseRings:1,gtaoDenoiseSamples:2,bloom:!1,bloomStrength:0,bloomRadius:0,bloomThreshold:1.2,allowPresentationDepthOfField:!1,finish:{enabled:!0,look:"fram-cinematic-neutral",exposure:1.04,contrast:1.04,saturation:.98,tint:.28,chromaTintFloor:.2,voxelClarity:.07,voxelEdge:.04,shadowCool:.2,highlightWarm:.12,vignette:.02,miniatureDepth:{enabled:!1,mode:"off",focusTarget:"none",focusPlane:"none",focus:.57,clearBand:.3,bandHalfHeight:0,rampExponent:1,focusRange:0,focusRangeWorldUnits:0,farBlurPixels:0,nearBlurPixels:0,bokehSamples:0,bokehResolutionScale:0,edgeThreshold:0,strength:0}}},shadows:{enabled:!0,mapSize:1024,filter:"pcf",radius:1.4,blurSamples:4,directionalRim:!0,environmentIbl:!0},effects:{budget:"reduced",maximumAnisotropy:4,particleFraction:.6,ringSegments:24,dynamicEffectLight:!0,practicalLightCount:1,environmentSource:"room-neutral",environmentResponse:1,emissiveResponse:1,attackEchoes:1,attackSparkCount:4,cameraPixelSnap:!1,surfaceDetail:{mode:"reduced",library:"north-star-surface-v2",maximumResolution:512,albedo:!1,normal:!0,roughness:!0,normalStrength:.28,reflectionCoverage:"key-surfaces",materialCoverage:"all-static-world",reflectionIntensity:{ground:.26,structure:.32,metal:.5,prop:.28,wet:.62}},atmosphere:{fogNearMultiplier:1,fogFarMultiplier:1,sunIntensityMultiplier:1,skyFillMultiplier:1,rimIntensityMultiplier:1,lightShaftCount:0,dustParticleCount:0,shaftOpacity:0,waterMistCount:4,vegetationWindStrength:.14},ambientLife:{birdCapacity:0,insectCapacity:3,leafCapacity:0,bankPlantCount:28,waterEdgePropCount:12},terrain:{geometryRelief:2.2,normalDetail:.16},water:{mode:"environment-ripples",reflectionResolution:0,normalResolution:64,flowNormalLayers:1,surfaceOpacity:.76,foamSegmentCount:12,rippleCapacity:2,clearcoat:.42,roughness:.22},dynamicLight:{range:130,peakIntensity:36,height:16,attackReceiverFraction:.7,playerAttackLight:"none"}},motion:{cameraFollowSpeedMultiplier:2,playerPresentation:"bounded-extrapolation",maximumPredictionWorldUnits:6.5},performance:{frameRateIntentHz:120,uiRefresh:"simulation-step"}},"mobile-safe":{schemaVersion:1,id:"mobile-safe",label:"Mobile Safe",shortDescription:"480p SDR neutral finish。最小遅延・120fps response志向。",presentation:{masterCamera:!0,masterDirectLighting:!0,cameraViewHeight:680},resolution:{strategy:"fixed-height",renderScale:1,maximumDevicePixelRatio:1,fixedHeight:480,minimumWidth:854,maximumWidth:1075},antialiasing:{contextMsaa:!0,postSmaa:!1,renderTargetSamples:0},post:{enabled:!0,hdr:!1,gtao:!1,gtaoIntensity:0,gtaoResolutionScale:.25,gtaoSamples:0,gtaoDenoiseRings:0,gtaoDenoiseSamples:0,bloom:!1,bloomStrength:0,bloomRadius:0,bloomThreshold:1,allowPresentationDepthOfField:!1,finish:{enabled:!0,look:"fram-cinematic-neutral",exposure:1.08,contrast:1.02,saturation:.88,tint:.5,chromaTintFloor:.75,voxelClarity:.03,voxelEdge:0,shadowCool:.2,highlightWarm:.12,vignette:0,miniatureDepth:{enabled:!1,mode:"off",focusTarget:"none",focusPlane:"none",focus:.57,clearBand:.3,bandHalfHeight:0,rampExponent:1,focusRange:0,focusRangeWorldUnits:0,farBlurPixels:0,nearBlurPixels:0,bokehSamples:0,bokehResolutionScale:0,edgeThreshold:0,strength:0}}},shadows:{enabled:!0,mapSize:512,filter:"pcf",radius:1,blurSamples:2,directionalRim:!0,environmentIbl:!0},effects:{budget:"minimal",maximumAnisotropy:4,particleFraction:.4,ringSegments:16,dynamicEffectLight:!1,practicalLightCount:0,environmentSource:"room-neutral",environmentResponse:1,emissiveResponse:.85,attackEchoes:1,attackSparkCount:4,cameraPixelSnap:!0,surfaceDetail:{mode:"none",library:"none",maximumResolution:0,albedo:!1,normal:!1,roughness:!1,normalStrength:0,reflectionCoverage:"none",materialCoverage:"base-materials",reflectionIntensity:{ground:0,structure:0,metal:0,prop:0,wet:0}},atmosphere:{fogNearMultiplier:1,fogFarMultiplier:1,sunIntensityMultiplier:1,skyFillMultiplier:1,rimIntensityMultiplier:1,lightShaftCount:0,dustParticleCount:0,shaftOpacity:0,waterMistCount:0,vegetationWindStrength:0},ambientLife:{birdCapacity:0,insectCapacity:0,leafCapacity:0,bankPlantCount:16,waterEdgePropCount:6},terrain:{geometryRelief:1,normalDetail:0},water:{mode:"simple",reflectionResolution:0,normalResolution:0,flowNormalLayers:0,surfaceOpacity:.78,foamSegmentCount:0,rippleCapacity:0,clearcoat:0,roughness:.3},dynamicLight:{range:0,peakIntensity:0,height:16,attackReceiverFraction:.7,playerAttackLight:"none"}},motion:{cameraFollowSpeedMultiplier:2,playerPresentation:"bounded-extrapolation",maximumPredictionWorldUnits:6.5},performance:{frameRateIntentHz:120,uiRefresh:"simulation-step"}}},tg=Object.freeze(eg);function ag(t){return tg[t]}function rg(t,e){return e?t.resolution.framPresentationMaximumDevicePixelRatio??t.resolution.maximumDevicePixelRatio:t.resolution.maximumDevicePixelRatio}function W8(t){return typeof t=="string"&&$m.some(e=>e===t)}function sg(t,e,a,r){if(!Number.isFinite(t.x)||!Number.isFinite(t.y)||!Number.isFinite(e.x)||!Number.isFinite(e.y))return{x:e.x,y:e.y,predicted:!1};const s=e.x-t.x,i=e.y-t.y,n=Math.hypot(s,i),o=Number.isFinite(r)?Math.max(0,r):0;if(n<=Number.EPSILON||n>o)return{x:e.x,y:e.y,predicted:!1};const A=Math.min(1,Math.max(0,a));return{x:e.x+s*A,y:e.y+i*A,predicted:!0}}const KA="r10-living-water-reclamation-v1",JA=15,ZA=645,ig=1285;function ng(t){return-3.8+((t>>>0>>>9&255)/255-.5)*2.2}function og(){return Object.freeze(Array.from({length:JA},(t,e)=>{const a=e/(JA-1),r=Math.pow(1-a,2);return Object.freeze({progress:a,centerX:44+a*178+Math.sin(a*Math.PI*2.2)*18,z:ZA+(ig-ZA)*a,width:112+r*72+Math.sin(a*Math.PI*3.1)*7,bedDepth:6+Math.sin(a*Math.PI)*2.2})}))}const Ag=Object.freeze([{name:"beauty-cell-wet-asphalt",surface:"asphalt",reflectionRole:"ground",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-stair-retaining-shell",surface:"concrete",reflectionRole:"structure",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-transit-roof",surface:"roof",reflectionRole:"metal",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-far-left-shell",surface:"concrete",reflectionRole:"structure",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-far-right-shell",surface:"concrete",reflectionRole:"structure",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-sidewalks-curbs",surface:"concrete",reflectionRole:"ground",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-worn-road-markings",surface:"asphalt",reflectionRole:"ground",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-road-puddles",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-road-aggregate",surface:"asphalt",reflectionRole:"prop",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-structural-concrete",surface:"concrete",reflectionRole:"structure",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-layered-facades",surface:"concrete",reflectionRole:"structure",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-metal-infrastructure",surface:"roof",reflectionRole:"metal",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-laminated-glass",surface:null,reflectionRole:"wet",materialRole:"glass",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-working-signals",surface:"roof",reflectionRole:"prop",worldScale:1,neutralAlbedoEligible:!1},{name:"beauty-cell-spillway-water",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"r05-c-worn-asphalt-and-crosswalk",surface:"asphalt",reflectionRole:"ground",worldScale:250,neutralAlbedoEligible:!0},{name:"r05-c-wet-road-micro-frequency",surface:"asphalt",reflectionRole:"ground",worldScale:230,neutralAlbedoEligible:!0},{name:"start-town-road-ribbons",surface:"asphalt",reflectionRole:"ground",worldScale:260,neutralAlbedoEligible:!0},{name:"start-town-ground-microdetail",surface:"asphalt",reflectionRole:"ground",worldScale:260,neutralAlbedoEligible:!0},{name:"r04-route-drains-and-worn-markings",surface:"asphalt",reflectionRole:"ground",worldScale:220,neutralAlbedoEligible:!0},{name:"r05-c-concrete-and-lived-in-props",surface:"concrete",reflectionRole:"prop",worldScale:210,neutralAlbedoEligible:!0},{name:"start-town-masonry",surface:"concrete",reflectionRole:"structure",worldScale:185,neutralAlbedoEligible:!0},{name:"start-town-wall-panels",surface:"concrete",reflectionRole:"structure",worldScale:170,neutralAlbedoEligible:!0},{name:"start-town-rubble",surface:"concrete",reflectionRole:"prop",worldScale:150,neutralAlbedoEligible:!0},{name:"r04-low-collider-readable-drains-curbs",surface:"concrete",reflectionRole:"prop",worldScale:180,neutralAlbedoEligible:!0},{name:"r04-layered-fixed-camera-facades",surface:"concrete",reflectionRole:"structure",worldScale:190,neutralAlbedoEligible:!0},{name:"r05-c-transit-and-rooftop-metal",surface:"roof",reflectionRole:"metal",worldScale:180,neutralAlbedoEligible:!0},{name:"start-town-broken-roofs",surface:"roof",reflectionRole:"metal",worldScale:170,neutralAlbedoEligible:!0},{name:"start-town-metal-props",surface:"roof",reflectionRole:"prop",worldScale:145,neutralAlbedoEligible:!0},{name:"r04-rails-awnings-roof-edges",surface:"roof",reflectionRole:"metal",worldScale:165,neutralAlbedoEligible:!0},{name:"start-town-timber-props",surface:"roof",reflectionRole:"prop",materialRole:"organic",worldScale:120,neutralAlbedoEligible:!1},{name:"r05-c-irregular-reflective-patches",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"r05-c-northern-canal-water",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"start-town-warm-glass",surface:null,reflectionRole:"wet",materialRole:"glass",worldScale:1,neutralAlbedoEligible:!1},{name:"start-town-cool-glass-and-water",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"r04-localized-physical-puddles",surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1,neutralAlbedoEligible:!1},{name:"r04-window-bands",surface:null,reflectionRole:"wet",materialRole:"glass",worldScale:1,neutralAlbedoEligible:!1}]),lg=new Map(Ag.map(t=>[t.name,t]));function cg(t){return lg.get(t)??null}const dg=Object.freeze({building:{surface:"concrete",reflectionRole:"structure",materialRole:"concrete",worldScale:180},wall:{surface:"concrete",reflectionRole:"structure",materialRole:"concrete",worldScale:165},rock:{surface:"concrete",reflectionRole:"prop",materialRole:"prop",worldScale:140},pillar:{surface:"concrete",reflectionRole:"structure",materialRole:"concrete",worldScale:135},water:{surface:null,reflectionRole:"wet",materialRole:"water",worldScale:1}});function ug(t){return dg[t]}const hg=Object.freeze({"contract-board":{surface:"roof",reflectionRole:"prop",materialRole:"organic",worldScale:90},lamp:{surface:"roof",reflectionRole:"metal",materialRole:"metal",worldScale:80},signpost:{surface:"roof",reflectionRole:"prop",materialRole:"organic",worldScale:90},"dead-tree":{surface:"roof",reflectionRole:"prop",materialRole:"organic",worldScale:110},relay:{surface:"roof",reflectionRole:"metal",materialRole:"metal",worldScale:90},"anomaly-marker":{surface:"roof",reflectionRole:"metal",materialRole:"metal",worldScale:90}});function fg(t){return hg[t]}const Ws=Object.freeze({mode:"baseline",temporal:{strategy:"profile-msaa-smaa-plus-full-amplitude-ambient-motion",vegetationAmplitudeScale:1,vegetationSpeedScale:1,microVegetationCastShadow:!0},reflection:{strategy:"dual-scrolling-normals-plus-profile-reflection-response",motionScale:1,waterNormalScale:[.32,.24],clearcoatNormalScale:[.18,.14],roughnessFloor:0,clearcoatRoughnessFloor:0},shadow:{strategy:"camera-following-frustum",frustumScale:1,texelSnap:!1},road:{looseAggregate:"retained",looseAggregateCount:320,preservedCausalFeatures:["crosswalk-and-road-markings","repair-seams-and-cracks","irregular-wet-patches","lived-in-analysis-table"]}}),pg=Object.freeze({mode:"repair",temporal:{strategy:"source-damped-motion-plus-profile-msaa-smaa",vegetationAmplitudeScale:.48,vegetationSpeedScale:.58,microVegetationCastShadow:!1},reflection:{strategy:"roughness-floor-plus-low-energy-dual-flow",motionScale:.46,waterNormalScale:[.17,.13],clearcoatNormalScale:[.075,.055],roughnessFloor:.2,clearcoatRoughnessFloor:.2},shadow:{strategy:"guard-banded-texel-snapped-frustum",frustumScale:1.22,texelSnap:!0},road:{looseAggregate:"removed-noncausal",looseAggregateCount:0,preservedCausalFeatures:["crosswalk-and-road-markings","repair-seams-and-cracks","irregular-wet-patches","lived-in-analysis-table"]}});function mg(t,e){if(!e)return Ws;const a=new URLSearchParams(t).get("visualStability");return a==="baseline"||a!==null&&a!=="repair"?Ws:pg}const gg="/game/assets/reclaimed-meadow-v1-CgTL2cqk.webp";function wg(t){const e=new Map,a=new Map,r=t.clone();return ad(t,r,function(s,i){e.set(i,s),a.set(s,i)}),r.traverse(function(s){if(!s.isSkinnedMesh)return;const i=s,n=e.get(s),o=n.skeleton.bones;i.skeleton=n.skeleton.clone(),i.bindMatrix.copy(n.bindMatrix),i.skeleton.bones=o.map(function(A){return a.get(A)}),i.bind(i.skeleton,i.bindMatrix)}),r}function ad(t,e,a){a(t,e);for(let r=0;r<t.children.length;r++)ad(t.children[r],e.children[r],a)}class vg extends Vd{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(a){return new Bg(a)}),this.register(function(a){return new Pg(a)}),this.register(function(a){return new Rg(a)}),this.register(function(a){return new zg(a)}),this.register(function(a){return new Lg(a)}),this.register(function(a){return new Cg(a)}),this.register(function(a){return new Mg(a)}),this.register(function(a){return new Sg(a)}),this.register(function(a){return new Ig(a)}),this.register(function(a){return new Dg(a)}),this.register(function(a){return new Qg(a)}),this.register(function(a){return new Eg(a)}),this.register(function(a){return new Tg(a)}),this.register(function(a){return new kg(a)}),this.register(function(a){return new xg(a)}),this.register(function(a){return new $A(a,V.EXT_MESHOPT_COMPRESSION)}),this.register(function(a){return new $A(a,V.KHR_MESHOPT_COMPRESSION)}),this.register(function(a){return new Fg(a)})}load(e,a,r,s){const i=this;let n;if(this.resourcePath!=="")n=this.resourcePath;else if(this.path!==""){const l=Yr.extractUrlBase(e);n=Yr.resolveURL(l,this.path)}else n=Yr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),i.manager.itemError(e),i.manager.itemEnd(e)},A=new Kl(this.manager);A.setPath(this.path),A.setResponseType("arraybuffer"),A.setRequestHeader(this.requestHeader),A.setWithCredentials(this.withCredentials),A.load(e,function(l){try{i.parse(l,n,function(c){a(c),i.manager.itemEnd(e)},o)}catch(c){o(c)}},r,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,a,r,s){let i;const n={},o={},A=new TextDecoder;if(typeof e=="string")i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(A.decode(new Uint8Array(e,0,4))===rd){try{n[V.KHR_BINARY_GLTF]=new Og(e)}catch(d){s&&s(d);return}i=JSON.parse(n[V.KHR_BINARY_GLTF].content)}else i=JSON.parse(A.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Jg(i,{path:a||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const d=this.pluginCallbacks[c](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,n[d.name]=!0}if(i.extensionsUsed)for(let c=0;c<i.extensionsUsed.length;++c){const d=i.extensionsUsed[c],u=i.extensionsRequired||[];switch(d){case V.KHR_MATERIALS_UNLIT:n[d]=new bg;break;case V.KHR_DRACO_MESH_COMPRESSION:n[d]=new Ug(i,this.dracoLoader);break;case V.KHR_TEXTURE_TRANSFORM:n[d]=new Ng;break;case V.KHR_MESH_QUANTIZATION:n[d]=new Hg;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(n),l.setPlugins(o),l.parse(r,s)}parseAsync(e,a){const r=this;return new Promise(function(s,i){r.parse(e,a,s,i)})}}function yg(){let t={};return{get:function(e){return t[e]},add:function(e,a){t[e]=a},remove:function(e){delete t[e]},removeAll:function(){t={}}}}function Te(t,e,a){const r=t.json.materials[e];return r.extensions&&r.extensions[a]?r.extensions[a]:null}const V={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class xg{constructor(e){this.parser=e,this.name=V.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,a=this.parser.json.nodes||[];for(let r=0,s=a.length;r<s;r++){const i=a[r];i.extensions&&i.extensions[this.name]&&i.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,i.extensions[this.name].light)}}_loadLight(e){const a=this.parser,r="light:"+e;let s=a.cache.get(r);if(s)return s;const i=a.json,A=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e];let l;const c=new Y(16777215);A.color!==void 0&&c.setRGB(A.color[0],A.color[1],A.color[2],Kt);const d=A.range!==void 0?A.range:0;switch(A.type){case"directional":l=new ln(c),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new va(c),l.distance=d;break;case"spot":l=new Kd(c),l.distance=d,A.spot=A.spot||{},A.spot.innerConeAngle=A.spot.innerConeAngle!==void 0?A.spot.innerConeAngle:0,A.spot.outerConeAngle=A.spot.outerConeAngle!==void 0?A.spot.outerConeAngle:Math.PI/4,l.angle=A.spot.outerConeAngle,l.penumbra=1-A.spot.innerConeAngle/A.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+A.type)}return l.position.set(0,0,0),qt(l,A),A.intensity!==void 0&&(l.intensity=A.intensity),l.name=a.createUniqueName(A.name||"light_"+e),s=Promise.resolve(l),a.cache.add(r,s),s}getDependency(e,a){if(e==="light")return this._loadLight(a)}createNodeAttachment(e){const a=this,r=this.parser,i=r.json.nodes[e],o=(i.extensions&&i.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(A){return r._getNodeRef(a.cache,o,A)})}}class bg{constructor(){this.name=V.KHR_MATERIALS_UNLIT}getMaterialType(){return F}extendParams(e,a,r){const s=[];e.color=new Y(1,1,1),e.opacity=1;const i=a.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){const n=i.baseColorFactor;e.color.setRGB(n[0],n[1],n[2],Kt),e.opacity=n[3]}i.baseColorTexture!==void 0&&s.push(r.assignTexture(e,"map",i.baseColorTexture,je))}return Promise.all(s)}}class Dg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);return r===null||r.emissiveStrength!==void 0&&(a.emissiveIntensity=r.emissiveStrength),Promise.resolve()}}class Bg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];if(r.clearcoatFactor!==void 0&&(a.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(a,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(a.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(a,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(a,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const i=r.clearcoatNormalTexture.scale;a.clearcoatNormalScale=new Ve(i,i)}return Promise.all(s)}}class Pg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);return r===null||(a.dispersion=r.dispersion!==void 0?r.dispersion:0),Promise.resolve()}}class Eg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];return r.iridescenceFactor!==void 0&&(a.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(a,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(a.iridescenceIOR=r.iridescenceIor),a.iridescenceThicknessRange===void 0&&(a.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(a.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(a.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(a,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(s)}}class Cg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_SHEEN}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];if(a.sheenColor=new Y(0,0,0),a.sheenRoughness=0,a.sheen=1,r.sheenColorFactor!==void 0){const i=r.sheenColorFactor;a.sheenColor.setRGB(i[0],i[1],i[2],Kt)}return r.sheenRoughnessFactor!==void 0&&(a.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(a,"sheenColorMap",r.sheenColorTexture,je)),r.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(a,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(s)}}class Mg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];return r.transmissionFactor!==void 0&&(a.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(a,"transmissionMap",r.transmissionTexture)),Promise.all(s)}}class Sg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_VOLUME}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];a.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(a,"thicknessMap",r.thicknessTexture)),a.attenuationDistance=r.attenuationDistance||1/0;const i=r.attenuationColor||[1,1,1];return a.attenuationColor=new Y().setRGB(i[0],i[1],i[2],Kt),Promise.all(s)}}class Ig{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_IOR}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);return r===null||(a.ior=r.ior!==void 0?r.ior:1.5,a.ior===0&&(a.ior=1e3)),Promise.resolve()}}class Qg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];a.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&s.push(this.parser.assignTexture(a,"specularIntensityMap",r.specularTexture));const i=r.specularColorFactor||[1,1,1];return a.specularColor=new Y().setRGB(i[0],i[1],i[2],Kt),r.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(a,"specularColorMap",r.specularColorTexture,je)),Promise.all(s)}}class kg{constructor(e){this.parser=e,this.name=V.EXT_MATERIALS_BUMP}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];return a.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&s.push(this.parser.assignTexture(a,"bumpMap",r.bumpTexture)),Promise.all(s)}}class Tg{constructor(e){this.parser=e,this.name=V.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Te(this.parser,e,this.name)!==null?he:null}extendMaterialParams(e,a){const r=Te(this.parser,e,this.name);if(r===null)return Promise.resolve();const s=[];return r.anisotropyStrength!==void 0&&(a.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(a.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(a,"anisotropyMap",r.anisotropyTexture)),Promise.all(s)}}class Rg{constructor(e){this.parser=e,this.name=V.KHR_TEXTURE_BASISU}loadTexture(e){const a=this.parser,r=a.json,s=r.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const i=s.extensions[this.name],n=a.options.ktx2Loader;if(!n){if(r.extensionsRequired&&r.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return a.loadTextureImage(e,i.source,n)}}class zg{constructor(e){this.parser=e,this.name=V.EXT_TEXTURE_WEBP}loadTexture(e){const a=this.name,r=this.parser,s=r.json,i=s.textures[e];if(!i.extensions||!i.extensions[a])return null;const n=i.extensions[a],o=s.images[n.source];let A=r.textureLoader;if(o.uri){const l=r.options.manager.getHandler(o.uri);l!==null&&(A=l)}return r.loadTextureImage(e,n.source,A)}}class Lg{constructor(e){this.parser=e,this.name=V.EXT_TEXTURE_AVIF}loadTexture(e){const a=this.name,r=this.parser,s=r.json,i=s.textures[e];if(!i.extensions||!i.extensions[a])return null;const n=i.extensions[a],o=s.images[n.source];let A=r.textureLoader;if(o.uri){const l=r.options.manager.getHandler(o.uri);l!==null&&(A=l)}return r.loadTextureImage(e,n.source,A)}}class $A{constructor(e,a){this.name=a,this.parser=e}loadBufferView(e){const a=this.parser.json,r=a.bufferViews[e];if(r.extensions&&r.extensions[this.name]){const s=r.extensions[this.name],i=this.parser.getDependency("buffer",s.buffer),n=this.parser.options.meshoptDecoder;if(!n||!n.supported){if(a.extensionsRequired&&a.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return i.then(function(o){const A=s.byteOffset||0,l=s.byteLength||0,c=s.count,d=s.byteStride,u=new Uint8Array(o,A,l);return n.decodeGltfBufferAsync?n.decodeGltfBufferAsync(c,d,u,s.mode,s.filter).then(function(h){return h.buffer}):n.ready.then(function(){const h=new ArrayBuffer(c*d);return n.decodeGltfBuffer(new Uint8Array(h),c,d,u,s.mode,s.filter),h})})}else return null}}class Fg{constructor(e){this.name=V.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const a=this.parser.json,r=a.nodes[e];if(!r.extensions||!r.extensions[this.name]||r.mesh===void 0)return null;const s=a.meshes[r.mesh];for(const l of s.primitives)if(l.mode!==St.TRIANGLES&&l.mode!==St.TRIANGLE_STRIP&&l.mode!==St.TRIANGLE_FAN&&l.mode!==void 0)return null;const n=r.extensions[this.name].attributes,o=[],A={};for(const l in n)o.push(this.parser.getDependency("accessor",n[l]).then(c=>(A[l]=c,A[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const c=l.pop(),d=c.isGroup?c.children:[c],u=l[0].count,h=[];for(const g of d){const p=new fe,m=new S,f=new ot,w=new S(1,1,1),v=new Be(g.geometry,g.material,u);for(let y=0;y<u;y++)A.TRANSLATION&&m.fromBufferAttribute(A.TRANSLATION,y),A.ROTATION&&f.fromBufferAttribute(A.ROTATION,y),A.SCALE&&w.fromBufferAttribute(A.SCALE,y),v.setMatrixAt(y,p.compose(m,f,w));for(const y in A)if(y==="_COLOR_0"){const P=A[y];v.instanceColor=new Jd(P.array,P.itemSize,P.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,A[y]);ia.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),h.push(v)}return c.isGroup?(c.clear(),c.add(...h),c):h[0]}))}}const rd="glTF",Or=12,el={JSON:1313821514,BIN:5130562};class Og{constructor(e){this.name=V.KHR_BINARY_GLTF,this.content=null,this.body=null;const a=new DataView(e,0,Or),r=new TextDecoder;if(this.header={magic:r.decode(new Uint8Array(e.slice(0,4))),version:a.getUint32(4,!0),length:a.getUint32(8,!0)},this.header.magic!==rd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Or,i=new DataView(e,Or);let n=0;for(;n<s;){const o=i.getUint32(n,!0);n+=4;const A=i.getUint32(n,!0);if(n+=4,A===el.JSON){const l=new Uint8Array(e,Or+n,o);this.content=r.decode(l)}else if(A===el.BIN){const l=Or+n;this.body=e.slice(l,l+o)}n+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ug{constructor(e,a){if(!a)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=V.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=a,this.dracoLoader.preload()}decodePrimitive(e,a){const r=this.json,s=this.dracoLoader,i=e.extensions[this.name].bufferView,n=e.extensions[this.name].attributes,o={},A={},l={};for(const c in n){const d=vn[c]||c.toLowerCase();o[d]=n[c]}for(const c in e.attributes){const d=vn[c]||c.toLowerCase();if(n[c]!==void 0){const u=r.accessors[e.attributes[c]],h=xr[u.componentType];l[d]=h.name,A[d]=u.normalized===!0}}return a.getDependency("bufferView",i).then(function(c){return new Promise(function(d,u){s.decodeDracoFile(c,function(h){for(const g in h.attributes){const p=h.attributes[g],m=A[g];m!==void 0&&(p.normalized=m)}d(h)},o,l,Kt,u)})})}}class Ng{constructor(){this.name=V.KHR_TEXTURE_TRANSFORM}extendTexture(e,a){return(a.texCoord===void 0||a.texCoord===e.channel)&&a.offset===void 0&&a.rotation===void 0&&a.scale===void 0||(e=e.clone(),a.texCoord!==void 0&&(e.channel=a.texCoord),a.offset!==void 0&&e.offset.fromArray(a.offset),a.rotation!==void 0&&(e.rotation=a.rotation),a.scale!==void 0&&e.repeat.fromArray(a.scale),e.needsUpdate=!0),e}}class Hg{constructor(){this.name=V.KHR_MESH_QUANTIZATION}}class sd extends fu{constructor(e,a,r,s){super(e,a,r,s)}copySampleValue_(e){const a=this.resultBuffer,r=this.sampleValues,s=this.valueSize,i=e*s*3+s;for(let n=0;n!==s;n++)a[n]=r[i+n];return a}interpolate_(e,a,r,s){const i=this.resultBuffer,n=this.sampleValues,o=this.valueSize,A=o*2,l=o*3,c=s-a,d=(r-a)/c,u=d*d,h=u*d,g=e*l,p=g-l,m=-2*h+3*u,f=h-u,w=1-m,v=f-u+d;for(let y=0;y!==o;y++){const P=n[p+y+o],b=n[p+y+A]*c,x=n[g+y+o],B=n[g+y]*c;i[y]=w*P+v*b+m*x+f*B}return i}}const _g=new ot;class Gg extends sd{interpolate_(e,a,r,s){const i=super.interpolate_(e,a,r,s);return _g.fromArray(i).normalize().toArray(i),i}}const St={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},xr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tl={9728:Br,9729:at,9984:au,9985:tu,9986:eu,9987:xa},al={33071:cn,33648:ru,10497:We},Ui={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},vn={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},pa={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Xg={CUBICSPLINE:void 0,LINEAR:Zl,STEP:uu},Ni={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function qg(t){return t.DefaultMaterial===void 0&&(t.DefaultMaterial=new L({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Rn})),t.DefaultMaterial}function za(t,e,a){for(const r in a.extensions)t[r]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[r]=a.extensions[r])}function qt(t,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(t.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Yg(t,e,a){let r=!1,s=!1,i=!1;for(let l=0,c=e.length;l<c;l++){const d=e[l];if(d.POSITION!==void 0&&(r=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(i=!0),r&&s&&i)break}if(!r&&!s&&!i)return Promise.resolve(t);const n=[],o=[],A=[];for(let l=0,c=e.length;l<c;l++){const d=e[l];if(r){const u=d.POSITION!==void 0?a.getDependency("accessor",d.POSITION):t.attributes.position;n.push(u)}if(s){const u=d.NORMAL!==void 0?a.getDependency("accessor",d.NORMAL):t.attributes.normal;o.push(u)}if(i){const u=d.COLOR_0!==void 0?a.getDependency("accessor",d.COLOR_0):t.attributes.color;A.push(u)}}return Promise.all([Promise.all(n),Promise.all(o),Promise.all(A)]).then(function(l){const c=l[0],d=l[1],u=l[2];return r&&(t.morphAttributes.position=c),s&&(t.morphAttributes.normal=d),i&&(t.morphAttributes.color=u),t.morphTargetsRelative=!0,t})}function jg(t,e){if(t.updateMorphTargets(),e.weights!==void 0)for(let a=0,r=e.weights.length;a<r;a++)t.morphTargetInfluences[a]=e.weights[a];if(e.extras&&Array.isArray(e.extras.targetNames)){const a=e.extras.targetNames;if(t.morphTargetInfluences.length===a.length){t.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++)t.morphTargetDictionary[a[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Wg(t){let e;const a=t.extensions&&t.extensions[V.KHR_DRACO_MESH_COMPRESSION];if(a?e="draco:"+a.bufferView+":"+a.indices+":"+Hi(a.attributes):e=t.indices+":"+Hi(t.attributes)+":"+t.mode,t.targets!==void 0)for(let r=0,s=t.targets.length;r<s;r++)e+=":"+Hi(t.targets[r]);return e}function Hi(t){let e="";const a=Object.keys(t).sort();for(let r=0,s=a.length;r<s;r++)e+=a[r]+":"+t[a[r]]+";";return e}function yn(t){switch(t){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Vg(t){return t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?"image/jpeg":t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?"image/webp":t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Kg=new fe;class Jg{constructor(e={},a={}){this.json=e,this.extensions={},this.plugins={},this.options=a,this.cache=new yg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let r=!1,s=-1,i=!1,n=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;r=/^((?!chrome|android).)*safari/i.test(o)===!0;const A=o.match(/Version\/(\d+)/);s=r&&A?parseInt(A[1],10):-1,i=o.indexOf("Firefox")>-1,n=i?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||r&&s<17||i&&n<98?this.textureLoader=new Fn(this.options.manager):this.textureLoader=new Zd(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Kl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,a){const r=this,s=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(n){return n._markDefs&&n._markDefs()}),Promise.all(this._invokeAll(function(n){return n.beforeRoot&&n.beforeRoot()})).then(function(){return Promise.all([r.getDependencies("scene"),r.getDependencies("animation"),r.getDependencies("camera")])}).then(function(n){const o={scene:n[0][s.scene||0],scenes:n[0],animations:n[1],cameras:n[2],asset:s.asset,parser:r,userData:{}};return za(i,o,s),qt(o,s),Promise.all(r._invokeAll(function(A){return A.afterRoot&&A.afterRoot(o)})).then(function(){for(const A of o.scenes)A.updateMatrixWorld();e(o)})}).catch(a)}_markDefs(){const e=this.json.nodes||[],a=this.json.skins||[],r=this.json.meshes||[];for(let s=0,i=a.length;s<i;s++){const n=a[s].joints;for(let o=0,A=n.length;o<A;o++)e[n[o]].isBone=!0}for(let s=0,i=e.length;s<i;s++){const n=e[s];n.mesh!==void 0&&(this._addNodeRef(this.meshCache,n.mesh),n.skin!==void 0&&(r[n.mesh].isSkinnedMesh=!0)),n.camera!==void 0&&this._addNodeRef(this.cameraCache,n.camera)}}_addNodeRef(e,a){a!==void 0&&(e.refs[a]===void 0&&(e.refs[a]=e.uses[a]=0),e.refs[a]++)}_getNodeRef(e,a,r){if(e.refs[a]<=1)return r;const s=r.clone(),i=(n,o)=>{const A=this.associations.get(n);A!=null&&this.associations.set(o,A);for(const[l,c]of n.children.entries())i(c,o.children[l])};return i(r,s),s.name+="_instance_"+e.uses[a]++,s}_invokeOne(e){const a=Object.values(this.plugins);a.push(this);for(let r=0;r<a.length;r++){const s=e(a[r]);if(s)return s}return null}_invokeAll(e){const a=Object.values(this.plugins);a.unshift(this);const r=[];for(let s=0;s<a.length;s++){const i=e(a[s]);i&&r.push(i)}return r}getDependency(e,a){const r=e+":"+a;let s=this.cache.get(r);if(!s){switch(e){case"scene":s=this.loadScene(a);break;case"node":s=this._invokeOne(function(i){return i.loadNode&&i.loadNode(a)});break;case"mesh":s=this._invokeOne(function(i){return i.loadMesh&&i.loadMesh(a)});break;case"accessor":s=this.loadAccessor(a);break;case"bufferView":s=this._invokeOne(function(i){return i.loadBufferView&&i.loadBufferView(a)});break;case"buffer":s=this.loadBuffer(a);break;case"material":s=this._invokeOne(function(i){return i.loadMaterial&&i.loadMaterial(a)});break;case"texture":s=this._invokeOne(function(i){return i.loadTexture&&i.loadTexture(a)});break;case"skin":s=this.loadSkin(a);break;case"animation":s=this._invokeOne(function(i){return i.loadAnimation&&i.loadAnimation(a)});break;case"camera":s=this.loadCamera(a);break;default:if(s=this._invokeOne(function(i){return i!=this&&i.getDependency&&i.getDependency(e,a)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(r,s)}return s}getDependencies(e){let a=this.cache.get(e);if(!a){const r=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];a=Promise.all(s.map(function(i,n){return r.getDependency(e,n)})),this.cache.add(e,a)}return a}loadBuffer(e){const a=this.json.buffers[e],r=this.fileLoader;if(a.type&&a.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+a.type+" buffer type is not supported.");if(a.uri===void 0&&e===0)return Promise.resolve(this.extensions[V.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(i,n){r.load(Yr.resolveURL(a.uri,s.path),i,void 0,function(){n(new Error('THREE.GLTFLoader: Failed to load buffer "'+a.uri+'".'))})})}loadBufferView(e){const a=this.json.bufferViews[e];return this.getDependency("buffer",a.buffer).then(function(r){const s=a.byteLength||0,i=a.byteOffset||0;return r.slice(i,i+s)})}loadAccessor(e){const a=this,r=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const n=Ui[s.type],o=xr[s.componentType],A=s.normalized===!0,l=new o(s.count*n);return Promise.resolve(new He(l,n,A))}const i=[];return s.bufferView!==void 0?i.push(this.getDependency("bufferView",s.bufferView)):i.push(null),s.sparse!==void 0&&(i.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),i.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(i).then(function(n){const o=n[0],A=Ui[s.type],l=xr[s.componentType],c=l.BYTES_PER_ELEMENT,d=c*A,u=s.byteOffset||0,h=s.bufferView!==void 0?r.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let p,m;if(h&&h!==d){const f=Math.floor(u/h),w="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let v=a.cache.get(w);v||(p=new l(o,f*h,s.count*h/c),v=new $d(p,h/c),a.cache.add(w,v)),m=new hu(v,A,u%h/c,g)}else o===null?p=new l(s.count*A):p=new l(o,u,s.count*A),m=new He(p,A,g);if(s.sparse!==void 0){const f=Ui.SCALAR,w=xr[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,P=new w(n[1],v,s.sparse.count*f),b=new l(n[2],y,s.sparse.count*A);o!==null&&(m=new He(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let x=0,B=P.length;x<B;x++){const E=P[x];if(m.setX(E,b[x*A]),A>=2&&m.setY(E,b[x*A+1]),A>=3&&m.setZ(E,b[x*A+2]),A>=4&&m.setW(E,b[x*A+3]),A>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const a=this.json,r=this.options,i=a.textures[e].source,n=a.images[i];let o=this.textureLoader;if(n.uri){const A=r.manager.getHandler(n.uri);A!==null&&(o=A)}return this.loadTextureImage(e,i,o)}loadTextureImage(e,a,r){const s=this,i=this.json,n=i.textures[e],o=i.images[a],A=(o.uri||o.bufferView)+":"+n.sampler;if(this.textureCache[A])return this.textureCache[A];const l=this.loadImageSource(a,r).then(function(c){c.flipY=!1,c.name=n.name||o.name||"",c.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(c.name=o.uri);const u=(i.samplers||{})[n.sampler]||{};return c.magFilter=tl[u.magFilter]||at,c.minFilter=tl[u.minFilter]||xa,c.wrapS=al[u.wrapS]||We,c.wrapT=al[u.wrapT]||We,c.generateMipmaps=!c.isCompressedTexture&&c.minFilter!==Br&&c.minFilter!==at,s.associations.set(c,{textures:e}),c}).catch(function(){return null});return this.textureCache[A]=l,l}loadImageSource(e,a){const r=this,s=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const n=s.images[e],o=self.URL||self.webkitURL;let A=n.uri||"",l=!1;if(n.bufferView!==void 0)A=r.getDependency("bufferView",n.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:n.mimeType});return A=o.createObjectURL(u),A});else if(n.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const c=Promise.resolve(A).then(function(d){return new Promise(function(u,h){let g=u;a.isImageBitmapLoader===!0&&(g=function(p){const m=new Vr(p);m.needsUpdate=!0,u(m)}),a.load(Yr.resolveURL(d,i.path),g,void 0,h)})}).then(function(d){return l===!0&&o.revokeObjectURL(A),qt(d,n),d.userData.mimeType=n.mimeType||Vg(n.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",A),d});return this.sourceCache[e]=c,c}assignTexture(e,a,r,s){const i=this;return this.getDependency("texture",r.index).then(function(n){if(!n)return null;if(r.texCoord!==void 0&&r.texCoord>0&&(n=n.clone(),n.channel=r.texCoord),i.extensions[V.KHR_TEXTURE_TRANSFORM]){const o=r.extensions!==void 0?r.extensions[V.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const A=i.associations.get(n);n=i.extensions[V.KHR_TEXTURE_TRANSFORM].extendTexture(n,o),i.associations.set(n,A)}}return s!==void 0&&(n.colorSpace=s),e[a]=n,n})}assignFinalMaterial(e){const a=e.geometry;let r=e.material;const s=a.attributes.tangent===void 0,i=a.attributes.color!==void 0,n=a.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+r.uuid;let A=this.cache.get(o);A||(A=new Gs,xi.prototype.copy.call(A,r),A.color.copy(r.color),A.map=r.map,A.sizeAttenuation=!1,this.cache.add(o,A)),r=A}else if(e.isLine){const o="LineBasicMaterial:"+r.uuid;let A=this.cache.get(o);A||(A=new dn,xi.prototype.copy.call(A,r),A.color.copy(r.color),A.map=r.map,this.cache.add(o,A)),r=A}if(s||i||n){let o="ClonedMaterial:"+r.uuid+":";s&&(o+="derivative-tangents:"),i&&(o+="vertex-colors:"),n&&(o+="flat-shading:");let A=this.cache.get(o);A||(A=r.clone(),i&&(A.vertexColors=!0),n&&(A.flatShading=!0),s&&(A.normalScale&&(A.normalScale.y*=-1),A.clearcoatNormalScale&&(A.clearcoatNormalScale.y*=-1)),this.cache.add(o,A),this.associations.set(A,this.associations.get(r))),r=A}e.material=r}getMaterialType(){return L}loadMaterial(e){const a=this,r=this.json,s=this.extensions,i=r.materials[e];let n;const o={},A=i.extensions||{},l=[];if(A[V.KHR_MATERIALS_UNLIT]){const d=s[V.KHR_MATERIALS_UNLIT];n=d.getMaterialType(),l.push(d.extendParams(o,i,a))}else{const d=i.pbrMetallicRoughness||{};if(o.color=new Y(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Kt),o.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(a.assignTexture(o,"map",d.baseColorTexture,je)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(a.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(a.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),n=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=Se);const c=i.alphaMode||Ni.OPAQUE;if(c===Ni.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,c===Ni.MASK&&(o.alphaTest=i.alphaCutoff!==void 0?i.alphaCutoff:.5)),i.normalTexture!==void 0&&n!==F&&(l.push(a.assignTexture(o,"normalMap",i.normalTexture)),o.normalScale=new Ve(1,1),i.normalTexture.scale!==void 0)){const d=i.normalTexture.scale;o.normalScale.set(d,d)}if(i.occlusionTexture!==void 0&&n!==F&&(l.push(a.assignTexture(o,"aoMap",i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&n!==F){const d=i.emissiveFactor;o.emissive=new Y().setRGB(d[0],d[1],d[2],Kt)}return i.emissiveTexture!==void 0&&n!==F&&l.push(a.assignTexture(o,"emissiveMap",i.emissiveTexture,je)),Promise.all(l).then(function(){const d=new n(o);return i.name&&(d.name=i.name),qt(d,i),a.associations.set(d,{materials:e}),i.extensions&&za(s,d,i),d})}createUniqueName(e){const a=su.sanitizeNodeName(e||"");return a in this.nodeNamesUsed?a+"_"+ ++this.nodeNamesUsed[a]:(this.nodeNamesUsed[a]=0,a)}loadGeometries(e){const a=this,r=this.extensions,s=this.primitiveCache;function i(o){return r[V.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,a).then(function(A){return rl(A,o,a)})}const n=[];for(let o=0,A=e.length;o<A;o++){const l=e[o],c=Wg(l),d=s[c];if(d)n.push(d.promise);else{let u;l.extensions&&l.extensions[V.KHR_DRACO_MESH_COMPRESSION]?u=i(l):u=rl(new $e,l,a),s[c]={primitive:l,promise:u},n.push(u)}}return Promise.all(n)}loadMesh(e){const a=this,r=this.json,s=this.extensions,i=r.meshes[e],n=i.primitives,o=[];for(let A=0,l=n.length;A<l;A++){const c=n[A].material===void 0?qg(this.cache):this.getDependency("material",n[A].material);o.push(c)}return o.push(a.loadGeometries(n)),Promise.all(o).then(function(A){const l=A.slice(0,A.length-1),c=A[A.length-1],d=[];for(let h=0,g=c.length;h<g;h++){const p=c[h],m=n[h];let f;const w=l[h];if(m.mode===St.TRIANGLES||m.mode===St.TRIANGLE_STRIP||m.mode===St.TRIANGLE_FAN||m.mode===void 0)f=i.isSkinnedMesh===!0?new iu(p,w):new I(p,w),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===St.TRIANGLE_STRIP?f.geometry=IA(f.geometry,jl):m.mode===St.TRIANGLE_FAN&&(f.geometry=IA(f.geometry,An));else if(m.mode===St.LINES)f=new Xs(p,w);else if(m.mode===St.LINE_STRIP)f=new nu(p,w);else if(m.mode===St.LINE_LOOP)f=new ou(p,w);else if(m.mode===St.POINTS)f=new Hr(p,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&jg(f,i),f.name=a.createUniqueName(i.name||"mesh_"+e),qt(f,i),m.extensions&&za(s,f,m),a.assignFinalMaterial(f),d.push(f)}for(let h=0,g=d.length;h<g;h++)a.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return i.extensions&&za(s,d[0],i),d[0];const u=new R;i.extensions&&za(s,u,i),a.associations.set(u,{meshes:e});for(let h=0,g=d.length;h<g;h++)u.add(d[h]);return u})}loadCamera(e){let a;const r=this.json.cameras[e],s=r[r.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return r.type==="perspective"?a=new Au(C.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):r.type==="orthographic"&&(a=new Jl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),r.name&&(a.name=this.createUniqueName(r.name)),qt(a,r),Promise.resolve(a)}loadSkin(e){const a=this.json.skins[e],r=[];for(let s=0,i=a.joints.length;s<i;s++)r.push(this._loadNodeShallow(a.joints[s]));return a.inverseBindMatrices!==void 0?r.push(this.getDependency("accessor",a.inverseBindMatrices)):r.push(null),Promise.all(r).then(function(s){const i=s.pop(),n=s,o=[],A=[];for(let l=0,c=n.length;l<c;l++){const d=n[l];if(d){o.push(d);const u=new fe;i!==null&&u.fromArray(i.array,l*16),A.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',a.joints[l])}return new lu(o,A)})}loadAnimation(e){const a=this.json,r=this,s=a.animations[e],i=s.name?s.name:"animation_"+e,n=[],o=[],A=[],l=[],c=[];for(let d=0,u=s.channels.length;d<u;d++){const h=s.channels[d],g=s.samplers[h.sampler],p=h.target,m=p.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,w=s.parameters!==void 0?s.parameters[g.output]:g.output;p.node!==void 0&&(n.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),A.push(this.getDependency("accessor",w)),l.push(g),c.push(p))}return Promise.all([Promise.all(n),Promise.all(o),Promise.all(A),Promise.all(l),Promise.all(c)]).then(function(d){const u=d[0],h=d[1],g=d[2],p=d[3],m=d[4],f=[];for(let v=0,y=u.length;v<y;v++){const P=u[v],b=h[v],x=g[v],B=p[v],E=m[v];if(P===void 0)continue;P.updateMatrix&&P.updateMatrix();const M=r._createAnimationTracks(P,b,x,B,E);if(M)for(let T=0;T<M.length;T++)f.push(M[T])}const w=new cu(i,void 0,f);return qt(w,s),w})}createNodeMesh(e){const a=this.json,r=this,s=a.nodes[e];return s.mesh===void 0?null:r.getDependency("mesh",s.mesh).then(function(i){const n=r._getNodeRef(r.meshCache,s.mesh,i);return s.weights!==void 0&&n.traverse(function(o){if(o.isMesh)for(let A=0,l=s.weights.length;A<l;A++)o.morphTargetInfluences[A]=s.weights[A]}),n})}loadNode(e){const a=this.json,r=this,s=a.nodes[e],i=r._loadNodeShallow(e),n=[],o=s.children||[];for(let l=0,c=o.length;l<c;l++)n.push(r.getDependency("node",o[l]));const A=s.skin===void 0?Promise.resolve(null):r.getDependency("skin",s.skin);return Promise.all([i,Promise.all(n),A]).then(function(l){const c=l[0],d=l[1],u=l[2];u!==null&&c.traverse(function(h){h.isSkinnedMesh&&h.bind(u,Kg)});for(let h=0,g=d.length;h<g;h++)c.add(d[h]);if(c.userData.pivot!==void 0&&d.length>0){const h=c.userData.pivot,g=d[0];c.pivot=new S().fromArray(h),c.position.x-=h[0],c.position.y-=h[1],c.position.z-=h[2],g.position.set(0,0,0),delete c.userData.pivot}return c})}_loadNodeShallow(e){const a=this.json,r=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const i=a.nodes[e],n=i.name?s.createUniqueName(i.name):"",o=[],A=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return A&&o.push(A),i.camera!==void 0&&o.push(s.getDependency("camera",i.camera).then(function(l){return s._getNodeRef(s.cameraCache,i.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let c;if(i.isBone===!0?c=new du:l.length>1?c=new R:l.length===1?c=l[0]:c=new ia,c!==l[0])for(let d=0,u=l.length;d<u;d++)c.add(l[d]);if(i.name&&(c.userData.name=i.name,c.name=n),qt(c,i),i.extensions&&za(r,c,i),i.matrix!==void 0){const d=new fe;d.fromArray(i.matrix),c.applyMatrix4(d)}else i.translation!==void 0&&c.position.fromArray(i.translation),i.rotation!==void 0&&c.quaternion.fromArray(i.rotation),i.scale!==void 0&&c.scale.fromArray(i.scale);if(!s.associations.has(c))s.associations.set(c,{});else if(i.mesh!==void 0&&s.meshCache.refs[i.mesh]>1){const d=s.associations.get(c);s.associations.set(c,{...d})}return s.associations.get(c).nodes=e,c}),this.nodeCache[e]}loadScene(e){const a=this.extensions,r=this.json.scenes[e],s=this,i=new R;r.name&&(i.name=s.createUniqueName(r.name)),qt(i,r),r.extensions&&za(a,i,r);const n=r.nodes||[],o=[];for(let A=0,l=n.length;A<l;A++)o.push(s.getDependency("node",n[A]));return Promise.all(o).then(function(A){for(let c=0,d=A.length;c<d;c++){const u=A[c];u.parent!==null?i.add(wg(u)):i.add(u)}const l=c=>{const d=new Map;for(const[u,h]of s.associations)(u instanceof xi||u instanceof Vr)&&d.set(u,h);return c.traverse(u=>{const h=s.associations.get(u);h!=null&&d.set(u,h)}),d};return s.associations=l(i),i})}_createAnimationTracks(e,a,r,s,i){const n=[],o=e.name?e.name:e.uuid,A=[];function l(h){h.morphTargetInfluences&&A.push(h.name?h.name:h.uuid)}pa[i.path]===pa.weights?(l(e),e.isGroup&&e.children.forEach(l)):A.push(o);let c;switch(pa[i.path]){case pa.weights:c=Co;break;case pa.rotation:c=Mo;break;case pa.translation:case pa.scale:c=Eo;break;default:r.itemSize===1?c=Co:c=Eo;break}const d=s.interpolation!==void 0?Xg[s.interpolation]:Zl,u=this._getArrayFromAccessor(r);for(let h=0,g=A.length;h<g;h++){const p=new c(A[h]+"."+pa[i.path],a.array,u,d);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),n.push(p)}return n}_getArrayFromAccessor(e){let a=e.array;if(e.normalized){const r=yn(a.constructor),s=new Float32Array(a.length);for(let i=0,n=a.length;i<n;i++)s[i]=a[i]*r;a=s}return a}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(r){const s=this instanceof Mo?Gg:sd;return new s(this.times,this.values,this.getValueSize()/3,r)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Zg(t,e,a){const r=e.attributes,s=new pu;if(r.POSITION!==void 0){const o=a.json.accessors[r.POSITION],A=o.min,l=o.max;if(A!==void 0&&l!==void 0){if(s.set(new S(A[0],A[1],A[2]),new S(l[0],l[1],l[2])),o.normalized){const c=yn(xr[o.componentType]);s.min.multiplyScalar(c),s.max.multiplyScalar(c)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const i=e.targets;if(i!==void 0){const o=new S,A=new S;for(let l=0,c=i.length;l<c;l++){const d=i[l];if(d.POSITION!==void 0){const u=a.json.accessors[d.POSITION],h=u.min,g=u.max;if(h!==void 0&&g!==void 0){if(A.setX(Math.max(Math.abs(h[0]),Math.abs(g[0]))),A.setY(Math.max(Math.abs(h[1]),Math.abs(g[1]))),A.setZ(Math.max(Math.abs(h[2]),Math.abs(g[2]))),u.normalized){const p=yn(xr[u.componentType]);A.multiplyScalar(p)}o.max(A)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}t.boundingBox=s;const n=new mu;s.getCenter(n.center),n.radius=s.min.distanceTo(s.max)/2,t.boundingSphere=n}function rl(t,e,a){const r=e.attributes,s=[];function i(n,o){return a.getDependency("accessor",n).then(function(A){t.setAttribute(o,A)})}for(const n in r){const o=vn[n]||n.toLowerCase();o in t.attributes||s.push(i(r[n],o))}if(e.indices!==void 0&&!t.index){const n=a.getDependency("accessor",e.indices).then(function(o){t.setIndex(o)});s.push(n)}return $s.workingColorSpace!==Kt&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$s.workingColorSpace}" not supported.`),qt(t,e),Zg(t,e,a),Promise.all(s).then(function(){return e.targets!==void 0?Yg(t,e.targets,a):t})}const $g=1,e1="world-asset-forge-b1-landmark-sidecar-manifest",t1={phase:"world-asset-forge-phase-b1",variant:"landmark",candidateId:"world-asset-forge-b1-landmark-living-canopy-station",sourceId:"fram.world-forge.r11.west-civic.transit-office.landmark.v1",districtId:"west-civic",outputSetId:"fram.world-forge.r11.west-civic.default.v1",seed:131,variationSeed:1131,structuralIds:["west-transit-office"],visualOutputIds:["vis.west-transit-office"],collisionOutputIds:["col.west-transit-office"],occluderOutputIds:["occ.west-transit-office"],bounds:{x:290,z:455,width:345,depth:250,height:226,baseY:5.8}},a1={id:"C",name:"Living Canopy Station",commit:"10e1192963f4c36252c340dfa36fb16028f00603",manifestSha256:"406af0bc796f345312226a52c3032aa46092ab68dc7abf95262149850b2c793b",sha256:"97f25f9a267eb5f51b46af829a52516053ca715ceaeb1615c76a44f41359f786",runtimeAsset:!1,geometrySource:!1,translatedHierarchy:["roof-breaking tree and major roots","eight-storey breached transit and rainwater-control station","flooded cistern and bounded repair accents"]},r1={activationCommit:"35417016a3f3755118a8d566b69af8c35f34f74f",sourceCriteriaSha256:"d40334e9c853891dd9a323c60d79493b0c25e9f590707c76aae80de88390b289",goalBriefSha256:"f53d17628f1b4a0b47f1d5b0e8248aee18cc8d7df3a206215b500e059026b2e4",proposalProjectionSha256:"c009667088bd5be5d163ec0dea6e7d5f8da98ce3249bd32506b9a8fd8943e7a2",contractProjectionSha256:"3e89816b49cffe19c2c657c117b6d28fea4f0773ad5ac96bd989131d8efaa3ff",conceptCommit:"10e1192963f4c36252c340dfa36fb16028f00603",conceptManifestSha256:"406af0bc796f345312226a52c3032aa46092ab68dc7abf95262149850b2c793b",conceptImageSha256:"97f25f9a267eb5f51b46af829a52516053ca715ceaeb1615c76a44f41359f786",packageSha256:"81ae2c52d604afe914995a227b5e502b3f783f648cf909fa4d8e070f8ed0b441",lockfileSha256:"590f717f818692cee4ed6a09eb769f9904b1e096c13f6a1f01a0bfe6aadc2d4d"},s1={activationCommit:"f6be9306e8caddb5231e33b97e6d54afa695a1d9",methodBaselineCommit:"54ce7282334ec19e6aa3e96583982afb565fdfcf",checkpointCommit:"7e0675a786e64af9f81d1d0b943c6b5bd1666572",sourceCriteriaSha256:"c20ce007f0e0f928bf89c1bc5ef2efb87da83fad5e4d1891519f2495d0131e1e",goalBriefSha256:"676f8128169d0a1b50dd634001799db5ad62351b74a84630bace616b306273d9",contractProjectionSha256:"48ae71ce11a310f318ce429bcda0b1ef07ff866009c48a1e2259aed294ada221"},i1={commit:"7e0675a786e64af9f81d1d0b943c6b5bd1666572",manifestSha256:"d1774f8790dcc9f921195ad8a52631a1a11da6157e5c4488cfdaffa2fb7c419f",primaryVisualSha256:"84ed054931ce15ca02dd1e454ab59de425203eec84af9b38a07964bc63d3b55d",variationVisualSha256:"944c4797be708bcda56d84b2ecc5d56628ce7474289276edcf9a7fd824ce4c15",reportSha256:"4377ec38667f4c0aaae23eb614038ff1677bb0ceebc0ca4dd8869d33c91d1852",handoffSha256:"164e3270b9c2db6cf9a464e878d12ec2ebd149c5b10bf00a83a377a173808fb6"},n1={registrationCommit:"346a32358f7225d0a85d221d86f008376002c5ad",preCorrectionCheckpoint:"30624115e9f21516727c3306f18a52793ad99cf7",sourceCriteriaSha256:"08070499ecb0f8035d51eb5e0eaa9f154b4c886e18a56ffc61497933d0e3f5dc",goalBriefSha256:"263eb46bde5918d182c829874517fcad3293f9bf7e7f63a2b286d762ad65af8f",contractProjectionSha256:"6e44c28d186e4176961095c6d75347bf01f03e809dd3c54a33e40d4391feb144",exactlyOneAdditionalActualViewCorrection:!0},o1={commit:"30624115e9f21516727c3306f18a52793ad99cf7",manifestSha256:"2098e18058986506449fba9e1b0e2df629c7124ec8949f437f38c963a9536f06",primaryVisualSha256:"eda9829b0e51a379a59a4c28f7260b5ac8bbb81fa7ed30f3093c0c8236d684e0",variationVisualSha256:"90c863065d60d2e0837b6ff29a53ed6ab1f9c7c7a9566c818139ed222c283751",reportSha256:"cb90e21b5538540875e193cdb4459689cb0b618768b3818f2b9dee5fa37462d3",handoffSha256:"67e51d83ad75feb12f52c5a9332bfe1f76ee7bdbfdc220265566e22b9e8f6e9c",comparisonManifestSha256:"d9bab7a6e33d71b59797ee9aba934fee670d84ad55c875d1a9a4f223b951bcbe"},A1={commit:"54ce7282334ec19e6aa3e96583982afb565fdfcf",sourceSha256:"05477f6e8b51a3b7db0c5868fb0a51ec6f40fc726732cf0666953935e9ff1bc6",compilerSha256:"e87b22620f6466758bebeb28f37dd52f82d964a2391f2e053b48ee37dedbf886",builderSha256:"2c100be1d9dfc323d0148109fddc2e3127b545dfa06e303808b783cba52bff32",blendSha256:"0ee2ed9dc6bbf3821dd9f97959bd779ea4375194988f1481acb4dc321c68cad1",manifestSha256:"876d53acf79960e10dfc5ff9e16f2e63d69c4a81e324fbf6f69d6905b2b52a5c",primaryVisualSha256:"2ec1f6e917849aa3e719b33f2742271243ae3ae2ff582f93c8196aac92de7172",variationVisualSha256:"39b151d860e1e4af4a017a79361d4e79067ae1d78a201dc36a9c95c7a7608722",reportSha256:"1e815fc8456c15db6474913a820355a0486e3d09e91779442cc8b413efc464b0",handoffSha256:"60b45726b6a50c92ebfa7a1f91cd067e78188b2bc4994a1b5b68ee65fa6259b3"},l1={commit:"c87b054af029b26c9cf4b3dd486a7a20581e9adf",manifestSha256:"554113e97bf0895451c19c4231b7c009a856a9163721bc96f833b40f75f482ab",visualSha256:"0e1f61936b0362ea203276ab2950348eeb4e1e0ccaccdbe45526184126559519",collisionSha256:"cfcda8672714a077cfc29c4ea8b8cf4b6bae1349950ae75f855c4179871d59c6",occluderSha256:"c888dc45ade4fcd399bfa3de690d88b489d22f39cceba3763957a52e1b668563"},c1={requiredGroups:["bay-frame","facade-infill","causal-breach","curved-service-run","runoff-growth"],groupIds:{"bay-frame":"FRAM_GN_Landmark_BayFrame_v2","facade-infill":"FRAM_GN_Landmark_FacadeInfill_v2","causal-breach":"FRAM_GN_Landmark_CausalBreach_v2","curved-service-run":"FRAM_GN_Landmark_CurvedServiceRun_v2","runoff-growth":"FRAM_GN_Landmark_RunoffGrowth_v2"},inventorySha256:"92343870775257ffd3cf023c840661daacd4c2e72e1ee6fdf324207ce7000407",evaluatedForRuntime:!0,editableGrammarRetainedInBlend:!0,primaryArchitectureOwned:!0,directAudit:"normalized Blender node/link inventory and graph reachability"},d1={source:{path:"tools/world-asset-forge/b1/landmark/r11-west-transit-office.landmark.source.v1.json",sha256:"6683223455eda7c0c1414ec8460dbc81459cadb540c389eb419a4b385b3c8ffc"},compiler:{path:"tools/world-asset-forge/b1/landmark/compile-landmark.py",sha256:"b3ef735eb4a66a4dad1fc05fcb71635305afddd397c306146e240fcba5566efa"},builder:{path:"tools/world-asset-forge/b1/landmark/build-landmark.mjs",sha256:"17485ad36b08e7228812292e5d9e242b211b0cd7b4c2a49ce42effdba514c0ac"},preset:{path:"tools/world-asset-forge/b1/landmark/presets/reclaimed-civic-aging-succession.preset.v1.json",sha256:"6b071277d8ceae8badaf212d6f7f041de225d3a78f9b44b894697f6ed22f6617",presetId:"reclaimed-civic-aging-succession-relief.v3"},blend:{path:"tools/world-asset-forge/b1/landmark/r11-west-transit-office.landmark.gn.blend",sha256:"8d4d49458fa327e8c0bf3102b4d13f07d3348fc709170ea800c8548067a619bb"},surfacePack:{path:"tools/world-asset-forge/b1/landmark/r11-west-transit-office.surface-pack.v1.png",sha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",bytes:467786}},u1={revision:"landmark-c-relief-r08",preset:{id:"reclaimed-civic-aging-succession-relief.v3",path:"tools/world-asset-forge/b1/landmark/presets/reclaimed-civic-aging-succession.preset.v1.json",sha256:"6b071277d8ceae8badaf212d6f7f041de225d3a78f9b44b894697f6ed22f6617"},semanticAttributes:{agingAttribute:"_AGING_FACTORS",agingComponents:["exposure","drainage","damage"],agingRanges:[{min:.22,max:.875},{min:.2,max:.8},{min:.18,max:.94}],ecologyAttribute:"_ECOLOGY_CODE",ecologyHistogram:{10:248,20:516,30:210,31:192,32:4,33:4,34:4},ecologyCodes:[10,20,30,31,32,33,34],visibleProjection:"COLOR_0",distinctVisibleColors:15},adjacentStyleCalibration:{sourcePath:"src/prototypeB/render/r11/ReclaimedCityEnhancementLayer.ts",sourceSha256:"aed9feb4b3e144629c845520f4a1578b65eb96ef73bf484e674aaed8d806e6d0",recipePath:"src/prototypeB/render/r11/ReclaimedCityEnhancementRecipe.ts",recipeSha256:"a30dc5aa42c8af78c7849f85566ac20d76c619d335b86b1d7da791df2da4e05d",primaryGroup:"r11-facade-runoff-vines-and-ivy-consumption",primarySurfaces:["r11-generated-town-hall-front-facade","r11-generated-town-hall-east-return"],secondaryGroup:"r11-town-existing-collider-bound-service-infill",rules:["match the adjacent neutral rain-aged concrete value range","reserve oxidized red-brown for damage and drainage paths instead of every bay","keep apertures darker than retained structure","use muted yellow-green ecology with clear damp-to-woody succession","let silhouette and causality, not saturation, carry landmark emphasis"]},causalAging:{factors:["exposure","drainage","damage"],projectionAttribute:"COLOR_0",factorAttribute:"_AGING_FACTORS",rules:{exposure:"upper plates and open edges lighten and desaturate",drainage:"vertical runoff and cistern-contact zones darken and cool",damage:"breach edges and torn steel localize warm oxidation"}},ecologicalSuccession:{stageAttribute:"_ECOLOGY_CODE",stages:{10:"damp-film",20:"crack-vine",30:"woody-trunk-root",31:"major-branch",32:"back-canopy",33:"mid-canopy",34:"front-canopy"},causalOrder:["damp-film follows drainage and retained water","crack-vine follows joints, ledges and breach edges","woody roots widen the existing causal breach","major branches connect trunk to separated canopy strata"]},canopyGrammar:{majorBranchMinimum:8,massCount:0,fixedCameraCardCount:3,technique:"retained-r11-alpha-cutout-cards-plus-real-trunk-major-branches-roots",requiredStrata:["back","mid","front"],requiredNegativeSpaces:2,maximumY:230.5,readabilityRule:"At true 390 CSS width, the crown, trunk connection and twin-tower U silhouette remain distinct."},lightingGrammar:{roofEcologyEmissionStrength:0,functionalRepairEmissionOnly:!0,repairEmissionStrength:1.1,rule:"Ecology and facade surfaces receive scene light only; emission is reserved for the five bounded repair-accent objects."},reliefCorrection:{interiorBrighterThanExterior:!1,roofEcologyEmissionStrength:0,functionalRepairEmissionOnly:!0,repairEmissionStrength:1.1,atlasAligned:!0,requiredRoles:["entrance-recess","entrance-return","window-bay-recess","lintel-awning","pilaster","broken-parapet"],expectedCounts:{"entrance-recess":2,"entrance-return":4,"window-bay-recess":12,"lintel-awning":2,pilaster:13,"broken-parapet":10},nodePrefixes:{"entrance-recess":"RELIEF_ENTRANCE_RECESS_","entrance-return":"RELIEF_ENTRANCE_RETURN_","window-bay-recess":"RELIEF_WINDOW_BAY_RECESS_","lintel-awning":"RELIEF_LINTEL_AWNING_",pilaster:"RELIEF_PILASTER_","broken-parapet":"RELIEF_BROKEN_PARAPET_"},physicalDepthRule:"Opening planes sit behind their returns and pilasters; awnings and broken parapets project toward the fixed gameplay camera.",drawCallIncrease:0,materialIncrease:0,textureIncrease:0},packedSurfaceAtlas:{path:"tools/world-asset-forge/b1/landmark/r11-west-transit-office.surface-pack.v1.png",sha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",bytes:467786,embeddedSha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",width:512,height:512,textureCount:1,externalUris:0,retainedInputs:{adjacentLayer:{path:"src/prototypeB/render/r11/ReclaimedCityEnhancementLayer.ts",sha256:"aed9feb4b3e144629c845520f4a1578b65eb96ef73bf484e674aaed8d806e6d0"},adjacentRecipe:{path:"src/prototypeB/render/r11/ReclaimedCityEnhancementRecipe.ts",sha256:"a30dc5aa42c8af78c7849f85566ac20d76c619d335b86b1d7da791df2da4e05d"},treeAtlas:{path:"src/prototypeB/render/r11/assets/r9-tree-crown-atlas.png",sha256:"90a5cdf0fe5d5dc7a091c1ea205020a49b5fe5592de3a557580d51d72a7bc569"},facadeAtlas:{path:"src/prototypeB/render/r11/assets/r9h-building-facade-atlas.png",sha256:"4199a97cad563ca576f71f8b9abdf7e8e37b23afc0a0bfea885dacbaf1b93b75"},ecologyAtlas:{path:"src/prototypeB/render/r11/assets/r9g-ecology-mass-atlas.png",sha256:"3624d93e0a5c02f1235c68aa2eb02e4cf85e0a62ab3f7adcd77479a59f12b633"}},regions:[{alphaPolicy:"composite-opaque",crop:{height:240,width:390,x:80,y:205},id:"adjacent-neutral-facade",source:"facadeAtlas",target:{height:256,width:256,x:0,y:0}},{alphaPolicy:"retain-source-alpha",crop:{height:545,width:451,x:8,y:8},id:"adjacent-tree-crown-primary",source:"treeAtlas",target:{height:160,width:160,x:256,y:0}},{alphaPolicy:"retain-source-alpha",crop:{height:545,width:452,x:475,y:8},id:"adjacent-tree-crown-secondary",source:"treeAtlas",target:{height:96,width:96,x:416,y:0}},{alphaPolicy:"retain-source-alpha",crop:{height:545,width:452,x:942,y:569},id:"adjacent-tree-crown-recovery",source:"treeAtlas",target:{height:96,width:96,x:416,y:96}},{alphaPolicy:"retain-source-alpha",crop:{height:610,width:580,x:25,y:15},id:"adjacent-ecology-runoff",source:"ecologyAtlas",target:{height:256,width:256,x:0,y:256}},{alphaPolicy:"composite-opaque",crop:{height:300,width:210,x:150,y:230},id:"adjacent-tree-bark-root",source:"treeAtlas",target:{height:256,width:256,x:256,y:256}}],resampling:"integer-nearest-center",pngEncoding:"rgba8-filter0-zlib9-no-metadata"},hybridCrown:{fixedCameraCardCount:3,realTrunkBranchRootDepth:!0,atlasAlphaCutout:!0,sourceTechnique:"retained-r11-fixed-camera-cards-plus-real-branch-depth"},reusableAcrossStructures:!0,runtimeSystemAdded:!1,referenceToRuntimeDecomposition:{path:"work/world_asset_forge_landmark_relief_r08_2026-08-14/REFERENCE_TO_RUNTIME_RELIEF.md",sha256:"e1e9165d09ba35e8001674341d872d4dd7dd4e5be3df6d26f44e3640584dc03a"},styleCalibrationRules:{path:"work/world_asset_forge_landmark_relief_r08_2026-08-14/STYLE_BALANCE_RULES.md",sha256:"87cc2143a48fdf8e890b5a9f2bab5aa43e7835af4a1d6eae882bfcad98e822a8"},authoringCost:{path:"work/world_asset_forge_landmark_relief_r08_2026-08-14/AUTHORING_COST.json",sha256:"29c9dbe8f419cab8e35972c5e397269354e04ae4ca64a020560a95ec5e7d33b6"}},h1={kind:"visual",variant:"landmark",seed:131,file:"r11-west-transit-office.landmark.visual.glb",sha256:"97ba7b4ae895424f12635c674596d322b30d74cc569f37bfc2a3088c9d90143c",bytes:830684,structuralIds:["west-transit-office"],outputIds:["vis.west-transit-office"],triangles:3454,drawCalls:7,materials:5,textures:1,maximumTextureEdge:512,embeddedImages:[{name:"surface-pack-131",mimeType:"image/png",sha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",bytes:467786,width:512,height:512}],surfaceAtlasSha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",externalUris:0,measuredEnvelope:{min:{x:292,y:5.8,z:457},max:{x:633,y:230.5,z:703},meshNodeCount:7},semanticAttributes:{agingAttribute:"_AGING_FACTORS",agingComponents:["exposure","drainage","damage"],agingRanges:[{min:.22,max:.875},{min:.2,max:.8},{min:.18,max:.94}],ecologyAttribute:"_ECOLOGY_CODE",ecologyHistogram:{10:248,20:516,30:210,31:192,32:4,33:4,34:4},ecologyCodes:[10,20,30,31,32,33,34],visibleProjection:"COLOR_0",distinctVisibleColors:15}},f1={kind:"visual",variant:"landmark",seed:1131,file:"r11-west-transit-office.landmark.seed-1131.visual.glb",sha256:"859cdbdeb7b025de08a9f305ed680a3bfbb01c9caa6c1496874701eb47532fe1",bytes:830700,structuralIds:["west-transit-office"],outputIds:["vis.west-transit-office"],triangles:3454,drawCalls:7,materials:5,textures:1,maximumTextureEdge:512,embeddedImages:[{name:"surface-pack-1131",mimeType:"image/png",sha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",bytes:467786,width:512,height:512}],surfaceAtlasSha256:"fde56db5dafb6b0505033dee683663f0feda7cab424ce154ebd518ad4ee2a2e6",externalUris:0,measuredEnvelope:{min:{x:292,y:5.8,z:457},max:{x:633,y:230.29999,z:703},meshNodeCount:7},semanticAttributes:{agingAttribute:"_AGING_FACTORS",agingComponents:["exposure","drainage","damage"],agingRanges:[{min:.22,max:.875},{min:.2,max:.8},{min:.18,max:.94}],ecologyAttribute:"_ECOLOGY_CODE",ecologyHistogram:{10:248,20:516,30:210,31:192,32:4,33:4,34:4},ecologyCodes:[10,20,30,31,32,33,34],visibleProjection:"COLOR_0",distinctVisibleColors:15},runtimeImported:!1,allowedChanges:["facade-infill","canopy-card"],layoutIdentityChanged:!1,causalRelationChanged:!1,agingRuleChanged:!1,successionTopologyChanged:!1,branchTopologyChanged:!1,canopyLayerMembershipChanged:!1,styleCalibrationChanged:!1},p1={mode:"b0-contract-identity-reference",documents:{worldDna:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.world-dna.v1.json",sha256:"7b1de9628166bcf3f4b8db7f155cd0f69a46b7ced47a753f3c83f78ccd22b2cb"},forgePlan:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.forge-plan.v1.json",sha256:"e32de671b1d75382bf5949feb62a896fc15cc16ef1d8a12e383ab8a30846304b"},visual:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.visual-output.v1.json",sha256:"6cd6cbaf3838d6c12e2394400b043b7b5903dfb6455fe8d0dc34b956dd4734f8"},collision:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.collision-output.v1.json",sha256:"6432373438d8721ff9c7ed3278799755407102c226311b27408009caf0a32d28"},occluder:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.occluder-output.v1.json",sha256:"3cf03cfe0d656da620bbe6aaaf33132f16e8340583251392d423fece567c0bc5"},baselineManifest:{path:"tools/world-asset-forge/contracts/instances/r11-west-civic.baseline-manifest.v1.json",sha256:"e1a07cf7f75a771058e7e762361950142b92524c647ce02222656c7f771ffe58"}},collision:{structuralIds:["west-transit-office"],outputIds:["col.west-transit-office"],shape:"box-2d",state:"contract-only"},occluder:{structuralIds:["west-transit-office"],outputIds:["occ.west-transit-office"],shape:"box-3d",state:"contract-only"},identitySha256:"585959cf0ecf5f20dc93554e23651f445ac66900ba3f1f6635d610b651d8177b"},m1={derivation:"direct GLB POSITION AABB against digest-locked B0 authority",taskProjectedBaseY:5.8,taskProjectedBaseYSource:"B0 main-route and spawn y; not a B0 structure field",frozenProxyEnvelope:{min:{x:290,y:5.8,z:455},max:{x:635,y:231.8,z:705}},measured:[{seed:131,envelope:{min:{x:292,y:5.8,z:457},max:{x:633,y:230.5,z:703},meshNodeCount:7},groundGap:0,routeCenterlineClearance:197,routeIntrusions:0,waterEnvelopeOverlaps:0,minimumWaterClearance:27},{seed:1131,envelope:{min:{x:292,y:5.8,z:457},max:{x:633,y:230.29999,z:703},meshNodeCount:7},groundGap:0,routeCenterlineClearance:197,routeIntrusions:0,waterEnvelopeOverlaps:0,minimumWaterClearance:27}],nearestRankP95Note:"one-ID face samples make p95 equal max; each collision face is <=3 and each occluder face is <=4",runtimeCollisionMutation:!1,runtimeOccluderMutation:!1,runtimeNavigationMutation:!1,runtimeSaveMutation:!1},g1={artifactKindLoaded:"visual",switch:"worldForge=landmark",acceptedB1Rollback:"worldForge=b1",r11Rollback:"worldForge=off",mutuallyExclusiveWithAcceptedB1:!0,defaultChanged:!1,runtimeCollisionMutation:!1,runtimeOccluderMutation:!1,runtimeNavigationMutation:!1,runtimeSaveMutation:!1},w1={visualBytes:1835008,triangles:2e4,drawCalls:8,materials:5,textures:1,textureEdge:512,buildMilliseconds:12e4,peakRssBytes:1073741824},v1={canonicalSeed:131,boundedVariationSeed:1131,canonicalElapsedMs:11508,variationElapsedMs:10753,maximumElapsedMs:11508,peakRssBytes:339034112,floatNormalization:"float32 round-to-1e-5-world-unit",deterministicRebuildEvidence:"work/world_asset_forge_landmark_relief_r08_2026-08-14/RELIEF_R08_DETERMINISTIC_REBUILD.json",timestampsInArtifactContract:!1},y1={matchedActualViewDecision:"pending",technicalPassIsNotVisualAcceptance:!0,options:["ACCEPT LANDMARK C FINAL ART","REVISE: <exact visible change>","KEEP CHECKPOINT 30624115"]},x1={schemaVersion:$g,documentKind:e1,identity:t1,selectedConcept:a1,activationLock:r1,refinementAuthority:s1,checkpointLock:i1,reliefCorrectionAuthority:n1,preCorrectionLock:o1,methodBaselineLock:A1,acceptedB1Lock:l1,geometryNodes:c1,editableSource:d1,modelCase:u1,candidateVisual:h1,boundedVariation:f1,retainedProxies:p1,correspondence:m1,runtime:g1,budgets:w1,build:v1,humanGate:y1},sl="/game/assets/rainwater-control-tower.landmark.visual-DzJgEplT.glb",b1="/game/assets/r08-derived-tree-family-atlas-DGniL5oo.png",le=Object.freeze({candidateCommit:"9fb4eed4e55067813c4aa164622a0cb1c7fe1e94",sourceStructuralId:"west-transit-office",sourceVisualOutputId:"vis.west-transit-office",mvpSemanticSlotId:"first-stage-mvp:first-r01:rainwater-control-tower",assetSha256:"97ba7b4ae895424f12635c674596d322b30d74cc569f37bfc2a3088c9d90143c",manifestSha256:"0ca2ee5f417537e55bab3d19775a04e373cfeca878deb04f666e87d3c6aee160",assetBytes:830684,sourceCenter:{x:462.5,z:580},targetCenter:{x:2040,z:1025},translation:{x:1577.5,y:-5.8,z:445},footprint:{x:1867.5,z:900,width:345,depth:250}}),xn=Object.freeze([{id:"departure-civic-service",targetCenter:{x:255,z:645},scale:{x:.78,y:.78,z:.72},rotationY:.08,materialTint:12105379,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH","SERVICE_RUNS"]},{id:"departure-return-annex",targetCenter:{x:265,z:1155},scale:{x:.72,y:.66,z:.65},rotationY:-.12,materialTint:11119249,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH","REPAIR_ACCENT"]},{id:"old-rail-pump-annex",targetCenter:{x:720,z:650},scale:{x:.58,y:.62,z:.72},rotationY:-.18,materialTint:13025448,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH"]},{id:"old-rail-signal-house",targetCenter:{x:1138,z:820},scale:{x:.46,y:.88,z:.5},rotationY:.2,materialTint:10463386,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH","REPAIR_ACCENT","SERVICE_RUNS"]},{id:"basin-maintenance-shell",targetCenter:{x:1505,z:1335},scale:{x:.44,y:.98,z:.48},rotationY:.42,materialTint:10135694,hiddenRoles:["REPAIR_ACCENT","SERVICE_RUNS"]},{id:"coastal-service-cistern",targetCenter:{x:2880,z:1365},scale:{x:.6,y:.86,z:.54},rotationY:-.34,materialTint:9545121,hiddenRoles:["CAUSAL_BREACH","FACADE_INFILL"]},{id:"basin-north-intake",targetCenter:{x:1835,z:450},scale:{x:.54,y:.8,z:.54},rotationY:-.25,materialTint:10136470,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH","REPAIR_ACCENT"]},{id:"coastal-relay-stack",targetCenter:{x:3180,z:650},scale:{x:.5,y:1,z:.48},rotationY:.3,materialTint:9545376,hiddenRoles:["CISTERN_WATER","CAUSAL_BREACH","FACADE_INFILL"]}]),bn=Object.freeze([{id:"back",atlas:{x:256,y:0,width:160,height:160},position:{x:458,y:183,z:552},size:{width:152,height:104},rotationY:-.38},{id:"mid",atlas:{x:416,y:0,width:96,height:96},position:{x:492,y:190,z:579},size:{width:126,height:92},rotationY:.46},{id:"front",atlas:{x:416,y:96,width:96,height:96},position:{x:429,y:176,z:603},size:{width:108,height:84},rotationY:-.68}]),il=Object.freeze([{id:"basin-runoff-a",form:"runoff-crown",sprite:0,x:430,z:520,height:108,width:126,lean:-.08,tint:12113051,mirror:!1},{id:"basin-runoff-b",form:"runoff-crown",sprite:1,x:670,z:690,height:92,width:104,lean:.12,tint:10930064,mirror:!0},{id:"basin-runoff-c",form:"runoff-crown",sprite:3,x:565,z:865,height:82,width:98,lean:-.16,tint:9549693,mirror:!1},{id:"basin-court-a",form:"wall-root",sprite:4,x:315,z:735,height:76,width:92,lean:.09,tint:11060621,mirror:!0},{id:"basin-court-b",form:"wetland-fork",sprite:2,x:805,z:455,height:88,width:104,lean:-.12,tint:9680767,mirror:!1},{id:"rail-lean-a",form:"rail-lean",sprite:5,x:920,z:490,height:120,width:118,lean:.24,tint:11585933,mirror:!1},{id:"rail-lean-b",form:"rail-lean",sprite:0,x:1210,z:620,height:98,width:108,lean:-.2,tint:10402434,mirror:!0},{id:"rail-lean-c",form:"rail-lean",sprite:4,x:1075,z:810,height:86,width:94,lean:.1,tint:11913355,mirror:!1},{id:"rail-verge-a",form:"saltwind",sprite:3,x:840,z:885,height:72,width:90,lean:.16,tint:10468484,mirror:!0},{id:"rail-verge-b",form:"runoff-crown",sprite:1,x:1105,z:520,height:80,width:96,lean:-.1,tint:11257999,mirror:!1},{id:"wetland-fork-a",form:"wetland-fork",sprite:2,x:1360,z:1190,height:112,width:126,lean:.04,tint:9419400,mirror:!1},{id:"wetland-fork-b",form:"wetland-fork",sprite:4,x:1610,z:1360,height:118,width:116,lean:-.06,tint:10732181,mirror:!0},{id:"wetland-fork-c",form:"wetland-fork",sprite:1,x:1520,z:1060,height:74,width:90,lean:.18,tint:8367222,mirror:!0},{id:"wall-root-a",form:"wall-root",sprite:5,x:1790,z:720,height:94,width:106,lean:.18,tint:10665604,mirror:!1},{id:"wall-root-b",form:"wall-root",sprite:3,x:2255,z:790,height:108,width:118,lean:-.14,tint:9549948,mirror:!0},{id:"tower-court-a",form:"wall-root",sprite:0,x:1770,z:1120,height:82,width:96,lean:-.08,tint:11257488,mirror:!0},{id:"tower-court-b",form:"runoff-crown",sprite:2,x:2305,z:1080,height:90,width:110,lean:.14,tint:10140034,mirror:!1},{id:"saltwind-a",form:"saltwind",sprite:2,x:2430,z:1190,height:92,width:120,lean:.3,tint:10927756,mirror:!1},{id:"saltwind-b",form:"saltwind",sprite:4,x:2690,z:1330,height:106,width:110,lean:-.26,tint:9548421,mirror:!0},{id:"saltwind-c",form:"saltwind",sprite:3,x:2550,z:980,height:78,width:104,lean:.2,tint:11781268,mirror:!1},{id:"coastal-runoff",form:"runoff-crown",sprite:1,x:2980,z:1190,height:110,width:120,lean:.1,tint:10797202,mirror:!0},{id:"coastal-runoff-b",form:"runoff-crown",sprite:0,x:2820,z:1090,height:84,width:100,lean:-.12,tint:9876861,mirror:!1},{id:"tunnel-root",form:"wall-root",sprite:5,x:3190,z:1430,height:88,width:104,lean:-.18,tint:10139785,mirror:!0},{id:"tunnel-root-b",form:"wall-root",sprite:4,x:3060,z:1510,height:72,width:86,lean:.12,tint:11388059,mirror:!1}]),_i=Object.freeze({sourceCommit:le.candidateCommit,sourcePath:"src/prototypeB/render/r11/assets/r9-tree-crown-atlas.png",sourceSha256:"90a5cdf0fe5d5dc7a091c1ea205020a49b5fe5592de3a557580d51d72a7bc569",runtimeSha256:"68321e499eb7a1cdfb534502748fbb535d25058aaeaef3fd09cfb9cdb8c5a0f3",maximumEdge:1024,spriteCount:6,compression:"provenance-preserving-downscale"}),ks=(t,e)=>t.length===e.length&&t.every((a,r)=>a===e[r]),D1=t=>{const e=t,a=e.candidateVisual,r=e.identity.bounds;if(e.schemaVersion!==1||e.documentKind!=="world-asset-forge-b1-landmark-sidecar-manifest"||e.identity.phase!=="world-asset-forge-phase-b1"||e.identity.variant!=="landmark"||e.identity.seed!==131||!ks(e.identity.structuralIds,["west-transit-office"])||!ks(e.identity.visualOutputIds,["vis.west-transit-office"])||r.x!==290||r.z!==455||r.width!==345||r.depth!==250||r.height!==226||r.baseY!==5.8||a.kind!=="visual"||a.variant!=="landmark"||a.file!=="r11-west-transit-office.landmark.visual.glb"||a.sha256!==le.assetSha256||a.bytes!==le.assetBytes||!ks(a.structuralIds,["west-transit-office"])||!ks(a.outputIds,["vis.west-transit-office"])||a.triangles!==3454||a.drawCalls!==7||a.materials!==5||a.textures!==1||a.maximumTextureEdge!==512||a.externalUris!==0||e.correspondence.runtimeCollisionMutation!==!1||e.correspondence.runtimeOccluderMutation!==!1||e.correspondence.runtimeNavigationMutation!==!1||e.correspondence.runtimeSaveMutation!==!1||e.runtime.artifactKindLoaded!=="visual"||e.runtime.runtimeCollisionMutation!==!1||e.runtime.runtimeOccluderMutation!==!1||e.runtime.runtimeNavigationMutation!==!1||e.runtime.runtimeSaveMutation!==!1)throw new Error("Rainwater Control Tower authority mismatch.");return a},B1=t=>{const e=[];if(t.traverse(a=>{if(a.userData.semanticRoot!==!0)return;const r=a.userData.structuralId,s=a.userData.outputId;if(typeof r!="string"||typeof s!="string")throw new Error("Rainwater Control Tower semantic root is incomplete.");e.push({structuralId:r,outputId:s})}),e.length!==1||e[0]?.structuralId!=="west-transit-office"||e[0]?.outputId!=="vis.west-transit-office")throw new Error("Rainwater Control Tower semantic-root bijection failed.")},P1=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],E1=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],Xt=(t,e)=>t>>>e|t<<32-e,C1=t=>{const e=new Uint8Array(t),a=Math.ceil((e.byteLength+9)/64)*64,r=new Uint8Array(a);r.set(e),r[e.byteLength]=128;const s=e.byteLength*8,i=new DataView(r.buffer);i.setUint32(a-8,Math.floor(s/4294967296),!1),i.setUint32(a-4,s>>>0,!1);const n=[...P1],o=new Uint32Array(64);for(let A=0;A<a;A+=64){for(let f=0;f<16;f+=1)o[f]=i.getUint32(A+f*4,!1);for(let f=16;f<64;f+=1){const w=o[f-15]??0,v=o[f-2]??0,y=Xt(w,7)^Xt(w,18)^w>>>3,P=Xt(v,17)^Xt(v,19)^v>>>10;o[f]=(o[f-16]??0)+y+(o[f-7]??0)+P>>>0}let[l,c,d,u,h,g,p,m]=n;for(let f=0;f<64;f+=1){const w=Xt(h,6)^Xt(h,11)^Xt(h,25),v=h&g^~h&p,y=m+w+v+(E1[f]??0)+(o[f]??0)>>>0,P=Xt(l,2)^Xt(l,13)^Xt(l,22),b=l&c^l&d^c&d,x=P+b>>>0;m=p,p=g,g=h,h=u+y>>>0,u=d,d=c,c=l,l=y+x>>>0}n[0]=(n[0]??0)+l>>>0,n[1]=(n[1]??0)+c>>>0,n[2]=(n[2]??0)+d>>>0,n[3]=(n[3]??0)+u>>>0,n[4]=(n[4]??0)+h>>>0,n[5]=(n[5]??0)+g>>>0,n[6]=(n[6]??0)+p>>>0,n[7]=(n[7]??0)+m>>>0}return n.map(A=>A.toString(16).padStart(8,"0")).join("")},M1=async t=>{if(globalThis.crypto?.subtle===void 0)return C1(t);const e=await globalThis.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(e),a=>a.toString(16).padStart(2,"0")).join("")},Gi=t=>{const e=new Set,a=new Set,r=new Set;t.traverse(s=>{if(!(s instanceof I)&&!(s instanceof un))return;e.has(s.geometry)||(e.add(s.geometry),s.geometry.dispose());const i=Array.isArray(s.material)?s.material:[s.material];for(const n of i)if(!a.has(n)){a.add(n);for(const o of Object.values(n))o instanceof Vr&&r.add(o);n.dispose()}}),r.forEach(s=>s.dispose())},nl=(t,e)=>{const a=t.clone();return a instanceof L&&(a.color.multiply(new Y(e)),a.roughness=C.clamp(a.roughness+.16,.68,.96),a.metalness=C.clamp(a.metalness,0,.42),a.envMapIntensity=Math.min(.62,a.envMapIntensity),a.needsUpdate=!0),a},S1=t=>{t instanceof L&&(t.roughness=Math.max(.66,t.roughness),t.metalness=Math.min(.46,t.metalness),t.envMapIntensity=Math.min(.68,t.envMapIntensity),t instanceof he&&(t.clearcoat=Math.min(.22,t.clearcoat),t.clearcoatRoughness=Math.max(.62,t.clearcoatRoughness),t.iridescence=0),t.needsUpdate=!0)},I1=()=>{const a=new Uint8Array(49152),r=[[.24,.2,.09,.052],[.34,.35,.12,.07],[.26,.51,.1,.058],[.44,.62,.11,.068],[.38,.78,.1,.06],[.6,.24,.1,.06],[.67,.46,.12,.07],[.59,.7,.11,.064],[.73,.84,.09,.055]];for(let i=0;i<128;i+=1)for(let n=0;n<96;n+=1){const o=n/95,A=i/127,l=Math.abs(o-(.3+Math.sin(A*13.5)*.075)),c=Math.abs(o-(.63+Math.sin(A*10.8+1.4)*.065));let d=l<.014||c<.012?.76:0;for(const[h,g,p,m]of r){const f=((o-h)/p)**2+((A-g)/m)**2;f<1&&(d=Math.max(d,(1-f)*.92))}const u=(i*96+n)*4;a[u]=76,a[u+1]=112,a[u+2]=56,a[u+3]=Math.round(d*255)}const s=new Da(a,96,128,Ya);return s.name="first-stage-facade-invasion-alpha",s.colorSpace=je,s.needsUpdate=!0,s},Vs=[[1930,68,1152,74,112,0],[2095,86,1152,92,148,0],[1866,64,1032,82,118,Math.PI/2],[650,42,708,68,76,-.18],[790,38,606,62,68,-.18],[1455,48,1375,72,88,.42],[2820,48,1402,76,84,-.34],[2975,42,1310,62,74,-.34]],Q1=()=>{const t=new sa(1,1),e=I1(),a=new L({map:e,color:12506011,alphaTest:.08,transparent:!1,depthWrite:!0,side:Se,roughness:.94,metalness:0,envMapIntensity:.28,polygonOffset:!0,polygonOffsetFactor:-1}),r=new Be(t,a,Vs.length);r.name="first-stage-facade-runoff-root-invasion";const s=new fe,i=new S,n=new ot,o=new S;return Vs.forEach(([A,l,c,d,u,h],g)=>{i.set(A-le.translation.x,l,c-le.translation.z),n.setFromEuler(new Ie(0,h,g%2===0?-.04:.05)),o.set(d,u,1),s.compose(i,n,o),r.setMatrixAt(g,s)}),r.instanceMatrix.needsUpdate=!0,r.castShadow=!0,r.receiveShadow=!0,r.userData.visualOnly=!0,r.userData.navigationRole="none",r.userData.collisionRole="none",r.userData.runtimeSaveMutation=!1,r.userData.provenance=`procedural-facade-invasion:${le.candidateCommit}`,r.userData.cardCount=Vs.length,r},k1=t=>{let e=null;return t.traverse(a=>{if(e!==null||!(a instanceof I))return;const r=Array.isArray(a.material)?a.material:[a.material];for(const s of r)if(s instanceof L&&s.map!==null){e=s.map;return}}),e},T1=t=>{const e=new R;e.name="accepted-r08-fixed-camera-crown-fidelity",e.userData.visualOnly=!0,e.userData.navigationRole="none",e.userData.collisionRole="none",e.userData.provenance=`accepted-r08-hybrid-crown:${le.candidateCommit}`,e.userData.fixedCameraCardCount=bn.length,e.userData.realTrunkBranchRootDepth=!0,e.userData.atlasAlphaCutout=!0;const a=k1(t);if(a===null)return e;for(const r of bn){const s=a.clone();s.name=`r08-crown-${r.id}-atlas-region`,s.repeat.set(r.atlas.width/512,r.atlas.height/512),s.offset.set(r.atlas.x/512,r.atlas.y/512),s.wrapS=cn,s.wrapT=cn,s.needsUpdate=!0;const i=new I(new sa(r.size.width,r.size.height),new L({map:s,color:14543055,alphaTest:.36,transparent:!1,side:Se,roughness:.88,metalness:0,envMapIntensity:.72}));i.name=`r08-fixed-camera-crown-card-${r.id}`,i.position.set(r.position.x,r.position.y,r.position.z),i.rotation.y=r.rotationY,i.castShadow=!0,i.receiveShadow=!0,i.userData.visualOnly=!0,i.userData.navigationRole="none",i.userData.collisionRole="none",i.userData.atlasRegion={...r.atlas},e.add(i)}return e},R1=()=>{const e=new Uint8Array(36864);for(let r=0;r<96;r+=1)for(let s=0;s<96;s+=1){const i=Math.sin(s*.43)*Math.cos(r*.37),n=Math.sin((s+r)*1.71)*.5+Math.cos((s-r)*1.13)*.5,o=(s*17+r*29+s*r*3)%23/22,A=C.clamp(Math.round(190+i*18+n*12+o*22),142,242),l=(r*96+s)*4;e[l]=A,e[l+1]=Math.min(255,A+10),e[l+2]=Math.max(0,A-18),e[l+3]=255}const a=new Da(e,96,96,Ya);return a.name="first-stage-opaque-mottled-crown-surface",a.colorSpace=je,a.wrapS=We,a.wrapT=We,a.repeat.set(2.4,1.8),a.needsUpdate=!0,a},z1=t=>{const e=[],a=t==="rail-lean"?.35:t==="wetland-fork"?.9:t==="wall-root"?1.45:t==="saltwind"?2.1:0;for(let r=0;r<12;r+=1){const s=a+r*2.399963,i=r<3?.18:r<8?.36:.49;let n=Math.cos(s)*i,o=Math.sin(s)*i*.72,A=(r*7%9-4)*.038+(r<3?.1:0);t==="rail-lean"?(n+=(r/11-.35)*.22,A+=r>7?-.04:.02):t==="wetland-fork"?(n+=r%2===0?-.13:.13,A+=r<6?.07:-.03):t==="wall-root"?(A+=r%4*.045,n*=.78):t==="saltwind"&&(n+=.13+r/11*.12,A-=r>8?.07:0);const l=.88+r*5%7*.025;e.push([n,A,o,(.112+r%3*.015)*l,(.102+r%4*.012)*l,(.108+r%2*.017)*l])}return e},L1=()=>{const t=[{x:0,y:.08,z:0,sx:.82,sy:.62,sz:.72,ry:.12,rz:-.08},{x:-.72,y:-.04,z:.1,sx:.58,sy:.48,sz:.52,ry:-.38,rz:.12},{x:.66,y:.18,z:-.12,sx:.54,sy:.52,sz:.48,ry:.46,rz:-.18},{x:-.18,y:.58,z:-.34,sx:.5,sy:.52,sz:.44,ry:.74,rz:.08},{x:.18,y:-.35,z:.42,sx:.46,sy:.4,sz:.5,ry:-.66,rz:.22},{x:.7,y:-.24,z:.32,sx:.38,sy:.36,sz:.42,ry:.28,rz:-.24}].map(({x:a,y:r,z:s,sx:i,sy:n,sz:o,ry:A,rz:l})=>{const c=new ge(i,n,o,1,1,1);return c.rotateY(A),c.rotateZ(l),c.translate(a,r,s),c}),e=Cr(t,!1);for(const a of t)a.dispose();if(e===null)throw new Error("Unable to build the voxel crown branchlet geometry.");return e.computeVertexNormals(),e.name="first-stage-r08-voxel-crown-branchlet",e},Xi=(t,e,a,r,s,i,n,o)=>{i.copy(e).sub(t);const A=Math.max(.001,i.length());s.copy(t).add(e).multiplyScalar(.5),n.setFromUnitVectors(new S(0,1,0),i.multiplyScalar(1/A)),o.set(a,A,a),r.compose(s,n,o)},F1=t=>{const e=il.flatMap((x,B)=>{const E=B*2.399963,M=54+B%4*19;return[x,{...x,id:`${x.id}-natural-${B+1}`,sprite:(x.sprite+2+B%3)%_i.spriteCount,x:C.clamp(x.x+Math.cos(E)*M,90,3420),z:C.clamp(x.z+Math.sin(E)*M*.72,300,1620),height:x.height*(.68+B%5*.055),width:x.width*(.66+B%4*.06),lean:C.clamp(-x.lean*.55,-.18,.18),mirror:!x.mirror}]}).map(x=>{let B=x.x,E=x.z;return B<880&&E>620&&E<1080?(E=E<850?520:1210,B+=B<540?-90:100):B<1440&&E>680&&E<1090?E=E<870?590:1160:B>1700&&B<2340&&E>790&&E<1270&&(B=B<2040?1660:2390),{...x,x:C.clamp(B,90,3420),z:C.clamp(E,300,1620)}}),a=new R;a.name="first-stage-r08-derived-vegetation-family",a.userData.visualOnly=!0,a.userData.navigationRole="none",a.userData.collisionRole="none",a.userData.runtimeSaveMutation=!1,a.userData.provenance=`accepted-r08-vegetation-derivative:${le.candidateCommit}`,a.userData.derivedVegetationCount=e.length,a.userData.silhouetteArchetypeCount=new Set(il.map(x=>x.form)).size,a.userData.sourceSpriteCount=_i.spriteCount,a.userData.runtimeAtlasSha256=_i.runtimeSha256,a.userData.sourceAtlasAvailable=t.isTexture,a.userData.realTrunkBranchRootDepth=!0,a.userData.atlasAlphaCutout=!1,a.userData.primaryTreeRepresentation="instanced-lit-volume",a.userData.crownSurface="opaque-mottled-volume-not-alpha-card",a.userData.contactShadowCount=0,a.userData.realShadowCasterCount=e.length,a.userData.shadowPresentation="real-volume-vsm-only-no-fake-contact",a.userData.placementGrammar="paired-ecological-cluster-with-golden-angle-jitter",a.userData.drawCallBudget=2;const r=6,s=4,i=1+r+s,n=12;a.userData.woodySegmentCount=e.length*i,a.userData.crownVolumeCount=e.length*n;const o=new Be(new ba(.72,1,1,7,1,!1),new L({color:14074013,roughness:.96,metalness:0,envMapIntensity:.28,emissive:4336667,emissiveIntensity:.56,vertexColors:!0}),e.length*i);o.name="first-stage-r08-tree-trunks-branches-roots",o.castShadow=!0,o.receiveShadow=!0,o.frustumCulled=!1,o.userData.visualOnly=!0,o.userData.navigationRole="none",o.userData.collisionRole="none",o.userData.runtimeSaveMutation=!1;const A=R1(),l=new Be(L1(),new L({map:A,color:16056297,roughness:.86,metalness:0,envMapIntensity:.68,emissive:3163947,emissiveIntensity:.5,flatShading:!0,vertexColors:!0}),e.length*n);l.name="first-stage-r08-tree-canopy-volumes",l.castShadow=!0,l.receiveShadow=!1,l.frustumCulled=!1,l.userData.visualOnly=!0,l.userData.navigationRole="none",l.userData.collisionRole="none",l.userData.runtimeSaveMutation=!1;const c=new fe,d=new S,u=new S,h=new ot,g=new S,p=new S,m=new S,f=new fe,w=new S,v=new ot,y=new S,P=new Y,b=new Y;for(const[x,B]of e.entries()){const E=B.x-le.translation.x,M=B.z-le.translation.z,T=6.25,k=B.height*(B.form==="wall-root"?.72:.66),H=C.clamp(B.width*.045,3.4,5.8),O=B.mirror?-1:1,X=new S(E+B.lean*B.height*.34,T+k,M+O*Math.abs(B.lean)*B.height*.12),j=new R;j.name=`r08-derived-tree-${B.id}`,j.position.set(E,T,M),j.userData.spriteIndex=B.sprite,j.userData.silhouetteForm=B.form,j.userData.primaryRepresentation="instanced-lit-volume",j.userData.visualOnly=!0,j.userData.navigationRole="none",j.userData.collisionRole="none",j.userData.runtimeSaveMutation=!1,a.add(j),P.setHex(x%3===0?9267785:x%3===1?7756610:8544324),p.set(E,T,M),Xi(p,X,H,c,d,u,h,g);const ee=x*i;o.setMatrixAt(ee,c),o.setColorAt(ee,P);const J=z1(B.form);b.set(B.tint);for(let _=0;_<J.length;_+=1){const ie=J[_];if(ie===void 0)continue;const[pe,Re,Ue,_e,Fe,ce]=ie,me=B.mirror?-1:1;w.set(X.x+pe*B.width*me,X.y+Re*B.height,X.z+Ue*B.width),v.setFromEuler(new Ie(.08*((x+_)%3-1),(x*.73+_*1.17)%Math.PI,B.lean*.45)),y.set(B.width*_e,B.height*Fe,B.width*ce),f.compose(w,v,y);const xe=x*n+_;l.setMatrixAt(xe,f);const Ke=b.clone().offsetHSL(((x+_)%3-1)*.012,.04,.02+(x+_*2)%5*.018);if(l.setColorAt(xe,Ke),_<r){const pt=new S().lerpVectors(p,X,.5+_*.055),Jt=w.clone().lerp(X,.36);Xi(pt,Jt,H*(.5-_*.045),c,d,u,h,g);const da=ee+1+_;o.setMatrixAt(da,c),o.setColorAt(da,P)}}for(let _=0;_<s;_+=1){const ie=x*1.618+_*Math.PI*2/s;p.set(E,T+2.2,M),m.set(E+Math.cos(ie)*B.width*(.16+_*.018),T+.42,M+Math.sin(ie)*B.width*(.13+_*.016)),Xi(p,m,H*(.42-_*.055),c,d,u,h,g);const pe=ee+1+r+_;o.setMatrixAt(pe,c),o.setColorAt(pe,P)}}return o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0,l.instanceColor.needsUpdate=!0,a.add(o,l),a},yt=Object.freeze([{id:"rainwater-control-tower",x:2040,z:1025,roofY:222,width:236,depth:168,rotationY:0},{id:"departure-civic-service",x:255,z:645,roofY:138,width:198,depth:112,rotationY:.08},{id:"departure-return-annex",x:265,z:1155,roofY:114,width:176,depth:98,rotationY:-.12},{id:"old-rail-pump-annex",x:720,z:650,roofY:96,width:188,depth:128,rotationY:-.18},{id:"old-rail-signal-house",x:1138,z:820,roofY:147,width:132,depth:80,rotationY:.2},{id:"basin-maintenance-shell",x:1505,z:1335,roofY:180,width:146,depth:104,rotationY:.42},{id:"coastal-service-cistern",x:2880,z:1365,roofY:143,width:190,depth:114,rotationY:-.34},{id:"basin-north-intake",x:1835,z:450,roofY:181,width:186,depth:135,rotationY:-.25},{id:"coastal-relay-stack",x:3180,z:650,roofY:226,width:173,depth:120,rotationY:.3}]),O1=()=>{const t=[{x:0,y:.1,z:0,sx:1.15,sy:.72,sz:.82},{x:-.82,y:-.08,z:.14,sx:.74,sy:.58,sz:.64},{x:.78,y:.04,z:-.12,sx:.68,sy:.64,sz:.72},{x:-.22,y:.48,z:-.46,sx:.62,sy:.7,sz:.58},{x:.28,y:.34,z:.5,sx:.58,sy:.66,sz:.6}].map(({x:a,y:r,z:s,sx:i,sy:n,sz:o})=>{const A=new $l(1,0);return A.scale(i,n,o),A.translate(a,r,s),A}),e=Cr(t,!1);for(const a of t)a.dispose();if(e===null)throw new Error("Unable to build the structural foliage cluster geometry.");return e.computeVertexNormals(),e.name="first-stage-structural-foliage-five-lobe-cluster",e},U1=()=>{const t=new R;t.name="first-stage-structural-ecology-invasion",t.userData.visualOnly=!0,t.userData.navigationRole="none",t.userData.collisionRole="none",t.userData.runtimeSaveMutation=!1,t.userData.provenance=`procedural-voxel-structural-ecology:${le.candidateCommit}`,t.userData.buildingCount=yt.length,t.userData.roofSoilPatchCount=yt.length*4,t.userData.parapetGrowthCount=yt.length*4,t.userData.facadeRunCount=yt.length*10,t.userData.roofCrownCount=yt.length*9,t.userData.facadeLedgeGrowthCount=yt.length*6,t.userData.facadeCavityCount=yt.length*3,t.userData.rootHeaveCount=yt.length*3,t.userData.roofFoliageVolumeCount=yt.length*12,t.userData.facadeFoliageVolumeCount=yt.length*16,t.userData.foliageVolumeDrawCalls=1,t.userData.structuralTechnique="silhouette-soil-tube-root-cavity-instanced-volume-not-decal-only",t.userData.continuity="roof-soil-to-parapet-to-facade-root";const e=new L({color:4739129,roughness:.98,metalness:0,emissive:1383184,emissiveIntensity:.12}),a=new L({color:7902042,roughness:.9,metalness:0,emissive:1582102,emissiveIntensity:.12}),r=new L({color:5201209,roughness:1,metalness:0,emissive:1054477,emissiveIntensity:.08}),s=new L({color:1581598,roughness:.92,metalness:.06,emissive:462860,emissiveIntensity:.08}),i=28,n=new Be(O1(),new L({color:16777215,roughness:.86,metalness:0,vertexColors:!0,emissive:3294498,emissiveIntensity:.52}),yt.length*i);n.name="first-stage-structural-invasion-foliage-volumes",n.castShadow=!0,n.receiveShadow=!0,n.userData.visualOnly=!0,n.userData.navigationRole="none",n.userData.collisionRole="none",n.userData.runtimeSaveMutation=!1,n.userData.technique="opaque-instanced-3d-roof-and-facade-colonies";const o=new fe,A=new S,l=new ot,c=new S,d=new Y;let u=0;const h=(g,p,m,f,w,v,y,P)=>{const b=Math.cos(g.rotationY),x=Math.sin(g.rotationY);A.set(g.x-le.translation.x+p*b+f*x,m,g.z-le.translation.z-p*x+f*b),l.setFromEuler(new Ie((P%3-1)*.08,g.rotationY+P*.37,(P%4-1.5)*.045)),c.set(w,v,y),o.compose(A,l,c),n.setMatrixAt(u,o),d.setHSL(.22+P%5*.008,.42+P%3*.035,.48+P%4*.022),n.setColorAt(u,d),u+=1};for(const[g,p]of yt.entries()){const m=new R;m.name=`structural-invasion-${p.id}`,m.position.set(p.x-le.translation.x,0,p.z-le.translation.z),m.rotation.y=p.rotationY;for(let f=0;f<4;f+=1){const w=new I(new ge(p.width*(.18+f*.025),.8+f*.18,p.depth*(.16+(3-f)*.018)),e);w.name=`${p.id}-roof-soil-${f+1}`,w.position.set(-p.width*.32+f*p.width*.21,p.roofY+.45+f*.08,-p.depth*.16+f%2*p.depth*.22),w.rotation.y=(f-1)*.08,w.castShadow=!0,w.receiveShadow=!0,m.add(w)}for(let f=0;f<9;f+=1){const w=new I(new ba(.58,1,1,5),a);w.name=`${p.id}-roof-growth-${f+1}`,w.position.set(-p.width*.38+f*p.width*.095,p.roofY+3.3+f%3*1.15,p.depth*(f%2===0?.28:-.25)),w.rotation.set(.05*(f-2),f*.31,.08*(f%2)),w.scale.set(1.8+f%3*.55,4.6+f%2*1.7,1.7+(f+1)%3*.48),w.castShadow=!0,m.add(w)}for(let f=0;f<4;f+=1){const w=new I(new ge(p.width*(.2+f%2*.05),3.8+f%2*1.4,8+f%3*2),a);w.name=`${p.id}-parapet-growth-${f+1}`,w.position.set(-p.width*.33+f*p.width*.22,p.roofY+4.8+f%2*1.8,p.depth*.48),w.rotation.set(.05*(f%2),(f-1.5)*.035,(f%2?-1:1)*.08),w.castShadow=!0,m.add(w)}for(let f=0;f<10;f+=1){const w=p.roofY*(.28+f%3*.12),v=f>=6,y=f<8,P=v?p.width*(y?.5:-.5)+(y?2:-2):-p.width*.4+f*p.width*.16,b=v?-p.depth*.32+f%2*p.depth*.62:p.depth*.5+2,x=new So([new S(P+(v?0:f%2===0?-7:6),p.roofY+5,b+(v?f%2?5:-5:-4)),new S(P+(v?y?1:-1:f%3-1)*9,p.roofY-w*.28,b+(v?f%2?-7:7:1)),new S(P+(v?y?2:-2:f%2===0?8:-6),p.roofY-w*.68,b+(v?f%2?9:-9:2)),new S(P+(v?y?1:-1:f%3-1)*13,Math.max(8,p.roofY-w),b+(v?f%2?-13:13:3))]),B=new I(new Io(x,7,.78+f%3*.28,5,!1),f%3===0?r:a);B.name=`${p.id}-facade-runoff-${f+1}`,B.castShadow=!0,m.add(B);for(let E=0;E<2;E+=1){const M=x.getPoint(.34+E*.33),T=new I(new zn(1,0),a);T.name=`${p.id}-facade-growth-${f+1}-${E+1}`,T.position.copy(M),T.scale.set(1.45+E*.45,.9+f%2*.35,1.2+E*.3),T.rotation.set(f*.17,E*.8,-.1+f*.025),T.castShadow=!0,m.add(T)}}for(let f=0;f<6;f+=1){const w=f>=4,v=new I(new ge(w?2.4:p.width*(.09+f%2*.025),1.2+f%3*.35,w?p.depth*.12:3.2),a);v.name=`${p.id}-facade-ledge-growth-${f+1}`,v.position.set(w?p.width*(f===4?.5:-.5):-p.width*.3+f*p.width*.19,p.roofY*(.24+f%3*.18),w?p.depth*(f===4?.18:-.16):p.depth*.5+2.8),v.rotation.z=(f%2?-1:1)*.06,v.castShadow=!0,m.add(v)}for(let f=0;f<3;f+=1){const w=new I(new ge(p.width*(.09+f*.012),p.roofY*(.11+f%2*.035),3.8),s);w.name=`${p.id}-facade-cavity-${f+1}`,w.position.set(-p.width*.25+f*p.width*.25,p.roofY*(.38+f*.13),p.depth*.5+.8),w.rotation.z=(f-1)*.025,w.receiveShadow=!0,m.add(w)}for(let f=0;f<3;f+=1){const w=f-1,v=new So([new S(w*p.width*.18,4,p.depth*.5+4),new S(w*p.width*.28+(f%2?11:-8),2.4,p.depth*.62),new S(w*p.width*.38+(f%2?17:-13),1.2,p.depth*.72)]),y=new I(new Io(v,5,1.25,5,!1),r);y.name=`${p.id}-root-heave-${f+1}`,y.castShadow=!0,m.add(y)}for(let f=0;f<12;f+=1){const w=-.42+f%6*.168,v=f>=6;h(p,p.width*w,p.roofY+5.5+f%3*2.5,p.depth*(v?-.32:.34),11.5+f%3*3.2,6.5+f%4*2.2,8.5+(f+1)%3*2.8,g*i+f)}for(let f=0;f<16;f+=1){const w=f>=12,v=f%2===0?1:-1,y=p.roofY*(.18+f%4*.19);h(p,w?p.width*.51*v:p.width*(-.39+f%6*.156),y,w?p.depth*(-.26+f%4*.18):p.depth*.515,w?8.5:11.5+f%3*2.4,7.5+f%4*2.7,w?10+f%3*2.2:4.5+f%2*1.5,g*i+12+f)}m.traverse(f=>{f.userData.visualOnly=!0,f.userData.navigationRole="none",f.userData.collisionRole="none",f.userData.runtimeSaveMutation=!1}),t.add(m)}return n.instanceMatrix.needsUpdate=!0,n.instanceColor.needsUpdate=!0,t.add(n),t},N1=t=>{const e=new R;e.name="first-stage-r08-derived-building-family",e.userData.visualOnly=!0,e.userData.navigationRole="none",e.userData.collisionRole="none",e.userData.provenance=`derived-from:${le.candidateCommit}`,e.userData.derivativeBuildingCount=xn.length;for(const a of xn){const r=new R;r.name=`first-stage-derived-${a.id}`,r.position.set(a.targetCenter.x-le.translation.x,0,a.targetCenter.z-le.translation.z),r.rotation.y=a.rotationY,r.scale.set(a.scale.x,a.scale.y,a.scale.z),r.userData.semanticLandmarkId=`first-stage-derived:${a.id}`,r.userData.sourceStructuralId=le.sourceStructuralId,r.userData.derivativeProfile=a.id;const s=t.clone(!0);s.name=`${a.id}-r08-role-recombination`,s.position.set(-le.sourceCenter.x,0,-le.sourceCenter.z),s.traverse(i=>{i.userData.visualOnly=!0,i.userData.navigationRole="none",i.userData.collisionRole="none",i.userData.runtimeSaveMutation=!1,i.userData.provenance=`r08-scene-role-derivative:${a.id}`,delete i.userData.semanticRoot,delete i.userData.structuralId,delete i.userData.outputId,a.hiddenRoles.some(n=>i.name.includes(n))&&(i.visible=!1),i.name==="accepted-r08-fixed-camera-crown-fidelity"&&(i.visible=!1),i.name.includes("LANDMARK_GN_RUNOFF_GROWTH")&&(i.visible=!1),i instanceof I&&(i.castShadow=!0,i.receiveShadow=!0,i.material=Array.isArray(i.material)?i.material.map(n=>nl(n,a.materialTint)):nl(i.material,a.materialTint))}),r.add(s),r.traverse(i=>{i.userData.visualOnly=!0,i.userData.navigationRole="none",i.userData.collisionRole="none"}),e.add(r)}return e},H1=(t={})=>{const e=x1,a=D1(e),r=new R;r.name="first-stage-mvp-rainwater-control-tower",r.position.set(le.translation.x,le.translation.y,le.translation.z),r.userData.semanticSlotId=le.mvpSemanticSlotId,r.userData.sourceCommit=le.candidateCommit,r.userData.structuralId=le.sourceStructuralId,r.userData.visualOutputId=le.sourceVisualOutputId,r.userData.runtimeCollisionMutation=!1,r.userData.runtimeNavigationMutation=!1;const s=new AbortController;let i="loading",n=null,o=!1;const A=(c,d=null)=>{i=c,n=d,t.onStatus?.(i,n)},l=(async()=>{let c=null,d=null;try{const u=new Fn().loadAsync(b1),h=await fetch(sl,{signal:s.signal,cache:"no-store"});if(!h.ok)throw new Error(`Tower visual fetch failed with HTTP ${h.status}.`);const g=await h.arrayBuffer();if(g.byteLength!==a.bytes)throw new Error("Tower visual byte length differs from its manifest.");if(await M1(g)!==a.sha256)throw new Error("Tower visual SHA-256 differs from its manifest.");if(c=(await new vg().parseAsync(g,new URL(".",new URL(sl,globalThis.location.href)).href)).scene,d=await u,d.colorSpace=je,d.needsUpdate=!0,B1(c),c.traverse(f=>{if(!(f instanceof I))return;f.castShadow=!0,f.receiveShadow=!0,f.frustumCulled=!0,(Array.isArray(f.material)?f.material:[f.material]).forEach(S1)}),o){Gi(c),c=null;return}c.name="accepted-r08-rainwater-control-tower-visual",c.add(T1(c));const m=F1(d);r.add(c,N1(c),m,Q1(),U1()),d.dispose(),d=null,r.userData.derivativeBuildingCount=xn.length,r.userData.hybridBuildingFamily="r08-role-recombination-v1",r.userData.r08CrownCardCount=bn.length,r.userData.r08DerivedVegetationCount=m.userData.derivedVegetationCount,r.userData.r08DerivedVegetationDrawCalls=m.userData.drawCallBudget,r.userData.facadeInvasionCardCount=Vs.length,r.userData.structuralInvasionBuildingCount=yt.length,r.userData.specularStabilization="roughness-clamp-v1",c=null,A("ready")}catch(u){if(c!==null&&Gi(c),d?.dispose(),o||s.signal.aborted)return;A("error",u instanceof Error?u.message:"Tower visual load failed.")}})();return{group:r,manifest:e,artifact:a,ready:l,status:()=>i,error:()=>n,dispose(){o||(o=!0,s.abort(),Gi(r),r.clear(),A("disposed"))}}},qi=Object.freeze({x:1900,y:58,z:1045}),ol=Object.freeze([Object.freeze({id:"rail-civic",x:1120,y:104,z:760,color:16766877}),Object.freeze({id:"control-tower",x:1920,y:126,z:1080,color:16770488}),Object.freeze({id:"coastal-ruin",x:2820,y:92,z:860,color:12575967})]);function _1(){return Object.freeze(Array.from({length:19},(e,a)=>{const r=a/18,s=Math.sin(r*Math.PI);return Object.freeze({progress:r,centerX:1505+r*92+Math.sin(r*Math.PI*2.4)*34,z:360+r*1120,width:94+s*58+Math.sin(r*Math.PI*4)*8,bedDepth:5.8+s*3.2})}))}const Ar=Object.freeze({minimumX:720,maximumX:3180,minimumZ:360,maximumZ:1480}),Dn="fram:first-stage-mvp:activate-heavy-world",ta="data-first-stage-prelaunch-loading",Al="data-first-stage-prelaunch-loading-style";let ll=!1;const id=()=>typeof window<"u"&&(new URLSearchParams(window.location.search).get("firstStageMvp")==="r01"||/\/r1[123](?:\/|$)/i.test(window.location.pathname)),G1=()=>{if(document.head.querySelector(`[${Al}]`))return;const t=document.createElement("style");t.setAttribute(Al,"r01"),t.textContent=`
    [${ta}] {
      position: fixed; z-index: 9999; inset: 0; display: grid;
      align-content: center; justify-items: center; gap: 12px;
      padding: max(24px, env(safe-area-inset-top)) max(24px, env(safe-area-inset-right))
        max(24px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left));
      background: radial-gradient(circle at 62% 42%, rgb(82 154 126 / 20%), transparent 36%), #07100d;
      color: #e4e0ce; font-family: "Avenir Next Condensed", "Hiragino Sans", sans-serif;
      letter-spacing: .08em; pointer-events: all;
    }
    [${ta}] span { color: #c8794f; font-size: 10px; font-weight: 800; letter-spacing: .22em; }
    [${ta}] strong { font-size: clamp(15px, 4vw, 22px); }
    [${ta}] i { width: min(360px, 72vw); height: 3px; overflow: hidden; background: rgb(228 224 206 / 18%); }
    [${ta}] i::after { display: block; width: 42%; height: 100%; background: linear-gradient(90deg, #c8794f, #79e4db); content: ""; animation: first-stage-prelaunch 1.05s ease-in-out infinite alternate; }
    @keyframes first-stage-prelaunch { from { transform: translateX(-24%); } to { transform: translateX(162%); } }
    @media (prefers-reduced-motion: reduce) { [${ta}] i::after { animation: none; width: 68%; } }
  `,document.head.append(t)},X1=()=>{if(!id()||typeof document>"u")return null;const t=document.body.querySelector(`[${ta}]`);if(t!==null)return t;G1();const e=document.createElement("aside");return e.setAttribute(ta,"r01"),e.setAttribute("role","status"),e.setAttribute("aria-live","assertive"),e.innerHTML=`
    <span>EXPEDITION / PREPARING</span>
    <strong>雨庭区の地形と操作系を起動しています</strong>
    <i aria-hidden="true"></i>
  `,document.body.append(e),e},q1=()=>{typeof document>"u"||document.body.querySelector(`[${ta}]`)?.remove()},Y1=()=>{ll||typeof document>"u"||!id()||(ll=!0,document.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest('[data-action="new-expedition"], [data-action="continue"]');if(!(a===null||a.hasAttribute("disabled"))){if(a.dataset.firstStagePrelaunchReady==="true"){delete a.dataset.firstStagePrelaunchReady;return}t.preventDefault(),t.stopImmediatePropagation(),X1(),requestAnimationFrame(()=>{window.setTimeout(()=>{a.dataset.firstStagePrelaunchReady="true",a.click()},18)})}},{capture:!0}))},Yi=t=>{t.dispatchEvent(new Event(Dn))},j1=(t,e)=>t==="error"||e==="error"?{phase:"fallback",progress:100,label:"軽量景観で継続できます",playable:!0}:t==="deferred"||t==="disabled"?{phase:"waiting",progress:24,label:"高密度景観を背景で準備します",playable:!0}:t==="loading"?{phase:"building",progress:62,label:"廃都景観を構築中 · 操作できます",playable:!0}:e==="loading"||e==="deferred"?{phase:"landmark",progress:84,label:"雨水管制塔を読み込み中 · 操作できます",playable:!0}:{phase:"ready",progress:100,label:"景観の準備ができました",playable:!0},wa=Object.freeze({center:{x:2040,y:1025},valve:{x:2040,y:1165,interactionRadius:110},declaredFootprint:{x:1867.5,y:900,width:345,height:250},atrium:{x:1979.5,y:985,width:122,height:122},cistern:{x:1990.5,y:1011,width:105,height:87}}),W1=[{id:"mvp-tower-left-wing",kind:"building",bounds:{x:1882.5,y:915,width:92,height:205},solid:!0,height:214},{id:"mvp-tower-right-wing",kind:"building",bounds:{x:2107.5,y:915,width:90,height:205},solid:!0,height:214},{id:"mvp-tower-rear-span",kind:"building",bounds:{x:1967.5,y:915,width:150,height:68},solid:!0,height:206},{id:"mvp-tower-cistern",kind:"water",bounds:{...wa.cistern},solid:!1,height:3}],V1=[{id:"mvp-civic-apartment",kind:"building",bounds:{x:1062.5,y:456.5,width:151.3,height:86.8},solid:!0,height:95},{id:"mvp-civic-clinic",kind:"building",bounds:{x:1074.8,y:777,width:138.9,height:78.2},solid:!0,height:69},{id:"mvp-rail-cut-north",kind:"wall",bounds:{x:770,y:420,width:560,height:44},solid:!0,height:46},{id:"mvp-rail-cut-south",kind:"wall",bounds:{x:840,y:1304,width:520,height:44},solid:!0,height:40},{id:"mvp-basin-rock-north",kind:"rock",bounds:{x:1525,y:485,width:128,height:98},solid:!0,height:52},{id:"mvp-basin-rock-south",kind:"rock",bounds:{x:1690,y:1375,width:156,height:112},solid:!0,height:58},{id:"mvp-basin-north-intake",kind:"building",bounds:{x:1742,y:382.5,width:186,height:135},solid:!0,height:181},{id:"mvp-overflow-channel",kind:"water",bounds:{x:1470,y:1205,width:680,height:62},solid:!1,height:3},{id:"mvp-river-north",kind:"water",bounds:{x:1456,y:360,width:134,height:330},solid:!1,height:3},{id:"mvp-river-middle",kind:"water",bounds:{x:1480,y:690,width:156,height:310},solid:!1,height:3},{id:"mvp-river-south",kind:"water",bounds:{x:1492,y:1e3,width:168,height:300},solid:!1,height:3},{id:"mvp-river-mouth",kind:"water",bounds:{x:1468,y:1300,width:184,height:190},solid:!1,height:3},{id:"mvp-river-crossing-rail",kind:"wall",bounds:{x:1430,y:862,width:244,height:44},solid:!1,height:9},{id:"mvp-river-crossing-service",kind:"wall",bounds:{x:1455,y:1158,width:232,height:38},solid:!1,height:7},{id:"mvp-coastal-municipal-block",kind:"building",bounds:{x:2421.5,y:1133.5,width:137.5,height:82.5},solid:!0,height:53},{id:"mvp-coastal-shelter",kind:"building",bounds:{x:2432.5,y:1419.5,width:126.5,height:71.5},solid:!0,height:43},{id:"mvp-tunnel-flank-north",kind:"wall",bounds:{x:2370,y:410,width:580,height:42},solid:!0,height:56},{id:"mvp-tunnel-flank-south",kind:"wall",bounds:{x:2390,y:1350,width:600,height:42},solid:!0,height:56},{id:"mvp-coastal-relay-stack",kind:"building",bounds:{x:3093.5,y:590,width:173,height:120},solid:!0,height:226}],ji=Object.freeze(["mvp-tower-left-wing","mvp-tower-right-wing","mvp-tower-rear-span","mvp-tower-cistern","mvp-civic-apartment","mvp-civic-clinic","mvp-coastal-municipal-block","mvp-coastal-shelter","mvp-basin-north-intake","mvp-coastal-relay-stack"]),cl=[{id:"mvp-rail-switch",kind:"relay",x:1090,y:1190,rotation:-.2,landmarkId:"fork",interactive:!0},{id:"mvp-wet-spoor",kind:"anomaly-marker",x:1610,y:590,rotation:.35,landmarkId:"fork",interactive:!0},{id:"mvp-overflow-gauge",kind:"relay",x:1780,y:1312,rotation:.08,landmarkId:"fork",interactive:!0},{id:"mvp-control-valve",kind:"relay",x:wa.valve.x,y:wa.valve.y,rotation:Math.PI,landmarkId:"fork",interactive:!0},{id:"mvp-tunnel-draft",kind:"anomaly-marker",x:2610,y:1245,rotation:-.1,landmarkId:"ruin",interactive:!0},{id:"mvp-rail-lamp-west",kind:"lamp",x:920,y:880,rotation:0,landmarkId:"fork",interactive:!1},{id:"mvp-rail-lamp-east",kind:"lamp",x:1410,y:920,rotation:0,landmarkId:"fork",interactive:!1},{id:"mvp-civic-platform-sign",kind:"signpost",x:1360,y:715,rotation:Math.PI/2,landmarkId:"fork",interactive:!1},{id:"mvp-river-bank-tree-a",kind:"dead-tree",x:1420,y:560,rotation:.22,landmarkId:"fork",interactive:!1},{id:"mvp-river-bank-tree-b",kind:"dead-tree",x:1690,y:1090,rotation:-.28,landmarkId:"fork",interactive:!1},{id:"mvp-tower-approach-lamp",kind:"lamp",x:1835,y:1185,rotation:0,landmarkId:"fork",interactive:!1},{id:"mvp-coastal-signal-frame",kind:"relay",x:2740,y:1195,rotation:.16,landmarkId:"ruin",interactive:!1},{id:"mvp-tunnel-warning-post",kind:"signpost",x:2890,y:1285,rotation:-.12,landmarkId:"ruin",interactive:!1}],K1=[{id:"mvp-warm-table",kind:"contract-board",x:455,y:1050,rotation:Math.PI/2,landmarkId:"town",interactive:!1},{id:"mvp-warm-lamp-a",kind:"lamp",x:410,y:1020,rotation:0,landmarkId:"town",interactive:!1},{id:"mvp-warm-lamp-b",kind:"lamp",x:500,y:1080,rotation:0,landmarkId:"town",interactive:!1}],J1=[{id:"rail-switch",propId:"mvp-rail-switch",x:1090,y:1190,interactionRadius:92,action:"転轍痕を読む",label:"旧線路の手動転轍器",finding:"新しい擦過痕は盆地側だけに偏る。追跡は線路そのものより湿り気へ寄っている。"},{id:"wet-spoor",propId:"mvp-wet-spoor",x:1610,y:590,interactionRadius:88,action:"活動痕を照合する",label:"河岸の湿った活動痕",finding:"機械の圧痕と生体由来らしい粘液が重なる。ただし種、由来、年代は判定できない。"},{id:"overflow-gauge",propId:"mvp-overflow-gauge",x:1780,y:1312,interactionRadius:96,action:"水位差を測る",label:"越流路の旧水位計",finding:"塔の手前でだけ水位と電位が同時に上がる。弁操作で連成を崩せる可能性がある。"},{id:"tunnel-draft",propId:"mvp-tunnel-draft",x:2610,y:1245,interactionRadius:94,action:"風と反響を読む",label:"海側トンネルの通風孔",finding:"反響は奥からではなく管制塔側へ戻っている。倒す以外に流れを切る余地が残る。"}],Z1={"old-rail":[{id:"mvp-rail-hound-a",kind:"scrap-hound",x:920,y:700},{id:"mvp-rail-hound-b",kind:"scrap-hound",x:1080,y:780},{id:"mvp-rail-shell-a",kind:"relay-shell",x:1285,y:1050}],"old-rail-switch":[{id:"mvp-switch-hound-a",kind:"scrap-hound",x:1040,y:1320},{id:"mvp-switch-lurker-a",kind:"culvert-lurker",x:1250,y:1410},{id:"mvp-switch-shell-a",kind:"relay-shell",x:1390,y:1245}],"basin-bank":[{id:"mvp-basin-hound-a",kind:"scrap-hound",x:1600,y:650},{id:"mvp-basin-lurker-a",kind:"culvert-lurker",x:1785,y:590},{id:"mvp-basin-murmur-a",kind:"murmur",x:2090,y:1340}],"basin-overflow":[{id:"mvp-overflow-shell-a",kind:"relay-shell",x:1600,y:1455},{id:"mvp-overflow-murmur-a",kind:"murmur",x:1900,y:1470},{id:"mvp-overflow-hound-a",kind:"scrap-hound",x:2125,y:1385}],"tower-perimeter":[{id:"mvp-tower-shell-elite",kind:"relay-shell",rank:"elite",x:1790,y:1030},{id:"mvp-tower-hound-a",kind:"scrap-hound",x:2015,y:820},{id:"mvp-tower-murmur-a",kind:"murmur",x:2285,y:1030},{id:"mvp-tower-hound-b",kind:"scrap-hound",x:2155,y:1270}],"ruin-approach":[{id:"mvp-ruin-shell-a",kind:"relay-shell",x:2480,y:680},{id:"mvp-ruin-murmur-a",kind:"murmur",x:2690,y:1100},{id:"mvp-ruin-lurker-a",kind:"culvert-lurker",x:2520,y:920}],"tunnel-flank":[{id:"mvp-flank-lurker-elite",kind:"culvert-lurker",rank:"elite",x:2530,y:1390},{id:"mvp-flank-hound-b",kind:"scrap-hound",x:2760,y:1445},{id:"mvp-flank-murmur-a",kind:"murmur",x:2970,y:1320}],"ruin-interior":[{id:"mvp-interior-shell-a",kind:"relay-shell",x:2825,y:730},{id:"mvp-interior-shell-b",kind:"relay-shell",x:3040,y:1045},{id:"mvp-interior-murmur-a",kind:"murmur",x:3115,y:760}],"return-pressure":[{id:"mvp-return-hound-a",kind:"scrap-hound",x:1520,y:760},{id:"mvp-return-murmur-a",kind:"murmur",x:1250,y:1050},{id:"mvp-return-hound-b",kind:"scrap-hound",x:1080,y:870}],"return-pressure-b":[{id:"mvp-return-shell-b",kind:"relay-shell",x:2260,y:810},{id:"mvp-return-hound-c",kind:"scrap-hound",x:2020,y:1350},{id:"mvp-return-murmur-b",kind:"murmur",x:1780,y:520}]},$1=(t,e)=>t<720?"settlement":t<1470?"old-rail":Math.hypot(t-wa.center.x,e-wa.center.y)<=390?"control-tower":t<2360?"river-basin":"coastal-tunnel",dl=(t,e,a)=>J1.filter(s=>!a.includes(s.id)).map(s=>({site:s,distance:Math.hypot(t-s.x,e-s.y)})).filter(({site:s,distance:i})=>i<=s.interactionRadius).sort((s,i)=>s.distance-i.distance)[0]?.site??null,Bn="first-stage-mvp:visual-quality",et=Object.freeze({minimum:0,maximum:1.5,step:.25,defaultStrength:1,compactViewportMaximum:1,compactViewportScale:2/3,compactViewportWidth:900,storageKey:"fram:first-stage-mvp:r11-hybrid:dof-strength"}),As=t=>{if(t==null||t==="")return et.defaultStrength;const e=typeof t=="number"?t:Number(t);if(!Number.isFinite(e))return et.defaultStrength;const a=Math.min(et.maximum,Math.max(et.minimum,e));return Math.round(a/et.step)*et.step},Pn=(t,e)=>{const a=As(t);return e<=et.compactViewportWidth?Math.min(a*et.compactViewportScale,et.compactViewportMaximum):a},nd=(t=od())=>{if(t===null)return et.defaultStrength;try{return As(t.getItem(et.storageKey))}catch{return et.defaultStrength}},ew=(t,e=od())=>{const a=As(t);if(e!==null)try{e.setItem(et.storageKey,String(a))}catch{}return a},ul=(t,e)=>{const a=As(e);return t.dispatchEvent(new CustomEvent(Bn,{detail:{requestedDofStrength:a}})),a},tw=t=>{if(!(t instanceof CustomEvent))return null;const e=t.detail;return e===null||typeof e!="object"?null:{requestedDofStrength:As(e.requestedDofStrength)}},od=()=>{if(typeof window>"u")return null;try{return window.localStorage}catch{return null}};function aw(t){return{length:Math.max(150,t.radius*1.22),halfWidth:Math.max(48,t.radius*.34),shardCount:18,duration:.72,cameraTrauma:.94,profile:"directional-fracture-wedge"}}function hl(t){switch(t.type){case"auto-chain-resolved":return t.chainStep===1?null:{tone:"auto-chain",text:`AUTO ×${t.chainStep}`,emphasis:t.chainStep===3?"strong":"standard",anchor:t.targetId===null?"player":"enemy",enemyId:t.targetId??void 0};case"action-link-resolved":return{tone:"link",text:`LINK ${t.chainStep}`,emphasis:t.chainStep>=2?"strong":"standard",anchor:t.exposedTargetId===null?"player":"enemy",enemyId:t.exposedTargetId??void 0};case"enemy-damaged":return{tone:"enemy-damage",text:`${t.amount}`,emphasis:t.source==="impact"||t.source==="relic"?"strong":"standard",anchor:"enemy",enemyId:t.enemyId};case"player-damaged":return{tone:"player-damage",text:`-${t.amount}`,emphasis:"strong",anchor:"player"};case"item-used":return{tone:"healing",text:`+${t.healed}`,emphasis:"strong",anchor:"player"};case"guard-resolved":return{tone:t.justGuard?"just-guard":"guard",text:t.justGuard?"完全防御":`防御 ${t.preventedDamage}`,emphasis:t.justGuard?"strong":"standard",anchor:"player"};case"enemy-defeated":return null;case"passive-guard-resolved":return{tone:"passive-guard",text:"自動防御",emphasis:"standard",anchor:"player"};case"player-dodged":return{tone:"dodge",text:"回避",emphasis:"standard",anchor:"player"};default:return null}}function rw(t,e,a,r,s){const i=t.x-e,n=t.y-a,o=i*i+n*n<=560*560,A=t.active&&t.disposition==="hostile"&&!t.defeated,l=t.rank==="boss"||t.kind==="named-anomaly"?"boss":t.rank==="elite"?"elite":"standard";return{visible:A&&(o||t.id===r||s||l!=="standard"),ratio:t.maxHp<=0?0:Math.max(0,Math.min(1,t.hp/t.maxHp)),prominence:l}}const Ts=854,Rs=480,sw=600,iw=360,nw=390,ow=.98,Aw=.92,fl=2.24,lw=1075,cw=new S(yr.x,yr.y,yr.z),dw=new S(yr.x,ve.camera.offsetY,yr.z),mo=2.1,Ad=2,pl=4,uw=3.4,zs=1.08,Ls=64,hw=14148051,Wi=ss(Ir,"weapon",di),pr=ss(is,"grip",mo),lr=ss(is,"tip",mo),En=ss(ui,"grip",Ad),Fs=new S;function fw(t){return{start:Math.max(0,t.contactProgress-(t.chainStep===2?.3:.26)),end:Math.min(1,t.contactProgress+(t.chainStep===3?.2:.17))}}function pw(t,e,a,r,s){t.setXYZ(e*2,C.lerp(a.x,r.x,s),C.lerp(a.y,r.y,s),C.lerp(a.z,r.z,s)),t.setXYZ(e*2+1,r.x,r.y,r.z)}function ml(t){const e=Math.max(32,t),a=new Uint8Array(e*e*4);for(let s=0;s<e;s+=1)for(let i=0;i<e;i+=1){const n=i/e*Math.PI*2,o=s/e*Math.PI*2,A=Math.sin(n*3+o*1.7)*.34+Math.sin(n*7-o*2.3)*.16,l=Math.cos(o*4-n*1.4)*.3+Math.cos(o*9+n*2.1)*.14,c=1/Math.sqrt(A*A+l*l+1),d=(s*e+i)*4;a[d]=Math.round((A*c*.5+.5)*255),a[d+1]=Math.round((l*c*.5+.5)*255),a[d+2]=Math.round(c*255),a[d+3]=255}const r=new Da(a,e,e,Ya,ya);return r.name=`r10-water-ripple-normal-${e}`,r.wrapS=We,r.wrapT=We,r.repeat.set(6,6),r.minFilter=xa,r.magFilter=at,r.generateMipmaps=!0,r.needsUpdate=!0,r}function mw(t,e=280){const a=t.getAttribute("position"),r=t.getAttribute("normal");if(a===void 0||r===void 0)return;const s=new Float32Array(a.count*2);for(let i=0;i<a.count;i+=1){const n=a.getX(i),o=a.getY(i),A=a.getZ(i),l=Math.abs(r.getX(i)),c=Math.abs(r.getY(i)),d=Math.abs(r.getZ(i)),u=i*2;c>=l&&c>=d?(s[u]=n/e,s[u+1]=A/e):l>=d?(s[u]=A/e,s[u+1]=o/e):(s[u]=n/e,s[u+1]=o/e)}t.setAttribute("uv",new He(s,2))}function gw(t,e){const a=t.image.data,r=new Uint8Array(a.length);for(let i=0;i<a.length;i+=4){const n=((a[i]??0)*.2126+(a[i+1]??0)*.7152+(a[i+2]??0)*.0722)/255,o=Math.round(174+n*81);r[i]=o,r[i+1]=o,r[i+2]=o,r[i+3]=255}const s=new Da(r,t.image.width,t.image.height,Ya,ya);return s.name=e,s.colorSpace=je,s.wrapS=We,s.wrapT=We,s.repeat.copy(t.repeat),s.magFilter=at,s.minFilter=xa,s.generateMipmaps=!0,s.needsUpdate=!0,s}function Vi(t,e,a){const r=t.image.data,s=t.image.width,i=t.image.height,n=new Uint8Array(e*e*4);for(let A=0;A<e;A+=1){const l=Math.min(i-1,Math.floor((A+.5)/e*i));for(let c=0;c<e;c+=1){const d=Math.min(s-1,Math.floor((c+.5)/e*s)),u=(l*s+d)*4,h=(A*e+c)*4;n[h]=r[u]??0,n[h+1]=r[u+1]??0,n[h+2]=r[u+2]??0,n[h+3]=r[u+3]??255}}const o=new Da(n,e,e,Ya,ya);return o.name=a,o.colorSpace=t.colorSpace,o.wrapS=t.wrapS,o.wrapT=t.wrapT,o.repeat.copy(t.repeat),o.magFilter=at,o.minFilter=xa,o.generateMipmaps=!0,o.needsUpdate=!0,o}function ne(t){return t==="r05-fram"||t==="r07-fram"||t==="r08-fram"||t==="r09-fram"}function Ki(t){return t==="r07-fram"||t==="r08-fram"}function Os(t){return t==="r09-fram"?Dp.lighting:ve.lighting}class ww{renderer;qualityProfile;environmentProfile;presentationProfile;sharpPresentation;northStarVisualCell;visualStabilityProfile;ws1ActionFeel;onWs1VisualContact;onWs1VisualDefeat;reducedMotion;firstStageLandmark;firstStageWorldArt;cameraCompositionProfile;cameraZoomMultiplier;baseCameraViewHeight;cameraViewHeight;ultraPipeline=null;scene=new gu;atmospherePresentation=new R;camera;environmentArt;cameraTarget=new S;worldMemoryEffects;memoryPresentation=new R;memoryRelicAura=new R;playerGroup=new R;playerBody;playerHeroVisual;heroPresentation;heroWorldScale;bladeMesh;impactMesh;bladeTrailBaseLocal=new S;bladeTrailTipLocal=new S;bladeTrailBaseWorld=new S;bladeTrailTipWorld=new S;activeBladeTrail=null;pendingWs1DamageEvents=[];pendingWs1DefeatEvents=[];playerShadow;playerShadowProxy;companionGroup=new R;companionBody;companionBeautyVisual;companionShadow;enemyVisuals=new Map;enemyDefeatAnimations=new Map;enemyHealthBars=new Map;enemyRecentlyDamagedUntil=new Map;enemyReactions=new Map;combatTextEffects=[];lootVisuals=new Map;ringEffects=[];slashTrailEffects=[];burstEffects=[];impactSparkGeometry=new ge(2.2,15,2.2);footDustGeometry=new ge(9,4,6);groundRuptureEffects=[];targetRing;windupRing;reusableMatrix=new fe;reusablePosition=new S;reusableQuaternion=new ot;reusableScale=new S(1,1,1);reusableDirection=new S;keyLight=new ln(16771261,2.45);keyLightTarget=new ia;effectLight=new va(6415825,0,390,2);contextLostHandler;contextRestoredHandler;environmentTarget=null;localReflectionTarget=null;surfaceLibrary=null;effectiveSurfaceSets=new Map;surfaceDetailTextures=[];waterNormalTexture=null;waterClearcoatNormalTexture=null;vegetationWindTimeUniform=null;riverFoamTimeUniform=null;ambientBirds=null;ambientInsects=null;ambientRipples=null;ambientLeaves=null;ambientLeafOrigins=[];livingWaterSections;waterWorldMaterials=new Set;reflectiveWorldMaterials=new Set;waterWorldObjects=new Set;atmosphereTexture=null;groundTexture=null;attackAnimation=0;attackAnimationRate=4.8;attackWeapon="blade";attackContact=null;lastAttackDirectionX=0;lastAttackDirectionY=-1;localHitstopSeconds=0;entryLungeWasActive=!1;effectLightEnergy=0;internalRenderWidth=Ts;internalRenderHeight=Rs;viewportCssWidth=0;viewportCssHeight=0;resizeObserver=null;windowResizeHandler=null;firstStageVisualQualityHandler=null;firstStageWorldActivationHandler=null;firstStageWorldArtFrame=null;firstStageWorldArtTimer=null;firstStageRequestedDofStrength=1;companionInitialized=!1;companionReaction=0;cameraTrauma=0;cameraImpactDirectionX=0;cameraImpactDirectionZ=-1;heroHurtAnimation=0;heroSkillAnimation=0;heroDashAnimation=0;heroGuardAnimation=0;heroLinkAnimation=0;lastPlayerX=null;lastPlayerY=null;elapsed=0;disposed=!1;cameraOffset(){return ne(this.presentationProfile)?dw:cw}effectiveMaximumDevicePixelRatio(){return rg(this.qualityProfile,ne(this.presentationProfile))}effectiveShadowHalfExtent(){return(ne(this.presentationProfile)?Os(this.presentationProfile).shadowHalfExtent:this.environmentProfile==="r04-live"?G.lighting.shadowHalfExtent:460)*this.visualStabilityProfile.shadow.frustumScale}constructor(e,a,r={}){this.qualityProfile=ag(r.qualityProfile??"mobile-safe"),this.worldMemoryEffects=r.worldMemoryEffects??null,this.environmentProfile=r.environmentProfile??"start-town",this.presentationProfile=r.presentationProfile??(this.environmentProfile==="r04-live"?"r04":"default"),this.sharpPresentation=r.sharpPresentation??!1,this.northStarVisualCell=r.northStarVisualCell??!1,this.visualStabilityProfile=r.visualStabilityProfile??Ws,this.ws1ActionFeel=r.ws1ActionFeel===!0,this.onWs1VisualContact=r.onWs1VisualContact??null,this.onWs1VisualDefeat=r.onWs1VisualDefeat??null,this.reducedMotion=typeof window<"u"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches===!0,this.cameraCompositionProfile=r.cameraCompositionProfile??(this.environmentProfile==="r04-live"?"r04":"baseline"),this.cameraZoomMultiplier=Number.isFinite(r.cameraZoomMultiplier)&&(r.cameraZoomMultiplier??0)>=.75&&(r.cameraZoomMultiplier??0)<=1.25?r.cameraZoomMultiplier??1:1,this.baseCameraViewHeight=ne(this.presentationProfile)?this.qualityProfile.presentation.cameraViewHeight:this.environmentProfile==="r04-live"?G.camera.viewHeight:this.environmentProfile==="beauty-cell"?nw:this.qualityProfile.presentation.masterCamera?iw:sw,this.cameraViewHeight=this.baseCameraViewHeight/this.cameraZoomMultiplier,this.renderer=new wu({antialias:this.qualityProfile.antialiasing.contextMsaa,alpha:!1,depth:!0,powerPreference:"high-performance",precision:"highp",preserveDrawingBuffer:!1}),kp(this.renderer,ne(this.presentationProfile)?ve.display.exposure:this.environmentProfile==="r04-live"?G.display.exposure:this.environmentProfile==="beauty-cell"?Aw:this.qualityProfile.presentation.masterDirectLighting?ow:void 0),this.renderer.shadowMap.enabled=this.qualityProfile.shadows.enabled,this.renderer.shadowMap.type=this.qualityProfile.shadows.filter==="vsm"?vu:yu,this.renderer.setPixelRatio(Math.min(this.effectiveMaximumDevicePixelRatio(),Math.max(1,window.devicePixelRatio||1))),this.renderer.setSize(Ts,Rs,!1),this.renderer.domElement.dataset.testid="game-canvas",this.renderer.domElement.dataset.antialias=this.renderer.getContextAttributes().antialias===!0?"msaa":"none",this.renderer.domElement.dataset.qualityProfile=this.qualityProfile.id,this.renderer.domElement.dataset.qualityProfileSchema=String(this.qualityProfile.schemaVersion),this.renderer.domElement.dataset.qualityDprCap=String(this.effectiveMaximumDevicePixelRatio()),this.renderer.domElement.dataset.qualityRenderScale=String(this.qualityProfile.resolution.renderScale),this.renderer.domElement.dataset.qualityShadowMap=String(this.qualityProfile.shadows.mapSize),this.renderer.domElement.dataset.qualityEffectBudget=this.qualityProfile.effects.budget,this.renderer.domElement.dataset.qualityCameraViewHeight=String(this.cameraViewHeight),this.renderer.domElement.dataset.cameraZoomMultiplier=String(this.cameraZoomMultiplier),this.renderer.domElement.dataset.qualitySurfaceDetail=this.qualityProfile.effects.surfaceDetail.mode,this.renderer.domElement.dataset.qualitySurfaceResolution=String(this.qualityProfile.effects.surfaceDetail.maximumResolution),this.renderer.domElement.dataset.qualityReflectionCoverage=this.qualityProfile.effects.surfaceDetail.reflectionCoverage,this.renderer.domElement.dataset.qualityMaterialCoverage=this.qualityProfile.effects.surfaceDetail.materialCoverage,this.renderer.domElement.dataset.qualityMiniatureMode=this.qualityProfile.post.finish.miniatureDepth.mode,this.renderer.domElement.dataset.qualityMiniatureFocusTarget=this.qualityProfile.post.finish.miniatureDepth.focusTarget,this.renderer.domElement.dataset.qualityMiniatureFocusPlane=this.qualityProfile.post.finish.miniatureDepth.focusPlane,this.renderer.domElement.dataset.qualityMiniatureFocusRangeWorld=String(this.qualityProfile.post.finish.miniatureDepth.focusRangeWorldUnits),this.renderer.domElement.dataset.qualityMiniatureBandHalfHeight=String(this.qualityProfile.post.finish.miniatureDepth.bandHalfHeight),this.renderer.domElement.dataset.qualityMiniatureRampExponent=String(this.qualityProfile.post.finish.miniatureDepth.rampExponent),this.renderer.domElement.dataset.qualityWaterMode=this.qualityProfile.effects.water.mode,this.renderer.domElement.dataset.qualityWaterReflectionResolution=String(this.qualityProfile.effects.water.reflectionResolution),this.renderer.domElement.dataset.qualityWaterNormalResolution=String(this.qualityProfile.effects.water.normalResolution),this.renderer.domElement.dataset.qualityWaterClearcoat=String(this.qualityProfile.effects.water.clearcoat),this.renderer.domElement.dataset.qualityWaterRoughness=String(this.qualityProfile.effects.water.roughness),this.renderer.domElement.dataset.qualityWaterFlowNormalLayers=String(this.qualityProfile.effects.water.flowNormalLayers),this.renderer.domElement.dataset.qualityWaterFoamSegments=String(this.qualityProfile.effects.water.foamSegmentCount),this.renderer.domElement.dataset.qualityAmbientLife=JSON.stringify(this.qualityProfile.effects.ambientLife),this.renderer.domElement.dataset.northStarVisualCell=this.northStarVisualCell?KA:"none",this.renderer.domElement.dataset.visualStability=this.visualStabilityProfile.mode,this.renderer.domElement.dataset.visualStabilityTemporal=this.visualStabilityProfile.temporal.strategy,this.renderer.domElement.dataset.visualStabilityReflection=this.visualStabilityProfile.reflection.strategy,this.renderer.domElement.dataset.visualStabilityShadow=this.visualStabilityProfile.shadow.strategy,this.renderer.domElement.dataset.visualStabilityRoadAggregate=this.visualStabilityProfile.road.looseAggregate,this.renderer.domElement.dataset.qualityTerrainRelief=String(this.qualityProfile.effects.terrain.geometryRelief),this.renderer.domElement.dataset.qualityTerrainNormalDetail=String(this.qualityProfile.effects.terrain.normalDetail),this.renderer.domElement.dataset.qualityAtmosphere=`${this.qualityProfile.effects.atmosphere.lightShaftCount} shafts / ${this.qualityProfile.effects.atmosphere.dustParticleCount} dust`,this.renderer.domElement.dataset.qualityDynamicLightReceiver=String(this.qualityProfile.effects.dynamicLight.attackReceiverFraction),this.renderer.domElement.dataset.qualityDynamicLightRange=String(this.qualityProfile.effects.dynamicLight.range),this.renderer.domElement.dataset.qualityDynamicLightPeak=String(this.qualityProfile.effects.dynamicLight.peakIntensity),this.renderer.domElement.dataset.qualityPlayerAttackLight=this.qualityProfile.effects.dynamicLight.playerAttackLight,this.renderer.domElement.dataset.qualityFogNearMultiplier=String(this.qualityProfile.effects.atmosphere.fogNearMultiplier),this.renderer.domElement.dataset.qualityFogFarMultiplier=String(this.qualityProfile.effects.atmosphere.fogFarMultiplier),this.renderer.domElement.dataset.qualitySunMultiplier=String(this.qualityProfile.effects.atmosphere.sunIntensityMultiplier),this.renderer.domElement.dataset.qualitySkyFillMultiplier=String(this.qualityProfile.effects.atmosphere.skyFillMultiplier),this.renderer.domElement.dataset.qualityRimMultiplier=String(this.qualityProfile.effects.atmosphere.rimIntensityMultiplier),this.renderer.domElement.dataset.qualityLightShaftCount=String(this.qualityProfile.effects.atmosphere.lightShaftCount),this.renderer.domElement.dataset.qualityDustParticleCount=String(this.qualityProfile.effects.atmosphere.dustParticleCount),this.renderer.domElement.dataset.qualityWaterMistCount=String(this.qualityProfile.effects.atmosphere.waterMistCount),this.renderer.domElement.dataset.qualityVegetationWind=String(this.qualityProfile.effects.atmosphere.vegetationWindStrength),this.renderer.domElement.dataset.qualityContextMsaa=String(this.qualityProfile.antialiasing.contextMsaa),this.renderer.domElement.dataset.qualityPostEnabled=String(this.qualityProfile.post.enabled),this.renderer.domElement.dataset.qualityHdr=String(this.qualityProfile.post.hdr),this.renderer.domElement.dataset.qualityPostSmaa=String(this.qualityProfile.antialiasing.postSmaa),this.renderer.domElement.dataset.qualityGtao=String(this.qualityProfile.post.gtao),this.renderer.domElement.dataset.qualityGtaoResolutionScale=String(this.qualityProfile.post.gtaoResolutionScale),this.renderer.domElement.dataset.qualityBloom=String(this.qualityProfile.post.bloom),this.renderer.domElement.dataset.qualityFinishLook=this.qualityProfile.post.finish.look,this.renderer.domElement.dataset.qualityFinishExposure=String(this.qualityProfile.post.finish.exposure),this.renderer.domElement.dataset.qualityFinishContrast=String(this.qualityProfile.post.finish.contrast),this.renderer.domElement.dataset.qualityFinishSaturation=String(this.qualityProfile.post.finish.saturation),this.renderer.domElement.dataset.qualityFinishTint=String(this.qualityProfile.post.finish.tint),this.renderer.domElement.dataset.qualityFinishChromaTintFloor=String(this.qualityProfile.post.finish.chromaTintFloor),this.renderer.domElement.dataset.qualityVoxelClarity=String(this.qualityProfile.post.finish.voxelClarity),this.renderer.domElement.dataset.qualityVoxelEdge=String(this.qualityProfile.post.finish.voxelEdge),this.renderer.domElement.dataset.qualityFinishShadowCool=String(this.qualityProfile.post.finish.shadowCool),this.renderer.domElement.dataset.qualityFinishHighlightWarm=String(this.qualityProfile.post.finish.highlightWarm),this.renderer.domElement.dataset.qualityFinishVignette=String(this.qualityProfile.post.finish.vignette),this.renderer.domElement.dataset.qualityShadowFilter=this.qualityProfile.shadows.filter,this.renderer.domElement.dataset.qualityShadowRadius=String(this.qualityProfile.shadows.radius),this.renderer.domElement.dataset.qualityPracticalLights=String(this.qualityProfile.effects.practicalLightCount),this.renderer.domElement.dataset.qualityEnvironmentResponse=String(this.qualityProfile.effects.environmentResponse),this.renderer.domElement.dataset.qualityEnvironmentSource=this.qualityProfile.effects.environmentSource,this.renderer.domElement.dataset.qualityEmissiveResponse=String(this.qualityProfile.effects.emissiveResponse),this.renderer.domElement.dataset.qualityAttackEchoes=String(this.qualityProfile.effects.attackEchoes),this.renderer.domElement.dataset.qualityAttackSparkCount=String(this.qualityProfile.effects.attackSparkCount),this.renderer.domElement.dataset.qualityFrameRateIntent=String(this.qualityProfile.performance.frameRateIntentHz),this.renderer.domElement.dataset.qualityCameraFollowMultiplier=String(this.qualityProfile.motion.cameraFollowSpeedMultiplier),this.renderer.domElement.dataset.qualityDirectionalRim=String(this.qualityProfile.shadows.directionalRim),this.renderer.domElement.dataset.qualityEnvironmentIbl=String(this.qualityProfile.shadows.environmentIbl),this.renderer.domElement.dataset.qualityAutoSelection="not-implemented",this.renderer.domElement.dataset.sharpPresentation=String(this.sharpPresentation),this.renderer.domElement.dataset.cameraCompositionProfile=this.cameraCompositionProfile,this.renderer.domElement.dataset.environmentProfile=this.environmentProfile,this.renderer.domElement.dataset.presentationProfile=this.presentationProfile,this.firstStageLandmark=r.firstStageMvp===!0?H1({onStatus:(l,c)=>{this.renderer.domElement.dataset.firstStageLandmarkStatus=l,l==="ready"&&(this.renderer.domElement.dataset.firstStageDerivedBuildings=String(this.firstStageLandmark?.group.userData.derivativeBuildingCount??0),this.renderer.domElement.dataset.firstStageR08CrownCards=String(this.firstStageLandmark?.group.userData.r08CrownCardCount??0),this.renderer.domElement.dataset.firstStageR08DerivedVegetation=String(this.firstStageLandmark?.group.userData.r08DerivedVegetationCount??0)),c===null?delete this.renderer.domElement.dataset.firstStageLandmarkError:this.renderer.domElement.dataset.firstStageLandmarkError=c}}):null,this.firstStageWorldArt=null,this.livingWaterSections=r.firstStageMvp===!0?_1():og(),this.renderer.domElement.dataset.firstStageLandmarkStatus=this.firstStageLandmark?.status()??"disabled",this.renderer.domElement.dataset.firstStageLandmarkSlot=this.firstStageLandmark===null?"none":String(this.firstStageLandmark.group.userData.semanticSlotId),this.renderer.domElement.dataset.firstStageLandmarkArtifact=this.firstStageLandmark?.artifact.sha256??"none",this.renderer.domElement.dataset.firstStageWorldArt=r.firstStageMvp===!0?"deferred":"disabled",this.renderer.domElement.dataset.firstStageWorldArtStatus=r.firstStageMvp===!0?"deferred":"disabled",this.renderer.domElement.dataset.firstStageWorldArtDrawCalls=String(0),this.renderer.domElement.dataset.firstStageWorldArtComponents=String(0),this.renderer.domElement.dataset.firstStageWorldArtInstances=String(0),this.renderer.domElement.dataset.firstStageWorldArtParticles=String(0),r.firstStageMvp===!0&&(this.firstStageWorldActivationHandler=()=>{this.scheduleFirstStageWorldArt()},window.addEventListener(Dn,this.firstStageWorldActivationHandler)),this.renderer.domElement.setAttribute("aria-label",ne(this.presentationProfile)?"F.R.A.M. 辺境遺物記録モジュール ゲーム画面":"辺境遺物録 ボクセルゲーム画面"),e.append(this.renderer.domElement),this.contextLostHandler=l=>{l.preventDefault(),r.onContextLost?.()},this.contextRestoredHandler=()=>{this.qualityProfile.shadows.environmentIbl&&this.createEnvironmentLighting(),r.onContextRestored?.()},this.renderer.domElement.addEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.addEventListener("webglcontextrestored",this.contextRestoredHandler);const s=ne(this.presentationProfile)?ve.display.fogColor:this.environmentProfile==="r04-live"?G.display.fogColor:this.environmentProfile==="beauty-cell"?11125949:hw;this.scene.background=new Y(s),this.scene.fog=this.firstStageLandmark!==null?null:new xu(s,ne(this.presentationProfile)?ve.display.fogNear*this.qualityProfile.effects.atmosphere.fogNearMultiplier:this.environmentProfile==="r04-live"?G.display.fogNear:this.environmentProfile==="beauty-cell"?1020:this.qualityProfile.presentation.masterDirectLighting?1140:900,ne(this.presentationProfile)?ve.display.fogFar*this.qualityProfile.effects.atmosphere.fogFarMultiplier:this.environmentProfile==="r04-live"?G.display.fogFar:this.environmentProfile==="beauty-cell"?2340:this.qualityProfile.presentation.masterDirectLighting?2700:2450),this.renderer.domElement.dataset.firstStageWeather=this.firstStageLandmark!==null?"clear":"inherited",this.createLighting(),this.qualityProfile.shadows.environmentIbl&&this.createEnvironmentLighting();const i=this.cameraViewHeight*(Ts/Rs);if(this.camera=new Jl(-i/2,i/2,this.cameraViewHeight/2,-this.cameraViewHeight/2,1,3200),this.initializeViewportSync(e),this.qualityProfile.post.enabled?(this.ultraPipeline=new Km(this.renderer,this.scene,this.camera,{maxPixelRatio:this.effectiveMaximumDevicePixelRatio(),samples:this.qualityProfile.antialiasing.renderTargetSamples,hdr:this.qualityProfile.post.hdr,gtao:this.qualityProfile.post.gtao,gtaoIntensity:this.qualityProfile.post.gtaoIntensity,gtaoResolutionScale:this.qualityProfile.post.gtaoResolutionScale,gtaoSamples:this.qualityProfile.post.gtaoSamples,gtaoDenoiseRings:this.qualityProfile.post.gtaoDenoiseRings,gtaoDenoiseSamples:this.qualityProfile.post.gtaoDenoiseSamples,bloom:this.qualityProfile.post.bloom,bloomStrength:this.qualityProfile.post.bloomStrength,bloomRadius:this.qualityProfile.post.bloomRadius,bloomThreshold:this.qualityProfile.post.bloomThreshold,smaa:this.qualityProfile.antialiasing.postSmaa,finish:this.qualityProfile.post.finish.enabled,finishExposure:this.qualityProfile.post.finish.exposure,finishContrast:this.qualityProfile.post.finish.contrast,finishSaturation:this.qualityProfile.post.finish.saturation,finishTint:this.qualityProfile.post.finish.tint,finishChromaTintFloor:this.qualityProfile.post.finish.chromaTintFloor,finishVoxelClarity:this.qualityProfile.post.finish.voxelClarity,finishVoxelEdge:this.qualityProfile.post.finish.voxelEdge,finishShadowCool:this.qualityProfile.post.finish.shadowCool,finishHighlightWarm:this.qualityProfile.post.finish.highlightWarm,finishVignette:this.qualityProfile.post.finish.vignette,finishMiniatureEnabled:this.qualityProfile.post.finish.miniatureDepth.enabled&&this.qualityProfile.post.finish.miniatureDepth.mode==="screen-band",finishMiniatureFocus:this.qualityProfile.post.finish.miniatureDepth.focus,finishMiniatureClearBand:this.qualityProfile.post.finish.miniatureDepth.clearBand,finishMiniatureFarBlurPixels:this.qualityProfile.post.finish.miniatureDepth.farBlurPixels,finishMiniatureNearBlurPixels:this.qualityProfile.post.finish.miniatureDepth.nearBlurPixels,finishMiniatureStrength:this.qualityProfile.post.finish.miniatureDepth.strength,tiltShift:!this.sharpPresentation&&(this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"),tiltShiftMode:ne(this.presentationProfile)?ve.post.tiltShiftMode:"classic",tiltShiftFocus:ne(this.presentationProfile)?ve.post.tiltShiftFocus:this.environmentProfile==="r04-live"?G.post.tiltShiftFocus:.49,tiltShiftStrength:this.environmentProfile==="r04-live"?G.post.tiltShiftStrength:3.7,tiltShiftClearBand:ne(this.presentationProfile)?ve.post.tiltShiftClearBand:void 0,tiltShiftFarBlurPixels:ne(this.presentationProfile)?ve.post.tiltShiftFarBlurPixels:void 0,tiltShiftNearBlurPixels:ne(this.presentationProfile)?ve.post.tiltShiftNearBlurPixels:void 0,depthAwareDof:Ki(this.presentationProfile)||this.firstStageLandmark!==null?this.qualityProfile.post.allowPresentationDepthOfField:this.qualityProfile.post.allowPresentationDepthOfField&&this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh",depthFocusPlane:!Ki(this.presentationProfile)&&this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.focusPlane==="none"?"camera-depth":this.qualityProfile.post.finish.miniatureDepth.focusPlane:"camera-depth",depthFocusRange:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.focusRange:this.presentationProfile==="r08-fram"?bs.post.focusRange:this.presentationProfile==="r07-fram"?xs.post.focusRange:void 0,depthFocusRangeWorldUnits:!Ki(this.presentationProfile)&&this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.focusRangeWorldUnits:void 0,depthFocusBandHalfHeight:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.bandHalfHeight:void 0,depthFocusRampExponent:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.rampExponent:void 0,depthBlurPixels:this.presentationProfile==="r08-fram"?bs.post.blurPixels:this.presentationProfile==="r07-fram"?xs.post.blurPixels:void 0,depthFarBlurPixels:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.farBlurPixels*this.qualityProfile.post.finish.miniatureDepth.strength:void 0,depthNearBlurPixels:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.nearBlurPixels*this.qualityProfile.post.finish.miniatureDepth.strength:void 0,depthBokehSamples:this.qualityProfile.post.finish.miniatureDepth.bokehSamples,depthResolutionScale:this.qualityProfile.post.finish.miniatureDepth.bokehResolutionScale,depthEdgeThreshold:this.qualityProfile.post.finish.miniatureDepth.mode==="depth-aware-bokeh"?this.qualityProfile.post.finish.miniatureDepth.edgeThreshold:this.presentationProfile==="r08-fram"?bs.post.edgeThreshold:this.presentationProfile==="r07-fram"?xs.post.edgeThreshold:void 0,onFallback:l=>{this.renderer.domElement.dataset.ultraFallback=l instanceof Error?l.message:"post-processing"}}),this.ultraPipeline.resize(Math.max(1,e.clientWidth),Math.max(1,e.clientHeight)),this.syncUltraPipelineDataset()):(this.renderer.domElement.dataset.qualityPostPipeline="direct",this.renderer.domElement.dataset.qualityEffectiveSamples="0",this.renderer.domElement.dataset.qualityEffectiveGtao="false",this.renderer.domElement.dataset.qualityEffectiveGtaoResolutionScale="0",this.renderer.domElement.dataset.qualityEffectiveGtaoSamples="0",this.renderer.domElement.dataset.qualityEffectiveGtaoDenoise="0r/0s",this.renderer.domElement.dataset.qualityEffectiveBloom="false",this.renderer.domElement.dataset.qualityEffectiveBloomStrength="0",this.renderer.domElement.dataset.qualityEffectiveSmaa="false",this.renderer.domElement.dataset.qualityEffectiveHdr="false",this.renderer.domElement.dataset.qualityEffectiveFinish="false",this.renderer.domElement.dataset.qualityEffectiveFinishExposure="1",this.renderer.domElement.dataset.qualityEffectiveFinishContrast="1",this.renderer.domElement.dataset.qualityEffectiveFinishSaturation="1",this.renderer.domElement.dataset.qualityEffectiveFinishTint="0",this.renderer.domElement.dataset.qualityEffectiveVoxelClarity="0",this.renderer.domElement.dataset.qualityEffectiveVoxelEdge="0",this.renderer.domElement.dataset.qualityEffectiveFinishShadowCool="0",this.renderer.domElement.dataset.qualityEffectiveFinishHighlightWarm="0",this.renderer.domElement.dataset.qualityEffectiveFinishVignette="0",this.renderer.domElement.dataset.qualityEffectiveMiniatureDepth="false",this.renderer.domElement.dataset.qualityEffectiveMiniatureStrength="0"),this.firstStageLandmark!==null&&(this.firstStageRequestedDofStrength=nd(),this.firstStageVisualQualityHandler=l=>{const c=tw(l);c!==null&&(this.firstStageRequestedDofStrength=c.requestedDofStrength,this.applyFirstStageDofStrength())},window.addEventListener(Bn,this.firstStageVisualQualityHandler),this.applyFirstStageDofStrength()),this.createGround(a),this.environmentArt=ne(this.presentationProfile)?Fm({includeLooseRoadAggregate:this.visualStabilityProfile.road.looseAggregate==="retained",microVegetationCastShadow:this.visualStabilityProfile.temporal.microVegetationCastShadow}):this.environmentProfile==="r04-live"?Gc():this.environmentProfile==="beauty-cell"?_c():this.environmentProfile==="north-star-city"?R0():u0(),this.scene.add(this.environmentArt.group),this.firstStageLandmark!==null){let l=0;for(const c of["beauty-cell-causal-foliage","beauty-cell-human-flower-accents","r04-facade-vines-repair-decals","r04-high-density-edge-vegetation","r04-foreground-flower-framing","r05-c-multiscale-reclaimed-vegetation","r05-c-human-scale-flower-color"]){const d=this.environmentArt.group.getObjectByName(c);d!==void 0&&(d.visible=!1,d.userData.replacedBy="first-stage-organic-growth-v1",l+=1)}this.renderer.domElement.dataset.firstStageLegacyVegetationSuppressed=String(l),this.scene.add(this.firstStageLandmark.group)}if(this.applyQualityMaterialResponse(),this.environmentProfile==="beauty-cell"){this.renderer.domElement.dataset.visualGrammar="concept-c-fixed-diagonal",this.renderer.domElement.dataset.generationMode="deterministic-spec-compiler";const l=this.environmentArt.group.userData.stableId;typeof l=="string"&&(this.renderer.domElement.dataset.beautyCellId=l)}if(this.environmentProfile==="r04-live"&&(this.renderer.domElement.dataset.visualGrammar=G.composition.rule,this.renderer.domElement.dataset.generationMode=G.generation.mode,this.renderer.domElement.dataset.r04ArtId=typeof this.environmentArt.group.userData.stableId=="string"?this.environmentArt.group.userData.stableId:G.stableId),this.environmentProfile!=="beauty-cell"&&this.environmentProfile!=="r04-live"){const l=new Set(this.environmentArt.replacedTerrainIds);this.firstStageLandmark!==null&&ji.forEach(c=>l.add(c)),this.createFieldGrowth(a,l)}const n=new Set(this.environmentArt.replacedTerrainIds);this.firstStageLandmark!==null&&(ji.forEach(l=>n.add(l)),this.renderer.domElement.dataset.firstStageHiddenGameplayProxies=String(ji.length)),this.createTerrain(a,n),this.createProps(a,this.environmentArt.replacedPropIds),this.northStarVisualCell&&this.createLivingWaterReclamationCell(),this.createLandmarkSignals(a),this.applySurfaceDetail(),this.createLocalReflectionPresentation(),this.createAtmospherePresentation(),this.playerBody=gl(Ir,di),this.playerGroup.add(this.playerBody),this.playerBody.castShadow=!0,this.playerBody.receiveShadow=!0;const o=Yp(r.heroAssetRequest,()=>this.presentationProfile==="r08-fram"?Im():this.presentationProfile==="r07-fram"?$c():this.presentationProfile==="r05-fram"?Jc():this.environmentProfile==="r04-live"?Am():this.environmentProfile==="beauty-cell"?jc():this.qualityProfile.presentation.masterCamera?qp({mode:"articulated"}):null);if(this.playerHeroVisual=o.visual,this.heroPresentation=o.presentation??null,this.heroWorldScale=o.worldScale??1,this.renderer.domElement.dataset.heroAssetSource=o.source,this.renderer.domElement.dataset.heroAssetStatus=o.status,this.renderer.domElement.dataset.heroAssetId=o.assetId??"none",this.heroPresentation!==null&&(this.renderer.domElement.dataset.heroPresentationId=this.heroPresentation.id,this.renderer.domElement.dataset.heroShadowStrategy=this.heroPresentation.shadow.strategy,this.renderer.domElement.dataset.heroFootAnchorY=String(this.heroPresentation.grounding.footAnchorY)),this.playerHeroVisual!==null&&(this.playerBody.visible=!1,o.worldScale!==void 0?this.playerHeroVisual.root.scale.setScalar(o.worldScale):this.environmentProfile==="beauty-cell"?this.playerHeroVisual.root.scale.setScalar(1.28):this.presentationProfile==="r08-fram"?this.playerHeroVisual.root.scale.setScalar(bs.actors.heroScale):this.presentationProfile==="r07-fram"?this.playerHeroVisual.root.scale.setScalar(xs.actors.heroScale):this.presentationProfile==="r05-fram"?this.playerHeroVisual.root.scale.setScalar(ve.actors.heroScale):this.environmentProfile==="r04-live"&&this.playerHeroVisual.root.scale.setScalar(G.actors.heroScale),this.playerGroup.add(this.playerHeroVisual.root),ne(this.presentationProfile)||o.source==="runtime")){this.renderer.domElement.dataset.heroRepresentation=String(this.playerHeroVisual.root.userData.runtimeRepresentation??"unknown"),this.renderer.domElement.dataset.heroVoxelCells=String(this.playerHeroVisual.root.userData.visibleVoxelCells??"unknown");const l=this.playerHeroVisual.root.userData.sourceSurfaceCells;(typeof l=="number"||typeof l=="string")&&(this.renderer.domElement.dataset.heroSourceSurfaceCells=String(l));const c=this.playerHeroVisual.root.userData.characterPreset;typeof c=="string"&&(this.renderer.domElement.dataset.heroCharacterPreset=c);const d=this.playerHeroVisual.root.userData.packDigest;typeof d=="string"&&(this.renderer.domElement.dataset.heroPackDigest=d);const u=this.playerHeroVisual.root.userData.sourceDigest;typeof u=="string"&&(this.renderer.domElement.dataset.heroSourceDigest=u);const h=this.playerHeroVisual.root.userData.moduleIds;Array.isArray(h)&&(this.renderer.domElement.dataset.heroModuleCount=String(h.length))}if(this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live")this.bladeMesh=TA("blade"),this.impactMesh=TA("impact"),this.bladeTrailBaseLocal.set(0,-13,0),this.bladeTrailTipLocal.set(0,-36,0);else{const l=Ur(is,mo,1),c=Ur(ui,Ad,1);yl(l,"blade"),yl(c,"impact"),this.bladeMesh=l,this.impactMesh=c,this.bladeTrailBaseLocal.lerpVectors(new S(pr.x,pr.y,pr.z),new S(lr.x,lr.y,lr.z),.32),this.bladeTrailTipLocal.set(lr.x,lr.y,lr.z)}const A=this.heroPresentation?.shadow;this.bladeMesh.castShadow=A?.weaponCastShadow??!0,this.impactMesh.castShadow=A?.weaponCastShadow??!0,this.playerHeroVisual!==null?(this.playerHeroVisual.attachWeapon(this.bladeMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:pr),this.playerHeroVisual.attachWeapon(this.impactMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:En)):this.playerGroup.add(this.bladeMesh,this.impactMesh),A!==void 0?(this.playerShadow=Vp(A),this.scene.add(this.playerShadow),this.playerShadowProxy=A.directionalProxy?Kp(this.heroWorldScale):null,this.playerShadowProxy!==null&&this.playerGroup.add(this.playerShadowProxy)):(this.playerShadow=cr(38,22,.32),this.playerGroup.add(this.playerShadow),this.playerShadowProxy=null),this.scene.add(this.playerGroup),this.createWorldMemoryPresentation(),this.targetRing=wl(6415825,.76),this.windupRing=wl(16034128,.92),this.targetRing.visible=!1,this.windupRing.visible=!1,this.scene.add(this.targetRing,this.windupRing),this.companionBody=gl(Jn,kc),this.companionBody.castShadow=!0,this.companionBody.receiveShadow=!0,this.companionBeautyVisual=r.companionPreview===!0&&(this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live")?Zp():null,this.companionBeautyVisual!==null&&(this.companionBody.visible=!1,this.companionGroup.add(this.companionBeautyVisual.root)),this.companionShadow=cr(24,15,.24),this.companionGroup.name="visual-only-companion",this.companionGroup.add(this.companionBody,this.companionShadow),this.companionGroup.visible=r.companionPreview===!0,this.scene.add(this.companionGroup),this.syncEnemies(a),this.syncLoot(a),this.snapCamera(a),this.update(a,[],0,0)}update(e,a,r,s,i,n,o=[]){if(this.disposed)return;const A=Math.min(.05,Math.max(0,s/1e3)),l=sg(n?.previousPlayer??e.player,e.player,n?.simulationAlpha??0,this.qualityProfile.motion.maximumPredictionWorldUnits*(1+(i?.movementPriorityBlend??0)*.75)),c=this.ws1ActionFeel&&(i?.phase==="hit"||i?.phase==="windup"&&i.entryLungeActive!==!0),d=c?{x:e.player.x,y:e.player.y,predicted:!1}:l;this.renderer.domElement.dataset.ws1AttackPlanted=String(c),this.handleEvents(a);const h=this.localHitstopSeconds>0?0:A;this.localHitstopSeconds=Math.max(0,this.localHitstopSeconds-A),this.elapsed+=h;const g=this.ws1ActionFeel&&i?.entryLungeActive===!0;g&&!this.entryLungeWasActive&&!this.isWaterAt(e,e.player.x,e.player.y)&&this.addFootDust(e.player.x,e.player.y,e.player.facingX,e.player.facingY,18,1),this.entryLungeWasActive=g,this.handleWs1Cues(o),this.syncPlayer(e,h,i,d),this.syncWs1BladeTrail(),this.updateWorldMemoryPresentation(r/1e3),this.companionGroup.visible&&this.syncCompanion(e,A),this.syncEnemies(e),this.syncCombatPresentation(e,i),this.syncEnemyHealthBars(e,i?.targetId??null),this.syncLoot(e),this.updateEffects(h),this.updateCamera(e,h,i,d),this.updateAmbientMotion(e,r/1e3),this.firstStageWorldArt?.update(r/1e3),this.ultraPipeline!==null?(this.reusablePosition.copy(this.playerGroup.position),this.reusablePosition.y+=42,this.ultraPipeline.setDepthFocusPoint(this.reusablePosition),this.ultraPipeline.render(A),this.syncUltraPipelineDataset()):this.renderer.render(this.scene,this.camera)}getVisualCameraSnapshot(){return{position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),left:this.camera.left,right:this.camera.right,top:this.camera.top,bottom:this.camera.bottom,near:this.camera.near,far:this.camera.far}}createWorldMemoryPresentation(){const e=this.worldMemoryEffects;if(e===null){this.renderer.domElement.dataset.worldMemoryVisualCue="none";return}if(this.memoryPresentation.name="r09-world-memory-presentation",this.memoryRelicAura.name="r09-relic-overdrive-aura",e.routeOverlay){const a=new ge(7,7,7),r=new L({color:16761707,emissive:16751941,emissiveIntensity:2.2,metalness:.35,roughness:.25});r.toneMapped=!1;const s=[[610,910],[760,875],[920,850],[1080,860],[1250,890],[1430,900],[1610,900],[1790,930],[1980,955],[2170,940],[2360,915],[2560,900],[2760,900],[2930,900]],i=new Be(a,r,s.length);s.forEach(([n,o],A)=>{this.reusablePosition.set(n,7+A%2*2,o),this.reusableQuaternion.setFromAxisAngle(new S(0,1,0),Math.PI/4),this.reusableScale.setScalar(A%3===0?1.25:.8),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),i.setMatrixAt(A,this.reusableMatrix)}),i.instanceMatrix.needsUpdate=!0,i.name="pathfinder-array-route-markers",this.memoryPresentation.add(i),this.scene.add(this.memoryPresentation),this.renderer.domElement.dataset.worldMemoryVisualCue="route-overlay"}if(e.relicAura){const a=new F({color:16740222,transparent:!0,opacity:.48,depthWrite:!1,blending:zt,toneMapped:!1}),r=new F({color:16757615,transparent:!0,opacity:.36,depthWrite:!1,blending:zt,toneMapped:!1}),s=new I(new Yt(30,34,32),a),i=new I(new Yt(19,21,24),r);s.rotation.x=-Math.PI/2,i.rotation.x=-Math.PI/2,i.rotation.z=Math.PI/8;const n=new ge(4,4,4),o=new F({color:16747135,transparent:!0,opacity:.78,depthWrite:!1,toneMapped:!1}),A=new Be(n,o,12);for(let l=0;l<12;l+=1){const c=l/12*Math.PI*2,d=l%2===0?28:38;this.reusablePosition.set(Math.cos(c)*d,8+l%3*7,Math.sin(c)*d),this.reusableQuaternion.identity(),this.reusableScale.setScalar(l%3===0?1.25:.75),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),A.setMatrixAt(l,this.reusableMatrix)}A.instanceMatrix.needsUpdate=!0,this.memoryRelicAura.add(s,i,A),this.scene.add(this.memoryRelicAura),this.renderer.domElement.dataset.worldMemoryVisualCue="relic-aura"}}updateWorldMemoryPresentation(e){if(this.worldMemoryEffects?.routeOverlay===!0){const a=.94+Math.sin(e*3.2)*.08;this.memoryPresentation.scale.set(1,a,1)}if(this.worldMemoryEffects?.relicAura===!0){this.memoryRelicAura.position.copy(this.playerGroup.position),this.memoryRelicAura.position.y+=3,this.memoryRelicAura.rotation.y=e*.5;const a=1+Math.sin(e*4.1)*.06;this.memoryRelicAura.scale.setScalar(a)}}initializeViewportSync(e){if(this.updateViewportSize(e.clientWidth,e.clientHeight),typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(a=>{const r=a.find(s=>s.target===e);r!==void 0&&this.updateViewportSize(r.contentRect.width,r.contentRect.height)}),this.resizeObserver.observe(e);return}typeof window<"u"&&(this.windowResizeHandler=()=>{this.updateViewportSize(e.clientWidth,e.clientHeight)},window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}updateViewportSize(e,a){if(this.disposed||e<=0||a<=0||Math.abs(e-this.viewportCssWidth)<.5&&Math.abs(a-this.viewportCssHeight)<.5)return;this.viewportCssWidth=e,this.viewportCssHeight=a,this.applyFirstStageDofStrength();const r=C.clamp(e/a,16/9,2.24);if(this.qualityProfile.resolution.strategy==="viewport-dpr"){const l=Math.min(this.effectiveMaximumDevicePixelRatio(),Math.max(1,window.devicePixelRatio||1)),c=Math.max(1,Math.round(e*this.qualityProfile.resolution.renderScale)),d=Math.max(1,Math.round(a*this.qualityProfile.resolution.renderScale));this.ultraPipeline!==null?this.ultraPipeline.resize(c,d,l):(this.renderer.setPixelRatio(l),this.renderer.setSize(c,d,!1)),this.internalRenderWidth=Math.max(1,Math.round(c*l)),this.internalRenderHeight=Math.max(1,Math.round(d*l));const u=this.cameraViewHeight*r;this.camera.left=-u/2,this.camera.right=u/2,this.camera.updateProjectionMatrix(),this.renderer.domElement.dataset.internalResolution=`${this.internalRenderWidth}x${this.internalRenderHeight}`,this.renderer.domElement.dataset.effectivePixelRatio=String(l),this.renderer.domElement.dataset.resolutionStrategy=this.qualityProfile.resolution.strategy,this.syncUltraPipelineDataset();return}const s=Math.max(1,Math.round((this.qualityProfile.resolution.fixedHeight??Rs)*this.qualityProfile.resolution.renderScale)),i=Math.max(1,Math.round((this.qualityProfile.resolution.minimumWidth??Ts)*this.qualityProfile.resolution.renderScale)),n=Math.max(i,Math.round((this.qualityProfile.resolution.maximumWidth??lw)*this.qualityProfile.resolution.renderScale)),o=C.clamp(Math.round(s*r),i,n);this.internalRenderWidth=o,this.internalRenderHeight=s,this.renderer.setPixelRatio(1),this.renderer.setSize(o,s,!1),this.renderer.domElement.dataset.internalResolution=`${o}x${s}`,this.renderer.domElement.dataset.effectivePixelRatio="1",this.renderer.domElement.dataset.resolutionStrategy=this.qualityProfile.resolution.strategy;const A=this.cameraViewHeight*(o/s);this.camera.left=-A/2,this.camera.right=A/2,this.camera.updateProjectionMatrix()}getStats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,width:this.internalRenderWidth,height:this.internalRenderHeight}}setCameraZoomMultiplier(e){const a=Math.round(C.clamp(Number.isFinite(e)?e:1,.75,1.25)*100)/100,r=Math.max(1,this.camera.top-this.camera.bottom),s=Math.max(1,(this.camera.right-this.camera.left)/r);this.cameraZoomMultiplier=a,this.cameraViewHeight=this.baseCameraViewHeight/a;const i=this.cameraViewHeight*s;return this.camera.left=-i/2,this.camera.right=i/2,this.camera.top=this.cameraViewHeight/2,this.camera.bottom=-this.cameraViewHeight/2,this.camera.updateProjectionMatrix(),this.renderer.domElement.dataset.cameraZoomMultiplier=String(a),this.renderer.domElement.dataset.qualityCameraViewHeight=String(this.cameraViewHeight),a}getCameraZoomMultiplier(){return this.cameraZoomMultiplier}scheduleFirstStageWorldArt(){if(this.disposed||this.firstStageWorldArt!==null||this.firstStageWorldArtFrame!==null||this.firstStageWorldArtTimer!==null)return;this.renderer.domElement.dataset.firstStageWorldArtStatus="loading";const e=()=>{this.firstStageWorldArtFrame=null,this.firstStageWorldArtTimer=window.setTimeout(()=>{this.firstStageWorldArtTimer=null,!(this.disposed||this.firstStageWorldArt!==null)&&ql(async()=>{const{createFirstStageWorldArtSlice:a}=await import("./worldArt-DY1cs1iQ.js");return{createFirstStageWorldArtSlice:a}},__vite__mapDeps([0,1,2])).then(({createFirstStageWorldArtSlice:a})=>{if(this.disposed||this.firstStageWorldArt!==null)return;const r=a();this.firstStageWorldArt=r,this.scene.add(r.group),this.applyQualityMaterialResponse(),this.renderer.domElement.dataset.firstStageWorldArt=r.semanticIds.join(","),this.renderer.domElement.dataset.firstStageWorldArtDrawCalls=String(r.metrics.drawCalls),this.renderer.domElement.dataset.firstStageWorldArtComponents=String(r.metrics.components),this.renderer.domElement.dataset.firstStageWorldArtInstances=String(r.metrics.instances),this.renderer.domElement.dataset.firstStageWorldArtParticles=String(r.metrics.particles);const s=r.group.getObjectByName("first-stage-hybrid-drifting-matter");this.renderer.domElement.dataset.firstStageAtmosphereProfile=typeof s?.userData.presentationProfile=="string"?s.userData.presentationProfile:"missing",this.renderer.domElement.dataset.firstStageFogProfile="disabled-clear-weather";const i=r.group.getObjectByName("first-stage-hybrid-vegetation-roots");this.renderer.domElement.dataset.firstStageVegetationProfile=typeof i?.userData.presentationProfile=="string"?i.userData.presentationProfile:"missing",this.renderer.domElement.dataset.firstStageVegetationTrees=String(i?.userData.treeCount??0),this.renderer.domElement.dataset.firstStageVegetationGround=String(i?.userData.grassReedCount??0),this.renderer.domElement.dataset.firstStageWorldArtStatus="ready"}).catch(a=>{this.renderer.domElement.dataset.firstStageWorldArtStatus="error",this.renderer.domElement.dataset.firstStageWorldArtError=a instanceof Error?a.message:String(a)})},0)};this.firstStageWorldArtFrame=window.requestAnimationFrame(e)}applyFirstStageDofStrength(){if(this.firstStageLandmark===null)return;const e=this.viewportCssWidth>0?this.viewportCssWidth:typeof window>"u"?1280:window.innerWidth,a=Pn(this.firstStageRequestedDofStrength,e);this.ultraPipeline?.setDepthBlurStrength(a),this.renderer.domElement.dataset.firstStageDofRequested=String(this.firstStageRequestedDofStrength),this.renderer.domElement.dataset.firstStageDofEffective=String(a),this.renderer.domElement.dataset.firstStageDofFallback=a<this.firstStageRequestedDofStrength?"compact":"none",this.syncUltraPipelineDataset()}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.domElement.removeEventListener("webglcontextlost",this.contextLostHandler),this.renderer.domElement.removeEventListener("webglcontextrestored",this.contextRestoredHandler),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.windowResizeHandler!==null&&typeof window<"u"&&(window.removeEventListener("resize",this.windowResizeHandler),this.windowResizeHandler=null),this.firstStageVisualQualityHandler!==null&&(window.removeEventListener(Bn,this.firstStageVisualQualityHandler),this.firstStageVisualQualityHandler=null),this.firstStageWorldActivationHandler!==null&&(window.removeEventListener(Dn,this.firstStageWorldActivationHandler),this.firstStageWorldActivationHandler=null),this.firstStageWorldArtFrame!==null&&(window.cancelAnimationFrame(this.firstStageWorldArtFrame),this.firstStageWorldArtFrame=null),this.firstStageWorldArtTimer!==null&&(window.clearTimeout(this.firstStageWorldArtTimer),this.firstStageWorldArtTimer=null),this.environmentArt.dispose(),this.firstStageLandmark!==null&&(this.scene.remove(this.firstStageLandmark.group),this.firstStageLandmark.dispose()),this.firstStageWorldArt!==null&&(this.scene.remove(this.firstStageWorldArt.group),this.firstStageWorldArt.dispose()),this.enemyDefeatAnimations.clear(),this.enemyReactions.clear(),this.enemyRecentlyDamagedUntil.clear(),this.enemyHealthBars.clear();for(const r of this.combatTextEffects)this.scene.remove(r.sprite),r.texture.dispose(),r.sprite.material.dispose();this.combatTextEffects.length=0,this.ultraPipeline?.dispose(),this.ultraPipeline=null,this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,this.localReflectionTarget?.dispose(),this.localReflectionTarget=null,this.surfaceLibrary?.dispose(),this.surfaceLibrary=null,this.effectiveSurfaceSets.clear(),this.surfaceDetailTextures.forEach(r=>r.dispose()),this.surfaceDetailTextures.length=0,this.waterNormalTexture?.dispose(),this.waterNormalTexture=null,this.waterClearcoatNormalTexture?.dispose(),this.waterClearcoatNormalTexture=null,this.waterWorldMaterials.clear(),this.reflectiveWorldMaterials.clear(),this.waterWorldObjects.clear(),this.atmosphereTexture?.dispose(),this.atmosphereTexture=null,this.groundTexture?.dispose(),this.groundTexture=null;const e=new Set,a=new Set;this.scene.traverse(r=>{if(r instanceof Be&&r.dispose(),r instanceof I||r instanceof Be||r instanceof Hr||r instanceof Xs){e.add(r.geometry);const s=r.material;Array.isArray(s)?s.forEach(i=>a.add(i)):a.add(s)}}),e.forEach(r=>r.dispose()),a.forEach(r=>r.dispose()),this.impactSparkGeometry.dispose(),this.footDustGeometry.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}syncUltraPipelineDataset(){if(this.ultraPipeline===null)return;const e=this.ultraPipeline.getStatus();this.renderer.domElement.dataset.qualityPostPipeline=e.mode,this.renderer.domElement.dataset.qualityEffectiveSamples=String(e.samples),this.renderer.domElement.dataset.qualityEffectiveGtao=String(e.gtao),this.renderer.domElement.dataset.qualityEffectiveGtaoResolutionScale=String(e.gtaoResolutionScale),this.renderer.domElement.dataset.qualityEffectiveGtaoSamples=String(e.gtaoSamples),this.renderer.domElement.dataset.qualityEffectiveGtaoDenoise=`${e.gtaoDenoiseRings}r/${e.gtaoDenoiseSamples}s`,this.renderer.domElement.dataset.qualityEffectiveBloom=String(e.bloom),this.renderer.domElement.dataset.qualityEffectiveBloomStrength=String(e.bloomStrength),this.renderer.domElement.dataset.qualityEffectiveSmaa=String(e.smaa),this.renderer.domElement.dataset.qualityEffectiveHdr=String(e.hdr),this.renderer.domElement.dataset.qualityEffectiveFinish=String(e.finish),this.renderer.domElement.dataset.qualityEffectiveFinishExposure=String(e.finishExposure),this.renderer.domElement.dataset.qualityEffectiveFinishContrast=String(e.finishContrast),this.renderer.domElement.dataset.qualityEffectiveFinishSaturation=String(e.finishSaturation),this.renderer.domElement.dataset.qualityEffectiveFinishTint=String(e.finishTint),this.renderer.domElement.dataset.qualityEffectiveFinishChromaTintFloor=String(e.finishChromaTintFloor),this.renderer.domElement.dataset.qualityEffectiveVoxelClarity=String(e.finishVoxelClarity),this.renderer.domElement.dataset.qualityEffectiveVoxelEdge=String(e.finishVoxelEdge),this.renderer.domElement.dataset.qualityEffectiveFinishShadowCool=String(e.finishShadowCool),this.renderer.domElement.dataset.qualityEffectiveFinishHighlightWarm=String(e.finishHighlightWarm),this.renderer.domElement.dataset.qualityEffectiveFinishVignette=String(e.finishVignette),this.renderer.domElement.dataset.qualityEffectiveMiniatureDepth=String(e.finishMiniatureEnabled),this.renderer.domElement.dataset.qualityEffectiveMiniatureFocus=String(e.finishMiniatureFocus),this.renderer.domElement.dataset.qualityEffectiveMiniatureBand=String(e.finishMiniatureClearBand),this.renderer.domElement.dataset.qualityEffectiveMiniatureFar=String(e.finishMiniatureFarBlurPixels),this.renderer.domElement.dataset.qualityEffectiveMiniatureNear=String(e.finishMiniatureNearBlurPixels),this.renderer.domElement.dataset.qualityEffectiveMiniatureStrength=String(e.finishMiniatureStrength),this.renderer.domElement.dataset.ultraPipeline=e.mode,this.renderer.domElement.dataset.ultraGtao=String(e.gtao),this.renderer.domElement.dataset.ultraGtaoIntensity=String(e.gtaoIntensity),this.renderer.domElement.dataset.ultraBloom=String(e.bloom),this.renderer.domElement.dataset.ultraSmaa=String(e.smaa),this.renderer.domElement.dataset.ultraTiltShift=String(e.tiltShift),this.renderer.domElement.dataset.ultraTiltShiftMode=e.tiltShiftMode,this.renderer.domElement.dataset.ultraTiltShiftFocus=String(e.tiltShiftFocus),this.renderer.domElement.dataset.ultraTiltShiftBand=String(e.tiltShiftClearBand),this.renderer.domElement.dataset.ultraTiltShiftFar=String(e.tiltShiftFarBlurPixels),this.renderer.domElement.dataset.ultraTiltShiftNear=String(e.tiltShiftNearBlurPixels),this.renderer.domElement.dataset.ultraDepthAwareDof=String(e.depthAwareDof),this.renderer.domElement.dataset.ultraDepthFocus=String(e.depthFocus),this.renderer.domElement.dataset.ultraDepthFocusPlane=e.depthFocusPlane,this.renderer.domElement.dataset.ultraDepthFocusRange=String(e.depthFocusRange),this.renderer.domElement.dataset.ultraDepthFocusRangeWorld=String(e.depthFocusRangeWorldUnits),this.renderer.domElement.dataset.ultraDepthFocusUvY=String(e.depthFocusUvY),this.renderer.domElement.dataset.ultraDepthFocusBandHalfHeight=String(e.depthFocusBandHalfHeight),this.renderer.domElement.dataset.ultraDepthFocusRampExponent=String(e.depthFocusRampExponent),this.renderer.domElement.dataset.ultraDepthBlurPixels=String(e.depthBlurPixels),this.renderer.domElement.dataset.ultraDepthFarBlurPixels=String(e.depthFarBlurPixels),this.renderer.domElement.dataset.ultraDepthNearBlurPixels=String(e.depthNearBlurPixels),this.renderer.domElement.dataset.ultraDepthBlurStrength=String(e.depthBlurStrength),this.renderer.domElement.dataset.ultraDepthBokehSamples=String(e.depthBokehSamples),this.renderer.domElement.dataset.ultraDepthResolutionScale=String(e.depthResolutionScale),this.renderer.domElement.dataset.ultraDepthEdgeThreshold=String(e.depthEdgeThreshold),this.renderer.domElement.dataset.ultraSamples=String(e.samples),e.fallbackReason===null?delete this.renderer.domElement.dataset.ultraFallback:this.renderer.domElement.dataset.ultraFallback=e.fallbackReason}createLighting(){const e=this.environmentProfile==="r04-live",a=ne(this.presentationProfile),r=Os(this.presentationProfile),s=new bu(a?r.skyColor:e?G.lighting.skyColor:this.environmentProfile==="beauty-cell"?16773834:16183506,a?r.groundColor:e?G.lighting.groundColor:this.environmentProfile==="beauty-cell"?1523252:3496515,a?r.skyIntensity:e?G.lighting.skyIntensity:this.environmentProfile==="beauty-cell"?.34:this.qualityProfile.presentation.masterDirectLighting?.42:1.55);s.name="daylight-sky-fill",s.intensity*=this.qualityProfile.effects.atmosphere.skyFillMultiplier,this.keyLight.color.setHex(a?r.keyColor:e?G.lighting.keyColor:this.environmentProfile==="beauty-cell"?16769200:16771261),this.keyLight.intensity=a?r.keyIntensity:e?G.lighting.keyIntensity:this.environmentProfile==="beauty-cell"?2.52:this.qualityProfile.presentation.masterDirectLighting?2.68:2.45,this.keyLight.intensity*=this.qualityProfile.effects.atmosphere.sunIntensityMultiplier,this.keyLight.name="daylight-key",this.keyLightTarget.name="daylight-key-target",this.keyLightTarget.position.set(e?430:390,0,900),this.keyLight.position.set(a?this.keyLightTarget.position.x+r.keyOffsetX:e?this.keyLightTarget.position.x+G.lighting.keyOffsetX:this.environmentProfile==="beauty-cell"?-180:40,a?r.keyOffsetY:e?G.lighting.keyOffsetY:this.environmentProfile==="beauty-cell"?890:820,a?this.keyLightTarget.position.z+r.keyOffsetZ:e?this.keyLightTarget.position.z+G.lighting.keyOffsetZ:this.environmentProfile==="beauty-cell"?140:360),this.keyLight.target=this.keyLightTarget,this.keyLight.castShadow=!0;const i=this.qualityProfile.shadows.mapSize;this.keyLight.shadow.mapSize.set(i,i),this.keyLight.shadow.bias=-.0012,this.keyLight.shadow.radius=this.qualityProfile.shadows.radius,this.keyLight.shadow.blurSamples=this.qualityProfile.shadows.blurSamples,this.keyLight.shadow.normalBias=a?r.shadowNormalBias:e?G.lighting.shadowNormalBias:this.environmentProfile==="beauty-cell"?.82:1.4;const n=this.effectiveShadowHalfExtent();if(this.keyLight.shadow.camera.left=-n,this.keyLight.shadow.camera.right=n,this.keyLight.shadow.camera.top=n,this.keyLight.shadow.camera.bottom=-n,this.keyLight.shadow.camera.near=160,this.keyLight.shadow.camera.far=1420,this.keyLight.shadow.camera.updateProjectionMatrix(),this.effectLight.name="signal-effect-light",this.effectLight.distance=this.qualityProfile.effects.dynamicLight.range,this.effectLight.decay=2,this.effectLight.position.set(430,this.qualityProfile.effects.dynamicLight.height,900),this.scene.add(s,this.keyLightTarget,this.keyLight,this.effectLight),this.qualityProfile.shadows.directionalRim){const o=new ia;o.name="daylight-rim-target",o.position.set(430,24,860);const A=new ln(a?r.rimColor:e?G.lighting.rimColor:this.environmentProfile==="beauty-cell"?9165265:11134687,a?r.rimIntensity:e?G.lighting.rimIntensity:this.environmentProfile==="beauty-cell"?.48:.62);A.name="daylight-cool-rim",A.intensity*=this.qualityProfile.effects.atmosphere.rimIntensityMultiplier,A.position.set(-360,420,-280),A.target=o,this.scene.add(o,A)}}createEnvironmentLighting(){this.scene.environment=null,this.environmentTarget?.dispose(),this.environmentTarget=null,delete this.renderer.domElement.dataset.environmentLightingFallback;const e=new Du,a=new Bu(this.renderer);try{this.environmentTarget=a.fromScene(e,.04),this.scene.environment=this.environmentTarget.texture,this.scene.environmentIntensity=(ne(this.presentationProfile)?Os(this.presentationProfile).environmentIntensity:this.environmentProfile==="r04-live"?G.lighting.environmentIntensity:this.environmentProfile==="beauty-cell"?.19:.26)*this.qualityProfile.effects.environmentResponse,this.renderer.domElement.dataset.environmentLighting="pmrem-ibl",this.renderer.domElement.dataset.environmentLightingSource=this.qualityProfile.effects.environmentSource}catch(r){this.renderer.domElement.dataset.environmentLighting="direct-light-fallback",this.renderer.domElement.dataset.environmentLightingFallback=r instanceof Error?r.message:"pmrem-generation"}finally{e.dispose(),a.dispose()}}applyQualityMaterialResponse(){const e=[],a=new Set;this.environmentArt.group.traverse(r=>{if(r instanceof va&&r.name.startsWith("r05-c-")&&e.push(r),!(r instanceof I))return;const s=Array.isArray(r.material)?r.material:[r.material];for(const i of s)a.has(i)||(a.add(i),i instanceof L&&(i.emissiveIntensity>0&&i.emissive.getHex()!==0&&(i.emissiveIntensity*=this.qualityProfile.effects.emissiveResponse),i.needsUpdate=!0))}),e.forEach((r,s)=>{r.visible=s<this.qualityProfile.effects.practicalLightCount})}applySurfaceDetail(){const e=this.qualityProfile.effects.surfaceDetail;if(!ne(this.presentationProfile)){this.renderer.domElement.dataset.qualityEffectiveSurfaceDetail="none",this.renderer.domElement.dataset.qualityEffectiveReflectionCoverage="none:0";return}const a=e.mode!=="none"&&e.library!=="none";a&&(this.surfaceLibrary=co());const r=this.qualityProfile.effects.maximumAnisotropy==="device-maximum"?this.renderer.capabilities.getMaxAnisotropy():this.qualityProfile.effects.maximumAnisotropy,s=new Map,i=new Set;let n=0,o=0;this.scene.traverse(A=>{if(!(A instanceof I))return;const l=cg(A.name),c=A.userData.runtimeMaterialRoute,d=l??c??null;if(d===null)return;const u=d.materialRole??this.inferMaterialRole(d.reflectionRole),h=this.prepareWorldMaterials(A,u);if(h.length===0)return;const g=e.reflectionIntensity[d.reflectionRole];for(const w of h)this.firstStageLandmark!==null&&u!=="water"&&u!=="glass"?(w.envMapIntensity=Math.min(.38,Math.max(w.envMapIntensity,g*.5)),w.roughness=Math.max(w.roughness,.7),w.metalness=Math.min(w.metalness,.34),w.emissiveIntensity=Math.min(w.emissiveIntensity,.42)):w.envMapIntensity=Math.max(w.envMapIntensity,g),(d.reflectionRole==="wet"||d.reflectionRole==="metal"&&this.firstStageLandmark===null)&&this.reflectiveWorldMaterials.add(w);if(o+=1,!a||d.surface===null){if(h.some(v=>v.map!==null||v.normalMap!==null||v.roughnessMap!==null)){for(const v of h)v.normalMap!==null&&u!=="water"&&v.normalScale.setScalar(e.normalStrength);n+=1}return}const p=this.surfaceLibrary;if(p===null)return;const m=this.getEffectiveSurfaceSet(d.surface,p);mw(A.geometry,d.worldScale);for(const w of[m.albedoMap,m.normalMap,m.roughnessMap])w.anisotropy=r,w.needsUpdate=!0;let f=null;e.albedo&&e.materialCoverage==="all-static-world"&&h.some(w=>w.map===null)&&(f=s.get(d.surface)??null,f===null&&(f=gw(m.albedoMap,`r10-${d.surface}-neutral-albedo-detail`),f.anisotropy=r,s.set(d.surface,f),this.surfaceDetailTextures.push(f)));for(const w of h)f!==null&&w.map===null&&(w.map=f,i.has(w)||(w.color.multiplyScalar(1.12),i.add(w))),w.normalMap=e.normal?m.normalMap:null,w.normalScale.setScalar(e.normalStrength),w.roughnessMap=e.roughness?m.roughnessMap:null,w.needsUpdate=!0;n+=1}),this.renderer.domElement.dataset.qualityEffectiveSurfaceDetail=a?`${e.mode}:${n}`:"none",this.renderer.domElement.dataset.qualityEffectiveReflectionCoverage=`${e.reflectionCoverage}:${e.reflectionCoverage==="none"?0:o}`,this.renderer.domElement.dataset.qualitySurfaceLibrary=e.library,this.firstStageLandmark!==null&&(this.renderer.domElement.dataset.firstStageStaticSpecular="roughness-0.70-env-0.38-no-local-probe")}getEffectiveSurfaceSet(e,a){const r=this.effectiveSurfaceSets.get(e);if(r!==void 0)return r;const s=a[e],i=this.qualityProfile.effects.surfaceDetail.maximumResolution;if(i===0||s.resolution<=i)return this.effectiveSurfaceSets.set(e,s),s;const n=Vi(s.albedoMap,i,`r10-${e}-albedo-${i}`),o=Vi(s.normalMap,i,`r10-${e}-normal-${i}`),A=Vi(s.roughnessMap,i,`r10-${e}-roughness-${i}`);this.surfaceDetailTextures.push(n,o,A);const l={albedoMap:n,normalMap:o,roughnessMap:A,resolution:i,digests:s.digests};return this.effectiveSurfaceSets.set(e,l),l}inferMaterialRole(e){switch(e){case"ground":return"ground";case"structure":return"concrete";case"metal":return"metal";case"wet":return"water";case"prop":return"prop"}}prepareWorldMaterials(e,a){const r=Array.isArray(e.material)?e.material:[e.material],s=this.qualityProfile.effects.water,i=r.map(n=>{if(!(n instanceof L))return n;if(a==="water"&&s.mode!=="simple"){const o=new he({color:n.color,vertexColors:n.vertexColors,map:n.map,transparent:!0,opacity:Math.min(s.surfaceOpacity,n.opacity),depthWrite:!1,side:n.side,roughness:Math.max(s.roughness,this.visualStabilityProfile.reflection.roughnessFloor),metalness:0,clearcoat:s.clearcoat,clearcoatRoughness:Math.max(this.visualStabilityProfile.reflection.clearcoatRoughnessFloor,Math.min(.24,s.roughness+.04)),ior:1.333,envMapIntensity:n.envMapIntensity,fog:n.fog});return o.name=`${n.name||e.name}-physical-water`,s.normalResolution>0&&(this.waterNormalTexture===null&&(this.waterNormalTexture=ml(s.normalResolution),this.waterNormalTexture.anisotropy=Math.min(this.renderer.capabilities.getMaxAnisotropy(),8)),s.flowNormalLayers>=1&&(o.normalMap=this.waterNormalTexture,o.normalScale.set(...this.visualStabilityProfile.reflection.waterNormalScale)),s.flowNormalLayers>=2&&e.name==="r10-living-water-surface"&&(this.waterClearcoatNormalTexture===null&&(this.waterClearcoatNormalTexture=ml(s.normalResolution),this.waterClearcoatNormalTexture.name=`r10-water-crossflow-normal-${s.normalResolution}`,this.waterClearcoatNormalTexture.repeat.set(9,4),this.waterClearcoatNormalTexture.rotation=Math.PI*.23,this.waterClearcoatNormalTexture.center.set(.5,.5),this.waterClearcoatNormalTexture.anisotropy=Math.min(this.renderer.capabilities.getMaxAnisotropy(),8)),o.clearcoatNormalMap=this.waterClearcoatNormalTexture,o.clearcoatNormalScale.set(...this.visualStabilityProfile.reflection.clearcoatNormalScale))),this.waterWorldMaterials.add(o),this.reflectiveWorldMaterials.add(o),this.waterWorldObjects.add(e),o}if(a==="glass"){const o=new he({color:n.color,vertexColors:n.vertexColors,map:n.map,transparent:!0,opacity:Math.min(.76,n.opacity),depthWrite:!1,side:n.side,roughness:Math.min(n.roughness,.18),metalness:0,clearcoat:.86,clearcoatRoughness:.12,envMapIntensity:n.envMapIntensity,fog:n.fog});return o.name=`${n.name||e.name}-physical-glass`,this.reflectiveWorldMaterials.add(o),o}return a==="metal"&&(this.firstStageLandmark!==null?(n.metalness=C.clamp(n.metalness,.12,.34),n.roughness=Math.max(n.roughness,.7),n.envMapIntensity=Math.min(n.envMapIntensity,.38),n.userData.firstStageStaticSpecular="broad-stable-v1"):(n.metalness=Math.max(n.metalness,.52),n.roughness=Math.min(n.roughness,.46),this.reflectiveWorldMaterials.add(n))),n});return e.material=Array.isArray(e.material)?i:i[0]??e.material,i.filter(n=>n instanceof L)}createLocalReflectionPresentation(){const e=this.qualityProfile.effects.water;if(e.reflectionResolution===0||this.reflectiveWorldMaterials.size===0){this.renderer.domElement.dataset.qualityEffectiveLocalReflection=e.mode==="simple"?"none":"environment";return}this.localReflectionTarget?.dispose(),this.localReflectionTarget=new Pu(e.reflectionResolution,{generateMipmaps:!0,minFilter:xa,magFilter:at,type:ya}),this.localReflectionTarget.texture.name=`r10-local-world-reflection-${e.reflectionResolution}`;const a=new Eu(2,1900,this.localReflectionTarget);a.name="r10-static-local-reflection-probe",a.position.set(this.firstStageLandmark===null?480:qi.x,this.firstStageLandmark===null?54:qi.y,this.firstStageLandmark===null?890:qi.z),this.scene.add(a);const r=[...this.waterWorldObjects].map(i=>({object:i,visible:i.visible}));r.forEach(({object:i})=>{i.visible=!1});const s=this.renderer.shadowMap.enabled;try{this.renderer.shadowMap.enabled=!1,a.update(this.renderer,this.scene)}finally{this.renderer.shadowMap.enabled=s,r.forEach(({object:i,visible:n})=>{i.visible=n}),this.scene.remove(a)}for(const i of this.reflectiveWorldMaterials)i.envMap=this.localReflectionTarget.texture,i.needsUpdate=!0;this.renderer.domElement.dataset.qualityEffectiveLocalReflection=`cube:${e.reflectionResolution}`}createAtmospherePresentation(){const e=this.qualityProfile.effects.atmosphere;if(this.atmospherePresentation.name="r10-quality-atmosphere",this.scene.add(this.atmospherePresentation),!ne(this.presentationProfile)){this.renderer.domElement.dataset.qualityEffectiveAtmosphere="none";return}const a=this.firstStageLandmark!==null,r=a?ol.map(({x:n,y:o,z:A})=>new S(n,o,A)):[new S(330,96,790),new S(505,116,890),new S(675,88,985)],s=document.createElement("canvas");s.width=64,s.height=256;const i=s.getContext("2d");if(i!==null){const n=i.createLinearGradient(0,0,0,s.height);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.18,"rgba(255,255,255,0.5)"),n.addColorStop(.58,"rgba(255,255,255,0.78)"),n.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=n,i.fillRect(0,0,s.width,s.height),i.globalCompositeOperation="destination-in";const o=i.createLinearGradient(0,0,s.width,0);o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(.44,"rgba(255,255,255,0.9)"),o.addColorStop(.56,"rgba(255,255,255,0.9)"),o.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=o,i.fillRect(0,0,s.width,s.height)}this.atmosphereTexture=new Qo(s),this.atmosphereTexture.name="r10-soft-sun-shaft-mask",this.atmosphereTexture.colorSpace=je;for(let n=0;n<e.lightShaftCount;n+=1){const o=r[n];if(o===void 0)continue;const A=new ko({map:this.atmosphereTexture,color:a?ol[n]?.color??16765836:n===1?16769709:16765836,transparent:!0,opacity:e.shaftOpacity*2.2,depthWrite:!1,depthTest:!1,blending:zt,fog:!0,toneMapped:!0,rotation:-.48}),l=new un(A);l.name=`r10-sun-receiver-shaft-${n+1}`,l.position.copy(o),l.scale.set(62+n*8,285-n*22,1),l.renderOrder=2,this.atmospherePresentation.add(l);const c=new I(new ec(1,32),new F({color:16765322,transparent:!0,opacity:e.shaftOpacity*.82,depthWrite:!1,depthTest:!0,blending:zt,fog:!0,toneMapped:!0}));c.name=`r10-sun-receiver-pool-${n+1}`,c.rotation.x=-Math.PI/2,c.rotation.z=-.38,c.position.set(o.x,3.2,o.z),c.scale.set(92-n*8,38-n*3,1),c.renderOrder=1,this.atmospherePresentation.add(c)}if(e.dustParticleCount>0){const n=new Float32Array(e.dustParticleCount*3);let o=1378955329;const A=()=>(o=Math.imul(o^o>>>15,2246822519)>>>0,o=Math.imul(o^o>>>13,3266489917)>>>0,((o^o>>>16)>>>0)/4294967295);for(let d=0;d<e.dustParticleCount;d+=1){const u=d*3;n[u]=a?Ar.minimumX+A()*(Ar.maximumX-Ar.minimumX):250+A()*510,n[u+1]=18+A()*178,n[u+2]=a?Ar.minimumZ+A()*(Ar.maximumZ-Ar.minimumZ):690+A()*400}const l=new $e;l.setAttribute("position",new He(n,3));const c=new Hr(l,new Gs({color:16770741,size:2.6,sizeAttenuation:!0,transparent:!0,opacity:Math.min(.22,e.shaftOpacity*3.2),depthWrite:!1,blending:zt,fog:!0,toneMapped:!0}));c.name="r10-sunlit-atmospheric-dust",c.renderOrder=3,this.atmospherePresentation.add(c)}if(e.waterMistCount>0){const n=new Float32Array(e.waterMistCount*3);for(let l=0;l<e.waterMistCount;l+=1){const c=dr(l+211,l*7+43,5718356),d=l*3;n[d]=a?1380+(c>>>2&255)/255*1020:250+(c>>>2&255)/255*520,n[d+1]=6+(c>>>12&127)/127*26,n[d+2]=a?340+(c>>>20&255)/255*1160:690+(c>>>20&255)/255*360}const o=new $e;o.setAttribute("position",new He(n,3));const A=new Hr(o,new Gs({color:13166821,size:8,sizeAttenuation:!0,transparent:!0,opacity:.12,depthWrite:!1,blending:To,fog:!0,toneMapped:!0}));A.name="r10-waterline-mist",A.renderOrder=2,this.atmospherePresentation.add(A)}this.renderer.domElement.dataset.qualityEffectiveAtmosphere=`${e.lightShaftCount} shafts / ${e.dustParticleCount} dust / ${e.waterMistCount} water-mist`}createGround(e){const r=e.world.width+480,s=-240,i=e.world.height+240,n=r- -480,o=i-s,A=Math.ceil(n/Ls),l=Math.ceil(o/Ls),c=[],d=[],u=[],h=[],g=new Y,p=new Y(16777215);for(let b=0;b<=l;b+=1){const x=Math.min(i,s+b*Ls);for(let B=0;B<=A;B+=1){const E=Math.min(r,-480+B*Ls),M=dr(B+401,b+809,17),T=ng(M);c.push(E,T,x),u.push((E- -480)/n,1-(x-s)/o),g.setHex(Rw(E,x,b*(A+1)+B)),g.offsetHSL(((M>>>19&15)/15-.5)*.012,((M>>>4&15)/15-.5)*.035,((M>>>13&15)/15-.5)*.055),g.lerp(p,ne(this.presentationProfile)?ve.display.groundWhiteMix:this.environmentProfile==="r04-live"?G.display.groundWhiteMix:this.environmentProfile==="beauty-cell"?.24:.72),d.push(g.r,g.g,g.b)}}for(let b=0;b<l;b+=1)for(let x=0;x<A;x+=1){const B=b*(A+1)+x,E=B+1,M=B+A+1,T=M+1;(b+x)%2===0?h.push(B,M,E,E,M,T):h.push(B,M,T,B,T,E)}const m=new $e;m.setAttribute("position",new Ee(c,3)),m.setAttribute("color",new Ee(d,3)),m.setAttribute("uv",new Ee(u,2)),m.setIndex(h),m.computeVertexNormals(),m.computeBoundingBox(),m.computeBoundingSphere();const f=new L({color:16777215,vertexColors:!0,roughness:.96,metalness:0,dithering:!0}),w=b=>{b.name="generated-reclaimed-meadow-v1",b.colorSpace=je,b.wrapS=We,b.wrapT=We,b.repeat.set(n/720,o/720),b.minFilter=xa,b.magFilter=at,b.anisotropy=this.qualityProfile.effects.maximumAnisotropy==="device-maximum"?this.renderer.capabilities.getMaxAnisotropy():Math.min(this.qualityProfile.effects.maximumAnisotropy,this.renderer.capabilities.getMaxAnisotropy())};this.renderer.domElement.dataset.groundTexture="loading";const v=new Fn().load(gg,b=>{if(this.disposed){b.dispose();return}w(b),this.groundTexture=b,f.map=b,f.color.setHex(16777215),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="ready"},void 0,()=>{this.groundTexture?.dispose(),this.groundTexture=null,!this.disposed&&(f.map=null,f.color.setHex(10991757),f.needsUpdate=!0,this.renderer.domElement.dataset.groundTexture="fallback")});w(v),this.groundTexture=v,f.map=v;const y=new I(m,f);y.name="continuous-reclaimed-ground",y.receiveShadow=!0,this.scene.add(y),this.renderer.domElement.dataset.groundGeometryModel="authored-meadow-plus-semantic-bank-mesh";const P=new Xs(new Ro(new ge(e.world.width,8,e.world.height)),new dn({color:6458738,transparent:!0,opacity:.12}));P.position.set(e.world.width/2,-7,e.world.height/2),this.scene.add(P)}createLivingWaterReclamationCell(){const e=this.livingWaterSections,a=fl,r=(p,m)=>{const f=[],w=[],v=[],y=[];for(let b=0;b<e.length;b+=1){const x=e[b];for(const B of[-1,1]){const E=p(x,B,b),M=m(x,B);f.push(E.x,E.y,E.z),w.push(M.r,M.g,M.b),v.push(B<0?0:1,x.progress*7.5)}if(b>0){const B=(b-1)*2,E=b*2;y.push(B,E,B+1,B+1,E,E+1)}}const P=new $e;return P.setAttribute("position",new Ee(f,3)),P.setAttribute("color",new Ee(w,3)),P.setAttribute("uv",new Ee(v,2)),P.setIndex(y),P.computeVertexNormals(),P.computeBoundingSphere(),P},s=r((p,m)=>new S(p.centerX+m*p.width*.5,a+Math.sin(p.progress*Math.PI*4)*.08,p.z),(p,m)=>new Y(m<0?3969440:6469806).lerp(new Y(10345161),p.progress*.18)),i=new I(s,new L({color:16777215,vertexColors:!0,transparent:!0,opacity:this.qualityProfile.effects.water.surfaceOpacity,depthWrite:!1,roughness:.32,metalness:0,side:Se}));i.name="r10-living-water-surface",i.renderOrder=1,i.receiveShadow=!0,i.userData.runtimeMaterialRoute={surface:null,reflectionRole:"wet",materialRole:"water",worldScale:96,neutralAlbedoEligible:!1},this.scene.add(i);const n=r((p,m)=>new S(p.centerX+m*p.width*.47,a-.08-p.bedDepth*.008,p.z),(p,m)=>new Y(m<0?3235413:4747098).lerp(new Y(8679248),p.progress*.25)),o=new I(n,new L({color:16777215,vertexColors:!0,roughness:.92,metalness:0}));o.name="r10-living-water-bed",o.receiveShadow=!0,o.userData.runtimeMaterialRoute={surface:null,reflectionRole:"ground",materialRole:"ground",worldScale:112,neutralAlbedoEligible:!1},this.scene.add(o);const A=this.qualityProfile.effects.terrain.geometryRelief,l=[],c=[],d=[],u=[];for(let p=0;p<e.length;p+=1){const m=e[p];for(const f of[-1,1]){const w=Math.sin(m.progress*Math.PI*5+f)*A*.18,v=new Y(f<0?7173712:9147234).lerp(new Y(5401415),m.progress*.24);l.push(m.centerX+f*(m.width*.5+48),2.05+w*.08,m.z,m.centerX+f*(m.width*.5+5),a-.05,m.z),c.push(v.r,v.g,v.b,v.r,v.g,v.b),d.push(0,m.progress*5,1,m.progress*5)}if(p>0){const f=(p-1)*4,w=p*4;u.push(f,w,f+1,f+1,w,w+1,f+2,f+3,w+2,f+3,w+3,w+2)}}const h=new $e;h.setAttribute("position",new Ee(l,3)),h.setAttribute("color",new Ee(c,3)),h.setAttribute("uv",new Ee(d,2)),h.setIndex(u),h.computeVertexNormals(),h.computeBoundingSphere();const g=new I(h,new L({color:16777215,vertexColors:!0,roughness:.94,metalness:0,side:Se}));g.name="r10-living-water-bank-relief",g.receiveShadow=!0,g.castShadow=!0,g.userData.runtimeMaterialRoute={surface:null,reflectionRole:"ground",materialRole:"ground",worldScale:128,neutralAlbedoEligible:!1},this.scene.add(g),this.createLivingWaterFoam(e,a),this.createLivingWaterEdgeDetail(e,a),this.createLivingWaterAmbientLife(e,a),this.renderer.domElement.dataset.livingWaterCell=KA,this.renderer.domElement.dataset.livingWaterUv="authored-flow-uv-v1",this.renderer.domElement.dataset.livingWaterGeometry=`${e.length} sections / semantic-bed-and-banks`}createLivingWaterFoam(e,a){const r=this.qualityProfile.effects.water.foamSegmentCount;if(r===0)return;const s=[],i=[],n=[];for(let c=0;c<r;c+=1){const d=c/Math.max(1,r-1),u=Math.min(e.length-1,Math.round(d*(e.length-1))),h=e[u],g=c%2===0?-1:1,p=h.centerX+g*h.width*.46,m=3.2+c%3*.8,f=7+c%4*2,w=s.length/3;s.push(p-m,a+.12,h.z-f,p+m,a+.12,h.z-f,p+m,a+.12,h.z+f,p-m,a+.12,h.z+f),i.push(0,0,1,0,1,1,0,1),n.push(w,w+2,w+1,w,w+3,w+2)}const o=new $e;o.setAttribute("position",new Ee(s,3)),o.setAttribute("uv",new Ee(i,2)),o.setIndex(n),o.computeVertexNormals(),this.riverFoamTimeUniform={value:0};const A=new xt({uniforms:{r10FoamTime:this.riverFoamTimeUniform},transparent:!0,depthWrite:!1,side:Se,fog:!1,vertexShader:`
        varying vec2 vFoamUv;
        void main() {
          vFoamUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float r10FoamTime;
        varying vec2 vFoamUv;
        void main() {
          float broken = 0.56 + 0.34 * sin(
            (vFoamUv.y + r10FoamTime * 0.16) * 18.0 +
            sin(vFoamUv.x * 13.0) * 2.0
          );
          float edge = smoothstep(0.0, 0.22, vFoamUv.x) *
            smoothstep(1.0, 0.78, vFoamUv.x);
          gl_FragColor = vec4(vec3(0.78, 0.93, 0.86), broken * edge * 0.46);
        }
      `}),l=new I(o,A);l.name="r10-living-water-foam",l.renderOrder=3,this.scene.add(l)}createLivingWaterEdgeDetail(e,a){const r=this.qualityProfile.effects.ambientLife;if(r.waterEdgePropCount>0){const u=new Be(new $l(4.4,0),new L({color:7371116,roughness:.88,metalness:.04}),r.waterEdgePropCount);u.name="r10-living-water-edge-rubble",u.castShadow=!0,u.receiveShadow=!0;const h=new fe,g=new ot,p=new S;for(let m=0;m<r.waterEdgePropCount;m+=1){const f=e[m%e.length],w=m%2===0?-1:1,v=dr(m+71,f.z,29);g.setFromEuler(new Ie((v>>>3&7)*.08,(v>>>8&15)*Math.PI/8,(v>>>15&7)*.06)),p.set(.7+(v>>>5&7)*.08,.45+(v>>>12&7)*.06,.72+(v>>>19&7)*.09),h.compose(new S(f.centerX+w*(f.width*.5+12+v%22),a+.2,f.z+((v>>>21&31)-15)),g,p),u.setMatrixAt(m,h)}u.instanceMatrix.needsUpdate=!0,this.scene.add(u)}if(r.bankPlantCount===0)return;this.vegetationWindTimeUniform={value:0};const s=new L({color:6066001,roughness:.86,metalness:0,side:Se}),i=this.vegetationWindTimeUniform,n=this.qualityProfile.effects.atmosphere.vegetationWindStrength*this.visualStabilityProfile.temporal.vegetationAmplitudeScale,o=this.visualStabilityProfile.temporal.vegetationSpeedScale;s.onBeforeCompile=u=>{u.uniforms.r10WindTime=i,u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
uniform float r10WindTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
         float bankWind = sin(r10WindTime * ${(1.6*o).toFixed(4)} + position.y * 0.31 + position.x);
         transformed.x += bankWind * ${n.toFixed(4)} *
           smoothstep(-7.0, 9.0, position.y) * 2.8;`)},s.customProgramCacheKey=()=>`r10-bank-wind-${n.toFixed(4)}-${o.toFixed(4)}`;const A=new Be(new vr(3.6,18,4,1),s,r.bankPlantCount);A.name="r10-living-water-bank-plants",A.castShadow=this.visualStabilityProfile.temporal.microVegetationCastShadow;const l=new fe,c=new ot,d=new S;for(let u=0;u<r.bankPlantCount;u+=1){const h=u/Math.max(1,r.bankPlantCount-1),g=e[Math.round(h*(e.length-1))],p=u%2===0?-1:1,m=dr(u+113,g.z,41);c.setFromAxisAngle(new S(0,1,0),(m>>>9&31)*Math.PI/16),d.setScalar(.64+(m>>>17&15)*.035),l.compose(new S(g.centerX+p*(g.width*.5+15+m%34),a+7.2,g.z+((m>>>20&31)-15)),c,d),A.setMatrixAt(u,l)}A.instanceMatrix.needsUpdate=!0,this.scene.add(A)}createLivingWaterAmbientLife(e,a){const r=this.qualityProfile.effects.ambientLife;if(r.birdCapacity>0){const s=new $e;s.setAttribute("position",new Ee([-12,0,0,0,2.4,2,-2,0,-4,12,0,0,2,0,-4,0,2.4,2],3)),s.computeVertexNormals(),this.ambientBirds=new Be(s,new F({color:2506301,side:Se}),r.birdCapacity),this.ambientBirds.name="r10-ambient-birds",this.ambientBirds.frustumCulled=!1,this.scene.add(this.ambientBirds)}if(r.insectCapacity>0&&(this.ambientInsects=new Be(new ja(2.1,0),new F({color:16042333}),r.insectCapacity),this.ambientInsects.name="r10-ambient-butterflies",this.ambientInsects.frustumCulled=!1,this.scene.add(this.ambientInsects)),this.qualityProfile.effects.water.rippleCapacity>0&&(this.ambientRipples=new Be(new Yt(4,5,24),new F({color:12119777,transparent:!0,opacity:.42,depthWrite:!1,side:Se}),this.qualityProfile.effects.water.rippleCapacity),this.ambientRipples.name="r10-living-water-ripples",this.ambientRipples.frustumCulled=!1,this.scene.add(this.ambientRipples)),r.leafCapacity>0){const s=Array.from({length:r.leafCapacity},(n,o)=>{const A=e[o%e.length],l=dr(o+211,A.z,59);return new S(A.centerX+((l>>>4&127)-63),a+18+(l>>>13&63),A.z+((l>>>20&63)-31))}),i=new $e;i.setAttribute("position",new Ee(s.flatMap(n=>[n.x,n.y,n.z]),3)),this.ambientLeaves=new Hr(i,new Gs({color:10136916,size:3.6,sizeAttenuation:!0,transparent:!0,opacity:.64,depthWrite:!1})),this.ambientLeaves.name="r10-ambient-windborne-leaves",this.ambientLeaves.frustumCulled=!1,this.ambientLeafOrigins=s,this.scene.add(this.ambientLeaves)}this.updateLivingWaterAmbientLife(e,a,0)}updateLivingWaterAmbientLife(e,a,r){const s=this.reusableMatrix,i=this.reusablePosition,n=this.reusableQuaternion,o=this.reusableScale;if(this.ambientBirds!==null){for(let A=0;A<this.ambientBirds.count;A+=1){const l=(r*(.032+A*.003)+A*.21)%1,c=l>.12&&l<.78;i.set(-130+l*560,112+A*13+Math.sin(l*Math.PI*4+A)*12,770+A*62),n.setFromEuler(new Ie(Math.sin(l*Math.PI*10)*.18,-.55,0)),o.setScalar(c?1:.001),s.compose(i,n,o),this.ambientBirds.setMatrixAt(A,s)}this.ambientBirds.instanceMatrix.needsUpdate=!0}if(this.ambientInsects!==null){for(let A=0;A<this.ambientInsects.count;A+=1){const l=e[A%e.length];i.set(l.centerX+Math.sin(r*1.3+A*2.1)*68,a+18+A%4*7+Math.sin(r*3.7+A)*5,l.z+Math.cos(r*.9+A*1.7)*35),n.setFromEuler(new Ie(0,r*2+A,0)),o.setScalar(.8+Math.sin(r*7+A)*.25),s.compose(i,n,o),this.ambientInsects.setMatrixAt(A,s)}this.ambientInsects.instanceMatrix.needsUpdate=!0}if(this.ambientRipples!==null){n.setFromEuler(new Ie(-Math.PI/2,0,0));for(let A=0;A<this.ambientRipples.count;A+=1){const l=e[(A*3+2)%e.length],c=(r*.28+A*.37)%1;i.set(l.centerX+Math.sin(A*4.1)*l.width*.28,a+.16,l.z+Math.cos(A*2.7)*22),o.setScalar(.25+c*2.8),s.compose(i,n,o),this.ambientRipples.setMatrixAt(A,s)}this.ambientRipples.instanceMatrix.needsUpdate=!0}if(this.ambientLeaves!==null){const A=this.ambientLeaves.geometry.getAttribute("position");for(let l=0;l<this.ambientLeafOrigins.length;l+=1){const c=this.ambientLeafOrigins[l],d=r*.34+l*.71;A.setXYZ(l,c.x+Math.sin(d*1.9)*24,c.y+Math.sin(d*2.7)*10,c.z+(r*(4+l%3)+l*9)%72-36)}A.needsUpdate=!0}}createFieldGrowth(e,a=new Set){const s=Math.ceil(e.world.width/142),i=Math.ceil(e.world.height/142),n=[],o=(y,P,b,x,B=1,E=1,M=1)=>{n.push({x:y,y:P,z:b,rotation:(x>>>8)%16*(Math.PI/8),scaleX:B*(.78+(x>>>3)%7*.055),scaleY:M*(.82+(x>>>19)%6*.06),scaleZ:E*(.8+(x>>>13)%7*.05)})};for(let y=0;y<i;y+=1)for(let P=0;P<s;P+=1){const b=(Math.imul(P+11,73856093)^Math.imul(y+17,19349663))>>>0;if(b%100>15)continue;const x=(P+.5)*142+((b>>>3&255)/255-.5)*52,B=(y+.5)*142+((b>>>11&255)/255-.5)*52;x<24||B<24||x>e.world.width-24||B>e.world.height-24||Math.abs(B-900)<88||e.world.terrain.some(E=>x>E.bounds.x-10&&x<E.bounds.x+E.bounds.width+10&&B>E.bounds.y-10&&B<E.bounds.y+E.bounds.height+10)||o(x,.8,B,b,.84+(b>>>21)%4*.1,.82+(b>>>25)%4*.1,.82)}if(e.world.terrain.forEach((y,P)=>{if(a.has(y.id))return;const b=y.bounds,x=b.x,B=b.x+b.width,E=b.y,M=b.y+b.height,T=x+b.width/2,k=E+b.height/2,H=dr(P+31,b.x,b.y);switch(y.kind){case"building":{const O=y.height+10.5;o(x+b.width*.2,O,E+b.height*.22,H,1.25,1,.78),o(B-b.width*.16,O,M-b.height*.2,H^1540483477,1.38,.92,.9),o(T+b.width*.08,O,M-b.height*.1,H^3550635116,2.05,.7,.52),o(x-3,.8,k-b.height*.2,H^668265261,1.15,1.32),o(B+2,.8,k+b.height*.22,H^374761393,1.1,1.26);break}case"wall":{const O=b.width>=b.height;for(let X=0;X<3;X+=1){const j=.16+X*.34,ee=H^Math.imul(X+7,73244475);o(O?x+b.width*j:T,y.height+.8,O?k:E+b.height*j,ee,O?1.42:.82,O?.82:1.42,.72)}o(O?T+b.width*.26:x-3,.8,O?M+2:k+b.height*.2,H^2654435769,O?1.25:.94,O?.94:1.25);break}case"pillar":o(T,y.height+.8,k,H,1.02,1.02,.72),o(B+1,.8,M-b.height*.12,H^2135587861,1.2,1.2);break;case"rock":o(T+b.width*.25,y.height+.8,k+b.height*.3,H,1.28,1.14,.9);break;case"water":{[[x+b.width*.12,E-2,!1],[x+b.width*.48,E-4,!1],[B-b.width*.12,E+1,!0],[B+2,E+b.height*.28,!1],[B-1,M-b.height*.18,!0],[x+b.width*.64,M+2,!1],[x+b.width*.26,M-1,!0],[x-3,E+b.height*.54,!1]].forEach(([X,j,ee],J)=>{o(X,ee?y.height+.5:.8,j,H^Math.imul(J+13,668265261),1.02,1.24,.92)});break}}}),n.length===0)return;const A=this.firstStageLandmark!==null,l=A?n.filter((y,P)=>P%2===0):n,c=this.firstStageLandmark===null?Sw():Iw(),d=new L({color:16777215,vertexColors:!0,roughness:.88,metalness:0,side:A?Se:Rn}),u=this.qualityProfile.effects.atmosphere.vegetationWindStrength*this.visualStabilityProfile.temporal.vegetationAmplitudeScale,h=this.visualStabilityProfile.temporal.vegetationSpeedScale;if(u>0){const y={value:0};this.vegetationWindTimeUniform=y,d.onBeforeCompile=P=>{P.uniforms.r10WindTime=y,P.uniforms.r10WindStrength={value:u},P.vertexShader=P.vertexShader.replace("void main() {",`uniform float r10WindTime;
uniform float r10WindStrength;
void main() {`).replace("#include <begin_vertex>",`#include <begin_vertex>
          float r10WindHeight = smoothstep(1.0, 54.0, position.y);
          float r10WindPhase = position.x * 0.11 + position.z * 0.07;
          transformed.x += sin(r10WindTime * ${(1.7*h).toFixed(4)} + r10WindPhase) *
            r10WindStrength * r10WindHeight * 5.0;
          transformed.z += cos(r10WindTime * ${(1.25*h).toFixed(4)} + r10WindPhase) *
            r10WindStrength * r10WindHeight * 2.4;`)},d.customProgramCacheKey=()=>`r10-wind-${u}-${h}`}const g=new Be(c,d,l.length),p=new fe,m=new S,f=new ot,w=new S,v=new S(0,1,0);l.forEach((y,P)=>{m.set(y.x,y.y,y.z),f.setFromAxisAngle(v,y.rotation),w.set(y.scaleX,y.scaleY,y.scaleZ),p.compose(m,f,w),g.setMatrixAt(P,p)}),g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere(),g.name="reclaiming-growth",g.userData.presentationProfile=this.firstStageLandmark===null?"legacy-block-growth":"first-stage-organic-growth-v1",g.userData.placementCount=l.length,g.userData.sourcePlacementCount=n.length,g.receiveShadow=!0,this.scene.add(g)}createTerrain(e,a=new Set){const r={building:new L({color:11119246,roughness:.92}),wall:new L({color:9737866,roughness:.96}),rock:new L({color:8360315,roughness:.98}),pillar:new L({color:9799578,roughness:.9}),water:new L({color:5083553,transparent:!0,opacity:.82,roughness:.28,metalness:.04})};for(const s of e.world.terrain){if(a.has(s.id))continue;const i=new ge(s.bounds.width,s.height,s.bounds.height),n=new I(i,r[s.kind]);n.position.set(s.bounds.x+s.bounds.width/2,s.height/2,s.bounds.y+s.bounds.height/2),n.name=s.id;const o=ug(s.kind);if(n.userData.runtimeMaterialRoute={...o,neutralAlbedoEligible:!1},n.receiveShadow=s.kind!=="water",n.castShadow=s.kind==="building"||s.kind==="wall"||s.kind==="pillar",this.scene.add(n),s.kind!=="water"){const A=new Xs(new Ro(i),new dn({color:s.kind==="pillar"?7362427:6450525,transparent:!0,opacity:.34}));A.position.copy(n.position),this.scene.add(A)}if(s.kind==="building"){const A=new I(new ge(s.bounds.width+18,10,s.bounds.height+18),new L({color:12020809,roughness:.86}));A.position.set(n.position.x,s.height+5,n.position.z),A.name=`${s.id}-roof`,A.userData.runtimeMaterialRoute={surface:"roof",reflectionRole:"metal",materialRole:"metal",worldScale:150,neutralAlbedoEligible:!1},A.castShadow=!0,A.receiveShadow=!0,this.scene.add(A)}}}createProps(e,a=new Set){for(const r of e.world.props){if(this.firstStageLandmark!==null&&r.interactive){const A=Cw(r.kind);A.position.set(r.x,0,r.y),A.rotation.y=r.rotation,A.name=`${r.id}-interactive-world-marker`,this.scene.add(A)}if(a.has(r.id))continue;const s=Tw(r.kind),i=Ur(s,uw,1),n=fg(r.kind);i.userData.runtimeMaterialRoute={...n,neutralAlbedoEligible:!1};const o=new R;o.position.set(r.x,0,r.y),o.rotation.y=r.rotation,o.add(i,cr(28,17,.24)),r.kind==="lamp"?o.scale.setScalar(.72):r.kind==="signpost"?o.scale.set(.62,.78,.62):r.kind==="relay"&&o.scale.setScalar(1.18),o.name=r.id,this.scene.add(o)}}createLandmarkSignals(e){const a=[6415825,16034128,8546725];e.world.landmarks.forEach((r,s)=>{const i=new F({color:a[s]??6415825,transparent:!0,opacity:.12,side:Se,depthWrite:!1}),n=new I(new Yt(54,59,40),i);n.rotation.x=-Math.PI/2,n.position.set(r.center.x,2,r.center.y),n.name=`landmark-${r.id}`,this.scene.add(n)})}syncPlayer(e,a,r,s){const i=e.player,n=this.lastPlayerX===null||this.lastPlayerY===null?0:Math.hypot(s.x-this.lastPlayerX,s.y-this.lastPlayerY),o=a>Number.EPSILON?C.clamp(n/a/118,0,1):0;this.lastPlayerX=s.x,this.lastPlayerY=s.y,this.playerGroup.position.x=s.x,this.playerGroup.position.z=s.y,this.renderer.domElement.dataset.visualPlayerX=s.x.toFixed(3),this.renderer.domElement.dataset.visualPlayerY=s.y.toFixed(3);const A=C.clamp(r?.movementPriorityBlend??0,0,1),l=o>.04?Math.sin(this.elapsed*(6.8+A*3.4))*Math.min(1,o)*(1-A*.58):0;if(this.heroPresentation!==null){const g=this.presentationProfile==="r09-fram"?jp(s.x,s.y):0;if(this.playerGroup.position.y=Wp(g,this.heroPresentation.grounding,this.heroWorldScale,l),this.playerShadow.position.set(s.x,g+this.heroPresentation.shadow.surfaceOffset,s.y),this.ws1ActionFeel){const p=1+A*.2;this.playerShadow.scale.set(this.heroPresentation.shadow.contactRadiusX*p,this.heroPresentation.shadow.contactRadiusZ/Math.max(1,p*.78),1);const m=this.playerShadow.material;if(m instanceof xt){const f=m.uniforms.opacity;f!==void 0&&(f.value=C.lerp(this.heroPresentation.shadow.contactOpacity,this.heroPresentation.shadow.contactOpacity*.76,A))}}this.renderer.domElement.dataset.heroGroundSurfaceY=String(g),this.renderer.domElement.dataset.heroRootY=String(Math.round(this.playerGroup.position.y*1e3)/1e3)}else this.playerGroup.position.y=l*.6;this.playerGroup.rotation.y=Fp(i.facingX,i.facingY,this.environmentProfile==="r04-live"?"+z":"-z"),this.renderer.domElement.dataset.heroFacingRadians=String(Math.round(this.playerGroup.rotation.y*1e3)/1e3),this.bladeMesh.visible=i.weaponId==="blade",this.impactMesh.visible=i.weaponId==="impact",this.localHitstopSeconds<=0&&(this.attackAnimation=Math.max(0,this.attackAnimation-a*this.attackAnimationRate));const c=1-this.attackAnimation,d=this.attackAnimation>0?Math.sin(c*Math.PI)*(this.attackWeapon==="impact"?1.42:1.05):0;this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?(this.bladeMesh.rotation.set(0,0,0),this.impactMesh.rotation.set(0,0,0)):(this.bladeMesh.rotation.z=-.42-d,this.impactMesh.rotation.z=-.28-d);const u=i.invulnerableTicks>0&&e.tick%2===0?12124148:16777215;if(this.playerHeroVisual===null){this.bladeMesh instanceof I&&this.impactMesh instanceof I&&(Cn(this.bladeMesh,"blade"),Cn(this.impactMesh,"impact")),yw(this.playerBody,u);return}Er(this.bladeMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:pr),Er(this.impactMesh,this.environmentProfile==="beauty-cell"||this.environmentProfile==="r04-live"?{x:0,y:0,z:0}:En),this.heroHurtAnimation=Math.max(0,this.heroHurtAnimation-a*3.8),this.heroSkillAnimation=Math.max(0,this.heroSkillAnimation-a*1.45),this.heroDashAnimation=Math.max(0,this.heroDashAnimation-a*4.8),this.heroGuardAnimation=Math.max(0,this.heroGuardAnimation-a*3.8),this.heroLinkAnimation=Math.max(0,this.heroLinkAnimation-a*5.6);const h=Qw(r,this.heroHurtAnimation,this.heroSkillAnimation,this.heroDashAnimation,this.heroGuardAnimation,this.heroLinkAnimation,this.attackAnimation,this.attackContact,o);this.playerHeroVisual.updatePose({motion:h.motion,timeSeconds:this.elapsed,progress:h.progress,moveAmount:o}),this.playerHeroVisual.setTint(u)}syncCompanion(e,a){const r=e.player,s=Math.hypot(r.facingX,r.facingY),i=s>Number.EPSILON?r.facingX/s:0,n=s>Number.EPSILON?r.facingY/s:-1,o=r.x-i*32-n*38,A=r.y-n*32+i*38,l=(this.companionGroup.position.x-o)**2+(this.companionGroup.position.z-A)**2;if(!this.companionInitialized||l>140**2)this.companionGroup.position.x=o,this.companionGroup.position.z=A,this.companionInitialized=!0;else{const d=1-Math.exp(-6.4*a);this.companionGroup.position.x=C.lerp(this.companionGroup.position.x,o,d),this.companionGroup.position.z=C.lerp(this.companionGroup.position.z,A,d)}this.companionGroup.position.y=1.2+Math.sin(this.elapsed*4.4+.8)*.7,this.companionGroup.rotation.y=Math.atan2(-i,-n),this.companionReaction=Math.max(0,this.companionReaction-a*2.6);const c=1+Math.sin((1-this.companionReaction)*Math.PI*3)*this.companionReaction*.045;this.companionGroup.scale.setScalar(c*(this.environmentProfile==="r04-live"?G.actors.companionPreviewScale:this.environmentProfile==="beauty-cell"?1.08:1)),this.companionBeautyVisual?.updatePose({timeSeconds:this.elapsed,moveAmount:C.clamp(Math.sqrt(l)/72,0,1),reaction:this.companionReaction})}syncEnemies(e){const a=new Set;for(const r of e.enemies){a.add(r.id);let s=this.enemyVisuals.get(r.id);s===void 0&&(s=this.createEnemyVisual(r),this.enemyVisuals.set(r.id,s),this.scene.add(s.group));const i=this.firstStageLandmark===null?void 0:this.enemyDefeatAnimations.get(r.id),n=r.defeated&&i!==void 0&&i>this.elapsed,o=r.defeated?n?C.clamp(1-(i-this.elapsed)/zs,0,1):1:0;(!r.defeated||(i??0)<=this.elapsed)&&this.enemyDefeatAnimations.delete(r.id),s.group.visible=!r.defeated||r.kind==="named-anomaly"||n,s.group.position.set(r.x,s.baseY,r.y),s.group.rotation.y=Math.atan2(-(e.player.x-r.x),-(e.player.y-r.y)),s.group.rotation.x=0,s.group.rotation.z=0;const A=this.enemyReactions.get(r.id);if(A!==void 0){const h=C.clamp((this.elapsed-A.startedAt)/A.duration,0,1);if(h>=1)this.enemyReactions.delete(r.id);else{const g=Math.sin(C.clamp(h/.22,0,1)*Math.PI/2),p=(1-h)*(1-h),m=g*p*A.distance;s.group.position.x+=A.directionX*m,s.group.position.z+=A.directionY*m,s.group.rotation.x=-A.directionY*A.tilt*p,s.group.rotation.z=A.directionX*A.tilt*p}}const l=r.disposition==="calmed"||r.disposition==="connected"?.92:r.rank==="elite"?1.12:r.rank==="boss"||r.kind==="named-anomaly"?1.2:1;if(r.defeated){const h=Math.sin(C.clamp(o/.28,0,1)*Math.PI),g=C.smoothstep(o,.12,.88),p=[...r.id].reduce((f,w)=>f+w.charCodeAt(0),0)%2===0?1:-1,m=r.kind==="named-anomaly"?.34:.56;s.group.scale.set(l*(1+h*.08),l*(1-g*m),l*(1+h*.05)),s.group.rotation.z+=p*g*(r.kind==="named-anomaly"?.42:.78)}else s.group.scale.setScalar(l);const c=r.kind!=="named-anomaly"&&r.defeated?o<=.58?1:Math.max(0,1-(o-.58)/.42):r.disposition==="connected"?.62:1;s.body.material.opacity=c,s.body.material.transparent=c<1;const d=r.kind==="named-anomaly"&&r.defeated?.38:r.defeated?Math.max(0,1-o):r.disposition==="connected"?.42:r.disposition==="calmed"||r.disposition==="dormant"?.58:.92;s.hostileCore.material.opacity=d,s.hostileCore.visible=this.firstStageLandmark!==null&&s.group.visible,s.roleMarker.visible=this.firstStageLandmark!==null&&s.group.visible,vl(s.roleMarker,d),s.rankMarker.visible=this.firstStageLandmark!==null&&s.group.visible&&(r.rank==="elite"||r.rank==="boss"),s.rankMarker.rotation.y=this.elapsed*(r.rank==="boss"?.92:-1.35);const u=1+Math.sin(this.elapsed*4.2)*.055;if(s.rankMarker.scale.setScalar(u),vl(s.rankMarker,d*.9),s.group.userData.visualState=n?"defeat-hold":r.defeated?"defeated":r.disposition,s.telegraph.visible=!r.defeated&&r.attack.phase==="telegraph",s.telegraph.visible){const h=Ba(r.kind,r.rank),g=r.attack.attackId?.startsWith("enemy-boss-surge-")===!0,p=g?Math.round(h.telegraphTicks*1.5):h.telegraphTicks,m=g?h.attackRange*1.45:h.attackRange,f=1+Math.sin(r.attack.ticksRemaining/Math.max(1,p)*Math.PI*2)*.08;s.telegraph.scale.setScalar(f*((m+r.radius)/58)),s.telegraph.material.color.setHex(g?13790207:15548468),s.telegraph.material.opacity=.34+(1-r.attack.ticksRemaining/Math.max(1,p))*.5}}for(const[r,s]of this.enemyVisuals)a.has(r)||(s.group.visible=!1);for(const[r,s]of this.enemyDefeatAnimations)(s<=this.elapsed||!a.has(r))&&this.enemyDefeatAnimations.delete(r)}createEnemyHealthBar(e){const a=e.rank==="boss"||e.kind==="named-anomaly"?"boss":e.rank==="elite"?"elite":"standard",r=a==="boss"?78:a==="elite"?58:46,s=a==="boss"?7:a==="elite"?6:5,i=new R,n=new I(new sa(r+5,s+5),new F({color:463119,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,toneMapped:!1})),o=new I(new sa(r,s),new F({color:2498075,transparent:!0,opacity:.94,depthTest:!1,depthWrite:!1,toneMapped:!1})),A=new I(new sa(r,s),new F({color:a==="boss"?13138431:a==="elite"?16756568:15754325,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,toneMapped:!1})),l=new I(new sa(r,.9),new F({color:a==="boss"?16177663:16773316,transparent:!0,opacity:.72,depthTest:!1,depthWrite:!1,toneMapped:!1}));return n.renderOrder=910,o.renderOrder=911,A.renderOrder=912,l.renderOrder=913,o.position.z=.04,A.position.z=.08,l.position.set(0,s/2-.45,.12),i.name=`${e.id}-health-bar`,i.userData.presentation="first-stage-enemy-health-bar",i.userData.prominence=a,i.add(n,o,A,l),this.scene.add(i),{group:i,fill:A,width:r}}syncEnemyHealthBars(e,a){if(this.firstStageLandmark===null)return;const r=new Set;let s=0;for(const i of e.enemies){r.add(i.id);let n=this.enemyHealthBars.get(i.id);n===void 0&&(n=this.createEnemyHealthBar(i),this.enemyHealthBars.set(i.id,n));const o=(this.enemyRecentlyDamagedUntil.get(i.id)??0)>this.elapsed,A=rw(i,e.player.x,e.player.y,a,o);if(n.group.visible=A.visible,!A.visible)continue;s+=1;const l=Math.max(.001,A.ratio);n.fill.scale.x=l,n.fill.position.x=-n.width*(1-l)/2;const c=A.prominence==="boss"?34:A.prominence==="elite"?22:12;n.group.position.set(i.x,i.radius*2.15+46+c,i.y),n.group.quaternion.copy(this.camera.quaternion),n.group.userData.hpRatio=A.ratio,n.group.userData.targeted=i.id===a}for(const[i,n]of this.enemyHealthBars)r.has(i)||(n.group.visible=!1);for(const[i,n]of this.enemyRecentlyDamagedUntil)(n<=this.elapsed||!r.has(i))&&this.enemyRecentlyDamagedUntil.delete(i);this.renderer.domElement.dataset.firstStageEnemyHealthBars=String(s)}syncCombatPresentation(e,a){if(a===void 0||a.targetId===null){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const r=e.enemies.find(n=>n.id===a.targetId&&!n.defeated);if(r===void 0){this.targetRing.visible=!1,this.windupRing.visible=!1;return}const s=Math.max(24,r.radius*1.45);this.targetRing.visible=!0,this.targetRing.position.set(r.x,2.8,r.y),this.targetRing.scale.setScalar(s/30),this.targetRing.material.color.setHex(e.player.weaponId==="blade"?6415825:16034128),this.targetRing.material.opacity=.56+Math.sin(this.elapsed*6)*.12;const i=a.phase==="windup";if(this.windupRing.visible=i,i){this.windupRing.position.set(r.x,3,r.y);const n=Math.max(.05,1-a.progress);this.windupRing.scale.setScalar(s/30*(1.6*n+.72)),this.windupRing.material.opacity=.3+a.progress*.66}}createEnemyVisual(e){const a=kw(e.kind),r=Ur(a,e.kind==="named-anomaly"?pl*1.15:pl,1);if(this.firstStageLandmark!==null){const c=bw(e.kind);r.material.roughness=c.roughness,r.material.metalness=c.metalness,r.material.envMapIntensity=c.environmentIntensity,r.material.emissive.setHex(c.emissive),r.material.emissiveIntensity=c.emissiveIntensity,r.material.envMap=this.localReflectionTarget?.texture??null,r.material.needsUpdate=!0,r.userData.pbrReadability=c.role,this.reflectiveWorldMaterials.add(r.material);const d=e.kind==="named-anomaly"?1.18:e.kind==="relay-shell"?1.12:e.kind==="culvert-lurker"?1.1:1.06;r.scale.setScalar(d)}const s=new R,i=new I(new Yt(43,54,32),new F({color:15548468,transparent:!0,opacity:.48,side:Se,depthWrite:!1})),n=Bw(e.kind),o=Pw(e.kind),A=Ew(e.rank,e.kind),l=xw(e.kind);return n.visible=this.firstStageLandmark!==null,o.visible=this.firstStageLandmark!==null,A.visible=this.firstStageLandmark!==null&&(e.rank==="elite"||e.rank==="boss"),l.visible=this.firstStageLandmark!==null,i.rotation.x=-Math.PI/2,i.position.y=3,i.visible=!1,s.name=`${e.id}-enemy-visual`,s.userData.enemyKind=e.kind,s.userData.enemyRank=e.rank??(e.kind==="named-anomaly"?"boss":"normal"),s.userData.readability="role-specific-world-space",s.add(r,cr(e.kind==="named-anomaly"?54:34,e.kind==="named-anomaly"?31:20,.26),Dw(e.kind),i,n,o,A,l),{group:s,body:r,telegraph:i,hostileCore:n,roleMarker:o,rankMarker:A,baseY:e.kind==="murmur"?16:0}}syncLoot(e){for(const a of e.world.loot){let r=this.lootVisuals.get(a.id);if(r===void 0){const s=Ur(ns,1.55,1);r=new R,this.firstStageLandmark===null?(r.add(s,cr(17,10,.2)),r.position.set(a.x,4,a.y),r.scale.setScalar(.68)):(s.name="loot-artifact",s.position.y=5,s.scale.setScalar(.68),r.add(s,cr(17,10,.2),Mw(a.radius)),r.position.set(a.x,0,a.y),r.userData.readability="loot-beacon-and-ground-ring"),r.name=a.id,this.lootVisuals.set(a.id,r),this.scene.add(r)}r.visible=!a.picked}}combatTextColor(e){switch(e){case"enemy-damage":return"#fff1c9";case"player-damage":return"#ff7868";case"healing":return"#7ff7c4";case"just-guard":return"#ffe29a";case"guard":case"passive-guard":return"#9ceee1";case"dodge":return"#c9e6ff";case"auto-chain":return"#9cf4e2";case"link":return"#ffe09a"}}addCombatTextCue(e){if(this.firstStageLandmark===null||typeof document>"u")return;const a=e.emphasis==="strong",r=document.createElement("canvas");r.width=a?600:520,r.height=a?168:150;const s=r.getContext("2d");if(s===null)return;s.clearRect(0,0,r.width,r.height),s.textAlign="center",s.textBaseline="middle",s.lineJoin="round",s.font=`${a?840:760} ${a?72:60}px system-ui, sans-serif`,s.lineWidth=a?21:18,s.strokeStyle="rgba(4, 13, 12, 0.94)",s.strokeText(e.text,r.width/2,r.height/2),s.lineWidth=a?5:4,s.strokeStyle="rgba(255, 255, 255, 0.34)",s.strokeText(e.text,r.width/2,r.height/2),s.fillStyle=this.combatTextColor(e.tone),s.fillText(e.text,r.width/2,r.height/2);const i=new Qo(r);i.name=`first-stage-${e.tone}-text`,i.colorSpace=je,i.minFilter=at,i.magFilter=at,i.generateMipmaps=!1;const n=new ko({map:i,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,toneMapped:!1,fog:!1}),o=new un(n),A=e.anchor==="enemy"&&e.enemyId!==void 0?`enemy:${e.enemyId}`:"player",l=this.combatTextEffects.filter(h=>h.sprite.userData.anchorKey===A&&h.age<.48).length,c=Math.min(2,l)*30,d=l%2===0?-5:5;if(e.anchor==="enemy"&&e.enemyId!==void 0){const h=this.enemyVisuals.get(e.enemyId);if(h===void 0){i.dispose(),n.dispose();return}o.position.set(h.group.position.x+d,h.group.position.y+(a?104:92)+c,h.group.position.z)}else o.position.set(this.playerGroup.position.x+d,(a?106:94)+c,this.playerGroup.position.z);const u=a?210:170;o.scale.set(u,u*r.height/r.width,1),o.renderOrder=940,o.frustumCulled=!1,o.name=`first-stage-combat-text-${e.tone}`,o.userData.presentation="first-stage-combat-text",o.userData.tone=e.tone,o.userData.text=e.text,o.userData.anchorKey=A,this.scene.add(o),this.renderer.domElement.dataset.firstStageCombatTextLast=e.text,this.renderer.domElement.dataset.firstStageCombatTextLastTone=e.tone,this.combatTextEffects.push({sprite:o,texture:i,age:0,duration:a?1.72:1.45,riseSpeed:a?38:32})}handleEvents(e){for(const a of e){if(this.firstStageLandmark!==null){a.type==="enemy-damaged"&&this.enemyRecentlyDamagedUntil.set(a.enemyId,this.elapsed+1.6);const r=this.ws1ActionFeel&&a.type==="enemy-damaged"&&a.contact!==void 0?null:hl(a);r!==null&&this.addCombatTextCue(r)}switch(a.type){case"auto-chain-resolved":{if(this.firstStageLandmark===null)break;this.renderer.domElement.dataset.ws1ResolvedAutoChain=String(a.chainStep);break}case"action-link-resolved":{this.renderer.domElement.dataset.ws1ResolvedLink=String(a.chainStep);break}case"enemy-attack-telegraphed":this.firstStageLandmark!==null&&a.attackId.startsWith("enemy-boss-surge-")&&(this.addRing(a.x,a.y,13790207,a.range*.32,a.range*.46,.78,.82),this.addRing(a.x,a.y,16765183,a.range*.62,a.range*.66,.58,.62),this.addBurst(a.x,a.y,14721279,18),this.pulseEffectLight(a.x,a.y,12999935,.92),this.cameraTrauma=Math.min(1,this.cameraTrauma+.24));break;case"enemy-attack-resolved":if(this.firstStageLandmark!==null&&a.attackId.startsWith("enemy-boss-surge-")){const r=this.enemyVisuals.get(a.enemyId);r!==void 0&&(this.addRing(r.group.position.x,r.group.position.z,16037631,66,250,.74,2.35),this.addBurst(r.group.position.x,r.group.position.z,13790207,26),this.pulseEffectLight(r.group.position.x,r.group.position.z,13790207,1),this.cameraTrauma=Math.min(1,this.cameraTrauma+.88))}break;case"player-attacked":if(this.activeBladeTrail!==null&&this.finishActiveBladeTrail(),this.pendingWs1DamageEvents.length>0&&this.resolvePendingWs1Contact(),this.attackAnimation=1,this.attackWeapon=a.weaponId,this.attackContact=a.contact??null,this.lastAttackDirectionX=a.directionX,this.lastAttackDirectionY=a.directionY,this.attackAnimationRate=a.contact?.chainStep===3?1.9:a.contact?.chainStep===2?5:a.contact?.chainStep===1?3.3:4.8,(!this.ws1ActionFeel||a.contact===void 0)&&this.addAttackRing(a),this.ws1ActionFeel&&a.contact!==void 0&&this.beginWs1BladeTrail(a.contact),!this.ws1ActionFeel&&this.qualityProfile.effects.attackSparkCount>0&&this.addBurst(a.x+a.directionX*a.range*this.qualityProfile.effects.dynamicLight.attackReceiverFraction,a.y+a.directionY*a.range*this.qualityProfile.effects.dynamicLight.attackReceiverFraction,a.weaponId==="blade"?7927777:16757071,this.qualityProfile.effects.attackSparkCount),this.firstStageLandmark!==null&&!this.ws1ActionFeel){const r=a.x+a.directionX*a.range*.78,s=a.y+a.directionY*a.range*.78;this.addRing(r,s,a.weaponId==="blade"?15400952:16765059,a.weaponId==="blade"?8:14,a.weaponId==="blade"?34:48,.2,2.2),this.addBurst(r,s,a.weaponId==="blade"?12255215:16764018,a.weaponId==="blade"?14:20),this.cameraTrauma=Math.min(1,this.cameraTrauma+(a.contact?.cameraImpulse??(a.weaponId==="blade"?.16:.34)))}break;case"enemy-damaged":{if(this.ws1ActionFeel&&a.contact!==void 0){this.pendingWs1DamageEvents.push(a);break}a.contact!==void 0&&(this.attackContact=a.contact,this.renderer.domElement.dataset.ws1ContactMotion=a.contact.motionId,this.renderer.domElement.dataset.ws1ContactHitstopMs=String(a.contact.hitstopMs),this.localHitstopSeconds=Math.max(this.localHitstopSeconds,a.contact.hitstopMs/1e3),this.cameraTrauma=Math.min(1,this.cameraTrauma+a.contact.cameraImpulse+a.contact.chainStep*.045)),this.cameraTrauma=Math.min(1,this.cameraTrauma+(a.source==="impact"?.82:a.source==="relic"?.66:.28));const r=this.enemyVisuals.get(a.enemyId);if(r!==void 0){if(this.ws1ActionFeel){const s=this.attackContact?.enemyResponse,i=s==="bounded-knockback"?1.45:s==="lateral-stagger"?1.08:.78,n=a.source==="impact"?1.35:a.source==="relic"?1.22:1;this.enemyReactions.set(a.enemyId,{startedAt:this.elapsed,duration:s==="bounded-knockback"?.42:.3,directionX:this.lastAttackDirectionX,directionY:this.lastAttackDirectionY,distance:16*i*n,tilt:.12*i}),this.renderer.domElement.dataset.ws1EnemyReaction=`${a.enemyId}:${s??"short-flinch"}`}if(a.contact!==void 0){const s=a.contact.vfxScale,i=a.contact.chainStep,n=i===3?16752184:i===2?16762222:16770220;this.addImpactSparks(r.group.position.x,r.group.position.z,n,Math.round(18+i*12+s*8),this.lastAttackDirectionX,this.lastAttackDirectionY,.84+i*.18),this.addFootDust(r.group.position.x,r.group.position.z,this.lastAttackDirectionX,this.lastAttackDirectionY,7+i*4,.5+i*.1),this.renderer.domElement.dataset.ws1ImpactParticles=`sparks-dust:${i}`}else this.addBurst(r.group.position.x,r.group.position.z,a.source==="relic"?6415825:a.source==="impact"?16034128:15195581,this.firstStageLandmark!==null?a.source==="impact"?22:14:a.source==="impact"?13:8);this.firstStageLandmark!==null&&a.contact===void 0&&(a.source==="impact"||a.source==="relic")&&this.addRing(r.group.position.x,r.group.position.z,a.source==="relic"?9306092:16760167,10,a.source==="relic"?46:38,.24,2.05),this.pulseEffectLight(r.group.position.x,r.group.position.z,a.source==="relic"?6415825:a.source==="impact"?16034128:16770220,a.source==="relic"?1:.62)}break}case"enemy-defeated":{if(this.ws1ActionFeel&&this.pendingWs1DamageEvents.some(s=>s.enemyId===a.enemyId)){this.pendingWs1DefeatEvents.push(a);break}if(this.firstStageLandmark===null)break;this.enemyDefeatAnimations.set(a.enemyId,this.elapsed+zs);const r=this.enemyVisuals.get(a.enemyId);if(r!==void 0){const s=Un[a.kind].radius,i=Zr(a.kind);this.ws1ActionFeel?(this.localHitstopSeconds=Math.max(this.localHitstopSeconds,a.kind==="named-anomaly"?.22:.16),this.addImpactSparks(r.group.position.x,r.group.position.z,a.kind==="named-anomaly"?16766330:i,a.kind==="named-anomaly"?96:64,this.lastAttackDirectionX,this.lastAttackDirectionY,a.kind==="named-anomaly"?1.46:1.18),this.addFootDust(r.group.position.x,r.group.position.z,this.lastAttackDirectionX,this.lastAttackDirectionY,a.kind==="named-anomaly"?38:24,a.kind==="named-anomaly"?1.34:1.08),this.renderer.domElement.dataset.ws1DefeatFinish=a.kind==="named-anomaly"?"boss-freeze-sparks-dust":"freeze-sparks-dust"):(this.addRing(r.group.position.x,r.group.position.z,i,Math.max(15,s*.58),Math.max(29,s*1.34),.58,1.72),this.addRing(r.group.position.x,r.group.position.z,a.kind==="named-anomaly"?16768908:16252914,Math.max(7,s*.28),Math.max(46,s*1.85),.42,2.18),this.addBurst(r.group.position.x,r.group.position.z,i,a.kind==="named-anomaly"?68:46),this.addRing(r.group.position.x,r.group.position.z,16777215,Math.max(4,s*.18),Math.max(62,s*2.15),.3,2.55)),this.cameraTrauma=Math.min(1,this.cameraTrauma+(a.kind==="named-anomaly"?1:.78)),this.renderer.domElement.dataset.firstStageLastDefeat=a.enemyId,this.pulseEffectLight(r.group.position.x,r.group.position.z,i,a.kind==="named-anomaly"?1:.76)}break}case"player-damaged":this.heroHurtAnimation=1,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,15291461,10),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,16735304,.9);break;case"guard-resolved":this.heroGuardAnimation=1,this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,a.justGuard?16769178:6415825,22,34,.28,1.8),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,a.justGuard?16769178:6415825,a.justGuard?.92:.5),this.firstStageLandmark!==null&&(a.justGuard&&this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,16777215,30,58,.2,2.5),this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,a.justGuard?16774082:11075568,34,a.justGuard?78:62,.34,a.justGuard?2.7:2.1),this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,a.justGuard?16773821:11141105,a.justGuard?24:14),this.cameraTrauma=Math.min(1,this.cameraTrauma+(a.justGuard?.34:.12)));break;case"dodge-started":this.heroDashAnimation=1;break;case"passive-guard-resolved":if(this.firstStageLandmark===null)break;this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,8444159,20,36,.36,1.64),this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,16765803,31,35,.25,1.28),this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,11003647,7),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,8444159,a.preventedDamage>0?.72:.46);break;case"relic-activated":this.heroSkillAnimation=1,this.companionReaction=1,this.addRing(a.x,a.y,6415825,a.radius*.76,a.radius*.82,.62,1.36),this.addRing(a.x,a.y,13041651,a.radius*.38,a.radius*.42,.44,1.82),this.addBurst(a.x,a.y,10287336,16),this.firstStageLandmark!==null&&(this.addGroundRupture(a),this.addRing(a.x,a.y,16767370,a.radius*.62,a.radius*.78,.68,1.35),this.addBurst(a.x,a.y,15269877,18),this.addRing(a.x,a.y,16777215,a.radius*.86,a.radius*.98,.42,1.5),this.addBurst(a.x,a.y,16769690,28),this.addRing(a.x,a.y,8386534,a.radius*.12,a.radius*1.22,.88,1.82),this.addBurst(a.x,a.y,16777215,36),this.cameraTrauma=Math.min(1,this.cameraTrauma+.94)),this.pulseEffectLight(a.x,a.y,6415825,1);break;case"loot-picked":this.companionReaction=.82,this.addBurst(this.playerGroup.position.x,this.playerGroup.position.z,6415825,9),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,6415825,.72);break;case"anomaly-resolved":this.companionReaction=1,this.addRing(this.playerGroup.position.x,this.playerGroup.position.z,a.outcome==="destroy"?15291461:a.outcome==="calm"?16034128:6415825,36,250,1.1,2.4),this.pulseEffectLight(this.playerGroup.position.x,this.playerGroup.position.z,a.outcome==="destroy"?16735304:a.outcome==="calm"?16034128:6415825,1);break}}}handleWs1Cues(e){for(const a of e)switch(a){case"ws1.support-warning":this.companionReaction=Math.max(this.companionReaction,.72),this.addRing(this.companionGroup.position.x,this.companionGroup.position.z,16763243,8,28,.32,1.5);break;case"ws1.support-expose":this.companionReaction=1,this.addRing(this.companionGroup.position.x,this.companionGroup.position.z,7727065,10,46,.42,1.8),this.addBurst(this.companionGroup.position.x,this.companionGroup.position.z,7727065,12);break;case"ws1.link-confirmed":break;case"ws1.guard":this.heroGuardAnimation=1;break;case"ws1.dodge":this.heroDashAnimation=1;break;case"ws1.finisher":this.heroSkillAnimation=1;break}}pulseEffectLight(e,a,r,s){this.qualityProfile.effects.dynamicEffectLight&&(this.effectLight.position.set(e,this.qualityProfile.effects.dynamicLight.height,a),this.effectLight.color.setHex(r),this.effectLightEnergy=Math.max(this.effectLightEnergy,s))}addAttackRing(e){const a=Math.atan2(e.directionY,e.directionX),r=e.weaponId==="blade"?e.range*.52:20,s=e.weaponId==="blade"?e.range:e.range*1.15,i=this.qualityProfile.effects.attackEchoes;for(let n=0;n<=i;n+=1){const o=n>0,A=o?.23-n*.035:.58+i*.025,l=o?s*(.88+n*.035):r,c=o?s*(1.02+n*.045):s,d=new Yt(l,c,Math.max(16,Math.round(this.qualityProfile.effects.ringSegments*.6)),1,-.72-n*.17,o?1.16:1.44),u=new F({color:o&&n%2===1?7927777:e.weaponId==="blade"?16766602:16752451,transparent:!0,opacity:A,side:Se,depthWrite:!1,blending:o?zt:To,toneMapped:!0}),h=new I(d,u);h.rotation.x=-Math.PI/2,h.rotation.z=a-n*.12,h.position.set(e.x,8+n*.7,e.y),this.scene.add(h),this.ringEffects.push({mesh:h,age:0,duration:(e.weaponId==="blade"?.18:.3)+n*.025,grow:(e.weaponId==="blade"?1.05:1.25)+n*.035,opacity:A})}}beginWs1BladeTrail(e){const a=e.chainStep,r=a===3?26:a===2?22:18,s=new Float32Array(r*2*3),i=new He(s,3);i.setUsage(Cu);const n=new Uint16Array((r-1)*6);for(let u=0;u<r-1;u+=1){const h=u*2,g=u*6;n[g]=h,n[g+1]=h+1,n[g+2]=h+3,n[g+3]=h,n[g+4]=h+3,n[g+5]=h+2}const o=new $e;o.setAttribute("position",i),o.setIndex(new He(n,1)),o.setDrawRange(0,0);const A=a===3?16757325:a===2?9169116:15788763,l=a===3?.94:a===2?.82:.7,c=new F({color:A,transparent:!0,opacity:l,side:Se,depthWrite:!1,blending:zt,toneMapped:!0}),d=new I(o,c);d.name=`ws1-blade-swept-trail-${a}`,d.renderOrder=8,d.frustumCulled=!1,this.scene.add(d),this.activeBladeTrail={mesh:d,positionAttribute:i,stage:a,contact:e,maximumSamples:r,sampleCount:0,lastProgress:-1,lastTipX:Number.NaN,lastTipY:Number.NaN,lastTipZ:Number.NaN,contactResolved:!1},this.renderer.domElement.dataset.ws1SlashTrailAuthority="blade-world-sweep-v1",this.renderer.domElement.dataset.ws1SlashTrailSamples="0"}syncWs1BladeTrail(){const e=this.activeBladeTrail;if(e===null)return;const a=1-this.attackAnimation,r=fw(e.contact);if(a>=r.start&&a<=r.end){this.bladeMesh.updateWorldMatrix(!0,!1),this.bladeTrailBaseWorld.copy(this.bladeTrailBaseLocal),this.bladeMesh.localToWorld(this.bladeTrailBaseWorld),this.bladeTrailTipWorld.copy(this.bladeTrailTipLocal),this.bladeMesh.localToWorld(this.bladeTrailTipWorld);const s=Number.isFinite(e.lastTipX)?(this.bladeTrailTipWorld.x-e.lastTipX)**2+(this.bladeTrailTipWorld.y-e.lastTipY)**2+(this.bladeTrailTipWorld.z-e.lastTipZ)**2:Number.POSITIVE_INFINITY;e.sampleCount<e.maximumSamples&&(s>=.72**2||a-e.lastProgress>=.032)&&this.appendBladeTrailSample(e,a)}!e.contactResolved&&a>=e.contact.contactProgress&&(e.contactResolved=!0,this.resolvePendingWs1Contact()),(this.attackAnimation<=0||a>r.end)&&this.finishActiveBladeTrail()}appendBladeTrailSample(e,a){const r=e.sampleCount,s=e.stage===3?.24:.32;pw(e.positionAttribute,r,this.bladeTrailBaseWorld,this.bladeTrailTipWorld,s),e.sampleCount+=1,e.lastProgress=a,e.lastTipX=this.bladeTrailTipWorld.x,e.lastTipY=this.bladeTrailTipWorld.y,e.lastTipZ=this.bladeTrailTipWorld.z,e.positionAttribute.needsUpdate=!0,e.mesh.geometry.setDrawRange(0,Math.max(0,e.sampleCount-1)*6),this.renderer.domElement.dataset.ws1SlashTrailSamples=String(e.sampleCount),this.renderer.domElement.dataset.ws1SlashTrailTip=[e.lastTipX.toFixed(2),e.lastTipY.toFixed(2),e.lastTipZ.toFixed(2)].join(",")}finishActiveBladeTrail(){const e=this.activeBladeTrail;if(e!==null){if(!e.contactResolved&&this.pendingWs1DamageEvents.length>0&&(e.contactResolved=!0,this.resolvePendingWs1Contact()),this.activeBladeTrail=null,e.sampleCount<2){this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();return}this.slashTrailEffects.push({mesh:e.mesh,direction:new S,worldAnchored:!0,age:0,duration:e.stage===3?.28:e.stage===2?.22:.18,opacity:e.mesh.material.opacity,grow:1,lift:0}),this.renderer.domElement.dataset.ws1SlashTrail=`${e.contact.motionId}:${e.stage}:blade-sampled`,this.renderer.domElement.dataset.ws1LastCompletedTrailSamples=String(e.sampleCount)}}resolvePendingWs1Contact(){const e=this.activeBladeTrail?.contact??this.pendingWs1DamageEvents[0]?.contact??this.attackContact;if(e==null)return;this.attackContact=e,this.renderer.domElement.dataset.ws1ContactMotion=e.motionId,this.renderer.domElement.dataset.ws1ContactHitstopMs=String(e.hitstopMs),this.renderer.domElement.dataset.ws1ContactAuthority="blade-contact-progress-v1",this.localHitstopSeconds=Math.max(this.localHitstopSeconds,e.hitstopMs/1e3);const a=Math.hypot(this.lastAttackDirectionX,this.lastAttackDirectionY);a>Number.EPSILON&&(this.cameraImpactDirectionX=this.lastAttackDirectionX/a,this.cameraImpactDirectionZ=this.lastAttackDirectionY/a),this.cameraTrauma=Math.min(1,this.cameraTrauma+e.cameraImpulse+e.chainStep*.045),this.onWs1VisualContact?.(e);for(const r of this.pendingWs1DamageEvents){const s=hl(r);s!==null&&this.addCombatTextCue(s);const i=this.enemyVisuals.get(r.enemyId);if(i===void 0)continue;const n=e.enemyResponse,o=n==="bounded-knockback"?1.45:n==="lateral-stagger"?1.08:.78,A=r.source==="impact"?1.35:r.source==="relic"?1.22:1;this.enemyReactions.set(r.enemyId,{startedAt:this.elapsed,duration:n==="bounded-knockback"?.42:.3,directionX:this.lastAttackDirectionX,directionY:this.lastAttackDirectionY,distance:16*o*A,tilt:.12*o}),this.renderer.domElement.dataset.ws1EnemyReaction=`${r.enemyId}:${n}`;const l=e.chainStep,c=l===3?16752184:l===2?16762222:16770220;this.addImpactSparks(i.group.position.x,i.group.position.z,c,Math.round(18+l*12+e.vfxScale*8),this.lastAttackDirectionX,this.lastAttackDirectionY,.84+l*.18),this.renderer.domElement.dataset.ws1ImpactParticles=`blade-sparks:${l}`,this.pulseEffectLight(i.group.position.x,i.group.position.z,c,r.source==="relic"?1:.62)}for(const r of this.pendingWs1DefeatEvents){if(this.firstStageLandmark===null)continue;this.enemyDefeatAnimations.set(r.enemyId,this.elapsed+zs);const s=this.enemyVisuals.get(r.enemyId);if(s===void 0)continue;const i=Zr(r.kind);this.localHitstopSeconds=Math.max(this.localHitstopSeconds,r.kind==="named-anomaly"?.22:.16),this.addImpactSparks(s.group.position.x,s.group.position.z,r.kind==="named-anomaly"?16766330:i,r.kind==="named-anomaly"?96:64,this.lastAttackDirectionX,this.lastAttackDirectionY,r.kind==="named-anomaly"?1.46:1.18),this.cameraTrauma=Math.min(1,this.cameraTrauma+(r.kind==="named-anomaly"?1:.78)),this.renderer.domElement.dataset.ws1DefeatFinish=r.kind==="named-anomaly"?"boss-contact-freeze-sparks":"contact-freeze-sparks",this.renderer.domElement.dataset.firstStageLastDefeat=r.enemyId,this.pulseEffectLight(s.group.position.x,s.group.position.z,i,r.kind==="named-anomaly"?1:.76)}this.pendingWs1DefeatEvents.length>0&&this.onWs1VisualDefeat?.(),this.pendingWs1DamageEvents.length=0,this.pendingWs1DefeatEvents.length=0}addRing(e,a,r,s,i,n,o){const A=new I(new Yt(s,i,this.qualityProfile.effects.ringSegments),new F({color:r,transparent:!0,opacity:.56,side:Se,depthWrite:!1}));A.rotation.x=-Math.PI/2,A.position.set(e,7,a),this.scene.add(A),this.ringEffects.push({mesh:A,age:0,duration:n,grow:o,opacity:.56})}addBurst(e,a,r,s){const i=Math.max(1,Math.round(s*this.qualityProfile.effects.particleFraction)),n=new ge(8,8,8),o=new F({color:r}),A=new Be(n,o,i),l=[],c=[];for(let d=0;d<i;d+=1){const u=d/i*Math.PI*2+d%3*.19,h=70+d%4*17;l.push(new S(e,28,a)),c.push(new S(Math.cos(u)*h,70+d%5*14,Math.sin(u)*h)),this.reusableMatrix.makeTranslation(e,28,a),A.setMatrixAt(d,this.reusableMatrix)}A.instanceMatrix.needsUpdate=!0,this.scene.add(A),this.burstEffects.push({mesh:A,positions:l,velocities:c,age:0,duration:.5,gravity:260,drag:0,scaleMode:"shrink",initialOpacity:1,orientToVelocity:!1})}addImpactSparks(e,a,r,s,i,n,o){const A=Math.max(1,Math.round(s*this.qualityProfile.effects.particleFraction)),l=this.impactSparkGeometry,c=new F({color:r,transparent:!0,opacity:.92,depthWrite:!1,blending:zt,toneMapped:!1}),d=new Be(l,c,A),u=[],h=[],g=Math.hypot(i,n),p=g>Number.EPSILON?i/g:1,m=g>Number.EPSILON?n/g:0;for(let f=0;f<A;f+=1){const w=(f*.61803398875%1-.5)*Math.PI*1.35,v=Math.atan2(m,p)+w,y=(78+f%7*13)*o,P=new S(e,30+f%5*2,a),b=new S(Math.cos(v)*y,(70+f%6*17)*o,Math.sin(v)*y);u.push(P),h.push(b),this.reusableDirection.copy(b).normalize(),this.reusableQuaternion.setFromUnitVectors(ia.DEFAULT_UP,this.reusableDirection),this.reusableMatrix.compose(P,this.reusableQuaternion,this.reusableScale.set(1,1,1)),d.setMatrixAt(f,this.reusableMatrix)}d.instanceMatrix.needsUpdate=!0,d.name="ws1-contact-sparks",d.renderOrder=10,this.scene.add(d),this.burstEffects.push({mesh:d,positions:u,velocities:h,age:0,duration:.42+o*.08,gravity:300,drag:.72,scaleMode:"shrink",initialOpacity:.92,orientToVelocity:!0,sharedGeometry:!0})}addFootDust(e,a,r,s,i,n){const o=Math.max(1,Math.round(i*this.qualityProfile.effects.particleFraction)),A=this.footDustGeometry,l=new F({color:11639408,transparent:!0,opacity:.62,depthWrite:!1,toneMapped:!0}),c=new Be(A,l,o),d=[],u=[],h=Math.hypot(r,s),g=h>Number.EPSILON?r/h:0,p=h>Number.EPSILON?s/h:-1,m=Math.atan2(-p,-g);for(let f=0;f<o;f+=1){const v=((o<=1?.5:f/(o-1))-.5)*1.7+(f%3-1)*.08,y=m+v,P=(18+f%5*4)*n,b=(f%4-1.5)*2.2,x=e-g*10+-p*b,B=a-p*10+g*b;d.push(new S(x,4+f%3,B)),u.push(new S(Math.cos(y)*P,(10+f%4*3)*n,Math.sin(y)*P)),this.reusableMatrix.makeTranslation(x,4,B),c.setMatrixAt(f,this.reusableMatrix)}c.instanceMatrix.needsUpdate=!0,c.name="ws1-foot-dust",this.scene.add(c),this.burstEffects.push({mesh:c,positions:d,velocities:u,age:0,duration:.74,gravity:24,drag:1.8,scaleMode:"bloom",initialOpacity:.62,orientToVelocity:!1,sharedGeometry:!0}),this.renderer.domElement.dataset.ws1FootDust=String(o)}addGroundRupture(e){const a=aw(e),r=new R;r.name="first-stage-ground-rupture",r.position.set(e.x,2.5,e.y),r.userData.presentationProfile=a.profile;let s=1,i=0,n=Number.POSITIVE_INFINITY;for(const g of this.enemyVisuals.values()){if(!g.group.visible)continue;const p=g.group.position.x-e.x,m=g.group.position.z-e.y,f=p*p+m*m;if(f>16&&f<n){n=f;const w=1/Math.sqrt(f);s=p*w,i=m*w}}r.rotation.y=-Math.atan2(i,s);const o=new Mu;o.moveTo(0,-10),o.lineTo(a.length,-a.halfWidth),o.lineTo(a.length,a.halfWidth),o.lineTo(0,10),o.closePath();const A=new I(new Su(o),new F({color:1515549,transparent:!0,opacity:.68,depthWrite:!1,side:Se}));A.name="ground-rupture-dark-wedge",A.rotation.x=-Math.PI/2,A.position.y=.4,r.add(A);const l=new F({color:8712924,transparent:!0,opacity:.82,depthWrite:!1,blending:zt,toneMapped:!0});for(let g=0;g<5;g+=1){const p=a.length*(.34+g*.13),m=new I(new ge(p,1.1,1.8+g%2),l);m.name=`ground-rupture-crack-${g+1}`,m.position.set(p*.5+g*9,1.2+g*.08,(g-2)*a.halfWidth*.14),m.rotation.y=(g-2)*.035,r.add(m)}const c=new ge(1,1,1),d=new L({color:5263174,roughness:.96,metalness:.02,emissive:1382935,emissiveIntensity:.08}),u=new Be(c,d,a.shardCount);u.name="ground-rupture-lifted-asphalt",u.castShadow=!0,u.receiveShadow=!0;const h=Array.from({length:a.shardCount},(g,p)=>{const m=(p+1)/(a.shardCount+1),f=p%2===0?-1:1,w=a.halfWidth*(.12+p%5*.16);return{x:a.length*(.12+m*.84),z:f*w,rotationY:p*.67,scaleX:10+p%4*4,scaleZ:8+(p+2)%4*3,lift:14+p%5*4}});for(const[g,p]of h.entries())this.reusablePosition.set(p.x,1.8,p.z),this.reusableQuaternion.setFromEuler(new Ie(0,p.rotationY,0)),this.reusableScale.set(p.scaleX,3.2+g%3,p.scaleZ),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),u.setMatrixAt(g,this.reusableMatrix);u.instanceMatrix.needsUpdate=!0,r.add(u),this.scene.add(r),this.groundRuptureEffects.push({group:r,shards:u,shardBases:h,age:0,duration:a.duration}),this.renderer.domElement.dataset.firstStageGroundRupture=`${a.profile}:${a.shardCount}`}updateEffects(e){this.effectLightEnergy=Math.max(0,this.effectLightEnergy-e*3.8),this.effectLight.intensity=this.qualityProfile.effects.dynamicEffectLight?this.effectLightEnergy*this.effectLightEnergy*this.qualityProfile.effects.dynamicLight.peakIntensity:0;for(let a=this.combatTextEffects.length-1;a>=0;a-=1){const r=this.combatTextEffects[a];if(r===void 0)continue;r.age+=e;const s=Math.min(1,r.age/r.duration),i=s<.62?1:1-(s-.62)/.38,n=s<.16?C.lerp(.72,1.08,s/.16):C.lerp(1.08,1,(s-.16)/.84);r.sprite.position.y+=r.riseSpeed*e,r.sprite.material.opacity=Math.max(0,i),r.sprite.scale.multiplyScalar(n/(r.sprite.userData.pop??1)),r.sprite.userData.pop=n,s>=1&&(this.scene.remove(r.sprite),r.texture.dispose(),r.sprite.material.dispose(),this.combatTextEffects.splice(a,1))}this.firstStageLandmark!==null&&(this.renderer.domElement.dataset.firstStageCombatTextCount=String(this.combatTextEffects.length),this.renderer.domElement.dataset.firstStageCombatTextTones=this.combatTextEffects.map(a=>String(a.sprite.userData.tone??"unknown")).join(","));for(let a=this.groundRuptureEffects.length-1;a>=0;a-=1){const r=this.groundRuptureEffects[a];if(r===void 0)continue;r.age+=e;const s=Math.min(1,r.age/r.duration),i=Math.sin(s*Math.PI);for(const[n,o]of r.shardBases.entries()){this.reusablePosition.set(o.x,1.8+i*o.lift,o.z),this.reusableQuaternion.setFromEuler(new Ie(s*(.34+n%3*.08),o.rotationY+s*.42,s*(n%2===0?-.24:.24)));const A=s>.78?Math.max(.05,1-(s-.78)/.22):1;this.reusableScale.set(o.scaleX*A,(3.2+n%3)*A,o.scaleZ*A),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),r.shards.setMatrixAt(n,this.reusableMatrix)}if(r.shards.instanceMatrix.needsUpdate=!0,r.group.traverse(n=>{if(!(n instanceof I))return;const o=Array.isArray(n.material)?n.material:[n.material];for(const A of o)A instanceof F&&A.transparent&&(A.opacity=Math.max(0,(1-s)*.82))}),s>=1){this.scene.remove(r.group);const n=new Set,o=new Set;r.group.traverse(A=>{if(!(A instanceof I))return;n.add(A.geometry),(Array.isArray(A.material)?A.material:[A.material]).forEach(c=>o.add(c))}),n.forEach(A=>A.dispose()),o.forEach(A=>A.dispose()),r.shards.dispose(),this.groundRuptureEffects.splice(a,1)}}this.firstStageLandmark!==null&&(this.renderer.domElement.dataset.firstStageGroundRuptureCount=String(this.groundRuptureEffects.length));for(let a=this.slashTrailEffects.length-1;a>=0;a-=1){const r=this.slashTrailEffects[a];if(r===void 0)continue;r.age+=e;const s=Math.min(1,r.age/r.duration),i=1-(1-s)**3;if(r.worldAnchored!==!0){const n=1+i*(r.grow-1);r.mesh.scale.set(n,n,n),r.mesh.position.addScaledVector(r.direction,e*34),r.mesh.position.y+=r.lift*e}r.mesh.material.opacity=Math.max(0,(1-i)*r.opacity),s>=1&&(this.scene.remove(r.mesh),r.mesh.geometry.dispose(),r.mesh.material.dispose(),this.slashTrailEffects.splice(a,1))}this.ws1ActionFeel&&(this.renderer.domElement.dataset.ws1SlashTrailCount=String(this.slashTrailEffects.length));for(let a=this.ringEffects.length-1;a>=0;a-=1){const r=this.ringEffects[a];if(r===void 0)continue;r.age+=e;const s=Math.min(1,r.age/r.duration),i=1+s*(r.grow-1);r.mesh.scale.setScalar(i),r.mesh.material.opacity=(1-s)*r.opacity,s>=1&&(this.scene.remove(r.mesh),r.mesh.geometry.dispose(),r.mesh.material.dispose(),this.ringEffects.splice(a,1))}for(let a=this.burstEffects.length-1;a>=0;a-=1){const r=this.burstEffects[a];if(r===void 0)continue;r.age+=e;const s=Math.min(1,r.age/r.duration);for(let n=0;n<r.positions.length;n+=1){const o=r.positions[n],A=r.velocities[n];o===void 0||A===void 0||(r.drag>0&&A.multiplyScalar(Math.exp(-r.drag*e)),A.y-=r.gravity*e,o.addScaledVector(A,e),this.reusablePosition.copy(o),this.reusableScale.setScalar(r.scaleMode==="bloom"?.52+s*.86:Math.max(.05,1-s)),r.orientToVelocity&&A.lengthSq()>1e-4?(this.reusableDirection.copy(A).normalize(),this.reusableQuaternion.setFromUnitVectors(ia.DEFAULT_UP,this.reusableDirection)):this.reusableQuaternion.identity(),this.reusableMatrix.compose(this.reusablePosition,this.reusableQuaternion,this.reusableScale),r.mesh.setMatrixAt(n,this.reusableMatrix))}r.mesh.instanceMatrix.needsUpdate=!0;const i=Array.isArray(r.mesh.material)?r.mesh.material:[r.mesh.material];for(const n of i)n instanceof F&&(n.opacity=r.initialOpacity*(1-s));s>=1&&(this.scene.remove(r.mesh),r.mesh.dispose(),r.sharedGeometry!==!0&&r.mesh.geometry.dispose(),zw(r.mesh.material),this.burstEffects.splice(a,1))}}cameraTargetOffsetX(){return ne(this.presentationProfile)?ve.camera.targetOffsetX:this.environmentProfile==="r04-live"?G.camera.targetOffsetX:this.environmentProfile==="beauty-cell"?-42:0}isWaterAt(e,a,r){return e.world.terrain.some(s=>s.kind==="water"&&a>=s.bounds.x&&a<=s.bounds.x+s.bounds.width&&r>=s.bounds.y&&r<=s.bounds.y+s.bounds.height)}cameraTargetOffsetZ(){return ne(this.presentationProfile)?ve.camera.targetOffsetZ:this.environmentProfile==="r04-live"?G.camera.targetOffsetZ:this.environmentProfile==="beauty-cell"?-54:0}syncR04KeyLight(){if(this.environmentProfile!=="r04-live")return;const a=this.effectiveShadowHalfExtent()*2/this.qualityProfile.shadows.mapSize,r=this.visualStabilityProfile.shadow.texelSnap?Math.round(this.cameraTarget.x/a)*a:this.cameraTarget.x,s=this.visualStabilityProfile.shadow.texelSnap?Math.round(this.cameraTarget.z/a)*a:this.cameraTarget.z;this.keyLightTarget.position.set(r,0,s);const i=Os(this.presentationProfile);this.keyLight.position.set(r+(ne(this.presentationProfile)?i.keyOffsetX:G.lighting.keyOffsetX),ne(this.presentationProfile)?i.keyOffsetY:G.lighting.keyOffsetY,s+(ne(this.presentationProfile)?i.keyOffsetZ:G.lighting.keyOffsetZ)),this.keyLightTarget.updateMatrixWorld()}snapCamera(e){const a=xA({playerX:e.player.x,playerY:e.player.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:"idle"},this.cameraCompositionProfile);this.cameraTarget.set(a.targetX+this.cameraTargetOffsetX(),ne(this.presentationProfile)?ve.camera.targetHeight:this.environmentProfile==="r04-live"?G.camera.targetHeight:28,a.targetY+this.cameraTargetOffsetZ()),this.renderer.domElement.dataset.cameraComposition=a.mode,this.camera.position.copy(this.cameraTarget).add(this.cameraOffset()),this.camera.lookAt(this.cameraTarget),this.syncR04KeyLight(),this.camera.updateProjectionMatrix()}updateCamera(e,a,r,s){const i=r?.targetId===null||r?.targetId===void 0?void 0:e.enemies.find(u=>u.id===r.targetId),n=xA({playerX:s.x,playerY:s.y,facingX:e.player.facingX,facingY:e.player.facingY,phase:r?.phase??"idle",targetX:i?.x,targetY:i?.y},this.cameraCompositionProfile);this.renderer.domElement.dataset.cameraComposition=n.mode;const A=(ne(this.presentationProfile)?ve.camera.followSpeed:this.environmentProfile==="r04-live"?G.camera.followSpeed:8)*this.qualityProfile.motion.cameraFollowSpeedMultiplier,l=1-Math.exp(-A*a);this.cameraTarget.lerp(this.reusablePosition.set(n.targetX+this.cameraTargetOffsetX(),ne(this.presentationProfile)?ve.camera.targetHeight:this.environmentProfile==="r04-live"?G.camera.targetHeight:28,n.targetY+this.cameraTargetOffsetZ()),l);const c=this.reusablePosition.copy(this.cameraTarget).add(this.cameraOffset());if(this.camera.position.lerp(c,l),this.cameraTrauma=Math.max(0,this.cameraTrauma-a*(this.ws1ActionFeel?2.8:3.4)),this.cameraTrauma>.001&&!this.reducedMotion){const u=this.cameraTrauma*this.cameraTrauma*(this.ws1ActionFeel?13.5:7.5),h=this.ws1ActionFeel?u*.46:0;this.camera.position.x+=Math.sin(this.elapsed*137.3)*u-this.cameraImpactDirectionX*h,this.camera.position.y+=Math.sin(this.elapsed*173.1)*u*.28,this.camera.position.z+=Math.cos(this.elapsed*151.7)*u-this.cameraImpactDirectionZ*h}if(this.camera.lookAt(this.cameraTarget),this.syncR04KeyLight(),!this.qualityProfile.effects.cameraPixelSnap)return;const d=this.cameraViewHeight/this.internalRenderHeight;this.camera.position.x=Math.round(this.camera.position.x/d)*d,this.camera.position.y=Math.round(this.camera.position.y/d)*d,this.camera.position.z=Math.round(this.camera.position.z/d)*d}updateAmbientMotion(e,a){const r=this.visualStabilityProfile.reflection.motionScale;this.waterNormalTexture!==null&&this.waterNormalTexture.offset.set(a*.007*r%1,a*-.0045*r%1),this.waterClearcoatNormalTexture!==null&&this.waterClearcoatNormalTexture.offset.set(a*-.0042*r%1,a*.0085*r%1),this.vegetationWindTimeUniform!==null&&(this.vegetationWindTimeUniform.value=a),this.riverFoamTimeUniform!==null&&(this.riverFoamTimeUniform.value=a),this.northStarVisualCell&&this.updateLivingWaterAmbientLife(this.livingWaterSections,fl,a);for(const[i,n]of this.enemyVisuals){const o=e.enemies.find(h=>h.id===i);if(o===void 0)continue;const A=o.kind==="murmur"?8:2,l=this.enemyDefeatAnimations.get(i),c=o.defeated&&l!==void 0&&l>this.elapsed,d=c?C.clamp(1-(l-this.elapsed)/zs,0,1):0,u=c?Math.sin(d*Math.PI)*(o.kind==="named-anomaly"?7:12)+(o.kind==="named-anomaly"?0:d*14):0;n.group.position.y=n.baseY+Math.sin(a*3.1+i.length*.7)*A+u,n.hostileCore.scale.setScalar(1+Math.sin(a*5.6+i.length)*.12),n.roleMarker.rotation.y=a*(o.kind==="scrap-hound"?.9:-.62)+i.length*.17}let s=0;for(const i of this.lootVisuals.values()){if(this.firstStageLandmark===null){i.rotation.y=a*.8+s*.4,i.position.y=5+Math.sin(a*2.4+s)*5,s+=1;continue}const n=i.getObjectByName("loot-artifact");n!==void 0&&(n.rotation.y=a*.8+s*.4,n.position.y=5+Math.sin(a*2.4+s)*5);const o=i.getObjectByName("loot-beacon-gem");o!==void 0&&(o.rotation.y=-a*1.25-s*.24,o.position.y=34+Math.sin(a*2.9+s)*2.4);const A=i.getObjectByName("loot-ground-ring");A instanceof I&&A.material instanceof F&&(A.material.opacity=.42+Math.sin(a*3.4+s)*.12),s+=1}}}function ld(t,e,a){const r=t.dimensions.width*e,s=t.dimensions.depth*e,i=Cc(t,{voxelSize:e,shadeFaces:!1,origin:{x:-r/2,y:0,z:-s/2}}),n=new $e;return n.setAttribute("position",new He(i.positions,3)),n.setAttribute("normal",new He(i.normals,3)),n.setAttribute("color",new He(i.colors,3)),n.setIndex(new He(i.indices,1)),a&&i.materialGroups.forEach((o,A)=>{n.addGroup(o.start,o.count,A)}),n.computeBoundingSphere(),{geometry:n,data:i}}function Ur(t,e,a){const{geometry:r}=ld(t,e,!1),s=new L({color:16777215,vertexColors:!0,transparent:a<1,opacity:a,roughness:.78,metalness:.04}),i=new I(r,s);return i.name=t.id,i}function gl(t,e){const{geometry:a,data:r}=ld(t,e,!0),s=r.materialGroups.map(n=>vw(n.role)),i=new I(a,s);return i.name=t.id,i}function vw(t){switch(t){case"matte":return new L({color:16777215,vertexColors:!0,roughness:.84,metalness:0});case"metal":return new L({color:16777215,vertexColors:!0,roughness:.38,metalness:.68});case"emissive":return new F({color:16777215,vertexColors:!0,toneMapped:!1})}}function yw(t,e){for(const a of t.material)(a instanceof L||a instanceof F)&&a.color.setHex(e)}function cr(t,e,a){const r=new ec(1,24),s=new F({color:2373682,transparent:!0,opacity:a*.72,depthWrite:!1}),i=new I(r,s);return i.rotation.x=-Math.PI/2,i.scale.set(t,e,1),i.position.y=1,i}function wl(t,e){const a=new Yt(25,30,64),r=new F({color:t,transparent:!0,opacity:e,depthWrite:!1,side:Se,blending:zt}),s=new I(a,r);return s.rotation.x=-Math.PI/2,s.renderOrder=12,s}function Zr(t){switch(t){case"scrap-hound":return 16739669;case"relay-shell":return 16760924;case"murmur":return 7923967;case"culvert-lurker":return 10289032;case"named-anomaly":return 13077759}}function xw(t){const e=new R;e.name=`enemy-silhouette-kit-${t}`,e.userData.readabilityRole="role-specific-commercial-silhouette";const a=new L({color:t==="scrap-hound"?7293239:t==="relay-shell"?5988957:t==="murmur"?3235685:t==="culvert-lurker"?4742201:5718111,roughness:t==="murmur"?.48:.34,metalness:t==="murmur"?.12:.56,emissive:Zr(t),emissiveIntensity:t==="named-anomaly"?.22:.08,envMapIntensity:1.14}),r=(s,i,n,o,A)=>{const l=new I(s,a);l.name=`${t}-${A}`,l.position.set(...i),l.rotation.set(...n),l.scale.set(...o),l.castShadow=!0,l.receiveShadow=!0,e.add(l)};switch(t){case"scrap-hound":r(new vr(5,28,4),[-18,30,2],[.18,0,-.68],[1,1,.55],"left-shear-fin"),r(new vr(5,28,4),[18,30,2],[-.18,0,.68],[1,1,.55],"right-shear-fin"),r(new ge(8,9,42),[0,24,8],[.12,0,0],[1,1,1],"spine-rail");break;case"relay-shell":r(new _a(18,3.2,6,18),[0,52,-5],[Math.PI/2,0,0],[1,1,1],"signal-halo"),r(new ge(22,12,34),[-23,29,0],[0,.18,-.18],[1,1,1],"left-armour"),r(new ge(22,12,34),[23,29,0],[0,-.18,.18],[1,1,1],"right-armour");break;case"murmur":for(let s=0;s<4;s+=1)r(new vr(3.4,34+s*4,5),[(s-1.5)*10,25+s%2*8,5],[.24+s*.08,s*.62,(s-1.5)*.16],[1,1,1],`signal-tendril-${s+1}`);break;case"culvert-lurker":for(let s=0;s<3;s+=1)r(new ge(30-s*4,7,24),[0,16+s*9,s*5],[.08,s*.22,0],[1,1,1],`drainage-plate-${s+1}`);break;case"named-anomaly":for(let s=0;s<6;s+=1){const i=s/6*Math.PI*2;r(new ja(7,0),[Math.cos(i)*38,50+s%2*12,Math.sin(i)*38],[i*.3,i,i*.18],[.7,1.8,.7],`orbit-shard-${s+1}`)}break}return e}function bw(t){switch(t){case"scrap-hound":return{role:"fast-rusted-metal",roughness:.38,metalness:.46,environmentIntensity:1.18,emissive:2754563,emissiveIntensity:.2};case"relay-shell":return{role:"armoured-signal-metal",roughness:.3,metalness:.62,environmentIntensity:1.34,emissive:3350528,emissiveIntensity:.24};case"murmur":return{role:"wet-organic-scatter",roughness:.48,metalness:.06,environmentIntensity:.96,emissive:473667,emissiveIntensity:.28};case"culvert-lurker":return{role:"mud-wet-chitin",roughness:.42,metalness:.14,environmentIntensity:1.06,emissive:862728,emissiveIntensity:.16};case"named-anomaly":return{role:"boss-iridescent-alloy",roughness:.24,metalness:.38,environmentIntensity:1.46,emissive:2426418,emissiveIntensity:.34}}}function Dw(t){const e=t==="named-anomaly",a=e?52:t==="relay-shell"?37:31,r=new I(new ba(a,a*1.06,2.2,28),new L({color:e?2497579:1516063,roughness:.58,metalness:e?.42:.24,transparent:!0,opacity:.72,envMapIntensity:.72}));return r.name=`enemy-grounding-plate-${t}`,r.position.y=.8,r.receiveShadow=!0,r.userData.readabilityRole="neutral-value-grounding",r}function Bw(t){const e=t==="named-anomaly"?10:t==="relay-shell"?7:t==="culvert-lurker"?6.5:5.5,a=new I(new Ai(e,10,8),new F({color:Zr(t),transparent:!0,opacity:.92,depthTest:!0,depthWrite:!1,toneMapped:!1}));return a.name=`enemy-hostile-core-${t}`,a.position.set(0,t==="named-anomaly"?30:t==="relay-shell"?40:t==="culvert-lurker"?18:t==="murmur"?38:20,t==="scrap-hound"?-35:t==="relay-shell"?-25:t==="culvert-lurker"?-18:t==="murmur"?-21:-29),a.userData.readabilityRole="hostile-core",a}function Pw(t){const e=new F({color:Zr(t),transparent:!0,opacity:.92,depthTest:!0,depthWrite:!1,toneMapped:!1});let a;switch(t){case"scrap-hound":a=new I(new Yl(7,0),e),a.scale.set(1.35,.58,1),a.position.set(0,34,-18);break;case"relay-shell":a=new I(new _a(11,2.4,5,8),e),a.position.set(0,42,-25);break;case"murmur":a=new I(new ja(8,0),e),a.scale.set(.72,1.42,.72),a.position.set(0,56,-16);break;case"culvert-lurker":a=new I(new vr(9,15,6),e),a.rotation.x=Math.PI,a.scale.set(1.4,.72,1.4),a.position.set(0,29,-14);break;case"named-anomaly":a=new I(new zn(12,0),e),a.scale.set(1.25,.42,1.25),a.position.y=78;break}return a.name=`enemy-role-marker-${t}`,a.userData.readabilityRole=t,a}function Ew(t,e){const a=new R;if(a.name=`enemy-rank-marker-${t??"normal"}`,a.userData.readabilityRole="enemy-rank",t!=="elite"&&t!=="boss"&&e!=="named-anomaly")return a;const r=t==="boss"||e==="named-anomaly",s=new F({color:r?15247359:16765803,transparent:!0,opacity:.82,depthTest:!0,depthWrite:!1,toneMapped:!1,blending:zt}),i=new I(new _a(r?31:23,r?2.6:2.1,6,28),s);i.rotation.x=Math.PI/2,i.position.y=r?38:29;const n=new I(new _a(r?22:16,1.6,5,24),s.clone());if(n.rotation.x=Math.PI/2,n.rotation.z=r?.62:.34,n.position.y=r?76:54,a.add(i,n),r){const o=new I(new ja(10,0),s.clone());o.position.y=101,o.scale.set(1,1.55,1),a.add(o)}return a}function vl(t,e){t.traverse(a=>{if(!(a instanceof I))return;const r=Array.isArray(a.material)?a.material:[a.material];for(const s of r)s instanceof F&&(s.opacity=e)})}function Cw(t){const e=t==="relay"?8186367:t==="anomaly-marker"?13077759:16765803,a=new R,r=new I(new ba(25,28,3.2,24),new L({color:1516834,roughness:.48,metalness:.34,transparent:!0,opacity:.82,envMapIntensity:.86}));r.position.y=1.3,r.name="interactive-neutral-pedestal",r.receiveShadow=!0;const s=new I(new Yt(18,23,32),new F({color:e,transparent:!0,opacity:.46,depthTest:!0,depthWrite:!1,side:Se}));s.rotation.x=-Math.PI/2,s.position.y=1.6,s.name="interactive-ground-ring";const i=new I(new ja(4.8,0),new F({color:e,transparent:!0,opacity:.88,depthTest:!0,depthWrite:!1,toneMapped:!1}));i.position.y=34,i.name="interactive-object-gem";const n=new I(new _a(8.6,1.1,5,20),new F({color:e,transparent:!0,opacity:.5,depthTest:!0,depthWrite:!1,toneMapped:!1}));return n.position.y=34,n.rotation.x=Math.PI/2,n.name="interactive-object-bracket",a.add(r,s,i,n),a.userData.readability="neutral-pedestal-value-motion-marker",a}function Mw(t){const a=new R;a.name="loot-world-beacon";const r=Math.max(13,t*.62),s=new I(new ba(r+5,r+8,2.6,28),new L({color:1320996,roughness:.44,metalness:.26,transparent:!0,opacity:.78,envMapIntensity:.78}));s.position.y=1,s.name="loot-neutral-pedestal",s.receiveShadow=!0;const i=new I(new Yt(r,r+Math.max(3,t*.16),36),new F({color:7861983,transparent:!0,opacity:.48,depthTest:!0,depthWrite:!1,side:Se}));i.rotation.x=-Math.PI/2,i.position.y=1.6,i.name="loot-ground-ring";const n=new I(new ba(2.2,6.4,28,8,1,!0),new F({color:7861983,transparent:!0,opacity:.13,depthTest:!0,depthWrite:!1,side:Se,toneMapped:!1}));n.position.y=17,n.name="loot-beacon-column";const o=new I(new ja(5.4,0),new F({color:7861983,transparent:!0,opacity:.9,depthTest:!0,depthWrite:!1,toneMapped:!1}));return o.position.y=34,o.name="loot-beacon-gem",a.add(s,i,n,o),a.userData.readability="neutral-pedestal-cyan-motion-beacon",a}function Sw(){const t=[{size:[26,3.5,18],position:[0,1.75,0],color:3766847},{size:[15,5,21],position:[-7,4.25,4],color:5083459},{size:[12,11,12],position:[5,7.5,-3],color:3108928},{size:[10,8,10],position:[-5,8,5],color:6988622},{size:[4.5,4.5,4.5],position:[5,15.5,0],color:15780172},{size:[4,4,4],position:[-7,13,7],color:14970728}],e=[],a=[],r=[],s=new Y;for(const n of t){const o=new ge(n.size[0],n.size[1],n.size[2]).toNonIndexed();o.translate(n.position[0],n.position[1],n.position[2]);const A=o.getAttribute("position"),l=o.getAttribute("normal");for(let c=0;c<A.count;c+=1){const d=l.getY(c),u=Math.abs(l.getX(c)),h=d>.5?1:d<-.5?.58:u>.5?.82:.72;s.setHex(n.color).multiplyScalar(h),e.push(A.getX(c),A.getY(c),A.getZ(c)),a.push(l.getX(c),l.getY(c),l.getZ(c)),r.push(s.r,s.g,s.b)}o.dispose()}const i=new $e;return i.setAttribute("position",new Ee(e,3)),i.setAttribute("normal",new Ee(a,3)),i.setAttribute("color",new Ee(r,3)),i.computeBoundingBox(),i.computeBoundingSphere(),i}function Iw(){const t=[],e=[],a=[],r=new Y;let s=0;const i=(h,g,p)=>{const m=(h.index===null?h:h.toNonIndexed()).clone();m.applyMatrix4(p);const f=m.getAttribute("position"),w=m.getAttribute("normal");for(let v=0;v<f.count;v+=1){const y=w.getY(v),P=y>.55?1:y<-.25?.6:.78;r.setHex(g).multiplyScalar(P),t.push(f.getX(v),f.getY(v),f.getZ(v)),e.push(w.getX(v),w.getY(v),w.getZ(v)),a.push(r.r,r.g,r.b)}s+=1,m.dispose()},n=new fe,o=new S,A=new ot,l=new S,c=new vr(1,1,5,1,!1);c.translate(0,.5,0);const d=new ja(1,0);for(let h=0;h<14;h+=1){const g=h/14*Math.PI*2+h%4*.13;o.set(Math.cos(g)*(2+h%5*1.8),0,Math.sin(g)*(2+h%4*2)),A.setFromEuler(new Ie(Math.sin(g)*.12,g,Math.cos(g)*(.12+h%3*.07))),l.set(.42+h%3*.18,8+h%5*2.6,.32+h%2*.14),n.compose(o,A,l),i(c,h%5===0?8557658:h%3===0?5798476:4155462,n)}for(let h=0;h<3;h+=1)o.set(Math.cos(h*2.1)*(3.5+h),10+h*2.8,Math.sin(h*2.1)*(3.5+h)),A.setFromEuler(new Ie(.12,h*1.7,.08)),l.setScalar(.75+h*.2),n.compose(o,A,l),i(d,h===0?12363868:8287824,n);c.dispose(),d.dispose();const u=new $e;return u.setAttribute("position",new Ee(t,3)),u.setAttribute("normal",new Ee(e,3)),u.setAttribute("color",new Ee(a,3)),u.userData.componentCount=s,u.userData.presentationProfile="first-stage-organic-growth-v1",u.computeBoundingBox(),u.computeBoundingSphere(),u}function dr(t,e,a){return(Math.imul(Math.trunc(t)+101,73856093)^Math.imul(Math.trunc(e)+211,19349663)^Math.imul(Math.trunc(a)+307,83492791))>>>0}function yl(t,e){t.rotation.x=e==="blade"?.12:.04,t.rotation.z=e==="blade"?-.42:-.28,t.scale.setScalar(e==="blade"?.9:.86),Cn(t,e)}function Qw(t,e,a,r,s,i,n,o,A){if(e>0)return{motion:"hurt",progress:1-e};if(a>0)return{motion:"skill",progress:1-a};if(r>0)return{motion:"dash",progress:1-r};if(s>0)return{motion:"guard",progress:1-s};if(i>0)return{motion:"link",progress:1-i};if(n>0)return{motion:o?.motionId==="diagonal-cut"?"combo-diagonal":o?.motionId==="reverse-crosscut"?"combo-crosscut":o?.motionId==="forward-rupture"?"combo-rupture":"hit",progress:1-n};if(t?.guardEnabled===!0)return{motion:"guard",progress:.72};if((t?.movementPriorityEnabled===!0||(t?.movementPriorityBlend??0)>.04)&&A>.06)return{motion:"dash",progress:C.clamp(t?.movementPriorityBlend??1,0,1)};switch(t?.phase){case"windup":return t.entryLungeActive===!0?{motion:"attack-entry",progress:t.progress}:{motion:"windup",progress:t.progress};case"hit":return{motion:"hit",progress:t.progress};case"recover":return{motion:"recovery",progress:t.progress};case"idle":case"acquire":case void 0:return A>.08?{motion:"run",progress:0}:{motion:"idle",progress:0}}}function Cn(t,e){const a=e==="blade"?pr:En;Fs.set(a.x,a.y,a.z).multiply(t.scale).applyEuler(t.rotation),t.position.set(Wi.x-Fs.x,Wi.y-Fs.y,Wi.z-Fs.z)}function kw(t){switch(t){case"scrap-hound":return Zn;case"relay-shell":return $n;case"murmur":return eo;case"culvert-lurker":return to;case"named-anomaly":return ao}}function Tw(t){switch(t){case"dead-tree":case"signpost":return hi;case"relay":case"lamp":case"anomaly-marker":return ns;case"contract-board":return so;default:return ro}}function Rw(t,e,a){if(t<760&&e>430&&e<1370)return a%3===0?7509097:6323800;if(t>2420&&t<3330&&e>380&&e<1420)return a%4===0?8750716:7764594;if(Math.abs(e-900)<145)return a%3===0?10123353:8874063;const r=(Math.floor(t/80)*17+Math.floor(e/80)*31>>>0)%4;return[4683588,5210184,5998929,6854234][r]??4683588}function zw(t){const e=Array.isArray(t)?t:[t];for(const a of e)a.dispose()}const cd="fram.character.f03.action-articulation-v2-f02-morphology",Lw=Object.freeze(["f02-immutable-morphology","combat-contact-materials","timing-link-pose","dash-guard-pose","bounded-idle-observation"]),dd=0,Fw=Object.freeze({actorId:"fram",sourceAssetId:"fram.character.f02.gameplay-readability-v1",sourceMethod:"immutable-f02-morphology-plus-runtime-action-presentation",gltfAuthoringStatus:"not-proven-no-blender-runtime-available",canonical:!1,rollbackAssetId:"fram.character.f02.gameplay-readability-v1",preserveVoxelEdges:!0,weightedSkinning:!1,hardPartWeights:!0,supersedesCandidateId:"fram.character.f03.action-articulation-v1",rejectedFinalMorphology:"runtime-action-bracers"}),ut=Xc,ud=ut.worldScale,go=ut.visibleSurfaceCells,Mr=Object.freeze({id:ut.actorId,representation:"compiled-high-density-articulated-voxel-surface",characterPreset:"f01-build-sheet",sourceSurfaceCells:ut.sourceSurfaceCells,visibleVoxelCells:go,worldScale:ud,presentation:{id:ut.id,grounding:ut.grounding,shadow:ut.shadow},createVisual:wo}),Ow=Mr,Uw=Object.fromEntries(dt.map(t=>[t,null]));function Nw(t){return C.clamp(Number.isFinite(t.progress)?t.progress??0:0,0,1)}function Hw(t){return t*t*(3-2*t)}function wo(){return hd(Mr,()=>Iu({castShadow:ut.render.castShadow,receiveShadow:ut.render.receiveShadow,surfaceFill:ut.render.surfaceFill,edgeRadiusRatio:ut.render.edgeRadiusRatio,materialTuning:ut.material,removeDetachedGroundDebris:!0,detachedGroundMaximumY:ut.topologyFilter.maximumGridY,detachedGroundMaximumCells:ut.topologyFilter.maximumComponentCells}))}function hd(t,e){const a=e(),r=a.partGroups,s=new R;s.name=`${t.id}:right-hand-socket`,s.position.set(.52,-1.02,.06),r["right-arm"].add(s),a.root.userData.assetDNA=t.id,a.root.userData.frontAxis="+z",a.root.userData.runtimeRepresentation=t.representation,a.root.userData.sourceSurfaceCells=t.sourceSurfaceCells??t.visibleVoxelCells,a.root.userData.visibleVoxelCells=a.stats.renderedSurfaceCells,a.root.userData.characterPreset=t.characterPreset,a.root.userData.packDigest=t.payloadSha256??a.stats.payloadSha256,a.root.userData.sourceDigest=t.sourceSha256??a.stats.sourceSha256??"unavailable";const i=a.materials,n={matte:i.get("ivory")??Ji(i),metal:i.get("near-black")??Ji(i),emissive:i.get("cyan")??Ji(i)},o=new Map([...i.values()].map(c=>[c,{color:c.color.clone(),emissive:c.emissive.clone()}])),A=c=>{const d=Number.isFinite(c.timeSeconds)?c.timeSeconds:0,u=Nw(c),h=Hw(u),g=C.clamp(Number.isFinite(c.moveAmount)?c.moveAmount??1:1,0,1);if(c.motion==="run"){a.update("run",d,d),r["left-leg"].rotation.x*=g,r["right-leg"].rotation.x*=g,r["left-arm"].rotation.x*=g,r["right-arm"].rotation.x*=g;return}switch(a.update("idle",d,d),c.motion){case"idle":break;case"windup":r.torso.rotation.y=-.42*h,r["right-arm"].rotation.set(-1.08*h,-.12*h,.34*h),r["left-arm"].rotation.x=.3*h,r.head.rotation.y+=.18*h;break;case"hit":a.update("hit",d,d-u*.62),r.torso.rotation.y=C.lerp(-.42,.32,h),r["right-arm"].rotation.x=C.lerp(-1.08,1.34,h),r["right-arm"].rotation.z+=C.lerp(.34,-.18,h);break;case"recovery":{const p=1-h;r.torso.rotation.y=.32*p,r["right-arm"].rotation.x=1.34*p,r["right-arm"].rotation.z=-.18*p;break}case"hurt":{const p=Math.sin(u*Math.PI);a.motionRoot.position.z+=p*.18,a.motionRoot.rotation.z=p*.09,r.torso.rotation.x=-.34*p,r.head.rotation.x+=.24*p,r["left-arm"].rotation.x=-.58*p,r["right-arm"].rotation.x=-.72*p;break}case"skill":{const p=Math.sin(u*Math.PI);a.motionRoot.position.y-=p*.1,r.torso.rotation.x=-.16*p,r["left-arm"].rotation.set(.72*p,0,-.82*p),r["right-arm"].rotation.set(.72*p,0,.82*p),r.equipment.scale.setScalar(1+p*.12);break}}},l={root:a.root,motionRoot:a.motionRoot,mode:"articulated",partGroups:r,partMeshes:Uw,mergedMesh:null,weaponSocket:s,materials:n,updatePose:A,attachWeapon(c,d={x:0,y:0,z:0}){s.add(c),c.scale.multiplyScalar(1/t.worldScale),Er(c,d)},setTint(c){const d=new Y(c);for(const[u,h]of o)u.color.copy(h.color).multiply(d),u.emissive.copy(h.emissive).multiply(d)},dispose(){a.dispose()}};return l.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),l}function Ji(t){const e=t.values().next().value;if(e===void 0)throw new Error("F-01 surface pack did not create any materials.");return e}const V8=Object.freeze(Object.defineProperty({__proto__:null,F01_FORGE_HERO_ASSET_RUNTIME:Mr,F01_GAMEPLAY_VISIBLE_SURFACE_CELLS:go,F01_GAMEPLAY_WORLD_SCALE:ud,R09_HERO_ASSET_RUNTIME:Ow,createCompiledForgeHeroVisual:hd,createF01ForgeHeroVisual:wo},Symbol.toStringTag,{value:"Module"})),fd=go+tc,_w=(Mr.sourceSurfaceCells??Mr.visibleVoxelCells)+tc,la=Object.freeze({id:"fram.character.f02.gameplay-readability-v1",representation:"compiled-high-density-voxel-surface-plus-evidence-modules",characterPreset:"f02-evidence-corrected",sourceSurfaceCells:_w,visibleVoxelCells:fd,worldScale:Mr.worldScale,createVisual:vo}),Gw=la;function Xw(t){switch(t){case"dash":return"run";case"attack-entry":return"windup";case"link":return"hit";case"combo-diagonal":case"combo-crosscut":case"combo-rupture":return"hit";case"guard":return"windup";default:return t}}function vo(){const t=wo(),e=Qu({root:t.root,partGroups:t.partGroups,castShadow:!1}),a=t.updatePose.bind(t),r=t.setTint.bind(t);let s=!1;t.root.userData.assetDNA=la.id,t.root.userData.runtimeRepresentation=la.representation,t.root.userData.visibleVoxelCells=fd,t.root.userData.characterPreset=la.characterPreset,t.root.userData.f02ModuleIds=ku;const i={root:t.root,motionRoot:t.motionRoot,mode:t.mode,partGroups:t.partGroups,partMeshes:t.partMeshes,mergedMesh:t.mergedMesh,weaponSocket:t.weaponSocket,materials:t.materials,updatePose(n){a(n),e.applyPose({...n,motion:Xw(n.motion)})},attachWeapon:t.attachWeapon.bind(t),setTint(n){r(n),e.setTint(n)},dispose(){s||(s=!0,e.dispose(),t.dispose())}};return i.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),i}const K8=Object.freeze(Object.defineProperty({__proto__:null,F02_FORGE_HERO_ASSET_RUNTIME:la,R09_HERO_ASSET_RUNTIME:Gw,createF02ForgeHeroVisual:vo},Symbol.toStringTag,{value:"Module"})),pd=la.visibleVoxelCells+dd;function Zi(t,e,a){return t<=e?C.smoothstep(t/e,0,1)*.08:t<=a?.08+(1-(1-C.clamp((t-e)/(a-e),0,1))**3)*.84:.92+C.smoothstep((t-a)/(1-a),0,1)*.08}const Mn=Object.freeze({id:cd,representation:"f02-compiled-voxel-with-versioned-action-presentation",characterPreset:"f03-action-articulation-v2-f02-morphology",sourceSurfaceCells:(la.sourceSurfaceCells??la.visibleVoxelCells)+dd,visibleVoxelCells:pd,worldScale:la.worldScale,createVisual:qw});function qw(){const t=vo(),e=t.updatePose.bind(t),a=t.setTint.bind(t),r=t.materials.emissive;t.root.traverse(i=>{if(!(i instanceof I))return;const n=Array.isArray(i.material)?i.material:[i.material];for(const o of n)o instanceof L&&(o.toneMapped=!0,o.envMapIntensity=Math.min(o.envMapIntensity,.68),o.roughness=Math.max(o.roughness,.5),o.metalness=Math.min(o.metalness,.7),o instanceof he&&(o.clearcoat=Math.min(o.clearcoat,.16)),o.emissiveIntensity=Math.min(o.emissiveIntensity,.62),o.userData.f03SurfacePolicy="stable-pbr-response-v1")}),(r instanceof F||r instanceof L)&&(r.toneMapped=!0,r.userData.f03SignalPolicy="tone-mapped-bounded-v1"),t.root.userData.assetDNA=cd,t.root.userData.runtimeRepresentation=Mn.representation,t.root.userData.visibleVoxelCells=pd,t.root.userData.characterPreset=Mn.characterPreset,t.root.userData.moduleIds=Lw,t.root.userData.f03Provenance=Fw;const s={...t,updatePose(i){e(i);const n=C.clamp(i.progress??0,0,1),o=n*n*(3-2*n),A=i.motion==="combo-diagonal"?Zi(n,.24,.54):i.motion==="combo-crosscut"?Zi(n,.14,.43):i.motion==="combo-rupture"?Zi(n,.36,.65):o,l=Math.sin(n*Math.PI),c=n<=.42?C.smoothstep(n/.42,0,1):C.smoothstep((1-n)/.58,0,1);if(i.motion==="attack-entry"){const d=C.smoothstep(n,0,1),u=Math.sin(n*Math.PI);t.motionRoot.position.set(0,-u*.48,0),t.motionRoot.rotation.x=u*.08,t.motionRoot.rotation.y=C.lerp(.04,-.28,d),t.partGroups.torso.rotation.x=.28*u,t.partGroups.torso.rotation.y=C.lerp(-.1,-.72,d),t.partGroups.torso.rotation.z=C.lerp(0,.24,d),t.partGroups["right-arm"].rotation.x=C.lerp(-.42,-1.62,d),t.partGroups["right-arm"].rotation.z=C.lerp(.12,.68,d),t.partGroups["left-arm"].rotation.x=C.lerp(-.18,.58,d),t.partGroups["left-leg"].rotation.x-=u*.72,t.partGroups["right-leg"].rotation.x+=u*.82,t.partGroups.equipment.rotation.x-=.1*u}else if(i.motion==="combo-diagonal")t.motionRoot.position.set(0,-c*.72,0),t.motionRoot.rotation.y=C.lerp(-.28,.24,A),t.motionRoot.rotation.z=l*.09,t.partGroups.torso.rotation.x=l*.24,t.partGroups.torso.rotation.y=C.lerp(-.72,.5,A),t.partGroups.torso.rotation.z=C.lerp(.24,-.16,A),t.partGroups["right-arm"].rotation.x=C.lerp(-1.62,1.66,A),t.partGroups["right-arm"].rotation.z=C.lerp(.68,-.38,A),t.partGroups["left-arm"].rotation.x=.58-A*.82,t.partGroups.head.rotation.z-=l*.14,t.partGroups["left-leg"].rotation.x-=c*.48,t.partGroups["right-leg"].rotation.x+=c*.56;else if(i.motion==="combo-crosscut")t.motionRoot.position.set(0,-c*.78,0),t.motionRoot.rotation.y=C.lerp(.38,-.34,A),t.motionRoot.rotation.z=-l*.09,t.partGroups.torso.rotation.x=l*.2,t.partGroups.torso.rotation.y=C.lerp(.82,-.7,A),t.partGroups.torso.rotation.z=-.22*l,t.partGroups["right-arm"].rotation.x=C.lerp(1.48,-1.7,A),t.partGroups["right-arm"].rotation.z=C.lerp(-.56,.58,A),t.partGroups.head.rotation.y+=l*.16,t.partGroups["left-leg"].rotation.x=-.52*c,t.partGroups["right-leg"].rotation.x=.5*c;else if(i.motion==="combo-rupture")t.motionRoot.position.set(0,-c*1.08,0),t.motionRoot.rotation.x=l*.24,t.partGroups.torso.rotation.x=.7*l,t.partGroups.torso.rotation.y=C.lerp(-.46,.3,A),t.partGroups["right-arm"].rotation.x=C.lerp(-1.86,1.9,A),t.partGroups["left-arm"].rotation.x=C.lerp(.82,-.58,A),t.partGroups.head.rotation.x-=l*.18,t.partGroups["left-leg"].rotation.x=-.68*c,t.partGroups["right-leg"].rotation.x=.76*c;else if(i.motion==="dash"){const d=C.clamp(i.moveAmount??1,0,1),u=10.5+A*6.2,h=Math.sin(i.timeSeconds*u)*d*A,g=Math.abs(Math.cos(i.timeSeconds*u))*d*A;t.motionRoot.position.set(0,(1-g)*.16,0),t.partGroups.torso.rotation.x=.15*A,t.partGroups.torso.rotation.y+=Math.cos(i.timeSeconds*u)*.035*A,t.partGroups.head.rotation.x-=.025*A,t.partGroups["left-arm"].rotation.x=-.1*A-h*.46,t.partGroups["right-arm"].rotation.x=-.14*A+h*.46,t.partGroups["left-leg"].rotation.x=h*.78,t.partGroups["right-leg"].rotation.x=-h*.78,t.partGroups.equipment.rotation.x-=.055*A+Math.abs(h)*.018}else if(i.motion==="guard"){const d=Math.sin(n*Math.PI);t.motionRoot.position.set(0,-d*.72,0),t.motionRoot.rotation.x=-d*.055,t.partGroups.torso.rotation.x=-.2*d,t.partGroups.torso.rotation.y=-.14*d,t.partGroups.head.rotation.x+=.08*d,t.partGroups.head.rotation.y+=.06*d,t.partGroups["left-arm"].rotation.x=-1.16*d,t.partGroups["left-arm"].rotation.y=.42*d,t.partGroups["left-arm"].rotation.z=-.18*d,t.partGroups["right-arm"].rotation.x=-.72*d,t.partGroups["right-arm"].rotation.y=-.24*d,t.partGroups["right-arm"].rotation.z=.16*d,t.partGroups["left-leg"].rotation.x=.18*d,t.partGroups["right-leg"].rotation.x=-.22*d,t.partGroups.equipment.rotation.x-=.08*d}if(i.motion==="idle"){const d=Math.max(0,Math.sin(i.timeSeconds*.34-1.8));t.partGroups.head.rotation.y+=d*.12,t.partGroups.equipment.rotation.x-=d*.025}},setTint(i){a(i),r instanceof F?r.color.multiplyScalar(.36):r instanceof L&&(r.emissive.multiplyScalar(.58),r.emissiveIntensity=Math.min(r.emissiveIntensity,.62))}};return s.updatePose({motion:"idle",timeSeconds:0,moveAmount:0}),s}function Yw(t){return t.replaceChildren(),t.className="game-shell prototype-b-shell",t.innerHTML=`
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

      <aside class="relic-navigation" aria-label="周辺地図と目的地">
        <div class="relic-navigation__heading">
          <span>AREA MAP / LIVE</span>
          <strong data-ui="waypoint-name">観測町・依頼板</strong>
        </div>
        <canvas
          data-ui="minimap"
          width="320"
          height="168"
          role="img"
          aria-label="現在地と目的地を示すミニマップ"
        ></canvas>
        <div class="relic-navigation__legend" aria-hidden="true">
          <span><i class="is-player"></i> F-01</span>
          <span><i class="is-objective"></i> TARGET</span>
        </div>
      </aside>

      <div class="relic-waypoint" data-ui="waypoint" aria-live="off">
        <i data-ui="waypoint-arrow" aria-hidden="true">▲</i>
        <div><strong data-ui="waypoint-distance">-- m</strong><span>OBJECTIVE</span></div>
      </div>

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

      <aside class="relic-control-guide" aria-label="PC操作ガイド">
        <span><kbd>WASD</kbd><strong>移動</strong></span>
        <span><kbd>AUTO</kbd><strong>通常攻撃</strong></span>
        <span><kbd>Q</kbd><strong>大技</strong></span>
        <span><kbd>SHIFT</kbd><strong>防御 / 回避</strong></span>
        <span><kbd>E</kbd><strong>調査</strong></span>
        <span><kbd>R</kbd><strong>道具</strong></span>
      </aside>

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
  `,{stage:oe(t,".relic-stage"),worldMount:oe(t,".relic-world"),statusLive:oe(t,'[data-ui="status-live"]'),titleOverlay:oe(t,'[data-ui="title"]'),startButton:Us(t,'[data-ui="start"]'),muteButton:Us(t,'[data-ui="mute"]'),zoneLabel:oe(t,'[data-ui="zone"]'),objectiveText:oe(t,'[data-ui="objective"]'),minimap:jw(t,'[data-ui="minimap"]'),waypointName:oe(t,'[data-ui="waypoint-name"]'),waypointDistance:oe(t,'[data-ui="waypoint-distance"]'),waypointArrow:oe(t,'[data-ui="waypoint-arrow"]'),healthFill:oe(t,'[data-ui="health-fill"]'),healthText:oe(t,'[data-ui="health-text"]'),weaponName:oe(t,'[data-ui="weapon-name"]'),weaponDetail:oe(t,'[data-ui="weapon-detail"]'),relicName:oe(t,'[data-ui="relic-name"]'),itemCount:oe(t,'[data-ui="item-count"]'),targetPanel:oe(t,'[data-ui="target"]'),targetName:oe(t,'[data-ui="target-name"]'),targetFill:oe(t,'[data-ui="target-fill"]'),contextPrompt:oe(t,'[data-ui="context-prompt"]'),toast:oe(t,'[data-ui="toast"]'),dossier:oe(t,'[data-ui="dossier"]'),dossierTitle:oe(t,'[data-ui="dossier-title"]'),dossierBody:oe(t,'[data-ui="dossier-body"]'),outcomePanel:oe(t,'[data-ui="outcome"]'),outcomeBackButton:Us(t,'[data-ui="outcome-back"]'),resultPanel:oe(t,'[data-ui="result"]'),resultTitle:oe(t,'[data-ui="result-title"]'),resultBody:oe(t,'[data-ui="result-body"]'),restartButton:Us(t,'[data-ui="restart"]'),performance:oe(t,'[data-ui="performance"]'),orientationNotice:oe(t,'[data-ui="orientation"]')}}function oe(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`Prototype B layout element is missing: ${e}`);return a}function Us(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`Prototype B layout button is missing: ${e}`);return a}function jw(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`Prototype B layout canvas is missing: ${e}`);return a}const Sn=1,J8="fram-world-memory-1",Z8="fram-r09-world-memory",md=["canopy-relay","flooded-archive"],gd=2048,wd=256,vd=512,yo=4294967295,Ww=/^[a-z0-9][a-z0-9._:-]{0,95}$/;class Me extends Error{constructor(e){super(e),this.name="WorldMemoryInvariantError"}}function $8(t){return xo(t,0,yo,"worldSeed"),{version:Sn,worldSeed:t,discoveredSites:[],recoveredItems:[],claimedBaseSiteId:null,installedModule:null,expeditionHistory:[],appliedEventIds:[]}}function xl(t){t.version!==Sn&&ue(`version must be ${Sn}.`),xo(t.worldSeed,0,yo,"worldSeed"),Ns(t.discoveredSites,md.length,"discoveredSites"),Ns(t.recoveredItems,vd,"recoveredItems"),Ns(t.expeditionHistory,wd,"expeditionHistory"),Ns(t.appliedEventIds,gd,"appliedEventIds");const e=new Set;t.discoveredSites.forEach((i,n)=>{Vw(i,`discoveredSites[${n}]`),e.has(i.siteId)&&ue(`discoveredSites contains duplicate site "${i.siteId}".`),e.add(i.siteId)});const a=new Set;t.appliedEventIds.forEach((i,n)=>{bt(i,`appliedEventIds[${n}]`),a.has(i)&&ue(`appliedEventIds contains duplicate event "${i}".`),a.add(i)});const r=new Set;t.expeditionHistory.forEach((i,n)=>{Zw(i,`expeditionHistory[${n}]`),r.has(i.expeditionId)&&ue(`expeditionHistory contains duplicate expedition "${i.expeditionId}".`),r.add(i.expeditionId)});const s=new Set;if(t.recoveredItems.forEach((i,n)=>{Kw(i,`recoveredItems[${n}]`),e.has(i.sourceSiteId)||ue(`Recovered item "${i.itemId}" refers to an undiscovered site.`),s.has(i.itemId)&&ue(`recoveredItems contains duplicate item "${i.itemId}".`),s.add(i.itemId)}),t.claimedBaseSiteId!==null&&!e.has(t.claimedBaseSiteId)&&ue("claimedBaseSiteId must refer to a discovered site."),t.installedModule!==null){Jw(t.installedModule,"installedModule"),t.claimedBaseSiteId!==t.installedModule.siteId&&ue("installedModule must be attached to the claimed base.");const i=t.recoveredItems.find(n=>n.itemId===t.installedModule?.consumedItemId);(i===void 0||i.status!=="consumed"||i.consumedByModuleId!==t.installedModule.moduleId||i.consumedExpeditionId!==t.installedModule.installedExpeditionId||i.consumedTick!==t.installedModule.installedTick)&&ue("installedModule must have one matching consumed item record.")}else t.recoveredItems.some(i=>i.status==="consumed")&&ue("Recovered items cannot be consumed without an installed module.")}function Qr(t){return t==="canopy-relay"||t==="flooded-archive"}function pi(t){return t==="pathfinder-array"||t==="relic-overdrive"}function bt(t,e){(typeof t!="string"||!Ww.test(t))&&ue(`${e} must be a 1-96 character lowercase identifier.`)}function Sr(t,e){xo(t,0,yo,e)}function Vw(t,e){Qr(t.siteId)||ue(`${e}.siteId is not supported.`),bt(t.firstDiscoveredExpeditionId,`${e}.firstDiscoveredExpeditionId`),Sr(t.firstDiscoveredTick,`${e}.firstDiscoveredTick`)}function Kw(t,e){if(bt(t.itemId,`${e}.itemId`),Qr(t.sourceSiteId)||ue(`${e}.sourceSiteId is not supported.`),bt(t.acquiredExpeditionId,`${e}.acquiredExpeditionId`),Sr(t.acquiredTick,`${e}.acquiredTick`),t.status!=="available"&&t.status!=="consumed"&&ue(`${e}.status is not supported.`),t.status==="available"){(t.consumedByModuleId!==null||t.consumedExpeditionId!==null||t.consumedTick!==null)&&ue(`${e} has consumption data while still available.`);return}pi(t.consumedByModuleId)||ue(`${e}.consumedByModuleId is not supported.`),bt(t.consumedExpeditionId,`${e}.consumedExpeditionId`),Sr(t.consumedTick,`${e}.consumedTick`)}function Jw(t,e){pi(t.moduleId)||ue(`${e}.moduleId is not supported.`),Qr(t.siteId)||ue(`${e}.siteId is not supported.`),bt(t.installedExpeditionId,`${e}.installedExpeditionId`),Sr(t.installedTick,`${e}.installedTick`),bt(t.consumedItemId,`${e}.consumedItemId`)}function Zw(t,e){bt(t.expeditionId,`${e}.expeditionId`),t.endedReason!=="returned"&&t.endedReason!=="retreated"&&t.endedReason!=="defeated"&&ue(`${e}.endedReason is not supported.`),Sr(t.endedTick,`${e}.endedTick`),$w(t.discoveredSiteIds,`${e}.discoveredSiteIds`),e2(t.recoveredItemIds,`${e}.recoveredItemIds`),t.claimedBaseSiteId!==null&&!Qr(t.claimedBaseSiteId)&&ue(`${e}.claimedBaseSiteId is not supported.`),t.installedModuleId!==null&&!pi(t.installedModuleId)&&ue(`${e}.installedModuleId is not supported.`),t.endedReason!=="returned"&&(t.claimedBaseSiteId!==null||t.installedModuleId!==null)&&ue(`${e} cannot claim a base or install a module after withdrawal.`)}function $w(t,e){const a=new Set;t.forEach((r,s)=>{Qr(r)||ue(`${e}[${s}] is not supported.`),a.has(r)&&ue(`${e} contains duplicate site "${r}".`),a.add(r)})}function e2(t,e){const a=new Set;t.forEach((r,s)=>{bt(r,`${e}[${s}]`),a.has(r)&&ue(`${e} contains duplicate identifier "${r}".`),a.add(r)})}function Ns(t,e,a){(!Array.isArray(t)||t.length>e)&&ue(`${a} must contain at most ${e} entries.`)}function xo(t,e,a,r){(typeof t!="number"||!Number.isInteger(t)||t<e||t>a)&&ue(`${r} must be an integer from ${e} to ${a}.`)}function ue(t){throw new Me(t)}function t2(t){switch(t.installedModule?.moduleId){case"pathfinder-array":return{routeOverlay:!0,explorationSpeedMultiplier:1.12,relicAura:!1,relicCooldownMultiplier:1};case"relic-overdrive":return{routeOverlay:!1,explorationSpeedMultiplier:1,relicAura:!0,relicCooldownMultiplier:.65};default:return{routeOverlay:!1,explorationSpeedMultiplier:1,relicAura:!1,relicCooldownMultiplier:1}}}function yd(t,e){if(xl(t),s2(e),t.appliedEventIds.includes(e.eventId))throw new Me(`World event "${e.eventId}" was already applied.`);if(t.appliedEventIds.length>=gd)throw new Me("World event history is full.");if(t.expeditionHistory.some(s=>s.expeditionId===e.expeditionId))throw new Me(`Expedition "${e.expeditionId}" has already ended.`);const a=[...t.appliedEventIds,e.eventId];let r;switch(e.type){case"site-discovered":{if(t.discoveredSites.some(s=>s.siteId===e.siteId))throw new Me(`Site "${e.siteId}" is already discovered.`);r={...t,discoveredSites:[...t.discoveredSites,{siteId:e.siteId,firstDiscoveredExpeditionId:e.expeditionId,firstDiscoveredTick:e.tick}],appliedEventIds:a};break}case"item-recovered":{if(t.recoveredItems.length>=vd)throw new Me("Recovered item history is full.");if(!t.discoveredSites.some(s=>s.siteId===e.siteId))throw new Me(`Cannot recover an item from undiscovered site "${e.siteId}".`);if(t.recoveredItems.some(s=>s.itemId===e.itemId))throw new Me(`Recovered item "${e.itemId}" already exists.`);r={...t,recoveredItems:[...t.recoveredItems,{itemId:e.itemId,sourceSiteId:e.siteId,acquiredExpeditionId:e.expeditionId,acquiredTick:e.tick,status:"available",consumedByModuleId:null,consumedExpeditionId:null,consumedTick:null}],appliedEventIds:a};break}case"base-claimed":{if(t.claimedBaseSiteId!==null)throw new Me("A base has already been claimed.");if(!t.discoveredSites.some(s=>s.siteId===e.siteId))throw new Me(`Cannot claim undiscovered site "${e.siteId}".`);r={...t,claimedBaseSiteId:e.siteId,appliedEventIds:a};break}case"module-installed":{if(t.installedModule!==null)throw new Me("A module is already installed.");if(t.claimedBaseSiteId!==e.siteId)throw new Me("A module can only be installed at the claimed base.");const s=t.recoveredItems.findIndex(n=>n.itemId===e.consumedItemId),i=t.recoveredItems[s];if(i===void 0||i.status!=="available")throw new Me(`Module installation requires available item "${e.consumedItemId}".`);r={...t,recoveredItems:t.recoveredItems.map((n,o)=>o===s?{...n,status:"consumed",consumedByModuleId:e.moduleId,consumedExpeditionId:e.expeditionId,consumedTick:e.tick}:n),installedModule:{moduleId:e.moduleId,siteId:e.siteId,installedExpeditionId:e.expeditionId,installedTick:e.tick,consumedItemId:e.consumedItemId},appliedEventIds:a};break}case"expedition-ended":{if(t.expeditionHistory.length>=wd)throw new Me("Expedition history is full.");const s=r2(t,e);if(e.reason!=="returned"&&(s.claimedBaseSiteId!==null||s.installedModuleId!==null))throw new Me("A withdrawal cannot commit a base or module.");r={...t,expeditionHistory:[...t.expeditionHistory,s],appliedEventIds:a};break}}return xl(r),r}function a2(t,e){if(e.length===0)throw new Me("An expedition commit requires at least one world event.");const a=e[0]?.expeditionId;if(a===void 0||e.some(s=>s.expeditionId!==a))throw new Me("An expedition commit cannot mix expedition identifiers.");if(e.filter(s=>s.type==="expedition-ended").length!==1||e[e.length-1]?.type!=="expedition-ended")throw new Me("An expedition commit must end with exactly one expedition-ended event.");return e.reduce(yd,t)}function r2(t,e){const a=t.discoveredSites.filter(n=>n.firstDiscoveredExpeditionId===e.expeditionId).map(n=>n.siteId),r=t.recoveredItems.filter(n=>n.acquiredExpeditionId===e.expeditionId).map(n=>n.itemId),s=t.installedModule?.installedExpeditionId===e.expeditionId?t.installedModule.siteId:t.claimedBaseSiteId!==null&&t.expeditionHistory.length===0?t.claimedBaseSiteId:null,i=t.installedModule?.installedExpeditionId===e.expeditionId?t.installedModule.moduleId:null;return{expeditionId:e.expeditionId,endedReason:e.reason,endedTick:e.tick,discoveredSiteIds:a,recoveredItemIds:r,claimedBaseSiteId:s,installedModuleId:i}}function s2(t){if(bt(t.eventId,"event.eventId"),bt(t.expeditionId,"event.expeditionId"),Sr(t.tick,"event.tick"),(t.type==="site-discovered"||t.type==="item-recovered"||t.type==="base-claimed"||t.type==="module-installed")&&!Qr(t.siteId))throw new Me("event.siteId is not supported.");if(t.type==="item-recovered"&&bt(t.itemId,"event.itemId"),t.type==="module-installed"){if(!pi(t.moduleId))throw new Me("event.moduleId is not supported.");bt(t.consumedItemId,"event.consumedItemId")}if(t.type==="expedition-ended"&&t.reason!=="returned"&&t.reason!=="retreated"&&t.reason!=="defeated")throw new Me("event.reason is not supported.")}function $i(t){const e=t.claimedBaseSiteId;return md.filter(a=>a!==e)}const ma={"canopy-relay":"樹冠中継所","flooded-archive":"沈水資料庫"},Hs={"pathfinder-array":"経路観測列","relic-overdrive":"遺物過励器"},wr={"canopy-relay":ye.fork.interactionPoint,"flooded-archive":ye.ruin.interactionPoint},i2={"pickup-gravity-weight":"canopy-relay","pickup-relay-capacitor":"canopy-relay","pickup-quiet-chime":"flooded-archive","pickup-signal-key":"flooded-archive"},n2=112;class o2{constructor(e,a){this.layout=e,this.runtime=a,this.memory=a.initialState,this.preview=a.initialState,this.expeditionId=this.nextExpeditionId(),this.ledger=this.createLedger(),this.siteList=ur(this.ledger,'[data-r09="sites"]'),this.memoryLine=ur(this.ledger,'[data-r09="memory"]'),this.retreatButton=bl(this.ledger,'[data-r09-action="retreat"]'),this.chooser=this.createChooser(),this.chooserKicker=ur(this.chooser,'[data-r09="chooser-kicker"]'),this.chooserTitle=ur(this.chooser,'[data-r09="chooser-title"]'),this.chooserBody=ur(this.chooser,'[data-r09="chooser-body"]'),this.chooserActions=ur(this.chooser,'[data-r09="chooser-actions"]'),this.chooserBackButton=bl(this.chooser,'[data-r09-action="back"]');const r=()=>{this.finish("retreated")},s=()=>this.closeChooser();this.retreatButton.addEventListener("click",r),this.chooserBackButton.addEventListener("click",s),this.cleanup.push(()=>this.retreatButton.removeEventListener("click",r),()=>this.chooserBackButton.removeEventListener("click",s)),this.layout.stage.append(this.ledger,this.chooser),this.syncDataset(),this.renderLedger()}layout;runtime;memory;preview;pendingEvents=[];phase="exploring";expeditionId="";eventSequence=1;selectedBaseSiteId=null;ledger;siteList;memoryLine;retreatButton;chooser;chooserKicker;chooserTitle;chooserBody;chooserActions;chooserBackButton;cleanup=[];lastAnnotatedMapPaint="";autoBasicEvents=0;manualSkillEvents=0;get isBlocking(){return this.phase!=="exploring"}get effects(){return t2(this.memory)}get worldMemory(){return this.memory}ownsTownInteraction(e){return this.isAtTownBoard(e)}observeStep(e,a,r){if(this.phase==="exploring"){for(const s of a){if(s.type==="player-attacked"&&(this.autoBasicEvents+=1),s.type==="relic-activated"&&(this.manualSkillEvents+=1),s.type==="landmark-entered"){const i=A2(s.landmarkId);i!==null&&this.discoverSite(i,s.tick)}if(s.type==="loot-picked"){const i=i2[s.pickupId];i!==void 0&&this.recoverItem(i,s.pickupId,s.tick)}s.type==="player-defeated"&&this.finish("defeated")}r&&this.isAtTownBoard(e)&&this.openReturnFlow()}}updatePresentation(e){this.syncDataset();const a=this.destinationFor(e);this.layout.objectiveText.textContent=this.objectiveText(),this.layout.stage.dataset.playerSpeed=String(e.player.speed),this.layout.stage.dataset.relicCooldownMaxTicks=String(e.player.relicCooldownMaxTicks),this.layout.waypointName.textContent=a.name;const r=a.x-e.player.x,s=a.y-e.player.y,i=Math.hypot(r,s),n=(r-s)/Math.SQRT2,o=(r+s)/Math.SQRT2,A=Math.atan2(n,-o)*(180/Math.PI);this.layout.waypointDistance.textContent=`${Math.max(0,Math.round(i/10))} m`,this.layout.waypointArrow.style.transform=`rotate(${A.toFixed(1)}deg)`,this.annotateMinimap(),this.phase==="ended"&&(this.layout.resultPanel.setAttribute("aria-hidden","false"),this.layout.resultPanel.inert=!1)}beginNextExpedition(){this.pendingEvents=[],this.preview=this.memory,this.phase="exploring",this.selectedBaseSiteId=null,this.eventSequence=1,this.autoBasicEvents=0,this.manualSkillEvents=0,this.expeditionId=this.nextExpeditionId(),this.layout.resultPanel.setAttribute("aria-hidden","true"),this.layout.resultPanel.inert=!0,this.closeChooser(),this.lastAnnotatedMapPaint="",this.syncDataset(),this.renderLedger()}destroy(){for(const e of this.cleanup.splice(0))e();this.ledger.remove(),this.chooser.remove()}discoverSite(e,a){this.preview.discoveredSites.some(r=>r.siteId===e)||this.queue({type:"site-discovered",eventId:this.allocateEventId("site"),expeditionId:this.expeditionId,tick:a,siteId:e})}recoverItem(e,a,r){this.discoverSite(e,r);const s=`relic:${a}`;this.preview.recoveredItems.some(i=>i.itemId===s)||this.queue({type:"item-recovered",eventId:this.allocateEventId("item"),expeditionId:this.expeditionId,tick:r,siteId:e,itemId:s})}queue(e){this.preview=yd(this.preview,e),this.pendingEvents.push(e),this.renderLedger(),this.syncDataset()}openReturnFlow(){if(this.memory.installedModule!==null){this.finish("returned");return}const e=this.baseCandidates();if(e.length===0){this.memoryLine.textContent="拠点化には、どちらかのsiteで回収した中核遺物が一つ必要。",this.layout.statusLive.textContent="拠点化できる回収物がありません。siteを探索してください。";return}this.phase="choosing-base",this.selectedBaseSiteId=null,this.chooserKicker.textContent="BASE CLAIM / WORLD MEMORY",this.chooserTitle.textContent="どちらを最初の拠点にする？",this.chooserBody.textContent="もう一方は消えない。次の遠征に、未解決の目的地として残る。",this.chooserActions.replaceChildren(...e.map(a=>this.choiceButton(ma[a],`${this.availableItemsAt(a).length}件の中核遺物を利用可能`,()=>this.chooseBase(a)))),this.showChooser()}chooseBase(e){this.phase="choosing-module",this.selectedBaseSiteId=e,this.chooserKicker.textContent="MODULE INSTALL / ONE CORE REQUIRED",this.chooserTitle.textContent=`${ma[e]}に何を組み込む？`,this.chooserBody.textContent="設置には回収物を一つ消費する。効果は次の遠征開始時から現れる。",this.chooserActions.replaceChildren(this.choiceButton(Hs["pathfinder-array"],"琥珀色の経路標を投影し、非戦闘時の移動を12%高める",()=>{this.install("pathfinder-array")}),this.choiceButton(Hs["relic-overdrive"],"珊瑚色の共鳴環を形成し、大技の再使用時間を35%短縮する",()=>{this.install("relic-overdrive")})),this.showChooser()}async install(e){const a=this.selectedBaseSiteId,r=a===null?void 0:this.availableItemsAt(a)[0];if(a===null||r===void 0){this.failReturn("設置に使える回収物が見つかりませんでした。");return}const s=this.pendingEvents.at(-1)?.tick??0,i=[{type:"base-claimed",eventId:this.allocateEventId("base"),expeditionId:this.expeditionId,tick:s,siteId:a},{type:"module-installed",eventId:this.allocateEventId("module"),expeditionId:this.expeditionId,tick:s,siteId:a,moduleId:e,consumedItemId:r.itemId}];await this.finish("returned",i)}async finish(e,a=[]){if(this.phase==="saving"||this.phase==="ended")return;this.phase="saving",this.hideChooser(),this.retreatButton.disabled=!0;const r=Math.max(0,a.at(-1)?.tick??this.pendingEvents.at(-1)?.tick??0),s={type:"expedition-ended",eventId:this.allocateEventId("end"),expeditionId:this.expeditionId,tick:r,reason:e},i=[...this.pendingEvents,...a,s];try{const n=a2(this.memory,i);await this.runtime.onCommit(n),this.memory=n,this.preview=n,this.pendingEvents=[],this.phase="ended",this.showResult(e)}catch(n){this.phase="exploring",this.retreatButton.disabled=!1,this.failReturn(n instanceof Error?`記録に失敗しました。${n.message}`:"記録に失敗しました。もう一度帰還操作を試してください。")}this.syncDataset(),this.renderLedger()}showResult(e){const a=this.memory.installedModule,r=$i(this.memory);this.layout.resultTitle.textContent=e==="returned"?a===null?"遠征記録を保存":`${ma[a.siteId]}、稼働開始`:e==="retreated"?"撤退。持ち帰れるものは持ち帰った":"調査途絶。記録だけが帰還した",this.layout.resultBody.textContent=[`発見site ${this.memory.discoveredSites.length} / 2　回収履歴 ${this.memory.recoveredItems.length}`,a===null?"拠点とmoduleはまだ確定していない。":`${Hs[a.moduleId]}を設置。回収物 ${a.consumedItemId} を消費。`,r.length>0?`未解決：${r.map(s=>ma[s]).join(" / ")}`:"二つのsiteは記録済み。世界は次の変化を待っている。"].join(`
`),this.layout.restartButton.textContent=a===null?"次の遠征へ":"記憶を反映して二回目へ",this.layout.restartButton.disabled=!1,this.layout.resultPanel.setAttribute("aria-hidden","false"),this.layout.resultPanel.inert=!1,this.layout.statusLive.textContent="世界記憶をローカルへ保存しました。"}baseCandidates(){return this.preview.discoveredSites.map(e=>e.siteId).filter(e=>this.availableItemsAt(e).length>0)}availableItemsAt(e){return this.preview.recoveredItems.filter(a=>a.sourceSiteId===e&&a.status==="available")}objectiveText(){if(this.phase==="saving")return"世界記憶を書き込んでいる";if(this.phase==="ended")return"遠征記録を確認する";if(this.memory.installedModule!==null){const e=$i(this.memory);return e.length>0?`${ma[e[0]??"canopy-relay"]}へ。module効果を確認する`:"module効果を確認し、自由に調査する"}return this.baseCandidates().length>0?"観測町へ帰還し、拠点とmoduleを選ぶ":this.preview.discoveredSites.length>0?"siteの中核遺物を回収する":"二つのsiteから行き先を選ぶ"}destinationFor(e){if(this.baseCandidates().length>0||this.phase!=="exploring")return{...ye.town.interactionPoint,name:"観測町・帰還端末"};const a=$i(this.memory),r=Object.keys(wr).filter(n=>!this.preview.discoveredSites.some(o=>o.siteId===n)),s=a.length>0?a:r,i=l2(e,s.length>0?s:["canopy-relay","flooded-archive"]);return{...wr[i],name:ma[i]}}renderLedger(){const e=Object.keys(ma).map(r=>{const s=this.preview.discoveredSites.some(A=>A.siteId===r),i=this.preview.claimedBaseSiteId===r,n=this.preview.recoveredItems.filter(A=>A.sourceSiteId===r).length,o=document.createElement("li");return o.dataset.state=i?"base":s?"discovered":"unknown",o.innerHTML=`<i></i><span>${ma[r]}</span><b>${i?"BASE":s?`REC ${n}`:"SIGNAL"}</b>`,o});this.siteList.replaceChildren(...e);const a=this.memory.installedModule?.moduleId;this.memoryLine.textContent=this.phase==="saving"?"LOCAL MEMORY / WRITING…":a===void 0?`LOCAL MEMORY / ${this.pendingEvents.length}件を持帰り中`:`${Hs[a]} / ACTIVE`,this.retreatButton.disabled=this.phase!=="exploring"||this.pendingEvents.length===0}annotateMinimap(){const e=this.layout.minimap.dataset.lastPaintAt??"";if(e===this.lastAnnotatedMapPaint)return;const a=this.layout.minimap.getContext("2d");if(a===null)return;this.lastAnnotatedMapPaint=e;const r=this.layout.minimap.width/3600,s=this.layout.minimap.height/1800;for(const i of Object.keys(wr)){const n=wr[i],o=this.preview.discoveredSites.some(A=>A.siteId===i);a.save(),a.translate(n.x*r,n.y*s),a.fillStyle=o?"#82f3d2":"#f6bd68",a.strokeStyle="rgba(7, 31, 29, 0.92)",a.lineWidth=2,a.rotate(Math.PI/4),a.fillRect(-4,-4,8,8),a.strokeRect(-4,-4,8,8),a.restore()}}syncDataset(){const e=this.effects;this.layout.stage.dataset.memoryVersion=String(this.memory.version),this.layout.stage.dataset.memoryExpedition=this.expeditionId,this.layout.stage.dataset.memoryPhase=this.phase,this.layout.stage.dataset.memoryDiscovered=this.preview.discoveredSites.map(a=>a.siteId).join(","),this.layout.stage.dataset.memoryModule=this.memory.installedModule?.moduleId??"none",this.layout.stage.dataset.memoryBase=this.memory.claimedBaseSiteId??"none",this.layout.stage.dataset.memoryRecovered=this.preview.recoveredItems.map(a=>`${a.itemId}:${a.status}`).join(","),this.layout.stage.dataset.memoryLastEndReason=this.memory.expeditionHistory.at(-1)?.endedReason??"none",this.layout.stage.dataset.memoryVisualCue=e.routeOverlay?"route-overlay":e.relicAura?"relic-aura":"none",this.layout.stage.dataset.memoryGameplayCue=e.explorationSpeedMultiplier>1?"exploration-speed":e.relicCooldownMultiplier<1?"relic-cooldown":"none",this.layout.stage.dataset.memorySaved=String(this.memory.expeditionHistory.length),this.layout.stage.dataset.memoryAutoBasicEvents=String(this.autoBasicEvents),this.layout.stage.dataset.memoryManualSkillEvents=String(this.manualSkillEvents)}createLedger(){const e=document.createElement("aside");return e.className="r09-memory-ledger",e.setAttribute("aria-label","世界記憶と遠征状況"),e.innerHTML=`
      <div class="r09-memory-ledger__head">
        <span>WORLD MEMORY / V1</span>
        <strong>FIRST MEMORY EXPEDITION</strong>
      </div>
      <ul data-r09="sites"></ul>
      <p data-r09="memory">LOCAL MEMORY</p>
      <button data-r09-action="retreat" type="button" disabled>
        <strong>撤退して持ち帰る</strong><small>発見と回収だけを記録</small>
      </button>
    `,e}createChooser(){const e=document.createElement("section");return e.className="r09-memory-chooser",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-hidden","true"),e.inert=!0,e.innerHTML=`
      <div class="r09-memory-chooser__copy">
        <span data-r09="chooser-kicker">WORLD MEMORY</span>
        <h2 data-r09="chooser-title">拠点を選ぶ</h2>
        <p data-r09="chooser-body"></p>
      </div>
      <div class="r09-memory-chooser__actions" data-r09="chooser-actions"></div>
      <button class="r09-memory-chooser__back" data-r09-action="back" type="button">
        探索へ戻る
      </button>
    `,e}choiceButton(e,a,r){const s=document.createElement("button");return s.type="button",s.innerHTML=`<strong>${e}</strong><small>${a}</small>`,s.addEventListener("click",r,{once:!0}),s}showChooser(){this.chooser.setAttribute("aria-hidden","false"),this.chooser.inert=!1,this.chooserActions.querySelector("button")?.focus({preventScroll:!0}),this.syncDataset()}hideChooser(){this.chooser.setAttribute("aria-hidden","true"),this.chooser.inert=!0}closeChooser(){(this.phase==="choosing-base"||this.phase==="choosing-module")&&(this.phase="exploring"),this.selectedBaseSiteId=null,this.hideChooser(),this.syncDataset(),this.layout.stage.focus({preventScroll:!0})}failReturn(e){this.memoryLine.textContent=e,this.layout.statusLive.textContent=e,this.closeChooser()}isAtTownBoard(e){return Math.hypot(e.player.x-ye.town.interactionPoint.x,e.player.y-ye.town.interactionPoint.y)<=n2}allocateEventId(e){const a=`${this.expeditionId}:${this.eventSequence}:${e}`;return this.eventSequence+=1,a}nextExpeditionId(){return`expedition-${this.memory.expeditionHistory.length+1}`}}function A2(t){return t==="fork"?"canopy-relay":t==="ruin"?"flooded-archive":null}function l2(t,e){return[...e].sort((a,r)=>{const s=wr[a],i=wr[r];return Math.hypot(t.player.x-s.x,t.player.y-s.y)-Math.hypot(t.player.x-i.x,t.player.y-i.y)||a.localeCompare(r)})[0]??"canopy-relay"}function ur(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`R09 memory UI element is missing: ${e}`);return a}function bl(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`R09 memory UI button is missing: ${e}`);return a}const Ks=()=>({schema:"fram.causal-region.first-r01.ledger",version:1,entries:[]}),Dl=(t=Ks(),e=t.entries.length>0)=>({phase:t.entries.length>0?"committed":"dormant",evidence:{machineObserved:!1,organismObserved:!1,machineDefeated:!1},material:t.entries[0]?.material??null,ledger:t,returnVisit:e}),Js=(t,e)=>{if(t.ledger.entries.length>0||t.phase==="left-unresolved")return t;if(e.type==="functional-material-left-unresolved")return t.phase!=="material-offered"?t:{...t,phase:"left-unresolved",material:null};if(e.type==="functional-material-recovered")return t.phase!=="coupling-observed"||!t.evidence.machineObserved||!t.evidence.organismObserved?t:{...t,phase:"material-offered",material:c2(t.evidence.machineDefeated)};const a={...t.evidence,machineObserved:t.evidence.machineObserved||e.type==="machine-role-observed"||e.type==="machine-role-defeated",organismObserved:t.evidence.organismObserved||e.type==="organism-role-observed",machineDefeated:t.evidence.machineDefeated||e.type==="machine-role-defeated"},r=Number(a.machineObserved)+Number(a.organismObserved);return{...t,evidence:a,phase:r===2?"coupling-observed":"one-role-observed"}},Bl=(t,e,a=null)=>{if(t.ledger.entries.length>0)throw new Error("The durable causal consequence is already committed.");if(t.phase!=="material-offered"||t.material===null)throw new Error("A source-tagged offered material is required.");if(e==="field-first"&&a===null)throw new Error("Field-first requires the build upgrade produced by ordinary R10.");if(e==="region-first"&&a!==null)throw new Error("Region-first cannot also retain a field build upgrade.");const r=d2(t.material,e,a);return{...t,phase:"committed",ledger:{...t.ledger,entries:[r]},returnVisit:!1}},Pl=t=>t.ledger.entries.length===0?t:{...t,returnVisit:!0},c2=t=>({id:"first-r01:runtime:relay-capacitor",runtimeLootId:"relay-capacitor",semanticClass:"FM-ACT",sourceObservations:["enemy-shell:combat-contact","enemy-murmur:combat-contact"],resolution:t?"fight-through":"break-or-redirect",recoveryMode:t?"disabled-active-assembly":"released-incompatible-spare",condition:t?"worn-under-forced-stop":"intact-observed",mechanismObservation:"二つの既存runtime roleが同じ湿潤中継点へ反応し、蓄相器を外すと片方の追跡が止まる範囲だけを観測した。",compatibilityEnvelope:["既存buildの増幅器として使う","共同口の低電圧試験器へ一つだけ預ける"],failureModes:["観測外の負荷では調整を保証しない","取付条件が違えば中継または水試験に使えない"],worldCost:t?"既存の機械roleを停止したため、同じ場所の運搬機能は戻らない。":"機械roleは別の追跡へ外れ、未観測の場所へ負荷が残る可能性がある。",confidence:"bounded-runtime-observation",provisionalRoles:!0}),d2=(t,e,a)=>({eventId:"first-r01:durable:01",sequence:1,eventClass:"RecoveredFunctionCommitted",commitment:e,resolution:t.resolution,material:t,fieldBuild:a,consequences:e==="region-first"?["共同口の限定水試験が成立する","次の帰還で温かい一皿と小さな集まりが見える"]:["既存buildの強化が遠征へ残る","携行側で観測した制御機能を使える"],absentConsequences:e==="region-first"?["携行buildの強化は得られない"]:["共同口の水試験、温かい一皿、小さな集まりは成立しない"],authorityRefs:["PTO-05","PTO-06","PTO-09"]}),In="fram-causal-region:first-r01:causal-ledger:v1";class xd{values=new Map;getItem(e){return this.values.get(e)??null}setItem(e,a){this.values.set(e,a)}removeItem(e){this.values.delete(e)}}class u2{constructor(e,a=new xd){this.primary=e,this.fallback=a,this.primaryAvailable=e!==null}primary;fallback;primaryAvailable;get persistence(){return this.primaryAvailable?"local":"memory"}getItem(e){if(this.primaryAvailable&&this.primary!==null)try{return this.primary.getItem(e)}catch{this.primaryAvailable=!1}return this.fallback.getItem(e)}setItem(e,a){if(this.primaryAvailable&&this.primary!==null)try{this.primary.setItem(e,a);return}catch{this.primaryAvailable=!1}this.fallback.setItem(e,a)}removeItem(e){if(this.primaryAvailable&&this.primary!==null)try{this.primary.removeItem(e);return}catch{this.primaryAvailable=!1}this.fallback.removeItem(e)}}class h2{constructor(e,a=In){this.storage=e,this.storageKey=a}storage;storageKey;load(){const e=this.storage.getItem(this.storageKey);if(e===null)return Ks();try{const a=JSON.parse(e);return f2(a)?a:Ks()}catch{return Ks()}}append(e){const a=this.load(),r=a.entries.find(i=>i.eventId===e.eventId);if(r!==void 0){if(JSON.stringify(r)!==JSON.stringify(e))throw new Error(`Causal event ${e.eventId} conflicts with the append-only ledger.`);return a}if(a.entries.length>0)throw new Error("The bounded causal ledger already contains its durable consequence.");const s={...a,entries:[e]};return this.storage.setItem(this.storageKey,JSON.stringify(s)),s}}const f2=t=>{if(typeof t!="object"||t===null)return!1;const e=t;return e.schema!=="fram.causal-region.first-r01.ledger"||e.version!==1||!Array.isArray(e.entries)||e.entries.length>1?!1:e.entries.every(p2)},p2=t=>{if(typeof t!="object"||t===null)return!1;const e=t;return e.eventId==="first-r01:durable:01"&&e.sequence===1&&e.eventClass==="RecoveredFunctionCommitted"&&(e.commitment==="field-first"||e.commitment==="region-first")&&(e.resolution==="fight-through"||e.resolution==="break-or-redirect")&&m2(e.material)&&g2(e.fieldBuild)&&Array.isArray(e.consequences)&&e.consequences.every(a=>typeof a=="string")&&Array.isArray(e.absentConsequences)&&e.absentConsequences.every(a=>typeof a=="string")&&Array.isArray(e.authorityRefs)&&e.authorityRefs.join("|")==="PTO-05|PTO-06|PTO-09"},m2=t=>{if(typeof t!="object"||t===null)return!1;const e=t;return e.id==="first-r01:runtime:relay-capacitor"&&e.runtimeLootId==="relay-capacitor"&&e.semanticClass==="FM-ACT"&&(e.resolution==="fight-through"||e.resolution==="break-or-redirect")&&(e.condition==="worn-under-forced-stop"||e.condition==="intact-observed")&&e.confidence==="bounded-runtime-observation"&&e.provisionalRoles===!0&&Array.isArray(e.sourceObservations)&&Array.isArray(e.compatibilityEnvelope)&&Array.isArray(e.failureModes)},g2=t=>{if(t===null)return!0;if(typeof t!="object")return!1;const e=t;return(e.runtimeBuildId==="counter-cutter"||e.runtimeBuildId==="breach-driver")&&Number.isInteger(e.level)&&e.level>=1},bd="enemy-shell",w2="enemy-murmur",Ha="relay-capacitor",v2=(t,e)=>{let a=t;for(const r of e)(r.type==="enemy-damaged"||r.type==="enemy-defeated")&&r.enemyId===bd&&(a=Js(a,{type:r.type==="enemy-defeated"?"machine-role-defeated":"machine-role-observed"})),(r.type==="enemy-damaged"||r.type==="enemy-defeated")&&r.enemyId===w2&&(a=Js(a,{type:"organism-role-observed"}));for(const r of e)r.type==="loot-picked"&&r.lootId===Ha&&(a=Js(a,{type:"functional-material-recovered"}));return a},El=(t,e)=>{const a=e.ledger.entries[0],r=a?.resolution??e.material?.resolution,s=r===void 0?t.enemies:t.enemies.map(i=>i.id!==bd?i:r==="fight-through"?{...i,hp:0,active:!1,defeated:!0,disposition:"destroyed",attack:{...i.attack,phase:"idle",ticksRemaining:0,attackId:null}}:{...i,active:!1,defeated:!1,disposition:"dormant",attack:{...i.attack,phase:"idle",ticksRemaining:0,attackId:null}});return a===void 0?s===t.enemies?t:{...t,enemies:s}:{...t,enemies:s,player:t.player.collectedLootIds.includes(Ha)?t.player:{...t.player,collectedLootIds:[...t.player.collectedLootIds,Ha]},world:{...t.world,loot:t.world.loot.map(i=>i.lootId===Ha?{...i,picked:!0}:i)}}};class y2{constructor(e,a){this.layout=e,this.storage=new u2(x2(),new xd);const r=window.location.search,s=On(r,window.location.pathname)?`${In}:mvp-comparison:${ic(r)}`:In;this.repository=new h2(this.storage,s);const i=this.repository.load();this.runtime=Dl(i,i.entries.length>0),this.summary=document.createElement("div"),this.summary.className="r10-buildcraft-status__salvage",this.summary.dataset.r10="causal-summary",this.summary.innerHTML='<span>OPTIONAL CAUSAL TRACE</span><b data-r10="causal-state">OPEN</b>',this.summaryState=b2(this.summary,'[data-r10="causal-state"]'),this.detail=document.createElement("small"),this.detail.dataset.r10="causal-detail",this.detail.setAttribute("aria-live","polite"),a.append(this.summary,this.detail),this.renderStatus()}layout;storage;repository;summary;summaryState;detail;runtime;prepareWorld(e){return El(e,this.runtime)}get causalState(){return this.runtime}restoreFieldBuild(e){const a=this.runtime.ledger.entries[0];if(a===void 0)return e;const r=e.processedLootIds.includes(Ha)?e.processedLootIds:[...e.processedLootIds,Ha],s=a.fieldBuild;return s===null?{...e,processedLootIds:r}:{...e,processedLootIds:r,equippedBuildId:s.runtimeBuildId,buildLevels:{...e.buildLevels,[s.runtimeBuildId]:Math.max(e.buildLevels[s.runtimeBuildId],s.level)},unlockedBuildIds:e.unlockedBuildIds.includes(s.runtimeBuildId)?e.unlockedBuildIds:[...e.unlockedBuildIds,s.runtimeBuildId]}}observeStep(e,a){const r=this.runtime.phase;return this.runtime=v2(this.runtime,a),a.some(s=>s.type==="result-reached")&&this.runtime.ledger.entries.length>0&&(this.runtime=Pl(this.runtime)),r!=="coupling-observed"&&this.runtime.phase==="coupling-observed"&&(this.layout.statusLive.textContent="二つの活動痕が同じ湿潤中継点へ反応しています。通常遠征はそのまま続けられます。"),r!=="material-offered"&&this.runtime.phase==="material-offered"&&(this.layout.statusLive.textContent="中継蓄相器に出所と状態を記録しました。buildか地域か、使わず分解するかを選べます。"),this.renderStatus(),El(e,this.runtime)}decorateOffer(e){const a=this.isMaterialOffer(e.offer);if(e.chooser.dataset.causalMaterial=String(a),!a||this.runtime.material===null)return;const r=this.runtime.material;e.title.textContent=`${e.offer.name} / SOURCE TAGGED`,e.mechanism.textContent=`${e.offer.explanation} 出所: ${r.sourceObservations.join(" + ")}。状態: ${r.condition}。失敗: ${r.failureModes.join(" / ")}。世界側の代価: ${r.worldCost}`;const s=document.createElement("button");s.type="button",s.dataset.r10CausalAction="region-first",s.innerHTML="<strong>地域へ預ける</strong><small>限定水試験へ使用。build強化は得ず、帰還時に生活差を確認</small>",s.addEventListener("click",e.onRegionCommit,{once:!0}),e.actions.append(s)}commitFieldFirst(e){if(this.runtime.phase!=="material-offered")return null;const a=e.find(r=>r.type==="build-upgraded");return a===void 0?null:(this.runtime=Bl(this.runtime,"field-first",{runtimeBuildId:a.buildId,level:a.level}),this.persistCommitment(),this.renderStatus(),"FIELD-FIRSTを記録。build強化は残り、共同口の水試験と食卓は成立しません。")}commitRegionFirst(){return this.runtime.phase!=="material-offered"?null:(this.runtime=Bl(this.runtime,"region-first"),this.persistCommitment(),this.renderStatus(),"REGION-FIRSTを記録。共同口へ預け、次の帰還で限定水試験と小さな食卓を確認します。")}leaveUnresolved(){this.runtime.phase==="material-offered"&&(this.runtime=Js(this.runtime,{type:"functional-material-left-unresolved"}),this.renderStatus())}beginNextExpedition(){this.runtime=this.runtime.ledger.entries.length===0?Dl():Pl(this.runtime),this.renderStatus()}updatePresentation(){this.renderStatus()}destroy(){this.summary.remove(),this.detail.remove()}isMaterialOffer(e){return e.lootId===Ha&&this.runtime.phase==="material-offered"&&this.runtime.ledger.entries.length===0}persistCommitment(){const e=this.runtime.ledger.entries[0];if(e===void 0)throw new Error("A committed causal event is required before persistence.");const a=this.repository.append(e);this.runtime={...this.runtime,ledger:a}}renderStatus(){const e=this.runtime.ledger.entries[0],a=e!==void 0||this.runtime.phase!=="dormant";this.summary.hidden=!a,this.detail.hidden=!a,this.summary.style.display=a?"":"none",this.detail.style.display=a?"":"none";let r="OPEN",s="通常の移動・戦闘・loot・buildを続けられる。深い記録はまだない。";if(e!==void 0)e.commitment==="region-first"?(r=this.runtime.returnVisit?"WARM RETURN":"REGION-FIRST",s=this.runtime.returnVisit?"限定水試験が通り、温かい一皿と任意の小さな集まりが帰還先に残った。":"共同口へ預けた。水試験と生活差は次の帰還で確認する。"):(r=this.runtime.returnVisit?"FIELD RETURN":"FIELD-FIRST",s=this.runtime.returnVisit?"build強化が残る。共同口の試験、食卓、小さな集まりは成立していない。":"build強化へ使った。地域側の水試験と食卓は成立しない。");else switch(this.runtime.phase){case"one-role-observed":r="TRACE 1 / 2",s="片方の活動痕だけを観測。もう片方を追わず、通常遠征を続けてもよい。";break;case"coupling-observed":r="COUPLING READ",s="二つのroleが湿潤中継点へ反応。中継蓄相器を使うか無視するかは任意。";break;case"material-offered":r="SOURCE TAGGED",s=`${this.runtime.material?.condition??"observed"} / ${this.runtime.material?.resolution??"unresolved"} / 一つだけ使用可能。`;break;case"left-unresolved":r="LEFT OPEN",s="分解して通常遠征を継続。永続的な地域結果は記録していない。";break}this.summaryState.textContent=r,this.detail.textContent=s,this.layout.stage.dataset.causalEventPhase=this.runtime.phase,this.layout.stage.dataset.causalCommitment=e?.commitment??"none",this.layout.stage.dataset.causalResolution=e?.resolution??this.runtime.material?.resolution??"none",this.layout.stage.dataset.causalMaterialCondition=e?.material.condition??this.runtime.material?.condition??"none",this.layout.stage.dataset.causalMachineObserved=String(this.runtime.evidence.machineObserved),this.layout.stage.dataset.causalMachineDefeated=String(this.runtime.evidence.machineDefeated),this.layout.stage.dataset.causalOrganismObserved=String(this.runtime.evidence.organismObserved),this.layout.stage.dataset.causalLedgerEntries=String(this.runtime.ledger.entries.length),this.layout.stage.dataset.causalReturn=String(this.runtime.returnVisit),this.layout.stage.dataset.causalPersistence=this.storage.persistence}}const x2=()=>{try{return window.localStorage}catch{return null}},b2=(t,e)=>{const a=t.querySelector(e);if(a===null)throw new Error(`R10 causal event element is missing: ${e}`);return a},D2={exploration:{path:"audio/first-stage-mvp/exploration-loop.wav",role:"open-air traversal, old rail and readable distance",loop:!0},combat:{path:"audio/first-stage-mvp/combat-loop.wav",role:"pressure, target priority and decisive intervention",loop:!0},return:{path:"audio/first-stage-mvp/return-loop.wav",role:"physical return, repair and unresolved continuation",loop:!0},"causal-read":{path:"audio/first-stage-mvp/causal-read.wav",role:"machine-organism coupling becomes readable",loop:!1},redirect:{path:"audio/first-stage-mvp/redirect.wav",role:"water-control relay redirects pursuit",loop:!1},commit:{path:"audio/first-stage-mvp/commit.wav",role:"one scarce function crosses the durable boundary",loop:!1},"warm-return":{path:"audio/first-stage-mvp/warm-return.wav",role:"bounded water test becomes a shared meal",loop:!1}},Dd=Object.freeze({a:{id:"suno-candidate-a",path:"audio/first-stage-mvp/r11-hybrid/fragile-motif.mp3",sourceName:"Fragile Motif.mp3",sha256:"b10e15efa97ff5b303a84643e5bc42995e31d1ab796d7e8126514616f39f758c",durationSeconds:258.696},b:{id:"suno-candidate-b",path:"audio/first-stage-mvp/r11-hybrid/static-in-the-static.mp3",sourceName:"Static in the Static.mp3",sha256:"126fe8891a3397a341b26e9cbf0b8a197c0c6abd6ed156775b18dfca30dfb753",durationSeconds:275.04},rightsStatus:"user-authorized-personally-produced-suno-game-use",duplicateExcluded:"Static in the Static 2.mp3"}),Qn=Object.freeze({candidate:"b",mode:"continuous",label:"B / CONTINUOUS",sceneSwitching:!1}),B2={combatFeedback:{noiseSeed:1836478513}},Bd={"control-press":{role:"immediate touch and button acknowledgement",minimumIntervalSeconds:.045,voices:2,peakVoiceGain:.055},"passive-guard":{role:"lower-energy automatic deflection",minimumIntervalSeconds:.12,voices:2,peakVoiceGain:.095},"enemy-defeated":{role:"decisive hostile collapse and confirmation",minimumIntervalSeconds:.12,voices:4,peakVoiceGain:.22},survey:{role:"optional site reading confirmation",minimumIntervalSeconds:.18,voices:3,peakVoiceGain:.075}};class P2{oneShots=new Set;feedbackLastPlayedAt=new Map;scene="silent";musicPlayer=null;musicPlaybackState="locked";musicPlaybackListeners=new Set;unlocked=!1;muted=!1;feedbackContext=null;feedbackOutput=null;feedbackNoise=null;get playbackState(){return this.musicPlaybackState}setPlaybackListener(e){return this.musicPlaybackListeners.add(e),e(this.musicPlaybackState),()=>this.musicPlaybackListeners.delete(e)}async unlock(){this.unlocked=!0;const e=this.syncMusic();try{await this.unlockFeedback()}catch{}await e}setScene(e){this.scene!==e&&(this.scene=e,this.syncMusic())}setMuted(e){this.muted=e,this.musicPlayer!==null&&(this.musicPlayer.muted=e);for(const a of this.oneShots)a.muted=e;if(this.feedbackContext!==null&&this.feedbackOutput!==null){const a=this.feedbackContext.currentTime;this.feedbackOutput.gain.cancelScheduledValues(a),this.feedbackOutput.gain.setTargetAtTime(e?0:.32,a,.012)}}play(e){if(!this.unlocked||this.muted)return;if(E2(e)){this.playFeedback(e);return}const a=D2[e],r=new Audio(Cl(a.path));r.volume=e==="warm-return"?.44:.38,r.preload="auto";const s=()=>{this.oneShots.delete(r)};r.addEventListener("ended",s,{once:!0}),r.addEventListener("error",s,{once:!0}),this.oneShots.add(r),r.play().catch(s)}dispose(){this.musicPlayer?.pause(),this.musicPlayer?.removeAttribute("src");for(const e of this.oneShots)e.pause(),e.removeAttribute("src");this.musicPlayer=null,this.oneShots.clear(),this.feedbackContext!==null&&this.feedbackContext.close(),this.feedbackContext=null,this.feedbackOutput=null,this.feedbackNoise=null,this.feedbackLastPlayedAt.clear(),this.unlocked=!1,this.setMusicPlaybackState("locked")}async unlockFeedback(){if(this.feedbackContext===null){const e=new AudioContext({latencyHint:"interactive",sampleRate:44100}),a=e.createGain(),r=e.createDynamicsCompressor();a.gain.value=this.muted?0:.32,r.threshold.value=-20,r.knee.value=16,r.ratio.value=8,r.attack.value=.002,r.release.value=.14,a.connect(r),r.connect(e.destination),this.feedbackContext=e,this.feedbackOutput=a,this.feedbackNoise=C2(e)}this.feedbackContext.state!=="running"&&await this.feedbackContext.resume()}playFeedback(e){const a=this.feedbackContext,r=this.feedbackOutput;if(a===null||r===null||a.state!=="running"||this.muted)return;const s=a.currentTime,i=Bd[e],n=this.feedbackLastPlayedAt.get(e);if(!(n!==void 0&&Number.isFinite(n)&&s-n+1e-9<i.minimumIntervalSeconds))switch(this.feedbackLastPlayedAt.set(e,s),e){case"control-press":this.playFeedbackTone(520,s,.045,.055,"triangle",r),this.playFeedbackNoise(s,.025,.018,2200,r);break;case"passive-guard":this.playFeedbackSweep(270,175,s,.1,.095,"triangle",r),this.playFeedbackNoise(s,.06,.038,920,r);break;case"enemy-defeated":this.playFeedbackSweep(132,36,s,.3,.22,"square",r),this.playFeedbackNoise(s,.2,.11,240,r),this.playFeedbackTone(261.63,s+.05,.16,.08,"triangle",r),this.playFeedbackTone(392,s+.13,.22,.06,"sine",r);break;case"survey":this.playFeedbackSweep(330,740,s,.18,.075,"sine",r),this.playFeedbackTone(987.77,s+.11,.16,.055,"triangle",r),this.playFeedbackNoise(s+.03,.12,.022,2100,r);break}}playFeedbackTone(e,a,r,s,i,n){const o=this.feedbackContext;if(o===null)return;const A=o.createOscillator(),l=o.createGain();A.type=i,A.frequency.setValueAtTime(e,a),l.gain.setValueAtTime(1e-4,a),l.gain.exponentialRampToValueAtTime(s,a+.006),l.gain.exponentialRampToValueAtTime(1e-4,a+r),A.connect(l),l.connect(n),A.start(a),A.stop(a+r+.02)}playFeedbackSweep(e,a,r,s,i,n,o){const A=this.feedbackContext;if(A===null)return;const l=A.createOscillator(),c=A.createGain();l.type=n,l.frequency.setValueAtTime(e,r),l.frequency.exponentialRampToValueAtTime(Math.max(1,a),r+s),c.gain.setValueAtTime(1e-4,r),c.gain.exponentialRampToValueAtTime(i,r+.006),c.gain.exponentialRampToValueAtTime(1e-4,r+s),l.connect(c),c.connect(o),l.start(r),l.stop(r+s+.02)}playFeedbackNoise(e,a,r,s,i){const n=this.feedbackContext,o=this.feedbackNoise;if(n===null||o===null)return;const A=n.createBufferSource(),l=n.createBiquadFilter(),c=n.createGain();A.buffer=o,l.type="bandpass",l.frequency.value=s,l.Q.value=.75,c.gain.setValueAtTime(r,e),c.gain.exponentialRampToValueAtTime(1e-4,e+a),A.connect(l),l.connect(c),c.connect(i),A.start(e),A.stop(e+a)}async syncMusic(){if(!this.unlocked||this.scene==="silent"||this.musicPlaybackState==="starting"||this.musicPlaybackState==="playing")return;let e=this.musicPlayer;if(e===null){const a=Dd[Qn.candidate];e=new Audio(Cl(a.path)),e.loop=!0,e.preload="none",e.volume=.24,e.muted=this.muted,this.musicPlayer=e}this.setMusicPlaybackState("starting");try{await e.play(),this.setMusicPlaybackState("playing")}catch{this.setMusicPlaybackState("blocked")}}setMusicPlaybackState(e){if(this.musicPlaybackState!==e){this.musicPlaybackState=e;for(const a of this.musicPlaybackListeners)a(e)}}}const Cl=t=>{const e=new URL("../",window.location.href);return new URL(t,e).toString()},E2=t=>t in Bd,C2=t=>{const e=Math.floor(t.sampleRate*.35),a=t.createBuffer(1,e,t.sampleRate),r=a.getChannelData(0);let s=B2.combatFeedback.noiseSeed;for(let i=0;i<r.length;i+=1)s^=s<<13,s^=s>>>17,s^=s<<5,r[i]=(s>>>0)/4294967295*2-1;return a},M2=360,S2=3,I2=2,Q2=2,k2=1,hr=Object.freeze({sourceX:1820,sourceY:1e3,x:1760,y:1040,tutorialHp:64}),T2=[{id:"water-safety",label:"水の状態を確かめる",detail:"雨水制御塔の停止理由と、共同口へ戻せる範囲を追う。"},{id:"field-build",label:"build素材を探す",detail:"旧線路の機械と活動痕から、携行装備へ使える機能を探す。"},{id:"rail-passage",label:"旧線路を通り抜ける",detail:"経路、退路、危険の偏りを自分の足で確かめる。"}],Wr={semanticSlotId:"first-stage-mvp:first-r01:rainwater-control-tower",x:wa.valve.x,y:wa.valve.y,interactionRadius:wa.valve.interactionRadius,presentation:"accepted-landmark-r08-digest-bound"},Ml=(t,e,a)=>{const r=e.commitment??a.ledger.entries[0]?.commitment??null,s=t.world.terrain.filter(d=>d.id!=="mvp-rainwater-control-tower-collider"&&d.id!=="shallow-basin"),i=Il(s,[...V1,...W1]),n=Il(t.world.props.filter(d=>d.id!=="mvp-rainwater-control-tower-relay"),r==="region-first"?[...cl,...K1]:cl),o=e.selectedIntent!==null&&t.quest.phase==="briefing"?{...t.quest,phase:"travel-to-fork",objective:"Chosen intent accepted. Follow the old rail to the eastern fork."}:t.quest;let A=t.enemies;for(const d of e.activatedWaves)for(const u of Z1[d])A.some(h=>h.id===u.id)||(A=[...A,R2(u)]);A=A.map(d=>d.id==="enemy-shell"&&t.tick===0&&Math.hypot(d.x-hr.sourceX,d.y-hr.sourceY)<=60?{...d,x:hr.x,y:hr.y,hp:hr.tutorialHp,maxHp:hr.tutorialHp}:d),A=A.map(d=>z2(d,t.player.x,t.player.y,e.beat)),e.selectedIntent==="field-build"&&!a.evidence.machineDefeated&&(A=A.map(d=>(d.id==="enemy-murmur"||Sl(d)&&d.id!=="enemy-shell")&&!d.defeated?na(d):d));const l=a.evidence.machineObserved&&a.evidence.organismObserved;(a.evidence.machineDefeated||l)&&(A=A.map(d=>(Sl(d)||l&&d.id==="enemy-murmur")&&!d.defeated?na(d):d)),e.redirectedAtTower&&(a.ledger.entries.length===0||r==="region-first")&&(A=A.map(d=>(d.id==="enemy-shell"||d.id==="enemy-murmur"||d.id.startsWith("mvp-tower-"))&&!d.defeated?na(d):d)),r==="region-first"&&(t.quest.phase==="return-town"||t.quest.phase==="result")&&(A=A.map(d=>(d.id==="enemy-murmur"||d.id.startsWith("mvp-basin-")||d.id.startsWith("mvp-overflow-")||d.id.startsWith("mvp-tower-"))&&!d.defeated?na(d):d));const c=e.selectedIntent==="water-safety";return A=F2(A,t.player.x,t.player.y,c?Q2:S2,c?k2:I2),A===t.enemies&&o===t.quest&&i===t.world.terrain&&n===t.world.props?t:{...t,enemies:A,quest:o,world:{...t.world,terrain:i,props:n}}},en=t=>Math.hypot(t.player.x-Wr.x,t.player.y-Wr.y)<=Wr.interactionRadius,R2=t=>{const e=t.rank??"normal",a=Ba(t.kind,e);return{id:t.id,kind:t.kind,rank:e,name:a.name,x:t.x,y:t.y,radius:a.radius,hp:a.maxHp,maxHp:a.maxHp,active:!0,defeated:!1,disposition:"hostile",attack:{phase:"idle",ticksRemaining:0,attackId:null,targetX:0,targetY:0,directionX:0,directionY:0}}},na=t=>({...t,active:!1,disposition:"dormant",attack:{...t.attack,phase:"idle",ticksRemaining:0,attackId:null}}),z2=(t,e,a,r)=>{if(t.defeated||!L2(t))return t;const s=r==="return"||r==="warm-return"||r==="field-return"||r==="unresolved-return";return s&&!t.id.startsWith("mvp-return-")||!s&&t.id.startsWith("mvp-return-")?na(t):Math.hypot(t.x-e,t.y-a)<=M2?O2(t):na(t)},L2=t=>t.id.startsWith("mvp-")||t.id==="enemy-hound"||t.id==="enemy-shell"||t.id==="enemy-murmur",Sl=t=>t.id==="enemy-hound"||t.id==="enemy-shell"||t.id.startsWith("mvp-rail-")||t.id.startsWith("mvp-switch-")||t.id.startsWith("mvp-basin-")||t.id.startsWith("mvp-overflow-"),F2=(t,e,a,r,s)=>{const i=t.find(d=>d.kind==="named-anomaly"&&d.active&&!d.defeated&&d.disposition==="hostile");if(i!==void 0)return t.map(d=>d.id===i.id||d.defeated?d:na(d));const n=t.filter(d=>d.active&&!d.defeated&&d.disposition==="hostile"&&d.kind!=="named-anomaly").map(d=>({enemy:d,distance:Math.hypot(d.x-e,d.y-a)})).sort((d,u)=>d.distance-u.distance||d.enemy.id.localeCompare(u.enemy.id)),o=n.filter(({enemy:d})=>d.id==="enemy-shell"||d.id==="enemy-murmur"),A=n.find(({enemy:d})=>d.rank==="elite"),l=o.length>0?o.slice(0,2):A===void 0?n.slice(0,r):[A,...n.filter(({enemy:d})=>d.id!==A.enemy.id&&d.rank!=="elite").slice(0,s-1)],c=new Set(l.map(({enemy:d})=>d.id));return t.map(d=>d.defeated||d.kind==="named-anomaly"||!d.active||d.disposition!=="hostile"||c.has(d.id)?d:na(d))},O2=t=>t.active&&t.disposition==="hostile"?t:{...t,active:!0,disposition:"hostile"},Il=(t,e)=>{const a=new Set(t.map(s=>s.id)),r=e.filter(s=>!a.has(s.id));return r.length===0?[...t]:[...t,...r]},U2=30,Ql=t=>({schema:"fram.first-stage-mvp.first-r01.runtime",version:2,runOrdinal:t.completedRuns.length+1,selectedIntent:t.draftIntent,beat:t.draftIntent===null?"choose-intent":"departure",region:"settlement",activatedWaves:[],surveyedSites:[],redirectedAtTower:!1,returnComplete:!1,commitment:null,resolution:null,audioScene:t.draftIntent===null?"silent":"exploration",passiveGuardMeter:28,passiveGuardCooldownTicks:0,telemetry:{elapsedTicks:0,defeatedEnemies:0,dodges:0,guardedHits:0,justGuards:0,passiveGuards:0,decisiveSkills:0,buildsUsed:[]}}),N2=(t,e)=>({...t,selectedIntent:e,beat:t.beat==="choose-intent"?"departure":t.beat,audioScene:t.audioScene==="silent"?"exploration":t.audioScene}),H2=t=>({...t,redirectedAtTower:!0}),_2=(t,e)=>({...t,surveyedSites:Mt(t.surveyedSites,e)}),G2=t=>({...t,returnComplete:!0,beat:Pd(t.commitment),audioScene:"return"}),X2=(t,e)=>{if(t.selectedIntent===null)return t;const a=e.causal.ledger.entries[0],r=a?.commitment??null,s=a?.resolution??e.causal.material?.resolution??null,i=t.returnComplete||e.events.some(p=>p.type==="result-reached"),n=j2(t.beat,e.world,e.causal,r,i),o=$1(e.world.player.x,e.world.player.y),A=W2(t.activatedWaves,e.world,r,n),l=Mt(t.telemetry.buildsUsed,e.buildcraft.equippedBuildId),c=La(e.events,"passive-guard-resolved"),d=La(e.events,"guard-resolved"),u=La(e.events,"enemy-attack-telegraphed"),h=c>0?96:Math.max(0,t.passiveGuardCooldownTicks-1),g=c>0?0:Math.min(100,t.passiveGuardMeter+.16+u*16+d*18);return{...t,beat:n,region:o,activatedWaves:A,returnComplete:i,commitment:r,resolution:s,audioScene:V2(e.world,n),passiveGuardMeter:g,passiveGuardCooldownTicks:h,telemetry:{elapsedTicks:Math.max(t.telemetry.elapsedTicks,e.world.tick),defeatedEnemies:t.telemetry.defeatedEnemies+La(e.events,"enemy-defeated"),dodges:t.telemetry.dodges+La(e.events,"dodge-started"),guardedHits:t.telemetry.guardedHits+La(e.events,"guard-resolved"),justGuards:t.telemetry.justGuards+e.events.filter(p=>p.type==="guard-resolved"&&p.justGuard).length,passiveGuards:t.telemetry.passiveGuards+c,decisiveSkills:t.telemetry.decisiveSkills+La(e.events,"relic-activated"),buildsUsed:l}}},q2=t=>!t.returnComplete||t.selectedIntent===null?null:{runOrdinal:t.runOrdinal,selectedIntent:t.selectedIntent,durationTicks:t.telemetry.elapsedTicks,commitment:t.commitment,resolution:t.resolution,redirectedAtTower:t.redirectedAtTower,buildsUsed:t.telemetry.buildsUsed,defeatedEnemies:t.telemetry.defeatedEnemies,decisiveSkills:t.telemetry.decisiveSkills},kl=t=>{const e=Math.floor(Math.max(0,t)/U2),a=Math.floor(e/60),r=e%60;return`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}`},Tl=t=>{switch(t.beat){case"choose-intent":return"帰還地で今回の目的を選ぶ";case"departure":return`${Y2(t.selectedIntent)}。依頼板から旧線路へ出る`;case"old-rail":return t.selectedIntent==="rail-passage"?"旧線路の分岐と退路を読み、戦う場所を自分で選ぶ":"旧線路で間合いと回避を使い、第一buildを試す";case"basin":return t.selectedIntent==="water-safety"?"河岸と越流路の水位差を読み、二つの活動痕を照合する":t.selectedIntent==="field-build"?"盆地のrole差を試し、buildへ転用できる機能を見極める":"盆地の二つの活動痕を読み、倒すか距離を切る";case"control-tower":return t.redirectedAtTower?"迂回が成立。出所付き蓄相器を回収し、用途を一つ選ぶ":"雨水制御塔で追跡を逸らすか、戦い抜いて素材を得る";case"ruin":return"build固有resourceを満たし、反響防壁へ大技を通す";case"return":return"旧線路を戻り、選択の結果を帰還地で確かめる";case"warm-return":return"限定水試験、温かい一皿、小さな集まりを確かめる";case"field-return":return"残ったbuild強化と、成立しなかった地域側の差を確かめる";case"unresolved-return":return"因果を決めずに戻った記録と、次に残した可能性を確かめる"}},Y2=t=>{switch(t){case"water-safety":return"今回の主眼は水の状態と共同口へ戻せる範囲";case"field-build":return"今回の主眼は機能素材とbuildへの転用可能性";case"rail-passage":return"今回の主眼は経路、退路、危険の偏り";case null:return"今回の目的を選ぶ"}},j2=(t,e,a,r,s)=>s?Pd(r):t==="return"||r!==null&&e.player.x>=2720||e.quest.phase==="return-town"?"return":e.quest.phase==="confrontation"?"ruin":a.phase==="coupling-observed"||a.phase==="material-offered"||a.phase==="committed"||a.phase==="left-unresolved"?"control-tower":e.player.x>=1500?"basin":e.player.x>=760?"old-rail":t==="choose-intent"?"departure":t,Pd=t=>t==="region-first"?"warm-return":t==="field-first"?"field-return":"unresolved-return",W2=(t,e,a,r)=>{let s=t;return e.player.x>=760&&(s=Mt(s,"old-rail")),e.player.x>=880&&e.player.y>=1080&&(s=Mt(s,"old-rail-switch")),e.player.x>=1500&&(s=Mt(s,"basin-bank")),e.player.x>=1420&&e.player.x<=2300&&e.player.y>=1180&&(s=Mt(s,"basin-overflow")),r==="control-tower"&&e.player.x>=1950&&Math.hypot(e.player.x-2040,e.player.y-1025)<=420&&(s=Mt(s,"tower-perimeter")),e.player.x>=2360&&(s=Mt(s,"ruin-approach")),e.player.x>=2340&&e.player.y>=1180&&(s=Mt(s,"tunnel-flank")),e.player.x>=2760&&(s=Mt(s,"ruin-interior")),(e.quest.phase==="return-town"||r==="return")&&a===null&&(s=Mt(s,"return-pressure"),s=Mt(s,"return-pressure-b")),s},V2=(t,e)=>e==="return"||e==="warm-return"||e==="field-return"||e==="unresolved-return"?"return":t.enemies.some(r=>r.active&&!r.defeated&&r.disposition==="hostile"&&Math.hypot(r.x-t.player.x,r.y-t.player.y)<=520)?"combat":"exploration",La=(t,e)=>t.filter(a=>a.type===e).length,Mt=(t,e)=>t.includes(e)?t:[...t,e],K2=320,J2=70,Z2=(t,e,a=null)=>e.pendingOffer!==null||t.status!=="playing"?null:t.world.loot.filter(r=>!r.picked&&(r.lootId!=="relay-capacitor"||a?.evidence.machineObserved===!0&&a.evidence.organismObserved===!0)&&Math.hypot(r.x-t.player.x,r.y-t.player.y)<=t.player.radius+r.radius+J2).sort((r,s)=>zl(t,r)-zl(t,s)||r.id.localeCompare(s.id))[0]??null,$2=t=>t.enemies.some(e=>e.active&&!e.defeated&&e.disposition==="hostile"&&Math.hypot(e.x-t.player.x,e.y-t.player.y)<=K2),Rl=(t,e)=>{if(e)return{result:"reject",reason:"choose-response",prompt:"応答を選ぶ — 破壊／鎮静／接続",announcement:"反響体への応答を三つから選んでください。Eだけでは応答を決定しません。"};if(t.quest.phase==="confrontation"&&t.quest.intent==="connect"){const a=t.enemies.find(r=>r.id===ht);return a!==void 0&&ci(t.player,a)?{result:"allow",prompt:"E 接続する — 反響体"}:{result:"reject",reason:"approach-reflective-entity",prompt:"反響体へ近づく — 接続圏外",announcement:"接続手順は選択済みです。反響体へ近づき、表示が「E 接続する」に変わってから調査してください。"}}return{result:"reject",reason:"no-target",prompt:"調査対象なし",announcement:"付近に調査できる対象はありません。"}},zl=(t,e)=>Math.hypot(e.x-t.player.x,e.y-t.player.y),Ed="fram-first-stage-mvp:first-r01:save:v1",e8=t=>`${Ed}:comparison:${t}`;class Cd{values=new Map;getItem(e){return this.values.get(e)??null}setItem(e,a){this.values.set(e,a)}removeItem(e){this.values.delete(e)}}class t8{constructor(e,a=new Cd){this.primary=e,this.fallback=a,this.primaryAvailable=e!==null}primary;fallback;primaryAvailable;get persistence(){return this.primaryAvailable?"local":"memory"}getItem(e){if(this.primaryAvailable&&this.primary!==null)try{return this.primary.getItem(e)}catch{this.primaryAvailable=!1}return this.fallback.getItem(e)}setItem(e,a){if(this.primaryAvailable&&this.primary!==null)try{this.primary.setItem(e,a);return}catch{this.primaryAvailable=!1}this.fallback.setItem(e,a)}removeItem(e){if(this.primaryAvailable&&this.primary!==null)try{this.primary.removeItem(e);return}catch{this.primaryAvailable=!1}this.fallback.removeItem(e)}}class a8{constructor(e,a=Ed){this.storage=e,this.storageKey=a}storage;storageKey;load(){const e=this.storage.getItem(this.storageKey);if(e===null)return tn();try{const a=JSON.parse(e);return r8(a)?a:tn()}catch{return tn()}}saveDraftIntent(e){const a={...this.load(),draftIntent:e};return this.persist(a),a}completeRun(e){const a=this.load();if(a.completedRuns.some(i=>i.runOrdinal===e.runOrdinal))return a;const s={...a,draftIntent:null,completedRuns:[...a.completedRuns,e].slice(-6)};return this.persist(s),s}clear(){this.storage.removeItem(this.storageKey)}persist(e){this.storage.setItem(this.storageKey,JSON.stringify(e))}}const tn=()=>({schema:"fram.first-stage-mvp.first-r01.save",version:1,draftIntent:null,completedRuns:[]}),r8=t=>{if(typeof t!="object"||t===null)return!1;const e=t;return e.schema==="fram.first-stage-mvp.first-r01.save"&&e.version===1&&(e.draftIntent===null||Md(e.draftIntent))&&Array.isArray(e.completedRuns)&&e.completedRuns.length<=6&&e.completedRuns.every(s8)},s8=t=>{if(typeof t!="object"||t===null)return!1;const e=t;return typeof e.runOrdinal=="number"&&e.runOrdinal>=1&&Md(e.selectedIntent)&&typeof e.durationTicks=="number"&&e.durationTicks>=0&&(e.commitment===null||e.commitment==="field-first"||e.commitment==="region-first")&&(e.resolution===null||e.resolution==="fight-through"||e.resolution==="break-or-redirect")&&typeof e.redirectedAtTower=="boolean"&&Array.isArray(e.buildsUsed)&&e.buildsUsed.every(a=>a==="counter-cutter"||a==="breach-driver")&&typeof e.defeatedEnemies=="number"&&typeof e.decisiveSkills=="number"},Md=t=>t==="water-safety"||t==="field-build"||t==="rail-passage",i8=Object.freeze({source:{evidencePath:"work/r11_hybrid_world_quality_2026-08-20/evidence/ui/action-controls-hybrid-concept-v5.png",sha256:"5786ecdffd68a76515ba6bb6b1df6d5c40fa3d2b7279e54b759fedc980f9b3da",generator:"OpenAI ImageGen",role:"selected restrained instrument-panel tone and four conventional action glyphs"},item:{path:"assets/first-stage-mvp/r11-hybrid/ui/action-item.png",sha256:"0dcd9f8628bb1df02c8c85f203a9e2251e74e2251f0a85dd94a2802387700b29",role:"conventional field-item bottle without an auxiliary side badge"},guard:{path:"assets/first-stage-mvp/r11-hybrid/ui/action-guard.png",sha256:"5cf1a4321cb0f84cc345149c2fb6fe0cf85947592774ea16f041ab61488ded57"},dodge:{path:"assets/first-stage-mvp/r11-hybrid/ui/action-dodge.png",sha256:"c5560ad015adc6e46c33e53a44015f157d1a087657bf040b00dad4c3fbd6df6a"},interact:{path:"assets/first-stage-mvp/r11-hybrid/ui/action-interact.png",sha256:"59aaec5ee376e37be6eac0703e3c65190dedd88557dfc3052f69a8083689731a"},relic:{path:"assets/first-stage-mvp/r11-hybrid/ui/action-relic.png",sha256:"fcb0c9c53c815ebc4f8c5258b4bab291677cf0684d3381e761934c6c75354fd5",generator:"OpenAI ImageGen",role:"selected ground-rupture technique with one descending impact and lifted slabs"}}),vt=t=>{const e=i8[t];return`/game/${e.path}?v=${e.sha256.slice(0,12)}`},n8=`
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-panel: rgb(6 24 20 / 78%);
  --mvp-panel-soft: rgb(7 28 23 / 58%);
  --mvp-panel-faint: rgb(8 30 25 / 34%);
  --mvp-line: rgb(165 221 204 / 26%);
  --mvp-line-strong: rgb(130 243 210 / 58%);
  --mvp-signal: #82f3d2;
  --mvp-amber: #e0ae68;
  --mvp-paper: #eaf0df;
  --mvp-dim: rgb(225 239 224 / 66%);
}

.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
  > .product-shell-quality-badge {
  display: none;
}

.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
  > .product-shell-return {
  min-width: 104px;
  padding: 8px 12px;
  opacity: .78;
}

.north-star-stage[data-first-stage-mvp="r01"] .r09-memory-ledger {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-title {
  background:
    linear-gradient(90deg, rgb(4 15 13 / 96%), rgb(7 28 23 / 70%) 52%, rgb(3 12 10 / 92%)),
    radial-gradient(circle at 72% 28%, rgb(95 173 151 / 22%), transparent 42%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-title__copy {
  width: min(68cqw, 780px);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-title h1 {
  font-size: clamp(28px, 8.5cqh, 68px);
  line-height: .92;
}

.first-stage-mvp-intents {
  position: absolute;
  z-index: 82;
  inset: 0;
  display: grid;
  align-content: center;
  width: auto;
  margin: 0;
  padding: clamp(56px, 10cqh, 92px) clamp(42px, 8cqw, 110px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  background:
    linear-gradient(90deg, rgb(4 15 13 / 93%) 0 26%, rgb(5 21 18 / 68%) 48%, rgb(3 14 12 / 38%) 70%, rgb(3 12 10 / 72%) 100%),
    radial-gradient(circle at 68% 34%, rgb(116 205 176 / 9%), transparent 48%);
  box-shadow:
    inset 0 0 0 1px rgb(170 225 208 / 9%),
    inset 0 -18cqh 22cqh rgb(2 10 8 / 32%);
  backdrop-filter: saturate(1.18) contrast(1.06);
  pointer-events: auto;
}

.first-stage-mvp-intents[aria-hidden="true"] {
  display: none;
}

.first-stage-mvp-intents__intro {
  grid-column: 1 / -1;
  max-width: 780px;
  margin-bottom: clamp(8px, 2cqh, 16px);
}

.first-stage-mvp-intents__intro span {
  color: #dca968;
  font: 700 clamp(10px, 1.65cqh, 12px)/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .18em;
}

.first-stage-mvp-intents__intro h2 {
  margin: 10px 0;
  color: #eef1e8;
  font: 800 clamp(34px, 9.5cqh, 72px)/.88 "Hiragino Mincho ProN", "Yu Mincho", serif;
  letter-spacing: .06em;
}

.first-stage-mvp-intents__intro h2 em {
  color: #82f3d2;
  font-style: normal;
}

.first-stage-mvp-intents__intro p {
  margin: 0;
  color: rgb(231 239 222 / 68%);
  font-size: clamp(10px, 1.65cqh, 13px);
  letter-spacing: .05em;
  line-height: 1.65;
}

.first-stage-mvp-intents > button {
  display: grid;
  min-width: 0;
  gap: 5px;
  min-height: 68px;
  padding: 11px 13px;
  border: 1px solid rgb(225 241 221 / 22%);
  background: rgb(5 24 20 / 68%);
  color: rgb(235 239 211 / 76%);
  cursor: pointer;
  text-align: left;
}

.first-stage-mvp-intents > button:hover,
.first-stage-mvp-intents > button:focus-visible,
.first-stage-mvp-intents > button[aria-pressed="true"] {
  border-color: rgb(130 243 210 / 78%);
  background: rgb(17 61 50 / 82%);
  color: #efffe9;
}

.first-stage-mvp-intents strong {
  font-size: clamp(11px, 1.8cqh, 14px);
  letter-spacing: .05em;
}

.first-stage-mvp-intents small {
  color: rgb(223 235 213 / 56%);
  font-size: clamp(9px, 1.4cqh, 11px);
  line-height: 1.45;
}

.first-stage-mvp-intents__history {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: rgb(223 235 213 / 58%);
  font-size: 10px;
  letter-spacing: .06em;
}

.first-stage-mvp-intents__history button {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid rgb(225 241 221 / 18%);
  background: transparent;
  color: rgb(223 235 213 / 62%);
  font-size: 9px;
  pointer-events: auto;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status {
  top: clamp(62px, 9cqh, 76px);
  width: clamp(218px, 20cqw, 258px);
  gap: 4px;
  padding: 8px 9px;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status > small,
.north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress > small {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__head span,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__resource span,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__salvage span,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status > small {
  color: rgb(231 241 222 / 72%);
  font-size: 9px;
  line-height: 1.3;
  letter-spacing: .1em;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__head b {
  font-size: 9px;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__resource b,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__salvage b {
  font-size: 10px;
}

.first-stage-mvp-progress {
  position: absolute;
  z-index: 14;
  top: clamp(150px, 22cqh, 182px);
  left: clamp(12px, 1.5cqw, 22px);
  display: grid;
  width: clamp(228px, 20cqw, 276px);
  gap: 5px;
  padding: 8px 9px;
  border: 1px solid rgb(225 241 221 / 15%);
  background: linear-gradient(125deg, rgb(5 20 17 / 88%), rgb(5 20 17 / 58%));
  box-shadow: 0 12px 34px rgb(1 9 7 / 22%);
  backdrop-filter: blur(7px) saturate(1.08);
  pointer-events: none;
}

.first-stage-mvp-progress__head,
.first-stage-mvp-progress__proof {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
}

.first-stage-mvp-progress__head span,
.first-stage-mvp-progress__proof span,
.first-stage-mvp-progress > small {
  color: rgb(231 241 222 / 72%);
  font: 700 9px/1.4 "Avenir Next Condensed", sans-serif;
  letter-spacing: .075em;
}

.first-stage-mvp-progress__head span > i {
  font-style: normal;
}

.first-stage-mvp-progress__head b {
  color: #82f3d2;
  font: 700 10px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .08em;
}

.first-stage-mvp-progress__head button {
  display: none;
  min-width: 48px;
  min-height: 32px;
  padding: 4px 7px;
  border: 1px solid rgb(130 243 210 / 34%);
  background: rgb(13 50 42 / 82%);
  color: #dff9e9;
  font: 700 9px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .08em;
  pointer-events: auto;
}

.first-stage-mvp-progress__meter {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
}

.first-stage-mvp-progress__meter i {
  height: 4px;
  overflow: hidden;
  border-radius: 2px;
  background: rgb(223 235 213 / 12%);
}

.first-stage-mvp-progress__meter i.is-past {
  background: linear-gradient(90deg, #2d9f8d, #82f3d2);
  box-shadow: 0 0 8px rgb(130 243 210 / 32%);
}

.first-stage-mvp-progress__passive {
  display: grid;
  gap: 4px;
  padding: 6px 7px;
  border: 1px solid rgb(156 205 192 / 20%);
  background:
    linear-gradient(90deg, rgb(20 62 53 / 54%), rgb(6 24 21 / 42%));
  box-shadow: inset 3px 0 0 rgb(83 166 148 / 32%);
}

.first-stage-mvp-progress__passive span {
  color: rgb(218 235 226 / 78%);
  font: 700 9px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .085em;
}

.first-stage-mvp-progress__passive > i {
  display: block;
  height: 4px;
  overflow: hidden;
  border-radius: 2px;
  background: rgb(215 235 225 / 13%);
  box-shadow: inset 0 0 0 1px rgb(213 239 227 / 6%);
}

.first-stage-mvp-progress__passive > i > em {
  display: block;
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #388d82, #7ce0ca 70%, #e8f7d1);
  box-shadow: 0 0 10px rgb(124 224 202 / 42%);
  transition: width 160ms ease-out;
}

.first-stage-mvp-progress__passive:has(span[data-ready="true"]) {
  border-color: rgb(255 213 119 / 54%);
  background:
    linear-gradient(90deg, rgb(72 63 32 / 66%), rgb(11 38 32 / 54%));
  box-shadow:
    inset 3px 0 0 #ffd577,
    0 0 16px rgb(255 213 119 / 12%);
}

.first-stage-mvp-progress__passive span[data-ready="true"] {
  color: #fff0b2;
  text-shadow: 0 0 10px rgb(255 213 119 / 34%);
}

.first-stage-mvp-progress__passive span[data-ready="true"] + i > em {
  background: linear-gradient(90deg, #58b8a5, #d9edaa 62%, #ffd577);
  box-shadow: 0 0 12px rgb(255 213 119 / 56%);
  animation: first-stage-mvp-ready-glow 1.35s ease-in-out infinite;
}

.first-stage-mvp-progress__visual {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px 7px;
  align-items: center;
  padding: 5px 6px;
  border: 1px solid rgb(186 216 205 / 15%);
  background: rgb(7 22 19 / 56%);
  pointer-events: auto;
}

.first-stage-mvp-progress__visual label {
  display: grid;
  grid-template-columns: auto minmax(48px, 1fr) 28px;
  gap: 5px;
  align-items: center;
  min-width: 0;
}

.first-stage-mvp-progress__visual span,
.first-stage-mvp-progress__visual output,
.first-stage-mvp-progress__visual small,
.first-stage-mvp-progress__visual button {
  color: rgb(219 235 226 / 74%);
  font: 700 8px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .075em;
}

.first-stage-mvp-progress__music {
  display: grid;
  min-height: 24px;
  padding: 4px 6px;
  border: 1px solid rgb(130 243 210 / 24%);
  background: rgb(17 55 47 / 72%);
  place-items: center;
  cursor: pointer;
}

.first-stage-mvp-progress__music[data-playback="playing"] {
  border-color: rgb(130 243 210 / 52%);
  color: #dfffee;
  box-shadow: inset 3px 0 0 #82f3d2;
}

.first-stage-mvp-progress__music[data-playback="blocked"] {
  border-color: rgb(255 213 119 / 68%);
  color: #fff0b2;
  box-shadow: 0 0 16px rgb(255 213 119 / 12%);
}

.first-stage-mvp-loading {
  position: absolute;
  z-index: 13;
  top: clamp(78px, 11cqh, 96px);
  left: 50%;
  display: grid;
  width: min(330px, 42cqw);
  gap: 4px;
  padding: 7px 10px;
  border: 1px solid rgb(130 243 210 / 22%);
  background: rgb(5 20 17 / 78%);
  box-shadow: 0 8px 26px rgb(1 9 7 / 18%);
  color: rgb(231 241 222 / 72%);
  opacity: 1;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 240ms ease;
}

.first-stage-mvp-loading > span {
  color: rgb(220 167 104 / 72%);
  font: 700 7px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .16em;
}

.first-stage-mvp-loading > strong {
  overflow: hidden;
  font: 700 10px/1.25 "Hiragino Sans", sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.first-stage-mvp-loading > i {
  display: block;
  height: 3px;
  overflow: hidden;
  background: rgb(215 235 225 / 13%);
}

.first-stage-mvp-loading > i > em {
  display: block;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, #388d82, #82f3d2);
  transition: width 220ms ease;
}

.first-stage-mvp-loading[data-phase="ready"] {
  opacity: .38;
}

.first-stage-mvp-progress__visual input[type="range"] {
  width: 100%;
  height: 14px;
  margin: 0;
  accent-color: #82f3d2;
  cursor: ew-resize;
}

.first-stage-mvp-progress__visual output {
  color: #b7e9dc;
  text-align: right;
}

.first-stage-mvp-progress__visual button {
  min-height: 24px;
  padding: 4px 6px;
  border: 1px solid rgb(130 243 210 / 24%);
  background: rgb(17 55 47 / 72%);
  cursor: pointer;
}

.first-stage-mvp-progress__visual button:hover,
.first-stage-mvp-progress__visual button:focus-visible {
  border-color: rgb(130 243 210 / 66%);
  color: #effff2;
}

.first-stage-mvp-progress__visual > small {
  grid-column: 1 / -1;
  color: rgb(220 167 104 / 66%);
  font-size: 7px;
}

.first-stage-mvp-progress__interaction {
  display: flex;
  min-height: 28px;
  align-items: center;
  padding: 6px 8px;
  border-left: 3px solid rgb(223 235 213 / 28%);
  background: rgb(4 17 14 / 62%);
  color: rgb(230 240 222 / 76%);
  font: 700 10px/1.4 "Avenir Next Condensed", sans-serif;
  letter-spacing: .045em;
}

.first-stage-mvp-progress__interaction[data-state="action"],
.first-stage-mvp-progress__interaction[data-state="allow"] {
  border-left-color: #82f3d2;
  color: #eaffdf;
  box-shadow: inset 10px 0 18px rgb(130 243 210 / 9%);
  text-shadow: 0 0 12px rgb(130 243 210 / 20%);
}

.first-stage-mvp-progress__interaction[data-state="reject"] {
  border-left-color: #dca968;
  color: #f2d8ac;
}

.first-stage-mvp-progress__redirect {
  display: none;
  min-height: 44px;
  padding: 9px 10px;
  border: 1px solid rgb(130 243 210 / 46%);
  background: rgb(13 54 44 / 82%);
  color: #eaffdf;
  pointer-events: auto;
  text-align: left;
}

.first-stage-mvp-progress__redirect.is-visible {
  display: grid;
}

.first-stage-mvp-progress__redirect strong {
  font-size: 10px;
  letter-spacing: .06em;
}

.first-stage-mvp-progress__redirect small {
  color: rgb(223 235 213 / 58%);
  font-size: 9px;
  line-height: 1.35;
}

.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
  width: clamp(116px, 17cqw, 168px);
  border-color: rgb(189 255 232 / 30%);
  background: linear-gradient(180deg, rgb(6 23 19 / 88%), rgb(6 23 19 / 58%));
}

.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout > strong {
  font-size: 10px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target {
  width: clamp(190px, 28cqw, 280px);
  padding: 6px 9px 8px;
  border: 1px solid rgb(244 169 80 / 24%);
  background: linear-gradient(180deg, rgb(18 23 20 / 82%), rgb(18 23 20 / 54%));
  box-shadow: 0 8px 22px rgb(0 0 0 / 18%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target span {
  font-size: 10px;
  text-shadow: 0 1px 7px rgb(0 0 0 / 72%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target > i {
  height: 4px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target[data-enemy-rank="elite"] {
  border-color: rgb(255 211 107 / 58%);
  box-shadow: 0 0 26px rgb(255 185 68 / 13%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target[data-enemy-rank="boss"] {
  border-color: rgb(216 145 255 / 66%);
  background: linear-gradient(180deg, rgb(46 24 52 / 88%), rgb(18 23 20 / 58%));
  box-shadow: 0 0 34px rgb(203 116 255 / 17%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-toast {
  min-height: 36px;
  padding: 9px 14px;
  border: 1px solid rgb(130 243 210 / 34%);
  border-left-width: 3px;
  background: rgb(7 30 25 / 90%);
  box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
  font-size: 11px;
  line-height: 1.4;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-context {
  min-height: 40px;
  border-color: rgb(130 243 210 / 72%);
  background: rgb(7 31 26 / 88%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-context strong {
  font-size: 11px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action small {
  margin-top: 3px;
  color: rgb(231 241 222 / 72%);
  font-size: 9px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
  min-width: 50px;
  min-height: 50px;
  border-color: rgb(130 243 210 / 62%);
  background:
    radial-gradient(circle at 50% 45%, rgb(130 243 210 / 14%), transparent 58%),
    rgb(18 53 46 / 78%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard span,
.north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact span {
  font-size: 10px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
  width: max(48px, 7.4cqh);
  height: max(48px, 7.4cqh);
  border-color: rgb(255 213 119 / 70%);
  background:
    radial-gradient(circle at 50% 42%, rgb(255 213 119 / 16%), transparent 58%),
    rgb(42 48 31 / 82%);
  color: #fff0b2;
  opacity: 1;
}

.north-star-stage[data-first-stage-mvp="r01"]
  .relic-action.is-first-stage-pressed {
  border-color: #fff0b2;
  background:
    radial-gradient(circle at center, rgb(255 236 166 / 32%), transparent 58%),
    rgb(18 65 55 / 92%);
  box-shadow:
    inset 0 0 0 4px rgb(8 25 21 / 48%),
    0 0 0 4px rgb(130 243 210 / 18%),
    0 0 28px rgb(255 213 119 / 28%);
  transform: scale(.88);
}

.north-star-stage[data-first-stage-mvp="r01"]:has(
  .first-stage-mvp-progress__passive span[data-ready="true"]
) .relic-action--guard {
  border-color: #ffd577;
  box-shadow:
    inset 0 0 0 4px rgb(15 29 25 / 42%),
    0 0 22px rgb(255 213 119 / 30%);
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-causal-pulse .relic-screen-fx {
  background: radial-gradient(circle at center, rgb(130 243 210 / 20%), transparent 46%);
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-hit-pulse .relic-screen-fx {
  background: radial-gradient(circle at center, transparent 48%, rgb(238 92 67 / 23%) 100%);
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-contact-pulse .relic-screen-fx::before {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 52%, rgb(255 244 205 / 24%) 0 4%, rgb(115 244 222 / 18%) 7%, transparent 31%),
    radial-gradient(ellipse at center, transparent 64%, rgb(255 205 105 / 10%));
  mix-blend-mode: screen;
  animation: first-stage-mvp-contact-screen 120ms ease-out both;
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-guard-pulse .relic-screen-fx::after,
.north-star-stage[data-first-stage-mvp="r01"].mvp-defeat-pulse .relic-screen-fx::after,
.north-star-stage[data-first-stage-mvp="r01"].mvp-survey-pulse .relic-screen-fx::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-guard-pulse .relic-screen-fx::after {
  background:
    radial-gradient(circle at 50% 48%, transparent 24%, rgb(130 243 210 / 34%) 26%, transparent 48%),
    radial-gradient(ellipse at center, transparent 62%, rgb(130 243 210 / 20%));
  animation: first-stage-mvp-guard-screen 180ms ease-out both;
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-defeat-pulse .relic-screen-fx::after {
  background:
    radial-gradient(circle at 50% 47%, rgb(255 244 197 / 22%) 0 5%, rgb(255 185 85 / 28%) 7%, transparent 34%),
    radial-gradient(ellipse at center, transparent 56%, rgb(255 185 85 / 15%));
  animation: first-stage-mvp-defeat-screen 180ms ease-out both;
}

.north-star-stage[data-first-stage-mvp="r01"].mvp-survey-pulse .relic-screen-fx::after {
  background:
    linear-gradient(180deg, transparent 0 38%, rgb(130 243 210 / 24%) 45%, transparent 52%),
    radial-gradient(ellipse at center, transparent 52%, rgb(130 243 210 / 16%));
  background-size: 100% 180%, 100% 100%;
  animation: first-stage-mvp-survey-screen 180ms ease-out both;
}

@keyframes first-stage-mvp-ready-glow {
  0%, 100% { filter: brightness(.94); }
  50% { filter: brightness(1.28); }
}

@keyframes first-stage-mvp-contact-screen {
  0% { opacity: 0; transform: scale(.88); }
  24% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.04); }
}

@keyframes first-stage-mvp-guard-screen {
  0% { opacity: 0; transform: scale(.92); }
  38% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.04); }
}

@keyframes first-stage-mvp-defeat-screen {
  0% { opacity: 0; transform: scale(.72); }
  28% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.08); }
}

@keyframes first-stage-mvp-survey-screen {
  0% { opacity: 0; background-position: 0 -40%, 0 0; }
  36% { opacity: 1; }
  100% { opacity: 0; background-position: 0 80%, 0 0; }
}

@media (max-height: 500px) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-title__copy p {
    margin-block: 4px;
  }

  .first-stage-mvp-intents {
    padding: 44px 46px 34px;
  }

  .first-stage-mvp-intents__intro {
    margin-bottom: 5px;
  }

  .first-stage-mvp-intents__intro h2 {
    margin-block: 5px;
    font-size: clamp(25px, 9cqh, 38px);
  }

  .first-stage-mvp-intents__intro p {
    display: none;
  }

  .first-stage-mvp-intents > button {
    min-height: 58px;
    padding: 8px 10px;
  }

  .first-stage-mvp-intents__intro p,
  .first-stage-mvp-progress > small {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status {
    top: max(70px, calc(env(safe-area-inset-top) + 8px));
    width: clamp(222px, 29cqw, 246px);
    gap: 3px;
    padding: 7px 9px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__head span,
  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__resource span,
  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__salvage span,
  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status > small {
    line-height: 1.2;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__resource {
    gap: 3px;
    margin-top: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status__salvage {
    padding-top: 4px;
  }

  .first-stage-mvp-progress {
    gap: 3px;
    padding-top: 4px;
  }

  .first-stage-mvp-progress__head span,
  .first-stage-mvp-progress__proof span {
    font-size: 9px;
    line-height: 1.25;
    letter-spacing: .035em;
  }

  .first-stage-mvp-progress__proof {
    display: block;
  }

  .first-stage-mvp-progress__proof span {
    display: block;
  }

  .first-stage-mvp-progress__passive {
    gap: 3px;
    padding: 3px 5px;
  }

  .first-stage-mvp-progress__passive > i {
    height: 3px;
  }

  .first-stage-mvp-progress__visual {
    padding: 3px 5px;
  }

  .first-stage-mvp-progress__visual > small {
    display: none;
  }

  .first-stage-mvp-progress__interaction {
    min-height: 22px;
    padding: 3px 6px;
    font-size: 10px;
    line-height: 1.25;
  }

  .first-stage-mvp-progress__redirect {
    min-height: 42px;
    padding: 7px 8px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
    width: 52px;
    height: 52px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
    width: 48px;
    height: 48px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: clamp(160px, 21cqw, 184px);
  }
}

@media (max-width: 720px) and (orientation: landscape) {
  .first-stage-mvp-intents {
    padding-inline: 42px;
  }
}

@media (max-width: 430px) and (orientation: portrait) {
  .first-stage-mvp-intents {
    align-content: start;
    grid-template-columns: 1fr;
    gap: 8px;
    padding: max(72px, env(safe-area-inset-top)) 18px 24px;
    overflow-y: auto;
  }

  .first-stage-mvp-intents__intro,
  .first-stage-mvp-intents__history {
    grid-column: 1;
  }

  .first-stage-mvp-intents > button {
    min-height: 58px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-return {
    top: max(6px, env(safe-area-inset-top));
    left: max(6px, env(safe-area-inset-left));
    min-width: 48px;
    min-height: 38px;
    padding: 5px 7px;
  }

  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-return strong {
    display: none;
  }

  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-camera-zoom {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    min-height: 44px;
    padding: 6px 8px;
    grid-template-columns: minmax(0, 1fr) auto;
    border-bottom-color: rgb(225 241 221 / 10%);
    background: linear-gradient(180deg, rgb(10 26 22 / 72%), transparent);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    min-width: 0;
    padding: 0 8px 0 58px;
    border: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission > span {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
    margin-top: 8px;
    font-size: 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    align-items: center;
    gap: 5px;
    padding: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-health {
    width: 100px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-health > span,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-health > b {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-health__track {
    height: 5px;
    margin: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
    width: 38px;
    height: 38px;
    padding: 0;
    font-size: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-audio span {
    font-size: 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-navigation,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-loadout,
  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status,
  .north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-waypoint {
    display: none;
  }

  .first-stage-mvp-progress {
    top: max(50px, calc(env(safe-area-inset-top) + 46px));
    left: max(8px, env(safe-area-inset-left));
    width: min(198px, 23.5cqw);
    gap: 2px;
    padding: 4px 5px;
    border-color: rgb(155 220 204 / 26%);
    border-radius: 2px 12px 12px 2px;
    background:
      linear-gradient(100deg, rgb(5 20 17 / 88%), rgb(8 31 26 / 64%) 72%, rgb(5 20 17 / 32%));
    box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
    backdrop-filter: blur(12px) saturate(1.18);
  }

  .first-stage-mvp-progress__head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 4px;
  }

  .first-stage-mvp-progress__head span > i {
    display: none;
  }

  .first-stage-mvp-progress__head span,
  .first-stage-mvp-progress__head b {
    overflow: hidden;
    font-size: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .first-stage-mvp-progress__head button {
    display: block;
    min-width: 38px;
    min-height: 26px;
    padding: 3px 5px;
  }

  .first-stage-mvp-progress__meter i {
    height: 3px;
  }

  .first-stage-mvp-progress__proof,
  .first-stage-mvp-progress__visual,
  .first-stage-mvp-progress > small {
    display: none;
  }

  .first-stage-mvp-progress__passive {
    grid-template-columns: auto minmax(36px, 1fr);
    align-items: center;
    gap: 5px;
    padding: 3px 5px;
  }

  .first-stage-mvp-progress__passive span {
    max-width: 88px;
    overflow: hidden;
    font-size: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .first-stage-mvp-progress__passive > i {
    width: 100%;
  }

  .first-stage-mvp-progress__interaction {
    min-height: 28px;
    max-height: 32px;
    overflow: hidden;
    padding: 4px 6px;
    font-size: 9px;
  }

  .first-stage-mvp-progress__interaction[data-state="idle"] {
    display: none;
  }

  .first-stage-mvp-progress[data-hud-expanded="true"] {
    width: min(260px, 31cqw);
    max-height: calc(100% - 60px);
    overflow-y: auto;
    background: rgb(5 20 17 / 92%);
    pointer-events: auto;
  }

  .first-stage-mvp-progress[data-hud-expanded="true"]
    .first-stage-mvp-progress__proof,
  .first-stage-mvp-progress[data-hud-expanded="true"]
    .first-stage-mvp-progress__visual,
  .first-stage-mvp-progress[data-hud-expanded="true"] > small {
    display: flex;
  }

  .first-stage-mvp-progress[data-hud-expanded="true"]
    .first-stage-mvp-progress__visual {
    display: grid;
  }

  .first-stage-mvp-progress__redirect.is-visible {
    position: fixed;
    right: 220px;
    bottom: 10px;
    left: 220px;
    min-height: 48px;
  }

  .first-stage-mvp-loading {
    top: 50px;
    width: min(200px, 24cqw);
    padding: 5px 8px;
  }

  .first-stage-mvp-loading.is-departure {
    top: 50%;
    width: min(330px, 62cqw);
    padding: 14px 16px;
    border-color: rgb(130 243 210 / 54%);
    background: rgb(4 18 15 / 92%);
    box-shadow: 0 20px 60px rgb(0 0 0 / 48%);
    opacity: 1;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(18px) saturate(1.18);
  }

  .first-stage-mvp-loading.is-departure > span {
    display: block;
  }

  .first-stage-mvp-loading > span {
    display: none;
  }

  .first-stage-mvp-loading > strong {
    font-size: 8px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-target {
    top: 52px;
    width: 190px;
    padding: 4px 7px 5px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-controls {
    height: 180px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    --joystick-size: 104px;
    bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
    left: max(20px, calc(env(safe-area-inset-left) + 12px));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: max(18px, calc(env(safe-area-inset-right) + 12px));
    bottom: max(10px, calc(env(safe-area-inset-bottom) + 6px));
    display: block;
    width: 188px;
    height: 164px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action {
    position: absolute;
    right: auto;
    bottom: auto;
    overflow: visible;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(0 7px 10px rgb(0 0 0 / 38%));
    isolation: isolate;
    transition: filter 100ms ease, transform 100ms ease;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action::before {
    content: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action span {
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    color: #f1f1df;
    font-size: 8px;
    line-height: 1;
    text-shadow: 0 1px 3px #000, 0 0 7px #000;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action small {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--relic {
    right: 0;
    bottom: 0;
    width: 88px;
    height: 88px;
    background-image: url("${vt("relic")}");
    filter: drop-shadow(0 0 11px rgb(255 201 91 / 26%)) drop-shadow(0 8px 12px rgb(0 0 0 / 42%));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
    right: 102px;
    bottom: 72px;
    width: 58px;
    height: 58px;
    background-image: url("${vt("guard")}");
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--item {
    right: 16px;
    bottom: 104px;
    width: 54px;
    height: 54px;
    background-image: url("${vt("item")}");
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
    right: 104px;
    bottom: 4px;
    width: 54px;
    height: 54px;
    background-image: url("${vt("interact")}");
    opacity: 1;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--attack {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action.is-first-stage-pressed {
    filter: brightness(1.28) drop-shadow(0 0 16px rgb(130 243 210 / 58%));
    transform: scale(.92);
  }
}

/* Revision 6: one portable-field-instrument language for every HUD layer. */
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  min-height: 64px;
  padding: 10px 14px 9px;
  border-bottom: 1px solid var(--mvp-line);
  background:
    linear-gradient(90deg, rgb(5 22 18 / 82%), rgb(5 22 18 / 54%) 48%, rgb(5 22 18 / 74%)),
    linear-gradient(180deg, rgb(125 201 178 / 8%), transparent 72%);
  box-shadow: 0 12px 32px rgb(0 0 0 / 14%);
  backdrop-filter: blur(8px) saturate(1.16);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity,
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission,
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  position: relative;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
  padding-left: 9px;
  border-left: 2px solid rgb(224 174 104 / 68%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity strong {
  margin-top: 4px;
  color: var(--mvp-paper);
  text-shadow: 0 2px 10px rgb(0 0 0 / 58%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  padding: 0 18px;
  border-right: 0;
  border-left: 1px solid var(--mvp-line);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
  position: absolute;
  right: 18px;
  bottom: -5px;
  left: 18px;
  height: 1px;
  background: linear-gradient(90deg, var(--mvp-amber), var(--mvp-line-strong), transparent 84%);
  content: "";
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  margin-top: 5px;
  color: var(--mvp-paper);
  font-weight: 650;
  text-shadow: 0 2px 10px rgb(0 0 0 / 64%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  align-items: center;
  padding-left: 14px;
  border-left: 1px solid var(--mvp-line);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-health__track {
  height: 4px;
  background: rgb(224 239 226 / 12%);
  box-shadow: inset 0 0 0 1px rgb(216 238 228 / 6%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
  border-color: var(--mvp-line);
  background: linear-gradient(145deg, var(--mvp-panel-soft), rgb(10 42 34 / 42%));
  box-shadow: inset 0 0 0 1px rgb(227 240 222 / 4%);
}

.first-stage-mvp-progress,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation,
.north-star-stage[data-first-stage-mvp="r01"] .relic-loadout {
  border: 1px solid var(--mvp-line);
  border-radius: 3px 15px 3px 3px;
  background:
    linear-gradient(112deg, var(--mvp-panel), var(--mvp-panel-soft) 72%, var(--mvp-panel-faint));
  box-shadow:
    inset 2px 0 0 rgb(224 174 104 / 38%),
    0 12px 32px rgb(0 0 0 / 20%);
  backdrop-filter: blur(9px) saturate(1.14);
}

.first-stage-mvp-progress {
  isolation: isolate;
  overflow: hidden;
  padding: 10px 11px 9px 12px;
}

.first-stage-mvp-progress::before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 24px;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--mvp-amber), var(--mvp-signal), transparent);
  content: "";
}

.first-stage-mvp-progress::after {
  position: absolute;
  top: 7px;
  right: 8px;
  width: 5px;
  height: 5px;
  border-top: 1px solid var(--mvp-line-strong);
  border-right: 1px solid var(--mvp-line-strong);
  content: "";
}

.first-stage-mvp-progress__head b,
.first-stage-mvp-progress__head span,
.first-stage-mvp-progress__proof span {
  text-shadow: 0 1px 7px rgb(0 0 0 / 62%);
}

.first-stage-mvp-progress__passive,
.first-stage-mvp-progress__visual {
  border-color: rgb(164 215 201 / 14%);
  background: linear-gradient(90deg, rgb(21 61 52 / 40%), rgb(8 26 22 / 18%));
  box-shadow: inset 2px 0 0 rgb(104 188 167 / 28%);
}

.first-stage-mvp-progress__interaction {
  border-left-width: 2px;
  background: linear-gradient(90deg, rgb(7 30 25 / 68%), rgb(7 30 25 / 18%));
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status::before,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation::before,
.north-star-stage[data-first-stage-mvp="r01"] .relic-loadout::before {
  position: absolute;
  top: 0;
  right: 22px;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--mvp-amber), var(--mvp-line-strong), transparent);
  content: "";
}

.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout,
.north-star-stage[data-first-stage-mvp="r01"] .relic-target {
  border: 1px solid var(--mvp-line);
  border-radius: 3px 12px 3px 12px;
  background:
    linear-gradient(105deg, rgb(6 24 20 / 78%), rgb(8 32 26 / 48%) 70%, rgb(6 24 20 / 24%));
  box-shadow:
    inset 2px 0 0 rgb(224 174 104 / 30%),
    0 8px 24px rgb(0 0 0 / 18%);
  backdrop-filter: blur(7px) saturate(1.12);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-toast,
.north-star-stage[data-first-stage-mvp="r01"] .relic-context,
.first-stage-mvp-loading {
  border: 0;
  border-top: 1px solid var(--mvp-line-strong);
  border-bottom: 1px solid rgb(224 174 104 / 34%);
  border-radius: 2px 10px 2px 10px;
  background:
    linear-gradient(90deg, transparent, rgb(6 27 22 / 88%) 12% 88%, transparent);
  box-shadow: 0 12px 28px rgb(0 0 0 / 20%);
  backdrop-filter: blur(8px) saturate(1.14);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-context span {
  border: 1px solid var(--mvp-line-strong);
  border-radius: 3px 9px 3px 9px;
  background: rgb(17 58 49 / 58%);
  box-shadow: inset 0 0 12px rgb(130 243 210 / 8%);
}

@media (max-height: 500px) and (orientation: landscape) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    min-height: 42px;
    padding: 5px 7px;
    background: linear-gradient(180deg, rgb(5 22 18 / 70%), rgb(5 22 18 / 26%), transparent);
    box-shadow: none;
    backdrop-filter: blur(6px) saturate(1.1);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    padding: 0 7px 0 64px;
    border-left: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
    right: 7px;
    left: 58px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    padding-left: 7px;
  }

  .first-stage-mvp-progress {
    width: min(194px, 23cqw);
    padding: 5px 7px 5px 8px;
    border-radius: 2px 11px 2px 2px;
    background: linear-gradient(100deg, rgb(5 20 17 / 80%), rgb(8 31 26 / 52%) 72%, rgb(5 20 17 / 18%));
    box-shadow: inset 2px 0 0 rgb(224 174 104 / 34%), 0 8px 22px rgb(0 0 0 / 15%);
    backdrop-filter: blur(7px) saturate(1.12);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-toast {
    top: 18%;
    max-width: min(58%, 420px);
    padding: 6px 12px;
    background: linear-gradient(90deg, transparent, rgb(6 27 22 / 82%) 16% 84%, transparent);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-context {
    bottom: 23%;
    min-height: 38px;
    padding: 6px 10px;
  }
}

/* Revision 7: use the action-ring material language and protect the battlefield. */
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-r7-metal: rgb(16 21 20 / 88%);
  --mvp-r7-metal-soft: rgb(21 29 27 / 72%);
  --mvp-r7-edge: rgb(145 158 147 / 32%);
  --mvp-r7-copper: #9a6544;
  --mvp-r7-cyan: #67d9cf;
  --mvp-r7-bone: #ddd9c7;
}

.north-star-stage[data-first-stage-mvp="r01"][data-first-stage-intent="none"]
  :is(
    .relic-hud,
    .relic-navigation,
    .relic-loadout,
    .r10-buildcraft-status,
    .first-stage-mvp-progress,
    .north-star-combat-readout,
    .relic-target,
    .relic-context,
    .relic-toast,
    .relic-controls,
    .relic-waypoint,
    .first-stage-mvp-loading
  ) {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-intents {
  background:
    linear-gradient(90deg, rgb(3 14 12 / 78%) 0 25%, rgb(3 14 12 / 42%) 48%, rgb(3 14 12 / 12%) 72%, rgb(3 14 12 / 28%) 100%),
    linear-gradient(0deg, rgb(3 13 11 / 46%), transparent 42%);
  box-shadow: inset 0 0 0 1px rgb(190 213 199 / 8%);
  backdrop-filter: saturate(1.08) contrast(1.03);
}

.north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-intents > button {
  border: 1px solid rgb(150 164 153 / 28%);
  border-top-color: rgb(103 217 207 / 42%);
  border-radius: 2px 11px 2px 2px;
  background:
    repeating-linear-gradient(115deg, rgb(255 255 255 / 1.2%) 0 1px, transparent 1px 5px),
    linear-gradient(110deg, rgb(16 21 20 / 88%), rgb(22 30 28 / 66%));
  box-shadow: inset 3px 0 0 rgb(154 101 68 / 58%), 0 9px 24px rgb(0 0 0 / 22%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  min-height: 54px;
  grid-template-columns: .78fr 1.65fr .82fr;
  padding: 7px 12px 6px;
  border-bottom-color: var(--mvp-r7-edge);
  background:
    repeating-linear-gradient(100deg, rgb(255 255 255 / 1%) 0 1px, transparent 1px 6px),
    linear-gradient(180deg, var(--mvp-r7-metal), rgb(16 21 20 / 54%) 78%, transparent);
  box-shadow: 0 10px 22px rgb(0 0 0 / 14%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
  border-left-color: var(--mvp-r7-copper);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
  background: linear-gradient(90deg, var(--mvp-r7-copper), var(--mvp-r7-cyan), transparent 80%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  color: var(--mvp-r7-bone);
  font-size: clamp(9px, 1.7cqh, 13px);
}

.first-stage-mvp-progress,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation,
.north-star-stage[data-first-stage-mvp="r01"] .relic-loadout {
  border-color: var(--mvp-r7-edge);
  border-radius: 2px 13px 2px 2px;
  background:
    repeating-linear-gradient(110deg, rgb(255 255 255 / 1.2%) 0 1px, transparent 1px 6px),
    linear-gradient(112deg, var(--mvp-r7-metal), var(--mvp-r7-metal-soft) 76%, rgb(16 21 20 / 42%));
  box-shadow:
    inset 3px 0 0 rgb(154 101 68 / 56%),
    inset 0 0 0 1px rgb(0 0 0 / 34%),
    0 10px 26px rgb(0 0 0 / 20%);
}

.first-stage-mvp-progress::before,
.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status::before,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation::before,
.north-star-stage[data-first-stage-mvp="r01"] .relic-loadout::before {
  background: linear-gradient(90deg, var(--mvp-r7-copper), var(--mvp-r7-cyan), transparent 78%);
}

.first-stage-mvp-progress__passive,
.first-stage-mvp-progress__visual {
  border-color: rgb(145 158 147 / 18%);
  background: linear-gradient(90deg, rgb(35 43 40 / 72%), rgb(22 30 28 / 28%));
  box-shadow: inset 2px 0 0 rgb(103 217 207 / 38%);
}

.first-stage-mvp-progress__interaction {
  color: var(--mvp-r7-bone);
  background: linear-gradient(90deg, rgb(25 31 29 / 82%), rgb(20 27 25 / 24%));
}

.north-star-stage[data-first-stage-mvp="r01"]
  :is(.north-star-combat-readout, .relic-target, .relic-toast, .relic-context),
.first-stage-mvp-loading {
  border-color: var(--mvp-r7-edge);
  color: var(--mvp-r7-bone);
  background:
    repeating-linear-gradient(105deg, rgb(255 255 255 / 1%) 0 1px, transparent 1px 6px),
    linear-gradient(100deg, transparent, rgb(17 23 21 / 88%) 14% 86%, transparent);
  box-shadow: inset 0 1px 0 rgb(103 217 207 / 36%), 0 8px 22px rgb(0 0 0 / 18%);
}

@media (max-height: 500px) and (orientation: landscape) {
  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-return {
    width: 50px;
    min-width: 50px;
    min-height: 34px;
    border-color: rgb(145 158 147 / 34%);
    background: var(--mvp-r7-metal);
    color: var(--mvp-r7-bone);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    min-height: 36px;
    padding: 3px 6px;
    background:
      repeating-linear-gradient(100deg, rgb(255 255 255 / 1%) 0 1px, transparent 1px 6px),
      linear-gradient(180deg, rgb(16 21 20 / 78%), rgb(16 21 20 / 24%), transparent);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    padding: 0 6px 0 58px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
    margin-top: 5px;
    display: -webkit-box;
    max-height: 19px;
    overflow: hidden;
    font-size: 7.5px;
    line-height: 1.18;
    letter-spacing: .055em;
    text-overflow: clip;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
    bottom: -3px;
    left: 58px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-health {
    width: 78px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
    width: 34px;
    height: 34px;
  }

  .first-stage-mvp-progress {
    top: max(40px, calc(env(safe-area-inset-top) + 38px));
    width: min(166px, 19.5cqw);
    gap: 2px;
    padding: 4px 6px 4px 7px;
    border-radius: 2px 10px 2px 2px;
    backdrop-filter: blur(5px) saturate(1.08);
  }

  .first-stage-mvp-progress__head {
    grid-template-columns: minmax(0, 1fr) auto 40px;
  }

  .first-stage-mvp-progress__head button {
    min-width: 40px;
    min-height: 22px;
    padding: 2px 4px;
    border-color: var(--mvp-r7-edge);
    background: rgb(26 34 31 / 76%);
    font-size: 7px;
  }

  .first-stage-mvp-progress__head span,
  .first-stage-mvp-progress__head b {
    font-size: 7px;
  }

  .first-stage-mvp-progress__passive {
    min-height: 17px;
    padding: 2px 4px;
  }

  .first-stage-mvp-progress__passive span {
    max-width: 82px;
    font-size: 6px;
  }

  .first-stage-mvp-progress__interaction {
    min-height: 22px;
    max-height: 24px;
    padding: 3px 5px;
    font-size: 8px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-toast {
    top: 13%;
    max-width: min(40%, 330px);
    min-height: 0;
    padding: 5px 9px;
    font-size: 9px;
    line-height: 1.25;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-context {
    bottom: 21%;
    min-height: 34px;
    padding: 4px 8px;
  }
}

/* Revision 8: one clickable control surface on mouse, keyboard and touch. */
.north-star-stage[data-first-stage-mvp="r01"]
  :is(.relic-action, .relic-joystick)[data-input-active="true"],
.north-star-stage[data-first-stage-mvp="r01"]
  :is(.relic-action, .relic-joystick).is-first-stage-keyboard {
  filter: brightness(1.3) saturate(1.18) drop-shadow(0 0 14px rgb(103 217 207 / 48%));
}

.north-star-stage[data-first-stage-mvp="r01"]
  .relic-action[data-input-active="true"] {
  transform: scale(.92);
}

.north-star-stage[data-first-stage-mvp="r01"]
  .relic-joystick.is-first-stage-keyboard > i {
  border-color: rgb(154 246 221 / 92%);
  background: rgb(31 71 59 / 86%);
  box-shadow: 0 0 22px rgb(103 217 207 / 34%);
}

@media (hover: hover) and (pointer: fine) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    right: auto;
    left: 50%;
    width: min(660px, 52cqw);
    min-height: 58px;
    grid-template-columns: minmax(0, 1fr) auto;
    transform: translateX(-50%);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    min-width: 0;
    padding-left: 12px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: 76px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-controls {
    display: block;
    height: 190px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-control-guide,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-loadout {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    --joystick-size: 96px;
    bottom: 62px;
    left: clamp(18px, 2.4cqw, 32px);
    opacity: .82;
    transition: opacity 120ms ease, filter 120ms ease;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick:hover,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick.is-first-stage-keyboard {
    opacity: 1;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: clamp(22px, 2.8cqw, 40px);
    bottom: 118px;
    display: block;
    width: 188px;
    height: 164px;
    transform: scale(.82);
    transform-origin: right bottom;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action {
    position: absolute;
    right: auto;
    bottom: auto;
    overflow: visible;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    filter: drop-shadow(0 7px 10px rgb(0 0 0 / 38%));
    isolation: isolate;
    transition: filter 100ms ease, transform 100ms ease;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action::before {
    content: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action span {
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    color: #f1f1df;
    font-size: 8px;
    line-height: 1;
    text-shadow: 0 1px 3px #000, 0 0 7px #000;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action small {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--relic {
    right: 0;
    bottom: 0;
    width: 88px;
    height: 88px;
    background-image: url("${vt("relic")}");
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
    right: 102px;
    bottom: 72px;
    width: 58px;
    height: 58px;
    background-image: url("${vt("guard")}");
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--item {
    right: 16px;
    bottom: 104px;
    width: 54px;
    height: 54px;
    background-image: url("${vt("item")}");
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
    right: 104px;
    bottom: 4px;
    width: 54px;
    height: 54px;
    background-image: url("${vt("interact")}");
    opacity: 1;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--attack {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status {
    top: 68px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: 188px;
  }
}

/* Revision 9: one complete field-instrument hierarchy instead of stacked cards. */
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-r9-panel: rgb(10 14 14 / 86%);
  --mvp-r9-panel-soft: rgb(13 19 18 / 72%);
  --mvp-r9-edge: rgb(202 199 177 / 34%);
  --mvp-r9-edge-soft: rgb(202 199 177 / 16%);
  --mvp-r9-cyan: #79e4db;
  --mvp-r9-amber: #c8794f;
  --mvp-r9-paper: #e4e0ce;
}

.north-star-stage[data-first-stage-mvp="r01"] .r10-buildcraft-status,
.north-star-stage[data-first-stage-mvp="r01"] .relic-loadout {
  display: none !important;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  min-height: 58px;
  padding: 7px clamp(12px, 1.5cqw, 22px);
  border-bottom: 1px solid var(--mvp-r9-edge);
  background:
    linear-gradient(90deg, transparent 0 12%, var(--mvp-r9-panel) 24% 77%, transparent 92%),
    linear-gradient(180deg, rgb(6 9 9 / 82%), rgb(6 9 9 / 18%));
  box-shadow: 0 12px 30px rgb(0 0 0 / 18%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity,
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission,
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals,
.first-stage-mvp-progress,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation {
  border-color: var(--mvp-r9-edge);
  color: var(--mvp-r9-paper);
}

.first-stage-mvp-progress {
  top: 210px;
  left: 16px;
  width: clamp(220px, 19cqw, 252px);
  gap: 7px;
  padding: 10px 11px 11px;
  border: 1px solid var(--mvp-r9-edge);
  border-radius: 3px 12px 3px 3px;
  background:
    linear-gradient(90deg, var(--mvp-r9-amber) 0 3px, transparent 3px),
    repeating-linear-gradient(105deg, rgb(255 255 255 / 1.2%) 0 1px, transparent 1px 7px),
    linear-gradient(125deg, var(--mvp-r9-panel), var(--mvp-r9-panel-soft));
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 45%), 0 12px 26px rgb(0 0 0 / 24%);
  backdrop-filter: blur(8px) saturate(1.05);
}

.first-stage-mvp-progress::before {
  height: 1px;
  background: linear-gradient(90deg, var(--mvp-r9-amber), var(--mvp-r9-cyan), transparent 86%);
}

.first-stage-mvp-progress__head span,
.first-stage-mvp-progress__head b,
.first-stage-mvp-progress__proof span,
.first-stage-mvp-progress__passive span,
.first-stage-mvp-progress__interaction {
  color: var(--mvp-r9-paper);
  text-shadow: 0 1px 2px #000;
}

.first-stage-mvp-progress__passive,
.first-stage-mvp-progress__visual,
.first-stage-mvp-progress__interaction {
  border-color: var(--mvp-r9-edge-soft);
  background: rgb(25 31 29 / 72%);
  box-shadow: inset 2px 0 0 rgb(121 228 219 / 34%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation {
  top: 74px;
  right: 16px;
  border-radius: 12px 3px 3px 3px;
  background: var(--mvp-r9-panel);
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 42%), 0 12px 26px rgb(0 0 0 / 22%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target,
.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
  top: 82px;
  border: 1px solid var(--mvp-r9-edge);
  border-radius: 3px 10px 3px 3px;
  background: linear-gradient(90deg, transparent, var(--mvp-r9-panel) 12% 88%, transparent);
}

.first-stage-mvp-loading[data-phase="ready"]:not(.is-departure) {
  display: none;
}

@media (hover: hover) and (pointer: fine) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    right: auto;
    left: 50%;
    width: min(660px, 52cqw);
    min-height: 58px;
    grid-template-columns: minmax(0, 1fr) auto;
    transform: translateX(-50%);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
    display: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    grid-row: 1;
    grid-column: 1;
    min-width: 0;
    padding-left: 12px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    grid-row: 1;
    grid-column: 2;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: 76px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-controls {
    height: 232px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    --joystick-size: 126px;
    left: clamp(24px, 3.2cqw, 48px);
    bottom: 34px;
    opacity: .9;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: clamp(28px, 3.4cqw, 52px);
    bottom: 54px;
    width: 224px;
    height: 202px;
    transform: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--relic {
    right: 0;
    bottom: 0;
    width: 104px;
    height: 104px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
    right: 124px;
    bottom: 82px;
    width: 68px;
    height: 68px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--item {
    right: 18px;
    bottom: 128px;
    width: 62px;
    height: 62px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
    right: 134px;
    bottom: 4px;
    width: 62px;
    height: 62px;
  }

  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-camera-zoom {
    right: 272px;
    bottom: 16px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    min-height: 38px;
    padding: 3px 8px;
  }

  .first-stage-mvp-progress {
    top: max(42px, calc(env(safe-area-inset-top) + 40px));
    left: max(12px, calc(env(safe-area-inset-left) + 10px));
    width: min(174px, 20cqw);
    padding: 5px 7px 6px;
    gap: 3px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-navigation {
    top: max(42px, calc(env(safe-area-inset-top) + 40px));
    right: max(12px, calc(env(safe-area-inset-right) + 10px));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: max(18px, calc(env(safe-area-inset-right) + 14px));
    bottom: max(16px, calc(env(safe-area-inset-bottom) + 12px));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    left: max(18px, calc(env(safe-area-inset-left) + 14px));
    bottom: max(16px, calc(env(safe-area-inset-bottom) + 12px));
  }
}

/* Revision 11: full-bleed world, safe-area overlays and one readable HP home. */
.game-shell:has(.north-star-stage[data-first-stage-mvp="r01"]) {
  display: block;
  width: 100vw;
  height: 100dvh;
  padding: 0;
  background: #07100d;
}

.game-shell:has(.north-star-stage[data-first-stage-mvp="r01"])::before {
  display: none;
}

.game-shell:has(.north-star-stage[data-first-stage-mvp="r01"]) >
  .relic-stage[data-first-stage-mvp="r01"],
.north-star-stage[data-first-stage-mvp="r01"] {
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  min-height: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  top: max(7px, env(safe-area-inset-top));
  right: max(10px, env(safe-area-inset-right));
  left: max(112px, calc(env(safe-area-inset-left) + 108px));
  display: grid;
  width: auto;
  min-height: 38px;
  padding: 0;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 8px;
  border: 0;
  background: none;
  box-shadow: none;
  transform: none;
  pointer-events: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  grid-column: 1;
  justify-self: start;
  width: min(520px, 58cqw);
  min-width: 0;
  min-height: 36px;
  padding: 6px 10px 7px;
  overflow: hidden;
  border: 1px solid rgb(202 199 177 / 24%);
  border-radius: 2px 10px 2px 2px;
  background: linear-gradient(100deg, rgb(9 14 13 / 74%), rgb(9 14 13 / 38%) 78%, transparent);
  box-shadow: 0 7px 22px rgb(0 0 0 / 17%);
  backdrop-filter: blur(7px) saturate(1.05);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission > span {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  margin: 0;
  overflow: hidden;
  font-size: clamp(9px, 1.45cqh, 12px);
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  grid-column: 2;
  justify-self: end;
  min-height: 0;
  padding: 0;
  border: 0;
  background: none;
  box-shadow: none;
  pointer-events: auto;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-health {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
  width: 44px;
  min-width: 44px;
  height: 44px;
  min-height: 44px;
  border: 1px solid rgb(202 199 177 / 30%);
  border-radius: 5px;
  background: rgb(9 14 13 / 70%);
  box-shadow: 0 7px 22px rgb(0 0 0 / 18%);
  backdrop-filter: blur(7px);
}

.first-stage-mvp-progress__health {
  display: grid;
  gap: 4px;
  padding: 6px 7px;
  border: 1px solid var(--mvp-r9-edge-soft);
  background: rgb(25 31 29 / 74%);
  box-shadow: inset 2px 0 0 rgb(121 228 219 / 46%);
}

.first-stage-mvp-progress__health > span {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.first-stage-mvp-progress__health > span i {
  color: rgb(228 224 206 / 72%);
  font: 800 7px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .14em;
}

.first-stage-mvp-progress__health > span b {
  color: var(--mvp-r9-paper);
  font: 800 9px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .08em;
}

.first-stage-mvp-progress__health > i {
  display: block;
  height: 5px;
  overflow: hidden;
  border: 1px solid rgb(228 224 206 / 20%);
  background: rgb(4 8 7 / 72%);
}

.first-stage-mvp-progress__health > i > em {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #c8794f, #d6c66e 62%, #79e4db);
  box-shadow: 0 0 10px rgb(121 228 219 / 32%);
  transition: width 140ms ease-out, background 140ms ease-out;
}

.first-stage-mvp-progress__health[data-state="warning"] > i > em {
  background: linear-gradient(90deg, #aa493b, #dc9c55);
}

.first-stage-mvp-progress__health[data-state="critical"] > i > em {
  background: linear-gradient(90deg, #7d2929, #e05042);
}

.north-star-stage[data-first-stage-mvp="r01"] >
  .first-stage-mvp-progress__interaction {
  position: absolute;
  z-index: 18;
  right: auto;
  bottom: clamp(54px, 8cqh, 82px);
  left: 50%;
  display: block;
  width: min(420px, 42cqw);
  min-height: 32px;
  max-height: 42px;
  padding: 7px 10px;
  border-radius: 4px;
  background: rgb(9 14 13 / 78%);
  box-shadow: 0 8px 22px rgb(0 0 0 / 22%);
  transform: translateX(-50%);
  pointer-events: none;
}

.north-star-stage[data-first-stage-mvp="r01"] >
  .first-stage-mvp-progress__interaction[data-state="idle"] {
  display: none;
}

@media (hover: hover) and (pointer: fine) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    right: max(16px, env(safe-area-inset-right));
    left: max(126px, calc(env(safe-area-inset-left) + 120px));
    width: auto;
    min-height: 38px;
    grid-template-columns: minmax(0, 1fr) auto;
    transform: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission,
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    grid-row: 1;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    grid-column: 1;
    padding-left: 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    grid-column: 2;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    top: max(4px, env(safe-area-inset-top));
    right: max(8px, env(safe-area-inset-right));
    left: max(94px, calc(env(safe-area-inset-left) + 90px));
    min-height: 36px;
    padding: 0;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    width: min(430px, 54cqw);
    min-height: 34px;
    padding: 5px 8px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
    width: 38px;
    min-width: 38px;
    height: 38px;
    min-height: 38px;
  }

  .first-stage-mvp-progress {
    top: max(48px, calc(env(safe-area-inset-top) + 44px));
  }

  .first-stage-mvp-progress:not([data-hud-expanded="true"])
    .first-stage-mvp-progress__passive {
    display: none;
  }

  .first-stage-mvp-progress:not([data-hud-expanded="true"])
    .first-stage-mvp-progress__interaction:not([data-state="idle"]) {
    position: absolute;
    right: auto;
    bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
    left: 50%;
    display: block;
    width: min(270px, 34cqw);
    min-height: 28px;
    max-height: 34px;
    padding: 5px 8px;
    border-radius: 4px;
    background: rgb(9 14 13 / 78%);
    box-shadow: 0 8px 22px rgb(0 0 0 / 22%);
    transform: translateX(-50%);
    pointer-events: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] >
    .first-stage-mvp-progress__interaction:not([data-state="idle"]) {
    right: auto;
    bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
    left: 50%;
    width: min(270px, 34cqw);
    min-height: 28px;
    max-height: 34px;
    padding: 5px 8px;
    transform: translateX(-50%);
  }

  .first-stage-mvp-progress__health {
    gap: 2px;
    padding: 3px 5px 4px;
  }

  .first-stage-mvp-progress__health > i {
    height: 4px;
  }
}

/* Revision 12: one field-glass language, aligned rails and unobstructed play. */
.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"]),
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-r12-glass: rgb(9 17 15 / 72%);
  --mvp-r12-glass-strong: rgb(7 14 12 / 84%);
  --mvp-r12-edge: rgb(229 236 222 / 25%);
  --mvp-r12-highlight: rgb(255 255 255 / 11%);
  --mvp-r12-shadow: 0 12px 32px rgb(0 0 0 / 26%);
}

.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
  > .product-shell-return {
  top: max(10px, env(safe-area-inset-top));
  right: max(12px, env(safe-area-inset-right));
  left: auto;
  min-width: 84px;
  min-height: 42px;
  padding: 7px 10px;
  border: 1px solid var(--mvp-r12-edge);
  border-radius: 12px;
  background: var(--mvp-r12-glass-strong);
  box-shadow: inset 0 1px 0 var(--mvp-r12-highlight), var(--mvp-r12-shadow);
  opacity: 1;
  backdrop-filter: blur(16px) saturate(1.18);
  -webkit-backdrop-filter: blur(16px) saturate(1.18);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  top: max(10px, env(safe-area-inset-top));
  right: max(108px, calc(env(safe-area-inset-right) + 104px));
  left: max(14px, env(safe-area-inset-left));
  display: block;
  width: auto;
  min-height: 42px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  width: min(590px, 62cqw);
  min-height: 42px;
  padding: 8px 12px;
  border: 1px solid var(--mvp-r12-edge);
  border-radius: 12px;
  background: var(--mvp-r12-glass);
  box-shadow: inset 0 1px 0 var(--mvp-r12-highlight), var(--mvp-r12-shadow);
  backdrop-filter: blur(16px) saturate(1.18);
  -webkit-backdrop-filter: blur(16px) saturate(1.18);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  position: fixed;
  z-index: 122;
  top: max(10px, env(safe-area-inset-top));
  right: max(104px, calc(env(safe-area-inset-right) + 100px));
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
  width: 42px;
  min-width: 42px;
  height: 42px;
  min-height: 42px;
  border: 1px solid var(--mvp-r12-edge);
  border-radius: 12px;
  background: var(--mvp-r12-glass-strong);
  box-shadow: inset 0 1px 0 var(--mvp-r12-highlight), var(--mvp-r12-shadow);
  backdrop-filter: blur(16px) saturate(1.18);
  -webkit-backdrop-filter: blur(16px) saturate(1.18);
}

.first-stage-mvp-progress,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation,
.north-star-stage[data-first-stage-mvp="r01"] .relic-target,
.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout,
.north-star-stage[data-first-stage-mvp="r01"] >
  .first-stage-mvp-progress__interaction {
  border: 1px solid var(--mvp-r12-edge);
  border-radius: 12px;
  background: var(--mvp-r12-glass);
  box-shadow: inset 0 1px 0 var(--mvp-r12-highlight), var(--mvp-r12-shadow);
  backdrop-filter: blur(16px) saturate(1.18);
  -webkit-backdrop-filter: blur(16px) saturate(1.18);
}

.first-stage-mvp-progress {
  top: max(62px, calc(env(safe-area-inset-top) + 56px));
  left: max(14px, env(safe-area-inset-left));
  border-radius: 12px;
  background: var(--mvp-r12-glass-strong);
}

.first-stage-mvp-progress::before,
.first-stage-mvp-progress::after,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation::before {
  display: none;
}

.first-stage-mvp-progress__health,
.first-stage-mvp-progress__passive,
.first-stage-mvp-progress__visual,
.first-stage-mvp-progress__interaction {
  border: 1px solid rgb(229 236 222 / 15%);
  border-radius: 8px;
  background: rgb(255 255 255 / 4.5%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 6%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target,
.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
  right: max(14px, env(safe-area-inset-right));
  left: auto;
  width: min(236px, 25cqw);
  transform: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target {
  top: 252px;
}

.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
  top: 306px;
}

@media (max-height: 500px) and (orientation: landscape) {
  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-return {
    top: max(7px, env(safe-area-inset-top));
    right: max(9px, env(safe-area-inset-right));
    left: auto;
    min-width: 42px;
    min-height: 40px;
    padding: 5px 7px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    top: max(7px, env(safe-area-inset-top));
    right: max(106px, calc(env(safe-area-inset-right) + 102px));
    left: max(12px, env(safe-area-inset-left));
    min-height: 40px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    width: min(500px, calc(100cqw - 230px));
    min-height: 40px;
    padding: 7px 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
    margin: 0;
    font-size: 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    top: max(7px, env(safe-area-inset-top));
    right: max(58px, calc(env(safe-area-inset-right) + 54px));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
    width: 40px;
    min-width: 40px;
    height: 40px;
    min-height: 40px;
  }

  .first-stage-mvp-progress {
    top: max(55px, calc(env(safe-area-inset-top) + 51px));
    left: max(12px, env(safe-area-inset-left));
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-target {
    top: max(55px, calc(env(safe-area-inset-top) + 51px));
    right: max(12px, env(safe-area-inset-right));
    left: auto;
    width: min(224px, 30cqw);
    transform: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
    top: max(106px, calc(env(safe-area-inset-top) + 102px));
    right: max(12px, env(safe-area-inset-right));
    left: auto;
    width: min(224px, 30cqw);
    transform: none;
  }
}

@media (orientation: portrait) {
  .game-shell.prototype-b-shell:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .north-star-stage[data-first-stage-mvp="r01"] {
    opacity: .1;
    filter: saturate(.3) brightness(.5);
    pointer-events: none;
  }

  .game-shell.prototype-b-shell:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .orientation-notice {
    position: fixed;
    z-index: 400;
    top: 50%;
    left: 50%;
    display: grid !important;
    width: min(82vw, 340px);
    padding: 26px 24px 24px;
    border: 1px solid rgb(229 236 222 / 34%);
    border-radius: 18px;
    background: rgb(7 14 12 / 91%);
    color: #edf0e8;
    box-shadow:
      0 0 0 100vmax rgb(2 7 5 / 72%),
      inset 0 1px 0 rgb(255 255 255 / 12%),
      0 24px 70px rgb(0 0 0 / 44%);
    text-align: left;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(20px) saturate(1.15);
    -webkit-backdrop-filter: blur(20px) saturate(1.15);
    pointer-events: auto;
  }

  .game-shell.prototype-b-shell:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .orientation-notice strong {
    font-size: clamp(25px, 7vw, 32px);
  }

  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > :is(.product-shell-return, .product-shell-camera-zoom) {
    visibility: hidden;
    pointer-events: none;
  }
}

/* Revision 13: generated-target synthesis — matte edge instrumentation. */
.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"]),
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-r13-surface: rgb(9 13 12 / 88%);
  --mvp-r13-surface-soft: rgb(11 17 15 / 78%);
  --mvp-r13-edge: rgb(226 225 205 / 34%);
  --mvp-r13-edge-soft: rgb(226 225 205 / 16%);
  --mvp-r13-cyan: #79e4d5;
  --mvp-r13-amber: #d39a56;
  --mvp-r13-paper: #ece8d8;
}

.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
  > .product-shell-return {
  top: max(12px, env(safe-area-inset-top));
  right: max(14px, env(safe-area-inset-right));
  width: auto;
  min-width: 64px;
  min-height: 34px;
  padding: 5px 9px;
  border: 1px solid var(--mvp-r13-edge);
  border-radius: 2px;
  background: var(--mvp-r13-surface);
  box-shadow: inset 2px 0 0 rgb(211 154 86 / 70%), 0 7px 18px rgb(0 0 0 / 22%);
  opacity: .9;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
  top: max(12px, env(safe-area-inset-top));
  right: auto;
  left: max(16px, env(safe-area-inset-left));
  display: block;
  width: min(330px, 38cqw);
  min-height: 0;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  transform: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__identity,
.north-star-stage[data-first-stage-mvp="r01"] .relic-health,
.north-star-stage[data-first-stage-mvp="r01"] .relic-navigation,
.north-star-stage[data-first-stage-mvp="r01"] .north-star-combat-readout {
  display: none !important;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  width: 100%;
  min-height: 38px;
  padding: 7px 10px 7px 12px;
  border: 1px solid var(--mvp-r13-edge);
  border-left: 3px solid var(--mvp-r13-amber);
  border-radius: 2px;
  background: linear-gradient(90deg, var(--mvp-r13-surface), var(--mvp-r13-surface-soft) 82%, transparent);
  box-shadow: 0 8px 22px rgb(0 0 0 / 18%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
  right: 9px;
  bottom: 3px;
  left: 12px;
  display: block;
  height: 1px;
  background: linear-gradient(90deg, var(--mvp-r13-cyan), transparent 72%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission > span {
  color: rgb(236 232 216 / 58%);
  font-size: 7px;
  letter-spacing: .15em;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  margin-top: 3px;
  overflow: hidden;
  color: var(--mvp-r13-paper);
  font-size: 10px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 1px 2px #000;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  position: fixed;
  z-index: 122;
  top: max(12px, env(safe-area-inset-top));
  right: max(84px, calc(env(safe-area-inset-right) + 80px));
  display: block;
  padding: 0;
  border: 0;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
  width: 34px;
  min-width: 34px;
  height: 34px;
  min-height: 34px;
  border: 1px solid var(--mvp-r13-edge);
  border-radius: 2px;
  background: var(--mvp-r13-surface);
  box-shadow: 0 7px 18px rgb(0 0 0 / 20%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.first-stage-mvp-progress {
  top: auto;
  bottom: 24px;
  left: max(18px, env(safe-area-inset-left));
  width: 224px;
  gap: 5px;
  padding: 8px 9px 9px 11px;
  overflow: visible;
  border: 1px solid var(--mvp-r13-edge);
  border-left: 3px solid var(--mvp-r13-amber);
  border-radius: 2px;
  background: var(--mvp-r13-surface);
  box-shadow: 0 10px 24px rgb(0 0 0 / 22%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.first-stage-mvp-progress::before {
  right: 10px;
  left: 11px;
  display: block;
  height: 1px;
  background: linear-gradient(90deg, var(--mvp-r13-amber), var(--mvp-r13-cyan), transparent);
}

.first-stage-mvp-progress::after {
  display: none;
}

.first-stage-mvp-progress > small,
.first-stage-mvp-progress__proof,
.first-stage-mvp-progress__visual,
.first-stage-mvp-progress__interaction {
  display: none;
}

.first-stage-mvp-progress[data-hud-expanded="true"] > small,
.first-stage-mvp-progress[data-hud-expanded="true"] .first-stage-mvp-progress__proof,
.first-stage-mvp-progress[data-hud-expanded="true"] .first-stage-mvp-progress__visual {
  display: flex;
}

.first-stage-mvp-progress__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 42px;
  gap: 6px;
}

.first-stage-mvp-progress__head span,
.first-stage-mvp-progress__head b,
.first-stage-mvp-progress__health > span i,
.first-stage-mvp-progress__health > span b,
.first-stage-mvp-progress__passive span {
  color: var(--mvp-r13-paper);
  font-family: "Avenir Next Condensed", "DIN Condensed", sans-serif;
  text-shadow: 0 1px 2px #000;
}

.first-stage-mvp-progress__health,
.first-stage-mvp-progress__passive {
  padding: 4px 5px;
  border: 1px solid var(--mvp-r13-edge-soft);
  border-radius: 1px;
  background: rgb(255 255 255 / 3%);
  box-shadow: none;
}

.first-stage-mvp-progress__health > i,
.first-stage-mvp-progress__passive > i {
  height: 5px;
  border: 0;
  background: rgb(0 0 0 / 54%);
}

.first-stage-mvp-progress__health > i > em {
  background: linear-gradient(90deg, #c8794f, #d7be63 48%, var(--mvp-r13-cyan));
  box-shadow: 0 0 7px rgb(121 228 213 / 26%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target {
  top: max(14px, env(safe-area-inset-top));
  right: auto;
  left: 50%;
  width: min(310px, 34cqw);
  min-height: 34px;
  padding: 6px 12px;
  border: 1px solid var(--mvp-r13-edge);
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--mvp-r13-surface) 9% 91%, transparent);
  box-shadow: 0 8px 20px rgb(0 0 0 / 18%);
  transform: translateX(-50%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] >
  .first-stage-mvp-progress__interaction {
  bottom: max(16px, calc(env(safe-area-inset-bottom) + 12px));
  width: min(360px, 36cqw);
  min-height: 30px;
  padding: 6px 10px;
  border: 1px solid var(--mvp-r13-edge);
  border-radius: 2px;
  background: var(--mvp-r13-surface);
  box-shadow: 0 7px 18px rgb(0 0 0 / 18%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

@media (hover: hover) and (pointer: fine) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    right: auto;
    left: max(16px, env(safe-area-inset-left));
    width: min(330px, 38cqw);
    min-height: 0;
    transform: none;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    padding-left: 12px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: auto;
    bottom: 24px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: clamp(18px, 2.3cqw, 32px);
    bottom: 38px;
    transform: scale(.76);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    bottom: 32px;
    left: clamp(18px, 2.3cqw, 32px);
    opacity: .7;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
    > .product-shell-return {
    top: max(8px, env(safe-area-inset-top));
    right: max(10px, env(safe-area-inset-right));
    min-width: 38px;
    min-height: 34px;
    padding: 4px 6px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    top: max(8px, env(safe-area-inset-top));
    left: max(10px, env(safe-area-inset-left));
    width: min(260px, 31cqw);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    width: 100%;
    min-height: 34px;
    padding: 5px 8px 5px 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
    display: block;
    max-height: 13px;
    font-size: 8px;
    line-height: 1.15;
    white-space: nowrap;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
    top: max(8px, env(safe-area-inset-top));
    right: max(56px, calc(env(safe-area-inset-right) + 52px));
  }

  .first-stage-mvp-progress,
  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: max(50px, calc(env(safe-area-inset-top) + 46px));
    bottom: auto;
    left: max(10px, env(safe-area-inset-left));
    width: min(162px, 19cqw);
    gap: 3px;
    padding: 5px 6px 6px 8px;
  }

  .first-stage-mvp-progress__head {
    grid-template-columns: minmax(0, 1fr) auto 36px;
  }

  .first-stage-mvp-progress__head span i {
    display: none;
  }

  .first-stage-mvp-progress__head button {
    min-width: 36px;
    min-height: 20px;
  }

  .first-stage-mvp-progress__health,
  .first-stage-mvp-progress__passive {
    padding: 3px 4px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-target {
    top: max(8px, env(safe-area-inset-top));
    width: min(230px, 28cqw);
    min-height: 32px;
    padding: 5px 9px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: max(16px, env(safe-area-inset-right));
    bottom: max(12px, env(safe-area-inset-bottom));
  }

  .north-star-stage[data-first-stage-mvp="r01"] >
    .first-stage-mvp-progress__interaction:not([data-state="idle"]) {
    bottom: max(10px, calc(env(safe-area-inset-bottom) + 6px));
    width: min(250px, 31cqw);
  }
}

/* Revision 16: one shared field instrument, responsive only in scale and safe area. */
.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"]),
.north-star-stage[data-first-stage-mvp="r01"] {
  --mvp-r16-surface: rgb(6 11 10 / 94%);
  --mvp-r16-surface-raised: rgb(12 20 18 / 96%);
  --mvp-r16-edge: rgb(218 223 205 / 34%);
  --mvp-r16-edge-soft: rgb(218 223 205 / 17%);
  --mvp-r16-paper: #eeeadd;
  --mvp-r16-cyan: #79e4d5;
  --mvp-r16-amber: #d39a56;
}

.product-shell-host.is-game:has(.north-star-stage[data-first-stage-mvp="r01"])
  > .product-shell-return {
  top: max(12px, env(safe-area-inset-top));
  right: max(14px, env(safe-area-inset-right));
  min-width: 62px;
  min-height: 36px;
  border-color: var(--mvp-r16-edge);
  border-radius: 3px;
  background: var(--mvp-r16-surface);
  box-shadow: inset 3px 0 0 rgb(211 154 86 / 72%), 0 8px 20px rgb(0 0 0 / 24%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud,
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud:is(:hover, :focus-within) {
  top: max(12px, env(safe-area-inset-top));
  right: auto;
  left: max(14px, env(safe-area-inset-left));
  width: clamp(210px, 22cqw, 264px);
  min-height: 38px;
  transform: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  width: 100%;
  min-height: 38px;
  padding: 7px 10px 7px 12px;
  border: 1px solid var(--mvp-r16-edge);
  border-left: 3px solid var(--mvp-r16-amber);
  border-radius: 3px 3px 1px 1px;
  background: var(--mvp-r16-surface);
  box-shadow: 0 8px 20px rgb(0 0 0 / 22%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission::after {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  display: block;
  max-width: 100%;
  margin: 0;
  color: var(--mvp-r16-paper);
  font-size: 10px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__vitals {
  position: fixed;
  top: max(12px, env(safe-area-inset-top));
  right: max(84px, calc(env(safe-area-inset-right) + 80px));
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-audio {
  width: 36px;
  min-width: 36px;
  height: 36px;
  min-height: 36px;
  border-color: var(--mvp-r16-edge);
  border-radius: 3px;
  background: var(--mvp-r16-surface);
  box-shadow: 0 8px 20px rgb(0 0 0 / 22%);
}

.north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
  top: max(56px, calc(env(safe-area-inset-top) + 52px));
  bottom: auto;
  left: max(14px, env(safe-area-inset-left));
  width: clamp(210px, 22cqw, 264px);
  gap: 4px;
  padding: 7px 8px 8px 10px;
  border: 1px solid var(--mvp-r16-edge);
  border-left: 3px solid var(--mvp-r16-amber);
  border-radius: 1px 1px 3px 3px;
  background: var(--mvp-r16-surface-raised);
  box-shadow: 0 10px 24px rgb(0 0 0 / 25%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.first-stage-mvp-progress::before,
.first-stage-mvp-progress::after {
  display: none;
}

.first-stage-mvp-progress__health,
.first-stage-mvp-progress__passive,
.first-stage-mvp-progress__visual,
.first-stage-mvp-progress__interaction {
  border-color: var(--mvp-r16-edge-soft);
  border-radius: 2px;
  background: rgb(20 30 27 / 96%);
  box-shadow: none;
}

.first-stage-mvp-progress__head span,
.first-stage-mvp-progress__head b,
.first-stage-mvp-progress__health > span i,
.first-stage-mvp-progress__health > span b,
.first-stage-mvp-progress__passive span {
  color: var(--mvp-r16-paper);
  text-shadow: 0 1px 2px #000;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-target {
  top: max(12px, env(safe-area-inset-top));
  right: auto;
  left: 50%;
  width: clamp(210px, 25cqw, 300px);
  min-height: 36px;
  border-color: var(--mvp-r16-edge);
  border-radius: 3px;
  background: var(--mvp-r16-surface);
  box-shadow: 0 8px 20px rgb(0 0 0 / 24%);
  transform: translateX(-50%);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-toast {
  top: max(58px, calc(env(safe-area-inset-top) + 54px));
  bottom: auto;
  width: min(360px, 38cqw);
  border-color: var(--mvp-r16-edge);
  border-radius: 3px;
  background: var(--mvp-r16-surface);
  box-shadow: 0 8px 20px rgb(0 0 0 / 24%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-context,
.north-star-stage[data-first-stage-mvp="r01"] >
  .first-stage-mvp-progress__interaction {
  right: auto;
  bottom: max(14px, calc(env(safe-area-inset-bottom) + 10px));
  left: 50%;
  width: min(350px, 36cqw);
  min-height: 32px;
  border-color: var(--mvp-r16-edge);
  border-radius: 3px;
  background: var(--mvp-r16-surface);
  box-shadow: 0 8px 20px rgb(0 0 0 / 24%);
  transform: translateX(-50%);
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-controls {
  height: 180px;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
  --joystick-size: 104px;
  bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
  left: max(20px, calc(env(safe-area-inset-left) + 12px));
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
  right: max(18px, calc(env(safe-area-inset-right) + 12px));
  bottom: max(10px, calc(env(safe-area-inset-bottom) + 6px));
  display: block;
  width: 188px;
  height: 164px;
  transform: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action {
  position: absolute;
  right: auto;
  bottom: auto;
  overflow: visible;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  filter: drop-shadow(0 7px 10px rgb(0 0 0 / 38%));
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action::before {
  content: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action span {
  position: absolute;
  right: 0;
  bottom: 8px;
  left: 0;
  color: #f1f1df;
  font-size: 8px;
  line-height: 1;
  text-shadow: 0 1px 3px #000, 0 0 7px #000;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action small {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--relic {
  right: 0;
  bottom: 0;
  width: 88px;
  height: 88px;
  background-image: url("${vt("relic")}");
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--guard {
  right: 102px;
  bottom: 72px;
  width: 58px;
  height: 58px;
  background-image: url("${vt("guard")}");
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--item {
  right: 16px;
  bottom: 104px;
  width: 54px;
  height: 54px;
  background-image: url("${vt("item")}");
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--interact {
  right: 104px;
  bottom: 4px;
  width: 54px;
  height: 54px;
  background-image: url("${vt("interact")}");
  opacity: 1;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-action--attack {
  display: none;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--attack {
  display: grid;
  right: 96px;
  bottom: 2px;
  width: 66px;
  height: 66px;
  border: 1px solid rgb(238 202 130 / 72%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 46% 42%, rgb(255 223 154 / 22%), transparent 34%),
    conic-gradient(from 26deg, rgb(114 226 207 / 16%), rgb(19 35 31 / 94%) 34%, rgb(231 184 103 / 22%) 72%, rgb(19 35 31 / 94%));
  box-shadow:
    inset 0 0 0 4px rgb(7 16 14 / 72%),
    inset 0 0 18px rgb(244 190 93 / 12%),
    0 7px 18px rgb(0 0 0 / 38%);
  color: #fff0c7;
  opacity: 1;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--guard {
  right: 108px;
  bottom: 78px;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--interact {
  right: 172px;
  bottom: 8px;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--movement-priority {
  display: grid;
  right: 174px;
  bottom: 72px;
  width: 58px;
  height: 58px;
  border: 1px solid rgb(132 235 216 / 58%);
  border-radius: 50%;
  background:
    linear-gradient(rgb(7 18 16 / 56%), rgb(7 18 16 / 56%)),
    url("${vt("dodge")}") center / cover no-repeat;
  box-shadow: inset 0 0 0 4px rgb(4 13 11 / 72%), 0 7px 18px rgb(0 0 0 / 38%);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--movement-priority[aria-pressed="true"] {
  border-color: #8cffe1;
  box-shadow:
    inset 0 0 0 4px rgb(4 13 11 / 72%),
    0 0 0 3px rgb(122 248 215 / 22%),
    0 0 24px rgb(92 238 199 / 36%);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--movement-priority span {
  font-size: 7px;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--relic::before,
.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--guard::before {
  content: "";
  position: absolute;
  z-index: 2;
  inset: -4px;
  border-radius: 50%;
  pointer-events: none;
  mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--relic::before {
  background: conic-gradient(#f4ce80 var(--ws1-relic-progress, 0deg), rgb(116 235 214 / 16%) 0);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  .relic-action--guard::before {
  background: conic-gradient(#8ff5df var(--ws1-auto-deflect-progress, 0deg), rgb(116 235 214 / 14%) 0);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"][data-ws1-guard-mode="on"]
  .relic-action--guard {
  border-color: #e9f6d9;
  box-shadow: 0 0 0 3px rgb(143 245 223 / 25%), 0 0 24px rgb(143 245 223 / 32%);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]::after {
  content: "";
  position: absolute;
  z-index: 31;
  left: 50%;
  top: 27%;
  translate: -50% -50%;
  pointer-events: none;
  padding: 5px 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: #f8edc9;
  background: rgb(7 17 15 / 72%);
  font: 800 10px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .14em;
  opacity: 0;
  transition: opacity 90ms linear, transform 90ms ease-out;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  [data-control="attack"]:active,
.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  [data-control="attack"]:focus-visible {
  border-color: #fff1b3;
  box-shadow:
    inset 0 0 0 4px rgb(7 16 14 / 72%),
    0 0 0 2px rgb(116 235 214 / 36%),
    0 0 26px rgb(244 190 93 / 32%);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  [data-control="attack"] small {
  display: block;
  font-size: 6px;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"]
  [data-control="attack"] span {
  font-size: 11px;
  text-shadow: 0 1px 4px #000;
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"][data-ws1-link-window="true"]::after {
  content: "LINK WINDOW / TAP ATTACK";
  border-color: rgb(116 235 214 / 58%);
  opacity: 1;
  transform: translateY(-3px);
}

.north-star-stage[data-first-stage-mvp="r01"][data-ws1-action-profile="ws1-r01"][data-ws1-last-cue="ws1.link-confirmed"]::after {
  content: "LINK +";
  border-color: rgb(255 215 134 / 72%);
  color: #fff4c7;
  opacity: 1;
}

.north-star-stage[data-first-stage-mvp="r01"] .ws1-webgpu-comparator {
  position: absolute;
  z-index: 19;
  top: max(10px, env(safe-area-inset-top));
  right: max(10px, env(safe-area-inset-right));
  width: 320px;
  max-width: 36%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgb(114 226 207 / 44%);
  border-radius: 4px;
  background: rgb(4 12 11 / 82%);
  box-shadow: 0 12px 32px rgb(0 0 0 / 38%);
  pointer-events: none;
}

.north-star-stage[data-first-stage-mvp="r01"] .ws1-webgpu-comparator > span {
  position: absolute;
  z-index: 2;
  top: 5px;
  left: 7px;
  color: #9cf4e2;
  font: 800 7px/1 "Avenir Next Condensed", sans-serif;
  letter-spacing: .13em;
  text-shadow: 0 1px 3px #000;
}

.north-star-stage[data-first-stage-mvp="r01"] .ws1-webgpu-comparator canvas {
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 900px), (max-height: 500px) {
  .north-star-stage[data-first-stage-mvp="r01"] .ws1-webgpu-comparator {
    display: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-actions {
    right: clamp(20px, 2.5cqw, 34px);
    bottom: 24px;
    transform: scale(1.02);
    transform-origin: right bottom;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-joystick {
    bottom: 24px;
    left: clamp(20px, 2.5cqw, 34px);
    opacity: .94;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud {
    top: max(8px, env(safe-area-inset-top));
    left: max(10px, env(safe-area-inset-left));
    width: 178px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
    min-height: 36px;
    padding: 6px 8px 6px 10px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: max(48px, calc(env(safe-area-inset-top) + 44px));
    left: max(10px, env(safe-area-inset-left));
    width: 178px;
    gap: 3px;
    padding: 5px 6px 6px 8px;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-target {
    top: max(8px, env(safe-area-inset-top));
    width: min(220px, 27cqw);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-toast {
    top: max(50px, calc(env(safe-area-inset-top) + 46px));
    width: min(270px, 32cqw);
  }

  .north-star-stage[data-first-stage-mvp="r01"] .relic-context,
  .north-star-stage[data-first-stage-mvp="r01"] >
    .first-stage-mvp-progress__interaction {
    width: min(260px, 31cqw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .north-star-stage[data-first-stage-mvp="r01"].mvp-causal-pulse .relic-screen-fx,
  .north-star-stage[data-first-stage-mvp="r01"].mvp-hit-pulse .relic-screen-fx,
  .north-star-stage[data-first-stage-mvp="r01"].mvp-contact-pulse .relic-screen-fx::before,
  .north-star-stage[data-first-stage-mvp="r01"].mvp-guard-pulse .relic-screen-fx::after,
  .north-star-stage[data-first-stage-mvp="r01"].mvp-defeat-pulse .relic-screen-fx::after,
  .north-star-stage[data-first-stage-mvp="r01"].mvp-survey-pulse .relic-screen-fx::after,
  .first-stage-mvp-progress__passive span[data-ready="true"] + i > em {
    animation: none;
    transition: none;
  }
}

/* WS1 R2: one shared HUD structure, bounded per viewport without clipping. */
.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission {
  min-height: 0;
}

.north-star-stage[data-first-stage-mvp="r01"] .relic-hud__mission strong {
  display: -webkit-box;
  overflow: visible;
  line-height: 1.3;
  text-overflow: clip;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
  min-height: 0;
  max-height: calc(100dvh - max(68px, env(safe-area-inset-top) + 64px) - max(12px, env(safe-area-inset-bottom)));
}

.north-star-stage[data-first-stage-mvp="r01"]
  .first-stage-mvp-progress__head button {
  display: grid;
  min-width: 44px;
  min-height: 32px;
  place-items: center;
}

.north-star-stage[data-first-stage-mvp="r01"]
  .first-stage-mvp-progress[data-hud-expanded="true"] {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.first-stage-mvp-progress[data-hud-expanded="true"] > small,
.first-stage-mvp-progress[data-hud-expanded="true"]
  .first-stage-mvp-progress__proof,
.first-stage-mvp-progress[data-hud-expanded="true"]
  .first-stage-mvp-progress__visual {
  flex: 0 0 auto;
  min-width: 0;
  overflow: visible;
  white-space: normal;
}

.first-stage-mvp-progress[data-hud-expanded="true"] > small {
  display: block;
  line-height: 1.35;
}

.first-stage-mvp-progress[data-hud-expanded="true"]
  .first-stage-mvp-progress__head {
  position: sticky;
  z-index: 2;
  top: -7px;
  padding-block: 3px;
  background: var(--mvp-r16-surface-raised);
}

@media (max-height: 500px) and (orientation: landscape) {
  .north-star-stage[data-first-stage-mvp="r01"]
    .relic-hud__mission strong {
    display: block;
    max-height: none;
    -webkit-line-clamp: unset;
  }

  .north-star-stage[data-first-stage-mvp="r01"] .first-stage-mvp-progress {
    top: max(72px, calc(env(safe-area-inset-top) + 68px));
    max-height: calc(100dvh - max(78px, env(safe-area-inset-top) + 74px) - max(128px, env(safe-area-inset-bottom) + 120px));
  }

  .north-star-stage[data-first-stage-mvp="r01"]
    .first-stage-mvp-progress[data-hud-expanded="true"] {
    width: min(214px, 27cqw);
  }

  .north-star-stage[data-first-stage-mvp="r01"]
    .first-stage-mvp-progress__head button {
    min-height: 36px;
  }
}
`,o8=()=>{const t=document.createElement("style");return t.dataset.firstStageMvpStyle="r01",t.textContent=n8,document.head.append(t),t},Ll=["departure","old-rail","basin","control-tower","ruin","return"];Y1();class A8{constructor(e,a,r=()=>!1,s=l8()){this.layout=e,this.openDeferredOffer=r,this.historySlot=ic(window.location.search),this.dofStrength=nd(),this.storage=new t8(s,new Cd),this.repository=new a8(this.storage,e8(this.historySlot)),this.state=Ql(this.repository.load()),this.style=o8(),this.layout.stage.dataset.firstStageMvp="r01",this.layout.stage.dataset.firstStageHistorySlot=this.historySlot,this.layout.stage.dataset.firstStageLandmarkSlot=Wr.semanticSlotId,this.layout.stage.dataset.firstStageLandmarkPresentation=Wr.presentation,this.status=this.createStatus(),this.statusBeat=qe(this.status,'[data-first-stage="beat"]'),this.statusTime=qe(this.status,'[data-first-stage="time"]'),this.statusDetail=qe(this.status,'[data-first-stage="detail"]'),this.statusProof=qe(this.status,'[data-first-stage="proof"]'),this.playerHealth=qe(this.status,'[data-first-stage="player-health"]'),this.playerHealthFill=qe(this.status,'[data-first-stage="player-health-fill"]'),this.playerHealthText=qe(this.status,'[data-first-stage="player-health-text"]'),this.passiveGuardFill=qe(this.status,'[data-first-stage="passive-fill"]'),this.passiveGuardLabel=qe(this.status,'[data-first-stage="passive-label"]'),this.interactionPrompt=qe(this.status,'[data-first-stage="interaction"]'),this.dofInput=w8(this.status,'[data-first-stage="dof"]'),this.dofOutput=v8(this.status,'[data-first-stage="dof-value"]'),this.musicStatus=_s(this.status,'[data-first-stage="music-map"]'),this.cleanup.push(this.soundscape.setPlaybackListener(i=>this.renderMusicPlaybackState(i))),this.hudToggle=_s(this.status,'[data-first-stage="hud-toggle"]'),this.meterSegments=[...this.status.querySelectorAll('[data-first-stage="meter"] i')],this.redirectButton=_s(this.status,'[data-first-stage="redirect"]'),this.layout.stage.append(this.status,this.interactionPrompt),this.loading=this.createLoadingIndicator(),this.loadingLabel=qe(this.loading,'[data-first-stage="loading-label"]'),this.loadingFill=qe(this.loading,'[data-first-stage="loading-fill"]'),this.layout.stage.append(this.loading),requestAnimationFrame(()=>{requestAnimationFrame(q1)}),this.loadingObserver=new MutationObserver(()=>{const i=this.layout.stage.querySelector('.relic-world canvas[data-testid="game-canvas"]');i!==null&&i!==this.worldCanvas&&(this.worldCanvas=i,this.loadingObserver.disconnect(),this.loadingObserver.observe(i,{attributes:!0,attributeFilter:["data-first-stage-world-art-status","data-first-stage-landmark-status"]})),this.syncLoadingStatus()}),this.loadingObserver.observe(this.layout.stage,{childList:!0,subtree:!0}),this.intentPanel=this.createIntentPanel(),this.intentButtons=[...this.intentPanel.querySelectorAll("[data-first-stage-intent]")],this.historyLabel=qe(this.intentPanel,'[data-first-stage="history"]'),this.configureTitle(),this.bindControls(),this.render(),this.syncLoadingStatus(),queueMicrotask(()=>Yi(window))}layout;openDeferredOffer;storage;repository;historySlot;soundscape=new P2;style;status;statusBeat;statusTime;statusDetail;statusProof;playerHealth;playerHealthFill;playerHealthText;passiveGuardFill;passiveGuardLabel;interactionPrompt;dofInput;dofOutput;musicStatus;hudToggle;loading;loadingLabel;loadingFill;loadingObserver;worldCanvas=null;departureLoadingUntil=0;departureLoadingTimer=null;meterSegments;redirectButton;intentPanel;intentButtons;historyLabel;cleanup=[];state;lastWorld=null;lastCausal=null;lastBuildcraft=null;recordedRunOrdinal=null;dofStrength;get isBlocking(){return this.state.returnComplete}get runtimeState(){return this.state}prepareWorld(e,a){return this.lastWorld=e,this.lastCausal=a,Ml(e,this.state,a)}prepareCommand(e,a){if(this.state.selectedIntent===null||this.state.returnComplete||this.lastWorld===null)return e;const r=Z2(this.lastWorld,a,this.lastCausal);this.layout.stage.dataset.firstStageAutoPickup=r?.id??"none";const s=r===null?e:{...e,interact:!0};return s.guard===!0||s.dodge===!0||!this.shouldGrantPassiveGuard(this.lastWorld,a.equippedBuildId)?s:{...s,passiveGuard:!0}}observeStep(e,a,r,s){const i=this.state;this.state=X2(this.state,{world:e,events:a,buildcraft:r,causal:s}),this.lastWorld=e,this.lastCausal=s,this.lastBuildcraft=r,i.beat!=="control-tower"&&this.state.beat==="control-tower"&&(this.soundscape.play("causal-read"),this.pulse("mvp-causal-pulse")),i.commitment===null&&this.state.commitment!==null&&(this.soundscape.play("commit"),this.pulse("mvp-causal-pulse")),a.some(o=>o.type==="player-damaged")&&this.pulse("mvp-hit-pulse"),a.some(o=>o.type==="guard-resolved"||o.type==="passive-guard-resolved")&&(this.soundscape.play("passive-guard"),this.pulse("mvp-guard-pulse"));const n=a.some(o=>o.type==="enemy-damaged"&&o.contact!==void 0)&&a.some(o=>o.type==="enemy-defeated");return a.some(o=>o.type==="enemy-defeated")&&!n&&(this.soundscape.play("enemy-defeated"),this.pulse("mvp-defeat-pulse")),!i.returnComplete&&this.state.returnComplete&&(this.state.commitment==="region-first"&&this.soundscape.play("warm-return"),this.recordCompletedRun()),this.soundscape.setScene(this.state.audioScene),this.render(),Ml(e,this.state,s)}presentWs1VisualContact(){this.pulse("mvp-contact-pulse")}presentWs1VisualDefeat(){this.soundscape.play("enemy-defeated"),this.pulse("mvp-defeat-pulse")}updatePresentation(e,a,r){this.lastWorld=e,this.lastCausal=r,this.lastBuildcraft=a,this.soundscape.setScene(this.state.audioScene),this.render(),this.layout.objectiveText.textContent=Tl(this.state),this.layout.zoneLabel.textContent=u8(this.state.region),this.layout.waypointName.textContent=h8(this.state.beat),this.layout.stage.dataset.firstStageBuild=a.equippedBuildId;const s=e.enemies.find(n=>n.id==="enemy-murmur");s!==void 0&&(this.layout.stage.dataset.firstStageCausalOrganismX=String(Math.round(s.x)),this.layout.stage.dataset.firstStageCausalOrganismY=String(Math.round(s.y)),this.layout.stage.dataset.firstStageCausalOrganismActive=String(s.active&&!s.defeated));const i=e.enemies.find(n=>n.id==="enemy-shell");i!==void 0&&(this.layout.stage.dataset.firstStageCausalMachineX=String(Math.round(i.x)),this.layout.stage.dataset.firstStageCausalMachineY=String(Math.round(i.y)),this.layout.stage.dataset.firstStageCausalMachineHp=String(i.hp),this.layout.stage.dataset.firstStageCausalMachineActive=String(i.active&&!i.defeated)),this.renderReturn(e)}beginNextExpedition(){const e=this.state.selectedIntent;e!==null&&this.repository.saveDraftIntent(e),this.state=Ql(this.repository.load()),this.recordedRunOrdinal=null,this.lastWorld=null,this.lastCausal=null,this.lastBuildcraft=null,this.soundscape.setScene("exploration"),this.render()}destroy(){for(const e of this.cleanup.splice(0))e();this.departureLoadingTimer!==null&&(window.clearTimeout(this.departureLoadingTimer),this.departureLoadingTimer=null),this.loadingObserver.disconnect(),this.soundscape.dispose(),this.status.remove(),this.loading.remove(),this.intentPanel.remove(),this.style.remove(),delete this.layout.stage.dataset.firstStageMvp}configureTitle(){const e=qe(this.layout.titleOverlay,".relic-title__copy"),a=qe(e,".relic-kicker"),r=qe(e,"h1"),s=qe(e,"p");a.textContent="FIRST FIELD STAGE / LOCAL MVP R01",r.innerHTML="山間盆地<br /><em>最初の遠征</em>",s.innerHTML="目的を自分で選び、旧線路を東へ渡る。<br />通常戦闘とbuildで切り抜け、一つの機能を携行装備か地域へ残す。",this.layout.stage.append(this.intentPanel),this.layout.startButton.querySelector("span")?.replaceChildren(document.createTextNode("目的を選んで出発"))}bindControls(){for(const x of this.intentButtons){const B=()=>{this.soundscape.setScene("exploration"),this.soundscape.unlock()},E=()=>{const M=x.dataset.firstStageIntent;c8(M)&&(this.state=N2(this.state,M),this.soundscape.setScene(this.state.audioScene),this.soundscape.unlock(),this.repository.saveDraftIntent(M),this.beginDepartureLoading(),this.render(),Yi(window),this.layout.startButton.click(),this.layout.stage.focus({preventScroll:!0}))};x.addEventListener("pointerdown",B,{passive:!0}),x.addEventListener("touchstart",B,{passive:!0}),x.addEventListener("click",E),this.cleanup.push(()=>{x.removeEventListener("pointerdown",B),x.removeEventListener("touchstart",B),x.removeEventListener("click",E)})}const e=()=>{this.state.selectedIntent!==null&&(this.soundscape.setScene(this.state.audioScene),Yi(window),this.soundscape.unlock())};this.layout.startButton.addEventListener("click",e),this.cleanup.push(()=>this.layout.startButton.removeEventListener("click",e));for(const x of["item","guard","relic","interact","attack"]){const B=this.layout.stage.querySelector(`[data-control="${x}"]`);if(B===null)continue;const E=()=>{this.soundscape.play("control-press"),B.classList.remove("is-first-stage-pressed"),requestAnimationFrame(()=>{B.classList.add("is-first-stage-pressed"),window.setTimeout(()=>B.classList.remove("is-first-stage-pressed"),120)})};B.addEventListener("pointerdown",E),this.cleanup.push(()=>B.removeEventListener("pointerdown",E))}const a=this.layout.stage.querySelector('[data-control="move"]'),r=this.layout.stage.querySelector('[data-control="move-knob"]'),s=new Map;for(const x of["item","guard","relic","interact","attack"]){const B=this.layout.stage.querySelector(`[data-control="${x}"]`);B!==null&&s.set(x,B)}const i=new Set,n=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"]),o=x=>{switch(x){case"Space":case"KeyJ":return"attack";case"KeyQ":case"KeyL":return"relic";case"ShiftLeft":case"ShiftRight":return"guard";case"KeyE":return"interact";case"KeyR":return"item";default:return null}},A=()=>{const x=(i.has("ArrowRight")||i.has("KeyD")?1:0)-(i.has("ArrowLeft")||i.has("KeyA")?1:0),B=(i.has("ArrowDown")||i.has("KeyS")?1:0)-(i.has("ArrowUp")||i.has("KeyW")?1:0),E=Math.max(1,Math.hypot(x,B));r?.style.setProperty("--move-x",`${x/E*24}px`),r?.style.setProperty("--move-y",`${B/E*24}px`),a?.classList.toggle("is-first-stage-keyboard",x!==0||B!==0),a?.setAttribute("data-input-active",String(x!==0||B!==0))},l=x=>{n.has(x.code)&&(i.add(x.code),A());const B=o(x.code);if(B===null)return;const E=s.get(B);E?.classList.add("is-first-stage-keyboard"),E?.setAttribute("data-input-active","true"),x.repeat||this.soundscape.play("control-press")},c=x=>{n.has(x.code)&&(i.delete(x.code),A());const B=o(x.code);if(B===null)return;const E=s.get(B);E?.classList.remove("is-first-stage-keyboard"),E?.setAttribute("data-input-active","false")},d=()=>{i.clear(),A();for(const x of s.values())x.classList.remove("is-first-stage-keyboard"),x.setAttribute("data-input-active","false")};window.addEventListener("keydown",l,!0),window.addEventListener("keyup",c,!0),window.addEventListener("blur",d),this.cleanup.push(()=>{window.removeEventListener("keydown",l,!0),window.removeEventListener("keyup",c,!0),window.removeEventListener("blur",d),d()});const u=()=>{queueMicrotask(()=>{this.soundscape.setMuted(this.layout.muteButton.getAttribute("aria-pressed")==="true")})};this.layout.muteButton.addEventListener("click",u),this.cleanup.push(()=>this.layout.muteButton.removeEventListener("click",u));const h=()=>{this.soundscape.setScene(this.state.audioScene),this.soundscape.unlock()};this.musicStatus.addEventListener("click",h),this.cleanup.push(()=>this.musicStatus.removeEventListener("click",h));const g=()=>{this.state.selectedIntent===null||this.soundscape.playbackState==="playing"||this.soundscape.playbackState==="starting"||(this.soundscape.setScene(this.state.audioScene),this.soundscape.unlock())};this.layout.stage.addEventListener("pointerdown",g,!0),this.layout.stage.addEventListener("touchstart",g,{capture:!0,passive:!0}),window.addEventListener("keydown",g,!0),this.cleanup.push(()=>{this.layout.stage.removeEventListener("pointerdown",g,!0),this.layout.stage.removeEventListener("touchstart",g,!0),window.removeEventListener("keydown",g,!0)});const p=()=>{this.dofStrength=ew(this.dofInput.valueAsNumber),this.dofInput.value=String(this.dofStrength);const x=Pn(this.dofStrength,window.innerWidth);this.dofOutput.value=x.toFixed(2),this.dofInput.setAttribute("aria-valuetext",`ボケ強度 ${x.toFixed(2)}`),ul(window,this.dofStrength),this.layout.stage.dataset.firstStageDofRequested=String(this.dofStrength),this.layout.stage.dataset.firstStageDofEffectiveUi=String(x)};this.dofInput.addEventListener("input",p),this.cleanup.push(()=>this.dofInput.removeEventListener("input",p)),ul(window,this.dofStrength);const m=()=>{const x=this.status.dataset.hudExpanded!=="true";this.status.dataset.hudExpanded=String(x),this.hudToggle.setAttribute("aria-expanded",String(x)),this.hudToggle.textContent=x?"HUD −":"HUD +"};this.hudToggle.addEventListener("click",m),this.cleanup.push(()=>this.hudToggle.removeEventListener("click",m));const f=()=>{this.tryRedirectAtTower()};this.redirectButton.addEventListener("click",f),this.cleanup.push(()=>this.redirectButton.removeEventListener("click",f));const w=x=>{x.code!=="KeyE"||x.repeat||(this.tryCompleteReturn()||this.tryRedirectAtTower()||this.trySurveySite()||this.rejectInvalidContextualInteraction())&&(x.preventDefault(),x.stopImmediatePropagation())};window.addEventListener("keydown",w,!0),this.cleanup.push(()=>window.removeEventListener("keydown",w,!0));const v=this.layout.stage.querySelector('[data-control="interact"]'),y=x=>{(this.tryCompleteReturn()||this.tryRedirectAtTower()||this.trySurveySite()||this.rejectInvalidContextualInteraction())&&(x.preventDefault(),x.stopImmediatePropagation())};v?.addEventListener("pointerdown",y,!0),this.cleanup.push(()=>v?.removeEventListener("pointerdown",y,!0));const P=_s(this.intentPanel,'[data-first-stage="compare"]'),b=()=>{const x=this.historySlot==="a"?"b":"a";window.location.href=Tu(window.location.href,x)};P.addEventListener("click",b),this.cleanup.push(()=>P.removeEventListener("click",b))}tryRedirectAtTower(){const e=this.lastWorld,a=this.lastCausal;return e===null||a===null||this.state.redirectedAtTower||a.phase!=="coupling-observed"||a.evidence.machineDefeated||a.ledger.entries.length>0||this.state.surveyedSites.length<2||!en(e)?!1:(this.state=H2(this.state),this.layout.statusLive.textContent="雨水制御塔の手動弁を切り替え、湿潤中継点への追跡を別の流路へ逸らしました。",this.soundscape.play("redirect"),this.pulse("mvp-causal-pulse"),this.render(),!0)}tryCompleteReturn(){const e=this.lastWorld;return e===null||this.state.beat!=="return"||this.state.returnComplete||Math.hypot(e.player.x-Ae.x,e.player.y-Ae.y)>130?!1:(this.state=G2(this.state),this.layout.statusLive.textContent=this.state.commitment==="region-first"?"限定水試験が通り、温かい一皿を囲む小さな集まりが始まりました。":"携行buildの強化を持ち帰りました。共同口と食卓はまだ変わっていません。",this.state.commitment==="region-first"&&this.soundscape.play("warm-return"),this.recordCompletedRun(),this.render(),this.renderReturn(e),!0)}trySurveySite(){const e=this.lastWorld;if(e===null||this.state.returnComplete)return!1;const a=dl(e.player.x,e.player.y,this.state.surveyedSites);return a===null?!1:(this.state=_2(this.state,a.id),this.layout.statusLive.textContent=`${a.label}：${a.finding}`,this.soundscape.play("survey"),this.pulse("mvp-survey-pulse"),this.render(),!0)}rejectInvalidContextualInteraction(){const e=this.lastWorld;if(e===null)return!1;const a=this.layout.outcomePanel.getAttribute("aria-hidden")==="false";if(!a&&this.layout.stage.dataset.firstStageOfferDeferred==="true"&&this.openDeferredOffer()){const s="回収済み素材の用途を選ぶ";return this.interactionPrompt.textContent=s,this.interactionPrompt.dataset.state="action",this.layout.stage.dataset.firstStageInteractionPrompt=s,this.layout.stage.dataset.firstStageInteractionFeedback="offer-opened",!0}const r=Rl(e,a);return this.interactionPrompt.textContent=r.prompt,this.layout.stage.dataset.firstStageInteractionPrompt=r.prompt,r.result==="allow"?(this.layout.stage.dataset.firstStageInteractionFeedback="allow",!1):(this.layout.stage.dataset.firstStageInteractionFeedback=r.reason,this.layout.statusLive.textContent=r.announcement,r.reason==="choose-response"&&this.layout.outcomePanel.querySelector("button:not(:disabled)")?.focus({preventScroll:!0}),!0)}recordCompletedRun(){const e=q2(this.state);e===null||this.recordedRunOrdinal===e.runOrdinal||(this.repository.completeRun(e),this.recordedRunOrdinal=e.runOrdinal)}render(){const e=this.repository.load(),a=this.state.selectedIntent;this.intentPanel.setAttribute("aria-hidden",String(a!==null)),this.intentPanel.inert=a!==null,this.layout.startButton.disabled=a===null,this.layout.startButton.setAttribute("aria-disabled",String(a===null));const r=this.layout.startButton.querySelector("span");r!==null&&(r.textContent=a===null?"目的を選んで出発":"この目的で出発");for(const h of this.intentButtons)h.setAttribute("aria-pressed",String(h.dataset.firstStageIntent===a));const s=e.completedRuns.at(-1);this.historyLabel.textContent=s===void 0?`比較スロット${this.historySlot.toUpperCase()} / 未完了`:`スロット${this.historySlot.toUpperCase()} 前回 ${p8(s.commitment)} / ${kl(s.durationTicks)} / ${s.buildsUsed.length} BUILD`,this.statusBeat.textContent=d8(this.state.beat),this.statusTime.textContent=kl(this.state.telemetry.elapsedTicks),this.statusDetail.textContent=Tl(this.state),this.statusProof.textContent=`${this.state.telemetry.defeatedEnemies} DOWN · ${this.state.telemetry.dodges} DODGE · ${this.state.telemetry.justGuards} JUST · ${this.state.telemetry.passiveGuards} AUTO · ${this.state.telemetry.decisiveSkills} SKILL · ${this.state.surveyedSites.length}/4 TRACE · ${this.state.telemetry.buildsUsed.length}/2 BUILD`;const i=this.lastWorld?.player.hp??100,n=this.lastWorld?.player.maxHp??100,o=Math.max(0,Math.min(1,i/Math.max(1,n)));this.playerHealthFill.style.width=`${Math.round(o*100)}%`,this.playerHealthText.textContent=`${i} / ${n}`,this.playerHealth.dataset.state=o<=.3?"critical":o<=.6?"warning":"stable",this.playerHealth.setAttribute("aria-valuenow",String(i)),this.playerHealth.setAttribute("aria-valuemax",String(n));const A=this.lastBuildcraft?.equippedBuildId==="breach-driver"?88:72;this.passiveGuardFill.style.width=`${Math.min(100,Math.round(this.state.passiveGuardMeter/A*100))}%`;const l=this.state.passiveGuardCooldownTicks===0&&this.state.passiveGuardMeter>=A,c=window.innerWidth<=900;this.passiveGuardLabel.textContent=l?c?"DEFLECT / READY":"AUTO DEFLECT / READY":this.state.passiveGuardCooldownTicks>0?c?"DEFLECT / RECOVER":"AUTO DEFLECT / RECOVER":c?"DEFLECT / CHARGE":"AUTO DEFLECT / CHARGING",this.passiveGuardLabel.dataset.ready=String(l),this.layout.stage.dataset.ws1AutoDeflectReady=String(l),this.layout.stage.style.setProperty("--ws1-auto-deflect-progress",`${Math.min(1,this.state.passiveGuardMeter/A)*360}deg`),this.renderInteractionPrompt();const d=f8(this.state.beat);this.meterSegments.forEach((h,g)=>{h.classList.toggle("is-past",g<=d)});const u=this.canShowRedirect();this.redirectButton.classList.toggle("is-visible",u),this.redirectButton.disabled=!u,this.layout.stage.dataset.firstStageBeat=this.state.beat,this.layout.stage.dataset.firstStageRegion=this.state.region,this.layout.stage.dataset.firstStageIntent=a??"none",this.layout.stage.dataset.firstStageAudio=this.state.audioScene,this.layout.stage.dataset.firstStageRedirected=String(this.state.redirectedAtTower),this.layout.stage.dataset.firstStageReturnComplete=String(this.state.returnComplete),this.layout.stage.dataset.firstStageCommitment=this.state.commitment??"none",this.layout.stage.dataset.firstStageResolution=this.state.resolution??"none",this.layout.stage.dataset.firstStageElapsedTicks=String(this.state.telemetry.elapsedTicks),this.layout.stage.dataset.firstStageBuildsUsed=this.state.telemetry.buildsUsed.join(","),this.layout.stage.dataset.firstStagePersistence=this.storage.persistence,this.layout.stage.dataset.firstStageSurveyed=this.state.surveyedSites.join(","),this.layout.stage.dataset.firstStagePassiveGuardMeter=String(Math.round(this.state.passiveGuardMeter)),this.layout.stage.dataset.firstStagePassiveGuards=String(this.state.telemetry.passiveGuards),this.layout.stage.dataset.firstStageDefeatedEnemies=String(this.state.telemetry.defeatedEnemies),this.layout.stage.dataset.firstStageDodges=String(this.state.telemetry.dodges),this.layout.stage.dataset.firstStageJustGuards=String(this.state.telemetry.justGuards),this.layout.stage.dataset.firstStageDecisiveSkills=String(this.state.telemetry.decisiveSkills),this.renderHybridQualityControls()}renderHybridQualityControls(){this.dofInput.value=String(this.dofStrength);const e=Pn(this.dofStrength,window.innerWidth);this.dofOutput.value=e.toFixed(2),this.dofInput.setAttribute("aria-valuetext",`ボケ強度 ${e.toFixed(2)}`),this.renderMusicPlaybackState(this.soundscape.playbackState),this.layout.stage.dataset.firstStageDofRequested=String(this.dofStrength),this.layout.stage.dataset.firstStageDofEffectiveUi=String(e),this.layout.stage.dataset.firstStageMusicMapping="b-continuous",this.layout.stage.dataset.firstStageMusicField="b",this.layout.stage.dataset.firstStageMusicCombat="b",this.layout.stage.dataset.firstStageMusicSceneSwitching="false",this.layout.stage.dataset.firstStageMusicRights=Dd.rightsStatus}renderMusicPlaybackState(e){const a=e==="playing"?"BGM B / PLAYING":e==="starting"?"BGM B / STARTING":e==="blocked"?"BGM B / TAP TO PLAY":Qn.label;this.musicStatus.textContent=a,this.musicStatus.dataset.playback=e,this.musicStatus.setAttribute("aria-label",e==="playing"?"BGM B を再生中。押すと再生を再確認":"BGM B を再生"),this.layout.stage.dataset.firstStageMusicPlayback=e}renderInteractionPrompt(){const e=this.lastWorld;if(e===null||this.state.selectedIntent===null){this.interactionPrompt.textContent="目的を選ぶ",this.interactionPrompt.dataset.state="idle";return}if(this.canShowRedirect()){this.interactionPrompt.textContent="E 手動弁を切り替える — 雨水制御塔",this.interactionPrompt.dataset.state="action";return}if(this.lastCausal?.phase==="coupling-observed"&&!this.lastCausal.evidence.machineDefeated&&this.lastCausal.ledger.entries.length===0&&!this.state.redirectedAtTower&&en(e)&&this.state.surveyedSites.length<2){this.interactionPrompt.textContent=`迂回には活動痕があと${2-this.state.surveyedSites.length}点必要 — 戦い抜くこともできる`,this.interactionPrompt.dataset.state="reject",this.layout.stage.dataset.firstStageInteractionPrompt=this.interactionPrompt.textContent;return}if(this.state.beat==="return"&&!this.state.returnComplete){this.interactionPrompt.textContent="帰還地の依頼板へ戻る — E 帰還を確定",this.interactionPrompt.dataset.state="action";return}if(this.layout.stage.dataset.firstStageOfferDeferred==="true"){this.interactionPrompt.textContent="E 回収済み素材を解析 — 戦闘は継続できる",this.interactionPrompt.dataset.state="action",this.layout.stage.dataset.firstStageInteractionPrompt=this.interactionPrompt.textContent;return}const a=dl(e.player.x,e.player.y,this.state.surveyedSites);if(a!==null){this.interactionPrompt.textContent=`E ${a.action} — ${a.label}`,this.interactionPrompt.dataset.state="action",this.layout.stage.dataset.firstStageInteractionPrompt=this.interactionPrompt.textContent;return}const r=Rl(e,this.layout.outcomePanel.getAttribute("aria-hidden")==="false");this.interactionPrompt.textContent=r.prompt,this.interactionPrompt.dataset.state=r.result,this.layout.stage.dataset.firstStageInteractionPrompt=r.prompt}canShowRedirect(){return this.lastWorld!==null&&this.lastCausal!==null&&!this.state.redirectedAtTower&&this.state.surveyedSites.length>=2&&this.lastCausal.phase==="coupling-observed"&&!this.lastCausal.evidence.machineDefeated&&this.lastCausal.ledger.entries.length===0&&en(this.lastWorld)}shouldGrantPassiveGuard(e,a){const r=a==="counter-cutter"?72:88;return this.state.passiveGuardCooldownTicks>0||this.state.passiveGuardMeter<r?!1:e.enemies.some(s=>{if(!s.active||s.defeated||s.disposition!=="hostile"||s.attack.phase!=="telegraph"||s.attack.ticksRemaining>1)return!1;const i=Un[s.kind];return Math.hypot(e.player.x-s.x,e.player.y-s.y)<=i.attackRange+s.radius+e.player.radius})}renderReturn(e){this.state.returnComplete&&(this.layout.resultTitle.textContent=m8(this.state),this.layout.resultBody.textContent=g8(this.state),this.layout.restartButton.textContent="同じ世界で次の遠征へ",this.layout.resultPanel.setAttribute("aria-hidden","false"),this.layout.resultPanel.inert=!1)}createStatus(){const e=document.createElement("section");return e.className="first-stage-mvp-progress",e.setAttribute("aria-label","最初のステージ進行"),e.dataset.hudExpanded="false",e.innerHTML=`
      <div class="first-stage-mvp-progress__head">
        <span><i>FIRST STAGE / </i><b data-first-stage="beat">INTENT</b></span>
        <b data-first-stage="time">00:00</b>
        <button data-first-stage="hud-toggle" type="button" aria-expanded="false">HUD +</button>
      </div>
      <div class="first-stage-mvp-progress__meter" data-first-stage="meter" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <div class="first-stage-mvp-progress__health" data-first-stage="player-health"
        role="meter" aria-label="主人公の体力" aria-valuemin="0" aria-valuenow="100" aria-valuemax="100">
        <span><i>BODY / F-01</i><b data-first-stage="player-health-text">100 / 100</b></span>
        <i><em data-first-stage="player-health-fill"></em></i>
      </div>
      <small data-first-stage="detail">帰還地で今回の目的を選ぶ</small>
      <div class="first-stage-mvp-progress__proof">
        <span data-first-stage="proof">0 DOWN · 0 DODGE · 0 JUST · 0 SKILL · 0/2 BUILD</span>
      </div>
      <div class="first-stage-mvp-progress__passive" aria-label="自動防御の蓄積">
        <span data-first-stage="passive-label">AUTO DEFLECT / CHARGING</span>
        <i><em data-first-stage="passive-fill"></em></i>
      </div>
      <div class="first-stage-mvp-progress__visual" aria-label="景観と音楽の比較設定">
        <label>
          <span>DEPTH</span>
          <input data-first-stage="dof" type="range"
            min="${et.minimum}"
            max="${et.maximum}"
            step="${et.step}"
            value="${this.dofStrength}"
            aria-label="深度ボケの強さ" />
          <output data-first-stage="dof-value">${this.dofStrength.toFixed(2)}</output>
        </label>
        <button class="first-stage-mvp-progress__music" data-first-stage="music-map" type="button">
          ${Qn.label}
        </button>
        <small>BGM RIGHTS HOLD</small>
      </div>
      <div class="first-stage-mvp-progress__interaction" data-first-stage="interaction" data-state="idle">
        目的を選ぶ
      </div>
      <button class="first-stage-mvp-progress__redirect" data-first-stage="redirect" type="button">
        <strong>手動弁を切り替える / E</strong>
        <small>戦闘を終わらせず、湿潤中継点への追跡を別流路へ逸らす</small>
      </button>
    `,e}createLoadingIndicator(){const e=document.createElement("aside");return e.className="first-stage-mvp-loading",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.innerHTML=`
      <span>WORLD STREAM</span>
      <strong data-first-stage="loading-label">景観を準備しています</strong>
      <i aria-hidden="true"><em data-first-stage="loading-fill"></em></i>
    `,e}syncLoadingStatus(){const e=Fl(this.worldCanvas?.dataset.firstStageWorldArtStatus,"deferred"),a=Fl(this.worldCanvas?.dataset.firstStageLandmarkStatus,"loading"),r=j1(e,a),s=performance.now(),i=this.departureLoadingUntil>s||this.departureLoadingUntil>0&&r.phase!=="ready";if(this.loading.classList.toggle("is-departure",i),i){this.loading.dataset.phase="departure",this.loadingLabel.textContent=r.phase==="ready"?"遠征ルートを展開しています":r.label,this.loadingFill.style.width=`${Math.max(18,r.progress)}%`,this.layout.stage.dataset.firstStageLoadingPhase="departure";return}this.departureLoadingUntil>0&&(this.departureLoadingUntil=0),this.loading.dataset.phase=r.phase,this.loadingLabel.textContent=r.label,this.loadingFill.style.width=`${r.progress}%`,this.layout.stage.dataset.firstStageLoadingPhase=r.phase}beginDepartureLoading(){this.departureLoadingUntil=performance.now()+900,this.departureLoadingTimer!==null&&window.clearTimeout(this.departureLoadingTimer),this.departureLoadingTimer=window.setTimeout(()=>{this.departureLoadingTimer=null,this.syncLoadingStatus()},920),this.syncLoadingStatus()}createIntentPanel(){const e=document.createElement("section");e.className="first-stage-mvp-intents",e.setAttribute("aria-label","今回の目的");const a=document.createElement("header");a.className="first-stage-mvp-intents__intro",a.innerHTML=`
      <span>FIRST FIELD STAGE / LOCAL MVP R01</span>
      <h2>山間盆地<br /><em>最初の遠征</em></h2>
      <p>目的を自分で選び、旧線路を東へ渡る。通常戦闘とbuildで切り抜け、<br />一つの機能を携行装備か地域へ残す。</p>
    `,e.append(a);for(const i of T2){const n=document.createElement("button");n.type="button",n.dataset.firstStageIntent=i.id,n.setAttribute("aria-pressed","false"),n.innerHTML=`<strong>${i.label}</strong><small>${i.detail}</small>`,e.append(n)}const r=document.createElement("div");r.className="first-stage-mvp-intents__history";const s=this.historySlot==="a"?"B":"A";return r.innerHTML=`
      <span data-first-stage="history">比較履歴なし</span>
      <button data-first-stage="compare" type="button">比較スロット${s}へ</button>
    `,e.append(r),e}pulse(e){this.layout.stage.classList.remove(e),requestAnimationFrame(()=>{this.layout.stage.classList.add(e),window.setTimeout(()=>this.layout.stage.classList.remove(e),180)})}}const l8=()=>{try{return window.localStorage}catch{return null}},c8=t=>t==="water-safety"||t==="field-build"||t==="rail-passage",Fl=(t,e)=>t==="deferred"||t==="loading"||t==="ready"||t==="error"||t==="disabled"?t:e,d8=t=>{switch(t){case"choose-intent":return"INTENT";case"departure":return"DEPART";case"old-rail":return"OLD RAIL";case"basin":return"BASIN";case"control-tower":return"CONTROL";case"ruin":return"TUNNEL";case"return":return"RETURN";case"warm-return":return"WARM RETURN";case"field-return":return"FIELD RETURN";case"unresolved-return":return"OPEN RETURN"}},u8=t=>{switch(t){case"settlement":return"盆地西端・帰還地";case"old-rail":return"旧線路・西側路盤";case"river-basin":return"河岸・越流盆地";case"control-tower":return"雨水管制塔・中央水庭";case"coastal-tunnel":return"海側トンネル前・遺構"}},h8=t=>t==="departure"||t==="choose-intent"?"帰還地・依頼板":t==="old-rail"?"旧線路の分岐":t==="basin"||t==="control-tower"?"雨水制御塔 / SEMANTIC":t==="ruin"?"海側トンネル前":"帰還地・共同口",f8=t=>{if(t==="warm-return"||t==="field-return"||t==="unresolved-return")return Ll.length-1;const e=Ll.indexOf(t);return Math.max(0,e)},p8=t=>t==="region-first"?"REGION-FIRST":t==="field-first"?"FIELD-FIRST":"UNRESOLVED",m8=t=>t.commitment==="region-first"?"水を試し、一皿を囲む":t.commitment==="field-first"?"強化を持ち帰る":"決めずに戻る",g8=t=>t.commitment==="region-first"?"共同口の限定水試験が通った。安全が証明されたのはこの範囲だけだが、湯気の立つ一皿が配られ、残れる人が小さく集まり始めた。携行buildの強化はない。":t.commitment==="field-first"?"出所を記録した機能は携行buildへ残った。次の遠征は強く始められる。一方、共同口の水試験、温かい一皿、小さな集まりはまだ成立していない。":"通常のlootと戦闘記録だけを持ち帰った。共同口も携行buildも決定的には変わっていない。因果イベントを無視しても、次の遠征とbuild追求は続けられる。",qe=(t,e)=>{const a=t.querySelector(e);if(a===null)throw new Error(`First-stage MVP element is missing: ${e}`);return a},_s=(t,e)=>{const a=t.querySelector(e);if(a===null)throw new Error(`First-stage MVP button is missing: ${e}`);return a},w8=(t,e)=>{const a=t.querySelector(e);if(a===null)throw new Error(`First-stage MVP input is missing: ${e}`);return a},v8=(t,e)=>{const a=t.querySelector(e);if(a===null)throw new Error(`First-stage MVP output is missing: ${e}`);return a};class y8{constructor(e){this.layout=e,this.status=this.createStatus(),this.buildName=Ct(this.status,'[data-r10="build-name"]'),this.buildLevel=Ct(this.status,'[data-r10="build-level"]'),this.resourceName=Ct(this.status,'[data-r10="resource-name"]'),this.resourceValue=Ct(this.status,'[data-r10="resource-value"]'),this.resourceFill=Ct(this.status,'[data-r10="resource-fill"]'),this.salvage=Ct(this.status,'[data-r10="salvage"]'),this.ward=Ct(this.status,'[data-r10="ward"]'),this.chooser=this.createChooser(),this.chooserTitle=Ct(this.chooser,'[data-r10="offer-title"]'),this.chooserMechanism=Ct(this.chooser,'[data-r10="offer-mechanism"]'),this.chooserCurrent=Ct(this.chooser,'[data-r10="current-build"]'),this.chooserCandidate=Ct(this.chooser,'[data-r10="candidate-build"]'),this.chooserActions=Ct(this.chooser,'[data-r10="offer-actions"]'),this.causalEvent=new y2(this.layout,this.status),this.firstStageMvp=On(window.location.search,window.location.pathname)?new A8(this.layout,this.status,()=>this.openDeferredOffer()):null,this.state=this.causalEvent.restoreFieldBuild(this.state),this.layout.stage.append(this.status,this.chooser),this.render()}layout;state=No();status;buildName;buildLevel;resourceName;resourceValue;resourceFill;salvage;ward;chooser;chooserTitle;chooserMechanism;chooserCurrent;chooserCandidate;chooserActions;causalEvent;firstStageMvp;mvpOfferDeferred=!1;cleanup=[];get isBlocking(){return this.state.pendingOffer!==null&&!this.mvpOfferDeferred||this.firstStageMvp?.isBlocking===!0}get buildcraftState(){return this.state}get hasFirstStageMvp(){return this.firstStageMvp!==null}prepareWorld(e,a=1){const r=ch(e,this.state,a),s=this.firstStageMvp?.prepareWorld(r,this.causalEvent.causalState)??r;return this.causalEvent.prepareWorld(s)}prepareCommand(e){const a=this.firstStageMvp?.prepareCommand(e,this.state)??e;return dh(this.state,a)}observeStep(e,a,r){const s=uh(e,a,r,this.state),i=this.state.pendingOffer;this.state=s.buildcraft.state;const n=this.causalEvent.observeStep(s.world,r),o=this.firstStageMvp?.observeStep(n,r,this.state,this.causalEvent.causalState)??n;return this.firstStageMvp!==null&&i===null&&this.state.pendingOffer!==null?(this.mvpOfferDeferred=!0,this.layout.statusLive.textContent=$2(o)?"遺物を自動回収しました。戦闘を続けるか、Eで用途解析を開けます。":"遺物を自動回収しました。準備ができたらEで用途解析を開けます。"):this.state.pendingOffer===null&&(this.mvpOfferDeferred=!1),this.render(),{...s,world:o}}recoverResource(e,a){const r=hc(this.state,e,a);return this.state=r.state,r.events.length>0&&this.render(),r.events}presentWs1VisualContact(){this.firstStageMvp?.presentWs1VisualContact()}presentWs1VisualDefeat(){this.firstStageMvp?.presentWs1VisualDefeat()}beginNextExpedition(){this.causalEvent.beginNextExpedition(),this.state=No(),this.mvpOfferDeferred=!1,this.state=this.causalEvent.restoreFieldBuild(this.state),this.firstStageMvp?.beginNextExpedition(),this.render()}updatePresentation(e){const a=Oa[this.state.equippedBuildId],r=Na(this.state);this.layout.stage.dataset.relicBuild=a.id,this.layout.stage.dataset.relicBuildLevel=String(r.level),this.layout.stage.dataset.relicResource=String(this.state.resource),this.layout.stage.dataset.relicResourceMax=String(r.resourceMaximum);const s=this.layout.stage.dataset.ws1ActionProfile==="ws1-r01",i=this.state.resource>=r.resourceSkillCost,n=e.player.relicCooldownTicks<=0,o=i&&n;s&&(this.layout.stage.dataset.relicSkillReady=String(o),this.layout.stage.dataset.relicRecoveryMode="time-plus-action",this.layout.stage.style.setProperty("--ws1-relic-progress",`${Math.min(Math.min(1,this.state.resource/Math.max(1,r.resourceSkillCost)),e.player.relicCooldownMaxTicks<=0?1:1-e.player.relicCooldownTicks/e.player.relicCooldownMaxTicks)*360}deg`)),this.layout.stage.dataset.namedWard=this.state.namedEnemyWard,this.layout.weaponName.textContent=$r(a.id),this.layout.weaponDetail.textContent=`LV.${r.level} / 威力 ${16+r.weaponDamageBonus} / ${a.effectDomain}`,this.layout.relicName.textContent=`${a.resource.name} ${this.state.resource}/${r.resourceMaximum} / `+(s?o?"大技 READY":n?"回復中・時間+攻撃":"再構成中":e.player.relicCooldownTicks<=0?"大技 READY":"再構成中"),this.state.pendingOffer!==null?this.layout.objectiveText.textContent=this.mvpOfferDeferred?"遺物は回収済み。Eで用途解析（戦闘継続可）":"回収した遺物の用途を決める":this.state.processedLootIds.includes("edge-coil")?this.state.processedLootIds.includes("gravity-weight")?this.state.processedLootIds.includes("relay-capacitor")?this.state.namedEnemyWard==="intact"?this.layout.objectiveText.textContent=`${a.resource.name}を満たし、大技で反響防壁を破る`:this.layout.objectiveText.textContent="防壁を失った反響体を制圧する":this.layout.objectiveText.textContent="中継蓄相器でbuildを強化する":this.layout.objectiveText.textContent="局所重錘から第二buildを組む":this.layout.objectiveText.textContent="縁断コイルを回収し、分解材を得る",this.causalEvent.updatePresentation(),this.firstStageMvp?.updatePresentation(e,this.state,this.causalEvent.causalState)}destroy(){for(const e of this.cleanup.splice(0))e();this.firstStageMvp?.destroy(),this.causalEvent.destroy(),this.status.remove(),this.chooser.remove()}render(){const e=Oa[this.state.equippedBuildId],a=Na(this.state);this.buildName.textContent=$r(e.id),this.buildLevel.textContent=`LV.${a.level} / ${e.effectDomain}`,this.resourceName.textContent=e.resource.name,this.resourceValue.textContent=`${this.state.resource} / ${a.resourceMaximum}`,this.resourceFill.style.width=`${Math.round(this.state.resource/a.resourceMaximum*100)}%`,this.salvage.textContent=String(this.state.salvage).padStart(2,"0"),this.ward.textContent=this.state.namedEnemyWard==="intact"?"WARD INTACT":"WARD OPEN",this.ward.dataset.state=this.state.namedEnemyWard,this.renderOffer()}renderOffer(){const e=this.state.pendingOffer,a=e!==null&&!this.mvpOfferDeferred;if(this.chooser.setAttribute("aria-hidden",String(!a)),this.chooser.inert=!a,this.chooser.dataset.mvpDeferred=String(e!==null&&this.mvpOfferDeferred),this.layout.stage.dataset.firstStageOfferDeferred=String(e!==null&&this.mvpOfferDeferred),this.layout.stage.classList.toggle("is-r10-buildcraft-open",a),this.chooserActions.replaceChildren(),e===null||!a){this.chooser.dataset.causalMaterial="false";return}const r=Oa[this.state.equippedBuildId],s=Na(this.state);if(this.chooserTitle.textContent=e.name,this.chooserMechanism.textContent=e.explanation,this.chooserCurrent.innerHTML=Ol("CURRENT BUILD",r,s.level),e.candidateBuildId!==null){const i=Oa[e.candidateBuildId],n=this.state.buildLevels[e.candidateBuildId];this.chooserCandidate.innerHTML=Ol("CANDIDATE",i,n),this.addAction("equip","装備する","buildと戦闘規則を切り替える")}else this.chooserCandidate.innerHTML=`
        <span>CATALYST</span>
        <strong>共通増幅器</strong>
        <p>現在のbuildを一段階強化する。必要分解材 ${r.upgrade.salvageCost}。</p>
      `,this.addAction("upgrade","強化に使う",`分解材 ${r.upgrade.salvageCost} を消費`);this.addAction("disassemble","分解する",`分解材 +${e.salvageValue}`),this.causalEvent.decorateOffer({offer:e,chooser:this.chooser,title:this.chooserTitle,mechanism:this.chooserMechanism,actions:this.chooserActions,onRegionCommit:()=>this.handleRegionCommit()}),queueMicrotask(()=>{this.chooserActions.querySelector("button")?.focus({preventScroll:!0})})}addAction(e,a,r){const s=document.createElement("button");s.type="button",s.dataset.r10Action=e,s.innerHTML=`<strong>${a}</strong><small>${r}</small>`;const i=()=>this.handleAction(e);s.addEventListener("click",i),this.cleanup.push(()=>s.removeEventListener("click",i)),this.chooserActions.append(s)}handleAction(e){const a=lh(this.state,e);this.state=a.state,this.state.pendingOffer===null&&(this.mvpOfferDeferred=!1);const r=this.causalEvent.commitFieldFirst(a.events);e==="disassemble"&&a.events.some(i=>i.type==="loot-disassembled")&&this.causalEvent.leaveUnresolved();const s=r??x8(a.events[0]);s!==null&&(this.layout.statusLive.textContent=s),a.events.some(i=>i.type!=="action-rejected")&&this.layout.dossier.setAttribute("aria-hidden","true"),this.render(),this.isBlocking||this.layout.stage.focus({preventScroll:!0})}openDeferredOffer(){return!this.mvpOfferDeferred||this.state.pendingOffer===null?!1:(this.mvpOfferDeferred=!1,this.layout.statusLive.textContent="回収済み遺物の用途解析を開きました。",this.render(),!0)}handleRegionCommit(){const e=this.causalEvent.commitRegionFirst();e===null||this.state.pendingOffer===null||(this.state={...this.state,pendingOffer:null},this.mvpOfferDeferred=!1,this.layout.statusLive.textContent=e,this.layout.dossier.setAttribute("aria-hidden","true"),this.render(),this.layout.stage.focus({preventScroll:!0}))}createStatus(){const e=document.createElement("aside");return e.className="r10-buildcraft-status",e.setAttribute("aria-label","遺物build状態"),e.innerHTML=`
      <div class="r10-buildcraft-status__head">
        <span>RELIC BUILD / LIVE</span>
        <b data-r10="ward" data-state="intact">WARD INTACT</b>
      </div>
      <strong data-r10="build-name">COUNTER CUTTER</strong>
      <small data-r10="build-level">LV.1</small>
      <div class="r10-buildcraft-status__resource">
        <span data-r10="resource-name">位相電荷</span>
        <b data-r10="resource-value">0 / 4</b>
        <i><em data-r10="resource-fill"></em></i>
      </div>
      <div class="r10-buildcraft-status__salvage">
        <span>DISASSEMBLY MATERIAL</span><b data-r10="salvage">00</b>
      </div>
    `,e}createChooser(){const e=document.createElement("section");return e.className="r10-buildcraft-chooser",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","r10-buildcraft-title"),e.setAttribute("aria-hidden","true"),e.inert=!0,e.innerHTML=`
      <header>
        <span>F.R.A.M. / RELIC ANALYSIS</span>
        <h2 id="r10-buildcraft-title" data-r10="offer-title">未分類遺物</h2>
        <p data-r10="offer-mechanism"></p>
      </header>
      <div class="r10-buildcraft-chooser__compare">
        <article data-r10="current-build"></article>
        <i aria-hidden="true">→</i>
        <article data-r10="candidate-build"></article>
      </div>
      <div class="r10-buildcraft-chooser__actions" data-r10="offer-actions"></div>
    `,e}}function Ol(t,e,a){return`
    <span>${t}</span>
    <strong>${$r(e.id)} / LV.${a}</strong>
    <p>${e.mechanism}</p>
    <dl>
      <div><dt>IMPACT</dt><dd>${e.budget.impact}</dd></div>
      <div><dt>REACH</dt><dd>${e.budget.reach}</dd></div>
      <div><dt>TEMPO</dt><dd>${e.budget.tempo}</dd></div>
      <div><dt>MOVE</dt><dd>${e.budget.mobility}</dd></div>
      <div><dt>CONTROL</dt><dd>${e.budget.control}</dd></div>
    </dl>
  `}function $r(t){return t==="counter-cutter"?"COUNTER CUTTER":"BREACH DRIVER"}function x8(t){if(t===void 0)return null;switch(t.type){case"build-equipped":return`${$r(t.buildId)}を装備。戦闘規則を更新しました。`;case"loot-disassembled":return`遺物を分解。分解材を${t.salvageGained}得ました。`;case"build-upgraded":return`${$r(t.buildId)}をLV.${t.level}へ強化しました。`;case"action-rejected":return t.reason;default:return null}}function Ct(t,e){const a=t.querySelector(e);if(a===null)throw new Error(`R10 buildcraft element is missing: ${e}`);return a}const Nr=1e3/At,Ul=5,b8=Math.ceil(At*.7),an=At*5,kn="relic-frontier-b-02",rn=new WeakMap;function D8(t){return t.moveX!==0||t.moveY!==0||t.attack||t.guard||t.dodge||t.activateRelic||t.useItem||t.interact||t.switchWeapon||t.outcomeChoice!==null||t.toggleMovementPriority||t.toggleGuard}function B8(t){if(t.querySelector('[data-control="movement-priority"]')!==null)return;const e=t.querySelector(".relic-actions");if(e===null)return;const a=document.createElement("button");a.className="relic-action relic-action--movement-priority",a.dataset.control="movement-priority",a.type="button",a.disabled=!0,a.setAttribute("aria-label","自動ダッシュ状態"),a.setAttribute("aria-pressed","false");const r=document.createElement("span");r.textContent="AUTO RUN";const s=document.createElement("small");s.textContent="歩行→走行",a.append(r,s),e.append(a)}function P8(t){return new URLSearchParams(t).getAll("debug").includes("1")}const E8={"edge-coil":{title:"縁断コイル E-04",effect:"測量刃の威力を6増幅する。",principle:"刃の輪郭だけを0.03秒先に送る位相先行。仮説。",sideEffect:"鞘に入れた鉛筆まで、やたら尖る。",note:"『切れ味より、書類の角が怖い』— 前任調査員"},"gravity-weight":{title:"局所重錘 G-12",effect:"杭打機の威力を12増幅する。",principle:"衝突の瞬間だけ質量の参照先を衛星軌道へ移す。仮説。",sideEffect:"使用後、持ち主の靴だけ三分間重くなる。",note:"『置き忘れない。床がへこむ』— 整備票"},"field-tonic":{title:"野外縫合剤 T-3",effect:"体力を45回復する道具を1個追加する。",principle:"傷口へ本人の正常時データを上書きする医療糊。",sideEffect:"治った場所が一度だけ知らない番号へ発信する。",note:"『通話料は観測所持ちにしてほしい』— 使用者"},"relay-capacitor":{title:"中継蓄相器 C-17",effect:"斥力環の威力を10増し、再使用を1秒短縮する。",principle:"周辺機器の待ち時間を回収し、電荷として再利用する。",sideEffect:"近くの炊飯器が、完了前に完了音を鳴らす。",note:"『急かされている気がする』— 台所担当"},"quiet-chime":{title:"無音鈴 Q-0",effect:"反響体を斥力環で鎮静できる。",principle:"音を出すのではなく、周囲から同じ長さの沈黙を引く。",sideEffect:"鳴らすたび、どこかで一匹だけ犬が首を傾げる。",note:"『聞こえなかった。だから作動した』— 観測記録"},"signal-key":{title:"信号鍵 K-99",effect:"反響体との直接接続を解禁する。",principle:"鍵穴ではなく、通信相手の「返事したい気持ち」を開く。",sideEffect:"接続中、使用者の独り言が字幕として表示される。",note:"『考えてから黙ること』— 接続手順書"}},C8={destroy:"破壊",calm:"鎮静",connect:"接続"};function M8(t,e={}){rn.get(t)?.destroy();const a=Yw(t),r=Zu(window.location.search,window.location.pathname);if(a.stage.dataset.ws1ActionProfile=r.enabled?"ws1-r01":"disabled",a.stage.dataset.ws1VisualLane=r.visualLane,r.enabled&&B8(a.stage),I8(t,a,e),(e.experience==="r09"||e.experience==="r10")&&e.worldMemoryRuntime===void 0)throw new Error("R09/R10 requires an explicit world memory runtime.");const s=(e.experience==="r09"||e.experience==="r10")&&e.worldMemoryRuntime!==void 0?new o2(a,e.worldMemoryRuntime):null,i=e.experience==="r10"?new y8(a):null,n=new fh(a.stage),o=new Uu,A=[];let l=Jo(kn);(e.experience==="r05"||e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10")&&(l.player.facingX=0,l.player.facingY=1),Gl(l,s?.effects),l=i?.prepareWorld(l,s?.effects.relicCooldownMultiplier)??l;let c=ar(a,l),d=null;r.visualLane==="webgpu"&&(a.stage.dataset.ws1WebgpuStatus="loading",ql(async()=>{const{createWs1WebGpuHeroComparator:Q}=await import("./WebGpuHeroComparator-C1wmSHDJ.js");return{createWs1WebGpuHeroComparator:Q}},__vite__mapDeps([3,1,2])).then(({createWs1WebGpuHeroComparator:Q})=>Q(a.worldMount)).then(Q=>{if(f){Q.dispose();return}d=Q,a.stage.dataset.ws1WebgpuStatus="ready"}).catch(Q=>{a.stage.dataset.ws1WebgpuStatus="fallback-webgl2",a.stage.dataset.ws1WebgpuError=Q instanceof Error?Q.message:String(Q)}));let u={x:l.player.x,y:l.player.y},h=0,g=performance.now(),p=0,m=!1,f=!1,w=!1,v=!1,y=0,P=0,b=0,x=0,B=0,E=!1,M,T=fs(),k=Uo(),H=an,O=0,X=!1,j=!1,ee=0,J=0,_=0,ie=null;const pe=e.experience==="r05"||e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10"?new URLSearchParams(window.location.search).get("capture"):null;let Re=0;const Ue=pe==="runtime-quality"||pe==="runtime-quality-action",_e=pe==="runtime-quality-action"?20:18,Fe=window.matchMedia("(orientation: portrait)");let ce=Fe.matches;n.setEnabled(!1),sn(a,l,performance.now(),{decisionOpen:!1,announceStatus:!1});const me=(Q,K=performance.now(),N=1800)=>{a.statusLive.textContent=Q,ee=K+N},xe=()=>m&&!ce&&!w&&!document.hidden&&s?.isBlocking!==!0&&i?.isBlocking!==!0&&l.status==="playing",Ke=()=>s===null&&Zs(l)&&!E,pt=Q=>{ce=Fe.matches,a.stage.inert=ce,a.orientationNotice.setAttribute("aria-hidden",String(!ce)),n.setEnabled(xe()),p=0,g=performance.now(),Q&&(me(ce?"ゲームを一時停止しました。端末を横向きにしてください。":"横向き表示へ戻りました。調査を再開します。"),!ce&&m&&a.stage.focus({preventScroll:!0}))};pt(!1);const Jt=()=>{m||f||(m=!0,(e.experience==="north-star"||e.experience==="beauty-cell"||e.experience==="r04"||e.experience==="r05"||e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10")&&(a.stage.dataset.presentationState="active"),a.titleOverlay.setAttribute("aria-hidden","true"),a.titleOverlay.inert=!0,n.setEnabled(xe()),g=performance.now(),me(e.experience==="r10"?"遺物構築遠征を開始。回収物から二つのbuildを組み替えてください。":e.experience==="r09"?"第一記憶遠征を開始。二つのsiteから行き先を選んでください。":"調査開始。町の依頼板に近づき、調査ボタンを押してください。",g),ce||a.stage.focus({preventScroll:!0}),pe===null&&o.unlock().catch(()=>{be(a,"音声を開始できませんでした。ゲームは続行できます。",performance.now())}))},da=()=>{v=!v,o.setMuted(v),a.muteButton.setAttribute("aria-pressed",String(v)),a.muteButton.innerHTML=v?'<span aria-hidden="true">×</span> MUTED':'<span aria-hidden="true">◖))</span> SOUND'},kr=()=>{s?.beginNextExpedition(),i?.beginNextExpedition(),l=Jo(kn),Gl(l,s?.effects),l=i?.prepareWorld(l,s?.effects.relicCooldownMultiplier)??l,u={x:l.player.x,y:l.player.y},T=fs(),k=Uo(),H=an,O=0,M=void 0,p=0,E=!1,X=!1,j=!1,c.dispose(),c=ar(a,l),a.resultPanel.setAttribute("aria-hidden","true"),a.resultPanel.inert=!0,a.outcomePanel.setAttribute("aria-hidden","true"),a.outcomePanel.inert=!0,n.setEnabled(xe()),be(a,"新しい調査記録を開始。",performance.now()),sn(a,l,performance.now(),{decisionOpen:!1,announceStatus:!1}),a.stage.focus({preventScroll:!0})},Wa=()=>Jt(),Va=()=>da(),Ka=()=>kr(),Ja=Q=>{Q.code==="Enter"&&Jt()},Za=()=>{g=performance.now(),p=0,n.setEnabled(xe())},$a=()=>pt(!0),Pa=()=>{Zs(l)&&(E=!0,be(a,"応答を保留。街道へ戻り、必要な遺物を探せる。",performance.now(),3600),me("応答を保留しました。反響体の近くで調査すると、選択へ戻れます。"))},er=Q=>{if(!Ke())return;if(Q.code==="Escape"){Q.preventDefault(),Pa();return}if(Q.code!=="Tab")return;const K=_l(a);if(K.length===0)return;Q.preventDefault();const N=K.indexOf(document.activeElement),Dt=Q.shiftKey?N<=0?K.length-1:N-1:N<0||N===K.length-1?0:N+1;K[Dt]?.focus({preventScroll:!0})};a.startButton.addEventListener("click",Wa),a.muteButton.addEventListener("click",Va),a.restartButton.addEventListener("click",Ka),a.outcomeBackButton.addEventListener("click",Pa),window.addEventListener("keydown",Ja),window.addEventListener("keydown",er),document.addEventListener("visibilitychange",Za),Fe.addEventListener("change",$a),A.push(()=>a.startButton.removeEventListener("click",Wa),()=>a.muteButton.removeEventListener("click",Va),()=>a.restartButton.removeEventListener("click",Ka),()=>a.outcomeBackButton.removeEventListener("click",Pa),()=>window.removeEventListener("keydown",Ja),()=>window.removeEventListener("keydown",er),()=>document.removeEventListener("visibilitychange",Za),()=>Fe.removeEventListener("change",$a));const Ea=Q=>{if(f)return;const K=Math.min(100,Math.max(0,Q-g));if(g=Q,document.hidden){h=requestAnimationFrame(Ea);return}const N=[],Dt=[];let Ge=!1;const Oe=n.getLastInputSample();if(xe()&&Oe.sequence>_&&(_=Oe.sequence,p=Math.max(p,Math.max(0,Nr-K)),a.stage.dataset.inputStepWakeup="true"),m&&!w&&!document.hidden&&!ce&&s?.isBlocking!==!0&&i?.isBlocking!==!0&&l.status==="playing"){p+=K;let Xe=0;for(;p>=Nr&&Xe<Ul&&!(Ue&&l.tick>=_e);){u={x:l.player.x,y:l.player.y},l=i?.prepareWorld(l,s?.effects.relicCooldownMultiplier)??l;const Je=n.consumeFrame(),Ze=pe==="runtime-quality-action"&&l.tick===16?{...Je,attack:!0}:Je,sr=n.getLastInputSample(),mi=Ke();if(E&&Ze.interact&&q8(l))E=!1,me("反響体への応答選択を再開します。",Q);else if(!mi||Ze.outcomeChoice!==null){let Z=S8(l,Ze,mi);if(s!==null&&Ze.interact&&s.ownsTownInteraction(l)&&(Z.interact=!1),i!==null){const ka=i.prepareCommand(Z);Z=ka.command,Ca(ka.events,Q)}if((e.semiAutoCombat===!0||r.enabled)&&!mi)if(Z.activateRelic===!0&&l.player.relicCooldownTicks<=1?O=Math.max(O,b8):(Z.dodge===!0||Z.chooseWeapon!==void 0)&&(O=Math.max(O,1)),O>0)T=fs(),O-=1,Z.moveSpeedScale=1,Z.attack=!1,M={targetId:null,phase:"idle",progress:0};else{const de=vf(T,l,{omnidirectionalTargeting:r.enabled});T=de.state,Z.moveSpeedScale=de.presentation.movementScale,Z.attack=de.commandContribution.attack===!0;const Qd=Z.attack===!0;if(M={targetId:de.presentation.targetId,phase:de.presentation.phase,progress:de.presentation.phaseProgress,entryLungeActive:de.presentation.entryLungeStrength>0},r.enabled){const wi=Math.hypot(Z.moveX??0,Z.moveY??0)>.08,kd=l.enemies.reduce((lt,Ta)=>{if(!Ta.active||Ta.defeated||Ta.disposition!=="hostile")return lt;const Do=Math.hypot(Ta.x-l.player.x,Ta.y-l.player.y);return lt===null||Do<lt?Do:lt},null);!wi&&de.commandContribution.moveX!==void 0&&de.commandContribution.moveY!==void 0&&(Z.moveX=de.commandContribution.moveX,Z.moveY=de.commandContribution.moveY);const Td=l.enemies.find(lt=>lt.active&&!lt.defeated&&lt.disposition==="hostile"&&lt.attack.phase==="telegraph"),Rd=k.movementPriorityEnabled,zd=k.guardEnabled,ua=Ku(k,{tick:l.tick,autoAttack:Qd,manualAttack:Ze.attack,contextualCommand:Ze.interact&&de.presentation.targetId!==null,toggleMovementPriority:Ze.toggleMovementPriority,toggleGuard:Ze.toggleGuard,moving:wi,nearestHostileDistance:kd,presentation:{phase:de.presentation.phase,progress:de.presentation.phaseProgress,targetId:de.presentation.targetId,targetInHitRange:de.presentation.targetInHitRange},priorityThreatId:Td?.id??null});if(k=ua.state,Dt.push(...ua.cues),k.movementPriorityEnabled){Z.attack=!1,Z.guard=!1;const lt=k.movementPriorityBlend,Ta=lt*lt*(3-2*lt);Z.moveSpeedScale=1+Ta*.54}else k.guardEnabled&&(Z.attack=!1,Z.guard=!0,Z.moveSpeedScale=.58);(de.presentation.phase==="windup"||de.presentation.phase==="hit")&&(de.presentation.phase==="windup"&&de.presentation.entryLungeStrength>0&&!k.guardEnabled&&de.commandContribution.moveX!==void 0&&de.commandContribution.moveY!==void 0?(Z.moveX=de.commandContribution.moveX,Z.moveY=de.commandContribution.moveY,Z.moveSpeedScale=de.presentation.entryLungeMovementScale):(Z.moveX=de.presentation.targetDirectionX,Z.moveY=de.presentation.targetDirectionY,Z.moveSpeedScale=0)),(Rd!==k.movementPriorityEnabled||zd!==k.guardEnabled)&&(T=fs()),M={...M,movementPriorityEnabled:k.movementPriorityEnabled,movementPriorityBlend:k.movementPriorityBlend,guardEnabled:k.guardEnabled},ua.consumeContextualCommand&&(Z.interact=!1),ua.timingLink!==null?(Z.attack=!0,Z.timingLink=ua.timingLink):ua.autoChain!==null&&(Z.autoChain=ua.autoChain),a.stage.dataset.ws1LinkWindow=String(ua.cues.includes("ws1.link-window")),a.stage.dataset.ws1ChainStep=String(k.chainStep),a.stage.dataset.ws1AutoChainStep=String(k.autoChainStep),a.stage.dataset.ws1Links=String(k.telemetry.links),a.stage.dataset.ws1Misses=String(k.telemetry.misses),a.stage.dataset.ws1SupportCommands=String(k.telemetry.supportCommands),a.stage.dataset.ws1ExposedTarget=k.exposedTargetId??"",a.stage.dataset.ws1MovementPriority=k.movementPriorityEnabled?"on":k.movementPriorityQueued?"queued":"off",a.stage.dataset.ws1MovementPriorityBlend=k.movementPriorityBlend.toFixed(3),a.stage.dataset.ws1GuardMode=k.guardEnabled?"on":"off";const bo=a.stage.querySelector('[data-control="movement-priority"]');bo?.setAttribute("aria-pressed",String(k.movementPriorityEnabled)),bo?.querySelector("small")?.replaceChildren(k.movementPriorityEnabled?"RUN":wi?"WALK":"AUTO"),a.stage.querySelector('[data-control="guard"]')?.setAttribute("aria-pressed",String(k.guardEnabled))}}pe==="runtime-quality-action"&&l.tick===16&&(Z.attack=!0);const Id=l,ls=uf(l,Z,i===null?void 0:{deferLootEffects:oh()});let gi=ls.events;if(i!==null){const ka=i.observeStep(Id,ls.state,ls.events);l=ka.world,gi=ka.events,Ca(ka.buildcraft.events,Q),r.enabled&&l.tick>=H&&(Ca(i.recoverResource(1,"passive-recovery"),Q),H=l.tick+an)}else l=ls.state;N.push(...gi),s?.observeStep(l,gi,Ze.interact)}if(sr.sequence>J&&D8(Ze)){const Z=performance.now();J=sr.sequence,ie={sequence:sr.sequence,eventAt:sr.eventAt,simulatedAt:Z},a.stage.dataset.lastSimulatedInputSequence=String(sr.sequence),a.stage.dataset.inputToSimulationMs=Math.max(0,Z-sr.eventAt).toFixed(3)}p-=Nr,Xe+=1,Ge=!0}Xe===Ul&&(p=Math.min(p,Nr))}if(Sa(a,o,l,N,Q),r.enabled){for(const Je of Dt)Je!=="ws1.link-window"&&o.playWs1(Je);const Xe=Dt.at(-1);Xe!==void 0&&(a.stage.dataset.ws1LastCue=Xe)}Zs(l)||(E=!1);const rr=Ke();if(Ge&&(sn(a,l,Q,{decisionOpen:rr,announceStatus:m&&!ce&&!w&&Q>=ee,combatPresentation:M}),s?.updatePresentation(l),i?.updatePresentation(l),Q8(a,l,M)),n.setEnabled(xe()),Ma(rr),o.setDanger(ce||document.hidden?0:H8(l)),document.hidden||o.update(),c.update(l,N,Q,ce||document.hidden?0:K,M,{previousPlayer:u,simulationAlpha:Math.min(1,p/Nr)},Dt),d?.update(l,M,c.getVisualCameraSnapshot(),Q/1e3),ie!==null){const Xe=performance.now();a.stage.dataset.lastPresentedInputSequence=String(ie.sequence),a.stage.dataset.inputToRenderSubmissionMs=Math.max(0,Xe-ie.eventAt).toFixed(3),a.stage.dataset.simulationToRenderSubmissionMs=Math.max(0,Xe-ie.simulatedAt).toFixed(3),ie=null}if(x+=1,B+=K,Q-b>=500){const Xe=B>0?Math.round(x*1e3/B):0,Je=c.getStats();a.performance.textContent=`${Xe} FPS · ${Je.width}×${Je.height} · ${Je.calls} CALL · ${Je.triangles} TRI`,x=0,B=0,b=Q}Q>=y&&a.toast.classList.remove("is-visible"),Q>=P&&a.dossier.setAttribute("aria-hidden","true"),Re+=1;const Ia=Ue&&l.tick>=_e,Qa=pe!==null&&!Ue&&Re>=4;if(Ia||Qa){document.documentElement.dataset.captureReady=pe;return}h=requestAnimationFrame(Ea)},tr={destroy(){if(!f){f=!0,cancelAnimationFrame(h),n.destroy(),o.dispose(),d?.dispose(),d=null,c.dispose(),s?.destroy(),i?.destroy();for(const Q of A.splice(0))Q();rn.delete(t)}},start(){Jt()},setCameraZoomMultiplier(Q){return c.setCameraZoomMultiplier(Q)},getCameraZoomMultiplier(){return c.getCameraZoomMultiplier()},getState(){return l},getWorldMemory(){return s?.worldMemory??null},getBuildcraftState(){return i?.buildcraftState??null}};function ar(Q,K){return new ww(Q.worldMount,K,{onContextLost:()=>{w=!0,n.setEnabled(!1);const N=performance.now();be(Q,"描画装置との接続が切れました。復旧を待っています。",N,2e4),me("WebGL描画コンテキストが失われました。",N,2e4)},onContextRestored:()=>{w=!1,n.setEnabled(xe());const N=performance.now();be(Q,"描画装置との接続を復旧しました。",N),me("描画装置との接続を復旧しました。",N),g=N,p=0},companionPreview:e.companionPreview||r.enabled,cameraCompositionProfile:e.experience==="r05"||e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10"?"r05":e.experience==="r04"?"r04":e.experience==="baseline"||e.experience===void 0?"baseline":"north-star",environmentProfile:e.experience==="r04"||e.experience==="r05"||e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10"?"r04-live":e.experience==="beauty-cell"?"beauty-cell":e.experience==="north-star"?"north-star-city":"start-town",presentationProfile:e.experience==="r09"||e.experience==="r10"?"r09-fram":e.experience==="r08"?"r08-fram":e.experience==="r07"?"r07-fram":e.experience==="r05"||e.experience==="r06"?"r05-fram":e.experience==="r04"?"r04":"default",qualityProfile:e.renderQuality,cameraZoomMultiplier:e.cameraZoomMultiplier,northStarVisualCell:e.experience==="r10",visualStabilityProfile:mg(window.location.search,e.experience==="r10"),sharpPresentation:e.experience==="r06"||e.experience==="r07"||e.experience==="r08"||e.experience==="r09"||e.experience==="r10",worldMemoryEffects:s?.effects,heroAssetRequest:r.enabled?{status:"loaded",runtime:Mn}:e.heroAssetRequest,firstStageMvp:i?.hasFirstStageMvp===!0,ws1ActionFeel:r.enabled,onWs1VisualContact:r.enabled?N=>{o.playWs1(N.audioCue),i?.presentWs1VisualContact()}:void 0,onWs1VisualDefeat:r.enabled?()=>i?.presentWs1VisualDefeat():void 0})}function be(Q,K,N,Dt=2800){Q.toast.textContent=K,Q.toast.classList.add("is-visible"),y=N+Dt}function Tr(Q,K){const N=E8[Q];a.dossierTitle.textContent=N.title,a.dossierBody.textContent=[`効果　${N.effect}`,`原理　${N.principle}`,`副作用　${N.sideEffect}`,`所感　${N.note}`].join(`
`),a.dossier.setAttribute("aria-hidden","false"),P=K+7e3}function Ca(Q,K){for(const N of Q)N.type==="offer-opened"?(be(a,`${N.offer.name}を解析。用途を選んでください。`,K,3600),me(`${N.offer.name}を回収。装備、強化、分解から用途を選びます。`,K,4500)):N.type==="action-rejected"?be(a,N.reason,K):N.type==="resource-changed"?(a.stage.dataset.relicResourceGainReason=N.reason,a.stage.dataset.relicResourceGainAmount=String(N.gained),a.stage.dataset.relicResourceGainAt=String(Math.round(K)),N.reason==="timing-link"&&N.resource<N.maximum&&be(a,`LINK成立。大技資源 +${N.gained}`,K,1250),N.resource===N.maximum&&be(a,N.reason==="passive-recovery"?"時間回復で大技が再充填されました。":"大技の駆動資源が充填されました。",K,2200)):N.type==="named-enemy-ward-broken"&&(be(a,"反響防壁を破断。通常攻撃が通ります。",K,3600),me("反響防壁を破断しました。通常攻撃で制圧できます。",K,4500))}function Ma(Q){const K=a.outcomePanel.contains(document.activeElement);a.outcomePanel.inert=!Q,Q!==X&&(Q&&!ce?_l(a)[0]?.focus({preventScroll:!0}):!ce&&K&&a.stage.focus({preventScroll:!0}),X=Q);const N=a.resultPanel.getAttribute("aria-hidden")==="false";a.resultPanel.inert=!N,N!==j&&(N&&!ce&&a.restartButton.focus({preventScroll:!0}),j=N)}return rn.set(t,tr),(pe==="active"||Ue)&&Jt(),h=requestAnimationFrame(Ea),tr;function Sa(Q,K,N,Dt,Ge){for(const Oe of Dt)switch(U8(K,Oe),Oe.type){case"weapon-selected":be(Q,Oe.weaponId==="blade"?"測量刃へ持ち替えた。速く、間合いが長い。":"杭打機へ持ち替えた。遅いが、重く吹き飛ばす。",Ge);break;case"loot-picked":{const rr=cc[Oe.lootId];be(Q,`${rr.name}を回収。`,Ge),Tr(Oe.lootId,Ge);break}case"landmark-entered":be(Q,Oe.landmarkId==="fork"?"三叉路を記録。廃区の信号が強くなる。":Oe.landmarkId==="ruin"?"聴取廃区へ侵入。発信源は近い。":"ダストウェイク観測町へ帰還。",Ge);break;case"quest-advanced":be(Q,Sd(N),Ge,3300);break;case"outcome-committed":be(Q,Oe.outcome==="destroy"?"破壊手順を確定。通常攻撃で停止させる。":Oe.outcome==="calm"?"鎮静手順を確定。近くで斥力環を使う。":"接続手順を確定。近くで調査する。",Ge,4e3);break;case"anomaly-resolved":be(Q,`反響体への${C8[Oe.outcome]}を記録。町へ戻れ。`,Ge,4e3);break;case"enemy-defeated":Oe.enemyId!==ht&&be(Q,"異形を停止。周囲を調べられる。",Ge);break;case"item-used":be(Q,`縫合剤を使用。体力を${Oe.healed}回復。`,Ge);break;case"command-rejected":be(Q,_8(Oe.reason),Ge);break;case"player-defeated":n.setEnabled(!1),Q.resultTitle.textContent="調査記録、途絶",Q.resultBody.textContent=`辺境はあなたを待たずに巡り続ける。
装備と防御の使い方を変え、もう一度この経路を試せる。`,Q.resultPanel.setAttribute("aria-hidden","false"),Q.resultPanel.inert=!1,me("調査員は倒れました。",Ge,1e4);break;case"result-reached":n.setEnabled(!1),me(`依頼完了。${Oe.result.title}`,Ge,1e4);break}}}function S8(t,e,a){const r=k8(e.outcomeChoice);if(a)return r===void 0?{}:{chooseOutcome:r};const s=Lp(e.moveX,e.moveY);return{moveX:s.moveX,moveY:s.moveY,attack:e.attack,guard:e.guard,dodge:e.dodge,activateRelic:e.activateRelic,useItem:e.useItem,interact:e.interact,chooseWeapon:e.switchWeapon?T8(t.player.weaponId):void 0}}function I8(t,e,a){if(a.experience!=="north-star"&&a.experience!=="beauty-cell"&&a.experience!=="r04"&&a.experience!=="r05"&&a.experience!=="r06"&&a.experience!=="r07"&&a.experience!=="r08"&&a.experience!=="r09"&&a.experience!=="r10")return;t.classList.add("north-star-shell"),e.stage.classList.add("north-star-stage");const r=a.experience==="beauty-cell",s=a.experience==="r04",i=a.experience==="r05",n=a.experience==="r06",o=a.experience==="r07",A=a.experience==="r08",l=a.experience==="r09",c=a.experience==="r10",d=i||n||o||A||l||c,u=n||o||A||l||c;(r||s||d)&&(t.classList.add("beauty-cell-shell"),e.stage.classList.add("beauty-cell-stage")),(s||d)&&(t.classList.add("r04-shell"),e.stage.classList.add("r04-stage")),d&&(t.classList.add("r05-shell"),e.stage.classList.add("r05-stage")),u&&(t.classList.add("r06-shell"),e.stage.classList.add("r06-stage")),o&&(t.classList.add("r07-shell"),e.stage.classList.add("r07-stage")),A&&(t.classList.add("r07-shell","r08-shell"),e.stage.classList.add("r07-stage","r08-stage")),e.stage.dataset.experience=a.experience,e.stage.dataset.prototypeVersion=c?"R10":l?"R09":A?"R08":o?"R07":n?"R06":i?"R05":s?"R04":r?"R02":"R01",e.stage.dataset.presentationState="intro";const h=P8(window.location.search);e.stage.classList.toggle("is-north-star-debug",h),e.stage.dataset.debug=h?"1":"0",e.performance.hidden=!h,e.stage.setAttribute("aria-label",d?`F.R.A.M. ${c?"R10":l?"R09":A?"R08":o?"R07":n?"R06":"R05"}。WASDまたは画面左で移動。通常攻撃は間合いに入ると自動。Qで大技、Shiftで防御と回避、Eで調査、Rで道具を使います。`:s?"R02系統 R04。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。":r?"AI-native Beauty Cell。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。":"North Star Scene。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。");const g=document.createElement("div");g.className="north-star-badge",g.hidden=!h,g.innerHTML=d?`<span>FRONTIER RELICS ARCHIVE MODULE</span><strong>${c?"R10 / RELIC BUILDCRAFT":l?"R09 / FIRST MEMORY EXPEDITION":A?"R08 / UNIFIED VOXEL GIRL":o?"R07 / SEMANTIC VOXEL GIRL":n?"R06 / SHARP NAVIGATION":"R05 / WIDE WORLD"} / PC ULTRA</strong>`:s?"<span>CAUSAL BEAUTY CELL</span><strong>R04 / R02 SYSTEMS / PC ULTRA</strong>":r?"<span>AI-NATIVE BEAUTY CELL</span><strong>R02 / PC ULTRA / LIVE SYSTEMS</strong>":"<span>VISUAL NORTH STAR</span><strong>PC ULTRA / LIVE COMBAT</strong>",e.stage.append(g);const p=document.createElement("div");p.className="north-star-combat-readout",p.dataset.phase="idle",p.setAttribute("aria-hidden","true"),p.innerHTML=`
    <strong data-ui="north-star-combat-phase">LOCK</strong>
    <i><em data-ui="north-star-combat-progress"></em></i>
  `,e.stage.append(p);const m=e.titleOverlay.querySelector(".relic-title__copy .relic-kicker"),f=e.titleOverlay.querySelector("h1"),w=e.titleOverlay.querySelector("p"),v=e.startButton.querySelector("span"),y=e.startButton.querySelector("small"),P=e.stage.querySelector(".relic-hud__identity strong");m!==null&&(m.textContent=d?c?"FRONTIER RELICS ARCHIVE MODULE / BUILDCRAFT":l?"FRONTIER RELICS ARCHIVE MODULE / FIRST MEMORY":"FRONTIER RELICS ARCHIVE MODULE / F-01":s?"R02 CAUSAL WORLD / CONCEPT C VISUAL REBUILD":r?"AI-NATIVE CONCEPT C / REALTIME BEAUTY CELL":"PC ULTRA VISUAL + GAME FEEL BENCHMARK"),f!==null&&(f.innerHTML=d?"F.R.A.M.<br /><em>辺境遺物記録モジュール</em>":s?"緑蝕<br /><em>雨庭区</em>":r?"緑蝕<br /><em>交差区</em>":"緑蝕<br /><em>観測区</em>"),w!==null&&(w.innerHTML=d?c?"遺物を拾い、装備するか、分解するか、強化に使うかを選ぶ。<br />二つのbuildは、間合いと大技の作り方まで変える。":l?"二つのsiteから行き先を選び、遺物を持ち帰る。<br />あなたの選択が、次の遠征の光と遊びを変える。":"あなたは辺境を歩き、遺物を解析し、世界の記憶を編むモジュール。<br />滅びかけの都市は、今も明るく生きている。":s?"雨上がりの都市は、滅びたあとも鮮やかだ。<br />歩き、拾い、戦い、世界の記憶を自分の経路にする。":r?"光と水と緑が都市を更新している。<br />調査員は歩き、拾い、間合いを選び、大技だけを自分で撃つ。":"自然に呑まれた現代都市を歩く。<br />間合いで通常攻撃を起こし、大技で戦況を変える。"),v!==null&&(v.textContent=d?c?"遺物構築遠征へ":l?"最初の記憶遠征へ":"F.R.A.M.を起動":s?"雨庭区へ降りる":r?"Beauty Cellを歩く":"North Star Sceneを開始"),y!==null&&(y.textContent="MOVE / AUTO BASIC / MANUAL SKILL"),(r||s||d)&&P!==null&&(P.textContent=d?"F.R.A.M. F-01 / 第07雨庭区":s?"緑蝕・第07雨庭区":"緑蝕・第04交差区");const b=e.stage.querySelector('[data-control="attack"]');if(b!==null){const M=e.stage.dataset.ws1ActionProfile==="ws1-r01";if(b.tabIndex=M?0:-1,b.setAttribute("aria-hidden",String(!M)),M){const T=b.querySelector("span"),k=b.querySelector("small");T!==null&&(T.textContent="連撃"),k!==null&&(k.textContent="TAP / J"),e.stage.setAttribute("aria-label","F.R.A.M. R10。WASDまたは画面左で移動。歩行は自動で走行へ移り、接敵時は歩行と通常攻撃へ戻ります。Jで任意連撃、Qで大技、Shiftで防御ON/OFF、Eで調査、Rで道具を使います。");const H=e.stage.querySelector('[data-control="guard"]'),O=H?.querySelector("span"),X=H?.querySelector("small");H?.setAttribute("aria-label","防御を切り替える"),O!=null&&(O.textContent="防御"),X!=null&&(X.textContent="SHIFT / ON・OFF")}}const x=e.stage.querySelector('[data-control="relic"]'),B=x?.querySelector("span"),E=x?.querySelector("small");B!=null&&(B.textContent="大技"),E!=null&&(E.textContent="Q / MANUAL")}function Q8(t,e,a){const r=t.stage.querySelector(".north-star-combat-readout");if(r===null)return;const s=r.querySelector('[data-ui="north-star-combat-phase"]'),i=r.querySelector('[data-ui="north-star-combat-progress"]'),n=a?.phase??"idle",o={idle:"LOCK",acquire:"LOCK",windup:e.player.weaponId==="blade"?"WINDUP":"CHARGE",hit:"HIT",recover:"RECOVER"};s!==null&&(s.textContent=o[n]),i!==null&&(i.style.width=`${Math.round((a?.progress??0)*100)}%`),r.dataset.phase=n,t.stage.dataset.combatPhase=n,t.stage.dataset.combatTarget=a?.targetId??""}function k8(t){switch(t){case 0:return"destroy";case 1:return"calm";case 2:return"connect";default:return}}function T8(t){return t==="blade"?"impact":"blade"}function sn(t,e,a,r={}){const s=e.player,i=Math.max(0,s.hp/s.maxHp),n=ai[s.weaponId],o=s.weaponDamageBonuses[s.weaponId],A=s.relicCooldownTicks/At,l=r.decisionOpen??Zs(e);t.stage.dataset.questPhase=e.quest.phase,t.stage.dataset.playerX=String(Math.round(s.x)),t.stage.dataset.playerY=String(Math.round(s.y)),t.stage.dataset.playerFacingX=String(s.facingX),t.stage.dataset.playerFacingY=String(s.facingY),t.stage.dataset.simulationTick=String(e.tick),t.stage.dataset.weapon=s.weaponId,t.stage.dataset.status=e.status,t.zoneLabel.textContent=t.stage.dataset.experience==="r04"||t.stage.dataset.experience==="r05"||t.stage.dataset.experience==="r06"||t.stage.dataset.experience==="r07"||t.stage.dataset.experience==="r08"||t.stage.dataset.experience==="r09"||t.stage.dataset.experience==="r10"?"緑蝕・第07雨庭区":t.stage.dataset.experience==="beauty-cell"?"緑蝕・第04交差区":F8(s.x,s.y),t.objectiveText.textContent=Sd(e),t.healthFill.style.width=`${Math.round(i*100)}%`,t.healthFill.style.background=i<=.3?"var(--relic-danger)":"linear-gradient(90deg, var(--relic-amber), var(--relic-signal))",t.healthText.textContent=`${s.hp} / ${s.maxHp}`,t.weaponName.textContent=s.weaponId==="blade"?"測量刃":"杭打機",t.weaponDetail.textContent=`${s.weaponId==="blade"?"速い・広い":"遅い・重い"} / 威力 ${n.damage+o}`,t.relicName.textContent=A<=0?"斥力環 R-17 / READY":`斥力環 R-17 / ${A.toFixed(1)}s`,t.itemCount.textContent=`× ${s.healingItems}`,R8(t,e,r.combatPresentation),z8(t,e,a),t.outcomePanel.setAttribute("aria-hidden",String(!l));const c=Hl(t,"outcome-calm"),d=Hl(t,"outcome-connect");Nl(c,s.collectedLootIds.includes("quiet-chime"),"無音鈴 Q-0 が必要"),Nl(d,s.collectedLootIds.includes("signal-key"),"信号鍵 K-99 が必要");const u=O8(e);if(t.contextPrompt.setAttribute("aria-hidden",String(u===null||l)),u!==null){const h=t.contextPrompt.querySelector("span"),g=t.contextPrompt.querySelector("strong");h!==null&&(h.textContent=u.key),g!==null&&(g.textContent=u.text)}if(e.status==="result"&&e.quest.result!==null){const h=e.quest.result;t.resultTitle.textContent=G8(h.outcome),t.resultBody.textContent=X8(h.outcome),t.resultPanel.setAttribute("aria-hidden","false"),t.resultPanel.inert=!1}if(r.announceStatus!==!1&&a>0&&e.status==="playing"){const h=`${t.zoneLabel.textContent}。目的：${t.objectiveText.textContent}。体力${s.hp}。武器${t.weaponName.textContent}。`;t.statusLive.textContent!==h&&(t.statusLive.textContent=h)}}function R8(t,e,a){const s=(a?.targetId===null||a?.targetId===void 0?void 0:e.enemies.find(n=>n.id===a.targetId&&n.active&&!n.defeated&&n.disposition==="hostile"))??e.enemies.filter(n=>n.active&&!n.defeated&&n.disposition==="hostile").map(n=>({enemy:n,distance:Math.hypot(e.player.x-n.x,e.player.y-n.y)})).filter(n=>n.distance<=440).sort((n,o)=>n.distance-o.distance||n.enemy.id.localeCompare(o.enemy.id))[0]?.enemy;if(t.targetPanel.setAttribute("aria-hidden",String(s===void 0)),s===void 0)return;const i=s.rank??(s.kind==="named-anomaly"?"boss":"normal");t.targetPanel.dataset.enemyRank=i,t.targetName.textContent=i==="boss"?`BOSS / ${nn(s.kind)}`:i==="elite"?`${nn(s.kind)}・強化個体`:nn(s.kind),t.targetFill.style.width=`${Math.round(s.hp/s.maxHp*100)}%`}function z8(t,e,a){const r=Number(t.minimap.dataset.lastPaintAt??"0");if(a-r<100)return;t.minimap.dataset.lastPaintAt=String(a);const s=t.minimap.getContext("2d");if(s===null)return;const i=L8(e),n=e.player,o=t.minimap.width/nc,A=t.minimap.height/oc,l=w=>w*o,c=w=>w*A;s.clearRect(0,0,t.minimap.width,t.minimap.height);const d=s.createLinearGradient(0,0,t.minimap.width,t.minimap.height);d.addColorStop(0,"#102c27"),d.addColorStop(.52,"#224d3b"),d.addColorStop(1,"#162f32"),s.fillStyle=d,s.fillRect(0,0,t.minimap.width,t.minimap.height),s.strokeStyle="rgba(213, 207, 160, 0.34)",s.lineWidth=8,s.lineCap="round",s.beginPath(),s.moveTo(l(180),c(930)),s.bezierCurveTo(l(1060),c(860),l(2180),c(1040),l(3160),c(880)),s.stroke(),s.strokeStyle="rgba(117, 207, 212, 0.38)",s.lineWidth=3,s.beginPath(),s.moveTo(l(210),c(1240)),s.bezierCurveTo(l(1120),c(1080),l(2040),c(1340),l(3380),c(1120)),s.stroke();for(const w of Object.values(ye))s.fillStyle="rgba(241, 225, 175, 0.22)",s.fillRect(l(w.bounds.x),c(w.bounds.y),Math.max(4,l(w.bounds.width)),Math.max(4,c(w.bounds.height)));for(const w of e.enemies)!w.active||w.defeated||w.disposition!=="hostile"||(s.fillStyle="rgba(244, 117, 92, 0.86)",s.beginPath(),s.arc(l(w.x),c(w.y),2.3,0,Math.PI*2),s.fill());s.fillStyle="#ffd46f",s.strokeStyle="rgba(255, 248, 214, 0.92)",s.lineWidth=2,s.beginPath(),s.arc(l(i.x),c(i.y),6,0,Math.PI*2),s.fill(),s.stroke(),s.fillStyle="#82f3d2",s.strokeStyle="#062b28",s.lineWidth=2.4,s.beginPath(),s.arc(l(n.x),c(n.y),5.2,0,Math.PI*2),s.fill(),s.stroke();const u=Math.hypot(i.x-n.x,i.y-n.y),h=i.x-n.x,g=i.y-n.y,p=(h-g)/Math.SQRT2,m=(h+g)/Math.SQRT2,f=Math.atan2(p,-m)*(180/Math.PI);t.waypointName.textContent=i.name,t.waypointDistance.textContent=`${Math.max(0,Math.round(u/10))} m`,t.waypointArrow.style.transform=`rotate(${f.toFixed(1)}deg)`,t.minimap.setAttribute("aria-label",`現在地から${i.name}まで約${Math.round(u/10)}メートル。`)}function L8(t){switch(t.quest.phase){case"briefing":return{...ye.town.interactionPoint,name:"観測町・依頼板"};case"travel-to-fork":return{...ye.fork.interactionPoint,name:"三叉路"};case"travel-to-ruin":case"confrontation":return{...ye.ruin.interactionPoint,name:"聴取廃区・発信源"};case"return-town":case"result":return{...ye.town.interactionPoint,name:"観測町・帰還点"}}}function Sd(t){switch(t.quest.phase){case"briefing":return"町の依頼板を調べる";case"travel-to-fork":return"東の三叉路へ向かう";case"travel-to-ruin":return"聴取廃区の発信源へ向かう";case"confrontation":return t.quest.intent==="destroy"?"反響体を攻撃して停止させる":t.quest.intent==="calm"?"反響体の近くで斥力環を使う":t.quest.intent==="connect"?"反響体の近くで調査する":"反響体への応答を選ぶ";case"return-town":return"観測町の依頼板へ帰還する";case"result":return"依頼記録を閉じる"}}function F8(t,e){return on(t,e,ye.town.bounds)?"ダストウェイク観測町":on(t,e,ye.ruin.bounds)?"聴取廃区":on(t,e,ye.fork.bounds)?"三叉路":t<1180?"赤錆街道・西":t<2450?"赤錆街道・東":"廃区外縁"}function nn(t){switch(t){case"scrap-hound":return"屑鉄猟犬";case"relay-shell":return"中継殻";case"murmur":return"囁き";case"culvert-lurker":return"暗渠潜り";case"named-anomaly":return"聴取断層《オリソン》"}}function O8(t){const e=t.player;if(t.world.loot.some(s=>!s.picked&&Math.hypot(e.x-s.x,e.y-s.y)<=e.radius+s.radius+70))return{key:"E",text:"遺物を回収"};if(t.quest.phase==="briefing"&&Xl(e,ye.town.interactionPoint)<=e.radius+70)return{key:"E",text:"依頼板を調べる"};const r=t.enemies.find(s=>s.id===ht);if(r!==void 0&&ci(e,r)){if(t.quest.phase==="confrontation"&&t.quest.intent===null)return{key:"CHOICE",text:"下の3案から応答を選ぶ"};if(t.quest.intent==="connect")return{key:"E",text:"信号鍵で接続"};if(t.quest.intent==="calm")return{key:"Q",text:"斥力環で鎮静"};if(t.quest.intent==="destroy")return{key:"AUTO",text:"間合いに入って武器で破壊"}}return t.quest.phase==="return-town"&&Xl(e,ye.town.interactionPoint)<=e.radius+70?{key:"E",text:"依頼を報告"}:null}function U8(t,e){if(e.type==="player-damaged"){t.play("hurt");return}if(e.type==="weapon-selected"||e.type==="command-rejected"){t.play("ui");return}if(!(e.type==="player-attacked"&&e.contact!==void 0)&&!(e.type==="enemy-damaged"&&e.contact!==void 0)&&"cue"in e){const a=N8(e.cue);a!==null&&t.play(a)}}function N8(t){switch(t){case"blade-swing":return"blade";case"impact-swing":return"impact";case"enemy-warning":return"warning";case"enemy-impact":return"enemy-impact";case"guard":return"guard";case"just-guard":return"perfect-guard";case"passive-guard":return null;case"dodge":return"dodge";case"relic":return"relic";case"heal":return"item";case"loot":return"pickup";case"quest":return"ui";case"outcome-destroy":case"outcome-calm":case"outcome-connect":return t;case"result":return"result"}}function H8(t){let e=Number.POSITIVE_INFINITY;for(const a of t.enemies)!a.active||a.defeated||a.disposition!=="hostile"||(e=Math.min(e,Math.hypot(t.player.x-a.x,t.player.y-a.y)));return Number.isFinite(e)?1-Math.min(1,Math.max(0,(e-100)/500)):0}function _8(t){switch(t){case"item-full-health":return"体力は満タン。縫合剤は温存した。";case"item-empty":return"縫合剤がない。";case"outcome-already-chosen":return"応答手順はすでに確定している。";case"outcome-not-available":return"必要な遺物がない。街道を調べ直せる。";case"wrong-quest-phase":return"ここではその応答を選べない。"}}function G8(t){switch(t){case"destroy":return"静かになった断層";case"calm":return"眠る断層";case"connect":return"開いたままの回線"}}function X8(t){switch(t){case"destroy":return`町は静寂を歓迎した。しかし中継守たちは、失われた信号を弔い始めた。
次の旅では、別の返事も選べる。`;case"calm":return`廃区は穏やかになり、旅人は三叉路へ小さな供物を置き始めた。
あなたの鎮静記録が、この土地の新しい習慣になる。`;case"connect":return`廃区から短い通信が届き始め、誰が返事をしてよいか町で議論になった。
回線の向こう側は、まだ何者とも確定していない。`}}function Nl(t,e,a){t.disabled=!e,t.setAttribute("aria-label",e?t.textContent?.trim()??"選択":`${t.textContent?.trim()??"選択"}。${a}`),t.title=e?"":a}function Hl(t,e){const a=t.outcomePanel.querySelector(`[data-control="${e}"]`);if(a===null)throw new Error(`Outcome button is missing: ${e}`);return a}function _l(t){return Array.from(t.outcomePanel.querySelectorAll("button:not(:disabled)"))}function Zs(t){return t.quest.phase==="confrontation"&&t.quest.intent===null}function q8(t){const e=t.enemies.find(a=>a.id===ht);return e!==void 0&&ci(t.player,e)}function on(t,e,a){return t>=a.x&&t<=a.x+a.width&&e>=a.y&&e<=a.y+a.height}function Gl(t,e){e!==void 0&&(t.player.speed=Math.round(t.player.speed*e.explorationSpeedMultiplier),t.player.relicCooldownMaxTicks=Math.max(At,Math.round(t.player.relicCooldownMaxTicks*e.relicCooldownMultiplier)),t.player.relicCooldownTicks=Math.min(t.player.relicCooldownTicks,t.player.relicCooldownMaxTicks))}function Xl(t,e){return Math.hypot(t.x-e.x,t.y-e.y)}const ev=Object.freeze(Object.defineProperty({__proto__:null,PROTOTYPE_B_RUN_SEED:kn,startPrototypeB:M8},Symbol.toStringTag,{value:"Module"}));export{U as C,V1 as F,kn as P,Oa as R,Ac as T,Sn as W,Gc as a,W1 as b,R0 as c,ud as d,hd as e,Jo as f,xl as g,Qr as h,pi as i,Z8 as j,$8 as k,J8 as l,qw as m,Na as n,t2 as o,W8 as p,No as q,ch as r,M8 as s,$m as t,ag as u,rg as v,V8 as w,K8 as x,ev as y};
