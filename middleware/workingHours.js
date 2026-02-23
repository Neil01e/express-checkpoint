const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = date.getHours();
    
    // Working hours: Monday to Friday, 9 AM to 2 AM (next day)
    // This means: 9am until 2am the next morning
    if (day >= 1 && day <= 5) { // Monday to Friday
        if (hour >= 9) { // 9am to midnight
            return next();
        } else if (hour < 2) { // 12am to 2am (still within Friday night into Saturday)
            // Check if it's Friday night going into Saturday (still accessible)
            if (day === 5 && hour < 2) { // Friday night after midnight
                return next();
            }
            // For Monday-Thursday nights, hour < 2 means it's after midnight but still same night
            return next();
        }
    }
    
    // Special case: Friday night after 9pm continuing into Saturday morning 2am
    if (day === 6 && hour < 2) { // Saturday morning before 2am
        return next(); // Still accessible from Friday night
    }
    
   
    res.status(403).render('closed', {
        title: 'LOCKDOWN',
        currentYear: date.getFullYear()
    });
};

module.exports = workingHoursMiddleware;