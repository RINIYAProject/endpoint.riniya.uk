import blacklistController from "@riniya.ts/server/controllers/blacklist.controller";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class BlacklistRoutes extends BaseRoute {
    public register(): void {
        this.setProtected(true)
        this.router.put('/blacklist/add-user', blacklistController.create);
        this.router.patch('/blacklist/edit-user', blacklistController.edit);
        this.router.delete('/blacklist/remove-user', blacklistController.remove);
        this.router.get('/blacklist/get-user/:identifier', blacklistController.fetch);
    }
}