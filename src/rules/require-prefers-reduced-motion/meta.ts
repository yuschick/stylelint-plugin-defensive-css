import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-prefers-reduced-motion';

export const messages = ruleMessages(name, {
  animation: () =>
    `The \`animation\` property should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
  animationDuration: () =>
    `An animation with a positive duration should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
  backgroundAttachment: () =>
    `Background attachment "fixed" should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
  scrollBehavior: () =>
    `Scroll behavior "smooth" should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
  transition: (property: string) =>
    `Transition property "${property}" should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
  viewTransition: () =>
    `View transitions should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugins',
};
