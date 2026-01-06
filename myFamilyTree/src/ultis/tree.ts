import { injectable } from "tsyringe";
@injectable()
export class Tree {
  constructor() {}

  getFunctionTree(data: any[], level: number, root: string | null): any[] {
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      // Check level và parent_id (root có thể là "0", null, hoặc undefined)
      const itemParentId = data[i].parent_id;
      const isRootMatch = (root === "0" || root === null) 
        ? (itemParentId === null || itemParentId === "0" || itemParentId === undefined)
        : itemParentId === root;
        
      if (data[i].level == level && isRootMatch) {
        let row = Object.assign({}, data[i]);
        let lowerLevel: any[] = this.getFunctionTree(
          data,
          level + 1,
          row.function_id
        );
        let isLeaf = lowerLevel.length == 0;
        let levelResult = {
          title: row.function_name,
          key: row.function_id,
          value: row.function_id,
          code: row.function_code,
          parent_id: row.parent_id,
          level: row.level,
          url: row.url,
          icon: row.icon,
          children: lowerLevel,
          sort_order: row.sort_order,
          is_leaf: isLeaf,
        };
        result.push(levelResult);
      }
    }
    return result;
  }
}