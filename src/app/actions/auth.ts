'use server';

import { prisma } from '@/lib/db';
import { encrypt, getSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function registerRider(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const dob = formData.get('dob') as string;
    const gender = formData.get('gender') as string;
    const aboutMe = formData.get('aboutMe') as string;

    if (!username || !password) {
        return { error: 'Username and password are required' };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return { error: 'Username already taken' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User and RiderProfile
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: 'RIDER',
            riderProfile: {
                create: {
                    dob,
                    gender,
                    aboutMe,
                },
            },
        },
    });

    // Create session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, username: user.username, role: user.role }, expires });

    (await cookies()).set('session', session, { expires, httpOnly: true });

    redirect('/passenger');
}

export async function registerDriver(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { error: 'Username and password are required' };
    }

    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return { error: 'Username already taken' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User (DriverProfile will be linked during onboarding or created empty)
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: 'DRIVER',
            driverProfile: {
                create: {}, // Create empty profile to be filled later
            },
        },
    });

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, username: user.username, role: user.role }, expires });

    (await cookies()).set('session', session, { expires, httpOnly: true });

    redirect('/driver/onboarding');
}

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string; // 'RIDER' or 'DRIVER'

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { error: 'Invalid credentials' };
    }

    if (user.role !== role) {
        return { error: `This account is not a ${role.toLowerCase()} account` };
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, username: user.username, role: user.role }, expires });

    (await cookies()).set('session', session, { expires, httpOnly: true });

    if (role === 'RIDER') {
        redirect('/passenger');
    } else {
        // Check if onboarding is complete (simplified check for now)
        redirect('/driver/dashboard');
    }
}

export async function logout() {
    (await cookies()).delete('session');
    redirect('/');
}

export async function getCurrentUser() {
    const session = await getSession();
    if (!session?.user) return null;

    // Fetch fresh data
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            riderProfile: true,
            driverProfile: true,
        },
    });

    return user;
}
