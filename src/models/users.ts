export interface Users{
    userId : number,
    userName : string,
    password : string,
    roleId : number,
    userAddress:number
    isDeleted:boolean,
    lastLogin:Date,
    img:string,
}
export interface Response{
    statusCode:number,
    message:string
}

export interface TokenDetails{
    token:string,
    message:string
}