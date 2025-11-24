// localStorage-based authentication
// Perfect for development, demos, and GitHub sharing!
// Easy to swap for Supabase/Firebase later

interface SignUpRiderData {
    username: string;
    password: string;
    dob?: string;
    gender?: string;
    aboutMe?: string;
}

interface SignUpDriverData {
    username: string;
    password: string;
}

interface SignInData {
    username: string;
    password: string;
    role: 'RIDER' | 'DRIVER';
}

interface User {
    id: string;
    username: string;
    password: string; // In production, this would be hashed
    role: 'RIDER' | 'DRIVER';
    created_at: string;
    riderProfile?: {
        dob?: string;
        gender?: string;
        about_me?: string;
    };
    driverProfile?: {
        license_number?: string;
        car_model?: string;
        plate_number?: string;
        is_verified: boolean;
    };
}

// Helper functions for localStorage
function getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('nycride_users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users: User[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nycride_users', JSON.stringify(users));
}

function getCurrentSession(): User | null {
    if (typeof window === 'undefined') return null;
    const session = localStorage.getItem('nycride_session');
    return session ? JSON.parse(session) : null;
}

function saveSession(user: User) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nycride_session', JSON.stringify(user));
}

function clearSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('nycride_session');
}

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function signUpRider(data: SignUpRiderData) {
    try {
        const users = getUsers();

        // Check if username already exists
        if (users.find(u => u.username === data.username)) {
            return { error: 'Username already taken' };
        }

        // Create new user
        const newUser: User = {
            id: generateId(),
            username: data.username,
            password: data.password, // In production, hash this!
            role: 'RIDER',
            created_at: new Date().toISOString(),
            riderProfile: {
                dob: data.dob,
                gender: data.gender,
                about_me: data.aboutMe,
            }
        };

        users.push(newUser);
        saveUsers(users);
        saveSession(newUser);

        return { success: true, user: newUser };
    } catch (error: any) {
        console.error('Rider signup error:', error);
        return { error: error.message || 'Failed to create account' };
    }
}

export async function signUpDriver(data: SignUpDriverData) {
    try {
        const users = getUsers();

        // Check if username already exists
        if (users.find(u => u.username === data.username)) {
            return { error: 'Username already taken' };
        }

        // Create new user
        const newUser: User = {
            id: generateId(),
            username: data.username,
            password: data.password, // In production, hash this!
            role: 'DRIVER',
            created_at: new Date().toISOString(),
            driverProfile: {
                is_verified: false,
            }
        };

        users.push(newUser);
        saveUsers(users);
        saveSession(newUser);

        return { success: true, user: newUser };
    } catch (error: any) {
        console.error('Driver signup error:', error);
        return { error: error.message || 'Failed to create account' };
    }
}

export async function signIn(data: SignInData) {
    try {
        const users = getUsers();

        // Find user by username and password
        const user = users.find(
            u => u.username === data.username && u.password === data.password
        );

        if (!user) {
            return { error: 'Invalid credentials' };
        }

        // Check role matches
        if (user.role !== data.role) {
            return { error: `This account is not a ${data.role.toLowerCase()} account` };
        }

        saveSession(user);
        return { success: true, user, role: user.role };
    } catch (error: any) {
        console.error('Sign in error:', error);
        return { error: error.message || 'Invalid credentials' };
    }
}

export async function signOut() {
    try {
        clearSession();
        return { success: true };
    } catch (error: any) {
        console.error('Sign out error:', error);
        return { error: error.message };
    }
}

export async function getCurrentUser() {
    try {
        return getCurrentSession();
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}
