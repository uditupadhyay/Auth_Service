const UserRepository=require('../repository/user-repository');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const {JWT_KEY}=require('../config/serverConfig');

 class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
         }
    }

    async signIn1(email,planePassword){
        try {
            // step 1-> fecth the user using the email
            const user=await this.userRepository.getByEmail(email);
            // step 2-> compare incoming plane password with stores encrypted password
            const passwordMatch=this.checkPassword(planePassword,user.password);
            if(!passwordMatch){
                console.log("password doesn't match");
                throw {error:'Incorrect password'};
            }

            // step 3 -> if password match thn create a token and send it to the user
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;
            
        } catch (error) {
            console.log("Something is wrong in signin process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Soethig went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }
 }

 module.exports=UserService;