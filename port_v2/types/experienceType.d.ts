export interface ExperienceData {
  experience: Experience[];
}

export interface Experience {
  _id: string;
  _type?: string;
  company: string;
  description: string;
  duration: string;
  logo: Logo;
  skills: Skill[];
  title: string;
}

export interface Logo {
  alt: any;
  src: string;
}

export interface Skill {
  _id: string;
  title: string;
}
