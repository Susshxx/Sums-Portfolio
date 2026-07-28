import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = ['UI/UX Designer'];

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white px-6 pb-12 pt-20 md:pb-16 md:pt-28 border-b border-line min-h-screen flex items-center">
      

      <div className="relative mx-auto grid w-full max-w-[896px] items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-6">
          
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-secondary px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-accent">Open to Work</span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-heading md:text-[52px] md:leading-[60px]">
              Sumedha Mali
            </h1>
            <p
              className="font-display text-2xl font-extrabold text-accent md:text-[32px] md:leading-[40px]"
              aria-label={ROLES.join(', ')}>
              
              <span aria-hidden="true">{typed}</span>
              <span
                className="ml-0.5 h-[0.9em] w-[3px] animate-pulse bg-accent align-middle"
                aria-hidden="true" />
              
            </p>
          </div>

          <p className="text-lg font-light text-body md:text-xl">
            Creative UI/UX Designer with a strong foundation in graphic design and a passion for building intuitive, user-centered digital experiences.
          </p>

          <p className="flex items-center gap-2 text-base text-body">
            <MapPinIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            Kathmandu, Nepal
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-heading px-8 py-4 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5">
              
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-white px-8 py-4 text-base font-semibold text-heading transition-colors hover:bg-secondary">
              
              Get In Touch
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/SumedhaMali"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/sumedha-mali-ab3791321/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href="https://mail.google.com/mail/u/0/#inbox/FMfcgzQhVXHWwkSwsWsHqLMtDCrdTkdM?compose=GTvVlcRzCpXCPnRXHpMMFkFnGllvBTNWHFTSvFxvfgcHZfXDKMLFCvfKlCmrsVlCBnnCbRLWcBTlb"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end">
          
          <div
            className="relative w-[500px] h-[600px] bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/okai.jpg')" }}>
            <img
              src="/288-131.png"
              alt="Portrait of Sumedha Mali"
              width={320}
              height={420}
              className="w-[320px] h-[420px] rounded-[10%] border border-line mt-24" />
          </div>
            
        </motion.div>
      </div>
    </section>);

}