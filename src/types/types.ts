import { CurrentWeather } from "./weatherType";

type Camelize<T extends string> = T extends `${infer A}_${infer B}` ? `${A}${Camelize<Capitalize<B>>}` : T;

type CamelizeKeys<T extends object> = {
    [key in keyof T as key extends string ? Camelize<key> : key]: T[key];
}

export type TransfomedCurrentWeather = CamelizeKeys<CurrentWeather>;