interface UserResponse {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  data: UserData | null;
  errors: string | null;
}

interface UserData {
  userId: number;
  userCode: string;
  userName: string;
  password: string;
  roleId: number;
  roleName: string | null;
  createDate: string;
  isActive: boolean;
  status: number;
  fullname: string;
  phone: string | null;
  dob: string | null;
  gender: string | null;
  updateBy: string | null;
  updateDate: string | null;
}
