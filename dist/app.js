(() => {
  'use strict';
  const D = window.LAB_DATA;
  const main = document.getElementById('main-content');
  const e = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const area = id => D.areas.find(item => item.id === id);
  const state = {research:'all',people:'all',pubType:'journals',patentScope:'all'};
  const iconPaths = {
    gfm:'<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M6 17 18 7M2 8h4m12 8h4M9 7c1-3 2 3 3 0m0 10h3"/>',
    hvdc:'<rect x="2" y="7" width="5" height="10" rx="1"/><rect x="17" y="7" width="5" height="10" rx="1"/><path d="M7 10h10M7 14h10M3.5 12l2-3m13 6 2-3M4.5 4v3m15-3v3M4.5 17v3m15-3v3"/>',
    simulation:'<rect x="2" y="3" width="20" height="17" rx="1"/><path d="M2 7h20M5 15h3l2-5 4 8 3-5h2M5 5h1m2 0h1"/>',
    ai:'<circle cx="4" cy="7" r="2"/><circle cx="4" cy="17" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="20" cy="8" r="2"/><circle cx="20" cy="17" r="2"/><path d="m6 7 4-3M6 8l4 4M6 16l4-4m-4 5 4 3m4-16 4 4m-4 4 4-4m-4 4 4 5m-4 3 4-3"/>',
    arrow:'<path d="M4 12h15m-5-5 5 5-5 5"/>', external:'<path d="M7 17 17 7M7 7h10v10"/>', search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    wave:'<path d="M2 12h3l3-7 5 14 4-10 3 3h2"/>', circuit:'<path d="M7 4h10v16H7zM3 8h4m-4 8h4m10-8h4m-4 8h4M10 1v3m4-3v3m-4 16v3m4-3v3M10 9h4v6h-4z"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>', nodes:'<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="7" r="2.5"/><circle cx="9" cy="19" r="2.5"/><path d="m7.5 5.3 9 1.4M6 7.4l2.3 9.2m3-9.6 5.8 9"/><circle cx="18" cy="18" r="2.5"/>', photo:'<rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="8" cy="9" r="2"/><path d="m3 17 6-5 4 3 3-3 5 5"/>'
  };
  function icon(name, extra='') {return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${iconPaths[name] || iconPaths.arrow}</svg>`;}
  function mediaURL(value) {
    if (!value) return '';
    try {const url = new URL(value, location.href); return ['https:', 'http:', 'file:'].includes(url.protocol) ? url.href : '';} catch {return '';}
  }
  function videoSource() {
    const url = mediaURL(D.introductionVideo?.src);
    if (!url) return null;
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (['youtube.com','www.youtube.com','youtu.be','www.youtube-nocookie.com'].includes(host)) {
      const id = host === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
      return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? {type:'embed',src:'https://www.youtube-nocookie.com/embed/'+id} : null;
    }
    return /\.(mp4|webm)$/i.test(parsed.pathname) ? {type:'video',src:url} : null;
  }
  function introductionVideo() {
    const ready = !!videoSource();
    const poster = mediaURL(D.introductionVideo?.poster);
    return `<div class="hero-video"><button class="video-preview video-preview-branded" data-open-video aria-label="Play lab introduction video" ${ready?'':'disabled aria-describedby="video-status"'}><span class="video-preview-heading">Lab Introduction</span>${poster?`<img class="video-brand-logo" src="${e(poster)}" width="${e(D.introductionVideo?.posterWidth||1124)}" height="${e(D.introductionVideo?.posterHeight||397)}" decoding="async" alt="${e(D.introductionVideo?.posterAlt||'Smart Grid Laboratory logo')}">`:''}<span class="video-preview-footer"><span class="video-watch-label">Watch introduction video</span><span class="video-duration">15 min</span><span class="video-play" aria-hidden="true">▶</span></span></button><p class="video-status" id="video-status">${ready?'Meet our lab and explore our research.':'Introduction video coming soon.'}</p></div>`;
  }
  let videoTrigger;
  function openVideo(trigger) {
    const source = videoSource(); if (!source) return;
    const dialog = document.getElementById('video-dialog');
    const container = document.getElementById('video-player');
    const player = document.createElement(source.type === 'video' ? 'video' : 'iframe');
    player.src = source.src;
    if (source.type === 'video') {player.controls = true; player.preload = 'metadata';}
    else {player.title = 'Lab introduction video';player.allowFullscreen = true;player.referrerPolicy = 'strict-origin-when-cross-origin';}
    container.replaceChildren(player); videoTrigger = trigger; dialog.showModal();
  }
  function closeVideo() {document.getElementById('video-dialog').close();}
  function resetVideo() {document.getElementById('video-player').replaceChildren();if(videoTrigger?.isConnected)videoTrigger.focus();videoTrigger=null;}

  function portrait() {
    const p = D.people.find(p=>p.role==='Professor');
    const photo = mediaURL(p?.photo);
    return photo ? `<img class="portrait professor-photo" src="${e(photo)}" width="400" height="560" decoding="async" alt="${e(p.name)}, Professor">` : '<div class="portrait professor-placeholder"><span>PROFESSOR</span><small>Photo coming soon</small></div>';
  }
  function textLink(href,label) {return `<a class="text-link" href="${e(href)}">${e(label)} ${icon('arrow')}</a>`;}
  function sectionTitle(title,eyebrow,link='',label='View All') {return `<div class="section-top"><div><span class="eyebrow">${e(eyebrow)}</span><h2>${e(title)}</h2></div>${link ? textLink(link,label):''}</div>`;}
  function pageHeading(title,label,description,options={}) {
    const theme={Research:'research',Publications:'publications',Team:'team',Contact:'contact'}[options.parent?.name||title]||'';
    const current=options.long?'Article':title;
    const trail=`<li><a href="#/">Home</a></li>${options.parent?`<li><a href="${e(options.parent.href)}">${e(options.parent.name)}</a></li>`:''}<li aria-current="page" lang="${langFor(current)}">${e(current)}</li>`;
    return `<section class="page-heading ${theme?'heading-'+theme:''} ${options.long?'long-title':''}"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${trail}</ol></nav><span class="eyebrow">${e(label)}</span><h1 lang="${langFor(title)}">${e(title)}</h1>${description?`<p lang="${langFor(description)}">${e(description)}</p>`:''}</div></section>`;
  }
  function areaLinks() {
    return D.areas.map(a=>{
      const topic=D.research.find(r=>r.area===a.id);
      return `<a class="area-item" href="#/research?area=${e(topic?.id||'')}">${icon(a.icon)}<h3>${e(a.english)}</h3><p>${e(a.description)}</p></a>`;
    }).join('');
  }
  function researchCard(r) {
    const papers=(r.papers||[]).map(id=>D.publications.find(p=>p.id===id)).filter(Boolean);
    return `<section class="research-topic jump-target" id="${e(r.id)}" tabindex="-1"><div class="topic-heading">${icon(area(r.area).icon)}</div><h2>${e(r.name)}</h2><p>${e(r.description)}</p><ul lang="en">${r.topics.map(t=>`<li>${e(t)}</li>`).join('')}</ul>${papers.length?`<div class="related-publications"><h3>Related publication</h3>${papers.map(p=>`<div class="related-publication-item"><a href="#/publications/${e(p.id)}">${e(p.name)} ${icon('arrow')}</a></div>`).join('')}</div>`:''}</section>`;
  }
  function researchOverview() {
    return `<div class="research-topics">${D.research.map(researchCard).join('')}</div><details class="research-topic-list additional-topics"><summary>More research topics</summary><ul lang="en">${D.researchTopics.map(t=>`<li>${e(t)}</li>`).join('')}</ul></details>`;
  }
  function bibliography(p) {return [p.journal,p.volume?`Vol. ${p.volume}`:'',p.issue?`No. ${p.issue}`:'',p.month?new Date(2000,p.month-1,1).toLocaleString('en',{month:'short'}):'',p.year].filter(Boolean).join(' · ');}
  function scholarLink(p) {return p.scholarURL || 'https://scholar.google.com/scholar?q='+encodeURIComponent(p.name);}
  function publicationRow(p,full=false) {
    return `<div class="publication-row ${full?'full-publication':''}"><span class="paper-year">${e(p.year)}</span><div class="publication-content"><a class="paper-title" href="#/publications/${e(p.id)}"><h3 lang="${langFor(p.name)}">${e(p.name)}</h3>${icon('arrow','class="row-arrow"')}</a><p class="authors" lang="${langFor(p.authors)}">${e(p.authors)}</p><p class="journal">${e(bibliography(p))}</p>${full?`<div class="publication-bottom"><a class="inline-link" href="${e(scholarLink(p))}" target="_blank" rel="noopener noreferrer">${p.scholarURL?'Google Scholar':'Search on Google Scholar'} ↗</a><button class="citation-button" data-copy-citation="${e(p.id)}" aria-label="Copy citation for ${e(p.name)}">Copy Citation</button></div>`:''}</div></div>`;
  }

  function hubLink() {return `<div class="hub-link"><div><span class="eyebrow">RESEARCH CENTER</span><h2>C2 Grid Hub</h2></div><a class="text-link" href="${e(D.hub)}" target="_blank" rel="noopener noreferrer">Visit Website ${icon('external')}</a></div>`;}
  function contactSummary() {return `<section class="home-contact"><div class="container home-contact-inner"><div class="home-contact-copy"><h2>Contact</h2><div class="inquiry-copy"><p>We welcome inquiries about undergraduate internships and M.S., Ph.D., and combined M.S.–Ph.D. programs.</p></div></div><div class="home-contact-links"><a class="contact-address" href="mailto:khur@yonsei.ac.kr">khur@yonsei.ac.kr</a>${textLink('#/contact','Contact Details')}</div></div></section>`;}
  function homePage() {
    return `<section class="hero"><div class="hero-grid-background" aria-hidden="true"></div><div class="container hero-inner"><div class="hero-copy"><span class="eyebrow">YONSEI UNIVERSITY</span><h1>Smart Grid<br><span>Laboratory</span></h1><p class="hero-affiliation">School of Electrical &amp; Electronic Engineering<br>Yonsei University</p><div class="hero-actions"><a class="button" href="#/research">Research ${icon('arrow')}</a><a class="button secondary" href="#/publications">Publications ${icon('arrow')}</a></div></div>${introductionVideo()}</div></section><section class="areas-section"><div class="container"><div class="section-top"><h2>Research Areas</h2>${textLink('#/research','View Research')}</div><div class="area-grid">${areaLinks()}</div>${hubLink()}</div></section><section class="section updates-section"><div class="container home-publications">${sectionTitle('Recent Publications','PUBLICATIONS','#/publications','View All Publications')}<div>${D.publications.slice(0,4).map(p=>publicationRow(p)).join('')}</div><a class="inline-link scholar-profile" href="${e(D.scholar)}" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a></div></section>${contactSummary()}`;
  }
  function filterChips(items,current,attribute) {return items.map(item=>`<button class="filter-chip ${current===item.id?'selected':''}" ${attribute}="${e(item.id)}" aria-pressed="${current===item.id}">${e(item.name)}</button>`).join('');}
  function researchNav(view='areas') {return `<nav class="research-navigation" aria-label="Research sections">${[['areas','Research Areas'],['projects','Projects'],['collaborators','Collaborators'],['center','Research Center']].map(([id,label])=>`<a href="#/research?view=${id}" ${view===id?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;}
  function collaboratorEntry(item) {
    if(item.details)return `<details class="collaborator-detail"><summary><span>${e(item.name)}</span><small>Details</small></summary><div class="collaborator-detail-body">${item.details.map(section=>`<section><h3>${e(section.title)}</h3><ul>${section.items.map(text=>`<li lang="${langFor(text)}">${e(text)}</li>`).join('')}</ul></section>`).join('')}${item.detailLinks?.length?`<div class="collaborator-detail-links">${item.detailLinks.map(link=>`<a href="${e(link.url)}" target="_blank" rel="noopener noreferrer">${e(link.label||'Related Website')} ${icon('external')}</a>`).join('')}</div>`:''}</div></details>`;
    return item.url?`<a class="collaborator-external" href="${e(item.url)}" target="_blank" rel="noopener noreferrer"><span>${e(item.name)}</span>${icon('external')}</a>`:e(item.name);
  }
  function collaboratorsContent() {return `<p class="content-reference">Collaboration directory · October 2026. Affiliations are recorded affiliations.</p><div class="collaborator-groups">${D.collaborators.map(group=>group.layout==='directory'?`<section class="collaborator-directory"><h2>${e(group.name)}</h2><table><thead><tr><th scope="col">Name</th><th scope="col">Affiliation</th></tr></thead><tbody>${group.items.map(item=>`<tr><th scope="row">${e(item.name)}</th><td>${e(item.affiliation)}</td></tr>`).join('')}</tbody></table></section>`:`<section><h2>${e(group.name)}</h2><ul>${group.items.map(item=>`<li>${collaboratorEntry(item)}</li>`).join('')}</ul></section>`).join('')}</div>`;}
  function projectList(items) {
    return `<ul class="project-list">${items.map(p=>`<li><h3 lang="${langFor(p.name)}">${e(p.name)}</h3><p lang="${langFor(p.sponsor)}">${e(p.sponsor)}</p></li>`).join('')}</ul>`;
  }
  function projectsContent() {
    return `<p class="content-reference">Project status as listed on <time datetime="${e(D.projectsSource.checked)}">${e(displayDate(D.projectsSource.checked))}</time>.</p><section class="project-section research-projects" data-project-kind="active"><h2>Active Projects <span>${D.projects.length}</span></h2>${projectList(D.projects)}</section><section class="project-section" data-project-kind="completed"><h2>Completed Projects <span>${D.completedProjects.length}</span></h2>${projectList(D.completedProjects)}</section>`;
  }
  function researchPage(query) {
    const views=['areas','projects','collaborators','center'];const view=views.includes(query.get('view'))?query.get('view'):'areas';
    let content;
    if(view==='areas')content=researchOverview();
    else if(view==='projects')content=projectsContent();
    else if(view==='collaborators')content=collaboratorsContent();
    else content=`<section class="center-feature"><span class="eyebrow">YONSEI UNIVERSITY</span><h2>C2 Grid Hub</h2><p>AI·SW HVDC Integrated Power System Innovation Research Center</p><a class="button" href="${e(D.hub)}" target="_blank" rel="noopener noreferrer">Visit C2 Grid Hub ${icon('external')}</a></section>`;
    return `${pageHeading('Research','RESEARCH & COLLABORATION','')}<section class="content-section"><div class="container">${researchNav(view)}${content}</div></section>`;
  }
  function publicationsPage(query) {
    state.pubType=query.get('type')==='patents'?'patents':'journals';
    const patents=state.pubType==='patents';
    const years=[...new Set(D.publications.map(p=>p.year))].sort((a,b)=>Number(b)-Number(a));
    const yearNavigation=`<div class="bibliography-navigation"><nav class="year-links" aria-label="Publication years">${years.map(y=>`<button data-jump-year="${e(y)}">${e(y)}</button>`).join('')}</nav><div class="mobile-year-picker"><label for="publication-year">Year</label><select id="publication-year" aria-label="Publication year">${years.map(y=>`<option value="${e(y)}">${e(y)}</option>`).join('')}</select></div><a class="inline-link" href="${e(D.scholar)}" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a></div>`;
    return `${pageHeading('Publications','JOURNAL ARTICLES & PATENTS','')}<section class="content-section"><div class="container"><nav class="publication-tabs" aria-label="Publication categories"><a href="#/publications" ${!patents?'aria-current="page"':''}>Journal Articles <span>${D.publications.length}</span></a><a href="#/publications?type=patents" ${patents?'aria-current="page"':''}>Patents <span>${D.patents.length}</span></a></nav>${patents?`<div class="filter-bar" id="patent-filters">${filterChips([{id:'all',name:'All Patents'},{id:'International',name:'International'},{id:'Domestic',name:'Domestic'}],state.patentScope,'data-patent-filter')}</div>`:yearNavigation}<div class="results-meta"><span id="paper-count" role="status" aria-live="polite"></span></div><div id="publication-results"></div></div></section>`;
  }
  function updatePublications() {
    const patents=state.pubType==='patents';
    const results=patents?D.patents.filter(p=>state.patentScope==='all'||p.scope===state.patentScope).sort((a,b)=>{
      const scope=(a.scope==='International'?0:1)-(b.scope==='International'?0:1);
      const aDate=Date.parse(a.date),bDate=Date.parse(b.date);
      return scope||(Number.isNaN(bDate)?-Infinity:bDate)-(Number.isNaN(aDate)?-Infinity:aDate)||0;
    }):D.publications;
    document.getElementById('paper-count').textContent=results.length+(patents?' patent records · October 2026 directory':' journal articles');
    document.getElementById('publication-results').innerHTML=patents?results.map(patentRow).join(''):[...new Set(results.map(p=>p.year))].sort((a,b)=>Number(b)-Number(a)).map(y=>`<section class="publication-year-group" aria-labelledby="year-${e(y)}"><h2 id="year-${e(y)}" tabindex="-1">${e(y)}</h2>${results.filter(p=>p.year===y).map(p=>publicationRow(p,true)).join('')}</section>`).join('');
  }
  function patentRow(p) {
    return `<article class="patent-row"><div class="patent-meta"><span>${e(p.scope)}${p.country?' · '+e(p.country):''}</span><span>${e(p.date||'Date not listed')}</span></div><h2 lang="${langFor(p.name)}">${e(p.name)}</h2><p class="patent-number">${e(p.number||'Number not listed')}${p.procedure?' · '+e(p.procedure):''}</p><p class="patent-inventors" lang="${langFor(p.inventors)}">${e(p.inventors)}</p><button class="citation-button" data-copy-patent="${e(p.id)}" aria-label="Copy patent record for ${e(p.name)}">Copy Record</button></article>`;
  }
  function paperDetail(id) {
    const p=D.publications.find(x=>x.id===id);if(!p)return notFound();
    return `${pageHeading(p.name,'JOURNAL ARTICLE','',{long:true,parent:{name:'Publications',href:'#/publications'}})}<section class="content-section"><div class="container article-width"><dl class="paper-metadata"><dt>Authors</dt><dd>${e(p.authors)}</dd><dt>Publication</dt><dd>${e(bibliography(p))}</dd></dl><div class="detail-section"><h2>Citation</h2><p class="citation-text" lang="${langFor(p.citation)}">${e(p.citation)}</p></div><div class="detail-action-row"><a class="button" href="${e(scholarLink(p))}" target="_blank" rel="noopener noreferrer">${p.scholarURL?'Google Scholar':'Search on Google Scholar'} ${icon('external')}</a><button class="button secondary" data-copy-citation="${e(p.id)}">Copy Citation ${icon('layers')}</button></div><div class="article-back">${textLink('#/publications','Back to Publications')}</div></div></section>`;
  }
  function professorLinks(p) {
    return '<div class="professor-links">'+[['CV',p.cv],['Google Scholar',p.scholar]].filter(([,url])=>mediaURL(url)).map(([label,url])=>`<a class="inline-link" href="${e(mediaURL(url))}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')+'</div>';
  }
  function memberEmail(p) {return p.email?`<a class="member-email" href="mailto:${e(p.email)}">${e(p.email)}</a>`:'';}
  function professorFeature(p) {return `<div class="professor-feature">${portrait()}<div><span class="eyebrow">Professor</span><h2><a href="#/team/${e(p.id)}">${e(p.name)}</a></h2><div class="professor-sub">Professor · School of Electrical and Electronic Engineering, Yonsei University</div>${memberEmail(p)}${p.topics?`<p>${e(p.topics)}</p>`:""}<h3 class="interests-heading">Research Interests</h3><ul class="professor-interests" lang="en">${p.interests.map(t=>`<li>${e(t)}</li>`).join('')}</ul>${professorLinks(p)}</div></div>`;}
  function professorCredentials(p) {return `<div class="professor-credentials"><section><h3>Education</h3><ul>${p.education.map(t=>`<li>${e(t)}</li>`).join('')}</ul></section><section><h3>Professional Experience</h3><ul>${p.experience.map(t=>`<li>${e(t)}</li>`).join('')}</ul></section></div>`;}
  function peoplePage(query) {
    if(['professor','current-members','alumni','visiting-researchers'].includes(query.get('section')))state.people='all';
    const jumpNavigation=`<nav class="team-navigation" aria-label="Team sections">${[['professor','Professor'],['current-members','Current Members'],['alumni','Alumni'],['visiting-researchers','Visitors']].map(([id,label])=>`<a href="#/team?section=${id}" data-scroll-target="${id}">${label}</a>`).join('')}</nav>`;
    return `${pageHeading('Team','PROFESSOR & MEMBERS','')}<section class="content-section"><div class="container">${jumpNavigation}<section id="professor" class="jump-target" tabindex="-1">${professorFeature(D.people[0])}${professorCredentials(D.people[0])}</section><div class="filter-bar" id="people-filters" role="group" aria-label="Member categories">${filterChips([{id:'all',name:'All Members'},{id:'Ph.D. Student',name:'Ph.D. Students'},{id:'M.S. Student',name:'M.S. Students'},{id:'Ph.D. Alumni',name:'Ph.D. Alumni'},{id:'M.S. Alumni',name:'M.S. Alumni'},{id:'Visiting Researcher',name:'Visiting Researchers'}],state.people,'data-person-filter')}</div><p class="results-meta" id="people-count" role="status" aria-live="polite"></p><div id="people-results">${filteredPeople()}</div></div></section>`;
  }
  function memberRows(members,visiting=false) {return `<ul class="member-list">${members.map(p=>`<li><div class="member-identity"><span class="member-name" lang="${langFor(p.name)}">${e(p.name)}</span>${visiting?'':memberEmail(p)}</div><span class="member-degree">${e(visiting?p.visitingAffiliation:p.role)}${visiting&&p.note?`<small class="visiting-note" lang="${langFor(p.note)}">${e(p.note)}</small>`:""}</span><p lang="${langFor(p.topics)}">${e(p.topics||'—')}</p></li>`).join('')}</ul>`;}
  function graduationKey(p) {const match=/^(\d{4})(?:[.\/-](\d{1,2}))?/.exec(p.graduationDate||'');return match?Number(match[1])*12+Number(match[2]||0):-Infinity;}
  function alumniTable(members,degree) {
    const hint='alumni-hint-'+(degree==='Ph.D.'?'phd':'ms');
    return `<section class="alumni-degree" data-degree="${e(degree)}"><h3>${e(degree)} Alumni <span>${members.length}</span></h3><p class="scroll-hint" id="${hint}">Scroll horizontally to view all columns. ${icon('arrow')}</p><div class="alumni-scroll" role="region" aria-label="${e(degree)} Alumni" aria-describedby="${hint}" tabindex="0"><table class="alumni-table"><thead><tr><th scope="col">Name</th><th scope="col">Degree</th><th scope="col">Graduation ↓</th><th scope="col">Affiliation (recorded)</th></tr></thead><tbody>${members.map(p=>`<tr><th scope="row"><span class="member-name" lang="${langFor(p.name)}">${e(p.name)}</span></th><td>${e(p.degree)}</td><td>${e(p.graduationDate||'—')}</td><td lang="${langFor(p.affiliation)}">${e(p.affiliation||'—')}</td></tr>`).join('')}</tbody></table></div></section>`;
  }
  function filteredPeople() {
    const students=[...(D.currentPhdStudents||D.people.filter(p=>p.role==='Ph.D. Student')),...D.people.filter(p=>p.role==='M.S. Student')].filter(p=>state.people==='all'||p.role===state.people);
    const visitors=D.people.filter(p=>p.role==='Visiting Researcher');
    const alumni=['Ph.D.','M.S.'].filter(degree=>state.people==='all'||state.people===degree+' Alumni').map(degree=>alumniTable(D.people.filter(p=>p.role==='Alumni'&&p.degree===degree).sort((a,b)=>graduationKey(b)-graduationKey(a)),degree)).join('');
    return (students.length?`<section class="member-section jump-target" id="current-members" tabindex="-1"><h2>Current Members</h2>${['Ph.D. Student','M.S. Student'].map(role=>{const members=students.filter(p=>p.role===role);return members.length?`<h3 class="member-group-title">${role==='Ph.D. Student'?'Ph.D. Students':'M.S. Students'} <span>${members.length}</span></h3>${memberRows(members)}`:'';}).join('')}</section>`:'')+(alumni?`<section class="member-section jump-target" id="alumni" tabindex="-1"><h2>Alumni</h2><p class="content-reference">Affiliations from the October 2026 directory.</p>${alumni}</section>`:'')+(['all','Visiting Researcher'].includes(state.people)?`<section class="member-section jump-target" id="visiting-researchers" tabindex="-1"><h2>Visiting Researchers</h2><p class="directory-date">Affiliations refer to the period of the visit.</p>${memberRows(visitors,true)}</section>`:'');
  }
  function personDetail(id) {
    const p=D.people.find(x=>x.id===id);if(!p)return notFound();
    return `${pageHeading(p.name,p.role,'Smart Grid Laboratory',{parent:{name:'Team',href:'#/team'}})}<section class="content-section"><div class="container person-detail">${p.role==='Professor'?`${professorFeature(p)}${professorCredentials(p)}`:`<div class="member-profile"><span class="eyebrow">${e(p.role)}</span><h2>${e(p.name)}</h2>${p.topics?`<h3>Research Interests</h3><p>${e(p.topics)}</p>`:''}${p.role==='Alumni'?`<dl class="alumni-meta"><dt>Degree</dt><dd>${e(p.degree)}</dd><dt>Graduation</dt><dd>${e(p.graduationDate||'—')}</dd><dt>Affiliation</dt><dd>${e(p.affiliation||'—')}</dd></dl>`:''}${p.role==='Visiting Researcher'?`<h3>Affiliation During Visit</h3><p>${e(p.visitingAffiliation)}</p>${p.note?`<p>${e(p.note)}</p>`:''}`:''}</div>`}<div class="article-back">${textLink('#/team','Back to Team')}</div></div></section>`;
  }




  function mapLinks(query,label) {const q=encodeURIComponent(query);return `<nav class="map-links" aria-label="Maps for ${e(label)}"><a href="https://www.google.com/maps/search/?api=1&amp;query=${q}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href="https://map.naver.com/p/search/${q}" target="_blank" rel="noopener noreferrer">Naver Map ↗</a><a href="https://map.kakao.com/link/search/${q}" target="_blank" rel="noopener noreferrer">Kakao Map ↗</a></nav>`;}
  function contactPage() {return `${pageHeading('Contact','YONSEI UNIVERSITY · SINCHON','')}<section class="content-section"><div class="container"><section class="inquiries"><div><h2>Admissions &amp; Inquiries</h2><div class="inquiry-copy admission-copy"><p>For information about undergraduate internships and admission to our M.S., Ph.D., or combined M.S.–Ph.D. programs, please contact Professor Kyeon Hur by email.</p></div><a class="inquiry-address" href="mailto:khur@yonsei.ac.kr">khur@yonsei.ac.kr</a></div></section><div class="location-intro"><h2>Location</h2><p>Yonsei University, Sinchon Campus<br>50 Yonsei-ro, Seodaemun-gu, Seoul 03722, Korea</p></div><div class="location-grid"><article class="location-card"><h3>Engineering Research Park</h3><dl><dt>Laboratory</dt><dd>Room 246C</dd><dt>Telephone</dt><dd><a href="tel:+82221238396">+82-2-2123-8396</a></dd></dl>${mapLinks('연세대학교 공학원', 'Engineering Research Park')}</article><article class="location-card"><h3>Engineering Building 3</h3><dl><dt>Laboratory</dt><dd>Room C129</dd><dt>Professor’s Office</dt><dd>Room C125</dd><dt>Telephone</dt><dd><a href="tel:+82221237436">+82-2-2123-7436</a></dd></dl>${mapLinks('연세대학교 제3공학관', 'Engineering Building 3')}</article></div></div></section>`;}
  function notFound() {return `${pageHeading('Page not found','PAGE NOT FOUND','Please check the address or return to the home page.')}<section class="content-section"><div class="container"><a class="button" href="#/">Back to Home ${icon('arrow')}</a></div></section>`;}
  function langFor(value) {return /[가-힣]/.test(String(value||''))?'ko':'en';}
  function displayDate(value) {
    return new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T00:00:00Z'));
  }
  function focusSection(id) {
    const target=document.getElementById(id);
    if(!target||!target.classList.contains('jump-target'))return;
    const shortcuts=document.querySelector('.team-navigation');
    const offset=document.getElementById('site-header').getBoundingClientRect().height+(shortcuts?.getBoundingClientRect().height||0)+24;
    const top=window.scrollY+target.getBoundingClientRect().top-offset;
    target.focus({preventScroll:true});
    window.scrollTo({top,behavior:'instant'});
  }
  function jumpToYear(year) {
    const heading=document.getElementById('year-'+year);
    if(!heading)return;
    const tools=document.querySelector('.bibliography-navigation');
    const offset=document.getElementById('site-header').getBoundingClientRect().height+(tools?.getBoundingClientRect().height||0)+20;
    const top=window.scrollY+heading.getBoundingClientRect().top-offset;
    heading.focus({preventScroll:true});window.scrollTo({top,behavior:'instant'});
    const picker=document.getElementById('publication-year');
    if(picker)picker.value=String(year);
    document.querySelectorAll('[data-jump-year]').forEach(button=>{
      if(button.dataset.jumpYear===String(year))button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');
    });
  }
  function updatePeopleStatus() {
    const status=document.getElementById('people-count');
    if(status)status.textContent=document.querySelectorAll('#people-results .member-list>li,#people-results tbody tr').length+' members shown';
  }
  function updateBackToTop() {document.getElementById('back-to-top').hidden=window.scrollY<900;}
  function closeMenu(){document.getElementById('mobile-nav').hidden=true;document.getElementById('menu-toggle').setAttribute('aria-expanded','false');document.getElementById('menu-toggle').setAttribute('aria-label','Open Menu');}
  function render(initial=false) {
    const hash=location.hash.slice(1)||'/';
    const [path,queryString='']=hash.split('?');
    const [section,id]=path.split('/').filter(Boolean);
    const query=new URLSearchParams(queryString);
    let html,title='Smart Grid Laboratory';
    if(!section)html=homePage();
    else if(section==='research'){
      if(id){location.replace('#/research?area='+encodeURIComponent(id));return;}
      html=researchPage(query);title='Research';
    }
    else if(section==='publications'){html=id?paperDetail(id):publicationsPage(query);title=id?(D.publications.find(p=>p.id===id)?.name||'Publications'):'Publications';}
    else if(section==='people'){location.replace('#/team'+(id?'/'+encodeURIComponent(id):''));return;}
    else if(section==='team'){html=id?personDetail(id):peoplePage(query);title=id?(D.people.find(p=>p.id===id)?.name||'Team'):'Team';}
    else if(section==='join'){location.replace('#/contact');return;}
    else if(section==='contact'){html=contactPage();title='Contact';}
    else{html=notFound();title='Page not found';}
    if(document.getElementById('video-dialog').open)closeVideo();
    main.innerHTML=`<div class="fade-in">${html}</div>`;
    document.title=title+' | Yonsei University';
    document.querySelectorAll('[data-nav]').forEach(link=>{
      const current=link.dataset.nav===section;
      link.classList.toggle('active',current);
      if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
    closeMenu();
    if(section==='publications'&&!id)updatePublications();
    if(section==='team'&&!id)updatePeopleStatus();
    if(!initial){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
    const destination=section==='research'&&query.get('view')!=='projects'&&query.get('view')!=='collaborators'&&query.get('view')!=='center'?query.get('area'):section==='team'&&!id?query.get('section'):null;
    if(destination)focusSection(destination);
    updateBackToTop();
  }
  let toastTimeout;
  function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),2800);}
  async function copyText(text){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok)throw new Error('copy');}toast('Copied to clipboard.');}catch{toast('Copy is unavailable. Select the text to copy it.');}}
  function updateChipSelection(group,value){document.querySelectorAll(group+' .filter-chip').forEach(button=>{const selected=Object.values(button.dataset).includes(value);button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});}
  document.addEventListener('click',event=>{
    const target=event.target.closest('button,a');if(!target)return;
    if(target.classList.contains('skip-link')){event.preventDefault();main.focus();main.scrollIntoView({behavior:'instant'});return;}
    if(target.id==='back-to-top'){
      const picker=document.getElementById('publication-year');
      if(picker){
        picker.selectedIndex=0;
        document.querySelectorAll('[data-jump-year]').forEach(button=>{
          if(button.dataset.jumpYear===picker.value)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');
        });
      }
      window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
    }
    if(target.dataset.scrollTarget&&location.hash===target.hash){event.preventDefault();state.people='all';render();}
    if(target.id==='menu-toggle'){const nav=document.getElementById('mobile-nav');const open=nav.hidden;nav.hidden=!open;target.setAttribute('aria-expanded',String(open));target.setAttribute('aria-label',open?'Close Menu':'Open Menu');}
    if(target.dataset.jumpYear)jumpToYear(target.dataset.jumpYear);
    if(target.dataset.patentFilter){state.patentScope=target.dataset.patentFilter;updateChipSelection('#patent-filters',state.patentScope);updatePublications();}
    if(target.dataset.personFilter){state.people=target.dataset.personFilter;document.getElementById('people-results').innerHTML=filteredPeople();updateChipSelection('#people-filters',state.people);updatePeopleStatus();}
    if(target.hasAttribute('data-open-video'))openVideo(target);
    if(target.hasAttribute('data-close-video'))closeVideo();
    if(target.dataset.copyCitation){const p=D.publications.find(x=>x.id===target.dataset.copyCitation);if(p)copyText(p.citation);}
    if(target.dataset.copyPatent){const p=D.patents.find(x=>x.id===target.dataset.copyPatent);if(p)copyText(p.citation);}
    if(target.matches('.mobile-nav a'))closeMenu();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const wasOpen=!document.getElementById('mobile-nav').hidden;closeMenu();if(wasOpen)document.getElementById('menu-toggle').focus();}});
  const desktopMedia=window.matchMedia('(min-width:761px)');
  desktopMedia.addEventListener('change',event=>{if(event.matches)closeMenu();});
  document.addEventListener('change',event=>{if(event.target.id==='publication-year')jumpToYear(event.target.value);});
  window.addEventListener('scroll',updateBackToTop,{passive:true});
  window.addEventListener('hashchange',()=>render());
  document.getElementById('copyright-year').textContent=new Date().getFullYear();
  document.getElementById('video-dialog').addEventListener('close',resetVideo);
  document.getElementById('video-dialog').addEventListener('click',event=>{if(event.target===event.currentTarget)closeVideo();});
  render(true);
})();
