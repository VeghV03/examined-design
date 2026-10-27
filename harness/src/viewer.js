/* examined-design viewer. Reads DATA (hand-kept fields) and DATA.derived (computed by
   harness/build.py, never edited). Views: map, screen, product, overview, open.
   #board=Name[&theme=dark] renders one board alone, at full size, for checks and renders. */
(function(){
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect,
      useRef = React.useRef, useMemo = React.useMemo, useCallback = React.useCallback;

  var META = DATA.meta || {};
  var FW = (META.frame && META.frame.w) || 1280, FH = (META.frame && META.frame.h) || 800;
  document.documentElement.style.setProperty('--fw', FW + 'px');
  document.documentElement.style.setProperty('--fh', FH + 'px');
  var D = DATA.derived || { screens:{}, steps:{}, counts:{}, nTrouble:0, register:[],
                            components:[], places:[], entrances:[] };
  var SOURCE = META.source || null;                 // {label, short, url}
  var SRC_SHORT = (SOURCE && SOURCE.short) || 'scope';
  var CHECKED = META.checkedLabel || 'Checked';

  var KIND = { gap:['Not drawn','var(--app-warn)'], redraw:['Redraw','var(--app-bad)'],
               note:['Copy fix','var(--app-warn)'], new:['New','var(--app-new)'],
               checked:['Checked','var(--app-in)'] };
  var TONE = { redraw:'var(--app-bad)', note:'var(--app-warn)', new:'var(--app-new)',
               checked:'var(--app-in)' };
  var TONE_LABEL = { redraw:'Redraw', note:'Copy fix', new:'New', checked:CHECKED };

  // One record per screen: the hand-kept fields with the computed ones laid over them.
  var SCR = {};
  Object.keys(DATA.screens).forEach(function(n){
    var s = {}, a = DATA.screens[n], b = D.screens[n] || {};
    for(var k in a) s[k] = a[k];
    for(var k2 in b) s[k2] = b[k2];
    s.steps = (a.steps || []).map(function(p){
      var J = (DATA.journeys || []).filter(function(x){ return x.id === p[0]; })[0] || {};
      var S = (J.steps || []).filter(function(x){ return x.id === p[1]; })[0] || {};
      return { j:p[0], s:p[1], jn:J.name || p[0], sn:S.title || p[1] };
    });
    s.out = b.out || []; s['in'] = b['in'] || []; s.made = b.made || []; s.find = b.find || {};
    if(/class="win theme-dark"/.test(s.html || ''))
      s.html = s.html.replace('class="win theme-dark"', 'class="win theme-dark" data-borndark="1"');
    SCR[n] = s;
  });
  var ALL = Object.keys(SCR);
  var START = (META.start && SCR[META.start]) ? META.start
            : ((D.entrances[0] || [])[0] || ALL[0]);
  var HOME = (META.home && SCR[META.home]) ? META.home : ((D.places[0] || {}).id || ALL[0]);

  // The happy-path switch hides only screens classified as a thing that went wrong.
  function vis(list, happyOnly){
    if(!happyOnly) return list;
    return list.filter(function(n){ return !(SCR[n] || {}).trouble; });
  }

  // Journeys with their steps, each step carrying the screens and gaps the build filed under it.
  var LANES = (DATA.journeys || []).map(function(J){
    return { id:J.id, name:J.name, end:J.end || '', gates:J.gates || [], inScope:J.inScope !== false,
      steps:(J.steps || []).map(function(st){
        var k = J.id + '|' + st.id, d = D.steps[k] || { screens:[], gaps:[] };
        return { id:st.id, title:st.title, does:st.does || '', clear:st.clear || '',
                 gates:st.gates || [], screens:d.screens || [], gaps:d.gaps || [] };
      }) };
  });
  var STEP_OF = {}, LANE_OF = {};
  LANES.forEach(function(L){
    LANE_OF[L.id] = L;
    L.steps.forEach(function(st){ STEP_OF[L.id + '|' + st.id] = st; });
  });
  var GATES = DATA.gates || {};
  function gateQ(g){ var x = GATES[g]; return x ? (x.question || x) : g; }
  function gateDraft(g){ var x = GATES[g]; return !!(x && x.draft); }

  // Board-only mode: no chrome, no hotspots, full size.
  var bm = /(?:^#|&)board=([^&]+)/.exec(location.hash || '');
  if(bm){
    var name = decodeURIComponent(bm[1]);
    var dark = /(?:^#|&)theme=dark/.test(location.hash);
    document.body.className = 'p-boardonly';
    var s0 = SCR[name];
    ReactDOM.createRoot(document.getElementById('root')).render(
      h('div',{className:'p-alone', id:'board', 'data-board':name,
        ref:function(el){ if(!el) return;
          el.querySelectorAll('.win').forEach(function(w){
            if(dark) w.classList.add('theme-dark');
            else if(!w.hasAttribute('data-borndark')) w.classList.remove('theme-dark'); }); },
        dangerouslySetInnerHTML:{__html: s0 ? s0.html : '<p>No board named ' + name + '</p>'}}));
    return;
  }

  function useFit(ref, deps){
    var s = useState(1), scale = s[0], set = s[1];
    useEffect(function(){
      function fit(){
        var el = ref.current; if(!el) return;
        var p = el.parentElement && el.parentElement.parentElement; if(!p) return;
        set(Math.min((p.clientWidth - 52)/FW, (p.clientHeight - 52)/FH));
      }
      fit(); window.addEventListener('resize', fit);
      return function(){ window.removeEventListener('resize', fit); };
    }, deps || []);
    return scale;
  }

  // Bind (label -> target) rules onto the board markup by finding the deepest element
  // whose trimmed text is the label, then promoting to the control that contains it.
  // No board markup is ever edited. harness/build.py applies the same rule and refuses
  // to build when a label does not bind, so a miss here means the file was edited by hand.
  function bindHotspots(root, rules, go){
    if(!root) return [];
    root.querySelectorAll('[data-hot]').forEach(function(n){
      ['data-hot','title','tabindex','role','aria-label'].forEach(function(a){ n.removeAttribute(a); });
      n.onkeydown = null; n.onclick = null;
    });
    var all = Array.prototype.slice.call(root.querySelectorAll('*')), miss = [];
    rules.forEach(function(r){
      var label = r[0], target = r[1], scope = r[2];
      var hits = all.filter(function(el){
        if(el.getAttribute('data-hot')) return false;
        if(scope && !el.closest(scope)) return false;
        if((el.textContent||'').trim() !== label) return false;
        for(var i=0;i<el.children.length;i++){
          if((el.children[i].textContent||'').trim() === label) return false;
        }
        return true;
      });
      var bound = 0;
      hits.forEach(function(el){
        var t = el.closest('.btn,.nav,.tr,li,a,button');
        if(t && t.getBoundingClientRect().height <= 64) el = t;
        if(el.getAttribute('data-hot')) return;
        el.setAttribute('data-hot','1');
        el.setAttribute('tabindex','0');
        el.setAttribute('role','link');
        el.setAttribute('aria-label', label + ' — go to ' + target);
        el.setAttribute('title','→ ' + target);
        el.onclick = function(e){ e.stopPropagation(); go(target); };
        el.onkeydown = function(e){
          if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); e.stopPropagation(); go(target); }
        };
        bound++;
      });
      if(!bound) miss.push(label);
    });
    return miss;
  }

  function Board(props){
    var ref = useRef(null), wrap = useRef(null);
    var st = useState(0.2), fit = st[0], setFit = st[1];
    useEffect(function(){
      var el = wrap.current; if(!el || typeof ResizeObserver === 'undefined') return;
      var ro = new ResizeObserver(function(e){ var w = e[0].contentRect.width; if(w > 0) setFit(w / FW); });
      ro.observe(el);
      return function(){ ro.disconnect(); };
    }, []);
    useEffect(function(){
      var el = ref.current; if(!el) return;
      el.querySelectorAll('.win').forEach(function(w){
        if(props.dark) w.classList.add('theme-dark');
        else if(!w.hasAttribute('data-borndark')) w.classList.remove('theme-dark');
      });
    }, [props.name, props.dark]);
    return h('div',{className:'p-thumbwrap', ref:wrap},
      h('div',{className:'p-thumb', ref:ref, style:{transform:'scale('+fit+')'},
        dangerouslySetInnerHTML:{__html: props.html}}));
  }

  // ── map layout: one lane per journey, one column per step, the screens that serve a
  //    step stacked inside its column. A screen serving several steps appears once per
  //    placement; an edge is drawn once, between the closest pair of instances.
  var LANE_L = 150, NW = 152, NH = 28, ROW = 34, SGAP = 178, SHEAD = 36, LPAD = 16;

  function mapLayout(happyOnly){
    var inst = {}, nodes = [], holes = [], lanes = [], heads = [], y = 0;
    LANES.forEach(function(L){
      var tall = 1;
      L.steps.forEach(function(st){ tall = Math.max(tall, vis(st.screens, happyOnly).length + st.gaps.length); });
      var lh = SHEAD + tall*ROW + LPAD;
      lanes.push({ id:L.id, name:L.name, end:L.end, y:y, h:lh, steps:L.steps.length, inScope:L.inScope });
      L.steps.forEach(function(st, ci){
        var x = LANE_L + ci*SGAP, scr = vis(st.screens, happyOnly);
        heads.push({ key:L.id+'|'+st.id, id:st.id, title:st.title, x:x, y:y+6,
          gaps:st.gaps.length, hid:st.screens.length - scr.length });
        scr.forEach(function(n, ri){
          var node = { id:L.id+'|'+st.id+'|'+n, screen:n, lane:L.id, step:st.id, x:x, y:y + SHEAD + ri*ROW };
          nodes.push(node); (inst[n] = inst[n] || []).push(node);
        });
        // a gap sits where the missing screen would, so the hole is part of the shape
        st.gaps.forEach(function(g, gi){
          holes.push({ id:L.id+'|'+st.id+'|gap'+gi, title:g.title, why:g.why,
            x:x, y:y + SHEAD + (scr.length + gi)*ROW });
        });
      });
      y += lh;
    });
    var edges = [];
    Object.keys(DATA.links || {}).forEach(function(src){
      (DATA.links[src] || []).forEach(function(r){
        var tgt = r[1];
        if(src === tgt || !inst[src] || !inst[tgt]) return;
        var best = null;
        inst[src].forEach(function(a){ inst[tgt].forEach(function(b){
          var d = Math.abs(a.x-b.x) + Math.abs(a.y-b.y)*1.6 + (a.lane === b.lane ? 0 : 900);
          if(!best || d < best.d) best = { a:a, b:b, d:d };
        }); });
        if(best) edges.push({ from:src, to:tgt, a:best.a, b:best.b, label:r[0] });
      });
    });
    var W = LANE_L + Math.max.apply(null, [1].concat(LANES.map(function(L){ return L.steps.length; }))) * SGAP + 30;
    return { inst:inst, nodes:nodes, holes:holes, lanes:lanes, heads:heads, edges:edges, W:W, H:y + 24 };
  }
  var MAPS = { all: mapLayout(false), happy: mapLayout(true) };

  // A state is entered by a change of condition, not a click: a dotted tie, not a link.
  function variantTies(M){
    var ties = [];
    M.nodes.forEach(function(nd){
      var v = SCR[nd.screen].variantOf;
      if(!v || !M.inst[v]) return;
      var best = null;
      M.inst[v].forEach(function(pn){
        var d = Math.abs(pn.x-nd.x) + Math.abs(pn.y-nd.y)*1.6 + (pn.lane===nd.lane?0:900);
        if(!best || d < best.d) best = { p:pn, d:d };
      });
      if(best) ties.push({ from:v, to:nd.screen, a:best.p, b:nd });
    });
    return ties;
  }

  function edgePath(a, b){
    var right = b.x >= a.x;
    var x1 = right ? a.x + NW : a.x, y1 = a.y + NH/2;
    var x2 = right ? b.x : b.x + NW,  y2 = b.y + NH/2;
    var dx = Math.max(22, Math.abs(x2-x1) * .42) * (right ? 1 : -1);
    return 'M'+x1+' '+y1+' C'+(x1+dx)+' '+y1+' '+(x2-dx)+' '+y2+' '+x2+' '+y2;
  }

  // #map · #map/B · #open · #open/G1 · #grid · #product · #Name · #B2/Name, with !happy appended
  function readHash(){
    var raw = (location.hash || '').slice(1);
    if(!raw) return null;
    var happy = false;
    if(/!happy$/.test(raw)){ happy = true; raw = raw.replace(/!happy$/, ''); }
    var f = readFrag(raw) || {};
    f.happy = happy;
    return f;
  }
  function readFrag(raw){
    if(!raw) return null;
    var bits = raw.split('/'), head = bits[0], tail = bits[1] ? decodeURIComponent(bits[1]) : '';
    if(head === 'map')  return { view:'map',  lane: tail || null };
    if(head === 'open') return { view:'open', gate: tail || null };
    if(head === 'grid') return { view:'grid' };
    if(head === 'product') return { view:'product' };
    if(bits.length > 1 && SCR[tail]){
      var lane = null;
      LANES.forEach(function(L){ if(STEP_OF[L.id + '|' + head]) lane = L.id; });
      if(lane) return { view:'screen', screen:tail, place: lane + '|' + head };
    }
    var one = decodeURIComponent(head);
    if(SCR[one]) return { view:'screen', screen:one };
    return null;
  }

  // A decision is a record (DATA.decisions[id]) or, in older files, a line of text.
  function decisionView(d, i){
    var rec = typeof d === 'string' ? (DATA.decisions || {})[d] : null;
    if(!rec){
      var lines = String(d).split('\n').filter(function(l){ return l.trim(); });
      return h('div',{key:i, className:'p-dec'},
        h('div',{className:'t'}, (lines[0] || '').replace(/^DECISION — /,'')),
        lines.slice(1).map(function(l, j){ return h('div',{key:j, className:'b'}, l); }));
    }
    var chosen = rec.chosen != null ? (rec.options || []).filter(function(o){ return o.label === rec.chosen; })[0] : null;
    // The case for every option not chosen stays visible after the choice: it is what a
    // later objection is weighed against.
    var others = (rec.options || []).filter(function(o){ return o !== chosen && o.case_for; });
    return h('div',{key:i, className:'p-dec'},
      h('div',{className:'t'}, d + ' · ' + rec.question),
      rec.status === 'open'
        ? h('div',{className:'b', style:{color:'var(--app-warn)'}}, 'Open. Options: ' +
            (rec.options || []).map(function(o){ return o.label; }).join(' · '))
        : h('div',{className:'b'}, 'Chosen: ' + rec.chosen + (chosen && chosen.buys ? ' — buys ' + chosen.buys : '')),
      rec.status === 'reopened' ? h('div',{className:'b', style:{color:'var(--app-warn)'}}, 'Reopened by ' + rec.reopenedBy) : null,
      rec.reopens ? h('div',{className:'b'}, 'Reopens ' + rec.reopens + ' (' + (rec.outcome || '') + '). Objection: ' +
        (rec.objection || '') + ' Why the old answer looked right: ' + (rec.error_theory || '')) : null,
      rec.recommended ? h('div',{className:'b'}, 'Recommended: ' + rec.recommended +
        (rec.chosen != null ? (rec.chosen === rec.recommended ? ' (taken)' : ' (not taken)') : '')) : null,
      rec.explained ? h('div',{className:'b'}, 'Explained back: “' + rec.explained + '”') : null,
      others.map(function(o, j){ return h('div',{key:'c'+j, className:'b'}, 'The case for ' + o.label + ': ' + o.case_for); }),
      rec.right_if ? h('div',{className:'b'}, 'Right if: ' + rec.right_if) : null,
      (rec.by || rec.date || rec.round) ? h('div',{className:'b'},
        [rec.by, rec.date, rec.round && ('round: ' + rec.round)].filter(Boolean).join(', ')) : null);
  }

  function App(){
    var boot = readHash() || {};
    var st = useState(boot.screen || START), cur = st[0], setCur = st[1];
    var vw = useState(boot.view || 'map'), view = vw[0], setView = vw[1];
    var pl = useState(boot.place || null), place = pl[0], setPlace = pl[1];
    var op = useState({}), open = op[0], setOpen = op[1];
    var dk = useState(false), dark = dk[0], setDark = dk[1];
    var sh = useState(true), showHot = sh[0], setShowHot = sh[1];
    var nt = useState(true), notesOn = nt[0], setNotesOn = nt[1];
    var wo = useState(false), whyOpen = wo[0], setWhyOpen = wo[1];
    var hs = useState([]), hist = hs[0], setHist = hs[1];
    var q = useState(''), query = q[0], setQuery = q[1];
    var uz = useState(1), zoom = uz[0], setZoom = uz[1];
    var mz = useState(1), mzoom = mz[0], setMzoom = mz[1];
    var gf = useState(boot.gate || null), gateFocus = gf[0], setGateFocus = gf[1];
    var ml = useState(boot.lane || null), mapLane = ml[0], setMapLane = ml[1];
    var hp = useState(!!boot.happy), happy = hp[0], setHappy = hp[1];
    var co = useState(null), compOpen = co[0], setCompOpen = co[1];
    var mapRef = useRef(null);
    var mn = useState(false), navOpen = mn[0], setNavOpen = mn[1];
    var ms = useState([]), misses = ms[0], setMisses = ms[1];
    var MAP = happy ? MAPS.happy : MAPS.all;
    var stageRef = useRef(null), listRef = useRef(null);
    var fit = useFit(stageRef, [view, notesOn]);
    var scale = fit * zoom;

    var screen = SCR[cur];
    var homes = (screen && screen.steps) || [];
    var inV = vis((screen && screen['in']) || [], happy);
    var outV = ((screen && screen.out) || []).filter(function(o){ return !happy || !(SCR[o[1]] || {}).trouble; });
    var here = null;
    if(place && STEP_OF[place]){
      var pj = place.split('|')[0], ps = place.split('|')[1];
      homes.forEach(function(H){ if(H.j === pj && H.s === ps) here = H; });
    }
    if(!here) here = homes[0] || null;
    var step = here ? STEP_OF[here.j + '|' + here.s] : null;
    var lane = here ? LANE_OF[here.j] : null;

    useEffect(function(){
      var frag;
      if(view === 'map') frag = 'map' + (mapLane ? '/' + mapLane : '');
      else if(view === 'open') frag = 'open' + (gateFocus ? '/' + gateFocus : '');
      else if(view === 'grid') frag = 'grid';
      else if(view === 'product') frag = 'product';
      else frag = (place ? place.split('|')[1] + '/' : '') + encodeURIComponent(cur);
      if(happy) frag += '!happy';
      try{ history.replaceState(null,'','#'+frag); }catch(e){}
    }, [cur, view, place, gateFocus, mapLane, happy]);

    useEffect(function(){
      if(view === 'map' && !mapLane && here) setMapLane(here.j);
      if(view === 'screen' || view === 'grid'){
        var r = listRef.current && listRef.current.querySelector('[aria-current="true"]');
        if(r && r.scrollIntoView) r.scrollIntoView({ block:'nearest' });
      }
      if(view === 'map' && mapRef.current){
        var L = mapLane && MAP.lanes.filter(function(x){ return x.id === mapLane; })[0];
        if(L){ mapRef.current.scrollTo({ top: Math.max(0, L.y * mzoom - 8), left: 0 }); return; }
        var nd = mapRef.current.querySelector('.p-node[data-sel="1"]');
        if(nd && nd.scrollIntoView) nd.scrollIntoView({ block:'center', inline:'center' });
      }
    }, [cur, view, mapLane]);

    // a link pasted into a tab that already has the prototype open must still work
    useEffect(function(){
      function onHash(){
        var f = readHash();
        if(!f) return;
        if(f.view) setView(f.view);
        if(f.gate) setGateFocus(f.gate);
        if(f.lane) setMapLane(f.lane);
        if(f.screen && f.screen !== cur){ setCur(f.screen); }
        if(f.place) setPlace(f.place);
        setHappy(!!f.happy);
      }
      window.addEventListener('hashchange', onHash);
      return function(){ window.removeEventListener('hashchange', onHash); };
    }, [cur]);

    var go = useCallback(function(name, at){
      if(!SCR[name]) return;
      setHist(function(p){ return p.concat([[cur, place]]); });
      setCur(name); setNavOpen(false);
      setPlace(at || null);
      if(view !== 'screen') setView('screen');
      window.setTimeout(function(){ if(stageRef.current) stageRef.current.focus(); }, 0);
    }, [cur, view, place]);

    function back(){
      if(!hist.length) return;
      var prev = hist[hist.length-1];
      setHist(hist.slice(0,-1)); setCur(prev[0]); setPlace(prev[1]); setView('screen');
    }

    // Turning the switch on while standing on a failure state walks up the variant chain:
    // the parent of a failure state is, by construction, the screen it went wrong from.
    function happyHome(name){
      var seen = {};
      while(name && SCR[name] && SCR[name].trouble && !seen[name]){ seen[name] = 1; name = SCR[name].variantOf; }
      return (name && SCR[name] && !SCR[name].trouble) ? name : HOME;
    }
    useEffect(function(){
      if(happy && screen && screen.trouble){
        var t = happyHome(cur);
        if(t !== cur){ setCur(t); setPlace(null); }
      }
    }, [happy]);

    // arrow keys walk the journey you are standing in, in step order
    var laneSeq = useMemo(function(){
      if(!lane) return [];
      var out = [];
      lane.steps.forEach(function(s){
        vis(s.screens, happy).forEach(function(n){
          if(!out.some(function(e){ return e[0] === n; })) out.push([n, lane.id+'|'+s.id]); });
      });
      return out;
    }, [lane && lane.id, happy]);
    var seqIx = laneSeq.findIndex(function(e){ return e[0] === cur; });
    function walk(d){
      if(seqIx < 0 || !laneSeq.length) return;
      var i = Math.max(0, Math.min(laneSeq.length-1, seqIx + d));
      if(i === seqIx) return;
      go(laneSeq[i][0], laneSeq[i][1]);
    }

    var rules = useMemo(function(){
      return (DATA.links[cur] || []).concat((DATA.globalLinks || []).map(function(r){
        return [r[0], r[1], r[2] || null]; }));
    }, [cur]);

    useEffect(function(){
      var root = stageRef.current;
      if(!root || view !== 'screen') return;
      root.querySelectorAll('.win').forEach(function(w){
        if(dark) w.classList.add('theme-dark');
        else if(!w.hasAttribute('data-borndark')) w.classList.remove('theme-dark');
      });
      setMisses(bindHotspots(root, rules, go));
    }, [cur, rules, go, dark, view, scale]);

    useEffect(function(){
      function key(e){
        var t = e.target;
        if(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return;
        if(e.ctrlKey || e.metaKey){
          if(e.key === '=' || e.key === '+'){ e.preventDefault(); setZoom(function(z){ return Math.min(3, z*1.25); }); }
          else if(e.key === '-'){ e.preventDefault(); setZoom(function(z){ return Math.max(.4, z/1.25); }); }
          else if(e.key === '0'){ e.preventDefault(); setZoom(1); }
          return;
        }
        if(e.altKey) return;
        var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if(/^Arrow(Right|Left|Up|Down)$/.test(k) && view === 'map'){
          var m = mapRef.current; if(!m) return;
          e.preventDefault();
          if(k === 'ArrowRight') m.scrollLeft += 140;
          else if(k === 'ArrowLeft') m.scrollLeft -= 140;
          else if(k === 'ArrowDown') m.scrollTop += 120;
          else m.scrollTop -= 120;
          return;
        }
        if(k === 'ArrowRight' || k === 'ArrowLeft'){
          var a = document.activeElement;
          if(a && a !== document.body && !a.closest('.p-stagewrap')) return;
          walk(k === 'ArrowRight' ? 1 : -1);
        }
        else if(k === 'Backspace'){ e.preventDefault(); back(); }
        else if(k === 'h') setShowHot(function(v){ return !v; });
        else if(k === 'd') setDark(function(v){ return !v; });
        else if(k === 'n') setNotesOn(function(v){ return !v; });
        else if(k === 'g') setView(function(v){ return v === 'grid' ? 'screen' : 'grid'; });
        else if(k === 'm') setView(function(v){ return v === 'map' ? 'screen' : 'map'; });
        else if(k === 'o') setView(function(v){ return v === 'open' ? 'map' : 'open'; });
        else if(k === 'f') setHappy(function(v){ return !v; });
        else if(k === 'p') setView(function(v){ return v === 'product' ? 'map' : 'product'; });
        else if(k === '/'){ e.preventDefault();
          var f = document.querySelector('.p-find input'); if(f){ setNavOpen(true); f.focus(); } }
      }
      window.addEventListener('keydown', key);
      return function(){ window.removeEventListener('keydown', key); };
    });

    // ─────────────────────────────────────────── sidebar: journey → step → screen
    var FIELD = { name:'name', step:'step', scope:SRC_SHORT + ' text', why:'design note', rationale:'decision' };
    var matches = null;
    if(query.trim()){
      var qq = query.trim().toLowerCase();
      matches = [];
      vis(ALL, happy).forEach(function(n){
        var f = SCR[n].find || {}, hits = [];
        Object.keys(FIELD).forEach(function(k){ if((f[k]||'').toLowerCase().indexOf(qq) >= 0) hits.push(FIELD[k]); });
        if(hits.length) matches.push([n, hits]);
      });
      // a name hit is what you meant; a decision hit is what you settled for
      var order = ['name','step',SRC_SHORT + ' text'];
      matches.sort(function(a, b){
        var r = function(x){ var i = order.indexOf(x[1][0]); return i < 0 ? 3 : i; };
        return r(a) - r(b);
      });
    }

    function screenRow(n, at, k, hits){
      var s = SCR[n], also = (s.steps||[]).length - 1;
      return h('button',{key:k, className:'p-row', 'data-bad': s.trouble ? '1' : '0',
        title: s.trouble ? 'A state that went wrong: ' + s.trouble : undefined,
        'aria-current': (cur===n && (!at || at===place || (!place && (s.steps||[])[0] &&
          at === (s.steps[0].j+'|'+s.steps[0].s)))) ? 'true':'false',
        onClick:function(){ go(n, at); }},
        h('span',{className:'p-t'}, s.title, hits ? h('span',{className:'p-hit'},' in ' + hits.join(', ')) : null),
        also > 0 ? h('span',{className:'p-also', title:'Also serves ' + s.steps.map(function(H){ return H.s; }).join(', ')}, '+'+also) : null,
        s.status ? h('span',{className:'p-dot', style:{background:TONE[s.status]}, title:TONE_LABEL[s.status]}) : null);
    }

    var side = [];
    if(matches){
      var strong = matches.filter(function(m){ return m[1].some(function(f){ return f !== 'decision' && f !== 'design note'; }); });
      var weak = matches.filter(function(m){ return strong.indexOf(m) < 0; });
      side.push(h('h2',{key:'sh', className:'p-jh'},
        h('span',{className:'nm'}, strong.length + (strong.length === 1 ? ' screen' : ' screens')),
        h('span',{className:'ct'}, 'name, step or ' + SRC_SHORT + ' text')));
      strong.forEach(function(m){ side.push(screenRow(m[0], null, 'm'+m[0], m[1])); });
      if(weak.length){
        side.push(h('h2',{key:'wh', className:'p-jh'}, h('span',{className:'nm'}, weak.length + ' more'),
          h('span',{className:'ct'}, 'in the notes only')));
        weak.forEach(function(m){ side.push(screenRow(m[0], null, 'w'+m[0], m[1])); });
      }
      if(!matches.length) side.push(h('p',{key:'no', className:'p-jend'},'Nothing by that name.'));
    } else {
      LANES.forEach(function(L){
        var count = 0;
        L.steps.forEach(function(s){ count += vis(s.screens, happy).length; });
        side.push(h('h2',{key:'jh'+L.id, id:'jh-'+L.id, className:'p-jh'},
          h('span',{className:'id'}, L.id), h('span',{className:'nm'}, L.name),
          h('span',{className:'ct'}, L.inScope ? count : 'not in ' + SRC_SHORT)));
        if(L.end) side.push(h('p',{key:'je'+L.id, className:'p-jend'}, L.end));
        L.steps.forEach(function(s){
          var sk = L.id + '|' + s.id, isOpen = open[sk] !== false;
          side.push(h('h3',{key:'hh'+sk, className:'p-shwrap'},
            h('button',{className:'p-sh', 'data-open': isOpen?'1':'0', 'aria-expanded': isOpen,
              onClick:function(){ setOpen(function(p){ var o = {}; for(var k in p) o[k]=p[k]; o[sk] = !isOpen; return o; }); }},
              h('span',{className:'id'}, s.id), h('span',{className:'nm'}, s.title))));
          if(!isOpen) return;
          var shown = vis(s.screens, happy);
          shown.forEach(function(n){ side.push(screenRow(n, sk, sk+'|'+n)); });
          if(shown.length < s.screens.length)
            side.push(h('p',{key:sk+'hid', className:'p-hidrow'},
              (s.screens.length - shown.length) + ' failure ' + (s.screens.length - shown.length === 1 ? 'state' : 'states') + ' hidden'));
          s.gaps.forEach(function(g, gi){
            side.push(h('p',{key:sk+'gap'+gi, className:'p-gaprow'}, h('b',null,'Not drawn'), g.title));
          });
        });
      });
    }

    // ─────────────────────────────────────────── notes panel
    var notes = null;
    if(notesOn && view === 'screen' && screen){
      var kids = [];
      if(step && lane){
        var inherited = lane.gates.filter(function(g){ return step.gates.indexOf(g) < 0; });
        var gl = step.gates.concat(inherited);
        kids.push(h('div',{key:'cv', className:'p-nsec'},
          h('h3',{className:'p-nh'}, lane.inScope ? 'From the ' + SRC_SHORT : 'Not a ' + SRC_SHORT + ' step'),
          lane.inScope ? null : h('p',{className:'dim', style:{fontSize:'11.5px'}},
            step.id + ' is a label added here, not one you can cite from the ' + SRC_SHORT + '.'),
          h('div',{className:'p-scope'},
            h('div',{className:'cs'}, h('span',{className:'id'}, step.id), h('span',{className:'nm'}, step.title)),
            step.does ? h('div',null, h('div',{className:'lb'},'What the user does'), h('div',{className:'tx'}, step.does)) : null,
            step.clear ? h('div',null, h('div',{className:'lb'},'What the product makes clear'), h('div',{className:'tx'}, step.clear)) : null,
            step.gaps.length ? h('div',null,
              h('div',{className:'lb', style:{color:'var(--app-warn)'}},'Not drawn yet'),
              step.gaps.map(function(g,i){ return h('div',{key:i, className:'tx', style:{color:'var(--app-warn)'}}, g.title + ' — ' + g.why); })) : null,
            gl.length ? h('div',null,
              h('div',{className:'lb'},'Conditional on'),
              h('div',{className:'p-gates'}, gl.map(function(g, gi){
                var isNamed = gi < step.gates.length, draft = gateDraft(g);
                return h('button',{key:g, className:'p-gate' + (isNamed ? ' named' : '') + (draft ? ' draft' : ''),
                  title: gateQ(g),
                  'aria-label': g + ' — ' + gateQ(g) + '. ' + (isNamed ? 'Named in this step.' : 'Inherited from journey ' + lane.id + '.') + ' Open the register.',
                  onClick:function(){ setGateFocus(g); setView('open'); }}, g);
              }))) : null)));
      }
      if(homes.length > 1) kids.push(h('div',{key:'also', className:'p-nsec'},
        h('h3',{className:'p-nh'},'This screen also serves'),
        h('div',{className:'p-jump'}, homes.filter(function(H){ return !here || H.s !== here.s; }).map(function(H){
          return h('button',{key:H.j+H.s, onClick:function(){ setPlace(H.j+'|'+H.s); }, title:H.jn},
            h('span',{className:'a'}, H.j), H.s + ' ' + H.sn); }))));
      if(screen.trouble) kids.push(h('div',{key:'bad', className:'p-nsec'},
        h('h3',{className:'p-nh', style:{color:'var(--app-bad)'}},'A state that went wrong'),
        h('p',{className:'dim'}, 'This screen exists because ' + screen.trouble + '. It is hidden when the switch is set to the happy path.')));
      if(screen.entry || screen.variantOf) kids.push(h('div',{key:'how', className:'p-nsec'},
        h('h3',{className:'p-nh'}, screen.gesture ? 'How you get here — no button does this' : 'How you get here'),
        screen.entry ? h('p',{className:'dim'}, screen.entry) : null,
        screen.variantOf && SCR[screen.variantOf] ? h('p',{className:'dim'}, 'A state of ',
          h('b',{style:{fontWeight:600,color:'var(--app-ink)'}}, SCR[screen.variantOf].title),
          screen.variantWhen ? ', reached when ' + screen.variantWhen + '.' : '.') : null,
        screen.variantOf && SCR[screen.variantOf] ? h('div',{className:'p-jump inb'},
          h('button',{onClick:function(){ go(screen.variantOf); }}, h('span',{className:'a'},'←'), SCR[screen.variantOf].title)) : null));
      if(inV.length) kids.push(h('div',{key:'i', className:'p-nsec'},
        h('h3',{className:'p-nh'}, inV.length + (inV.length === 1 ? ' way in' : ' ways in')),
        h('div',{className:'p-jump inb'}, inV.map(function(n){
          return h('button',{key:n, onClick:function(){ go(n); }}, h('span',{className:'a'},'←'), SCR[n].title); }))));
      if(outV.length) kids.push(h('div',{key:'o', className:'p-nsec'},
        h('h3',{className:'p-nh'}, outV.length + (outV.length === 1 ? ' way out' : ' ways out')),
        h('div',{className:'p-jump out'}, outV.map(function(o, i){
          return h('button',{key:i, onClick:function(){ go(o[1]); }}, h('span',{className:'a'},'→'), o[0]); }))));
      if(!inV.length && !screen.entry && !screen.variantOf)
        kids.push(h('div',{key:'orph', className:'p-nsec'}, h('h3',{className:'p-nh'},'No way in'),
          h('p',{className:'dim'},'No hotspot leads here, and this screen is not declared as an entry point or as a state of another screen. Something is missing.')));
      if((screen.made||[]).length) kids.push(h('div',{key:'made', className:'p-nsec'},
        h('h3',{className:'p-nh'},'Made of'),
        h('div',{className:'p-made'}, screen.made.slice(0,14).map(function(m, i){
          return h('div',{key:i}, h('span',{className:'c'}, m[1]), h('span',{className:'n'}, m[0]),
            h('span',{className:'r', title:'used on ' + m[2] + ' of ' + ALL.length + ' screens'}, m[2] === 1 ? 'only here' : 'on ' + m[2])); })),
        h('p',{className:'dim', style:{fontSize:'11px'}}, 'Counted from this board’s own markup at build time, so it cannot drift from the board.')));
      if(screen.status) kids.push(h('div',{key:'st', className:'p-nsec'},
        h('span',{className:'p-badge', style:{background:TONE[screen.status], color:'#14140f', alignSelf:'flex-start'}}, TONE_LABEL[screen.status]),
        screen.statusNote ? h('p',{style:{marginTop:'6px'}}, screen.statusNote) : null));
      if(screen.why) kids.push(h('div',{key:'w', className:'p-nsec'}, h('h3',{className:'p-nh'},'Why this screen exists'), h('p',null, screen.why)));
      if((screen.decisions||[]).length){
        kids.push(h('div',{key:'why', className:'p-nsec'},
          h('h3',{className:'p-nh', style:{margin:0}},
            h('button',{className:'p-fold', 'aria-expanded': whyOpen, onClick:function(){ setWhyOpen(!whyOpen); }},
              h('span',{className:'car'}, whyOpen ? '−' : '+'), 'Why it is designed this way',
              h('span',{className:'ct'}, screen.decisions.length + (screen.decisions.length === 1 ? ' decision' : ' decisions')))),
          whyOpen ? screen.decisions.map(decisionView) : null));
      }
      if(misses.length) kids.push(h('div',{key:'ms', className:'p-nsec'}, h('h3',{className:'p-nh'},'Unmatched hotspots'),
        h('p',{className:'dim'}, 'These labels are declared but not on the board: ' + misses.join(', ') + '. The board and the link map have drifted apart; run the build.')));
      notes = h('aside',{className:'p-notes','aria-label':'Design notes'}, kids);
    }

    // ─────────────────────────────────────────── views
    var main;
    if(view === 'open'){
      if(gateFocus) window.setTimeout(function(){
        var el = document.getElementById('gate-' + gateFocus);
        if(el && el.scrollIntoView) el.scrollIntoView({ block:'center', behavior:'smooth' });
      }, 40);
      var gaps = DATA.gaps || [];
      var changing = ALL.filter(function(n){ var s = SCR[n].status; return s && s !== 'checked'; });
      var checked = ALL.filter(function(n){ return SCR[n].status === 'checked'; });
      var decs = Object.keys(DATA.decisions || {}).filter(function(k){ return DATA.decisions[k].status === 'open'; });
      var stepOf = function(n){ var s = SCR[n].steps[0]; return s ? s.s : ''; };
      main = h('div',{className:'p-open'},
        h('section',null, h('h2',null,'What is not drawn'),
          h('p',{className:'sub'},'Steps the ' + SRC_SHORT + ' asks for that no board serves yet. Each one is a screen still to design, not a screen you can build from.'),
          gaps.length ? h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Step'), h('th',null,'Missing'), h('th',null,'Why it matters'))),
            h('tbody',null, gaps.map(function(t, i){
              return h('tr',{key:i}, h('td',{className:'id'}, t.step), h('td',null, t.title), h('td',{className:'why'}, t.why)); })))
            : h('p',{className:'sub'},'Nothing. Every step has a board.')),
        h('section',null, h('h2',null,'Decisions still open'),
          h('p',{className:'sub'},'Questions only the product owner can settle. Each holds up the screens listed beside it; the build reports them on every run.'),
          decs.length ? h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Id'), h('th',null,'Question'), h('th',null,'Options'), h('th',null,'Holds up'))),
            h('tbody',null, decs.map(function(k){
              var d = DATA.decisions[k];
              return h('tr',{key:k}, h('td',{className:'id'}, k), h('td',null, d.question),
                h('td',{className:'why'}, (d.options || []).map(function(o){ return o.label; }).join(' · ')),
                h('td',{className:'why'}, (d.screens || []).map(function(n){
                  return h('button',{key:n, className:'lnk', onClick:function(){ go(n); }, style:{marginRight:'8px'}}, SCR[n] ? SCR[n].title : n); })));
            })))
            : h('p',{className:'sub'},'None open.')),
        h('section',null, h('h2',null,'Screens that will change'),
          h('p',{className:'sub'},'Drawn, but known to be wrong or newly added. A redraw teaches a model the product does not have; a copy fix names the wrong object in otherwise correct words.'),
          changing.length ? h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Step'), h('th',null,'Screen'), h('th',null,'Kind'), h('th',null,'What is wrong'))),
            h('tbody',null, changing.map(function(n, i){
              var s = SCR[n], k = KIND[s.status] || ['?','var(--app-dim)'];
              return h('tr',{key:i}, h('td',{className:'id'}, stepOf(n)),
                h('td',null, h('button',{className:'lnk', onClick:function(){ go(n); }}, s.title)),
                h('td',null, h('span',{className:'p-kind', style:{background:k[1], color:'#14140f'}}, k[0])),
                h('td',{className:'why'}, s.statusNote || ''));
            })))
            : h('p',{className:'sub'},'None.')),
        checked.length ? h('section',null, h('h2',null, CHECKED),
          h('p',{className:'sub'},'These were on the list above and have been checked against something outside the design. Kept because a reader who saw the old version needs to know it moved, and the reason is the evidence.'),
          h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Step'), h('th',null,'Screen'), h('th',null,'What it says now'))),
            h('tbody',null, checked.map(function(n, i){
              return h('tr',{key:i}, h('td',{className:'id'}, stepOf(n)),
                h('td',null, h('button',{className:'lnk', onClick:function(){ go(n); }}, SCR[n].title)),
                h('td',{className:'why'}, SCR[n].statusNote || '')); })))) : null,
        D.register.length ? h('section',null, h('h2',null,'Gates, and what stands on each'),
          h('p',{className:'sub'},'Questions the design is conditional on. The screen count is how much of the prototype depends on the gate passing, so it answers “if this fails, what breaks”. A gate in blue on a step is one that step’s own text names; the rest are inherited from the journey.'),
          h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Gate'), h('th',null,'Question'), h('th',null,'Screens'), h('th',null,'Named by'))),
            h('tbody',null, D.register.map(function(r){
              return h('tr',{key:r.gate, id:'gate-'+r.gate, 'data-focus': gateFocus === r.gate ? '1' : '0'},
                h('td',{className:'id', style: r.draft ? {opacity:.7} : null}, r.gate, r.draft ? ' *' : ''),
                h('td',null, r.question, r.answer ? h('div',{className:'why'}, 'Answered: ' + r.answer +
                  ([r.by, r.date].filter(Boolean).length ? ' (' + [r.by, r.date].filter(Boolean).join(', ') + ')' : '')) : null),
                h('td',{className:'num'}, r.nScreens + ' of ' + ALL.length),
                h('td',{className:'why'}, r.steps.filter(function(x){ return x.named; }).map(function(x){ return x.s; }).join(', ') || 'inherited only'));
            })))) : null,
        D.components.length ? h('section',null, h('h2',null,'What the set is built from'),
          h('p',{className:'sub'},'Every component the ' + ALL.length + ' boards use, and how many boards use it, counted from the markup at build time. A part used once is a one-off to question; a part used on most boards is the system.'),
          h('table',{className:'p-tbl'},
            h('thead',null,h('tr',null, h('th',null,'Component'), h('th',null,'Screens'), h('th',null,'Which'))),
            h('tbody',null, D.components.map(function(c, i){
              var isOpen = compOpen === c.name;
              return h('tr',{key:i}, h('td',null, c.name), h('td',{className:'num'}, c.n),
                h('td',{className:'why'},
                  h('button',{className:'lnk', 'aria-expanded':isOpen, onClick:function(){ setCompOpen(isOpen ? null : c.name); }}, isOpen ? 'hide' : 'list them'),
                  isOpen ? h('div',{className:'p-jump out', style:{marginTop:'7px'}}, c.screens.map(function(sn){
                    return h('button',{key:sn, onClick:function(){ go(sn); }}, SCR[sn] ? SCR[sn].title : sn); })) : null));
            })))) : null);
    } else if(view === 'product'){
      var chip = function(cls, e){
        return h('button',{key:e[0], className:cls, title:e[1], onClick:function(){ go(e[0]); }}, e[1], e[2] ? h('i',null,' · '+e[2]) : null);
      };
      var C = D.counts || {};
      main = h('div',{className:'p-ia'},
        h('div',{className:'lede'},
          h('h2',null,'How the product is navigated'),
          h('p',null,'A journey is a story about intent. Navigation is a different thing: a place you can be, a state of a place, a detour you are returned from, an entrance before you are inside. Every screen is exactly one of the four, and each kind obliges something.'),
          h('p',null, (C.place||0) + ' places · ' + (C.state||0) + ' states · ' + (C.detour||0) + ' detours · ' + (C.entrance||0) + ' entrances.'),
          h('div',{className:'p-kinds'}, [['place','somewhere you can be and come back to; needs a nav row, a name people say aloud, and an empty state'],
            ['state','a place under a condition; keeps the place’s heading'], ['detour','opened, finished, returned from; ends where it started'],
            ['entrance','before you are inside; assumes nothing']].map(function(k){
              return h('div',{key:k[0]}, h('b',null,k[0]), h('span',null, k[1])); }))),
        D.places.map(function(P){
          return h('div',{key:P.id, className:'p-place' + (P.under ? ' sub' : '')},
            h('div',{className:'ph'}, h('button',{onClick:function(){ go(P.id); }}, P.title), P.note ? h('em',null, P.note) : null,
              P.noEmpty ? h('em',{style:{color:'var(--app-warn)'}},'no empty state drawn') : null),
            h('div',{className:'pb'},
              h('div',{className:'p-row2'}, h('b',null,'looks like'), h('div',{className:'ch'}, P.states.length
                ? P.states.map(function(e){ return chip('p-st', e); }) : h('span',{className:'p-none'},'one state only'))),
              h('div',{className:'p-row2'}, h('b',null,'opens', h('span',{style:{display:'block',fontWeight:400,textTransform:'none',letterSpacing:0,color:'var(--app-line-2)'}},'returns here')),
                h('div',{className:'ch'}, P.detours.length ? P.detours.map(function(e){ return chip('p-dt', e); }) : h('span',{className:'p-none'},'nothing')))));
        }),
        D.entrances.length ? h('div',{className:'p-place'},
          h('div',{className:'ph'}, h('button',{onClick:function(){ go(D.entrances[0][0]); }},'Before you are inside'), h('em',null,'Entrances')),
          h('div',{className:'pb'}, h('div',{className:'p-row2'}, h('b',null,'entrances'),
            h('div',{className:'ch'}, D.entrances.map(function(e){ return chip('p-st', e); }))))) : null);
    } else if(view === 'grid'){
      main = h('div',{className:'p-grid'}, LANES.map(function(L){
        var seen = {}, items = [];
        L.steps.forEach(function(s){ vis(s.screens, happy).forEach(function(n){ if(seen[n]) return; seen[n] = 1; items.push([n, L.id+'|'+s.id]); }); });
        if(!items.length) return null;
        return h('section',{key:L.id, className:'p-gsec'},
          h('h2',null, h('em',null, L.id), '  ', L.name), L.end ? h('p',null, L.end) : null,
          h('div',{className:'p-tiles'}, items.map(function(e){
            var n = e[0], s = SCR[n];
            return h('button',{key:n, className:'p-tile', 'aria-current': cur===n?'true':'false', 'data-bad': s.trouble ? '1' : '0',
              title: s.trouble ? 'A state that went wrong: ' + s.trouble : undefined, onClick:function(){ go(n, e[1]); }},
              h(Board,{name:n, html:s.html, dark:dark}),
              h('div',{className:'p-tlabel'}, s.status ? h('span',{className:'p-dot',style:{background:TONE[s.status]}}) : null,
                h('b',null, s.title), h('span',null, n)));
          })));
      }));
    } else if(view === 'map'){
      if(!MAP.ties) MAP.ties = variantTies(MAP);
      var mapFit = function(){ var el = mapRef.current; if(!el) return; setMzoom(Math.min(1, (el.clientWidth - 52) / MAP.W)); };
      var outOf = {}, inTo = {};
      (DATA.links[cur] || []).forEach(function(r){ if(r[1] !== cur) outOf[r[1]] = 1; });
      ((screen && screen['in']) || []).forEach(function(n){ inTo[n] = 1; });
      main = h('div',{className:'p-map', ref:mapRef, tabIndex:0, 'aria-label':'Flow map. Arrow keys pan.'},
        h('div',{className:'p-key'},
          h('span',{className:'grp'}, h('span',{style:{color:'var(--app-ink)'}},'Journey'),
            MAP.lanes.map(function(L){
              return h('button',{key:'jc'+L.id, className:'p-lanechip', 'aria-current': ((mapLane || (here && here.j)) === L.id) ? 'true' : 'false',
                title: L.name, onClick:function(){ setMapLane(L.id); var m = mapRef.current; if(!m) return;
                  m.scrollTo({ top: Math.max(0, L.y * mzoom - 8), left: 0, behavior:'smooth' }); }}, L.id); })),
          h('span',{className:'grp'},
            h('span',null,h('i',{style:{borderColor:'var(--app-hot)'}}),'leads to'),
            h('span',null,h('i',{style:{borderColor:'var(--app-in)'}}),'reached from'),
            h('span',null,h('i',{style:{borderColor:'var(--app-line-2)', borderTopStyle:'dashed'}}),'a state of'),
            h('span',null,h('i',{style:{borderColor:'#ffffff26'}}),'other links'),
            happy ? null : h('span',null, h('i',{style:{borderColor:'#ff7a6659',height:'12px',width:'16px',borderWidth:'1px',borderStyle:'solid',borderRadius:'3px'}}),'went wrong')),
          h('span',{className:'grp'}, h('span',{style:{fontFamily:'ui-monospace,monospace', color:'var(--app-ink)'}},'+n'), h('span',null,'also serves n other steps')),
          h('span',{className:'grp zoom'},
            h('button',{className:'p-btn', onClick:function(){ setMzoom(function(z){ return Math.max(.4, z/1.2); }); }, title:'Smaller'},'−'),
            h('button',{className:'p-btn', onClick:mapFit, title:'Fit the whole shape in the window'},'Fit'),
            h('button',{className:'p-btn', onClick:function(){ setMzoom(function(z){ return Math.min(1.6, z*1.2); }); }, title:'Larger'},'+'),
            h('button',{className:'p-btn', onClick:function(){ setMzoom(1); }, disabled: mzoom === 1, title:'Back to full size'}, Math.round(mzoom*100) + '%'),
            h('span',null,'arrows pan'))),
        h('div',{style:{width:(MAP.W*mzoom)+'px', height:(MAP.H*mzoom)+'px', position:'relative'}},
        h('div',{className:'p-mapinner', style:{width:MAP.W+'px', height:MAP.H+'px', transform:'scale('+mzoom+')', transformOrigin:'top left', position:'absolute', top:0, left:0}},
          MAP.lanes.map(function(L){
            return h('div',{key:'L'+L.id, className:'p-lane', style:{top:L.y+'px', height:L.h+'px', width:MAP.W+'px'}},
              h('div',{className:'lh'}, h('span',{className:'id'}, L.id), h('span',{className:'nm'}, L.name),
                h('span',{className:'en'}, L.inScope ? L.steps + ' steps' : 'labels added here'))); }),
          h('svg',{className:'p-edges', width:MAP.W, height:MAP.H, 'aria-hidden':'true'},
            MAP.ties.map(function(t, i){
              var live = t.from === cur || t.to === cur;
              return h('path',{key:'t'+i, d:edgePath(t.a, t.b), fill:'none', stroke: live ? 'var(--app-line-2)' : '#ffffff12', strokeWidth:1, strokeDasharray:'2 4'}); }),
            MAP.edges.map(function(e, i){
              var isOut = e.from === cur, isIn = e.to === cur;
              var col = isOut ? 'var(--app-hot)' : isIn ? 'var(--app-in)' : '#ffffff1a';
              return h('path',{key:i, d:edgePath(e.a, e.b), fill:'none', stroke:col, strokeWidth:(isOut||isIn) ? 1.7 : 1,
                markerEnd:(isOut||isIn) ? 'url(#'+(isOut?'ah':'ai')+')' : undefined}); }),
            h('defs',null,
              h('marker',{id:'ah', viewBox:'0 0 8 8', refX:7, refY:4, markerWidth:6, markerHeight:6, orient:'auto-start-reverse'}, h('path',{d:'M0 0 L8 4 L0 8 z', fill:'var(--app-hot)'})),
              h('marker',{id:'ai', viewBox:'0 0 8 8', refX:7, refY:4, markerWidth:6, markerHeight:6, orient:'auto-start-reverse'}, h('path',{d:'M0 0 L8 4 L0 8 z', fill:'var(--app-in)'})))),
          MAP.heads.map(function(hd){
            return h('div',{key:hd.key, className:'p-shead', style:{left:hd.x+'px', top:hd.y+'px', width:NW+'px'}},
              h('span',{className:'hr'}, h('b',null, hd.id), hd.gaps ? h('span',{className:'gp'}, hd.gaps + ' not drawn') : null,
                hd.hid ? h('span',{className:'hd'}, hd.hid + ' hidden') : null),
              h('i',{title:hd.title}, hd.title)); }),
          MAP.holes.map(function(gp){
            return h('div',{key:gp.id, className:'p-hole', style:{left:gp.x+'px', top:gp.y+'px'}, role:'note',
              'aria-label':'Not drawn: ' + gp.title, title:gp.title + ' — ' + gp.why}, h('span',{className:'nm'}, gp.title)); }),
          MAP.nodes.map(function(nd){
            var s = SCR[nd.screen], also = (s.steps||[]).length - 1;
            return h('button',{key:nd.id, className:'p-node', 'data-sel': cur===nd.screen ? '1' : '0', 'data-bad': s.trouble ? '1' : '0',
              'data-rel': outOf[nd.screen] ? 'out' : inTo[nd.screen] ? 'in' : undefined,
              'data-orphan': ((s['in']||[]).length || s.variantOf || s.entry) ? '0' : '1',
              'aria-current': cur===nd.screen ? 'true' : 'false',
              'aria-label': s.title + ', ' + nd.step + ', ' + (s.trouble ? 'a state that went wrong, ' : '') +
                (s['in']||[]).length + ' ways in, ' + (s.out||[]).length + ' ways out' +
                (s.variantOf && SCR[s.variantOf] ? ', a state of ' + SCR[s.variantOf].title : '') +
                (s.gesture ? ', reached by a gesture' : s.entry ? ', entry point' : '') + (also > 0 ? ', also serves ' + also + ' other steps' : ''),
              title: s.title + '  ·  ' + nd.step + '  ·  ' + (s.trouble ? 'went wrong: ' + s.trouble + '  ·  ' : '') +
                (s['in']||[]).length + ' in, ' + (s.out||[]).length + ' out',
              style:{left:nd.x+'px', top:nd.y+'px'}, onClick:function(){ go(nd.screen, nd.lane+'|'+nd.step); }},
              s.status ? h('span',{className:'p-dot',style:{background:TONE[s.status]}}) : null,
              h('span',{className:'nm'}, s.title), also > 0 ? h('span',{className:'dup'},'+'+also) : null);
          }))));
    } else {
      main = h('div',{className:'p-body'},
        h('div',{className:'p-stagewrap'},
          h('div',{className:'p-fit', style:{width:(FW*scale)+'px', height:(FH*scale)+'px'}},
            h('div',{className:'p-stage', ref:stageRef, tabIndex:-1, role:'group', 'aria-label':'Screen: ' + (screen ? screen.title : cur),
              'data-showhot':showHot?'1':'0', style:{transform:'scale('+scale+')', '--s':scale},
              dangerouslySetInnerHTML:{__html: screen ? screen.html : ''}}))),
        notes);
    }

    var vbtn = function(id, label, hint){
      return h('button',{onClick:function(){ setView(id); }, 'aria-pressed': view===id, title:hint}, label);
    };
    var nGaps = 0, nSteps = 0;
    LANES.forEach(function(L){ L.steps.forEach(function(s){ nSteps++; nGaps += s.gaps.length; }); });
    var nT = D.nTrouble || 0;

    return h('div',{style:{display:'flex',height:'100%',width:'100%'}},
      h('nav',{className:'p-side', hidden: (window.innerWidth <= 900 && !navOpen) || undefined, 'aria-label':'Journeys, steps and screens'},
        h('div',{className:'p-brand'},
          h('h1',null, META.title || 'Prototype'),
          h('p',null, (happy ? (ALL.length - nT) + ' of ' + ALL.length : String(ALL.length)) + ' screens on ' + nSteps + ' steps · ' +
            LANES.length + ' journeys · ' + nGaps + ' not drawn' + (happy ? ' · happy path only' : '')),
          SOURCE ? h('p',null, 'Journey and step names come from the ',
            SOURCE.url ? h('a',{href:SOURCE.url, target:'_blank', rel:'noreferrer', style:{color:'var(--app-in)'}}, SOURCE.label || SRC_SHORT) : (SOURCE.label || SRC_SHORT),
            ' and mean the same thing in both.') : null,
          h('div',{className:'p-find'}, h('span',null,'⌕'),
            h('input',{type:'search', value:query, placeholder:'Find a screen or step  /', 'aria-label':'Find a screen or step',
              onChange:function(e){ setQuery(e.target.value); }}))),
        query.trim() ? null : h('div',{className:'p-jumps', role:'group', 'aria-label':'Jump to a journey'},
          LANES.map(function(L){
            return h('button',{key:'sj'+L.id, title:L.name, 'aria-current': (here && here.j === L.id) ? 'true' : 'false',
              onClick:function(){ var el = document.getElementById('jh-' + L.id); if(el) el.scrollIntoView({ block:'start', behavior:'smooth' }); }}, L.id); })),
        h('div',{className:'p-list', ref:listRef}, side)),
      h('main',{className:'p-main'},
        h('div',{className:'p-bar'},
          h('div',{className:'p-who'},
            h('b',null, screen ? screen.title : cur, screen && screen.status ? h('span',{className:'p-badge', style:{background:TONE[screen.status], color:'#14140f'}}, TONE_LABEL[screen.status]) : null),
            h('span',null, here ? h('span',{className:'sid'}, here.s) : null, here ? '  ' + step.title + '  ·  ' + here.jn : cur,
              screen ? '  ·  ' + inV.length + ' in, ' + outV.length + ' out' : '')),
          h('div',{className:'p-ctl'},
            h('button',{className:'p-btn p-navbtn', onClick:function(){ setNavOpen(!navOpen); }, 'aria-expanded':navOpen},'Screens'),
            h('div',{className:'p-seg', role:'group','aria-label':'Which screens'},
              h('button',{onClick:function(){ setHappy(true); },'aria-pressed':happy,
                title:'Hide the ' + nT + ' screens that exist because something was refused, timed out, ran out or cannot be done here (f)'},'Happy path'),
              h('button',{onClick:function(){ setHappy(false); },'aria-pressed':!happy, title:'Every state the product can land in, failures included (f)'},'Everything')),
            h('span',{className:'sep'}),
            h('div',{className:'p-seg', role:'group','aria-label':'View'},
              vbtn('map','Map','How the journeys connect (m)'), vbtn('screen','Screen','One screen at a time'),
              vbtn('product','Product','Places, states and detours (p)'), vbtn('grid','Overview','All screens at once (g)'),
              vbtn('open','Open','What is not finished (o)')),
            view === 'screen' ? h('button',{className:'p-btn p-icon', onClick:function(){ setZoom(Math.max(.4, zoom/1.25)); },'aria-label':'Zoom out'},'−') : null,
            view === 'screen' ? h('button',{className:'p-btn p-icon', onClick:function(){ setZoom(1); },'aria-label':'Reset zoom to fit'},'⤢') : null,
            view === 'screen' ? h('button',{className:'p-btn p-icon', onClick:function(){ setZoom(Math.min(3, zoom*1.25)); },'aria-label':'Zoom in'},'+') : null,
            h('button',{className:'p-btn p-icon', onClick:back, disabled:!hist.length, 'aria-label':'Back', title:'Back (Backspace)'},'←'),
            laneSeq.length && seqIx >= 0 ? h('button',{className:'p-btn p-icon', onClick:function(){walk(-1);}, disabled:seqIx===0,
              'aria-label':'Previous screen in this journey', title:'Previous in journey ' + (lane?lane.id:'') + ' (←)'},'‹') : null,
            laneSeq.length && seqIx >= 0 ? h('button',{className:'p-btn p-icon', onClick:function(){walk(1);}, disabled:seqIx===laneSeq.length-1,
              'aria-label':'Next screen in this journey', title:'Next in journey ' + (lane?lane.id:'') + ' (→)'},'›') : null,
            view === 'screen' ? h('button',{className:'p-btn','aria-pressed':showHot, onClick:function(){ setShowHot(!showHot); }, title:'Show hotspots (h)'},'Hotspots') : null,
            view === 'screen' ? h('button',{className:'p-btn','aria-pressed':notesOn, onClick:function(){ setNotesOn(!notesOn); }, title:'Scope step and notes (n)'},'Notes') : null,
            h('button',{className:'p-btn','aria-pressed':dark, onClick:function(){ setDark(!dark); }, title:'Switch theme (d)'}, dark?'Dark':'Light'))),
        main,
        h('div',{className:'p-sr', role:'status','aria-live':'polite'},
          (screen ? screen.title : cur) + (here ? ', ' + here.s + ' ' + here.sn + ', journey ' + here.j : '') +
          (screen ? ', ' + inV.length + ' ways in, ' + outV.length + ' ways out' : '') +
          (happy ? '. Happy path only: ' + nT + ' failure states hidden.' : '')),
        h('div',{className:'p-foot'},
          h('span',null, view === 'screen' ? 'Outlined areas are clickable — Tab and Enter work too. Arrow keys walk journey ' + (lane ? lane.id : '') + ' in step order.'
            : view === 'open' ? 'Everything the design says is unfinished: gaps, open decisions, screens that will change, gates'
            : view === 'product' ? 'What is a place, what is a state of one, and what is a detour you are returned from'
            : view === 'grid' ? 'Every screen, grouped by the journey it serves'
            : 'Every screen, filed under the step it serves. Click one to see where it leads and where it can be reached from.'),
          happy ? h('span',{style:{color:'var(--app-bad)'}}, nT + ' failure states hidden') : null,
          h('span',null,h('kbd',null,'f'),' failures'), h('span',null,h('kbd',null,'m'),' map'), h('span',null,h('kbd',null,'p'),' product'),
          h('span',null,h('kbd',null,'g'),' overview'), h('span',null,h('kbd',null,'o'),' open work'), h('span',null,h('kbd',null,'n'),' notes'),
          h('span',null,h('kbd',null,'/'),' find'), h('span',null,h('kbd',null,'d'),' theme'))));
  }

  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
