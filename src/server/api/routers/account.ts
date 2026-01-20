import { createTRPCRouter, privareProcedure } from "../trpc";

export const accountRouter =createTRPCRouter({
    getAccounts: privareProcedure.query ( async ({ctx}) => {
        const accounts = await ctx.db.account.findMany({
            where: {
                 userId: ctx.auth.userId
                 },
                 select: {
                    id: true, emailAddress: true, name: true
                 }
        });
        return accounts;
    })  
})