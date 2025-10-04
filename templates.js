
const sanitizeHTML = (str) => {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

function renderModernTemplate(data) {
    return `
        <div id="cv-preview-content" class="bg-white modern-template flex text-sm">
            <div class="w-1/3 text-white p-8 sidebar-curve" style="background-color: var(--modern-dark);">
                ${data.profilePic ? `<img src="${data.profilePic}" alt="Profile Picture" class="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg">` : ''}
                <div class="mb-8"><h3 class="text-lg font-bold border-b-2 border-white pb-2 mb-3 uppercase tracking-wider">About Me</h3><p class="text-xs leading-relaxed">${sanitizeHTML(data.summary) || 'Professional summary'}</p></div>
                <div class="mb-8"><h3 class="text-lg font-bold border-b-2 border-white pb-2 mb-3 uppercase tracking-wider">Contact</h3><ul class="space-y-2 text-xs">${data.phone ? `<li><img src="https://cdn-icons-png.flaticon.com/512/126/126341.png" class="inline-block w-4 h-4 mr-2"> ${sanitizeHTML(data.phone)}</li>` : ''}${data.email ? `<li><img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" class="inline-block w-4 h-4 mr-2"> ${sanitizeHTML(data.email)}</li>` : ''}${data.address ? `<li><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" class="inline-block w-4 h-4 mr-2"> ${sanitizeHTML(data.address)}</li>` : ''}${data.personalWebsite ? `<li><img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" class="inline-block w-4 h-4 mr-2"> <a href="${data.personalWebsite}" class="social-link">Website</a></li>` : ''}${data.github ? `<li><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="inline-block w-4 h-4 mr-2"> <a href="${data.github}" class="social-link">GitHub</a></li>` : ''}${data.linkedin ? `<li><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="inline-block w-4 h-4 mr-2"> <a href="${data.linkedin}" class="social-link">LinkedIn</a></li>` : ''}</ul></div>
                <div><h3 class="text-lg font-bold border-b-2 border-white pb-2 mb-3 uppercase tracking-wider">Languages</h3><ul class="space-y-2 text-xs">${data.languages && data.languages.length > 0 ? data.languages.map(lang => `<li>${sanitizeHTML(lang.name)}${lang.proficiency ? ` - ${sanitizeHTML(lang.proficiency)}` : ''}</li>`).join('') : '<li>No languages specified</li>'}</ul></div>
            </div>
            <div class="w-2/3 p-8">
                <div class="mb-8"><h1 class="text-4xl font-bold text-[var(--modern-dark)]">${sanitizeHTML(data.name) || 'Your Name'}</h1><p class="text-xl text-gray-600">${sanitizeHTML(data.title) || 'Professional Title'}</p></div>
                <div class="mb-8"><h3 class="text-xl font-bold text-[var(--modern-dark)] border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wider">${sanitizeHTML(data.experienceTitle) || 'Professional Experience'}</h3>
                    <div class="space-y-4">${data.experience && data.experience.length > 0 ? data.experience.map(exp => `<div class="mb-4">${exp.showTitle && exp.title ? `<h4 class="font-bold text-base">${sanitizeHTML(exp.title)}</h4>` : ''}${exp.showCompany && exp.company ? `<p class="text-sm font-semibold text-gray-700">${sanitizeHTML(exp.company)}</p>` : ''}${exp.showPeriod && exp.period ? `<p class="text-xs text-gray-600 mt-1">${sanitizeHTML(exp.period)}</p>` : ''}${exp.showDescription && exp.description ? `<p class="text-xs text-gray-600 mt-1">${sanitizeHTML(exp.description)}</p>` : ''}</div>`).join('') : '<p>No experience added</p>'}</div>
                </div>
                <div class="mb-8"><h3 class="text-xl font-bold text-[var(--modern-dark)] border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wider">Education</h3>
                    <div class="space-y-4">${data.education && data.education.length > 0 ? data.education.map(edu => `<div><h4 class="font-bold text-base">${sanitizeHTML(edu.degree) || 'Degree'}</h4><p class="text-sm font-semibold text-gray-700">${sanitizeHTML(edu.school) || 'Institution'}</p><p class="text-xs text-gray-600">${sanitizeHTML(edu.period) || ''}</p></div>`).join('') : '<p>No education added</p>'}</div>
                </div>
                <div><h3 class="text-xl font-bold text-[var(--modern-dark)] border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wider">Skills</h3>
                    <div class="flex flex-wrap -mx-2">${data.skills && data.skills.length > 0 ? data.skills.map(skill => `<div class="w-1/2 px-2 mb-4"><p class="text-sm mb-1">${sanitizeHTML(skill.name) || 'Skill'}</p><div class="skill-bar-container"><div class="skill-bar" style="width: ${skill.level || 50}%;"></div></div></div>`).join('') : '<p class="px-2">No skills added</p>'}</div>
                </div>
                ${data.showAwards && data.awards ? `
                <div class="mt-8">
                    <h3 class="text-xl font-bold text-[var(--modern-dark)] border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wider">Additional Information</h3>
                    <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                        ${sanitizeHTML(data.awards).split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderClassicTemplate(data) {
    return `
        <div id="cv-preview-content" class="bg-white classic-template p-12 font-merriweather text-gray-800">
            <header class="text-center mb-10">
                <h1 class="text-5xl font-bold font-lato uppercase tracking-widest">${sanitizeHTML(data.name) || 'Your Name'}</h1>
                <p class="text-xl font-lato text-gray-600 mt-2">${sanitizeHTML(data.title) || 'Professional Title'}</p>
                <div class="flex justify-center space-x-4 text-sm text-gray-500 mt-4 font-lato">${data.phone ? `<span>${sanitizeHTML(data.phone)}</span>` : ''}${data.phone && data.email ? `<span>|</span>` : ''}${data.email ? `<span>${sanitizeHTML(data.email)}</span>` : ''}${(data.phone || data.email) && data.address ? `<span>|</span>` : ''}${data.address ? `<span>${sanitizeHTML(data.address)}</span>` : ''}</div>
                <div class="flex justify-center space-x-4 text-sm text-gray-500 mt-2 font-lato">${data.personalWebsite ? `<a href="${data.personalWebsite}" class="social-link">Website</a>` : ''}${data.personalWebsite && data.github ? `<span>|</span>` : ''}${data.github ? `<a href="${data.github}" class="social-link">GitHub</a>` : ''}${(data.personalWebsite || data.github) && data.linkedin ? `<span>|</span>` : ''}${data.linkedin ? `<a href="${data.linkedin}" class="social-link">LinkedIn</a>` : ''}</div>
            </header>

            <section><h2 class="section-title">Summary</h2><p class="text-sm leading-relaxed">${sanitizeHTML(data.summary) || 'Professional summary'}</p></section>
            <section><h2 class="section-title">Technical Skills</h2><div class="flex flex-wrap text-sm">${data.skills && data.skills.length > 0 ? data.skills.map(skill => `<span class="w-1/3 mb-2">• ${sanitizeHTML(skill.name) || 'Skill'}</span>`).join('') : '<span class="w-full">No skills added</span>'}</div></section>

            <section>
                <h2 class="section-title">${sanitizeHTML(data.experienceTitle) || 'Professional Experience'}</h2>
                <div class="space-y-6">${data.experience && data.experience.length > 0 ? data.experience.map(exp => `<div><div class="flex justify-between items-center">${exp.showTitle && exp.title ? `<h3 class="text-lg font-bold font-lato">${sanitizeHTML(exp.title)}</h3>` : ''}${exp.showPeriod && exp.period ? `<p class="text-sm font-semibold font-lato">${sanitizeHTML(exp.period)}</p>` : ''}</div>${exp.showCompany && exp.company ? `<p class="italic text-md">${sanitizeHTML(exp.company)}</p>` : ''}${exp.showDescription && exp.description ? `<ul class="list-disc list-inside text-sm mt-2 leading-relaxed space-y-1">${sanitizeHTML(exp.description).split('\n').filter(s => s.trim()).map(line => `<li>${line.trim()}</li>`).join('')}</ul>` : ''}</div>`).join('') : '<p>No experience added</p>'}</div>
            </section>
            
            <section><h2 class="section-title">Education</h2><div class="space-y-4">${data.education && data.education.length > 0 ? data.education.map(edu => `<div><div class="flex justify-between items-center"><h3 class="text-lg font-bold font-lato">${sanitizeHTML(edu.degree) || 'Degree'}</h3><p class="text-sm font-semibold font-lato">${sanitizeHTML(edu.period) || ''}</p></div><p class="italic text-md">${sanitizeHTML(edu.school) || 'Institution'}</p></div>`).join('') : '<p>No education added</p>'}</div></section>
            
            <section><h2 class="section-title">Languages</h2><div class="flex flex-wrap text-sm">${data.languages && data.languages.length > 0 ? data.languages.map(lang => `<span class="w-1/2 mb-2">• ${sanitizeHTML(lang.name) || 'Language'}${lang.proficiency ? ` (${sanitizeHTML(lang.proficiency)})` : ''}</span>`).join('') : '<span class="w-full">No languages added</span>'}</div></section>
            
            ${data.showAwards ? `
            <section>
                <h2 class="section-title">Additional Information</h2>
                ${data.awards ? `
                <ul class="list-disc list-inside text-sm mt-2 space-y-1">
                    ${sanitizeHTML(data.awards).split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                </ul>
                ` : `<p class="text-sm mt-2">No additional information provided</p>`}
            </section>
            ` : ''}

        </div>
    `;
}


module.exports = {
    renderClassicTemplate,
    renderModernTemplate,
};
