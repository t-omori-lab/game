const tB="185",nB={ROTATE:0,DOLLY:1,PAN:2},iB={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fu=0,Ql=1,Au=2,sB=0,Br=1,du=2,us=3,Jn=0,Pt=1,Cn=2,mn=0,Pi=1,Pa=2,yl=3,Cl=4,pu=5,rB=6,si=100,gu=101,mu=102,Eu=103,Bu=104,Mu=200,xu=201,_u=202,wu=203,Ga=204,La=205,vu=206,Su=207,Qu=208,yu=209,Cu=210,Iu=211,bu=212,Du=213,Ru=214,Na=0,Oa=1,Ha=2,Oi=3,ka=4,Va=5,za=6,Ya=7,Gr=0,Tu=1,Uu=2,En=0,Uo=1,Fo=2,Po=3,Go=4,Lo=5,No=6,Oo=7,Il="attached",Fu="detached",nh=300,li=301,Hi=302,Jr=303,Kr=304,Lr=306,Wa=1e3,bn=1001,Ja=1002,Mt=1003,Pu=1004,Ts=1005,bt=1006,Xr=1007,ai=1008,aB=1008,Yt=1009,ih=1010,sh=1011,Es=1012,Ho=1013,Bn=1014,en=1015,Jt=1016,ko=1017,Vo=1018,Bs=1020,rh=35902,ah=35899,oh=1021,lh=1022,tn=1023,Tn=1026,oi=1027,zo=1028,Yo=1029,ci=1030,Wo=1031,oB=1032,Jo=1033,Mr=33776,xr=33777,_r=33778,wr=33779,Ka=35840,Xa=35841,Za=35842,qa=35843,ja=36196,$a=37492,eo=37496,to=37488,no=37489,yr=37490,io=37491,so=37808,ro=37809,ao=37810,oo=37811,lo=37812,co=37813,ho=37814,uo=37815,fo=37816,Ao=37817,po=37818,go=37819,mo=37820,Eo=37821,Bo=36492,Mo=36494,xo=36495,_o=36283,wo=36284,Cr=36285,vo=36286,Ir=2300,So=2301,Zr=2302,bl=2303,Dl=2400,Rl=2401,Tl=2402,Gu=2500,lB=0,cB=1,hB=2,Lu=3200,Kn=0,Nu=1,zn="",$t="srgb",br="srgb-linear",Dr="linear",Xe="srgb",uB="",fB="rg",AB="ga",dB=0,pi=7680,pB=7681,gB=7682,mB=7683,EB=34055,BB=34056,MB=5386,xB=512,_B=513,wB=514,vB=515,SB=516,QB=517,yB=518,Ul=519,Ou=512,Hu=513,ku=514,Ko=515,Vu=516,zu=517,Xo=518,Yu=519,Qo=35044,CB=35048,Fl="300 es",ln=2e3,Ms=2001,IB={COMPUTE:"compute",RENDER:"render"},bB={TEXTURE_COMPARE:"depthTextureCompare"};function Wu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ju(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ku(){const i=xs("canvas");return i.style.display="block",i}const Pl={};function Rr(...i){const e="THREE."+i.shift();console.log(e,...i)}function ch(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Me(...i){i=ch(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function be(...i){i=ch(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Gi(...i){const e=i.join(" ");e in Pl||(Pl[e]=!0,Me(...i))}function DB(){return typeof self<"u"&&typeof self.scheduler<"u"&&typeof self.scheduler.yield<"u"?self.scheduler.yield():new Promise(i=>{requestAnimationFrame(i)})}function Xu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Zu={[Na]:Oa,[Ha]:za,[ka]:Ya,[Oi]:Va,[Oa]:Na,[za]:Ha,[Ya]:ka,[Va]:Oi};class Xn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gl=1234567;const Li=Math.PI/180,ki=180/Math.PI;function nn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Le(i,e,t){return Math.max(e,Math.min(t,i))}function Zo(i,e){return(i%e+e)%e}function qu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ju(i,e,t){return i!==e?(t-i)/(e-i):0}function ds(i,e,t){return(1-t)*i+t*e}function $u(i,e,t,n){return ds(i,e,1-Math.exp(-t*n))}function ef(i,e=1){return e-Math.abs(Zo(i,e*2)-e)}function tf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function nf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rf(i,e){return i+Math.random()*(e-i)}function af(i){return i*(.5-Math.random())}function of(i){i!==void 0&&(Gl=i);let e=Gl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lf(i){return i*Li}function cf(i){return i*ki}function hf(i){return(i&i-1)===0&&i!==0}function uf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ff(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Af(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),A=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*A,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*A,o*c);break;case"ZXZ":i.set(l*A,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:Me("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ge(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const _s={DEG2RAD:Li,RAD2DEG:ki,generateUUID:nn,clamp:Le,euclideanModulo:Zo,mapLinear:qu,inverseLerp:ju,lerp:ds,damp:$u,pingpong:ef,smoothstep:tf,smootherstep:nf,randInt:sf,randFloat:rf,randFloatSpread:af,seededRandom:of,degToRad:lf,radToDeg:cf,isPowerOfTwo:hf,ceilPowerOfTwo:uf,floorPowerOfTwo:ff,setQuaternionFromProperEuler:Af,normalize:Ge,denormalize:Ft},fl=class fl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Le(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fl.prototype.isVector2=!0;let ee=fl;class ui{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],A=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],M=r[a+3];if(A!==M||l!==u||c!==f||h!==g){let p=l*u+c*f+h*g+A*M;p<0&&(u=-u,f=-f,g=-g,M=-M,p=-p);let d=1-o;if(p<.9995){const x=Math.acos(p),w=Math.sin(x);d=Math.sin(d*x)/w,o=Math.sin(o*x)/w,l=l*d+u*o,c=c*d+f*o,h=h*d+g*o,A=A*d+M*o}else{l=l*d+u*o,c=c*d+f*o,h=h*d+g*o,A=A*d+M*o;const x=1/Math.sqrt(l*l+c*c+h*h+A*A);l*=x,c*=x,h*=x,A*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=A}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],A=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*A+l*f-c*u,e[t+1]=l*g+h*u+c*A-o*f,e[t+2]=c*g+h*f+o*u-l*A,e[t+3]=h*g-o*A-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),A=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*A+c*f*g,this._y=c*f*A-u*h*g,this._z=c*h*g+u*f*A,this._w=c*h*A-u*f*g;break;case"YXZ":this._x=u*h*A+c*f*g,this._y=c*f*A-u*h*g,this._z=c*h*g-u*f*A,this._w=c*h*A+u*f*g;break;case"ZXY":this._x=u*h*A-c*f*g,this._y=c*f*A+u*h*g,this._z=c*h*g+u*f*A,this._w=c*h*A-u*f*g;break;case"ZYX":this._x=u*h*A-c*f*g,this._y=c*f*A+u*h*g,this._z=c*h*g-u*f*A,this._w=c*h*A+u*f*g;break;case"YZX":this._x=u*h*A+c*f*g,this._y=c*f*A+u*h*g,this._z=c*h*g-u*f*A,this._w=c*h*A-u*f*g;break;case"XZY":this._x=u*h*A-c*f*g,this._y=c*f*A-u*h*g,this._z=c*h*g+u*f*A,this._w=c*h*A+u*f*g;break;default:Me("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],A=t[10],u=n+o+A;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>A){const f=2*Math.sqrt(1+n-o-A);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>A){const f=2*Math.sqrt(1+o-n-A);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+A-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Le(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Al=class Al{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ll.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ll.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),A=2*(r*n-a*t);return this.x=t+l*c+a*A-o*h,this.y=n+l*h+o*c-r*A,this.z=s+l*A+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this.z=Le(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this.z=Le(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qr.copy(this).projectOnVector(e),this.sub(qr)}reflect(e){return this.sub(qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Le(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Al.prototype.isVector3=!0;let b=Al;const qr=new b,Ll=new ui,dl=class dl{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],A=n[7],u=n[2],f=n[5],g=n[8],M=s[0],p=s[3],d=s[6],x=s[1],w=s[4],B=s[7],Q=s[2],S=s[5],C=s[8];return r[0]=a*M+o*x+l*Q,r[3]=a*p+o*w+l*S,r[6]=a*d+o*B+l*C,r[1]=c*M+h*x+A*Q,r[4]=c*p+h*w+A*S,r[7]=c*d+h*B+A*C,r[2]=u*M+f*x+g*Q,r[5]=u*p+f*w+g*S,r[8]=u*d+f*B+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],A=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*A+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=A*M,e[1]=(s*c-h*n)*M,e[2]=(o*n-s*a)*M,e[3]=u*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=f*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(jr.makeScale(e,t)),this}rotate(e){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(jr.makeRotation(-e)),this}translate(e,t){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};dl.prototype.isMatrix3=!0;let Re=dl;const jr=new Re,Nl=new Re().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ol=new Re().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function df(){const i={enabled:!0,workingColorSpace:br,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Xe&&(s.r=Rn(s.r),s.g=Rn(s.g),s.b=Rn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Xe&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?Dr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[br]:{primaries:e,whitePoint:n,transfer:Dr,toXYZ:Nl,fromXYZ:Ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:Xe,toXYZ:Nl,fromXYZ:Ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}const Ve=df();function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class pf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gi===void 0&&(gi=xs("canvas")),gi.width=e.width,gi.height=e.height;const s=gi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Rn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return Me("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gf=0;class qo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=nn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($r(s[a].image)):r.push($r(s[a]))}else r=$r(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Me("Texture: Unable to serialize Texture."),{})}let mf=0;const ea=new b;class St extends Xn{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=bn,s=bn,r=bt,a=ai,o=tn,l=Yt,c=St.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=nn(),this.name="",this.source=new qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Me(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Me(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wa:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wa:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=nh;St.DEFAULT_ANISOTROPY=1;const pl=class pl{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],A=l[8],u=l[1],f=l[5],g=l[9],M=l[2],p=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(A-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(A+M)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,B=(f+1)/2,Q=(d+1)/2,S=(h+u)/4,C=(A+M)/4,E=(g+p)/4;return w>B&&w>Q?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=C/n):B>Q?B<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(B),n=S/s,r=E/s):Q<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(Q),n=C/r,s=E/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(A-M)*(A-M)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(A-M)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Le(this.x,e.x,t.x),this.y=Le(this.y,e.y,t.y),this.z=Le(this.z,e.z,t.z),this.w=Le(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Le(this.x,e,t),this.y=Le(this.y,e,t),this.z=Le(this.z,e,t),this.w=Le(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Le(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};pl.prototype.isVector4=!0;let $e=pl;class Ef extends Xn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new St(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new qo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Lt extends Ef{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class hh extends St{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bf extends St{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pr=class Pr{constructor(e,t,n,s,r,a,o,l,c,h,A,u,f,g,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,A,u,f,g,M,p)}set(e,t,n,s,r,a,o,l,c,h,A,u,f,g,M,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=A,d[14]=u,d[3]=f,d[7]=g,d[11]=M,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/mi.setFromMatrixColumn(e,0).length(),r=1/mi.setFromMatrixColumn(e,1).length(),a=1/mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),A=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*A,g=o*h,M=o*A;t[0]=l*h,t[4]=-l*A,t[8]=c,t[1]=f+g*c,t[5]=u-M*c,t[9]=-o*l,t[2]=M-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*A,g=c*h,M=c*A;t[0]=u+M*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*A,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=M+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*A,g=c*h,M=c*A;t[0]=u-M*o,t[4]=-a*A,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*A,g=o*h,M=o*A;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+M,t[1]=l*A,t[5]=M*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=M-u*A,t[8]=g*A+f,t[1]=A,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*A+g,t[10]=u-M*A}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,M=o*c;t[0]=l*h,t[4]=-A,t[8]=c*h,t[1]=u*A+M,t[5]=a*h,t[9]=f*A-g,t[2]=g*A-f,t[6]=o*h,t[10]=M*A+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mf,e,xf)}lookAt(e,t,n){const s=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Ln.crossVectors(n,Ht),Ln.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Ln.crossVectors(n,Ht)),Ln.normalize(),Us.crossVectors(Ht,Ln),s[0]=Ln.x,s[4]=Us.x,s[8]=Ht.x,s[1]=Ln.y,s[5]=Us.y,s[9]=Ht.y,s[2]=Ln.z,s[6]=Us.z,s[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],A=n[5],u=n[9],f=n[13],g=n[2],M=n[6],p=n[10],d=n[14],x=n[3],w=n[7],B=n[11],Q=n[15],S=s[0],C=s[4],E=s[8],v=s[12],I=s[1],D=s[5],T=s[9],k=s[13],Y=s[2],G=s[6],z=s[10],V=s[14],q=s[3],$=s[7],ue=s[11],pe=s[15];return r[0]=a*S+o*I+l*Y+c*q,r[4]=a*C+o*D+l*G+c*$,r[8]=a*E+o*T+l*z+c*ue,r[12]=a*v+o*k+l*V+c*pe,r[1]=h*S+A*I+u*Y+f*q,r[5]=h*C+A*D+u*G+f*$,r[9]=h*E+A*T+u*z+f*ue,r[13]=h*v+A*k+u*V+f*pe,r[2]=g*S+M*I+p*Y+d*q,r[6]=g*C+M*D+p*G+d*$,r[10]=g*E+M*T+p*z+d*ue,r[14]=g*v+M*k+p*V+d*pe,r[3]=x*S+w*I+B*Y+Q*q,r[7]=x*C+w*D+B*G+Q*$,r[11]=x*E+w*T+B*z+Q*ue,r[15]=x*v+w*k+B*V+Q*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],A=e[6],u=e[10],f=e[14],g=e[3],M=e[7],p=e[11],d=e[15],x=l*f-c*u,w=o*f-c*A,B=o*u-l*A,Q=a*f-c*h,S=a*u-l*h,C=a*A-o*h;return t*(M*x-p*w+d*B)-n*(g*x-p*Q+d*S)+s*(g*w-M*Q+d*C)-r*(g*B-M*S+p*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],A=e[9],u=e[10],f=e[11],g=e[12],M=e[13],p=e[14],d=e[15],x=t*o-n*a,w=t*l-s*a,B=t*c-r*a,Q=n*l-s*o,S=n*c-r*o,C=s*c-r*l,E=h*M-A*g,v=h*p-u*g,I=h*d-f*g,D=A*p-u*M,T=A*d-f*M,k=u*d-f*p,Y=x*k-w*T+B*D+Q*I-S*v+C*E;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/Y;return e[0]=(o*k-l*T+c*D)*G,e[1]=(s*T-n*k-r*D)*G,e[2]=(M*C-p*S+d*Q)*G,e[3]=(u*S-A*C-f*Q)*G,e[4]=(l*I-a*k-c*v)*G,e[5]=(t*k-s*I+r*v)*G,e[6]=(p*B-g*C-d*w)*G,e[7]=(h*C-u*B+f*w)*G,e[8]=(a*T-o*I+c*E)*G,e[9]=(n*I-t*T-r*E)*G,e[10]=(g*S-M*B+d*x)*G,e[11]=(A*B-h*S-f*x)*G,e[12]=(o*v-a*D-l*E)*G,e[13]=(t*D-n*v+s*E)*G,e[14]=(M*w-g*Q-p*x)*G,e[15]=(h*Q-A*w+u*x)*G,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,A=o+o,u=r*c,f=r*h,g=r*A,M=a*h,p=a*A,d=o*A,x=l*c,w=l*h,B=l*A,Q=n.x,S=n.y,C=n.z;return s[0]=(1-(M+d))*Q,s[1]=(f+B)*Q,s[2]=(g-w)*Q,s[3]=0,s[4]=(f-B)*S,s[5]=(1-(u+d))*S,s[6]=(p+x)*S,s[7]=0,s[8]=(g+w)*C,s[9]=(p-x)*C,s[10]=(1-(u+M))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=mi.set(s[0],s[1],s[2]).length();const o=mi.set(s[4],s[5],s[6]).length(),l=mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);const c=1/a,h=1/o,A=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=A,sn.elements[9]*=A,sn.elements[10]*=A,t.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=ln,l=!1){const c=this.elements,h=2*r/(t-e),A=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===ln)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Ms)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=A,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=ln,l=!1){const c=this.elements,h=2/(t-e),A=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===ln)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Ms)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=A,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Pr.prototype.isMatrix4=!0;let Ne=Pr;const mi=new b,sn=new Ne,Mf=new b(0,0,0),xf=new b(1,1,1),Ln=new b,Us=new b,Ht=new b,Hl=new Ne,kl=new ui;class Mn{constructor(e=0,t=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],A=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-A,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-A,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Le(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-A,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Me("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kl.setFromEuler(this),this.setFromQuaternion(kl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _f=0;const Vl=new b,Ei=new ui,_n=new Ne,Fs=new b,qi=new b,wf=new b,vf=new ui,zl=new b(1,0,0),Yl=new b(0,1,0),Wl=new b(0,0,1),Jl={type:"added"},Sf={type:"removed"},Bi={type:"childadded",child:null},ta={type:"childremoved",child:null};class rt extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rt.DEFAULT_UP.clone();const e=new b,t=new Mn,n=new ui,s=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Re}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.premultiply(Ei),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Yl,e)}rotateZ(e){return this.rotateOnAxis(Wl,e)}translateOnAxis(e,t){return Vl.copy(e).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Yl,e)}translateZ(e){return this.translateOnAxis(Wl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fs.copy(e):Fs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(qi,Fs,this.up):_n.lookAt(Fs,qi,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(_n),this.quaternion.premultiply(Ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(be("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):be("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),ta.child=e,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jl),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,e,wf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,vf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const A=l[c];r(e.shapes,A)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),A=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),A.length>0&&(n.shapes=A),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}rt.DEFAULT_UP=new b(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Yn extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qf={type:"move"};class na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,n),d=this._getHandJoint(c,M);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=c.joints["index-finger-tip"],A=c.joints["thumb-tip"],u=h.position.distanceTo(A.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function ia(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ve.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ve.workingColorSpace){if(e=Zo(e,1),t=Le(t,0,1),n=Le(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ia(a,r,e+1/3),this.g=ia(a,r,e),this.b=ia(a,r,e-1/3)}return Ve.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&Me("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Me("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Me("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=fh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Me("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Ve.workingToColorSpace(It.copy(this),e),Math.round(Le(It.r*255,0,255))*65536+Math.round(Le(It.g*255,0,255))*256+Math.round(Le(It.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.workingToColorSpace(It.copy(this),t);const n=It.r,s=It.g,r=It.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const A=a-o;switch(c=h<=.5?A/(a+o):A/(2-a-o),a){case n:l=(s-r)/A+(s<r?6:0);break;case s:l=(r-n)/A+2;break;case r:l=(n-s)/A+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=$t){Ve.workingToColorSpace(It.copy(this),e);const t=It.r,n=It.g,s=It.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Ps);const n=ds(Nn.h,Ps.h,t),s=ds(Nn.s,Ps.s,t),r=ds(Nn.l,Ps.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new we;we.NAMES=fh;class Ah{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new we(e),this.density=t}clone(){return new Ah(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class dh{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=n}clone(){return new dh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class yf extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const rn=new b,wn=new b,sa=new b,vn=new b,Mi=new b,xi=new b,Kl=new b,ra=new b,aa=new b,oa=new b,la=new $e,ca=new $e,ha=new $e;class Wt{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),wn.subVectors(n,t),sa.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(wn),l=rn.dot(sa),c=wn.dot(wn),h=wn.dot(sa),A=a*c-o*o;if(A===0)return r.set(0,0,0),null;const u=1/A,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return la.setScalar(0),ca.setScalar(0),ha.setScalar(0),la.fromBufferAttribute(e,t),ca.fromBufferAttribute(e,n),ha.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(la,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(ha,r.z),a}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),wn.subVectors(e,t),rn.cross(wn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),rn.cross(wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Wt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Mi.subVectors(s,n),xi.subVectors(r,n),ra.subVectors(e,n);const l=Mi.dot(ra),c=xi.dot(ra);if(l<=0&&c<=0)return t.copy(n);aa.subVectors(e,s);const h=Mi.dot(aa),A=xi.dot(aa);if(h>=0&&A<=h)return t.copy(s);const u=l*A-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Mi,a);oa.subVectors(e,r);const f=Mi.dot(oa),g=xi.dot(oa);if(g>=0&&f<=g)return t.copy(r);const M=f*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(xi,o);const p=h*g-f*A;if(p<=0&&A-h>=0&&f-g>=0)return Kl.subVectors(r,s),o=(A-h)/(A-h+(f-g)),t.copy(s).addScaledVector(Kl,o);const d=1/(p+M+u);return a=M*d,o=u*d,t.copy(n).addScaledVector(Mi,a).addScaledVector(xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Zn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gs.copy(n.boundingBox)),Gs.applyMatrix4(e.matrixWorld),this.union(Gs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ji),Ls.subVectors(this.max,ji),_i.subVectors(e.a,ji),wi.subVectors(e.b,ji),vi.subVectors(e.c,ji),On.subVectors(wi,_i),Hn.subVectors(vi,wi),$n.subVectors(_i,vi);let t=[0,-On.z,On.y,0,-Hn.z,Hn.y,0,-$n.z,$n.y,On.z,0,-On.x,Hn.z,0,-Hn.x,$n.z,0,-$n.x,-On.y,On.x,0,-Hn.y,Hn.x,0,-$n.y,$n.x,0];return!ua(t,_i,wi,vi,Ls)||(t=[1,0,0,0,1,0,0,0,1],!ua(t,_i,wi,vi,Ls))?!1:(Ns.crossVectors(On,Hn),t=[Ns.x,Ns.y,Ns.z],ua(t,_i,wi,vi,Ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new b,new b,new b,new b,new b,new b,new b,new b],an=new b,Gs=new Zn,_i=new b,wi=new b,vi=new b,On=new b,Hn=new b,$n=new b,ji=new b,Ls=new b,Ns=new b,ei=new b;function ua(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ei.fromArray(i,r);const o=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),l=e.dot(ei),c=t.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const In=Cf();function Cf(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function kt(i){Math.abs(i)>65504&&Me("DataUtils.toHalfFloat(): Value out of range."),i=Le(i,-65504,65504),In.floatView[0]=i;const e=In.uint32View[0],t=e>>23&511;return In.baseTable[t]+((e&8388607)>>In.shiftTable[t])}function Os(i){const e=i>>10;return In.uint32View[0]=In.mantissaTable[In.offsetTable[e]+(i&1023)]+In.exponentTable[e],In.floatView[0]}const mt=new b,Hs=new ee;let If=0;class Kt extends Xn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:If++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qo,this.updateRanges=[],this.gpuType=en,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ft(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ge(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ft(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ft(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ft(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ft(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ph extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gh extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class RB extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Os(this.array[e*this.itemSize]);return this.normalized&&(t=Ft(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize]=kt(t),this}getY(e){let t=Os(this.array[e*this.itemSize+1]);return this.normalized&&(t=Ft(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+1]=kt(t),this}getZ(e){let t=Os(this.array[e*this.itemSize+2]);return this.normalized&&(t=Ft(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+2]=kt(t),this}getW(e){let t=Os(this.array[e*this.itemSize+3]);return this.normalized&&(t=Ft(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ge(t,this.array)),this.array[e*this.itemSize+3]=kt(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array)),this.array[e+0]=kt(t),this.array[e+1]=kt(n),this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.array[e+0]=kt(t),this.array[e+1]=kt(n),this.array[e+2]=kt(s),this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[e+0]=kt(t),this.array[e+1]=kt(n),this.array[e+2]=kt(s),this.array[e+3]=kt(r),this}}class Te extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const bf=new Zn,$i=new b,fa=new b;class Un{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):bf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$i.subVectors(e,this.center);const t=$i.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector($i,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($i.copy(e.center).add(fa)),this.expandByPoint($i.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Df=0;const qt=new Ne,Aa=new rt,Si=new b,Vt=new Zn,es=new Zn,vt=new b;class at extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=nn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wu(e)?gh:ph)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Re().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return Aa.lookAt(e),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Te(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Me("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){be("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&be('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){be("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];es.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Vt.min,es.min),Vt.expandByPoint(vt),vt.addVectors(Vt.max,es.max),Vt.expandByPoint(vt)):(Vt.expandByPoint(es.min),Vt.expandByPoint(es.max))}Vt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)vt.fromBufferAttribute(o,c),l&&(Si.fromBufferAttribute(e,c),vt.add(Si)),s=Math.max(s,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&be('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){be("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Kt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new b,l[E]=new b;const c=new b,h=new b,A=new b,u=new ee,f=new ee,g=new ee,M=new b,p=new b;function d(E,v,I){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,v),A.fromBufferAttribute(n,I),u.fromBufferAttribute(r,E),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,I),h.sub(c),A.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(A,-f.y).multiplyScalar(D),p.copy(A).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),o[E].add(M),o[v].add(M),o[I].add(M),l[E].add(p),l[v].add(p),l[I].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let E=0,v=x.length;E<v;++E){const I=x[E],D=I.start,T=I.count;for(let k=D,Y=D+T;k<Y;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const w=new b,B=new b,Q=new b,S=new b;function C(E){Q.fromBufferAttribute(s,E),S.copy(Q);const v=o[E];w.copy(v),w.sub(Q.multiplyScalar(Q.dot(v))).normalize(),B.crossVectors(S,v);const D=B.dot(l[E])<0?-1:1;a.setXYZW(E,w.x,w.y,w.z,D)}for(let E=0,v=x.length;E<v;++E){const I=x[E],D=I.start,T=I.count;for(let k=D,Y=D+T;k<Y;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new b,r=new b,a=new b,o=new b,l=new b,c=new b,h=new b,A=new b;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),M=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),h.subVectors(a,r),A.subVectors(s,r),h.cross(A),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),A.subVectors(s,r),h.cross(A),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,A=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let M=0,p=l.length;M<p;M++){o.isInterleavedBufferAttribute?f=l[M]*o.data.stride+o.offset:f=l[M]*h;for(let d=0;d<h;d++)u[g++]=c[f++]}return new Kt(u,h,A)}if(this.index===null)return Me("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new at,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,A=c.length;h<A;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let A=0,u=c.length;A<u;A++){const f=c[A];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],A=r[c];for(let u=0,f=A.length;u<f;u++)h.push(A[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const A=a[c];this.addGroup(A.start,A.count,A.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qo,this.updateRanges=[],this.version=0,this.uuid=nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Rt=new b;class Tr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ft(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ge(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ge(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ft(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ft(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ft(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ft(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ge(t,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Rr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Tr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Rr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Rf=0;class Nt extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=nn(),this.name="",this.type="Material",this.blending=Pi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=La,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Me(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Me(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ga&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ee().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tf extends Nt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Qi;const ts=new b,yi=new b,Ci=new b,Ii=new ee,ns=new ee,Eh=new Ne,ks=new b,is=new b,Vs=new b,Xl=new ee,da=new ee,Zl=new ee;class TB extends rt{constructor(e=new Tf){if(super(),this.isSprite=!0,this.type="Sprite",Qi===void 0){Qi=new at;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mh(t,5);Qi.setIndex([0,1,2,0,2,3]),Qi.setAttribute("position",new Tr(n,3,0,!1)),Qi.setAttribute("uv",new Tr(n,2,3,!1))}this.geometry=Qi,this.material=e,this.center=new ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&be('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yi.setFromMatrixScale(this.matrixWorld),Eh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ci.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yi.multiplyScalar(-Ci.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;zs(ks.set(-.5,-.5,0),Ci,a,yi,s,r),zs(is.set(.5,-.5,0),Ci,a,yi,s,r),zs(Vs.set(.5,.5,0),Ci,a,yi,s,r),Xl.set(0,0),da.set(1,0),Zl.set(1,1);let o=e.ray.intersectTriangle(ks,is,Vs,!1,ts);if(o===null&&(zs(is.set(-.5,.5,0),Ci,a,yi,s,r),da.set(0,1),o=e.ray.intersectTriangle(ks,Vs,is,!1,ts),o===null))return;const l=e.ray.origin.distanceTo(ts);l<e.near||l>e.far||t.push({distance:l,point:ts.clone(),uv:Wt.getInterpolation(ts,ks,is,Vs,Xl,da,Zl,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function zs(i,e,t,n,s,r){Ii.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ns.x=r*Ii.x-s*Ii.y,ns.y=s*Ii.x+r*Ii.y):ns.copy(Ii),i.copy(e),i.x+=ns.x,i.y+=ns.y,i.applyMatrix4(Eh)}const Qn=new b,pa=new b,Ys=new b,kn=new b,ga=new b,Ws=new b,ma=new b;class Nr{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pa.copy(e).add(t).multiplyScalar(.5),Ys.copy(t).sub(e).normalize(),kn.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ys),o=kn.dot(this.direction),l=-kn.dot(Ys),c=kn.lengthSq(),h=Math.abs(1-a*a);let A,u,f,g;if(h>0)if(A=a*l-o,u=a*o-l,g=r*h,A>=0)if(u>=-g)if(u<=g){const M=1/h;A*=M,u*=M,f=A*(A+a*u+2*o)+u*(a*A+u+2*l)+c}else u=r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;else u=-r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;else u<=-g?(A=Math.max(0,-(-a*r+o)),u=A>0?-r:Math.min(Math.max(-r,-l),r),f=-A*A+u*(u+2*l)+c):u<=g?(A=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(A=Math.max(0,-(a*r+o)),u=A>0?r:Math.min(Math.max(-r,-l),r),f=-A*A+u*(u+2*l)+c);else u=a>0?-r:r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,A),s&&s.copy(pa).addScaledVector(Ys,u),f}intersectSphere(e,t){Qn.subVectors(e.center,this.origin);const n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,A=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),A>=0?(o=(e.min.z-u.z)*A,l=(e.max.z-u.z)*A):(o=(e.max.z-u.z)*A,l=(e.min.z-u.z)*A),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,s,r){ga.subVectors(t,e),Ws.subVectors(n,e),ma.crossVectors(ga,Ws);let a=this.direction.dot(ma),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,e);const l=o*this.direction.dot(Ws.crossVectors(kn,Ws));if(l<0)return null;const c=o*this.direction.dot(ga.cross(kn));if(c<0||l+c>a)return null;const h=-o*kn.dot(ma);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jo extends Nt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Gr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ql=new Ne,ti=new Nr,Js=new Un,jl=new b,Ks=new b,Xs=new b,Zs=new b,Ea=new b,qs=new b,$l=new b,js=new b;class Et extends rt{constructor(e=new at,t=new jo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],A=r[l];h!==0&&(Ea.fromBufferAttribute(A,e),a?qs.addScaledVector(Ea,h):qs.addScaledVector(Ea.sub(t),h))}t.add(qs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),ti.copy(e.ray).recast(e.near),!(Js.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Js,jl)===null||ti.origin.distanceToSquared(jl)>(e.far-e.near)**2))&&(ql.copy(r).invert(),ti.copy(e.ray).applyMatrix4(ql),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,A=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const p=u[g],d=a[p.materialIndex],x=Math.max(p.start,f.start),w=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let B=x,Q=w;B<Q;B+=3){const S=o.getX(B),C=o.getX(B+1),E=o.getX(B+2);s=$s(this,d,e,n,c,h,A,S,C,E),s&&(s.faceIndex=Math.floor(B/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let p=g,d=M;p<d;p+=3){const x=o.getX(p),w=o.getX(p+1),B=o.getX(p+2);s=$s(this,a,e,n,c,h,A,x,w,B),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const p=u[g],d=a[p.materialIndex],x=Math.max(p.start,f.start),w=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let B=x,Q=w;B<Q;B+=3){const S=B,C=B+1,E=B+2;s=$s(this,d,e,n,c,h,A,S,C,E),s&&(s.faceIndex=Math.floor(B/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let p=g,d=M;p<d;p+=3){const x=p,w=p+1,B=p+2;s=$s(this,a,e,n,c,h,A,x,w,B),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Uf(i,e,t,n,s,r,a,o){let l;if(e.side===Pt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Jn,o),l===null)return null;js.copy(o),js.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(js);return c<t.near||c>t.far?null:{distance:c,point:js.clone(),object:i}}function $s(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ks),i.getVertexPosition(l,Xs),i.getVertexPosition(c,Zs);const h=Uf(i,e,t,n,Ks,Xs,Zs,$l);if(h){const A=new b;Wt.getBarycoord($l,Ks,Xs,Zs,A),s&&(h.uv=Wt.getInterpolatedAttribute(s,o,l,c,A,new ee)),r&&(h.uv1=Wt.getInterpolatedAttribute(r,o,l,c,A,new ee)),a&&(h.normal=Wt.getInterpolatedAttribute(a,o,l,c,A,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new b,materialIndex:0};Wt.getNormal(Ks,Xs,Zs,u.normal),h.face=u,h.barycoord=A}return h}const ss=new $e,ec=new $e,tc=new $e,Ff=new $e,nc=new Ne,er=new b,Ba=new Un,ic=new Ne,Ma=new Nr;class UB extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Il,this.bindMatrix=new Ne,this.bindMatrixInverse=new Ne,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Zn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingBox.expandByPoint(er)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingSphere.expandByPoint(er)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ba.copy(this.boundingSphere),Ba.applyMatrix4(s),e.ray.intersectsSphere(Ba)!==!1&&(ic.copy(s).invert(),Ma.copy(e.ray).applyMatrix4(ic),!(this.boundingBox!==null&&Ma.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ma)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new $e,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Il?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Me("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;ec.fromBufferAttribute(s.attributes.skinIndex,e),tc.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ss.copy(t),t.set(0,0,0,0)):(ss.set(...t,1),t.set(0,0,0)),ss.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=tc.getComponent(r);if(a!==0){const o=ec.getComponent(r);nc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Ff.copy(ss).applyMatrix4(nc),a)}}return t.isVector4&&(t.w=ss.w),t.applyMatrix4(this.bindMatrixInverse)}}class Pf extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class $o extends St{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Mt,h=Mt,A,u){super(null,a,o,l,c,h,s,r,A,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const sc=new Ne,Gf=new Ne;class Bh{constructor(e=[],t=[]){this.uuid=nn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Me("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ne)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ne;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Gf;sc.multiplyMatrices(o,t[r]),sc.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new $o(t,e,e,tn,en);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(Me("Skeleton: No bone found with UUID:",r),a=new Pf),this.bones.push(a),this.boneInverses.push(new Ne().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class rc extends Kt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const bi=new Ne,ac=new Ne,tr=[],oc=new Zn,Lf=new Ne,rs=new Et,as=new Un;class Or extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Lf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),oc.copy(e.boundingBox).applyMatrix4(bi),this.boundingBox.union(oc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),as.copy(e.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(as)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(n),e.ray.intersectsSphere(as)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,bi),ac.multiplyMatrices(n,bi),rs.matrixWorld=ac,rs.raycast(e,tr);for(let a=0,o=tr.length;a<o;a++){const l=tr[a];l.instanceId=r,l.object=this,t.push(l)}tr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new rc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new $o(new Float32Array(s*this.count),s,this.count,zo,en));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const xa=new b,Nf=new b,Of=new Re;class ii{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=xa.subVectors(n,t).cross(Nf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(xa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Of.getNormalMatrix(e),s=this.coplanarPoint(xa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new Un,Hf=new ee(.5,.5),nr=new b;class ws{constructor(e=new ii,t=new ii,n=new ii,s=new ii,r=new ii,a=new ii){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ln,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],A=r[5],u=r[6],f=r[7],g=r[8],M=r[9],p=r[10],d=r[11],x=r[12],w=r[13],B=r[14],Q=r[15];if(s[0].setComponents(c-a,f-h,d-g,Q-x).normalize(),s[1].setComponents(c+a,f+h,d+g,Q+x).normalize(),s[2].setComponents(c+o,f+A,d+M,Q+w).normalize(),s[3].setComponents(c-o,f-A,d-M,Q-w).normalize(),n)s[4].setComponents(l,u,p,B).normalize(),s[5].setComponents(c-l,f-u,d-p,Q-B).normalize();else if(s[4].setComponents(c-l,f-u,d-p,Q-B).normalize(),t===ln)s[5].setComponents(c+l,f+u,d+p,Q+B).normalize();else if(t===Ms)s[5].setComponents(l,u,p,B).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){ni.center.set(0,0,0);const t=Hf.distanceTo(e.center);return ni.radius=.7071067811865476+t,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(nr.x=s.normal.x>0?e.max.x:e.min.x,nr.y=s.normal.y>0?e.max.y:e.min.y,nr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(nr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const lc=new Ne;class Mh{constructor(){this.coordinateSystem=ln,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];lc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new ws),n[s].setFromProjectionMatrix(lc,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new ws),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new Mh().copy(this)}}class el extends Nt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ur=new b,Fr=new b,cc=new Ne,os=new Nr,ir=new Un,_a=new b,hc=new b;class xh extends rt{constructor(e=new at,t=new el){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ur.fromBufferAttribute(t,s-1),Fr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ur.distanceTo(Fr);e.setAttribute("lineDistance",new Te(n,1))}else Me("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),ir.radius+=r,e.ray.intersectsSphere(ir)===!1)return;cc.copy(s).invert(),os.copy(e.ray).applyMatrix4(cc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=f,p=g-1;M<p;M+=c){const d=h.getX(M),x=h.getX(M+1),w=sr(this,e,os,l,d,x,M);w&&t.push(w)}if(this.isLineLoop){const M=h.getX(g-1),p=h.getX(f),d=sr(this,e,os,l,M,p,g-1);d&&t.push(d)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=f,p=g-1;M<p;M+=c){const d=sr(this,e,os,l,M,M+1,M);d&&t.push(d)}if(this.isLineLoop){const M=sr(this,e,os,l,g-1,f,g-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function sr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ur.fromBufferAttribute(o,s),Fr.fromBufferAttribute(o,r),t.distanceSqToSegment(Ur,Fr,_a,hc)>n)return;_a.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_a);if(!(c<e.near||c>e.far))return{distance:c,point:hc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const uc=new b,fc=new b;class kf extends xh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)uc.fromBufferAttribute(t,s),fc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+uc.distanceTo(fc);e.setAttribute("lineDistance",new Te(n,1))}else Me("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class FB extends xh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Vf extends Nt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ac=new Ne,yo=new Nr,rr=new Un,ar=new b;class PB extends rt{constructor(e=new at,t=new Vf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),rr.radius+=r,e.ray.intersectsSphere(rr)===!1)return;Ac.copy(s).invert(),yo.copy(e.ray).applyMatrix4(Ac);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,A=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=u,M=f;g<M;g++){const p=c.getX(g);ar.fromBufferAttribute(A,p),dc(ar,p,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(A.count,a.start+a.count);for(let g=u,M=f;g<M;g++)ar.fromBufferAttribute(A,g),dc(ar,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function dc(i,e,t,n,s,r,a){const o=yo.distanceSqToPoint(i);if(o<t){const l=new b;yo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class GB extends St{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Mt,this.minFilter=Mt,this.generateMipmaps=!1,this.needsUpdate=!0}}class _h extends St{constructor(e=[],t=li,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class LB extends St{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vi extends St{constructor(e,t,n=Bn,s,r,a,o=Mt,l=Mt,c,h=Tn,A=1){if(h!==Tn&&h!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:A};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class zf extends Vi{constructor(e,t=Bn,n=li,s,r,a=Mt,o=Mt,l,c=Tn){const h={width:e,height:e,depth:1},A=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=A,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class wh extends St{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qn extends at{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],A=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(A,2));function g(M,p,d,x,w,B,Q,S,C,E,v){const I=B/C,D=Q/E,T=B/2,k=Q/2,Y=S/2,G=C+1,z=E+1;let V=0,q=0;const $=new b;for(let ue=0;ue<z;ue++){const pe=ue*D-k;for(let Ee=0;Ee<G;Ee++){const We=Ee*I-T;$[M]=We*x,$[p]=pe*w,$[d]=Y,c.push($.x,$.y,$.z),$[M]=0,$[p]=0,$[d]=S>0?1:-1,h.push($.x,$.y,$.z),A.push(Ee/C),A.push(1-ue/E),V+=1}}for(let ue=0;ue<E;ue++)for(let pe=0;pe<C;pe++){const Ee=u+pe+G*ue,We=u+pe+G*(ue+1),lt=u+(pe+1)+G*(ue+1),Je=u+(pe+1)+G*ue;l.push(Ee,We,Je),l.push(We,lt,Je),q+=6}o.addGroup(f,q,v),f+=q,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vh extends at{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=t/2,A=Math.PI/2*e,u=t,f=2*A+u,g=n*2+r,M=s+1,p=new b,d=new b;for(let x=0;x<=g;x++){let w=0,B=0,Q=0,S=0;if(x<=n){const v=x/n,I=v*Math.PI/2;B=-h-e*Math.cos(I),Q=e*Math.sin(I),S=-e*Math.cos(I),w=v*A}else if(x<=n+r){const v=(x-n)/r;B=-h+v*t,Q=e,S=0,w=A+v*u}else{const v=(x-n-r)/n,I=v*Math.PI/2;B=h+e*Math.sin(I),Q=e*Math.cos(I),S=e*Math.sin(I),w=A+u+v*A}const C=Math.max(0,Math.min(1,w/f));let E=0;x===0?E=.5/s:x===g&&(E=-.5/s);for(let v=0;v<=s;v++){const I=v/s,D=I*Math.PI*2,T=Math.sin(D),k=Math.cos(D);d.x=-Q*k,d.y=B,d.z=Q*T,o.push(d.x,d.y,d.z),p.set(-Q*k,S,Q*T),p.normalize(),l.push(p.x,p.y,p.z),c.push(I+E,C)}if(x>0){const v=(x-1)*M;for(let I=0;I<s;I++){const D=v+I,T=v+I+1,k=x*M+I,Y=x*M+I+1;a.push(D,T,k),a.push(T,Y,k)}}}this.setIndex(a),this.setAttribute("position",new Te(o,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vh(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Sh extends at{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new b,h=new ee;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let A=0,u=3;A<=t;A++,u+=3){const f=n+A/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let A=1;A<=t;A++)r.push(A,A+1,0);this.setIndex(r),this.setAttribute("position",new Te(a,3)),this.setAttribute("normal",new Te(o,3)),this.setAttribute("uv",new Te(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class tl extends at{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],A=[],u=[],f=[];let g=0;const M=[],p=n/2;let d=0;x(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Te(A,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(f,2));function x(){const B=new b,Q=new b;let S=0;const C=(t-e)/n;for(let E=0;E<=r;E++){const v=[],I=E/r,D=I*(t-e)+e;for(let T=0;T<=s;T++){const k=T/s,Y=k*l+o,G=Math.sin(Y),z=Math.cos(Y);Q.x=D*G,Q.y=-I*n+p,Q.z=D*z,A.push(Q.x,Q.y,Q.z),B.set(G,C,z).normalize(),u.push(B.x,B.y,B.z),f.push(k,1-I),v.push(g++)}M.push(v)}for(let E=0;E<s;E++)for(let v=0;v<r;v++){const I=M[v][E],D=M[v+1][E],T=M[v+1][E+1],k=M[v][E+1];(e>0||v!==0)&&(h.push(I,D,k),S+=3),(t>0||v!==r-1)&&(h.push(D,T,k),S+=3)}c.addGroup(d,S,0),d+=S}function w(B){const Q=g,S=new ee,C=new b;let E=0;const v=B===!0?e:t,I=B===!0?1:-1;for(let T=1;T<=s;T++)A.push(0,p*I,0),u.push(0,I,0),f.push(.5,.5),g++;const D=g;for(let T=0;T<=s;T++){const Y=T/s*l+o,G=Math.cos(Y),z=Math.sin(Y);C.x=v*z,C.y=p*I,C.z=v*G,A.push(C.x,C.y,C.z),u.push(0,I,0),S.x=G*.5+.5,S.y=z*.5*I+.5,f.push(S.x,S.y),g++}for(let T=0;T<s;T++){const k=Q+T,Y=D+T;B===!0?h.push(Y,Y+1,k):h.push(Y+1,Y,k),E+=3}c.addGroup(d,E,B===!0?1:2),d+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qh extends tl{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Qh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wi extends at{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Te(r,3)),this.setAttribute("normal",new Te(r.slice(),3)),this.setAttribute("uv",new Te(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const w=new b,B=new b,Q=new b;for(let S=0;S<t.length;S+=3)f(t[S+0],w),f(t[S+1],B),f(t[S+2],Q),l(w,B,Q,x)}function l(x,w,B,Q){const S=Q+1,C=[];for(let E=0;E<=S;E++){C[E]=[];const v=x.clone().lerp(B,E/S),I=w.clone().lerp(B,E/S),D=S-E;for(let T=0;T<=D;T++)T===0&&E===S?C[E][T]=v:C[E][T]=v.clone().lerp(I,T/D)}for(let E=0;E<S;E++)for(let v=0;v<2*(S-E)-1;v++){const I=Math.floor(v/2);v%2===0?(u(C[E][I+1]),u(C[E+1][I]),u(C[E][I])):(u(C[E][I+1]),u(C[E+1][I+1]),u(C[E+1][I]))}}function c(x){const w=new b;for(let B=0;B<r.length;B+=3)w.x=r[B+0],w.y=r[B+1],w.z=r[B+2],w.normalize().multiplyScalar(x),r[B+0]=w.x,r[B+1]=w.y,r[B+2]=w.z}function h(){const x=new b;for(let w=0;w<r.length;w+=3){x.x=r[w+0],x.y=r[w+1],x.z=r[w+2];const B=p(x)/2/Math.PI+.5,Q=d(x)/Math.PI+.5;a.push(B,1-Q)}g(),A()}function A(){for(let x=0;x<a.length;x+=6){const w=a[x+0],B=a[x+2],Q=a[x+4],S=Math.max(w,B,Q),C=Math.min(w,B,Q);S>.9&&C<.1&&(w<.2&&(a[x+0]+=1),B<.2&&(a[x+2]+=1),Q<.2&&(a[x+4]+=1))}}function u(x){r.push(x.x,x.y,x.z)}function f(x,w){const B=x*3;w.x=e[B+0],w.y=e[B+1],w.z=e[B+2]}function g(){const x=new b,w=new b,B=new b,Q=new b,S=new ee,C=new ee,E=new ee;for(let v=0,I=0;v<r.length;v+=9,I+=6){x.set(r[v+0],r[v+1],r[v+2]),w.set(r[v+3],r[v+4],r[v+5]),B.set(r[v+6],r[v+7],r[v+8]),S.set(a[I+0],a[I+1]),C.set(a[I+2],a[I+3]),E.set(a[I+4],a[I+5]),Q.copy(x).add(w).add(B).divideScalar(3);const D=p(Q);M(S,I+0,x,D),M(C,I+2,w,D),M(E,I+4,B,D)}}function M(x,w,B,Q){Q<0&&x.x===1&&(a[w]=x.x-1),B.x===0&&B.z===0&&(a[w]=Q/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.vertices,e.indices,e.radius,e.detail)}}class yh extends Wi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new yh(e.radius,e.detail)}}const or=new b,lr=new b,wa=new b,cr=new Wt;class NB extends at{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Li*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],A=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:M,b:p,c:d}=cr;if(M.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),cr.getNormal(wa),A[0]=`${Math.round(M.x*s)},${Math.round(M.y*s)},${Math.round(M.z*s)}`,A[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,A[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(A[0]===A[1]||A[1]===A[2]||A[2]===A[0]))for(let x=0;x<3;x++){const w=(x+1)%3,B=A[x],Q=A[w],S=cr[h[x]],C=cr[h[w]],E=`${B}_${Q}`,v=`${Q}_${B}`;v in u&&u[v]?(wa.dot(u[v].normal)<=r&&(f.push(S.x,S.y,S.z),f.push(C.x,C.y,C.z)),u[v]=null):E in u||(u[E]={index0:c[x],index1:c[w],normal:wa.clone()})}}for(const g in u)if(u[g]){const{index0:M,index1:p}=u[g];or.fromBufferAttribute(o,M),lr.fromBufferAttribute(o,p),f.push(or.x,or.y,or.z),f.push(lr.x,lr.y,lr.z)}this.setAttribute("position",new Te(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Me("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ee:new b);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new b,s=[],r=[],a=[],o=new b,l=new Ne;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new b)}r[0]=new b,a[0]=new b;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),A=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),A<=c&&(c=A,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Le(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Le(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class nl extends xn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ee){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),A=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*A+this.aX,c=u*A+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Yf extends nl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function il(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,A){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+A)+(l-o)/A;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const pc=new b,gc=new b,va=new il,Sa=new il,Qa=new il;class Wf extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new b){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(gc.subVectors(s[0],s[1]).add(s[0]),c=gc);const A=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(pc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=pc),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(A),f),M=Math.pow(A.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(h),f);M<1e-4&&(M=1),g<1e-4&&(g=M),p<1e-4&&(p=M),va.initNonuniformCatmullRom(c.x,A.x,u.x,h.x,g,M,p),Sa.initNonuniformCatmullRom(c.y,A.y,u.y,h.y,g,M,p),Qa.initNonuniformCatmullRom(c.z,A.z,u.z,h.z,g,M,p)}else this.curveType==="catmullrom"&&(va.initCatmullRom(c.x,A.x,u.x,h.x,this.tension),Sa.initCatmullRom(c.y,A.y,u.y,h.y,this.tension),Qa.initCatmullRom(c.z,A.z,u.z,h.z,this.tension));return n.set(va.calc(l),Sa.calc(l),Qa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new b().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function mc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Jf(i,e){const t=1-i;return t*t*e}function Kf(i,e){return 2*(1-i)*i*e}function Xf(i,e){return i*i*e}function ps(i,e,t,n){return Jf(i,e)+Kf(i,t)+Xf(i,n)}function Zf(i,e){const t=1-i;return t*t*t*e}function qf(i,e){const t=1-i;return 3*t*t*i*e}function jf(i,e){return 3*(1-i)*i*i*e}function $f(i,e){return i*i*i*e}function gs(i,e,t,n,s){return Zf(i,e)+qf(i,t)+jf(i,n)+$f(i,s)}class Ch extends xn{constructor(e=new ee,t=new ee,n=new ee,s=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(gs(e,s.x,r.x,a.x,o.x),gs(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class eA extends xn{constructor(e=new b,t=new b,n=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(gs(e,s.x,r.x,a.x,o.x),gs(e,s.y,r.y,a.y,o.y),gs(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ih extends xn{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tA extends xn{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bh extends xn{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ps(e,s.x,r.x,a.x),ps(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dh extends xn{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ps(e,s.x,r.x,a.x),ps(e,s.y,r.y,a.y),ps(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rh extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],A=s[a>s.length-3?s.length-1:a+2];return n.set(mc(o,l.x,c.x,h.x,A.x),mc(o,l.y,c.y,h.y,A.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ee().fromArray(s))}return this}}var Co=Object.freeze({__proto__:null,ArcCurve:Yf,CatmullRomCurve3:Wf,CubicBezierCurve:Ch,CubicBezierCurve3:eA,EllipseCurve:nl,LineCurve:Ih,LineCurve3:tA,QuadraticBezierCurve:bh,QuadraticBezierCurve3:Dh,SplineCurve:Rh});class nA extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Co[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Co[s.type]().fromJSON(s))}return this}}class Ec extends nA{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ih(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new bh(this.currentPoint.clone(),new ee(e,t),new ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Ch(this.currentPoint.clone(),new ee(e,t),new ee(n,s),new ee(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Rh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new nl(e,t,n,s,r,a,o,l);if(this.curves.length>0){const A=c.getPoint(0);A.equals(this.currentPoint)||this.lineTo(A.x,A.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class iA extends Ec{constructor(e){super(e),this.uuid=nn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Ec().fromJSON(s))}return this}}function sA(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Th(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=cA(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,A=l;for(let u=t;u<s;u+=t){const f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>A&&(A=g)}c=Math.max(h-o,A-l),c=c!==0?32767/c:0}return vs(r,a,t,o,l,c,0),a}function Th(i,e,t,n,s){let r;if(s===MA(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Bc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Bc(a/n|0,i[a],i[a+1],r);return r&&zi(r,r.next)&&(Qs(r),r=r.next),r}function hi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(zi(t,t.next)||ot(t.prev,t,t.next)===0)){if(Qs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function vs(i,e,t,n,s,r,a){if(!i)return;!a&&r&&dA(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?aA(i,n,s,r):rA(i)){e.push(l.i,i.i,c.i),Qs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=oA(hi(i),e),vs(i,e,t,n,s,r,2)):a===2&&lA(i,e,t,n,s,r):vs(hi(i),e,t,n,s,r,1);break}}}function rA(i){const e=i.prev,t=i,n=i.next;if(ot(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),A=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=A&&g.y<=f&&fs(s,o,r,l,a,c,g.x,g.y)&&ot(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function aA(i,e,t,n){const s=i.prev,r=i,a=i.next;if(ot(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,A=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,A,u),M=Math.max(o,l,c),p=Math.max(h,A,u),d=Io(f,g,e,t,n),x=Io(M,p,e,t,n);let w=i.prevZ,B=i.nextZ;for(;w&&w.z>=d&&B&&B.z<=x;){if(w.x>=f&&w.x<=M&&w.y>=g&&w.y<=p&&w!==s&&w!==a&&fs(o,h,l,A,c,u,w.x,w.y)&&ot(w.prev,w,w.next)>=0||(w=w.prevZ,B.x>=f&&B.x<=M&&B.y>=g&&B.y<=p&&B!==s&&B!==a&&fs(o,h,l,A,c,u,B.x,B.y)&&ot(B.prev,B,B.next)>=0))return!1;B=B.nextZ}for(;w&&w.z>=d;){if(w.x>=f&&w.x<=M&&w.y>=g&&w.y<=p&&w!==s&&w!==a&&fs(o,h,l,A,c,u,w.x,w.y)&&ot(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;B&&B.z<=x;){if(B.x>=f&&B.x<=M&&B.y>=g&&B.y<=p&&B!==s&&B!==a&&fs(o,h,l,A,c,u,B.x,B.y)&&ot(B.prev,B,B.next)>=0)return!1;B=B.nextZ}return!0}function oA(i,e){let t=i;do{const n=t.prev,s=t.next.next;!zi(n,s)&&Fh(n,t,t.next,s)&&Ss(n,s)&&Ss(s,n)&&(e.push(n.i,t.i,s.i),Qs(t),Qs(t.next),t=i=s),t=t.next}while(t!==i);return hi(t)}function lA(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&mA(a,o)){let l=Ph(a,o);a=hi(a,a.next),l=hi(l,l.next),vs(a,e,t,n,s,r,0),vs(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function cA(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Th(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(gA(c))}s.sort(hA);for(let r=0;r<s.length;r++)t=uA(s[r],t);return t}function hA(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function uA(i,e){const t=fA(i,e);if(!t)return e;const n=Ph(t,i);return hi(n,n.next),hi(t,t.next)}function fA(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(zi(i,t))return t;do{if(zi(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const A=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(A<=n&&A>r&&(r=A,a=t.x<t.next.x?t:t.next,A===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Uh(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const A=Math.abs(s-t.y)/(n-t.x);Ss(t,i)&&(A<h||A===h&&(t.x>a.x||t.x===a.x&&AA(a,t)))&&(a=t,h=A)}t=t.next}while(t!==o);return a}function AA(i,e){return ot(i.prev,i,e.prev)<0&&ot(e.next,i,i.next)<0}function dA(i,e,t,n){let s=i;do s.z===0&&(s.z=Io(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,pA(s)}function pA(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Io(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function gA(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Uh(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function fs(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Uh(i,e,t,n,s,r,a,o)}function mA(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!EA(i,e)&&(Ss(i,e)&&Ss(e,i)&&BA(i,e)&&(ot(i.prev,i,e.prev)||ot(i,e.prev,e))||zi(i,e)&&ot(i.prev,i,i.next)>0&&ot(e.prev,e,e.next)>0)}function ot(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function zi(i,e){return i.x===e.x&&i.y===e.y}function Fh(i,e,t,n){const s=ur(ot(i,e,t)),r=ur(ot(i,e,n)),a=ur(ot(t,n,i)),o=ur(ot(t,n,e));return!!(s!==r&&a!==o||s===0&&hr(i,t,e)||r===0&&hr(i,n,e)||a===0&&hr(t,i,n)||o===0&&hr(t,e,n))}function hr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ur(i){return i>0?1:i<0?-1:0}function EA(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Fh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ss(i,e){return ot(i.prev,i,i.next)<0?ot(i,e,i.next)>=0&&ot(i,i.prev,e)>=0:ot(i,e,i.prev)<0||ot(i,i.next,e)<0}function BA(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ph(i,e){const t=bo(i.i,i.x,i.y),n=bo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Bc(i,e,t,n){const s=bo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Qs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function bo(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function MA(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class xA{static triangulate(e,t,n=2){return sA(e,t,n)}}class ms{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return ms.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Mc(e),xc(n,e);let a=e.length;t.forEach(Mc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,xc(n,t[l]);const o=xA.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Mc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function xc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Gh extends Wi{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gh(e.radius,e.detail)}}class Lh extends Wi{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lh(e.radius,e.detail)}}class Hr extends at{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,A=e/o,u=t/l,f=[],g=[],M=[],p=[];for(let d=0;d<h;d++){const x=d*u-a;for(let w=0;w<c;w++){const B=w*A-r;g.push(B,-x,0),M.push(0,0,1),p.push(w/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const w=x+c*d,B=x+c*(d+1),Q=x+1+c*(d+1),S=x+1+c*d;f.push(w,B,S),f.push(B,Q,S)}this.setIndex(f),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(M,3)),this.setAttribute("uv",new Te(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Nh extends at{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let A=e;const u=(t-e)/s,f=new b,g=new ee;for(let M=0;M<=s;M++){for(let p=0;p<=n;p++){const d=r+p/n*a;f.x=A*Math.cos(d),f.y=A*Math.sin(d),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}A+=u}for(let M=0;M<s;M++){const p=M*(n+1);for(let d=0;d<n;d++){const x=d+p,w=x,B=x+n+1,Q=x+n+2,S=x+1;o.push(w,B,S),o.push(B,Q,S)}}this.setIndex(o),this.setAttribute("position",new Te(l,3)),this.setAttribute("normal",new Te(c,3)),this.setAttribute("uv",new Te(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Oh extends at{constructor(e=new iA([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Te(s,3)),this.setAttribute("normal",new Te(r,3)),this.setAttribute("uv",new Te(a,2));function c(h){const A=s.length/3,u=h.extractPoints(t);let f=u.shape;const g=u.holes;ms.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,d=g.length;p<d;p++){const x=g[p];ms.isClockWise(x)===!0&&(g[p]=x.reverse())}const M=ms.triangulateShape(f,g);for(let p=0,d=g.length;p<d;p++){const x=g[p];f=f.concat(x)}for(let p=0,d=f.length;p<d;p++){const x=f[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,d=M.length;p<d;p++){const x=M[p],w=x[0]+A,B=x[1]+A,Q=x[2]+A;n.push(w,B,Q),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return _A(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Oh(n,e.curveSegments)}}function _A(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Hh extends at{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],A=new b,u=new b,f=[],g=[],M=[],p=[];for(let d=0;d<=n;d++){const x=[],w=d/n,B=a+w*o,Q=e*Math.cos(B),S=Math.sqrt(e*e-Q*Q);let C=0;d===0&&a===0?C=.5/t:d===n&&l===Math.PI&&(C=-.5/t);for(let E=0;E<=t;E++){const v=E/t,I=s+v*r;A.x=-S*Math.cos(I),A.y=Q,A.z=S*Math.sin(I),g.push(A.x,A.y,A.z),u.copy(A).normalize(),M.push(u.x,u.y,u.z),p.push(v+C,1-w),x.push(c++)}h.push(x)}for(let d=0;d<n;d++)for(let x=0;x<t;x++){const w=h[d][x+1],B=h[d][x],Q=h[d+1][x],S=h[d+1][x+1];(d!==0||a>0)&&f.push(w,B,S),(d!==n-1||l<Math.PI)&&f.push(B,Q,S)}this.setIndex(f),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(M,3)),this.setAttribute("uv",new Te(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class kh extends Wi{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kh(e.radius,e.detail)}}class Vh extends at{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],A=[],u=new b,f=new b,g=new b;for(let M=0;M<=n;M++){const p=a+M/n*o;for(let d=0;d<=s;d++){const x=d/s*r;f.x=(e+t*Math.cos(p))*Math.cos(x),f.y=(e+t*Math.cos(p))*Math.sin(x),f.z=t*Math.sin(p),c.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),A.push(d/s),A.push(M/n)}}for(let M=1;M<=n;M++)for(let p=1;p<=s;p++){const d=(s+1)*M+p-1,x=(s+1)*(M-1)+p-1,w=(s+1)*(M-1)+p,B=(s+1)*M+p;l.push(d,x,B),l.push(x,w,B)}this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(A,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class zh extends at{constructor(e=new Dh(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new b,l=new b,c=new ee;let h=new b;const A=[],u=[],f=[],g=[];M(),this.setIndex(g),this.setAttribute("position",new Te(A,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(f,2));function M(){for(let w=0;w<t;w++)p(w);p(r===!1?t:0),x(),d()}function p(w){h=e.getPointAt(w/t,h);const B=a.normals[w],Q=a.binormals[w];for(let S=0;S<=s;S++){const C=S/s*Math.PI*2,E=Math.sin(C),v=-Math.cos(C);l.x=v*B.x+E*Q.x,l.y=v*B.y+E*Q.y,l.z=v*B.z+E*Q.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,A.push(o.x,o.y,o.z)}}function d(){for(let w=1;w<=t;w++)for(let B=1;B<=s;B++){const Q=(s+1)*(w-1)+(B-1),S=(s+1)*w+(B-1),C=(s+1)*w+B,E=(s+1)*(w-1)+B;g.push(Q,S,E),g.push(S,C,E)}}function x(){for(let w=0;w<=t;w++)for(let B=0;B<=s;B++)c.x=w/t,c.y=B/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new zh(new Co[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class OB extends Nt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new we(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function Yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(_c(s))s.isRenderTargetTexture?(Me("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(_c(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Ut(i){const e={};for(let t=0;t<i.length;t++){const n=Yi(i[t]);for(const s in n)e[s]=n[s]}return e}function _c(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function wA(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const ys={clone:Yi,merge:Ut};var vA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,SA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dt extends Nt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vA,this.fragmentShader=SA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=wA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(s.value);break;case"v2":this.uniforms[n].value=new ee().fromArray(s.value);break;case"v3":this.uniforms[n].value=new b().fromArray(s.value);break;case"v4":this.uniforms[n].value=new $e().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Re().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ne().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Wh extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Do extends Nt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class sl extends Do{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Le(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class HB extends Nt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Gr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kB extends Nt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new we(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class VB extends Nt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class QA extends Nt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Gr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yA extends Nt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class CA extends Nt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zB extends Nt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new we(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kn,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class YB extends el{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function fr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function IA(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function wc(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function bA(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Is{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class DA extends Is{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Dl,endingEnd:Dl}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Rl:r=e,o=2*t-n;break;case Tl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Rl:a=e,l=2*n-t;break;case Tl:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,A=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),M=g*g,p=M*g,d=-u*p+2*u*M-u*g,x=(1+u)*p+(-1.5-2*u)*M+(-.5+u)*g+1,w=(-1-f)*p+(1.5+f)*M+.5*g,B=f*p-f*M;for(let Q=0;Q!==o;++Q)r[Q]=d*a[h+Q]+x*a[c+Q]+w*a[l+Q]+B*a[A+Q];return r}}class RA extends Is{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),A=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*A+a[l+u]*h;return r}}class TA extends Is{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class UA extends Is{interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,A=this.outTangents;if(!h||!A){const g=(n-t)/(s-t),M=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*M+a[l+p]*g;return r}const u=o*2,f=e-1;for(let g=0;g!==o;++g){const M=a[c+g],p=a[l+g],d=f*u+g*2,x=A[d],w=A[d+1],B=e*u+g*2,Q=h[B],S=h[B+1];let C=(n-t)/(s-t),E,v,I,D,T;for(let k=0;k<8;k++){E=C*C,v=E*C,I=1-C,D=I*I,T=D*I;const G=T*t+3*D*C*x+3*I*E*Q+v*s-n;if(Math.abs(G)<1e-10)break;const z=3*D*(x-t)+6*I*C*(Q-x)+3*E*(s-Q);if(Math.abs(z)<1e-10)break;C=C-G/z,C=Math.max(0,Math.min(1,C))}r[g]=T*M+3*D*C*w+3*I*E*S+v*p}return r}}class cn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fr(t,this.TimeBufferType),this.values=fr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fr(e.times,Array),values:fr(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new TA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new RA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new DA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new UA(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ir:t=this.InterpolantFactoryMethodDiscrete;break;case So:t=this.InterpolantFactoryMethodLinear;break;case Zr:t=this.InterpolantFactoryMethodSmooth;break;case bl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Me("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ir;case this.InterpolantFactoryMethodLinear:return So;case this.InterpolantFactoryMethodSmooth:return Zr;case this.InterpolantFactoryMethodBezier:return bl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(be("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(be("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){be("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){be("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Ju(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){be("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Zr,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const A=o*n,u=A-n,f=A+n;for(let g=0;g!==n;++g){const M=t[A+g];if(M!==t[u+g]||M!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const A=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[A+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=So;class Ji extends cn{constructor(e,t,n){super(e,t,n)}}Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Ir;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class Jh extends cn{constructor(e,t,n,s){super(e,t,n,s)}}Jh.prototype.ValueTypeName="color";class rl extends cn{constructor(e,t,n,s){super(e,t,n,s)}}rl.prototype.ValueTypeName="number";class FA extends Is{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)ui.slerpFlat(r,0,a,c-o,a,c,l);return r}}class al extends cn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new FA(this.times,this.values,this.getValueSize(),e)}}al.prototype.ValueTypeName="quaternion";al.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends cn{constructor(e,t,n){super(e,t,n)}}Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Ir;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Kh extends cn{constructor(e,t,n,s){super(e,t,n,s)}}Kh.prototype.ValueTypeName="vector";class WB{constructor(e="",t=-1,n=[],s=Gu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=nn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(GA(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(cn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=IA(l);l=wc(l,1,h),c=wc(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new rl(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const A=h[1];let u=s[A];u||(s[A]=u=[]),u.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function PA(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rl;case"vector":case"vector2":case"vector3":case"vector4":return Kh;case"color":return Jh;case"quaternion":return al;case"bool":case"boolean":return Ji;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function GA(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=PA(i.type);if(i.times===void 0){const t=[],n=[];bA(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Dn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(vc(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!vc(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function vc(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class LA{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,A){return c.push(h,A),this},this.removeHandler=function(h){const A=c.indexOf(h);return A!==-1&&c.splice(A,2),this},this.getHandler=function(h){for(let A=0,u=c.length;A<u;A+=2){const f=c[A],g=c[A+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const NA=new LA;class bs{constructor(e){this.manager=e!==void 0?e:NA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}bs.DEFAULT_MATERIAL_NAME="__DEFAULT";const yn={};class OA extends Error{constructor(e,t){super(e),this.response=t}}class JB extends bs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Dn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(yn[e]!==void 0){yn[e].push({onLoad:t,onProgress:n,onError:s});return}yn[e]=[],yn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Me("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=yn[e],A=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let M=0;const p=new ReadableStream({start(d){x();function x(){A.read().then(({done:w,value:B})=>{if(w)d.close();else{M+=B.byteLength;const Q=new ProgressEvent("progress",{lengthComputable:g,loaded:M,total:f});for(let S=0,C=h.length;S<C;S++){const E=h[S];E.onProgress&&E.onProgress(Q)}d.enqueue(B),x()}},w=>{d.error(w)})}}});return new Response(p)}else throw new OA(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const A=/charset="?([^;"\s]*)"?/i.exec(o),u=A&&A[1]?A[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Dn.add(`file:${e}`,c);const h=yn[e];delete yn[e];for(let A=0,u=h.length;A<u;A++){const f=h[A];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=yn[e];if(h===void 0)throw this.manager.itemError(e),c;delete yn[e];for(let A=0,u=h.length;A<u;A++){const f=h[A];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Di=new WeakMap;class HA extends bs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Dn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let A=Di.get(a);A===void 0&&(A=[],Di.set(a,A)),A.push({onLoad:t,onError:s})}return a}const o=xs("img");function l(){h(),t&&t(this);const A=Di.get(this)||[];for(let u=0;u<A.length;u++){const f=A[u];f.onLoad&&f.onLoad(this)}Di.delete(this),r.manager.itemEnd(e)}function c(A){h(),s&&s(A),Dn.remove(`image:${e}`);const u=Di.get(this)||[];for(let f=0;f<u.length;f++){const g=u[f];g.onError&&g.onError(A)}Di.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Dn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class KB extends bs{constructor(e){super(e)}load(e,t,n,s){const r=new St,a=new HA(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class fi extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class XB extends fi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ya=new Ne,Sc=new b,Qc=new b;class ol{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sc),Qc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qc),t.updateMatrixWorld(),ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ya,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ms||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ar=new b,dr=new ui,An=new b;class Xh extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ar,dr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,dr,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ar,dr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,dr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new b,yc=new ee,Cc=new ee;class zt extends Xh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Li*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ki*2*Math.atan(Math.tan(Li*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,yc,Cc),t.subVectors(Cc,yc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Li*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class kA extends ol{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ki*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ZB extends fi{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new kA}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class VA extends ol{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}}class zA extends fi{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new VA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class kr extends Xh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class YA extends ol{constructor(){super(new kr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qB extends fi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new YA}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class jB extends fi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class $B extends fi{constructor(e,t,n=10,s=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=s}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class WA{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new b)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,s=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*s),t.addScaledVector(a[2],.488603*r),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*s)),t.addScaledVector(a[5],1.092548*(s*r)),t.addScaledVector(a[6],.315392*(3*r*r-1)),t.addScaledVector(a[7],1.092548*(n*r)),t.addScaledVector(a[8],.546274*(n*n-s*s)),t}getIrradianceAt(e,t){const n=e.x,s=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*s),t.addScaledVector(a[2],2*.511664*r),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*s),t.addScaledVector(a[5],2*.429043*s*r),t.addScaledVector(a[6],.743125*r*r-.247708),t.addScaledVector(a[7],2*.429043*n*r),t.addScaledVector(a[8],.429043*(n*n-s*s)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let s=0;s<9;s++)n[s].fromArray(e,t+s*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let s=0;s<9;s++)n[s].toArray(e,t+s*3);return e}static getBasisAt(e,t){const n=e.x,s=e.y,r=e.z;t[0]=.282095,t[1]=.488603*s,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*s,t[5]=1.092548*s*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-s*s)}}class eM extends fi{constructor(e=new WA,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class tM{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ca=new WeakMap;class nM extends bs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Me("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Me("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Dn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Ca.has(a)===!0?(s&&s(Ca.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Dn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){s&&s(c),Ca.set(l,c),Dn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Dn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ri=-90,Ti=1;class JA extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zt(Ri,Ti,e,t);s.layers=this.layers,this.add(s);const r=new zt(Ri,Ti,e,t);r.layers=this.layers,this.add(r);const a=new zt(Ri,Ti,e,t);a.layers=this.layers,this.add(a);const o=new zt(Ri,Ti,e,t);o.layers=this.layers,this.add(o);const l=new zt(Ri,Ti,e,t);l.layers=this.layers,this.add(l);const c=new zt(Ri,Ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,A=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(A,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class KA extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class XA{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ZA.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function ZA(){this._document.hidden===!1&&this.reset()}const ll="\\[\\]\\.:\\/",qA=new RegExp("["+ll+"]","g"),cl="[^"+ll+"]",jA="[^"+ll.replace("\\.","")+"]",$A=/((?:WC+[\/:])*)/.source.replace("WC",cl),ed=/(WCOD+)?/.source.replace("WCOD",jA),td=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cl),nd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cl),id=new RegExp("^"+$A+ed+td+nd+"$"),sd=["material","materials","bones","map"];class rd{constructor(e,t,n){const s=n||je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class je{constructor(e,t,n){this.path=t,this.parsedPath=n||je.parseTrackName(t),this.node=je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new je.Composite(e,t,n):new je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qA,"")}static parseTrackName(e){const t=id.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);sd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Me("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){be("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){be("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){be("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){be("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){be("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;be("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}je.Composite=rd;je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};je.prototype.GetterByBindingType=[je.prototype._getValue_direct,je.prototype._getValue_array,je.prototype._getValue_arrayElement,je.prototype._getValue_toArray];je.prototype.SetterByBindingTypeAndVersioning=[[je.prototype._setValue_direct,je.prototype._setValue_direct_setNeedsUpdate,je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[je.prototype._setValue_array,je.prototype._setValue_array_setNeedsUpdate,je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[je.prototype._setValue_arrayElement,je.prototype._setValue_arrayElement_setNeedsUpdate,je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[je.prototype._setValue_fromArray,je.prototype._setValue_fromArray_setNeedsUpdate,je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class iM extends mh{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class sM{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Le(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Le(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const gl=class gl{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};gl.prototype.isMatrix2=!0;let Ic=gl;class rM extends kf{constructor(e=10,t=10,n=4473924,s=8947848){n=new we(n),s=new we(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,g=-o;u<=t;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const M=u===r?n:s;M.toArray(c,f),f+=3,M.toArray(c,f),f+=3,M.toArray(c,f),f+=3,M.toArray(c,f),f+=3}const h=new at;h.setAttribute("position",new Te(l,3)),h.setAttribute("color",new Te(c,3));const A=new el({vertexColors:!0,toneMapped:!1});super(h,A),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class aM extends Xn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Me("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function bc(i,e,t,n){const s=ad(n);switch(t){case oh:return i*e;case zo:return i*e/s.components*s.byteLength;case Yo:return i*e/s.components*s.byteLength;case ci:return i*e*2/s.components*s.byteLength;case Wo:return i*e*2/s.components*s.byteLength;case lh:return i*e*3/s.components*s.byteLength;case tn:return i*e*4/s.components*s.byteLength;case Jo:return i*e*4/s.components*s.byteLength;case Mr:case xr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _r:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xa:case qa:return Math.max(i,16)*Math.max(e,8)/4;case Ka:case Za:return Math.max(i,8)*Math.max(e,8)/2;case ja:case $a:case to:case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case eo:case yr:case io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ro:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case oo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ho:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case fo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case po:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case go:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bo:case Mo:case xo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case _o:case wo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Cr:case vo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ad(i){switch(i){case Yt:case ih:return{byteLength:1,components:1};case Es:case sh:case Jt:return{byteLength:2,components:1};case ko:case Vo:return{byteLength:2,components:4};case Bn:case Ho:case en:return{byteLength:4,components:1};case rh:case ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Me("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Zh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function od(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,A=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:A}}function n(o,l,c){const h=l.array,A=l.updateRanges;if(i.bindBuffer(c,o),A.length===0)i.bufferSubData(c,0,h);else{A.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<A.length;f++){const g=A[u],M=A[f];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,A[u]=M)}A.length=u+1;for(let f=0,g=A.length;f<g;f++){const M=A[f];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cd=`#ifdef USE_ALPHAHASH
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
#endif`,hd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ud=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dd=`#ifdef USE_AOMAP
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
#endif`,pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gd=`#ifdef USE_BATCHING
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
#endif`,md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ed=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Md=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xd=`#ifdef USE_IRIDESCENCE
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
#endif`,_d=`#ifdef USE_BUMPMAP
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
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Dd=`#define PI 3.141592653589793
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
} // validated`,Rd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Td=`vec3 transformedNormal = objectNormal;
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
#endif`,Ud=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Od=`#ifdef USE_ENVMAP
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
#endif`,Hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kd=`#ifdef USE_ENVMAP
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
#endif`,Vd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xd=`#ifdef USE_GRADIENTMAP
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
}`,Zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$d=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ep=`#ifdef USE_ENVMAP
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
#endif`,tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rp=`PhysicalMaterial material;
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
#endif`,ap=`uniform sampler2D dfgLUT;
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
}`,op=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ep=`#if defined( USE_POINTS_UV )
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
#endif`,Bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_p=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
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
#endif`,Sp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Dp=`#ifdef USE_NORMALMAP
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
#endif`,Rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Np=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jp=`float getShadowMask() {
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
}`,Kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xp=`#ifdef USE_SKINNING
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
#endif`,Zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qp=`#ifdef USE_SKINNING
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
#endif`,jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$p=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ng=`#ifdef USE_TRANSMISSION
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
#endif`,ig=`#ifdef USE_TRANSMISSION
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
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cg=`uniform sampler2D t2D;
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
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ag=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
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
}`,pg=`#if DEPTH_PACKING == 3200
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
}`,gg=`#define DISTANCE
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
}`,mg=`#define DISTANCE
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
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`uniform float scale;
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
}`,xg=`uniform vec3 diffuse;
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
}`,_g=`#include <common>
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
}`,wg=`uniform vec3 diffuse;
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
}`,vg=`#define LAMBERT
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
}`,Sg=`#define LAMBERT
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
}`,Qg=`#define MATCAP
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
}`,yg=`#define MATCAP
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
}`,Cg=`#define NORMAL
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
}`,Ig=`#define NORMAL
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
}`,bg=`#define PHONG
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
}`,Dg=`#define PHONG
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
}`,Rg=`#define STANDARD
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
}`,Tg=`#define STANDARD
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
}`,Ug=`#define TOON
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
}`,Fg=`#define TOON
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
}`,Pg=`uniform float size;
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
}`,Gg=`uniform vec3 diffuse;
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
}`,Lg=`#include <common>
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
}`,Ng=`uniform vec3 color;
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
}`,Og=`uniform float rotation;
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
}`,Hg=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:ld,alphahash_pars_fragment:cd,alphamap_fragment:hd,alphamap_pars_fragment:ud,alphatest_fragment:fd,alphatest_pars_fragment:Ad,aomap_fragment:dd,aomap_pars_fragment:pd,batching_pars_vertex:gd,batching_vertex:md,begin_vertex:Ed,beginnormal_vertex:Bd,bsdfs:Md,iridescence_fragment:xd,bumpmap_pars_fragment:_d,clipping_planes_fragment:wd,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:Sd,clipping_planes_vertex:Qd,color_fragment:yd,color_pars_fragment:Cd,color_pars_vertex:Id,color_vertex:bd,common:Dd,cube_uv_reflection_fragment:Rd,defaultnormal_vertex:Td,displacementmap_pars_vertex:Ud,displacementmap_vertex:Fd,emissivemap_fragment:Pd,emissivemap_pars_fragment:Gd,colorspace_fragment:Ld,colorspace_pars_fragment:Nd,envmap_fragment:Od,envmap_common_pars_fragment:Hd,envmap_pars_fragment:kd,envmap_pars_vertex:Vd,envmap_physical_pars_fragment:ep,envmap_vertex:zd,fog_vertex:Yd,fog_pars_vertex:Wd,fog_fragment:Jd,fog_pars_fragment:Kd,gradientmap_pars_fragment:Xd,lightmap_pars_fragment:Zd,lights_lambert_fragment:qd,lights_lambert_pars_fragment:jd,lights_pars_begin:$d,lights_toon_fragment:tp,lights_toon_pars_fragment:np,lights_phong_fragment:ip,lights_phong_pars_fragment:sp,lights_physical_fragment:rp,lights_physical_pars_fragment:ap,lights_fragment_begin:op,lights_fragment_maps:lp,lights_fragment_end:cp,lightprobes_pars_fragment:hp,logdepthbuf_fragment:up,logdepthbuf_pars_fragment:fp,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:dp,map_fragment:pp,map_pars_fragment:gp,map_particle_fragment:mp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Bp,metalnessmap_pars_fragment:Mp,morphinstance_vertex:xp,morphcolor_vertex:_p,morphnormal_vertex:wp,morphtarget_pars_vertex:vp,morphtarget_vertex:Sp,normal_fragment_begin:Qp,normal_fragment_maps:yp,normal_pars_fragment:Cp,normal_pars_vertex:Ip,normal_vertex:bp,normalmap_pars_fragment:Dp,clearcoat_normal_fragment_begin:Rp,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:Fp,opaque_fragment:Pp,packing:Gp,premultiplied_alpha_fragment:Lp,project_vertex:Np,dithering_fragment:Op,dithering_pars_fragment:Hp,roughnessmap_fragment:kp,roughnessmap_pars_fragment:Vp,shadowmap_pars_fragment:zp,shadowmap_pars_vertex:Yp,shadowmap_vertex:Wp,shadowmask_pars_fragment:Jp,skinbase_vertex:Kp,skinning_pars_vertex:Xp,skinning_vertex:Zp,skinnormal_vertex:qp,specularmap_fragment:jp,specularmap_pars_fragment:$p,tonemapping_fragment:eg,tonemapping_pars_fragment:tg,transmission_fragment:ng,transmission_pars_fragment:ig,uv_pars_fragment:sg,uv_pars_vertex:rg,uv_vertex:ag,worldpos_vertex:og,background_vert:lg,background_frag:cg,backgroundCube_vert:hg,backgroundCube_frag:ug,cube_vert:fg,cube_frag:Ag,depth_vert:dg,depth_frag:pg,distance_vert:gg,distance_frag:mg,equirect_vert:Eg,equirect_frag:Bg,linedashed_vert:Mg,linedashed_frag:xg,meshbasic_vert:_g,meshbasic_frag:wg,meshlambert_vert:vg,meshlambert_frag:Sg,meshmatcap_vert:Qg,meshmatcap_frag:yg,meshnormal_vert:Cg,meshnormal_frag:Ig,meshphong_vert:bg,meshphong_frag:Dg,meshphysical_vert:Rg,meshphysical_frag:Tg,meshtoon_vert:Ug,meshtoon_frag:Fg,points_vert:Pg,points_frag:Gg,shadow_vert:Lg,shadow_frag:Ng,sprite_vert:Og,sprite_frag:Hg},he={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Re}},envmap:{envMap:{value:null},envMapRotation:{value:new Re},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Re},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new b},probesMax:{value:new b},probesResolution:{value:new b}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0},uvTransform:{value:new Re}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Re},alphaMap:{value:null},alphaMapTransform:{value:new Re},alphaTest:{value:0}}},gn={basic:{uniforms:Ut([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Ut([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Ut([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Ut([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Ut([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new we(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Ut([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Ut([he.points,he.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Ut([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Ut([he.common,he.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Ut([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Ut([he.sprite,he.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Re}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distance:{uniforms:Ut([he.common,he.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distance_vert,fragmentShader:Oe.distance_frag},shadow:{uniforms:Ut([he.lights,he.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};gn.physical={uniforms:Ut([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Re},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Re},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Re},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Re},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Re},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Re},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Re}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const pr={r:0,b:0,g:0},kg=new Ne,qh=new Re;qh.set(-1,0,0,0,1,0,0,0,1);function Vg(i,e,t,n,s,r){const a=new we(0);let o=s===!0?0:1,l,c,h=null,A=0,u=null;function f(x){let w=x.isScene===!0?x.background:null;if(w&&w.isTexture){const B=x.backgroundBlurriness>0;w=e.get(w,B)}return w}function g(x){let w=!1;const B=f(x);B===null?p(a,o):B&&B.isColor&&(p(B,1),w=!0);const Q=i.xr.getEnvironmentBlendMode();Q==="additive"?t.buffers.color.setClear(0,0,0,1,r):Q==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(x,w){const B=f(w);B&&(B.isCubeTexture||B.mapping===Lr)?(c===void 0&&(c=new Et(new qn(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:Yi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(Q,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=B,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(kg.makeRotationFromEuler(w.backgroundRotation)).transpose(),B.isCubeTexture&&B.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qh),c.material.toneMapped=Ve.getTransfer(B.colorSpace)!==Xe,(h!==B||A!==B.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=B,A=B.version,u=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):B&&B.isTexture&&(l===void 0&&(l=new Et(new Hr(2,2),new Dt({name:"BackgroundMaterial",uniforms:Yi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=B,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ve.getTransfer(B.colorSpace)!==Xe,B.matrixAutoUpdate===!0&&B.updateMatrix(),l.material.uniforms.uvTransform.value.copy(B.matrix),(h!==B||A!==B.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=B,A=B.version,u=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,w){x.getRGB(pr,Yh(i)),t.buffers.color.setClear(pr.r,pr.g,pr.b,w,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,w=1){a.set(x),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:M,dispose:d}}function zg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(D,T,k,Y,G){let z=!1;const V=A(D,Y,k,T);r!==V&&(r=V,c(r.object)),z=f(D,Y,k,G),z&&g(D,Y,k,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,B(D,T,k,Y),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function A(D,T,k,Y){const G=Y.wireframe===!0;let z=n[T.id];z===void 0&&(z={},n[T.id]=z);const V=D.isInstancedMesh===!0?D.id:0;let q=z[V];q===void 0&&(q={},z[V]=q);let $=q[k.id];$===void 0&&($={},q[k.id]=$);let ue=$[G];return ue===void 0&&(ue=u(l()),$[G]=ue),ue}function u(D){const T=[],k=[],Y=[];for(let G=0;G<t;G++)T[G]=0,k[G]=0,Y[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:k,attributeDivisors:Y,object:D,attributes:{},index:null}}function f(D,T,k,Y){const G=r.attributes,z=T.attributes;let V=0;const q=k.getAttributes();for(const $ in q)if(q[$].location>=0){const pe=G[$];let Ee=z[$];if(Ee===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(Ee=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(Ee=D.instanceColor)),pe===void 0||pe.attribute!==Ee||Ee&&pe.data!==Ee.data)return!0;V++}return r.attributesNum!==V||r.index!==Y}function g(D,T,k,Y){const G={},z=T.attributes;let V=0;const q=k.getAttributes();for(const $ in q)if(q[$].location>=0){let pe=z[$];pe===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(pe=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(pe=D.instanceColor));const Ee={};Ee.attribute=pe,pe&&pe.data&&(Ee.data=pe.data),G[$]=Ee,V++}r.attributes=G,r.attributesNum=V,r.index=Y}function M(){const D=r.newAttributes;for(let T=0,k=D.length;T<k;T++)D[T]=0}function p(D){d(D,0)}function d(D,T){const k=r.newAttributes,Y=r.enabledAttributes,G=r.attributeDivisors;k[D]=1,Y[D]===0&&(i.enableVertexAttribArray(D),Y[D]=1),G[D]!==T&&(i.vertexAttribDivisor(D,T),G[D]=T)}function x(){const D=r.newAttributes,T=r.enabledAttributes;for(let k=0,Y=T.length;k<Y;k++)T[k]!==D[k]&&(i.disableVertexAttribArray(k),T[k]=0)}function w(D,T,k,Y,G,z,V){V===!0?i.vertexAttribIPointer(D,T,k,G,z):i.vertexAttribPointer(D,T,k,Y,G,z)}function B(D,T,k,Y){M();const G=Y.attributes,z=k.getAttributes(),V=T.defaultAttributeValues;for(const q in z){const $=z[q];if($.location>=0){let ue=G[q];if(ue===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(ue=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(ue=D.instanceColor)),ue!==void 0){const pe=ue.normalized,Ee=ue.itemSize,We=e.get(ue);if(We===void 0)continue;const lt=We.buffer,Je=We.type,Z=We.bytesPerElement,se=Je===i.INT||Je===i.UNSIGNED_INT||ue.gpuType===Ho;if(ue.isInterleavedBufferAttribute){const te=ue.data,De=te.stride,Ue=ue.offset;if(te.isInstancedInterleavedBuffer){for(let Ce=0;Ce<$.locationSize;Ce++)d($.location+Ce,te.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ce=0;Ce<$.locationSize;Ce++)p($.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,lt);for(let Ce=0;Ce<$.locationSize;Ce++)w($.location+Ce,Ee/$.locationSize,Je,pe,De*Z,(Ue+Ee/$.locationSize*Ce)*Z,se)}else{if(ue.isInstancedBufferAttribute){for(let te=0;te<$.locationSize;te++)d($.location+te,ue.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let te=0;te<$.locationSize;te++)p($.location+te);i.bindBuffer(i.ARRAY_BUFFER,lt);for(let te=0;te<$.locationSize;te++)w($.location+te,Ee/$.locationSize,Je,pe,Ee*Z,Ee/$.locationSize*te*Z,se)}}else if(V!==void 0){const pe=V[q];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv($.location,pe);break;case 3:i.vertexAttrib3fv($.location,pe);break;case 4:i.vertexAttrib4fv($.location,pe);break;default:i.vertexAttrib1fv($.location,pe)}}}}x()}function Q(){v();for(const D in n){const T=n[D];for(const k in T){const Y=T[k];for(const G in Y){const z=Y[G];for(const V in z)h(z[V].object),delete z[V];delete Y[G]}}delete n[D]}}function S(D){if(n[D.id]===void 0)return;const T=n[D.id];for(const k in T){const Y=T[k];for(const G in Y){const z=Y[G];for(const V in z)h(z[V].object),delete z[V];delete Y[G]}}delete n[D.id]}function C(D){for(const T in n){const k=n[T];for(const Y in k){const G=k[Y];if(G[D.id]===void 0)continue;const z=G[D.id];for(const V in z)h(z[V].object),delete z[V];delete G[D.id]}}}function E(D){for(const T in n){const k=n[T],Y=D.isInstancedMesh===!0?D.id:0,G=k[Y];if(G!==void 0){for(const z in G){const V=G[z];for(const q in V)h(V[q].object),delete V[q];delete G[z]}delete k[Y],Object.keys(k).length===0&&delete n[T]}}}function v(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:v,resetDefaultState:I,dispose:Q,releaseStatesOfGeometry:S,releaseStatesOfObject:E,releaseStatesOfProgram:C,initAttributes:M,enableAttribute:p,disableUnusedAttributes:x}}function Yg(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Wg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const E=C===Jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Yt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==en&&!E)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Me("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const A=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Me("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),B=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),Q=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:A,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:B,maxSamples:Q,samples:S}}function Jg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ii,o=new Re,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(A,u){const f=A.length!==0||u||n!==0||s;return s=u,n=A.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(A,u){t=h(A,u,0)},this.setState=function(A,u,f){const g=A.clippingPlanes,M=A.clipIntersection,p=A.clipShadows,d=i.get(A);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const x=r?0:n,w=x*4;let B=d.clippingState||null;l.value=B,B=h(g,u,w,f);for(let Q=0;Q!==w;++Q)B[Q]=t[Q];d.clippingState=B,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(A,u,f,g){const M=A!==null?A.length:0;let p=null;if(M!==0){if(p=l.value,g!==!0||p===null){const d=f+M*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<d)&&(p=new Float32Array(d));for(let w=0,B=f;w!==M;++w,B+=4)a.copy(A[w]).applyMatrix4(x,o),a.normal.toArray(p,B),p[B+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}const Wn=4,Dc=[.125,.215,.35,.446,.526,.582],ri=20,Kg=256,ls=new kr,Rc=new we;let Ia=null,ba=0,Da=0,Ra=!1;const Xg=new b;class Tc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Xg}=r;Ia=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,ba,Da),this._renderer.xr.enabled=Ra,e.scissorTest=!1,Ui(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===li||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),ba=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:Jt,format:tn,colorSpace:br,depthBuffer:!1},s=Uc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Zg(r)),this._blurMaterial=jg(r,e,t),this._ggxMaterial=qg(r,e,t)}return s}_compileMaterial(e){const t=new Et(new at,e);this._renderer.compile(t,ls)}_sceneToCubeUV(e,t,n,s,r){const l=new zt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],A=this._renderer,u=A.autoClear,f=A.toneMapping;A.getClearColor(Rc),A.toneMapping=En,A.autoClear=!1,A.state.buffers.depth.getReversed()&&(A.setRenderTarget(s),A.clearDepth(),A.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new qn,new jo({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let d=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,d=!0):(p.color.copy(Rc),d=!0);for(let w=0;w<6;w++){const B=w%3;B===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):B===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const Q=this._cubeSize;Ui(s,B*Q,w>2?Q:0,Q,Q),A.setRenderTarget(s),d&&A.render(M,l),A.render(e,l)}A.toneMapping=f,A.autoClear=u,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===li||e.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ui(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ls)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),A=Math.sqrt(c*c-h*h),u=0+c*1.25,f=A*u,{_lodMax:g}=this,M=this._sizeLods[n],p=3*M*(n>g-Wn?n-g+Wn:0),d=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Ui(r,p,d,3*M,2*M),s.setRenderTarget(r),s.render(o,ls),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Ui(e,p,d,3*M,2*M),s.setRenderTarget(e),s.render(o,ls)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&be("blur direction must be either latitudinal or longitudinal!");const h=3,A=this._lodMeshes[s];A.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ri-1),M=r/g,p=isFinite(r)?1+Math.floor(h*M):ri;p>ri&&Me(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ri}`);const d=[];let x=0;for(let C=0;C<ri;++C){const E=C/M,v=Math.exp(-E*E/2);d.push(v),C===0?x+=v:C<p&&(x+=2*v)}for(let C=0;C<d.length;C++)d[C]=d[C]/x;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-n;const B=this._sizeLods[s],Q=3*B*(s>w-Wn?s-w+Wn:0),S=4*(this._cubeSize-B);Ui(t,Q,S,3*B,2*B),l.setRenderTarget(t),l.render(A,ls)}}function Zg(i){const e=[],t=[],n=[];let s=i;const r=i-Wn+1+Dc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Wn?l=Dc[a-i+Wn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,A=1+c,u=[h,h,A,h,A,A,h,h,A,A,h,A],f=6,g=6,M=3,p=2,d=1,x=new Float32Array(M*g*f),w=new Float32Array(p*g*f),B=new Float32Array(d*g*f);for(let S=0;S<f;S++){const C=S%3*2/3-1,E=S>2?0:-1,v=[C,E,0,C+2/3,E,0,C+2/3,E+1,0,C,E,0,C+2/3,E+1,0,C,E+1,0];x.set(v,M*g*S),w.set(u,p*g*S);const I=[S,S,S,S,S,S];B.set(I,d*g*S)}const Q=new at;Q.setAttribute("position",new Kt(x,M)),Q.setAttribute("uv",new Kt(w,p)),Q.setAttribute("faceIndex",new Kt(B,d)),n.push(new Et(Q,null)),s>Wn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Uc(i,e,t){const n=new Lt(i,e,t);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ui(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function qg(i,e,t){return new Dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Kg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vr(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function jg(i,e,t){const n=new Float32Array(ri),s=new b(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vr(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Fc(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vr(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Pc(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Vr(){return`

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
	`}class jh extends Lt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new _h(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new qn(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:mn});r.uniforms.tEquirect.value=t;const a=new Et(s,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=bt),new JA(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function $g(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Jr||f===Kr)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new jh(g.height);return M.fromEquirectangularTexture(i,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Jr||f===Kr,M=f===li||f===Hi;if(g||M){let p=t.get(u);const d=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new Tc(i)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const x=u.image;return g&&x&&x.height>0||M&&x&&l(x)?(n===null&&(n=new Tc(i)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===Jr?u.mapping=li:f===Kr&&(u.mapping=Hi),u}function l(u){let f=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function A(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:A}}function em(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Gi("WebGLRenderer: "+n+" extension not supported."),s}}}function tm(i,e,t,n){const s={},r=new WeakMap;function a(A){const u=A.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(A,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(A){const u=A.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(A){const u=[],f=A.index,g=A.attributes.position;let M=0;if(g===void 0)return;if(f!==null){const x=f.array;M=f.version;for(let w=0,B=x.length;w<B;w+=3){const Q=x[w+0],S=x[w+1],C=x[w+2];u.push(Q,S,S,C,C,Q)}}else{const x=g.array;M=g.version;for(let w=0,B=x.length/3-1;w<B;w+=3){const Q=w+0,S=w+1,C=w+2;u.push(Q,S,S,C,C,Q)}}const p=new(g.count>=65535?gh:ph)(u,1);p.version=M;const d=r.get(A);d&&e.remove(d),r.set(A,p)}function h(A){const u=r.get(A);if(u){const f=A.index;f!==null&&u.version<f.version&&c(A)}else c(A);return r.get(A)}return{get:o,update:l,getWireframeAttribute:h}}function nm(i,e,t){let n;function s(A){n=A}let r,a;function o(A){r=A.type,a=A.bytesPerElement}function l(A,u){i.drawElements(n,u,r,A*a),t.update(u,n,1)}function c(A,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,A*a,f),t.update(u,n,f))}function h(A,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,A,0,f);let M=0;for(let p=0;p<f;p++)M+=u[p];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function im(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:be("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function sm(i,e,t){const n=new WeakMap,s=new $e;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,A=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==A){let v=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",v)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),g===!0&&(w=2),M===!0&&(w=3);let B=o.attributes.position.count*w,Q=1;B>e.maxTextureSize&&(Q=Math.ceil(B/e.maxTextureSize),B=e.maxTextureSize);const S=new Float32Array(B*Q*4*A),C=new hh(S,B,Q,A);C.type=en,C.needsUpdate=!0;const E=w*4;for(let I=0;I<A;I++){const D=p[I],T=d[I],k=x[I],Y=B*Q*4*I;for(let G=0;G<D.count;G++){const z=G*E;f===!0&&(s.fromBufferAttribute(D,G),S[Y+z+0]=s.x,S[Y+z+1]=s.y,S[Y+z+2]=s.z,S[Y+z+3]=0),g===!0&&(s.fromBufferAttribute(T,G),S[Y+z+4]=s.x,S[Y+z+5]=s.y,S[Y+z+6]=s.z,S[Y+z+7]=0),M===!0&&(s.fromBufferAttribute(k,G),S[Y+z+8]=s.x,S[Y+z+9]=s.y,S[Y+z+10]=s.z,S[Y+z+11]=k.itemSize===4?s.w:1)}}u={count:A,texture:C,size:new ee(B,Q)},n.set(o,u),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let M=0;M<c.length;M++)f+=c[M];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function rm(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,A=c.geometry,u=e.get(c,A);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const am={[Uo]:"LINEAR_TONE_MAPPING",[Fo]:"REINHARD_TONE_MAPPING",[Po]:"CINEON_TONE_MAPPING",[Go]:"ACES_FILMIC_TONE_MAPPING",[No]:"AGX_TONE_MAPPING",[Oo]:"NEUTRAL_TONE_MAPPING",[Lo]:"CUSTOM_TONE_MAPPING"};function om(i,e,t,n,s,r){const a=new Lt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Vi(e,t):void 0}),o=new Lt(e,t,{type:Jt,depthBuffer:!1,stencilBuffer:!1}),l=new at;l.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Te([0,2,0,0,2,0],2));const c=new Wh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Et(l,c),A=new kr(-1,1,1,-1,0,1);let u=null,f=null,g=!1,M,p=null,d=[],x=!1;this.setSize=function(w,B){a.setSize(w,B),o.setSize(w,B);for(let Q=0;Q<d.length;Q++){const S=d[Q];S.setSize&&S.setSize(w,B)}},this.setEffects=function(w){d=w,x=d.length>0&&d[0].isRenderPass===!0;const B=a.width,Q=a.height;for(let S=0;S<d.length;S++){const C=d[S];C.setSize&&C.setSize(B,Q)}},this.begin=function(w,B){if(g||w.toneMapping===En&&d.length===0)return!1;if(p=B,B!==null){const Q=B.width,S=B.height;(a.width!==Q||a.height!==S)&&this.setSize(Q,S)}return x===!1&&w.setRenderTarget(a),M=w.toneMapping,w.toneMapping=En,!0},this.hasRenderPass=function(){return x},this.end=function(w,B){w.toneMapping=M,g=!0;let Q=a,S=o;for(let C=0;C<d.length;C++){const E=d[C];if(E.enabled!==!1&&(E.render(w,S,Q,B),E.needsSwap!==!1)){const v=Q;Q=S,S=v}}if(u!==w.outputColorSpace||f!==w.toneMapping){u=w.outputColorSpace,f=w.toneMapping,c.defines={},Ve.getTransfer(u)===Xe&&(c.defines.SRGB_TRANSFER="");const C=am[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=Q.texture,w.setRenderTarget(p),w.render(h,A),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const $h=new St,Ro=new Vi(1,1),eu=new hh,tu=new Bf,nu=new _h,Gc=[],Lc=[],Nc=new Float32Array(16),Oc=new Float32Array(9),Hc=new Float32Array(4);function Xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Gc[s];if(r===void 0&&(r=new Float32Array(s),Gc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function _t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function zr(i,e){let t=Lc[e];t===void 0&&(t=new Int32Array(e),Lc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),_t(t,e)}}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),_t(t,e)}}function um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),_t(t,e)}}function fm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(xt(t,n))return;Hc.set(n),i.uniformMatrix2fv(this.addr,!1,Hc),_t(t,n)}}function Am(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(xt(t,n))return;Oc.set(n),i.uniformMatrix3fv(this.addr,!1,Oc),_t(t,n)}}function dm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(xt(t,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),_t(t,n)}}function pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),_t(t,e)}}function mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),_t(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),_t(t,e)}}function Bm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),_t(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),_t(t,e)}}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),_t(t,e)}}function wm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ro.compareFunction=t.isReversedDepthBuffer()?Xo:Ko,r=Ro):r=$h,t.setTexture2D(e||r,s)}function vm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||tu,s)}function Sm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||nu,s)}function Qm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||eu,s)}function ym(i){switch(i){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return fm;case 35675:return Am;case 35676:return dm;case 5124:case 35670:return pm;case 35667:case 35671:return gm;case 35668:case 35672:return mm;case 35669:case 35673:return Em;case 5125:return Bm;case 36294:return Mm;case 36295:return xm;case 36296:return _m;case 35678:case 36198:case 36298:case 36306:case 35682:return wm;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return Qm}}function Cm(i,e){i.uniform1fv(this.addr,e)}function Im(i,e){const t=Xi(e,this.size,2);i.uniform2fv(this.addr,t)}function bm(i,e){const t=Xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Dm(i,e){const t=Xi(e,this.size,4);i.uniform4fv(this.addr,t)}function Rm(i,e){const t=Xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Tm(i,e){const t=Xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Um(i,e){const t=Xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Fm(i,e){i.uniform1iv(this.addr,e)}function Pm(i,e){i.uniform2iv(this.addr,e)}function Gm(i,e){i.uniform3iv(this.addr,e)}function Lm(i,e){i.uniform4iv(this.addr,e)}function Nm(i,e){i.uniform1uiv(this.addr,e)}function Om(i,e){i.uniform2uiv(this.addr,e)}function Hm(i,e){i.uniform3uiv(this.addr,e)}function km(i,e){i.uniform4uiv(this.addr,e)}function Vm(i,e,t){const n=this.cache,s=e.length,r=zr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ro:a=$h;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function zm(i,e,t){const n=this.cache,s=e.length,r=zr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||tu,r[a])}function Ym(i,e,t){const n=this.cache,s=e.length,r=zr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||nu,r[a])}function Wm(i,e,t){const n=this.cache,s=e.length,r=zr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||eu,r[a])}function Jm(i){switch(i){case 5126:return Cm;case 35664:return Im;case 35665:return bm;case 35666:return Dm;case 35674:return Rm;case 35675:return Tm;case 35676:return Um;case 5124:case 35670:return Fm;case 35667:case 35671:return Pm;case 35668:case 35672:return Gm;case 35669:case 35673:return Lm;case 5125:return Nm;case 36294:return Om;case 36295:return Hm;case 36296:return km;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return Wm}}class Km{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ym(t.type)}}class Xm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jm(t.type)}}class Zm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function kc(i,e){i.seq.push(e),i.map[e.id]=e}function qm(i,e,t){const n=i.name,s=n.length;for(Ta.lastIndex=0;;){const r=Ta.exec(n),a=Ta.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){kc(t,c===void 0?new Km(o,i,e):new Xm(o,i,e));break}else{let A=t.map[o];A===void 0&&(A=new Zm(o),kc(t,A)),t=A}}}class vr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);qm(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Vc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const jm=37297;let $m=0;function eE(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const zc=new Re;function tE(i){Ve._getMatrix(zc,Ve.workingColorSpace,i);const e=`mat3( ${zc.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(i)){case Dr:return[e,"LinearTransferOETF"];case Xe:return[e,"sRGBTransferOETF"];default:return Me("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Yc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+eE(i.getShaderSource(e),o)}else return r}function nE(i,e){const t=tE(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const iE={[Uo]:"Linear",[Fo]:"Reinhard",[Po]:"Cineon",[Go]:"ACESFilmic",[No]:"AgX",[Oo]:"Neutral",[Lo]:"Custom"};function sE(i,e){const t=iE[e];return t===void 0?(Me("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const gr=new b;function rE(){Ve.getLuminanceCoefficients(gr);const i=gr.x.toFixed(4),e=gr.y.toFixed(4),t=gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aE(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function oE(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lE(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function As(i){return i!==""}function Wc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cE=/^[ \t]*#include +<([\w\d./]+)>/gm;function To(i){return i.replace(cE,uE)}const hE=new Map;function uE(i,e){let t=Oe[e];if(t===void 0){const n=hE.get(e);if(n!==void 0)t=Oe[n],Me('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return To(t)}const fE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(i){return i.replace(fE,AE)}function AE(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const dE={[Br]:"SHADOWMAP_TYPE_PCF",[us]:"SHADOWMAP_TYPE_VSM"};function pE(i){return dE[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const gE={[li]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[Lr]:"ENVMAP_TYPE_CUBE_UV"};function mE(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":gE[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const EE={[Hi]:"ENVMAP_MODE_REFRACTION"};function BE(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":EE[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ME={[Gr]:"ENVMAP_BLENDING_MULTIPLY",[Tu]:"ENVMAP_BLENDING_MIX",[Uu]:"ENVMAP_BLENDING_ADD"};function xE(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ME[i.combine]||"ENVMAP_BLENDING_NONE"}function _E(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function wE(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=pE(t),c=mE(t),h=BE(t),A=xE(t),u=_E(t),f=aE(t),g=oE(r),M=s.createProgram();let p,d,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(As).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(As).join(`
`),d.length>0&&(d+=`
`)):(p=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),d=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+A:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?Oe.tonemapping_pars_fragment:"",t.toneMapping!==En?sE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,nE("linearToOutputTexel",t.outputColorSpace),rE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(As).join(`
`)),a=To(a),a=Wc(a,t),a=Jc(a,t),o=To(o),o=Wc(o,t),o=Jc(o,t),a=Kc(a),o=Kc(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=x+p+a,B=x+d+o,Q=Vc(s,s.VERTEX_SHADER,w),S=Vc(s,s.FRAGMENT_SHADER,B);s.attachShader(M,Q),s.attachShader(M,S),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function C(D){if(i.debug.checkShaderErrors){const T=s.getProgramInfoLog(M)||"",k=s.getShaderInfoLog(Q)||"",Y=s.getShaderInfoLog(S)||"",G=T.trim(),z=k.trim(),V=Y.trim();let q=!0,$=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,Q,S);else{const ue=Yc(s,Q,"vertex"),pe=Yc(s,S,"fragment");be("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+ue+`
`+pe)}else G!==""?Me("WebGLProgram: Program Info Log:",G):(z===""||V==="")&&($=!1);$&&(D.diagnostics={runnable:q,programLog:G,vertexShader:{log:z,prefix:p},fragmentShader:{log:V,prefix:d}})}s.deleteShader(Q),s.deleteShader(S),E=new vr(s,M),v=lE(s,M)}let E;this.getUniforms=function(){return E===void 0&&C(this),E};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(M,jm)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$m++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=Q,this.fragmentShader=S,this}let vE=0;class SE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new QE(e),t.set(e,n)),n}}class QE{constructor(e){this.id=vE++,this.code=e,this.usedTimes=0}}function yE(i){return i===ci||i===yr||i===Cr}function CE(i,e,t,n,s,r){const a=new uh,o=new SE,l=new Set,c=[],h=new Map,A=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return l.add(E),E===0?"uv":`uv${E}`}function M(E,v,I,D,T,k){const Y=D.fog,G=T.geometry,z=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?D.environment:null,V=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,q=e.get(E.envMap||z,V),$=q&&q.mapping===Lr?q.image.height:null,ue=f[E.type];E.precision!==null&&(u=n.getMaxPrecision(E.precision),u!==E.precision&&Me("WebGLProgram.getParameters:",E.precision,"not supported, using",u,"instead."));const pe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ee=pe!==void 0?pe.length:0;let We=0;G.morphAttributes.position!==void 0&&(We=1),G.morphAttributes.normal!==void 0&&(We=2),G.morphAttributes.color!==void 0&&(We=3);let lt,Je,Z,se;if(ue){const Be=gn[ue];lt=Be.vertexShader,Je=Be.fragmentShader}else{lt=E.vertexShader,Je=E.fragmentShader;const Be=o.getVertexShaderStage(E),ht=o.getFragmentShaderStage(E);o.update(E,Be,ht),Z=Be.id,se=ht.id}const te=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Ue=T.isInstancedMesh===!0,Ce=T.isBatchedMesh===!0,ft=!!E.map,ke=!!E.matcap,et=!!q,Ke=!!E.aoMap,ze=!!E.lightMap,pt=!!E.bumpMap&&E.wireframe===!1,Bt=!!E.normalMap,wt=!!E.displacementMap,Qt=!!E.emissiveMap,ct=!!E.metalnessMap,gt=!!E.roughnessMap,U=E.anisotropy>0,Gt=E.clearcoat>0,Ze=E.dispersion>0,y=E.iridescence>0,m=E.sheen>0,P=E.transmission>0,O=U&&!!E.anisotropyMap,W=Gt&&!!E.clearcoatMap,ne=Gt&&!!E.clearcoatNormalMap,re=Gt&&!!E.clearcoatRoughnessMap,J=y&&!!E.iridescenceMap,X=y&&!!E.iridescenceThicknessMap,ae=m&&!!E.sheenColorMap,ve=m&&!!E.sheenRoughnessMap,ce=!!E.specularMap,oe=!!E.specularColorMap,ye=!!E.specularIntensityMap,Ie=P&&!!E.transmissionMap,Fe=P&&!!E.thicknessMap,R=!!E.gradientMap,ie=!!E.alphaMap,K=E.alphaTest>0,le=!!E.alphaHash,de=!!E.extensions;let j=En;E.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(j=i.toneMapping);const _e={shaderID:ue,shaderType:E.type,shaderName:E.name,vertexShader:lt,fragmentShader:Je,defines:E.defines,customVertexShaderID:Z,customFragmentShaderID:se,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:u,batching:Ce,batchingColor:Ce&&T._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&T.instanceColor!==null,instancingMorph:Ue&&T.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ve.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:ft,matcap:ke,envMap:et,envMapMode:et&&q.mapping,envMapCubeUVHeight:$,aoMap:Ke,lightMap:ze,bumpMap:pt,normalMap:Bt,displacementMap:wt,emissiveMap:Qt,normalMapObjectSpace:Bt&&E.normalMapType===Nu,normalMapTangentSpace:Bt&&E.normalMapType===Kn,packedNormalMap:Bt&&E.normalMapType===Kn&&yE(E.normalMap.format),metalnessMap:ct,roughnessMap:gt,anisotropy:U,anisotropyMap:O,clearcoat:Gt,clearcoatMap:W,clearcoatNormalMap:ne,clearcoatRoughnessMap:re,dispersion:Ze,iridescence:y,iridescenceMap:J,iridescenceThicknessMap:X,sheen:m,sheenColorMap:ae,sheenRoughnessMap:ve,specularMap:ce,specularColorMap:oe,specularIntensityMap:ye,transmission:P,transmissionMap:Ie,thicknessMap:Fe,gradientMap:R,opaque:E.transparent===!1&&E.blending===Pi&&E.alphaToCoverage===!1,alphaMap:ie,alphaTest:K,alphaHash:le,combine:E.combine,mapUv:ft&&g(E.map.channel),aoMapUv:Ke&&g(E.aoMap.channel),lightMapUv:ze&&g(E.lightMap.channel),bumpMapUv:pt&&g(E.bumpMap.channel),normalMapUv:Bt&&g(E.normalMap.channel),displacementMapUv:wt&&g(E.displacementMap.channel),emissiveMapUv:Qt&&g(E.emissiveMap.channel),metalnessMapUv:ct&&g(E.metalnessMap.channel),roughnessMapUv:gt&&g(E.roughnessMap.channel),anisotropyMapUv:O&&g(E.anisotropyMap.channel),clearcoatMapUv:W&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:X&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(E.sheenRoughnessMap.channel),specularMapUv:ce&&g(E.specularMap.channel),specularColorMapUv:oe&&g(E.specularColorMap.channel),specularIntensityMapUv:ye&&g(E.specularIntensityMap.channel),transmissionMapUv:Ie&&g(E.transmissionMap.channel),thicknessMapUv:Fe&&g(E.thicknessMap.channel),alphaMapUv:ie&&g(E.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Bt||U),vertexNormals:!!G.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!G.attributes.uv&&(ft||ie),fog:!!Y,useFog:E.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||G.attributes.normal===void 0&&Bt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:A,reversedDepthBuffer:De,skinning:T.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:We,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:ft&&E.map.isVideoTexture===!0&&Ve.getTransfer(E.map.colorSpace)===Xe,decodeVideoTextureEmissive:Qt&&E.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(E.emissiveMap.colorSpace)===Xe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Cn,flipSided:E.side===Pt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:de&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&E.extensions.multiDraw===!0||Ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function p(E){const v=[];if(E.shaderID?v.push(E.shaderID):(v.push(E.customVertexShaderID),v.push(E.customFragmentShaderID)),E.defines!==void 0)for(const I in E.defines)v.push(I),v.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(d(v,E),x(v,E),v.push(i.outputColorSpace)),v.push(E.customProgramCacheKey),v.join()}function d(E,v){E.push(v.precision),E.push(v.outputColorSpace),E.push(v.envMapMode),E.push(v.envMapCubeUVHeight),E.push(v.mapUv),E.push(v.alphaMapUv),E.push(v.lightMapUv),E.push(v.aoMapUv),E.push(v.bumpMapUv),E.push(v.normalMapUv),E.push(v.displacementMapUv),E.push(v.emissiveMapUv),E.push(v.metalnessMapUv),E.push(v.roughnessMapUv),E.push(v.anisotropyMapUv),E.push(v.clearcoatMapUv),E.push(v.clearcoatNormalMapUv),E.push(v.clearcoatRoughnessMapUv),E.push(v.iridescenceMapUv),E.push(v.iridescenceThicknessMapUv),E.push(v.sheenColorMapUv),E.push(v.sheenRoughnessMapUv),E.push(v.specularMapUv),E.push(v.specularColorMapUv),E.push(v.specularIntensityMapUv),E.push(v.transmissionMapUv),E.push(v.thicknessMapUv),E.push(v.combine),E.push(v.fogExp2),E.push(v.sizeAttenuation),E.push(v.morphTargetsCount),E.push(v.morphAttributeCount),E.push(v.numDirLights),E.push(v.numPointLights),E.push(v.numSpotLights),E.push(v.numSpotLightMaps),E.push(v.numHemiLights),E.push(v.numRectAreaLights),E.push(v.numDirLightShadows),E.push(v.numPointLightShadows),E.push(v.numSpotLightShadows),E.push(v.numSpotLightShadowsWithMaps),E.push(v.numLightProbes),E.push(v.shadowMapType),E.push(v.toneMapping),E.push(v.numClippingPlanes),E.push(v.numClipIntersection),E.push(v.depthPacking)}function x(E,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function w(E){const v=f[E.type];let I;if(v){const D=gn[v];I=ys.clone(D.uniforms)}else I=E.uniforms;return I}function B(E,v){let I=h.get(v);return I!==void 0?++I.usedTimes:(I=new wE(i,v,E,s),c.push(I),h.set(v,I)),I}function Q(E){if(--E.usedTimes===0){const v=c.indexOf(E);c[v]=c[c.length-1],c.pop(),h.delete(E.cacheKey),E.destroy()}}function S(E){o.remove(E)}function C(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:w,acquireProgram:B,releaseProgram:Q,releaseShaderCache:S,programs:c,dispose:C}}function IE(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function bE(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Zc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function qc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,M,p,d){let x=i[e];return x===void 0?(x={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:p,group:d},i[e]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=g,x.materialVariant=a(u),x.groupOrder=M,x.renderOrder=u.renderOrder,x.z=p,x.group=d),e++,x}function l(u,f,g,M,p,d){const x=o(u,f,g,M,p,d);g.transmission>0?n.push(x):g.transparent===!0?s.push(x):t.push(x)}function c(u,f,g,M,p,d){const x=o(u,f,g,M,p,d);g.transmission>0?n.unshift(x):g.transparent===!0?s.unshift(x):t.unshift(x)}function h(u,f,g){t.length>1&&t.sort(u||bE),n.length>1&&n.sort(f||Zc),s.length>1&&s.sort(f||Zc),g&&(t.reverse(),n.reverse(),s.reverse())}function A(){for(let u=e,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:A,sort:h}}function DE(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new qc,i.set(n,[a])):s>=r.length?(a=new qc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function RE(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new we};break;case"SpotLight":t={position:new b,direction:new b,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new b,halfWidth:new b,halfHeight:new b};break}return i[e.id]=t,t}}}function TE(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let UE=0;function FE(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function PE(i){const e=new RE,t=TE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const s=new b,r=new Ne,a=new Ne;function o(c){let h=0,A=0,u=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,M=0,p=0,d=0,x=0,w=0,B=0,Q=0,S=0,C=0;c.sort(FE);for(let v=0,I=c.length;v<I;v++){const D=c[v],T=D.color,k=D.intensity,Y=D.distance;let G=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ci?G=D.shadow.map.texture:G=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=T.r*k,A+=T.g*k,u+=T.b*k;else if(D.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(D.sh.coefficients[z],k);C++}else if(D.isDirectionalLight){const z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const V=D.shadow,q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=D.shadow.matrix,x++}n.directional[f]=z,f++}else if(D.isSpotLight){const z=e.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(T).multiplyScalar(k),z.distance=Y,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,n.spot[M]=z;const V=D.shadow;if(D.map&&(n.spotLightMap[Q]=D.map,Q++,V.updateMatrices(D),D.castShadow&&S++),n.spotLightMatrix[M]=V.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,n.spotShadow[M]=q,n.spotShadowMap[M]=G,B++}M++}else if(D.isRectAreaLight){const z=e.get(D);z.color.copy(T).multiplyScalar(k),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),n.rectArea[p]=z,p++}else if(D.isPointLight){const z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){const V=D.shadow,q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,q.shadowCameraNear=V.camera.near,q.shadowCameraFar=V.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=D.shadow.matrix,w++}n.point[g]=z,g++}else if(D.isHemisphereLight){const z=e.get(D);z.skyColor.copy(D.color).multiplyScalar(k),z.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[d]=z,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=A,n.ambient[2]=u;const E=n.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==M||E.rectAreaLength!==p||E.hemiLength!==d||E.numDirectionalShadows!==x||E.numPointShadows!==w||E.numSpotShadows!==B||E.numSpotMaps!==Q||E.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=M,n.rectArea.length=p,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=B,n.spotShadowMap.length=B,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=B+Q-S,n.spotLightMap.length=Q,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=C,E.directionalLength=f,E.pointLength=g,E.spotLength=M,E.rectAreaLength=p,E.hemiLength=d,E.numDirectionalShadows=x,E.numPointShadows=w,E.numSpotShadows=B,E.numSpotMaps=Q,E.numLightProbes=C,n.version=UE++)}function l(c,h){let A=0,u=0,f=0,g=0,M=0;const p=h.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const w=c[d];if(w.isDirectionalLight){const B=n.directional[A];B.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),B.direction.sub(s),B.direction.transformDirection(p),A++}else if(w.isSpotLight){const B=n.spot[f];B.position.setFromMatrixPosition(w.matrixWorld),B.position.applyMatrix4(p),B.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),B.direction.sub(s),B.direction.transformDirection(p),f++}else if(w.isRectAreaLight){const B=n.rectArea[g];B.position.setFromMatrixPosition(w.matrixWorld),B.position.applyMatrix4(p),a.identity(),r.copy(w.matrixWorld),r.premultiply(p),a.extractRotation(r),B.halfWidth.set(w.width*.5,0,0),B.halfHeight.set(0,w.height*.5,0),B.halfWidth.applyMatrix4(a),B.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const B=n.point[u];B.position.setFromMatrixPosition(w.matrixWorld),B.position.applyMatrix4(p),u++}else if(w.isHemisphereLight){const B=n.hemi[M];B.direction.setFromMatrixPosition(w.matrixWorld),B.direction.transformDirection(p),M++}}}return{setup:o,setupView:l,state:n}}function jc(i){const e=new PE(i),t=[],n=[],s=[];function r(u){A.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const A={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:A,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function GE(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new jc(i),e.set(s,[o])):r>=a.length?(o=new jc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const LE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NE=`uniform sampler2D shadow_pass;
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
}`,OE=[new b(1,0,0),new b(-1,0,0),new b(0,1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1)],HE=[new b(0,-1,0),new b(0,-1,0),new b(0,0,1),new b(0,0,-1),new b(0,-1,0),new b(0,-1,0)],$c=new Ne,cs=new b,Ua=new b;function kE(i,e,t){let n=new ws;const s=new ee,r=new ee,a=new $e,o=new yA,l=new CA,c={},h=t.maxTextureSize,A={[Jn]:Pt,[Pt]:Jn,[Cn]:Cn},u=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:LE,fragmentShader:NE}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new at;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Et(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Br;let d=this.type;this.render=function(S,C,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===du&&(Me("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Br);const v=i.getRenderTarget(),I=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),T=i.state;T.setBlending(mn),T.buffers.depth.getReversed()===!0?T.buffers.color.setClear(0,0,0,0):T.buffers.color.setClear(1,1,1,1),T.buffers.depth.setTest(!0),T.setScissorTest(!1);const k=d!==this.type;k&&C.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(G=>G.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,G=S.length;Y<G;Y++){const z=S[Y],V=z.shadow;if(V===void 0){Me("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const q=V.getFrameExtents();s.multiply(q),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,V.mapSize.y=r.y));const $=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=$,V.map===null||k===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===us){if(z.isPointLight){Me("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Lt(s.x,s.y,{format:ci,type:Jt,minFilter:bt,magFilter:bt,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new Vi(s.x,s.y,en),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=Tn,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Mt,V.map.depthTexture.magFilter=Mt}else z.isPointLight?(V.map=new jh(s.x),V.map.depthTexture=new zf(s.x,Bn)):(V.map=new Lt(s.x,s.y),V.map.depthTexture=new Vi(s.x,s.y,Bn)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=Tn,this.type===Br?(V.map.depthTexture.compareFunction=$?Xo:Ko,V.map.depthTexture.minFilter=bt,V.map.depthTexture.magFilter=bt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Mt,V.map.depthTexture.magFilter=Mt);V.camera.updateProjectionMatrix()}const ue=V.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<ue;pe++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,pe),i.clear();else{pe===0&&(i.setRenderTarget(V.map),i.clear());const Ee=V.getViewport(pe);a.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),T.viewport(a)}if(z.isPointLight){const Ee=V.camera,We=V.matrix,lt=z.distance||Ee.far;lt!==Ee.far&&(Ee.far=lt,Ee.updateProjectionMatrix()),cs.setFromMatrixPosition(z.matrixWorld),Ee.position.copy(cs),Ua.copy(Ee.position),Ua.add(OE[pe]),Ee.up.copy(HE[pe]),Ee.lookAt(Ua),Ee.updateMatrixWorld(),We.makeTranslation(-cs.x,-cs.y,-cs.z),$c.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),V._frustum.setFromProjectionMatrix($c,Ee.coordinateSystem,Ee.reversedDepth)}else V.updateMatrices(z);n=V.getFrustum(),B(C,E,V.camera,z,this.type)}V.isPointLightShadow!==!0&&this.type===us&&x(V,E),V.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(v,I,D)};function x(S,C){const E=e.update(M);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Lt(s.x,s.y,{format:ci,type:Jt})),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(C,null,E,u,M,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(C,null,E,f,M,null)}function w(S,C,E,v){let I=null;const D=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)I=D;else if(I=E.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const T=I.uuid,k=C.uuid;let Y=c[T];Y===void 0&&(Y={},c[T]=Y);let G=Y[k];G===void 0&&(G=I.clone(),Y[k]=G,C.addEventListener("dispose",Q)),I=G}if(I.visible=C.visible,I.wireframe=C.wireframe,v===us?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:A[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,E.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const T=i.properties.get(I);T.light=E}return I}function B(S,C,E,v,I){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===us)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);const k=e.update(S),Y=S.material;if(Array.isArray(Y)){const G=k.groups;for(let z=0,V=G.length;z<V;z++){const q=G[z],$=Y[q.materialIndex];if($&&$.visible){const ue=w(S,$,v,I);S.onBeforeShadow(i,S,C,E,k,ue,q),i.renderBufferDirect(E,null,k,ue,S,q),S.onAfterShadow(i,S,C,E,k,ue,q)}}}else if(Y.visible){const G=w(S,Y,v,I);S.onBeforeShadow(i,S,C,E,k,G,null),i.renderBufferDirect(E,null,k,G,S,null),S.onAfterShadow(i,S,C,E,k,G,null)}}const T=S.children;for(let k=0,Y=T.length;k<Y;k++)B(T[k],C,E,v,I)}function Q(S){S.target.removeEventListener("dispose",Q);for(const E in c){const v=c[E],I=S.target.uuid;I in v&&(v[I].dispose(),delete v[I])}}}function VE(i,e){function t(){let R=!1;const ie=new $e;let K=null;const le=new $e(0,0,0,0);return{setMask:function(de){K!==de&&!R&&(i.colorMask(de,de,de,de),K=de)},setLocked:function(de){R=de},setClear:function(de,j,_e,Be,ht){ht===!0&&(de*=Be,j*=Be,_e*=Be),ie.set(de,j,_e,Be),le.equals(ie)===!1&&(i.clearColor(de,j,_e,Be),le.copy(ie))},reset:function(){R=!1,K=null,le.set(-1,0,0,0)}}}function n(){let R=!1,ie=!1,K=null,le=null,de=null;return{setReversed:function(j){if(ie!==j){const _e=e.get("EXT_clip_control");j?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=j;const Be=de;de=null,this.setClear(Be)}},getReversed:function(){return ie},setTest:function(j){j?te(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(j){K!==j&&!R&&(i.depthMask(j),K=j)},setFunc:function(j){if(ie&&(j=Zu[j]),le!==j){switch(j){case Na:i.depthFunc(i.NEVER);break;case Oa:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case ka:i.depthFunc(i.EQUAL);break;case Va:i.depthFunc(i.GEQUAL);break;case za:i.depthFunc(i.GREATER);break;case Ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=j}},setLocked:function(j){R=j},setClear:function(j){de!==j&&(de=j,ie&&(j=1-j),i.clearDepth(j))},reset:function(){R=!1,K=null,le=null,de=null,ie=!1}}}function s(){let R=!1,ie=null,K=null,le=null,de=null,j=null,_e=null,Be=null,ht=null;return{setTest:function(it){R||(it?te(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(it){ie!==it&&!R&&(i.stencilMask(it),ie=it)},setFunc:function(it,hn,un){(K!==it||le!==hn||de!==un)&&(i.stencilFunc(it,hn,un),K=it,le=hn,de=un)},setOp:function(it,hn,un){(j!==it||_e!==hn||Be!==un)&&(i.stencilOp(it,hn,un),j=it,_e=hn,Be=un)},setLocked:function(it){R=it},setClear:function(it){ht!==it&&(i.clearStencil(it),ht=it)},reset:function(){R=!1,ie=null,K=null,le=null,de=null,j=null,_e=null,Be=null,ht=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},A={},u={},f=new WeakMap,g=[],M=null,p=!1,d=null,x=null,w=null,B=null,Q=null,S=null,C=null,E=new we(0,0,0),v=0,I=!1,D=null,T=null,k=null,Y=null,G=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,q=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec($)[1]),V=q>=1):$.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),V=q>=2);let ue=null,pe={};const Ee=i.getParameter(i.SCISSOR_BOX),We=i.getParameter(i.VIEWPORT),lt=new $e().fromArray(Ee),Je=new $e().fromArray(We);function Z(R,ie,K,le){const de=new Uint8Array(4),j=i.createTexture();i.bindTexture(R,j),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<K;_e++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(ie+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return j}const se={};se[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(Oi),pt(!1),Bt(Ql),te(i.CULL_FACE),Ke(mn);function te(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function De(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function Ue(R,ie){return u[R]!==ie?(i.bindFramebuffer(R,ie),u[R]=ie,R===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ie),R===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function Ce(R,ie){let K=g,le=!1;if(R){K=f.get(ie),K===void 0&&(K=[],f.set(ie,K));const de=R.textures;if(K.length!==de.length||K[0]!==i.COLOR_ATTACHMENT0){for(let j=0,_e=de.length;j<_e;j++)K[j]=i.COLOR_ATTACHMENT0+j;K.length=de.length,le=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,le=!0);le&&i.drawBuffers(K)}function ft(R){return M!==R?(i.useProgram(R),M=R,!0):!1}const ke={[si]:i.FUNC_ADD,[gu]:i.FUNC_SUBTRACT,[mu]:i.FUNC_REVERSE_SUBTRACT};ke[Eu]=i.MIN,ke[Bu]=i.MAX;const et={[Mu]:i.ZERO,[xu]:i.ONE,[_u]:i.SRC_COLOR,[Ga]:i.SRC_ALPHA,[Cu]:i.SRC_ALPHA_SATURATE,[Qu]:i.DST_COLOR,[vu]:i.DST_ALPHA,[wu]:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,[yu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[Iu]:i.CONSTANT_COLOR,[bu]:i.ONE_MINUS_CONSTANT_COLOR,[Du]:i.CONSTANT_ALPHA,[Ru]:i.ONE_MINUS_CONSTANT_ALPHA};function Ke(R,ie,K,le,de,j,_e,Be,ht,it){if(R===mn){p===!0&&(De(i.BLEND),p=!1);return}if(p===!1&&(te(i.BLEND),p=!0),R!==pu){if(R!==d||it!==I){if((x!==si||Q!==si)&&(i.blendEquation(i.FUNC_ADD),x=si,Q=si),it)switch(R){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pa:i.blendFunc(i.ONE,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:be("WebGLState: Invalid blending: ",R);break}else switch(R){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case yl:be("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cl:be("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:be("WebGLState: Invalid blending: ",R);break}w=null,B=null,S=null,C=null,E.set(0,0,0),v=0,d=R,I=it}return}de=de||ie,j=j||K,_e=_e||le,(ie!==x||de!==Q)&&(i.blendEquationSeparate(ke[ie],ke[de]),x=ie,Q=de),(K!==w||le!==B||j!==S||_e!==C)&&(i.blendFuncSeparate(et[K],et[le],et[j],et[_e]),w=K,B=le,S=j,C=_e),(Be.equals(E)===!1||ht!==v)&&(i.blendColor(Be.r,Be.g,Be.b,ht),E.copy(Be),v=ht),d=R,I=!1}function ze(R,ie){R.side===Cn?De(i.CULL_FACE):te(i.CULL_FACE);let K=R.side===Pt;ie&&(K=!K),pt(K),R.blending===Pi&&R.transparent===!1?Ke(mn):Ke(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const le=R.stencilWrite;o.setTest(le),le&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Qt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(R){D!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),D=R)}function Bt(R){R!==fu?(te(i.CULL_FACE),R!==T&&(R===Ql?i.cullFace(i.BACK):R===Au?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),T=R}function wt(R){R!==k&&(V&&i.lineWidth(R),k=R)}function Qt(R,ie,K){R?(te(i.POLYGON_OFFSET_FILL),(Y!==ie||G!==K)&&(Y=ie,G=K,a.getReversed()&&(ie=-ie),i.polygonOffset(ie,K))):De(i.POLYGON_OFFSET_FILL)}function ct(R){R?te(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function gt(R){R===void 0&&(R=i.TEXTURE0+z-1),ue!==R&&(i.activeTexture(R),ue=R)}function U(R,ie,K){K===void 0&&(ue===null?K=i.TEXTURE0+z-1:K=ue);let le=pe[K];le===void 0&&(le={type:void 0,texture:void 0},pe[K]=le),(le.type!==R||le.texture!==ie)&&(ue!==K&&(i.activeTexture(K),ue=K),i.bindTexture(R,ie||se[R]),le.type=R,le.texture=ie)}function Gt(){const R=pe[ue];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(R){be("WebGLState:",R)}}function y(){try{i.compressedTexImage3D(...arguments)}catch(R){be("WebGLState:",R)}}function m(){try{i.texSubImage2D(...arguments)}catch(R){be("WebGLState:",R)}}function P(){try{i.texSubImage3D(...arguments)}catch(R){be("WebGLState:",R)}}function O(){try{i.compressedTexSubImage2D(...arguments)}catch(R){be("WebGLState:",R)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(R){be("WebGLState:",R)}}function ne(){try{i.texStorage2D(...arguments)}catch(R){be("WebGLState:",R)}}function re(){try{i.texStorage3D(...arguments)}catch(R){be("WebGLState:",R)}}function J(){try{i.texImage2D(...arguments)}catch(R){be("WebGLState:",R)}}function X(){try{i.texImage3D(...arguments)}catch(R){be("WebGLState:",R)}}function ae(R){return A[R]!==void 0?A[R]:i.getParameter(R)}function ve(R,ie){A[R]!==ie&&(i.pixelStorei(R,ie),A[R]=ie)}function ce(R){lt.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),lt.copy(R))}function oe(R){Je.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Je.copy(R))}function ye(R,ie){let K=c.get(ie);K===void 0&&(K=new WeakMap,c.set(ie,K));let le=K.get(R);le===void 0&&(le=i.getUniformBlockIndex(ie,R.name),K.set(R,le))}function Ie(R,ie){const le=c.get(ie).get(R);l.get(ie)!==le&&(i.uniformBlockBinding(ie,le,R.__bindingPointIndex),l.set(ie,le))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},A={},ue=null,pe={},u={},f=new WeakMap,g=[],M=null,p=!1,d=null,x=null,w=null,B=null,Q=null,S=null,C=null,E=new we(0,0,0),v=0,I=!1,D=null,T=null,k=null,Y=null,G=null,lt.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:De,bindFramebuffer:Ue,drawBuffers:Ce,useProgram:ft,setBlending:Ke,setMaterial:ze,setFlipSided:pt,setCullFace:Bt,setLineWidth:wt,setPolygonOffset:Qt,setScissorTest:ct,activeTexture:gt,bindTexture:U,unbindTexture:Gt,compressedTexImage2D:Ze,compressedTexImage3D:y,texImage2D:J,texImage3D:X,pixelStorei:ve,getParameter:ae,updateUBOMapping:ye,uniformBlockBinding:Ie,texStorage2D:ne,texStorage3D:re,texSubImage2D:m,texSubImage3D:P,compressedTexSubImage2D:O,compressedTexSubImage3D:W,scissor:ce,viewport:oe,reset:Fe}}function zE(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ee,h=new WeakMap,A=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(y,m){return g?new OffscreenCanvas(y,m):xs("canvas")}function p(y,m,P){let O=1;const W=Ze(y);if((W.width>P||W.height>P)&&(O=P/Math.max(W.width,W.height)),O<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ne=Math.floor(O*W.width),re=Math.floor(O*W.height);u===void 0&&(u=M(ne,re));const J=m?M(ne,re):u;return J.width=ne,J.height=re,J.getContext("2d").drawImage(y,0,0,ne,re),Me("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ne+"x"+re+")."),J}else return"data"in y&&Me("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),y;return y}function d(y){return y.generateMipmaps}function x(y){i.generateMipmap(y)}function w(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function B(y,m,P,O,W,ne=!1){if(y!==null){if(i[y]!==void 0)return i[y];Me("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let re;O&&(re=e.get("EXT_texture_norm16"),re||Me("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=m;if(m===i.RED&&(P===i.FLOAT&&(J=i.R32F),P===i.HALF_FLOAT&&(J=i.R16F),P===i.UNSIGNED_BYTE&&(J=i.R8),P===i.UNSIGNED_SHORT&&re&&(J=re.R16_EXT),P===i.SHORT&&re&&(J=re.R16_SNORM_EXT)),m===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.R8UI),P===i.UNSIGNED_SHORT&&(J=i.R16UI),P===i.UNSIGNED_INT&&(J=i.R32UI),P===i.BYTE&&(J=i.R8I),P===i.SHORT&&(J=i.R16I),P===i.INT&&(J=i.R32I)),m===i.RG&&(P===i.FLOAT&&(J=i.RG32F),P===i.HALF_FLOAT&&(J=i.RG16F),P===i.UNSIGNED_BYTE&&(J=i.RG8),P===i.UNSIGNED_SHORT&&re&&(J=re.RG16_EXT),P===i.SHORT&&re&&(J=re.RG16_SNORM_EXT)),m===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RG8UI),P===i.UNSIGNED_SHORT&&(J=i.RG16UI),P===i.UNSIGNED_INT&&(J=i.RG32UI),P===i.BYTE&&(J=i.RG8I),P===i.SHORT&&(J=i.RG16I),P===i.INT&&(J=i.RG32I)),m===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RGB8UI),P===i.UNSIGNED_SHORT&&(J=i.RGB16UI),P===i.UNSIGNED_INT&&(J=i.RGB32UI),P===i.BYTE&&(J=i.RGB8I),P===i.SHORT&&(J=i.RGB16I),P===i.INT&&(J=i.RGB32I)),m===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),P===i.UNSIGNED_INT&&(J=i.RGBA32UI),P===i.BYTE&&(J=i.RGBA8I),P===i.SHORT&&(J=i.RGBA16I),P===i.INT&&(J=i.RGBA32I)),m===i.RGB&&(P===i.UNSIGNED_SHORT&&re&&(J=re.RGB16_EXT),P===i.SHORT&&re&&(J=re.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),m===i.RGBA){const X=ne?Dr:Ve.getTransfer(W);P===i.FLOAT&&(J=i.RGBA32F),P===i.HALF_FLOAT&&(J=i.RGBA16F),P===i.UNSIGNED_BYTE&&(J=X===Xe?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&re&&(J=re.RGBA16_EXT),P===i.SHORT&&re&&(J=re.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function Q(y,m){let P;return y?m===null||m===Bn||m===Bs?P=i.DEPTH24_STENCIL8:m===en?P=i.DEPTH32F_STENCIL8:m===Es&&(P=i.DEPTH24_STENCIL8,Me("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===Bn||m===Bs?P=i.DEPTH_COMPONENT24:m===en?P=i.DEPTH_COMPONENT32F:m===Es&&(P=i.DEPTH_COMPONENT16),P}function S(y,m){return d(y)===!0||y.isFramebufferTexture&&y.minFilter!==Mt&&y.minFilter!==bt?Math.log2(Math.max(m.width,m.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?m.mipmaps.length:1}function C(y){const m=y.target;m.removeEventListener("dispose",C),v(m),m.isVideoTexture&&h.delete(m),m.isHTMLTexture&&A.delete(m)}function E(y){const m=y.target;m.removeEventListener("dispose",E),D(m)}function v(y){const m=n.get(y);if(m.__webglInit===void 0)return;const P=y.source,O=f.get(P);if(O){const W=O[m.__cacheKey];W.usedTimes--,W.usedTimes===0&&I(y),Object.keys(O).length===0&&f.delete(P)}n.remove(y)}function I(y){const m=n.get(y);i.deleteTexture(m.__webglTexture);const P=y.source,O=f.get(P);delete O[m.__cacheKey],a.memory.textures--}function D(y){const m=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(m.__webglFramebuffer[O]))for(let W=0;W<m.__webglFramebuffer[O].length;W++)i.deleteFramebuffer(m.__webglFramebuffer[O][W]);else i.deleteFramebuffer(m.__webglFramebuffer[O]);m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer[O])}else{if(Array.isArray(m.__webglFramebuffer))for(let O=0;O<m.__webglFramebuffer.length;O++)i.deleteFramebuffer(m.__webglFramebuffer[O]);else i.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&i.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let O=0;O<m.__webglColorRenderbuffer.length;O++)m.__webglColorRenderbuffer[O]&&i.deleteRenderbuffer(m.__webglColorRenderbuffer[O]);m.__webglDepthRenderbuffer&&i.deleteRenderbuffer(m.__webglDepthRenderbuffer)}const P=y.textures;for(let O=0,W=P.length;O<W;O++){const ne=n.get(P[O]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(P[O])}n.remove(y)}let T=0;function k(){T=0}function Y(){return T}function G(y){T=y}function z(){const y=T;return y>=s.maxTextures&&Me("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),T+=1,y}function V(y){const m=[];return m.push(y.wrapS),m.push(y.wrapT),m.push(y.wrapR||0),m.push(y.magFilter),m.push(y.minFilter),m.push(y.anisotropy),m.push(y.internalFormat),m.push(y.format),m.push(y.type),m.push(y.generateMipmaps),m.push(y.premultiplyAlpha),m.push(y.flipY),m.push(y.unpackAlignment),m.push(y.colorSpace),m.join()}function q(y,m){const P=n.get(y);if(y.isVideoTexture&&U(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&P.__version!==y.version){const O=y.image;if(O===null)Me("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Me("WebGLRenderer: Texture marked for update but image is incomplete");else{De(P,y,m);return}}else y.isExternalTexture&&(P.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+m)}function $(y,m){const P=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&P.__version!==y.version){De(P,y,m);return}else y.isExternalTexture&&(P.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+m)}function ue(y,m){const P=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&P.__version!==y.version){De(P,y,m);return}t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+m)}function pe(y,m){const P=n.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&P.__version!==y.version){Ue(P,y,m);return}t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+m)}const Ee={[Wa]:i.REPEAT,[bn]:i.CLAMP_TO_EDGE,[Ja]:i.MIRRORED_REPEAT},We={[Mt]:i.NEAREST,[Pu]:i.NEAREST_MIPMAP_NEAREST,[Ts]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[Xr]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},lt={[Ou]:i.NEVER,[Yu]:i.ALWAYS,[Hu]:i.LESS,[Ko]:i.LEQUAL,[ku]:i.EQUAL,[Xo]:i.GEQUAL,[Vu]:i.GREATER,[zu]:i.NOTEQUAL};function Je(y,m){if(m.type===en&&e.has("OES_texture_float_linear")===!1&&(m.magFilter===bt||m.magFilter===Xr||m.magFilter===Ts||m.magFilter===ai||m.minFilter===bt||m.minFilter===Xr||m.minFilter===Ts||m.minFilter===ai)&&Me("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,Ee[m.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,Ee[m.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,Ee[m.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,We[m.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,We[m.minFilter]),m.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,lt[m.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Mt||m.minFilter!==Ts&&m.minFilter!==ai||m.type===en&&e.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||n.get(m).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(y,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,s.getMaxAnisotropy())),n.get(m).__currentAnisotropy=m.anisotropy}}}function Z(y,m){let P=!1;y.__webglInit===void 0&&(y.__webglInit=!0,m.addEventListener("dispose",C));const O=m.source;let W=f.get(O);W===void 0&&(W={},f.set(O,W));const ne=V(m);if(ne!==y.__cacheKey){W[ne]===void 0&&(W[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),W[ne].usedTimes++;const re=W[y.__cacheKey];re!==void 0&&(W[y.__cacheKey].usedTimes--,re.usedTimes===0&&I(m)),y.__cacheKey=ne,y.__webglTexture=W[ne].texture}return P}function se(y,m,P){return Math.floor(Math.floor(y/P)/m)}function te(y,m,P,O){const ne=y.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,m.width,m.height,P,O,m.data);else{ne.sort((ve,ce)=>ve.start-ce.start);let re=0;for(let ve=1;ve<ne.length;ve++){const ce=ne[re],oe=ne[ve],ye=ce.start+ce.count,Ie=se(oe.start,m.width,4),Fe=se(ce.start,m.width,4);oe.start<=ye+1&&Ie===Fe&&se(oe.start+oe.count-1,m.width,4)===Ie?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++re,ne[re]=oe)}ne.length=re+1;const J=t.getParameter(i.UNPACK_ROW_LENGTH),X=t.getParameter(i.UNPACK_SKIP_PIXELS),ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,m.width);for(let ve=0,ce=ne.length;ve<ce;ve++){const oe=ne[ve],ye=Math.floor(oe.start/4),Ie=Math.ceil(oe.count/4),Fe=ye%m.width,R=Math.floor(ye/m.width),ie=Ie,K=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(i.UNPACK_SKIP_ROWS,R),t.texSubImage2D(i.TEXTURE_2D,0,Fe,R,ie,K,P,O,m.data)}y.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,X),t.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function De(y,m,P){let O=i.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(O=i.TEXTURE_2D_ARRAY),m.isData3DTexture&&(O=i.TEXTURE_3D);const W=Z(y,m),ne=m.source;t.bindTexture(O,y.__webglTexture,i.TEXTURE0+P);const re=n.get(ne);if(ne.version!==re.__version||W===!0){if(t.activeTexture(i.TEXTURE0+P),(typeof ImageBitmap<"u"&&m.image instanceof ImageBitmap)===!1){const K=Ve.getPrimaries(Ve.workingColorSpace),le=m.colorSpace===zn?null:Ve.getPrimaries(m.colorSpace),de=m.colorSpace===zn||K===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de)}t.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment);let X=p(m.image,!1,s.maxTextureSize);X=Gt(m,X);const ae=r.convert(m.format,m.colorSpace),ve=r.convert(m.type);let ce=B(m.internalFormat,ae,ve,m.normalized,m.colorSpace,m.isVideoTexture);Je(O,m);let oe;const ye=m.mipmaps,Ie=m.isVideoTexture!==!0,Fe=re.__version===void 0||W===!0,R=ne.dataReady,ie=S(m,X);if(m.isDepthTexture)ce=Q(m.format===oi,m.type),Fe&&(Ie?t.texStorage2D(i.TEXTURE_2D,1,ce,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,ce,X.width,X.height,0,ae,ve,null));else if(m.isDataTexture)if(ye.length>0){Ie&&Fe&&t.texStorage2D(i.TEXTURE_2D,ie,ce,ye[0].width,ye[0].height);for(let K=0,le=ye.length;K<le;K++)oe=ye[K],Ie?R&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,oe.width,oe.height,ae,ve,oe.data):t.texImage2D(i.TEXTURE_2D,K,ce,oe.width,oe.height,0,ae,ve,oe.data);m.generateMipmaps=!1}else Ie?(Fe&&t.texStorage2D(i.TEXTURE_2D,ie,ce,X.width,X.height),R&&te(m,X,ae,ve)):t.texImage2D(i.TEXTURE_2D,0,ce,X.width,X.height,0,ae,ve,X.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Ie&&Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,ye[0].width,ye[0].height,X.depth);for(let K=0,le=ye.length;K<le;K++)if(oe=ye[K],m.format!==tn)if(ae!==null)if(Ie){if(R)if(m.layerUpdates.size>0){const de=bc(oe.width,oe.height,m.format,m.type);for(const j of m.layerUpdates){const _e=oe.data.subarray(j*de/oe.data.BYTES_PER_ELEMENT,(j+1)*de/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,j,oe.width,oe.height,1,ae,_e)}m.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,oe.width,oe.height,X.depth,ae,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,ce,oe.width,oe.height,X.depth,0,oe.data,0,0);else Me("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?R&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,oe.width,oe.height,X.depth,ae,ve,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,ce,oe.width,oe.height,X.depth,0,ae,ve,oe.data)}else{Ie&&Fe&&t.texStorage2D(i.TEXTURE_2D,ie,ce,ye[0].width,ye[0].height);for(let K=0,le=ye.length;K<le;K++)oe=ye[K],m.format!==tn?ae!==null?Ie?R&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,K,ce,oe.width,oe.height,0,oe.data):Me("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?R&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,oe.width,oe.height,ae,ve,oe.data):t.texImage2D(i.TEXTURE_2D,K,ce,oe.width,oe.height,0,ae,ve,oe.data)}else if(m.isDataArrayTexture)if(Ie){if(Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,X.width,X.height,X.depth),R)if(m.layerUpdates.size>0){const K=bc(X.width,X.height,m.format,m.type);for(const le of m.layerUpdates){const de=X.data.subarray(le*K/X.data.BYTES_PER_ELEMENT,(le+1)*K/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,X.width,X.height,1,ae,ve,de)}m.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,ae,ve,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,X.width,X.height,X.depth,0,ae,ve,X.data);else if(m.isData3DTexture)Ie?(Fe&&t.texStorage3D(i.TEXTURE_3D,ie,ce,X.width,X.height,X.depth),R&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,ae,ve,X.data)):t.texImage3D(i.TEXTURE_3D,0,ce,X.width,X.height,X.depth,0,ae,ve,X.data);else if(m.isFramebufferTexture){if(Fe)if(Ie)t.texStorage2D(i.TEXTURE_2D,ie,ce,X.width,X.height);else{let K=X.width,le=X.height;for(let de=0;de<ie;de++)t.texImage2D(i.TEXTURE_2D,de,ce,K,le,0,ae,ve,null),K>>=1,le>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in i){const K=i.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),X.parentNode!==K){K.appendChild(X),A.add(m),K.onpaint=le=>{const de=le.changedElements;for(const j of A)de.includes(j.image)&&(j.needsUpdate=!0)},K.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,X);else{const de=i.RGBA,j=i.RGBA,_e=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,de,j,_e,X)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ye.length>0){if(Ie&&Fe){const K=Ze(ye[0]);t.texStorage2D(i.TEXTURE_2D,ie,ce,K.width,K.height)}for(let K=0,le=ye.length;K<le;K++)oe=ye[K],Ie?R&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ae,ve,oe):t.texImage2D(i.TEXTURE_2D,K,ce,ae,ve,oe);m.generateMipmaps=!1}else if(Ie){if(Fe){const K=Ze(X);t.texStorage2D(i.TEXTURE_2D,ie,ce,K.width,K.height)}R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,ve,X)}else t.texImage2D(i.TEXTURE_2D,0,ce,ae,ve,X);d(m)&&x(O),re.__version=ne.version,m.onUpdate&&m.onUpdate(m)}y.__version=m.version}function Ue(y,m,P){if(m.image.length!==6)return;const O=Z(y,m),W=m.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+P);const ne=n.get(W);if(W.version!==ne.__version||O===!0){t.activeTexture(i.TEXTURE0+P);const re=Ve.getPrimaries(Ve.workingColorSpace),J=m.colorSpace===zn?null:Ve.getPrimaries(m.colorSpace),X=m.colorSpace===zn||re===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);const ae=m.isCompressedTexture||m.image[0].isCompressedTexture,ve=m.image[0]&&m.image[0].isDataTexture,ce=[];for(let j=0;j<6;j++)!ae&&!ve?ce[j]=p(m.image[j],!0,s.maxCubemapSize):ce[j]=ve?m.image[j].image:m.image[j],ce[j]=Gt(m,ce[j]);const oe=ce[0],ye=r.convert(m.format,m.colorSpace),Ie=r.convert(m.type),Fe=B(m.internalFormat,ye,Ie,m.normalized,m.colorSpace),R=m.isVideoTexture!==!0,ie=ne.__version===void 0||O===!0,K=W.dataReady;let le=S(m,oe);Je(i.TEXTURE_CUBE_MAP,m);let de;if(ae){R&&ie&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Fe,oe.width,oe.height);for(let j=0;j<6;j++){de=ce[j].mipmaps;for(let _e=0;_e<de.length;_e++){const Be=de[_e];m.format!==tn?ye!==null?R?K&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Be.width,Be.height,ye,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,Fe,Be.width,Be.height,0,Be.data):Me("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Be.width,Be.height,ye,Ie,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,Fe,Be.width,Be.height,0,ye,Ie,Be.data)}}}else{if(de=m.mipmaps,R&&ie){de.length>0&&le++;const j=Ze(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Fe,j.width,j.height)}for(let j=0;j<6;j++)if(ve){R?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ce[j].width,ce[j].height,ye,Ie,ce[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,ce[j].width,ce[j].height,0,ye,Ie,ce[j].data);for(let _e=0;_e<de.length;_e++){const ht=de[_e].image[j].image;R?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,ht.width,ht.height,ye,Ie,ht.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,Fe,ht.width,ht.height,0,ye,Ie,ht.data)}}else{R?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ye,Ie,ce[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,ye,Ie,ce[j]);for(let _e=0;_e<de.length;_e++){const Be=de[_e];R?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,ye,Ie,Be.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,Fe,ye,Ie,Be.image[j])}}}d(m)&&x(i.TEXTURE_CUBE_MAP),ne.__version=W.version,m.onUpdate&&m.onUpdate(m)}y.__version=m.version}function Ce(y,m,P,O,W,ne){const re=r.convert(P.format,P.colorSpace),J=r.convert(P.type),X=B(P.internalFormat,re,J,P.normalized,P.colorSpace),ae=n.get(m),ve=n.get(P);if(ve.__renderTarget=m,!ae.__hasExternalTextures){const ce=Math.max(1,m.width>>ne),oe=Math.max(1,m.height>>ne);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?t.texImage3D(W,ne,X,ce,oe,m.depth,0,re,J,null):t.texImage2D(W,ne,X,ce,oe,0,re,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),gt(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,O,W,ve.__webglTexture,0,ct(m)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,O,W,ve.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(y,m,P){if(i.bindRenderbuffer(i.RENDERBUFFER,y),m.depthBuffer){const O=m.depthTexture,W=O&&O.isDepthTexture?O.type:null,ne=Q(m.stencilBuffer,W),re=m.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;gt(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct(m),ne,m.width,m.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct(m),ne,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,ne,m.width,m.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,y)}else{const O=m.textures;for(let W=0;W<O.length;W++){const ne=O[W],re=r.convert(ne.format,ne.colorSpace),J=r.convert(ne.type),X=B(ne.internalFormat,re,J,ne.normalized,ne.colorSpace);gt(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct(m),X,m.width,m.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct(m),X,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,X,m.width,m.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(y,m,P){const O=m.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=n.get(m.depthTexture);if(W.__renderTarget=m,(!W.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),O){if(W.__webglInit===void 0&&(W.__webglInit=!0,m.depthTexture.addEventListener("dispose",C)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Je(i.TEXTURE_CUBE_MAP,m.depthTexture);const ae=r.convert(m.depthTexture.format),ve=r.convert(m.depthTexture.type);let ce;m.depthTexture.format===Tn?ce=i.DEPTH_COMPONENT24:m.depthTexture.format===oi&&(ce=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,m.width,m.height,0,ae,ve,null)}}else q(m.depthTexture,0);const ne=W.__webglTexture,re=ct(m),J=O?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,X=m.depthTexture.format===oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(m.depthTexture.format===Tn)gt(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,J,ne,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,X,J,ne,0);else if(m.depthTexture.format===oi)gt(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,J,ne,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,X,J,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(y){const m=n.get(y),P=y.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==y.depthTexture){const O=y.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),O){const W=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,O.removeEventListener("dispose",W)};O.addEventListener("dispose",W),m.__depthDisposeCallback=W}m.__boundDepthTexture=O}if(y.depthTexture&&!m.__autoAllocateDepthBuffer)if(P)for(let O=0;O<6;O++)ke(m.__webglFramebuffer[O],y,O);else{const O=y.texture.mipmaps;O&&O.length>0?ke(m.__webglFramebuffer[0],y,0):ke(m.__webglFramebuffer,y,0)}else if(P){m.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[O]),m.__webglDepthbuffer[O]===void 0)m.__webglDepthbuffer[O]=i.createRenderbuffer(),ft(m.__webglDepthbuffer[O],y,!1);else{const W=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=m.__webglDepthbuffer[O];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,ne)}}else{const O=y.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=i.createRenderbuffer(),ft(m.__webglDepthbuffer,y,!1);else{const W=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=m.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ke(y,m,P){const O=n.get(y);m!==void 0&&Ce(O.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&et(y)}function ze(y){const m=y.texture,P=n.get(y),O=n.get(m);y.addEventListener("dispose",E);const W=y.textures,ne=y.isWebGLCubeRenderTarget===!0,re=W.length>1;if(re||(O.__webglTexture===void 0&&(O.__webglTexture=i.createTexture()),O.__version=m.version,a.memory.textures++),ne){P.__webglFramebuffer=[];for(let J=0;J<6;J++)if(m.mipmaps&&m.mipmaps.length>0){P.__webglFramebuffer[J]=[];for(let X=0;X<m.mipmaps.length;X++)P.__webglFramebuffer[J][X]=i.createFramebuffer()}else P.__webglFramebuffer[J]=i.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){P.__webglFramebuffer=[];for(let J=0;J<m.mipmaps.length;J++)P.__webglFramebuffer[J]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(re)for(let J=0,X=W.length;J<X;J++){const ae=n.get(W[J]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(y.samples>0&&gt(y)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let J=0;J<W.length;J++){const X=W[J];P.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[J]);const ae=r.convert(X.format,X.colorSpace),ve=r.convert(X.type),ce=B(X.internalFormat,ae,ve,X.normalized,X.colorSpace,y.isXRRenderTarget===!0),oe=ct(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,ce,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,P.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(P.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture),Je(i.TEXTURE_CUBE_MAP,m);for(let J=0;J<6;J++)if(m.mipmaps&&m.mipmaps.length>0)for(let X=0;X<m.mipmaps.length;X++)Ce(P.__webglFramebuffer[J][X],y,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,X);else Ce(P.__webglFramebuffer[J],y,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);d(m)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let J=0,X=W.length;J<X;J++){const ae=W[J],ve=n.get(ae);let ce=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ce=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ve.__webglTexture),Je(ce,ae),Ce(P.__webglFramebuffer,y,ae,i.COLOR_ATTACHMENT0+J,ce,0),d(ae)&&x(ce)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(J=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,O.__webglTexture),Je(J,m),m.mipmaps&&m.mipmaps.length>0)for(let X=0;X<m.mipmaps.length;X++)Ce(P.__webglFramebuffer[X],y,m,i.COLOR_ATTACHMENT0,J,X);else Ce(P.__webglFramebuffer,y,m,i.COLOR_ATTACHMENT0,J,0);d(m)&&x(J),t.unbindTexture()}y.depthBuffer&&et(y)}function pt(y){const m=y.textures;for(let P=0,O=m.length;P<O;P++){const W=m[P];if(d(W)){const ne=w(y),re=n.get(W).__webglTexture;t.bindTexture(ne,re),x(ne),t.unbindTexture()}}}const Bt=[],wt=[];function Qt(y){if(y.samples>0){if(gt(y)===!1){const m=y.textures,P=y.width,O=y.height;let W=i.COLOR_BUFFER_BIT;const ne=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(y),J=m.length>1;if(J)for(let ae=0;ae<m.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const X=y.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<m.length;ae++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const ve=n.get(m[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,P,O,0,0,P,O,W,i.NEAREST),l===!0&&(Bt.length=0,wt.length=0,Bt.push(i.COLOR_ATTACHMENT0+ae),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Bt.push(ne),wt.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let ae=0;ae<m.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const ve=n.get(m[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const m=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[m])}}}function ct(y){return Math.min(s.maxSamples,y.samples)}function gt(y){const m=n.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function U(y){const m=a.render.frame;h.get(y)!==m&&(h.set(y,m),y.update())}function Gt(y,m){const P=y.colorSpace,O=y.format,W=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||P!==br&&P!==zn&&(Ve.getTransfer(P)===Xe?(O!==tn||W!==Yt)&&Me("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):be("WebGLTextures: Unsupported texture color space:",P)),m}function Ze(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.getTextureUnits=Y,this.setTextureUnits=G,this.setTexture2D=q,this.setTexture2DArray=$,this.setTexture3D=ue,this.setTextureCube=pe,this.rebindTextures=Ke,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=gt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function YE(i,e){function t(n,s=zn){let r;const a=Ve.getTransfer(s);if(n===Yt)return i.UNSIGNED_BYTE;if(n===ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ah)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ih)return i.BYTE;if(n===sh)return i.SHORT;if(n===Es)return i.UNSIGNED_SHORT;if(n===Ho)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===en)return i.FLOAT;if(n===Jt)return i.HALF_FLOAT;if(n===oh)return i.ALPHA;if(n===lh)return i.RGB;if(n===tn)return i.RGBA;if(n===Tn)return i.DEPTH_COMPONENT;if(n===oi)return i.DEPTH_STENCIL;if(n===zo)return i.RED;if(n===Yo)return i.RED_INTEGER;if(n===ci)return i.RG;if(n===Wo)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===Mr||n===xr||n===_r||n===wr)if(a===Xe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ka||n===Xa||n===Za||n===qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ja||n===$a||n===eo||n===to||n===no||n===yr||n===io)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ja||n===$a)return a===Xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===eo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===to)return r.COMPRESSED_R11_EAC;if(n===no)return r.COMPRESSED_SIGNED_R11_EAC;if(n===yr)return r.COMPRESSED_RG11_EAC;if(n===io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===Ao||n===po||n===go||n===mo||n===Eo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===so)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ro)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ao)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===co)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ho)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ao)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===po)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===go)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===Xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===Mo||n===xo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Bo)return a===Xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_o||n===wo||n===Cr||n===vo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const WE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JE=`
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

}`;class KE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new wh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dt({vertexShader:WE,fragmentShader:JE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new Hr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class XE extends Xn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,A=null,u=null,f=null,g=null;const M=typeof XRWebGLBinding<"u",p=new KE,d={},x=t.getContextAttributes();let w=null,B=null;const Q=[],S=[],C=new ee;let E=null;const v=new zt;v.viewport=new $e;const I=new zt;I.viewport=new $e;const D=[v,I],T=new KA;let k=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let se=Q[Z];return se===void 0&&(se=new na,Q[Z]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Z){let se=Q[Z];return se===void 0&&(se=new na,Q[Z]=se),se.getGripSpace()},this.getHand=function(Z){let se=Q[Z];return se===void 0&&(se=new na,Q[Z]=se),se.getHandSpace()};function G(Z){const se=S.indexOf(Z.inputSource);if(se===-1)return;const te=Q[se];te!==void 0&&(te.update(Z.inputSource,Z.frame,c||a),te.dispatchEvent({type:Z.type,data:Z.inputSource}))}function z(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",V);for(let Z=0;Z<Q.length;Z++){const se=S[Z];se!==null&&(S[Z]=null,Q[Z].disconnect(se))}k=null,Y=null,p.reset();for(const Z in d)delete d[Z];e.setRenderTarget(w),f=null,u=null,A=null,s=null,B=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Me("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Me("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return A===null&&M&&(A=new XRWebGLBinding(s,t)),A},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",z),s.addEventListener("inputsourceschange",V),x.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(C),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,De=null,Ue=null;x.depth&&(Ue=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=x.stencil?oi:Tn,De=x.stencil?Bs:Bn);const Ce={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};A=this.getBinding(),u=A.createProjectionLayer(Ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),B=new Lt(u.textureWidth,u.textureHeight,{format:tn,type:Yt,depthTexture:new Vi(u.textureWidth,u.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),B=new Lt(f.framebufferWidth,f.framebufferHeight,{format:tn,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}B.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function V(Z){for(let se=0;se<Z.removed.length;se++){const te=Z.removed[se],De=S.indexOf(te);De>=0&&(S[De]=null,Q[De].disconnect(te))}for(let se=0;se<Z.added.length;se++){const te=Z.added[se];let De=S.indexOf(te);if(De===-1){for(let Ce=0;Ce<Q.length;Ce++)if(Ce>=S.length){S.push(te),De=Ce;break}else if(S[Ce]===null){S[Ce]=te,De=Ce;break}if(De===-1)break}const Ue=Q[De];Ue&&Ue.connect(te)}}const q=new b,$=new b;function ue(Z,se,te){q.setFromMatrixPosition(se.matrixWorld),$.setFromMatrixPosition(te.matrixWorld);const De=q.distanceTo($),Ue=se.projectionMatrix.elements,Ce=te.projectionMatrix.elements,ft=Ue[14]/(Ue[10]-1),ke=Ue[14]/(Ue[10]+1),et=(Ue[9]+1)/Ue[5],Ke=(Ue[9]-1)/Ue[5],ze=(Ue[8]-1)/Ue[0],pt=(Ce[8]+1)/Ce[0],Bt=ft*ze,wt=ft*pt,Qt=De/(-ze+pt),ct=Qt*-ze;if(se.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ct),Z.translateZ(Qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ue[10]===-1)Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const gt=ft+Qt,U=ke+Qt,Gt=Bt-ct,Ze=wt+(De-ct),y=et*ke/U*gt,m=Ke*ke/U*gt;Z.projectionMatrix.makePerspective(Gt,Ze,y,m,gt,U),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pe(Z,se){se===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(se.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let se=Z.near,te=Z.far;p.texture!==null&&(p.depthNear>0&&(se=p.depthNear),p.depthFar>0&&(te=p.depthFar)),T.near=I.near=v.near=se,T.far=I.far=v.far=te,(k!==T.near||Y!==T.far)&&(s.updateRenderState({depthNear:T.near,depthFar:T.far}),k=T.near,Y=T.far),T.layers.mask=Z.layers.mask|6,v.layers.mask=T.layers.mask&-5,I.layers.mask=T.layers.mask&-3;const De=Z.parent,Ue=T.cameras;pe(T,De);for(let Ce=0;Ce<Ue.length;Ce++)pe(Ue[Ce],De);Ue.length===2?ue(T,v,I):T.projectionMatrix.copy(v.projectionMatrix),Ee(Z,T,De)};function Ee(Z,se,te){te===null?Z.matrix.copy(se.matrixWorld):(Z.matrix.copy(te.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(se.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ki*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(T)},this.getCameraTexture=function(Z){return d[Z]};let We=null;function lt(Z,se){if(h=se.getViewerPose(c||a),g=se,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(B,f.framebuffer),e.setRenderTarget(B));let De=!1;te.length!==T.cameras.length&&(T.cameras.length=0,De=!0);for(let ke=0;ke<te.length;ke++){const et=te[ke];let Ke=null;if(f!==null)Ke=f.getViewport(et);else{const pt=A.getViewSubImage(u,et);Ke=pt.viewport,ke===0&&(e.setRenderTargetTextures(B,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(B))}let ze=D[ke];ze===void 0&&(ze=new zt,ze.layers.enable(ke),ze.viewport=new $e,D[ke]=ze),ze.matrix.fromArray(et.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(et.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(T.matrix.copy(ze.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),De===!0&&T.cameras.push(ze)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){A=n.getBinding();const ke=A.getDepthInformation(te[0]);ke&&ke.isValid&&ke.texture&&p.init(ke,s.renderState)}if(Ue&&Ue.includes("camera-access")&&M){e.state.unbindTexture(),A=n.getBinding();for(let ke=0;ke<te.length;ke++){const et=te[ke].camera;if(et){let Ke=d[et];Ke||(Ke=new wh,d[et]=Ke);const ze=A.getCameraImage(et);Ke.sourceTexture=ze}}}}for(let te=0;te<Q.length;te++){const De=S[te],Ue=Q[te];De!==null&&Ue!==void 0&&Ue.update(De,se,c||a)}We&&We(Z,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const Je=new Zh;Je.setAnimationLoop(lt),this.setAnimationLoop=function(Z){We=Z},this.dispose=function(){}}}const ZE=new Ne,iu=new Re;iu.set(-1,0,0,0,1,0,0,0,1);function qE(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Yh(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,x,w,B){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(p,d):d.isMeshLambertMaterial?(r(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(p,d),A(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(p,d),u(p,d),d.isMeshPhysicalMaterial&&f(p,d,B)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),M(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,x,w):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Pt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Pt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const x=e.get(d),w=x.envMap,B=x.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(ZE.makeRotationFromEuler(B)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(iu),p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,x,w){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=w*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function A(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function u(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function f(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function M(p,d){const x=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function jE(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(B,Q){const S=Q.program;n.uniformBlockBinding(B,S)}function c(B,Q){let S=s[B.id];S===void 0&&(p(B),S=h(B),s[B.id]=S,B.addEventListener("dispose",x));const C=Q.program;n.updateUBOMapping(B,C);const E=e.render.frame;r[B.id]!==E&&(u(B),r[B.id]=E)}function h(B){const Q=A();B.__bindingPointIndex=Q;const S=i.createBuffer(),C=B.__size,E=B.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,Q,S),S}function A(){for(let B=0;B<o;B++)if(a.indexOf(B)===-1)return a.push(B),B;return be("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(B){const Q=s[B.id],S=B.uniforms,C=B.__cache;i.bindBuffer(i.UNIFORM_BUFFER,Q);for(let E=0,v=S.length;E<v;E++){const I=S[E];if(Array.isArray(I))for(let D=0,T=I.length;D<T;D++)f(I[D],E,D,C);else f(I,E,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(B,Q,S,C){if(M(B,Q,S,C)===!0){const E=B.__offset,v=B.value;if(Array.isArray(v)){let I=0;for(let D=0;D<v.length;D++){const T=v[D],k=d(T);g(T,B.__data,I),typeof T!="number"&&typeof T!="boolean"&&!T.isMatrix3&&!ArrayBuffer.isView(T)&&(I+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(v,B.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,B.__data)}}function g(B,Q,S){typeof B=="number"||typeof B=="boolean"?Q[0]=B:B.isMatrix3?(Q[0]=B.elements[0],Q[1]=B.elements[1],Q[2]=B.elements[2],Q[3]=0,Q[4]=B.elements[3],Q[5]=B.elements[4],Q[6]=B.elements[5],Q[7]=0,Q[8]=B.elements[6],Q[9]=B.elements[7],Q[10]=B.elements[8],Q[11]=0):ArrayBuffer.isView(B)?Q.set(new B.constructor(B.buffer,B.byteOffset,Q.length)):B.toArray(Q,S)}function M(B,Q,S,C){const E=B.value,v=Q+"_"+S;if(C[v]===void 0)return typeof E=="number"||typeof E=="boolean"?C[v]=E:ArrayBuffer.isView(E)?C[v]=E.slice():C[v]=E.clone(),!0;{const I=C[v];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return C[v]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(I.equals(E)===!1)return I.copy(E),!0}}return!1}function p(B){const Q=B.uniforms;let S=0;const C=16;for(let v=0,I=Q.length;v<I;v++){const D=Array.isArray(Q[v])?Q[v]:[Q[v]];for(let T=0,k=D.length;T<k;T++){const Y=D[T],G=Array.isArray(Y.value)?Y.value:[Y.value];for(let z=0,V=G.length;z<V;z++){const q=G[z],$=d(q),ue=S%C,pe=ue%$.boundary,Ee=ue+pe;S+=pe,Ee!==0&&C-Ee<$.storage&&(S+=C-Ee),Y.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=S,S+=$.storage}}}const E=S%C;return E>0&&(S+=C-E),B.__size=S,B.__cache={},this}function d(B){const Q={boundary:0,storage:0};return typeof B=="number"||typeof B=="boolean"?(Q.boundary=4,Q.storage=4):B.isVector2?(Q.boundary=8,Q.storage=8):B.isVector3||B.isColor?(Q.boundary=16,Q.storage=12):B.isVector4?(Q.boundary=16,Q.storage=16):B.isMatrix3?(Q.boundary=48,Q.storage=48):B.isMatrix4?(Q.boundary=64,Q.storage=64):B.isTexture?Me("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(B)?(Q.boundary=16,Q.storage=B.byteLength):Me("WebGLRenderer: Unsupported uniform value type.",B),Q}function x(B){const Q=B.target;Q.removeEventListener("dispose",x);const S=a.indexOf(Q.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[Q.id]),delete s[Q.id],delete r[Q.id]}function w(){for(const B in s)i.deleteBuffer(s[B]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const $E=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let dn=null;function e0(){return dn===null&&(dn=new $o($E,16,16,ci,Jt),dn.name="DFG_LUT",dn.minFilter=bt,dn.magFilter=bt,dn.wrapS=bn,dn.wrapT=bn,dn.generateMipmaps=!1,dn.needsUpdate=!0),dn}class oM{constructor(e={}){const{canvas:t=Ku(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:A=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Yt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const M=f,p=new Set([Jo,Wo,Yo]),d=new Set([Yt,Bn,Es,Bs,ko,Vo]),x=new Uint32Array(4),w=new Int32Array(4),B=new b;let Q=null,S=null;const C=[],E=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let D=!1,T=null,k=null,Y=null,G=null;this._outputColorSpace=$t;let z=0,V=0,q=null,$=-1,ue=null;const pe=new $e,Ee=new $e;let We=null;const lt=new we(0);let Je=0,Z=t.width,se=t.height,te=1,De=null,Ue=null;const Ce=new $e(0,0,Z,se),ft=new $e(0,0,Z,se);let ke=!1;const et=new ws;let Ke=!1,ze=!1;const pt=new Ne,Bt=new b,wt=new $e,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function gt(){return q===null?te:1}let U=n;function Gt(_,F){return t.getContext(_,F)}try{const _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:A};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r185"),t.addEventListener("webglcontextlost",ht,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",hn,!1),U===null){const F="webgl2";if(U=Gt(F,_),U===null)throw Gt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(_){throw be("WebGLRenderer: "+_.message),_}let Ze,y,m,P,O,W,ne,re,J,X,ae,ve,ce,oe,ye,Ie,Fe,R,ie,K,le,de,j;function _e(){Ze=new em(U),Ze.init(),le=new YE(U,Ze),y=new Wg(U,Ze,e,le),m=new VE(U,Ze),y.reversedDepthBuffer&&u&&m.buffers.depth.setReversed(!0),k=U.createFramebuffer(),Y=U.createFramebuffer(),G=U.createFramebuffer(),P=new im(U),O=new IE,W=new zE(U,Ze,m,O,y,le,P),ne=new $g(I),re=new od(U),de=new zg(U,re),J=new tm(U,re,P,de),X=new rm(U,J,re,de,P),R=new sm(U,y,W),ye=new Jg(O),ae=new CE(I,ne,Ze,y,de,ye),ve=new qE(I,O),ce=new DE,oe=new GE(Ze),Fe=new Vg(I,ne,m,X,g,l),Ie=new kE(I,X,y),j=new jE(U,P,y,m),ie=new Yg(U,Ze,P),K=new nm(U,Ze,P),P.programs=ae.programs,I.capabilities=y,I.extensions=Ze,I.properties=O,I.renderLists=ce,I.shadowMap=Ie,I.state=m,I.info=P}_e(),M!==Yt&&(v=new om(M,t.width,t.height,o,s,r));const Be=new XE(I,U);this.xr=Be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const _=Ze.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=Ze.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(_){_!==void 0&&(te=_,this.setSize(Z,se,!1))},this.getSize=function(_){return _.set(Z,se)},this.setSize=function(_,F,H=!0){if(Be.isPresenting){Me("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=_,se=F,t.width=Math.floor(_*te),t.height=Math.floor(F*te),H===!0&&(t.style.width=_+"px",t.style.height=F+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,_,F)},this.getDrawingBufferSize=function(_){return _.set(Z*te,se*te).floor()},this.setDrawingBufferSize=function(_,F,H){Z=_,se=F,te=H,t.width=Math.floor(_*H),t.height=Math.floor(F*H),this.setViewport(0,0,_,F)},this.setEffects=function(_){if(M===Yt){be("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let F=0;F<_.length;F++)if(_[F].isOutputPass===!0){Me("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(pe)},this.getViewport=function(_){return _.copy(Ce)},this.setViewport=function(_,F,H,L){_.isVector4?Ce.set(_.x,_.y,_.z,_.w):Ce.set(_,F,H,L),m.viewport(pe.copy(Ce).multiplyScalar(te).round())},this.getScissor=function(_){return _.copy(ft)},this.setScissor=function(_,F,H,L){_.isVector4?ft.set(_.x,_.y,_.z,_.w):ft.set(_,F,H,L),m.scissor(Ee.copy(ft).multiplyScalar(te).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(_){m.setScissorTest(ke=_)},this.setOpaqueSort=function(_){De=_},this.setTransparentSort=function(_){Ue=_},this.getClearColor=function(_){return _.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(_=!0,F=!0,H=!0){let L=0;if(_){let N=!1;if(q!==null){const Ae=q.texture.format;N=p.has(Ae)}if(N){const Ae=q.texture.type,me=d.has(Ae),fe=Fe.getClearColor(),xe=Fe.getClearAlpha(),Se=fe.r,Pe=fe.g,He=fe.b;me?(x[0]=Se,x[1]=Pe,x[2]=He,x[3]=xe,U.clearBufferuiv(U.COLOR,0,x)):(w[0]=Se,w[1]=Pe,w[2]=He,w[3]=xe,U.clearBufferiv(U.COLOR,0,w))}else L|=U.COLOR_BUFFER_BIT}F&&(L|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(L|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L!==0&&U.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),T=_},this.dispose=function(){t.removeEventListener("webglcontextlost",ht,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",hn,!1),Fe.dispose(),ce.dispose(),oe.dispose(),O.dispose(),ne.dispose(),X.dispose(),de.dispose(),j.dispose(),ae.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",El),Be.removeEventListener("sessionend",Bl),jn.stop()};function ht(_){_.preventDefault(),Rr("WebGLRenderer: Context Lost."),D=!0}function it(){Rr("WebGLRenderer: Context Restored."),D=!1;const _=P.autoReset,F=Ie.enabled,H=Ie.autoUpdate,L=Ie.needsUpdate,N=Ie.type;_e(),P.autoReset=_,Ie.enabled=F,Ie.autoUpdate=H,Ie.needsUpdate=L,Ie.type=N}function hn(_){be("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function un(_){const F=_.target;F.removeEventListener("dispose",un),ru(F)}function ru(_){au(_),O.remove(_)}function au(_){const F=O.get(_).programs;F!==void 0&&(F.forEach(function(H){ae.releaseProgram(H)}),_.isShaderMaterial&&ae.releaseShaderCache(_))}this.renderBufferDirect=function(_,F,H,L,N,Ae){F===null&&(F=Qt);const me=N.isMesh&&N.matrixWorld.determinantAffine()<0,fe=cu(_,F,H,L,N);m.setMaterial(L,me);let xe=H.index,Se=1;if(L.wireframe===!0){if(xe=J.getWireframeAttribute(H),xe===void 0)return;Se=2}const Pe=H.drawRange,He=H.attributes.position;let Qe=Pe.start*Se,qe=(Pe.start+Pe.count)*Se;Ae!==null&&(Qe=Math.max(Qe,Ae.start*Se),qe=Math.min(qe,(Ae.start+Ae.count)*Se)),xe!==null?(Qe=Math.max(Qe,0),qe=Math.min(qe,xe.count)):He!=null&&(Qe=Math.max(Qe,0),qe=Math.min(qe,He.count));const At=qe-Qe;if(At<0||At===1/0)return;de.setup(N,L,fe,H,xe);let ut,tt=ie;if(xe!==null&&(ut=re.get(xe),tt=K,tt.setIndex(ut)),N.isMesh)L.wireframe===!0?(m.setLineWidth(L.wireframeLinewidth*gt()),tt.setMode(U.LINES)):tt.setMode(U.TRIANGLES);else if(N.isLine){let yt=L.linewidth;yt===void 0&&(yt=1),m.setLineWidth(yt*gt()),N.isLineSegments?tt.setMode(U.LINES):N.isLineLoop?tt.setMode(U.LINE_LOOP):tt.setMode(U.LINE_STRIP)}else N.isPoints?tt.setMode(U.POINTS):N.isSprite&&tt.setMode(U.TRIANGLES);if(N.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))tt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const yt=N._multiDrawStarts,ge=N._multiDrawCounts,Ot=N._multiDrawCount,Ye=xe?re.get(xe).bytesPerElement:1,Zt=O.get(L).currentProgram.getUniforms();for(let fn=0;fn<Ot;fn++)Zt.setValue(U,"_gl_DrawID",fn),tt.render(yt[fn]/Ye,ge[fn])}else if(N.isInstancedMesh)tt.renderInstances(Qe,At,N.count);else if(H.isInstancedBufferGeometry){const yt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ge=Math.min(H.instanceCount,yt);tt.renderInstances(Qe,At,ge)}else tt.render(Qe,At)};function ml(_,F,H){_.transparent===!0&&_.side===Cn&&_.forceSinglePass===!1?(_.side=Pt,_.needsUpdate=!0,Rs(_,F,H),_.side=Jn,_.needsUpdate=!0,Rs(_,F,H),_.side=Cn):Rs(_,F,H)}this.compile=function(_,F,H=null){H===null&&(H=_),S=oe.get(H),S.init(F),E.push(S),H.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(S.pushLight(N),N.castShadow&&S.pushShadow(N))}),_!==H&&_.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(S.pushLight(N),N.castShadow&&S.pushShadow(N))}),S.setupLights();const L=new Set;return _.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const Ae=N.material;if(Ae)if(Array.isArray(Ae))for(let me=0;me<Ae.length;me++){const fe=Ae[me];ml(fe,H,N),L.add(fe)}else ml(Ae,H,N),L.add(Ae)}),S=E.pop(),L},this.compileAsync=function(_,F,H=null){const L=this.compile(_,F,H);return new Promise(N=>{function Ae(){if(L.forEach(function(me){O.get(me).currentProgram.isReady()&&L.delete(me)}),L.size===0){N(_);return}setTimeout(Ae,10)}Ze.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let Yr=null;function ou(_){Yr&&Yr(_)}function El(){jn.stop()}function Bl(){jn.start()}const jn=new Zh;jn.setAnimationLoop(ou),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(_){Yr=_,Be.setAnimationLoop(_),_===null?jn.stop():jn.start()},Be.addEventListener("sessionstart",El),Be.addEventListener("sessionend",Bl),this.render=function(_,F){if(F!==void 0&&F.isCamera!==!0){be("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;T!==null&&T.renderStart(_,F);const H=Be.enabled===!0&&Be.isPresenting===!0,L=v!==null&&(q===null||H)&&v.begin(I,q);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(F),F=Be.getCamera()),_.isScene===!0&&_.onBeforeRender(I,_,F,q),S=oe.get(_,E.length),S.init(F),S.state.textureUnits=W.getTextureUnits(),E.push(S),pt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),et.setFromProjectionMatrix(pt,ln,F.reversedDepth),ze=this.localClippingEnabled,Ke=ye.init(this.clippingPlanes,ze),Q=ce.get(_,C.length),Q.init(),C.push(Q),Be.enabled===!0&&Be.isPresenting===!0){const me=I.xr.getDepthSensingMesh();me!==null&&Wr(me,F,-1/0,I.sortObjects)}Wr(_,F,0,I.sortObjects),Q.finish(),I.sortObjects===!0&&Q.sort(De,Ue,F.reversedDepth),ct=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,ct&&Fe.addToRenderList(Q,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&ye.beginShadows();const N=S.state.shadowsArray;if(Ie.render(N,_,F),Ke===!0&&ye.endShadows(),(L&&v.hasRenderPass())===!1){const me=Q.opaque,fe=Q.transmissive;if(S.setupLights(),F.isArrayCamera){const xe=F.cameras;if(fe.length>0)for(let Se=0,Pe=xe.length;Se<Pe;Se++){const He=xe[Se];xl(me,fe,_,He)}ct&&Fe.render(_);for(let Se=0,Pe=xe.length;Se<Pe;Se++){const He=xe[Se];Ml(Q,_,He,He.viewport)}}else fe.length>0&&xl(me,fe,_,F),ct&&Fe.render(_),Ml(Q,_,F)}q!==null&&V===0&&(W.updateMultisampleRenderTarget(q),W.updateRenderTargetMipmap(q)),L&&v.end(I),_.isScene===!0&&_.onAfterRender(I,_,F),de.resetDefaultState(),$=-1,ue=null,E.pop(),E.length>0?(S=E[E.length-1],W.setTextureUnits(S.state.textureUnits),Ke===!0&&ye.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?Q=C[C.length-1]:Q=null,T!==null&&T.renderEnd()};function Wr(_,F,H,L){if(_.visible===!1)return;if(_.layers.test(F.layers)){if(_.isGroup)H=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(F);else if(_.isLightProbeGrid)S.pushLightProbeGrid(_);else if(_.isLight)S.pushLight(_),_.castShadow&&S.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||et.intersectsSprite(_)){L&&wt.setFromMatrixPosition(_.matrixWorld).applyMatrix4(pt);const me=X.update(_),fe=_.material;fe.visible&&Q.push(_,me,fe,H,wt.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||et.intersectsObject(_))){const me=X.update(_),fe=_.material;if(L&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),wt.copy(_.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),wt.copy(me.boundingSphere.center)),wt.applyMatrix4(_.matrixWorld).applyMatrix4(pt)),Array.isArray(fe)){const xe=me.groups;for(let Se=0,Pe=xe.length;Se<Pe;Se++){const He=xe[Se],Qe=fe[He.materialIndex];Qe&&Qe.visible&&Q.push(_,me,Qe,H,wt.z,He)}}else fe.visible&&Q.push(_,me,fe,H,wt.z,null)}}const Ae=_.children;for(let me=0,fe=Ae.length;me<fe;me++)Wr(Ae[me],F,H,L)}function Ml(_,F,H,L){const{opaque:N,transmissive:Ae,transparent:me}=_;S.setupLightsView(H),Ke===!0&&ye.setGlobalState(I.clippingPlanes,H),L&&m.viewport(pe.copy(L)),N.length>0&&Ds(N,F,H),Ae.length>0&&Ds(Ae,F,H),me.length>0&&Ds(me,F,H),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function xl(_,F,H,L){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[L.id]===void 0){const Qe=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[L.id]=new Lt(1,1,{generateMipmaps:!0,type:Qe?Jt:Yt,minFilter:ai,samples:Math.max(4,y.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace})}const Ae=S.state.transmissionRenderTarget[L.id],me=L.viewport||pe;Ae.setSize(me.z*I.transmissionResolutionScale,me.w*I.transmissionResolutionScale);const fe=I.getRenderTarget(),xe=I.getActiveCubeFace(),Se=I.getActiveMipmapLevel();I.setRenderTarget(Ae),I.getClearColor(lt),Je=I.getClearAlpha(),Je<1&&I.setClearColor(16777215,.5),I.clear(),ct&&Fe.render(H);const Pe=I.toneMapping;I.toneMapping=En;const He=L.viewport;if(L.viewport!==void 0&&(L.viewport=void 0),S.setupLightsView(L),Ke===!0&&ye.setGlobalState(I.clippingPlanes,L),Ds(_,H,L),W.updateMultisampleRenderTarget(Ae),W.updateRenderTargetMipmap(Ae),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let qe=0,At=F.length;qe<At;qe++){const ut=F[qe],{object:tt,geometry:yt,material:ge,group:Ot}=ut;if(ge.side===Cn&&tt.layers.test(L.layers)){const Ye=ge.side;ge.side=Pt,ge.needsUpdate=!0,_l(tt,H,L,yt,ge,Ot),ge.side=Ye,ge.needsUpdate=!0,Qe=!0}}Qe===!0&&(W.updateMultisampleRenderTarget(Ae),W.updateRenderTargetMipmap(Ae))}I.setRenderTarget(fe,xe,Se),I.setClearColor(lt,Je),He!==void 0&&(L.viewport=He),I.toneMapping=Pe}function Ds(_,F,H){const L=F.isScene===!0?F.overrideMaterial:null;for(let N=0,Ae=_.length;N<Ae;N++){const me=_[N],{object:fe,geometry:xe,group:Se}=me;let Pe=me.material;Pe.allowOverride===!0&&L!==null&&(Pe=L),fe.layers.test(H.layers)&&_l(fe,F,H,xe,Pe,Se)}}function _l(_,F,H,L,N,Ae){_.onBeforeRender(I,F,H,L,N,Ae),_.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),N.onBeforeRender(I,F,H,L,_,Ae),N.transparent===!0&&N.side===Cn&&N.forceSinglePass===!1?(N.side=Pt,N.needsUpdate=!0,I.renderBufferDirect(H,F,L,N,_,Ae),N.side=Jn,N.needsUpdate=!0,I.renderBufferDirect(H,F,L,N,_,Ae),N.side=Cn):I.renderBufferDirect(H,F,L,N,_,Ae),_.onAfterRender(I,F,H,L,N,Ae)}function Rs(_,F,H){F.isScene!==!0&&(F=Qt);const L=O.get(_),N=S.state.lights,Ae=S.state.shadowsArray,me=N.state.version,fe=ae.getParameters(_,N.state,Ae,F,H,S.state.lightProbeGridArray),xe=ae.getProgramCacheKey(fe);let Se=L.programs;L.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?F.environment:null,L.fog=F.fog;const Pe=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;L.envMap=ne.get(_.envMap||L.environment,Pe),L.envMapRotation=L.environment!==null&&_.envMap===null?F.environmentRotation:_.envMapRotation,Se===void 0&&(_.addEventListener("dispose",un),Se=new Map,L.programs=Se);let He=Se.get(xe);if(He!==void 0){if(L.currentProgram===He&&L.lightsStateVersion===me)return vl(_,fe),He}else fe.uniforms=ae.getUniforms(_),T!==null&&_.isNodeMaterial&&T.build(_,H,fe),_.onBeforeCompile(fe,I),He=ae.acquireProgram(fe,xe),Se.set(xe,He),L.uniforms=fe.uniforms;const Qe=L.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Qe.clippingPlanes=ye.uniform),vl(_,fe),L.needsLights=uu(_),L.lightsStateVersion=me,L.needsLights&&(Qe.ambientLightColor.value=N.state.ambient,Qe.lightProbe.value=N.state.probe,Qe.directionalLights.value=N.state.directional,Qe.directionalLightShadows.value=N.state.directionalShadow,Qe.spotLights.value=N.state.spot,Qe.spotLightShadows.value=N.state.spotShadow,Qe.rectAreaLights.value=N.state.rectArea,Qe.ltc_1.value=N.state.rectAreaLTC1,Qe.ltc_2.value=N.state.rectAreaLTC2,Qe.pointLights.value=N.state.point,Qe.pointLightShadows.value=N.state.pointShadow,Qe.hemisphereLights.value=N.state.hemi,Qe.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Qe.spotLightMatrix.value=N.state.spotLightMatrix,Qe.spotLightMap.value=N.state.spotLightMap,Qe.pointShadowMatrix.value=N.state.pointShadowMatrix),L.lightProbeGrid=S.state.lightProbeGridArray.length>0,L.currentProgram=He,L.uniformsList=null,He}function wl(_){if(_.uniformsList===null){const F=_.currentProgram.getUniforms();_.uniformsList=vr.seqWithValue(F.seq,_.uniforms)}return _.uniformsList}function vl(_,F){const H=O.get(_);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function lu(_,F){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;B.setFromMatrixPosition(F.matrixWorld);for(let H=0,L=_.length;H<L;H++){const N=_[H];if(N.texture!==null&&N.boundingBox.containsPoint(B))return N}return null}function cu(_,F,H,L,N){F.isScene!==!0&&(F=Qt),W.resetTextureUnits();const Ae=F.fog,me=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?F.environment:null,fe=q===null?I.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ve.workingColorSpace,xe=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap,Se=ne.get(L.envMap||me,xe),Pe=L.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,He=!!H.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),Qe=!!H.morphAttributes.position,qe=!!H.morphAttributes.normal,At=!!H.morphAttributes.color;let ut=En;L.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(ut=I.toneMapping);const tt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,yt=tt!==void 0?tt.length:0,ge=O.get(L),Ot=S.state.lights;if(Ke===!0&&(ze===!0||_!==ue)){const st=_===ue&&L.id===$;ye.setState(L,_,st)}let Ye=!1;L.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==Ot.state.version||ge.outputColorSpace!==fe||N.isBatchedMesh&&ge.batching===!1||!N.isBatchedMesh&&ge.batching===!0||N.isBatchedMesh&&ge.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&ge.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&ge.instancing===!1||!N.isInstancedMesh&&ge.instancing===!0||N.isSkinnedMesh&&ge.skinning===!1||!N.isSkinnedMesh&&ge.skinning===!0||N.isInstancedMesh&&ge.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&ge.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&ge.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&ge.instancingMorph===!1&&N.morphTexture!==null||ge.envMap!==Se||L.fog===!0&&ge.fog!==Ae||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==ye.numPlanes||ge.numIntersection!==ye.numIntersection)||ge.vertexAlphas!==Pe||ge.vertexTangents!==He||ge.morphTargets!==Qe||ge.morphNormals!==qe||ge.morphColors!==At||ge.toneMapping!==ut||ge.morphTargetsCount!==yt||!!ge.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,ge.__version=L.version);let Zt=ge.currentProgram;Ye===!0&&(Zt=Rs(L,F,N),T&&L.isNodeMaterial&&T.onUpdateProgram(L,Zt,ge));let fn=!1,Fn=!1,Ai=!1;const nt=Zt.getUniforms(),dt=ge.uniforms;if(m.useProgram(Zt.program)&&(fn=!0,Fn=!0,Ai=!0),L.id!==$&&($=L.id,Fn=!0),ge.needsLights){const st=lu(S.state.lightProbeGridArray,N);ge.lightProbeGrid!==st&&(ge.lightProbeGrid=st,Fn=!0)}if(fn||ue!==_){m.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),nt.setValue(U,"projectionMatrix",_.projectionMatrix),nt.setValue(U,"viewMatrix",_.matrixWorldInverse);const Gn=nt.map.cameraPosition;Gn!==void 0&&Gn.setValue(U,Bt.setFromMatrixPosition(_.matrixWorld)),y.logarithmicDepthBuffer&&nt.setValue(U,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&nt.setValue(U,"isOrthographic",_.isOrthographicCamera===!0),ue!==_&&(ue=_,Fn=!0,Ai=!0)}if(ge.needsLights&&(Ot.state.directionalShadowMap.length>0&&nt.setValue(U,"directionalShadowMap",Ot.state.directionalShadowMap,W),Ot.state.spotShadowMap.length>0&&nt.setValue(U,"spotShadowMap",Ot.state.spotShadowMap,W),Ot.state.pointShadowMap.length>0&&nt.setValue(U,"pointShadowMap",Ot.state.pointShadowMap,W)),N.isSkinnedMesh){nt.setOptional(U,N,"bindMatrix"),nt.setOptional(U,N,"bindMatrixInverse");const st=N.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),nt.setValue(U,"boneTexture",st.boneTexture,W))}N.isBatchedMesh&&(nt.setOptional(U,N,"batchingTexture"),nt.setValue(U,"batchingTexture",N._matricesTexture,W),nt.setOptional(U,N,"batchingIdTexture"),nt.setValue(U,"batchingIdTexture",N._indirectTexture,W),nt.setOptional(U,N,"batchingColorTexture"),N._colorsTexture!==null&&nt.setValue(U,"batchingColorTexture",N._colorsTexture,W));const Pn=H.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&R.update(N,H,Zt),(Fn||ge.receiveShadow!==N.receiveShadow)&&(ge.receiveShadow=N.receiveShadow,nt.setValue(U,"receiveShadow",N.receiveShadow)),(L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial)&&L.envMap===null&&F.environment!==null&&(dt.envMapIntensity.value=F.environmentIntensity),dt.dfgLUT!==void 0&&(dt.dfgLUT.value=e0()),Fn){if(nt.setValue(U,"toneMappingExposure",I.toneMappingExposure),ge.needsLights&&hu(dt,Ai),Ae&&L.fog===!0&&ve.refreshFogUniforms(dt,Ae),ve.refreshMaterialUniforms(dt,L,te,se,S.state.transmissionRenderTarget[_.id]),ge.needsLights&&ge.lightProbeGrid){const st=ge.lightProbeGrid;dt.probesSH.value=st.texture,dt.probesMin.value.copy(st.boundingBox.min),dt.probesMax.value.copy(st.boundingBox.max),dt.probesResolution.value.copy(st.resolution)}vr.upload(U,wl(ge),dt,W)}if(L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(vr.upload(U,wl(ge),dt,W),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&nt.setValue(U,"center",N.center),nt.setValue(U,"modelViewMatrix",N.modelViewMatrix),nt.setValue(U,"normalMatrix",N.normalMatrix),nt.setValue(U,"modelMatrix",N.matrixWorld),L.uniformsGroups!==void 0){const st=L.uniformsGroups;for(let Gn=0,di=st.length;Gn<di;Gn++){const Sl=st[Gn];j.update(Sl,Zt),j.bind(Sl,Zt)}}return Zt}function hu(_,F){_.ambientLightColor.needsUpdate=F,_.lightProbe.needsUpdate=F,_.directionalLights.needsUpdate=F,_.directionalLightShadows.needsUpdate=F,_.pointLights.needsUpdate=F,_.pointLightShadows.needsUpdate=F,_.spotLights.needsUpdate=F,_.spotLightShadows.needsUpdate=F,_.rectAreaLights.needsUpdate=F,_.hemisphereLights.needsUpdate=F}function uu(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(_,F,H){const L=O.get(_);L.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,L.__autoAllocateDepthBuffer===!1&&(L.__useRenderToTexture=!1),O.get(_.texture).__webglTexture=F,O.get(_.depthTexture).__webglTexture=L.__autoAllocateDepthBuffer?void 0:H,L.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,F){const H=O.get(_);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(_,F=0,H=0){q=_,z=F,V=H;let L=null,N=!1,Ae=!1;if(_){const fe=O.get(_);if(fe.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(U.FRAMEBUFFER,fe.__webglFramebuffer),pe.copy(_.viewport),Ee.copy(_.scissor),We=_.scissorTest,m.viewport(pe),m.scissor(Ee),m.setScissorTest(We),$=-1;return}else if(fe.__webglFramebuffer===void 0)W.setupRenderTarget(_);else if(fe.__hasExternalTextures)W.rebindTextures(_,O.get(_.texture).__webglTexture,O.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){const Pe=_.depthTexture;if(fe.__boundDepthTexture!==Pe){if(Pe!==null&&O.has(Pe)&&(_.width!==Pe.image.width||_.height!==Pe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(_)}}const xe=_.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(Ae=!0);const Se=O.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Se[F])?L=Se[F][H]:L=Se[F],N=!0):_.samples>0&&W.useMultisampledRTT(_)===!1?L=O.get(_).__webglMultisampledFramebuffer:Array.isArray(Se)?L=Se[H]:L=Se,pe.copy(_.viewport),Ee.copy(_.scissor),We=_.scissorTest}else pe.copy(Ce).multiplyScalar(te).floor(),Ee.copy(ft).multiplyScalar(te).floor(),We=ke;if(H!==0&&(L=k),m.bindFramebuffer(U.FRAMEBUFFER,L)&&m.drawBuffers(_,L),m.viewport(pe),m.scissor(Ee),m.setScissorTest(We),N){const fe=O.get(_.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,fe.__webglTexture,H)}else if(Ae){const fe=F;for(let xe=0;xe<_.textures.length;xe++){const Se=O.get(_.textures[xe]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+xe,Se.__webglTexture,H,fe)}}else if(_!==null&&H!==0){const fe=O.get(_.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fe.__webglTexture,H)}$=-1},this.readRenderTargetPixels=function(_,F,H,L,N,Ae,me,fe=0){if(!(_&&_.isWebGLRenderTarget)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=O.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe){m.bindFramebuffer(U.FRAMEBUFFER,xe);try{const Se=_.textures[fe],Pe=Se.format,He=Se.type;if(_.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe),!y.textureFormatReadable(Pe)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!y.textureTypeReadable(He)){be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=_.width-L&&H>=0&&H<=_.height-N&&U.readPixels(F,H,L,N,le.convert(Pe),le.convert(He),Ae)}finally{const Se=q!==null?O.get(q).__webglFramebuffer:null;m.bindFramebuffer(U.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(_,F,H,L,N,Ae,me,fe=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=O.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe)if(F>=0&&F<=_.width-L&&H>=0&&H<=_.height-N){m.bindFramebuffer(U.FRAMEBUFFER,xe);const Se=_.textures[fe],Pe=Se.format,He=Se.type;if(_.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+fe),!y.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!y.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.bufferData(U.PIXEL_PACK_BUFFER,Ae.byteLength,U.STREAM_READ),U.readPixels(F,H,L,N,le.convert(Pe),le.convert(He),0);const qe=q!==null?O.get(q).__webglFramebuffer:null;m.bindFramebuffer(U.FRAMEBUFFER,qe);const At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Xu(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ae),U.deleteBuffer(Qe),U.deleteSync(At),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,F=null,H=0){const L=Math.pow(2,-H),N=Math.floor(_.image.width*L),Ae=Math.floor(_.image.height*L),me=F!==null?F.x:0,fe=F!==null?F.y:0;W.setTexture2D(_,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,me,fe,N,Ae),m.unbindTexture()},this.copyTextureToTexture=function(_,F,H=null,L=null,N=0,Ae=0){let me,fe,xe,Se,Pe,He,Qe,qe,At;const ut=_.isCompressedTexture?_.mipmaps[Ae]:_.image;if(H!==null)me=H.max.x-H.min.x,fe=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,Se=H.min.x,Pe=H.min.y,He=H.isBox3?H.min.z:0;else{const dt=Math.pow(2,-N);me=Math.floor(ut.width*dt),fe=Math.floor(ut.height*dt),_.isDataArrayTexture?xe=ut.depth:_.isData3DTexture?xe=Math.floor(ut.depth*dt):xe=1,Se=0,Pe=0,He=0}L!==null?(Qe=L.x,qe=L.y,At=L.z):(Qe=0,qe=0,At=0);const tt=le.convert(F.format),yt=le.convert(F.type);let ge;F.isData3DTexture?(W.setTexture3D(F,0),ge=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(W.setTexture2DArray(F,0),ge=U.TEXTURE_2D_ARRAY):(W.setTexture2D(F,0),ge=U.TEXTURE_2D),m.activeTexture(U.TEXTURE0),m.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),m.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),m.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Ot=m.getParameter(U.UNPACK_ROW_LENGTH),Ye=m.getParameter(U.UNPACK_IMAGE_HEIGHT),Zt=m.getParameter(U.UNPACK_SKIP_PIXELS),fn=m.getParameter(U.UNPACK_SKIP_ROWS),Fn=m.getParameter(U.UNPACK_SKIP_IMAGES);m.pixelStorei(U.UNPACK_ROW_LENGTH,ut.width),m.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ut.height),m.pixelStorei(U.UNPACK_SKIP_PIXELS,Se),m.pixelStorei(U.UNPACK_SKIP_ROWS,Pe),m.pixelStorei(U.UNPACK_SKIP_IMAGES,He);const Ai=_.isDataArrayTexture||_.isData3DTexture,nt=F.isDataArrayTexture||F.isData3DTexture;if(_.isDepthTexture){const dt=O.get(_),Pn=O.get(F),st=O.get(dt.__renderTarget),Gn=O.get(Pn.__renderTarget);m.bindFramebuffer(U.READ_FRAMEBUFFER,st.__webglFramebuffer),m.bindFramebuffer(U.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let di=0;di<xe;di++)Ai&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,O.get(_).__webglTexture,N,He+di),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,O.get(F).__webglTexture,Ae,At+di)),U.blitFramebuffer(Se,Pe,me,fe,Qe,qe,me,fe,U.DEPTH_BUFFER_BIT,U.NEAREST);m.bindFramebuffer(U.READ_FRAMEBUFFER,null),m.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(N!==0||_.isRenderTargetTexture||O.has(_)){const dt=O.get(_),Pn=O.get(F);m.bindFramebuffer(U.READ_FRAMEBUFFER,Y),m.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let st=0;st<xe;st++)Ai?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,dt.__webglTexture,N,He+st):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,dt.__webglTexture,N),nt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pn.__webglTexture,Ae,At+st):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pn.__webglTexture,Ae),N!==0?U.blitFramebuffer(Se,Pe,me,fe,Qe,qe,me,fe,U.COLOR_BUFFER_BIT,U.NEAREST):nt?U.copyTexSubImage3D(ge,Ae,Qe,qe,At+st,Se,Pe,me,fe):U.copyTexSubImage2D(ge,Ae,Qe,qe,Se,Pe,me,fe);m.bindFramebuffer(U.READ_FRAMEBUFFER,null),m.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else nt?_.isDataTexture||_.isData3DTexture?U.texSubImage3D(ge,Ae,Qe,qe,At,me,fe,xe,tt,yt,ut.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(ge,Ae,Qe,qe,At,me,fe,xe,tt,ut.data):U.texSubImage3D(ge,Ae,Qe,qe,At,me,fe,xe,tt,yt,ut):_.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ae,Qe,qe,me,fe,tt,yt,ut.data):_.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ae,Qe,qe,ut.width,ut.height,tt,ut.data):U.texSubImage2D(U.TEXTURE_2D,Ae,Qe,qe,me,fe,tt,yt,ut);m.pixelStorei(U.UNPACK_ROW_LENGTH,Ot),m.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ye),m.pixelStorei(U.UNPACK_SKIP_PIXELS,Zt),m.pixelStorei(U.UNPACK_SKIP_ROWS,fn),m.pixelStorei(U.UNPACK_SKIP_IMAGES,Fn),Ae===0&&F.generateMipmaps&&U.generateMipmap(ge),m.unbindTexture()},this.initRenderTarget=function(_){O.get(_).__webglFramebuffer===void 0&&W.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?W.setTextureCube(_,0):_.isData3DTexture?W.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?W.setTexture2DArray(_,0):W.setTexture2D(_,0),m.unbindTexture()},this.resetState=function(){z=0,V=0,q=null,m.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}class lM extends yf{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new qn;e.deleteAttribute("uv");const t=new Do({side:Pt}),n=new Do,s=new zA(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Et(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Or(e,n,6),o=new rt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Et(e,Fi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Et(e,Fi(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Et(e,Fi(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const A=new Et(e,Fi(43));A.position.set(-.462,8.89,14.52),A.scale.set(4.38,5.441,.088),this.add(A);const u=new Et(e,Fi(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new Et(e,Fi(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Fi(i){return new QA({color:0,emissive:16777215,emissiveIntensity:i})}const hs=new b;function jt(i,e,t,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;hs.copy(e),hs[n]=0,hs.normalize();const c=.5*a/(a+o),h=1-hs.angleTo(i)/l;return Math.sign(hs[t])===1?h*c:o/(a+o)+c+c*(1-h)}class hl extends qn{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new b,c=new b,h=new b(e,t,n).divideScalar(2).subScalar(r),A=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=A.length/6,M=new b,p=.5/a;for(let d=0,x=0;d<A.length;d+=3,x+=2)switch(l.fromArray(A,d),c.copy(l),c.x-=Math.sign(c.x)*p,c.y-=Math.sign(c.y)*p,c.z-=Math.sign(c.z)*p,c.normalize(),A[d+0]=h.x*Math.sign(l.x)+c.x*r,A[d+1]=h.y*Math.sign(l.y)+c.y*r,A[d+2]=h.z*Math.sign(l.z)+c.z*r,u[d+0]=c.x,u[d+1]=c.y,u[d+2]=c.z,Math.floor(d/g)){case 0:M.set(1,0,0),f[x+0]=jt(M,c,"z","y",r,n),f[x+1]=1-jt(M,c,"y","z",r,t);break;case 1:M.set(-1,0,0),f[x+0]=1-jt(M,c,"z","y",r,n),f[x+1]=1-jt(M,c,"y","z",r,t);break;case 2:M.set(0,1,0),f[x+0]=1-jt(M,c,"x","z",r,e),f[x+1]=jt(M,c,"z","x",r,n);break;case 3:M.set(0,-1,0),f[x+0]=1-jt(M,c,"x","z",r,e),f[x+1]=1-jt(M,c,"z","x",r,n);break;case 4:M.set(0,0,1),f[x+0]=1-jt(M,c,"x","y",r,e),f[x+1]=1-jt(M,c,"y","x",r,t);break;case 5:M.set(0,0,-1),f[x+0]=jt(M,c,"x","y",r,e),f[x+1]=1-jt(M,c,"y","x",r,t);break}}static fromJSON(e){return new hl(e.width,e.height,e.depth,e.segments,e.radius)}}const Sr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Zi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const t0=new kr(-1,1,1,-1,0,1);class n0 extends at{constructor(){super(),this.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Te([0,2,0,0,2,0],2))}}const i0=new n0;class ul{constructor(e){this._mesh=new Et(i0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,t0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class s0 extends Zi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ys.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ul(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class eh extends Zi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class r0 extends Zi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class cM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ee);this._width=n.width,this._height=n.height,t=new Lt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new s0(Sr),this.copyPass.material.blending=mn,this.timer=new XA}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}eh!==void 0&&(a instanceof eh?n=!0:a instanceof r0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ee);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const mr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class hM extends Zi{constructor(){super(),this.isOutputPass=!0,this.uniforms=ys.clone(mr.uniforms),this.material=new Wh({name:mr.name,uniforms:this.uniforms,vertexShader:mr.vertexShader,fragmentShader:mr.fragmentShader}),this._fsQuad=new ul(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ve.getTransfer(this._outputColorSpace)===Xe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Uo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Po?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Go?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===No?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Oo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class uM extends Zi{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new we}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const a0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new we(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Cs extends Zi{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ee(e.x,e.y):new ee(256,256),this.clearColor=new we(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Lt(r,a,{type:Jt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const A=new Lt(r,a,{type:Jt});A.texture.name="UnrealBloomPass.h"+h,A.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(A);const u=new Lt(r,a,{type:Jt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=a0;this.highPassUniforms=ys.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Dt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ee(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ys.clone(Sr.uniforms),this.blendMaterial=new Dt({uniforms:this.copyUniforms,vertexShader:Sr.vertexShader,fragmentShader:Sr.fragmentShader,premultipliedAlpha:!0,blending:Pa,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new we,this._oldClearAlpha=1,this._basic=new jo,this._fsQuad=new ul(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ee(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Cs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Cs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);return new Dt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ee(.5,.5)},direction:{value:new ee(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Dt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Cs.BlurDirectionX=new ee(1,0);Cs.BlurDirectionY=new ee(0,1);const o0=["face-readability","torso-jacket-separation","limb-silhouette","backpack-signal","combat-pose-readability"],Xt=.058,on=.98,l0=new b(1.065,1.035,1.065),c0=new b(1.035,1,1.035);function Tt(i,e,t,n,s){const r=[],a=t-(i-1)*Xt/2;for(let o=0;o<e;o+=1)for(let l=0;l<i;l+=1)r.push([a+l*Xt,n+o*Xt,s]);return r}function h0(){const i=[];for(let e=0;e<8;e+=1){const t=e===0||e===7?4:5;for(let n=-t;n<=t;n+=1)i.push([n*Xt,.43+e*Xt,on])}return i}function th(i){const e=[];for(let t=0;t<21;t+=1){const n=(1-t/20)*.08,s=i*(.39+n);for(let r=-1;r<=1;r+=1)e.push([s+r*Xt,-.86+t*Xt,.52])}return e}function u0(){const i=[];for(let e=0;e<14;e+=1){const t=e>10?4:5;for(let n=-t;n<=t;n+=1)i.push([n*Xt,-.02+e*Xt,.55])}return i}function f0(){const i=[],e=[[-.3,4],[-.16,5],[0,3],[.16,5],[.3,4]];for(const[t,n]of e)for(let s=0;s<n;s+=1)i.push([t,.84+s*Xt,on+.055]);return i}const su=[{name:"fram-f02-face-skin-plane",part:"head",material:"skin",cells:h0()},{name:"fram-f02-left-eye-cells",groupName:"fram-f02-left-eye",part:"head",material:"eye-dark",cells:Tt(3,4,-.2,.58,on+.055)},{name:"fram-f02-right-eye-cells",groupName:"fram-f02-right-eye",part:"head",material:"eye-dark",cells:Tt(3,4,.2,.58,on+.055)},{name:"fram-f02-left-eye-teal",part:"head",material:"eye-teal",cells:Tt(2,2,-.2,.58,on+.09)},{name:"fram-f02-right-eye-teal",part:"head",material:"eye-teal",cells:Tt(2,2,.2,.58,on+.09)},{name:"fram-f02-eye-highlights",part:"head",material:"highlight",cells:[[-.225,.67,on+.12],[.175,.67,on+.12]]},{name:"fram-f02-mouth",part:"head",material:"coral",cells:Tt(2,1,0,.43,on+.065)},{name:"fram-f02-blush",part:"head",material:"coral",cells:[[-.32,.51,on+.06],[.32,.51,on+.06]]},{name:"fram-f02-fringe",part:"head",material:"ivory",cells:f0()},{name:"fram-f02-inner-suit",part:"torso",material:"near-black",cells:u0()},{name:"fram-f02-coat-left",part:"torso",material:"ivory",cells:th(-1)},{name:"fram-f02-coat-right",part:"torso",material:"warm-gray",cells:th(1)},{name:"fram-f02-collar",part:"torso",material:"warm-gray",cells:Tt(11,3,0,.75,.57)},{name:"fram-f02-chest-signal",groupName:"fram-f02-skill-signal",part:"torso",material:"cyan-signal",cells:Tt(4,3,.27,.51,.61)},{name:"fram-f02-belt-accent",part:"torso",material:"coral",cells:Tt(4,2,-.27,-.13,.59)},{name:"fram-f02-left-glove-read",part:"left-arm",material:"near-black",cells:Tt(4,4,0,-1.18,.25)},{name:"fram-f02-right-glove-read",part:"right-arm",material:"near-black",cells:Tt(4,4,0,-1.18,.25)},{name:"fram-f02-left-cuff-signal",part:"left-arm",material:"cyan",cells:Tt(3,1,0,-.96,.29)},{name:"fram-f02-right-cuff-signal",part:"right-arm",material:"cyan",cells:Tt(3,1,0,-.96,.29)},{name:"fram-f02-backpack-shell",part:"equipment",material:"near-black",cells:Tt(12,13,0,-.48,-.67)},{name:"fram-f02-archive-screen",part:"equipment",material:"cyan",cells:Tt(8,3,0,-.05,-.71)},{name:"fram-f02-backpack-coral-rail",part:"equipment",material:"coral",cells:Tt(2,9,-.39,-.34,-.7)}],A0=su.reduce((i,e)=>i+e.cells.length,0),d0={head:{ivory:"#fff8e8","warm-gray":"#e7e2d6","sage-gray":"#c8c8bc",graphite:"#929990","near-black":"#424a49",skin:"#f3a77f","eye-teal":"#0d555c",coral:"#f26f62",cyan:"#3eeef2"},torso:{ivory:"#f5f0e4","warm-gray":"#d9d5ca","sage-gray":"#9fa69a",graphite:"#3e4646","near-black":"#171d1f",coral:"#f05f50",cyan:"#34e6ee"},"left-arm":{ivory:"#f5f0e4","warm-gray":"#d9d5ca","sage-gray":"#a6ad9f",graphite:"#505857","near-black":"#202628"},"right-arm":{ivory:"#f5f0e4","warm-gray":"#d9d5ca","sage-gray":"#a6ad9f",graphite:"#505857","near-black":"#202628"},equipment:{"near-black":"#202628",graphite:"#4c5554",coral:"#f05f50",cyan:"#34e6ee"}};function fM(i){i.root.userData.f02ModuleIds=o0;const e=new qn(Xt*.9,Xt*.9,Xt*.72),t=p0(),n=new Set(Object.values(t)),s=[],r=new Map,a=new Ne;g0(i.partGroups,n);for(const f of su){const g=f.groupName===void 0?i.partGroups[f.part]:m0(r,i.partGroups[f.part],f.groupName,s),M=new Or(e,t[f.material],f.cells.length);M.name=f.name,M.castShadow=i.castShadow??!0,M.receiveShadow=i.receiveShadow??!0,M.frustumCulled=!1,f.cells.forEach((p,d)=>{a.makeTranslation(p[0],p[1],p[2]),M.setMatrixAt(d,a)}),M.instanceMatrix.needsUpdate=!0,g.add(M),s.push(M)}const o=new Map([...n].map(f=>[f,{color:f.color.clone(),emissive:f.emissive.clone()}])),l=Fa(r,"fram-f02-left-eye"),c=Fa(r,"fram-f02-right-eye"),h=Fa(r,"fram-f02-skill-signal"),A=t["cyan-signal"];let u=!1;return{addedSurfaceCells:A0,applyPose(f){const g=Number.isFinite(f.timeSeconds)?f.timeSeconds:0,M=_s.clamp(Number.isFinite(f.progress)?f.progress??0:0,0,1);i.partGroups.head.scale.multiply(l0),i.partGroups.torso.scale.multiply(c0),i.partGroups["left-arm"].rotation.z-=.075,i.partGroups["right-arm"].rotation.z+=.075;const p=((g+.25)%4.4+4.4)%4.4,d=p<.18?Math.sin(p/.18*Math.PI):0,x=Math.max(.16,1-d*.88);l.scale.set(1,x,1),c.scale.copy(l.scale);let w=0;switch(f.motion){case"windup":i.partGroups.torso.rotation.y-=M*.1,i.partGroups["right-arm"].rotation.x-=M*.22;break;case"hit":{const B=Math.sin(M*Math.PI);i.partGroups.torso.rotation.y+=B*.12,i.partGroups["right-arm"].rotation.x+=B*.34;break}case"recovery":i.partGroups["right-arm"].rotation.x+=(1-M)*.18;break;case"hurt":i.partGroups["left-arm"].rotation.z-=Math.sin(M*Math.PI)*.2,i.partGroups["right-arm"].rotation.z+=Math.sin(M*Math.PI)*.2;break;case"skill":w=Math.sin(M*Math.PI),i.partGroups["left-arm"].rotation.z-=w*.26,i.partGroups["right-arm"].rotation.z+=w*.26;break}h.scale.setScalar(1+w*.42),A.emissiveIntensity=1.15+w*3.1},setTint(f){const g=new we(f);for(const[M,p]of o)M.color.copy(p.color).multiply(g),M.emissive.copy(p.emissive).multiply(g)},setWireframe(f){for(const g of n)g.wireframe=f},dispose(){if(!u){u=!0;for(const f of s)f.removeFromParent();e.dispose();for(const f of n)f.dispose()}}}}function p0(){return{skin:pn("#f3a77f",.54),"eye-dark":pn("#132e32",.36,.08),"eye-teal":pn("#0b6268",.3,.14),highlight:pn("#f2fff9",.38),ivory:pn("#f7f1e5",.68),"warm-gray":pn("#d5d2c8",.7),"near-black":pn("#1a2022",.42,.16),coral:pn("#f06454",.62),cyan:pn("#39e7ed",.3,.18,"#39e7ed",1.15),"cyan-signal":pn("#42f0f3",.22,.2,"#42f0f3",1.15)}}function pn(i,e,t=0,n=0,s=0){return new sl({color:i,roughness:e,metalness:t,emissive:n,emissiveIntensity:s,clearcoat:t>0?.16:.04,clearcoatRoughness:.42})}function g0(i,e){for(const[t,n]of Object.entries(d0))i[t].traverse(s=>{if(!(s instanceof Or))return;const r=s.name.split(":").at(-1),a=r===void 0?void 0:n[r],l=(Array.isArray(s.material)?s.material:[s.material]).map(c=>{if(!(c instanceof sl))return c;const h=c.clone();return a!==void 0&&h.color.set(a),e.add(h),h});s.material=Array.isArray(s.material)?l:l[0]})}function m0(i,e,t,n){const s=i.get(t);if(s!==void 0)return s;const r=new Yn;return r.name=t,e.add(r),i.set(t,r),n.push(r),r}function Fa(i,e){const t=i.get(e);if(t===void 0)throw new Error(`F-02 module group is missing: ${e}`);return t}const E0=1,B0="fram.character.f01.build-sheet-visual-hull-v1",M0="The Archivist / F-01",x0="ai-build-sheet-multiview",_0={width:48,height:92,depth:42,cellSize:.058,surfaceGap:.9},w0={front:{x:170,y:76,width:220,height:440},left:{x:540,y:76,width:220,height:440},back:{x:905,y:76,width:220,height:440},right:{x:1280,y:76,width:220,height:440}},v0={backgroundDistance:21,saturationFloor:.11,sampleRadius:.28},S0={family:"fram-humanoid-compact-v1",headStart:.625,hipHeight:.39,shoulderHeight:.625,armOuterStart:.245,backEquipmentDepth:-.18},Q0=[{id:"ivory",hex:"#e6e4da",surface:"cloth"},{id:"warm-gray",hex:"#c8c6bd",surface:"cloth"},{id:"sage-gray",hex:"#a6a89a",surface:"cloth"},{id:"graphite",hex:"#7f8676",surface:"cloth"},{id:"near-black",hex:"#353b3b",surface:"polymer"},{id:"cyan",hex:"#38e7f0",surface:"emissive"},{id:"coral",hex:"#ef685d",surface:"cloth"},{id:"skin",hex:"#f2b28c",surface:"skin"},{id:"eye-teal",hex:"#174f55",surface:"glass"}],y0={beautySheet:"work/r07_character_depth/fram-r07-character-direction.png",buildSheet:"work/character_forge_f01/fram-f01-production-build-sheet.png",generatedOn:"2026-08-02",generator:"OpenAI image generation plus deterministic multiview visual-hull reconstruction"},C0={schemaVersion:E0,id:B0,displayName:M0,sourceKind:x0,grid:_0,views:w0,segmentation:v0,rig:S0,palette:Q0,provenance:y0},I0=1,b0="fram-f01-surface-pack-v1",D0="fram.character.f01.build-sheet-visual-hull-v1",R0=37990,T0=9454,U0=5,F0=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],P0=["ivory","warm-gray","sage-gray","graphite","near-black","cyan","coral","skin","eye-teal"],G0="c6bb8c640d4dea7026040332ce5e101afcf3d074575c37ae77d60c65064b413a",L0="a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1",N0="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HgwYBQQgDBgFBA8MGQQEEAwZBAQRDBkEBBIMGQQEEwwZBAQUDBkEBBUMGQQEHgwZBQQfDBkFBCAMGQUEFA0TBAQdDRMFBB4NEwUDHw0TBQQgDRMFBBANFAQEEQ0UBAQSDRQEBBMNFAQEFA0UBAQdDRQFBB4NFAUDIA0UBQQPDRUEBBQNFQQEHQ0VBQQeDRUFAyANFQUEDw0WBAQUDRYEBB0NFgUEHg0WBQMgDRYFBA8NFwQEFA0XBAQdDRcFBB4NFwUDIA0XBQQPDRgEAxQNGAQEHQ0YBQMeDRgFAyANGAUEDw0ZBAQQDRkEBBENGQQEEg0ZBAQTDRkEBBQNGQQEHQ0ZBQMeDRkFAx8NGQUEIA0ZBQQUDhMEBB8OEwUEIA4TBQQPDhQEBBAOFAQEEQ4UBAQSDhQEBBMOFAQEFA4UBAQfDhQFBCAOFAUEDw4VBAQUDhUEBB8OFQUEIA4VBQQPDhYEBBQOFgQEHw4WBQQgDhYFBA8OFwQEFA4XBAQfDhcFBCAOFwUEDw4YBAQUDhgEBB8OGAUEIA4YBQQPDhkEBBAOGQQEEQ4ZBAQSDhkEBBMOGQQEFA4ZBAQfDhkFBCAOGQUEDw8TBAQQDxMEBBEPEwQEEg8TBAQTDxMEBBQPEwQEFQ8TBAQeDxMFBB8PEwUEIA8TBQQPDxQEBBUPFAQEHg8UBQQgDxQFBA8PFQQEFQ8VBAQeDxUFBCAPFQUEDw8WBAQVDxYEBB4PFgUEIA8WBQQPDxcEBBUPFwQEHg8XBQQgDxcFBA8PGAQEFQ8YBAQeDxgFBCAPGAUEDw8ZBAQQDxkEBBEPGQQEEg8ZBAQTDxkEBBQPGQQDFQ8ZBAQeDxkFBB8PGQUEIA8ZBQQPEBIEBBAQEgQEERASBAQSEBIEBBMQEgQEFBASBAQVEBIEBB4QEgUDHxASBQMgEBIFBA8QEwQEFRATBAQeEBMFBCAQEwUEDxAUBAQVEBQEBB4QFAUEIBAUBQQPEBUEBBUQFQQEHhAVBQQgEBUFBA8QFgQEFRAWBAQeEBYFBCAQFgUEDxAXBAQVEBcEBB4QFwUEIBAXBQQPEBgEBBUQGAQEHhAYBQQgEBgFBA8QGQQEEBAZBAQREBkEBBIQGQQEExAZBAQUEBkEBBUQGQQEHhAZBQQfEBkFBCAQGQUEEhEIBAQTEQgEBBQRCAQEFREIBAQWEQgEBB0RCAUDDxESBAQQERIEBBEREgQEEhESBAQTERIEBBQREgQEFRESBAQdERIFBB4REgUEHxESBQQgERIFBA8REwQEFRETBAQdERMFBCAREwUEDxEUBAQVERQEBB0RFAUEIBEUBQQPERUEBBURFQQEHREVBQQgERUFBA8RFgQEFREWBAQdERYFBCARFgUEDxEXBAQVERcEBB0RFwUEIBEXBQQPERgEBBURGAQEHREYBQQgERgFBA8RGQQEEBEZBAQRERkEBBIRGQQEExEZBAQUERkEBBURGQQEHREZBQMeERkFBB8RGQUEIBEZBQQSEggEBBMSCAQEFBIIBAQVEggEBBYSCAQEHRIIBQMPEhMEBBASEwQEERITBAQSEhMEBBMSEwQEFBITBAQVEhMEBB0SEwUEHhITBQQfEhMFBCASEwUEDxIUBAQVEhQEBB0SFAUEIBIUBQQPEhUEBBUSFQQEHRIVBQQgEhUFBA8SFgQEFRIWBAQdEhYFBCASFgUEDxIXBAQVEhcEBB0SFwUEIBIXBQQPEhgEBBUSGAQEHRIYBQQgEhgFBA8SGQQEEBIZBAQREhkEBBISGQQEExIZBAQUEhkEBBUSGQQEHRIZBQMeEhkFBB8SGQUEIBIZBQQSEwgGBhMTCAQEFBMIBAQVEwgEBBYTCAQEHRMIBQMSEwkEBBMTCQQEFBMJBAQVEwkEBBYTCQQEHRMJBQQPExMEBBATEwQEERMTBgYSExMGBhMTEwQEFBMTBAQVExMEBB0TEwUEHhMTBQQfExMFBCATEwUEDxMUBAQVExQEBB0TFAUEIBMUBQQPExUEBBUTFQQEHRMVBQQgExUFBA8TFgQEFRMWBAQdExYFBCATFgUEDxMXBAQVExcEBB0TFwUEIBMXBQQPExgEBBUTGAQEHRMYBQQgExgFBA8TGQQEEBMZBAQRExkEBBITGQQEExMZBAQUExkEBBUTGQQDHRMZBQQeExkFBB8TGQUEIBMZBQQSFAgGBhMUCAYGFBQIBAQVFAgEBBYUCAQEHRQIBQQSFAkEBBMUCQQEFBQJBAQVFAkEBBYUCQQEHRQJBQQSFA4EBBMUDgQEFBQOBAQVFA4EBBYUDgQEHRQOBQQPFBAEBBAUEAQEERQQBAQSFBAEBBMUEAQEFBQQBAQVFBAEBB0UEAUEHhQQBQQfFBAFBCAUEAUEDxQTBgYQFBMGBhEUEwYGEhQTBgYTFBMGBhQUEwQEFRQTBAQdFBMFBB4UEwUEHxQTBQQgFBMFBA8UFAQEFRQUBAQdFBQFBCAUFAUEDxQVBAQVFBUEBB0UFQUEIBQVBQQPFBYEBBUUFgQEHRQWBQQgFBYFBA8UFwQEFRQXBAQdFBcFBCAUFwUEDxQYBAQVFBgEBB0UGAUEIBQYBQQPFBkEBBAUGQQEERQZBAQSFBkEBBMUGQQEFBQZBAQVFBkEAx0UGQUEHhQZBQQfFBkFBCAUGQUEEhUIBgYTFQgGBhQVCAQEFRUIBAQWFQgEBB0VCAUEEhUJBAQWFQkEAx0VCQUDEhUKBAQTFQoEBBQVCgQEFRUKBAQWFQoEBB0VCgUEEhUNBgYTFQ0GBhQVDQQEFRUNBAQWFQ0EBB0VDQUDEhUOBAQWFQ4EBB0VDgUEEhUPBAQTFQ8EBBQVDwQEFRUPBAQWFQ8EBB0VDwUEDxUQBgYQFRAGBhEVEAYGFRUQBAQdFRAFBB4VEAUEHxUQBQQgFRAFBA8VEQQEEBURBAQRFREEAxIVEQQEExURBAQUFREEBBUVEQQEHRURBQQeFREFBB8VEQUEIBURBQQPFRIEAxAVEgQEERUSBAMSFRIEBBMVEgQEFBUSBAQVFRIEBB0VEgUDHhUSBQQfFRIFBCAVEgUEDxUTBAQVFRMEBB0VEwUEIBUTBQQPFRQEBBUVFAQEHRUUBQQgFRQFBA8VFQQEFRUVBAQdFRUFBCAVFQUEDxUWBAQVFRYEBB0VFgUEIBUWBQQPFRcEBBUVFwQEHRUXBQQgFRcFBA8VGAQEFRUYBAQdFRgFBCAVGAUEDxUZBAQQFRkEBBEVGQQDEhUZBAQTFRkEBBQVGQQEFRUZBAQdFRkFBB4VGQUEHxUZBQQgFRkFBBIWCAYGExYIBgYUFggGBhUWCAQEFhYIBAQXFggEBBwWCAYGHRYIBQQSFgkEBBcWCQQEHBYJBQQdFgkFBBIWCgQEExYKBAQUFgoEBBUWCgQEFhYKBAQXFgoEBBwWCgUEHRYKBQQSFgwGBhMWDAYGFBYMBgYVFgwEBBYWDAQEFxYMBAQcFgwFBB0WDAUCEhYNBAIXFg0EAxwWDQUCHRYNBQMSFg4EAhcWDgQEHBYOBQIdFg4FBBIWDwQEFhYPBAQXFg8EBBwWDwUEHRYPBQQPFhAGBhAWEAYGERYQBgYVFhAEBBwWEAUE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HkkkAAEfSSQAARNKCQACFEoJAAEVSgkAARZKCQABF0oJAAIYSgkAAxlKCQACGkoJAAIbSgkAAhxKCQABHUoJAAEeSgkAAR9KCQABEUoKAAMSSgoAAiBKCgACIUoKAAEPSgsABBBKCwAEIkoLAAIjSgsAAQ5KDAADJEoMAAINSg0AAiVKDQADDEoOAAEmSg4AAQtKDwABJ0oPAAEKShAAAShKEAADCkoRAAIoShEABAlKEgABKUoSAAEJShMAAilKEwABCUoUAAEpShQAAQlKFQABKUoVAAIJShYAASlKFgACCUoXAAEpShcAAglKGAABKUoYAAIJShkAASlKGQACCUoaAAEpShoAAglKGwABKUobAAIKShwAAyhKHAADCkodAAMoSh0AAwtKHgACJ0oeAAQMSh8AASZKHwACDUogAAMlSiAAAw5KIQABJEohAAEPSiIAARBKIgABIkoiAAIjSiIAARFKIwACEkojAAEgSiMAASFKIwABE0okAAEUSiQAAhVKJAACFkokAAIXSiQAAhhKJAABGUokAAEaSiQAARtKJAAEHEokAAQdSiQAAh5KJAABH0okAAETSwkAARRLCQABFUsJAAEWSwkAARdLCQAAGEsJAAIZSwkAAxpLCQACG0sJAAAcSwkAAR1LCQABHksJAAEfSwkAARFLCgADEksKAAITSwoAASBLCgABIUsKAAEPSwsAAhBLCwADIksLAAEjSwsAAA5LDAABD0sMAAEkSwwAAQ1LDQAAJUsNAAMMSw4AASZLDgABC0sPAAEnSw8AAgpLEAABC0sQAAMoSxAAAQpLEQACKEsRAAMJSxIAAClLEgABCUsTAAEpSxMAAQlLFAAAKUsUAAEJSxUAAilLFQABCUsWAAIpSxYAAQlLFwACKUsXAAEJSxgAAilLGAABCUsZAAIpSxkAAQlLGgACKUsaAAEJSxsAAilLGwABCkscAAIoSxwAAQpLHQACKEsdAAELSx4AAydLHgADDEsfAAImSx8AAg1LIAACJUsgAAEOSyEAAiRLIQACD0siAAEQSyIAASJLIgACI0siAAARSyMAARJLIwABIEsjAAIhSyMAABNLJAABFEskAAEVSyQAARZLJAACF0skAAEYSyQAARlLJAABGkskAAEbSyQABBxLJAADHUskAAEeSyQAAB9LJAABFEwKAAEVTAoAARZMCgABF0wKAAEYTAoAARlMCgABGkwKAAQbTAoAARxMCgABHUwKAAEeTAoAAR9MCgACEUwLAAISTAsAAxNMCwABIEwLAAIhTAsAASJMCwABEEwMAAEiTAwAASNMDAAADkwNAAAPTA0AASRMDQABJUwNAAINTA4AASVMDgAAJkwOAAEMTA8AAiZMDwACJ0wPAAIMTBAAACdMEAABC0wRAAEoTBEAAQpMEgABKEwSAAEpTBIAAApMEwABKUwTAAIKTBQAAClMFAABCkwVAAIpTBUAAQpMFgACKUwWAAEKTBcAAilMFwABCkwYAAIpTBgAAQpMGQACKUwZAAEKTBoAAilMGgACCkwbAAIpTBsAAQpMHAACKUwcAAELTB0AAihMHQABDEweAAEnTB4AAQxMHwABJ0wfAAENTCAAASZMIAACDkwhAAMPTCEAASRMIQABJUwhAAAQTCIAASNMIgACEUwjAAESTCMAAxNMIwABIEwjAAEhTCMAASJMIwABFEwkAAEVTCQAARZMJAABF0wkAAEYTCQAARlMJAAAGkwkAAAbTCQAAxxMJAABHUwkAAEeTCQAAB9MJAACE00LAAIUTQsAARVNCwABFk0LAAEXTQsAARhNCwABGU0LAAEaTQsAABtNCwACHE0LAAEdTQsAAR5NCwABH00LAAIRTQwAARJNDAAEIE0MAAEhTQwAAQ9NDQABEE0NAAEiTQ0AASNNDQAADk0OAAIkTQ4AAQ1NDwABJU0PAAEMTRAAAiZNEAAAC00RAAEnTREAAQtNEgABJ00SAAIKTRMAAihNEwABCk0UAAAoTRQAAQpNFQADKE0VAAEKTRYAAyhNFgABCk0XAAMoTRcAAQpNGAADKE0YAAAKTRkAAyhNGQABCk0aAAMoTRoAAQpNGwADKE0bAAEKTRwAAwtNHAABJ00cAAEoTRwAAQtNHQABJ00dAAELTR4AAQxNHgAAJk0eAAEnTR4AAQxNHwAADU0fAAElTR8AAiZNHwABDU0gAAEOTSAAAiRNIAABJU0gAAIOTSEAAg9NIQACI00hAAEkTSEAAQ9NIgACEE0iAAIiTSIAAiNNIgABEU0jAAESTSMAARNNIwABH00jAAAgTSMAASFNIwABE00kAAEUTSQAARVNJAABFk0kAAEXTSQAARhNJAABGU0kAAEaTSQAARtNJAACHE0kAAEdTSQAAR5NJAACH00kAAAUTgsAARVOCwABFk4LAAEXTgsAARhOCwABGU4LAAEaTgsAABtOCwACHE4LAAEdTgsAAR5OCwAAEU4MAAESTgwAAhNODAAEH04MAAEgTgwAASFODAABEE4NAAEiTg0AAQ9ODgACI04OAAIOTg8AAiRODwACDU4QAAIlThAAAQxOEQABJk4RAAEMThIAASZOEgAAC04TAAEnThMAAQtOFAAAJ04UAAILThUAASdOFQABC04WAAEnThYAAQtOFwABJ04XAAELThgAASdOGAABC04ZAAEnThkAAQtOGgABJ04aAAELThsAASdOGwABDE4cAAImThwAAwxOHQACJk4dAAMNTh4AASVOHgABDk4fAAIkTh8AAQ9OIAACI04gAAEQTiEAASJOIQABEU4iAAASTiIAABNOIgABH04iAAAgTiIAASFOIgABFE4jAAIVTiMAARZOIwABF04jAAEYTiMAABlOIwAAGk4jAAEbTiMAARxOIwACHU4jAAIeTiMAARRPCwAEFU8LAAMWTwsAAhdPCwABGE8LAAEZTwsAARpPCwABG08LAAAcTwsAAR1PCwABHk8LAAAfTwsAARJPDAABE08MAAEUTwwAARVPDAABFk8MAAAXTwwAABhPDAAAGU8MAAAaTwwAARtPDAACHE8MAAIdTwwAAR5PDAAAH08MAAEgTwwAACFPDAACEU8NAAESTw0AARNPDQABH08NAAEgTw0AASFPDQABIk8NAAMQTw4AAhFPDgABIU8OAAEiTw4AASNPDgACD08PAAEjTw8AACRPDwABDk8QAAEkTxAAASVPEAAADU8RAAMlTxEAASZPEQABDU8SAAImTxIAAAxPEwABJk8TAAEnTxMAAQxPFAABJ08UAAMMTxUAASdPFQABDE8WAAEnTxYAAQxPFwABJ08XAAEMTxgAASdPGAABDE8ZAAEnTxkAAQxPGgABJ08aAAEMTxsAASdPGwABDU8cAAEmTxwAAQ1PHQABJk8dAAEOTx4AASVPHgABD08fAAIkTx8AARBPIAACI08gAAARTyEAASJPIQABEk8iAAETTyIAASBPIgABIU8iAAEUTyMAARVPIwABFk8jAAAXTyMAABhPIwAAGU8jAAAaTyMAARtPIwACHE8jAAIdTyMAAR5PIwAAH08jAAEUUA0AARVQDQAEFlANAAMXUA0AAhhQDQAB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FlUaAAEXVRoAAxxVGgABHVUaAAEeVRoAAR9VGgAAIFUaAAEYVRsAAxlVGwACGlUbAAEbVRsAABxVGwABHVUbAAEeVRsAAxZWFQABF1YVAAMYVhUAAxlWFQADGlYVAAMVVhYAAhtWFgADFFYXAAIcVhcAAhRWGAACHFYYAAMUVhkAAhxWGQABFVYaAAIbVhoAAxZWGwABF1YbAAMYVhsAAxlWGwADGlYbAAMWVxUAARdXFQABGFcVAAAZVxUAAxpXFQACFVcWAAEbVxYAARRXFwABHFcXAAEUVxgAARxXGAABFFcZAAEVVxkAARtXGQABHFcZAAEVVxoAARZXGgABF1caAAEYVxoAABlXGgADGlcaAAIbVxoAABZXGwABF1cbAAEYVxsAABlXGwADGlcbAAEWWBUAAxdYFQAAGFgVAAEZWBUAARpYFQABFVgWAAMWWBYAAxdYFgAAGFgWAAEZWBYAARpYFgABG1gWAAMVWBcAAxZYFwADG1gXAAMVWBgAAxZYGAADG1gYAAMWWBkAAxdYGQAAGFgZAAEZWBkAARpYGQABF1kXAAIYWRcAARlZFwAAGlkXAAAbWRcAAxdZGAACGFkYAAEZWRgAABpZGAAAG1kYAAM=",O0={schemaVersion:I0,compilerVersion:b0,sourceId:D0,sourceVoxels:R0,renderedSurfaceCells:T0,stride:U0,partIds:F0,paletteIds:P0,buildSheetSha256:G0,payloadSha256:L0,cellsBase64:N0},H0=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],k0=1,V0=64,Qr=["head","torso","left-arm","right-arm","left-leg","right-leg","equipment"],z0=C0,Y0=O0;function W0(i,e){const t=i.find(n=>n.id===e);if(t===void 0)throw new Error(`Unknown F-01 palette entry: ${e}`);return t}function J0(i,e){if(![1,2].includes(e.schemaVersion)||e.sourceId!==i.id||![5,6].includes(e.stride)||e.stride===6&&e.moduleIds===void 0)throw new Error("Compiled surface pack does not match its canonical source.");const t=atob(e.cellsBase64);if(t.length!==e.renderedSurfaceCells*e.stride)throw new Error("Compiled surface pack length is invalid.");const n=[];for(let s=0;s<t.length;s+=e.stride){const r=e.partIds[t.charCodeAt(s+3)],a=e.paletteIds[t.charCodeAt(s+4)],o=e.moduleIds?.[t.charCodeAt(s+5)];if(!Qr.includes(r)||a===void 0)throw new Error("F-01 surface pack contains an unknown semantic index.");n.push({x:t.charCodeAt(s),y:t.charCodeAt(s+1),z:t.charCodeAt(s+2),part:r,palette:W0(i.palette,a),module:o})}return n}function K0(i,e){const t=i.surface==="emissive",n=i.surface==="polymer",s=i.surface==="glass",r=i.surface==="cloth"||i.surface==="emissive",a=i.surface==="skin"?e?.skinRoughness??.58:n?e?.polymerRoughness??.38:s?e?.glassRoughness??.38:e?.clothRoughness??.7,o=n?e?.polymerMetalness??.2:s?e?.glassMetalness??.2:0,l=n?e?.polymerClearcoat??.06:s?e?.glassClearcoat??.46:e===void 0?.06:0,c=e?.diffuseLift??0,h=new sl({color:i.hex,roughness:a,metalness:o,clearcoat:l,clearcoatRoughness:.35,sheen:r?e?.clothSheen??.28:.05,sheenColor:i.hex,sheenRoughness:r?e?.clothSheenRoughness??.74:.74,emissive:t||c>0?i.hex:0,emissiveIntensity:t?e?.emissiveIntensity??2.4:c,envMapIntensity:e?.environmentIntensity??1});if(e!==void 0&&e.macroNormalBlend>0){const A=_s.clamp(e.macroNormalBlend,0,.82),u=e.macroNormalCenterY;h.userData.macroNormalBlend=A,h.userData.macroNormalCenterY=u,h.onBeforeCompile=f=>{f.vertexShader=f.vertexShader.replace("#include <beginnormal_vertex>",`
          #include <beginnormal_vertex>
          #ifdef USE_INSTANCING
            vec3 f01MacroDirection = instanceMatrix[3].xyz;
            f01MacroDirection.y -= ${u.toFixed(6)};
            float f01MacroLength = length(f01MacroDirection);
            if (f01MacroLength > 0.0001) {
              vec3 f01MacroNormal = f01MacroDirection / f01MacroLength;
              objectNormal = normalize(mix(
                objectNormal,
                f01MacroNormal,
                ${A.toFixed(6)}
              ));
            }
          #endif
        `)},h.customProgramCacheKey=()=>`f01-macro-normal:${A}:${u}`}return h}function X0(i,e){const{width:t,height:n,depth:s,cellSize:r}=i.grid,a=(t-1)/2,o=(s-1)/2,l=(c,h,A)=>new b((c-a)*r,h*r,(A-o)*r);switch(e){case"head":return l(a,n*i.rig.headStart,o);case"torso":return l(a,n*i.rig.hipHeight,o);case"left-arm":return l(t*.25,n*i.rig.shoulderHeight,o);case"right-arm":return l(t*.75,n*i.rig.shoulderHeight,o);case"left-leg":return l(t*.39,n*i.rig.hipHeight,o);case"right-leg":return l(t*.61,n*i.rig.hipHeight,o);case"equipment":return l(a,n*.49,s*.32)}}function Z0(i){const e=new Map;for(const t of i){const n=`${t.part}:${t.palette.id}`,s=e.get(n)??[];s.push(t),e.set(n,s)}return e}function Er(i){return`${i.x},${i.y},${i.z}`}function q0(i,e,t){const n=new Map(i.map(a=>[Er(a),a])),s=new Set,r=new Set;for(const a of i){const o=Er(a);if(s.has(o))continue;const l=[],c=[a];s.add(o);let h=a.y;for(;c.length>0;){const A=c.pop();if(A===void 0)break;l.push(A),h=Math.max(h,A.y);for(const[u,f,g]of H0){const M=`${A.x+u},${A.y+f},${A.z+g}`,p=n.get(M);p===void 0||s.has(M)||(s.add(M),c.push(p))}}if(h<=e&&l.length<=t)for(const A of l)r.add(Er(A))}return r.size===0?i:i.filter(a=>!r.has(Er(a)))}function j0(i){i.group.position.copy(i.restPosition),i.group.rotation.set(0,0,0),i.group.scale.setScalar(1)}function $0(i,e,t,n,s){for(const a of Object.values(i))j0(a);e.position.set(0,0,0),e.rotation.set(0,0,0);const r=Math.sin(n*2.1);if(e.position.y=r*.012,i.head.group.rotation.y=Math.sin(n*.64)*.026,i.head.group.rotation.x=r*.012,i.torso.group.rotation.x=r*.007,i.equipment.group.rotation.x=-r*.01,t==="run"){const a=Math.sin(n*7.4),o=Math.abs(Math.cos(n*7.4));e.position.y+=o*.052,e.rotation.z=a*.018,i["left-leg"].group.rotation.x=a*.7,i["right-leg"].group.rotation.x=-a*.7,i["left-arm"].group.rotation.x=-a*.52,i["right-arm"].group.rotation.x=a*.52,i.torso.group.rotation.x=.07,i.head.group.rotation.x=-.045+o*.018;return}if(t==="hit"){const a=_s.clamp((n-s)/.62,0,1),o=Math.sin(a*Math.PI),l=Math.sin(a*Math.PI*2)*(1-a);e.position.z=-o*.13,e.rotation.x=l*.15,i.torso.group.rotation.x=-o*.2,i.head.group.rotation.x=o*.16,i["left-arm"].group.rotation.z=-o*.36,i["right-arm"].group.rotation.z=o*.36,i["left-leg"].group.rotation.x=o*.12,i["right-leg"].group.rotation.x=-o*.12}}function eB(i){const e=i.source,t=i.surfacePack,n=e.palette,s=J0(e,t),r=i.removeDetachedGroundDebris?q0(s,Math.max(0,Math.floor(i.detachedGroundMaximumY??k0)),Math.max(1,Math.floor(i.detachedGroundMaximumCells??V0))):s,a=new Yn;a.name=e.id,a.userData.sourceSha256=t.sourceSha256??"unavailable",a.userData.payloadSha256=t.payloadSha256,a.userData.moduleIds=t.moduleIds??[];const o=new Yn;o.name=`${e.id}:motion-root`,a.add(o);const l=Object.fromEntries(Qr.map(d=>{const x=new Yn,w=X0(e,d);return x.name=`${e.id}:${d}`,x.position.copy(w),o.add(x),[d,{group:x,restPosition:w.clone()}]})),c=new Map(n.map(d=>[d.id,K0(d,i.materialTuning)])),h=_s.clamp(i.surfaceFill??e.grid.surfaceGap,.82,1.02),A=_s.clamp(i.edgeRadiusRatio??.075,.008,.12),u=new hl(e.grid.cellSize*h,e.grid.cellSize*h,e.grid.cellSize*h,2,e.grid.cellSize*A),f=(e.grid.width-1)/2,g=(e.grid.depth-1)/2,M=new Ne;for(const[d,x]of Z0(r)){const[w,B]=d.split(":"),Q=c.get(B),S=l[w];if(Q===void 0||S===void 0)continue;const C=new Or(u,Q,x.length);C.name=`${e.id}:${d}`,C.castShadow=i.castShadow??!0,C.receiveShadow=i.receiveShadow??!0,C.frustumCulled=!1;const E=S.restPosition;x.forEach((v,I)=>{M.makeTranslation((v.x-f)*e.grid.cellSize-E.x,v.y*e.grid.cellSize-E.y,(v.z-g)*e.grid.cellSize-E.z),C.setMatrixAt(I,M)}),C.instanceMatrix.needsUpdate=!0,S.group.add(C)}let p=!1;return{root:a,motionRoot:o,partGroups:Object.fromEntries(Qr.map(d=>[d,l[d].group])),materials:c,stats:{sourceId:t.sourceId,sourceVoxels:t.sourceVoxels,renderedSurfaceCells:r.length,materialCount:c.size,rigParts:Qr.length,moduleCount:t.moduleIds?.length??0,sourceSha256:t.sourceSha256,payloadSha256:t.payloadSha256,reconstruction:i.reconstruction},update(d,x,w){$0(l,o,d,x,w)},setWireframe(d){if(d!==p){p=d;for(const x of c.values())x.wireframe=d}},dispose(){u.dispose();for(const d of c.values())d.dispose();a.removeFromParent()}}}function AM(i={}){return eB({...i,source:z0,surfacePack:Y0,reconstruction:"compiled four-view visual hull"})}export{jB as $,Pa as A,at as B,tl as C,Cn as D,Mn as E,Mh as F,Yn as G,Jt as H,Or as I,us as J,IB as K,bt as L,Et as M,En as N,bB as O,PB as P,ui as Q,tn as R,Qo as S,kh as T,Yt as U,b as V,ln as W,zA as X,qB as Y,$B as Z,ZB as _,Kt as a,Xo as a$,XB as a0,eM as a1,Uo as a2,Fo as a3,Po as a4,Go as a5,No as a6,Oo as a7,Nt as a8,St as a9,jo as aA,pu as aB,si as aC,Mu as aD,na as aE,Jr as aF,Kr as aG,Lr as aH,CB as aI,Hh as aJ,Xe as aK,Re as aL,ii as aM,kr as aN,tB as aO,Ms as aP,Ku as aQ,Ju as aR,Ja as aS,bn as aT,Wa as aU,Xr as aV,Ts as aW,Pu as aX,Mt as aY,zu as aZ,Vu as a_,_h as aa,ih as ab,sh as ac,Es as ad,Ho as ae,Bn as af,en as ag,oh as ah,zo as ai,Yo as aj,Tn as ak,oi as al,ci as am,Wo as an,lh as ao,oB as ap,ko as aq,Vo as ar,Bs as as,rh as at,ah as au,Xn as av,GB as aw,Vi as ax,zt as ay,KA as az,Vf as b,go as b$,ku as b0,Ko as b1,Hu as b2,Yu as b3,Ou as b4,Dr as b5,zn as b6,bc as b7,mu as b8,gu as b9,Jo as bA,Mr as bB,xr as bC,_r as bD,wr as bE,Ka as bF,Xa as bG,Za as bH,qa as bI,ja as bJ,$a as bK,eo as bL,to as bM,no as bN,yr as bO,io as bP,so as bQ,ro as bR,ao as bS,oo as bT,lo as bU,co as bV,ho as bW,uo as bX,fo as bY,Ao as bZ,po as b_,Su as ba,yu as bb,La as bc,wu as bd,vu as be,Qu as bf,Cu as bg,Ga as bh,_u as bi,xu as bj,fu as bk,Ql as bl,Au as bm,rB as bn,mn as bo,Cl as bp,yl as bq,Pi as br,Ya as bs,za as bt,Va as bu,ka as bv,Oi as bw,Ha as bx,Oa as by,Na as bz,Do as c,JA as c$,mo as c0,Eo as c1,Bo as c2,Mo as c3,xo as c4,_o as c5,wo as c6,Cr as c7,vo as c8,HB as c9,Ul as cA,xB as cB,BB as cC,EB as cD,mB as cE,gB as cF,MB as cG,pB as cH,dB as cI,pi as cJ,Bu as cK,Eu as cL,Zu as cM,RB as cN,Uu as cO,Tu as cP,Gr as cQ,hh as cR,Ic as cS,rt as cT,aB as cU,Un as cV,iM as cW,Rr as cX,li as cY,Hi as cZ,qn as c_,sl as ca,kB as cb,QA as cc,VB as cd,zB as ce,el as cf,YB as cg,Tf as ch,OB as ci,fB as cj,du as ck,sB as cl,zf as cm,rc as cn,br as co,nh as cp,ki as cq,gh as cr,ph as cs,Te as ct,QB as cu,SB as cv,yB as cw,wB as cx,vB as cy,_B as cz,Ne as d,LB as d$,Tr as d0,mh as d1,Kn as d2,uB as d3,AB as d4,Nu as d5,eB as d6,aM as d7,nB as d8,iB as d9,s0 as dA,bs as dB,tM as dC,JB as dD,KB as dE,nM as dF,je as dG,UB as dH,kf as dI,xh as dJ,FB as dK,Bh as dL,WB as dM,Pf as dN,Ir as dO,So as dP,Kh as dQ,rl as dR,al as dS,Is as dT,TB as dU,Wf as dV,zh as dW,yh as dX,dh as dY,Nh as dZ,jh as d_,sM as da,Nr as db,AM as dc,fM as dd,Ah as de,oM as df,lM as dg,Tc as dh,rM as di,cM as dj,uM as dk,Cs as dl,hM as dm,Vh as dn,Dt as dp,lB as dq,hB as dr,cB as ds,hl as dt,vh as du,Zi as dv,Lt as dw,ys as dx,Sr as dy,ul as dz,Gh as e,NB as e0,Qh as e1,Lh as e2,iA as e3,Oh as e4,o0 as e5,A0 as e6,Hr as f,we as g,Sh as h,Zn as i,$o as j,ai as k,_s as l,$t as m,Br as n,yf as o,ws as p,Gi as q,be as r,Ve as s,ee as t,Ef as u,$e as v,Me as w,Pt as x,DB as y,Jn as z};
