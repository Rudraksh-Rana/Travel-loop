'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`skeleton h-4 w-full ${className}`} />
  );
}

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'avatar' | 'image' | 'line';
  count?: number;
}

export function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const getSkeletonContent = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-surface-2 rounded-2xl overflow-hidden animate-shimmer border border-divider">
            <div className="h-48 bg-gradient-to-r from-surface-2 via-white/5 to-surface-2" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        );
      case 'avatar':
        return <Skeleton className="h-12 w-12 rounded-full" />;
      case 'image':
        return <Skeleton className="h-64 w-full rounded-lg" />;
      case 'line':
        return <Skeleton className="h-4 w-full" />;
      default:
        return <Skeleton />;
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{getSkeletonContent()}</div>
      ))}
    </div>
  );
}
