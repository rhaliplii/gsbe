let lang='ro';
function updateNavAria(id){
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
    a.removeAttribute('aria-current');
    if(a.id === 'nav-' + id || (a.getAttribute('onclick') || '').includes("showPage('" + id + "')")){
      a.setAttribute('aria-current','page');
    }
  });
}
const PAGE_URLS = {home:'index.html',about:'about.html',projects:'projects.html',investors:'investors.html',partners:'partners.html',news:'news.html',contact:'contact.html',privileged:'privileged-information.html'};
function currentPageId(){ return document.body.getAttribute('data-page') || 'home'; }
function showPage(id){
  const target = PAGE_URLS[id] || 'index.html';
  const current = currentPageId();
  if(id !== current){ window.location.href = target; return; }
  updateNavAria(id);
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const n=document.getElementById('nav-'+id); if(n) n.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(initReveal,80);
}
function updateHtmlLang(l){
  document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'ro');
  // Update canonical for language
  const canonical = document.querySelector('link[rel="canonical"]');
  if(canonical){ canonical.href = window.location.href.split('#')[0]; }
}
function setLang(l){
  lang=l;
  document.getElementById('btn-en').classList.toggle('active',l==='en');
  document.getElementById('btn-ro').classList.toggle('active',l==='ro');
  document.documentElement.lang=l;
  document.querySelectorAll('[data-en]').forEach(el=>{
    const t=el.getAttribute('data-'+l); if(!t) return;
    if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') el.placeholder=t;
    else if(el.tagName==='OPTION') el.textContent=t;
    else el.innerHTML=t;
  });
}
function closeAllArticles(){
  document.querySelectorAll('[id$="-article"],[id$="-detail"]').forEach(function(el){ el.style.display='none'; });
  document.body.style.overflow='';
}
function toggleMobile(){ const m=document.getElementById('mobileMenu'); const isOpen=m.classList.toggle('open'); const btn=document.getElementById('hamburgerBtn'); if(btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); }
function initReveal(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}
window.addEventListener('scroll',()=>document.getElementById('mainNav').classList.toggle('scrolled',scrollY>40));
document.addEventListener('DOMContentLoaded',()=>{
  const page=currentPageId();
  showPage(page);
  if(page==='news') renderGallery();
  setLang('ro');
  initReveal();
  if(page==='contact')setTimeout(syncContactPhoto,420);
  if(location.hash==='#cef-radeni-detail')window.location.href='cef-radeni.html';
  if(page==='news' && location.hash.endsWith('-article'))setTimeout(()=>showNewsArticle(location.hash.slice(1)),120);
});
function syncContactPhoto(){
  var left = document.getElementById('contact-left-col');
  var photoWrap = document.querySelector('.contact-photo-col > div');
  if(!left || !photoWrap) return;
  var h = left.offsetHeight;
  if(h > 0){ photoWrap.style.height = h + 'px'; }
  else { requestAnimationFrame(syncContactPhoto); }
}
var _spOrig = showPage;
showPage = function(id){
  _spOrig(id);
  if(id==='contact') setTimeout(syncContactPhoto, 420); // after fadeIn(.4s) completes
};
window.addEventListener('resize', syncContactPhoto);

function showNewsArticle(id){
  const article = document.getElementById(id);
  if(!article){ window.location.href = 'news.html#' + id; return; }
  article.style.display='block';
  document.body.style.overflow='hidden';
  window.scrollTo(0,0);
}
function showProjectDetail(id){
  window.location.href = 'cef-radeni.html';
}

// ── Gallery data ──────────────────────────────────────────────────────────────
var _gAll = [
  {"src":"assets/images/gallery/full/construction-01.jpg","thumb":"assets/images/gallery/thumbs/construction-01.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 1","en":"CEF Rădeni construction progress — site photo 1"},
  {"src":"assets/images/gallery/full/construction-02.jpg","thumb":"assets/images/gallery/thumbs/construction-02.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 2","en":"CEF Rădeni construction progress — site photo 2"},
  {"src":"assets/images/gallery/full/construction-03.jpg","thumb":"assets/images/gallery/thumbs/construction-03.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 3","en":"CEF Rădeni construction progress — site photo 3"},
  {"src":"assets/images/gallery/full/construction-04.jpg","thumb":"assets/images/gallery/thumbs/construction-04.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 4","en":"CEF Rădeni construction progress — site photo 4"},
  {"src":"assets/images/gallery/full/construction-05.jpg","thumb":"assets/images/gallery/thumbs/construction-05.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 5","en":"CEF Rădeni construction progress — site photo 5"},
  {"src":"assets/images/gallery/full/construction-06.jpg","thumb":"assets/images/gallery/thumbs/construction-06.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 6","en":"CEF Rădeni construction progress — site photo 6"},
  {"src":"assets/images/gallery/full/construction-07.jpg","thumb":"assets/images/gallery/thumbs/construction-07.jpg","cat":"construction","ro":"Construcția CEF Rădeni — progres șantier 7","en":"CEF Rădeni construction progress — site photo 7"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-01.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-01.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 1","en":"CEF Rădeni inauguration — photo 1"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-02.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-02.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 2","en":"CEF Rădeni inauguration — photo 2"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-03.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-03.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 3","en":"CEF Rădeni inauguration — photo 3"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-04.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-04.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 4","en":"CEF Rădeni inauguration — photo 4"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-05.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-05.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 5","en":"CEF Rădeni inauguration — photo 5"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-06.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-06.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 6","en":"CEF Rădeni inauguration — photo 6"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-07.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-07.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 7","en":"CEF Rădeni inauguration — photo 7"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-08.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-08.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 8","en":"CEF Rădeni inauguration — photo 8"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-09.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-09.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 9","en":"CEF Rădeni inauguration — photo 9"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-10.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-10.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 10","en":"CEF Rădeni inauguration — photo 10"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-11.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-11.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 11","en":"CEF Rădeni inauguration — photo 11"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-12.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-12.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 12","en":"CEF Rădeni inauguration — photo 12"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-13.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-13.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 13","en":"CEF Rădeni inauguration — photo 13"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-14.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-14.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 14","en":"CEF Rădeni inauguration — photo 14"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-15.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-15.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 15","en":"CEF Rădeni inauguration — photo 15"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-16.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-16.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 16","en":"CEF Rădeni inauguration — photo 16"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-17.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-17.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 17","en":"CEF Rădeni inauguration — photo 17"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-18.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-18.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 18","en":"CEF Rădeni inauguration — photo 18"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-19.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-19.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 19","en":"CEF Rădeni inauguration — photo 19"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-20.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-20.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 20","en":"CEF Rădeni inauguration — photo 20"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-21.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-21.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 21","en":"CEF Rădeni inauguration — photo 21"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-22.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-22.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 22","en":"CEF Rădeni inauguration — photo 22"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-23.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-23.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 23","en":"CEF Rădeni inauguration — photo 23"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-24.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-24.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 24","en":"CEF Rădeni inauguration — photo 24"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-25.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-25.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 25","en":"CEF Rădeni inauguration — photo 25"},
  {"src":"assets/images/gallery/full/cef-radeni-inauguration-26.jpg","thumb":"assets/images/gallery/thumbs/cef-radeni-inauguration-26.jpg","cat":"cef","ro":"Inaugurarea CEF Rădeni — fotografie 26","en":"CEF Rădeni inauguration — photo 26"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-01.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-01.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 1","en":"BESS Rădeni inauguration — photo 1"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-02.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-02.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 2","en":"BESS Rădeni inauguration — photo 2"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-03.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-03.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 3","en":"BESS Rădeni inauguration — photo 3"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-04.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-04.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 4","en":"BESS Rădeni inauguration — photo 4"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-05.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-05.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 5","en":"BESS Rădeni inauguration — photo 5"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-06.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-06.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 6","en":"BESS Rădeni inauguration — photo 6"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-07.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-07.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 7","en":"BESS Rădeni inauguration — photo 7"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-08.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-08.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 8","en":"BESS Rădeni inauguration — photo 8"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-09.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-09.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 9","en":"BESS Rădeni inauguration — photo 9"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-10.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-10.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 10","en":"BESS Rădeni inauguration — photo 10"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-11.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-11.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 11","en":"BESS Rădeni inauguration — photo 11"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-12.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-12.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 12","en":"BESS Rădeni inauguration — photo 12"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-13.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-13.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 13","en":"BESS Rădeni inauguration — photo 13"},
  {"src":"assets/images/gallery/full/bess-radeni-inauguration-14.jpg","thumb":"assets/images/gallery/thumbs/bess-radeni-inauguration-14.jpg","cat":"bess","ro":"Inaugurarea BESS Rădeni — fotografie 14","en":"BESS Rădeni inauguration — photo 14"}
];

// Active filtered list used by lightbox prev/next
var _gFiltered = _gAll.slice();
var _gIdx = 0;
var _gActiveTab = "all";

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch];
  });
}
function renderGallery(){
  var grid = document.getElementById('gal-grid');
  if(!grid) return;
  grid.innerHTML = _gAll.map(function(p, idx){
    var ro = escapeHtml(p.ro);
    var en = escapeHtml(p.en);
    return '<button type="button" class="gal-item reveal" data-cat="' + p.cat + '" onclick="openLightbox(' + idx + ')" aria-label="' + ro + '">' +
      '<img src="' + p.thumb + '" alt="' + ro + '" loading="lazy" decoding="async">' +
      '<span class="gal-overlay"><span data-ro="' + ro + '" data-en="' + en + '">' + ro + '</span></span>' +
      '</button>';
  }).join('');
  switchGalTab(_gActiveTab);
}

// ── Tab switching ─────────────────────────────────────────────────────────────
function switchGalTab(tab) {
  _gActiveTab = tab;
  // Update tab styles
  ["all","construction","cef","bess"].forEach(function(t){
    var el = document.getElementById("gtab-"+t);
    if(el) el.className = "gtab" + (t===tab ? " gtab-active" : "");
  });
  // Show/hide grid items
  var items = document.querySelectorAll("#gal-grid .gal-item");
  items.forEach(function(item){
    var cat = item.getAttribute("data-cat");
    item.style.display = (tab==="all" || cat===tab) ? "" : "none";
  });
  // Rebuild filtered list for lightbox
  _gFiltered = tab==="all" ? _gAll.slice() : _gAll.filter(function(p){ return p.cat===tab; });
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function openLightbox(globalIdx){
  // Find position in filtered list
  _gFiltered = _gActiveTab==="all" ? _gAll.slice() : _gAll.filter(function(p){ return p.cat===_gActiveTab; });
  var pos = _gFiltered.findIndex(function(p){ return p.src === _gAll[globalIdx].src; });
  _gIdx = pos >= 0 ? pos : 0;
  _showLb();
  document.getElementById("gal-lightbox").style.display="flex";
}
function closeLightbox(){ document.getElementById("gal-lightbox").style.display="none"; }
function prevPhoto(){ _gIdx=(_gIdx-1+_gFiltered.length)%_gFiltered.length; _showLb(); }
function nextPhoto(){ _gIdx=(_gIdx+1)%_gFiltered.length; _showLb(); }
function _showLb(){
  var lang = document.documentElement.lang||"ro";
  var p = _gFiltered[_gIdx];
  var img = document.getElementById("lb-img");
  img.src = p.src;
  img.alt = lang==="en" ? p.en : p.ro;
  document.getElementById("lb-caption").textContent = lang==="en" ? p.en : p.ro;
  document.getElementById("lb-counter").textContent = (_gIdx+1)+" / "+_gFiltered.length;
}
document.addEventListener("keydown",function(e){
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowLeft")prevPhoto();
  if(e.key==="ArrowRight")nextPhoto();
});
