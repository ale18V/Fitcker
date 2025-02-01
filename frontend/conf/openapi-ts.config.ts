import { defaultPlugins, defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
    input: "conf/openapi.json",
    output: "src/api/",
    plugins: [
       "@hey-api/typescript",
       "@hey-api/client-fetch",
       "@hey-api/sdk",
       "@hey-api/schemas",
       {
        name: "@hey-api/sdk",
        asClass: true,
        operationId: false,
       },
       {
        name: "@hey-api/client-fetch",
        runtimeConfigPath: "./src/utils/hey-api.ts",
       }
    ],
    logs: { level: "silent" }
})
