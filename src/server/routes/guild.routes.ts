import guildController from "@riniya.ts/server/controllers/guild.controller";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";

export default class GuildRoutes extends BaseRoute {
    public register(): void {
        this.setProtected(true)
        
        this.router.get('/servers', guildController.fetchGuilds);
        this.router.get('/servers/:server', guildController.fetchGuildById);
        this.router.get('/servers/:server/members', guildController.fetchMembers);
        this.router.get('/servers/:server/members/:identifier', guildController.fetchMemberById);
        this.router.get('/servers/:server/members/:identifier/profile', guildController.fetchMemberProfile);
        this.router.get('/servers/:server/members/:identifier/sanctions', guildController.fetchMemberSanctions);

        this.router.get('/servers/:server/verifications', guildController.fetchVerifications);
        this.router.get('/servers/:server/verifications/:identifier', guildController.fetchVerificationsById);

        this.router.get('/servers/:server/activity', guildController.fetchActivities);
        this.router.get('/servers/:server/activity/:identifier', guildController.fetchActivityById);
        this.router.post('/servers/:server/activity/add-activity', guildController.createActivity);

        this.router.get('/servers/:server/messages', guildController.fetchMessages);
        this.router.get('/servers/:server/messages/:identifier', guildController.fetchMessageById);
        this.router.get('/servers/:server/messages/members/:member', guildController.fetchMessagesByMember);
    }
}