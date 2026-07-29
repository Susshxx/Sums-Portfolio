import { useState } from 'react';
import { ExternalLinkIcon, GithubIcon, LockIcon, MonitorIcon, SmartphoneIcon, GridIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { PreviewDialog } from './PreviewDialog';

type Project = {
  eyebrow?: string;
  title: string;
  description: string;
  tech: string[];
  link?: {label: string;href: string;icon: 'external' | 'github';target?: string;};
  note?: string;
  visual?: React.ReactNode;
  liveUrl?: string;
  staticImage?: string;
  designs?: Array<{
    title: string;
    image: string;
    liveUrl?: string;
    deviceType?: 'desktop' | 'mobile';
    customHeight?: string;
    disableMacPreview?: boolean;
  }>;
  disablePreview?: boolean;
  disablePhonePreview?: boolean;
};

function FlatmateVisual() {
  return (
    <img src="/Flatmate.png" alt="Flat Mate Project" className="h-full w-full object-cover" />
  );
}

function MedicsVisual() {
  return (
    <img src="/lifeflow.png" alt="Blood Donation Project" className="h-full w-full object-cover" />
  );
}
// function AirwaysVisual() {
//   return (
//     <img src="/plane.png" alt="Airways Project" className="h-full w-full object-cover" />
//   );
// }

function BrandingVisual() {
  return (
    <img src="/Diera.png" alt="E-Commerce Project" className="h-full w-full object-cover" />
  );
}

function FigmaVisual() {
  return (
    <img src="/figma.png" alt="Figma Project" className="h-full w-full object-cover" />
  );
}

const PROJECTS: Project[] = [
{
  eyebrow: 'Academic Project',
  title: 'Flat Mate - Rental Management System',
  description:
  'Designed and developed a comprehensive rental management platform using Figma for UI/UX design and the MERN Stack. Created responsive interfaces for landing page, authentication, and dedicated dashboards for Admin, Tenant, and Landlord users. Features include profile management, favourites, accessibility features, dark/light theme switching, real-time location tracking, in-app messaging, and property management.',
  tech: ['Figma', 'MERN Stack', 'React.js', 'Node.js', 'MongoDB'],
  link: { label: 'View Project', href: 'https://sumedha2408480-flat-mate.onrender.com/', icon: 'external', target: '_blank' },
  visual: <FlatmateVisual />,
  liveUrl: 'https://sumedha2408480-flat-mate.onrender.com/'
},
{
  eyebrow: 'Academic Project',
  title: 'Blood Donation Management System',
  description:
  'Designed and developed a blood donation management platform with dedicated modules for Donors, Users, and Administrators. Created complete UI/UX in Figma and developed using MERN Stack. Implemented responsive authentication, user dashboards, donor registration, blood request management, profile management, administrative controls, and intuitive navigation.',
  tech: ['Figma', 'MERN Stack', 'React.js', 'Node.js', 'MongoDB'],
  link: { label: 'View Project', href: 'https://lifeflow-uj6d.onrender.com/', icon: 'external', target: '_blank' },
  visual: <MedicsVisual />,
  liveUrl: 'https://lifeflow-uj6d.onrender.com/'
},
// {
//   eyebrow: 'Academic Project',
//   title: 'Airways',
//   description:
//   'Designed and developed a flight booking system with dedicated modules for Admin, and User. Created complete UI/UX in Figma and developed using MERN Stack. Implemented responsive authentication, user dashboards, flight booking, profile management, administrative controls, and intuitive navigation.',
//   tech: ['Figma', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
//   link: { label: 'View Project', href: 'https://github.com/Susshxx/colab', icon: 'github', target: '_blank' },
//   visual: <AirwaysVisual />
// },
{
  title: 'E-Commerce Website',
  description:
  'Designed and developed a responsive e-commerce website with a clean, user-friendly interface using HTML, CSS, and JavaScript. Implemented intuitive navigation, responsive layouts, and interactive components while ensuring cross-browser compatibility and optimal performance.',
  tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  link: { label: 'View Project', href: 'https://dierashop.com', icon: 'external', target: '_blank' },
  visual: <BrandingVisual />,
  liveUrl: 'https://dierashop.com'
},
{
  eyebrow: 'Design Project',
  title: 'Landing Page UI Designs',
  description:
  'Designed modern, responsive landing pages for travel and aquatic-themed websites using Figma and Framer. Created visually engaging layouts, interactive prototypes, user-focused navigation, and responsive interfaces while applying modern UI/UX principles and design systems.',
  tech: ['Figma', 'Framer', 'UI/UX Design', 'Prototyping'],
  link: { label: 'View Project', href: 'https://www.figma.com/design/7P5TDNl3JZLP4MdfNzJAiu/Flat-mate--Rental-management-System-?node-id=263-658&p=f&t=L0tkwb48O2oaMgcP-0', icon: 'external', target: '_blank' },
  visual: <FigmaVisual />,
  designs: [
    { title: 'ThailandTravel Landing Page', image: 'https://files.catbox.moe/2mnoc1.png' },
    { title: 'Travel Landing Page', image: 'https://files.catbox.moe/p3k3pi.png' },
    { title: 'Aquatic Theme Design', image: 'https://files.catbox.moe/srwqpf.png' },
    { title: 'Dark Aquatic Theme Design', image: 'https://files.catbox.moe/vlhnfo.png' },
    { title: 'Aquatic Theme Mobile Design', image: 'https://files.catbox.moe/4ucbvg.png', deviceType: 'mobile', disableMacPreview: true, customHeight: '180px' },
  ],
  disablePhonePreview: true
}];



function ProjectRow({ project, reversed }: {project: Project;reversed: boolean;}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mac' | 'phone'>('mac');
  const hasPreview = (project.liveUrl || project.staticImage || project.designs) && !project.disablePreview;

  return (
    <article className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
      <div className={reversed ? 'md:order-2' : 'md:order-1'}>
        <div className="relative">
          <div className="h-[240px] overflow-hidden rounded-2xl">{project.visual}</div>
          {hasPreview && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              {project.designs ? (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setPreviewDevice('mac'); setPreviewOpen(true); }}
                  className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-heading shadow-md hover:bg-white transition-colors"
                  aria-label="View Gallery"
                >
                  <GridIcon className="h-4 w-4" />
                  View Gallery
                </button>
              ) : (
                <div className={`flex gap-2 ${reversed ? 'flex-row-reverse' : ''}`}>
                  {!project.disablePhonePreview && (
                    <button
                      onClick={() => { setPreviewDevice('phone'); setPreviewOpen(true); }}
                      className="rounded-full bg-white/90 p-2 text-heading shadow-md hover:bg-white transition-colors"
                      aria-label="Preview on Phone"
                    >
                      <SmartphoneIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => { setPreviewDevice('mac'); setPreviewOpen(true); }}
                    className="rounded-full bg-white/90 p-2 text-heading shadow-md hover:bg-white transition-colors"
                    aria-label="Preview on Mac"
                  >
                    <MonitorIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-col gap-3 ${
        reversed ? 'md:order-1 md:items-end md:text-right' : 'md:order-2 md:items-start'}`
        }>
        
        {project.eyebrow && <p className="font-mono text-xs text-accent">{project.eyebrow}</p>}
        <h3 className="font-display text-2xl font-bold text-heading">{project.title}</h3>

        <div
          className={`w-full rounded-xl border border-line bg-white p-5 shadow-md md:w-[calc(100%+48px)] ${
          reversed ? 'md:-mr-12' : 'md:-ml-12'}`
          }>
          
          <p className="text-sm leading-6 text-body">{project.description}</p>
        </div>

        <ul className={`flex flex-wrap gap-2 ${reversed ? 'md:justify-end' : ''}`}>
          {project.tech.map((t) =>
          <li key={t} className="rounded bg-secondary px-2 py-1 font-mono text-xs text-chip">
              {t}
            </li>
          )}
        </ul>

        {project.link &&
        <a
          href={project.link.href}
          target={project.link.target}
          className="inline-flex items-center gap-2 text-sm font-medium text-heading transition-opacity hover:opacity-70">
          
            {project.link.icon === 'github' ?
          <GithubIcon className="h-4 w-4" aria-hidden="true" /> :

          <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
          }
            {project.link.label}
          </a>
        }

        {project.note &&
        <span className="inline-flex items-center gap-2 rounded-lg bg-secondary px-2 py-1.5 text-sm font-medium text-body">
            <LockIcon className="h-4 w-4" aria-hidden="true" />
            {project.note}
          </span>
        }
      </div>
      <PreviewDialog
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        initialDevice={previewDevice}
        contentType={project.liveUrl ? 'live' : 'static'}
        content={project.liveUrl || project.staticImage || ''}
        designs={project.designs}
        disablePhonePreview={project.disablePhonePreview}
      />
    </article>);

}

export function Projects() {
  return (
    <section id="projects" className="w-full bg-white px-6 border-b border-line">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="03." title="Featured Work" />

        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((project, i) =>
          <ProjectRow key={project.title} project={project} reversed={i % 2 === 1} />
          )}
        </div>
      </div>
    </section>);

}