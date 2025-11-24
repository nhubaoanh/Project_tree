import { injectable } from "tsyringe";
@injectable()
export class Tree {
  constructor() {}

  // getFunctionTree(data: any[], level:number, root: string) : any[] {
  //     let result: any[] = [];
  //     for(let i = 0; i< data.length; i++){
  //         if(data[i].level == level && data[i].parent_id == root){
  //             let row = Object.assign({}, data[i]);
  //             let lowerLevel: any[] = this.getFunctionTree(data, level+1, row.functionId);
  //             let isLeaf = lowerLevel.length == 0;
  //             let levelResult = {
  //                 title : row.function_name,
  //                 key : row.functionId,
  //                 value: row.functionId,
  //                 parent_id: row.parent_id,
  //                 level: row.level,
  //                 url: row.url,
  //                 children: lowerLevel,
  //                 sort_order: row.sort_order,
  //                 is_leadf: isLeaf
  //             };
  //             result.push(levelResult);
  //         }
  //     }
  //     console.log("result", result);
  //     return result;
  // }

  getFunctionTree(data: any[], level: number, root: string): any[] {
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].level == level && data[i].parent_id == root) {
        let row = Object.assign({}, data[i]);
        let lowerLevel: any[] = this.getFunctionTree(
          data,
          level + 1,
          row.function_id
        );
        let isLeaf = lowerLevel.length == 0;
        let levelResult = {
          title: row.function_name,
          key: row.functionId,
          value: row.functionId,
          parent_id: row.parent_id,
          level: row.level,
          url: row.url,
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