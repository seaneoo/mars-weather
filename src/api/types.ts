export type MSLFeed = {
  /** Descriptions of different properties in this API. */
  descriptions: Descriptions;
  /** Array of objects, each representing one Mars day. */
  soles: Sol[];
};

export type Descriptions = {
  disclaimer_en: string;
  sol_desc_en: string;
  terrestrial_date_desc_en: string;
  temp_desc_en: string;
  pressure_desc_en: string;
  abs_humidity_desc_en: string;
  wind_desc_en: string;
  gts_temp_desc_en: string;
  local_uv_irradiance_index_desc_en: string;
  atmo_opacity_desc_en: string;
  ls_desc_en: string;
  season_desc_en: string;
  sunrise_sunset_desc_en: string;
};

export type Sol = {
  /** Unique identifier for the resource. */
  id: string;
  /** The current Earth day */
  terrestrial_date: string;
  /** The current Mars day */
  sol: string;
  /**  */
  ls: string;
  /**  */
  season: string;
  /** Minimum temperature for the day. Recorded in Celsius. */
  min_temp: string;
  /** Maximum temperature for the day. Recorded in Celsius. */
  max_temp: string;
  /** Atmospheric pressure. Recorded in Pa. */
  pressure: string;
  /**  */
  pressure_string: string;
  /**  */
  abs_humidity: string;
  /**  */
  wind_speed: string;
  /**  */
  wind_direction: string;
  /**  */
  atmo_opacity: string;
  /** The time the sun rose. Recorded in 24-hour time. */
  sunrise: string;
  /** The time the sun set. Recorded in 24-hour time. */
  sunset: string;
  /**  */
  local_uv_irradiance_index: string;
  /**  */
  min_gts_temp: string;
  /**  */
  max_gts_temp: string;
};
