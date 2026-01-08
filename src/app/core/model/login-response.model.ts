interface LoginResponse{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  role: string;
  firstName: string;
  lastName: string;
}

interface ApiResponse<T>{
  message: string;
  success: boolean;
  data: T;

}