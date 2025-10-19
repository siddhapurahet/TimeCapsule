import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import userSession from '../models/userSession.js';

export const signin = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await user.findOne({email});
        if(!existingUser) {
            return res.status(400).json({message: "Incorrect username or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect username or password"});
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: '1h'});

        // Create or update user session
        const sessionId = jwt.sign({userId: existingUser._id, timestamp: Date.now()}, process.env.SECRET_KEY, {expiresIn: '1h'});
        console.log('Creating/updating session for user:', existingUser._id);
        const sessionResult = await userSession.findOneAndUpdate(
            { userId: existingUser._id },
            {
                userId: existingUser._id,
                sessionId: sessionId,
                lastSeen: new Date(),
                isActive: true,
                userAgent: req.get('User-Agent') || '',
                ipAddress: req.ip || req.connection.remoteAddress || ''
            },
            { upsert: true, new: true }
        );
        console.log('Session created/updated:', sessionResult);

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

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

        // Create user session for new user
        const sessionId = jwt.sign({userId: result._id, timestamp: Date.now()}, process.env.SECRET_KEY, {expiresIn: '1h'});
        console.log('Creating session for new user:', result._id);
        const newSession = await userSession.create({
            userId: result._id,
            sessionId: sessionId,
            lastSeen: new Date(),
            isActive: true,
            userAgent: req.get('User-Agent') || '',
            ipAddress: req.ip || req.connection.remoteAddress || ''
        });
        console.log('New session created:', newSession);

        res.status(200).json({result: result, token});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getOnlineUsers = async(req, res) => {
    try {
        console.log('Getting online users...');
        
        // Clean up expired sessions first
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const cleanupResult = await userSession.updateMany(
            { lastSeen: { $lt: fiveMinutesAgo } },
            { isActive: false }
        );
        console.log('Cleaned up expired sessions:', cleanupResult);

        // Get active sessions with user details
        const activeSessions = await userSession.find({ isActive: true })
            .populate('userId', 'name email')
            .sort({ lastSeen: -1 });

        console.log('Active sessions found:', activeSessions.length);
        console.log('Active sessions:', activeSessions);

        const onlineUsers = activeSessions.map(session => ({
            id: session.userId._id,
            name: session.userId.name,
            email: session.userId.email,
            lastSeen: session.lastSeen
        }));

        console.log('Online users:', onlineUsers);
        res.status(200).json({ users: onlineUsers });
    } catch (error) {
        console.error('Error fetching online users:', error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const updateUserActivity = async(req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({message: "User ID is required"});
        }

        // Update user's last seen timestamp
        await userSession.findOneAndUpdate(
            { userId: userId, isActive: true },
            { lastSeen: new Date() }
        );

        res.status(200).json({message: "Activity updated"});
    } catch (error) {
        console.error('Error updating user activity:', error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const logout = async(req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({message: "User ID is required"});
        }

        // Deactivate user session
        await userSession.findOneAndUpdate(
            { userId: userId, isActive: true },
            { isActive: false }
        );

        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({message: "Something went wrong"});
    }
}