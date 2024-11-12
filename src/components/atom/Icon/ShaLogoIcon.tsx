'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ShaLogoIconProps = {
  href: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

const ShaLogoIcon = ({ href, src, width, height, alt, className }: ShaLogoIconProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-center transition-opacity hover:opacity-80',
        className
      )}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="object-contain"
        priority
      />
    </Link>
  );
};

export default ShaLogoIcon;
