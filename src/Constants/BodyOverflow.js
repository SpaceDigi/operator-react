export const bodyOverflow = modal => {
    // take a modal boolean value for overflowing body scroll;
    let body = document.querySelector('body').style;
    if (modal) {
        body.overflow = 'hidden'
    } else {
        body.overflow = 'scroll'
    }
};
