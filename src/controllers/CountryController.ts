import { Context } from "telegraf";

import { getCountryCaseData } from "../api";

const capitalizeWords = (str: string) => {
  return str
    ?.toLocaleLowerCase()
    ?.split(" ")
    ?.map((row: string) => row?.charAt(0)?.toUpperCase() + row?.slice(1))
    ?.join(" ");
};

const CountryCommandController = async (ctx: Context) => {
  if (ctx?.from?.is_bot) {
    return;
  }

  const message: any = ctx?.message;
  const textMessage = message?.text;
  const country = textMessage?.substr(textMessage?.indexOf(" ") + 1);

  if (country === textMessage || country === "") {
    ctx?.replyWithMarkdown(
      `You need to specify the country's name.\n\n` +
        `*Example*: /country Indonesia`
    );
  } else {
    const [data, error]: any = await getCountryCaseData(country);

    if (error) {
      ctx?.replyWithMarkdown(
        `🔥 *Something went wrong!*\n\nPlease try again later.`
      );

      return;
    }
    const { confirmed = 0, deaths = 0, lastUpdate = new Date() } = data;

    ctx?.replyWithMarkdown(
      `🌐 *Country Case Data*\n\n` +
        `Confirmed: *${confirmed.toLocaleString("en-US")}* case(s)\n` +
        `Deaths: *${deaths.toLocaleString("en-US")}* case(s)\n\n` +
        `_Last updated: ${lastUpdate?.toLocaleString()}_`
    );
  }
};

export default CountryCommandController;
