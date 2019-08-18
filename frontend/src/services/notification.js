const failureNotificationSettings = {
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
};

const successNotificationSettings = {
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
};

const buildFailureNotificationSettings = (message, title) => {
    return Object.assign({}, failureNotificationSettings, { message, title });
};

const buildSuccessNotificationSettings = (message, title) => {
    return Object.assign({}, successNotificationSettings, { message, title });
};

const types = [
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "You could not sign in",
        type: "Sign In",
    },
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "Passwords validation",
        type: "FailureChangingPassword",
    },
    {
        builder(message) {
            return buildSuccessNotificationSettings(message, this.title);
        },
        title: "Passwords validation",
        type: "SuccessfulChangingPassword",
    },
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "Manager validation",
        type: "FailureEditingManager",
    },
    {
        builder(message) {
            return buildSuccessNotificationSettings(message, this.title);
        },
        title: "Manager validation",
        type: "SuccessfulEditingManager",
    },
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "Client validation",
        type: "FailureEditingClient",
    },
    {
        builder(message) {
            return buildSuccessNotificationSettings(message, this.title);
        },
        title: "Client validation",
        type: "SuccessfulEditingClient",
    },
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "Loan validation",
        type: "FailureCreatingLoan",
    },
    {
        builder(message) {
            return buildSuccessNotificationSettings(message, this.title);
        },
        title: "Loan validation",
        type: "SuccessfulCreatingLoan",
    },
    {
        builder(message) {
            return buildFailureNotificationSettings(message, this.title);
        },
        title: "Loan validation",
        type: "FailureEditingLoan",
    },
    {
        builder(message) {
            return buildSuccessNotificationSettings(message, this.title);
        },
        title: "Loan validation",
        type: "SuccessfulEditingLoan",
    },
];

/**
 * @param {string} message
 * @param {string} type
 * @return {null}
 */
const buildNotification = (message, type) => {
    const notification = types.find(e => e.type === type);

    return notification ? notification.builder(message) : null;
};

export default buildNotification;
