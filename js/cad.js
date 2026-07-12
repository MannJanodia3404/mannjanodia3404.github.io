
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

  // Lighting: soft studio setup so matte STL surfaces read well.
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b6ad, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(1, 1.4, 1.2);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.4);
  fill.position.set(-1.2, 0.5, -1);
  scene.add(fill);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 0.9;
  controls.enablePan = false;
  controls.minDistance = 1;
  controls.maxDistance = 4000;

  const material = new THREE.MeshStandardMaterial({
    color: INK, metalness: 0.15, roughness: 0.55, flatShading: false
  });

  let mesh = null;
  let homeState = null;      // saved camera + target for double-click reset
  let currentToken = 0;      // guards against out-of-order async loads
  const loader = new STLLoader();

  function clearMesh() {
    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh = null;
    }
  }

  function frameObject(geometry) {
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;
    const center = new THREE.Vector3();
    bb.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    mesh = new THREE.Mesh(geometry, material);
    // STLs from Fusion export Z-up; tip toward viewer-friendly orientation.
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const size = new THREE.Vector3();
    bb.getSize(size);
    const radius = Math.max(size.x, size.y, size.z) * 0.5 || 1;
    const dist = radius / Math.sin((camera.fov * Math.PI / 180) / 2) * 1.4;

    camera.position.set(dist * 0.7, dist * 0.55, dist * 0.9);
    camera.near = dist / 100;
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.update();

    homeState = {
      pos: camera.position.clone(),
      target: controls.target.clone()
    };
  }

  function resetView() {
    if (!homeState) return;
    camera.position.copy(homeState.pos);
    controls.target.copy(homeState.target);
    controls.update();
  }
  renderer.domElement.addEventListener('dblclick', resetView);

  function load(i) {
    const c = CAD_MODELS[i];
    nameEl.textContent = c.name.toUpperCase();
    metaEl.textContent = c.meta;
    listEl.querySelectorAll('.cad-item').forEach((el) =>
      el.classList.toggle('active', +el.dataset.i === i));

    const token = ++currentToken;
    loadingEl.textContent = 'LOADING MODEL…';
    loadingEl.style.display = 'block';
    clearMesh();

    loader.load(
      c.stl,
      (geometry) => {
        if (token !== currentToken) { geometry.dispose(); return; }
        frameObject(geometry);
        loadingEl.style.display = 'none';
      },
      undefined,
      () => {
        if (token !== currentToken) return;
        // Fallback: if the STL can't load, show the render image instead.
        loadingEl.innerHTML =
          '<img src="' + esc(c.src) + '" alt="' + esc(c.label) +
          '" style="max-width:100%;max-height:400px;object-fit:contain">';
      }
    );
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

  // Re-measure once fonts/layout settle (the shell has a fixed height in CSS).
  setTimeout(resize, 300);
})();
