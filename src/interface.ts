export interface DriverConfig {
    libpath?: string
    host:string
    port:string
    url: string
    user: string
    password?: string
    drivername: string
    minpoolsize?: number
    maxpoolsize?: number
    properties?: any
  }