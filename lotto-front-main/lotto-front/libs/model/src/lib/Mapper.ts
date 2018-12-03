export interface Mapper<T, F> {
  map: (F) => T;
}
