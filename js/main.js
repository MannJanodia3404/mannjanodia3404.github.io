/* ============================================================
   Rendering + interactions
   ============================================================ */
(function () {
  'use strict';

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Projects (expandable rows) ---------- */
  function renderProjects() {
    const list = document.getElementById('proj-list');
    if (!list) return;

    list.innerHTML = PROJECTS.map((p) => {
      const bullets = p.bullets.map((b) =>
        `<div class="proj-bullet"><span class="mark">▸</span><span>${esc(b)}</span></div>`).join('');
      const stats = p.stats.map((s) =>
        `<div class="proj-stat"><div class="proj-stat-v">${esc(s.v)}</div><div class="proj-stat-l">${esc(s.l)}</div></div>`).join('');
      const media = p.media.map((m) =>
        `<figure><img src="${esc(m.src)}" alt="${esc(m.cap)}" loading="lazy"><figcaption>${esc(m.cap)}</figcaption></figure>`).join('');

      return `
        <div class="proj" data-id="${p.id}">
          <div class="proj-row" role="button" tabindex="0" aria-expanded="false">
            <span class="proj-num">${esc(p.num)}</span>
            <span class="proj-title">${esc(p.title)}</span>
            <span class="proj-stack">${esc(p.stack)}</span>
            <span class="proj-metric">${esc(p.metric)}</span>
            <span class="proj-ind">+</span>
          </div>
          <div class="proj-body">
            <div>
              <p class="proj-overview">${esc(p.overview)}</p>
              <div class="proj-bullets">${bullets}</div>
              <div class="proj-stats">${stats}</div>
              <a class="proj-link" href="${esc(p.github)}" target="_blank" rel="noopener">VIEW ON GITHUB →</a>
            </div>
            <div class="proj-media">${media}</div>
          </div>
        </div>`;
    }).join('');

    const toggle = (proj) => {
      const isOpen = proj.classList.contains('open');
      list.querySelectorAll('.proj.open').forEach((el) => {
        el.classList.remove('open');
        el.querySelector('.proj-ind').textContent = '+';
        el.querySelector('.proj-row').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        proj.classList.add('open');
        proj.querySelector('.proj-ind').textContent = '−';
        proj.querySelector('.proj-row').setAttribute('aria-expanded', 'true');
      }
    };

    list.querySelectorAll('.proj-row').forEach((row) => {
      const proj = row.closest('.proj');
      row.addEventListener('click', () => toggle(proj));
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(proj); }
      });
    });

    // Open the first project by default.
    const first = list.querySelector('.proj');
    if (first) toggle(first);
  }

  /* ---------- CAD viewer ---------- */
  function renderCad() {
    const listEl = document.getElementById('cad-list');
    const imgEl = document.getElementById('cad-img');
    const nameEl = document.getElementById('cad-name');
    const metaEl = document.getElementById('cad-meta');
    if (!listEl) return;

    const items = CAD_MODELS.map((c, i) => `
      <div class="cad-item${i === 0 ? ' active' : ''}" data-i="${i}" role="button" tabindex="0">
        <div class="cad-fig">${esc(c.fig)}</div>
        <div class="cad-name">${esc(c.name)}</div>
        <div class="cad-sub">${esc(c.sub)}</div>
      </div>`).join('');
    listEl.innerHTML = items + '<div class="cad-foot">ALL MODELS<br>FUSION 360 · FDM READY</div>';

    const select = (i) => {
      const c = CAD_MODELS[i];
      imgEl.src = c.src; imgEl.alt = c.label;
      nameEl.textContent = c.name.toUpperCase();
      metaEl.textContent = c.meta;
      listEl.querySelectorAll('.cad-item').forEach((el) =>
        el.classList.toggle('active', +el.dataset.i === i));
    };

    listEl.querySelectorAll('.cad-item').forEach((el) => {
      const i = +el.dataset.i;
      el.addEventListener('click', () => select(i));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
      });
    });

    select(0);
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = SKILL_GROUPS.map((g) => `
      <div class="skill-group">
        <div class="skill-label">${esc(g.label)}</div>
        <div class="skill-items">${g.items.map((s) => `<div class="skill-item">${esc(s)}</div>`).join('')}</div>
        <div class="skill-note">${esc(g.note)}</div>
      </div>`).join('');
  }

  /* ---------- Experience ---------- */
  function renderExperience() {
    const list = document.getElementById('exp-list');
    if (!list) return;
    list.innerHTML = EXPERIENCE.map((e) => `
      <div class="exp">
        <span class="exp-year">${esc(e.year)}</span>
        <div>
          <div class="exp-role">${esc(e.role)}</div>
          <div class="exp-co">${esc(e.company)}</div>
        </div>
        <div>
          <p class="exp-desc">${esc(e.desc)}</p>
          <div class="exp-tags">${e.tags.map((t) => `<span class="exp-tag">${esc(t)}</span>`).join('')}</div>
        </div>
      </div>`).join('');
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const targets = document.querySelectorAll('.about, .section, .contact');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('in'));
      return;
    }
    targets.forEach((t) => t.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    targets.forEach((t) => io.observe(t));
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderCad();
    renderSkills();
    renderExperience();
    initReveal();
  });
})();
