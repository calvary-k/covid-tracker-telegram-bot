import axios from "axios";

import { CaseData } from "../interfaces";

const URL = "https://covid19.mathdro.id/api";

export const getGlobalCaseData = async () => {
  try {
    const { data } = await axios?.get(URL);
    const caseData: CaseData = {
      confirmed: data?.confirmed?.value,
      deaths: data?.deaths?.value,
      lastUpdate: new Date(data?.lastUpdate),
    };

    return [caseData, null];
  } catch (error) {
    console.log(error);

    return [null, error];
  }
};

export const getDailyCaseData = async () => {
  try {
    const { data } = await axios?.get(`${URL}/daily`);

    const caseData: CaseData[] = data
      ?.map((row: any) => {
        return {
          confirmed: row?.confirmed?.total,
          deaths: row?.deaths?.total,
          lastUpdate: new Date(row?.reportDate),
        };
      })
      ?.slice(-14);

    return [caseData, null];
  } catch (error) {
    console.log(error);

    return [null, error];
  }
};

export const getCountryCaseData = async (country: string) => {
  try {
    const { data } = await axios?.get(`${URL}/countries/${country}`);
    const caseData: CaseData = {
      confirmed: data?.confirmed?.value,
      deaths: data?.deaths?.value,
      lastUpdate: new Date(data?.lastUpdate),
    };

    return [caseData, null];
  } catch (error) {
    console.log(error);

    return [null, error];
  }
};
