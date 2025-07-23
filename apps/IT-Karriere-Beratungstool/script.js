// IT Career Tool JavaScript - Enhanced with Comprehensive Rulebase

// Global variables
let userSkills = {};
let userPersonalInfo = {};
let rulebase = {};
let currentSection = 'home';

// Load rulebase on page load
document.addEventListener('DOMContentLoaded', function() {
    loadRulebase();
    initializeEventListeners();
    showSection('home');

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

async function loadRulebase() {
    try {
        const response = await fetch('rulebase.json');
        rulebase = await response.json();
        console.log('Rulebase loaded successfully');
        populateJobProfiles();
    } catch (error) {
        console.error('Error loading rulebase:', error);
        // Fallback to embedded rulebase if file not found
        createFallbackRulebase();
        populateJobProfiles();
    }
}

function createFallbackRulebase() {
    // Embedded fallback rulebase for when JSON file is not available
    rulebase = {
        "job_profiles": {
            "helpdesk_analyst": {
                "title": "Helpdesk Analyst",
                "level": "einsteiger",
                "experience_required": {"general": 0, "it": 0},
                "education_min": "realschule",
                "salary_range": {"min": 25000, "max": 35000},
                "description": "Erste Anlaufstelle für IT-Support und Benutzerbetreuung",
                "requirements": ["Grundkenntnisse Windows", "Kommunikationsstärke", "Lernbereitschaft"]
            },
            "junior_it_administrator": {
                "title": "Junior IT Administrator",
                "level": "einsteiger",
                "experience_required": {"general": 0, "it": 1},
                "education_min": "ausbildung",
                "salary_range": {"min": 30000, "max": 42000},
                "description": "Systemadministration und Betreuung der IT-Infrastruktur",
                "requirements": ["Linux/Windows Kenntnisse", "Netzwerk Grundlagen", "Teamfähigkeit"]
            },
            "systemadministrator": {
                "title": "Systemadministrator",
                "level": "fortgeschritten",
                "experience_required": {"general": 2, "it": 2},
                "education_min": "ausbildung",
                "salary_range": {"min": 40000, "max": 60000},
                "description": "Verantwortung für komplexe IT-Systeme und Infrastruktur",
                "requirements": ["Mehrjährige Erfahrung", "Tiefe Systemkenntnisse", "Projektverantwortung"]
            },
            "python_programmer": {
                "title": "Python Programmer",
                "level": "fortgeschritten",
                "experience_required": {"general": 1, "it": 2},
                "education_min": "bachelor",
                "salary_range": {"min": 45000, "max": 70000},
                "description": "Entwicklung von Python-Anwendungen und Automatisierung",
                "requirements": ["Solide Python-Kenntnisse", "Datenbank-Erfahrung", "Agile Methoden"]
            },
            "security_analyst": {
                "title": "Security Analyst",
                "level": "fortgeschritten",
                "experience_required": {"general": 2, "it": 3},
                "education_min": "bachelor",
                "salary_range": {"min": 50000, "max": 75000},
                "description": "Überwachung und Analyse von IT-Sicherheitsbedrohungen",
                "requirements": ["IT-Security Kenntnisse", "Incident Response", "Compliance"]
            },
            "penetration_tester": {
                "title": "Penetration Tester",
                "level": "senior",
                "experience_required": {"general": 3, "it": 5},
                "education_min": "bachelor",
                "salary_range": {"min": 60000, "max": 90000},
                "description": "Ethisches Hacking und Sicherheitstests von IT-Systemen",
                "requirements": ["Experten-Level Security", "Ethical Hacking", "Zertifizierungen"]
            },
            "datenschutzbeauftragter": {
                "title": "Datenschutzbeauftragter",
                "level": "senior",
                "experience_required": {"general": 5, "it": 3},
                "education_min": "bachelor",
                "salary_range": {"min": 55000, "max": 85000},
                "description": "Verantwortung für Datenschutz und Compliance im Unternehmen",
                "requirements": ["DSGVO Expertise", "Rechtskenntnisse", "Führungsqualitäten"]
            },
            "ki_beauftragter": {
                "title": "KI-Beauftragter",
                "level": "senior",
                "experience_required": {"general": 3, "it": 5},
                "education_min": "master",
                "salary_range": {"min": 70000, "max": 120000},
                "description": "Strategische Entwicklung und Implementierung von KI-Lösungen",
                "requirements": ["KI/ML Expertise", "Strategisches Denken", "Technische Führung"]
            }
        },
        "scoring_weights": {
            "hard_skills": 0.4,
            "soft_skills": 0.25,
            "languages": 0.15,
            "experience": 0.15,
            "education": 0.05
        },
        "education_levels": {
            "hauptschule": 1,
            "realschule": 2,
            "abitur": 3,
            "ausbildung": 4,
            "bachelor": 5,
            "master": 6,
            "promotion": 7
        }
    };
}

function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Skill rating buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('rating-button')) {
            handleSkillRating(e.target);
        }
    });

    // Form inputs
    document.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.addEventListener('change', function() {
            updatePersonalInfo(this.id, this.value);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        currentSection = sectionName;
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSkillRating(button) {
    const rating = parseInt(button.getAttribute('data-rating'));
    const skillContainer = button.closest('.skill-rating');
    const skill = skillContainer.getAttribute('data-skill');

    // Update skill rating
    userSkills[skill] = rating;

    // Update visual feedback
    const buttons = skillContainer.querySelectorAll('.rating-button');
    buttons.forEach((btn, index) => {
        if (index < rating) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

function updatePersonalInfo(field, value) {
    userPersonalInfo[field] = value;
}

function resetAssessment() {
    // Reset skills
    userSkills = {};
    userPersonalInfo = {};

    // Reset visual feedback
    document.querySelectorAll('.rating-button').forEach(button => {
        button.classList.remove('active');
    });

    // Reset form inputs
    document.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.value = '';
    });

    // Show success message
    showNotification('Assessment zurückgesetzt', 'success');
}

function calculateRecommendations() {
    if (Object.keys(userSkills).length === 0) {
        showNotification('Bitte bewerten Sie zuerst Ihre Skills', 'warning');
        return;
    }

    // Prepare user data
    const userData = prepareUserData();

    // Calculate recommendations
    const recommendations = getRecommendations(userData);
    const categorized = categorizeRecommendations(recommendations);
    const studyRecommendations = getStudyRecommendations(userData, recommendations);

    // Display recommendations
    displayRecommendations(categorized, studyRecommendations);

    // Navigate to recommendations section
    showSection('recommendations');

    showNotification('Empfehlungen erfolgreich berechnet!', 'success');
}

function prepareUserData() {
    // Categorize skills
    const hardSkills = {};
    const softSkills = {};
    const languages = {};

    const hardSkillsList = [
        'linux', 'windows-server', 'active-directory', 'powershell', 'unix', 'ms365', 'ms-server', 'vmware', 'hyper-v',
        'tcpip', 'firewall', 'vpn', 'wlan', 'cisco', 'penetration-testing',
        'python', 'java', 'javascript', 'csharp', 'html-css', 'react', 'nodejs', 'git',
        'sql', 'mysql', 'postgresql', 'mongodb', 'aws', 'azure', 'docker', 'kubernetes',
        'dsgvo', 'iso27001', 'incident-response', 'risk-assessment'
    ];

    const softSkillsList = [
        'kommunikation', 'teamarbeit', 'fuehrung', 'projektmanagement', 'kreativitaet', 'flexibilitaet',
        'stressresistenz', 'lernbereitschaft', 'organisation', 'durchsetzung', 'verhandlung', 'zeitmanagement'
    ];

    const languagesList = ['deutsch', 'englisch', 'spanisch', 'russisch', 'chinesisch'];

    // Categorize user skills
    Object.keys(userSkills).forEach(skill => {
        if (hardSkillsList.includes(skill)) {
            hardSkills[skill] = userSkills[skill];
        } else if (softSkillsList.includes(skill)) {
            softSkills[skill] = userSkills[skill];
        } else if (languagesList.includes(skill)) {
            languages[skill] = userSkills[skill];
        }
    });

    return {
        age: parseInt(userPersonalInfo.age) || 25,
        education: userPersonalInfo.education || 'realschule',
        experience: {
            general: parseInt(userPersonalInfo.generalExperience) || 0,
            it: parseInt(userPersonalInfo.itExperience) || 0
        },
        hard_skills: hardSkills,
        soft_skills: softSkills,
        languages: languages,
        work_preferences: {
            travel_willingness: parseInt(userPersonalInfo.travelWillingness) || 0,
            work_location: userPersonalInfo.workLocation || 'vor-ort',
            work_time: userPersonalInfo.workTime || 'vollzeit'
        },
        personal_info: {
            name: userPersonalInfo.name || '',
            firstName: userPersonalInfo.firstName || '',
            location: userPersonalInfo.location || '',
            drivingLicense: userPersonalInfo.drivingLicense || '',
            car: userPersonalInfo.car || '',
            dreamJob: userPersonalInfo.dreamJob || ''
        }
    };
}

function calculateSkillMatch(userSkills, requiredSkills) {
    if (!requiredSkills || Object.keys(requiredSkills).length === 0) {
        return 100;
    }

    let totalScore = 0;
    let maxScore = 0;

    Object.keys(requiredSkills).forEach(skill => {
        const requiredLevel = requiredSkills[skill];
        const userLevel = userSkills[skill] || 0;

        maxScore += requiredLevel;

        if (userLevel >= requiredLevel) {
            totalScore += requiredLevel;
        } else {
            // Partial credit for lower levels
            totalScore += (userLevel / requiredLevel) * requiredLevel * 0.7;
        }
    });

    return maxScore > 0 ? (totalScore / maxScore) * 100 : 100;
}

function calculateExperienceMatch(userExperience, requiredExperience) {
    const generalMatch = Math.min(userExperience.general / Math.max(requiredExperience.general || 1, 1), 1);
    const itMatch = Math.min(userExperience.it / Math.max(requiredExperience.it || 1, 1), 1);
    return ((generalMatch + itMatch) / 2) * 100;
}

function calculateEducationMatch(userEducation, requiredEducation) {
    const educationLevels = rulebase.education_levels || {
        "hauptschule": 1, "realschule": 2, "abitur": 3, "ausbildung": 4,
        "bachelor": 5, "master": 6, "promotion": 7
    };

    const userLevel = educationLevels[userEducation] || 0;
    const requiredLevel = educationLevels[requiredEducation] || 0;

    if (userLevel >= requiredLevel) {
        return 100;
    } else {
        return requiredLevel > 0 ? (userLevel / requiredLevel) * 70 : 0;
    }
}

function calculateOverallMatch(userData, jobProfile) {
    const weights = rulebase.scoring_weights || {
        hard_skills: 0.4, soft_skills: 0.25, languages: 0.15, experience: 0.15, education: 0.05
    };

    const hardSkillsScore = calculateSkillMatch(userData.hard_skills, jobProfile.hard_skills);
    const softSkillsScore = calculateSkillMatch(userData.soft_skills, jobProfile.soft_skills);
    const languageScore = calculateSkillMatch(userData.languages, jobProfile.languages);
    const experienceScore = calculateExperienceMatch(userData.experience, jobProfile.experience_required);
    const educationScore = calculateEducationMatch(userData.education, jobProfile.education_min);

    const overallScore = (
        hardSkillsScore * weights.hard_skills +
        softSkillsScore * weights.soft_skills +
        languageScore * weights.languages +
        experienceScore * weights.experience +
        educationScore * weights.education
    );

    return Math.min(overallScore, 100);
}

function getRecommendations(userData) {
    const recommendations = [];

    Object.keys(rulebase.job_profiles).forEach(jobId => {
        const jobProfile = rulebase.job_profiles[jobId];
        const matchPercentage = calculateOverallMatch(userData, jobProfile);

        recommendations.push({
            job_id: jobId,
            title: jobProfile.title,
            level: jobProfile.level,
            match_percentage: Math.round(matchPercentage * 10) / 10,
            salary_range: jobProfile.salary_range,
            description: jobProfile.description,
            requirements: jobProfile.requirements || []
        });
    });

    return recommendations.sort((a, b) => b.match_percentage - a.match_percentage);
}

function categorizeRecommendations(recommendations) {
    return {
        best_fit: recommendations.filter(r => r.match_percentage >= 70),
        compromise: recommendations.filter(r => r.match_percentage >= 40 && r.match_percentage < 70),
        not_suitable: recommendations.filter(r => r.match_percentage < 40)
    };
}

function getStudyRecommendations(userData, recommendations) {
    const age = userData.age;
    const education = userData.education;
    const studyRecommendations = [];

    if (age <= 30) {
        if (['hauptschule', 'realschule'].includes(education)) {
            studyRecommendations.push({
                type: 'Ausbildung',
                title: 'Fachinformatiker Systemintegration',
                suitability: 'Sehr geeignet',
                reason: 'Praktische IT-Ausbildung, ideal für den Berufseinstieg'
            });
        }

        if (['abitur', 'realschule'].includes(education)) {
            studyRecommendations.push({
                type: 'Studium',
                title: 'Informatik Bachelor',
                suitability: 'Geeignet',
                reason: 'Solide Grundlage für IT-Karriere'
            });
        }
    } else if (age <= 40) {
        studyRecommendations.push({
            type: 'Weiterbildung',
            title: 'Zertifizierungen und Kurse',
            suitability: 'Geeignet',
            reason: 'Fokus auf praktische Zertifizierungen und berufsbegleitende Weiterbildung'
        });
    } else {
        studyRecommendations.push({
            type: 'Weiterbildung',
            title: 'Spezialisierte Kurse',
            suitability: 'Bedingt geeignet',
            reason: 'Kurze, intensive Weiterbildungen zur Spezialisierung'
        });
    }

    return studyRecommendations;
}

function displayRecommendations(categorized, studyRecommendations) {
    const container = document.getElementById('recommendations-content');
    let html = '';

    // Job recommendations
    Object.keys(categorized).forEach(category => {
        const jobs = categorized[category];
        if (jobs.length === 0) return;

        const categoryInfo = {
            best_fit: { title: 'Beste Eignung', icon: '✅', class: 'best-fit' },
            compromise: { title: 'Kompromiss', icon: '⚖️', class: 'compromise' },
            not_suitable: { title: 'Weniger geeignet', icon: '❌', class: 'not-suitable' }
        };

        const info = categoryInfo[category];

        html += `
            <div class="recommendation-category">
                <h3>
                    <div class="category-icon ${info.class}">${info.icon}</div>
                    ${info.title}
                </h3>
        `;

        jobs.forEach(job => {
            html += `
                <div class="recommendation-card animate-slide-in">
                    <div class="recommendation-info">
                        <h4>${job.title}</h4>
                        <p>${job.level} • ${job.salary_range.min.toLocaleString()}€ - ${job.salary_range.max.toLocaleString()}€</p>
                        <p style="margin-top: 0.5rem; color: var(--text-secondary);">${job.description}</p>
                    </div>
                    <div class="match-percentage">${job.match_percentage}%</div>
                </div>
            `;
        });

        html += '</div>';
    });

    // Study recommendations
    if (studyRecommendations.length > 0) {
        html += `
            <div class="recommendation-category">
                <h3>
                    <div class="category-icon" style="background: linear-gradient(135deg, var(--accent-color), var(--accent-dark));">🎓</div>
                    Weiterbildungsempfehlungen
                </h3>
        `;

        studyRecommendations.forEach(study => {
            html += `
                <div class="recommendation-card animate-slide-in">
                    <div class="recommendation-info">
                        <h4>${study.title}</h4>
                        <p>${study.type} • ${study.reason}</p>
                    </div>
                    <div class="match-percentage" style="background: var(--accent-color); color: white; border-color: var(--accent-color);">
                        ${study.suitability}
                    </div>
                </div>
            `;
        });

        html += '</div>';
    }

    container.innerHTML = html;
}

function populateJobProfiles() {
    const jobGrid = document.getElementById('job-grid');
    if (!jobGrid || !rulebase.job_profiles) return;

    let html = '';

    Object.keys(rulebase.job_profiles).forEach(jobId => {
        const job = rulebase.job_profiles[jobId];

        html += `
            <div class="job-card" data-level="${job.level}">
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <span class="job-level">${job.level} • ${job.experience_required.it}-${job.experience_required.it + 2} Jahre Erfahrung</span>
                    </div>
                </div>
                <p class="job-description">${job.description}</p>
                <div class="job-skills">
                    ${job.requirements.map(req => `<span class="skill-tag">${req}</span>`).join('')}
                </div>
                <div style="margin-top: 1rem; color: var(--text-secondary); font-weight: 600;">
                    ${job.salary_range.min.toLocaleString()}€ - ${job.salary_range.max.toLocaleString()}€
                </div>
            </div>
        `;
    });

    jobGrid.innerHTML = html;
}

function filterJobs(level) {
    const jobCards = document.querySelectorAll('.job-card');
    const filterButtons = document.querySelectorAll('[id^="filter-"]');

    // Update button states
    filterButtons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });

    document.getElementById(`filter-${level}`).classList.remove('btn-secondary');
    document.getElementById(`filter-${level}`).classList.add('btn-primary');

    // Filter job cards
    jobCards.forEach(card => {
        if (level === 'all' || card.getAttribute('data-level') === level) {
            card.style.display = 'block';
            card.classList.add('animate-slide-in');
        } else {
            card.style.display = 'none';
        }
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface-elevated);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        border-left: 4px solid var(--primary-color);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
        max-width: 300px;
    `;

    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--secondary-color)';
    } else if (type === 'warning') {
        notification.style.borderLeftColor = 'var(--accent-color)';
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#ef4444';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility functions for smooth animations
function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * progress;
        element.textContent = Math.round(current) + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Add smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states for better UX
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

