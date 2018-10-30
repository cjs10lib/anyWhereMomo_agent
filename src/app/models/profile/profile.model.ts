export interface Profile {
    firstName?: string;
    lastName?: string;
    business?: Business;
    created?: any;
    lastUpdate?: any;
}

interface Business {
    companyName?: string;
    businessType?: string;
    contact?: Contact;
}

interface Contact {
    mobilePhone?: string;
    officePhone?: string;
    email?: string;
    address?: string;
}
