/* km-track.js — Kira Mei first-party analytics, ~3kb, no deps */
(function () {
  var ENDPOINT = '/api/track';
  var SCROLL_STEPS = [0.25, 0.5, 0.75, 1.0];

  // ── Cookie helpers ──────────────────────────────────────
  function getCookie(name) {
    var v = document.cookie.match('(?:^|;) *' + name + '=([^;]*)');
    return v ? decodeURIComponent(v[1]) : null;
  }

  function setCookie(name, value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp + ';path=/;SameSite=Lax';
  }

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // ── IDs ─────────────────────────────────────────────────
  var visitorId = getCookie('km_v');
  if (!visitorId) { visitorId = uuid(); setCookie('km_v', visitorId, 365); }

  var sessionId = getCookie('km_s');
  if (!sessionId) { sessionId = uuid(); setCookie('km_s', sessionId, 1); }

  // ── Send ────────────────────────────────────────────────
  function send(payload) {
    var data = Object.assign({
      session_id: sessionId,
      visitor_id: visitorId,
      path: location.pathname,
      referrer: document.referrer || null,
    }, payload);

    // utm from query string
    var params = new URLSearchParams(location.search);
    if (params.get('utm_source')) data.utm_source = params.get('utm_source');
    if (params.get('utm_campaign')) data.utm_campaign = params.get('utm_campaign');

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, JSON.stringify(data));
    } else {
      fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(data), keepalive: true }).catch(function () {});
    }
  }

  // ── Pageview ─────────────────────────────────────────────
  send({ kind: 'pageview' });

  // ── Click tracking ───────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document.body) {
      if (el.dataset && el.dataset.track) {
        send({ kind: 'click', target: el.dataset.track });
        break;
      }
      el = el.parentElement;
    }
  }, { passive: true });

  // ── Scroll depth ─────────────────────────────────────────
  var maxScroll = 0;
  var sentSteps = [];

  function onScroll() {
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    var depth = Math.min(1, (window.scrollY || window.pageYOffset) / docH);
    if (depth > maxScroll) maxScroll = depth;

    SCROLL_STEPS.forEach(function (step) {
      if (maxScroll >= step && sentSteps.indexOf(step) === -1) {
        sentSteps.push(step);
        send({ kind: 'scroll', meta: { depth: step } });
      }
    });
  }

  var scrollTimer;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(onScroll, 200);
  }, { passive: true });

  // ── Checkout abandon ─────────────────────────────────────
  if (location.pathname === '/checkout') {
    var completed = false;
    window.addEventListener('km:purchase', function () { completed = true; });
    window.addEventListener('pagehide', function () {
      if (!completed) send({ kind: 'checkout_abandon' });
    });
  }

  // Expose send for server-triggered events
  window.kmTrack = send;
})();
