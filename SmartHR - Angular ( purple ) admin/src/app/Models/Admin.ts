import { Address } from "./Address";
import { AdminPermission } from "./AdminPermission";

export interface Admin {

  id: string;

  dob: string;

  fname: string;

  mname: string;

  lname: string;

  trn: string;

  nis: string;

  address: Address;

  contact: string;

  type: string;

  email: string;

  phone: string;

  gender: string;

  permissions: AdminPermission;

}
