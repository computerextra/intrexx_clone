import "dotenv/config"
import {defineConfig, env} from "prisma/config"

export default defineConfig({
    schema: "prisma-ce-database/schema.prisma",
    datasource: {
        url: env("CE_DATABASE_URL")
    }
})