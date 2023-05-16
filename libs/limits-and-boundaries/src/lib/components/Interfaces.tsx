interface IBoundaries {
  id: string;
  temperatureBoundaryMax: number;
  temperatureBoundaryMin: number;
  humidityBoundaryMax: number;
  humidityBoundaryMin: number;
  cO2BoundaryMax: number;
  cO2BoundaryMin: number;
}

interface ILimits {
  id: string;
  temperatureLimitMax: number;
  temperatureLimitMin: number;
}

export { IBoundaries, ILimits };
