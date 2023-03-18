import { sign, verify, JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
    id: number;
    fullName: string;
    username: string;
}

class Tokenization {
    static generate = (payload: Payload) => {
        return sign(payload, process.env.JWT_SECRET_KEY || "");
    };

    static validate = (token: string): Payload => {
        const payload: any = verify(token, process.env.JWT_SECRET_KEY || "");
        return payload;
    };
}

export default Tokenization;
