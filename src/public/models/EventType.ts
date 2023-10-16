
export const eventTypeMap: { [key: string]: number } = {
    'Cumpleaños': 1,
    'Recibida': 2,
    'Despedida': 3,
    'Reunion': 4,
    'Privado': 5,
    'Empresa': 6,
    'Otro': 7,
};

// Get key given value
export const eventTypeReverseMap: { [key: number]: string } = {};
for (const key in eventTypeMap) {
    eventTypeReverseMap[eventTypeMap[key]] = key;
}


export const getEventColorByType = (eventType: string) => {
    switch (eventType.toString()) {
        case "1":
            return "#E9B546";
        case "2":
            return "#AF3B3B";
        case "3":
            return "#f1c232";
        case "4":
            return "#9172b6";
        case "5":
            return "#73364c";
        case "6":
            return "#d79ee1";
        default:
            return "#ecba90";
    }
}