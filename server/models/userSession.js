import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String,
        default: ''
    },
    ipAddress: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for efficient queries
userSessionSchema.index({ userId: 1 });
userSessionSchema.index({ lastSeen: 1 });
userSessionSchema.index({ isActive: 1 });

// Method to check if session is still active (within last 5 minutes)
userSessionSchema.methods.isSessionActive = function() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.lastSeen > fiveMinutesAgo && this.isActive;
};

export default mongoose.model('UserSession', userSessionSchema);
