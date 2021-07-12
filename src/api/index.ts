import fetch from 'node-fetch';

const API = new URL(
  'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
);

export type Sol = {
  terrestrial_date: string;
  sol: string;
  season: string;
  min_temp: string;
  max_temp: string;
  pressure: string;
  abs_humidity: string;
  wind_speed: string;
  wind_direction: string;
  atmo_opacity: string;
  sunrise: string;
  sunset: string;
  local_uv_irradiance_index: string;
  min_gts_temp: string;
  max_gts_temp: string;
};

export const getMarsWeather = (): Promise<Array<Sol>> => {
  return new Promise(async (resolve, reject) => {
    await fetch(API)
      .then((res) => res.json())
      .then((data) => {
        resolve(data.soles as Array<Sol>);
        return;
      })
      .catch((err) => {
        reject(err);
        return;
      });
  });
};
