import { useCallback, useState } from 'react';
import { Node, Edge } from 'reactflow';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export const useUndoRedo = () => {
  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  const takeSnapshot = useCallback((nodes: Node[], edges: Edge[]) => {
    setPast((prev) => [...prev, { nodes, edges }]);
    setFuture([]);
  }, []);

  const undo = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    if (past.length === 0) return null;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture((prev) => [{ nodes: currentNodes, edges: currentEdges }, ...prev]);

    return previous;
  }, [past]);

  const redo = useCallback(() => {
    if (future.length === 0) return null;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, next]);
    setFuture(newFuture);

    return next;
  }, [future]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  return { undo, redo, canUndo, canRedo, takeSnapshot };
};
