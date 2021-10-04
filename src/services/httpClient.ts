import Axios, { AxiosInstance, AxiosResponse } from 'axios'

// Maybe we can add this endpoint as process env variable
export const API_ROOT_URL: string = "http://localhost:3005/"

class HttpClient {
  static instance: HttpClient = new HttpClient()

  axios: AxiosInstance

  constructor() {
    this.initInstance()
  }

  static getInstance() {
    return HttpClient.instance
  }

  initInstance() {
    this.axios = Axios.create({
      baseURL: `${API_ROOT_URL}`,
      headers: {
        'Content-Type': "application/json",
      }
    })
  }

  get(url: string, config?: any): Promise<AxiosResponse> {
    return this.axios.get(url, config)
  }

  post(url: string, data: any, config?: any): Promise<AxiosResponse> {
    return this.axios.post(url, data, config)
  }

  put(url: string, data: any, config?: any): Promise<AxiosResponse> {
    return this.axios.put(url, data, config)
  }

  delete(url: string, config?: any): Promise<AxiosResponse> {
    return this.axios.delete(url,config)
  }
}

export default HttpClient.getInstance()