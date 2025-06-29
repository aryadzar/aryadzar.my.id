import { createRoutesFromFolders } from '@react-router/dev/config';
export default createRoutesFromFolders(import.meta.glob('./routes/**/*.{js,jsx,ts,tsx}'));
