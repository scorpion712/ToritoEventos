import { AppointmentOwner } from "./AppointmentModel";

export interface EventModel { 
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    guests: string;
    eventType: Number;
    img: string;
    imgFile: File;
    owners: AppointmentOwner [];
    ownersId: string [];
    notes: string;
    confirmed: boolean;
}