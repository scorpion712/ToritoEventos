
export const eventTypeMap: { [key: string]: number } = {
    'Cumpleaños': 1,
    'Privado': 2,
    'Reunión': 3,
    'Empresa': 4,
};

// Get key given value
export const eventTypeReverseMap: { [key: number]: string } = {};
for (const key in eventTypeMap) {
    eventTypeReverseMap[eventTypeMap[key]] = key;
}