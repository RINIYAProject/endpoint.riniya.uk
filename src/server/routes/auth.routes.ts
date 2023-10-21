import authController from "@riniya.ts/server/controllers/auth.controller";
import Authentication from "@riniya.ts/server/middleware/Authentication";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class AuthenticationRoutes extends BaseRoute {
    public register(): void {
        this.router.post('/security/login', authController.login);
        this.router.post('/security/logout', authController.logout);
        this.router.post('/security/register', Authentication.handle, authController.register);
        this.router.post('/security/reset-password', authController.resetPassword);
        this.router.post('/security/account-recovery', authController.accountRecovery);

        this.router.get('/security/confirm-email/:code', authController.confirmEmail);
    }
}