import { isEmpty } from "lodash";

export const checkIfEmpty = (value: any): boolean => isEmpty(value);

export const isString = (): boolean => false;
