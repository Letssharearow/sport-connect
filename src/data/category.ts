export enum Category {
    dance = 'Tanzen',
    club = 'Golf',
    running = 'Laufen',
    walking = 'Spazieren Gehen',
    cycling = 'Radfahren',
    workOut = 'Work out',
    tennis = 'Tennis',
    paddle = 'Paddeln',
    hiking = 'Wandern',
    climbing = 'Klettern',
    sailing = 'Segeln',
    fishing = 'Angeln',
    squashing = 'Squash',
    swimming = 'Schwimmen',
    sakting = 'Skaten',
    inlineSkating = 'Inlineskating',
    bridge = 'Bridge',
    badminton = 'Badminton',
    skiing = 'Skifahren',
    volleyball = 'Volleyball',
    soccer = 'Fußball',
}

export const getCategories = () => Object.values(Category);

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
