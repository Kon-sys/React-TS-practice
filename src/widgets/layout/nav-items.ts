import {
    FileText,
    Home,
    MessageCircle,
    Network,
    Table2,
} from 'lucide-react';

export const navItems = [
    {
        to: '/',
        label: 'Home',
        icon: Home,
    },
    {
        to: '/tables',
        label: 'Tables',
        icon: Table2,
    },
    {
        to: '/process',
        label: 'Process',
        icon: Network,
    },
    {
        to: '/documentation',
        label: 'Documentation',
        icon: FileText,
    },
    {
        to: '/chat',
        label: 'Chat',
        icon: MessageCircle,
    },
] as const;