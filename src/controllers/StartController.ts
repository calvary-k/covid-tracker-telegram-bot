import { Context } from "telegraf";

import { getGlobalCaseData } from "../api";

const StartCommandController = async (ctx: Context) => {
  if (ctx?.from?.is_bot) {
    return;
  }

  const [data, error]: any = await getGlobalCaseData();

  if (error) {
    ctx?.replyWithMarkdown(
      `🔥 *Something went wrong!*\n\nPlease try again later.`
    );

    return;
  }

  const { confirmed = 0, deaths = 0, lastUpdate = new Date() } = data;

  ctx?.replyWithMarkdown(
    `🌐 *Global Case Data*\n\n` +
      `Confirmed: *${confirmed.toLocaleString("en-US")}* case(s)\n` +
      `Deaths: *${deaths.toLocaleString("en-US")}* case(s)\n\n` +
      `_Last updated: ${lastUpdate?.toLocaleString()}_`
  );
};

export default StartCommandController;
