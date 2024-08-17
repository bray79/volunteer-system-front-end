import { EmergencyContact } from "./emergency-contact";
import { UserAddress } from "./user-address";
import { UserAvailability } from "./user-availability";
import { UserPhoneNumber } from "./user-phone-number";

export interface VolunteerInfo {
        id: number,
        first_name : string;
        last_name: string;
        user_name : string;
        password: string;
        preferred_centers : string[], //MAYBE CHANGE TO [] LATER
        skills_interests : string[],
        availabilty_times: UserAvailability[];
        address : UserAddress[];
        phone_numbers : UserPhoneNumber[];
        email: string;
        educational_background: string;
        current_licenses: string[]|undefined;
        emergency_contact: EmergencyContact[];
        drivers_license_on_file: boolean;
        social_security_on_file: boolean;
        approval_status: string;
        //opportunities: []
}
