require("dotenv").config();

export const config =  {
    region: process.env.REGION,
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
}
