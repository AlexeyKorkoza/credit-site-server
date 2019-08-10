const notificationSettings = {
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
};

const types = [
    {
        buildNotificationSettings: (message, title) => {
            return Object.assign({}, notificationSettings, { message, title });
        },
        title: "You could not sign in",
        type: "Sign In",
    }
];

/**
 * @param {string} message
 * @param {string} type
 * @return {null}
 */
const buildNotification = (message, type) => {
    const notification = types.find(e => e.type === type);

    return notification ? notification.buildNotificationSettings(message, notification.title) : null;
};

export default buildNotification;
