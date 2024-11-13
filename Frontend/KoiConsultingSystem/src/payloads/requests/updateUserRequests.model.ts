export interface UpdateUserPayload {
    isActive: boolean;
    fullname: string;
    phone: string;
    dob: {
      year: number;
      month: number;
      day: number;
      dayOfWeek: number;
    };
    gender: string;
    updateBy: number;
  }
  