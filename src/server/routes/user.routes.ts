import userController from "@riniya.ts/server/controllers/user.controller";
import Authentication from "@riniya.ts/server/middleware/Authentication";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class UserRoutes extends BaseRoute {
    public register(): void {        
        this.router.get('/user/@me', Authentication.handle, userController.fetchMe);
        this.router.get('/user/@me/audit', Authentication.handle, userController.fetchAudit);

        this.router.post('/user/@me/onboarding/profile', Authentication.handle, userController.createProfile);
        this.router.post('/user/@me/onboarding/verify-email', Authentication.handle, userController.comfirmEmail);
        this.router.post('/user/@me/onboarding/link-discord', Authentication.handle, userController.linkAccount);
        this.router.post('/user/@me/onboarding/mfa', Authentication.handle, userController.setupMfa);
    }
}