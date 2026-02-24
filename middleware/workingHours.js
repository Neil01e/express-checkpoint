const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); 
    const hour = date.getHours();
    
    // Working hours: Monday to Friday, 9 AM to  7PM
    if (day >= 1 && day <= 5) { // Monday to Friday
        if (hour >= 9) { // 9am to midnight
            return next();
        } else if (hour < 19) {
            
            if (day === 5 && hour < 2) { // Friday night after midnight
                return next();
            }
           
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
