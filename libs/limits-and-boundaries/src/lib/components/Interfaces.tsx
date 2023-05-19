export interface IBoundaries {
  id: string;
  temperatureBoundaryMax: number;
  temperatureBoundaryMin: number;
  humidityBoundaryMax: number;
  humidityBoundaryMin: number;
  cO2BoundaryMax: number;
  cO2BoundaryMin: number;
}

export interface ILimits {
  id: string;
  temperatureLimitMax: number;
  temperatureLimitMin: number;
}

export interface ITempData {
  tempMin: number;
  tempMax: number;
}

export interface IHumData {
  humMin: number;
  humMax: number;
}

export interface ICO2Data {
  co2Min: number;
  co2Max: number;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface INotificationState {
  message: string;
  type: NotificationType;
}
