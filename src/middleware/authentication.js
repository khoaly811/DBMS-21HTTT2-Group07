exports.adminAuth = (req, res, next) => {
    if (req.session.user === 'ADM') {
        console.log('Admin authentication passed');
        next();
    }
    else {
        console.log('Admin authentication failed');
        res.redirect('/login');
    }
}

exports.dentistAuth = (req, res, next) => {
    if (req.session.user === 'DEN') {
        console.log('Dentist authentication passed');
        next();
    }
    else {
        console.log('Dentist authentication failed');
        res.redirect('/login');
    }
}

exports.staffAuth = (req, res, next) => {
    if (req.session.user === 'STA') {
        console.log('Staff authentication passed');
        next();
    }
    else {
        console.log('Staff authentication failed');
        res.redirect('/login');
    }
}

exports.isLogged = (req, res, next) => {
    if (req.session.user) {
        console.log('Logged in');
        next();
    }
    else {
        console.log('Not logged in');
        // res.redirect('/login');
        res.render('Login');
    }
}