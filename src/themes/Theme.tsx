// Theme.tsx

export type theme='light'|'dark'|'system';

export interface themed{
  background:string;
  text:string;
  card:string;
  footer:string;
}

export const lightTheme:themed={
  background:'#f5f5f5',
  text:'#000000',
  card:'#ffffff',
  footer:'#192f6a'
};

export const darkTheme:themed={
  background:'#121212',
  text:'#ffffff',
  card:'#1e1e1e',
  footer:'#0b1530'
};


