namespace API.Payloads
{
    public static class APIRoutes
    {
        public const string Base = "api";

        public static class Authentication
        {
            public const string Login = Base + "/authentication/login";
            public const string RefreshToken = Base + "/authentication/refresh-token";

        }
        public static class Account
        {
            public const string ChangePassword = Base + "/account/change-password";

            public const string BanAccount = Base + "/account/ban-account";
        }
        public static class AppUser
        {
            public const string GetAll = Base + "/app-users/";

            public const string GetByID = Base + "/app-user/id/{id}";

            public const string Update = Base + "/app-user/id/{id}";

            public const string Delete = Base + "/app-user/";

            public const string Add = Base + "/app-user/";
        }
    }
}
