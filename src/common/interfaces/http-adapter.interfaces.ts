
//patron adaptador para la inyección de servicios
export interface HttpAdapter{
    get<T>( url: string): Promise<T>;
}