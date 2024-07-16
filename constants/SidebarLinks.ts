import { Home, List,School ,Activity, User } from 'lucide-react';

export const SidebarLinks: SidebarLink[] = [
  {
    route: '/',
    label: 'Home',
    icon: Home // Add the home icon
    
  },
  {
    route: '/dashboard',
    label: 'Dashboard',
    icon: List // Add the list icon for dashboard 
  },
  {
    route: '/kelas',
    label: 'Kelas',
    icon: School // Add the list icon for kelas
  },
  {
    route: '/activity',
    label: 'Activity',
    icon: Activity // Add the activity icon
  },
  {
    route: '/profil',
    label: 'Profil',
    icon: User // Add the user icon for profil
  },
];