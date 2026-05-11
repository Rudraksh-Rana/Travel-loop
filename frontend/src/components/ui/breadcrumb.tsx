'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-text-muted" />}
          {item.href ? (
            <Link href={item.href} className="text-primary hover:text-primary-hover transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-muted">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
