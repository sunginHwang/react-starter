export type AsyncState<P> = {
    loading: boolean;
    data: P;
    error?: any;
}