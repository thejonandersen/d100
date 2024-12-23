import {ExtractJwt, Strategy} from "passport-jwt";
import passport from "passport";
import {PrismaClient} from "@prisma/client";
import {env} from "@/common/utils/envConfig";

const prisma = new PrismaClient();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET,
};

passport.use(
    new Strategy(opts, async (payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id
                }
            });

            if (user) return done(null, user);

            throw new Error("jwt invalid");
        } catch (e) {
            return done(e);
        }
    })
);