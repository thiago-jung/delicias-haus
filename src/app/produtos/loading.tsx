// src/app/produtos/loading.tsx
// Responsabilidade: Skeleton específico do catálogo — 8 cards em grid

export default function ProdutosLoading() {
    return (
        <div className="min-h-screen pt-32 px-6 animate-pulse">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <div className="h-3 w-16 rounded-full bg-brand-gold/15" />
                    <div className="h-12 w-72 rounded-xl bg-white/5" />
                    <div className="h-4 w-56 rounded-full bg-white/4" />
                </div>

                {/* Collection tabs skeleton */}
                <div className="flex gap-2">
                    {[80, 100, 90].map((w, i) => (
                        <div key={i} className="h-8 rounded-full bg-white/5" style={{ width: `${w}px` }} />
                    ))}
                </div>

                {/* Collection header card */}
                <div className="h-24 rounded-2xl bg-surface-2 border border-brand-gold/10" />

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-brand-gold/10 bg-surface overflow-hidden"
                        >
                            {/* Image placeholder */}
                            <div className="aspect-square bg-surface-2" />
                            {/* Content */}
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-3/4 rounded-full bg-white/5" />
                                <div className="h-3 w-full rounded-full bg-white/4" />
                                <div className="h-3 w-2/3 rounded-full bg-white/4" />
                                <div className="pt-2 flex items-center justify-between">
                                    <div className="h-6 w-16 rounded-full bg-brand-gold/10" />
                                    <div className="h-8 w-16 rounded-full bg-brand-gold/15" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}