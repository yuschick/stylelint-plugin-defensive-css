import { AtRule, ChildNode, Container } from 'postcss';

export function findRootLevelLayer(node: ChildNode): { name: string } | null {
  let current = node.parent as Container | undefined;
  let layerAncestor: { name: string } | null = null;

  while (current && current.type !== 'root') {
    if (current.type === 'atrule' && (current as AtRule).name === 'layer') {
      layerAncestor = { name: (current as AtRule).params.trim() };
    }

    current = current.parent as Container | undefined;
  }

  return layerAncestor;
}
