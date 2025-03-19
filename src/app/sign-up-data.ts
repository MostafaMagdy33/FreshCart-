export interface SignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface SignInData {

  email: string;
  password: string;
}

export interface ForgetPass {
  email: string;
}
export interface code {
  resetCode: string;
}
export interface resetPasswordUser {
  email: string;
  newPassword: string;
}
export interface changePassword {

 currentPassword:string;
  password:string;
  rePassword:string;

}

