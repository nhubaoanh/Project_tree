import { toPng, toSvg } from 'html-to-image';
import { getRectOfNodes, getTransformForBounds } from 'reactflow';
import type { Node } from 'reactflow';

const imageWidth = 1920;
const imageHeight = 1080;

/**
 * Export tree as PNG image
 */
export const exportToPng = async (nodes: Node[]) => {
  const nodesBounds = getRectOfNodes(nodes);
  const transform = getTransformForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5,
    2
  );

  const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
  if (!viewport) return;

  try {
    const dataUrl = await toPng(viewport, {
      backgroundColor: '#f5f5f4',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    });

    const link = document.createElement('a');
    link.download = `family-tree-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Export PNG failed:', error);
    throw error;
  }
};

/**
 * Export tree as SVG image
 */
export const exportToSvg = async (nodes: Node[]) => {
  const nodesBounds = getRectOfNodes(nodes);
  const transform = getTransformForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5,
    2
  );

  const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
  if (!viewport) return;

  try {
    const dataUrl = await toSvg(viewport, {
      backgroundColor: '#f5f5f4',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    });

    const link = document.createElement('a');
    link.download = `family-tree-${Date.now()}.svg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Export SVG failed:', error);
    throw error;
  }
};
