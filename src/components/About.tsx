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
             {/* I am a UI/UX Designer with a passion for creating intuitive, user-centered, and visually engaging digital experiences. I specialize in transforming ideas into functional, accessible, and aesthetically refined interfaces through user research, wireframing, prototyping, and high-fidelity design, with a strong focus on usability and seamless user experiences. */}
             Driven by a passion for UI/UX design, I create intuitive, user-centered, and visually engaging digital experiences. I specialize in transforming ideas into functional, accessible, and aesthetically refined interfaces through user research, wireframing, prototyping, and high-fidelity design, with a strong focus on usability and seamless user experiences.
            </p>
            <p className="text-lg leading-relaxed text-body">
             Proficient in Figma, Framer, Adobe Photoshop, Adobe Illustrator, and Canva, I combine design principles with creative problem-solving to deliver impactful digital products. I am committed to continuous learning, staying current with industry trends, and collaborating with cross-functional teams to create innovative solutions that align user needs with business goals.
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