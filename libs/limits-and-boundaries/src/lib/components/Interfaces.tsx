interface IBoundaries {
  id: string;
  temperatureBoundaryMax: number;
  temperatureBoundaryMin: number;
  humidityBoundaryMax: number;
  humidityBoundaryMin: number;
  cO2BoundaryMax: number;
  cO2BoundaryMin: number;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ILimits {
  id: string;
  temperatureLimitMax: number;
  temperatureLimitMin: number;
}

interface ITempData {
  tempMin: number;
  tempMax: number;
}

interface IHumData {
  humMin: number;
  humMax: number;
}

interface ICO2Data {
  co2Min: number;
  co2Max: number;
}

interface INotificationState {
  message: string;
  type: NotificationType;
}

export { IBoundaries, ILimits, ITempData, IHumData, ICO2Data, INotificationState, NotificationType };
