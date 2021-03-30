

export const validateName = (name: string): string|void => {
    if (name.length > 16) return "Your username cannot be longer than 16 characters";
    if (name.length < 4) return "Your username cannot be shorter than 4 characters";
    if (!/^[a-z0-9]+$/i.test(name)) return "Usernames can contain only numbers and letters";
    
}