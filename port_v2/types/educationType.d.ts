export interface EducationData {
  education: Education[];
}

export interface Education {
  _id: string;
  date: string;
  degree: string;
  field: string;
  logo: Logo;
  school: string;
}

export interface Logo {
  alt: string;
  src: string;
}
