import ky, { HTTPError, Options } from 'ky';
import { ToastsListModel } from "@/core/models/toasts/toasts-list.model";
import useToasts from "@/core/hooks/useToasts";

export class NetClient {
  private client: typeof ky;
  private _toasts: ToastsListModel
  
  constructor(baseUrl: string) {
    this.client = ky.create({
      prefixUrl: baseUrl,
      timeout: 30000,
      retry: 3,
    });
    this._toasts = useToasts()
  }
  
  private async handleError(error: unknown): Promise<never> {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.text();
      let parsedBody;
      try {
        parsedBody = JSON.parse(errorBody);
      } catch {
        parsedBody = errorBody;
      }
      
      console.error('HTTP Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        body: parsedBody
      });
      
      let errorMessage = `Ошибка ${error.response.status}: ${error.response.statusText}`;
      if (typeof parsedBody === 'object' && parsedBody !== null) {
        if (Array.isArray(parsedBody.message)) {
          errorMessage += `. ${parsedBody.message.join('. ')}`;
        } else if (typeof parsedBody.message === 'string') {
          errorMessage += `. ${parsedBody.message}`;
        }
      }
      
      this._toasts.error({
        title: parsedBody.error || 'Ошибка запроса',
        message: errorMessage
      });
    } else if (error instanceof Error) {
      console.error('Network Error:', error.message);
      this._toasts.error({
        title: 'Ошибка сети',
        message: error.message
      });
    } else {
      console.error('Unknown Error:', error);
      this._toasts.error({
        title: 'Неизвестная ошибка',
        message: 'Произошла неизвестная ошибка'
      });
    }
    
    throw error;
  }
  
  async get<T>(url: string, options?: Options): Promise<T> {
    try {
      return await this.client.get(url, options).json<T>();
    } catch (e) {
      return this.handleError(e);
    }
  }
  
  async post<T>(url: string, data: unknown, options?: Options): Promise<T> {
    try {
      return await this.client.post(url, {json: data, ...options}).json<T>();
    } catch (e) {
      return this.handleError(e);
    }
  }
  
  async put<T>(url: string, data: unknown, options?: Options): Promise<T> {
    try {
      return await this.client.put(url, {json: data, ...options}).json<T>();
    } catch (e) {
      return this.handleError(e);
    }
  }
  
  async delete<T>(url: string, options?: Options): Promise<T> {
    try {
      return await this.client.delete(url, options).json<T>();
    } catch (e) {
      return this.handleError(e);
    }
  }
  
}