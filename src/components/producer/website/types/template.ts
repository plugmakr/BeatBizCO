export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  blocks: any[];
  theme: {
    background: string;
    accent: string;
  };
}