import { AlertCircle, Check, Pause } from 'lucide-react';

type SummaryCardProps = {
    title: string;
    subtitle: string;
    variant: 'success' | 'warning' | 'danger';
};

export function SummaryCard({ title, subtitle, variant }: SummaryCardProps) {
    const config = {
        success: {
            icon: Check,
            iconWrapper: 'bg-green-100 text-green-600',
            shape: 'bg-green-300',
        },
        warning: {
            icon: Pause,
            iconWrapper: 'bg-orange-100 text-orange-500',
            shape: 'bg-orange-300',
        },
        danger: {
            icon: AlertCircle,
            iconWrapper: 'bg-red-100 text-red-500',
            shape: 'bg-red-300',
        },
    }[variant];

    const Icon = config.icon;

    return (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <div className={`relative h-10 w-12 rounded-md ${config.shape}`}>
                <div
                    className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full ${config.iconWrapper}`}
                >
                    <Icon className="h-3.5 w-3.5" />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
}

type LegendRowProps = {
    label: string;
    value: string;
    color: string;
};

export function LegendRow({ label, value, color }: LegendRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <span className={`h-2 w-4 rounded-sm ${color}`} />
                <span>{label}</span>
            </div>

            <span>{value}</span>
        </div>
    );
}