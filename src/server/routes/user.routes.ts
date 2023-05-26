import userController from "@riniya.ts/server/controllers/user.controller";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class UserRoutes extends BaseRoute {
    public register(): void {
        this.setProtected(true)
        
        this.router.get('/user/@me', userController.fetchMe);
        this.router.get('/user/@me/audit', userController.fetchAudit);

        this.router.post('/user/@me/onboarding/profile', userController.createProfile);
        this.router.post('/user/@me/onboarding/verify-email', userController.comfirmEmail);
        this.router.post('/user/@me/onboarding/link-discord', userController.linkAccount);
        this.router.post('/user/@me/onboarding/mfa', userController.setupMfa);
    }
}