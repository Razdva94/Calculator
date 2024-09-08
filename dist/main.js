"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const startCalculator_1 = require("./startCalculator");
const app_module_1 = require("./app.module");
async function start() {
    const PORT = process.env.PORT || 5010;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
        (0, startCalculator_1.startCalculator)();
    }
    catch (error) {
        console.error('Произошла ошибка при запуске приложения:', error);
    }
}
start();
//# sourceMappingURL=main.js.map