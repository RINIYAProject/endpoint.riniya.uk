import blacklistController from "@riniya.ts/server/controllers/blacklist.controller";
import Authentication from "@riniya.ts/server/middleware/Authentication";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class BlacklistRoutes extends BaseRoute {
    public register(): void {
        this.router.put('/blacklist/add-user', Authentication.handle, blacklistController.create);
        this.router.patch('/blacklist/edit-user', Authentication.handle, blacklistController.edit);
        this.router.delete('/blacklist/remove-user', Authentication.handle, blacklistController.remove);
        this.router.get('/blacklist/get-user/:identifier', Authentication.handle, blacklistController.fetch);
    }
}