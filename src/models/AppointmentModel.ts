export interface AppointmentOwner {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    bornDate?: Date;
    address: string;
    city: string;
    state: string;
    password?: string;
}