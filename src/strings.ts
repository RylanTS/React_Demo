export function pluraliseWithCount(count: number, singularText: string, pluralText?: string) {
    return `${count} ${pluralise(count, singularText, pluralText)}`;
}

export function pluralise(count: number, singularText: string, pluralText?: string) {
    return `${count === 1 ? singularText : pluralText || (singularText + "s")}`;
}

