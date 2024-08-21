export interface ManageVolunteers {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    preferred_centers: string[],
    skills_interests: string[],
    availability_times: object[],
    address: object,
    phone_numbers: object,
    email: string,
    educational_background: string,
    current_licenses: string[],
    emergency_contact: object,
    drivers_license_on_file: boolean,
    social_security_card_on_file: boolean,
    approval_status: string,
    notes: string,
    opportunities_ids: string[]
}
