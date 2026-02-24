const express = require('express');
const path = require('path');
const workingHoursMiddleware = require('./middleware/workingHours');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(workingHoursMiddleware);


const operatives = [
    { id: 'leon', name: 'KENNEDY, LEON S.', agency: 'D.S.O.', clearance: 'GOLDEN EYE', status: 'ACTIVE', image: 'leon.jpg', case: 'DSO-001', quote: 'Reports directly to POTUS. Multiple viral outbreak survivals.', lastSeen: 'Eastern Europe', specialty: 'Presidential Security', agencyLogo: 'dso-logo.png' },
    { id: 'chris', name: 'REDFIELD, CHRIS', agency: 'HOUND WOLF SQUAD', clearance: 'ALPHA', status: 'ACTIVE', image: 'chris.jpg', case: 'HWS-001', quote: 'Former BSAA. Now leads own squad. Lone Wolf.', lastSeen: 'European Village', specialty: 'B.O.W. Elimination', agencyLogo: 'houndwolf-logo.png' },
    { id: 'jill', name: 'VALENTINE, JILL', agency: 'BSAA', clearance: 'ALPHA', status: 'ACTIVE', image: 'jill.jpg', case: 'BSAA-001', quote: 'Original STARS. Master of infiltration.', lastSeen: 'Unknown', specialty: 'Infiltration // EOD', agencyLogo: 'bsaa-logo.png' },
    { id: 'claire', name: 'REDFIELD, CLAIRE', agency: 'TERRASAVE', clearance: 'BETA', status: 'ACTIVE', image: 'claire.jpg', case: 'TS-001', quote: 'Provides intel from civilian sector. Trusted asset.', lastSeen: 'NGO Refugee Camp', specialty: 'Victim Recovery', agencyLogo: 'terrasave-logo.png' },
    { id: 'ada', name: 'WONG, ADA', agency: '████████', clearance: '█████', status: 'UNKNOWN', image: 'ada.jpg', case: '███-███', quote: 'Corporate spy. Ties to Leon. Cannot be trusted.', lastSeen: 'Multiple Reports', specialty: 'Corporate Espionage', agencyLogo: 'unknown.png' },
    { id: 'hunk', name: 'DESIGNATION: HUNK', agency: 'INDEPENDENT', clearance: '█████', status: 'ACTIVE', image: 'hunk.jpg', case: 'GR-001', quote: 'Umbrella\'s sole survivor specialist. Face unknown.', lastSeen: 'Various Black Sites', specialty: 'Wet Work', agencyLogo: 'skull.png' },
    { id: 'rebecca', name: 'CHAMBERS, REBECCA', agency: 'TERRASAVE', clearance: 'BETA', status: 'ACTIVE', image: 'rebecca.jpg', case: 'TS-002', quote: 'Original STARS medic. Now with TerraSave.', lastSeen: 'Medical Facility', specialty: 'Field Medicine', agencyLogo: 'terrasave-logo.png' },
    { id: 'sherry', name: 'BIRKIN, SHERRY', agency: 'D.S.O.', clearance: 'GOLDEN EYE', status: 'ACTIVE', image: 'sherry.jpg', case: 'DSO-002', quote: 'Leon\'s colleague. Antibody researcher.', lastSeen: 'Washington D.C.', specialty: 'Viral Research', agencyLogo: 'dso-logo.png' },
    { id: 'helena', name: 'HARPER, HELENA', agency: 'D.S.O.', clearance: 'GOLDEN EYE', status: 'ACTIVE', image: 'helena.jpg', case: 'DSO-003', quote: 'Leon\'s partner. Secret Service agent.', lastSeen: 'Tall Oaks', specialty: 'Protective Operations', agencyLogo: 'dso-logo.png' },
    { id: 'carlos', name: 'OLIVEIRA, CARLOS', agency: 'INDEPENDENT', clearance: 'DELTA', status: 'ACTIVE', image: 'carlos.jpg', case: 'IND-003', quote: 'Former UBCS. Survived Raccoon City. Now works freelance.', lastSeen: 'South America', specialty: 'Tactical Assault', agencyLogo: 'skull.png' },
    { id: 'rosemary', name: 'WINTERS, ROSEMARY', agency: 'BSAA', clearance: 'ALPHA', status: 'ACTIVE', image: 'rosemary.jpg', case: 'BSAA-002', quote: 'Ethan\'s daughter. Unique biological traits.', lastSeen: 'Eastern Europe', specialty: 'Special Operations', agencyLogo: 'bsaa-logo.png' },
    { id: 'grace', name: 'ASHCROFT, GRACE', agency: 'THE CONNECTIONS', clearance: '█████', status: 'UNKNOWN', image: 'grace.jpg', case: 'CON-001', quote: 'Researcher. Connections to illegal bioweapons.', lastSeen: 'Laboratory', specialty: 'Bioweapon Research', agencyLogo: 'unknown.png' },
    { id: 'jake', name: 'MULLER, JAKE', agency: 'INDEPENDENT', clearance: '█████', status: 'ACTIVE', image: 'jake.jpg', case: 'IND-002', quote: 'Wesker\'s son. Antibody blood.', lastSeen: 'Eastern Europe', specialty: 'Mercenary Operations', agencyLogo: 'skull.png' },
    { id: 'barry', name: 'BURTON, BARRY', agency: 'INDEPENDENT', clearance: 'ALPHA', status: 'ACTIVE', image: 'barry.jpg', case: 'BRT-001', quote: 'STARS veteran. Family man. Always has a backup.', lastSeen: 'Unknown', specialty: 'Weapons Specialist', agencyLogo: 'skull.png' },
    { id: 'parker', name: 'LUCIANI, PARKER', agency: 'FBC', clearance: 'BETA', status: 'ACTIVE', image: 'parker.jpg', case: 'FBC-001', quote: 'Former FBC agent. Worked with Jill.', lastSeen: 'Mediterranean', specialty: 'Covert Operations', agencyLogo: 'unknown.png' },
    { id: 'sheva', name: 'ALOMAR, SHEVA', agency: 'BSAA', clearance: 'ALPHA', status: 'ACTIVE', image: 'sheva.jpg', case: 'BSAA-003', quote: 'BSAA agent. Partnered with Chris in Africa.', lastSeen: 'Africa', specialty: 'Counter-Terrorism', agencyLogo: 'bsaa-logo.png' }
];


const evidenceItems = [
    
    ...operatives.map(op => ({ type: 'PHOTO', name: op.name, image: op.image, description: `Classified image. Case #${op.case}.`, category: 'database' })),
    
   
    { type: 'PHOTO', name: 'ETHAN WINTERS', image: 'ethan.jpg', description: 'Deceased. RE7/RE8 protagonist. Mold connection.', category: 'deceased' },
    { type: 'PHOTO', name: 'MIA WINTERS', image: 'mia.jpg', description: 'Ethan\'s wife. Former Connections employee.', category: 'civilian' },
    { type: 'PHOTO', name: 'KRAUSER', image: 'krauser.jpg', description: 'Deceased. Former USSOCOM. RE4 antagonist.', category: 'deceased' },
    { type: 'PHOTO', name: 'PIERS NIVANS', image: 'piers.jpg', description: 'Deceased. BSAA. Chris\'s partner in RE6.', category: 'deceased' },
    { type: 'PHOTO', name: 'MOIRA BURTON', image: 'moira.jpg', description: 'Active. Barry\'s daughter. Revelations 2.', category: 'civilian' }
];

const timelineEvents = [
    { year: '1998', event: 'RE0 - TRAIN INCIDENT', operatives: 'Rebecca Chambers, Billy Coen', threat: 'HIGH', description: 'Ecliptic Express incident. Training facility discovery.' },
    { year: '1998', event: 'RE1 - MANSION INCIDENT', operatives: 'Chris Redfield, Jill Valentine, Rebecca Chambers, Barry Burton', threat: 'CRITICAL', description: 'Arklay Mountains. S.T.A.R.S. investigation. Umbrella exposed.' },
    { year: '1998', event: 'RE OUTBREAK', operatives: 'Kevin, Cindy, Mark, Jim, George, David, Yoko', threat: 'CRITICAL', description: 'Raccoon City citizens fight for survival during outbreak.' },
    { year: '1998', event: 'RE2 - RACCOON CITY', operatives: 'Leon Kennedy, Claire Redfield, Ada Wong, Sherry Birkin, HUNK', threat: 'CRITICAL', description: 'Raccoon City destruction. G-Virus incident.' },
    { year: '1998', event: 'RE3 - RACCOON CITY', operatives: 'Jill Valentine, Carlos Oliveira', threat: 'CRITICAL', description: 'Final escape from Raccoon City. Nemesis encounter.' },
    { year: '1998', event: 'RE CODE: VERONICA', operatives: 'Claire Redfield, Steve Burnside, Chris Redfield', threat: 'CRITICAL', description: 'Rockfort Island. Ashford family. T-Veronica virus.' },
    { year: '2002', event: 'RE THE DARKSIDE CHRONICLES', operatives: 'Leon Kennedy, Krauser', threat: 'HIGH', description: 'South America operation. Krauser\'s betrayal begins.' },
    { year: '2005', event: 'RE4 - LOS ILLUMINADOS', operatives: 'Leon Kennedy, Ada Wong', threat: 'HIGH', description: 'Spain. Rescue Ashley Graham. Las Plagas discovery.' },
    { year: '2005', event: 'RE DEGENERATION', operatives: 'Leon Kennedy, Claire Redfield', threat: 'HIGH', description: 'Harvardville Airport. G-Virus resurgence.' },
    { year: '2011', event: 'RE REVELATIONS', operatives: 'Jill Valentine, Parker Luciani, Chris Redfield', threat: 'HIGH', description: 'Queen Zenobia. T-Abyss virus. Veltro.' },
    { year: '2021', event: 'RESIDENT EVIL INFINITE DARKNESS', operatives: 'Leon Kennedy, Claire Redfield', threat: 'HIGH', description: 'White House incident. Penamstan conspiracy.' },
    { year: '2009', event: 'RE5 - KIJUJU/AFRICA', operatives: 'Chris Redfield, Sheva Alomar, Jill Valentine', threat: 'CRITICAL', description: 'Uroboros. Wesker\'s final defeat.' },
    { year: '2011', event: 'RE REVELATIONS 2', operatives: 'Claire Redfield, Moira Burton, Barry Burton', threat: 'HIGH', description: 'TerraSave mission. Island facility.' },
    { year: '2012', event: 'RESIDENT EVIL DAMNATION', operatives: 'Leon Kennedy, Ada Wong', threat: 'HIGH', description: 'Eastern Slav Republic. Tyrants in combat.' },
    { year: '2012-2013', event: 'RE6 - EDONIA/CHINA', operatives: 'Leon Kennedy, Helena Harper, Chris Redfield, Piers Nivans, Jake Muller, Sherry Birkin, Ada Wong', threat: 'CRITICAL', description: 'C-Virus global outbreak. Neo-Umbrella.' },
    { year: '2017', event: 'RE VENDETTA', operatives: 'Chris Redfield, Leon Kennedy', threat: 'HIGH', description: 'New York. A-Virus. Personal revenge mission.' },
    { year: '2023', event: 'RE DEATH ISLAND', operatives: 'Leon Kennedy, Chris Redfield, Jill Valentine, Claire Redfield, Rebecca Chambers', threat: 'HIGH', description: 'Alcatraz Island. T-Vector outbreak.' },
    { year: '2017', event: 'RE7 - DULVEY, LOUISIANA', operatives: 'Ethan Winters, Mia Winters, Chris Redfield', threat: 'CRITICAL', description: 'Baker family. Mold. Eveline.' },
    { year: '2021', event: 'RE8 - VILLAGE', operatives: 'Ethan Winters, Chris Redfield, Rosemary Winters', threat: 'CRITICAL', description: 'Romanian village. Four Houses. Megamycete.' },
    { year: '2021', event: 'RE8 DLC - SHADOWS OF ROSE', operatives: 'Rosemary Winters', threat: 'HIGH', description: 'Rose\'s journey within the megamycete.' },
    { year: '2024', event: 'RE REQUIEM', operatives: 'Grace Ashcroft, Leon Kennedy', threat: 'ACTIVE', description: 'Current active investigation. Classified.' }
];

app.get('/', (req, res) => {
    res.render('home', { 
        title: 'GLOBAL THREAT ASSESSMENT',
        operatives: operatives,
        currentYear: new Date().getFullYear()
    });
});

app.get('/operative/:id', (req, res) => {
    const operative = operatives.find(op => op.id === req.params.id);
    if (!operative) {
        return res.status(404).render('closed', {
            title: 'OPERATIVE NOT FOUND',
            currentYear: new Date().getFullYear()
        });
    }
    res.render('dossier', { 
        title: `${operative.name} // DOSSIER`,
        operative: operative,
        currentYear: new Date().getFullYear()
    });
});

app.get('/services', (req, res) => {
    res.render('services', { 
        title: 'SPECIAL OPERATIONS DIRECTORY',
        operatives: operatives,
        currentYear: new Date().getFullYear()
    });
});

app.get('/missions', (req, res) => {
    res.render('missions', { 
        title: 'MISSION BRIEFING BOARD',
        missions: timelineEvents.filter(e => e.threat === 'ACTIVE' || e.threat === 'CRITICAL'),
        currentYear: new Date().getFullYear()
    });
});

app.get('/evidence', (req, res) => {
    res.render('evidence', { 
        title: 'EVIDENCE LOCKER',
        evidence: evidenceItems,
        currentYear: new Date().getFullYear()
    });
});

app.get('/timeline', (req, res) => {
    res.render('timeline', { 
        title: 'INCIDENT TIMELINE',
        events: timelineEvents,
        currentYear: new Date().getFullYear()
    });
});

app.get('/timeline/bsaa-corruption', (req, res) => {
    res.render('bsaa-corruption', { 
        title: 'BSAA CORRUPTION TIMELINE',
        currentYear: new Date().getFullYear()
    });
});

app.get('/timeline/wesker-legacy', (req, res) => {
    res.render('wesker-legacy', { 
        title: 'WESKER LEGACY TIMELINE',
        currentYear: new Date().getFullYear()
    });
});

app.get('/timeline/umbrella', (req, res) => {
    res.render('umbrella', { 
        title: 'UMBRELLA RISE & FALL',
        currentYear: new Date().getFullYear()
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'INTEL SUBMISSION',
        currentYear: new Date().getFullYear()
    });
});

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log('📡 INTEL RECEIVED:', { name, email, subject, message });
    res.render('thankyou', { 
        title: 'TRANSMISSION RECEIVED',
        name: name || 'OPERATIVE',
        currentYear: new Date().getFullYear()
    });
});

app.use((req, res) => {
    res.status(404).render('closed', {
        title: 'ACCESS DENIED',
        currentYear: new Date().getFullYear()
    });
});

app.listen(PORT, () => {
    console.log(`☣️ BIOHAZARD: GLOBAL INTELLIGENCE NETWORK`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🕒 Working hours: Monday to Friday, 9 AM - 5 PM`);
    console.log(`👥 Operatives: ${operatives.length} active`);
    console.log(`📅 Timeline events: ${timelineEvents.length}`);
    console.log(`🔍 Evidence items: ${evidenceItems.length}`);
});