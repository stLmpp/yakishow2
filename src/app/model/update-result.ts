export interface UpdateResult {
  raw: any;
  affected?: number;
  generatedMaps: { [key: string]: any };
}
