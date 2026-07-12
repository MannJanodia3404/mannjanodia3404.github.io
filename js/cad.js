
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

(function () {
  'use strict';

  const listEl = document.getElementById('cad-list');
  const canvasEl = document.getElementById('cad-canvas');
  const loadingEl = document.getElementById('cad-loading');
  const nameEl = document.getElementById('cad-name');
  const metaEl = document.getElementById('cad-meta');
  if (!listEl || !canvasEl || typeof CAD_MODELS === 'undefined') return;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Colours pulled from the site palette.
  const PAPER = 0xecebe5;
  const INK = 0x191b19;
  const GREEN = 0x159c50;

  /* ---------- Build the model list ---------- */
  listEl.innerHTML = CAD_MODELS.map((c, i) => `
    <div class="cad-item${i === 0 ? ' active' : ''}" data-i="${i}" role="button" tabindex="0" aria-label="View ${esc(c.name)}">
      <div class="cad-fig">${esc(c.fig)}</div>
      <div class="cad-name">${esc(c.name)}</div>
      <div class="cad-sub">${esc(c.sub)}</div>
    </div>`).join('') +
    '<div class="cad-foot">ALL MODELS<br>FUSION 360 · FDM READY</div>';

  /* ---------- Three.js scene ---------- */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAPER);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 5000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasEl.appendChild(renderer.domElement);

  // Lighting: bright studio setup so matte STL surfaces always read.
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbfbdb4, 1.15));
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  // Key + fill lights are parented to the camera so the model is lit from
  // the viewer's side no matter how it's rotated (prevents an all-black view).
  const camLightRig = new THREE.Group();
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(0.6, 0.8, 1);
  camLightRig.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.55);
  fill.position.set(-0.8, 0.3, 0.5);
  camLightRig.add(fill);
  camera.add(camLightRig);
  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 0.9;
  controls.enablePan = false;
  controls.minDistance = 0.01;
  controls.maxDistance = 100000;

  // A fresh material per mesh avoids any shared-state colour glitches.
  function newMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0xd8d6cd, metalness: 0.05, roughness: 0.75
    });
  }

  let mesh = null;
  let homeState = null;      // saved camera + target for double-click reset
  let currentToken = 0;      // guards against out-of-order async loads
  const loader = new STLLoader();

  function clearMesh() {
    if (mesh) {
      scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
      mesh = null;
    }
  }

  function frameObject(geometry) {
    geometry.computeVertexNormals();
    geometry.center();               // move geometry to its own centre
    geometry.computeBoundingSphere();
    const radius = (geometry.boundingSphere && geometry.boundingSphere.radius) || 1;

    mesh = new THREE.Mesh(geometry, newMaterial());
    // Fusion STLs export Z-up; rotate so the model stands naturally.
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    // Distance that fits the whole bounding sphere in view, with margin.
    const fov = camera.fov * Math.PI / 180;
    const dist = (radius / Math.sin(fov / 2)) * 1.25;

    camera.position.set(dist * 0.65, dist * 0.5, dist * 0.9);
    camera.near = Math.max(dist / 1000, 0.001);
    camera.far = dist * 1000;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.minDistance = radius * 0.6;
    controls.maxDistance = dist * 8;
    controls.update();

    homeState = { pos: camera.position.clone(), target: controls.target.clone() };
  }

  function resetView() {
    if (!homeState) return;
    camera.position.copy(homeState.pos);
    controls.target.copy(homeState.target);
    controls.update();
  }
  renderer.domElement.addEventListener('dblclick', resetView);

  function showFallbackImage(c) {
    loadingEl.style.display = 'block';
    loadingEl.innerHTML =
      '<img src="' + esc(c.src) + '" alt="' + esc(c.label) +
      '" style="max-width:100%;max-height:420px;object-fit:contain" ' +
      'onerror="this.style.display=\'none\'">';
  }

  function load(i) {
    const c = CAD_MODELS[i];
    nameEl.textContent = c.name.toUpperCase();
    metaEl.textContent = c.meta;
    listEl.querySelectorAll('.cad-item').forEach((el) =>
      el.classList.toggle('active', +el.dataset.i === i));

    const token = ++currentToken;
    loadingEl.innerHTML = 'LOADING MODEL…';
    loadingEl.style.display = 'block';
    clearMesh();

    // Fetch + parse manually so network/parse failures are handled cleanly
    // and switching between models is always reliable.
    fetch(c.stl)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
      .then((buf) => {
        if (token !== currentToken) return;        // a newer request superseded this one
        const geometry = loader.parse(buf);
        frameObject(geometry);
        loadingEl.style.display = 'none';
        loadingEl.innerHTML = '';
        resize();
      })
      .catch((err) => {
        if (token !== currentToken) return;
        console.warn('[cad] STL load failed for ' + c.name + ':', err);
        showFallbackImage(c);
      });
  }

  /* ---------- Sizing ---------- */
  function resize() {
    const w = canvasEl.clientWidth;
    const h = canvasEl.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  // ResizeObserver catches the case where the flex layout gives the canvas its
  // real size only after first paint (which otherwise causes an oversized canvas).
  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvasEl);
  }

  /* ---------- Render loop ---------- */
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  /* ---------- Wire up selector ---------- */
  listEl.querySelectorAll('.cad-item').forEach((el) => {
    const i = +el.dataset.i;
    el.addEventListener('click', () => load(i));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(i); }
    });
  });

  /* ---------- Start ---------- */
  resize();
  animate();
  load(0);
  setTimeout(resize, 300);   // re-measure once fonts/layout settle
})();
