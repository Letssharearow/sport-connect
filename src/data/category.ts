export enum Category {
    club = 'Golf',
    gym = 'Gym',
    climbing = 'Klettern',
    cycling = 'Radfahren',
    paddle = 'Paddeln',
    dance = 'Tanzen',
    hiking = 'Wandern',
    running = 'Laufen',
    tennis = 'Tennis',
    walking = 'Spazieren Gehen',
    workOut = 'Work out',
    sailing = 'Segeln',
    squashing = 'Squash',
    swimming = 'Schwimmen',
    sakting = 'Skaten',
    inlineSkating = 'Inlineskating',
    bridge = 'Bridge',
    badminton = 'Badminton',
    skiing = 'Skifahren',
    volleyball = 'Volleyball',
    soccer = 'Fußball',
    other = 'Sontiges',
}


export const getCategories = () => Object.values(Category).sort(function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
});

export enum Page {
    login = "/login",
    signup = "/signup",
    categories = "/categories",
    users = "/users",
    profile = "/profile",
    contacts = "/contacts",
    policy = "/policy",
}

export enum Gender {
    male = "m",
    female = "w",
    divers = "d",
}

export enum Endpoint {
    users = "users",
    chats = "chats",
}
