import BaseRoute from "@riniya.ts/server/base/BaseRoute";
import apiController from "@riniya.ts/server/controllers/api.controller";

export default class APIRoutes extends BaseRoute {
    public register(): void {        
        this.router.get('/features/commands', apiController.fetchCommands);
        this.router.get('/features/invite', apiController.fetchInvite);
    }
}