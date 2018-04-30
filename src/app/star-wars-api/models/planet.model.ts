export interface Planet {
  id: number;
  name: string;
  diameter: string; // can be unknown
  species: Array<{name: string, id: number}>; // not initialized at first
}
