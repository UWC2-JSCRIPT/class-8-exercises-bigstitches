// create function to remove notice
const removeNotice = () => {
    notice = document.getElementById('maintenance-notice');
    //console.log(`${notice}`);
    notice.remove();
}

//removeNotice();

setTimeout(function() {
    removeNotice();
},
5000 // 5000 milliseconds
);