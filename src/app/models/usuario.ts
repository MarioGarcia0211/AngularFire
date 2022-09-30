export interface Usuario {
  uid: any;
  name: string;
  lastname: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  rol: 'Cliente' | 'Admin';
  create_at: Date;
}
