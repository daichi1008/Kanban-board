declare const process:Prpcess

interface process{
    env:{
        NODE_ENV:'development' | 'production'
        API_ENDPOINT?: string
    }
}