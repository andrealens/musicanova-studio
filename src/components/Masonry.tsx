"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<Map<string, { w: number; h: number }>> => {
  const map = new Map<string, { w: number; h: number }>();
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            map.set(src, { w: img.naturalWidth, h: img.naturalHeight });
            resolve();
          };
          img.onerror = () => resolve();
        })
    )
  );
  return map;
};

export interface MasonryItem {
  id: string;
  img: string;
  height: number;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  onItemClick,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imageSizes, setImageSizes] = useState<Map<string, { w: number; h: number }>>(new Map());
  const imagesReady = imageSizes.size > 0;

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top': return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left': return { x: -200, y: item.y };
      case 'right': return { x: window.innerWidth + 200, y: item.y };
      case 'center': return {
        x: containerRect.width / 2 - item.w / 2,
        y: containerRect.height / 2 - item.h / 2,
      };
      default: return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(map => setImageSizes(map));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 12;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const sizes = imageSizes.get(child.img);
      const height = sizes ? (columnWidth * sizes.h) / sizes.w : child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, imageSizes, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(item => item.y + item.h));
  }, [grid]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            y: 30,
            width: item.w,
            height: item.h,
          },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, { ...animProps, duration, ease, overwrite: 'auto' });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady]);

  const handleMouseEnter = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full transition-opacity duration-500" style={{ height: imagesReady ? totalHeight : 0, opacity: imagesReady ? 1 : 0 }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="group absolute box-content cursor-pointer"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => onItemClick?.(item)}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={() => handleMouseLeave(item.id)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/5 transition-colors duration-300 hover:border-white/20">
            <NextImage
              src={item.img}
              alt={`Gallery MusicaNova ${item.id}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              quality={75}
            />
            {/* Overlay al hover */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-md group-hover:opacity-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
