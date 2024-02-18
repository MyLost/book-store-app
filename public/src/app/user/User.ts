export interface UserInterface {

        set id(id: any);
        set username(username: any);
        set password(password: any);
        set firstName(firstName: any);
        set lastName(lastName: any);
        set confirmPassword(confirmPassword: any);
        set bornOn(bornOn: any);

        get id(): string;
        get username(): string;
        get password(): any;
        get firstName(): any;
        get lastName(): any;
        get confirmPassword(): any;
        get bornOn(): any;
}

export class User implements UserInterface {
        set id(id: string) {
            this._id = id;
        }
        get id(): string {
            return this._id;
        }

        private _username: any;
        private _active: any;
        private _email: any;
        private _id: any;
        private _phoneNumber: any;
        private _role: any;
        private _google_email: any;
        private _password: any;
        private _firstName: any;
        private _lastName: any;
        private _confirmPassword: any;
        private _bornOn: Date;

        set username(username: any) {
          this._username = username;
        }
        set password(password: any) {
          this._password = password;
        }
        set firstName(firstName: any) {
          this._firstName = firstName;
        }
        set lastName(lastName: any) {
          this._lastName = lastName;
        }
        set confirmPassword(confirmPassword: any) {
          this._confirmPassword = confirmPassword;
        }
        set bornOn(bornOn: any) {
          this._bornOn = bornOn;
        }

        get username() {
          return this._username;
        }
        get password() {
          return this._password;
        }
        get firstName() {
          return this._firstName;
        }
        get lastName() {
          return this._lastName;
        }
        get confirmPassword() {
          return this._confirmPassword;
        }
        get bornOn() {
          return this._bornOn;
        }
}
