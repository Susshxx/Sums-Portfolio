import { LayersIcon, CodeIcon, UsersIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const STATS = [
{ icon: LayersIcon, value: '2+', label: 'Years Experience' },
{ icon: CodeIcon, value: '5+', label: 'Design Tools' },
{ icon: UsersIcon, value: '4+', label: 'Academic Projects' },
{ icon: UsersIcon, value: '2', label: 'Work Experience' }];


export function About() {
  return (
    <section id="about" className="w-full bg-white px-6 border-b border-line">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="01." title="About Me" />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-body">
              Proficient in Figma, Framer, Adobe Photoshop, Illustrator, and Canva, with hands-on experience across branding, wireframing, prototyping, and responsive interface design.
            </p>
            <p className="text-lg leading-relaxed text-body">
              Dedicated to combining creativity, usability, and visual storytelling to deliver impactful design solutions. Experience spans UI/UX design at Medics Nepal and graphic design at Orchard Institute, with a focus on enhancing user engagement and brand visibility.
            </p>
            <p className="text-lg leading-relaxed text-body">
              Strong foundation in full-stack development using the MERN Stack, with academic projects including a rental management system and blood donation platform. Committed to creating accessible, user-centered digital experiences through research, wireframing, and prototyping.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }) =>
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center shadow-sm">
              
                <span className="rounded-xl bg-black p-2 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-3xl font-extrabold text-heading">{value}</span>
                <span className="text-sm text-body">{label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}