import { Severity } from 'stylelint';

export interface SeverityProps {
  severity?: Severity;
}

export const severityOption: Record<'severity', Severity[]> = {
  severity: ['error', 'warning'],
};

export interface FixProps {
  fix?: boolean;
}

export const fixOption: Record<'fix', boolean[]> = {
  fix: [true, false],
};
