import { Address } from "./Address";
import { Bank } from "./Bank";
import { Econtact } from "./Econtact";
import { Permission } from "./Permission";

export interface Client {

  id: string;

  employeeID: number;

  dob: string;

  fname: string;

  lname: string;

  trn: string;

  nis: string;

  address: Address;

  contact: string;

  emergencyContact: Array<Econtact>;

  type: string;

  email: string;

  clientID: number;

  password: string;

  status: string;

  bank: Bank;

  phone: string;

  gender: string;

  maritalStatus: string;

  companyName: string;

  permissions: Permission;


}
