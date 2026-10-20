const getContent = async () => {
  const res = await fetch('content.json');
  if (!res.ok) throw new Error('Could not load content.json');
  return res.json();
};
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
function makeEducation(data) {
  const wrap = el('div','stack-list');
  data.forEach(item => { const row=el('article','timeline-row'); row.append(el('span','period',item.period)); const body=el('div',''); body.append(el('h3','',item.degree),el('p','muted',item.institution)); row.append(body); wrap.append(row); });
  return wrap;
}
function makeCareer(data) {
  const wrap=el('div','stack-list');
  data.forEach(item=>{const row=el('article','timeline-row');row.append(el('span','period',item.period));const body=el('div','');body.append(el('h3','',item.role),el('p','muted',item.organisation));const ul=el('ul','clean-list compact');item.tasks.forEach(t=>ul.append(el('li','',t)));body.append(ul);row.append(body);wrap.append(row);});
  return wrap;
}

function makeProfessionalProfile(data) {
 const wrap=el('div','profile-details');
 if(data.strengths && data.strengths.length) {
   const section=el('section','profile-detail-section'); section.append(el('h3','','Strengths'));
   const list=el('ul','clean-list'); data.strengths.forEach(item=>list.append(el('li','',item))); section.append(list); wrap.append(section);
 }
 (data.skills||[]).forEach(group=>{const section=el('section','profile-detail-section');section.append(el('h3','',group.group));const list=el('ul','clean-list');group.items.forEach(item=>list.append(el('li','',item)));section.append(list);wrap.append(section);});
 if(data.languages && data.languages.length) {const section=el('section','profile-detail-section');section.append(el('h3','','Languages'));const list=el('ul','clean-list');data.languages.forEach(item=>list.append(el('li','',item)));section.append(list);wrap.append(section);}
 return wrap;
}
function makeAcoustics(data) {
 const wrap=el('div','acoustic-list'); wrap.append(el('p','panel-intro',data.intro));
 data.activities.forEach(item=>{const row=el('article','acoustic-row');const img=el('img','acoustic-thumb');img.src=item.image;img.alt=item.title;row.append(img);const copy=el('div','');copy.append(el('h3','',item.title),el('p','muted',item.description));row.append(copy);wrap.append(row);});
 return wrap;
}
async function init() {
 try {
  const d=await getContent();
  const byId=id=>document.getElementById(id);
  if(byId('name')) byId('name').textContent=d.profile.englishName;
  if(byId('chinese-name')) byId('chinese-name').textContent=d.profile.chineseName;
  if(byId('professional-title')) byId('professional-title').textContent=d.profile.professionalTitle;
  if(byId('contact-heading')) byId('contact-heading').textContent=d.contact.heading || 'Let’s connect';
  if(byId('contact-description')) byId('contact-description').textContent=d.contact.description || 'For architectural, research, or acoustic collaboration.';
  if(byId('year')) byId('year').textContent=new Date().getFullYear();

  const summary=byId('summary-text');
  if(summary) summary.textContent=d.profile.summary;
  const membership=byId('membership-description');
  if(membership) membership.textContent=d.professionalProfile.membershipDescription;

  const homeShell=document.querySelector('.home-shell');
  const profileToggle=byId('profile-toggle');
  const profileExpanded=byId('profile-expanded');
  if(profileToggle && profileExpanded) {
    profileExpanded.replaceChildren(
      el('p','eyebrow','STRENGTHS, SKILLS & LANGUAGES'),
      el('h2','panel-heading','Professional Profile'),
      makeProfessionalProfile(d.professionalProfile)
    );
    profileToggle.addEventListener('click',()=>{
      const isOpen=profileToggle.getAttribute('aria-expanded')==='true';
      // Opening the profile returns the homepage to its default overview state.
      if(homeShell) homeShell.classList.remove('has-section-view');
      const sectionPanel=byId('section-detail');
      if(sectionPanel){ sectionPanel.hidden=true; sectionPanel.replaceChildren(); }
      document.querySelectorAll('[data-section]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-expanded','false');});
      profileToggle.setAttribute('aria-expanded',String(!isOpen));
      profileExpanded.hidden=isOpen;
      profileToggle.classList.toggle('active',!isOpen);
    });
  }

  const sectionPanel=byId('section-detail');
  function showSection(key) {
    if(!sectionPanel) return;
    // Section navigation temporarily replaces the summary and membership content.
    if(homeShell) homeShell.classList.add('has-section-view');
    if(profileExpanded) profileExpanded.hidden=true;
    if(profileToggle){ profileToggle.setAttribute('aria-expanded','false'); profileToggle.classList.remove('active'); }
    sectionPanel.hidden=false;
    sectionPanel.replaceChildren();
    document.querySelectorAll('[data-section]').forEach(b=>{
      const active=b.dataset.section===key;
      b.classList.toggle('active',active);
      b.setAttribute('aria-expanded',String(active));
    });
    if(key==='education') {
      sectionPanel.append(el('p','eyebrow','EDUCATION'),el('h2','panel-heading','Educational Background'),makeEducation(d.education));
      if(Array.isArray(d.academicContributions) && d.academicContributions.length) sectionPanel.append(el('p','eyebrow','ACADEMIC CONTRIBUTIONS'),makeEducation(d.academicContributions.map(x=>({period:x.subtitle,degree:x.title,institution:x.description}))));
    } else if(key==='career') {
      sectionPanel.append(el('p','eyebrow','CAREER JOURNEY'),el('h2','panel-heading','Career Journey'),makeCareer(d.career));
    } else if(key==='acoustics') {
      sectionPanel.append(el('p','eyebrow','ACOUSTICAL EXPERIENCE'),el('h2','panel-heading','Listening, measuring, modelling.'),makeAcoustics(d.acoustics));
    }
  }
  document.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>{
    const isOpen=b.getAttribute('aria-expanded')==='true';
    if(isOpen) {
      sectionPanel.hidden=true; sectionPanel.replaceChildren();
      if(homeShell) homeShell.classList.remove('has-section-view');
      b.classList.remove('active'); b.setAttribute('aria-expanded','false');
    } else showSection(b.dataset.section);
  }));

  const grid=byId('design-grid');
  if(grid) d.designProjects.forEach(p=>{const card=el('article','design-project');const visual=el('div','design-visual');if(p.image){const img=el('img','project-cover');img.src=p.image;img.alt=p.title+' project preview';visual.append(img);}const info=el('div','design-info');info.append(el('p','eyebrow',p.type),el('h2','',p.title),el('p','muted',p.description));card.append(visual,info);if(p.gallery&&p.gallery.length){const gallery=el('div','project-gallery');p.gallery.forEach((src,j)=>{const link=el('a','gallery-shot');link.href=src;link.target='_blank';link.rel='noopener';const img=el('img','');img.src=src;img.alt=p.title+' — portfolio image '+(j+1);img.loading='lazy';link.append(img);gallery.append(link);});card.append(gallery);}grid.append(card);});
  if(byId('year2')) byId('year2').textContent=new Date().getFullYear();
 } catch(err) { console.error(err); const p=document.getElementById('section-detail'); if(p) {p.hidden=false;p.textContent='Unable to load content.json. Open the folder in VS Code and run it with Live Server.';} }
}
document.addEventListener('DOMContentLoaded',init);
