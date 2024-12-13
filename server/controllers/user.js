import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user';

export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({email});
        if(!existingUser) {
            return res.status(404).json({message: `User with ${email} does not exist`});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        
        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async() => {
    const { email, password, confirmPassword, firstName, lastName} = req.body();

    try {
        const existingUser = await user.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: `User with ${email} already exist`});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({message: 'Password and confirm password did not match'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await user.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({result: result, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}