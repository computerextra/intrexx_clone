import "dotenv/config"
import {defineConfig, env} from "prisma/config"

export default defineConfig({
    schema: "prisma-ce-old-database/schema.prisma",
    datasource: {
        url: env("CE_OLD_DATABASE_URL")
    }
})