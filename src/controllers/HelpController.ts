import { Context } from "telegraf";

const HelpCommandController = async (ctx: Context) => {
  if (ctx?.from?.is_bot) {
    return;
  }

  ctx?.replyWithMarkdown(
    `📝 *Help*\n\n` +
      `This bot was made by *Calvary Karamoy* and the data is taken from https://github.com/mathdroid/covid-19-api.\n\n` +
      `Use the following commands to use this bot:\n\n` +
      `/start - start the bot and get the global case data\n` +
      `/country [country] - get the case data of a country\n` +
      `/help - get the available commands`
  );
};

export default HelpCommandController;
