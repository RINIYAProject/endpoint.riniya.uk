import Authentication from "@riniya.ts/server/middleware/Authentication";
import guildController from "@riniya.ts/server/controllers/guild.controller";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class GuildRoutes extends BaseRoute {
    public register(): void {        
        this.router.get('/servers', Authentication.handle, guildController.fetchGuilds);
        this.router.get('/servers/:server', Authentication.handle, guildController.fetchGuildById);
        this.router.get('/servers/:server/members', Authentication.handle, guildController.fetchMembers);
        this.router.get('/servers/:server/members/:identifier', Authentication.handle, guildController.fetchMemberById);
        this.router.get('/servers/:server/members/:identifier/profile', Authentication.handle, guildController.fetchMemberProfile);
        this.router.get('/servers/:server/members/:identifier/sanctions', Authentication.handle, guildController.fetchMemberSanctions);

        this.router.get('/servers/:server/verifications', Authentication.handle, guildController.fetchVerifications);
        this.router.get('/servers/:server/verifications/:identifier', Authentication.handle, guildController.fetchVerificationsById);

        this.router.get('/servers/:server/activity', Authentication.handle, guildController.fetchActivities);
        this.router.get('/servers/:server/activity/:identifier', Authentication.handle, guildController.fetchActivityById);
        this.router.post('/servers/:server/activity/add-activity', Authentication.handle, guildController.createActivity);

        this.router.get('/servers/:server/messages', Authentication.handle, guildController.fetchMessages);
        this.router.get('/servers/:server/messages/:identifier', Authentication.handle, guildController.fetchMessageById);
        this.router.get('/servers/:server/messages/members/:member', Authentication.handle, guildController.fetchMessagesByMember);
    }
}