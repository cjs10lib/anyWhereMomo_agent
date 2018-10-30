import { User } from 'firebase';

export interface SaveProfileResult {
    status?: boolean;
    account?: User;
}
