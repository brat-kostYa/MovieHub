export function getEnumKeys<T extends string, TEnumValue extends string | string> (
    enumVariable: {[key in T]: TEnumValue}) {
        return Object.keys(enumVariable) as Array<T>;
    }