import { overflowPropertiesByAxis } from '../../utils/overflow';

export function isScrollableOverflow(value: string): boolean {
  return value.includes('auto') || value.includes('scroll');
}

export function getOverflowAxis(prop: string): 'x' | 'y' | 'both' | null {
  if (overflowPropertiesByAxis.x.includes(prop)) return 'x';
  if (overflowPropertiesByAxis.y.includes(prop)) return 'y';
  if (overflowPropertiesByAxis.both.includes(prop)) return 'both';
  return null;
}

export function getOverscrollBehaviorAxis(prop: string): 'x' | 'y' | 'both' | null {
  if (prop === 'overscroll-behavior-x' || prop === 'overscroll-behavior-inline')
    return 'x';
  if (prop === 'overscroll-behavior-y' || prop === 'overscroll-behavior-block')
    return 'y';
  if (prop === 'overscroll-behavior') return 'both';
  return null;
}
