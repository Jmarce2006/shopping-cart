export interface Order {
    uid: string;
    userUid: string;
    details: any[];
    total: number;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    additional_info: string;
}