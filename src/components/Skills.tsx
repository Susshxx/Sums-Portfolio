import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

type SkillGroup = {
  title: string;
  items: string[];
};

const GROUPS: SkillGroup[] = [
{ title: 'UI/UX Design', items: ['User Research', 'Wireframing', 'Interactive Prototyping', 'Responsive Design', 'Information Architecture', 'User Flows', 'Design Systems'] },
{ title: 'Development', items: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'Express.js', 'React.js', 'Node.js'] },
{ title: 'Design Tools', items: ['Figma', 'Framer', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'] },
{ title: 'Soft Skills', items: ['Team Collaboration', 'Communication & Presentation', 'Time Management', 'Problem Solving', 'Critical Thinking', 'Attention to Detail', 'Creativity', 'Adaptability', 'Client Communication', 'User-Centred Design Thinking'] }];


export function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="w-full bg-white px-6 border-b border-line">
      <div className="mx-auto w-full max-w-[896px] pb-24 md:pb-28">
        <SectionHeading number="02." title="Skills" />

        <div className="flex flex-wrap gap-3 mb-8">
          {GROUPS.map((group, index) => (
            <button
              key={group.title}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-chip hover:bg-secondary/80'
              }`}
            >
              {group.title}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(-1)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === -1
                ? 'bg-accent text-white'
                : 'bg-secondary text-chip hover:bg-secondary/80'
            }`}
          >
            View All
          </button>
        </div>

        {activeTab === -1 ? (
          <div className="grid gap-6">
            {GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-display text-lg font-bold text-heading">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-black bg-secondary px-3 py-2 text-sm font-medium text-chip"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div
            key={activeTab}
            className="rounded-2xl border border-line bg-white p-8 shadow-sm transition-all duration-300"
          >
            <h3 className="font-display text-2xl font-bold text-heading mb-6">
              {GROUPS[activeTab].title}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {GROUPS[activeTab].items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-black bg-secondary px-4 py-2.5 text-sm font-medium text-chip"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>);

}