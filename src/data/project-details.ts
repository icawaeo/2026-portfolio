import type { ProjectDetail, ProjectGalleryImage } from '@/types/portfolio';

type MockupLayout = 'desktop' | 'mobile';

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function createMockup(
  projectTitle: string,
  caption: string,
  accent: string,
  layout: MockupLayout,
  index: number,
) {
  const width = layout === 'mobile' ? 540 : 1200;
  const height = layout === 'mobile' ? 960 : 760;
  const safeTitle = escapeXml(projectTitle);
  const safeCaption = escapeXml(caption);
  const desktopContent = `
    <rect x="44" y="46" width="1112" height="668" rx="22" fill="#ffffff"/>
    <rect x="44" y="46" width="1112" height="72" rx="22" fill="#ffffff"/>
    <path d="M44 118h1112" stroke="#e7e5e4"/>
    <circle cx="84" cy="82" r="15" fill="${accent}" opacity=".14"/>
    <circle cx="84" cy="82" r="6" fill="${accent}"/>
    <text x="112" y="88" class="brand">${safeTitle}</text>
    <rect x="866" y="66" width="104" height="32" rx="16" fill="#f5f5f4"/>
    <text x="884" y="87" class="small">Overview</text>
    <rect x="984" y="66" width="142" height="34" rx="17" fill="${accent}"/>
    <text x="1008" y="88" class="button">Workspace</text>
    <text x="88" y="174" class="eyebrow">${safeCaption}</text>
    <text x="88" y="222" class="heading">${index % 2 === 0 ? 'Everything, in one place.' : 'A clearer way to move forward.'}</text>
    <text x="88" y="254" class="body">A focused workspace built around the needs of its users.</text>
    <rect x="88" y="290" width="690" height="348" rx="16" fill="#fafaf9" stroke="#e7e5e4"/>
    <text x="116" y="330" class="label">ACTIVITY OVERVIEW</text>
    <rect x="116" y="352" width="196" height="100" rx="12" fill="${accent}" opacity=".11"/>
    <rect x="332" y="352" width="196" height="100" rx="12" fill="#f5f5f4"/>
    <rect x="548" y="352" width="202" height="100" rx="12" fill="#f5f5f4"/>
    <text x="136" y="386" class="small">TOTAL RECORDS</text>
    <text x="136" y="426" class="metric">${String(124 + index * 36)}</text>
    <text x="352" y="386" class="small">IN PROGRESS</text>
    <text x="352" y="426" class="metric">${String(12 + index * 3)}</text>
    <text x="568" y="386" class="small">COMPLETED</text>
    <text x="568" y="426" class="metric">${String(86 + index * 12)}%</text>
    <rect x="116" y="478" width="634" height="1" fill="#e7e5e4"/>
    <path d="M130 594 C205 560 220 580 286 526 S390 558 448 504 S555 532 620 484 S699 510 736 470" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
    <path d="M130 594 C205 560 220 580 286 526 S390 558 448 504 S555 532 620 484 S699 510 736 470V620H130Z" fill="${accent}" opacity=".08"/>
    <rect x="802" y="290" width="322" height="348" rx="16" fill="#ffffff" stroke="#e7e5e4"/>
    <text x="832" y="330" class="label">RECENT UPDATES</text>
    <circle cx="846" cy="374" r="9" fill="${accent}" opacity=".8"/>
    <rect x="868" y="364" width="184" height="10" rx="5" fill="#d6d3d1"/>
    <rect x="868" y="383" width="224" height="8" rx="4" fill="#f5f5f4"/>
    <circle cx="846" cy="434" r="9" fill="#f59e0b" opacity=".8"/>
    <rect x="868" y="424" width="164" height="10" rx="5" fill="#d6d3d1"/>
    <rect x="868" y="443" width="204" height="8" rx="4" fill="#f5f5f4"/>
    <circle cx="846" cy="494" r="9" fill="#14b8a6" opacity=".8"/>
    <rect x="868" y="484" width="192" height="10" rx="5" fill="#d6d3d1"/>
    <rect x="868" y="503" width="176" height="8" rx="4" fill="#f5f5f4"/>
    <rect x="832" y="548" width="260" height="48" rx="12" fill="#fafaf9"/>
    <text x="858" y="578" class="small">View all activity</text>
  `;
  const mobileContent = `
    <rect x="36" y="36" width="468" height="888" rx="40" fill="#ffffff"/>
    <rect x="194" y="51" width="152" height="20" rx="10" fill="#1c1917"/>
    <circle cx="270" cy="100" r="18" fill="${accent}" opacity=".14"/>
    <circle cx="270" cy="100" r="7" fill="${accent}"/>
    <text x="80" y="164" text-anchor="middle" class="brand">${safeTitle}</text>
    <text x="80" y="224" class="eyebrow">${safeCaption}</text>
    <text x="80" y="274" class="heading">${index % 2 === 0 ? 'Welcome back' : 'Your next step'}</text>
    <text x="80" y="308" class="body">A simpler experience, made for you.</text>
    <rect x="80" y="340" width="380" height="122" rx="18" fill="${accent}" opacity=".1"/>
    <text x="108" y="380" class="small">YOUR OVERVIEW</text>
    <text x="108" y="427" class="metric">${String(24 + index * 8)} ITEMS</text>
    <rect x="80" y="488" width="380" height="68" rx="16" fill="${accent}"/>
    <text x="270" y="530" text-anchor="middle" class="button">Continue</text>
    <text x="80" y="610" class="label">QUICK ACTIONS</text>
    <rect x="80" y="634" width="178" height="112" rx="16" fill="#fafaf9" stroke="#e7e5e4"/>
    <rect x="282" y="634" width="178" height="112" rx="16" fill="#fafaf9" stroke="#e7e5e4"/>
    <circle cx="116" cy="674" r="15" fill="${accent}" opacity=".2"/>
    <circle cx="318" cy="674" r="15" fill="${accent}" opacity=".2"/>
    <rect x="104" y="708" width="120" height="8" rx="4" fill="#a8a29e"/>
    <rect x="306" y="708" width="120" height="8" rx="4" fill="#a8a29e"/>
    <rect x="80" y="776" width="380" height="92" rx="16" fill="#fafaf9"/>
    <circle cx="118" cy="822" r="17" fill="#14b8a6" opacity=".25"/>
    <rect x="152" y="808" width="196" height="9" rx="4.5" fill="#d6d3d1"/>
    <rect x="152" y="830" width="252" height="8" rx="4" fill="#e7e5e4"/>
  `;

  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f5f5f4"/>
        <stop offset="1" stop-color="#e7e5e4"/>
      </linearGradient>
    </defs>
    <style>
      text { font-family: Arial, sans-serif; fill: #1c1917; }
      .brand { font-size: 16px; font-weight: 700; }
      .eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 1.4px; fill: ${accent}; }
      .heading { font-size: 30px; font-weight: 700; }
      .body { font-size: 14px; fill: #78716c; }
      .label { font-size: 12px; font-weight: 700; letter-spacing: 1px; fill: #78716c; }
      .small { font-size: 12px; fill: #78716c; }
      .metric { font-size: 28px; font-weight: 700; }
      .button { font-size: 12px; font-weight: 700; fill: #ffffff; }
    </style>
    <rect width="100%" height="100%" fill="url(#background)"/>
    ${layout === 'mobile' ? mobileContent : desktopContent}
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`;
}

function createGallery(
  projectTitle: string,
  accent: string,
  captions: string[],
): ProjectGalleryImage[] {
  return captions.map((caption, index) => {
    const layout: MockupLayout = index === 1 || index === captions.length - 1 ? 'mobile' : 'desktop';
    const aspectRatio = layout === 'mobile' ? '9 / 16' : '16 / 10';

    return {
      src: createMockup(projectTitle, caption, accent, layout, index),
      alt: `Illustrative ${caption.toLowerCase()} mockup for ${projectTitle}`,
      caption,
      aspectRatio,
    };
  });
}

export const projectDetails: Record<string, ProjectDetail> = {
  'pwa-room-reservation': {
    role: 'Full Stack Developer · UI/UX Designer',
    problem:
      'Room bookings were difficult to coordinate across schedules, and users had limited visibility into room availability.',
    goal:
      'Create an installable, responsive reservation experience that makes availability and booking status easy to understand.',
    contribution:
      'Mapped the reservation flow, designed the interface, and built the PWA experience with resilient online and offline states.',
    gallery: [
      {
        src: '/images/projects/web-reservasi/web-reservasi.png',
        alt: 'Room Reservation Landing Page',
        caption: 'Room Reservation Landing Page',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-reservasi/web-reservasi-2.png',
        alt: 'Room Availability List',
        caption: 'Room Availability List',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-reservasi/web-reservasi-3.png',
        alt: 'Reservation Confirmation Form',
        caption: 'Reservation Confirmation Form',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-reservasi/web-reservasi-superadmin.png',
        alt: 'Superadmin Dashboard',
        caption: 'Superadmin Dashboard',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-reservasi/web-approval-admin.png',
        alt: 'Admin Approval Management',
        caption: 'Admin Approval Management',
        aspectRatio: '2 / 1',
      },
    ],
  },
  'd-landrow': {
    role: 'System Analyst · Web Developer',
    problem:
      'Land acquisition and right-of-way information needed a clearer way to track project progress and related records.',
    goal:
      'Organize project, parcel, and workflow information in one management interface for operational teams.',
    contribution:
      'Translated operational requirements into system workflows and implemented project-management screens and data views.',
    gallery: [
      {
        src: '/images/projects/web-dlandrow/web-dlandrow.png',
        alt: 'D-LANDROW Login Page',
        caption: 'D-LANDROW Login Page',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-dlandrow/web-dlandrow-project-dashboard.png',
        alt: 'Project Dashboard',
        caption: 'Project Dashboard',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-dlandrow/web-dlandrow-admin-review.png',
        alt: 'Admin Review Interface',
        caption: 'Admin Review Interface',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-dlandrow/web-dlandrow-admin-approval.png',
        alt: 'Admin Approval Interface',
        caption: 'Admin Approval Interface',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/web-dlandrow/web-dlandrow-status.png',
        alt: 'D-LANDROW project status screen',
        caption: 'Project Status Tracking',
        aspectRatio: '2 / 1',
      },
    ],
  },
  'attendance-tracking': {
    role: 'System Analyst · Web Developer',
    problem:
      'Manual attendance records made it harder to verify check-ins and review attendance history.',
    goal:
      'Provide a simple attendance workflow with location-aware check-ins and a clear administrative overview.',
    contribution:
      'Designed the check-in and review flows, then implemented the web interface and geolocation-based verification.',
    gallery: [
      {
        src: '/images/projects/web-attendance/web-attendance.png',
        alt: 'D-LANDROW Login Page',
        caption: 'D-LANDROW Login Page',
        aspectRatio: '2 / 1',
      },
    ]
  },
  'visitor-registration': {
    role: 'UI/UX Designer · Web Developer',
    problem:
      'Visitor details and check-in status needed to be collected consistently and reviewed by reception staff.',
    goal:
      'Make visitor registration quick while keeping a readable queue and a clear verification step.',
    contribution:
      'Structured the visitor form and review flow, and built the responsive registration and camera-validation screens.',
    gallery: createGallery('Visitor Registration', '#b45309', [
      'Visitor management dashboard',
      'Mobile registration',
      'Visitor check-in queue',
      'Camera verification',
      'Visitor record details',
    ]),
  },
  'calmie-mobile': {
    role: 'UI/UX Designer',
    problem:
      'People experiencing anxiety may need a calm, approachable way to find grounding exercises and support.',
    goal:
      'Explore a supportive mobile experience with low-friction check-ins and guided calming activities.',
    contribution:
      'Developed the concept, mapped key user journeys, and designed mobile screens for check-ins, breathing, and voice support.',
    gallery: [
      {
        src: '/images/projects/mob-calmie/mob-calmie-exercise.png',
        alt: 'Breathe Exercise Screens',
        caption: 'Breathe Exercise Screens',
        aspectRatio: '2 / 1',
      },
      {
        src: '/images/projects/mob-calmie/mob-calmie-chat.png',
        alt: 'CALMIE ChatBot, Overview, and Achievements Screens',
        caption: 'CALMIE ChatBot, Overview, and Achievements Screens',
        aspectRatio: '2 / 1',
      },
    ],
  },
  'e-voting-unity': {
    role: 'UI/UX Designer',
    problem:
      'Election participants need a clear voting journey that helps them understand their choices and confirm their submission.',
    goal:
      'Design an accessible voting flow for both voters and election administrators.',
    contribution:
      'Designed the information architecture, voter journey, ballot review, and supporting election-management screens.',
    gallery: [  
      {
        src: '/images/projects/e-voting/mob-evt-voting.png',
        alt: 'Mobile Voting Interface',
        caption: 'Mobile Voting Interface',
        aspectRatio: '1920 / 1080',
      },
      {
        src: '/images/projects/e-voting/web-evt-add.png',
        alt: 'Add Election Form',
        caption: 'Add Election Form',
        aspectRatio: '1728 / 2080',
      },
      {
        src: '/images/projects/e-voting/web-evt-countdown.png',
        alt: 'Election Countdown',
        caption: 'Election Countdown',
        aspectRatio: '1728 / 1117',
      },
      {
        src: '/images/projects/e-voting/web-evt-dashboard.png',
        alt: 'Admin Dashboard',
        caption: 'Admin Dashboard',
        aspectRatio: '1728 / 1117',
      },
      {
        src: '/images/projects/e-voting/web-evt-monitoring.png',
        alt: 'EVT UNITY election monitoring',
        caption: 'Election Monitoring',
        aspectRatio: '1728 / 1353',
      },
      {
        src: '/images/projects/e-voting/web-evt-recap.png',
        alt: 'EVT UNITY election recap',
        caption: 'Election Overview',
        aspectRatio: '1728 / 1117',
      },
      {
        src: '/images/projects/e-voting/web-evt-tps-list.png',
        alt: 'EVT UNITY polling station list',
        caption: 'Polling Station List',
        aspectRatio: '1728 / 1117',
      },
    ],
  },
};
