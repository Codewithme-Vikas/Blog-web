// Check supported file types
exports.allowFileType = (type, allowTypes)=> {
    return allowTypes.includes(type.toLowerCase());
}

// Generate OTP
exports.generateOTP = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        let digit = Math.floor(Math.random() * 10);
        otp += digit;
    }
    return otp;
}