import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name: 'Lil Po',
        email: 'po@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Lil V',
        email: 'v@example.com',
        password: bcrypt.hashSync('123456',10),
    }
]

export default users