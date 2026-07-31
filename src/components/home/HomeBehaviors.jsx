/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";

export function HomeBehaviors({ messages }) {
  useEffect(() => {
    const cleanups = [];
    const rafs = new Set();

    function listen(target, type, listener, options) {
      target.addEventListener(type, listener, options);
      cleanups.push(function () { target.removeEventListener(type, listener, options); });
    }

    function listenMedia(target, listener) {
      target.addListener(listener);
      cleanups.push(function () { target.removeListener(listener); });
    }

    function requestAnimationFrame(callback) {
      var id = window.requestAnimationFrame(function (time) {
        rafs.delete(id);
        callback(time);
      });
      rafs.add(id);
      return id;
    }

    
      var root   = document.documentElement;
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      var header = document.getElementById('site-header');
      var hero   = document.getElementById('top');
      var nav    = document.getElementById('nav-menu');
      var toggle = document.getElementById('nav-toggle');
      var bar    = document.getElementById('progress');
      var links  = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[data-nav]'));
    
      function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
      function sstep(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
    
      /* ---------- theme ------------------------------------------------- */
      /* The initial value was already resolved and written to <html> by the inline
         head script, so there is nothing to correct on first paint here. */
      var themeBtn  = document.getElementById('theme-toggle');
      var THEME_KEY = 'rmt-theme';
      var CHROME    = { light: '#022F50', dark: '#05192A' };
      var chromeMeta = document.querySelector('meta[name="theme-color"]');
      var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
      function storedTheme() {
        var v = null;
        try { v = window.localStorage.getItem(THEME_KEY); } catch (e) {}
        return (v === 'light' || v === 'dark') ? v : null;
      }
    
      function applyTheme(theme, persist) {
        root.setAttribute('data-theme', theme);
        if (chromeMeta) { chromeMeta.setAttribute('content', CHROME[theme]); }
        if (themeBtn) {
          var label = theme === 'dark' ? messages.switchLight : messages.switchDark;
          var visibleLabel = theme === 'dark' ? messages.themeLight : messages.themeDark;
          themeBtn.setAttribute('aria-label', label);
          themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
          themeBtn.setAttribute('title', label);
          var labelNode = themeBtn.querySelector('[data-theme-label]');
          if (labelNode) { labelNode.textContent = visibleLabel; }
        }
        if (persist) {
          try { window.localStorage.setItem(THEME_KEY, theme); } catch (e) {}
        }
      }
    
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);
    
      if (themeBtn) {
        listen(themeBtn, 'click', function () {
          applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
        });
      }
    
      /* Following the OS remains deliberately parked — an appearance change at
         dusk must not repaint the page under the visitor. Uncomment to restore it. */
      /*
      function onSchemeChange(e) {
        if (!storedTheme()) { applyTheme(e.matches ? 'dark' : 'light', false); }
      }
      if (darkQuery.addEventListener) { listen(darkQuery, 'change', onSchemeChange); }
      else if (darkQuery.addListener) { listenMedia(darkQuery, onSchemeChange); }
      */
    
      /* ==== ABOUT DEVICE MOTIF ==========================================
         The original hero device vitrine now lives in About. Its calm timed
         sequence is unchanged and pauses when hidden or outside the viewport.
         ===================================================================== */
      var devStage = document.getElementById('about-devices');
      var devForms = devStage ? Array.prototype.slice.call(devStage.querySelectorAll('.device-form')) : [];
      var devAt = 0, devTimer = null;
      var DEV_HOLD = 3500;

      function devShow(next) {
        for (var i = 0; i < devForms.length; i++) {
          devForms[i].classList.toggle('is-on', i === next);
          devForms[i].classList.toggle('is-past', i === devAt && i !== next);
        }
        devAt = next;
      }

      function devTick() {
        if (document.hidden || !devStage) { return; }
        var box = devStage.getBoundingClientRect();
        if (box.bottom < 40 || box.top > (window.innerHeight || 0)) { return; }
        devShow((devAt + 1) % devForms.length);
      }

      function devStop() {
        if (devTimer) { clearInterval(devTimer); devTimer = null; }
      }

      function devStart() {
        devStop();
        if (devForms.length > 1 && !reduce.matches) { devTimer = setInterval(devTick, DEV_HOLD); }
      }

      if (devForms.length) {
        devStart();
        listen(document, 'visibilitychange', function () {
          if (document.hidden) { devStop(); } else { devStart(); }
        });
        if (reduce.addEventListener) { listen(reduce, 'change', devStart); }
        else if (reduce.addListener) { listenMedia(reduce, devStart); }
      }

      /* =====================================================================
         HERO STORY
         Three stages share one pinned atrium viewport on capable desktop
         screens. Narrow, short, no-JS, and reduced-motion layouts remain
         ordinary stacked content in DOM order.
         ===================================================================== */
      var story = hero;
      var sticky = story.querySelector('.hero-story__sticky');
      var glow = story.querySelector('.hero-story__glow');
      var railTicks = Array.prototype.slice.call(story.querySelectorAll('[data-hero-tick]'));
      var cue = document.getElementById('hero-scroll-cue');
      var orbit = document.getElementById('hero-orbit');
      var orbitRotor = document.getElementById('hero-orbit-rotor');
      var orbitCore = document.getElementById('hero-orbit-core');
      var orbitArcA = document.getElementById('hero-orbit-arc-a');
      var orbitArcB = document.getElementById('hero-orbit-arc-b');
      var orbitNodesA = Array.prototype.slice.call(orbit.querySelectorAll('.orbit-node-a'));
      var orbitNodesB = Array.prototype.slice.call(orbit.querySelectorAll('.orbit-node-b'));
      var orbitSpokesA = Array.prototype.slice.call(orbit.querySelectorAll('#hero-orbit-group-a .orbit-spoke'));
      var orbitSpokesB = Array.prototype.slice.call(orbit.querySelectorAll('#hero-orbit-group-b .orbit-spoke'));
      var CIRC_A = 2 * Math.PI * 96;
      var CIRC_B = 2 * Math.PI * 158;
      /* 340vh supplied 240vh of scroll after subtracting the sticky viewport;
         400vh supplies 300vh. Scale old thresholds by 240 / 300 so stages one
         and two keep their absolute runway, leaving the added 60vh to stage 3. */
      var STORY_SCALE = 0.8;

      var STAGES = Array.prototype.slice.call(story.querySelectorAll('.hero-stage')).map(function (el, i) {
        var windows = [
          { inA: [-0.08, -0.016], out: [0.208, 0.304] },
          { inA: [ 0.24,  0.336], out: [0.48, 0.576] },
          { inA: [ 0.512, 0.608], out: [1.40, 1.50] }
        ][i];
        return {
          el: el,
          items: Array.prototype.slice.call(el.querySelectorAll('[data-hero-anim]')),
          inA: windows.inA,
          out: windows.out
        };
      });

      var mqSize = window.matchMedia('(min-width: 1000px) and (min-height: 640px)');
      var live = false;

      function shouldBeLive() { return mqSize.matches && !reduce.matches; }

      function clearStoryStyles() {
        STAGES.forEach(function (stage) {
          stage.el.style.opacity = '';
          stage.el.style.visibility = '';
          stage.el.classList.remove('is-front');
          stage.items.forEach(function (item) {
            item.style.transform = '';
            item.style.opacity = '';
          });
        });
        if (glow) { glow.style.transform = ''; }
        if (cue) { cue.style.opacity = ''; }
        if (orbitRotor) { orbitRotor.removeAttribute('transform'); }
        if (orbitCore) { orbitCore.setAttribute('r', '19'); }
        [orbitArcA, orbitArcB].forEach(function (arc) {
          if (!arc) { return; }
          arc.style.strokeDasharray = '';
          arc.style.strokeDashoffset = '';
          arc.style.strokeOpacity = '';
        });
        orbitNodesA.forEach(function (node) {
          node.setAttribute('r', '10');
          node.style.opacity = '';
        });
        orbitNodesB.forEach(function (node) {
          node.setAttribute('r', '7');
          node.style.opacity = '';
        });
        orbitSpokesA.concat(orbitSpokesB).forEach(function (line) { line.style.opacity = ''; });
        railTicks.forEach(function (tick) { tick.classList.remove('on'); });
      }

      function setMode() {
        var next = shouldBeLive();
        if (next === live) { return; }
        live = next;
        story.classList.toggle('is-live', live);
        if (live) { onScroll(); renderStory(); }
        else { clearStoryStyles(); }
      }

      var target = 0, current = 0, running = false;
      var ticking = false;
      var lastActive = '';

      function storyProgress() {
        var span = story.offsetHeight - sticky.offsetHeight;
        if (span <= 0) { return 0; }
        return clamp((0 - story.getBoundingClientRect().top) / span, 0, 1);
      }

      function renderStory() {
        var p = current;
        var orbitP = clamp(p / STORY_SCALE, 0, 1);

        for (var i = 0; i < STAGES.length; i++) {
          var stage = STAGES[i];
          var enter = sstep(stage.inA[0], stage.inA[1], p);
          var leave = sstep(stage.out[0], stage.out[1], p);
          var opacity = enter * (1 - leave);
          var y = (1 - enter) * 58 - leave * 58;

          stage.el.style.opacity = opacity.toFixed(3);
          stage.el.style.visibility = opacity < 0.008 ? 'hidden' : 'visible';
          stage.el.classList.toggle('is-front', opacity > 0.55);

          for (var j = 0; j < stage.items.length; j++) {
            var factor = 1 + j * 0.26;
            stage.items[j].style.transform = 'translate3d(0,' + (y * factor).toFixed(2) + 'px,0)';
            stage.items[j].style.opacity = clamp(opacity * 1.35 - j * 0.06, 0, 1).toFixed(3);
          }
        }

        var active = p < 0.272 ? 0 : (p < 0.544 ? 1 : 2);
        railTicks.forEach(function (tick, i) { tick.classList.toggle('on', i === active); });

        if (cue) { cue.style.opacity = (1 - sstep(0.005, 0.06, p)).toFixed(3); }
        if (glow) {
          glow.style.transform =
            'translate3d(' + ((p - 0.5) * -9).toFixed(2) + '%,' +
            ((p - 0.5) * 7).toFixed(2) + '%,0) scale(' + (1 + p * 0.18).toFixed(3) + ')';
        }

        var brands = sstep(0.192, 0.384, p);
        var markets = sstep(0.464, 0.672, p);

        orbitRotor.setAttribute('transform', 'rotate(' + (-12 + orbitP * 30).toFixed(2) + ' 200 200)');
        orbitCore.setAttribute('r', (14 + 5 * (1 - brands)).toFixed(2));

        orbitArcA.style.strokeDasharray = CIRC_A;
        orbitArcA.style.strokeDashoffset = (CIRC_A * (1 - brands)).toFixed(2);
        orbitArcA.style.strokeOpacity = (.88 * brands).toFixed(3);
        orbitArcB.style.strokeDasharray = CIRC_B;
        orbitArcB.style.strokeDashoffset = (CIRC_B * (1 - markets)).toFixed(2);
        orbitArcB.style.strokeOpacity = (.76 * markets).toFixed(3);

        for (var a = 0; a < orbitNodesA.length; a++) {
          var pa = sstep(0.224 + a * 0.048, 0.40 + a * 0.048, p);
          orbitNodesA[a].setAttribute('r', (10 * (pa + 0.26 * Math.sin(pa * Math.PI))).toFixed(2));
          orbitNodesA[a].style.opacity = pa.toFixed(3);
          if (orbitSpokesA[a]) { orbitSpokesA[a].style.opacity = (pa * .9).toFixed(3); }
        }
        for (var b = 0; b < orbitNodesB.length; b++) {
          var pb = sstep(0.496 + b * 0.036, 0.672 + b * 0.036, p);
          orbitNodesB[b].setAttribute('r', (7 * (pb + 0.26 * Math.sin(pb * Math.PI))).toFixed(2));
          orbitNodesB[b].style.opacity = pb.toFixed(3);
          if (orbitSpokesB[b]) { orbitSpokesB[b].style.opacity = (pb * .8).toFixed(3); }
        }

        story.style.setProperty('--p', p.toFixed(4));
      }

      function tickLoop() {
        var delta = target - current;
        if (Math.abs(delta) < 0.00035) {
          current = target;
          renderStory();
          running = false;
          return;
        }
        current += delta * 0.13;
        renderStory();
        requestAnimationFrame(tickLoop);
      }

      function sections() {
        return links.map(function (link) {
          var el = document.getElementById(link.getAttribute('data-nav'));
          return { id: link.getAttribute('data-nav'), el: el };
        }).filter(function (section) { return !!section.el; });
      }
      var secs = sections();

      function update() {
        ticking = false;
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        var navH = header ? header.offsetHeight : 78;

        if (!live && hero && !reduce.matches) {
          hero.style.setProperty('--p', clamp(y / Math.max(1, hero.offsetHeight), 0, 1).toFixed(4));
        }

        var solid = hero ? hero.getBoundingClientRect().bottom <= navH + 120 : y > 64;
        header.classList.toggle('is-solid', solid || nav.classList.contains('is-open'));

        var max = document.documentElement.scrollHeight - window.innerHeight;
        var page = max > 0 ? clamp(y / max, 0, 1) : 0;
        if (bar) { bar.style.setProperty('--sp', page.toFixed(4)); }

        var lineY = y + navH + 40;
        var active = secs.length ? secs[0].id : '';
        for (var i = 0; i < secs.length; i++) {
          if (secs[i].el.offsetTop <= lineY) { active = secs[i].id; }
        }
        if (active !== lastActive) {
          lastActive = active;
          links.forEach(function (link) {
            if (link.getAttribute('data-nav') === active) { link.setAttribute('aria-current', 'true'); }
            else { link.removeAttribute('aria-current'); }
          });
        }
      }

      function onScroll() {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
        if (!live) { return; }
        target = storyProgress();
        if (!running) { running = true; requestAnimationFrame(tickLoop); }
      }

      var STAGE_FOCUS = [0, 0.288, 0.56];

      function stageScrollTop(idx) {
        var span = story.offsetHeight - sticky.offsetHeight;
        var top = window.pageYOffset + story.getBoundingClientRect().top;
        return Math.max(0, Math.round(top + (STAGE_FOCUS[idx] || 0) * span));
      }

      listen(document, 'click', function (event) {
        if (!live || !event.target || !event.target.closest) { return; }
        var anchor = event.target.closest('a[href^="#"]');
        if (!anchor) { return; }
        var id = anchor.getAttribute('href').slice(1);
        if (!id) { return; }
        var stage = document.getElementById(id);
        if (!stage || !stage.hasAttribute('data-hero-stage')) { return; }
        event.preventDefault();
        window.scrollTo({ top: stageScrollTop(+stage.getAttribute('data-hero-stage')) });
        try { history.replaceState(null, '', '#' + id); } catch (e) {}
      });

      /* ==== WHOLESALE MODAL — start ====
         The two "Wholesale inquiry" buttons are found by where they sit rather
         than by a hook in the markup, so the CTAs themselves are untouched and
         the nav's own "Wholesale" link is left alone.
    
         <dialog>.showModal() owns the top layer, the backdrop, the focus trap and
         Escape. What is left for us: the trigger, the focus hand-off and hand-back,
         the scroll lock, the validation, the API request and the confirmation. Where showModal is
         missing the buttons simply keep their hrefs.
         ===================================================================== */
      var wmDlg  = document.getElementById('wholesale-modal');
      var wmForm = document.getElementById('wholesale-form');
      var wmBody = document.getElementById('wmodal-body');
      var wmDone = document.getElementById('wmodal-done');
      var wmStatus = document.getElementById('wm-status');
      var wmSubmit = wmForm ? wmForm.querySelector('button[type="submit"]') : null;
      var wmSubmitLabel = wmForm ? wmForm.querySelector('[data-wm-submit-label]') : null;
      var wmOpener = null;
      var wmScrollY = 0;
      var WM_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
      if (wmDlg && wmForm && typeof wmDlg.showModal === 'function') {
        var wmTriggers = Array.prototype.slice.call(
          document.querySelectorAll('[data-wholesale-trigger]')
        );
    
        var wmFields = Array.prototype.slice.call(wmForm.querySelectorAll('[data-field]')).map(function (f) {
          return { box: f, input: f.querySelector('input, textarea'), err: f.querySelector('.field__err') };
        });
    
        function wmSetError(f, msg) {
          f.box.classList.toggle('is-bad', !!msg);
          if (f.err) { f.err.textContent = msg || ''; }
          if (f.input) {
            if (msg) { f.input.setAttribute('aria-invalid', 'true'); }
            else { f.input.removeAttribute('aria-invalid'); }
          }
        }
    
        function wmValidate(f) {
          if (!f.input || !f.input.required) { return true; }
          var v = f.input.value.trim();
          if (!v) {
            wmSetError(f, f.input.type === 'email' ? messages.requiredEmail : messages.requiredName);
            return false;
          }
          if (f.input.type === 'email' && !WM_EMAIL.test(v)) {
            wmSetError(f, messages.invalidEmail);
            return false;
          }
          wmSetError(f, '');
          return true;
        }
    
        function wmReset() {
          wmForm.reset();
          wmFields.forEach(function (f) { wmSetError(f, ''); });
          wmBody.hidden = false;
          wmDone.hidden = true;
          if (wmStatus) { wmStatus.hidden = true; wmStatus.textContent = ''; }
          if (wmSubmit) { wmSubmit.disabled = false; wmSubmit.removeAttribute('aria-busy'); }
          if (wmSubmitLabel) { wmSubmitLabel.textContent = messages.submit; }
        }
    
        function wmOpen(trigger) {
          wmOpener = trigger || null;
          wmReset();
          /* the lock freezes the page where it is; remember it so a browser that
             forgets the offset behind the top layer still comes back to it */
          wmScrollY = window.pageYOffset || 0;
          root.classList.add('wm-locked');
          wmDlg.showModal();
          var first = document.getElementById('wm-name');
          /* every focus() here is preventScroll: the page underneath must not move
             because something in the top layer, or the opener behind it, was focused */
          if (first) { first.focus({ preventScroll: true }); }
        }
    
        wmTriggers.forEach(function (t) {
          listen(t, 'click', function (ev) {
            ev.preventDefault();
            wmOpen(t);
          });
        });
    
        listen(wmDlg, 'click', function (ev) {
          /* a click on the backdrop lands on the dialog box itself */
          if (ev.target === wmDlg) { wmDlg.close(); }
        });
    
        listen(wmForm, 'click', function (ev) {
          var b = ev.target.closest ? ev.target.closest('[data-wm-close]') : null;
          if (b) { wmDlg.close(); }
        });
    
        /* clear a message as soon as the field it belongs to is put right */
        wmFields.forEach(function (f) {
          if (!f.input || !f.input.required) { return; }
          listen(f.input, 'input', function () {
            if (f.box.classList.contains('is-bad')) { wmValidate(f); }
          });
          listen(f.input, 'blur', function () {
            if (f.input.value.trim()) { wmValidate(f); }
          });
        });
    
        listen(wmForm, 'submit', async function (ev) {
          ev.preventDefault();
          var bad = null;
          wmFields.forEach(function (f) {
            if (!wmValidate(f) && !bad) { bad = f; }
          });
          if (bad) { if (bad.input) { bad.input.focus({ preventScroll: true }); } return; }
          if (wmStatus) { wmStatus.hidden = true; wmStatus.textContent = ''; }
          if (wmSubmit) { wmSubmit.disabled = true; wmSubmit.setAttribute('aria-busy', 'true'); }
          if (wmSubmitLabel) { wmSubmitLabel.textContent = messages.sending; }

          var formData = new FormData(wmForm);
          var payload = {};
          formData.forEach(function (value, key) { payload[key] = String(value); });

          try {
            var response = await fetch('/api/inquiry', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (!response.ok) { throw new Error('Inquiry request failed'); }
            wmBody.hidden = true;
            wmDone.hidden = false;
            wmDone.focus({ preventScroll: true });
          } catch (error) {
            if (wmStatus) { wmStatus.textContent = messages.failure; wmStatus.hidden = false; }
            if (wmSubmit) { wmSubmit.disabled = false; wmSubmit.removeAttribute('aria-busy'); }
            if (wmSubmitLabel) { wmSubmitLabel.textContent = messages.submit; }
          }
        });
    
        listen(wmDlg, 'close', function () {
          root.classList.remove('wm-locked');
          if (wmOpener) { wmOpener.focus({ preventScroll: true }); wmOpener = null; }
          if (Math.abs((window.pageYOffset || 0) - wmScrollY) > 1) { window.scrollTo(0, wmScrollY); }
          /* the story's rAF guards may have been idled behind the top layer */
          resync();
        });
      }
      /* ==== WHOLESALE MODAL — end ==== */
    
      /* ---------- dignified reveals ------------------------------------- */
      var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
      if (!('IntersectionObserver' in window) || reduce.matches) {
        targets.forEach(function (el) { el.classList.add('is-in'); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
        targets.forEach(function (el) { io.observe(el); });
      }
    
      /* ---------- mobile menu ------------------------------------------- */
      function setMenu(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) { header.classList.add('is-solid'); } else { update(); }
      }
    
      listen(toggle, 'click', function () {
        setMenu(toggle.getAttribute('aria-expanded') !== 'true');
      });
    
      listen(nav, 'click', function (e) {
        var a = e.target.closest ? e.target.closest('a') : null;
        if (a && nav.classList.contains('is-open')) { setMenu(false); }
      });
    
      listen(document, 'keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
      });
    
      listen(document, 'click', function (e) {
        if (!nav.classList.contains('is-open')) { return; }
        if (nav.contains(e.target) || toggle.contains(e.target)) { return; }
        /* flipping the theme from the open drawer should not dismiss it */
        if (themeBtn && themeBtn.contains(e.target)) { return; }
        setMenu(false);
      });
    
      var wide = window.matchMedia('(min-width: 901px)');
      var onWide = function (m) { if (m.matches) { setMenu(false); } };
      if (wide.addEventListener) { listen(wide, 'change', onWide); }
      else if (wide.addListener) { listenMedia(wide, onWide); }
    
      /* dead links stay put instead of jumping to the top */
      listen(document, 'click', function (e) {
        var a = e.target.closest ? e.target.closest('a[href="#"], a[href="#imprint"], a[href="#privacy"]') : null;
        if (a) { e.preventDefault(); }
      });
    
      /* ---------- wiring ------------------------------------------------- */
      function onResize() {
        secs = sections();
        if (window.innerWidth > 900 && nav.classList.contains('is-open')) { setMenu(false); }
        setMode();
        if (live) { target = current = storyProgress(); renderStory(); }
        onScroll();
      }
    
      var rt;
      listen(window, 'resize', function () {
        clearTimeout(rt);
        rt = setTimeout(onResize, 120);
      }, { passive: true });
      listen(window, 'scroll', onScroll, { passive: true });
    
      /* A hidden tab or a bfcache restore freezes requestAnimationFrame, which can
         leave a frame request permanently pending. Drop both guards before asking
         for a fresh one, or the page would never repaint on scroll again. */
      function resync() {
        ticking = false;
        running = false;
        onScroll();
      }
      listen(window, 'load', resync);
      listen(window, 'pageshow', resync);
      listen(document, 'visibilitychange', function () {
        if (!document.hidden) { resync(); }
      });
    
      if (mqSize.addEventListener) {
        listen(mqSize, 'change', onResize);
        listen(reduce, 'change', onResize);
      } else if (mqSize.addListener) {
        listenMedia(mqSize, onResize);
        listenMedia(reduce, onResize);
      }
    
      setMode();
      if (live) { target = current = storyProgress(); renderStory(); }
      update();
      onScroll();

    return function cleanup() {
      devStop();
      clearTimeout(rt);
      cleanups.forEach(function (cleanup) { cleanup(); });
      rafs.forEach(function (id) { window.cancelAnimationFrame(id); });
      rafs.clear();
      if (typeof io !== 'undefined' && io) { io.disconnect(); }
      if (wmDlg && wmDlg.open) { wmDlg.close(); }
      root.classList.remove('wm-locked');
      clearStoryStyles();
      story.classList.remove('is-live');
      if (hero) { hero.style.removeProperty('--p'); }
    };
  }, [messages]);

  return null;
}
