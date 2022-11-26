import jwt from 'jsonwebtoken'

const authCheck = async (req, res, next) => {
    try{
        const token = req.headers.autherization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth)
        {
            decodedData = jwt.verify(token, JWTPRIVATEKEY);
            req.userId = decodedData?.indexOf;
        }
        else
        {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    }catch (error) {
        console.log(error);
    }
}

export default authCheck