// src/app/loading.tsx
// Responsabilidade: Skeleton de loading global — exibido durante navegação entre páginas

export default function GlobalLoading() {
    return (
        <div className="min-h-screen pt-32 px-6 animate-pulse">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Label */}
                <div className="h-3 w-20 rounded-full bg-brand-gold/15" />
                {/* Título */}
                <div className="space-y-3">
                    <div className="h-10 w-3/4 rounded-xl bg-white/5" />
                    <div className="h-10 w-1/2 rounded-xl bg-white/5" />
                </div>
                {/* Subtítulo */}
                <div className="space-y-2">
                    <div className="h-4 w-2/3 rounded-full bg-white/4" />
                    <div className="h-4 w-1/2 rounded-full bg-white/4" />
                </div>
            </div>
        </div>
    );
}