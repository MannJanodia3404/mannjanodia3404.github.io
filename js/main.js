
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

  /* ---------- Scroll reveal (fail-safe) ---------- */
  function initReveal() {
    const targets = Array.from(document.querySelectorAll('.about, .section, .contact'));
    // If anything goes wrong, sections must still be visible.
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('in'));
      return;
    }
    targets.forEach((t) => t.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    targets.forEach((t) => io.observe(t));

    // Safety net: force-reveal anything still hidden shortly after load,
    // so a missed observer callback can never leave a section invisible.
    setTimeout(() => targets.forEach((t) => t.classList.add('in')), 1200);
  }

  function safe(label, fn) {
    try { fn(); } catch (e) { console.error('[portfolio] ' + label + ' failed:', e); }
  }

  function boot() {
    safe('projects', renderProjects);
    safe('skills', renderSkills);
    safe('experience', renderExperience);
    safe('reveal', initReveal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
