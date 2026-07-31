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
          themeBtn.setAttribute('aria-label', label);
          themeBtn.setAttribute('title', label);
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
    
      /* Following the OS is parked with the toggle — an appearance change at dusk
         must not repaint the page under the visitor. Uncomment to restore it. */
      /*
      function onSchemeChange(e) {
        if (!storedTheme()) { applyTheme(e.matches ? 'dark' : 'light', false); }
      }
      if (darkQuery.addEventListener) { listen(darkQuery, 'change', onSchemeChange); }
      else if (darkQuery.addListener) { listenMedia(darkQuery, onSchemeChange); }
      */
    
      /* ==== HERO DEVICE MOTIF — start ====
         The featured form advances on a slow timer, nothing more. No observer is
         involved anywhere: the stage is already complete from the markup, and the
         timer simply skips a beat while the tab is hidden or the hero has left the
         viewport — which also covers the widths where the stage is display:none.
         ===================================================================== */
      var devStage = document.getElementById('hero-devices');
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
        if (document.hidden) { return; }
        var box = devStage.getBoundingClientRect();
        if (box.bottom < 40 || box.top > (window.innerHeight || 0)) { return; }
        devShow((devAt + 1) % devForms.length);
      }
    
      function devStop() { if (devTimer) { clearInterval(devTimer); devTimer = null; } }
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
      /* ==== HERO DEVICE MOTIF — end ==== */
    
      /* =====================================================================
         THE RUNWAY
         Two scenes on one pinned stage. `.is-live` is only added where the
         choreography can be good; otherwise the scenes are two plain stacked
         blocks and the map draws itself off its own position in the viewport.
         ===================================================================== */
      var runway = document.getElementById('runway');
      var sticky = runway.querySelector('.runway__sticky');
      var glow   = runway.querySelector('.runway__glow');
      var rail   = document.getElementById('runway-rail');
      var ticks  = Array.prototype.slice.call(runway.querySelectorAll('[data-tick]'));
    
      /* Scene windows, in track progress. The track is 190vh, so the portfolio
         gets a short hold and hands over at 0.16–0.32; everything after that
         belongs to the map. The hand-over windows are identical on purpose —
         one scene's fade-out is exactly the other's fade-in, so the two opacities
         always sum to 1 and the stage is never dim at rest. */
      var SCENES = Array.prototype.slice.call(runway.querySelectorAll('.scene')).map(function (el, i) {
        var win = [
          { inA: [-0.10, -0.02], out: [0.16, 0.32] },
          { inA: [ 0.16,  0.32], out: [1.40, 1.50] }
        ][i];
        return {
          el: el,
          items: Array.prototype.slice.call(el.querySelectorAll('[data-anim]')),
          inA: win.inA,
          out: win.out
        };
      });
    
      /* ---------- the self-drawing route map ---------------------------- */
      var map    = document.getElementById('rmap');
      var mapFig = map.parentNode;
      var routes = Array.prototype.slice.call(map.querySelectorAll('.rt')).map(function (p) {
        var len = 0;
        try { len = p.getTotalLength(); } catch (e) { len = 0; }
        return { el: p, len: len, a: parseFloat(p.getAttribute('data-a')), b: parseFloat(p.getAttribute('data-b')) };
      });
      var mapNodes = Array.prototype.slice.call(map.querySelectorAll('.node[data-at]'));
      var packetsOn = false;
    
      function startPackets() {
        ['rmap-pm1', 'rmap-pm2'].forEach(function (id) {
          var m = document.getElementById(id);
          if (m && m.beginElement) { try { m.beginElement(); } catch (e) {} }
        });
      }
    
      /* mp: 0 → 1, the map's own drawing progress */
      function drawMap(mp) {
        for (var i = 0; i < routes.length; i++) {
          var r = routes[i];
          if (!r.len) { continue; }
          var local = clamp((mp - r.a) / (r.b - r.a), 0, 1);
          r.el.style.strokeDasharray  = r.len + ' ' + r.len;
          r.el.style.strokeDashoffset = (r.len * (1 - local)).toFixed(2);
        }
        for (var j = 0; j < mapNodes.length; j++) {
          mapNodes[j].classList.toggle('on', mp >= parseFloat(mapNodes[j].getAttribute('data-at')));
        }
        map.classList.toggle('is-open', mp > 0.94);
        if (mp > 0.94 && !packetsOn) { packetsOn = true; startPackets(); }
      }
    
      function staticMap() {
        map.classList.add('is-static', 'is-open');
        routes.forEach(function (r) {
          r.el.style.strokeDasharray = '';
          r.el.style.strokeDashoffset = '';
        });
        mapNodes.forEach(function (n) { n.classList.add('on'); });
        if (!packetsOn && !reduce.matches) { packetsOn = true; startPackets(); }
      }
    
      /* stacked mode: the figure draws itself as it travels up the viewport */
      function mapProgressInFlow() {
        var r = mapFig.getBoundingClientRect();
        var vh = window.innerHeight || 1;
        var start = vh * 0.94;
        var end   = vh * 0.24;
        return clamp((start - r.top) / Math.max(1, start - end), 0, 1);
      }
    
      /* ---------- live-mode gate ---------------------------------------- */
      var mqSize   = window.matchMedia('(min-width: 1000px) and (min-height: 640px)');
      var live = false;
    
      function shouldBeLive() { return mqSize.matches && !reduce.matches; }
    
      function clearRunwayStyles() {
        SCENES.forEach(function (s) {
          s.el.style.opacity = '';
          s.el.style.visibility = '';
          s.el.classList.remove('is-front');
          s.items.forEach(function (it) { it.style.transform = ''; it.style.opacity = ''; });
        });
        if (glow) { glow.style.transform = ''; }
        if (rail) { rail.style.setProperty('--rp', 0); }
        ticks.forEach(function (t) { t.classList.remove('on'); });
      }
    
      /* the map is either scroll-drawn or simply complete; keep the two in step
         when the motion preference itself changes mid-session */
      function syncMotion() {
        if (reduce.matches) { staticMap(); }
        else { map.classList.remove('is-static'); }
      }
    
      function setMode() {
        var next = shouldBeLive();
        if (next === live) { return; }
        live = next;
        runway.classList.toggle('is-live', live);
        if (live) { onScroll(); renderRunway(); }
        else { clearRunwayStyles(); }
      }
    
      /* ---------- scroll progress → eased value → render ---------------- */
      var target = 0, current = 0, running = false;
    
      function runwayProgress() {
        var span = runway.offsetHeight - sticky.offsetHeight;
        if (span <= 0) { return 0; }
        var navH = header ? header.offsetHeight : 78;
        return clamp((navH - runway.getBoundingClientRect().top) / span, 0, 1);
      }
    
      function renderRunway() {
        var p = current;
    
        for (var i = 0; i < SCENES.length; i++) {
          var s = SCENES[i];
          var enter = sstep(s.inA[0], s.inA[1], p);
          var leave = sstep(s.out[0], s.out[1], p);
          var op = enter * (1 - leave);
          var y  = (1 - enter) * 54 - leave * 54;
    
          s.el.style.opacity = op.toFixed(3);
          s.el.style.visibility = op < 0.008 ? 'hidden' : 'visible';
          s.el.classList.toggle('is-front', op > 0.55);
    
          for (var j = 0; j < s.items.length; j++) {
            var f = 1 + j * 0.24;
            s.items[j].style.transform = 'translate3d(0,' + (y * f).toFixed(2) + 'px,0)';
            s.items[j].style.opacity = clamp(op * 1.4 - j * 0.05, 0, 1).toFixed(3);
          }
        }
    
        /* rail: fill follows the whole runway, ticks mark the two scenes */
        if (rail) { rail.style.setProperty('--rp', p.toFixed(4)); }
        var activeScene = p < 0.24 ? 0 : 1;   /* the mid-point of the hand-over */
        for (var t = 0; t < ticks.length; t++) { ticks[t].classList.toggle('on', t <= activeScene); }
    
        /* ambient daylight drifts with the story */
        if (glow) {
          glow.style.transform =
            'translate3d(' + ((p - 0.5) * -8).toFixed(2) + '%,' + ((p - 0.5) * 6).toFixed(2) + '%,0) scale(' + (1 + p * 0.14).toFixed(3) + ')';
        }
    
        /* the map draws across everything after the hand-over — the largest share
           of the track — and its last route lands well before the pin releases */
        drawMap(sstep(0.30, 0.88, p));
      }
    
      function tickLoop() {
        var d = target - current;
        if (Math.abs(d) < 0.00035) {
          current = target;
          renderRunway();
          running = false;
          return;
        }
        current += d * 0.13;            /* eased follow — the motion never snaps */
        renderRunway();
        requestAnimationFrame(tickLoop);
      }
    
      /* ---------- page-level scroll: hero parallax, header, progress ----- */
      var ticking = false;
      var lastActive = '';
    
      function sections() {
        return links.map(function (a) {
          var el = document.getElementById(a.getAttribute('data-nav'));
          return { id: a.getAttribute('data-nav'), el: el };
        }).filter(function (s) { return !!s.el; });
      }
      var secs = sections();
    
      function update() {
        ticking = false;
    
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        var heroH = hero ? hero.offsetHeight : 1;
    
        /* hero progress 0 -> 1 across its own height */
        if (hero && !reduce.matches) {
          hero.style.setProperty('--p', clamp(y / Math.max(1, heroH), 0, 1).toFixed(4));
        }
    
        /* header becomes solid just before the hero leaves the viewport top */
        var navH = header ? header.offsetHeight : 78;
        var solid = y > Math.max(64, heroH - navH - 120);
        header.classList.toggle('is-solid', solid || nav.classList.contains('is-open'));
    
        /* reading progress */
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var sp = max > 0 ? clamp(y / max, 0, 1) : 0;
        if (bar) { bar.style.setProperty('--sp', sp.toFixed(4)); }
    
        /* active nav item */
        var lineY = y + navH + 40;
        var active = secs.length ? secs[0].id : '';
        for (var i = 0; i < secs.length; i++) {
          if (secs[i].el.offsetTop <= lineY) { active = secs[i].id; }
        }
        if (active !== lastActive) {
          lastActive = active;
          links.forEach(function (a) {
            if (a.getAttribute('data-nav') === active) { a.setAttribute('aria-current', 'true'); }
            else { a.removeAttribute('aria-current'); }
          });
        }
    
        /* the map, when the runway is not pinned */
        if (!live && !reduce.matches) { drawMap(mapProgressInFlow()); }
      }
    
      function onScroll() {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
        if (!live) { return; }
        target = runwayProgress();
        if (!running) { running = true; requestAnimationFrame(tickLoop); }
      }
    
      /* =====================================================================
         Runway anchors. On the pinned stage a scene is a position on the
         scroll track rather than a box in the flow, so a link to one scrolls
         to the point where that scene is on screen. Stacked, the plain
         anchor is already right.
    
         Both values are positions on the shortened track: 0.02 is inside the
         portfolio's hold, 0.60 is far enough into the map for the figure to have
         something on it and early enough that the rest still draws as you go.
         ===================================================================== */
      var SCENE_FOCUS = [0.02, 0.60];
    
      function sceneScrollTop(idx) {
        var span = runway.offsetHeight - sticky.offsetHeight;
        var top  = window.pageYOffset + runway.getBoundingClientRect().top;
        return Math.max(0, Math.round(top - (header ? header.offsetHeight : 78) + (SCENE_FOCUS[idx] || 0) * span));
      }
    
      listen(document, 'click', function (ev) {
        if (!live || !ev.target || !ev.target.closest) { return; }
        var a = ev.target.closest('a[href^="#"]');
        if (!a) { return; }
        var id = a.getAttribute('href').slice(1);
        if (!id) { return; }
        var el = document.getElementById(id);
        if (!el || !el.hasAttribute('data-scene')) { return; }
        ev.preventDefault();
        /* no explicit behavior: follow the document's own scroll-behavior,
           smooth by CSS and auto under prefers-reduced-motion */
        window.scrollTo({ top: sceneScrollTop(+el.getAttribute('data-scene')) });
        try { history.replaceState(null, '', '#' + id); } catch (e) {}
      });
    
      /* ==== WHOLESALE MODAL — start ====
         The two "Wholesale inquiry" buttons are found by where they sit rather
         than by a hook in the markup, so the CTAs themselves are untouched and
         the nav's own "Wholesale" link is left alone.
    
         <dialog>.showModal() owns the top layer, the backdrop, the focus trap and
         Escape. What is left for us: the trigger, the focus hand-off and hand-back,
         the scroll lock, the validation and the confirmation. Where showModal is
         missing the buttons simply keep their hrefs.
         ===================================================================== */
      var wmDlg  = document.getElementById('wholesale-modal');
      var wmForm = document.getElementById('wholesale-form');
      var wmBody = document.getElementById('wmodal-body');
      var wmDone = document.getElementById('wmodal-done');
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
    
        listen(wmForm, 'submit', function (ev) {
          ev.preventDefault();          /* demo-inert: nothing leaves the page */
          var bad = null;
          wmFields.forEach(function (f) {
            if (!wmValidate(f) && !bad) { bad = f; }
          });
          if (bad) { if (bad.input) { bad.input.focus({ preventScroll: true }); } return; }
          wmBody.hidden = true;
          wmDone.hidden = false;
          wmDone.focus({ preventScroll: true });
        });
    
        listen(wmDlg, 'close', function () {
          root.classList.remove('wm-locked');
          if (wmOpener) { wmOpener.focus({ preventScroll: true }); wmOpener = null; }
          if (Math.abs((window.pageYOffset || 0) - wmScrollY) > 1) { window.scrollTo(0, wmScrollY); }
          /* the runway's rAF guards may have been idled behind the top layer */
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
        if (a && a.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
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
        syncMotion();
        setMode();
        if (live) { target = current = runwayProgress(); renderRunway(); }
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
    
      syncMotion();
      setMode();
      if (live) { target = current = runwayProgress(); renderRunway(); }
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
      clearRunwayStyles();
      runway.classList.remove('is-live');
      if (hero) { hero.style.removeProperty('--p'); }
    };
  }, [messages]);

  return null;
}

