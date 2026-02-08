import { Severity } from 'stylelint';
import { severityOption } from './types';

export function validateBasicOption(value: unknown): boolean {
  // Allow boolean
  if (typeof value === 'boolean') {
    return true;
  }

  // Allow { severity: 'error' | 'warning' }
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;

    if ('severity' in obj) {
      const severity = obj.severity as string;
      return severityOption.severity.includes(severity as Severity);
    }

    // Empty object is valid
    return Object.keys(obj).length === 0;
  }

  // Allow [boolean, SeverityProps]
  if (Array.isArray(value) && value.length === 2) {
    const [enabled, severityProps] = value;

    if (typeof enabled !== 'boolean') {
      return false;
    }

    if (
      typeof severityProps !== 'object' ||
      severityProps === null ||
      Array.isArray(severityProps)
    ) {
      return false;
    }

    if ('severity' in severityProps) {
      return severityOption.severity.includes(severityProps.severity);
    }

    return true;
  }

  return false;
}
