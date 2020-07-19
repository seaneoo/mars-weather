export default interface Sol {
  id: string;
  date: string;
  airTemp: {
    min: number;
    max: number;
    average: number;
  };
  windSpeed: {
    min: number;
    max: number;
    average: number;
  };
  pressure: {
    min: number;
    max: number;
    average: number;
  };
}
