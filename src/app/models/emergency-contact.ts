import { UserAddress } from "./user-address";
import { UserPhoneNumber } from "./user-phone-number";

export interface EmergencyContact {

    name: string;
    phone_number: UserPhoneNumber[];
    email: string;
    address: UserAddress[];
}

