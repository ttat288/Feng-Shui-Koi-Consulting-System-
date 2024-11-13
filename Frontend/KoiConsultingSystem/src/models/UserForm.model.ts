export interface UserForm {
  userName: {
    value: string;
    errorMessage: string;
  };
  userPassword: {
    value: string;
    errorMessage: string;
  };
  fullname: {
    value: string;
    errorMessage: string;
  };
  phone: {
    value: string;
    errorMessage: string;
  };
  dob: {
    value: Date;
    errorMessage: string;
  };
  gender: {
    value: string;
    errorMessage: string;
  };
  
}
