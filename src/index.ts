import "dotenv/config";
import { Context, Telegraf } from "telegraf";

import {
  CountryCommandController,
  HelpCommandController,
  StartCommandController,
} from "./controllers";

const token = process?.env?.BOT_TOKEN;
const bot = new Telegraf<Context>(token !== undefined ? token : "");

bot?.start(StartCommandController);
bot?.command("country", CountryCommandController);
bot?.help(HelpCommandController);
bot?.launch();

process?.once("SIGINT", () => bot?.stop("SIGINT"));
process?.once("SIGTERM", () => bot?.stop("SIGTERM"));
