// Type definitions for react-family-tree compatibility

export type Gender = 'male' | 'female';

export type RelType = 'parent' | 'child' | 'spouse' | 'sibling';

export interface FamilyMember {
  id: string;
  name: string;
  gender: Gender;
  birthDate?: string;
  deathDate?: string;
  parents: readonly Readonly<{ id: string; type: RelType }>[];
  children: readonly Readonly<{ id: string; type: RelType }>[];
  siblings: readonly Readonly<{ id: string; type: RelType }>[];
  spouses: readonly Readonly<{ id: string; type: RelType }>[];
  placeholder?: boolean;
}
