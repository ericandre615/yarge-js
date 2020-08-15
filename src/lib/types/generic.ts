export type AnyObject = { [key: string]: any };
export type GenericObject<T> = T & { [key: string]: unknown };
