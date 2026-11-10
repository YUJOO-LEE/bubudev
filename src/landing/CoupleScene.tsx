import { useEffect, useRef } from 'react';
import { ACESFilmicToneMapping, CatmullRomCurve3, CubicBezierCurve3, Curve, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, Mesh, MeshPhysicalMaterial, OrthographicCamera, PMREMGenerator, Scene, Shape, SphereGeometry, TubeGeometry, Vector3, WebGLRenderer } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { Person } from '../App';

interface Props { motion: boolean; activePerson: Person | null; onReady: (ready: boolean) => void }

class RibbonCurve extends Curve<Vector3> {
  constructor(private height: number) { super(); }

  getPoint(t: number, target = new Vector3()) {
    const x = -.12 + t * 1.28;
    const y = .545 + .425 * Math.cos((x - .23) * Math.PI / .77);
    return target.set((x - .5) * 10, (.5 - y) * this.height, 0);
  }
}

function createHeart() {
  const shape = new Shape();
  shape.moveTo(0, .5);
  shape.bezierCurveTo(-.10, .50, -.16, .82, -.49, .86);
  shape.bezierCurveTo(-.91, .92, -1.10, .56, -1.02, .20);
  shape.bezierCurveTo(-.94, -.20, -.40, -.64, -.12, -.79);
  shape.bezierCurveTo(-.05, -.83, .05, -.83, .12, -.79);
  shape.bezierCurveTo(.40, -.64, .94, -.20, 1.02, .20);
  shape.bezierCurveTo(1.10, .56, .91, .92, .49, .86);
  shape.bezierCurveTo(.16, .82, .10, .50, 0, .50);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, { depth: 0.25, bevelEnabled: true, bevelSegments: 16, bevelSize: 0.21, bevelThickness: 0.22, steps: 1, curveSegments: 48 });
  geometry.center();
  return geometry;
}

export default function CoupleScene({ motion, activePerson, onReady }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const settings = useRef({ motion, activePerson });
  settings.current = { motion, activePerson };

  useEffect(() => {
    const host = hostRef.current;
    const stage = host?.parentElement;
    if (!host || !stage) return;
    let renderer: WebGLRenderer;
    try { renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { onReady(false); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    host.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new OrthographicCamera(-5, 5, 4, -4, 0.1, 100);
    camera.position.z = 20;
    const generator = new PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    generator.dispose(); room.dispose();
    scene.add(new HemisphereLight(0xfff7ed, 0xb9a8a1, 1.8));
    const light = new DirectionalLight(0xfff9ef, 3);
    light.position.set(-4, 6, 8);
    scene.add(light);

    const pink = new MeshPhysicalMaterial({ color: 0xf6799c, roughness: 0.27, metalness: 0.06, clearcoat: 1, clearcoatRoughness: 0.1 });
    const lilac = new MeshPhysicalMaterial({ color: 0xb69edb, roughness: 0.32, metalness: 0.12, clearcoat: 1 });
    const dark = new MeshPhysicalMaterial({ color: 0x51323b, roughness: 0.35 });
    const cream = new MeshPhysicalMaterial({ color: 0xfff8ed, roughness: 0.3 });
    const heartGeometry = createHeart();
    const eyeGeometry = new SphereGeometry(0.055, 16, 16);
    const glintGeometry = new SphereGeometry(0.019, 12, 12);
    const heart = new Group();
    heart.add(new Mesh(heartGeometry, pink));
    const eyes = new Group();
    for (const x of [-0.24, 0.24]) {
      const eye = new Mesh(eyeGeometry, dark);
      eye.position.set(x, 0.05, 0.38);
      eye.scale.y = 1.5;
      const glint = new Mesh(glintGeometry, cream);
      glint.position.set(x - 0.012, 0.078, 0.435);
      eyes.add(eye, glint);
    }
    heart.add(eyes);
    const smileGeometry = new TubeGeometry(new CatmullRomCurve3([new Vector3(-0.12,-0.11,0.38),new Vector3(0,-0.19,0.4),new Vector3(0.12,-0.11,0.38)]), 16, 0.018, 8, false);
    heart.add(new Mesh(smileGeometry, dark));
    scene.add(heart);
    const companion = new Mesh(heartGeometry, pink);
    scene.add(companion);
    const cable = new Mesh(new TubeGeometry(), lilac);
    scene.add(cable);

    let width = 0;
    let height = 0;
    let worldHeight = 8;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let focus = 0;
    let visible = true;
    let dirty = true;
    let contextLost = false;
    let lastMotion = settings.current.motion;
    let lastPerson = settings.current.activePerson;

    const resize = () => {
      width = host.clientWidth; height = host.clientHeight;
      if (!width || !height) return;
      worldHeight = 10 * height / width;
      camera.top = worldHeight / 2; camera.bottom = -worldHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const mobile = width <= 700;
      const lowerArc = mobile && window.matchMedia('(orientation: portrait)').matches ? .1 : 0;
      const point = (x: number, y: number) => new Vector3((x-.5)*10,(.5-y)*worldHeight,0);
      const curve = mobile
        ? new CubicBezierCurve3(point(-.35,.79+lowerArc),point(.4,.96+lowerArc),point(1.7,.43+lowerArc),point(.2,-.3))
        : new RibbonCurve(worldHeight);
      cable.geometry.dispose();
      cable.geometry = new TubeGeometry(curve, 240, mobile ? .14 : .105, 20, false);
      dirty = true;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = stage.getBoundingClientRect();
      pointerX = (event.clientX-rect.left)/width-.5;
      pointerY = (event.clientY-rect.top)/height-.5;
    };
    const leave = () => { pointerX = 0; pointerY = 0; };
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; onReady(false); };
    const restored = () => { contextLost = false; dirty = true; onReady(true); };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', leave);
    renderer.domElement.addEventListener('webglcontextlost', lost);
    renderer.domElement.addEventListener('webglcontextrestored', restored);

    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      const dt = Math.min((time-previous)/1000,.05);
      previous = time;
      if (!visible || document.hidden || contextLost) return;
      const current = settings.current;
      if (lastMotion !== current.motion || lastPerson !== current.activePerson) {
        dirty = true; lastMotion = current.motion; lastPerson = current.activePerson;
      }
      if (!current.motion && !dirty) return;
      if (current.motion) elapsed += dt;
      const smoothing = 1-Math.exp(-5*dt);
      currentX += (pointerX-currentX)*smoothing;
      currentY += (pointerY-currentY)*smoothing;
      const targetFocus = current.activePerson === 'yujoo' ? -1 : current.activePerson === 'hyungjun' ? 1 : 0;
      focus = current.motion ? focus+(targetFocus-focus)*smoothing : targetFocus;
      const mobile = width <= 700;
      const size = mobile ? .75 : .67;
      const bounce = current.motion ? Math.sin(elapsed*1.4)*.10 : 0;
      heart.position.set(mobile ? -3.1 : -3.25,worldHeight*(mobile ? .365 : .335)+bounce,0);
      heart.rotation.set(current.motion ? currentY*.25 : .06,current.motion ? currentX*.4+focus*.2 : 0,-.28+(current.motion ? Math.sin(elapsed*.8)*.1+focus*.1 : 0));
      heart.scale.setScalar(size*(1+Math.abs(focus)*.08));
      eyes.position.x = current.motion ? currentX*.065 : 0;
      eyes.position.y = current.motion ? -currentY*.04 : 0;
      const blink = current.motion && elapsed%4.3>4.15;
      eyes.scale.y = blink ? .12 : 1;
      companion.position.set(mobile ? -1.8 : -1.95,worldHeight*(mobile ? .407 : .408)-bounce*.5,-.5);
      companion.scale.setScalar(mobile ? .33 : .30);
      companion.rotation.set(.12,-.25,.35+(current.motion ? Math.sin(elapsed)*.12 : 0));
      cable.rotation.z = current.motion ? Math.sin(elapsed*.45)*.018+currentX*.015 : 0;
      cable.position.y = current.motion ? Math.sin(elapsed*.8)*.04 : 0;
      renderer.render(scene,camera);
      dirty = false;
    };
    resize();
    frame = requestAnimationFrame(render);
    onReady(true);
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect();
      stage.removeEventListener('pointermove',move); stage.removeEventListener('pointerleave',leave);
      renderer.domElement.removeEventListener('webglcontextlost',lost); renderer.domElement.removeEventListener('webglcontextrestored',restored);
      [heartGeometry,eyeGeometry,glintGeometry,smileGeometry,cable.geometry].forEach(geometry=>geometry.dispose());
      [pink,lilac,dark,cream].forEach(material=>material.dispose());
      environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [onReady]);

  return <div className="couple-scene" ref={hostRef} aria-hidden="true" />;
}
