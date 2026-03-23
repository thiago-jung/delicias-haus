// src/app/produtos/[id]/loading.tsx
// Responsabilidade: Skeleton da página de produto individual

export default function ProductLoading() {
    return (
        <div className="min-h-screen animate-pulse">
            {/* Breadcrumb */}
            <div className="pt-24 pb-0 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="h-4 w-40 rounded-full bg-white/5" />
                </div>
            </div>

            {/* Product detail */}
            <div className="py-12 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image skeleton */}
                        <div className="aspect-square rounded-2xl bg-surface-2 border border-brand-gold/10" />

                        {/* Info skeleton */}
                        <div className="space-y-6 pt-4">
                            <div className="h-6 w-32 rounded-full bg-brand-gold/10" />
                            <div className="space-y-3">
                                <div className="h-12 w-4/5 rounded-xl bg-white/5" />
                                <div className="h-4 w-full rounded-full bg-white/4" />
                                <div className="h-4 w-3/4 rounded-full bg-white/4" />
                            </div>
                            <div className="py-6 border-y border-border-subtle">
                                <div className="h-10 w-32 rounded-full bg-brand-gold/10" />
                            </div>
                            <div className="flex gap-2">
                                {[60, 80, 70].map((w, i) => (
                                    <div key={i} className="h-7 rounded-full bg-white/5" style={{ width: `${w}px` }} />
                                ))}
                            </div>
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-4 w-3/4 rounded-full bg-white/4" />
                                ))}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <div className="flex-1 h-13 rounded-full bg-brand-gold/15" />
                                <div className="h-13 w-40 rounded-full bg-white/5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}